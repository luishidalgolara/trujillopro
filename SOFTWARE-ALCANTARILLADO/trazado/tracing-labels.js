// trazado/tracing-labels.js

function createPipeLabel(desde, hacia, diameter, lengthMeters) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const midX = (desde.x + hacia.x) / 2;
    const midY = (desde.y + hacia.y) / 2;
    
    const labelX = midX + 30;
    const labelY = midY - 20;
    
    const connectionId = `${desde.id}-${hacia.id}`;
    
    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelGroup.setAttribute('class', 'pipe-label-group');
    labelGroup.setAttribute('data-connection', connectionId);
    
    const guideLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    guideLine.setAttribute('id', `guide-line-${connectionId}`);
    guideLine.setAttribute('x1', midX);
    guideLine.setAttribute('y1', midY);
    guideLine.setAttribute('x2', labelX);
    guideLine.setAttribute('y2', labelY);
    guideLine.setAttribute('stroke', '#000000');
    guideLine.setAttribute('stroke-width', '1');
    guideLine.setAttribute('stroke-dasharray', '2,2');
    guideLine.setAttribute('class', 'guide-line');
    
    const movableGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    movableGroup.setAttribute('id', `movable-label-${connectionId}`);
    movableGroup.setAttribute('class', 'movable-label');
    movableGroup.setAttribute('transform', `translate(${labelX}, ${labelY})`);
    movableGroup.style.cursor = 'move';
    
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', -25);
    bg.setAttribute('y', -15);
    bg.setAttribute('width', '50');
    bg.setAttribute('height', '30');
    bg.setAttribute('fill', 'white');
    bg.setAttribute('stroke', '#000000');
    bg.setAttribute('stroke-width', '0.8');
    bg.setAttribute('rx', '2');
    
    const line0 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    line0.setAttribute('x', 0);
    line0.setAttribute('y', -6);
    line0.setAttribute('text-anchor', 'middle');
    line0.setAttribute('font-size', '7');
    line0.setAttribute('font-weight', 'normal');
    line0.setAttribute('fill', '#000000');
    line0.textContent = `i=3.00%`;
    line0.style.cursor = 'text';
    
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    line1.setAttribute('x', 0);
    line1.setAttribute('y', 2);
    line1.setAttribute('text-anchor', 'middle');
    line1.setAttribute('font-size', '7');
    line1.setAttribute('font-weight', 'normal');
    line1.setAttribute('fill', '#000000');
    line1.textContent = `⌀${diameter}mm`;
    line1.style.cursor = 'text';
    
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    line2.setAttribute('x', 0);
    line2.setAttribute('y', 10);
    line2.setAttribute('text-anchor', 'middle');
    line2.setAttribute('font-size', '7');
    line2.setAttribute('font-weight', 'normal');
    line2.setAttribute('fill', '#000000');
    line2.textContent = `L=${lengthMeters.toFixed(1)}m`;
    line2.style.cursor = 'text';
    
    movableGroup.appendChild(bg);
    movableGroup.appendChild(line0);
    movableGroup.appendChild(line1);
    movableGroup.appendChild(line2);
    
    labelGroup.appendChild(guideLine);
    labelGroup.appendChild(movableGroup);
    
    setupLabelDrag(movableGroup, guideLine, midX, midY, connectionId, line0, line1, line2);
    setupTextEdit(line0, line1, line2);
    
    tracingSvg.appendChild(labelGroup);
}

