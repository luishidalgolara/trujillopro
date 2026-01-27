// ========================================
// FUNCIONES AUXILIARES PARA COLOR Y GROSOR
// ========================================

/**
 * Seleccionar color
 */
function selectColor(color) {
    AppState.currentColor = color;
    
    // Actualizar botones de color
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Marcar el botón activo
    const btn = event.target;
    if (btn) {
        btn.classList.add('active');
    }
    
    // Actualizar el selector de color personalizado
    const customPicker = document.getElementById('customColorPicker');
    if (customPicker) {
        customPicker.value = color;
    }
    
    updateStatus(`Color seleccionado: ${color}`);
    console.log('🎨 Color seleccionado:', color);
}

/**
 * Inicializar controles de color y grosor
 */
function initializeDrawingControls() {
    // Selector de color personalizado
    const customPicker = document.getElementById('customColorPicker');
    if (customPicker) {
        customPicker.addEventListener('input', function(e) {
            AppState.currentColor = e.target.value;
            
            // Desmarcar todos los botones predefinidos
            document.querySelectorAll('.color-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            updateStatus(`Color personalizado: ${e.target.value}`);
            console.log('🎨 Color personalizado:', e.target.value);
        });
    }
    
    // Control de grosor
    const strokeSlider = document.getElementById('strokeWidthSlider');
    const strokeValue = document.getElementById('strokeWidthValue');
    if (strokeSlider && strokeValue) {
        strokeSlider.addEventListener('input', function(e) {
            AppState.strokeWidth = parseInt(e.target.value);
            strokeValue.textContent = AppState.strokeWidth + 'px';
            console.log('📏 Grosor seleccionado:', AppState.strokeWidth);
        });
    }
    
    console.log('✅ Controles de dibujo inicializados');
}

// Exportar funciones
window.selectColor = selectColor;
window.initializeDrawingControls = initializeDrawingControls;