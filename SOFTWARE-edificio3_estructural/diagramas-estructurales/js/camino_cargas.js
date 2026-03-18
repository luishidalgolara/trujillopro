/* ============================================================
   IngeLAB 3D — Diagramas Estructurales
   camino_cargas.js  |  v1.0

   Motor del Diagrama de Camino de Cargas (Load Path)
   
   Muestra y calcula el flujo de cargas verticales a través
   de los elementos estructurales:
   
   LOSA → VIGA SECUNDARIA → VIGA PRINCIPAL → PILAR/MURO → FUNDACIÓN
   
   Incluye:
     · Cálculo de áreas tributarias por elemento
     · Distribución de cargas: unidireccional vs bidireccional
     · Cargas gravitacionales: D + L (NCh 1537)
     · Sobrecarga de uso por tipo de ocupación (NCh 1537 Tabla 1)
     · Peso propio de losa (espesor × γ_HA)
     · Acumulación de cargas piso a piso
     · Carga por piso → columna → base
     · Distribución en vigas: carga trapezoidal y triangular
     · Reacción de viga → carga puntual en pilar
     · Pilar → Fundación → suelo
     · Capacidad portante del suelo σ_suelo [kPa]
     · Verificación: σ_actuante ≤ σ_adm
   
   Geometría:
     · Planta rectangular (Lx × Ly)
     · Grilla de pilares nx × ny
     · Altura de piso h_piso
     · Número de pisos n_pisos
   
   Normativa:
     · NCh 1537 — Cargas de diseño
     · NCh 433 — Sísmica
     · NCh 2123 — Cimentaciones superficiales
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   ESTADO GLOBAL
   ══════════════════════════════════════════════════════════ */
const CC = {
    // Geometría de planta
    Lx:       6.0,     // Luz entre pilares dirección X [m]
    Ly:       6.0,     // Luz entre pilares dirección Y [m]
    nx:       3,       // Número de vanos en X
    ny:       3,       // Número de vanos en Y

    // Pisos
    n_pisos:  5,
    h_piso:   3.0,     // Altura de piso [m]

    // Losa
    e_losa:   0.15,    // Espesor de losa [m]
    tipo_losa:'bid',   // 'uni' | 'bid'  (unidireccional o bidireccional)

    // Cargas
    q_D_pp:   null,    // Peso propio losa — calculado
    q_D_adic: 2.0,     // Carga muerta adicional (piso terminado, tabiques) [kN/m²]
    q_L:      3.0,     // Carga viva uso [kN/m²]
    q_snow:   0.0,     // Nieve [kN/m²]

    // Ocupación (para NCh 1537)
    ocupacion: 'viv',  // 'viv' | 'ofic' | 'com' | 'ind' | 'cub'

    // Materiales
    gamma_HA:  25.0,   // kN/m³
    gamma_ac:  78.5,

    // Sección de pilar
    b_pilar:   0.40,   // m
    h_pilar:   0.40,   // m
    fc_pilar:  25.0,   // MPa
    rho_pilar: 0.02,   // ρ = Ast/Ag

    // Viga
    b_viga:    0.30,
    h_viga:    0.55,

    // Cimentación
    tipo_fund: 'zapata', // 'zapata' | 'pilotes' | 'losa'
    B_zap:     1.8,      // Dimensión zapata [m]
    L_zap:     1.8,
    e_zap:     0.50,     // Espesor zapata [m]
    sigma_adm: 200,      // Capacidad portante admisible [kPa]
    Df:        1.50,     // Profundidad de desplante [m]

    result: null,
};

/* Sobrecargas de uso — NCh 1537 Tabla 1 [kN/m²] */
const SOBRECARGAS = {
    viv:  { q: 2.0,  desc: 'Vivienda (dormitorios)' },
    viv2: { q: 3.0,  desc: 'Vivienda (salas de estar)' },
    ofic: { q: 2.5,  desc: 'Oficinas' },
    com:  { q: 5.0,  desc: 'Comercio / Tiendas' },
    ind:  { q: 7.5,  desc: 'Industrial ligero' },
    cub:  { q: 1.0,  desc: 'Cubierta no transitable' },
    bib:  { q: 7.5,  desc: 'Biblioteca / Archivos' },
    estac:{ q: 2.5,  desc: 'Estacionamiento' },
};

