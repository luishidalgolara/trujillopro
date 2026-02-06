// ============================================================================
// GENERADOR DE SISTEMA DE TUBERÍAS PROFESIONAL
// ============================================================================

class PlumbingPipes {
    
    // ========================================================================
    // SISTEMA COMPLETO DE BAÑO (REALISTA)
    // ========================================================================
    
    static createBathroomSystem(baseX, baseZ, yFloor, level) {
        const group = new THREE.Group();
        const yUnder = yFloor + PLUMBING_CONFIG.heights.underSlab;
        
        const locs = PLUMBING_CONFIG.locations.bathroom;
        
        // ====================================================================
        // 1. INODORO (WC) - Bajada principal 4"
        // ====================================================================
        
        const wcX = baseX + (locs.toilet.x - locs.x);
        const wcZ = baseZ + (locs.toilet.z - locs.z);
        
        // Bajada vertical principal desde WC
        const wcDrain = PlumbingGeometry.createStraightPipe(
            3.0,  // 3m de bajada
            PLUMBING_CONFIG.diameters['4"'],
            '4"'
        );
        wcDrain.position.set(wcX, yUnder - 1.5, wcZ);
        group.add(wcDrain);
        
        // Codo horizontal en la base
        const wcElbow = PlumbingGeometry.createElbow90(
            PLUMBING_CONFIG.diameters['4"'],
            '4"'
        );
        wcElbow.rotation.y = Math.PI / 2;
        wcElbow.position.set(wcX, yUnder - 3.0, wcZ);
        group.add(wcElbow);
        
        // ====================================================================
        // 2. LAVAMANOS - Desagüe 2"
        // ====================================================================
        
        const sinkX = baseX + (locs.sink.x - locs.x);
        const sinkZ = baseZ + (locs.sink.z - locs.z);
        
        // Bajada corta desde lavamanos
        const sinkDrain = PlumbingGeometry.createStraightPipe(
            0.6,  // 60cm de bajada
            PLUMBING_CONFIG.diameters['2"'],
            '2"'
        );
        sinkDrain.position.set(sinkX, yUnder - 0.3, sinkZ);
        group.add(sinkDrain);
        
        // Codo para conectar a horizontal
        const sinkElbow = PlumbingGeometry.createElbow90(
            PLUMBING_CONFIG.diameters['2"'],
            '2"'
        );
        sinkElbow.rotation.y = -Math.PI / 2;
        sinkElbow.rotation.x = Math.PI;
        sinkElbow.position.set(sinkX, yUnder - 0.6, sinkZ);
        group.add(sinkElbow);
        
        // Tubería horizontal hacia WC
        const distX = Math.abs(wcX - sinkX);
        const sinkHoriz = PlumbingGeometry.createStraightPipe(
            distX,
            PLUMBING_CONFIG.diameters['2"'],
            '2"'
        );
        sinkHoriz.rotation.z = Math.PI / 2;
        sinkHoriz.position.set((sinkX + wcX) / 2, yUnder - 0.6, sinkZ);
        group.add(sinkHoriz);
        
        // ====================================================================
        // 3. DUCHA - Desagüe 3"
        // ====================================================================
        
        const showerX = baseX + (locs.shower.x - locs.x);
        const showerZ = baseZ + (locs.shower.z - locs.z);
        
        // Bajada desde ducha
        const showerDrain = PlumbingGeometry.createStraightPipe(
            0.5,  // 50cm
            PLUMBING_CONFIG.diameters['3"'],
            '3"'
        );
        showerDrain.position.set(showerX, yUnder - 0.25, showerZ);
        group.add(showerDrain);
        
        // Codo horizontal
        const showerElbow = PlumbingGeometry.createElbow90(
            PLUMBING_CONFIG.diameters['3"'],
            '3"'
        );
        showerElbow.rotation.z = Math.PI;
        showerElbow.position.set(showerX, yUnder - 0.5, showerZ);
        group.add(showerElbow);
        
        // Horizontal hacia bajada principal
        const distZ = Math.abs(wcZ - showerZ);
        const showerHoriz = PlumbingGeometry.createStraightPipe(
            distZ,
            PLUMBING_CONFIG.diameters['3"'],
            '3"'
        );
        showerHoriz.rotation.x = Math.PI / 2;
        showerHoriz.rotation.z = Math.PI / 2;
        showerHoriz.position.set(showerX, yUnder - 0.5, (showerZ + wcZ) / 2);
        group.add(showerHoriz);
        
        // ====================================================================
        // 4. VENTILACIÓN (tubo delgado que sube)
        // ====================================================================
        
        if (level === 0) { // Solo en último nivel
            const ventPipe = PlumbingGeometry.createStraightPipe(
                1.2,  // Sube 1.2m sobre el techo
                PLUMBING_CONFIG.diameters['vent'],
                'vent'
            );
            ventPipe.position.set(wcX + 0.15, yFloor + 0.6, wcZ + 0.15);
            group.add(ventPipe);
        }
        
        group.userData.location = 'bathroom';
        group.userData.level = level;
        
        return group;
    }

