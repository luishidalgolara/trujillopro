// ventilacion-auto/ridaa-connections.js

const VENTILACION_CONFIG = {
    DISTANCIA_MINIMA_METROS: 3.0,
    LONGITUD_VENTILACION_METROS: 1.0,
    DIAMETRO: 75,
    COLOR: '#3b82f6',
    STROKE_WIDTH: '3'
};

const ventilacionesCreadas = new Map();

function conectarColectoresPrincipalesConVentilacion(colectoresPrincipales, camarasDomiciliarias, colectorPublico, currentPlan) {
    console.log(`🚽 Conectando ${colectoresPrincipales.length} colectores principales con validación de ventilación...`);
    
    if (colectoresPrincipales.length === 0) {
        console.log('└─ No hay colectores principales para conectar');
        return;
    }
    
    colectoresPrincipales.forEach((colector, index) => {
        let destino = null;
        
        if (camarasDomiciliarias.length > 0) {
            destino = encontrarCamaraMasCercana(colector, camarasDomiciliarias);
            console.log(`├─ WC ${index + 1} → Cámara MÁS CERCANA ${destino.numeroCamera || destino.id}`);
            
            verificarYCrearVentilacion(colector, destino, currentPlan);
        } else {
            destino = colectorPublico;
            console.log(`├─ WC ${index + 1} → Colector Público (directo - sin cámaras)`);
        }
        
        if (destino) {
            crearConexionJerarquica(colector, destino, 'wc-a-cercana', currentPlan);
        }
    });
    
    console.log('└─ WC conectados con validación de ventilación completada');
}

function verificarYCrearVentilacion(wc, camara, currentPlan) {
    const distanciaPixels = calcularDistancia(wc, camara);
    const distanciaMetros = convertMillimetersToRealMeters(distanciaPixels, currentPlan.tracingScale);
    
    console.log(`  🔍 Verificando distancia WC → Cámara: ${distanciaMetros.toFixed(2)}m`);
    
    if (distanciaMetros > VENTILACION_CONFIG.DISTANCIA_MINIMA_METROS) {
        console.log(`  ⚠️ Distancia > ${VENTILACION_CONFIG.DISTANCIA_MINIMA_METROS}m → Creando ventilación automática`);
        crearSistemaVentilacion(wc, camara, currentPlan);
    } else {
        console.log(`  ✅ Distancia OK (≤ ${VENTILACION_CONFIG.DISTANCIA_MINIMA_METROS}m) → No requiere ventilación`);
    }
}

function crearSistemaVentilacion(wc, camara, currentPlan) {
    const vectorDireccion = {
        x: wc.x - camara.x,
        y: wc.y - camara.y
    };
    
    const magnitud = Math.sqrt(vectorDireccion.x ** 2 + vectorDireccion.y ** 2);
    const vectorNormalizado = {
        x: vectorDireccion.x / magnitud,
        y: vectorDireccion.y / magnitud
    };
    
    const longitudPixels = (VENTILACION_CONFIG.LONGITUD_VENTILACION_METROS * 1000) / currentPlan.tracingScale;
    
    const ventilacionId = `ventilacion-${wc.id}-${Date.now()}`;
    
    // ⭐ CREAR PUNTO FINAL COMO ELEMENTO COMPLETO
    const puntoFinal = {
        x: wc.x + (vectorNormalizado.x * longitudPixels),
        y: wc.y + (vectorNormalizado.y * longitudPixels),
        id: `vent-point-${wc.id}`,
        type: 'ventilation-point',
        symbol: '',
        categoria: 'ventilacion',
        isVentilationPoint: true,
        ventilacionId: ventilacionId
    };
    
    // ⭐ AGREGAR PUNTO FINAL A TRACING ELEMENTS (invisible pero necesario para isométrico)
    currentPlan.tracingElements.push(puntoFinal);
    
    // CREAR LÍNEA Y CONTENEDOR VISUAL
    const lineaVentilacion = crearLineaVentilacion(wc, puntoFinal, ventilacionId);
    const contenedorVentilacion = crearContenedorVentilacion(wc, puntoFinal, ventilacionId);
    
    // ⭐ AGREGAR AL SISTEMA DE TRAZADO EXISTENTE
    const distanceMeters = VENTILACION_CONFIG.LONGITUD_VENTILACION_METROS;
    currentPlan.tracingConnections.push({
        from: wc,
        to: puntoFinal,
        distance: distanceMeters,
        diameter: VENTILACION_CONFIG.DIAMETRO,
        isVentilation: true,
        ventilacionId: ventilacionId
    });
    
    ventilacionesCreadas.set(ventilacionId, {
        linea: lineaVentilacion,
        contenedor: contenedorVentilacion,
        wcId: wc.id,
        inicio: { x: wc.x, y: wc.y },
        fin: puntoFinal,
        puntoFinalElement: puntoFinal
    });
    
    configurarBorradoVentilacion(lineaVentilacion, contenedorVentilacion, ventilacionId, currentPlan);
    
    console.log(`  ✅ Sistema de ventilación creado e integrado al trazado: ${VENTILACION_CONFIG.LONGITUD_VENTILACION_METROS}m, Ø${VENTILACION_CONFIG.DIAMETRO}mm`);
}

