// ============================================================================
// GENERADOR DE ENFIERRADURA DE VIGAS
// ============================================================================

class BeamsReinforcement {
    
    static generate(levels) {
        const group = new THREE.Group();
        const floorHeight = 3.5;
        const beamHeight = 0.5;
        
        console.log('🔧 Generando enfierradura de vigas...');
        
        for (let level = 0; level < levels; level++) {
            const yPos = 0.8 + (level + 1) * floorHeight - beamHeight / 2;
            
            // ✨ Vigas en dirección X (largo recortado para no sobresalir)
            [-3, 3].forEach(z => {
                BeamsReinforcement.addBeamReinforcement(group, 0, yPos, z, 3.5, 'x');
            });
            
            // ✨ Vigas en dirección Z (largo recortado para no sobresalir)
            [-3, 3].forEach(x => {
                BeamsReinforcement.addBeamReinforcement(group, x, yPos, 0, 3.5, 'z');
            });
        }
        
        return group;
    }

    static addBeamReinforcement(group, x, y, z, length, direction) {
        const beamWidth = 0.3;
        const beamHeight = 0.5;
        const diameter = REBAR_CONFIG.diameters['#6'];
        
        // Varillas superiores (2 varillas #6 corrugadas)
        const topOffset = beamHeight/2 - REBAR_CONFIG.cover.beam;
        [-0.08, 0.08].forEach(offset => {
            const rebar = RebarGeometry.createStraightRebar(length, diameter, '#6');
            
            if (direction === 'x') {
                rebar.rotation.z = Math.PI / 2;
                rebar.position.set(x, y + topOffset, z + offset);
            } else {
                rebar.rotation.x = Math.PI / 2;
                rebar.rotation.z = Math.PI / 2;
                rebar.position.set(x + offset, y + topOffset, z);
            }
            
            group.add(rebar);
        });
        
        // Varillas inferiores (2 varillas #6 corrugadas)
        const bottomOffset = -beamHeight/2 + REBAR_CONFIG.cover.beam;
        [-0.08, 0.08].forEach(offset => {
            const rebar = RebarGeometry.createStraightRebar(length, diameter, '#6');
            
            if (direction === 'x') {
                rebar.rotation.z = Math.PI / 2;
                rebar.position.set(x, y + bottomOffset, z + offset);
            } else {
                rebar.rotation.x = Math.PI / 2;
                rebar.rotation.z = Math.PI / 2;
                rebar.position.set(x + offset, y + bottomOffset, z);
            }
            
            group.add(rebar);
        });
        
        // Estribos #3
        BeamsReinforcement.addBeamStirrups(group, x, y, z, length, direction);
    }

    static addBeamStirrups(group, x, y, z, length, direction) {
        const beamWidth = 0.22;
        const beamHeight = 0.42;
        const diameter = REBAR_CONFIG.diameters['#3'];
        const spacing = 0.20; // 20cm
        
        const numStirrups = Math.floor(length / spacing);
        const startPos = -length / 2 + spacing / 2;
        
        for (let i = 0; i < numStirrups; i++) {
            const stirrup = RebarGeometry.createStirrup(beamWidth, beamHeight, diameter, '#3');
            
            if (direction === 'x') {
                stirrup.rotation.y = Math.PI / 2;
                stirrup.position.set(x + startPos + (i * spacing), y, z);
            } else {
                stirrup.position.set(x, y, z + startPos + (i * spacing));
            }
            
            group.add(stirrup);
        }
    }
}