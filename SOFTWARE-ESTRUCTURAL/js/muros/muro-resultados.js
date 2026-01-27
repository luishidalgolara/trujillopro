/**
 * MURO-RESULTADOS.JS
 * Generación de HTML para mostrar resultados del diseño
 */

const MuroResultados = {
    /**
     * Mostrar resultados en el panel de salida
     */
    mostrar(datos) {
        const resultadosDiv = document.getElementById('resultados');
        
        let html = '<h3>📐 Geometría del Muro</h3>';
        html += `<div class="result-item"><strong>Altura:</strong> <span class="result-value">${datos.H.toFixed(2)} m</span></div>`;
        html += `<div class="result-item"><strong>Ancho de Zapata:</strong> <span class="result-value">${datos.B.toFixed(2)} m</span></div>`;
        html += `<div class="result-item"><strong>Espesor Base/Corona:</strong> <span class="result-value">${(datos.t_base * 100).toFixed(0)}/${(datos.t_corona * 100).toFixed(0)} cm</span></div>`;
        
        html += '<h3>⚡ Empuje del Suelo</h3>';
        html += `<div class="result-item"><strong>Coeficiente Ka:</strong> <span class="result-value">${datos.Ka.toFixed(3)}</span></div>`;
        html += `<div class="result-item"><strong>Empuje Total (Pa):</strong> <span class="result-value">${datos.Pa.toFixed(2)} kN/m</span></div>`;
        html += `<div class="result-item"><strong>- Empuje del Suelo:</strong> <span class="result-value">${datos.Pa_suelo.toFixed(2)} kN/m</span></div>`;
        html += `<div class="result-item"><strong>- Empuje Sobrecarga:</strong> <span class="result-value">${datos.Pa_sobrecarga.toFixed(2)} kN/m</span></div>`;
        html += `<div class="result-item"><strong>Peso Total:</strong> <span class="result-value">${datos.W_total.toFixed(2)} kN/m</span></div>`;
        
        html += '<h3>✓ Verificación al Volteo</h3>';
        const claseVolteo = datos.cumple_volteo ? 'alert-success' : 'alert-danger';
        html += `<div class="alert ${claseVolteo}"><strong>FS Volteo:</strong> ${datos.FS_volteo.toFixed(2)}<br>Mínimo requerido: 1.50<br>${datos.cumple_volteo ? '✓ CUMPLE' : '✗ NO CUMPLE'}</div>`;
        
        html += '<h3>✓ Verificación al Deslizamiento</h3>';
        const claseDesl = datos.cumple_desl ? 'alert-success' : 'alert-danger';
        html += `<div class="alert ${claseDesl}"><strong>FS Deslizamiento:</strong> ${datos.FS_desl.toFixed(2)}<br>Mínimo requerido: 1.50<br>${datos.cumple_desl ? '✓ CUMPLE' : '✗ NO CUMPLE'}</div>`;
        
        html += '<h3>✓ Verificación de Presión</h3>';
        html += `<div class="result-item"><strong>Excentricidad:</strong> <span class="result-value">${(datos.e * 100).toFixed(1)} cm</span></div>`;
        html += `<div class="result-item"><strong>q máx:</strong> <span class="result-value">${datos.q_max.toFixed(2)} kPa</span></div>`;
        html += `<div class="result-item"><strong>q mín:</strong> <span class="result-value">${datos.q_min.toFixed(2)} kPa</span></div>`;
        const clasePresion = datos.cumple_presion ? 'alert-success' : 'alert-danger';
        html += `<div class="alert ${clasePresion}"><strong>q admisible:</strong> ${datos.qadm.toFixed(2)} kPa<br>${datos.cumple_presion ? '✓ CUMPLE' : '✗ NO CUMPLE'}</div>`;
        
        html += '<h3>🔩 Diseño de Acero</h3>';
        html += `<div class="result-item"><strong>Acero del Muro:</strong> <span class="result-value">φ${datos.dist_muro.diametro} @ ${datos.dist_muro.espaciamiento} cm</span></div>`;
        html += `<div class="result-item"><strong>Acero Zapata (talón):</strong> <span class="result-value">φ${datos.dist_talon.diametro} @ ${datos.dist_talon.espaciamiento} cm</span></div>`;
        
        html += '<h3>📋 Resumen</h3>';
        html += `<div class="alert alert-success"><strong>MURO ${datos.tipo.toUpperCase()} - H=${datos.H.toFixed(1)}m</strong><br>
        Zapata: ${datos.B.toFixed(2)}x${(datos.h_zapata * 100).toFixed(0)}cm<br>
        Acero muro: φ${datos.dist_muro.diametro}@${datos.dist_muro.espaciamiento}cm<br>
        Acero zapata: φ${datos.dist_talon.diametro}@${datos.dist_talon.espaciamiento}cm<br>
        Drenaje: Incluir barbacanas φ75mm cada 2m</div>`;
        
        resultadosDiv.innerHTML = html;
    }
};
