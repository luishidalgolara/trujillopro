/* ============================================================
   IngeLAB 3D — Diagramas Estructurales
   diag_interaccion.js  |  v1.0

   Motor REAL del Diagrama de Interacción M-N
   para columnas de Hormigón Armado

   Base teórica:
     · ACI 318-19  §22.4 — Resistencia de columnas
     · NCh 430.Of2008 — H.A. Chile
     · Eurocódigo 2 (referencia)

   Construcción del diagrama punto a punto:
     Para cada posición de la fibra neutra c (de 0 a ∞):
       1. Deformación compatible: εs_i = εcu·(c - di)/c
       2. Tensión en cada barra: fs_i = Es·εs_i  (≤ fy)
       3. Bloque de compresión Whitney: a = β1·c
       4. Fuerza en bloque: Cc = 0.85·f'c·a·b
       5. Fuerzas en barras: Cs_i = As_i·(fs_i - 0.85f'c)
                             Ts_i = As_i·fs_i  (tracción)
       6. Equilibrio: Pn = Cc + ΣCs_i - ΣTs_i
       7. Momento: Mn = Cc·(h/2 - a/2) + Σ[Fs_i·(h/2 - di)]

   Puntos especiales en la curva:
     · Punto A: Compresión pura (c = ∞)   → P0, M=0
     · Punto B: Falla balanceada (εs = εy en tracción extrema)
     · Punto C: Tracción pura (c = 0)     → 0, -Pt
     · Punto D: Flexión pura (Pn = 0)     → M_0

   Factores φ variables (ACI 318-19 §21.2.2):
     · Zona compresión controlada: φ = 0.65 (estribos) / 0.75 (espiral)
     · Zona tensión controlada:    φ = 0.90
     · Transición lineal entre εt = 0.002 y 0.005

   Armadura:
     · Distribución uniforme en perímetro
     · Hasta 20 barras individuales
     · ρ calculada automáticamente

   Verificación:
     · Punto de demanda (Mu, Nu) dentro del dominio φMn-φPn
     · DCR = demanda / capacidad
     · Zona de la sección (compresión / tracción controlada)
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   ESTADO GLOBAL
   ══════════════════════════════════════════════════════════ */
const DI = {
    // Geometría sección rectangular
    b:      0.40,          // Ancho [m]
    h:      0.50,          // Alto  [m]
    recub:  0.05,          // Recubrimiento a centro de barra [m]

    // Armadura longitudinal
    n_barras: 8,           // Número de barras (distribución uniforme perímetro)
    diam_b:   0.022,       // Diámetro barra [m] (Ø22mm)
    As_total: null,        // Calculada automáticamente [m²]
    rho:      null,        // ρ = As/Ag

    // Material
    fc:   25.0,            // MPa  f'c
    fy:   420.0,           // MPa  fy
    Es:   200000,          // MPa  módulo acero
    ecu:  0.003,           // Deformación última hormigón (ACI)
    beta1: null,           // Factor bloque Whitney — calculado

    // Tipo de refuerzo transversal
    estribos: 'rect',      // 'rect' | 'espiral'

    // Punto de demanda (para verificación)
    Mu: 150,               // kN·m
    Nu: 800,               // kN  (compresión +, tracción -)

    // Opciones de cálculo
    n_puntos: 120,         // Puntos en la curva
    phi_variable: true,    // Factor φ variable ACI 318-19

    result: null,
};

/* ══════════════════════════════════════════════════════════
   GEOMETRÍA DE ARMADURA
   ══════════════════════════════════════════════════════════ */

/**
 * Genera las posiciones de las barras distribuidas en perímetro
 * Retorna array de {y, As} donde y es la distancia desde el borde comprimido
 * Para sección rectangular h×b, carga en dirección h
 */
