# NEXAI Website-Chatbot — Setup

Der Chatbot besteht aus zwei Teilen:

1. **Frontend** — bereits in der Website eingebaut (`components/chat/chat-widget.tsx`,
   gemountet im Layout, Texte in `messages/{de,en}/chat.json`). Es sendet jede
   Nachricht an die interne Route `POST /api/chat`.
2. **Backend** — `/api/chat` leitet die Nachricht sicher an einen **n8n-Workflow**
   weiter (KI-Agent + Google Calendar + Google Sheets). Diese Anleitung richtet
   das n8n-Backend ein und verbindet es mit der Website.

```
Browser (Chat-Widget)
   │  POST { sessionId, message, locale }
   ▼
/api/chat  (Next.js, versteckt die n8n-URL, prüft Secret, Timeout, Rate-Limit)
   ▼
n8n Webhook  →  AI Agent (gpt-4.1-mini) + Memory
                 ├─ check_availability  → Google Calendar (frei/belegt)
                 ├─ book_appointment    → Sub-Workflow: prüfen → Termin + Sheet-Zeile / Alternativen
                 └─ save_lead           → Google Sheets (Lead ohne Termin)
   ▼
Antwort { reply }  →  zurück ins Chat-Widget
```

Dateien in diesem Ordner:

- `nexai-website-chat.json` — Haupt-Workflow (importieren)
- `nexai-book-appointment.json` — Buchungs-Sub-Workflow (importieren)
- `system-prompt.md` — der System Prompt des KI-Agenten (bereits im Haupt-Workflow enthalten; hier zum Nachlesen/Anpassen)

---

## 0. Was du am Ende eintragen musst (Kurzübersicht)

| Wert | Wo eintragen |
|---|---|
| **Google-Kalender-ID** | n8n → in beiden Workflows in jeder Google-Calendar-Node (`REPLACE_WITH_GOOGLE_CALENDAR_ID`) |
| **Google-Sheet-ID** | n8n → Sub-Workflow-Node „Append Lead Row" **und** Haupt-Workflow-Tool „save_lead" (`REPLACE_WITH_GOOGLE_SHEET_ID`) |
| **Sheet-Tab** | beide obigen Nodes → Tab „Website-Chat" auswählen |
| **Secret** (frei wählbar) | n8n Header-Auth-Credential **und** Vercel-Variable `N8N_CHAT_SECRET` (identisch!) |
| **Webhook-URL** (gibt n8n vor) | Vercel-Variable `N8N_CHAT_WEBHOOK_URL` |
| **Telefonnummer** | steht bereits im System Prompt: **0176 80714816** (bei Änderung dort anpassen) |

---

## 1. Voraussetzungen

1. **OpenAI-API-Key**
   - Konto auf <https://platform.openai.com> anlegen, unter *Billing* etwas
     Guthaben aufladen (der Chat nutzt `gpt-4.1-mini` — pro Unterhaltung
     typischerweise deutlich unter 1 Cent).
   - Unter *API Keys* einen Key erstellen (`sk-…`) und notieren.
2. **n8n-Konto** — siehe Schritt 2.
3. **Google-Konto**, das Zugriff auf den gewünschten Kalender und das
   Master-Leads-Google-Sheet hat.

---

## 2. n8n einrichten

Zwei Optionen:

### Option A — n8n Cloud (empfohlen für den Start)
- Konto auf <https://n8n.io> → *Cloud* anlegen (kostenlose Testphase, danach ab
  ca. 20–24 €/Monat). Kein Server, keine Wartung.
- Zeitzone ist standardmäßig UTC — das ist ok, weil unsere Workflows die
  Zeitzone `Europe/Berlin` überall explizit setzen.

### Option B — n8n self-hosted (z. B. Docker)
- Beim Start diese Umgebungsvariablen setzen, damit Datumsangaben stimmen:
  ```
  GENERIC_TIMEZONE=Europe/Berlin
  TZ=Europe/Berlin
  ```
- Der Webhook muss von außen (vom Vercel-Server) erreichbar sein — also eine
  öffentliche Domain/HTTPS-URL, kein `localhost`.

---

## 3. Google-Zugang (Calendar + Sheets) in n8n verbinden

Der Agent braucht zwei Google-Credentials in n8n: **Google Calendar** und
**Google Sheets** (dasselbe Google-Konto).

### n8n Cloud
- Beim Anlegen eines Google-Calendar- bzw. Google-Sheets-Credentials bietet n8n
  Cloud „**Sign in with Google**" an (verwalteter OAuth, kein eigenes Google-Cloud-Projekt nötig).
  Einmal für Calendar, einmal für Sheets durchklicken und den Zugriff bestätigen.

