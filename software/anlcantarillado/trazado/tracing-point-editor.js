// trazado/tracing-point-editor.js
// ============================================================
// EDITOR DE PUNTOS DE TRAZADO
// Permite editar manualmente el punto final de las conexiones
// ============================================================

// Estado del editor de puntos
let editorPuntos = {
    activo: false,
    modoEdicion: false,
    puntoArrastrado: null,
    lineaEditada: null,
    elementoOrigen: null,
    posicionInicial: { x: 0, y: 0 }
};

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
// TOGGLE MODO EDICIÓN (FUNCIÓN PRINCIPAL)
// ============================================================
function toggleModoEdicionTrazado() {
    const tracingSvg = document.getElementById('tracingSvg');
    const puntos = tracingSvg.querySelectorAll('.edit-point');
    const boton = document.getElementById('btnEditarPuntos');
    
    if (puntos.length > 0) {
        // DESACTIVAR modo edición
        removerPuntosEditables();
        editorPuntos.modoEdicion = false;
        
        if (boton) {
            boton.style.background = '#f59e0b';
            boton.innerHTML = '✏️ Editar Puntos Trazado';
        }
        
        showStatus('❌ Modo edición desactivado');
        console.log('❌ Modo edición de puntos DESACTIVADO');
    } else {
        // ACTIVAR modo edición
        agregarPuntosEditablesAlTrazado();
        editorPuntos.modoEdicion = true;
        
        if (boton) {
            boton.style.background = '#22c55e';
            boton.innerHTML = '✅ Edición Activa (Click para desactivar)';
        }
        
        showStatus('✅ Modo edición activado - Arrastra los círculos rojos');
        console.log('✅ Modo edición de puntos ACTIVADO');
    }
}

// ============================================================
// AGREGAR PUNTOS EDITABLES A TODAS LAS LÍNEAS DEL TRAZADO
// ============================================================
function agregarPuntosEditablesAlTrazado() {
    console.log('🎯 Agregando puntos editables al trazado...');
    
    const tracingSvg = document.getElementById('tracingSvg');
    const lineas = tracingSvg.querySelectorAll('.pipe-line');
    
    if (lineas.length === 0) {
        console.log('⚠️ No hay líneas de trazado para editar');
        showStatus('⚠️ Primero genera el trazado automático');
        return;
    }
    
    // Remover puntos editables anteriores
    removerPuntosEditables();
    
    let contador = 0;
    lineas.forEach(linea => {
        agregarPuntoEditableALinea(linea);
        contador++;
    });
    
    console.log(`✅ ${contador} puntos editables agregados`);
}

// ============================================================
// AGREGAR PUNTO EDITABLE A UNA LÍNEA ESPECÍFICA
// ============================================================
function agregarPuntoEditableALinea(linea) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const x2 = parseFloat(linea.getAttribute('x2'));
    const y2 = parseFloat(linea.getAttribute('y2'));
    const fromId = linea.getAttribute('data-from');
    const toId = linea.getAttribute('data-to');
    
    // Crear círculo editable (SOLO en el punto final)
    const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circulo.setAttribute('cx', x2);
    circulo.setAttribute('cy', y2);
    circulo.setAttribute('r', '10');
    circulo.setAttribute('fill', '#ef4444');
    circulo.setAttribute('fill-opacity', '0.6');
    circulo.setAttribute('stroke', '#ffffff');
    circulo.setAttribute('stroke-width', '3');
    circulo.setAttribute('class', 'edit-point');
    circulo.setAttribute('data-line-from', fromId);
    circulo.setAttribute('data-line-to', toId);
    
    // Configuración crítica
    circulo.style.cursor = 'move';
    circulo.style.pointerEvents = 'all';
    
    // Configurar eventos de drag
    configurarDragPuntoEditable(circulo, linea);
    
    // Agregar al SVG
    tracingSvg.appendChild(circulo);
}

