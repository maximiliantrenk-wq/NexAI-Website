// Server-side email delivery via the Resend REST API.
// No SDK dependency — a direct fetch works from Vercel functions (Resend is
// API-key authenticated and does not block server IPs, unlike FormSubmit).
//
// Required env: RESEND_API_KEY
// Optional env: CONTACT_TO   (recipient, default mbt@nex-a-i.com)
//               CONTACT_FROM (sender, default Resend's shared onboarding sender;
//                             switch to a verified nex-a-i.com sender in prod)

type SendResult = { ok: true } | { ok: false; error: "not_configured" | "send_failed" };

export async function sendMail({
  subject,
  html,
  text,
  replyTo,
}: {
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[email] RESEND_API_KEY is not set — cannot send.");
    return { ok: false, error: "not_configured" };
  }

  const to = process.env.CONTACT_TO ?? "mbt@nex-a-i.com";
  const from = process.env.CONTACT_FROM ?? "NEXAI <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        ...(text ? { text } : {}),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[email] Resend error:", res.status, detail);
      return { ok: false, error: "send_failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("[email] request failed:", err);
    return { ok: false, error: "send_failed" };
  }
}

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );

/** Render a label→value map as a simple HTML table for the notification email. */
export function fieldsToHtml(fields: Record<string, string>): string {
  const rows = Object.entries(fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;font-weight:600;color:#0b0b0f;vertical-align:top;white-space:nowrap">${escapeHtml(
          k,
        )}</td><td style="padding:6px 0;color:#333">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;line-height:1.5">${rows}</table>`;
}

/** Plain-text fallback of the same fields. */
export function fieldsToText(fields: Record<string, string>): string {
  return Object.entries(fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}
