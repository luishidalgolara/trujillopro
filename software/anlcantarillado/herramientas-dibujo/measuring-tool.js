// ================================
// MEASURING TOOL - Herramienta de Medición
// ================================

let measuringMode = false;
let measuringStartPoint = null;
let measuringTempLine = null;
let measuringLabel = null;
let isDraggingMeasurement = false;
let draggedGrip = null;
let draggedMeasurement = null;
let isMovingMeasurement = false;
let movingStartPoint = null;
let originalP1 = null;
let originalP2 = null;

// ================================
// ACTIVAR/DESACTIVAR MODO MEDICIÓN
// ================================

function toggleMeasuringMode() {
    measuringMode = !measuringMode;
    
    const btn = document.querySelector('[onclick="toggleMeasuringMode()"]');
    if (btn) {
        if (measuringMode) {
            btn.style.background = '#3498db';
            btn.style.color = 'white';
            showStatus('📏 Modo Medición: Click punto inicial (F8 para ORTHO)');
        } else {
            btn.style.background = '';
            btn.style.color = '';
            limpiarMedicion();
            showStatus('Modo medición desactivado');
        }
    }
}

// ================================
// MANEJO DE CLICKS
// ================================

function handleMeasuringClick(coords) {
    if (!measuringMode) return false;
    
    // Buscar snap
    const snapPoint = window.OSNAPCore.encontrarPuntoSnap(coords);
    let finalCoords = snapPoint || coords;
    
    if (!measuringStartPoint) {
        // Primer click - punto inicial
        measuringStartPoint = finalCoords;
        
        // 🔲 ESTABLECER PUNTO INICIO PARA ORTHO
        if (window.ORTHOSystem) {
            window.ORTHOSystem.establecerPuntoInicioOrtho(finalCoords);
        }
        
        crearLineaTemporal(finalCoords);
        showStatus('📏 Click punto final para medir (F8 para ORTHO)');
        return true;
    } else {
        // 🔲 APLICAR RESTRICCIÓN ORTHO SI ESTÁ ACTIVO
        if (window.ORTHOSystem && window.ORTHOSystem.estaOrthoActivo()) {
            finalCoords = window.ORTHOSystem.aplicarRestriccionOrtho(measuringStartPoint, finalCoords);
        }
        
        // Segundo click - punto final
        const distanciaPx = window.OSNAPCore.distancia(measuringStartPoint, finalCoords);
        const distanciaReal = convertirDistancia(distanciaPx);
        
        finalizarMedicion(measuringStartPoint, finalCoords, distanciaReal);
        
        // Reset para nueva medición
        measuringStartPoint = null;
        
        // 🔲 LIMPIAR PUNTO ORTHO
        if (window.ORTHOSystem) {
            window.ORTHOSystem.limpiarPuntoInicioOrtho();
        }
        
        showStatus(`📏 Distancia: ${distanciaReal.toFixed(2)}m - Click para medir otra`);
        return true;
    }
}

// ================================
// ACTUALIZAR LÍNEA TEMPORAL
// ================================

function actualizarLineaTemporal(coords) {
    if (!measuringMode || !measuringStartPoint || !measuringTempLine) return;
    
    const snapPoint = window.OSNAPCore.encontrarPuntoSnap(coords);
    let finalCoords = snapPoint || coords;
    
    // 🔲 APLICAR RESTRICCIÓN ORTHO SI ESTÁ ACTIVO
    if (window.ORTHOSystem && window.ORTHOSystem.estaOrthoActivo()) {
        finalCoords = window.ORTHOSystem.aplicarRestriccionOrtho(measuringStartPoint, finalCoords);
    }
    
    measuringTempLine.setAttribute('x2', finalCoords.x);
    measuringTempLine.setAttribute('y2', finalCoords.y);
    
    // Actualizar etiqueta temporal
    const distanciaPx = window.OSNAPCore.distancia(measuringStartPoint, finalCoords);
    const distanciaReal = convertirDistancia(distanciaPx);
    
    if (measuringLabel) {
        const midX = (measuringStartPoint.x + finalCoords.x) / 2;
        const midY = (measuringStartPoint.y + finalCoords.y) / 2;
        
        measuringLabel.setAttribute('x', midX);
        measuringLabel.setAttribute('y', midY - 5);
        measuringLabel.textContent = `${distanciaReal.toFixed(2)}m`;
    }
}

