// js/format-manager.js
import { getSvg } from './config.js';

export function changeFormat(formato) {
    const svg = getSvg();
    if (!svg) {
        console.error('SVG no encontrado');
        return;
    }

    const formats = {
        A1: { 
            width: 900,
            height: 630,
            name: 'A1', 
            realWidth: 841,
            realHeight: 594
        },
        A0: { 
            width: 1300,
            height: 920,
            name: 'A0', 
            realWidth: 1189,
            realHeight: 841
        }
    };

    document.querySelectorAll('.format-btn').forEach(btn => btn.classList.remove('active'));
    
    const btnActivo = document.getElementById(`btn${formato}`);
    if (btnActivo) {
        btnActivo.classList.add('active');
    }

    const board = document.getElementById('drawingBoard');
    if (board) {
        board.className = `drawing-board format-${formato.toLowerCase()}`;
    }

    const datosFormato = formats[formato];
    svg.setAttribute('viewBox', `0 0 ${datosFormato.width} ${datosFormato.height}`);

    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = `✅ Formato cambiado a ${formato} (${datosFormato.realWidth} × ${datosFormato.realHeight} mm)`;
        statusElement.style.display = 'block';
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 3000);
    }

    console.log(`🔧 Formato cambiado: ${formato} → ViewBox: ${datosFormato.width}×${datosFormato.height}px`);
}