// ============================================================
// EXTENSIÓN DEL SISTEMA DE SELECCIÓN PARA FOREIGNOBJECTS
// Añade soporte para seleccionar tablas, cuadros y otros foreignObjects
// ============================================================

// Extender la función selectElementsInRectangle para incluir foreignObjects
(function() {
    // Guardar referencia a la función original si existe
    const originalSelectElementsInRectangle = window.selectElementsInRectangle;
    
    // Nueva función que extiende la original
    window.selectElementsInRectangle = function(rect, isWindowSelection) {
        // Llamar a la función original primero
        if (originalSelectElementsInRectangle) {
            originalSelectElementsInRectangle(rect, isWindowSelection);
        }
        
        // ✅ AGREGAR SELECCIÓN DE FOREIGNOBJECTS (Tablas, Cuadros, etc.)
        const foreignObjects = document.querySelectorAll('foreignObject[data-selectable="true"]');
        
        foreignObjects.forEach(foreignObject => {
            if (!foreignObject.id) {
                foreignObject.id = `foreignobject-${Date.now()}-${Math.random()}`;
            }
            
            const x = parseFloat(foreignObject.getAttribute('x'));
            const y = parseFloat(foreignObject.getAttribute('y'));
            const width = parseFloat(foreignObject.getAttribute('width'));
            const height = parseFloat(foreignObject.getAttribute('height'));
            
            const elementBounds = {
                x: x,
                y: y,
                width: width,
                height: height
            };
            
            let shouldSelect = false;
            
            if (isWindowSelection) {
                // Window: el elemento debe estar completamente dentro
                shouldSelect = (
                    elementBounds.x >= rect.x &&
                    elementBounds.y >= rect.y &&
                    elementBounds.x + elementBounds.width <= rect.x + rect.width &&
                    elementBounds.y + elementBounds.height <= rect.y + rect.height
                );
            } else {
                // Crossing: basta con que toque
                shouldSelect = rectanglesIntersect(rect, elementBounds);
            }
            
            if (shouldSelect) {
                selectForeignObject(foreignObject);
            }
        });
    };
    
    // Función auxiliar para verificar intersección de rectángulos
    function rectanglesIntersect(rect1, rect2) {
        return !(
            rect1.x + rect1.width < rect2.x ||
            rect2.x + rect2.width < rect1.x ||
            rect1.y + rect1.height < rect2.y ||
            rect2.y + rect2.height < rect1.y
        );
    }
    
    // Función para seleccionar foreignObject
    function selectForeignObject(foreignObject) {
        if (!window.selectedElements) {
            window.selectedElements = new Set();
        }
        
        selectedElements.add(foreignObject.id);
        foreignObject.setAttribute('data-selected', 'true');
        
        // Agregar indicador visual de selección
        foreignObject.style.outline = '3px solid #fbbf24';
        foreignObject.style.outlineOffset = '2px';
        foreignObject.style.filter = 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))';
    }
    
    // Extender clearSelection para incluir foreignObjects
    const originalClearSelection = window.clearSelection;
    
    window.clearSelection = function() {
        // Llamar a la función original
        if (originalClearSelection) {
            originalClearSelection();
        }
        
        // Deseleccionar foreignObjects
        const selectedForeignObjects = document.querySelectorAll('foreignObject[data-selected="true"]');
        selectedForeignObjects.forEach(fo => {
            fo.removeAttribute('data-selected');
            fo.style.outline = '';
            fo.style.outlineOffset = '';
            fo.style.filter = '';
        });
    };
    
    // Extender deleteSelectedElements para incluir foreignObjects
    const originalDeleteSelectedElements = window.deleteSelectedElements;
    
    window.deleteSelectedElements = function() {
        if (!window.selectedElements) {
            if (originalDeleteSelectedElements) {
                originalDeleteSelectedElements();
            }
            return;
        }
        
        const elementsToDelete = Array.from(selectedElements);
        let deletedForeignObjects = 0;
        
        // Eliminar foreignObjects seleccionados
        elementsToDelete.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element && element.tagName.toLowerCase() === 'foreignobject') {
                element.remove();
                selectedElements.delete(elementId);
                deletedForeignObjects++;
            }
        });
        
        // Llamar a la función original para el resto de elementos
        if (originalDeleteSelectedElements) {
            originalDeleteSelectedElements();
        }
        
        if (deletedForeignObjects > 0) {
            const currentMessage = document.getElementById('statusBar')?.textContent || '';
            const newMessage = currentMessage + ` (${deletedForeignObjects} tabla(s))`;
            if (window.showStatus) {
                showStatus(newMessage);
            }
        }
    };
    
    console.log('✅ Extensión de selección para foreignObjects cargada');
})();