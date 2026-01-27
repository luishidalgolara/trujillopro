// ========================================
// SISTEMA DE ZOOM/PAN CAD FLUIDO
// ========================================

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 5;

let lastMouseX = 0;
let lastMouseY = 0;
let rafId = null;
let needsUpdate = false;

// ========================================
// APLICAR TRANSFORMACIÃ“N
// ========================================
function applyViewportTransform() {
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) return;
    
    drawingBoard.style.transform = 
        `translate(-50%, -50%) scale(${AppState.zoom}) translate(${AppState.panX}px, ${AppState.panY}px)`;
    needsUpdate = false;
}

function scheduleViewportUpdate() {
    if (needsUpdate || rafId) return;
    needsUpdate = true;
    rafId = requestAnimationFrame(() => {
        applyViewportTransform();
        rafId = null;
    });
}

// ========================================
// MANEJO DE PAN (ARRASTRE)
// ========================================
function handlePanStart(e) {
    const isMiddleButton = e.button === 1;
    const isLeftButtonInNavMode = AppState.mode === 'navegacion' && e.button === 0;
    
    if (!isMiddleButton && !isLeftButtonInNavMode) return;
    if (AppState.isDraggingElement) return;
    
    e.preventDefault();
    
    AppState.isPanning = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    
    const svg = document.getElementById('plano');
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (svg) svg.style.cursor = 'grabbing';
    if (drawingBoard) drawingBoard.style.cursor = 'grabbing';
    document.body.classList.add('no-select');
}

function handlePanMove(e) {
    if (!AppState.isPanning || AppState.isDraggingElement) return;
    
    e.preventDefault();
    
    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;
    
    AppState.panX += deltaX / AppState.zoom;
    AppState.panY += deltaY / AppState.zoom;
    
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    
    scheduleViewportUpdate();
}

function handlePanEnd(e) {
    if (!AppState.isPanning) return;
    
    AppState.isPanning = false;
    
    const svg = document.getElementById('plano');
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (svg) svg.style.cursor = AppState.mode === 'navegacion' ? 'grab' : 'crosshair';
    if (drawingBoard) drawingBoard.style.cursor = '';
    document.body.classList.remove('no-select');
}

// ========================================
// MANEJO DE ZOOM (RUEDA DEL MOUSE)
// ========================================
function handleZoomWheel(e) {
    if (AppState.isDraggingElement) return;
    
    e.preventDefault();
    
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const newZoom = AppState.zoom * zoomFactor;
    
    if (newZoom < MIN_ZOOM || newZoom > MAX_ZOOM) {
        if (newZoom < MIN_ZOOM) {
            updateStatus(`ðŸ” Zoom mÃ­nimo (${Math.round(MIN_ZOOM * 100)}%)`);
        } else {
            updateStatus(`ðŸ” Zoom mÃ¡ximo (${Math.round(MAX_ZOOM * 100)}%)`);
        }
        return;
    }
    
    const wrapper = document.querySelector('.canvas-wrapper');
    if (!wrapper) return;
    
    const rect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Zoom centrado en el cursor
    const beforeX = (mouseX - rect.width / 2) / AppState.zoom - AppState.panX;
    const beforeY = (mouseY - rect.height / 2) / AppState.zoom - AppState.panY;
    
    AppState.zoom = newZoom;
    
    const afterX = (mouseX - rect.width / 2) / AppState.zoom - AppState.panX;
    const afterY = (mouseY - rect.height / 2) / AppState.zoom - AppState.panY;
    
    AppState.panX += (afterX - beforeX);
    AppState.panY += (afterY - beforeY);
    
    applyViewportTransform();
    updateElementSizes();
    
    updateStatus(`ðŸ” Zoom: ${Math.round(AppState.zoom * 100)}%`);
}

