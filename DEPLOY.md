# Deployment — NEXAI

Ziel: Website live auf **nex-a-i.com** (Hosting: **Vercel**, verbunden mit **GitHub**),
danach bei **Google** auffindbar. Reihenfolge einfach von oben nach unten abarbeiten.

> Vercel baut die Seite in der Cloud — du brauchst dafür lokal kein Node.
> `node_modules` und `.next` sind bewusst nicht im Repo (werden nicht hochgeladen).
> Es liegen keine Passwörter/Keys im Code.

---

## 1. Code auf GitHub laden

**Variante A — GitHub Desktop (ohne Kommandozeile, empfohlen)**
1. GitHub-Konto anlegen: <https://github.com/join>
2. GitHub Desktop installieren: <https://desktop.github.com> und anmelden.
3. `File → Add local repository…` → diesen Ordner wählen
   (`/Users/deineshit/Desktop/NexAI-Website`).
4. Oben auf **Publish repository** klicken. „Keep this code private" darf angehakt bleiben.
   → Der Code liegt jetzt auf GitHub.

**Variante B — Kommandozeile**
1. Auf github.com ein **leeres** Repository anlegen (ohne README/.gitignore).
2. Im Projektordner:
   ```bash
   git remote add origin https://github.com/<dein-name>/<repo>.git
   git push -u origin main
   ```
   (Beim Push nach GitHub-Login/Token fragen — ggf. GitHub Desktop ist einfacher.)

---

## 2. Auf Vercel deployen

1. <https://vercel.com/signup> → **Continue with GitHub**.
2. **Add New… → Project** → das eben erstellte Repository **Import**.
3. Vercel erkennt **Next.js** automatisch — **keine Einstellungen nötig**. Auf **Deploy**.
4. Nach ~1–2 Min bekommst du eine Test-URL `…vercel.app` → kurz öffnen und prüfen.

---

## 3. Domain nex-a-i.com verbinden

1. Vercel → dein Projekt → **Settings → Domains** → `nex-a-i.com` hinzufügen
   (und `www.nex-a-i.com`).
2. Vercel zeigt dir die nötigen **DNS-Einträge**. Diese bei deinem **Domain-Anbieter**
   (wo du nex-a-i.com registriert hast) in den DNS-Einstellungen eintragen — **exakt die
   Werte nutzen, die Vercel anzeigt**. Typischerweise:
   - **A**-Record: `@` → `76.76.21.21`
   - **CNAME**-Record: `www` → `cname.vercel-dns.com`
3. Kurz warten (Minuten bis wenige Stunden). Das **SSL-Zertifikat (https)** macht Vercel
   automatisch. `nex-a-i.com` als primär setzen (www leitet dann darauf um).

> ⚠️ **Wichtig für die E-Mail:** Die bestehenden **MX-Einträge NICHT ändern/löschen** —
> nur die oben genannten A/CNAME-Einträge hinzufügen. Dann funktioniert
> mbt@nex-a-i.com unverändert weiter.

---

## 4. Bei Google auffindbar machen

1. Sobald die Domain live ist: **Google Search Console** → <https://search.google.com/search-console>
2. **Property hinzufügen → Domain** → `nex-a-i.com` → per **DNS-TXT-Eintrag** verifizieren
   (Search Console zeigt den Wert; beim Domain-Anbieter als TXT eintragen).
3. Links **Sitemaps** → einreichen: `sitemap.xml`
4. Optional: unter **URL-Prüfung** die Startseite eingeben → **Indexierung beantragen**.

> Die Seite bringt bereits alles Nötige mit: `sitemap.xml`, `robots.txt`, Meta-Tags,
> hreflang (DE/EN) und Organisations-Daten (JSON-LD). Google braucht nach dem Einreichen
> meist **einige Tage bis Wochen**, bis die Seite in den Suchergebnissen auftaucht.

---

## Künftige Änderungen live bringen

Weil GitHub mit Vercel verbunden ist: **jede Änderung, die auf `main` gepusht wird,
geht automatisch live** (in GitHub Desktop einfach *Commit* + *Push*). Kein manuelles
Deployment mehr nötig.

## Optional später

- **Kontaktformular → echte E-Mails:** `app/api/contact/route.ts` nimmt Anfragen aktuell
  nur entgegen. Für echten Mailversand einen Anbieter (z. B. **Resend**) anbinden und den
  API-Key in Vercel unter **Settings → Environment Variables** hinterlegen.
- **Analytics:** in Vercel mit einem Klick aktivierbar (Vercel Web Analytics), oder ein
  datenschutzfreundliches Tool wie Plausible.
