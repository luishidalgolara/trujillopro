// js/ui-manager.js - COMPLETO CORREGIDO
import { currentTool, isNavigationMode, svg, elements, connections, nivelSeleccionado } from './config.js';
import { setCurrentTool, setIsNavigationMode, clearElements, clearConnections, resetElementCounter, resetValvulaCounter, setNivelSeleccionado } from './config.js';
import { ESPECIFICACIONES_AGUA_POTABLE, FUENTES_CALENTAMIENTO } from './database.js';
import { showStatus } from './utils.js';
import { updateElementList } from './elements-manager.js';
import { deselectElement } from './elements-manager.js';
import { updateCalculations } from './calculations.js';
import { resetView } from './zoom-pan.js';

let selectorActivo = null;

export function selectTool(tool) {
    if (isNavigationMode) {
        showStatus('⚠️ Cambia a modo Edición para seleccionar herramientas');
        return;
    }
    
    deselectElement();
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.classList.contains('btn-scale-small')) {
            btn.classList.remove('active');
        }
    });
    
    const herramientasSinSelector = [
        'medidor-agua',
        'conexion-nivel-2',
        'llave-jardin',
        'punto-conexion',
        'valvula-corte',
        'union-tee'
    ];
    
    if (herramientasSinSelector.includes(tool)) {
        if (event && event.target) {
            event.target.classList.add('active');
        }
        
        setCurrentTool(tool);
        
        if (tool === 'conexion-nivel-2') {
            setNivelSeleccionado(2);
        } else {
            setNivelSeleccionado(1);
        }
        
        let info = `🔧 ${tool.toUpperCase()} seleccionado - NIVEL ${tool === 'conexion-nivel-2' ? 2 : 1}`;
        if (ESPECIFICACIONES_AGUA_POTABLE[tool]) {
            const spec = ESPECIFICACIONES_AGUA_POTABLE[tool];
            if (spec.requiere_caliente) {
                info += ` - Fría: PPR ⌀${spec.tuberia_diametro_fria}mm + Caliente: PPR ⌀${spec.tuberia_diametro_caliente}mm`;
            } else {
                info += ` - Solo agua fría: PPR ⌀${spec.tuberia_diametro_fria}mm`;
            }
        }
        showStatus(info);
        return;
    }
    
    if (event && event.target) {
        mostrarSelectorNivel(tool, event.target);
    }
}

function mostrarSelectorNivel(tool, boton) {
    cerrarSelectorNivel();
    
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
        seleccionarNivelParaHerramienta(tool, 1, boton);
    });
    
    const opcion2 = document.createElement('div');
    opcion2.className = 'nivel-option nivel-2';
    opcion2.textContent = '🔵 2° NIVEL';
    opcion2.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        seleccionarNivelParaHerramienta(tool, 2, boton);
    });
    
    selector.appendChild(opcion1);
    selector.appendChild(opcion2);
    
    document.body.appendChild(selector);
    selectorActivo = selector;
    
    boton.classList.add('active');
    
    setTimeout(() => {
        document.addEventListener('click', function cerrar(e) {
            if (!selector.contains(e.target) && !boton.contains(e.target)) {
                cerrarSelectorNivel();
                boton.classList.remove('active');
                document.removeEventListener('click', cerrar);
            }
        });
    }, 100);
}

function seleccionarNivelParaHerramienta(tool, nivel, boton) {
    setNivelSeleccionado(nivel);
    setCurrentTool(tool);
    
    let info = `🔧 ${tool.toUpperCase()} seleccionado - NIVEL ${nivel}`;
    
    if (ESPECIFICACIONES_AGUA_POTABLE[tool]) {
        const spec = ESPECIFICACIONES_AGUA_POTABLE[tool];
        if (spec.requiere_caliente) {
            info += ` - Fría: PPR ⌀${spec.tuberia_diametro_fria}mm + Caliente: PPR ⌀${spec.tuberia_diametro_caliente}mm`;
        } else {
            info += ` - Solo agua fría: PPR ⌀${spec.tuberia_diametro_fria}mm`;
        }
    }
    
    showStatus(info);
    cerrarSelectorNivel();
}

function cerrarSelectorNivel() {
    if (selectorActivo) {
        selectorActivo.remove();
        selectorActivo = null;
    }
}

export function toggleMode() {
    setIsNavigationMode(!isNavigationMode);
    const modeButton = document.getElementById('modeToggle');
    
    if (isNavigationMode) {
        modeButton.textContent = '🔍 Modo: Navegación';
        modeButton.classList.remove('btn-secondary');
        modeButton.classList.add('mode-navigation');
        svg.classList.add('navigation-mode');
        
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.classList.contains('btn-scale-small')) {
                btn.classList.remove('active');
            }
        });
        setCurrentTool(null);
        deselectElement();
        
        showStatus('🔍 Modo Navegación: Usa rueda para zoom, clic y arrastra para pan');
    } else {
        modeButton.textContent = '🖱️ Modo: Edición';
        modeButton.classList.remove('mode-navigation');
        modeButton.classList.add('btn-secondary');
        svg.classList.remove('navigation-mode');
        
        showStatus('✏️ Modo Edición: Selecciona herramientas y coloca elementos');
    }
}

export function clearAll() {
    deselectElement();
    
    clearElements();
    clearConnections();
    resetElementCounter();
    resetValvulaCounter();

    const pdfBg = svg.querySelector('#pdfBackground');
    const pdfPattern = svg.querySelector('#pdfPattern');
    
    svg.innerHTML = `
        <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" stroke-width="0.5"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
    `;

    if (pdfPattern) {
        const defs = svg.querySelector('defs');
        if (defs) defs.appendChild(pdfPattern);
    }
    if (pdfBg) {
        const gridRect = svg.querySelector('rect[fill="url(#grid)"]');
        if (gridRect) gridRect.insertAdjacentElement('afterend', pdfBg);
    }

    updateElementList();
    updateCalculations();

    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.classList.contains('btn-scale-small')) {
            btn.classList.remove('active');
        }
    });
    setCurrentTool(null);

    showStatus('🗑️ Proyecto limpiado completamente');
}

export function loadFloorPlan() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.click();
    }
}