// ============================================================
// EXPORTADOR PDF - INTERFAZ DE USUARIO
// Modal de configuración de exportación
// ============================================================

/**
 * Crear y mostrar modal de configuración de exportación
 */
function mostrarModalExportacionPDF() {
    // Verificar si ya existe el modal
    let modal = document.getElementById('modalExportacionPDF');
    
    if (!modal) {
        modal = crearModalExportacion();
        document.body.appendChild(modal);
    }
    
    // Mostrar modal
    modal.style.display = 'flex';
    
    // Cargar configuración actual
    cargarConfiguracionActual();
}

/**
 * Crear estructura del modal
 */
function crearModalExportacion() {
    const modal = document.createElement('div');
    modal.id = 'modalExportacionPDF';
    modal.className = 'modal-exportacion-pdf';
    modal.innerHTML = `
        <div class="modal-exportacion-content">
            <div class="modal-exportacion-header">
                <h2>📄 Exportar Plano a PDF</h2>
                <button class="btn-cerrar-modal" onclick="cerrarModalExportacion()">✕</button>
            </div>
            
            <div class="modal-exportacion-body">
                <!-- Presets de calidad -->
                <div class="seccion-export">
                    <h3>⚡ Presets de Calidad</h3>
                    <div class="presets-grid">
                        <button class="preset-btn" onclick="seleccionarPreset('maxima')" data-preset="maxima">
                            <span class="preset-icon">🏆</span>
                            <span class="preset-nombre">Máxima</span>
                            <span class="preset-desc">600 DPI - Impresión profesional</span>
                        </button>
                        <button class="preset-btn active" onclick="seleccionarPreset('alta')" data-preset="alta">
                            <span class="preset-icon">⭐</span>
                            <span class="preset-nombre">Alta</span>
                            <span class="preset-desc">300 DPI - Balance calidad/tamaño</span>
                        </button>
                        <button class="preset-btn" onclick="seleccionarPreset('media')" data-preset="media">
                            <span class="preset-icon">📊</span>
                            <span class="preset-nombre">Media</span>
                            <span class="preset-desc">150 DPI - Visualización</span>
                        </button>
                        <button class="preset-btn" onclick="seleccionarPreset('rapida')" data-preset="rapida">
                            <span class="preset-icon">⚡</span>
                            <span class="preset-nombre">Rápida</span>
                            <span class="preset-desc">96 DPI - Preview rápido</span>
                        </button>
                    </div>
                </div>
                
                <!-- Formato de página -->
                <div class="seccion-export">
                    <h3>📏 Formato de Página</h3>
                    <div class="formato-grid">
                        <label class="formato-option">
                            <input type="radio" name="formato" value="A0" onchange="cambiarFormato('A0')">
                            <span>A0 (1189 × 841 mm)</span>
                        </label>
                        <label class="formato-option active">
                            <input type="radio" name="formato" value="A1" checked onchange="cambiarFormato('A1')">
                            <span>A1 (841 × 594 mm)</span>
                        </label>
                        <label class="formato-option">
                            <input type="radio" name="formato" value="A2" onchange="cambiarFormato('A2')">
                            <span>A2 (594 × 420 mm)</span>
                        </label>
                        <label class="formato-option">
                            <input type="radio" name="formato" value="A3" onchange="cambiarFormato('A3')">
                            <span>A3 (420 × 297 mm)</span>
                        </label>
                    </div>
                </div>
                
                <!-- Elementos a incluir -->
                <div class="seccion-export">
                    <h3>📦 Elementos a Incluir</h3>
                    <div class="elementos-grid">
                        <label class="elemento-checkbox">
                            <input type="checkbox" id="check-plano" checked disabled>
                            <span>⚡ Plano eléctrico (siempre)</span>
                        </label>
                        <label class="elemento-checkbox">
                            <input type="checkbox" id="check-cuadro" checked onchange="toggleElemento('cuadroCargas')">
                            <span>📊 Cuadro de cargas</span>
                        </label>
                        <label class="elemento-checkbox">
                            <input type="checkbox" id="check-tablero" checked onchange="toggleElemento('tableroElectrico')">
                            <span>🔌 Tablero eléctrico</span>
                        </label>
                        <label class="elemento-checkbox">
                            <input type="checkbox" id="check-vineta" checked onchange="toggleElemento('vineta')">
                            <span>📝 Viñeta técnica</span>
                        </label>
                        <label class="elemento-checkbox">
                            <input type="checkbox" id="check-simbologia" checked onchange="toggleElemento('simbologia')">
                            <span>🔣 Simbología</span>
                        </label>
                        <label class="elemento-checkbox">
                            <input type="checkbox" id="check-etiquetas" checked onchange="toggleElemento('etiquetas')">
                            <span>🏷️ Etiquetas</span>
                        </label>
                    </div>
                </div>
                
                <!-- Vista previa de configuración -->
                <div class="seccion-export">
                    <h3>🔍 Vista Previa</h3>
                    <div class="preview-info">
                        <div class="info-item">
                            <span class="info-label">Calidad:</span>
                            <span class="info-value" id="preview-calidad">Alta (300 DPI)</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Formato:</span>
                            <span class="info-value" id="preview-formato">A1 Horizontal</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Tamaño estimado:</span>
                            <span class="info-value" id="preview-tamano">~5-8 MB</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Elementos:</span>
                            <span class="info-value" id="preview-elementos">6 elementos</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-exportacion-footer">
                <button class="btn-cancelar" onclick="cerrarModalExportacion()">
                    Cancelar
                </button>
                <button class="btn-exportar" onclick="ejecutarExportacion()">
                    📄 Exportar a PDF
                </button>
            </div>
        </div>
    `;
    
    return modal;
}

