# NexAI — DSGVO-Audit & Maßnahmenkatalog

**Stand:** August 2026
**Erstellt für:** NexAI – Next Generation Artificial Intelligence GbR (Maximilian Trenk, Jason Brian Merklein)
**Umfang:** Website nex-a-i.com, Geschäftsmodell, alle KI-Agenten & Automatisierungen, Auftragsverarbeiter, Drittlandtransfers.

> ⚠️ **Kein Rechtsrat.** Dieses Dokument ist eine sorgfältige technisch-organisatorische Bestandsaufnahme, **keine** verbindliche Rechtsberatung. Vor Veröffentlichung der Rechtstexte und vor Umsetzung der rechtlichen Punkte ist eine Prüfung durch einen Datenschutzbeauftragten / Fachanwalt für IT-Recht erforderlich.

**Grundlage:** Quellcode & Konfiguration des Website-Repos, der interne CRM-DSGVO-Blueprint (`nexai-crm/docs/*`), das Vertragswerk (`vertrag/`) und ein Live-Read-only-Check der Vapi-Konfiguration (Assistenten + Anrufliste, August 2026).

---

## 1. Executive Summary — risiko-sortierte Lückenliste

Legende: 🔴 hoch · 🟠 mittel · 🟡 niedrig · ✅ in diesem Durchgang behoben (Text/Doku) · ⏳ offen (nur Max/Anwalt/Config)

| # | Befund | Schwere | Status |
|---|---|---|---|
| 1 | **Vapi (USA) verarbeitet Anrufdaten deutscher Anrufer; Recording ist bei Vapi standardmäßig AN.** Der vorbereitete Text behauptete „keine Aufzeichnung". Kein DPF → USA-Transfer nur per SCC+TIA. | 🔴 | ⏳ Recording muss in Vapi ausgeschaltet werden (Anleitung §9). DSE-Text ist auf „keine Aufzeichnung" gesetzt — **erst live nehmen, wenn Recording nachweislich aus.** |
| 2 | **Live-Sprachausgabe läuft über MiniMax (China)** — in keiner DSE / keinem AVV genannt. China = kein Angemessenheitsbeschluss. | 🔴 | ✅ in DSE §11 + AVV Anhang 2 aufgenommen (SCC+TIA, erhöhtes Restrisiko). ⏳ Empfehlung: TTS auf EU-/DPF-Anbieter wechseln. |
| 3 | **Resend (USA) verarbeitete ALLE Formular-/Newsletter-Daten — nirgends genannt.** Undeklarierter Auftragsverarbeiter + USA-Transfer. | 🔴 | ✅ DSE §7 + §8 ergänzt (SCC). ⏳ AVV/DPA mit Resend abschließen. |
| 4 | **KI-Telefonassistent fehlte komplett in der Datenschutzerklärung.** | 🔴 | ✅ neuer DSE-Abschnitt §11 (Vapi/Deepgram/OpenAI/MiniMax/easybell/Hetzner). |
| 5 | **Newsletter ohne Rechtsgrundlage/Double-Opt-In** in der DSE nicht abgebildet. | 🟠 | ✅ DSE §8 (Art. 6(1)a + Double-Opt-In-Beschreibung). ⏳ Double-Opt-In technisch umsetzen, bevor tatsächlich versendet wird. |
| 6 | **AVV Anhang 2 veraltet:** nannte Make statt n8n, ElevenLabs statt Deepgram, MiniMax gar nicht; Resend/easybell/Hetzner fehlten; Hoster leer. | 🟠 | ✅ AVV korrigiert + neu gerendert (docx/pdf). |
| 7 | **Keine konkreten Löschfristen** in der DSE; **n8n-Execution-History speichert volle PII** (default unbegrenzt). | 🟠 | ✅ DSE §4 mit konkreten Fristen. ⏳ n8n-Execution-Pruning aktivieren. |
| 8 | **Kein Verzeichnis von Verarbeitungstätigkeiten (Art. 30)** als eigenständiges Dokument. | 🟠 | ✅ `VVT-Verarbeitungsverzeichnis.md` erstellt (Vorlage, von Max zu pflegen). |
| 9 | **Cold Outreach (Vertriebsagent + Explorium):** gescrapte Entscheider-E-Mails ohne Art.-14-Info und ohne UWG-Einwilligung. | 🟠 | ⏳ organisatorisch/rechtlich (siehe §7 dieses Dokuments). |
| 10 | **Impressum unvollständig:** keine Rechtsform, keine USt-IdNr; veralteter §-5-TMG-Verweis. | 🟡 | ✅ Rechtsform GbR, USt-Hinweis, §-5-DDG-Aktualisierung, VSBG-Hinweis, Adresse Frankenhardt-Honhardt. |
| 11 | §3 DSE nannte pauschal „Einwilligung" ohne Consent-Mechanismus; §7 unterschätzte sessionStorage. | 🟡 | ✅ §3 differenziert; sessionStorage-Beschreibung korrigiert. |
| 12 | **Reseller-Embed** (`public/chat-widget.js`) sendet direkt aus dem Besucher-Browser an n8n, ohne Consent-Ebene auf Kundenseiten. | 🟡 | ⏳ Kunden-DSE/AVV muss das abdecken. |
| 13 | Vapi-Webhooks unauthentifiziert · n8n-API-Key im Klartext geteilt · privates vs. Workspace-Google-Konto ungeklärt. | 🟡 | ⏳ TOMs/Sicherheit (siehe §8). |
| 14 | Firmenname uneinheitlich; GbR = persönliche Haftung; keine Versicherung. | 🟡 | ✅ Name in DSE/Impressum/AVV auf „…Artificial…" vereinheitlicht. ⏳ UG/GmbH + Versicherung prüfen. |

