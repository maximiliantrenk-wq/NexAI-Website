import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { saveLead } from "@/lib/crm";

// Terminbuchung auf /contact — direkt gegen den NexTime-Kalender.
//
// Bis zum 13.09.2026 lief sie über n8n in einen Google-Kalender, und die
// Geschäftsregeln standen doppelt: hier in lib/booking.ts und im Voice-Agent.
// Jetzt ist NexTime die einzige Wahrheit. Die freien Zeiten kommen aus genau
// dem Kalender, in dem der Termin landet, und NexTime prüft beim Anlegen selbst
// Öffnungszeiten, Vorlauf, Horizont und Belegung. Diese Route rechnet deshalb
// nichts mehr aus: sie reicht weiter und hält den Schlüssel vom Browser fern.
//
// Die Bestätigung an den Gast und die Meldung an den Kalender verschickt NexTime.
// Wie vorher über n8n landet jede neue Buchung zusätzlich als Lead im CRM.
//
// Benötigte Env:
//   NEXTIME_API_URL     — https://nextime.nex-a-i.com
//   NEXTIME_API_KEY     — Schlüssel „Website" aus NexTime → Einstellungen → Schnittstelle
//   NEXTIME_KALENDER_ID — Kalender, in dem die Buchungen landen
//   NEXTIME_LEISTUNG_ID — Terminart: bestimmt Dauer, Puffer, Vorlauf und Horizont
//   NEXTIME_LEISTUNG_ID_PARTNER — Terminart für Kennenlerngespräche mit Vertriebspartnern
export const maxDuration = 60;

const TZ = "Europe/Berlin";
const TIMEOUT_MS = 15_000;
/** So weit reicht die Auswahl. Die Terminart lässt ohnehin nicht weiter nach vorn buchen. */
const TAGE = 14;

/** Wofür gebucht wird — bestimmt die Terminart in NexTime. */
const artSchema = z.enum(["kunde", "partner"]).default("kunde");

const slotsSchema = z.object({ action: z.literal("slots"), art: artSchema });

const bookSchema = z.object({
  action: z.literal("book"),
  startISO: z.string().min(10).max(40),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  topic: z.string().trim().max(500).optional().default(""),
  locale: z.enum(["de", "en"]),
  art: artSchema,
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

type Konfig = {
  url: string;
  schluessel: string;
  kalenderId: string;
  leistung: Record<"kunde" | "partner", string>;
};

function konfig(): Konfig | null {
  const url = process.env.NEXTIME_API_URL?.trim().replace(/\/+$/, "");
  const schluessel = process.env.NEXTIME_API_KEY?.trim();
  const kalenderId = process.env.NEXTIME_KALENDER_ID?.trim();
  const leistungId = process.env.NEXTIME_LEISTUNG_ID?.trim();
  if (!url || !schluessel || !kalenderId || !leistungId) return null;
  // Kennenlerngespräche haben eine eigene Terminart. Fehlt sie, gilt die für
  // Kunden — lieber falsch beschriftet als gar nicht buchbar.
  const partnerId = process.env.NEXTIME_LEISTUNG_ID_PARTNER?.trim() || leistungId;
  return { url, schluessel, kalenderId, leistung: { kunde: leistungId, partner: partnerId } };
}

/**
 * Unterscheidbare Fehlergründe: bei einer Störung soll aus der Antwort
 * hervorgehen, WO es klemmt — Schlüssel, Zeitüberschreitung oder Datenform.
 */
type Fehlergrund = "auth" | "timeout" | "status" | "shape";
type Antwort =
  | { ok: true; data: unknown }
  | { ok: false; reason: Fehlergrund; data?: unknown };

async function nextime(k: Konfig, pfad: string, rumpf?: unknown): Promise<Antwort> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${k.url}${pfad}`, {
      method: rumpf === undefined ? "GET" : "POST",
      headers: {
        Authorization: `Bearer ${k.schluessel}`,
        ...(rumpf === undefined ? {} : { "Content-Type": "application/json" }),
      },
      body: rumpf === undefined ? undefined : JSON.stringify(rumpf),
      signal: controller.signal,
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);

    if (res.status === 401 || res.status === 403) {
      console.error("[booking] NexTime hat den Schlüssel abgewiesen.");
      return { ok: false, reason: "auth" };
    }
    if (!res.ok) {
      console.error("[booking] NexTime antwortete", res.status);
      return { ok: false, reason: "status", data };
    }
    if (data === null) {
      console.error("[booking] NexTime lieferte kein verwertbares JSON.");
      return { ok: false, reason: "shape" };
    }
    return { ok: true, data };
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "AbortError";
    console.error("[booking] NexTime nicht erreichbar:", err);
    return { ok: false, reason: timedOut ? "timeout" : "status" };
  } finally {
    clearTimeout(timeout);
  }
}

type FreieZeiten = {
  leistung?: { dauerMin?: number };
  tage?: Array<{ tag?: string; zeiten?: Array<{ zeit?: string; start?: string; ende?: string }> }>;
};
type Slot = { startISO: string; endISO: string; label: string };
type BookingDay = { date: string; weekday: number; slots: Slot[] };

/** "YYYY-MM-DD" des Kalendertags in Berlin. */
function tagInBerlin(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function plusTage(tag: string, n: number): string {
  const d = new Date(`${tag}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** 1 = Montag … 7 = Sonntag, wie es die Oberfläche erwartet. */
function wochentag(tag: string): number {
  const d = new Date(`${tag}T12:00:00Z`).getUTCDay();
  return d === 0 ? 7 : d;
}

/** Datum und Uhrzeit in Berliner Ortszeit — so erwartet sie der Kalender. */
function ortszeit(d: Date): { datum: string; uhrzeit: string } {
  const teile = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value]),
  );
  return {
    datum: `${teile.year}-${teile.month}-${teile.day}`,
    uhrzeit: `${teile.hour}:${teile.minute}`,
  };
}

