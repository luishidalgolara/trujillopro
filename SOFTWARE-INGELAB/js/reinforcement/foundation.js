// ============================================================================
// GENERADOR DE ENFIERRADURA DE CIMENTACIÓN
// ============================================================================

class FoundationReinforcement {
    
    static generate(levels) {
        const group = new THREE.Group();
        const width = 8;
        const depth = 8;
        
        console.log('🔧 Generando enfierradura de cimentación...');
        
        // Parrilla inferior de zapatas (✨ recortada para no sobresalir)
        FoundationReinforcement.addFoundationGrid(group, width, depth, -0.3, '#6');
        
        // Parrilla superior de zapatas (✨ recortada para no sobresalir)
        FoundationReinforcement.addFoundationGrid(group, width, depth, 0.1, '#6');
        
        // ✨ Varillas de arranque DESACTIVADAS (sobresalían por encima de la estructura)
        // Las columnas ya tienen su propia enfierradura en columns.js
        /*
        const columnPositions = [
            [-3, -3], [3, -3], [-3, 3], [3, 3]
        ];
        
        columnPositions.forEach(pos => {
            FoundationReinforcement.addStarterBars(group, pos[0], pos[1], '#8');
        });
        */
        
        // Zapatas individuales
        const columnPositions = [
            [-3, -3], [3, -3], [-3, 3], [3, 3]
        ];
        
        columnPositions.forEach(pos => {
            FoundationReinforcement.addFootingReinforcement(group, pos[0], pos[1], '#6');
        });
        
        return group;
    }

    static addFoundationGrid(group, width, depth, yPos, rebarType) {
        const spacing = 0.20; // 20cm entre varillas
        const diameter = REBAR_CONFIG.diameters[rebarType];
        
        // ✨ Longitud recortada para que queden DENTRO de la cimentación
        const gridLength = 5.5; // Recortado agresivamente para no sobresalir
        
        // Varillas en dirección X
        for (let z = -depth/2 + spacing; z <= depth/2 - spacing; z += spacing) {
            const rebar = RebarGeometry.createStraightRebar(gridLength, diameter, rebarType);
            rebar.rotation.z = Math.PI / 2;
            rebar.position.set(0, yPos, z);
            group.add(rebar);
        }
        
        // Varillas en dirección Z
        for (let x = -width/2 + spacing; x <= width/2 - spacing; x += spacing) {
            const rebar = RebarGeometry.createStraightRebar(gridLength, diameter, rebarType);
            rebar.rotation.x = Math.PI / 2;
            rebar.rotation.z = Math.PI / 2;
            rebar.position.set(x, yPos, 0);
            group.add(rebar);
        }
    }

    static addStarterBars(group, x, z, rebarType) {
        const diameter = REBAR_CONFIG.diameters[rebarType];
        const barLength = 1.5; // 1.5m de longitud
        const offsets = [
            [-0.15, -0.15], [0.15, -0.15], 
            [-0.15, 0.15], [0.15, 0.15]
        ];
        
        offsets.forEach(offset => {
            const rebar = RebarGeometry.createStraightRebar(barLength, diameter, rebarType);
            rebar.position.set(x + offset[0], barLength/2, z + offset[1]);
            group.add(rebar);
        });
    }

    static addFootingReinforcement(group, x, z, rebarType) {
        const zapataSize = 1.2;
        const diameter = REBAR_CONFIG.diameters[rebarType];
        const spacing = 0.15;
        
        // Parrilla inferior de zapata
        for (let i = -zapataSize/2; i <= zapataSize/2; i += spacing) {
            // Dirección X
            const rebar1 = RebarGeometry.createStraightRebar(zapataSize, diameter, rebarType);
            rebar1.rotation.z = Math.PI / 2;
            rebar1.position.set(x, 0.2, z + i);
            group.add(rebar1);
            
            // Dirección Z
            const rebar2 = RebarGeometry.createStraightRebar(zapataSize, diameter, rebarType);
            rebar2.rotation.x = Math.PI / 2;
            rebar2.rotation.z = Math.PI / 2;
            rebar2.position.set(x + i, 0.2, z);
            group.add(rebar2);
        }
    }
}