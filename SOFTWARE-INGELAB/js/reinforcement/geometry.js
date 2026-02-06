// ============================================================================
// GEOMETRÍAS: VARILLAS CORRUGADAS Y ESTRIBOS
// ============================================================================

class RebarGeometry {
    
    // ========================================================================
    // MATERIALES PARA VARILLAS CON PBR
    // ========================================================================
    
    static createRebarMaterial(rebarType) {
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
    
    static createCorrugatedRebar(length, diameter, rebarType) {
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
        
        const material = RebarGeometry.createRebarMaterial(rebarType);
        const rebar = new THREE.Mesh(geometry, material);
        rebar.castShadow = true;
        rebar.userData.componentType = 'reinforcement';
        rebar.userData.rebarType = rebarType;
        
        return rebar;
    }
    
    // Crear varilla recta corrugada
    static createStraightRebar(length, diameter, rebarType) {
        return RebarGeometry.createCorrugatedRebar(length, diameter, rebarType);
    }

    // ========================================================================
    // ESTRIBOS CON GANCHOS DETALLADOS
    // ========================================================================
    
    static createStirrup(width, height, diameter, rebarType) {
        const group = new THREE.Group();
        const material = RebarGeometry.createRebarMaterial(rebarType);
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
        RebarGeometry.addDetailedCornerHooks(group, width, height, diameter, material);
        
        return group;
    }

    static addDetailedCornerHooks(group, width, height, diameter, material) {
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
}
