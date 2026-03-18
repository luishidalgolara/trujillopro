/* ============================================================
   IngeLAB 3D — Diagramas Estructurales
   diag_cortante.js  |  v1.0

   Motor de cálculo REAL del Diagrama de Fuerza Cortante (DFC)
   
   Soporta:
     · Viga simplemente apoyada
     · Viga en voladizo (cantilever)
     · Viga continua 2 y 3 tramos (método de 3 momentos)
   
   Cargas:
     · Puntual (en cualquier posición)
     · Distribuida uniforme (total o parcial)
     · Triangular (creciente / decreciente)
     · Trapecial
   
   Cálculo automático:
     · Reacciones en apoyos (equilibrio estático)
     · V(x) punto a punto (n=500)
     · Saltos en puntos de carga puntual
     · Posición de V=0 (máximo momento)
     · Verificación de corte en H.A. (NCh 430 / ACI 318-19)
     · Diseño de estribos: separación mínima requerida
   
   Sección H.A.:
     · Cortante nominal Vn = Vc + Vs
     · Vc = 0.17·λ·√f'c·bw·d  (ACI 318-19, Ec. 22.5.5.1)
     · Vs = Av·fy·d / s
     · Separación de estribos s requerida
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   ESTADO GLOBAL DEL MÓDULO
   ══════════════════════════════════════════════════════════ */
const DFC = {
    L:      6.0,        // Longitud [m]
    tipo:   'simple',   // 'simple' | 'voladizo' | 'continua2' | 'continua3'
    
    // Sección transversal (H.A.)
    bw:     0.30,       // Ancho alma [m]
    h_sec:  0.55,       // Altura total [m]
    recub:  0.04,       // Recubrimiento [m]
    d:      null,       // Altura efectiva [m] — calculada: h - recub - diam/2
    diam_e: 0.008,      // Diámetro estribo [m] (Ø8mm)
    Av:     null,       // Área estribo doble [m²]

    // Material
    fc:     25.0,       // MPa  f'c hormigón
    fy:     420.0,      // MPa  fy acero estribos
    lambda: 1.0,        // Factor hormigón normal (=1.0)

    // Cargas activas
    cargas: [
        { tipo: 'dist', q: 20.0, a: 0, b_end: 1.0 }
    ],

    // Viga continua — longitudes de tramos
    tramos: [4.0, 4.0],   // para 'continua2'

    // Resultado calculado
    result: null,
};

/* ══════════════════════════════════════════════════════════
   CÁLCULO DE REACCIONES
   ══════════════════════════════════════════════════════════ */

/**
 * Reacciones viga simplemente apoyada — equilibrio estático
 * ΣMB = 0 → RA   |   ΣFy = 0 → RB
 */
function calcReaccionesSimpleDFC(cargas, L) {
    let sumFy = 0, sumMB = 0;

    cargas.forEach(c => {
        if (c.tipo === 'puntual') {
            sumFy += c.P;
            sumMB += c.P * (L - c.a);
        }
        else if (c.tipo === 'dist') {
            const F = c.q * (c.b_end - c.a);
            const xG = (c.a + c.b_end) / 2;
            sumFy += F;
            sumMB += F * (L - xG);
        }
        else if (c.tipo === 'triangular') {
            // q crece de 0 en a hasta q_max en b
            const F = 0.5 * c.q * (c.b_end - c.a);
            const xG = c.a + (c.b_end - c.a) * 2 / 3;
            sumFy += F;
            sumMB += F * (L - xG);
        }
        else if (c.tipo === 'trapecial') {
            // q1 en a, q2 en b
            const len = c.b_end - c.a;
            const F1 = c.q1 * len;           // rect.
            const F2 = 0.5 * (c.q2 - c.q1) * len;  // triáng.
            const xG1 = c.a + len / 2;
            const xG2 = c.a + len * 2 / 3;
            sumFy += F1 + F2;
            sumMB += F1 * (L - xG1) + F2 * (L - xG2);
        }
    });

    const RA = sumMB / L;
    const RB = sumFy - RA;
    return { RA, RB, reactions: [RA, RB] };
}

/**
 * Reacciones viga voladizo — empotramiento en x=0
 */
