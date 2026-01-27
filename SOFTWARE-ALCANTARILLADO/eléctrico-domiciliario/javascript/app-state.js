// ========================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ========================================
const AppState = {
mode: 'edicion', // 'edicion' o 'navegacion'
currentTool: null,
currentScale: 50, // Escala 1:50 por defecto
currentFormat: 'A1',
elements: [],
circuits: [],
isDrawing: false,
etiquetasMode: false,
selectedElement: null,
// Estado del viewport zoom/pan
zoom: 0.85,
panX: 0,
panY: 0,
isPanning: false,
isDraggingElement: false
};