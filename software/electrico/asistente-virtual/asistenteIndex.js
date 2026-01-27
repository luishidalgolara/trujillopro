// ============================================================
// ASISTENTE VIRTUAL ELÉCTRICO - Index
// Punto de entrada principal
// ============================================================

// ORDEN DE CARGA IMPORTANTE:
// 1. asistenteKnowledge.js (base de conocimiento)
// 2. asistenteCore.js (lógica principal)
// 3. asistenteUI.js (interfaz)
// 4. asistenteIndex.js (este archivo)

// Exportar todas las funciones al scope global
window.abrirAsistente = abrirAsistente;
window.cerrarAsistente = cerrarAsistente;
window.enviarMensaje = enviarMensaje;
window.agregarMensajeUsuario = agregarMensajeUsuario;
window.agregarMensajeAsistente = agregarMensajeAsistente;
window.procesarConsulta = procesarConsulta;
window.crearBotonAsistente = crearBotonAsistente;
window.agregarBadgeAsistente = agregarBadgeAsistente;
window.removerBadgeAsistente = removerBadgeAsistente;
window.mostrarIndicadorEscritura = mostrarIndicadorEscritura;
window.ocultarIndicadorEscritura = ocultarIndicadorEscritura;

// Variables globales
window.asistenteActivo = asistenteActivo;
window.conversationHistory = conversationHistory;

console.log('✅ Asistente Virtual Eléctrico - Sistema COMPLETO inicializado');
console.log('🤖 Funciones disponibles:');
console.log('  • abrirAsistente() - Abrir modal del asistente');
console.log('  • cerrarAsistente() - Cerrar modal');
console.log('  • agregarConocimiento(categoria, clave, datos) - Agregar información');
console.log('  • agregarKeyword(palabra, categoria) - Agregar palabra clave');
console.log('  • listarConocimiento() - Ver toda la base de datos');
console.log('');
console.log('🎨 Botón flotante creado automáticamente en la esquina inferior derecha');
console.log('📚 Base de conocimiento lista para recibir información');
