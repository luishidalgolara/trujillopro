/**
 * CERCHA METÁLICA
 * Análisis estructural y visualización 3D
 */

let threeScene = null;

// Propiedades de perfiles angulares (área en cm², radio de giro en cm)
const PERFILES = {
    'L40x40x4': { A: 3.08, rx: 1.23, ry: 1.23 },
    'L50x50x5': { A: 4.80, rx: 1.53, ry: 1.53 },
    'L60x60x6': { A: 6.91, rx: 1.84, ry: 1.84 },
    'L75x75x6': { A: 8.78, rx: 2.32, ry: 2.32 },
    'L80x80x8': { A: 12.3, rx: 2.45, ry: 2.45 },
    '2L60x60x6': { A: 13.82, rx: 1.84, ry: 1.84 },
    '2L75x75x6': { A: 17.56, rx: 2.32, ry: 2.32 }
};

window.addEventListener('DOMContentLoaded', () => {
    threeScene = new ThreeConfig('canvas3d');
});

function calcularCercha() {
    // Obtener valores de entrada
    const tipo = document.getElementById('tipoCercha').value;
    const L = parseFloat(document.getElementById('luz').value);
    const H = parseFloat(document.getElementById('altura').value);
    const nPaneles = parseInt(document.getElementById('paneles').value);
    const D = parseFloat(document.getElementById('cargaMuerta').value);
    const Lr = parseFloat(document.getElementById('sobrecarga').value);
    const s = parseFloat(document.getElementById('separacion').value);
    const aceroTipo = document.getElementById('aceroTipo').value;
    const perfilCordon = document.getElementById('perfilCordon').value;
    const perfilDiagonal = document.getElementById('perfilDiagonal').value;
    
    // Validaciones
    if (L <= 0 || H <= 0 || nPaneles < 4 || s <= 0) {
        alert('Por favor ingrese valores válidos');
        return;
    }
    
    // Propiedades del acero
    const Fy = aceroTipo === 'A36' ? 250 : 345; // MPa
    const E = 200000; // MPa (módulo de elasticidad)
    
    // CARGAS
    const cargaPorNudo = (1.2 * D + 1.6 * Lr) * s * (L / nPaneles); // kN
    
    // ANÁLISIS DE LA CERCHA (método de nudos simplificado)
    const a = L / nPaneles; // Longitud de panel
    
    // Reacciones en los apoyos
    const numNudosSup = nPaneles + 1;
    const cargaTotal = cargaPorNudo * (numNudosSup - 2) + cargaPorNudo * 0.5 * 2; // nudos intermedios + extremos
    const R = cargaTotal / 2; // Reacción en cada apoyo (simétrico)
    
    // Fuerzas en barras (simplificado para cercha simétrica)
    let fuerzas = [];
    
    if (tipo === 'howe' || tipo === 'pratt') {
        // Cordón superior (compresión)
        const longitudCS = Math.sqrt(Math.pow(a, 2) + Math.pow(H / (nPaneles / 2), 2));
        const fuerza_CS = -(cargaPorNudo * L) / (2 * H) * longitudCS / a; // Compresión (negativo)
        
        // Cordón inferior (tracción)
        const fuerza_CI = (cargaPorNudo * L) / (2 * H) * a; // Tracción (positivo)
        
        // Diagonales
        const longitudDiag = Math.sqrt(Math.pow(a, 2) + Math.pow(H, 2));
        const fuerza_Diag = tipo === 'howe' ? 
            -(cargaPorNudo * longitudDiag / H) : // Howe: diagonales en compresión
            (cargaPorNudo * longitudDiag / H);   // Pratt: diagonales en tracción
        
        // Montantes
        const fuerza_Mont = tipo === 'howe' ? 
            cargaPorNudo : // Howe: montantes en tracción
            -cargaPorNudo; // Pratt: montantes en compresión
        
        fuerzas = {
            cordonSuperior: fuerza_CS,
            cordonInferior: fuerza_CI,
            diagonal: fuerza_Diag,
            montante: fuerza_Mont,
            longitudDiag: longitudDiag,
            longitudCS: longitudCS
        };
        
    } else if (tipo === 'warren') {
        // Warren: solo diagonales, no hay montantes
        const longitudDiag = Math.sqrt(Math.pow(a, 2) + Math.pow(H, 2));
        
        fuerzas = {
            cordonSuperior: -(cargaPorNudo * L) / (2 * H),
            cordonInferior: (cargaPorNudo * L) / (2 * H),
            diagonal: cargaPorNudo * longitudDiag / H,
            montante: 0,
            longitudDiag: longitudDiag,
            longitudCS: a
        };
        
    } else { // fink
        const longitudDiag = Math.sqrt(Math.pow(L/4, 2) + Math.pow(H, 2));
        
        fuerzas = {
            cordonSuperior: -(cargaPorNudo * L) / (2 * H) * 1.5,
            cordonInferior: (cargaPorNudo * L) / (2 * H) * 1.2,
            diagonal: cargaPorNudo * longitudDiag / H,
            montante: cargaPorNudo,
            longitudDiag: longitudDiag,
            longitudCS: L / nPaneles
        };
    }
    
    // VERIFICACIÓN DE CORDÓN SUPERIOR (COMPRESIÓN)
    const perfilCS = PERFILES[perfilCordon];
    const Lk_CS = fuerzas.longitudCS * 100; // cm
    const slenderness_CS = Lk_CS / perfilCS.rx; // Esbeltez
    
    // Tensión crítica de pandeo (Euler)
    const Fe_CS = Math.pow(Math.PI, 2) * E / Math.pow(slenderness_CS, 2); // MPa
    
    // Tensión admisible considerando pandeo
    const lambda_c = Math.sqrt(Fy / Fe_CS);
    let Fcr;
    if (lambda_c <= 1.5) {
        Fcr = Math.pow(0.658, Math.pow(lambda_c, 2)) * Fy;
    } else {
        Fcr = 0.877 / Math.pow(lambda_c, 2) * Fy;
    }
    
    const phi_c = 0.90; // Factor de resistencia AISC
    const Pn_CS = phi_c * Fcr * perfilCS.A / 10; // kN
    const Pu_CS = Math.abs(fuerzas.cordonSuperior);
    const ratio_CS = Pu_CS / Pn_CS;
    
    // VERIFICACIÓN DE CORDÓN INFERIOR (TRACCIÓN)
    const phi_t = 0.90;
    const Pn_CI = phi_t * Fy * perfilCS.A / 10; // kN
    const Pu_CI = Math.abs(fuerzas.cordonInferior);
    const ratio_CI = Pu_CI / Pn_CI;
    
    // VERIFICACIÓN DE DIAGONALES
    const perfilDiag = PERFILES[perfilDiagonal];
    const Lk_Diag = fuerzas.longitudDiag * 100; // cm
    const slenderness_Diag = Lk_Diag / perfilDiag.rx;
    
    let Pn_Diag, tipo_Diag;
    if (fuerzas.diagonal < 0) {
        // Compresión
        const Fe_Diag = Math.pow(Math.PI, 2) * E / Math.pow(slenderness_Diag, 2);
        const lambda_c_diag = Math.sqrt(Fy / Fe_Diag);
        let Fcr_diag;
        if (lambda_c_diag <= 1.5) {
            Fcr_diag = Math.pow(0.658, Math.pow(lambda_c_diag, 2)) * Fy;
        } else {
            Fcr_diag = 0.877 / Math.pow(lambda_c_diag, 2) * Fy;
        }
        Pn_Diag = phi_c * Fcr_diag * perfilDiag.A / 10;
        tipo_Diag = 'Compresión';
    } else {
        // Tracción
        Pn_Diag = phi_t * Fy * perfilDiag.A / 10;
        tipo_Diag = 'Tracción';
    }
    
    const Pu_Diag = Math.abs(fuerzas.diagonal);
    const ratio_Diag = Pu_Diag / Pn_Diag;
    
    // MOSTRAR RESULTADOS
    mostrarResultados({
        tipo: tipo,
        L: L,
        H: H,
        nPaneles: nPaneles,
        cargaPorNudo: cargaPorNudo,
        R: R,
        fuerzas: fuerzas,
        aceroTipo: aceroTipo,
        Fy: Fy,
        perfilCordon: perfilCordon,
        perfilDiagonal: perfilDiagonal,
        slenderness_CS: slenderness_CS,
        Pn_CS: Pn_CS,
        Pu_CS: Pu_CS,
        ratio_CS: ratio_CS,
        Pn_CI: Pn_CI,
        Pu_CI: Pu_CI,
        ratio_CI: ratio_CI,
        Pn_Diag: Pn_Diag,
        Pu_Diag: Pu_Diag,
        ratio_Diag: ratio_Diag,
        tipo_Diag: tipo_Diag,
        slenderness_Diag: slenderness_Diag
    });
    
    // ACTUALIZAR VISUALIZACIÓN 3D
    actualizarVisualizacion3D({
        tipo: tipo,
        L: L,
        H: H,
        nPaneles: nPaneles,
        fuerzas: fuerzas
    });
}

