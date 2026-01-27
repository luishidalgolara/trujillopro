/**
 * ============================================
 * Z-INDEX MANAGER - INITIALIZATION
 * Inicializador e integración con el sistema
 * ============================================
 */

(function() {
    'use strict';

    /**
     * Inicializa el sistema de Z-Index Manager
     */
    function initZIndexManager() {
        console.log('🎯 Inicializando Z-Index Manager...');

        // Inicializar menú contextual
        ZIndexContextMenu.init();

        // Registrar elementos existentes automáticamente
        registerExistingElements();

        // Observar nuevos elementos
        observeNewElements();

        console.log('✅ Z-Index Manager inicializado correctamente');
    }

    /**
     * Registra elementos existentes en el DOM
     */
    function registerExistingElements() {
        const selectors = [
            '.draggable',
            '.draggable-svg',
            '.draggable-element',
            '.text-element',
            '.vineta-window',
            '.tabla-nch',
            '.cuadro-ueh',
            '.simbolo',
            '.nota-plano',
            '.camara-info-container',
            '.detalle-ventana',
            '.rosa-norte',
            'foreignObject',
            'g.sanitario',
            'g.camara',
            'g.tuberia',
            'g.conexion',
            'g.artefacto'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                ZIndexManager.registerElement(element);
            });
        });

        console.log(`📦 Registrados ${ZIndexManager.elements.size} elementos`);
    }

    /**
     * Observa la creación de nuevos elementos
     */
    function observeNewElements() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Verificar si el nuevo elemento es válido
                        if (ZIndexDetector.isValidElement(node)) {
                            ZIndexManager.registerElement(node);
                        }

                        // Verificar hijos del nuevo elemento
                        const validChildren = node.querySelectorAll ? 
                            node.querySelectorAll('.draggable, .text-element, foreignObject') : 
                            [];
                        
                        validChildren.forEach(child => {
                            if (ZIndexDetector.isValidElement(child)) {
                                ZIndexManager.registerElement(child);
                            }
                        });
                    }
                });
            });
        });

        // Observar el workspace
        const workspace = document.getElementById('workspace');
        if (workspace) {
            observer.observe(workspace, {
                childList: true,
                subtree: true
            });
        }

        // Observar el SVG de trazado
        const tracingSvg = document.getElementById('tracingSvg');
        if (tracingSvg) {
            observer.observe(tracingSvg, {
                childList: true,
                subtree: true
            });
        }
    }

    /**
     * API pública para usar desde otros módulos
     */
    window.ZIndexAPI = {
        // Traer elemento al frente
        bringToFront: (element) => {
            ZIndexManager.bringToFront(element);
        },

        // Enviar elemento al fondo
        sendToBack: (element) => {
            ZIndexManager.sendToBack(element);
        },

        // Traer elemento adelante
        bringForward: (element) => {
            ZIndexManager.bringForward(element);
        },

        // Enviar elemento atrás
        sendBackward: (element) => {
            ZIndexManager.sendBackward(element);
        },

        // Registrar elemento manualmente
        register: (element) => {
            ZIndexManager.registerElement(element);
        },

        // Obtener z-index de elemento
        getZIndex: (element) => {
            return ZIndexManager.getElementZIndex(element);
        },

        // Establecer z-index específico
        setZIndex: (element, zIndex) => {
            ZIndexManager.setElementZIndex(element, zIndex);
        }
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initZIndexManager);
    } else {
        initZIndexManager();
    }

})();