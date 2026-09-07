# OpenAI: EU-Datenhaltung und Zero Data Retention beantragen

**Stand:** 07.09.2026
**Setzt um:** [`TIA-OpenAI-Drittlandtransfer.md`](TIA-OpenAI-Drittlandtransfer.md), Maßnahmen **M-8** und **M-9**, offene Punkte **O-2** und **O-3**
**Wer:** Max — die Anträge laufen über das NexAI-OpenAI-Konto.

---

## Warum das die wirksamste Maßnahme ist

Die TIA für OpenAI kommt zu einem anderen Ergebnis als die für Vapi. Bei Vapi entsteht **kein Datenbestand** — die Gespräche sind flüchtig, eine Herausgabeanordnung träfe ins Leere. Bei OpenAI ist es umgekehrt: **Ein- und Ausgaben werden standardmäßig bis zu 30 Tage** zur Missbrauchserkennung vorgehalten. Damit existiert ein Bestand in den USA, auf den der CLOUD Act zugreifen kann.

Anders als bei Vapi ist das aber keine Sackgasse. OpenAI bietet beides an:

| | Wirkung |
|---|---|
| **EU-Datenhaltung** | Verarbeitung und Speicherung in der EU über `eu.api.openai.com` — die Drittlandübermittlung entfällt für diesen Weg weitgehend |
| **Zero Data Retention** | Unterbindet die 30-Tage-Kopie — entzieht dem CLOUD Act den Gegenstand |

Beides ist **freigabepflichtig** und läuft über denselben Weg: OpenAI-Vertrieb bzw. Support. Deshalb **ein Antrag für beides**, nicht zwei.

---

## Schritt 1 — Anfrage abschicken

**An:** über den Kontaktweg im OpenAI-Konto (Help → Messages → neue Anfrage) oder an den Vertrieb, falls ihr dort einen Ansprechpartner habt.
**Wichtig:** aus dem Konto heraus schreiben, damit die Anfrage der Organisation zugeordnet wird.

Der folgende Text ist fertig zum Abschicken. Er nennt die Endpunkte, die ihr tatsächlich ansprecht — ich habe sie im Code nachgesehen, nicht geraten.

> **Subject:** Request for EU data residency and Zero Data Retention
>
> Hello,
>
> we are a German company (NexAI – Next Generation Artificial Intelligence GbR, Frankenhardt, Germany) building AI voice and chat assistants for German business customers. We process personal data of EU data subjects through the OpenAI API and act as a processor for our own customers under Art. 28 GDPR.
>
> We would like to request two things for our organization:
>
> **1. EU data residency** — we would like to create a project with Europe as its region and route our API traffic through `eu.api.openai.com`.
>
> **2. Zero Data Retention** for that project.
>
> **Our usage.** We only use endpoints that are eligible for ZDR:
>
> - `/v1/responses` — text generation and vision (document transcription)
> - `/v1/chat/completions` — our website chat assistant, called from a self-hosted n8n instance
> - `/v1/audio/speech` — text-to-speech
>
> We do **not** use Assistants, Threads or Vector Stores, so nothing in our integration depends on server-side state.
>
> **Why we need this.** OpenAI is not certified under the EU-U.S. Data Privacy Framework, so our transfers rely on the Standard Contractual Clauses under Art. 46 GDPR. We have completed and documented a Transfer Impact Assessment. It identifies the default retention of API inputs and outputs for up to 30 days for abuse monitoring as the main residual risk, because it creates a body of data in the United States that is exposed to government access requests. EU residency together with ZDR would remove that risk almost entirely and would let us give our own customers a much stronger answer in their own assessments.
>
> Our volumes are modest — we are a small company — but the data includes business contact details and, in one internal application, uploaded documents that may contain sensitive information.
>
> Could you tell us what is needed to enable both for our organization?
>
> Thank you,
> Maximilian Trenk
> NexAI – Next Generation Artificial Intelligence GbR

**Ehrlich dazu:** Beides ist auf „eligible customers" beschränkt und läuft über den Vertrieb. Für ein kleines Konto kann es abgelehnt werden. Dann bleibt es bei der Bewertung, die in der TIA steht — die trägt auch ohne diese Maßnahmen, sie wäre nur besser mit ihnen. Eine Ablehnung ist kein Beinbruch, sondern ein dokumentierter Versuch, und genau das erwartet die Rechenschaftspflicht.

---

## Schritt 2 — Nach der Freigabe: EU-Projekt anlegen

1. In der **OpenAI-Plattform** anmelden
2. Oben links auf die **Projektauswahl** → **Create project**
3. Als Region **Europe** wählen (die Auswahl erscheint erst nach der Freigabe)
4. Im neuen Projekt unter **API keys** einen **neuen Schlüssel** erzeugen
5. Prüfen, dass für dieses Projekt **Zero Data Retention** aktiv ist

Der Schlüssel des alten Projekts funktioniert weiter — er läuft aber über die alte Region. Es genügt also **nicht**, nur die Region umzustellen; ihr braucht den **neuen Schlüssel aus dem EU-Projekt**.

---

## Schritt 3 — Umstellen (Code ist schon vorbereitet)

Im Portal ist der Umstieg **eine Umgebungsvariable**, keine Codeänderung. `lib/study/ai.ts` liest `OPENAI_DATA_RESIDENCY` und setzt die entsprechende Option im OpenAI-Client; ohne die Variable bleibt alles beim weltweiten Standardendpunkt. Ein ungültiger Wert lässt den Aufruf absichtlich scheitern, statt still weiter über die USA zu laufen.

**Portal** (Coolify → nexai-portal → Environment Variables):

```
OPENAI_API_KEY=<neuer Schlüssel aus dem EU-Projekt>
OPENAI_DATA_RESIDENCY=eu
```

Danach neu deployen. Zur Kontrolle im Lernbereich einen kurzen Text zusammenfassen lassen — läuft das durch, geht der Weg über die EU-Region.

**n8n** (Website-Chat): in den OpenAI-Zugangsdaten den neuen Schlüssel eintragen. Ob der n8n-Knoten einen abweichenden Basis-Endpunkt zulässt, ist **vor** dem Umstellen zu prüfen — sonst hängt der Schlüssel zwar am EU-Projekt, die Anfrage geht aber weiter an den globalen Endpunkt.

---

## Was das **nicht** abdeckt

**Den Sprachassistenten.** Das Sprachmodell im Telefonassistenten wird von **Vapi** aufgerufen, nicht vom Portal. Läuft das über Vapis eigenen OpenAI-Zugang, wirken eure Projekteinstellungen dort **nicht** — egal was ihr umstellt. Das ist offener Punkt **O-1** der OpenAI-TIA und vor der Umstellung bei Vapi zu klären.

---

## Danach nachziehen

- [ ] **TIA OpenAI**: M-8 und M-9 von ❌ auf ✅, Abschnitt „Ergebnis und Restrisiko" neu fassen — mit EU-Region und ZDR fällt die Bewertung deutlich günstiger aus (Neubewertungsauslöser **N-3**)
- [ ] **Veröffentlichte DSE**: Wenn die Verarbeitung in der EU stattfindet, ist der Satz „Bei Vapi, Soniox und OpenAI kann eine Übermittlung in die USA erfolgen" für OpenAI nicht mehr zutreffend — anpassen
- [ ] **VVT** A10 und A11–A18: Drittlandangabe bei OpenAI berichtigen
- [ ] **AVV Anlage B**: Zeile OpenAI (Sitz/Transfermechanismus)