// ================================
// CREAR ELEMENTOS VISUALES
// ================================

function crearLineaTemporal(punto) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    // Línea temporal
    measuringTempLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    measuringTempLine.setAttribute('x1', punto.x);
    measuringTempLine.setAttribute('y1', punto.y);
    measuringTempLine.setAttribute('x2', punto.x);
    measuringTempLine.setAttribute('y2', punto.y);
    measuringTempLine.setAttribute('stroke', '#3498db');
    measuringTempLine.setAttribute('stroke-width', '2');
    measuringTempLine.setAttribute('stroke-dasharray', '5,5');
    measuringTempLine.setAttribute('class', 'measuring-temp');
    
    // Etiqueta temporal
    measuringLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    measuringLabel.setAttribute('x', punto.x);
    measuringLabel.setAttribute('y', punto.y);
    measuringLabel.setAttribute('fill', '#3498db');
    measuringLabel.setAttribute('font-size', '12');
    measuringLabel.setAttribute('font-weight', 'bold');
    measuringLabel.setAttribute('text-anchor', 'middle');
    measuringLabel.setAttribute('class', 'measuring-temp');
    measuringLabel.textContent = '0.00m';
    
    tracingSvg.appendChild(measuringTempLine);
    tracingSvg.appendChild(measuringLabel);
}

function finalizarMedicion(p1, p2, distancia) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    // Crear grupo permanente
    const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    grupo.setAttribute('class', 'measurement-group');
    grupo.setAttribute('data-p1x', p1.x);
    grupo.setAttribute('data-p1y', p1.y);
    grupo.setAttribute('data-p2x', p2.x);
    grupo.setAttribute('data-p2y', p2.y);
    
    // Línea de medición
    const linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    linea.setAttribute('x1', p1.x);
    linea.setAttribute('y1', p1.y);
    linea.setAttribute('x2', p2.x);
    linea.setAttribute('y2', p2.y);
    linea.setAttribute('stroke', '#3498db');
    linea.setAttribute('stroke-width', '2');
    linea.setAttribute('class', 'measurement-line');
    linea.style.cursor = 'move';
    
    // Flechas extremos
    const flecha1 = crearFlecha(p1, p2);
    flecha1.setAttribute('class', 'measurement-arrow-1');
    const flecha2 = crearFlecha(p2, p1);
    flecha2.setAttribute('class', 'measurement-arrow-2');
    
    // Etiqueta de distancia
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', midX - 30);
    rect.setAttribute('y', midY - 15);
    rect.setAttribute('width', '60');
    rect.setAttribute('height', '20');
    rect.setAttribute('fill', 'white');
    rect.setAttribute('stroke', '#3498db');
    rect.setAttribute('stroke-width', '1');
    rect.setAttribute('rx', '3');
    rect.setAttribute('class', 'measurement-rect');
    rect.style.cursor = 'move';
    
    const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    texto.setAttribute('x', midX);
    texto.setAttribute('y', midY + 3);
    texto.setAttribute('fill', '#3498db');
    texto.setAttribute('font-size', '10');
    texto.setAttribute('font-weight', 'bold');
    texto.setAttribute('text-anchor', 'middle');
    texto.setAttribute('class', 'measurement-text');
    texto.textContent = `${distancia.toFixed(2)}m`;
    texto.style.pointerEvents = 'none';
    
    // 🔧 CÍRCULOS DE CONTROL (GRIPS)
    const grip1 = crearGrip(p1.x, p1.y, 'grip1');
    const grip2 = crearGrip(p2.x, p2.y, 'grip2');
    
    grupo.appendChild(linea);
    grupo.appendChild(flecha1);
    grupo.appendChild(flecha2);
    grupo.appendChild(rect);
    grupo.appendChild(texto);
    grupo.appendChild(grip1);
    grupo.appendChild(grip2);
    
    tracingSvg.appendChild(grupo);
    
    // 🔧 HACER MEDICIÓN EDITABLE
    if (window.DrawingEdit) {
        window.DrawingEdit.hacerMedicionEditable(grupo);
    }
    
    // 🔧 ACTIVAR CONTROLES
    configurarControlesMedicion(grupo);
    
    limpiarMedicion();
}

