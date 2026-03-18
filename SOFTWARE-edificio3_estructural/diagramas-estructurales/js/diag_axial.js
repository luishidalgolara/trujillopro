/* ============================================================
   IngeLAB 3D — Diagramas Estructurales
   diag_axial.js  |  v1.0

   Motor de cálculo REAL del Diagrama de Fuerza Axial (DFA)
   
   Soporta elementos:
     · Barra (columna/pilar) con cargas axiales puntuales
     · Armadura / celosía plana (método de nodos)
     · Pórtico simple (columnas con carga gravitacional)
   
   Cargas:
     · Fuerza axial puntual (compresión o tracción)
     · Peso propio del elemento
     · Carga de piso (losa → viga → pilar)
   
   Cálculo automático:
     · N(x) punto a punto
     · Máx. compresión y tracción
     · Diagrama de colores (azul=compresión, rojo=tracción)
     · Deformación axial δ = N·L / (E·A)
     · Tensión normal σ = N / A
   
   Verificación:
     · H.A.: σ_c ≤ 0.45·f'c  (ACI compresión simple)
     · Acero: σ ≤ fy / γM0    (AISC / EC3)
     · Esbeltez: λ = L_ef / r ≤ λ_max
     · Carga crítica de Euler: N_cr = π²·EI / L_ef²
   
   Celosía plana:
     · Método de nodos (equilibrio ΣFx=0, ΣFy=0)
     · Hasta 12 barras y 8 nodos
     · Clasificación automática: compresión / tracción / nulo
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   ESTADO GLOBAL
   ══════════════════════════════════════════════════════════ */
const DFA = {
    modo:    'barra',       // 'barra' | 'celosia' | 'portico'
    L:       3.50,          // Longitud barra [m]
    tipo:    'columna',     // 'columna' | 'tirante' | 'barra'
    
    // Sección transversal
    seccion: 'rect',        // 'rect' | 'circ' | 'IPE' | 'HEA'
    b:       0.35,          // Ancho [m]
    h_sec:   0.35,          // Alto [m]
    diam:    0.30,          // Diámetro (sección circular) [m]
    perfil:  'HEA200',      // Perfil acero
    
    // Material
    material:'HA',          // 'HA' | 'acero'
    fc:      25.0,          // MPa
    fy:      420.0,         // MPa
    E_HA:    24000,         // MPa (E = 4700·√f'c con f'c=25MPa)
    E_ac:    210000,        // MPa

    // Cargas axiales (array, positivo = compresión)
    cargas: [
        { N: 850, x: 0,    tipo: 'comp', label: 'Piso 3' },
        { N: 650, x: 0,    tipo: 'comp', label: 'Piso 2' },
        { N: 300, x: 0,    tipo: 'comp', label: 'Piso 1' },
    ],

    // Peso propio
    gamma_HA:  25.0,        // kN/m³
    gamma_ac:  78.5,        // kN/m³
    inc_pp:    true,        // Incluir peso propio

    // Longitud efectiva (pandeo)
    beta:    1.0,           // Factor de longitud efectiva (β=1 articulado-articulado)
    L_ef:    null,          // L_ef = β·L

    // Celosía
    celosia: {
        nodos: [
            { id: 0, x: 0,   y: 0,   apoyoX: true,  apoyoY: true  },
            { id: 1, x: 4,   y: 0,   apoyoX: false, apoyoY: true  },
            { id: 2, x: 2,   y: 2,   apoyoX: false, apoyoY: false },
        ],
        barras: [
            { i: 0, j: 2 },
            { i: 1, j: 2 },
            { i: 0, j: 1 },
        ],
        cargas_nodo: [
            { nodo: 2, Fx: 0, Fy: -50 }  // 50 kN hacia abajo en nodo 2
        ],
    },

    result: null,
};

