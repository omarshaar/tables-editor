
# Craftify Table Library Dokumentation


## Überblick

Die **Craftify Table Library** ist eine JavaScript-Bibliothek, die das Erstellen dynamischer und interaktiver Tabellen vereinfacht. Mit Funktionen wie Datenmanipulation, benutzerdefinierte Tabellenoptionen und Exportmöglichkeiten bietet die Bibliothek eine flexible Lösung für Entwickler.


## Funktionen
1. **Dynamisches Tabellenrendering**:  
   Erstellen Sie Tabellen basierend auf **JSON**, **CSV**, **TSV** oder **XML**. Die Bibliothek erkennt automatisch das Datenformat und konvertiert es bei Bedarf.

2. **Anpassbare Optionen für ID-Schlüssel**:  
   Jede Zeile in der Tabelle benötigt einen eindeutigen Schlüssel (`ID-Schlüssel`), um die Daten effizient zu verarbeiten. Standardmäßig ist dies `id`. Der Benutzer kann jedoch einen anderen Schlüssel angeben, falls die Datenstruktur einen anderen Namen verwendet.  
   **Wichtig**: Der `ID-Schlüssel` wird aus dem Tabellenkopf ausgeschlossen, sodass er nicht in der Benutzeroberfläche angezeigt wird.

3. **Ereignisgesteuerte Funktionen**:  
   Reagieren Sie auf Benutzerinteraktionen wie das Bearbeiten von Daten, Hinzufügen oder Löschen von Zeilen und das Ändern von Beziehungen zwischen Tabellenzellen.

4. **Datenexport**:  
   Exportieren Sie die Tabelleninhalte in verschiedene Formate wie JSON, CSV, TSV oder XML.

5. **Benutzerfreundliches Styling**:  
   Verwenden Sie CSS-Variablen, um das Design einfach anzupassen.

---

## Installation

### Einbindung der Bibliothek

1. **JavaScript-Datei**:
   ```html
   <script src="/path-to-library/craftify-table/index.js" type="module"></script>
   ```

2. **CSS-Datei**:
   ```html
   <link rel="stylesheet" href="/path-to-library/craftify-table/styles/index.css">
   ```

---

## Nutzung

### **Grundlegende Einrichtung**

#### **HTML-Struktur**
Erstellen Sie eine grundlegende Struktur in Ihrer HTML-Datei:
```html
<div id="data-input"></div>
<button id="create-table-btn" onclick="onCrateTable()">Tabelle erstellen</button>
<div id="jsonDisplay" class="hide"></div>
<div class="ode-table-grid-container"></div>
```

---

### **JavaScript-Integration**

#### **Importieren der Funktionen**
```javascript
import { createTable, exportData } from "./craftify-table/index.js";
```

#### **Daten initialisieren**
Definieren Sie die Daten, die in der Tabelle angezeigt werden sollen (z. B. JSON, CSV, TSV oder XML):
```javascript
const data = [
    { id: 1, schule: "HHEK", klasse: "ITV241", schüler: "Thomas" },
    { id: 2, schule: "HHEK", klasse: "ITS11", schüler: "Sara" },
    { id: 3, schule: "FRBS", klasse: "ITS11", schüler: "John" }
];
```

---

### **Konfiguration**

Die **Konfiguration** definiert, wie die Tabelle gerendert wird. Beispiel:
```javascript
const config = {
    data: data, // Unterstützt JSON, CSV, TSV oder XML
    containerSelector: '.ode-table-grid-container'
};
```

---

### **Optionen**

Die **Optionen** legen zusätzliche Einstellungen fest, z. B. Kopfzeilen oder die ID-Schlüssel:
```javascript
const options = {
    objectIDKey: "id", // Der Schlüssel für die eindeutige ID jeder Zeile (standardmäßig "id").
    headers: {
        schule: "Schule", // Benutzerdefinierte Kopfzeile für "schule".
        klasse: "Klasse",
        schüler: "Schüler"
    }
};
```

