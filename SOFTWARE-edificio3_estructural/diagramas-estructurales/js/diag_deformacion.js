/* ============================================================
   IngeLAB 3D — Diagramas Estructurales
   diag_deformacion.js  |  v1.0

   Motor de Diagrama de Deformaciones — Línea Elástica
   
   Calcula y visualiza:
     · Línea elástica y(x) — ecuación diferencial de Euler-Bernoulli
     · Flecha máxima δ_max y su posición x
     · Flecha relativa (flecha/L)
     · Ángulo de giro θ(x) = dy/dx
     · Giro en apoyos θ_A, θ_B
     · Radio de curvatura ρ(x) = EI/M(x)
     · Deformación angular γ (no incluida en Euler-Bernoulli)
   
   Métodos de cálculo:
     · Integración doble directa (para cargas estándar)
     · Método de la doble integración con constantes de integración
     · Superposición de casos básicos (tablas)
     · Integración numérica (n=500 puntos) para cargas complejas
   
   Casos analíticos exactos (fórmulas de ingeniería):
     · Viga S.A. + carga puntual central: δ = PL³/48EI
     · Viga S.A. + carga puntual excéntrica: δ = Pb(L²-b²)^(3/2) / 9√3·EI·L
     · Viga S.A. + carga uniforme total: δ = 5qL⁴/384EI
     · Viga S.A. + momento extremo: δ_max = ML²/9√3·EI
     · Voladizo + carga puntual extremo: δ = PL³/3EI
     · Voladizo + carga uniforme total: δ = qL⁴/8EI
   
   Verificación según normativa:
     · NCh 430 / ACI 318: L/240 (carga viva) | L/480 (total)
     · AISC: L/360 (acabados frágiles) | L/240 (estruct.)
     · Eurocódigo: L/250 (cuasipermanente) | L/500 (sensibles)
   
   Secciones disponibles:
     · Rectangular H.A.
     · T-beam H.A.
     · IPE (acero)
     · HEA (acero)
     · Caja metálica
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   ESTADO GLOBAL
   ══════════════════════════════════════════════════════════ */
const DD = {
    L:       6.0,          // Longitud [m]
    tipo:    'simple',     // 'simple' | 'voladizo' | 'continua'
    seccion: 'rect',       // 'rect' | 'T' | 'IPE' | 'HEA' | 'caja'
    
    // Sección rectangular
    b:       0.30,
    h_sec:   0.55,
    
    // Sección T
    bw:      0.25, bf: 0.80, hf: 0.12,
    
    // Perfil acero
    perfil:  'IPE300',
    
    // Material
    material:'HA',
    fc:      25.0,   // MPa
    E_ac:    210000, // MPa
    
    // Cargas
    cargas: [
        { tipo: 'dist', q: 15.0, a: 0, b_end: 1.0 }
    ],
    
    // Límites de flecha (normativa)
    norma:   'NCh',   // 'NCh' | 'AISC' | 'EC'
    uso:     'viv',   // 'viv' | 'ofic' | 'ind' | 'aut'

    // Escala de amplificación para visualización
    escala_visual: 50,    // Amplificación para dibujo

    result: null,
};

/* Perfiles IPE */
const PERFILES_DEFORM = {
    'IPE200': { I: 1943e-8, E: 210e6 },
    'IPE240': { I: 3892e-8, E: 210e6 },
    'IPE270': { I: 5790e-8, E: 210e6 },
    'IPE300': { I: 8356e-8, E: 210e6 },
    'IPE330': { I: 11770e-8,E: 210e6 },
    'IPE360': { I: 16270e-8,E: 210e6 },
    'IPE400': { I: 23130e-8,E: 210e6 },
    'IPE450': { I: 33740e-8,E: 210e6 },
    'IPE500': { I: 48200e-8,E: 210e6 },
    'HEA160': { I: 1670e-8, E: 210e6 },
    'HEA200': { I: 3690e-8, E: 210e6 },
    'HEA240': { I: 7760e-8, E: 210e6 },
    'HEA300': { I: 18260e-8,E: 210e6 },
};