/* ══════════════════════════════════════════════════════════
   CÁLCULO DE ÁREAS TRIBUTARIAS
   ══════════════════════════════════════════════════════════ */

/**
 * Área tributaria de un pilar interior, borde o esquina
 * Para grilla regular Lx × Ly
 */
function areaTributaria(ix, iy, nx, ny, Lx, Ly) {
    const fx = (ix === 0 || ix === nx) ? 0.5 : 1.0;
    const fy = (iy === 0 || iy === ny) ? 0.5 : 1.0;
    return fx * Lx * fy * Ly;
}

/**
 * Tipo de pilar según posición en grilla
 */
function tipoPilar(ix, iy, nx, ny) {
    const borde_x = ix === 0 || ix === nx;
    const borde_y = iy === 0 || iy === ny;
    if (borde_x && borde_y) return 'esquina';
    if (borde_x || borde_y) return 'borde';
    return 'interior';
}

/* ══════════════════════════════════════════════════════════
   DISTRIBUCIÓN DE CARGAS EN LOSA
   ══════════════════════════════════════════════════════════ */

/**
 * Carga distribuida sobre viga según tipo de losa y relación λ = Lx/Ly
 * Losa bidireccional: distribución trapezoidal/triangular (método de las bisectrices)
 * Losa unidireccional: carga uniforme q·Ly/2 en vigas cortas
 */
function calcCargaViga(q_total, Lx, Ly, tipo_losa, direccion) {
    if (tipo_losa === 'uni') {
        // Viga en dirección de carga (corta)
        if (direccion === 'corta') return { tipo: 'dist', q: q_total * Lx / 2 };
        else return { tipo: 'dist', q: 0 };
    }

    // Losa bidireccional
    const lambda = Lx / Ly;  // λ = relación de lados

    if (lambda >= 2) {
        // Comporta como unidireccional
        if (direccion === 'corta') return { tipo: 'dist', q: q_total * Lx / 2 };
        else return { tipo: 'dist', q: 0 };
    }

    // Distribución trapezoidal (viga larga) y triangular (viga corta)
    if (direccion === 'larga') {
        // Carga trapezoidal: máx en centro = q·Lx/2·(1 - 1/(3λ²))
        const q_max = q_total * Lx / 2 * (1 - 1 / (3 * lambda * lambda));
        const a_trap = Ly / 2 * (1 - 1 / (lambda)); // ancho de la zona uniforme
        return {
            tipo: 'trapecial',
            q_uni:  q_total * Lx / 2,
            q_max,
            a_trap: Math.max(0, a_trap),
            q_resultante: q_total * Lx * Ly / (2 * Ly),
        };
    } else {
        // Carga triangular: máx en centro = q·Ly/2
        const q_max = q_total * Ly / 2;
        return {
            tipo: 'triangular',
            q_max,
            q_resultante: q_max / 2,
        };
    }
}

/* ══════════════════════════════════════════════════════════
   ACUMULACIÓN DE CARGAS POR PISO
   ══════════════════════════════════════════════════════════ */

/**
 * Calcula la carga axial acumulada en el pilar (i,j) a nivel de piso k
 * Incluye peso propio del pilar y vigas
 */
function calcCargaPilar(ix, iy, nx, ny, Lx, Ly, n_pisos, k_piso, cargas, params) {
    const { b_pilar, h_pilar, gamma_HA, b_viga, h_viga, h_piso } = params;
    const At = areaTributaria(ix, iy, nx, ny, Lx, Ly);
    const tipo = tipoPilar(ix, iy, nx, ny);

    let N_acum = 0;

    // Suma desde el último piso hasta el piso k
    for (let p = n_pisos; p >= k_piso; p--) {

        // Carga de losa (D + L) sobre área tributaria
        const q_total = cargas.q_D + cargas.q_L;
        N_acum += q_total * At;

        // Peso propio del pilar en este piso
        const W_pilar = gamma_HA * b_pilar * h_pilar * h_piso;
        N_acum += W_pilar;

        // Peso propio de vigas tributarias (mitad de cada viga adyacente)
        const n_vigas = tipo === 'interior' ? 4 : tipo === 'borde' ? 3 : 2;
        const L_viga_prom = (Lx + Ly) / 2;
        const W_viga = gamma_HA * b_viga * (h_viga - 0.15) * (L_viga_prom / 2) * (n_vigas / 2);
        N_acum += W_viga;
    }

    return N_acum;
}

