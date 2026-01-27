// editor/editor-panel.js

// ================================
// EDITOR PANEL
// Sistema de panel UI (AUTO-HIDE DESACTIVADO)
// ================================

let temporizadorOcultarPanel = null;
const RETRASO_OCULTAR_PANEL = 200;

function configurarTextosEditables() {
    // No hay textos editables fijos - ahora son dinámicos
}

function configurarDragAndDrop() {
    const workspace = document.querySelector('.workspace');
    
    workspace.addEventListener('dragover', function(e) {
        e.preventDefault();
        workspace.style.backgroundColor = '#d5f4e6';
    });
    
    workspace.addEventListener('dragleave', function() {
        workspace.style.backgroundColor = '#ecf0f1';
    });
    
    workspace.addEventListener('drop', function(e) {
        e.preventDefault();
        workspace.style.backgroundColor = '#ecf0f1';
        handlePDFFiles(e.dataTransfer.files);
    });
}

function inicializarAutoOcultarPanel() {
    // AUTO-HIDE DESACTIVADO - Panel permanece visible
    const panel = document.querySelector('.tracing-panel');
    if (panel) {
        panel.classList.remove('hidden');
    }
}

function mostrarPanel() {
    const panel = document.querySelector('.tracing-panel');
    const workspace = document.querySelector('.workspace-container');
    
    if (panel) {
        panel.classList.remove('hidden');
    }
    if (workspace) {
        workspace.classList.remove('panel-hidden');
    }
}

function ocultarPanel() {
    // Función desactivada - no hace nada
}

function iniciarTemporizadorOcultar() {
    // Función desactivada - no hace nada
}

// Inicializar cuando carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        inicializarAutoOcultarPanel();
    }, 1000);
});

// Aliases para compatibilidad
window.setupEditableTexts = configurarTextosEditables;
window.setupDragAndDrop = configurarDragAndDrop;
window.initPanelAutoHide = inicializarAutoOcultarPanel;
window.showPanel = mostrarPanel;
window.hidePanel = ocultarPanel;
window.startHideTimer = iniciarTemporizadorOcultar;

// Exportar
window.EditorPanel = {
    configurarTextosEditables,
    configurarDragAndDrop,
    inicializarAutoOcultarPanel,
    mostrarPanel,
    ocultarPanel,
    iniciarTemporizadorOcultar
};

console.log('✅ editor-panel.js cargado (AUTO-HIDE DESACTIVADO)');