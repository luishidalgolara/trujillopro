// draggable-texts/arranque-text.js
import { svg, connections } from '../js/config.js';
import { showStatus } from '../js/utils.js';
import { updateCalculations } from '../js/calculations.js';
import { createElasticLeaderLine } from './leader-line.js';
import { makeTextGroupDraggable } from './text-dragging.js';

export function createArranqueDomTextDraggable(desde, hacia, distanceMeters, diameter, color) {
    const deltaX = hacia.x - desde.x;
    const deltaY = hacia.y - desde.y;
    
    const midX = (desde.x + hacia.x) / 2;
    const midY = (desde.y + hacia.y) / 2;
    
    const connectionId = `${desde.id}-${hacia.id}`;
    
    const leaderEndX = midX + 70;
    const leaderEndY = midY - 40;
    
    createElasticLeaderLine(midX, midY, leaderEndX, leaderEndY, connectionId);
    
    const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    textGroup.setAttribute('data-connection-group', connectionId);
    textGroup.setAttribute('cursor', 'grab');
    textGroup.setAttribute('class', 'draggable-text-group');
    
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('x', leaderEndX);
    bgRect.setAttribute('y', leaderEndY - 18);
    bgRect.setAttribute('width', 105);
    bgRect.setAttribute('height', 32);
    bgRect.setAttribute('fill', 'rgba(255, 107, 53, 0.95)');
    bgRect.setAttribute('stroke', '#dc2626');
    bgRect.setAttribute('stroke-width', '1.5');
    bgRect.setAttribute('rx', '4');
    bgRect.setAttribute('ry', '4');
    bgRect.setAttribute('data-bg-rect', connectionId);
    bgRect.setAttribute('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');
    
    const textElement1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement1.setAttribute('x', leaderEndX + 5);
    textElement1.setAttribute('y', leaderEndY - 6);
    textElement1.setAttribute('text-anchor', 'start');
    textElement1.setAttribute('font-size', '10');
    textElement1.setAttribute('font-weight', 'bold');
    textElement1.setAttribute('font-family', 'Arial, sans-serif');
    textElement1.setAttribute('fill', '#ffffff');
    textElement1.setAttribute('data-connection', connectionId);
    textElement1.setAttribute('pointer-events', 'none');
    textElement1.textContent = 'ARRANQUE DOM';
    
    const dividerLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    dividerLine.setAttribute('x1', leaderEndX + 3);
    dividerLine.setAttribute('y1', leaderEndY);
    dividerLine.setAttribute('x2', leaderEndX + 98);
    dividerLine.setAttribute('y2', leaderEndY);
    dividerLine.setAttribute('stroke', '#ffffff');
    dividerLine.setAttribute('stroke-width', '1');
    dividerLine.setAttribute('data-connection-divider', connectionId);
    dividerLine.setAttribute('pointer-events', 'none');
    
    const textElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement2.setAttribute('x', leaderEndX + 5);
    textElement2.setAttribute('y', leaderEndY + 10);
    textElement2.setAttribute('text-anchor', 'start');
    textElement2.setAttribute('font-size', '10');
    textElement2.setAttribute('font-weight', 'bold');
    textElement2.setAttribute('font-family', 'Arial, sans-serif');
    textElement2.setAttribute('fill', '#ffffff');
    textElement2.setAttribute('data-connection', connectionId);
    textElement2.setAttribute('pointer-events', 'none');
    textElement2.setAttribute('data-text-type', 'distance');
    textElement2.textContent = `L=${distanceMeters.toFixed(2)}m`;
    
    textGroup.appendChild(bgRect);
    textGroup.appendChild(textElement1);
    textGroup.appendChild(dividerLine);
    textGroup.appendChild(textElement2);
    
    makeTextGroupDraggable(textGroup, connectionId);
    makeArranqueTextEditable(textGroup, connectionId);
    
    svg.appendChild(textGroup);
}

export function makeArranqueTextEditable(textGroup, connectionId) {
    textGroup.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const connection = connections.find(conn => `${conn.from.id}-${conn.to.id}` === connectionId);
        if (!connection) return;
        
        const bgRect = textGroup.querySelector('rect[data-bg-rect]');
        const distanceText = textGroup.querySelector('text[data-text-type="distance"]');
        
        if (!bgRect || !distanceText) return;
        
        const rectX = parseFloat(bgRect.getAttribute('x'));
        const rectY = parseFloat(bgRect.getAttribute('y'));
        
        const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        foreignObject.setAttribute('x', rectX);
        foreignObject.setAttribute('y', rectY + 14);
        foreignObject.setAttribute('width', '105');
        foreignObject.setAttribute('height', '18');
        foreignObject.setAttribute('class', 'editing-container');
        
        const div = document.createElement('div');
        div.style.cssText = `
            background: rgba(255, 107, 53, 0.95);
            padding: 2px;
        `;
        
        const inputDistance = document.createElement('input');
        inputDistance.type = 'number';
        inputDistance.step = '0.01';
        inputDistance.value = connection.distance.toFixed(2);
        inputDistance.style.cssText = `
            width: 100%;
            font-size: 9px;
            padding: 1px 2px;
            border: 1px solid #fff;
            border-radius: 2px;
        `;
        inputDistance.placeholder = 'Distancia (m)';
        
        div.appendChild(inputDistance);
        foreignObject.appendChild(div);
        
        distanceText.style.display = 'none';
        
        textGroup.appendChild(foreignObject);
        
        inputDistance.focus();
        inputDistance.select();
        
        const finishEditing = () => {
            const newDistance = parseFloat(inputDistance.value);
            
            if (isNaN(newDistance) || newDistance <= 0) {
                showStatus('⚠️ Distancia inválida');
                return;
            }
            
            connection.distance = newDistance;
            distanceText.textContent = `L=${newDistance.toFixed(2)}m`;
            
            foreignObject.remove();
            distanceText.style.display = '';
            
            updateCalculations();
            showStatus('✅ Distancia actualizada');
        };
        
        inputDistance.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                finishEditing();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                foreignObject.remove();
                distanceText.style.display = '';
                showStatus('❌ Edición cancelada');
            }
        });
        
        inputDistance.addEventListener('blur', finishEditing);
    });
}