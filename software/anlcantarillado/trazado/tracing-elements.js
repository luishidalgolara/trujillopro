// ============================================================
// TRAZADO - GESTIÓN DE ELEMENTOS
// Maneja la creación y renderizado de elementos sanitarios
// ============================================================

function addTracingElement(type, x, y) {
    const currentPlan = plans[currentPlanIndex];
    elementCounter++;
    
    let elementData;
    
    // MANEJO ESPECIAL PARA PUNTO-DESCARGA CON NIVEL
    if (type === 'punto-descarga') {
        const nivel = currentPlan.nivelSeleccionado || 1;
        elementData = {
            id: elementCounter,
            type: `punto-descarga-nivel-${nivel}`,
            typeBase: 'punto-descarga',
            nivel: nivel,
            x: x,
            y: y,
            symbol: '💧',
            categoria: 'infraestructura',
            color: nivel === 1 ? '#e74c3c' : '#2563eb',
            label: `PUNTO DESCARGA/NIVEL ${nivel}\nD=110mm`
        };
    } else if (NORMATIVA_DESCARGAS[type]) {
        elementData = {
            id: elementCounter,
            type: type,
            x: x,
            y: y,
            symbol: NORMATIVA_DESCARGAS[type].symbol,
            categoria: 'sanitario',
            tuberia_diametro: NORMATIVA_DESCARGAS[type].tuberia_diametro,
            color: NORMATIVA_DESCARGAS[type].color,
            nivel: currentPlan.nivelSeleccionado || 1
        };
        
        // 🆕 CONTEO AUTOMÁTICO DE ARTEFACTOS
        if (typeof actualizarConteoArtefactos === 'function') {
            actualizarConteoArtefactos(type, 'agregar');
        }
    } else if (INFRAESTRUCTURA_SYMBOLS[type]) {
        elementData = {
            id: elementCounter,
            type: type,
            x: x,
            y: y,
            symbol: INFRAESTRUCTURA_SYMBOLS[type].symbol,
            categoria: 'infraestructura',
            color: INFRAESTRUCTURA_SYMBOLS[type].color
        };
        
        if (type === 'camara-inspeccion') {
            camaraCounter++;
            elementData.numeroCamera = camaraCounter;
            elementData.etiqueta = `C.I DOM N°${camaraCounter}`;
        } else if (type === 'camara-publica') {
            elementData.etiqueta = 'CAMARA PUBLICA';
        }
    }
    
    currentPlan.tracingElements.push(elementData);
    createTracingSVGElement(elementData);
    
    if (type === 'camara-inspeccion' || type === 'camara-publica') {
        createCameraInfoContainer(elementData);
    }
    
    // ⭐ CREAR ETIQUETA AUTOMÁTICA PARA ARTEFACTOS SANITARIOS
    if (elementData.categoria === 'sanitario') {
        const labelText = generarTextoEtiquetaArtefacto(type);
        createArtefactoLabel(elementData, labelText);
    }
    
    // CREAR ETIQUETA PARA PUNTO DESCARGA
    if (type === 'punto-descarga' && elementData.label) {
        createElementLabel(elementData);
    }
    
    showStatus(`✅ ${type.toUpperCase()} agregado en (${Math.round(x)}px, ${Math.round(y)}px)`);
}

// ⭐ NUEVA FUNCIÓN: GENERAR TEXTO DE ETIQUETA
function generarTextoEtiquetaArtefacto(type) {
    const etiquetas = {
        'wc': 'WC',
        'lavatorio': 'LAVATORIO',
        'bano-tina': 'TINA',
        'ducha': 'DUCHA',
        'bidet': 'BIDET',
        'urinario': 'URINARIO',
        'lavaplatos': 'LAVAPLATOS',
        'lavacopas': 'LAVACOPAS',
        'lavadora': 'LAVADORA',
        'lavadero': 'LAVADERO'
    };
    return etiquetas[type] || type.toUpperCase();
}

