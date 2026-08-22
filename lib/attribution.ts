// Quellen-Tracking für die Vertriebspartner-Seite — ohne Cookies, ohne Analytics.
// Beim Seitenaufruf werden ?ref= und utm_* aus der URL gelesen und im
// sessionStorage (tab-gebunden, flüchtig) abgelegt; erst beim Absenden der
// Bewerbung wandern sie als Klartext-Zeile in Mail, CRM-Notiz und Termin.
// First-Touch: ein späterer Aufruf ohne Parameter überschreibt keine Quelle.

export const ATTRIBUTION_KEY = "nexai-attribution-v1";

export type Attribution = {
  ref?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  landing?: string;
  referrer?: string;
  at?: string;
};

const MAX = 120;

function clean(v: string | null | undefined): string | undefined {
  if (!v) return undefined;
  // Steuerzeichen raus, kürzen — die Werte landen in Mail und CRM-Notizen.
  const s = v.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, MAX);
  return s || undefined;
}

export function readAttribution(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : null;
  } catch {
    return null;
  }
}

export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const next: Attribution = {
      ref: clean(params.get("ref")),
      utmSource: clean(params.get("utm_source")),
      utmMedium: clean(params.get("utm_medium")),
      utmCampaign: clean(params.get("utm_campaign")),
      utmContent: clean(params.get("utm_content")),
      landing: clean(window.location.pathname),
      referrer: clean(
        document.referrer ? new URL(document.referrer).hostname : undefined,
      ),
      at: new Date().toISOString(),
    };

    const hasSource = !!(next.ref || next.utmSource);
    const existing = readAttribution();
    // Eine bereits erfasste Quelle bleibt stehen (First-Touch).
    if (existing && (existing.ref || existing.utmSource) && !hasSource) return;
    if (!hasSource && existing) return;

    const compact = Object.fromEntries(
      Object.entries(next).filter(([, v]) => v !== undefined),
    );
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(compact));
  } catch {
    // Safari Private Mode o. Ä. — Tracking ist optional, nie blockierend.
  }
}

/** Eine Zeile für Mail, CRM-Notiz und Termin-Thema. */
export function attributionLine(a: Attribution | null | undefined): string {
  if (!a) return "direkt";
  const parts: string[] = [];
  if (a.ref) parts.push(`ref=${a.ref}`);
  const utm = [a.utmSource, a.utmMedium, a.utmCampaign].filter(Boolean).join("/");
  if (utm) parts.push(`utm=${utm}`);
  if (a.utmContent) parts.push(`content=${a.utmContent}`);
  if (a.landing) parts.push(`landing=${a.landing}`);
  if (a.referrer) parts.push(`referrer=${a.referrer}`);
  return parts.length ? parts.join(" · ") : "direkt";
}
