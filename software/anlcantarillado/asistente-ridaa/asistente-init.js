/**
 * ============================================
 * ASISTENTE RIDAA - INICIALIZACIÓN
 * Punto de entrada del sistema
 * ============================================
 */

(function() {
    'use strict';

    function initAsistenteRIDAA() {
        console.log('🤖 Inicializando Asistente RIDAA...');

        // Inicializar Core (carga FAQs)
        AsistenteCore.init();

        // Inicializar UI
        AsistenteUI.init();

        console.log('✅ Asistente RIDAA listo con FAQs integrados');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAsistenteRIDAA);
    } else {
        initAsistenteRIDAA();
    }

})();