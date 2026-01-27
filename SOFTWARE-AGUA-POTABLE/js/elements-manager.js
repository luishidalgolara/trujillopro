// js/elements-manager.js - CON CONTENEDOR MOVIBLE Y EDITABLE
import { svg, elements, selectedElement, valvulaCounter, BASE_CIRCLE_RADIUS, BASE_FONT_SIZE, currentScale } from './config.js';
import { setSelectedElement, incrementValvulaCounter, removeElement, removeConnections, setValvulaCounter, addElement } from './config.js';
import { ESPECIFICACIONES_AGUA_POTABLE, FUENTES_CALENTAMIENTO, INFRAESTRUCTURA_AGUA } from './database.js';
import { showStatus } from './utils.js';
import { calcularDistancia } from './utils.js';
import { updateCalculations } from './calculations.js';
import { updateElementSizes } from './zoom-pan.js';
import { calculateOptimalDiameter } from './hydraulic-engine.js';
import { createTextWithDivider, createArranqueDomTextDraggable } from '../draggable-texts/index.js';
import { connections, addConnection } from './config.js';
import { getNivelSeleccionado } from './config.js';
import { createConexionNivel2WithLabel } from './conexion-nivel-2.js';

// ✅ VARIABLES PARA ARRASTRAR CONTENEDOR
let selectedLabelContainer = null;
let isDraggingLabel = false;
let labelDragOffset = { x: 0, y: 0 };

export function createSVGElement(element) {
    if (element.type === 'punto-conexion') {
        createMatrizExistenteWithLeader(element);
        return;
    }
    
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', `element-${element.id}`);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', element.x);
    circle.setAttribute('cy', element.y);
    
    let radius = BASE_CIRCLE_RADIUS.consumo;
    if (element.categoria === 'infraestructura') {
        radius = BASE_CIRCLE_RADIUS.infraestructura;
    } else if (element.categoria === 'fuente' || element.categoria === 'medidor') {
        radius = BASE_CIRCLE_RADIUS.fuente;
    }
    circle.setAttribute('r', radius);
    
    const color = element.especificaciones?.color || '#3b82f6';
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke', '#f9fafb');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('class', 'connection-point selectable');

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', element.x);
    text.setAttribute('y', element.y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '16');
    text.setAttribute('fill', '#f9fafb');
    text.textContent = element.symbol;
    text.style.pointerEvents = 'none';

    g.appendChild(circle);
    g.appendChild(text);
    svg.appendChild(g);
    
    if (element.categoria === 'infraestructura' && element.etiqueta) {
        createInfraLabel(element);
    }
    
    // ✅ CREAR CONTENEDOR SI ES MEDIDOR
    if (element.type === 'medidor-agua') {
        createMedidorLabel(element);
    }
    
    updateElementSizes();
}

// ✅ FUNCIÓN MEJORADA: CONTENEDOR MOVIBLE Y EDITABLE
export function createMedidorLabel(element) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', `medidor-label-${element.id}`);
    g.setAttribute('class', 'medidor-label-container');
    g.setAttribute('data-medidor-id', element.id);
    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', element.x - 50);
    rect.setAttribute('y', element.y - 40);
    rect.setAttribute('width', '100');
    rect.setAttribute('height', '20');
    rect.setAttribute('fill', '#ffffff');
    rect.setAttribute('stroke', '#000000');
    rect.setAttribute('stroke-width', '1');
    rect.setAttribute('rx', '3');
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', element.x);
    text.setAttribute('y', element.y - 26);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '10');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('font-family', 'Arial, sans-serif');
    text.setAttribute('fill', '#000000');
    text.textContent = 'M.A.P D=19mm';
    text.style.pointerEvents = 'none';
    
    g.appendChild(rect);
    g.appendChild(text);
    g.style.cursor = 'move';
    g.classList.add('selectable');
    
    // ✅ EVENTOS PARA ARRASTRAR
    g.addEventListener('mousedown', (e) => handleLabelDragStart(e, g));
    
    // ✅ EVENTO DOBLE CLIC PARA EDITAR
    g.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        editLabelText(g, text);
    });
    
    svg.appendChild(g);
}

