// ============================================================
// ESQUEMA UNIFILAR INDEX - Punto de entrada principal
// Este archivo exporta todas las funciones al scope global
// ============================================================

// IMPORTANTE: Los archivos deben cargarse en este ORDEN EXACTO:
// 1. unifilarCore.js
// 2. unifilarCalculos.js
// 3. unifilarDibujo.js
// 4. unifilarIntegracion.js
// 5. unifilarIndex.js (este archivo)

// Exportar funciones al scope global de window
window.abrirUnifilar = abrirUnifilar;
window.cerrarUnifilar = cerrarUnifilar;
window.analizarDatosUnifilar = analizarDatosUnifilar;
window.generarDiagramaUnifilar = generarDiagramaUnifilar;
window.integrarUnifilarAlPlano = integrarUnifilarAlPlano;
window.cambiarTamanoUnifilar = cambiarTamanoUnifilar;
window.resetTamanoUnifilar = resetTamanoUnifilar;
window.bloquearUnifilar = bloquearUnifilar;
window.eliminarUnifilar = eliminarUnifilar;

console.log('✅ Esquema Unifilar Sistema COMPLETO inicializado');
console.log('📦 Módulos cargados: Core, Cálculos, Dibujo, Integración');
console.log('🔗 Sincronizado con CuadroState - Generación automática ACTIVA');
