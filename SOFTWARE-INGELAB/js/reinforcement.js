// ============================================================================
// MÓDULO DE ENFIERRADURA (REFUERZO DE ACERO) - VERSIÓN OPTIMIZADA
// ============================================================================
// Archivo: js/reinforcement.js
// Descripción: Sistema completo de enfierradura optimizado y sin errores
// ============================================================================

// ============================================================================
// CONFIGURACIÓN DE VARILLAS Y MATERIALES
// ============================================================================

const REBAR_CONFIG = {
    // Diámetros de varillas en metros (nomenclatura estándar)
    diameters: {
        '#3': 0.00953,   // 3/8" - 9.53mm
        '#4': 0.01270,   // 1/2" - 12.70mm
        '#5': 0.01588,   // 5/8" - 15.88mm
        '#6': 0.01905,   // 3/4" - 19.05mm
        '#8': 0.02540,   // 1" - 25.40mm
        '#10': 0.03175   // 1-1/4" - 31.75mm
    },
    
    // Colores por tipo de varilla (más realistas)
    colors: {
        '#3': 0xCC5555,   // Rojo oscuro - estribos pequeños
        '#4': 0xDD7744,   // Naranja oxidado - estribos medianos
        '#5': 0xDDAA44,   // Amarillo metálico - varillas medianas
        '#6': 0x4DB8B8,   // Turquesa metálico - varillas principales
        '#8': 0x5599CC,   // Azul acero - varillas gruesas
        '#10': 0x7755AA,  // Morado metálico - varillas muy gruesas
        'mesh': 0xA0A0A0  // Gris acero - malla electrosoldada
    },
    
    // Espaciamientos estándar en metros
    spacing: {
        stirrups: 0.10,        // Estribos cada 10cm en zonas críticas
        stirrupsNormal: 0.20,  // Estribos cada 20cm en zona normal
        mesh: 0.15,            // Malla cada 15cm
        columnBars: 0.05       // Separación entre varillas de columna
    },
    
    // Recubrimientos en metros
    cover: {
        foundation: 0.075,  // 7.5cm
        column: 0.04,       // 4cm
        beam: 0.04,         // 4cm
        slab: 0.025         // 2.5cm
    },
    
    // Configuración de corrugado
    corrugation: {
        segmentsPerRib: 8,     // Segmentos por nervadura
        ribHeight: 0.15,       // Altura de nervadura (15% del diámetro)
        ribSpacing: 0.8        // Espaciado entre nervaduras (80% del diámetro)
    }
};

// ============================================================================
// CLASE PRINCIPAL: GENERADOR DE ENFIERRADURA OPTIMIZADA
// ============================================================================

class ReinforcementGenerator {
    constructor() {
        this.reinforcementGroup = new THREE.Group();
        this.reinforcementGroup.name = 'reinforcement';
    }

    // ========================================================================
    // MATERIALES PARA VARILLAS CON PBR
    // ========================================================================
    
