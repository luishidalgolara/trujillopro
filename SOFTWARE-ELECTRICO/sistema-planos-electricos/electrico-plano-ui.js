/**
 * Interfaz de usuario para el sistema de planos eléctricos
 * Maneja la barra inferior con miniaturas de planos
 */
const PlanoElectricoUI = {
    contenedor: null,
    colapsado: false,
    
    // ========================================
    // INICIALIZAR UI
    // ========================================
    init() {
        this.crearContenedor();
        this.crearBotonMostrar();
        this.adjuntarAtajosTeclado();
        this.actualizar();
    },
    
    // ========================================
    // CREAR CONTENEDOR PRINCIPAL
    // ========================================
    crearContenedor() {
        if (this.contenedor) return;
        
        this.contenedor = document.createElement('div');
        this.contenedor.className = 'planos-electricos-container';
        this.contenedor.innerHTML = `
            <div class="planos-electricos-header">
                <div class="planos-electricos-titulo">⚡ PLANOS ELÉCTRICOS DEL PROYECTO</div>
                <div class="planos-electricos-acciones">
                    <button class="btn-colapsar-planos" onclick="PlanoElectricoUI.toggleColapsar()">
                        <span id="collapseIcon">⬇️</span>
                        <span id="collapseText">Ocultar</span>
                    </button>
                    <button class="btn-agregar-plano-electrico" onclick="PlanoElectricoManager.crearPlano()">
                        ➕ AGREGAR PLANO
                    </button>
                    <button class="btn-exportar-planos" onclick="PlanoElectricoManager.exportarTodosLosPlanos()" title="Exportar todos los planos">
                        💾 Exportar
                    </button>
                </div>
            </div>
            <div class="planos-electricos-contenido" id="planosElectricosContenido"></div>
        `;
        
        document.body.appendChild(this.contenedor);
    },
    
    // ========================================
    // CREAR BOTÓN FLOTANTE PARA MOSTRAR
    // ========================================
    crearBotonMostrar() {
        const botonMostrar = document.createElement('button');
        botonMostrar.className = 'btn-mostrar-planos-electricos';
        botonMostrar.id = 'btnMostrarPlanosElectricos';
        botonMostrar.innerHTML = `
            <span>⬆️</span>
            <span>Mostrar Planos</span>
        `;
        botonMostrar.onclick = () => this.toggleColapsar();
        
        document.body.appendChild(botonMostrar);
    },
    
    // ========================================
    // TOGGLE COLAPSAR/EXPANDIR
    // ========================================
    toggleColapsar() {
        this.colapsado = !this.colapsado;
        
        const contenedor = this.contenedor;
        const botonMostrar = document.getElementById('btnMostrarPlanosElectricos');
        const collapseIcon = document.getElementById('collapseIcon');
        const collapseText = document.getElementById('collapseText');
        
        if (this.colapsado) {
            // Ocultar barra de planos
            contenedor.classList.add('colapsado');
            botonMostrar.classList.add('visible');
            console.log('📦 Barra de planos ocultada');
        } else {
            // Mostrar barra de planos
            contenedor.classList.remove('colapsado');
            botonMostrar.classList.remove('visible');
            collapseIcon.textContent = '⬇️';
            collapseText.textContent = 'Ocultar';
            console.log('📂 Barra de planos mostrada');
        }
    },
    
    // ========================================
    // ADJUNTAR ATAJOS DE TECLADO
    // ========================================
    adjuntarAtajosTeclado() {
        document.addEventListener('keydown', (e) => {
            // Tecla P para toggle (solo si no está escribiendo)
            if (e.key === 'p' || e.key === 'P') {
                const activeElement = document.activeElement;
                const estaEscribiendo = activeElement.tagName === 'INPUT' || 
                                       activeElement.tagName === 'TEXTAREA' ||
                                       activeElement.isContentEditable;
                
                if (!estaEscribiendo) {
                    e.preventDefault();
                    this.toggleColapsar();
                }
            }
        });
        
        console.log('⌨️ Atajo de teclado: Presiona "P" para ocultar/mostrar planos');
    },
    
    // ========================================
    // ACTUALIZAR (REFRESCAR) MINIATURAS
    // ========================================
    actualizar() {
        const contenido = document.getElementById('planosElectricosContenido');
        if (!contenido) return;
        
        contenido.innerHTML = '';
        
        const planos = PlanoElectricoState.getTodosLosPlanos();
        planos.forEach((plano, index) => {
            const miniatura = this.crearMiniatura(plano, index);
            contenido.appendChild(miniatura);
        });
    },
    
    // ========================================
    // CREAR MINIATURA INDIVIDUAL
    // ========================================
    crearMiniatura(plano, index) {
        const miniatura = document.createElement('div');
        miniatura.className = 'plano-electrico-miniatura';
        miniatura.setAttribute('data-index', index + 1);
        
        if (index === PlanoElectricoState.planoActivoIndex) {
            miniatura.classList.add('activo');
        }
        
        miniatura.innerHTML = `
            <div class="plano-electrico-acciones">
                <button class="plano-electrico-btn duplicar" title="Duplicar" onclick="event.stopPropagation(); PlanoElectricoManager.duplicarPlano(${index})">📋</button>
                <button class="plano-electrico-btn renombrar" title="Renombrar" onclick="event.stopPropagation(); PlanoElectricoUI.renombrarPlano(${index})">✏️</button>
                <button class="plano-electrico-btn eliminar" title="Eliminar" onclick="event.stopPropagation(); PlanoElectricoManager.eliminarPlano(${index})">🗑️</button>
            </div>
            <div class="plano-electrico-preview" id="preview-${index}">
                <div class="cargando-preview">Cargando...</div>
            </div>
            <div class="plano-electrico-nombre">${plano.nombre}</div>
            <div class="plano-electrico-info">
                <span class="formato-badge">${plano.formato}</span>
                <span class="escala-badge">${plano.escala}</span>
            </div>
        `;
        
        miniatura.addEventListener('click', () => {
            PlanoElectricoManager.cambiarAPlano(index);
        });
        
        // Actualizar preview después de un pequeño delay
        setTimeout(() => {
            this.actualizarPreviewMiniatura(index, plano);
        }, 100);
        
        return miniatura;
    },
    
    // ========================================
    // ACTUALIZAR PREVIEW DE MINIATURA
    // ========================================
    actualizarPreviewMiniatura(index, plano) {
        const preview = document.getElementById(`preview-${index}`);
        if (!preview) return;
        
        try {
            if (plano.svgInnerHTML && plano.svgInnerHTML.length > 0) {
                // Crear SVG temporal para el preview
                const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                
                // Configurar viewBox según formato
                if (plano.formato === 'A1') {
                    tempSvg.setAttribute('viewBox', '0 0 841 594');
                } else {
                    tempSvg.setAttribute('viewBox', '0 0 1189 841');
                }
                
                tempSvg.setAttribute('width', '100%');
                tempSvg.setAttribute('height', '100%');
                tempSvg.innerHTML = plano.svgInnerHTML;
                
                preview.innerHTML = '';
                preview.appendChild(tempSvg);
            } else {
                preview.innerHTML = '<div class="plano-vacio">⚡<br>Plano vacío</div>';
            }
        } catch (error) {
            console.warn(`⚠️ Error al generar preview del plano ${index}:`, error);
            preview.innerHTML = '<div class="plano-vacio">❌<br>Error preview</div>';
        }
    },
    
    // ========================================
    // RENOMBRAR PLANO
    // ========================================
    renombrarPlano(index) {
        const plano = PlanoElectricoState.getTodosLosPlanos()[index];
        if (!plano) return;
        
        const nuevoNombre = prompt('Nuevo nombre para el plano:', plano.nombre);
        if (nuevoNombre && nuevoNombre.trim()) {
            PlanoElectricoManager.renombrarPlano(index, nuevoNombre);
        }
    },
    
    // ========================================
    // ACTUALIZAR INDICADOR DE PLANO ACTIVO
    // ========================================
    actualizarIndicadorActivo(indexActivo) {
        const miniaturas = document.querySelectorAll('.plano-electrico-miniatura');
        miniaturas.forEach((miniatura, index) => {
            if (index === indexActivo) {
                miniatura.classList.add('activo');
            } else {
                miniatura.classList.remove('activo');
            }
        });
    }
};

// Exportar para uso global
window.PlanoElectricoUI = PlanoElectricoUI;

console.log('✅ PlanoElectricoUI cargado');
