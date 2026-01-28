/* ========================================
   INICIALIZACIÓN - SISTEMA DE VANOS
   ======================================== */

(function() {
    console.log('🏗️ Inicializando sistema de VANOS...');
    
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarSistemaVanos);
    } else {
        inicializarSistemaVanos();
    }
})();

function inicializarSistemaVanos() {
    console.log('✅ Sistema de vanos: Integrando con canvas...');
    
    // Integrar eventos de canvas
    integrarVanosEnCanvas();
    
    // Integrar teclas
    integrarVanosTeclas();
    
    // Integrar dibujo 2D
    integrarVanosEnDibujo();
    
    // Integrar construcción 3D
    integrarVanosEn3D();
    
    // Agregar botón en modal de muros
    agregarBotonVanosEnModal();
    
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
    
    console.log('✅ Sistema de vanos completamente integrado');
    console.log('   - Detección de doble click: ✓');
    console.log('   - Modal de vanos: ✓');
    console.log('   - Colocación visual: ✓');
    console.log('   - Integración 2D: ✓');
    console.log('   - Integración 3D: ✓');
    console.log('   - Cálculo de volúmenes: ✓');
}

// Exportar función de inicialización
window.inicializarSistemaVanos = inicializarSistemaVanos;