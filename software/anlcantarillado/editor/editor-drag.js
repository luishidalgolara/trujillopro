// ================================
// EDITOR DRAG
// Sistema global de arrastre
// ================================

let sistemaArrastreGlobal = {
    initialized: false,
    currentElement: null,
    isDragging: false,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0
};

function inicializarSistemaArrastreGlobal() {
    if (sistemaArrastreGlobal.initialized) return;
    
    document.addEventListener('mousemove', function(e) {
        if (!sistemaArrastreGlobal.isDragging || !sistemaArrastreGlobal.currentElement) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const deltaX = e.clientX - sistemaArrastreGlobal.startX;
        const deltaY = e.clientY - sistemaArrastreGlobal.startY;
        
        const nuevaIzquierda = sistemaArrastreGlobal.startLeft + deltaX;
        const nuevoArriba = sistemaArrastreGlobal.startTop + deltaY;
        
        sistemaArrastreGlobal.currentElement.style.left = nuevaIzquierda + 'px';
        sistemaArrastreGlobal.currentElement.style.top = nuevoArriba + 'px';
        sistemaArrastreGlobal.currentElement.style.right = 'auto';
    });

    document.addEventListener('mouseup', function(e) {
        if (!sistemaArrastreGlobal.isDragging || !sistemaArrastreGlobal.currentElement) return;
        
        sistemaArrastreGlobal.currentElement.classList.remove('dragging');
        sistemaArrastreGlobal.currentElement.style.zIndex = 'auto';
        sistemaArrastreGlobal.currentElement.style.cursor = 'move';
        
        sistemaArrastreGlobal.isDragging = false;
        sistemaArrastreGlobal.currentElement = null;
        
        showStatus('📍 Elemento reposicionado correctamente');
        
        e.preventDefault();
        e.stopPropagation();
    });

    sistemaArrastreGlobal.initialized = true;
    console.log('✅ Sistema global de arrastre inicializado');
}

function hacerElementoArrastrable(elemento) {
    if (!elemento) {
        console.warn('Element not found for hacerElementoArrastrable');
        return;
    }
    
    inicializarSistemaArrastreGlobal();

    function obtenerPosicionActual() {
        const rect = elemento.getBoundingClientRect();
        const boardRect = document.getElementById('drawingBoard').getBoundingClientRect();
        
        return {
            left: rect.left - boardRect.left,
            top: rect.top - boardRect.top
        };
    }

    elemento.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        
        e.preventDefault();
        e.stopPropagation();
        
        sistemaArrastreGlobal.currentElement = elemento;
        sistemaArrastreGlobal.isDragging = true;
        sistemaArrastreGlobal.startX = e.clientX;
        sistemaArrastreGlobal.startY = e.clientY;
        
        const posActual = obtenerPosicionActual();
        sistemaArrastreGlobal.startLeft = posActual.left;
        sistemaArrastreGlobal.startTop = posActual.top;
        
        elemento.classList.add('dragging');
        elemento.style.zIndex = 1000;
        elemento.style.cursor = 'grabbing';
        
        showStatus(`🖱️ Arrastrando ${elemento.id}...`);
    });

    elemento.addEventListener('mouseenter', function() {
        if (!sistemaArrastreGlobal.isDragging) {
            elemento.style.cursor = 'move';
        }
    });

    elemento.addEventListener('mouseleave', function() {
        if (!sistemaArrastreGlobal.isDragging) {
            elemento.style.cursor = 'auto';
        }
    });

    console.log(`✅ Elemento ${elemento.id} registrado en sistema global de arrastre`);
}

function configurarElementosArrastrables() {
    // Los elementos de texto y rosa son ahora dinámicos
    // No hay elementos fijos que configurar
}

// Aliases para compatibilidad
window.initializeGlobalDragSystem = inicializarSistemaArrastreGlobal;
window.makeDraggableElement = hacerElementoArrastrable;
window.setupDraggableElements = configurarElementosArrastrables;
window.globalDragSystem = sistemaArrastreGlobal;

// Exportar
window.EditorDrag = {
    inicializarSistemaArrastreGlobal,
    hacerElementoArrastrable,
    configurarElementosArrastrables,
    sistemaArrastreGlobal
};

console.log('✅ editor-drag.js cargado');