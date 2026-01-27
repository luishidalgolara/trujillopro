// draggable-texts/text-dragging.js
import { isDraggingText, currentDraggedText, dragStartPoint, textOriginalPosition } from '../js/config.js';
import { setIsDraggingText, setCurrentDraggedText, setDragStartPoint, setTextOriginalPosition } from '../js/config.js';
import { getAccurateSVGCoords } from '../js/utils.js';
import { showStatus } from '../js/utils.js';
import { updateElasticLeaderLine } from './leader-line.js';

export function makeTextGroupDraggable(textGroup, connectionId) {
    if (!textGroup || !connectionId) return;
    
    textGroup.classList.add('draggable-text-group');
    textGroup.setAttribute('data-connection-id', connectionId);
    
    textGroup.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
        
        e.preventDefault();
        e.stopPropagation();
        
        setIsDraggingText(true);
        setCurrentDraggedText(textGroup);
        
        const bgRect = textGroup.querySelector('rect[data-bg-rect]');
        if (bgRect) {
            setTextOriginalPosition({
                x: parseFloat(bgRect.getAttribute('x')),
                y: parseFloat(bgRect.getAttribute('y'))
            });
        }
        
        const svgCoords = getAccurateSVGCoords(e);
        setDragStartPoint({
            x: svgCoords.x - textOriginalPosition.x,
            y: svgCoords.y - textOriginalPosition.y
        });
        
        textGroup.style.cursor = 'grabbing';
        textGroup.style.opacity = '0.8';
        
        showStatus('🖱️ Arrastrando texto...');
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDraggingText || !currentDraggedText) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const svgCoords = getAccurateSVGCoords(e);
        const newX = svgCoords.x - dragStartPoint.x;
        const newY = svgCoords.y - dragStartPoint.y;
        
        const bgRect = currentDraggedText.querySelector('rect[data-bg-rect]');
        if (bgRect) {
            bgRect.setAttribute('x', newX);
            bgRect.setAttribute('y', newY);
        }
        
        const texts = currentDraggedText.querySelectorAll('text');
        texts.forEach((text, index) => {
            const relativeY = index === 0 ? (newY + 12) : (newY + 28);
            text.setAttribute('x', newX + 3);
            text.setAttribute('y', relativeY);
        });
        
        const lines = currentDraggedText.querySelectorAll('line');
        lines.forEach(line => {
            line.setAttribute('x1', newX + 1);
            line.setAttribute('y1', newY + 18);
            line.setAttribute('x2', newX + 71);
            line.setAttribute('y2', newY + 18);
        });
        
        const foreignObject = currentDraggedText.querySelector('foreignObject');
        if (foreignObject) {
            foreignObject.setAttribute('x', newX);
            foreignObject.setAttribute('y', newY);
        }
        
        const deleteBtn = currentDraggedText.querySelector('g[data-delete-btn]');
        if (deleteBtn) {
            const circle = deleteBtn.querySelector('circle');
            const text = deleteBtn.querySelector('text');
            if (circle && text) {
                circle.setAttribute('cx', newX + 75);
                circle.setAttribute('cy', newY - 3);
                text.setAttribute('x', newX + 75);
                text.setAttribute('y', newY);
            }
        }
        
        const connectionId = currentDraggedText.getAttribute('data-connection-id');
        updateElasticLeaderLine(connectionId, newX + 40, newY + 16);
    });
    
    document.addEventListener('mouseup', (e) => {
        if (!isDraggingText) return;
        
        e.stopPropagation();
        
        if (currentDraggedText) {
            currentDraggedText.style.cursor = 'grab';
            currentDraggedText.style.opacity = '1';
            
            const connectionId = currentDraggedText.getAttribute('data-connection-id');
            const svg = document.getElementById('plano');
            const leaderLine = svg.querySelector(`line[data-leader="${connectionId}"]`);
            if (leaderLine) {
                leaderLine.setAttribute('cursor', 'grab');
                leaderLine.setAttribute('stroke', '#64748b');
                leaderLine.setAttribute('stroke-width', '3');
            }
        }
        
        setCurrentDraggedText(null);
        setDragStartPoint({ x: 0, y: 0 });
        setTextOriginalPosition({ x: 0, y: 0 });
        
        setTimeout(() => {
            setIsDraggingText(false);
        }, 50);
        
        showStatus('✅ Texto reposicionado');
    });
    
    textGroup.addEventListener('mouseenter', () => {
        if (!isDraggingText) {
            const bgRect = textGroup.querySelector('rect[data-bg-rect]');
            if (bgRect) {
                bgRect.setAttribute('stroke', '#3b82f6');
                bgRect.setAttribute('stroke-width', '2');
            }
            
            const deleteBtn = textGroup.querySelector('g[data-delete-btn]');
            if (deleteBtn) {
                deleteBtn.style.opacity = '1';
            }
        }
    });
    
    textGroup.addEventListener('mouseleave', () => {
        if (!isDraggingText) {
            const bgRect = textGroup.querySelector('rect[data-bg-rect]');
            if (bgRect) {
                bgRect.setAttribute('stroke', '#2563eb');
                bgRect.setAttribute('stroke-width', '1.5');
            }
            
            const deleteBtn = textGroup.querySelector('g[data-delete-btn]');
            if (deleteBtn) {
                deleteBtn.style.opacity = '0';
            }
        }
    });
}