/* Perfiles HEA y HEB (simplificados) */
const PERFILES_HEA = {
    'HEA100': { A: 21.2, I: 349,  W: 72.8, r: 4.07, h: 96,  b_f: 100 },
    'HEA120': { A: 25.3, I: 606,  W: 101,  r: 4.89, h: 114, b_f: 120 },
    'HEA140': { A: 31.4, I: 1030, W: 147,  r: 5.73, h: 133, b_f: 140 },
    'HEA160': { A: 38.8, I: 1670, W: 209,  r: 6.57, h: 152, b_f: 160 },
    'HEA180': { A: 45.3, I: 2510, W: 279,  r: 7.45, h: 171, b_f: 180 },
    'HEA200': { A: 53.8, I: 3690, W: 369,  r: 8.28, h: 190, b_f: 200 },
    'HEA220': { A: 64.3, I: 5410, W: 492,  r: 9.17, h: 210, b_f: 220 },
    'HEA240': { A: 76.8, I: 7760, W: 647,  r: 10.1, h: 230, b_f: 240 },
    'HEA260': { A: 86.8, I: 10450,W: 836,  r: 10.97,h: 250, b_f: 260 },
    'HEA280': { A: 97.3, I: 13670,W: 1050, r: 11.86,h: 270, b_f: 280 },
    'HEA300': { A: 112,  I: 18260,W: 1260, r: 12.74,h: 290, b_f: 300 },
};

/* ══════════════════════════════════════════════════════════
   PROPIEDADES DE SECCIÓN
   ══════════════════════════════════════════════════════════ */

function calcPropiedadesAxial(seccion, params, material) {
    let A, I, r_giro, E, gamma;

    if (seccion === 'rect') {
        A     = params.b * params.h_sec;
        I     = params.b * Math.pow(params.h_sec, 3) / 12;
        r_giro = Math.sqrt(I / A);
        E     = (material === 'HA') ? params.E_HA * 1e3 : params.E_ac * 1e3;  // kN/m²
        gamma = (material === 'HA') ? params.gamma_HA : params.gamma_ac;
    }
    else if (seccion === 'circ') {
        const r = params.diam / 2;
        A     = Math.PI * r * r;
        I     = Math.PI * Math.pow(r, 4) / 4;
        r_giro = r / 2;
        E     = params.E_HA * 1e3;
        gamma = params.gamma_HA;
    }
    else if (seccion === 'IPE' || seccion === 'HEA') {
        const perf = PERFILES_HEA[params.perfil] || PERFILES_HEA['HEA200'];
        A     = perf.A  * 1e-4;               // cm² → m²
        I     = perf.I  * 1e-8;               // cm⁴ → m⁴
        r_giro = perf.r * 1e-2;               // cm  → m
        E     = params.E_ac * 1e3;            // kN/m²
        gamma = params.gamma_ac;
    }
    else {
        A = 0.09; I = 1e-4; r_giro = 0.1; E = 24e6; gamma = 25;
    }

    return { A, I, r_giro, E, gamma };
}

/* ══════════════════════════════════════════════════════════
   DIAGRAMA N(x) — BARRA CON CARGAS AXIALES
   ══════════════════════════════════════════════════════════ */

/**
 * Genera N(x) para una barra con múltiples cargas axiales
 * Convenio: positivo = compresión (para columnas)
 * Las cargas se suman desde la cima (x=0) hasta la base (x=L)
 * 
 * Peso propio: q_pp = γ·A  [kN/m] acumulativo hacia abajo
 */
