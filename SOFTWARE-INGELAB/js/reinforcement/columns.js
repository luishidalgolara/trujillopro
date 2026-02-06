// ============================================================================
// GENERADOR DE ENFIERRADURA DE COLUMNAS
// ============================================================================

class ColumnsReinforcement {
    
    static generate(levels) {
        const group = new THREE.Group();
        const floorHeight = 3.5;
        const columnPositions = [
            [-3, -3], [3, -3], [-3, 3], [3, 3]
        ];
        
        console.log('🔧 Generando enfierradura de columnas...');
        
        columnPositions.forEach(pos => {
            for (let level = 0; level < levels; level++) {
                ColumnsReinforcement.addColumnReinforcement(
                    group, 
                    pos[0], 
                    pos[1], 
                    level, 
                    floorHeight
                );
            }
        });
        
        return group;
    }

    static addColumnReinforcement(group, x, z, level, floorHeight) {
        const columnHeight = floorHeight;
        const yBase = 0.8 + (level * floorHeight);
        
        // ✨ Varillas longitudinales recortadas para quedar DENTRO de la columna
        const rebarHeight = columnHeight - 1.5; // Recortado agresivamente para quedar invisible dentro de la columna
        
        const longitudinalPositions = [
            [-0.15, -0.15], [0, -0.15], [0.15, -0.15],
            [-0.15, 0], [0.15, 0],
            [-0.15, 0.15], [0, 0.15], [0.15, 0.15]
        ];
        
        const diameter = REBAR_CONFIG.diameters['#8'];
        
        longitudinalPositions.forEach(offset => {
            const rebar = RebarGeometry.createStraightRebar(rebarHeight, diameter, '#8');
            rebar.position.set(x + offset[0], yBase + columnHeight/2, z + offset[1]);
            group.add(rebar);
        });
        
        // Estribos #3 o #4
        ColumnsReinforcement.addColumnStirrups(group, x, z, yBase, columnHeight);
    }

    static addColumnStirrups(group, x, z, yBase, height) {
        const stirrupWidth = 0.32;  // Ancho del estribo
        const stirrupHeight = 0.32;
        const diameter = REBAR_CONFIG.diameters['#4'];
        
        // Zona de confinamiento (extremos) - estribos cada 10cm
        const confinementZone = height * 0.15;
        
        // Estribos en zona inferior
        for (let y = yBase; y < yBase + confinementZone; y += REBAR_CONFIG.spacing.stirrups) {
            const stirrup = RebarGeometry.createStirrup(stirrupWidth, stirrupHeight, diameter, '#4');
            stirrup.position.set(x, y, z);
            group.add(stirrup);
        }
        
        // Estribos en zona central - cada 20cm
        for (let y = yBase + confinementZone; y < yBase + height - confinementZone; y += REBAR_CONFIG.spacing.stirrupsNormal) {
            const stirrup = RebarGeometry.createStirrup(stirrupWidth, stirrupHeight, diameter, '#4');
            stirrup.position.set(x, y, z);
            group.add(stirrup);
        }
        
        // Estribos en zona superior
        for (let y = yBase + height - confinementZone; y < yBase + height; y += REBAR_CONFIG.spacing.stirrups) {
            const stirrup = RebarGeometry.createStirrup(stirrupWidth, stirrupHeight, diameter, '#4');
            stirrup.position.set(x, y, z);
            group.add(stirrup);
        }
    }
}