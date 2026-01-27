/**
 * VIGA-MAIN.JS
 * Cálculos estructurales, UI y coordinación general
 */

let datosVigaActual = null;
let vistaActual = '3d';

function calcularViga() {
    // Obtener valores de entrada
    const L = parseFloat(document.getElementById('luz').value);
    const b = parseFloat(document.getElementById('ancho').value);
    const h = parseFloat(document.getElementById('altura').value);
    const wD = parseFloat(document.getElementById('cargaMuerta').value);
    const wL = parseFloat(document.getElementById('cargaViva').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const fy = parseFloat(document.getElementById('fy').value);
    const apoyo = document.getElementById('apoyo').value;
    
    // Validaciones
    if (L <= 0 || b <= 0 || h <= 0 || wD <= 0 || wL < 0) {
        alert('Por favor ingrese valores válidos');
        return;
    }
    
    // Verificar relación de esbeltez
    const relacionEsbeltez = L / h;
    const advertenciaEsbeltez = relacionEsbeltez > 12 ? 
        'Advertencia: Relación L/h > 12, verificar deflexiones' : '';
    
    // CÁLCULO DE CARGAS ÚLTIMAS
    const wu = 1.2 * wD + 1.6 * wL; // kN/m
    
    // MOMENTOS Y CORTANTES según condición de apoyo
    let Mu_pos, Mu_neg, Vu_max;
    let coefM_pos, coefM_neg, coefV;
    
    switch(apoyo) {
        case 'simple':
            coefM_pos = 1/8;
            coefM_neg = 0;
            coefV = 1/2;
            break;
        case 'continua':
            coefM_pos = 1/14;
            coefM_neg = 1/11;
            coefV = 1/2;
            break;
        case 'empotrada':
            coefM_pos = 1/24;
            coefM_neg = 1/12;
            coefV = 1/2;
            break;
        default:
            coefM_pos = 1/8;
            coefM_neg = 0;
            coefV = 1/2;
    }
    
    Mu_pos = wu * Math.pow(L, 2) * coefM_pos;
    Mu_neg = wu * Math.pow(L, 2) * coefM_neg;
    Vu_max = wu * L * coefV;
    
    // DISEÑO POR FLEXIÓN
    const recubrimiento = 0.020; // 20mm
    const d = h - recubrimiento - 0.025; // m (altura efectiva, estimando φ20 + estribo)
    
    // Acero en momento positivo
    const As_pos = CalculosComunes.calcularAceroFlexion(Mu_pos, b, d, fc, fy);
    const As_min = CalculosComunes.calcularAceroMinimo(b * 100, d * 100, fy);
    const As_max = CalculosComunes.calcularAceroMaximo(b * 100, d * 100, fc, fy);
    const As_pos_final = Math.max(As_pos, As_min);
    
    // Verificar que no exceda el máximo
    const cumpleMaximo = As_pos_final <= As_max;
    
    // Distribución de barras para momento positivo
    const distribucion_pos = CalculosComunes.distribuirBarras(As_pos_final, b * 100, [16, 18, 20, 22, 25]);
    
    // Acero en momento negativo (si existe)
    let As_neg_final = 0;
    let distribucion_neg = null;
    if (Mu_neg > 0) {
        const As_neg = CalculosComunes.calcularAceroFlexion(Mu_neg, b, d, fc, fy);
        As_neg_final = Math.max(As_neg, As_min);
        distribucion_neg = CalculosComunes.distribuirBarras(As_neg_final, b * 100, [16, 18, 20, 22, 25]);
    }
    
    // DISEÑO POR CORTANTE
    const cortante = CalculosComunes.calcularCortante(Vu_max, b * 100, d * 100, fc);
    
    // Si necesita estribos, calcular espaciamiento
    let estribos = null;
    if (cortante.necesitaEstribos) {
        const Vc = parseFloat(cortante.Vc);
        const Vs = (Vu_max / 0.85) - Vc;
        const Av = 2 * 0.5027; // 2 ramas de φ8 (cm²)
        const s_req = (Av * fy * d * 100) / (Vs * 10);
        const s_max = Math.min(d * 100 / 2, 60);
        const s = Math.min(s_req, s_max);
        const s_final = Math.floor(s / 5) * 5;
        
        estribos = {
            diametro: 8,
            espaciamiento: Math.max(s_final, 10),
            Vs: Vs.toFixed(2)
        };
    } else {
        estribos = {
            diametro: 8,
            espaciamiento: 25,
            Vs: 0
        };
    }
    
    // VERIFICACIÓN DE DEFLEXIÓN
    const Ie = (b * Math.pow(h, 3)) / 12;
    const Ec = 4700 * Math.sqrt(fc);
    const deflexion_max = (5 * wD * Math.pow(L, 4)) / (384 * Ec * Ie * 1000000);
    const deflexion_admisible = L / 240;
    const cumpleDeflexion = deflexion_max <= deflexion_admisible;
    
    // Guardar datos para visualización
    datosVigaActual = {
        L: L,
        b: b,
        h: h,
        d: d,
        distribucion_pos: distribucion_pos,
        distribucion_neg: distribucion_neg,
        estribos: estribos,
        apoyo: apoyo,
        recubrimiento: recubrimiento
    };
    
    // MOSTRAR RESULTADOS
    mostrarResultados({
        L: L,
        b: b,
        h: h,
        d: d,
        wu: wu,
        Mu_pos: Mu_pos,
        Mu_neg: Mu_neg,
        Vu_max: Vu_max,
        As_pos: As_pos_final,
        As_neg: As_neg_final,
        As_min: As_min,
        As_max: As_max,
        cumpleMaximo: cumpleMaximo,
        distribucion_pos: distribucion_pos,
        distribucion_neg: distribucion_neg,
        cortante: cortante,
        estribos: estribos,
        relacionEsbeltez: relacionEsbeltez.toFixed(1),
        advertenciaEsbeltez: advertenciaEsbeltez,
        deflexion_max: deflexion_max * 100,
        deflexion_admisible: deflexion_admisible * 100,
        cumpleDeflexion: cumpleDeflexion,
        apoyo: apoyo
    });
    
    // ACTUALIZAR VISUALIZACIÓN 3D
    actualizarVisualizacion3D(datosVigaActual);
}

function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    
    let html = '<h3>📐 Dimensiones y Geometría</h3>';
    html += `<div class="result-item">
        <strong>Luz (L):</strong>
        <span class="result-value">${datos.L.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Sección (b x h):</strong>
        <span class="result-value">${(datos.b * 100).toFixed(0)} x ${(datos.h * 100).toFixed(0)} cm</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Altura Efectiva (d):</strong>
        <span class="result-value">${(datos.d * 100).toFixed(1)} cm</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Relación L/h:</strong>
        <span class="result-value">${datos.relacionEsbeltez}</span>
    </div>`;
    
    if (datos.advertenciaEsbeltez) {
        html += `<div class="alert alert-warning">${datos.advertenciaEsbeltez}</div>`;
    }
    
    html += '<h3>🔧 Solicitaciones</h3>';
    html += `<div class="result-item">
        <strong>Carga Última (wu):</strong>
        <span class="result-value">${datos.wu.toFixed(2)} kN/m</span>
    </div>`;
    
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
    
    html += `<div class="result-item">
        <strong>Cortante Máximo (Vu):</strong>
        <span class="result-value">${datos.Vu_max.toFixed(2)} kN</span>
    </div>`;
    
    html += '<h3>🔩 Diseño de Acero Longitudinal</h3>';
    html += `<div class="result-item">
        <strong>Acero Requerido (As mínimo):</strong>
        <span class="result-value">${datos.As_min.toFixed(2)} cm²</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Acero en Momento Positivo:</strong>
        <span class="result-value">${datos.As_pos.toFixed(2)} cm²</span>
    </div>`;
    
    if (datos.distribucion_pos) {
        html += `<div class="result-item">
            <strong>Armadura Inferior:</strong>
            <span class="result-value">${datos.distribucion_pos.cantidad} φ${datos.distribucion_pos.diametro}</span>
        </div>`;
    }
    
    if (datos.As_neg > 0 && datos.distribucion_neg) {
        html += `<div class="result-item">
            <strong>Acero en Momento Negativo:</strong>
            <span class="result-value">${datos.As_neg.toFixed(2)} cm²</span>
        </div>`;
        
        html += `<div class="result-item">
            <strong>Armadura Superior:</strong>
            <span class="result-value">${datos.distribucion_neg.cantidad} φ${datos.distribucion_neg.diametro}</span>
        </div>`;
    }
    
    const claseMax = datos.cumpleMaximo ? 'alert-success' : 'alert-danger';
    html += `<div class="alert ${claseMax}">
        ${datos.cumpleMaximo ? '✓ Acero dentro de límites permitidos' : '✗ Acero excede el máximo - Aumentar sección'}
    </div>`;
    
    html += '<h3>⚡ Diseño por Cortante</h3>';
    const claseCort = !datos.cortante.necesitaEstribos ? 'alert-success' : 'alert-warning';
    html += `<div class="alert ${claseCort}">
        <strong>Resistencia del Hormigón:</strong><br>
        φVc = ${datos.cortante.Vc} kN<br>
        ${datos.cortante.necesitaEstribos ? '⚠ Se requieren estribos' : '✓ Hormigón resiste el cortante'}
    </div>`;
    
    if (datos.estribos) {
        html += `<div class="result-item">
            <strong>Estribos:</strong>
            <span class="result-value">φ${datos.estribos.diametro} @ ${datos.estribos.espaciamiento} cm</span>
        </div>`;
    }
    
    html += '<h3>↕️ Verificación de Deflexión</h3>';
    const claseDef = datos.cumpleDeflexion ? 'alert-success' : 'alert-warning';
    html += `<div class="alert ${claseDef}">
        <strong>Deflexión Estimada:</strong> ${datos.deflexion_max.toFixed(2)} cm<br>
        <strong>Deflexión Admisible (L/240):</strong> ${datos.deflexion_admisible.toFixed(2)} cm<br>
        ${datos.cumpleDeflexion ? '✓ Cumple con deflexiones' : '⚠ Verificar deflexiones en detalle'}
    </div>`;
    
    html += '<h3>📋 Resumen de Diseño</h3>';
    let resumen = `<div class="alert alert-success">
        <strong>VIGA ${(datos.b * 100).toFixed(0)} x ${(datos.h * 100).toFixed(0)} cm - L = ${datos.L.toFixed(2)} m</strong><br>
        Armadura inferior: ${datos.distribucion_pos.cantidad} φ${datos.distribucion_pos.diametro}`;
    
    if (datos.distribucion_neg) {
        resumen += `<br>Armadura superior: ${datos.distribucion_neg.cantidad} φ${datos.distribucion_neg.diametro}`;
    }
    
    resumen += `<br>Estribos: φ${datos.estribos.diametro} @ ${datos.estribos.espaciamiento} cm`;
    resumen += `<br>Recubrimiento: 20 mm</div>`;
    html += resumen;
    
    resultadosDiv.innerHTML = html;
}

function cambiarVista(vista) {
    vistaActual = vista;
    
    const canvas3d = document.getElementById('canvas3d');
    const canvasCorte = document.getElementById('canvasCorte');
    const canvasAcero = document.getElementById('canvasAcero');
    const btn3d = document.getElementById('btn3d');
    const btnCorte = document.getElementById('btnCorte');
    const btnAcero = document.getElementById('btnAcero');
    
    // Remover todas las clases active
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
        
        if (datosVigaActual) {
            setTimeout(() => {
                initAceroScene();
                actualizarVisualizacionSoloAcero(datosVigaActual);
            }, 100);
        }
    }
}

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
