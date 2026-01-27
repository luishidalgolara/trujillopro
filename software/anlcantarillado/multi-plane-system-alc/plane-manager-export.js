/**
 * Funciones de exportación e importación de planos
 */
const PlaneManagerExportAlc = {
    
    exportAllPlanes() {
        try {
            if (window.PlaneManagerStateAlc) {
                window.PlaneManagerStateAlc.saveCurrentPlaneState();
            }
            
            const exportData = {
                version: '1.0',
                projectType: 'alcantarillado',
                exportDate: new Date().toISOString(),
                planes: PlaneStateAlc.planes.map(p => p.toJSON())
            };
            
            const jsonString = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `proyecto-alcantarillado-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('✅ Proyecto exportado exitosamente');
            alert('✅ Proyecto exportado exitosamente');
            
        } catch (error) {
            console.error('❌ Error al exportar proyecto:', error);
            alert('❌ Error al exportar el proyecto');
        }
    },
    
    importPlanes(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const importData = JSON.parse(e.target.result);
                
                if (!importData.planes || !Array.isArray(importData.planes)) {
                    throw new Error('Formato de archivo inválido');
                }
                
                if (importData.projectType !== 'alcantarillado') {
                    const confirmacion = confirm('Este archivo no es de un proyecto de Alcantarillado. ¿Deseas importarlo de todas formas?');
                    if (!confirmacion) return;
                }
                
                PlaneStateAlc.planes = [];
                
                importData.planes.forEach(planeData => {
                    const plane = PlaneInstanceAlc.fromJSON(planeData);
                    PlaneStateAlc.planes.push(plane);
                });
                
                if (PlaneStateAlc.planes.length > 0) {
                    PlaneStateAlc.activePlaneId = PlaneStateAlc.planes[0].id;
                    
                    if (window.PlaneThumbnailsUIAlc) {
                        window.PlaneThumbnailsUIAlc.renderThumbnails();
                    }
                    
                    if (window.PlaneManagerCoreAlc) {
                        window.PlaneManagerCoreAlc.switchToPlane(PlaneStateAlc.planes[0].id);
                    }
                }
                
                console.log(`✅ ${PlaneStateAlc.planes.length} plano(s) importado(s)`);
                alert(`✅ Proyecto importado: ${PlaneStateAlc.planes.length} plano(s)`);
                
            } catch (error) {
                console.error('❌ Error al importar proyecto:', error);
                alert('❌ Error al importar el proyecto. Verifica el archivo.');
            }
        };
        
        reader.readAsText(file);
    }
};

window.PlaneManagerExportAlc = PlaneManagerExportAlc;

console.log('✅ PlaneManagerExportAlc cargado');