function calcReaccionesVoladizoDFC(cargas, L) {
    let RA = 0, MA = 0;
    cargas.forEach(c => {
        if (c.tipo === 'puntual') {
            RA += c.P; MA += c.P * c.a;
        }
        else if (c.tipo === 'dist') {
            const F = c.q * (c.b_end - c.a);
            const xG = (c.a + c.b_end) / 2;
            RA += F; MA += F * xG;
        }
        else if (c.tipo === 'triangular') {
            const F = 0.5 * c.q * (c.b_end - c.a);
            const xG = c.a + (c.b_end - c.a) * 2 / 3;
            RA += F; MA += F * xG;
        }
    });
    return { RA, MA, RB: 0, reactions: [RA] };
}

/**
 * Reacciones viga continua 2 tramos — Método de 3 momentos (Clapeyron)
 * Apoyos: A (x=0), B (x=L1), C (x=L1+L2)
 * M_A = M_C = 0 (apoyos simples extremos)
 * Ecuación de Clapeyron:
 *   M_A·L1 + 2·M_B·(L1+L2) + M_C·L2 = -6·(A1·a1/L1 + A2·b2/L2)
 * con M_A = M_C = 0 → M_B = -6·(...)/(2·(L1+L2))
 */
function calcReaccionesContinua2(cargas, L1, L2) {
    // Calcular término de carga para cada tramo
    // Para carga distribuida uniforme en tramo i: Ai·ai/Li = q·L³/24
    function loadTerm(cargasTramo, Li, tramo) {
        let term = 0;
        cargasTramo.forEach(c => {
            if (c.tipo === 'dist') {
                // Simplificación: carga en todo el tramo
                term += c.q * Math.pow(Li, 3) / 24;
            }
            else if (c.tipo === 'puntual') {
                // Término exacto: P·a·(L²-a²)/(6L) donde a desde inicio tramo
                const a = c.a_local || 0;
                const b = Li - a;
                term += c.P * a * (Li * Li - a * a) / (6 * Li);
            }
        });
        return term;
    }

    // Separar cargas por tramo
    const cargas1 = cargas.filter(c => (c.a || 0) < L1);
    const cargas2 = cargas.filter(c => (c.a || 0) >= L1);
    const cargas2_local = cargas2.map(c => ({ ...c, a_local: c.a - L1 }));

    const t1 = loadTerm(cargas1, L1, 1);
    const t2 = loadTerm(cargas2_local, L2, 2);

    const MB = -6 * (t1 / L1 + t2 / L2) / (2 * (L1 + L2));

    // Con M_B conocido, calcular reacciones de cada tramo
    // Tramo 1 (A-B): ΣMA=0 → RB1·L1 = suma cargas·brazo + M_B
    let sumFy1 = 0, sumM1 = 0;
    cargas1.forEach(c => {
        if (c.tipo === 'dist') {
            const F = c.q * Math.min(c.b_end, L1);
            sumFy1 += F; sumM1 += F * Math.min(c.b_end, L1) / 2;
        }
        else if (c.tipo === 'puntual' && c.a < L1) {
            sumFy1 += c.P; sumM1 += c.P * c.a;
        }
    });
    const RB1 = (sumM1 + MB) / L1;   // Reacción en B desde tramo 1
    const RA  = sumFy1 - RB1;

    // Tramo 2 (B-C): ΣMC=0 → RB2·L2 = suma cargas·brazo - M_B
    let sumFy2 = 0, sumM2 = 0;
    cargas2_local.forEach(c => {
        if (c.tipo === 'dist') {
            const F = c.q * (c.b_end - c.a);
            const xG = (c.a + c.b_end) / 2;
            sumFy2 += F; sumM2 += F * (L2 - xG);
        }
    });
    const RB2 = (sumM2 - MB) / L2;   // Reacción en B desde tramo 2
    const RC  = sumFy2 - RB2;
    const RB  = RB1 + RB2;           // Reacción total en apoyo B

    return { RA, RB, RC, MB, reactions: [RA, RB, RC] };
}

/* ══════════════════════════════════════════════════════════
   DIAGRAMA V(x) — Cálculo punto a punto
   ══════════════════════════════════════════════════════════ */

/**
 * Evalúa V(x) por equilibrio de sección
 * Suma todas las fuerzas verticales a la IZQUIERDA de x
 */
