// draggable-texts/leader-line.js
import { svg, connections, isDraggingText } from '../js/config.js';
import { setIsDraggingText, setCurrentDraggedText, setDragStartPoint, setTextOriginalPosition } from '../js/config.js';
import { getAccurateSVGCoords } from '../js/utils.js';
import { showStatus } from '../js/utils.js';

export function createElasticLeaderLine(fromX, fromY, toX, toY, connectionId) {
    const leaderLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leaderLine.setAttribute('x1', fromX);
    leaderLine.setAttribute('y1', fromY);
    leaderLine.setAttribute('x2', toX - 10);
    leaderLine.setAttribute('y2', toY);
    leaderLine.setAttribute('stroke', '#64748b');
    leaderLine.setAttribute('stroke-width', '3');
    leaderLine.setAttribute('stroke-dasharray', '3,3');
    leaderLine.setAttribute('data-leader', connectionId);
    leaderLine.setAttribute('pointer-events', 'all');
    leaderLine.setAttribute('cursor', 'grab');
    leaderLine.setAttribute('class', 'draggable-leader');
    
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrow.setAttribute('points', '-4,-3 0,0 -4,3');
    arrow.setAttribute('fill', '#64748b');
    arrow.setAttribute('data-leader', connectionId);
    arrow.setAttribute('pointer-events', 'none');
    
    const deltaX = toX - fromX;
    const deltaY = toY - fromY;
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    arrow.setAttribute('transform', `translate(${toX - 10}, ${toY}) rotate(${angle})`);
    
    makeLeaderLineDraggable(leaderLine, connectionId);
    
    svg.appendChild(leaderLine);
    svg.appendChild(arrow);
    
    return { leaderLine, arrow };
}

function makeLeaderLineDraggable(leaderLine, connectionId) {
    leaderLine.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const textGroup = svg.querySelector(`g[data-connection-group="${connectionId}"]`);
        if (!textGroup) return;
        
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
        const textOriginalPosition = {
            x: parseFloat(bgRect.getAttribute('x')),
            y: parseFloat(bgRect.getAttribute('y'))
        };
        
        setDragStartPoint({
            x: svgCoords.x - textOriginalPosition.x,
            y: svgCoords.y - textOriginalPosition.y
        });
        
        textGroup.style.cursor = 'grabbing';
        textGroup.style.opacity = '0.8';
        leaderLine.setAttribute('cursor', 'grabbing');
        leaderLine.setAttribute('stroke', '#3b82f6');
        
        showStatus('🖱️ Arrastrando etiqueta desde línea...');
    });
    
    leaderLine.addEventListener('mouseenter', () => {
        if (!isDraggingText) {
            leaderLine.setAttribute('stroke', '#3b82f6');
            leaderLine.setAttribute('stroke-width', '4');
        }
    });
    
    leaderLine.addEventListener('mouseleave', () => {
        if (!isDraggingText) {
            leaderLine.setAttribute('stroke', '#64748b');
            leaderLine.setAttribute('stroke-width', '3');
        }
    });
}

export function updateElasticLeaderLine(connectionId, textX, textY) {
    if (!connectionId) return;
    
    const connection = connections.find(conn => 
        `${conn.from.id}-${conn.to.id}` === connectionId
    );
    
    if (!connection) {
        console.warn(`⚠️ No se encontró conexión para ${connectionId}`);
        return;
    }
    
    const pipeMidX = (connection.from.x + connection.to.x) / 2;
    const pipeMidY = (connection.from.y + connection.to.y) / 2;
    
    const existingLeaderLine = svg.querySelector(`line[data-leader="${connectionId}"]`);
    const existingArrow = svg.querySelector(`polygon[data-leader="${connectionId}"]`);
    
    if (existingLeaderLine) {
        existingLeaderLine.setAttribute('x1', pipeMidX);
        existingLeaderLine.setAttribute('y1', pipeMidY);
        existingLeaderLine.setAttribute('x2', textX - 10);
        existingLeaderLine.setAttribute('y2', textY);
    }
    
    if (existingArrow) {
        const deltaX = textX - pipeMidX;
        const deltaY = textY - pipeMidY;
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        
        existingArrow.setAttribute('transform', `translate(${textX - 10}, ${textY}) rotate(${angle})`);
    }
}