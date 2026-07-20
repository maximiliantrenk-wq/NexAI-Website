import { NextResponse } from "next/server";
import { z } from "zod";
import { buildDays, findSlot, type BusyInterval, TZ } from "@/lib/booking";
import { sendMail, fieldsToHtml, fieldsToText } from "@/lib/email";

// Terminbuchung. Wie /api/chat ein gehärteter Proxy: n8n dient nur als
// Google-Kalender-Adapter (belegte Zeiten lesen, Termin anlegen), sämtliche
// Geschäftsregeln liegen in lib/booking.ts.
//
// Bewusst so geschnitten: der Client bestimmt NICHT, welcher Termin gültig ist.
// Beim Buchen werden die belegten Zeiten erneut geladen und der gewünschte Slot
// gegen das frisch berechnete Raster geprüft — sonst könnte man per
// direktem POST beliebige Zeiten (nachts, am Wochenende, doppelt) eintragen.
//
// Benötigte Env:
//   N8N_BOOKING_WEBHOOK_URL — n8n *Production* Webhook (nexai-website-termin)
//   N8N_BOOKING_SECRET      — geteiltes Geheimnis, als `x-nexai-secret` gesendet
export const maxDuration = 60;

const N8N_TIMEOUT_MS = 20_000;

const slotsSchema = z.object({ action: z.literal("slots") });

const bookSchema = z.object({
  action: z.literal("book"),
  startISO: z.string().min(10).max(40),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  topic: z.string().trim().max(500).optional().default(""),
  locale: z.enum(["de", "en"]),
  // Honigtopf: echte Menschen füllen das unsichtbare Feld nicht aus.
  company: z.string().max(0).optional(),
});

const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

async function callN8n(payload: unknown): Promise<unknown | null> {
  const url = process.env.N8N_BOOKING_WEBHOOK_URL;
  if (!url) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), N8N_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_BOOKING_SECRET
          ? { "x-nexai-secret": process.env.N8N_BOOKING_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error("[booking] n8n responded", res.status);
      return null;
    }
    return await res.json().catch(() => null);
  } catch (err) {
    console.error("[booking] n8n request failed:", err);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/** Belegte Zeiten aus n8n holen; `null` heisst "Kalender nicht erreichbar". */
async function fetchBusy(): Promise<BusyInterval[] | null> {
  const data = (await callN8n({ action: "busy" })) as
    | { busy?: unknown }
    | Array<{ busy?: unknown }>
    | null;
  if (!data) return null;
  // n8n antwortet je nach "Respond to Webhook"-Einstellung als Objekt oder
  // als einelementiges Array.
  const raw = Array.isArray(data) ? data[0]?.busy : data.busy;
  if (!Array.isArray(raw)) return null;
  return raw.filter(
    (b): b is BusyInterval =>
      !!b && typeof b.start === "string" && typeof b.end === "string",
  );
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  if (!process.env.N8N_BOOKING_WEBHOOK_URL) {
    // Noch nicht eingerichtet — die Oberfläche zeigt dann den Hinweis auf
    // Formular und Telefon statt einer Fehlermeldung.
    return NextResponse.json({ ok: false, reason: "unconfigured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const action = (body as { action?: unknown })?.action;

  // ---------------------------------------------------------------- Slots
  if (slotsSchema.safeParse(body).success) {
    const busy = await fetchBusy();
    if (!busy) {
      return NextResponse.json({ ok: false, reason: "upstream" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, tz: TZ, days: buildDays(busy) });
  }

  // ---------------------------------------------------------------- Buchen
  if (action === "book") {
    const parsed = bookSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
    }
    const { startISO, name, email, topic, locale } = parsed.data;

    const busy = await fetchBusy();
    if (!busy) {
      return NextResponse.json({ ok: false, reason: "upstream" }, { status: 502 });
    }

    // Erneut prüfen: der Termin könnte zwischen Anzeige und Klick belegt worden
    // sein, und ein direkter POST könnte beliebige Zeiten enthalten.
    const slot = findSlot(startISO, busy);
    if (!slot) {
      return NextResponse.json({ ok: false, reason: "taken" }, { status: 409 });
    }

    const created = (await callN8n({
      action: "create",
      startISO: slot.startISO,
      endISO: slot.endISO,
      name,
      email,
      topic,
      locale,
    })) as { ok?: unknown } | Array<{ ok?: unknown }> | null;

    const ok = Array.isArray(created) ? created[0]?.ok : created?.ok;
    if (ok !== true) {
      return NextResponse.json({ ok: false, reason: "upstream" }, { status: 502 });
    }

    // Interne Benachrichtigung. Die Terminbestätigung an den Kunden verschickt
    // Google selbst (er steht als Teilnehmer im Kalendereintrag) — das ist
    // unabhängig davon, ob die Resend-Domain schon verifiziert ist.
    const when = new Intl.DateTimeFormat("de-DE", {
      timeZone: TZ,
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(slot.startISO));

    const fields = {
      Termin: `${when} (${TZ})`,
      Name: name,
      "E-Mail": email,
      Anliegen: topic || "—",
      Sprache: locale,
    };
    await sendMail({
      subject: `Neuer Termin: ${name} — ${when}`,
      html: fieldsToHtml(fields),
      text: fieldsToText(fields),
      replyTo: email,
    });

    return NextResponse.json({ ok: true, startISO: slot.startISO });
  }

  return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
}
