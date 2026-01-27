IsometricSewerGenerator.prototype.setupLabelManipulation = function(svgElement) {
    const labels = svgElement.querySelectorAll('.pipe-label');
    labels.forEach(label => {
        this.makeLabelDraggable(label);
    });
    
    const cameraInfos = svgElement.querySelectorAll('.camera-info-isometric');
    cameraInfos.forEach(info => {
        this.makeCameraInfoDraggable(info);
    });
    
    const fixtureLabels = svgElement.querySelectorAll('.fixture-label-draggable');
    fixtureLabels.forEach(label => {
        this.makeFixtureLabelDraggable(label);
    });
};

IsometricSewerGenerator.prototype.makeFixtureLabelDraggable = function(labelElement) {
    let isDragging = false;
    let startPoint = { x: 0, y: 0 };
    let startTransform = { x: 0, y: 0 };
    
    const rect = labelElement.querySelector('rect');
    if (!rect) return;
    
    rect.style.cursor = 'move';
    
    const getTransform = () => {
        const transform = labelElement.getAttribute('transform') || 'translate(0,0)';
        const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
        return match ? { x: parseFloat(match[1]), y: parseFloat(match[2]) } : { x: 0, y: 0 };
    };
    
    const getSVGPoint = (clientX, clientY) => {
        const svg = labelElement.ownerSVGElement;
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    };
    
    const handleMouseDown = (e) => {
        if (e.target.tagName === 'text') return;
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        
        const svgPt = getSVGPoint(e.clientX, e.clientY);
        startPoint = { x: svgPt.x, y: svgPt.y };
        startTransform = getTransform();
        
        rect.style.cursor = 'grabbing';
        labelElement.style.opacity = '0.8';
        rect.setAttribute('stroke', '#3498db');
        rect.setAttribute('stroke-width', '2');
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const svgPt = getSVGPoint(e.clientX, e.clientY);
        const deltaX = svgPt.x - startPoint.x;
        const deltaY = svgPt.y - startPoint.y;
        const newX = startTransform.x + deltaX;
        const newY = startTransform.y + deltaY;
        
        labelElement.setAttribute('transform', `translate(${newX}, ${newY})`);
    };
    
    const handleMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            rect.style.cursor = 'move';
            labelElement.style.opacity = '1';
            rect.setAttribute('stroke', '#2c3e50');
            rect.setAttribute('stroke-width', '1.5');
        }
    };
    
    const handleMouseEnter = () => {
        if (!isDragging) {
            rect.setAttribute('stroke', '#3498db');
        }
    };
    
    const handleMouseLeave = () => {
        if (!isDragging) {
            rect.setAttribute('stroke', '#2c3e50');
        }
    };
    
    rect.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    rect.addEventListener('mouseenter', handleMouseEnter);
    rect.addEventListener('mouseleave', handleMouseLeave);
};

IsometricSewerGenerator.prototype.makeCameraInfoDraggable = function(infoElement) {
    let isDragging = false;
    let startPoint = { x: 0, y: 0 };
    let startTransform = { x: 0, y: 0 };
    
    const rect = infoElement.querySelector('rect');
    const arrowId = infoElement.getAttribute('data-arrow-id');
    const arrow = document.getElementById(arrowId);
    
    const cameraX = parseFloat(infoElement.getAttribute('data-camera-x'));
    const cameraY = parseFloat(infoElement.getAttribute('data-camera-y'));
    
    if (!rect || !arrow) return;
    
    rect.style.cursor = 'move';
    
    const getTransform = () => {
        const transform = infoElement.getAttribute('transform') || 'translate(0,0)';
        const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
        return match ? { x: parseFloat(match[1]), y: parseFloat(match[2]) } : { x: 0, y: 0 };
    };
    
    const getSVGPoint = (clientX, clientY) => {
        const svg = infoElement.ownerSVGElement;
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    };
    
    const updateArrow = (newX, newY) => {
        if (arrow) {
            arrow.setAttribute('x1', cameraX);
            arrow.setAttribute('y1', cameraY);
            arrow.setAttribute('x2', newX);
            arrow.setAttribute('y2', newY + 30);
        }
    };
    
    const handleMouseDown = (e) => {
        if (e.target.tagName === 'text') return;
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        
        const svgPt = getSVGPoint(e.clientX, e.clientY);
        startPoint = { x: svgPt.x, y: svgPt.y };
        startTransform = getTransform();
        
        rect.style.cursor = 'grabbing';
        infoElement.style.opacity = '0.8';
        if (arrow) arrow.setAttribute('stroke-width', '2.5');
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const svgPt = getSVGPoint(e.clientX, e.clientY);
        const deltaX = svgPt.x - startPoint.x;
        const deltaY = svgPt.y - startPoint.y;
        const newX = startTransform.x + deltaX;
        const newY = startTransform.y + deltaY;
        
        infoElement.setAttribute('transform', `translate(${newX}, ${newY})`);
        updateArrow(newX, newY);
    };
    
    const handleMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            rect.style.cursor = 'move';
            infoElement.style.opacity = '1';
            if (arrow) arrow.setAttribute('stroke-width', '2');
        }
    };
    
    rect.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

