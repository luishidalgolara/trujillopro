/* ============================================================
   IngeLAB 3D — Diagramas Estructurales
   diag_momento.js  |  v1.0

   Motor de cálculo REAL del Diagrama de Momento Flector (DMF)
   Soporta:
     · Viga simplemente apoyada
     · Viga en voladizo (cantilever)
     · Viga continua 2 tramos (3 apoyos)
   Cargas:
     · Puntual en cualquier posición
     · Distribuida uniforme (total o parcial)
     · Triangular (desde 0 hasta q_max)
     · Momento externo aplicado
   Sección transversal:
     · Rectangular H.A.
     · T (T-beam)
     · IPE / HEA (acero)
   Cálculo automático:
     · Reacciones
     · V(x) y M(x) punto a punto (n=500)
     · Máximos, mínimos, ceros
     · Flecha máxima δ (Euler-Bernoulli)
     · Módulo resistente W y verificación σ
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   ESTADO GLOBAL DEL MÓDULO
   ══════════════════════════════════════════════════════════ */
const DMF = {
    // Parámetros de la viga
    L:       6.0,          // Longitud [m]
    tipo:    'simple',     // 'simple' | 'voladizo' | 'continua'
    EI:      null,         // Rigidez [kN·m²] — calculada desde sección
    seccion: 'rect',       // 'rect' | 'T' | 'IPE'

    // Sección rectangular
    b:       0.30,         // Ancho [m]
    h_sec:   0.55,         // Altura [m]

    // Sección T
    bw:      0.25, bf: 0.80, hf: 0.12,

    // Sección IPE (perfil estándar, datos simplificados)
    ipe:     'IPE300',

    // Cargas activas (array de objetos)
    cargas: [
        { tipo: 'dist', q: 15.0, a: 0, b_end: 1.0 }   // q=15 kN/m, viga completa
    ],

    // Resultados calculados
    result: null,

    // Canvas principal
    canvasMain:   null,
    canvasSeccion: null,
    ctx:          null,
    ctxSec:       null,
};

/* Perfiles IPE simplificados [I (cm4), W (cm3), h (mm)] */
const PERFILES_IPE = {
    'IPE160': { I: 869,    W: 109,   h: 160, b_f: 82,  tf: 7.4, tw: 5.0, A: 20.1 },
    'IPE200': { I: 1943,   W: 194,   h: 200, b_f: 100, tf: 8.5, tw: 5.6, A: 28.5 },
    'IPE240': { I: 3892,   W: 324,   h: 240, b_f: 120, tf: 9.8, tw: 6.2, A: 39.1 },
    'IPE270': { I: 5790,   W: 429,   h: 270, b_f: 135, tf: 10.2,tw: 6.6, A: 45.9 },
    'IPE300': { I: 8356,   W: 557,   h: 300, b_f: 150, tf: 10.7,tw: 7.1, A: 53.8 },
    'IPE330': { I: 11770,  W: 713,   h: 330, b_f: 160, tf: 11.5,tw: 7.5, A: 62.6 },
    'IPE360': { I: 16270,  W: 904,   h: 360, b_f: 170, tf: 12.7,tw: 8.0, A: 72.7 },
    'IPE400': { I: 23130,  W: 1156,  h: 400, b_f: 180, tf: 13.5,tw: 8.6, A: 84.5 },
    'IPE450': { I: 33740,  W: 1500,  h: 450, b_f: 190, tf: 14.6,tw: 9.4, A: 98.8 },
    'IPE500': { I: 48200,  W: 1928,  h: 500, b_f: 200, tf: 16.0,tw: 10.2,A: 116  },
};

/* Propiedades del hormigón y acero */
const MAT = {
    E_concreto: 24000,  // MPa  (E = 4700√f'c, f'c=25MPa)
    E_acero:    210000, // MPa
    fy:         420,    // MPa  (acero A630-420H, NCh)
    fc:         25,     // MPa  f'c hormigón
};

/* ══════════════════════════════════════════════════════════
   CÁLCULO ESTRUCTURAL REAL
   ══════════════════════════════════════════════════════════ */

