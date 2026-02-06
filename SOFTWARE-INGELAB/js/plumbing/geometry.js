// ============================================================================
// GEOMETRÍAS: TUBOS, CODOS Y CONEXIONES PROFESIONALES
// ============================================================================

class PlumbingGeometry {
    
    // ========================================================================
    // MATERIALES PARA TUBERÍAS PVC (PROFESIONALES)
    // ========================================================================
    
    static createPipeMaterial(pipeType) {
        const color = new THREE.Color(PLUMBING_CONFIG.colors[pipeType]);
        
        return new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.4,
            metalness: 0.15,
            envMapIntensity: 0.5,
            side: THREE.DoubleSide
        });
    }

    // ========================================================================
    // TUBO RECTO (CILINDRO) - OPTIMIZADO
    // ========================================================================
    
    static createStraightPipe(length, diameter, pipeType) {
        const radius = diameter / 2;
        
        // Geometría de tubo simple pero realista
        const geometry = new THREE.CylinderGeometry(
            radius,
            radius,
            length,
            16,  // Segmentos radiales (suficientes para verse bien)
            1,   // Segmentos de altura
            false
        );
        
        geometry.computeBoundingSphere();
        
        const material = PlumbingGeometry.createPipeMaterial(pipeType);
        const pipe = new THREE.Mesh(geometry, material);
        pipe.castShadow = true;
        pipe.receiveShadow = true;
        pipe.userData.componentType = 'plumbing';
        pipe.userData.pipeType = pipeType;
        
        return pipe;
    }

    // ========================================================================
    // CODO 90° (CURVA REALISTA)
    // ========================================================================
    
    static createElbow90(diameter, pipeType, direction = 'horizontal') {
        const radius = diameter / 2;
        const bendRadius = diameter * 2.0; // Radio de curvatura más suave
        
        // Crear curva suave para el codo
        const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(bendRadius * 0.6, bendRadius * 0.6, 0),
            new THREE.Vector3(bendRadius, bendRadius, 0)
        );
        
        const tubeGeometry = new THREE.TubeGeometry(
            curve, 
            16,      // Segmentos de la curva
            radius,  // Radio del tubo
            8,       // Segmentos radiales
            false
        );
        tubeGeometry.computeBoundingSphere();
        
        const material = PlumbingGeometry.createPipeMaterial(pipeType);
        const elbow = new THREE.Mesh(tubeGeometry, material);
        elbow.castShadow = true;
        elbow.receiveShadow = true;
        elbow.userData.componentType = 'plumbing';
        
        return elbow;
    }

    // ========================================================================
    // CONEXIÓN T (DERIVACIÓN) - PROFESIONAL
    // ========================================================================
    
    static createTeeJunction(diameter, pipeType) {
        const group = new THREE.Group();
        const radius = diameter / 2;
        const material = PlumbingGeometry.createPipeMaterial(pipeType);
        
        // Tubo principal horizontal
        const mainLength = diameter * 2.5;
        const mainPipe = new THREE.CylinderGeometry(radius, radius, mainLength, 12, 1, false);
        mainPipe.computeBoundingSphere();
        const mainMesh = new THREE.Mesh(mainPipe, material);
        mainMesh.rotation.z = Math.PI / 2;
        mainMesh.castShadow = true;
        group.add(mainMesh);
        
        // Tubo derivación (más corto)
        const branchLength = diameter * 1.5;
        const branchPipe = new THREE.CylinderGeometry(radius, radius, branchLength, 12, 1, false);
        branchPipe.computeBoundingSphere();
        const branchMesh = new THREE.Mesh(branchPipe, material);
        branchMesh.position.y = branchLength / 2;
        branchMesh.castShadow = true;
        group.add(branchMesh);
        
        // Nodo de conexión (esfera pequeña)
        const nodeGeometry = new THREE.SphereGeometry(radius * 1.1, 10, 10);
        nodeGeometry.computeBoundingSphere();
        const node = new THREE.Mesh(nodeGeometry, material);
        node.castShadow = true;
        group.add(node);
        
        return group;
    }

    // ========================================================================
    // CODO HORIZONTAL A VERTICAL (L invertida)
    // ========================================================================
    
    static createHorizontalToVertical(diameter, pipeType) {
        const group = new THREE.Group();
        const radius = diameter / 2;
        const material = PlumbingGeometry.createPipeMaterial(pipeType);
        
        // Tramo horizontal
        const horizLength = diameter * 2;
        const horizPipe = new THREE.CylinderGeometry(radius, radius, horizLength, 12, 1, false);
        horizPipe.computeBoundingSphere();
        const horizMesh = new THREE.Mesh(horizPipe, material);
        horizMesh.rotation.z = Math.PI / 2;
        horizMesh.position.x = -horizLength / 2;
        horizMesh.castShadow = true;
        group.add(horizMesh);
        
        // Codo 90°
        const elbow = PlumbingGeometry.createElbow90(diameter, pipeType);
        elbow.rotation.z = Math.PI;
        elbow.position.set(-horizLength, 0, 0);
        group.add(elbow);
        
        // Tramo vertical
        const vertLength = diameter * 2;
        const vertPipe = new THREE.CylinderGeometry(radius, radius, vertLength, 12, 1, false);
        vertPipe.computeBoundingSphere();
        const vertMesh = new THREE.Mesh(vertPipe, material);
        vertMesh.position.set(-horizLength, vertLength / 2 + diameter * 2, 0);
        vertMesh.castShadow = true;
        group.add(vertMesh);
        
        return group;
    }

    // ========================================================================
    // TUBO CON PENDIENTE
    // ========================================================================
    
    static createSlopedPipe(length, diameter, pipeType, slopePercent = 0.02) {
        const pipe = PlumbingGeometry.createStraightPipe(length, diameter, pipeType);
        const slopeAngle = Math.atan(slopePercent);
        pipe.rotation.z = slopeAngle;
        return pipe;
    }
    
    // ========================================================================
    // UNIÓN/ACOPLE (pequeño cilindro engrosado)
    // ========================================================================
    
    static createCoupling(diameter, pipeType) {
        const radius = diameter / 2;
        const material = PlumbingGeometry.createPipeMaterial(pipeType);
        
        const geometry = new THREE.CylinderGeometry(
            radius * 1.15, 
            radius * 1.15, 
            diameter * 0.4, 
            12, 
            1, 
            false
        );
        geometry.computeBoundingSphere();
        
        const coupling = new THREE.Mesh(geometry, material);
        coupling.castShadow = true;
        
        return coupling;
    }
}