// ============================================================================
// GENERADOR DE CAJAS DE REGISTRO PROFESIONALES
// ============================================================================

class PlumbingBoxes {
    
    // ========================================================================
    // CAJA DE REGISTRO ESTÁNDAR (MÁS COMPACTA)
    // ========================================================================
    
    static createRegisterBox(size = 'medium', x, y, z) {
        const group = new THREE.Group();
        const boxConfig = PLUMBING_CONFIG.boxes[size];
        
        // Material de concreto para la caja (más oscuro)
        const concreteMaterial = new THREE.MeshStandardMaterial({
            color: PLUMBING_CONFIG.colors.box,
            roughness: 0.85,
            metalness: 0.05
        });
        
        // Cuerpo de la caja (paredes más delgadas)
        const wallThickness = 0.03; // 3cm
        const walls = [
            // Pared frontal
            {
                width: boxConfig.width,
                height: boxConfig.depth,
                depth: wallThickness,
                pos: [0, -boxConfig.depth/2, boxConfig.height/2]
            },
            // Pared trasera
            {
                width: boxConfig.width,
                height: boxConfig.depth,
                depth: wallThickness,
                pos: [0, -boxConfig.depth/2, -boxConfig.height/2]
            },
            // Pared izquierda
            {
                width: wallThickness,
                height: boxConfig.depth,
                depth: boxConfig.height,
                pos: [-boxConfig.width/2, -boxConfig.depth/2, 0]
            },
            // Pared derecha
            {
                width: wallThickness,
                height: boxConfig.depth,
                depth: boxConfig.height,
                pos: [boxConfig.width/2, -boxConfig.depth/2, 0]
            },
            // Fondo
            {
                width: boxConfig.width,
                height: wallThickness,
                depth: boxConfig.height,
                pos: [0, -boxConfig.depth, 0]
            }
        ];
        
        walls.forEach(wall => {
            const geometry = new THREE.BoxGeometry(wall.width, wall.height, wall.depth);
            geometry.computeBoundingSphere();
            const mesh = new THREE.Mesh(geometry, concreteMaterial);
            mesh.position.set(...wall.pos);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            group.add(mesh);
        });
        
        // Tapa metálica (más delgada)
        const lidMaterial = new THREE.MeshStandardMaterial({
            color: 0x505050,
            roughness: 0.3,
            metalness: 0.8
        });
        
        const lidGeometry = new THREE.BoxGeometry(
            boxConfig.width,
            0.02, // 2cm de grosor
            boxConfig.height
        );
        lidGeometry.computeBoundingSphere();
        const lid = new THREE.Mesh(lidGeometry, lidMaterial);
        lid.position.y = 0;
        lid.castShadow = true;
        group.add(lid);
        
        // Posicionar el grupo
        group.position.set(x, y, z);
        group.userData.componentType = 'plumbing';
        group.userData.boxSize = size;
        
        return group;
    }

    // ========================================================================
    // CAJA PARA BAÑO (más pequeña)
    // ========================================================================
    
    static createBathroomBox(x, y, z, level) {
        const box = PlumbingBoxes.createRegisterBox('small', x, y, z);
        box.userData.location = 'bathroom';
        box.userData.level = level;
        return box;
    }

    // ========================================================================
    // CAJA PARA COCINA (más pequeña)
    // ========================================================================
    
    static createKitchenBox(x, y, z, level) {
        const box = PlumbingBoxes.createRegisterBox('small', x, y, z);
        box.userData.location = 'kitchen';
        box.userData.level = level;
        return box;
    }

    // ========================================================================
    // CAJA COLECTORA PRINCIPAL (mediana)
    // ========================================================================
    
    static createMainCollectorBox(x, y, z) {
        const box = PlumbingBoxes.createRegisterBox('medium', x, y, z);
        box.userData.location = 'mainCollector';
        return box;
    }
}