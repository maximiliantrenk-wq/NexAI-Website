# White-Label pro Kunde in n8n — Setup (~5 Min)

Ziel: neuen Kunden (Autohaus) so einrichten, dass seine Anrufe/Leads/Termine in
**seinen** CRM-Mandanten laufen — mit minimalen Handgriffen. Der Trick: der Sub
**„Save Lead to CRM (Multi-Tenant Vorlage)"** bekommt den CRM-Key **als Eingabe**;
die Eltern-Workflows reichen den Kunden-Key aus **einer** „Kunden-Config"-Node durch.

> Begleitdoku: `KUNDEN-STECKBRIEF.md` (Werte-Karte) · CRM-Repo `docs/ONBOARDING_WHITELABEL.md` (Gesamtablauf).
> ⚠️ Goldene Regel: eigener CRM-**Mandant + Key** pro Kunde. Nie den NexAI-Key nehmen.

---

## Einmalig

Importiere **`NEXAI – Save Lead to CRM (Multi-Tenant Vorlage).json`** in n8n. Er ist
**geteilt** (ein Sub für alle Kunden) — dein bisheriger „Save Lead to CRM" bleibt unberührt.

Kalender-Modell (schnellster Weg, „Modell A"): **ein** Google-Konto (deins) bleibt als
Credential an den Calendar-Nodes; jeder Kunde **teilt** seinen Kalender an dieses Konto,
und du trägst nur die **Kalender-ID** in die Config-Node ein. Kein Credential-Tausch pro Kunde.

---

## Pro Kunde (~5 Min)

**1. CRM:** Mandant + Admin-Nutzer anlegen (Platform-Admin) → im Mandanten **API-Key**
erzeugen (Settings → API-Keys, Scopes contacts + leads). Key kopieren.

**2. n8n:** die zwei Eltern-Vorlagen duplizieren (⋯ → Duplicate) und umbenennen:
- „**Autohaus X** · Termin buchen"
- „**Autohaus X** · Verfügbarkeit prüfen"

**3. „Kunden-Config"-Node einfügen** (direkt nach dem **Webhook**): Node **„Edit Fields (Set)"**,
umbenennen in **„Kunden-Config"**, vier String-Felder:

| Feld | Wert |
|---|---|
| `crmApiKey` | `nxk_…` (der Key aus Schritt 1) |
| `kalenderId` | Kalender-ID des Kunden (Google → Kalendereinstellungen) |
| `notifyEmail` | interne Adresse des Betriebs (z. B. `info@autohaus-x.de`) |
| `firmenname` | „Autohaus X" |

Die Node so verdrahten, dass sie **direkt nach dem Webhook** in der Kette liegt (Webhook → Kunden-Config → Parse …).

**4. Referenzen umbiegen** (in beiden duplizierten Workflows):
- **Google-Calendar-Nodes** (`Konflikt prüfen`, `Create Event`, `Get Events (14d window)`): Feld **Calendar** →
  `={{ $('Kunden-Config').item.json.kalenderId }}`
- **`Inhaber-Info`** (Gmail): Feld **To** → `={{ $('Kunden-Config').item.json.notifyEmail }}`
- **`Save to CRM`** (Execute Workflow): Ziel-Workflow auf **„…Multi-Tenant Vorlage"** setzen und beim
  Input zusätzlich **`crmApiKey`** = `={{ $('Kunden-Config').item.json.crmApiKey }}` mitgeben
  (die anderen Felder name/email/phone/… bleiben wie gehabt).
- **Webhook**-Node: **Path** eindeutig pro Kunde, z. B. `autohaus-x-buchung` bzw. `autohaus-x-verfuegbarkeit`.

**5. Aktivieren** → die **Production-Webhook-URLs** kopieren → im **Vapi-Assistant** des Kunden
als Tool-URLs eintragen. Recording im Assistant **aus**.

**6. Testanruf** → Termin nennen → prüfen:
- Kontakt + Lead erscheinen im **Autohaus-Mandanten** (dort einloggen), **nicht** bei NexAI
- Termin im richtigen Kalender, Doppelbuchungsschutz greift
→ Testdaten wieder löschen.

---

## Warum das <5 Min bleibt
Pro Kunde änderst du praktisch nur **eine Node** (Kunden-Config: Name + Key + Kalender + Mail)
und den Webhook-Pfad. Der CRM-Schreib-Sub ist geteilt; der Key fließt als Daten durch.

> **v1 — beim ersten echten Autohaus gemeinsam durchgehen.** Ich kann n8n von hier nicht
> ausführen; die JSON-Struktur ist geprüft, aber die genaue Verdrahtung (Input-Mapping am
> „Save to CRM"-Node, Kalender-Feld je Node-Version) bestätigen wir beim Import + Testanruf.
> Sicherheitshinweis: In diesem Modell steht der Kunden-Key in der „Kunden-Config"-Node des
> Kunden-Workflows (nicht im Git). Für maximale Trennung ginge auch je Kunde ein n8n-Credential —
> etwas mehr Klicks, dafür der Key verschlüsselt. Beim ersten Kunden entscheiden.
