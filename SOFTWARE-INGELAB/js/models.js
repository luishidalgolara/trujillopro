// Creación de modelos 3D de componentes estructurales - VERSIÓN REALISTA

// ============================================================================
// CIMENTACIÓN CON DETALLES REALISTAS
// ============================================================================

function createFoundation(levels) {
    const group = new THREE.Group();
    const width = 8;
    const depth = 8;
    const height = 0.8;
    
    // Base de concreto con material realista
    const baseGeometry = new THREE.BoxGeometry(width, height, depth);
    const baseMaterial = MaterialLibrary.createConcreteMaterial(
        STRUCTURAL_DATA.components.foundation.color
    );
    
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = height / 2;
    base.castShadow = true;
    base.receiveShadow = true;
    base.userData.componentType = 'foundation';
    group.add(base);
    
    // Zapatas en las esquinas con biseles
    const zapataSize = 1.2;
    const zapataPositions = [
        [-width/2 + 1, -width/2 + 1],
        [width/2 - 1, -width/2 + 1],
        [-width/2 + 1, width/2 - 1],
        [width/2 - 1, width/2 - 1]
    ];
    
    zapataPositions.forEach(pos => {
        const zapataGeometry = createBeveledBox(zapataSize, height * 1.5, zapataSize, 0.02);
        const zapata = new THREE.Mesh(zapataGeometry, baseMaterial.clone());
        zapata.position.set(pos[0], height * 1.25, pos[1]);
        zapata.castShadow = true;
        zapata.receiveShadow = true;
        zapata.userData.componentType = 'foundation';
        group.add(zapata);
    });
    
    return group;
}

// ============================================================================
// COLUMNAS CON BISELES Y DETALLES
// ============================================================================

function createColumns(levels) {
    const group = new THREE.Group();
    const columnSize = 0.4;
    const floorHeight = 3.5;
    
    const columnMaterial = MaterialLibrary.createConcreteMaterial(
        STRUCTURAL_DATA.components.columns.color
    );
    
    // Posiciones de columnas
    const positions = [
        [-3, -3], [3, -3], [-3, 3], [3, 3]
    ];
    
    positions.forEach(pos => {
        for (let level = 0; level < levels; level++) {
            const height = floorHeight;
            
            // Columna con biseles
            const columnGeometry = createBeveledBox(columnSize, height, columnSize, 0.015);
            const column = new THREE.Mesh(columnGeometry, columnMaterial.clone());
            
            const yPos = 0.8 + (level * floorHeight) + height / 2;
            column.position.set(pos[0], yPos, pos[1]);
            column.castShadow = true;
            column.receiveShadow = true;
            column.userData.componentType = 'columns';
            column.userData.level = level;
            
            group.add(column);
            
            // ✨ Refuerzo visual básico DESACTIVADO (las varillas detalladas están en reinforcement.js)
            // createReinforcementBars(column, pos, yPos, group);
        }
    });
    
    return group;
}

// Crear refuerzo de acero visual básico en columnas
function createReinforcementBars(column, pos, yPos, group) {
    const barRadius = 0.02;
    const barHeight = 3.5;
    const barMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(STRUCTURAL_DATA.components.reinforcement.color),
        roughness: 0.3,
        metalness: 0.8
    });
    
    const offsets = [
        [-0.15, -0.15], [0.15, -0.15], [-0.15, 0.15], [0.15, 0.15]
    ];
    
    offsets.forEach(offset => {
        const barGeometry = new THREE.CylinderGeometry(barRadius, barRadius, barHeight, 8);
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.position.set(pos[0] + offset[0], yPos, pos[1] + offset[1]);
        bar.userData.componentType = 'reinforcement';
        group.add(bar);
    });
}

// ============================================================================
// VIGAS CON BISELES Y DETALLES
// ============================================================================

