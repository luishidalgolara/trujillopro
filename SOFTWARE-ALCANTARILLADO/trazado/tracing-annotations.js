// ARCHIVO: tracing-annotations.js (COMPLETO CORREGIDO)
function showTextModal() {
    document.getElementById('textModal').style.display = 'block';
}

function hideTextModal() {
    document.getElementById('textModal').style.display = 'none';
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
}

function createTextElement() {
    const content = document.getElementById('textContent').value || 'TEXTO';
    const font = document.getElementById('textFont').value;
    const size = document.getElementById('textSize').value;
    
    hideTextModal();
    
    const tracingSvg = document.getElementById('tracingSvg');
    const textId = 'text-' + Date.now();
    
    const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    textGroup.setAttribute('id', textId);
    textGroup.setAttribute('class', 'dynamic-text');
    textGroup.style.cursor = 'move';
    textGroup.dataset.selected = 'false';
    
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', 100);
    textElement.setAttribute('y', 100);
    textElement.setAttribute('font-family', font);
    textElement.setAttribute('font-size', size);
    textElement.setAttribute('fill', '#000000');
    textElement.setAttribute('font-weight', 'normal');
    textElement.textContent = content;
    
    textGroup.appendChild(textElement);
    tracingSvg.appendChild(textGroup);
    
    makeTextDraggable(textGroup, textElement);
    makeTextSelectable(textGroup);
    
    showStatus(`✅ Texto "${content}" creado - Click para seleccionar, SUPRIMIR para eliminar`);
}

function createNorthRose() {
    const tracingSvg = document.getElementById('tracingSvg');
    const roseId = 'rose-' + Date.now();
    
    const roseGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    roseGroup.setAttribute('id', roseId);
    roseGroup.setAttribute('class', 'dynamic-rose');
    roseGroup.style.cursor = 'move';
    roseGroup.setAttribute('transform', 'translate(200,100)');
    roseGroup.dataset.selected = 'false';
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', 0);
    circle.setAttribute('cy', 0);
    circle.setAttribute('r', 25);
    circle.setAttribute('fill', 'white');
    circle.setAttribute('stroke', '#000000');
    circle.setAttribute('stroke-width', '2');
    
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrow.setAttribute('points', '0,-20 -5,-10 5,-10');
    arrow.setAttribute('fill', '#000000');
    
    const nText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    nText.setAttribute('x', 0);
    nText.setAttribute('y', 5);
    nText.setAttribute('text-anchor', 'middle');
    nText.setAttribute('font-family', 'Arial');
    nText.setAttribute('font-size', '14');
    nText.setAttribute('font-weight', 'bold');
    nText.setAttribute('fill', '#000000');
    nText.textContent = 'N';
    
    const resizeHandle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    resizeHandle.setAttribute('cx', 25);
    resizeHandle.setAttribute('cy', 25);
    resizeHandle.setAttribute('r', 4);
    resizeHandle.setAttribute('fill', '#3498db');
    resizeHandle.setAttribute('stroke', '#ffffff');
    resizeHandle.setAttribute('stroke-width', '2');
    resizeHandle.style.cursor = 'nw-resize';
    
    roseGroup.appendChild(circle);
    roseGroup.appendChild(arrow);
    roseGroup.appendChild(nText);
    roseGroup.appendChild(resizeHandle);
    
    tracingSvg.appendChild(roseGroup);
    
    makeRoseManipulable(roseGroup);
    makeTextSelectable(roseGroup);
    
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    
    showStatus('✅ Rosa de vientos creada - Click para seleccionar, SUPRIMIR para eliminar');
}

function makeTextSelectable(element) {
    element.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (e.ctrlKey || e.metaKey) {
            toggleTextSelection(element);
        } else {
            deselectAllTexts();
            selectText(element);
        }
    });
}

function selectText(element) {
    element.dataset.selected = 'true';
    
    const textElement = element.querySelector('text');
    const circle = element.querySelector('circle');
    
    if (textElement) {
        textElement.style.fill = '#3498db';
        textElement.style.fontWeight = 'bold';
    }
    if (circle) {
        circle.style.stroke = '#3498db';
        circle.style.strokeWidth = '3';
    }
    
    showStatus('✅ Elemento seleccionado. Presiona SUPRIMIR para eliminar');
}

function toggleTextSelection(element) {
    if (element.dataset.selected === 'true') {
        deselectText(element);
    } else {
        selectText(element);
    }
}

function deselectText(element) {
    element.dataset.selected = 'false';
    
    const textElement = element.querySelector('text');
    const circle = element.querySelector('circle');
    
    if (textElement) {
        textElement.style.fill = '#000000';
        textElement.style.fontWeight = 'normal';
    }
    if (circle) {
        circle.style.stroke = '#000000';
        circle.style.strokeWidth = '2';
    }
}

function deselectAllTexts() {
    const allTexts = document.querySelectorAll('.dynamic-text[data-selected="true"], .dynamic-rose[data-selected="true"]');
    allTexts.forEach(text => deselectText(text));
}

function makeTextDraggable(textGroup, textElement) {
    let isDragging = false;
    let startX, startY, startTextX, startTextY;
    
    textGroup.addEventListener('mousedown', function(e) {
        if (isNavigationMode) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startTextX = parseFloat(textElement.getAttribute('x'));
        startTextY = parseFloat(textElement.getAttribute('y'));
        
        textGroup.style.opacity = '0.7';
    });
    
    textGroup.addEventListener('dblclick', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const newText = prompt('Editar texto:', textElement.textContent);
        if (newText !== null) {
            textElement.textContent = newText;
            showStatus('✅ Texto actualizado');
        }
    });
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        textElement.setAttribute('x', startTextX + deltaX);
        textElement.setAttribute('y', startTextY + deltaY);
    }
    
    function handleMouseUp() {
        if (isDragging) {
            isDragging = false;
            textGroup.style.opacity = '1';
        }
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function makeRoseManipulable(roseGroup) {
    let isDragging = false;
    let isResizing = false;
    let startX, startY, startTransform;
    let currentScale = 1;
    
    const resizeHandle = roseGroup.querySelector('circle[r="4"]');
    
    roseGroup.addEventListener('mousedown', function(e) {
        if (isNavigationMode || e.target === resizeHandle) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        const transform = roseGroup.getAttribute('transform');
        const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
        startTransform = match ? { x: parseFloat(match[1]), y: parseFloat(match[2]) } : { x: 0, y: 0 };
        
        roseGroup.style.opacity = '0.7';
    });
    
    resizeHandle.addEventListener('mousedown', function(e) {
        if (isNavigationMode) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
    });
    
    function handleMouseMove(e) {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newX = startTransform.x + deltaX;
            const newY = startTransform.y + deltaY;
            
            roseGroup.setAttribute('transform', `translate(${newX},${newY}) scale(${currentScale})`);
        }
        
        if (isResizing) {
            const deltaX = e.clientX - startX;
            const factor = 1 + (deltaX / 100);
            currentScale = Math.max(0.5, Math.min(3, factor));
            
            const transform = roseGroup.getAttribute('transform');
            const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
            const pos = match ? `translate(${match[1]},${match[2]})` : 'translate(200,100)';
            
            roseGroup.setAttribute('transform', `${pos} scale(${currentScale})`);
        }
    }
    
    function handleMouseUp() {
        if (isDragging) {
            isDragging = false;
            roseGroup.style.opacity = '1';
        }
        if (isResizing) {
            isResizing = false;
        }
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

console.log('Trazado - Annotations cargado');