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
    
    elementsToDelete.forEach(elementId => {
        // MANEJO PARA FOREIGNOBJECT (Tablas, etc)
        if (elementId.startsWith('tabla-nch2702-')) {
            const foreignObject = document.getElementById(elementId);
            if (foreignObject) {
                foreignObject.remove();
                deletedCount++;
            }
            return;
        }
        
        // MANEJO NORMAL PARA ELEMENTOS DE TRAZADO
        const elementGroup = document.getElementById(elementId);
        if (!elementGroup) return;
        
        const numericId = parseInt(elementId.replace('tracing-element-', ''));
        const stringId = elementId.replace('tracing-element-', ''); // Para nivel2-X
        
        elementGroup.remove();
        
        const cameraContainer = document.getElementById(`camera-info-${numericId}`);
        if (cameraContainer) {
            cameraContainer.remove();
        }
        
        // ELIMINAR ETIQUETA con ID numérico (Nivel 1)
        const elementLabel1 = document.querySelector(`.element-label-group[data-element-id="${numericId}"]`);
        if (elementLabel1) {
            elementLabel1.remove();
        }
        
        // ELIMINAR ETIQUETA con ID string (Nivel 2: "nivel2-X")
        const elementLabel2 = document.querySelector(`.element-label-group[data-element-id="${stringId}"]`);
        if (elementLabel2) {
            elementLabel2.remove();
        }
        
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
        
        deletedCount++;
    });
    
    clearSelection();
    
    showStatus(`🗑️ ${deletedCount} elemento(s) eliminado(s) correctamente`);
}

function deselectAllElements() {
    clearSelection();
    showStatus('🔄 Elementos deseleccionados');
}

function selectAllElements() {
    const currentPlan = plans[currentPlanIndex];
    const tracingSvg = document.getElementById('tracingSvg');
    
    if (!tracingSvg) return;
    
    clearSelection();
    
    // Seleccionar elementos de trazado normales
    currentPlan.tracingElements.forEach(element => {
        const elementGroup = document.querySelector(`#tracing-element-${element.id}`);
        if (elementGroup) {
            selectTracingElement(elementGroup, true);
        }
    });
    
    // Seleccionar foreignObjects (tablas, etc)
    const foreignObjects = tracingSvg.querySelectorAll('foreignObject[data-selectable="true"]');
    foreignObjects.forEach(fo => {
        selectTracingElement(fo, true);
    });
    
    const totalSelected = selectedElements.size;
    if (totalSelected === 0) {
        showStatus('⚠️ No hay elementos para seleccionar');
    } else {
        showStatus(`✅ Todos los elementos seleccionados (${totalSelected})`);
    }
}

console.log('✅ Trazado - Selection cargado con soporte foreignObject');