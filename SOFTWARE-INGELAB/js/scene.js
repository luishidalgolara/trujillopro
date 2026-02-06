// Configuración de la escena 3D con Three.js - VERSIÓN MEJORADA CON REALISMO

let scene, camera, renderer, controls;
let buildingGroup, componentsMap, labelsContainer;
let raycaster, mouse;
let currentBuilding = 1;
let isExploded = false;
let labelsVisible = false;

// Inicializar escena 3D con mejoras visuales
function initScene() {
    const container = document.getElementById('canvas-container');
    
    // Crear escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8f4f8); // Cielo más realista
    scene.fog = new THREE.Fog(0xe8f4f8, 50, 200); // Niebla atmosférica
    
    // Configurar cámara con FOV más natural
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000); // FOV 45° más realista
    camera.position.set(25, 18, 25);
    camera.lookAt(0, 5, 0);
    
    // Crear renderer con configuración avanzada
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimizado
    
    // Configuración avanzada de sombras
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Sombras suaves
    
    // Tone mapping para colores más ricos (HDR)
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    // Mejor manejo de colores
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    
    container.appendChild(renderer.domElement);
    
    // Iluminación mejorada y realista
    setupAdvancedLights();
    
    // Controles de órbita
    setupControls();
    
    // Raycaster para detección de clicks
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Grupo principal para el edificio
    buildingGroup = new THREE.Group();
    scene.add(buildingGroup);
    
    // Mapa de componentes
    componentsMap = new Map();
    
    // Grid de referencia con mejor diseño
    const gridHelper = new THREE.GridHelper(40, 40, 0xaaaaaa, 0xdddddd);
    gridHelper.position.y = -0.1;
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    
    // Ejes de referencia más sutiles
    const axesHelper = new THREE.AxesHelper(3);
    axesHelper.position.y = 0.01;
    scene.add(axesHelper);
    
    // Plano de suelo mejorado
    createRealisticGround();
    
    // Contenedor para labels
    labelsContainer = document.createElement('div');
    labelsContainer.id = 'labels-container';
    labelsContainer.style.position = 'absolute';
    labelsContainer.style.top = '0';
    labelsContainer.style.left = '0';
    labelsContainer.style.pointerEvents = 'none';
    labelsContainer.style.width = '100%';
    labelsContainer.style.height = '100%';
    container.appendChild(labelsContainer);
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    
    // Iniciar animación
    animate();
    
    console.log('✅ Escena 3D mejorada inicializada correctamente');
    console.log('🎨 Renderizado: HDR + Sombras suaves + Iluminación física');
}

// ============================================================================
// SISTEMA DE ILUMINACIÓN AVANZADO
// ============================================================================

function setupAdvancedLights() {
    // 1. Luz ambiental suave (luz difusa del cielo)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // 2. Luz hemisférica (simula luz del cielo y reflejo del suelo)
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0xd2b48c, 0.6);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    
    // 3. Luz direccional principal (sol)
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.0);
    sunLight.position.set(20, 30, 15);
    sunLight.castShadow = true;
    
    // Configuración avanzada de sombras del sol
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    sunLight.shadow.bias = -0.0001;
    sunLight.shadow.normalBias = 0.02;
    
    scene.add(sunLight);
    
    // 4. Luz de relleno (simula luz rebotada)
    const fillLight1 = new THREE.DirectionalLight(0xb3d9ff, 0.3);
    fillLight1.position.set(-15, 10, -10);
    scene.add(fillLight1);
    
    const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight2.position.set(10, 5, -15);
    scene.add(fillLight2);
    
    // 5. Luz de contorno (rim light) para separar objetos del fondo
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 10, -20);
    scene.add(rimLight);
    
    // 6. Luz puntual suave desde arriba (simula luz cenital)
    const topLight = new THREE.PointLight(0xffffff, 0.3, 50);
    topLight.position.set(0, 25, 0);
    scene.add(topLight);
}

// ============================================================================
// SUELO REALISTA CON TEXTURA
// ============================================================================

function createRealisticGround() {
    // Geometría del suelo
    const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    
    // Generar textura de tierra/terreno
    const groundTexture = generateGroundTexture();
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(8, 8);
    
    // Material del suelo con propiedades físicas
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        map: groundTexture,
        roughness: 0.95,
        metalness: 0.0,
        envMapIntensity: 0.1
    });
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    
    scene.add(ground);
}

// Generar textura procedural de terreno
function generateGroundTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base de tierra
    const baseColor = { r: 160, g: 130, b: 95 };
    ctx.fillStyle = `rgb(${baseColor.r}, ${baseColor.g}, ${baseColor.b})`;
    ctx.fillRect(0, 0, 512, 512);
    
    // Variación de color (manchas de tierra)
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 30 + 10;
        const variation = Math.random() * 30 - 15;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${baseColor.r + variation}, ${baseColor.g + variation}, ${baseColor.b + variation}, 0.4)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Textura granulada (arena y piedras pequeñas)
    for (let i = 0; i < 8000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 2 + 0.5;
        const gray = Math.random() * 60 + 100;
        
        ctx.fillStyle = `rgba(${gray}, ${gray - 20}, ${gray - 40}, ${Math.random() * 0.5 + 0.3})`;
        ctx.fillRect(x, y, size, size);
    }
    
    // Algunas piedras más grandes
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const size = Math.random() * 4 + 2;
        
        ctx.fillStyle = `rgba(120, 110, 100, 0.6)`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// ============================================================================
