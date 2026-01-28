/* ========================================
   ESTADO Y CONTROL - MUROS DE ALBAÑILERÍA
   ======================================== */

// Variables globales
let muroAlbanileriaActivo = false;
let dibujandoMuroAlbanileria = false;
let puntosPolilineaAlbanileria = [];
let murosAlbanileria = [];
let puntoTemporalMouseAlbanileria = null;
let muroAlbanileriaSeleccionado = null;

// Inicializar sistema de muros
function inicializarMurosAlbanileria() {
    console.log('Sistema de muros de albañilería inicializado');
}

// Activar herramienta de muro de albañilería
function activarMuroAlbanileria() {
    console.log('🧱 activarMuroAlbanileria() llamada');
    muroAlbanileriaActivo = true;
    dibujandoMuroAlbanileria = false;
    puntosPolilineaAlbanileria = [];
    puntoTemporalMouseAlbanileria = null;
    
    actualizarEstadoAlbanileria('🧱 Modo: Dibujar muro albañilería - Click para agregar puntos, ENTER para finalizar');
    console.log('Estado muroAlbanileriaActivo:', muroAlbanileriaActivo);
}

// Desactivar herramienta
function desactivarMuroAlbanileria() {
    muroAlbanileriaActivo = false;
    dibujandoMuroAlbanileria = false;
    puntosPolilineaAlbanileria = [];
    puntoTemporalMouseAlbanileria = null;
    
    actualizarEstadoAlbanileria('✓ Listo para cubicar');
}

// Limpiar todos los muros
function limpiarMurosAlbanileria() {
    murosAlbanileria = [];
    puntoTemporalMouseAlbanileria = null;
    dibujandoMuroAlbanileria = false;
    puntosPolilineaAlbanileria = [];
    redibujarCanvasAlbanileria();
}

// Cancelar polilínea actual (ESCAPE)
function cancelarPolilineaAlbanileria() {
    console.log('❌ Cancelando polilínea actual');
    if (puntosPolilineaAlbanileria.length === 0 && !dibujandoMuroAlbanileria) {
        return false;
    }
    
    puntosPolilineaAlbanileria = [];
    puntoTemporalMouseAlbanileria = null;
    dibujandoMuroAlbanileria = false;
    redibujarCanvasAlbanileria();
    actualizarEstadoAlbanileria('🧱 Polilínea cancelada - Click para iniciar nuevo muro');
    return true;
}

// Actualizar estado en la barra inferior
function actualizarEstadoAlbanileria(mensaje) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = mensaje;
    }
}
