/**
 * ESCALERA-ACERO.JS
 * Visualización PROFESIONAL del acero de refuerzo
 * Incluye: barras longitudinales, transversales, dobladas, ganchos, estribos
 */

let sceneAcero, cameraAcero, rendererAcero, controlsAcero;
let aceroSceneInitialized = false;

/**
 * Inicializar escena 3D para Solo Acero
 */
function initAceroScene() {
    const container = document.getElementById('canvasAcero');
    
    if (!container) {
        console.error('Container canvasAcero no encontrado');
        return;
    }
    
    // Si ya existe, limpiar primero
    if (aceroSceneInitialized && rendererAcero) {
        container.innerHTML = '';
    }
    
    // Crear escena
    sceneAcero = new THREE.Scene();
    sceneAcero.background = new THREE.Color(0x0a0a0a);
    
    // Configurar cámara
    cameraAcero = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    cameraAcero.position.set(5, 3, 5);
    cameraAcero.lookAt(0, 1.5, 0);
    
    // Configurar renderer
    rendererAcero = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: false
    });
    rendererAcero.setSize(container.clientWidth, container.clientHeight);
    rendererAcero.setPixelRatio(window.devicePixelRatio);
    rendererAcero.shadowMap.enabled = true;
    rendererAcero.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(rendererAcero.domElement);
    
    // Controles orbitales
    controlsAcero = new THREE.OrbitControls(cameraAcero, rendererAcero.domElement);
    controlsAcero.enableDamping = true;
    controlsAcero.dampingFactor = 0.05;
    controlsAcero.maxPolarAngle = Math.PI * 0.9;
    
    // Sistema de iluminación profesional
    agregarIluminacionProfesional();
    
    // Grid de referencia sutil
    const gridHelper = new THREE.GridHelper(10, 20, 0x444444, 0x222222);
    gridHelper.position.y = -0.01;
    sceneAcero.add(gridHelper);
    
    aceroSceneInitialized = true;
    
    // Iniciar animación
    animateAcero();
}

/**
 * Sistema de iluminación profesional para resaltar el acero
 */
function agregarIluminacionProfesional() {
    // Luz ambiente más fuerte
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    sceneAcero.add(ambientLight);
    
    // Luz principal superior
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(10, 20, 10);
    keyLight.castShadow = true;
    sceneAcero.add(keyLight);
    
    // Fill lights laterales
    const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight1.position.set(-15, 10, -10);
    sceneAcero.add(fillLight1);
    
    const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight2.position.set(15, 10, 10);
    sceneAcero.add(fillLight2);
    
    // Luces de acento desde abajo
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.4);
    bottomLight.position.set(0, -5, 0);
    sceneAcero.add(bottomLight);
    
    // Luces puntuales de color para destacar
    const spotLight1 = new THREE.PointLight(0xff3300, 0.5, 50);
    spotLight1.position.set(8, 8, 8);
    sceneAcero.add(spotLight1);
    
    const spotLight2 = new THREE.PointLight(0x00ff88, 0.4, 50);
    spotLight2.position.set(-8, 8, -8);
    sceneAcero.add(spotLight2);
}

/**
 * Loop de animación para escena de acero
 */
function animateAcero() {
    requestAnimationFrame(animateAcero);
    if (controlsAcero) {
        controlsAcero.update();
    }
    if (rendererAcero && sceneAcero && cameraAcero) {
        rendererAcero.render(sceneAcero, cameraAcero);
    }
}

/**
 * Crear material de acero con brillo metálico
 */
function crearMaterialAcero(color, emissiveIntensity = 0.3) {
    return new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.9,
        emissive: color,
        emissiveIntensity: emissiveIntensity
    });
}

/**
 * Crear barra cilíndrica de acero
 */
