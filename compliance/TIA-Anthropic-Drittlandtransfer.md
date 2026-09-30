# Transfer Impact Assessment (TIA) — Anthropic (USA)

**Verantwortlicher:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt
**Verarbeitung:** A20 E-Mail-Agent (Sichtung, Einstufung und Antwortentwürfe für die eigene geschäftliche Korrespondenz)
**Empfänger:** Anthropic PBC, San Francisco, USA — Claude API (Modelle Haiku 4.5 und Opus 5)
**Stand:** 28.09.2026 · **Methodik:** EDPB-Empfehlungen 01/2020, sechs Schritte

> ⚠️ **Kein Rechtsrat.** Vorlage zur Erfüllung der Rechenschaftspflicht (Art. 5 Abs. 2, Art. 44 ff. DSGVO). Vor Verwendung vom DSB/Anwalt prüfen lassen.

---

## 0. Ergebnis vorweg

Die Übermittlung ist auf Art. 46 Abs. 2 lit. c DSGVO (Standardvertragsklauseln) zu stützen, **nicht** auf einen Angemessenheitsbeschluss: Anthropic war am 28.09.2026 in der Teilnehmerliste des EU-US Data Privacy Framework **nicht auffindbar**. Damit liegt derselbe Fall vor wie bei OpenAI (geprüft 06.09.2026), und nicht der von Resend.

Ein **Restrisiko bleibt und ist nicht wegzuverhandeln**: Der Inhalt geschäftlicher E-Mails einschließlich vollständiger Anhänge wird im Klartext in den USA verarbeitet. Das ist der vom EDPB in Empfehlung 01/2020 beschriebene **Fall 6** (Cloud-Verarbeitung im Klartext), für den es nach eigener Aussage des EDPB **keine wirksame technische Ergänzungsmaßnahme** gibt. Der einzige Weg, dieses Restrisiko wirklich zu beseitigen, ist der Umstieg auf einen Verarbeitungsort in der EU (siehe Schritt 4.3).

---

## Schritt 1 — Die Übermittlung kennen

### 1.1 Wo Anthropic eingesetzt wird

| Stelle | Modell | Was übermittelt wird |
|---|---|---|
| Einstufung jeder eingehenden Nachricht | Haiku 4.5 | Absender, Betreff, Datum, Nachrichtentext (gekürzt auf 12.000 Zeichen), **PDF- und Textanhänge vollständig** (bis 20 MB je Nachricht) |
| Zusammenfassung verlinkter Seiten | Haiku 4.5 | Adresse und Textinhalt der aufgerufenen Seite, kein Postfachinhalt |
| Antwortentwurf | Opus 5 (umschaltbar Sonnet 5) | Gesprächsverlauf des Threads (bis 20 Nachrichten, je bis 6.000 Zeichen), Faktenverzeichnis, Stilprofil |
| Antwort aus dem Archiv | Haiku 4.5 | die gefundenen Ausschnitte, höchstens zehn |

Nicht übermittelt werden: Bilder und Office-Dateien aus Anhängen (werden nur beim Namen genannt), zitierte Teile älterer Nachrichten im Stilprofil, sowie alles aus Nachrichten, die als Werbung oder als betrugsverdächtig eingestuft sind, soweit es um das Öffnen von Links geht.

**Keine Übermittlung an Anthropic** findet statt bei: Volltextsuche im Archiv (läuft lokal), Betrugsprüfung (läuft als Code), Abfrage freier Termine bei NexTime (enthält keine Personendaten), Labeln und Archivieren im Postfach.

### 1.2 Datenlandkarte