// ✅ NUEVA FUNCIÓN: INICIAR ARRASTRE
function handleLabelDragStart(e, container) {
    e.stopPropagation();
    
    if (e.button !== 0) return;
    
    isDraggingLabel = true;
    selectedLabelContainer = container;
    
    const rect = container.querySelector('rect');
    const currentX = parseFloat(rect.getAttribute('x'));
    const currentY = parseFloat(rect.getAttribute('y'));
    
    const ctm = svg.getScreenCTM();
    const svgPoint = svg.createSVGPoint();
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    const transformed = svgPoint.matrixTransform(ctm.inverse());
    
    labelDragOffset.x = transformed.x - currentX;
    labelDragOffset.y = transformed.y - currentY;
    
    selectLabelContainer(container);
    
    document.addEventListener('mousemove', handleLabelDragMove);
    document.addEventListener('mouseup', handleLabelDragEnd);
}

// ✅ NUEVA FUNCIÓN: MOVER CONTENEDOR
function handleLabelDragMove(e) {
    if (!isDraggingLabel || !selectedLabelContainer) return;
    
    e.preventDefault();
    
    const ctm = svg.getScreenCTM();
    const svgPoint = svg.createSVGPoint();
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    const transformed = svgPoint.matrixTransform(ctm.inverse());
    
    const newX = transformed.x - labelDragOffset.x;
    const newY = transformed.y - labelDragOffset.y;
    
    const rect = selectedLabelContainer.querySelector('rect');
    const text = selectedLabelContainer.querySelector('text');
    
    const width = parseFloat(rect.getAttribute('width'));
    const height = parseFloat(rect.getAttribute('height'));
    
    rect.setAttribute('x', newX);
    rect.setAttribute('y', newY);
    
    text.setAttribute('x', newX + width / 2);
    text.setAttribute('y', newY + height / 2 + 4);
}

// ✅ NUEVA FUNCIÓN: TERMINAR ARRASTRE
function handleLabelDragEnd(e) {
    if (isDraggingLabel) {
        isDraggingLabel = false;
        document.removeEventListener('mousemove', handleLabelDragMove);
        document.removeEventListener('mouseup', handleLabelDragEnd);
    }
}

// ✅ NUEVA FUNCIÓN: EDITAR TEXTO
function editLabelText(container, textElement) {
    const currentText = textElement.textContent;
    
    const newText = prompt('Editar texto del contenedor:', currentText);
    
    if (newText !== null && newText.trim() !== '') {
        textElement.textContent = newText.trim();
        
        // Ajustar ancho del rect si el texto es más largo
        const rect = container.querySelector('rect');
        const textLength = newText.trim().length;
        const newWidth = Math.max(100, textLength * 6.5);
        
        const currentX = parseFloat(rect.getAttribute('x'));
        const currentY = parseFloat(rect.getAttribute('y'));
        
        rect.setAttribute('width', newWidth);
        rect.setAttribute('x', currentX);
        
        textElement.setAttribute('x', currentX + newWidth / 2);
        
        showStatus('✏️ Texto editado correctamente');
    }
}

export function selectLabelContainer(container) {
    deselectLabelContainer();
    deselectElement();
    
    selectedLabelContainer = container;
    const rect = container.querySelector('rect');
    if (rect) {
        rect.setAttribute('stroke', '#fbbf24');
        rect.setAttribute('stroke-width', '3');
    }
    showStatus('📦 Contenedor M.A.P seleccionado - Arrastrar para mover | Doble clic para editar | DELETE para eliminar');
}

export function deselectLabelContainer() {
    if (selectedLabelContainer) {
        const rect = selectedLabelContainer.querySelector('rect');
        if (rect) {
            rect.setAttribute('stroke', '#000000');
            rect.setAttribute('stroke-width', '1');
        }
        selectedLabelContainer = null;
    }
}

export function deleteSelectedLabelContainer() {
    if (selectedLabelContainer) {
        selectedLabelContainer.remove();
        selectedLabelContainer = null;
        showStatus('🗑️ Contenedor M.A.P eliminado');
        return true;
    }
    return false;
}

export function getSelectedLabelContainer() {
    return selectedLabelContainer;
}

