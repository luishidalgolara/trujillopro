// ========================================
// CORE DEL SISTEMA DE TEXTO - VERSIÓN DEFINITIVA
// ========================================

const TextoCore = {
    
    textosActivos: [],
    textoSeleccionado: null,
    idCounter: 0,
    
    /**
     * Crear nuevo texto en el plano
     */
    crearTexto(opciones) {
        const config = {
            ...TextoConfig.defaults,
            ...opciones
        };
        
        const id = `texto-${this.idCounter++}`;
        const x = config.x || 100;
        const y = config.y || 100;
        
        // Crear grupo SVG para el texto
        const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        grupo.setAttribute('id', id);
        grupo.setAttribute('class', 'texto-personalizado');
        grupo.setAttribute('transform', `translate(${x}, ${y}) rotate(${config.rotacion || 0})`);
        grupo.style.cursor = 'move';
        
        // Crear elemento de texto
        const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        texto.setAttribute('x', '0');
        texto.setAttribute('y', '0');
        texto.setAttribute('font-family', config.fuente);
        texto.setAttribute('font-size', config.tamaño);
        texto.setAttribute('fill', config.color);
        texto.setAttribute('opacity', config.opacidad);
        texto.setAttribute('text-anchor', this.getAnchor(config.alineacion));
        
        // Aplicar estilos
        if (config.negrita) {
            texto.setAttribute('font-weight', 'bold');
        }
        if (config.cursiva) {
            texto.setAttribute('font-style', 'italic');
        }
        if (config.subrayado) {
            texto.setAttribute('text-decoration', 'underline');
        }
        if (config.espaciadoLetras) {
            texto.setAttribute('letter-spacing', config.espaciadoLetras);
        }
        
        // Dividir texto en líneas si contiene \n
        const lineas = config.texto.split('\n');
        if (lineas.length === 1) {
            texto.textContent = config.texto;
            grupo.appendChild(texto);
        } else {
            // Texto multilínea
            lineas.forEach((linea, index) => {
                const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.setAttribute('x', '0');
                tspan.setAttribute('dy', index === 0 ? '0' : `${config.tamaño * config.interlineado}px`);
                tspan.textContent = linea;
                texto.appendChild(tspan);
            });
            grupo.appendChild(texto);
        }
        
        // Crear rectángulo de fondo opcional
        if (config.fondoActivo) {
            const bbox = texto.getBBox();
            const padding = 5;
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', bbox.x - padding);
            rect.setAttribute('y', bbox.y - padding);
            rect.setAttribute('width', bbox.width + padding * 2);
            rect.setAttribute('height', bbox.height + padding * 2);
            rect.setAttribute('fill', config.colorFondo || '#ffffff');
            rect.setAttribute('opacity', config.opacidadFondo || 0.8);
            rect.setAttribute('rx', '3');
            grupo.insertBefore(rect, texto);
        }
        
        // Agregar al plano
        const plano = document.getElementById('plano');
        plano.appendChild(grupo);
        
        // Registrar el texto
        const textoObj = {
            id,
            grupo,
            texto,
            config,
            x,
            y
        };
        
        this.textosActivos.push(textoObj);
        
        // ✅ SOLUCIÓN DEFINITIVA: Configurar eventos con máxima prioridad
        this.configurarEventos(textoObj);
        
        console.log('✅ Texto creado:', id);
        return textoObj;
    },
    
    /**
     * ✅ NUEVA FUNCIÓN: Configurar todos los eventos del texto
     */
    configurarEventos(textoObj) {
        const grupo = textoObj.grupo;
        let isDragging = false;
        let dragStartTime = 0;
        let dragStartX = 0;
        let dragStartY = 0;
        let hasMoved = false;
        
        // ✅ EVENTO MOUSEDOWN con capture
        grupo.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            
            dragStartTime = Date.now();
            hasMoved = false;
            
            const plano = document.getElementById('plano');
            const pt = plano.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgP = pt.matrixTransform(plano.getScreenCTM().inverse());
            
            dragStartX = svgP.x - textoObj.x;
            dragStartY = svgP.y - textoObj.y;
            
            // ✅ Detener propagación
            e.stopPropagation();
        }, true);
        
        // ✅ EVENTO MOUSEMOVE - solo en el documento
        const mouseMoveHandler = (e) => {
            const timeSinceMouseDown = Date.now() - dragStartTime;
            
            // Solo empezar a arrastrar después de 150ms y si el mouse se ha movido
            if (timeSinceMouseDown < 150 || !dragStartTime) return;
            
            if (!isDragging) {
                isDragging = true;
                grupo.style.opacity = '0.7';
            }
            
            hasMoved = true;
            
            const plano = document.getElementById('plano');
            const pt = plano.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgP = pt.matrixTransform(plano.getScreenCTM().inverse());
            
            textoObj.x = svgP.x - dragStartX;
            textoObj.y = svgP.y - dragStartY;
            
            const rotacion = textoObj.config.rotacion || 0;
            grupo.setAttribute('transform', `translate(${textoObj.x}, ${textoObj.y}) rotate(${rotacion})`);
        };
        
        // ✅ EVENTO MOUSEUP - solo en el documento
        const mouseUpHandler = () => {
            if (isDragging) {
                isDragging = false;
                grupo.style.opacity = '1';
            }
            dragStartTime = 0;
        };
        
        // Agregar listeners al documento
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        
        // ✅ EVENTO DOBLE CLICK con MÁXIMA PRIORIDAD
        grupo.addEventListener('dblclick', (e) => {
            console.log('🖱️ Doble click detectado en texto:', textoObj.id);
            
            // ✅ DETENER TODO
            e.stopImmediatePropagation();
            e.preventDefault();
            
            // Si se estaba arrastrando, no abrir editor
            if (hasMoved) {
                console.log('⚠️ Se detectó movimiento, no abrir editor');
                hasMoved = false;
                return;
            }
            
            // Abrir editor
            this.editarTexto(textoObj);
        }, true);  // ✅ CAPTURE = TRUE
        
        // Guardar referencias para limpieza
        textoObj.mouseMoveHandler = mouseMoveHandler;
        textoObj.mouseUpHandler = mouseUpHandler;
    },
    
    /**
     * Editar texto existente
     */
    editarTexto(textoObj) {
        console.log('✏️ Abriendo editor para:', textoObj.id);
        this.textoSeleccionado = textoObj;
        TextoUI.abrirEditar(textoObj);
    },
    
    /**
     * Actualizar texto existente
     */
    actualizarTexto(textoObj, nuevasOpciones) {
        // Actualizar configuración
        Object.assign(textoObj.config, nuevasOpciones);
        
        // Remover elementos antiguos
        while (textoObj.grupo.firstChild) {
            textoObj.grupo.removeChild(textoObj.grupo.firstChild);
        }
        
        // Recrear texto con nueva configuración
        const config = textoObj.config;
        
        // Crear elemento de texto
        const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        texto.setAttribute('x', '0');
        texto.setAttribute('y', '0');
        texto.setAttribute('font-family', config.fuente);
        texto.setAttribute('font-size', config.tamaño);
        texto.setAttribute('fill', config.color);
        texto.setAttribute('opacity', config.opacidad);
        texto.setAttribute('text-anchor', this.getAnchor(config.alineacion));
        
        // Aplicar estilos
        if (config.negrita) texto.setAttribute('font-weight', 'bold');
        if (config.cursiva) texto.setAttribute('font-style', 'italic');
        if (config.subrayado) texto.setAttribute('text-decoration', 'underline');
        if (config.espaciadoLetras) texto.setAttribute('letter-spacing', config.espaciadoLetras);
        
        // Texto multilínea
        const lineas = config.texto.split('\n');
        if (lineas.length === 1) {
            texto.textContent = config.texto;
        } else {
            lineas.forEach((linea, index) => {
                const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.setAttribute('x', '0');
                tspan.setAttribute('dy', index === 0 ? '0' : `${config.tamaño * config.interlineado}px`);
                tspan.textContent = linea;
                texto.appendChild(tspan);
            });
        }
        
        // Fondo opcional
        if (config.fondoActivo) {
            textoObj.grupo.appendChild(texto);
            const bbox = texto.getBBox();
            const padding = 5;
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', bbox.x - padding);
            rect.setAttribute('y', bbox.y - padding);
            rect.setAttribute('width', bbox.width + padding * 2);
            rect.setAttribute('height', bbox.height + padding * 2);
            rect.setAttribute('fill', config.colorFondo || '#ffffff');
            rect.setAttribute('opacity', config.opacidadFondo || 0.8);
            rect.setAttribute('rx', '3');
            textoObj.grupo.insertBefore(rect, texto);
        } else {
            textoObj.grupo.appendChild(texto);
        }
        
        // Actualizar transform con rotación
        textoObj.grupo.setAttribute('transform', `translate(${textoObj.x}, ${textoObj.y}) rotate(${config.rotacion || 0})`);
        
        textoObj.texto = texto;
        console.log('✅ Texto actualizado:', textoObj.id);
    },
    
    /**
     * Eliminar texto
     */
    eliminarTexto(textoObj) {
        // Limpiar event listeners
        if (textoObj.mouseMoveHandler) {
            document.removeEventListener('mousemove', textoObj.mouseMoveHandler);
        }
        if (textoObj.mouseUpHandler) {
            document.removeEventListener('mouseup', textoObj.mouseUpHandler);
        }
        
        const index = this.textosActivos.indexOf(textoObj);
        if (index > -1) {
            this.textosActivos.splice(index, 1);
        }
        textoObj.grupo.remove();
        console.log('🗑️ Texto eliminado:', textoObj.id);
    },
    
    /**
     * Obtener anchor de alineación
     */
    getAnchor(alineacion) {
        switch (alineacion) {
            case 'left': return 'start';
            case 'center': return 'middle';
            case 'right': return 'end';
            default: return 'start';
        }
    },
    
    /**
     * Limpiar todos los textos
     */
    limpiarTodos() {
        this.textosActivos.forEach(textoObj => {
            // Limpiar event listeners
            if (textoObj.mouseMoveHandler) {
                document.removeEventListener('mousemove', textoObj.mouseMoveHandler);
            }
            if (textoObj.mouseUpHandler) {
                document.removeEventListener('mouseup', textoObj.mouseUpHandler);
            }
            textoObj.grupo.remove();
        });
        this.textosActivos = [];
        console.log('🧹 Todos los textos eliminados');
    }
};

console.log('✅ Core de texto cargado - VERSIÓN DEFINITIVA');
console.log('✅ Doble click con máxima prioridad y sin conflictos');
console.log('✅ Sistema de arrastre mejorado');