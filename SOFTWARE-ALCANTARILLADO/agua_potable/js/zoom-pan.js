// js/zoom-pan.js - VIEWPORT CAD FLUIDO CON RAF
import { svg, isNavigationMode, isDraggingText, isDraggingImage, isResizingImage, elements, BASE_CIRCLE_RADIUS, BASE_STROKE_WIDTH, BASE_FONT_SIZE } from './config.js';
import { setIsPanning, setPanOffset, setZoomLevel } from './config.js';
import { showStatus } from './utils.js';

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 5;

let currentZoom = 1;
let currentPanX = 0;
let currentPanY = 0;
let isPanningLocal = false;
let lastMouseX = 0;
let lastMouseY = 0;
let rafId = null;
let needsUpdate = false;

const drawingBoard = document.querySelector('.drawing-board');

function applyTransform() {
    if (!drawingBoard) return;
    drawingBoard.style.transform = 
        `translate(-50%, -50%) scale(${currentZoom}) translate(${currentPanX}px, ${currentPanY}px)`;
    needsUpdate = false;
}

function scheduleUpdate() {
    if (needsUpdate || rafId) return;
    needsUpdate = true;
    rafId = requestAnimationFrame(() => {
        applyTransform();
        rafId = null;
    });
}

export function handlePanStart(e) {
    const isMiddleButton = e.button === 1;
    const isLeftButtonInNavMode = isNavigationMode && e.button === 0;
    
    if (!isMiddleButton && !isLeftButtonInNavMode) return;
    if (isDraggingText || isDraggingImage || isResizingImage) return;
    
    e.preventDefault();
    
    isPanningLocal = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    
    setIsPanning(true);
    if (svg) svg.style.cursor = 'grabbing';
    if (drawingBoard) drawingBoard.style.cursor = 'grabbing';
    document.body.classList.add('no-select');
}

export function handlePanMove(e) {
    if (!isPanningLocal || isDraggingText || isDraggingImage || isResizingImage) return;
    
    e.preventDefault();
    
    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;
    
    currentPanX += deltaX / currentZoom;
    currentPanY += deltaY / currentZoom;
    
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    
    scheduleUpdate();
}

export function handlePanEnd(e) {
    if (!isPanningLocal) return;
    
    isPanningLocal = false;
    setIsPanning(false);
    if (svg) svg.style.cursor = isNavigationMode ? 'grab' : 'crosshair';
    if (drawingBoard) drawingBoard.style.cursor = '';
    document.body.classList.remove('no-select');
}

export function handleZoom(e) {
    if (isDraggingText || isDraggingImage || isResizingImage) return;
    
    e.preventDefault();
    
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const newZoom = currentZoom * zoomFactor;
    
    if (newZoom < MIN_ZOOM || newZoom > MAX_ZOOM) {
        if (newZoom < MIN_ZOOM) {
            showStatus(`🔍 Zoom mínimo (${Math.round(MIN_ZOOM * 100)}%)`);
        } else {
            showStatus(`🔍 Zoom máximo (${Math.round(MAX_ZOOM * 100)}%)`);
        }
        return;
    }
    
    const wrapper = document.querySelector('.canvas-wrapper');
    if (!wrapper) return;
    
    const rect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const beforeX = (mouseX - rect.width / 2) / currentZoom - currentPanX;
    const beforeY = (mouseY - rect.height / 2) / currentZoom - currentPanY;
    
    currentZoom = newZoom;
    
    const afterX = (mouseX - rect.width / 2) / currentZoom - currentPanX;
    const afterY = (mouseY - rect.height / 2) / currentZoom - currentPanY;
    
    currentPanX += (afterX - beforeX);
    currentPanY += (afterY - beforeY);
    
    applyTransform();
    updateElementSizes();
    
    setZoomLevel(currentZoom);
    setPanOffset({ x: currentPanX, y: currentPanY });
    
    showStatus(`🔍 Zoom: ${Math.round(currentZoom * 100)}%`);
}

export function resetView() {
    currentZoom = 0.85;
    currentPanX = 0;
    currentPanY = 0;
    
    applyTransform();
    updateElementSizes();
    
    setZoomLevel(currentZoom);
    setPanOffset({ x: 0, y: 0 });
    
    showStatus('🔄 Vista restablecida');
}

export function fitToScreen() {
    currentZoom = 1;
    currentPanX = 0;
    currentPanY = 0;
    
    applyTransform();
    updateElementSizes();
    
    setZoomLevel(currentZoom);
    setPanOffset({ x: 0, y: 0 });
    
    showStatus('📐 Plano ajustado');
}

export function updateViewBox() {
    if (svg) {
        svg.setAttribute('viewBox', '0 0 900 630');
    }
}

