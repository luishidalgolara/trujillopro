/**
 * Gestor principal del sistema multi-plano para Alcantarillado
 */
const PlaneManagerCoreAlc = {
    
    init() {
        console.log('🚀 Inicializando PlaneManagerCoreAlc...');
        
        PlaneStateAlc.init();
        
        if (window.PlaneThumbnailsUIAlc) {
            window.PlaneThumbnailsUIAlc.init();
        }
        
        const initialPlane = PlaneStateAlc.getActivePlane();
        if (initialPlane && window.PlaneManagerStateAlc) {
            window.PlaneManagerStateAlc.loadPlaneState(initialPlane);
        }
        
        console.log('✅ PlaneManagerCoreAlc inicializado');
    },
    
    createPlane(name = null) {
        const nextId = PlaneStateAlc.getNextId();
        const planeName = name || `Plano ${nextId}`;
        
        console.log(`➕ Creando nuevo plano: ${planeName}`);
        
        // 1. PRIMERO: Guardar estado actual
        if (window.PlaneManagerStateAlc) {
            window.PlaneManagerStateAlc.saveCurrentPlaneState();
        }
        
        // 2. Crear nuevo plano
        const newPlane = new PlaneInstanceAlc(nextId, planeName);
        
        if (!PlaneStateAlc.addPlane(newPlane)) {
            return null;
        }
        
        // 3. Cambiar plano activo
        PlaneStateAlc.setActivePlane(newPlane.id);
        
        // 4. LUEGO: Limpiar y cargar nuevo plano
        if (window.PlaneManagerCleanupAlc) {
            window.PlaneManagerCleanupAlc.clearCanvas();
            window.PlaneManagerCleanupAlc.clearIntegratedElements();
            window.PlaneManagerCleanupAlc.resetIntegratedStates();
        }
        
        if (window.PlaneManagerStateAlc) {
            window.PlaneManagerStateAlc.loadPlaneState(newPlane);
        }
        
        if (window.PlaneThumbnailsUIAlc) {
            window.PlaneThumbnailsUIAlc.renderThumbnails();
        }
        
        console.log(`✅ Plano creado: ${planeName}`);
        return newPlane;
    },
    
    deletePlane(planeId) {
        if (PlaneStateAlc.planes.length <= 1) {
            alert('No puedes eliminar el último plano');
            return false;
        }
        
        const plane = PlaneStateAlc.getPlaneById(planeId);
        if (!plane) return false;
        
        const confirmacion = confirm(`¿Estás seguro de eliminar "${plane.name}"?`);
        if (!confirmacion) return false;
        
        PlaneStateAlc.removePlane(planeId);
        
        if (PlaneStateAlc.activePlaneId === planeId) {
            const newActivePlane = PlaneStateAlc.planes[0];
            PlaneStateAlc.setActivePlane(newActivePlane.id);
            
            if (window.PlaneManagerCleanupAlc) {
                window.PlaneManagerCleanupAlc.clearCanvas();
                window.PlaneManagerCleanupAlc.clearIntegratedElements();
                window.PlaneManagerCleanupAlc.resetIntegratedStates();
            }
            
            if (window.PlaneManagerStateAlc) {
                window.PlaneManagerStateAlc.loadPlaneState(newActivePlane);
            }
        }
        
        if (window.PlaneThumbnailsUIAlc) {
            window.PlaneThumbnailsUIAlc.renderThumbnails();
        }
        
        console.log(`🗑️ Plano eliminado: ${plane.name}`);
        return true;
    },
    
    switchToPlane(planeId) {
        const targetPlane = PlaneStateAlc.getPlaneById(planeId);
        if (!targetPlane) {
            console.error('❌ Plano no encontrado:', planeId);
            return false;
        }
        
        if (PlaneStateAlc.activePlaneId === planeId) {
            console.log('ℹ️ Ya estás en este plano');
            return true;
        }
        
        console.log(`🔄 Cambiando de plano: Plano ${PlaneStateAlc.activePlaneId} → Plano ${planeId}`);
        
        // ✅ PASO 1: GUARDAR estado del plano actual ANTES de hacer nada
        if (window.PlaneManagerStateAlc) {
            console.log('  💾 [1/4] Guardando plano actual...');
            window.PlaneManagerStateAlc.saveCurrentPlaneState();
        }
        
        // ✅ PASO 2: Cambiar plano activo
        const planoAnterior = PlaneStateAlc.activePlaneId;
        PlaneStateAlc.setActivePlane(planeId);
        console.log(`  📋 [2/4] Plano activo cambiado: ${planoAnterior} → ${planeId}`);
        
        // ✅ PASO 3: LIMPIAR todo del DOM
        if (window.PlaneManagerCleanupAlc) {
            console.log('  🧹 [3/4] Limpiando DOM...');
            window.PlaneManagerCleanupAlc.clearCanvas();
            window.PlaneManagerCleanupAlc.clearIntegratedElements();
            window.PlaneManagerCleanupAlc.resetIntegratedStates();
        }
        
        // ✅ PASO 4: CARGAR estado del nuevo plano
        setTimeout(() => {
            if (window.PlaneManagerStateAlc) {
                console.log('  📂 [4/4] Cargando nuevo plano...');
                window.PlaneManagerStateAlc.loadPlaneState(targetPlane);
            }
            
            if (window.PlaneThumbnailsUIAlc) {
                window.PlaneThumbnailsUIAlc.renderThumbnails();
            }
            
            console.log(`✅ Cambio completado a: ${targetPlane.name}`);
        }, 50);
        
        return true;
    },
    
    duplicatePlane(planeId) {
        const sourcePlane = PlaneStateAlc.getPlaneById(planeId);
        if (!sourcePlane) return null;
        
        if (window.PlaneManagerStateAlc) {
            window.PlaneManagerStateAlc.saveCurrentPlaneState();
        }
        
        const nextId = PlaneStateAlc.getNextId();
        const newPlane = new PlaneInstanceAlc(nextId, `${sourcePlane.name} (Copia)`);
        
        newPlane.elements = JSON.parse(JSON.stringify(sourcePlane.elements));
        newPlane.connections = JSON.parse(JSON.stringify(sourcePlane.connections));
        newPlane.scale = sourcePlane.scale;
        newPlane.format = sourcePlane.format;
        newPlane.mode = sourcePlane.mode;
        newPlane.projectAddress = sourcePlane.projectAddress;
        newPlane.svgInnerHTML = sourcePlane.svgInnerHTML;
        newPlane.elementosIntegrados = JSON.parse(JSON.stringify(sourcePlane.elementosIntegrados));
        
        if (!PlaneStateAlc.addPlane(newPlane)) {
            return null;
        }
        
        if (window.PlaneThumbnailsUIAlc) {
            window.PlaneThumbnailsUIAlc.renderThumbnails();
        }
        
        console.log(`📋 Plano duplicado: ${newPlane.name}`);
        return newPlane;
    },
    
    renamePlane(planeId, newName) {
        const plane = PlaneStateAlc.getPlaneById(planeId);
        if (!plane) return false;
        
        if (!newName || newName.trim() === '') {
            alert('El nombre no puede estar vacío');
            return false;
        }
        
        plane.name = newName.trim();
        
        if (window.PlaneThumbnailsUIAlc) {
            window.PlaneThumbnailsUIAlc.renderThumbnails();
        }
        
        console.log(`✏️ Plano renombrado a: ${newName}`);
        return true;
    },
    
    saveCurrentPlaneState() {
        if (window.PlaneManagerStateAlc) {
            window.PlaneManagerStateAlc.saveCurrentPlaneState();
        }
    },
    
    exportProject() {
        if (window.PlaneManagerExportAlc) {
            window.PlaneManagerExportAlc.exportAllPlanes();
        }
    },
    
    importProject(file) {
        if (window.PlaneManagerExportAlc) {
            window.PlaneManagerExportAlc.importPlanes(file);
        }
    }
};

window.PlaneManagerCoreAlc = PlaneManagerCoreAlc;

console.log('✅ PlaneManagerCoreAlc cargado');