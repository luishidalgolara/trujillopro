// js/conexion-nivel-2.js
import { svg, isNavigationMode, BASE_CIRCLE_RADIUS } from './config.js';
import { showStatus } from './utils.js';
import { updateElementSizes } from './zoom-pan.js';

export function createConexionNivel2WithLabel(element) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', `element-${element.id}`);
    g.setAttribute('class', 'conexion-nivel-2 nivel-2');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', element.x);
    circle.setAttribute('cy', element.y);
    circle.setAttribute('r', BASE_CIRCLE_RADIUS.fuente);
    circle.setAttribute('fill', element.especificaciones.color);
    circle.setAttribute('stroke', '#e74c3c');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('stroke-dasharray', '4,2');
    circle.setAttribute('class', 'connection-point selectable');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', element.x);
    text.setAttribute('y', element.y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '18');
    text.setAttribute('fill', '#ffffff');
    text.textContent = element.symbol;
    text.style.pointerEvents = 'none';

    const badge = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    badge.setAttribute('x', element.x + 20);
    badge.setAttribute('y', element.y - 20);
    badge.setAttribute('font-size', '10');
    badge.setAttribute('fill', '#e74c3c');
    badge.setAttribute('font-weight', 'bold');
    badge.textContent = '2°';
    badge.style.pointerEvents = 'none';

    g.appendChild(circle);
    g.appendChild(text);
    g.appendChild(badge);
    svg.appendChild(g);

    createConexionNivel2Label(element);
    updateElementSizes();
}

function createConexionNivel2Label(element) {
    const labelX = element.x + 30;
    const labelY = element.y - 30;

    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelGroup.setAttribute('class', 'conexion-label-group nivel-2');
    labelGroup.setAttribute('data-element-id', element.id);

    const guideLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    guideLine.setAttribute('x1', element.x);
    guideLine.setAttribute('y1', element.y);
    guideLine.setAttribute('x2', labelX);
    guideLine.setAttribute('y2', labelY);
    guideLine.setAttribute('stroke', '#2563eb');
    guideLine.setAttribute('stroke-width', '1');
    guideLine.setAttribute('stroke-dasharray', '2,2');

    const movableGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    movableGroup.setAttribute('class', 'movable-label');
    movableGroup.setAttribute('transform', `translate(${labelX}, ${labelY})`);
    movableGroup.style.cursor = 'move';

    const boxWidth = 120;
    const boxHeight = 20;

    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', -boxWidth / 2);
    bg.setAttribute('y', -boxHeight / 2);
    bg.setAttribute('width', boxWidth);
    bg.setAttribute('height', boxHeight);
    bg.setAttribute('fill', 'white');
    bg.setAttribute('stroke', '#2563eb');
    bg.setAttribute('stroke-width', '1');
    bg.setAttribute('rx', '2');

    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', 0);
    textElement.setAttribute('y', 4);
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('font-size', '9');
    textElement.setAttribute('font-weight', 'bold');
    textElement.setAttribute('fill', '#000000');
    textElement.textContent = element.descripcion_conexion || 'CAÑERÍA D=25mm';
    textElement.style.cursor = 'text';

    textElement.addEventListener('dblclick', function (e) {
        e.stopPropagation();
        const currentText = textElement.textContent;
        const newText = prompt('Editar descripción:', currentText);
        if (newText !== null && newText.trim() !== '') {
            textElement.textContent = newText;
            element.descripcion_conexion = newText;
            showStatus('✏️ Descripción actualizada');
        }
    });

    movableGroup.appendChild(bg);
    movableGroup.appendChild(textElement);
    labelGroup.appendChild(guideLine);
    labelGroup.appendChild(movableGroup);

    setupLabelDrag(movableGroup, guideLine, element.x, element.y);

    svg.appendChild(labelGroup);
}

function setupLabelDrag(movableGroup, guideLine, fixedX, fixedY) {
    let isDragging = false;
    let startMouse = { x: 0, y: 0 };
    let startTransform = { x: 0, y: 0 };

    function getCurrentTransform() {
        const transform = movableGroup.getAttribute('transform');
        const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
        if (match) {
            return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
        }
        return { x: 0, y: 0 };
    }

    movableGroup.addEventListener('mousedown', function (e) {
        if (isNavigationMode) return;
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        startMouse.x = e.clientX;
        startMouse.y = e.clientY;
        startTransform = getCurrentTransform();
        document.body.style.userSelect = 'none';
        movableGroup.style.opacity = '0.7';
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        e.preventDefault();
        const deltaX = e.clientX - startMouse.x;
        const deltaY = e.clientY - startMouse.y;
        const newX = startTransform.x + deltaX;
        const newY = startTransform.y + deltaY;
        movableGroup.setAttribute('transform', `translate(${newX}, ${newY})`);
        guideLine.setAttribute('x2', newX);
        guideLine.setAttribute('y2', newY);
    });

    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = '';
            movableGroup.style.opacity = '1';
        }
    });
}