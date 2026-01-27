// js/utils.js
import { svg } from './config.js';

export function calcularDistancia(elemento1, elemento2) {
    return Math.sqrt(
        Math.pow(elemento2.x - elemento1.x, 2) + Math.pow(elemento2.y - elemento1.y, 2)
    );
}

export function getAccurateSVGCoords(event) {
    try {
        const pt = svg.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        
        const ctm = svg.getScreenCTM();
        if (!ctm) {
            console.warn('No se pudo obtener CTM, usando método alternativo');
            return getAccurateSVGCoordsAlternative(event);
        }
        
        const svgP = pt.matrixTransform(ctm.inverse());
        
        return {
            x: Math.round(svgP.x * 100) / 100,
            y: Math.round(svgP.y * 100) / 100
        };
    } catch (error) {
        console.warn('Método SVG nativo falló, usando método alternativo:', error);
        return getAccurateSVGCoordsAlternative(event);
    }
}

export function getAccurateSVGCoordsAlternative(event) {
    const rect = svg.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const viewBox = svg.viewBox.baseVal;
    
    const svgX = viewBox.x + (x / rect.width) * viewBox.width;
    const svgY = viewBox.y + (y / rect.height) * viewBox.height;
    
    return {
        x: Math.round(svgX * 100) / 100,
        y: Math.round(svgY * 100) / 100
    };
}

export function screenToSVGCoords(screenX, screenY) {
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    
    const svgX = viewBox.x + (screenX / rect.width) * viewBox.width;
    const svgY = viewBox.y + (screenY / rect.height) * viewBox.height;
    
    return {
        x: Math.round(svgX * 10) / 10,
        y: Math.round(svgY * 10) / 10
    };
}

export function debugLog(message, data = null) {
    console.log(`[AGUA POTABLE MST HIDRÁULICO] ${message}`, data || '');
}

export function checkPDFJS() {
    debugLog('Verificando PDF.js...');
    
    if (typeof pdfjsLib === 'undefined') {
        debugLog('PDF.js NO ENCONTRADO - Cargando desde CDN...');
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = function() {
            debugLog('PDF.js cargado dinámicamente');
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            showStatus('PDF.js cargado correctamente', 2000);
        };
        script.onerror = function() {
            debugLog('ERROR: No se pudo cargar PDF.js');
            showStatus('Error: No se pudo cargar PDF.js. Verifique conexión a internet.', 5000);
        };
        document.head.appendChild(script);
    } else {
        debugLog('PDF.js ENCONTRADO - Configurando worker...');
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        showStatus('PDF.js listo para usar', 2000);
    }
}

export function showStatus(message, duration = 3000) {
    const status = document.getElementById('status');
    if (status) {
        status.textContent = message;
        status.classList.add('show');
        setTimeout(() => status.classList.remove('show'), duration);
    }
}