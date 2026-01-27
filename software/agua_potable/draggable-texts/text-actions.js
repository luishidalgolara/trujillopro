// draggable-texts/text-actions.js
import { svg, connections } from '../js/config.js';
import { showStatus } from '../js/utils.js';
import { createTextWithDivider } from './text-creation.js';

export function addDeleteButtonToTextGroup(textGroup, connectionId, x, y) {
    const deleteBtn = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    deleteBtn.setAttribute('class', 'delete-btn-group');
    deleteBtn.setAttribute('data-delete-btn', connectionId);
    deleteBtn.setAttribute('cursor', 'pointer');
    deleteBtn.style.opacity = '0';
    deleteBtn.style.transition = 'opacity 0.2s';
    
    const btnCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    btnCircle.setAttribute('cx', x + 72);
    btnCircle.setAttribute('cy', y - 15);
    btnCircle.setAttribute('r', '8');
    btnCircle.setAttribute('fill', '#ef4444');
    btnCircle.setAttribute('stroke', '#ffffff');
    btnCircle.setAttribute('stroke-width', '1.5');
    
    const btnText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    btnText.setAttribute('x', x + 72);
    btnText.setAttribute('y', y - 12);
    btnText.setAttribute('text-anchor', 'middle');
    btnText.setAttribute('font-size', '11');
    btnText.setAttribute('font-weight', 'bold');
    btnText.setAttribute('fill', '#ffffff');
    btnText.setAttribute('pointer-events', 'none');
    btnText.textContent = '×';
    
    deleteBtn.appendChild(btnCircle);
    deleteBtn.appendChild(btnText);
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTextLabel(connectionId);
    });
    
    textGroup.appendChild(deleteBtn);
}

export function deleteTextLabel(connectionId) {
    const textGroup = svg.querySelector(`g[data-connection-group="${connectionId}"]`);
    const leaderLine = svg.querySelector(`line[data-leader="${connectionId}"]`);
    const leaderArrow = svg.querySelector(`polygon[data-leader="${connectionId}"]`);
    
    if (textGroup) textGroup.remove();
    if (leaderLine) leaderLine.remove();
    if (leaderArrow) leaderArrow.remove();
    
    showStatus('🗑️ Etiqueta eliminada');
}

export function toggleLabelOnPipeClick(pipe) {
    const fromId = pipe.getAttribute('data-from');
    const toId = pipe.getAttribute('data-to');
    const connectionId = `${fromId}-${toId}`;
    
    const existingLabel = svg.querySelector(`g[data-connection-group="${connectionId}"]`);
    const existingLeader = svg.querySelector(`line[data-leader="${connectionId}"]`);
    const existingArrow = svg.querySelector(`polygon[data-leader="${connectionId}"]`);
    
    if (existingLabel) {
        const isHidden = existingLabel.style.display === 'none';
        existingLabel.style.display = isHidden ? '' : 'none';
        if (existingLeader) existingLeader.style.display = isHidden ? '' : 'none';
        if (existingArrow) existingArrow.style.display = isHidden ? '' : 'none';
        
        showStatus(isHidden ? '👁️ Etiqueta mostrada' : '🙈 Etiqueta oculta');
    } else {
        const x1 = parseFloat(pipe.getAttribute('x1'));
        const y1 = parseFloat(pipe.getAttribute('y1'));
        const x2 = parseFloat(pipe.getAttribute('x2'));
        const y2 = parseFloat(pipe.getAttribute('y2'));
        
        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
            console.error('❌ Coordenadas de línea inválidas:', {x1, y1, x2, y2});
            showStatus('❌ Error: Coordenadas de línea inválidas');
            return;
        }
        
        const connection = connections.find(conn => 
            `${conn.from.id}-${conn.to.id}` === connectionId
        );
        
        if (!connection) {
            console.error('❌ No se encontró conexión para:', connectionId);
            showStatus('❌ Error: Conexión no encontrada');
            return;
        }
        
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distanciaPixels = Math.sqrt(dx * dx + dy * dy);
        const distanciaMetros = distanciaPixels * (window.currentScale || 50) / 1000;
        
        connection.distance = distanciaMetros;
        
        const diameter = parseInt(pipe.getAttribute('data-diameter')) || connection.diameter;
        let color;
        switch(diameter) {
            case 40: color = '#8b5cf6'; break;
            case 32: color = '#2563eb'; break;
            case 25: color = '#10b981'; break;
            case 20: color = '#ef4444'; break;
            default: color = '#6b7280';
        }
        
        const desdeActual = {
            id: fromId,
            x: x1,
            y: y1,
            type: connection.from.type || 'punto'
        };
        
        const haciaActual = {
            id: toId,
            x: x2,
            y: y2,
            type: connection.to.type || 'punto'
        };
        
        console.log('📍 Creando etiqueta con coordenadas actuales:', {
            desde: `(${x1.toFixed(1)}, ${y1.toFixed(1)})`,
            hacia: `(${x2.toFixed(1)}, ${y2.toFixed(1)})`,
            distancia: distanciaMetros.toFixed(2)
        });
        
        createTextWithDivider(
            desdeActual,
            haciaActual,
            distanciaMetros,
            diameter,
            connection.type || 'fria',
            color
        );
        
        showStatus('✅ Etiqueta creada en posición actual');
    }
}