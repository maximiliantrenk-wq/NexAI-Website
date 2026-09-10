// Anmeldung für den Texteditor unter /admin.
//
// Bewusst ohne Datenbank und ohne Benutzerverwaltung: Es gibt genau ein
// gemeinsames Passwort für die Geschäftsführung, mehr braucht dieser Bereich
// nicht. Die Sitzung ist ein signiertes Ablaufdatum im Cookie — dadurch muss
// der Server sich nichts merken und ein Neustart wirft niemanden hinaus.
//
// Sichere Voreinstellung: Fehlt eine der beiden Variablen, ist /admin komplett
// abgeschaltet statt offen.

import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "nexai_admin";
const SESSION_HOURS = 12;

function hashEnv(): string | null {
  return process.env.ADMIN_PASSWORD_HASH?.trim() || null;
}
function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET?.trim();
  return s && s.length >= 16 ? s : null;
}

/** Ist der Bereich überhaupt eingerichtet? Ohne beides bleibt er zu. */
export function adminConfigured(): boolean {
  return Boolean(hashEnv() && secret());
}

/**
 * Prüft ein eingegebenes Passwort gegen `ADMIN_PASSWORD_HASH`.
 * Format des Hashes: `scrypt:<salt-hex>:<hash-hex>` — erzeugt von
 * `node scripts/admin-password.mjs`.
 *
 * Trennzeichen bewusst Doppelpunkt statt Dollar: In `.env`-Dateien wird `$name`
 * als Variable ersetzt, ein Hash mit Dollarzeichen kommt beim Server verstümmelt
 * an — und das Passwort stimmt dann nie.
 */
export function verifyPassword(input: string): boolean {
  const stored = hashEnv();
  if (!stored) return false;

  const [scheme, saltHex, hashHex] = stored.split(":");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;

  const expected = Buffer.from(hashHex, "hex");
  let actual: Buffer;
  try {
    actual = scryptSync(input, Buffer.from(saltHex, "hex"), expected.length);
  } catch {
    return false;
  }
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function sign(payload: string): string {
  return createHmac("sha256", secret() ?? "").update(payload).digest("hex");
}

/** Erzeugt den Cookie-Wert: Ablaufzeitpunkt plus Signatur darüber. */
export function issueToken(): { value: string; maxAge: number } {
  const maxAge = SESSION_HOURS * 60 * 60;
  const expires = Date.now() + maxAge * 1000;
  return { value: `${expires}.${sign(String(expires))}`, maxAge };
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;

  const expected = Buffer.from(sign(expires), "utf8");
  const actual = Buffer.from(signature, "utf8");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/** Für Server-Komponenten und Route-Handler: Ist gerade jemand angemeldet? */
export async function isSignedIn(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}
