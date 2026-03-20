/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   INFORME DFA — Diagrama de Fuerza Axial                       ║
 * ║   IngeLAB 3D · informe_axial.js                                ║
 * ║   Se actualiza automáticamente con cada cálculo                 ║
 * ║   Descarga PDF profesional con diagramas incluidos              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * DEPENDENCIA: jsPDF (se carga automáticamente desde CDN)
 * INSTALACIÓN: agregar antes de </body> en axial.html:
 *   <script src="../js/informe/informe_axial.js"></script>
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     CARGAR jsPDF DESDE CDN
  ═══════════════════════════════════════════ */
  function cargarJsPDF(cb) {
    if (window.jspdf) { cb(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = cb;
    document.head.appendChild(script);
  }

  /* ═══════════════════════════════════════════
     ESTADO
  ═══════════════════════════════════════════ */
  const informe = { listo: false, datos: null };

  /* ═══════════════════════════════════════════
     LEER DATOS DEL DOM
  ═══════════════════════════════════════════ */
  function leerDatos() {
    const g  = id => { const el = document.getElementById(id); return el ? el.textContent.trim() : '—'; };
    const v  = id => { const el = document.getElementById(id); return el ? el.value : '—'; };
    const gs = id => { const el = document.getElementById(id); return el ? (el.options[el.selectedIndex]?.text || el.value) : '—'; };
    const cb = id => { const el = document.getElementById(id); return el ? el.checked : false; };

    const DCR_val = parseFloat(g('res_DCR'));
    const lambda_val = parseFloat(g('res_lambda'));
    const lambdamax_val = parseFloat(g('res_lambdamax'));

    return {
      fecha:       new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
      hora:        new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      // Geometría
      L:           v('inp_L') + ' m',
      beta:        gs('inp_beta'),
      // Material y sección
      material:    gs('inp_material'),
      seccion:     gs('inp_seccion'),
      b:           v('inp_b') + ' m',
      h:           v('inp_h') + ' m',
      diam:        v('inp_diam') + ' m',
      hea:         gs('inp_hea'),
      fc:          v('inp_fc') + ' MPa',
      fy:          v('inp_fy') + ' MPa',
      inc_pp:      cb('inp_pp'),
      // Propiedades de sección
      A:           g('res_A'),
      I:           g('res_I'),
      r:           g('res_r'),
      E:           g('res_E'),
      // Resultados axiales
      Nmax:        g('res_Nmax'),
      Nmin:        g('res_Nmin'),
      delta:       g('res_delta'),
      sigma:       g('res_sigma'),
      // Verificación resistencia
      phiPn:       g('res_phiPn'),
      DCR:         g('res_DCR'),
      // Pandeo
      Lef:         g('res_Lef'),
      lambda:      g('res_lambda'),
      lambdamax:   g('res_lambdamax'),
      Ncr:         g('res_Ncr'),
      ratioNcr:    g('res_ratioNcr'),
      // Flags
      cumple_DCR:    !isNaN(DCR_val) && DCR_val < 1.0,
      cumple_lambda: !isNaN(lambda_val) && !isNaN(lambdamax_val) && lambda_val <= lambdamax_val,
    };
  }

  /* ═══════════════════════════════════════════
     CAPTURAR CANVAS CON FONDO SÓLIDO
  ═══════════════════════════════════════════ */
  function capturarCanvas(id) {
    const canvas = document.getElementById(id);
    if (!canvas || canvas.width === 0 || canvas.height === 0) return null;
    try {
      const tmp = document.createElement('canvas');
      tmp.width  = canvas.width;
      tmp.height = canvas.height;
      const ctx = tmp.getContext('2d');
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, tmp.width, tmp.height);
      ctx.drawImage(canvas, 0, 0);
      return tmp.toDataURL('image/png');
    } catch { return null; }
  }

  /* ═══════════════════════════════════════════
     COLORES DEL TEMA
  ═══════════════════════════════════════════ */
  const C = {
    bg:      [8,  12, 16],
    bg2:     [13, 17, 23],
    card:    [15, 21, 32],
    accent:  [0,  229, 255],   // cyan — color principal DFA
    accentL: [0,  119, 255],   // azul
    green:   [0,  255, 157],
    red:     [255, 71, 87],
    orange:  [255, 140, 0],
    text:    [232, 237, 245],
    text2:   [139, 149, 168],
    text3:   [61,  71, 88],
    white:   [255, 255, 255],
    border:  [30,  38, 50],
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
    const draw = col => doc.setDrawColor(...col);
    const rect = (x, ry, w, h, r = 0) => doc.roundedRect(x, ry, w, h, r, r, 'F');

    /* ══════════════════════════════ PÁGINA 1 ══════════════════════════════ */
    fill(C.bg);  rect(0, 0, PW, PH);
    fill(C.bg2); rect(0, 0, PW, 44);
    fill(C.accent); rect(0, 0, 4, 44);

    doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
    rgb(C.accent); doc.text('INGELAB 3D', M + 2, 10);

    fill(C.card); doc.setDrawColor(...C.accent);
    doc.roundedRect(M + 2, 13, 14, 6, 1.5, 1.5, 'FD');
    doc.setFontSize(6.5); rgb(C.accent);
    doc.text('DFA', M + 9, 17.5, { align: 'center' });

    doc.setFontSize(16); doc.setFont('helvetica', 'bold'); rgb(C.white);
    doc.text('DIAGRAMA DE FUERZA AXIAL', M + 20, 22);

    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text('Informe tecnico de analisis axial  |  ACI 318-19  |  AISC 360-22', M + 20, 29);

    doc.setFontSize(7.5); rgb(C.text3);
    doc.text(`Generado: ${d.fecha}  |  ${d.hora}`, M + 20, 36);

    fill(C.accent);  rect(M, 41, CW * 0.35, 1.5, 1);
    fill(C.accentL); rect(M + CW * 0.35, 41, CW * 0.12, 1.5, 1);

    // Badge CUMPLE / REVISAR
    const okTotal = d.cumple_DCR && d.cumple_lambda;
    const badgeW = 42, badgeX = PW - M - badgeW;
    fill(okTotal ? [0, 35, 20] : [38, 8, 12]);
    doc.setDrawColor(...(okTotal ? C.green : C.red));
    doc.roundedRect(badgeX, 8, badgeW, 16, 2, 2, 'FD');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    rgb(okTotal ? C.green : C.red);
    doc.text(okTotal ? 'CUMPLE' : 'REVISAR', badgeX + badgeW / 2, 14, { align: 'center' });
    doc.setFontSize(7); doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text(`DCR=${d.DCR}  λ=${d.lambda}`, badgeX + badgeW / 2, 21, { align: 'center' });

    y = 50;

    function secTitulo(titulo, color = C.accent) {
      fill(C.card); rect(M, y, CW, 8, 2);
      fill(color);  rect(M, y, 3, 8, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold'); rgb(color);
      doc.text(titulo.toUpperCase(), M + 7, y + 5.5);
      y += 12;
    }

    function fila(label, valor, col1 = 85, destacado = false) {
      fill(C.bg2); doc.setDrawColor(...C.border);
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
      fill(C.bg2); doc.setDrawColor(...C.border);
      doc.roundedRect(M,          y, hw, 7, 1, 1, 'FD');
      doc.roundedRect(M + hw + 4, y, hw, 7, 1, 1, 'FD');
      doc.setFontSize(8); doc.setFont('helvetica', 'normal');
      rgb(C.text2); doc.text(l1, M + 4, y + 5);
      rgb(C.text);  doc.text(String(v1), M + 44, y + 5);
      rgb(C.text2); doc.text(l2, M + hw + 8, y + 5);
      rgb(C.text);  doc.text(String(v2), M + hw + 48, y + 5);
      y += 8;
    }

    /* GEOMETRÍA */
    secTitulo('Geometria y condicion de apoyo', C.accentL);
    filaDos('Longitud  L', d.L, 'Condicion de apoyo  beta', d.beta);
    filaDos('Longitud efectiva  L_ef', d.Lef, 'Peso propio incluido', d.inc_pp ? 'Sí' : 'No');
    y += 4;

    /* MATERIAL Y SECCIÓN */
    secTitulo('Material y seccion transversal', C.accent);
    filaDos('Material', d.material, 'Tipo de seccion', d.seccion);
    filaDos("f'c", d.fc, 'fy', d.fy);
    y += 4;

    /* PROPIEDADES */
    secTitulo('Propiedades de la seccion', C.accentL);
    filaDos('Area  A', d.A, 'Inercia  I', d.I);
    filaDos('Radio de giro  r', d.r, 'Modulo elasticidad  E', d.E);
    y += 4;

    /* RESULTADOS AXIALES */
    secTitulo('Resultados axiales', C.accent);
    fila('Fuerza axial max (compresion)  N_max', d.Nmax, 85, true);
    fila('Fuerza axial min (traccion)  N_min', d.Nmin);
    fila('Deformacion axial  delta', d.delta);
    fila('Tension normal  sigma_max', d.sigma);
    y += 4;

    /* VERIFICACIÓN RESISTENCIA */
    secTitulo('Verificacion de resistencia', C.accent);
    fila('Capacidad axial  phi·Pn', d.phiPn);
    fila('DCR = N / phi·Pn', d.DCR, 85, true);

    fill(d.cumple_DCR ? [0, 35, 22] : [38, 8, 12]);
    draw(d.cumple_DCR ? C.green : C.red);
    doc.setDrawColor(...(d.cumple_DCR ? C.green : C.red));
    doc.roundedRect(M, y, CW, 10, 2, 2, 'FD');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(d.cumple_DCR ? C.green : C.red);
    doc.text(d.cumple_DCR ? '✓  RESISTENCIA OK — N ≤ phi·Pn' : '✗  RESISTENCIA FALLA — N > phi·Pn',
      M + CW / 2, y + 6.5, { align: 'center' });
    y += 14;

    /* PANDEO */
    secTitulo('Verificacion de pandeo (Euler)', C.accentL);
    filaDos('Esbeltez  lambda = Lef/r', d.lambda, 'Esbeltez max  lambda_max', d.lambdamax);
    fila('Carga critica de Euler  N_cr', d.Ncr);
    fila('Relacion  N / N_cr', d.ratioNcr, 85, true);

    fill(d.cumple_lambda ? [0, 35, 22] : [38, 8, 12]);
    draw(d.cumple_lambda ? C.green : C.red);
    doc.setDrawColor(...(d.cumple_lambda ? C.green : C.red));
    doc.roundedRect(M, y, CW, 10, 2, 2, 'FD');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(d.cumple_lambda ? C.green : C.red);
    doc.text(d.cumple_lambda ? '✓  PANDEO OK — lambda ≤ lambda_max' : '✗  ESBELTEZ EXCEDE — lambda > lambda_max',
      M + CW / 2, y + 6.5, { align: 'center' });
    y += 14;

    /* ══════════════════════════════ PÁGINA 2 ══════════════════════════════ */
    doc.addPage();
    fill(C.bg);  rect(0, 0, PW, PH);
    fill(C.bg2); rect(0, 0, PW, 20);
    fill(C.accent); rect(0, 0, 4, 20);

    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(C.accent); doc.text('INGELAB 3D', M + 2, 8);
    doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text('Diagrama de Fuerza Axial — Representacion grafica', M + 2, 15);

    y = 28;

    /* Canvas principal DFA */
    const imgMain = capturarCanvas('canvasMain');
    if (imgMain) {
      fill(C.card); rect(M, y, CW, 7, 2);
      fill(C.accent); rect(M, y, 3, 7, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold'); rgb(C.accent);
      doc.text('DIAGRAMA DE FUERZA AXIAL N(x)', M + 7, y + 5);
      y += 10;
      const canvas = document.getElementById('canvasMain');
      if (canvas) {
        const ratio = canvas.width / canvas.height;
        const imgW = CW, imgH = Math.min(imgW / ratio, 75);
        fill(C.bg2); draw(C.border);
        doc.setDrawColor(...C.border);
        doc.roundedRect(M, y, imgW, imgH, 3, 3, 'FD');
        doc.addImage(imgMain, 'PNG', M, y, imgW, imgH);
        y += imgH + 8;
      }
    }

    /* Canvas sección + pandeo en paralelo */
    const imgSec    = capturarCanvas('canvasSeccion');
    const imgPandeo = capturarCanvas('canvasPandeo');
    const halfW = (CW - 6) / 2;

    if (imgSec || imgPandeo) {
      if (imgSec) {
        fill(C.card); rect(M, y, halfW, 7, 2);
        fill(C.accentL); rect(M, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); rgb(C.accentL);
        doc.text('SECCION TRANSVERSAL', M + 7, y + 5);
      }
      if (imgPandeo) {
        fill(C.card); rect(M + halfW + 6, y, halfW, 7, 2);
        fill(C.orange); rect(M + halfW + 6, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); rgb(C.orange);
        doc.text('DIAGRAMA DE PANDEO — N_cr', M + halfW + 13, y + 5);
      }
      y += 10;

      const subH = 55;
      if (imgSec) {
        fill(C.bg2); draw(C.border);
        doc.roundedRect(M, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgSec, 'PNG', M, y, halfW, subH);
      }
      if (imgPandeo) {
        fill(C.bg2); draw(C.border);
        doc.roundedRect(M + halfW + 6, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgPandeo, 'PNG', M + halfW + 6, y, halfW, subH);
      }
      y += subH + 8;
    }

    /* Formulario de referencia */
    const fmlBoxH = 42;
    fill(C.card); draw(C.border);
    doc.setDrawColor(...C.border);
    doc.roundedRect(M, y, CW, fmlBoxH, 3, 3, 'FD');
    fill(C.accent); rect(M, y, 3, fmlBoxH, 1);

    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold'); rgb(C.accent);
    doc.text('FORMULARIO DE REFERENCIA', M + 7, y + 7);

    const fmls = [
      { f: 'sigma = N / A',              d: 'Tension normal en el elemento' },
      { f: 'delta = N·L / (E·A)',        d: 'Deformacion axial' },
      { f: 'N_cr = pi²·E·I / L_ef²',    d: 'Carga critica de Euler (pandeo)' },
      { f: 'lambda = L_ef / r',          d: 'Esbeltez del elemento' },
      { f: 'phiPn = 0.65×0.80×(0.85fc·Ag + fy·Ast)', d: 'Capacidad axial pilar H.A. (ACI 318)' },
      { f: 'L_ef = beta · L',            d: 'Longitud efectiva de pandeo' },
    ];

    let fy2 = y + 13;
    const fBoxW = 62;
    fmls.forEach(item => {
      fill([15, 22, 38]); doc.setDrawColor(10, 30, 40);
      doc.roundedRect(M + 5, fy2, fBoxW, 5.5, 1, 1, 'FD');
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); rgb(C.accent);
      doc.text(item.f, M + 5 + fBoxW / 2, fy2 + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7); rgb(C.text2);
      doc.text(item.d, M + 5 + fBoxW + 4, fy2 + 4);
      fy2 += 6.5;
    });

    /* Footer ambas páginas */
    [1, 2].forEach(pg => {
      doc.setPage(pg);
      fill(C.bg2); rect(0, PH - 12, PW, 12);
      fill(C.accent); rect(0, PH - 12, 4, 12);
      doc.setFontSize(7); doc.setFont('helvetica', 'normal'); rgb(C.text3);
      doc.text('IngeLAB 3D · Software educativo de ingenieria estructural', M, PH - 5);
      doc.text(`Pagina ${pg} de 2`, PW - M, PH - 5, { align: 'right' });
      doc.text('Nota: Herramienta educativa. Para proyectos reales consultar con Ingeniero Civil Estructural.', M + CW / 2, PH - 5, { align: 'center' });
    });

    const fecha = new Date().toISOString().slice(0, 10);
    doc.save(`InformeDFA_IngeLAB_${fecha}.pdf`);
  }

  /* ═══════════════════════════════════════════
     INYECTAR BOTÓN
  ═══════════════════════════════════════════ */
  function injectBoton() {
    const style = document.createElement('style');
    style.textContent = `
      #btn-informe-dfa{display:flex;align-items:center;gap:7px;background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);border-radius:6px;padding:8px 14px;color:rgba(0,229,255,.4);font-family:'Space Mono',monospace;font-size:11px;cursor:not-allowed;transition:all .25s;letter-spacing:.04em;}
      #btn-informe-dfa.listo{color:#00e5ff;border-color:rgba(0,229,255,.45);background:rgba(0,229,255,.1);cursor:pointer;animation:dfaInfPulse 2.5s ease-in-out infinite;}
      #btn-informe-dfa.listo:hover{background:rgba(0,229,255,.2);border-color:#00e5ff;transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,229,255,.3);animation:none;}
      #btn-informe-dfa.descargando{color:#00ff9d;border-color:rgba(0,255,157,.45);background:rgba(0,255,157,.1);cursor:default;animation:none;}
      @keyframes dfaInfPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,229,255,.3);}50%{box-shadow:0 0 0 6px rgba(0,229,255,0);}}
      #btn-informe-dfa .dfa-idot{width:6px;height:6px;border-radius:50%;background:rgba(0,229,255,.3);flex-shrink:0;transition:background .25s;}
      #btn-informe-dfa.listo .dfa-idot{background:#00e5ff;box-shadow:0 0 6px rgba(0,229,255,.6);animation:dfaDotBlink 1.2s infinite;}
      #btn-informe-dfa.descargando .dfa-idot{background:#00ff9d;animation:none;}
      @keyframes dfaDotBlink{0%,100%{opacity:1}50%{opacity:.3}}
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'btn-informe-dfa';
    btn.innerHTML = `<span class="dfa-idot"></span><span>📄</span><span class="dfa-itxt">Descargar Informe</span>`;
    btn.title = 'Calcule primero para generar el informe';
    btn.disabled = true;

    btn.addEventListener('click', () => {
      if (!informe.listo) return;
      btn.classList.remove('listo');
      btn.classList.add('descargando');
      btn.querySelector('.dfa-itxt').textContent = 'Generando PDF...';
      btn.disabled = true;

      setTimeout(() => {
        cargarJsPDF(() => {
          try {
            informe.datos = leerDatos();
            generarPDF();
            btn.querySelector('.dfa-itxt').textContent = '¡Descargado!';
            setTimeout(() => {
              btn.classList.remove('descargando');
              btn.classList.add('listo');
              btn.querySelector('.dfa-itxt').textContent = 'Descargar Informe';
              btn.disabled = false;
            }, 2000);
          } catch (err) {
            console.error('Error generando PDF DFA:', err, err?.stack);
            btn.classList.remove('descargando');
            btn.classList.add('listo');
            btn.querySelector('.dfa-itxt').textContent = 'Descargar Informe';
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
     INTERCEPTAR BOTÓN CALCULAR
  ═══════════════════════════════════════════ */
  function interceptarCalculo(btnInforme) {
    const btnCalc = document.getElementById('btnCalc');
    if (!btnCalc) return;

    btnCalc.addEventListener('click', () => {
      setTimeout(() => {
        const nmax = document.getElementById('res_Nmax')?.textContent?.trim();
        if (nmax && nmax !== '—') {
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
