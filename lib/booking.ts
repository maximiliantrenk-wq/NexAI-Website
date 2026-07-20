// Terminlogik für die Website-Buchung.
//
// Bewusst als reine Funktionen ohne Netzwerk- oder Framework-Bezug: n8n liefert
// nur die belegten Zeiten aus dem Google-Kalender, sämtliche Geschäftsregeln
// (Geschäftszeiten, Raster, Vorlaufzeit, Horizont) leben hier und sind damit
// testbar. Die Werte spiegeln die Regeln des Voice Agents
// (n8n/nexai-vapi-verfuegbarkeit.json), damit Telefon und Website dieselben
// Termine anbieten.

export const TZ = "Europe/Berlin";
export const SLOT_MINUTES = 30;
/** Erster möglicher Terminbeginn (Ortszeit). */
export const DAY_START_HOUR = 8;
/** Letztes mögliches Terminende (Ortszeit) — der letzte Slot beginnt 16:30. */
export const DAY_END_HOUR = 17;
/** Kein Termin darf kurzfristiger als das gebucht werden. */
export const LEAD_TIME_MINUTES = 120;
/** Wie weit im Voraus Termine angeboten werden. */
export const HORIZON_DAYS = 14;

export type BusyInterval = {
  /** ISO-Zeitpunkt, oder "YYYY-MM-DD" für ganztägige Einträge. */
  start: string;
  end: string;
};

export type Slot = { startISO: string; endISO: string; label: string };
export type BookingDay = {
  /** "YYYY-MM-DD" in Europe/Berlin. */
  date: string;
  /** 1 = Montag … 7 = Sonntag. */
  weekday: number;
  slots: Slot[];
};

/**
 * Verschiebung der Zeitzone gegenüber UTC in Minuten, für genau diesen
 * Zeitpunkt — berücksichtigt also die Sommerzeit korrekt.
 */
function offsetMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");

  // 24 statt 0 kommt bei hour12:false für Mitternacht vor.
  const hour = get("hour") % 24;
  const asUTC = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    hour,
    get("minute"),
    get("second"),
  );
  return (asUTC - date.getTime()) / 60_000;
}

/** Wandelt eine Wanduhrzeit in Europe/Berlin in den echten Zeitpunkt um. */
function zonedToInstant(
  y: number,
  m: number,
  d: number,
  hh: number,
  mm: number,
): Date {
  const naive = Date.UTC(y, m - 1, d, hh, mm);
  // Zwei Durchgänge, damit auch an den Umstellungstagen der richtige Versatz
  // gewählt wird (der erste Versatz kann aus der falschen Zeitzonenhälfte sein).
  let ts = naive - offsetMinutes(new Date(naive)) * 60_000;
  ts = naive - offsetMinutes(new Date(ts)) * 60_000;
  return new Date(ts);
}

/** Kalenderfelder eines Zeitpunkts in Europe/Berlin. */
function zonedParts(date: Date): {
  y: number;
  m: number;
  d: number;
  weekday: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const map: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };
  return {
    y: Number(get("year")),
    m: Number(get("month")),
    d: Number(get("day")),
    weekday: map[get("weekday")] ?? 0,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Normalisiert die Belegt-Liste zu Zeitstempel-Paaren. */
function toRanges(busy: BusyInterval[]): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  for (const b of busy) {
    if (!b?.start || !b?.end) continue;

    // Ganztägige Einträge kommen als "YYYY-MM-DD"; das Google-Ende ist exklusiv.
    const allDay = /^\d{4}-\d{2}-\d{2}$/.test(b.start);
    if (allDay) {
      const [ys, ms, ds] = b.start.split("-").map(Number);
      const [ye, me, de] = b.end.split("-").map(Number);
      ranges.push([
        zonedToInstant(ys, ms, ds, 0, 0).getTime(),
        zonedToInstant(ye, me, de, 0, 0).getTime(),
      ]);
      continue;
    }

    const s = new Date(b.start).getTime();
    const e = new Date(b.end).getTime();
    if (Number.isFinite(s) && Number.isFinite(e) && e > s) ranges.push([s, e]);
  }
  return ranges;
}

const overlaps = (
  start: number,
  end: number,
  ranges: Array<[number, number]>,
) => ranges.some(([bs, be]) => start < be && end > bs);

/**
 * Baut die buchbaren Termine der nächsten {@link HORIZON_DAYS} Tage.
 * Tage ohne freien Termin fallen weg.
 */
export function buildDays(busy: BusyInterval[], now: Date = new Date()): BookingDay[] {
  const ranges = toRanges(busy);
  const earliest = now.getTime() + LEAD_TIME_MINUTES * 60_000;
  const days: BookingDay[] = [];

  for (let offset = 0; offset < HORIZON_DAYS; offset++) {
    // Auf den Tagesanfang in Ortszeit gehen, dann Tage addieren — so bleibt es
    // über Sommerzeitwechsel hinweg derselbe Kalendertag.
    const probe = new Date(now.getTime() + offset * 86_400_000);
    const { y, m, d, weekday } = zonedParts(probe);
    if (weekday > 5) continue; // Wochenende

    const slots: Slot[] = [];
    for (let hh = DAY_START_HOUR; hh < DAY_END_HOUR; hh++) {
      for (let mm = 0; mm < 60; mm += SLOT_MINUTES) {
        const start = zonedToInstant(y, m, d, hh, mm);
        const startMs = start.getTime();
        const endMs = startMs + SLOT_MINUTES * 60_000;

        if (startMs < earliest) continue;
        if (overlaps(startMs, endMs, ranges)) continue;

        slots.push({
          startISO: start.toISOString(),
          endISO: new Date(endMs).toISOString(),
          label: `${pad(hh)}:${pad(mm)}`,
        });
      }
    }

    if (slots.length) {
      days.push({ date: `${y}-${pad(m)}-${pad(d)}`, weekday, slots });
    }
  }

  return days;
}

/**
 * Prüft serverseitig, ob ein angefragter Termin wirklich buchbar ist.
 * Der Client darf hier nichts vorgeben — der Slot muss exakt im aktuell
 * berechneten Raster liegen.
 */
export function findSlot(
  startISO: string,
  busy: BusyInterval[],
  now: Date = new Date(),
): Slot | null {
  const wanted = new Date(startISO).getTime();
  if (!Number.isFinite(wanted)) return null;
  for (const day of buildDays(busy, now)) {
    for (const slot of day.slots) {
      if (new Date(slot.startISO).getTime() === wanted) return slot;
    }
  }
  return null;
}