IsometricSewerGenerator.prototype.makeLabelDraggable = function(labelElement) {
    let isDragging = false;
    let startPoint = { x: 0, y: 0 };
    let startTransform = { x: 0, y: 0 };
    
    const getTransform = () => {
        const transform = labelElement.getAttribute('transform') || 'translate(0,0)';
        const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
        return match ? { x: parseFloat(match[1]), y: parseFloat(match[2]) } : { x: 0, y: 0 };
    };
    
    const getSVGPoint = (clientX, clientY) => {
        const svg = labelElement.ownerSVGElement;
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
    };
    
    const updateGuideLine = (newX, newY) => {
        const labelId = labelElement.getAttribute('data-label-id');
        const guideLine = document.getElementById(`guide-line-${labelId}`);
        if (guideLine) {
            guideLine.setAttribute('x2', newX);
            guideLine.setAttribute('y2', newY);
        }
    };
    
    labelElement.style.cursor = 'grab';
    
    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        
        const svgPt = getSVGPoint(e.clientX, e.clientY);
        startPoint = { x: svgPt.x, y: svgPt.y };
        startTransform = getTransform();
        
        labelElement.style.cursor = 'grabbing';
        labelElement.style.opacity = '0.8';
        
        const labelId = labelElement.getAttribute('data-label-id');
        const guideLine = document.getElementById(`guide-line-${labelId}`);
        if (guideLine) {
            guideLine.setAttribute('stroke', '#3498db');
            guideLine.setAttribute('stroke-width', '2');
            guideLine.setAttribute('opacity', '1');
        }
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const svgPt = getSVGPoint(e.clientX, e.clientY);
        const deltaX = svgPt.x - startPoint.x;
        const deltaY = svgPt.y - startPoint.y;
        const newX = startTransform.x + deltaX;
        const newY = startTransform.y + deltaY;
        
        labelElement.setAttribute('transform', `translate(${newX}, ${newY})`);
        updateGuideLine(newX, newY);
    };
    
    const handleMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            labelElement.style.cursor = 'grab';
            labelElement.style.opacity = '1';
            
            const labelId = labelElement.getAttribute('data-label-id');
            const guideLine = document.getElementById(`guide-line-${labelId}`);
            if (guideLine) {
                guideLine.setAttribute('stroke', '#000000');
                guideLine.setAttribute('stroke-width', '1');
                guideLine.setAttribute('opacity', '0.7');
            }
        }
    };
    
    const handleMouseEnter = () => {
        const labelId = labelElement.getAttribute('data-label-id');
        const guideLine = document.getElementById(`guide-line-${labelId}`);
        if (guideLine && !isDragging) {
            guideLine.setAttribute('stroke', '#3498db');
            guideLine.setAttribute('opacity', '1');
        }
    };
    
    const handleMouseLeave = () => {
        if (!isDragging) {
            const labelId = labelElement.getAttribute('data-label-id');
            const guideLine = document.getElementById(`guide-line-${labelId}`);
            if (guideLine) {
                guideLine.setAttribute('stroke', '#000000');
                guideLine.setAttribute('opacity', '0.7');
            }
        }
    };
    
    labelElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    labelElement.addEventListener('mouseenter', handleMouseEnter);
    labelElement.addEventListener('mouseleave', handleMouseLeave);
};

console.log('Motor Isométrico - Labels cargado con soporte para contenedores de cámaras y artefactos');