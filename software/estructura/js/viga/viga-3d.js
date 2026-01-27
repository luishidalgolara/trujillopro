/**
 * VIGA-3D.JS
 * Visualización 3D normal de la viga
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
    
    const L = datos.L;
    const b = datos.b;
    const h = datos.h;
    
    // Crear la viga
    const viga = threeScene.createBox(b, h, L, 0x95a5a6, {x: 0, y: h/2, z: 0});
    threeScene.createWireframe(b, h, L, {x: 0, y: h/2, z: 0});
    
    // Crear apoyos
    const tamApoyo = Math.min(b * 1.5, 0.3);
    
    if (datos.apoyo === 'simple' || datos.apoyo === 'continua') {
        // Apoyo simple en extremos
        const apoyo1 = threeScene.createBox(tamApoyo, tamApoyo, tamApoyo, 0xe74c3c, 
            {x: 0, y: tamApoyo/2, z: -L/2});
        const apoyo2 = threeScene.createBox(tamApoyo, tamApoyo, tamApoyo, 0xe74c3c, 
            {x: 0, y: tamApoyo/2, z: L/2});
    }
    
    if (datos.apoyo === 'empotrada') {
        // Empotramientos
        const empot1 = threeScene.createBox(tamApoyo * 2, h * 2, tamApoyo, 0xe74c3c, 
            {x: 0, y: h, z: -L/2 - tamApoyo/2});
        const empot2 = threeScene.createBox(tamApoyo * 2, h * 2, tamApoyo, 0xe74c3c, 
            {x: 0, y: h, z: L/2 + tamApoyo/2});
    }
    
    // Dimensiones
    threeScene.addDimension(
        {x: 0, y: h + 0.1, z: -L/2},
        {x: 0, y: h + 0.1, z: L/2},
        `L = ${L.toFixed(2)} m`,
        0.2
    );
    
    threeScene.addDimension(
        {x: -b/2, y: h + 0.05, z: L/2 + 0.3},
        {x: b/2, y: h + 0.05, z: L/2 + 0.3},
        `b = ${(b * 100).toFixed(0)} cm`,
        0.1
    );
    
    threeScene.resetCamera({x: L * 1.2, y: L * 0.8, z: L * 1.2});
}
