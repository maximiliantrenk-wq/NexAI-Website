# Verzeichnis von Verarbeitungstätigkeiten (Art. 30 DSGVO)

**Verantwortlicher / Auftragsverarbeiter:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Gesellschafter: Maximilian Trenk, Jason Brian Merklein · Kontakt Datenschutz: mbt@nex-a-i.com
**Stand:** September 2026 · **Aufsichtsbehörde:** LfDI Baden-Württemberg
**Drittland-Folgenabschätzungen** liegen vor: [Vapi](TIA-Vapi-Drittlandtransfer.md) (deckt Soniox mit ab) · [OpenAI](TIA-OpenAI-Drittlandtransfer.md) · [Anthropic](TIA-Anthropic-Drittlandtransfer.md) · [Resend](TIA-Resend-Drittlandtransfer.md) — für Resend greift Art. 45 (DPF), die SCC-Bewertung liegt als Rückfall bei.

> ⚠️ **Kein Rechtsrat.** Vorlage zur Erfüllung der Rechenschaftspflicht (Art. 5 Abs. 2, Art. 30 DSGVO). Laufend fortschreiben; vor Verwendung vom DSB/Anwalt prüfen lassen. Löschfristen = interne Defaults, mit der Datenschutzerklärung abgeglichen.

Empfänger-Kürzel (Drittland-Mechanismus): **Resend** (US, **DPF** — hilfsweise SCC) · **Google** IE/US (DPF/SCC) · **OpenAI** IE/US (**SCC, nicht DPF-zertifiziert** — Prüfung 06.09.2026; No-Training) · **Vapi** (US, SCC+TIA — Orchestrierung **und** Sprachsynthese) · **Soniox** (US, STT, Unterauftragsverarbeiter von Vapi, SCC+TIA über den Vapi-DPA) · **easybell** (DE) · **Hetzner** (DE, Server der **Website**, der self-hosted n8n **und des NexAI-CRM**) · **NexAI-CRM** (self-hosted, DE — eigene zentrale Kundenverwaltung, keine Drittlandübermittlung) · **Anthropic** (US, Sprachmodell des E-Mail-Agenten, **SCC, nicht DPF-auffindbar** — Prüfung 28.09.2026) · **Explorium** (Datenprovider) · **Web-Push-Infrastruktur** der Browserhersteller (Google/Apple/Mozilla, i. d. R. US — nur Endpunkt und Benachrichtigungsinhalt, siehe A11).

---

## Teil A — Als Verantwortlicher (Art. 30 Abs. 1)

### A1 Bereitstellung der Website / Server-Logs
- **Zweck:** Auslieferung und Sicherheit der Website. **Betroffene:** Websitebesucher. **Daten:** IP-Adresse, Zeitpunkt, angeforderte Inhalte, Referrer, Browser.
- **Rechtsgrundlage:** Art. 6(1)f. **Empfänger:** Hetzner (DE). **Drittland:** keine (Server in Deutschland). **Löschung:** 30 Tage. **TOMs:** siehe AVV Anhang 1.

### A2 Kontakt- und Partnerformular / E-Mail
- **Zweck:** Bearbeitung von Anfragen und Partneranfragen. **Betroffene:** Interessenten, Partner. **Daten:** Name, E-Mail, Unternehmen, Website, Nachricht.
- **Rechtsgrundlage:** Art. 6(1)b/f. **Empfänger:** Resend (Versand), Postfach mbt@nex-a-i.com (Google Workspace), **NexAI-CRM (self-hosted DE)** (Speicherung Anfrage/Kontakt). **Drittland:** USA (SCC); CRM = EU. **Löschung:** nach Bearbeitung.

### A3 Newsletter
- **Zweck:** Versand von Informationen zu Leistungen. **Betroffene:** Abonnenten. **Daten:** E-Mail-Adresse, Opt-in-Nachweis (Zeit/IP).
- **Rechtsgrundlage:** Art. 6(1)a (Double-Opt-In). **Empfänger:** Resend. **Drittland:** USA (SCC). **Löschung:** bis Widerruf.

### A4 Website-Chat-Assistent
- **Zweck:** Beantwortung von Anfragen, Terminvereinbarung. **Betroffene:** Chat-Nutzer. **Daten:** Nachrichteninhalte, freiwillige Kontaktdaten (Name/E-Mail/Telefon), Anliegen; Session-Kennung + Verlauf im Browser-sessionStorage.
- **Rechtsgrundlage:** Art. 6(1)b/f. **Empfänger:** n8n@Hetzner, **NexAI-CRM (self-hosted DE)** (Lead-/Kontaktspeicher), OpenAI (LLM), Google (Calendar). **Drittland:** IE/US (DPF/SCC); Automatisierung + CRM = EU. **Löschung:** Chatverläufe 6 Monate; Leads 6 Monate. **Besonderheit:** KI-Hinweis (Art. 50 AI Act) gegeben; kein Training.

### A5 Online-Terminbuchung
- **Zweck:** Vereinbarung von Beratungsterminen. **Betroffene:** Terminbucher. **Daten:** Name, E-Mail, Zeitpunkt, Anlass.
- **Rechtsgrundlage:** Art. 6(1)b. **Empfänger:** n8n@Hetzner, **NexAI-CRM (self-hosted DE)** (Termin-/Kontaktspeicher), Google Calendar; Resend (interne Notiz). **Drittland:** IE/US (DPF/SCC); CRM = EU. **Löschung:** 12 Monate.

### A6 KI-Telefon-/Sprachassistent (eigene Nummer/Demo)
- **Zweck:** Terminvereinbarung/Erreichbarkeit per Telefon. **Betroffene:** Anrufer. **Daten:** Rufnummer, Name, Anliegen, Wunschtermin, ggf. E-Mail, Verbindungsdaten.
- **Rechtsgrundlage:** Art. 6(1)b/f. **Empfänger:** Vapi (Orchestrierung + TTS), Soniox (STT, via Vapi), OpenAI (LLM), easybell, n8n@Hetzner, **NexAI-CRM (self-hosted DE)** (Anruf-/Termin-/Kontaktspeicher), Google. **Drittland:** USA (SCC+TIA), IE/US (DPF/SCC); CRM = EU. **Löschung:** Termindaten 6 Monate; **keine Anrufaufzeichnung** (in Vapi deaktiviert). **Besonderheit:** KI-Ansage zu Gesprächsbeginn (Art. 50 AI Act); **DSFA liegt vor** ([`DSFA-Voice-Agent.md`](DSFA-Voice-Agent.md), 07.09.2026 — die Verarbeitung steht auf der Muss-Liste der Aufsichtsbehörden, Nr. 9). Daraus folgt die **Benennungspflicht für einen Datenschutzbeauftragten** nach § 38 Abs. 1 Satz 2 BDSG.

### A7 Neukundengewinnung / Lead-Recherche (Vertrieb)
- **Zweck:** Akquise/B2B-Ansprache. **Betroffene:** Entscheider/Ansprechpartner potenzieller Kunden. **Daten:** Name, Funktion, Firma, geschäftliche E-Mail/Telefon, Quelle.
- **Rechtsgrundlage:** Art. 6(1)f (Interessenabwägung); **§ 7 UWG** für E-Mail-Werbung beachten. **Quelle/Empfänger:** Explorium (Datenprovider), Google Sheets/CRM. **Drittland:** je Anbieter. **Pflichten:** **Art. 14 Informationspflicht** gegenüber Prospects; Opt-out-Register. **Löschung:** 6 Monate ohne Reaktion.

### A8 Kunden-/Vertrags- und Rechnungsverwaltung
- **Zweck:** Vertragsanbahnung/-durchführung, Buchhaltung. **Betroffene:** Kunden/Ansprechpartner. **Daten:** Stammdaten, Vertrags-/Zahlungsdaten (SEPA), Kommunikation.
- **Rechtsgrundlage:** Art. 6(1)b; Art. 6(1)c (steuer-/handelsrechtlich). **Empfänger:** Google Workspace, ggf. Steuerberater/Bank. **Löschung:** gesetzliche Fristen (§147 AO 8/10 Jahre, §257 HGB).

---

### A9 Bewerbungen Vertriebspartner (Setter/Closer)
- **Zweck:** Gewinnung und Auswahl selbstständiger Vertriebspartner, Anbahnung eines Vertriebspartnervertrags, Auswertung der Bewerbungskanäle. **Betroffene:** Bewerber (Selbstständige). **Daten:** Name, E-Mail, Telefon, gewünschte Rolle, Vertriebserfahrung, Verfügbarkeit, optional Profil-Link/Nachricht, Sprache, Zeitpunkt; Herkunft des Seitenaufrufs (ref/UTM, Einstiegsseite, Referrer-Domain; sessionStorage, kein Cookie); IP kurzzeitig im RAM (Ratenlimit).
- **Rechtsgrundlage:** Art. 6(1)b (Anbahnung), Art. 6(1)f (Kanalauswertung, Missbrauchsschutz). **Empfänger:** Resend (Eingangsbestätigung + interne Mail, US/DPF), **NexAI-CRM (self-hosted DE)** (`source = website-vertriebspartner`), bei Terminbuchung A5, nach Vertragsschluss Partner-Portal app.nex-a-i.com. **Drittland:** US (DPF/SCC) nur Resend. **Löschung:** 6 Monate nach Abschluss des Verfahrens (§ 15 Abs. 4 AGG, § 6 Abs. 3 AGG); bei Vertragsschluss Übergang in A8. **Besonderheit:** keine automatisierte Entscheidung, kein AI-Scoring; DSE Abschnitt 12.

### A10 NexAI Study — privater Lernbereich im Portal
- **Zweck:** Bereitstellung eines persönlichen KI-Lernassistenten für **eine einzelne private Nutzerin** im Portal (app.nex-a-i.com, Zweig `/study`): Aufbereitung selbst hochgeladener Lernunterlagen zu Lernfassungen, Vorlesen, Abfragen, Fortschrittsmessung. Kein geschäftlicher Zweck, keine Verbindung zu Kunden-, Lead- oder CRM-Daten.
- **Betroffene:** die Nutzerin selbst; **mittelbar Dritte**, die in hochgeladenen Unterlagen namentlich vorkommen können.
- **Daten:** Konto (Name, E-Mail, Passwort-Hash, letzte Anmeldung); **hochgeladene Dateien** (PDF, Word, PowerPoint, Text, Markdown, Bilder bis 50 MB; Original bleibt unverändert); **daraus erzeugt**: ausgelesener Text, Gliederung, sechs Lernfassungen, Sprachaufnahmen, Karteikarten, Prüfungsfragen, Antworten samt Bewertung, Lernchat, Markierungen; Sicherheitsprotokoll (nur die **Tatsache** der Anmeldung, keine Lerninhalte).
- **Rechtsgrundlage:** Art. 6(1)b (Nutzungsverhältnis) — *anwaltlich zu bestätigen, siehe Pflegehinweise*. **Empfänger:** **Hetzner** (DE, Server — Konto, Dateien, Aufnahmen, erzeugte Inhalte); **OpenAI Ireland Ltd** (Sprachmodell, Abschreiben von Scans/Fotos, Sprachsynthese), Verarbeitung durch OpenAI L.L.C. (US) möglich. **Drittland:** USA über OpenAI → **Art. 46 SCC** (OpenAI ist **nicht** DPF-zertifiziert, geprüft 06.09.2026) → [TIA](TIA-OpenAI-Drittlandtransfer.md). **Löschung:** **keine Frist** — Löschung durch die Nutzerin oder mit dem Konto; dann Datensätze **und** Dateien.
- **Besonderheiten:**
  - **Art. 9 nicht ausgeschlossen.** Die Nutzerin lädt beliebige Unterlagen hoch; Gesundheits- oder andere besondere Daten sind technisch nicht verhindert. Sie verlassen in diesem Fall mit der Verarbeitung die EU. Einziger Schutz ist der Hinweis in der Datenschutzerklärung.
  - **Nur Scans und Fotos gehen als Bild an das Modell.** Reine Textformate (PDF mit Textebene, Word, PowerPoint, Text, Markdown) werden auf dem eigenen Server ausgelesen und nicht übermittelt.
  - **Kein Training** auf den über die Schnittstelle übermittelten Daten.
  - **Trennung zum Geschäftsbetrieb:** eigener Routenbaum, eigene Rolle `privat`, jede Tabelle mit `owner_user_id`. Geschäftskonten erreichen den Lernbereich nicht, das `privat`-Konto keinen Geschäftsbereich. **Ehrliche Grenze:** ein Portal-Admin kann das Passwort zurücksetzen und sich damit anmelden — Vertraulichkeit *gegen* den Betreiber besteht nicht.
  - **Keine automatisierte Entscheidung** im Sinne von Art. 22; Bewertungen im Prüfungstraining haben keine rechtliche Wirkung.
  - **Datenschutzhinweis liegt als Entwurf vor** (`nexai-portal/docs/datenschutz-study-ENTWURF.md`), ist **noch nicht veröffentlicht**.

---

---

