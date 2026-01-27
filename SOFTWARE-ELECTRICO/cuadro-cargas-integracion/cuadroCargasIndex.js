// ============================================================
// CUADRO DE CARGAS INDEX - Punto de entrada principal
// Este archivo exporta todas las funciones al scope global
// ============================================================

// IMPORTANTE: Los archivos deben cargarse en este ORDEN EXACTO:
// 1. cuadroCargasCore.js
// 2. cuadroCargasUI.js
// 3. cuadroCargasArrastre.js
// 4. cuadroCargasTabla.js
// 5. cuadroCargasIntegracion.js
// 6. cuadroCargasIndex.js (este archivo)

// Exportar funciones al scope global de window
window.abrirCuadroCargas = abrirCuadroCargas;
window.cerrarCuadroCargas = cerrarCuadroCargas;
window.integrarCuadroCargasAlPlano = integrarCuadroCargasAlPlano;
window.actualizarTablaCuadroCargasModal = actualizarTablaCuadroCargasModal;
window.cambiarTamanoCuadroCargas = cambiarTamanoCuadroCargas;
window.resetTamanoCuadroCargas = resetTamanoCuadroCargas;
window.bloquearCuadroCargas = bloquearCuadroCargas;
window.eliminarCuadroCargas = eliminarCuadroCargas;

// Sobrescribir la función antigua si existe
if (typeof window.abrirCuadroCargas === 'undefined') {
    console.warn('⚠️ Función abrirCuadroCargas no está definida en Core');
}

console.log('✅ Cuadro de Cargas Sistema COMPLETO inicializado');
console.log('📦 Módulos cargados: Core, UI, Arrastre, Tabla, Integración');
console.log('🔗 Integración con cuadro-cargas-sync.js: ACTIVA');
