/* INICIALIZACIÓN AUTOMÁTICA */

(function() {
    console.log('🌊 Módulo Simulador de Terremoto cargado');

    // Esperar a que el modal 3D esté disponible
    function inicializarSimulador() {
        // Verificar dependencias
        if (typeof vista3DState === 'undefined') {
            console.error('❌ vista3DState no encontrado. Asegúrate de cargar vista-3d-state.js primero');
            return;
        }

        if (typeof THREE === 'undefined') {
            console.error('❌ Three.js no encontrado. Asegúrate de cargar Three.js primero');
            return;
        }

        // Inyectar panel cuando se abra el modal 3D
        const abrirVista3DOriginal = window.abrirVista3D;
        if (abrirVista3DOriginal) {
            window.abrirVista3D = function() {
                abrirVista3DOriginal();
                
                // Crear panel después de un pequeño delay
                setTimeout(() => {
                    if (!EarthquakeUI.panelCreado) {
                        EarthquakeUI.crearPanel();
                    }
                }, 200);
            };
        }

        console.log('✅ Simulador de Terremoto inicializado correctamente');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarSimulador);
    } else {
        inicializarSimulador();
    }
})();
