# NexAI — DSGVO-Audit & Maßnahmenkatalog

**Stand:** August 2026 (Runde 2)
**Erstellt für:** NexAI – Next Generation Artificial Intelligence GbR (Maximilian Trenk, Jason Brian Merklein)
**Umfang:** Website nex-a-i.com, Geschäftsmodell, alle KI-Agenten & Automatisierungen, Auftragsverarbeiter, Drittlandtransfers.

> ⚠️ **Kein Rechtsrat.** Dieses Dokument ist eine sorgfältige technisch-organisatorische Bestandsaufnahme, **keine** verbindliche Rechtsberatung. Vor Veröffentlichung der Rechtstexte und vor Umsetzung der rechtlichen Punkte ist eine Prüfung durch einen Datenschutzbeauftragten / Fachanwalt für IT-Recht erforderlich.

**Grundlage:** Quellcode & Konfiguration des Website-Repos, der interne CRM-DSGVO-Blueprint (`nexai-crm/docs/*`), das Vertragswerk (`vertrag/`) und ein Live-Read-only-Check der Vapi-Konfiguration (Assistenten + Anrufliste, August 2026).

**Entscheidungen Max:** n8n = Hetzner (DE) · Löschfristen = CRM-Defaults · **Anrufaufzeichnung lässt sich (laut Max) nicht abschalten → offenlegen** (mit Ansage + Einwilligung, 30 Tage) · **Sprachausgabe von MiniMax/China auf OpenAI umgestellt.**

---

## 1. Executive Summary — risiko-sortierte Lückenliste

Legende: 🔴 hoch · 🟠 mittel · 🟡 niedrig · ✅ behoben (Text/Config in diesem Projekt) · ⏳ offen (Max/Anwalt/Config)

| # | Befund | Schwere | Status |
|---|---|---|---|
| 1 | **Anrufe werden von Vapi aufgezeichnet und in den USA gespeichert.** Der vorbereitete Text behauptete fälschlich „keine Aufzeichnung". | 🔴 | ✅ DSE §11 + §4 auf „wird aufgezeichnet" umgestellt (Einwilligung Art. 6(1)a, 30 Tage, US-Speicherung, SCC+TIA). ⏳ **Max: Aufnahme-Ansage in Vapi einbauen** (§ 201 StGB, siehe §10) — sonst rechtswidrig/strafbar. |
| 2 | **Live-Sprachausgabe lief über MiniMax (China)** — kein Angemessenheitsbeschluss. | 🔴 | ✅ **behoben:** Voice auf beiden Assistenten (`6bb4f397`, `0931afea`) per Vapi-API auf **OpenAI** umgestellt; China aus DSE §11 + AVV entfernt. ⏳ Max: Stimme anhören/`voiceId` ggf. anpassen. |
| 3 | **Resend (USA) verarbeitete ALLE Formular-/Newsletter-Daten — nirgends genannt.** | 🔴 | ✅ DSE §7 + §8 (SCC). ⏳ AVV/DPA mit Resend abschließen. |
| 4 | **KI-Telefonassistent fehlte komplett in der Datenschutzerklärung.** | 🔴 | ✅ neuer DSE-Abschnitt §11. |
| 5 | **Newsletter ohne Rechtsgrundlage/Double-Opt-In.** | 🟠 | ✅ DSE §8 (Art. 6(1)a + Double-Opt-In). ⏳ Double-Opt-In technisch umsetzen, bevor versendet wird. |
| 6 | **AVV Anhang 2 veraltet** (Make/ElevenLabs; Resend/easybell/Hetzner fehlten; Hoster leer). | 🟠 | ✅ AVV korrigiert + neu gerendert (Vapi, Deepgram, OpenAI (LLM+TTS), Google, easybell, Hetzner). |
| 7 | **Keine konkreten Löschfristen; n8n-Execution-History speichert volle PII** (default unbegrenzt). | 🟠 | ✅ DSE §4 mit konkreten Fristen (inkl. Anrufaufzeichnungen 30 Tage). ⏳ n8n-Execution-Pruning aktivieren. |
| 8 | **Kein Verzeichnis von Verarbeitungstätigkeiten (Art. 30).** | 🟠 | ✅ `VVT-Verarbeitungsverzeichnis.md` erstellt. |
| 9 | **Cold Outreach (Vertriebsagent + Explorium):** ohne Art.-14-Info & UWG-Einwilligung. | 🟠 | ⏳ organisatorisch/rechtlich (§7). |
| 10 | **Impressum unvollständig; veralteter §-5-TMG-Verweis.** | 🟡 | ✅ Rechtsform GbR, USt-Hinweis, § 5 DDG, VSBG, Frankenhardt-Honhardt. |
| 11 | §3 pauschale „Einwilligung" ohne Mechanismus; §7 sessionStorage unterschätzt. | 🟡 | ✅ §3 differenziert; sessionStorage korrigiert. |
| 12 | **Reseller-Embed** sendet direkt Browser→n8n, ohne Consent-Ebene auf Kundenseiten. | 🟡 | ⏳ Kunden-DSE/AVV muss das abdecken. |
| 13 | Vapi-Webhooks unauthentifiziert · n8n-API-Key im Klartext · privates vs. Workspace-Google-Konto. | 🟡 | ⏳ TOMs/Sicherheit (§8). |
| 14 | Firmenname uneinheitlich; GbR = persönliche Haftung; keine Versicherung. | 🟡 | ✅ Name vereinheitlicht (DSE/Impressum/AVV). ⏳ UG/GmbH + Versicherung prüfen. |

