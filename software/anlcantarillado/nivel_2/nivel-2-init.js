document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando sistema de 2° nivel...');
    
    // ❌ ELIMINADO: Ya no interceptamos addTracingElement
    // El nivel se maneja en selectTool() y handleTracingClick()
    
    setTimeout(() => {
        console.log('✅ Sistema de 2° nivel activado (sin interceptación)');
        showStatus('✅ Sistema de 2 niveles activado', 2000);
    }, 500);
});

console.log('✅ nivel-2-init.js cargado');