/* ========================================
   INICIALIZACIÓN - MUROS DE HORMIGÓN
   ======================================== */

// Exportar funciones necesarias para main.js
window.activarMuroHormigon = activarMuroHormigon;
window.desactivarMuroHormigon = desactivarMuroHormigon;
window.cerrarModalMuroHormigon = cerrarModalMuroHormigon;
window.guardarDatosMuro = guardarDatosMuro;
window.eliminarMuroSeleccionado = eliminarMuroSeleccionado;
window.actualizarVolumenModal = actualizarVolumenModal;
window.limpiarMurosHormigon = limpiarMurosHormigon;
window.manejarClickMuroHormigon = manejarClickMuroHormigon;
window.manejarDobleclickMuroHormigon = manejarDobleclickMuroHormigon;
window.manejarMovimientoMuroHormigon = manejarMovimientoMuroHormigon;
window.manejarEnterMuroHormigon = manejarEnterMuroHormigon;
window.cancelarPolilineaActual = cancelarPolilineaActual;
window.toggleAberturaFields = toggleAberturaFields;

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', inicializarMurosHormigon);