function crearBarra(radio, longitud, material, posicion, rotacion = null) {
    const geometry = new THREE.CylinderGeometry(radio, radio, longitud, 16);
    const barra = new THREE.Mesh(geometry, material);
    
    barra.position.set(posicion.x, posicion.y, posicion.z);
    
    if (rotacion) {
        if (rotacion.x) barra.rotation.x = rotacion.x;
        if (rotacion.y) barra.rotation.y = rotacion.y;
        if (rotacion.z) barra.rotation.z = rotacion.z;
    }
    
    barra.castShadow = true;
    barra.receiveShadow = true;
    
    return barra;
}

/**
 * Crear gancho en extremo de barra (180° o 90°)
 */
function crearGancho(radio, longitud, material, posicion, orientacion = 'vertical', angulo = 180) {
    const grupo = new THREE.Group();
    
    // Curva del gancho
    const curve = new THREE.EllipseCurve(
        0, 0,
        longitud/3, longitud/3,
        0, Math.PI * (angulo/180),
        false,
        0
    );
    
    const points = curve.getPoints(20);
    const path = new THREE.CatmullRomCurve3(
        points.map(p => new THREE.Vector3(p.x, p.y, 0))
    );
    
    const tubeGeometry = new THREE.TubeGeometry(path, 20, radio, 8, false);
    const gancho = new THREE.Mesh(tubeGeometry, material);
    
    if (orientacion === 'horizontal') {
        gancho.rotation.y = Math.PI / 2;
    }
    
    grupo.add(gancho);
    grupo.position.set(posicion.x, posicion.y, posicion.z);
    
    grupo.castShadow = true;
    grupo.receiveShadow = true;
    
    return grupo;
}

/**
 * VISUALIZACIÓN PROFESIONAL DEL ACERO DE LA ESCALERA
 */