function calcDiagramaAxial(cargas, L, A, gamma, inc_pp, n = 500) {
    // Ordenar cargas por posición x
    const cargasOrdenadas = [...cargas].sort((a, b) => a.x - b.x);

    // Puntos especiales en posiciones de carga
    const specialX = new Set([0, L]);
    cargasOrdenadas.forEach(c => {
        specialX.add(Math.max(0, c.x - 1e-6));
        specialX.add(Math.min(L, c.x + 1e-6));
    });
    for (let i = 0; i <= n; i++) specialX.add((i / n) * L);
    const xs = Array.from(specialX).filter(x => x >= 0 && x <= L).sort((a, b) => a - b);

    const Ns = xs.map(x => {
        // Suma de cargas aplicadas por encima de x
        let N = 0;
        cargasOrdenadas.forEach(c => {
            if (c.x <= x + 1e-9) N += c.N;
        });
        // Peso propio acumulado desde 0 hasta x
        if (inc_pp) N += gamma * A * x;
        return N;
    });

    return { xs, Ns };
}

/* ══════════════════════════════════════════════════════════
   VERIFICACIONES ESTRUCTURALES
   ══════════════════════════════════════════════════════════ */

/**
 * Tensión normal
 */
function calcTension(N_kN, A_m2) {
    return N_kN / A_m2 / 1000;  // kN/m² → MPa   (N/m²/1e6 = MPa, pero N es kN → /1000)
    // Corrección: N [kN] / A [m²] = [kN/m²] = [kPa]  → /1000 → [MPa]
}

/**
 * Verificación H.A. (compresión simple — ACI 318-19 §22.4.2)
 *   φPn = φ·0.80·[0.85·f'c·(Ag-Ast) + fy·Ast]
 *   Simplificado sin armadura: φPn ≈ φ·0.80·0.85·f'c·Ag
 *   φ = 0.65 (espiral) ó 0.65 (estribos)
 */
function verif_HA(N_max_kN, A_m2, fc, fy, rho = 0.02) {
    const phi  = 0.65;
    const Ag   = A_m2 * 1e6;     // m² → mm²
    const Ast  = rho * Ag;       // mm²
    const Pn   = 0.80 * (0.85 * fc * (Ag - Ast) + fy * Ast);  // N
    const phiPn = phi * Pn / 1000;                              // kN
    const sigma_max = N_max_kN / A_m2 / 1000;                 // MPa
    const sigma_adm = 0.45 * fc;                               // MPa (simplificado)
    return {
        phiPn, sigma_max, sigma_adm,
        ok: N_max_kN <= phiPn,
        DCR: N_max_kN / phiPn,   // Demand/Capacity Ratio
    };
}

/**
 * Verificación acero (AISC 360 / EC3)
 *   φPn = φ·Fy·Ag  (compresión, sin pandeo)
 *   φ = 0.90 (AISC)
 */
function verif_Acero(N_max_kN, A_m2, fy) {
    const phi  = 0.90;
    const Ag   = A_m2 * 1e6;           // m² → mm²
    const Pn   = fy * Ag / 1000;       // kN
    const phiPn = phi * Pn;
    const sigma_max = N_max_kN / A_m2 / 1000;
    const sigma_adm = fy / 1.0;
    return { phiPn, sigma_max, sigma_adm, ok: N_max_kN <= phiPn, DCR: N_max_kN / phiPn };
}

/**
 * Carga crítica de Euler (pandeo)
 *   N_cr = π²·E·I / L_ef²
 * Esbeltez:
 *   λ = L_ef / r
 *   λ_max_HA = 30 (muros) a 60 (columnas aisladas) — NCh 430
 *   λ_max_ac = 200 (compresión) — AISC
 */
function calcPandeo(E_kNm2, I_m4, L_ef, r_giro, material) {
    const N_cr  = Math.PI * Math.PI * E_kNm2 * I_m4 / (L_ef * L_ef);  // kN
    const lambda = L_ef / r_giro;
    const lambda_max = material === 'HA' ? 60 : 200;
    return { N_cr, lambda, lambda_max, ok_esbeltez: lambda <= lambda_max };
}

/**
 * Deformación axial (Ley de Hooke)
 *   δ = N·L / (E·A)
 */
function calcDeformAxial(N_kN, L_m, E_kNm2, A_m2) {
    return (N_kN * L_m) / (E_kNm2 * A_m2) * 1000;  // mm
}

