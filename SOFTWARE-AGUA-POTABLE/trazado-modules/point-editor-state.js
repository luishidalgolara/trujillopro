// trazado-modules/point-editor-state.js
// ============================================================
// ESTADO DEL EDITOR DE PUNTOS
// ============================================================

let editorPuntos = {
    activo: false,
    modoEdicion: false,
    puntoArrastrado: null,
    lineaEditada: null,
    elementoOrigen: null,
    posicionInicial: { x: 0, y: 0 }
};

console.log('✅ Point Editor State cargado');