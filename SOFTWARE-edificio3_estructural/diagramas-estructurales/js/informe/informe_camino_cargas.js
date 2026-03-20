/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   INFORME CC — Camino de Cargas                                 ║
 * ║   IngeLAB 3D · informe_camino_cargas.js                        ║
 * ║   Se actualiza automáticamente con cada cálculo                 ║
 * ║   Descarga PDF profesional con diagramas incluidos              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * DEPENDENCIA: jsPDF (se carga automáticamente desde CDN)
 * INSTALACIÓN: agregar antes de </body> en camino_cargas.html:
 *   <script src="../js/informe/informe_camino_cargas.js"></script>
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
     ESTADO DEL INFORME
  ═══════════════════════════════════════════ */
  const informe = {
    listo: false,
    datos: null,
  };

  /* ═══════════════════════════════════════════
     LEER DATOS DEL DOM
  ═══════════════════════════════════════════ */
  function leerDatos() {
    const g = id => {
      const el = document.getElementById(id);
      return el ? el.textContent.trim() : '—';
    };
    const v = id => {
      const el = document.getElementById(id);
      return el ? el.value : '—';
    };
    const gs = id => {
      const el = document.getElementById(id);
      return el ? (el.options[el.selectedIndex]?.text || el.value) : '—';
    };

    // Leer tabla de pisos
    const tbPisos = document.getElementById('res_tabla_body');
    const pisos = [];
    if (tbPisos) {
      tbPisos.querySelectorAll('tr').forEach(tr => {
        const tds = tr.querySelectorAll('td');
        if (tds.length >= 4) {
          pisos.push({
            piso:  tds[0].textContent.trim(),
            N_int: tds[1].textContent.trim(),
            N_bor: tds[2].textContent.trim(),
            N_esq: tds[3].textContent.trim(),
          });
        }
      });
    }

    const sigma_txt = g('res_sigma');
    const fundok_txt = g('res_fundok');

    return {
      fecha:       new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
      hora:        new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      // Geometría
      Lx:          v('inp_Lx') + ' m',
      Ly:          v('inp_Ly') + ' m',
      nx:          v('inp_nx'),
      ny:          v('inp_ny'),
      n_pisos:     v('inp_npisos'),
      h_piso:      v('inp_hpiso') + ' m',
      // Losa
      e_losa:      v('inp_elosa') + ' m',
      tipo_losa:   gs('inp_tipol'),
      // Cargas
      q_D_adic:    v('inp_qd') + ' kN/m²',
      q_L:         g('res_ql'),
      ocupacion:   gs('inp_ocup'),
      // Pilar
      b_pilar:     v('inp_bpil') + ' m',
      h_pilar:     v('inp_hpil') + ' m',
      fc_pilar:    v('inp_fc') + ' MPa',
      rho_pilar:   v('inp_rho') + ' %',
      // Viga
      b_viga:      v('inp_bviga') + ' m',
      h_viga:      v('inp_hviga') + ' m',
      // Fundación
      B_zap:       v('inp_Bzap') + ' m',
      L_zap:       v('inp_Lzap') + ' m',
      sigma_adm:   v('inp_sigadm') + ' kPa',
      Df:          v('inp_Df') + ' m',
      // Resultados cargas
      q_pp:        g('res_qpp'),
      q_D:         g('res_qd'),
      q_comb:      g('res_qu'),
      // Áreas
      At_int:      g('res_atint'),
      At_bor:      g('res_atbor'),
      At_esq:      g('res_atesq'),
      // Cargas pilar
      N_int:       g('res_Nint'),
      N_bor:       g('res_Nbor'),
      N_esq:       g('res_Nesq'),
      // Pilar
      phiPn:       g('res_phiPn'),
      DCR_pilar:   g('res_DCR'),
      // Fundación
      A_zap:       g('res_Azap'),
      sigma_neta:  sigma_txt,
      verif_fund:  fundok_txt,
      pisos,
      cumple_fund:  !fundok_txt.toUpperCase().includes('EXCEDE') && !fundok_txt.includes('❌'),
      cumple_pilar: parseFloat(g('res_DCR')) < 1.0,
    };
  }

  /* ═══════════════════════════════════════════
     CAPTURAR CANVAS COMO IMAGEN
  ═══════════════════════════════════════════ */
  function capturarCanvas(id) {
    const canvas = document.getElementById(id);
    if (!canvas || canvas.width === 0 || canvas.height === 0) return null;
    try {
      // Crear canvas temporal con fondo sólido para evitar PNG inválido
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
    accent:  [0,  255, 157],   // verde — color principal del módulo CC
    accentL: [0,  229, 255],   // cyan
    orange:  [255, 140, 0],
    blue:    [0,  119, 255],
    red:     [255, 71, 87],
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
    doc.roundedRect(M + 2, 13, 13, 6, 1.5, 1.5, 'FD');
    doc.setFontSize(6.5); rgb(C.accent);
    doc.text('CC', M + 8.5, 17.5, { align: 'center' });

    doc.setFontSize(16); doc.setFont('helvetica', 'bold'); rgb(C.white);
    doc.text('CAMINO DE CARGAS', M + 19, 22);

    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text('Informe tecnico de flujo de cargas  |  NCh 1537  |  NCh 433  |  ACI 318-19', M + 19, 29);

    doc.setFontSize(7.5); rgb(C.text3);
    doc.text(`Generado: ${d.fecha}  |  ${d.hora}`, M + 19, 36);

    fill(C.accent);  rect(M, 41, CW * 0.35, 1.5, 1);
    fill(C.accentL); rect(M + CW * 0.35, 41, CW * 0.12, 1.5, 1);

    // Badge fundación
    const okFund = d.cumple_fund;
    const okPilar = d.cumple_pilar;
    const badgeW = 42, badgeX = PW - M - badgeW;
    fill(okFund && okPilar ? [0, 35, 20] : [38, 8, 12]);
    doc.setDrawColor(...(okFund && okPilar ? C.accent : C.red));
    doc.roundedRect(badgeX, 8, badgeW, 16, 2, 2, 'FD');
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    rgb(okFund && okPilar ? C.accent : C.red);
    doc.text(okFund && okPilar ? 'CUMPLE' : 'REVISAR', badgeX + badgeW / 2, 14, { align: 'center' });
    doc.setFontSize(7); doc.setFont('helvetica', 'normal'); rgb(C.text2);
    doc.text(`Fund: ${okFund ? 'OK' : 'FALLA'}  |  Pilar: ${okPilar ? 'OK' : 'FALLA'}`, badgeX + badgeW / 2, 21, { align: 'center' });

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
    secTitulo('Geometria en planta', C.accentL);
    filaDos('Luz en X  Lx', d.Lx, 'Luz en Y  Ly', d.Ly);
    filaDos('Vanos en X  nx', d.nx, 'Vanos en Y  ny', d.ny);
    filaDos('Numero de pisos', d.n_pisos, 'Altura de piso', d.h_piso + ' m');
    y += 4;

    /* LOSA */
    secTitulo('Losa y cargas', C.accent);
    filaDos('Espesor losa  e', d.e_losa + ' m', 'Tipo de losa', d.tipo_losa);
    filaDos('C. muerta adicional qD', d.q_D_adic + ' kN/m²', 'C. viva qL', d.q_L + ' kN/m²');
    fila('Tipo de ocupacion', d.ocupacion);
    y += 4;

    /* CARGAS POR M² */
    secTitulo('Cargas de diseno', C.accent);
    fila('Peso propio losa  q_pp', d.q_pp + ' kN/m²');
    fila('Carga muerta total  q_D', d.q_D + ' kN/m²');
    fila('Combinacion  1.2D + 1.6L  q_u', d.q_comb + ' kN/m²', 85, true);
    y += 4;

    /* PILARES Y VIGA */
    secTitulo('Seccion de pilar y viga', C.accentL);
    filaDos('Pilar  b x h', d.b_pilar + ' x ' + d.h_pilar + ' m', "f'c pilar", d.fc_pilar + ' MPa');
    filaDos('Cuantia acero  rho', d.rho_pilar, 'Viga  b x h', d.b_viga + ' x ' + d.h_viga + ' m');
    y += 4;

    /* CARGAS POR PILAR */
    secTitulo('Carga axial acumulada — base pilar', C.accent);
    fila('N interior  (pilar mas cargado)', d.N_int + ' kN', 85, true);
    fila('N borde', d.N_bor + ' kN');
    fila('N esquina  (pilar menos cargado)', d.N_esq + ' kN');
    y += 4;

    /* FUNDACIÓN */
    secTitulo('Verificacion de fundacion (zapata)', C.accentL);
    filaDos('Dimension zapata  B x L', d.B_zap + ' x ' + d.L_zap + ' m', 'Desplante  Df', d.Df + ' m');
    fila('Presion admisible  sigma_adm', d.sigma_adm + ' kPa');
    fila('Presion actuante  sigma_neta', d.sigma_neta + ' kPa', 85, true);
    fila('DCR fundacion', d.DCR_fund);

    // Badge verificacion fundacion
    fill(okFund ? [0, 35, 22] : [38, 8, 12]);
    draw(okFund ? C.accent : C.red);
    doc.setDrawColor(...(okFund ? C.accent : C.red));
    doc.roundedRect(M, y, CW, 10, 2, 2, 'FD');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(okFund ? C.accent : C.red);
    doc.text(okFund ? '✓  FUNDACION OK — sigma ≤ sigma_adm' : '✗  FUNDACION FALLA — sigma > sigma_adm',
      M + CW / 2, y + 6.5, { align: 'center' });
    y += 14;

    /* VERIFICACIÓN PILAR */
    secTitulo('Verificacion de pilar', C.accentL);
    fila('Capacidad axial  phi·Pn', d.phiPn + ' kN');
    fila('Carga axial  N_int', d.N_int + ' kN', 85, true);
    fila('DCR pilar', d.DCR_pilar);

    fill(okPilar ? [0, 35, 22] : [38, 8, 12]);
    draw(okPilar ? C.accent : C.red);
    doc.setDrawColor(...(okPilar ? C.accent : C.red));
    doc.roundedRect(M, y, CW, 10, 2, 2, 'FD');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    rgb(okPilar ? C.accent : C.red);
    doc.text(okPilar ? '✓  PILAR OK — N ≤ phi·Pn' : '✗  PILAR FALLA — N > phi·Pn',
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
    doc.text('Camino de Cargas — Diagramas y acumulacion por piso', M + 2, 15);

    y = 28;

    /* Canvas corte longitudinal */
    const imgCorte = capturarCanvas('canvasCorte');
    if (imgCorte) {
      fill(C.card); rect(M, y, CW, 7, 2);
      fill(C.accent); rect(M, y, 3, 7, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold'); rgb(C.accent);
      doc.text('CAMINO DE CARGAS — CORTE LONGITUDINAL', M + 7, y + 5);
      y += 10;
      const canvas = document.getElementById('canvasCorte');
      if (canvas) {
        const ratio = canvas.width / canvas.height;
        const imgW = CW, imgH = Math.min(imgW / ratio, 80);
        fill(C.bg2); draw(C.border);
        doc.setDrawColor(...C.border);
        doc.roundedRect(M, y, imgW, imgH, 3, 3, 'FD');
        doc.addImage(imgCorte, 'PNG', M, y, imgW, imgH);
        y += imgH + 8;
      }
    }

    /* Canvas planta + acumulacion en paralelo */
    const imgPlanta = capturarCanvas('canvasPlanta');
    const imgAcum   = capturarCanvas('canvasAcum');
    const halfW = (CW - 6) / 2;

    if (imgPlanta || imgAcum) {
      if (imgPlanta) {
        fill(C.card); rect(M, y, halfW, 7, 2);
        fill(C.accentL); rect(M, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); rgb(C.accentL);
        doc.text('PLANTA — AREAS TRIBUTARIAS', M + 7, y + 5);
      }
      if (imgAcum) {
        fill(C.card); rect(M + halfW + 6, y, halfW, 7, 2);
        fill(C.orange); rect(M + halfW + 6, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); rgb(C.orange);
        doc.text('ACUMULACION N POR PISO', M + halfW + 13, y + 5);
      }
      y += 10;

      const subH = 65;
      if (imgPlanta) {
        fill(C.bg2); draw(C.border);
        doc.roundedRect(M, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgPlanta, 'PNG', M, y, halfW, subH);
      }
      if (imgAcum) {
        fill(C.bg2); draw(C.border);
        doc.roundedRect(M + halfW + 6, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgAcum, 'PNG', M + halfW + 6, y, halfW, subH);
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
      { f: 'At_int = Lx × Ly',            d: 'Area tributaria pilar interior' },
      { f: 'At_bor = Lx×Ly/2',            d: 'Area tributaria pilar de borde' },
      { f: 'At_esq = Lx×Ly/4',            d: 'Area tributaria pilar esquina' },
      { f: 'q_u = 1.2D + 1.6L',           d: 'Combinacion de diseno NCh 1537' },
      { f: 'sigma = N_total / A_zapata',   d: 'Presion sobre el suelo' },
      { f: 'phiPn = 0.65×0.80×(0.85fc×Ag + fy×Ast)', d: 'Capacidad axial pilar ACI 318' },
    ];

    let fy2 = y + 13;
    const fBoxW = 62;
    fmls.forEach(item => {
      fill([15, 22, 38]); doc.setDrawColor(20, 40, 30);
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
    doc.save(`InformeCC_IngeLAB_${fecha}.pdf`);
  }

  /* ═══════════════════════════════════════════
     INYECTAR BOTÓN
  ═══════════════════════════════════════════ */
  function injectBoton() {
    const style = document.createElement('style');
    style.textContent = `
      #btn-informe-cc{display:flex;align-items:center;gap:7px;background:rgba(0,255,157,.08);border:1px solid rgba(0,255,157,.2);border-radius:6px;padding:8px 14px;color:rgba(0,255,157,.4);font-family:'Space Mono',monospace;font-size:11px;cursor:not-allowed;transition:all .25s;letter-spacing:.04em;}
      #btn-informe-cc.listo{color:#00ff9d;border-color:rgba(0,255,157,.45);background:rgba(0,255,157,.1);cursor:pointer;animation:ccInfPulse 2.5s ease-in-out infinite;}
      #btn-informe-cc.listo:hover{background:rgba(0,255,157,.2);border-color:#00ff9d;transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,255,157,.3);animation:none;}
      #btn-informe-cc.descargando{color:#00e5ff;border-color:rgba(0,229,255,.45);background:rgba(0,229,255,.1);cursor:default;animation:none;}
      @keyframes ccInfPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,255,157,.3);}50%{box-shadow:0 0 0 6px rgba(0,255,157,0);}}
      #btn-informe-cc .cc-idot{width:6px;height:6px;border-radius:50%;background:rgba(0,255,157,.3);flex-shrink:0;transition:background .25s;}
      #btn-informe-cc.listo .cc-idot{background:#00ff9d;box-shadow:0 0 6px rgba(0,255,157,.6);animation:ccDotBlink 1.2s infinite;}
      #btn-informe-cc.descargando .cc-idot{background:#00e5ff;animation:none;}
      @keyframes ccDotBlink{0%,100%{opacity:1}50%{opacity:.3}}
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'btn-informe-cc';
    btn.innerHTML = `<span class="cc-idot"></span><span>📄</span><span class="cc-itxt">Descargar Informe</span>`;
    btn.title = 'Calcule primero para generar el informe';
    btn.disabled = true;

    btn.addEventListener('click', () => {
      if (!informe.listo) return;
      btn.classList.remove('listo');
      btn.classList.add('descargando');
      btn.querySelector('.cc-itxt').textContent = 'Generando PDF...';
      btn.disabled = true;

      setTimeout(() => {
        cargarJsPDF(() => {
          try {
            informe.datos = leerDatos();
            generarPDF();
            btn.querySelector('.cc-itxt').textContent = '¡Descargado!';
            setTimeout(() => {
              btn.classList.remove('descargando');
              btn.classList.add('listo');
              btn.querySelector('.cc-itxt').textContent = 'Descargar Informe';
              btn.disabled = false;
            }, 2000);
          } catch (err) {
            console.error('Error generando PDF CC:', err, err?.stack);
            btn.classList.remove('descargando');
            btn.classList.add('listo');
            btn.querySelector('.cc-itxt').textContent = 'Descargar Informe';
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
        // Verificar con el ID real del HTML
        const nInt = document.getElementById('res_Nint')?.textContent?.trim();
        if (nInt && nInt !== '—') {
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