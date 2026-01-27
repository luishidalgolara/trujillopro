/**
 * ============================================
 * ASISTENTE RIDAA - INTERFAZ UI
 * Sistema de chat con navegación por historial (flecha atrás)
 * ============================================
 */

const AsistenteUI = {
    ventana: null,
    botonFlotante: null,
    backdrop: null,
    mensajesContainer: null,
    inputField: null,
    isOpen: false,
    
    // Sistema de historial de navegación
    historialNavegacion: [],
    estadoActual: null,

    init() {
        this.crearBackdrop();
        this.crearBotonFlotante();
        this.crearVentana();
        this.attachEvents();
        console.log('✅ Asistente RIDAA UI inicializado');
    },

    crearBackdrop() {
        const backdrop = document.createElement('div');
        backdrop.className = 'asistente-backdrop';
        backdrop.id = 'asistenteBackdrop';
        document.body.appendChild(backdrop);
        this.backdrop = backdrop;
    },

    crearBotonFlotante() {
        const btn = document.createElement('button');
        btn.className = 'asistente-btn-flotante';
        btn.innerHTML = '<span class="asistente-robot-icon">🤖</span>';
        btn.setAttribute('aria-label', 'Abrir Asistente RIDAA');
        
        document.body.appendChild(btn);
        this.botonFlotante = btn;
    },

    crearVentana() {
        const ventana = document.createElement('div');
        ventana.className = 'asistente-ventana';
        ventana.innerHTML = `
            <div class="asistente-header">
                <button class="asistente-back-btn" id="btnAtrasAsistente" style="display: none;">
                    ← Atrás
                </button>
                <div class="asistente-header-info">
                    <div class="asistente-avatar">🤖</div>
                    <div>
                        <p class="asistente-title">Asistente RIDAA</p>
                        <p class="asistente-status">En línea • 135 preguntas disponibles</p>
                    </div>
                </div>
                <button class="asistente-close-btn" aria-label="Cerrar">✕</button>
            </div>
            
            <div class="asistente-mensajes" id="asistenteMessages">
                <div class="asistente-bienvenida">
                    <div class="asistente-bienvenida-icono">🤖</div>
                    <h3 class="asistente-bienvenida-titulo">¡Hola! Soy el Asistente RIDAA</h3>
                    <p class="asistente-bienvenida-texto">
                        Estoy aquí para ayudarte con el Reglamento de Instalaciones Domiciliarias de Agua Potable y Alcantarillado.
                        <br><br>
                        Selecciona una categoría o escribe tu consulta:
                    </p>
                    <div id="categoriasContainer"></div>
                </div>
            </div>
            
            <div class="asistente-escribiendo" id="asistenteEscribiendo">
                <div class="asistente-mensaje-avatar" style="background: linear-gradient(135deg, #00bcd4 0%, #0097a7 100%);">🤖</div>
                <div class="asistente-escribiendo-puntos">
                    <div class="asistente-escribiendo-punto"></div>
                    <div class="asistente-escribiendo-punto"></div>
                    <div class="asistente-escribiendo-punto"></div>
                </div>
            </div>
            
            <div class="asistente-input-area">
                <input 
                    type="text" 
                    class="asistente-input" 
                    id="asistenteInput"
                    placeholder="Escribe tu pregunta aquí..."
                    maxlength="500"
                />
                <button class="asistente-enviar-btn" id="asistenteEnviar" aria-label="Enviar">
                    ➤
                </button>
            </div>
        `;

        document.body.appendChild(ventana);
        this.ventana = ventana;
        this.mensajesContainer = document.getElementById('asistenteMessages');
        this.inputField = document.getElementById('asistenteInput');
    },

    attachEvents() {
        // Botón flotante
        this.botonFlotante.addEventListener('click', () => {
            this.toggle();
        });

        // Backdrop
        this.backdrop.addEventListener('click', () => {
            this.cerrar();
        });

        // Botón cerrar
        const closeBtn = this.ventana.querySelector('.asistente-close-btn');
        closeBtn.addEventListener('click', () => {
            this.cerrar();
        });

        // Botón ATRÁS
        const backBtn = document.getElementById('btnAtrasAsistente');
        backBtn.addEventListener('click', () => {
            this.volverAtras();
        });

        // Input
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.enviarMensaje();
            }
        });

        // Botón enviar
        const enviarBtn = document.getElementById('asistenteEnviar');
        enviarBtn.addEventListener('click', () => {
            this.enviarMensaje();
        });

        // ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.cerrar();
            }
        });
    },

    toggle() {
        if (this.isOpen) {
            this.cerrar();
        } else {
            this.abrir();
        }
    },

    abrir() {
        this.ventana.classList.add('active');
        this.backdrop.classList.add('active');
        this.botonFlotante.classList.add('active');
        this.isOpen = true;
        this.inputField.focus();
        
        // Resetear historial al abrir
        this.historialNavegacion = [];
        this.estadoActual = 'menu-principal';
        this.actualizarBotonAtras();
        
        this.cargarCategorias();
        
        console.log('🤖 Asistente RIDAA abierto');
    },

    cerrar() {
        this.ventana.classList.remove('active');
        this.backdrop.classList.remove('active');
        this.botonFlotante.classList.remove('active');
        this.isOpen = false;
        console.log('🤖 Asistente RIDAA cerrado');
    },

    // Sistema de navegación con historial
    guardarEstadoActual() {
        if (this.estadoActual) {
            this.historialNavegacion.push(this.estadoActual);
            console.log('✅ Estado guardado:', this.estadoActual, '| Historial:', this.historialNavegacion.length, 'niveles');
            this.actualizarBotonAtras();
        }
    },

    volverAtras() {
        if (this.historialNavegacion.length === 0) {
            console.log('⚠️ No hay historial para volver');
            return;
        }

        const estadoAnterior = this.historialNavegacion.pop();
        this.estadoActual = estadoAnterior;
        console.log('⬅️ Volviendo a:', estadoAnterior, '| Quedan:', this.historialNavegacion.length, 'niveles');
        this.actualizarBotonAtras();

        // Limpiar mensajes
        this.mensajesContainer.innerHTML = '';

        // Restaurar estado anterior
        if (estadoAnterior === 'menu-principal') {
            this.mostrarMenuPrincipal();
        } else if (estadoAnterior.startsWith('categoria-')) {
            const categoriaId = estadoAnterior.replace('categoria-', '');
            this.mostrarPreguntasDeCategoria(categoriaId, true);
        }
    },

    actualizarBotonAtras() {
        const backBtn = document.getElementById('btnAtrasAsistente');
        const mostrar = this.historialNavegacion.length > 0;
        console.log('🔄 Botón atrás:', mostrar ? 'VISIBLE' : 'OCULTO', '| Historial:', this.historialNavegacion.length);
        
        if (mostrar) {
            backBtn.style.display = 'flex';
        } else {
            backBtn.style.display = 'none';
        }
    },

    mostrarMenuPrincipal() {
        this.mensajesContainer.innerHTML = `
            <div class="asistente-bienvenida">
                <div class="asistente-bienvenida-icono">🤖</div>
                <h3 class="asistente-bienvenida-titulo">¡Hola! Soy el Asistente RIDAA</h3>
                <p class="asistente-bienvenida-texto">
                    Estoy aquí para ayudarte con el Reglamento de Instalaciones Domiciliarias de Agua Potable y Alcantarillado.
                    <br><br>
                    Selecciona una categoría o escribe tu consulta:
                </p>
                <div id="categoriasContainer"></div>
            </div>
        `;
        
        const container = document.getElementById('categoriasContainer');
        if (container) {
            container.dataset.loaded = '';
            this.cargarCategorias();
        }
    },

    cargarCategorias() {
        const container = document.getElementById('categoriasContainer');
        if (!container || container.dataset.loaded) return;

        const categorias = AsistenteCore.obtenerCategorias();
        
        if (categorias.length === 0) {
            console.warn('⚠️ No hay categorías disponibles');
            return;
        }

        let html = '<div class="categorias-titulo">📚 Categorías:</div>';
        html += '<div class="categorias-grid">';
        
        categorias.forEach(categoria => {
            html += `
                <button class="categoria-btn" data-categoria-id="${categoria.id}">
                    <span class="categoria-icono">${categoria.icono}</span>
                    <span class="categoria-nombre">${categoria.nombre}</span>
                    <span class="categoria-cantidad">${categoria.preguntas.length} preguntas</span>
                </button>
            `;
        });
        
        html += '</div>';
        
        container.innerHTML = html;
        container.dataset.loaded = 'true';

        container.querySelectorAll('.categoria-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const categoriaId = e.currentTarget.dataset.categoriaId;
                // CRÍTICO: Guardar estado ANTES de avanzar
                this.guardarEstadoActual();
                this.estadoActual = `categoria-${categoriaId}`;
                this.actualizarBotonAtras();
                this.mostrarPreguntasDeCategoria(categoriaId);
            });
        });
    },

    mostrarPreguntasDeCategoria(categoriaId, sinMensajeUsuario = false) {
        const categorias = AsistenteCore.obtenerCategorias();
        const categoria = categorias.find(cat => cat.id === categoriaId);
        
        if (!categoria) return;

        if (!sinMensajeUsuario) {
            this.agregarMensaje(`📚 Seleccionaste: **${categoria.nombre}**`, 'usuario');
        }

        setTimeout(() => {
            let mensaje = `${categoria.icono} **${categoria.nombre}**\n\n${categoria.descripcion}\n\n`;
            mensaje += `**${categoria.preguntas.length} preguntas disponibles:**`;
            this.agregarMensaje(mensaje, 'asistente');

            setTimeout(() => {
                this.agregarBotonesPreguntas(categoria.preguntas);
            }, 300);
        }, sinMensajeUsuario ? 0 : 500);
    },

    agregarBotonesPreguntas(preguntas) {
        const botonesContainer = document.createElement('div');
        botonesContainer.className = 'asistente-mensaje asistente';
        
        let html = '<div class="asistente-mensaje-avatar">🤖</div>';
        html += '<div class="preguntas-botones-container">';
        
        preguntas.forEach(faq => {
            html += `
                <button class="pregunta-btn" data-pregunta-id="${faq.id}">
                    ${faq.pregunta}
                </button>
            `;
        });
        
        html += '</div>';
        
        botonesContainer.innerHTML = html;
        this.mensajesContainer.appendChild(botonesContainer);
        
        botonesContainer.querySelectorAll('.pregunta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preguntaId = e.target.dataset.preguntaId;
                // CRÍTICO: Guardar estado ANTES de avanzar
                this.guardarEstadoActual();
                this.estadoActual = `pregunta-${preguntaId}`;
                this.actualizarBotonAtras();
                this.seleccionarPregunta(preguntaId);
            });
        });
        
        this.scrollToBottom();
    },

    seleccionarPregunta(preguntaId) {
        const faq = AsistenteCore.buscarPreguntaPorId(preguntaId);
        
        if (!faq) return;

        this.agregarMensaje(faq.pregunta, 'usuario');

        this.mostrarEscribiendo();

        setTimeout(() => {
            this.ocultarEscribiendo();
            AsistenteCore.procesarPreguntaSeleccionada(preguntaId);
        }, 800);
    },

    mostrarOpcionesPostRespuesta() {
        const preguntas = AsistenteCore.obtenerTodasLasPreguntas();
        const preguntasAleatorias = this.obtenerPreguntasAleatorias(preguntas, 3);
        
        const botonesContainer = document.createElement('div');
        botonesContainer.className = 'asistente-mensaje asistente';
        
        let html = '<div class="asistente-mensaje-avatar">🤖</div>';
        html += '<div class="opciones-post-respuesta">';
        html += '<div class="opciones-titulo">¿Quieres saber más?</div>';
        
        preguntasAleatorias.forEach(faq => {
            html += `
                <button class="pregunta-btn-small" data-pregunta-id="${faq.id}">
                    ${faq.pregunta}
                </button>
            `;
        });
        
        html += '</div>';
        
        botonesContainer.innerHTML = html;
        this.mensajesContainer.appendChild(botonesContainer);
        
        botonesContainer.querySelectorAll('.pregunta-btn-small').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preguntaId = e.target.dataset.preguntaId;
                // CRÍTICO: Guardar estado ANTES de avanzar
                this.guardarEstadoActual();
                this.estadoActual = `pregunta-${preguntaId}`;
                this.actualizarBotonAtras();
                this.seleccionarPregunta(preguntaId);
            });
        });
        
        this.scrollToBottom();
    },

    obtenerPreguntasAleatorias(array, cantidad) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, cantidad);
    },

    enviarMensaje() {
        const texto = this.inputField.value.trim();
        
        if (!texto) return;

        this.agregarMensaje(texto, 'usuario');
        this.inputField.value = '';
        
        // CRÍTICO: Guardar estado ANTES de avanzar
        this.guardarEstadoActual();
        this.estadoActual = 'busqueda-libre';
        this.actualizarBotonAtras();
        
        this.mostrarEscribiendo();
        
        setTimeout(() => {
            this.ocultarEscribiendo();
            AsistenteCore.procesarPregunta(texto);
        }, 1000);
    },

    agregarMensaje(texto, tipo = 'asistente') {
        const bienvenida = this.mensajesContainer.querySelector('.asistente-bienvenida');
        if (bienvenida) {
            bienvenida.remove();
        }

        const mensaje = document.createElement('div');
        mensaje.className = `asistente-mensaje ${tipo}`;
        
        const hora = new Date().toLocaleTimeString('es-CL', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const avatar = tipo === 'usuario' ? '👤' : '🤖';
        
        const textoFormateado = texto.replace(/\n/g, '<br>');
        
        mensaje.innerHTML = `
            <div class="asistente-mensaje-avatar">${avatar}</div>
            <div>
                <div class="asistente-mensaje-contenido">${textoFormateado}</div>
                <div class="asistente-mensaje-hora">${hora}</div>
            </div>
        `;

        this.mensajesContainer.appendChild(mensaje);
        this.scrollToBottom();
    },

    mostrarEscribiendo() {
        const indicador = document.getElementById('asistenteEscribiendo');
        indicador.classList.add('active');
        this.scrollToBottom();
    },

    ocultarEscribiendo() {
        const indicador = document.getElementById('asistenteEscribiendo');
        indicador.classList.remove('active');
    },

    scrollToBottom() {
        setTimeout(() => {
            this.mensajesContainer.scrollTop = this.mensajesContainer.scrollHeight;
        }, 100);
    }
};

window.AsistenteUI = AsistenteUI;