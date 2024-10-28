import { beiFeldAenderung, beiFocusIn } from "./dataController.js";

let gLastValues       = {}; // Zum Verfolgen der letzten Werte für jedes Feld
export let gFelder    = [];
export let gTableData = [];
export const gBenuzerOptions = {
    objectIDKey: "id"
}; 

export const gBenuzerListeners = {
    onChange: null,
}; 

// Hauptfunktion zur Erstellung der Tabelle mit dem Config-Objekt
export function erstelleTabelle(pConfig, pOptions, pListeners) {
    handleBenuzerOptions(pOptions);
    handleBenuzerListeners(pListeners);

    const { data: pData, containerSelector: pContainerSelector } = pConfig;
    const gContainer = document.querySelector(pContainerSelector);
    if (!gContainer) {
        console.error('Container für das Grid nicht gefunden');
        return;
    }
    let gGridContent = ''; // HTML-Inhalt für das Grid

    // Holt die Felder außer "id"
    const gFelder = Object.keys(pData[0]).filter(pFeld => pFeld !== gBenuzerOptions.objectIDKey);

    // set grid columns style
    gContainer.style.gridTemplateColumns  = `repeat(${gFelder.length}, 1fr)`;

    // Berechnet die Wiederholungen für jedes Feld
    const gWiederholungen = {};
    gFelder.forEach(pFeld => {
        gWiederholungen[pFeld] = berechneFeldWiederholungen(pData, pFeld);
    });

    // Berechnet die maximalen Spannen und sortiert die Felder
    const gMaxSpannen = berechneMaxSpannen(gFelder, gWiederholungen);
    const gSortierteFelder = sortiereFelderNachMaxSpan(gMaxSpannen);

    // Erstellen des Inhalts für die Spaltenüberschriften und Datenzeilen
    gGridContent += erzeugeSpaltenUeberschriften(gSortierteFelder);
    gGridContent += erzeugeDatenZeilen(pData, gSortierteFelder, gWiederholungen);

    // Setzt den generierten Inhalt in das Container-Element
    gContainer.innerHTML = gGridContent;

    textareaListenersHinzufuegen(pContainerSelector);

    handleBezihungLineHoehe(pContainerSelector);
}

// Berechnet die Anzahl der Wiederholungen für ein bestimmtes Feld
function berechneFeldWiederholungen(pData, pFeld) {
    const gWiederholungen = {};
    pData.forEach(reihe => {
        gWiederholungen[reihe[pFeld]] = (gWiederholungen[reihe[pFeld]] || 0) + 1;
    });
    return gWiederholungen;
}

// Berechnet die maximalen Spannen pro Feld
function berechneMaxSpannen(pFelder, pWiederholungen) {
    return pFelder.map(pFeld => {
        return {
            feld: pFeld,
            maxSpan: Math.max(...Object.values(pWiederholungen[pFeld])) // Größter Wiederholungswert für jedes Feld
        };
    });
}

// Sortiert die Felder basierend auf den maximalen Spannen
function sortiereFelderNachMaxSpan(pMaxSpannen) {
    gFelder = pMaxSpannen.sort((a, b) => b.maxSpan - a.maxSpan).map(item => item.feld);
    return gFelder;
}

// Erstellt die Spaltenüberschriften basierend auf den Feldnamen (keys) der Daten
function erzeugeSpaltenUeberschriften(pFelder) {
    return pFelder.map(pFeld => `<div class="ode-grid-item table-header">${pFeld.charAt(0).toUpperCase() + pFeld.slice(1)}</div>`).join('');
}

// Erstellt die Datenzeilen
function erzeugeDatenZeilen(pData, pFelder, pWiederholungen) {
    gLastValues = {}; // Setzt die letzten Werte zurück bei jeder Generierung
    return pData.map((pReihe, index) => {
        return pFelder.map((pFeld, index_)=> {
            let relationClass = index_+1 == pFelder.length ? "left-relation-line" : "right-relation-line";
            if (pReihe[pFeld] !== gLastValues[pFeld]) {
                gLastValues[pFeld] = pReihe[pFeld];
                return `<div class="ode-grid-item ${relationClass}" style="grid-row: span ${pWiederholungen[pFeld][pReihe[pFeld]]}"> <textarea name="textarea-${index_+"-"+index}"  data-col="${index_}" id="textarea-${index_+"-"+index}" class="ode-grid-item-textarea hide-scrollbar"> ${pReihe[pFeld]} </textarea> </div>`;
            }
            return '';
        }).join('');
    }).join('');
}

function textareaListenersHinzufuegen(pContainerSelector) {
    const gridItems         = document.querySelectorAll('.ode-grid-item');
    const gridItemsTextArea = document.querySelectorAll('.ode-grid-item-textarea');

    gridItems.forEach((item) => {
        item.addEventListener('focusin', (event) => {
            beiFocusIn(event.target.value);
        });

        item.addEventListener('focusout', (event) => {
            beiFeldAenderung(event.target.value, gFelder[item.children[0].getAttribute("data-col")]);
        });
    });

    gridItemsTextArea.forEach((item) => {
        const resizeObserver = new ResizeObserver(() => {
            handleBezihungLineHoehe(pContainerSelector);
        });
        resizeObserver.observe(item);
    });
}

function handleBenuzerOptions(pOptions) {
    for (const key in pOptions) {
        gBenuzerOptions[key] = pOptions[key];
    }
}

function handleBenuzerListeners(pListeners) {
    for (const key in pListeners) {
        gBenuzerListeners[key] = pListeners[key];
    }
}

function handleBezihungLineHoehe(pContainerSelector) {
    const container       = document.querySelector(pContainerSelector);
    const lastHeader      = document.querySelectorAll('.table-header');
    const ContainerHeight = container.getBoundingClientRect().height;

    document.styleSheets[0].insertRule(`
        .table-header::after {
            height: ${ContainerHeight -10}px;
        }
    `, document.styleSheets[0].cssRules.length);

    if (lastHeader.length > 0) {
        lastHeader[lastHeader.length - 1].classList.add('no-after');
    }
}