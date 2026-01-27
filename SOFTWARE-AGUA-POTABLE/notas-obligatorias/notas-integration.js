/* ========================================
   SISTEMA NOTAS OBLIGATORIAS - INTEGRACIÓN
   ======================================== */

const TEXTO_NOTAS_COMPLETO = `I.— LAS CAÑERÍAS DESDE LA PIEZA N°6 HASTA LA PIEZA N°11 DEL VARAL DE SUBIDA, DEBERÁN SER DE COBRE DE DIÁMETRO IGUAL AL DIÁMETRO DEL ARRANQUE. PARA EL CASO QUE EL DIÁMETRO DEL MAP SEA MENOR QUE LA TUBERÍA DEL ARRANQUE SE DEBERÁ CONSIDERAR CODO CON REDUCCIÓN
II.— EN ATRAVIESO BAJO CALZADA SE EXIGIRÁ ENCAMISADO DE CAÑERÍA PVC CLASE 4 Ó SANITARIO DE DIÁMETRO IGUAL AL DOBLE DE LA CAÑERÍA DEL ARRANQUE COMO MÍNIMO LO QUE ESTÉ ENCALCCE Ó NORMA CHILENA NCh 399 Y NCh 2252. SE DEBERÁ SELLAR Ó RELLENAR ESTE ENCAMISADO EN LOS EXTREMOS DE LA TUBERÍA CON AISLAPOL PARA EVITAR EL INGRESO DE ARENA Ó TIERRA Y FACILITAR EL RETIRO DE LA CAÑERÍA EN CASO DE REEMPLAZO.
III.— LA DISTANCIA MÁXIMA ENTRE LA TUBERÍA DE LA RED DE DISTRIBUCIÓN Y LA LÍNEA OFICIAL DE LA PROPIEDAD SERÁ DE 20m, SALVO EN CASOS EXCEPCIONALES QUE SERÁN DEFINIDOS POR ESSBIO S.A. Y NUEVOSUR S.A.
IV.— EN SUELOS AGRESIVOS APROBADOS POR ESSBIO S.A. Y NUEVOSUR S.A. EXIGIRÁ UNA PROTECCIÓN ANTICORROSIVA EPÓXICA EN LOS PERNOS DEL COLLARÍN (CASO Fe Fdo.)
V.— SE DEBEN REALIZAR LOS TRABAJOS NECESARIOS PARA DEJAR HABILITADAS LAS CALLES, CAMINOS Y BERMAS, QUE DEBERÁN QUEDAR EN LAS MISMAS CONDICIONES QUE TENÍAN ANTES DE COMENZAR LOS TRABAJOS
VI.— EL RADIER DE LA BASE DEL NICHO SERÁ DE HORMIGÓN DE 170 Kg–cem/m3, CON UN ESPESOR MÍNIMO DE 5cm.
VII.— EN CASO QUE EL ARRANQUE DOMICILIARIO DEBA CRUZAR ALGÚN CURSO DE AGUA, SE DEBERÁ PROTEGER LA CAÑERÍA MEDIANTE UNA TUBERÍA DE ACERO GALVANIZADO DE DIÁMETRO IGUAL AL DOBLE DE LA CAÑERÍA COMO MÍNIMO
VIII.— LA INSTALACIÓN DEL ARRANQUE DEBE CUMPLIR CON LA NCh 2459 Y 2836
IX.— PARA MEDIDOR DE 13mm (½") PODRÁ EJECUTAR EL ARRANQUE CON CAÑERÍA DE 13mm DE DIÁMETRO, SIEMPRE QUE CUMPLA CON EL PUNTO 7.2.1. DE LA NCh 691 OF 98.
X.— NO SE PERMITE LLAVE DE JARDÍN EN VARAL DE SALIDA DEL MEDIDOR NI DENTRO DEL NICHO, ESTA DEBERÁ TENER UN DIÁMETRO IGUAL AL MAP (NCh 2836)
XI.— LA MARCA DEL MEDIDOR DEBERÁ CUMPLIR CON LA NCh 1730 MÍNIMO CLASE B, CON CÚPULA DE VIDRIO, TRANSMISIÓN MAGNÉTICA, HERMÉTICO Y ROSCAS DIFERENCIADAS.
XII.— CUANDO EL DIÁMETRO DEL ARRANQUE SEA MAYOR A 1/3 DEL DIÁMETRO DE LA TUBERÍA DE LA RED DE DISTRIBUCIÓN, SE DEBE PROYECTAR UN NUDO DE CONEXIÓN APROBADO POR ESSBIO S.A. Y NUEVOSUR S.A. (EN EL CASO QUE EXISTAN ATRAVIESOS SE DEBE CONSIDERAR LLAVE COLLAR)
XIII.— SE DEBE CONSIDERAR DISTANCIA MÍNIMA DESDE LA LÍNEA DE CIERRE HACIA VEREDA 30 CM PARA CAMBIO DE MATERIAL EN ZONA DE ARRANQUE. (VER CUADRO DE PIEZA N°7). ESTA DISTANCIA MÍNIMA NO SE CONSIDERA PARA LOS ARRANQUES CON ATRAVIESOS, LO CUAL SE MANTIENE 80 CM, COMO SE MUESTRA EN DETALLES.
XIV.— TODO CAMBIO DE DIRECCIÓN DEBERÁ CONSIDERAR LAS CORRESPONDIENTES PIEZAS ESPECIALES
XV.— EL NICHO DEL MAP DEBERÁ SER PARALELO A LA LÍNEA DE CIERRE EN SU MAYOR LONGITUD
XVI.— EN EL SECTOR MEDIDOR, LOS DIÁMETROS DE LAS TUBERÍAS UBICADAS ANTES Y DESPUÉS DEL MEDIDOR DEBERÁN SER IGUALES A LO MENOS EN UNA EXTENSIÓN DE 5 DIÁMETROS, O DE ACUERDO A LAS ESPECIFICACIONES DEL FABRICANTE, SEGÚN ARTÍCULO 52° LETRA c.c. DEL REGLAMENTO DE INSTALACIONES DOMICILIARIAS DE AGUA POTABLE Y ALCANTARILLADO.`;

