import { daten } from "./app.js";
import { gBenuzerListeners, gBenuzerOptions } from "./tableBuilder.js";

let gAltesWert = null;

export function beiFeldAenderung(pValue, pSpalteName) {
    const bearbeiteteZeilen = [];
    daten.forEach(item => {
        if (item[pSpalteName].trim() == gAltesWert.trim()) {
            item[pSpalteName] = pValue;
            bearbeiteteZeilen.push(item);
        }
    });

    handleSaveNewData(daten, bearbeiteteZeilen);
}

export function beiFocusIn(pValue) {
    gAltesWert = pValue;
}

function handleSaveNewData(pData, pElements) {
    // call on 
    if (gBenuzerListeners.onChange) {
        gBenuzerListeners.onChange(pData, pElements);
    }
}