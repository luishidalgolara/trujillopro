// trazado-modules/point-editor-actions.js
// ============================================================
// ACCIONES DEL EDITOR DE PUNTOS
// Reconexión, Validación, Updates y Helpers
// ============================================================

// ============================================================
// FUNCIÓN DE CONVERSIÓN DE COORDENADAS
// ============================================================
function convertirCoordenadas(clientX, clientY) {
    const tracingSvg = document.getElementById('tracingSvg');
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
    const currentPlan = plans[currentPlanIndex];
    const fromId = parseInt(linea.getAttribute('data-from'));
    const oldToId = parseInt(linea.getAttribute('data-to'));
    
    console.log(`🔄 Reconectando: ${fromId} → ${oldToId} AHORA → ${nuevoDestino.id}`);
    
    // ⭐ CASO ESPECIAL: Si es una intersección virtual
    if (nuevoDestino.isVirtual) {
        console.log('📐 Reconexión a intersección - Creando conexión en ángulo');
        
        linea.setAttribute('x2', nuevoDestino.x);
        linea.setAttribute('y2', nuevoDestino.y);
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
    
    linea.setAttribute('x2', nuevoDestino.x);
    linea.setAttribute('y2', nuevoDestino.y);
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
    
    const conexion = currentPlan.tracingConnections.find(conn => 
        conn.from.id === fromId && conn.to.id === oldToId
    );
    
    if (conexion) {
        conexion.to = nuevoDestino;
        const distanceMillimeters = calcularDistancia(conexion.from, nuevoDestino);
        conexion.distance = convertMillimetersToRealMeters(distanceMillimeters, currentPlan.tracingScale);
        
        console.log(`✅ Conexión actualizada: ${conexion.distance.toFixed(2)}m`);
    }
}

// ============================================================
// ACTUALIZAR SOLO LA LONGITUD (NO DIÁMETRO NI PENDIENTE)
// ============================================================
function actualizarSoloLongitud(linea, newX, newY) {
    const currentPlan = plans[currentPlanIndex];
    const fromId = parseInt(linea.getAttribute('data-from'));
    const toId = linea.getAttribute('data-to');
    
    console.log('📏 Actualizando solo longitud...');
    
    const elementoOrigen = encontrarElementoPorId(fromId);
    if (!elementoOrigen) {
        console.error('❌ No se encontró elemento origen');
        return;
    }
    
    const distanceMillimeters = calcularDistancia(elementoOrigen, { x: newX, y: newY });
    const distanceMeters = convertMillimetersToRealMeters(distanceMillimeters, currentPlan.tracingScale);
    
    console.log(`📏 Nueva distancia: ${distanceMeters.toFixed(2)}m`);
    
    const connectionId = `${fromId}-${toId}`;
    const labelGroup = document.querySelector(`.pipe-label-group[data-connection="${connectionId}"]`);
    
    if (!labelGroup) {
        console.warn('⚠️ No se encontró etiqueta para actualizar');
        return;
    }
    
    const labelTexts = labelGroup.querySelectorAll('text');
    
    if (labelTexts.length >= 2) {
        const currentDiameter = labelTexts[0].textContent;
        const newLength = `L=${distanceMeters.toFixed(1)}m`;
        const currentSlope = labelTexts[2] ? labelTexts[2].textContent : '';
        
        console.log(`✅ Manteniendo diámetro: ${currentDiameter}`);
        console.log(`✅ Nueva longitud: ${newLength}`);
        console.log(`✅ Manteniendo pendiente: ${currentSlope}`);
        
        labelTexts[1].textContent = newLength;
    }
    
    if (typeof updateArrowForLine === 'function') {
        updateArrowForLine(linea);
    }
    if (typeof updateLabelForLine === 'function') {
        updateLabelForLine(linea);
    }
    
    if (!toId.toString().includes('intersection')) {
        const conexion = currentPlan.tracingConnections.find(conn => 
            conn.from.id === fromId && conn.to.id == toId
        );
        
        if (conexion) {
            conexion.distance = distanceMeters;
            console.log('✅ Datos de conexión actualizados');
        }
    }
}

// ============================================================
// ACTUALIZAR ETIQUETA DESPUÉS DE RECONEXIÓN
// ============================================================
function actualizarEtiquetaReconectada(fromId, oldToId, newToId, nuevoDestino) {
    const currentPlan = plans[currentPlanIndex];
    const oldConnectionId = `${fromId}-${oldToId}`;
    const newConnectionId = `${fromId}-${newToId}`;
    
    const labelGroup = document.querySelector(`.pipe-label-group[data-connection="${oldConnectionId}"]`);
    if (!labelGroup) return;
    
    labelGroup.setAttribute('data-connection', newConnectionId);
    
    const linea = document.querySelector(`[data-from="${fromId}"][data-to="${newToId}"]`);
    if (linea && typeof updateLabelForLine === 'function') {
        updateLabelForLine(linea);
        
        const elementoOrigen = encontrarElementoPorId(fromId);
        if (elementoOrigen) {
            const distanceMillimeters = calcularDistancia(elementoOrigen, nuevoDestino);
            const distanceMeters = convertMillimetersToRealMeters(distanceMillimeters, currentPlan.tracingScale);
            
            const labelTexts = labelGroup.querySelectorAll('text');
            if (labelTexts[1]) {
                labelTexts[1].textContent = `L=${distanceMeters.toFixed(1)}m`;
            }
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
    const currentPlan = plans[currentPlanIndex];
    return currentPlan.tracingElements.find(el => el.id === elementId);
}

console.log('✅ Point Editor Actions cargado');