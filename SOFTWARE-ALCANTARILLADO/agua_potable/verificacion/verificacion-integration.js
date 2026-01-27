// js/verificacion-integration.js - NUEVO ARCHIVO COMPLETO
import { verificarSistema } from './calculations.js';
import { connections } from '../js/config.js';

let isDraggingVerificacion = false;
let offsetXVerificacion = 0;
let offsetYVerificacion = 0;
let isMinimized = false;
let isMaximized = false;
let previousSize = {};

export function abrirVerificacion(presionInicial = 14) {
    console.log('🔍 Abriendo modal de verificación...');
    
    const modal = document.getElementById('modalVerificacion');
    const contenido = document.getElementById('contenidoVerificacion');
    
    if (!modal || !contenido) {
        console.error('❌ Modal de verificación no encontrado');
        return;
    }
    
    modal.classList.add('active');
    
    contenido.innerHTML = `
        <div class="verificacion-loading">
            <div class="spinner"></div>
            Calculando pérdidas de carga...
        </div>
    `;
    
    setTimeout(() => {
        if (connections.length === 0) {
            contenido.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #64748b;">
                    <h2 style="font-size: 24px; margin-bottom: 10px;">⚠️ Sin Trazado</h2>
                    <p>Genera primero el trazado automático para verificar diámetros</p>
                </div>
            `;
            return;
        }
        
        const resultado = verificarSistema(connections, presionInicial);
        mostrarResultados(resultado);
    }, 500);
}

function mostrarResultados(resultado) {
    const contenido = document.getElementById('contenidoVerificacion');
    const { resultados, verificacion, tablaHTML } = resultado;
    
    let problemasHTML = '';
    if (verificacion.problemas.length > 0) {
        problemasHTML = `
            <div class="verificacion-problemas">
                <h3>⚠️ Problemas Detectados</h3>
                ${verificacion.problemas.map(p => `
                    <div class="problema-item">
                        <strong>${p.tipo}:</strong> ${p.mensaje}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    let recomendacionesHTML = '';
    if (verificacion.recomendaciones.length > 0) {
        recomendacionesHTML = `
            <div class="verificacion-recomendaciones">
                <h3>💡 Recomendaciones</h3>
                ${verificacion.recomendaciones.map(r => `
                    <div class="recomendacion-item">${r}</div>
                `).join('')}
            </div>
        `;
    }
    
    contenido.innerHTML = `
        <div class="verificacion-resumen">
            <h3>📊 Resumen del Sistema</h3>
            <div class="resumen-grid">
                <div class="resumen-item">
                    <div class="resumen-item-label">Tramos Analizados</div>
                    <div class="resumen-item-value">${verificacion.resumen.tramosAnalizados}</div>
                </div>
                <div class="resumen-item ok">
                    <div class="resumen-item-label">Tramos OK</div>
                    <div class="resumen-item-value">${verificacion.resumen.tramosOK}</div>
                </div>
                <div class="resumen-item revisar">
                    <div class="resumen-item-label">Tramos a Revisar</div>
                    <div class="resumen-item-value">${verificacion.resumen.tramosRevisar}</div>
                </div>
                <div class="resumen-item ${verificacion.resumen.presionFinal >= 10 ? 'ok' : 'revisar'}">
                    <div class="resumen-item-label">Presión Final</div>
                    <div class="resumen-item-value">${verificacion.resumen.presionFinal.toFixed(2)} m.c.a.</div>
                </div>
            </div>
        </div>
        
        ${problemasHTML}
        ${recomendacionesHTML}
        
        <div style="margin-bottom: 20px;">
            <h3 style="color: #1e3a8a; margin-bottom: 15px;">📋 Detalle por Tramo</h3>
            ${tablaHTML}
        </div>
        
        <div class="criterios-diseño">
            <h3>✓ Criterios de Diseño</h3>
            <ul>
                <li>✓ Velocidad máxima: <strong>2.0 m/s</strong></li>
                <li>✓ Velocidad ideal: <strong>1.0 m/s</strong></li>
                <li>✓ Velocidad mínima: <strong>0.6 m/s</strong></li>
                <li>✓ Presión mínima: <strong>10 m.c.a.</strong></li>
                <li>✓ Presión ideal: <strong>14 m.c.a.</strong></li>
                <li>✓ Fórmula utilizada: <strong>Hazen-Williams</strong></li>
                <li>✓ Coeficiente C (PPR): <strong>140</strong></li>
            </ul>
        </div>
    `;
}

export function cerrarVerificacion() {
    const modal = document.getElementById('modalVerificacion');
    const ventana = document.getElementById('ventanaVerificacion');
    
    if (modal) {
        modal.classList.remove('active');
    }
    
    if (ventana) {
        ventana.classList.remove('minimized', 'maximized');
    }
    
    isMinimized = false;
    isMaximized = false;
}

export function minimizarVerificacion() {
    const ventana = document.getElementById('ventanaVerificacion');
    
    if (!isMinimized) {
        previousSize = {
            width: ventana.style.width,
            height: ventana.style.height
        };
        ventana.classList.add('minimized');
        isMinimized = true;
    } else {
        ventana.classList.remove('minimized');
        isMinimized = false;
    }
}

export function maximizarVerificacion() {
    const ventana = document.getElementById('ventanaVerificacion');
    
    if (!isMaximized) {
        ventana.classList.add('maximized');
        isMaximized = true;
    } else {
        ventana.classList.remove('maximized');
        isMaximized = false;
    }
}

const headerVerificacion = document.getElementById('headerVerificacion');
if (headerVerificacion) {
    headerVerificacion.addEventListener('mousedown', function(e) {
        const ventana = document.getElementById('ventanaVerificacion');
        if (ventana.classList.contains('maximized') || ventana.classList.contains('minimized')) return;
        
        isDraggingVerificacion = true;
        const rect = ventana.getBoundingClientRect();
        offsetXVerificacion = e.clientX - rect.left;
        offsetYVerificacion = e.clientY - rect.top;
        
        ventana.style.position = 'fixed';
    });
}

document.addEventListener('mousemove', function(e) {
    if (!isDraggingVerificacion) return;
    
    const ventana = document.getElementById('ventanaVerificacion');
    ventana.style.left = (e.clientX - offsetXVerificacion) + 'px';
    ventana.style.top = (e.clientY - offsetYVerificacion) + 'px';
});

document.addEventListener('mouseup', function() {
    isDraggingVerificacion = false;
});

window.abrirVerificacion = abrirVerificacion;
window.cerrarVerificacion = cerrarVerificacion;
window.minimizarVerificacion = minimizarVerificacion;
window.maximizarVerificacion = maximizarVerificacion;