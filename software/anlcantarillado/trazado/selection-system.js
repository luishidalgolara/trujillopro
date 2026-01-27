// trazado/selection-system.js

let isRectangularSelecting = false;
let selectionStartPoint = { x: 0, y: 0 };
let selectionCurrentPoint = { x: 0, y: 0 };
let selectionRectangle = null;
let selectedElements = new Set();

function startRectangularSelection(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (isRectangularSelecting) return;

    if (typeof currentDrawingTool !== 'undefined' && currentDrawingTool) {
        return;
    }
    
    const tracingSvg = document.getElementById('tracingSvg');
    const svgPoint = screenToSVGCoords(e.clientX, e.clientY);
    
    isRectangularSelecting = true;
    selectionStartPoint = { x: svgPoint.x, y: svgPoint.y };
    selectionCurrentPoint = { x: svgPoint.x, y: svgPoint.y };
    
    createSelectionRectangle();
    
    const handleMouseMove = (e) => updateRectangularSelection(e);
    const handleMouseUp = (e) => finishRectangularSelection(e, handleMouseMove, handleMouseUp);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    showStatus('🔲 Selección rectangular: Izq→Der = Window (azul), Der←Izq = Crossing (verde)');
}

function updateRectangularSelection(e) {
    if (!isRectangularSelecting) return;
    
    const svgPoint = screenToSVGCoords(e.clientX, e.clientY);
    selectionCurrentPoint = { x: svgPoint.x, y: svgPoint.y };
    
    updateSelectionRectangle();
}

function finishRectangularSelection(e, mouseMoveHandler, mouseUpHandler) {
    if (!isRectangularSelecting) return;
    
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    
    const rect = getSelectionRectangle();
    const isWindowSelection = selectionCurrentPoint.x > selectionStartPoint.x;
    
    if (rect.width > 5 && rect.height > 5) {
        selectElementsInRectangle(rect, isWindowSelection);
        
        const selectionType = isWindowSelection ? 'Window (completos)' : 'Crossing (tocando)';
        const selectedCount = selectedElements.size;
        showStatus(`✅ Selección ${selectionType}: ${selectedCount} elemento(s) seleccionado(s)`);
    }
    
    removeSelectionRectangle();
    isRectangularSelecting = false;
}

function createSelectionRectangle() {
    const tracingSvg = document.getElementById('tracingSvg');
    
    selectionRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    selectionRectangle.setAttribute('id', 'selection-rectangle');
    selectionRectangle.setAttribute('fill', 'rgba(52, 152, 219, 0.1)');
    selectionRectangle.setAttribute('stroke', '#3498db');
    selectionRectangle.setAttribute('stroke-width', '2');
    selectionRectangle.setAttribute('stroke-dasharray', '5,5');
    selectionRectangle.style.pointerEvents = 'none';
    
    tracingSvg.appendChild(selectionRectangle);
}

function updateSelectionRectangle() {
    if (!selectionRectangle) return;
    
    const rect = getSelectionRectangle();
    const isWindowSelection = selectionCurrentPoint.x > selectionStartPoint.x;
    
    selectionRectangle.setAttribute('x', rect.x);
    selectionRectangle.setAttribute('y', rect.y);
    selectionRectangle.setAttribute('width', rect.width);
    selectionRectangle.setAttribute('height', rect.height);
    
    if (isWindowSelection) {
        selectionRectangle.setAttribute('fill', 'rgba(52, 152, 219, 0.15)');
        selectionRectangle.setAttribute('stroke', '#3498db');
    } else {
        selectionRectangle.setAttribute('fill', 'rgba(39, 174, 96, 0.15)');
        selectionRectangle.setAttribute('stroke', '#27ae60');
    }
}

function getSelectionRectangle() {
    const x1 = selectionStartPoint.x;
    const y1 = selectionStartPoint.y;
    const x2 = selectionCurrentPoint.x;
    const y2 = selectionCurrentPoint.y;
    
    return {
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1)
    };
}

function removeSelectionRectangle() {
    if (selectionRectangle) {
        selectionRectangle.remove();
        selectionRectangle = null;
    }
}