- **`objectIDKey`**:  
   Dieser Schlüssel wird verwendet, um die eindeutige ID jeder Zeile zu definieren. Wenn Ihre Daten beispielsweise `rowID` statt `id` verwenden, setzen Sie `objectIDKey: "rowID"`.  
   **Hinweis**: Der Schlüssel wird im Tabellenkopf automatisch ausgeblendet.

- **`headers`**:  
   Mit diesem Parameter können Sie die Bezeichnungen der Spalten anpassen.

---

### **Event Listeners**

Mit **Event Listeners** können Sie auf Benutzerinteraktionen reagieren:
```javascript
const listeners = {
    onChange: (editedData, newDataSet, targetColumn) => {
        console.log("Daten geändert:", editedData);
    },
    onDatasetRemove: (removedDataSet, newDataSet) => {
        console.log("Daten entfernt:", removedDataSet);
    },
    onRelationChange: (editedItems, newDataSet, relationKey) => {
        console.log("Beziehungen aktualisiert:", editedItems);
    },
    onAddNewRow: (addedItemsIDs, newDataSet) => {
        console.log("Neue Zeile hinzugefügt:", addedItemsIDs);
    }
};
```

- **`onChange`**: Wird aufgerufen, wenn eine Zelle bearbeitet wird.
- **`onDatasetRemove`**: Wird ausgelöst, wenn eine Zeile gelöscht wird.
- **`onRelationChange`**: Behandelt Änderungen von Beziehungen zwischen Zeilen.
- **`onAddNewRow`**: Reagiert auf das Hinzufügen neuer Zeilen.

---

### **Tabelle erstellen**

Verwenden Sie die Funktion `createTable`, um die Tabelle zu rendern:
```javascript
createTable(config, listeners, options);
```

---

## **Daten exportieren**

Exportieren Sie die Tabellendaten in das gewünschte Format (z. B. JSON):
```javascript
function exportTableData(format) {
    let exportedData = exportData(data, format);
    if (format === "JSON") {
        exportedData = JSON.stringify(JSON.parse(exportedData), null, 4);
    }
    console.log(exportedData);
}
```

---

## **Code-Beispiel**

Hier ist eine vollständige Implementierung:
```javascript
import { createTable, exportData } from "./craftify-table/index.js";

const data = [
    { id: 1, schule: "HHEK", klasse: "ITV241", schüler: "Thomas" },
    { id: 2, schule: "HHEK", klasse: "ITS11", schüler: "Sara" },
    { id: 3, schule: "FRBS", klasse: "ITS11", schüler: "John" }
];

const config = {
    data: data,
    containerSelector: '.ode-table-grid-container'
};

const options = {
    objectIDKey: "id",
    headers: {
        schule: "Schule",
        klasse: "Klasse",
        schüler: "Schüler"
    }
};

const listeners = {
    onChange: (editedData, newDataSet, targetColumn) => {
        console.log("Daten geändert:", editedData);
    },
    onDatasetRemove: (removedDataSet, newDataSet) => {
        console.log("Daten entfernt:", removedDataSet);
    },
    onRelationChange: (editedItems, newDataSet, relationKey) => {
        console.log("Beziehungen aktualisiert:", editedItems);
    },
    onAddNewRow: (addedItemsIDs, newDataSet) => {
        console.log("Neue Zeile hinzugefügt:", addedItemsIDs);
    }
};

createTable(config, listeners, options);
```

---

### **Fazit**

Die Craftify Table Library bietet eine leistungsstarke Möglichkeit, dynamische und interaktive Tabellen in Ihren Projekten zu integrieren. Sie unterstützt verschiedene Datenformate und bietet flexible Optionen, um Tabellen an Ihre Anforderungen anzupassen. Die klare Trennung von Konfiguration, Optionen und Event Listeners macht die Bibliothek besonders benutzerfreundlich.