**Was bereits gut war:** keine Cookies, kein Tracking/Analytics → **kein Consent-Banner nötig**; Schriften self-hosted; alle Browser-Requests first-party; Vercel/OpenAI/Google mit DPF/SCC genannt; Chatbot legt KI-Charakter offen; IP nur flüchtig als Rate-Limit-Key.

---

## 2. Rollen & Rechtsgrundlagen

- **Verantwortlicher (Art. 4 Nr. 7):** eigene Website, Marketing/Newsletter, eigene Lead-Recherche, eigene Demo-Telefonnummer. → Website-DSE + VVT Art. 30(1).
- **Auftragsverarbeiter (Art. 28):** Betrieb von Agenten für Kunden (Voice/Chat/Social/Automation/Custom). → Anlage B (AVV) + VVT Art. 30(2).
- **Grenzfall (Art. 26 / eigenständig):** Vertriebs-/Akquise-Agent bei Eigenrecherche — je Auftrag (AVV §15).

---

## 3. Website nex-a-i.com (NexAI = Verantwortlicher)

| Verarbeitung | Empfänger | Rechtsgrundlage | Status |
|---|---|---|---|
| Website-Aufruf / Server-Logs | Vercel (US, DPF) | Art. 6(1)f | ✅ DSE §6, 30 Tage |
| Kontakt-/Partnerformular | Resend (US) → mbt@nex-a-i.com | Art. 6(1)b/f | ✅ DSE §7 |
| Newsletter | Resend (US) | Art. 6(1)a | ✅ DSE §8 · ⏳ Double-Opt-In |
| Chat-Assistent | n8n (Hetzner) → OpenAI, Google | Art. 6(1)b/f | ✅ DSE §9 |
| Online-Buchung | n8n (Hetzner) → Google; Resend (Notiz) | Art. 6(1)b | ✅ DSE §10 |
| KI-Telefonassistent (Aufzeichnung!) | Vapi (US), Deepgram (US), OpenAI (LLM+TTS), easybell (DE), n8n/Hetzner, Google | Art. 6(1)a/b/f | ✅ DSE §11 (Aufzeichnung offengelegt) · ⏳ Ansage in Vapi |

Cookies/Consent/Analytics/Fonts: keine → **kein Banner nötig** (Stand jetzt).

---

## 4. Tools / Agenten — WO Daten gespeichert werden

| Dienst | Zweck | **Speicherort / Land** | Was liegt dort | Drittland | AVV/DPA |
|---|---|---|---|---|---|
| **Vapi Inc.** | Voice-Orchestrierung, Telefonie | **USA** | Anruf-Metadaten (Rufnummer, Zeit, Dauer), **Anrufaufzeichnungen**, Transkripte, Logs | kein DPF → SCC+TIA | ⏳ DPA |
| **Deepgram, Inc.** | Speech-to-Text | **USA** (via Vapi) | Audio → Text | SCC+TIA | ⏳ via Vapi |
| **OpenAI** | LLM (gpt-4o / gpt-4.1-mini) **+ Sprachsynthese (TTS)** | **IE/USA** | Prompt/Transkript, Antworttext | DPF/SCC, No-Training (API) | ✅ OpenAI Ireland |
| **easybell GmbH** | SIP-Telefonie-Trunk | **Deutschland** | Verbindungsdaten | EU | ⏳ AVV bestätigen |
| **Google (Calendar/Sheets/Gmail)** | Termine, Leads, Bestätigungen | **IE/USA** | Name, E-Mail, Telefon, Termin | DPF/SCC | ⏳ Workspace-AVV |
| **Resend, Inc.** | Formular-/Newsletter-E-Mail | **USA** | Formulardaten (Transit + Logs) | SCC (kein DPF) | ⏳ DPA |
| **n8n (self-hosted)** | Automatisierung, Lead-Speicherung | **Hetzner, Deutschland** | Execution-History mit voller PII (default unbegrenzt) + Leads (derzeit Google Sheets) | EU | ⏳ Hetzner-AVV; Pruning |
| **Vercel Inc.** | Website-Hosting | **USA** | Zugriffs-Logs/IP | DPF | ✅ genannt |
| **Explorium** | Lead-Recherche | Datenprovider | B2B-Kontaktdaten | (Verantwortlicher) | ⏳ §7 |

