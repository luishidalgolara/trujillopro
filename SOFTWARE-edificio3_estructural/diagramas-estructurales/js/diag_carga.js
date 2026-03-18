/* ============================================================
   IngeLAB 3D — Diagramas Estructurales
   diag_carga.js  |  v1.0

   Motor de Diagramas de Carga — Tipos y representación visual
   
   Tipos de carga soportados:
     · Puntual (concentrada) — P [kN] en x=a
     · Distribuida uniforme  — q [kN/m] de a hasta b
     · Distribuida triangular— q crece de 0 hasta q_max
     · Distribuida trapecial — q1 en a, q2 en b
     · Momento externo       — M [kN·m] en x=a
     · Carga de viento       — distribución por altura (NCh 432)
     · Carga sísmica         — distribución parabólica (NCh 433)
   
   Funcionalidades:
     · Cálculo automático de resultante R y su posición xR
     · Área bajo la curva de carga
     · Equivalencia entre tipos de carga
     · Representación gráfica de cada tipo en canvas
     · Tabla de resumen de cargas
     · Combinaciones de carga (NCh / ACI / Eurocódigo)
     · Factor de carga según ASCE 7-22 / NCh 1537
   
   Combinaciones según NCh 1537:
     1.4D
     1.2D + 1.6L
     1.2D + 1.0L + 1.0S
     0.9D ± 1.0W
     1.2D + 1.0L ± 1.0E
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   ESTADO GLOBAL
   ══════════════════════════════════════════════════════════ */
const DC = {
    L:      6.0,            // Longitud de viga [m]
    tipo_activo: 'todas',   // Tipo de diagrama activo para render

    // Cargas por categoría (para combinaciones)
    cargas_D:  [],   // Carga muerta (dead)
    cargas_L:  [],   // Carga viva  (live)
    cargas_S:  [],   // Nieve       (snow)
    cargas_W:  [],   // Viento      (wind)
    cargas_E:  [],   // Sísmica     (earthquake)

    // Cargas activas (mix para render)
    cargas: [
        { id: 1, tipo: 'puntual',   P: 80,   a: 2.0,  label: 'P₁',   cat: 'L' },
        { id: 2, tipo: 'dist',      q: 15,   a: 0,    b_end: 6.0, label: 'q₁', cat: 'D' },
        { id: 3, tipo: 'triangular',q: 25,   a: 3.0,  b_end: 6.0, label: 'q₂', cat: 'L' },
    ],

    // Parámetros de viento NCh 432
    viento: {
        V_ref:   28.0,    // m/s velocidad referencia zona II
        expo:    'B',     // 'A' | 'B' | 'C'  (rugosidad)
        h_total: 12.0,    // m altura total edificio
        b:       10.0,    // m ancho fachada
        Cp:      0.8,     // Coef. presión exterior a barlovento
    },

    // Parámetros sísmico NCh 433
    sismico: {
        zona:    2,       // 1..4
        suelo:   'B',     // A|B|C|D
        Z:       0.30,    // Aceleración pico zona
        I:       1.0,     // Factor importancia
        Ct:      0.09,    // Factor período (pórtico H.A.)
        n_pisos: 4,
        W_piso:  500,     // kN peso por piso
    },

    // Combinaciones activas
    combinaciones: [],
    result: null,
};

/* ══════════════════════════════════════════════════════════
   CÁLCULO DE RESULTANTES
   ══════════════════════════════════════════════════════════ */

/**
 * Calcula la resultante R y su posición xR para cada carga
 */
