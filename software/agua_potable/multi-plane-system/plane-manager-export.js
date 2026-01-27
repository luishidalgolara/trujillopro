/**
 * Funciones de exportación e importación del sistema multi-plano
 */
const PlaneManagerExport = {
    
    // Exportar todos los planos
    exportAllPlanes() {
        const data = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            planes: PlaneState.getAllPlanes().map(plane => plane.export())
        };
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `planos_${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        console.log('📥 Planos exportados');
    },
    
    // Importar planos
    importPlanes(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (!data.planes || !Array.isArray(data.planes)) {
                throw new Error('Formato inválido');
            }
            
            // Limpiar planos actuales
            PlaneState.planes = [];
            
            // Importar cada plano
            data.planes.forEach((planeData, index) => {
                const plane = new PlaneInstance(index + 1, planeData.name);
                plane.import(planeData);
                PlaneState.addPlane(plane);
            });
            
            // Activar primer plano
            if (window.PlaneManager) {
                window.PlaneManager.switchToPlane(0);
            }
            
            // Actualizar UI
            if (window.PlaneThumbnailsUI) {
                window.PlaneThumbnailsUI.refresh();
            }
            
            console.log('📤 Planos importados exitosamente');
            return true;
            
        } catch (error) {
            console.error('❌ Error al importar planos:', error);
            alert('Error al importar planos. Verifica el archivo.');
            return false;
        }
    }
};

// Exportar para uso global
window.PlaneManagerExport = PlaneManagerExport;

console.log('✅ PlaneManagerExport cargado');