function generarBarras(h, b, recub, n_barras, diam_b) {
    const As_barra = Math.PI * Math.pow(diam_b / 2, 2);  // m²
    const barras = [];

    if (n_barras <= 2) {
        barras.push({ y: recub,     As: As_barra });
        barras.push({ y: h - recub, As: As_barra });
        return barras;
    }

    // Distribución estándar: barras en esquinas + intermedias
    // Cara comprimida (y = recub): floor(n/4) barras incluyendo esquinas
    const n_cara = Math.max(2, Math.round(n_barras / 4));
    const n_alma  = Math.max(0, Math.round((n_barras - 2 * n_cara) / 2));

    // Cara comprimida (arriba) — y pequeña
    for (let i = 0; i < n_cara; i++) {
        barras.push({ y: recub, As: As_barra });
    }

    // Barras intermedias (alma) — y media
    for (let i = 0; i < n_alma; i++) {
        const t = (i + 1) / (n_alma + 1);
        barras.push({ y: recub + t * (h - 2 * recub), As: As_barra });
    }

    // Cara traccionada (abajo) — y grande
    for (let i = 0; i < n_cara; i++) {
        barras.push({ y: h - recub, As: As_barra });
    }

    // Barras intermedias en cara opuesta
    for (let i = 0; i < n_alma; i++) {
        const t = (i + 1) / (n_alma + 1);
        barras.push({ y: h - recub - t * (h - 2 * recub), As: As_barra });
    }

    return barras;
}

/* ══════════════════════════════════════════════════════════
   FACTOR β1 — ACI 318-19 §22.2.2.4.3
   ══════════════════════════════════════════════════════════ */
function calcBeta1(fc) {
    if (fc <= 28)      return 0.85;
    if (fc >= 56)      return 0.65;
    return 0.85 - 0.05 * (fc - 28) / 7;
}

/* ══════════════════════════════════════════════════════════
   FACTOR φ VARIABLE — ACI 318-19 §21.2.2
   ══════════════════════════════════════════════════════════ */
function calcPhi(et, tipo_estribo) {
    const phi_c = tipo_estribo === 'espiral' ? 0.75 : 0.65;  // compresión controlada
    const phi_t = 0.90;                                        // tensión controlada
    const et_trans_min = 0.002;
    const et_trans_max = 0.005;

    if (et <= et_trans_min) return phi_c;
    if (et >= et_trans_max) return phi_t;
    // Interpolación lineal
    return phi_c + (phi_t - phi_c) * (et - et_trans_min) / (et_trans_max - et_trans_min);
}

/* ══════════════════════════════════════════════════════════
   CÁLCULO DE UN PUNTO DEL DIAGRAMA
   Para una posición de fibra neutra c [m]
   ══════════════════════════════════════════════════════════ */

/**
 * Calcula (Pn, Mn) para una profundidad de fibra neutra c
 * @param {number} c    - Profundidad de fibra neutra desde borde comprimido [m]
 * @param {Array}  barras - Array de {y, As} [m, m²]
 * @param {Object} params - {fc, fy, Es, ecu, beta1, b, h}
 * @returns {Object} {Pn, Mn, et, phi, phiPn, phiMn, zona}
 */
function calcPuntoMN(c, barras, params) {
    const { fc, fy, Es, ecu, beta1, b, h } = params;

    // Bloque de compresión de Whitney
    const a  = Math.min(beta1 * c, h);   // profundidad bloque [m]
    const Cc = 0.85 * fc * 1000 * a * b; // kN  (fc en MPa → kPa·m²)

    // Fuerzas en barras
    let Pn = Cc;
    let Mn = Cc * (h / 2 - a / 2);      // Momento respecto centroide de sección
    let et = 0;                           // Deformación en barra más traccionada

    barras.forEach(bar => {
        // Deformación compatible
        let eps_s;
        if (c < 1e-9) {
            eps_s = -ecu;    // tracción pura
        } else {
            eps_s = ecu * (c - bar.y) / c;
        }

        // Tensión en la barra
        const fs = Math.max(-fy, Math.min(fy, Es * eps_s));  // MPa, limitada a ±fy

        // Fuerza en la barra [kN]
        const Fs = bar.As * fs * 1000;  // m² × MPa × 1000 = kN

        // Descontar la presión del hormigón (solo en zona comprimida)
        const Fs_net = bar.y <= a
            ? bar.As * (fs - 0.85 * fc) * 1000   // comprimida
            : Fs;                                  // traccionada

        // Suma a Pn y Mn
        Pn += Fs_net;
        Mn += Fs_net * (h / 2 - bar.y);

        // Actualizar deformación extrema en tracción
        if (eps_s < et) et = eps_s;
    });

    // et es la deformación en la barra de tracción más extrema (negativa = tracción)
    const et_abs = Math.abs(Math.min(0, et));
    const phi = calcPhi(et_abs, params.estribos || 'rect');

    // Zona del diagrama
    let zona;
    if (et_abs <= 0.002)      zona = 'compresión controlada';
    else if (et_abs >= 0.005) zona = 'tensión controlada';
    else                       zona = 'transición';

    return {
        Pn,
        Mn: Math.abs(Mn),
        et: et_abs,
        phi,
        phiPn: phi * Pn,
        phiMn: phi * Math.abs(Mn),
        a,
        zona,
    };
}