function calcResultante(carga, L) {
    let R, xR, descripcion;

    switch (carga.tipo) {
        case 'puntual':
            R    = carga.P;
            xR   = carga.a;
            descripcion = `R = P = ${R.toFixed(2)} kN @ x = ${xR.toFixed(2)} m`;
            break;

        case 'dist':
            R    = carga.q * (carga.b_end - carga.a);
            xR   = carga.a + (carga.b_end - carga.a) / 2;
            descripcion = `R = q·L = ${carga.q}×${(carga.b_end-carga.a).toFixed(1)} = ${R.toFixed(2)} kN @ x = ${xR.toFixed(2)} m`;
            break;

        case 'triangular':
            R    = 0.5 * carga.q * (carga.b_end - carga.a);
            xR   = carga.a + (carga.b_end - carga.a) * 2 / 3;
            descripcion = `R = ½·q·L = ${R.toFixed(2)} kN @ x = ${xR.toFixed(2)} m`;
            break;

        case 'trapecial': {
            const len = carga.b_end - carga.a;
            const R1  = carga.q1 * len;
            const R2  = 0.5 * (carga.q2 - carga.q1) * len;
            R    = R1 + R2;
            const x1 = carga.a + len / 2;
            const x2 = carga.a + len * 2 / 3;
            xR   = (R1 * x1 + R2 * x2) / R;
            descripcion = `R = ${R.toFixed(2)} kN @ x = ${xR.toFixed(2)} m`;
            break;
        }

        case 'momento':
            R    = 0;     // no tiene resultante vertical
            xR   = carga.a;
            descripcion = `M_ext = ${carga.M.toFixed(2)} kN·m @ x = ${xR.toFixed(2)} m`;
            break;

        case 'viento':
            // Resultante viento = área bajo curva de presión
            R    = carga.resultante || 0;
            xR   = carga.xR || L / 2;
            descripcion = `R_viento = ${R.toFixed(2)} kN @ x = ${xR.toFixed(2)} m`;
            break;

        default:
            R = 0; xR = 0; descripcion = '—';
    }

    return { R, xR, descripcion };
}

/**
 * Calcula la intensidad de carga q(x) en un punto dado
 */
function qEnPunto(carga, x) {
    if (x < (carga.a || 0) || x > (carga.b_end || carga.a || 0)) return 0;
    switch (carga.tipo) {
        case 'dist':       return carga.q;
        case 'triangular': return carga.q * (x - carga.a) / (carga.b_end - carga.a);
        case 'trapecial':  return carga.q1 + (carga.q2 - carga.q1) * (x - carga.a) / (carga.b_end - carga.a);
        default:           return 0;
    }
}

/**
 * Genera el perfil de carga distribuida q(x) acumulado [kN/m]
 */
function perfilCargaTotal(cargas, L, n = 300) {
    const xs = Array.from({ length: n + 1 }, (_, i) => (i / n) * L);
    const qs = xs.map(x => cargas.reduce((sum, c) => sum + qEnPunto(c, x), 0));
    return { xs, qs };
}

/* ══════════════════════════════════════════════════════════
   CARGA DE VIENTO — NCh 432
   ══════════════════════════════════════════════════════════ */

/**
 * Presión de viento por altura según NCh 432
 * p(z) = Ce(z) · Cq · q_ref
 * Ce(z) = Cz · Ct  (exposición)
 * q_ref = 0.5 · ρ · V_ref²   ρ_aire = 1.25 kg/m³
 */
function calcViento(params) {
    const { V_ref, expo, h_total, b, Cp } = params;
    const rho    = 1.25;                           // kg/m³
    const q_ref  = 0.5 * rho * V_ref * V_ref / 1000;  // kPa

    // Coeficientes de rugosidad por exposición (NCh 432 Tabla 5)
    const expoParams = {
        'A': { z_min: 10, alpha: 0.14, Cz: 1.00 },
        'B': { z_min: 5,  alpha: 0.22, Cz: 0.85 },
        'C': { z_min: 3,  alpha: 0.30, Cz: 0.70 },
    };
    const ep = expoParams[expo] || expoParams['B'];

    // Perfil de presión por altura
    const nZ = 20;
    const zs = [], ps = [];
    for (let i = 0; i <= nZ; i++) {
        const z = (i / nZ) * h_total;
        const z_ref = Math.max(z, ep.z_min);
        const Ce = ep.Cz * Math.pow(z_ref / 10, 2 * ep.alpha);  // simplificado
        const p  = Ce * Cp * q_ref;   // kPa
        zs.push(z);
        ps.push(p);
    }

    // Resultante total sobre el edificio (fuerza horizontal)
    const R_total = ps.reduce((sum, p, i) => {
        if (i === 0) return sum;
        const dz = (zs[i] - zs[i - 1]);
        return sum + (ps[i] + ps[i - 1]) / 2 * dz * b;  // kN
    }, 0);

    // Altura de aplicación de resultante (centroide)
    let numerador = 0;
    ps.forEach((p, i) => {
        if (i === 0) return;
        const dz = zs[i] - zs[i - 1];
        const F  = (ps[i] + ps[i - 1]) / 2 * dz * b;
        numerador += F * (zs[i] + zs[i - 1]) / 2;
    });
    const z_R = R_total > 0 ? numerador / R_total : h_total / 2;

    return { zs, ps, R_total, z_R, q_ref, V_ref };
}

