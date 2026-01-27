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
isDraggingElement: false,
// Puntos de conexión entre niveles
levelConnectors: {
    level1ToLevel2: [], // Puntos de subida en nivel 1
    level2FromLevel1: [] // Puntos de llegada en nivel 2
},
// Variables para herramientas de dibujo
currentColor: '#000000',
strokeWidth: 2,
drawingInProgress: false,
drawingStartX: 0,
drawingStartY: 0,
tempDrawingElement: null,
polylinePoints: [],
selectedDrawingElement: null
};