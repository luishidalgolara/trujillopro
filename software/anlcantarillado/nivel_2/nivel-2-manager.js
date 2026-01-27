// Gestor de elementos por nivel
const ELEMENTOS_NIVEL_2 = [];
let elementCounterNivel2 = 0;

const ARTEFACTOS_SANITARIOS = [
    'wc', 'lavatorio', 'bano-tina', 'ducha', 'bidet', 'urinario',
    'lavaplatos', 'lavacopas', 'lavadora', 'lavadero'
];

function addTracingElementNivel2(type, x, y) {
    const currentPlan = plans[currentPlanIndex];
    elementCounterNivel2++;
    
    let elementData;
    
    // MANEJO ESPECIAL PARA PUNTO-DESCARGA NIVEL 2
    if (type === 'punto-descarga') {
        elementData = {
            id: `nivel2-${elementCounterNivel2}`,
            type: 'punto-descarga-nivel-2',
            typeBase: 'punto-descarga',
            nivel: 2,
            x: x,
            y: y,
            symbol: '💧',
            categoria: 'infraestructura',
            color: '#2563eb',
            label: 'PUNTO DESCARGA/NIVEL 2\nD=110mm'
        };
    } else if (NORMATIVA_DESCARGAS[type]) {
        elementData = {
            id: `nivel2-${elementCounterNivel2}`,
            type: type,
            x: x,
            y: y,
            symbol: NORMATIVA_DESCARGAS[type].symbol,
            categoria: 'sanitario',
            tuberia_diametro: NORMATIVA_DESCARGAS[type].tuberia_diametro,
            color: NORMATIVA_DESCARGAS[type].color,
            nivel: 2
        };
        
        if (typeof actualizarConteoArtefactosNivel2 === 'function') {
            actualizarConteoArtefactosNivel2(type, 'agregar');
        }
    }
    
    ELEMENTOS_NIVEL_2.push(elementData);
    createTracingSVGElementNivel2(elementData);
    
    // ⭐ CREAR ETIQUETA AUTOMÁTICA PARA ARTEFACTOS SANITARIOS NIVEL 2
    if (elementData.categoria === 'sanitario') {
        const labelText = generarTextoEtiquetaArtefactoNivel2(type);
        createArtefactoLabelNivel2(elementData, labelText);
    }
    
    // CREAR ETIQUETA PARA PUNTO DESCARGA NIVEL 2
    if (type === 'punto-descarga' && elementData.label) {
        createElementLabelNivel2(elementData);
    }
    
    showStatus(`✅ ${type.toUpperCase()} - 2° NIVEL agregado`);
}

// ⭐ NUEVA FUNCIÓN: GENERAR TEXTO DE ETIQUETA NIVEL 2
function generarTextoEtiquetaArtefactoNivel2(type) {
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

// ⭐ NUEVA FUNCIÓN: CREAR ETIQUETA DE ARTEFACTO NIVEL 2
function createArtefactoLabelNivel2(element, labelText) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const labelX = element.x + 20;
    const labelY = element.y - 20;
    
    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelGroup.setAttribute('class', 'artefacto-label-group nivel-2');
    labelGroup.setAttribute('data-element-id', element.id);
    labelGroup.setAttribute('data-nivel', '2');
    
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
    bg.setAttribute('stroke', '#2563eb');
    bg.setAttribute('stroke-width', '1.5');
    bg.setAttribute('rx', '3');
    
    movableGroup.appendChild(bg);
    
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', 0);
    textElement.setAttribute('y', 3);
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('font-size', '8');
    textElement.setAttribute('font-weight', 'bold');
    textElement.setAttribute('fill', '#2563eb');
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
    
    setupArtefactoLabelDragNivel2(movableGroup, element.x, element.y);
    
    tracingSvg.appendChild(labelGroup);
}

function setupArtefactoLabelDragNivel2(movableGroup, fixedX, fixedY) {
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

function createTracingSVGElementNivel2(element) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', `tracing-element-${element.id}`);
    g.setAttribute('class', `element-${element.typeBase || element.type} nivel-2`);
    g.setAttribute('data-nivel', '2');
    g.style.cursor = 'pointer';
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', element.x);
    circle.setAttribute('cy', element.y);
    
    const radius = element.categoria === 'infraestructura' ? BASE_CIRCLE_RADIUS.infraestructura : BASE_CIRCLE_RADIUS.sanitario;
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', element.color);
    circle.setAttribute('stroke', '#2563eb');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('stroke-dasharray', '4,2');
    circle.setAttribute('class', 'connection-point');
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', element.x);
    text.setAttribute('y', element.y + 3);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', radius > 10 ? BASE_FONT_SIZE.elementLarge : BASE_FONT_SIZE.element);
    text.setAttribute('fill', '#f9fafb');
    text.setAttribute('font-weight', 'bold');
    text.textContent = element.symbol;
    text.style.pointerEvents = 'none';
    
    const badge = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    badge.setAttribute('x', element.x + 15);
    badge.setAttribute('y', element.y - 15);
    badge.setAttribute('font-size', '10');
    badge.setAttribute('fill', '#2563eb');
    badge.setAttribute('font-weight', 'bold');
    badge.textContent = '2°';
    badge.style.pointerEvents = 'none';
    
    g.appendChild(circle);
    g.appendChild(text);
    g.appendChild(badge);
    
    tracingSvg.appendChild(g);
    
    setupElementDragNivel2(g);
}

function createElementLabelNivel2(element) {
    const tracingSvg = document.getElementById('tracingSvg');
    
    const labelX = element.x + 20;
    const labelY = element.y - 20;
    
    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelGroup.setAttribute('class', 'element-label-group nivel-2');
    labelGroup.setAttribute('data-element-id', element.id);
    labelGroup.setAttribute('data-nivel', '2');
    
    const guideLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    guideLine.setAttribute('x1', element.x);
    guideLine.setAttribute('y1', element.y);
    guideLine.setAttribute('x2', labelX);
    guideLine.setAttribute('y2', labelY);
    guideLine.setAttribute('stroke', '#2563eb');
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
    bg.setAttribute('stroke', '#2563eb');
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
    
    setupElementLabelDragNivel2(movableGroup, guideLine, element.x, element.y);
    
    tracingSvg.appendChild(labelGroup);
}

function setupElementLabelDragNivel2(movableGroup, guideLine, fixedX, fixedY) {
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

function obtenerElementosNivel2() {
    return ELEMENTOS_NIVEL_2;
}

function limpiarElementosNivel2() {
    const tracingSvg = document.getElementById('tracingSvg');
    const elementos = tracingSvg.querySelectorAll('.nivel-2');
    elementos.forEach(el => el.remove());
    
    ELEMENTOS_NIVEL_2.length = 0;
    elementCounterNivel2 = 0;
    
    if (typeof reiniciarConteoNivel2 === 'function') {
        reiniciarConteoNivel2();
    }
}

window.ELEMENTOS_NIVEL_2 = ELEMENTOS_NIVEL_2;
window.addTracingElementNivel2 = addTracingElementNivel2;
window.obtenerElementosNivel2 = obtenerElementosNivel2;
window.limpiarElementosNivel2 = limpiarElementosNivel2;

console.log('✅ nivel-2-manager.js cargado con etiquetas automáticas para artefactos');