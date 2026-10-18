# Datenschutz-Folgenabschätzung — KI-Telefonassistent (Voice Agent)

**Stand:** 17.10.2026 (Fassung 2; Erstfassung 07.09.2026)
**Verantwortlicher:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Gesellschafter: Maximilian Trenk, Jason Brian Merklein · Kontakt Datenschutz: mbt@nex-a-i.com
**Aufsichtsbehörde:** LfDI Baden-Württemberg, Heilbronner Straße 35, 70191 Stuttgart
**Gegenstand:** Verarbeitung personenbezogener Daten von Anrufern durch einen KI-gestützten Telefonassistenten — für die eigene Rufnummer von NexAI (VVT **A6**) sowie, als Zulieferbaustein, für Assistenten im Auftrag von Kunden.

> **Hinweis zur Bewertung.** Dieses Dokument erfüllt die Rechenschaftspflicht (Art. 5 Abs. 2 DSGVO) und dokumentiert die Prüfung nach Art. 35 DSGVO. Art. 35 Abs. 2 DSGVO lautet: „Der Verantwortliche holt bei der Durchführung einer Datenschutz-Folgenabschätzung den Rat des Datenschutzbeauftragten, sofern ein solcher benannt wurde, ein." NexAI ist nach § 38 Abs. 1 Satz 2 BDSG zur Benennung verpflichtet, hat mit Stand 17.10.2026 aber noch niemanden benannt (O-1). Zu den Bewertungen dieses Dokuments — insbesondere zur Restrisiko-Entscheidung in Abschnitt 8 — ist der Rat des zu benennenden Datenschutzbeauftragten einzuholen und zu dokumentieren (Art. 35 Abs. 2, Art. 39 Abs. 1 lit. c DSGVO; O-2, O-3), bevor das Dokument gegenüber Kunden oder Behörden verwendet wird. Die Entscheidung bleibt beim Verantwortlichen; weicht NexAI vom Rat ab, werden die Gründe festgehalten. Durchgeführt hat diese Folgenabschätzung für den Verantwortlichen Maximilian Trenk (Gesellschafter). *Wortlaut: DSGVO, konsolidierte Fassung vom 04.05.2016, [EUR-Lex CELEX 02016R0679-20160504](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:02016R0679-20160504), abgerufen am 17.10.2026.*

**Methodik:** Art. 35 Abs. 7 DSGVO; Schwellwertprüfung nach Art. 35 Abs. 1, 3 und 4 unter Heranziehung der Liste der Aufsichtsbehörden (DSK-Muss-Liste) und der neun Kriterien der Leitlinien WP 248 rev.01. Grundlage der Erstfassung waren der Live-Stand der Vapi-Konfiguration (07.09.2026 über die Schnittstelle gelesen), der Asterisk-Dialplan, der CRM-Quellcode, das Verarbeitungsverzeichnis und die vorliegenden Drittland-Bewertungen. **Grundlage der Fassung 2** ist eine erneute Erhebung am 17.10.2026: Vapi-Assistent 6bb4f397, Anrufdatensätze und Gesprächsprotokolle bei Vapi, Weitergabe der Anrufernummer durch die Telefonanlage, die n8n-Werkzeuge, NexTime und die Löschregeln im CRM.

**Verwandte Dokumente:** [`VVT-Verarbeitungsverzeichnis.md`](VVT-Verarbeitungsverzeichnis.md) (A6) · [`TIA-Vapi-Drittlandtransfer.md`](TIA-Vapi-Drittlandtransfer.md) · [`TIA-OpenAI-Drittlandtransfer.md`](TIA-OpenAI-Drittlandtransfer.md) · [`AVV-Subprozessoren-Tracker.md`](AVV-Subprozessoren-Tracker.md) · [`Sperrvermerk-Berufsgeheimnistraeger.md`](Sperrvermerk-Berufsgeheimnistraeger.md) · `vertrag/build/docs/04_AnlageB_AVV_Auftragsverarbeitung.json`

---

## Änderungen in Fassung 2 (17.10.2026)

Anlass ist Art. 35 Abs. 11 DSGVO: Die Überprüfung ist „zumindest" durchzuführen, „wenn hinsichtlich des mit den Verarbeitungsvorgängen verbundenen Risikos Änderungen eingetreten sind". Die erneute Erhebung hat Abweichungen ergeben, die das Ergebnis berühren:

| Abschnitt | Erstfassung | Fassung 2 |
|---|---|---|
| 0, 3.2, 3.3, 4, 8 | Gesprächsinhalt nur flüchtig, keine gespeicherte Transkription | Kein Ton, kein Transkript im Anrufdatensatz — aber Vapi führt je Anruf ein **Textprotokoll** der erkannten Sätze und Modellantworten, rund 14 Tage, ohne Zero Data Retention im Tarif (neu **R11**) |
| 3.1, 3.2 | Kalender bei Google | Buchung über n8n in **NexTime** (selbst betrieben, DE); Bestätigung und Erinnerung per E-Mail über **Resend** (USA) |
| 1.3, 3.1, 5, 6 | Zusammenführung der Anrufer über die Rufnummer | Die Telefonanlage meldet die NexAI-Nummer als Anrufernummer; alle Anrufe hängen im CRM an **einem** Kontakt (**R5** neu gefasst) |
| 3.2, 4, 5, 6 | Löschfristen pauschal, Regel je Mandant offen | CRM-Regeln für Anrufe, Leads und Termin-Anfragen (180 Tage, seit 02./03.09.2026, zuletzt geändert 18.10.2026); Kontakte nur nach 2 Jahren Inaktivität anonymisiert — Lücke zur 6-Monats-Zusage (**R9**) |
| 5, 6 | R3: Rückbestätigung im Gespräch | E-Mail-Adresse setzt das Programm zusammen; Pflicht-Vorlesen; Buchung nur mit Bestätigungscode |
| 5, 6 | — | Neu **R12** (Webhooks ohne Geheimnis-Prüfung) und **R13** (Vapi-Schlüssel wurde in einer lokalen KI-Assistenzsitzung im Klartext angezeigt) |
| 3.1, 3.2 | Sprachausgabe über Vapi | Stimme „Sid" läuft auf einem ElevenLabs-Modell; ob ElevenLabs Unterauftragsverarbeiter von Vapi ist, ist offen |
| Hinweis, 0, 8, 10 | Anwaltliche Bestätigung | Rat des zu benennenden Datenschutzbeauftragten (Art. 35 Abs. 2); Restrisiko „mittel" mit zwei Maßnahmen und Zieltermin |
| 10 | 7 offene Punkte | 17 offene Punkte mit Zuständigkeit und Status (O-17: Website-Chat) |

---

## 0. Ergebnis vorweg

**Die Schwellwertprüfung fällt eindeutig aus, und zwar anders als bei der Konzeption angenommen: Eine Datenschutz-Folgenabschätzung ist Pflicht, nicht Ermessen.** Der Verarbeitungsvorgang steht **wörtlich auf der Muss-Liste der deutschen Aufsichtsbehörden** (Nr. 11: Einsatz künstlicher Intelligenz zur Steuerung der Interaktion mit den Betroffenen; als Beispiel wird dort ausdrücklich ein System genannt, das mit Kunden durch Konversation interagiert). Damit erübrigt sich jede Abwägung über Kriterienzahlen — steht ein Vorgang auf der Liste, ist die Folgenabschätzung durchzuführen.

