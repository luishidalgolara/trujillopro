// ARCHIVO: viñeta-handler.js (MEDIDAS EXACTAS 146x220mm)

let vinetaArrastrando = false;
let vinetaRedimensionando = false;
let vinetaPanActivo = false;
let animationFrameId = null;
let vinetaActiva = false;
let zoomVinetaActual = 1;
let scrollActual = { x: 0, y: 0 };
let formatObserver = null; // ✅ Observador de cambios de formato

const VINETA_CONFIG = {
    ANCHO_BASE: 552,
    ALTO_BASE: 832,
    ANCHO_MM: 146,
    ALTO_MM: 220,
    RATIO: 552 / 832,
    MARGEN_MM: 0  // ✅ PEGADA A LA ESQUINA (0mm de margen)
};

// ✅ DEFINIR FORMATOS LOCALMENTE (no depende de variables globales)
const FORMATOS_LOCALES = {
    A1: {
        width: 841,
        height: 594,
        realWidth: 841,
        realHeight: 594
    },
    A0: {
        width: 1189,
        height: 841,
        realWidth: 1189,
        realHeight: 841
    }
};

// ✅ FUNCIÓN PARA DETECTAR FORMATO ACTUAL DESDE EL DOM
function obtenerFormatoActual() {
    // Detectar desde los botones activos
    const btnA1 = document.getElementById('btnA1');
    const btnA0 = document.getElementById('btnA0');
    
    if (btnA1 && btnA1.classList.contains('active')) {
        return 'A1';
    }
    if (btnA0 && btnA0.classList.contains('active')) {
        return 'A0';
    }
    
    // Detectar desde la clase del drawingBoard
    const board = document.getElementById('drawingBoard');
    if (board) {
        if (board.classList.contains('format-a0')) {
            return 'A0';
        }
        if (board.classList.contains('format-a1')) {
            return 'A1';
        }
    }
    
    // Por defecto A1
    return 'A1';
}

function abrirVineta() {
    console.log('🟢 ABRIENDO VIÑETA - MEDIDAS EXACTAS 146x220mm');
    
    // ✅ CAMBIO: Verificar si ya existe viñeta en ESTE plano (verificación DOM)
    const vinetaExistente = document.getElementById('vinetaWindow');
    if (vinetaExistente) {
        console.log('⚠️ Ya existe una viñeta en este plano');
        alert('Ya existe una viñeta en este plano. Ciérrala primero si deseas crear otra.');
        return;
    }
    
    const drawingBoard = document.getElementById('drawingBoard');
    const svgPlano = document.getElementById('plano');
    if (!drawingBoard || !svgPlano) {
        console.error('❌ drawingBoard o plano no encontrado');
        return;
    }
    
    const formatoActual = obtenerFormatoActual();
    const formato = FORMATOS_LOCALES[formatoActual];
    
    // ✅ OBTENER DIMENSIONES DEL VIEWBOX
    const viewBox = svgPlano.getAttribute('viewBox').split(' ');
    const svgWidth = parseFloat(viewBox[2]);
    const svgHeight = parseFloat(viewBox[3]);
    
    const escalaPx = svgWidth / formato.realWidth;
    const anchoVinetaPx = VINETA_CONFIG.ANCHO_MM * escalaPx;
    const altoVinetaPx = VINETA_CONFIG.ALTO_MM * escalaPx;
    
    const xPx = svgWidth - anchoVinetaPx - 25;
    const yPx = svgHeight - altoVinetaPx - 30;
    
    const escala = anchoVinetaPx / VINETA_CONFIG.ANCHO_BASE;
    zoomVinetaActual = 1;
    
    const ventana = document.createElement('div');
    ventana.id = 'vinetaWindow';
    ventana.className = 'vineta-window';
    ventana.style.cssText = `
        width: ${anchoVinetaPx}px;
        height: ${altoVinetaPx}px;
        left: ${xPx}px;
        top: ${yPx}px;
    `;
    
    ventana.innerHTML = `
        <div class="vineta-header" id="vinetaHeader" style="
            position: absolute;
            top: -30px;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            padding: 4px 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 4px 4px 0 0;
        ">
            <div class="vineta-title" style="font-size: 9px; color: rgba(255, 255, 255, 0.9);">VIÑETA ESSBIO</div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <button onclick="cambiarZoomVineta(-0.25)" style="
                    background: transparent;
                    border: none;
                    padding: 2px 6px;
                    font-size: 16px;
                    color: rgba(0, 212, 255, 0.9);
                    cursor: pointer;
                    font-weight: bold;
                ">−</button>
                <span id="zoomVinetaLabel" style="font-size: 9px; color: rgba(255, 255, 255, 0.8); min-width: 35px; text-align: center;">100%</span>
                <button onclick="cambiarZoomVineta(0.25)" style="
                    background: transparent;
                    border: none;
                    padding: 2px 6px;
                    font-size: 16px;
                    color: rgba(0, 212, 255, 0.9);
                    cursor: pointer;
                    font-weight: bold;
                ">+</button>
                <button class="vineta-btn-header minimize" onclick="minimizarVineta()" style="
                    background: transparent;
                    border: none;
                    padding: 2px 6px;
                    font-size: 14px;
                    color: rgba(255, 170, 0, 0.9);
                    cursor: pointer;
                ">━</button>
                <button class="vineta-btn-header close" onclick="cerrarVineta()" style="
                    background: transparent;
                    border: none;
                    padding: 2px 6px;
                    font-size: 14px;
                    color: rgba(255, 68, 68, 0.9);
                    cursor: pointer;
                ">✕</button>
            </div>
        </div>
        <div class="vineta-content" id="vinetaContent" style="
            width: 100%;
            height: 100%;
            overflow: auto;
            position: relative;
        ">
            <iframe id="vinetaIframe" src="viñeta-ap/viñetaap.html" frameborder="0" style="
                transform: scale(${escala});
                transform-origin: top left;
                width: ${100/escala}%;
                height: ${100/escala}%;
                display: block;
            "></iframe>
        </div>
        <div class="vineta-resize-handle" id="vinetaResize"></div>
    `;
    
    drawingBoard.appendChild(ventana);
    vinetaActiva = true;
    
    setTimeout(() => {
        inicializarArrastreVineta();
        inicializarRedimensionamientoVineta();
        configurarTeclaEscape();
        escucharMensajesIframe();
        enviarZoomAlIframe();
        observarCambiosDeFormato(); // ✅ NUEVO: Observar cambios de formato
    }, 100);
    
    console.log('✅ VIÑETA INTEGRADA - 146mm x 220mm EXACTOS');
}

