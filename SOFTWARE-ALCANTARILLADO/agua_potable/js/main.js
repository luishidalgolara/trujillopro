// js/main.js - CORREGIDO CON VIEWPORT INICIALIZADO
import { setSvg, elements } from './config.js';
import { debugLog, checkPDFJS, showStatus } from './utils.js';
import { initializeEventListeners } from './events-handler.js';
import { selectScale } from './scale-manager.js';
import { selectTool, toggleMode, clearAll, loadFloorPlan } from './ui-manager.js';
import { generateIntelligentTracing, generarTrazadoPorNivel } from './intelligent-tracing.js';
import { exportResults } from './export-manager.js';
import { resetView, initializeViewport } from './zoom-pan.js';
import { previousPage, nextPage, removePDF } from './pdf-handler.js';
import { changeFormat } from './format-manager.js';
import { calcularGastosAcumulados, dibujarGastosEnTrazado } from './gastos-acumulados.js';

window.appActions = {
    selectScale: (scale) => selectScale(scale, event),
    selectTool,
    toggleMode,
    clearAll,
    loadFloorPlan,
    generateIntelligentTracing,
    generarTrazadoNivel2: () => generarTrazadoNivel2Independiente(),
    calcularYMostrarGastos: () => calcularYMostrarGastosWrapper(),
    exportResults,
    resetView,
    previousPage,
    nextPage,
    removePDF,
    changeFormat,
    verificarDiametros: () => {
        if (window.abrirVerificacion) {
            window.abrirVerificacion(14);
        }    
    },
    // ✅ NUEVA FUNCIÓN
    toggleEtiquetaMode: () => toggleEtiquetaMode()
};

// ✅ NUEVA FUNCIÓN COMPLETA - Agregar después de window.appActions
function toggleEtiquetaMode() {
    import('./config.js').then(config => {
        const newMode = !config.etiquetaMode;
        config.setEtiquetaMode(newMode);
        
        const btn = document.getElementById('btnEtiquetas');
        if (btn) {
            if (newMode) {
                btn.classList.add('active');
                btn.style.background = '#ef4444';
                showStatus('🏷️ Modo ETIQUETAS activado - Haz clic en una tubería');
            } else {
                btn.classList.remove('active');
                btn.style.background = '#f59e0b';
                showStatus('🏷️ Modo ETIQUETAS desactivado');
            }
        }
    });
}

function generarTrazadoNivel2Independiente() {
    const elementosNivel2 = elements.filter(el => el.nivel === 2);
    console.log('🔍 Verificando elementos nivel 2:', elementosNivel2);
    
    if (elementosNivel2.length === 0) {
        showStatus('⚠️ No hay elementos en 2° nivel');
        return;
    }
    
    const conexionNivel2 = elementosNivel2.find(el => el.type === 'conexion-nivel-2');
    console.log('🔍 Conexión nivel 2 encontrada:', conexionNivel2);
    
    if (!conexionNivel2) {
        showStatus('⚠️ Necesitas agregar una CONEXIÓN 2° NIVEL');
        return;
    }
    
    const svg = document.getElementById('plano');
    if (svg) {
        svg.querySelectorAll('.pipe-line.nivel-2').forEach(el => el.remove());
        svg.querySelectorAll('g.flow-arrow.nivel-2').forEach(el => el.remove());
        svg.querySelectorAll('text[data-connection][data-nivel="2"]').forEach(el => el.remove());
        svg.querySelectorAll('line[data-connection-divider][data-nivel="2"]').forEach(el => el.remove());
        svg.querySelectorAll('g[data-connection-group][data-nivel="2"]').forEach(el => el.remove());
    }
    
    console.log('🔴 Generando trazado NIVEL 2 independiente...');
    generarTrazadoPorNivel(elementosNivel2, 2);
    showStatus('⚡ Trazado 2° nivel generado correctamente', 3000);
}

function calcularYMostrarGastosWrapper() {
    const todosLosElementos = elements;
    const todasLasConexiones = window.connections || [];
    
    if (todasLasConexiones.length === 0) {
        showStatus('⚠️ Genera el trazado primero', 3000);
        return;
    }
    
    const gastosCalculados = calcularGastosAcumulados(todasLasConexiones, todosLosElementos);
    dibujarGastosEnTrazado(gastosCalculados, 1);
    
    showStatus('✅ Gastos acumulados calculados y dibujados', 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    debugLog('DOM cargado - Inicializando sistema de agua potable inteligente hidráulico...');
    
    const svg = document.getElementById('plano');
    if (!svg) {
        debugLog('ERROR: SVG no encontrado');
        return;
    }
    
    setSvg(svg);
    initializeViewport();
    initializeEventListeners();
    checkPDFJS();
    selectScale('1:50', { target: document.querySelector('[data-scale="50"]') });
    
    showStatus('✅ Sistema de Agua Potable Inteligente con GASTOS ACUMULADOS cargado!', 5000);
});