Daraus folgen drei Dinge, von denen zwei zusätzliche Pflichten auslösen:

1. **Diese Folgenabschätzung ist erforderlich** und liegt hiermit vor. Sie deckt **A6**, den Assistenten auf der eigenen Rufnummer, für den NexAI Verantwortlicher ist.
2. **Für Kundenagenten ist der Kunde Verantwortlicher**, nicht NexAI. Die Pflicht zur Folgenabschätzung trifft ihn; NexAI schuldet nach Art. 28 Abs. 3 lit. f Unterstützung. Abschnitt 7 stellt dafür einen Zulieferbaustein bereit.
3. **§ 38 Abs. 1 Satz 2 BDSG:** Wer Verarbeitungen vornimmt, die einer Folgenabschätzung unterliegen, muss **unabhängig von der Zahl der Beschäftigten** einen Datenschutzbeauftragten benennen. Das trifft NexAI — und es trifft **jeden Kunden**, der den Assistenten einsetzt, auch den Handwerksbetrieb mit fünf Mitarbeitern. Dieser Punkt gehört in das Verkaufsgespräch, nicht in die Überraschung nach Vertragsschluss. **Stand 17.10.2026 ist für NexAI noch niemand benannt (O-1).**

**Gesamtbewertung des Risikos nach Maßnahmen: mittel und tragbar — unter der Voraussetzung, dass zwei offene Sicherheitsmaßnahmen bis zum vorgeschlagenen Zieltermin umgesetzt werden.** Die Erstfassung stützte sich tragend auf die Nichtspeicherung. Diese Annahme hält nur zum Teil: Es wird kein Ton aufgezeichnet, im Anrufdatensatz steht kein Transkript, und Vapi erzeugt keine Zusammenfassung; Vapi hält aber je Anruf ein Textprotokoll des Gesprächs rund 14 Tage in den USA vor (R11). Daneben sind zwei Sicherheitslücken offen: Der Vapi-API-Schlüssel wurde am 17.10.2026 in einer lokalen KI-Assistenzsitzung im Klartext angezeigt und ist noch nicht rotiert (R13), und die Werkzeug-Webhooks nehmen Anfragen live ohne Geheimnis-Prüfung an (R12). **Maßnahmen mit Zieltermin (Vorschlag, von Max festzulegen): Schlüsselrotation (O-8) und Webhook-Geheimnis im Live-Betrieb (O-9) bis 24.10.2026.** Ein Restrisiko bleibt beim Drittlandtransfer und ist technisch nicht auflösbar; es erreicht nach hiesiger Bewertung nicht die Schwelle, ab der nach Art. 36 DSGVO die Aufsichtsbehörde vorab zu konsultieren wäre. **Zu dieser Einschätzung ist der Rat des zu benennenden Datenschutzbeauftragten einzuholen (Art. 35 Abs. 2 DSGVO)**, weil sie die einzige wirklich wertende Stelle dieses Dokuments ist.

---

## 1. Schwellwertprüfung — ist eine Folgenabschätzung erforderlich?

### 1.1 Regelbeispiele nach Art. 35 Abs. 3 DSGVO

| Regelbeispiel | Einschlägig? | Begründung |
|---|---|---|
| lit. a — systematische und umfassende Bewertung persönlicher Aspekte mit automatisierter Entscheidung und Rechtswirkung | **nein** | Der Assistent bewertet Anliegen, nicht Personen. Rechtsverbindliche Erklärungen sind ihm vertraglich ausdrücklich entzogen (§ 4 Rahmenvertrag: keine Preiszusagen, keine Bestellungen, kein Vertragsschluss). |
| lit. b — umfangreiche Verarbeitung besonderer Kategorien oder von Daten über Straftaten | **nein**, mit Vorbehalt | Besondere Kategorien sind weder Zweck noch vorgesehen. Anrufer können sie jedoch spontan offenbaren (Risiko R2). Für Berufsgeheimnisträger gilt der [Sperrvermerk](Sperrvermerk-Berufsgeheimnistraeger.md). |
| lit. c — systematische umfangreiche Überwachung öffentlich zugänglicher Bereiche | **nein** | Keine Überwachung; eingehende Anrufe auf Initiative des Anrufers. |

### 1.2 Liste der Aufsichtsbehörden nach Art. 35 Abs. 4 (Muss-Liste) — **einschlägig**

Die Liste der Datenschutzkonferenz (Version 1.1 vom 17.10.2018) nennt unter **Nr. 11**:

> „Einsatz von künstlicher Intelligenz zur Verarbeitung personenbezogener Daten zur Steuerung der Interaktion mit den Betroffenen oder zur Bewertung persönlicher Aspekte der betroffenen Person."

Als Beispiele werden dort **„Kundensupport mittels künstlicher Intelligenz"** und ein System genannt, das **„mit Kunden durch Konversation interagiert"**. Das beschreibt den Voice Agent nicht sinngemäß, sondern wörtlich: Er steuert die Interaktion mit dem Anrufer vollständig, entscheidet über Rückfragen, Terminvorschläge und Weiterleitung.

> **Prüfvermerk 17.10.2026:** Wortlaut und Beispiele am amtlichen PDF der DSK nachgeprüft (dort Nr. 11, nicht Nr. 9 wie in der Erstfassung). Die Fassung 1.1 ist weiterhin die auf datenschutzkonferenz-online.de verlinkte. Die Einstufung hält. Folge nach § 38 Abs. 1 Satz 2 BDSG: Datenschutzbeauftragter zu benennen. Hinweis: Der Website-Chat (VVT A4) „interagiert mit Kunden durch Konversation“ ebenso und ist deshalb in diese Folgenabschätzung aufzunehmen oder gesondert zu bewerten.

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
| 6 | Abgleich oder Zusammenführung von Datensätzen | **teilweise** — vorgesehen ist, Anrufer im CRM über die Rufnummer mit bestehenden Kontakten zusammenzuführen (Entdopplung). Diese Zusammenführung über die Rufnummer greift derzeit nicht, weil die Telefonanlage die NexAI-Nummer als Anrufernummer weitergibt. Stattdessen werden alle Anrufe ungewollt in einem Sammelkontakt zusammengeführt (3.1, R5). Mit Behebung (O-15) greift die vorgesehene Zusammenführung wieder. |
| 7 | Daten schutzbedürftiger Betroffener | nein — allgemeine Öffentlichkeit; kein Beschäftigten- oder Patientenverhältnis |
| 8 | **Innovative Technologie** | **ja** — KI-gestützte Sprachverarbeitung in Echtzeit |
| 9 | Betroffene an der Ausübung von Rechten hindern | nein — Weiterleitung an einen Menschen ist jederzeit möglich und im Prompt vorgesehen |

**Ein Kriterium klar erfüllt, drei teilweise (davon eines nur angelegt).** Bereits zwei erfüllte Kriterien lassen nach WP 248 regelmäßig auf ein hohes Risiko schließen. Zusammen mit 1.2 ist das Ergebnis eindeutig.

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

Ablauf eines Anrufs (Stand 17.10.2026):

