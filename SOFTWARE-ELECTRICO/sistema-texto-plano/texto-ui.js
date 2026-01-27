// ========================================
// INTERFAZ DE USUARIO DEL SISTEMA DE TEXTO
// ========================================

const TextoUI = {
    
    modalElement: null,
    previsualizacionElement: null,
    modoEdicion: false,
    textoEditando: null,
    
    /**
     * Abrir modal para crear nuevo texto
     */
    abrirCrear() {
        this.modoEdicion = false;
        this.textoEditando = null;
        this.mostrarModal();
    },
    
    /**
     * Abrir modal para editar texto existente
     */
    abrirEditar(textoObj) {
        this.modoEdicion = true;
        this.textoEditando = textoObj;
        this.mostrarModal();
        this.cargarDatosTexto(textoObj);
    },
    
    /**
     * Mostrar modal
     */
    mostrarModal() {
        // Si ya existe, solo mostrar
        if (this.modalElement) {
            this.modalElement.style.display = 'flex';
            return;
        }
        
        // Crear modal
        const modal = document.createElement('div');
        modal.className = 'texto-modal';
        modal.id = 'textoModal';
        modal.innerHTML = `
            <div class="texto-modal-overlay" onclick="TextoUI.cerrar()"></div>
            <div class="texto-modal-window">
                <div class="texto-modal-header">
                    <div class="texto-modal-title">
                        <span id="textoModalTitulo">📝 Agregar Texto al Plano</span>
                    </div>
                    <button class="texto-modal-close" onclick="TextoUI.cerrar()">✕</button>
                </div>
                
                <div class="texto-modal-content">
                    
                    <!-- Área de texto -->
                    <div class="texto-form-group">
                        <label class="texto-label">Texto:</label>
                        <textarea id="textoInput" class="texto-textarea" rows="3" placeholder="Escribe tu texto aquí...&#10;Puedes usar múltiples líneas"></textarea>
                    </div>
                    
                    <!-- Estilos predefinidos -->
                    <div class="texto-form-group">
                        <label class="texto-label">Estilos Rápidos:</label>
                        <div class="texto-estilos-grid">
                            <button class="texto-estilo-btn" onclick="TextoUI.aplicarEstilo('titulo-principal')">Título Principal</button>
                            <button class="texto-estilo-btn" onclick="TextoUI.aplicarEstilo('titulo-seccion')">Título Sección</button>
                            <button class="texto-estilo-btn" onclick="TextoUI.aplicarEstilo('subtitulo')">Subtítulo</button>
                            <button class="texto-estilo-btn" onclick="TextoUI.aplicarEstilo('texto-normal')">Texto Normal</button>
                            <button class="texto-estilo-btn" onclick="TextoUI.aplicarEstilo('titulo-plano')">Título Plano</button>
                            <button class="texto-estilo-btn" onclick="TextoUI.aplicarEstilo('notas')">Notas</button>
                        </div>
                    </div>
                    
                    <!-- Configuración de fuente -->
                    <div class="texto-form-row">
                        <div class="texto-form-group">
                            <label class="texto-label">Fuente:</label>
                            <select id="textoFuente" class="texto-select" onchange="TextoUI.actualizarPrevisualizacion()">
                                ${this.generarOpcionesFuentes()}
                            </select>
                        </div>
                        
                        <div class="texto-form-group">
                            <label class="texto-label">Tamaño:</label>
                            <select id="textoTamaño" class="texto-select" onchange="TextoUI.actualizarPrevisualizacion()">
                                ${this.generarOpcionesTamaños()}
                            </select>
                        </div>
                        
                        <div class="texto-form-group">
                            <label class="texto-label">Color:</label>
                            <input type="color" id="textoColor" class="texto-color-input" value="#000000" onchange="TextoUI.actualizarPrevisualizacion()">
                        </div>
                    </div>
                    
                    <!-- Estilos de texto -->
                    <div class="texto-form-group">
                        <label class="texto-label">Estilo:</label>
                        <div class="texto-estilos-botones">
                            <button id="textoNegrita" class="texto-estilo-toggle" onclick="TextoUI.toggleEstilo('negrita')">
                                <strong>B</strong>
                            </button>
                            <button id="textoCursiva" class="texto-estilo-toggle" onclick="TextoUI.toggleEstilo('cursiva')">
                                <em>I</em>
                            </button>
                            <button id="textoSubrayado" class="texto-estilo-toggle" onclick="TextoUI.toggleEstilo('subrayado')">
                                <u>U</u>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Alineación -->
                    <div class="texto-form-group">
                        <label class="texto-label">Alineación:</label>
                        <div class="texto-alineacion-botones">
                            <button class="texto-alineacion-btn active" data-align="left" onclick="TextoUI.setAlineacion('left')">
                                <span>≡</span> Izquierda
                            </button>
                            <button class="texto-alineacion-btn" data-align="center" onclick="TextoUI.setAlineacion('center')">
                                <span>≡</span> Centro
                            </button>
                            <button class="texto-alineacion-btn" data-align="right" onclick="TextoUI.setAlineacion('right')">
                                <span>≡</span> Derecha
                            </button>
                        </div>
                    </div>
                    
                    <!-- Opciones avanzadas -->
                    <div class="texto-form-group">
                        <label class="texto-label">Opciones Avanzadas:</label>
                        <div class="texto-form-row">
                            <div class="texto-form-group">
                                <label class="texto-label-small">Rotación (°):</label>
                                <input type="number" id="textoRotacion" class="texto-input-small" value="0" min="-180" max="180" onchange="TextoUI.actualizarPrevisualizacion()">
                            </div>
                            <div class="texto-form-group">
                                <label class="texto-label-small">Opacidad:</label>
                                <input type="range" id="textoOpacidad" class="texto-slider" min="0" max="1" step="0.1" value="1" oninput="TextoUI.actualizarPrevisualizacion()">
                                <span id="textoOpacidadValor">100%</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Fondo -->
                    <div class="texto-form-group">
                        <label class="texto-checkbox-label">
                            <input type="checkbox" id="textoFondoActivo" onchange="TextoUI.toggleFondo()">
                            Agregar fondo
                        </label>
                        <div id="textoFondoOpciones" style="display: none; margin-top: 10px;">
                            <div class="texto-form-row">
                                <div class="texto-form-group">
                                    <label class="texto-label-small">Color Fondo:</label>
                                    <input type="color" id="textoColorFondo" class="texto-color-input" value="#ffffff" onchange="TextoUI.actualizarPrevisualizacion()">
                                </div>
                                <div class="texto-form-group">
                                    <label class="texto-label-small">Opacidad Fondo:</label>
                                    <input type="range" id="textoOpacidadFondo" class="texto-slider" min="0" max="1" step="0.1" value="0.8" oninput="TextoUI.actualizarPrevisualizacion()">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Previsualización -->
                    <div class="texto-form-group">
                        <label class="texto-label">Previsualización:</label>
                        <div class="texto-previsualizacion" id="textoPrevisualizacion">
                            <span id="textoPreview">Escribe algo para ver la vista previa</span>
                        </div>
                    </div>
                    
                </div>
                
                <div class="texto-modal-footer">
                    <button class="texto-btn-secondary" onclick="TextoUI.cerrar()">Cancelar</button>
                    <button class="texto-btn-primary" onclick="TextoUI.guardar()" id="textoGuardarBtn">
                        <span id="textoGuardarTexto">📌 Agregar al Plano</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.modalElement = modal;
        
        // Configurar eventos
        document.getElementById('textoInput').addEventListener('input', () => this.actualizarPrevisualizacion());
        
        console.log('✅ Modal de texto abierto');
    },
    
    /**
     * Generar opciones de fuentes
     */
    generarOpcionesFuentes() {
        return TextoConfig.fuentes.map(f => 
            `<option value="${f.value}">${f.label}</option>`
        ).join('');
    },
    
    /**
     * Generar opciones de tamaños
     */
    generarOpcionesTamaños() {
        return TextoConfig.tamañosPredefinidos.map(t => 
            `<option value="${t}" ${t === 16 ? 'selected' : ''}>${t}px</option>`
        ).join('');
    },
    
    /**
     * Aplicar estilo predefinido
     */
    aplicarEstilo(nombreEstilo) {
        const estilo = TextoConfig.estilosPredefinidos[nombreEstilo];
        if (!estilo) return;
        
        // Aplicar valores al formulario
        document.getElementById('textoFuente').value = estilo.fuente;
        document.getElementById('textoTamaño').value = estilo.tamaño;
        document.getElementById('textoColor').value = estilo.color;
        
        // Resetear estilos
        document.getElementById('textoNegrita').classList.toggle('active', estilo.negrita || false);
        document.getElementById('textoCursiva').classList.toggle('active', estilo.cursiva || false);
        document.getElementById('textoSubrayado').classList.toggle('active', estilo.subrayado || false);
        
        // Alineación
        this.setAlineacion(estilo.alineacion || 'left');
        
        this.actualizarPrevisualizacion();
        
        if (typeof updateStatus === 'function') {
            updateStatus(`✅ Estilo "${nombreEstilo}" aplicado`);
        }
    },
    
    /**
     * Toggle estilos (negrita, cursiva, subrayado)
     */
    toggleEstilo(tipo) {
        const btn = document.getElementById(`texto${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);
        btn.classList.toggle('active');
        this.actualizarPrevisualizacion();
    },
    
    /**
     * Establecer alineación
     */
    setAlineacion(align) {
        document.querySelectorAll('.texto-alineacion-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.align === align) {
                btn.classList.add('active');
            }
        });
        this.actualizarPrevisualizacion();
    },
    
    /**
     * Toggle fondo
     */
    toggleFondo() {
        const activo = document.getElementById('textoFondoActivo').checked;
        document.getElementById('textoFondoOpciones').style.display = activo ? 'block' : 'none';
        this.actualizarPrevisualizacion();
    },
    
    /**
     * Actualizar previsualización
     */
    actualizarPrevisualizacion() {
        const preview = document.getElementById('textoPreview');
        const texto = document.getElementById('textoInput').value || 'Escribe algo para ver la vista previa';
        
        const config = this.obtenerConfiguracion();
        
        preview.textContent = texto;
        preview.style.fontFamily = config.fuente;
        preview.style.fontSize = config.tamaño + 'px';
        preview.style.color = config.color;
        preview.style.fontWeight = config.negrita ? 'bold' : 'normal';
        preview.style.fontStyle = config.cursiva ? 'italic' : 'normal';
        preview.style.textDecoration = config.subrayado ? 'underline' : 'none';
        preview.style.textAlign = config.alineacion;
        preview.style.opacity = config.opacidad;
        preview.style.transform = `rotate(${config.rotacion}deg)`;
        
        if (config.fondoActivo) {
            preview.style.backgroundColor = config.colorFondo;
            preview.style.padding = '8px 12px';
            preview.style.borderRadius = '4px';
        } else {
            preview.style.backgroundColor = 'transparent';
            preview.style.padding = '0';
        }
        
        // Actualizar valor de opacidad
        document.getElementById('textoOpacidadValor').textContent = Math.round(config.opacidad * 100) + '%';
    },
    
    /**
     * Obtener configuración actual del formulario
     */
    obtenerConfiguracion() {
        const alineacionActiva = document.querySelector('.texto-alineacion-btn.active');
        
        return {
            texto: document.getElementById('textoInput').value,
            fuente: document.getElementById('textoFuente').value,
            tamaño: parseInt(document.getElementById('textoTamaño').value),
            color: document.getElementById('textoColor').value,
            negrita: document.getElementById('textoNegrita').classList.contains('active'),
            cursiva: document.getElementById('textoCursiva').classList.contains('active'),
            subrayado: document.getElementById('textoSubrayado').classList.contains('active'),
            alineacion: alineacionActiva ? alineacionActiva.dataset.align : 'left',
            rotacion: parseInt(document.getElementById('textoRotacion').value) || 0,
            opacidad: parseFloat(document.getElementById('textoOpacidad').value),
            fondoActivo: document.getElementById('textoFondoActivo').checked,
            colorFondo: document.getElementById('textoColorFondo').value,
            opacidadFondo: parseFloat(document.getElementById('textoOpacidadFondo').value)
        };
    },
    
    /**
     * Cargar datos de texto para edición
     */
    cargarDatosTexto(textoObj) {
        const config = textoObj.config;
        
        document.getElementById('textoModalTitulo').textContent = '✏️ Editar Texto';
        document.getElementById('textoGuardarTexto').textContent = '💾 Guardar Cambios';
        
        document.getElementById('textoInput').value = config.texto;
        document.getElementById('textoFuente').value = config.fuente;
        document.getElementById('textoTamaño').value = config.tamaño;
        document.getElementById('textoColor').value = config.color;
        document.getElementById('textoRotacion').value = config.rotacion || 0;
        document.getElementById('textoOpacidad').value = config.opacidad;
        
        document.getElementById('textoNegrita').classList.toggle('active', config.negrita);
        document.getElementById('textoCursiva').classList.toggle('active', config.cursiva);
        document.getElementById('textoSubrayado').classList.toggle('active', config.subrayado);
        
        this.setAlineacion(config.alineacion);
        
        if (config.fondoActivo) {
            document.getElementById('textoFondoActivo').checked = true;
            document.getElementById('textoColorFondo').value = config.colorFondo;
            document.getElementById('textoOpacidadFondo').value = config.opacidadFondo;
            this.toggleFondo();
        }
        
        this.actualizarPrevisualizacion();
    },
    
    /**
     * Guardar texto
     */
    guardar() {
        const config = this.obtenerConfiguracion();
        
        if (!config.texto.trim()) {
            alert('⚠️ Por favor escribe algún texto');
            return;
        }
        
        if (this.modoEdicion && this.textoEditando) {
            // Actualizar texto existente
            TextoCore.actualizarTexto(this.textoEditando, config);
            if (typeof updateStatus === 'function') {
                updateStatus('✅ Texto actualizado');
            }
        } else {
            // Crear nuevo texto
            const plano = document.getElementById('plano');
            const bbox = plano.getBBox();
            config.x = bbox.width / 2;
            config.y = 100;
            
            TextoCore.crearTexto(config);
            if (typeof updateStatus === 'function') {
                updateStatus('✅ Texto agregado al plano');
            }
        }
        
        this.cerrar();
    },
    
    /**
     * Cerrar modal
     */
    cerrar() {
        if (this.modalElement) {
            this.modalElement.style.display = 'none';
        }
    }
};

console.log('✅ UI de texto cargada');