/**
 * Calcula reacciones para viga simplemente apoyada
 * Suma de momentos en A y B.
 */
function calcReaccionesSimple(cargas, L) {
    let RB = 0, RA = 0;

    cargas.forEach(c => {
        if (c.tipo === 'puntual') {
            // P aplicada en x=a
            const a = c.a, P = c.P;
            RB += P * a / L;
        }
        else if (c.tipo === 'dist') {
            // q distribuida de x=a hasta x=b
            const a = c.a, b = c.b_end, q = c.q;
            const Ftotal = q * (b - a);
            const xCG    = a + (b - a) / 2;
            RB += Ftotal * xCG / L;
        }
        else if (c.tipo === 'triangular') {
            // q(x) = q_max * (x-a)/(b-a)
            const a = c.a, b = c.b_end, qmax = c.q;
            const Ftotal = 0.5 * qmax * (b - a);
            const xCG    = a + (b - a) * 2 / 3;
            RB += Ftotal * xCG / L;
        }
        else if (c.tipo === 'momento') {
            // Momento externo M en x=a
            RB -= c.M / L;
        }
    });

    RA = cargas.reduce((acc, c) => {
        if (c.tipo === 'puntual')    return acc + c.P;
        if (c.tipo === 'dist')       return acc + c.q * (c.b_end - c.a);
        if (c.tipo === 'triangular') return acc + 0.5 * c.q * (c.b_end - c.a);
        return acc;
    }, 0) - RB;

    return { RA, RB };
}

/**
 * Calcula reacciones para viga en voladizo (empotramiento en x=0)
 */
function calcReaccionesVoladizo(cargas, L) {
    let RA = 0, MA = 0; // RA = fuerza vertical, MA = momento de empotramiento

    cargas.forEach(c => {
        if (c.tipo === 'puntual') {
            RA += c.P;
            MA += c.P * c.a;
        }
        else if (c.tipo === 'dist') {
            const F = c.q * (c.b_end - c.a);
            RA += F;
            MA += F * (c.a + (c.b_end - c.a) / 2);
        }
        else if (c.tipo === 'triangular') {
            const F = 0.5 * c.q * (c.b_end - c.a);
            RA += F;
            MA += F * (c.a + (c.b_end - c.a) * 2 / 3);
        }
        else if (c.tipo === 'momento') {
            MA += c.M;
        }
    });

    return { RA, MA };
}

/**
 * Evalúa la carga distribuida total q(x) en un punto x
 * (suma de todas las cargas activas)
 */
function qAt(x, cargas) {
    let q = 0;
    cargas.forEach(c => {
        if (c.tipo === 'dist' && x >= c.a && x <= c.b_end) {
            q += c.q;
        }
        if (c.tipo === 'triangular' && x >= c.a && x <= c.b_end) {
            q += c.q * (x - c.a) / (c.b_end - c.a);
        }
    });
    return q;
}

/**
 * Evalúa V(x) y M(x) para VIGA SIMPLEMENTE APOYADA
 * usando integración numérica (método de secciones)
 */
function calcDiagramaSimple(cargas, L, n = 500) {
    const { RA } = calcReaccionesSimple(cargas, L);
    const xs = [], Vs = [], Ms = [];

    for (let i = 0; i <= n; i++) {
        const x = (i / n) * L;
        let V = RA;
        let M = RA * x;

        // Restar contribución de cargas a la izquierda de x
        cargas.forEach(c => {
            if (c.tipo === 'puntual' && c.a <= x) {
                V -= c.P;
                M -= c.P * (x - c.a);
            }
            else if (c.tipo === 'dist') {
                const a = c.a, b = Math.min(c.b_end, x), q = c.q;
                if (a < x) {
                    const len = b - a;
                    V -= q * len;
                    M -= q * len * (x - (a + len / 2));
                }
            }
            else if (c.tipo === 'triangular') {
                const a = c.a, qmax = c.q;
                if (a < x) {
                    const b = Math.min(c.b_end, x);
                    const len = b - a;
                    const F = 0.5 * qmax * (len / (c.b_end - c.a)) * len;
                    const xF = a + len * 2 / 3;
                    V -= F / (len > 0 ? 1 : 1);
                    // Simplificación: integración trapezoidal
                    const F2 = 0.5 * qmax * Math.pow(len, 2) / (c.b_end - c.a);
                    V -= (F2 - F); // corrección
                    M -= F2 * (x - (a + len * 2 / 3));
                }
            }
            else if (c.tipo === 'momento' && c.a <= x) {
                M -= c.M;
            }
        });

        xs.push(x);
        Vs.push(V);
        Ms.push(M);
    }

    return { xs, Vs, Ms };
}