function alsTage(data: FreieZeiten): BookingDay[] | null {
  if (!Array.isArray(data.tage)) return null;
  return data.tage.flatMap((t) => {
    if (typeof t.tag !== "string" || !Array.isArray(t.zeiten)) return [];
    const slots = t.zeiten
      .filter(
        (z): z is { zeit: string; start: string; ende: string } =>
          typeof z.zeit === "string" && typeof z.start === "string" && typeof z.ende === "string",
      )
      .map((z) => ({ startISO: z.start, endISO: z.ende, label: z.zeit }));
    return slots.length ? [{ date: t.tag, weekday: wochentag(t.tag), slots }] : [];
  });
}

function freieZeiten(
  k: Konfig,
  art: "kunde" | "partner",
  von: string,
  bis: string,
): Promise<Antwort> {
  const q = new URLSearchParams({ von, bis, kalenderId: k.kalenderId, leistungId: k.leistung[art] });
  return nextime(k, `/api/v1/freie-zeiten?${q}`);
}

function upstream(reason: Fehlergrund) {
  return NextResponse.json({ ok: false, reason: "upstream", detail: reason }, { status: 502 });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  const k = konfig();
  if (!k) {
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
  const slotsAnfrage = slotsSchema.safeParse(body);
  if (slotsAnfrage.success) {
    const heute = tagInBerlin(new Date());
    const res = await freieZeiten(k, slotsAnfrage.data.art, heute, plusTage(heute, TAGE - 1));
    if (!res.ok) return upstream(res.reason);
    const days = alsTage(res.data as FreieZeiten);
    if (!days) return upstream("shape");
    return NextResponse.json({ ok: true, tz: TZ, days });
  }

  // ---------------------------------------------------------------- Buchen
  if (action === "book") {
    const parsed = bookSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
    }
    const { startISO, name, email, topic, locale, art } = parsed.data;
    const partner = art === "partner";

    const wunsch = new Date(startISO);
    if (Number.isNaN(wunsch.getTime())) {
      return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
    }
    const { datum, uhrzeit } = ortszeit(wunsch);

    // Frisch nachsehen, ob die Zeit noch angeboten wird — zwischen Anzeige und
    // Klick kann sie vergeben worden sein. Nebenbei liefert die Antwort die
    // Dauer der Terminart, die der Kalender zum Anlegen braucht.
    const angebot = await freieZeiten(k, art, datum, datum);
    if (!angebot.ok) return upstream(angebot.reason);
    const daten = angebot.data as FreieZeiten;
    const tage = alsTage(daten);
    const dauerMin = daten.leistung?.dauerMin;
    if (!tage || typeof dauerMin !== "number") return upstream("shape");

    const slot = tage
      .flatMap((t) => t.slots)
      .find((s) => new Date(s.startISO).getTime() === wunsch.getTime());
    if (!slot) {
      return NextResponse.json({ ok: false, reason: "taken" }, { status: 409 });
    }

    const anlage = await nextime(k, "/api/v1/termine", {
      datum,
      start: uhrzeit,
      dauerMin,
      leistungId: k.leistung[art],
      kalenderId: k.kalenderId,
      // Im internen Kalender steht der Titel in der Übersicht, nicht der Kontakt.
      titel: `${name} · ${partner ? "Vertriebspartner" : "Website"}`,
      kunde: { name, email },
      // In die Kontakt-Notiz, nicht in die Termin-Notiz: nur die geht beim
      // Anonymisieren nach 12 Monaten mit. Connor sieht sie im Termin.
      kundenNotiz: [`E-Mail: ${email}`, topic ? `Anliegen: ${topic}` : null, `Quelle: ${partner ? "Vertriebspartner-Seite" : "Website"} (${locale})`]
        .filter(Boolean)
        .join("\n"),
      // Ein Doppelklick legt denselben Termin nicht zweimal an.
      auftragId: `web-${createHash("sha256")
        .update(`${email.toLowerCase()}|${slot.startISO}`)
        .digest("hex")
        .slice(0, 40)}`,
    });
    if (!anlage.ok) {
      // Inzwischen vergeben oder nicht mehr im Angebot — für den Gast dasselbe.
      if (JSON.stringify(anlage.data ?? "").includes("zeit_")) {
        return NextResponse.json({ ok: false, reason: "taken" }, { status: 409 });
      }
      return upstream(anlage.reason);
    }

    /*
      Lead im CRM, im selben Format wie bisher über n8n: Titel „Termin <Datum>",
      Wiedervorlage zum Termin. Nur bei einer NEU angelegten Buchung — ein
      Doppelklick bekommt von NexTime denselben Termin zurück und soll keinen
      zweiten Lead erzeugen. saveLead wirft nie: ein CRM-Ausfall darf die
      bereits bestätigte Buchung nicht kippen.
    */
    if ((anlage.data as { schonAngelegt?: unknown }).schonAngelegt !== true) {
      const wann = `${new Intl.DateTimeFormat("de-DE", {
        timeZone: TZ,
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(wunsch)} Uhr`;
      await saveLead({
        name,
        email,
        source: partner ? "website-partnertermin" : "website-termin",
        title: `${partner ? "Kennenlernen" : "Termin"} ${wann}`,
        notes: [topic ? `Anliegen: ${topic}` : null, `Terminwunsch: ${wann}`]
          .filter(Boolean)
          .join("\n"),
        nextFollowUpAt: slot.startISO,
      });
    }

    return NextResponse.json({ ok: true, startISO: slot.startISO });
  }

  return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
}
