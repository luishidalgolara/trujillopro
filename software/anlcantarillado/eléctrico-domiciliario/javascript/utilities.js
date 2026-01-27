// ========================================
// UTILIDADES
// ========================================
function updateStatus(message) {
    const statusBar = document.getElementById('status');
    if (statusBar) {
        statusBar.textContent = message;
    }
}

// Cerrar modales al hacer click fuera
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// ========================================
// ESTILOS DINÁMICOS PARA ZOOM/PAN
// ========================================
(function injectZoomPanStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .no-select {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        
        .canvas-wrapper {
            overflow: hidden;
            cursor: default;
        }
        
        .drawing-board {
            transition: none;
            transform-origin: center center;
        }
        
        #plano {
            cursor: crosshair;
        }
        
        .mode-navegacion #plano {
            cursor: grab;
        }
        
        .mode-navegacion #plano:active {
            cursor: grabbing;
        }
    `;
    document.head.appendChild(style);
})();