function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    
    let html = '<h3>📐 Geometría de la Cercha</h3>';
    
    html += `<div class="result-item">
        <strong>Tipo:</strong>
        <span class="result-value">${datos.tipo.toUpperCase()}</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Luz Total:</strong>
        <span class="result-value">${datos.L.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Altura:</strong>
        <span class="result-value">${datos.H.toFixed(2)} m</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Número de Paneles:</strong>
        <span class="result-value">${datos.nPaneles}</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Longitud de Panel:</strong>
        <span class="result-value">${(datos.L / datos.nPaneles).toFixed(2)} m</span>
    </div>`;
    
    html += '<h3>🔧 Cargas y Reacciones</h3>';
    html += `<div class="result-item">
        <strong>Carga por Nudo:</strong>
        <span class="result-value">${datos.cargaPorNudo.toFixed(2)} kN</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Reacción en Apoyos:</strong>
        <span class="result-value">${datos.R.toFixed(2)} kN</span>
    </div>`;
    
    html += '<h3>⚡ Fuerzas en las Barras</h3>';
    html += `<div class="result-item">
        <strong>Cordón Superior:</strong>
        <span class="result-value" style="color: #e74c3c;">${datos.fuerzas.cordonSuperior.toFixed(2)} kN (Compresión)</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Cordón Inferior:</strong>
        <span class="result-value" style="color: #27ae60;">${datos.fuerzas.cordonInferior.toFixed(2)} kN (Tracción)</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Diagonales:</strong>
        <span class="result-value" style="color: ${datos.fuerzas.diagonal < 0 ? '#e74c3c' : '#27ae60'};">
            ${datos.fuerzas.diagonal.toFixed(2)} kN (${datos.tipo_Diag})
        </span>
    </div>`;
    
    if (datos.fuerzas.montante !== 0) {
        html += `<div class="result-item">
            <strong>Montantes:</strong>
            <span class="result-value" style="color: ${datos.fuerzas.montante < 0 ? '#e74c3c' : '#27ae60'};">
                ${datos.fuerzas.montante.toFixed(2)} kN (${datos.fuerzas.montante < 0 ? 'Compresión' : 'Tracción'})
            </span>
        </div>`;
    }
    
    html += '<h3>🔩 Diseño de Perfiles</h3>';
    html += `<div class="result-item">
        <strong>Acero Estructural:</strong>
        <span class="result-value">${datos.aceroTipo} (Fy = ${datos.Fy} MPa)</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Perfil Cordones:</strong>
        <span class="result-value">${datos.perfilCordon}</span>
    </div>`;
    
    html += `<div class="result-item">
        <strong>Perfil Diagonales:</strong>
        <span class="result-value">${datos.perfilDiagonal}</span>
    </div>`;
    
    html += '<h3>✓ Verificación de Cordón Superior</h3>';
    html += `<div class="result-item">
        <strong>Esbeltez (λ):</strong>
        <span class="result-value">${datos.slenderness_CS.toFixed(1)}</span>
    </div>`;
    
    const claseCS = datos.ratio_CS <= 1.0 ? 'alert-success' : 'alert-danger';
    html += `<div class="alert ${claseCS}">
        <strong>Capacidad a Compresión:</strong><br>
        Pu = ${datos.Pu_CS.toFixed(2)} kN<br>
        φPn = ${datos.Pn_CS.toFixed(2)} kN<br>
        Ratio: ${(datos.ratio_CS * 100).toFixed(1)}%<br>
        ${datos.ratio_CS <= 1.0 ? '✓ Perfil adecuado' : '✗ Aumentar perfil'}
    </div>`;
    
    html += '<h3>✓ Verificación de Cordón Inferior</h3>';
    const claseCI = datos.ratio_CI <= 1.0 ? 'alert-success' : 'alert-danger';
    html += `<div class="alert ${claseCI}">
        <strong>Capacidad a Tracción:</strong><br>
        Pu = ${datos.Pu_CI.toFixed(2)} kN<br>
        φPn = ${datos.Pn_CI.toFixed(2)} kN<br>
        Ratio: ${(datos.ratio_CI * 100).toFixed(1)}%<br>
        ${datos.ratio_CI <= 1.0 ? '✓ Perfil adecuado' : '✗ Aumentar perfil'}
    </div>`;
    
    html += '<h3>✓ Verificación de Diagonales</h3>';
    html += `<div class="result-item">
        <strong>Esbeltez (λ):</strong>
        <span class="result-value">${datos.slenderness_Diag.toFixed(1)}</span>
    </div>`;
    
    const claseDiag = datos.ratio_Diag <= 1.0 ? 'alert-success' : 'alert-danger';
    html += `<div class="alert ${claseDiag}">
        <strong>Capacidad (${datos.tipo_Diag}):</strong><br>
        Pu = ${datos.Pu_Diag.toFixed(2)} kN<br>
        φPn = ${datos.Pn_Diag.toFixed(2)} kN<br>
        Ratio: ${(datos.ratio_Diag * 100).toFixed(1)}%<br>
        ${datos.ratio_Diag <= 1.0 ? '✓ Perfil adecuado' : '✗ Aumentar perfil'}
    </div>`;
    
    html += '<h3>📋 Resumen de Diseño</h3>';
    html += `<div class="alert alert-success">
        <strong>CERCHA ${datos.tipo.toUpperCase()} - ${datos.L.toFixed(1)} m</strong><br>
        Cordones: ${datos.perfilCordon}<br>
        Diagonales: ${datos.perfilDiagonal}<br>
        Acero: ${datos.aceroTipo} (Fy = ${datos.Fy} MPa)<br>
        ${datos.nPaneles} paneles<br>
        <br><strong>Conexiones:</strong> Soldadura o pernos de alta resistencia
    </div>`;
    
    resultadosDiv.innerHTML = html;
}