/* Límites de flecha por norma [L/n] */
const LIMITES_FLECHA = {
    NCh: {
        viv:  { L_L: 360, L_DL: 240, desc: 'Vivienda NCh 430' },
        ofic: { L_L: 360, L_DL: 240, desc: 'Oficinas NCh 430' },
        ind:  { L_L: 240, L_DL: 180, desc: 'Industrial NCh 430' },
        aut:  { L_L: 500, L_DL: 360, desc: 'Autosoportante NCh 430' },
    },
    AISC: {
        viv:  { L_L: 360, L_DL: 240, desc: 'Residencial AISC' },
        ofic: { L_L: 360, L_DL: 240, desc: 'Oficina AISC L/360' },
        ind:  { L_L: 240, L_DL: 180, desc: 'Industrial AISC L/240' },
        aut:  { L_L: 600, L_DL: 480, desc: 'Sens. acabados AISC' },
    },
    EC: {
        viv:  { L_L: 300, L_DL: 250, desc: 'Residencial EC2 L/250' },
        ofic: { L_L: 360, L_DL: 250, desc: 'Oficinas EC2' },
        ind:  { L_L: 250, L_DL: 200, desc: 'Industrial EC2' },
        aut:  { L_L: 500, L_DL: 500, desc: 'Cuasi-perm. EC2 L/500' },
    },
};

/* ══════════════════════════════════════════════════════════
   PROPIEDADES DE SECCIÓN — EI [kN·m²]
   ══════════════════════════════════════════════════════════ */

function calcEI(seccion, params) {
    let I, E;

    if (seccion === 'rect') {
        I = params.b * Math.pow(params.h_sec, 3) / 12;  // m⁴
        E = (params.material === 'HA')
            ? 4700 * Math.sqrt(params.fc) * 1e3          // kN/m²
            : params.E_ac * 1e3;
    }
    else if (seccion === 'T') {
        const hw  = params.h_sec - params.hf;
        const A1  = params.bw * hw;
        const A2  = params.bf * params.hf;
        const A   = A1 + A2;
        const yNA = (A1 * hw / 2 + A2 * (hw + params.hf / 2)) / A;
        I = (params.bw * Math.pow(hw, 3) / 12 + A1 * Math.pow(yNA - hw / 2, 2))
          + (params.bf * Math.pow(params.hf, 3) / 12 + A2 * Math.pow(hw + params.hf / 2 - yNA, 2));
        E = 4700 * Math.sqrt(params.fc) * 1e3;
    }
    else if (seccion === 'IPE' || seccion === 'HEA') {
        const p = PERFILES_DEFORM[params.perfil];
        if (p) { I = p.I; E = p.E * 1e3; }  // E en kPa
        else   { I = 8356e-8; E = 210e9; }
    }
    else if (seccion === 'caja') {
        // Perfil caja cuadrado h×h con espesor t=h/10
        const h = params.h_sec, t = h / 10;
        const I_ext = Math.pow(h, 4) / 12;
        const I_int = Math.pow(h - 2 * t, 4) / 12;
        I = I_ext - I_int;
        E = params.E_ac * 1e3;
    }
    else {
        I = 1e-4; E = 24e6;
    }

    return { EI: E * I, I, E, E_GPa: E / 1e6 };
}

/* ══════════════════════════════════════════════════════════
   CASOS ANALÍTICOS EXACTOS
   ══════════════════════════════════════════════════════════ */

/**
 * Tabla de flechas máximas analíticas
 * Fuente: Manual CIRSOC, McCormac, NCh 430 Comentarios
 */
