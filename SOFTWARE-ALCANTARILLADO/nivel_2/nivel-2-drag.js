function setupElementDragNivel2(elementGroup) {
    let isDragging = false;
    let hasMoved = false;
    let startMouse = { x: 0, y: 0 };
    let startElement = { x: 0, y: 0 };
    const MOVE_THRESHOLD = 5;
    
    const circle = elementGroup.querySelector('circle');
    if (!circle) return;
    
    function handleMouseDown(e) {
        if (isNavigationMode) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        isDragging = true;
        hasMoved = false;
        
        const coords = screenToSVGCoords(e.clientX, e.clientY);
        startMouse.x = coords.x;
        startMouse.y = coords.y;
        
        startElement.x = parseFloat(circle.getAttribute('cx'));
        startElement.y = parseFloat(circle.getAttribute('cy'));
        
        document.body.style.userSelect = 'none';
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const coords = screenToSVGCoords(e.clientX, e.clientY);
        const deltaX = coords.x - startMouse.x;
        const deltaY = coords.y - startMouse.y;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance > MOVE_THRESHOLD) {
            hasMoved = true;
            elementGroup.style.opacity = '0.7';
            
            const newX = startElement.x + deltaX;
            const newY = startElement.y + deltaY;
            
            circle.setAttribute('cx', newX);
            circle.setAttribute('cy', newY);
            
            const texts = elementGroup.querySelectorAll('text');
            if (texts[0]) {
                texts[0].setAttribute('x', newX);
                texts[0].setAttribute('y', newY + 3);
            }
            if (texts[1]) {
                texts[1].setAttribute('x', newX + 15);
                texts[1].setAttribute('y', newY - 15);
            }
            
            updateConnectionsForElementNivel2(elementGroup);
        }
    }
    
    function handleMouseUp(e) {
        if (!isDragging) return;
        
        isDragging = false;
        document.body.style.userSelect = '';
        elementGroup.style.opacity = '1';
        
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        
        if (hasMoved) {
            const elementId = elementGroup.id.replace('tracing-element-', '');
            const element = ELEMENTOS_NIVEL_2.find(el => el.id === elementId);
            
            if (element) {
                element.x = parseFloat(circle.getAttribute('cx'));
                element.y = parseFloat(circle.getAttribute('cy'));
            }
            
            showStatus('📍 Elemento 2° nivel reposicionado');
        }
        
        hasMoved = false;
    }
    
    elementGroup.removeEventListener('mousedown', handleMouseDown);
    elementGroup.addEventListener('mousedown', handleMouseDown);
}

function updateConnectionsForElementNivel2(elementGroup) {
    const elementId = elementGroup.id.replace('tracing-element-', '');
    const circle = elementGroup.querySelector('circle');
    const newX = parseFloat(circle.getAttribute('cx'));
    const newY = parseFloat(circle.getAttribute('cy'));
    
    const tracingSvg = document.getElementById('tracingSvg');
    
    const linesFrom = tracingSvg.querySelectorAll(`.pipe-line.nivel-2[data-from="${elementId}"]`);
    const linesTo = tracingSvg.querySelectorAll(`.pipe-line.nivel-2[data-to="${elementId}"]`);
    
    linesFrom.forEach(line => {
        line.setAttribute('x1', newX);
        line.setAttribute('y1', newY);
        updateArrowForLineNivel2(line);
        updateLabelForLineNivel2(line);
    });
    
    linesTo.forEach(line => {
        line.setAttribute('x2', newX);
        line.setAttribute('y2', newY);
        updateArrowForLineNivel2(line);
        updateLabelForLineNivel2(line);
    });
}

function updateArrowForLineNivel2(line) {
    const fromId = line.getAttribute('data-from');
    const toId = line.getAttribute('data-to');
    const connectionId = `${fromId}-${toId}`;
    
    const arrow = document.querySelector(`.flow-arrow.nivel-2[data-connection="${connectionId}"]`);
    if (!arrow) return;
    
    const x1 = parseFloat(line.getAttribute('x1'));
    const y1 = parseFloat(line.getAttribute('y1'));
    const x2 = parseFloat(line.getAttribute('x2'));
    const y2 = parseFloat(line.getAttribute('y2'));
    
    const arrowX = x1 + (x2 - x1) * 0.75;
    const arrowY = y1 + (y2 - y1) * 0.75;
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    arrow.setAttribute('transform', `translate(${arrowX}, ${arrowY}) rotate(${angle})`);
}

window.setupElementDragNivel2 = setupElementDragNivel2;
window.updateConnectionsForElementNivel2 = updateConnectionsForElementNivel2;

console.log('✅ nivel-2-drag.js cargado');