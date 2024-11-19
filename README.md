
# Craftify Table Library

---

## Überblick
Die **Craftify Table Library** ist eine JavaScript-Bibliothek, die es Ihnen ermöglicht, dynamische und interaktive Tabellen auf Ihrer Webseite zu erstellen. Mit Funktionen wie Datenmanipulation, Formatkonvertierung und Beziehungsverwaltung ist sie flexibel und leicht anzupassen.

---

## Funktionen
- **Dynamische Tabellen**:
  - Erstellen Sie Tabellen basierend auf JSON, CSV, TSV oder XML.
  - Verwalten Sie Beziehungen zwischen Daten automatisch.
- **Datenbearbeitung**:
  - Zeilen hinzufügen, löschen und aktualisieren.
  - Hierarchische Beziehungen zwischen Zellen verwalten.
- **Formatkonvertierung**:
  - Daten zwischen JSON, CSV, TSV und XML umwandeln.
- **Anpassbares Design**:
  - Verwenden Sie CSS-Variablen, um die Tabellen einfach anzupassen.
- **Tastatursteuerung**:
  - Nutzen Sie `Shift` für Mehrfachauswahl und `Delete` zum Löschen.

---

## Installation

### Dateien einbinden
Stellen Sie sicher, dass die Bibliothek bereits in Ihrem Projektordner vorhanden ist. Sie müssen nur die Hauptdateien einbinden.

1. **JavaScript-Datei einfügen**
   ```html
   <script src="/path-to-library/craftify-table/index.js" type="module"></script>
   ```

2. **CSS-Datei einfügen**
   ```html
   <link rel="stylesheet" href="/path-to-library/craftify-table/styles/index.css">
   ```

---

## Nutzung

### Grundlegendes Beispiel
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Craftify Table Beispiel</title>
    <link rel="stylesheet" href="/path-to-library/craftify-table/styles/index.css">
</head>
<body>
    <div id="table-container"></div>
    <script src="/path-to-library/craftify-table/index.js" type="module"></script>
    <script>
        const tableConfig = {
            data: [
                { id: 1, name: 'Anna', age: 29 },
                { id: 2, name: 'Tom', age: 34 }
            ],
            containerSelector: '#table-container'
        };

        createTable(tableConfig, {}, {});
    </script>
</body>
</html>
```

---

## Module

### 1. Kernmodule (`core`)
- **`bootstrap.js`**:
  - Verbindet die Hauptfunktionen der Bibliothek.
- **`GlobalScope.js`**:
  - Speichert globale Variablen wie Daten und Konfigurationen.
- **`ExposeToWindow.js`**:
  - Stellt wichtige Funktionen im Browserfenster bereit.

### 2. Tabellenfunktionen (`src`)
#### Tabellenrendering
- **`create-table/TableRenderer.js`**:
  - Erstellt und aktualisiert die Tabelle dynamisch.

#### Datenmanipulation
- **`data-manipulations/DataController.js`**:
  - Bearbeitet Zellen und fügt Zeilen hinzu.
- **`data-manipulations/DeleteMananger.js`**:
  - Löscht Zeilen und passt Beziehungen an.
- **`data-manipulations/RelationsManager.js`**:
  - Verwalten von Beziehungen zwischen Zellen.

#### Formatkonvertierung
- **`format-converter/formatConverter.js`**:
  - Wandelt Datenformate um (JSON, CSV, TSV, XML).
- **`format-converter/formatDetector.js`**:
  - Erkennt das Format der Eingabedaten.

#### Ereignisverwaltung
- **`listeners/EventListeners.js`**:
  - Reagiert auf Tastaturaktionen (z. B. `Shift`, `Delete`).

---

### 3. Hilfsfunktionen (`utils`)
- **`utils/ultis.js`**:
  - Enthält nützliche Funktionen wie ID-Erzeugung, Sortieren und Berechnen von Prozentwerten.

---

### 4. Styles (`styles`)
- **`styles/index.css`**:
  - Verbindet die Haupt-Styles.
- **`styles/Theme.css`**:
  - Definiert Farben, Abstände und Schriftarten.
- **`styles/Components.css`**:
  - Enthält detaillierte Tabellen-Styles.
- **`styles/Global.css`**:
  - Globale Stile wie das Ausblenden von Scrollbars.

---

## API-Referenz

### createTable(config, listeners, options)
- **Beschreibung**: Erstellt eine Tabelle im angegebenen Container.
- **Parameter**:
  - `config`: Tabellenkonfiguration (Daten, Container).
  - `listeners`: Ereignislistener (z. B. `onChange`).
  - `options`: Zusätzliche Optionen für benutzerdefinierte Einstellungen.
---

## Styling
Anpassung der Tabellen durch Überschreiben von CSS-Variablen:
```css
:root {
  --primary: #2a9d8f;
  --font-color: #264653;
  --min-cell-height: 50px;
}
```

---

## Lizenz
Diese Bibliothek ist Open-Source und steht unter der MIT-Lizenz zur Verfügung. Nutzen und modifizieren Sie sie frei in Ihren Projekten.

---