/* ══════════════════════════════════════════════════════════
   CONSTRUCCIÓN COMPLETA DEL DIAGRAMA
   ══════════════════════════════════════════════════════════ */

function calcDiagramaInteraccion(params_di) {
    const { fc, fy, Es, ecu, b, h, recub, n_barras, diam_b, estribos, n_puntos } = params_di;

    // β1
    const beta1 = calcBeta1(fc);

    // Barras
    const barras = generarBarras(h, b, recub, n_barras, diam_b);
    const As_total = barras.reduce((s, bar) => s + bar.As, 0);
    const Ag       = b * h;
    const rho      = As_total / Ag;

    const params = { fc, fy, Es, ecu, beta1, b, h, estribos };

    // ── Punto A: Compresión pura (c → ∞) ──
    const Cc_max  = 0.85 * fc * 1000 * b * h;
    const Cs_max  = barras.reduce((s, bar) => s + bar.As * fy * 1000, 0);
    const P0      = Cc_max + Cs_max;            // kN
    const P0_max  = 0.80 * P0;                  // ACI §22.4.2.1 (límite axial)
    const phi_c   = estribos === 'espiral' ? 0.75 : 0.65;
    const phiP0   = phi_c * P0_max;             // kN

    // ── Punto C: Tracción pura (c = 0) ──
    const Pt      = barras.reduce((s, bar) => s + bar.As * fy * 1000, 0);  // kN

    // ── Falla balanceada (εt = εy en barra de tracción extrema) ──
    const ey      = fy / Es;
    const d_ext   = h - recub;                  // dist. borde a barra extrema tracción [m]
    const c_bal   = ecu / (ecu + ey) * d_ext;

    // ── Generar puntos del diagrama ──
    // Rango de c: de c_min (casi tracción pura) a c_max (casi compresión pura)
    const c_min = 0.001;
    const c_max = h * 5;

    // Distribución logarítmica para mayor densidad cerca de falla balanceada
    const puntos = [];

    // Zona tracción pura
    puntos.push({ Pn: -Pt, Mn: 0, phiPn: -0.90 * Pt, phiMn: 0, et: ecu * 10, phi: 0.90, zona: 'tracción pura' });

    // Rango continuo de c
    for (let i = 0; i <= n_puntos; i++) {
        const t = i / n_puntos;
        // Logarítmico
        const c = c_min * Math.pow(c_max / c_min, t);
        const pt = calcPuntoMN(c, barras, params);
        puntos.push({ ...pt, c });
    }

    // Ordenar por Pn ascendente
    puntos.sort((a, b) => a.Pn - b.Pn);

    // Punto balanceado exacto
    const ptBal = calcPuntoMN(c_bal, barras, params);

    // Punto de flexión pura (Pn = 0): interpolar
    let ptFlexPura = null;
    for (let i = 1; i < puntos.length; i++) {
        if (puntos[i - 1].Pn <= 0 && puntos[i].Pn >= 0) {
            const t = -puntos[i - 1].Pn / (puntos[i].Pn - puntos[i - 1].Pn);
            ptFlexPura = {
                Pn: 0,
                Mn: puntos[i - 1].Mn + t * (puntos[i].Mn - puntos[i - 1].Mn),
                phiPn: 0,
                phiMn: puntos[i - 1].phiMn + t * (puntos[i].phiMn - puntos[i - 1].phiMn),
            };
            break;
        }
    }

    // Aplicar límite máximo de Pn (ACI §22.4.2)
    puntos.forEach(p => {
        if (p.Pn > P0_max) { p.Pn = P0_max; p.Mn = 0; }
        if (p.phiPn > phiP0) { p.phiPn = phiP0; p.phiMn = 0; }
    });

    return {
        puntos,
        P0, P0_max, phiP0,
        Pt,
        c_bal,
        ptBal,
        ptFlexPura,
        barras,
        As_total,
        rho,
        beta1,
        params,
    };
}

