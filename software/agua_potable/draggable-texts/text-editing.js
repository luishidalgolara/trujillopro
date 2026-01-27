// draggable-texts/text-editing.js
import { connections, svg } from '../js/config.js';
import { showStatus } from '../js/utils.js';
import { updateCalculations } from '../js/calculations.js';

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