function crearGrip(x, y, id) {
    const grip = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    grip.setAttribute('cx', x);
    grip.setAttribute('cy', y);
    grip.setAttribute('r', '5');
    grip.setAttribute('fill', '#e74c3c');
    grip.setAttribute('stroke', 'white');
    grip.setAttribute('stroke-width', '2');
    grip.setAttribute('class', `measurement-grip ${id}`);
    grip.style.cursor = 'pointer';
    grip.style.opacity = '0';
    grip.style.transition = 'opacity 0.2s';
    
    return grip;
}

function crearFlecha(desde, hacia) {
    const dx = hacia.x - desde.x;
    const dy = hacia.y - desde.y;
    const angulo = Math.atan2(dy, dx);
    
    const flecha = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const tamano = 8;
    
    const puntos = [
        `${desde.x},${desde.y}`,
        `${desde.x + tamano * Math.cos(angulo - Math.PI / 6)},${desde.y + tamano * Math.sin(angulo - Math.PI / 6)}`,
        `${desde.x + tamano * Math.cos(angulo + Math.PI / 6)},${desde.y + tamano * Math.sin(angulo + Math.PI / 6)}`
    ];
    
    flecha.setAttribute('points', puntos.join(' '));
    flecha.setAttribute('fill', '#3498db');
    
    return flecha;
}

// ================================
// 🔧 CONFIGURACIÓN DE CONTROLES
// ================================

function configurarControlesMedicion(grupo) {
    const linea = grupo.querySelector('.measurement-line');
    const rect = grupo.querySelector('.measurement-rect');
    const grip1 = grupo.querySelector('.grip1');
    const grip2 = grupo.querySelector('.grip2');
    
    // Mostrar grips al hover
    grupo.addEventListener('mouseenter', function() {
        grip1.style.opacity = '1';
        grip2.style.opacity = '1';
    });
    
    grupo.addEventListener('mouseleave', function() {
        if (!isDraggingMeasurement && !isMovingMeasurement) {
            grip1.style.opacity = '0';
            grip2.style.opacity = '0';
        }
    });
    
    // MOVER TODA LA MEDICIÓN (click en línea o rect)
    linea.addEventListener('mousedown', iniciarMovimiento);
    rect.addEventListener('mousedown', iniciarMovimiento);
    
    // REDIMENSIONAR (click en grips)
    grip1.addEventListener('mousedown', (e) => iniciarRedimension(e, grupo, 'grip1'));
    grip2.addEventListener('mousedown', (e) => iniciarRedimension(e, grupo, 'grip2'));
}

function iniciarMovimiento(e) {
    if (measuringMode || e.target.classList.contains('measurement-grip')) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    isMovingMeasurement = true;
    draggedMeasurement = e.target.closest('.measurement-group');
    
    const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
    movingStartPoint = coords;
    
    originalP1 = {
        x: parseFloat(draggedMeasurement.getAttribute('data-p1x')),
        y: parseFloat(draggedMeasurement.getAttribute('data-p1y'))
    };
    originalP2 = {
        x: parseFloat(draggedMeasurement.getAttribute('data-p2x')),
        y: parseFloat(draggedMeasurement.getAttribute('data-p2y'))
    };
    
    showStatus('📏 Moviendo medición...');
}