**Kernaussagen (Antwort auf „wo speichern Vapi/n8n?"):**
- **Vapi = USA.** Kein DPF; **Anrufe werden aufgezeichnet** (laut Max nicht abschaltbar) → Aufnahmen liegen in den USA. Live bestätigt: echte Anrufe mit deutschen Rufnummern (zuletzt 07.08.2026) auf `6bb4f397` + Vorlage `0931afea`. Hebel bleibt: Aufnahme deaktivieren (spart die Einwilligung) — sonst Ansage + Einwilligung + 30-Tage-Löschung.
- **n8n = Hetzner/Deutschland (EU).** Execution-History speichert komplette Payloads → Pruning nötig. Leads laufen real noch über Google Sheets statt EU-Data-Table.
- **Aktueller Voice-Stack:** STT Deepgram (US) · LLM OpenAI gpt-4o · **TTS OpenAI** (früher MiniMax/China, umgestellt) · Orchestrierung Vapi (US) · Trunk easybell (DE) · Automatisierung n8n@Hetzner (DE).

---

## 5. Drittlandtransfer-Landkarte (Art. 44 ff.)
- **Art. 45 (DPF):** Vercel, Google, OpenAI (soweit zertifiziert).
- **Art. 46 (SCC) + TIA:** Vapi (inkl. Anrufaufzeichnungen), Deepgram, Resend (kein DPF).
- **China:** entfällt — TTS von MiniMax auf OpenAI umgestellt.
- **Handlungsbedarf:** TIA für Vapi/Deepgram/Resend dokumentieren.

---

## 6. Löschfristen (DSE §4)
Leads 6 Mon. · Termine 12 Mon. · Chatverläufe 6 Mon. · Sprach-Termindaten 6 Mon. · **Anrufaufzeichnungen 30 Tage** · technische Logs 30 Tage · Newsletter bis Widerruf. Ausnahme: gesetzliche Aufbewahrung (§147 AO/§257 HGB) → sperren. **Umzusetzen:** Löschmechanismus für Vapi-Aufnahmen (Aufbewahrungseinstellung oder Lösch-Job) + n8n/Google-Cleanup.

---

## 7. Cold Outreach (Vertriebsagent + Explorium)
- **§ 7 UWG:** B2B-Werbe-E-Mails brauchen grundsätzlich vorherige Einwilligung. Kalt-Mailing an gescrapte Entscheider ist riskant.
- **Art. 14:** Informationspflicht gegenüber Prospects (spätestens bei erster Ansprache / binnen 1 Monat).
- **Art. 6(1)f:** Interessenabwägung dokumentieren; Opt-outs führen.

---

## 8. Betroffenenrechte, VVT, DSFA, Meldepflicht, DPO, TOMs
- **Betroffenenrechte (Art. 15–22):** DSE §5; operativen Ablauf (Postfach, 1-Monats-Frist) definieren.
- **VVT (Art. 30):** `VVT-Verarbeitungsverzeichnis.md` pflegen.
- **DSFA/DPIA (Art. 35):** für Voice-KI **mit Aufzeichnung** jetzt umso wahrscheinlicher erforderlich → durchführen.
- **Meldepflicht (Art. 33/34):** Prozess (72 h Behörde / 24 h an Verantwortliche) festhalten.
- **DPO/DSB:** juristisch prüfen (Voice-KI + Aufzeichnung).
- **TOMs:** Vapi-Webhooks HMAC · n8n-API-Key rotieren · Google-Konto als Workspace verifizieren · n8n-Pruning.

---

## 9. EU AI Act (Art. 50) + § 201 StGB
- **Chat:** KI-Hinweis vorhanden ✅.
- **Voice:** Der Assistent muss zu Gesprächsbeginn ansagen, **dass es eine KI ist UND dass aufgezeichnet wird**. Das deckt EU-AI-Act (Art. 50) und die strafrechtliche Einwilligungspflicht bei Gesprächsaufzeichnung (§ 201 StGB) zugleich ab. Siehe §10.

---

## 10. Aufnahme-Ansage in Vapi einbauen (Max) — PFLICHT

Da aufgezeichnet wird, ist eine Ansage zu Gesprächsbeginn **rechtlich zwingend** (ohne Einwilligung ist die Aufzeichnung nach § 201 StGB strafbar). Ich kann die First Message per Vapi-MCP nicht zuverlässig setzen/verifizieren → bitte im Dashboard einbauen, auf beiden Assistenten (`6bb4f397` NexAI, `0931afea` Vorlage):

**First Message / Prompt-Anfang (Vorschlag):** *„Guten Tag, Sie sprechen mit dem KI-Terminassistenten von NexAI. Zur Bearbeitung Ihres Anliegens wird dieses Gespräch aufgezeichnet — wenn Sie nicht einverstanden sind, sagen Sie es mir bitte oder legen Sie auf. Wie kann ich Ihnen helfen?"*

- `firstMessageMode` = „assistant-speaks-first", damit die Ansage zuerst kommt.
- Löschmechanismus für die Aufnahmen sicherstellen (30 Tage; Vapi-Aufbewahrung oder Lösch-Job).

> **Der einfachere Weg bleibt:** `recordingEnabled:false` pro Assistent (normalerweise tarifunabhängig setzbar). Klappt das doch, sagt Max Bescheid → dann drehen wir DSE §11/§4 zurück auf „keine Aufzeichnung" und die Ansage entfällt.

---

## 11. Change-Log

**Runde 1 (commit `7614f26`):** DSE 8→11 Abschnitte (Resend, Newsletter, KI-Telefonassistent), konkrete Löschfristen, §3-Consent-Fix, sessionStorage, Hetzner, LfDI BW; Impressum (GbR, § 5 DDG, USt, VSBG, Frankenhardt-Honhardt); AVV Anhang 2 auf reale Subunternehmer; `compliance/`-Docs.

**Runde 2 (diese Session):**
- **Vapi:** Voice `6bb4f397` + `0931afea` von MiniMax (China) → **OpenAI (onyx, tts-1)** umgestellt (per API, verifiziert via `list_assistants`).
- **DSE §11 + §4** (DE+EN): „keine Aufzeichnung" → **Aufzeichnung offengelegt** (Einwilligung Art. 6(1)a, Ansage, 30 Tage, US-Speicherung); TTS-Anbieter MiniMax → OpenAI; China aus Drittland-Angaben entfernt.
- **AVV Anhang 2 + §10** (neu gerendert): MiniMax/China entfernt, Sprachsynthese der OpenAI-Zeile zugeordnet.
- **compliance-Docs** (dieses Dokument + VVT) auf Aufzeichnung-an + OpenAI-TTS aktualisiert.

## 12. Offene Punkte (Max / Anwalt / Config)
🔴 **Aufnahme-Ansage in Vapi einbauen** (§10) · AVV/DPA abschließen: Resend, Vapi, Deepgram, Google Workspace, OpenAI, easybell, Hetzner · Löschmechanismus für Vapi-Aufnahmen (30 Tage).
🟠 n8n Execution-Pruning + EU-Data-Table statt Google Sheets + Workspace-Konto verifizieren + n8n-API-Key rotieren · TIA (Vapi/Deepgram/Resend) · **DSFA (Voice mit Aufzeichnung)** · Cold-Outreach-Compliance · Newsletter-Double-Opt-In.
🟡 Vapi-Webhooks HMAC · Reseller-Embed-Consent · GbR→UG/GmbH + Versicherung · restliche 7 Vertragsdokumente auf Name/Telefon angleichen · `vertrag/build/docs/einfach-erklaert.json` auf reale Subunternehmer nachziehen · OpenAI-Stimme anhören/`voiceId` anpassen.
⚖️ **Alles anwaltlich/DSB gegenlesen lassen, bevor die Rechtstexte live gehen** — insbesondere die Einwilligungslösung für die Gesprächsaufzeichnung (Fortsetzen-als-Einwilligung vs. ausdrückliches „Ja").
