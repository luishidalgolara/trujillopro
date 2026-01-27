/**
 * ============================================
 * TRACING CONTEXT MENU - VERSIÓN CORREGIDA
 * Menú contextual para líneas de trazado
 * ============================================
 */

const TracingContextMenu = {
    menu: null,
    currentLine: null,
    isOpen: false,

    init() {
        this.createMenu();
        this.attachEvents();
        console.log('✅ Menú contextual de Trazado inicializado');
    },

    createMenu() {
    const existingMenu = document.getElementById('contextMenuTracing');
    if (existingMenu) {
        existingMenu.remove();
    }

    const menu = document.createElement('div');
    menu.id = 'contextMenuTracing';
    menu.className = 'context-menu-tracing';
    
    menu.style.cssText = `
        position: fixed !important;
        background: #ffffff !important;
        border: 2px solid #e74c3c !important;
        border-radius: 12px !important;
        box-shadow: 0 8px 32px rgba(231, 76, 60, 0.5) !important;
        padding: 8px !important;
        min-width: 280px !important;
        z-index: 2147483647 !important;
        display: none !important;
        pointer-events: all !important;
    `;
    
    menu.innerHTML = `
        <div class="context-menu-item" data-action="editPoints" style="display: flex; align-items: center; padding: 12px 16px; cursor: pointer; border-radius: 8px; gap: 12px; color: #1a1a1a; font-weight: 600;">
            <span class="menu-icon" style="font-size: 18px;">✏️</span>
            <span class="menu-text" style="font-size: 14px;">Editar puntos de conexión</span>
        </div>
        <div class="context-menu-item" data-action="invertDirection" style="display: flex; align-items: center; padding: 12px 16px; cursor: pointer; border-radius: 8px; gap: 12px; color: #1a1a1a; font-weight: 600;">
            <span class="menu-icon" style="font-size: 18px;">🔄</span>
            <span class="menu-text" style="font-size: 14px;">Invertir dirección de flujo</span>
        </div>
        <div class="context-menu-divider" style="height: 1px; background: #e0e0e0; margin: 6px 8px;"></div>
        <div class="context-menu-item" data-action="deleteLine" style="display: flex; align-items: center; padding: 12px 16px; cursor: pointer; border-radius: 8px; gap: 12px; color: #1a1a1a; font-weight: 600;">
            <span class="menu-icon" style="font-size: 18px;">🗑️</span>
            <span class="menu-text" style="font-size: 14px;">Eliminar conexión</span>
        </div>
    `;

    document.body.appendChild(menu);
    this.menu = menu;

    // ⭐ USAR ARROW FUNCTIONS PARA MANTENER EL CONTEXTO
    menu.querySelectorAll('.context-menu-item').forEach(item => {
        // Hover effect
        item.addEventListener('mouseenter', () => {
            item.style.background = '#e74c3c';
            item.style.color = '#ffffff';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
            item.style.color = '#1a1a1a';
        });
        
        // ⭐ Click handler CON ARROW FUNCTION
        item.addEventListener('click', (e) => {
            console.log('🖱️ CLICK DETECTADO EN ITEM');
            e.stopPropagation();
            e.preventDefault();
            
            const action = item.getAttribute('data-action');
            console.log(`⚡ Acción seleccionada: ${action}`);
            
            // ⭐ AHORA this SÍ APUNTA A TracingContextMenu
            this.executeAction(action);
            this.hide();
        });
    });
    
    console.log('✅ Menú creado correctamente con listeners');
},

    attachEvents() {
    document.addEventListener('contextmenu', (e) => {
        const target = e.target;
        
        if (this.isTracingLine(target)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('✅ LÍNEA DETECTADA');
            
            this.currentLine = target;
            this.isOpen = true;
            this.show(e, target);
            
            return false;
        }
    }, true);

    // ⭐ SOLO BLOQUEAR CLICKS FUERA DEL MENÚ
    document.addEventListener('click', (e) => {
        if (this.isOpen) {
            if (!this.menu.contains(e.target)) {
                console.log('🔒 Click fuera del menú - cerrando');
                this.hide();
                e.stopPropagation();
                return false;
            } else {
                console.log('✅ Click dentro del menú - permitiendo');
                // ⭐ NO BLOQUEAR - Dejar que el evento llegue a los items
            }
        }
    }, true);

    document.addEventListener('mousedown', (e) => {
        if (this.isOpen && e.button === 0) {
            if (!this.menu.contains(e.target)) {
                this.hide();
                e.stopPropagation();
                return false;
            }
        }
    }, true);

    document.addEventListener('mouseup', (e) => {
        if (this.isOpen && e.button === 0) {
            if (!this.menu.contains(e.target)) {
                e.stopPropagation();
                return false;
            }
        }
    }, true);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
            this.hide();
        }
    });
},

    isTracingLine(element) {
        if (!element) return false;
        
        if (element.classList && element.classList.contains('pipe-line')) {
            return true;
        }
        
        if (element.tagName === 'line') {
            const hasFrom = element.hasAttribute('data-from');
            const hasTo = element.hasAttribute('data-to');
            if (hasFrom && hasTo) {
                return true;
            }
        }
        
        return false;
    },

    show(event, line) {
        if (!this.menu || !line) {
            console.error('❌ Menú o línea no válidos');
            return;
        }

        console.log('📍 MOSTRANDO MENÚ');

        this.highlightLine(line);

        const x = event.clientX;
        const y = event.clientY;

        console.log(`📍 Coordenadas: x=${x}, y=${y}`);

        this.menu.style.left = `${x}px`;
        this.menu.style.top = `${y}px`;
        this.menu.style.display = 'block';
        this.menu.style.opacity = '1';
        this.menu.style.visibility = 'visible';
        this.menu.style.pointerEvents = 'all';
        
        this.menu.classList.add('active');
        this.isOpen = true;

        console.log('✅ Menú visible:', {
            display: this.menu.style.display,
            opacity: this.menu.style.opacity,
            left: this.menu.style.left,
            top: this.menu.style.top
        });

        setTimeout(() => {
            const rect = this.menu.getBoundingClientRect();
            console.log('📐 Dimensiones menú:', rect);
            
            let adjustedX = x;
            let adjustedY = y;
            
            if (rect.right > window.innerWidth) {
                adjustedX = x - rect.width;
            }
            
            if (rect.bottom > window.innerHeight) {
                adjustedY = y - rect.height;
            }
            
            if (adjustedX !== x || adjustedY !== y) {
                this.menu.style.left = `${adjustedX}px`;
                this.menu.style.top = `${adjustedY}px`;
                console.log(`🔧 Ajustado a: ${adjustedX}, ${adjustedY}`);
            }
        }, 10);
    },

    hide() {
        if (!this.menu) return;
        
        this.menu.classList.remove('active');
        this.menu.style.display = 'none';
        this.isOpen = false;
        
        if (this.currentLine) {
            this.unhighlightLine(this.currentLine);
        }
        
        this.currentLine = null;
        
        console.log('🔒 Menú cerrado');
    },

    executeAction(action) {
        if (!this.currentLine) {
            console.error('❌ No hay línea seleccionada');
            return;
        }

        console.log(`⚡ Ejecutando: ${action}`);

        switch (action) {
            case 'editPoints':
                this.activarEdicionPuntos();
                break;
            case 'invertDirection':
                this.invertirDireccion();
                break;
            case 'deleteLine':
                this.eliminarLinea();
                break;
        }
    },

    activarEdicionPuntos() {
        console.log('✏️ Activando edición de puntos para línea específica...');
        
        const puntosAnteriores = document.querySelectorAll('.edit-point');
        puntosAnteriores.forEach(punto => punto.remove());
        
        if (typeof agregarPuntoEditableALinea === 'function') {
            agregarPuntoEditableALinea(this.currentLine);
            console.log('✅ Punto editable agregado a la línea seleccionada');
        } else {
            console.error('❌ Función agregarPuntoEditableALinea no disponible');
            return;
        }
        
        this.highlightLine(this.currentLine, '#22c55e', 6);
        
        if (typeof showStatus === 'function') {
            showStatus('✅ Punto editable activado - Arrastra el círculo rojo y presiona ENTER');
        }
        
        setTimeout(() => {
            if (this.currentLine) {
                this.unhighlightLine(this.currentLine);
            }
        }, 2000);
    },

    invertirDireccion() {
        console.log('🔄 Invirtiendo dirección...');
        
        const line = this.currentLine;
        const fromId = line.getAttribute('data-from');
        const toId = line.getAttribute('data-to');
        
        console.log(`🔄 Intercambiando: ${fromId} ↔️ ${toId}`);
        
        line.setAttribute('data-from', toId);
        line.setAttribute('data-to', fromId);
        
        const x1 = line.getAttribute('x1');
        const y1 = line.getAttribute('y1');
        const x2 = line.getAttribute('x2');
        const y2 = line.getAttribute('y2');
        
        line.setAttribute('x1', x2);
        line.setAttribute('y1', y2);
        line.setAttribute('x2', x1);
        line.setAttribute('y2', y1);
        
        console.log('✅ Coordenadas intercambiadas');
        
        if (typeof updateArrowForLine === 'function') {
            updateArrowForLine(line);
            console.log('✅ Flecha actualizada');
        }
        
        if (typeof updateLabelForLine === 'function') {
            updateLabelForLine(line);
            console.log('✅ Etiqueta actualizada');
        }
        
        const editPoint = document.querySelector(`.edit-point[data-line-from="${fromId}"][data-line-to="${toId}"]`);
        if (editPoint) {
            editPoint.setAttribute('data-line-from', toId);
            editPoint.setAttribute('data-line-to', fromId);
            editPoint.setAttribute('cx', x1);
            editPoint.setAttribute('cy', y1);
            console.log('✅ Círculo editable actualizado');
        }
        
        if (typeof showStatus === 'function') {
            showStatus('🔄 Dirección invertida correctamente');
        }
        
        this.highlightLine(line, '#3498db', 8);
        setTimeout(() => {
            this.unhighlightLine(line);
        }, 1500);
    },

    eliminarLinea() {
        console.log('🗑️ Eliminando línea...');
        
        const confirmDelete = confirm('¿Está seguro de eliminar esta conexión?');
        
        if (!confirmDelete) return;
        
        const line = this.currentLine;
        const fromId = line.getAttribute('data-from');
        const toId = line.getAttribute('data-to');
        const connectionId = `${fromId}-${toId}`;
        
        console.log(`🗑️ Eliminando conexión: ${connectionId}`);
        
        line.remove();
        
        const arrow = document.querySelector(`.flow-arrow[data-connection="${connectionId}"]`);
        if (arrow) {
            arrow.remove();
            console.log('✅ Flecha eliminada');
        }
        
        const label = document.querySelector(`.pipe-label-group[data-connection="${connectionId}"]`);
        if (label) {
            label.remove();
            console.log('✅ Etiqueta eliminada');
        }
        
        const editPoint = document.querySelector(`.edit-point[data-line-from="${fromId}"][data-line-to="${toId}"]`);
        if (editPoint) {
            editPoint.remove();
            console.log('✅ Círculo editable eliminado');
        }
        
        if (typeof plans !== 'undefined' && typeof currentPlanIndex !== 'undefined') {
            const currentPlan = plans[currentPlanIndex];
            if (currentPlan && currentPlan.tracingConnections) {
                currentPlan.tracingConnections = currentPlan.tracingConnections.filter(
                    conn => !(conn.from.id == fromId && conn.to.id == toId)
                );
                console.log('✅ Datos actualizados');
            }
        }
        
        if (typeof showStatus === 'function') {
            showStatus('🗑️ Conexión eliminada');
        }
    },

    highlightLine(line, color = '#f59e0b', width = 6) {
        if (!line) return;
        
        line.setAttribute('data-original-stroke', line.getAttribute('stroke') || '#ef4444');
        line.setAttribute('data-original-width', line.getAttribute('stroke-width') || '4');
        
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', width);
        line.setAttribute('stroke-dasharray', '8,4');
    },

    unhighlightLine(line) {
        if (!line) return;
        
        const originalStroke = line.getAttribute('data-original-stroke') || '#ef4444';
        const originalWidth = line.getAttribute('data-original-width') || '4';
        
        line.setAttribute('stroke', originalStroke);
        line.setAttribute('stroke-width', originalWidth);
        line.removeAttribute('stroke-dasharray');
        
        line.removeAttribute('data-original-stroke');
        line.removeAttribute('data-original-width');
    }
};

window.TracingContextMenu = TracingContextMenu;

(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            TracingContextMenu.init();
        });
    } else {
        TracingContextMenu.init();
    }
})();

console.log('✅ Tracing Context Menu cargado');