/**
 * ============================================
 * Z-INDEX MANAGER - CORE
 * Sistema de control de capas tipo Canva
 * ============================================
 */

const ZIndexManager = {
    // Almacena todos los elementos con su z-index
    elements: new Map(),
    currentMaxZIndex: 10000,
    currentMinZIndex: 1,

    /**
     * Registra un elemento en el sistema de capas
     */
    registerElement(element) {
        if (!element) return;
        
        const currentZIndex = this.getElementZIndex(element);
        this.elements.set(element, currentZIndex);
        
        if (currentZIndex > this.currentMaxZIndex) {
            this.currentMaxZIndex = currentZIndex;
        }
        if (currentZIndex < this.currentMinZIndex && currentZIndex > 0) {
            this.currentMinZIndex = currentZIndex;
        }
    },

    /**
     * Obtiene el z-index actual de un elemento
     */
    getElementZIndex(element) {
        // Para elementos SVG, usar getAttribute primero
        if (element.tagName === 'g' || element.tagName === 'svg') {
            const dataZIndex = element.getAttribute('data-z-index');
            if (dataZIndex) {
                return parseInt(dataZIndex);
            }
        }
        
        const computed = window.getComputedStyle(element);
        let zIndex = parseInt(computed.zIndex);
        
        if (isNaN(zIndex) || zIndex === 0) {
            zIndex = 100; // z-index por defecto
        }
        
        return zIndex;
    },

    /**
     * Establece el z-index de un elemento
     */
    setElementZIndex(element, zIndex) {
        if (!element) return;
        
        console.log(`🎨 Aplicando z-index ${zIndex} a:`, element.tagName, element.className);
        
        // ⭐ PARA VENTANAS FLOTANTES (position: fixed)
        if (element.classList && (
            element.classList.contains('isometric-window') ||
            element.classList.contains('isometric-window-nivel2') ||
            element.classList.contains('vineta-window') ||
            element.classList.contains('cuadro-ueh-window') ||
            element.classList.contains('tabla-nch-window') ||
            element.classList.contains('modal-window') ||
            element.classList.contains('floating-window')
        )) {
            element.style.zIndex = zIndex;
            element.style.position = 'fixed'; // Asegurar position fixed
            console.log(`✅ Ventana flotante - z-index aplicado: ${zIndex}`);
        }
        // Para elementos SVG <g>, usar transform y data-attribute
        else if (element.tagName === 'g') {
            element.setAttribute('data-z-index', zIndex);
            element.style.zIndex = zIndex;
            
            // AGREGAR FONDO BLANCO OPACO
            this.addOpaqueBackground(element);
            
            // Reordenar en el DOM SVG (esto es CRÍTICO)
            const parent = element.parentNode;
            if (parent) {
                parent.appendChild(element); // Mover al final = al frente
            }
        } 
        // Para elementos HTML normales
        else {
            element.style.zIndex = zIndex;
            
            // AGREGAR FONDO BLANCO OPACO PARA HTML
            element.style.backgroundColor = '#ffffff';
            element.style.opacity = '1';
        }
        
        this.elements.set(element, zIndex);
        
        // Actualizar rangos
        if (zIndex > this.currentMaxZIndex) {
            this.currentMaxZIndex = zIndex;
        }
        if (zIndex < this.currentMinZIndex) {
            this.currentMinZIndex = zIndex;
        }
        
        console.log(`✅ z-index aplicado: ${zIndex}`);
    },

    /**
     * Agrega un rectángulo blanco opaco de fondo a elementos SVG
     */
    addOpaqueBackground(element) {
        if (element.tagName !== 'g') return;
        
        // Verificar si ya tiene fondo
        let background = element.querySelector('.z-index-background');
        
        if (!background) {
            // Obtener dimensiones del elemento
            const bbox = element.getBBox();
            
            // Crear rectángulo blanco opaco
            background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            background.classList.add('z-index-background');
            background.setAttribute('x', bbox.x - 10); // Padding extra
            background.setAttribute('y', bbox.y - 10);
            background.setAttribute('width', bbox.width + 20);
            background.setAttribute('height', bbox.height + 20);
            background.setAttribute('fill', '#ffffff'); // Blanco
            background.setAttribute('opacity', '1'); // Totalmente opaco
            background.setAttribute('stroke', 'none');
            
            // Insertar al PRINCIPIO del grupo (para que esté detrás del contenido)
            element.insertBefore(background, element.firstChild);
            
            console.log('✅ Fondo blanco opaco agregado');
        } else {
            // Actualizar dimensiones si ya existe
            const bbox = element.getBBox();
            background.setAttribute('x', bbox.x - 10);
            background.setAttribute('y', bbox.y - 10);
            background.setAttribute('width', bbox.width + 20);
            background.setAttribute('height', bbox.height + 20);
        }
    },

    /**
     * TRAER AL FRENTE - Pone el elemento encima de todos
     */
    bringToFront(element) {
        if (!element) return;
        
        console.log('⬆️ TRAER AL FRENTE');
        
        this.currentMaxZIndex++;
        this.setElementZIndex(element, this.currentMaxZIndex);
        
        // Para SVG, mover al final del padre
        if (element.tagName === 'g' && element.parentNode) {
            element.parentNode.appendChild(element);
        }
        
        console.log(`✅ Elemento traído al frente: z-index ${this.currentMaxZIndex}`);
    },

    /**
     * ENVIAR AL FONDO - Pone el elemento debajo de todos
     */
    sendToBack(element) {
        if (!element) return;
        
        console.log('⬇️ ENVIAR AL FONDO');
        
        this.currentMinZIndex--;
        this.setElementZIndex(element, this.currentMinZIndex);
        
        // Para SVG, mover al principio del padre
        if (element.tagName === 'g' && element.parentNode) {
            const parent = element.parentNode;
            parent.insertBefore(element, parent.firstChild);
        }
        
        console.log(`✅ Elemento enviado al fondo: z-index ${this.currentMinZIndex}`);
    },

    /**
     * TRAER ADELANTE - Incrementa z-index en 1
     */
    bringForward(element) {
        if (!element) return;
        
        console.log('↗️ TRAER ADELANTE');
        
        const currentZ = this.getElementZIndex(element);
        const newZ = currentZ + 1;
        this.setElementZIndex(element, newZ);
        
        // Para SVG, mover un nivel arriba en el DOM
        if (element.tagName === 'g' && element.parentNode) {
            const parent = element.parentNode;
            const nextSibling = element.nextSibling;
            if (nextSibling) {
                parent.insertBefore(nextSibling, element);
            }
        }
        
        console.log(`✅ Elemento traído adelante: z-index ${currentZ} → ${newZ}`);
    },

    /**
     * ENVIAR ATRÁS - Decrementa z-index en 1
     */
    sendBackward(element) {
        if (!element) return;
        
        console.log('↙️ ENVIAR ATRÁS');
        
        const currentZ = this.getElementZIndex(element);
        const newZ = currentZ - 1;
        this.setElementZIndex(element, newZ);
        
        // Para SVG, mover un nivel abajo en el DOM
        if (element.tagName === 'g' && element.parentNode) {
            const parent = element.parentNode;
            const prevSibling = element.previousSibling;
            if (prevSibling) {
                parent.insertBefore(element, prevSibling);
            }
        }
        
        console.log(`✅ Elemento enviado atrás: z-index ${currentZ} → ${newZ}`);
    },

    /**
     * Reordena elementos SVG según su z-index
     */
    reorderSVGElements(parent) {
        if (!parent) return;
        
        const elements = Array.from(parent.children);
        const withZIndex = elements.map(el => ({
            element: el,
            zIndex: this.getElementZIndex(el)
        }));
        
        // Ordenar por z-index
        withZIndex.sort((a, b) => a.zIndex - b.zIndex);
        
        // Reinsertar en orden
        withZIndex.forEach(item => {
            parent.appendChild(item.element);
        });
    },

    /**
     * Obtiene todos los elementos registrados ordenados por z-index
     */
    getOrderedElements() {
        return Array.from(this.elements.entries())
            .sort((a, b) => a[1] - b[1])
            .map(entry => entry[0]);
    },

    /**
     * Reinicia el sistema de capas
     */
    reset() {
        this.elements.clear();
        this.currentMaxZIndex = 10000;
        this.currentMinZIndex = 1;
    }
};

// Exportar globalmente
window.ZIndexManager = ZIndexManager;