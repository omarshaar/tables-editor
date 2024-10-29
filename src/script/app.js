import { erstelleTabelle } from "./tableBuilder.js";

// Beispiel zur Verwendung der Bibliothek
// export var daten = [
//     { "id": 1, "fach": "Deutsch", "themen": "Verortung der Filmhandlung", "methoden": "GA: Den Schauplatz des Films erarbeiten" },
//     { "id": 1, "fach": "Deutsch", "themen": "Verortung der Filmhandlung", "methoden": "GA: Den Schauplatz des Films erarbeiten a" },
//     { "id": 2, "fach": "Deutsch", "themen": "Abenteuergeschichten", "methoden": "GA: Typische Merkmale einer Abenteuergeschichte" },
//     { "id": 3, "fach": "Deutsch", "themen": "Tierfreundschaften", "methoden": "EA: Über eine eigene Tierfreundschaft schreiben" },
//     { "id": 4, "fach": "Deutsch", "themen": "Tierfreundschaften", "methoden": "EA: Filme über Tierfreundschaften ansehen" },
//     { "id": 5, "fach": "Lebenskunde/Ethik/Religion", "themen": "Belle und Sebastian", "methoden": "GA: Besprechen, weshalb der Hund Belle für Sebastian wichtig ist" },
//     { "id": 6, "fach": "Sachkunde", "themen": "Tierearten", "methoden": "EA: In Form eines Steckbriefs" },
//     { "id": 7, "fach": "Sachkunde", "themen": "Leben in den Bergen", "methoden": "GA: Zusammenfassen, was man in den Bergen sehen kann" },
//     { "id": 8, "fach": "Sachkunde", "themen": "Beruf Tiertrainer/in", "methoden": "EA/GA: Den Beruf eines Tiertrainers/in vorstellen" },
//     { "id": 9, "fach": "Sachkunde", "themen": "Recherche und Dokumentation", "methoden": "GA: Nach einem Tiertrainer/einer Tiertrainerin in der Nähe recherchieren" },
//     { "id": 10, "fach": "Kunst", "themen": "Bilder zeichnen", "methoden": "EA: Ein Bild von Belle und Sebastian zeichnen" },
//     { "id": 11, "fach": "Kunst", "themen": "Fotos und Collagen", "methoden": "EA: Fotos aus Zeitschriften ausschneiden" }
// ];

export var daten = [
    { "id": 1, "Schule": "HHEK", "Klasse": "ITV241", "schüler": "omar shaar" },
    { "id": 1, "Schule": "HHEK", "Klasse": "ITV241", "schüler": "Thomas" },
    { "id": 1, "Schule": "HHEK", "Klasse": "ITV241", "schüler": "John" },
    { "id": 1, "Schule": "HHEK", "Klasse": "ITV241", "schüler": "Sara" },
    { "id": 1, "Schule": "HHEK", "Klasse": "ITV241", "schüler": "Claus" },
    { "id": 1, "Schule": "HHEK", "Klasse": "ITS11", "schüler": "Ali" },
    { "id": 1, "Schule": "FRBS", "Klasse": "ITS11", "schüler": "Ali2" },
];

/*************************************************************************************************
**************************************************************************************************
**************************************************************************************************/

window.onCrateTable = onCrateTable;
window.onViewJson   = onViewJson;



function onCrateTable() {
    const dataInput = document.querySelector("#data-input");
    const createBtn = document.querySelector("#create-table-btn");
    const JsonBtn   = document.querySelector("#view-json-btn");

    if (dataInput.value) {
        daten = JSON.parse(dataInput.value);
    }

    const config = {
        data: daten,
        containerSelector: '.ode-table-grid-container'
    };
    
    const options = {
        objectIDKey: "id"
    }
    
    const listeners = {
        onChange: onChangeData
    }

    erstelleTabelle(config, options, listeners);

    dataInput.classList.add("hide");
    createBtn.classList.add("hide");
    JsonBtn.classList.remove("hide");
}

function onViewJson() {
    const beautifiedJson = JSON.stringify(daten, null, 4);
    document.getElementById("jsonDisplay").textContent = beautifiedJson;
    document.getElementById("jsonDisplay").classList.remove("hide");
}

function onChangeData(data) {
    daten = data;
}