/**
 * Genera la tabla completa de cargas por piso → pilar → fundación
 */
function calcTablaCargas(params) {
    const { Lx, Ly, nx, ny, n_pisos, h_piso, e_losa, q_D_adic, q_L,
            gamma_HA, b_pilar, h_pilar, b_viga, h_viga, tipo_losa } = params;

    // Peso propio de losa
    const q_D_pp = gamma_HA * e_losa;      // kN/m²
    const q_D    = q_D_pp + q_D_adic;      // Total carga muerta

    // Cargas por m² (para combinación de diseño)
    const q_comb = 1.2 * q_D + 1.6 * q_L; // NCh 1537 comb. dominante

    // Pisos: calcular acumulación
    const pisos = [];
    for (let p = n_pisos; p >= 1; p--) {
        const piso = {
            numero: p,
            h_acum: (n_pisos - p + 1) * h_piso,
            q_D, q_L, q_comb,
            At_int: areaTributaria(1, 1, nx, ny, Lx, Ly),
            At_bor: areaTributaria(0, 1, nx, ny, Lx, Ly),
            At_esq: areaTributaria(0, 0, nx, ny, Lx, Ly),
        };
        piso.N_int_acum = 0;
        piso.N_bor_acum = 0;
        piso.N_esq_acum = 0;

        // Acumulación desde cima hasta este piso
        for (let k = n_pisos; k >= p; k--) {
            const ppPilar = gamma_HA * b_pilar * h_pilar * h_piso;
            const ppViga_int = gamma_HA * b_viga * (h_viga - e_losa) * (Lx + Ly) / 2 * 2;  // 2 medias vigas ≈ 1 viga
            const ppViga_bor = ppViga_int * 0.75;
            const ppViga_esq = ppViga_int * 0.5;

            piso.N_int_acum += q_comb * piso.At_int + ppPilar + ppViga_int;
            piso.N_bor_acum += q_comb * piso.At_bor + ppPilar + ppViga_bor;
            piso.N_esq_acum += q_comb * piso.At_esq + ppPilar + ppViga_esq;
        }

        pisos.push(piso);
    }

    return { pisos, q_D, q_L, q_D_pp, q_comb };
}

/* ══════════════════════════════════════════════════════════
   VERIFICACIÓN DE FUNDACIÓN
   ══════════════════════════════════════════════════════════ */

/**
 * Verifica zapata aislada bajo pilar interior
 * σ_neta = N / A_zap  ≤  σ_adm
 */
function verificarFundacion(N_kN, params) {
    const { B_zap, L_zap, e_zap, sigma_adm, Df, gamma_HA } = params;
    const A_zap  = B_zap * L_zap;                         // m²
    const W_zap  = gamma_HA * A_zap * e_zap;              // kN
    const W_relleno = 18.0 * A_zap * (Df - e_zap);       // kN (γ_suelo ≈ 18 kN/m³)
    const sigma_neta = (N_kN + W_zap + W_relleno) / A_zap;  // kPa

    return {
        A_zap,
        sigma_neta,
        sigma_adm,
        ok: sigma_neta <= sigma_adm,
        DCR: sigma_neta / sigma_adm,
        W_zap,
        mensaje: sigma_neta <= sigma_adm
            ? `✅ OK  σ = ${sigma_neta.toFixed(1)} kPa ≤ ${sigma_adm} kPa`
            : `❌ EXCEDE  σ = ${sigma_neta.toFixed(1)} kPa > ${sigma_adm} kPa`,
    };
}

/* ══════════════════════════════════════════════════════════
   FUNCIÓN PRINCIPAL
   ══════════════════════════════════════════════════════════ */
