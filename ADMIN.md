# Texte selbst ändern — der Editor unter /admin

Unter **https://nex-a-i.com/admin** lassen sich alle Texte der Website ändern,
ohne GitHub und ohne Dateien. Deutsch und Englisch stehen nebeneinander, damit
keine Sprache vergessen wird.

Gespeichert wird **in dasselbe Repository wie bisher**: Der Editor schreibt die
Dateien unter `messages/`, macht daraus einen Commit und stößt auf Wunsch den
Neubau an. Verlauf, Vergleich und „Revert“ auf GitHub funktionieren also
unverändert weiter.

---

## Einrichtung (einmalig)

Ohne diese Variablen ist `/admin` **abgeschaltet** — nicht offen, sondern zu.

### 1. Passwort festlegen

Auf dem Mac im Projektordner:

```bash
node scripts/admin-password.mjs "ein-langes-passwort"
```

Das Skript gibt zwei Zeilen aus: `ADMIN_PASSWORD_HASH` und
`ADMIN_SESSION_SECRET`. Beide in Coolify unter **Environment Variables**
eintragen. Das Passwort selbst wird nirgends gespeichert.

### 2. Zugangsschlüssel für GitHub

Auf github.com unter **Settings → Developer settings → Personal access tokens →
Fine-grained tokens** einen Schlüssel anlegen:

| Feld | Wert |
|---|---|
| Repository access | **Only select repositories** → `NexAI-Website` |
| Permissions → Contents | **Read and write** |
| Expiration | so lang wie zulässig; vor Ablauf erneuern |

Den Schlüssel als `GITHUB_TOKEN` in Coolify eintragen. Mehr Rechte als
„Contents“ braucht er nicht — er darf nur Dateien in diesem einen Repository
lesen und schreiben.

### 3. Neubau per Knopf (optional)

Sind zusätzlich diese drei Variablen gesetzt, erscheint nach dem Speichern ein
Knopf **Veröffentlichen**, der den Neubau in Coolify startet. Fehlen sie,
funktioniert alles andere weiterhin — dann drückt man in Coolify selbst auf
*Redeploy*.

| Variable | Wert |
|---|---|
| `COOLIFY_URL` | `http://5.75.179.247:8000` |
| `COOLIFY_TOKEN` | Coolify → **Keys & Tokens → API tokens**, Recht *deploy* |
| `COOLIFY_APP_UUID` | steht in der Adresszeile der Anwendung in Coolify |

---

## Alle Variablen auf einen Blick

```
ADMIN_PASSWORD_HASH=scrypt:…:…      # Pflicht
ADMIN_SESSION_SECRET=…              # Pflicht, mind. 16 Zeichen
GITHUB_TOKEN=github_pat_…           # Pflicht zum Bearbeiten
GITHUB_REPO=maximiliantrenk-wq/NexAI-Website   # optional, das ist der Standard
GITHUB_BRANCH=main                  # optional, das ist der Standard
COOLIFY_URL=…                       # optional, für den Veröffentlichen-Knopf
COOLIFY_TOKEN=…                     # optional
COOLIFY_APP_UUID=…                  # optional
```

> **Achtung:** Der Passwort-Hash wird mit **Doppelpunkten** getrennt, nicht mit
> Dollarzeichen. In `.env`-Dateien wird `$name` als Variable ersetzt — ein Hash
> mit Dollarzeichen käme verstümmelt an, und das Passwort würde nie stimmen.

---

## Wie es benutzt wird

1. `/admin` aufrufen, Passwort eingeben.
2. Bereich wählen — oder oben nach einem Satz suchen, wenn unklar ist, wo er steht.
3. Texte ändern. Geänderte Felder werden blau markiert, unten steht mitlaufend,
   wie viele Änderungen offen sind.
4. **Speichern** → alle Änderungen dieses Bereichs gehen in *einen* Commit.
5. **Veröffentlichen** (oder in Coolify auf *Redeploy*) → nach wenigen Minuten
   ist der neue Text live.

## Grenzen, die man kennen sollte

- **Nur Texte.** Bilder, Farben, Seitenaufbau und neue Seiten bleiben Codearbeit.
- **Die Suche** auf der Startseite des Editors arbeitet auf dem zuletzt
  *veröffentlichten* Stand. Gerade Gespeichertes taucht dort erst nach dem
  nächsten Neubau auf. Innerhalb eines Bereichs ist der Filter immer aktuell.
- **Rechtstexte** (Impressum, Datenschutz, AGB) sind als „Vorsicht“ markiert.
  Technisch änderbar, inhaltlich nur mit dem Anwalt.
- **Wurde parallel am Repository gearbeitet**, lehnt das Speichern ab, statt die
  fremde Änderung zu überschreiben. Dann Seite neu laden und noch einmal
  speichern.

## Für die lokale Entwicklung

Ohne `GITHUB_TOKEN` schreibt der Editor in die Dateien auf der Platte statt nach
GitHub — aber nur außerhalb der Produktion. Im laufenden Betrieb ohne Token ist
das Bearbeiten abgeschaltet, damit Änderungen nicht in einem Container landen und
beim nächsten Deploy verschwinden.
