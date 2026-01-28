/* ========================================
   INICIALIZACIÓN - CUBIERTAS
   ======================================== */

// Exportar funciones necesarias para main.js
window.activarCubierta = activarCubierta;
window.desactivarCubierta = desactivarCubierta;
window.cerrarModalCubierta = cerrarModalCubierta;
window.guardarDatosCubierta = guardarDatosCubierta;
window.eliminarCubiertaSeleccionada = eliminarCubiertaSeleccionada;
window.calcularCubiertaCompleto = calcularCubiertaCompleto;
window.seleccionarTipoCubierta = seleccionarTipoCubierta;
window.actualizarPendienteDesdeP = actualizarPendienteDesdeP;
window.actualizarPendienteDesdeG = actualizarPendienteDesdeG;
window.limpiarCubiertas = limpiarCubiertas;
window.manejarClickCubierta = manejarClickCubierta;
window.manejarDobleclickCubierta = manejarDobleclickCubierta;
window.manejarMovimientoCubierta = manejarMovimientoCubierta;
window.manejarEnterCubierta = manejarEnterCubierta;
window.cancelarPoligonoCubierta = cancelarPoligonoCubierta;
window.dibujarCubiertasEnCanvas = dibujarCubiertasEnCanvas;

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', inicializarCubierta);
