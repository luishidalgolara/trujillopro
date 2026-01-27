// nivel_2_ap/nivel-2-tracing.js - CON ETIQUETAS MOVIBLES COMO NIVEL 1
import { svg, connections, currentScale } from '../js/config.js';
import { addConnection } from '../js/config.js';
import { showStatus } from '../js/utils.js';
import { calcularDistancia } from '../js/utils.js';
import { clasificarElementosNivel2AP } from './nivel-2-classifier.js';
import { kruskalMST, clusterElementsByProximity, createPerpendicularPath } from '../js/mst-algorithm.js';
import { calculateOptimalDiameter } from '../js/hydraulic-engine.js';
import { updateCalculations } from '../js/calculations.js';
import { calcularGastosAcumulados, dibujarGastosEnTrazado } from '../js/gastos-acumulados.js';
import { createTextWithDivider } from '../js/draggable-texts.js';

if (!window.CONEXIONES_NIVEL_2) {
    window.CONEXIONES_NIVEL_2 = [];
}

console.log('✅ window.CONEXIONES_NIVEL_2 inicializada:', window.CONEXIONES_NIVEL_2);

export function generarTrazadoNivel2AP(elementosNivel2) {
    if (elementosNivel2.length === 0) {
        showStatus('⚠️ No hay elementos en 2° nivel');
        return;
    }
    
    console.log('🎯 Generando trazado hidráulico 2° nivel...');
    limpiarConexionesNivel2AP();
    
    const elementos = clasificarElementosNivel2AP(elementosNivel2);
    
    if (elementos.medidores.length === 0) {
        showStatus('⚠️ Necesitas agregar una CONEXIÓN 2° NIVEL');
        return;
    }
    
    ejecutarSecuenciaTrazadoNivel2AP(elementos);
    
    console.log('💧 Calculando gastos acumulados nivel 2...');
    const gastosCalculados = calcularGastosAcumulados(window.CONEXIONES_NIVEL_2, elementosNivel2);
    dibujarGastosEnTrazado(gastosCalculados, 2);
    
    console.log('✅ Trazado nivel 2 completado. Total conexiones:', window.CONEXIONES_NIVEL_2.length);
    showStatus(`⚡ Trazado 2° nivel generado con gastos - ${window.CONEXIONES_NIVEL_2.length} conexiones`, 3000);
}

function ejecutarSecuenciaTrazadoNivel2AP(elementos) {
    console.log('🔗 Ejecutando secuencia trazado 2° NIVEL...');
    
    const medidorPrincipal = elementos.medidores[0];
    
    if (elementos.fuentesCalor.length > 0) {
        console.log('🔥 Conectando fuentes de calor nivel 2...');
        elementos.fuentesCalor.forEach(fuente => {
            const diameter = 25;
            createPerpendicularPath(medidorPrincipal, fuente, 'fria', diameter, createTuberiaNivel2Wrapper, 2);
        });
    }
    
    if (elementos.consumo.length > 0) {
        console.log('💧 Conectando elementos de consumo nivel 2...');
        
        const clusters = clusterElementsByProximity(elementos.consumo, 80);
        console.log(`📦 Creados ${clusters.length} clusters en nivel 2`);
        
        clusters.forEach((cluster, index) => {
            const puntosCluster = [medidorPrincipal, ...cluster];
            const mstCluster = kruskalMST(puntosCluster, medidorPrincipal);
            
            mstCluster.forEach(edge => {
                const diameter = calculateOptimalDiameter(edge.fromElement, edge.toElement, 'fria', elementos.consumo, window.CONEXIONES_NIVEL_2);
                createPerpendicularPath(edge.fromElement, edge.toElement, 'fria', diameter, createTuberiaNivel2Wrapper, 2);
            });
            
            console.log(`🔗 Cluster ${index + 1} nivel 2 conectado`);
        });
    }
    
    console.log('✅ Trazado nivel 2 completado');
}

function createTuberiaNivel2Wrapper(desde, hacia, tipoRed, diameter, nivel = 2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', desde.x);
    line.setAttribute('y1', desde.y);
    line.setAttribute('x2', hacia.x);
    line.setAttribute('y2', hacia.y);
    
    let color;
    switch(diameter) {
        case 40: color = '#8b5cf6'; break;
        case 32: color = '#2563eb'; break;
        case 25: color = '#10b981'; break;
        case 20: color = '#ef4444'; break;
        default: color = '#6b7280';
    }
    
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', Math.max(2, diameter / 8));
    line.setAttribute('class', 'pipe-line nivel-2');
    line.setAttribute('data-from', desde.id);
    line.setAttribute('data-to', hacia.id);
    line.setAttribute('data-diameter', diameter);
    line.setAttribute('data-type', tipoRed);
    line.setAttribute('data-nivel', '2');
    
    svg.appendChild(line);
    
    createArrowNivel2(desde, hacia, color);
    
    const distancePixels = calcularDistancia(desde, hacia);
    const distanceMeters = convertPixelsToRealMeters(distancePixels);
    
    // ✅ USAR LA MISMA FUNCIÓN QUE NIVEL 1
    createTextWithDivider(desde, hacia, distanceMeters, diameter, tipoRed, color);
    
    const conexionObj = {
        from: desde,
        to: hacia,
        distance: distanceMeters,
        diameter: diameter,
        type: tipoRed,
        material: 'PPR',
        nivel: 2
    };
    
    window.CONEXIONES_NIVEL_2.push(conexionObj);
    console.log('🔗 Conexión agregada. Total:', window.CONEXIONES_NIVEL_2.length);
    addConnection(conexionObj);
}

function createArrowNivel2(desde, hacia, color) {
    const deltaX = hacia.x - desde.x;
    const deltaY = hacia.y - desde.y;
    
    const arrowX = desde.x + (deltaX * 0.75);
    const arrowY = desde.y + (deltaY * 0.75);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    const arrowGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    arrowGroup.setAttribute('class', 'flow-arrow nivel-2');
    arrowGroup.setAttribute('data-connection', `${desde.id}-${hacia.id}`);
    arrowGroup.setAttribute('data-nivel', '2');
    
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrow.setAttribute('points', '0,-4 8,0 0,4');
    arrow.setAttribute('fill', color);
    arrow.setAttribute('stroke', '#ffffff');
    arrow.setAttribute('stroke-width', '1');
    
    arrowGroup.setAttribute('transform', `translate(${arrowX}, ${arrowY}) rotate(${angle})`);
    arrowGroup.appendChild(arrow);
    svg.appendChild(arrowGroup);
}

export function limpiarConexionesNivel2AP() {
    const lines = svg.querySelectorAll('.pipe-line.nivel-2');
    const arrows = svg.querySelectorAll('.flow-arrow.nivel-2');
    const gastosCirculos = svg.querySelectorAll('.gasto-acumulado.nivel-2');
    const labels = svg.querySelectorAll('g[data-connection-group][data-nivel="2"]');
    
    lines.forEach(line => line.remove());
    arrows.forEach(arrow => arrow.remove());
    gastosCirculos.forEach(c => c.remove());
    labels.forEach(label => label.remove());
    
    window.CONEXIONES_NIVEL_2.length = 0;
    console.log('🧹 Conexiones nivel 2 limpiadas');
}

function convertPixelsToRealMeters(distancePixels) {
    const metersPerPixel = currentScale / 1000;
    return distancePixels * metersPerPixel;
}

export function obtenerConexionesNivel2() {
    return window.CONEXIONES_NIVEL_2;
}

console.log('✅ nivel-2-tracing.js cargado - USANDO ETIQUETAS MOVIBLES DE NIVEL 1');
