# Transfer Impact Assessment (TIA) — OpenAI (USA)

**Stand:** September 2026 (Erstfassung, 06.09.2026)
**Verantwortlicher / Auftragsverarbeiter:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Kontakt Datenschutz: mbt@nex-a-i.com
**Aufsichtsbehörde:** LfDI Baden-Württemberg
**Gegenstand:** Übermittlung personenbezogener Daten an **OpenAI Ireland Limited** (Dublin) und deren Weiterübermittlung an **OpenAI, L.L.C.** (San Francisco, USA).

> ⚠️ **Kein Rechtsrat.** Bestandsaufnahme zur Erfüllung der Rechenschaftspflicht (Art. 5 Abs. 2 DSGVO) und der Prüfpflicht aus Klausel 14 SCC. Ersetzt keine anwaltliche Prüfung.

**Methodik:** EDPB-Empfehlungen 01/2020 (Fassung 2.0), sechs Schritte. Schwesterdokument zu [`TIA-Vapi-Drittlandtransfer.md`](TIA-Vapi-Drittlandtransfer.md); die dortige Analyse der US-Rechtslage (Schritt 3) gilt unverändert und wird hier nur um die Besonderheiten von OpenAI ergänzt.

---

## 0. Ergebnis vorweg

Die Übermittlung ist auf Grundlage der **Standardvertragsklauseln** fortführbar. Anders als bei Vapi gibt es hier jedoch **zwei wirksame Maßnahmen, die tatsächlich verfügbar sind und bislang nicht genutzt werden** — und genau darin liegt der Handlungsbedarf.

1. **Berichtigt:** OpenAI ist **nicht** DPF-zertifiziert. Am 06.09.2026 in der amtlichen Liste unter dataprivacyframework.gov geprüft, mit funktionierender Gegenprobe (Resend und Google LLC wurden unter identischen Bedingungen gefunden, OpenAI nicht). Der Fragenkatalog nannte OpenAI bislang fälschlich als DPF-Empfänger — **korrigiert**. Es gilt Art. 46, nicht Art. 45.
2. **Strukturell günstig:** Vertragspartner ist **OpenAI Ireland Limited**, also eine EU-Gesellschaft. Die Übermittlung in die USA ist eine **Weiterübermittlung** durch OpenAI Ireland an OpenAI L.L.C., abgesichert über deren SCC. NexAI übermittelt nicht selbst in ein Drittland.
3. **Ungünstiger als bei Vapi:** OpenAI speichert API-Ein- und -Ausgaben standardmäßig **bis zu 30 Tage** zur Missbrauchserkennung. Bei Vapi entsteht gar kein Bestand — hier schon. Das ist der wesentliche Unterschied und der Grund für die Maßnahmen unten.
4. **Verfügbar, aber ungenutzt:** OpenAI bietet **EU-Datenhaltung** (`eu.api.openai.com`, Projekt mit Region Europa) und **Zero Data Retention**. Beides ist antrags-/freigabepflichtig. Würde die EU-Region genutzt, entfiele die Drittlandübermittlung für den eigenen API-Weg weitgehend.

**Konsequenz:** Fortführung vertretbar. **Die naheliegende Verbesserung ist aber nicht technischer Natur, sondern administrativ** — EU-Projekt anlegen und ZDR beantragen (M-8, M-9). Solange das nicht geschehen ist, wird ein vermeidbares Restrisiko getragen.

---

## Schritt 1 — Die Übermittlung kennen

### 1.1 Wo OpenAI überhaupt eingesetzt wird

| # | Verarbeitung | Weg zu OpenAI | Auf wessen Zugang? |
|---|---|---|---|
| **A** | **Voice Agent** — Sprachmodell im Telefonassistenten (gpt-4.1) | über **Vapi** konfiguriert | **zu klären** (O-1) — läuft der Aufruf über einen NexAI-Schlüssel oder über Vapis eigenen? |
| **B** | **Chat-Agent** auf der Website und beim Kunden | über self-hosted n8n | eigener NexAI-Zugang |
| **C** | **Social-Media-Agent** | über n8n | eigener NexAI-Zugang |
| **D** | **NexAI Study** (privater Lernbereich im Portal) | direkt aus dem Portal | eigener NexAI-Zugang |

