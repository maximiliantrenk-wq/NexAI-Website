# NEXAI Voice-Agent (Vapi) → n8n Backend – Setup

Diese zwei Workflows ersetzen die bisherigen **Make**-Szenarien für den Vapi-Telefon-/Voice-Agent
„Terminbuchungs-Assistent für NexAI". Sie werden direkt von den Vapi-Tools per Webhook aufgerufen
und antworten im Vapi-Format `{"results":[{"toolCallId","result"}]}`.

- `nexai-vapi-verfuegbarkeit.json` → Vapi-Tool **check_availability** (Webhook-Pfad `nexai-vapi-availability`)
- `nexai-vapi-buchung.json` → Vapi-Tool **book_appointment_make** (Webhook-Pfad `nexai-vapi-booking`)
- `nexai-vapi-rueckruf.json` → Vapi-Tool **request_callback** (Webhook-Pfad `nexai-vapi-rueckruf`) — siehe [Rückruf-Workflow](#rückruf-workflow)

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
   - Der Buchungs-Workflow verschickt außerdem zwei Bestätigungs-E-Mails → dafür zusätzlich eine
     **Gmail-Credential** zuweisen (siehe [Bestätigungs-E-Mails](#bestätigungs-e-mails-kunde--inhaber--bereits-im-workflow-eingebaut)).

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

## Bestätigungs-E-Mails (Kunde + Inhaber) — **bereits im Workflow eingebaut**
Der Agent fragt nach der **E-Mail-Adresse**; danach verschickt n8n automatisch zwei Mails: eine schöne
Marken-Bestätigung an den Kunden und eine Info-Mail an dich (mbt@nex-a-i.com) mit allen Kundendaten.
Die dafür nötigen Nodes (**IF „Hat E-Mail?"** + **Kunden-Bestätigung** + **Inhaber-Info**) sind seit
2026-07-21 fester Bestandteil von `nexai-vapi-buchung.json` — du musst sie **nicht** mehr selbst
einfügen:

```
Create Event → Hat E-Mail? ──ja──→ Kunden-Bestätigung ──┐
                   └────────nein────────────────────────→ Inhaber-Info → Return: Booked
```

- Nennt der Kunde **keine** E-Mail, wird **keine** Kunden-Mail verschickt (sauber über den IF-Zweig);
  die Inhaber-Mail geht in beiden Fällen raus.
- Beide Gmail-Nodes haben **On Error → Continue** — hakt Gmail einmal, ist der Termin trotzdem
  gebucht und der Agent bestätigt dem Anrufer sauber (statt eines Fehlers).

**Das Einzige, was du noch tun musst — die Gmail-Credential zuweisen** (Credentials werden aus
Sicherheitsgründen nie mit-exportiert, deshalb sind die zwei Gmail-Nodes nach dem Import rot markiert):

1. **Gmail-Credential in n8n anlegen:** Credentials → **Gmail OAuth2** → mit **mbt@nex-a-i.com**
   anmelden (Google Workspace). Eine **eigene** Credential, auch wenn schon eine Google-Calendar-Credential
   existiert (die hat i. d. R. keine Gmail-Sende-Rechte).
2. Im Buchungs-Workflow beide Gmail-Nodes (**„Kunden-Bestätigung"** und **„Inhaber-Info"**) öffnen und
   oben diese Gmail-Credential auswählen. Danach ist der rote Hinweis weg.
3. **Vapi-Prompt:** Der Agent muss nach der E-Mail fragen (Schritt „E-Mail für die Bestätigung",
   siehe Chat) und im Erfolgssatz „Bestätigung kommt per E-Mail" sagen. `book_appointment_make`
   übergibt `email` bereits.

Wortlaut/Design der Mails kannst du direkt im jeweiligen Gmail-Node (Feld **Message**) anpassen — oder
die Vorlagen `n8n/email-kunde.html` / `n8n/email-inhaber.html` ändern und mir Bescheid geben, dann baue
ich sie neu in den Workflow ein.

> SMS statt/zusätzlich zur E-Mail folgt später — braucht einen Twilio-Account (Absendernummer) und
> einen Twilio-Node in n8n.

## Rückruf-Workflow

**Warum:** Der Assistent stellt **grundsätzlich nicht durch** — das ist eine bewusste Entscheidung,
kein Provisorium. Wer einen Mitarbeiter sprechen möchte, bekommt einen **Rückruf** zugesagt; Name,
Nummer und Anliegen gehen per E-Mail an `mbt@nex-a-i.com`. Dieser Workflow sorgt dafür, dass der
Wunsch auch wirklich ankommt statt nur im Vapi-Transkript zu landen.

> Hintergrund: Eine echte Weiterleitung wäre über den easybell-Trunk ohnehin nicht möglich — Vapi
> schickt SIP REFER, das easybell nicht ausführt, und ausgehende Anrufe scheitern durchgängig mit
> SIP 407. Das Vapi-Transfer-Tool ist deshalb aus dem Assistenten ausgehängt (nicht gelöscht).

Aufbau (`nexai-vapi-rueckruf.json`):

```
Webhook → Parse & Normalize → Hat Kontakt? ──true──→ [Gmail: Rückruf-Info] → Return: Notiert ──┐
                                   └────────false──→ Return: Nachfrage ─────────────────────────┴→ Respond
```

`Parse & Normalize` liest den Body **flach** ODER als Vapi-Envelope (`arguments` als Objekt, JSON-String,
mehrzeilig oder leer — alles abgedeckt). Nennt der Anrufer **keine** Nummer, wird automatisch die
Anrufernummer aus `message.call.customer.number` verwendet. Nur wenn **weder Nummer noch E-Mail**
vorliegen, geht es in den Nachfrage-Zweig.

1. **Import from File** → `nexai-vapi-rueckruf.json`.

2. **Gmail-Node einfügen** (zwischen **„Hat Kontakt?"** true-Zweig und **„Return: Notiert"**):
   - Gmail, Operation **Send a message**, Credential wie oben (`mbt@nex-a-i.com`)
   - To = `mbt@nex-a-i.com` — **Jasons Adresse als zweiten Empfänger ergänzen**, sobald bekannt
   - Subject = `=📞 Rückruf gewünscht: {{ $('Parse & Normalize').item.json.name }} – {{ $('Parse & Normalize').item.json.rueckrufnummer }}`
   - Email Type = **HTML** · Message = Inhalt aus `n8n/email-rueckruf.html` (Expression-Modus)
   - **Settings → On Error → Continue (using regular output)** — sonst bekommt der Anrufer bei einem
     Mail-Fehler keine Bestätigung mehr.

3. **Optional: Data-Table-Eintrag** (gleiche Tabelle `Leads` wie bei der Buchung), Node **Insert row**
   ebenfalls im true-Zweig, Mapping wie oben — aber:
   - `Termin` = *(leer)* · `Status` = `Rückruf gewünscht` · `Quelle` = `Voice Agent Jarvis`
   - `Telefon` = `={{ $('Parse & Normalize').item.json.rueckrufnummer }}`

4. **Aktivieren** und die Production-URL schicken: `https://<n8n-host>/webhook/nexai-vapi-rueckruf`

Danach lege ich das Vapi-Tool **`request_callback`** an (apiRequest, POST auf diese URL, Parameter
`name`, `telefon`, `anliegen`, `email`) und ergänze den Prompt-Abschnitt „MITARBEITER GEWÜNSCHT".

### Test per curl

```bash
# Normalfall (flacher Body)
curl -X POST 'https://<n8n-host>/webhook/nexai-vapi-rueckruf' \
  -H 'Content-Type: application/json' \
  -d '{"toolCallId":"r1","name":"Test Anrufer","telefon":"0170 1234567","anliegen":"Angebot"}'

# Envelope-Format mit arguments als String
curl -X POST 'https://<n8n-host>/webhook/nexai-vapi-rueckruf' \
  -H 'Content-Type: application/json' \
  -d '{"message":{"toolCalls":[{"id":"r2","function":{"arguments":"{\"name\":\"Test\",\"telefon\":\"0171 222\"}"}}]}}'

# Ohne Kontaktweg → muss Nachfrage liefern, darf NICHT crashen
curl -X POST 'https://<n8n-host>/webhook/nexai-vapi-rueckruf' \
  -H 'Content-Type: application/json' -d '{"toolCallId":"r3","name":"Ohne Nummer"}'
```

Erwartung: 1+2 → `{"results":[{"toolCallId":"r1","result":"Der Rückrufwunsch ist notiert …"}]}` + Mail,
3 → `„Es fehlt noch ein Weg, den Anrufer zu erreichen …"`, keine Mail.

> Sollte die Weiterleitung eines Tages doch gewünscht sein: Das Transfer-Tool `452469aa…` existiert
> noch und muss nur wieder in `model.toolIds` des Assistenten eingehängt werden — dann aber erst,
> wenn easybell SIP REFER oder ausgehende Anrufe freigeschaltet hat.

## Migration abschließen
Wenn n8n grün ist, werden die Make-Szenarien **6442350** + **6442359** nur **deaktiviert**
(nicht gelöscht) als Fallback.
