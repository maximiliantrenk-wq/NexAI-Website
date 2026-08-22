import { NextResponse } from "next/server";
import { z } from "zod";
import { fieldsToHtml, fieldsToText, sendMail } from "@/lib/email";
import { saveLead } from "@/lib/crm";
import { applyEmail } from "@/lib/apply-email";
import { attributionLine } from "@/lib/attribution";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";
import { KARRIERE_PDF_PATH } from "@/content/commission";

// Bewerbung als Vertriebspartner (Setter/Closer).
// Wie /api/partner: interne Mail entscheidet über den Status, CRM ist der
// dauerhafte Speicher (best effort). Zusätzlich: Eingangsbestätigung an den
// Bewerber mit Termin-Link (best effort), Honigtopf und Ratenlimit.
//
// Env: RESEND_API_KEY (Pflicht), APPLY_TO (optional, sonst CONTACT_TO),
//      CONTACT_FROM (verifizierter Absender, sonst erreicht die Bestätigung
//      keine fremde Adresse), CRM_API_URL + CRM_API_KEY (optional).

const attributionSchema = z
  .object({
    ref: z.string().max(200).optional(),
    utmSource: z.string().max(200).optional(),
    utmMedium: z.string().max(200).optional(),
    utmCampaign: z.string().max(200).optional(),
    utmContent: z.string().max(200).optional(),
    landing: z.string().max(200).optional(),
    referrer: z.string().max(200).optional(),
    at: z.string().max(40).optional(),
  })
  .optional();

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().regex(/^[+0-9 ()/.-]{6,40}$/),
  role: z.enum(["setter", "closer", "both"]),
  experience: z.enum(["none", "lt1", "1to3", "gt3"]),
  availability: z.enum(["lt10", "10to20", "20to30", "gt30"]),
  profile: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
  privacy: z.literal(true),
  locale: z.enum(["de", "en"]).default("de"),
  // Honigtopf — echte Menschen füllen das unsichtbare Feld nicht aus.
  company: z.string().max(200).optional(),
  attribution: attributionSchema,
});

const ROLE_LABEL = {
  de: { setter: "Setter", closer: "Closer", both: "Setter + Closer" },
  en: { setter: "Setter", closer: "Closer", both: "Setter + Closer" },
} as const;
const EXPERIENCE_LABEL = {
  none: "keine (Einstieg)",
  lt1: "unter 1 Jahr",
  "1to3": "1 bis 3 Jahre",
  gt3: "über 3 Jahre",
} as const;
const AVAILABILITY_LABEL = {
  lt10: "unter 10 h/Woche",
  "10to20": "10 bis 20 h/Woche",
  "20to30": "20 bis 30 h/Woche",
  gt30: "über 30 h/Woche",
} as const;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nex-a-i.com").replace(/\/+$/, "");
const CONTACT_PHONE = "0176 80714816";

const limited = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });

export async function POST(request: Request) {
  if (limited(clientIp(request))) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const v = parsed.data;

  // Bot-Falle: Erfolg vortäuschen, nichts verschicken.
  if (v.company && v.company.trim() !== "") {
    console.warn("[apply] honeypot triggered");
    return NextResponse.json({ ok: true });
  }

  const roleLabel = ROLE_LABEL[v.locale][v.role];
  const source = attributionLine(v.attribution);
  const now = new Date();
  const when = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(now);

  const fields: Record<string, string> = {
    Rolle: roleLabel,
    Name: v.name,
    "E-Mail": v.email,
    Telefon: v.phone,
    Erfahrung: EXPERIENCE_LABEL[v.experience],
    Verfügbarkeit: AVAILABILITY_LABEL[v.availability],
    Profil: v.profile?.trim() ? v.profile : "—",
    Nachricht: v.message?.trim() ? v.message : "—",
    Sprache: v.locale,
    Quelle: source,
    Eingang: `${when} (Europe/Berlin)`,
  };

  const bookingUrl = `${SITE_URL}/${v.locale}/vertriebspartner/termin`;
  const confirmation = applyEmail(v.locale, {
    name: v.name,
    roleLabel,
    bookingUrl,
    pdfUrl: KARRIERE_PDF_PATH ? `${SITE_URL}${KARRIERE_PDF_PATH}` : undefined,
    phone: CONTACT_PHONE,
  });

  const followUp = new Date(now.getTime() + 24 * 60 * 60_000).toISOString();

  // Interne Mail (entscheidet), Bestätigung an Bewerber + CRM (best effort) parallel.
  const [internal, ack] = await Promise.all([
    sendMail({
      to: process.env.APPLY_TO || undefined,
      subject: `Neue Bewerbung Vertriebspartner: ${roleLabel} | ${v.name}`,
      replyTo: v.email,
      html: fieldsToHtml(fields),
      text: fieldsToText(fields),
    }),
    sendMail({
      to: v.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    }),
    saveLead({
      name: v.name,
      email: v.email,
      phone: v.phone,
      position: `Bewerber Vertriebspartner (${roleLabel})`,
      source: "website-vertriebspartner",
      title: `Bewerbung Vertriebspartner (${roleLabel}): ${v.name}`,
      nextFollowUpAt: followUp,
      notes: [
        `Rolle: ${roleLabel}`,
        `Erfahrung: ${EXPERIENCE_LABEL[v.experience]}`,
        `Verfügbarkeit: ${AVAILABILITY_LABEL[v.availability]}`,
        `Telefon: ${v.phone}`,
        v.profile?.trim() ? `Profil: ${v.profile}` : "",
        v.message?.trim() ? `Nachricht: ${v.message}` : "",
        `Sprache: ${v.locale}`,
        `Quelle: ${source}`,
        `Eingang: ${when}`,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  ]);

  if (!ack.ok) {
    // Die Bestätigung hängt an einem verifizierten Absender — nur loggen, nicht scheitern.
    console.error("[apply] confirmation to applicant failed:", ack.error);
  }

  if (!internal.ok) {
    return NextResponse.json(
      { ok: false },
      { status: internal.error === "not_configured" ? 500 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
