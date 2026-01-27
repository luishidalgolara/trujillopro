// js/draggable-texts.js - COMPLETO AL 100% CON TODAS LAS CORRECCIONES
import { svg, connections, isDraggingText, currentDraggedText, dragStartPoint, textOriginalPosition } from './config.js';
import { setIsDraggingText, setCurrentDraggedText, setDragStartPoint, setTextOriginalPosition } from './config.js';
import { getAccurateSVGCoords } from './utils.js';
import { showStatus } from './utils.js';
import { updateCalculations } from './calculations.js';

export function createTextWithDivider(desde, hacia, distanceMeters, diameter, tipoRed, color) {
    const deltaX = hacia.x - desde.x;
    const deltaY = hacia.y - desde.y;
    
    const textX = (desde.x + hacia.x) / 2;
    const textY = (desde.y + hacia.y) / 2;
    
    const connectionId = `${desde.id}-${hacia.id}`;
    
    // ✅ VERIFICAR SI YA EXISTE UNA ETIQUETA PARA ESTA CONEXIÓN
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

function addDeleteButtonToTextGroup(textGroup, connectionId, x, y) {
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

function deleteTextLabel(connectionId) {
    const textGroup = svg.querySelector(`g[data-connection-group="${connectionId}"]`);
    const leaderLine = svg.querySelector(`line[data-leader="${connectionId}"]`);
    const leaderArrow = svg.querySelector(`polygon[data-leader="${connectionId}"]`);
    
    if (textGroup) textGroup.remove();
    if (leaderLine) leaderLine.remove();
    if (leaderArrow) leaderArrow.remove();
    
    showStatus('🗑️ Etiqueta eliminada');
}

export function makeTextGroupEditable(textGroup, connectionId) {
    textGroup.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const connection = connections.find(conn => `${conn.from.id}-${conn.to.id}` === connectionId);
        if (!connection) return;
        
        const bgRect = textGroup.querySelector('rect[data-bg-rect]');
        const distanceText = textGroup.querySelector('text[data-text-type="distance"]');
        const diameterText = textGroup.querySelector('text[data-text-type="diameter"]');
        
        if (!bgRect || !distanceText || !diameterText) return;
        
        const rectX = parseFloat(bgRect.getAttribute('x'));
        const rectY = parseFloat(bgRect.getAttribute('y'));
        
        const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        foreignObject.setAttribute('x', rectX);
        foreignObject.setAttribute('y', rectY);
        foreignObject.setAttribute('width', '80');
        foreignObject.setAttribute('height', '32');
        foreignObject.setAttribute('class', 'editing-container');
        
        const div = document.createElement('div');
        div.style.cssText = `
            background: white;
            border: 2px solid #3b82f6;
            border-radius: 4px;
            padding: 2px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            height: 100%;
        `;
        
        const inputDistance = document.createElement('input');
        inputDistance.type = 'number';
        inputDistance.step = '0.01';
        inputDistance.value = connection.distance.toFixed(2);
        inputDistance.style.cssText = `
            width: 100%;
            font-size: 9px;
            padding: 1px 2px;
            border: 1px solid #cbd5e1;
            border-radius: 2px;
        `;
        inputDistance.placeholder = 'Distancia (m)';
        
        const inputDiameter = document.createElement('select');
        inputDiameter.style.cssText = `
            width: 100%;
            font-size: 9px;
            padding: 1px 2px;
            border: 1px solid #cbd5e1;
            border-radius: 2px;
        `;
        
        [20, 25, 32, 40].forEach(diam => {
            const option = document.createElement('option');
            option.value = diam;
            option.textContent = `⌀${diam}mm`;
            if (diam === connection.diameter) option.selected = true;
            inputDiameter.appendChild(option);
        });
        
        div.appendChild(inputDistance);
        div.appendChild(inputDiameter);
        foreignObject.appendChild(div);
        
        distanceText.style.display = 'none';
        diameterText.style.display = 'none';
        bgRect.style.display = 'none';
        
        textGroup.appendChild(foreignObject);
        
        inputDistance.focus();
        inputDistance.select();
        
        const finishEditing = () => {
            const newDistance = parseFloat(inputDistance.value);
            const newDiameter = parseInt(inputDiameter.value);
            
            if (isNaN(newDistance) || newDistance <= 0) {
                showStatus('⚠️ Distancia inválida');
                return;
            }
            
            connection.distance = newDistance;
            connection.diameter = newDiameter;
            
            distanceText.textContent = `L=${newDistance.toFixed(2)}m`;
            diameterText.textContent = `PPR ⌀${newDiameter}mm`;
            
            const line = svg.querySelector(`line[data-from="${connection.from.id}"][data-to="${connection.to.id}"]`);
            if (line) {
                line.setAttribute('data-diameter', newDiameter);
                
                let color;
                switch(newDiameter) {
                    case 40: color = '#8b5cf6'; break;
                    case 32: color = '#2563eb'; break;
                    case 25: color = '#10b981'; break;
                    case 20: color = '#ef4444'; break;
                    default: color = '#6b7280';
                }
                line.setAttribute('stroke', color);
                
                const grosor = Math.max(2, newDiameter / 8);
                line.setAttribute('stroke-width', grosor);
            }
            
            foreignObject.remove();
            distanceText.style.display = '';
            diameterText.style.display = '';
            bgRect.style.display = '';
            
            updateCalculations();
            
            // ✅ ACTUALIZAR VERIFICACIÓN AUTOMÁTICAMENTE
            setTimeout(() => {
                if (window.abrirVerificacion && document.getElementById('modalVerificacion')?.classList.contains('active')) {
                    console.log('🔄 Actualizando verificación automáticamente...');
                    window.abrirVerificacion(14);
                }
            }, 100);
            
            showStatus('✅ Valores actualizados - Verificación recalculada');
        };
        
        inputDistance.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                finishEditing();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                foreignObject.remove();
                distanceText.style.display = '';
                diameterText.style.display = '';
                bgRect.style.display = '';
                showStatus('❌ Edición cancelada');
            }
        });
        
        inputDiameter.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                finishEditing();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                foreignObject.remove();
                distanceText.style.display = '';
                diameterText.style.display = '';
                bgRect.style.display = '';
                showStatus('❌ Edición cancelada');
            }
        });
        
        inputDistance.addEventListener('blur', () => {
            setTimeout(() => {
                if (document.activeElement !== inputDiameter) {
                    finishEditing();
                }
            }, 100);
        });
        
        inputDiameter.addEventListener('blur', () => {
            setTimeout(() => {
                if (document.activeElement !== inputDistance) {
                    finishEditing();
                }
            }, 100);
        });
    });
}

// ✅ LÍNEA PUNTEADA ARRASTRABLE
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

// ✅ FUNCIÓN CORREGIDA: USA COORDENADAS ACTUALES DEL SVG
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
        // ✅ USA COORDENADAS ACTUALES DEL SVG
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
        
        // ✅ CALCULAR DISTANCIA ACTUAL
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
        
        // ✅ OBJETOS CON COORDENADAS ACTUALES
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