// CONTROLES DE CÁMARA - ✨ VELOCIDAD REDUCIDA PARA MAYOR CONTROL
// ============================================================================

// Configurar controles de órbita - VELOCIDAD REDUCIDA
function setupControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08; // ✨ Más suavizado (antes 0.05)
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 5, 0);
    
    // ✨ VELOCIDADES REDUCIDAS PARA CONTROL MÁS PRECISO
    controls.rotateSpeed = 0.3;  // Rotación más lenta (default: 1.0)
    controls.zoomSpeed = 0.5;    // Zoom más lento (default: 1.0)
    controls.panSpeed = 0.4;     // Pan más lento (default: 1.0)
    
    controls.update();
    
    console.log('🎮 Controles configurados: Velocidad reducida para mayor precisión');
}

// ============================================================================
// RESTO DE FUNCIONES
// ============================================================================

// Manejo de redimensionamiento
function onWindowResize() {
    const container = document.getElementById('canvas-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Detección de clicks en objetos
function onMouseClick(event) {
    const container = document.getElementById('canvas-container');
    const rect = container.getBoundingClientRect();
    
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(buildingGroup.children, true);
    
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData.componentType) {
            showComponentInfo(object.userData.componentType);
            highlightComponent(object);
        }
    }
}

// Detección de movimiento del mouse para tooltips
function onMouseMove(event) {
    const container = document.getElementById('canvas-container');
    const rect = container.getBoundingClientRect();
    
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(buildingGroup.children, true);
    
    // Cambiar cursor
    if (intersects.length > 0 && intersects[0].object.userData.componentType) {
        renderer.domElement.style.cursor = 'pointer';
    } else {
        renderer.domElement.style.cursor = 'default';
    }
}

// Resaltar componente seleccionado
function highlightComponent(object) {
    // Remover highlights previos
    buildingGroup.children.forEach(child => {
        child.traverse((obj) => {
            if (obj.material && obj.material.emissive) {
                obj.material.emissive.setHex(0x000000);
                obj.material.emissiveIntensity = 0.05;
            }
        });
    });
    
    // Añadir highlight al componente seleccionado
    if (object.material && object.material.emissive) {
        object.material.emissive.setHex(0x555555);
        object.material.emissiveIntensity = 0.3;
    }
}

// Actualizar labels 3D
function updateLabels() {
    if (!labelsVisible) {
        labelsContainer.innerHTML = '';
        return;
    }
    
    labelsContainer.innerHTML = '';
    
    componentsMap.forEach((mesh, type) => {
        const componentData = STRUCTURAL_DATA.components[type];
        if (!componentData || !mesh.visible) return;
        
        const position = new THREE.Vector3();
        mesh.getWorldPosition(position);
        
        // Proyectar posición 3D a 2D
        const vector = position.clone();
        vector.project(camera);
        
        const container = document.getElementById('canvas-container');
        const x = (vector.x * 0.5 + 0.5) * container.clientWidth;
        const y = (vector.y * -0.5 + 0.5) * container.clientHeight;
        
        // Crear label
        const label = document.createElement('div');
        label.className = 'label-3d visible';
        label.textContent = componentData.name;
        label.style.left = x + 'px';
        label.style.top = y + 'px';
        
        labelsContainer.appendChild(label);
    });
}

// Loop de animación con delta time
let lastTime = 0;

function animate(currentTime = 0) {
    requestAnimationFrame(animate);
    
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    controls.update();
    
    // Actualizar labels
    if (labelsVisible) {
        updateLabels();
    }
    
    renderer.render(scene, camera);
}

// Limpiar escena
function clearScene() {
    while (buildingGroup.children.length > 0) {
        const object = buildingGroup.children[0];
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(mat => {
                    if (mat.map) mat.map.dispose();
                    if (mat.normalMap) mat.normalMap.dispose();
                    mat.dispose();
                });
            } else {
                if (object.material.map) object.material.map.dispose();
                if (object.material.normalMap) object.material.normalMap.dispose();
                object.material.dispose();
            }
        }
        buildingGroup.remove(object);
    }
    componentsMap.clear();
}

// Resetear vista de cámara
function resetCameraView() {
    const targetPos = { x: 25, y: 18, z: 25 };
    const startPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    const duration = 1500;
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const eased = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        camera.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
        camera.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
        camera.position.z = startPos.z + (targetPos.z - startPos.z) * eased;
        
        camera.lookAt(0, currentBuilding * 3, 0);
        controls.target.set(0, currentBuilding * 3, 0);
        controls.update();
        
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }
    
    animateCamera();
}

console.log('✅ Módulo de escena mejorada cargado');
console.log('🌅 Iluminación: 6 fuentes de luz + HDR');
console.log('💎 Renderizado: Tone mapping + Sombras suaves');
console.log('🎮 Controles: Velocidad reducida 70% para mayor precisión');