/* ══════════════════════════════════════════════════════════
   CARGA SÍSMICA — NCh 433
   ══════════════════════════════════════════════════════════ */

/**
 * Distribución de fuerzas sísmicas por piso — NCh 433 §6.3.4
 * Fi = (Ft + V·wi·hi) / Σ(wi·hi)
 * Ft = 0.07·T·V ≤ 0.25V (si T > 0.7s) — concentrada en último piso
 * V = Sa·W/g  donde Sa depende del espectro
 */
function calcSismico(params) {
    const { zona, suelo, Z, I, Ct, n_pisos, W_piso } = params;

    // Período estimado (NCh 433 §6.3.3)
    const h_total = n_pisos * 3.0;   // asumiendo 3m por piso
    const T = Ct * Math.pow(h_total, 0.75);

    // Coeficientes de suelo (NCh 433 Tabla 6.3)
    const sueloCoef = {
        'A': { S: 1.00, Tp: 0.30, n: 1.0 },
        'B': { S: 1.20, Tp: 0.45, n: 1.5 },
        'C': { S: 1.30, Tp: 0.65, n: 1.8 },
        'D': { S: 1.40, Tp: 1.05, n: 2.0 },
    };
    const sc = sueloCoef[suelo] || sueloCoef['B'];

    // Espectro elástico (simplificado)
    let Sa;
    if (T <= sc.Tp) {
        Sa = Z * I * sc.S * 2.75;       // Plateau del espectro
    } else {
        Sa = Z * I * sc.S * 2.75 * Math.pow(sc.Tp / T, sc.n);
    }
    Sa = Math.max(Sa, 0.1 * Z * I);   // Mínimo NCh 433

    // Cortante basal
    const W_total = W_piso * n_pisos;
    const g = 9.81;
    const V = (Sa / g) * W_total;     // kN — nota: Sa en m/s², W en kN

    // Factor Ft
    const Ft = T > 0.7 ? Math.min(0.07 * T * V, 0.25 * V) : 0;

    // Distribución por piso Fi
    let sumWH = 0;
    const pisos = Array.from({ length: n_pisos }, (_, i) => {
        const h_piso = (i + 1) * 3.0;  // altura desde la base
        const wi     = W_piso;
        sumWH += wi * h_piso;
        return { piso: i + 1, h: h_piso, w: wi };
    });

    pisos.forEach((p, i) => {
        const Fi_base = (V - Ft) * p.w * p.h / sumWH;
        p.Fi = Fi_base + (i === pisos.length - 1 ? Ft : 0);
    });

    return { T, Sa, V, Ft, pisos, W_total, Z, I, suelo };
}

/* ══════════════════════════════════════════════════════════
   COMBINACIONES DE CARGA — NCh 1537 / ASCE 7-22
   ══════════════════════════════════════════════════════════ */

/**
 * Genera las combinaciones de carga según NCh 1537 / ASCE 7-22
 * Retorna cada combinación con su carga total ponderada
 */
function calcCombinaciones(D, L, S = 0, W = 0, E = 0) {
    const combis = [
        { nombre: '1.4D',                   valor: 1.4*D,                        norma: 'NCh 1537 / ASCE 7' },
        { nombre: '1.2D + 1.6L',            valor: 1.2*D + 1.6*L,                norma: 'NCh 1537 / ASCE 7' },
        { nombre: '1.2D + 1.6L + 0.5S',    valor: 1.2*D + 1.6*L + 0.5*S,       norma: 'NCh 1537 / ASCE 7' },
        { nombre: '1.2D + 1.0L + 1.0S',    valor: 1.2*D + 1.0*L + 1.0*S,       norma: 'NCh 1537' },
        { nombre: '1.2D + 1.0L + 1.0W',    valor: 1.2*D + 1.0*L + 1.0*W,       norma: 'ASCE 7' },
        { nombre: '0.9D + 1.0W',            valor: 0.9*D + 1.0*W,                norma: 'Vuelco / tracción' },
        { nombre: '1.2D + 1.0L + 1.0E',    valor: 1.2*D + 1.0*L + 1.0*E,       norma: 'NCh 433 / ASCE 7' },
        { nombre: '0.9D + 1.0E',            valor: 0.9*D + 1.0*E,                norma: 'Sísmica vuelco' },
    ];

    // Marcar la combinación dominante
    const maxVal = Math.max(...combis.map(c => c.valor));
    combis.forEach(c => { c.dominante = Math.abs(c.valor - maxVal) < 0.01; });

    return combis;
}

