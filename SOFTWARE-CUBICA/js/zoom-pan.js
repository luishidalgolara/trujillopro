/* ========================================
   SISTEMA DE ZOOM/PAN PARA CANVAS
   ======================================== */

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 5;

let zoomLevel = 1;
let panX = 0;
let panY = 0;
let isPanning = false;
let lastPanX = 0;
let lastPanY = 0;

// ========================================
// APLICAR TRANSFORMACIÓN VISUAL AL CANVAS
// ========================================
function applyCanvasTransform() {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas) return;
    
    // Aplicar transformación CSS (visual, no afecta el dibujo interno)
    canvas.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
    canvas.style.transformOrigin = 'center center';
}

// ========================================
// MANEJO DE ZOOM CON RUEDA DEL MOUSE
// ========================================
function handleCanvasWheel(event) {
    event.preventDefault();
    
    const canvas = document.getElementById('mainCanvas');
    if (!canvas) return;
    
    // Calcular nuevo zoom
    const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = zoomLevel * zoomFactor;
    
    // Limitar zoom
    if (newZoom < MIN_ZOOM || newZoom > MAX_ZOOM) {
        if (newZoom < MIN_ZOOM) {
            updateStatus(`🔍 Zoom mínimo (${Math.round(MIN_ZOOM * 100)}%)`);
        } else {
            updateStatus(`🔍 Zoom máximo (${Math.round(MAX_ZOOM * 100)}%)`);
        }
        return;
    }
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;
    
    // Ajustar pan para mantener el punto bajo el cursor
    const factor = newZoom / zoomLevel - 1;
    panX -= (mouseX / zoomLevel) * factor;
    panY -= (mouseY / zoomLevel) * factor;
    
    zoomLevel = newZoom;
    
    applyCanvasTransform();
    updateStatus(`🔍 Zoom: ${Math.round(zoomLevel * 100)}%`);
}

// ========================================
// MANEJO DE PAN (ARRASTRE)
// ========================================
function handleCanvasPanStart(event) {
    // Solo con botón medio (rueda) o con espacio + click izquierdo
    const isMiddleButton = event.button === 1;
    const isSpaceClick = event.button === 0 && event.shiftKey;
    
    if (!isMiddleButton && !isSpaceClick) return;
    
    event.preventDefault();
    isPanning = true;
    lastPanX = event.clientX;
    lastPanY = event.clientY;
    
    const canvas = document.getElementById('mainCanvas');
    if (canvas) canvas.style.cursor = 'grabbing';
}

function handleCanvasPanMove(event) {
    if (!isPanning) return;
    
    event.preventDefault();
    
    const deltaX = event.clientX - lastPanX;
    const deltaY = event.clientY - lastPanY;
    
    panX += deltaX / zoomLevel;
    panY += deltaY / zoomLevel;
    
    lastPanX = event.clientX;
    lastPanY = event.clientY;
    
    applyCanvasTransform();
}

function handleCanvasPanEnd(event) {
    if (!isPanning) return;
    
    isPanning = false;
    
    const canvas = document.getElementById('mainCanvas');
    if (canvas) canvas.style.cursor = 'crosshair';
}

// ========================================
// FUNCIONES DE CONTROL DE ZOOM
// ========================================
function resetZoom() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    applyCanvasTransform();
    updateStatus('🔄 Vista restablecida (100%)');
}

function zoomIn() {
    const newZoom = Math.min(zoomLevel * 1.2, MAX_ZOOM);
    if (newZoom === zoomLevel) {
        updateStatus(`🔍 Zoom máximo (${Math.round(MAX_ZOOM * 100)}%)`);
        return;
    }
    
    zoomLevel = newZoom;
    applyCanvasTransform();
    updateStatus(`🔍 Zoom: ${Math.round(zoomLevel * 100)}%`);
}

function zoomOut() {
    const newZoom = Math.max(zoomLevel * 0.83, MIN_ZOOM);
    if (newZoom === zoomLevel) {
        updateStatus(`🔍 Zoom mínimo (${Math.round(MIN_ZOOM * 100)}%)`);
        return;
    }
    
    zoomLevel = newZoom;
    applyCanvasTransform();
    updateStatus(`🔍 Zoom: ${Math.round(zoomLevel * 100)}%`);
}

function fitToScreen() {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    applyCanvasTransform();
    updateStatus('📐 Plano ajustado a pantalla (100%)');
}

// ========================================
// OBTENER COORDENADAS REALES DEL CANVAS
// ========================================
function getCanvasCoordinates(event) {
    const canvas = document.getElementById('mainCanvas');
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    
    // Posición del mouse en el viewport
    const viewX = event.clientX - rect.left;
    const viewY = event.clientY - rect.top;
    
    // Convertir a coordenadas del canvas considerando zoom y pan
    const canvasX = (viewX - rect.width / 2) / zoomLevel - panX + canvas.width / 2;
    const canvasY = (viewY - rect.height / 2) / zoomLevel - panY + canvas.height / 2;
    
    return {
        x: canvasX,
        y: canvasY
    };
}

// ========================================
// INICIALIZACIÓN
// ========================================
function initializeZoomPan() {
    const canvas = document.getElementById('mainCanvas');
    const wrapper = document.querySelector('.canvas-wrapper');
    
    if (!canvas) {
        console.error('❌ Canvas no encontrado para zoom/pan');
        return;
    }
    
    // Event listeners para zoom
    if (wrapper) {
        wrapper.addEventListener('wheel', handleCanvasWheel, { passive: false });
    }
    canvas.addEventListener('wheel', handleCanvasWheel, { passive: false });
    
    // Event listeners para pan
    canvas.addEventListener('mousedown', handleCanvasPanStart);
    document.addEventListener('mousemove', handleCanvasPanMove);
    document.addEventListener('mouseup', handleCanvasPanEnd);
    
    if (wrapper) {
        wrapper.addEventListener('mousedown', handleCanvasPanStart);
    }
    
    // Prevenir zoom del navegador
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
            e.preventDefault();
        }
    });
    
    // Atajos de teclado
    document.addEventListener('keydown', function(e) {
        // No ejecutar si hay un input activo
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
        
        // No interferir con teclas de muro-hormigon
        if (e.key === 'Enter' || e.key === 'Escape') return;
        
        if (e.key === 'r' || e.key === 'R') {
            resetZoom();
        }
        if (e.key === 'f' || e.key === 'F') {
            fitToScreen();
        }
        if ((e.key === '+' || e.key === '=') && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            zoomIn();
        }
        if ((e.key === '-' || e.key === '_') && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            zoomOut();
        }
    });
    
    console.log('✅ Sistema Zoom/Pan inicializado');
    updateStatus('✅ Zoom: Rueda | Pan: Botón medio o Shift+Click | R: reset | F: ajustar');
}

// Exportar funciones y variables
window.initializeZoomPan = initializeZoomPan;
window.getCanvasCoordinates = getCanvasCoordinates;
window.resetZoom = resetZoom;
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.fitToScreen = fitToScreen;
window.applyCanvasTransform = applyCanvasTransform;

// Exportar variables de zoom como getters para acceso en tiempo real
Object.defineProperty(window, 'currentZoomLevel', {
    get: function() { return zoomLevel; }
});
Object.defineProperty(window, 'currentPanX', {
    get: function() { return panX; }
});
Object.defineProperty(window, 'currentPanY', {
    get: function() { return panY; }
});