function crearLineaVentilacion(inicio, fin, ventilacionId) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('id', `line-${ventilacionId}`);
    line.setAttribute('x1', inicio.x);
    line.setAttribute('y1', inicio.y);
    line.setAttribute('x2', fin.x);
    line.setAttribute('y2', fin.y);
    line.setAttribute('stroke', VENTILACION_CONFIG.COLOR);
    line.setAttribute('stroke-width', VENTILACION_CONFIG.STROKE_WIDTH);
    line.setAttribute('stroke-dasharray', '8,4');
    line.setAttribute('class', 'ventilacion-line selectable-element');
    line.setAttribute('data-ventilacion-id', ventilacionId);
    line.style.cursor = 'pointer';
    
    tracingSvg.appendChild(line);
    return line;
}

function crearContenedorVentilacion(inicio, fin, ventilacionId) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const midX = (inicio.x + fin.x) / 2;
    const midY = (inicio.y + fin.y) / 2;
    
    const labelX = midX + 35;
    const labelY = midY - 25;
    
    const contenedorGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    contenedorGroup.setAttribute('id', `contenedor-${ventilacionId}`);
    contenedorGroup.setAttribute('class', 'ventilacion-contenedor selectable-element');
    contenedorGroup.setAttribute('data-ventilacion-id', ventilacionId);
    
    const guideLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    guideLine.setAttribute('x1', midX);
    guideLine.setAttribute('y1', midY);
    guideLine.setAttribute('x2', labelX);
    guideLine.setAttribute('y2', labelY);
    guideLine.setAttribute('stroke', '#666666');
    guideLine.setAttribute('stroke-width', '1');
    guideLine.setAttribute('stroke-dasharray', '2,2');
    guideLine.setAttribute('class', 'ventilacion-guide');
    
    const movableGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    movableGroup.setAttribute('class', 'ventilacion-movable');
    movableGroup.setAttribute('transform', `translate(${labelX}, ${labelY})`);
    movableGroup.style.cursor = 'move';
    
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', -55);
    bg.setAttribute('y', -12);
    bg.setAttribute('width', '110');
    bg.setAttribute('height', '24');
    bg.setAttribute('fill', '#ffffff');
    bg.setAttribute('stroke', VENTILACION_CONFIG.COLOR);
    bg.setAttribute('stroke-width', '1.5');
    bg.setAttribute('rx', '3');
    
    const texto1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    texto1.setAttribute('x', 0);
    texto1.setAttribute('y', -2);
    texto1.setAttribute('text-anchor', 'middle');
    texto1.setAttribute('font-size', '7');
    texto1.setAttribute('font-weight', 'bold');
    texto1.setAttribute('fill', '#000000');
    texto1.setAttribute('class', 'ventilacion-text editable');
    texto1.textContent = 'CAÑERÍA VENTILACIÓN';
    texto1.style.cursor = 'text';
    
    const texto2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    texto2.setAttribute('x', 0);
    texto2.setAttribute('y', 8);
    texto2.setAttribute('text-anchor', 'middle');
    texto2.setAttribute('font-size', '7');
    texto2.setAttribute('font-weight', 'normal');
    texto2.setAttribute('fill', '#000000');
    texto2.setAttribute('class', 'ventilacion-text editable');
    texto2.textContent = `PVC D=${VENTILACION_CONFIG.DIAMETRO}mm`;
    texto2.style.cursor = 'text';
    
    movableGroup.appendChild(bg);
    movableGroup.appendChild(texto1);
    movableGroup.appendChild(texto2);
    
    contenedorGroup.appendChild(guideLine);
    contenedorGroup.appendChild(movableGroup);
    
    setupContenedorDrag(movableGroup, guideLine, midX, midY);
    setupTextoEditable(texto1, texto2, bg);
    
    tracingSvg.appendChild(contenedorGroup);
    return contenedorGroup;
}

