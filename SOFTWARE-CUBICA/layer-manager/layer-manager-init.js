/* ========================================
   LAYER MANAGER - INICIALIZACIÓN
   ======================================== */

function inicializarLayerManager() {
    console.log('🎨 Inicializando Layer Manager...');
    
    // 1. Crear panel visual
    crearPanelCapas();
    
    // 2. Actualizar lista inicial de capas
    actualizarListaCapas();
    
    // 3. Inicializar integración con módulos existentes
    inicializarIntegracionCapas();
    
    // 4. Actualizar capas cuando se redibuja el canvas
    const originalRedibujar = window.redibujarCanvasGlobal;
    if (originalRedibujar) {
        window.redibujarCanvasGlobal = function() {
            // Actualizar lista antes de redibujar
            actualizarListaCapas();
            
            // Llamar función original
            originalRedibujar();
        };
    }
    
    console.log('✅ Layer Manager inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(inicializarLayerManager, 1000);
    });
} else {
    setTimeout(inicializarLayerManager, 1000);
}

window.inicializarLayerManager = inicializarLayerManager;

console.log('✅ Sistema de gestión de capas cargado');