**Was bereits gut war (kein Handlungsbedarf):** keine Cookies, kein Tracking/Analytics → **keine Consent-Banner-Pflicht**; Schriften selbst gehostet (kein Google-Fonts-CDN); alle Browser-Requests first-party; Vercel/OpenAI/Google in der DSE bereits mit DPF/SCC genannt; Chatbot legt KI-Charakter offen (EU-AI-Act); IP-Adresse wird nur flüchtig als Rate-Limit-Schlüssel genutzt, nicht gespeichert.

---

## 2. Rollen & Rechtsgrundlagen (die zentrale Weiche)

NexAI hat **zwei datenschutzrechtliche Rollen**, die sauber getrennt gehören:

- **Verantwortlicher (Art. 4 Nr. 7):** eigene Website, eigenes Marketing/Newsletter, eigene Demo-Telefonnummer, **eigene Lead-Recherche/Neukundengewinnung**. → geregelt in der Website-**Datenschutzerklärung** + im **Verarbeitungsverzeichnis Art. 30(1)**.
- **Auftragsverarbeiter (Art. 28):** wenn NexAI Agenten **für Kunden** betreibt und dabei die Endkunden-Daten des Kunden verarbeitet (Voice/Chat/Social/Automation/Custom). → geregelt in **Anlage B (AVV)** + **Verarbeitungsverzeichnis Art. 30(2)**.
- **Grenzfall (Art. 26 gemeinsame Verantwortung oder eigenständig):** **Vertriebs-/Akquise-Agent**, wenn NexAI selbst Kontakte recherchiert — je Auftrag festzulegen (AVV §15).

---

## 3. Website nex-a-i.com (NexAI = Verantwortlicher)

| Verarbeitung | Daten | Empfänger | Rechtsgrundlage | Status |
|---|---|---|---|---|
| Aufruf der Website | IP, Zeit, Inhalt, Referrer, Browser (Server-Logs) | Vercel (USA, DPF) | Art. 6(1)f | ✅ DSE §6, Log-Frist 30 Tage ergänzt |
| Kontakt-/Partnerformular | Name, E-Mail, Unternehmen, Website, Nachricht | Resend (USA) → Postfach mbt@nex-a-i.com | Art. 6(1)b/f | ✅ DSE §7 (war undeklariert) |
| Newsletter | E-Mail | Resend (USA) | Art. 6(1)a | ✅ DSE §8 · ⏳ Double-Opt-In umsetzen |
| Chat-Assistent | Nachrichten, ggf. Kontaktdaten | n8n (Hetzner DE) → OpenAI (IE/US), Google (Calendar/Sheets) | Art. 6(1)b/f | ✅ DSE §9 (sessionStorage-Beschreibung + Hetzner ergänzt) |
| Online-Terminbuchung | Name, E-Mail, Slot, Anlass | n8n (Hetzner DE) → Google Calendar; Resend (interne Notiz) | Art. 6(1)b | ✅ DSE §10 (Hetzner ergänzt) |
| KI-Telefonassistent | Rufnummer, Name, Anliegen, Wunschtermin | Vapi (US), Deepgram (US), OpenAI (IE/US), MiniMax (China), easybell (DE), n8n/Hetzner (DE), Google (IE/US) | Art. 6(1)b/f | ✅ DSE §11 (war komplett offen) |