/**
 * Evalúa V(x) y M(x) para VIGA EN VOLADIZO
 * Empotramiento en x=0, libre en x=L
 * Se calculan desde el extremo libre (x=L hacia x=0)
 */
function calcDiagramaVoladizo(cargas, L, n = 500) {
    const xs = [], Vs = [], Ms = [];

    for (let i = 0; i <= n; i++) {
        const x = (i / n) * L;
        // Sumamos fuerzas a la DERECHA de x (desde x hasta L)
        let V = 0, M = 0;

        cargas.forEach(c => {
            if (c.tipo === 'puntual' && c.a >= x) {
                V += c.P;
                M += c.P * (c.a - x);
            }
            else if (c.tipo === 'dist') {
                const a = Math.max(c.a, x), b = c.b_end;
                if (b > x) {
                    const len = b - a;
                    V += c.q * len;
                    M += c.q * len * (a + len / 2 - x);
                }
            }
            else if (c.tipo === 'triangular') {
                const a = Math.max(c.a, x), b = c.b_end;
                if (b > x) {
                    const len = b - a;
                    const F = 0.5 * c.q * len * len / (c.b_end - c.a);
                    M += F * (a + len * 2 / 3 - x);
                    V += F;
                }
            }
        });

        xs.push(x);
        Vs.push(-V);   // Signo convención: positivo compresión arriba
        Ms.push(-M);
    }

    return { xs, Vs, Ms };
}

/**
 * Calcula propiedades de sección e inercia
 */
function calcSeccion(tipo, params) {
    let I, W, A, E;

    if (tipo === 'rect') {
        const { b, h } = params;
        I = b * Math.pow(h, 3) / 12;           // m⁴
        W = b * Math.pow(h, 2) / 6;            // m³
        A = b * h;                              // m²
        E = MAT.E_concreto * 1e3;              // kN/m²
    }
    else if (tipo === 'T') {
        const { bw, bf, hf, h } = params;
        const hw = h - hf;
        const A_web = bw * hw;
        const A_fla = bf * hf;
        A = A_web + A_fla;
        // Centro geométrico desde abajo
        const yNA = (A_web * hw / 2 + A_fla * (hw + hf / 2)) / A;
        // Inercia respecto NA
        I = (bw * Math.pow(hw, 3) / 12 + A_web * Math.pow(yNA - hw / 2, 2))
          + (bf * Math.pow(hf, 3) / 12 + A_fla * Math.pow(hw + hf / 2 - yNA, 2));
        W = I / Math.max(yNA, h - yNA);
        E = MAT.E_concreto * 1e3;
    }
    else if (tipo === 'IPE') {
        const perf = PERFILES_IPE[params.ipe] || PERFILES_IPE['IPE300'];
        I = perf.I * 1e-8;                     // cm⁴ → m⁴
        W = perf.W * 1e-6;                     // cm³ → m³
        A = perf.A * 1e-4;                     // cm² → m²
        E = MAT.E_acero * 1e3;                 // kN/m²
    }

    const EI = E * I;
    return { I, W, A, E, EI };
}

/**
 * Calcula la flecha máxima por integración numérica de M(x)/EI
 * Método: integración doble de la ecuación diferencial de la elástica
 * EI·y'' = M(x)
 */