function createBeams(levels) {
    const group = new THREE.Group();
    const beamWidth = 0.3;
    const beamHeight = 0.5;
    const floorHeight = 3.5;
    
    const beamMaterial = MaterialLibrary.createConcreteMaterial(
        STRUCTURAL_DATA.components.beams.color
    );
    
    for (let level = 0; level < levels; level++) {
        const yPos = 0.8 + (level + 1) * floorHeight - beamHeight / 2;
        
        // Vigas horizontales (X) con biseles
        [-3, 3].forEach(z => {
            const beamGeometry = createBeveledBox(6, beamHeight, beamWidth, 0.01);
            const beam = new THREE.Mesh(beamGeometry, beamMaterial.clone());
            beam.position.set(0, yPos, z);
            beam.castShadow = true;
            beam.receiveShadow = true;
            beam.userData.componentType = 'beams';
            beam.userData.level = level;
            group.add(beam);
        });
        
        // Vigas horizontales (Z) con biseles
        [-3, 3].forEach(x => {
            const beamGeometry = createBeveledBox(beamWidth, beamHeight, 6, 0.01);
            const beam = new THREE.Mesh(beamGeometry, beamMaterial.clone());
            beam.position.set(x, yPos, 0);
            beam.castShadow = true;
            beam.receiveShadow = true;
            beam.userData.componentType = 'beams';
            beam.userData.level = level;
            group.add(beam);
        });
    }
    
    return group;
}

// ============================================================================
// LOSAS CON TEXTURA MEJORADA
// ============================================================================

function createSlabs(levels) {
    const group = new THREE.Group();
    const slabSize = 6.6;
    const slabThickness = 0.2;
    const floorHeight = 3.5;
    
    for (let level = 0; level < levels; level++) {
        const yPos = 0.8 + (level + 1) * floorHeight;
        
        const slabGeometry = new THREE.BoxGeometry(slabSize, slabThickness, slabSize);
        const slabMaterial = MaterialLibrary.createConcreteMaterial(
            STRUCTURAL_DATA.components.slabs.color
        );
        
        const slab = new THREE.Mesh(slabGeometry, slabMaterial);
        slab.position.set(0, yPos, 0);
        slab.castShadow = true;
        slab.receiveShadow = true;
        slab.userData.componentType = 'slabs';
        slab.userData.level = level;
        
        group.add(slab);
    }
    
    return group;
}

// ============================================================================
// MUROS CON TEXTURA DE LADRILLO
// ============================================================================
// ✨ MODIFICADO: Ahora delega al OpeningsManager para crear muros con aberturas

function createWalls(levels) {
    // Si el sistema de aberturas está disponible, usar muros con ventanas/puertas
    if (typeof OpeningsManager !== 'undefined') {
        return OpeningsManager.createWallsWithOpenings(levels);
    }
    
    // FALLBACK: Comportamiento original si OpeningsManager no está cargado
    const group = new THREE.Group();
    const wallThickness = 0.15;
    const wallHeight = 3.3;
    const floorHeight = 3.5;
    
    // Material de ladrillo realista
    const wallMaterial = MaterialLibrary.createBrickMaterial();
    
    for (let level = 0; level < levels; level++) {
        const yPos = 0.8 + level * floorHeight + wallHeight / 2;
        
        // Muro frontal
        const frontWallGeometry = new THREE.BoxGeometry(6, wallHeight, wallThickness);
        const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial.clone());
        frontWall.position.set(0, yPos, 3);
        frontWall.castShadow = true;
        frontWall.receiveShadow = true;
        frontWall.userData.componentType = 'walls';
        frontWall.userData.level = level;
        group.add(frontWall);
        
        // Muro trasero
        const backWall = new THREE.Mesh(frontWallGeometry, wallMaterial.clone());
        backWall.position.set(0, yPos, -3);
        backWall.castShadow = true;
        backWall.receiveShadow = true;
        backWall.userData.componentType = 'walls';
        backWall.userData.level = level;
        group.add(backWall);
        
        // Muros laterales
        const sideWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 6);
        
        const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial.clone());
        leftWall.position.set(-3, yPos, 0);
        leftWall.castShadow = true;
        leftWall.receiveShadow = true;
        leftWall.userData.componentType = 'walls';
        leftWall.userData.level = level;
        group.add(leftWall);
        
        const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial.clone());
        rightWall.position.set(3, yPos, 0);
        rightWall.castShadow = true;
        rightWall.receiveShadow = true;
        rightWall.userData.componentType = 'walls';
        rightWall.userData.level = level;
        group.add(rightWall);
    }
    
    return group;
}

