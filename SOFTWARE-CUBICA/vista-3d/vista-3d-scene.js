/* ========================================
   ESCENA 3D - THREE.JS
   ======================================== */

function inicializarEscena3D() {
    const container = document.getElementById('canvas3D');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // ESCENA
    vista3DState.scene = new THREE.Scene();
    vista3DState.scene.background = new THREE.Color(0x0a0a0a);

    // CÁMARA
    vista3DState.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    vista3DState.camera.position.set(50, 80, 100);
    vista3DState.camera.lookAt(0, 0, 0);

    // RENDERER
    vista3DState.renderer = new THREE.WebGLRenderer({ antialias: true });
    vista3DState.renderer.setSize(width, height);
    vista3DState.renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(vista3DState.renderer.domElement);

    // LUCES
    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.6);
    vista3DState.scene.add(luzAmbiente);

    const luzDireccional = new THREE.DirectionalLight(0xffffff, 0.8);
    luzDireccional.position.set(100, 200, 100);
    luzDireccional.castShadow = true;
    vista3DState.scene.add(luzDireccional);

    // GRILLA
    const gridHelper = new THREE.GridHelper(200, 20, 0x444444, 0x222222);
    vista3DState.scene.add(gridHelper);

    // EJES
    const axesHelper = new THREE.AxesHelper(50);
    vista3DState.scene.add(axesHelper);

    console.log('✅ Escena 3D inicializada');
}

function animate3D() {
    if (!vista3DState.active) return;

    requestAnimationFrame(animate3D);

    vista3DState.renderer.render(vista3DState.scene, vista3DState.camera);
}

function limpiarEscena3D() {
    // Eliminar grupo de edificio anterior
    const grupoAnterior = vista3DState.scene.getObjectByName('edificio');
    if (grupoAnterior) {
        vista3DState.scene.remove(grupoAnterior);
    }
    vista3DState.meshes = [];
}

window.inicializarEscena3D = inicializarEscena3D;
window.animate3D = animate3D;
window.limpiarEscena3D = limpiarEscena3D;