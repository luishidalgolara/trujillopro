// ============================================================================
// CLASE PRINCIPAL: GENERADOR DE ENFIERRADURA (MANAGER)
// ============================================================================

class ReinforcementGenerator {
    constructor() {
        this.reinforcementGroup = new THREE.Group();
        this.reinforcementGroup.name = 'reinforcement';
    }

    // ========================================================================
    // GENERADOR COMPLETO DE ENFIERRADURA
    // ========================================================================
    
    generateCompleteReinforcement(levels) {
        // Limpiar grupo anterior
        while (this.reinforcementGroup.children.length > 0) {
            const child = this.reinforcementGroup.children[0];
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
            this.reinforcementGroup.remove(child);
        }
        
        console.log(`🔧 Generando enfierradura OPTIMIZADA para ${levels} nivel(es)...`);
        
        // Generar cada tipo de enfierradura con corrugado 3D
        const foundation = FoundationReinforcement.generate(levels);
        foundation.name = 'foundation-reinforcement';
        this.reinforcementGroup.add(foundation);
        
        const columns = ColumnsReinforcement.generate(levels);
        columns.name = 'columns-reinforcement';
        this.reinforcementGroup.add(columns);
        
        const beams = BeamsReinforcement.generate(levels);
        beams.name = 'beams-reinforcement';
        this.reinforcementGroup.add(beams);
        
        const slabs = SlabsReinforcement.generate(levels);
        slabs.name = 'slabs-reinforcement';
        this.reinforcementGroup.add(slabs);
        
        // ✨ Por defecto, la enfierradura está OCULTA (se muestra con "Ver Fierros")
        this.reinforcementGroup.visible = false;
        
        // Forzar actualización de bounding boxes
        this.reinforcementGroup.traverse((obj) => {
            if (obj.geometry) {
                if (!obj.geometry.boundingSphere) {
                    obj.geometry.computeBoundingSphere();
                }
            }
        });
        
        console.log('✅ Enfierradura OPTIMIZADA generada correctamente');
        console.log(`   💎 Geometrías optimizadas para mejor rendimiento`);
        console.log(`   📊 Total de elementos: ${this.countReinforcementElements()}`);
        
        return this.reinforcementGroup;
    }

    // ========================================================================
    // FUNCIONES DE UTILIDAD
    // ========================================================================
    
    countReinforcementElements() {
        let count = 0;
        this.reinforcementGroup.traverse((obj) => {
            if (obj.isMesh) count++;
        });
        return count;
    }

    toggleVisibility() {
        this.reinforcementGroup.visible = !this.reinforcementGroup.visible;
        console.log(`🔧 Enfierradura ${this.reinforcementGroup.visible ? 'visible' : 'oculta'}`);
    }

    setVisibility(visible) {
        this.reinforcementGroup.visible = visible;
    }

    getReinforcementGroup() {
        return this.reinforcementGroup;
    }

    getReinforcementInfo() {
        return {
            config: REBAR_CONFIG,
            elementCount: this.countReinforcementElements(),
            visible: this.reinforcementGroup.visible,
            features: [
                'Corrugado 3D optimizado',
                'Materiales PBR',
                'Ganchos detallados',
                'Sin errores de geometría'
            ]
        };
    }
}

// ============================================================================
// INSTANCIA GLOBAL
// ============================================================================

const reinforcementGenerator = new ReinforcementGenerator();

// Comando de consola para debug
window.reinforcement = {
    toggle: () => reinforcementGenerator.toggleVisibility(),
    show: () => reinforcementGenerator.setVisibility(true),
    hide: () => reinforcementGenerator.setVisibility(false),
    info: () => {
        const info = reinforcementGenerator.getReinforcementInfo();
        console.log('🔧 Información de Enfierradura OPTIMIZADA:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`  Elementos totales: ${info.elementCount}`);
        console.log(`  Visible: ${info.visible ? 'Sí' : 'No'}`);
        console.log(`  Características:`, info.features);
        console.log(`  Tipos de varillas:`, Object.keys(info.config.diameters));
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
};

console.log('✅ Módulo de enfierradura OPTIMIZADO cargado');
console.log('💎 Características: Corrugado 3D + Sin errores + Optimizado');
console.log('💡 Comandos disponibles en consola:');
console.log('   reinforcement.toggle() - Mostrar/ocultar enfierradura');
console.log('   reinforcement.show()   - Mostrar enfierradura');
console.log('   reinforcement.hide()   - Ocultar enfierradura');
console.log('   reinforcement.info()   - Ver información completa');