export function updateElementSizes() {
    const zoomFactor = 1 / currentZoom;
    
    elements.forEach(element => {
        const group = svg.querySelector(`#element-${element.id}`);
        if (!group) return;
        
        if (element.type === 'punto-conexion') {
            const lines = group.querySelectorAll('line');
            const text = group.querySelector('text');
            
            lines.forEach(line => {
                const baseWidth = line.hasAttribute('data-base-width') 
                    ? parseFloat(line.getAttribute('data-base-width'))
                    : 3;
                line.setAttribute('stroke-width', baseWidth * zoomFactor);
            });
            
            if (text) {
                text.setAttribute('font-size', 12 * zoomFactor);
            }
            return;
        }
        
        const circle = group.querySelector('circle');
        const text = group.querySelector('text');
        
        if (circle) {
            let baseRadius = BASE_CIRCLE_RADIUS.consumo;
            if (element.categoria === 'infraestructura') {
                baseRadius = BASE_CIRCLE_RADIUS.infraestructura;
            } else if (element.categoria === 'fuente') {
                baseRadius = BASE_CIRCLE_RADIUS.fuente;
            }
            
            circle.setAttribute('r', baseRadius * zoomFactor);
            circle.setAttribute('stroke-width', BASE_STROKE_WIDTH.element * zoomFactor);
        }
        
        if (text) {
            const baseFontSize = element.categoria === 'infraestructura' 
                ? BASE_FONT_SIZE.elementLarge 
                : BASE_FONT_SIZE.element;
            
            text.setAttribute('font-size', baseFontSize * zoomFactor);
        }
    });
    
    const pipeLines = svg.querySelectorAll('.pipe-line');
    pipeLines.forEach(line => {
        const diameter = parseInt(line.getAttribute('data-diameter')) || 20;
        const baseStrokeWidth = Math.max(2, diameter / 8);
        line.setAttribute('stroke-width', baseStrokeWidth * zoomFactor);
    });
    
    const connectionTexts = svg.querySelectorAll('text[data-connection]');
    connectionTexts.forEach(text => {
        text.setAttribute('font-size', BASE_FONT_SIZE.connection * zoomFactor);
    });
    
    const dividerLines = svg.querySelectorAll('line[data-connection-divider]');
    dividerLines.forEach(line => {
        line.setAttribute('stroke-width', 1 * zoomFactor);
    });
    
    const leaderLines = svg.querySelectorAll('line[data-leader]');
    leaderLines.forEach(line => {
        line.setAttribute('stroke-width', 1.5 * zoomFactor);
    });
    
    const infraLabels = svg.querySelectorAll('.infra-label');
    infraLabels.forEach(label => {
        label.setAttribute('font-size', BASE_FONT_SIZE.infrastructure * zoomFactor);
        label.setAttribute('stroke-width', 0.5 * zoomFactor);
    });
    
    const arrows = svg.querySelectorAll('.flow-arrow');
    arrows.forEach(arrow => {
        const polygon = arrow.querySelector('polygon');
        if (polygon) {
            const basePoints = '0,-4 8,0 0,4';
            const scaledPoints = basePoints.split(' ').map(point => {
                const [x, y] = point.split(',').map(Number);
                return `${x * zoomFactor},${y * zoomFactor}`;
            }).join(' ');
            
            polygon.setAttribute('points', scaledPoints);
            polygon.setAttribute('stroke-width', zoomFactor);
        }
    });
    
    const bgRects = svg.querySelectorAll('rect[data-bg-rect]');
    bgRects.forEach(rect => {
        rect.setAttribute('stroke-width', 1.5 * zoomFactor);
    });
}

export function initializeViewport() {
    currentZoom = 0.85;
    currentPanX = 0;
    currentPanY = 0;
    
    applyTransform();
    updateViewBox();
    
    const wrapper = document.querySelector('.canvas-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mousedown', handlePanStart);
        wrapper.addEventListener('mousemove', handlePanMove);
        wrapper.addEventListener('mouseup', handlePanEnd);
        wrapper.addEventListener('mouseleave', handlePanEnd);
    }
    
    if (svg) {
        svg.addEventListener('mousedown', handlePanStart);
        svg.addEventListener('mousemove', handlePanMove);
        svg.addEventListener('mouseup', handlePanEnd);
        svg.addEventListener('mouseleave', handlePanEnd);
    }
    
    showStatus('✅ Viewport CAD fluido');
}

export function getViewportState() {
    return {
        zoom: currentZoom,
        panX: currentPanX,
        panY: currentPanY
    };
}

export function setViewportState(zoom, panX, panY) {
    currentZoom = zoom;
    currentPanX = panX;
    currentPanY = panY;
    
    applyTransform();
    updateElementSizes();
    
    setZoomLevel(currentZoom);
    setPanOffset({ x: currentPanX, y: currentPanY });
}
