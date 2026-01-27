/**
 * ============================================
 * TRACING CONTEXT MENU
 * Menú contextual para líneas de trazado
 * ============================================
 */

const TracingContextMenu = {
    menu: null,
    currentLine: null,

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
        menu.innerHTML = `
            <div class="context-menu-item" data-action="editPoints">
                <span class="menu-icon">✏️</span>
                <span class="menu-text">Editar puntos de conexión</span>
            </div>
            <div class="context-menu-item" data-action="invertDirection">
                <span class="menu-icon">🔄</span>
                <span class="menu-text">Invertir dirección de flujo</span>
            </div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item" data-action="deleteLine">
                <span class="menu-icon">🗑️</span>
                <span class="menu-text">Eliminar conexión</span>
            </div>
        `;

        document.body.appendChild(menu);
        this.menu = menu;

        menu.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const action = item.getAttribute('data-action');
                this.executeAction(action);
                this.hide();
            });
        });
    },

    attachEvents() {
        document.addEventListener('contextmenu', (e) => {
            const target = e.target;
            
            if (this.isTracingLine(target)) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                console.log('✅ LÍNEA DE TRAZADO DETECTADA - Mostrando menú');
                
                this.hide();
                
                setTimeout(() => {
                    this.show(e, target);
                }, 50);
                
                return false;
            }
        }, true);

        document.addEventListener('click', (e) => {
            if (this.menu && !this.menu.contains(e.target)) {
                this.hide();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
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

        console.log('📍 Mostrando menú de trazado');

        this.currentLine = line;
        
        this.highlightLine(line);

        const x = event.clientX;
        const y = event.clientY;

        this.menu.style.left = `${x}px`;
        this.menu.style.top = `${y}px`;
        this.menu.classList.add('active');

        console.log(`✅ Menú posicionado en: ${x}, ${y}`);

        setTimeout(() => {
            const rect = this.menu.getBoundingClientRect();
            
            if (rect.right > window.innerWidth) {
                this.menu.style.left = `${x - rect.width}px`;
            }
            
            if (rect.bottom > window.innerHeight) {
                this.menu.style.top = `${y - rect.height}px`;
            }
        }, 10);
    },

    hide() {
        if (!this.menu) return;
        
        this.menu.classList.remove('active');
        
        if (this.currentLine) {
            this.unhighlightLine(this.currentLine);
        }
        
        this.currentLine = null;
        
        console.log('🔒 Menú ocultado y limpiado');
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
        
        // ⭐ REMOVER cualquier punto editable previo
        const puntosAnteriores = document.querySelectorAll('.edit-point');
        puntosAnteriores.forEach(punto => punto.remove());
        
        // ⭐ AGREGAR punto editable SOLO a esta línea
        if (typeof agregarPuntoEditableALinea === 'function') {
            agregarPuntoEditableALinea(this.currentLine);
            console.log('✅ Punto editable agregado a la línea seleccionada');
        } else {
            console.error('❌ Función agregarPuntoEditableALinea no disponible');
            return;
        }
        
        // Visual feedback
        this.highlightLine(this.currentLine, '#22c55e', 6);
        
        if (typeof showStatus === 'function') {
            showStatus('✅ Punto editable activado - Arrastra el círculo rojo y presiona ENTER');
        }
        
        // Remover highlight después de 2 segundos
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