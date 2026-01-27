// ========================================
// MANEJO DE TECLAS
// ========================================
function handleKeyPress(event) {
    // ESC - Deseleccionar herramienta
    if (event.key === 'Escape') {
        AppState.currentTool = null;
        AppState.selectedElement = null;
        document.querySelectorAll('.btn-tool').forEach(btn => {
            btn.classList.remove('active');
        });
        updateStatus('❌ Herramienta deseleccionada - Presiona ESC para cancelar');
        console.log('❌ Herramienta deseleccionada');
    }
    
    // Delete - Eliminar elemento seleccionado
    if (event.key === 'Delete' && AppState.selectedElement) {
        // Eliminar elemento del DOM
        AppState.selectedElement.remove();
        
        // Eliminar del estado
        AppState.elements = AppState.elements.filter(el => el.element !== AppState.selectedElement);
        
        AppState.selectedElement = null;
        
        // Si hay trazado generado, limpiarlo para que el usuario lo regenere
        if (typeof AutoTracer !== 'undefined' && AutoTracer.isGenerated) {
            AutoTracer.clear();
            updateStatus('🗑️ Elemento eliminado - Regenera el trazado si es necesario');
            console.log('⚠️ Trazado limpiado - elemento eliminado');
        } else {
            updateStatus('🗑️ Elemento eliminado');
        }
        
        console.log('🗑️ Elemento eliminado con DELETE');
    }
    
    // Ctrl+Z - Deshacer (simulado)
    if (event.ctrlKey && event.key === 'z') {
        console.log('↩️ Deshacer (funcionalidad pendiente)');
        updateStatus('↩️ Deshacer - Funcionalidad en desarrollo');
    }
    
    // Ctrl+S - Guardar
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        exportarResultados();
        console.log('💾 Guardando proyecto...');
    }
}

// ========================================
// CONECTAR EVENT LISTENER
// ========================================
document.addEventListener('keydown', handleKeyPress);

console.log('✅ Manejador de teclas activado - ESC para deseleccionar, DELETE para eliminar');