function calcularCC() {
    CC.q_D_pp = CC.gamma_HA * CC.e_losa;

    const tabla = calcTablaCargas(CC);

    // Pilar interior base (piso 1): mayor carga
    const N_int_base = tabla.pisos[tabla.pisos.length - 1].N_int_acum;
    const N_bor_base = tabla.pisos[tabla.pisos.length - 1].N_bor_acum;
    const N_esq_base = tabla.pisos[tabla.pisos.length - 1].N_esq_acum;

    // Verificación fundación
    const verif_fund = verificarFundacion(N_int_base, CC);

    // Verificación pilar: σ = N/(b×h)  vs φ·Pn
    const Ag_pilar = CC.b_pilar * CC.h_pilar;
    const Ast_pilar = CC.rho_pilar * Ag_pilar;
    const phi_c = 0.65;
    const phi_Pn = phi_c * 0.80 * (0.85 * CC.fc_pilar * 1000 * (Ag_pilar - Ast_pilar) +
                   CC.fy_pilar * 1000 * Ast_pilar);  // kN — fy_pilar
    // Usar fy=420 si no definido
    const fy_uso = CC.fy_pilar || 420;
    const phiPn = phi_c * 0.80 * (0.85 * CC.fc_pilar * 1000 * (Ag_pilar - Ast_pilar) + fy_uso * 1000 * Ast_pilar);
    const verif_pilar = {
        N: N_int_base,
        phiPn,
        ok: N_int_base <= phiPn,
        DCR: N_int_base / phiPn,
    };

    // Distribución de carga en viga
    const q_total = tabla.q_D + CC.q_L;
    const carga_viga_larga  = calcCargaViga(q_total, CC.Lx, CC.Ly, CC.tipo_losa, 'larga');
    const carga_viga_corta  = calcCargaViga(q_total, CC.Lx, CC.Ly, CC.tipo_losa, 'corta');

    CC.result = {
        tabla,
        N_int_base, N_bor_base, N_esq_base,
        verif_fund,
        verif_pilar,
        carga_viga_larga,
        carga_viga_corta,
        q_D: tabla.q_D,
        q_L: tabla.q_L,
        q_comb: tabla.q_comb,
        q_D_pp: tabla.q_D_pp,
    };

    return CC.result;
}

/* ══════════════════════════════════════════════════════════
   RENDERING — Vista del camino de cargas
   ══════════════════════════════════════════════════════════ */

const COLORES_CC = {
    losa:      '#00e5ff',
    viga:      '#0077ff',
    pilar:     '#ff8c00',
    fund:      '#00ff9d',
    suelo:     'rgba(120,100,60,0.5)',
    carga:     '#ff4757',
    flecha:    'rgba(255,255,255,0.6)',
    ok:        '#00ff9d',
    fail:      '#ff4757',
    grid:      'rgba(255,255,255,0.05)',
    text:      'rgba(255,255,255,0.7)',
    textDim:   'rgba(255,255,255,0.3)',
};

/**
 * Dibuja la vista en corte del camino de cargas (vertical)
 */
function drawCaminoCargas(canvas, result, opts = {}) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const n = CC.n_pisos;
    const pad = { top: 30, right: 40, bottom: 60, left: 50 };
    const cw  = W - pad.left - pad.right;
    const ch  = H - pad.top  - pad.bottom;

    const h_piso_px = ch / (n + 1.5);  // altura de piso en px
    const pilar_w   = Math.min(30, cw * 0.06);
    const cx_pilar  = pad.left + cw * 0.5;

    // Suelo
    const y_suelo = pad.top + ch;
    drawSuelo(ctx, pad.left, y_suelo, cw);

    // Fundación
    const fund_h = h_piso_px * 0.5;
    const fund_w = Math.min(90, cw * 0.18);
    drawFundacion(ctx, cx_pilar, y_suelo - fund_h, fund_w, fund_h, result.verif_fund);

    // Pilar (todos los pisos)
    for (let p = 0; p < n; p++) {
        const y_base = y_suelo - fund_h - (p + 1) * h_piso_px;
        const y_top  = y_base - h_piso_px;

        // Pilar
        ctx.fillStyle = 'rgba(255,140,0,0.2)';
        ctx.strokeStyle = COLORES_CC.pilar; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.rect(cx_pilar - pilar_w / 2, y_top, pilar_w, h_piso_px); ctx.fill(); ctx.stroke();

        // Losa / entrepiso
        drawLosa(ctx, pad.left + cw * 0.1, y_top, cw * 0.8, 8);

        // Viga
        drawViga(ctx, pad.left + cw * 0.1, y_top, cw * 0.8, 16, p);

        // Carga sobre losa
        const N_piso = result.N_int_base / CC.n_pisos;
        drawCargasLosa(ctx, pad.left + cw * 0.1, y_top - 28, cw * 0.8, result.q_comb, p);

        // Label piso
        ctx.fillStyle = COLORES_CC.textDim; ctx.font = '10px Space Mono, monospace'; ctx.textAlign = 'right';
        ctx.fillText(`P${n - p}`, pad.left - 4, y_top + h_piso_px / 2 + 3);

        // Flecha de fuerza axial en pilar
        drawFlechaAxialPilar(ctx, cx_pilar + pilar_w / 2 + 8, y_top + h_piso_px / 2,
            result.tabla.pisos[p].N_int_acum);
    }

    // Etiquetas de elementos
    drawEtiquetasElementos(ctx, cx_pilar, pad, cw, ch, pilar_w, fund_w, y_suelo, fund_h, h_piso_px, n);

    // Reacciones en fundación
    drawReaccionSuelo(ctx, cx_pilar, y_suelo, result);

    // Eje
    ctx.fillStyle = COLORES_CC.text; ctx.font = '11px DM Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Camino de Cargas — Corte Longitudinal', W / 2, pad.top - 8);
}