1. Anrufer wählt die Rufnummer; easybell (Deutschland) stellt den Anruf zu.
2. Die eigene Telefonanlage (Asterisk, Server bei Hetzner in Deutschland) nimmt an und übergibt an Vapi. **Dabei setzt sie als Anrufernummer die NexAI-Nummer (+49 7959 3100191).** Vapi meldet deshalb bei jedem Anruf die eigene Nummer; die tatsächliche Rufnummer des Anrufers kommt bei Vapi und im CRM nicht an. Die Änderung an der Telefonanlage ist offen (O-15).
3. Vapi (USA) führt den Dialog: Spracherkennung durch Soniox (USA), Antwortgenerierung durch OpenAI (Modell gpt-4.1; Irland/USA — über wessen OpenAI-Konto der Aufruf läuft, ist offen, O-13), Sprachausgabe über Vapi mit der Stimme „Sid" auf dem ElevenLabs-Modell `eleven_turbo_v2_5` (ob ElevenLabs dabei Unterauftragsverarbeiter von Vapi ist, ist offen, O-14). Vapi legt je Anruf ein Textprotokoll mit den erkannten Sätzen des Anrufers und den Antworten des Modells an (3.2).
4. Für Terminanfragen ruft der Assistent die Werkzeuge `check_availability` und `book_appointment_make` auf. Sie zeigen auf die **eigene n8n-Instanz in Deutschland** (Hetzner); n8n fragt freie Zeiten in **NexTime** ab — dem selbst betriebenen Terminkalender, ebenfalls bei Hetzner in Deutschland — und bucht dort. Die Webhooks prüfen im Live-Betrieb derzeit **kein Geheimnis** (O-9).
5. **Seit 17.10.2026 (ca. 18:05 Uhr)** setzt n8n die E-Mail-Adresse nach festen Regeln aus dem Gehörten zusammen (Punkt, Minus, Unterstrich und @ nur, wenn das Wort gesagt wurde); ist die Adresse unvollständig, fragt der Assistent nach. Vor der Buchung liest der Assistent Name (Nachname buchstabiert) und E-Mail-Adresse in einem vom Programm vorgegebenen Wortlaut vor; gebucht wird nur mit einem Bestätigungscode, der an Name und E-Mail-Adresse hängt. Ohne E-Mail-Adresse wird ohne Vorlesen gebucht.
6. Hat der Anrufer eine E-Mail-Adresse genannt, erhält er Bestätigung und Erinnerung per E-Mail über **Resend, Inc. (USA)**. Das Beratungsgespräch führt ein selbstständiger Vertriebspartner, der dafür Zugriff auf den Termin erhält (Datenschutzerklärung Abschnitt 11).
7. Auf Wunsch des Anrufers oder bei komplexen Anliegen sendet Vapi ein REFER an die eigene Telefonanlage, die an einen Menschen weiterverbindet.
8. Nach Gesprächsende meldet Vapi einen Abschlussbericht (end-of-call-report: Zeiten, Dauer, Status, gegebenenfalls Zusammenfassung, Anrufernummer) an das **selbst betriebene CRM in Deutschland**; andere Vapi-Daten verarbeitet das CRM nicht. Das CRM legt über die Anrufernummer einen Kontakt an — wegen Schritt 2 hängen derzeit **alle Telefonanrufe an einem einzigen Kontakt mit der NexAI-Nummer**. Zusätzlich speichert n8n beim Buchen Name, E-Mail-Adresse, Telefon und Anliegen als Kontakt und Lead im CRM.

### 3.2 Daten, Betroffene, Rechtsgrundlagen