export function startTextGroupDrag(e, textGroup, connectionId) {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDraggingText(true);
    setCurrentDraggedText(textGroup);
    
    const bgRect = textGroup.querySelector('rect[data-bg-rect]');
    if (bgRect) {
        setTextOriginalPosition({
            x: parseFloat(bgRect.getAttribute('x')),
            y: parseFloat(bgRect.getAttribute('y'))
        });
    }
    
    const svgCoords = getAccurateSVGCoords(e);
    setDragStartPoint({
        x: svgCoords.x - textOriginalPosition.x,
        y: svgCoords.y - textOriginalPosition.y
    });
    
    textGroup.style.cursor = 'grabbing';
    textGroup.style.opacity = '0.8';
    
    showStatus('🖱️ Arrastrando texto...');
}

export function dragTextGroup(e) {
    if (!isDraggingText || !currentDraggedText) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const svgCoords = getAccurateSVGCoords(e);
    const newX = svgCoords.x - dragStartPoint.x;
    const newY = svgCoords.y - dragStartPoint.y;
    
    const bgRect = currentDraggedText.querySelector('rect[data-bg-rect]');
    if (bgRect) {
        bgRect.setAttribute('x', newX);
        bgRect.setAttribute('y', newY);
    }
    
    const texts = currentDraggedText.querySelectorAll('text');
    texts.forEach((text, index) => {
        const relativeY = index === 0 ? (newY + 12) : (newY + 28);
        text.setAttribute('x', newX + 3);
        text.setAttribute('y', relativeY);
    });
    
    const lines = currentDraggedText.querySelectorAll('line');
    lines.forEach(line => {
        line.setAttribute('x1', newX + 1);
        line.setAttribute('y1', newY + 18);
        line.setAttribute('x2', newX + 71);
        line.setAttribute('y2', newY + 18);
    });
    
    const connectionId = currentDraggedText.getAttribute('data-connection-id');
    updateElasticLeaderLine(connectionId, newX + 40, newY + 16);
}

export function endTextGroupDrag(e) {
    if (!isDraggingText) return;
    
    e.stopPropagation();
    
    if (currentDraggedText) {
        currentDraggedText.style.cursor = 'grab';
        currentDraggedText.style.opacity = '1';
    }
    
    setCurrentDraggedText(null);
    setDragStartPoint({ x: 0, y: 0 });
    setTextOriginalPosition({ x: 0, y: 0 });
    
    setTimeout(() => {
        setIsDraggingText(false);
    }, 50);
    
    showStatus('✅ Texto reposicionado');
}