function flechaAnalitica(cargas, L, EI, tipo) {
    let delta_max = 0, x_delta = L / 2, formula = '';

    if (tipo === 'simple') {
        cargas.forEach(c => {
            if (c.tipo === 'dist' && Math.abs(c.a) < 1e-9 && Math.abs(c.b_end - L) < 1e-9) {
                // Carga distribuida total
                const d = 5 * c.q * Math.pow(L, 4) / (384 * EI);
                delta_max += d;
                x_delta   = L / 2;
                formula   = `δ = 5qL⁴/384EI = ${(d*1000).toFixed(3)} mm`;
            }
            else if (c.tipo === 'puntual') {
                const a = c.a, b = L - a;
                if (Math.abs(a - L / 2) < 0.01) {
                    // Carga central
                    const d = c.P * Math.pow(L, 3) / (48 * EI);
                    delta_max += d;
                    x_delta   = L / 2;
                    formula   = `δ = PL³/48EI = ${(d*1000).toFixed(3)} mm`;
                } else {
                    // Carga excéntrica: δ = Pb(L²-b²)^(3/2) / (9√3·EI·L)
                    const bval = Math.min(a, b);
                    const d = c.P * bval * Math.pow(L * L - bval * bval, 1.5) /
                              (9 * Math.sqrt(3) * EI * L);
                    delta_max += d;
                    x_delta = Math.sqrt((L * L - bval * bval) / 3);
                    formula = `δ = Pb(L²-b²)^(3/2)/(9√3·EI·L) = ${(d*1000).toFixed(3)} mm`;
                }
            }
            else if (c.tipo === 'triangular') {
                // Carga triangular completa: δ_max = 0.01304·qL⁴/EI @ x=0.519L
                const d = 0.01304 * c.q * Math.pow(L, 4) / EI;
                delta_max += d;
                x_delta   = 0.519 * L;
                formula   = `δ = 0.01304·qL⁴/EI = ${(d*1000).toFixed(3)} mm`;
            }
        });
    }
    else if (tipo === 'voladizo') {
        cargas.forEach(c => {
            if (c.tipo === 'puntual' && Math.abs(c.a - L) < 0.01) {
                // Carga en extremo libre
                const d = c.P * Math.pow(L, 3) / (3 * EI);
                delta_max += d; x_delta = L;
                formula = `δ = PL³/3EI = ${(d*1000).toFixed(3)} mm`;
            }
            else if (c.tipo === 'dist' && Math.abs(c.a) < 1e-9) {
                // Carga uniforme total
                const d = c.q * Math.pow(L, 4) / (8 * EI);
                delta_max += d; x_delta = L;
                formula = `δ = qL⁴/8EI = ${(d*1000).toFixed(3)} mm`;
            }
        });
    }

    return { delta_max, x_delta, formula };
}

/* ══════════════════════════════════════════════════════════
   INTEGRACIÓN NUMÉRICA DE LA LÍNEA ELÁSTICA
   Método: integración doble de EI·y'' = M(x)
   ══════════════════════════════════════════════════════════ */

/**
 * Calcula M(x) punto a punto para la integración
 */
function calcMx_deform(x, cargas, RA, tipo, L) {
    let M = tipo === 'voladizo' ? 0 : RA * x;

    if (tipo === 'voladizo') {
        // Desde extremo libre hacia empotramiento
        cargas.forEach(c => {
            if (c.tipo === 'puntual' && c.a >= x) {
                M += c.P * (c.a - x);
            }
            else if (c.tipo === 'dist' && c.b_end > x) {
                const a2 = Math.max(c.a, x), b2 = c.b_end;
                const len = b2 - a2;
                M += c.q * len * (a2 + len / 2 - x);
            }
        });
        return -M;
    }

    // Viga simple: sumar fuerzas a izquierda
    cargas.forEach(c => {
        if (c.tipo === 'puntual' && c.a < x) {
            M -= c.P * (x - c.a);
        }
        else if (c.tipo === 'dist' && c.a < x) {
            const b2 = Math.min(c.b_end, x);
            const len = b2 - c.a;
            M -= c.q * len * (x - (c.a + len / 2));
        }
        else if (c.tipo === 'triangular' && c.a < x) {
            const b2  = Math.min(c.b_end, x);
            const len = b2 - c.a;
            const F   = 0.5 * c.q * len * len / (c.b_end - c.a);
            M -= F * (x - (c.a + len * 2 / 3));
        }
    });

    return M;
}