**Wichtige Abgrenzung:** Für **A** greifen die Einstellungen des NexAI-OpenAI-Kontos **nicht**, wenn Vapi den Aufruf auf eigene Rechnung ausführt. Dann ist OpenAI dort Unterauftragsverarbeiter **von Vapi**, und die Absicherung läuft über den Vapi-DPA. Diese Frage entscheidet, welche Maßnahmen unten überhaupt auf den Sprachassistenten wirken. → O-1.

**Nicht mehr einschlägig:** Die Sprachsynthese lief früher über OpenAI TTS. Seit der Assistenten-Umstellung übernimmt das Vapi selbst (siehe Vapi-TIA).

**Scoping-Vorbehalt:** Das Verarbeitungsverzeichnis führt zusätzlich einen „Vertriebs-/Akquise-Agenten". Nach dem tatsächlichen Leistungsangebot existiert dieser nicht; die VVT-Zeile ist ein Altbestand und wird hier nicht bewertet. → O-5.

### 1.2 Datenlandkarte und Merkmale

| Merkmal | Ausprägung |
|---|---|
| **Betroffene** | Chat- und Anrufkontakte, im Kundenfall deren Endkunden; bei **D** eine einzelne Privatperson |
| **Datenkategorien** | Nachrichteninhalte, Kontaktangaben, Anliegen; bei **D** hochgeladene Lerninhalte |
| **Besondere Kategorien (Art. 9)** | nicht vorgesehen; bei **D** nicht ausgeschlossen, da die Nutzerin beliebige Dokumente hochlädt |
| **Art der Übermittlung** | anlassbezogen je Anfrage, kein Datenbestand |
| **Umfang** | gering |
| **Speicherung beim Empfänger** | **bis zu 30 Tage** (Missbrauchserkennung), danach Löschung — sofern nicht ZDR aktiv |
| **Training** | **Ausgeschlossen** für API-Daten nach den OpenAI-API-Bedingungen |
| **Belegenheit** | **US-Region** (Standard). EU-Region verfügbar, aber nicht aktiviert |

---

## Schritt 2 — Übermittlungswerkzeug

- **Vertragslage:** DPA mit **OpenAI Ireland Limited** abgeschlossen (Self-Service). Der Vertrag selbst ist **innereuropäisch**.
- **Drittlandinstrument:** **Standardvertragsklauseln** nach Durchführungsbeschluss (EU) 2021/914 für die Weiterübermittlung an OpenAI L.L.C.
- **Art. 45 steht nicht zur Verfügung** — siehe die Prüfung unter 0.1.

> **Belegte Korrektur.** `Datenschutz-Fragenkatalog-Beantwortung.md` führte OpenAI als „Irland/USA (DPF)". Das war falsch und ist berichtigt. Der `AVV-Subprozessoren-Tracker.md` hatte es von Anfang an richtig („NICHT DPF-zertifiziert").

---

## Schritt 3 — Rechtslage im Bestimmungsland (USA)

**Es gilt unverändert die Analyse aus [`TIA-Vapi-Drittlandtransfer.md`, Schritt 3](TIA-Vapi-Drittlandtransfer.md):** FISA 702 ist am 12.06.2026 ausgelaufen, wirkt über die im März 2026 erteilten FISC-Zertifizierungen aber **bis 17.03.2027** fort; EO 12333 und CLOUD Act sind unbefristet; EO 14086 wirkt mildernd; das Rechtsmittel *Latombe* (C-703/25 P) ist beim EuGH anhängig.

**Zwei Besonderheiten gegenüber Vapi:**

1. **Der CLOUD Act greift hier tiefer.** Weil OpenAI Ein- und Ausgaben bis zu 30 Tage vorhält, existiert ein **Datenbestand**, auf den sich eine Herausgabeanordnung richten kann. Bei Vapi lief dieses Argument ins Leere; hier nicht. Das ist der wichtigste inhaltliche Unterschied zwischen beiden Bewertungen.
2. **Der Zugriffsvektor ist enger.** Es werden keine Telefonate in Echtzeit übertragen, sondern einzelne Anfragen. Der Kreis der Betroffenen und die Datenmenge je Vorgang sind kleiner.