// ============================================================================
// TECHO A 4 AGUAS (INCLINADO)
// ============================================================================

function createRoof(levels) {
    const group = new THREE.Group();
    const floorHeight = 3.5;
    const baseSize = 7.5; // Tamaño de la base del techo
    const roofHeight = 2.0; // Altura de la pendiente del techo
    const overhang = 0.5; // Alero (sobresaliente)
    
    // Posición base del techo (arriba del último nivel)
    const baseY = 0.8 + levels * floorHeight;
    
    // Material de techo realista
    const roofMaterial = MaterialLibrary.createRoofMaterial();
    
    // ===== CREAR TECHO A 4 AGUAS =====
    // Un techo a 4 aguas es una pirámide truncada con 4 caras triangulares
    
    const roofWidth = baseSize + overhang * 2;
    const roofDepth = baseSize + overhang * 2;
    
    // Crear geometría personalizada del techo a 4 aguas
    const roofGeometry = new THREE.BufferGeometry();
    
    // Vértices del techo a 4 aguas
    const vertices = new Float32Array([
        // === CARA FRONTAL (Triángulo) ===
        // Vértice superior (cumbrera)
        0, roofHeight, 0,
        // Base izquierda
        -roofWidth/2, 0, roofDepth/2,
        // Base derecha
        roofWidth/2, 0, roofDepth/2,
        
        // === CARA TRASERA (Triángulo) ===
        0, roofHeight, 0,
        roofWidth/2, 0, -roofDepth/2,
        -roofWidth/2, 0, -roofDepth/2,
        
        // === CARA IZQUIERDA (Triángulo) ===
        0, roofHeight, 0,
        -roofWidth/2, 0, -roofDepth/2,
        -roofWidth/2, 0, roofDepth/2,
        
        // === CARA DERECHA (Triángulo) ===
        0, roofHeight, 0,
        roofWidth/2, 0, roofDepth/2,
        roofWidth/2, 0, -roofDepth/2,
    ]);
    
    // Normales para iluminación correcta
    const normals = new Float32Array([
        // Frontal
        0, 0.6, 0.8, 0, 0.6, 0.8, 0, 0.6, 0.8,
        // Trasera
        0, 0.6, -0.8, 0, 0.6, -0.8, 0, 0.6, -0.8,
        // Izquierda
        -0.8, 0.6, 0, -0.8, 0.6, 0, -0.8, 0.6, 0,
        // Derecha
        0.8, 0.6, 0, 0.8, 0.6, 0, 0.8, 0.6, 0,
    ]);
    
    // UVs para textura
    const uvs = new Float32Array([
        // Frontal
        0.5, 1, 0, 0, 1, 0,
        // Trasera
        0.5, 1, 1, 0, 0, 0,
        // Izquierda
        0.5, 1, 0, 0, 1, 0,
        // Derecha
        0.5, 1, 1, 0, 0, 0,
    ]);
    
    roofGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    roofGeometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    roofGeometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    roofGeometry.computeVertexNormals();
    
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, baseY, 0);
    roof.castShadow = true;
    roof.receiveShadow = true;
    roof.userData.componentType = 'roof';
    
    group.add(roof);
    
    // ===== CUMBRERA (RIDGE) DESACTIVADA =====
    // ✨ Eliminada porque generaba un palo visible sobresaliendo del techo
    /*
    const ridgeGeometry = new THREE.BoxGeometry(0.15, 0.15, roofDepth);
    const ridgeMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.7,
        metalness: 0.1
    });
    const ridge = new THREE.Mesh(ridgeGeometry, ridgeMaterial);
    ridge.position.set(0, baseY + roofHeight, 0);
    ridge.castShadow = true;
    ridge.receiveShadow = true;
    ridge.userData.componentType = 'roof';
    
    group.add(ridge);
    */
    
    // ===== CREAR BASE DEL TECHO (OPCIONAL - para cerrar la estructura) =====
    const baseGeometry = new THREE.BoxGeometry(baseSize, 0.15, baseSize);
    const baseMaterial = MaterialLibrary.createConcreteMaterial(0x999999);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, baseY - 0.075, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    base.userData.componentType = 'roof';
    
    group.add(base);
    
    console.log(`🏠 Techo a 4 aguas creado con pendiente de ${roofHeight}m`);
    
    return group;
}

