// Stateless double-opt-in token.
//
// The site has no database, so the confirmation link must carry its own state:
// token = base64url(payload) + "." + base64url(HMAC-SHA256(payload)).
// The payload holds the email + an expiry timestamp; the HMAC makes it
// unforgeable. A valid token can therefore only originate from a link we emailed
// to that address — which is exactly the opt-in proof double opt-in requires.
//
// Rotating the secret only invalidates pending (unconfirmed) links, which is
// harmless — the subscriber simply signs up again.

import { createHmac, timingSafeEqual } from "crypto";

const TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days to confirm

function secret(): string {
  // A dedicated secret if provided; otherwise reuse the (secret, high-entropy)
  // Resend API key so no extra env var is strictly required.
  const s = process.env.NEWSLETTER_SECRET ?? process.env.RESEND_API_KEY;
  if (!s) throw new Error("newsletter token secret unavailable");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createToken(email: string): string {
  const body = { e: email.toLowerCase(), x: Date.now() + TTL_MS };
  const payload = Buffer.from(JSON.stringify(body)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string): { email: string } | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;

  // Constant-time signature comparison (guard length first — timingSafeEqual throws on mismatch).
  const given = Buffer.from(sig);
  const expected = Buffer.from(sign(payload));
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return null;
  }

  let body: { e?: unknown; x?: unknown };
  try {
    body = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (typeof body.e !== "string" || typeof body.x !== "number") return null;
  if (Date.now() > body.x) return null; // expired

  return { email: body.e };
}
