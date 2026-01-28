/* ========================================
   ESTADO Y CONTROL - MUROS DE HORMIGÓN CON VANOS
   ======================================== */

// Variables globales
let muroHormigonActivo = false;
let dibujandoMuro = false;
let puntosPolilinea = [];
let murosHormigon = [];
let puntoTemporalMouse = null;
let muroSeleccionado = null;

// Inicializar sistema de muros
function inicializarMurosHormigon() {
    console.log('✅ Sistema de muros de hormigón inicializado');
    
    // Inicializar vanos en muros existentes
    murosHormigon.forEach(muro => {
        if (!muro.vanos) {
            muro.vanos = [];
        }
    });
}

// Activar herramienta de muro de hormigón
function activarMuroHormigon() {
    console.log('🧱 activarMuroHormigon() llamada');
    muroHormigonActivo = true;
    dibujandoMuro = false;
    puntosPolilinea = [];
    puntoTemporalMouse = null;
    
    actualizarEstado('🧱 Modo: Dibujar muro - Click para agregar puntos, ENTER para finalizar');
    console.log('Estado muroHormigonActivo:', muroHormigonActivo);
}

// Desactivar herramienta
function desactivarMuroHormigon() {
    muroHormigonActivo = false;
    dibujandoMuro = false;
    puntosPolilinea = [];
    puntoTemporalMouse = null;
    
    actualizarEstado('✅ Listo para cubicar');
}

// Limpiar todos los muros
function limpiarMurosHormigon() {
    murosHormigon = [];
    puntoTemporalMouse = null;
    dibujandoMuro = false;
    puntosPolilinea = [];
    redibujarCanvas();
}

// Cancelar polilínea actual (ESCAPE)
function cancelarPolilineaActual() {
    console.log('❌ Cancelando polilínea actual');
    if (puntosPolilinea.length === 0 && !dibujandoMuro) {
        return false;
    }
    
    puntosPolilinea = [];
    puntoTemporalMouse = null;
    dibujandoMuro = false;
    redibujarCanvas();
    actualizarEstado('🧱 Polilínea cancelada - Click para iniciar nuevo muro');
    return true;
}

// Actualizar estado en la barra inferior
function actualizarEstado(mensaje) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = mensaje;
    }
}
