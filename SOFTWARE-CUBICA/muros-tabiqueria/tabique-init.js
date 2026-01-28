/* ========================================
   INICIALIZACIÓN - TABIQUERÍA
   ======================================== */

// Exportar funciones necesarias para main.js
window.activarTabique = activarTabique;
window.desactivarTabique = desactivarTabique;
window.cerrarModalTabique = cerrarModalTabique;
window.guardarDatosTabique = guardarDatosTabique;
window.eliminarTabiqueSeleccionado = eliminarTabiqueSeleccionado;
window.actualizarMaterialesModal = actualizarMaterialesModal;
window.seleccionarSeparacion = seleccionarSeparacion;
window.limpiarTabiques = limpiarTabiques;
window.manejarClickTabique = manejarClickTabique;
window.manejarDobleclickTabique = manejarDobleclickTabique;
window.manejarMovimientoTabique = manejarMovimientoTabique;
window.manejarEnterTabique = manejarEnterTabique;
window.cancelarPolilineaTabique = cancelarPolilineaTabique;

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', inicializarTabiques);
