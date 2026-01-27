// herramientas-dibujo/drawing-core.js

let herramientaDibujoActual = null;
let puntosDibujo = [];
let elementoDibujoTemporal = null;
let estaDibujando = false;
let ultimaHerramientaUsada = null;

const ESTILOS_DIBUJO = {
    stroke: '#000000',
    strokeWidth: 2,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
};

function seleccionarHerramientaDibujo(herramienta) {
    if (isNavigationMode) {
        showStatus('⚠️ Cambia a modo Edición para usar herramientas de dibujo');
        return;
    }
    
    cancelarDibujoActual();
    
    // 🔧 LIMPIAR ELEMENTOS TEMPORALES DE MEDICIÓN
    if (window.MeasuringTool) {
        const tracingSvg = document.getElementById('tracingSvg');
        const tempMeasuring = tracingSvg.querySelectorAll('.measuring-temp');
        tempMeasuring.forEach(el => el.remove());
    }
    
    const planoActual = plans[currentPlanIndex];
    planoActual.currentTool = null;
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    
    herramientaDibujoActual = herramienta;
    ultimaHerramientaUsada = herramienta;
    puntosDibujo = [];
    estaDibujando = false;
    
    document.querySelectorAll('[class^="drawing-"]').forEach(el => {
        el.style.pointerEvents = 'none';
    });
    
    document.querySelectorAll('.manipulable-image').forEach(img => {
        img.style.pointerEvents = 'none';
    });
    
    document.querySelectorAll('.cad-tool-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        const btn = event.target.closest('.cad-tool-btn');
        if (btn) btn.classList.add('active');
    }
    
    const drawingBoard = document.getElementById('drawingBoard');
    drawingBoard.style.cursor = 'crosshair';
    
    let nombreHerramienta = '';
    switch(herramienta) {
        case 'line': nombreHerramienta = 'LINE (L)'; break;
        case 'pline': nombreHerramienta = 'PLINE (PL)'; break;
        case 'circle': nombreHerramienta = 'CIRCLE (C)'; break;
        case 'arc': nombreHerramienta = 'ARC (A)'; break;
        case 'rectangle': nombreHerramienta = 'RECTANG'; break;
        case 'spline': nombreHerramienta = 'SPLINE'; break;
        case 'polygon': nombreHerramienta = 'POLYGON'; break;
    }
    
    showStatus(`🖊️ ${nombreHerramienta} - Click para puntos, F8=ORTHO, ESC=Cancelar, Clic derecho=Repetir`);
}

function cancelarDibujoActual() {
    if (elementoDibujoTemporal) {
        elementoDibujoTemporal.remove();
        elementoDibujoTemporal = null;
    }
    
    if (window.CADHelpers) {
        window.CADHelpers.hideSnapIndicator();
        window.CADHelpers.clearSnapPoint();
        window.CADHelpers.clearOrthoStartPoint();
        window.CADHelpers.addTemporarySnapPoints([]);
    }
    
    herramientaDibujoActual = null;
    puntosDibujo = [];
    estaDibujando = false;
    
    document.querySelectorAll('[class^="drawing-"]').forEach(el => {
        el.style.pointerEvents = 'all';
    });
    
    document.querySelectorAll('.manipulable-image').forEach(img => {
        img.style.pointerEvents = 'all';
    });
    
    document.querySelectorAll('.cad-tool-btn').forEach(btn => btn.classList.remove('active'));
    
    const drawingBoard = document.getElementById('drawingBoard');
    drawingBoard.style.cursor = 'default';
}

function clickEstaSobreVentanaModal(e) {
    const target = e.target;
    
    if (target.closest('.isometric-header') || 
        target.closest('.isometric-header-nivel2') ||
        target.closest('.isometric-btn') ||
        target.closest('.isometric-controls') ||
        target.closest('.isometric-resize-handle') ||
        target.closest('.isometric-resize-handle-nivel2')) {
        return true;
    }
    
    if (target.closest('.email-modal') || target.closest('.vineta-modal')) {
        return true;
    }
    
    return false;
}

