// ========================================
// FUNCIONES DE HERRAMIENTAS
// ========================================

function selectTool(toolName) {
    // Remover clase active de todos los botones
    document.querySelectorAll('.btn-tool').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase active al botón seleccionado
    const toolButton = event.target;
    if (toolButton) {
        toolButton.classList.add('active');
    }
    
    AppState.currentTool = toolName;
    const symbol = ElectricSymbols[toolName];
    
    if (symbol) {
        updateStatus(`Herramienta seleccionada: ${symbol.name} ${symbol.symbol}`);
    }
    
    console.log('🔧 Herramienta seleccionada:', toolName);
}

function selectScale(scale) {
    // Remover clase active de todos los botones de escala
    document.querySelectorAll('.btn-scale').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase active al botón seleccionado
    const scaleButton = event.target;
    if (scaleButton) {
        scaleButton.classList.add('active');
    }
    
    const scaleValue = parseInt(scale.split(':')[1]);
    AppState.currentScale = scaleValue;
    
    updateStatus(`Escala cambiada a ${scale}`);
    console.log('📏 Escala seleccionada:', scale);
}

function changeFormat(format) {
    // Remover clase active de todos los botones de formato
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase active al botón seleccionado
    const formatButton = event.target;
    if (formatButton) {
        formatButton.classList.add('active');
    }
    
    AppState.currentFormat = format;
    const drawingBoard = document.getElementById('drawingBoard');
    
    if (drawingBoard) {
        drawingBoard.className = `drawing-board format-${format.toLowerCase()}`;
    }
    
    // Centrar el drawing board después del cambio
    if (typeof centerDrawingBoard === 'function') {
        setTimeout(centerDrawingBoard, 100);
    }
    
    updateStatus(`Formato cambiado a ${format}`);
    console.log('📐 Formato seleccionado:', format);
}