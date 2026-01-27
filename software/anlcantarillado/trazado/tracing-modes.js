function toggleMode() {
    const currentPlan = plans[currentPlanIndex];
    currentPlan.tracingMode = !currentPlan.tracingMode;
    isNavigationMode = currentPlan.tracingMode;
    const modeButton = document.getElementById('modeToggle');
    const drawingBoard = document.getElementById('drawingBoard');
    if (isNavigationMode) {
        modeButton.textContent = '🔍 Navegación';
        modeButton.classList.add('navigation');
        drawingBoard.classList.add('navigation-mode');
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        currentPlan.currentTool = null;
        deselectAllElements();
        showStatus('🔍 Modo Navegación: Usa rueda para zoom, clic y arrastra para pan');
    } else {
        modeButton.textContent = '🖱️ Edición';
        modeButton.classList.remove('navigation');
        drawingBoard.classList.remove('navigation-mode');
        zoomLevel = 1;
        forceCorrectViewBox();
        updateTracingViewBox();
        updateTracingElementSizes();
        showStatus('✏️ Modo Edición: Selecciona herramientas, elementos individuales o arrastra para selección rectangular');
    }
}

function selectScale(scale) {
    document.querySelectorAll('.scale-btn').forEach(btn => btn.classList.remove('active'));
    const scaleValue = scale.replace('1:', '');
    const clickedButton = document.querySelector(`[data-scale="${scaleValue}"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    const currentPlan = plans[currentPlanIndex];
    currentPlan.tracingScale = parseInt(scaleValue);
    showStatus(`📐 Escala cambiada a ${scale}`);
}

function selectTool(tool) {
    if (isNavigationMode) {
        showStatus('⚠️ Cambia a modo Edición para seleccionar herramientas');
        return;
    }
    
    // Cerrar cualquier selector abierto
    document.querySelectorAll('.nivel-selector').forEach(sel => sel.remove());
    
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    
    const currentPlan = plans[currentPlanIndex];
    
    if (tool === 'texto') {
        showTextModal();
        return;
    }
    
    if (tool === 'rosa-norte') {
        createNorthRose();
        return;
    }
    
    // Herramientas que NO necesitan selector de nivel
    const herramientasSinNivel = ['camara-inspeccion', 'camara-publica', 'caja-registro'];
    
    if (herramientasSinNivel.includes(tool)) {
        // DESACTIVAR POINTER-EVENTS DE ELEMENTOS DE DIBUJO
        document.querySelectorAll('[class^="drawing-"]').forEach(el => {
            el.style.pointerEvents = 'none';
        });
        
        if (event && event.target) {
            event.target.classList.add('active');
        }
        
        currentPlan.currentTool = tool;
        currentPlan.nivelSeleccionado = 1; // Por defecto nivel 1
        
        let info = `🔧 ${tool.toUpperCase()} seleccionado`;
        if (NORMATIVA_DESCARGAS[tool]) {
            info += ` - PVC ⌀${NORMATIVA_DESCARGAS[tool].tuberia_diametro}mm`;
        }
        showStatus(info);
        return;
    }
    
    // MOSTRAR SELECTOR DE NIVEL
    const boton = event.target.closest('.tool-btn');
    if (!boton) return;
    
    boton.classList.add('active');
    
    // Obtener posición del botón
    const rect = boton.getBoundingClientRect();
    
    const selector = document.createElement('div');
    selector.className = 'nivel-selector show';
    selector.style.position = 'fixed';
    selector.style.top = (rect.bottom + 5) + 'px';
    selector.style.left = rect.left + 'px';
    
    const opcion1 = document.createElement('div');
    opcion1.className = 'nivel-option nivel-1';
    opcion1.textContent = '🔴 1° NIVEL';
    opcion1.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        seleccionarNivelParaHerramienta(tool, 1);
    });
    
    const opcion2 = document.createElement('div');
    opcion2.className = 'nivel-option nivel-2';
    opcion2.textContent = '🔵 2° NIVEL';
    opcion2.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        seleccionarNivelParaHerramienta(tool, 2);
    });
    
    selector.appendChild(opcion1);
    selector.appendChild(opcion2);
    
    document.body.appendChild(selector);
    
    // Cerrar al hacer click fuera
    setTimeout(() => {
        document.addEventListener('click', function cerrarSelector(e) {
            if (!selector.contains(e.target) && !boton.contains(e.target)) {
                selector.remove();
                boton.classList.remove('active');
                document.removeEventListener('click', cerrarSelector);
            }
        });
    }, 100);
}

function seleccionarNivelParaHerramienta(tool, nivel) {
    const currentPlan = plans[currentPlanIndex];
    
    // DESACTIVAR POINTER-EVENTS DE ELEMENTOS DE DIBUJO
    document.querySelectorAll('[class^="drawing-"]').forEach(el => {
        el.style.pointerEvents = 'none';
    });
    
    currentPlan.currentTool = tool;
    currentPlan.nivelSeleccionado = nivel;
    
    let info = `🔧 ${tool.toUpperCase()} seleccionado - NIVEL ${nivel}`;
    if (NORMATIVA_DESCARGAS[tool]) {
        info += ` - PVC ⌀${NORMATIVA_DESCARGAS[tool].tuberia_diametro}mm`;
    }
    showStatus(info);
    
    // Cerrar selector
    document.querySelectorAll('.nivel-selector').forEach(sel => sel.remove());
}

window.seleccionarNivelParaHerramienta = seleccionarNivelParaHerramienta;