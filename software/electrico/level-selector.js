// ========================================
// SELECTOR DE NIVEL PARA SÍMBOLOS
// ========================================

// Estado temporal para el símbolo pendiente
const LevelSelector = {
    pendingTool: null,
    pendingX: null,
    pendingY: null,
    selectedLevel: 1
};

/**
 * Mostrar popup de selección de nivel
 */
function showLevelSelector(toolName, x, y) {
    LevelSelector.pendingTool = toolName;
    LevelSelector.pendingX = x;
    LevelSelector.pendingY = y;
    
    const popup = document.getElementById('levelSelectorPopup');
    if (popup) {
        popup.classList.add('show');
    }
}

/**
 * Seleccionar nivel y colocar símbolo
 */
function selectLevel(level) {
    LevelSelector.selectedLevel = level;
    
    // Cerrar popup
    const popup = document.getElementById('levelSelectorPopup');
    if (popup) {
        popup.classList.remove('show');
    }
    
    // Colocar el símbolo con el nivel seleccionado
    if (LevelSelector.pendingTool && typeof placeSymbolWithLevel === 'function') {
        placeSymbolWithLevel(
            LevelSelector.pendingX, 
            LevelSelector.pendingY, 
            LevelSelector.pendingTool,
            level
        );
    }
    
    // Limpiar estado temporal
    LevelSelector.pendingTool = null;
    LevelSelector.pendingX = null;
    LevelSelector.pendingY = null;
}

/**
 * Cancelar selección de nivel
 */
function cancelLevelSelection() {
    const popup = document.getElementById('levelSelectorPopup');
    if (popup) {
        popup.classList.remove('show');
    }
    
    // Limpiar estado temporal
    LevelSelector.pendingTool = null;
    LevelSelector.pendingX = null;
    LevelSelector.pendingY = null;
}

/**
 * Obtener último nivel seleccionado (para usar como default)
 */
function getLastSelectedLevel() {
    return LevelSelector.selectedLevel;
}

// Exportar funciones globales
window.LevelSelector = LevelSelector;
window.showLevelSelector = showLevelSelector;
window.selectLevel = selectLevel;
window.cancelLevelSelection = cancelLevelSelection;
window.getLastSelectedLevel = getLastSelectedLevel;

console.log('✅ Selector de nivel cargado');