function calcRA_deform(cargas, L) {
    let sumMB = 0, sumFy = 0;
    cargas.forEach(c => {
        if (c.tipo === 'puntual') {
            sumMB += c.P * c.a; sumFy += c.P;
        } else if (c.tipo === 'dist') {
            const F = c.q * (c.b_end - c.a);
            sumMB += F * (c.a + (c.b_end - c.a) / 2); sumFy += F;
        } else if (c.tipo === 'triangular') {
            const F = 0.5 * c.q * (c.b_end - c.a);
            sumMB += F * (c.a + (c.b_end - c.a) * 2 / 3); sumFy += F;
        }
    });
    const RB = sumMB / L;
    const RA = sumFy - RB;
    return { RA, RB };
}

/**
 * Integración numérica doble: obtiene y(x) y θ(x)
 */
function integracionNumerica(cargas, L, EI, tipo, n = 500) {
    const dx = L / n;
    const xs = Array.from({ length: n + 1 }, (_, i) => i * dx);
    const Ms = [];

    // Calcular M(x) en cada punto
    const { RA } = tipo === 'simple' ? calcRA_deform(cargas, L) : { RA: 0 };
    xs.forEach(x => Ms.push(calcMx_deform(x, cargas, RA, tipo, L)));

    // Primera integración: curvatura κ = M/EI → θ(x) = ∫κ·dx
    const kappa = Ms.map(M => M / EI);
    const theta = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        theta[i] = theta[i - 1] + (kappa[i - 1] + kappa[i]) / 2 * dx;
    }

    // Condiciones de contorno
    let theta0 = 0;
    if (tipo === 'simple') {
        // y(0) = y(L) = 0 → θ(0) se ajusta
        const y_prov = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            y_prov[i] = y_prov[i - 1] + (theta[i - 1] + theta[i]) / 2 * dx;
        }
        theta0 = -y_prov[n] / L;
    }
    // voladizo: θ(0) = 0, y(0) = 0 → theta0 = 0 (ya está correcto)

    const thetaFinal = theta.map(t => t + theta0);

    // Segunda integración: y(x) = ∫θ·dx
    const y = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        y[i] = y[i - 1] + (thetaFinal[i - 1] + thetaFinal[i]) / 2 * dx;
    }

    return { xs, y, theta: thetaFinal, Ms, kappa };
}

/* ══════════════════════════════════════════════════════════
   RADIO DE CURVATURA
   ══════════════════════════════════════════════════════════ */

function calcRadioCurvatura(Ms, EI) {
    return Ms.map(M => Math.abs(M) > 1e-9 ? Math.abs(EI / M) : Infinity);
}

/* ══════════════════════════════════════════════════════════
   VERIFICACIÓN FLECHA — LÍMITES NORMATIVOS
   ══════════════════════════════════════════════════════════ */

function verificarFlecha(delta_max_m, L, norma, uso) {
    const lims = LIMITES_FLECHA[norma]?.[uso] || LIMITES_FLECHA.NCh.viv;
    const delta_adm_L  = L / lims.L_L;     // m — carga viva
    const delta_adm_DL = L / lims.L_DL;    // m — total (D+L)
    const delta_mm     = delta_max_m * 1000; // mm

    return {
        delta_adm_L_mm:  delta_adm_L  * 1000,
        delta_adm_DL_mm: delta_adm_DL * 1000,
        ratio_L:  delta_max_m / delta_adm_L,
        ratio_DL: delta_max_m / delta_adm_DL,
        ok_L:  delta_max_m <= delta_adm_L,
        ok_DL: delta_max_m <= delta_adm_DL,
        desc:  lims.desc,
        L_L:   lims.L_L,
        L_DL:  lims.L_DL,
        delta_mm,
    };
}

/* ══════════════════════════════════════════════════════════
   FUNCIÓN PRINCIPAL
   ══════════════════════════════════════════════════════════ */
