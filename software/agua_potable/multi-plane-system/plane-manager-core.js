/**
 * Gestor principal del sistema multi-plano (Core)
 */
const PlaneManager = {
    initialized: false,
    
    // Inicializar sistema
    init() {
        if (this.initialized) {
            console.warn('⚠️ PlaneManager ya fue inicializado');
            return;
        }
        
        console.log('🚀 Inicializando sistema multi-plano...');
        
        // Crear primer plano por defecto
        this.createPlane('Plano Principal');
        
        // Inicializar UI de thumbnails
        if (window.PlaneThumbnailsUI) {
            window.PlaneThumbnailsUI.init();
        }
        
        this.initialized = true;
        console.log('✅ Sistema multi-plano inicializado');
    },
    
    // Crear nuevo plano
    createPlane(name = null) {
        if (!PlaneState.canAddPlane()) {
            console.warn('⚠️ Límite de planos alcanzado (máximo 10)');
            alert('Has alcanzado el límite máximo de 10 planos');
            return null;
        }
        
        const newId = PlaneState.getPlaneCount() + 1;
        const planeName = name || `Plano ${newId}`;
        const newPlane = new PlaneInstance(newId, planeName);
        
        PlaneState.addPlane(newPlane);
        
        console.log(`✅ Plano creado: ${planeName} (ID: ${newId})`);
        
        // Actualizar UI
        if (window.PlaneThumbnailsUI) {
            window.PlaneThumbnailsUI.refresh();
        }
        
        // Si es el único plano, activarlo
        if (PlaneState.getPlaneCount() === 1) {
            this.switchToPlane(0);
        }
        
        return newPlane;
    },
    
    // Eliminar plano
    deletePlane(index) {
        if (PlaneState.getPlaneCount() <= 1) {
            alert('No puedes eliminar el último plano');
            return false;
        }
        
        const plane = PlaneState.getAllPlanes()[index];
        if (!plane) {
            return false;
        }
        
        if (confirm(`¿Estás seguro de eliminar "${plane.name}"?`)) {
            PlaneState.removePlane(index);
            
            console.log(`🗑️ Plano eliminado: ${plane.name}`);
            
            // Actualizar UI
            if (window.PlaneThumbnailsUI) {
                window.PlaneThumbnailsUI.refresh();
            }
            
            // Cambiar al plano activo ajustado
            this.switchToPlane(PlaneState.activePlaneIndex);
            
            return true;
        }
        
        return false;
    },
    
    // Cambiar a un plano específico
    switchToPlane(index) {
        const plane = PlaneState.getAllPlanes()[index];
        if (!plane) {
            console.error(`❌ Plano con índice ${index} no existe`);
            return false;
        }
        
        // Guardar estado del plano actual antes de cambiar
        this.saveCurrentPlaneState();
        
        // Cambiar plano activo
        PlaneState.setActivePlane(index);
        
        console.log(`🔄 Cambiando a: ${plane.name} (ID: ${plane.id})`);
        
        // Cargar estado del nuevo plano activo
        this.loadPlaneState(plane);
        
        // Actualizar UI
        if (window.PlaneThumbnailsUI) {
            window.PlaneThumbnailsUI.updateActiveIndicator(index);
        }
        
        return true;
    },
    
    // Duplicar plano
    duplicatePlane(index) {
        const originalPlane = PlaneState.getAllPlanes()[index];
        if (!originalPlane) return null;
        
        if (!PlaneState.canAddPlane()) {
            alert('Has alcanzado el límite máximo de 10 planos');
            return null;
        }
        
        const newId = PlaneState.getPlaneCount() + 1;
        const duplicatedPlane = originalPlane.clone(newId);
        
        // Copiar también el SVG visual y elementos integrados
        duplicatedPlane.svgInnerHTML = originalPlane.svgInnerHTML;
        duplicatedPlane.elementosIntegrados = JSON.parse(JSON.stringify(originalPlane.elementosIntegrados || {}));
        
        PlaneState.addPlane(duplicatedPlane);
        
        console.log(`📋 Plano duplicado: ${duplicatedPlane.name}`);
        
        // Actualizar UI
        if (window.PlaneThumbnailsUI) {
            window.PlaneThumbnailsUI.refresh();
        }
        
        return duplicatedPlane;
    },
    
    // Renombrar plano
    renamePlane(index, newName) {
        const plane = PlaneState.getAllPlanes()[index];
        if (plane && newName && newName.trim()) {
            plane.name = newName.trim();
            plane.updateLastModified();
            
            // Actualizar UI
            if (window.PlaneThumbnailsUI) {
                window.PlaneThumbnailsUI.refresh();
            }
            
            return true;
        }
        return false;
    },
    
    // Delegar a PlaneManagerState
    saveCurrentPlaneState() {
        if (window.PlaneManagerState) {
            window.PlaneManagerState.saveCurrentPlaneState();
        }
    },
    
    loadPlaneState(plane) {
        if (window.PlaneManagerState) {
            window.PlaneManagerState.loadPlaneState(plane);
        }
    },
    
    // Delegar a PlaneManagerExport
    exportAllPlanes() {
        if (window.PlaneManagerExport) {
            window.PlaneManagerExport.exportAllPlanes();
        }
    },
    
    importPlanes(jsonData) {
        if (window.PlaneManagerExport) {
            return window.PlaneManagerExport.importPlanes(jsonData);
        }
        return false;
    },
    
    // Obtener plano activo
    getActivePlane() {
        return PlaneState.getActivePlane();
    },
    
    // Obtener todos los planos
    getAllPlanes() {
        return PlaneState.getAllPlanes();
    }
};

// Exportar para uso global
window.PlaneManager = PlaneManager;

console.log('✅ PlaneManager (Core) cargado');