// ⭐ NUEVA FUNCIÓN: CREAR ETIQUETA DE ARTEFACTO
function createArtefactoLabel(element, labelText) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const labelX = element.x + 20;
    const labelY = element.y - 20;
    
    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelGroup.setAttribute('class', 'artefacto-label-group');
    labelGroup.setAttribute('data-element-id', element.id);
    
    const movableGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    movableGroup.setAttribute('class', 'movable-label');
    movableGroup.setAttribute('transform', `translate(${labelX}, ${labelY})`);
    movableGroup.style.cursor = 'move';
    
    const textWidth = labelText.length * 4.5;
    const boxWidth = textWidth + 8;
    const boxHeight = 16;
    
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', -boxWidth/2);
    bg.setAttribute('y', -boxHeight/2);
    bg.setAttribute('width', boxWidth);
    bg.setAttribute('height', boxHeight);
    bg.setAttribute('fill', 'white');
    bg.setAttribute('stroke', '#000000');
    bg.setAttribute('stroke-width', '1.5');
    bg.setAttribute('rx', '3');
    
    movableGroup.appendChild(bg);
    
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', 0);
    textElement.setAttribute('y', 3);
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('font-size', '8');
    textElement.setAttribute('font-weight', 'bold');
    textElement.setAttribute('fill', '#000000');
    textElement.textContent = labelText;
    textElement.style.cursor = 'text';
    
    // DOBLE CLIC PARA EDITAR
    textElement.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        const currentText = textElement.textContent;
        const newText = prompt('Editar texto:', currentText);
        if (newText !== null && newText.trim() !== '') {
            textElement.textContent = newText;
            
            const newWidth = newText.length * 4.5;
            const newBoxWidth = newWidth + 8;
            bg.setAttribute('x', -newBoxWidth/2);
            bg.setAttribute('width', newBoxWidth);
            
            showStatus('✏️ Texto actualizado');
        }
    });
    
    movableGroup.appendChild(textElement);
    
    labelGroup.appendChild(movableGroup);
    
    setupArtefactoLabelDrag(movableGroup, element.x, element.y);
    
    tracingSvg.appendChild(labelGroup);
}

function setupArtefactoLabelDrag(movableGroup, fixedX, fixedY) {
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

    movableGroup.addEventListener('mousedown', function(e) {
        if (isNavigationMode) return;
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        const coords = getRelativeCoords(e);
        startMouse.x = coords.x;
        startMouse.y = coords.y;
        startTransform = getCurrentTransform();
        document.body.style.userSelect = 'none';
        movableGroup.style.opacity = '0.7';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const coords = getRelativeCoords(e);
        const deltaX = coords.x - startMouse.x;
        const deltaY = coords.y - startMouse.y;
        const newX = startTransform.x + deltaX;
        const newY = startTransform.y + deltaY;
        movableGroup.setAttribute('transform', `translate(${newX}, ${newY})`);
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
            movableGroup.style.opacity = '1';
        }
    });
}

function createTracingSVGElement(element) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', `tracing-element-${element.id}`);
    g.setAttribute('class', `element-${element.typeBase || element.type}`);
    g.style.cursor = 'pointer';
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', element.x);
    circle.setAttribute('cy', element.y);
    
    const radius = element.categoria === 'infraestructura' ? BASE_CIRCLE_RADIUS.infraestructura : BASE_CIRCLE_RADIUS.sanitario;
    circle.setAttribute('r', radius);
    
    if (element.type === 'camara-inspeccion' || element.type === 'camara-publica') {
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#000000');
        circle.setAttribute('stroke-width', '2');
    } else {
        circle.setAttribute('fill', element.color);
        circle.setAttribute('stroke', '#f9fafb');
        circle.setAttribute('stroke-width', BASE_STROKE_WIDTH.element);
    }
    circle.setAttribute('class', 'connection-point');
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', element.x);
    text.setAttribute('y', element.y + 3);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', radius > 10 ? BASE_FONT_SIZE.elementLarge : BASE_FONT_SIZE.element);
    
    if (element.type === 'camara-inspeccion' || element.type === 'camara-publica') {
        text.setAttribute('fill', '#000000');
        text.setAttribute('font-weight', 'bold');
    } else {
        text.setAttribute('fill', '#f9fafb');
        text.setAttribute('font-weight', 'bold');
    }
    
    text.textContent = element.symbol;
    text.style.pointerEvents = 'none';
    
    g.appendChild(circle);
    g.appendChild(text);
    
    tracingSvg.appendChild(g);
    updateTracingElementSizes();
}