    createRebarMaterial(rebarType) {
        const color = new THREE.Color(REBAR_CONFIG.colors[rebarType]);
        
        // Usar la biblioteca de materiales si está disponible
        if (window.MaterialLibrary) {
            return MaterialLibrary.createRebarMaterial(
                REBAR_CONFIG.colors[rebarType], 
                Math.random() * 0.15  // Variación de oxidación
            );
        }
        
        // Fallback a material estándar mejorado
        return new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.4,
            metalness: 0.85,
            envMapIntensity: 1.2,
            emissive: color,
            emissiveIntensity: 0.05
        });
    }

    // ========================================================================
    // GEOMETRÍA DE VARILLA CORRUGADA 3D OPTIMIZADA
    // ========================================================================
    
    createCorrugatedRebar(length, diameter, rebarType) {
        const radius = diameter / 2;
        const ribHeight = radius * REBAR_CONFIG.corrugation.ribHeight;
        const ribSpacing = diameter * REBAR_CONFIG.corrugation.ribSpacing;
        const numRibs = Math.floor(length / ribSpacing);
        
        // OPTIMIZADO: Reducir segmentos para mejor rendimiento
        const radialSegments = 8;  // Reducido de 12 a 8
        const heightSegments = Math.min(Math.max(numRibs * 2, 12), 30); // Limitado a máximo 30
        
        const geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            length,
            radialSegments,
            heightSegments,
            false  // No abrir extremos
        );
        
        // Modificar vértices para crear corrugado (optimizado)
        const positions = geometry.attributes.position;
        const vertex = new THREE.Vector3();
        
        for (let i = 0; i < positions.count; i++) {
            vertex.fromBufferAttribute(positions, i);
            
            const y = vertex.y;
            const distanceFromCenter = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
            
            // Evitar división por cero
            if (distanceFromCenter < 0.0001) continue;
            
            // Calcular altura de nervadura basada en posición Y
            const ribPosition = (y + length / 2) / ribSpacing;
            const ribIndex = Math.floor(ribPosition);
            const ribFraction = ribPosition - ribIndex;
            
            // Función sinusoidal para nervaduras suaves
            let ribMultiplier = 1.0;
            if (ribFraction < 0.3) {
                ribMultiplier = 1.0 + (Math.sin(ribFraction * Math.PI / 0.3) * ribHeight / radius);
            }
            
            // Aplicar corrugado
            const newRadius = radius * ribMultiplier;
            const scale = newRadius / distanceFromCenter;
            
            vertex.x *= scale;
            vertex.z *= scale;
            
            positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
        
        geometry.computeVertexNormals();
        geometry.computeBoundingSphere();  // IMPORTANTE: Calcular bounding sphere
        
        const material = this.createRebarMaterial(rebarType);
        const rebar = new THREE.Mesh(geometry, material);
        rebar.castShadow = true;
        rebar.userData.componentType = 'reinforcement';
        rebar.userData.rebarType = rebarType;
        
        return rebar;
    }
    
    // Crear varilla recta corrugada
    createStraightRebar(length, diameter, rebarType) {
        return this.createCorrugatedRebar(length, diameter, rebarType);
    }

    // ========================================================================
    // ESTRIBOS CON GANCHOS DETALLADOS
    // ========================================================================
    
    createStirrup(width, height, diameter, rebarType) {
        const group = new THREE.Group();
        const material = this.createRebarMaterial(rebarType);
        const radius = diameter / 2;
        
        // Crear las 4 líneas del estribo rectangular
        const segments = [
            // Lado inferior
            { length: width, pos: [0, -height/2, 0], rot: [0, 0, Math.PI/2] },
            // Lado superior
            { length: width, pos: [0, height/2, 0], rot: [0, 0, Math.PI/2] },
            // Lado izquierdo
            { length: height, pos: [-width/2, 0, 0], rot: [0, 0, 0] },
            // Lado derecho
            { length: height, pos: [width/2, 0, 0], rot: [0, 0, 0] }
        ];
        
        segments.forEach(seg => {
            const geometry = new THREE.CylinderGeometry(
                radius,
                radius,
                seg.length,
                8
            );
            geometry.computeBoundingSphere();
            const mesh = new THREE.Mesh(geometry, material.clone());
            mesh.position.set(...seg.pos);
            mesh.rotation.set(...seg.rot);
            mesh.castShadow = true;
            group.add(mesh);
        });
        
        // Añadir ganchos en las esquinas (135° más detallados)
        this.addDetailedCornerHooks(group, width, height, diameter, material);
        
        return group;
    }

    addDetailedCornerHooks(group, width, height, diameter, material) {
        const hookLength = diameter * 8; // Longitud del gancho más larga
        const radius = diameter / 2;
        
        const corners = [
            { pos: [-width/2, height/2, 0], rot: [Math.PI/4, 0, 0] },     // Superior izq
            { pos: [width/2, height/2, 0], rot: [Math.PI/4, 0, Math.PI] } // Superior der
        ];
        
        corners.forEach(corner => {
            // Gancho con curva
            const curve = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(hookLength * 0.5, hookLength * 0.3, hookLength * 0.2),
                new THREE.Vector3(hookLength, hookLength * 0.5, hookLength * 0.4)
            );
            
            const tubeGeometry = new THREE.TubeGeometry(curve, 8, radius, 6, false);
            tubeGeometry.computeBoundingSphere();
            const hook = new THREE.Mesh(tubeGeometry, material.clone());
            hook.position.set(...corner.pos);
            hook.rotation.set(...corner.rot);
            hook.castShadow = true;
            group.add(hook);
        });
    }

    // ========================================================================
    // ENFIERRADURA DE CIMENTACIÓN
    // ========================================================================
    
    generateFoundationReinforcement(levels) {
        const group = new THREE.Group();
        const width = 8;
        const depth = 8;
        
        console.log('🔧 Generando enfierradura de cimentación...');
        
        // Parrilla inferior de zapatas
        this.addFoundationGrid(group, width, depth, -0.3, '#6');
        
        // Parrilla superior de zapatas
        this.addFoundationGrid(group, width, depth, 0.1, '#6');
        
        // Varillas de arranque en posiciones de columnas
        const columnPositions = [
            [-3, -3], [3, -3], [-3, 3], [3, 3]
        ];
        
        columnPositions.forEach(pos => {
            this.addStarterBars(group, pos[0], pos[1], '#8');
        });
        
        // Zapatas individuales
        columnPositions.forEach(pos => {
            this.addFootingReinforcement(group, pos[0], pos[1], '#6');
        });
        
        return group;
    }

    addFoundationGrid(group, width, depth, yPos, rebarType) {
        const spacing = 0.20; // 20cm entre varillas
        const diameter = REBAR_CONFIG.diameters[rebarType];
        
        // Varillas en dirección X
        for (let z = -depth/2; z <= depth/2; z += spacing) {
            const rebar = this.createStraightRebar(width, diameter, rebarType);
            rebar.rotation.z = Math.PI / 2;
            rebar.position.set(0, yPos, z);
            group.add(rebar);
        }
        
        // Varillas en dirección Z
        for (let x = -width/2; x <= width/2; x += spacing) {
            const rebar = this.createStraightRebar(depth, diameter, rebarType);
            rebar.rotation.x = Math.PI / 2;
            rebar.rotation.z = Math.PI / 2;
            rebar.position.set(x, yPos, 0);
            group.add(rebar);
        }
    }

    addStarterBars(group, x, z, rebarType) {
        const diameter = REBAR_CONFIG.diameters[rebarType];
        const barLength = 1.5; // 1.5m de longitud
        const offsets = [
            [-0.15, -0.15], [0.15, -0.15], 
            [-0.15, 0.15], [0.15, 0.15]
        ];
        
        offsets.forEach(offset => {
            const rebar = this.createStraightRebar(barLength, diameter, rebarType);
            rebar.position.set(x + offset[0], barLength/2, z + offset[1]);
            group.add(rebar);
        });
    }

    addFootingReinforcement(group, x, z, rebarType) {
        const zapataSize = 1.2;
        const diameter = REBAR_CONFIG.diameters[rebarType];
        const spacing = 0.15;
        
        // Parrilla inferior de zapata
        for (let i = -zapataSize/2; i <= zapataSize/2; i += spacing) {
            // Dirección X
            const rebar1 = this.createStraightRebar(zapataSize, diameter, rebarType);
            rebar1.rotation.z = Math.PI / 2;
            rebar1.position.set(x, 0.2, z + i);
            group.add(rebar1);
            
            // Dirección Z
            const rebar2 = this.createStraightRebar(zapataSize, diameter, rebarType);
            rebar2.rotation.x = Math.PI / 2;
            rebar2.rotation.z = Math.PI / 2;
            rebar2.position.set(x + i, 0.2, z);
            group.add(rebar2);
        }
    }

    // ========================================================================
    // ENFIERRADURA DE COLUMNAS
    // ========================================================================
    
    generateColumnsReinforcement(levels) {
        const group = new THREE.Group();
        const floorHeight = 3.5;
        const columnPositions = [
            [-3, -3], [3, -3], [-3, 3], [3, 3]
        ];
        
        console.log('🔧 Generando enfierradura de columnas...');
        
        columnPositions.forEach(pos => {
            for (let level = 0; level < levels; level++) {
                this.addColumnReinforcement(
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

    addColumnReinforcement(group, x, z, level, floorHeight) {
        const columnHeight = floorHeight;
        const yBase = 0.8 + (level * floorHeight);
        
        // Varillas longitudinales corrugadas (8 varillas #8)
        const longitudinalPositions = [
            [-0.15, -0.15], [0, -0.15], [0.15, -0.15],
            [-0.15, 0], [0.15, 0],
            [-0.15, 0.15], [0, 0.15], [0.15, 0.15]
        ];
        
        const diameter = REBAR_CONFIG.diameters['#8'];
        
        longitudinalPositions.forEach(offset => {
            const rebar = this.createStraightRebar(columnHeight, diameter, '#8');
            rebar.position.set(x + offset[0], yBase + columnHeight/2, z + offset[1]);
            group.add(rebar);
        });
        
        // Estribos #3 o #4
        this.addColumnStirrups(group, x, z, yBase, columnHeight);
    }

    addColumnStirrups(group, x, z, yBase, height) {
        const stirrupWidth = 0.32;  // Ancho del estribo
        const stirrupHeight = 0.32;
        const diameter = REBAR_CONFIG.diameters['#4'];
        
        // Zona de confinamiento (extremos) - estribos cada 10cm
        const confinementZone = height * 0.15;
        
        // Estribos en zona inferior
        for (let y = yBase; y < yBase + confinementZone; y += REBAR_CONFIG.spacing.stirrups) {
            const stirrup = this.createStirrup(stirrupWidth, stirrupHeight, diameter, '#4');
            stirrup.position.set(x, y, z);
            group.add(stirrup);
        }
        
        // Estribos en zona central - cada 20cm
        for (let y = yBase + confinementZone; y < yBase + height - confinementZone; y += REBAR_CONFIG.spacing.stirrupsNormal) {
            const stirrup = this.createStirrup(stirrupWidth, stirrupHeight, diameter, '#4');
            stirrup.position.set(x, y, z);
            group.add(stirrup);
        }
        
        // Estribos en zona superior
        for (let y = yBase + height - confinementZone; y < yBase + height; y += REBAR_CONFIG.spacing.stirrups) {
            const stirrup = this.createStirrup(stirrupWidth, stirrupHeight, diameter, '#4');
            stirrup.position.set(x, y, z);
            group.add(stirrup);
        }
    }

    // ========================================================================
    // ENFIERRADURA DE VIGAS
    // ========================================================================
    
    generateBeamsReinforcement(levels) {
        const group = new THREE.Group();
        const floorHeight = 3.5;
        const beamHeight = 0.5;
        
        console.log('🔧 Generando enfierradura de vigas...');
        
        for (let level = 0; level < levels; level++) {
            const yPos = 0.8 + (level + 1) * floorHeight - beamHeight / 2;
            
            // Vigas en dirección X
            [-3, 3].forEach(z => {
                this.addBeamReinforcement(group, 0, yPos, z, 6, 'x');
            });
            
            // Vigas en dirección Z
            [-3, 3].forEach(x => {
                this.addBeamReinforcement(group, x, yPos, 0, 6, 'z');
            });
        }
        
        return group;
    }

    addBeamReinforcement(group, x, y, z, length, direction) {
        const beamWidth = 0.3;
        const beamHeight = 0.5;
        const diameter = REBAR_CONFIG.diameters['#6'];
        
        // Varillas superiores (2 varillas #6 corrugadas)
        const topOffset = beamHeight/2 - REBAR_CONFIG.cover.beam;
        [-0.08, 0.08].forEach(offset => {
            const rebar = this.createStraightRebar(length, diameter, '#6');
            
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
            const rebar = this.createStraightRebar(length, diameter, '#6');
            
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
        this.addBeamStirrups(group, x, y, z, length, direction);
    }

    addBeamStirrups(group, x, y, z, length, direction) {
        const beamWidth = 0.22;
        const beamHeight = 0.42;
        const diameter = REBAR_CONFIG.diameters['#3'];
        const spacing = 0.20; // 20cm
        
        const numStirrups = Math.floor(length / spacing);
        const startPos = -length / 2 + spacing / 2;
        
        for (let i = 0; i < numStirrups; i++) {
            const stirrup = this.createStirrup(beamWidth, beamHeight, diameter, '#3');
            
            if (direction === 'x') {
                stirrup.rotation.y = Math.PI / 2;
                stirrup.position.set(x + startPos + (i * spacing), y, z);
            } else {
                stirrup.position.set(x, y, z + startPos + (i * spacing));
            }
            
            group.add(stirrup);
        }
    }

    // ========================================================================
    // ENFIERRADURA DE LOSAS
    // ========================================================================
    
    generateSlabsReinforcement(levels) {
        const group = new THREE.Group();
        const floorHeight = 3.5;
        const slabSize = 6.6;
        
        console.log('🔧 Generando enfierradura de losas...');
        
        for (let level = 0; level < levels; level++) {
            const yPos = 0.8 + (level + 1) * floorHeight;
            
            // Malla inferior
            this.addSlabMesh(group, yPos - 0.08, slabSize, 'lower');
            
            // Malla superior
            this.addSlabMesh(group, yPos - 0.02, slabSize, 'upper');
            
            // Refuerzo adicional en bordes
            this.addSlabEdgeReinforcement(group, yPos, slabSize);
        }
        
        return group;
    }

    addSlabMesh(group, yPos, size, layer) {
        const spacing = REBAR_CONFIG.spacing.mesh;
        const diameter = REBAR_CONFIG.diameters['#4'];
        const rebarType = layer === 'lower' ? '#4' : '#5';
        
        // Varillas en dirección X (corrugadas)
        for (let z = -size/2; z <= size/2; z += spacing) {
            const rebar = this.createStraightRebar(size, diameter, rebarType);
            rebar.rotation.z = Math.PI / 2;
            rebar.position.set(0, yPos, z);
            group.add(rebar);
        }
        
        // Varillas en dirección Z (corrugadas)
        for (let x = -size/2; x <= size/2; x += spacing) {
            const rebar = this.createStraightRebar(size, diameter, rebarType);
            rebar.rotation.x = Math.PI / 2;
            rebar.rotation.z = Math.PI / 2;
            rebar.position.set(x, yPos, 0);
            group.add(rebar);
        }
    }

    addSlabEdgeReinforcement(group, yPos, size) {
        const diameter = REBAR_CONFIG.diameters['#5'];
        const offset = size / 2 - 0.1;
        
        // Refuerzo perimetral corrugado - CORREGIDO
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
            const rebar = this.createStraightRebar(edge.length, diameter, '#5');
            rebar.position.set(...edge.pos);
            rebar.rotation.set(...edge.rot);
            group.add(rebar);
        });
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
        const foundation = this.generateFoundationReinforcement(levels);
        foundation.name = 'foundation-reinforcement';
        this.reinforcementGroup.add(foundation);
        
        const columns = this.generateColumnsReinforcement(levels);
        columns.name = 'columns-reinforcement';
        this.reinforcementGroup.add(columns);
        
        const beams = this.generateBeamsReinforcement(levels);
        beams.name = 'beams-reinforcement';
        this.reinforcementGroup.add(beams);
        
        const slabs = this.generateSlabsReinforcement(levels);
        slabs.name = 'slabs-reinforcement';
        this.reinforcementGroup.add(slabs);
        
        // Por defecto, la enfierradura está visible
        this.reinforcementGroup.visible = true;
        
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