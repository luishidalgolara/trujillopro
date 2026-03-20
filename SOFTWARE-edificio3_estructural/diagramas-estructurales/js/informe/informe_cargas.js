/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   INFORME DC — Diagramas de Carga                               ║
 * ║   IngeLAB 3D · informe_cargas.js                                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en cargas.html:
 *   <script src="../js/informe/informe_cargas.js"></script>
 */

(function () {
  'use strict';

  function cargarJsPDF(cb) {
    if (window.jspdf) { cb(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = cb;
    document.head.appendChild(script);
  }

  const informe = { listo: false, datos: null };

  function leerDatos() {
    const g  = id => { const el = document.getElementById(id); return el ? el.textContent.trim() : '—'; };
    const v  = id => { const el = document.getElementById(id); return el ? el.value : '—'; };
    const gs = id => { const el = document.getElementById(id); return el ? (el.options[el.selectedIndex]?.text || el.value) : '—'; };

    // Leer tabla de resultantes
    const tbRes = document.getElementById('tbRes');
    const resultantes = [];
    if (tbRes) {
      tbRes.querySelectorAll('tr').forEach(tr => {
        const tds = tr.querySelectorAll('td');
        if (tds.length >= 4) {
          resultantes.push({
            label: tds[0].textContent.trim(),
            tipo:  tds[1].textContent.trim(),
            R:     tds[2].textContent.trim(),
            xR:    tds[3].textContent.trim(),
          });
        }
      });
    }

    // Leer tabla de combinaciones — soporta <tr><td> o divs generados por DC_MODULE
    const tbCombis = document.getElementById('tbCombis');
    const combis = [];
    if (tbCombis) {
      const rows = tbCombis.querySelectorAll('tr');
      if (rows.length > 0) {
        rows.forEach(tr => {
          const tds = tr.querySelectorAll('td');
          if (tds.length >= 2) {
            combis.push({
              nombre: tds[0]?.textContent?.trim() || '',
              valor:  tds[1]?.textContent?.trim() || '',
              dom:    tr.classList.contains('dom'),
            });
          }
        });
      } else {
        tbCombis.querySelectorAll('div,li,p').forEach(el => {
          const txt = el.textContent.trim();
          if (txt && txt.length > 2) {
            combis.push({ nombre: txt.substring(0,80), valor: '', dom: el.classList.contains('dom') });
          }
        });
      }
    }

    return {
      fecha:    new Date().toLocaleDateString('es-CL', { year:'numeric', month:'long', day:'numeric' }),
      hora:     new Date().toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' }),
      L:        v('inp_L') + ' m',
      // Viento
      Vref:     v('vVr') + ' m/s',
      expo:     gs('vExp'),
      vH:       v('vH') + ' m',
      vB:       v('vB') + ' m',
      Cp:       v('vCp'),
      // Sismico
      zona:     v('sZona'),
      suelo:    v('sSuelo'),
      pisos:    v('sPisos'),
      Wpiso:    v('sW') + ' kN',
      Z:        v('sZ'),
      I:        v('sI'),
      // Resultados cargas
      Rtotal:   g('rR'),
      xRtotal:  g('rXR'),
      resultantes,
      // Resultados viento
      qref:     g('rQref'),
      RW:       g('rRW'),
      zR:       g('rZR'),
      // Resultados sismico
      T:        g('rT'),
      Sa:       g('rSa'),
      Vbasal:   g('rV'),
      Ft:       g('rFt'),
      // Combinaciones
      combis,
      domNom:   g('domNom'),
      domVal:   g('domVal'),
    };
  }

  function capturarCanvas(id) {
    const c = document.getElementById(id);
    if (!c) return null;
    try {
      // Redibujar en canvas off-screen para evitar PNG corrupto en paneles ocultos
      const w = c.width  || 800;
      const h = c.height || 400;
      const tmp = document.createElement('canvas');
      tmp.width  = w;
      tmp.height = h;
      const ctx = tmp.getContext('2d');
      ctx.drawImage(c, 0, 0, w, h);
      return tmp.toDataURL('image/png');
    } catch { return null; }
  }

  const C = {
    bg:     [8,  12, 16],
    bg2:    [13, 17, 23],
    card:   [15, 21, 32],
    accent: [255, 140, 0],   // naranja --accent
    accentL:[0,  229, 255],  // cyan
    green:  [0,  255, 157],
    red:    [255, 71, 87],
    text:   [232,237,245],
    text2:  [139,149,168],
    text3:  [61, 71, 88],
    white:  [255,255,255],
    border: [30, 38, 50],
  };

  function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', putOnlyUsedFonts: true, compress: true });
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
    doc.roundedRect(M + 2, 13, 13, 6, 1.5, 1.5, 'FD');
    doc.setFontSize(6.5); rgb(C.accent);
    doc.text('DC', M + 8.5, 17.5, { align: 'center' });

    doc.setFontSize(16); doc.setFont('helvetica', 'bold'); rgb(C.white);
    doc.text('DIAGRAMAS DE CARGA', M + 19, 22);

    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text('Informe tecnico de cargas  |  NCh 1537  |  NCh 432  |  NCh 433', M + 19, 29);

    doc.setFontSize(7.5); rgb(C.text3);
    doc.text(`Generado: ${d.fecha}  |  ${d.hora}`, M + 19, 36);

    fill(C.accent);  rect(M, 41, CW * 0.35, 1.5, 1);
    fill(C.accentL); rect(M + CW * 0.35, 41, CW * 0.12, 1.5, 1);

    // Badge combinacion dominante
    const badgeW = 42, badgeX = PW - M - badgeW;
    fill([35,20,5]);
    doc.setDrawColor(...C.accent);
    doc.roundedRect(badgeX, 8, badgeW, 16, 2, 2, 'FD');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold'); rgb(C.accent);
    doc.text('COMB. DOMINANTE', badgeX + badgeW / 2, 14, { align: 'center' });
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); rgb(C.white);
    doc.text(d.domVal || '—', badgeX + badgeW / 2, 21, { align: 'center' });

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

    /* GEOMETRIA */
    secTitulo('Geometria', C.accentL);
    fila('Longitud de viga L', d.L);
    y += 4;

    /* RESULTANTES POR CARGA */
    secTitulo('Resultantes por carga individual', C.accent);
    if (d.resultantes.length > 0) {
      // Header tabla
      fill([20,28,42]);
      doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, CW, 6, 1, 1, 'FD');
      doc.setFontSize(7); doc.setFont('helvetica', 'bold'); rgb(C.text3);
      doc.text('Label', M + 4, y + 4.3);
      doc.text('Tipo', M + 30, y + 4.3);
      doc.text('R [kN]', M + 80, y + 4.3);
      doc.text('xR [m]', M + 130, y + 4.3);
      y += 7;

      d.resultantes.forEach(r => {
        fill(C.bg2); doc.setDrawColor(...C.border);
        doc.roundedRect(M, y, CW, 6, 1, 1, 'FD');
        doc.setFontSize(7.5); doc.setFont('helvetica', 'normal');
        rgb(C.accent);  doc.text(r.label, M + 4, y + 4.3);
        rgb(C.text2);   doc.text(r.tipo,  M + 30, y + 4.3);
        rgb(C.text);    doc.text(r.R,     M + 80, y + 4.3);
        rgb(C.text);    doc.text(r.xR,    M + 130, y + 4.3);
        y += 7;
      });
    }
    y += 2;
    fila('Resultante total R', d.Rtotal, 85, true);
    fila('Posicion resultante xR', d.xRtotal);
    y += 4;

    /* COMBINACIONES */
    secTitulo('Combinaciones de carga NCh 1537 / ASCE 7', C.accent);
    if (d.combis.length > 0) {
      fill([20,28,42]); doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, CW, 6, 1, 1, 'FD');
      doc.setFontSize(7); doc.setFont('helvetica', 'bold'); rgb(C.text3);
      doc.text('Combinacion', M + 4, y + 4.3);
      doc.text('Valor [kN]', M + 130, y + 4.3);
      y += 7;

      d.combis.forEach(c => {
        const isDom = c.dom;
        fill(isDom ? [35,20,5] : C.bg2);
        doc.setDrawColor(...(isDom ? C.accent : C.border));
        doc.roundedRect(M, y, CW, 6, 1, 1, 'FD');
        doc.setFontSize(7.5); doc.setFont('helvetica', isDom ? 'bold' : 'normal');
        rgb(isDom ? C.accent : C.text2);
        doc.text(c.nombre, M + 4, y + 4.3);
        rgb(isDom ? C.accent : C.text);
        doc.text(c.valor, M + 130, y + 4.3);
        if (isDom) {
          doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); rgb(C.accent);
          doc.text('DOMINANTE', M + CW - 4, y + 4.3, { align: 'right' });
        }
        y += 7;
      });
    }
    y += 4;

    /* VIENTO */
    secTitulo('Parametros de viento NCh 432', C.accentL);
    filaDos('Velocidad ref. V_ref', d.Vref, 'Categoria exposicion', d.expo);
    filaDos('Altura total h', d.vH, 'Ancho fachada b', d.vB);
    fila('Cp barlovento', d.Cp);
    fila('Presion de referencia q_ref', d.qref);
    fila('Resultante de viento R_W', d.RW, 85, true);
    fila('Altura de aplicacion z_R', d.zR);
    y += 4;

    /* SISMICO */
    secTitulo('Parametros sismicos NCh 433', C.accentL);
    filaDos('Zona sismica', d.zona, 'Tipo de suelo', d.suelo);
    filaDos('Numero de pisos', d.pisos, 'Peso por piso W', d.Wpiso);
    filaDos('Factor Z', d.Z, 'Factor importancia I', d.I);
    fila('Periodo fundamental T', d.T);
    fila('Aceleracion espectral Sa', d.Sa);
    fila('Corte basal V', d.Vbasal, 85, true);
    fila('Fuerza adicional techo Ft', d.Ft);

    /* ══════════════════════════════ PÁGINA 2 ══════════════════════════════ */
    doc.addPage();
    fill(C.bg);  rect(0, 0, PW, PH);
    fill(C.bg2); rect(0, 0, PW, 20);
    fill(C.accent); rect(0, 0, 4, 20);

    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(C.accent); doc.text('INGELAB 3D', M + 2, 8);
    doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text('Diagramas de Carga  |  Viento NCh 432  |  Sismico NCh 433', M + 2, 15);

    y = 28;

    /* Forzar redibujo de todos los canvas antes de capturar
       (los tabs ocultos no renderizan hasta ser forzados) */
    try {
      const r = window.DC_MODULE?.state?.result;
      if (r && window.DC_MODULE) {
        const cM = document.getElementById('cMain');
        const cV = document.getElementById('cViento');
        const cS = document.getElementById('cSismo');
        if (cM) window.DC_MODULE.draw(cM, r);
        if (cV) window.DC_MODULE.drawViento(cV, r.viento);
        if (cS) window.DC_MODULE.drawSismico(cS, r.sismico);
      }
    } catch(e) { /* continuar aunque falle el redibujo */ }

    /* Canvas cargas */
    const imgMain = capturarCanvas('cMain');
    if (imgMain) {
      fill(C.card); rect(M, y, CW, 7, 2);
      fill(C.accent); rect(M, y, 3, 7, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold'); rgb(C.accentL);
      doc.text('DIAGRAMA DE CARGAS SOBRE LA VIGA  D + L + M', M + 7, y + 5);
      y += 10;
      const canvas = document.getElementById('cMain');
      const ratio  = canvas.width / canvas.height;
      const imgW   = CW, imgH = Math.min(imgW / ratio, 70);
      fill(C.bg2); doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, imgW, imgH, 3, 3, 'FD');
      doc.addImage(imgMain, 'PNG', M, y, imgW, imgH);
      y += imgH + 8;
    }

    /* Canvas viento + sismico en paralelo */
    const imgV = capturarCanvas('cViento');
    const imgS = capturarCanvas('cSismo');
    const halfW = (CW - 6) / 2;

    if (imgV || imgS) {
      if (imgV) {
        fill(C.card); rect(M, y, halfW, 7, 2);
        fill(C.accentL); rect(M, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); rgb(C.accentL);
        doc.text('VIENTO — PERFIL p(z) NCh 432', M + 7, y + 5);
      }
      if (imgS) {
        fill(C.card); rect(M + halfW + 6, y, halfW, 7, 2);
        fill([100, 180, 255]); rect(M + halfW + 6, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); rgb([100,180,255]);
        doc.text('SISMICO — FUERZAS Fi NCh 433', M + halfW + 13, y + 5);
      }
      y += 10;

      const subH = 70;
      if (imgV) {
        fill(C.bg2); doc.setDrawColor(...C.border);
        doc.roundedRect(M, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgV, 'PNG', M, y, halfW, subH);
      }
      if (imgS) {
        fill(C.bg2); doc.setDrawColor(...C.border);
        doc.roundedRect(M + halfW + 6, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgS, 'PNG', M + halfW + 6, y, halfW, subH);
      }
      y += subH + 8;
    }

    /* Formulas */
    const fH = 38;
    fill(C.card); doc.setDrawColor(...C.border);
    doc.roundedRect(M, y, CW, fH, 3, 3, 'FD');
    fill(C.accent); rect(M, y, 3, fH, 1);

    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold'); rgb(C.accent);
    doc.text('FORMULARIO DE REFERENCIA', M + 7, y + 7);

    const fmls = [
      { f: '1.2D + 1.6L',                    d: 'Combinacion dominante habitual NCh 1537' },
      { f: 'R_dist = q*L  @  xR = L/2',      d: 'Resultante carga distribuida uniforme' },
      { f: 'R_triang = q*L/2  @  xR = 2L/3', d: 'Resultante carga triangular' },
      { f: 'p(z) = q_ref * Kz * Cp',         d: 'Presion de viento NCh 432' },
      { f: 'V = Sa * W / g',                  d: 'Corte basal sismico NCh 433' },
    ];

    let fy3 = y + 13;
    const fBoxW = 60;
    fmls.forEach(item => {
      fill([15,22,38]); doc.setDrawColor(40,30,10);
      doc.roundedRect(M + 5, fy3, fBoxW, 5.5, 1, 1, 'FD');
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); rgb(C.accent);
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
    doc.save(`InformeDC_IngeLAB_${fecha}.pdf`);
  }

  function injectBoton() {
    const style = document.createElement('style');
    style.textContent = `
      #btn-informe-dc{display:flex;align-items:center;gap:7px;background:rgba(255,140,0,.08);border:1px solid rgba(255,140,0,.2);border-radius:6px;padding:8px 14px;color:rgba(255,140,0,.4);font-family:'Space Mono',monospace;font-size:11px;cursor:not-allowed;transition:all .25s;letter-spacing:.04em;}
      #btn-informe-dc.listo{color:#ff8c00;border-color:rgba(255,140,0,.45);background:rgba(255,140,0,.1);cursor:pointer;animation:dcInfPulse 2.5s ease-in-out infinite;}
      #btn-informe-dc.listo:hover{background:rgba(255,140,0,.2);border-color:#ff8c00;transform:translateY(-1px);box-shadow:0 4px 16px rgba(255,140,0,.3);animation:none;}
      #btn-informe-dc.descargando{color:#00ff9d;border-color:rgba(0,255,157,.45);background:rgba(0,255,157,.1);cursor:default;animation:none;}
      @keyframes dcInfPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,140,0,.3);}50%{box-shadow:0 0 0 6px rgba(255,140,0,0);}}
      #btn-informe-dc .dc-idot{width:6px;height:6px;border-radius:50%;background:rgba(255,140,0,.3);flex-shrink:0;transition:background .25s;}
      #btn-informe-dc.listo .dc-idot{background:#ff8c00;box-shadow:0 0 6px rgba(255,140,0,.6);animation:dcDotBlink 1.2s infinite;}
      #btn-informe-dc.descargando .dc-idot{background:#00ff9d;animation:none;}
      @keyframes dcDotBlink{0%,100%{opacity:1}50%{opacity:.3}}
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'btn-informe-dc';
    btn.innerHTML = `<span class="dc-idot"></span><span>📄</span><span class="dc-itxt">Descargar Informe</span>`;
    btn.title = 'Calcule primero para generar el informe';
    btn.disabled = true;

    btn.addEventListener('click', () => {
      if (!informe.listo) return;
      btn.classList.remove('listo');
      btn.classList.add('descargando');
      btn.querySelector('.dc-itxt').textContent = 'Generando PDF...';
      btn.disabled = true;
      setTimeout(() => {
        cargarJsPDF(() => {
          try {
            informe.datos = leerDatos();
            generarPDF();
            btn.querySelector('.dc-itxt').textContent = 'Descargado!';
            setTimeout(() => {
              btn.classList.remove('descargando');
              btn.classList.add('listo');
              btn.querySelector('.dc-itxt').textContent = 'Descargar Informe';
              btn.disabled = false;
            }, 2000);
          } catch (err) {
            console.error('Error generando PDF DC:', err, err?.stack);
            btn.classList.remove('descargando');
            btn.classList.add('listo');
            btn.querySelector('.dc-itxt').textContent = 'Descargar Informe';
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
        const r = document.getElementById('rR')?.textContent?.trim();
        if (r && r !== '—') {
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