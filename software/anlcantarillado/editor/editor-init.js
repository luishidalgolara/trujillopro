// ================================
// EDITOR INIT
// Inicialización y configuración del editor
// ================================
let contadorImagenes = 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing editor...');
    const workspace = document.getElementById('workspace');
    const drawingBoard = document.getElementById('drawingBoard');
    const tracingSvg = document.getElementById('tracingSvg');
    
    if (!workspace || !drawingBoard || !tracingSvg) {
        console.error('Critical elements missing:', { workspace, drawingBoard, tracingSvg });
        return;
    }
    
    const formatoActual = plans[currentPlanIndex].format;
    const datosFormato = formats[formatoActual];
    tracingSvg.setAttribute('viewBox', `0 0 ${datosFormato.width} ${datosFormato.height}`);
    
    currentViewBox = { 
        x: 0, 
        y: 0, 
        width: datosFormato.width, 
        height: datosFormato.height 
    };
    
    const viewBoxAplicado = tracingSvg.getAttribute('viewBox');
    console.log(`🔧 DOM inicialización: Formato ${formatoActual} → ViewBox aplicado: "${viewBoxAplicado}" → Esperado: "0 0 ${datosFormato.width} ${datosFormato.height}"`);
    
    if (viewBoxAplicado !== `0 0 ${datosFormato.width} ${datosFormato.height}`) {
        console.warn('⚠️ ViewBox inicial incorrecto, re-forzando...');
        setTimeout(() => {
            tracingSvg.setAttribute('viewBox', `0 0 ${datosFormato.width} ${datosFormato.height}`);
            console.log(`🔧 ViewBox re-forzado: ${tracingSvg.getAttribute('viewBox')}`);
        }, 100);
    }
    
    window.EditorPlans.actualizarInfoPlano();
    setupDragAndDrop();
    configurarManejoArchivos();
    setupEditableTexts();
    setupDraggableElements();
    setupZoom();
    initializeTracing();
    window.EditorPlans.cargarPlanoActual();
    window.EditorPlans.actualizarPanelPlanos();
    
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    
    console.log('✅ Editor initialization completed - ViewBox forzado y validado');
    showStatus(`✅ Editor ROBUSTO cargado - Área completa ${datosFormato.width}×${datosFormato.height}px disponible`, 3000);
});

function configurarManejoArchivos() {
    document.getElementById('pdfFiles').addEventListener('change', function(e) {
        window.EditorLoaders.manejarArchivosPDF(e.target.files);
    });
}

/**
 * Abre el proyecto de Agua Potable en nueva pestaña
 */
function abrirProyectoAguaPotable() {
    console.log('🚰 Abriendo proyecto Agua Potable...');
    window.open('agua_potable/index.html', '_blank');
}

// Exponer imageCounter globalmente
window.imageCounter = contadorImagenes;
Object.defineProperty(window, 'imageCounter', {
    get: function() { return contadorImagenes; },
    set: function(value) { contadorImagenes = value; }
});

// Alias para compatibilidad
window.setupFileHandling = configurarManejoArchivos;

// Exportar
window.EditorInit = {
    configurarManejoArchivos,
    abrirProyectoAguaPotable  // Exportar también la nueva función
};

console.log('✅ editor-init.js cargado');