// ========================================
// MANEJO DE CANVAS - CON SOPORTE PARA DIBUJO
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
    
    // Verificar si es una herramienta de dibujo geométrico
    if (typeof isDrawingTool === 'function' && isDrawingTool(AppState.currentTool)) {
        // Manejar POLILÍNEA de forma especial (no usa drawingInProgress)
        if (AppState.currentTool === 'polilinea') {
            startDrawing(svgP.x, svgP.y); // Siempre agregar punto
            return;
        }
        
        // Para otras herramientas (línea, círculo, cuadrado, rectángulo)
        if (!AppState.drawingInProgress) {
            startDrawing(svgP.x, svgP.y);
        } else {
            finishDrawing(svgP.x, svgP.y);
        }
        return;
    }
    
    // Verificar si es un TABLERO (requiere selección de tipo)
    if (AppState.currentTool === 'tablero') {
        if (typeof showTableroTypeModal === 'function') {
            showTableroTypeModal(svgP.x, svgP.y, AppState.currentTool);
        } else {
            console.error('❌ Función showTableroTypeModal no encontrada');
            alert('Error: No se pudo cargar el sistema de selección de tablero');
        }
        return;
    }
    
    // Verificar si el símbolo requiere selección de nivel
    const symbol = ElectricSymbols[AppState.currentTool];
    if (symbol && symbol.requiresLevel) {
        // Mostrar selector de nivel
        showLevelSelector(AppState.currentTool, svgP.x, svgP.y);
    } else {
        // Colocar directamente sin nivel
        placeSymbol(svgP.x, svgP.y, AppState.currentTool);
    }
}

// Agregar manejador de mousemove para preview de dibujo
function handleCanvasMouseMove(event) {
    if (!AppState.currentTool) return;
    
    // Solo para herramientas de dibujo (EXCEPTO polilínea que usa otro sistema)
    if (typeof isDrawingTool === 'function' && isDrawingTool(AppState.currentTool)) {
        if (AppState.currentTool !== 'polilinea' && AppState.drawingInProgress) {
            const svg = document.getElementById('plano');
            const pt = svg.createSVGPoint();
            pt.x = event.clientX;
            pt.y = event.clientY;
            const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            
            updateDrawing(svgP.x, svgP.y);
        }
    }
}

// Agregar manejador de doble click para finalizar polilínea
function handleCanvasDoubleClick(event) {
    event.preventDefault();
    if (AppState.currentTool === 'polilinea' && AppState.polylinePoints.length > 1) {
        finishPolyline();
        updateStatus('✅ Polilínea finalizada');
    }
}

function handleCanvasRightClick(event) {
    event.preventDefault();
    
    // Si estamos dibujando una polilínea, finalizarla con click derecho
    if (AppState.currentTool === 'polilinea' && AppState.polylinePoints.length > 1) {
        finishPolyline();
        updateStatus('✅ Polilínea finalizada con click derecho');
        return;
    }
    
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
    
    // Crear círculo de fondo - Se ajusta con zoom para mantener tamaño visual constante
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', 6 / AppState.zoom); // Se ajusta inversamente al zoom
    circle.setAttribute('fill', symbol.color);
    circle.setAttribute('stroke', '#2c3e50');
    circle.setAttribute('stroke-width', 1 / AppState.zoom);
    circle.classList.add('scalable-symbol'); // Clase para actualizar con zoom
    
    // Crear texto con el símbolo
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '0');
    text.setAttribute('y', '2.5');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', 9 / AppState.zoom);
    text.classList.add('scalable-text');
    text.textContent = symbol.symbol;
    
    // Crear etiqueta
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', '0');
    label.setAttribute('y', 16 / AppState.zoom);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', 8 / AppState.zoom);
    label.setAttribute('fill', '#2c3e50');
    label.classList.add('scalable-label');
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
    
    // Guardar en el estado (sin nivel aún)
    AppState.elements.push({
        type: toolName,
        x: x,
        y: y,
        level: null,
        element: group
    });
    
    // Hacer etiquetas interactivas
    if (typeof makeLabelsInteractive === 'function') {
        setTimeout(makeLabelsInteractive, 10);
    }
    
    updateStatus(`${symbol.name} colocado en (${Math.round(x)}, ${Math.round(y)})`);
    console.log('✅ Símbolo colocado:', symbol.name);
}

/**
 * Colocar símbolo con nivel específico
 */
