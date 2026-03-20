/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ASISTENTE DFA — Diagrama de Fuerza Axial                     ║
 * ║   IngeLAB 3D · axial.html                                      ║
 * ║   Detecta acciones del usuario y guía paso a paso              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en axial.html:
 *   <script src="../js/asistente/asistente_axial.js"></script>
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     PASOS DEL WIZARD
  ═══════════════════════════════════════════ */
  const PASOS = [
    {
      id: 'bienvenida',
      siguiente: 'longitud',
      autoAvanzar: false,
      mensaje: `¡Hola! Soy tu **Profesor Virtual de Fuerza Axial**. 🏛️\n\nTe guiaré paso a paso para calcular el **Diagrama de Fuerza Axial N(x)**.\n\nEste módulo te permite:\n• Calcular N(x) en columnas y pilares\n• Verificar pandeo (Euler) y esbeltez\n• Revisar si el elemento cumple ACI 318 / AISC\n\n¿Listo para comenzar?`,
      botonTexto: 'Sí, ¡empecemos! →',
      tip: null,
    },
    {
      id: 'longitud',
      siguiente: 'condicion',
      autoAvanzar: true,
      mensaje: `**Paso 1 — Longitud del elemento** 📏\n\nIngresa la longitud **L** del pilar o barra axial.\n\n**Rangos típicos:**\n• Columna de entrepiso: 2.7 a 4.0 m\n• Pilar de puente: 5 a 15 m\n• Barra de armadura: 1 a 8 m\n\n👆 Ingresa la longitud en el campo **"L [m]"** del panel izquierdo.`,
      highlight: 'inp_L',
      tip: '💡 A mayor longitud → mayor riesgo de pandeo. La esbeltez λ = L_ef / r controla este fenómeno.',
      botonTexto: '✅ Ya ingresé la longitud → Siguiente',
    },
    {
      id: 'condicion',
      siguiente: 'material',
      autoAvanzar: true,
      mensaje: `**Paso 2 — Condición de apoyo (β)** 🔒\n\nEl factor β define cómo está fijado el elemento en sus extremos y controla la longitud efectiva de pandeo **L_ef = β · L**:\n\n• **β = 0.5** → Empotrado-empotrado (más rígido)\n• **β = 0.7** → Empotrado-articulado\n• **β = 1.0** → Articulado-articulado (pin-pin)\n• **β = 1.2** → Empotrado-libre parcial\n• **β = 2.0** → Empotrado-libre (voladizo, más flexible)\n\n👆 Selecciona la condición de apoyo.`,
      highlight: 'inp_beta',
      tip: '💡 Una columna empotrada en ambos extremos (β=0.5) resiste 4 veces más carga de pandeo que una articulada (β=1.0).',
      botonTexto: '✅ Ya seleccioné el apoyo → Siguiente',
    },
    {
      id: 'material',
      siguiente: 'seccion',
      autoAvanzar: true,
      mensaje: `**Paso 3 — Material** 🧱\n\nSelecciona el material del elemento:\n\n**Hormigón Armado (H.A.):**\nVerificación ACI 318: σ_c ≤ 0.45·f'c\nE_c = 4700·√f'c\n\n**Acero estructural:**\nVerificación AISC 360: σ ≤ fy / γM0\nE = 200,000 MPa (constante)\n\n**Madera:**\nVerificación según resistencia admisible\nE = 7,000 a 12,000 MPa según especie\n\n👆 Selecciona el material.`,
      highlight: 'inp_material',
      tip: '💡 El acero tiene E 8 veces mayor que el hormigón → mucho más rígido para pandeo con igual sección.',
      botonTexto: '✅ Ya seleccioné el material → Siguiente',
    },
    {
      id: 'seccion',
      siguiente: 'cargas',
      autoAvanzar: true,
      mensaje: `**Paso 4 — Sección transversal** 🔲\n\nDefine la forma de la sección:\n\n**Rectangular:** b × h — la más común en H.A.\n**Circular:** diámetro D — columnas circulares\n**HEA (acero):** perfiles laminados europeos\n\n**Dimensiones orientativas:**\n• Columna residencial: 0.30×0.30 a 0.40×0.40 m\n• Columna de edificio: 0.40×0.40 a 0.60×0.60 m\n• Pilote: 0.40 a 0.80 m diámetro\n\n👆 Selecciona el tipo de sección e ingresa sus dimensiones.`,
      highlight: 'inp_seccion',
      tip: '💡 Radio de giro r = √(I/A). A mayor r → menor esbeltez → mayor resistencia al pandeo.',
      botonTexto: '✅ Ya definí la sección → Siguiente',
    },
    {
      id: 'cargas',
      siguiente: 'calcular',
      autoAvanzar: true,
      mensaje: `**Paso 5 — Cargas axiales** ⬇️\n\nIngresa las cargas que actúan sobre el elemento:\n\n• **Compresión (-):** carga gravitacional, peso de pisos superiores\n• **Tracción (+):** tensión en tirantes, barras de armadura\n• **Peso propio:** activa el checkbox para incluirlo automáticamente\n\n**Combinación de diseño NCh 1537:**\nN_u = 1.2·D + 1.6·L\n\n👆 Agrega las cargas axiales y activa el peso propio si corresponde.`,
      highlight: 'inp_pp',
      tip: '💡 En columnas de edificio, el 60-70% de la carga axial suele ser carga muerta (D). Incluye siempre el peso propio.',
      botonTexto: '✅ Ya ingresé las cargas → Siguiente',
    },
    {
      id: 'calcular',
      siguiente: 'interpretar',
      autoAvanzar: false,
      mensaje: `**¡Todo listo!** Tienes los datos ingresados. 🎯\n\nHaz clic en **"⚡ Calcular"** en la barra superior.\n\nEl sistema calculará:\n• Diagrama N(x) completo\n• Tensión normal σ = N/A\n• Deformación axial δ = N·L/(E·A)\n• Esbeltez λ y verificación pandeo\n• Carga crítica de Euler N_cr`,
      botonTexto: '▶ Ya calculé → Ver resultados',
      tip: null,
    },
    {
      id: 'interpretar',
      siguiente: 'fin',
      autoAvanzar: false,
      mensaje: `**Paso 6 — Interpretar resultados** 📊\n\nRevisa el panel derecho:\n\n**Diagrama N(x):**\n• Azul → compresión\n• Rojo → tracción\n\n**DCR = N / φPn:**\n• DCR < 1.0 ✅ → Elemento cumple\n• DCR > 1.0 ❌ → Aumentar sección o f'c\n\n**Pandeo:**\n• λ ≤ λ_max ✅ → No hay riesgo de pandeo\n• N_cr → carga crítica de Euler (nunca superar)\n\n👆 Observa los 4 diagramas: axial, sección, pandeo y celosía.`,
      botonTexto: '✅ Entendido → Finalizar',
      tip: null,
    },
    {
      id: 'fin',
      siguiente: null,
      autoAvanzar: false,
      mensaje: `**¡Excelente trabajo!** 🎉\n\nHas completado el análisis de Fuerza Axial. Si el DCR salió en rojo:\n\n**Para reducir el DCR (compresión):**\n1. Aumentar b y h de la sección\n2. Aumentar f'c (hormigón) o fy (acero)\n3. Reducir la longitud efectiva (mejorar empotramiento)\n4. Agregar arriostramiento lateral\n\n**Para reducir la esbeltez λ:**\n1. Reducir L_ef → cambiar condición de apoyo\n2. Aumentar r → secciones más "gruesas"\n\n¿Tienes alguna duda? Escríbeme aquí abajo 👇`,
      botonTexto: '↺ Reiniciar guía desde el inicio',
    },
  ];

  /* ═══════════════════════════════════════════
     PREGUNTAS FRECUENTES
  ═══════════════════════════════════════════ */
  const QA = [
    { k: ['fuerza axial','diagrama axial','dfa','n(x)','qué es n'], r: `El **Diagrama de Fuerza Axial N(x)** muestra cómo varía la fuerza interna axial a lo largo del elemento.\n\n• **N > 0 (tracción):** el elemento se estira — rojo\n• **N < 0 (compresión):** el elemento se aplasta — azul\n\nUnidades: kN\nFórmula: σ = N / A (tensión normal)` },
    { k: ['pandeo','euler','ncr','carga critica','inestabilidad'], r: `**Pandeo de Euler:**\nN_cr = π² · E · I / L_ef²\n\nEs la carga máxima teórica antes de que el elemento falle por inestabilidad lateral.\n\n⚠️ Nunca aplicar una carga mayor a N_cr — el elemento colapsa.\n\n**Factor de seguridad típico:** N_u ≤ 0.6 · N_cr` },
    { k: ['esbeltez','lambda','relacion esbeltez','kl/r'], r: `**Esbeltez λ = L_ef / r**\n\nDonde r = √(I/A) es el radio de giro.\n\n**Límites:**\n• λ ≤ 120 → columnas H.A. (ACI 318)\n• λ ≤ 200 → elementos de acero traccionados\n• λ ≤ 150 → elementos de acero comprimidos\n\nA mayor esbeltez → mayor riesgo de pandeo.` },
    { k: ['beta','condicion apoyo','longitud efectiva','lef'], r: `**Factor β — Condición de apoyo:**\n\n• β = 0.5 → Empotrado-empotrado\n• β = 0.7 → Empotrado-articulado\n• β = 1.0 → Articulado-articulado (pin-pin)\n• β = 2.0 → Empotrado-libre (voladizo)\n\nL_ef = β × L\nN_cr es inversamente proporcional a L_ef²` },
    { k: ['dcr','cumple','no cumple','falla','phi pn'], r: `**DCR = N_actuante / φPn**\n\n• DCR < 1.0 ✅ → El elemento cumple, tiene reserva\n• DCR = 1.0 → Exactamente al límite\n• DCR > 1.0 ❌ → Falla, rediseñar\n\n**φPn para H.A. (ACI 318):**\nφPn = 0.65 × 0.80 × (0.85·f'c·Ag + fy·Ast)` },
    { k: ['deformacion axial','delta','alargamiento','acortamiento'], r: `**Deformación axial δ:**\nδ = N · L / (E · A)\n\n• δ > 0 → alargamiento (tracción)\n• δ < 0 → acortamiento (compresión)\n\nEn columnas de edificio, el acortamiento acumulado puede ser significativo en edificios altos (efecto de acortamiento de columnas).` },
    { k: ['tension','sigma','tension normal','esfuerzo'], r: `**Tensión normal σ = N / A**\n\n**Límites ACI 318 (H.A.):**\n• Compresión: σ_c ≤ 0.45 · f'c\n• Para f'c=25 MPa → σ_adm = 11.25 MPa\n\n**AISC 360 (acero):**\n• σ ≤ fy / γM0 (γM0 = 1.0 para acero)\n\nSi σ > σ_adm → aumentar sección o resistencia del material.` },
    { k: ['celosia','armadura','metodo nodos','barras'], r: `**Celosía plana (método de nodos):**\nCada barra recibe solo fuerza axial (tracción o compresión).\n\n**Método de nodos:**\nΣFx = 0 y ΣFy = 0 en cada nodo.\n\n• Barra azul → compresión\n• Barra roja → tracción\n• Barra gris → barra nula (N ≈ 0)\n\nLas barras nulas existen para dar estabilidad a la estructura.` },
    { k: ['seccion','radio de giro','inercia','area'], r: `**Propiedades de sección:**\n\n• **A:** área transversal [m²]\n• **I:** momento de inercia [m⁴]\n• **r = √(I/A):** radio de giro [m]\n\n**Sección rectangular:**\n• A = b×h\n• I = b×h³/12\n• r = h/√12 ≈ 0.289·h\n\nA mayor r → menor esbeltez → más resistente al pandeo.` },
    { k: ['normativa','aci','aisc','nch','norma'], r: `**Normativa aplicada:**\n\n🇨🇱 **NCh 430:2008** → H.A. Chile\n🇨🇱 **NCh 1537:2009** → Cargas de diseño\n🇺🇸 **ACI 318-19** → Diseño columnas H.A.\n🇺🇸 **AISC 360-22** → Acero estructural\n🇪🇺 **EC3** → Perfiles europeos HEA\n\nNota: Herramienta educativa. Para proyectos reales consultar con Ingeniero Civil Estructural.` },
    { k: ['peso propio','pp','peso del elemento'], r: `El **peso propio** es la carga gravitacional del propio elemento.\n\n**Cálculo:** W_pp = γ × A × L\n\n• γ_hormigón = 25 kN/m³\n• γ_acero = 78.5 kN/m³\n• γ_madera ≈ 5-8 kN/m³\n\nActiva el toggle "Peso propio" para incluirlo automáticamente en el cálculo.` },
  ];

  function respuestaLibre(q) {
    const texto = q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let mejor = null, maxScore = 0;
    for (const item of QA) {
      let score = 0;
      for (const k of item.k) if (texto.includes(k)) score += k.length;
      if (score > maxScore) { maxScore = score; mejor = item; }
    }
    return maxScore > 0 ? mejor.r : null;
  }

  const estado = { pasoActual: 0, iniciado: false, avanzando: false };

  function injectStyles() {
    const s = document.createElement('style');
    s.textContent = `
      #dfa-fab{position:fixed;bottom:24px;right:24px;z-index:9999;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#00e5ff,#0077ff);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(0,229,255,.4);display:flex;align-items:center;justify-content:center;font-size:22px;transition:transform .2s,box-shadow .2s;}
      #dfa-fab:hover{transform:scale(1.12);box-shadow:0 6px 28px rgba(0,229,255,.6);}
      #dfa-fab.open{background:linear-gradient(135deg,#ff4757,#ff6b35);}
      #dfa-panel{position:fixed;bottom:84px;right:24px;z-index:9998;width:360px;max-height:540px;background:#0d1117;border:1px solid rgba(0,229,255,.2);border-radius:14px;display:flex;flex-direction:column;box-shadow:0 12px 48px rgba(0,0,0,.6);transform:scale(.95) translateY(10px);opacity:0;pointer-events:none;transition:all .25s cubic-bezier(.4,0,.2,1);}
      #dfa-panel.visible{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
      #dfa-header{display:flex;align-items:center;gap:10px;padding:14px 16px 10px;border-bottom:1px solid rgba(255,255,255,.07);}
      #dfa-header .dfa-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#00e5ff,#0077ff);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
      #dfa-header .dfa-title strong{display:block;font-size:13px;color:#e8edf5;font-family:'Space Mono',monospace;}
      #dfa-header .dfa-title span{font-size:10px;color:#3d4758;font-family:'Space Mono',monospace;}
      #dfa-prog{height:3px;background:rgba(255,255,255,.07);margin:0 16px 10px;}
      #dfa-prog-bar{height:100%;background:linear-gradient(90deg,#00e5ff,#0077ff);border-radius:2px;transition:width .4s ease;}
      #dfa-msgs{flex:1;overflow-y:auto;padding:8px 12px;display:flex;flex-direction:column;gap:8px;scroll-behavior:smooth;}
      #dfa-msgs::-webkit-scrollbar{width:3px;}
      #dfa-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px;}
      .dfa-msg-bot{background:rgba(0,229,255,.06);border:1px solid rgba(0,229,255,.12);border-radius:10px 10px 10px 3px;padding:10px 12px;font-size:12px;color:#c8d0de;line-height:1.55;font-family:'DM Sans',sans-serif;}
      .dfa-msg-bot .dfa-paso-label{font-size:9px;color:#3d4758;font-family:'Space Mono',monospace;margin-bottom:4px;display:block;}
      .dfa-msg-bot strong{color:#00e5ff;}
      .dfa-msg-bot em{color:#0077ff;font-style:normal;}
      .dfa-action-btn{display:block;width:100%;margin-top:8px;padding:7px 12px;background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.25);border-radius:6px;color:#00e5ff;font-family:'Space Mono',monospace;font-size:11px;cursor:pointer;text-align:center;transition:all .2s;}
      .dfa-action-btn:hover{background:rgba(0,229,255,.16);border-color:#00e5ff;}
      .dfa-tip{margin-top:6px;padding:6px 10px;background:rgba(0,119,255,.06);border-left:2px solid rgba(0,119,255,.3);border-radius:0 6px 6px 0;font-size:11px;color:#8b95a8;font-family:'DM Sans',sans-serif;}
      .dfa-tip strong{color:#0077ff;}
      .dfa-msg-user{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px 10px 3px 10px;padding:8px 12px;font-size:12px;color:#8b95a8;align-self:flex-end;max-width:85%;font-family:'DM Sans',sans-serif;}
      .dfa-typing{display:flex;gap:4px;padding:10px 12px;background:rgba(0,229,255,.04);border:1px solid rgba(0,229,255,.08);border-radius:10px 10px 10px 3px;width:fit-content;}
      .dfa-typing span{width:6px;height:6px;background:#00e5ff;border-radius:50%;animation:dfaBounce .9s infinite;}
      .dfa-typing span:nth-child(2){animation-delay:.15s;}
      .dfa-typing span:nth-child(3){animation-delay:.3s;}
      @keyframes dfaBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
      #dfa-input-area{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,.07);}
      #dfa-input{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#e8edf5;font-family:'DM Sans',sans-serif;font-size:12px;outline:none;transition:border-color .2s;}
      #dfa-input:focus{border-color:rgba(0,229,255,.4);}
      #dfa-send{background:rgba(0,229,255,.1);border:1px solid rgba(0,229,255,.25);border-radius:8px;padding:8px 12px;color:#00e5ff;cursor:pointer;font-size:14px;transition:all .2s;flex-shrink:0;}
      #dfa-send:hover{background:rgba(0,229,255,.2);}
      .dfa-highlight-pulse{outline:2px solid #00e5ff !important;outline-offset:3px;animation:dfaPulseHL 1.5s ease-in-out 3;}
      @keyframes dfaPulseHL{0%,100%{outline-color:rgba(0,229,255,.3)}50%{outline-color:#00e5ff}}
    `;
    document.head.appendChild(s);
  }

  function buildDOM() {
    const fab = document.createElement('button');
    fab.id = 'dfa-fab';
    fab.title = 'Asistente de Fuerza Axial';
    fab.textContent = '🏛️';
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'dfa-panel';
    panel.innerHTML = `
      <div id="dfa-header">
        <div class="dfa-avatar">🏛️</div>
        <div class="dfa-title">
          <strong>Asistente DFA</strong>
          <span>Fuerza Axial · IngeLAB 3D</span>
        </div>
      </div>
      <div id="dfa-prog"><div id="dfa-prog-bar" style="width:0%"></div></div>
      <div id="dfa-msgs"></div>
      <div id="dfa-input-area">
        <input id="dfa-input" type="text" placeholder="Escribe tu duda aquí..." autocomplete="off"/>
        <button id="dfa-send">➤</button>
      </div>
    `;
    document.body.appendChild(panel);

    fab.addEventListener('click', () => {
      const open = panel.classList.toggle('visible');
      fab.classList.toggle('open', open);
      if (open && !estado.iniciado) {
        estado.iniciado = true;
        setTimeout(() => avanzarPaso(), 300);
      }
    });

    document.getElementById('dfa-send').addEventListener('click', () => {
      const inp = document.getElementById('dfa-input');
      const q = inp.value.trim();
      if (!q) return;
      inp.value = '';
      handleInput(q);
    });
    document.getElementById('dfa-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('dfa-send').click();
    });
  }

  function highlight(id) {
    const prev = document.querySelector('.dfa-highlight-pulse');
    if (prev) prev.classList.remove('dfa-highlight-pulse');
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('dfa-highlight-pulse');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => el.classList.remove('dfa-highlight-pulse'), 5000);
  }

  function md(t) {
    return t
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/•/g, '&bull;');
  }

  function addBotMsg(paso, soloTexto) {
    const msgs = document.getElementById('dfa-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dfa-msg-bot';

    if (!soloTexto) {
      const idx = PASOS.indexOf(paso);
      const label = idx === 0 ? 'Bienvenida' : idx === PASOS.length - 1 ? '¡Completado!' : `Paso ${idx} de ${PASOS.length - 2}`;
      wrap.innerHTML = `<span class="dfa-paso-label">${label}</span>${md(paso.mensaje)}`;

      if (paso.tip) {
        const tip = document.createElement('div');
        tip.className = 'dfa-tip';
        tip.innerHTML = md(paso.tip);
        wrap.appendChild(tip);
      }

      if (paso.botonTexto) {
        const btn = document.createElement('button');
        btn.className = 'dfa-action-btn';
        btn.textContent = paso.botonTexto;
        btn.setAttribute('data-paso-id', paso.id);
        btn.addEventListener('click', function () {
          this.disabled = true;
          this.style.opacity = '0.5';
          if (this.getAttribute('data-paso-id') === 'fin') { reiniciarGuia(); return; }
          avanzarPaso();
        });
        wrap.appendChild(btn);
      }
    } else {
      wrap.innerHTML = md(soloTexto);
    }

    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    if (paso && paso.highlight && !soloTexto) highlight(paso.highlight);
  }

  function addUserMsg(t) {
    const msgs = document.getElementById('dfa-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dfa-msg-user';
    wrap.textContent = t;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing(cb) {
    const msgs = document.getElementById('dfa-msgs');
    const el = document.createElement('div');
    el.className = 'dfa-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { el.remove(); cb(); }, 700);
  }

  function updateProg() {
    const total = PASOS.length - 1;
    const pct = Math.round((estado.pasoActual / total) * 100);
    const bar = document.getElementById('dfa-prog-bar');
    if (bar) bar.style.width = pct + '%';
  }

  function avanzarPaso() {
    if (estado.avanzando) return;
    estado.avanzando = true;
    const paso = PASOS[estado.pasoActual];
    typing(() => {
      addBotMsg(paso);
      updateProg();
      estado.avanzando = false;
      if (estado.pasoActual < PASOS.length - 1) estado.pasoActual++;
    });
  }

  function reiniciarGuia() {
    estado.pasoActual = 0;
    const msgs = document.getElementById('dfa-msgs');
    if (msgs) msgs.innerHTML = '';
    setTimeout(() => avanzarPaso(), 300);
  }

  function handleInput(query) {
    addUserMsg(query);
    const resp = respuestaLibre(query);
    typing(() => {
      if (resp) {
        addBotMsg(null, resp);
      } else {
        addBotMsg(null, `No tengo una respuesta específica para eso, pero puedo ayudarte con:\n\n• Pandeo de Euler y esbeltez λ\n• Condiciones de apoyo (factor β)\n• Verificación ACI 318 / AISC\n• Deformación axial δ = N·L/(E·A)\n• Celosía plana y método de nodos\n\n¿Puedes reformular tu pregunta?`);
      }
    });
  }

  function init() {
    injectStyles();
    buildDOM();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
