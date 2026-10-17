# Datenschutz-Baustein für Kunden: KI-Telefonassistent

> **Stand 17.10.2026 (Rechtsprüfung Welle 1, D-06).** Das ist ein Baustein für die Datenschutzerklärung **unserer Kunden**
> (der Kunde ist Verantwortlicher, NexAI Auftragsverarbeiter). NexAIs eigene Datenschutzerklärung steht in
> `messages/*/legal.json` und ist dort bereits aktuell. Platzhalter in [eckigen Klammern] je Kunde ausfüllen.
>
> **Pflichten des Kunden, die wir im Verkauf offen ansprechen:** Ein KI-Agent, der mit Kunden durch Konversation
> interagiert, steht auf der Muss-Liste der Datenschutzkonferenz (Nr. 11) → der Kunde muss eine
> Datenschutz-Folgenabschätzung machen (Art. 35 Abs. 4 DSGVO) und deshalb einen Datenschutzbeauftragten benennen
> (§ 38 Abs. 1 Satz 2 BDSG, unabhängig von der Mitarbeiterzahl). NexAI liefert dafür den DSFA-Baustein
> (`compliance/DSFA-Voice-Agent.md`, Abschnitt 7).

## KI-Telefonassistent

Rufen Sie unter [Rufnummer] an, nimmt ein KI-gestützter Telefonassistent den Anruf an; er sagt Ihnen das zu Beginn. Möchten Sie lieber einen Menschen sprechen, sagen Sie es.

Verarbeitet werden Ihre Rufnummer (sofern übermittelt), Zeitpunkt und Dauer des Anrufs, der Gesprächsinhalt, soweit zur Bearbeitung nötig, und Ihre Angaben (Name, Anliegen, Wunschtermin, ggf. E-Mail-Adresse).

Zweck: Bearbeitung Ihrer Anfrage und Terminvereinbarung (Art. 6 Abs. 1 lit. b DSGVO), im Übrigen unser berechtigtes Interesse an telefonischer Erreichbarkeit (Art. 6 Abs. 1 lit. f DSGVO). Bitte nennen Sie keine Gesundheitsdaten.

Das Gespräch wird nicht als Ton aufgezeichnet.

Auftragsverarbeiter (Art. 28 DSGVO) ist die NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt. Sie setzt ein: Vapi, Inc., San Francisco, USA (Gesprächssteuerung, Telefonie, Sprachausgabe); Soniox, Inc., Foster City, USA (Spracherkennung, Unterauftragsverarbeiter von Vapi); OpenAI Ireland Ltd., Dublin (Sprachmodell; Verarbeitung durch OpenAI, L.L.C., USA möglich); [easybell GmbH, Berlin (Telefonanschluss) — nur wenn so eingerichtet]; Hetzner Online GmbH, Gunzenhausen (Server in Deutschland für Automatisierung, CRM und Kundenportal); [Google Ireland Ltd., Dublin (Google Kalender und Gmail für Termin und Bestätigung) — nur wenn so eingerichtet].

Vapi, Soniox und OpenAI sind nicht nach dem EU-U.S. Data Privacy Framework zertifiziert; die Übermittlung in die USA stützt sich auf die EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO), eine Kopie erhalten Sie bei uns. [Google LLC ist nach dem Data Privacy Framework zertifiziert (Art. 45 DSGVO).]

Vapi speichert eine Anrufübersicht und ein technisches Protokoll des Gesprächsverlaufs zur Fehlersuche für rund 14 Tage. Termin- und Kontaktdaten löschen wir [X] Monate nach dem Termin, soweit keine Aufbewahrungspflichten bestehen.

Ihre Angaben sind freiwillig; ohne Name, Rufnummer und Wunschtermin können wir keinen Termin vereinbaren. Der Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO können Sie aus Gründen Ihrer besonderen Situation jederzeit widersprechen.

## Checkliste vor dem Livegang beim Kunden
- [ ] Begrüßung beginnt mit dem KI-Hinweis („Guten Tag, hier ist der KI-Assistent von [Firma] …“), Unterbrechen der Begrüßung aus (Art. 50 Abs. 1 und 5 KI-VO).
- [ ] Prompt: gibt sich nie als Mensch aus, bestätigt auf Nachfrage sofort, dass er eine KI ist.
- [ ] Aufzeichnung und Transkript in Vapi aus.
- [ ] AVV mit dem Kunden unterschrieben (Anlage B), Unterauftragsverarbeiter dort wie oben.
- [ ] Kunde hat DSFA und Datenschutzbeauftragten (siehe Kasten oben).
