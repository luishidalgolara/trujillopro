IsometricNivel2Generator.prototype.setupLabelManipulation = function(svgElement) {
    const labels = svgElement.querySelectorAll('.pipe-label-n2');
    labels.forEach(label => {
        this.makeLabelDraggable(label);
    });
    
    const pdescInfos = svgElement.querySelectorAll('.pdesc-info-isometric');
    pdescInfos.forEach(info => {
        this.makePDescInfoDraggable(info);
    });
    
    const fixtureLabels = svgElement.querySelectorAll('.fixture-label-draggable-n2');
    fixtureLabels.forEach(label => {
        this.makeFixtureLabelDraggable(label);
    });
    
    const editableTexts = svgElement.querySelectorAll('.editable-text-n2');
    editableTexts.forEach(textElement => {
        this.makeTextEditable(textElement);
    });
};

IsometricNivel2Generator.prototype.makeTextEditable = function(textElement) {
    textElement.style.cursor = 'text';
    
    textElement.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        
        const currentText = textElement.textContent;
        const bbox = textElement.getBBox();
        const svg = textElement.ownerSVGElement;
        const pt = svg.createSVGPoint();
        pt.x = bbox.x;
        pt.y = bbox.y;
        const screenPt = pt.matrixTransform(svg.getScreenCTM());
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.style.position = 'fixed';
        input.style.left = screenPt.x + 'px';
        input.style.top = screenPt.y + 'px';
        input.style.width = Math.max(100, bbox.width + 20) + 'px';
        input.style.height = bbox.height + 10 + 'px';
        input.style.fontSize = textElement.getAttribute('font-size') + 'px';
        input.style.fontFamily = textElement.getAttribute('font-family') || 'Arial';
        input.style.fontWeight = textElement.getAttribute('font-weight') || 'normal';
        input.style.textAlign = 'center';
        input.style.border = '2px solid #3498db';
        input.style.borderRadius = '4px';
        input.style.padding = '4px';
        input.style.zIndex = '99999';
        input.style.outline = 'none';
        
        document.body.appendChild(input);
        input.focus();
        input.select();
        
        const finishEdit = () => {
            const newValue = input.value.trim();
            if (newValue && newValue !== currentText) {
                textElement.textContent = newValue;
            }
            input.remove();
        };
        
        input.addEventListener('blur', finishEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                finishEdit();
            } else if (e.key === 'Escape') {
                input.remove();
            }
        });
    });
};

IsometricNivel2Generator.prototype.makeFixtureLabelDraggable = function(labelElement) {
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
    
    rect.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

IsometricNivel2Generator.prototype.makePDescInfoDraggable = function(infoElement) {
    let isDragging = false;
    let startPoint = { x: 0, y: 0 };
    let startTransform = { x: 0, y: 0 };
    
    const rect = infoElement.querySelector('rect');
    const arrowId = infoElement.getAttribute('data-arrow-id');
    const arrow = document.getElementById(arrowId);
    
    const pdescX = parseFloat(infoElement.getAttribute('data-pdesc-x'));
    const pdescY = parseFloat(infoElement.getAttribute('data-pdesc-y'));
    
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
            arrow.setAttribute('x1', pdescX);
            arrow.setAttribute('y1', pdescY);
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

IsometricNivel2Generator.prototype.makeLabelDraggable = function(labelElement) {
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
        if (e.target.classList.contains('editable-text-n2')) return;
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
    
    labelElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

console.log('✅ Isométrico Nivel 2 - Labels cargado con edición de textos');