/* ══════════════════════════════════════════════════════════
   VERIFICACIÓN DEL PUNTO DE DEMANDA
   ══════════════════════════════════════════════════════════ */

/**
 * Determina si el punto (Mu, Nu) está dentro del dominio φMn-φPn
 * Calcula el DCR como ratio demanda/capacidad en la dirección radial
 */
function verificarPuntoMN(Mu, Nu, puntos) {
    // Encontrar el punto de la curva φ con la misma relación M/N
    // DCR = distancia(demanda) / distancia(curva_φ) desde origen

    const dist_demanda = Math.sqrt(Mu * Mu + Nu * Nu);

    // Encontrar intersección de la línea radial con la curva φ
    let dist_curva = Infinity;
    let punto_cercano = null;

    for (let i = 0; i < puntos.length - 1; i++) {
        const p1 = puntos[i], p2 = puntos[i + 1];
        // Interpolación lineal en la curva
        const t_ratio = Mu > 0 ? Mu / Math.max(Mu, 1) : 0;

        // Distancia del punto (phiMn, phiPn) al origen
        const d1 = Math.sqrt(p1.phiMn ** 2 + p1.phiPn ** 2);
        const d2 = Math.sqrt(p2.phiMn ** 2 + p2.phiPn ** 2);

        // Ángulo del punto de demanda
        const ang_dem = Math.atan2(Nu, Mu);
        const ang_1   = Math.atan2(p1.phiPn, p1.phiMn);
        const ang_2   = Math.atan2(p2.phiPn, p2.phiMn);

        if ((ang_dem >= Math.min(ang_1, ang_2) && ang_dem <= Math.max(ang_1, ang_2)) ||
            Math.abs(ang_dem - ang_1) < 0.05) {
            const t  = Math.abs(ang_dem - ang_1) / Math.max(Math.abs(ang_2 - ang_1), 1e-9);
            const dc = d1 + t * (d2 - d1);
            if (dc < dist_curva) {
                dist_curva    = dc;
                punto_cercano = { phi_Mn: p1.phiMn + t * (p2.phiMn - p1.phiMn), phi_Pn: p1.phiPn + t * (p2.phiPn - p1.phiPn) };
            }
        }
    }

    const DCR    = dist_curva > 0 ? dist_demanda / dist_curva : Infinity;
    const dentro = DCR <= 1.0;

    // Zona de la demanda
    let zona_demanda;
    const puntoDemanda = calcPuntoMN_demanda(Nu, Mu, puntos);
    zona_demanda = puntoDemanda?.zona || 'desconocida';

    return {
        dentro,
        DCR,
        punto_cercano,
        dist_demanda,
        dist_curva,
        zona_demanda,
        mensaje: dentro
            ? `✅ CUMPLE — DCR = ${DCR.toFixed(3)}`
            : `❌ NO CUMPLE — DCR = ${DCR.toFixed(3)}`,
    };
}

function calcPuntoMN_demanda(Nu, Mu, puntos) {
    // Encontrar punto más cercano a (Mu, Nu) en la curva φ
    let min_dist = Infinity, closest = null;
    puntos.forEach(p => {
        const d = Math.sqrt((p.phiMn - Math.abs(Mu)) ** 2 + (p.phiPn - Nu) ** 2);
        if (d < min_dist) { min_dist = d; closest = p; }
    });
    return closest;
}

/* ══════════════════════════════════════════════════════════
   FUNCIÓN PRINCIPAL
   ══════════════════════════════════════════════════════════ */