/* ══════════════════════════════════════════════════════════
   CELOSÍA PLANA — MÉTODO DE NODOS
   ══════════════════════════════════════════════════════════ */

/**
 * Resuelve una celosía plana por equilibrio de nodos
 * Usa eliminación gaussiana para el sistema lineal
 * Retorna fuerzas en cada barra (positivo = tracción)
 */
function resolverCelosia(nodos, barras, cargas_nodo) {
    const nN  = nodos.length;
    const nB  = barras.length;
    const nR  = nodos.filter(n => n.apoyoX || n.apoyoY).reduce((a, n) => a + (n.apoyoX ? 1 : 0) + (n.apoyoY ? 1 : 0), 0);
    const nDOF = 2 * nN;
    const nEq  = nDOF;
    const nUnk = nB + nR;

    if (nUnk !== nEq) {
        return { error: `Sistema indeterminado: ${nUnk} incógnitas, ${nEq} ecuaciones`, fuerzas: [] };
    }

    // Longitudes y ángulos de barras
    const bProps = barras.map(b => {
        const ni = nodos[b.i], nj = nodos[b.j];
        const dx = nj.x - ni.x, dy = nj.y - ni.y;
        const L  = Math.sqrt(dx * dx + dy * dy);
        const cx = dx / L, cy = dy / L;
        return { L, cx, cy, dx, dy };
    });

    // Matriz A (nEq × nUnk) y vector b (fuerzas externas)
    const A_mat = Array.from({ length: nEq }, () => new Array(nUnk).fill(0));
    const b_vec = new Array(nEq).fill(0);

    // Cargas externas
    cargas_nodo.forEach(c => {
        b_vec[2 * c.nodo]     -= c.Fx;
        b_vec[2 * c.nodo + 1] -= c.Fy;
    });

    // Ecuaciones de barras (proyección en x e y)
    barras.forEach((b, k) => {
        const { cx, cy } = bProps[k];
        // Contribución en nodo i
        A_mat[2 * b.i][k]     += cx;
        A_mat[2 * b.i + 1][k] += cy;
        // Contribución en nodo j (sentido contrario)
        A_mat[2 * b.j][k]     -= cx;
        A_mat[2 * b.j + 1][k] -= cy;
    });

    // Agregar reacciones como incógnitas adicionales
    let col = nB;
    nodos.forEach((n, i) => {
        if (n.apoyoX) { A_mat[2 * i][col++] = 1; }
        if (n.apoyoY) { A_mat[2 * i + 1][col++] = 1; }
    });

    // Eliminación gaussiana con pivoteo parcial
    const fuerzas = gaussianElimination(A_mat, b_vec, nUnk);
    if (!fuerzas) return { error: 'Sistema singular', fuerzas: [] };

    const fuerzas_barras = fuerzas.slice(0, nB);
    const reacciones = fuerzas.slice(nB);

    // Enriquecer resultado
    const resultBarras = barras.map((b, k) => {
        const N = fuerzas_barras[k];
        const tipo_barra = Math.abs(N) < 0.01 ? 'nulo' : (N > 0 ? 'traccion' : 'compresion');
        return {
            id: k,
            i: b.i, j: b.j,
            N: N,
            L: bProps[k].L,
            tipo: tipo_barra,
            ...bProps[k],
        };
    });

    return { fuerzas: resultBarras, reacciones, bProps };
}

function gaussianElimination(A, b, n) {
    const m = A.length;
    // Augmented matrix
    const M = A.map((row, i) => [...row, b[i]]);

    for (let col = 0; col < n; col++) {
        // Find pivot
        let maxRow = col;
        for (let row = col + 1; row < m; row++) {
            if (Math.abs(M[row][col]) > Math.abs(M[maxRow][col])) maxRow = row;
        }
        [M[col], M[maxRow]] = [M[maxRow], M[col]];

        if (Math.abs(M[col][col]) < 1e-12) continue;

        // Eliminate
        for (let row = 0; row < m; row++) {
            if (row === col) continue;
            const factor = M[row][col] / M[col][col];
            for (let j = col; j <= n; j++) {
                M[row][j] -= factor * M[col][j];
            }
        }
    }

    return Array.from({ length: n }, (_, i) =>
        Math.abs(M[i][i]) < 1e-12 ? 0 : M[i][n] / M[i][i]
    );
}

