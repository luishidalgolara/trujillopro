/**
 * ZAPATA CORRIDA - MOSTRAR RESULTADOS
 * Generación de HTML con los resultados del cálculo
 */

function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    
    let html = '<h3>📐 Dimensiones de la Zapata</h3>';
    html += `<div class="result-item">
        <strong>Ancho de Zapata (B): <span class="tooltip-icon" data-tooltip="ancho-zapata">❓</span></strong>
        <span class="result-value">${datos.B.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Altura de Zapata (h): <span class="tooltip-icon" data-tooltip="altura-zapata">❓</span></strong>
        <span class="result-value">${datos.h.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Altura Efectiva (d): <span class="tooltip-icon" data-tooltip="altura-efectiva">❓</span></strong>
        <span class="result-value">${(datos.d * 100).toFixed(1)} cm</span>
    </div>`;
    
    html += '<h3>🔧 Cargas y Momentos</h3>';
    html += `<div class="result-item">
        <strong>Carga Última (Pu): <span class="tooltip-icon" data-tooltip="carga-ultima">❓</span></strong>
        <span class="result-value">${datos.Pu.toFixed(2)} kN/m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Momento Último (Mu): <span class="tooltip-icon" data-tooltip="momento-ultimo">❓</span></strong>
        <span class="result-value">${datos.Mu.toFixed(2)} kN·m/m</span>
    </div>`;
    
    html += '<h3>🔩 Diseño de Acero</h3>';
    html += `<div class="result-item">
        <strong>Acero Requerido (As): <span class="tooltip-icon" data-tooltip="acero-requerido">❓</span></strong>
        <span class="result-value">${datos.As.toFixed(2)} cm²/m</span>
    </div>`;
    
    if (datos.distribucion) {
        html += `<div class="result-item">
            <strong>Configuración de Barras: <span class="tooltip-icon" data-tooltip="configuracion-barras">❓</span></strong>
            <span class="result-value">${datos.distribucion.cantidad} φ${datos.distribucion.diametro} @ ${datos.distribucion.espaciamiento} cm</span>
        </div>`;
    }
    
    html += '<h3>✓ Verificaciones</h3>';
    
    // Presión en el suelo
    const clasePres = datos.verificacionPresion.cumple ? 'alert-success' : 'alert-danger';
    html += `<div class="alert ${clasePres}">
        <strong>Presión en el Suelo: <span class="tooltip-icon" data-tooltip="presion-suelo">❓</span></strong><br>
        qactual = ${datos.qactual.toFixed(2)} kPa | qadm = ${datos.qadm.toFixed(2)} kPa<br>
        Uso: ${datos.verificacionPresion.porcentaje}%<br>
        ${datos.verificacionPresion.cumple ? '✓ CUMPLE' : '✗ NO CUMPLE'}
    </div>`;
    
    // SUGERENCIAS SI NO CUMPLE
    if (datos.verificacionPresion.sugerencias && typeof SugerenciasInteligentes !== 'undefined') {
        html += SugerenciasInteligentes.generarHTML(datos.verificacionPresion.sugerencias);
    }
    
    // Cortante
    const claseCort = !datos.cortante.necesitaEstribos ? 'alert-success' : 'alert-warning';
    html += `<div class="alert ${claseCort}">
        <strong>Verificación por Cortante: <span class="tooltip-icon" data-tooltip="cortante-zapata">❓</span></strong><br>
        Vu = ${datos.cortante.phiVc} kN/m | φVc = ${datos.cortante.Vc} kN/m<br>
        ${datos.cortante.necesitaEstribos ? '⚠ Verificar cortante en detalle' : '✓ Hormigón resiste el cortante'}
    </div>`;
    
    // SUGERENCIAS CORTANTE
    if (datos.cortante.sugerencias && typeof SugerenciasInteligentes !== 'undefined') {
        html += SugerenciasInteligentes.generarHTML(datos.cortante.sugerencias);
    }
    
    html += '<h3>📋 Resumen de Diseño</h3>';
    html += `<div class="alert alert-success">
        <strong>ZAPATA CORRIDA ${datos.B.toFixed(2)} x ${datos.h.toFixed(2)} m</strong><br>`;
    
    if (datos.distribucion) {
        html += `Acero longitudinal: ${datos.distribucion.cantidad} φ${datos.distribucion.diametro} @ ${datos.distribucion.espaciamiento} cm<br>`;
    }
    
    html += `Acero transversal: φ10 @ 25 cm (armadura de repartición)<br>
        Recubrimiento: 70 mm (contacto con terreno)
    </div>`;
    
    resultadosDiv.innerHTML = html;
}
