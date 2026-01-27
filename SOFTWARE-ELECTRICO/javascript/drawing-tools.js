// ========================================
// HERRAMIENTAS DE DIBUJO GEOMÉTRICO
// ========================================

/**
 * Iniciar dibujo de forma geométrica
 */
function startDrawing(x, y) {
    const tool = AppState.currentTool;
    
    if (tool === 'polilinea') {
        // Para polilínea, NO activar drawingInProgress
        // Agregar punto
        AppState.polylinePoints.push({x, y});
        
        console.log('📍 Punto agregado a polilínea:', {x, y}, 'Total:', AppState.polylinePoints.length);
        
        if (AppState.polylinePoints.length === 1) {
            // Primer punto - crear preview con un solo punto
            createPolylinePreview();
            updateStatus(`📐 Polilínea iniciada - Click para agregar puntos, Click Derecho o Doble Click para finalizar`);
        } else {
            // Puntos subsiguientes - actualizar preview
            updatePolylinePreview();
            updateStatus(`📐 Polilínea: ${AppState.polylinePoints.length} puntos - Click Derecho o Doble Click para finalizar`);
        }
    } else {
        // Para otras herramientas, activar drawingInProgress
        AppState.drawingInProgress = true;
        AppState.drawingStartX = x;
        AppState.drawingStartY = y;
        
        // Crear preview temporal
        createDrawingPreview(tool, x, y);
    }
}

/**
 * Actualizar preview mientras se dibuja
 */
function updateDrawing(x, y) {
    if (!AppState.drawingInProgress || !AppState.tempDrawingElement) return;
    
    const tool = AppState.currentTool;
    
    switch(tool) {
        case 'linea':
            updateLinePreview(x, y);
            break;
        case 'circulo':
            updateCirclePreview(x, y);
            break;
        case 'rectangulo':
            updateRectanglePreview(x, y);
            break;
        case 'cuadrado':
            updateSquarePreview(x, y);
            break;
    }
}

/**
 * Finalizar dibujo
 */
function finishDrawing(x, y) {
    if (!AppState.drawingInProgress) return;
    
    const tool = AppState.currentTool;
    
    if (tool === 'polilinea') {
        // No finalizar en click simple, solo en doble click
        return;
    }
    
    // Remover preview temporal
    if (AppState.tempDrawingElement) {
        AppState.tempDrawingElement.remove();
        AppState.tempDrawingElement = null;
    }
    
    // Crear elemento permanente
    createPermanentDrawing(tool, AppState.drawingStartX, AppState.drawingStartY, x, y);
    
    AppState.drawingInProgress = false;
}

/**
 * Finalizar polilínea (doble click)
 */
function finishPolyline() {
    if (AppState.polylinePoints.length < 2) {
        AppState.polylinePoints = [];
        if (AppState.tempDrawingElement) {
            AppState.tempDrawingElement.remove();
            AppState.tempDrawingElement = null;
        }
        return;
    }
    
    // Remover preview
    if (AppState.tempDrawingElement) {
        AppState.tempDrawingElement.remove();
        AppState.tempDrawingElement = null;
    }
    
    // Crear polilínea permanente
    createPermanentPolyline(AppState.polylinePoints);
    
    // Resetear (NO tocar drawingInProgress, polilínea no lo usa)
    AppState.polylinePoints = [];
}

/**
 * Crear preview temporal de línea
 */