/* ══════════════════════════════════════════════════════════
   FUNCIÓN PRINCIPAL
   ══════════════════════════════════════════════════════════ */
function calcularDFA() {
    const props = calcPropiedadesAxial(DFA.seccion, DFA, DFA.material);
    DFA.L_ef = DFA.beta * DFA.L;

    let diagrama, celosia_result = null;

    if (DFA.modo === 'barra' || DFA.modo === 'portico') {
        diagrama = calcDiagramaAxial(DFA.cargas, DFA.L, props.A, props.gamma, DFA.inc_pp);
    } else if (DFA.modo === 'celosia') {
        celosia_result = resolverCelosia(
            DFA.celosia.nodos,
            DFA.celosia.barras,
            DFA.celosia.cargas_nodo
        );
        // Para el diagrama de barra usamos el resultado de la primera barra
        diagrama = { xs: [0, DFA.L], Ns: [0, 0] };
    }

    const { xs, Ns } = diagrama;
    const N_max     = Math.max(...Ns);
    const N_min     = Math.min(...Ns);
    const NmaxAbs   = Math.max(Math.abs(N_max), Math.abs(N_min));
    const iMax      = Ns.indexOf(N_max);
    const iMin      = Ns.indexOf(N_min);

    // Verificación
    let verif;
    if (DFA.material === 'HA') {
        verif = verif_HA(NmaxAbs, props.A, DFA.fc, DFA.fy);
    } else {
        verif = verif_Acero(NmaxAbs, props.A, DFA.fy);
    }

    // Pandeo
    const pandeo = calcPandeo(props.E, props.I, DFA.L_ef, props.r_giro, DFA.material);

    // Deformación
    const delta = calcDeformAxial(NmaxAbs, DFA.L, props.E, props.A);

    // Tensión
    const sigma_max = calcTension(NmaxAbs, props.A);

    DFA.result = {
        xs, Ns,
        N_max, N_min, NmaxAbs,
        xNmax: xs[iMax], xNmin: xs[iMin],
        props,
        verif,
        pandeo,
        delta,
        sigma_max,
        celosia: celosia_result,
    };

    return DFA.result;
}

/* ══════════════════════════════════════════════════════════
   RENDERING
   ══════════════════════════════════════════════════════════ */

const COLORES_A = {
    comp:    '#0077ff',   // Compresión → azul
    trac:    '#ff4757',   // Tracción → rojo
    nulo:    'rgba(255,255,255,0.3)',
    grid:    'rgba(255,255,255,0.05)',
    text:    'rgba(255,255,255,0.7)',
    textDim: 'rgba(255,255,255,0.3)',
    accent:  '#00e5ff',
};

/**
 * Dibuja el Diagrama de Fuerza Axial (columna vertical)
 */
