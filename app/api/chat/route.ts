import { NextResponse } from "next/server";
import { z } from "zod";

// The chat widget POSTs here; this route is a thin, hardened proxy to the n8n
// webhook. It never exposes the n8n URL or secret to the browser, bounds the
// input, applies a best-effort per-IP rate limit, and always answers with the
// uniform { ok } contract the widget understands.
//
// Required env:
//   N8N_CHAT_WEBHOOK_URL  — the n8n *Production* webhook URL
//   N8N_CHAT_SECRET       — shared secret; sent as `x-nexai-secret`, checked by
//                           the n8n webhook's Header Auth credential
//
// Vercel: 60s is the Hobby ceiling; we abort the upstream call well before it.
export const maxDuration = 60;

const N8N_TIMEOUT_MS = 45_000;
const MAX_MESSAGE_LEN = 1000;

const schema = z.object({
  // crypto.randomUUID() on the client; regex also accepts the non-UUID fallback.
  sessionId: z
    .string()
    .regex(/^[a-zA-Z0-9-]{8,64}$/),
  message: z.string().trim().min(1).max(MAX_MESSAGE_LEN),
  locale: z.enum(["de", "en"]),
});

// Best-effort in-memory limiter. It resets on cold start and is per-instance,
// so it is not a hard guarantee — but with Fluid Compute instances are reused,
// so it meaningfully blunts abuse without extra infra. The n8n Header Auth
// credential is the real gate on the upstream.
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 60_000; // per minute per IP
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    // Bound memory: drop stale buckets.
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[chat] N8N_CHAT_WEBHOOK_URL is not set.");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), N8N_TIMEOUT_MS);

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_CHAT_SECRET
          ? { "x-nexai-secret": process.env.N8N_CHAT_SECRET }
          : {}),
      },
      body: JSON.stringify(parsed.data),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error("[chat] n8n responded", res.status);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    // n8n may return a non-JSON body on a failed run — treat that as upstream 502.
    const data = (await res.json().catch(() => null)) as
      | { reply?: unknown; output?: unknown }
      | null;
    const reply = data?.reply ?? data?.output;

    if (typeof reply !== "string" || !reply.trim()) {
      console.error("[chat] n8n returned no usable reply.");
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    // AbortError (timeout) or network failure → upstream unavailable.
    console.error("[chat] proxy request failed:", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
