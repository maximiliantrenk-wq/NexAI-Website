# Datenschutz-Absatz für den Chatbot

Der Website-Chatbot verarbeitet personenbezogene Daten und leitet sie an
Auftragsverarbeiter (n8n, OpenAI, Google) weiter. Das sollte in der
Datenschutzerklärung stehen. Unten ein **vorbereiteter Abschnitt** — keine
Rechtsberatung; bei Unsicherheit anwaltlich prüfen lassen.

Füge das jeweilige Objekt in das `sections`-Array unter `Legal.privacy` ein:
- Deutsch → `messages/de/legal.json`
- Englisch → `messages/en/legal.json`

## Deutsch — in `messages/de/legal.json` → `Legal.privacy.sections`

```json
{
  "heading": "Chatbot / KI-Assistent",
  "body": "Auf unserer Website bieten wir einen KI-gestützten Chat-Assistenten an. Wenn Sie den Chat nutzen, verarbeiten wir die von Ihnen eingegebenen Nachrichten sowie ggf. freiwillig angegebene Kontaktdaten (Name, E-Mail, Telefonnummer) und Ihr Anliegen, um Ihre Anfrage zu beantworten und – auf Ihren Wunsch – einen Beratungstermin zu vereinbaren. Zur Verarbeitung der Nachrichten und zur Automatisierung setzen wir Dienstleister als Auftragsverarbeiter ein: die Automatisierungsplattform n8n, das Sprachmodell von OpenAI (OpenAI Ireland Ltd.) sowie Google (Google Calendar und Google Sheets) zur Terminverwaltung und Speicherung Ihrer Anfrage. Dabei kann eine Übermittlung in Drittländer (z. B. USA) erfolgen; wir stützen diese auf die EU-Standardvertragsklauseln. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung/Erfüllung eines Vertrags) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation). Die Angabe von Daten ist freiwillig; ohne Kontaktdaten können wir jedoch keinen Termin vereinbaren."
}
```

## Englisch — in `messages/en/legal.json` → `Legal.privacy.sections`

```json
{
  "heading": "Chatbot / AI assistant",
  "body": "Our website offers an AI-powered chat assistant. When you use the chat, we process the messages you enter and any contact details you voluntarily provide (name, email, phone number) together with your request, in order to answer your enquiry and — at your request — arrange a consultation appointment. To process the messages and automate these steps we use service providers acting as processors: the automation platform n8n, the language model provided by OpenAI (OpenAI Ireland Ltd.), and Google (Google Calendar and Google Sheets) for appointment handling and storing your request. This may involve a transfer to third countries (e.g. the USA), which we base on the EU Standard Contractual Clauses. The legal basis is Art. 6(1)(b) GDPR (initiation/performance of a contract) and Art. 6(1)(f) GDPR (legitimate interest in efficient communication). Providing data is voluntary; however, without contact details we cannot arrange an appointment."
}
```

> Hinweis: Die genannten Anbieter/Rechtsgrundlagen sind ein üblicher Vorschlag,
> keine verbindliche Rechtsauskunft. Prüfe insbesondere, ob OpenAI-DPA und
> Google-Auftragsverarbeitung akzeptiert sind, und passe den Text an eure
> tatsächliche Konfiguration an.