/* ══════════════════════════════════════════════════════════
   FUNCIÓN PRINCIPAL
   ══════════════════════════════════════════════════════════ */
function calcularDC() {
    // Resultantes individuales
    const resultantes = DC.cargas.map(c => ({
        ...c,
        ...calcResultante(c, DC.L),
    }));

    // Perfil total
    const perfil = perfilCargaTotal(DC.cargas, DC.L);

    // Resultante total
    const R_total = resultantes.reduce((s, c) => s + (c.R || 0), 0);
    const xR_total = R_total > 0
        ? resultantes.reduce((s, c) => s + (c.R || 0) * c.xR, 0) / R_total
        : DC.L / 2;

    // Viento
    const vientoResult = calcViento(DC.viento);

    // Sísmico
    const sismicoResult = calcSismico(DC.sismico);

    // Combinaciones usando resultantes por categoría
    const sumD = resultantes.filter(c => c.cat === 'D').reduce((s, c) => s + c.R, 0);
    const sumL = resultantes.filter(c => c.cat === 'L').reduce((s, c) => s + c.R, 0);
    const sumS = resultantes.filter(c => c.cat === 'S').reduce((s, c) => s + c.R, 0);
    const sumW = vientoResult.R_total;
    const sumE = sismicoResult.V;

    const combinaciones = calcCombinaciones(sumD, sumL, sumS, sumW, sumE);

    DC.result = {
        resultantes,
        perfil,
        R_total,
        xR_total,
        viento: vientoResult,
        sismico: sismicoResult,
        combinaciones,
        sumD, sumL, sumS, sumW, sumE,
    };

    return DC.result;
}

/* ══════════════════════════════════════════════════════════
   RENDERING — Diagramas individuales de carga
   ══════════════════════════════════════════════════════════ */

const COLORES_DC = {
    puntual:    '#ff8c00',
    dist:       '#00e5ff',
    triangular: '#c084fc',
    trapecial:  '#00ff9d',
    momento:    '#ff4757',
    viento:     '#0077ff',
    sismico:    '#ff4757',
    resultante: 'rgba(255,255,255,0.7)',
    beam:       'rgba(255,255,255,0.25)',
    grid:       'rgba(255,255,255,0.05)',
    text:       'rgba(255,255,255,0.7)',
    textDim:    'rgba(255,255,255,0.3)',
};

/**
 * Dibuja el diagrama general con todas las cargas activas
 */
function drawDiagramaCargas(canvas, result, opts = {}) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const L    = DC.L;
    const pad  = { top: 30, right: 30, bottom: 70, left: 50 };
    const cw   = W - pad.left - pad.right;
    const ch   = H - pad.top  - pad.bottom;
    const beamY = pad.top + ch * 0.62;
    const scaleX = cw / L;

    // Grid
    drawLoadGrid(ctx, pad, cw, ch, beamY, L, scaleX);

    // Viga
    drawBeamLoad(ctx, pad.left, beamY, cw);

    // Dibujar cada carga
    const qmax = Math.max(...result.resultantes.map(r => r.q || r.P || 0), 1);
    const arrowH = ch * 0.45;

    DC.cargas.forEach((c, idx) => {
        drawCargaIndividual(ctx, c, pad.left, beamY, scaleX, arrowH, qmax, idx);
    });

    // Resultante total
    const rx = pad.left + result.xR_total * scaleX;
    drawResultante(ctx, rx, beamY, result.R_total);

    // Apoyos
    drawApoyoLoad(ctx, pad.left, beamY, 'pin');
    drawApoyoLoad(ctx, pad.left + cw, beamY, 'roller');

    // Eje x
    drawEjeXLoad(ctx, pad, cw, ch, W, H, beamY, L, scaleX);
}