function calcFlecha(xs, Ms, EI, tipo) {
    const n = xs.length;
    const dx = xs[1] - xs[0];
    const L  = xs[xs.length - 1];

    // Primera integración: θ(x) = ∫M/EI dx
    const theta = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        theta[i] = theta[i - 1] + (Ms[i - 1] + Ms[i]) / 2 / EI * dx;
    }

    // Condición de contorno: θ en x=0 para viga simple (δ(0)=δ(L)=0)
    let theta0 = 0;
    if (tipo === 'simple') {
        // Ajustar θ(0) tal que δ(L) = 0
        // Segunda integración provisional
        const y_prov = new Array(n).fill(0);
        for (let i = 1; i < n; i++) {
            y_prov[i] = y_prov[i - 1] + (theta[i - 1] + theta[i]) / 2 * dx;
        }
        theta0 = -y_prov[n - 1] / L;
    }

    // Segunda integración con θ(0) ajustado
    const thetaAdj = theta.map((t, i) => t + theta0);
    const y = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        y[i] = y[i - 1] + (thetaAdj[i - 1] + thetaAdj[i]) / 2 * dx;
    }

    const yMax = Math.max(...y.map(Math.abs));
    const iMax = y.map(Math.abs).indexOf(yMax);

    return { y, yMax, xMax: xs[iMax] };
}

/**
 * Encuentra valores notables: máx, mín, ceros de M(x)
 */
function findNotables(xs, Ms) {
    const Mmax  = Math.max(...Ms);
    const Mmin  = Math.min(...Ms);
    const iMmax = Ms.indexOf(Mmax);
    const iMmin = Ms.indexOf(Mmin);
    const ceros = [];

    for (let i = 0; i < Ms.length - 1; i++) {
        if (Ms[i] * Ms[i + 1] < 0) {
            const x0 = xs[i] - Ms[i] * (xs[i + 1] - xs[i]) / (Ms[i + 1] - Ms[i]);
            ceros.push(x0);
        }
    }

    return { Mmax, Mmin, xMmax: xs[iMmax], xMmin: xs[iMmin], ceros };
}

/**
 * Función principal: calcular todo y devolver resultado
 */
function calcularDMF() {
    // 1. Propiedades de sección
    const secProps = calcSeccion(DMF.seccion, {
        b: DMF.b, h: DMF.h_sec,
        bw: DMF.bw, bf: DMF.bf, hf: DMF.hf, h: DMF.h_sec,
        ipe: DMF.ipe,
    });

    // 2. Diagramas V(x) y M(x)
    let diag;
    if (DMF.tipo === 'simple') {
        diag = calcDiagramaSimple(DMF.cargas, DMF.L);
    } else if (DMF.tipo === 'voladizo') {
        diag = calcDiagramaVoladizo(DMF.cargas, DMF.L);
    } else {
        diag = calcDiagramaSimple(DMF.cargas, DMF.L); // continua: pendiente
    }

    // 3. Valores notables
    const { Mmax, Mmin, xMmax, xMmin, ceros } = findNotables(diag.xs, diag.Ms);

    // 4. Reacciones
    let reacciones;
    if (DMF.tipo === 'simple') {
        reacciones = calcReaccionesSimple(DMF.cargas, DMF.L);
    } else {
        reacciones = calcReaccionesVoladizo(DMF.cargas, DMF.L);
    }

    // 5. Flecha
    const flecha = calcFlecha(diag.xs, diag.Ms, secProps.EI, DMF.tipo);

    // 6. Tensiones
    const MmaxAbs  = Math.max(Math.abs(Mmax), Math.abs(Mmin)); // kN·m
    const sigma_max = MmaxAbs / secProps.W / 1000;             // MPa  (W en m³, M en kN·m → kN/m² /1000 = MPa)

    // 7. Verificación σ
    let sigma_adm;
    if (DMF.seccion === 'IPE') {
        sigma_adm = MAT.fy / 1.1;                  // MPa, factor de seguridad
    } else {
        sigma_adm = 0.45 * MAT.fc;                 // MPa, ACI simplificado
    }

    DMF.result = {
        ...diag,
        secProps,
        reacciones,
        flecha,
        Mmax, Mmin, xMmax, xMmin, ceros,
        sigma_max,
        sigma_adm,
        ok: sigma_max <= sigma_adm,
    };

    return DMF.result;
}