function calcularDI() {
    // Completar estado
    DI.As_total = DI.n_barras * Math.PI * Math.pow(DI.diam_b / 2, 2);
    DI.rho      = DI.As_total / (DI.b * DI.h);
    DI.beta1    = calcBeta1(DI.fc);

    // Calcular diagrama
    const diagrama = calcDiagramaInteraccion({
        fc:       DI.fc,
        fy:       DI.fy,
        Es:       DI.Es,
        ecu:      DI.ecu,
        b:        DI.b,
        h:        DI.h,
        recub:    DI.recub,
        n_barras: DI.n_barras,
        diam_b:   DI.diam_b,
        estribos: DI.estribos,
        n_puntos: DI.n_puntos,
    });

    // Verificar punto de demanda
    const verif = verificarPuntoMN(DI.Mu, DI.Nu, diagrama.puntos);

    DI.result = {
        ...diagrama,
        verif,
        Mu: DI.Mu,
        Nu: DI.Nu,
    };

    return DI.result;
}

/* ══════════════════════════════════════════════════════════
   RENDERING
   ══════════════════════════════════════════════════════════ */

const COLORES_I = {
    curva_nom:  'rgba(255,255,255,0.3)',
    curva_phi:  '#ff4757',
    bal:        '#ff8c00',
    flex_pura:  '#00ff9d',
    comp_pura:  '#00e5ff',
    demanda_ok: '#00ff9d',
    demanda_no: '#ff4757',
    zona_comp:  'rgba(0,119,255,0.08)',
    zona_trac:  'rgba(255,71,87,0.08)',
    zona_trans: 'rgba(255,140,0,0.06)',
    grid:       'rgba(255,255,255,0.05)',
    text:       'rgba(255,255,255,0.7)',
    textDim:    'rgba(255,255,255,0.3)',
    barra:      'rgba(255,140,0,0.8)',
};

/**
 * Dibuja el diagrama de interacción M-N completo
 */
function drawDiagramaInteraccion(canvas, result, opts = {}) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { puntos, ptBal, ptFlexPura, P0_max, phiP0, Pt, verif } = result;

    // Rangos
    const Mvals_n = puntos.map(p => p.Mn);
    const Pvals_n = puntos.map(p => p.Pn);
    const Mmax    = Math.max(...Mvals_n, 1);
    const Pmax    = Math.max(...Pvals_n, 1);
    const Pmin    = Math.min(-Pt, ...Pvals_n);

    const pad  = { top: 50, right: 30, bottom: 50, left: 70 };
    const cw   = W - pad.left - pad.right;
    const ch   = H - pad.top  - pad.bottom;

    // Ejes: M horizontal, N vertical
    const scaleM = cw * 0.90 / Mmax;
    const rango_P = Pmax - Pmin;
    const scaleP  = ch * 0.88 / rango_P;

    const x0 = pad.left;                                          // M=0
    const y0 = pad.top + (Pmax / rango_P) * ch * 0.88 + ch * 0.06; // N=0

    function toScreen(Mn, Pn) {
        return {
            px: x0 + Mn * scaleM,
            py: y0 - Pn * scaleP,
        };
    }

    // Grid
    drawGridI(ctx, x0, y0, pad, cw, ch, Mmax, Pmax, Pmin, scaleM, scaleP);

    // Zonas de color de fondo
    drawZonas(ctx, x0, y0, puntos, toScreen, ch, pad);

    // Curva nominal (Pn, Mn) — línea fina
    drawCurvaI(ctx, puntos.map(p => toScreen(p.Mn, p.Pn)), COLORES_I.curva_nom, 1.5, true);

    // Curva reducida (φPn, φMn) — línea principal
    drawCurvaI(ctx, puntos.map(p => toScreen(p.phiMn, p.phiPn)), COLORES_I.curva_phi, 2.5, true);

    // Relleno interior curva φ
    fillCurvaI(ctx, puntos.map(p => toScreen(p.phiMn, p.phiPn)));

    // Puntos especiales
    if (ptBal) {
        const s = toScreen(ptBal.phiMn, ptBal.phiPn);
        drawPuntoEspecial(ctx, s.px, s.py, COLORES_I.bal, 'B', 'Falla balanceada');
    }
    if (ptFlexPura) {
        const s = toScreen(ptFlexPura.phiMn, ptFlexPura.phiPn);
        drawPuntoEspecial(ctx, s.px, s.py, COLORES_I.flex_pura, 'D', 'Flexión pura');
    }

    // Punto de compresión pura
    const sP0 = toScreen(0, phiP0);
    drawPuntoEspecial(ctx, sP0.px, sP0.py, COLORES_I.comp_pura, 'A', `φP₀=${phiP0.toFixed(0)}kN`);

    // Punto de demanda (Mu, Nu)
    const sDem = toScreen(result.Mu, result.Nu);
    drawPuntoDemanda(ctx, sDem.px, sDem.py, verif.dentro);

    // Línea radial desde origen al punto demanda
    const s0 = toScreen(0, 0);
    ctx.strokeStyle = verif.dentro ? COLORES_I.demanda_ok : COLORES_I.demanda_no;
    ctx.lineWidth = 1; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(s0.px, s0.py); ctx.lineTo(sDem.px, sDem.py); ctx.stroke();
    ctx.setLineDash([]);

    // Ejes y etiquetas
    drawEjesI(ctx, x0, y0, pad, cw, ch, W, H, Mmax, Pmax, Pmin, scaleM, scaleP);

    // Badge de verificación
    drawVerifI(ctx, verif, result, W, pad.top);
}

