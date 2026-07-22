# NEXAI Chatbot — Reseller-Guide (Chatbot als Produkt verkaufen)

So verkaufst du den Chatbot an Kunden und baust ihn auf **jeder** Website ein –
egal ob WordPress, Wix, Shopify, Webflow oder handgeschriebenes HTML.

## Wie das Produkt aufgebaut ist

```
Kundenwebsite (beliebig)
  └─ <script>-Snippet  →  chat-widget.js  (einmal gehostet auf nex-a-i.com)
        │  POST { sessionId, message, locale }   (direkt, per CORS)
        ▼
   n8n-Workflow des Kunden  (dupliziert aus der Vorlage)
        ├─ KI-Agent (OpenAI)  + System-Prompt mit den Kunden-Infos
        ├─ book_appointment → Google Calendar des Kunden
        └─ save_lead        → Google Sheet des Kunden
        ▼
   Antwort { reply }  →  zurück ins Widget
```

Zwei bewegliche Teile:
1. **Ein Widget-Script**, das du **einmal** hostest (`https://nex-a-i.com/chat-widget.js`).
   Es liegt bereits im Repo unter `public/chat-widget.js` und wird mit deiner
   Website automatisch ausgeliefert.
2. **Ein n8n-Workflow pro Kunde**, den du aus der Vorlage duplizierst und mit den
   Daten des Kunden befüllst.

Wichtig: Anders als bei deinem eigenen NEXAI-Bot (Next.js-Proxy mit Secret) ruft
das Widget das n8n-Webhook **direkt aus dem Browser** auf. Deshalb nutzt die
Vorlage **CORS** statt eines geheimen Headers (ein Browser-Secret wäre im
Seitenquelltext sichtbar und damit kein Secret).

## Was schon vorbereitet ist

- **Widget-Script:** `public/chat-widget.js` (wird als `https://nex-a-i.com/chat-widget.js` ausgeliefert, sobald die Seite deployt ist).
- **Einbett-Snippet:** `n8n/reseller/embed-snippet.html`.
- **Vorlage-Workflows als Datei:** `n8n/reseller/chatbot-template-main.json` + `chatbot-template-book.json` (ohne Zugangsdaten, importierbar).
- **Vorlage-Workflows in deiner n8n:** „VORLAGE – Chatbot (Haupt)" und „VORLAGE – Chatbot Buchung (Sub)" — bereits mit deinen Zugängen verkabelt, zum Duplizieren.
- **System-Prompt-Vorlage:** im Haupt-Vorlage-Workflow hinterlegt, mit Platzhaltern in eckigen Klammern.

---

## Neuen Kunden aufsetzen (ca. 15–20 Min)

### 1. Workflows duplizieren
In n8n beide Vorlagen duplizieren (⋯ → **Duplicate**) und mit dem Kundennamen
umbenennen, z. B. „Bäckerei Müller – Chat" und „Bäckerei Müller – Buchung".

### 2. Sub-Workflow im Haupt-Workflow neu verknüpfen
Im duplizierten **Haupt**-Workflow die Node **book_appointment** öffnen → Feld
*Workflow* → den **duplizierten Sub**-Workflow des Kunden auswählen (nicht die
Vorlage!). Das ist der häufigste Fehler — unbedingt prüfen.

### 3. System-Prompt befüllen
Im Haupt-Workflow die Node **AI Agent** → *Options → System Message* öffnen und
alle Platzhalter ersetzen:
`[FIRMENNAME]`, `[KURZBESCHREIBUNG …]`, `[LEISTUNGEN …]`, `[TELEFONNUMMER]`,
`[ZIEL …]`, `[TERMINDAUER]`, `[VERFÜGBARE ZEITEN]`, Preisregel.

### 4. Google-Konten verbinden
- **Modell A (du verwaltest alles):** Deine bestehenden Google-Zugänge nutzen und
  den Kunden als Gast-/Freigabe-Kalender einbinden — die Termine landen dann in
  einem Kalender, den auch der Kunde sieht.
- **Modell B (Konto des Kunden):** In den Google-Calendar-Nodes (`Get Events`,
  `Create Event`) und Google-Sheets-Nodes ein **neues Credential mit dem
  Google-Konto des Kunden** anlegen. Kalender bleibt auf `primary` = Hauptkalender
  des Kundenkontos.
- **Sheet:** Ein Google Sheet für die Leads anlegen, Tab **Chat-Leads** mit der
  Kopfzeile `Timestamp | Name | E-Mail | Telefon | Anliegen | Termin | Status | Quelle`,
  und in `save_lead` + `Append Lead Row` als Dokument/Tab auswählen.
- **OpenAI:** In der Regel dein eigener OpenAI-Key (du rechnest die Nutzung im
  Monatspreis ab). Er ist in der Vorlage bereits hinterlegt.