function calcularDD() {
    // 1. Rigidez EI
    const { EI, I, E } = calcEI(DD.seccion, DD);

    // 2. Integración numérica → y(x), θ(x)
    const { xs, y, theta, Ms, kappa } = integracionNumerica(DD.cargas, DD.L, EI, DD.tipo);

    // 3. Caso analítico (para comparación)
    const analitico = flechaAnalitica(DD.cargas, DD.L, EI, DD.tipo);

    // 4. Valores notables
    const yAbs    = y.map(Math.abs);
    const delta_num = Math.max(...yAbs);
    const i_max   = yAbs.indexOf(delta_num);
    const x_max   = xs[i_max];

    const delta_max = delta_num;  // m

    // 5. Giros en apoyos
    const theta_A = theta[0];
    const theta_B = theta[theta.length - 1];

    // 6. Radio de curvatura mínimo
    const radios   = calcRadioCurvatura(Ms, EI);
    const rho_min  = Math.min(...radios.filter(r => isFinite(r)));
    const i_rhoMin = radios.indexOf(rho_min);

    // 7. Verificación
    const verif = verificarFlecha(delta_max, DD.L, DD.norma, DD.uso);

    // 8. Relación flecha/luz
    const ratio_L = DD.L / Math.max(delta_max, 1e-6);

    DD.result = {
        xs, y, theta, Ms, kappa, radios,
        EI, I, E,
        delta_max, x_max,
        delta_max_mm: delta_max * 1000,
        theta_A, theta_B,
        theta_A_deg: theta_A * 180 / Math.PI,
        theta_B_deg: theta_B * 180 / Math.PI,
        rho_min, x_rho: xs[i_rhoMin],
        verif,
        ratio_L,
        analitico,
    };

    return DD.result;
}

/* ══════════════════════════════════════════════════════════
   RENDERING
   ══════════════════════════════════════════════════════════ */

const COLORES_D = {
    elastic:  '#c084fc',
    original: 'rgba(255,255,255,0.2)',
    grid:     'rgba(255,255,255,0.05)',
    text:     'rgba(255,255,255,0.7)',
    textDim:  'rgba(255,255,255,0.3)',
    moment:   '#ff4757',
    curvat:   '#00e5ff',
    theta:    '#00ff9d',
    ok:       '#00ff9d',
    fail:     '#ff4757',
};

/**
 * Dibuja la línea elástica (deformada)
 */
function drawLineaElastica(canvas, result, opts = {}) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { xs, y, delta_max, x_max, theta_A, theta_B } = result;
    const L    = xs[xs.length - 1];
    const pad  = { top: 55, right: 40, bottom: 75, left: 55 };
    const cw   = W - pad.left - pad.right;
    const ch   = H - pad.top  - pad.bottom;
    const scaleX = cw / L;

    // Escala de deformación — amplificar para visualización
    const yMax   = delta_max || 1e-6;
    const scaleY = (ch * 0.35) / yMax * (1 / (DD.escala_visual || 1));
    const yBase  = pad.top + ch * 0.4;

    // Grid
    for (let i = 0; i <= 8; i++) {
        const x = pad.left + (i / 8) * cw;
        ctx.strokeStyle = COLORES_D.grid; ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ch); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Viga original (línea punteada)
    ctx.strokeStyle = COLORES_D.original; ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 5]);
    ctx.beginPath(); ctx.moveTo(pad.left, yBase); ctx.lineTo(pad.left + cw, yBase); ctx.stroke();
    ctx.setLineDash([]);

    // Cargas sobre la viga (simplificado)
    DC_drawLoadsMini && DC_drawLoadsMini(ctx, DD.cargas, pad.left, yBase - 35, cw, L);

    // Línea elástica — relleno
    const pts = xs.map((x, i) => ({
        px: pad.left + x * scaleX,
        py: yBase + y[i] * DD.escala_visual * scaleY,
    }));

    ctx.beginPath();
    ctx.moveTo(pts[0].px, yBase);
    pts.forEach(p => ctx.lineTo(p.px, p.py));
    ctx.lineTo(pts[pts.length - 1].px, yBase);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, yBase, 0, yBase + yMax * DD.escala_visual * scaleY);
    g.addColorStop(0, 'rgba(192,132,252,0.1)');
    g.addColorStop(1, 'rgba(192,132,252,0.45)');
    ctx.fillStyle = g; ctx.fill();

    // Curva elástica
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py));
    ctx.strokeStyle = COLORES_D.elastic; ctx.lineWidth = 2.5; ctx.stroke();

    // Flecha δ_max
    const px_max = pad.left + x_max * scaleX;
    const py_max = yBase + delta_max * DD.escala_visual * scaleY;
    drawFlechaDelta(ctx, px_max, yBase, py_max, result.delta_max_mm);

    // Tangentes en apoyos (ángulo de giro)
    drawTangente(ctx, pad.left, yBase, theta_A, 60, COLORES_D.theta, 'θ_A');
    drawTangente(ctx, pad.left + cw, yBase, -theta_B, 60, COLORES_D.theta, 'θ_B');

    // Apoyos
    drawApoyoDeform(ctx, pad.left, yBase, 'pin');
    drawApoyoDeform(ctx, pad.left + cw, yBase, DD.tipo === 'voladizo' ? 'fixed' : 'roller');

    // Eje x
    drawEjeXDeform(ctx, pad, cw, ch, W, H, yBase, L);

    // Badge verificación
    drawVerifBadge(ctx, result.verif, W, pad.top);

    // Amplificación label
    ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'right';
    ctx.fillText(`Amplificación ×${DD.escala_visual}`, W - 10, pad.top + 14);
}