- **Betroffene:** Absender und Empfänger der Korrespondenz — Kunden, Interessenten, Partner, Bewerber, Dienstleister, Behörden; mittelbar Dritte, die in Texten oder Anhängen vorkommen.
- **Datenarten:** Kontaktdaten, Inhalt der Korrespondenz, Vertrags- und Rechnungsangaben, Bewerbungsunterlagen.
- **Besondere Kategorien (Art. 9) sind nicht ausgeschlossen.** Wer Max eine Arbeitsunfähigkeitsbescheinigung, eine Schwerbehindertenangabe oder Ähnliches schickt, dessen Anhang geht vollständig mit. Der Agent kann das nicht zuverlässig vorher erkennen. Das ist die gravierendste Eigenschaft dieser Verarbeitung.
- **Häufigkeit:** vier Läufe je Werktag, etwa 20 bis 40 Nachrichten täglich.
- **Weiterleitung:** Anthropic setzt Unterauftragsverarbeiter ein (Cloud-Infrastruktur). Maßgeblich ist die jeweils gültige Liste im DPA.

---

## Schritt 2 — Übermittlungswerkzeug

**Art. 46 Abs. 2 lit. c DSGVO**, Standardvertragsklauseln (Durchführungsbeschluss (EU) 2021/914), Modul 2 (Verantwortlicher an Auftragsverarbeiter), über den Data Processing Addendum von Anthropic.

**Zu erledigen:** Der DPA ist von NexAI noch abzuschließen und abzulegen; ohne ihn fehlt das Übermittlungswerkzeug und die Verarbeitung ist nicht zulässig.

---

## Schritt 3 — Rechtslage im Bestimmungsland

Unverändert gegenüber der OpenAI-Bewertung vom 06.09.2026:

- **FISA 702** verpflichtet US-Anbieter elektronischer Kommunikationsdienste zur Herausgabe. Die Befugnis wirkt trotz des Auslaufens der Verlängerung nach der Übergangsregelung **bis zum 17.03.2027** fort; laufende Anordnungen gelten darüber hinaus.
- **Executive Order 12333** erlaubt Zugriffe auf Datenverkehr außerhalb der USA ohne richterliche Kontrolle.
- **CLOUD Act** erstreckt Herausgabepflichten auf Daten außerhalb der USA, soweit der Anbieter sie kontrolliert.
- Der Rechtsschutz für Betroffene aus der EU bleibt gegenüber dem Schrems-II-Stand eingeschränkt; das Data Protection Review Court steht Anthropic-Kunden nur offen, soweit der DPF-Rahmen greift, und das tut er hier nicht.

**Praktische Einordnung:** NexAI ist kein naheliegendes Ziel nachrichtendienstlicher Anordnungen. Das senkt die Eintrittswahrscheinlichkeit, ändert aber nichts an der Rechtslage.

---

## Schritt 4 — Ergänzende Maßnahmen

### 4.1 Kein technischer Ausweg im Kern

Das Modell muss den Klartext lesen, um einzustufen und zu antworten. Verschlüsselung während der Verarbeitung, Pseudonymisierung oder Aufteilung auf mehrere Anbieter scheitern daran, dass gerade der Inhalt der Zweck ist. EDPB Fall 6 ohne Lösung.

### 4.2 Vorhandene Maßnahmen

- **Datenminimierung:** Nachrichtentext auf 12.000 Zeichen gekürzt, Thread auf 20 Nachrichten, Archivantworten auf zehn Ausschnitte. Bilder und Office-Dateien gehen nicht mit.
- **Kein Training auf API-Daten** nach den Geschäftsbedingungen von Anthropic für die API.
- **Verschlüsselung im Transport** (TLS) und **der lokalen Ablage** (SQLCipher, Schlüssel im macOS-Schlüsselbund, Verzeichnis 700, Datei 600).
- **Keine Übermittlung ohne Anlass:** Werbung wird eingestuft wie alles andere, aber es entsteht kein Entwurf und es werden keine Links geöffnet.
- **Betroffenenrechte technisch umgesetzt:** `npm run cli auskunft <adresse>` listet alles Gespeicherte, `npm run cli vergessen <adresse> --wirklich` löscht es samt Suchindex.

### 4.3 Verfügbar, aber nicht genutzt — hier liegt der Handlungsbedarf