// ========================================
// ACTUALIZAR TAMAÃ‘OS DE ELEMENTOS
// ========================================
function updateElementSizes() {
    const svg = document.getElementById('plano');
    if (!svg) return;
    
    const zoomFactor = 1 / AppState.zoom;
    
    // Actualizar cÃ­rculos de sÃ­mbolos
    const circles = svg.querySelectorAll('.electric-symbol circle');
    circles.forEach(circle => {
        const baseRadius = 15;
        circle.setAttribute('r', baseRadius * zoomFactor);
        circle.setAttribute('stroke-width', 2 * zoomFactor);
    });
    
    // Actualizar textos de sÃ­mbolos
    const symbolTexts = svg.querySelectorAll('.electric-symbol > text');
    symbolTexts.forEach(text => {
        const isLabel = text.getAttribute('y') === '30';
        const baseFontSize = isLabel ? 10 : 16;
        text.setAttribute('font-size', baseFontSize * zoomFactor);
    });
    
    // Actualizar lÃ­neas de conductores
    const lines = svg.querySelectorAll('line[stroke]');
    lines.forEach(line => {
        const baseStrokeWidth = parseFloat(line.getAttribute('data-base-width')) || 2;
        line.setAttribute('stroke-width', baseStrokeWidth * zoomFactor);
    });
    
    // Actualizar paths de ductos
    const paths = svg.querySelectorAll('path[stroke]');
    paths.forEach(path => {
        const baseStrokeWidth = parseFloat(path.getAttribute('data-base-width')) || 3;
        path.setAttribute('stroke-width', baseStrokeWidth * zoomFactor);
    });
}

// ========================================
// FUNCIONES DE CONTROL DE VISTA
// ========================================
function resetView() {
    AppState.zoom = 0.85;
    AppState.panX = 0;
    AppState.panY = 0;
    
    applyViewportTransform();
    updateElementSizes();
    
    updateStatus('ðŸ”„ Vista restablecida');
}

function fitToScreen() {
    AppState.zoom = 1;
    AppState.panX = 0;
    AppState.panY = 0;
    
    applyViewportTransform();
    updateElementSizes();
    
    updateStatus('ðŸ“ Plano ajustado');
}

function zoomIn() {
    const newZoom = Math.min(AppState.zoom * 1.2, MAX_ZOOM);
    if (newZoom === AppState.zoom) {
        updateStatus(`ðŸ” Zoom mÃ¡ximo (${Math.round(MAX_ZOOM * 100)}%)`);
        return;
    }
    
    AppState.zoom = newZoom;
    applyViewportTransform();
    updateElementSizes();
    updateStatus(`ðŸ” Zoom: ${Math.round(AppState.zoom * 100)}%`);
}

function zoomOut() {
    const newZoom = Math.max(AppState.zoom * 0.83, MIN_ZOOM);
    if (newZoom === AppState.zoom) {
        updateStatus(`ðŸ” Zoom mÃ­nimo (${Math.round(MIN_ZOOM * 100)}%)`);
        return;
    }
    
    AppState.zoom = newZoom;
    applyViewportTransform();
    updateElementSizes();
    updateStatus(`ðŸ” Zoom: ${Math.round(AppState.zoom * 100)}%`);
}

// ========================================
// INICIALIZACIÃ“N DEL VIEWPORT
// ========================================
function initializeZoomPan() {
    const wrapper = document.querySelector('.canvas-wrapper');
    const svg = document.getElementById('plano');
    
    if (!wrapper || !svg) {
        console.error('âŒ No se encontrÃ³ canvas-wrapper o SVG');
        return;
    }
    
    // Aplicar transformaciÃ³n inicial
    applyViewportTransform();
    
    // Event listeners para pan
    wrapper.addEventListener('mousedown', handlePanStart);
    wrapper.addEventListener('mousemove', handlePanMove);
    wrapper.addEventListener('mouseup', handlePanEnd);
    wrapper.addEventListener('mouseleave', handlePanEnd);
    
    svg.addEventListener('mousedown', handlePanStart);
    svg.addEventListener('mousemove', handlePanMove);
    svg.addEventListener('mouseup', handlePanEnd);
    svg.addEventListener('mouseleave', handlePanEnd);
    
    // Event listener para zoom
    wrapper.addEventListener('wheel', handleZoomWheel, { passive: false });
    
    // Prevenir zoom del navegador
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
            e.preventDefault();
        }
    });
    
    console.log('âœ… Sistema Zoom/Pan CAD inicializado');
    updateStatus('âœ… Sistema de zoom activado - Rueda: zoom | BotÃ³n medio/Nav: pan');
}

// ========================================
// ATAJOS DE TECLADO
// ========================================
document.addEventListener('keydown', function(e) {
    // R = Reset view
    if (e.key === 'r' || e.key === 'R') {
        resetView();
    }
    
    // F = Fit to screen
    if (e.key === 'f' || e.key === 'F') {
        fitToScreen();
    }
    
    // + = Zoom in
    if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomIn();
    }
    
    // - = Zoom out
    if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomOut();
    }
});