function drawFlechaDelta(ctx, px, yBase, pyMax, delta_mm) {
    // Línea vertical de δ
    ctx.strokeStyle = 'rgba(192,132,252,0.5)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(px, yBase); ctx.lineTo(px, pyMax); ctx.stroke(); ctx.setLineDash([]);

    // Arrowheads
    ctx.strokeStyle = COLORES_D.elastic; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(px - 5, yBase + 8); ctx.lineTo(px, yBase + 1); ctx.lineTo(px + 5, yBase + 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px - 5, pyMax - 8); ctx.lineTo(px, pyMax - 1); ctx.lineTo(px + 5, pyMax - 8); ctx.stroke();

    // Dimensión
    ctx.fillStyle = COLORES_D.elastic; ctx.font = 'bold 11px Space Mono, monospace'; ctx.textAlign = 'left';
    ctx.fillText(`δ = ${delta_mm.toFixed(2)} mm`, px + 8, (yBase + pyMax) / 2 + 4);
}

function drawTangente(ctx, x, y, theta, len, color, label) {
    const dx = Math.cos(theta) * len;
    const dy = Math.sin(theta) * len;
    ctx.strokeStyle = color; ctx.lineWidth = 1.2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dx, y + dy); ctx.stroke(); ctx.setLineDash([]);

    ctx.fillStyle = color; ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = theta > 0 ? 'right' : 'left';
    ctx.fillText(`${label}=${(theta * 1000).toFixed(2)}‰`, x + dx + (theta > 0 ? -4 : 4), y + dy - 4);
}

function drawApoyoDeform(ctx, x, y, tipo) {
    const s = 9;
    ctx.fillStyle = 'rgba(0,229,255,0.1)'; ctx.strokeStyle = 'rgba(0,229,255,0.5)'; ctx.lineWidth = 1.5;
    if (tipo === 'pin' || tipo === 'roller') {
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - s, y + s * 1.5); ctx.lineTo(x + s, y + s * 1.5); ctx.closePath(); ctx.fill(); ctx.stroke();
        if (tipo === 'roller') { ctx.beginPath(); ctx.arc(x, y + s * 1.5 + 4, 3.5, 0, Math.PI * 2); ctx.stroke(); }
    } else {
        ctx.strokeStyle = 'rgba(0,229,255,0.5)'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(x - 2, y - 18); ctx.lineTo(x - 2, y + 18); ctx.stroke();
    }
}

function drawVerifBadge(ctx, verif, W, padTop) {
    const ok  = verif.ok_DL;
    const bg  = ok ? 'rgba(0,255,157,0.1)' : 'rgba(255,71,87,0.1)';
    const bc  = ok ? 'rgba(0,255,157,0.4)' : 'rgba(255,71,87,0.4)';
    const col = ok ? COLORES_D.ok : COLORES_D.fail;

    ctx.fillStyle = bg;
    ctx.strokeStyle = bc; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect?.(W - 180, padTop + 4, 170, 42, 6) || ctx.rect(W - 180, padTop + 4, 170, 42);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = col; ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(ok ? '✅ FLECHA OK' : '❌ EXCEDE LÍMITE', W - 95, padTop + 20);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '9px Space Mono, monospace';
    ctx.fillText(`δ=${verif.delta_mm.toFixed(2)}mm | L/${verif.L_DL}=${verif.delta_adm_DL_mm.toFixed(1)}mm`, W - 95, padTop + 36);
}

