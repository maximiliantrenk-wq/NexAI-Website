# Beantwortung des Datenschutz-Fragenkatalogs

**Verantwortlicher:** NexAI – Next Generation Artificial Intelligence GbR
**Stand:** August 2026
**Zweck:** Faktenbasis für die anwaltliche Erstellung der Datenschutzerklärung (Homepage nex-a-i.com + KI-Software)

> Hinweis: Die folgenden Angaben sind eine technisch-organisatorische Bestandsaufnahme unserer tatsächlichen
> Datenverarbeitung. Die rechtliche Einordnung/Formulierung überlassen wir Ihnen. Wo eine Frage rechtlich zu
> bewerten ist oder ein Punkt bei uns noch in Umsetzung ist, haben wir das ausdrücklich vermerkt.

---

## I. Allgemeine Informationen zum Verantwortlichen

**1. Vollständiger Name:**
NexAI – Next Generation Artificial Intelligence GbR (Marke/Auftritt: „NEXAI").

**2. Anschrift:**
Untere Bergstraße 13, 74586 Frankenhardt-Honhardt, Deutschland.

**3. Kontaktmöglichkeiten:**
E-Mail: mbt@nex-a-i.com · Telefon: 0176 80714816 (zusätzlich 0172 8456815).
Datenschutz-Anfragen bitte an mbt@nex-a-i.com.

**4. Datenschutzbeauftragter:**
Derzeit ist **kein** Datenschutzbeauftragter benannt. Nach § 38 BDSG besteht keine Benennungspflicht, da nicht
in der Regel mindestens 20 Personen ständig mit automatisierter Verarbeitung beschäftigt sind (das Unternehmen
besteht aus zwei Gesellschaftern). **Bitte prüfen Sie**, ob sich aus Art. 37 Abs. 1 lit. b/c DSGVO wegen unserer
KI-gestützten Kerntätigkeit dennoch eine Benennungspflicht ergibt.

**5. Juristische Person / Rechtsform / Vertretung:**
Keine juristische Person, sondern eine **Gesellschaft bürgerlichen Rechts (GbR)** (rechtsfähige
Personengesellschaft). Vertretungsberechtigt sind die beiden Gesellschafter **Maximilian Trenk** und
**Jason Brian Merklein** (gemeinschaftlich). Beide haften persönlich.

**6. Handels-/sonstiges Register:**
Keine Eintragung. Eine GbR wird nicht ins Handelsregister eingetragen; eine Eintragung im
Gesellschaftsregister (eGbR) besteht ebenfalls nicht. Es gibt daher **keine Registernummer**.

**7. USt-IdNr. / Wirtschafts-IdNr.:**
USt-IdNr. nach § 27a UStG ist **in Beantragung** (bei Erteilung wird sie im Impressum ergänzt). Bis dahin
verwenden wir die Steuernummer. Eine Wirtschafts-Identifikationsnummer liegt uns nicht gesondert vor.

**8. Zuständige Aufsichtsbehörde:**
Datenschutzaufsicht: **Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
Baden-Württemberg (LfDI BW)**, Lautenschlagerstraße 20, 70173 Stuttgart. Eine berufsrechtliche Aufsicht
(zulassungspflichtige Tätigkeit) besteht nicht.

---

## II. Website-spezifische Datenverarbeitung

**1. Erhobene personenbezogene Daten:**
- Server-Logfiles beim Seitenaufruf: IP-Adresse, Zeitpunkt, angeforderte Inhalte, Referrer, Browser-/Geräteangaben.
- Kontakt- und Partnerformular: Name, E-Mail, Unternehmen, ggf. Website, Nachricht (Partnerformular zusätzlich Art des Unternehmens).
- Newsletter-Anmeldung: E-Mail-Adresse (nebst Opt-in-Nachweis).
- AI-Chat-Assistent: eingegebene Nachrichten sowie freiwillig genannte Kontaktdaten (Name, E-Mail, Telefon) und Anliegen.
- Online-Terminbuchung / AI-Telefonassistent: Name, E-Mail, Telefonnummer, Wunschtermin, Anliegen.

Es gibt **keine** Registrierungs-/Login-Daten (kein Nutzerkonto).

**2. Zwecke:**
Bereitstellung und Sicherheit der Website; Bearbeitung von Kontakt-/Partneranfragen; Newsletter-Versand
(auf Einwilligung); Beantwortung von Chat-Anfragen und Terminvereinbarung. **Keine** Webanalyse, **kein**
Tracking, **keine** Marketing-Cookies.

**3. Interaktive Funktionen:**
Kontaktformular, Partnerformular, Newsletter-Anmeldung, AI-Chat-Assistent, Online-Terminbuchung.
**Nicht vorhanden:** Login-/Kundenbereich, Kommentarfunktion, Bestell-/Shop-Funktion. Ein **Bewerberportal
gibt es nicht** — Stelleninteressenten werden auf das reguläre Kontaktformular geführt (kein Upload von
Bewerbungsunterlagen über die Website).

**4. Server-Logfiles:**
Ja. Enthalten IP-Adresse, Zeitpunkt, angeforderte Inhalte, Referrer, Browser. Zweck: Auslieferung und
Sicherheit. Speicherung 30 Tage. Erstellt durch unseren Hosting-Dienstleister Vercel Inc. (USA, DPF-zertifiziert).

**5. Verschlüsselung / Sicherheit:**
Die Website ist durchgängig per **TLS/HTTPS** verschlüsselt. Ergänzend: Rate-Limiting und ein geheimer
Header-Schlüssel auf den serverseitigen Schnittstellen, Honeypot-Felder gegen Bots, self-hosted Automatisierung
in Deutschland. Weitere TOMs siehe Abschnitt IX.

---

## III. KI-spezifische Datenverarbeitung

> Wichtige Klarstellung vorab: Wir **entwickeln und trainieren kein eigenes KI-Modell**. Wir setzen die
> **fertigen Modelle etablierter Anbieter im Betrieb (Inferenz)** ein und orchestrieren sie. Die Fragen 9–12
> (Trainingsdaten) betreffen uns daher nur mittelbar; die Antworten sind entsprechend eingeordnet.

**1. Art des KI-Systems:**
Große Sprachmodelle (Large Language Models). Konkret zwei Anwendungen:
(a) **Chat-Assistent** auf der Website (LLM von OpenAI);
(b) **Telefon-/Sprachassistent** (Orchestrierung über Vapi; Spracherkennung/STT über Deepgram; LLM und
Sprachsynthese/TTS über OpenAI).

**2. Zweck der KI:**
Dialogbasierte Beantwortung von Anfragen und Terminvereinbarung (Text- bzw. Sprachdialog). **Keine**
Bilderkennung, **kein** Scoring/Profiling, **keine** Prognosen, **keine** Empfehlungssysteme.

**3. Werden personenbezogene Daten eingespeist?**
Ja, soweit der Nutzer sie selbst eingibt/nennt: Kontaktdaten (Name, E-Mail, Telefon) und der frei formulierte
Gesprächs-/Nachrichteninhalt (Anliegen, Wunschtermin). Besondere Kategorien werden nicht gezielt erhoben
(siehe Abschnitt VIII).

**4. Training oder Betrieb?**
Ausschließlich **Betrieb (Inferenz)**. Die Daten werden **nicht** zum Training der KI-Modelle verwendet; mit
OpenAI besteht eine „No-Training"-Vereinbarung (API-Nutzung).

**5. Automatisierte Entscheidung im Einzelfall (Art. 22):**
**Nein.** Das System trifft keine Entscheidung mit rechtlicher Wirkung oder erheblicher Beeinträchtigung. Es
beantwortet Fragen und schlägt Termine vor; die eigentliche geschäftliche Entscheidung (Beratung, Angebot,
Vertrag) treffen die Gesellschafter persönlich.

**6. Schutzmaßnahmen bei automatisierter Entscheidung:**
Entfällt mangels automatisierter Einzelentscheidung. Ein menschlicher Kanal steht jederzeit zur Verfügung
(Telefon, Rückruf, E-Mail); der Assistent stellt bei Bedarf auf menschliche Bearbeitung um.

**7. Datenschutz-Folgenabschätzung (DSFA):**
Noch **nicht** durchgeführt. Da keine Gesprächsaufzeichnung erfolgt und keine besonderen Kategorien gezielt
verarbeitet werden, schätzen wir das Risiko als begrenzt ein; wir bitten Sie um Einschätzung, ob für den
Sprachassistenten eine DSFA nach Art. 35 erforderlich ist.

**8. Transparenz der KI:**
Der KI-Charakter wird **offengelegt**: im Chat durch den Hinweis, dass mit einem KI-System kommuniziert wird;
im Telefonassistenten durch eine Ansage zu Gesprächsbeginn (auch im Hinblick auf Art. 50 KI-Verordnung). Es
handelt sich um generative Sprachmodelle ohne intransparente Bewertungs-/Entscheidungslogik.

**9./10. Trainingsdaten und deren Herkunft:**
Wir verwenden **keine eigenen Trainingsdaten** und trainieren keine Modelle. Die eingesetzten Modelle wurden
von den Anbietern (OpenAI, Deepgram) mit deren eigenen Datenbeständen vortrainiert; hierauf haben wir keinen
Einfluss und keine Kenntnis im Einzelnen. Nutzereingaben aus unseren Systemen fließen nicht in ein Training ein.

**11. Anonymisierung/Pseudonymisierung der Trainingsdaten:**
Entfällt für uns (kein Eigentraining).

**12. Zweckbindung der Trainingsdaten:**
Entfällt für uns; für die produktive Nutzung gilt die „No-Training"-Zusage des Modellanbieters
(Verarbeitung nur zur Erbringung der Antwort, nicht zur Modellverbesserung).

---

## IV. Cookies und Tracking-Technologien

**1. Cookies:**
Die Website setzt **keine Cookies** zu Analyse- oder Marketingzwecken. Es werden auch keine sonstigen Cookies
zu Tracking-Zwecken verwendet.

**2. Zwecke der Cookies:** Entfällt (keine Cookies).

**3. Third-Party-Cookies:** Keine.

**4. Durch Cookies gespeicherte Informationen:** Entfällt.

**5. Cookie-Consent-Manager / Einwilligungsbanner:**
Nicht implementiert und nach unserer Einschätzung **nicht erforderlich**, da keine einwilligungspflichtigen
Cookies/Technologien zum Einsatz kommen (§ 25 TDDDG). Bitte bestätigen Sie diese Einschätzung.

**6./7./8. Einholung/Information/Widerruf der Einwilligung:** Entfällt (keine einwilligungspflichtigen Cookies).

**9. Andere Technologien (Web-Beacons, Pixel, Fingerprinting, Local Storage):**
Der AI-Chat nutzt den **sessionStorage** des Browsers, um den Gesprächsverlauf während einer Sitzung zu halten
(zufällige Sitzungskennung + Nachrichten der Sitzung). Diese Daten sind rein technisch notwendig und werden
beim Schließen des Browser-Tabs gelöscht. **Kein** Fingerprinting, **keine** Zählpixel/Web-Beacons, **kein**
dauerhafter localStorage zu Tracking-Zwecken.

**10. Analysetools (Google Analytics, Matomo o. ä.):**
Keine. Es ist **kein** Webanalyse-/Statistiktool im Einsatz.

**11. Social-Media-Plugins / Share-Buttons:**
Keine eingebetteten Plugins oder Share-Buttons. Auf der Team-Seite befinden sich lediglich einfache
**Verlinkungen** zu Instagram-Profilen (normale Links, kein datenübertragendes Plugin).

---

## V. Datenübermittlung und Empfänger

**1. Interne Stellen:**
Zugriff haben die beiden Gesellschafter (Maximilian Trenk, Jason Brian Merklein). Weiteres Personal mit
Datenzugriff besteht nicht; ein etwaiger externer Vertriebspartner wird nur auf gesonderter vertraglicher
Grundlage und nur bei Bedarf eingebunden.

**2. Gemeinsame Verantwortlichkeit (Art. 26):**
Für die Website besteht **keine** gemeinsame Verantwortlichkeit. (Für im Kundenauftrag betriebene KI-Agenten
sind wir Auftragsverarbeiter des jeweiligen Kunden, nicht gemeinsam Verantwortliche.)

**3./4. Externe Dienstleister / Auftragsverarbeiter (mit AVV):**

| Dienstleister | Funktion | Sitz | Rolle |
|---|---|---|---|
| Vercel Inc. | Website-Hosting, Server-Logs | USA (DPF) | Auftragsverarbeiter |
| Resend, Inc. | Versand der Formular-/Newsletter-E-Mails | USA (DPF) | Auftragsverarbeiter |
| OpenAI Ireland Ltd. (ggf. OpenAI L.L.C.) | LLM + Sprachsynthese | Irland/USA (DPF) | Auftragsverarbeiter |
| Google Ireland Ltd. (ggf. Google LLC) | Kalender, Tabellen, E-Mail-Postfach | Irland/USA (DPF) | Auftragsverarbeiter |
| Vapi, Inc. | Sprachassistent-Orchestrierung | USA (SCC) | Auftragsverarbeiter |
| Deepgram, Inc. | Spracherkennung (STT) | USA (SCC) | Auftragsverarbeiter |
| easybell GmbH | SIP-Telefonanbindung | Deutschland | TK-Anbieter |
| Hetzner Online GmbH | Server der selbst betriebenen Automatisierung (n8n) | Deutschland | Auftragsverarbeiter |

Mit den Auftragsverarbeitern bestehen bzw. werden Auftragsverarbeitungsverträge nach Art. 28 DSGVO
geschlossen (teils Self-Service-DPA im jeweiligen Konto — Abschluss teilweise **noch offen**). Bei easybell
gehen wir davon aus, dass als TK-Anbieter (§ 88 TKG) **kein** AVV erforderlich ist — bitte bestätigen.

**5. Drittstaatenübermittlung:**
Übermittlung in die **USA** bei Vercel, Resend, OpenAI, Google, Vapi, Deepgram. Grundlage: für DPF-zertifizierte
Empfänger (Vercel, Resend, OpenAI, Google) der **Angemessenheitsbeschluss (Art. 45)**; für Vapi und Deepgram
die **EU-Standardvertragsklauseln (Art. 46)** nebst ergänzenden Maßnahmen (TIA in Vorbereitung). Eine frühere
Sprachsynthese über einen Anbieter in China wurde auf OpenAI umgestellt; eine China-Übermittlung findet
**nicht mehr** statt.

---

## VI. Speicherdauer und Löschung

**1./2. Speicherfristen und Kriterien:**

| Datenkategorie | Regelfrist | Kriterium |
|---|---|---|
| Kontakt-/Partneranfragen | bis Abschluss der Bearbeitung | Zweckfortfall |
| Interessenten-/Leaddaten | 6 Monate | Zweckfortfall |
| Termindaten (Online-Buchung) | 12 Monate | Zweckfortfall |
| Chatverläufe | 6 Monate | Zweckfortfall |
| Termindaten (Telefonassistent) | 6 Monate | Zweckfortfall |
| Newsletter | bis zum Widerruf | Einwilligung |
| Server-/Zugriffslogs | 30 Tage | Sicherheit/Zweckfortfall |
| Anrufe (Sprachassistent) | **keine Aufzeichnung** | Datenminimierung |
| Vertrags-/Rechnungsdaten | 8 bzw. 10 Jahre | § 147 AO, § 257 HGB |

**3. Löschung:**
Nach Fristablauf bzw. Zweckfortfall. Bestehen gesetzliche Aufbewahrungspflichten, werden die Daten für deren
Dauer gesperrt und danach gelöscht. Die automatisierte Umsetzung der Löschroutinen (Kalender/Tabellen,
Automatisierungs-Historie) ist teilweise **noch in Umsetzung**.

---

## VII. Betroffenenrechte

**1. Information:**
In der Datenschutzerklärung wird über die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der
Verarbeitung, Datenübertragbarkeit und Widerspruch, den jederzeitigen Widerruf erteilter Einwilligungen sowie
das Beschwerderecht bei der Aufsichtsbehörde (LfDI BW) informiert.

**2. Ausübung:**
Formlos per E-Mail an mbt@nex-a-i.com (alternativ postalisch an die oben genannte Anschrift). Anfragen werden
innerhalb der gesetzlichen Frist (grundsätzlich ein Monat) bearbeitet.

---

## VIII. Besondere Kategorien von Daten

**1. Verarbeitung besonderer Kategorien (Art. 9):**
Besondere Kategorien personenbezogener Daten (z. B. Gesundheits-, biometrische, ethnische, politische,
religiöse Daten) werden **nicht gezielt** erhoben oder verarbeitet und sind nicht Gegenstand unserer Angebote.
Da Chat und Telefonassistent Freitext-/Freisprach-Eingaben zulassen, kann ein Nutzer solche Angaben theoretisch
von sich aus machen; sie werden von uns nicht angefordert, nicht gezielt ausgewertet und unterliegen den
allgemeinen Löschfristen.

**2. Rechtsgrundlage:**
Entfällt mangels gezielter Verarbeitung. Sollte im Einzelfall eine Verarbeitung besonderer Kategorien
erforderlich werden, stützen wir uns auf die ausdrückliche Einwilligung (Art. 9 Abs. 2 lit. a).

---

## IX. Technische und organisatorische Maßnahmen (TOMs)

**1. Umgesetzte Maßnahmen:**
- **Verschlüsselung:** durchgängig TLS/HTTPS (Transport); Verarbeitung über verschlüsselte Verbindungen zu den Dienstleistern.
- **Zugriffskontrolle:** Zugang zu Konten und Systemen nur für die Gesellschafter, passwortgeschützt (Zwei-Faktor-Authentisierung, wo verfügbar).
- **Datenminimierung:** keine Cookies, kein Tracking, keine Anrufaufzeichnung; Automatisierung self-hosted in Deutschland (Hetzner).
- **Schnittstellen-Sicherheit:** geheimer Header-Schlüssel und Rate-Limiting auf den serverseitigen Endpunkten, Honeypot-Felder gegen automatisierte Formularabsendungen.
- **Auftragsverarbeitung:** Einsatz geprüfter Dienstleister mit AVV und geeigneten Drittlandgarantien.

**2. Integrität, Vertraulichkeit, Verfügbarkeit:**
Vertraulichkeit durch Zugriffsbeschränkung und Verschlüsselung; Integrität durch kontrollierte Schnittstellen
und serverseitige Validierung der Buchungs-/Formulardaten; Verfügbarkeit und Datensicherung über die
Managed-Infrastruktur der eingesetzten Anbieter (Vercel, Google, Hetzner).

**In Umsetzung / Härtung:** zusätzliche Signatur (HMAC) der Automatisierungs-Webhooks, Rotation des
Automatisierungs-API-Schlüssels, Aktivierung des Verlaufs-Prunings in der Automatisierungsinstanz.

---

## Offene Punkte (unsere Seite, in Umsetzung)

1. Abschluss der noch offenen AVV/DPA (u. a. Resend, Vapi, Deepgram, OpenAI, Google Workspace, Hetzner, Vercel).
2. Technische Umsetzung des **Double-Opt-In** für den Newsletter vor tatsächlichem Versand.
3. Automatisierte Umsetzung des Löschkonzepts (Kalender/Tabellen/Verlaufs-Pruning).
4. Dokumentation der Transfer-Impact-Assessments (Vapi, Deepgram).
5. Sicherstellen der KI-Ansage zu Gesprächsbeginn beim Telefonassistenten (Art. 50 KI-VO).

*Diese Aufstellung ist eine Selbstauskunft zum tatsächlichen Verarbeitungsstand und ersetzt keine
Rechtsberatung.*