function selectElementsInRectangle(rect, isWindowSelection) {
    const currentPlan = plans[currentPlanIndex];
    
    if (!event || (!event.ctrlKey && !event.metaKey)) {
        clearSelection();
    }
    
    currentPlan.tracingElements.forEach(element => {
        const elementGroup = document.querySelector(`#tracing-element-${element.id}`);
        if (!elementGroup) return;
        
        const circle = elementGroup.querySelector('circle');
        if (!circle) return;
        
        const elementBounds = {
            x: parseFloat(circle.getAttribute('cx')) - parseFloat(circle.getAttribute('r')),
            y: parseFloat(circle.getAttribute('cy')) - parseFloat(circle.getAttribute('r')),
            width: parseFloat(circle.getAttribute('r')) * 2,
            height: parseFloat(circle.getAttribute('r')) * 2,
            centerX: parseFloat(circle.getAttribute('cx')),
            centerY: parseFloat(circle.getAttribute('cy')),
            radius: parseFloat(circle.getAttribute('r'))
        };
        
        let shouldSelect = false;
        
        if (isWindowSelection) {
            shouldSelect = (
                elementBounds.x >= rect.x &&
                elementBounds.y >= rect.y &&
                elementBounds.x + elementBounds.width <= rect.x + rect.width &&
                elementBounds.y + elementBounds.height <= rect.y + rect.height
            );
        } else {
            shouldSelect = rectangleCircleIntersect(rect, elementBounds);
        }
        
        if (shouldSelect) {
            selectTracingElement(elementGroup, true);
        }
    });
    
    if (typeof ELEMENTOS_NIVEL_2 !== 'undefined' && ELEMENTOS_NIVEL_2.length > 0) {
        ELEMENTOS_NIVEL_2.forEach(element => {
            const elementGroup = document.querySelector(`#tracing-element-${element.id}`);
            if (!elementGroup) return;
            
            const circle = elementGroup.querySelector('circle');
            if (!circle) return;
            
            const elementBounds = {
                x: parseFloat(circle.getAttribute('cx')) - parseFloat(circle.getAttribute('r')),
                y: parseFloat(circle.getAttribute('cy')) - parseFloat(circle.getAttribute('r')),
                width: parseFloat(circle.getAttribute('r')) * 2,
                height: parseFloat(circle.getAttribute('r')) * 2,
                centerX: parseFloat(circle.getAttribute('cx')),
                centerY: parseFloat(circle.getAttribute('cy')),
                radius: parseFloat(circle.getAttribute('r'))
            };
            
            let shouldSelect = false;
            
            if (isWindowSelection) {
                shouldSelect = (
                    elementBounds.x >= rect.x &&
                    elementBounds.y >= rect.y &&
                    elementBounds.x + elementBounds.width <= rect.x + rect.width &&
                    elementBounds.y + elementBounds.height <= rect.y + rect.height
                );
            } else {
                shouldSelect = rectangleCircleIntersect(rect, elementBounds);
            }
            
            if (shouldSelect) {
                selectTracingElement(elementGroup, true);
            }
        });
    }
    
    const tracingSvg = document.getElementById('tracingSvg');
    const foreignObjects = tracingSvg.querySelectorAll('foreignObject[data-selectable="true"]');
    foreignObjects.forEach(fo => {
        const elementBounds = {
            x: parseFloat(fo.getAttribute('x')),
            y: parseFloat(fo.getAttribute('y')),
            width: parseFloat(fo.getAttribute('width')),
            height: parseFloat(fo.getAttribute('height'))
        };
        
        let shouldSelect = false;
        
        if (isWindowSelection) {
            shouldSelect = (
                elementBounds.x >= rect.x &&
                elementBounds.y >= rect.y &&
                elementBounds.x + elementBounds.width <= rect.x + rect.width &&
                elementBounds.y + elementBounds.height <= rect.y + rect.height
            );
        } else {
            shouldSelect = rectanglesIntersect(rect, elementBounds);
        }
        
        if (shouldSelect) {
            selectTracingElement(fo, true);
        }
    });
    
    const elementosDibujo = document.querySelectorAll('[class^="drawing-"]');
    elementosDibujo.forEach(elemento => {
        if (typeof elemento.getBBox !== 'function') return;
        
        if (!elemento.id) {
            elemento.id = `drawing-${Date.now()}-${Math.random()}`;
        }
        
        const bbox = elemento.getBBox();
        const elementBounds = {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height
        };
        
        let shouldSelect = false;
        
        if (isWindowSelection) {
            shouldSelect = (
                elementBounds.x >= rect.x &&
                elementBounds.y >= rect.y &&
                elementBounds.x + elementBounds.width <= rect.x + rect.width &&
                elementBounds.y + elementBounds.height <= rect.y + rect.height
            );
        } else {
            shouldSelect = rectanglesIntersect(rect, elementBounds);
        }
        
        if (shouldSelect && window.DrawingEdit) {
            window.DrawingEdit.seleccionarElemento(elemento);
            selectedElements.add(elemento.id);
        }
    });
    
    const mediciones = document.querySelectorAll('.measurement-group');
    mediciones.forEach(medicion => {
        if (!medicion.id) {
            medicion.id = `measurement-${Date.now()}-${Math.random()}`;
        }
        
        const linea = medicion.querySelector('line');
        if (!linea) return;
        
        const x1 = parseFloat(linea.getAttribute('x1'));
        const y1 = parseFloat(linea.getAttribute('y1'));
        const x2 = parseFloat(linea.getAttribute('x2'));
        const y2 = parseFloat(linea.getAttribute('y2'));
        
        const medicionBounds = {
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
            x1, y1, x2, y2
        };
        
        let shouldSelect = false;
        
        if (isWindowSelection) {
            shouldSelect = (
                medicionBounds.x >= rect.x &&
                medicionBounds.y >= rect.y &&
                medicionBounds.x + medicionBounds.width <= rect.x + rect.width &&
                medicionBounds.y + medicionBounds.height <= rect.y + rect.height
            );
        } else {
            shouldSelect = rectangleLineIntersect(rect, medicionBounds);
        }
        
        if (shouldSelect && window.DrawingEdit) {
            window.DrawingEdit.seleccionarMedicion(medicion);
            selectedElements.add(medicion.id);
        }
    });
    
    const textos = document.querySelectorAll('.dynamic-text, .dynamic-rose');
    textos.forEach(texto => {
        if (typeof texto.getBBox !== 'function') return;
        
        if (!texto.id) {
            texto.id = `text-${Date.now()}-${Math.random()}`;
        }
        
        const bbox = texto.getBBox();
        const textBounds = {
            x: bbox.x,
            y: bbox.y,
            width: bbox.width,
            height: bbox.height
        };
        
        let shouldSelect = false;
        
        if (isWindowSelection) {
            shouldSelect = (
                textBounds.x >= rect.x &&
                textBounds.y >= rect.y &&
                textBounds.x + textBounds.width <= rect.x + rect.width &&
                textBounds.y + textBounds.height <= rect.y + rect.height
            );
        } else {
            shouldSelect = rectanglesIntersect(rect, textBounds);
        }
        
        if (shouldSelect) {
            texto.setAttribute('data-selected', 'true');
            texto.style.stroke = '#fbbf24';
            texto.style.strokeWidth = '2';
            selectedElements.add(texto.id);
        }
    });
}

