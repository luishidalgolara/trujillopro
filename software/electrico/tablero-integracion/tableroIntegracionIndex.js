// ============================================================
// TABLERO INTEGRACIÓN INDEX - Punto de entrada principal
// Este archivo exporta todas las funciones al scope global
// ============================================================

// IMPORTANTE: Los archivos deben cargarse en este ORDEN EXACTO:
// 1. tableroIntegracionCore.js
// 2. tableroIntegracionUI.js
// 3. tableroIntegracionIndex.js (este archivo)

// Exportar funciones al scope global de window
window.integrarTableroAlPlano = integrarTableroAlPlano;
window.cambiarTamanoTablero = cambiarTamanoTablero;
window.resetTamanoTablero = resetTamanoTablero;
window.bloquearTablero = bloquearTablero;
window.eliminarTablero = eliminarTablero;

console.log('✅ Tablero Integración Sistema COMPLETO inicializado');
console.log('📦 Módulos cargados: Core, UI');
console.log('🔗 Integración con tablero-integration.js: ACTIVA');