---

## Schritt 4 — Ergänzende Maßnahmen

### 4.1 Auch hier: keine technische Lösung für den Kern

OpenAI muss die Anfragen im Klartext verarbeiten. Es bleibt bei **EDPB-Anwendungsfall 6** — keine wirksame technische Maßnahme gegen den Zugriff beim Anbieter. **Aber**: anders als bei Vapi lässt sich hier die *Belegenheit* verändern, und das ist wirksamer als jede Verschlüsselung.

### 4.2 Vorhandene Maßnahmen

| # | Maßnahme | Status |
|---|---|---|
| **M-1** | Vertragspartner ist **OpenAI Ireland Ltd** — innereuropäisch, Weiterübermittlung über SCC | ✅ |
| **M-2** | **Kein Training** auf API-Daten (Vertragszusage, deckt die DSE-Zusage) | ✅ |
| **M-3** | **Datenminimierung** — nur Anfrageinhalt, keine Kundendatenbestände | ✅ |
| **M-4** | **Persistenz in der EU** — Chatverläufe, Leads, Termine liegen in n8n/CRM auf Hetzner | ✅ |
| **M-5** | **Transportverschlüsselung** (TLS) | ✅ |
| **M-6** | **Löschfristen** — Chatverläufe ≤ 6 Monate | ✅ |
| **M-7** | **KI-Hinweis** nach Art. 50 AI Act | ✅ |

### 4.3 Verfügbare, aber ungenutzte Maßnahmen — hier liegt der Handlungsbedarf

| # | Maßnahme | Wirkung | Status |
|---|---|---|---|
| **M-8** | **EU-Datenhaltung**: Projekt in der API-Plattform mit Region Europa, Endpunkt `eu.api.openai.com`. Anfragen werden in der Region verarbeitet und nicht dauerhaft gespeichert | **Beseitigt die Drittlandübermittlung für die Wege B, C, D weitgehend** — die mit Abstand wirksamste Maßnahme | ❌ nicht aktiviert (O-2). **Technisch vorbereitet:** das Portal liest `OPENAI_DATA_RESIDENCY`, der Umstieg ist nach der Freigabe eine Umgebungsvariable |
| **M-9** | **Zero Data Retention**: unterbindet die 30-Tage-Kopie zur Missbrauchserkennung. Freigabepflichtig, für die genutzten Endpunkte (chat/completions, responses, audio, embeddings) grundsätzlich möglich | Entzieht dem CLOUD Act den Gegenstand — genau das Argument, das bei Vapi trägt | ❌ **nicht beantragt** (O-3) |

Beide sind **administrativ**, nicht technisch: ein neues Projekt anlegen und eine Freigabe beantragen. Der Aufwand steht in keinem Verhältnis zur Wirkung.

### 4.4 Bekannte Lücken

- **Weg A ist ungeklärt** (O-1). Läuft der Sprachassistent über Vapis OpenAI-Zugang, wirken M-8 und M-9 dort **nicht**, egal was NexAI einstellt.
- **NexAI Study (Weg D) fehlt vollständig im Verarbeitungsverzeichnis.** Dort werden beliebige hochgeladene Dokumente an OpenAI übermittelt — potenziell der sensibelste Datenfluss von allen vieren, und der einzige ohne Art.-9-Ausschluss. Es existiert ein Entwurf (`nexai-portal/docs/datenschutz-study-ENTWURF.md`), aber kein VVT-Eintrag. → O-4.
- **Die 30-Tage-Speicherung ist der wunde Punkt.** Solange M-9 nicht aktiv ist, liegt eine Kopie jeder Anfrage 30 Tage lang auf US-Infrastruktur.

---

## Schritt 5 — Verfahrensschritte

Die Standardvertragsklauseln werden unverändert verwendet; eine Genehmigung nach Art. 46 Abs. 3 DSGVO ist nicht erforderlich. Diese Bewertung wird dokumentiert und im Verarbeitungsverzeichnis verlinkt.

