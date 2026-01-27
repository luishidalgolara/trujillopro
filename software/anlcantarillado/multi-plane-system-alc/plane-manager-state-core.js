/**
 * Módulo principal del sistema de gestión de estado de planos
 * Integra los módulos de guardado, carga y controles
 */

const PlaneManagerStateAlc = {
    
    /**
     * Guarda el estado completo del plano activo
     */
    saveCurrentPlaneState() {
        if (window.PlaneManagerStateSaveAlc) {
            window.PlaneManagerStateSaveAlc.saveCurrentPlaneState();
        } else {
            console.error('❌ PlaneManagerStateSaveAlc no está cargado');
        }
    },
    
    /**
     * Carga el estado completo de un plano
     * @param {Object} plane - Objeto del plano a cargar
     */
    loadPlaneState(plane) {
        if (window.PlaneManagerStateLoadAlc) {
            window.PlaneManagerStateLoadAlc.loadPlaneState(plane);
        } else {
            console.error('❌ PlaneManagerStateLoadAlc no está cargado');
        }
    },
    
    /**
     * Re-inicializa los controles de elementos integrados
     */
    reinicializarControlesIntegrados() {
        if (window.PlaneManagerStateControlsAlc) {
            window.PlaneManagerStateControlsAlc.reinicializarControlesIntegrados();
        } else {
            console.error('❌ PlaneManagerStateControlsAlc no está cargado');
        }
    }
};

// Exportar al scope global
window.PlaneManagerStateAlc = PlaneManagerStateAlc;

console.log('✅ PlaneManagerStateAlc (Core) cargado e integrado');
console.log('   📦 Módulos disponibles:');
console.log('   - PlaneManagerStateSaveAlc:', !!window.PlaneManagerStateSaveAlc);
console.log('   - PlaneManagerStateLoadAlc:', !!window.PlaneManagerStateLoadAlc);
console.log('   - PlaneManagerStateControlsAlc:', !!window.PlaneManagerStateControlsAlc);