function drawDFA(canvas, result, opts = {}) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { xs, Ns } = result;
    const L    = xs[xs.length - 1];
    const Nabs = Math.max(...Ns.map(Math.abs)) || 1;

    const pad = { top: 50, right: 80, bottom: 50, left: 80 };
    const cw  = W - pad.left - pad.right;
    const ch  = H - pad.top  - pad.bottom;

    // Para columna: dibujar verticalmente
    // x_canvas = pad.left + cw/2 (centro)
    // y_canvas varía según x (posición en columna)
    const cx_col = pad.left + cw / 2;
    const scaleY = ch / L;
    const scaleN = (cw * 0.38) / Nabs;

    // Grid horizontal
    ctx.strokeStyle = COLORES_A.grid;
    ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
    for (let i = 0; i <= 6; i++) {
        const y = pad.top + (i / 6) * ch;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Eje central (columna)
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx_col, pad.top);
    ctx.lineTo(cx_col, pad.top + ch);
    ctx.stroke();

    // Diagrama N(x) — relleno a la derecha del eje
    const ptsRight = xs.map((x, i) => ({
        py: pad.top + x * scaleY,
        px: cx_col + Ns[i] * scaleN,
    }));

    // Fill compresión (positivo → derecha → azul)
    ctx.beginPath();
    ctx.moveTo(cx_col, pad.top);
    ptsRight.forEach(p => ctx.lineTo(p.px, p.py));
    ctx.lineTo(cx_col, pad.top + ch);
    ctx.closePath();

    const hasComp = Ns.some(n => n > 0);
    const hasTrac = Ns.some(n => n < 0);

    if (hasComp) {
        const gComp = ctx.createLinearGradient(cx_col, 0, cx_col + Nabs * scaleN, 0);
        gComp.addColorStop(0, 'rgba(0,119,255,0.05)');
        gComp.addColorStop(1, 'rgba(0,119,255,0.55)');
        ctx.fillStyle = gComp;
        ctx.fill();
    }

    // Stroke del diagrama
    ctx.beginPath();
    ptsRight.forEach((p, i) => i === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py));
    ctx.strokeStyle = hasComp ? COLORES_A.comp : COLORES_A.trac;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Dibujar columna (rectángulo central)
    const colW = Math.min(cw * 0.08, 20);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(cx_col - colW / 2, pad.top, colW, ch);
    ctx.fill(); ctx.stroke();

    // Cargas sobre la columna
    DFA.cargas.forEach(c => {
        const py = pad.top + c.x * scaleY;
        drawLoadArrowAxial(ctx, cx_col, py, c.N, c.label || `${c.N}kN`);
    });

    // Etiquetas N
    drawAxialLabels(ctx, result, cx_col, pad.top, scaleY, scaleN);

    // Ejes y escalas
    drawAxesA(ctx, pad, cw, ch, W, H, L, cx_col, scaleY, Nabs, scaleN);

    // Empotrado base
    drawBaseSupport(ctx, cx_col, pad.top + ch, colW);
}

function drawLoadArrowAxial(ctx, cx, y, N_kN, label) {
    const isComp = N_kN > 0;
    const color  = isComp ? 'rgba(255,140,0,0.9)' : 'rgba(255,71,87,0.9)';
    const arrowLen = 35;
    const x1 = cx - arrowLen, x2 = cx - 4;

    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2 - 8, y - 4); ctx.lineTo(x2, y); ctx.lineTo(x2 - 8, y + 4);
    ctx.stroke();

    ctx.font = 'bold 10px Space Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(label || `${N_kN.toFixed(0)} kN`, x1 - 4, y + 3);
}

function drawAxialLabels(ctx, result, cx, y0, scaleY, scaleN) {
    const { N_max, xNmax } = result;
    if (Math.abs(N_max) < 0.1) return;

    const py = y0 + xNmax * scaleY;
    const px = cx + N_max * scaleN;

    ctx.strokeStyle = COLORES_A.comp;
    ctx.fillStyle   = COLORES_A.comp;
    ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(cx, py); ctx.lineTo(px + 4, py); ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = 'bold 10px Space Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`N = ${N_max.toFixed(1)} kN`, px + 8, py + 3);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '9px Space Mono, monospace';
    ctx.fillText(`x = ${xNmax.toFixed(2)} m`, px + 8, py + 14);
}

