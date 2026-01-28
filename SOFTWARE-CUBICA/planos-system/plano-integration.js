/**
 * Integración con la aplicación de cubicación
 */

window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('🚀 Iniciando integración del sistema multi-plano...');
        
        if (window.PlanoManager) {
            window.PlanoManager.init();
            console.log('✅ PlanoManager inicializado');
        }
        
        interceptFormatButtons();
        
        console.log('✅ Integración completada');
    }, 1000);
});

function interceptFormatButtons() {
    const btnA0 = document.getElementById('btnA0');
    const btnA1 = document.getElementById('btnA1');
    
    if (btnA0) {
        btnA0.addEventListener('click', function(e) {
            setTimeout(() => {
                const currentPlano = window.PlanoManager.getActivePlano();
                if (currentPlano) {
                    currentPlano.format = 'A0';
                    console.log(`✓ Formato A0 guardado en: ${currentPlano.name}`);
                }
                
                if (window.PlanoManager) {
                    window.PlanoManager.saveCurrentPlanoState();
                }
            }, 100);
        }, true);
    }
    
    if (btnA1) {
        btnA1.addEventListener('click', function(e) {
            setTimeout(() => {
                const currentPlano = window.PlanoManager.getActivePlano();
                if (currentPlano) {
                    currentPlano.format = 'A1';
                    console.log(`✓ Formato A1 guardado en: ${currentPlano.name}`);
                }
                
                if (window.PlanoManager) {
                    window.PlanoManager.saveCurrentPlanoState();
                }
            }, 100);
        }, true);
    }
}

// Auto-guardado cada 30 segundos
setInterval(() => {
    if (window.PlanoManager) {
        window.PlanoManager.saveCurrentPlanoState();
        console.log('💾 Auto-guardado del plano actual');
    }
}, 30000);
