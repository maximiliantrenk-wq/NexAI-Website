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

2. **Google-Credentials zuweisen** (Konto `maximiliantrenk@gmail.com` — dieselbe wie beim bisherigen
   Kalender, damit Web & Voice sich nicht kollidieren):
   - Verfügbarkeit: Node **„Get Events (14d window)"** → Google-Calendar-Credential.
   - Buchung: Node **„Create Event"** → Google-Calendar-Credential; Node **„Append Lead Row"** →
     Google-Sheets-Credential.
   - Kalender steht auf **`primary`** → das ist der Hauptkalender des verbundenen Kontos. Falls der
     Voice-Kalender ein anderer ist, im Node den richtigen Kalender auswählen.

3. **Sheet-Tab anlegen:** In der „Lead Tabelle"
   (`1VN8nDRSKuPRXLwAsVMqLezcWLirnFSYMiDKGTi7NrJk`) einen Tab **`Voice-Termine`** erstellen mit
   Kopfzeile (Zeile 1, exakt):
   `Timestamp | Name | E-Mail | Telefon | Anliegen | Termin | Status | Quelle`
   (Der Append-Node ist auf „continue on error" gesetzt: falls der Tab fehlt, wird der Termin trotzdem
   gebucht — nur die Zeile fehlt dann.)

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