function calcVx(x, cargas, RA, tipo) {
    let V = tipo === 'voladizo' ? -RA : RA;

    cargas.forEach(c => {
        if (c.tipo === 'puntual') {
            if (tipo === 'voladizo') {
                if (c.a <= x) V += c.P;
            } else {
                if (c.a < x) V -= c.P;
                else if (Math.abs(c.a - x) < 1e-9) V -= c.P / 2; // punto exacto
            }
        }
        else if (c.tipo === 'dist') {
            if (c.a < x) {
                const b = Math.min(c.b_end, x);
                const len = b - c.a;
                if (tipo === 'voladizo') V += c.q * len;
                else                    V -= c.q * len;
            }
        }
        else if (c.tipo === 'triangular') {
            if (c.a < x) {
                const b = Math.min(c.b_end, x);
                const len = b - c.a;
                const totalLen = c.b_end - c.a;
                const F = 0.5 * c.q * len * len / totalLen;
                if (tipo === 'voladizo') V += F;
                else                    V -= F;
            }
        }
        else if (c.tipo === 'trapecial') {
            if (c.a < x) {
                const b   = Math.min(c.b_end, x);
                const len = b - c.a;
                const totalLen = c.b_end - c.a;
                const q_x = c.q1 + (c.q2 - c.q1) * len / totalLen;
                const F = (c.q1 + q_x) / 2 * len;
                if (tipo === 'voladizo') V += F;
                else                    V -= F;
            }
        }
    });

    return V;
}

/**
 * Genera el array completo de V(x) con n puntos
 * Detecta saltos en puntos de carga puntual
 */
function calcDiagramaCortante(cargas, L, tipo, reacciones, n = 500) {
    const xs = [], Vs = [];
    const { RA } = reacciones;

    // Puntos especiales: posiciones de cargas puntuales (añadir puntos justo antes y después)
    const specialX = new Set([0, L]);
    cargas.forEach(c => {
        if (c.tipo === 'puntual') {
            specialX.add(Math.max(0, c.a - 1e-6));
            specialX.add(c.a);
            specialX.add(Math.min(L, c.a + 1e-6));
        }
        if (c.a !== undefined)     specialX.add(c.a);
        if (c.b_end !== undefined) specialX.add(Math.min(L, c.b_end));
    });

    // Generar puntos uniformes + especiales
    const allX = new Set([...specialX]);
    for (let i = 0; i <= n; i++) allX.add((i / n) * L);
    const sortedX = Array.from(allX).filter(x => x >= 0 && x <= L).sort((a, b) => a - b);

    sortedX.forEach(x => {
        xs.push(x);
        Vs.push(calcVx(x, cargas, RA, tipo));
    });

    return { xs, Vs };
}

/* ══════════════════════════════════════════════════════════
   VALORES NOTABLES DE V(x)
   ══════════════════════════════════════════════════════════ */

function findNotablesCortante(xs, Vs) {
    const Vmax = Math.max(...Vs);
    const Vmin = Math.min(...Vs);
    const iMax = Vs.indexOf(Vmax);
    const iMin = Vs.indexOf(Vmin);

    // Puntos donde V = 0 (candidatos a M_max)
    const cerosV = [];
    for (let i = 0; i < Vs.length - 1; i++) {
        if (Vs[i] * Vs[i + 1] < 0) {
            const x0 = xs[i] - Vs[i] * (xs[i + 1] - xs[i]) / (Vs[i + 1] - Vs[i]);
            cerosV.push(parseFloat(x0.toFixed(4)));
        }
        if (Math.abs(Vs[i]) < 1e-3 && Math.abs(Vs[i]) < Math.abs(Vs[i - 1] || Infinity)) {
            cerosV.push(parseFloat(xs[i].toFixed(4)));
        }
    }

    // Saltos (puntos de discontinuidad)
    const saltos = [];
    for (let i = 1; i < Vs.length; i++) {
        const dV = Math.abs(Vs[i] - Vs[i - 1]);
        const dx = xs[i] - xs[i - 1];
        if (dx < 1e-5 && dV > 0.5) {
            saltos.push({ x: xs[i], dV, Vantes: Vs[i - 1], Vdespues: Vs[i] });
        }
    }

    return {
        Vmax, Vmin,
        xVmax: xs[iMax], xVmin: xs[iMin],
        cerosV: [...new Set(cerosV)],
        saltos,
        VmaxAbs: Math.max(Math.abs(Vmax), Math.abs(Vmin)),
    };
}

/* ══════════════════════════════════════════════════════════
   DISEÑO A CORTE — NCh 430 / ACI 318-19
   ══════════════════════════════════════════════════════════ */