// ============================================================================
// ESCALERAS CON DETALLES
// ============================================================================

function createStairs(levels) {
    if (levels < 2) return new THREE.Group();
    
    const group = new THREE.Group();
    const floorHeight = 3.5;
    
    const stairMaterial = MaterialLibrary.createConcreteMaterial(
        STRUCTURAL_DATA.components.stairs.color
    );
    
    for (let level = 0; level < levels - 1; level++) {
        const numSteps = 14;
        const stepWidth = 1.2;
        const stepDepth = 0.25;
        const stepHeight = floorHeight / numSteps;
        
        const startY = 0.8 + level * floorHeight;
        
        for (let i = 0; i < numSteps; i++) {
            // Escalón con bisel sutil
            const stepGeometry = createBeveledBox(stepWidth, stepHeight, stepDepth, 0.005);
            const step = new THREE.Mesh(stepGeometry, stairMaterial.clone());
            
            step.position.set(
                4.5,
                startY + i * stepHeight + stepHeight / 2,
                -2 + (i * stepDepth)
            );
            
            step.castShadow = true;
            step.receiveShadow = true;
            step.userData.componentType = 'stairs';
            step.userData.level = level;
            
            group.add(step);
        }
    }
    
    return group;
}

// ============================================================================
// UTILIDAD: CREAR GEOMETRÍA CON BISELES
// ============================================================================

function createBeveledBox(width, height, depth, bevelSize = 0.02) {
    // Crear geometría de caja con segmentos para biseles suaves
    const geometry = new THREE.BoxGeometry(
        width, 
        height, 
        depth,
        2, 2, 2  // Segmentos para mejor calidad
    );
    
    // Aplicar bisel suave en las esquinas
    const positions = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        
        // Suavizar esquinas
        const absX = Math.abs(vertex.x);
        const absY = Math.abs(vertex.y);
        const absZ = Math.abs(vertex.z);
        
        if (absX > width/2 - bevelSize && absY > height/2 - bevelSize) {
            vertex.x *= 0.98;
            vertex.y *= 0.98;
        }
        if (absY > height/2 - bevelSize && absZ > depth/2 - bevelSize) {
            vertex.y *= 0.98;
            vertex.z *= 0.98;
        }
        if (absX > width/2 - bevelSize && absZ > depth/2 - bevelSize) {
            vertex.x *= 0.98;
            vertex.z *= 0.98;
        }
        
        positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
}

// ============================================================================
// CONSTRUIR EDIFICIO COMPLETO
// ============================================================================
// ✨ MODIFICADO: Ahora maneja los componentes 'windows' y 'doors' que vienen
//    integrados dentro de createWalls via OpeningsManager

