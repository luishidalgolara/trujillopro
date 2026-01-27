// trazado-modules/point-editor-actions.js
// ============================================================
// ACCIONES DEL EDITOR DE PUNTOS
// Reconexión, Validación, Updates y Helpers
// ============================================================

// ============================================================
// IMPORTAR FUNCIÓN DE ACTUALIZACIÓN DE LEADER LINE
// ============================================================
async function updateElasticLeaderLine(connectionId, textX, textY) {
    try {
        const { updateElasticLeaderLine: updateLeader } = await import('../js/draggable-texts.js');
        if (updateLeader) {
            updateLeader(connectionId, textX, textY);
        }
    } catch (error) {
        console.warn('updateElasticLeaderLine no disponible:', error);
    }
}

// ============================================================
// FUNCIÓN DE CONVERSIÓN DE COORDENADAS
// ============================================================
function convertirCoordenadas(clientX, clientY) {
    const tracingSvg = document.getElementById('plano');
    const pt = tracingSvg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    
    const svgMatrix = tracingSvg.getScreenCTM().inverse();
    const svgPoint = pt.matrixTransform(svgMatrix);
    
    return { x: svgPoint.x, y: svgPoint.y };
}

// ============================================================
// RECONECTAR LÍNEA A NUEVO DESTINO
// ============================================================
function reconectarLineaANuevoDestino(linea, circulo, nuevoDestino) {
    const fromId = parseInt(linea.getAttribute('data-from'));
    const oldToId = parseInt(linea.getAttribute('data-to'));
    
    console.log(`🔄 Reconectando: ${fromId} → ${oldToId} AHORA → ${nuevoDestino.id}`);
    
    // ⭐ CASO ESPECIAL: Si es una intersección virtual
    if (nuevoDestino.isVirtual) {
        console.log('📐 Reconexión a intersección - Creando conexión en ángulo');
        
        linea.setAttribute('x1', nuevoDestino.x);
        linea.setAttribute('y1', nuevoDestino.y);
        linea.setAttribute('data-to', nuevoDestino.id);
        
        circulo.setAttribute('cx', nuevoDestino.x);
        circulo.setAttribute('cy', nuevoDestino.y);
        circulo.setAttribute('data-line-to', nuevoDestino.id);
        
        if (typeof updateArrowForLine === 'function') {
            updateArrowForLine(linea);
        }
        
        const labelGroup = document.querySelector(`.pipe-label-group[data-connection="${fromId}-${oldToId}"]`);
        if (labelGroup) {
            labelGroup.setAttribute('data-connection', `${fromId}-${nuevoDestino.id}`);
            if (typeof updateLabelForLine === 'function') {
                updateLabelForLine(linea);
            }
        }
        
        // Actualizar longitud en etiqueta
        actualizarSoloLongitud(linea, nuevoDestino.x, nuevoDestino.y);
        
        return;
    }
    
    // CASO NORMAL: Reconexión a un elemento existente
    const newToId = nuevoDestino.id;
    
    linea.setAttribute('x1', nuevoDestino.x);
    linea.setAttribute('y1', nuevoDestino.y);
    linea.setAttribute('data-to', newToId);
    
    circulo.setAttribute('cx', nuevoDestino.x);
    circulo.setAttribute('cy', nuevoDestino.y);
    circulo.setAttribute('data-line-to', newToId);
    
    const oldArrow = document.querySelector(`[data-connection="${fromId}-${oldToId}"].flow-arrow`);
    if (oldArrow) {
        oldArrow.setAttribute('data-connection', `${fromId}-${newToId}`);
    }
    if (typeof updateArrowForLine === 'function') {
        updateArrowForLine(linea);
    }
    
    actualizarEtiquetaReconectada(fromId, oldToId, newToId, nuevoDestino);
    
    // ✅ CORREGIDO: Acceso directo a window.connections
    const conexion = window.connections.find(conn => 
        conn.from.id === fromId && conn.to.id === oldToId
    );
    
    if (conexion) {
        conexion.to = nuevoDestino;
        
        // Obtener escala actual del trazado
        const tracingScale = window.currentScale || 50;
        
        const distanceMillimeters = calcularDistancia(conexion.from, nuevoDestino);
        conexion.distance = convertMillimetersToRealMeters(distanceMillimeters, tracingScale);
        
        console.log(`✅ Conexión actualizada: ${conexion.distance.toFixed(2)}m`);
    }
}