function setupContenedorDrag(movableGroup, guideLine, fixedX, fixedY) {
    let isDragging = false;
    let startMouse = { x: 0, y: 0 };
    let startTransform = { x: 0, y: 0 };

    function getCurrentTransform() {
        const transform = movableGroup.getAttribute('transform');
        const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
        if (match) {
            return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
        }
        return { x: 0, y: 0 };
    }

    function getRelativeCoords(e) {
        const tracingSvg = document.getElementById('tracingSvg');
        const pt = tracingSvg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgMatrix = tracingSvg.getScreenCTM().inverse();
        return pt.matrixTransform(svgMatrix);
    }

    movableGroup.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('editable')) return;
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        const coords = getRelativeCoords(e);
        startMouse = coords;
        startTransform = getCurrentTransform();
        movableGroup.style.opacity = '0.7';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        const coords = getRelativeCoords(e);
        const deltaX = coords.x - startMouse.x;
        const deltaY = coords.y - startMouse.y;
        const newX = startTransform.x + deltaX;
        const newY = startTransform.y + deltaY;
        movableGroup.setAttribute('transform', `translate(${newX}, ${newY})`);
        guideLine.setAttribute('x2', newX);
        guideLine.setAttribute('y2', newY);
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            movableGroup.style.opacity = '1';
        }
    });
}

function setupTextoEditable(texto1, texto2, bg) {
    texto1.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        const nuevoTexto = prompt('Editar línea superior:', texto1.textContent);
        if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
            texto1.textContent = nuevoTexto;
            ajustarAnchoContenedor(bg, texto1, texto2);
        }
    });
    
    texto2.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        const nuevoTexto = prompt('Editar línea inferior:', texto2.textContent);
        if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
            texto2.textContent = nuevoTexto;
            ajustarAnchoContenedor(bg, texto1, texto2);
        }
    });
}

function ajustarAnchoContenedor(bg, texto1, texto2) {
    const maxLength = Math.max(texto1.textContent.length, texto2.textContent.length);
    const nuevoAncho = Math.max(110, maxLength * 5 + 10);
    bg.setAttribute('x', -nuevoAncho / 2);
    bg.setAttribute('width', nuevoAncho);
}

function eliminarVentilacionCompleta(ventilacionId) {
    const ventData = ventilacionesCreadas.get(ventilacionId);
    if (!ventData) return;
    
    const linea = document.getElementById(`line-${ventilacionId}`);
    const contenedor = document.getElementById(`contenedor-${ventilacionId}`);
    
    if (linea) linea.remove();
    if (contenedor) contenedor.remove();
    
    // ⭐ ELIMINAR DEL SISTEMA DE TRAZADO
    const currentPlan = plans[currentPlanIndex];
    
    // Eliminar de tracingConnections
    const connIndex = currentPlan.tracingConnections.findIndex(conn => conn.ventilacionId === ventilacionId);
    if (connIndex !== -1) {
        currentPlan.tracingConnections.splice(connIndex, 1);
        console.log(`  🗑️ Ventilación eliminada de tracingConnections`);
    }
    
    // Eliminar punto final de tracingElements
    if (ventData.puntoFinalElement) {
        const elemIndex = currentPlan.tracingElements.findIndex(el => el.id === ventData.puntoFinalElement.id);
        if (elemIndex !== -1) {
            currentPlan.tracingElements.splice(elemIndex, 1);
            console.log(`  🗑️ Punto final eliminado de tracingElements`);
        }
    }
    
    ventilacionesCreadas.delete(ventilacionId);
    
    console.log(`  🗑️ Ventilación eliminada completamente: ${ventilacionId}`);
    if (typeof showStatus === 'function') {
        showStatus('🗑️ Ventilación eliminada');
    }
}

function configurarBorradoVentilacion(lineaVent, contenedorVent, ventilacionId, currentPlan) {
    // FUNCIÓN DE ELIMINACIÓN DIRECTA
    const confirmarYEliminar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        eliminarVentilacionCompleta(ventilacionId);
    };
    
    // CLIC DERECHO EN LÍNEA
    lineaVent.addEventListener('contextmenu', confirmarYEliminar);
    
    // DOBLE CLIC EN LÍNEA (eliminación rápida)
    lineaVent.addEventListener('dblclick', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('¿Eliminar ventilación completa?')) {
            eliminarVentilacionCompleta(ventilacionId);
        }
    });
    
    // CLIC DERECHO EN TODO EL CONTENEDOR (incluyendo grupo movible)
    contenedorVent.addEventListener('contextmenu', confirmarYEliminar, true);
    
    // CLIC DERECHO EN ELEMENTOS HIJOS DEL CONTENEDOR
    const movableGroup = contenedorVent.querySelector('.ventilacion-movable');
    const bg = contenedorVent.querySelector('rect');
    const guideLine = contenedorVent.querySelector('.ventilacion-guide');
    
    if (movableGroup) {
        movableGroup.addEventListener('contextmenu', confirmarYEliminar, true);
    }
    if (bg) {
        bg.addEventListener('contextmenu', confirmarYEliminar, true);
        
        // DOBLE CLIC EN FONDO DEL CONTENEDOR (evitando textos)
        bg.addEventListener('dblclick', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (confirm('¿Eliminar ventilación completa?')) {
                eliminarVentilacionCompleta(ventilacionId);
            }
        });
    }
    if (guideLine) {
        guideLine.addEventListener('contextmenu', confirmarYEliminar, true);
    }
    
    // SELECCIÓN CON CLIC IZQUIERDO EN LÍNEA
    lineaVent.addEventListener('click', function(e) {
        e.stopPropagation();
        marcarVentilacionSeleccionada(ventilacionId);
    });
    
    // SELECCIÓN CON CLIC IZQUIERDO EN CONTENEDOR
    if (bg) {
        bg.addEventListener('click', function(e) {
            e.stopPropagation();
            marcarVentilacionSeleccionada(ventilacionId);
        });
    }
    
    // SELECCIÓN EN GRUPO MOVIBLE (evitando textos editables)
    if (movableGroup) {
        movableGroup.addEventListener('click', function(e) {
            if (e.target.classList.contains('editable')) return;
            if (e.target.tagName === 'text') return;
            e.stopPropagation();
            marcarVentilacionSeleccionada(ventilacionId);
        });
    }
}

