let threeScene = null;
window.addEventListener('DOMContentLoaded', () => { threeScene = new ThreeConfig('canvas3d'); });

function calcularPisoIndustrial() {
    const h = parseFloat(document.getElementById('espesor').value) / 100;
    const P = parseFloat(document.getElementById('carga').value);
    const k = parseFloat(document.getElementById('modSubrasante').value);
    const L_junta = parseFloat(document.getElementById('separacionJuntas').value);
    const A_contacto = parseFloat(document.getElementById('areaContacto').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const refuerzo = document.getElementById('tipoRefuerzo').value;
    
    if (h <= 0 || P <= 0 || k <= 0 || L_junta <= 0) {
        alert('Valores inválidos'); return;
    }
    
    const E = 4700 * Math.sqrt(fc) * 1000;
    const mu = 0.15;
    const l = Math.pow((E * Math.pow(h, 3)) / (12 * (1 - mu * mu) * k * 1000), 0.25);
    
    const a = Math.sqrt(A_contacto / Math.PI);
    
    const sigma_interior = (0.316 * P) / (Math.pow(h, 2)) * (1 + Math.log(l/(2*a)));
    const sigma_borde = (0.529 * P) / (Math.pow(h, 2)) * (1 + 0.6 * Math.log(l/a));
    const sigma_esquina = (3 * P) / (Math.pow(h, 2));
    
    const sigma_max = Math.max(sigma_interior, sigma_borde, sigma_esquina) / 1000;
    
    const MR = 0.75 * fc / 1000;
    const FS = MR / sigma_max;
    const cumple = FS >= 1.5;
    
    let refuerzo_txt = '';
    if (refuerzo === 'malla') {
        refuerzo_txt = 'Malla Electrosoldada AT-56 o similar (0.18% del área)';
    } else if (refuerzo === 'barras') {
        refuerzo_txt = 'Barras φ10 @ 25cm ambas direcciones';
    } else {
        refuerzo_txt = 'Fibras de Acero 30-40 kg/m³';
    }
    
    const html = `
        <h3>📐 Características del Piso</h3>
        <div class="result-item"><strong>Espesor:</strong> <span class="result-value">${(h*100).toFixed(0)} cm</span></div>
        <div class="result-item"><strong>Radio de Rigidez Relativa (l):</strong> <span class="result-value">${l.toFixed(2)} m</span></div>
        <div class="result-item"><strong>Separación de Juntas:</strong> <span class="result-value">${L_junta} m</span></div>
        
        <h3>💪 Esfuerzos por Flexión (Westergaard)</h3>
        <div class="result-item"><strong>σ Interior:</strong> <span class="result-value">${sigma_interior.toFixed(2)} kPa</span></div>
        <div class="result-item"><strong>σ Borde:</strong> <span class="result-value">${sigma_borde.toFixed(2)} kPa</span></div>
        <div class="result-item"><strong>σ Esquina:</strong> <span class="result-value">${sigma_esquina.toFixed(2)} kPa</span></div>
        <div class="result-item"><strong>σ Máximo:</strong> <span class="result-value" style="color:#e74c3c;">${(sigma_max*1000).toFixed(2)} kPa</span></div>
        
        <h3>✓ Verificación</h3>
        <div class="result-item"><strong>Módulo de Rotura (MR):</strong> <span class="result-value">${(MR*1000).toFixed(2)} kPa</span></div>
        <div class="alert ${cumple ? 'alert-success' : 'alert-danger'}">
            <strong>Factor de Seguridad:</strong> ${FS.toFixed(2)}<br>
            Mínimo requerido: 1.50<br>
            ${cumple ? '✓ CUMPLE' : '✗ NO CUMPLE - Aumentar espesor'}
        </div>
        
        <h3>🔩 Refuerzo Recomendado</h3>
        <div class="result-item"><strong>Tipo:</strong> <span class="result-value">${refuerzo_txt}</span></div>
        <div class="result-item"><strong>Ubicación:</strong> <span class="result-value">En el tercio superior de la losa</span></div>
        
        <h3>🔧 Especificaciones de Construcción</h3>
        <div class="alert alert-warning">
            <strong>Juntas de Contracción:</strong><br>
            - Separación: ${L_junta}m x ${L_junta}m<br>
            - Profundidad: h/4 = ${(h*100/4).toFixed(1)} cm<br>
            - Sellado: Silicona poliuretano<br><br>
            <strong>Subbase:</strong><br>
            - Mínimo 10cm de grava compactada<br>
            - Geotextil separador<br>
            - Polietileno como barrera de humedad
        </div>
        
        <h3>📋 Resumen</h3>
        <div class="alert alert-success">
            <strong>PISO INDUSTRIAL - ${(h*100).toFixed(0)} cm</strong><br>
            Refuerzo: ${refuerzo_txt}<br>
            Juntas: ${L_junta}m x ${L_junta}m<br>
            Capacidad: ${P.toFixed(0)} kN por eje<br>
            FS = ${FS.toFixed(2)} ${cumple ? '✓' : '✗'}
        </div>
    `;
    document.getElementById('resultados').innerHTML = html;
    
    threeScene.clearObjects();
    const L_total = L_junta * 3;
    threeScene.createBox(L_total, h, L_total, 0xBDBDBD, {x:0, y:h/2, z:0});
    
    for (let i = 1; i < 3; i++) {
        const pos = -L_total/2 + i * L_junta;
        threeScene.createBox(L_total, 0.02, 0.02, 0x2c3e50, {x:0, y:h, z:pos});
        threeScene.createBox(0.02, 0.02, L_total, 0x2c3e50, {x:pos, y:h, z:0});
    }
    
    threeScene.createCylinder(0.15, 0.15, 0.5, 0xe74c3c, {x:L_junta/2, y:h+0.25, z:L_junta/2});
    threeScene.addText('Carga', {x:L_junta/2, y:h+0.6, z:L_junta/2}, 0x000000, 0.3);
    
    threeScene.addDimension({x:-L_total/2, y:h+0.2, z:L_total/2+0.5}, 
        {x:L_total/2, y:h+0.2, z:L_total/2+0.5}, `${L_total}m`, 0.2);
    threeScene.resetCamera({x:L_total*1.2, y:L_total*0.8, z:L_total*1.2});
}


// ==========================================
// SISTEMA DE CORTES Y CUANTIFICACIÓN
// ==========================================

let corteTecnico = null;
let vistaActual = '3d';

// Inicializar sistema de cortes
window.addEventListener('DOMContentLoaded', (event) => {
    corteTecnico = new CorteTecnico('canvasCorte');
});

// Función para cambiar entre vistas
function cambiarVista(vista) {
    vistaActual = vista;
    
    const canvas3d = document.getElementById('canvas3d');
    const canvasCorte = document.getElementById('canvasCorte');
    const btn3d = document.getElementById('btn3d');
    const btnCorte = document.getElementById('btnCorte');
    
    if (vista === '3d') {
        canvas3d.classList.add('active');
        canvasCorte.classList.remove('active');
        btn3d.classList.add('active');
        btnCorte.classList.remove('active');
    } else {
        canvas3d.classList.remove('active');
        canvasCorte.classList.add('active');
        btn3d.classList.remove('active');
        btnCorte.classList.add('active');
        
        if (typeof datosCalculados !== 'undefined' && datosCalculados) {
            dibujarCorte();
        }
    }
}

// Función para dibujar corte (debe ser personalizada por cada módulo)
function dibujarCorte() {
    if (!datosCalculados) return;
    
    try {
        corteTecnico.clear();
        
        // Detectar tipo de elemento y dibujar apropiadamente
        if (typeof datosCalculados.b !== 'undefined' && typeof datosCalculados.h !== 'undefined') {
            // Es una viga, columna o similar
            if (datosCalculados.aceroInf) {
                corteTecnico.dibujarCorteViga(datosCalculados);
            } else if (datosCalculados.numBarras) {
                corteTecnico.dibujarCorteColumna(datosCalculados);
            }
        } else if (typeof datosCalculados.B !== 'undefined') {
            // Es una zapata
            corteTecnico.dibujarCorteZapataCorrida(datosCalculados);
        }
    } catch (error) {
        console.log('Dibujando corte genérico');
        corteTecnico.drawText('Corte en desarrollo para este módulo', 0.5, 0.5);
    }
}
