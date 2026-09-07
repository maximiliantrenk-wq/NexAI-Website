# Datenschutz-Folgenabschätzung — KI-Telefonassistent (Voice Agent)

**Stand:** September 2026 (Erstfassung, 07.09.2026)
**Verantwortlicher:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Gesellschafter: Maximilian Trenk, Jason Brian Merklein · Kontakt Datenschutz: mbt@nex-a-i.com
**Aufsichtsbehörde:** LfDI Baden-Württemberg, Heilbronner Straße 35, 70191 Stuttgart
**Gegenstand:** Verarbeitung personenbezogener Daten von Anrufern durch einen KI-gestützten Telefonassistenten — für die eigene Rufnummer von NexAI (VVT **A6**) sowie, als Zulieferbaustein, für Assistenten im Auftrag von Kunden.

> ⚠️ **Kein Rechtsrat.** Dieses Dokument erfüllt die Rechenschaftspflicht (Art. 5 Abs. 2 DSGVO) und dokumentiert die Prüfung nach Art. 35 DSGVO. Es ersetzt **keine** anwaltliche Prüfung und keine Stellungnahme eines Datenschutzbeauftragten. Vor Verwendung gegenüber Kunden oder Behörden prüfen lassen.

**Methodik:** Art. 35 Abs. 7 DSGVO; Schwellwertprüfung nach Art. 35 Abs. 1, 3 und 4 unter Heranziehung der Liste der Aufsichtsbehörden (DSK-Muss-Liste) und der neun Kriterien der Leitlinien WP 248 rev.01. Grundlage sind der Live-Stand der Vapi-Konfiguration (07.09.2026 über die Schnittstelle gelesen), der Asterisk-Dialplan, der CRM-Quellcode, das Verarbeitungsverzeichnis und die vorliegenden Drittland-Bewertungen.

**Verwandte Dokumente:** [`VVT-Verarbeitungsverzeichnis.md`](VVT-Verarbeitungsverzeichnis.md) (A6) · [`TIA-Vapi-Drittlandtransfer.md`](TIA-Vapi-Drittlandtransfer.md) · [`TIA-OpenAI-Drittlandtransfer.md`](TIA-OpenAI-Drittlandtransfer.md) · [`AVV-Subprozessoren-Tracker.md`](AVV-Subprozessoren-Tracker.md) · [`Sperrvermerk-Berufsgeheimnistraeger.md`](Sperrvermerk-Berufsgeheimnistraeger.md) · `vertrag/build/docs/04_AnlageB_AVV_Auftragsverarbeitung.json`

---

## 0. Ergebnis vorweg

**Die Schwellwertprüfung fällt eindeutig aus, und zwar anders als bei der Konzeption angenommen: Eine Datenschutz-Folgenabschätzung ist Pflicht, nicht Ermessen.** Der Verarbeitungsvorgang steht **wörtlich auf der Muss-Liste der deutschen Aufsichtsbehörden** (Nr. 9: Einsatz künstlicher Intelligenz zur Steuerung der Interaktion mit den Betroffenen; als Beispiel wird dort ausdrücklich ein System genannt, das mit Kunden durch Konversation interagiert). Damit erübrigt sich jede Abwägung über Kriterienzahlen — steht ein Vorgang auf der Liste, ist die Folgenabschätzung durchzuführen.

Daraus folgen drei Dinge, von denen zwei zusätzliche Pflichten auslösen:

1. **Diese Folgenabschätzung ist erforderlich** und liegt hiermit vor. Sie deckt **A6**, den Assistenten auf der eigenen Rufnummer, für den NexAI Verantwortlicher ist.
2. **Für Kundenagenten ist der Kunde Verantwortlicher**, nicht NexAI. Die Pflicht zur Folgenabschätzung trifft ihn; NexAI schuldet nach Art. 28 Abs. 3 lit. f Unterstützung. Abschnitt 7 stellt dafür einen Zulieferbaustein bereit.
3. **§ 38 Abs. 1 Satz 2 BDSG:** Wer Verarbeitungen vornimmt, die einer Folgenabschätzung unterliegen, muss **unabhängig von der Zahl der Beschäftigten** einen Datenschutzbeauftragten benennen. Das trifft NexAI — und es trifft **jeden Kunden**, der den Assistenten einsetzt, auch den Handwerksbetrieb mit fünf Mitarbeitern. Dieser Punkt gehört in das Verkaufsgespräch, nicht in die Überraschung nach Vertragsschluss.