function buildBuilding(levels) {
    clearScene();
    
    const components = STRUCTURAL_DATA.buildingLevels[levels].components;
    
    console.log(`🏗️ Construyendo edificio de ${levels} nivel(es) con materiales realistas...`);
    
    // Crear cada componente con materiales mejorados
    if (components.includes('foundation')) {
        const foundation = createFoundation(levels);
        buildingGroup.add(foundation);
        componentsMap.set('foundation', foundation);
    }
    
    if (components.includes('columns')) {
        const columns = createColumns(levels);
        buildingGroup.add(columns);
        componentsMap.set('columns', columns);
    }
    
    if (components.includes('beams')) {
        const beams = createBeams(levels);
        buildingGroup.add(beams);
        componentsMap.set('beams', beams);
    }
    
    if (components.includes('slabs')) {
        const slabs = createSlabs(levels);
        buildingGroup.add(slabs);
        componentsMap.set('slabs', slabs);
    }
    
    // ✨ Muros ahora incluyen ventanas y puertas automáticamente
    // createWalls delega a OpeningsManager.createWallsWithOpenings
    // que genera muros segmentados + ventanas + puertas en un solo grupo
    if (components.includes('walls')) {
        const walls = createWalls(levels);
        buildingGroup.add(walls);
        componentsMap.set('walls', walls);
    }
    
    if (components.includes('roof')) {
        const roof = createRoof(levels);
        buildingGroup.add(roof);
        componentsMap.set('roof', roof);
    }
    
    if (components.includes('stairs')) {
        const stairs = createStairs(levels);
        buildingGroup.add(stairs);
        componentsMap.set('stairs', stairs);
    }
    
    // Generar enfierradura detallada
    const reinforcement = reinforcementGenerator.generateCompleteReinforcement(levels);
    buildingGroup.add(reinforcement);
    componentsMap.set('reinforcement_detailed', reinforcement);
    
    currentBuilding = levels;
    console.log(`✅ Edificio de ${levels} nivel(es) construido con realismo mejorado`);
    console.log(`🏠 Techo: A 4 aguas con pendiente`);
    console.log(`🚪 Puertas y 🪟 Ventanas: Integradas en muros`);
    console.log(`💎 Materiales: Concreto PBR + Ladrillo + Techo impermeabilizado + Vidrio + Madera`);
}

// ============================================================================
// VISTA EXPLOSIVA
// ============================================================================

function toggleExplodeView() {
    isExploded = !isExploded;
    const distance = isExploded ? DISPLAY_CONFIG.explodeDistance[currentBuilding] : 0;
    const duration = 1000;
    
    animateExplosion(distance, duration);
}

// Animar explosión de vista
function animateExplosion(targetDistance, duration) {
    const startTime = Date.now();
    const startPositions = new Map();
    
    // Guardar posiciones iniciales ACTUALES
    componentsMap.forEach((group, type) => {
        const pos = group.position.clone();
        startPositions.set(type, pos);
    });
    
    // Calcular posiciones objetivo para cada componente
    const targetPositions = new Map();
    let index = 0;
    
    componentsMap.forEach((group, type) => {
        const startPos = startPositions.get(type);
        const offset = isExploded ? (index * DISPLAY_CONFIG.componentSpacing) : 0;
        
        targetPositions.set(type, {
            x: startPos.x,
            y: startPos.y + offset - (isExploded ? 0 : startPos.y - getOriginalYPosition(type)),
            z: startPos.z
        });
        
        index++;
    });
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-in-out)
        const eased = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        componentsMap.forEach((group, type) => {
            const startPos = startPositions.get(type);
            const targetPos = targetPositions.get(type);
            
            group.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
            group.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
            group.position.z = startPos.z + (targetPos.z - startPos.z) * eased;
        });
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Función auxiliar para obtener posición Y original
function getOriginalYPosition(componentType) {
    const originalPositions = {
        'foundation': 0,
        'columns': 0,
        'beams': 0,
        'slabs': 0,
        'walls': 0,
        'roof': 0,
        'stairs': 0,
        'reinforcement_detailed': 0
    };
    
    return originalPositions[componentType] || 0;
}

console.log('✅ Módulo de modelos realistas cargado');
console.log('🎨 Geometría: Biseles + Detalles constructivos');
console.log('🏠 Techo: A 4 aguas con pendiente realista');
console.log('🚪🪟 Ventanas y Puertas: Integradas');
console.log('💎 Materiales: PBR físicamente correctos');