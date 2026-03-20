/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   INFORME DMF — Diagrama de Momento Flector                     ║
 * ║   IngeLAB 3D · informe_momento.js                               ║
 * ║   Se actualiza automáticamente con cada cálculo                 ║
 * ║   Descarga PDF profesional con diagrama incluido                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * DEPENDENCIA: jsPDF (se carga automáticamente desde CDN)
 * INSTALACIÓN: agregar antes de </body> en momento.html:
 *   <script src="../js/informe_momento.js"></script>
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

    const seccion = v('inp_seccion');
    const tipoSec = seccion === 'rect' ? 'Rectangular H.A.' : seccion === 'T' ? 'T-Beam H.A.' : 'Perfil IPE';

    return {
      fecha: new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
      hora: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
      // Inputs
      tipo_viga: v('inp_tipo') === 'simple' ? 'Simplemente Apoyada' : 'Voladizo (Cantilever)',
      L: v('inp_L') + ' m',
      tipo_seccion: tipoSec,
      b: v('inp_b') + ' m',
      h: v('inp_h') + ' m',
      fc: v('inp_fc') + ' MPa',
      ipe: v('inp_ipe'),
      // Resultados
      RA: g('res_RA'),
      RB: g('res_RB'),
      Mmax: g('res_Mmax'),
      xMmax: g('res_xMmax'),
      Mmin: g('res_Mmin'),
      ceros: g('res_ceros'),
      I: g('res_I'),
      W: g('res_W'),
      E: g('res_E'),
      EI: g('res_EI'),
      sigma_max: g('res_sigma'),
      sigma_adm: g('res_sigma_adm'),
      DCR: g('res_DCR'),
      delta: g('res_delta'),
      xdelta: g('res_xdelta'),
      Ldelta: g('res_Ldelta'),
      verifTitulo: g('verifTitle'),
      verifSub: g('verifSub'),
      cumple: document.getElementById('verifBox')?.classList.contains('ok') ?? false,
    };
  }

  /* ═══════════════════════════════════════════
     CAPTURAR CANVAS COMO IMAGEN
  ═══════════════════════════════════════════ */
  function capturarCanvas(id) {
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    try { return canvas.toDataURL('image/png'); } catch { return null; }
  }

  /* ═══════════════════════════════════════════
     COLORES DEL TEMA
  ═══════════════════════════════════════════ */
  const C = {
    bg:       [8,  12, 16],
    bg2:      [13, 17, 23],
    card:     [15, 21, 32],
    accent:   [255, 71, 87],
    accentL:  [255, 107, 53],
    cyan:     [0,  229, 255],
    green:    [0,  255, 157],
    text:     [232, 237, 245],
    text2:    [139, 149, 168],
    text3:    [61,  71, 88],
    white:    [255, 255, 255],
    border:   [30,  38, 50],
  };

  /* ═══════════════════════════════════════════
     GENERAR PDF
  ═══════════════════════════════════════════ */
  function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const d = informe.datos;

    const PW = 210; // ancho A4
    const PH = 297; // alto A4
    const M  = 15;  // margen
    const CW = PW - M * 2; // ancho útil
    let y = 0;

    /* ── helpers ── */
    const rgb  = (col) => doc.setTextColor(...col);
    const fill = (col) => doc.setFillColor(...col);
    const draw = (col) => doc.setDrawColor(...col);
    const rect = (x, ry, w, h, r = 0) => doc.roundedRect(x, ry, w, h, r, r, 'F');
    const line = (x1, y1, x2, y2) => doc.line(x1, y1, x2, y2);

    /* ══════════════════════════════════
       PÁGINA 1
    ══════════════════════════════════ */

    // ── Fondo total ──
    fill(C.bg); rect(0, 0, PW, PH);

    // ── Header band ──
    fill(C.bg2); rect(0, 0, PW, 44);
    fill(C.accent); rect(0, 0, 4, 44);

    // Logo + badge DMF en la misma línea
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    rgb(C.accent);
    doc.text('INGELAB 3D', M + 2, 10);

    fill(C.card);
    doc.setDrawColor(...C.accent);
    doc.roundedRect(M + 2, 13, 14, 6, 1.5, 1.5, 'FD');
    doc.setFontSize(6.5);
    rgb(C.accent);
    doc.text('DMF', M + 9, 17.5, { align: 'center' });

    // Título principal — fuente más pequeña para que no se corte
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    rgb(C.white);
    doc.text('DIAGRAMA DE MOMENTO FLECTOR', M + 20, 22);

    // Subtítulo
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text('Informe tecnico de analisis estructural  |  ACI 318-19  |  NCh 430', M + 20, 29);

    // Fecha
    doc.setFontSize(7.5);
    rgb(C.text3);
    doc.text(`Generado: ${d.fecha}  |  ${d.hora}`, M + 20, 36);

    // Línea decorativa
    fill(C.accent);
    rect(M, 41, CW * 0.35, 1.5, 1);
    fill(C.accentL);
    rect(M + CW * 0.35, 41, CW * 0.12, 1.5, 1);

    // Badge CUMPLE/NO CUMPLE — más compacto, esquina superior derecha
    const badgeW = 36;
    const badgeX = PW - M - badgeW;
    fill(d.cumple ? [0, 35, 20] : [38, 8, 12]);
    doc.setDrawColor(...(d.cumple ? C.green : C.accent));
    doc.roundedRect(badgeX, 8, badgeW, 16, 2, 2, 'FD');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.green : C.accent);
    doc.text(d.cumple ? 'CUMPLE' : 'NO CUMPLE', badgeX + badgeW / 2, 15, { align: 'center' });
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text(`DCR = ${d.DCR}`, badgeX + badgeW / 2, 21, { align: 'center' });

    y = 50;

    /* ── Sección: Datos de entrada ── */
    function seccionTitulo(titulo, color = C.cyan) {
      fill(C.card);
      rect(M, y, CW, 8, 2);
      fill(color);
      rect(M, y, 3, 8, 1);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      rgb(color);
      doc.text(titulo.toUpperCase(), M + 7, y + 5.5);
      y += 12;
    }

    function fila(label, valor, col1 = 85, destacado = false) {
      fill(C.bg2);
      rect(M, y, CW, 7, 1);
      draw(C.border);
      doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, CW, 7, 1, 1, 'FD');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      rgb(C.text2);
      doc.text(label, M + 4, y + 5);
      doc.setFont('helvetica', destacado ? 'bold' : 'normal');
      rgb(destacado ? C.accent : C.text);
      doc.text(String(valor), M + col1, y + 5);
      y += 8;
    }

    function filaDos(label1, val1, label2, val2) {
      fill(C.bg2);
      draw(C.border);
      doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, CW / 2 - 2, 7, 1, 1, 'FD');
      doc.roundedRect(M + CW / 2 + 2, y, CW / 2 - 2, 7, 1, 1, 'FD');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      rgb(C.text2);
      doc.text(label1, M + 4, y + 5);
      rgb(C.text);
      doc.text(String(val1), M + 45, y + 5);
      rgb(C.text2);
      doc.text(label2, M + CW / 2 + 6, y + 5);
      rgb(C.text);
      doc.text(String(val2), M + CW / 2 + 47, y + 5);
      y += 8;
    }

    /* DATOS DE ENTRADA */
    seccionTitulo('Datos de entrada', C.cyan);
    filaDos('Tipo de viga', d.tipo_viga, 'Longitud L', d.L);
    filaDos('Tipo de sección', d.tipo_seccion, d.tipo_seccion === 'Perfil IPE' ? 'Perfil' : 'f\'c hormigón', d.tipo_seccion === 'Perfil IPE' ? d.ipe : d.fc);
    if (d.tipo_seccion !== 'Perfil IPE') {
      filaDos('Ancho b', d.b, 'Alto h', d.h);
    }
    y += 4;

    /* REACCIONES */
    seccionTitulo('Reacciones en apoyos', C.cyan);
    filaDos('Reaccion R_A', d.RA, 'Reaccion R_B', d.RB);
    y += 4;

    /* MOMENTO FLECTOR */
    seccionTitulo('Momento Flector', C.accent);
    fila('Momento maximo M_max (+)', d.Mmax, 85, true);
    fila('Posicion x @ M_max', d.xMmax);
    fila('Momento minimo M_min (-)', d.Mmin);
    fila('Puntos donde M(x) = 0', d.ceros);
    y += 4;

    /* PROPIEDADES DE SECCIÓN */
    seccionTitulo('Propiedades de Seccion', C.cyan);
    filaDos('Momento de inercia I', d.I, 'Modulo resistente W', d.W);
    filaDos('Modulo elasticidad E', d.E, 'Rigidez EI', d.EI);
    y += 4;

    /* TENSIONES */
    seccionTitulo('Tensiones de Flexion', C.accent);
    filaDos('Tension maxima (sigma_max)', d.sigma_max, 'Tension admisible (sigma_adm)', d.sigma_adm);
    fila('DCR (Demand/Capacity Ratio)', d.DCR, 85, true);
    y += 4;

    /* DEFORMACIÓN */
    seccionTitulo('Deformacion', C.cyan);
    filaDos('Flecha maxima (delta_max)', d.delta, 'Posicion @ delta_max', d.xdelta);
    fila('Relacion L/delta (verificacion servicio)', d.Ldelta);
    y += 4;

    /* VERIFICACIÓN FINAL */
    fill(d.cumple ? [0, 35, 22] : [38, 8, 12]);
    draw(d.cumple ? C.green : C.accent);
    doc.setDrawColor(...(d.cumple ? C.green : C.accent));
    doc.roundedRect(M, y, CW, 18, 3, 3, 'FD');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    rgb(d.cumple ? C.green : C.accent);
    doc.text(d.verifTitulo, M + CW / 2, y + 8, { align: 'center' });
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    rgb(C.text2);
    doc.text(d.verifSub, M + CW / 2, y + 14, { align: 'center' });
    y += 24;

    /* NORMATIVA */
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    rgb(C.text3);
    const normas = ['NCh 430:2008', 'ACI 318-19', 'AISC 360-22', 'NCh 1537:2009'];
    let nx = M;
    normas.forEach(n => {
      fill(C.card);
      draw(C.border);
      doc.setDrawColor(...C.border);
      const tw = doc.getTextWidth(n) + 6;
      doc.roundedRect(nx, y, tw, 6, 1, 1, 'FD');
      rgb(C.text3);
      doc.text(n, nx + 3, y + 4.3);
      nx += tw + 3;
    });
    y += 12;

    /* ══════════════════════════════════════
       PÁGINA 2 — DIAGRAMAS
    ══════════════════════════════════════ */
    doc.addPage();
    fill(C.bg); rect(0, 0, PW, PH);
    fill(C.bg2); rect(0, 0, PW, 20);
    fill(C.accent); rect(0, 0, 4, 20);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    rgb(C.accent);
    doc.text('INGELAB 3D', M + 2, 8);
    rgb(C.text2);
    doc.setFont('helvetica', 'normal');
    doc.text('Diagrama de Momento Flector — Representación gráfica', M + 2, 15);

    y = 28;

    /* Canvas principal — DMF */
    const imgMain = capturarCanvas('canvasMain');
    if (imgMain) {
      // Título del diagrama
      fill(C.card);
      rect(M, y, CW, 7, 2);
      fill(C.accent); rect(M, y, 3, 7, 1);
      doc.setFontSize(8); doc.setFont('helvetica', 'bold');
      rgb(C.cyan);
      doc.text('DIAGRAMA DE MOMENTO FLECTOR M(x)', M + 7, y + 5);
      y += 10;

      // Canvas como imagen
      const canvas = document.getElementById('canvasMain');
      const ratio = canvas.width / canvas.height;
      const imgW = CW;
      const imgH = imgW / ratio;
      fill(C.bg2);
      draw(C.border);
      doc.setDrawColor(...C.border);
      doc.roundedRect(M, y, imgW, imgH, 3, 3, 'FD');
      doc.addImage(imgMain, 'PNG', M, y, imgW, imgH);
      y += imgH + 6;
    }

    /* Canvas sección + deformada en paralelo */
    const imgSec   = capturarCanvas('canvasSeccion');
    const imgDeform = capturarCanvas('canvasDeform');
    const halfW = (CW - 6) / 2;

    if (imgSec || imgDeform) {
      // Títulos
      if (imgSec) {
        fill(C.card); rect(M, y, halfW, 7, 2);
        fill(C.cyan); rect(M, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold');
        rgb(C.cyan);
        doc.text('SECCIÓN TRANSVERSAL', M + 7, y + 5);
      }
      if (imgDeform) {
        fill(C.card); rect(M + halfW + 6, y, halfW, 7, 2);
        fill([192, 132, 252]); rect(M + halfW + 6, y, 3, 7, 1);
        doc.setFontSize(7); doc.setFont('helvetica', 'bold');
        rgb([192, 132, 252]);
        doc.text('DEFORMADA (amplif.)', M + halfW + 13, y + 5);
      }
      y += 10;

      const subH = 45;
      if (imgSec) {
        fill(C.bg2); draw(C.border);
        doc.roundedRect(M, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgSec, 'PNG', M, y, halfW, subH);
      }
      if (imgDeform) {
        fill(C.bg2); draw(C.border);
        doc.roundedRect(M + halfW + 6, y, halfW, subH, 2, 2, 'FD');
        doc.addImage(imgDeform, 'PNG', M + halfW + 6, y, halfW, subH);
      }
      y += subH + 8;
    }

    /* Resumen de fórmulas */
    const fmlBoxH = 42;
    fill(C.card); draw(C.border);
    doc.setDrawColor(...C.border);
    doc.roundedRect(M, y, CW, fmlBoxH, 3, 3, 'FD');
    fill(C.accent); rect(M, y, 3, fmlBoxH, 1);

    doc.setFontSize(7.5); doc.setFont('helvetica', 'bold');
    rgb(C.accent);
    doc.text('RELACIONES FUNDAMENTALES', M + 7, y + 7);

    const formulas = [
      { f: 'd2M/dx2 = -q(x)', d: 'La carga distribuida es la 2da derivada del momento' },
      { f: 'V(x) = dM/dx',    d: 'El cortante es la derivada del momento' },
      { f: 'EI·y" = M(x)',    d: 'Ecuacion diferencial de la viga (deformada)' },
      { f: 'sigma = M / W',   d: 'Tension de flexion (Formula de Navier)' },
    ];

    const fBoxW = 38; // ancho del box de la fórmula
    let fy2 = y + 13;
    formulas.forEach(item => {
      fill([20, 28, 42]);
      doc.setDrawColor(50, 20, 30);
      doc.roundedRect(M + 5, fy2, fBoxW, 5.5, 1, 1, 'FD');
      doc.setFontSize(7); doc.setFont('helvetica', 'bold');
      rgb(C.accent);
      doc.text(item.f, M + 5 + fBoxW / 2, fy2 + 4, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      rgb(C.text2);
      doc.text(item.d, M + 5 + fBoxW + 4, fy2 + 4);
      fy2 += 7;
    });

    y += 44;

    /* Footer ambas páginas */
    [1, 2].forEach(pg => {
      doc.setPage(pg);
      fill(C.bg2); rect(0, PH - 12, PW, 12);
      fill(C.accent); rect(0, PH - 12, 4, 12);
      doc.setFontSize(7); doc.setFont('helvetica', 'normal');
      rgb(C.text3);
      doc.text('IngeLAB 3D · Software educativo de ingeniería estructural', M, PH - 5);
      doc.text(`Página ${pg} de 2`, PW - M, PH - 5, { align: 'right' });
      rgb(C.text3);
      doc.text('Nota: Herramienta educativa. Para proyectos reales consultar con Ingeniero Civil Estructural.', M + CW / 2, PH - 5, { align: 'center' });
    });

    /* Guardar */
    const fecha = new Date().toISOString().slice(0, 10);
    doc.save(`InformeDMF_IngeLAB_${fecha}.pdf`);
  }

  /* ═══════════════════════════════════════════
     INYECTAR BOTÓN EN EL TOPBAR
  ═══════════════════════════════════════════ */
  function injectBoton() {
    // Estilos del botón
    const style = document.createElement('style');
    style.textContent = `
      #btn-informe {
        display: flex; align-items: center; gap: 7px;
        background: rgba(0,229,255,.08);
        border: 1px solid rgba(0,229,255,.2);
        border-radius: 6px;
        padding: 8px 14px;
        color: rgba(0,229,255,.4);
        font-family: 'Space Mono', monospace;
        font-size: 11px;
        cursor: not-allowed;
        transition: all .25s;
        letter-spacing: .04em;
        position: relative;
        overflow: hidden;
      }
      #btn-informe.listo {
        color: #00e5ff;
        border-color: rgba(0,229,255,.45);
        background: rgba(0,229,255,.1);
        cursor: pointer;
        animation: informePulse 2.5s ease-in-out infinite;
      }
      #btn-informe.listo:hover {
        background: rgba(0,229,255,.2);
        border-color: #00e5ff;
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(0,229,255,.3);
        animation: none;
      }
      #btn-informe.descargando {
        color: #00ff9d;
        border-color: rgba(0,255,157,.45);
        background: rgba(0,255,157,.1);
        cursor: default;
        animation: none;
      }
      @keyframes informePulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(0,229,255,.3); }
        50%       { box-shadow: 0 0 0 6px rgba(0,229,255,.0); }
      }
      #btn-informe .inf-icon { font-size: 14px; flex-shrink: 0; }
      #btn-informe .inf-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: rgba(0,229,255,.3);
        flex-shrink: 0; transition: background .25s;
      }
      #btn-informe.listo .inf-dot {
        background: #00e5ff;
        box-shadow: 0 0 6px rgba(0,229,255,.6);
        animation: dotBlink 1.2s infinite;
      }
      #btn-informe.descargando .inf-dot { background: #00ff9d; animation: none; }
      @keyframes dotBlink { 0%,100%{opacity:1} 50%{opacity:.3} }
    `;
    document.head.appendChild(style);

    // Botón
    const btn = document.createElement('button');
    btn.id = 'btn-informe';
    btn.innerHTML = `<span class="inf-dot"></span><span class="inf-icon">📄</span><span class="inf-txt">Descargar Informe</span>`;
    btn.title = 'Calcule primero para generar el informe';
    btn.disabled = true;

    btn.addEventListener('click', () => {
      if (!informe.listo) return;
      btn.classList.remove('listo');
      btn.classList.add('descargando');
      btn.querySelector('.inf-txt').textContent = 'Generando PDF...';
      btn.disabled = true;

      // Pequeño delay para que el usuario vea el feedback
      setTimeout(() => {
        cargarJsPDF(() => {
          try {
            informe.datos = leerDatos();
            generarPDF();
            btn.querySelector('.inf-txt').textContent = '¡Descargado!';
            setTimeout(() => {
              btn.classList.remove('descargando');
              btn.classList.add('listo');
              btn.querySelector('.inf-txt').textContent = 'Descargar Informe';
              btn.disabled = false;
            }, 2000);
          } catch (err) {
            console.error('Error generando PDF:', err);
            btn.classList.remove('descargando');
            btn.classList.add('listo');
            btn.querySelector('.inf-txt').textContent = 'Descargar Informe';
            btn.disabled = false;
          }
        });
      }, 200);
    });

    // Insertar antes del botón Reset en el topbar
    const btnReset = document.getElementById('btnReset');
    if (btnReset) {
      btnReset.parentElement.insertBefore(btn, btnReset);
    }

    return btn;
  }

  /* ═══════════════════════════════════════════
     INTERCEPTAR EL BOTÓN CALCULAR
     Cada vez que el usuario calcula → actualizar informe
  ═══════════════════════════════════════════ */
  function interceptarCalculo(btnInforme) {
    const btnCalc = document.getElementById('btnCalc');
    if (!btnCalc) return;

    btnCalc.addEventListener('click', () => {
      // Esperar a que termine el cálculo y el DOM se actualice
      setTimeout(() => {
        // Verificar que hay resultados reales (no "—")
        const mmax = document.getElementById('res_Mmax')?.textContent?.trim();
        if (mmax && mmax !== '—') {
          informe.listo = true;
          informe.datos = leerDatos();
          btnInforme.classList.add('listo');
          btnInforme.disabled = false;
          btnInforme.title = 'Informe listo para descargar';
        }
      }, 500);
    });

    // También interceptar los casos típicos
    document.querySelectorAll('.caso-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          const mmax = document.getElementById('res_Mmax')?.textContent?.trim();
          if (mmax && mmax !== '—') {
            informe.listo = true;
            informe.datos = leerDatos();
            btnInforme.classList.add('listo');
            btnInforme.disabled = false;
            btnInforme.title = 'Informe listo para descargar';
          }
        }, 600);
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