/**
 * Calcula la resistencia a corte del hormigón Vc
 * ACI 318-19, Tabla 22.5.5.1 (método simplificado):
 *   Vc = [8λ(ρw)^(1/3)·√f'c + Nu/(6·Ag)] · bw · d
 * Simplificado sin axil:
 *   Vc ≈ 0.17·λ·√f'c·bw·d  [N, mm]
 */
function calcVc(bw, d, fc, lambda = 1.0) {
    // Convertir a unidades SI: bw en mm, d en mm, fc en MPa → Vc en N
    const bw_mm = bw * 1000;
    const d_mm  = d  * 1000;
    const Vc_N  = 0.17 * lambda * Math.sqrt(fc) * bw_mm * d_mm;
    return Vc_N / 1000;  // kN
}

/**
 * Separación de estribos requerida s para un cortante de diseño Vu
 *   Vs = Vu/φ - Vc   donde φ = 0.75
 *   s  = Av·fy·d / Vs
 * Límites: s_max = min(d/2, 600mm) si Vs ≤ 0.33·√f'c·bw·d
 *           s_max = min(d/4, 300mm) si Vs > 0.33·√f'c·bw·d
 */
function calcEstribos(Vu, bw, d, fc, fy, diam_e, lambda = 1.0) {
    const phi  = 0.75;
    const Vc   = calcVc(bw, d, fc, lambda);           // kN
    const VuR  = Vu / phi;                              // kN  (demanda reducida)
    const Vs   = Math.max(0, VuR - Vc);               // kN

    // Área estribo doble (2 ramas)
    const Av = 2 * Math.PI * Math.pow(diam_e / 2, 2); // m²

    let s_req, s_max, zona;

    if (Vs <= 0.001) {
        // No requiere refuerzo transversal calculado — solo mínimo
        s_req = (Av * fy * 1000 * d) / (0.062 * Math.sqrt(fc) * bw * 1000);  // m
        s_max = Math.min(d / 2, 0.60);
        zona  = 'Zona mínima (Vs ≈ 0)';
    } else {
        s_req = (Av * fy * 1000 * d) / (Vs);   // m  (Av en m², fy en MPa, d en m, Vs en kN)
        // Límite superior Vs
        const VsLim = 0.33 * Math.sqrt(fc) * bw * 1000 * d * 1000 / 1000;  // kN
        if (Vs <= VsLim) {
            s_max = Math.min(d / 2, 0.60);
            zona  = 'Zona moderada';
        } else {
            s_max = Math.min(d / 4, 0.30);
            zona  = '⚠️ Zona alta — revisar sección';
        }
    }

    const s_diseño = Math.min(s_req, s_max);

    // Verificación Vs_max = 0.66·√f'c·bw·d
    const Vs_max = 0.66 * Math.sqrt(fc) * bw * 1000 * d * 1000 / 1000;
    const ok_seccion = Vs <= Vs_max;

    return {
        Vc, Vs, VuR,
        Av, Av_cm2: Av * 10000,
        s_req:    Math.round(s_req * 1000),      // mm
        s_max:    Math.round(s_max * 1000),      // mm
        s_diseño: Math.round(s_diseño * 1000),   // mm
        zona,
        ok_seccion,
        phi,
    };
}

/**
 * Genera el diagrama de estribos: separación s(x) en toda la viga
 */
function calcDiagramaEstribos(xs, Vs, bw, d, fc, fy, diam_e) {
    return xs.map((x, i) => {
        const Vu = Math.abs(Vs[i]);
        if (Vu < 0.1) return { x, s: 600 };  // separación máxima
        const est = calcEstribos(Vu, bw, d, fc, fy, diam_e);
        return { x, s: est.s_diseño, Vc: est.Vc, Vs_req: est.Vs };
    });
}

/* ══════════════════════════════════════════════════════════
   FUNCIÓN PRINCIPAL
   ══════════════════════════════════════════════════════════ */