// ============================================================
// ACTUALIZAR SOLO LA LONGITUD (NO DIÁMETRO NI PENDIENTE)
// ============================================================
function actualizarSoloLongitud(linea, newX, newY) {
    const fromId = parseInt(linea.getAttribute('data-from'));
    const toId = linea.getAttribute('data-to');
    
    console.log('📏 Actualizando solo longitud...');
    
    const elementoOrigen = encontrarElementoPorId(fromId);
    if (!elementoOrigen) {
        console.error('❌ No se encontró elemento origen');
        return;
    }
    
    // Obtener escala actual del trazado
    const tracingScale = window.currentScale || 50;
    
    const distanceMillimeters = calcularDistancia(elementoOrigen, { x: newX, y: newY });
    const distanceMeters = convertMillimetersToRealMeters(distanceMillimeters, tracingScale);
    
    console.log(`📏 Nueva distancia: ${distanceMeters.toFixed(2)}m`);
    
    const connectionId = `${fromId}-${toId}`;
    
    // ✅ ACTUALIZAR ETIQUETA VISUAL
    const textGroup = document.querySelector(`g[data-connection-group="${connectionId}"]`);
    if (textGroup) {
        const distanceText = textGroup.querySelector('text[data-text-type="distance"]');
        if (distanceText) {
            distanceText.textContent = `L=${distanceMeters.toFixed(2)}m`;
            console.log(`✅ Etiqueta visual actualizada: ${distanceMeters.toFixed(2)}m`);
        }
    }
    
    // ✅ Actualizar leader line
    if (typeof updateElasticLeaderLine === 'function') {
        const bgRect = textGroup?.querySelector('rect[data-bg-rect]');
        if (bgRect) {
            const textX = parseFloat(bgRect.getAttribute('x')) + 40;
            const textY = parseFloat(bgRect.getAttribute('y')) + 16;
            updateElasticLeaderLine(connectionId, textX, textY);
        }
    }
    
    if (typeof updateArrowForLine === 'function') {
        updateArrowForLine(linea);
    }
    
    // ✅ CORREGIDO: Acceso directo a window.connections
    if (!toId.toString().includes('intersection')) {
        const conexion = window.connections.find(conn => 
            conn.from.id === fromId && conn.to.id == toId
        );
        
        if (conexion) {
            // ✅ ACTUALIZAR: Coordenadas del punto final (to)
            conexion.to.x = newX;
            conexion.to.y = newY;
            conexion.distance = distanceMeters;
            console.log(`✅ Conexión TO actualizada: x=${newX.toFixed(2)}, y=${newY.toFixed(2)}, distancia=${distanceMeters.toFixed(2)}m`);
        }
        
        // ✅ NUEVO: Buscar si este punto también es el INICIO de otra conexión
        const conexionSiguiente = window.connections.find(conn => 
            conn.from.id == toId
        );
        
        if (conexionSiguiente) {
            // Actualizar coordenadas del punto de inicio (from)
            conexionSiguiente.from.x = newX;
            conexionSiguiente.from.y = newY;
            
            // Recalcular distancia de la conexión siguiente
            const distanceMillimeters2 = calcularDistancia(conexionSiguiente.from, conexionSiguiente.to);
            conexionSiguiente.distance = convertMillimetersToRealMeters(distanceMillimeters2, tracingScale);
            
            console.log(`✅ Conexión FROM siguiente actualizada: x=${newX.toFixed(2)}, y=${newY.toFixed(2)}, distancia=${conexionSiguiente.distance.toFixed(2)}m`);
            
            // Actualizar etiqueta visual del siguiente segmento
            const connectionId2 = `${conexionSiguiente.from.id}-${conexionSiguiente.to.id}`;
            const textGroup2 = document.querySelector(`g[data-connection-group="${connectionId2}"]`);
            if (textGroup2) {
                const distanceText2 = textGroup2.querySelector('text[data-text-type="distance"]');
                if (distanceText2) {
                    distanceText2.textContent = `L=${conexionSiguiente.distance.toFixed(2)}m`;
                    console.log(`✅ Etiqueta del siguiente segmento actualizada: ${conexionSiguiente.distance.toFixed(2)}m`);
                }
            }
        }
        
        // ✅ Actualizar cálculos
        if (typeof window.updateCalculations === 'function') {
            window.updateCalculations();
        }
    }
}

