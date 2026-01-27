// js/hydraulic-engine.js
import { elements, connections } from './config.js';
import { calcularDistancia } from './utils.js';

export function calculateDownstreamDemand(fromElement, allElements, allConnections) {
    const visited = new Set();
    const downstream = [];
    
    function findDownstreamElements(element) {
        if (visited.has(element.id)) return;
        visited.add(element.id);
        
        allConnections.forEach(conn => {
            if (conn.from.id === element.id && !visited.has(conn.to.id)) {
                downstream.push(conn.to);
                findDownstreamElements(conn.to);
            }
        });
        
        allElements.forEach(el => {
            if (!visited.has(el.id) && el.categoria === 'consumo') {
                const distance = calcularDistancia(element, el);
                if (distance < 100) {
                    downstream.push(el);
                }
            }
        });
    }
    
    findDownstreamElements(fromElement);
    return downstream;
}

export function calculateDemandScore(downstreamElements) {
    let score = 0;
    let hasHighDemand = false;
    
    downstreamElements.forEach(element => {
        if (element.especificaciones) {
            score += element.especificaciones.caudal_diseño || 0.1;
            
            if (element.especificaciones.categoria_demanda === 'alta') {
                hasHighDemand = true;
                score += 0.3;
            }
            
            if (element.type === 'ducha') {
                hasHighDemand = true;
                score += 0.4;
            }
            
            if (element.type === 'lavadora') {
                hasHighDemand = true;
                score += 0.3;
            }
        }
    });
    
    return { score, hasHighDemand, elementCount: downstreamElements.length };
}

export function calculateOptimalDiameter(origen, destino, tipoRed, allElements = elements, allConnections = connections) {
    console.log(`🔧 Calculando diámetro: ${origen.type} → ${destino.type} (${tipoRed})`);
    
    if (['calefon', 'termo-electrico', 'caldera'].includes(origen.type)) {
        console.log(`🔥 Fuente de calor detectada: ${origen.type} → DIÁMETRO 25mm`);
        return 25;
    }
    
    if (destino.type === 'ducha') {
        console.log(`🚿 Ducha detectada → DIÁMETRO 25mm OBLIGATORIO`);
        return 25;
    }
    
    if (destino.especificaciones?.categoria_demanda === 'alta') {
        console.log(`⚡ Alta demanda detectada: ${destino.type} → DIÁMETRO 25mm`);
        return 25;
    }
    
    if (origen.type === 'medidor-agua') {
        const downstream = calculateDownstreamDemand(destino, allElements, allConnections);
        const demandAnalysis = calculateDemandScore(downstream);
        
        console.log(`💧 Análisis desde medidor: ${demandAnalysis.elementCount} elementos, score: ${demandAnalysis.score.toFixed(2)}`);
        
        if (demandAnalysis.elementCount >= 8 || demandAnalysis.score >= 1.5) {
            console.log(`🟣 MATRIZ PRINCIPAL REFORZADA → DIÁMETRO 40mm`);
            return 40;
        }
        
        if (demandAnalysis.elementCount >= 4 || demandAnalysis.score >= 0.8 || demandAnalysis.hasHighDemand) {
            console.log(`🔵 MATRIZ PRINCIPAL → DIÁMETRO 32mm`);
            return 32;
        }
        
        console.log(`🟢 LÍNEA SECUNDARIA → DIÁMETRO 25mm`);
        return 25;
    }
    
    const distancia = calcularDistancia(origen, destino);
    const downstream = calculateDownstreamDemand(destino, allElements, allConnections);
    const demandAnalysis = calculateDemandScore(downstream);
    
    console.log(`📏 Distancia: ${distancia.toFixed(1)}px, Elementos downstream: ${demandAnalysis.elementCount}`);
    
    if (distancia > 150 && demandAnalysis.elementCount >= 3) {
        console.log(`📐 Línea larga con múltiples elementos → DIÁMETRO 25mm`);
        return 25;
    }
    
    if (demandAnalysis.elementCount >= 3) {
        console.log(`🔗 Múltiples elementos → DIÁMETRO 25mm`);
        return 25;
    }
    
    let diametroBase;
    if (tipoRed === 'fria') {
        diametroBase = destino.tuberia_diametro_fria || destino.especificaciones?.diametro_entrada || 20;
    } else {
        diametroBase = destino.tuberia_diametro_caliente || destino.especificaciones?.diametro_salida || 20;
    }
    
    console.log(`✅ Diámetro final asignado: ${diametroBase}mm`);
    return diametroBase;
}