function drawGridI(ctx, x0, y0, pad, cw, ch, Mmax, Pmax, Pmin, scaleM, scaleP) {
    ctx.strokeStyle = COLORES_I.grid; ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
    for (let i = 0; i <= 5; i++) {
        const x = x0 + (i / 5) * cw * 0.9;
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ch); ctx.stroke();
    }
    for (let i = 0; i <= 6; i++) {
        const y = pad.top + (i / 6) * ch;
        ctx.beginPath(); ctx.moveTo(x0 - 10, y); ctx.lineTo(x0 + cw, y); ctx.stroke();
    }
    ctx.setLineDash([]);
}

function drawZonas(ctx, x0, y0, puntos, toScreen, ch, pad) {
    // Zona compresión controlada (N alto) — azul tenue
    const limite_trans = puntos.find(p => p.zona === 'transición');
    if (limite_trans) {
        const sy = toScreen(0, limite_trans.phiPn);
        ctx.fillStyle = COLORES_I.zona_comp;
        ctx.fillRect(x0, pad.top, 1000, sy.py - pad.top);
    }
}

function drawCurvaI(ctx, pts, color, lw, closed) {
    if (!pts.length) return;
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py));
    if (closed) ctx.closePath();
    ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.stroke();
}

function fillCurvaI(ctx, pts) {
    if (!pts.length) return;
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py));
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,71,87,0.06)';
    ctx.fill();
}

function drawPuntoEspecial(ctx, px, py, color, letra, label) {
    ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();

    ctx.fillStyle = '#000'; ctx.font = 'bold 8px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(letra, px, py + 3);

    ctx.fillStyle = color; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'left';
    ctx.fillText(label, px + 10, py + 3);
}

function drawPuntoDemanda(ctx, px, py, dentro) {
    const color = dentro ? COLORES_I.demanda_ok : COLORES_I.demanda_no;

    // Cruz
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px - 8, py); ctx.lineTo(px + 8, py); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px, py - 8); ctx.lineTo(px, py + 8); ctx.stroke();

    // Círculo
    ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();

    ctx.fillStyle = color; ctx.font = 'bold 9px Space Mono, monospace'; ctx.textAlign = 'left';
    ctx.fillText('Demanda', px + 14, py - 4);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '8px Space Mono, monospace';
    ctx.fillText(`(${DI.Mu}kN·m, ${DI.Nu}kN)`, px + 14, py + 8);
}

