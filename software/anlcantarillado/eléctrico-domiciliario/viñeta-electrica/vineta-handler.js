/* ============================================
   GESTOR DE VIÑETA ELÉCTRICA - INTEGRADO AL PLANO
   Archivo: vineta-handler.js (146mm x 220mm)
   ============================================ */

let vinetaArrastrando = false;
let vinetaRedimensionando = false;
let vinetaPanActivo = false;
let vinetaActiva = false;
let zoomVinetaActual = 1;
let scrollActual = { x: 0, y: 0 };
let formatObserver = null;

const VINETA_CONFIG = {
    ANCHO_BASE: 552,
    ALTO_BASE: 832,
    ANCHO_MM: 146,
    ALTO_MM: 220,
    RATIO: 552 / 832,
    MARGEN_MM: 0
};

const FORMATOS_LOCALES = {
    A1: { width: 841, height: 594, realWidth: 841, realHeight: 594 },
    A0: { width: 1189, height: 841, realWidth: 1189, realHeight: 841 }
};

function obtenerFormatoActual() {
    const btnA1 = document.getElementById('btnA1');
    const btnA0 = document.getElementById('btnA0');
    
    if (btnA1 && btnA1.classList.contains('active')) return 'A1';
    if (btnA0 && btnA0.classList.contains('active')) return 'A0';
    
    const board = document.getElementById('drawingBoard');
    if (board) {
        if (board.classList.contains('format-a0')) return 'A0';
        if (board.classList.contains('format-a1')) return 'A1';
    }
    
    return 'A1';
}

function abrirVineta() {
    console.log('🟢 ABRIENDO VIÑETA - 146mm x 220mm');
    
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
    
    const viewBox = svgPlano.getAttribute('viewBox').split(' ');
    const svgWidth = parseFloat(viewBox[2]);
    const svgHeight = parseFloat(viewBox[3]);
    
    const escalaPx = svgWidth / formato.realWidth;
    const anchoVinetaPx = VINETA_CONFIG.ANCHO_MM * escalaPx;
    const altoVinetaPx = VINETA_CONFIG.ALTO_MM * escalaPx;
    
    // Posicionar pegado al borde interior del margen (sin separación adicional)
    const xPx = svgWidth - anchoVinetaPx;
    const yPx = svgHeight - altoVinetaPx;
    
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
        <div class="vineta-header" id="vinetaHeader">
            <div class="vineta-title">VIÑETA ELÉCTRICA</div>
            <div class="vineta-controls">
                <button onclick="cambiarZoomVineta(-0.25)" class="zoom-btn">−</button>
                <span id="zoomVinetaLabel" class="zoom-label">100%</span>
                <button onclick="cambiarZoomVineta(0.25)" class="zoom-btn">+</button>
                <button class="vineta-btn-header minimize" onclick="minimizarVineta()">━</button>
                <button class="vineta-btn-header close" onclick="cerrarVineta()">✕</button>
            </div>
        </div>
        <div class="vineta-content" id="vinetaContent">
            <iframe id="vinetaIframe" src="viñeta-electrica/viñeta-electrica.html" frameborder="0" style="
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
        observarCambiosDeFormato();
    }, 100);
    
    console.log('✅ VIÑETA INTEGRADA AL PLANO');
}

function observarCambiosDeFormato() {
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) return;
    
    formatObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const vinetaWindow = document.getElementById('vinetaWindow');
                if (vinetaWindow) {
                    console.log('🔄 Cambio de formato detectado');
                    setTimeout(() => reposicionarVinetaSegunFormato(), 100);
                }
            }
        });
    });
    
    formatObserver.observe(drawingBoard, {
        attributes: true,
        attributeFilter: ['class']
    });
}

function enviarZoomAlIframe() {
    const iframe = document.getElementById('vinetaIframe');
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            tipo: 'vinetaZoomUpdate',
            zoom: zoomVinetaActual
        }, '*');
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
    
    // Posicionar pegado al borde interior del margen (sin separación adicional)
    const xPx = svgWidth - anchoVinetaPx;
    const yPx = svgHeight - altoVinetaPx;
    
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
        ventana.remove();
        vinetaActiva = false;
        zoomVinetaActual = 1;
        vinetaPanActivo = false;
        document.removeEventListener('keydown', manejarTeclaEscape);
        
        if (formatObserver) {
            formatObserver.disconnect();
            formatObserver = null;
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
    const ventana = document.getElementById('vinetaWindow');
    if (e.key === 'Escape' && ventana) {
        if (vinetaPanActivo) {
            vinetaPanActivo = false;
            return;
        }
        if (vinetaArrastrando) {
            vinetaArrastrando = false;
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

console.log('✅ Vineta Handler (146mm x 220mm) inicializado');