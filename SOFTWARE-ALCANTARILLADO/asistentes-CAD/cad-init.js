// ================================
// CAD INIT - Inicialización y API Pública
// Sistema unificado para OSNAP + ORTHO
// ================================

function inicializarAsistentesCAD() {
    console.log('🛠️ Inicializando CAD Helpers (OSNAP + ORTHO)...');
    
    // Crear indicador ORTHO
    window.ORTHOSystem.crearIndicadorOrtho();
    
    // Listener para F8
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F8') {
            e.preventDefault();
            window.ORTHOSystem.alternarModoOrtho();
        }
    });
    
    // Agregar estilos CSS
    window.CADStyles.agregarEstilosCAD();
    
    console.log('✅ CAD Helpers inicializados');
}

// ================================
// API PÚBLICA UNIFICADA
// Exportar todas las funciones bajo un solo namespace
// ================================

window.CADHelpers = {
    // OSNAP - Funciones principales
    encontrarPuntoSnap: window.OSNAPCore.encontrarPuntoSnap,
    actualizarIndicadorSnap: window.OSNAPCore.actualizarIndicadorSnap,
    ocultarIndicadorSnap: window.OSNAPCore.ocultarIndicadorSnap,
    obtenerPuntoSnap: window.OSNAPCore.obtenerPuntoSnap,
    establecerPuntoSnap: window.OSNAPCore.establecerPuntoSnap,
    limpiarPuntoSnap: window.OSNAPCore.limpiarPuntoSnap,
    estaSnapHabilitado: window.OSNAPCore.estaSnapHabilitado,
    alternarSnap: window.OSNAPCore.alternarSnap,
    agregarPuntosSnapTemporales: window.OSNAPCore.agregarPuntosSnapTemporales,
    
    // ORTHO - Funciones principales
    alternarModoOrtho: window.ORTHOSystem.alternarModoOrtho,
    aplicarRestriccionOrtho: window.ORTHOSystem.aplicarRestriccionOrtho,
    obtenerPuntoInicioOrtho: window.ORTHOSystem.obtenerPuntoInicioOrtho,
    establecerPuntoInicioOrtho: window.ORTHOSystem.establecerPuntoInicioOrtho,
    limpiarPuntoInicioOrtho: window.ORTHOSystem.limpiarPuntoInicioOrtho,
    estaOrthoActivo: window.ORTHOSystem.estaOrthoActivo,
    
    // Inicialización
    initialize: inicializarAsistentesCAD,
    
    // Aliases para compatibilidad (nombres originales en inglés)
    findSnapPoint: window.OSNAPCore.encontrarPuntoSnap,
    updateSnapIndicator: window.OSNAPCore.actualizarIndicadorSnap,
    hideSnapIndicator: window.OSNAPCore.ocultarIndicadorSnap,
    getSnapPoint: window.OSNAPCore.obtenerPuntoSnap,
    setSnapPoint: window.OSNAPCore.establecerPuntoSnap,
    clearSnapPoint: window.OSNAPCore.limpiarPuntoSnap,
    isSnapEnabled: window.OSNAPCore.estaSnapHabilitado,
    toggleSnap: window.OSNAPCore.alternarSnap,
    addTemporarySnapPoints: window.OSNAPCore.agregarPuntosSnapTemporales,
    toggleOrthoMode: window.ORTHOSystem.alternarModoOrtho,
    applyOrthoConstraint: window.ORTHOSystem.aplicarRestriccionOrtho,
    getOrthoStartPoint: window.ORTHOSystem.obtenerPuntoInicioOrtho,
    setOrthoStartPoint: window.ORTHOSystem.establecerPuntoInicioOrtho,
    clearOrthoStartPoint: window.ORTHOSystem.limpiarPuntoInicioOrtho,
    isOrthoActive: window.ORTHOSystem.estaOrthoActivo
};

// ================================
// AUTO-INICIALIZACIÓN
// ================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAsistentesCAD);
} else {
    inicializarAsistentesCAD();
}

console.log('✅ cad-init.js cargado - API CADHelpers unificada disponible');