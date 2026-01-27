/**
 * VIGA-ACERO.JS - VERSIÓN FINAL CORRECTA
 * 4 barras rojas gruesas en las 4 esquinas + estribos cada 10cm
 */

let sceneAcero, cameraAcero, rendererAcero, controlsAcero;
let aceroSceneInitialized = false;

function initAceroScene() {
    const container = document.getElementById('canvasAcero');
    if (!container) return;
    
    if (aceroSceneInitialized && rendererAcero) {
        container.innerHTML = '';
    }
    
    sceneAcero = new THREE.Scene();
    sceneAcero.background = new THREE.Color(0x0a0a0a);
    
    cameraAcero = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameraAcero.position.set(5, 3, 5);
    
    rendererAcero = new THREE.WebGLRenderer({ antialias: true });
    rendererAcero.setSize(container.clientWidth, container.clientHeight);
    rendererAcero.setPixelRatio(window.devicePixelRatio);
    container.appendChild(rendererAcero.domElement);
    
    controlsAcero = new THREE.OrbitControls(cameraAcero, rendererAcero.domElement);
    controlsAcero.enableDamping = true;
    
    // Luces
    sceneAcero.add(new THREE.AmbientLight(0xffffff, 1.0));
    const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
    light1.position.set(10, 20, 10);
    sceneAcero.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
    light2.position.set(-10, 10, -10);
    sceneAcero.add(light2);
    
    const grid = new THREE.GridHelper(10, 20, 0x444444, 0x222222);
    sceneAcero.add(grid);
    
    aceroSceneInitialized = true;
    animateAcero();
}

function animateAcero() {
    requestAnimationFrame(animateAcero);
    if (controlsAcero) controlsAcero.update();
    if (rendererAcero && sceneAcero && cameraAcero) {
        rendererAcero.render(sceneAcero, cameraAcero);
    }
}

function crearBarra(radio, longitud, color, x, y, z, rotX = 0) {
    const geo = new THREE.CylinderGeometry(radio, radio, longitud, 16);
    const mat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.9,
        emissive: color,
        emissiveIntensity: 0.5
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    if (rotX) mesh.rotation.x = rotX;
    return mesh;
}

function actualizarVisualizacionSoloAcero(datos) {
    if (!sceneAcero || !aceroSceneInitialized) {
        initAceroScene();
        setTimeout(() => actualizarVisualizacionSoloAcero(datos), 200);
        return;
    }
    
    // Limpiar
    while(sceneAcero.children.length > 0) {
        const obj = sceneAcero.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
        sceneAcero.remove(obj);
    }
    
    // Re-agregar luces
    sceneAcero.add(new THREE.AmbientLight(0xffffff, 1.0));
    const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
    light1.position.set(10, 20, 10);
    sceneAcero.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
    light2.position.set(-10, 10, -10);
    sceneAcero.add(light2);
    sceneAcero.add(new THREE.GridHelper(10, 20, 0x444444, 0x222222));
    
    const L = datos.L;
    const b = datos.b;
    const h = datos.h;
    const r = 0.025; // recubrimiento
    
    // Viga transparente
    const vigaGeo = new THREE.BoxGeometry(b, h, L);
    const vigaMat = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.08
    });
    const viga = new THREE.Mesh(vigaGeo, vigaMat);
    viga.position.set(0, h/2, 0);
    sceneAcero.add(viga);
    
    const bInt = b - 2*r;
    const hInt = h - 2*r;
    
    // ESTRIBOS CADA 8CM - ANILLOS CERRADOS COMPLETOS
    const esp = 0.08; // 8cm
    const numE = Math.floor(L / esp) + 1;
    const radioEstribo = 0.008; // Más grueso para ver el anillo
    
    for (let i = 0; i < numE; i++) {
        const z = -L/2 + i * esp;
        
        // ANILLO CERRADO - 4 LADOS COMPLETOS
        // Lado izquierdo vertical
        sceneAcero.add(crearBarra(radioEstribo, hInt, 0x00ff00, -bInt/2, h/2, z, 0));
        
        // Lado derecho vertical
        sceneAcero.add(crearBarra(radioEstribo, hInt, 0x00ff00, bInt/2, h/2, z, 0));
        
        // Lado inferior horizontal
        sceneAcero.add(crearBarra(radioEstribo, bInt, 0x00ff00, 0, r, z, Math.PI/2));
        
        // Lado superior horizontal
        sceneAcero.add(crearBarra(radioEstribo, bInt, 0x00ff00, 0, h-r, z, Math.PI/2));
    }
    
    // 4 BARRAS ROJAS GRUESAS EN LAS 4 ESQUINAS
    const rb = 0.015; // radio barra - MÁS GRUESA
    
    const esquinas = [
        {x: -bInt/2 + rb, y: r + rb},      // inferior izq
        {x: bInt/2 - rb, y: r + rb},       // inferior der
        {x: -bInt/2 + rb, y: h - r - rb},  // superior izq
        {x: bInt/2 - rb, y: h - r - rb}    // superior der
    ];
    
    for (let i = 0; i < 4; i++) {
        const pos = esquinas[i];
        
        // Barra LARGA
        const barra = crearBarra(rb, L + 0.3, 0xff0000, pos.x, pos.y, 0, Math.PI/2);
        sceneAcero.add(barra);
        
        // Ganchos extremos
        const esInf = i < 2;
        const gancho1 = crearBarra(rb, 0.15, 0xff0000, pos.x, pos.y + (esInf ? 0.075 : -0.075), -L/2 - 0.15, 0);
        sceneAcero.add(gancho1);
        
        const gancho2 = crearBarra(rb, 0.15, 0xff0000, pos.x, pos.y + (esInf ? 0.075 : -0.075), L/2 + 0.15, 0);
        sceneAcero.add(gancho2);
    }
    
    // Ajustar cámara
    cameraAcero.position.set(L * 1.3, h * 2.5, L);
    cameraAcero.lookAt(0, h/2, 0);
    controlsAcero.target.set(0, h/2, 0);
    controlsAcero.update();
}

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