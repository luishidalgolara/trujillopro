/* ========================================
   CONTROLES 3D
   ======================================== */

function inicializarControles3D() {
    const canvas = vista3DState.renderer.domElement;

    canvas.addEventListener('mousedown', onMouseDown3D);
    canvas.addEventListener('mousemove', onMouseMove3D);
    canvas.addEventListener('mouseup', onMouseUp3D);
    canvas.addEventListener('wheel', onWheel3D);
}

function onMouseDown3D(event) {
    vista3DState.controls.isDragging = true;
    vista3DState.controls.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseMove3D(event) {
    if (!vista3DState.controls.isDragging) return;

    const deltaX = event.clientX - vista3DState.controls.previousMousePosition.x;
    const deltaY = event.clientY - vista3DState.controls.previousMousePosition.y;

    // Rotar cámara alrededor del centro
    const rotationSpeed = 0.005;
    
    // Obtener posición actual de la cámara
    const camera = vista3DState.camera;
    const distance = camera.position.length();
    
    // Calcular nuevos ángulos
    const theta = Math.atan2(camera.position.x, camera.position.z) + deltaX * rotationSpeed;
    const phi = Math.acos(camera.position.y / distance) + deltaY * rotationSpeed;
    
    // Limitar phi para evitar volteos
    const phiClamped = Math.max(0.1, Math.min(Math.PI - 0.1, phi));
    
    // Calcular nueva posición
    camera.position.x = distance * Math.sin(phiClamped) * Math.sin(theta);
    camera.position.y = distance * Math.cos(phiClamped);
    camera.position.z = distance * Math.sin(phiClamped) * Math.cos(theta);
    
    camera.lookAt(0, 0, 0);

    vista3DState.controls.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseUp3D() {
    vista3DState.controls.isDragging = false;
}

function onWheel3D(event) {
    event.preventDefault();
    
    const delta = event.deltaY > 0 ? 1.1 : 0.9;
    
    vista3DState.camera.position.multiplyScalar(delta);
}

function resetearVista3D() {
    vista3DState.controls.rotation = { x: -0.5, y: 0.5 };
    vista3DState.camera.position.set(50, 80, 100);
    vista3DState.camera.lookAt(0, 0, 0);
}

window.inicializarControles3D = inicializarControles3D;
window.resetearVista3D = resetearVista3D;