function drawSuelo(ctx, x0, y0, cw) {
    ctx.fillStyle = COLORES_CC.suelo;
    ctx.beginPath(); ctx.rect(x0, y0, cw, 30); ctx.fill();
    // Hatching
    ctx.strokeStyle = 'rgba(120,100,60,0.4)'; ctx.lineWidth = 1;
    for (let x = x0; x <= x0 + cw + 15; x += 14) {
        ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x - 12, y0 + 18); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(120,100,60,0.8)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + cw, y0); ctx.stroke();
}

function drawFundacion(ctx, cx, y0, fw, fh, verif) {
    const color = verif.ok ? COLORES_CC.fund : COLORES_CC.fail;
    ctx.fillStyle = verif.ok ? 'rgba(0,255,157,0.15)' : 'rgba(255,71,87,0.15)';
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.rect(cx - fw / 2, y0, fw, fh); ctx.fill(); ctx.stroke();
    // Hatching diag
    ctx.strokeStyle = verif.ok ? 'rgba(0,255,157,0.25)' : 'rgba(255,71,87,0.25)'; ctx.lineWidth = 1;
    for (let i = 0; i <= fw; i += 10) {
        ctx.beginPath(); ctx.moveTo(cx - fw / 2 + i, y0); ctx.lineTo(cx - fw / 2 + i - fh, y0 + fh); ctx.stroke();
    }
    // Label σ
    ctx.fillStyle = color; ctx.font = 'bold 9px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(`σ=${verif.sigma_neta.toFixed(0)}kPa`, cx, y0 + fh / 2 + 3);
    ctx.fillText(`(${verif.ok ? 'OK' : 'EXCEDE'})`, cx, y0 + fh / 2 + 14);
}

function drawLosa(ctx, x0, y0, w, h) {
    ctx.fillStyle = 'rgba(0,229,255,0.12)';
    ctx.strokeStyle = COLORES_CC.losa; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.fill(); ctx.stroke();
}

function drawViga(ctx, x0, y0, w, h, piso) {
    const vw = w * 0.85, vx = x0 + (w - vw) / 2;
    ctx.fillStyle = 'rgba(0,119,255,0.15)';
    ctx.strokeStyle = COLORES_CC.viga; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.rect(vx, y0 + 6, vw, h); ctx.fill(); ctx.stroke();
}

function drawCargasLosa(ctx, x0, yTop, w, q_comb, piso) {
    if (piso > 0) return; // Solo dibujar en el primer piso visible para no saturar
    const n = 6;
    ctx.strokeStyle = 'rgba(255,71,87,0.6)'; ctx.fillStyle = 'rgba(255,71,87,0.6)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x0, yTop); ctx.lineTo(x0 + w, yTop); ctx.stroke();
    for (let i = 0; i <= n; i++) {
        const x = x0 + (i / n) * w;
        ctx.beginPath(); ctx.moveTo(x, yTop + 4); ctx.lineTo(x, yTop + 26); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 3, yTop + 20); ctx.lineTo(x, yTop + 27); ctx.lineTo(x + 3, yTop + 20); ctx.stroke();
    }
    ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(`q = ${q_comb.toFixed(1)} kN/m² (1.2D+1.6L)`, x0 + w / 2, yTop - 4);
}