function placeSymbolWithLevel(x, y, toolName, level) {
    const symbol = ElectricSymbols[toolName];
    if (!symbol) return;
    
    const svg = document.getElementById('plano');
    
    // Crear grupo para el símbolo
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', `electric-symbol ${symbol.category}`);
    group.setAttribute('transform', `translate(${x}, ${y})`);
    group.setAttribute('data-level', level);
    
    // Crear círculo de fondo
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', 6 / AppState.zoom);
    circle.setAttribute('fill', symbol.color);
    circle.setAttribute('stroke', '#2c3e50');
    circle.setAttribute('stroke-width', 1 / AppState.zoom);
    circle.classList.add('scalable-symbol');
    
    // Crear texto con el símbolo
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '0');
    text.setAttribute('y', '2.5');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', 9 / AppState.zoom);
    text.classList.add('scalable-text');
    text.textContent = symbol.symbol;
    
    // Crear etiqueta con nivel
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', '0');
    label.setAttribute('y', 16 / AppState.zoom);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', 8 / AppState.zoom);
    label.setAttribute('fill', '#2c3e50');
    label.classList.add('scalable-label');
    label.textContent = symbol.name;
    
    // Badge de nivel
    const levelBadge = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    levelBadge.setAttribute('cx', '7');
    levelBadge.setAttribute('cy', '-7');
    levelBadge.setAttribute('r', 6 / AppState.zoom);
    levelBadge.setAttribute('fill', level === 1 ? '#3498db' : '#9b59b6');
    levelBadge.setAttribute('stroke', '#fff');
    levelBadge.setAttribute('stroke-width', 2 / AppState.zoom);
    levelBadge.classList.add('scalable-level-badge');
    
    const levelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    levelText.setAttribute('x', '7');
    levelText.setAttribute('y', '-5');
    levelText.setAttribute('text-anchor', 'middle');
    levelText.setAttribute('font-size', 8 / AppState.zoom);
    levelText.setAttribute('font-weight', 'bold');
    levelText.setAttribute('fill', '#fff');
    levelText.classList.add('scalable-level-text');
    levelText.textContent = level;
    
    group.appendChild(circle);
    group.appendChild(text);
    group.appendChild(label);
    group.appendChild(levelBadge);
    group.appendChild(levelText);
    
    // Agregar interactividad
    group.style.cursor = 'move';
    group.addEventListener('mousedown', function(e) {
        if (e.button === 0 && !AppState.isPanning) {
            e.stopPropagation();
            selectElement(group);
            startDragElement(e, group);
        }
    });
    
    svg.appendChild(group);
    
    // Guardar en el estado CON nivel
    const elementData = {
        type: toolName,
        x: x,
        y: y,
        level: level,
        element: group
    };
    
    AppState.elements.push(elementData);
    
    // Hacer etiquetas interactivas
    if (typeof makeLabelsInteractive === 'function') {
        setTimeout(makeLabelsInteractive, 10);
    }
    
    // Si es un conector de nivel, agregarlo a la lista especial
    if (symbol.isLevelConnector) {
        if (level === 1) {
            AppState.levelConnectors.level1ToLevel2.push(elementData);
            updateStatus(`⬆️ Punto de SUBIDA marcado en Nivel 1 (${Math.round(x)}, ${Math.round(y)})`);
        } else if (level === 2) {
            AppState.levelConnectors.level2FromLevel1.push(elementData);
            updateStatus(`⬇️ Punto de LLEGADA marcado en Nivel 2 (${Math.round(x)}, ${Math.round(y)})`);
        }
        console.log('🔌 Conector de nivel registrado:', {
            level: level,
            position: {x, y},
            total_L1: AppState.levelConnectors.level1ToLevel2.length,
            total_L2: AppState.levelConnectors.level2FromLevel1.length
        });
    } else {
        updateStatus(`${symbol.name} (Nivel ${level}) colocado en (${Math.round(x)}, ${Math.round(y)})`);
    }
    
    console.log('✅ Símbolo colocado con nivel:', symbol.name, 'Nivel:', level);
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

// Función para actualizar el tamaño de los símbolos cuando cambia el zoom
function updateSymbolsForZoom(newZoom) {
    const svg = document.getElementById('plano');
    if (!svg) return;
    
    // Actualizar todos los círculos de símbolos
    const circles = svg.querySelectorAll('.scalable-symbol');
    circles.forEach(circle => {
        circle.setAttribute('r', 6 / newZoom);
        circle.setAttribute('stroke-width', 1 / newZoom);
    });
    
    // Actualizar textos de símbolos
    const texts = svg.querySelectorAll('.scalable-text');
    texts.forEach(text => {
        text.setAttribute('font-size', 9 / newZoom);
    });
    
    // Actualizar etiquetas (PERO PRESERVAR POSICIONES MANUALES)
    const labels = svg.querySelectorAll('.scalable-label');
    labels.forEach(label => {
        label.setAttribute('font-size', 8 / newZoom);
        
        // Solo actualizar Y si NO ha sido movida manualmente
        if (!label.dataset.manuallyMoved) {
            label.setAttribute('y', 16 / newZoom);
        }
    });
    
    // Actualizar badges de nivel (círculos)
    const levelBadges = svg.querySelectorAll('.scalable-level-badge');
    levelBadges.forEach(badge => {
        badge.setAttribute('r', 6 / newZoom);
        badge.setAttribute('stroke-width', 2 / newZoom);
    });
    
    // Actualizar textos de badges de nivel
    const levelTexts = svg.querySelectorAll('.scalable-level-text');
    levelTexts.forEach(text => {
        text.setAttribute('font-size', 8 / newZoom);
    });
}

// Exportar la función
window.updateSymbolsForZoom = updateSymbolsForZoom;

// Exportar funciones
window.placeSymbolWithLevel = placeSymbolWithLevel;
window.handleCanvasMouseMove = handleCanvasMouseMove;
window.handleCanvasDoubleClick = handleCanvasDoubleClick;