// ========================================
// SISTEMA DE MODO EDICIÓN DE TRAZADO
// ========================================

let estadoEdicionTrazado = {
    activo: false,
    trazadoOriginal: null,
    lineasOriginales: [],
    herramientaActual: null,
    puntoInicio: null,
    lineaTemporal: null,
    lineaSeleccionada: null
};

// ========================================
// ENTRAR AL MODO EDICIÓN
// ========================================
function entrarModoEdicion() {
    const currentPlan = plans[currentPlanIndex];
    
    if (currentPlan.tracingConnections.length === 0) {
        showStatus('⚠️ Primero genera un trazado automático');
        return;
    }

    // Guardar estado original
    estadoEdicionTrazado.trazadoOriginal = JSON.parse(JSON.stringify(currentPlan.tracingConnections));
    estadoEdicionTrazado.activo = true;

    // Bloquear interfaz
    mostrarOverlayEdicion();
    mostrarPanelEdicion();
    hacerLineasEditables();
    
    showStatus('🔧 MODO EDICIÓN ACTIVO - Modifica el trazado');
}

// ========================================
// SALIR DEL MODO EDICIÓN
// ========================================
function salirModoEdicion(guardar = true) {
    const currentPlan = plans[currentPlanIndex];

    if (guardar) {
        // Validar conexiones
        if (!validarTrazadoCompleto()) {
            if (!confirm('⚠️ Hay conexiones incompletas. ¿Salir de todos modos?')) {
                return;
            }
        }
        
        // Recalcular totales
        recalcularMetrosTotales();
        showStatus('✅ Cambios guardados correctamente');
    } else {
        // Restaurar original
        currentPlan.tracingConnections = estadoEdicionTrazado.trazadoOriginal;
        redibujarTrazadoCompleto();
        showStatus('❌ Cambios cancelados');
    }

    // Limpiar estado
    estadoEdicionTrazado.activo = false;
    estadoEdicionTrazado.trazadoOriginal = null;
    estadoEdicionTrazado.herramientaActual = null;
    estadoEdicionTrazado.puntoInicio = null;
    estadoEdicionTrazado.lineaSeleccionada = null;

    ocultarOverlayEdicion();
    ocultarPanelEdicion();
    restaurarLineasNormales();
}

// ========================================
// UI - OVERLAY Y PANEL
// ========================================
function mostrarOverlayEdicion() {
    let overlay = document.getElementById('editModeOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'editModeOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: 998;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);
    }
    overlay.style.display = 'block';
}

function ocultarOverlayEdicion() {
    const overlay = document.getElementById('editModeOverlay');
    if (overlay) overlay.style.display = 'none';
}