### A20 E-Mail-Agent (eigene Korrespondenz)
- **Zweck:** Sichtung, Einstufung und Betrugspruefung der eigenen geschaeftlichen E-Mail, Antwortentwuerfe zur Freigabe, Erinnerung an unbeantwortete Nachrichten, Durchsuchbarkeit des eigenen Archivs, Erkennen von Rechnungen und Mahnungen mit Frist. **Stand 03.10.2026 ist der Agent zugleich ein Produkt** (Website seit 30.09.2026); dieser Eintrag betrifft ausschliesslich die eigene Korrespondenz von NexAI, bei der NexAI Verantwortlicher ist. Beim Einsatz bei einem Kunden ist NexAI Auftragsverarbeiter, Grundlage ist Anlage B des Vertragswerks.
- **Betroffene:** Absender und Empfaenger der Korrespondenz (Kunden, Interessenten, Partner, Bewerber, Dienstleister, Behoerden); **mittelbar Dritte**, die in Texten oder Anhaengen vorkommen.
- **Daten:** Kopfdaten (Absender, Empfaenger, Kopie, Betreff, Zeitpunkt, Pruefergebnisse des Empfangsservers), **vollstaendiger Nachrichtentext**, **Anhaenge vollstaendig**; daraus erzeugt: Einstufung, Kurzfassung, erkannte Fristen, Betrugsbewertung, Antwortentwuerfe, Rueckfragen, Zusammenfassungen verlinkter Seiten, Stilprofil aus eigenen gesendeten Nachrichten.
- **Rechtsgrundlage:** Art. 6(1)f (Organisation der eigenen Korrespondenz, Schutz vor Betrugsversuchen); bei Vertragskorrespondenz zusaetzlich Art. 6(1)b; bei Bewerbungen Art. 6(1)b i. V. m. § 26 BDSG.
- **Empfaenger:** **Anthropic PBC** (US, Sprachmodell: Einstufung, Entwuerfe, Linkzusammenfassungen); **Google Workspace** (Postfaecher, ohnehin A2/A8); **NexAI-CRM (self-hosted DE)** nur nach ausdruecklicher Freigabe je Kontakt; **NexTime (DE)** nur Abfrage freier Zeiten, ohne Personenbezug. Verarbeitung und Speicherung sonst **auf einem eigenen Server bei Hetzner in Deutschland** (seit dem Umzug Ende September 2026; vorher lokal auf dem Rechner von Maximilian Trenk).
- **Drittland:** USA ueber Anthropic → **Art. 46 SCC** (Anthropic war am 28.09.2026 in der DPF-Teilnehmerliste **nicht auffindbar**, also wie OpenAI kein Art. 45) → [TIA](TIA-Anthropic-Drittlandtransfer.md).
- **Loeschung:** seit dem 03.10.2026 gibt es Regelfristen, vorher gab es keine. Vorgabe sind **180 Tage** fuer Nachrichten samt allem, was daran haengt, **90 Tage** fuer Anhaenge und fuer nicht gesendete Entwuerfe, **1.095 Tage** fuer den Wortlaut im Freigabeprotokoll (die Protokollzeile und ihre Pruefsumme bleiben als Nachweis). Die Fristen stehen je Mandant in der Einrichtungsdatei und werden von einem taeglichen Loeschlauf durchgesetzt; der Lauf steht zunaechst auf **Probe** und zaehlt nur, damit die Zahlen einige Wochen beobachtet werden koennen, bevor wirklich geloescht wird. Unabhaengig davon wird auf Verlangen einer betroffenen Person oder auf Entscheidung des Verantwortlichen geloescht, ueber die Oberflaeche im Bereich Datenschutz oder ueber `npm run cli vergessen <adresse> --wirklich`. Auskunft nach Art. 15 ebenfalls ueber die Oberflaeche oder `npm run cli auskunft <adresse>`; jede Loeschung auf Verlangen wird im Freigabeprotokoll mit Zahlen festgehalten.
- **TOMs:** verschluesselte Datenbank (SQLCipher, Schluessel im Systemschluesselbund bzw. in einer nur fuer root lesbaren Datei), Verzeichnis 700 / Datei 600, Postfachzugang ueber App-Passwoerter, Oberflaeche nur mit Zugangstoken je Person, Nachrichteninhalt wird nie als HTML dargestellt und laedt nichts nach, Anhaenge nur in einem abgeschotteten Rahmen ohne Zugriff auf Token und Schnittstellen. Dazu seit Oktober 2026: ein Riegel an genau einer Stelle, der jede Abfrage auf die Postfaecher der zugreifenden Person einschraenkt; ein angehaengtes Freigabeprotokoll, dessen Zeilen durch Pruefsummen verkettet sind; ein Vier-Augen-Prinzip fuer teure oder bindende Entwuerfe; ein Kostendeckel.
- **Besonderheiten:**
  - **Art. 9 ist nicht ausgeschlossen.** Anhaenge gehen vollstaendig an das Modell. Schickt jemand eine Arbeitsunfaehigkeitsbescheinigung oder Vergleichbares, verlassen diese Daten mit der Einstufung die EU. Der Agent kann das vorher nicht zuverlaessig erkennen. **Einzige wirksame Abhilfe waere der Verarbeitungsort Frankfurt** (TIA Schritt 4.3).
  - **Zwei Postfaecher, eines privat.** Das private fiele fuer sich unter Art. 2 Abs. 2 lit. c; da es im selben System verarbeitet wird, wird es nach dem strengeren Massstab behandelt.
  - **Nichts wird ohne Freigabe versendet.** Automatischer Versand nur an Adressen einer selbst gepflegten Freigabeliste und nur bei Entwuerfen ohne offene Luecke und ohne Warnung. Die Liste ist derzeit leer.
  - **Art. 50 AI Act, offener Punkt:** Sobald tatsaechlich automatisch versendet wird, geht Text an einen Menschen, der von einem KI-System stammt. Ob das eine Kennzeichnungspflicht ausloest, ist vor der ersten Nutzung der Freigabeliste zu klaeren. Solange jeder Entwurf einzeln freigegeben wird, ist Max der Absender.
  - **Links aus Nachrichten** werden nur aus unverdaechtigen, nicht werblichen Nachrichten abgerufen, nie aus dem eigenen Netz, ohne Cookies und ohne Anmeldung; Tracking- und Abmeldelinks nie.
  - **Keine automatisierte Entscheidung** im Sinne von Art. 22: Einstufungen steuern nur die Anzeige, jede Aussenwirkung haengt an einer Freigabe.

## Portal app.nex-a-i.com und NexSign (A11–A19, A21, A23, A24)

*Selbst betriebene PWA auf dem Hetzner-Server (DE), Postgres. Rollen: `admin`, `manager`, `vertriebsleiter`, `kommunikationsleiter`, `partner`, `empfehlungsgeber`, `customer`, `privat`. Grundlage der folgenden Einträge ist das Datenbankschema (`nexai-portal/db/schema.ts`, 40 Tabellen, Stand 06.09.2026), nicht eine Beschreibung. Der Lernbereich `privat` steht getrennt als **A10**.*

> ⚠️ **Übergreifende Lücke:** Das Portal hat **keine eigenen Datenschutzhinweise**, obwohl die Website-DSE für app.nex-a-i.com welche zusagt. Es gibt bislang nur den unveröffentlichten Entwurf für den Lernbereich. → offener Punkt.

### A11 Portal — Nutzerkonten, Zugang und Protokollierung
- **Zweck:** Anmeldung, Rechteverwaltung, Sicherheitsprotokoll, Systemmitteilungen, Push-Benachrichtigungen. **Betroffene:** Portalnutzer (Mitarbeitende, Vertriebspartner, Kunden, eine Privatperson). **Daten:** `users` (E-Mail, Passwort-Hash, Rolle, Name, Sprache, Rechte-Schlüssel, Profilbild, Akzentfarbe, Kalender-Abo-Kennung, letzte Anmeldung, Anlegender); `sessions` (Token-Hash, Ablauf); `audit_log` (handelnder Nutzer, Aktion, betroffener Datensatz, Zusatzangaben); `announcements`; `push_subscriptions` (Endpunkt, Schlüssel `p256dh`/`auth`); **`user_mfa`** (verschlüsseltes TOTP-Geheimnis, Bestätigungszeitpunkt, Wiederherstellungscodes), **`mfa_challenges`** (Token-Hash, Ablauf, Fehlversuche), **`account_tokens`** (Hash des Einmal-Links für Einladung und Passwortzurücksetzung).
- **Rechtsgrundlage:** Art. 6(1)b (Nutzungs-/Vertragsverhältnis), Art. 6(1)f (Protokollierung, Missbrauchsschutz). **Empfänger:** Hetzner (DE). **Für Web-Push zusätzlich die Push-Infrastruktur des jeweiligen Browserherstellers** (Google, Apple, Mozilla — i. d. R. **US**); übermittelt werden Endpunkt und Nachrichteninhalt der Benachrichtigung. **Drittland:** nur Web-Push (US). **Löschung:** Konto- und Push-Daten mit dem Konto (Push-Abo zusätzlich, sobald der Endpunkt ungültig wird); Sitzungen mit Ablauf; **Sicherheitsprotokoll 12 Monate** ab Eintrag — **Ausnahme: Protokollzeilen zu Rechnungen 9 Jahre** (`rechnungsSpurenMonate`, seit 10/2026 im Löschlauf). Eine Rechnung ist knapp 8 Jahre aufzubewahren (A14); der Beleg, **wer** sie wann freigegeben, als bezahlt markiert oder gelöscht hat, stand aber im 12-Monats-Protokoll und war damit sieben Jahre und zehn Monate zu früh weg. Eine aufbewahrungspflichtige Rechnung ohne ihre Änderungshistorie ist nur halb aufbewahrt. Der Personenbezug dieser Zeilen ist minimal: wer gehandelt hat, wann, und welche Rechnung es betraf. Mitteilungen 12 Monate nach Veröffentlichung.
- **Besonderheiten:** **Zwei-Faktor-Anmeldung vorhanden** (seit 08.09.2026): TOTP nach RFC 6238, **Pflicht für alle Rollen, die fremde Daten sehen** (`admin`, `manager`, `vertriebsleiter`, `kommunikationsleiter`), für die übrigen freiwillig. Das Geheimnis liegt verschlüsselt, die Wiederherstellungscodes ebenso. **Zugangsdaten gehen nicht mehr im Klartext per E-Mail**: neue Konten und Zurücksetzungen laufen über einen Einmal-Link, von dem nur der SHA-256-Hash gespeichert wird. Ein **Anmelde-Ratenlimit** besteht seit 12.08.2026 (Sperre je E-Mail plus IP-Deckel, greift vor der Datenbankabfrage).

