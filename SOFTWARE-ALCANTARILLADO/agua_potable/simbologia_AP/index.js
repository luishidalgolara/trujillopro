// ============================================================
// SIMBOLOGÍA INDEX - Punto de entrada principal
// Este archivo exporta todas las funciones al scope global
// ============================================================

// IMPORTANTE: Los archivos deben cargarse en este ORDEN EXACTO:
// 1. simbologiaCore.js
// 2. simbologiaUI.js
// 3. simbologiaArrastre.js
// 4. simbologiaTabla.js
// 5. simbologiaIntegracion.js
// 6. index.js (este archivo)

// Exportar funciones al scope global de window
window.abrirSimbologia = abrirSimbologia;
window.cerrarSimbologia = cerrarSimbologia;
window.integrarSimbologiaAlPlano = integrarSimbologiaAlPlano;
window.cambiarTamanoSimbologia = cambiarTamanoSimbologia;
window.resetTamanoSimbologia = resetTamanoSimbologia;
window.bloquearSimbologia = bloquearSimbologia;
window.eliminarSimbologia = eliminarSimbologia;
window.agregarFilaSimbologia = agregarFilaSimbologia;

console.log('✅ Simbología Sistema COMPLETO inicializado');
console.log('📦 Módulos cargados: Core, UI, Arrastre, Tabla, Integración');