// Eingangsbestätigung an Bewerber (Vertriebspartner Setter/Closer).
// Transaktionsmail: Dank, nächster Schritt (Termin buchen), Karrieresystem als PDF.

type Locale = "de" | "en";

const copy = {
  de: {
    subject: "Deine Bewerbung bei NexAI ist da",
    preview: "Nächster Schritt: Kennenlerngespräch buchen.",
    heading: "Danke, {name}!",
    body: "Deine Bewerbung als {role} ist bei uns eingegangen. Wir melden uns innerhalb von 2 Werktagen. Den nächsten Schritt kannst du aber schon jetzt machen: Such dir ein 30-minütiges Kennenlerngespräch mit Maximilian Trenk aus.",
    cta: "Kennenlerngespräch buchen",
    pdfLead: "Alle Positionen, Sätze und der Weg zum Senior auf einen Blick:",
    pdf: "Karrieresystem als PDF",
    questions: "Fragen vorab? Antworte einfach auf diese E-Mail oder ruf an: {phone}.",
    fallback: "Falls der Button nicht funktioniert, öffne diesen Link:",
    transactional:
      "Diese E-Mail ist eine Eingangsbestätigung zu deiner Bewerbung, kein Newsletter.",
    signoff: "NEXAI · Next Generation Artificial Intelligence",
  },
  en: {
    subject: "Your application to NexAI has arrived",
    preview: "Next step: book your intro call.",
    heading: "Thank you, {name}!",
    body: "Your application as {role} has reached us. We'll get back to you within 2 working days. You can already take the next step now: pick a 30-minute intro call with Maximilian Trenk.",
    cta: "Book your intro call",
    pdfLead: "All positions, rates and the path to senior at a glance:",
    pdf: "Career system as a PDF",
    questions: "Questions beforehand? Just reply to this email or call: {phone}.",
    fallback: "If the button doesn't work, open this link:",
    transactional: "This email confirms receipt of your application; it is not a newsletter.",
    signoff: "NEXAI · Next Generation Artificial Intelligence",
  },
} satisfies Record<Locale, Record<string, string>>;

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const fill = (s: string, vars: Record<string, string>) =>
  s.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? "");

export function applyEmail(
  locale: Locale,
  opts: {
    name: string;
    roleLabel: string;
    bookingUrl: string;
    pdfUrl?: string;
    phone: string;
  },
) {
  const c = copy[locale];
  const vars = {
    name: escapeHtml(opts.name),
    role: escapeHtml(opts.roleLabel),
    phone: escapeHtml(opts.phone),
  };
  const safeBooking = escapeHtml(opts.bookingUrl);
  const safePdf = opts.pdfUrl ? escapeHtml(opts.pdfUrl) : "";

  const html = `<!doctype html>
<html lang="${locale}">
<body style="margin:0;background:#0b0b0f;padding:32px 16px;font-family:system-ui,-apple-system,Segoe UI,sans-serif">
  <span style="display:none;opacity:0;color:transparent">${c.preview}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#131319;border:1px solid #26262e;border-radius:16px">
    <tr><td style="padding:32px 32px 8px">
      <div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#7c8bff;font-weight:600">NEXAI</div>
      <h1 style="margin:16px 0 8px;font-size:22px;line-height:1.3;color:#f5f5f7">${fill(c.heading, vars)}</h1>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#b4b4bd">${fill(c.body, vars)}</p>
      <a href="${safeBooking}" style="display:inline-block;background:#3b5bff;color:#fff;text-decoration:none;font-size:15px;font-weight:600;padding:12px 24px;border-radius:9999px">${c.cta}</a>
      ${
        safePdf
          ? `<p style="margin:28px 0 0;font-size:14px;line-height:1.6;color:#b4b4bd">${c.pdfLead}<br><a href="${safePdf}" style="color:#7c8bff">${c.pdf}</a></p>`
          : ""
      }
      <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#b4b4bd">${fill(c.questions, vars)}</p>
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#8a8a94">${c.fallback}<br><a href="${safeBooking}" style="color:#7c8bff;word-break:break-all">${safeBooking}</a></p>
      <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#6b6b74">${c.transactional}</p>
    </td></tr>
    <tr><td style="padding:20px 32px 28px;border-top:1px solid #26262e">
      <p style="margin:0;font-size:12px;color:#6b6b74">${c.signoff}</p>
    </td></tr>
  </table>
</body>
</html>`;

  const plain = { name: opts.name, role: opts.roleLabel, phone: opts.phone };
  const text = [
    fill(c.heading, plain),
    "",
    fill(c.body, plain),
    "",
    `${c.cta}: ${opts.bookingUrl}`,
    ...(opts.pdfUrl ? ["", `${c.pdf}: ${opts.pdfUrl}`] : []),
    "",
    fill(c.questions, plain),
    "",
    c.transactional,
    "",
    c.signoff,
  ].join("\n");

  return { subject: c.subject, html, text };
}
