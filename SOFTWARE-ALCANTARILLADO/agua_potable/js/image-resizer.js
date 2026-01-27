// js/image-resizer.js - CORREGIDO PARA MÚLTIPLES IMÁGENES
import { svg, isResizingImage, currentResizeHandle, resizeStartData } from './config.js';
import { setIsResizingImage, setCurrentResizeHandle, setResizeStartData } from './config.js';
import { getAccurateSVGCoords } from './utils.js';
import { showStatus } from './utils.js';

let currentResizingImageId = null;

export function createImageFrame(imageGroup, width, height, x, y) {
    const imageId = imageGroup.getAttribute('data-image-id');
    const frameId = `imageFrame_${imageId}`;
    
    const existingFrame = svg.querySelector(`#${frameId}`);
    if (existingFrame) existingFrame.remove();
    
    const frameGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    frameGroup.setAttribute('id', frameId);
    frameGroup.setAttribute('data-image-id', imageId);
    
    const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    border.setAttribute('x', x);
    border.setAttribute('y', y);
    border.setAttribute('width', width);
    border.setAttribute('height', height);
    border.setAttribute('fill', 'none');
    border.setAttribute('stroke', '#00bcd4');
    border.setAttribute('stroke-width', '2');
    border.setAttribute('stroke-dasharray', '5,5');
    border.setAttribute('data-frame-border', 'true');
    
    frameGroup.appendChild(border);
    
    const handleSize = 8;
    const handles = [
        { pos: 'tl', cx: x, cy: y },
        { pos: 'tr', cx: x + width, cy: y },
        { pos: 'bl', cx: x, cy: y + height },
        { pos: 'br', cx: x + width, cy: y + height }
    ];
    
    handles.forEach(handle => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', handle.cx);
        circle.setAttribute('cy', handle.cy);
        circle.setAttribute('r', handleSize);
        circle.setAttribute('fill', '#ffffff');
        circle.setAttribute('stroke', '#00bcd4');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('cursor', getCursorForHandle(handle.pos));
        circle.setAttribute('data-handle', handle.pos);
        circle.setAttribute('data-image-id', imageId);
        
        circle.addEventListener('mousedown', (e) => startResize(e, handle.pos, imageId));
        
        frameGroup.appendChild(circle);
    });
    
    svg.appendChild(frameGroup);
    
    return frameGroup;
}

export function updateImageFrame(x, y, width, height) {
    console.warn('⚠️ updateImageFrame sin imageId está deprecado');
}

export function updateImageFrameById(imageId, x, y, width, height) {
    const frameGroup = svg.querySelector(`#imageFrame_${imageId}`);
    if (!frameGroup) return;
    
    const border = frameGroup.querySelector('[data-frame-border]');
    if (border) {
        border.setAttribute('x', x);
        border.setAttribute('y', y);
        border.setAttribute('width', width);
        border.setAttribute('height', height);
    }
    
    const handles = frameGroup.querySelectorAll('circle[data-handle]');
    const positions = [
        { pos: 'tl', cx: x, cy: y },
        { pos: 'tr', cx: x + width, cy: y },
        { pos: 'bl', cx: x, cy: y + height },
        { pos: 'br', cx: x + width, cy: y + height }
    ];
    
    handles.forEach((handle, index) => {
        if (positions[index]) {
            handle.setAttribute('cx', positions[index].cx);
            handle.setAttribute('cy', positions[index].cy);
        }
    });
}

export function removeImageFrame() {
    const allFrames = svg.querySelectorAll('[id^="imageFrame_"]');
    allFrames.forEach(frame => frame.remove());
}

export function removeImageFrameById(imageId) {
    const frameGroup = svg.querySelector(`#imageFrame_${imageId}`);
    if (frameGroup) frameGroup.remove();
}

function getCursorForHandle(position) {
    const cursors = {
        'tl': 'nwse-resize',
        'tr': 'nesw-resize',
        'bl': 'nesw-resize',
        'br': 'nwse-resize'
    };
    return cursors[position] || 'default';
}

