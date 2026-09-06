# NexAI — DSGVO-Audit & Maßnahmenkatalog

**Stand:** August 2026 (Runde 3)
**Erstellt für:** NexAI – Next Generation Artificial Intelligence GbR (Maximilian Trenk, Jason Brian Merklein)
**Umfang:** Website nex-a-i.com, Geschäftsmodell, alle KI-Agenten & Automatisierungen, Auftragsverarbeiter, Drittlandtransfers.

> ⚠️ **Kein Rechtsrat.** Technisch-organisatorische Bestandsaufnahme, **keine** verbindliche Rechtsberatung. Vor Veröffentlichung der Rechtstexte und Umsetzung der rechtlichen Punkte durch Datenschutzbeauftragten / Fachanwalt prüfen lassen.

**Grundlage:** Quellcode & Konfiguration des Repos, CRM-DSGVO-Blueprint (`nexai-crm/docs/*`), Vertragswerk (`vertrag/`), Live-Check der Vapi-Konfiguration (Assistenten, Anrufliste, Recording-Screenshot — August 2026).

**Entscheidungen Max:** n8n = Hetzner (DE) · Löschfristen = CRM-Defaults · **Anrufaufzeichnung in Vapi deaktiviert** (Audio Recording + Transcript AUS, per Screenshot verifiziert 08.08.) → keine Aufzeichnung · **Sprachausgabe von MiniMax/China auf OpenAI umgestellt.**

---

## 1. Executive Summary — risiko-sortierte Lückenliste

Legende: 🔴 hoch · 🟠 mittel · 🟡 niedrig · ✅ behoben · ⏳ offen (Max/Anwalt/Config)

| # | Befund | Schwere | Status |
|---|---|---|---|
| 1 | Vapi zeichnet Anrufe standardmäßig auf (Default AN) — Text behauptete zunächst „keine Aufzeichnung". | 🔴→✅ | ✅ **behoben:** Audio Recording + Transcript in Vapi **deaktiviert** (Screenshot 08.08.); DSE §11/§4 sagen korrekt „keine Aufzeichnung". ⏳ Max: **„Publish"** + Vorlage `0931afea` gleich einstellen. |
| 2 | Live-Sprachausgabe lief über MiniMax (China) — kein Angemessenheitsbeschluss. | 🔴→✅ | ✅ **behoben:** Voice auf beiden Assistenten (`6bb4f397`, `0931afea`) per Vapi-API auf **OpenAI** umgestellt; China aus DSE + AVV entfernt. ⏳ Stimme anhören/`voiceId` ggf. anpassen. |
| 3 | Resend (USA) verarbeitete alle Formular-/Newsletter-Daten — nirgends genannt. | 🔴 | ✅ DSE §7 + §8 (Resend ist DPF-zertifiziert; Art. 45 + 46). ⏳ DPA mit Resend (self-serve). |
| 4 | KI-Telefonassistent fehlte komplett in der Datenschutzerklärung. | 🔴 | ✅ neuer DSE-Abschnitt §11. |
| 5 | Newsletter ohne Rechtsgrundlage/Double-Opt-In. | 🟠 | ✅ DSE §8. ⏳ Double-Opt-In technisch umsetzen. |
| 6 | AVV Anhang 2 veraltet (Make/ElevenLabs; Resend/easybell/Hetzner fehlten). | 🟠 | ✅ AVV korrigiert + neu gerendert. |
| 7 | Keine Löschfristen; n8n-Execution-History speichert volle PII. | 🟠 | ✅ DSE §4 konkrete Fristen. ⏳ n8n-Execution-Pruning. |
| 8 | Kein Verzeichnis von Verarbeitungstätigkeiten (Art. 30). | 🟠 | ✅ `VVT-Verarbeitungsverzeichnis.md`. |
| 9 | Cold Outreach / Vertriebsagent (Explorium). | 🟡 | Als Produkt derzeit nicht angeboten (Max 08.08.). Nur relevant, falls NexAI selbst kalt akquiriert → dann UWG/Art. 14 (§7). |
| 10 | Impressum unvollständig; veralteter §-5-TMG-Verweis. | 🟡 | ✅ GbR, USt-Hinweis, § 5 DDG, VSBG, Frankenhardt-Honhardt. |
| 11 | §3 pauschale „Einwilligung"; §7 sessionStorage unterschätzt. | 🟡 | ✅ §3 differenziert; sessionStorage korrigiert. |
| 12 | Reseller-Embed sendet Browser→n8n ohne Consent-Ebene. | 🟡 | ⏳ Kunden-DSE/AVV. |
| 13 | Vapi-Webhooks unauthentifiziert · n8n-API-Key im Klartext · Google-Konto (privat vs. Workspace). | 🟡 | ⏳ TOMs/Sicherheit (§8). |
| 14 | Firmenname uneinheitlich; GbR = persönliche Haftung; keine Versicherung. | 🟡 | ✅ Name vereinheitlicht. ⏳ UG/GmbH + Versicherung. |

