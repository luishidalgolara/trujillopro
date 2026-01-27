/**
 * Herramientas de debugging para sistema multi-plano
 */
const PlaneDebugAlc = {
    
    logCurrentState() {
        console.group('📊 Estado Actual del Sistema Multi-Plano');
        
        const currentPlane = PlaneStateAlc.getActivePlane();
        console.log('Plano Activo:', currentPlane ? currentPlane.name : 'NINGUNO');
        console.log('Total Planos:', PlaneStateAlc.planes.length);
        console.log('Formato Actual:', currentPlane ? currentPlane.format : 'N/A');
        
        // Verificar elementos en DOM
        const drawingBoard = document.getElementById('drawingBoard');
        if (drawingBoard) {
            const vineta = drawingBoard.querySelector('#vinetaWindow');
            const simbologias = drawingBoard.querySelectorAll('.simbologia-integrada');
            const cuadrosPiezas = drawingBoard.querySelectorAll('.cuadro-piezas-integrado');
            const isometricos = drawingBoard.querySelectorAll('[id*="integratedIsometric"]');
            
            console.log('Elementos en DOM:');
            console.log('  - Viñeta:', vineta ? 'SÍ' : 'NO');
            console.log('  - Simbologías:', simbologias.length);
            console.log('  - Cuadros Piezas:', cuadrosPiezas.length);
            console.log('  - Isométricos:', isometricos.length);
        }
        
        // Verificar elementos guardados
        if (currentPlane && currentPlane.elementosIntegrados) {
            console.log('Elementos Guardados:');
            console.log('  - Viñeta:', currentPlane.elementosIntegrados.vineta ? 'SÍ' : 'NO');
            console.log('  - Simbologías:', currentPlane.elementosIntegrados.simbologia.length);
            console.log('  - Cuadros Piezas:', currentPlane.elementosIntegrados.cuadroPiezas.length);
        }
        
        console.groupEnd();
    },
    
    verifyPlaneIsolation() {
        console.group('🔍 Verificación de Aislamiento de Planos');
        
        PlaneStateAlc.planes.forEach((plane, index) => {
            console.log(`\nPlano ${index + 1}: ${plane.name}`);
            console.log('  - ID:', plane.id);
            console.log('  - Elementos:', plane.elements.length);
            console.log('  - Formato:', plane.format);
            
            if (plane.elementosIntegrados) {
                const total = 
                    plane.elementosIntegrados.simbologia.length +
                    plane.elementosIntegrados.cuadroPiezas.length +
                    (plane.elementosIntegrados.vineta ? 1 : 0);
                console.log('  - Elementos Integrados:', total);
            }
        });
        
        console.groupEnd();
    },
    
    clearAllPlanes() {
        if (confirm('⚠️ Esto eliminará TODOS los planos excepto el primero. ¿Continuar?')) {
            while (PlaneStateAlc.planes.length > 1) {
                PlaneStateAlc.planes.pop();
            }
            
            PlaneStateAlc.activePlaneId = PlaneStateAlc.planes[0].id;
            
            if (window.PlaneManagerStateAlc) {
                window.PlaneManagerStateAlc.loadPlaneState(PlaneStateAlc.planes[0]);
            }
            
            if (window.PlaneThumbnailsUIAlc) {
                window.PlaneThumbnailsUIAlc.renderThumbnails();
            }
            
            console.log('✅ Todos los planos eliminados excepto el primero');
        }
    }
};

// Exponer para debugging en consola
window.PlaneDebugAlc = PlaneDebugAlc;
window.debugPlanes = () => PlaneDebugAlc.logCurrentState();
window.verifyPlanes = () => PlaneDebugAlc.verifyPlaneIsolation();

console.log('✅ PlaneDebugAlc cargado');
console.log('💡 Usa debugPlanes() o verifyPlanes() en consola para debugging');