function drawEjesI(ctx, x0, y0, pad, cw, ch, W, H, Mmax, Pmax, Pmin, scaleM, scaleP) {
    // Eje M (horizontal)
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x0 - 10, y0); ctx.lineTo(x0 + cw, y0); ctx.stroke();
    // Eje N (vertical)
    ctx.beginPath(); ctx.moveTo(x0, pad.top); ctx.lineTo(x0, pad.top + ch); ctx.stroke();

    // Ticks M
    ctx.fillStyle = COLORES_I.textDim; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'center';
    for (let i = 1; i <= 5; i++) {
        const x = x0 + (i / 5) * Mmax * 0.9 * scaleM;
        const v = (i / 5) * Mmax;
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, y0 - 4); ctx.lineTo(x, y0 + 4); ctx.stroke();
        ctx.fillText(`${v.toFixed(0)}`, x, y0 + 14);
    }

    // Ticks N
    ctx.textAlign = 'right';
    for (let i = 0; i <= 6; i++) {
        const Pval = Pmin + (i / 6) * (Pmax - Pmin);
        const y    = y0 - Pval * scaleP;
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x0 - 4, y); ctx.lineTo(x0 + 4, y); ctx.stroke();
        ctx.fillText(`${Pval.toFixed(0)}`, x0 - 6, y + 3);
    }

    // Labels
    ctx.fillStyle = COLORES_I.text; ctx.font = '11px DM Sans, sans-serif';
    ctx.textAlign = 'center'; ctx.fillText('φMn  [kN·m]', x0 + cw * 0.45, H - 12);
    ctx.save(); ctx.translate(16, pad.top + ch / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('φPn  [kN]', 0, 0); ctx.restore();

    // Labels leyenda
    ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'left';
    ctx.strokeStyle = COLORES_I.curva_phi; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(x0 + cw * 0.55, pad.top + 14); ctx.lineTo(x0 + cw * 0.55 + 28, pad.top + 14); ctx.stroke();
    ctx.fillStyle = COLORES_I.curva_phi;
    ctx.fillText('Curva φ (diseño)', x0 + cw * 0.55 + 32, pad.top + 18);

    ctx.strokeStyle = COLORES_I.curva_nom; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(x0 + cw * 0.55, pad.top + 30); ctx.lineTo(x0 + cw * 0.55 + 28, pad.top + 30); ctx.stroke();
    ctx.setLineDash([]); ctx.fillStyle = COLORES_I.curva_nom;
    ctx.fillText('Curva nominal Pn-Mn', x0 + cw * 0.55 + 32, pad.top + 34);
}

function drawVerifI(ctx, verif, result, W, padTop) {
    const ok    = verif.dentro;
    const bg    = ok ? 'rgba(0,255,157,0.1)' : 'rgba(255,71,87,0.1)';
    const bc    = ok ? 'rgba(0,255,157,0.3)' : 'rgba(255,71,87,0.3)';
    const color = ok ? '#00ff9d' : '#ff4757';

    ctx.fillStyle = bg; ctx.strokeStyle = bc; ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(W - 220, padTop + 6, 210, 52, 6);
    else ctx.rect(W - 220, padTop + 6, 210, 52);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = color; ctx.font = 'bold 11px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(ok ? '✅ DENTRO DEL DOMINIO' : '❌ FUERA DEL DOMINIO', W - 115, padTop + 24);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '9px Space Mono, monospace';
    ctx.fillText(`DCR = ${verif.DCR.toFixed(3)}  |  ρ = ${(result.rho * 100).toFixed(2)}%`, W - 115, padTop + 40);
    ctx.fillText(`f'c=${DI.fc}MPa  fy=${DI.fy}MPa  ${DI.n_barras}Ø${(DI.diam_b*1000).toFixed(0)}mm`, W - 115, padTop + 54);
}

/**
 * Dibuja la sección transversal con barras de armadura
 */
