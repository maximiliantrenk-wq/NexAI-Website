# Zum Abschicken: OpenAI-Anfrage

**So verschickst du sie:**

1. Auf **platform.openai.com** anmelden — mit dem Konto, dem die Schlüssel gehören
2. Oben rechts auf **Help** → **Messages** → **Send us a message**
3. Kategorie: **Account / Billing** (oder **Other**, falls es die Kategorie nicht gibt)
4. Betreff und Text unten hineinkopieren
5. Vor dem Abschicken die **Organization ID** eintragen — sie steht unter
   **Settings → Organization → General** und beginnt mit `org-`

Der Weg über *Help → Messages* ist wichtig: von dort wird die Anfrage automatisch
eurer Organisation zugeordnet. Eine Mail von außen landet im allgemeinen Postfach.

Hintergrund, Klickweg für danach und die Umstellung im Portal stehen in
[`OpenAI-Antraege-EU-Region-und-ZDR.md`](OpenAI-Antraege-EU-Region-und-ZDR.md).

---

## Betreff

```
Request for EU data residency and Zero Data Retention
```

## Nachricht

```
Hello,

we would like to request EU data residency and Zero Data Retention for our
organization.

Organization ID: org-____________________   (bitte eintragen)

About us
NexAI – Next Generation Artificial Intelligence GbR
Untere Bergstrasse 13, 74586 Frankenhardt-Honhardt, Germany
Contact: mbt@nex-a-i.com

We build AI voice and chat assistants for German business customers. We process
personal data of EU data subjects through the OpenAI API, and for several of our
services we act as a processor on behalf of our own customers under Art. 28
GDPR. We have concluded the Data Processing Addendum with OpenAI Ireland Limited.

What we are asking for
1. EU data residency — permission to create a project with Europe as its region
   and to route our API traffic through eu.api.openai.com.
2. Zero Data Retention for that project.

Our API usage
We only use endpoints that are eligible for Zero Data Retention:

  /v1/responses          text generation and vision (transcribing scanned
                         documents and photos)
  /v1/chat/completions   our chat assistant, called from a self-hosted
                         automation platform
  /v1/audio/speech       text-to-speech for read-aloud study material

We do not use Assistants, Threads or Vector Stores, so nothing in our
integration depends on server-side state that would prevent ZDR.

Our request volume is modest — we are a small company. The data involved is
business contact details and, in one internal application, documents uploaded by
a user that may contain sensitive information.

Why this matters to us
OpenAI is not certified under the EU-U.S. Data Privacy Framework, so our
transfers rely on the Standard Contractual Clauses under Art. 46 GDPR. We have
completed and documented a Transfer Impact Assessment. It identifies the default
retention of API inputs and outputs for up to 30 days for abuse monitoring as
the main residual risk, because it creates a body of data in the United States
that is exposed to government access requests.

EU residency together with ZDR would remove that risk almost entirely. It would
also let us give a much stronger answer to our own customers, who increasingly
ask where their data is processed before they sign.

Could you let us know what is needed to enable both for our organization, and
whether there are any prerequisites on our side?

Thank you very much,

Maximilian Trenk
NexAI – Next Generation Artificial Intelligence GbR
mbt@nex-a-i.com
```

---

## Was du erwarten kannst

**Wenn sie zustimmen:** du bekommst die Freigabe für „advanced data controls".
Danach legst du ein neues Projekt mit Region Europa an, erzeugst dort einen
neuen Schlüssel und trägst im Portal zwei Umgebungsvariablen ein — der Code ist
dafür schon vorbereitet. Der Klickweg steht im anderen Dokument.

**Wenn sie ablehnen:** kein Beinbruch. Die TIA trägt auch ohne diese Maßnahmen;
sie wäre nur besser mit ihnen. Ein dokumentierter Versuch ist genau das, was die
Rechenschaftspflicht erwartet — heb die Antwort deshalb auf und leg sie zur TIA.

**Wenn eine Rückfrage kommt**, geht es erfahrungsgemäß um Volumen, Anwendungsfall
oder den Tarif. Alle drei Antworten stehen oben schon im Text; schick mir die
Rückfrage, dann formuliere ich die Antwort.
