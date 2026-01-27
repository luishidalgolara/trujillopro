// ========================================
// MONITOR DE ZOOM - Actualiza símbolos automáticamente
// ========================================

(function() {
    let lastZoom = AppState.zoom;
    
    // Monitorear cambios en el zoom cada 100ms
    setInterval(function() {
        if (AppState.zoom !== lastZoom) {
            console.log('🔍 Zoom cambió:', lastZoom, '→', AppState.zoom);
            lastZoom = AppState.zoom;
            
            // Actualizar todos los símbolos
            if (typeof window.updateSymbolsForZoom === 'function') {
                window.updateSymbolsForZoom(AppState.zoom);
            }
        }
    }, 100);
    
    console.log('✅ Monitor de zoom inicializado');
})();