**Der Verarbeitungsort ließe sich in die EU verlegen.** Anthropic bietet die Modelle über Amazon Bedrock in `eu-central-1` (Frankfurt) an. Über die Claude API selbst ist das nicht erreichbar: der Parameter `inference_geo` kennt nur `us` und `global`, der Speicherort bleibt die USA. Ein Wechsel auf Bedrock Frankfurt würde die Drittlandübermittlung für den Kern der Verarbeitung **beseitigen** und damit dieses TIA weitgehend gegenstandslos machen.

Das ist derselbe Weg, der für den NexAI Builder bereits als Umschalter vorgesehen ist. Aufwand: ein anderer Client im Code (`AnthropicBedrockMantle` statt `Anthropic`), ein AWS-Konto, ein eigener Auftragsverarbeitungsvertrag mit AWS.

**Empfehlung:** Solange das private und das geschäftliche Postfach gemeinsam verarbeitet werden und Anhänge vollständig mitgehen, ist der Umstieg auf Frankfurt die einzige Maßnahme, die das Restrisiko wirklich senkt statt es nur zu dokumentieren.

### 4.4 Bekannte Lücken

1. **DPA mit Anthropic fehlt noch.**
2. **Art.-9-Daten sind nicht ausgeschlossen** und gehen in die USA, sobald jemand sie schickt.
3. **Das private Postfach** wird mitverarbeitet. Für sich genommen fiele es unter Art. 2 Abs. 2 lit. c, im gemeinsamen System wird es nach dem strengeren Maßstab behandelt.
4. **Keine Löschfrist** für die lokale Kopie (bewusste Entscheidung, siehe A20).

---

## Schritt 5 — Verfahrensschritte

- DPA abschließen und ablegen.
- Eintrag A20 im Verarbeitungsverzeichnis führen (erledigt).
- Datenschutzerklärung: Der Agent verarbeitet Korrespondenz, die aus der Website und aus Formularen entsteht. Der Hinweis auf die Verarbeitung durch ein US-Sprachmodell gehört dorthin, wo diese Korrespondenz angebahnt wird.
- Bei automatischem Versand an Adressen der Freigabeliste: Kennzeichnung nach Art. 50 AI Act prüfen (siehe A20).

---

## Schritt 6 — Neubewertung

Anlassbezogen, spätestens jährlich. Auslöser: Entscheidung über Bedrock Frankfurt, Änderung des DPF-Status von Anthropic, Ablauf der FISA-702-Übergangsregelung am 17.03.2027, neue EuGH-Rechtsprechung, Änderung der Modellauswahl.

---

## Ergebnis und Restrisiko

Die Übermittlung ist mit Standardvertragsklauseln, den Maßnahmen aus 4.2 und dem benannten Restrisiko **vertretbar, aber nicht risikofrei**. Der Kern (Klartextverarbeitung in den USA) bleibt ungelöst, solange nicht auf Frankfurt umgestellt wird.

**Nicht behauptet wird:** dass die Maßnahmen den Zugriff nach FISA 702 verhindern. Sie tun es nicht.

---

## Offene Punkte

| Punkt | Wer | Bis wann |
|---|---|---|
| DPF-Status im Register selbst prüfen (nicht über Suchmaschinen) | Max | vor Produktivbetrieb |
| DPA mit Anthropic abschließen | Max | vor Produktivbetrieb |
| Entscheidung Bedrock Frankfurt | Max | offen |
| Anwaltliche Prüfung dieses Dokuments | Max | offen |

## Quellen

- EDPB, Empfehlungen 01/2020 zu ergänzenden Maßnahmen, Fassung 2.0
- Durchführungsbeschluss (EU) 2021/914 (Standardvertragsklauseln)
- Data Privacy Framework, Teilnehmerliste — Recherche 28.09.2026, Anthropic nicht auffindbar
- Anthropic, Nutzungsbedingungen und Datenschutzhinweise für die API
- eigene Prüfung des Parameters `inference_geo` (nur `us`/`global`; EU-Verarbeitung nur über Bedrock `eu-central-1`)