function drawCargaIndividual(ctx, carga, x0, beamY, sx, arrowH, qmax, idx) {
    const color = COLORES_DC[carga.tipo] || COLORES_DC.puntual;

    if (carga.tipo === 'puntual') {
        const px = x0 + carga.a * sx;
        const len = Math.min(arrowH * 0.7, arrowH);
        drawFlechaCarga(ctx, px, beamY - len, px, beamY - 1, color, `${carga.label || 'P'}=${carga.P}kN`);
    }

    else if (carga.tipo === 'dist') {
        const ax = x0 + carga.a * sx;
        const bx = x0 + carga.b_end * sx;
        const h  = arrowH * 0.6;
        drawDistribuida(ctx, ax, bx, beamY - h, beamY - 1, color, `${carga.label || 'q'}=${carga.q}kN/m`);
    }

    else if (carga.tipo === 'triangular') {
        const ax = x0 + carga.a * sx;
        const bx = x0 + carga.b_end * sx;
        const h  = arrowH * 0.65;
        drawTriangular(ctx, ax, bx, beamY - h, beamY - 1, color, `${carga.label || 'q'}=${carga.q}kN/m`);
    }

    else if (carga.tipo === 'trapecial') {
        const ax = x0 + carga.a * sx;
        const bx = x0 + carga.b_end * sx;
        const h1 = arrowH * (carga.q1 / qmax) * 0.65;
        const h2 = arrowH * (carga.q2 / qmax) * 0.65;
        drawTrapecial(ctx, ax, bx, beamY, h1, h2, color, `${carga.label || 'q'}`);
    }

    else if (carga.tipo === 'momento') {
        const px = x0 + carga.a * sx;
        drawMomentoExterno(ctx, px, beamY - arrowH * 0.5, carga.M, color, `${carga.label || 'M'}=${carga.M}kN·m`);
    }
}

/* ── Tipos de carga ─── */

function drawFlechaCarga(ctx, x1, y1, x2, y2, color, label) {
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(x2 - 5, y2 - 10); ctx.lineTo(x2, y2); ctx.lineTo(x2 + 5, y2 - 10);
    ctx.lineWidth = 2; ctx.stroke();
    // Label
    ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(label, x1, y1 - 6);
    // Punto de aplicación
    ctx.beginPath(); ctx.arc(x2, y2 + 1, 3, 0, Math.PI * 2); ctx.fill();
}

function drawDistribuida(ctx, ax, bx, yTop, yBot, color, label) {
    // Área rellena
    ctx.beginPath(); ctx.moveTo(ax, yTop); ctx.lineTo(bx, yTop); ctx.lineTo(bx, yBot); ctx.lineTo(ax, yBot); ctx.closePath();
    const g = ctx.createLinearGradient(0, yTop, 0, yBot);
    g.addColorStop(0, color + 'CC'); g.addColorStop(1, color + '22');
    ctx.fillStyle = g; ctx.fill();

    // Línea superior
    ctx.beginPath(); ctx.moveTo(ax, yTop); ctx.lineTo(bx, yTop);
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();

    // Flechas
    const n = Math.max(3, Math.floor((bx - ax) / 28));
    for (let i = 0; i <= n; i++) {
        const x = ax + (i / n) * (bx - ax);
        ctx.strokeStyle = color; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x, yTop + 4); ctx.lineTo(x, yBot - 1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 3, yBot - 8); ctx.lineTo(x, yBot - 1); ctx.lineTo(x + 3, yBot - 8); ctx.stroke();
    }

    // Label
    ctx.fillStyle = color; ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(label, (ax + bx) / 2, yTop - 6);
}

function drawTriangular(ctx, ax, bx, hMax, yBot, color, label) {
    const yTop = yBot - hMax;

    // Triángulo relleno
    ctx.beginPath();
    ctx.moveTo(ax, yBot);
    ctx.lineTo(ax, yBot);        // sin carga en ax
    ctx.lineTo(bx, yTop);        // máx en bx
    ctx.lineTo(bx, yBot);
    ctx.closePath();
    const g = ctx.createLinearGradient(ax, 0, bx, 0);
    g.addColorStop(0, color + '11'); g.addColorStop(1, color + 'CC');
    ctx.fillStyle = g; ctx.fill();

    // Borde diagonal
    ctx.beginPath(); ctx.moveTo(ax, yBot - 2); ctx.lineTo(bx, yTop);
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();

    // Flechas variables
    const n = 5;
    for (let i = 1; i <= n; i++) {
        const t  = i / n;
        const x  = ax + t * (bx - ax);
        const h  = hMax * t;
        const yt = yBot - h;
        ctx.strokeStyle = color; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(x, yt + 4); ctx.lineTo(x, yBot - 1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 3, yBot - 8); ctx.lineTo(x, yBot - 1); ctx.lineTo(x + 3, yBot - 8); ctx.stroke();
    }

    ctx.fillStyle = color; ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(label, bx - (bx - ax) * 0.3, yTop - 6);
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '9px Space Mono, monospace';
    ctx.fillText('0', ax, yBot - 4);
}