// ✅ NUEVA FUNCIÓN: Observar cambios de formato A1 ↔ A0
function observarCambiosDeFormato() {
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) return;
    
    // Observar cambios en las clases del drawingBoard
    formatObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // ✅ CAMBIO: Verificar si la viñeta existe en ESTE plano
                const vinetaWindow = document.getElementById('vinetaWindow');
                if (vinetaWindow) {
                    console.log('🔄 Cambio de formato detectado, reposicionando viñeta...');
                    setTimeout(() => {
                        reposicionarVinetaSegunFormato();
                    }, 100);
                }
            }
        });
    });
    
    formatObserver.observe(drawingBoard, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    console.log('👁️ Observador de formato activado');
}

function enviarZoomAlIframe() {
    const iframe = document.getElementById('vinetaIframe');
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            tipo: 'vinetaZoomUpdate',
            zoom: zoomVinetaActual
        }, '*');
        console.log('📤 Zoom enviado al iframe:', zoomVinetaActual);
    }
}

function escucharMensajesIframe() {
    window.addEventListener('message', function(event) {
        const contenido = document.getElementById('vinetaContent');
        if (!contenido) return;
        
        if (event.data.tipo === 'vinetaPanInicio') {
            vinetaPanActivo = true;
            scrollActual.x = contenido.scrollLeft;
            scrollActual.y = contenido.scrollTop;
        }
        
        if (event.data.tipo === 'vinetaPanMove' && vinetaPanActivo) {
            scrollActual.x += event.data.deltaX;
            scrollActual.y += event.data.deltaY;
            contenido.scrollLeft = scrollActual.x;
            contenido.scrollTop = scrollActual.y;
        }
        
        if (event.data.tipo === 'vinetaPanCancelar') {
            vinetaPanActivo = false;
            scrollActual = { x: 0, y: 0 };
        }
    });
    
    console.log('✅ Escuchando mensajes iframe');
}

