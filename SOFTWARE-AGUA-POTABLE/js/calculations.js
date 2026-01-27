// js/calculations.js
import { connections, elements, currentScale } from './config.js';
import { PRECIOS_PPR } from './config.js';

export function updateCalculations() {
    let totalPipe = 0;
    let total20mm = 0;
    let total25mm = 0;
    let total32mm = 0;
    let total40mm = 0;
    let totalFria = 0;
    let totalCaliente = 0;
    let totalCost = 0;

    connections.forEach(conn => {
        totalPipe += conn.distance;
        
        if (conn.type === 'fria') {
            totalFria += conn.distance;
        } else if (conn.type === 'arranque') {
            totalFria += conn.distance;
        } else {
            totalCaliente += conn.distance;
        }
        
        switch(conn.diameter) {
            case 20:
                total20mm += conn.distance;
                totalCost += conn.distance * PRECIOS_PPR[20];
                break;
            case 25:
                total25mm += conn.distance;
                totalCost += conn.distance * PRECIOS_PPR[25];
                break;
            case 32:
                total32mm += conn.distance;
                totalCost += conn.distance * PRECIOS_PPR[32];
                break;
            case 40:
                total40mm += conn.distance;
                totalCost += conn.distance * PRECIOS_PPR[40];
                break;
        }
    });

    elements.forEach(element => {
        if (element.especificaciones && element.especificaciones.precio_unitario) {
            totalCost += element.especificaciones.precio_unitario;
        }
    });

    const elementos = {
        'totalPipe': `${totalPipe.toFixed(2)} m`,
        'total20mm': `${total20mm.toFixed(2)} m`,
        'total25mm': `${total25mm.toFixed(2)} m`,
        'total32mm': `${total32mm.toFixed(2)} m`,
        'total40mm': `${total40mm.toFixed(2)} m`,
        'totalFria': `${totalFria.toFixed(2)} m`,
        'totalCaliente': `${totalCaliente.toFixed(2)} m`,
        'totalCost': `${totalCost.toFixed(2)}`
    };

    Object.entries(elementos).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

export function recalculateAllDistances() {
    connections.forEach(conn => {
        const distancePixels = calcularDistancia(conn.from, conn.to);
        conn.distance = convertPixelsToRealMeters(distancePixels);
    });
    
    updateAllConnectionTexts();
}

export function updateAllConnectionTexts() {
    const { svg } = require('./config.js');
    connections.forEach(conn => {
        const connectionTexts = svg.querySelectorAll(`text[data-connection="${conn.from.id}-${conn.to.id}"]`);
        const dividerLines = svg.querySelectorAll(`line[data-connection-divider="${conn.from.id}-${conn.to.id}"]`);
        
        connectionTexts.forEach((text, index) => {
            if (connectionTexts.length === 1) {
                text.textContent = `L=${conn.distance.toFixed(1)}m PPR⌀${conn.diameter}mm`;
            } else if (connectionTexts.length === 2) {
                if (index === 0) {
                    text.textContent = `L=${conn.distance.toFixed(2)}m`;
                } else if (index === 1) {
                    text.textContent = `PPR⌀${conn.diameter}mm`;
                }
            }
        });
    });
}

export function convertPixelsToRealMeters(distancePixels) {
    const metersPerPixel = currentScale / 1000;
    return distancePixels * metersPerPixel;
}

function calcularDistancia(elemento1, elemento2) {
    return Math.sqrt(
        Math.pow(elemento2.x - elemento1.x, 2) + Math.pow(elemento2.y - elemento1.y, 2)
    );
}