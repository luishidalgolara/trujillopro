/**
 * ESCALERA-MAIN.JS
 * Cálculos estructurales, UI y coordinación general
 */

let datosEscaleraActual = null;
let vistaActual = '3d';

// Función principal de cálculo
function calcularEscalera() {
    // Obtener valores de entrada
    const tipo = document.getElementById('tipoEscalera').value;
    const H = parseFloat(document.getElementById('altura').value);
    const b = parseFloat(document.getElementById('ancho').value);
    const h = parseFloat(document.getElementById('huella').value) / 100; // convertir a m
    const c = parseFloat(document.getElementById('contrahuella').value) / 100; // convertir a m
    const e = parseFloat(document.getElementById('espesor').value);
    const SC = parseFloat(document.getElementById('sobrecarga').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const fy = parseFloat(document.getElementById('fy').value);
    const apoyo = document.getElementById('apoyo').value;
    
    // Validaciones
    if (H <= 0 || b <= 0 || h <= 0 || c <= 0 || e <= 0) {
        alert('Por favor ingrese valores válidos');
        return;
    }
    
    // VERIFICACIÓN DE NORMA BLONDEL (Ergonomía)
    // 2c + h = 63 a 65 cm (óptimo: 64 cm)
    const blondel = 2 * c * 100 + h * 100; // en cm
    const cumpleBlondel = blondel >= 63 && blondel <= 65;
    const mensajeBlondel = cumpleBlondel ? 
        '✓ Cumple con Fórmula de Blondel (óptimo)' : 
        `⚠ No cumple Blondel (2c+h=${blondel.toFixed(1)}cm, óptimo: 63-65cm)`;
    
    // CÁLCULO DE NÚMERO DE PELDAÑOS
    const nPeldanos = Math.ceil(H / c);
    const cReal = H / nPeldanos; // Contrahuella real ajustada
    
    // LONGITUD HORIZONTAL DE LA ESCALERA
    const L_horizontal = (nPeldanos - 1) * h; // Longitud en planta
    
    // LONGITUD INCLINADA (hipotenusa)
    const L_inclinada = Math.sqrt(Math.pow(H, 2) + Math.pow(L_horizontal, 2));
    
    // ÁNGULO DE INCLINACIÓN
    const angulo = Math.atan(H / L_horizontal) * 180 / Math.PI; // grados
    
    // CÁLCULO DE CARGAS
    // Peso propio: considera el espesor efectivo en la inclinación
    const eEfectivo = e / Math.cos(angulo * Math.PI / 180);
    const PP_losa = eEfectivo * 25; // kN/m² (peso del hormigón)
    const PP_peldanos = (c / 2) * 25; // Peso promedio de peldaños kN/m²
    const acabados = 1.5; // kN/m² (piso, pasamanos, etc)
    
    const CM = PP_losa + PP_peldanos + acabados; // Carga muerta total
    const CV = SC; // Carga viva
    
    // Carga última
    const wu = 1.2 * CM + 1.6 * CV; // kN/m²
    const wu_lineal = wu * b; // kN/m (carga lineal)
    
    // CÁLCULO DE MOMENTOS
    let Mu_pos, Mu_neg;
    
    if (apoyo === 'simple') {
        Mu_pos = wu_lineal * Math.pow(L_inclinada, 2) / 8;
        Mu_neg = 0;
    } else { // empotrada
        Mu_pos = wu_lineal * Math.pow(L_inclinada, 2) / 24;
        Mu_neg = wu_lineal * Math.pow(L_inclinada, 2) / 12;
    }
    
    // DISEÑO DE ACERO LONGITUDINAL (dirección de la pendiente)
    const recubrimiento = 0.020; // 20mm
    const d = e - recubrimiento - 0.006; // altura efectiva
    
    // Acero para momento positivo
    const As_pos = CalculosComunes.calcularAceroFlexion(Mu_pos, b, d, fc, fy);
    const As_min = CalculosComunes.calcularAceroMinimo(b * 100, d * 100, fy);
    const As_pos_final = Math.max(As_pos, As_min);
    
    // Distribución de barras longitudinales
    const dist_long = CalculosComunes.distribuirBarras(As_pos_final, b * 100, [10, 12, 16]);
    
    // Acero para momento negativo (si existe)
    let As_neg_final = 0;
    let dist_neg = null;
    if (Mu_neg > 0) {
        const As_neg = CalculosComunes.calcularAceroFlexion(Mu_neg, b, d, fc, fy);
        As_neg_final = Math.max(As_neg, As_min);
        dist_neg = CalculosComunes.distribuirBarras(As_neg_final, b * 100, [10, 12, 16]);
    }
    
    // ACERO DE REPARTICIÓN (perpendicular a pendiente)
    // Mínimo 20% del acero principal o As mínimo
    const As_reparticion = Math.max(As_pos_final * 0.20, As_min * 0.5);
    const dist_rep = CalculosComunes.distribuirBarras(As_reparticion, L_inclinada * 100, [8, 10]);
    
    // VERIFICACIÓN POR CORTANTE
    const Vu = wu_lineal * L_inclinada / 2; // Cortante máximo
    const cortante = CalculosComunes.calcularCortante(Vu, b * 100, d * 100, fc);
    
    // VERIFICACIÓN DE DEFLEXIÓN (simplificado)
    const relacionEspesor = L_inclinada / e;
    const cumpleEspesor = relacionEspesor <= 25;
    
    // Guardar datos para visualización
    datosEscaleraActual = {
        tipo: tipo,
        H: H,
        b: b,
        h: h,
        c: cReal,
        e: e,
        nPeldanos: nPeldanos,
        L_horizontal: L_horizontal,
        L_inclinada: L_inclinada,
        angulo: angulo,
        dist_long: dist_long,
        dist_neg: dist_neg,
        dist_rep: dist_rep,
        recubrimiento: recubrimiento,
        apoyo: apoyo
    };
    
    // MOSTRAR RESULTADOS
    mostrarResultados({
        tipo: tipo,
        H: H,
        b: b,
        h: h * 100,
        c: cReal * 100,
        e: e,
        d: d,
        nPeldanos: nPeldanos,
        L_horizontal: L_horizontal,
        L_inclinada: L_inclinada,
        angulo: angulo,
        blondel: blondel,
        cumpleBlondel: cumpleBlondel,
        mensajeBlondel: mensajeBlondel,
        CM: CM,
        CV: CV,
        wu: wu,
        Mu_pos: Mu_pos,
        Mu_neg: Mu_neg,
        As_pos: As_pos_final,
        As_neg: As_neg_final,
        dist_long: dist_long,
        dist_neg: dist_neg,
        As_reparticion: As_reparticion,
        dist_rep: dist_rep,
        cortante: cortante,
        relacionEspesor: relacionEspesor,
        cumpleEspesor: cumpleEspesor,
        apoyo: apoyo
    });
    
    // ACTUALIZAR VISUALIZACIÓN 3D
    actualizarVisualizacion3D(datosEscaleraActual);
}

function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    
    let html = '<h3>📐 Geometría de la Escalera</h3>';
    
    html += `<div class="result-item">
        <strong>Tipo:</strong>
        <span class="result-value">${datos.tipo === 'recta' ? 'Escalera Recta' : datos.tipo === 'l' ? 'Escalera en L' : 'Escalera en U'}</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Altura Total a Salvar:</strong>
        <span class="result-value">${datos.H.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Número de Peldaños:</strong>
        <span class="result-value">${datos.nPeldanos} peldaños</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Huella Real:</strong>
        <span class="result-value">${datos.h.toFixed(1)} cm</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Contrahuella Real:</strong>
        <span class="result-value">${datos.c.toFixed(2)} cm</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Longitud Horizontal:</strong>
        <span class="result-value">${datos.L_horizontal.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Longitud Inclinada:</strong>
        <span class="result-value">${datos.L_inclinada.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Ángulo de Inclinación:</strong>
        <span class="result-value">${datos.angulo.toFixed(1)}°</span>
    </div>`;
    
    // Verificación Blondel
    const claseBlondel = datos.cumpleBlondel ? 'alert-success' : 'alert-warning';
    html += `<div class="alert ${claseBlondel}">
        <strong>Fórmula de Blondel (Ergonomía):</strong><br>
        2c + h = ${datos.blondel.toFixed(1)} cm<br>
        ${datos.mensajeBlondel}
    </div>`;
    
    // Verificación de espesor
    const claseEspesor = datos.cumpleEspesor ? 'alert-success' : 'alert-warning';
    html += `<div class="alert ${claseEspesor}">
        <strong>Relación L/e:</strong> ${datos.relacionEspesor.toFixed(1)}<br>
        ${datos.cumpleEspesor ? '✓ Espesor adecuado (L/e ≤ 25)' : '⚠ Verificar deflexiones (L/e > 25)'}
    </div>`;
    
    html += '<h3>🔧 Cargas de Diseño</h3>';
    html += `<div class="result-item">
        <strong>Carga Muerta (CM):</strong>
        <span class="result-value">${datos.CM.toFixed(2)} kN/m²</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Carga Viva (CV):</strong>
        <span class="result-value">${datos.CV.toFixed(2)} kN/m²</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Carga Última (wu):</strong>
        <span class="result-value">${datos.wu.toFixed(2)} kN/m²</span>
    </div>`;
    
    html += '<h3>📊 Momentos de Diseño</h3>';
    html += `<div class="result-item">
        <strong>Momento Positivo (Mu+):</strong>
        <span class="result-value">${datos.Mu_pos.toFixed(2)} kN·m</span>
    </div>`;
    
    if (datos.Mu_neg > 0) {
        html += `<div class="result-item">
            <strong>Momento Negativo (Mu-):</strong>
            <span class="result-value">${datos.Mu_neg.toFixed(2)} kN·m</span>
        </div>`;
    }
    
    html += '<h3>🔩 Diseño de Acero</h3>';
    html += `<div class="result-item">
        <strong>Acero Longitudinal (dirección pendiente):</strong>
        <span class="result-value">${datos.As_pos.toFixed(2)} cm²</span>
    </div>`;
    
    if (datos.dist_long) {
        html += `<div class="result-item">
            <strong>Configuración Longitudinal:</strong>
            <span class="result-value">φ${datos.dist_long.diametro} @ ${datos.dist_long.espaciamiento} cm</span>
        </div>`;
    }
    
    if (datos.As_neg > 0 && datos.dist_neg) {
        html += `<div class="result-item">
            <strong>Acero Negativo (superior):</strong>
            <span class="result-value">${datos.As_neg.toFixed(2)} cm²</span>
        </div>`;
        
        html += `<div class="result-item">
            <strong>Configuración Negativo:</strong>
            <span class="result-value">φ${datos.dist_neg.diametro} @ ${datos.dist_neg.espaciamiento} cm</span>
        </div>`;
    }
    
    html += `<div class="result-item">
        <strong>Acero de Repartición:</strong>
        <span class="result-value">${datos.As_reparticion.toFixed(2)} cm²</span>
    </div>`;
    
    if (datos.dist_rep) {
        html += `<div class="result-item">
            <strong>Configuración Repartición:</strong>
            <span class="result-value">φ${datos.dist_rep.diametro} @ ${datos.dist_rep.espaciamiento} cm</span>
        </div>`;
    }
    
    html += '<h3>✓ Verificación por Cortante</h3>';
    const claseCort = !datos.cortante.necesitaEstribos ? 'alert-success' : 'alert-warning';
    html += `<div class="alert ${claseCort}">
        <strong>Resistencia al Cortante:</strong><br>
        φVc = ${datos.cortante.Vc} kN<br>
        ${datos.cortante.necesitaEstribos ? '⚠ Verificar si requiere refuerzo adicional' : '✓ Hormigón resiste el cortante'}
    </div>`;
    
    html += '<h3>📋 Resumen de Diseño</h3>';
    html += `<div class="alert alert-success">
        <strong>ESCALERA ${datos.nPeldanos} PELDAÑOS</strong><br>
        Huella: ${datos.h.toFixed(1)} cm | Contrahuella: ${datos.c.toFixed(2)} cm<br>
        Ancho: ${(datos.b * 100).toFixed(0)} cm | Espesor: ${(datos.e * 100).toFixed(0)} cm<br>
        Acero longitudinal: φ${datos.dist_long.diametro} @ ${datos.dist_long.espaciamiento} cm<br>
        Acero de repartición: φ${datos.dist_rep.diametro} @ ${datos.dist_rep.espaciamiento} cm`;
    
    if (datos.dist_neg) {
        html += `<br>Acero superior: φ${datos.dist_neg.diametro} @ ${datos.dist_neg.espaciamiento} cm`;
    }
    
    html += `<br>Recubrimiento: 20 mm</div>`;
    
    resultadosDiv.innerHTML = html;
}