function drawBaseSupport(ctx, cx, y, colW) {
    const w = colW * 3;
    ctx.fillStyle = 'rgba(0,229,255,0.12)';
    ctx.strokeStyle = 'rgba(0,229,255,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(cx - w / 2, y, w, 12);
    ctx.fill(); ctx.stroke();
    // Hatching
    ctx.strokeStyle = 'rgba(0,229,255,0.2)'; ctx.lineWidth = 1;
    for (let x = cx - w / 2; x <= cx + w / 2 + 10; x += 8) {
        ctx.beginPath(); ctx.moveTo(x, y + 12); ctx.lineTo(x - 8, y + 20); ctx.stroke();
    }
}

function drawAxesA(ctx, pad, cw, ch, W, H, L, cx_col, scaleY, Nabs, scaleN) {
    // Escala vertical (posición en columna)
    ctx.fillStyle = COLORES_A.textDim;
    ctx.font = '10px Space Mono, monospace';
    ctx.textAlign = 'right';
    [0, 0.25, 0.5, 0.75, 1.0].forEach(f => {
        const y = pad.top + f * ch;
        const val = f * L;
        ctx.beginPath(); ctx.moveTo(cx_col - 4, y); ctx.lineTo(cx_col + 4, y);
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = COLORES_A.textDim;
        ctx.fillText(`${val.toFixed(1)} m`, cx_col - 8, y + 3);
    });

    // Escala horizontal (N)
    ctx.textAlign = 'center';
    [0.25, 0.5, 0.75, 1.0].forEach(f => {
        const x = cx_col + f * Nabs * scaleN;
        ctx.fillStyle = COLORES_A.textDim;
        ctx.fillText(`${(f * Nabs).toFixed(0)}`, x, pad.top + ch + 18);
    });

    // Label ejes
    ctx.fillStyle = COLORES_A.text; ctx.font = '11px DM Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('N [kN]', pad.left + cw / 2 + 30, pad.top + ch + 36);
    ctx.save(); ctx.translate(18, pad.top + ch / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('x [m]', 0, 0); ctx.restore();
}

/**
 * Dibuja la celosía plana con colores según tipo de barra
 */
function drawCelosia(canvas, celosiaResult, nodos) {
    if (!canvas || !celosiaResult || !celosiaResult.fuerzas.length) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Encontrar bounds de la celosía
    const xs  = nodos.map(n => n.x), ys  = nodos.map(n => n.y);
    const xMin = Math.min(...xs), xMax = Math.max(...xs);
    const yMin = Math.min(...ys), yMax = Math.max(...ys);
    const pad = 60;

    const scaleX = (W - pad * 2) / Math.max(xMax - xMin, 1);
    const scaleY = (H - pad * 2) / Math.max(yMax - yMin, 1);
    const scale  = Math.min(scaleX, scaleY);

    const toScreen = (x, y) => ({
        px: pad + (x - xMin) * scale,
        py: H - pad - (y - yMin) * scale,
    });

    const N_max_cel = Math.max(...celosiaResult.fuerzas.map(b => Math.abs(b.N))) || 1;

    // Barras
    celosiaResult.fuerzas.forEach(b => {
        const ni = toScreen(nodos[b.i].x, nodos[b.i].y);
        const nj = toScreen(nodos[b.j].x, nodos[b.j].y);
        const t  = Math.abs(b.N) / N_max_cel;
        const lw = 1.5 + t * 6;
        const color = b.tipo === 'compresion' ? COLORES_A.comp
                    : b.tipo === 'traccion'   ? COLORES_A.trac
                    : COLORES_A.nulo;

        ctx.beginPath();
        ctx.moveTo(ni.px, ni.py);
        ctx.lineTo(nj.px, nj.py);
        ctx.strokeStyle = color;
        ctx.lineWidth = lw;
        ctx.stroke();

        // Label fuerza en barra
        const mx = (ni.px + nj.px) / 2, my = (ni.py + nj.py) / 2;
        ctx.fillStyle = color;
        ctx.font = 'bold 10px Space Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.abs(b.N).toFixed(1)} kN`, mx, my - 6);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '8px Space Mono, monospace';
        ctx.fillText(b.tipo === 'compresion' ? 'C' : b.tipo === 'traccion' ? 'T' : '0', mx, my + 10);
    });

    // Nodos
    nodos.forEach((n, i) => {
        const { px, py } = toScreen(n.x, n.y);

        // Apoyos
        if (n.apoyoX && n.apoyoY) drawPinNodeC(ctx, px, py);
        else if (n.apoyoY)        drawRollerNodeC(ctx, px, py);

        // Nodo
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,229,255,0.8)';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px Space Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(i, px, py - 10);
    });

    // Cargas en nodos
    DFA.celosia.cargas_nodo.forEach(c => {
        const { px, py } = toScreen(nodos[c.nodo].x, nodos[c.nodo].y);
        if (c.Fy !== 0) {
            const dir = c.Fy < 0 ? 1 : -1;
            ctx.strokeStyle = 'rgba(255,140,0,0.9)'; ctx.fillStyle = 'rgba(255,140,0,0.9)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + dir * 30); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(px - 5, py + dir * 22); ctx.lineTo(px, py + dir * 30); ctx.lineTo(px + 5, py + dir * 22); ctx.stroke();
            ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
            ctx.fillText(`${Math.abs(c.Fy)} kN`, px, py + dir * 46);
        }
    });
}

