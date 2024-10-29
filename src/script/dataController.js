import { gBenuzerListeners, gBenuzerOptions, gTableData } from "./tableBuilder.js";
let gAltesWert = null;

export function beiFeldAenderung(pValue, pSpalteName) {
    const bearbeiteteZeilen = [];
    gTableData.forEach(item => {
        if (item[pSpalteName].trim() == gAltesWert.trim()) {
            item[pSpalteName] = pValue;
            bearbeiteteZeilen.push(item);
        }
    });

    handleSaveNewData(gTableData, bearbeiteteZeilen);
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