function createElementLabel(element) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const labelX = element.x + 20;
    const labelY = element.y - 20;
    
    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelGroup.setAttribute('class', 'element-label-group');
    labelGroup.setAttribute('data-element-id', element.id);
    
    const guideLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    guideLine.setAttribute('x1', element.x);
    guideLine.setAttribute('y1', element.y);
    guideLine.setAttribute('x2', labelX);
    guideLine.setAttribute('y2', labelY);
    guideLine.setAttribute('stroke', '#000000');
    guideLine.setAttribute('stroke-width', '1');
    guideLine.setAttribute('stroke-dasharray', '2,2');
    guideLine.setAttribute('class', 'guide-line');
    
    const movableGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    movableGroup.setAttribute('class', 'movable-label');
    movableGroup.setAttribute('transform', `translate(${labelX}, ${labelY})`);
    movableGroup.style.cursor = 'move';
    
    const lines = element.label.split('\n');
    const lineHeight = 8;
    const padding = 3;
    const boxHeight = (lines.length * lineHeight) + (padding * 2);
    const boxWidth = 110;
    
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', -boxWidth/2);
    bg.setAttribute('y', -boxHeight/2);
    bg.setAttribute('width', boxWidth);
    bg.setAttribute('height', boxHeight);
    bg.setAttribute('fill', 'white');
    bg.setAttribute('stroke', '#000000');
    bg.setAttribute('stroke-width', '0.8');
    bg.setAttribute('rx', '2');
    
    movableGroup.appendChild(bg);
    
    lines.forEach((line, index) => {
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', 0);
        textElement.setAttribute('y', -boxHeight/2 + padding + (index + 1) * lineHeight - 2);
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('font-size', '7');
        textElement.setAttribute('font-weight', 'normal');
        textElement.setAttribute('fill', '#000000');
        textElement.textContent = line;
        textElement.style.cursor = 'text';
        
        // DOBLE CLIC PARA EDITAR
        textElement.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const currentText = textElement.textContent;
            const newText = prompt('Editar texto:', currentText);
            if (newText !== null && newText.trim() !== '') {
                textElement.textContent = newText;
                showStatus('✏️ Texto actualizado');
            }
        });
        
        movableGroup.appendChild(textElement);
    });
    
    labelGroup.appendChild(guideLine);
    labelGroup.appendChild(movableGroup);
    
    setupElementLabelDrag(movableGroup, guideLine, element.x, element.y);
    
    tracingSvg.appendChild(labelGroup);
}

function setupElementLabelDrag(movableGroup, guideLine, fixedX, fixedY) {
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

    movableGroup.addEventListener('mousedown', function(e) {
        if (isNavigationMode) return;
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        const coords = getRelativeCoords(e);
        startMouse.x = coords.x;
        startMouse.y = coords.y;
        startTransform = getCurrentTransform();
        document.body.style.userSelect = 'none';
        movableGroup.style.opacity = '0.7';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const coords = getRelativeCoords(e);
        const deltaX = coords.x - startMouse.x;
        const deltaY = coords.y - startMouse.y;
        const newX = startTransform.x + deltaX;
        const newY = startTransform.y + deltaY;
        movableGroup.setAttribute('transform', `translate(${newX}, ${newY})`);
        guideLine.setAttribute('x2', newX);
        guideLine.setAttribute('y2', newY);
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
            movableGroup.style.opacity = '1';
        }
    });
}

console.log('✅ Trazado - Elements cargado con etiquetas automáticas para artefactos');