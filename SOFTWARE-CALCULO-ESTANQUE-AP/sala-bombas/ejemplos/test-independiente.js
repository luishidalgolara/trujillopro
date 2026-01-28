// Script de prueba independiente para sala de bombas
let scene, camera, renderer;

// Inicializar escena 3D
function init() {
    const container = document.getElementById('canvas3d');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    // Cámara
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Suelo
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x90EE90 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // Grid
    const grid = new THREE.GridHelper(50, 50);
    scene.add(grid);

    // Controles de cámara (rotación con mouse)
    setupControls(container);

    // Animar
    animate();

    console.log('Escena 3D inicializada');
}

// Controles de cámara
function setupControls(container) {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraAngle = { theta: Math.PI / 4, phi: Math.PI / 6 };
    const cameraDistance = 15;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        cameraAngle.theta -= deltaX * 0.01;
        cameraAngle.phi -= deltaY * 0.01;
        cameraAngle.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, cameraAngle.phi));
        updateCameraPosition(cameraAngle, cameraDistance);
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mouseup', () => { isDragging = false; });
    container.addEventListener('mouseleave', () => { isDragging = false; });
}

function updateCameraPosition(angle, distance) {
    camera.position.x = distance * Math.sin(angle.phi) * Math.cos(angle.theta);
    camera.position.y = distance * Math.cos(angle.phi);
    camera.position.z = distance * Math.sin(angle.phi) * Math.sin(angle.theta);
    camera.lookAt(0, 1, 0);
}

// Animar
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Crear sala de bombas
function crearSala() {
    const datos = {
        numeroBombas: parseInt(document.getElementById('numBombas').value),
        potencia: parseInt(document.getElementById('potencia').value),
        caudal: parseInt(document.getElementById('caudal').value),
        presion: parseInt(document.getElementById('presion').value),
        posicionEstanque: { largo: 4, ancho: 3, altura: 2.5 }
    };

    console.log('Creando sala con:', datos);
    SalaBombas.crear(scene, datos);
}

// Eliminar sala
function eliminarSala() {
    console.log('Eliminando sala...');
    SalaBombas.eliminar(scene);
}

// Iniciar cuando carga la página
window.addEventListener('DOMContentLoaded', init);