function rectangleCircleIntersect(rect, circleBounds) {
    const cx = circleBounds.centerX;
    const cy = circleBounds.centerY;
    const r = circleBounds.radius;
    
    const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.height));
    
    const distanceX = cx - closestX;
    const distanceY = cy - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    
    return distanceSquared <= (r * r);
}

function rectanglesIntersect(rect1, rect2) {
    return !(
        rect1.x + rect1.width < rect2.x ||
        rect2.x + rect2.width < rect1.x ||
        rect1.y + rect1.height < rect2.y ||
        rect2.y + rect2.height < rect1.y
    );
}

function rectangleLineIntersect(rect, lineBounds) {
    const { x1, y1, x2, y2 } = lineBounds;
    
    const p1Inside = (x1 >= rect.x && x1 <= rect.x + rect.width && y1 >= rect.y && y1 <= rect.y + rect.height);
    const p2Inside = (x2 >= rect.x && x2 <= rect.x + rect.width && y2 >= rect.y && y2 <= rect.y + rect.height);
    
    if (p1Inside || p2Inside) return true;
    
    const rectEdges = [
        { x1: rect.x, y1: rect.y, x2: rect.x + rect.width, y2: rect.y },
        { x1: rect.x + rect.width, y1: rect.y, x2: rect.x + rect.width, y2: rect.y + rect.height },
        { x1: rect.x + rect.width, y1: rect.y + rect.height, x2: rect.x, y2: rect.y + rect.height },
        { x1: rect.x, y1: rect.y + rect.height, x2: rect.x, y2: rect.y }
    ];
    
    for (const edge of rectEdges) {
        if (lineLineIntersect(x1, y1, x2, y2, edge.x1, edge.y1, edge.x2, edge.y2)) {
            return true;
        }
    }
    
    return false;
}

function lineLineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) return false;
    
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
    
    return (t >= 0 && t <= 1 && u >= 0 && u <= 1);
}

function toggleElementSelection(elementGroup) {
    const elementId = elementGroup.id;
    
    if (selectedElements.has(elementId)) {
        removeElementFromSelection(elementGroup);
    } else {
        selectTracingElement(elementGroup, true);
    }
}

function removeElementFromSelection(elementGroup) {
    const elementId = elementGroup.id;
    
    selectedElements.delete(elementId);
    elementGroup.classList.remove('selected');
    
    if (elementGroup.tagName === 'foreignObject') {
        const div = elementGroup.querySelector('div > div');
        if (div) {
            div.style.outline = 'none';
        }
        return;
    }
    
    const circle = elementGroup.querySelector('circle');
    if (circle) {
        const isNivel2 = elementGroup.classList.contains('nivel-2');
        circle.style.stroke = isNivel2 ? '#e74c3c' : '#f9fafb';
        circle.style.strokeWidth = isNivel2 ? '3' : BASE_STROKE_WIDTH.element.toString();
        circle.style.filter = 'none';
    }
}

function selectTracingElement(elementGroup, keepMultipleSelection = false) {
    const currentPlan = plans[currentPlanIndex];
    const elementId = elementGroup.id;
    
    if (!keepMultipleSelection) {
        clearSelection();
    }
    
    selectedElements.add(elementId);
    elementGroup.classList.add('selected');
    
    if (elementGroup.tagName === 'foreignObject') {
        const div = elementGroup.querySelector('div > div');
        if (div) {
            div.style.outline = '3px solid #fbbf24';
            div.style.outlineOffset = '2px';
        }
    } else {
        const circle = elementGroup.querySelector('circle');
        if (circle) {
            circle.style.stroke = '#fbbf24';
            circle.style.strokeWidth = '3';
            circle.style.filter = 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))';
        }
    }
    
    currentPlan.selectedElement = elementId;
    
    setupElementDragImproved(elementGroup);
    
    const count = selectedElements.size;
    if (count === 1) {
        showStatus('✅ Elemento seleccionado. Presiona SUPRIMIR para eliminar o arrastra para mover');
    } else {
        showStatus(`✅ ${count} elementos seleccionados. Presiona SUPRIMIR para eliminar`);
    }
}