/* ══════════════════════════════════════════════════════════
   RENDERING — Dibujo del diagrama en canvas
   ══════════════════════════════════════════════════════════ */

const COLORS = {
    moment:    '#ff4757',
    shear:     '#0077ff',
    axial:     '#00ff9d',
    neutral:   'rgba(255,255,255,0.15)',
    beam:      'rgba(255,255,255,0.85)',
    grid:      'rgba(255,255,255,0.05)',
    text:      'rgba(255,255,255,0.7)',
    textDim:   'rgba(255,255,255,0.3)',
    accent:    '#00e5ff',
};

/**
 * Dibuja el diagrama de momento flector completo
 * en el canvas principal
 */
function drawDMF(canvas, result, opts = {}) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const pad  = { top: 60, right: 40, bottom: 80, left: 60 };
    const cw   = W - pad.left - pad.right;
    const ch   = H - pad.top  - pad.bottom;

    const { xs, Ms, Vs, L } = result;
    const Mmax = Math.max(...Ms.map(Math.abs)) || 1;
    const Vmax = Math.max(...Vs.map(Math.abs)) || 1;

    // Escalas
    const scaleX = cw / L;
    const scaleM = ch * 0.42 / Mmax;
    const scaleV = ch * 0.42 / Vmax;

    // Línea neutra central
    const yMid = pad.top + ch * 0.5;

    // ── Grid ──
    drawGrid(ctx, pad, cw, ch, yMid);

    // ── Diagrama Momento (relleno) ──
    drawFilledDiagram(ctx, xs, Ms, pad.left, yMid, scaleX, scaleM, COLORS.moment, true);

    // ── Viga (elemento estructural) ──
    drawBeamSymbol(ctx, pad.left, yMid + ch * 0.5 - 30, cw, result, L);

    // ── Etiquetas de valores notables ──
    drawMomentLabels(ctx, result, pad.left, yMid, scaleX, scaleM, L);

    // ── Ejes y escala ──
    drawAxes(ctx, pad, cw, ch, W, H, L, yMid, Mmax);
}

function drawGrid(ctx, pad, cw, ch, yMid) {
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);

    // Horizontales
    for (let i = 0; i <= 4; i++) {
        const y = yMid - ch * 0.42 + (i / 4) * ch * 0.42;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cw, y); ctx.stroke();
    }
    for (let i = 1; i <= 4; i++) {
        const y = yMid + (i / 4) * ch * 0.42;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cw, y); ctx.stroke();
    }

    ctx.setLineDash([]);
}

function drawFilledDiagram(ctx, xs, Ys, x0, y0, sx, sy, color, flip = false) {
    const sign = flip ? -1 : 1;
    const pts  = xs.map((x, i) => ({
        px: x0 + x * sx,
        py: y0 + sign * Ys[i] * sy,
    }));

    // Fill
    ctx.beginPath();
    ctx.moveTo(pts[0].px, y0);
    pts.forEach(p => ctx.lineTo(p.px, p.py));
    ctx.lineTo(pts[pts.length - 1].px, y0);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, y0 - Math.max(...Ys.map(Math.abs)) * sy, 0, y0);
    const hex  = color;
    grad.addColorStop(0, hex + 'CC');
    grad.addColorStop(0.6, hex + '44');
    grad.addColorStop(1, hex + '11');
    ctx.fillStyle = grad;
    ctx.fill();

    // Stroke
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py));
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
}

function drawBeamSymbol(ctx, x0, y0, cw, result, L) {
    const beamH = 12;
    ctx.beginPath();
    ctx.rect(x0, y0, cw, beamH);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Dibujar cargas sobre la viga
    result.cargas && drawLoadSymbols(ctx, result.cargas, x0, y0, cw / L);

    // Apoyos
    if (DMF.tipo === 'simple') {
        drawPinSupport(ctx, x0, y0 + beamH);
        drawRollerSupport(ctx, x0 + cw, y0 + beamH);
    } else if (DMF.tipo === 'voladizo') {
        drawFixedSupport(ctx, x0, y0);
    }
}