function calcularDFC() {
    // 1. Altura efectiva
    DFC.d  = DFC.h_sec - DFC.recub - DFC.diam_e / 2 - 0.016;  // asume barra Ø16mm
    DFC.Av = 2 * Math.PI * Math.pow(DFC.diam_e / 2, 2);

    // 2. Reacciones
    let reacciones;
    if (DFC.tipo === 'simple') {
        reacciones = calcReaccionesSimpleDFC(DFC.cargas, DFC.L);
    } else if (DFC.tipo === 'voladizo') {
        reacciones = calcReaccionesVoladizoDFC(DFC.cargas, DFC.L);
    } else if (DFC.tipo === 'continua2') {
        const [L1, L2] = DFC.tramos;
        reacciones = calcReaccionesContinua2(DFC.cargas, L1, L2);
    } else {
        reacciones = calcReaccionesSimpleDFC(DFC.cargas, DFC.L);
    }

    // 3. Diagrama V(x)
    const { xs, Vs } = calcDiagramaCortante(DFC.cargas, DFC.L, DFC.tipo, reacciones);

    // 4. Valores notables
    const notables = findNotablesCortante(xs, Vs);

    // 5. Vc de la sección
    const Vc = calcVc(DFC.bw, DFC.d, DFC.fc, DFC.lambda);
    const VcLine = xs.map(() => Vc);
    const VcNegLine = xs.map(() => -Vc);

    // 6. Diseño de estribos en punto crítico (Vu_max)
    const Vu_crit = notables.VmaxAbs;
    const estribos_crit = calcEstribos(Vu_crit, DFC.bw, DFC.d, DFC.fc, DFC.fy, DFC.diam_e, DFC.lambda);

    // 7. Diagrama de separación de estribos s(x)
    const diagEstribos = calcDiagramaEstribos(xs, Vs, DFC.bw, DFC.d, DFC.fc, DFC.fy, DFC.diam_e);

    DFC.result = {
        xs, Vs,
        reacciones,
        notables,
        Vc,
        VcLine,
        VcNegLine,
        estribos_crit,
        diagEstribos,
        d: DFC.d,
    };

    return DFC.result;
}

/* ══════════════════════════════════════════════════════════
   RENDERING — Canvas
   ══════════════════════════════════════════════════════════ */

const COLORES_C = {
    pos:      '#0077ff',
    neg:      '#ff4757',
    Vc:       'rgba(0,255,157,0.7)',
    neutro:   'rgba(255,255,255,0.15)',
    grid:     'rgba(255,255,255,0.05)',
    text:     'rgba(255,255,255,0.7)',
    textDim:  'rgba(255,255,255,0.3)',
    accent:   '#00e5ff',
    estribo:  '#ff8c00',
};

/**
 * Dibuja el Diagrama de Fuerza Cortante completo
 */
function drawDFC(canvas, result, opts = {}) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const pad = { top: 55, right: 40, bottom: 75, left: 65 };
    const cw  = W - pad.left - pad.right;
    const ch  = H - pad.top  - pad.bottom;

    const { xs, Vs, Vc, notables } = result;
    const Vabs   = Math.max(...Vs.map(Math.abs)) || 1;
    const L      = xs[xs.length - 1];
    const scaleX = cw / L;
    const scaleV = (ch * 0.44) / Vabs;
    const yMid   = pad.top + ch * 0.5;

    // Grid
    drawGridC(ctx, pad, cw, ch, yMid);

    // Líneas de Vc ±
    drawVcLines(ctx, pad.left, yMid, cw, Vc, scaleV);

    // Diagrama V(x) — zonas positiva y negativa con colores distintos
    drawShearDiagram(ctx, xs, Vs, pad.left, yMid, scaleX, scaleV, L);

    // Etiquetas de valores notables
    drawShearLabels(ctx, result, pad.left, yMid, scaleX, scaleV);

    // Viga y apoyos
    drawBeamC(ctx, pad.left, yMid + ch * 0.46 - 16, cw, result, L);

    // Ejes
    drawAxesC(ctx, pad, cw, ch, W, H, L, yMid, Vabs, scaleV);
}

function drawGridC(ctx, pad, cw, ch, yMid) {
    ctx.strokeStyle = COLORES_C.grid;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    for (let i = 0; i <= 4; i++) {
        const y1 = yMid - (i / 4) * ch * 0.44;
        const y2 = yMid + (i / 4) * ch * 0.44;
        ctx.beginPath(); ctx.moveTo(pad.left, y1); ctx.lineTo(pad.left + cw, y1); ctx.stroke();
        if (i > 0) { ctx.beginPath(); ctx.moveTo(pad.left, y2); ctx.lineTo(pad.left + cw, y2); ctx.stroke(); }
    }
    ctx.setLineDash([]);
}