function drawTrapecial(ctx, ax, bx, yBot, h1, h2, color, label) {
    const yTop1 = yBot - h1, yTop2 = yBot - h2;

    ctx.beginPath();
    ctx.moveTo(ax, yBot); ctx.lineTo(ax, yTop1); ctx.lineTo(bx, yTop2); ctx.lineTo(bx, yBot); ctx.closePath();
    const g = ctx.createLinearGradient(0, Math.min(yTop1, yTop2), 0, yBot);
    g.addColorStop(0, color + 'CC'); g.addColorStop(1, color + '11');
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ax, yTop1); ctx.lineTo(bx, yTop2); ctx.stroke();

    // Flechas
    const n = 5;
    for (let i = 0; i <= n; i++) {
        const t = i / n;
        const x = ax + t * (bx - ax);
        const h = h1 + (h2 - h1) * t;
        const yt = yBot - h;
        ctx.strokeStyle = color; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(x, yt + 4); ctx.lineTo(x, yBot - 1); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 3, yBot - 8); ctx.lineTo(x, yBot - 1); ctx.lineTo(x + 3, yBot - 8); ctx.stroke();
    }

    ctx.fillStyle = color; ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(label, (ax + bx) / 2, Math.min(yTop1, yTop2) - 6);
}

function drawMomentoExterno(ctx, cx, cy, M, color, label) {
    // Arco con flecha
    const r = 22;
    const dir = M > 0 ? 1 : -1;  // positivo = antihorario (conv. mecánica)

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * (M > 0 ? 1.6 : -1.6));
    ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    ctx.stroke();

    // Arrowhead del momento
    const angEnd = M > 0 ? Math.PI * 1.6 : -Math.PI * 1.6;
    const ax = cx + r * Math.cos(angEnd);
    const ay = cy + r * Math.sin(angEnd);
    ctx.beginPath(); ctx.arc(ax, ay, 4, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();

    // Label
    ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(label, cx, cy - r - 8);
}

function drawResultante(ctx, rx, beamY, R) {
    if (R <= 0) return;
    const h = 40;
    ctx.strokeStyle = COLORES_DC.resultante; ctx.fillStyle = COLORES_DC.resultante;
    ctx.lineWidth = 3; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(rx, beamY - h); ctx.lineTo(rx, beamY - 1); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(rx - 7, beamY - 14); ctx.lineTo(rx, beamY - 1); ctx.lineTo(rx + 7, beamY - 14); ctx.fill();
    ctx.font = 'bold 11px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(`R=${R.toFixed(1)}kN`, rx, beamY - h - 8);
}

function drawBeamLoad(ctx, x0, y0, cw) {
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.rect(x0, y0, cw, 10); ctx.fill(); ctx.stroke();
}

function drawApoyoLoad(ctx, x, y, tipo) {
    const s = 10;
    ctx.fillStyle = 'rgba(0,229,255,0.12)'; ctx.strokeStyle = 'rgba(0,229,255,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x, y + 10); ctx.lineTo(x - s, y + 10 + s * 1.5); ctx.lineTo(x + s, y + 10 + s * 1.5); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (tipo === 'roller') { ctx.beginPath(); ctx.arc(x, y + 10 + s * 1.5 + 5, 4, 0, Math.PI * 2); ctx.stroke(); }
}

function drawLoadGrid(ctx, pad, cw, ch, beamY, L, scaleX) {
    ctx.strokeStyle = COLORES_DC.grid; ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
    for (let i = 0; i <= 6; i++) {
        const x = pad.left + (i / 6) * cw;
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ch); ctx.stroke();
    }
    ctx.setLineDash([]);
}

