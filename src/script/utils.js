function changeKeys(obj, keyMap) {
    // Erstelle ein neues Objekt, um die Ergebnisse zu speichern
    let newObj = {};
  
    // Durch alle Schlüssel im Objekt iterieren
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Wenn der Schlüssel in keyMap vorhanden ist, den neuen Schlüssel verwenden
        let newKey = keyMap[key] || key; 
        
        // Kopiere den Wert mit dem neuen Schlüssel in das neue Objekt
        newObj[newKey] = obj[key];
      }
    }
  
    return newObj;
}

// Beispiel zur Verwendung
    let obj = {
    oldKey1: "value1",
    oldKey2: "value2",
    anotherKey: "value3",
    testMe: "value4"
};

// Schlüssel-Mapping: Alter Schlüssel -> Neuer Schlüssel
let keyMap = {
    oldKey1: "",
    oldKey2: "newKey2"
};