// ============================================================================
// GENERADOR DE ENFIERRADURA DE LOSAS
// ============================================================================

class SlabsReinforcement {
    
    static generate(levels) {
        const group = new THREE.Group();
        const floorHeight = 3.5;
        const slabSize = 6.0; // Ajustado para no sobresalir
        
        console.log('🔧 Generando enfierradura de losas...');
        
        for (let level = 0; level < levels; level++) {
            const yPos = 0.8 + (level + 1) * floorHeight;
            
            // Malla inferior
            SlabsReinforcement.addSlabMesh(group, yPos - 0.08, slabSize, 'lower');
            
            // Malla superior
            SlabsReinforcement.addSlabMesh(group, yPos - 0.02, slabSize, 'upper');
            
            // Refuerzo adicional en bordes
            SlabsReinforcement.addSlabEdgeReinforcement(group, yPos, slabSize);
        }
        
        return group;
    }

    static addSlabMesh(group, yPos, size, layer) {
        const spacing = REBAR_CONFIG.spacing.mesh;
        const diameter = REBAR_CONFIG.diameters['#4'];
        const rebarType = layer === 'lower' ? '#4' : '#5';
        
        // Varillas en dirección X (corrugadas)
        for (let z = -size/2; z <= size/2; z += spacing) {
            const rebar = RebarGeometry.createStraightRebar(size, diameter, rebarType);
            rebar.rotation.z = Math.PI / 2;
            rebar.position.set(0, yPos, z);
            group.add(rebar);
        }
        
        // Varillas en dirección Z (corrugadas)
        for (let x = -size/2; x <= size/2; x += spacing) {
            const rebar = RebarGeometry.createStraightRebar(size, diameter, rebarType);
            rebar.rotation.x = Math.PI / 2;
            rebar.rotation.z = Math.PI / 2;
            rebar.position.set(x, yPos, 0);
            group.add(rebar);
        }
    }

    static addSlabEdgeReinforcement(group, yPos, size) {
        const diameter = REBAR_CONFIG.diameters['#5'];
        const offset = size / 2 - 0.1;
        
        // Refuerzo perimetral corrugado
        const edges = [
            // Norte (paralelo a X)
            { length: size, pos: [0, yPos, offset], rot: [0, 0, Math.PI/2] },
            // Sur (paralelo a X)
            { length: size, pos: [0, yPos, -offset], rot: [0, 0, Math.PI/2] },
            // Este (paralelo a Z)
            { length: size, pos: [offset, yPos, 0], rot: [0, Math.PI/2, 0] },
            // Oeste (paralelo a Z)
            { length: size, pos: [-offset, yPos, 0], rot: [0, Math.PI/2, 0] }
        ];
        
        edges.forEach(edge => {
            const rebar = RebarGeometry.createStraightRebar(edge.length, diameter, '#5');
            rebar.position.set(...edge.pos);
            rebar.rotation.set(...edge.rot);
            group.add(rebar);
        });
    }
}