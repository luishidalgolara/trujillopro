// ========================================
// FUNCIONES DE LIMPIEZA
// ========================================
function limpiarTodo() {
    if (!confirm('¿Estás seguro de que quieres limpiar todo el plano?')) {
        return;
    }
    
    const svg = document.getElementById('plano');
    
    // Remover todos los elementos excepto los básicos
    const elements = svg.querySelectorAll('.electric-symbol, line');
    elements.forEach(el => el.remove());
    
    // Limpiar trazado automático si existe
    if (typeof AutoTracer !== 'undefined' && AutoTracer.isGenerated) {
        AutoTracer.clear();
        console.log('🧹 Trazado automático limpiado');
    }
    
    // Limpiar líneas del renderizador si existe
    if (typeof LineRenderer !== 'undefined') {
        LineRenderer.clearAll();
        console.log('🧹 Líneas de trazado limpiadas');
    }
    
    // Limpiar grupo de líneas de trazado directamente del SVG
    const trazadoGroup = svg.querySelector('#trazado-lines');
    if (trazadoGroup) {
        trazadoGroup.innerHTML = '';
        console.log('🧹 Grupo de trazado limpiado');
    }
    
    // Limpiar estado
    AppState.elements = [];
    AppState.circuits = [];
    AppState.selectedElement = null;
    AppState.currentTool = null;
    
    // Limpiar Cuadro de Cargas
    if (typeof limpiarCuadroCargas === 'function') {
        limpiarCuadroCargas();
        console.log('🧹 Cuadro de Cargas limpiado');
    }
    
    // Deseleccionar herramientas
    document.querySelectorAll('.btn-tool').forEach(btn => {
        btn.classList.remove('active');
    });
    
    updateStatus('🗑️ Plano limpiado completamente (elementos + trazado)');
    console.log('✅ Todo limpiado: elementos y trazado');
}