    // ========================================================================
    // SISTEMA DE COCINA (REALISTA)
    // ========================================================================
    
    static createKitchenSystem(baseX, baseZ, yFloor, level) {
        const group = new THREE.Group();
        const yUnder = yFloor + PLUMBING_CONFIG.heights.underSlab;
        
        const locs = PLUMBING_CONFIG.locations.kitchen;
        
        const sinkX = baseX + (locs.sink.x - locs.x);
        const sinkZ = baseZ + (locs.sink.z - locs.z);
        
        // Bajada principal de cocina 4"
        const kitchenDrain = PlumbingGeometry.createStraightPipe(
            2.5,  // 2.5m de bajada
            PLUMBING_CONFIG.diameters['4"'],
            '4"'
        );
        kitchenDrain.position.set(sinkX, yUnder - 1.25, sinkZ);
        group.add(kitchenDrain);
        
        // Desagüe horizontal del fregadero
        const sinkDrain = PlumbingGeometry.createStraightPipe(
            0.8,
            PLUMBING_CONFIG.diameters['3"'],
            '3"'
        );
        sinkDrain.rotation.z = Math.PI / 2;
        sinkDrain.position.set(sinkX + 0.4, yUnder - 0.1, sinkZ);
        group.add(sinkDrain);
        
        // Codo de conexión
        const sinkElbow = PlumbingGeometry.createElbow90(
            PLUMBING_CONFIG.diameters['3"'],
            '3"'
        );
        sinkElbow.rotation.y = Math.PI;
        sinkElbow.rotation.z = Math.PI / 2;
        sinkElbow.position.set(sinkX, yUnder - 0.2, sinkZ);
        group.add(sinkElbow);
        
        // Trampa de grasa (caja pequeña)
        const greaseTrap = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.10, 0.15),
            new THREE.MeshStandardMaterial({ 
                color: 0x555555,
                roughness: 0.7,
                metalness: 0.2
            })
        );
        greaseTrap.position.set(sinkX + 0.6, yUnder - 0.15, sinkZ);
        greaseTrap.castShadow = true;
        group.add(greaseTrap);
        
        group.userData.location = 'kitchen';
        group.userData.level = level;
        
        return group;
    }

    // ========================================================================
    // COLECTOR PRINCIPAL HORIZONTAL (bajo cimentación)
    // ========================================================================
    
    static createMainCollector(bathroomX, kitchenX, y, z) {
        const group = new THREE.Group();
        const length = Math.abs(bathroomX - kitchenX);
        
        // Tubería colectora principal 6"
        const collector = PlumbingGeometry.createStraightPipe(
            length,
            PLUMBING_CONFIG.diameters['6"'],
            '6"'
        );
        
        collector.rotation.z = Math.PI / 2;
        collector.position.set((bathroomX + kitchenX) / 2, y, z);
        
        group.add(collector);
        return group;
    }

    // ========================================================================
    // CONEXIONES VERTICALES A HORIZONTAL
    // ========================================================================
    
    static createVerticalToHorizontalConnection(x, yTop, yBottom, z, diameter, pipeType) {
        const group = new THREE.Group();
        const length = Math.abs(yTop - yBottom);
        
        // Bajada vertical
        const vertPipe = PlumbingGeometry.createStraightPipe(
            length,
            diameter,
            pipeType
        );
        vertPipe.position.set(x, (yTop + yBottom) / 2, z);
        group.add(vertPipe);
        
        // Codo en la base
        const elbow = PlumbingGeometry.createElbow90(diameter, pipeType);
        elbow.rotation.z = Math.PI;
        elbow.position.set(x, yBottom, z);
        group.add(elbow);
        
        return group;
    }

    // ========================================================================
    // TUBERÍA HORIZONTAL SIMPLE CON PENDIENTE
    // ========================================================================
    
    static createHorizontalPipe(x1, z1, x2, z2, y, diameter, pipeType) {
        const dx = x2 - x1;
        const dz = z2 - z1;
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dz, dx);
        
        const pipe = PlumbingGeometry.createStraightPipe(length, diameter, pipeType);
        pipe.rotation.z = Math.PI / 2;
        pipe.rotation.y = angle;
        pipe.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
        
        return pipe;
    }
}