function iniciarRedimension(e, grupo, grip) {
    e.preventDefault();
    e.stopPropagation();
    
    isDraggingMeasurement = true;
    draggedGrip = grip;
    draggedMeasurement = grupo;
    
    const puntoFijo = grip === 'grip1' ?
        { x: parseFloat(grupo.getAttribute('data-p2x')), y: parseFloat(grupo.getAttribute('data-p2y')) } :
        { x: parseFloat(grupo.getAttribute('data-p1x')), y: parseFloat(grupo.getAttribute('data-p1y')) };
    
    if (window.ORTHOSystem) {
        window.ORTHOSystem.establecerPuntoInicioOrtho(puntoFijo);
    }
    
    showStatus('📏 Redimensionando medición (F8 para ORTHO)');
}

// ================================
// EVENTOS GLOBALES
// ================================

document.addEventListener('mousemove', function(e) {
    if (isMovingMeasurement && draggedMeasurement) {
        const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
        const deltaX = coords.x - movingStartPoint.x;
        const deltaY = coords.y - movingStartPoint.y;
        
        const nuevoP1 = { x: originalP1.x + deltaX, y: originalP1.y + deltaY };
        const nuevoP2 = { x: originalP2.x + deltaX, y: originalP2.y + deltaY };
        
        draggedMeasurement.setAttribute('data-p1x', nuevoP1.x);
        draggedMeasurement.setAttribute('data-p1y', nuevoP1.y);
        draggedMeasurement.setAttribute('data-p2x', nuevoP2.x);
        draggedMeasurement.setAttribute('data-p2y', nuevoP2.y);
        
        actualizarGeometria(draggedMeasurement, nuevoP1, nuevoP2, false);
    }
    
    if (isDraggingMeasurement && draggedMeasurement) {
        const coords = window.EditorCoordinates.obtenerCoordsRelativas(e);
        const snapPoint = window.OSNAPCore.encontrarPuntoSnap(coords);
        let finalCoords = snapPoint || coords;
        
        if (window.ORTHOSystem && window.ORTHOSystem.estaOrthoActivo()) {
            const puntoFijo = draggedGrip === 'grip1' ?
                { x: parseFloat(draggedMeasurement.getAttribute('data-p2x')), y: parseFloat(draggedMeasurement.getAttribute('data-p2y')) } :
                { x: parseFloat(draggedMeasurement.getAttribute('data-p1x')), y: parseFloat(draggedMeasurement.getAttribute('data-p1y')) };
            finalCoords = window.ORTHOSystem.aplicarRestriccionOrtho(puntoFijo, finalCoords);
        }
        
        let p1, p2;
        if (draggedGrip === 'grip1') {
            p1 = finalCoords;
            p2 = { x: parseFloat(draggedMeasurement.getAttribute('data-p2x')), y: parseFloat(draggedMeasurement.getAttribute('data-p2y')) };
            draggedMeasurement.setAttribute('data-p1x', p1.x);
            draggedMeasurement.setAttribute('data-p1y', p1.y);
        } else {
            p1 = { x: parseFloat(draggedMeasurement.getAttribute('data-p1x')), y: parseFloat(draggedMeasurement.getAttribute('data-p1y')) };
            p2 = finalCoords;
            draggedMeasurement.setAttribute('data-p2x', p2.x);
            draggedMeasurement.setAttribute('data-p2y', p2.y);
        }
        
        actualizarGeometria(draggedMeasurement, p1, p2, true);
    }
});

