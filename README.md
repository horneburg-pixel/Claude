# English for Real Life

Englisch-Lern-App (ähnlich Duolingo) für **Urlaub, Smalltalk und Alltag** – Niveau **A2 → B1**, britisches Englisch, Erklärungen auf Deutsch.

## Funktionen

| Bereich | Inhalt |
|---|---|
| **Lernen** | 12 Einheiten × 3 Lektionen (~10 Min.): Wörter, Sätze, Hörverstehen, Satzbau, Schreiben, Nachsprechen, Grammatik-Lücken. Falsche Antworten kommen am Ende nochmal. |
| **Vokabeln** | Karteikarten mit 5 Fächern (Wiederholung nach 1, 2, 4, 8, 16 Tagen). Wörter aus Lektionen und Gesprächen landen automatisch hier. |
| **Grammatik** | 7 Zeitformen (Bildung, Verwendung, Signalwörter, typischer Fehler für Deutsche, Quiz) + 12 Grammatikthemen. |
| **Sprechen** | 10 Rollenspiele (Hotel, Pub, Weg fragen, Bahnhof, Apotheke, Telefon, Smalltalk …). Nach jedem Satz: Korrektur mit markierten Änderungen + Erklärung auf Deutsch, dann antwortet der Gesprächspartner. Am Ende: Feedback zu deinen häufigsten Fehlern. |
| **Aussprache** | Vorlesen mit britischer Stimme (Tempo einstellbar), Spracherkennung zum Nachsprechen und Antworten (Chrome / Safari). |

## Nutzung

### Variante A: In Claude (empfohlen, kein API-Key)
Die App ist als Claude-Artifact veröffentlicht. Die Gespräche laufen über dein Claude-Konto, der Fortschritt wird im Konto gespeichert und zwischen Geräten abgeglichen.
Einschränkung: Das Mikrofon ist dort gesperrt → zum Sprechen die **Diktierfunktion der Handy-Tastatur** nutzen.

### Variante B: Als Web-App mit eigenem API-Key
1. Dateien auf einen HTTPS-Webspace legen (z. B. GitHub Pages: *Settings → Pages → Branch wählen*). Lokal testen: `python3 -m http.server` im Ordner, dann `http://localhost:8000`.
2. Auf dem Handy öffnen → „Zum Startbildschirm hinzufügen“.
3. Unter **Optionen** den API-Key eintragen (erstellen auf console.anthropic.com → API Keys).

Der Key bleibt nur im Browser (localStorage) und wird direkt an `api.anthropic.com` gesendet. Kosten fallen nach Nutzung an; Modell unter Optionen wählbar (Opus 5.5 = beste Qualität, Haiku 5.5 = am günstigsten).

## Aufbau

```
index.html          Einstieg als Web-App (PWA)
app.html            Einstieg als Claude-Artifact (ohne <html>-Gerüst)
css/style.css       Design (hell/dunkel)
js/data-units.js    12 Einheiten: Wörter, Sätze, Grammatik, Lückensätze
js/data-more.js     Zeitformen + Gesprächsszenarien
js/app.js           App-Logik (Lektionen, Trainer, KI, Speicherung)
sw.js, manifest.webmanifest, icon.svg   Offline & Startbildschirm
```

Neue Inhalte: einfach in `js/data-units.js` eine Einheit nach demselben Muster ergänzen.
