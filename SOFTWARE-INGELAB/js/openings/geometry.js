// ============================================================================
// GEOMETRÍA DE VENTANAS Y PUERTAS
// ============================================================================
// Archivo: js/openings/geometry.js
// Descripción: Creación de geometrías 3D para ventanas y puertas
// ============================================================================

const OpeningsGeometry = {
    
    // ========================================================================
    // CREAR VENTANA COMPLETA (Marco + Vidrio + Alféizar + Divisores)
    // ========================================================================
    createWindow(config) {
        const group = new THREE.Group();
        const cfg = OPENINGS_CONFIG.window;
        
        const w = cfg.width;
        const h = cfg.height;
        const fw = cfg.frameWidth;
        const fd = cfg.frameDepth;
        
        const frameMat = OpeningsMaterials.createWindowFrameMaterial();
        const glassMat = OpeningsMaterials.createGlassMaterial();
        const sillMat = OpeningsMaterials.createSillMaterial();
        
        // --- MARCO EXTERIOR (4 piezas) ---
        
        // Marco superior
        const topFrame = new THREE.Mesh(
            new THREE.BoxGeometry(w + fw * 2, fw, fd),
            frameMat
        );
        topFrame.position.set(0, h / 2 + fw / 2, 0);
        topFrame.castShadow = true;
        topFrame.receiveShadow = true;
        topFrame.userData.componentType = 'windows';
        group.add(topFrame);
        
        // Marco inferior
        const bottomFrame = new THREE.Mesh(
            new THREE.BoxGeometry(w + fw * 2, fw, fd),
            frameMat.clone()
        );
        bottomFrame.position.set(0, -h / 2 - fw / 2, 0);
        bottomFrame.castShadow = true;
        bottomFrame.receiveShadow = true;
        bottomFrame.userData.componentType = 'windows';
        group.add(bottomFrame);
        
        // Marco izquierdo
        const leftFrame = new THREE.Mesh(
            new THREE.BoxGeometry(fw, h, fd),
            frameMat.clone()
        );
        leftFrame.position.set(-w / 2 - fw / 2, 0, 0);
        leftFrame.castShadow = true;
        leftFrame.receiveShadow = true;
        leftFrame.userData.componentType = 'windows';
        group.add(leftFrame);
        
        // Marco derecho
        const rightFrame = new THREE.Mesh(
            new THREE.BoxGeometry(fw, h, fd),
            frameMat.clone()
        );
        rightFrame.position.set(w / 2 + fw / 2, 0, 0);
        rightFrame.castShadow = true;
        rightFrame.receiveShadow = true;
        rightFrame.userData.componentType = 'windows';
        group.add(rightFrame);
        
        // --- DIVISOR CENTRAL VERTICAL ---
        const divW = cfg.dividerWidth;
        const vDivider = new THREE.Mesh(
            new THREE.BoxGeometry(divW, h, fd * 0.5),
            frameMat.clone()
        );
        vDivider.position.set(0, 0, 0);
        vDivider.castShadow = true;
        vDivider.userData.componentType = 'windows';
        group.add(vDivider);
        
        // --- DIVISOR CENTRAL HORIZONTAL ---
        const hDivider = new THREE.Mesh(
            new THREE.BoxGeometry(w, divW, fd * 0.5),
            frameMat.clone()
        );
        hDivider.position.set(0, 0, 0);
        hDivider.castShadow = true;
        hDivider.userData.componentType = 'windows';
        group.add(hDivider);
        
        // --- VIDRIOS (4 paneles) ---
        const glassW = (w - divW) / 2 - 0.01;
        const glassH = (h - divW) / 2 - 0.01;
        
        const glassPositions = [
            [-glassW / 2 - divW / 2, glassH / 2 + divW / 2],   // Superior izq
            [glassW / 2 + divW / 2, glassH / 2 + divW / 2],    // Superior der
            [-glassW / 2 - divW / 2, -glassH / 2 - divW / 2],  // Inferior izq
            [glassW / 2 + divW / 2, -glassH / 2 - divW / 2],   // Inferior der
        ];
        
        glassPositions.forEach(pos => {
            const glass = new THREE.Mesh(
                new THREE.BoxGeometry(glassW, glassH, cfg.glassDepth),
                glassMat.clone()
            );
            glass.position.set(pos[0], pos[1], 0);
            glass.userData.componentType = 'windows';
            group.add(glass);
        });
        
        // --- ALFÉIZAR (Repisa inferior) ---
        const sill = new THREE.Mesh(
            new THREE.BoxGeometry(w + fw * 2 + 0.1, cfg.sillHeight, cfg.sillDepth),
            sillMat
        );
        sill.position.set(0, -h / 2 - fw - cfg.sillHeight / 2, fd * 0.3);
        sill.castShadow = true;
        sill.receiveShadow = true;
        sill.userData.componentType = 'windows';
        group.add(sill);
        
        return group;
    },
    
    // ========================================================================
    // CREAR PUERTA COMPLETA (Marco + Hoja + Manilla + Dintel)
    // ========================================================================
    createDoor(config) {
        const group = new THREE.Group();
        const cfg = OPENINGS_CONFIG.door;
        
        const w = cfg.width;
        const h = cfg.height;
        const fw = cfg.frameWidth;
        const fd = cfg.frameDepth;
        
        const frameMat = OpeningsMaterials.createDoorFrameMaterial();
        const panelMat = OpeningsMaterials.createDoorPanelMaterial();
        const handleMat = OpeningsMaterials.createHandleMaterial();
        
        // --- MARCO DE PUERTA (3 piezas - sin parte inferior) ---
        
        // Dintel superior
        const topFrame = new THREE.Mesh(
            new THREE.BoxGeometry(w + fw * 2, cfg.topFrameHeight, fd),
            frameMat
        );
        topFrame.position.set(0, h / 2 + cfg.topFrameHeight / 2, 0);
        topFrame.castShadow = true;
        topFrame.receiveShadow = true;
        topFrame.userData.componentType = 'doors';
        group.add(topFrame);
        
        // Jamba izquierda
        const leftJamb = new THREE.Mesh(
            new THREE.BoxGeometry(fw, h, fd),
            frameMat.clone()
        );
        leftJamb.position.set(-w / 2 - fw / 2, 0, 0);
        leftJamb.castShadow = true;
        leftJamb.receiveShadow = true;
        leftJamb.userData.componentType = 'doors';
        group.add(leftJamb);
        
        // Jamba derecha
        const rightJamb = new THREE.Mesh(
            new THREE.BoxGeometry(fw, h, fd),
            frameMat.clone()
        );
        rightJamb.position.set(w / 2 + fw / 2, 0, 0);
        rightJamb.castShadow = true;
        rightJamb.receiveShadow = true;
        rightJamb.userData.componentType = 'doors';
        group.add(rightJamb);
        
        // --- HOJA DE PUERTA ---
        const panel = new THREE.Mesh(
            new THREE.BoxGeometry(w - 0.02, h - 0.02, cfg.panelDepth),
            panelMat
        );
        panel.position.set(0, 0, 0.01);
        panel.castShadow = true;
        panel.receiveShadow = true;
        panel.userData.componentType = 'doors';
        group.add(panel);
        
        // --- MANILLA (Lado derecho) ---
        // Base de la manilla
        const handleBase = new THREE.Mesh(
            new THREE.CylinderGeometry(cfg.handleSize, cfg.handleSize, 0.02, 16),
            handleMat
        );
        handleBase.rotation.x = Math.PI / 2;
        handleBase.position.set(w / 2 - 0.12, cfg.handleHeight - h / 2, cfg.panelDepth / 2 + 0.02);
        handleBase.userData.componentType = 'doors';
        group.add(handleBase);
        
        // Palanca de la manilla
        const handleLever = new THREE.Mesh(
            new THREE.BoxGeometry(0.10, 0.025, 0.025),
            handleMat.clone()
        );
        handleLever.position.set(w / 2 - 0.17, cfg.handleHeight - h / 2, cfg.panelDepth / 2 + 0.035);
        handleLever.userData.componentType = 'doors';
        group.add(handleLever);
        
        // Manilla trasera (espejada)
        const handleBaseBack = handleBase.clone();
        handleBaseBack.position.z = -(cfg.panelDepth / 2 + 0.02);
        handleBaseBack.userData.componentType = 'doors';
        group.add(handleBaseBack);
        
        const handleLeverBack = handleLever.clone();
        handleLeverBack.position.z = -(cfg.panelDepth / 2 + 0.035);
        handleLeverBack.userData.componentType = 'doors';
        group.add(handleLeverBack);
        
        // --- UMBRAL (Piso de la puerta) ---
        const threshold = new THREE.Mesh(
            new THREE.BoxGeometry(w + fw * 2, 0.03, fd + 0.05),
            new THREE.MeshStandardMaterial({
                color: 0x8B7355,
                roughness: 0.7,
                metalness: 0.1
            })
        );
        threshold.position.set(0, -h / 2 + 0.015, 0);
        threshold.userData.componentType = 'doors';
        group.add(threshold);
        
        return group;
    }
};

// Hacer disponible globalmente
window.OpeningsGeometry = OpeningsGeometry;

console.log('✅ Geometrías de ventanas y puertas cargadas');