function createDrawingPreview(tool, x, y) {
    const svg = document.getElementById('plano');
    
    switch(tool) {
        case 'linea':
            AppState.tempDrawingElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            AppState.tempDrawingElement.setAttribute('x1', x);
            AppState.tempDrawingElement.setAttribute('y1', y);
            AppState.tempDrawingElement.setAttribute('x2', x);
            AppState.tempDrawingElement.setAttribute('y2', y);
            break;
            
        case 'circulo':
            AppState.tempDrawingElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            AppState.tempDrawingElement.setAttribute('cx', x);
            AppState.tempDrawingElement.setAttribute('cy', y);
            AppState.tempDrawingElement.setAttribute('r', 0);
            break;
            
        case 'rectangulo':
        case 'cuadrado':
            AppState.tempDrawingElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            AppState.tempDrawingElement.setAttribute('x', x);
            AppState.tempDrawingElement.setAttribute('y', y);
            AppState.tempDrawingElement.setAttribute('width', 0);
            AppState.tempDrawingElement.setAttribute('height', 0);
            break;
    }
    
    if (AppState.tempDrawingElement) {
        AppState.tempDrawingElement.setAttribute('stroke', AppState.currentColor || '#000000');
        AppState.tempDrawingElement.setAttribute('stroke-width', AppState.strokeWidth || 2);
        AppState.tempDrawingElement.setAttribute('fill', 'none');
        AppState.tempDrawingElement.setAttribute('opacity', '0.7');
        AppState.tempDrawingElement.classList.add('drawing-preview');
        svg.appendChild(AppState.tempDrawingElement);
    }
}

/**
 * Actualizar preview de línea
 */
function updateLinePreview(x, y) {
    if (!AppState.tempDrawingElement) return;
    AppState.tempDrawingElement.setAttribute('x2', x);
    AppState.tempDrawingElement.setAttribute('y2', y);
}

/**
 * Actualizar preview de círculo
 */
function updateCirclePreview(x, y) {
    if (!AppState.tempDrawingElement) return;
    const radius = Math.sqrt(
        Math.pow(x - AppState.drawingStartX, 2) + 
        Math.pow(y - AppState.drawingStartY, 2)
    );
    AppState.tempDrawingElement.setAttribute('r', radius);
}

/**
 * Actualizar preview de rectángulo
 */
function updateRectanglePreview(x, y) {
    if (!AppState.tempDrawingElement) return;
    const width = x - AppState.drawingStartX;
    const height = y - AppState.drawingStartY;
    
    if (width < 0) {
        AppState.tempDrawingElement.setAttribute('x', x);
        AppState.tempDrawingElement.setAttribute('width', Math.abs(width));
    } else {
        AppState.tempDrawingElement.setAttribute('width', width);
    }
    
    if (height < 0) {
        AppState.tempDrawingElement.setAttribute('y', y);
        AppState.tempDrawingElement.setAttribute('height', Math.abs(height));
    } else {
        AppState.tempDrawingElement.setAttribute('height', height);
    }
}

/**
 * Actualizar preview de cuadrado
 */
function updateSquarePreview(x, y) {
    if (!AppState.tempDrawingElement) return;
    const side = Math.max(
        Math.abs(x - AppState.drawingStartX),
        Math.abs(y - AppState.drawingStartY)
    );
    
    const newX = x > AppState.drawingStartX ? AppState.drawingStartX : AppState.drawingStartX - side;
    const newY = y > AppState.drawingStartY ? AppState.drawingStartY : AppState.drawingStartY - side;
    
    AppState.tempDrawingElement.setAttribute('x', newX);
    AppState.tempDrawingElement.setAttribute('y', newY);
    AppState.tempDrawingElement.setAttribute('width', side);
    AppState.tempDrawingElement.setAttribute('height', side);
}

/**
 * Crear preview de polilínea
 */
function createPolylinePreview() {
    const svg = document.getElementById('plano');
    AppState.tempDrawingElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    AppState.tempDrawingElement.setAttribute('stroke', AppState.currentColor || '#000000');
    AppState.tempDrawingElement.setAttribute('stroke-width', AppState.strokeWidth || 2);
    AppState.tempDrawingElement.setAttribute('fill', 'none');
    AppState.tempDrawingElement.setAttribute('opacity', '0.7');
    AppState.tempDrawingElement.classList.add('drawing-preview');
    
    const points = AppState.polylinePoints.map(p => `${p.x},${p.y}`).join(' ');
    AppState.tempDrawingElement.setAttribute('points', points);
    
    svg.appendChild(AppState.tempDrawingElement);
    
    console.log('🎨 Preview polilínea creado con', AppState.polylinePoints.length, 'punto(s)');
}

