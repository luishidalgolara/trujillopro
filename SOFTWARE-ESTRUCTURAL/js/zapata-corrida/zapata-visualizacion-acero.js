/**
 * ZAPATA CORRIDA - VISUALIZACIÓN SOLO ACERO
 * Vista 3D completa del refuerzo con malla de zapata + barras del muro + estribos
 */

function actualizarVisualizacionSoloAcero(datos) {
    console.log('Iniciando visualización de solo acero zapata CORRIDA...');
    
    if (!sceneAcero) {
        console.error('sceneAcero no está inicializado');
        return;
    }
    
    try {
        // Limpiar escena
        while(sceneAcero.children.length > 0) { 
            const object = sceneAcero.children[0];
            if (object.geometry) object.geometry.dispose();
            if (object.material) object.material.dispose();
            sceneAcero.remove(object);
        }
        
        // Re-agregar luces MÁS POTENTES
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        sceneAcero.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
        mainLight.position.set(10, 15, 10);
        sceneAcero.add(mainLight);
        
        const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
        fillLight1.position.set(-10, 10, -10);
        sceneAcero.add(fillLight1);
        
        const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
        fillLight2.position.set(5, -5, 5);
        sceneAcero.add(fillLight2);
        
        const B = datos.B; // ANCHO de la zapata (perpendicular al muro)
        const h = datos.h; // ALTURA
        const L = datos.L; // LARGO de la zapata (paralelo al muro) - 5m
        const bMuro = datos.bMuro; // Ancho del muro (0.25m)
        const Df = datos.Df || 0;
        const recubrimiento = 0.07; // 7cm de recubrimiento
        
        console.log('===================================');
        console.log('ZAPATA CORRIDA - Parámetros:');
        console.log('Ancho (B):', B, 'm');
        console.log('Largo (L):', L, 'm');
        console.log('Altura (h):', h, 'm');
        console.log('Muro:', bMuro, 'm');
        console.log('===================================');
        
        // ========================================
        // CREAR SUELO SEMI-TRANSPARENTE
        // ========================================
        const sueloSize = Math.max(B, L) * 1.5;
        const sueloGeometry = new THREE.PlaneGeometry(sueloSize, sueloSize);
        const sueloMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B4513,
            roughness: 0.9,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const suelo = new THREE.Mesh(sueloGeometry, sueloMaterial);
        suelo.rotation.x = -Math.PI / 2;
        suelo.position.y = -Df;
        sceneAcero.add(suelo);
        
        // ========================================
        // PARÁMETROS DE MALLA DENSA Y PROFESIONAL
        // ========================================
        const espaciamientoLong = 0.15; // 15cm entre barras amarillas (a lo largo)
        const espaciamientoTrans = 0.20; // 20cm entre barras azules (perpendiculares)
        
        const barRadius = 0.006; // 6mm de radio visual (mismo para todas)
        const longitudGancho = 0.12; // 12cm de gancho vertical
        
        const largoUtilB = B - (recubrimiento * 2); // Ancho útil
        const largoUtilL = L - (recubrimiento * 2); // Largo útil
        
        const yPosBarras = -Df + recubrimiento + 0.03; // Posición Y de las barras
        
        // ========================================
        // CALCULAR NÚMERO DE BARRAS
        // ========================================
        // Barras AMARILLAS: van a lo LARGO (dirección L) - paralelas al muro
        // Necesitamos varias barras espaciadas a lo ANCHO (B)
        const numBarrasAmarillas = Math.floor(largoUtilB / espaciamientoLong) + 1;
        
        // Barras AZULES: van PERPENDICULARES (dirección B) - cruzan el ancho
        // Necesitamos varias barras espaciadas a lo LARGO (L)
        const numBarrasAzules = Math.floor(largoUtilL / espaciamientoTrans) + 1;
        
        console.log('===================================');
        console.log('MALLA PROFESIONAL DENSA');
        console.log('Barras AMARILLAS (a lo largo):', numBarrasAmarillas);
        console.log('Barras AZULES (perpendiculares):', numBarrasAzules);
        console.log('===================================');
        
        // ========================================
        // MATERIAL AMARILLO DORADO - Barras principales a lo largo
        // ========================================
        const barAmarillaMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFD700, // Amarillo dorado
            roughness: 0.3,
            metalness: 0.9,
            emissive: 0xFFAA00,
            emissiveIntensity: 0.5
        });
        
        // ========================================
        // MATERIAL AZUL BRILLANTE - Barras perpendiculares
        // ========================================
        const barAzulMaterial = new THREE.MeshStandardMaterial({
            color: 0x0099ff, // Azul brillante
            roughness: 0.3,
            metalness: 0.9,
            emissive: 0x0066ff,
            emissiveIntensity: 0.5
        });
        
        // ========================================
        // BARRAS AMARILLAS (A LO LARGO - dirección L)
        // Van paralelas al muro, espaciadas a lo ancho (B)
        // Con GANCHOS VERTICALES en ambos extremos (frente y atrás)
        // ========================================
        const barAmarillaGeometry = new THREE.CylinderGeometry(barRadius, barRadius, largoUtilL, 16);
        const ganchoGeometry = new THREE.CylinderGeometry(barRadius, barRadius, longitudGancho, 16);
        
        console.log('Creando', numBarrasAmarillas, 'barras AMARILLAS a lo largo con ganchos...');
        
        for (let i = 0; i < numBarrasAmarillas; i++) {
            const x = -B/2 + recubrimiento + (i * espaciamientoLong);
            
            // BARRA PRINCIPAL HORIZONTAL (en dirección Z = a lo LARGO)
            const barra = new THREE.Mesh(barAmarillaGeometry, barAmarillaMaterial);
            barra.rotation.x = Math.PI / 2; // Horizontal en dirección Z (largo)
            barra.position.set(x, yPosBarras, 0);
            sceneAcero.add(barra);
            
            // GANCHO VERTICAL en extremo FRONTAL (Z negativo)
            const ganchoFront = new THREE.Mesh(ganchoGeometry, barAmarillaMaterial);
            ganchoFront.position.set(x, yPosBarras + longitudGancho/2, -L/2 + recubrimiento);
            sceneAcero.add(ganchoFront);
            
            // GANCHO VERTICAL en extremo TRASERO (Z positivo)
            const ganchoBack = new THREE.Mesh(ganchoGeometry, barAmarillaMaterial);
            ganchoBack.position.set(x, yPosBarras + longitudGancho/2, L/2 - recubrimiento);
            sceneAcero.add(ganchoBack);
        }
        
        console.log('✓ Barras AMARILLAS creadas:', numBarrasAmarillas, 'con', numBarrasAmarillas * 2, 'ganchos');
        
        // ========================================
        // BARRAS AZULES (PERPENDICULARES - dirección X)
        // Cruzan el ancho, espaciadas a lo largo (L)
        // Con GANCHOS VERTICALES en ambos extremos (izquierda y derecha)
        // ========================================
        const barAzulGeometry = new THREE.CylinderGeometry(barRadius, barRadius, largoUtilB, 16);
        
        console.log('Creando', numBarrasAzules, 'barras AZULES perpendiculares con ganchos...');
        
        for (let i = 0; i < numBarrasAzules; i++) {
            const z = -L/2 + recubrimiento + (i * espaciamientoTrans);
            
            // BARRA PRINCIPAL HORIZONTAL (en dirección X = perpendicular)
            const barra = new THREE.Mesh(barAzulGeometry, barAzulMaterial);
            barra.rotation.z = Math.PI / 2; // Horizontal en dirección X (ancho)
            barra.position.set(0, yPosBarras + 0.015, z); // Ligeramente arriba para cruce visible
            sceneAcero.add(barra);
            
            // GANCHO VERTICAL en extremo IZQUIERDO (X negativo)
            const ganchoLeft = new THREE.Mesh(ganchoGeometry, barAzulMaterial);
            ganchoLeft.position.set(-B/2 + recubrimiento, yPosBarras + 0.015 + longitudGancho/2, z);
            sceneAcero.add(ganchoLeft);
            
            // GANCHO VERTICAL en extremo DERECHO (X positivo)
            const ganchoRight = new THREE.Mesh(ganchoGeometry, barAzulMaterial);
            ganchoRight.position.set(B/2 - recubrimiento, yPosBarras + 0.015 + longitudGancho/2, z);
            sceneAcero.add(ganchoRight);
        }
        
        console.log('✓ Barras AZULES creadas:', numBarrasAzules, 'con', numBarrasAzules * 2, 'ganchos');
        console.log('✓ MALLA COMPLETA:', numBarrasAmarillas * numBarrasAzules, 'intersecciones');
        
        // ========================================
        // PARÁMETROS PARA REFUERZO DEL MURO
        // ========================================
        const alturaMuro = 1.0; // 1m de altura del muro
        const espaciamientoBarrasMuro = 0.20; // 20cm entre barras verticales
        
        // ========================================
        // REFUERZO DE VIGA EN BORDES - BARRAS VERTICALES AZULES/VIOLETAS
        // Van en los bordes izquierdo y derecho de la zapata
        // ========================================
        const alturaRefuerzoBorde = 0.10; // 10cm de altura sobre zapata
        const numBarrasBorde = Math.floor(largoUtilL / espaciamientoBarrasMuro) + 1;
        const barRadioBorde = 0.007; // 7mm para barras de borde
        
        const barBordeMaterial = new THREE.MeshStandardMaterial({
            color: 0x6A5ACD, // Azul violeta
            roughness: 0.2,
            metalness: 1.0,
            emissive: 0x4169E1,
            emissiveIntensity: 0.6
        });
        
        const profundidadAnclajeBorde = 0.15; // 15cm de anclaje
        const alturaBarraBorde = alturaRefuerzoBorde + profundidadAnclajeBorde;
        const longitudGanchoBorde = 0.12; // 12cm de gancho
        
        const barBordeGeometry = new THREE.CylinderGeometry(barRadioBorde, barRadioBorde, alturaBarraBorde, 16);
        const ganchoBordeGeometry = new THREE.CylinderGeometry(barRadioBorde, barRadioBorde, longitudGanchoBorde, 16);
        
        console.log('Creando', numBarrasBorde * 2, 'barras AZULES/VIOLETAS en los bordes...');
        
        const yInicioBorde = -Df + h - profundidadAnclajeBorde;
        const xBordeIzq = -B/2 + 0.10; // 10cm del borde izquierdo
        const xBordeDer = B/2 - 0.10; // 10cm del borde derecho
        
        for (let i = 0; i < numBarrasBorde; i++) {
            const z = -L/2 + recubrimiento + (i * espaciamientoBarrasMuro);
            
            // BARRA VERTICAL IZQUIERDA
            const barraIzq = new THREE.Mesh(barBordeGeometry, barBordeMaterial);
            barraIzq.position.set(xBordeIzq, yInicioBorde + alturaBarraBorde/2, z);
            sceneAcero.add(barraIzq);
            
            // GANCHO HORIZONTAL IZQUIERDO
            const ganchoIzq = new THREE.Mesh(ganchoBordeGeometry, barBordeMaterial);
            ganchoIzq.rotation.z = Math.PI / 2;
            ganchoIzq.position.set(xBordeIzq - longitudGanchoBorde/2, yInicioBorde, z);
            sceneAcero.add(ganchoIzq);
            
            // BARRA VERTICAL DERECHA
            const barraDer = new THREE.Mesh(barBordeGeometry, barBordeMaterial);
            barraDer.position.set(xBordeDer, yInicioBorde + alturaBarraBorde/2, z);
            sceneAcero.add(barraDer);
            
            // GANCHO HORIZONTAL DERECHO
            const ganchoDer = new THREE.Mesh(ganchoBordeGeometry, barBordeMaterial);
            ganchoDer.rotation.z = Math.PI / 2;
            ganchoDer.position.set(xBordeDer + longitudGanchoBorde/2, yInicioBorde, z);
            sceneAcero.add(ganchoDer);
        }
        
        console.log('✓ Barras AZULES de borde creadas:', numBarrasBorde * 2);
        
        // ========================================
        // REFUERZO DEL MURO - BARRAS VERTICALES ROJAS (CENTRO)
        // Agrupadas en el centro del muro, formando un bloque compacto
        // ========================================
        
        // Calcular cuántas barras rojas en el ancho del muro (agrupadas en el centro)
        const anchoGrupoRojo = bMuro * 0.6; // 60% del ancho del muro para el grupo
        const numBarrasRojasAncho = 4; // 4 barras en el ancho (agrupadas)
        const numBarrasRojasLargo = Math.floor(largoUtilL / espaciamientoBarrasMuro) + 1;
        
        const profundidadAnclaje = 0.20; // 20cm de anclaje en zapata
        const longitudGanchoMuro = 0.15; // 15cm de gancho horizontal
        const alturaBarraMuro = alturaMuro + profundidadAnclaje;
        
        const barRadiusMuro = 0.008; // 8mm para barras del muro
        
        const barMuroMaterial = new THREE.MeshStandardMaterial({
            color: 0xff0000, // Rojo
            roughness: 0.2,
            metalness: 1.0,
            emissive: 0xff3333,
            emissiveIntensity: 0.6
        });
        
        const barMuroGeometry = new THREE.CylinderGeometry(barRadiusMuro, barRadiusMuro, alturaBarraMuro, 16);
        const ganchoMuroGeometry = new THREE.CylinderGeometry(barRadiusMuro, barRadiusMuro, longitudGanchoMuro, 16);
        
        console.log('Creando', numBarrasRojasAncho * numBarrasRojasLargo, 'barras VERTICALES ROJAS del muro (agrupadas)...');
        
        const yInicioMuro = -Df + h - profundidadAnclaje;
        
        // Crear grupo compacto de barras rojas en el centro
        for (let i = 0; i < numBarrasRojasLargo; i++) {
            const z = -L/2 + recubrimiento + (i * espaciamientoBarrasMuro);
            
            for (let j = 0; j < numBarrasRojasAncho; j++) {
                const x = -anchoGrupoRojo/2 + (j * anchoGrupoRojo / (numBarrasRojasAncho - 1));
                
                // BARRA VERTICAL
                const barraVertical = new THREE.Mesh(barMuroGeometry, barMuroMaterial);
                barraVertical.position.set(x, yInicioMuro + alturaBarraMuro/2, z);
                sceneAcero.add(barraVertical);
                
                // GANCHO HORIZONTAL en L (anclaje en zapata)
                const ganchoAnclaje = new THREE.Mesh(ganchoMuroGeometry, barMuroMaterial);
                ganchoAnclaje.rotation.z = Math.PI / 2;
                ganchoAnclaje.position.set(x + (j < numBarrasRojasAncho/2 ? -longitudGanchoMuro/2 : longitudGanchoMuro/2), yInicioMuro, z);
                sceneAcero.add(ganchoAnclaje);
            }
        }
        
        console.log('✓ Barras verticales ROJAS del muro creadas:', numBarrasRojasAncho * numBarrasRojasLargo);
        
        // ========================================
        // ESTRIBOS DEL MURO (VERDES) - Rectángulos PEQUEÑOS alrededor de barras rojas
        // ========================================
        const estribosRadio = 0.004; // 4mm para estribos
        const espaciamientoEstribos = 0.15; // 15cm entre estribos
        const numEstribos = Math.floor(alturaMuro / espaciamientoEstribos);
        
        // Estribos PEQUEÑOS alrededor del grupo de barras rojas
        const estribosAncho = anchoGrupoRojo + 0.04; // Ligeramente más grande que el grupo
        const estribosLargo = espaciamientoBarrasMuro * 1.5; // Cubren pocas barras a la vez
        
        const estriboMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00, // Verde brillante
            roughness: 0.2,
            metalness: 1.0,
            emissive: 0x00ff00,
            emissiveIntensity: 0.7
        });
        
        console.log('Creando', numEstribos * numBarrasRojasLargo, 'ESTRIBOS VERDES rectangulares pequeños...');
        
        function crearEstriboRectangular(ancho, largo, x, y, z) {
            const puntos = [];
            const halfW = ancho / 2;
            const halfL = largo / 2;
            
            // Rectángulo horizontal pequeño
            puntos.push(new THREE.Vector3(-halfW, 0, -halfL));
            puntos.push(new THREE.Vector3(halfW, 0, -halfL));
            puntos.push(new THREE.Vector3(halfW, 0, halfL));
            puntos.push(new THREE.Vector3(-halfW, 0, halfL));
            puntos.push(new THREE.Vector3(-halfW, 0, -halfL));
            
            const curve = new THREE.CatmullRomCurve3(puntos);
            const tubeGeometry = new THREE.TubeGeometry(curve, 32, estribosRadio, 8, false);
            const estribo = new THREE.Mesh(tubeGeometry, estriboMaterial);
            estribo.position.set(x, y, z);
            sceneAcero.add(estribo);
        }
        
        // Crear estribos a lo largo de todas las barras rojas
        for (let j = 0; j < numBarrasRojasLargo; j++) {
            const zEstribo = -L/2 + recubrimiento + (j * espaciamientoBarrasMuro);
            
            for (let i = 1; i <= numEstribos; i++) {
                const yEstribo = -Df + h + (i * espaciamientoEstribos);
                crearEstriboRectangular(estribosAncho, estribosLargo, 0, yEstribo, zEstribo);
            }
        }
        
        console.log('✓ Estribos VERDES del muro creados:', numEstribos * numBarrasRojasLargo);
        
        // ========================================
        // CONTORNO DE ZAPATA (SEMI-TRANSPARENTE)
        // ========================================
        const zapataGeometry = new THREE.BoxGeometry(B, h, L);
        const zapataMaterial = new THREE.MeshStandardMaterial({
            color: 0xCCCCCC,
            transparent: true,
            opacity: 0.12,
            side: THREE.DoubleSide,
            wireframe: false
        });
        const zapataContorno = new THREE.Mesh(zapataGeometry, zapataMaterial);
        zapataContorno.position.set(0, -Df + h/2, 0);
        sceneAcero.add(zapataContorno);
        
        // ========================================
        // WIREFRAME DE BORDES DE LA ZAPATA
        // ========================================
        const edgesGeometry = new THREE.EdgesGeometry(zapataGeometry);
        const edgesMaterial = new THREE.LineBasicMaterial({ 
            color: 0x888888, 
            linewidth: 1.5
        });
        const wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        wireframe.position.set(0, -Df + h/2, 0);
        sceneAcero.add(wireframe);
        
        // ========================================
        // POSICIONAR CÁMARA PARA VISTA ÓPTIMA
        // ========================================
        const distancia = Math.max(B, L) * 1.2;
        cameraAcero.position.set(B * 2, distancia * 0.8, L * 0.8);
        cameraAcero.lookAt(0, -Df + h/2 + alturaMuro/2, 0);
        controlsAcero.target.set(0, -Df + h/2 + alturaMuro/2, 0);
        controlsAcero.update();
        
        console.log('===================================');
        console.log('✓ VISUALIZACIÓN COMPLETADA');
        console.log('Barras AMARILLAS (zapata):', numBarrasAmarillas);
        console.log('Barras AZULES (zapata):', numBarrasAzules);
        console.log('Barras AZULES/VIOLETAS (bordes):', numBarrasBorde * 2);
        console.log('Barras ROJAS (muro centro):', numBarrasRojasAncho * numBarrasRojasLargo);
        console.log('Estribos VERDES (muro):', numEstribos * numBarrasRojasLargo);
        console.log('Total ganchos zapata:', (numBarrasAmarillas + numBarrasAzules) * 2);
        console.log('===================================');
        
    } catch (error) {
        console.error('Error en actualizarVisualizacionSoloAcero:', error);
        console.error(error.stack);
    }
}