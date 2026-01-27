// ========================================
// FUNCIONES DE MODO
// ========================================
function toggleMode() {
    const modeButton = document.getElementById('modeToggle');
    const svg = document.getElementById('plano');
    
    if (AppState.mode === 'edicion') {
        AppState.mode = 'navegacion';
        modeButton.textContent = '🖱️ Modo: Navegación';
        modeButton.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
        
        // Cambiar cursor para modo navegación
        if (svg) svg.style.cursor = 'grab';
        
        updateStatus('🖱️ Modo Navegación - Click izquierdo para pan, rueda para zoom');
    } else {
        AppState.mode = 'edicion';
        modeButton.textContent = '🖱️ Modo: Edición';
        modeButton.style.background = 'linear-gradient(135deg, #95a5a6, #7f8c8d)';
        
        // Cambiar cursor para modo edición
        if (svg) svg.style.cursor = 'crosshair';
        
        updateStatus('✏️ Modo Edición activado');
    }
    console.log('🔄 Modo cambiado a:', AppState.mode);
}

function toggleDibujo() {
    AppState.isDrawing = !AppState.isDrawing;
    const btn = event.target;
    if (AppState.isDrawing) {
        btn.style.background = '#c0392b';
        updateStatus('🎨 Modo Dibujo Libre activado');
    } else {
        btn.style.background = '#e91e63';
        updateStatus('🎨 Modo Dibujo Libre desactivado');
    }
    console.log('🎨 Dibujo libre:', AppState.isDrawing);
}

function toggleEtiquetas() {
    AppState.etiquetasMode = !AppState.etiquetasMode;
    const btn = document.getElementById('btnEtiquetas');
    if (AppState.etiquetasMode) {
        btn.style.background = '#d97706';
        updateStatus('🏷️ Modo Etiquetas activado - Click en elementos para agregar texto');
    } else {
        btn.style.background = '#f59e0b';
        updateStatus('🏷️ Modo Etiquetas desactivado');
    }
    console.log('🏷️ Modo etiquetas:', AppState.etiquetasMode);
}