function cancelarPanVineta() {
    if (vinetaPanActivo) {
        vinetaPanActivo = false;
        scrollActual = { x: 0, y: 0 };
        const iframe = document.getElementById('vinetaIframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({ tipo: 'vinetaCancelarPan' }, '*');
        }
        console.log('↩️ PAN cancelado');
    }
}

function cambiarZoomVineta(delta) {
    const iframe = document.getElementById('vinetaIframe');
    const label = document.getElementById('zoomVinetaLabel');
    const svgPlano = document.getElementById('plano');
    
    if (!iframe || !label || !svgPlano) return;
    
    zoomVinetaActual = Math.max(0.5, Math.min(3, zoomVinetaActual + delta));
    
    const formatoActual = obtenerFormatoActual();
    const formato = FORMATOS_LOCALES[formatoActual];
    
    const viewBox = svgPlano.getAttribute('viewBox').split(' ');
    const svgWidth = parseFloat(viewBox[2]);
    
    const escalaPx = svgWidth / formato.realWidth;
    const anchoVinetaPx = VINETA_CONFIG.ANCHO_MM * escalaPx;
    const escalaBase = anchoVinetaPx / VINETA_CONFIG.ANCHO_BASE;
    const escalaFinal = escalaBase * zoomVinetaActual;
    
    iframe.style.transform = `scale(${escalaFinal})`;
    iframe.style.transformOrigin = 'top left';
    iframe.style.width = (100 / escalaFinal) + '%';
    iframe.style.height = (100 / escalaFinal) + '%';
    
    label.textContent = Math.round(zoomVinetaActual * 100) + '%';
    
    enviarZoomAlIframe();
}

function reposicionarVinetaSegunFormato() {
    // ✅ CAMBIO: Verificar si la viñeta existe en ESTE plano
    const ventana = document.getElementById('vinetaWindow');
    if (!ventana) return;
    
    const iframe = document.getElementById('vinetaIframe');
    const svgPlano = document.getElementById('plano');
    
    if (!iframe || !svgPlano) return;
    
    const formatoActual = obtenerFormatoActual();
    const formato = FORMATOS_LOCALES[formatoActual];
    
    const viewBox = svgPlano.getAttribute('viewBox').split(' ');
    const svgWidth = parseFloat(viewBox[2]);
    const svgHeight = parseFloat(viewBox[3]);
    
    const escalaPx = svgWidth / formato.realWidth;
    const anchoVinetaPx = VINETA_CONFIG.ANCHO_MM * escalaPx;
    const altoVinetaPx = VINETA_CONFIG.ALTO_MM * escalaPx;
    
    const xPx = svgWidth - anchoVinetaPx - 25;
    const yPx = svgHeight - altoVinetaPx - 30;
    
    ventana.style.width = anchoVinetaPx + 'px';
    ventana.style.height = altoVinetaPx + 'px';
    ventana.style.left = xPx + 'px';
    ventana.style.top = yPx + 'px';
    
    const escalaBase = anchoVinetaPx / VINETA_CONFIG.ANCHO_BASE;
    const escalaFinal = escalaBase * zoomVinetaActual;
    iframe.style.transform = `scale(${escalaFinal})`;
    iframe.style.width = (100 / escalaFinal) + '%';
    iframe.style.height = (100 / escalaFinal) + '%';
    
    enviarZoomAlIframe();
}

function cerrarVineta() {
    const ventana = document.getElementById('vinetaWindow');
    if (ventana) {
        cancelarPanVineta();
        ventana.remove();
        vinetaActiva = false;
        zoomVinetaActual = 1;
        vinetaPanActivo = false;
        document.removeEventListener('keydown', manejarTeclaEscape);
        
        // ✅ DESCONECTAR OBSERVADOR
        if (formatObserver) {
            formatObserver.disconnect();
            formatObserver = null;
            console.log('👁️ Observador de formato desconectado');
        }
        
        console.log('✅ Viñeta cerrada');
    }
}

function minimizarVineta() {
    const ventana = document.getElementById('vinetaWindow');
    if (ventana) {
        ventana.classList.toggle('minimized');
    }
}

