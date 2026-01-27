/**
 * ============================================
 * Z-INDEX DETECTOR
 * Detección inteligente de elementos
 * ============================================
 */

const ZIndexDetector = {
    
    /**
     * Detecta el elemento bajo el cursor en el evento
     */
    detectElement(event) {
        const target = event.target;
        
        // ⭐ PRIORIDAD ABSOLUTA: Verificar círculos editables PRIMERO
        if (target.classList && target.classList.contains('edit-point')) {
            console.log('✅ Círculo editable detectado directamente');
            return target;
        }
        
        // ⭐ PRIORIDAD MÁXIMA: Buscar ventanas PRIMERO (antes que imágenes)
        const windowElement = this.findWindowElement(target);
        if (windowElement) {
            console.log('✅ Ventana detectada:', windowElement.className);
            return windowElement;
        }
        
        // Luego buscar otros elementos
        const element = this.findImageElement(target) ||
                       this.findPDFElement(target) ||
                       this.findDraggableParent(target) || 
                       this.findSVGElement(target) || 
                       this.findHTMLElement(target) ||
                       this.findAnyVisibleElement(target);
        
        return element;
    },

    /**
     * Busca imágenes cargadas (PNG, JPG, PDF como imagen)
     */
    findImageElement(element) {
        let current = element;
        
        while (current && current !== document.body) {
            // ⭐ EXCEPCIÓN: Si encontramos un edit-point, retornar inmediatamente
            if (current.classList && current.classList.contains('edit-point')) {
                return current;
            }
            
            // Grupos manipulables de imágenes
            if (current.classList && current.classList.contains('manipulable-image')) {
                return current;
            }
            
            // Grupos de PDF de fondo
            if (current.id && current.id.includes('pdfBackgroundGroup')) {
                return current;
            }
            
            // Imágenes directas
            if (current.tagName === 'IMG') {
                return current;
            }
            
            // Divs con background-image
            if (current.style && current.style.backgroundImage) {
                return current;
            }
            
            // Canvas (PDFs renderizados)
            if (current.tagName === 'CANVAS') {
                return current.parentElement || current;
            }
            
            // Contenedores de PDF/imágenes
            if (current.classList && (
                current.classList.contains('pdf-page') ||
                current.classList.contains('pdf-container') ||
                current.classList.contains('image-container') ||
                current.classList.contains('uploaded-image')
            )) {
                return current;
            }
            
            current = current.parentElement;
        }
        
        return null;
    },

    /**
     * Busca elementos PDF cargados
     */
    findPDFElement(element) {
        let current = element;
        
        while (current && current !== document.body) {
            // ⭐ EXCEPCIÓN: edit-point
            if (current.classList && current.classList.contains('edit-point')) {
                return current;
            }
            
            if (current.classList && (
                current.classList.contains('pdf-layer') ||
                current.classList.contains('pdf-page') ||
                current.classList.contains('pdf-viewer')
            )) {
                return current;
            }
            
            // SVG layer donde se cargan PDFs/imágenes
            if (current.id === 'svgLayer' || current.classList.contains('svg-layer')) {
                // Buscar el hijo directo que contiene la imagen
                if (current.children.length > 0) {
                    return current.children[0];
                }
                return current;
            }
            
            current = current.parentElement;
        }
        
        return null;
    },

    /**
     * Busca ventanas flotantes (isométricos, viñetas, etc)
     * ⭐ MEJORADO: Sube hasta 20 niveles en la jerarquía
     */
    findWindowElement(element) {
        let current = element;
        let levels = 0;
        const MAX_LEVELS = 20; // Subir hasta 20 niveles
        
        while (current && current !== document.body && levels < MAX_LEVELS) {
            // ⭐ EXCEPCIÓN: edit-point
            if (current.classList && current.classList.contains('edit-point')) {
                return current;
            }
            
            if (current.classList && (
                current.classList.contains('vineta-window') ||
                current.classList.contains('isometric-window') ||
                current.classList.contains('isometric-window-nivel2') ||
                current.classList.contains('detalle-ventana') ||
                current.classList.contains('cuadro-ueh-window') ||
                current.classList.contains('tabla-nch-window') ||
                current.classList.contains('modal-window') ||
                current.classList.contains('floating-window')
            )) {
                console.log(`✅ Ventana encontrada en nivel ${levels}:`, current.className);
                return current;
            }
            
            current = current.parentElement;
            levels++;
        }
        
        return null;
    },

    /**
     * Busca el elemento arrastrable padre
     */
    findDraggableParent(element) {
        let current = element;
        
        while (current && current !== document.body) {
            // ⭐ EXCEPCIÓN: edit-point SIEMPRE tiene prioridad
            if (current.classList && current.classList.contains('edit-point')) {
                return current;
            }
            
            // Elementos con clase draggable
            if (current.classList && current.classList.contains('draggable')) {
                return current;
            }
            
            // Elementos con atributo draggable
            if (current.hasAttribute && current.hasAttribute('draggable')) {
                return current;
            }
            
            // Elementos SVG arrastrables
            if (current.classList && (
                current.classList.contains('draggable-svg') ||
                current.classList.contains('draggable-element')
            )) {
                return current;
            }
            
            current = current.parentElement;
        }
        
        return null;
    },

    /**
     * Detecta elementos SVG específicos
     */
    findSVGElement(element) {
        let current = element;
        
        while (current && current !== document.body) {
            // ⭐ EXCEPCIÓN: edit-point
            if (current.classList && current.classList.contains('edit-point')) {
                return current;
            }
            
            // Grupos SVG con clase específica
            if (current.tagName === 'g' && current.classList && (
                current.classList.contains('sanitario') ||
                current.classList.contains('camara') ||
                current.classList.contains('tuberia') ||
                current.classList.contains('conexion') ||
                current.classList.contains('artefacto')
            )) {
                return current;
            }
            
            // Elementos SVG individuales importantes
            if (current.tagName === 'circle' || 
                current.tagName === 'rect' || 
                current.tagName === 'path' || 
                current.tagName === 'polygon' ||
                current.tagName === 'line' ||
                current.tagName === 'polyline' ||
                current.tagName === 'image') {
                
                // Verificar si tiene un grupo padre relevante
                const parent = current.parentElement;
                if (parent && parent.tagName === 'g') {
                    return parent;
                }
                return current;
            }
            
            current = current.parentElement;
        }
        
        return null;
    },

    /**
     * Detecta elementos HTML específicos
     */
    findHTMLElement(element) {
        let current = element;
        
        while (current && current !== document.body) {
            // ⭐ EXCEPCIÓN: edit-point
            if (current.classList && current.classList.contains('edit-point')) {
                return current;
            }
            
            // Elementos con clases específicas del proyecto
            if (current.classList && (
                current.classList.contains('text-element') ||
                current.classList.contains('vineta-window') ||
                current.classList.contains('tabla-nch') ||
                current.classList.contains('cuadro-ueh') ||
                current.classList.contains('simbolo') ||
                current.classList.contains('nota-plano') ||
                current.classList.contains('camara-info-container') ||
                current.classList.contains('detalle-ventana') ||
                current.classList.contains('rosa-norte')
            )) {
                return current;
            }
            
            // Elementos foreignObject (textos en SVG)
            if (current.tagName === 'foreignObject') {
                return current;
            }
            
            current = current.parentElement;
        }
        
        return null;
    },

    /**
     * Detecta CUALQUIER elemento visible como último recurso
     */
    findAnyVisibleElement(element) {
        let current = element;
        
        while (current && current !== document.body) {
            // ⭐ EXCEPCIÓN: edit-point
            if (current.classList && current.classList.contains('edit-point')) {
                return current;
            }
            
            // Si el elemento tiene posición absoluta o relativa
            const style = window.getComputedStyle(current);
            if (style.position === 'absolute' || style.position === 'relative' || style.position === 'fixed') {
                // Y tiene dimensiones
                if (current.offsetWidth > 0 && current.offsetHeight > 0) {
                    return current;
                }
            }
            
            current = current.parentElement;
        }
        
        return null;
    },

    /**
     * Verifica si un elemento es válido para el sistema de capas
     */
    isValidElement(element) {
        if (!element) return false;

        // ⭐ PRIORIDAD ABSOLUTA: CÍRCULOS EDITABLES
        if (element.classList && element.classList.contains('edit-point')) {
            console.log('✅ Círculo editable - PERMITIDO (prioridad absoluta)');
            return true;
        }
        
        // ⭐ PERMITIR EXPLÍCITAMENTE VENTANAS FLOTANTES
        if (element.classList && (
            element.classList.contains('vineta-window') ||
            element.classList.contains('isometric-window') ||
            element.classList.contains('isometric-window-nivel2') ||
            element.classList.contains('detalle-ventana') ||
            element.classList.contains('cuadro-ueh-window') ||
            element.classList.contains('tabla-nch-window') ||
            element.classList.contains('modal-window') ||
            element.classList.contains('floating-window')
        )) {
            console.log('✅ Ventana flotante - PERMITIDA:', element.className);
            return true;
        }
        
        // PERMITIR explícitamente elementos manipulables
        if (element.classList && element.classList.contains('manipulable-image')) {
            console.log('✅ Elemento manipulable-image VÁLIDO');
            return true;
        }
        
        // PERMITIR grupos de PDF/imágenes de fondo
        if (element.id && element.id.includes('pdfBackgroundGroup')) {
            console.log('✅ Grupo PDF de fondo VÁLIDO');
            return true;
        }
        
        // Excluir elementos del sistema (toolbar, paneles, etc)
        const excludedClasses = [
            'toolbar',
            'tracing-panel',
            'plans-panel',
            'email-modal',
            'context-menu-zindex',
            'status-bar'
        ];
        
        // Excluir IDs específicos de contenedores principales
        const excludedIds = [
            'workspace',
            'drawingBoard'
        ];
        
        let current = element;
        while (current && current !== document.body) {
            // ⭐ DOBLE VERIFICACIÓN: Si en algún punto encontramos edit-point, permitir
            if (current.classList && current.classList.contains('edit-point')) {
                console.log('✅ Edit-point encontrado en jerarquía - PERMITIDO');
                return true;
            }
            
            // Verificar clases excluidas
            if (current.classList) {
                for (const excludedClass of excludedClasses) {
                    if (current.classList.contains(excludedClass)) {
                        console.log(`❌ Elemento excluido por clase: ${excludedClass}`);
                        return false;
                    }
                }
            }
            
            // Verificar IDs excluidos (solo contenedores principales)
            if (current.id && excludedIds.includes(current.id)) {
                console.log(`❌ Elemento excluido por ID: ${current.id}`);
                return false;
            }
            
            current = current.parentElement;
        }
        
        console.log('✅ Elemento VÁLIDO:', element.tagName, element.className, element.id);
        return true;
    },

    /**
     * Obtiene información del elemento para debugging
     */
    getElementInfo(element) {
        if (!element) return 'No element';
        
        const info = {
            tag: element.tagName,
            classes: element.className,
            id: element.id,
            zIndex: window.getComputedStyle(element).zIndex
        };
        
        return info;
    }
};

// Exportar globalmente
window.ZIndexDetector = ZIndexDetector;