# Datenschutz-Absatz für den Voice-/Telefon-Assistenten (Vapi)

Der KI-Sprachassistent verarbeitet personenbezogene Daten und nutzt mehrere
Auftragsverarbeiter (Vapi, Deepgram, OpenAI, Google Calendar) sowie eure
selbst gehostete n8n-Instanz. Das gehört in die Datenschutzerklärung.
**Keine Rechtsberatung** — vor Live-Gang anwaltlich/DSB prüfen lassen.

Einsetzen in das `sections`-Array unter `Legal.privacy`:
- Deutsch → `messages/de/legal.json`
- Englisch → `messages/en/legal.json`

Vor Veröffentlichung anpassen: **[X Monate]** = eure Aufbewahrungsfrist.

## Deutsch — in `messages/de/legal.json` → `Legal.privacy.sections`

```json
{
  "heading": "KI-Telefon-/Sprachassistent",
  "body": "Für Terminanfragen bieten wir einen KI-gestützten Sprachassistenten an. Wenn Sie mit dem Assistenten sprechen, verarbeiten wir die von Ihnen genannten Angaben (Name, Telefonnummer, Anliegen sowie Ihren Wunschtermin), um Ihre Anfrage zu bearbeiten und einen Beratungstermin zu vereinbaren. Das Gespräch wird nicht aufgezeichnet. Zur Sprachverarbeitung und Automatisierung setzen wir Dienstleister als Auftragsverarbeiter ein: Vapi (Sprachassistent/Telefonie), Deepgram (Spracherkennung), OpenAI (Sprachmodell) sowie Google (Google Calendar zur Terminverwaltung). Die Automatisierung und die Speicherung Ihrer Termindaten erfolgen über unsere selbst gehostete Plattform n8n auf einem Server innerhalb der EU. Bei einigen dieser Dienstleister kann eine Übermittlung in Drittländer (z. B. USA) erfolgen; wir stützen diese auf einen Angemessenheitsbeschluss (EU-US Data Privacy Framework) bzw. die EU-Standardvertragsklauseln. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung und Erfüllung eines Vertrags) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Terminvereinbarung). Die Angabe der Daten ist freiwillig; ohne Kontaktdaten und Wunschtermin können wir jedoch keinen Termin vereinbaren. Ihre Termindaten werden nach [X Monaten] gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen."
}
```

## Englisch — in `messages/en/legal.json` → `Legal.privacy.sections`

```json
{
  "heading": "AI phone / voice assistant",
  "body": "For appointment requests we offer an AI-powered voice assistant. When you speak with the assistant, we process the details you provide (name, phone number, your request and your preferred appointment time) in order to handle your enquiry and arrange a consultation appointment. The call is not recorded. To process speech and automate these steps we use service providers acting as processors: Vapi (voice assistant/telephony), Deepgram (speech recognition), OpenAI (language model) and Google (Google Calendar for appointment handling). Automation and the storage of your appointment data run on our self-hosted n8n platform on a server located within the EU. Some of these providers may involve a transfer to third countries (e.g. the USA); we base this on an adequacy decision (EU-US Data Privacy Framework) or the EU Standard Contractual Clauses. The legal basis is Art. 6(1)(b) GDPR (initiation and performance of a contract) and Art. 6(1)(f) GDPR (legitimate interest in efficient appointment scheduling). Providing the data is voluntary; however, without contact details and a preferred time we cannot arrange an appointment. Your appointment data is deleted after [X months], unless statutory retention obligations apply."
}
```

## Compliance-Checkliste (kurz, damit später keine Probleme)
- [ ] **Google Workspace AVV** (Cloud Data Processing Addendum) im Admin bestätigt — deckt Google Calendar.
- [ ] **AVV / DPA** mit **Vapi**, **OpenAI** (OpenAI Ireland Ltd.) und **Deepgram** abgeschlossen/geprüft.
- [ ] **n8n** = eigener EU-Server → Leads liegen in der n8n-Data-Table (kein US-Transfer). Falls Server bei einem Hoster: dessen AVV.
- [ ] Datenschutzerklärung um obigen Absatz ergänzt (DE + EN), **[X Monate]** gesetzt.
- [ ] **Löschkonzept**: Aufbewahrungsfrist definiert; optional späterer n8n-Cleanup-Workflow.
- [ ] Keine Anrufaufzeichnung (Vapi „Recording" aus) — bestätigt.

> Hinweis: Anbieter/Rechtsgrundlagen sind ein üblicher Vorschlag, keine verbindliche Rechtsauskunft.
> An eure tatsächliche Konfiguration anpassen und anwaltlich/DSB prüfen lassen.