function actualizarVisualizacion3D(datos) {
    threeScene.clearObjects();
    
    const L = datos.L;
    const H = datos.H;
    const n = datos.nPaneles;
    const a = L / n;
    
    // Crear nudos del cordón inferior
    const nudosInf = [];
    for (let i = 0; i <= n; i++) {
        nudosInf.push({ x: (i * a) - L/2, y: 0, z: 0 });
    }
    
    // Crear nudos del cordón superior
    const nudosSup = [];
    if (datos.tipo === 'fink') {
        // Cercha Fink: forma triangular
        for (let i = 0; i <= n; i++) {
            const h = H * (1 - Math.abs(2 * i / n - 1));
            nudosSup.push({ x: (i * a) - L/2, y: h, z: 0 });
        }
    } else {
        // Otras cerchas: altura constante
        for (let i = 0; i <= n; i++) {
            nudosSup.push({ x: (i * a) - L/2, y: H, z: 0 });
        }
    }
    
    // Crear barras del cordón inferior
    for (let i = 0; i < n; i++) {
        crearBarra(nudosInf[i], nudosInf[i + 1], 0x3498db);
    }
    
    // Crear barras del cordón superior
    for (let i = 0; i < n; i++) {
        crearBarra(nudosSup[i], nudosSup[i + 1], 0xe74c3c);
    }
    
    // Crear diagonales y montantes según tipo
    if (datos.tipo === 'howe') {
        for (let i = 0; i < n; i++) {
            if (i % 2 === 0) {
                crearBarra(nudosInf[i], nudosSup[i + 1], 0x27ae60);
                crearBarra(nudosInf[i + 1], nudosSup[i + 1], 0xf39c12);
            } else {
                crearBarra(nudosInf[i + 1], nudosSup[i], 0x27ae60);
                crearBarra(nudosInf[i], nudosSup[i], 0xf39c12);
            }
        }
    } else if (datos.tipo === 'pratt') {
        for (let i = 0; i < n; i++) {
            if (i % 2 === 0) {
                crearBarra(nudosInf[i], nudosSup[i], 0xf39c12);
                crearBarra(nudosInf[i + 1], nudosSup[i], 0x27ae60);
            } else {
                crearBarra(nudosInf[i], nudosSup[i], 0xf39c12);
                crearBarra(nudosInf[i], nudosSup[i + 1], 0x27ae60);
            }
        }
    } else if (datos.tipo === 'warren') {
        for (let i = 0; i < n; i++) {
            if (i % 2 === 0) {
                crearBarra(nudosInf[i], nudosSup[i + 1], 0x27ae60);
            } else {
                crearBarra(nudosInf[i + 1], nudosSup[i], 0x27ae60);
            }
        }
    } else { // fink
        // Diagonales desde extremos al centro
        crearBarra(nudosInf[0], nudosSup[n/2], 0x27ae60);
        crearBarra(nudosInf[n], nudosSup[n/2], 0x27ae60);
        // Montantes y diagonales internas
        for (let i = 1; i < n; i++) {
            if (i < n/2) {
                crearBarra(nudosInf[i], nudosSup[i], 0xf39c12);
            } else if (i > n/2) {
                crearBarra(nudosInf[i], nudosSup[i], 0xf39c12);
            }
        }
    }
    
    // Crear apoyos
    const tamApoyo = 0.3;
    const apoyo1 = threeScene.createBox(tamApoyo, tamApoyo, tamApoyo, 0x95a5a6,
        { x: -L/2, y: -tamApoyo/2, z: 0 });
    const apoyo2 = threeScene.createBox(tamApoyo, tamApoyo, tamApoyo, 0x95a5a6,
        { x: L/2, y: -tamApoyo/2, z: 0 });
    
    // Dimensiones
    threeScene.addDimension(
        { x: -L/2, y: H + 0.3, z: 0 },
        { x: L/2, y: H + 0.3, z: 0 },
        `L = ${L.toFixed(1)} m`,
        0.2
    );
    
    threeScene.addDimension(
        { x: -L/2 - 0.5, y: 0, z: 0 },
        { x: -L/2 - 0.5, y: H, z: 0 },
        `H = ${H.toFixed(1)} m`,
        0.2
    );
    
    threeScene.resetCamera({ x: L * 0.8, y: L * 0.5, z: L * 0.8 });
}

function crearBarra(nudo1, nudo2, color) {
    const points = [];
    points.push(new THREE.Vector3(nudo1.x, nudo1.y, nudo1.z));
    points.push(new THREE.Vector3(nudo2.x, nudo2.y, nudo2.z));
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: color, linewidth: 3 });
    const line = new THREE.Line(geometry, material);
    
    threeScene.scene.add(line);
    threeScene.objects.push(line);
    
    // Agregar cilindro para mejor visualización
    const dx = nudo2.x - nudo1.x;
    const dy = nudo2.y - nudo1.y;
    const dz = nudo2.z - nudo1.z;
    const length = Math.sqrt(dx*dx + dy*dy + dz*dz);
    
    const cylinder = threeScene.createCylinder(0.03, 0.03, length, color, {
        x: (nudo1.x + nudo2.x) / 2,
        y: (nudo1.y + nudo2.y) / 2,
        z: (nudo1.z + nudo2.z) / 2
    });
    
    // Rotar cilindro para que apunte de nudo1 a nudo2
    const axis = new THREE.Vector3(dz, 0, -dx).normalize();
    const angle = Math.acos(dy / length);
    cylinder.rotateOnAxis(axis, angle);
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