function mostrarPanelEdicion() {
    let panel = document.getElementById('editModePanel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'editModePanel';
        panel.innerHTML = `
            <div class="edit-panel-header">
                🔧 EDITANDO TRAZADO
            </div>
            <div class="edit-panel-body">
                <button class="edit-tool-btn" onclick="seleccionarHerramientaEdicion('agregar')" id="btnAgregar">
                    ➕ AGREGAR TUBERÍA
                </button>
                <button class="edit-tool-btn" onclick="seleccionarHerramientaEdicion('eliminar')" id="btnEliminar">
                    ✂️ ELIMINAR TUBERÍA
                </button>
                <button class="edit-tool-btn" onclick="seleccionarHerramientaEdicion('mover')" id="btnMover">
                    ↔️ MOVER PUNTOS
                </button>
                <div class="edit-panel-info" id="editPanelInfo">
                    Metros totales: <span id="metrosTotalesEdit">0</span>m
                </div>
            </div>
            <div class="edit-panel-footer">
                <button class="edit-btn-save" onclick="salirModoEdicion(true)">
                    💾 SALIR Y GUARDAR
                </button>
                <button class="edit-btn-cancel" onclick="salirModoEdicion(false)">
                    ❌ CANCELAR
                </button>
            </div>
        `;
        
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 280px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 999;
            font-family: Arial, sans-serif;
        `;

        // Estilos inline para los elementos internos
        const style = document.createElement('style');
        style.textContent = `
            .edit-panel-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px;
                border-radius: 12px 12px 0 0;
                font-weight: bold;
                font-size: 14px;
                text-align: center;
            }
            .edit-panel-body {
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .edit-tool-btn {
                background: #f0f0f0;
                border: 2px solid #ddd;
                padding: 12px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 13px;
                transition: all 0.3s;
            }
            .edit-tool-btn:hover {
                background: #e0e0e0;
                transform: translateY(-2px);
            }
            .edit-tool-btn.active {
                background: #667eea;
                color: white;
                border-color: #667eea;
            }
            .edit-panel-info {
                margin-top: 10px;
                padding: 12px;
                background: #f8f9fa;
                border-radius: 6px;
                text-align: center;
                font-size: 13px;
            }
            .edit-panel-footer {
                padding: 15px;
                display: flex;
                gap: 10px;
                border-top: 1px solid #e0e0e0;
            }
            .edit-btn-save, .edit-btn-cancel {
                flex: 1;
                padding: 12px;
                border: none;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                font-size: 13px;
                transition: all 0.3s;
            }
            .edit-btn-save {
                background: #27ae60;
                color: white;
            }
            .edit-btn-save:hover {
                background: #229954;
            }
            .edit-btn-cancel {
                background: #e74c3c;
                color: white;
            }
            .edit-btn-cancel:hover {
                background: #c0392b;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(panel);
    }
    panel.style.display = 'block';
    actualizarMetrosPanel();
}

function ocultarPanelEdicion() {
    const panel = document.getElementById('editModePanel');
    if (panel) panel.style.display = 'none';
}

// ========================================
// SELECCIÓN DE HERRAMIENTAS
// ========================================
function seleccionarHerramientaEdicion(herramienta) {
    estadoEdicionTrazado.herramientaActual = herramienta;
    estadoEdicionTrazado.puntoInicio = null;
    estadoEdicionTrazado.lineaSeleccionada = null;

    // Actualizar UI
    document.querySelectorAll('.edit-tool-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn${herramienta.charAt(0).toUpperCase() + herramienta.slice(1)}`).classList.add('active');

    // Cambiar cursor
    const tracingSvg = document.getElementById('tracingSvg');
    if (herramienta === 'agregar') {
        tracingSvg.style.cursor = 'crosshair';
        showStatus('➕ Click en punto inicial, luego punto final');
    } else if (herramienta === 'eliminar') {
        tracingSvg.style.cursor = 'pointer';
        showStatus('✂️ Click en la tubería que deseas eliminar');
    } else if (herramienta === 'mover') {
        tracingSvg.style.cursor = 'move';
        showStatus('↔️ Arrastra los extremos de las tuberías');
    }
}

// ========================================
// HACER LÍNEAS EDITABLES
// ========================================
function hacerLineasEditables() {
    const tracingSvg = document.getElementById('tracingSvg');
    
    tracingSvg.addEventListener('click', manejarClickEdicion);
    tracingSvg.addEventListener('mousemove', manejarMouseMoveEdicion);
    
    // Resaltar líneas
    const lines = tracingSvg.querySelectorAll('.pipe-line');
    lines.forEach(line => {
        line.style.cursor = 'pointer';
        line.addEventListener('mouseenter', () => {
            if (estadoEdicionTrazado.herramientaActual === 'eliminar') {
                line.setAttribute('stroke', '#ff6b6b');
                line.setAttribute('stroke-width', '6');
            }
        });
        line.addEventListener('mouseleave', () => {
            if (line !== estadoEdicionTrazado.lineaSeleccionada) {
                line.setAttribute('stroke', '#ef4444');
                line.setAttribute('stroke-width', '4');
            }
        });
    });
}

function restaurarLineasNormales() {
    const tracingSvg = document.getElementById('tracingSvg');
    tracingSvg.removeEventListener('click', manejarClickEdicion);
    tracingSvg.removeEventListener('mousemove', manejarMouseMoveEdicion);
    tracingSvg.style.cursor = 'default';
    
    const lines = tracingSvg.querySelectorAll('.pipe-line');
    lines.forEach(line => {
        line.style.cursor = 'default';
        line.setAttribute('stroke', '#ef4444');
        line.setAttribute('stroke-width', '4');
    });
}

// ========================================
// MANEJO DE EVENTOS
// ========================================
function manejarClickEdicion(e) {
    if (!estadoEdicionTrazado.activo) return;

    const herramienta = estadoEdicionTrazado.herramientaActual;

    if (herramienta === 'agregar') {
        agregarTuberiaClick(e);
    } else if (herramienta === 'eliminar') {
        eliminarTuberiaClick(e);
    }
}

function manejarMouseMoveEdicion(e) {
    if (!estadoEdicionTrazado.activo) return;
    
    if (estadoEdicionTrazado.herramientaActual === 'agregar' && estadoEdicionTrazado.puntoInicio) {
        mostrarLineaTemporal(e);
    }
}

// ========================================
// AGREGAR TUBERÍA
// ========================================
function agregarTuberiaClick(e) {
    const tracingSvg = document.getElementById('tracingSvg');
    const rect = tracingSvg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 841;
    const y = ((e.clientY - rect.top) / rect.height) * 594;

    if (!estadoEdicionTrazado.puntoInicio) {
        // Primer click - guardar punto inicial
        estadoEdicionTrazado.puntoInicio = {x, y};
        showStatus('➕ Ahora click en el punto final');
    } else {
        // Segundo click - crear tubería
        crearNuevaTuberia(estadoEdicionTrazado.puntoInicio, {x, y});
        estadoEdicionTrazado.puntoInicio = null;
        
        if (estadoEdicionTrazado.lineaTemporal) {
            estadoEdicionTrazado.lineaTemporal.remove();
            estadoEdicionTrazado.lineaTemporal = null;
        }
        
        showStatus('✅ Tubería agregada - Click para otra o cambia herramienta');
    }
}

function mostrarLineaTemporal(e) {
    const tracingSvg = document.getElementById('tracingSvg');
    const rect = tracingSvg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 841;
    const y = ((e.clientY - rect.top) / rect.height) * 594;

    if (!estadoEdicionTrazado.lineaTemporal) {
        estadoEdicionTrazado.lineaTemporal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        estadoEdicionTrazado.lineaTemporal.setAttribute('stroke', '#3498db');
        estadoEdicionTrazado.lineaTemporal.setAttribute('stroke-width', '2');
        estadoEdicionTrazado.lineaTemporal.setAttribute('stroke-dasharray', '5,5');
        estadoEdicionTrazado.lineaTemporal.style.pointerEvents = 'none';
        tracingSvg.appendChild(estadoEdicionTrazado.lineaTemporal);
    }

    estadoEdicionTrazado.lineaTemporal.setAttribute('x1', estadoEdicionTrazado.puntoInicio.x);
    estadoEdicionTrazado.lineaTemporal.setAttribute('y1', estadoEdicionTrazado.puntoInicio.y);
    estadoEdicionTrazado.lineaTemporal.setAttribute('x2', x);
    estadoEdicionTrazado.lineaTemporal.setAttribute('y2', y);
}

function crearNuevaTuberia(desde, hacia) {
    const currentPlan = plans[currentPlanIndex];
    const tracingSvg = document.getElementById('tracingSvg');

    // Crear línea visual
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', desde.x);
    line.setAttribute('y1', desde.y);
    line.setAttribute('x2', hacia.x);
    line.setAttribute('y2', hacia.y);
    line.setAttribute('stroke', '#ef4444');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('class', 'pipe-line');
    line.setAttribute('data-edicion-manual', 'true');
    tracingSvg.appendChild(line);

    // Calcular distancia
    const distanceMillimeters = Math.sqrt(
        Math.pow(hacia.x - desde.x, 2) + Math.pow(hacia.y - desde.y, 2)
    );
    const distanceMeters = (distanceMillimeters * currentPlan.tracingScale) / 1000;

    // Agregar a conexiones
    currentPlan.tracingConnections.push({
        from: {x: desde.x, y: desde.y, id: 'manual-' + Date.now()},
        to: {x: hacia.x, y: hacia.y, id: 'manual-' + Date.now()},
        distance: distanceMeters,
        diameter: 110,
        manual: true
    });

    // Crear etiqueta
    createPipeLabel(
        {x: desde.x, y: desde.y},
        {x: hacia.x, y: hacia.y},
        110,
        distanceMeters
    );

    // Crear flecha
    createTracingArrow(
        {x: desde.x, y: desde.y},
        {x: hacia.x, y: hacia.y}
    );

    actualizarMetrosPanel();
    hacerLineasEditables();
}

// ========================================
// ELIMINAR TUBERÍA
// ========================================
function eliminarTuberiaClick(e) {
    if (e.target.classList.contains('pipe-line')) {
        const line = e.target;
        const fromId = line.getAttribute('data-from');
        const toId = line.getAttribute('data-to');

        // Eliminar de array
        const currentPlan = plans[currentPlanIndex];
        currentPlan.tracingConnections = currentPlan.tracingConnections.filter(conn => {
            return !(conn.from.id === fromId && conn.to.id === toId);
        });

        // Eliminar elementos visuales
        line.remove();
        
        // Eliminar flecha asociada
        const arrow = document.querySelector(`[data-connection="${fromId}-${toId}"]`);
        if (arrow) arrow.remove();

        // Eliminar etiqueta asociada
        const labels = document.querySelectorAll('.pipe-label-group');
        labels.forEach(label => {
            const text = label.querySelector('text');
            if (text && (text.textContent.includes(fromId) || text.textContent.includes(toId))) {
                label.remove();
            }
        });

        actualizarMetrosPanel();
        showStatus('✂️ Tubería eliminada');
    }
}

// ========================================
// VALIDACIÓN
// ========================================
function validarTrazadoCompleto() {
    const currentPlan = plans[currentPlanIndex];
    
    if (currentPlan.tracingConnections.length === 0) {
        return false;
    }

    // Aquí puedes agregar más validaciones si necesitas
    return true;
}

// ========================================
// RECÁLCULOS
// ========================================
function recalcularMetrosTotales() {
    const currentPlan = plans[currentPlanIndex];
    let total = 0;
    
    currentPlan.tracingConnections.forEach(conn => {
        total += conn.distance || 0;
    });

    return total;
}

function actualizarMetrosPanel() {
    const total = recalcularMetrosTotales();
    const metrosSpan = document.getElementById('metrosTotalesEdit');
    if (metrosSpan) {
        metrosSpan.textContent = total.toFixed(2);
    }
}

// ========================================
// REDIBUJAR TRAZADO
// ========================================
function redibujarTrazadoCompleto() {
    clearTracingConnections();
    
    const currentPlan = plans[currentPlanIndex];
    currentPlan.tracingConnections.forEach(conn => {
        createTracingConnectionVisual(conn.from, conn.to);
    });
}

console.log('✅ Modo Edición de Trazado cargado');