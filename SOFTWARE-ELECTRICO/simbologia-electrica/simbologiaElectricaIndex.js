// ============================================================
// SIMBOLOGÍA ELÉCTRICA INDEX - Punto de entrada principal
// Este archivo exporta todas las funciones al scope global
// ============================================================

// IMPORTANTE: Los archivos deben cargarse en este ORDEN EXACTO:
// 1. simbologiaElectricaCore.js
// 2. simbologiaElectricaUI.js
// 3. simbologiaElectricaArrastre.js
// 4. simbologiaElectricaTabla.js
// 5. simbologiaElectricaIntegracion.js
// 6. simbologiaElectricaIndex.js (este archivo)

// Exportar funciones al scope global de window
window.abrirSimbologiaElectrica = abrirSimbologiaElectrica;
window.cerrarSimbologiaElectrica = cerrarSimbologiaElectrica;
window.integrarSimbologiaElectricaAlPlano = integrarSimbologiaElectricaAlPlano;
window.cambiarTamanoSimbologiaElectrica = cambiarTamanoSimbologiaElectrica;
window.resetTamanoSimbologiaElectrica = resetTamanoSimbologiaElectrica;
window.bloquearSimbologiaElectrica = bloquearSimbologiaElectrica;
window.eliminarSimbologiaElectrica = eliminarSimbologiaElectrica;
window.agregarFilaElectrica = agregarFilaElectrica;

console.log('✅ Simbología Eléctrica Sistema COMPLETO inicializado');
console.log('📦 Módulos cargados: Core, UI, Arrastre, Tabla, Integración');
