let threeScene = null;
window.addEventListener('DOMContentLoaded', () => { threeScene = new ThreeConfig('canvas3d'); });

function calcularLosaCimentacion() {
    const Lx = parseFloat(document.getElementById('dimX').value);
    const Ly = parseFloat(document.getElementById('dimY').value);
    const e = parseFloat(document.getElementById('espesor').value);
    const nx = parseInt(document.getElementById('colX').value);
    const ny = parseInt(document.getElementById('colY').value);
    const P = parseFloat(document.getElementById('cargaCol').value);
    const qadm = parseFloat(document.getElementById('qadm').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const fy = parseFloat(document.getElementById('fy').value);
    
    if (Lx <= 0 || Ly <= 0 || e <= 0 || nx < 2 || ny < 2 || P <= 0) {
        alert('Valores inválidos'); return;
    }
    
    const A_losa = Lx * Ly;
    const n_columnas = nx * ny;
    const P_total = n_columnas * P;
    const peso_losa = A_losa * e * 25;
    const P_con_losa = P_total + peso_losa;
    const q_real = P_con_losa / A_losa;
    const cumple = q_real <= qadm;
    
    const sx = Lx / (nx - 1);
    const sy = Ly / (ny - 1);
    const Mu = q_real * Math.pow(Math.min(sx, sy), 2) / 10;
    
    const d = e - 0.07;
    const As = CalculosComunes.calcularAceroFlexion(Mu, 1.0, d, fc, fy);
    const As_min = CalculosComunes.calcularAceroMinimo(100, d * 100, fy);
    const As_final = Math.max(As, As_min);
    const dist = CalculosComunes.distribuirBarras(As_final, 100, [16, 18, 20]);
    
    const html = `
        <h3>📐 Geometría</h3>
        <div class="result-item"><strong>Dimensiones:</strong> <span class="result-value">${Lx} x ${Ly} m</span></div>
        <div class="result-item"><strong>Espesor:</strong> <span class="result-value">${(e*100).toFixed(0)} cm</span></div>
        <div class="result-item"><strong>Columnas:</strong> <span class="result-value">${nx} x ${ny} = ${n_columnas} total</span></div>
        <div class="result-item"><strong>Separación:</strong> <span class="result-value">${sx.toFixed(2)} x ${sy.toFixed(2)} m</span></div>
        
        <h3>🔧 Cargas y Presiones</h3>
        <div class="result-item"><strong>Carga Total:</strong> <span class="result-value">${P_con_losa.toFixed(2)} kN</span></div>
        <div class="result-item"><strong>Presión Real:</strong> <span class="result-value">${q_real.toFixed(2)} kPa</span></div>
        <div class="alert ${cumple ? 'alert-success' : 'alert-danger'}">
            <strong>Capacidad Portante:</strong> ${qadm} kPa<br>
            ${cumple ? '✓ CUMPLE' : '✗ NO CUMPLE - Aumentar área o reducir cargas'}
        </div>
        
        <h3>🔩 Diseño de Acero</h3>
        <div class="result-item"><strong>Acero Principal (ambas direcciones):</strong> 
            <span class="result-value">φ${dist.diametro} @ ${dist.espaciamiento} cm</span></div>
        
        <h3>📋 Resumen</h3>
        <div class="alert alert-success">
            <strong>LOSA DE CIMENTACIÓN ${Lx}x${Ly}m - e=${(e*100).toFixed(0)}cm</strong><br>
            Acero: φ${dist.diametro}@${dist.espaciamiento}cm ambas direcciones (superior e inferior)<br>
            Columnas: ${n_columnas} @ ${P.toFixed(0)}kN c/u<br>
            Recubrimiento: 70mm (contacto con terreno)
        </div>
    `;
    document.getElementById('resultados').innerHTML = html;
    
    threeScene.clearObjects();
    threeScene.createBox(Lx, e, Ly, 0xBDBDBD, {x:0, y:e/2, z:0});
    
    for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
            const x = -Lx/2 + i * sx;
            const z = -Ly/2 + j * sy;
            threeScene.createCylinder(0.2, 0.2, 3, 0x3498db, {x, y:e+1.5, z});
        }
    }
    
    threeScene.addDimension({x:-Lx/2, y:e+0.2, z:Ly/2+0.5}, {x:Lx/2, y:e+0.2, z:Ly/2+0.5}, `L=${Lx}m`, 0.2);
    threeScene.resetCamera({x:Lx*1.2, y:Lx*0.8, z:Ly*1.2});
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
