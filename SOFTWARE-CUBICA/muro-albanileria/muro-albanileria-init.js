/* ========================================
   INICIALIZACIÓN - MUROS DE ALBAÑILERÍA
   ======================================== */

// Exportar funciones necesarias para main.js
window.activarMuroAlbanileria = activarMuroAlbanileria;
window.desactivarMuroAlbanileria = desactivarMuroAlbanileria;
window.cerrarModalMuroAlbanileria = cerrarModalMuroAlbanileria;
window.guardarDatosMuroAlbanileria = guardarDatosMuroAlbanileriaDinamico;
window.eliminarMuroAlbanileriaSeleccionado = eliminarMuroAlbanileriaSeleccionado;
window.limpiarMurosAlbanileria = limpiarMurosAlbanileria;
window.manejarClickMuroAlbanileria = manejarClickMuroAlbanileria;
window.manejarDobleclickMuroAlbanileria = manejarDobleclickMuroAlbanileria;
window.manejarMovimientoMuroAlbanileria = manejarMovimientoMuroAlbanileria;
window.manejarEnterMuroAlbanileria = manejarEnterMuroAlbanileria;
window.cancelarPolilineaAlbanileria = cancelarPolilineaAlbanileria;
window.toggleAberturaFieldsAlbanileria = toggleAberturaFieldsAlbanileriaDinamico;
window.calcularAlbanileriaCompleto = calcularAlbanileriaCompleto;

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', inicializarMurosAlbanileria);