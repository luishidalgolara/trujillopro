/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   INFORME DD — Diagrama de Deformaciones                        ║
 * ║   IngeLAB 3D · informe_deformacion.js                           ║
 * ║   Se actualiza automaticamente con cada calculo                 ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en deformacion.html:
 *   <script src="../js/informe/informe_deformacion.js"></script>
 */

(function () {
  'use strict';

  function cargarJsPDF(cb) {
    if (window.jspdf) { cb(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  const informe = { listo: false, datos: null };

  /* ═══════════════════════════════════════════
     LEER DATOS
  ═══════════════════════════════════════════ */
  function leerDatos() {
    const g  = id => { const el = document.getElementById(id); return el ? el.textContent.trim() : '—'; };
    const v  = id => { const el = document.getElementById(id); return el ? el.value : '—'; };
    const gs = id => { const el = document.getElementById(id); return el ? (el.options[el.selectedIndex]?.text || el.value) : '—'; };

    const sec = v('inp_sec');
    const secNombre = sec === 'rect' ? 'Rectangular H.A.' : sec === 'T' ? 'T-Beam H.A.' : sec === 'IPE' ? 'Perfil IPE' : 'Perfil HEA';

    return {
      fecha:    new Date().toLocaleDateString('es-CL', { year:'numeric', month:'long', day:'numeric' }),
      hora:     new Date().toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' }),
      // Inputs
      tipo:     v('inp_tipo') === 'simple' ? 'Simplemente apoyada' : 'Voladizo',
      L:        v('inp_L') + ' m',
      seccion:  secNombre,
      b:        v('inp_b') + ' m',
      h:        v('inp_h') + ' m',
      fc:       v('inp_fc') + ' MPa',
      perfil:   v('inp_ipe') || v('inp_hea') || '—',
      norma:    gs('inp_norma'),
      uso:      gs('inp_uso'),
      // Resultados
      EI:       g('rEI'),
      I:        g('rI'),
      E:        g('rE'),
      delta:    g('rD'),
      xDelta:   g('rXD'),
      LD:       g('rLD'),
      thetaA:   g('rTA'),
      thetaB:   g('rTB'),
      rhoMin:   g('rRho'),
      formula:  g('aFormula'),
      aVal:     g('aVal'),
      vLblL:    g('vLblL'),
      vResL:    g('vResL'),
      vLblDL:   g('vLblDL'),
      vResDL:   g('vResDL'),
      DCRL:     g('rDCRL'),
      DCRDL:    g('rDCRDL'),
      verifTitulo: g('verifTitle'),
      verifSub:    g('verifSub'),
      cumple: document.getElementById('verifBox')?.classList.contains('ok') ?? false,
    };
  }

  function capturarCanvas(id) {
    const c = document.getElementById(id);
    if (!c) return null;
    try { return c.toDataURL('image/png'); } catch { return null; }
  }

  /* ═══════════════════════════════════════════
     COLORES — tema morado/cyan del DD
  ═══════════════════════════════════════════ */
  const C = {
    bg:     [8,  12, 16],
    bg2:    [13, 17, 23],
    card:   [15, 21, 32],
    accent: [192,132,252],  // morado --accent:#c084fc
    accentL:[0, 229, 255],  // cyan  --accent2:#00e5ff
    green:  [0, 255, 157],
    red:    [255, 71, 87],
    text:   [232,237,245],
    text2:  [139,149,168],
    text3:  [61, 71, 88],
    white:  [255,255,255],
    border: [30, 38, 50],
  };

  /* ═══════════════════════════════════════════
     GENERAR PDF
  ═══════════════════════════════════════════ */
  function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const d = informe.datos;
    const PW = 210, PH = 297, M = 15, CW = PW - M * 2;
    let y = 0;

    const rgb  = col => doc.setTextColor(...col);
    const fill = col => doc.setFillColor(...col);
    const rect = (x, ry, w, h, r = 0) => doc.roundedRect(x, ry, w, h, r, r, 'F');

    /* ══════════════════════════════
       PÁGINA 1
    ══════════════════════════════ */
    fill(C.bg);  rect(0, 0, PW, PH);
    fill(C.bg2); rect(0, 0, PW, 44);
    fill(C.accent); rect(0, 0, 4, 44);

    // Logo + badge
    doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
    rgb(C.accent);
    doc.text('INGELAB 3D', M + 2, 10);
    fill(C.card);
    doc.setDrawColor(...C.accent);
    doc.roundedRect(M + 2, 13, 13, 6, 1.5, 1.5, 'FD');
    doc.setFontSize(6.5); rgb(C.accent);
    doc.text('DD', M + 8.5, 17.5, { align: 'center' });

    // Título
    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    rgb(C.white);
    doc.text('DIAGRAMA DE DEFORMACIONES', M + 19, 22);

    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text('Informe tecnico de deformaciones  |  NCh 430  |  AISC 360  |  EC2', M + 19, 29);

    doc.setFontSize(7.5); rgb(C.text3);
    doc.text(`Generado: ${d.fecha}  |  ${d.hora}`, M + 19, 36);

    fill(C.accent);  rect(M, 41, CW * 0.35, 1.5, 1);
    fill(C.accentL); rect(M + CW * 0.35, 41, CW * 0.12, 1.5, 1);

    // Badge cumple
    const badgeW = 36, badgeX = PW - M - badgeW;
    fill(d.cumple ? [0,35,20] : [38,8,12]);
    doc.setDrawColor(...(d.cumple ? C.green : C.red));
    doc.roundedRect(badgeX, 8, badgeW, 16, 2, 2, 'FD');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.green : C.red);
    doc.text(d.cumple ? 'ADMISIBLE' : 'EXCEDE', badgeX + badgeW / 2, 15, { align: 'center' });
    doc.setFontSize(7); doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text(`DCR = ${d.DCRDL}`, badgeX + badgeW / 2, 21, { align: 'center' });

    y = 50;

    /* ── helpers ── */
    function secTitulo(titulo, color = C.accentL) {
      fill(C.card); rect(M, y, CW, 8, 2);
      fill(color);  rect(M, y, 3, 8, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      rgb(color);
      doc.text(titulo.toUpperCase(), M + 7, y + 5.5);
      y += 12;
    }

    function fila(label, valor, col1 = 85, destacado = false) {
      fill(C.bg2);
      doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, CW, 7, 1, 1, 'FD');
      doc.setFontSize(8); doc.setFont('helvetica', 'normal');
      rgb(C.text2); doc.text(label, M + 4, y + 5);
      doc.setFont('helvetica', destacado ? 'bold' : 'normal');
      rgb(destacado ? C.accent : C.text);
      doc.text(String(valor), M + col1, y + 5);
      y += 8;
    }

    function filaDos(l1, v1, l2, v2) {
      const hw = CW / 2 - 2;
      fill(C.bg2);
      doc.setDrawColor(...C.border);
      doc.roundedRect(M,          y, hw, 7, 1, 1, 'FD');
      doc.roundedRect(M + hw + 4, y, hw, 7, 1, 1, 'FD');
      doc.setFontSize(8); doc.setFont('helvetica', 'normal');
      rgb(C.text2); doc.text(l1, M + 4, y + 5);
      rgb(C.text);  doc.text(String(v1), M + 44, y + 5);
      rgb(C.text2); doc.text(l2, M + hw + 8, y + 5);
      rgb(C.text);  doc.text(String(v2), M + hw + 48, y + 5);
      y += 8;
    }

    /* DATOS DE ENTRADA */
    secTitulo('Datos de entrada', C.accentL);
    filaDos('Tipo de viga', d.tipo, 'Longitud L', d.L);
    filaDos('Tipo de seccion', d.seccion, d.seccion.includes('IPE') || d.seccion.includes('HEA') ? 'Perfil' : "f'c", d.seccion.includes('IPE') || d.seccion.includes('HEA') ? d.perfil : d.fc);
    if (!d.seccion.includes('IPE') && !d.seccion.includes('HEA')) {
      filaDos('Ancho b', d.b, 'Alto h', d.h);
    }
    filaDos('Normativa', d.norma, 'Tipo de uso', d.uso);
    y += 4;

    /* RIGIDEZ */
    secTitulo('Rigidez a flexion EI', C.accent);
    fila('Rigidez EI', d.EI, 85, true);
    filaDos('Momento de inercia I', d.I, 'Modulo elasticidad E', d.E);
    y += 4;

    /* DEFORMACIONES */
    secTitulo('Deformaciones', C.accent);
    fila('Flecha maxima delta_max', d.delta, 85, true);
    filaDos('Posicion @ delta_max', d.xDelta, 'Relacion L/delta', d.LD);
    filaDos('Giro theta_A (apoyo A)', d.thetaA, 'Giro theta_B (apoyo B)', d.thetaB);
    fila('Radio de curvatura minimo rho_min', d.rhoMin);
    y += 4;

    /* FORMULA ANALITICA */
    secTitulo('Formula analitica equivalente', C.accentL);
    fila('Expresion', d.formula);
    fila('Resultado', d.aVal, 85, true);
    y += 4;

    /* VERIFICACION */
    secTitulo('Verificacion de flecha', C.accent);
    fila(d.vLblL  || 'Carga variable (L)', d.vResL,  85);
    fila(d.vLblDL || 'Carga total D+L',    d.vResDL, 85);
    filaDos('DCR carga variable', d.DCRL, 'DCR carga total D+L', d.DCRDL);
    y += 4;

    /* BOX FINAL */
    fill(d.cumple ? [0,35,22] : [38,8,12]);
    doc.setDrawColor(...(d.cumple ? C.green : C.red));
    doc.roundedRect(M, y, CW, 18, 3, 3, 'FD');
    doc.setFontSize(12); doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.green : C.red);
    doc.text(d.verifTitulo, M + CW / 2, y + 8, { align: 'center' });
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text(d.verifSub, M + CW / 2, y + 14, { align: 'center' });
    y += 24;

    /* NORMATIVA chips */
    doc.setFontSize(7.5); rgb(C.text3);
    let nx = M;
    ['NCh 430:2008','AISC 360-22','Eurocod. 2','ACI 318-19'].forEach(n => {
      fill(C.card);
      doc.setDrawColor(...C.border);
      const tw = doc.getTextWidth(n) + 6;
      doc.roundedRect(nx, y, tw, 6, 1, 1, 'FD');
      rgb(C.text3); doc.text(n, nx + 3, y + 4.3);
      nx += tw + 3;
    });

    /* ══════════════════════════════
       PÁGINA 2 — DIAGRAMAS
    ══════════════════════════════ */
    doc.addPage();
    fill(C.bg);  rect(0, 0, PW, PH);
    fill(C.bg2); rect(0, 0, PW, 20);
    fill(C.accent); rect(0, 0, 4, 20);

    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(C.accent); doc.text('INGELAB 3D', M + 2, 8);
    doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text('Diagrama de Deformaciones  |  Linea elastica y(x), Curvatura y Giro', M + 2, 15);

    y = 28;

    /* Canvas principal — Deformada */
    const imgMain = capturarCanvas('cMain');
    if (imgMain) {
      fill(C.card); rect(M, y, CW, 7, 2);
      fill(C.accent); rect(M, y, 3, 7, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      rgb(C.accentL);
      doc.text('LINEA ELASTICA y(x) — DEFORMADA AMPLIFICADA', M + 7, y + 5);
      y += 10;

      const canvas = document.getElementById('cMain');
      const ratio  = canvas.width / canvas.height;
      const imgW   = CW;
      const imgH   = imgW / ratio;
      fill(C.bg2);
      doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, imgW, imgH, 3, 3, 'FD');
      doc.addImage(imgMain, 'PNG', M, y, imgW, imgH);
      y += imgH + 8;
    }

    /* Canvas curvatura + giro en paralelo */
    const imgCurv = capturarCanvas('cCurv');
    const imgGiro = capturarCanvas('cGiro');
    const halfW   = (CW - 6) / 2;

    if (imgCurv || imgGiro) {
      if (imgCurv) {
        fill(C.card); rect(M, y, halfW, 7, 2);
        fill(C.accent); rect(M, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold');
        rgb(C.accent);
        doc.text('CURVATURA kappa(x) = M/EI', M + 7, y + 5);
      }
      if (imgGiro) {
        fill(C.card); rect(M + halfW + 6, y, halfW, 7, 2);
        fill(C.accentL); rect(M + halfW + 6, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold');
        rgb(C.accentL);
        doc.text('GIRO theta(x) = dy/dx', M + halfW + 13, y + 5);
      }
      y += 10;

      const subH = 42;
      if (imgCurv) {
        fill(C.bg2); doc.setDrawColor(...C.border);
        doc.roundedRect(M, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgCurv, 'PNG', M, y, halfW, subH);
      }
      if (imgGiro) {
        fill(C.bg2); doc.setDrawColor(...C.border);
        doc.roundedRect(M + halfW + 6, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgGiro, 'PNG', M + halfW + 6, y, halfW, subH);
      }
      y += subH + 8;
    }

    /* Box formulas */
    const fH = 40;
    fill(C.card); doc.setDrawColor(...C.border);
    doc.roundedRect(M, y, CW, fH, 3, 3, 'FD');
    fill(C.accent); rect(M, y, 3, fH, 1);

    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    rgb(C.accent);
    doc.text('EULER-BERNOULLI — FORMULAS FUNDAMENTALES', M + 7, y + 7);

    const fmls = [
      { f: 'EI*y\'\'(x) = M(x)',          d: 'Ecuacion diferencial de la viga' },
      { f: 'delta_q = 5qL^4 / 384EI',     d: 'Flecha max. S.A. + q uniforme (centro)' },
      { f: 'delta_P = PL^3 / 48EI',       d: 'Flecha max. S.A. + P central' },
      { f: 'delta_vol = qL^4 / 8EI',      d: 'Flecha max. voladizo + q uniforme' },
      { f: 'theta = integral(M/EI dx)',    d: 'Giro = integral de la curvatura' },
    ];

    let fy3 = y + 13;
    const fBoxW = 60;
    fmls.forEach(item => {
      fill([20,28,42]);
      doc.setDrawColor(40, 20, 60);
      doc.roundedRect(M + 5, fy3, fBoxW, 5.5, 1, 1, 'FD');
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold');
      rgb(C.accent);
      doc.text(item.f, M + 5 + fBoxW / 2, fy3 + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
      rgb(C.text2);
      doc.text(item.d, M + 5 + fBoxW + 4, fy3 + 4);
      fy3 += 6.5;
    });

    /* Footer */
    [1, 2].forEach(pg => {
      doc.setPage(pg);
      fill(C.bg2); rect(0, PH - 12, PW, 12);
      fill(C.accent); rect(0, PH - 12, 4, 12);
      doc.setFontSize(7); doc.setFont('helvetica', 'normal');
      rgb(C.text3);
      doc.text('IngeLAB 3D · Software educativo de ingenieria estructural', M, PH - 5);
      doc.text(`Pagina ${pg} de 2`, PW - M, PH - 5, { align: 'right' });
      doc.text('Nota: Herramienta educativa. Para proyectos reales consultar con Ingeniero Civil Estructural.', M + CW / 2, PH - 5, { align: 'center' });
    });

    const fecha = new Date().toISOString().slice(0, 10);
    doc.save(`InformeDD_IngeLAB_${fecha}.pdf`);
  }

  /* ═══════════════════════════════════════════
     BOTÓN EN TOPBAR
  ═══════════════════════════════════════════ */
  function injectBoton() {
    const style = document.createElement('style');
    style.textContent = `
      #btn-informe-dd {
        display:flex;align-items:center;gap:7px;
        background:rgba(192,132,252,.08);border:1px solid rgba(192,132,252,.2);
        border-radius:6px;padding:8px 14px;
        color:rgba(192,132,252,.4);font-family:'Space Mono',monospace;
        font-size:11px;cursor:not-allowed;transition:all .25s;letter-spacing:.04em;
      }
      #btn-informe-dd.listo {
        color:#c084fc;border-color:rgba(192,132,252,.45);
        background:rgba(192,132,252,.1);cursor:pointer;
        animation:ddInfPulse 2.5s ease-in-out infinite;
      }
      #btn-informe-dd.listo:hover {
        background:rgba(192,132,252,.2);border-color:#c084fc;
        transform:translateY(-1px);box-shadow:0 4px 16px rgba(192,132,252,.3);
        animation:none;
      }
      #btn-informe-dd.descargando {
        color:#00ff9d;border-color:rgba(0,255,157,.45);
        background:rgba(0,255,157,.1);cursor:default;animation:none;
      }
      @keyframes ddInfPulse{0%,100%{box-shadow:0 0 0 0 rgba(192,132,252,.3);}50%{box-shadow:0 0 0 6px rgba(192,132,252,0);}}
      #btn-informe-dd .dd-idot{width:6px;height:6px;border-radius:50%;background:rgba(192,132,252,.3);flex-shrink:0;transition:background .25s;}
      #btn-informe-dd.listo .dd-idot{background:#c084fc;box-shadow:0 0 6px rgba(192,132,252,.6);animation:ddDotBlink 1.2s infinite;}
      #btn-informe-dd.descargando .dd-idot{background:#00ff9d;animation:none;}
      @keyframes ddDotBlink{0%,100%{opacity:1}50%{opacity:.3}}
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'btn-informe-dd';
    btn.innerHTML = `<span class="dd-idot"></span><span>📄</span><span class="dd-itxt">Descargar Informe</span>`;
    btn.title = 'Calcule primero para generar el informe';
    btn.disabled = true;

    btn.addEventListener('click', () => {
      if (!informe.listo) return;
      btn.classList.remove('listo');
      btn.classList.add('descargando');
      btn.querySelector('.dd-itxt').textContent = 'Generando PDF...';
      btn.disabled = true;

      setTimeout(() => {
        cargarJsPDF(() => {
          try {
            informe.datos = leerDatos();
            generarPDF();
            btn.querySelector('.dd-itxt').textContent = 'Descargado!';
            setTimeout(() => {
              btn.classList.remove('descargando');
              btn.classList.add('listo');
              btn.querySelector('.dd-itxt').textContent = 'Descargar Informe';
              btn.disabled = false;
            }, 2000);
          } catch (err) {
            console.error('Error generando PDF:', err);
            btn.classList.remove('descargando');
            btn.classList.add('listo');
            btn.querySelector('.dd-itxt').textContent = 'Descargar Informe';
            btn.disabled = false;
          }
        });
      }, 200);
    });

    const btnReset = document.getElementById('btnReset');
    if (btnReset) btnReset.parentElement.insertBefore(btn, btnReset);
    return btn;
  }

  /* ═══════════════════════════════════════════
     INTERCEPTAR CALCULAR
  ═══════════════════════════════════════════ */
  function interceptarCalculo(btnInforme) {
    const btnCalc = document.getElementById('btnCalc');
    if (!btnCalc) return;
    btnCalc.addEventListener('click', () => {
      setTimeout(() => {
        const delta = document.getElementById('rD')?.textContent?.trim();
        if (delta && delta !== '—') {
          informe.listo = true;
          informe.datos = leerDatos();
          btnInforme.classList.add('listo');
          btnInforme.disabled = false;
          btnInforme.title = 'Informe listo para descargar';
        }
      }, 600);
    });
  }

  /* ═══════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════ */
  function init() {
    const btnInforme = injectBoton();
    interceptarCalculo(btnInforme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