---

## Schritt 6 — Neubewertung

| # | Auslöser | Frist |
|---|---|---|
| **N-1** | Ablauf der FISC-Zertifizierungen | **vor dem 17.03.2027** |
| **N-2** | EuGH-Entscheidung in C-703/25 P (*Latombe*) | binnen 4 Wochen |
| **N-3** | **Aktivierung von M-8 oder M-9** — die Bewertung fällt danach deutlich günstiger aus und ist neu zu fassen | unmittelbar danach |
| **N-4** | OpenAI wird DPF-zertifiziert (dann greift Art. 45) | bei Bekanntwerden |
| **N-5** | Inbetriebnahme einer Art.-9-Verarbeitung, insb. über NexAI Study | **vor** Inbetriebnahme |
| **N-6** | Turnusmäßig | jährlich, nächste Prüfung September 2027 |

---

## Ergebnis und Restrisiko

Die Übermittlung an OpenAI ist auf SCC-Grundlage **fortführbar**. Günstig wirken die innereuropäische Vertragsbeziehung, der Trainingsausschluss, die geringe Datenmenge je Vorgang und die europäische Persistenz.

**Das Restrisiko ist höher als bei Vapi**, und zwar aus einem einzigen Grund: durch die 30-tägige Aufbewahrung zur Missbrauchserkennung entsteht ein Datenbestand in den USA. Damit greifen Herausgabeanordnungen, denen bei Vapi der Gegenstand fehlt.

**Dieses Restrisiko ist vermeidbar.** Anders als bei Vapi liegt hier keine strukturelle Sackgasse vor, sondern eine offene Tür: EU-Region und Zero Data Retention sind verfügbar und nicht genutzt. **Die Empfehlung dieser Bewertung ist daher nicht „tragen", sondern „abstellen".**

---

## Offene Punkte

| # | Punkt | Wer |
|---|---|---|
| **O-1** | Klären, ob der **Voice-LLM-Aufruf über den NexAI- oder Vapis OpenAI-Zugang** läuft — entscheidet die Reichweite von M-8/M-9 | Max |
| **O-2** | **EU-Projekt in der OpenAI-API-Plattform anlegen** (Region Europa) und die Wege B, C, D darauf umstellen — Antragstext und Klickweg liegen fertig vor: [`OpenAI-Antraege-EU-Region-und-ZDR.md`](OpenAI-Antraege-EU-Region-und-ZDR.md) | Max |
| **O-3** | **Zero Data Retention beantragen** — im selben Antrag wie O-2, die Endpunkte sind dort aus dem Code belegt | Max |
| **O-4** | **NexAI Study ins Verarbeitungsverzeichnis aufnehmen** und die Rollenfrage klären; Entwurf liegt vor | NexAI / Anwalt |
| **O-5** | VVT-Zeile „Vertriebs-/Akquise-Agent" prüfen — nach Leistungsangebot nicht vorhanden | NexAI |
| **O-6** | Anwaltliche Prüfung gemeinsam mit DSE und Vertragswerk | Anwalt |

---

## Quellen

- EDPB, Empfehlungen 01/2020, Fassung 2.0 vom 18.06.2021 — Anwendungsfall 6
- Durchführungsbeschluss (EU) 2021/914 (Standardvertragsklauseln)
- **Data Privacy Framework List**, dataprivacyframework.gov — eigene Abfrage 06.09.2026: OpenAI **nicht** gelistet; Gegenprobe Resend und Google LLC unter identischen Bedingungen gefunden
- OpenAI, *Data controls in the OpenAI platform* — 30-Tage-Aufbewahrung zur Missbrauchserkennung, ZDR und die dafür in Betracht kommenden Endpunkte
- OpenAI, *Introducing data residency in Europe* und *Expanding data residency access to business customers worldwide* — EU-Region, `eu.api.openai.com`
- US-Rechtslage: siehe Quellenteil der [Vapi-TIA](TIA-Vapi-Drittlandtransfer.md)
