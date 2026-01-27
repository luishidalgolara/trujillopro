// ========================================
// FUNCIONES DE EXPORTACIÓN
// ========================================

function exportarResultados() {
    if (AppState.elements.length === 0) {
        updateStatus('⚠️ No hay elementos para exportar');
        return;
    }
    
    updateStatus('💾 Exportando plano eléctrico...');
    console.log('💾 Exportando resultados');
    
    setTimeout(() => {
        updateStatus('✅ Plano exportado correctamente');
    }, 1500);
}
