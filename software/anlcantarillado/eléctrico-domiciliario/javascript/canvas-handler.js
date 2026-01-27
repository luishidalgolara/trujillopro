// ========================================
// MANEJO DE CANVAS
// ========================================
function handleCanvasClick(event) {
    // No permitir clicks si está en modo pan
    if (AppState.isPanning) return;
    
    if (!AppState.currentTool) {
        updateStatus('⚠️ Selecciona una herramienta primero');
        return;
    }
    
    const svg = document.getElementById('plano');
    const rect = svg.getBoundingClientRect();
    
    // Convertir coordenadas del viewport SVG considerando zoom y pan
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    placeSymbol(svgP.x, svgP.y, AppState.currentTool);
}

function handleCanvasRightClick(event) {
    event.preventDefault();
    console.log('🖱️ Click derecho en canvas');
    // Aquí se puede implementar menú contextual
}

function placeSymbol(x, y, toolName) {
    const symbol = ElectricSymbols[toolName];
    if (!symbol) return;
    
    const svg = document.getElementById('plano');
    
    // Crear grupo para el símbolo
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', `electric-symbol ${symbol.category}`);
    group.setAttribute('transform', `translate(${x}, ${y})`);
    
    // Crear círculo de fondo
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', 15 / AppState.zoom); // Ajustar por zoom
    circle.setAttribute('fill', symbol.color);
    circle.setAttribute('stroke', '#2c3e50');
    circle.setAttribute('stroke-width', 2 / AppState.zoom); // Ajustar por zoom
    
    // Crear texto con el símbolo
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '0');
    text.setAttribute('y', '5');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', 16 / AppState.zoom); // Ajustar por zoom
    text.textContent = symbol.symbol;
    
    // Crear etiqueta
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', '0');
    label.setAttribute('y', '30');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', 10 / AppState.zoom); // Ajustar por zoom
    label.setAttribute('fill', '#2c3e50');
    label.textContent = symbol.name;
    
    group.appendChild(circle);
    group.appendChild(text);
    group.appendChild(label);
    
    // Agregar interactividad
    group.style.cursor = 'move';
    group.addEventListener('mousedown', function(e) {
        if (e.button === 0 && !AppState.isPanning) { // Solo click izquierdo y no en pan
            e.stopPropagation();
            selectElement(group);
            startDragElement(e, group);
        }
    });
    
    svg.appendChild(group);
    
    // Guardar en el estado
    AppState.elements.push({
        type: toolName,
        x: x,
        y: y,
        element: group
    });
    
    updateStatus(`${symbol.name} colocado en (${Math.round(x)}, ${Math.round(y)})`);
    console.log('✅ Símbolo colocado:', symbol.name);
}

function selectElement(element) {
    // Deseleccionar elemento anterior
    if (AppState.selectedElement) {
        const prevCircle = AppState.selectedElement.querySelector('circle');
        if (prevCircle) {
            prevCircle.setAttribute('stroke-width', 2 / AppState.zoom);
        }
    }
    
    // Seleccionar nuevo elemento
    AppState.selectedElement = element;
    const circle = element.querySelector('circle');
    if (circle) {
        circle.setAttribute('stroke-width', 4 / AppState.zoom);
    }
    console.log('🎯 Elemento seleccionado');
}

// ========================================
// ARRASTRE DE ELEMENTOS
// ========================================
let dragElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function startDragElement(e, element) {
    AppState.isDraggingElement = true;
    dragElement = element;
    
    const svg = document.getElementById('plano');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    // Obtener posición actual del elemento
    const transform = element.getAttribute('transform');
    const match = transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);
    if (match) {
        dragOffsetX = svgP.x - parseFloat(match[1]);
        dragOffsetY = svgP.y - parseFloat(match[2]);
    }
    
    document.addEventListener('mousemove', handleDragElement);
    document.addEventListener('mouseup', stopDragElement);
}

function handleDragElement(e) {
    if (!dragElement) return;
    
    const svg = document.getElementById('plano');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    const newX = svgP.x - dragOffsetX;
    const newY = svgP.y - dragOffsetY;
    
    dragElement.setAttribute('transform', `translate(${newX}, ${newY})`);
    
    // Actualizar en el estado
    const elementData = AppState.elements.find(el => el.element === dragElement);
    if (elementData) {
        elementData.x = newX;
        elementData.y = newY;
    }
}

function stopDragElement(e) {
    if (!dragElement) return;
    
    document.removeEventListener('mousemove', handleDragElement);
    document.removeEventListener('mouseup', stopDragElement);
    
    dragElement = null;
    AppState.isDraggingElement = false;
}

function centerDrawingBoard() {
    // Esta función ya no es necesaria con el nuevo sistema de zoom/pan
    // Se mantiene por compatibilidad pero no hace nada
    return;
}