/**
 * Actualizar preview de polilínea
 */
function updatePolylinePreview(x, y) {
    if (!AppState.tempDrawingElement) {
        createPolylinePreview();
        return;
    }
    const points = AppState.polylinePoints.map(p => `${p.x},${p.y}`).join(' ');
    AppState.tempDrawingElement.setAttribute('points', points);
    
    console.log('🎨 Preview polilínea actualizado con', AppState.polylinePoints.length, 'punto(s)');
}

/**
 * Crear elemento permanente
 */
function createPermanentDrawing(tool, x1, y1, x2, y2) {
    const svg = document.getElementById('plano');
    let element;
    
    switch(tool) {
        case 'linea':
            element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            element.setAttribute('x1', x1);
            element.setAttribute('y1', y1);
            element.setAttribute('x2', x2);
            element.setAttribute('y2', y2);
            break;
            
        case 'circulo':
            const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            element.setAttribute('cx', x1);
            element.setAttribute('cy', y1);
            element.setAttribute('r', radius);
            break;
            
        case 'rectangulo':
            element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            const width = x2 - x1;
            const height = y2 - y1;
            element.setAttribute('x', width < 0 ? x2 : x1);
            element.setAttribute('y', height < 0 ? y2 : y1);
            element.setAttribute('width', Math.abs(width));
            element.setAttribute('height', Math.abs(height));
            break;
            
        case 'cuadrado':
            element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            const side = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
            const sqX = x2 > x1 ? x1 : x1 - side;
            const sqY = y2 > y1 ? y1 : y1 - side;
            element.setAttribute('x', sqX);
            element.setAttribute('y', sqY);
            element.setAttribute('width', side);
            element.setAttribute('height', side);
            break;
    }
    
    if (element) {
        element.setAttribute('stroke', AppState.currentColor || '#000000');
        element.setAttribute('stroke-width', AppState.strokeWidth || 2);
        element.setAttribute('fill', 'none');
        element.classList.add('drawing-shape');
        element.classList.add('geometric-drawing');
        element.setAttribute('data-drawing-type', tool);
        
        // Hacer la forma seleccionable y arrastrable
        element.style.cursor = 'move';
        element.addEventListener('mousedown', function(e) {
            if (e.button === 0 && !AppState.isPanning) {
                e.stopPropagation();
                selectDrawingElement(element);
                startDragDrawing(e, element);
            }
        });
        
        svg.appendChild(element);
        
        // Guardar en el estado
        AppState.elements.push({
            type: 'drawing-' + tool,
            element: element,
            color: AppState.currentColor || '#000000',
            strokeWidth: AppState.strokeWidth || 2
        });
        
        updateStatus(`${tool} dibujada con color ${AppState.currentColor}`);
        console.log('✏️ Forma geométrica creada:', tool);
    }
}

/**
 * Crear polilínea permanente
 */