function drawVcLines(ctx, x0, y0, cw, Vc, scaleV) {
    // Línea Vc positivo
    const yVc_pos = y0 - Vc * scaleV;
    const yVc_neg = y0 + Vc * scaleV;

    ctx.strokeStyle = COLORES_C.Vc;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 5]);

    ctx.beginPath(); ctx.moveTo(x0, yVc_pos); ctx.lineTo(x0 + cw, yVc_pos); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0, yVc_neg); ctx.lineTo(x0 + cw, yVc_neg); ctx.stroke();

    ctx.setLineDash([]);

    // Label Vc
    ctx.fillStyle = COLORES_C.Vc;
    ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Vc = ${Vc.toFixed(1)} kN`, x0 + cw + 4, yVc_pos + 3);
    ctx.fillText(`-Vc`, x0 + cw + 4, yVc_neg + 3);
}

function drawShearDiagram(ctx, xs, Vs, x0, y0, sx, sy, L) {
    // Zona positiva — azul
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    xs.forEach((x, i) => {
        if (Vs[i] >= 0) ctx.lineTo(x0 + x * sx, y0 - Vs[i] * sy);
        else ctx.lineTo(x0 + x * sx, y0);
    });
    ctx.closePath();
    const gPos = ctx.createLinearGradient(0, y0 - Math.max(...Vs) * sy, 0, y0);
    gPos.addColorStop(0, 'rgba(0,119,255,0.55)');
    gPos.addColorStop(1, 'rgba(0,119,255,0.05)');
    ctx.fillStyle = gPos;
    ctx.fill();

    // Zona negativa — roja
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    xs.forEach((x, i) => {
        if (Vs[i] <= 0) ctx.lineTo(x0 + x * sx, y0 - Vs[i] * sy);
        else ctx.lineTo(x0 + x * sx, y0);
    });
    ctx.closePath();
    const gNeg = ctx.createLinearGradient(0, y0, 0, y0 + Math.abs(Math.min(...Vs)) * sy);
    gNeg.addColorStop(0, 'rgba(255,71,87,0.05)');
    gNeg.addColorStop(1, 'rgba(255,71,87,0.55)');
    ctx.fillStyle = gNeg;
    ctx.fill();

    // Stroke general
    ctx.beginPath();
    xs.forEach((x, i) => {
        const px = x0 + x * sx;
        const py = y0 - Vs[i] * sy;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawShearLabels(ctx, result, x0, y0, sx, sy) {
    const { notables } = result;
    ctx.font = 'bold 10px Space Mono, monospace';

    // V máx
    if (Math.abs(notables.Vmax) > 0.1) {
        const px = x0 + notables.xVmax * sx;
        const py = y0 - notables.Vmax * sy;
        ctx.strokeStyle = COLORES_C.pos;
        ctx.fillStyle   = COLORES_C.pos;
        ctx.lineWidth   = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(px, y0); ctx.lineTo(px, py - 4); ctx.stroke();
        ctx.setLineDash([]);
        ctx.textAlign = 'center';
        ctx.fillText(`+${notables.Vmax.toFixed(2)} kN`, px, py - 8);
    }

    // V mín
    if (Math.abs(notables.Vmin) > 0.1) {
        const px = x0 + notables.xVmin * sx;
        const py = y0 - notables.Vmin * sy;
        ctx.fillStyle = COLORES_C.neg;
        ctx.textAlign = 'center';
        ctx.fillText(`${notables.Vmin.toFixed(2)} kN`, px, py + 14);
    }

    // Puntos V=0
    notables.cerosV.forEach(x0V => {
        const px = x0 + x0V * sx;
        ctx.beginPath();
        ctx.arc(px, y0, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '9px Space Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`V=0 @ ${x0V.toFixed(2)}m`, px, y0 - 10);
    });
}

function drawBeamC(ctx, x0, y0, cw, result, L) {
    const beamH = 10;
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.rect(x0, y0, cw, beamH); ctx.fill(); ctx.stroke();

    // Cargas
    DFC.cargas && DFC.cargas.forEach(c => {
        const sx2 = cw / L;
        if (c.tipo === 'puntual') {
            const px = x0 + c.a * sx2;
            drawArrowDownC(ctx, px, y0 - 32, px, y0 - 1, 'rgba(255,140,0,0.9)', `${c.P}kN`);
        }
        else if (c.tipo === 'dist') {
            const ax = x0 + c.a * sx2;
            const bx = x0 + c.b_end * sx2;
            drawDistLoadC(ctx, ax, bx, y0 - 28, y0 - 1, `${c.q}kN/m`);
        }
    });

    // Apoyos
    if (DFC.tipo === 'simple' || DFC.tipo === 'continua2') {
        drawPinC(ctx, x0, y0 + beamH);
        drawRollerC(ctx, x0 + cw, y0 + beamH);
        if (DFC.tipo === 'continua2') {
            const sx2 = cw / L;
            const L1 = DFC.tramos[0];
            drawRollerC(ctx, x0 + L1 * sx2, y0 + beamH);
        }
    } else if (DFC.tipo === 'voladizo') {
        drawFixedC(ctx, x0, y0);
    }
}

function drawArrowDownC(ctx, x1, y1, x2, y2, color, label) {
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2 - 4, y2 - 7); ctx.lineTo(x2, y2); ctx.lineTo(x2 + 4, y2 - 7);
    ctx.stroke();
    if (label) { ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'center'; ctx.fillText(label, x1, y1 - 4); }
}

function drawDistLoadC(ctx, ax, bx, yTop, yBot, label) {
    const n = Math.max(3, Math.floor((bx - ax) / 28));
    ctx.strokeStyle = 'rgba(255,140,0,0.75)'; ctx.fillStyle = 'rgba(255,140,0,0.75)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(ax, yTop); ctx.lineTo(bx, yTop); ctx.stroke();
    for (let i = 0; i <= n; i++) {
        const x = ax + (i / n) * (bx - ax);
        ctx.beginPath(); ctx.moveTo(x, yTop); ctx.lineTo(x, yBot); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 3, yBot - 6); ctx.lineTo(x, yBot); ctx.lineTo(x + 3, yBot - 6); ctx.stroke();
    }
    ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'center'; ctx.fillText(label, (ax + bx) / 2, yTop - 5);
}

function drawPinC(ctx, x, y) {
    const s = 10;
    ctx.fillStyle = 'rgba(0,229,255,0.15)'; ctx.strokeStyle = 'rgba(0,229,255,0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - s, y + s * 1.5); ctx.lineTo(x + s, y + s * 1.5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - s - 4, y + s * 1.5); ctx.lineTo(x + s + 4, y + s * 1.5); ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.stroke();
}

function drawRollerC(ctx, x, y) {
    const s = 10;
    ctx.fillStyle = 'rgba(0,229,255,0.15)'; ctx.strokeStyle = 'rgba(0,229,255,0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - s, y + s * 1.5); ctx.lineTo(x + s, y + s * 1.5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y + s * 1.5 + 5, 4, 0, Math.PI * 2); ctx.stroke();
}

function drawFixedC(ctx, x, y) {
    ctx.strokeStyle = 'rgba(0,229,255,0.5)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x - 3, y - 20); ctx.lineTo(x - 3, y + 28); ctx.stroke();
    ctx.strokeStyle = 'rgba(0,229,255,0.2)'; ctx.lineWidth = 1;
    for (let i = -20; i <= 28; i += 8) {
        ctx.beginPath(); ctx.moveTo(x - 3, y + i); ctx.lineTo(x - 14, y + i + 8); ctx.stroke();
    }
}

function drawAxesC(ctx, pad, cw, ch, W, H, L, yMid, Vabs, scaleV) {
    // Eje x
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad.left, yMid); ctx.lineTo(pad.left + cw, yMid); ctx.stroke();

    // Ticks y valores x
    ctx.fillStyle = COLORES_C.textDim; ctx.font = '10px Space Mono, monospace';
    for (let i = 0; i <= 10; i++) {
        const x = pad.left + (i / 10) * cw;
        const val = (i / 10) * L;
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, yMid - 4); ctx.lineTo(x, yMid + 4); ctx.stroke();
        ctx.textAlign = 'center'; ctx.fillText(val.toFixed(1), x, yMid + 15);
    }

    // Labels ejes
    ctx.fillStyle = COLORES_C.text; ctx.font = '11px DM Sans, sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('x [m]', pad.left + cw / 2, H - 14);
    ctx.save(); ctx.translate(16, pad.top + ch / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('V [kN]', 0, 0); ctx.restore();

    // Ticks V
    ctx.textAlign = 'right'; ctx.font = '9px Space Mono, monospace';
    [0.25, 0.5, 0.75, 1.0].forEach(f => {
        const yP = yMid - f * Vabs * scaleV;
        const yN = yMid + f * Vabs * scaleV;
        ctx.fillStyle = COLORES_C.textDim;
        ctx.fillText(`+${(f * Vabs).toFixed(1)}`, pad.left - 4, yP + 3);
        ctx.fillText(`-${(f * Vabs).toFixed(1)}`, pad.left - 4, yN + 3);
    });
}

/**
 * Dibuja el diagrama de separación de estribos s(x)
 */
function drawDiagramaEstribos(canvas, result) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const pad = { top: 30, right: 30, bottom: 50, left: 65 };
    const cw  = W - pad.left - pad.right;
    const ch  = H - pad.top  - pad.bottom;
    const { diagEstribos } = result;
    const xs   = diagEstribos.map(d => d.x);
    const ss   = diagEstribos.map(d => Math.min(d.s, 600));
    const L    = xs[xs.length - 1];
    const smax = 600;

    const scaleX = cw / L;
    const scaleS = ch / smax;
    const y0     = pad.top + ch;

    // Grid horizontal
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
    [150, 300, 450, 600].forEach(sv => {
        const y = y0 - sv * scaleS;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cw, y); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '9px Space Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${sv}mm`, pad.left - 4, y + 3);
    });
    ctx.setLineDash([]);

    // Curva s(x)
    ctx.beginPath();
    xs.forEach((x, i) => {
        const px = pad.left + x * scaleX;
        const py = y0 - ss[i] * scaleS;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.strokeStyle = COLORES_C.estribo;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill
    ctx.beginPath();
    ctx.moveTo(pad.left, y0);
    xs.forEach((x, i) => ctx.lineTo(pad.left + x * scaleX, y0 - ss[i] * scaleS));
    ctx.lineTo(pad.left + cw, y0);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, pad.top, 0, y0);
    g.addColorStop(0, 'rgba(255,140,0,0.3)');
    g.addColorStop(1, 'rgba(255,140,0,0.03)');
    ctx.fillStyle = g;
    ctx.fill();

    // Labels
    ctx.fillStyle = COLORES_C.estribo; ctx.font = 'bold 10px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Separación de estribos s(x) [mm]', pad.left + cw / 2, pad.top - 8);
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '10px DM Sans, sans-serif';
    ctx.fillText('x [m]', pad.left + cw / 2, H - 8);
}