function drawFlechaAxialPilar(ctx, x, y, N) {
    ctx.strokeStyle = COLORES_CC.pilar; ctx.fillStyle = COLORES_CC.pilar; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 4, y + 4); ctx.lineTo(x, y + 10); ctx.lineTo(x + 4, y + 4); ctx.stroke();
    ctx.font = 'bold 9px Space Mono, monospace'; ctx.textAlign = 'left';
    ctx.fillText(`${N.toFixed(0)}kN`, x + 6, y + 3);
}

function drawEtiquetasElementos(ctx, cx, pad, cw, ch, pilar_w, fund_w, y_suelo, fund_h, h_piso_px, n) {
    const y_losa  = y_suelo - fund_h - h_piso_px * n;
    const y_pilar = y_suelo - fund_h - h_piso_px * Math.ceil(n / 2);
    const y_fund  = y_suelo - fund_h / 2;

    const labels = [
        { x: pad.left + 8, y: y_losa  + 4,  color: COLORES_CC.losa,  txt: '← LOSA'  },
        { x: pad.left + 8, y: y_pilar,       color: COLORES_CC.viga,  txt: '← VIGA'  },
        { x: pad.left + 8, y: y_pilar + 30,  color: COLORES_CC.pilar, txt: '← PILAR' },
        { x: pad.left + 8, y: y_fund,        color: COLORES_CC.fund,  txt: '← ZAPATA'},
    ];
    labels.forEach(l => {
        ctx.fillStyle = l.color; ctx.font = 'bold 9px Space Mono, monospace'; ctx.textAlign = 'left';
        ctx.fillText(l.txt, l.x, l.y);
    });
}

function drawReaccionSuelo(ctx, cx, y_suelo, result) {
    const ok    = result.verif_fund.ok;
    const color = ok ? COLORES_CC.ok : COLORES_CC.fail;
    const sigma = result.verif_fund.sigma_neta;

    // Flechas hacia arriba (reacción del suelo)
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5;
    [-40, 0, 40].forEach(dx => {
        const x = cx + dx;
        ctx.beginPath(); ctx.moveTo(x, y_suelo + 28); ctx.lineTo(x, y_suelo + 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 4, y_suelo + 10); ctx.lineTo(x, y_suelo + 2); ctx.lineTo(x + 4, y_suelo + 10); ctx.stroke();
    });
    ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(`σ_suelo = ${sigma.toFixed(0)} kPa  ${ok ? '✅' : '❌'}`, cx, y_suelo + 46);
}

/**
 * Dibuja la vista en planta de la planta tipo con áreas tributarias
 */