function clearSelection() {
    selectedElements.forEach(elementId => {
        const elementGroup = document.getElementById(elementId);
        if (elementGroup) {
            removeElementFromSelection(elementGroup);
        }
    });
    selectedElements.clear();
    
    const dibujoSeleccionados = document.querySelectorAll('[class^="drawing-"][data-selected="true"]');
    dibujoSeleccionados.forEach(elemento => {
        if (window.DrawingEdit) {
            window.DrawingEdit.deseleccionarElemento(elemento);
        }
    });
    
    const medicionesSeleccionadas = document.querySelectorAll('.measurement-group[data-selected="true"]');
    medicionesSeleccionadas.forEach(medicion => {
        if (window.DrawingEdit) {
            window.DrawingEdit.deseleccionarMedicion(medicion);
        }
    });
    
    const textosSeleccionados = document.querySelectorAll('.dynamic-text[data-selected="true"], .dynamic-rose[data-selected="true"]');
    textosSeleccionados.forEach(texto => {
        texto.removeAttribute('data-selected');
        texto.style.stroke = '';
        texto.style.strokeWidth = '';
    });
    
    const currentPlan = plans[currentPlanIndex];
    currentPlan.selectedElement = null;
}

function setupKeyboardEvents() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Delete' || e.key === 'Suprimir') {
            deleteSelectedElements();
        }
        
        if (e.key === 'Escape') {
            resetAllActiveCommands();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
            e.preventDefault();
            selectAllElements();
        }
    });
}

function resetAllActiveCommands() {
    const currentPlan = plans[currentPlanIndex];
    let resetActions = [];
    
    if (currentPlan.currentTool) {
        currentPlan.currentTool = null;
        resetActions.push('herramienta');
    }
    
    const activeButtons = document.querySelectorAll('.tool-btn.active');
    if (activeButtons.length > 0) {
        activeButtons.forEach(btn => btn.classList.remove('active'));
        resetActions.push('botones');
    }
    
    if (isRectangularSelecting) {
        removeSelectionRectangle();
        isRectangularSelecting = false;
        resetActions.push('selección rectangular');
    }
    
    if (selectedElements.size > 0) {
        clearSelection();
        resetActions.push('elementos seleccionados');
    }
    
    if (typeof globalDragSystem !== 'undefined' && globalDragSystem.isDragging) {
        globalDragSystem.isDragging = false;
        globalDragSystem.currentElement = null;
        resetActions.push('arrastre');
    }
    
    const drawingBoard = document.getElementById('drawingBoard');
    if (drawingBoard) {
        drawingBoard.style.cursor = 'crosshair';
    }
    
    if (resetActions.length > 0) {
        showStatus(`🔄 ESC: Desactivado → ${resetActions.join(', ')} | Listo para selección libre`);
    } else {
        showStatus('🔄 ESC: Ya en modo selección libre');
    }
    
    console.log('🚀 RESET COMPLETO ejecutado:', resetActions);
}