document.addEventListener('mouseup', function(e) {
    if (isMovingMeasurement) {
        isMovingMeasurement = false;
        
        if (draggedMeasurement) {
            const grips = draggedMeasurement.querySelectorAll('.measurement-grip');
            grips.forEach(g => g.style.opacity = '0');
        }
        
        draggedMeasurement = null;
        movingStartPoint = null;
        originalP1 = null;
        originalP2 = null;
        showStatus('📏 Medición reubicada');
    }
    
    if (isDraggingMeasurement) {
        isDraggingMeasurement = false;
        
        if (draggedMeasurement) {
            const grips = draggedMeasurement.querySelectorAll('.measurement-grip');
            grips.forEach(g => g.style.opacity = '0');
        }
        
        if (window.ORTHOSystem) {
            window.ORTHOSystem.limpiarPuntoInicioOrtho();
        }
        
        draggedGrip = null;
        draggedMeasurement = null;
        showStatus('📏 Medición actualizada');
    }
});

function actualizarGeometria(grupo, p1, p2, actualizarDistancia) {
    const linea = grupo.querySelector('.measurement-line');
    linea.setAttribute('x1', p1.x);
    linea.setAttribute('y1', p1.y);
    linea.setAttribute('x2', p2.x);
    linea.setAttribute('y2', p2.y);
    
    const flecha1 = grupo.querySelector('.measurement-arrow-1');
    const flecha2 = grupo.querySelector('.measurement-arrow-2');
    const nuevaFlecha1 = crearFlecha(p1, p2);
    const nuevaFlecha2 = crearFlecha(p2, p1);
    flecha1.setAttribute('points', nuevaFlecha1.getAttribute('points'));
    flecha2.setAttribute('points', nuevaFlecha2.getAttribute('points'));
    
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    
    const rect = grupo.querySelector('.measurement-rect');
    rect.setAttribute('x', midX - 30);
    rect.setAttribute('y', midY - 15);
    
    const texto = grupo.querySelector('.measurement-text');
    texto.setAttribute('x', midX);
    texto.setAttribute('y', midY + 3);
    
    if (actualizarDistancia) {
        const distanciaPx = window.OSNAPCore.distancia(p1, p2);
        const distanciaReal = convertirDistancia(distanciaPx);
        texto.textContent = `${distanciaReal.toFixed(2)}m`;
    }
    
    const grip1 = grupo.querySelector('.grip1');
    const grip2 = grupo.querySelector('.grip2');
    grip1.setAttribute('cx', p1.x);
    grip1.setAttribute('cy', p1.y);
    grip2.setAttribute('cx', p2.x);
    grip2.setAttribute('cy', p2.y);
}

// ================================
// CONVERSIÓN DE DISTANCIAS
// ================================

function convertirDistancia(distanciaPx) {
    const escalaActual = plans[currentPlanIndex].tracingScale || 50;
    const formatData = formats[currentFormat];
    
    const factorPxToMm = formatData.realWidth / formatData.width;
    const distanciaMm = distanciaPx * factorPxToMm;
    const distanciaReal = (distanciaMm * escalaActual) / 1000;
    
    return distanciaReal;
}

// ================================
// LIMPIEZA
// ================================

function limpiarMedicion() {
    const tracingSvg = document.getElementById('tracingSvg');
    
    if (measuringTempLine) {
        measuringTempLine.remove();
        measuringTempLine = null;
    }
    
    if (measuringLabel) {
        measuringLabel.remove();
        measuringLabel = null;
    }
    
    if (window.ORTHOSystem) {
        window.ORTHOSystem.limpiarPuntoInicioOrtho();
    }
}

function limpiarTodasMediciones() {
    const tracingSvg = document.getElementById('tracingSvg');
    const mediciones = tracingSvg.querySelectorAll('.measurement-group');
    mediciones.forEach(m => m.remove());
    limpiarMedicion();
    showStatus('Mediciones eliminadas');
}

// ================================
// EXPORTAR
// ================================

window.MeasuringTool = {
    toggleMeasuringMode,
    handleMeasuringClick,
    actualizarLineaTemporal,
    limpiarTodasMediciones,
    estaMidiendo: () => measuringMode,
    estaArrastrando: () => isDraggingMeasurement || isMovingMeasurement
};

console.log('✅ measuring-tool.js cargado');