function drawPlantaTributaria(canvas, result) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { nx, ny, Lx, Ly } = CC;
    const pad  = { top: 28, right: 28, bottom: 28, left: 28 };
    const cw   = W - pad.left - pad.right;
    const ch   = H - pad.top  - pad.bottom;
    const sx   = cw / (nx * Lx);
    const sy   = ch / (ny * Ly);

    // Ejes de vigas
    for (let i = 0; i <= nx; i++) {
        const x = pad.left + i * Lx * sx;
        ctx.strokeStyle = 'rgba(0,119,255,0.5)'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ch); ctx.stroke();
    }
    for (let j = 0; j <= ny; j++) {
        const y = pad.top + j * Ly * sy;
        ctx.strokeStyle = 'rgba(0,119,255,0.5)'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cw, y); ctx.stroke();
    }

    // Áreas tributarias con relleno según tipo de pilar
    for (let i = 0; i <= nx; i++) {
        for (let j = 0; j <= ny; j++) {
            const At = areaTributaria(i, j, nx, ny, Lx, Ly);
            const tipo = tipoPilar(i, j, nx, ny);
            const cx_n = pad.left + i * Lx * sx;
            const cy_n = pad.top  + j * Ly * sy;
            const at_w = (i === 0 || i === nx ? 0.5 : 1.0) * Lx * sx;
            const at_h = (j === 0 || j === ny ? 0.5 : 1.0) * Ly * sy;
            const ax = cx_n - (i === 0 ? 0 : i === nx ? at_w : at_w / 2);
            const ay = cy_n - (j === 0 ? 0 : j === ny ? at_h : at_h / 2);

            const colors = { interior: 'rgba(0,229,255,0.08)', borde: 'rgba(0,119,255,0.08)', esquina: 'rgba(255,140,0,0.08)' };
            ctx.fillStyle = colors[tipo];
            ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
            ctx.beginPath(); ctx.rect(ax, ay, at_w, at_h); ctx.fill(); ctx.stroke();
            ctx.setLineDash([]);

            // Label área
            const mx = ax + at_w / 2, my = ay + at_h / 2;
            ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'center';
            ctx.fillText(`${At.toFixed(1)}m²`, mx, my);

            // Pilar
            const pr = Math.max(4, Math.min(12, (CC.b_pilar + CC.h_pilar) / 2 * sx * 1.5));
            ctx.fillStyle = COLORES_CC.pilar; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.rect(cx_n - pr, cy_n - pr, pr * 2, pr * 2); ctx.fill(); ctx.stroke();
        }
    }

    // Labels Lx, Ly
    ctx.fillStyle = COLORES_CC.textDim; ctx.font = '10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText(`Lx = ${Lx}m`, pad.left + Lx * sx / 2, pad.top - 8);
    ctx.save(); ctx.translate(pad.left - 14, pad.top + Ly * sy / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText(`Ly = ${Ly}m`, 0, 0); ctx.restore();

    // Leyenda
    const leyItems = [
        { color: 'rgba(0,229,255,0.25)',   label: 'Interior' },
        { color: 'rgba(0,119,255,0.25)',   label: 'Borde' },
        { color: 'rgba(255,140,0,0.25)',   label: 'Esquina' },
    ];
    leyItems.forEach((l, i) => {
        const lx = W - 90, ly = 10 + i * 16;
        ctx.fillStyle = l.color; ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.rect(lx, ly, 12, 10); ctx.fill(); ctx.stroke();
        ctx.fillStyle = COLORES_CC.textDim; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'left';
        ctx.fillText(l.label, lx + 16, ly + 8);
    });

    ctx.fillStyle = COLORES_CC.text; ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText('Planta tipo — Áreas tributarias', W / 2, H - 8);
}

/**
 * Dibuja el gráfico de barras de acumulación de carga por piso
 */
function drawAcumulacionPisos(canvas, result) {
    if (!canvas || !result) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const { pisos } = result.tabla;
    const n     = pisos.length;
    const N_max = Math.max(...pisos.map(p => p.N_int_acum), 1);
    const pad   = { top: 30, right: 30, bottom: 40, left: 70 };
    const cw    = W - pad.left - pad.right;
    const ch    = H - pad.top  - pad.bottom;
    const bar_h = ch / (n + 1);
    const scaleN = cw * 0.85 / N_max;

    pisos.forEach((p, i) => {
        const y    = pad.top + i * bar_h + bar_h * 0.1;
        const bh   = bar_h * 0.6;
        const bw_i = p.N_int_acum * scaleN;
        const bw_b = p.N_bor_acum * scaleN;
        const bw_e = p.N_esq_acum * scaleN;

        // Barra interior
        const g = ctx.createLinearGradient(pad.left, 0, pad.left + bw_i, 0);
        g.addColorStop(0, 'rgba(0,229,255,0.6)'); g.addColorStop(1, 'rgba(0,229,255,0.2)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.rect(pad.left, y, bw_i, bh * 0.4); ctx.fill();

        // Barra borde
        const g2 = ctx.createLinearGradient(pad.left, 0, pad.left + bw_b, 0);
        g2.addColorStop(0, 'rgba(0,119,255,0.6)'); g2.addColorStop(1, 'rgba(0,119,255,0.2)');
        ctx.fillStyle = g2;
        ctx.beginPath(); ctx.rect(pad.left, y + bh * 0.42, bw_b, bh * 0.27); ctx.fill();

        // Barra esquina
        const g3 = ctx.createLinearGradient(pad.left, 0, pad.left + bw_e, 0);
        g3.addColorStop(0, 'rgba(255,140,0,0.6)'); g3.addColorStop(1, 'rgba(255,140,0,0.2)');
        ctx.fillStyle = g3;
        ctx.beginPath(); ctx.rect(pad.left, y + bh * 0.72, bw_e, bh * 0.27); ctx.fill();

        // Label piso
        ctx.fillStyle = COLORES_CC.textDim; ctx.font = 'bold 9px Space Mono, monospace'; ctx.textAlign = 'right';
        ctx.fillText(`P${pisos.length - i}`, pad.left - 4, y + bh * 0.4 + 3);

        // Valor
        ctx.fillStyle = 'rgba(0,229,255,0.8)'; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'left';
        ctx.fillText(`${p.N_int_acum.toFixed(0)}kN`, pad.left + bw_i + 4, y + bh * 0.3 + 3);
    });

    // Eje
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad.left, pad.top); ctx.lineTo(pad.left, pad.top + ch); ctx.stroke();

    // Ticks N
    ctx.fillStyle = COLORES_CC.textDim; ctx.font = '9px Space Mono, monospace'; ctx.textAlign = 'center';
    [0.25, 0.5, 0.75, 1.0].forEach(f => {
        const x = pad.left + f * N_max * scaleN;
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ch); ctx.stroke();
        ctx.fillText(`${(f * N_max).toFixed(0)}`, x, pad.top + ch + 14);
    });

    ctx.fillStyle = COLORES_CC.text; ctx.font = 'bold 10px Space Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillText('Acumulación de carga axial N [kN] por piso', W / 2, pad.top - 10);

    // Leyenda
    ctx.fillStyle = 'rgba(0,229,255,0.6)'; ctx.font = '8px Space Mono, monospace'; ctx.textAlign = 'left';
    ctx.fillText('■ Interior', W - 120, pad.top + 12);
    ctx.fillStyle = 'rgba(0,119,255,0.6)';
    ctx.fillText('■ Borde', W - 120, pad.top + 22);
    ctx.fillStyle = 'rgba(255,140,0,0.6)';
    ctx.fillText('■ Esquina', W - 120, pad.top + 32);
}