### Self-hosted (Google Cloud OAuth selbst anlegen)
Etwas fummelig, einmalig ~15 Min:
1. <https://console.cloud.google.com> → neues Projekt anlegen.
2. *APIs & Services → Library*: **Google Calendar API**, **Google Sheets API** und
   **Google Drive API** aktivieren (Drive wird für die Datei-Auswahl gebraucht).
3. *OAuth consent screen*: Typ **External**, App-Namen eintragen, dein eigenes
   Google-Konto als **Testnutzer** hinzufügen.
4. ⚠️ **Wichtige Falle:** Solange der Consent-Screen im Status „**Testing**"
   steht, laufen Refresh-Tokens nach **7 Tagen** ab und der Chatbot verliert den
   Kalenderzugriff. Deshalb die App auf „**In production / veröffentlichen**"
   setzen (die „unbestätigt"-Warnung ist für die Eigennutzung unkritisch).
5. *Credentials → Create Credentials → OAuth Client ID → Web application*.
   Als *Authorized redirect URI* die URL eintragen, die n8n beim Anlegen des
   Credentials anzeigt (z. B. `https://DEINE-N8N-DOMAIN/rest/oauth2-credential/callback`).
6. Client-ID + Secret in die n8n-Google-Credentials eintragen und autorisieren.

---

## 4. Workflows importieren und verkabeln

**Reihenfolge einhalten** — der Sub-Workflow muss zuerst existieren, damit der
Haupt-Workflow ihn auswählen kann.

1. **Sub-Workflow importieren:** n8n → *Workflows → Import from File* →
   `nexai-book-appointment.json`. Speichern.
2. **Haupt-Workflow importieren:** dasselbe mit `nexai-website-chat.json`.
3. **Credentials zuweisen** (die JSONs enthalten bewusst keine Zugangsdaten — die
   betroffenen Nodes zeigen bis dahin eine rote Warnung):
   - **OpenAI Chat Model** → dein OpenAI-Credential (mit dem `sk-…`-Key).
   - Alle **Google-Calendar-Nodes** (Haupt: `check_availability`; Sub: `Get Events (14d window)`, `Create Event`) → dein Google-Calendar-Credential.
   - Alle **Google-Sheets-Nodes** (Haupt: `save_lead`; Sub: `Append Lead Row`) → dein Google-Sheets-Credential.
4. **Sub-Workflow im Tool auswählen:** im Haupt-Workflow die Node
   **`book_appointment`** öffnen → Feld *Workflow* → „NEXAI – Book Appointment
   (Sub-Workflow)" auswählen. (Die ID ist absichtlich leer, weil sie pro
   n8n-Instanz unterschiedlich ist.)
5. **Header-Auth-Credential für den Webhook anlegen:** die Node **`Webhook`**
   öffnen → *Authentication* steht auf *Header Auth* → daneben *Create New Credential*:
   - **Name (Header-Name):** `x-nexai-secret`
   - **Value:** ein langes, zufälliges Passwort — **merken**, das kommt gleich
     auch in Vercel als `N8N_CHAT_SECRET`.

---

## 5. Kalender-ID und Sheet-ID eintragen

### Kalender-ID
- Google Kalender → Einstellungen des gewünschten Kalenders → „Kalender-ID"
  (Format `...@group.calendar.google.com`, oder `primary` für den Hauptkalender).
  Empfehlung: **denselben Kalender wie beim Vapi-Voice-Agent** verwenden, damit
  Telefon- und Web-Termine sich nicht überschneiden.
- Diese ID in **jeder** Google-Calendar-Node eintragen, wo aktuell
  `REPLACE_WITH_GOOGLE_CALENDAR_ID` steht (im „From list"-Modus einfach den
  Kalender auswählen).

### Sheet vorbereiten + eintragen
1. Öffne das **Master-Leads-Google-Sheet** und lege ein neues Tab **`Website-Chat`** an.
2. Trage in die **erste Zeile** exakt diese Spaltenüberschriften ein (Reihenfolge wichtig):

   | Timestamp | Name | E-Mail | Telefon | Anliegen | Termin | Status | Quelle |
   |---|---|---|---|---|---|---|---|

3. In den Nodes **`Append Lead Row`** (Sub) und **`save_lead`** (Haupt): das
   Dokument (`REPLACE_WITH_GOOGLE_SHEET_ID`) und das Tab **`Website-Chat`** auswählen.

---

## 6. Aktivieren und Webhook-URL kopieren

1. **Beide** Workflows speichern.
2. Den **Haupt-Workflow aktivieren** (Toggle oben rechts auf *Active*). Erst dann
   existiert die **Production**-Webhook-URL.
