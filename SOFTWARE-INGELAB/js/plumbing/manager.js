// ============================================================================
// CLASE PRINCIPAL: GENERADOR DE SISTEMA DE ALCANTARILLADO PROFESIONAL
// ============================================================================

class PlumbingGenerator {
    constructor() {
        this.plumbingGroup = new THREE.Group();
        this.plumbingGroup.name = 'plumbing';
    }

    // ========================================================================
    // GENERADOR COMPLETO DE SISTEMA DE ALCANTARILLADO
    // ========================================================================
    
    generateCompletePlumbing(levels) {
        // Limpiar grupo anterior
        while (this.plumbingGroup.children.length > 0) {
            const child = this.plumbingGroup.children[0];
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => {
                        if (mat.map) mat.map.dispose();
                        mat.dispose();
                    });
                } else {
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            }
            this.plumbingGroup.remove(child);
        }
        
        console.log(`🚰 Generando sistema de alcantarillado PROFESIONAL para ${levels} nivel(es)...`);
        
        const floorHeight = 3.5;
        
        // ====================================================================
        // SISTEMAS POR NIVEL (más realistas y compactos)
        // ====================================================================
        
        for (let level = 0; level < levels; level++) {
            const yFloor = 0.8 + (level + 1) * floorHeight;
            
            // Sistema de baño
            const bathroomLoc = PLUMBING_CONFIG.locations.bathroom;
            const bathroomSystem = PlumbingPipes.createBathroomSystem(
                bathroomLoc.x,
                bathroomLoc.z,
                yFloor,
                level
            );
            bathroomSystem.name = `bathroom-level-${level}`;
            this.plumbingGroup.add(bathroomSystem);
            
            // Caja de registro de baño (más pequeña)
            const bathroomBox = PlumbingBoxes.createBathroomBox(
                bathroomLoc.x,
                yFloor + PLUMBING_CONFIG.heights.boxTop,
                bathroomLoc.z,
                level
            );
            this.plumbingGroup.add(bathroomBox);
            
            // Sistema de cocina
            const kitchenLoc = PLUMBING_CONFIG.locations.kitchen;
            const kitchenSystem = PlumbingPipes.createKitchenSystem(
                kitchenLoc.x,
                kitchenLoc.z,
                yFloor,
                level
            );
            kitchenSystem.name = `kitchen-level-${level}`;
            this.plumbingGroup.add(kitchenSystem);
            
            // Caja de registro de cocina (más pequeña)
            const kitchenBox = PlumbingBoxes.createKitchenBox(
                kitchenLoc.x,
                yFloor + PLUMBING_CONFIG.heights.boxTop,
                kitchenLoc.z,
                level
            );
            this.plumbingGroup.add(kitchenBox);
        }
        
        // ====================================================================
        // COLECTOR PRINCIPAL (bajo cimentación)
        // ====================================================================
        
        const collectorY = PLUMBING_CONFIG.heights.collectorDepth;
        
        const bathroomX = PLUMBING_CONFIG.locations.bathroom.x;
        const kitchenX = PLUMBING_CONFIG.locations.kitchen.x;
        
        const mainCollector = PlumbingPipes.createMainCollector(
            bathroomX,
            kitchenX,
            collectorY,
            0
        );
        mainCollector.name = 'main-collector';
        this.plumbingGroup.add(mainCollector);
        
        // Caja colectora principal (mediana)
        const mainBox = PlumbingBoxes.createMainCollectorBox(
            0,
            collectorY - 0.2,
            0
        );
        this.plumbingGroup.add(mainBox);
        
        // ====================================================================
        // CONEXIONES HORIZONTALES ENTRE BAJADAS Y COLECTOR
        // ====================================================================
        
        // Conectar baño con colector
        const bathroomToCollector = PlumbingPipes.createHorizontalPipe(
            bathroomX,
            PLUMBING_CONFIG.locations.bathroom.z,
            0,
            0,
            collectorY,
            PLUMBING_CONFIG.diameters['6"'],
            '6"'
        );
        bathroomToCollector.name = 'bathroom-connection';
        this.plumbingGroup.add(bathroomToCollector);
        
        // Conectar cocina con colector
        const kitchenToCollector = PlumbingPipes.createHorizontalPipe(
            kitchenX,
            PLUMBING_CONFIG.locations.kitchen.z,
            0,
            0,
            collectorY,
            PLUMBING_CONFIG.diameters['6"'],
            '6"'
        );
        kitchenToCollector.name = 'kitchen-connection';
        this.plumbingGroup.add(kitchenToCollector);
        
        // Por defecto, el sistema está oculto
        this.plumbingGroup.visible = false;
        
        // Forzar actualización de bounding boxes
        this.plumbingGroup.traverse((obj) => {
            if (obj.geometry) {
                if (!obj.geometry.boundingSphere) {
                    obj.geometry.computeBoundingSphere();
                }
            }
        });
        
        console.log('✅ Sistema de alcantarillado PROFESIONAL generado');
        console.log(`   🚰 Diseño realista tipo SketchUp`);
        console.log(`   📊 Total de elementos: ${this.countPlumbingElements()}`);
        
        return this.plumbingGroup;
    }

    // ========================================================================
    // FUNCIONES DE UTILIDAD
    // ========================================================================
    
    countPlumbingElements() {
        let count = 0;
        this.plumbingGroup.traverse((obj) => {
            if (obj.isMesh) count++;
        });
        return count;
    }

    toggleVisibility() {
        this.plumbingGroup.visible = !this.plumbingGroup.visible;
        console.log(`🚰 Alcantarillado ${this.plumbingGroup.visible ? 'visible' : 'oculto'}`);
    }

    setVisibility(visible) {
        this.plumbingGroup.visible = visible;
    }

    getPlumbingGroup() {
        return this.plumbingGroup;
    }

    getPlumbingInfo() {
        return {
            config: PLUMBING_CONFIG,
            elementCount: this.countPlumbingElements(),
            visible: this.plumbingGroup.visible,
            features: [
                'Tuberías PVC gris profesional',
                'Diámetros realistas (50-160mm)',
                'Distribución tipo SketchUp',
                'Codos y conexiones detalladas',
                'Cajas de registro compactas',
                'Ventilación delgada',
                'Pendientes correctas (2%)'
            ]
        };
    }
}

// ============================================================================
// INSTANCIA GLOBAL
// ============================================================================

const plumbingGenerator = new PlumbingGenerator();

// Comando de consola para debug
window.plumbing = {
    toggle: () => plumbingGenerator.toggleVisibility(),
    show: () => plumbingGenerator.setVisibility(true),
    hide: () => plumbingGenerator.setVisibility(false),
    info: () => {
        const info = plumbingGenerator.getPlumbingInfo();
        console.log('🚰 Sistema de Alcantarillado PROFESIONAL:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`  Elementos totales: ${info.elementCount}`);
        console.log(`  Visible: ${info.visible ? 'Sí' : 'No'}`);
        console.log(`  Características:`, info.features);
        console.log(`  Diámetros:`, Object.keys(info.config.diameters));
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
};

console.log('✅ Módulo de alcantarillado PROFESIONAL cargado');
console.log('🚰 Sistema realista tipo SketchUp');
console.log('💡 Comandos:');
console.log('   plumbing.toggle() - Mostrar/ocultar');
console.log('   plumbing.info()   - Ver información');