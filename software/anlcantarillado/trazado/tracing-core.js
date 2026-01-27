// Estado del modo edición
let estadoEdicionTrazado = {
    activo: false,
    trazadoOriginal: null,
    lineasOriginales: [],
    herramientaActual: null,
    puntoInicio: null,
    lineaTemporal: null,
    lineaSeleccionada: null
};

function clonarTrazado() {
    const currentPlan = plans[currentPlanIndex];
    return JSON.parse(JSON.stringify(currentPlan.tracingConnections));
}

function restaurarTrazado(trazadoBackup) {
    const currentPlan = plans[currentPlanIndex];
    currentPlan.tracingConnections = JSON.parse(JSON.stringify(trazadoBackup));
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
    const cameraContainers = tracingSvg.querySelectorAll('.camera-info-container');
    cameraContainers.forEach(container => container.remove());
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
    const cameraContainers = tracingSvg.querySelectorAll('.camera-info-container');
    elements.forEach(el => el.remove());
    lines.forEach(el => el.remove());
    arrows.forEach(el => el.remove());
    labels.forEach(el => el.remove());
    cameraContainers.forEach(el => el.remove());
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

console.log('Trazado - Core cargado');