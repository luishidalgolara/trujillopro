/**
 * ESCALERA-3D.JS
 * Visualización 3D normal de la escalera con peldaños
 */

let threeScene = null;

window.addEventListener('DOMContentLoaded', () => {
    threeScene = new ThreeConfig('canvas3d');
});

function actualizarVisualizacion3D(datos) {
    if (!threeScene) {
        console.error('threeScene no está inicializado');
        return;
    }
    
    threeScene.clearObjects();
    
    const h = datos.h;
    const c = datos.c;
    const b = datos.b;
    const n = datos.nPeldanos;
    const e = datos.e;
    
    // Crear losa inclinada estructural
    const L_horizontal = datos.L_horizontal;
    const H = n * c;
    const L_inclinada = Math.sqrt(Math.pow(H, 2) + Math.pow(L_horizontal, 2));
    const angulo = Math.atan(H / L_horizontal);
    
    // Losa inclinada principal
    const losaGeometry = new THREE.BoxGeometry(b, e, L_inclinada);
    const losaMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x95a5a6,
        roughness: 0.7,
        metalness: 0.2
    });
    const losa = new THREE.Mesh(losaGeometry, losaMaterial);
    
    losa.position.set(0, H/2, L_horizontal/2);
    losa.rotation.x = -angulo;
    losa.castShadow = true;
    losa.receiveShadow = true;
    
    threeScene.scene.add(losa);
    threeScene.objects.push(losa);
    
    // Crear peldaños sobre la losa
    for (let i = 0; i < n; i++) {
        // Contrahuella (vertical)
        const contrahuella = threeScene.createBox(
            b, c, 0.03, 
            0x7f8c8d,
            {x: 0, y: i * c + c/2, z: i * h + 0.015}
        );
        
        // Huella (horizontal) - piso del peldaño
        const huella = threeScene.createBox(
            b, 0.03, h,
            0xBDBDBD,
            {x: 0, y: (i + 1) * c + 0.015, z: i * h + h/2}
        );
    }
    
    // Vigas de borde/apoyo inferior
    const vigaInf = threeScene.createBox(
        b, 0.25, 0.25,
        0x6c7a89,
        {x: 0, y: -0.125, z: -0.125}
    );
    
    // Viga de apoyo superior
    const vigaSup = threeScene.createBox(
        b, 0.25, 0.25,
        0x6c7a89,
        {x: 0, y: H + 0.125, z: L_horizontal + 0.125}
    );
    
    // Pasamanos mejorados
    const pasamanosHeight = 1.0;
    const pasamanos1 = threeScene.createCylinder(
        0.04, 0.04, L_inclinada + 0.5,
        0x8B4513,
        {x: b/2 + 0.05, y: H/2 + pasamanosHeight/2, z: L_horizontal/2}
    );
    pasamanos1.rotation.x = -angulo;
    
    const pasamanos2 = threeScene.createCylinder(
        0.04, 0.04, L_inclinada + 0.5,
        0x8B4513,
        {x: -b/2 - 0.05, y: H/2 + pasamanosHeight/2, z: L_horizontal/2}
    );
    pasamanos2.rotation.x = -angulo;
    
    // Dimensiones
    threeScene.addDimension(
        {x: -b/2 - 0.3, y: 0, z: 0},
        {x: -b/2 - 0.3, y: H, z: L_horizontal},
        `L = ${L_inclinada.toFixed(2)} m`,
        0.2
    );
    
    threeScene.addDimension(
        {x: b/2 + 0.3, y: 0, z: L_horizontal},
        {x: b/2 + 0.3, y: H, z: L_horizontal},
        `H = ${H.toFixed(2)} m`,
        0.2
    );
    
    threeScene.resetCamera({x: L_horizontal * 1.2, y: H * 1.0, z: L_horizontal * 1.5});
}
