# Kunden-Steckbrief — neuer White-Label-Mandant (Autohaus & Co.)

Eine Seite pro Neukunde. Du füllst die **Werte-Block** aus, kopierst ihn in die
**„Kunden-Config"-Node** des duplizierten n8n-Workflows und den CRM-Key an die
gleiche Stelle — mehr braucht das Einrichten dann nicht (~5 Min).

> ⚠️ **Goldene Regel:** Jeder Kunde bekommt seinen **eigenen CRM-Mandanten + eigenen
> API-Key**. Nie den NexAI-Key für Kundendaten nehmen — sonst landen fremde
> Anruferdaten in eurem Mandanten (DSGVO). Vollständiger Ablauf: CRM-Repo
> `docs/ONBOARDING_WHITELABEL.md`.

---

## Werte-Block (ausfüllen, dann in die „Kunden-Config"-Node kopieren)

```
firmenname          =            # z. B. "Autohaus Müller GmbH"
crmMandant          =            # Name des Mandanten im Platform-Admin
crmApiKey           = nxk_…      # CRM → Settings → API-Keys (Scopes: contacts + leads)
kalenderId          =            # Google-Kalender-ID des Kunden (Kalender-Einstellungen → "Kalender-ID")
benachrichtigungEmail =          # interne Adresse des Betriebs (bekommt jede Buchung per Google-Einladung)
vapiNummer          =            # die Vapi/easybell-Nummer des Kunden
webhookPfad         =            # eindeutig, z. B. "autohaus-mueller"  → URL: https://n8n.nex-a-i.com/webhook/<pfad>
begruessung         =            # erster Satz des Voice-/Chat-Agents
fallbackTelefon     =            # Rückfallnummer, falls der Agent nicht weiterhelfen kann
slotDauerMin        = 30         # Termin-Länge
zeiten              =            # buchbare Zeiten, z. B. "Mo–Fr 9–17 Uhr, Sa 9–12 Uhr"
```

---

## Woher kommt welcher Wert / wohin gehört er

| Wert | Woher | Wohin |
|---|---|---|
| `crmMandant` + Admin-Login | **CRM → Platform-Admin** → Mandant + Nutzer anlegen | Zugang an den Kunden |
| `crmApiKey` | **CRM → Settings → API-Keys** (im Kunden-Mandanten!) | „Kunden-Config"-Node |
| `kalenderId` | Google-Kalender des Kunden → Einstellungen | „Kunden-Config"-Node |
| `benachrichtigungEmail` | vom Kunden | „Kunden-Config"-Node |
| `vapiNummer` + Assistant | **Vapi** (Assistant duplizieren, Recording AUS) | Nummer an den Kunden / Weiterleitung |
| `webhookPfad` | frei wählbar, pro Kunde eindeutig | n8n-Webhook-Node → URL in den Vapi-Assistant |
| `begruessung`, `fallbackTelefon`, `zeiten` | vom Kunden | „Kunden-Config"-Node / Vapi |

---

## Ablauf in Kurzform (~5 Min, sobald die Config-Node-Vorlage steht)

```
[ ] 1  CRM: Mandant + Admin-Nutzer + API-Key anlegen        → crmApiKey notieren
[ ] 2  n8n: Vorlage-Workflows duplizieren, auf Kundennamen umbenennen
[ ] 3  n8n: "Kunden-Config"-Node öffnen → Werte-Block einfügen (Name + Key + Kalender …)
[ ] 4  n8n: Workflows aktivieren → Webhook-URL(s) in den Vapi-Assistant eintragen
[ ] 5  Testanruf → landet im KUNDEN-Mandanten → Testdaten löschen
[ ] 6  Rufumleitung des Kunden scharf → Login-Einweisung
```

> Die **„Kunden-Config"-Vorlage** (ein Workflow, in dem genau diese Werte an EINER
> Stelle stehen) baue ich aus deinen aktuellen Live-Workflows — sobald sie als
> Export im Ordner `n8n/` liegen. Dann ist Schritt 3 wirklich nur „eine Node ausfüllen".