function drawEjeXLoad(ctx, pad, cw, ch, W, H, beamY, L, scaleX) {
    ctx.fillStyle = COLORES_DC.textDim; ctx.font = '10px Space Mono, monospace';
    for (let i = 0; i <= 6; i++) {
        const x = pad.left + (i / 6) * cw;
        const v = (i / 6) * L;
        ctx.textAlign = 'center'; ctx.fillText(`${v.toFixed(1)}m`, x, beamY + 30);
    }
    ctx.fillStyle = COLORES_DC.text; ctx.font = '11px DM Sans, sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('x [m]', pad.left + cw / 2, H - 10);
}

/* ── Diagrama de viento (perfil de presión por altura) ── */
function drawViento(canvas, vientoResult) {
    if (!canvas || !vientoResult) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { zs, ps, R_total, z_R } = vientoResult;
    const pad = { top: 30, right: 60, bottom: 40, left: 60 };
    const cw = W - pad.left - pad.right;
    const ch = H - pad.top - pad.bottom;

    const hMax = zs[zs.length - 1];
    const pMax = Math.max(...ps) || 1;
    const scaleZ = ch / hMax;
    const scaleP = cw * 0.65 / pMax;

    const x0 = pad.left;

    // Perfil de presión (horizontal, de 0 a p(z))
    ctx.beginPath();
    ctx.moveTo(x0, pad.top + ch);
    zs.forEach((z, i) => {
        const py = pad.top + ch - z * scaleZ;
        const px = x0 + ps[i] * scaleP;
        ctx.lineTo(px, py);
    });
    ctx.lineTo(x0, pad.top);
    ctx.closePath();
    const g = ctx.createLinearGradient(x0, 0, x0 + pMax * scaleP, 0);
    g.addColorStop(0, 'rgba(0,119,255,0.1)'); g.addColorStop(1, 'rgba(0,119,255,0.5)');
    ctx.fillStyle = g; ctx.fill();

    // Curva
    ctx.beginPath();
    zs.forEach((z, i) => {
        const py = pad.top + ch - z * scaleZ;
        const px = x0 + ps[i] * scaleP;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.strokeStyle = COLORES_DC.viento; ctx.lineWidth = 2.5; ctx.stroke();

    // Eje vertical (edificio)
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, pad.top); ctx.lineTo(x0, pad.top + ch); ctx.stroke();

    // Resultante
    const py_R = pad.top + ch - z_R * scaleZ;
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(x0, py_R); ctx.lineTo(x0 + pMax * scaleP + 40, py_R); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'left';
    ctx.fillText(`R = ${R_total.toFixed(1)} kN`, x0 + pMax * scaleP + 5, py_R - 4);
    ctx.fillText(`@ z = ${z_R.toFixed(1)} m`, x0 + pMax * scaleP + 5, py_R + 10);

    // Etiquetas eje z
    ctx.fillStyle = COLORES_DC.textDim; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'right';
    [0, 0.25, 0.5, 0.75, 1.0].forEach(f => {
        const z   = f * hMax;
        const py2 = pad.top + ch - z * scaleZ;
        ctx.fillText(`${z.toFixed(1)}m`, x0 - 4, py2 + 3);
    });

    // Título
    ctx.fillStyle = COLORES_DC.viento; ctx.font = 'bold 11px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText('Perfil de presión de viento p(z)', W / 2, pad.top - 10);
}

/* ── Diagrama de fuerzas sísmicas por piso ── */
function drawSismico(canvas, sismicoResult) {
    if (!canvas || !sismicoResult) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { pisos, V } = sismicoResult;
    const Fmax = Math.max(...pisos.map(p => p.Fi)) || 1;
    const pad  = { top: 30, right: 30, bottom: 40, left: 50 };
    const cw   = W - pad.left - pad.right;
    const ch   = H - pad.top - pad.bottom;
    const h_piso = ch / pisos.length;
    const scaleF = cw * 0.6 / Fmax;

    pisos.forEach((p, i) => {
        const y = pad.top + (pisos.length - 1 - i) * h_piso;
        const barW = p.Fi * scaleF;

        // Losa (línea)
        ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.rect(pad.left, y, cw * 0.25, h_piso * 0.12); ctx.fill(); ctx.stroke();

        // Flecha de fuerza sísmica
        const x0 = pad.left + cw * 0.25;
        ctx.strokeStyle = COLORES_DC.sismico; ctx.fillStyle = COLORES_DC.sismico; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x0, y + h_piso * 0.06); ctx.lineTo(x0 + barW, y + h_piso * 0.06); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x0 + barW - 8, y + h_piso * 0.06 - 4); ctx.lineTo(x0 + barW, y + h_piso * 0.06); ctx.lineTo(x0 + barW - 8, y + h_piso * 0.06 + 4); ctx.stroke();

        // Fill
        ctx.beginPath(); ctx.rect(x0, y + h_piso * 0.01, barW, h_piso * 0.1);
        const g = ctx.createLinearGradient(x0, 0, x0 + barW, 0);
        g.addColorStop(0, 'rgba(255,71,87,0.05)'); g.addColorStop(1, 'rgba(255,71,87,0.4)');
        ctx.fillStyle = g; ctx.fill();

        // Labels
        ctx.fillStyle = COLORES_DC.sismico; ctx.font = 'bold 9px Space Mono, monospace'; ctx.textAlign = 'left';
        ctx.fillText(`F${p.piso} = ${p.Fi.toFixed(1)} kN`, x0 + barW + 6, y + h_piso * 0.06 + 3);
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'right';
        ctx.fillText(`Piso ${p.piso}`, pad.left + cw * 0.22, y + h_piso * 0.06 + 3);
    });

    // Cortante basal
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = 'bold 11px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(`V_basal = ${V.toFixed(1)} kN  |  T = ${sismicoResult.T.toFixed(2)} s`, W / 2, H - 8);
}

