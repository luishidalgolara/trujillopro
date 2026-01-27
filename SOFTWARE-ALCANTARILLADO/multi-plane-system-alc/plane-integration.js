/**
 * Integración del sistema multi-plano con la aplicación de Alcantarillado
 */

window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('🚀 Iniciando integración del sistema multi-plano (Alcantarillado)...');
        
        if (window.PlaneManagerCoreAlc) {
            window.PlaneManagerCoreAlc.init();
            console.log('✅ PlaneManagerCoreAlc inicializado');
        }
        
        interceptPlaneActionsAlc();
        interceptFormatButtonsAlc();
        
        console.log('✅ Integración del sistema multi-plano completada');
    }, 1000);
});

function interceptPlaneActionsAlc() {
    if (window.appActions && window.appActions.addElement) {
        const originalAddElement = window.appActions.addElement;
        window.appActions.addElement = function(...args) {
            const result = originalAddElement.apply(this, args);
            
            if (window.PlaneManagerCoreAlc) {
                setTimeout(() => {
                    window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                }, 100);
            }
            
            return result;
        };
    }
    
    if (window.appActions && window.appActions.deleteElement) {
        const originalDeleteElement = window.appActions.deleteElement;
        window.appActions.deleteElement = function(...args) {
            const result = originalDeleteElement.apply(this, args);
            
            if (window.PlaneManagerCoreAlc) {
                setTimeout(() => {
                    window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                }, 100);
            }
            
            return result;
        };
    }
    
    console.log('✅ Acciones de plano interceptadas');
}

function interceptFormatButtonsAlc() {
    const btnA0 = document.getElementById('btnA0');
    const btnA1 = document.getElementById('btnA1');
    
    if (btnA0) {
        const originalA0Click = btnA0.onclick;
        
        btnA0.addEventListener('click', function(e) {
            console.log('📐 Formato A0 seleccionado para plano actual');
            
            if (originalA0Click) {
                originalA0Click.call(this, e);
            }
            
            setTimeout(() => {
                const currentPlane = PlaneStateAlc.getActivePlane();
                if (currentPlane) {
                    currentPlane.format = 'A0';
                    console.log(`  ✓ Formato A0 guardado en: ${currentPlane.name}`);
                }
                
                if (window.PlaneManagerCoreAlc) {
                    window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                }
            }, 100);
        }, true);
        
        console.log('✅ Botón A0 interceptado');
    }
    
    if (btnA1) {
        const originalA1Click = btnA1.onclick;
        
        btnA1.addEventListener('click', function(e) {
            console.log('📐 Formato A1 seleccionado para plano actual');
            
            if (originalA1Click) {
                originalA1Click.call(this, e);
            }
            
            setTimeout(() => {
                const currentPlane = PlaneStateAlc.getActivePlane();
                if (currentPlane) {
                    currentPlane.format = 'A1';
                    console.log(`  ✓ Formato A1 guardado en: ${currentPlane.name}`);
                }
                
                if (window.PlaneManagerCoreAlc) {
                    window.PlaneManagerCoreAlc.saveCurrentPlaneState();
                }
            }, 100);
        }, true);
        
        console.log('✅ Botón A1 interceptado');
    }
    
    if (!btnA0 && !btnA1) {
        console.warn('⚠️ No se encontraron botones de formato A0/A1');
    }
}

setInterval(() => {
    if (window.PlaneManagerCoreAlc) {
        window.PlaneManagerCoreAlc.saveCurrentPlaneState();
        console.log('💾 Auto-guardado del plano actual');
    }
}, 30000);

console.log('✅ Sistema de integración multi-plano cargado');