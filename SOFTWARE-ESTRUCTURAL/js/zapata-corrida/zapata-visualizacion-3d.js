/**
 * ZAPATA CORRIDA - VISUALIZACIÓN 3D NORMAL
 * Vista 3D con zapata, muro y dimensiones
 */

function actualizarVisualizacion3D(datos) {
    // Limpiar objetos previos
    threeScene.clearObjects();
    
    const B = datos.B;
    const h = datos.h;
    const L = datos.L; // Largo del muro (ingresado por el usuario)
    const bMuro = datos.bMuro;
    const Df = datos.Df;
    
    // Crear el suelo (referencia)
    const suelo = threeScene.createPlane(B + 2, L + 2, 0x8B4513, {x: 0, y: -Df, z: 0});
    
    // Crear la zapata corrida
    const zapata = threeScene.createBox(B, h, L, 0xBDBDBD, {x: 0, y: -Df + h/2, z: 0});
    
    // Crear el muro PEQUEÑO sobre la zapata (0.25m ancho x 1m alto)
    const alturaMuro = 1.0; // 1 metro de altura
    const anchoMuroReal = bMuro; // 0.25m típico
    const muro = threeScene.createBox(anchoMuroReal, alturaMuro, L, 0x3498db, {x: 0, y: -Df + h + alturaMuro/2, z: 0});
    
    // Agregar wireframes para mejor visualización
    threeScene.createWireframe(B, h, L, {x: 0, y: -Df + h/2, z: 0});
    threeScene.createWireframe(anchoMuroReal, alturaMuro, L, {x: 0, y: -Df + h + alturaMuro/2, z: 0});
    
    // Agregar dimensiones
    threeScene.addDimension(
        {x: -B/2, y: -Df + h, z: L/2 + 0.5},
        {x: B/2, y: -Df + h, z: L/2 + 0.5},
        `B = ${B.toFixed(2)} m`,
        0.3
    );
    
    threeScene.addDimension(
        {x: B/2 + 0.5, y: -Df, z: 0},
        {x: B/2 + 0.5, y: -Df + h, z: 0},
        `h = ${h.toFixed(2)} m`,
        0.3
    );
    
    threeScene.addDimension(
        {x: 0, y: -Df + h, z: -L/2},
        {x: 0, y: -Df + h, z: L/2},
        `L = ${L.toFixed(1)} m`,
        0.5
    );
    
    // Ajustar cámara para vista de zapata
    threeScene.resetCamera({x: B * 2.5, y: L * 0.5, z: L * 0.8});
}