// Karrieresystem für Vertriebspartner (Setter / Closer) — single source of truth.
// Server- und Client-tauglich (keine Imports), Prozentwerte als Ganzzahlen, damit
// die Rechnung exakt bleibt. Die Zahlen sind das finale Karrieresystem (19.08.2026);
// die Website, der Provisions-Rechner und das JobPosting-Schema lesen nur von hier.

export type Role = "setter" | "closer" | "both";
export type Level = "junior" | "senior";

export const ROLES: readonly Role[] = ["setter", "closer", "both"];
export const LEVELS: readonly Level[] = ["junior", "senior"];

/** Einmalprovision im ersten Monat, in % der Netto-Basis. Gilt für alle Stufen. */
export const ONE_TIME_PCT: Record<Role, Record<Level, number>> = {
  setter: { junior: 8, senior: 12 },
  closer: { junior: 13, senior: 23 },
  both: { junior: 21, senior: 35 },
};

/** Monatsprovision ab Monat 2, dauerhaft, in % der Netto-Basis. Nur Senior. */
export const MONTHLY_PCT: Record<Role, number> = {
  setter: 5,
  closer: 10,
  both: 15,
};

/** Durchgehendes Beispiel aus dem Karrieresystem-Deck. */
export const EXAMPLE = {
  gross: 2500,
  costs: 500,
  netBase: 2000,
  newPerMonth: 2,
} as const;

export const HORIZONS = [6, 12, 24] as const;

/** Aufstiegskriterien Junior → Senior (4 Wochen). */
export const PROMOTION = {
  weeks: 4,
  setter: { calls: [50, 75, 100, 125], minAppointments: 3 },
  closer: { appointments: [3, 5, 7, 10], minDeals: 2 },
} as const;

/** Obergrenzen für die Rechner-Eingaben (reine Plausibilität). */
export const LIMITS = { newPerMonth: 30, netBase: 50_000 } as const;

/** Öffentliche Live-Demo-Nummer (identisch mit dem Hero der Startseite). */
export const DEMO_PHONE = { display: "07959 3100191", href: "tel:+4979593100191" } as const;

/** Karrieresystem als PDF (Kopie des Partner-Decks) — leer lassen, wenn es keins gibt. */
export const KARRIERE_PDF_PATH = "/downloads/NexAI-Karrieresystem.pdf";

/** Veröffentlichungsdatum des JobPostings (bei größeren Änderungen aktualisieren). */
export const DATE_POSTED = "2026-08-22";

/** Bestandskunden im Monat N: alle Neukunden der Monate 1..N−1 (Bestand zahlt ab Folgemonat). */
export function activeCustomers(newPerMonth: number, month: number): number {
  return newPerMonth * Math.max(0, month - 1);
}

export type IncomeInput = {
  role: Role;
  level: Level;
  newPerMonth: number;
  netBase: number;
  month: number;
};

/** Monatseinkommen im Monat N: Einmalprovision der Neukunden + Monatsprovision des Bestands. */
export function monthlyIncome(p: IncomeInput): {
  oneTime: number;
  recurring: number;
  total: number;
} {
  const oneTime = (p.newPerMonth * p.netBase * ONE_TIME_PCT[p.role][p.level]) / 100;
  const recurring =
    p.level === "senior"
      ? (activeCustomers(p.newPerMonth, p.month) * p.netBase * MONTHLY_PCT[p.role]) / 100
      : 0;
  return { oneTime, recurring, total: oneTime + recurring };
}

/** Was ein einzelner Kunde über 12 Monate einbringt (Monat 1 einmalig + 11 × monatlich als Senior). */
export function perCustomerYear(role: Role, level: Level, netBase: number): number {
  const oneTime = (netBase * ONE_TIME_PCT[role][level]) / 100;
  const recurring = level === "senior" ? (11 * netBase * MONTHLY_PCT[role]) / 100 : 0;
  return oneTime + recurring;
}