function deleteSelectedElements() {
    const currentPlan = plans[currentPlanIndex];
    
    if (selectedElements.size === 0) {
        showStatus('⚠️ No hay elementos seleccionados para eliminar');
        return;
    }
    
    const elementsToDelete = Array.from(selectedElements);
    let deletedCount = 0;
    let deletedTypes = {
        tabla: 0,
        nivel1: 0,
        nivel2: 0,
        dibujo: 0,
        medicion: 0,
        texto: 0
    };
    
    elementsToDelete.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        if (element.tagName === 'foreignObject' && element.hasAttribute('data-selectable')) {
            element.remove();
            deletedTypes.tabla++;
            deletedCount++;
        }
        
        else if (element.id.startsWith('tracing-element-')) {
            const isNivel2 = element.classList.contains('nivel-2');
            const numericId = isNivel2 
                ? element.id.replace('tracing-element-nivel2-', '')
                : parseInt(element.id.replace('tracing-element-', ''));
            
            element.remove();
            
            const labelGroup = document.querySelector(`.element-label-group[data-element-id="${element.id}"]`);
            if (labelGroup) labelGroup.remove();
            
            const cameraContainer = document.getElementById(`camera-info-${numericId}`);
            if (cameraContainer) {
                cameraContainer.remove();
            }
            
            if (!isNivel2) {
                const relatedConnections = currentPlan.tracingConnections.filter(conn => 
                    conn.from.id === numericId || conn.to.id === numericId
                );
                
                relatedConnections.forEach(conn => {
                    const lines = document.querySelectorAll(`[data-from="${conn.from.id}"][data-to="${conn.to.id}"]`);
                    const arrows = document.querySelectorAll(`[data-connection="${conn.from.id}-${conn.to.id}"]`);
                    const labels = document.querySelectorAll(`.pipe-label-group[data-connection="${conn.from.id}-${conn.to.id}"]`);
                    
                    lines.forEach(line => line.remove());
                    arrows.forEach(arrow => arrow.remove());
                    labels.forEach(label => label.remove());
                });
                
                currentPlan.tracingElements = currentPlan.tracingElements.filter(el => el.id !== numericId);
                currentPlan.tracingConnections = currentPlan.tracingConnections.filter(conn => 
                    conn.from.id !== numericId && conn.to.id !== numericId
                );
                
                deletedTypes.nivel1++;
            } else {
                if (typeof ELEMENTOS_NIVEL_2 !== 'undefined') {
                    const index = ELEMENTOS_NIVEL_2.findIndex(el => el.id === element.id.replace('tracing-element-', ''));
                    if (index !== -1) {
                        ELEMENTOS_NIVEL_2.splice(index, 1);
                    }
                }
                deletedTypes.nivel2++;
            }
            
            deletedCount++;
        }
        
        else if (element.classList.toString().startsWith('drawing-')) {
            element.remove();
            deletedTypes.dibujo++;
            deletedCount++;
        }
        
        else if (element.classList.contains('measurement-group')) {
            element.remove();
            deletedTypes.medicion++;
            deletedCount++;
        }
        
        else if (element.classList.contains('dynamic-text') || element.classList.contains('dynamic-rose')) {
            element.remove();
            deletedTypes.texto++;
            deletedCount++;
        }
    });
    
    clearSelection();
    
    let mensaje = `🗑️ ${deletedCount} elemento(s) eliminado(s)`;
    const detalles = [];
    if (deletedTypes.tabla > 0) detalles.push(`${deletedTypes.tabla} tabla`);
    if (deletedTypes.nivel1 > 0) detalles.push(`${deletedTypes.nivel1} 1°nivel`);
    if (deletedTypes.nivel2 > 0) detalles.push(`${deletedTypes.nivel2} 2°nivel`);
    if (deletedTypes.dibujo > 0) detalles.push(`${deletedTypes.dibujo} dibujo`);
    if (deletedTypes.medicion > 0) detalles.push(`${deletedTypes.medicion} medición`);
    if (deletedTypes.texto > 0) detalles.push(`${deletedTypes.texto} texto`);
    
    if (detalles.length > 0) {
        mensaje += ` (${detalles.join(', ')})`;
    }
    
    showStatus(mensaje);
}

function deselectAllElements() {
    clearSelection();
    showStatus('🔄 Elementos deseleccionados');
}

function selectAllElements() {
    const currentPlan = plans[currentPlanIndex];
    const tracingSvg = document.getElementById('tracingSvg');
    
    clearSelection();
    
    let totalSelected = 0;
    
    currentPlan.tracingElements.forEach(element => {
        const elementGroup = document.querySelector(`#tracing-element-${element.id}`);
        if (elementGroup) {
            selectTracingElement(elementGroup, true);
            totalSelected++;
        }
    });
    
    if (typeof ELEMENTOS_NIVEL_2 !== 'undefined') {
        ELEMENTOS_NIVEL_2.forEach(element => {
            const elementGroup = document.querySelector(`#tracing-element-${element.id}`);
            if (elementGroup) {
                selectTracingElement(elementGroup, true);
                totalSelected++;
            }
        });
    }
    
    const foreignObjects = tracingSvg.querySelectorAll('foreignObject[data-selectable="true"]');
    foreignObjects.forEach(fo => {
        selectTracingElement(fo, true);
        totalSelected++;
    });
    
    if (totalSelected === 0) {
        showStatus('⚠️ No hay elementos para seleccionar');
    } else {
        showStatus(`✅ Todos los elementos seleccionados (${totalSelected})`);
    }
}

console.log('✅ Trazado - Selection UNIVERSAL cargado (Tablas, Nivel 1, Nivel 2, CAD, Mediciones, Textos)');