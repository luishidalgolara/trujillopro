/* ============================================
   GESTOR DE VIÑETA ELÉCTRICA - INTEGRADO AL PLANO
   Archivo: vineta-handler.js (146mm x 220mm)
   SOLUCIÓN DEFINITIVA: foreignObject dentro del SVG
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
    ALTO_MM: 178,
    RATIO: 552 / 832
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
    
    const svgPlano = document.getElementById('plano');
    if (!svgPlano) {
        console.error('❌ plano no encontrado');
        return;
    }
    
    const formatoActual = obtenerFormatoActual();
    const formato = FORMATOS_LOCALES[formatoActual];
    
    // OBTENER VIEWBOX DEL SVG
    const viewBox = svgPlano.getAttribute('viewBox').split(' ');
    const svgWidth = parseFloat(viewBox[2]);
    const svgHeight = parseFloat(viewBox[3]);
    
    // DIMENSIONES EN UNIDADES DEL VIEWBOX
    const anchoVineta = VINETA_CONFIG.ANCHO_MM;
    const altoVineta = VINETA_CONFIG.ALTO_MM;
    
    // CALCULAR ESCALA para el contenido del iframe
    const escalaContenido = anchoVineta / VINETA_CONFIG.ANCHO_BASE;
    
    // POSICIÓN: Esquina inferior derecha DENTRO del viewBox
    // Movida 3mm hacia la izquierda
    const x = svgWidth - anchoVineta -13;
    const y = svgHeight - altoVineta - 18;
    
    console.log('📐 POSICIÓN EN VIEWBOX:', {
        svgWidth,
        svgHeight,
        anchoVineta,
        altoVineta,
        escalaContenido,
        x,
        y
    });
    
    // CREAR foreignObject dentro del SVG
    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreignObject.setAttribute('id', 'vinetaWindow');
    foreignObject.setAttribute('x', x);
    foreignObject.setAttribute('y', y);
    foreignObject.setAttribute('width', anchoVineta);
    foreignObject.setAttribute('height', altoVineta);
    
    // CONTENIDO HTML dentro del foreignObject
    foreignObject.innerHTML = `
        <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -30px; left: 0; right: 0; background: rgba(0,0,0,0.7); padding: 4px 8px; display: flex; justify-content: space-between; align-items: center; border-radius: 4px 4px 0 0;">
                <div style="font-size: 9px; color: white; font-weight: 600;">VIÑETA ELÉCTRICA</div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <button onclick="cambiarZoomVineta(-0.25)" style="background: transparent; border: none; padding: 2px 6px; font-size: 16px; color: rgba(0,212,255,0.9); cursor: pointer; font-weight: bold;">−</button>
                    <span id="zoomVinetaLabel" style="font-size: 9px; color: white; min-width: 35px; text-align: center;">100%</span>
                    <button onclick="cambiarZoomVineta(0.25)" style="background: transparent; border: none; padding: 2px 6px; font-size: 16px; color: rgba(0,212,255,0.9); cursor: pointer; font-weight: bold;">+</button>
                    <button onclick="minimizarVineta()" style="background: transparent; border: none; padding: 2px 6px; font-size: 14px; color: rgba(255,170,0,0.9); cursor: pointer;">━</button>
                    <button onclick="cerrarVineta()" style="background: transparent; border: none; padding: 2px 6px; font-size: 14px; color: rgba(255,68,68,0.9); cursor: pointer;">✕</button>
                </div>
            </div>
            <iframe src="viñeta-electrica/viñeta-electrica.html" frameborder="0" style="
                transform: scale(${escalaContenido});
                transform-origin: top left;
                width: ${100 / escalaContenido}%;
                height: ${100 / escalaContenido}%;
                display: block;
                background: white;
                border: 4px solid black;
            "></iframe>
        </div>
    `;
    
    svgPlano.appendChild(foreignObject);
    vinetaActiva = true;
    
    setTimeout(() => {
        configurarTeclaEscape();
        escucharMensajesIframe();
        observarCambiosDeFormato();
    }, 100);
    
    console.log('✅ VIÑETA INTEGRADA AL PLANO - PEGADA AL BORDE');
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

function escucharMensajesIframe() {
    window.addEventListener('message', function(event) {
        if (event.data.tipo === 'vinetaPanInicio') {
            vinetaPanActivo = true;
        }
        
        if (event.data.tipo === 'vinetaPanCancelar') {
            vinetaPanActivo = false;
        }
    });
}

function cambiarZoomVineta(delta) {
    const label = document.getElementById('zoomVinetaLabel');
    if (!label) return;
    
    zoomVinetaActual = Math.max(0.5, Math.min(3, zoomVinetaActual + delta));
    label.textContent = Math.round(zoomVinetaActual * 100) + '%';
    
    console.log('🔍 Zoom viñeta:', zoomVinetaActual);
}

function reposicionarVinetaSegunFormato() {
    const foreignObject = document.getElementById('vinetaWindow');
    const svgPlano = document.getElementById('plano');
    
    if (!foreignObject || !svgPlano) return;
    
    const viewBox = svgPlano.getAttribute('viewBox').split(' ');
    const svgWidth = parseFloat(viewBox[2]);
    const svgHeight = parseFloat(viewBox[3]);
    
    const anchoVineta = VINETA_CONFIG.ANCHO_MM;
    const altoVineta = VINETA_CONFIG.ALTO_MM;
    
    const x = svgWidth - anchoVineta - 13;
    const y = svgHeight - altoVineta - 18;
    
    foreignObject.setAttribute('x', x);
    foreignObject.setAttribute('y', y);
    foreignObject.setAttribute('width', anchoVineta);
    foreignObject.setAttribute('height', altoVineta);
}

function cerrarVineta() {
    const foreignObject = document.getElementById('vinetaWindow');
    if (foreignObject) {
        foreignObject.remove();
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
    const foreignObject = document.getElementById('vinetaWindow');
    if (foreignObject) {
        const currentHeight = foreignObject.getAttribute('height');
        if (currentHeight === '30') {
            foreignObject.setAttribute('height', VINETA_CONFIG.ALTO_MM);
        } else {
            foreignObject.setAttribute('height', '30');
        }
    }
}

function manejarTeclaEscape(e) {
    const ventana = document.getElementById('vinetaWindow');
    if (e.key === 'Escape' && ventana) {
        if (vinetaPanActivo) {
            vinetaPanActivo = false;
            return;
        }
    }
}

function configurarTeclaEscape() {
    document.addEventListener('keydown', manejarTeclaEscape);
}

window.abrirVineta = abrirVineta;
window.cerrarVineta = cerrarVineta;
window.minimizarVineta = minimizarVineta;
window.reposicionarVinetaSegunFormato = reposicionarVinetaSegunFormato;
window.cambiarZoomVineta = cambiarZoomVineta;

console.log('✅ Vineta Handler (146mm x 220mm) inicializado - foreignObject SVG');