export function createMatrizExistenteWithLeader(element) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', `element-${element.id}`);
    g.setAttribute('class', 'matriz-existente');
    
    const lineLength = 80;
    const segments = 5;
    const segmentLength = lineLength / segments;
    
    const baseLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    baseLine.setAttribute('x1', element.x - lineLength/2);
    baseLine.setAttribute('y1', element.y);
    baseLine.setAttribute('x2', element.x + lineLength/2);
    baseLine.setAttribute('y2', element.y);
    baseLine.setAttribute('stroke', '#000000');
    baseLine.setAttribute('stroke-width', '3');
    baseLine.setAttribute('class', 'connection-point selectable');
    
    g.appendChild(baseLine);
    
    for (let i = 0; i <= segments; i++) {
        const x = element.x - lineLength/2 + (i * segmentLength);
        const slash = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        slash.setAttribute('x1', x - 3);
        slash.setAttribute('y1', element.y + 6);
        slash.setAttribute('x2', x + 3);
        slash.setAttribute('y2', element.y - 6);
        slash.setAttribute('stroke', '#000000');
        slash.setAttribute('stroke-width', '2');
        slash.setAttribute('class', 'connection-point selectable');
        g.appendChild(slash);
    }
    
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', element.x);
    textElement.setAttribute('y', element.y + 25);
    textElement.setAttribute('text-anchor', 'middle');
    textElement.setAttribute('font-size', '12');
    textElement.setAttribute('font-weight', 'bold');
    textElement.setAttribute('font-family', 'Arial, sans-serif');
    textElement.setAttribute('fill', '#000000');
    textElement.setAttribute('stroke', '#ffffff');
    textElement.setAttribute('stroke-width', '1');
    textElement.setAttribute('paint-order', 'stroke fill');
    textElement.textContent = element.especificaciones.descripcion;
    textElement.style.pointerEvents = 'none';
    
    g.appendChild(textElement);
    
    svg.appendChild(g);
    updateElementSizes();
}

export function createInfraLabel(element) {
    if (!element.etiqueta) return;
    
    const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    labelText.setAttribute('x', element.x);
    labelText.setAttribute('y', element.y - 35);
    labelText.setAttribute('text-anchor', 'middle');
    labelText.setAttribute('font-size', '12');
    labelText.setAttribute('font-weight', 'bold');
    labelText.setAttribute('fill', '#d1d5db');
    labelText.setAttribute('stroke', '#000000');
    labelText.setAttribute('stroke-width', '0.5');
    labelText.setAttribute('class', 'infra-label');
    labelText.setAttribute('data-element-id', element.id);
    labelText.textContent = element.etiqueta;
    labelText.style.pointerEvents = 'none';
    
    svg.appendChild(labelText);
}

export function selectElement(element) {
    if (selectedElement) {
        const prevGroup = svg.querySelector(`#element-${selectedElement.id}`);
        if (prevGroup) {
            const prevCircle = prevGroup.querySelector('circle');
            if (prevCircle) {
                prevCircle.classList.remove('selected');
            }
        }
    }

    deselectLabelContainer();

    setSelectedElement(element);
    const group = svg.querySelector(`#element-${element.id}`);
    if (group) {
        const circle = group.querySelector('circle');
        if (circle) {
            circle.classList.add('selected');
            
            let info = `🎯 ${element.etiqueta || element.type.toUpperCase()} seleccionado`;
            
            if (element.tuberia_diametro_fria) {
                info += ` - Fría: PPR ⌀${element.tuberia_diametro_fria}mm`;
            }
            if (element.tuberia_diametro_caliente) {
                info += ` - Caliente: PPR ⌀${element.tuberia_diametro_caliente}mm`;
            }
            
            info += ' - Click otro elemento para conectar';
            
            showStatus(info);
        }
    }
    
    updateElementList();
}

export function deselectElement() {
    if (selectedElement) {
        const prevGroup = svg.querySelector(`#element-${selectedElement.id}`);
        if (prevGroup) {
            const prevCircle = prevGroup.querySelector('circle');
            if (prevCircle) {
                prevCircle.classList.remove('selected');
            }
        }
    }
    
    deselectLabelContainer();
    
    setSelectedElement(null);
    updateElementList();
    showStatus('Elemento deseleccionado');
}