function drawSeccionColumnaDI(canvas, result) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { barras } = result;
    const cx = W / 2, cy = H / 2;
    const scale = Math.min(W * 0.65 / DI.b, H * 0.65 / DI.h);
    const bpx = DI.b * scale, hpx = DI.h * scale;
    const x0 = cx - bpx / 2, y0 = cy - hpx / 2;

    // Sección de hormigón
    ctx.fillStyle = 'rgba(100,120,160,0.25)';
    ctx.strokeStyle = 'rgba(0,229,255,0.6)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.rect(x0, y0, bpx, hpx); ctx.fill(); ctx.stroke();

    // Recubrimiento (línea punteada interior)
    const recPx = DI.recub * scale;
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.rect(x0 + recPx, y0 + recPx, bpx - 2 * recPx, hpx - 2 * recPx); ctx.stroke();
    ctx.setLineDash([]);

    // Barras de armadura
    const r_barra = Math.max(3, DI.diam_b * scale / 2);
    barras.forEach(bar => {
        // Distribuir barras uniformemente en x también
        const n_x = Math.ceil(Math.sqrt(barras.length));
        const bar_y = y0 + bar.y * scale;

        // Posiciones x: distribuir en ancho interior
        const n_barras_fila = Math.max(1, Math.round(DI.b / 0.15));
        const spacing_x = (bpx - 2 * recPx) / Math.max(1, n_barras_fila - 1);

        // Simplificado: filas de barras
        for (let xi = 0; xi < 2; xi++) {
            const bar_x = x0 + recPx + xi * (bpx - 2 * recPx);
            ctx.beginPath(); ctx.arc(bar_x, bar_y, r_barra, 0, Math.PI * 2);
            ctx.fillStyle = COLORES_I.barra; ctx.fill();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 0.5; ctx.stroke();
        }
    });

    // Cotas
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`b = ${(DI.b * 100).toFixed(0)} cm`, cx, y0 + hpx + 18);
    ctx.save(); ctx.translate(x0 - 18, cy); ctx.rotate(-Math.PI / 2);
    ctx.fillText(`h = ${(DI.h * 100).toFixed(0)} cm`, 0, 0); ctx.restore();

    // Eje neutro (para falla balanceada)
    if (result.c_bal) {
        const y_en = y0 + result.c_bal * scale;
        ctx.strokeStyle = 'rgba(255,140,0,0.7)'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(x0 - 8, y_en); ctx.lineTo(x0 + bpx + 8, y_en); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(255,140,0,0.8)'; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'left';
        ctx.fillText(`e.n. bal. c=${(result.c_bal * 100).toFixed(1)}cm`, x0 + bpx + 10, y_en + 3);
    }

    // Leyenda
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '9px Space Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`ρ = ${(result.rho * 100).toFixed(2)}%  |  As = ${(result.As_total * 10000).toFixed(2)} cm²`, cx, y0 - 10);
    ctx.fillText(`β₁ = ${result.beta1.toFixed(3)}  |  f'c = ${DI.fc} MPa`, cx, y0 - 22);
}

/* ══════════════════════════════════════════════════════════
   API PÚBLICA
   ══════════════════════════════════════════════════════════ */
window.DI_MODULE = {
    state: DI,
    calcular: calcularDI,
    draw: drawDiagramaInteraccion,
    drawSeccion: drawSeccionColumnaDI,
    calcBeta1,
    calcPhi,
    verificarPuntoMN,

    setParam(key, value) { DI[key] = value; },

    formatResult(result) {
        if (!result) return '';
        const r = result;
        return [
            `── Sección ─────────────────────────`,
            `b × h  = ${(DI.b*100).toFixed(0)} × ${(DI.h*100).toFixed(0)} cm`,
            `Ag     = ${(DI.b*DI.h*1e4).toFixed(0)} cm²`,
            `As     = ${(r.As_total*1e4).toFixed(2)} cm²`,
            `ρ      = ${(r.rho*100).toFixed(2)}%  (mín 1%, máx 8%)`,
            `β₁     = ${r.beta1.toFixed(3)}`,
            ``,
            `── Puntos clave ────────────────────`,
            `P₀     = ${r.P0.toFixed(0)} kN  (comp. pura)`,
            `φP₀    = ${r.phiP0.toFixed(0)} kN`,
            `Pt     = ${r.Pt.toFixed(0)} kN  (trac. pura)`,
            `c_bal  = ${(r.c_bal*100).toFixed(2)} cm`,
            `φMn_bal= ${r.ptBal?.phiMn.toFixed(1)} kN·m`,
            `φPn_bal= ${r.ptBal?.phiPn.toFixed(1)} kN`,
            ``,
            `── Punto flexión pura ───────────────`,
            `φMn₀   = ${r.ptFlexPura?.phiMn.toFixed(1) || '—'} kN·m`,
            ``,
            `── Verificación demanda ────────────`,
            `(Mu, Nu) = (${DI.Mu}, ${DI.Nu}) kN·m, kN`,
            r.verif.mensaje,
            `DCR    = ${r.verif.DCR.toFixed(4)}`,
        ].join('\n');
    },
};
