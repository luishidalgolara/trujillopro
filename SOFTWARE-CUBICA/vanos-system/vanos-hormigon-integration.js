/* ========================================
   INTEGRACIÓN VANOS - HORMIGÓN
   ======================================== */

(function() {
    console.log('🔌 Integrando sistema de vanos con muros de hormigón...');
    
    // Esperar a que todo esté cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarIntegracionVanos);
    } else {
        iniciarIntegracionVanos();
    }
})();

function iniciarIntegracionVanos() {
    console.log('✅ Iniciando integración de vanos...');
    
    // Verificar que el sistema de vanos esté disponible
    if (typeof vanosState === 'undefined') {
        console.error('❌ Sistema de vanos no encontrado');
        return;
    }
    
    // Interceptar tecla ESCAPE para cancelar colocación
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && vanosState.modoColocacion) {
            cancelarColocacionVano();
        }
    });
    
    // Cambiar cursor cuando esté en modo colocación
    setInterval(() => {
        const canvas = document.getElementById('mainCanvas');
        if (canvas) {
            if (vanosState.modoColocacion) {
                canvas.classList.add('modo-vanos');
            } else {
                canvas.classList.remove('modo-vanos');
            }
        }
    }, 100);
    
    console.log('✅ Integración de vanos completada');
}

// Callback después de confirmar vano
window.vanosCallbackHormigon = function() {
    console.log('✅ Vano confirmado en muro de hormigón');
    
    // Reabrir modal del muro para ver el resultado
    if (muroSeleccionado) {
        setTimeout(() => {
            abrirModalMuroHormigon(muroSeleccionado);
        }, 300);
    }
};
