// ============================================================
// CONTENEDORES DE INFORMACIÓN PARA CÁMARAS
// ============================================================

const CAMERA_INFO_OFFSET = { x: 60, y: -40 };

function createCameraInfoContainer(element) {
    const existingContainer = document.getElementById(`camera-info-${element.id}`);
    if (existingContainer) {
        return;
    }
    
    const tracingSvg = document.getElementById('tracingSvg');
    
    const containerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    containerGroup.setAttribute('id', `camera-info-${element.id}`);
    containerGroup.setAttribute('class', 'camera-info-container');
    containerGroup.setAttribute('data-camera-id', element.id);
    
    const containerX = element.x + CAMERA_INFO_OFFSET.x;
    const containerY = element.y + CAMERA_INFO_OFFSET.y;
    
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    arrow.setAttribute('class', 'camera-arrow');
    arrow.setAttribute('x1', containerX);
    arrow.setAttribute('y1', containerY + 20);
    arrow.setAttribute('x2', element.x);
    arrow.setAttribute('y2', element.y);
    arrow.setAttribute('stroke', '#000000');
    arrow.setAttribute('stroke-width', '0.8');
    arrow.setAttribute('marker-end', 'url(#arrowhead-camera)');
    
    if (!document.getElementById('arrowhead-camera')) {
        const defs = tracingSvg.querySelector('defs') || tracingSvg.insertBefore(
            document.createElementNS('http://www.w3.org/2000/svg', 'defs'),
            tracingSvg.firstChild
        );
        
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead-camera');
        marker.setAttribute('markerWidth', '4');
        marker.setAttribute('markerHeight', '4');
        marker.setAttribute('refX', '3');
        marker.setAttribute('refY', '2');
        marker.setAttribute('orient', 'auto');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0 0, 4 2, 0 4');
        polygon.setAttribute('fill', '#000000');
        
        marker.appendChild(polygon);
        defs.appendChild(marker);
    }
    
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', containerX - 25);
    bg.setAttribute('y', containerY);
    bg.setAttribute('width', '50');
    bg.setAttribute('height', element.numeroCamera === 1 ? '32' : '40');
    bg.setAttribute('fill', '#ffffff');
    bg.setAttribute('stroke', '#000000');
    bg.setAttribute('stroke-width', '1');
    bg.setAttribute('rx', '2');
    
    const texts = [];
    const etiqueta = element.type === 'camara-publica' ? 'C. PUBLICA' : `C.I DOM N${element.numeroCamera}`;
    
    texts.push(createEditableText(containerX, containerY + 8, etiqueta, 'etiqueta'));
    texts.push(createEditableText(containerX, containerY + 16, 'CA=', 'ca'));
    
    if (element.numeroCamera === 1) {
        texts.push(createEditableText(containerX, containerY + 24, 'CRS=', 'crs'));
        texts.push(createEditableText(containerX, containerY + 32, 'h=', 'h'));
    } else {
        texts.push(createEditableText(containerX, containerY + 24, 'CRE:', 'cre'));
        texts.push(createEditableText(containerX, containerY + 32, 'CRS:', 'crs'));
        texts.push(createEditableText(containerX, containerY + 40, 'h:', 'h'));
        bg.setAttribute('height', '44');
    }
    
    containerGroup.appendChild(arrow);
    containerGroup.appendChild(bg);
    texts.forEach(t => containerGroup.appendChild(t));
    
    tracingSvg.appendChild(containerGroup);
    
    setupContainerDrag(containerGroup, element);
    setupTextEditing(containerGroup);
}

function createEditableText(x, y, content, field) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '5');
    text.setAttribute('font-weight', field === 'etiqueta' ? 'bold' : 'normal');
    text.setAttribute('fill', '#000000');
    text.setAttribute('class', 'camera-text-field');
    text.setAttribute('data-field', field);
    text.textContent = content;
    text.style.cursor = 'text';
    return text;
}

function setupContainerDrag(containerGroup, cameraElement) {
    const bg = containerGroup.querySelector('rect');
    const arrow = containerGroup.querySelector('.camera-arrow');
    let isDragging = false;
    let startMouse = { x: 0, y: 0 };
    let startContainer = { x: 0, y: 0 };
    
    bg.style.cursor = 'move';
    
    function handleMouseDown(e) {
        if (e.target.classList.contains('camera-text-field')) return;
        
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        
        const coords = screenToSVGCoords(e.clientX, e.clientY);
        startMouse.x = coords.x;
        startMouse.y = coords.y;
        
        startContainer.x = parseFloat(bg.getAttribute('x'));
        startContainer.y = parseFloat(bg.getAttribute('y'));
        
        containerGroup.style.opacity = '0.7';
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const coords = screenToSVGCoords(e.clientX, e.clientY);
        const deltaX = coords.x - startMouse.x;
        const deltaY = coords.y - startMouse.y;
        
        const newX = startContainer.x + deltaX;
        const newY = startContainer.y + deltaY;
        
        bg.setAttribute('x', newX);
        bg.setAttribute('y', newY);
        
        const texts = containerGroup.querySelectorAll('.camera-text-field');
        texts.forEach((text, idx) => {
            const originalY = startContainer.y + 8 + (idx * 8);
            text.setAttribute('x', newX + 25);
            text.setAttribute('y', originalY + deltaY);
        });
        
        arrow.setAttribute('x1', newX + 25);
        arrow.setAttribute('y1', newY + 20);
    }
    
    function handleMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        containerGroup.style.opacity = '1';
        
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }
    
    bg.addEventListener('mousedown', handleMouseDown);
}

function setupTextEditing(containerGroup) {
    const texts = containerGroup.querySelectorAll('.camera-text-field');
    
    texts.forEach(text => {
        text.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const currentText = text.textContent;
            const field = text.getAttribute('data-field');
            
            if (field === 'etiqueta') return;
            
            const input = prompt(`Editar ${field.toUpperCase()}:`, currentText);
            if (input !== null) {
                text.textContent = input;
            }
        });
    });
}

function updateCameraArrow(cameraId) {
    const container = document.getElementById(`camera-info-${cameraId}`);
    if (!container) return;
    
    const cameraGroup = document.getElementById(`tracing-element-${cameraId}`);
    if (!cameraGroup) return;
    
    const circle = cameraGroup.querySelector('circle');
    const arrow = container.querySelector('.camera-arrow');
    
    if (circle && arrow) {
        arrow.setAttribute('x2', circle.getAttribute('cx'));
        arrow.setAttribute('y2', circle.getAttribute('cy'));
    }
}

console.log('✅ Contenedores de cámaras cargado');