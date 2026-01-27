// draggable-texts/text-creation.js
import { svg } from '../js/config.js';
import { createElasticLeaderLine } from './leader-line.js';
import { makeTextGroupDraggable } from './text-dragging.js';
import { makeTextGroupEditable } from './text-editing.js';
import { addDeleteButtonToTextGroup } from './text-actions.js';

export function createTextWithDivider(desde, hacia, distanceMeters, diameter, tipoRed, color) {
    const deltaX = hacia.x - desde.x;
    const deltaY = hacia.y - desde.y;
    
    const textX = (desde.x + hacia.x) / 2;
    const textY = (desde.y + hacia.y) / 2;
    
    const connectionId = `${desde.id}-${hacia.id}`;
    
    const existingLabel = svg.querySelector(`g[data-connection-group="${connectionId}"]`);
    if (existingLabel) {
        console.log(`⚠️ Ya existe etiqueta para ${connectionId}, no se crea duplicado`);
        return;
    }
    
    createCompactVerticalTextDraggable(textX, textY, deltaX, deltaY, 0, 0, distanceMeters, diameter, desde, hacia, connectionId);
}

export function createCompactVerticalTextDraggable(textX, textY, deltaX, deltaY, lineLength, angle, distanceMeters, diameter, desde, hacia, connectionId) {
    const textOffsetX = 60;
    const textOffsetY = -60;
    const finalTextX = textX + textOffsetX;
    const finalTextY = textY + textOffsetY;
    
    createElasticLeaderLine(textX, textY, finalTextX, finalTextY, connectionId);
    
    const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    textGroup.setAttribute('data-connection-group', connectionId);
    textGroup.setAttribute('cursor', 'grab');
    textGroup.setAttribute('class', 'draggable-text-group');
    
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('x', finalTextX - 3);
    bgRect.setAttribute('y', finalTextY - 18);
    bgRect.setAttribute('width', 80);
    bgRect.setAttribute('height', 32);
    bgRect.setAttribute('fill', 'rgba(255, 255, 255, 0.95)');
    bgRect.setAttribute('stroke', '#2563eb');
    bgRect.setAttribute('stroke-width', '1.5');
    bgRect.setAttribute('rx', '4');
    bgRect.setAttribute('ry', '4');
    bgRect.setAttribute('data-bg-rect', connectionId);
    bgRect.setAttribute('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');
    
    const textElement1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement1.setAttribute('x', finalTextX);
    textElement1.setAttribute('y', finalTextY - 6);
    textElement1.setAttribute('text-anchor', 'start');
    textElement1.setAttribute('font-size', '10');
    textElement1.setAttribute('font-weight', 'bold');
    textElement1.setAttribute('font-family', 'Arial, sans-serif');
    textElement1.setAttribute('fill', '#1e40af');
    textElement1.setAttribute('data-connection', connectionId);
    textElement1.setAttribute('pointer-events', 'none');
    textElement1.setAttribute('data-text-type', 'distance');
    textElement1.textContent = `L=${distanceMeters.toFixed(2)}m`;
    
    const dividerLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const dividerLength = 70;
    const dividerX1 = finalTextX - 2;
    const dividerX2 = finalTextX + dividerLength;
    
    dividerLine.setAttribute('x1', dividerX1);
    dividerLine.setAttribute('y1', finalTextY);
    dividerLine.setAttribute('x2', dividerX2);
    dividerLine.setAttribute('y2', finalTextY);
    dividerLine.setAttribute('stroke', '#94a3b8');
    dividerLine.setAttribute('stroke-width', '1');
    dividerLine.setAttribute('data-connection-divider', connectionId);
    dividerLine.setAttribute('pointer-events', 'none');
    
    const textElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement2.setAttribute('x', finalTextX);
    textElement2.setAttribute('y', finalTextY + 10);
    textElement2.setAttribute('text-anchor', 'start');
    textElement2.setAttribute('font-size', '10');
    textElement2.setAttribute('font-weight', 'bold');
    textElement2.setAttribute('font-family', 'Arial, sans-serif');
    textElement2.setAttribute('fill', '#dc2626');
    textElement2.setAttribute('data-connection', connectionId);
    textElement2.setAttribute('pointer-events', 'none');
    textElement2.setAttribute('data-text-type', 'diameter');
    textElement2.textContent = `PPR ⌀${diameter}mm`;
    
    textGroup.appendChild(bgRect);
    textGroup.appendChild(textElement1);
    textGroup.appendChild(dividerLine);
    textGroup.appendChild(textElement2);
    
    addDeleteButtonToTextGroup(textGroup, connectionId, finalTextX, finalTextY);
    
    makeTextGroupDraggable(textGroup, connectionId);
    makeTextGroupEditable(textGroup, connectionId);
    
    svg.appendChild(textGroup);
}