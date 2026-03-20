/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   INFORME DCL — Diagrama de Cuerpo Libre                        ║
 * ║   IngeLAB 3D · informe_cuerpo_libre.js                          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en cuerpo_libre.html:
 *   <script src="../js/informe/informe_cuerpo_libre.js"></script>
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
    const cb = id => { const el = document.getElementById(id); return el ? el.checked : false; };

    return {
      fecha:    new Date().toLocaleDateString('es-CL', { year:'numeric', month:'long', day:'numeric' }),
      hora:     new Date().toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' }),
      elem:     gs('inp_elem'),
      apoyo:    gs('inp_apoyo'),
      L:        v('inp_L') + ' m',
      incP:     cb('inp_incP'),
      P:        v('inp_P') + ' kN',
      aP:       v('inp_aP') + ' m',
      incQ:     cb('inp_incQ'),
      q:        v('inp_q') + ' kN/m',
      xcorte:   v('inp_xcorte') + ' m',
      // Equilibrio
      SFx:      g('res_SFx'),
      SFy:      g('res_SFy'),
      SM:       g('res_SM'),
      // Reacciones
      RA:       g('res_RA'),
      RB:       g('res_RB'),
      HA:       g('res_HA'),
      MA:       g('res_MA'),
      // Seccion
      xcLabel:  g('res_xcLabel'),
      Vx:       g('res_Vx'),
      Mx:       g('res_Mx'),
      Nx:       g('res_Nx'),
      // Maximos
      Vmax:     g('res_Vmax'),
      Mmax:     g('res_Mmax'),
      xV0:      g('res_xV0'),
      // Overlays
      ovRA:     g('ovRA'),
      ovRB:     g('ovRB'),
      ovVx:     g('ovVx'),
      ovMx:     g('ovMx'),
      // Verificacion
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

  const C = {
    bg:     [8,  12, 16],
    bg2:    [13, 17, 23],
    card:   [15, 21, 32],
    accent: [0, 229, 255],   // cyan --accent
    accentL:[0, 255, 157],   // green --accent2
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
    doc.roundedRect(M + 2, 13, 14, 6, 1.5, 1.5, 'FD');
    doc.setFontSize(6.5); rgb(C.accent);
    doc.text('DCL', M + 9, 17.5, { align: 'center' });

    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    rgb(C.white);
    doc.text('DIAGRAMA DE CUERPO LIBRE', M + 20, 22);

    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text('Informe tecnico de equilibrio estatico  |  ACI 318-19  |  NCh 430', M + 20, 29);

    doc.setFontSize(7.5); rgb(C.text3);
    doc.text(`Generado: ${d.fecha}  |  ${d.hora}`, M + 20, 36);

    fill(C.accent);  rect(M, 41, CW * 0.35, 1.5, 1);
    fill(C.accentL); rect(M + CW * 0.35, 41, CW * 0.12, 1.5, 1);

    // Badge equilibrio
    const badgeW = 36, badgeX = PW - M - badgeW;
    fill(d.cumple ? [0,35,20] : [35,20,5]);
    doc.setDrawColor(...(d.cumple ? C.accentL : C.orange));
    doc.roundedRect(badgeX, 8, badgeW, 16, 2, 2, 'FD');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.accentL : C.orange);
    doc.text(d.cumple ? 'EQUILIBRIO OK' : 'REVISAR', badgeX + badgeW / 2, 15, { align: 'center' });
    doc.setFontSize(7); doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text(`SFy = ${d.SFy}`, badgeX + badgeW / 2, 21, { align: 'center' });

    y = 50;

    function secTitulo(titulo, color = C.accent) {
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
    secTitulo('Datos de entrada', C.accent);
    filaDos('Elemento estructural', d.elem, 'Condicion de apoyos', d.apoyo);
    fila('Longitud L', d.L);
    if (d.incP) filaDos('Carga puntual P', d.P, 'Posicion a', d.aP);
    if (d.incQ) fila('Carga distribuida q', d.q);
    y += 4;

    /* EQUILIBRIO */
    secTitulo('Verificacion de equilibrio estatico', C.accentL);
    fila('Suma fuerzas horizontales  SFx = 0', d.SFx);
    fila('Suma fuerzas verticales    SFy = 0', d.SFy);
    fila('Suma momentos en A         SMA = 0', d.SM);
    y += 4;

    /* REACCIONES */
    secTitulo('Reacciones en los apoyos', C.accent);
    filaDos('Reaccion vertical RA', d.RA, 'Reaccion vertical RB', d.RB);
    filaDos('Reaccion horizontal HA', d.HA, 'Momento empotramiento MA', d.MA);
    y += 4;

    /* SECCION DE CORTE */
    secTitulo(`Seccion de corte  x = ${d.xcLabel} m`, C.red);
    fila('Cortante V(x)', d.Vx, 85, true);
    fila('Momento flector M(x)', d.Mx, 85, true);
    fila('Axial N(x)', d.Nx);
    y += 4;

    /* MAXIMOS */
    secTitulo('Maximos de la estructura', C.accent);
    filaDos('Cortante maximo |V|_max', d.Vmax, 'Momento maximo |M|_max', d.Mmax);
    fila('Posicion donde V = 0 (M es maximo)', d.xV0);
    y += 4;

    /* CONVENCION */
    secTitulo('Convencion de signos aplicada (ACI 318)', C.text2);
    fila('Cortante V(+)', 'Cara izquierda de la seccion apunta hacia arriba');
    fila('Momento M(+)', 'Tracciona la fibra inferior (viga sonriente)');
    fila('Axial N(+)', 'Traccion (separa las dos partes)');
    y += 4;

    /* BOX FINAL */
    fill(d.cumple ? [0,35,22] : [35,20,5]);
    doc.setDrawColor(...(d.cumple ? C.accentL : C.orange));
    doc.roundedRect(M, y, CW, 18, 3, 3, 'FD');
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.accentL : C.orange);
    doc.text(d.verifTitulo, M + CW / 2, y + 8, { align: 'center' });
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    const subLines = d.verifSub.split('\n');
    subLines.forEach((line, i) => {
      doc.text(line, M + CW / 2, y + 13 + i * 4, { align: 'center' });
    });
    y += subLines.length > 1 ? 24 : 20;

    /* NORMATIVA */
    doc.setFontSize(7.5); rgb(C.text3);
    let nx = M;
    ['ACI 318-19','NCh 430','AISC 360','Mecanica Estructural'].forEach(n => {
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
    doc.text('Diagrama de Cuerpo Libre  |  DFC  |  DMF', M + 2, 15);

    y = 28;

    /* Canvas principal DCL */
    const imgDCL = capturarCanvas('canvasDCL');
    if (imgDCL) {
      fill(C.card); rect(M, y, CW, 7, 2);
      fill(C.accent); rect(M, y, 3, 7, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      rgb(C.accent);
      doc.text('DIAGRAMA DE CUERPO LIBRE — ELEMENTO AISLADO', M + 7, y + 5);
      y += 10;

      const canvas = document.getElementById('canvasDCL');
      const ratio  = canvas.width / canvas.height;
      const imgW   = CW;
      const imgH   = Math.min(imgW / ratio, 90);
      fill(C.bg2);
      doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, imgW, imgH, 3, 3, 'FD');
      doc.addImage(imgDCL, 'PNG', M, y, imgW, imgH);
      y += imgH + 8;
    }

    /* DFC + DMF en paralelo */
    const imgDFC = capturarCanvas('canvasDFC');
    const imgDMF = capturarCanvas('canvasDMF');
    const halfW  = (CW - 6) / 2;

    if (imgDFC || imgDMF) {
      if (imgDFC) {
        fill(C.card); rect(M, y, halfW, 7, 2);
        fill([0, 119, 255]); rect(M, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold');
        rgb([0, 119, 255]);
        doc.text('DFC — CORTANTE V(x) [kN]', M + 7, y + 5);
      }
      if (imgDMF) {
        fill(C.card); rect(M + halfW + 6, y, halfW, 7, 2);
        fill(C.red); rect(M + halfW + 6, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold');
        rgb(C.red);
        doc.text('DMF — MOMENTO M(x) [kN*m]', M + halfW + 13, y + 5);
      }
      y += 10;

      const subH = 48;
      if (imgDFC) {
        fill(C.bg2); doc.setDrawColor(...C.border);
        doc.roundedRect(M, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgDFC, 'PNG', M, y, halfW, subH);
      }
      if (imgDMF) {
        fill(C.bg2); doc.setDrawColor(...C.border);
        doc.roundedRect(M + halfW + 6, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgDMF, 'PNG', M + halfW + 6, y, halfW, subH);
      }
      y += subH + 8;
    }

    /* Formulas */
    const fH = 38;
    fill(C.card); doc.setDrawColor(...C.border);
    doc.roundedRect(M, y, CW, fH, 3, 3, 'FD');
    fill(C.accent); rect(M, y, 3, fH, 1);

    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    rgb(C.accent);
    doc.text('ECUACIONES DE EQUILIBRIO ESTATICO', M + 7, y + 7);

    const fmls = [
      { f: 'SFy = 0  →  RA + RB = P + q*L', d: 'Equilibrio de fuerzas verticales' },
      { f: 'SMA = 0  →  RB*L = Suma(M_ext)', d: 'Equilibrio de momentos en A' },
      { f: 'V(x) = RA - P_izq - q*x',        d: 'Cortante en seccion x' },
      { f: 'M(x) = RA*x - P*(x-a) - q*x^2/2',d: 'Momento flector en seccion x' },
    ];

    let fy3 = y + 13;
    const fBoxW = 58;
    fmls.forEach(item => {
      fill([12,20,35]);
      doc.setDrawColor(20, 40, 60);
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
    doc.save(`InformeDCL_IngeLAB_${fecha}.pdf`);
  }

  /* ═══════════════════════════════════════════
     BOTON EN TOPBAR
  ═══════════════════════════════════════════ */
  function injectBoton() {
    const style = document.createElement('style');
    style.textContent = `
      #btn-informe-dcl {
        display:flex;align-items:center;gap:7px;
        background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);
        border-radius:6px;padding:8px 14px;
        color:rgba(0,229,255,.4);font-family:'Space Mono',monospace;
        font-size:11px;cursor:not-allowed;transition:all .25s;letter-spacing:.04em;
      }
      #btn-informe-dcl.listo {
        color:#00e5ff;border-color:rgba(0,229,255,.45);
        background:rgba(0,229,255,.1);cursor:pointer;
        animation:dclInfPulse 2.5s ease-in-out infinite;
      }
      #btn-informe-dcl.listo:hover {
        background:rgba(0,229,255,.2);border-color:#00e5ff;
        transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,229,255,.3);
        animation:none;
      }
      #btn-informe-dcl.descargando{color:#00ff9d;border-color:rgba(0,255,157,.45);background:rgba(0,255,157,.1);cursor:default;animation:none;}
      @keyframes dclInfPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,229,255,.3);}50%{box-shadow:0 0 0 6px rgba(0,229,255,0);}}
      #btn-informe-dcl .dcl-idot{width:6px;height:6px;border-radius:50%;background:rgba(0,229,255,.3);flex-shrink:0;transition:background .25s;}
      #btn-informe-dcl.listo .dcl-idot{background:#00e5ff;box-shadow:0 0 6px rgba(0,229,255,.6);animation:dclDotBlink 1.2s infinite;}
      #btn-informe-dcl.descargando .dcl-idot{background:#00ff9d;animation:none;}
      @keyframes dclDotBlink{0%,100%{opacity:1}50%{opacity:.3}}
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'btn-informe-dcl';
    btn.innerHTML = `<span class="dcl-idot"></span><span>📄</span><span class="dcl-itxt">Descargar Informe</span>`;
    btn.title = 'Calcule primero para generar el informe';
    btn.disabled = true;

    btn.addEventListener('click', () => {
      if (!informe.listo) return;
      btn.classList.remove('listo');
      btn.classList.add('descargando');
      btn.querySelector('.dcl-itxt').textContent = 'Generando PDF...';
      btn.disabled = true;

      setTimeout(() => {
        cargarJsPDF(() => {
          try {
            informe.datos = leerDatos();
            generarPDF();
            btn.querySelector('.dcl-itxt').textContent = 'Descargado!';
            setTimeout(() => {
              btn.classList.remove('descargando');
              btn.classList.add('listo');
              btn.querySelector('.dcl-itxt').textContent = 'Descargar Informe';
              btn.disabled = false;
            }, 2000);
          } catch (err) {
            console.error('Error generando PDF:', err);
            btn.classList.remove('descargando');
            btn.classList.add('listo');
            btn.querySelector('.dcl-itxt').textContent = 'Descargar Informe';
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
        const ra = document.getElementById('res_RA')?.textContent?.trim();
        if (ra && ra !== '—') {
          informe.listo = true;
          informe.datos = leerDatos();
          btnInforme.classList.add('listo');
          btnInforme.disabled = false;
          btnInforme.title = 'Informe listo para descargar';
        }
      }, 600);
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