**Cookies / Consent / Analytics / Fonts:** Es werden keine Cookies zu Analyse-/Marketingzwecken gesetzt, keine Tracking-/Analysedienste geladen, die Schriften sind selbst gehostet. Ein **Cookie-Consent-Banner ist daher nicht erforderlich** (Stand jetzt). Wird künftig Web-Analytics eingeführt, ist ein Consent-Banner (§ 25 TDDDG) und ein DSE-Abschnitt nötig.

---

## 4. Tools / Agenten / Automatisierungen — WO Daten gespeichert werden

| Dienst | Zweck | **Speicherort / Land** | Was liegt dort | Drittland | AVV/DPA |
|---|---|---|---|---|---|
| **Vapi Inc.** | Voice-Orchestrierung, Telefonie | **USA** | Anruf-Metadaten (Rufnummer, Zeit, Dauer, Status), Transkripte (falls aktiv), **Recording (default AN)**, Logs | kein DPF → SCC+TIA | ⏳ DPA (ggf. Enterprise); ZDR aktivieren |
| **Deepgram, Inc.** | Speech-to-Text | **USA** (über Vapi) | Audio → Text | SCC+TIA | ⏳ via Vapi prüfen |
| **MiniMax** | Text-to-Speech (Live-Assistenten) | **China** | Antworttext (kann Namen enthalten) | kein Angemessenheitsbeschluss → SCC+TIA, hohes Restrisiko | ⏳ kein AVV; **wechseln empfohlen** |
| **OpenAI** | LLM (Voice gpt-4o, Chat gpt-4.1-mini) | **IE/USA** | Prompt/Transkript | DPF/SCC, No-Training (API) | ✅ OpenAI Ireland |
| **easybell GmbH** | SIP-Telefonie-Trunk | **Deutschland** | Verbindungsdaten | EU | ⏳ AVV bestätigen |
| **Google (Calendar/Sheets/Gmail)** | Termine, Leads, Bestätigungen | **IE/USA** | Name, E-Mail, Telefon, Termin | DPF/SCC (Workspace-CDPA) | ⏳ Workspace-AVV bestätigen |
| **Resend, Inc.** | Formular-/Transaktions-E-Mail | **USA** | Formular-/Newsletter-Daten (in Transit + Logs) | SCC (kein DPF) | ⏳ DPA abschließen |
| **n8n (self-hosted)** | Automatisierung, Lead-Speicherung | **Hetzner, Deutschland** | **Execution-History mit voller PII** (default unbegrenzt) + Leads (derzeit zusätzlich Google Sheets) | EU (reiner EU-Vorgang) | ⏳ Hetzner-AVV; Execution-Pruning |
| **Vercel Inc.** | Website-Hosting | **USA** | Zugriffs-Logs/IP | DPF (Art. 45) | ✅ genannt |
| **Explorium** | Lead-Recherche (Entscheider-E-Mails) | Datenprovider | B2B-Kontaktdaten | (Verantwortlichen-Rolle) | ⏳ siehe §7 |

