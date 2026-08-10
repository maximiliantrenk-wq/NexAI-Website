// Bilingual confirmation email for the newsletter double opt-in.
// Sent to the subscriber; the button links to /<locale>/newsletter/confirm?token=…

type Locale = "de" | "en";

const copy = {
  de: {
    subject: "Bitte bestätigen Sie Ihre Newsletter-Anmeldung",
    preview: "Ein Klick fehlt noch zur Anmeldung.",
    heading: "Fast geschafft",
    body: "Bitte bestätigen Sie, dass Sie den NEXAI-Newsletter erhalten möchten. Erst danach nehmen wir Ihre Adresse in den Verteiler auf.",
    cta: "Anmeldung bestätigen",
    ignore:
      "Wenn Sie sich nicht angemeldet haben, ignorieren Sie diese E-Mail einfach – es passiert dann nichts weiter.",
    fallback: "Falls der Button nicht funktioniert, öffnen Sie diesen Link:",
    signoff: "NEXAI · Next Generation Artificial Intelligence",
  },
  en: {
    subject: "Please confirm your newsletter subscription",
    preview: "One click left to subscribe.",
    heading: "Almost there",
    body: "Please confirm that you'd like to receive the NEXAI newsletter. We'll only add your address to the list once you do.",
    cta: "Confirm subscription",
    ignore:
      "If you didn't sign up, just ignore this email — nothing further will happen.",
    fallback: "If the button doesn't work, open this link:",
    signoff: "NEXAI · Next Generation Artificial Intelligence",
  },
} satisfies Record<Locale, Record<string, string>>;

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export function confirmEmail(locale: Locale, url: string) {
  const c = copy[locale];
  const safeUrl = escapeHtml(url);

  const html = `<!doctype html>
<html lang="${locale}">
<body style="margin:0;background:#0b0b0f;padding:32px 16px;font-family:system-ui,-apple-system,Segoe UI,sans-serif">
  <span style="display:none;opacity:0;color:transparent">${c.preview}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#131319;border:1px solid #26262e;border-radius:16px">
    <tr><td style="padding:32px 32px 8px">
      <div style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#7c8bff;font-weight:600">NEXAI</div>
      <h1 style="margin:16px 0 8px;font-size:22px;line-height:1.3;color:#f5f5f7">${c.heading}</h1>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#b4b4bd">${c.body}</p>
      <a href="${safeUrl}" style="display:inline-block;background:#3b5bff;color:#fff;text-decoration:none;font-size:15px;font-weight:600;padding:12px 24px;border-radius:9999px">${c.cta}</a>
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#8a8a94">${c.fallback}<br><a href="${safeUrl}" style="color:#7c8bff;word-break:break-all">${safeUrl}</a></p>
      <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#6b6b74">${c.ignore}</p>
    </td></tr>
    <tr><td style="padding:20px 32px 28px;border-top:1px solid #26262e">
      <p style="margin:0;font-size:12px;color:#6b6b74">${c.signoff}</p>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `${c.heading}\n\n${c.body}\n\n${c.cta}: ${url}\n\n${c.ignore}\n\n${c.signoff}`;

  return { subject: c.subject, html, text };
}
