// ============================================================
// TRAZADO - GESTIÓN DE EVENTOS
// Maneja clicks, zoom, pan y acciones del usuario
// ============================================================

function setupTracingEvents() {
    const tracingSvg = document.getElementById('tracingSvg');
    if (!tracingSvg) {
        console.warn('TracingSvg element not found, retrying...');
        setTimeout(setupTracingEvents, 100);
        return;
    }
    
    tracingSvg.addEventListener('click', handleTracingClick);
    tracingSvg.addEventListener('wheel', handleTracingZoom, { passive: false });
    tracingSvg.addEventListener('mousedown', handleTracingPanStart);
    tracingSvg.addEventListener('mousemove', handleTracingPanMove);
    tracingSvg.addEventListener('mouseup', handleTracingPanEnd);
    tracingSvg.addEventListener('mouseleave', handleTracingPanEnd);
    
    console.log('Tracing events setup completed');
}

function handleTracingClick(e) {
    if (isNavigationMode) return;
    
    const currentPlan = plans[currentPlanIndex];
    
    const clickedLabel = e.target.closest('.movable-label');
    if (clickedLabel) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return;
    }
    
    const clickedElement = e.target.closest('g[id^="tracing-element-"]');
    if (clickedElement) {
        if (e.ctrlKey || e.metaKey) {
            toggleElementSelection(clickedElement);
        } else {
            clearSelection();
            selectTracingElement(clickedElement);
        }
        e.stopPropagation();
        return;
    }
    
    // SELECCIONAR CONTENEDOR DE TEXTO DE PUNTO DE DESCARGA
    const clickedLabelGroup = e.target.closest('.element-label-group');
    if (clickedLabelGroup) {
        const elementId = clickedLabelGroup.getAttribute('data-element-id');
        const tracingElement = document.getElementById(`tracing-element-${elementId}`);
        if (tracingElement) {
            if (e.ctrlKey || e.metaKey) {
                toggleElementSelection(tracingElement);
            } else {
                clearSelection();
                selectTracingElement(tracingElement);
            }
        }
        e.stopPropagation();
        return;
    }
    
    if (!currentPlan.currentTool) {
        startRectangularSelection(e);
        return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    const areaData = forceCorrectViewBox();
    const tracingSvg = document.getElementById('tracingSvg');
    const pt = tracingSvg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    
    const svgMatrix = tracingSvg.getScreenCTM().inverse();
    const svgPoint = pt.matrixTransform(svgMatrix);
    
    if (svgPoint.x >= 0 && svgPoint.x <= areaData.width && 
        svgPoint.y >= 0 && svgPoint.y <= areaData.height) {
        
        // ✅ USAR EL NIVEL SELECCIONADO EN currentPlan.nivelSeleccionado
        const nivel = currentPlan.nivelSeleccionado || 1;
        
        if (nivel === 2) {
            // Llamar a la función de nivel 2
            addTracingElementNivel2(currentPlan.currentTool, svgPoint.x, svgPoint.y);
        } else {
            // Llamar a la función de nivel 1
            addTracingElement(currentPlan.currentTool, svgPoint.x, svgPoint.y);
        }
        
        // REACTIVAR POINTER-EVENTS DE ELEMENTOS DE DIBUJO DESPUÉS DE COLOCAR ARTEFACTO
        document.querySelectorAll('[class^="drawing-"]').forEach(el => {
            el.style.pointerEvents = 'all';
        });
        
        showStatus(`✅ ${currentPlan.currentTool.toUpperCase()} - NIVEL ${nivel} colocado en (${Math.round(svgPoint.x)}, ${Math.round(svgPoint.y)}) px`);
    } else {
        showStatus(`⚠️ Fuera del área (${Math.round(svgPoint.x)}, ${Math.round(svgPoint.y)}) - Área válida: ${areaData.width}×${areaData.height}px`);
    }
}

function generateTracing() {
    const currentPlan = plans[currentPlanIndex];
    
    if (currentPlan.tracingElements.length < 2) {
        showStatus('⚠️ Necesitas al menos 2 elementos para generar trazado');
        return;
    }
    
    generateIntelligentHierarchicalTracing();
}

function clearTracing() {
    const currentPlan = plans[currentPlanIndex];
    const tracingSvg = document.getElementById('tracingSvg');
    
    const elements = tracingSvg.querySelectorAll('g[id^="tracing-element-"]');
    elements.forEach(element => element.remove());
    
    clearTracingConnections();
    
    if (isRectangularSelecting) {
        removeSelectionRectangle();
        isRectangularSelecting = false;
    }
    
    clearSelection();
    
    currentPlan.tracingElements = [];
    currentPlan.tracingConnections = [];
    currentPlan.selectedElement = null;
    elementCounter = 0;
    camaraCounter = 0;
    
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    currentPlan.currentTool = null;
    
    // 🆕 REINICIAR CONTEO AUTOMÁTICO
    if (typeof reiniciarConteo === 'function') {
        reiniciarConteo();
    }
    
    showStatus('🗑️ Trazado limpiado');
}

function clearTracingConnections() {
    const tracingSvg = document.getElementById('tracingSvg');
    const lines = tracingSvg.querySelectorAll('.pipe-line');
    const arrows = tracingSvg.querySelectorAll('.flow-arrow');
    const labels = tracingSvg.querySelectorAll('.pipe-label-group');
    
    lines.forEach(line => line.remove());
    arrows.forEach(arrow => arrow.remove());
    labels.forEach(label => label.remove());
}

function clearTracingSVG() {
    const tracingSvg = document.getElementById('tracingSvg');
    if (!tracingSvg) return;
    
    const elements = tracingSvg.querySelectorAll('g[id^="tracing-element-"]');
    const lines = tracingSvg.querySelectorAll('.pipe-line');
    const arrows = tracingSvg.querySelectorAll('.flow-arrow');
    const labels = tracingSvg.querySelectorAll('.pipe-label-group');
    
    elements.forEach(el => el.remove());
    lines.forEach(el => el.remove());
    arrows.forEach(el => el.remove());
    labels.forEach(el => el.remove());
    
    removeSelectionRectangle();
    clearSelection();
}

function initializeTracing() {
    const tracingSvg = document.getElementById('tracingSvg');
    if (tracingSvg) {
        forceCorrectViewBox();
        setupTracingEvents();
        setupKeyboardEvents();
    } else {
        setTimeout(initializeTracing, 100);
    }
}

console.log('✅ Trazado - Events cargado con soporte de niveles');