// ========================================
// ABRIR MODAL
// ========================================
function abrirNotasObligatorias() {
    const existingModal = document.getElementById('modalNotasObligatorias');
    if (existingModal) existingModal.remove();
    
    const modalHTML = `
        <div class="modal-notas active" id="modalNotasObligatorias">
            <div class="ventana-notas">
                <div class="modal-notas-header">
                    <div class="modal-notas-title">📋 NOTAS OBLIGATORIAS - ESSBIO / NUEVOSUR</div>
                    <div class="modal-notas-controls">
                        <button class="btn-modal-notas" onclick="integrarNotasAlPlano()" title="Integrar al plano">
                            📌 INTEGRAR AL PLANO
                        </button>
                    </div>
                    <div class="modal-notas-buttons">
                        <button class="btn-modal-notas close" onclick="cerrarNotasObligatorias()">✕</button>
                    </div>
                </div>
                <div class="modal-notas-content">
                    <div class="notas-documento">
                        <div class="notas-titulo">NOTAS:</div>
                        <div class="notas-texto-completo" id="contenidoNotasCompleto"></div>
                    </div>
                </div>
                <div class="notas-footer">
                    <button class="btn-exportar-notas" onclick="exportarNotasTexto()">
                        📥 Exportar a Texto
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    generarContenidoNotas();
}

// ========================================
// CERRAR MODAL
// ========================================
function cerrarNotasObligatorias() {
    const modal = document.getElementById('modalNotasObligatorias');
    if (modal) modal.remove();
}

// ========================================
// GENERAR CONTENIDO
// ========================================
function generarContenidoNotas() {
    const contenedor = document.getElementById('contenidoNotasCompleto');
    if (contenedor) {
        contenedor.textContent = TEXTO_NOTAS_COMPLETO;
    }
}

// ========================================
// INTEGRAR AL PLANO
// ========================================
function integrarNotasAlPlano() {
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (!drawingBoard) {
        alert('❌ Error: No se encontró el área de dibujo');
        return;
    }
    
    // CREAR WRAPPER
    const wrapper = document.createElement('div');
    wrapper.className = 'notas-integradas';
    wrapper.style.cssText = `
        position: absolute;
        left: 50px;
        top: 50px;
        width: 900px;
        cursor: move;
        z-index: 50;
        border: 3px solid #d35400;
        background: white;
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        transform-origin: top left;
        transform: scale(1);
        pointer-events: auto;
    `;
    wrapper.dataset.bloqueado = 'false';
    wrapper.dataset.escala = '1';
    
    // INYECTAR ESTILOS
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .notas-integradas * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        .notas-integradas .notas-contenedor {
            background: white;
            padding: 30px;
            font-family: 'Courier New', monospace;
        }
        
        .notas-integradas .notas-titulo {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 3px solid #2c3e50;
            color: #2c3e50 !important;
            text-decoration: underline;
        }
        
        .notas-integradas .notas-texto {
            color: #2c3e50 !important;
            font-size: 13px;
            text-align: justify;
            white-space: pre-line;
            line-height: 1.5;
            font-weight: 500 !important;
        }
    `;
    
    // CREAR CONTENIDO
    const contenedor = document.createElement('div');
    contenedor.className = 'notas-contenedor';
    contenedor.innerHTML = `
        <div class="notas-titulo">NOTAS:</div>
        <div class="notas-texto">${TEXTO_NOTAS_COMPLETO}</div>
    `;
    
    // FORZAR ESTILOS DIRECTOS
    const titulo = contenedor.querySelector('.notas-titulo');
    if (titulo) {
        titulo.style.cssText = `
            color: #2c3e50 !important;
            font-weight: bold !important;
            font-size: 18px !important;
            text-decoration: underline;
            border-bottom: 3px solid #2c3e50;
            padding-bottom: 12px;
            margin-bottom: 20px;
        `;
    }
    
    const texto = contenedor.querySelector('.notas-texto');
    if (texto) {
        texto.style.cssText = `
            color: #2c3e50 !important;
            font-weight: 500 !important;
            font-size: 13px;
            line-height: 1.5;
            white-space: pre-line;
            text-align: justify;
        `;
    }
    
    // CONTROLES FLOTANTES
    const controlsDiv = document.createElement('div');
    controlsDiv.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: #d35400;
        padding: 6px;
        border-radius: 6px;
        display: flex;
        gap: 6px;
        z-index: 100;
        pointer-events: auto;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    controlsDiv.innerHTML = `
        <button style="background: white; color: #d35400; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="cambiarTamanoNotas(this, 1.2)" title="Aumentar">🔍+</button>
        <button style="background: white; color: #d35400; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="cambiarTamanoNotas(this, 0.8)" title="Reducir">🔍-</button>
        <button style="background: white; color: #d35400; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="resetTamanoNotas(this)" title="Restaurar">↺</button>
        <button class="btn-bloqueo" style="background: white; color: #d35400; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="bloquearNotas(this)" title="Bloquear">🔓</button>
        <button style="background: #e74c3c; color: white; border: none; cursor: pointer; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px;" onclick="eliminarNotas(this)" title="Eliminar">🗑️</button>
    `;
    
    wrapper.appendChild(styleTag);
    wrapper.appendChild(controlsDiv);
    wrapper.appendChild(contenedor);
    
    // SISTEMA DE ARRASTRE
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    
    wrapper.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'BUTTON') return;
        if (wrapper.dataset.bloqueado === 'true') return;
        
        isDragging = true;
        
        const rect = wrapper.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        wrapper.style.cursor = 'grabbing';
        e.preventDefault();
        e.stopPropagation();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        const parentRect = drawingBoard.getBoundingClientRect();
        let newLeft = e.clientX - parentRect.left - offsetX;
        let newTop = e.clientY - parentRect.top - offsetY;
        
        wrapper.style.left = newLeft + 'px';
        wrapper.style.top = newTop + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            if (wrapper.dataset.bloqueado === 'false') {
                wrapper.style.cursor = 'move';
            }
        }
    });
    
    drawingBoard.appendChild(wrapper);
    cerrarNotasObligatorias();
    
    alert('✅ Notas Obligatorias integradas al plano');
}