function createPermanentPolyline(points) {
    const svg = document.getElementById('plano');
    
    // Crear grupo para la polilínea (línea + puntos)
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.classList.add('polyline-group');
    group.setAttribute('data-drawing-type', 'polilinea');
    
    // Crear la línea
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    const pointsStr = points.map(p => `${p.x},${p.y}`).join(' ');
    element.setAttribute('points', pointsStr);
    element.setAttribute('stroke', AppState.currentColor || '#000000');
    element.setAttribute('stroke-width', AppState.strokeWidth || 2);
    element.setAttribute('fill', 'none');
    element.classList.add('drawing-shape');
    element.classList.add('geometric-drawing');
    
    group.appendChild(element);
    
    // Agregar círculos en cada punto para visualización
    points.forEach((point, index) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', (AppState.strokeWidth || 2) + 2);
        circle.setAttribute('fill', AppState.currentColor || '#000000');
        circle.setAttribute('opacity', '0.5');
        circle.classList.add('polyline-point');
        group.appendChild(circle);
    });
    
    // Hacer el grupo seleccionable y arrastrable
    group.style.cursor = 'move';
    group.addEventListener('mousedown', function(e) {
        if (e.button === 0 && !AppState.isPanning) {
            e.stopPropagation();
            selectDrawingElement(group);
            startDragDrawing(e, group);
        }
    });
    
    svg.appendChild(group);
    
    // Guardar en el estado
    AppState.elements.push({
        type: 'drawing-polilinea',
        element: group,
        points: points,
        color: AppState.currentColor || '#000000',
        strokeWidth: AppState.strokeWidth || 2
    });
    
    updateStatus(`✅ Polilínea creada con ${points.length} puntos`);
    console.log('✏️ Polilínea permanente creada con', points.length, 'puntos');
}

/**
 * Seleccionar elemento de dibujo
 */
function selectDrawingElement(element) {
    // Deseleccionar anterior
    if (AppState.selectedDrawingElement) {
        // Si es grupo, restaurar el hijo polyline
        if (AppState.selectedDrawingElement.classList.contains('polyline-group')) {
            const polyline = AppState.selectedDrawingElement.querySelector('polyline');
            if (polyline) {
                polyline.setAttribute('stroke-width', 
                    AppState.selectedDrawingElement.dataset.originalWidth || AppState.strokeWidth || 2);
            }
        } else {
            AppState.selectedDrawingElement.setAttribute('stroke-width', 
                AppState.selectedDrawingElement.dataset.originalWidth || AppState.strokeWidth || 2);
        }
        AppState.selectedDrawingElement.style.filter = '';
    }
    
    // Seleccionar nuevo
    AppState.selectedDrawingElement = element;
    if (element) {
        // Si es grupo (polilínea), resaltar la línea principal
        if (element.classList.contains('polyline-group')) {
            const polyline = element.querySelector('polyline');
            if (polyline) {
                element.dataset.originalWidth = polyline.getAttribute('stroke-width');
                const newWidth = parseFloat(polyline.getAttribute('stroke-width')) + 2;
                polyline.setAttribute('stroke-width', newWidth);
            }
        } else {
            element.dataset.originalWidth = element.getAttribute('stroke-width');
            const newWidth = parseFloat(element.getAttribute('stroke-width')) + 2;
            element.setAttribute('stroke-width', newWidth);
        }
        
        element.style.filter = 'drop-shadow(0 0 8px rgba(52, 152, 219, 1))';
        
        updateStatus('🎯 Forma seleccionada - Presiona DELETE para eliminar');
        console.log('🎯 Forma geométrica seleccionada');
    }
}

/**
 * Eliminar elemento de dibujo seleccionado
 */
function deleteSelectedDrawing() {
    if (!AppState.selectedDrawingElement) {
        updateStatus('⚠️ No hay ninguna forma seleccionada');
        return;
    }
    
    // Eliminar del DOM
    AppState.selectedDrawingElement.remove();
    
    // Eliminar del estado
    const index = AppState.elements.findIndex(el => el.element === AppState.selectedDrawingElement);
    if (index !== -1) {
        AppState.elements.splice(index, 1);
    }
    
    updateStatus('🗑️ Forma eliminada');
    console.log('🗑️ Forma geométrica eliminada');
    AppState.selectedDrawingElement = null;
}

/**
 * Arrastre de formas geométricas
 */
let dragDrawingElement = null;
let dragDrawingOffsetX = 0;
let dragDrawingOffsetY = 0;

function startDragDrawing(e, element) {
    dragDrawingElement = element;
    const svg = document.getElementById('plano');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    dragDrawingOffsetX = svgP.x;
    dragDrawingOffsetY = svgP.y;
    
    document.addEventListener('mousemove', handleDragDrawing);
    document.addEventListener('mouseup', stopDragDrawing);
}

