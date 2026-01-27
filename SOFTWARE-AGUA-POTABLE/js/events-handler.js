// js/events-handler.js - COMPLETO CON MANEJO DE CONTENEDOR MEDIDOR
import { svg, selectedElement, isNavigationMode, isDraggingText, currentTool, elements } from './config.js';
import { setCurrentTool } from './config.js';
import { handlePanStart, handlePanMove, handlePanEnd, handleZoom } from './zoom-pan.js';
import { handleFileLoad } from './pdf-handler.js';
import { deleteSelectedElement, deselectElement, selectElement, addElementWithAutoConnection, selectLabelContainer, deleteSelectedLabelContainer, getSelectedLabelContainer } from './elements-manager.js';
import { tryCreateConnection } from './intelligent-tracing.js';
import { getAccurateSVGCoords } from './utils.js';
import { showStatus } from './utils.js';
import { endTextGroupDrag, toggleLabelOnPipeClick } from '../draggable-texts/index.js';

export function initializeEventListeners() {
    console.log('[AGUA POTABLE MST HIDRÁULICO] Configurando event listeners...');
    
    svg.addEventListener('click', handleCentralClick, false);
    svg.addEventListener('wheel', handleZoom, { passive: false });
    svg.addEventListener('mousedown', handlePanStart);
    svg.addEventListener('mousemove', handlePanMove);
    svg.addEventListener('mouseup', handlePanEnd);
    svg.addEventListener('mouseleave', handlePanEnd);
    
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.removeEventListener('change', handleFileLoad);
        fileInput.addEventListener('change', handleFileLoad);
    }
    
    svg.addEventListener('contextmenu', (e) => {
        const target = e.target;
        const isTracingLine = target.classList?.contains('pipe-line') || 
                             (target.tagName === 'line' && target.hasAttribute('data-from') && target.hasAttribute('data-to'));
        
        if (!isTracingLine) {
            e.preventDefault();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Delete' && !isNavigationMode) {
            e.preventDefault();
            
            // ✅ INTENTAR BORRAR CONTENEDOR PRIMERO
            if (deleteSelectedLabelContainer()) {
                return;
            }
            
            // SI NO HAY CONTENEDOR, BORRAR ELEMENTO NORMAL
            if (selectedElement) {
                deleteSelectedElement();
            }
        }
        
        if (e.key === 'Escape') {
            e.preventDefault();
            deselectElement();
            
            if (isDraggingText) {
                endTextGroupDrag(e);
            }
            
            if (currentTool) {
                setCurrentTool(null);
                const allToolButtons = document.querySelectorAll('.btn-tool');
                allToolButtons.forEach(btn => btn.classList.remove('active'));
                showStatus('🚫 Herramienta deseleccionada');
            }
        }
    });
    
    console.log('[AGUA POTABLE MST HIDRÁULICO] Event listeners configurados correctamente');
}

export function handleCentralClick(e) {
    // ✅ SALIR si hay herramienta CAD activa (CORREGIDO)
    if (window.DrawingState?.isActive) return;
    
    if (e.type !== 'click' || isNavigationMode || isDraggingText) return;
    
    e.stopPropagation();
    
    const clickTarget = e.target;
    
    // ✅ NUEVO: SI ESTAMOS EN MODO ETIQUETA Y HACEMOS CLIC EN TUBERÍA
    import('./config.js').then(config => {
        if (config.etiquetaMode) {
            const isPipe = clickTarget.classList?.contains('pipe-line') || 
                           (clickTarget.tagName === 'line' && clickTarget.hasAttribute('data-from') && clickTarget.hasAttribute('data-to'));
            
            if (isPipe) {
                import('./draggable-texts.js').then(textModule => {
                    textModule.toggleLabelOnPipeClick(clickTarget);
                });
                return;
            } else {
                showStatus('⚠️ Haz clic en una tubería para agregar etiqueta');
                return;
            }
        }
    });
    
    // ✅ NUEVO: DETECTAR CLIC EN CONTENEDOR MEDIDOR
    const labelContainer = clickTarget.closest('g.medidor-label-container');
    if (labelContainer) {
        selectLabelContainer(labelContainer);
        return;
    }
    
    const elementGroup = clickTarget.closest('g[id^="element-"]');
    if (elementGroup) {
        const elementId = parseInt(elementGroup.id.replace('element-', ''));
        const element = elements.find(el => el.id === elementId);
        
        if (element) {
            if (selectedElement && selectedElement.id !== element.id) {
                tryCreateConnection(selectedElement, element);
                return;
            } else {
                selectElement(element);
                return;
            }
        }
    }
    
    if (!currentTool) {
        showStatus('⚠️ Selecciona una herramienta primero');
        return;
    }
    
    const svgCoords = getAccurateSVGCoords(e);
    addElementWithAutoConnection(currentTool, svgCoords.x, svgCoords.y);
}