/* ══════════════════════════════════════════════════════════
   TABLA DE COMBINACIONES
   ══════════════════════════════════════════════════════════ */

/**
 * Genera HTML de tabla de combinaciones
 */
function generarTablaHTML(combinaciones) {
    const rows = combinaciones.map(c => `
        <tr class="${c.dominante ? 'dom' : ''}">
            <td>${c.nombre}</td>
            <td>${c.valor.toFixed(2)} kN</td>
            <td>${c.norma}</td>
            <td>${c.dominante ? '⚠️ DOMINANTE' : ''}</td>
        </tr>
    `).join('');

    return `
        <table class="combi-table">
            <thead>
                <tr>
                    <th>Combinación</th>
                    <th>Valor [kN]</th>
                    <th>Norma</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

/* ══════════════════════════════════════════════════════════
   API PÚBLICA
   ══════════════════════════════════════════════════════════ */
window.DC_MODULE = {
    state: DC,
    calcular: calcularDC,
    draw: drawDiagramaCargas,
    drawViento,
    drawSismico,
    calcViento,
    calcSismico,
    calcCombinaciones,
    calcResultante,
    generarTablaHTML,

    setParam(key, value) { DC[key] = value; },
    addCarga(c)   { DC.cargas.push(c); },
    clearCargas() { DC.cargas = []; },
    removeCarga(id) { DC.cargas = DC.cargas.filter(c => c.id !== id); },

    formatResult(result) {
        if (!result) return '';
        const r = result;
        const lines = [
            `── Cargas activas ──────────────────`,
            ...r.resultantes.map(c =>
                `${(c.label || c.tipo).padEnd(6)} R=${c.R.toFixed(2).padStart(8)} kN  @ xR=${c.xR.toFixed(2)}m  [${c.cat || '—'}]`
            ),
            ``,
            `── Resultante total ────────────────`,
            `R     = ${r.R_total.toFixed(2)} kN`,
            `xR    = ${r.xR_total.toFixed(2)} m`,
            ``,
            `── Viento NCh 432 ──────────────────`,
            `V_ref = ${r.viento.V_ref} m/s`,
            `R_W   = ${r.viento.R_total.toFixed(2)} kN @ z=${r.viento.z_R.toFixed(1)}m`,
            ``,
            `── Sísmico NCh 433 ─────────────────`,
            `T     = ${r.sismico.T.toFixed(3)} s`,
            `Sa    = ${r.sismico.Sa.toFixed(3)} m/s²`,
            `V     = ${r.sismico.V.toFixed(2)} kN`,
            ``,
            `── Combinación dominante ───────────`,
            r.combinaciones.find(c => c.dominante)?.nombre || '—',
            `${r.combinaciones.find(c => c.dominante)?.valor.toFixed(2)} kN`,
        ];
        return lines.join('\n');
    },
};