// ========================================
// CONTROLES DE TAMAÑO
// ========================================
function cambiarTamanoNotas(btn, factor) {
    const wrapper = btn.closest('.notas-integradas');
    const escalaActual = parseFloat(wrapper.dataset.escala) || 1;
    const nuevaEscala = escalaActual * factor;
    
    if (nuevaEscala < 0.2 || nuevaEscala > 2) {
        alert(nuevaEscala < 0.2 ? '⚠️ Tamaño mínimo alcanzado' : '⚠️ Tamaño máximo alcanzado');
        return;
    }
    
    wrapper.dataset.escala = nuevaEscala.toFixed(2);
    wrapper.style.transform = `scale(${nuevaEscala})`;
}

function resetTamanoNotas(btn) {
    const wrapper = btn.closest('.notas-integradas');
    wrapper.dataset.escala = '1';
    wrapper.style.transform = 'scale(1)';
}

function bloquearNotas(btn) {
    const wrapper = btn.closest('.notas-integradas');
    const bloqueado = wrapper.dataset.bloqueado === 'true';
    
    if (bloqueado) {
        wrapper.dataset.bloqueado = 'false';
        wrapper.style.cursor = 'move';
        wrapper.style.border = '3px solid #d35400';
        btn.textContent = '🔓';
        btn.style.background = 'white';
        btn.style.color = '#d35400';
        btn.title = 'Bloquear';
    } else {
        wrapper.dataset.bloqueado = 'true';
        wrapper.style.cursor = 'not-allowed';
        wrapper.style.border = '3px solid #e74c3c';
        btn.textContent = '🔒';
        btn.style.background = '#e74c3c';
        btn.style.color = 'white';
        btn.title = 'Desbloquear';
    }
}