**Was bereits gut war:** keine Cookies, kein Tracking → **kein Consent-Banner nötig**; Schriften self-hosted; alle Browser-Requests first-party; Vercel/OpenAI/Google mit DPF/SCC genannt; Chatbot legt KI-Charakter offen; IP nur flüchtig als Rate-Limit-Key.

---

## 2. Rollen & Rechtsgrundlagen
- **Verantwortlicher (Art. 4 Nr. 7):** Website, Marketing/Newsletter, Lead-Recherche, Demo-Telefonnummer → Website-DSE + VVT Art. 30(1).
- **Auftragsverarbeiter (Art. 28):** Agenten für Kunden (Voice/Chat/Social/Automation/Custom) → Anlage B (AVV) + VVT Art. 30(2).
- **Grenzfall (Art. 26/eigenständig):** Vertriebs-/Akquise-Agent bei Eigenrecherche — je Auftrag (AVV §15).

---

## 3. Website nex-a-i.com (NexAI = Verantwortlicher)

| Verarbeitung | Empfänger | Rechtsgrundlage | Status |
|---|---|---|---|
| Website-Aufruf / Server-Logs | Vercel (US, DPF) | Art. 6(1)f | ✅ DSE §6, 30 Tage |
| Kontakt-/Partnerformular | Resend (US) → mbt@nex-a-i.com | Art. 6(1)b/f | ✅ DSE §7 |
| Newsletter | Resend (US) | Art. 6(1)a | ✅ DSE §8 · ⏳ Double-Opt-In |
| Chat-Assistent | n8n (Hetzner) → OpenAI, Google | Art. 6(1)b/f | ✅ DSE §9 |
| Online-Buchung | n8n (Hetzner) → Google; Resend (Notiz) | Art. 6(1)b | ✅ DSE §10 |
| KI-Telefonassistent | Vapi (US, Orchestrierung + TTS), Soniox (US, STT via Vapi), OpenAI (LLM), easybell (DE), n8n/Hetzner, Google | Art. 6(1)b/f | ✅ DSE §11 (keine Aufzeichnung; nur Metadaten) |

Cookies/Consent/Analytics/Fonts: keine → **kein Banner nötig**.

---

## 4. Tools / Agenten — WO Daten gespeichert werden