export function startResize(e, handlePosition, imageId) {
    if (document.getElementById('modeToggle').textContent.includes('Navegación')) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const imageGroup = svg.querySelector(`#draggableImage_${imageId}`);
    if (!imageGroup) return;
    
    const image = imageGroup.querySelector('image');
    if (!image) return;
    
    setIsResizingImage(true);
    setCurrentResizeHandle(handlePosition);
    currentResizingImageId = imageId;
    
    const svgCoords = getAccurateSVGCoords(e);
    
    setResizeStartData({
        mouseX: svgCoords.x,
        mouseY: svgCoords.y,
        imageX: parseFloat(image.getAttribute('x')),
        imageY: parseFloat(image.getAttribute('y')),
        imageWidth: parseFloat(image.getAttribute('width')),
        imageHeight: parseFloat(image.getAttribute('height')),
        imageId: imageId
    });
    
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', endResize);
    
    showStatus(`📐 Redimensionando imagen ${imageId}...`);
}

export function handleResize(e) {
    if (!isResizingImage || !currentResizingImageId) return;
    
    e.preventDefault();
    
    const imageId = currentResizingImageId;
    const imageGroup = svg.querySelector(`#draggableImage_${imageId}`);
    if (!imageGroup) return;
    
    const image = imageGroup.querySelector('image');
    if (!image) return;
    
    const svgCoords = getAccurateSVGCoords(e);
    const deltaX = svgCoords.x - resizeStartData.mouseX;
    const deltaY = svgCoords.y - resizeStartData.mouseY;
    
    let newX = resizeStartData.imageX;
    let newY = resizeStartData.imageY;
    let newWidth = resizeStartData.imageWidth;
    let newHeight = resizeStartData.imageHeight;
    
    const aspectRatio = resizeStartData.imageWidth / resizeStartData.imageHeight;
    
    switch (currentResizeHandle) {
        case 'br':
            newWidth = Math.max(50, resizeStartData.imageWidth + deltaX);
            newHeight = newWidth / aspectRatio;
            break;
        case 'bl':
            newWidth = Math.max(50, resizeStartData.imageWidth - deltaX);
            newHeight = newWidth / aspectRatio;
            newX = resizeStartData.imageX + (resizeStartData.imageWidth - newWidth);
            break;
        case 'tr':
            newWidth = Math.max(50, resizeStartData.imageWidth + deltaX);
            newHeight = newWidth / aspectRatio;
            newY = resizeStartData.imageY + (resizeStartData.imageHeight - newHeight);
            break;
        case 'tl':
            newWidth = Math.max(50, resizeStartData.imageWidth - deltaX);
            newHeight = newWidth / aspectRatio;
            newX = resizeStartData.imageX + (resizeStartData.imageWidth - newWidth);
            newY = resizeStartData.imageY + (resizeStartData.imageHeight - newHeight);
            break;
    }
    
    image.setAttribute('x', newX);
    image.setAttribute('y', newY);
    image.setAttribute('width', newWidth);
    image.setAttribute('height', newHeight);
    
    updateImageFrameById(imageId, newX, newY, newWidth, newHeight);
    
    const controlsGroup = svg.querySelector(`#imageControls_${imageId}`);
    if (controlsGroup) {
        updateImageControlsPosition(imageId, newX, newY, newWidth, newHeight);
    }
}

function updateImageControlsPosition(imageId, x, y, width, height) {
    const btnSize = 30;
    const btnSpacing = 5;
    const topY = y - btnSize - btnSpacing;
    
    const lockBtn = svg.querySelector(`#lockImageBtn_${imageId}`);
    if (lockBtn) {
        const lockBg = lockBtn.querySelector('rect');
        const lockIcon = lockBtn.querySelector('text');
        if (lockBg && lockIcon) {
            lockBg.setAttribute('x', x + width - btnSize - btnSize - btnSpacing);
            lockBg.setAttribute('y', topY);
            lockIcon.setAttribute('x', x + width - btnSize - btnSize - btnSpacing + btnSize/2);
            lockIcon.setAttribute('y', topY + btnSize/2 + 5);
        }
    }
    
    const deleteBtn = svg.querySelector(`#deleteImageBtn_${imageId}`);
    if (deleteBtn) {
        const deleteBg = deleteBtn.querySelector('rect');
        const deleteIcon = deleteBtn.querySelector('text');
        if (deleteBg && deleteIcon) {
            deleteBg.setAttribute('x', x + width - btnSize);
            deleteBg.setAttribute('y', topY);
            deleteIcon.setAttribute('x', x + width - btnSize + btnSize/2);
            deleteIcon.setAttribute('y', topY + btnSize/2 + 5);
        }
    }
}

export function endResize(e) {
    if (!isResizingImage) return;
    
    setIsResizingImage(false);
    setCurrentResizeHandle(null);
    setResizeStartData(null);
    currentResizingImageId = null;
    
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', endResize);
    
    showStatus('✅ Imagen redimensionada');
}