function handleDragDrawing(e) {
    if (!dragDrawingElement) return;
    
    const svg = document.getElementById('plano');
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    const deltaX = svgP.x - dragDrawingOffsetX;
    const deltaY = svgP.y - dragDrawingOffsetY;
    
    // Verificar si es un grupo (polilínea con puntos)
    if (dragDrawingElement.classList.contains('polyline-group')) {
        // Obtener todos los elementos hijos
        const polyline = dragDrawingElement.querySelector('polyline');
        const circles = dragDrawingElement.querySelectorAll('.polyline-point');
        
        if (polyline) {
            // Actualizar puntos de la polilínea
            const points = polyline.getAttribute('points').split(' ');
            const newPoints = points.map(p => {
                const [px, py] = p.split(',').map(Number);
                return `${px + deltaX},${py + deltaY}`;
            }).join(' ');
            polyline.setAttribute('points', newPoints);
        }
        
        // Actualizar círculos
        circles.forEach(circle => {
            const cx = parseFloat(circle.getAttribute('cx'));
            const cy = parseFloat(circle.getAttribute('cy'));
            circle.setAttribute('cx', cx + deltaX);
            circle.setAttribute('cy', cy + deltaY);
        });
    } else {
        // Elementos individuales (línea, círculo, rectángulo)
        const tagName = dragDrawingElement.tagName;
        
        if (tagName === 'line') {
            const x1 = parseFloat(dragDrawingElement.getAttribute('x1'));
            const y1 = parseFloat(dragDrawingElement.getAttribute('y1'));
            const x2 = parseFloat(dragDrawingElement.getAttribute('x2'));
            const y2 = parseFloat(dragDrawingElement.getAttribute('y2'));
            
            dragDrawingElement.setAttribute('x1', x1 + deltaX);
            dragDrawingElement.setAttribute('y1', y1 + deltaY);
            dragDrawingElement.setAttribute('x2', x2 + deltaX);
            dragDrawingElement.setAttribute('y2', y2 + deltaY);
        } else if (tagName === 'circle') {
            const cx = parseFloat(dragDrawingElement.getAttribute('cx'));
            const cy = parseFloat(dragDrawingElement.getAttribute('cy'));
            
            dragDrawingElement.setAttribute('cx', cx + deltaX);
            dragDrawingElement.setAttribute('cy', cy + deltaY);
        } else if (tagName === 'rect') {
            const x = parseFloat(dragDrawingElement.getAttribute('x'));
            const y = parseFloat(dragDrawingElement.getAttribute('y'));
            
            dragDrawingElement.setAttribute('x', x + deltaX);
            dragDrawingElement.setAttribute('y', y + deltaY);
        } else if (tagName === 'polyline') {
            const points = dragDrawingElement.getAttribute('points').split(' ');
            const newPoints = points.map(p => {
                const [px, py] = p.split(',').map(Number);
                return `${px + deltaX},${py + deltaY}`;
            }).join(' ');
            dragDrawingElement.setAttribute('points', newPoints);
        }
    }
    
    dragDrawingOffsetX = svgP.x;
    dragDrawingOffsetY = svgP.y;
}

function stopDragDrawing() {
    dragDrawingElement = null;
    document.removeEventListener('mousemove', handleDragDrawing);
    document.removeEventListener('mouseup', stopDragDrawing);
}

/**
 * Verificar si la herramienta actual es de dibujo
 */
function isDrawingTool(tool) {
    return ['linea', 'polilinea', 'circulo', 'rectangulo', 'cuadrado'].includes(tool);
}

// Exportar funciones
window.startDrawing = startDrawing;
window.updateDrawing = updateDrawing;
window.finishDrawing = finishDrawing;
window.finishPolyline = finishPolyline;
window.isDrawingTool = isDrawingTool;
window.deleteSelectedDrawing = deleteSelectedDrawing;
window.selectDrawingElement = selectDrawingElement;