function setupTextEdit(line0, line1, line2) {
    line0.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        const currentText = line0.textContent;
        const match = currentText.match(/i=([\d.]+)%/);
        const currentValue = match ? match[1] : '3.00';
        
        const newValue = prompt('Ingrese nueva pendiente (%):', currentValue);
        if (newValue && !isNaN(newValue)) {
            line0.textContent = `i=${parseFloat(newValue).toFixed(2)}%`;
            showStatus(`✏️ Pendiente actualizada: ${newValue}%`);
        }
    });
    
    line1.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        const currentText = line1.textContent;
        const match = currentText.match(/⌀(\d+)mm/);
        const currentValue = match ? match[1] : '110';
        
        const newValue = prompt('Ingrese nuevo diámetro (mm):', currentValue);
        if (newValue && !isNaN(newValue)) {
            line1.textContent = `⌀${newValue}mm`;
            showStatus(`✏️ Diámetro actualizado: ${newValue}mm`);
        }
    });
    
    line2.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        const currentText = line2.textContent;
        const match = currentText.match(/L=([\d.]+)m/);
        const currentValue = match ? match[1] : '0.0';
        
        const newValue = prompt('Ingrese nuevo largo (m):', currentValue);
        if (newValue && !isNaN(newValue)) {
            line2.textContent = `L=${parseFloat(newValue).toFixed(1)}m`;
            showStatus(`✏️ Largo actualizado: ${newValue}m`);
        }
    });
}

function setupLabelDrag(movableGroup, guideLine, fixedX, fixedY, connectionId, line0, line1, line2) {
    let isDragging = false;
    let startMouse = { x: 0, y: 0 };
    let startTransform = { x: 0, y: 0 };

    function getCurrentTransform() {
        const transform = movableGroup.getAttribute('transform');
        const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
        if (match) {
            return {
                x: parseFloat(match[1]),
                y: parseFloat(match[2])
            };
        }
        return { x: 0, y: 0 };
    }

    function getRelativeCoords(e) {
        const tracingSvg = document.getElementById('tracingSvg');
        
        forceCorrectViewBox();
        
        const pt = tracingSvg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        
        const svgMatrix = tracingSvg.getScreenCTM().inverse();
        const svgPoint = pt.matrixTransform(svgMatrix);
        
        return { x: svgPoint.x, y: svgPoint.y };
    }

    function updateGuideLine(newX, newY) {
        guideLine.setAttribute('x2', newX);
        guideLine.setAttribute('y2', newY);
    }

    movableGroup.addEventListener('mousedown', function(e) {
        if (isNavigationMode) return;
        if (e.target === line0 || e.target === line1 || e.target === line2) return;
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        isDragging = true;
        
        const coords = getRelativeCoords(e);
        startMouse.x = coords.x;
        startMouse.y = coords.y;
        
        startTransform = getCurrentTransform();
        
        document.body.style.userSelect = 'none';
        movableGroup.style.opacity = '0.7';
    });

    movableGroup.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    });

    function handleMouseMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        const coords = getRelativeCoords(e);
        const deltaX = coords.x - startMouse.x;
        const deltaY = coords.y - startMouse.y;
        
        const newX = startTransform.x + deltaX;
        const newY = startTransform.y + deltaY;
        
        movableGroup.setAttribute('transform', `translate(${newX}, ${newY})`);
        
        updateGuideLine(newX, newY);
    }

    function handleMouseUp(e) {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
            movableGroup.style.opacity = '1';
            showStatus('📍 Etiqueta reposicionada');
            
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }

    const mouseMoveHandler = handleMouseMove;
    const mouseUpHandler = handleMouseUp;
    
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    
    movableGroup.addEventListener('remove', function() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    });
}

function updateLabelForLine(line) {
    const fromId = line.getAttribute('data-from');
    const toId = line.getAttribute('data-to');
    const connectionId = `${fromId}-${toId}`;
    
    const labelGroup = document.querySelector(`.pipe-label-group[data-connection="${connectionId}"]`);
    if (!labelGroup) return;
    
    const guideLine = labelGroup.querySelector('.guide-line');
    if (!guideLine) return;
    
    const x1 = parseFloat(line.getAttribute('x1'));
    const y1 = parseFloat(line.getAttribute('y1'));
    const x2 = parseFloat(line.getAttribute('x2'));
    const y2 = parseFloat(line.getAttribute('y2'));
    
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    
    guideLine.setAttribute('x1', midX);
    guideLine.setAttribute('y1', midY);
}

console.log('Trazado - Labels cargado');