3. Node `Webhook` öffnen → die **Production URL** kopieren (NICHT die Test-URL!).
   Sie sieht so aus: `https://DEINE-N8N-DOMAIN/webhook/nexai-chat`.

---

## 7. Website (Vercel) verbinden

In Vercel → *Project → Settings → Environment Variables* zwei Variablen setzen
(für Production, Preview und Development):

```
N8N_CHAT_WEBHOOK_URL = https://DEINE-N8N-DOMAIN/webhook/nexai-chat
N8N_CHAT_SECRET      = <exakt derselbe Wert wie im Header-Auth-Credential>
```

Danach **neu deployen** (Vercel übernimmt neue Env-Variablen erst beim nächsten
Deploy). Für lokale Entwicklung dieselben Werte in `.env.local` eintragen
(siehe `.env.local.example`).

---

## 8. Datenschutz (kurzer Hinweis, keine Rechtsberatung)

Der Chat verarbeitet personenbezogene Daten (Name, E-Mail, Telefon, Anliegen)
und leitet sie über n8n an **OpenAI** weiter; Termine/Leads landen in **Google
Calendar/Sheets**. Das gehört in die Datenschutzerklärung. Für `messages/de/legal.json`
und `messages/en/legal.json` gibt es einen vorbereiteten Absatz in
`n8n/privacy-snippet.md`. Zusätzlich sinnvoll: das **OpenAI-DPA** (Data Processing
Addendum) im OpenAI-Konto akzeptieren. Bei Unsicherheit rechtlich prüfen lassen.

---

## 9. Testanleitung

**In n8n testen (ohne Website):**
- Haupt-Workflow öffnen → *Execute Workflow* im Test-Modus → an die Test-Webhook-URL
  mit einem Tool wie Postman/curl POSTen:
  ```bash
  curl -X POST 'https://DEINE-N8N-DOMAIN/webhook-test/nexai-chat' \
    -H 'Content-Type: application/json' \
    -H 'x-nexai-secret: DEIN_SECRET' \
    -d '{"sessionId":"test-1234","message":"Was macht NEXAI?","locale":"de"}'
  ```
  Erwartung: JSON `{ "reply": "..." }` mit einer sinnvollen Antwort.

**End-to-End auf der Website (nach Deploy):**

1. **FAQ:** „Was macht ihr?" → kurze, verkaufsorientierte Antwort, kein Preis.
2. **Termin – freier Slot:** „Ich möchte einen Termin am (Werktag) um 14 Uhr, ich
   bin Max Mustermann, max@example.com, Thema Voice Agent." → Agent bucht, im
   Kalender erscheint „Beratung NEXAI – Max Mustermann", im Sheet eine Zeile mit
   Status *Termin gebucht*.
3. **Termin – belegter Slot:** denselben Slot nochmal anfragen (mit anderer
   E-Mail) → Agent nennt 2–3 konkrete Alternativen (Werktag, 8–18 Uhr).
4. **Doppel-Buchung:** exakt dieselbe E-Mail + denselben Slot erneut → Agent bucht
   NICHT doppelt (Antwort „bereits gebucht").
5. **Lead ohne Termin:** „Schickt mir Infos an info@firma.de" → Zeile im Sheet mit
   Status *Lead ohne Termin*, kein Kalendereintrag.
6. **Mitarbeiter:** „Ich will mit einem Menschen sprechen" → nennt **0176 80714816**.
7. **Relatives Datum:** „morgen um 10 Uhr" → landet auf dem richtigen Kalendertag.
8. **Englisch:** die Seite auf `/en` öffnen und auf Englisch schreiben → Antworten
   kommen auf Englisch.
9. **Mobil:** auf dem Handy öffnen → Vollbild-Chat, Tastatur verdeckt nichts.

---

## 10. Häufige Stolpersteine

- **Widget zeigt „technisches Problem":** Webhook-URL/Secret in Vercel prüfen,
  Workflow aktiv? Production-URL (nicht Test-URL)? Nach Env-Änderung neu deployt?
- **Leere/keine Antwort:** In der `Webhook`-Node muss *Respond* auf „**Using
  Respond to Webhook Node**" stehen (ist im Import so gesetzt) und der Workflow
  aktiv sein.
- **Falsche Uhrzeiten (self-hosted):** `GENERIC_TIMEZONE=Europe/Berlin` gesetzt?
- **Node „nicht erkannt" / veraltete Parameter:** n8n aktualisieren — `gpt-4.1-mini`
  setzt eine halbwegs aktuelle n8n-Version voraus.
- **Kalenderzugriff bricht nach ~1 Woche ab (self-hosted):** OAuth-Consent-Screen
  ist noch im Status „Testing" → auf „In production" veröffentlichen (Schritt 3.4).