function drawEjeXDeform(ctx, pad, cw, ch, W, H, yBase, L) {
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad.left, yBase); ctx.lineTo(pad.left + cw, yBase); ctx.stroke();

    ctx.fillStyle = COLORES_D.textDim; ctx.font = '10px Space Mono, monospace';
    for (let i = 0; i <= 8; i++) {
        const x = pad.left + (i / 8) * cw;
        const v = (i / 8) * L;
        ctx.textAlign = 'center'; ctx.fillText(`${v.toFixed(1)}`, x, yBase + 16);
    }
    ctx.fillStyle = COLORES_D.text; ctx.font = '11px DM Sans, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('x [m]', pad.left + cw / 2, H - 14);
}

// Helper — dibuja cargas mini sobre la viga en el canvas de deformación
function DC_drawLoadsMini(ctx, cargas, x0, yTop, cw, L) {
    if (!cargas) return;
    const sx = cw / L;
    cargas.forEach(c => {
        const color = 'rgba(255,140,0,0.55)';
        if (c.tipo === 'puntual') {
            const px = x0 + c.a * sx;
            ctx.strokeStyle = color; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(px, yTop); ctx.lineTo(px, yTop + 30); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(px - 3, yTop + 24); ctx.lineTo(px, yTop + 31); ctx.lineTo(px + 3, yTop + 24); ctx.stroke();
        } else if (c.tipo === 'dist') {
            const ax = x0 + c.a * sx, bx = x0 + c.b_end * sx;
            ctx.strokeStyle = color; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(ax, yTop + 5); ctx.lineTo(bx, yTop + 5); ctx.stroke();
            const n = Math.max(2, Math.floor((bx - ax) / 25));
            for (let i = 0; i <= n; i++) {
                const x = ax + (i / n) * (bx - ax);
                ctx.beginPath(); ctx.moveTo(x, yTop + 5); ctx.lineTo(x, yTop + 28); ctx.stroke();
            }
        }
    });
}

/**
 * Dibuja el diagrama de curvatura κ(x) = M(x)/EI
 */
function drawCurvatura(canvas, result) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { xs, kappa } = result;
    const L    = xs[xs.length - 1];
    const kMax = Math.max(...kappa.map(Math.abs)) || 1;
    const pad  = { top: 30, right: 40, bottom: 45, left: 55 };
    const cw   = W - pad.left - pad.right;
    const ch   = H - pad.top  - pad.bottom;
    const yMid = pad.top + ch / 2;
    const scaleX = cw / L;
    const scaleK = ch * 0.44 / kMax;

    // Fill
    ctx.beginPath();
    ctx.moveTo(pad.left, yMid);
    xs.forEach((x, i) => ctx.lineTo(pad.left + x * scaleX, yMid - kappa[i] * scaleK));
    ctx.lineTo(pad.left + cw, yMid);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, yMid - kMax * scaleK, 0, yMid);
    g.addColorStop(0, 'rgba(0,229,255,0.5)'); g.addColorStop(1, 'rgba(0,229,255,0.05)');
    ctx.fillStyle = g; ctx.fill();

    // Stroke
    ctx.beginPath();
    xs.forEach((x, i) => {
        const px = pad.left + x * scaleX, py = yMid - kappa[i] * scaleK;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.strokeStyle = COLORES_D.curvat; ctx.lineWidth = 2; ctx.stroke();

    // Eje
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad.left, yMid); ctx.lineTo(pad.left + cw, yMid); ctx.stroke();

    // Title
    ctx.fillStyle = COLORES_D.curvat; ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText('Curvatura κ(x) = M(x)/EI  [1/m]', W / 2, pad.top - 8);
}

/**
 * Dibuja el diagrama de giro θ(x)
 */