| Dienst | Zweck | **Speicherort / Land** | Was liegt dort | Drittland | AVV/DPA |
|---|---|---|---|---|---|
| **Vapi Inc.** | Voice-Orchestrierung, Telefonie | **USA** | Anruf-Metadaten (Rufnummer, Zeit, Dauer), Logs — **keine Aufzeichnung/Transkripte** (deaktiviert) | kein DPF → SCC+TIA | ⏳ DPA |
| **Soniox Inc** | Speech-to-Text | **USA** (via Vapi) | Audio → Text (flüchtig, kein Transkript gespeichert) | SCC+TIA | ✅ über Vapi-DPA (Soniox steht auf der Vapi-Unterauftragsverarbeiterliste) |
| **OpenAI** | LLM (gpt-4o / gpt-4.1-mini) **+ Sprachsynthese (TTS)** | **IE/USA** | Prompt/Transkript, Antworttext | DPF/SCC, No-Training | ✅ OpenAI Ireland |
| **easybell GmbH** | SIP-Telefonie | **Deutschland** | Verbindungsdaten | EU | ⏳ AVV bestätigen |
| **Google (Calendar/Sheets/Gmail)** | Termine, Leads, Bestätigungen | **IE/USA** | Name, E-Mail, Telefon, Termin | DPF/SCC | ⏳ Workspace-AVV |
| **Resend, Inc.** | Formular-/Newsletter-E-Mail | **USA** | Formulardaten (Transit + Logs) | DPF (Art. 45) + SCC | ⏳ DPA |
| **n8n (self-hosted)** | Automatisierung, Lead-Speicherung | **Hetzner, Deutschland** | Execution-History mit voller PII (default unbegrenzt) + Leads (derzeit Google Sheets) | EU | ⏳ Hetzner-AVV; Pruning |
| **Vercel Inc.** | Website-Hosting | **USA** | Zugriffs-Logs/IP | DPF | ✅ genannt |
| **Explorium** | Lead-Recherche | Datenprovider | B2B-Kontaktdaten | (Verantwortlicher) | ⏳ §7 |