### A12 Portal — Vertriebspartner: Stammdaten, Karrieresystem, Provisionen
- **Zweck:** Verwaltung selbstständiger Vertriebspartner, Abbildung des Karrieresystems, Berechnung und Nachverfolgung von Provisionen. **Betroffene:** Vertriebspartner (Setter, Closer, Vertriebs-/Kommunikationsleiter, Empfehlungsgeber). **Daten:** `partners` (Partnernummer, Name, Firma, E-Mail, Telefon, Anschrift, **Steuernummer/USt-IdNr., IBAN, BIC, Bankname**, Provisionssätze, Funktion und Stufe, Senior-Zeitraum, Beginn der Probezeit, zugeordneter Closer, CRM-Verweis); `commissions` (Zeitraum, Bemessungsgrundlage, Satz, erwarteter Betrag, Status); `documents` (Partnerunterlagen: Kategorie, Datei, Hochladender).
- **Rechtsgrundlage:** Art. 6(1)b (Vertriebspartnervertrag), Art. 6(1)c (steuer-/handelsrechtliche Pflichten). **Empfänger:** Hetzner (DE); Zahlungsdaten mittelbar Bank/Steuerberater. **Drittland:** keines. **Löschung:** mit Vertragsende, soweit keine gesetzlichen Fristen entgegenstehen; **Bankverbindung, sobald die letzte Provision abgerechnet und gezahlt ist**; Abrechnungsrelevantes über A14 (8 Jahre).
- **Besonderheiten:** **Bankverbindungen liegen im Portal.** Stufe, Senior-Status und Probezeit sind **leistungsbezogene Daten** über Selbstständige — kein Beschäftigtendatenschutz, aber erhöhte Sorgfalt. Die Upline-Beziehung (`closerPartnerId`) macht Leistung innerhalb der Struktur sichtbar.
- **Zeichnungsvollmachten für NexSign** (Portal-PR #39, geprüft an `940ee77`; Tabelle `vollmachten`, Migration 0074; gilt ab dem Merge):
  - **Zweck:** festhalten, wer für NexAI in NexSign unterschreiben darf, ab wann, in welcher Stufe und für welche Verträge; NexSign das je Unterschrift beantworten (A24); später nachweisen können, wer zum Zeitpunkt einer Unterschrift zeichnen durfte (§§ 164, 177 BGB).
  - **Betroffene:** Gesellschafter (Admin-Konto und Inhaber oder mit Kennzeichen `users.is_gesellschafter`), Vertriebsleitung (Rolle `vertriebsleiter`), Vertriebspartner mit Funktion Closer oder Setter + Closer (`lib/nexsign-befugnis.ts`, `stufePasst`).
  - **Daten:** je Erteilung eine eigene Zeile, Widerruf überschreibt nichts:
    - `user_id` (Konto-ID, **bewusst ohne Fremdschlüssel**: die Zeile überlebt die Kontolöschung als Nachweis), `stufe` (`gesellschafter` | `vertriebsleitung` | `closer`), `umfang` (Teilmenge von `kunde`, `vertriebspartner`, `nur_gesellschafter`)
    - `name` „Name laut Vollmacht“ (2–120 Zeichen), `grundlage` (Freitext bis 300 Zeichen; Formularhinweis: nur Vertragsart, Paragraph, Datum, keine Provisionsangaben), `datum` (gültig ab), `urkundennummer` (nur intern)
    - `einzelvertretung` (nur Gesellschafter, Ermächtigung nach § 720 Abs. 2 BGB), `nachtrag_am` (nur Vertriebsleitung: Tag, an dem der Vertriebsleitervertrag 3.0 von allen unterschrieben war; schaltet `nur_gesellschafter` frei)
    - `erteilt_von`, Ende `widerrufen_am`, `widerrufen_von`, `ende_grund` (`widerruf`, `abloesung`, `gesperrt`, `rolle`, `funktion`, `geloescht`), Zeitstempel
    - dazu `users.is_gesellschafter` und im Sicherheitsprotokoll (A11, 12 Monate) `vollmacht_erteilt` (Stufe, Umfang, gültig ab, ggf. Ende), `vollmacht_widerrufen`, `gesellschafter_gesetzt`/`gesellschafter_entfernt`
  - **Herkunft:** Die Gesellschafter tragen aus Vertrag bzw. Vollmachtsurkunde ein. Das Ende setzt das Portal selbst, in derselben Transaktion wie die auslösende Änderung: Konto gesperrt (`gesperrt`), Rolle oder Partner-Verknüpfung so geändert, dass die Stufe nicht mehr passt, oder Gesellschafter-Kennzeichen entfernt (`rolle`), Funktion so geändert (etwa Closer → Setter) oder Partner gelöscht (`funktion`), neue Erteilung (`abloesung`). Beim Löschen des Kontos (`geloescht`) setzt `deleteUser` das Ende erst nach dem Löschen und außerhalb dieser Transaktion (`app/actions/users.ts`); schlägt dieser Schritt fehl, bleibt die Zeile ohne Ende stehen und fällt nie unter `vollmachtJahre` (Nachbesserung an die Portal-Sitzung gemeldet: `beendeAlle` vor oder mit dem Löschen in einer Transaktion). Ein späteres Zurückstellen belebt nichts wieder.
  - **Rechtsgrundlage:** Closer und Vertriebsleitung Art. 6(1)b (Vertriebspartner- bzw. Vertriebsleitervertrag); Gesellschafter Art. 6(1)f (Nachweis der Vertretungsmacht gegenüber Vertragspartnern). Aufbewahrung nach dem Ende für alle Art. 6(1)f (Nachweis, wer zum Zeitpunkt einer Unterschrift zeichnen durfte).
  - **Empfänger:**
    - **NexSign** (A24, eigene App, derselbe Hetzner-Server DE). Abfrage `POST /api/nexsign/befugnis`, nur Server zu Server: Body `{sub, ts}`, Kopf `x-nexsign-signatur` = HMAC-SHA256 mit `SIGN_HANDOFF_SECRET`, Zeitfenster ±60 s. Antwort: `aktiv`, `name`, `stufe`, `umfang`, `grundlage`, `einzelvertretung`, `widerrufenAm`. **Nie** übermittelt: Urkundennummer, Grund des Endes, erteilt/beendet von, `nachtrag_am`.
    - Bei jeder Änderung meldet das Portal `POST {NEXSIGN_URL}/api/befugnis/geaendert` mit nur `{sub, ts}` (Konto-ID, Zeitstempel), damit NexSign seinen 60-s-Puffer leert.
    - Mittelbar die Vertragspartner: NexSign druckt Name laut Vollmacht, Stufe und Grundlage auf die Protokollseite **beider** PDF-Fassungen, also auch der Kundenfassung (A24).
  - **Drittland:** keines.
  - **Löschung:** `FRISTEN.vollmachtJahre = 6` in `nexai-portal/lib/retention-sweep.ts` (täglicher Löschlauf): gelöscht werden Zeilen mit `widerrufen_am` vor dem 01.01. des Jahres (laufendes Berliner Jahr − 6). Endet eine Vollmacht im Jahr J (auch durch Ablösung), wird sie ab dem 01.01. J+7 (Berlin) gelöscht. Ohne Ende (geltend) oder mit Ende in der Zukunft (geplanter Widerruf, künftige Erteilung) **nie**. Unabhängig von der Kontolöschung.
  - **Zugriff:** Sehen und pflegen nur Gesellschafter (`istGesellschafter`: Admin-Konto und Inhaber oder markiert). Die Seite `/portal/admin/vollmachten` liefert allen anderen 404, die Server-Aktionen (`app/actions/vollmachten.ts`) prüfen dasselbe. Das Gesellschafter-Kennzeichen setzt nur der Inhaber. Die E-Mail-Adresse eines Kontos mit offener Vollmacht ändern nur Gesellschafter (sonst Kontoübernahme samt Vollmacht über den Passwort-Link).
  - **Datenschutzhinweis:** Portal-Datenschutzerklärung Abschnitte 3, 4, 6, 7, 9, 10, 14 und der Abschnitt „Ihr Widerspruchsrecht (Art. 21 DSGVO)“ (Zweig `recht/dse-vollmachten`).
  - **Offen:** Die Vollmachten-Seite sagt „Nichts wird gelöscht: Jede Vollmacht bleibt als Nachweis stehen.“ (`messages/de/vollmachten.json`, `how3`, ebenso EN und der Kommentar zu `vollmachten` in `db/schema.ts`). Seit der 6-Jahres-Frist stimmt das nicht mehr; angleichen („bleibt bis zum Ende des sechsten Kalenderjahres nach ihrem Ende als Nachweis stehen“).

### A13 Portal — Kunden- und Auftragsverwaltung
- **Zweck:** Führung der Kundenstammdaten und Aufträge, Zuordnung zu Vertriebspartnern. **Betroffene:** Kunden und deren Ansprechpartner. **Daten:** `customers` (Kundennummer, Firma, Ansprechpartner, E-Mail, Telefon, Anschrift, Status, **Notizen**, CRM-Verweise, zugeordneter Partner); `orders` (Produkt, Beschreibung, Beträge, Laufzeit, Status, Setter/Closer, Provisionssätze, Kündigungszeitpunkt).
- **Rechtsgrundlage:** Art. 6(1)b. **Empfänger:** Hetzner (DE), **NexAI-CRM** (self-hosted DE, Abgleich über `crm_outbox`). **Drittland:** keines. **Löschung:** mit Vertragsende, soweit keine gesetzlichen Fristen entgegenstehen.
- **Besonderheiten:** Das Freitextfeld `notes` ist inhaltlich nicht begrenzt — besondere Kategorien sind dort nicht ausgeschlossen.

### A14 Portal — Rechnungen und Provisionsabrechnung
- **Zweck:** Ausstellung und Verwaltung von Kundenrechnungen und Partner-Provisionsabrechnungen. **Betroffene:** Kunden, Vertriebspartner. **Daten:** `invoices` (Art, Nummer, Ausstellungs-/Fälligkeitsdatum, Abrechnungsmonat, Nettobetrag, Steuersatz und Rechtsgrund bei 0 %, Status, Zahlungseingang, Notizen, **hinterlegte PDF-Datei**, Hochladender). Die Partner-IBAN kommt aus A12 in die Rechnung.
- **Rechtsgrundlage:** Art. 6(1)b; **Art. 6(1)c** (§ 14 UStG, § 147 AO). **Empfänger:** Hetzner (DE), Kunde bzw. Partner als Rechnungsempfänger, mittelbar Steuerberater. **Drittland:** keines. **Löschung:** **8 Jahre**, gerechnet ab Schluss des Kalenderjahres (§ 14b Abs. 1 UStG, § 147 Abs. 1 Nr. 4 i. V. m. Abs. 3 und 4 AO in der Fassung des Vierten Bürokratieentlastungsgesetzes). **Technisch erzwungen** — `nexai-portal/lib/retention.ts`, Prüfung beim Löschen in `app/actions/invoices.ts`.
- **Besonderheiten:** Bewusst **acht** statt zehn Jahre: längeres Aufbewahren als nötig verstößt gegen Art. 5(1)e DSGVO. Rechnungsnummern sind gegen Doppelvergabe gesperrt.

### A15 Portal — Leadlisten, Lead-Bearbeitung und Anrufdokumentation
- **Zweck:** Verteilung und Bearbeitung von Akquise-Leads, Dokumentation der Anrufversuche und Ergebnisse. **Betroffene:** **Dritte** — angesprochene Unternehmen und deren Ansprechpartner (B2B); zusätzlich die bearbeitenden Vertriebspartner. **Daten:** `lead_lists` (Name, Beschreibung, Ersteller, **Eigentümer** — private Listen); `leads` (Firma, Ansprechpartner, Telefon, E-Mail, Website, Ort, **Notiz und Gesprächsnotiz**, Status, Versuche, Wiedervorlage, letzter Anruf und Anrufer, Beanspruchung, Umwandlung in einen Kunden); `lead_calls` (Lead, **Nutzer und Partner**, Ergebnis, erreicht ja/nein, Zeitpunkt, **Dauer**, verknüpfter Termin).
- **Rechtsgrundlage:** Art. 6(1)f (Direktansprache im B2B-Umfeld, Dokumentation) — **Abwägung dokumentieren**; § 7 UWG für die Ansprache selbst ist gesondert zu beachten. **Empfänger:** Hetzner (DE), **NexAI-CRM** (self-hosted DE). **Drittland:** keines. **Löschung:** **12 Monate ab dem letzten Kontaktversuch** (`lastCalledAt`, ersatzweise Anlagedatum). Wird der Lead zum Kunden, geht er in A13 über und folgt dort der Vertragsfrist.
  **Die Anrufdokumentation bleibt** und verliert dabei den Bezug zur angesprochenen Person (`lead_calls.lead_id` wird auf NULL gesetzt). Grund: nach dem Löschen des Leads dokumentiert die Zeile nur noch die **Tätigkeit des Vertriebspartners** — sie ist Beleg für abgerechnete Provisionen (A12/A14) und Grundlage der Anrufübersicht im Portal. Würde sie mitgelöscht, schrumpften rückwirkend die Anrufzahlen der Partner und die Provisionsbelege. Die Daten der angesprochenen Person verschwinden vollständig, denn Firma, Ansprechpartner, Rufnummer und Gesprächsnotiz stehen am Lead, nicht am Anruf.
- **Besonderheiten:** Betroffene sind hier **nicht Vertragspartner**, sondern Angesprochene — Informationspflicht nach **Art. 14 DSGVO** und Herkunft der Daten sind zu klären. `lead_calls` erfasst zugleich, **wer wie lange wen angerufen hat** — Leistungsdaten über Selbstständige.

### A16 Portal — Termine, Kalender und Kalenderfreigaben
- **Zweck:** Terminverwaltung, Erinnerungen, Freigabe des eigenen Kalenders an andere Portalnutzer, Kalender-Abo und Google-Abgleich. **Betroffene:** Portalnutzer, Kunden und deren Ansprechpartner, eingeladene Gäste. **Daten:** `appointments` (Zuständiger, Ersteller, Titel, Kunde, **Ansprechpartner mit E-Mail und Telefon**, Zeitraum, Status, Kategorie, Produkt, **Besprochenes und Notizen**, Ort, Sichtbarkeit, Herkunft, Google-Ereigniskennung, Erinnerung, Serie); `appointment_guests` (Nutzer, E-Mail); `calendar_shares` (Eigentümer, Betrachter, Status); `google_connections` (**Google-Adresse, verschlüsseltes Refresh-Token**).
- **Rechtsgrundlage:** Art. 6(1)b, Art. 6(1)f. **Empfänger:** Hetzner (DE); **Google Ireland Ltd / Google LLC** bei verbundenem Kalender. **Drittland:** IE/US — **Art. 45 (DPF, Google LLC aktiv zertifiziert, geprüft 06.09.2026)**, ergänzend SCC. **Löschung:** **12 Monate nach Terminende**; Termine aus der **Website- oder Telefonbuchung** (`source`) jedoch **6 Monate** — diese Frist ist in der Datenschutzerklärung öffentlich zugesagt und geht vor. Kalenderfreigaben mit dem Widerruf oder dem Konto; Google-Verbindung samt Token beim Trennen der Verbindung oder mit dem Konto.
- **Besonderheiten:** Kalenderfreigaben machen Termininhalte **anderen Portalnutzern** sichtbar; die Sichtbarkeitsstufe je Termin steuert das. Das Google-Refresh-Token liegt verschlüsselt.

### A17 Portal — Interne Kommunikation und Support
- **Zweck:** Support-Vorgänge mit Kunden, Team-Kanal, Direktnachrichten zwischen Portalnutzern. **Betroffene:** Portalnutzer, Kunden-Ansprechpartner. **Daten:** `threads` (Kunde, Ersteller, Betreff, Status); `messages` (Absender und dessen Rolle, **Nachrichtentext, Dateianhang**, Lesevermerke); `channel_messages` (Absender, Name, Rolle, Text); `direct_messages` (Absender, Empfänger, **Text**, Lesevermerk).
- **Rechtsgrundlage:** Art. 6(1)b (Support), Art. 6(1)f (interne Zusammenarbeit). **Empfänger:** Hetzner (DE). **Drittland:** keines. **Löschung:** **Support-Vorgänge 24 Monate nach Abschluss** des Vorgangs (Nachweis über die Gewährleistung hinweg); **Team-Kanal und Direktnachrichten 12 Monate** ab Nachricht.
- **Besonderheiten:** **Direktnachrichten sind private Kommunikation** zwischen Nutzern. Ein Portal-Admin hat über den Datenbankzugang technisch Zugriff; eine Regelung dazu gibt es nicht. Der Lernbereich (`privat`) ist von Team-Kanal, Direktnachrichten und Support ausdrücklich ausgeschlossen.

### A18 Portal — Wissens-Bibliothek
- **Zweck:** Bereitstellung von Schulungs- und Vertriebsunterlagen. **Betroffene:** hochladende Nutzer; Personen, die in Unterlagen vorkommen. **Daten:** `library_folders` (Name, Beschreibung, Sichtbarkeit, Ersteller); `library_files` (Titel, Beschreibung, Datei, Hochladender, **Eigentümer** — private Dateien seit 03.09.2026).
- **Rechtsgrundlage:** Art. 6(1)f (Bereitstellung von Arbeitsmitteln). **Empfänger:** Hetzner (DE). **Drittland:** keines. **Löschung:** durch den Eigentümer oder mit dem Konto. **Bewusst ohne Regelfrist:** der Zweck — Bereitstellung von Arbeitsmitteln — besteht fort, solange die Unterlage genutzt wird. Stattdessen **jährliche Sichtung**, ob Unterlagen noch gebraucht werden.
- **Besonderheiten:** Private Dateien sind nur für den Hochladenden sichtbar, auch nicht für die Leitung. Dateien liegen außerhalb des Web-Wurzelverzeichnisses und werden über eine geprüfte Ausgabe-Route ausgeliefert.

### A19 Portal — NexAI Sales Assistent (Training, Gesprächsauswertung, Frage-Antwort)
- **Zweck:** Schulung der Vertriebspartner (Lernbibliothek, Einwand-Bibliothek), **Training gegen ein Sprachmodell** (Einwand-Simulator), **Auswertung eigener Verkaufsgespräche** anhand selbst eingefügter Mitschriften, Frage-Antwort über die freigegebenen Lektionen, Wissens-Check als Bedingung der Vertriebsfreigabe. **Betroffene:** Vertriebspartner und Team-Mitglieder; bei Mitschriften zusätzlich **Dritte** — die Gesprächspartner auf Kundenseite.
- **Daten:** `sales_modules` / `sales_lessons` / `sales_objections` (Firmenwissen, Ersteller; **seit 10.10.2026 zusätzlich `owner_user_id` — eigene Notizen einzelner Partner**); `sales_lesson_progress` (wer was gelesen hat); `sales_runs` / `sales_run_turns` / `sales_run_objections` (**Rollenspiele: was der Partner geschrieben hat**, Härtegrad, Branche, Guardrail-Befunde je Zug); `sales_transcripts` (**Mitschrift eines echten Gesprächs**, Titel, Datum, Branche, Zeichenzahl, Bestätigung „keine heimliche Aufnahme", Zahl der geschwärzten Stellen); `sales_reviews` (Auswertung, Phasenbewertung, Zitate, Freigabe an die Leitung); `sales_kb_chunks` (Abschnitte der Lektionen); `sales_kb_messages` (**gestellte Fragen und Antworten**); `sales_quiz_questions` / `sales_quiz_attempts` (**Testergebnisse je Person**); `sales_uploads` (angefangene Video-Uploads).
- **Rechtsgrundlage:** Art. 6(1)b und Art. 6(1)f (Schulung und Qualifizierung der Vertriebspartner). Für **Mitschriften** stützt sich die Verarbeitung der Daten des Gesprächspartners auf Art. 6(1)f — berechtigtes Interesse an der Qualifizierung des Vertriebs; die Abwägung trägt, weil die Mitschrift **freiwillig gekürzt und geschwärzt** wird, keine Aufzeichnung verwendet werden darf und die Frist kurz ist.
- **Empfänger:** Hetzner (DE); **OpenAI Ireland Limited / OpenAI L.L.C.** für Rollenspiel, Auswertung und Frage-Antwort. **Drittland:** US — **Art. 46 (SCC)**, siehe [`TIA-OpenAI-Drittlandtransfer.md`](TIA-OpenAI-Drittlandtransfer.md); OpenAI ist **nicht** DPF-zertifiziert.
- **Löschung:** **Rollenspiele samt Auswertung 12 Monate**; **Mitschriften samt Auswertung 6 Monate** (kürzer, weil sie Daten Dritter enthalten); **Frage-Verlauf 12 Monate**; angefangene Uploads **24 Stunden**. Lektionen, Einwände und Testfragen sind Firmenwissen ohne Regelfrist. Testergebnisse und die Vertriebsfreigabe bleiben als Qualifikationsnachweis, bis das Konto endet.
- **Besonderheiten:**
  - **Sprechen im Rollenspiel (seit 10.10.2026).** Der Partner kann seinen Zug sprechen statt tippen. Die Aufnahme geht zur Erkennung an **OpenAI** und wird **nirgends gespeichert** — keine Spalte, keine Datei, kein Zwischenspeicher; erkannt, verworfen, nur der Text bleibt. Mangels Speicherung gibt es dafür auch keine Löschfrist. Die Stimme ist ein personenbezogenes Datum, aber **kein biometrisches** im Sinne von Art. 9: Sie wird nicht zur eindeutigen Identifizierung verarbeitet, sondern ausschließlich in Text umgewandelt. **Kein Dritter ist beteiligt** — gesprochen wird mit einer Maschine, § 201 StGB ist nicht berührt; die Oberfläche weist zusätzlich darauf hin, dass die Funktion nie zu benutzen ist, während ein echter Kunde in der Leitung ist. Die Guardrails prüfen den **erkannten Text**; Erkennungsfehler sind möglich (Eigennamen), deshalb steht der erkannte Satz sichtbar im Verlauf.
  - **Keine Audioaufnahme eines Dritten, an keiner Stelle.** Das Datenmodell hat dafür keine Spalte; eingegeben wird ausschließlich Text. Vor dem Speichern muss der Partner bestätigen, dass keine heimliche Aufzeichnung verwendet wurde (**§ 201 StGB** trifft ihn persönlich). Die Bestätigung wird serverseitig erzwungen.
  - **Datenvermeidung vor der Übermittlung:** Ein Abgleich findet E-Mail-Adressen, Telefonnummern, IBANs und Straßenangaben und ersetzt sie auf Wunsch, bevor der Text das Haus verlässt (Art. 5 Abs. 1 lit. c). **Namen erkennt der Abgleich nicht** — das steht so in der Oberfläche.
  - **Auswertungen sind privat.** Weder Leitung noch Geschäftsführung sehen sie; sichtbar wird nur, was ein Partner **einzeln freigibt**. Grund ist nicht nur Datenschutz: Wer weiß, dass mitgelesen wird, übt keine schwachen Gespräche.
  - **Leistungsdaten:** Testergebnisse, Durchlaufzahlen und Auswertungen sind Leistungsdaten über Selbstständige — dieselbe Einordnung wie bei `lead_calls` (A15).
  - Die Frage-Antwort antwortet **ausschließlich** aus freigegebenen Lektionen und prüft jedes Zitat gegen den Quelltext; ohne Treffer wird das Modell gar nicht erst aufgerufen.
  - **Eigene Inhalte der Partner (seit 10.10.2026).** Jeder Partner kann eigene Module, Lektionen und Einwände anlegen. Sie sind **ausschließlich für ihn** sichtbar — ausdrücklich auch nicht für Geschäftsführung, Vertriebs- oder Kommunikationsleitung; die Regel steht einmal zentral (`lib/sales/visibility.ts`) und greift in allen zehn Lesewegen, auch in Suche und Frage-Antwort. Sichtbar für die Leitung wird ein einzelnes Stück nur, wenn der Besitzer es **ausdrücklich vorschlägt**; das ist die Einwilligung, und sie gilt genau für dieses Stück. Eine eigene Löschfrist gibt es nicht, weil es sich um selbst verfasstes Arbeitsmaterial handelt und nicht um Daten Dritter: Die Inhalte hängen am Konto (`on delete cascade`) und verschwinden mit ihm.

### A23 Portal — Mail-Aufträge an Leads und Terminteilnehmer

- **Zweck:** Eine am Telefon **verlangte** E-Mail an einen Lead oder Terminteilnehmer in Auftrag geben, freigeben und versenden lassen (Unterlagen, Terminbestätigung). **Betroffene:** Ansprechpartner angesprochener Unternehmen, Terminteilnehmer. **Daten:** `mail_jobs` — Art und Status des Auftrags, Bezug zu Lead und Termin (beide `set null`), auslösender Nutzer, **das Häkchen `mail_requested`** („der Ansprechpartner hat die Mail am Telefon verlangt"), gewählte Produktvorlage und `payload` (Empfängerangaben und Inhalt der zu versendenden Mail).
- **Rechtsgrundlage:** Art. 6(1)b bei angebahntem Vertragsverhältnis, sonst Art. 6(1)f; **für die Werbemail selbst § 7 Abs. 2 Nr. 2 UWG — zulässig nur mit vorheriger ausdrücklicher Einwilligung.** Genau dafür ist `mail_requested` da. **Empfänger:** Hetzner (DE), Resend (US, DPF) für den Versand, der E-Mail-Agent (A20) für den Entwurf. **Drittland:** US über Resend (DPF, hilfsweise SCC).
- **Löschung:** **36 Monate** ab Anlage (`mailAuftraegeMonate`, seit 10/2026 im Löschlauf). Begründung: der Auftrag ist der **Nachweis der Einwilligung** nach § 7 UWG. Die Verjährung wettbewerbsrechtlicher Ansprüche ist kurz (§ 11 UWG: sechs Monate ab Kenntnis), vertragliche Ansprüche verjähren aber regelmäßig in drei Jahren (§ 195 BGB) — und ohne diesen Beleg stünde bei einer Abmahnung Aussage gegen Aussage. Der Bezug zum Lead überlebt dessen Löschung bewusst nicht als Personenbezug: `lead_id` wird auf `NULL` gesetzt, nicht kaskadiert, damit der Beleg bleibt und die Person verschwindet.
- **Besonderheiten:** Der Versand ist **serverseitig gesperrt**, solange `mail_requested` nicht gesetzt ist (Rechtsprüfung Welle 1, 17.10.2026) — die Sperre liegt nicht nur in der Oberfläche. Der Inhalt entsteht über den E-Mail-Agenten; es gilt der KI-Hinweis aus A20.

### A21 Portal — Lead-Recherche (Firmen aus öffentlichen Quellen)
- **Zweck:** Firmen in Deutschland finden, für die ein NexAI-Produkt einen belegbaren Nutzen haben kann, und sie für die **telefonische** B2B-Ansprache durch den eigenen Vertrieb vorbereiten. **Seit Etappe „Tageslauf" (Portal-Migrationen 0072/0073, PR #14; Freigabe Max 20.10.2026: nur Deutschland):** zusätzlich zu Aufträgen von Hand läuft jeden Tag um 06:00 (Europe/Berlin) automatisch ein Auftrag über alle Branchen mit fester Abrufgrenze; seine Ergebnisse gehen **ohne Sichtprüfung** direkt in die Branchen-Leadlisten (Max' Auftrag 11.10.2026). Der Kandidat bleibt dabei als „ungesichtet" vermerkt, im Prüfprotokoll steht kein Nutzer, sondern der Tageslauf. **Nicht Zweck:** Profile über Personen, Werbe-E-Mails ohne Einwilligung, Weitergabe an Dritte, Verkauf von Daten. Abgrenzung: A7 beschreibt die Beschaffung über Explorium; exportierte Ergebnisse gehen als Leads in A15 über.
- **Betroffene:** vertretungsberechtigte Personen der recherchierten Firmen laut Impressum; Inhaber von Einzelunternehmen, bei denen schon die Firmenangaben personenbezogen sind.
- **Daten:** Firmenname, Website, Anschrift, Branche, Größe, Register-Nr., USt-IdNr.; zentrale Telefonnummer und allgemeines Postfach (info@ …); **Name und Funktion der vertretungsberechtigten Person laut Impressum** (Entscheidung Maximilian Trenk, 10.10.2026), nur wenn „Geschäftsführer erfassen" im Auftrag eingeschaltet ist; Bedarfssignale als kurzes Zitat (≤ 240 Zeichen) mit Fundstelle; Abrufprotokoll (URL, Zeitpunkt, Status, Feldherkunft, darin auch Personennamen: `field_provenance.persons`); Art.-14-Vermerk je Person (`art14_notified_at`, `art14_note`); Sperrliste als Prüfsumme; Outreach-Protokoll (`outreach_events`, bislang nur Probelauf). **Nicht gespeichert:** Seiteninhalte, private Adressen, persönliche E-Mail-Adressen (werden nie einer Person zugeordnet und nie aus einem Namensschema gebaut), Fotos, Social-Media-Profile, besondere Kategorien.
- **Herkunft (Art. 14 Abs. 2 lit. f):** ausschließlich öffentlich zugängliche Quellen. OpenStreetMap (Overpass, Nominatim) zum Entdecken; Firmenwebsite mit Impressum, Kontakt- und Karriereseite (auch datierte Stellenanzeigen) zum Prüfen und Anreichern; öffentliche Ausschreibungen (Bekanntmachungsservice des Bundes für DE; TED wird nicht für AT abgefragt), wobei Kontaktpersonen der Vergabestellen nicht übernommen werden. **Personen nur aus dem Impressum.**
- **Rechtsgrundlage:** Art. 6(1)f (berechtigtes Interesse an B2B-Direktwerbung, ErwGr. 47). **Abwägung:** Die Angaben sind wegen der Impressumspflicht zur geschäftlichen Kontaktaufnahme veröffentlicht, die Menge ist minimal, der Kontext rein geschäftlich. Dagegen steht das Interesse der Person, nicht ungefragt kontaktiert zu werden; dem trägt der **Widerspruch nach Art. 21 Abs. 2** Rechnung, der ausnahmslos gilt (Sperrliste). **Die Recherche erteilt keine Werbeerlaubnis:** Telefon B2B nur bei mutmaßlicher Einwilligung im Einzelfall (§ 7 Abs. 2 Nr. 1 UWG), E-Mail nur mit vorheriger ausdrücklicher Einwilligung (§ 7 Abs. 2 Nr. 2 UWG), die für recherchierte Firmen nicht vorliegt. **Nur Deutschland** (seit 17.10.2026, im Code fest, nicht per Einstellung abschaltbar): Österreich und die Schweiz sind in Suche, Postleitzahl-Umkreis, Tageslauf, Anreicherung, Übernahme und Export gesperrt. Für **Österreich** gilt: § 174 Abs. 1 TKG 2021 verlangt für Werbeanrufe auch gegenüber Unternehmen eine vorherige Einwilligung (BVwG 07.05.2025, W282 2303188-1); der Ausschluss wirkt in Suche, Tageslauf und jeder Übernahme. **Schweiz:** Die Recherche liefert keine Schweizer Firmen. Kommt eine Schweizer Nummer auf anderem Weg ins Portal, etwa über den Import eines Vertriebspartners, gilt: Anruf nur nach einer **Prüfung von Hand** im Telefonverzeichnis (search.ch), ob die Nummer eingetragen ist und keinen Stern trägt (Art. 3 Abs. 1 lit. u UWG); ohne gültige Prüfung (30 Tage) sperrt das Portal Anruf und Erfassen; Stern oder „nicht eingetragen" kommen auf die Sperrliste. Die Absendernummer darf nicht unterdrückt werden (lit. v); der Hinweis steht in der Anrufmaske.
- **Empfänger:** Hetzner (DE, Portal-Server). **Kein neuer Auftragsverarbeiter, kein Sprachmodell, kein externer KI-Dienst.** Alle Abrufe gehen vom Portal-Server in Deutschland direkt an die Quelle. Overpass (FOSSGIS, DE) und Nominatim (OSMF, Vereinigtes Königreich, Angemessenheitsbeschluss) erhalten nur die Suchanfrage (Branche, Region bzw. Postleitzahl), keine Personendaten; Firmenwebsites sehen einen Abruf mit dem User-Agent `NexAI-LeadResearch/1.0` und der Website-Adresse von NexAI. Exportierte Kandidaten gehen in die Leadlisten des Portals (A15). **Schweiz:** Beim Nachschlagen von Hand öffnet der Anrufer search.ch im eigenen Browser; dabei erhält search.ch (Schweiz, Angemessenheitsbeschluss) die gesuchte Firmennummer. Das Portal fragt search.ch nie selbst ab (Nutzungsbedingungen: keine maschinellen Massenabfragen). **Drittland:** keine Übermittlung personenbezogener Daten.
- **Löschung** (Festlegung 10.10.2026, durchgesetzt in `nexai-portal/lib/lead-intel/retention.ts`: eigener Löschlauf neben dem Portal-Löschlauf, einmal je Berliner Tag, auch bei abgeschalteter Recherche; hart gelöscht, bis zu 20 Stapel à 500 Zeilen je Bereich und Lauf (wegen der 400 bis 800 Kandidaten des Tageslaufs); jeder Lauf steht im Prüfprotokoll, auch ohne Befund, die Betriebsübersicht wird nach 36 Stunden Stille rot):
  - ausgeschlossene, nie angereicherte oder in der Sichtprüfung verworfene Kandidaten: **30 Tage** nach Abschluss des Auftrags; beim Tageslauf werden nicht übernommene Kandidaten gleich nach der Übernahme geschlossen (`not_transferred`), damit ihre Personen nach **7 Tagen** gehen
  - qualifizierte oder zur Prüfung stehende, **nicht exportierte** Kandidaten: **6 Monate** nach Abschluss des Auftrags
  - **exportierte** Kandidaten: **12 Monate** nach dem Export (wie A15); die importierte Kopie in `leads` folgt ab dann A15
  - Firma samt Kontakten, Belegen, Scores und Abrufen: sobald **kein Kandidat** mehr an ihr hängt (7 Tage Schonfrist ab Anlage)
  - **Personen (Name, Funktion): höchstens 12 Monate** ab Erhebung; bei Firmen **ohne aktiven Kandidaten** (nirgends qualifiziert, zur Prüfung oder exportiert) schon nach **7 Tagen**, bewusst vor der Monatsfrist aus Art. 14 Abs. 3 lit. a
  - Personennamen im Abrufprotokoll: dieselben Fristen wie die Personen
  - Suchaufträge (Filter, Zähler, Bericht ohne Personendaten): **24 Monate**, frühestens wenn kein Kandidat mehr daran hängt; Abrufprotokoll ohne Firma: **24 Monate**
  - Outreach-Protokoll: **36 Monate** (Beleg zu § 7 UWG)
  - Tageszeilen des Tageslaufs (nur Zahlen: Trefferquote, Abrufe, Ampel): **24 Monate**
  - Schweiz-Prüfprotokoll (Ergebnis, Prüfsumme der Nummer, Name der prüfenden Person, Zeitpunkt): **36 Monate** (Beleg zu Art. 3 Abs. 1 lit. u UWG); danach bleibt bei Stern oder „nicht eingetragen" nur der Sperrlisten-Eintrag
  - **Sperrliste: unbefristet**, nur als Prüfsumme des normalisierten Kontakts, ohne Klartext. Ein Widerspruch muss dauerhaft wirken (Art. 21 Abs. 3)
  - Prüfprotokoll: wie A11
- **Sicherungen:** **Gelöscht heißt: aus der Datenbank.** Die Recherchetabellen liegen in der Portal-Datenbank und damit im täglichen verschlüsselten Abzug (03:35). Aufbewahrt werden die **30 jüngsten Abzüge** auf der CRM-Kiste (Hetzner, DE) und die **3 jüngsten** auf der Portal-Kiste (Einrichtungsskript vom 22.09.2026 für `/root/sicherung-portal.sh`). Gezählt wird nach Anzahl, nicht nach Alter: Bei einem Abzug je Nacht steht ein gelöschter Datensatz rund **30 Tage** weiter in den Sicherungen. Handabzüge verkürzen das, ausgefallene Nächte verlängern es. Auf der Zielkiste geprüft am 10.10.2026: 19 Abzüge, einer je Nacht seit dem 22.09.; die Grenze von 30 hat also noch nie gegriffen. Nach einer Wiederherstellung den Löschlauf einmal abwarten und die Widersprüche seit dem Stand der Sicherung prüfen, denn die Sperrliste stammt dann ebenfalls aus der Sicherung.
- **Betroffenenrechte** (Lead-Recherche → Betroffenenanfragen, nur Inhaber und Geschäftsführung): Gesucht wird nach E-Mail, Telefon, Domain oder Name in Kontakten, Firmen, Belegzitaten und im Abrufprotokoll. Der Suchwert geht nie in die Adresse; im Prüfprotokoll stehen Prüfsumme und Zahlen, nicht der Wert.
  - **Auskunft (Art. 15):** CSV mit einer Zeile je Angabe, vorneweg Zweck, Rechtsgrundlage, Herkunft, Empfänger und Speicherdauer.
  - **Berichtigung (Art. 16):** nicht als eigene Funktion gebaut. Ein falscher Eintrag wird gelöscht, die nächste Recherche liest die Quelle neu.
  - **Löschung (Art. 17):** Treffer-Kontakte samt Einträgen in Abrufprotokoll und Belegzitaten, auf Wunsch ganze Firmen aus dem Suchergebnis.
  - **Widerspruch (Art. 21):** erst Sperrliste (Kanal „alle"), Freigaben widerrufen, wartende Outreach-Einträge stornieren, dann wie Löschung. Nur mit E-Mail, Telefon oder Domain, weil sich ein Name nicht dauerhaft prüfen lässt. Die Sperrliste wirkt auch in der Recherche: Eine gesperrte Domain oder Firmennummer schließt die Firma schon beim Entdecken aus, ohne einen einzigen Abruf.
  - **Grenze:** Schon in eine Leadliste importierte Leads (A15) berührt die Anfrage nicht; sie sagt das auch.
- **Informationspflicht (Art. 14):** spätestens bei der ersten Kontaktaufnahme (Abs. 3 lit. b), sonst innerhalb eines Monats. Die Ausnahme „unverhältnismäßiger Aufwand" (Abs. 5 lit. b) wird nicht in Anspruch genommen. Je Person ein Vermerk (Datum und Art der Information); **Lead-Recherche → Art.-14-Fälle** listet die nicht informierten Personen mit ihrer Monatsfrist, überfällige rot. Je Fall: Vermerk oder Person löschen. Der Textbaustein für den Anruf steht in `privacy.md` Abschnitt 3 und ist **vor dem ersten Gespräch mit Max abzustimmen**.
- **Zugriff (TOMs):** nur Inhaber, Geschäftsführung, Vertriebs- und Kommunikationsleitung (`canRunLeadResearch`, Positivliste; andere bekommen 404); Zwei-Faktor-Pflicht für genau diese Rollen, sofern `MFA_KEY` gesetzt ist (A11). Start, Abbruch, Fortsetzen, Sichtprüfung und Export stehen im Prüfprotokoll; der Tageslauf mit leerem Nutzer und dem Vermerk `lead_daily_run`. Die Schweiz-Prüfung tragen alle Team-Mitglieder ein, die die Leadliste sehen. Sperrliste, Freigaben und Betroffenenanfragen nur Inhaber und Geschäftsführung; die Art.-14-Übersicht alle, die recherchieren dürfen.
- **Offene Punkte:**
  - **Anwaltliche Prüfung steht aus.** Die Festlegungen sind begründete Vorschläge, keine Rechtsberatung, und gehören vor dem produktiven Einsatz zur anwaltlichen Prüfung, zusammen mit Art. 14 bei Leads (A15, siehe Bekannte Lücken).
  - **Art. 14 beim Anruf noch nicht im Ablauf:** Angerufen wird in der Leadliste (A15). Die Anrufmaske zeigt den Textbaustein noch nicht, und ein Vermerk im Portal-Lead fließt nicht zurück. Bis das gebaut ist, vermerkt die Leitung die Information in der Art.-14-Übersicht.
  - **Echte Einwilligungen** für Outreach brauchen eine eigene, längere Frist als Nachweis. Heute gibt es nur den Probelauf.
  - **Sicherungsfrist nur zum Teil belegt:** Belegt sind das Einrichtungsskript und der Bestand auf der Zielkiste. Das Skript auf der Portal-Kiste selbst ist ohne SSH-Zugang dorthin nicht einsehbar. Ob Hetzner-Serversicherungen oder Snapshots der beiden Kisten weitere Kopien halten, ist nicht geprüft.
- **Dokumentation:** `nexai-portal/docs/lead-intelligence/privacy.md` (Zweck, Daten, Rechtsgrundlage, Art. 14, Fristen, Betroffenenrechte, Datenflüsse, Zugriff), `operations.md` (Betrieb, Sicherung), `data-sources.md` (Quellen); Stand 10.10.2026, Commit `6f2c67a`. Dort heißt dieser Eintrag noch „A19"; die Nummer war im Verzeichnis schon vergeben.

### A24 NexSign — Elektronische Unterschriften (sign.nex-a-i.com)
*Eigene App `nexsign` auf dem Portal-Server, live seit 18.10.2026 um 21:13 UTC. Der Menüpunkt „Unterschriften“ im Portal führt dorthin. Geprüft an `nexsign` `837b8f1` und am Live-Stand vom 18.10.2026, 22:30 UTC; Ablehnung, Erinnerungen und Vorlagen an `f50c6d6`/`203494e`/`02fcb47` (live seit 18./19.10.2026). Weitere Unterzeichner an `b58b3f4` (live seit 21.10.2026, 00:33 MESZ, Max' Anordnung), zwei Protokoll-Fassungen an `84f05ec` (live seit 21.10.2026, 00:57 MESZ). Zeichnungsbefugnis an `2ddcfd0` (Merge `dcf9e86`, Migration 0005); sie wirkt erst, wenn bei NexSign `BEFUGNIS_URL` gesetzt ist, bis dahin gilt der „Übergang“ wie bisher (jeder Nutzer darf, Stempel ohne Stufe).*

- **Zweck:** Verträge zwischen NexAI und Geschäftskunden elektronisch unterschreiben lassen und nachweisen, wer wann welche Fassung unterschrieben hat.
  - Ein Vertriebspartner, ein Manager oder die Leitung öffnet NexSign aus dem Portal, lädt ein PDF hoch (bis 40 MB), legt die Felder fest und unterschreibt **selbst** für NexAI.
  - Der Kunde öffnet das Dokument über einen persönlichen Link ohne Konto, gibt seinen Namen ein, füllt die ihm zugewiesenen Felder aus, bestätigt den Inhalt und unterschreibt. Er kann auch ablehnen und dabei freiwillig einen Grund angeben (höchstens 500 Zeichen).
  - **Weitere Unterzeichner:** Neben dem Kunden können bis zu drei weitere Personen unterschreiben (z. B. zweiter Geschäftsführer, Geschäftspartner), jede mit eigenem Link; Reihenfolge beliebig. Der Ersteller vergibt je Person eine Rollenbezeichnung (höchstens 40 Zeichen; Hinweis im Formular: „Nur die Rolle – keine privaten Angaben (etwa zu Gesundheit oder Familie).“). Eine Ablehnung durch eine Person beendet den Vorgang für alle; die anderen sehen nur „Vorgang beendet“, ohne Grund, Person und Dokument.
  - Wiederkehrende Verträge kann ein Nutzer als **Vorlage** speichern: nur die Lage der Felder, persönlich oder von der Leitung für alle freigegeben. Beim Verwenden lädt er das PDF des neuen Kunden hoch, die Felder landen an derselben Stelle.
  - Das fertige PDF erhält eine Protokollseite und ein technisches Siegel von NexAI (selbst ausgestelltes Zertifikat, kein qualifiziertes Siegel).
  - **Zeichnungsbefugnis** (`lib/server/befugnis.ts`): Beim Vorbereiten (Editor), bei jeder Unterschrift für NexAI, beim Abschluss und vor einer Entscheidung über eine Genehmigung fragt NexSign beim Portal nach, ob und wie die Person für NexAI zeichnen darf (A12). Ohne Befugnis für die gewählte Vertragsart, nach Ende der Vollmacht oder bei nicht prüfbarer Antwort ist die Unterschrift für NexAI gesperrt.
  - **Genehmigung durch NexAI** (§ 91a HGB, § 177 BGB): Weicht beim Closer der vereinbarte Preis vom Listenpreis ab, liegt er bei der Vertriebsleitung mehr als 10 % darunter, hat ein Gesellschafter ohne gemeldete Einzelvertretung allein unterschrieben, wurde nach dem Ende der Vollmacht unterschrieben, war die Befugnis beim Abschluss nicht prüfbar oder steht derselbe Name auf beiden Seiten, markiert NexSign den Vorgang als „Genehmigung nötig“. Entscheiden kann ein Gesellschafter (abschließend) oder die Vertriebsleitung (nur genehmigen bzw. befürworten), nie über den eigenen Vorgang. Die Ablehnung gegenüber dem Kunden schickt der Gesellschafter selbst; NexSign liefert nur den Textbaustein.
- **Betroffene:**
  - Unterzeichnende auf Kundenseite: Vertreter oder Ansprechpartner des Geschäftskunden, bei Einzelunternehmern der Kunde selbst
  - bis zu drei weitere Unterzeichnende je Vorgang (weitere Vertreter des Kunden oder Dritte, etwa Geschäftspartner)
  - Nutzer von NexSign: Vertriebspartner, Manager und Leitung, die für NexAI unterschreiben, einschließlich der Gesellschafter; ihre Zeichnungsvollmacht kommt aus dem Portal (A12)
  - im Dokument genannte Personen
- **Daten** (PGlite-Datenbank `/app/.data/pglite`, Dateien `/app/.data/dateien`, Coolify-Volume `hhaatdfcphfsy3gfknzr7y2w-nexsign-data`):
  - `nutzer`: Konto-Spiegel aus dem Portal (Name, E-Mail, Rolle, Inhaber, aktiv, letzte Anmeldung).
  - `sitzungen`: nur der Hash des Cookies, 30 Tage.
  - `uebergaben`: Kennung des Einmal-Ausweises aus dem Portal, gilt 2 Minuten und einmal.
  - `vorgaenge`:
    - Titel, Status, Ersteller
    - Pfade und SHA-256 von Original-, Arbeits- und Endfassung, ursprünglicher Dateiname und Größe, Seitenzahl
    - Felder und Feldvorschläge; Einträge in Text- und Ankreuzfeldern (`angaben`)
    - Name, Portal-E-Mail und Unterschriftszeitpunkt der für NexAI unterzeichnenden Person
    - Link-Token nur als Hash und verschlüsselt, Ablauf, erster Abruf
    - vom Kunden: eingegebener Name, Zeitpunkt, **IP-Adresse und Browserkennung** der Unterschrift
    - Abschluss, Rückzug bzw. **Ablehnung durch den Kunden** (Zeitpunkt, freiwilliger Grund)
    - Zeitpunkte der Erinnerungen an den Ersteller (`erinnertAm`, `ablaufGewarntAm`)
  - `unterzeichner` (seit `b58b3f4`, cascade mit dem Vorgang): je unterzeichnende Person Rolle, Bezeichnung, Link als Hash und verschlüsselt, erster Abruf, eingegebener Name, Unterschriftszeitpunkt, **IP-Adresse und Browserkennung**. Die Kundendaten wurden aus `vorgaenge` hierher übernommen. Seit `841893c` (live 21.10.2026, 01:23 MESZ) schreibt NexSign beim Kunden nur noch Name und Zeitpunkt zusätzlich in `vorgaenge.kunde_name`/`kunde_unterschrieben_am` (für Liste, Vorgangsseite und Abschluss-Mail); `kunde_ip` und `kunde_browser` werden nicht mehr geschrieben. Migration 0006 hat die Bestandswerte geleert, wo sie in `unterzeichner` sicher vorliegen, und vorher fehlende dorthin übernommen; ohne Unterzeichner-Zeile bleibt der Altwert als einziger Nachweis stehen. Die Spalten fallen mit dem Vorgang weg.
  - `vorgaenge` zusätzlich: `bezeichnungen` (Rollenbezeichnungen), `abgelehnt_von` (Rolle der ablehnenden Person), `kopiePfad`/`kopieSha256` (Fassung für die Unterzeichner).
  - **Zeichnungsbefugnis im Vorgang** (seit `dcf9e86`, Migration 0005; alles `null` im Übergang):
    - `vertragsart` (`kunde` | `vertriebspartner` | `nur_gesellschafter`), `vertragsart_fest` (aus einer Vorlage mit fester Vertragsart)
    - `vp_name`: mit geprüfter Befugnis der **Name laut Vollmacht** aus dem Portal, sonst der Name des Portal-Kontos
    - `vp_stufe`, `vp_grundlage`, `vp_einzelvertretung` (nur Gesellschafter): Stand der Portal-Antwort im Moment der Unterschrift für NexAI. Die Urkundennummer erhält NexSign nicht.
    - `betraege` (nur Kundenverträge): Summe Listenpreis und Summe vereinbart in Cent, vom Unterzeichner für NexAI eingetragen
    - `genehmigung`: Gründe, Status (`offen` | `befuerwortet` | `genehmigt` | `abgelehnt`), `nurGesellschafter`, `durch` (Name und Funktion der entscheidenden Person), `durchName`, `am`
    - `unterzeichner.hinweis_bestaetigt`: die unterzeichnende Person hat den Pflicht-Hinweis bestätigt, wer für NexAI in welcher Funktion unterschreibt (§ 174 Satz 2 BGB; nur Kunden- und Vertriebspartnerverträge mit geprüfter Befugnis)
    - `vorlagen.vertragsart`: feste Vertragsart einer Vorlage
    - `ereignisse`: zusätzlich `genehmigung_noetig`, `befuerwortet`, `genehmigt`, `genehmigung_abgelehnt` mit handelndem Nutzer
    - **Puffer:** die Portal-Antwort je Konto-ID nur im Arbeitsspeicher, nicht in der Datenbank; verwendet wird sie höchstens 60 s (`PUFFER_MS`). Ein abgelaufener Eintrag bleibt im Speicher, bis dieselbe Person neu abgefragt wird, das Portal eine Änderung meldet (`pufferLeeren`) oder NexSign neu startet; abgelaufene Einträge räumt `befugnisVon` erst ab mehr als 500 Einträgen ab, eine feste Obergrenze gibt es nicht.
  - `ereignisse`: Aktion, handelnder Nutzer bzw. Rolle (`rolle`), Prüfsumme, Zeitpunkt. IP und Browserkennung gibt es nur beim **ersten Abruf eines Links** (je unterzeichnende Person; oft die Link-Vorschau eines Messengers oder das Gerät des Vertriebspartners), bei der Unterschrift und bei der Ablehnung jeder unterzeichnenden Person (`kunde_unterschrieben`, `kunde_abgelehnt`, jeweils mit `rolle`).
  - **Protokollseite, zwei Fassungen** (seit `84f05ec`):
    - **vollständige Fassung für NexAI** (`fertigPfad`): Name und Portal-E-Mail der für NexAI unterzeichnenden Person; je unterzeichnende Person Rolle, Name, Zeitpunkt, IP und Browserkennung; Einträge in den Feldern; der Ablauf einschließlich der IP des ersten Abrufs.
    - **Fassung für die Unterzeichner** (`kopiePfad`): Name, Portal-E-Mail und Zeitpunkt der für NexAI unterzeichnenden Person; je Person Rolle, Name, Zeitpunkt und Prüfsumme der unterschriebenen Fassung; Einträge in den Feldern; Ablauf ohne Abruf-Ereignisse; **ohne IP, Browserkennung und Abrufe**, mit dem Satz „Fassung für die Unterzeichner: IP-Adressen und Browserangaben stehen nur in der Fassung für NexAI.“ Gilt auch, wenn nur der Kunde unterschreibt. Grund: Art. 5 Abs. 1 lit. c (Empfehlung Rechtssitzung 21.10.2026).
    - Altfälle: Vorgänge, die vor dem 21.10.2026, 00:57 MESZ, abgeschlossen wurden, haben nur die vollständige Fassung; ihr Link liefert sie bis zum Ablauf der 30 Tage.
    - **Mit geprüfter Befugnis in beiden Fassungen** (`lib/server/pdf.ts`): Vertragsart, bei Kundenverträgen „Summe Listenpreis“ und „Summe vereinbart“ (Angabe NexAI), unter „Unterschrift für NexAI“ Name laut Vollmacht, „Unterschrieben als“ (Stufe) und „Grundlage“; je unterzeichnende Person „Zur Kenntnis genommen: Hinweis zur Unterschrift für NexAI“. Die Urkundennummer steht nirgends. Der Stempel im Dokument trägt Name und Stufe.
  - Inhalt des Vertrags (Firmenangaben, Ansprechpartner, Leistungen, Preise). Die Unterschrift existiert nur als Bild im PDF: kein gesondertes Unterschriftsbild, keine biometrischen Daten.
  - `vorlagen`: Name (vom Nutzer vergeben, Pflicht, nicht aus dem Dateinamen), Ersteller, „für alle“, Seitenzahl und **nur die Lage der Felder** (Art, Rolle, Pflicht, Seite, Position; `nurLage()`); höchstens 50 je Nutzer. **Kein PDF, kein Text aus dem Dokument, keine Einträge** (Entscheidung Max 20.10.2026, nexsign `5135347`; Migration 0002 hat alle älteren Vorlagen samt PDF gelöscht). Restrisiko: Ein Nutzer tippt einen Kundennamen in den Vorlagennamen; der Dialog bittet „ohne Kundennamen“.
  - `bremsen`: Missbrauchsbremse, Schlüssel nur als HMAC, gelöscht nach Ablauf des Fensters. `loeschliste`: Dateien, deren Löschen nachgeholt wird.
- **Rechtsgrundlage:**
  - Unterzeichnende Kunden, die selbst Vertragspartei sind (Einzelunternehmer): Art. 6(1)b.
  - Wer für ein Unternehmen unterschreibt: Art. 6(1)f. Berechtigtes Interesse von NexAI und Kunde ist ein wirksamer und nachweisbarer Vertragsschluss.
  - Nutzer von NexSign: Art. 6(1)b (Vertriebspartner- bzw. Dienstvertrag). Das Sitzungs-Cookie ist unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG).
  - Im Dokument nur genannte Personen: Art. 6(1)f (vollständige Vertragsdokumentation).
  - Aufbewahrung des Vertrags: Art. 6(1)c i. V. m. § 147 Abs. 1 Nr. 2, 3 bzw. 5, Abs. 3 Satz 1 AO (sechs Jahre). Dient er als Buchungsbeleg, gilt Nr. 4 (acht Jahre).
  - Protokoll (IP, Browserkennung, Zeitpunkte): Art. 6(1)f (Nachweis des Vertragsschlusses).
  - Weitere Unterzeichner sehen Unterschrift, Name und Zeitpunkt der anderen (Zwischenfassung und Fassung für die Unterzeichner): Art. 6(1)f. Berechtigtes Interesse aller Beteiligten: Jeder erhält den vollständig unterschriebenen Vertrag und den Nachweis, wer wann unterschrieben hat. IP und Browserkennung gehen nicht an sie (Datenminimierung).
  - Ablehnung samt Grund: Art. 6(1)b (vorvertragliche Maßnahme), wenn der Ablehnende selbst Vertragspartei wäre, sonst Art. 6(1)f. Berechtigtes Interesse: Der Ersteller und die Geschäftsführung erfahren davon und können nachfassen. Der Grund ist freiwillig.
  - Erinnerungen an den Ersteller: für seine Daten Art. 6(1)b (Zusammenarbeit mit NexAI); für den Abrufzeitpunkt des Kunden Art. 6(1)b bei Einzelunternehmern, sonst Art. 6(1)f (berechtigtes Interesse: vor Ablauf des Links nachfassen, damit der Vertrag zustande kommt).
  - Abfrage der Zeichnungsbefugnis und die Befugnis-Angaben im Vorgang, Stempel und Protokoll: wie A12, also Art. 6(1)b für Closer und Vertriebsleitung, Art. 6(1)f für Gesellschafter (Nachweis der Vertretungsmacht). Dass Name laut Vollmacht, Stufe und Grundlage auch in der Kundenfassung stehen, gehört zur Vertretung selbst: Der Vertragspartner muss erkennen können, wer in welcher Eigenschaft für NexAI handelt.
  - Bestätigung des Hinweises durch die unterzeichnende Person: wie ihre Unterschrift (Art. 6(1)b bzw. f); berechtigtes Interesse ist der Nachweis, dass NexAI die Bevollmächtigung mitgeteilt hat (§ 174 Satz 2 BGB).
  - Genehmigung samt Gründen und Mitteilung an den Unterzeichner für NexAI: bei Closern Art. 6(1)b (Vertriebspartnervertrag; § 91a HGB, Mitteilung nach § 86a Abs. 2 HGB), bei der Vertriebsleitung Art. 6(1)b (Vertriebsleitervertrag); hat ein Gesellschafter für NexAI unterschrieben (etwa „Zweiter Gesellschafter muss genehmigen“, § 720 Abs. 1 BGB), Art. 6(1)f wie A12 (Nachweis der Vertretung); für die Angaben über die entscheidende Person Art. 6(1)b bzw. bei Gesellschaftern Art. 6(1)f (Nachweis der Entscheidung).
- **Empfänger:**
  - Hetzner (DE, derselbe Server wie das Portal).
  - **Resend** (US, DPF) für die Abschluss-Mail an die Geschäftsführung (`NOTIFY_ADMIN`) und an den Ersteller. Das versiegelte PDF samt Protokollseite hängt als Anhang daran, wenn es höchstens 28 MB hat. Größere PDFs gehen nicht über Resend; die Mail enthält dann nur einen Link auf die Vorgangsseite in NexSign, die eine Anmeldung verlangt.
  - **Ablehnung:** Mail über Resend an dieselben Empfänger, mit Titel, Vorgangsnummer und Zeitpunkt, ohne PDF. Den Grund enthält sie nicht, nur den Hinweis, ob einer angegeben wurde. Den Grund sehen die Empfänger nur in NexSign, bis der Löschlauf ihn nach 7 Tagen mitnimmt (`203494e`).
  - **Erinnerungen** über Resend nur an den Ersteller: 3 Tage nach seiner Unterschrift („noch nicht unterschrieben“, mit Zeitpunkt des ersten Abrufs, der auch eine Messenger-Vorschau sein kann, oder „noch nicht abgerufen“) und 2 Tage vor Ablauf des Links. An den Kunden geht nichts.
  - Die unterzeichnenden Personen sehen vor ihrer Unterschrift die Zwischenfassung mit den schon gesetzten Unterschriften und laden nach dem Abschluss bis 30 Tage lang die **Fassung für die Unterzeichner** über ihren Link herunter (mit Name und Portal-E-Mail der für NexAI unterzeichnenden Person, ohne IP und Browserkennung).
  - Bei einer Ablehnung nennt die Mail an Geschäftsführung und Ersteller, wer abgelehnt hat (Rolle).
  - Den Link übermittelt der Ersteller selbst. Die Knöpfe WhatsApp, E-Mail und SMS öffnen nur sein eigenes Programm; NexSign speichert keine Kundenadresse und versendet den Link nicht.
  - Kein externer Signatur- oder Vertrauensdienst; die Felderkennung läuft lokal.
  - **Portal** (A12, derselbe Server): Abfrage der Zeichnungsbefugnis mit `{sub, ts}` (Konto-ID, Zeitstempel), signiert mit HMAC-SHA256 (`SIGN_HANDOFF_SECRET`), an `BEFUGNIS_URL`; Antwort siehe A12.
  - Mit geprüfter Befugnis nennt die **Abschluss-Mail** (Geschäftsführung und Ersteller, Resend) zusätzlich Vertragsart, Name laut Vollmacht und Stufe, Grundlage, bei Kundenverträgen beide Summen und, wenn nötig, „GENEHMIGUNG NÖTIG“ samt Gründen.
  - **Entscheidung über eine Genehmigung:** Mail über Resend an den Unterzeichner für NexAI (Ergebnis, wer entschieden hat, wann); bei „befürwortet“ zusätzlich an die Geschäftsführung (`NOTIFY_ADMIN`).
  - Die Vorgangsseite in NexSign zeigt Vertragsart, Name laut Vollmacht, Stufe, Grundlage und Summen allen, die den Vorgang sehen dürfen (siehe Zugriff).
- **Drittland:** US über Resend (DPF, hilfsweise SCC): Abschluss-Mail, Ablehnungs-Mail, Erinnerungen an den Ersteller und Mail zur Entscheidung über eine Genehmigung.
- **Löschung** (`lib/server/loeschlauf.ts`, beim Start und alle 24 Stunden):
  - Entwurf: 7 Tage nach der letzten Bearbeitung
  - offener Vorgang mit abgelaufenem Link (14 Tage gültig, eine Verlängerung setzt neu an): 7 Tage nach Ablauf
  - **Fassung für die Unterzeichner** (`kopiePfad`): 30 Tage nach Abschluss (`KOPIE_TAGE`, seit `84f05ec`); die vollständige Fassung bleibt
  - nach einer Ablehnung bleibt der Link-Hash bis zur Löschung des Vorgangs (7 Tage), damit der Link „Vorgang beendet“ zeigen kann; der verschlüsselte Link ist sofort weg
  - zurückgezogener oder **abgelehnter** Vorgang: Link und Dateien sofort (sonst über die Löschliste nachgeholt), Datensatz samt Grund nach 7 Tagen; das Ereignisprotokoll fällt mit dem Vorgang weg
  - Vorlagen: persönliche mit dem Konto-Spiegel (12 Monate nach der letzten Anmeldung), sonst bis zum Löschen durch den Ersteller oder die Leitung; freigegebene bleiben ohne Ersteller bestehen
  - Konto-Spiegel: 12 Monate nach der letzten Anmeldung, ohne Anmeldung ab Anlage. Das geht verlustfrei, weil Name und E-Mail im Vorgang stehen.
  - abgelaufene Sitzungen, Ausweise und Bremsen
  - **Abgeschlossene Vorgänge löscht der Lauf nie.** Sie werden aufbewahrt, solange der Vertrag läuft, und danach bis zum Ende der steuerlichen Aufbewahrungsfrist: sechs Jahre ab Schluss des Kalenderjahres der Unterzeichnung (§ 147 Abs. 3 Satz 1, Abs. 4 AO). Die Frist läuft aber nicht ab, solange der Vertrag für Steuern mit offener Festsetzungsfrist von Bedeutung ist (§ 147 Abs. 3 Satz 5 AO).
  - Praktische Regel: frühestens sechs Jahre nach Schluss des Kalenderjahres, in dem der Vertrag endet; dann löscht die Geschäftsführung von Hand.
  - Kopien der Abschluss-Mail folgen den Postfachregeln der Empfänger.
  - Befugnis-Angaben im Vorgang (Vertragsart, Stufe, Grundlage, Summen, Genehmigung, Hinweis-Bestätigung) haben keine eigene Frist: Sie gehören zum Vorgang und gehen mit ihm. Der Puffer der Portal-Antwort wird nach 60 s nicht mehr verwendet und liegt nur im Arbeitsspeicher (siehe oben). Die Vollmacht selbst liegt nur im Portal (A12, 6 Kalenderjahre nach dem Ende).
- **Zugriff (TOMs):**
  - Anmeldung nur über das Portal: signierter Einmal-Ausweis (HMAC, 2 Minuten); keine eigenen Passwörter.
  - Vertriebspartner und Manager sehen nur eigene Vorgänge. Inhaber, Geschäftsführung, Vertriebs- und Kommunikationsleitung sehen alle (`siehtAlles`).
  - Endgültig löschen dürfen nur Inhaber und Geschäftsführung (`darfLoeschen`). Empfehlungsgeber haben keinen Zugang (`darfBenutzen`).
  - Link-Token nur gehasht und verschlüsselt, Prüfsumme jeder Fassung im Protokoll, Siegel über das fertige PDF. Ohne konfiguriertes Siegel entsteht kein Vorgang.
  - Befugnis-Abfrage und Änderungsmeldung nur Server zu Server mit HMAC-Signatur und ±60-s-Zeitfenster; keine Sitzung, kein Cookie. Über Genehmigungen entscheiden nur Gesellschafter und Vertriebsleitung laut Portal-Antwort (`entscheider`), nie über den eigenen Vorgang.
- **Sicherungen:**
  - `/root/sicherung-dateien.sh` (Portal-Kiste, täglich 03:50 UTC) sichert das ganze Volume. Die App wird dafür kurz per `docker pause` angehalten, damit Datenbank und Dateien zueinander passen.
  - Verschlüsselt auf die CRM-Box, 30 Nächte. Der Wächter auf der CRM-Box meldet ab 26 Stunden ohne neues Archiv (seit 18.10.2026, 21:19 UTC).
  - Rückspielprobe mit dem echten Schlüssel am 18.10.2026 bestanden: 1.013 Dateien, Datenbank öffnet. Sie enthielt aber noch keine Vorgänge; nach den ersten echten Unterschriften wiederholen.
  - Quelle: nexai-portal `infra/`.
- **Besonderheiten:** Elektronische Signatur nach Art. 3 Nr. 10 eIDAS-VO, **weder fortgeschritten noch qualifiziert**. Sie genügt für formfreie Verträge und im Zweifel für vereinbarte Schrift- oder elektronische Form (§ 127 BGB), **nicht für die gesetzliche Schriftform** (§ 126 Abs. 1, 3, § 126a BGB), etwa Wettbewerbsabreden nach § 90a Abs. 1 HGB.
- **Datenschutzhinweis:**
  - Portal-Datenschutzerklärung Abschnitt 14 „Elektronische Unterschriften (NexSign)“, live seit dem Portal-Deploy vom 18.10.2026, 22:21 UTC (`9e6edcb`).
  - Auf der Kundenseite von NexSign ein Kurzhinweis und, getrennt davon, der Widerspruchshinweis.
  - Wortlaut: `~/Developer/recht/pruefungen/2026-10-18-unterschriften-datenschutz.md`, Teil E.
  - Zeichnungsbefugnis: Abschnitt 14 (Absatz „Zeichnungsbefugnis“ und Empfänger) und Abschnitt 9 im Zweig `recht/dse-vollmachten` des Portals, noch nicht gemergt.
- **✅ Mangel Vorlagen behoben (20.10.2026):** Bis `5135347` speicherten Vorlagen das hochgeladene PDF, meist einen echten Kundenvertrag, und unterliefen so die 7-Tage-Löschung (Art. 5 Abs. 1 lit. e, Art. 25 Abs. 1, Art. 32). Jetzt speichern sie nur noch die Lage der Felder; ältere Vorlagen sind gelöscht.
- **Vorgänger:** Das Portal-Modul „Unterschriften“ (18.10.2026, Tabellen `signature_requests`/`signature_events`) wurde nie mit echten Vorgängen genutzt; am 18.10.2026 um 22:30 UTC lagen dort 0 Datensätze. Der Menüpunkt leitet zu NexSign. Der Portal-Löschlauf (`unterschriftLiegengebliebenTage = 7`) bleibt für die leeren Tabellen aktiv.

### Löschfristen im Überblick

*Festgelegt am 06.09.2026. Ausschlaggebend ist immer die kürzeste anwendbare Frist; gesetzliche Aufbewahrungspflichten gehen vor.*

| Eintrag | Daten | Frist | Grundlage |
|---|---|---|---|
| A11 | Konto, Push-Abo | mit dem Konto | Zweckfortfall |
| A11 | Sitzungen | mit Ablauf | Zweckfortfall |
| A11 | **Sicherheitsprotokoll** | **12 Monate** | Art. 6(1)f, Nachvollziehbarkeit |
| A12 | Partner-Stammdaten | Vertragsende | Zweckfortfall |
| A12 | **Bankverbindung** | **nach letzter Provisionszahlung** | Zweckfortfall |
| A13 | Kunden, Aufträge | Vertragsende | Zweckfortfall |
| A14 | **Rechnungen** | **8 Jahre** ab Jahresschluss | § 14b UStG, § 147 AO — *technisch erzwungen* |
| A15 | **Leads** | **12 Monate** ab letztem Kontaktversuch | Art. 5(1)e |
| A15 | Anrufdokumentation | bleibt, verliert den Lead-Bezug | Provisionsbeleg (A12/A14) |
| A16 | Termine | **12 Monate** nach Terminende | Art. 5(1)e |
| A16 | **gebuchte Termine** | **6 Monate** | **öffentliche Zusage in der DSE** |
| A17 | Support-Vorgänge | **24 Monate** nach Abschluss | Nachweis/Gewährleistung |
| A17 | Team-Kanal, Direktnachrichten | **12 Monate** | Art. 5(1)e |
| A18 | Bibliothek | keine Regelfrist, **jährliche Sichtung** | Zweck besteht fort |
| A12 | **Zeichnungsvollmachten** (je Erteilung, auch abgelöste) | bis Ende des **6. Kalenderjahres** nach dem Jahr des Endes, gelöscht ab 01.01. J+7 (Berlin); geltende und künftige **nie**; unabhängig vom Konto | Art. 6(1)f, Nachweis der Vertretungsmacht (§§ 164, 177 BGB); `FRISTEN.vollmachtJahre`, `nexai-portal/lib/retention-sweep.ts` (PR #39) |
| A10 | Lernbereich | durch die Nutzerin / mit dem Konto | Zweckfortfall |
| A20 | **E-Mail-Kopie samt Anhaengen** | **keine Regelfrist**, Loeschung auf Verlangen | Zweitschrift des Postfachs, [A20](#a20-e-mail-agent-eigene-korrespondenz) |
| A19 | **Rollenspiele** + Auswertung | **12 Monate** | Leistungsdaten, Zweckfortfall |
| A19 | **Gesprächsmitschriften** + Auswertung | **6 Monate** | enthalten Daten Dritter |
| A19 | Frage-Verlauf | 12 Monate | Zweckfortfall |
| A19 | angefangene Video-Uploads | 24 Stunden | Hausordnung (Plattenplatz) |
| A19 | Lektionen, Einwände, Testfragen | keine Regelfrist | Firmenwissen |
| A19 | Testergebnisse, Vertriebsfreigabe | mit dem Konto | Qualifikationsnachweis |
| A19 | **eigene Notizen der Partner** | **mit dem Konto** | selbst verfasstes Arbeitsmaterial, `cascade` |
| A21 | Kandidaten ausgeschlossen, nie angereichert oder verworfen | **30 Tage** nach Auftragsende | nur noch Nachprüfung des Laufs |
| A21 | Kandidaten qualifiziert oder zur Prüfung, nicht exportiert | **6 Monate** nach Auftragsende | Signale veraltet |
| A21 | Kandidaten exportiert | **12 Monate** nach Export | wie A15 |
| A21 | Firma samt Kontakten, Belegen, Abrufen | sobald kein Kandidat mehr an ihr hängt | Zweckfortfall |
| A21 | **Personen** (Name, Funktion), auch im Abrufprotokoll | **12 Monate**, ohne aktiven Kandidaten **7 Tage** | Datenminimierung, vor der Art.-14-Frist |
| A21 | Suchaufträge, Abrufe ohne Firma | 24 Monate | Kosten und Trefferquoten |
| A21 | Outreach-Protokoll | 36 Monate | Beleg zu § 7 UWG |
| A21 | Tageszeilen Tageslauf (nur Zahlen) | 24 Monate | Messung, Betrieb |
| A21 | Schweiz-Prüfprotokoll (Prüfsumme, Prüfer, Zeitpunkt) | 36 Monate | Beleg lit. u UWG |
| A21 | **Sperrliste** (nur Prüfsumme) | **unbefristet** | Art. 21 Abs. 3 |
| A21 | Portal-Sicherungen | 30 jüngste Abzüge, rund **30 Tage** | Einrichtungsskript 22.09.2026 |
| A24 | NexSign: Vorgänge ohne Abschluss (Entwurf nach letzter Bearbeitung, Link abgelaufen, zurückgezogen) | **7 Tage** | Zweckfortfall |
| A24 | NexSign: **abgeschlossene Verträge** samt Protokoll | Vertragslaufzeit, dann i. d. R. **6 Jahre** ab Schluss des Jahres des Vertragsendes; von Hand | § 147 Abs. 3, 4 AO; Protokoll Art. 6(1)f |
| A24 | NexSign: Konto-Spiegel der Nutzer | **12 Monate** nach letzter Anmeldung | Zweckfortfall |
| A24 | NexSign: Sitzungen | 30 Tage | Ablauf |
| A24 | NexSign: abgelehnte Vorgänge samt Grund | Dateien sofort, Datensatz **7 Tage** | Zweckfortfall |
| A24 | NexSign: Fassung für die Unterzeichner (ohne IP/Browser) | **30 Tage** nach Abschluss, automatisch | Zweckfortfall (Download-Frist) |
| A24 | NexSign: Vorlagen (nur Feldlage und Name) | persönliche mit dem Konto-Spiegel (12 Monate), sonst bis zum Löschen | keine Kundendaten (`5135347`) |
| A22 | **Gespraechsinhalte** des Boten | **90 Tage** | Gespraech ist danach erledigt |
| A22 | Kontaktversuche Unbekannter | 30 Tage | nur Zaehler, nie der Text |
| A22 | Betriebsprotokoll | 365 Tage | Nachvollziehbarkeit im Betrieb |
| A22 | **Freigabeentscheidungen** zu Codeaenderungen | **1.095 Tage** | wer hat was an welchem System freigegeben |

> ⚠️ **Festgelegt ist nicht durchgesetzt.** Technisch erzwungen ist bislang **nur A14** (`nexai-portal/lib/retention.ts`). Für alle übrigen Fristen fehlt ein Löschlauf — bis der existiert, sind diese Werte eine Selbstverpflichtung auf dem Papier. → offener Punkt.

### A22 Bote (Nachrichtenvermittlung mit eigener Identitaet)
- **Zweck:** Ein Assistent mit **eigener Telefonnummer in Telegram**, der im Auftrag von Maximilian Trenk Nachrichten zustellt, selbst auf Antworten reagiert und gemeldete Stoerungen an eigener Software untersucht. Der Gegenueber fuehrt den Chat mit dem Assistenten, nicht mit Max. **Kein Kundenprodukt**, Werkzeug fuer einen einzelnen Nutzer.
- **Betroffene:** Gespraechspartner, die ausdruecklich eingetragen wurden (Geschaeftspartner, Vertriebspartner, Personen aus dem privaten Umfeld); **mittelbar Dritte**, die in Nachrichten vorkommen. Nicht eingetragene Personen: nur Telegram-Kennung und Zaehler, **kein Nachrichtentext**.
- **Daten:** Telegram-Kennung, selbst vergebener Name, Rolle und Rechte; **Nachrichtentexte in beide Richtungen**; daraus erzeugt: Antworten des Assistenten, Vorgaenge zu gemeldeten Stoerungen, Freigabeentscheidungen, Betriebsprotokoll (ohne Inhalte).
- **Rechtsgrundlage:** Art. 6(1)f (Organisation der eigenen Kommunikation, Betrieb eigener Software). Fuer Nachrichten aus dem **privaten** Umfeld greift fuer sich Art. 2 Abs. 2 lit. c; da sie im selben System liegen, werden sie nach dem strengeren Massstab behandelt.
- **Empfaenger:** **Telegram FZ-LLC (Dubai, VAE)** als Transportweg; **Anthropic PBC (US)** als Sprachmodell (Antworten und Untersuchungen); Hosting **Hetzner (DE)**. Die Datenbank liegt ausschliesslich auf dem eigenen Server in Deutschland.
- **Drittland:** **Zwei Transfers, einer davon ungeklaert.**
  - **Anthropic (US):** Art. 46 SCC, wie A20, siehe [TIA](TIA-Anthropic-Drittlandtransfer.md). Der Bote nutzt denselben Zugang.
  - **Telegram (VAE): ⚠️ offen.** Fuer die Vereinigten Arabischen Emirate gibt es **keinen Angemessenheitsbeschluss**, und ob Telegram Standardvertragsklauseln anbietet, ist **nicht geprueft**. Jede Nachricht laeuft ueber diesen Weg. **Vor einer Ausweitung auf weitere Gespraechspartner zu klaeren**, dazu gehoert auch, ob der Transportweg ueberhaupt eine eigene Verarbeitung im Sinne des Verzeichnisses ist oder blosse Uebermittlung wie bei einem Telefonanbieter.
- **Loeschung:** Fristen sind festgelegt und laufen taeglich automatisch (`src/loeschen.ts` im Repo `bote`): Gespraechsinhalte und abgeschickte Auftraege **90 Tage**, Kontaktversuche Unbekannter **30 Tage**, verbrauchte Aufnahmecodes **30 Tage**, Betriebsprotokoll **365 Tage**, Freigabeentscheidungen ueber Codeaenderungen **1.095 Tage** (Nachvollziehbarkeit, wer welche Aenderung an welchem System freigegeben hat). Ein Vorgang ueberlebt die Nachricht, auf die er verweist; der Verweis wird geloest. Eingetragene Personen werden vom Loeschlauf nie angefasst.
- **TOMs:** Nachrichtentexte **feldweise verschluesselt** (AES-256-GCM, Schluessel in `/etc/bote.env`, nur fuer root lesbar); **Allowlist**: wer nicht eingetragen ist, loest nichts aus und sein Text wird nicht gespeichert; Aufnahme nur ueber Einmalcode; die Schnittstelle hoert nur auf 127.0.0.1 und ist per Token geschuetzt; der Zugang zu den Zielsystemen haengt an einem Schluessel, der per `command=` auf ein festes Skript festgenagelt ist; `.env` und Schluesseldateien sind dort gesperrt; naechtliche Sicherung mit Rueckspielprobe, verschluesselt mit einem Zertifikat, dessen privater Teil **nicht** auf dem Server liegt.
- **Besonderheiten:**
  - **Art. 50 AI Act ist erfuellt.** Jede Person bekommt vor der ersten Nachricht den Hinweis, dass hier ein KI-System schreibt und dass Max mitliest. Technisch erzwungen: der Hinweis haengt am Versand, nicht am Prompt.
  - **Dritte loesen Arbeit an Produktivsystemen aus.** Gemeldete Stoerungen fuehren dazu, dass ein Agent Code liest und aendert. Er arbeitet nie auf dem Hauptzweig, rollt nie ohne ausdrueckliche Freigabe von Max aus, und Datenbank-Migrationen sind davon ausgenommen. Ein "ja" von einer anderen Person als Max bewirkt nichts.
  - **Der Agent sieht Code, keine Kundendaten.** `.env`, Schluessel und Datenbanken sind im Werkstattskript gesperrt, auch fuer die Suche.
  - **Eine Nachricht ist Information, keine Anweisung.** Der Systemtext kennzeichnet eingehenden Text ausdruecklich als Angabe einer Person. Umstimmungsversuche wurden am laufenden System geprueft und abgewehrt.
  - **Privat und geschaeftlich im selben System.** Nachrichten an Personen aus dem privaten Umfeld liegen in derselben Datenbank wie geschaeftliche. Eine Trennung waere technisch moeglich, ist aber nicht umgesetzt.


## Teil B — Als Auftragsverarbeiter für Kunden (Art. 30 Abs. 2)

**Kategorien von Verarbeitungen je Kunde (Verantwortlicher = Kunde):** Betrieb der beauftragten KI-Agenten. Details je Auftrag im Auftragsformular; Rollen in AVV §15.

| Verarbeitung (Agent) | Betroffene | Datenkategorien | Empfänger/Subunternehmer | Drittland | Löschung |
|---|---|---|---|---|---|
| Voice Agent (Inbound) | Anrufer des Kunden | Rufnummer, Gesprächsinhalt (flüchtig), Termin, Metadaten | Vapi (Orchestrierung + TTS), Soniox (STT, via Vapi), OpenAI (LLM), easybell, n8n@Hetzner, Google | US/IE (SCC/TIA bzw. DPF) | Termine ≤ 6 Mon.; keine Aufnahme (deaktiviert) |
| Chat Agent | Chat-Kontakte des Kunden | Nachrichten, Kontaktdaten, Anliegen | n8n@Hetzner, OpenAI, Google | IE/US (DPF/SCC); EU | ≤ 6 Mon. |
| Social-Media-Agent | Social-Kontakte des Kunden | Nachrichten, Profil-/Kontaktdaten | n8n@Hetzner, OpenAI, Plattform-APIs | je Plattform | ≤ 6 Mon. |
| Automatisierungen | je nach Workflow | Vorgangs-, Kontakt-, Termindaten | n8n@Hetzner, angebundene Dienste | i. d. R. EU | ≤ 6 Mon. |
| Individuelle KI-Agenten | fallweise | fallweise | fallweise (im Auftragsformular) | fallweise | ≤ 6 Mon. |
| Vertriebs-/Akquise-Agent | angesprochene Kontakte | Kontakt-/Firmendaten | Explorium, n8n@Hetzner, OpenAI, Google | je Anbieter | ≤ 6 Mon. |

**Allgemeine TOMs:** siehe AVV Anhang 1. **Drittlandgarantien:** DPF/SCC+TIA je Subunternehmer (AVV Anhang 2). **Grundsatz Nichtspeicherung**, Aufzeichnung/Transkription standardmäßig aus. **Besondere Kategorien (Art. 9):** nicht Gegenstand (AVV §3) — bei sensiblen Branchen Sensitivitäts-Riegel + juristische Prüfung.

---

## Bekannte Lücken dieses Verzeichnisses

*Das Portal ist mit A11–A18 nachgetragen (06.09.2026). Beim Eintragen sind folgende Punkte aufgefallen — sie stehen hier, damit sie nicht in den Einträgen untergehen.*

**✅ Löschfristen sind festgelegt und werden durchgesetzt** (Stand 06.09.2026). Der Löschlauf liegt in `nexai-portal/lib/retention-sweep.ts` und läuft einmal je Berliner Tag über das Server-Startup (`instrumentation.ts`); die Fristen stehen dort als benannte Konstanten mit Verweis auf dieses Verzeichnis. Rechnungen laufen weiterhin gesondert über `lib/retention.ts` (8 Jahre). Nachweis: `scripts/retention-sweep-check.ts` prüft gegen eine echte Datenbank, unter anderem die Monatsrechnung am Monatsende, beide Terminfristen in einem Lauf, das Überleben umgewandelter Leads und das Verschwinden von Anhängen von der Platte.

**🟡 Was der Löschlauf bewusst nicht anfasst:** Konten, Partner- und Kundenstammdaten sowie die Bibliothek. Deren Fristen hängen am Vertragsende oder an einer Entscheidung des Eigentümers und lassen sich nicht aus einem Datum ableiten — sie werden beim Löschen des jeweiligen Datensatzes wirksam.

**🔴 Keine eigenen Datenschutzhinweise für das Portal.** Die Website-DSE sagt für app.nex-a-i.com eigene Hinweise zu. Es existiert nur ein **unveröffentlichter Entwurf für den Lernbereich**; für Partner, Kunden und Mitarbeitende gibt es nichts.

**✅ Nachgetragen am 17.10.2026:** zwei Fristen, die der Löschlauf seit 10/2026 durchsetzt, standen bis dahin nicht in diesem Verzeichnis — **Protokollzeilen zu Rechnungen 9 Jahre** (jetzt in A11) und **Mail-Aufträge 36 Monate** (jetzt A23). Dabei fiel auf, dass die Mail-Aufträge als Verarbeitung **überhaupt nicht** verzeichnet waren, obwohl `mail_jobs` Empfänger und Inhalt der Mail führt; deshalb der neue Eintrag A23 statt nur einer Fristangabe.

**🔴 Art. 14 bei Leads (A15).** Die angesprochenen Unternehmen und Ansprechpartner sind **keine Vertragspartner** und haben ihre Daten nicht selbst gegeben. Informationspflicht, Herkunft der Daten und die Abwägung nach Art. 6(1)f sind zu dokumentieren; § 7 UWG betrifft die Ansprache selbst.

**✅ Erledigt am 08.09.2026 — Zwei-Faktor-Anmeldung im Portal** (A11). War hier als 🟠 geführt, weil das Portal Bankverbindungen (A12) und Rechnungen (A14) führt. TOTP ist jetzt Pflicht für alle Rollen mit Fremddatenzugriff; zusätzlich entfällt das Klartext-Passwort in der Zugangsmail zugunsten eines Einmal-Links. Damit ist auch P1 aus den Datenschutz-To-dos abgeräumt.

**🟠 Zugriff der Betreiber auf private Inhalte.** Direktnachrichten (A17) und der Lernbereich (A10) sind gegenüber anderen Nutzern abgeschottet, nicht gegenüber jemandem mit Datenbankzugang. Eine schriftliche Regelung dazu fehlt.

**🟠 Freitextfelder ohne Grenze.** `customers.notes` (A13), `leads.note`/`callNote` (A15), Termin-Notizen (A16) und die Lernunterlagen (A10) können besondere Kategorien enthalten, ohne dass etwas es verhindert.

**✅ Behoben am 18.10.2026: Datei-Sicherung.** Bis dahin sicherte die nächtliche Portal-Sicherung nur die Datenbank (`pg_dump`); hochgeladene Rechnungen und Belege (A14) und unterschriebene Verträge (A24) lagen ungesichert im Datei-Volume. Das verfehlte Art. 32 Abs. 1 lit. c DSGVO und § 147 Abs. 2 Nr. 2 AO.
- **Seit 18.10.:** `/root/sicherung-dateien.sh` sichert jedes Volume unter `/app/.data`, also die Portal-Uploads und NexSign. Es läuft täglich um 03:50 UTC, verschlüsselt auf die CRM-Box, 30 Nächte.
- **Wächter:** Punkt 4 ist ausgerollt (18.10., 21:19 UTC).
- **Rückspielprobe** mit dem echten Schlüssel bestanden (18.10.).
- **Ausgenommen:** Lektionsvideos (`*.mp4/.webm/.mov`, bis 4 GiB). `openssl smime` kann so große Archive nicht verlässlich entschlüsseln. Es ist Schulungsmaterial ohne Aufbewahrungspflicht.
- **Quelle:** nexai-portal `infra/` (PR #26).

**🟡 Rechtsgrundlage von A10** (Art. 6(1)b) ist eine vorläufige Einordnung und vom Anwalt zu bestätigen.

## Pflegehinweise
- Bei **neuem Subunternehmer**: hier + AVV Anhang 2 ergänzen, Kunden 14 Tage vorab informieren (AVV §9).
- Bei **Anbieterwechsel** (z. B. TTS weg von MiniMax): Zeilen A6/Teil B + Datenschutzerklärung §11 + AVV Anhang 2 angleichen.
- Bei **Recording-Änderung**: A6, Löschkonzept und DSE §11 anpassen.
