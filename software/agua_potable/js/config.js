// js/config.js
export let currentTool = null;
export let elements = [];
export let connections = [];
export let svg = null;
export let elementCounter = 0;
export let isNavigationMode = false;
export let isPanning = false;
export let startPanPoint = { x: 0, y: 0 };
export let currentViewBox = { x: -50, y: -50, width: 694, height: 941 };
export let zoomLevel = 0.8;
export let panOffset = { x: 0, y: 0 };
export let currentPDF = null;
export let currentPage = 1;
export let totalPages = 0;
export let pdfScale = 1;
export let pdfData = null;
export let selectedElement = null;
export let valvulaCounter = 0;
export let currentScale = 50;
export let detectedCompany = null;
export let isDraggingText = false;
export let currentDraggedText = null;
export let dragStartPoint = { x: 0, y: 0 };
export let textOriginalPosition = { x: 0, y: 0 };
export let isDraggingImage = false;
export let currentDraggedImage = null;
export let imageDragStart = { x: 0, y: 0 };
export let isResizingImage = false;
export let currentResizeHandle = null;
export let resizeStartData = null;
export let nivelSeleccionado = 1;
export let etiquetaMode = false;

export const BASE_CIRCLE_RADIUS = {
    consumo: 15,
    infraestructura: 20,
    fuente: 22
};

export const BASE_STROKE_WIDTH = {
    element: 2,
    pipe: 4,
    selected: 4
};

export const BASE_FONT_SIZE = {
    element: 16,
    elementLarge: 18,
    connection: 11,
    infrastructure: 12
};

export const PRECIOS_PPR = {
    20: 24.80,
    25: 32.40,
    32: 45.60,
    40: 58.20
};

export function setCurrentTool(tool) { currentTool = tool; }
export function setSvg(svgElement) { svg = svgElement; }
export function setSelectedElement(element) { selectedElement = element; }
export function setIsNavigationMode(mode) { isNavigationMode = mode; }
export function setIsPanning(panning) { isPanning = panning; }
export function setStartPanPoint(point) { startPanPoint = point; }
export function setCurrentViewBox(viewBox) { currentViewBox = viewBox; }
export function setZoomLevel(level) { zoomLevel = level; }
export function setPanOffset(offset) { panOffset = offset; }
export function setCurrentPDF(pdf) { currentPDF = pdf; }
export function setCurrentPage(page) { currentPage = page; }
export function setTotalPages(total) { totalPages = total; }
export function setPdfScale(scale) { pdfScale = scale; }
export function setPdfData(data) { pdfData = data; }
export function setValvulaCounter(counter) { valvulaCounter = counter; }
export function setCurrentScale(scale) { currentScale = scale; }
export function setDetectedCompany(company) { detectedCompany = company; }
export function setIsDraggingText(dragging) { isDraggingText = dragging; }
export function setCurrentDraggedText(text) { currentDraggedText = text; }
export function setDragStartPoint(point) { dragStartPoint = point; }
export function setTextOriginalPosition(pos) { textOriginalPosition = pos; }
export function setIsDraggingImage(value) { isDraggingImage = value; }
export function setCurrentDraggedImage(value) { currentDraggedImage = value; }
export function setImageDragStart(value) { imageDragStart = value; }
export function setIsResizingImage(value) { isResizingImage = value; }
export function setCurrentResizeHandle(value) { currentResizeHandle = value; }
export function setResizeStartData(value) { resizeStartData = value; }
export function setNivelSeleccionado(nivel) { nivelSeleccionado = nivel; }
export function getNivelSeleccionado() { return nivelSeleccionado; }
export function setEtiquetaMode(mode) { etiquetaMode = mode; }
export function incrementElementCounter() { return ++elementCounter; }
export function incrementValvulaCounter() { return ++valvulaCounter; }
export function addElement(element) { 
    elements.push(element);
    window.elements = elements;
    window.elementsGlobal = elements;
}
export function addConnection(connection) { 
    console.log('➕ Agregando conexión:', connection);
    connections.push(connection);
    window.connections = connections;
}
export function clearElements() { 
    elements = [];
    window.elements = elements;
    window.elementsGlobal = elements;
}
export function clearConnections() { 
    connections = [];
    window.connections = connections;
}
export function resetElementCounter() { elementCounter = 0; }
export function resetValvulaCounter() { valvulaCounter = 0; }
export function removeElement(id) { 
    elements = elements.filter(el => el.id !== id);
    window.elements = elements;
    window.elementsGlobal = elements;
}
export function removeConnections(id) { 
    connections = connections.filter(conn => conn.from.id !== id && conn.to.id !== id);
    window.connections = connections;
}
export function getSvg() { 
    return svg; 
}
export function getElementosPorNivel(nivel) {
    return elements.filter(el => el.nivel === nivel);
}
export function getConexionesPorNivel(nivel) {
    return connections.filter(conn => conn.nivel === nivel);
}

window.elements = elements;
window.elementsGlobal = elements;
window.connections = connections;