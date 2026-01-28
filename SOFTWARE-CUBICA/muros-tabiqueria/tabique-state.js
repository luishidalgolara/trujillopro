/* ========================================
   ESTADO Y CONTROL - TABIQUERÍA
   ======================================== */

// Variables globales
let tabiqueActivo = false;
let dibujandoTabique = false;
let puntosPolilineaTabique = [];
let tabiques = [];
let puntoTemporalMouseTabique = null;
let tabiqueSeleccionado = null;

// Inicializar sistema de tabiques
function inicializarTabiques() {
    console.log('Sistema de tabiquería inicializado');
}

// Activar herramienta de tabique
function activarTabique() {
    console.log('📏 activarTabique() llamada');
    tabiqueActivo = true;
    dibujandoTabique = false;
    puntosPolilineaTabique = [];
    puntoTemporalMouseTabique = null;
    
    actualizarEstado('📏 Modo: Dibujar tabique - Click para agregar puntos, ENTER para finalizar');
    console.log('Estado tabiqueActivo:', tabiqueActivo);
}

// Desactivar herramienta
function desactivarTabique() {
    tabiqueActivo = false;
    dibujandoTabique = false;
    puntosPolilineaTabique = [];
    puntoTemporalMouseTabique = null;
    
    actualizarEstado('✓ Listo para cubicar');
}

// Limpiar todos los tabiques
function limpiarTabiques() {
    tabiques = [];
    puntoTemporalMouseTabique = null;
    dibujandoTabique = false;
    puntosPolilineaTabique = [];
    redibujarCanvas();
}

// Cancelar polilínea actual (ESCAPE)
function cancelarPolilineaTabique() {
    console.log('❌ Cancelando polilínea actual');
    if (puntosPolilineaTabique.length === 0 && !dibujandoTabique) {
        return false;
    }
    
    puntosPolilineaTabique = [];
    puntoTemporalMouseTabique = null;
    dibujandoTabique = false;
    redibujarCanvas();
    actualizarEstado('📏 Polilínea cancelada - Click para iniciar nuevo tabique');
    return true;
}

// Actualizar estado en la barra inferior
function actualizarEstado(mensaje) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = mensaje;
    }
}