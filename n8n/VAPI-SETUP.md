# NEXAI Voice-Agent (Vapi) → n8n Backend – Setup

Diese zwei Workflows ersetzen die bisherigen **Make**-Szenarien für den Vapi-Telefon-/Voice-Agent
„Terminbuchungs-Assistent für NexAI". Sie werden direkt von den Vapi-Tools per Webhook aufgerufen
und antworten im Vapi-Format `{"results":[{"toolCallId","result"}]}`.

- `nexai-vapi-verfuegbarkeit.json` → Vapi-Tool **check_availability** (Webhook-Pfad `nexai-vapi-availability`)
- `nexai-vapi-buchung.json` → Vapi-Tool **book_appointment_make** (Webhook-Pfad `nexai-vapi-booking`)

Der Buchungs-Workflow parst das Datum robust in einem **Code-Node** (deutsche Datumsformate,
Monatsnamen/Abkürzungen, Punkt-Uhrzeit, fehlendes Jahr mit Smart-Year, relative Angaben „morgen"
und Wochentage). Er liest den Vapi-Body **flach** (`{"termin":…}`) ODER verschachtelt
(`message.toolCalls[0]…`) — funktioniert also mit beiden Tool-Typen.

## Import & Einrichtung (in n8n)

1. **Workflows → Import from File** → beide JSONs importieren.

2. **Google-Calendar-Credential zuweisen** (Konto `mbt@nex-a-i.com` — der Geschäftskalender, Google
   Workspace):
   - Verfügbarkeit: Node **„Get Events (14d window)"** → Google-Calendar-Credential.
   - Buchung: Node **„Create Event"** → Google-Calendar-Credential.
   - Kalender steht auf **`primary`** = Hauptkalender des verbundenen Kontos (mbt).

3. **Leads DSGVO-konform in einer n8n-Data-Table speichern** (statt Google Sheets — die Daten bleiben
   auf eurem eigenen EU-Server, kein zusätzlicher US-Dienstleister):
   a. In n8n links auf **Data Tables** (Projekt-Overview) → **Create Data Table** → Name `Leads`,
      Spalten (alle Typ `String`): `Zeitstempel · Name · Telefon · Anliegen · Termin · Status · Quelle`.
   b. Im Buchungs-Workflow zwischen **„Create Event"** und **„Return: Booked"** einen Node
      **„Data Table"** (Operation **Insert row**) einfügen, Tabelle `Leads` wählen, Felder mappen:
      - `Zeitstempel` = `={{ $now.setZone('Europe/Berlin').toFormat('yyyy-LL-dd HH:mm') }}`
      - `Name` = `={{ $('Parse & Normalize').item.json.name }}`
      - `Telefon` = `={{ $('Parse & Normalize').item.json.telefon }}`
      - `Anliegen` = `={{ $('Parse & Normalize').item.json.anliegen }}`
      - `Termin` = `={{ $('Parse & Normalize').item.json.startLabel }}`
      - `Status` = `Termin gebucht`
      - `Quelle` = `Voice Agent Jarvis`
      Danach beim Node **Settings → On Error → Continue (using regular output)** setzen (dann bucht es
      auch, falls das Loggen mal hakt).
   c. Der frühere **Google-Sheets-Node ist entfernt** — kein Google-Sheets-Zugriff / keine Freigabe mehr nötig.
      Datenschutz-Textbaustein für die Datenschutzerklärung: `n8n/privacy-snippet-voice.md`.

4. **Beide Workflows aktivieren** (Toggle „Active"). Erst dann existiert die **Production**-Webhook-URL.

5. **Beide Production-URLs kopieren** (nicht die `webhook-test/…`-URL) und an mich schicken:
   - `https://<n8n-host>/webhook/nexai-vapi-availability`
   - `https://<n8n-host>/webhook/nexai-vapi-booking`

Danach biege ich die zwei Vapi-Tools auf diese URLs um und teste end-to-end (Web-Call).

## Sicherheit
Die Webhooks sind aktuell **ohne Auth** (wie die alten Make-Webhooks). Optional später: Header-Auth
in den Webhook-Nodes + passender Header im Vapi-Tool.

## Test per curl (nach Aktivierung)
```bash
# Verfügbarkeit
curl -X POST 'https://<n8n-host>/webhook/nexai-vapi-availability' \
  -H 'Content-Type: application/json' -d '{"toolCallId":"t1"}'

# Buchung (flacher Vapi-apiRequest-Body)
curl -X POST 'https://<n8n-host>/webhook/nexai-vapi-booking' \
  -H 'Content-Type: application/json' \
  -d '{"toolCallId":"t2","name":"Test","termin":"14.07.2026 11:00","anliegen":"Beratung"}'
```
Erwartung: Verfügbarkeit liefert „Heute ist …", Buchung legt ein Kalender-Event an + antwortet
„Perfekt, der Termin am … ist verbindlich gebucht.".

## Migration abschließen
Wenn n8n grün ist, werden die Make-Szenarien **6442350** + **6442359** nur **deaktiviert**
(nicht gelöscht) als Fallback.