**Kernaussagen (Antwort auf „wo speichern Vapi/n8n?"):**
- **Vapi = USA.** Kein DPF; **Aufzeichnung + Transkript deaktiviert** (verifiziert 08.08.) → keine Gesprächsinhalte in den USA gespeichert, nur Anruf-Metadaten + Logging. Live bestätigt: echte Anrufe mit deutschen Rufnummern (zuletzt 07.08.2026) auf `6bb4f397` + Vorlage `0931afea`.
- **n8n = Hetzner/Deutschland (EU).** Execution-History speichert komplette Payloads → Pruning nötig. Leads laufen real noch über Google Sheets statt EU-Data-Table.
- **Aktueller Voice-Stack (Stand 06.09.2026, im Vapi-Dashboard verifiziert):** STT **Soniox** `stt-rt-v5` (US, via Vapi) · LLM **OpenAI gpt-4.1** · **TTS Vapi** (Stimme „Sid", Vapi-eigen — nicht mehr OpenAI) · Orchestrierung Vapi (US) · Trunk easybell (DE) · Automatisierung n8n@Hetzner (DE).

---

## 5. Drittlandtransfer-Landkarte (Art. 44 ff.)
- **Art. 45 (DPF):** Vercel, Google, OpenAI, Resend (alle DPF-zertifiziert).
- **Art. 46 (SCC) + TIA:** Vapi (Metadaten, Sprachsynthese), Soniox (STT, über Vapi).
- **China:** entfällt — TTS von MiniMax auf OpenAI umgestellt.
- **Handlungsbedarf:** ✅ erledigt 06.09.2026 — [Vapi](TIA-Vapi-Drittlandtransfer.md) (deckt Soniox mit ab), [OpenAI](TIA-OpenAI-Drittlandtransfer.md), [Resend](TIA-Resend-Drittlandtransfer.md). Für Resend greift Art. 45 (DPF-zertifiziert), daher keine TIA-Pflicht; die Rückfallbewertung liegt vor. **Neuer Handlungsbedarf aus der OpenAI-TIA:** EU-Region und Zero Data Retention sind verfügbar, aber nicht aktiviert.

---

## 6. Löschfristen (DSE §4)
Leads 6 Mon. · Termine 12 Mon. · Chatverläufe 6 Mon. · Sprach-Termindaten 6 Mon. · **keine Anrufaufzeichnung** · technische Logs 30 Tage · Newsletter bis Widerruf. Ausnahme: gesetzliche Aufbewahrung (§147 AO/§257 HGB) → sperren. **Umzusetzen:** n8n/Google-Cleanup (Sheets/Kalender löschen Fristen automatisiert).

---

## 7. Cold Outreach (Vertriebsagent + Explorium)
- **§ 7 UWG:** B2B-Werbe-E-Mails brauchen grundsätzlich vorherige Einwilligung. Kalt-Mailing an gescrapte Entscheider ist riskant.
- **Art. 14:** Informationspflicht gegenüber Prospects (spätestens bei erster Ansprache / binnen 1 Monat).
- **Art. 6(1)f:** Interessenabwägung dokumentieren; Opt-outs führen.

---

## 8. Betroffenenrechte, VVT, DSFA, Meldepflicht, DPO, TOMs
- **Betroffenenrechte (Art. 15–22):** DSE §5; operativen Ablauf (Postfach, 1-Monats-Frist) definieren.
- **VVT (Art. 30):** `VVT-Verarbeitungsverzeichnis.md` pflegen.
- **DSFA/DPIA (Art. 35):** für Voice-KI prüfen (ohne Aufzeichnung geringeres Risiko, aber Umfang bewerten).
- **Meldepflicht (Art. 33/34):** Prozess (72 h Behörde / 24 h an Verantwortliche) festhalten.
- **DPO/DSB:** juristisch prüfen.
- **TOMs:** Vapi-Webhooks HMAC · n8n-API-Key rotieren · Google-Konto als Workspace verifizieren · n8n-Pruning.

---

## 9. EU AI Act (Art. 50)
- **Chat:** KI-Hinweis vorhanden ✅.
- **Voice:** Der Assistent muss zu Gesprächsbeginn ansagen, **dass es eine KI ist** (Art. 50). Da nicht aufgezeichnet wird, entfällt die § 201-StGB-Einwilligung. Sicherstellen, dass die First Message / der Prompt den KI-Hinweis enthält.

---

## 10. Vapi — Status & Rest-Schritte (Max)
- **Audio Recording + Transcript sind AUS** (Screenshot 08.08.) → keine Gesprächsaufzeichnung. ✅
- ⏳ **„Publish" klicken** — der Assistent `6bb4f397` steht auf „Draft"; ohne Publish ist die Einstellung nicht live.
- ⏳ **Vorlage `0931afea` gleich einstellen** (Audio Recording + Transcript AUS), damit Kunden-Klone die Einstellung erben.
- ⏳ **KI-Ansage** (Art. 50) in First Message/Prompt sicherstellen, z. B.: *„Guten Tag, Sie sprechen mit dem KI-Terminassistenten von NexAI. Wie kann ich Ihnen helfen?"*
- Optional: „Logging" ist an (nur Metadaten/Events in Vapi) — für Debugging ok; für maximale Datensparsamkeit deaktivierbar.

---

## 11. Change-Log
- **Runde 1 (`7614f26`):** DSE 8→11 Abschnitte, Löschfristen, §3-Fix, sessionStorage, Hetzner, LfDI BW; Impressum (GbR, § 5 DDG, USt, VSBG); AVV Anhang 2 real; `compliance/`-Docs.
- **Runde 2 (`f010b73`):** Voice `6bb4f397`+`0931afea` MiniMax(China)→OpenAI (API, verifiziert); DSE/AVV zunächst auf „Aufzeichnung" (nach Info „nicht abschaltbar").
- **Runde 3 (diese Session):** Screenshot zeigt Audio Recording + Transcript **AUS** → DSE §11/§4 zurück auf **„keine Aufzeichnung"** (OpenAI-TTS bleibt); Audit + VVT nachgezogen. AVV unverändert (bereits konsistent: §8(5) „Aufzeichnung standardmäßig aus" = Realität).

## 12. To-do-Liste (Max / Anwalt / Config)

**🔴 zuerst**
1. Vapi: **„Publish"** klicken (Recording-AUS + OpenAI-Stimme live nehmen) und **Vorlage `0931afea`** genauso einstellen (Recording + Transcript AUS).
2. **AVV/DPA abschließen** mit: Google Workspace, Vercel, Resend. Erledigt (Stand 06.09.2026): Hetzner, OpenAI, Vapi; easybell als TK-Anbieter i. d. R. ohne AVV; Soniox über den Vapi-DPA abgedeckt.
3. **Newsletter-Double-Opt-In** technisch umsetzen, bevor tatsächlich versendet wird.