export function deleteSelectedElement() {
    if (!selectedElement) {
        showStatus('⚠️ Selecciona un elemento primero');
        return;
    }
    
    const elementToDelete = selectedElement;
    
    const group = svg.querySelector(`#element-${elementToDelete.id}`);
    if (group) {
        group.remove();
    }
    
    const label = svg.querySelector(`text.infra-label[data-element-id="${elementToDelete.id}"]`);
    if (label) {
        label.remove();
    }
    
    const medidorLabel = svg.querySelector(`g.medidor-label-container[data-medidor-id="${elementToDelete.id}"]`);
    if (medidorLabel) {
        medidorLabel.remove();
    }

    // ✅ AGREGAR ESTAS 4 LÍNEAS AQUÍ ↓
    const conexionLabel = svg.querySelector(`.conexion-label-group[data-element-id="${elementToDelete.id}"]`);
    if (conexionLabel) {
       conexionLabel.remove();
    }
    
    const linesToRemove = svg.querySelectorAll(`line[data-from="${elementToDelete.id}"], line[data-to="${elementToDelete.id}"]`);
    linesToRemove.forEach(line => line.remove());
    
    const textsToRemove = svg.querySelectorAll(`text[data-connection*="${elementToDelete.id}"]`);
    textsToRemove.forEach(text => text.remove());
    
    const dividersToRemove = svg.querySelectorAll(`line[data-connection-divider*="${elementToDelete.id}"]`);
    dividersToRemove.forEach(divider => divider.remove());
    
    const leadersToRemove = svg.querySelectorAll(`line[data-leader*="${elementToDelete.id}"], polygon[data-leader*="${elementToDelete.id}"]`);
    leadersToRemove.forEach(leader => leader.remove());
    
    const groupsToRemove = svg.querySelectorAll(`g[data-connection-group*="${elementToDelete.id}"]`);
    groupsToRemove.forEach(group => group.remove());
    
    const arrowsToRemove = svg.querySelectorAll(`g.flow-arrow[data-connection*="${elementToDelete.id}"]`);
    arrowsToRemove.forEach(arrow => arrow.remove());
    
    if (elementToDelete.type === 'valvula-corte') {
        renumerarValvulas();
    }
    
    removeElement(elementToDelete.id);
    removeConnections(elementToDelete.id);
    
    if (window.notificarCambioArtefacto) {
        window.notificarCambioArtefacto(elementToDelete.type, 'eliminar');
    }
    
    setSelectedElement(null);
    updateElementList();
    updateCalculations();
    
    showStatus(`🗑️ ${elementToDelete.etiqueta || elementToDelete.type.toUpperCase()} eliminado correctamente`);
}

export function renumerarValvulas() {
    const valvulas = elements.filter(el => el.type === 'valvula-corte');
    setValvulaCounter(0);
    
    valvulas.forEach((valvula, index) => {
        incrementValvulaCounter();
        valvula.etiqueta = `VÁLVULA N°${valvulaCounter}`;
        
        const label = svg.querySelector(`text.infra-label[data-element-id="${valvula.id}"]`);
        if (label) {
            label.textContent = valvula.etiqueta;
        }
    });
}

export function updateElementList() {
    const list = document.getElementById('elementList');
    if (!list) return;
    
    list.innerHTML = '';

    if (elements.length === 0) {
        list.innerHTML = '<p style="color: #9ca3af; font-style: italic;">Haz clic en el plano para agregar elementos</p>';
        return;
    }

    elements.forEach(element => {
        const div = document.createElement('div');
        div.className = 'element-item';
        
        if (selectedElement && selectedElement.id === element.id) {
            div.style.borderColor = '#fbbf24';
            div.style.backgroundColor = '#4b5563';
        }
        
        let tecnico = '';
        if (element.tuberia_diametro_fria) {
            const colorFria = element.tuberia_diametro_fria === 25 ? '#10b981' : '#ef4444';
            tecnico += `<div style="font-size: 11px; color: ${colorFria}; margin-top: 3px;">
                Agua Fría: PPR ⌀${element.tuberia_diametro_fria}mm
            </div>`;
        }
        if (element.tuberia_diametro_caliente) {
            const colorCaliente = element.tuberia_diametro_caliente === 25 ? '#10b981' : '#ef4444';
            tecnico += `<div style="font-size: 11px; color: ${colorCaliente}; margin-top: 3px;">
                Agua Caliente: PPR ⌀${element.tuberia_diametro_caliente}mm
            </div>`;
        }
        
        let etiquetaInfo = '';
        if (element.etiqueta) {
            etiquetaInfo = `<div style="font-size: 11px; color: #fbbf24; margin-top: 3px; font-weight: bold;">
                ${element.etiqueta}
            </div>`;
        }
        
        let categoriaInfo = '';
        if (element.especificaciones?.categoria_demanda) {
            const categoria = element.especificaciones.categoria_demanda;
            const categoriaColor = categoria === 'alta' ? '#10b981' : '#ef4444';
            const categoriaTexto = categoria === 'alta' ? 'ALTA DEMANDA' : 'DEMANDA ESTÁNDAR';
            categoriaInfo = `<div style="font-size: 10px; color: ${categoriaColor}; margin-top: 3px; font-weight: bold;">
                ${categoriaTexto}
            </div>`;
        }
        
        let matrizInfo = '';
        if (element.type === 'punto-conexion' && element.especificaciones?.descripcion) {
            matrizInfo = `<div style="font-size: 11px; color: #000000; background: #fbbf24; padding: 4px; border-radius: 4px; margin-top: 5px; font-weight: bold;">
                ${element.especificaciones.descripcion}
            </div>`;
        }
        
        div.innerHTML = `
            <div class="element-name">${element.symbol} ${element.type.toUpperCase()}</div>
            <div class="element-coords">X: ${Math.round(element.x)}, Y: ${Math.round(element.y)}</div>
            ${tecnico}
            ${categoriaInfo}
            ${etiquetaInfo}
            ${matrizInfo}
            <div style="font-size: 11px; color: #9ca3af; margin-top: 5px;">
                Click: Seleccionar • Delete: Eliminar
            </div>
        `;
        
        div.addEventListener('click', (e) => {
            e.stopPropagation();
            selectElement(element);
        });
        div.style.cursor = 'pointer';
        
        list.appendChild(div);
    });
}

