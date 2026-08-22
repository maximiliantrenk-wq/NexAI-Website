// Karrieresystem für Vertriebspartner (Setter / Closer) — Fakten, die die Website braucht.
// Bewusst OHNE Provisionssätze: Die Zahlen stehen nur im Karrieresystem-Deck
// (public/downloads/NexAI-Karrieresystem.pdf) und im Vertrag (vertrag/09_…),
// nicht auf der Website (Entscheidung Max, 22.08.2026).

export type Role = "setter" | "closer" | "both";
export type Level = "junior" | "senior";

export const ROLES: readonly Role[] = ["setter", "closer", "both"];

/** Aufstiegskriterien Junior → Senior (4 Wochen) — öffentlich, weil objektiv. */
export const PROMOTION = {
  weeks: 4,
  setter: { calls: [50, 75, 100, 125], minAppointments: 3 },
  closer: { appointments: [3, 5, 7, 10], minDeals: 2 },
} as const;

/** Öffentliche Live-Demo-Nummer (identisch mit dem Hero der Startseite). */
export const DEMO_PHONE = { display: "07959 3100191", href: "tel:+4979593100191" } as const;

/** Karrieresystem als PDF (Kopie des Partner-Decks, wird nur per Bestätigungsmail verlinkt) — leer lassen, wenn es keins gibt. */
export const KARRIERE_PDF_PATH = "/downloads/NexAI-Karrieresystem.pdf";

/** Veröffentlichungsdatum des JobPostings (bei größeren Änderungen aktualisieren). */
export const DATE_POSTED = "2026-08-22";
