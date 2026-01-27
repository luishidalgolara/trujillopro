// js/scale-manager.js - CORREGIDO
import { currentScale, connections } from './config.js';
import { setCurrentScale } from './config.js';
import { showStatus } from './utils.js';
import { recalculateAllDistances, updateCalculations } from './calculations.js';

export function selectScale(scale, event) {
    document.querySelectorAll('.btn-scale-small').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const clickedButton = event ? event.target : document.querySelector(`[data-scale="${scale.split(':')[1]}"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    const scaleValue = scale.split(':')[1];
    setCurrentScale(parseInt(scaleValue));
    
    updatePDFScaleInfo();
    
    if (connections.length > 0) {
        recalculateAllDistances();
        updateCalculations();
    }
    
    showStatus(`📐 Escala cambiada a ${scale} - Medidas reales actualizadas`);
}

export function updatePDFScaleInfo() {
    const pdfInfo = document.getElementById('pdfInfo');
    if (pdfInfo && pdfInfo.innerHTML.includes('Escala:')) {
        const fileName = pdfInfo.innerHTML.match(/<strong>Archivo:<\/strong> (.+?)<br>/);
        const fileType = pdfInfo.innerHTML.match(/<strong>Tipo:<\/strong> (.+?)<br>/);
        const dimensions = pdfInfo.innerHTML.match(/<strong>Dimensiones:<\/strong> (.+?)<br>/);
        
        if (fileName && fileType && dimensions) {
            pdfInfo.innerHTML = `
                <strong>Archivo:</strong> ${fileName[1]}<br>
                <strong>Tipo:</strong> ${fileType[1]}<br>
                <strong>Dimensiones:</strong> ${dimensions[1]}<br>
                <strong>Escala:</strong> 1:${currentScale} (actual)
            `;
        }
    }
}