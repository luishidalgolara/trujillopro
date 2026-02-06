// ============================================================================
// MANAGER DE VENTANAS Y PUERTAS
// ============================================================================
// Archivo: js/openings/manager.js
// Descripción: Orquesta la creación de muros con aberturas, ventanas y puertas
// ============================================================================

const OpeningsManager = {
    
    // Grupo principal que contiene todas las aberturas
    openingsGroup: null,
    
    // ========================================================================
    // CREAR MUROS CON ABERTURAS + VENTANAS + PUERTAS
    // ========================================================================
    // Esta función REEMPLAZA los muros sólidos de createWalls original
    // Genera muros segmentados con huecos y coloca ventanas/puertas
    
    createWallsWithOpenings(levels) {
        const group = new THREE.Group();
        const wallThickness = 0.15;
        const wallHeight = 3.3;
        const floorHeight = 3.5;
        
        // Material de ladrillo (mismo que el original)
        const wallMaterial = MaterialLibrary.createBrickMaterial();
        
        // Configuración de cada cara
        const faces = [
            { 
                id: 'front', 
                axis: 'x', 
                wallWidth: 6, 
                fixedPos: 3, 
                fixedAxis: 'z',
                rotation: 0,
                normal: new THREE.Vector3(0, 0, 1)
            },
            { 
                id: 'back', 
                axis: 'x', 
                wallWidth: 6, 
                fixedPos: -3, 
                fixedAxis: 'z',
                rotation: Math.PI,
                normal: new THREE.Vector3(0, 0, -1)
            },
            { 
                id: 'left', 
                axis: 'z', 
                wallWidth: 6, 
                fixedPos: -3, 
                fixedAxis: 'x',
                rotation: -Math.PI / 2,
                normal: new THREE.Vector3(-1, 0, 0)
            },
            { 
                id: 'right', 
                axis: 'z', 
                wallWidth: 6, 
                fixedPos: 3, 
                fixedAxis: 'x',
                rotation: Math.PI / 2,
                normal: new THREE.Vector3(1, 0, 0)
            }
        ];
        
        for (let level = 0; level < levels; level++) {
            const baseY = 0.8 + level * floorHeight;
            
            faces.forEach(face => {
                // Obtener aberturas para esta cara y nivel
                const layoutKey = face.id;
                const faceLayout = OPENINGS_CONFIG.layouts[layoutKey] || [];
                
                const openingsForLevel = faceLayout.filter(item => {
                    if (item.levels === 'all') return true;
                    return Array.isArray(item.levels) && item.levels.includes(level);
                });
                
                // Generar segmentos de muro con huecos
                this._buildWallWithOpenings(
                    group, face, openingsForLevel, level, 
                    baseY, wallHeight, wallThickness, wallMaterial
                );
                
                // Colocar ventanas y puertas en los huecos
                openingsForLevel.forEach(opening => {
                    this._placeOpening(group, face, opening, level, baseY, wallHeight, wallThickness);
                });
            });
        }
        
        this.openingsGroup = group;
        console.log(`🚪🪟 Muros con ventanas y puertas creados para ${levels} nivel(es)`);
        
        return group;
    },
    
    // ========================================================================
    // CONSTRUIR MURO SEGMENTADO CON HUECOS
    // ========================================================================
    _buildWallWithOpenings(group, face, openings, level, baseY, wallHeight, wallThickness, wallMaterial) {
        const wallWidth = face.wallWidth; // 6
        const halfWidth = wallWidth / 2;  // 3
        
        // Si no hay aberturas, crear muro sólido (comportamiento original)
        if (openings.length === 0) {
            this._createSolidWallSegment(
                group, face, -halfWidth, halfWidth, 
                baseY, wallHeight, wallThickness, wallMaterial, level
            );
            return;
        }
        
        // Calcular los huecos ordenados por posición
        const holes = openings.map(op => {
            const cfg = op.type === 'door' ? OPENINGS_CONFIG.door : OPENINGS_CONFIG.window;
            const w = cfg.width + (cfg.frameWidth || 0.06) * 2;
            const h = op.type === 'door' ? cfg.height : cfg.height;
            const bottomY = op.type === 'door' ? 0 : OPENINGS_CONFIG.window.bottomOffset;
            
            return {
                center: op.position,
                halfW: w / 2,
                left: op.position - w / 2,
                right: op.position + w / 2,
                bottomY: bottomY,
                topY: bottomY + h + (op.type === 'window' ? OPENINGS_CONFIG.window.frameWidth * 2 : OPENINGS_CONFIG.door.topFrameHeight),
                type: op.type
            };
        }).sort((a, b) => a.left - b.left);
        
        // --- Segmentos VERTICALES (a los lados de cada abertura) ---
        
        // Segmento desde el borde izquierdo del muro hasta la primera abertura
        let currentLeft = -halfWidth;
        
        holes.forEach((hole, index) => {
            const segLeft = currentLeft;
            const segRight = hole.left;
            const segWidth = segRight - segLeft;
            
            if (segWidth > 0.05) {
                this._createSolidWallSegment(
                    group, face, segLeft, segRight,
                    baseY, wallHeight, wallThickness, wallMaterial, level
                );
            }
            
            currentLeft = hole.right;
            
            // --- Segmento SUPERIOR sobre la abertura ---
            const topSegHeight = wallHeight - hole.topY;
            if (topSegHeight > 0.05) {
                this._createWallPiece(
                    group, face,
                    hole.left, hole.right,
                    baseY + hole.topY, topSegHeight,
                    wallThickness, wallMaterial, level
                );
            }
            
            // --- Segmento INFERIOR bajo la abertura (solo ventanas) ---
            if (hole.type === 'window' && hole.bottomY > 0.05) {
                this._createWallPiece(
                    group, face,
                    hole.left, hole.right,
                    baseY, hole.bottomY,
                    wallThickness, wallMaterial, level
                );
            }
        });
        
        // Segmento desde la última abertura hasta el borde derecho del muro
        const lastSegWidth = halfWidth - currentLeft;
        if (lastSegWidth > 0.05) {
            this._createSolidWallSegment(
                group, face, currentLeft, halfWidth,
                baseY, wallHeight, wallThickness, wallMaterial, level
            );
        }
    },
    
    // ========================================================================
    // CREAR SEGMENTO DE MURO SÓLIDO (altura completa)
    // ========================================================================
    _createSolidWallSegment(group, face, left, right, baseY, wallHeight, wallThickness, wallMaterial, level) {
        this._createWallPiece(group, face, left, right, baseY, wallHeight, wallThickness, wallMaterial, level);
    },
    
    // ========================================================================
    // CREAR PIEZA DE MURO (segmento arbitrario)
    // ========================================================================
    _createWallPiece(group, face, left, right, baseY, height, wallThickness, wallMaterial, level) {
        const width = right - left;
        if (width < 0.01 || height < 0.01) return;
        
        const centerOffset = (left + right) / 2;
        const yCenter = baseY + height / 2;
        
        let geometry, mesh, posX, posY, posZ;
        
        if (face.fixedAxis === 'z') {
            // Muros frontal/trasero: se extienden en X
            geometry = new THREE.BoxGeometry(width, height, wallThickness);
            mesh = new THREE.Mesh(geometry, wallMaterial.clone());
            posX = centerOffset;
            posY = yCenter;
            posZ = face.fixedPos;
        } else {
            // Muros laterales: se extienden en Z
            geometry = new THREE.BoxGeometry(wallThickness, height, width);
            mesh = new THREE.Mesh(geometry, wallMaterial.clone());
            posX = face.fixedPos;
            posY = yCenter;
            posZ = centerOffset;
        }
        
        mesh.position.set(posX, posY, posZ);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData.componentType = 'walls';
        mesh.userData.level = level;
        
        group.add(mesh);
    },
    
    // ========================================================================
    // COLOCAR VENTANA O PUERTA EN SU POSICIÓN
    // ========================================================================
    _placeOpening(group, face, opening, level, baseY, wallHeight, wallThickness) {
        const isWindow = opening.type === 'window';
        const cfg = isWindow ? OPENINGS_CONFIG.window : OPENINGS_CONFIG.door;
        
        // Crear la geometría de ventana o puerta
        const openingMesh = isWindow 
            ? OpeningsGeometry.createWindow(cfg)
            : OpeningsGeometry.createDoor(cfg);
        
        // Calcular posición Y del centro de la abertura
        let centerY;
        if (isWindow) {
            centerY = baseY + cfg.bottomOffset + cfg.height / 2;
        } else {
            centerY = baseY + cfg.height / 2;
        }
        
        // Posicionar según la cara del muro
        if (face.fixedAxis === 'z') {
            // Muros frontal/trasero
            openingMesh.position.set(
                opening.position,
                centerY,
                face.fixedPos
            );
            
            // Rotar para que mire hacia afuera
            if (face.id === 'back') {
                openingMesh.rotation.y = Math.PI;
            }
        } else {
            // Muros laterales
            openingMesh.position.set(
                face.fixedPos,
                centerY,
                opening.position
            );
            
            // Rotar para alinearse con el muro lateral
            if (face.id === 'left') {
                openingMesh.rotation.y = -Math.PI / 2;
            } else {
                openingMesh.rotation.y = Math.PI / 2;
            }
        }
        
        // Marcar userData para interactividad
        openingMesh.traverse(child => {
            if (child.isMesh) {
                child.userData.componentType = isWindow ? 'windows' : 'doors';
                child.userData.level = level;
                child.userData.openingId = opening.id;
            }
        });
        
        group.add(openingMesh);
    }
};

// Hacer disponible globalmente
window.OpeningsManager = OpeningsManager;

console.log('✅ Manager de ventanas y puertas cargado');
console.log('🚪 Puertas: principal + trasera por nivel');
console.log('🪟 Ventanas: distribuidas en las 4 caras');