**Kernaussagen (Antwort auf „wo speichern Vapi und n8n?"):**
- **Vapi = USA.** Transfers „primarily to the US", kein DPF gefunden, Recording standardmäßig AN. Live bestätigt: echte eingehende Anrufe mit deutschen Rufnummern (zuletzt 07.08.2026) auf Assistant „NexAI" (`6bb4f397`) und Vorlage „zum kopieren" (`0931afea`) → jeder künftige Kunden-Klon erbt die Einstellung. **Hebel = Zero Data Retention (Recording/Transkript aus).**
- **n8n = Hetzner/Deutschland (EU).** Positiv (reiner EU-Vorgang), **aber** die Execution-History speichert die kompletten Payloads (Name/E-Mail/Telefon/Nachricht) — ohne Pruning faktisch unbegrenzt. Leads sollen laut interner Entscheidung (13.07.) in eine EU-Data-Table statt Google Sheets; real läuft noch Google Sheets.

---

## 5. Drittlandtransfer-Landkarte (Art. 44 ff.)

- **Art. 45 (Angemessenheit / DPF):** Vercel, Google, OpenAI (soweit zertifiziert).
- **Art. 46 (SCC) + TIA erforderlich:** Vapi, Deepgram, Resend (kein DPF).
- **China (Sonderfall):** MiniMax → SCC + Zusatzmaßnahmen + TIA, **hohes Restrisiko** → TTS-Anbieter wechseln (EU/DPF) oder mit klarer Offenlegung/Einwilligung.
- **Handlungsbedarf:** **Transfer Impact Assessment (TIA)** für Vapi, Deepgram, Resend und MiniMax dokumentieren.

---

## 6. Löschfristen (in DSE §4 gesetzt, CRM-Defaults)

Leads 6 Monate · Termine 12 Monate · Chatverläufe 6 Monate · Sprach-Termindaten 6 Monate · **keine Anrufaufnahme** · technische Logs 30 Tage · Newsletter bis Widerruf · Kontaktanfragen bis Bearbeitungsende. Ausnahme: gesetzliche Aufbewahrung (§147 AO, §257 HGB) → sperren statt löschen. **Umzusetzen:** ein Löschkonzept/Cleanup in n8n + Google (sonst bleiben Sheets/Kalender unbegrenzt).

---

## 7. Neukundengewinnung / Cold Outreach (Vertriebsagent + Explorium)

- **§ 7 UWG:** B2B-Werbe-E-Mails brauchen grundsätzlich **vorherige ausdrückliche Einwilligung** (enge Ausnahme für Bestandskunden). Kalt-Mailing an gescrapte Entscheider-E-Mails ist rechtlich riskant → Konzept prüfen (z. B. Erstkontakt über andere Kanäle, dokumentierte Interessenabwägung).
- **Art. 14 DSGVO:** bei Erhebung aus fremder Quelle (Explorium) **Informationspflicht** gegenüber den Prospects — spätestens bei erster Ansprache, längstens binnen 1 Monat.
- **Art. 6(1)f:** Interessenabwägung dokumentieren; Widersprüche/Opt-outs führen und beachten.
- Die AVV-Rollenmatrix (§15) hält den Grenzfall bereits fest — die operative Compliance (Einwilligung, Art.-14-Text, Opt-out-Register) fehlt noch.

---

## 8. Betroffenenrechte, VVT, DSFA, Meldepflicht, DPO, TOMs

- **Betroffenenrechte (Art. 15–22):** in DSE §5 genannt; **operativer Ablauf** (zentrales Postfach, 1-Monats-Frist, PII-Auffinden über alle Systeme) definieren.
- **VVT (Art. 30):** siehe `VVT-Verarbeitungsverzeichnis.md` (Vorlage) — laufend pflegen.
- **DSFA/DPIA (Art. 35):** für den KI-Sprachassistenten (Voice-KI, US-/China-Kette) wahrscheinlich erforderlich → durchführen.
- **Meldepflicht (Art. 33/34):** Prozess festhalten — an die Aufsichtsbehörde unverzüglich, i. d. R. binnen 72 h; als Auftragsverarbeiter an den Verantwortlichen binnen 24 h (AVV §11.2).
- **DPO/DSB (Art. 37 / §38 BDSG):** nach Kopfzahl bei 2 Personen wohl nicht pflichtig; wegen Voice-KI/Umfang trotzdem juristisch prüfen lassen.
- **Aufsichtsbehörde:** LfDI Baden-Württemberg (in DSE §5 benannt).
- **TOMs/Sicherheit (offen):** Vapi-Webhooks per HMAC absichern; **n8n-API-Key rotieren** (wurde einmal im Klartext geteilt); Live-n8n-Google-Konto als **Workspace (mbt@nex-a-i.com)** verifizieren (nicht privates Gmail); n8n-Execution-Pruning.

---

## 9. EU AI Act (Art. 50 Transparenz)

- **Chat:** „Sie kommunizieren mit einem AI-System" ✅ (DSE §9 + Widget-Hinweis).
- **Voice:** Der Assistent **muss zu Gesprächsbeginn ansagen, dass es eine KI ist** → Vapi-Prompt prüfen/ergänzen (nur im Vapi-Dashboard änderbar). In der DSE §11 ist der Hinweis bereits als Zusage formuliert.

---

## 10. Vapi-Recording abschalten — Anleitung (Max)

Ich konnte den Recording-Status **nicht selbst** setzen: Der Vapi-API-Key ist durch die Sicherheits-Schranke gesperrt, und das Vapi-MCP-Tool kennt die Recording-Felder nicht. Bitte selbst erledigen — **schnellster Weg (Dashboard):**

1. Vapi-Dashboard → Assistant **„Terminbuchungs-Assistent für NexAI"** (`6bb4f397-836c-4dfa-9e23-9bbf2c0a2857`) → Advanced/Analysis → **Recording ausschalten** + **Transcript-Speicherung** minimieren.
2. Dasselbe für die Vorlage **„Voice Agent zum kopieren"** (`0931afea-519a-4bf3-a22c-4d066f03ae73`) — damit erben Kunden-Klone die Einstellung.
3. Prüfen, ob euer Plan **Zero Data Retention (ZDR)** erlaubt; wenn ja, aktivieren (stoppt Speicherung + Training).

**Alternativ per API** (mit eurem Vapi-Key, Header `User-Agent: curl/8.4.0`):
```
curl -sS -X PATCH https://api.vapi.ai/assistant/6bb4f397-836c-4dfa-9e23-9bbf2c0a2857 \
  -H "Authorization: Bearer <VAPI_KEY>" -H "Content-Type: application/json" -A "curl/8.4.0" \
  -d '{"artifactPlan":{"recordingEnabled":false,"transcriptPlan":{"enabled":false}}}'
```
Danach per `GET /assistant/<id>` gegenprüfen (Achtung: ein offener Dashboard-Tab kann API-Änderungen überschreiben).

**Wichtig:** Die DSE-Aussage „Das Gespräch wird nicht aufgezeichnet" (§11) und die Löschfristen (§4) sind darauf ausgelegt, dass Recording **aus** ist. Solange das nicht bestätigt ist, darf die neue Datenschutzerklärung **nicht live gehen** — oder §11 muss auf „mit Aufzeichnung" umformuliert werden (dann Ansage + Rechtsgrundlage/Einwilligung nötig).

---

## 11. Was dieser Durchgang geändert hat (Change-Log)

- **`messages/de/legal.json` + `messages/en/legal.json`:** Datenschutzerklärung von 8 auf 11 Abschnitte erweitert (neu: Übersicht, Kontakt-/Partnerformular+Resend, Newsletter, KI-Telefonassistent); §3 Rechtsgrundlagen differenziert; §4 konkrete Löschfristen; §5 Aufsichtsbehörde; §6 Server-Log-Frist + „keine Cookies/kein Tracking"; §9 sessionStorage-Korrektur + Hetzner; §10 Hetzner. Impressum: Rechtsform GbR, voller Firmenname, §-5-DDG-Aktualisierung, USt-Hinweis, VSBG-Hinweis, Adresse Frankenhardt-Honhardt. Stand → August 2026.
- **`vertrag/build/docs/04_AnlageB_AVV_Auftragsverarbeitung.json` (+ neu gerendert .docx/.pdf):** Firmenname „…Artificial…", Telefon 80714816; Anhang 2 auf reale Subunternehmer (Vapi, Deepgram, OpenAI, MiniMax/China, Google, easybell, Hetzner); §10 Drittland-Referenz korrigiert.
- **`compliance/DSGVO-AUDIT.md`** (dieses Dokument) + **`compliance/VVT-Verarbeitungsverzeichnis.md`** neu.

## 12. Offene Punkte (nur Max / Anwalt / Config) — Kurzliste

🔴 Vapi-Recording ausschalten (§10) · MiniMax/China ersetzen oder bewusst mit TIA behalten · AVV/DPA abschließen: Resend, Vapi, Deepgram, Google Workspace, OpenAI, easybell, Hetzner.
🟠 n8n Execution-Pruning + EU-Data-Table statt Google Sheets + Google-Workspace-Konto verifizieren + n8n-API-Key rotieren · TIA (Vapi/Deepgram/Resend/MiniMax) · DSFA (Voice) · Cold-Outreach-Compliance (UWG/Art. 14) · Newsletter-Double-Opt-In technisch umsetzen · VVT pflegen · Betroffenenrechte-/Meldeprozess definieren.
🟡 EU-AI-Act-Ansage im Voice-Prompt · Vapi-Webhooks HMAC · Reseller-Embed-Consent auf Kundenseiten · GbR→UG/GmbH + Versicherung · restliche 7 Vertragsdokumente auf Name/Telefon angleichen · `vertrag/build/docs/einfach-erklaert.json` (Klartext-Erklärung) auf reale Subunternehmer nachziehen.
⚖️ **Alles anwaltlich/DSB gegenlesen lassen, bevor die Rechtstexte live gehen.**
