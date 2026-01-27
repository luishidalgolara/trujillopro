/**
 * ============================================
 * Z-INDEX CONTEXT MENU
 * Menú contextual tipo Canva
 * ============================================
 */

const ZIndexContextMenu = {
    menu: null,
    currentElement: null,

    /**
     * Inicializa el menú contextual
     */
    init() {
        this.createMenu();
        this.attachEvents();
        console.log('✅ Menú contextual Z-Index inicializado');
    },

    /**
     * Crea el HTML del menú contextual
     */
    createMenu() {
        // Eliminar menú existente si hay
        const existingMenu = document.getElementById('contextMenuZIndex');
        if (existingMenu) {
            existingMenu.remove();
        }

        // Crear nuevo menú
        const menu = document.createElement('div');
        menu.id = 'contextMenuZIndex';
        menu.className = 'context-menu-zindex';
        menu.innerHTML = `
            <div class="context-menu-item" data-action="bringToFront">
                <span class="menu-icon">⬆️</span>
                <span class="menu-text">Traer al frente</span>
            </div>
            <div class="context-menu-item" data-action="bringForward">
                <span class="menu-icon">↗️</span>
                <span class="menu-text">Traer adelante</span>
            </div>
            <div class="context-menu-divider"></div>
            <div class="context-menu-item" data-action="sendBackward">
                <span class="menu-icon">↙️</span>
                <span class="menu-text">Enviar atrás</span>
            </div>
            <div class="context-menu-item" data-action="sendToBack">
                <span class="menu-icon">⬇️</span>
                <span class="menu-text">Enviar al fondo</span>
            </div>
        `;

        document.body.appendChild(menu);
        this.menu = menu;

        // Eventos de los items del menú
        menu.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = item.getAttribute('data-action');
                this.executeAction(action);
                this.hide();
            });
        });
    },

    /**
     * Adjunta eventos al documento
     */
    attachEvents() {
        // EVENTO DE CLIC DERECHO - MUY IMPORTANTE
        document.addEventListener('contextmenu', (e) => {
            const target = e.target;
            
            console.log('🖱️ Z-Index - Clic derecho detectado en:', target.tagName, target.className);
            
            // ⭐ EXCLUIR LÍNEAS DE TRAZADO (dejar que TracingContextMenu las maneje)
            if (target.classList && target.classList.contains('pipe-line')) {
                console.log('⚠️ Es línea de trazado - IGNORANDO en Z-Index menu');
                return; // No hacer nada, dejar que TracingContextMenu lo maneje
            }
            
            if (target.tagName === 'line' && target.hasAttribute('data-from')) {
                console.log('⚠️ Es línea de trazado - IGNORANDO en Z-Index menu');
                return;
            }
            
            // Detectar elemento
            const element = ZIndexDetector.detectElement(e);
            
            console.log('🎯 Elemento detectado:', element);
            
            if (element && ZIndexDetector.isValidElement(element)) {
                e.preventDefault(); // PREVENIR MENÚ NATIVO
                e.stopPropagation();
                this.show(e, element);
                console.log('✅ Mostrando menú Z-Index para:', element);
            } else {
                console.log('❌ Elemento no válido o no detectado');
            }
        }, true); // ⭐ CAPTURE PHASE - captura ANTES que otros handlers

        // Cerrar menú al hacer clic izquierdo fuera
        document.addEventListener('click', (e) => {
            if (this.menu && !this.menu.contains(e.target)) {
                this.hide();
            }
        });

        // Cerrar menú con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hide();
            }
        });

        // Cerrar menú al hacer scroll
        document.addEventListener('scroll', () => {
            this.hide();
        }, true);
    },

    /**
     * Muestra el menú contextual
     */
    show(event, element) {
        if (!this.menu) {
            console.error('❌ Menú no creado');
            return;
        }

        this.currentElement = element;
        
        // Registrar elemento en el manager
        ZIndexManager.registerElement(element);

        // Posicionar menú
        const x = event.clientX;
        const y = event.clientY;

        this.menu.style.left = `${x}px`;
        this.menu.style.top = `${y}px`;
        this.menu.classList.add('active');

        console.log(`📍 Menú Z-Index posicionado en: ${x}, ${y}`);

        // Ajustar si se sale de la pantalla
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

    /**
     * Oculta el menú contextual
     */
    hide() {
        if (!this.menu) return;
        
        this.menu.classList.remove('active');
        console.log('🔒 Menú Z-Index ocultado');
    },

    /**
     * Ejecuta una acción del menú
     */
    executeAction(action) {
        if (!this.currentElement) {
            console.error('❌ No hay elemento seleccionado');
            return;
        }

        console.log(`⚡ Ejecutando acción: ${action}`);

        switch (action) {
            case 'bringToFront':
                ZIndexManager.bringToFront(this.currentElement);
                break;
            case 'bringForward':
                ZIndexManager.bringForward(this.currentElement);
                break;
            case 'sendBackward':
                ZIndexManager.sendBackward(this.currentElement);
                break;
            case 'sendToBack':
                ZIndexManager.sendToBack(this.currentElement);
                break;
        }

        // Resaltar brevemente el elemento
        this.highlightElement(this.currentElement);
    },

    /**
     * Resalta brevemente el elemento modificado
     */
    highlightElement(element) {
        if (!element) return;

        const originalOutline = element.style.outline;
        const originalOutlineOffset = element.style.outlineOffset;
        
        element.style.outline = '3px solid #3498db';
        element.style.outlineOffset = '2px';

        setTimeout(() => {
            element.style.outline = originalOutline;
            element.style.outlineOffset = originalOutlineOffset;
        }, 600);
    }
};

// Exportar globalmente
window.ZIndexContextMenu = ZIndexContextMenu;