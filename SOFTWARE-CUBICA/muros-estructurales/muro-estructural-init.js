/* ========================================
   INICIALIZACIÓN - MUROS ESTRUCTURALES
   ======================================== */

// Exportar funciones necesarias para main.js
window.activarMuroEstructural = activarMuroEstructural;
window.desactivarMuroEstructural = desactivarMuroEstructural;
window.cerrarModalMuroEstructural = cerrarModalMuroEstructural;
window.guardarDatosMuroEstructural = guardarDatosMuroEstructural;
window.eliminarMuroEstructuralSeleccionado = eliminarMuroEstructuralSeleccionado;
window.actualizarMaterialesEstructural = actualizarMaterialesEstructural;
window.seleccionarEspesor = seleccionarEspesor;
window.limpiarMurosEstructurales = limpiarMurosEstructurales;
window.manejarClickMuroEstructural = manejarClickMuroEstructural;
window.manejarDobleclickMuroEstructural = manejarDobleclickMuroEstructural;
window.manejarMovimientoMuroEstructural = manejarMovimientoMuroEstructural;
window.manejarEnterMuroEstructural = manejarEnterMuroEstructural;
window.cancelarPolilineaEstructural = cancelarPolilineaEstructural;

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', inicializarMurosEstructurales);