function drawGiro(canvas, result) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { xs, theta } = result;
    const L      = xs[xs.length - 1];
    const thMax  = Math.max(...theta.map(Math.abs)) || 1;
    const pad    = { top: 30, right: 40, bottom: 45, left: 55 };
    const cw     = W - pad.left - pad.right;
    const ch     = H - pad.top  - pad.bottom;
    const yMid   = pad.top + ch / 2;
    const scaleX = cw / L;
    const scaleT = ch * 0.44 / thMax;

    // Fill
    ctx.beginPath();
    ctx.moveTo(pad.left, yMid);
    xs.forEach((x, i) => ctx.lineTo(pad.left + x * scaleX, yMid - theta[i] * scaleT));
    ctx.lineTo(pad.left + cw, yMid); ctx.closePath();
    const g = ctx.createLinearGradient(0, yMid - thMax * scaleT, 0, yMid);
    g.addColorStop(0, 'rgba(0,255,157,0.5)'); g.addColorStop(1, 'rgba(0,255,157,0.05)');
    ctx.fillStyle = g; ctx.fill();

    ctx.beginPath();
    xs.forEach((x, i) => {
        const px = pad.left + x * scaleX, py = yMid - theta[i] * scaleT;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.strokeStyle = COLORES_D.theta; ctx.lineWidth = 2; ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad.left, yMid); ctx.lineTo(pad.left + cw, yMid); ctx.stroke();

    // Valores en apoyos
    ctx.fillStyle = COLORES_D.theta; ctx.font = 'bold 9px Space Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`θ_A = ${(result.theta_A * 1000).toFixed(3)} rad×10⁻³`, pad.left + 4, pad.top + 14);
    ctx.textAlign = 'right';
    ctx.fillText(`θ_B = ${(result.theta_B * 1000).toFixed(3)} rad×10⁻³`, pad.left + cw - 4, pad.top + 14);

    ctx.fillStyle = COLORES_D.theta; ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText('Giro θ(x) = dy/dx  [rad]', W / 2, pad.top - 8);
}

/* ══════════════════════════════════════════════════════════
   API PÚBLICA
   ══════════════════════════════════════════════════════════ */
window.DD_MODULE = {
    state: DD,
    calcular: calcularDD,
    draw: drawLineaElastica,
    drawCurvatura,
    drawGiro,
    verificarFlecha,
    LIMITES_FLECHA,
    PERFILES_DEFORM,

    setParam(key, value) { DD[key] = value; },
    addCarga(c)   { DD.cargas.push(c); },
    clearCargas() { DD.cargas = []; },

    formatResult(result) {
        if (!result) return '';
        const r = result, v = r.verif;
        return [
            `── Rigidez ─────────────────────────`,
            `EI    = ${(r.EI / 1e3).toFixed(2)} MN·m²`,
            `I     = ${(r.I * 1e8).toFixed(2)} cm⁴`,
            `E     = ${(r.E / 1e6).toFixed(0)} GPa`,
            ``,
            `── Deformaciones ───────────────────`,
            `δ_max = ${r.delta_max_mm.toFixed(3)} mm  @ x=${r.x_max.toFixed(2)} m`,
            `L/δ   = ${r.ratio_L.toFixed(0)}`,
            `θ_A   = ${(r.theta_A * 1e3).toFixed(3)} mrad`,
            `θ_B   = ${(r.theta_B * 1e3).toFixed(3)} mrad`,
            `ρ_min = ${r.rho_min.toFixed(2)} m  @ x=${r.x_rho.toFixed(2)} m`,
            ``,
            `── Caso analítico ──────────────────`,
            r.analitico.formula || '—',
            ``,
            `── Verificación (${v.desc}) ───`,
            `δ_adm (L/${v.L_L})  = ${v.delta_adm_L_mm.toFixed(2)} mm  ${v.ok_L ? '✅' : '❌'}`,
            `δ_adm (L/${v.L_DL}) = ${v.delta_adm_DL_mm.toFixed(2)} mm  ${v.ok_DL ? '✅' : '❌'}`,
            `DCR_L  = ${v.ratio_L.toFixed(3)}`,
            `DCR_DL = ${v.ratio_DL.toFixed(3)}`,
        ].join('\n');
    },
};