function manejarClickDibujo(e) {
    if (!herramientaDibujoActual || isNavigationMode) return;
    
    if (clickEstaSobreVentanaModal(e)) {
        return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    let puntoSvg = screenToSVGCoords(e.clientX, e.clientY);
    
    if (window.CADHelpers) {
        const puntoSnap = window.CADHelpers.getSnapPoint();
        if (puntoSnap) {
            puntoSvg = { x: puntoSnap.x, y: puntoSnap.y };
        }
    }
    
    if (window.CADHelpers && window.CADHelpers.isOrthoActive() && puntosDibujo.length > 0) {
        const puntoInicio = puntosDibujo[puntosDibujo.length - 1];
        puntoSvg = window.CADHelpers.applyOrthoConstraint(puntoInicio, puntoSvg);
    }
    
    switch(herramientaDibujoActual) {
        case 'line':
            window.DrawingBasic.manejarClickLinea(puntoSvg);
            break;
        case 'pline':
            window.DrawingAdvanced.manejarClickPolilinea(puntoSvg);
            break;
        case 'circle':
            window.DrawingBasic.manejarClickCirculo(puntoSvg);
            break;
        case 'arc':
            window.DrawingAdvanced.manejarClickArco(puntoSvg);
            break;
        case 'rectangle':
            window.DrawingBasic.manejarClickRectangulo(puntoSvg);
            break;
        case 'spline':
            window.DrawingAdvanced.manejarClickSpline(puntoSvg);
            break;
        case 'polygon':
            window.DrawingAdvanced.manejarClickPoligono(puntoSvg);
            break;
    }
}

function manejarMovimientoDibujo(e) {
    if (!herramientaDibujoActual || isNavigationMode) return;
    
    if (clickEstaSobreVentanaModal(e)) {
        if (window.CADHelpers) {
            window.CADHelpers.hideSnapIndicator();
        }
        return;
    }
    
    let puntoSvg = screenToSVGCoords(e.clientX, e.clientY);
    
    if (window.CADHelpers && puntosDibujo.length > 0) {
        window.CADHelpers.addTemporarySnapPoints(puntosDibujo);
    }
    
    if (window.CADHelpers) {
        const snapCercano = window.CADHelpers.findSnapPoint(puntoSvg);
        
        if (snapCercano) {
            window.CADHelpers.updateSnapIndicator(snapCercano);
            window.CADHelpers.setSnapPoint(snapCercano);
            puntoSvg = { x: snapCercano.x, y: snapCercano.y };
        } else {
            window.CADHelpers.hideSnapIndicator();
            window.CADHelpers.clearSnapPoint();
        }
        
        if (window.CADHelpers.isOrthoActive() && puntosDibujo.length > 0) {
            const puntoInicio = puntosDibujo[puntosDibujo.length - 1];
            puntoSvg = window.CADHelpers.applyOrthoConstraint(puntoInicio, puntoSvg);
        }
    }
    
    if (!estaDibujando) return;
    
    switch(herramientaDibujoActual) {
        case 'line':
            window.DrawingBasic.actualizarLineaTemporal(puntoSvg);
            break;
        case 'pline':
            window.DrawingAdvanced.actualizarPolilineaTemporal(puntoSvg);
            break;
        case 'circle':
            window.DrawingBasic.actualizarCirculoTemporal(puntoSvg);
            break;
        case 'arc':
            window.DrawingAdvanced.actualizarArcoTemporal(puntoSvg);
            break;
        case 'rectangle':
            window.DrawingBasic.actualizarRectanguloTemporal(puntoSvg);
            break;
        case 'spline':
            window.DrawingAdvanced.actualizarSplineTemporal(puntoSvg);
            break;
        case 'polygon':
            window.DrawingAdvanced.actualizarPoligonoTemporal(puntoSvg);
            break;
    }
}

window.currentDrawingTool = herramientaDibujoActual;
window.drawingPoints = puntosDibujo;
window.tempDrawingElement = elementoDibujoTemporal;
window.isDrawing = estaDibujando;
window.lastUsedTool = ultimaHerramientaUsada;
window.DRAWING_STYLES = ESTILOS_DIBUJO;
window.selectDrawingTool = seleccionarHerramientaDibujo;
window.cancelCurrentDrawing = cancelarDibujoActual;
window.handleDrawingClick = manejarClickDibujo;
window.handleDrawingMouseMove = manejarMovimientoDibujo;

window.DrawingCore = {
    herramientaDibujoActual,
    puntosDibujo,
    elementoDibujoTemporal,
    estaDibujando,
    ultimaHerramientaUsada,
    ESTILOS_DIBUJO,
    seleccionarHerramientaDibujo,
    cancelarDibujoActual,
    manejarClickDibujo,
    manejarMovimientoDibujo,
    clickEstaSobreVentanaModal,
    obtenerHerramientaActual: () => herramientaDibujoActual,
    establecerHerramientaActual: (h) => { herramientaDibujoActual = h; window.currentDrawingTool = h; },
    obtenerPuntos: () => puntosDibujo,
    establecerPuntos: (p) => { puntosDibujo = p; window.drawingPoints = p; },
    obtenerElementoTemporal: () => elementoDibujoTemporal,
    establecerElementoTemporal: (e) => { elementoDibujoTemporal = e; window.tempDrawingElement = e; },
    obtenerEstaDibujando: () => estaDibujando,
    establecerEstaDibujando: (e) => { estaDibujando = e; window.isDrawing = e; },
    obtenerUltimaHerramienta: () => ultimaHerramientaUsada,
    establecerUltimaHerramienta: (h) => { ultimaHerramientaUsada = h; window.lastUsedTool = h; }
};

console.log('✅ drawing-core.js cargado');