/**
 * Cargar configuración actual en el modal
 */
function cargarConfiguracionActual() {
    const config = obtenerConfiguracionPDF();
    
    // Marcar preset activo
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Marcar formato activo
    const formatoRadio = document.querySelector(`input[name="formato"][value="${config.pagina.formato}"]`);
    if (formatoRadio) {
        formatoRadio.checked = true;
    }
    
    // Actualizar preview
    actualizarPreview();
}

/**
 * Seleccionar preset de calidad
 */
function seleccionarPreset(preset) {
    // Aplicar preset
    aplicarPresetPDF(preset);
    
    // Actualizar UI
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const btnSeleccionado = document.querySelector(`[data-preset="${preset}"]`);
    if (btnSeleccionado) {
        btnSeleccionado.classList.add('active');
    }
    
    // Actualizar preview
    actualizarPreview();
}

/**
 * Cambiar formato de página
 */
function cambiarFormato(formato) {
    const config = obtenerConfiguracionPDF();
    config.pagina.formato = formato;
    actualizarConfiguracionPDF(config);
    actualizarPreview();
}

/**
 * Toggle elemento a incluir
 */
function toggleElemento(elemento) {
    const config = obtenerConfiguracionPDF();
    const checkbox = document.getElementById(`check-${elemento.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}`);
    
    if (checkbox) {
        config.elementos[elemento] = checkbox.checked;
        actualizarConfiguracionPDF(config);
        actualizarPreview();
    }
}

/**
 * Actualizar vista previa
 */
function actualizarPreview() {
    const config = obtenerConfiguracionPDF();
    
    // Actualizar calidad
    const calidadTexto = {
        'maxima': 'Máxima (600 DPI)',
        'alta': 'Alta (300 DPI)',
        'media': 'Media (150 DPI)',
        'rapida': 'Rápida (96 DPI)'
    };
    document.getElementById('preview-calidad').textContent = 
        calidadTexto[config.calidad.modo] || `${config.calidad.dpi} DPI`;
    
    // Actualizar formato
    document.getElementById('preview-formato').textContent = 
        `${config.pagina.formato} ${config.pagina.orientacion === 'landscape' ? 'Horizontal' : 'Vertical'}`;
    
    // Calcular elementos activos
    const elementosActivos = Object.values(config.elementos).filter(v => v === true).length;
    document.getElementById('preview-elementos').textContent = `${elementosActivos} elementos`;
    
    // Estimar tamaño
    const tamanoEstimado = {
        'maxima': '15-25 MB',
        'alta': '5-8 MB',
        'media': '2-4 MB',
        'rapida': '1-2 MB'
    };
    document.getElementById('preview-tamano').textContent = 
        tamanoEstimado[config.calidad.modo] || '~5 MB';
}

/**
 * Ejecutar exportación
 */
async function ejecutarExportacion() {
    // Cerrar modal
    cerrarModalExportacion();
    
    // Mostrar indicador de progreso
    mostrarIndicadorProgreso();
    
    try {
        // Ejecutar exportación
        await exportarPlanoAPDF();
        
        // Ocultar indicador
        ocultarIndicadorProgreso();
        
        // Mostrar mensaje de éxito
        mostrarMensajeExito();
        
    } catch (error) {
        ocultarIndicadorProgreso();
        alert('Error al exportar: ' + error.message);
    }
}

/**
 * Mostrar indicador de progreso
 */
function mostrarIndicadorProgreso() {
    let indicador = document.getElementById('indicadorExportacion');
    
    if (!indicador) {
        indicador = document.createElement('div');
        indicador.id = 'indicadorExportacion';
        indicador.className = 'indicador-exportacion';
        indicador.innerHTML = `
            <div class="indicador-content">
                <div class="spinner-export"></div>
                <p>Generando PDF de alta calidad...</p>
                <p class="indicador-subtexto">Esto puede tomar unos segundos</p>
            </div>
        `;
        document.body.appendChild(indicador);
    }
    
    indicador.style.display = 'flex';
}

/**
 * Ocultar indicador de progreso
 */
function ocultarIndicadorProgreso() {
    const indicador = document.getElementById('indicadorExportacion');
    if (indicador) {
        indicador.style.display = 'none';
    }
}

/**
 * Mostrar mensaje de éxito
 */
function mostrarMensajeExito() {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-exito-export';
    mensaje.innerHTML = `
        <div class="mensaje-exito-content">
            <span class="icono-exito">✅</span>
            <p>PDF exportado correctamente</p>
        </div>
    `;
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}

/**
 * Cerrar modal de exportación
 */
function cerrarModalExportacion() {
    const modal = document.getElementById('modalExportacionPDF');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Exportar funciones
window.mostrarModalExportacionPDF = mostrarModalExportacionPDF;
window.cerrarModalExportacion = cerrarModalExportacion;
window.seleccionarPreset = seleccionarPreset;
window.cambiarFormato = cambiarFormato;
window.toggleElemento = toggleElemento;
window.ejecutarExportacion = ejecutarExportacion;

console.log('🎨 Interfaz de exportación PDF cargada');
