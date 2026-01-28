/* ========================================
   ESTADO Y CONTROL - RADIER
   ======================================== */
let radierActivo = false;
let dibujandoRadier = false;
let puntosPoligonoRadier = [];
let radieres = [];
let puntoTemporalMouseRadier = null;
let radierSeleccionado = null;

function inicializarRadier() {
    console.log('Sistema de radier inicializado');
}

function activarRadier() {
    console.log('🔲 activarRadier() llamada');
    radierActivo = true;
    dibujandoRadier = false;
    puntosPoligonoRadier = [];
    puntoTemporalMouseRadier = null;
    actualizarEstadoRadier('🔲 Modo: Dibujar radier - Click para agregar puntos, ENTER para cerrar polígono');
    console.log('Estado radierActivo:', radierActivo);
}

function desactivarRadier() {
    radierActivo = false;
    dibujandoRadier = false;
    puntosPoligonoRadier = [];
    puntoTemporalMouseRadier = null;
    actualizarEstadoRadier('✓ Listo para cubicar');
}

function limpiarRadieres() {
    radieres = [];
    puntoTemporalMouseRadier = null;
    dibujandoRadier = false;
    puntosPoligonoRadier = [];
    redibujarCanvasRadier();
}

function cancelarPoligonoRadier() {
    console.log('❌ cancelarPoligonoRadier() llamada');
    
    // CRÍTICO: NO cancelar si NO hay polígono en progreso
    if (puntosPoligonoRadier.length === 0 && !dibujandoRadier) {
        console.log('✓ No hay polígono en progreso, ignorando cancelación');
        return false;
    }
    
    console.log(`⚠️ Cancelando polígono con ${puntosPoligonoRadier.length} puntos`);
    puntosPoligonoRadier = [];
    puntoTemporalMouseRadier = null;
    dibujandoRadier = false;
    redibujarCanvasRadier();
    actualizarEstadoRadier('🔲 Polígono cancelado - Click para iniciar nuevo radier');
    return true;
}

function actualizarEstadoRadier(mensaje) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = mensaje;
    }
}