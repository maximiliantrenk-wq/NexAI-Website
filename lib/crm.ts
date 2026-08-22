// Server-side: mirror inbound website leads into the self-hosted NEXAI CRM
// (crm.nex-a-i.com) so no lead ever lives only in an inbox. Best-effort and
// fault-tolerant by design: a CRM outage must NEVER break the form — the
// email stays the primary acknowledgement path, this is an additional durable sink.
//
// Required env to activate:
//   CRM_API_URL  — CRM base origin, e.g. https://crm.nex-a-i.com (NO trailing /api)
//   CRM_API_KEY  — an nxk_… API key with contacts + leads write scope
// When either is unset, saveLead() is a silent no-op → the form behaves exactly
// as before (email only). This makes the rollout safe: deploy first, flip on later.

type CrmResult = { ok: true } | { ok: false; error: "not_configured" | "request_failed" };

export type CrmLead = {
  name: string;
  email: string;
  /** Provenance tag stored on both contact and lead, e.g. "website-kontakt". */
  source: string;
  /** Lead title, e.g. "Kontaktanfrage – Max Muster". */
  title: string;
  /** Free-text lead notes (company, message, …). */
  notes?: string;
  /** Optional contact fields — the CRM DTOs are strict, these are the allowed extras. */
  phone?: string;
  position?: string;
  /** ISO datetime for the CRM follow-up reminder on the lead. */
  nextFollowUpAt?: string;
};

const TIMEOUT_MS = 6000;

async function crmPost(
  base: string,
  key: string,
  path: string,
  body: unknown,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Upsert a contact (CRM dedups by email) and create a linked lead.
 * Never throws; returns a result and logs failures for observability.
 */
export async function saveLead(lead: CrmLead): Promise<CrmResult> {
  const base = process.env.CRM_API_URL?.replace(/\/+$/, "");
  const key = process.env.CRM_API_KEY;
  if (!base || !key) {
    // Not wired up yet — skip silently so the form still works (email only).
    return { ok: false, error: "not_configured" };
  }

  const parts = lead.name.trim().split(/\s+/).filter(Boolean);
  const contact: Record<string, unknown> = {
    firstName: parts[0] || "Unbekannt",
    source: lead.source,
  };
  if (parts.length > 1) contact.lastName = parts.slice(1).join(" ");
  if (/.+@.+\..+/.test(lead.email)) contact.email = lead.email;
  if (lead.phone) contact.phone = lead.phone.slice(0, 64);
  if (lead.position) contact.position = lead.position.slice(0, 200);

  try {
    // 1) Upsert the contact — the CRM dedups by email and returns the existing one.
    let contactId: string | undefined;
    const cRes = await crmPost(base, key, "/api/contacts", contact);
    if (cRes.ok) {
      const cBody = (await cRes.json().catch(() => null)) as
        | { data?: { id?: string } }
        | null;
      contactId = cBody?.data?.id;
    } else {
      console.error("[crm] contact create failed:", cRes.status, await cRes.text().catch(() => ""));
    }

    // 2) Create the lead — linked to the contact when we have its id, else standalone
    //    (an orphan lead still beats a lost lead).
    const leadBody: Record<string, unknown> = {
      title: lead.title.slice(0, 300),
      source: lead.source,
    };
    if (lead.notes) leadBody.notes = lead.notes.slice(0, 5000);
    if (contactId) leadBody.contactId = contactId;
    if (lead.nextFollowUpAt) leadBody.nextFollowUpAt = lead.nextFollowUpAt;

    const lRes = await crmPost(base, key, "/api/leads", leadBody);
    if (!lRes.ok) {
      console.error("[crm] lead create failed:", lRes.status, await lRes.text().catch(() => ""));
      return { ok: false, error: "request_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[crm] request failed:", err);
    return { ok: false, error: "request_failed" };
  }
}
