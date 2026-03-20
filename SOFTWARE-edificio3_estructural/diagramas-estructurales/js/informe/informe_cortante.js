/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   INFORME DFC — Diagrama de Fuerza Cortante                     ║
 * ║   IngeLAB 3D · informe_cortante.js                              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en cortante.html:
 *   <script src="../js/informe/informe_cortante.js"></script>
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

  function leerDatos() {
    const g  = id => { const el = document.getElementById(id); return el ? el.textContent.trim() : '—'; };
    const v  = id => { const el = document.getElementById(id); return el ? el.value : '—'; };
    const gs = id => { const el = document.getElementById(id); return el ? (el.options[el.selectedIndex]?.text || el.value) : '—'; };

    const diam = v('inp_diam_e');
    return {
      fecha:    new Date().toLocaleDateString('es-CL', { year:'numeric', month:'long', day:'numeric' }),
      hora:     new Date().toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' }),
      tipo:     gs('inp_tipo'),
      L:        v('inp_L') + ' m',
      bw:       v('inp_bw') + ' m',
      h:        v('inp_h') + ' m',
      recub:    v('inp_recub') + ' m',
      fc:       v('inp_fc') + ' MPa',
      fy:       v('inp_fy') + ' MPa',
      diamE:    diam + ' mm',
      // Resultados
      RA:       g('res_RA'),
      RB:       g('res_RB'),
      Vmax:     g('res_Vmax'),
      xVmax:    g('res_xVmax'),
      Vmin:     g('res_Vmin'),
      cerosV:   g('res_cerosV'),
      d:        g('res_d'),
      Vc:       g('res_Vc'),
      Vs:       g('res_Vs'),
      phiVn:    g('res_phiVn'),
      Av:       g('res_Av'),
      s:        g('res_s'),
      smax:     g('res_smax'),
      zona:     g('zonaText'),
      verifTitulo: g('verifTitle'),
      verifSub:    g('verifSub'),
      cumple: !document.getElementById('verifBox')?.classList.contains('fail'),
    };
  }

  function capturarCanvas(id) {
    const c = document.getElementById(id);
    if (!c) return null;
    try { return c.toDataURL('image/png'); } catch { return null; }
  }

  const C = {
    bg:     [8,  12, 16],
    bg2:    [13, 17, 23],
    card:   [15, 21, 32],
    accent: [0, 119, 255],    // azul --accent
    accentL:[0, 229, 255],    // cyan --accent2
    green:  [0, 255, 157],
    red:    [255, 71, 87],
    orange: [255, 140, 0],
    text:   [232,237,245],
    text2:  [139,149,168],
    text3:  [61, 71, 88],
    white:  [255,255,255],
    border: [30, 38, 50],
  };

  function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const d = informe.datos;
    const PW = 210, PH = 297, M = 15, CW = PW - M * 2;
    let y = 0;

    const rgb  = col => doc.setTextColor(...col);
    const fill = col => doc.setFillColor(...col);
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
    doc.text('DFC', M + 9, 17.5, { align: 'center' });

    doc.setFontSize(16); doc.setFont('helvetica', 'bold'); rgb(C.white);
    doc.text('DIAGRAMA DE FUERZA CORTANTE', M + 20, 22);

    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text('Informe tecnico de corte y diseno de estribos  |  ACI 318-19  |  NCh 430', M + 20, 29);

    doc.setFontSize(7.5); rgb(C.text3);
    doc.text(`Generado: ${d.fecha}  |  ${d.hora}`, M + 20, 36);

    fill(C.accent);  rect(M, 41, CW * 0.35, 1.5, 1);
    fill(C.accentL); rect(M + CW * 0.35, 41, CW * 0.12, 1.5, 1);

    const badgeW = 36, badgeX = PW - M - badgeW;
    fill(d.cumple ? [0,35,20] : [38,8,12]);
    doc.setDrawColor(...(d.cumple ? C.green : C.red));
    doc.roundedRect(badgeX, 8, badgeW, 16, 2, 2, 'FD');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.green : C.red);
    doc.text(d.cumple ? 'SECCION OK' : 'AUMENTAR SEC.', badgeX + badgeW / 2, 15, { align: 'center' });
    doc.setFontSize(7); doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text(`s = ${d.s}`, badgeX + badgeW / 2, 21, { align: 'center' });

    y = 50;

    function secTitulo(titulo, color = C.accentL) {
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
      doc.roundedRect(M, y, hw, 7, 1, 1, 'FD');
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
    filaDos('Ancho alma bw', d.bw, 'Altura total h', d.h);
    filaDos('Recubrimiento', d.recub, "f'c hormigon", d.fc);
    filaDos('fy estribos', d.fy, 'Diametro estribo', d.diamE);
    y += 4;

    /* REACCIONES */
    secTitulo('Reacciones en apoyos', C.accentL);
    filaDos('Reaccion R_A', d.RA, 'Reaccion R_B', d.RB);
    y += 4;

    /* FUERZA CORTANTE */
    secTitulo('Fuerza Cortante', C.accent);
    fila('V_max (+)', d.Vmax, 85, true);
    fila('Posicion @ V_max', d.xVmax);
    fila('V_min (-)', d.Vmin);
    fila('Posiciones donde V = 0', d.cerosV);
    y += 4;

    /* DISEÑO A CORTE */
    secTitulo('Diseno a corte  ACI 318-19 §22.5', C.accent);
    fila('Peralte efectivo d', d.d);
    fila('Vc (aporte del hormigon)', d.Vc);
    fila('Vs requerido (estribos)', d.Vs, 85, true);
    fila('phi*Vn total', d.phiVn, 85, true);
    y += 4;

    /* ESTRIBOS */
    secTitulo('Estribos requeridos', C.accent);
    fila('Area Av (2 ramas)', d.Av);
    fila('Separacion s diseno', d.s, 85, true);
    fila('Separacion maxima s_max', d.smax);
    fila('Zona de demanda de corte', d.zona);
    y += 4;

    /* BOX FINAL */
    fill(d.cumple ? [0,35,22] : [38,8,12]);
    doc.setDrawColor(...(d.cumple ? C.green : C.red));
    doc.roundedRect(M, y, CW, 18, 3, 3, 'FD');
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.green : C.red);
    doc.text(d.verifTitulo, M + CW / 2, y + 8, { align: 'center' });
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text(d.verifSub, M + CW / 2, y + 14, { align: 'center' });
    y += 24;

    /* NORMATIVA */
    doc.setFontSize(7.5); rgb(C.text3);
    let nx = M;
    ['ACI 318-19 §22.5','NCh 430:2008','Clapeyron'].forEach(n => {
      fill(C.card); doc.setDrawColor(...C.border);
      const tw = doc.getTextWidth(n) + 6;
      doc.roundedRect(nx, y, tw, 6, 1, 1, 'FD');
      rgb(C.text3); doc.text(n, nx + 3, y + 4.3);
      nx += tw + 3;
    });

    /* ══════════════════════════════ PÁGINA 2 ══════════════════════════════ */
    doc.addPage();
    fill(C.bg);  rect(0, 0, PW, PH);
    fill(C.bg2); rect(0, 0, PW, 20);
    fill(C.accent); rect(0, 0, 4, 20);

    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(C.accent); doc.text('INGELAB 3D', M + 2, 8);
    doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text('Diagrama de Fuerza Cortante  |  Seccion transversal  |  Separacion estribos', M + 2, 15);

    y = 28;

    /* Canvas principal V(x) */
    const imgMain = capturarCanvas('canvasMain');
    if (imgMain) {
      fill(C.card); rect(M, y, CW, 7, 2);
      fill(C.accent); rect(M, y, 3, 7, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold'); rgb(C.accentL);
      doc.text('DIAGRAMA DE FUERZA CORTANTE V(x) [kN]', M + 7, y + 5);
      y += 10;

      const canvas = document.getElementById('canvasMain');
      const ratio  = canvas.width / canvas.height;
      const imgW   = CW;
      const imgH   = Math.min(imgW / ratio, 85);
      fill(C.bg2); doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, imgW, imgH, 3, 3, 'FD');
      doc.addImage(imgMain, 'PNG', M, y, imgW, imgH);
      y += imgH + 8;
    }

    /* Seccion + Estribos en paralelo */
    const imgSec = capturarCanvas('canvasSeccion');
    const imgEst = capturarCanvas('canvasEstribos');
    const halfW  = (CW - 6) / 2;

    if (imgSec || imgEst) {
      if (imgSec) {
        fill(C.card); rect(M, y, halfW, 7, 2);
        fill(C.accent); rect(M, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold');
        rgb(C.accent);
        doc.text(`SECCION — ESTRIBO O${d.diamE}`, M + 7, y + 5);
      }
      if (imgEst) {
        fill(C.card); rect(M + halfW + 6, y, halfW, 7, 2);
        fill(C.orange); rect(M + halfW + 6, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold');
        rgb(C.orange);
        doc.text('SEPARACION ESTRIBOS s(x) [mm]', M + halfW + 13, y + 5);
      }
      y += 10;

      const subH = 50;
      if (imgSec) {
        fill(C.bg2); doc.setDrawColor(...C.border);
        doc.roundedRect(M, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgSec, 'PNG', M, y, halfW, subH);
      }
      if (imgEst) {
        fill(C.bg2); doc.setDrawColor(...C.border);
        doc.roundedRect(M + halfW + 6, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgEst, 'PNG', M + halfW + 6, y, halfW, subH);
      }
      y += subH + 8;
    }

    /* Formulas */
    const fH = 40;
    fill(C.card); doc.setDrawColor(...C.border);
    doc.roundedRect(M, y, CW, fH, 3, 3, 'FD');
    fill(C.accent); rect(M, y, 3, fH, 1);

    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold'); rgb(C.accent);
    doc.text('RESISTENCIA A CORTE — ACI 318-19 §22.5', M + 7, y + 7);

    const fmls = [
      { f: 'phi*Vn = phi*(Vc + Vs) >= Vu',           d: 'Condicion de diseno a corte' },
      { f: 'Vc = 0.17*lambda*sqrt(fc)*bw*d',         d: 'Aporte del hormigon (lambda=1 normal)' },
      { f: 'Vs = Av*fy*d / s',                       d: 'Aporte de los estribos' },
      { f: 's = Av*fy*d / Vs  [s <= d/2, 600mm]',   d: 'Separacion de diseno y limite ACI' },
      { f: 'Vs <= 0.66*sqrt(fc)*bw*d',               d: 'Limite de la seccion transversal' },
    ];

    let fy3 = y + 13;
    const fBoxW = 68;
    fmls.forEach(item => {
      fill([12,20,35]); doc.setDrawColor(20, 40, 70);
      doc.roundedRect(M + 5, fy3, fBoxW, 5.5, 1, 1, 'FD');
      doc.setFontSize(6.2); doc.setFont('helvetica', 'bold'); rgb(C.accent);
      doc.text(item.f, M + 5 + fBoxW / 2, fy3 + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7); rgb(C.text2);
      doc.text(item.d, M + 5 + fBoxW + 4, fy3 + 4);
      fy3 += 6.5;
    });

    /* Footer */
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
    doc.save(`InformeDFC_IngeLAB_${fecha}.pdf`);
  }

  function injectBoton() {
    const style = document.createElement('style');
    style.textContent = `
      #btn-informe-dfc{display:flex;align-items:center;gap:7px;background:rgba(0,119,255,.08);border:1px solid rgba(0,119,255,.2);border-radius:6px;padding:8px 14px;color:rgba(0,119,255,.4);font-family:'Space Mono',monospace;font-size:11px;cursor:not-allowed;transition:all .25s;letter-spacing:.04em;}
      #btn-informe-dfc.listo{color:#0077ff;border-color:rgba(0,119,255,.45);background:rgba(0,119,255,.1);cursor:pointer;animation:dfcInfPulse 2.5s ease-in-out infinite;}
      #btn-informe-dfc.listo:hover{background:rgba(0,119,255,.2);border-color:#0077ff;transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,119,255,.3);animation:none;}
      #btn-informe-dfc.descargando{color:#00ff9d;border-color:rgba(0,255,157,.45);background:rgba(0,255,157,.1);cursor:default;animation:none;}
      @keyframes dfcInfPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,119,255,.3);}50%{box-shadow:0 0 0 6px rgba(0,119,255,0);}}
      #btn-informe-dfc .dfc-idot{width:6px;height:6px;border-radius:50%;background:rgba(0,119,255,.3);flex-shrink:0;transition:background .25s;}
      #btn-informe-dfc.listo .dfc-idot{background:#0077ff;box-shadow:0 0 6px rgba(0,119,255,.6);animation:dfcDotBlink 1.2s infinite;}
      #btn-informe-dfc.descargando .dfc-idot{background:#00ff9d;animation:none;}
      @keyframes dfcDotBlink{0%,100%{opacity:1}50%{opacity:.3}}
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'btn-informe-dfc';
    btn.innerHTML = `<span class="dfc-idot"></span><span>📄</span><span class="dfc-itxt">Descargar Informe</span>`;
    btn.title = 'Calcule primero para generar el informe';
    btn.disabled = true;

    btn.addEventListener('click', () => {
      if (!informe.listo) return;
      btn.classList.remove('listo');
      btn.classList.add('descargando');
      btn.querySelector('.dfc-itxt').textContent = 'Generando PDF...';
      btn.disabled = true;
      setTimeout(() => {
        cargarJsPDF(() => {
          try {
            informe.datos = leerDatos();
            generarPDF();
            btn.querySelector('.dfc-itxt').textContent = 'Descargado!';
            setTimeout(() => {
              btn.classList.remove('descargando');
              btn.classList.add('listo');
              btn.querySelector('.dfc-itxt').textContent = 'Descargar Informe';
              btn.disabled = false;
            }, 2000);
          } catch (err) {
            console.error('Error PDF:', err);
            btn.classList.remove('descargando');
            btn.classList.add('listo');
            btn.querySelector('.dfc-itxt').textContent = 'Descargar Informe';
            btn.disabled = false;
          }
        });
      }, 200);
    });

    const btnReset = document.getElementById('btnReset');
    if (btnReset) btnReset.parentElement.insertBefore(btn, btnReset);
    return btn;
  }

  function interceptarCalculo(btnInforme) {
    const btnCalc = document.getElementById('btnCalc');
    if (!btnCalc) return;
    btnCalc.addEventListener('click', () => {
      setTimeout(() => {
        const vmax = document.getElementById('res_Vmax')?.textContent?.trim();
        if (vmax && vmax !== '—') {
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
          const vmax = document.getElementById('res_Vmax')?.textContent?.trim();
          if (vmax && vmax !== '—') {
            informe.listo = true;
            informe.datos = leerDatos();
            btnInforme.classList.add('listo');
            btnInforme.disabled = false;
          }
        }, 800);
      });
    });
  }

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