// ============================================================
// CONFIGURAR DRAG PARA PUNTO EDITABLE
// ============================================================
function configurarDragPuntoEditable(circulo, linea) {
    let isDragging = false;
    
    function handleMouseDown(e) {
        if (isNavigationMode) return;
        
        console.log('🔴 CLICK en círculo editable');
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        isDragging = true;
        editorPuntos.activo = true;
        editorPuntos.puntoArrastrado = circulo;
        editorPuntos.lineaEditada = linea;
        
        const fromId = linea.getAttribute('data-from');
        editorPuntos.elementoOrigen = encontrarElementoPorId(parseInt(fromId));
        
        editorPuntos.posicionInicial = {
            x: parseFloat(circulo.getAttribute('cx')),
            y: parseFloat(circulo.getAttribute('cy'))
        };
        
        // Visual feedback
        circulo.setAttribute('fill-opacity', '1');
        circulo.setAttribute('r', '15');
        circulo.setAttribute('fill', '#22c55e');
        linea.setAttribute('stroke-dasharray', '5,5');
        linea.setAttribute('stroke-width', '6');
        linea.setAttribute('stroke', '#22c55e');
        
        document.body.style.userSelect = 'none';
        
        showStatus('🔴 ARRASTRANDO - Suelta o presiona ENTER para confirmar');
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const coords = convertirCoordenadas(e.clientX, e.clientY);
        
        // Actualizar posición del círculo
        circulo.setAttribute('cx', coords.x);
        circulo.setAttribute('cy', coords.y);
        
        // Actualizar punto final de la línea
        linea.setAttribute('x2', coords.x);
        linea.setAttribute('y2', coords.y);
        
        // Actualizar flecha y etiqueta
        if (typeof updateArrowForLine === 'function') {
            updateArrowForLine(linea);
        }
        if (typeof updateLabelForLine === 'function') {
            updateLabelForLine(linea);
        }
        
        // Detectar elemento bajo el cursor
        const elementoBajo = detectarElementoBajoCursor(coords.x, coords.y);
        if (elementoBajo) {
            circulo.setAttribute('fill', '#22c55e');
            circulo.setAttribute('stroke', '#10b981');
            
            if (elementoBajo.isVirtual) {
                showStatus(`🎯 ENTER para confirmar conexión en ángulo`);
            } else {
                showStatus(`🎯 ENTER para confirmar → ${elementoBajo.type || 'Cámara'}`);
            }
        } else {
            circulo.setAttribute('fill', '#f59e0b');
            showStatus('⚠️ Presiona ENTER para confirmar posición');
        }
    }
    
    function handleKeyPress(e) {
        if (!isDragging) return;
        
        // DETECTAR TECLA ENTER
        if (e.key === 'Enter' || e.keyCode === 13) {
            console.log('✅ ENTER presionado - Confirmando nueva posición');
            
            e.preventDefault();
            e.stopPropagation();
            
            // Obtener coordenadas actuales
            const cx = parseFloat(circulo.getAttribute('cx'));
            const cy = parseFloat(circulo.getAttribute('cy'));
            
            // Verificar si hay un elemento bajo el cursor
            const nuevoDestino = detectarElementoBajoCursor(cx, cy);
            
            if (nuevoDestino && validarReconexion(editorPuntos.elementoOrigen, nuevoDestino)) {
                // RECONEXIÓN A ELEMENTO O LÍNEA
                reconectarLineaANuevoDestino(linea, circulo, nuevoDestino);
                
                if (nuevoDestino.isVirtual) {
                    showStatus(`✅ Confirmado: Conexión en ángulo creada`);
                } else {
                    showStatus(`✅ Confirmado: Reconectado a ${nuevoDestino.type}`);
                }
            } else {
                // SOLO ACTUALIZAR LONGITUD (sin reconectar)
                actualizarSoloLongitud(linea, cx, cy);
                showStatus('✅ Confirmado: Longitud actualizada');
            }
            
            // ELIMINAR el círculo editable
            circulo.remove();
            
            // Restaurar visual de la línea
            linea.removeAttribute('stroke-dasharray');
            linea.setAttribute('stroke-width', '4');
            linea.setAttribute('stroke', '#ef4444');
            
            // Finalizar drag
            isDragging = false;
            editorPuntos.activo = false;
            editorPuntos.puntoArrastrado = null;
            editorPuntos.lineaEditada = null;
            editorPuntos.elementoOrigen = null;
            
            document.body.style.userSelect = '';
            
            console.log('✅ Nueva posición confirmada y círculo eliminado');
        }
        
        // DETECTAR TECLA ESC (cancelar)
        if (e.key === 'Escape' || e.keyCode === 27) {
            console.log('❌ ESC presionado - Cancelando edición');
            
            e.preventDefault();
            e.stopPropagation();
            
            // Restaurar posición original
            circulo.setAttribute('cx', editorPuntos.posicionInicial.x);
            circulo.setAttribute('cy', editorPuntos.posicionInicial.y);
            linea.setAttribute('x2', editorPuntos.posicionInicial.x);
            linea.setAttribute('y2', editorPuntos.posicionInicial.y);
            
            if (typeof updateArrowForLine === 'function') {
                updateArrowForLine(linea);
            }
            if (typeof updateLabelForLine === 'function') {
                updateLabelForLine(linea);
            }
            
            // Restaurar visual
            circulo.setAttribute('fill', '#ef4444');
            circulo.setAttribute('fill-opacity', '0.6');
            circulo.setAttribute('r', '10');
            circulo.setAttribute('stroke', '#ffffff');
            linea.removeAttribute('stroke-dasharray');
            linea.setAttribute('stroke-width', '4');
            linea.setAttribute('stroke', '#ef4444');
            
            // Finalizar drag
            isDragging = false;
            editorPuntos.activo = false;
            editorPuntos.puntoArrastrado = null;
            editorPuntos.lineaEditada = null;
            editorPuntos.elementoOrigen = null;
            
            document.body.style.userSelect = '';
            
            showStatus('❌ Edición cancelada - Posición restaurada');
        }
    }
    
    function handleMouseUp(e) {
        if (!isDragging) return;
        
        console.log('🔴 SOLTANDO círculo - Esperando ENTER para confirmar');
        
        // NO hacer nada al soltar - esperar ENTER
        // El usuario debe presionar ENTER explícitamente
        
        showStatus('⏳ Presiona ENTER para confirmar o ESC para cancelar');
    }
    
    // Eventos principales
    circulo.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyPress);
    
    // Efecto hover
    circulo.addEventListener('mouseenter', () => {
        if (!editorPuntos.activo) {
            circulo.setAttribute('fill-opacity', '0.9');
            circulo.setAttribute('r', '12');
            showStatus('🔴 Click y arrastra para mover');
        }
    });
    
    circulo.addEventListener('mouseleave', () => {
        if (!editorPuntos.activo) {
            circulo.setAttribute('fill-opacity', '0.6');
            circulo.setAttribute('r', '10');
        }
    });
}