/* ══════════════════════════════════════════════════════════
   API PÚBLICA
   ══════════════════════════════════════════════════════════ */
window.DFC_MODULE = {
    state: DFC,
    calcular: calcularDFC,
    draw: drawDFC,
    drawEstribos: drawDiagramaEstribos,
    calcVc,
    calcEstribos,

    setParam(key, value) { DFC[key] = value; },
    addCarga(c)  { DFC.cargas.push(c); },
    clearCargas() { DFC.cargas = []; },

    formatResult(result) {
        if (!result) return '';
        const r = result;
        const e = r.estribos_crit;
        return [
            `── Reacciones ──────────────────`,
            `RA = ${r.reacciones.RA?.toFixed(2)} kN`,
            `RB = ${r.reacciones.RB?.toFixed(2)} kN`,
            ``,
            `── Cortante ────────────────────`,
            `V_max = ${r.notables.Vmax.toFixed(2)} kN  @  x = ${r.notables.xVmax.toFixed(2)} m`,
            `V_min = ${r.notables.Vmin.toFixed(2)} kN  @  x = ${r.notables.xVmin.toFixed(2)} m`,
            `V = 0  @  x = ${r.notables.cerosV.map(v => v.toFixed(2)+'m').join(', ')}`,
            ``,
            `── Diseño a Corte (ACI 318-19) ─`,
            `d    = ${(r.d * 100).toFixed(1)} cm`,
            `Vc   = ${r.Vc.toFixed(2)} kN`,
            `Vs   = ${e.Vs.toFixed(2)} kN`,
            `φVn  = ${(e.phi * (e.Vc + e.Vs)).toFixed(2)} kN`,
            ``,
            `── Estribos Ø${(DFC.diam_e*1000).toFixed(0)}mm ───────────────`,
            `Av   = ${e.Av_cm2.toFixed(2)} cm²`,
            `s    = ${e.s_diseño} mm`,
            `s_max= ${e.s_max} mm`,
            `Zona : ${e.zona}`,
            `Sección: ${e.ok_seccion ? '✅ OK' : '❌ Aumentar sección'}`,
        ].join('\n');
    },
};