function manejarTeclaEscape(e) {
    // ✅ CAMBIO: Verificar si la viñeta existe en ESTE plano
    const ventana = document.getElementById('vinetaWindow');
    if (e.key === 'Escape' && ventana) {
        if (vinetaPanActivo) {
            cancelarPanVineta();
            return;
        }
        if (vinetaArrastrando) {
            vinetaArrastrando = false;
            const header = document.getElementById('vinetaHeader');
            if (header) header.style.cursor = 'grab';
            return;
        }
        if (vinetaRedimensionando) {
            vinetaRedimensionando = false;
            return;
        }
    }
}

function configurarTeclaEscape() {
    document.addEventListener('keydown', manejarTeclaEscape);
}

function inicializarArrastreVineta() {
    const ventana = document.getElementById('vinetaWindow');
    
    if (!ventana) return;
    
    let mouseInicio = { x: 0, y: 0 };
    let ventanaInicio = { x: 0, y: 0 };
    
    ventana.onmousedown = function(e) {
        if (e.target.closest('.vineta-content')) return;
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') return;
        if (e.target.id === 'vinetaResize') return;
        
        vinetaArrastrando = true;
        mouseInicio.x = e.clientX;
        mouseInicio.y = e.clientY;
        
        const rect = ventana.getBoundingClientRect();
        const parentRect = ventana.parentElement.getBoundingClientRect();
        
        ventanaInicio.x = rect.left - parentRect.left;
        ventanaInicio.y = rect.top - parentRect.top;
        
        ventana.style.cursor = 'grabbing';
        e.preventDefault();
        e.stopPropagation();
    };
    
    document.onmousemove = function(e) {
        if (!vinetaArrastrando) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const deltaX = e.clientX - mouseInicio.x;
        const deltaY = e.clientY - mouseInicio.y;
        
        const newX = ventanaInicio.x + deltaX;
        const newY = ventanaInicio.y + deltaY;
        
        const parentRect = ventana.parentElement.getBoundingClientRect();
        const ventanaRect = ventana.getBoundingClientRect();
        
        const maxX = parentRect.width - ventanaRect.width;
        const maxY = parentRect.height - ventanaRect.height;
        
        ventana.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
        ventana.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
    };
    
    document.onmouseup = function(e) {
        if (vinetaArrastrando) {
            vinetaArrastrando = false;
            ventana.style.cursor = 'grab';
            e.stopPropagation();
        }
    };
}

function inicializarRedimensionamientoVineta() {
    const handle = document.getElementById('vinetaResize');
    const ventana = document.getElementById('vinetaWindow');
    const iframe = document.getElementById('vinetaIframe');
    
    if (!handle || !ventana || !iframe) return;
    
    let mouseInicio = { x: 0, y: 0 };
    let ventanaInicio = { width: 0, height: 0 };
    
    handle.onmousedown = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        vinetaRedimensionando = true;
        mouseInicio.x = e.clientX;
        mouseInicio.y = e.clientY;
        ventanaInicio.width = ventana.offsetWidth;
        ventanaInicio.height = ventana.offsetHeight;
    };
    
    document.onmousemove = function(e) {
        if (!vinetaRedimensionando) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const deltaX = e.clientX - mouseInicio.x;
        const deltaY = e.clientY - mouseInicio.y;
        
        const nuevoAncho = Math.max(200, ventanaInicio.width + deltaX);
        const nuevoAlto = nuevoAncho * (VINETA_CONFIG.ALTO_BASE / VINETA_CONFIG.ANCHO_BASE);
        
        ventana.style.width = nuevoAncho + 'px';
        ventana.style.height = nuevoAlto + 'px';
        
        const escalaBase = nuevoAncho / VINETA_CONFIG.ANCHO_BASE;
        const escalaFinal = escalaBase * zoomVinetaActual;
        iframe.style.transform = `scale(${escalaFinal})`;
        iframe.style.width = (100 / escalaFinal) + '%';
        iframe.style.height = (100 / escalaFinal) + '%';
    };
    
    document.onmouseup = function(e) {
        if (vinetaRedimensionando) {
            vinetaRedimensionando = false;
            e.stopPropagation();
        }
    };
}

window.abrirVineta = abrirVineta;
window.cerrarVineta = cerrarVineta;
window.minimizarVineta = minimizarVineta;
window.reposicionarVinetaSegunFormato = reposicionarVinetaSegunFormato;
window.cambiarZoomVineta = cambiarZoomVineta;

console.log('✅ Vineta Handler (146mm x 220mm EXACTOS) inicializado');