// ============================================================
// ACTUALIZAR ETIQUETA DESPUÉS DE RECONEXIÓN
// ============================================================
function actualizarEtiquetaReconectada(fromId, oldToId, newToId, nuevoDestino) {
    const oldConnectionId = `${fromId}-${oldToId}`;
    const newConnectionId = `${fromId}-${newToId}`;
    
    // ✅ Buscar el grupo de texto correcto (data-connection-group)
    const textGroup = document.querySelector(`g[data-connection-group="${oldConnectionId}"]`);
    if (!textGroup) {
        console.warn('⚠️ No se encontró etiqueta para actualizar');
        return;
    }
    
    // Actualizar el ID de conexión
    textGroup.setAttribute('data-connection-group', newConnectionId);
    textGroup.setAttribute('data-connection-id', newConnectionId);
    
    // Actualizar todos los elementos hijos con data-connection
    const elementsWithConnection = textGroup.querySelectorAll('[data-connection]');
    elementsWithConnection.forEach(el => {
        el.setAttribute('data-connection', newConnectionId);
    });
    
    const elementoOrigen = encontrarElementoPorId(fromId);
    if (elementoOrigen) {
        // Obtener escala actual del trazado
        const tracingScale = window.currentScale || 50;
        
        const distanceMillimeters = calcularDistancia(elementoOrigen, nuevoDestino);
        const distanceMeters = convertMillimetersToRealMeters(distanceMillimeters, tracingScale);
        
        // ✅ Actualizar la etiqueta de distancia visual
        const distanceText = textGroup.querySelector('text[data-text-type="distance"]');
        if (distanceText) {
            distanceText.textContent = `L=${distanceMeters.toFixed(2)}m`;
            console.log(`✅ Etiqueta reconectada actualizada: ${distanceMeters.toFixed(2)}m`);
        }
        
        // ✅ Actualizar leader lines
        const oldLeaderLine = document.querySelector(`line[data-leader="${oldConnectionId}"]`);
        const oldLeaderArrow = document.querySelector(`polygon[data-leader="${oldConnectionId}"]`);
        
        if (oldLeaderLine) {
            oldLeaderLine.setAttribute('data-leader', newConnectionId);
        }
        if (oldLeaderArrow) {
            oldLeaderArrow.setAttribute('data-leader', newConnectionId);
        }
        
        // Recalcular posición del leader
        if (typeof updateElasticLeaderLine === 'function') {
            const bgRect = textGroup.querySelector('rect[data-bg-rect]');
            if (bgRect) {
                const textX = parseFloat(bgRect.getAttribute('x')) + 40;
                const textY = parseFloat(bgRect.getAttribute('y')) + 16;
                updateElasticLeaderLine(newConnectionId, textX, textY);
            }
        }
        
        // ✅ Actualizar cálculos
        if (typeof window.updateCalculations === 'function') {
            window.updateCalculations();
        }
    }
}

// ============================================================
// VALIDAR RECONEXIÓN
// ============================================================
function validarReconexion(origen, destino) {
    if (!origen || !destino) {
        console.log('❌ Validación: origen o destino nulo');
        return false;
    }
    
    if (origen.id === destino.id) {
        console.log('❌ Validación: no puede conectar consigo mismo');
        return false;
    }
    
    if (destino.isVirtual) {
        console.log('✅ Validación: conexión a intersección permitida');
        return true;
    }
    
    console.log('✅ Validación: reconexión válida');
    return true;
}

// ============================================================
// ENCONTRAR ELEMENTO POR ID
// ============================================================
function encontrarElementoPorId(elementId) {
    // ✅ CORREGIDO: Acceso directo a window.elements
    return window.elements.find(el => el.id === elementId);
}

// ============================================================
// FUNCIONES AUXILIARES (deben existir en utils.js o similar)
// ============================================================
function calcularDistancia(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function convertMillimetersToRealMeters(millimeters, scale) {
    return (millimeters * scale) / 1000;
}

console.log('✅ Point Editor Actions cargado');