export function createTuberia(desde, hacia, tipoRed = 'fria', diametroCustom = null, nivel = 1, crearEtiqueta = true) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', desde.x);
    line.setAttribute('y1', desde.y);
    line.setAttribute('x2', hacia.x);
    line.setAttribute('y2', hacia.y);
    
    let diameter;
    if (diametroCustom) {
        diameter = diametroCustom;
    } else {
        diameter = calculateOptimalDiameter(desde, hacia, tipoRed);
    }
    
    let color;
    let tipoLinea;
    
    switch(diameter) {
        case 40:
            color = '#8b5cf6';
            tipoLinea = 'matriz-principal-grande';
            break;
        case 32:
            color = '#2563eb';
            tipoLinea = 'matriz-principal';
            break;
        case 25:
            color = '#10b981';
            tipoLinea = 'alta-demanda';
            break;
        case 20:
            color = '#ef4444';
            tipoLinea = 'demanda-estandar';
            break;
        default:
            color = '#6b7280';
            tipoLinea = 'otros';
    }
    
    line.setAttribute('stroke', color);
    line.setAttribute('data-line-type', tipoLinea);
    
    const grosor = Math.max(2, diameter / 8);
    line.setAttribute('stroke-width', grosor);
    
    line.setAttribute('class', 'pipe-line');
    line.setAttribute('data-from', desde.id);
    line.setAttribute('data-to', hacia.id);
    line.setAttribute('data-diameter', diameter);
    line.setAttribute('data-type', tipoRed);
    
    if (nivel === 2) {
        line.classList.add('nivel-2');
        line.setAttribute('data-nivel', '2');
    }

    svg.appendChild(line);

    createArrowOnLine(desde, hacia, tipoRed, color);

    const distancePixels = calcularDistancia(desde, hacia);
    const distanceMeters = convertPixelsToRealMeters(distancePixels);

    addConnection({
        from: desde,
        to: hacia,
        distance: distanceMeters,
        diameter: diameter,
        type: tipoRed,
        material: 'PPR',
        lineType: tipoLinea
    });

    if (crearEtiqueta) {
        createTextWithDivider(desde, hacia, distanceMeters, diameter, tipoRed, color);
    }
    
    updateElementSizes();
}

export function createArrowOnLine(desde, hacia, tipoRed, color) {
    const deltaX = hacia.x - desde.x;
    const deltaY = hacia.y - desde.y;
    
    const arrowX = desde.x + (deltaX * 0.75);
    const arrowY = desde.y + (deltaY * 0.75);
    
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    const arrowGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    arrowGroup.setAttribute('class', 'flow-arrow');
    arrowGroup.setAttribute('data-connection', `${desde.id}-${hacia.id}`);
    
    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrow.setAttribute('points', '0,-4 8,0 0,4');
    
    arrow.setAttribute('fill', color);
    arrow.setAttribute('stroke', '#ffffff');
    arrow.setAttribute('stroke-width', '1');
    
    arrowGroup.setAttribute('transform', `translate(${arrowX}, ${arrowY}) rotate(${angle})`);
    arrowGroup.appendChild(arrow);
    svg.appendChild(arrowGroup);
}