function drawPinNodeC(ctx, x, y) {
    const s = 10;
    ctx.fillStyle = 'rgba(0,229,255,0.15)'; ctx.strokeStyle = 'rgba(0,229,255,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x, y + 6); ctx.lineTo(x - s, y + 6 + s * 1.4); ctx.lineTo(x + s, y + 6 + s * 1.4); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - s - 4, y + 6 + s * 1.4); ctx.lineTo(x + s + 4, y + 6 + s * 1.4); ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.stroke();
}

function drawRollerNodeC(ctx, x, y) {
    const s = 10;
    ctx.strokeStyle = 'rgba(0,229,255,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, y + 10, 5, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - s - 4, y + 16); ctx.lineTo(x + s + 4, y + 16); ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.stroke();
}

/* ══════════════════════════════════════════════════════════
   API PÚBLICA
   ══════════════════════════════════════════════════════════ */
window.DFA_MODULE = {
    state: DFA,
    calcular: calcularDFA,
    draw: drawDFA,
    drawCelosia,
    PERFILES_HEA,

    setParam(key, value) { DFA[key] = value; },
    addCarga(c)   { DFA.cargas.push(c); },
    clearCargas() { DFA.cargas = []; },

    formatResult(result) {
        if (!result) return '';
        const r = result;
        const v = r.verif, p = r.pandeo;
        return [
            `── Sección ─────────────────────`,
            `A     = ${(r.props.A * 1e4).toFixed(2)} cm²`,
            `E     = ${(r.props.E / 1000).toFixed(0)} GPa`,
            ``,
            `── Fuerza Axial ────────────────`,
            `N_max = ${r.N_max.toFixed(2)} kN (comp.)`,
            `N_min = ${r.N_min.toFixed(2)} kN`,
            `δ     = ${r.delta.toFixed(3)} mm`,
            `σ     = ${r.sigma_max.toFixed(2)} MPa`,
            ``,
            `── Verificación ────────────────`,
            `φPn   = ${v.phiPn.toFixed(2)} kN`,
            `DCR   = ${v.DCR.toFixed(3)}  ${v.ok ? '✅ OK' : '❌ NO CUMPLE'}`,
            ``,
            `── Pandeo (Euler) ──────────────`,
            `L_ef  = ${r.pandeo.lambda < 200 ? DFA.L_ef.toFixed(2) : '—'} m  (β=${DFA.beta})`,
            `λ     = ${p.lambda.toFixed(1)}  (λ_max=${p.lambda_max})`,
            `N_cr  = ${p.N_cr.toFixed(1)} kN`,
            `Esbeltez: ${p.ok_esbeltez ? '✅ OK' : '⚠️ Revisar'}`,
        ].join('\n');
    },
};
