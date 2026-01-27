// ========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando ELEKTRA - Sistema de Diseño Eléctrico');
    
    // Inicializar el canvas
    initializeCanvas();
    
    // Inicializar el sistema de zoom/pan
    initializeZoomPan();
    
    // Configurar eventos del canvas
    setupCanvasEvents();
    
    // Configurar formato inicial
    setInitialFormat();
    
    // Mostrar mensaje de bienvenida
    updateStatus('✅ Sistema ELEKTRA listo - Selecciona una herramienta para comenzar');
    
    console.log('✅ ELEKTRA inicializado correctamente');
});

function initializeCanvas() {
    const svg = document.getElementById('plano');
    if (!svg) {
        console.error('❌ No se encontró el elemento SVG');
        return;
    }
    
    console.log('✅ Canvas SVG inicializado');
}

function setupCanvasEvents() {
    const svg = document.getElementById('plano');
    if (!svg) return;
    
    // Click en el canvas
    svg.addEventListener('click', handleCanvasClick);
    
    // Click derecho
    svg.addEventListener('contextmenu', handleCanvasRightClick);
    
    console.log('✅ Eventos del canvas configurados');
}

function setInitialFormat() {
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) return;
    
    // Formato A1 por defecto
    drawingBoard.classList.add('format-a1');
    AppState.currentFormat = 'A1';
    
    console.log('✅ Formato inicial: A1');
}