export function createArranqueDomiciliario(matrizExistente, medidor, diameter) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', matrizExistente.x);
    line.setAttribute('y1', matrizExistente.y);
    line.setAttribute('x2', medidor.x);
    line.setAttribute('y2', medidor.y);
    
    const color = '#ff6b35';
    line.setAttribute('stroke', color);
    
    const grosor = Math.max(3, diameter / 6);
    line.setAttribute('stroke-width', grosor);
    
    line.setAttribute('class', 'pipe-line arranque-dom');
    line.setAttribute('data-from', matrizExistente.id);
    line.setAttribute('data-to', medidor.id);
    line.setAttribute('data-diameter', diameter);
    line.setAttribute('data-type', 'arranque');

    svg.appendChild(line);

    createArrowOnLine(matrizExistente, medidor, 'arranque', color);

    const distancePixels = calcularDistancia(matrizExistente, medidor);
    const distanceMeters = convertPixelsToRealMeters(distancePixels);

    addConnection({
        from: matrizExistente,
        to: medidor,
        distance: distanceMeters,
        diameter: diameter,
        type: 'arranque',
        material: 'PPR',
        lineType: 'arranque-domiciliario'
    });

    createArranqueDomTextDraggable(matrizExistente, medidor, distanceMeters, diameter, color);
    
    updateElementSizes();
}

function convertPixelsToRealMeters(distancePixels) {
    const metersPerPixel = currentScale / 1000;
    return distancePixels * metersPerPixel;
}

export function addElementWithAutoConnection(type, x, y) {
    const elementCounter = incrementValvulaCounter();
    const nivel = getNivelSeleccionado();
    
    let elementData;
    if (ESPECIFICACIONES_AGUA_POTABLE[type]) {
        elementData = {
            id: elementCounter,
            type: type,
            x: x,
            y: y,
            symbol: ESPECIFICACIONES_AGUA_POTABLE[type].symbol,
            categoria: 'consumo',
            requiere_caliente: ESPECIFICACIONES_AGUA_POTABLE[type].requiere_caliente,
            tuberia_diametro_fria: ESPECIFICACIONES_AGUA_POTABLE[type].tuberia_diametro_fria,
            tuberia_diametro_caliente: ESPECIFICACIONES_AGUA_POTABLE[type].tuberia_diametro_caliente,
            especificaciones: ESPECIFICACIONES_AGUA_POTABLE[type],
            nivel: nivel
        };
    } else if (FUENTES_CALENTAMIENTO[type]) {
        elementData = {
            id: elementCounter,
            type: type,
            x: x,
            y: y,
            symbol: FUENTES_CALENTAMIENTO[type].symbol,
            categoria: type === 'medidor-agua' ? 'medidor' : (type === 'conexion-nivel-2' ? 'conexion-nivel-2' : 'fuente'),
            especificaciones: FUENTES_CALENTAMIENTO[type],
            nivel: type === 'conexion-nivel-2' ? 2 : nivel,
            descripcion_conexion: type === 'conexion-nivel-2' ? FUENTES_CALENTAMIENTO[type].descripcion_default : undefined
        };
    } else if (INFRAESTRUCTURA_AGUA[type]) {
        elementData = {
            id: elementCounter,
            type: type,
            x: x,
            y: y,
            symbol: INFRAESTRUCTURA_AGUA[type].symbol,
            categoria: 'infraestructura',
            especificaciones: INFRAESTRUCTURA_AGUA[type],
            nivel: nivel
        };
        
        if (type === 'valvula-corte') {
            const counter = incrementValvulaCounter();
            elementData.etiqueta = `VÁLVULA N°${counter}`;
        }
    } else {
        console.log('ERROR: Tipo de elemento no reconocido:', type);
        return;
    }

    addElement(elementData);

    if (type === 'conexion-nivel-2') {
        createConexionNivel2WithLabel(elementData);
    } else {
        createSVGElement(elementData);
    }
    
    if (nivel === 2) {
        const group = svg.querySelector(`#element-${elementData.id}`);
        if (group) {
            group.classList.add('nivel-2');
        }
    }
    
    if (window.notificarCambioArtefacto) {
        window.notificarCambioArtefacto(type, 'agregar');
    }
    
    updateElementList();
    updateCalculations();
    
    let diametroInfo = '';
    if (elementData.tuberia_diametro_fria) {
        diametroInfo += ` → Fría: PPR ⌀${elementData.tuberia_diametro_fria}mm`;
    }
    if (elementData.tuberia_diametro_caliente) {
        diametroInfo += ` → Caliente: PPR ⌀${elementData.tuberia_diametro_caliente}mm`;
    }
    
    showStatus(`✅ ${type.toUpperCase()} agregado - NIVEL ${nivel}${diametroInfo}`);
}