function eliminarNotas(btn) {
    if (confirm('¿Eliminar notas del plano?')) {
        const wrapper = btn.closest('.notas-integradas');
        wrapper.remove();
    }
}

// ========================================
// EXPORTAR A TEXTO
// ========================================
function exportarNotasTexto() {
    let texto = "NOTAS OBLIGATORIAS - ESSBIO / NUEVOSUR\n";
    texto += "=".repeat(80) + "\n\n";
    texto += "NOTAS:\n\n";
    texto += TEXTO_NOTAS_COMPLETO;
    texto += "\n\n" + "=".repeat(80) + "\n";
    texto += "Generado por TRUKILLO AGUA POTABLE\n";
    texto += `Fecha: ${new Date().toLocaleDateString('es-CL')}\n`;
    
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Notas_Obligatorias_ESSBIO_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('✅ Notas exportadas correctamente');
}

// ========================================
// EVENTOS GLOBALES
// ========================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalNotasObligatorias');
        if (modal && modal.classList.contains('active')) {
            cerrarNotasObligatorias();
        }
    }
});

document.addEventListener('click', function(e) {
    const modal = document.getElementById('modalNotasObligatorias');
    if (e.target === modal) {
        cerrarNotasObligatorias();
    }
});

// ========================================
// EXPORTAR FUNCIONES AL SCOPE GLOBAL
// ========================================
window.abrirNotasObligatorias = abrirNotasObligatorias;
window.cerrarNotasObligatorias = cerrarNotasObligatorias;
window.integrarNotasAlPlano = integrarNotasAlPlano;
window.cambiarTamanoNotas = cambiarTamanoNotas;
window.resetTamanoNotas = resetTamanoNotas;
window.bloquearNotas = bloquearNotas;
window.eliminarNotas = eliminarNotas;
window.exportarNotasTexto = exportarNotasTexto;

console.log('✅ Sistema Notas Obligatorias cargado correctamente');