// Función para cambiar entre vistas
function cambiarVista(vista) {
    vistaActual = vista;
    
    const canvas3d = document.getElementById('canvas3d');
    const canvasCorte = document.getElementById('canvasCorte');
    const canvasAcero = document.getElementById('canvasAcero');
    const btn3d = document.getElementById('btn3d');
    const btnCorte = document.getElementById('btnCorte');
    const btnAcero = document.getElementById('btnAcero');
    
    // Remover clase active de todos
    if (btn3d) btn3d.classList.remove('active');
    if (btnCorte) btnCorte.classList.remove('active');
    if (btnAcero) btnAcero.classList.remove('active');
    
    if (canvas3d) {
        canvas3d.style.display = 'none';
        canvas3d.classList.remove('active');
    }
    if (canvasCorte) {
        canvasCorte.style.display = 'none';
        canvasCorte.classList.remove('active');
    }
    if (canvasAcero) {
        canvasAcero.style.display = 'none';
        canvasAcero.classList.remove('active');
    }
    
    if (vista === '3d') {
        if (btn3d) btn3d.classList.add('active');
        if (canvas3d) {
            canvas3d.style.display = 'block';
            canvas3d.classList.add('active');
        }
    } else if (vista === 'corte') {
        if (btnCorte) btnCorte.classList.add('active');
        if (canvasCorte) {
            canvasCorte.style.display = 'block';
            canvasCorte.classList.add('active');
        }
        if (typeof dibujarCorte === 'function') {
            dibujarCorte();
        }
    } else if (vista === 'acero') {
        if (btnAcero) btnAcero.classList.add('active');
        if (canvasAcero) {
            canvasAcero.style.display = 'block';
            canvasAcero.classList.add('active');
        }
        
        // Inicializar y actualizar vista de acero
        if (datosEscaleraActual) {
            setTimeout(() => {
                initAceroScene();
                actualizarVisualizacionSoloAcero(datosEscaleraActual);
            }, 100);
        }
    }
}

// Función genérica para dibujar corte (placeholder)
function dibujarCorte() {
    const canvas = document.getElementById('canvasCorte');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#2c3e50';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Vista de Corte - En desarrollo', canvas.width / 2, canvas.height / 2);
}
