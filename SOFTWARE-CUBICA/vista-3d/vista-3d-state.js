/* ========================================
   ESTADO - VISTA 3D
   ======================================== */

const vista3DState = {
    active: false,
    scene: null,
    camera: null,
    renderer: null,
    controls: {
        isDragging: false,
        previousMousePosition: { x: 0, y: 0 },
        rotation: { x: -0.5, y: 0.5 }
    },
    zoom: 1,
    meshes: []
};

window.vista3DState = vista3DState;