**🟠 kurzfristig**
4. **n8n:** Execution-Data-Pruning aktivieren · Leads in EU-Data-Table statt Google Sheets · Live-Google-Konto als **Workspace (mbt)** verifizieren · **n8n-API-Key rotieren**.
5. ✅ **TIA/Drittlandbewertung für Vapi, OpenAI und Resend erledigt** (06.09.2026). Stattdessen offen: **OpenAI-EU-Projekt anlegen und ZDR beantragen** (siehe OpenAI-TIA, O-2/O-3).
6. *(Vertriebs-/Akquise-Agent: derzeit nicht im Angebot — Max 08.08. Bei künftiger Einführung DSGVO/UWG nachholen: Einwilligung B2B-E-Mail (§ 7 UWG), Art.-14-Info an Prospects, Interessenabwägung. Reminder gesetzt.)*
7. **KI-Ansage** (Art. 50) im Vapi-Prompt/First Message sicherstellen.
8. **Löschkonzept** umsetzen (n8n/Google-Cleanup gemäß §4-Fristen).

**🟡 mittelfristig**
9. Vapi-Webhooks per HMAC absichern · Reseller-Embed-Consent auf Kundenseiten.
10. GbR → UG/GmbH prüfen · Betriebs-/Cyber-/Vermögensschadenhaftpflicht.
11. Restliche 7 Vertragsdokumente auf Name/Telefon angleichen · `vertrag/build/docs/einfach-erklaert.json` auf reale Subunternehmer nachziehen.
12. Betroffenenrechte-Prozess (Postfach + 1-Monats-Frist) · Melde-Prozess (72 h) · DSB-Pflicht prüfen · VVT laufend pflegen.

**⚖️ vor Go-Live**
13. Datenschutzerklärung, Impressum und AVV **anwaltlich/DSB gegenlesen lassen** und auf `main` deployen (PR).

### AVV/DPA — Links & Hinweise (zu Punkt 2)
- **Google Workspace** (Kalender/Sheets/Gmail): bereits Teil des Vertrags, im Admin bestätigen. Text: https://admin.google.com/terms/apps/8/2/en/dpa_terms.html
- **Vercel** (Hosting): https://vercel.com/legal/dpa (Plan prüfen). Subunternehmer: https://security.vercel.com/
- **Hetzner** (n8n-Server): AVV im Kundenpanel (vorunterschrieben, ausdrucken/ablegen). Info: https://docs.hetzner.com/de/general/general-terms-and-conditions/data-privacy-faq/ · PDF: https://www.hetzner.com/AV/DPA_de.pdf
- **OpenAI** (LLM+TTS): Self-serve-DPA: https://openai.com/policies/data-processing-addendum/
- **Resend** (E-Mail): https://resend.com/legal/dpa (DPF-zertifiziert; GDPR-Seite https://resend.com/security/gdpr)
- **Vapi** (Voice): DPA **nur Enterprise** → Trust Center: https://security.vapi.ai/ (GDPR: https://docs.vapi.ai/security-and-privacy/GDPR). ⚠️ Ohne Enterprise kein unterschriebener DPA — Restrisiko.
- **Soniox** (STT, seit 06.09.2026 anstelle von Deepgram): läuft über Vapi und ist damit vom Vapi-DPA gedeckt — Vapi führt Soniox ausdrücklich auf seiner Unterauftragsverarbeiterliste (Trust Center `security.vapi.ai`, Mitteilung nach § 3.2 des Vapi-DPA). Kein eigener AVV nötig, solange kein eigener Soniox-Key im Einsatz ist. Eigene Compliance-Unterlagen: Soniox Console → Security & Compliance.
- **easybell** (Telefonie): i. d. R. **kein AVV nötig** — TK-Anbieter, § 88 TKG (selbst verantwortlich, nicht Auftragsverarbeiter); AVV nur bei gespeicherter Mailbox/Fax. Info: https://www.easybell.de/hilfe/fragen/vertragsfragen/antwort/benoetige-ich-einen-auftragsverarbeitungsvertrag-avv-von-easybell/