function actualizarVisualizacionSoloAcero(datos) {
    console.log('🔧 Iniciando visualización PROFESIONAL de acero...');
    
    if (!sceneAcero || !aceroSceneInitialized) {
        initAceroScene();
        setTimeout(() => actualizarVisualizacionSoloAcero(datos), 200);
        return;
    }
    
    try {
        // Limpiar escena (mantener luces y grid)
        const objetosAEliminar = [];
        sceneAcero.traverse((object) => {
            if (object.isMesh && object.geometry.type !== 'PlaneGeometry') {
                objetosAEliminar.push(object);
            }
        });
        
        objetosAEliminar.forEach(obj => {
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) obj.material.dispose();
            sceneAcero.remove(obj);
        });
        
        // Parámetros geométricos
        const h = datos.h;
        const c = datos.c;
        const b = datos.b;
        const n = datos.nPeldanos;
        const e = datos.e;
        const L_horizontal = datos.L_horizontal;
        const H = n * c;
        const L_inclinada = datos.L_inclinada;
        const angulo = datos.angulo * Math.PI / 180;
        const recubrimiento = datos.recubrimiento;
        
        // Espaciamientos del acero
        const espaciamientoLong = datos.dist_long.espaciamiento / 100; // m
        const espaciamientoRep = datos.dist_rep ? datos.dist_rep.espaciamiento / 100 : 0.15;
        const diametroLong = datos.dist_long.diametro / 1000; // mm a m
        const diametroRep = datos.dist_rep ? datos.dist_rep.diametro / 1000 : 0.008;
        
        const radioBarraLong = diametroLong / 2;
        const radioBarraRep = diametroRep / 2;
        
        console.log(`Configuración: φ${datos.dist_long.diametro}@${datos.dist_long.espaciamiento}cm + φ${datos.dist_rep.diametro}@${datos.dist_rep.espaciamiento}cm`);
        
        // ========================================
        // LOSA SEMITRANSPARENTE DE REFERENCIA
        // ========================================
        const losaGeometry = new THREE.BoxGeometry(b, e, L_inclinada);
        const losaMaterial = new THREE.MeshStandardMaterial({
            color: 0xcccccc,
            roughness: 0.9,
            metalness: 0,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide
        });
        const losa = new THREE.Mesh(losaGeometry, losaMaterial);
        losa.position.set(0, H/2, L_horizontal/2);
        losa.rotation.x = -angulo;
        losa.receiveShadow = true;
        sceneAcero.add(losa);
        
        // ========================================
        // MATERIALES PROFESIONALES
        // ========================================
        const matLongitudinal = crearMaterialAcero(0xff0000, 0.6); // Rojo brillante
        const matTransversal = crearMaterialAcero(0x00ff44, 0.5); // Verde brillante
        const matDobladas = crearMaterialAcero(0xff8800, 0.5); // Naranja
        const matEstribos = crearMaterialAcero(0x00aaff, 0.4); // Azul
        const matGanchos = crearMaterialAcero(0xffff00, 0.6); // Amarillo
        
        // ========================================
        // 1. MALLA LONGITUDINAL (ROJAS) - CADA 10CM
        // ========================================
        const espaciamientoRojas = 0.10; // 10cm
        const numBarrasRojas = Math.floor((b - 2*recubrimiento) / espaciamientoRojas) + 1;
        console.log(`✓ Creando ${numBarrasRojas} barras ROJAS cada 10cm en ${b}m de ancho`);
        
        for (let i = 0; i < numBarrasRojas; i++) {
            const x = -b/2 + recubrimiento + (i * espaciamientoRojas);
            
            // CADA BARRA ROJA VA EN ZIGZAG POR TODA LA ESCALERA
            // Descanso inferior
            const descInf = crearBarra(
                radioBarraLong * 1.5,
                0.35,
                matLongitudinal,
                {x: x, y: recubrimiento + 0.04, z: -0.175},
                {x: Math.PI/2, y: 0, z: 0}
            );
            sceneAcero.add(descInf);
            
            // ZIGZAG por cada peldaño
            for (let p = 0; p < n; p++) {
                const y_base = p * c;
                const z_base = p * h;
                
                // Barra VERTICAL en contrahuella
                const barraVert = crearBarra(
                    radioBarraLong * 1.5,
                    c,
                    matLongitudinal,
                    {x: x, y: y_base + c/2, z: z_base + 0.03},
                    {x: 0, y: 0, z: 0}
                );
                sceneAcero.add(barraVert);
                
                // Barra HORIZONTAL en huella
                const barraHor = crearBarra(
                    radioBarraLong * 1.5,
                    h,
                    matLongitudinal,
                    {x: x, y: y_base + c + 0.04, z: z_base + h/2},
                    {x: Math.PI/2, y: 0, z: 0}
                );
                sceneAcero.add(barraHor);
            }
            
            // Descanso superior
            const descSup = crearBarra(
                radioBarraLong * 1.5,
                0.35,
                matLongitudinal,
                {x: x, y: H - recubrimiento - 0.04, z: L_horizontal + 0.175},
                {x: Math.PI/2, y: 0, z: 0}
            );
            sceneAcero.add(descSup);
        }
        
        console.log(`✅ ${numBarrasRojas} barras ROJAS creadas en zigzag`);
        
        // ========================================
        // 2. MALLA TRANSVERSAL (VERDES) - CADA 10CM
        // ========================================
        const espaciamientoVerdes = 0.10; // 10cm
        console.log('✓ Creando malla VERDE transversal cada 10cm');
        
        // Descanso inferior - 6 barras
        for (let i = 0; i < 6; i++) {
            const z = -0.28 + i * 0.06;
            const barra = crearBarra(
                radioBarraRep * 1.5,
                b - 2*recubrimiento,
                matTransversal,
                {x: 0, y: recubrimiento + 0.04, z: z},
                {x: 0, y: 0, z: Math.PI/2}
            );
            sceneAcero.add(barra);
        }
        
        // MALLA VERDE POR CADA PELDAÑO
        for (let p = 0; p < n; p++) {
            const y_base = p * c;
            const z_base = p * h;
            
            // Barras transversales en CONTRAHUELLA (vertical)
            const numVerdesContra = Math.ceil(c / espaciamientoVerdes);
            for (let i = 0; i < numVerdesContra; i++) {
                const y_local = y_base + (i * espaciamientoVerdes);
                const barra = crearBarra(
                    radioBarraRep * 1.5,
                    b - 2*recubrimiento,
                    matTransversal,
                    {x: 0, y: y_local, z: z_base + 0.03},
                    {x: 0, y: 0, z: Math.PI/2}
                );
                sceneAcero.add(barra);
            }
            
            // Barras transversales en HUELLA (horizontal)
            const numVerdesHuella = Math.ceil(h / espaciamientoVerdes);
            for (let i = 0; i < numVerdesHuella; i++) {
                const z_local = z_base + (i * espaciamientoVerdes);
                const barra = crearBarra(
                    radioBarraRep * 1.5,
                    b - 2*recubrimiento,
                    matTransversal,
                    {x: 0, y: y_base + c + 0.04, z: z_local},
                    {x: 0, y: 0, z: Math.PI/2}
                );
                sceneAcero.add(barra);
            }
        }
        
        // Descanso superior - 6 barras
        for (let i = 0; i < 6; i++) {
            const z = L_horizontal + 0.08 + i * 0.06;
            const barra = crearBarra(
                radioBarraRep * 1.5,
                b - 2*recubrimiento,
                matTransversal,
                {x: 0, y: H - recubrimiento - 0.04, z: z},
                {x: 0, y: 0, z: Math.PI/2}
            );
            sceneAcero.add(barra);
        }
        
        console.log('✅ Malla VERDE transversal completa');
        
        // ========================================
        // 3. BARRAS DOBLADAS (BENT-UP BARS)
        // ========================================
        const numBarrasBent = Math.floor(numBarrasLongPorAncho / 3);
        console.log(`✓ ${numBarrasBent} barras dobladas`);
        
        for (let i = 0; i < numBarrasBent; i++) {
            const idx = i * 3;
            if (idx >= numBarrasLongPorAncho) continue;
            
            const x = -b/2 + recubrimiento + (idx * (b - 2*recubrimiento) / Math.max(numBarrasLongPorAncho - 1, 1));
            
            // Parte inferior inclinada
            const lengthInf = L_inclinada * 0.5;
            const barraInf = crearBarra(
                radioBarraLong * 0.9,
                lengthInf,
                matDobladas,
                {x: x, y: H * 0.25, z: L_horizontal * 0.25},
                {x: Math.PI/2 - angulo, y: 0, z: 0}
            );
            sceneAcero.add(barraInf);
            
            // Parte doblada
            const bentLength = H * 0.35;
            const barraBent = crearBarra(
                radioBarraLong * 0.9,
                bentLength,
                matDobladas,
                {x: x, y: H * 0.65, z: L_horizontal * 0.6},
                {x: Math.PI/4, y: 0, z: 0}
            );
            sceneAcero.add(barraBent);
        }
        
        // ========================================
        // 4. ESTRIBOS EN APOYOS
        // ========================================
        console.log('✓ Estribos de confinamiento en apoyos');
        
        // Estribos en apoyo inferior
        for (let i = 0; i < 8; i++) {
            const z = -0.25 + i * 0.05;
            
            // Estribo rectangular cerrado
            const anchoEstribo = b - 2*recubrimiento;
            const altoEstribo = e - 2*recubrimiento;
            
            const puntos = [
                new THREE.Vector3(-anchoEstribo/2, 0, 0),
                new THREE.Vector3(-anchoEstribo/2, altoEstribo, 0),
                new THREE.Vector3(anchoEstribo/2, altoEstribo, 0),
                new THREE.Vector3(anchoEstribo/2, 0, 0),
                new THREE.Vector3(-anchoEstribo/2, 0, 0)
            ];
            
            const pathEstribo = new THREE.CatmullRomCurve3(puntos);
            const tubeGeometry = new THREE.TubeGeometry(pathEstribo, 40, radioBarraRep * 0.8, 8, false);
            const estribo = new THREE.Mesh(tubeGeometry, matEstribos);
            estribo.position.set(0, recubrimiento, z);
            sceneAcero.add(estribo);
        }
        
        // Estribos en apoyo superior
        for (let i = 0; i < 8; i++) {
            const z = L_horizontal + 0.05 + i * 0.05;
            
            const anchoEstribo = b - 2*recubrimiento;
            const altoEstribo = e - 2*recubrimiento;
            
            const puntos = [
                new THREE.Vector3(-anchoEstribo/2, 0, 0),
                new THREE.Vector3(-anchoEstribo/2, altoEstribo, 0),
                new THREE.Vector3(anchoEstribo/2, altoEstribo, 0),
                new THREE.Vector3(anchoEstribo/2, 0, 0),
                new THREE.Vector3(-anchoEstribo/2, 0, 0)
            ];
            
            const pathEstribo = new THREE.CatmullRomCurve3(puntos);
            const tubeGeometry = new THREE.TubeGeometry(pathEstribo, 40, radioBarraRep * 0.8, 8, false);
            const estribo = new THREE.Mesh(tubeGeometry, matEstribos);
            estribo.position.set(0, H - e + recubrimiento, z);
            sceneAcero.add(estribo);
        }
        
        // ========================================
        // 5. ACERO SUPERIOR (SI EXISTE)
        // ========================================
        if (datos.dist_neg && datos.apoyo === 'empotrada') {
            const numBarrasSup = Math.ceil(b / (datos.dist_neg.espaciamiento / 100));
            console.log(`✓ ${numBarrasSup} barras superiores (momento negativo)`);
            
            for (let i = 0; i < numBarrasSup; i++) {
                const x = -b/2 + recubrimiento + (i * (b - 2*recubrimiento) / Math.max(numBarrasSup - 1, 1));
                
                // Barras en zona de momento negativo (1/4 luz a cada lado)
                const lengthSup = L_inclinada * 0.3;
                
                // Apoyo inferior
                const barraSup1 = crearBarra(
                    radioBarraLong * 0.9,
                    lengthSup,
                    matDobladas,
                    {x: x, y: H * 0.15, z: L_horizontal * 0.15},
                    {x: Math.PI/2 - angulo, y: 0, z: 0}
                );
                sceneAcero.add(barraSup1);
                
                // Apoyo superior
                const barraSup2 = crearBarra(
                    radioBarraLong * 0.9,
                    lengthSup,
                    matDobladas,
                    {x: x, y: H * 0.85, z: L_horizontal * 0.85},
                    {x: Math.PI/2 - angulo, y: 0, z: 0}
                );
                sceneAcero.add(barraSup2);
            }
        }
        
        console.log('✅ Visualización PROFESIONAL completada exitosamente');
        
        // ========================================
        // AJUSTAR CÁMARA PARA VISTA ÓPTIMA
        // ========================================
        cameraAcero.position.set(L_horizontal * 1.3, H * 0.9, L_horizontal * 1.4);
        cameraAcero.lookAt(0, H/2, L_horizontal/2);
        controlsAcero.target.set(0, H/2, L_horizontal/2);
        controlsAcero.update();
        
    } catch (error) {
        console.error('❌ Error en visualización de acero:', error);
    }
}

// Manejar resize de ventana
window.addEventListener('resize', () => {
    if (aceroSceneInitialized && cameraAcero && rendererAcero) {
        const container = document.getElementById('canvasAcero');
        if (container && container.clientWidth > 0) {
            cameraAcero.aspect = container.clientWidth / container.clientHeight;
            cameraAcero.updateProjectionMatrix();
            rendererAcero.setSize(container.clientWidth, container.clientHeight);
        }
    }
});