let ventilacionSeleccionada = null;

function marcarVentilacionSeleccionada(ventilacionId) {
    desmarcarVentilacion();
    
    const linea = document.getElementById(`line-${ventilacionId}`);
    const contenedor = document.getElementById(`contenedor-${ventilacionId}`);
    
    if (linea) {
        linea.setAttribute('stroke-width', '5');
        linea.setAttribute('stroke', '#60a5fa');
        linea.style.filter = 'drop-shadow(0 0 6px rgba(59, 130, 246, 1))';
    }
    
    if (contenedor) {
        const rect = contenedor.querySelector('rect');
        if (rect) {
            rect.setAttribute('stroke-width', '3');
            rect.setAttribute('stroke', '#60a5fa');
            rect.style.filter = 'drop-shadow(0 0 6px rgba(59, 130, 246, 1))';
        }
    }
    
    ventilacionSeleccionada = ventilacionId;
    
    if (typeof showStatus === 'function') {
        showStatus('🎯 Ventilación seleccionada - Presiona DELETE para eliminar');
    }
}

function desmarcarVentilacion() {
    if (!ventilacionSeleccionada) return;
    
    const linea = document.getElementById(`line-${ventilacionSeleccionada}`);
    const contenedor = document.getElementById(`contenedor-${ventilacionSeleccionada}`);
    
    if (linea) {
        linea.setAttribute('stroke-width', VENTILACION_CONFIG.STROKE_WIDTH);
        linea.setAttribute('stroke', VENTILACION_CONFIG.COLOR);
        linea.style.filter = '';
    }
    
    if (contenedor) {
        const rect = contenedor.querySelector('rect');
        if (rect) {
            rect.setAttribute('stroke-width', '1.5');
            rect.setAttribute('stroke', VENTILACION_CONFIG.COLOR);
            rect.style.filter = '';
        }
    }
    
    ventilacionSeleccionada = null;
}

// EVENTOS DE TECLADO GLOBALES (solo se agregan una vez)
if (!window.ventilacionKeyboardEventsAdded) {
    document.addEventListener('keydown', function(e) {
        // DELETE o BACKSPACE: Eliminar ventilación seleccionada
        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (ventilacionSeleccionada) {
                // Prevenir el comportamiento por defecto solo si hay ventilación seleccionada
                e.preventDefault();
                e.stopPropagation();
                
                if (confirm('¿Eliminar ventilación seleccionada?')) {
                    eliminarVentilacionCompleta(ventilacionSeleccionada);
                    ventilacionSeleccionada = null;
                }
            }
        }
        
        // ESC: Deseleccionar
        if (e.key === 'Escape') {
            if (ventilacionSeleccionada) {
                desmarcarVentilacion();
                if (typeof showStatus === 'function') {
                    showStatus('Ventilación deseleccionada');
                }
            }
        }
    });
    
    // CLIC EN CUALQUIER LUGAR: Deseleccionar si no es ventilación
    document.addEventListener('click', function(e) {
        const isVentilacionElement = e.target.closest('.ventilacion-line') || 
                                      e.target.closest('.ventilacion-contenedor') ||
                                      e.target.closest('.ventilacion-movable');
        
        if (!isVentilacionElement && ventilacionSeleccionada) {
            desmarcarVentilacion();
        }
    });
    
    window.ventilacionKeyboardEventsAdded = true;
    console.log('✅ Eventos de teclado de ventilación configurados');
}

console.log('✅ Sistema de ventilación automática con borrado completo cargado e integrado al trazado');