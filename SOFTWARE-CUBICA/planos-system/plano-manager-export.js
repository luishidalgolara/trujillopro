/**
 * Exportación e Importación de Planos
 */
const PlanoManagerExport = {
    
    exportAllPlanos() {
        const data = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            planos: PlanoState.getAllPlanos().map(plano => plano.export())
        };
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `cubicacion_planos_${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        console.log('📥 Planos exportados');
    },
    
    importPlanos(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (!data.planos || !Array.isArray(data.planos)) {
                throw new Error('Formato inválido');
            }
            
            PlanoState.planos = [];
            
            data.planos.forEach((planoData, index) => {
                const plano = new PlanoInstance(index + 1, planoData.name);
                plano.import(planoData);
                PlanoState.addPlano(plano);
            });
            
            if (window.PlanoManager) {
                window.PlanoManager.switchToPlano(0);
            }
            
            if (window.PlanoThumbnailsUI) {
                window.PlanoThumbnailsUI.refresh();
            }
            
            console.log('📤 Planos importados');
            return true;
            
        } catch (error) {
            console.error('❌ Error al importar:', error);
            alert('Error al importar planos');
            return false;
        }
    }
};

window.PlanoManagerExport = PlanoManagerExport;