**Gesamtbewertung des Risikos nach Maßnahmen: mittel und tragbar.** Ausschlaggebend dafür ist die Nichtspeicherung: Es wird weder Audio noch Transkript aufgezeichnet, die Datenkategorien sind eng, dauerhaft gespeichert wird ausschließlich in Deutschland. Ein Restrisiko bleibt beim Drittlandtransfer und ist technisch nicht auflösbar; es erreicht nach hiesiger Bewertung aber nicht die Schwelle, ab der nach Art. 36 DSGVO die Aufsichtsbehörde vorab zu konsultieren wäre. **Diese Einschätzung sollte der Anwalt oder der künftige Datenschutzbeauftragte bestätigen**, weil sie die einzige wirklich wertende Stelle dieses Dokuments ist.

---

## 1. Schwellwertprüfung — ist eine Folgenabschätzung erforderlich?

### 1.1 Regelbeispiele nach Art. 35 Abs. 3 DSGVO

| Regelbeispiel | Einschlägig? | Begründung |
|---|---|---|
| lit. a — systematische und umfassende Bewertung persönlicher Aspekte mit automatisierter Entscheidung und Rechtswirkung | **nein** | Der Assistent bewertet Anliegen, nicht Personen. Rechtsverbindliche Erklärungen sind ihm vertraglich ausdrücklich entzogen (§ 4 Rahmenvertrag: keine Preiszusagen, keine Bestellungen, kein Vertragsschluss). |
| lit. b — umfangreiche Verarbeitung besonderer Kategorien oder von Daten über Straftaten | **nein**, mit Vorbehalt | Besondere Kategorien sind weder Zweck noch vorgesehen. Anrufer können sie jedoch spontan offenbaren (Risiko R2). Für Berufsgeheimnisträger gilt der [Sperrvermerk](Sperrvermerk-Berufsgeheimnistraeger.md). |
| lit. c — systematische umfangreiche Überwachung öffentlich zugänglicher Bereiche | **nein** | Keine Überwachung; eingehende Anrufe auf Initiative des Anrufers. |

### 1.2 Liste der Aufsichtsbehörden nach Art. 35 Abs. 4 (Muss-Liste) — **einschlägig**

Die Liste der Datenschutzkonferenz nennt unter **Nr. 9**:

> „Einsatz von künstlicher Intelligenz zur Verarbeitung personenbezogener Daten zur Steuerung der Interaktion mit den Betroffenen oder zur Bewertung persönlicher Aspekte der betroffenen Person."

Als Beispiele werden dort **„Kundensupport mittels künstlicher Intelligenz"** und ein System genannt, das **„mit Kunden durch Konversation interagiert"**. Das beschreibt den Voice Agent nicht sinngemäß, sondern wörtlich: Er steuert die Interaktion mit dem Anrufer vollständig, entscheidet über Rückfragen, Terminvorschläge und Weiterleitung.

**Konsequenz:** Die Folgenabschätzung ist durchzuführen. Ein Abwägen anhand der Kriterienzahl (1.3) ist dafür nicht mehr nötig; die Kriterien werden trotzdem geprüft, weil sie die Risikoanalyse in Abschnitt 5 strukturieren.

> **Merke für künftige Prüfungen:** Die Muss-Liste ist **nicht abschließend**. Dass ein Vorgang dort fehlt, entlastet nicht — es verlagert die Prüfung nur auf die Kriterien.

### 1.3 Die neun Kriterien nach WP 248 rev.01

