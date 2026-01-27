function setupElementDragImproved(elementGroup) {
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
            
            const text = elementGroup.querySelector('text');
            if (text) {
                text.setAttribute('x', newX);
                text.setAttribute('y', newY + 3);
            }
            
            const labelText = elementGroup.querySelectorAll('text')[1];
            if (labelText) {
                labelText.setAttribute('x', newX);
                labelText.setAttribute('y', newY - 20);
            }
            
            updateConnectionsForElement(elementGroup);
            
            const elementId = parseInt(elementGroup.id.replace('tracing-element-', ''));
            if (typeof updateCameraArrow === 'function') {
                updateCameraArrow(elementId);
            }
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
            const elementId = parseInt(elementGroup.id.replace('tracing-element-', ''));
            const currentPlan = plans[currentPlanIndex];
            const element = currentPlan.tracingElements.find(el => el.id === elementId);
            
            if (element) {
                element.x = parseFloat(circle.getAttribute('cx'));
                element.y = parseFloat(circle.getAttribute('cy'));
            }
            
            showStatus('📍 Elemento reposicionado');
        }
        
        hasMoved = false;
    }
    
    elementGroup.removeEventListener('mousedown', handleMouseDown);
    elementGroup.addEventListener('mousedown', handleMouseDown);
}

function updateConnectionsForElement(elementGroup) {
    const elementId = parseInt(elementGroup.id.replace('tracing-element-', ''));
    const circle = elementGroup.querySelector('circle');
    const newX = parseFloat(circle.getAttribute('cx'));
    const newY = parseFloat(circle.getAttribute('cy'));
    
    const tracingSvg = document.getElementById('tracingSvg');
    
    const linesFrom = tracingSvg.querySelectorAll(`[data-from="${elementId}"]`);
    const linesTo = tracingSvg.querySelectorAll(`[data-to="${elementId}"]`);
    
    linesFrom.forEach(line => {
        line.setAttribute('x1', newX);
        line.setAttribute('y1', newY);
        updateArrowForLine(line);
        updateLabelForLine(line);
    });
    
    linesTo.forEach(line => {
        line.setAttribute('x2', newX);
        line.setAttribute('y2', newY);
        updateArrowForLine(line);
        updateLabelForLine(line);
    });
}

console.log('Trazado - Drag cargado con soporte para contenedores');