/* ══════════════════════════════════════════════════════════
   API PÚBLICA
   ══════════════════════════════════════════════════════════ */
window.CC_MODULE = {
    state: CC,
    calcular: calcularCC,
    draw: drawCaminoCargas,
    drawPlanta: drawPlantaTributaria,
    drawAcumulacion: drawAcumulacionPisos,
    SOBRECARGAS,
    areaTributaria,
    tipoPilar,
    verificarFundacion,

    setParam(key, value) { CC[key] = value; },

    formatResult(result) {
        if (!result) return '';
        const r = result;
        return [
            `── Cargas por m² ───────────────────`,
            `q_pp  = ${r.q_D_pp.toFixed(2)} kN/m²  (peso propio losa)`,
            `q_D   = ${r.q_D.toFixed(2)} kN/m²  (total muerta)`,
            `q_L   = ${r.q_L.toFixed(2)} kN/m²  (viva)`,
            `q_u   = ${r.q_comb.toFixed(2)} kN/m²  (1.2D+1.6L)`,
            ``,
            `── Carga en pilar base ─────────────`,
            `N_int = ${r.N_int_base.toFixed(1)} kN  (interior)`,
            `N_bor = ${r.N_bor_base.toFixed(1)} kN  (borde)`,
            `N_esq = ${r.N_esq_base.toFixed(1)} kN  (esquina)`,
            ``,
            `── Fundación (zapata ${CC.B_zap}×${CC.L_zap}m) ──`,
            r.verif_fund.mensaje,
            `A_zap = ${r.verif_fund.A_zap.toFixed(2)} m²`,
            `σ     = ${r.verif_fund.sigma_neta.toFixed(1)} kPa`,
            `σ_adm = ${CC.sigma_adm} kPa`,
            `DCR   = ${r.verif_fund.DCR.toFixed(3)}`,
            ``,
            `── Pilar ${(CC.b_pilar*100).toFixed(0)}×${(CC.h_pilar*100).toFixed(0)} cm ──────────────`,
            `φPn   = ${r.verif_pilar.phiPn.toFixed(0)} kN`,
            `N_u   = ${r.verif_pilar.N.toFixed(0)} kN`,
            `DCR   = ${r.verif_pilar.DCR.toFixed(3)}  ${r.verif_pilar.ok ? '✅' : '❌'}`,
        ].join('\n');
    },
};