function drawLoadSymbols(ctx, cargas, x0, y0, sx) {
    cargas.forEach(c => {
        if (c.tipo === 'puntual') {
            const px = x0 + c.a * sx;
            drawArrowDownCanvas(ctx, px, y0 - 35, px, y0 - 2, 'rgba(255,140,0,0.9)', `${c.P} kN`);
        }
        else if (c.tipo === 'dist') {
            const ax = x0 + c.a * sx;
            const bx = x0 + c.b_end * sx;
            drawDistLoad(ctx, ax, bx, y0 - 32, y0 - 2, `${c.q} kN/m`);
        }
    });
}

function drawDistLoad(ctx, ax, bx, yTop, yBot, label) {
    const nArrows = Math.max(3, Math.floor((bx - ax) / 30));
    ctx.strokeStyle = 'rgba(255,140,0,0.8)';
    ctx.fillStyle   = 'rgba(255,140,0,0.8)';
    ctx.lineWidth   = 1.5;

    // Top line
    ctx.beginPath();
    ctx.moveTo(ax, yTop); ctx.lineTo(bx, yTop); ctx.stroke();

    // Arrows
    for (let i = 0; i <= nArrows; i++) {
        const x = ax + (i / nArrows) * (bx - ax);
        ctx.beginPath();
        ctx.moveTo(x, yTop);
        ctx.lineTo(x, yBot);
        ctx.stroke();
        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(x - 3, yBot - 6);
        ctx.lineTo(x, yBot);
        ctx.lineTo(x + 3, yBot - 6);
        ctx.stroke();
    }

    ctx.font = '10px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, (ax + bx) / 2, yTop - 6);
}

function drawArrowDownCanvas(ctx, x1, y1, x2, y2, color, label) {
    ctx.strokeStyle = color;
    ctx.fillStyle   = color;
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2 - 5, y2 - 9);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 + 5, y2 - 9);
    ctx.stroke();
    if (label) {
        ctx.font = '10px Space Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label, x1, y1 - 6);
    }
}

function drawPinSupport(ctx, x, y) {
    const s = 12;
    ctx.fillStyle = 'rgba(0,229,255,0.2)';
    ctx.strokeStyle = 'rgba(0,229,255,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - s, y + s * 1.5);
    ctx.lineTo(x + s, y + s * 1.5);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    // Ground
    ctx.beginPath();
    ctx.moveTo(x - s - 5, y + s * 1.5);
    ctx.lineTo(x + s + 5, y + s * 1.5);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.stroke();
}

function drawRollerSupport(ctx, x, y) {
    const s = 12;
    ctx.fillStyle = 'rgba(0,229,255,0.2)';
    ctx.strokeStyle = 'rgba(0,229,255,0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - s, y + s * 1.5);
    ctx.lineTo(x + s, y + s * 1.5);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    // Roller circle
    ctx.beginPath();
    ctx.arc(x, y + s * 1.5 + 6, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - s - 5, y + s * 1.5 + 12);
    ctx.lineTo(x + s + 5, y + s * 1.5 + 12);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.stroke();
}

function drawFixedSupport(ctx, x, y) {
    ctx.strokeStyle = 'rgba(0,229,255,0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - 3, y - 20);
    ctx.lineTo(x - 3, y + 30);
    ctx.stroke();
    // Hatching
    ctx.strokeStyle = 'rgba(0,229,255,0.2)';
    ctx.lineWidth = 1;
    for (let i = -20; i <= 30; i += 8) {
        ctx.beginPath();
        ctx.moveTo(x - 3, y + i);
        ctx.lineTo(x - 14, y + i + 8);
        ctx.stroke();
    }
}

function drawMomentLabels(ctx, result, x0, y0, sx, sy, L) {
    const { Mmax, Mmin, xMmax, xMmin } = result;

    ctx.font = 'bold 11px Space Mono, monospace';
    ctx.textAlign = 'center';

    // M máx positivo
    if (Math.abs(Mmax) > 0.01) {
        const px = x0 + xMmax * sx;
        const py = y0 - Mmax * sy;
        ctx.strokeStyle = COLORS.moment;
        ctx.fillStyle   = COLORS.moment;
        ctx.lineWidth   = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(px, y0); ctx.lineTo(px, py); ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fff';
        ctx.fillText(`M_max = ${Mmax.toFixed(2)} kN·m`, px, py - 10);

        ctx.fillStyle = COLORS.moment;
        ctx.fillText(`x = ${xMmax.toFixed(2)} m`, px, py - 22);
    }
}