### 4b. Benachrichtigungs-Mail des Kunden eintragen
Bei jeder Buchung verschickt Google automatisch eine **Einladung mit allen
Termindaten** – an den Kunden (Endkunde) **und** an eine interne Adresse (der
Betrieb bekommt so jede Buchung per Mail mit allen Kundendaten). Diese interne
Adresse steht im Sub-Workflow in der Node **Validate & Normalize** ganz oben:
`const NOTIFY_EMAIL = '[BENACHRICHTIGUNGS-EMAIL-DES-KUNDEN]';` → durch die
E-Mail-Adresse des Betriebs ersetzen (z. B. `info@baeckerei-mueller.de`).
So kommt **ohne** extra E-Mail-Dienst alles an — Google verschickt beide Mails.
(Voraussetzung: der verbundene Google-Kalender darf Einladungen versenden.)

### 5. Webhook eindeutig machen + Domain freigeben
Im Haupt-Workflow die Node **Webhook** öffnen:
- **Path** auf etwas Eindeutiges pro Kunde setzen, z. B. `baeckerei-mueller-chat`.
- **Options → Allowed Origins (CORS):** von `*` auf die **Domain des Kunden**
  ändern, z. B. `https://baeckerei-mueller.de`. (Verhindert, dass fremde Seiten
  den Bot einbetten und Kosten verursachen.)

### 6. Aktivieren + URL kopieren
Beide Workflows speichern, den **Haupt**-Workflow **aktiv** schalten, dann die
**Production**-Webhook-URL kopieren:
`https://n8n.nex-a-i.com/webhook/baeckerei-mueller-chat`.

### 7. Snippet erstellen und dem Kunden geben
`n8n/reseller/embed-snippet.html` kopieren und anpassen:
- `webhook` = die Production-URL aus Schritt 6
- `name`, `accent` (Markenfarbe des Kunden), `greeting`, `locale`, `fallbackPhone`

Dieses Snippet baut der Kunde (oder du) auf seiner Website ein — siehe unten.

---

## Einbau auf der Kundenwebsite

Der Kunde muss **nichts installieren** — nur den Snippet-Codeblock einmal
einfügen, direkt vor dem schließenden `</body>`-Tag.

```html
<script>
  window.NexaiChat = {
    webhook:  "https://n8n.nex-a-i.com/webhook/baeckerei-mueller-chat",
    name:     "Bäckerei Müller Assistent",
    accent:   "#c8102e",
    greeting: "Hallo! Fragen zu Bestellungen oder Öffnungszeiten? Ich helfe gern.",
    locale:   "de",
    fallbackPhone: "07951 123456"
  };
</script>
<script src="https://nex-a-i.com/chat-widget.js" async></script>
```

**Je nach System:**
- **WordPress:** Theme-Editor → `footer.php` vor `</body>`, ODER ein Plugin wie
  „WPCode / Insert Headers and Footers" → Bereich *Footer* → Snippet einfügen.
- **Wix:** Einstellungen → *Benutzerdefinierter Code* → neuer Code im Bereich
  *Body – Ende*, auf allen Seiten.
- **Shopify:** Theme → *Code bearbeiten* → `theme.liquid` vor `</body>`.
- **Webflow:** Projekt-Einstellungen → *Custom Code* → *Footer Code*.
- **Statisches HTML:** direkt vor `</body>` in die Seite(n) einfügen.

Nach dem Speichern erscheint unten rechts die Chat-Blase. Fertig.

---

## Sicherheit & Missbrauchsschutz

Weil das Webhook öffentlich vom Browser aufgerufen wird, gilt:
- **CORS auf die Kundendomain** begrenzen (Schritt 5) — hält Browser fremder Seiten fern.
- **OpenAI-Ausgabenlimit** im OpenAI-Konto setzen (Kostendeckel gegen Missbrauch).
- Optional in n8n eine einfache **Rate-Limit-Logik** ergänzen (z. B. via IP im
  ersten Node). Für den Start reichen CORS + Ausgabenlimit.
- Der Bot ist bereits gegen Prompt-Injection, Rollenübernahme, Datenabfluss und
  Kalender-Ausspähen gehärtet (siehe Haupt-`SETUP.md`).

## Datenschutz

Jeder Kunden-Bot verarbeitet Name/E-Mail/Telefon über n8n + OpenAI + Google. Der
Kunde braucht dazu einen Passus in seiner Datenschutzerklärung — die Vorlage in
`../privacy-snippet.md` kann angepasst werden (Firmennamen ersetzen).

## Kurzer Verkaufs-Rahmen (optional)

- **Setup-Gebühr** pro Kunde (Einrichtung, Prompt, Anbindung) + **monatliche
  Betreuung** (Hosting n8n, OpenAI-Kosten, Pflege, Änderungen).
- Der monatliche Preis deckt deine laufenden Kosten (OpenAI, n8n-Server) plus Marge.
- Verkaufsargument: rund um die Uhr erreichbar, bucht Termine automatisch, erfasst
  Leads, entlastet das Team — in wenigen Tagen live, ohne dass der Kunde etwas
  installieren muss.