| | |
|---|---|
| **Betroffene** | Anrufer (Interessenten, Kunden, gelegentlich Unbeteiligte bei Falschwahl) |
| **Datenarten** | Rufnummer des Anrufers: **liegt derzeit nur bei easybell** (Verkehrsdaten des Anbieters). Die Telefonanlage ersetzt sie schon beim Eingang durch die NexAI-Nummer (Endpoint-Einstellung `callerid`). Geprüft am 17.10.2026: Die Gesprächsdatensätze der Anlage (`Master.csv`, 134 Einträge vom 20.08. bis 17.10.2026) enthalten keine fremde Nummer, und der Anrufdatensatz und das Protokoll bei Vapi enthalten nur die eigenen Nummern. Bei NexAI und Vapi wird die echte Anrufernummer derzeit also nirgends gespeichert (3.1 Schritt 2, O-15), Name, Anliegen in eigenen Worten, Wunschtermin, gegebenenfalls E-Mail-Adresse, beim Buchen ein Feld „Telefon" (ob genannt oder technisch übergeben, ist nicht geprüft), Verbindungs- und Metadaten (Zeit, Dauer, Status/Ergebnis) |
| **Gesprächsinhalt** | **Kein Ton** (`recordingEnabled=false`); Transkript-Speicherung am Assistenten aus; im Anrufdatensatz stehen keine Gesprächsnachrichten und kein Transkript (geprüft 17.10.2026). **Aber:** Vapi führt je Anruf ein ausführliches Protokoll mit den erkannten Sätzen des Anrufers und den Antworten des Modells, abrufbar über die Schnittstelle (`artifact.presignedLogUrl`, Link rund 1 Stunde gültig; `GET /logs?callId=`), laut Datenschutzerklärung rund 14 Tage. Zero Data Retention ist im Vapi-Tarif von NexAI (Pay-as-you-go) nicht enthalten (Dashboard: „Your subscription does not include ZDR"). Der Gesprächsinhalt liegt damit **befristet als Text in den USA** vor. Die automatische Zusammenfassung ist am Assistenten ausgeschaltet (`analysisPlan.summaryPlan.enabled=false`, geprüft 17.10.2026); ins CRM gelangen der Abschlussbericht ohne Gesprächsinhalt und beim Buchen das kurz erfasste Anliegen. |
| **Rechtsgrundlagen** | Art. 6 Abs. 1 lit. b (Anbahnung/Durchführung, insbesondere Terminvereinbarung); Art. 6 Abs. 1 lit. f für die effiziente Bearbeitung allgemeiner Anfragen |
| **Empfänger** | Vapi (US), Soniox (US, über Vapi), OpenAI (IE/US; Konto offen, O-13), ElevenLabs (Modell hinter der Vapi-Stimme; Rolle offen, O-14), easybell (DE), Hetzner (DE, Auftragsverarbeiter für Hosting von Telefonanlage, n8n, NexTime und CRM), Resend (US, Bestätigungs- und Erinnerungsmails), selbstständiger Vertriebspartner (Zugriff auf den Termin) |
| **Drittland** | USA auf Grundlage der Standardvertragsklauseln mit Folgenabschätzung ([Vapi](TIA-Vapi-Drittlandtransfer.md), [OpenAI](TIA-OpenAI-Drittlandtransfer.md)); welches Modul mit Vapi für die eigene Rufnummer gilt, ist ungeklärt (vermutlich Modul 2, O-12). Resend: DPF-zertifiziert und Standardvertragsklauseln (Stand der Prüfung 06.09.2026, damals „Active — Re-certification under Review"; vor Verwendung neu abfragen). ElevenLabs: offen (O-14). |
| **Speicherort dauerhaft** | Deutschland (CRM, NexTime und n8n bei Hetzner). **Befristet in den USA:** Gesprächsprotokoll bei Vapi, rund 14 Tage; OpenAI bis zu 30 Tage, falls der Sprachaufruf über ein NexAI-Konto ohne Nichtspeicherung läuft, über Vapis Konto unbekannt (O-13); Resend: Zustellprotokolle, Dauer nicht erhoben. |
| **Löschfristen** | Vapi-Gesprächsprotokoll: rund 14 Tage (Angabe der Datenschutzerklärung; Beleg aus Vertrag oder Dokumentation offen, O-11)<br>NexTime: Anonymisierung 12 Monate nach dem letzten Termin<br>CRM, Anrufe: 180 Tage ab Erstellung, hart gelöscht<br>CRM, Leads und Termin-Anfragen: 180 Tage ab letzter Aktivität, hart gelöscht<br>CRM-Löschlauf alle 10 Minuten; Datensätze unter Legal Hold werden übersprungen; Regeln bestehen seit 02./03.09.2026, zuletzt geändert am 18.10.2026 (Datenbank gelesen); bis 18.10.2026 noch kein Löschauftrag ausgeführt, weil noch kein Datensatz 180 Tage alt ist<br>**CRM, Kontakte: Anonymisierung 730 Tage (2 Jahre) ab letzter Aktivität** (Regel seit 01.09.2026). Eine kürzere Frist ist bewusst nicht gesetzt, weil die Aktivität im CRM Belege und Rechnungen nicht mitzählt und Kunden mit Aufbewahrungspflicht (8 bzw. 10 Jahre) sonst nach 6 Monaten erfasst würden. Kontakte aus Telefonbuchungen bleiben deshalb bis zu 2 Jahre statt 6 Monate stehen (Lücke, R9, O-10)<br>Versandprotokolle der E-Mails: 6 Monate (Datenschutzerklärung Abschnitt 10)<br>n8n-Ausführungsprotokolle und OpenAI: nicht erhoben (O-16, O-13) |

### 3.3 Was ausdrücklich nicht stattfindet

Keine Anrufaufzeichnung (Ton). Kein Transkript im Anrufdatensatz und keines im CRM — das Textprotokoll bei Vapi (3.2) ist davon ausdrücklich **nicht** erfasst. Keine Stimmungs- oder Emotionsanalyse. Keine Stimmerkennung oder biometrische Identifizierung. Keine ausgehenden Werbeanrufe — ausgehende Anrufe sind technisch nicht möglich. Keine Profilbildung über Anrufer hinweg. Kein Training von Modellen mit den Gesprächsdaten (vertraglich zugesichert).

---

## 4. Notwendigkeit und Verhältnismäßigkeit (Art. 35 Abs. 7 lit. b)

**Erforderlichkeit.** Ohne den Assistenten bleiben Anrufe unbeantwortet; der Zweck lässt sich mit weniger eingriffsintensiven Mitteln nicht gleich gut erreichen. Geprüfte mildere Mittel:

- *Anrufbeantworter:* verarbeitet weniger Daten, erreicht den Zweck aber schlechter — Rückrufwünsche werden häufig nicht hinterlassen, und eine Terminvergabe findet nicht statt.
- *Externes Callcenter mit Menschen:* verarbeitet **mehr** Daten (Menschen hören zu, Gespräche werden dort regelmäßig aufgezeichnet) und ist damit nicht milder.
- *Assistent ohne Anliegenerfassung, nur Terminvergabe:* wäre milder und bleibt als Rückfallgestaltung vorgemerkt, erreicht den Zweck der Vorqualifizierung aber nicht.

**Datenminimierung.** Erhoben wird, was für Rückruf und Termin nötig ist. Ins CRM gelangt kein Wortprotokoll, sondern nur der Abschlussbericht mit strukturierten Feldern und gegebenenfalls einer Zusammenfassung. Bei Vapi entsteht dagegen ein Textprotokoll des Gesprächs (3.2), das im heutigen Tarif ohne Zero Data Retention anfällt; ob es sich anders vermeiden oder vorzeitig löschen lässt, ist offen (O-11). Das ist der wesentliche Abstrich gegenüber der Erstfassung (R11).

**Richtigkeit.** Seit 17.10.2026 bildet das Programm die E-Mail-Adresse nach festen Regeln, der Assistent liest Name und Adresse im vorgegebenen Wortlaut vor, und gebucht wird nur mit einem Bestätigungscode (3.1 Schritt 5). Ohne E-Mail-Adresse entfällt das Vorlesen.

**Speicherbegrenzung.** Fristen sind in der Datenschutzerklärung benannt. Im CRM bestehen Regeln für Anrufe, Leads und Termin-Anfragen (180 Tage) und für Kontakte (Anonymisierung nach 2 Jahren Inaktivität) (3.2). Die Datenschutzerklärung (Abschnitt 11) sagt dagegen: „den Eintrag im CRM löschen wir nach sechs Monaten, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen"; für Kontakte aus Telefonbuchungen hält diese Zusage bis zum Filter (O-10) nicht — sie bleiben bis zu 2 Jahre.

**Transparenz.** Der Assistent weist zu Gesprächsbeginn darauf hin, dass es sich um ein KI-System handelt (Art. 50 KI-Verordnung). Die Datenschutzerklärung beschreibt die Verarbeitung einschließlich der Empfänger und der Drittlandgrundlage und nennt seit 17.10.2026 das Gesprächsprotokoll bei Vapi mit rund 14 Tagen. Nicht genannt ist ElevenLabs (Rolle offen, O-14); die Aussage zur Löschung im CRM trifft für Kontakte derzeit nicht zu (siehe Speicherbegrenzung).

**Betroffenenrechte.** Auskunft, Berichtigung und Löschung werden über das CRM bedient, das Suche, Export und Löschung je betroffener Person unterstützt. **Einschränkung:** Weil alle Telefonanrufe derzeit an einem Sammelkontakt mit der NexAI-Nummer hängen (3.1 Schritt 2 und 8), lassen sich die Anrufdatensätze einer Person nicht über ihren Kontakt finden, sondern nur über Zeitpunkt und Zusammenfassung; eine Löschung des Sammelkontakts träfe alle Anrufer. Das Vapi-Protokoll ist innerhalb der rund 14 Tage je Anruf über die Schnittstelle abrufbar; ob Vapi einzelne Protokolle auf Anforderung löscht, ist offen (O-11). Ein Widerspruch gegen die Verarbeitung durch den Assistenten ist praktisch immer möglich: Der Anrufer kann jederzeit einen Menschen verlangen, und der Assistent ist angewiesen, dem zu folgen.

---

## 5. Risiken für die Rechte und Freiheiten (Art. 35 Abs. 7 lit. c)

Bewertet nach Eintrittswahrscheinlichkeit (EW) und Schwere (S), je gering / mittel / hoch.

| # | Risiko | EW | S | Bewertung |
|---|---|---|---|---|
| **R1** | Zugriff US-amerikanischer Behörden auf Gesprächsinhalte während der Verarbeitung | gering | hoch | **mittel** — während des Anrufs flüchtig; der gespeicherte Bestand bei Vapi ist gesondert unter R11 bewertet; technisch nicht ausschließbar (EDPB-Anwendungsfall 6) |
| **R2** | Anrufer offenbart spontan besondere Kategorien („ich hatte einen Unfall", „mein Vater ist verstorben") | **hoch** | mittel | **mittel** — im Sprachkanal unvermeidbar; kein Wortprotokoll und keine Zusammenfassung im CRM, allenfalls im kurz erfassten Anliegen; fließt aber durch die US-Kette und liegt rund 14 Tage im Vapi-Protokoll (R11) |
| **R3** | Fehlerkennung: falscher Name, falsche E-Mail-Adresse, falscher Termin; bei falscher Adresse geht die Bestätigung samt Link zum Verschieben oder Absagen an einen Dritten | mittel (bis zum Beleg) | mittel | **mittel, nach Beleg gering** — Adresse programmgebildet, Pflicht-Vorlesen und Bestätigungscode (seit 17.10.2026, auf einer Testkopie geprüft); die Wirksamkeit am Live-Telefon ist noch nicht durch einen Buchungsanruf belegt (Stand 17.10.2026 abends); ohne E-Mail-Adresse wird ohne Vorlesen gebucht, dort bleibt das Risiko eines falsch erfassten Namens |
| **R4** | Der Assistent sagt etwas Unzutreffendes zu, der Anrufer verlässt sich darauf | mittel | mittel | **mittel** — vertraglich ausgeschlossene Vollmacht schützt rechtlich, nicht faktisch |
| **R5** | **Neu gefasst:** Alle Telefonanrufe hängen im CRM an einem Sammelkontakt mit der NexAI-Nummer; Zusammenfassungen verschiedener Anrufer stehen nebeneinander, Auskunft und Löschung je Person sind über den Kontakt nicht möglich. Das Risiko der Erstfassung (Verwechslung bei gemeinsam genutzten Anschlüssen) ruht, bis die echte Anrufernummer übergeben wird, und lebt dann wieder auf | **hoch** (eingetreten) | mittel | **mittel** |
| **R6** | Menschen, die mit einem Sprachsystem nicht sprechen können oder wollen, erreichen den Betrieb nicht | mittel | mittel | **mittel** — mindert sich durch die jederzeitige Weiterleitung an Menschen |
| **R7** | Ausfall der Telefonie; dringende Anliegen erreichen niemanden | mittel | mittel | **mittel** — die Telefonanlage ist heute ein einzelner Ausfallpunkt |
| **R8** | Unbefugter Zugriff auf die im CRM gespeicherten Anruf- und Kontaktdaten | gering | mittel | **gering** — Mandantentrennung auf Datenbankebene, Zwei-Faktor-Pflicht, verschlüsselte Sicherungen; der Zugang zu Vapi ist gesondert unter R13 bewertet |
| **R9** | Daten werden zu spät gelöscht: Kontakte aus Telefonbuchungen werden erst nach 2 Jahren Inaktivität anonymisiert statt nach 6 Monaten — entgegen der Aussage in der Datenschutzerklärung | **hoch** | mittel | **mittel** — für Anrufe, Leads und Termin-Anfragen bestehen 180-Tage-Regeln |
| **R10** | Verbindungsdaten der Telefonanlage (wer wann anrief) werden unbegrenzt vorgehalten | mittel | gering | **gering** |
| **R11** | **Neu:** Gesprächsinhalt als Textprotokoll bei Vapi in den USA (erkannte Sätze und Modellantworten), rund 14 Tage, über die Schnittstelle abrufbar; Zero Data Retention im Tarif nicht enthalten. Bestand für Herausgabeanordnungen, Behördenzugriff und Vorfälle beim Anbieter — einschließlich spontan offenbarter besonderer Kategorien (R2) | gering | hoch | **mittel** — die Frist ist kurz, das Volumen gering; das Argument der TIA, eine Anordnung träfe „auf nichts Gespeichertes", trägt aber nicht mehr |
| **R12** | **Neu — Sicherheit der Verarbeitung (Art. 32 Abs. 1 lit. b DSGVO: „die Fähigkeit, die Vertraulichkeit, Integrität, Verfügbarkeit und Belastbarkeit der Systeme und Dienste im Zusammenhang mit der Verarbeitung auf Dauer sicherzustellen"):** Die Werkzeug-Webhooks (n8n) prüfen live kein Geheimnis. Wer die Adresse kennt, kann Verfügbarkeiten abfragen und Termine auf fremde Namen und E-Mail-Adressen buchen; die Angaben landen in NexTime und als Kontakt und Lead im CRM, Resend verschickt Bestätigungen an beliebige Adressen. Ob die Antworten der Webhooks personenbezogene Daten enthalten, ist nicht geprüft | mittel | mittel | **mittel** |
| **R13** | **Neu:** Der Vapi-API-Schlüssel wurde am 17.10.2026 bei einer Fehlersuche in der Ausgabe einer lokalen KI-Assistenzsitzung (auf dem Rechner eines Gesellschafters) im Klartext angezeigt. Er steht damit im lokalen Sitzungsprotokoll und lag dem Anbieter des Assistenten vor; ein Hinweis auf Zugriff Dritter besteht nicht. Wer den Schlüssel hat, kann laut Vapi-Schnittstellenbeschreibung die Gesprächsprotokolle der letzten rund 14 Tage abrufen, die Werkzeugadressen auslesen (→ R12) und die Konfiguration des Assistenten ändern | gering (angenommen, solange nichts Gegenteiliges bekannt ist) | hoch | **mittel** — bis zur Rotation (O-8); danach gering |

---

## 6. Abhilfemaßnahmen (Art. 35 Abs. 7 lit. d)

| # | Bereits umgesetzt | Noch offen |
|---|---|---|
| R1 | Ton-Aufzeichnung und Transkript-Speicherung am Assistenten deaktiviert (geprüft 17.10.2026); enge Datenkategorien; Standardvertragsklauseln mit Folgenabschätzung; dauerhafte Speicherung ausschließlich in Deutschland; TIA Vapi in Teilen überholt (O-16), SCC-Modul ungeklärt (O-12) | Modul der Standardvertragsklauseln mit Vapi klären (O-12); EU-Region und Nichtspeicherung bei OpenAI aktivieren, sobald geklärt ist, über wessen Zugang der Sprachaufruf läuft (O-13, O-6); mittelfristig Ablösung durch einen europäischen Sprach-Stack |
| R2 | Kein Wortprotokoll und keine automatische Zusammenfassung im CRM; Prompt fordert keine Gesundheits- oder sonstigen sensiblen Angaben ab; [Sperrvermerk](Sperrvermerk-Berufsgeheimnistraeger.md) für einschlägige Branchen | Sensitivitäts-Riegel vor die Einrichtung ziehen — heute greift er erst beim Speichern und verhindert den Transfer nicht (O-4); Vapi-Protokoll siehe R11 |
| R3 | Seit 17.10.2026: E-Mail-Adresse vom Programm nach festen Regeln gebildet, Rückfrage bei unvollständiger Adresse, Pflicht-Vorlesen von Name (buchstabiert) und E-Mail-Adresse im vorgegebenen Wortlaut, Buchung nur mit Bestätigungscode; Rückbestätigung des Termins im Gespräch; Konfliktprüfung gegen NexTime vor der Zusage | Prüfen, ob der Name auch bei Buchungen ohne E-Mail-Adresse vorgelesen werden soll |
| R4 | Vertraglicher Ausschluss rechtsverbindlicher Erklärungen; Prompt-Leitplanken; Hinweis auf fachkundige Stellen statt eigener Beratung | Formulierungen im Prompt regelmäßig prüfen; Grenzfälle aus echten Gesprächen sammeln |
| R5 | Entdopplung über die vollständige Rufnummer statt über Namensähnlichkeit ist im CRM angelegt — greift aber erst, wenn die echte Anrufernummer ankommt | Telefonanlage so ändern, dass die echte Anrufernummer übergeben wird (O-15) — **vorher** Neubewertung nach Abschnitt 9; danach Sammelkontakt auflösen; bis dahin Auskunft und Löschung für Anrufe über Zeitpunkt und Zusammenfassung bedienen |
| R6 | Weiterleitung an einen Menschen jederzeit auf Zuruf; Rückruf-Werkzeug, wenn die Weiterleitung scheitert | Alternativer Kontaktweg (E-Mail, Formular) in der Ansage nennen |
| R7 | Automatischer Neustart der Telefonanlage; Rückfallweg über den Anbieter vorhanden | Überwachung und geübter Notfallweg; der Kunde hält nach Service-Level ein eigenes Ausweichverfahren vor |
| R8 | Mandantentrennung auf Datenbankebene, Zwei-Faktor-Pflicht, Zugriffsprotokoll, verschlüsselte Sicherungen, Transkripte verschlüsselt gespeichert (vom Telefonassistenten kommt kein Transkript an, nur der Abschlussbericht) | — |
| R9 | Löschmaschine im CRM mit Fristen, Aktionen und Protokoll; Löschsperre (Legal Hold) für Einzelfälle; Regeln für Anrufe (180 Tage ab Erstellung), Leads und Termin-Anfragen (180 Tage ab letzter Aktivität), hart, Lauf alle 10 Minuten (seit 02./03.09.2026, geändert 18.10.2026; noch kein Löschauftrag fällig); Kontakte nach 2 Jahren Inaktivität anonymisiert; NexTime anonymisiert nach 12 Monaten | Löschregel für Kontakte mit Filter, der Kunden mit Belegen oder Rechnungen ausnimmt (O-10); Wirksamkeit der Regeln belegen, sobald der erste Datensatz fällig wird (ab März 2027); Aufbewahrungsregeln je Mandant fest in das Onboarding aufnehmen (O-5) |
| R10 | — | Aufbewahrungsgrenze für die Verbindungsdaten der Telefonanlage setzen; Zugriff beschränken und auf das Fernmeldegeheimnis verpflichten |
| R11 | Ton wird nicht aufgezeichnet; Transkript nicht im Anrufdatensatz; keine Zusammenfassung; Frist von rund 14 Tagen in der Datenschutzerklärung offengelegt (seit 17.10.2026) | Detailprotokoll am Assistenten abschalten (`artifactPlan.loggingEnabled=false`, kostenlos; schließt das Textprotokoll für neue Anrufe, Webhook- und API-Protokolle — darunter die Werkzeugaufrufe mit Name und E-Mail — bleiben ohne ZDR bestehen); Zero Data Retention bzw. Tarif mit Vapi klären, Frist mit Beleg festhalten, vorzeitige Löschung prüfen (O-11); TIA Vapi (M-1, 1.2, Ergebnis) angleichen (O-16) |
| R12 | — | Technische Maßnahme nach Art. 32 Abs. 1 lit. b: Prüfung des Kopffelds `x-nexai-secret` ist gebaut und auf einer Testkopie geprüft (ohne Geheimnis Antwort 403); im Live-Betrieb übertragen (O-9); prüfen, welche Daten die Webhooks zurückgeben |
| R13 | — | Schlüssel rotieren (O-8); die neue Fassung nur in der Schlüsselablage hinterlegen, nicht in Konfigurationsdateien im Klartext |

---

## 7. Zulieferbaustein für Kunden (Art. 28 Abs. 3 lit. f)

Ein Kunde, der den Assistenten einsetzt, benötigt eine eigene Folgenabschätzung. NexAI stellt ihm dafür bereit:

- die **Beschreibung der Verarbeitung** aus Abschnitt 3 einschließlich Empfängerliste, Speicherorten und Fristen — ausdrücklich auch des **Gesprächsprotokolls bei Vapi** (rund 14 Tage, im heutigen Tarif ohne Zero Data Retention), das der Kunde in seiner Folgenabschätzung und seiner Datenschutzerklärung abbilden muss,
- die **Risikoanalyse** aus Abschnitt 5 mit den technischen Maßnahmen aus Abschnitt 6,
- die **Drittland-Folgenabschätzungen** für Vapi und OpenAI,
- das **Verzeichnis der Unterauftragsverarbeiter** (Anhang 2 des Auftragsverarbeitungsvertrags),
- die **technischen und organisatorischen Maßnahmen**.

Der Kunde muss selbst ergänzen und verantworten: seine Zwecke und Rechtsgrundlagen, sein Anrufaufkommen, die Abwägung im Hinblick auf seine Betroffenen, seine eigenen Löschfristen, die Einbindung seines Datenschutzbeauftragten und — falls er an Mitarbeiter weiterverbinden lässt — die Rechtsgrundlage für die Nutzung von deren Rufnummern.

**Im Verkaufsgespräch aktiv ansprechen:** Der Einsatz löst beim Kunden die Pflicht zur Folgenabschätzung aus und damit nach § 38 Abs. 1 Satz 2 BDSG die Pflicht, einen Datenschutzbeauftragten zu benennen — auch unterhalb von 20 Beschäftigten. Wer das verschweigt, verkauft ein Problem mit. Wer es benennt und den Baustein mitliefert, verkauft eine Lösung.

---

## 8. Verbleibendes Risiko und Entscheidung

Nach Umsetzung der Maßnahmen aus Abschnitt 6 verbleibt ein Risiko in drei Punkten:

**R1 und R11 (Drittlandzugriff)** sind technisch nicht auflösbar, solange die Sprachverarbeitung außerhalb der EU stattfindet. Anders als in der Erstfassung angenommen, entsteht bei Vapi ein befristeter Bestand: das Textprotokoll je Anruf, rund 14 Tage. Die Minderung stützt sich deshalb nicht mehr auf Nichtspeicherung, sondern auf die kurze Frist, die engen Datenkategorien, das geringe Volumen und die vertraglichen Garantien. **R2 (spontane Offenbarung)** ist dem Sprachkanal eigen; solche Angaben gelangen allenfalls über das kurz erfasste Anliegen ins CRM, liegen aber rund 14 Tage im Vapi-Protokoll und lassen sich sonst nur durch den Ausschluss einschlägiger Branchen begrenzen.

**R12 (Webhooks) und R13 (Schlüssel)** sind keine Restrisiken, sondern offene Sicherheitslücken mit bekannter Abhilfe.

**Bewertung:** Das Restrisiko wird als **mittel** eingestuft, nicht als hoch im Sinne von Art. 36 Abs. 1 DSGVO. Tragend dafür sind: keine Tonaufzeichnung, kein Transkript und keine Zusammenfassung im CRM, ein befristeter Bestand in den USA (Vapi rund 14 Tage; OpenAI bis zu 30 Tage, falls über ein NexAI-Konto ohne Nichtspeicherung, O-13) und keine planmäßige Verarbeitung besonderer Kategorien. **Voraussetzung ist, dass O-8 (Schlüsselrotation) und O-9 (Webhook-Geheimnis im Live-Betrieb) bis zum Zieltermin umgesetzt werden (Vorschlag: 24.10.2026, von Max festzulegen).** Bis dahin sind R12 und R13 mittel. Gelingt die Umsetzung bis zum Zieltermin nicht, wird der Telefonassistent bis zur Umsetzung abgeschaltet; lassen sich die Maßnahmen gar nicht umsetzen, ist die Aufsichtsbehörde nach Art. 36 Abs. 1 DSGVO vor der weiteren Verarbeitung zu konsultieren. Stellt sich heraus, dass Vapi das Protokoll länger als rund 14 Tage vorhält (O-11), ist R11 neu zu bewerten. Zu dieser Einschätzung — der einzigen echten Wertung dieses Dokuments — ist der Rat des zu benennenden Datenschutzbeauftragten einzuholen (Art. 35 Abs. 2, Art. 39 Abs. 1 lit. c DSGVO).

---

## 9. Was diesen Befund kippt

Jeder der folgenden Punkte macht eine Neubewertung erforderlich, bevor er umgesetzt wird:

| Auslöser | Folge |
|---|---|
| Ton-Aufzeichnung oder Transkript-Speicherung wird aktiviert — für NexAI oder einen Kunden | Inhalte entstehen dauerhaft; R1 steigt auf hoch; § 201 StGB und Einwilligungen kommen hinzu |
| Die Telefonanlage übergibt die echte Anrufernummer an Vapi (O-15) | Rufnummer gelangt in die USA (auch ins Vapi-Protokoll) und ins CRM; die Zusammenführung über die Rufnummer setzt ein (Kriterium 6, R5 in der Fassung der Erstbewertung); Sammelkontakt auflösen |
| Vapi-Tarif oder Protokollfrist ändern sich (Zero Data Retention, längere oder kürzere Frist) | R11 neu bewerten; Datenschutzerklärung Abschnitte 4 und 11 angleichen |
| Ein Berufsgeheimnisträger wird bedient | [Sperrvermerk](Sperrvermerk-Berufsgeheimnistraeger.md) greift; volle Neubewertung, voraussichtlich Art. 36 |
| Ausgehende Anrufe werden möglich | Neuer Verarbeitungszweck, § 7 UWG, andere Betroffenenerwartung |
| Stimmungs-, Emotions- oder Stimmerkennung wird eingeschaltet | Biometrie beziehungsweise Bewertung persönlicher Aspekte; neue Rechtsgrundlage nötig |
| Wechsel von Sprachmodell, Spracherkennung oder Sprachausgabe — einschließlich des Modells hinter der Vapi-Stimme (derzeit ElevenLabs, O-14) | Empfängerwechsel: 14 Tage Vorabinformation an Kunden, Anhang 2 anpassen, Drittlandbewertung prüfen |
| Anrufaufkommen wächst deutlich oder mehrere Mandanten werden zusammengeführt | Kriterium „umfangreiche Verarbeitung" neu prüfen |

---

### 9.1 Neubewertung vor Umsetzung von O-15 (18.10.2026)

**Änderung.** Die Telefonanlage übernimmt die Rufnummer aus dem `From`-Kopf des eingehenden Anrufs und gibt sie an Vapi weiter. Bisher ersetzt sie sie durch die NexAI-Nummer (3.2). Übernommen wird nur eine Ziffernfolge. **Unterdrückte Rufnummern** (`anonymous`) werden nicht übernommen. Die `P-Asserted-Identity`, in der der Anbieter die Nummer trotz Unterdrückung mitliefern kann, wird bewusst nicht gelesen. Der Weiterleitungsweg zu den Gesellschaftern bleibt unverändert.

**Neue Datenflüsse.**
- Rufnummer → Vapi (USA): im Anrufdatensatz (`customer.number`) und im Textprotokoll, rund 14 Tage (R11).
- Rufnummer → CRM: je Anrufer ein eigener Kontakt statt des Sammelkontakts. Anrufe werden nach 180 Tagen gelöscht, Kontakte nach 2 Jahren Inaktivität anonymisiert (3.2).
- Rufnummer → Gesprächsdatensätze der Anlage (`Master.csv`). Diese wurden bisher nie rotiert. **Neu ist eine Aufbewahrungsgrenze:** monatliche Rotation mit 3 Generationen, also rund 3–4 Monate (R10).

**Zweck und Erforderlichkeit.** Rückruf ohne erneutes Erfragen der Nummer. Zuordnung eines Anrufs zu einer Person — erst damit lassen sich Auskunft und Löschung je Person bedienen (heute ist das beim Sammelkontakt nicht möglich, R5). Entdopplung im CRM. Mildere Mittel, die das leisten, gibt es nicht. Die Rechtsgrundlagen bleiben dieselben (3.2). Die Datenschutzerklärung (Abschnitt 11) nennt die Telefonnummer und Vapi als Empfänger bereits.

**Auswirkung auf die Risiken.**
- **R5** kehrt zur Fassung der Erstbewertung zurück (Verwechslung bei gemeinsam genutzten Anschlüssen): gering. Der Sammelkontakt wächst nicht weiter. Alte Anrufe bleiben bis zur Löschfrist daran hängen.
- **R10** betrifft künftig echte Rufnummern und ist durch die neue Aufbewahrungsgrenze begrenzt: gering.
- **R11** bleibt mittel. Die Rufnummer kommt im Vapi-Bestand hinzu, die Frist bleibt rund 14 Tage.

**Ergebnis.** Das Restrisiko bleibt **mittel**, die Umsetzung ist vertretbar. Ausgeführt wird die Änderung durch Max per Skript mit Sicherung und Rückweg. Danach folgt ein Testanruf (Rufnummer kommt bei Vapi an, Weiterleitung klingelt weiter). Zu dieser Bewertung ist der Rat des Datenschutzbeauftragten einzuholen, sobald er benannt ist (O-2).

---

## 10. Offene Punkte und Wiedervorlage

| | Punkt | Zuständig | Status 17.10.2026 |
|---|---|---|---|
| O-1 | **Datenschutzbeauftragten benennen** (§ 38 Abs. 1 Satz 2 BDSG), Kontaktdaten veröffentlichen und der Aufsichtsbehörde mitteilen (Art. 37 Abs. 7 DSGVO). **Nicht durch einen Gesellschafter:** Nach Art. 38 Abs. 6 Satz 2 DSGVO stellt der Verantwortliche sicher, „dass derartige Aufgaben und Pflichten nicht zu einem Interessenkonflikt führen"; wer Zwecke und Mittel der Verarbeitung festlegt, darf nicht Datenschutzbeauftragter sein (BAG, Urteil vom 06.06.2023 – 9 AZR 383/19, Rn. 23, unter Verweis auf EuGH, Urteil vom 09.02.2023 – C-453/21, Rn. 44). Ob ein Interessenkonflikt vorliegt, ist im Einzelfall festzustellen (EuGH C-453/21 Rn. 45 f.); bei den Gesellschaftern einer GbR, die alle Verarbeitungen selbst festlegen, ist das eindeutig. Die Gesellschafter legen Zwecke und Mittel fest — etwa die Löschregeln vom 17.10.2026. In Betracht kommt ein externer Datenschutzbeauftragter auf Grundlage eines Dienstleistungsvertrags (Art. 37 Abs. 6 DSGVO) | Max | **offen** — niemand benannt |
| O-2 | Diese Folgenabschätzung dem Datenschutzbeauftragten zur Stellungnahme vorlegen (Art. 35 Abs. 2) | Max | offen — nach O-1 |
| O-3 | Stellungnahme des Datenschutzbeauftragten zu Abschnitt 8 einholen und dokumentieren (Art. 35 Abs. 2, Art. 39 Abs. 1 lit. c) | Datenschutzbeauftragter / Max | offen — nach O-1 |
| O-4 | Sensitivitäts-Riegel vor die Einrichtung ziehen | NexAI | offen |
| O-5 | Aufbewahrungsregeln je Mandant verpflichtend im Onboarding | NexAI | offen; für den eigenen Mandanten bestehen Regeln für alle vier Datenarten (3.2) |
| O-6 | EU-Region und Nichtspeicherung bei OpenAI, sofern über eigenen Zugang möglich | NexAI | offen — hängt an O-13 |
| O-7 | Zulieferbaustein für Kunden als eigenes Dokument ausformulieren | NexAI | offen |
| O-8 | **Vapi-API-Schlüssel rotieren** (am 17.10.2026 in einer lokalen KI-Assistenzsitzung im Klartext angezeigt, R13) | Max | **offen — Zieltermin-Vorschlag 24.10.2026 (Abschnitt 8)** |
| O-9 | **Webhook-Geheimnis (`x-nexai-secret`) in den Live-Betrieb übertragen** | Max / NexAI | **gebaut, auf Testkopie geprüft; live offen — Zieltermin-Vorschlag 24.10.2026 (Abschnitt 8); braucht einen Testanruf** |
| O-10 | Kürzere Löschregel für Kontakte aus Buchungsabläufen bzw. mit Filter für Kunden mit Belegen oder Rechnungen (Aufbewahrungspflicht 8/10 Jahre); heute 2 Jahre Anonymisierung für alle Kontakte; bis dahin ist die Zusage in Abschnitt 11 der Datenschutzerklärung („den Eintrag im CRM löschen wir nach sechs Monaten, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen") für Kontakte nicht erfüllt | NexAI | offen |
| O-11 | Vapi-Protokoll: Detailprotokoll abschalten (`loggingEnabled=false`, mit Testanruf); Zero Data Retention bzw. Tarif klären (laut Preisseite 17.10.2026 im Paket „Core", ob für Bestandskonten buchbar, offen); Frist von rund 14 Tagen mit Beleg festhalten; vorzeitige Löschung einzelner Protokolle prüfen | Max | offen — ZDR im Pay-as-you-go-Tarif laut Dashboard nicht enthalten |
| O-12 | Modul der Standardvertragsklauseln mit Vapi für die eigene Rufnummer klären (vermutlich Modul 2, Verantwortlicher → Auftragsverarbeiter; AVV Anlage B nennt bislang nur Modul 3) | Max | offen |
| O-13 | Klären, über wessen OpenAI-Konto der Assistent läuft (eigenes NexAI-Konto oder Vapis Konto); davon hängen Vertragsgrundlage, Speicherdauer und O-6 ab | Max | offen |
| O-14 | Klären, ob ElevenLabs (Modell `eleven_turbo_v2_5` hinter der Vapi-Stimme „Sid") Unterauftragsverarbeiter von Vapi ist; der AVV-Tracker sagt bislang, „Sid" sei eine Vapi-eigene Stimme ohne dritten Empfänger | Max | offen |
| O-15 | Telefonanlage: echte Anrufernummer an Vapi übergeben — Neubewertung erledigt (9.1); Aufbewahrungsgrenze für `Master.csv` | Max (Skript) | **bewertet 18.10.2026; Skript vorbereitet, Ausführung und Testanruf offen** |
| O-16 | Folgedokumente angleichen: TIA Vapi (Zusammenfassung Nr. 1, 1.2 Speicherung beim Importeur, 3.3 CLOUD Act, M-1, M-3, Ergebnis), TIA OpenAI (Abgrenzung „bei Vapi entsteht kein Bestand"), OpenAI-Antraege-EU-Region-und-ZDR.md, VVT A6 (Empfänger, Löschfristen, Verweis „Nr. 9"), AVV-Tracker (Google-Kalender, ElevenLabs), Datenschutzerklärung (Kontakte im CRM, ElevenLabs); Aufbewahrung der n8n-Ausführungsprotokolle erheben | NexAI | offen |
| O-17 | **Website-Chat (VVT A4)** fällt ebenfalls unter DSK-Muss-Liste Nr. 11 („System, welches mit Kunden durch Konversation interagiert", Prüfvermerk 1.2). Er ist in dieser Fassung **nicht** bewertet. Entweder hier aufnehmen — Art. 35 Abs. 1 Satz 2 DSGVO: „Für die Untersuchung mehrerer ähnlicher Verarbeitungsvorgänge mit ähnlich hohen Risiken kann eine einzige Abschätzung vorgenommen werden." — oder gesondert bewerten. Unterschiede: kein Telefon und kein Vapi, dafür OpenAI über n8n und Chatverläufe (6 Monate laut Datenschutzerklärung Abschnitt 9) | NexAI | **offen** |

**Wiedervorlage:** jährlich, erstmals **September 2027** — sowie unverzüglich bei Eintritt eines Auslösers aus Abschnitt 9 und nach Erledigung von O-8 und O-9 (Bedingungen der Bewertung in Abschnitt 8). Die Drittland-Bewertungen sind unabhängig davon **vor dem 17.03.2027** zu erneuern.

---

## Quellen

- Liste der Verarbeitungstätigkeiten, für die eine Datenschutz-Folgenabschätzung durchzuführen ist (DSK-Muss-Liste, Version 1.1), Nr. 11 — veröffentlicht unter anderem durch das [Bayerische Landesamt für Datenschutzaufsicht](https://www.lda.bayern.de/media/dsfa_muss_liste_dsk_de.pdf) und die [LDI Nordrhein-Westfalen](https://www.ldi.nrw.de/system/files/media/document/file/dsk_dsfa_muss-liste_version_1_1_deutsch_4.pdf)
- Artikel-29-Datenschutzgruppe, Leitlinien zur Datenschutz-Folgenabschätzung, WP 248 rev.01
- [DSGVO](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:02016R0679-20160504), Art. 35 Abs. 2 und 11, Art. 36, Art. 37 Abs. 6 und 7, Art. 38 Abs. 6, Art. 39 Abs. 1 lit. c — konsolidierte Fassung vom 04.05.2016, Wortlaut abgerufen am 17.10.2026
- [§ 38 BDSG](https://www.gesetze-im-internet.de/bdsg_2018/__38.html) — Datenschutzbeauftragte nichtöffentlicher Stellen
- BAG, Urteil vom 06.06.2023 – 9 AZR 383/19 (ECLI:DE:BAG:2023:060623.U.9AZR383.19.0), Rn. 22 f. — Interessenkonflikt des Datenschutzbeauftragten
- EuGH, Urteil vom 09.02.2023 – C-453/21 (X-FAB Dresden), ECLI:EU:C:2023:79, Rn. 44–46 — [EUR-Lex](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:62021CJ0453)
- Vapi-Dokumentation, abgerufen 17.10.2026: [Call recording / artifactPlan.loggingEnabled](https://docs.vapi.ai/assistants/call-recording), [Logs](https://docs.vapi.ai/observability/logs/overview), [Preise](https://vapi.ai/pricing)
- DSK, Orientierungshilfe Künstliche Intelligenz und Datenschutz (Mai 2024)
- Eigene Erhebung 17.10.2026: Vapi-Assistent und Anrufdatensätze, Vapi-Dashboard (Tarif), Telefonanlage, n8n-Werkzeuge, CRM-Löschregeln; Datenschutzerklärung (messages/de/legal.json, Abschnitte 4, 10 und 11, Stand origin/main 17.10.2026)