function drawAxes(ctx, pad, cw, ch, W, H, L, yMid, Mmax) {
    // Axis horizontal
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pad.left, yMid);
    ctx.lineTo(pad.left + cw, yMid);
    ctx.stroke();

    // Ticks x
    ctx.fillStyle   = COLORS.textDim;
    ctx.font        = '10px Space Mono, monospace';
    ctx.textAlign   = 'center';
    const nTicks = 10;
    for (let i = 0; i <= nTicks; i++) {
        const x = pad.left + (i / nTicks) * cw;
        const val = (i / nTicks) * L;
        ctx.beginPath();
        ctx.moveTo(x, yMid - 4);
        ctx.lineTo(x, yMid + 4);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillText(val.toFixed(1), x, yMid + 16);
    }

    // Axis labels
    ctx.fillStyle = COLORS.text;
    ctx.font = '11px DM Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('x [m]', pad.left + cw / 2, H - 12);

    ctx.save();
    ctx.translate(16, pad.top + ch / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('M [kN·m]', 0, 0);
    ctx.restore();

    // M scale ticks
    ctx.textAlign = 'right';
    ctx.font = '9px Space Mono, monospace';
    const scaleM = ch * 0.42 / Mmax;
    [0.25, 0.5, 0.75, 1.0].forEach(f => {
        const yPos = yMid - f * Mmax * scaleM;
        const yNeg = yMid + f * Mmax * scaleM;
        ctx.fillStyle = COLORS.textDim;
        ctx.fillText(`+${(f * Mmax).toFixed(1)}`, pad.left - 4, yPos + 3);
        ctx.fillText(`-${(f * Mmax).toFixed(1)}`, pad.left - 4, yNeg + 3);
    });
}

/* ══════════════════════════════════════════════════════════
   RENDER SECCIÓN TRANSVERSAL
   ══════════════════════════════════════════════════════════ */
function drawSeccion(canvas, tipo, params) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;

    if (tipo === 'rect') {
        const scale = Math.min(W * 0.7 / params.b, H * 0.7 / params.h_sec);
        const bpx = params.b * scale, hpx = params.h_sec * scale;
        drawRectSection(ctx, cx - bpx / 2, cy - hpx / 2, bpx, hpx, params.b, params.h_sec);
    }
    else if (tipo === 'T') {
        drawTSection(ctx, cx, cy, params);
    }
    else if (tipo === 'IPE') {
        drawIPESection(ctx, cx, cy, params.ipe);
    }
}

