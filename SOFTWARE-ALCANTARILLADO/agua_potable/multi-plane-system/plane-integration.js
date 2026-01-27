/**
 * Integración del sistema multi-plano con la aplicación existente
 */

// Auto-inicializar cuando la página cargue completamente
window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('🚀 Iniciando integración del sistema multi-plano...');
        
        // Inicializar PlaneManager
        if (window.PlaneManager) {
            window.PlaneManager.init();
            console.log('✅ PlaneManager inicializado');
        }
        
        // Interceptar acciones que afecten el estado del plano
        interceptPlaneActions();
        
        // Interceptar botones de formato A0/A1
        interceptFormatButtons();
        
        console.log('✅ Integración del sistema multi-plano completada');
    }, 1000);
});

// Interceptar acciones importantes
function interceptPlaneActions() {
    // Interceptar cuando se agregan elementos
    if (window.appActions && window.appActions.addElement) {
        const originalAddElement = window.appActions.addElement;
        window.appActions.addElement = function(...args) {
            const result = originalAddElement.apply(this, args);
            
            // Guardar estado después de agregar elemento
            if (window.PlaneManager) {
                setTimeout(() => {
                    window.PlaneManager.saveCurrentPlaneState();
                }, 100);
            }
            
            return result;
        };
    }
    
    // Interceptar cuando se eliminan elementos
    if (window.appActions && window.appActions.deleteElement) {
        const originalDeleteElement = window.appActions.deleteElement;
        window.appActions.deleteElement = function(...args) {
            const result = originalDeleteElement.apply(this, args);
            
            // Guardar estado después de eliminar elemento
            if (window.PlaneManager) {
                setTimeout(() => {
                    window.PlaneManager.saveCurrentPlaneState();
                }, 100);
            }
            
            return result;
        };
    }
    
    console.log('✅ Acciones de plano interceptadas');
}

// ✅ NUEVA FUNCIÓN: Interceptar botones de formato A0/A1
function interceptFormatButtons() {
    const btnA0 = document.getElementById('btnA0');
    const btnA1 = document.getElementById('btnA1');
    
    if (btnA0) {
        // Guardar el handler original si existe
        const originalA0Click = btnA0.onclick;
        
        btnA0.addEventListener('click', function(e) {
            console.log('📐 Formato A0 seleccionado para plano actual');
            
            // Ejecutar lógica original si existe
            if (originalA0Click) {
                originalA0Click.call(this, e);
            }
            
            // Guardar formato en el plano actual
            setTimeout(() => {
                const currentPlane = window.PlaneManager.getActivePlane();
                if (currentPlane) {
                    currentPlane.format = 'A0';
                    console.log(`  ✓ Formato A0 guardado en: ${currentPlane.name}`);
                }
                
                // Guardar estado completo
                if (window.PlaneManager) {
                    window.PlaneManager.saveCurrentPlaneState();
                }
            }, 100);
        }, true); // ✅ useCapture = true para capturar antes
        
        console.log('✅ Botón A0 interceptado');
    }
    
    if (btnA1) {
        // Guardar el handler original si existe
        const originalA1Click = btnA1.onclick;
        
        btnA1.addEventListener('click', function(e) {
            console.log('📐 Formato A1 seleccionado para plano actual');
            
            // Ejecutar lógica original si existe
            if (originalA1Click) {
                originalA1Click.call(this, e);
            }
            
            // Guardar formato en el plano actual
            setTimeout(() => {
                const currentPlane = window.PlaneManager.getActivePlane();
                if (currentPlane) {
                    currentPlane.format = 'A1';
                    console.log(`  ✓ Formato A1 guardado en: ${currentPlane.name}`);
                }
                
                // Guardar estado completo
                if (window.PlaneManager) {
                    window.PlaneManager.saveCurrentPlaneState();
                }
            }, 100);
        }, true); // ✅ useCapture = true para capturar antes
        
        console.log('✅ Botón A1 interceptado');
    }
    
    if (!btnA0 && !btnA1) {
        console.warn('⚠️ No se encontraron botones de formato A0/A1');
    }
}

// Guardar estado cada 30 segundos (auto-save)
setInterval(() => {
    if (window.PlaneManager) {
        window.PlaneManager.saveCurrentPlaneState();
        console.log('💾 Auto-guardado del plano actual');
    }
}, 30000);

console.log('✅ Sistema de integración multi-plano cargado');