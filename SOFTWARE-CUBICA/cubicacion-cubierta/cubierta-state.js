/* ========================================
   ESTADO Y CONTROL - CUBIERTAS
   ======================================== */

// Variables globales
let cubiertaActivo = false;
let dibujandoCubierta = false;
let puntosPoligonoCubierta = [];
let cubiertas = [];
let puntoTemporalMouseCubierta = null;
let cubiertaSeleccionada = null;

// Inicializar sistema de cubiertas
function inicializarCubierta() {
    console.log('Sistema de cubiertas inicializado');
}

// Activar herramienta de cubierta
function activarCubierta() {
    console.log('🏠 activarCubierta() llamada');
    cubiertaActivo = true;
    dibujandoCubierta = false;
    puntosPoligonoCubierta = [];
    puntoTemporalMouseCubierta = null;
    
    actualizarEstadoCubierta('🏠 Modo: Dibujar cubierta - Click para agregar puntos, ENTER para cerrar polígono');
    console.log('Estado cubiertaActivo:', cubiertaActivo);
}

// Desactivar herramienta
function desactivarCubierta() {
    cubiertaActivo = false;
    dibujandoCubierta = false;
    puntosPoligonoCubierta = [];
    puntoTemporalMouseCubierta = null;
    
    actualizarEstadoCubierta('✓ Listo para cubicar');
}

// Limpiar todas las cubiertas
function limpiarCubiertas() {
    cubiertas = [];
    puntoTemporalMouseCubierta = null;
    dibujandoCubierta = false;
    puntosPoligonoCubierta = [];
    redibujarCanvasCubierta();
}

// Cancelar polígono actual (ESCAPE)
function cancelarPoligonoCubierta() {
    console.log('❌ Cancelando polígono actual');
    if (puntosPoligonoCubierta.length === 0 && !dibujandoCubierta) {
        return false;
    }
    
    puntosPoligonoCubierta = [];
    puntoTemporalMouseCubierta = null;
    dibujandoCubierta = false;
    redibujarCanvasCubierta();
    actualizarEstadoCubierta('🏠 Polígono cancelado - Click para iniciar nueva cubierta');
    return true;
}

// Actualizar estado en la barra inferior
function actualizarEstadoCubierta(mensaje) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = mensaje;
    }
}

// Función para redibujar canvas (delegación)
function redibujarCanvasCubierta() {
    if (typeof redibujarCanvasGlobal === 'function') {
        redibujarCanvasGlobal();
    }
}