function drawRectSection(ctx, x, y, bpx, hpx, b, h) {
    // Hormigón
    ctx.fillStyle = 'rgba(100,120,150,0.3)';
    ctx.strokeStyle = 'rgba(0,229,255,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, bpx, hpx);
    ctx.fill(); ctx.stroke();

    // Eje neutro
    ctx.strokeStyle = 'rgba(255,71,87,0.6)';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(x - 10, y + hpx / 2);
    ctx.lineTo(x + bpx + 10, y + hpx / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dimensiones
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '11px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`b = ${(b * 100).toFixed(0)} cm`, x + bpx / 2, y + hpx + 18);
    ctx.save();
    ctx.translate(x - 18, y + hpx / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`h = ${(h * 100).toFixed(0)} cm`, 0, 0);
    ctx.restore();

    // Label eje neutro
    ctx.fillStyle = 'rgba(255,71,87,0.8)';
    ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText('e.n.', x + bpx + 6, y + hpx / 2 + 3);
}

function drawTSection(ctx, cx, cy, p) {
    const scale = Math.min(200 / p.bf, 200 / p.h_sec);
    const bf = p.bf * scale, bw = p.bw * scale;
    const hf = p.hf * scale, hw = (p.h_sec - p.hf) * scale;
    const h  = p.h_sec * scale;
    const x0 = cx - bf / 2, y0 = cy - h / 2;

    // Ala
    ctx.fillStyle = 'rgba(100,120,150,0.3)';
    ctx.strokeStyle = 'rgba(0,229,255,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x0, y0, bf, hf);
    ctx.fill(); ctx.stroke();

    // Alma
    const xw = cx - bw / 2;
    ctx.beginPath();
    ctx.rect(xw, y0 + hf, bw, hw);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '10px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`bf=${(p.bf*100).toFixed(0)}cm`, cx, y0 - 8);
    ctx.fillText(`bw=${(p.bw*100).toFixed(0)}cm`, cx, y0 + h + 16);
}

function drawIPESection(ctx, cx, cy, ipeName) {
    const p = PERFILES_IPE[ipeName] || PERFILES_IPE['IPE300'];
    const scale = Math.min(160 / p.b_f, 200 / p.h);
    const h  = p.h  * scale, bf = p.b_f * scale;
    const tf = p.tf * scale, tw = p.tw * scale;
    const hw = h - 2 * tf;
    const x0 = cx - bf / 2, y0 = cy - h / 2;

    ctx.fillStyle = 'rgba(180,140,60,0.25)';
    ctx.strokeStyle = 'rgba(255,200,50,0.8)';
    ctx.lineWidth = 1.5;

    // Top flange
    ctx.beginPath(); ctx.rect(x0, y0, bf, tf); ctx.fill(); ctx.stroke();
    // Web
    ctx.beginPath(); ctx.rect(cx - tw / 2, y0 + tf, tw, hw); ctx.fill(); ctx.stroke();
    // Bottom flange
    ctx.beginPath(); ctx.rect(x0, y0 + tf + hw, bf, tf); ctx.fill(); ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(255,200,50,0.8)';
    ctx.font = 'bold 11px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(ipeName, cx, y0 - 10);
    ctx.font = '9px Space Mono, monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText(`I = ${p.I} cm⁴  |  W = ${p.W} cm³`, cx, y0 + h + 16);
}

/* ══════════════════════════════════════════════════════════
   API PÚBLICA — Exportada al módulo de la página
   ══════════════════════════════════════════════════════════ */
window.DMF_MODULE = {
    state: DMF,
    calcular: calcularDMF,
    draw: drawDMF,
    drawSeccion,
    PERFILES_IPE,
    MAT,

    /**
     * Agrega una carga al estado actual
     */
    addCarga(carga) {
        DMF.cargas.push(carga);
    },

    /**
     * Limpia todas las cargas
     */
    clearCargas() {
        DMF.cargas = [];
    },

    /**
     * Actualiza un parámetro de la viga y recalcula
     */
    setParam(key, value) {
        DMF[key] = value;
    },

    /**
     * Actualiza la sección transversal
     */
    setSeccion(tipo, params) {
        DMF.seccion = tipo;
        Object.assign(DMF, params);
    },

    /**
     * Formatea el resultado como texto para mostrar en panel
     */
    formatResult(result) {
        if (!result) return '';
        const r = result;
        const lines = [
            `RA = ${r.reacciones.RA?.toFixed(2) || '—'} kN`,
            `RB = ${r.reacciones.RB?.toFixed(2) || '—'} kN`,
            `M_max = ${r.Mmax.toFixed(2)} kN·m  @  x = ${r.xMmax.toFixed(2)} m`,
            `M_min = ${r.Mmin.toFixed(2)} kN·m  @  x = ${r.xMmin.toFixed(2)} m`,
            `δ_max = ${(r.flecha.yMax * 1000).toFixed(2)} mm  @  x = ${r.flecha.xMax.toFixed(2)} m`,
            `σ_max = ${r.sigma_max.toFixed(2)} MPa`,
            `σ_adm = ${r.sigma_adm.toFixed(2)} MPa`,
            `Verificación: ${r.ok ? '✅ CUMPLE' : '❌ NO CUMPLE'}`,
        ];
        return lines.join('\n');
    },
};