// ============================================================
// DETECTAR ELEMENTO O LÍNEA BAJO EL CURSOR
// ============================================================
function detectarElementoBajoCursor(x, y) {
    const currentPlan = plans[currentPlanIndex];
    const RADIO_DETECCION = 25;
    
    console.log(`🔍 Detectando bajo cursor en (${x.toFixed(1)}, ${y.toFixed(1)})`);
    
    // PRIORIDAD 1: Detectar elementos (cámaras, artefactos)
    for (const elemento of currentPlan.tracingElements) {
        const distancia = Math.sqrt(
            Math.pow(elemento.x - x, 2) + Math.pow(elemento.y - y, 2)
        );
        
        if (distancia <= RADIO_DETECCION) {
            console.log(`✅ Elemento detectado: ${elemento.type} (ID: ${elemento.id})`);
            return elemento;
        }
    }
    
    // PRIORIDAD 2: Detectar líneas existentes (para conectar en 90°, perpendicular, ángulo)
    const tracingSvg = document.getElementById('tracingSvg');
    const lineas = tracingSvg.querySelectorAll('.pipe-line');
    
    for (const linea of lineas) {
        const puntoEnLinea = detectarPuntoEnLinea(x, y, linea);
        
        if (puntoEnLinea) {
            console.log(`✅ LÍNEA detectada - Conectando en ángulo`);
            
            // Crear un elemento virtual en el punto de intersección
            return {
                id: `intersection_${Date.now()}`,
                x: puntoEnLinea.x,
                y: puntoEnLinea.y,
                type: 'intersection',
                isVirtual: true,
                parentLine: linea
            };
        }
    }
    
    console.log('❌ No se detectó nada bajo el cursor');
    return null;
}

// ============================================================
// DETECTAR SI UN PUNTO ESTÁ CERCA DE UNA LÍNEA
// ============================================================
function detectarPuntoEnLinea(x, y, linea) {
    const x1 = parseFloat(linea.getAttribute('x1'));
    const y1 = parseFloat(linea.getAttribute('y1'));
    const x2 = parseFloat(linea.getAttribute('x2'));
    const y2 = parseFloat(linea.getAttribute('y2'));
    
    const TOLERANCIA = 15;
    
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    
    if (len_sq !== 0) {
        param = dot / len_sq;
    }
    
    let xx, yy;
    
    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }
    
    const dx = x - xx;
    const dy = y - yy;
    const distancia = Math.sqrt(dx * dx + dy * dy);
    
    if (distancia <= TOLERANCIA) {
        console.log(`📏 Punto en línea detectado: (${xx.toFixed(1)}, ${yy.toFixed(1)}) - distancia: ${distancia.toFixed(1)}px`);
        return { x: xx, y: yy };
    }
    
    return null;
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

// ============================================================
// REMOVER PUNTOS EDITABLES
// ============================================================
function removerPuntosEditables() {
    const tracingSvg = document.getElementById('tracingSvg');
    const puntos = tracingSvg.querySelectorAll('.edit-point');
    puntos.forEach(punto => punto.remove());
}

console.log('✅ Trazado - Point Editor cargado');