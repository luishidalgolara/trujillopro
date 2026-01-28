/* ========================================
   ESTADO Y CONTROL - MUROS ESTRUCTURALES
   ======================================== */

// Variables globales
let muroEstructuralActivo = false;
let dibujandoMuroEstructural = false;
let puntosPolilineaEstructural = [];
let murosEstructurales = [];
let puntoTemporalMouseEstructural = null;
let muroEstructuralSeleccionado = null;

// Inicializar sistema de muros estructurales
function inicializarMurosEstructurales() {
    console.log('Sistema de muros estructurales inicializado');
}

// Activar herramienta de muro estructural
function activarMuroEstructural() {
    console.log('🏗️ activarMuroEstructural() llamada');
    muroEstructuralActivo = true;
    dibujandoMuroEstructural = false;
    puntosPolilineaEstructural = [];
    puntoTemporalMouseEstructural = null;
    
    actualizarEstado('🏗️ Modo: Dibujar muro estructural - Click para agregar puntos, ENTER para finalizar');
    console.log('Estado muroEstructuralActivo:', muroEstructuralActivo);
}

// Desactivar herramienta
function desactivarMuroEstructural() {
    muroEstructuralActivo = false;
    dibujandoMuroEstructural = false;
    puntosPolilineaEstructural = [];
    puntoTemporalMouseEstructural = null;
    
    actualizarEstado('✓ Listo para cubicar');
}

// Limpiar todos los muros estructurales
function limpiarMurosEstructurales() {
    murosEstructurales = [];
    puntoTemporalMouseEstructural = null;
    dibujandoMuroEstructural = false;
    puntosPolilineaEstructural = [];
    redibujarCanvas();
}

// Cancelar polilínea actual (ESCAPE)
function cancelarPolilineaEstructural() {
    console.log('❌ Cancelando polilínea actual');
    if (puntosPolilineaEstructural.length === 0 && !dibujandoMuroEstructural) {
        return false;
    }
    
    puntosPolilineaEstructural = [];
    puntoTemporalMouseEstructural = null;
    dibujandoMuroEstructural = false;
    redibujarCanvas();
    actualizarEstado('🏗️ Polilínea cancelada - Click para iniciar nuevo muro estructural');
    return true;
}

// Actualizar estado en la barra inferior
function actualizarEstado(mensaje) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = mensaje;
    }
}