/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   INFORME DI — Diagrama de Interaccion M-N                      ║
 * ║   IngeLAB 3D · informe_interaccion.js                           ║
 * ║   Se actualiza automaticamente con cada calculo                 ║
 * ║   Descarga PDF profesional con diagrama incluido                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * INSTALACION: agregar antes de </body> en interaccion.html:
 *   <script src="../js/informe/informe_interaccion.js"></script>
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
    const gs = id => { const el = document.getElementById(id); return el ? el.options[el.selectedIndex]?.text || el.value : '—'; };

    return {
      fecha:    new Date().toLocaleDateString('es-CL', { year:'numeric', month:'long', day:'numeric' }),
      hora:     new Date().toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' }),
      // Inputs
      b:        v('inp_b') + ' m',
      h:        v('inp_h') + ' m',
      recub:    v('inp_recub') + ' m',
      nbarras:  gs('inp_nbarras'),
      diam:     gs('inp_diam'),
      fc:       v('inp_fc') + ' MPa',
      fy:       v('inp_fy') + ' MPa',
      ecu:      gs('inp_ecu'),
      estribos: gs('inp_estribos'),
      Mu:       v('inp_Mu') + ' kN*m',
      Nu:       v('inp_Nu') + ' kN',
      // Resultados sección
      BH:       g('rBH'),
      Ag:       g('rAg'),
      As:       g('rAs'),
      rho:      g('rRho'),
      beta1:    g('rBeta1'),
      // Puntos clave
      pA:       g('pA'),
      pB:       g('pB'),
      pD:       g('pD'),
      cbal:     g('rCbal'),
      // Verificacion
      demanda:  g('rDemanda'),
      DCR:      g('rDCR'),
      phi:      g('rPhi'),
      zona:     document.getElementById('zonaContainer')?.textContent?.trim() || '—',
      verifTitulo: g('verifTitle'),
      verifSub:    g('verifSub'),
      cumple:   document.getElementById('verifBox')?.classList.contains('ok') ?? false,
    };
  }

  /* ═══════════════════════════════════════════
     CAPTURAR CANVAS
  ═══════════════════════════════════════════ */
  function capturarCanvas(id) {
    const c = document.getElementById(id);
    if (!c) return null;
    try { return c.toDataURL('image/png'); } catch { return null; }
  }

  /* ═══════════════════════════════════════════
     COLORES
  ═══════════════════════════════════════════ */
  const C = {
    bg:     [8,  12, 16],
    bg2:    [13, 17, 23],
    card:   [15, 21, 32],
    accent: [255, 71, 87],
    accentL:[255,107, 53],
    cyan:   [0, 229, 255],
    green:  [0, 255, 157],
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
    doc.roundedRect(M + 2, 13, 12, 6, 1.5, 1.5, 'FD');
    doc.setFontSize(6.5); rgb(C.accent);
    doc.text('DI', M + 8, 17.5, { align: 'center' });

    // Título
    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    rgb(C.white);
    doc.text('DIAGRAMA DE INTERACCION M-N', M + 18, 22);

    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text('Informe tecnico de columna H.A.  |  ACI 318-19  |  NCh 430', M + 18, 29);

    doc.setFontSize(7.5); rgb(C.text3);
    doc.text(`Generado: ${d.fecha}  |  ${d.hora}`, M + 18, 36);

    // Línea decorativa
    fill(C.accent);  rect(M, 41, CW * 0.35, 1.5, 1);
    fill(C.accentL); rect(M + CW * 0.35, 41, CW * 0.12, 1.5, 1);

    // Badge CUMPLE
    const badgeW = 36, badgeX = PW - M - badgeW;
    fill(d.cumple ? [0,35,20] : [38,8,12]);
    doc.setDrawColor(...(d.cumple ? C.green : C.accent));
    doc.roundedRect(badgeX, 8, badgeW, 16, 2, 2, 'FD');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.green : C.accent);
    doc.text(d.cumple ? 'CUMPLE' : 'NO CUMPLE', badgeX + badgeW / 2, 15, { align: 'center' });
    doc.setFontSize(7); doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text(`DCR = ${d.DCR}`, badgeX + badgeW / 2, 21, { align: 'center' });

    y = 50;

    /* ── helpers ── */
    function secTitulo(titulo, color = C.cyan) {
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

    /* GEOMETRIA */
    secTitulo('Geometria de la seccion', C.cyan);
    filaDos('Ancho b', d.b, 'Alto h', d.h);
    fila('Recubrimiento a CG barra', d.recub);
    y += 4;

    /* ARMADURA */
    secTitulo('Armadura longitudinal', C.cyan);
    filaDos('Numero de barras', d.nbarras, 'Diametro de barra', d.diam);
    filaDos('Area total As', d.As, 'Cuantia rho', d.rho);
    y += 4;

    /* MATERIALES */
    secTitulo('Materiales', C.cyan);
    filaDos("f'c hormigon", d.fc, 'fy acero', d.fy);
    filaDos('Def. ultima ecu', d.ecu, 'Tipo estribos', d.estribos);
    y += 4;

    /* DEMANDA */
    secTitulo('Demanda de diseno', C.accent);
    filaDos('Momento ultimo Mu', d.Mu, 'Axial ultimo Nu (+comp)', d.Nu);
    y += 4;

    /* PROPIEDADES DE SECCIÓN */
    secTitulo('Propiedades de la seccion', C.cyan);
    filaDos('b x h', d.BH, 'Area bruta Ag', d.Ag);
    filaDos('beta1', d.beta1, 'c balanceada', d.cbal);
    y += 4;

    /* PUNTOS CLAVE */
    secTitulo('Puntos clave de la curva', C.accent);
    fila('Punto A  -  Compresion pura (phiP0)', d.pA, 85, true);
    fila('Punto B  -  Traccion pura', d.pB);
    fila('Punto D  -  Punto balanceado', d.pD, 85, true);
    y += 4;

    /* VERIFICACIÓN */
    secTitulo('Verificacion de demanda', C.accent);
    fila('Par de diseno (Mu, Nu)', d.demanda);
    fila('DCR (Demand/Capacity Ratio)', d.DCR, 85, true);
    filaDos('Factor phi aplicado', d.phi, 'Zona de comportamiento', d.zona);
    y += 4;

    /* BOX VERIFICACIÓN FINAL */
    fill(d.cumple ? [0,35,22] : [38,8,12]);
    doc.setDrawColor(...(d.cumple ? C.green : C.accent));
    doc.roundedRect(M, y, CW, 18, 3, 3, 'FD');
    doc.setFontSize(12); doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.green : C.accent);
    doc.text(d.verifTitulo, M + CW / 2, y + 8, { align: 'center' });
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text(d.verifSub, M + CW / 2, y + 14, { align: 'center' });
    y += 24;

    /* NORMATIVA */
    doc.setFontSize(7.5); rgb(C.text3);
    const normas = ['NCh 430:2008', 'ACI 318-19', 'NCh 1537:2009'];
    let nx = M;
    normas.forEach(n => {
      fill(C.card);
      doc.setDrawColor(...C.border);
      const tw = doc.getTextWidth(n) + 6;
      doc.roundedRect(nx, y, tw, 6, 1, 1, 'FD');
      rgb(C.text3); doc.text(n, nx + 3, y + 4.3);
      nx += tw + 3;
    });

    /* ══════════════════════════════
       PÁGINA 2 — DIAGRAMA
    ══════════════════════════════ */
    doc.addPage();
    fill(C.bg);  rect(0, 0, PW, PH);
    fill(C.bg2); rect(0, 0, PW, 20);
    fill(C.accent); rect(0, 0, 4, 20);

    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(C.accent); doc.text('INGELAB 3D', M + 2, 8);
    doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text('Diagrama de Interaccion phi*Pn - phi*Mn  |  Representacion grafica', M + 2, 15);

    y = 28;

    /* Canvas principal — Diagrama de interacción */
    const imgMain = capturarCanvas('cMain');
    if (imgMain) {
      fill(C.card); rect(M, y, CW, 7, 2);
      fill(C.accent); rect(M, y, 3, 7, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      rgb(C.cyan);
      doc.text('DIAGRAMA DE INTERACCION phi*Pn - phi*Mn (ACI 318-19)', M + 7, y + 5);
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

    /* Canvas sección transversal */
    const imgSec = capturarCanvas('cSec');
    if (imgSec) {
      fill(C.card); rect(M, y, CW / 2 - 2, 7, 2);
      fill(C.cyan); rect(M, y, 3, 7, 1);
      doc.setFontSize(7); doc.setFont('helvetica', 'bold');
      rgb(C.cyan); doc.text('SECCION TRANSVERSAL', M + 7, y + 5);
      y += 10;

      const secH = 55;
      fill(C.bg2);
      doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, CW / 2 - 2, secH, 2, 2, 'FD');
      doc.addImage(imgSec, 'PNG', M, y, CW / 2 - 2, secH);

      // Panel de resumen al lado derecho del canvas sección
      const rx = M + CW / 2 + 2;
      const rw = CW / 2 - 2;
      fill(C.card);
      doc.setDrawColor(...C.border);
      doc.roundedRect(rx, y - 10, rw, secH + 10, 2, 2, 'FD');
      fill(C.accent); rect(rx, y - 10, 3, secH + 10, 1);

      doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
      rgb(C.accent);
      doc.text('RESUMEN DE RESULTADOS', rx + 6, y - 3);

      const resItems = [
        ['b x h',        d.BH],
        ['As total',     d.As],
        ['Cuantia rho',  d.rho],
        ['Mu diseno',    d.Mu],
        ['Nu diseno',    d.Nu],
        ['DCR',          d.DCR],
        ['phi aplicado', d.phi],
      ];
      let ry2 = y + 5;
      resItems.forEach(([lbl, val]) => {
        doc.setFontSize(7); doc.setFont('helvetica', 'normal');
        rgb(C.text2); doc.text(lbl, rx + 6, ry2);
        doc.setFont('helvetica', 'bold');
        rgb(C.text);  doc.text(String(val), rx + rw - 4, ry2, { align: 'right' });
        ry2 += 6.5;
      });

      y += secH + 8;
    }

    /* Box teoría */
    const teoriaH = 36;
    fill(C.card);
    doc.setDrawColor(...C.border);
    doc.roundedRect(M, y, CW, teoriaH, 3, 3, 'FD');
    fill(C.accent); rect(M, y, 3, teoriaH, 1);

    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    rgb(C.accent);
    doc.text('PRINCIPIOS FUNDAMENTALES — ACI 318-19', M + 7, y + 7);

    const formulas = [
      { f: 'phi*Pn(0) = 0.80*phi*(0.85*fc*Ag + fy*As)', d: 'Compresion pura maxima (Punto A)' },
      { f: 'c_bal = 0.003*d / (0.003 + ey)',             d: 'Posicion eje neutro balanceado' },
      { f: 'DCR = dist(demanda) / dist(curva)',           d: 'Verificacion de la demanda' },
      { f: 'rho = As / Ag  [0.01 a 0.08]',               d: 'Cuantia de armadura (ACI 318-19)' },
    ];

    let fy3 = y + 13;
    const fBoxW = 72;
    formulas.forEach(item => {
      fill([20,28,42]);
      doc.setDrawColor(50, 20, 30);
      doc.roundedRect(M + 5, fy3, fBoxW, 5.5, 1, 1, 'FD');
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold');
      rgb(C.accent);
      doc.text(item.f, M + 5 + fBoxW / 2, fy3 + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
      rgb(C.text2);
      doc.text(item.d, M + 5 + fBoxW + 4, fy3 + 4);
      fy3 += 7;
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
    doc.save(`InformeDI_IngeLAB_${fecha}.pdf`);
  }

  /* ═══════════════════════════════════════════
     BOTÓN EN TOPBAR
  ═══════════════════════════════════════════ */
  function injectBoton() {
    const style = document.createElement('style');
    style.textContent = `
      #btn-informe-di {
        display:flex;align-items:center;gap:7px;
        background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);
        border-radius:6px;padding:8px 14px;
        color:rgba(0,229,255,.4);font-family:'Space Mono',monospace;
        font-size:11px;cursor:not-allowed;transition:all .25s;letter-spacing:.04em;
      }
      #btn-informe-di.listo {
        color:#00e5ff;border-color:rgba(0,229,255,.45);
        background:rgba(0,229,255,.1);cursor:pointer;
        animation:diInfPulse 2.5s ease-in-out infinite;
      }
      #btn-informe-di.listo:hover {
        background:rgba(0,229,255,.2);border-color:#00e5ff;
        transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,229,255,.3);
        animation:none;
      }
      #btn-informe-di.descargando {
        color:#00ff9d;border-color:rgba(0,255,157,.45);
        background:rgba(0,255,157,.1);cursor:default;animation:none;
      }
      @keyframes diInfPulse {
        0%,100%{box-shadow:0 0 0 0 rgba(0,229,255,.3);}
        50%{box-shadow:0 0 0 6px rgba(0,229,255,.0);}
      }
      #btn-informe-di .di-dot {
        width:6px;height:6px;border-radius:50%;
        background:rgba(0,229,255,.3);flex-shrink:0;transition:background .25s;
      }
      #btn-informe-di.listo .di-dot {
        background:#00e5ff;box-shadow:0 0 6px rgba(0,229,255,.6);
        animation:diDotBlink 1.2s infinite;
      }
      #btn-informe-di.descargando .di-dot{background:#00ff9d;animation:none;}
      @keyframes diDotBlink{0%,100%{opacity:1}50%{opacity:.3}}
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'btn-informe-di';
    btn.innerHTML = `<span class="di-dot"></span><span>📄</span><span class="di-txt">Descargar Informe</span>`;
    btn.title = 'Calcule primero para generar el informe';
    btn.disabled = true;

    btn.addEventListener('click', () => {
      if (!informe.listo) return;
      btn.classList.remove('listo');
      btn.classList.add('descargando');
      btn.querySelector('.di-txt').textContent = 'Generando PDF...';
      btn.disabled = true;

      setTimeout(() => {
        cargarJsPDF(() => {
          try {
            informe.datos = leerDatos();
            generarPDF();
            btn.querySelector('.di-txt').textContent = '¡Descargado!';
            setTimeout(() => {
              btn.classList.remove('descargando');
              btn.classList.add('listo');
              btn.querySelector('.di-txt').textContent = 'Descargar Informe';
              btn.disabled = false;
            }, 2000);
          } catch (err) {
            console.error('Error generando PDF:', err);
            btn.classList.remove('descargando');
            btn.classList.add('listo');
            btn.querySelector('.di-txt').textContent = 'Descargar Informe';
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
        const dcr = document.getElementById('rDCR')?.textContent?.trim();
        if (dcr && dcr !== '—') {
          informe.listo = true;
          informe.datos = leerDatos();
          btnInforme.classList.add('listo');
          btnInforme.disabled = false;
          btnInforme.title = 'Informe listo para descargar';
        }
      }, 600);
    });

    document.querySelectorAll('.caso-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          const dcr = document.getElementById('rDCR')?.textContent?.trim();
          if (dcr && dcr !== '—') {
            informe.listo = true;
            informe.datos = leerDatos();
            btnInforme.classList.add('listo');
            btnInforme.disabled = false;
          }
        }, 800);
      });
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