| # | Kriterium | Bewertung |
|---|---|---|
| 1 | Bewerten oder Einstufen (Scoring/Profiling) | **teilweise** — Anliegen werden kategorisiert und priorisiert (Anlage A: „Qualifizierung, Weiterleitungslogik"). Bewertet wird das Anliegen, nicht die Person. |
| 2 | Automatisierte Entscheidung mit Rechtswirkung | nein — siehe 1.1 lit. a |
| 3 | Systematische Überwachung | nein |
| 4 | Besondere Kategorien oder höchst persönliche Daten | **teilweise** — nicht bezweckt, aber im Sprachkanal nicht ausschließbar (R2) |
| 5 | Umfangreiche Verarbeitung | nein — je Verantwortlichem ein Betrieb mit regional begrenztem Anrufaufkommen |
| 6 | Abgleich oder Zusammenführung von Datensätzen | **teilweise** — Anrufer werden im CRM über die Rufnummer mit bestehenden Kontakten zusammengeführt (Entdopplung) |
| 7 | Daten schutzbedürftiger Betroffener | nein — allgemeine Öffentlichkeit; kein Beschäftigten- oder Patientenverhältnis |
| 8 | **Innovative Technologie** | **ja** — KI-gestützte Sprachverarbeitung in Echtzeit |
| 9 | Betroffene an der Ausübung von Rechten hindern | nein — Weiterleitung an einen Menschen ist jederzeit möglich und im Prompt vorgesehen |

**Ein Kriterium klar erfüllt, drei teilweise.** Bereits zwei erfüllte Kriterien lassen nach WP 248 regelmäßig auf ein hohes Risiko schließen. Zusammen mit 1.2 ist das Ergebnis eindeutig.

---

## 2. Rollen — wer schuldet was

| Konstellation | Verantwortlicher | NexAI-Rolle | Wer schuldet die Folgenabschätzung |
|---|---|---|---|
| **A6** — Assistent auf der NexAI-Rufnummer (+49 7959 3100191), Website-Demo | **NexAI** | Verantwortlicher | **NexAI** — dieses Dokument |
| **Kundenagent** — Assistent für einen Betrieb, auf dessen Rufnummer | **der Kunde** | Auftragsverarbeiter (AVV Anlage B) | **der Kunde**; NexAI unterstützt nach Art. 28 Abs. 3 lit. f → Abschnitt 7 |

Diese Trennung ist wichtig und wird in der Praxis oft verwischt: NexAI kann die Folgenabschätzung eines Kunden **nicht** für ihn durchführen, weil sie dessen Zwecke, dessen Anrufaufkommen und dessen Abwägungen dokumentiert. Was NexAI liefern kann und sollte, ist ein vollständig vorbereiteter Baustein, in dem alles ausgefüllt ist, was die Technik betrifft.

**Folgepflicht für beide Seiten (§ 38 Abs. 1 Satz 2 BDSG):** Die Benennung eines Datenschutzbeauftragten wird unabhängig von der Beschäftigtenzahl Pflicht, sobald eine Verarbeitung einer Folgenabschätzung unterliegt. Für NexAI ist das mit diesem Dokument festgestellt. Für Kunden gilt dasselbe, sobald sie den Assistenten einsetzen — auch für kleine Betriebe, die sonst unter der Schwelle von 20 Personen blieben.

---

## 3. Systematische Beschreibung der Verarbeitung (Art. 35 Abs. 7 lit. a)

### 3.1 Zweck und Ablauf

Zweck ist die telefonische Erreichbarkeit außerhalb der Kapazität der Mitarbeiter: Anliegen aufnehmen, Auskunft geben, Termine vereinbaren, bei Bedarf an einen Menschen weiterverbinden. Ohne den Assistenten bleiben Anrufe unbeantwortet — das ist der berechtigte Zweck, und er ist messbar.

Ablauf eines Anrufs:

1. Anrufer wählt die Rufnummer; easybell (Deutschland) stellt den Anruf zu.
2. Die eigene Telefonanlage (Asterisk, Server bei Hetzner in Deutschland) nimmt an und übergibt an Vapi.
3. Vapi (USA) führt den Dialog: Spracherkennung durch Soniox (USA), Antwortgenerierung durch OpenAI (Irland/USA), Sprachausgabe über Vapi.
4. Für Terminanfragen ruft der Assistent Werkzeuge auf, die auf die **eigene Automatisierungsinstanz in Deutschland** zeigen; von dort wird der Kalender abgefragt und gebucht.
5. Auf Wunsch des Anrufers oder bei komplexen Anliegen sendet Vapi ein REFER an die eigene Telefonanlage, die an einen Menschen weiterverbindet.
6. Nach Gesprächsende meldet Vapi einen Abschlussbericht an das **selbst betriebene CRM in Deutschland**; dort entstehen Kontakt-, Anruf- und Terminsatz.

### 3.2 Daten, Betroffene, Rechtsgrundlagen

| | |
|---|---|
| **Betroffene** | Anrufer (Interessenten, Kunden, gelegentlich Unbeteiligte bei Falschwahl) |
| **Datenarten** | Rufnummer, Name, Anliegen in eigenen Worten, Wunschtermin, gegebenenfalls E-Mail-Adresse, Verbindungs- und Metadaten (Zeit, Dauer, Ergebnis) |
| **Gesprächsinhalt** | wird **flüchtig** verarbeitet; keine Aufzeichnung, keine gespeicherte Transkription (in Vapi deaktiviert, Beleg 08.08.2026) |
| **Rechtsgrundlagen** | Art. 6 Abs. 1 lit. b (Anbahnung/Durchführung, insbesondere Terminvereinbarung); Art. 6 Abs. 1 lit. f für die effiziente Bearbeitung allgemeiner Anfragen |
| **Empfänger** | Vapi (US), Soniox (US, über Vapi), OpenAI (IE/US), easybell (DE), Hetzner (DE, Auftragsverarbeiter für Hosting), Google (Kalender, IE/US) |
| **Drittland** | USA auf Grundlage der Standardvertragsklauseln mit Folgenabschätzung ([Vapi](TIA-Vapi-Drittlandtransfer.md), [OpenAI](TIA-OpenAI-Drittlandtransfer.md)); Google auf Grundlage des Angemessenheitsbeschlusses |
| **Speicherort dauerhaft** | ausschließlich Deutschland (CRM und Automatisierung bei Hetzner) |
| **Löschfristen** | Termindaten 6 Monate; Leads 6 Monate; Anrufmetadaten nach Aufbewahrungsregel des jeweiligen Mandanten |

### 3.3 Was ausdrücklich nicht stattfindet

Keine Anrufaufzeichnung. Keine gespeicherte Transkription. Keine Stimmungs- oder Emotionsanalyse. Keine Stimmerkennung oder biometrische Identifizierung. Keine ausgehenden Werbeanrufe — ausgehende Anrufe sind technisch nicht möglich. Keine Profilbildung über Anrufer hinweg. Kein Training von Modellen mit den Gesprächsdaten (vertraglich zugesichert).

---

## 4. Notwendigkeit und Verhältnismäßigkeit (Art. 35 Abs. 7 lit. b)

**Erforderlichkeit.** Ohne den Assistenten bleiben Anrufe unbeantwortet; der Zweck lässt sich mit weniger eingriffsintensiven Mitteln nicht gleich gut erreichen. Geprüfte mildere Mittel:

- *Anrufbeantworter:* verarbeitet weniger Daten, erreicht den Zweck aber schlechter — Rückrufwünsche werden häufig nicht hinterlassen, und eine Terminvergabe findet nicht statt.
- *Externes Callcenter mit Menschen:* verarbeitet **mehr** Daten (Menschen hören zu, Gespräche werden dort regelmäßig aufgezeichnet) und ist damit nicht milder.
- *Assistent ohne Anliegenerfassung, nur Terminvergabe:* wäre milder und bleibt als Rückfallgestaltung vorgemerkt, erreicht den Zweck der Vorqualifizierung aber nicht.

**Datenminimierung.** Erhoben wird, was für Rückruf und Termin nötig ist. Der Gesprächsinhalt wird nicht dauerhaft gespeichert. Der Abschlussbericht ans CRM enthält strukturierte Felder und eine Zusammenfassung, kein Wortprotokoll.

**Speicherbegrenzung.** Fristen sind in der Datenschutzerklärung benannt und im CRM technisch durchsetzbar; die Durchsetzung setzt eine je Mandant gesetzte Regel voraus (offener Punkt, Abschnitt 6).

**Transparenz.** Der Assistent weist zu Gesprächsbeginn darauf hin, dass es sich um ein KI-System handelt (Art. 50 KI-Verordnung). Die Datenschutzerklärung beschreibt die Verarbeitung einschließlich der Empfänger und der Drittlandgrundlage.

**Betroffenenrechte.** Auskunft, Berichtigung und Löschung werden über das CRM bedient, das Suche, Export und Löschung je betroffener Person unterstützt. Ein Widerspruch gegen die Verarbeitung durch den Assistenten ist praktisch immer möglich: Der Anrufer kann jederzeit einen Menschen verlangen, und der Assistent ist angewiesen, dem zu folgen.

---

## 5. Risiken für die Rechte und Freiheiten (Art. 35 Abs. 7 lit. c)

Bewertet nach Eintrittswahrscheinlichkeit (EW) und Schwere (S), je gering / mittel / hoch.

| # | Risiko | EW | S | Bewertung |
|---|---|---|---|---|
| **R1** | Zugriff US-amerikanischer Behörden auf Gesprächsinhalte während der Verarbeitung | gering | hoch | **mittel** — Inhalte existieren dort nur flüchtig; technisch nicht ausschließbar (EDPB-Anwendungsfall 6) |
| **R2** | Anrufer offenbart spontan besondere Kategorien („ich hatte einen Unfall", „mein Vater ist verstorben") | **hoch** | mittel | **mittel** — im Sprachkanal unvermeidbar; wird nicht gespeichert, fließt aber durch die US-Kette |
| **R3** | Fehlerkennung: falscher Name, falsche Rufnummer, falscher Termin | mittel | gering | **gering** — Rückbestätigung im Gespräch; Terminkonflikte werden gegen den Kalender geprüft |
| **R4** | Der Assistent sagt etwas Unzutreffendes zu, der Anrufer verlässt sich darauf | mittel | mittel | **mittel** — vertraglich ausgeschlossene Vollmacht schützt rechtlich, nicht faktisch |
| **R5** | Verwechslung von Personen bei der Zusammenführung über die Rufnummer (gemeinsam genutzte Anschlüsse) | gering | mittel | **gering** |
| **R6** | Menschen, die mit einem Sprachsystem nicht sprechen können oder wollen, erreichen den Betrieb nicht | mittel | mittel | **mittel** — mindert sich durch die jederzeitige Weiterleitung an Menschen |
| **R7** | Ausfall der Telefonie; dringende Anliegen erreichen niemanden | mittel | mittel | **mittel** — die Telefonanlage ist heute ein einzelner Ausfallpunkt |
| **R8** | Unbefugter Zugriff auf die im CRM gespeicherten Anruf- und Kontaktdaten | gering | mittel | **gering** — Mandantentrennung auf Datenbankebene, Zwei-Faktor-Pflicht, verschlüsselte Sicherungen |
| **R9** | Daten werden nicht gelöscht, weil keine Aufbewahrungsregel gesetzt ist | **hoch** | mittel | **mittel** — die Löschmaschine läuft, aber nur mit gesetzter Regel |
| **R10** | Verbindungsdaten der Telefonanlage (wer wann anrief) werden unbegrenzt vorgehalten | mittel | gering | **gering** |

---

## 6. Abhilfemaßnahmen (Art. 35 Abs. 7 lit. d)

| # | Bereits umgesetzt | Noch offen |
|---|---|---|
| R1 | Aufzeichnung und Transkription deaktiviert; enge Datenkategorien; Standardvertragsklauseln mit Folgenabschätzung; dauerhafte Speicherung ausschließlich in Deutschland | EU-Region und Nichtspeicherung bei OpenAI aktivieren, sobald geklärt ist, über wessen Zugang der Sprachaufruf läuft; mittelfristig Ablösung durch einen europäischen Sprach-Stack |
| R2 | Keine Speicherung des Gesprächsinhalts; Prompt fordert keine Gesundheits- oder sonstigen sensiblen Angaben ab; [Sperrvermerk](Sperrvermerk-Berufsgeheimnistraeger.md) für einschlägige Branchen | Sensitivitäts-Riegel vor die Einrichtung ziehen — heute greift er erst beim Speichern und verhindert den Transfer nicht |
| R3 | Rückbestätigung des Termins im Gespräch; Konfliktprüfung gegen den Kalender vor der Zusage | — |
| R4 | Vertraglicher Ausschluss rechtsverbindlicher Erklärungen; Prompt-Leitplanken; Hinweis auf fachkundige Stellen statt eigener Beratung | Formulierungen im Prompt regelmäßig prüfen; Grenzfälle aus echten Gesprächen sammeln |
| R5 | Entdopplung über die vollständige Rufnummer statt über Namensähnlichkeit | — |
| R6 | Weiterleitung an einen Menschen jederzeit auf Zuruf; Rückruf-Werkzeug, wenn die Weiterleitung scheitert | Alternativer Kontaktweg (E-Mail, Formular) in der Ansage nennen |
| R7 | Automatischer Neustart der Telefonanlage; Rückfallweg über den Anbieter vorhanden | Überwachung und geübter Notfallweg; der Kunde hält nach Service-Level ein eigenes Ausweichverfahren vor |
| R8 | Mandantentrennung auf Datenbankebene, Zwei-Faktor-Pflicht, Zugriffsprotokoll, verschlüsselte Sicherungen, Transkripte verschlüsselt gespeichert | — |
| R9 | Löschmaschine im CRM mit Fristen, Aktionen und Protokoll; Löschsperre für Einzelfälle | Aufbewahrungsregeln je Mandant fest in das Onboarding aufnehmen |
| R10 | — | Aufbewahrungsgrenze für die Verbindungsdaten der Telefonanlage setzen; Zugriff beschränken und auf das Fernmeldegeheimnis verpflichten |

---

## 7. Zulieferbaustein für Kunden (Art. 28 Abs. 3 lit. f)

Ein Kunde, der den Assistenten einsetzt, benötigt eine eigene Folgenabschätzung. NexAI stellt ihm dafür bereit:

- die **Beschreibung der Verarbeitung** aus Abschnitt 3 einschließlich Empfängerliste, Speicherorten und Fristen,
- die **Risikoanalyse** aus Abschnitt 5 mit den technischen Maßnahmen aus Abschnitt 6,
- die **Drittland-Folgenabschätzungen** für Vapi und OpenAI,
- das **Verzeichnis der Unterauftragsverarbeiter** (Anhang 2 des Auftragsverarbeitungsvertrags),
- die **technischen und organisatorischen Maßnahmen**.

Der Kunde muss selbst ergänzen und verantworten: seine Zwecke und Rechtsgrundlagen, sein Anrufaufkommen, die Abwägung im Hinblick auf seine Betroffenen, seine eigenen Löschfristen, die Einbindung seines Datenschutzbeauftragten und — falls er an Mitarbeiter weiterverbinden lässt — die Rechtsgrundlage für die Nutzung von deren Rufnummern.

**Im Verkaufsgespräch aktiv ansprechen:** Der Einsatz löst beim Kunden die Pflicht zur Folgenabschätzung aus und damit nach § 38 Abs. 1 Satz 2 BDSG die Pflicht, einen Datenschutzbeauftragten zu benennen — auch unterhalb von 20 Beschäftigten. Wer das verschweigt, verkauft ein Problem mit. Wer es benennt und den Baustein mitliefert, verkauft eine Lösung.

---

## 8. Verbleibendes Risiko und Entscheidung

Nach Umsetzung der Maßnahmen aus Abschnitt 6 verbleibt ein Risiko in zwei Punkten:

**R1 (Drittlandzugriff)** ist technisch nicht auflösbar, solange die Sprachverarbeitung außerhalb der EU stattfindet. Es wird durch Nichtspeicherung, enge Datenkategorien und die vertraglichen Garantien so weit gemindert, wie es geht. **R2 (spontane Offenbarung)** ist dem Sprachkanal eigen und lässt sich nur durch Nichtspeicherung und den Ausschluss einschlägiger Branchen begrenzen.

**Bewertung:** Das Restrisiko wird als **mittel** eingestuft, nicht als hoch im Sinne von Art. 36 Abs. 1 DSGVO. Tragend dafür ist, dass keine Inhalte dauerhaft außerhalb der EU entstehen und keine besonderen Kategorien planmäßig verarbeitet werden. **Eine vorherige Konsultation der Aufsichtsbehörde ist danach nicht erforderlich.** Diese Einschätzung ist die einzige echte Wertung dieses Dokuments und sollte anwaltlich bestätigt werden.

---

## 9. Was diesen Befund kippt

Jeder der folgenden Punkte macht eine Neubewertung erforderlich, bevor er umgesetzt wird:

| Auslöser | Folge |
|---|---|
| Aufzeichnung oder Transkription wird für einen Kunden aktiviert | Inhalte entstehen dauerhaft; R1 steigt auf hoch; § 201 StGB und Einwilligungen kommen hinzu |
| Ein Berufsgeheimnisträger wird bedient | [Sperrvermerk](Sperrvermerk-Berufsgeheimnistraeger.md) greift; volle Neubewertung, voraussichtlich Art. 36 |
| Ausgehende Anrufe werden möglich | Neuer Verarbeitungszweck, § 7 UWG, andere Betroffenenerwartung |
| Stimmungs-, Emotions- oder Stimmerkennung wird eingeschaltet | Biometrie beziehungsweise Bewertung persönlicher Aspekte; neue Rechtsgrundlage nötig |
| Wechsel von Sprachmodell, Spracherkennung oder Sprachausgabe | Empfängerwechsel: 14 Tage Vorabinformation an Kunden, Anhang 2 anpassen, Drittlandbewertung prüfen |
| Anrufaufkommen wächst deutlich oder mehrere Mandanten werden zusammengeführt | Kriterium „umfangreiche Verarbeitung" neu prüfen |

---

## 10. Offene Punkte und Wiedervorlage

| | Punkt | Zuständig |
|---|---|---|
| O-1 | **Datenschutzbeauftragten benennen** (§ 38 Abs. 1 Satz 2 BDSG) und der Aufsichtsbehörde melden | NexAI |
| O-2 | Diese Folgenabschätzung dem Datenschutzbeauftragten zur Stellungnahme vorlegen (Art. 35 Abs. 2) | NexAI |
| O-3 | Anwaltliche Bestätigung der Bewertung in Abschnitt 8 | NexAI |
| O-4 | Sensitivitäts-Riegel vor die Einrichtung ziehen | NexAI |
| O-5 | Aufbewahrungsregeln je Mandant verpflichtend im Onboarding | NexAI |
| O-6 | EU-Region und Nichtspeicherung bei OpenAI, sofern über eigenen Zugang möglich | NexAI |
| O-7 | Zulieferbaustein für Kunden als eigenes Dokument ausformulieren | NexAI |

**Wiedervorlage:** jährlich, erstmals **September 2027** — sowie unverzüglich bei Eintritt eines Auslösers aus Abschnitt 9. Die Drittland-Bewertungen sind unabhängig davon **vor dem 17.03.2027** zu erneuern.

---

## Quellen

- Liste der Verarbeitungstätigkeiten, für die eine Datenschutz-Folgenabschätzung durchzuführen ist (DSK-Muss-Liste, Version 1.1), Nr. 9 — veröffentlicht unter anderem durch das [Bayerische Landesamt für Datenschutzaufsicht](https://www.lda.bayern.de/media/dsfa_muss_liste_dsk_de.pdf) und die [LDI Nordrhein-Westfalen](https://www.ldi.nrw.de/system/files/media/document/file/dsk_dsfa_muss-liste_version_1_1_deutsch_4.pdf)
- Artikel-29-Datenschutzgruppe, Leitlinien zur Datenschutz-Folgenabschätzung, WP 248 rev.01
- [§ 38 BDSG](https://www.gesetze-im-internet.de/bdsg_2018/__38.html) — Datenschutzbeauftragte nichtöffentlicher Stellen
- DSK, Orientierungshilfe Künstliche Intelligenz und Datenschutz (Mai 2024)
