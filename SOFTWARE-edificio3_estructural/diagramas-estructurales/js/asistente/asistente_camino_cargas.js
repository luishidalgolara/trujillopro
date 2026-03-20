/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ASISTENTE CC — Camino de Cargas                               ║
 * ║   IngeLAB 3D · camino_cargas.html                              ║
 * ║   Detecta acciones del usuario y guía paso a paso              ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en camino_cargas.html:
 *   <script src="../js/asistente/asistente_camino_cargas.js"></script>
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     PASOS DEL WIZARD — El "profesor"
  ═══════════════════════════════════════════ */
  const PASOS = [
    {
      id: 'bienvenida',
      siguiente: 'geometria',
      autoAvanzar: false,
      mensaje: `¡Hola! Soy tu **Profesor Virtual de Camino de Cargas**. 🏗️\n\nTe voy a guiar paso a paso para que puedas entender cómo fluyen las cargas en una estructura:\n\n**LOSA → VIGA → PILAR → FUNDACIÓN → SUELO**\n\nEste módulo te permite:\n• Calcular áreas tributarias por pilar\n• Acumular cargas piso a piso\n• Verificar la fundación y el pilar\n\nSiempre puedes escribirme una duda en el chat de abajo. ¿Listo para comenzar?`,
      botonTexto: 'Sí, ¡empecemos! →',
      tip: null,
    },
    {
      id: 'geometria',
      siguiente: 'pisos',
      autoAvanzar: true,
      mensaje: `**Paso 1 — Geometría en planta** 📐\n\nDefine las dimensiones de la planta rectangular de tu edificio.\n\n• **Lx:** Luz entre pilares en dirección X [m]\n• **Ly:** Luz entre pilares en dirección Y [m]\n• **nx:** Número de vanos en X\n• **ny:** Número de vanos en Y\n\n**Rangos típicos en edificios:**\n• Lx, Ly: 4 a 8 m (vanos estándar)\n• nx, ny: 2 a 5 vanos\n\n👆 Ingresa las dimensiones en planta en el panel izquierdo.`,
      highlight: 'inp_Lx',
      tip: '💡 Una grilla cuadrada (Lx = Ly) genera la distribución más uniforme de cargas entre pilares.',
      botonTexto: '✅ Ya ingresé la geometría → Siguiente',
    },
    {
      id: 'pisos',
      siguiente: 'losa',
      autoAvanzar: true,
      mensaje: `**Paso 2 — Número de pisos y altura** 🏢\n\nIngresa la cantidad de pisos y la altura entre pisos.\n\n**Altura de piso típica:**\n• Residencial: 2.70 a 3.00 m\n• Oficinas: 3.00 a 3.50 m\n• Comercial: 3.50 a 5.00 m\n\n⚠️ A mayor número de pisos → mayor carga acumulada en el pilar base.\n\n👆 Ingresa **"Número de pisos"** y **"Altura de piso"** en el panel izquierdo.`,
      highlight: 'inp_npisos',
      tip: '💡 El pilar de la esquina recibe la MENOR carga, el pilar interior recibe la MAYOR carga.',
      botonTexto: '✅ Ya ingresé los pisos → Siguiente',
    },
    {
      id: 'losa',
      siguiente: 'cargas',
      autoAvanzar: true,
      mensaje: `**Paso 3 — Losa** 🪟\n\nDefine el espesor y tipo de losa:\n\n**Espesor típico:**\n• Losas de piso residencial: 0.12 a 0.18 m\n• Losas de estacionamiento: 0.20 a 0.25 m\n• Regla práctica: e ≥ Lx/30\n\n**Tipo de losa:**\n• **Unidireccional:** Trabaja en una sola dirección. Se usa cuando Lx/Ly ≥ 2\n• **Bidireccional:** Trabaja en ambas direcciones. Más eficiente cuando Lx ≈ Ly\n\n👆 Ingresa el espesor y selecciona el tipo de losa.`,
      highlight: 'inp_elosa',
      tip: '💡 Losa bidireccional es más eficiente estructuralmente. Si Lx/Ly > 2, se comporta igual que la unidireccional.',
      botonTexto: '✅ Ya definí la losa → Siguiente',
    },
    {
      id: 'cargas',
      siguiente: 'materiales',
      autoAvanzar: true,
      mensaje: `**Paso 4 — Cargas** ⬇️\n\nIngresa las cargas que actúan sobre la losa:\n\n**Carga muerta adicional q_D [kN/m²]:**\nIncluye piso terminado, tabiques, instalaciones.\n• Residencial: 1.5 a 3.0 kN/m²\n• Oficinas: 1.0 a 2.0 kN/m²\n\n**Carga viva q_L [kN/m²] — NCh 1537:**\n• Vivienda: 2.0 kN/m²\n• Oficinas: 2.5 kN/m²\n• Comercio: 5.0 kN/m²\n• Industrial: 7.5 kN/m²\n\n👆 Ingresa las cargas y selecciona el tipo de ocupación.`,
      highlight: 'inp_qD',
      tip: '💡 La combinación de diseño es **1.2D + 1.6L** según NCh 1537. El módulo la calcula automáticamente.',
      botonTexto: '✅ Ya ingresé las cargas → Siguiente',
    },
    {
      id: 'materiales',
      siguiente: 'fundacion',
      autoAvanzar: true,
      mensaje: `**Paso 5 — Sección de pilar y viga** 🏛️\n\nDefine las dimensiones de los elementos estructurales:\n\n**Pilar rectangular:**\n• b × h: 0.30×0.30 m (pisos bajos) a 0.60×0.60 m (pisos altos)\n• f'c: 25 MPa (estándar Chile)\n• ρ = 0.01 a 0.04 (1% a 4% de acero)\n\n**Viga:**\n• Ancho b_viga: 0.25 a 0.40 m\n• Alto h_viga: L/12 a L/10\n• Para L=6m → h ≈ 0.55 m\n\n👆 Ingresa las dimensiones del pilar y la viga.`,
      highlight: 'inp_bpilar',
      tip: '💡 Una buena regla inicial: pilar cuadrado de lado ≥ L/15. Para L=6m → pilar mínimo 0.40×0.40 m.',
      botonTexto: '✅ Ya definí los elementos → Siguiente',
    },
    {
      id: 'fundacion',
      siguiente: 'calcular',
      autoAvanzar: true,
      mensaje: `**Paso 6 — Fundación** 🪨\n\nDefine la cimentación:\n\n**Zapata aislada:**\n• Dimensión B × L: 1.5 a 3.0 m típico\n• Espesor: 0.40 a 0.70 m\n• Profundidad de desplante Df: 1.0 a 2.0 m\n\n**Capacidad portante del suelo σ_adm [kPa]:**\n• Suelo blando (relleno): 50 a 100 kPa\n• Suelo medio (arcilla densa): 100 a 200 kPa\n• Suelo firme (arena-grava): 200 a 400 kPa\n• Roca: > 500 kPa\n\n👆 Ingresa los datos de la fundación y el suelo.`,
      highlight: 'inp_Bzap',
      tip: '💡 Si σ_actuante > σ_adm → aumenta las dimensiones de la zapata o mejora el suelo (soil improvement).',
      botonTexto: '✅ Ya definí la fundación → Siguiente',
    },
    {
      id: 'calcular',
      siguiente: 'interpretar',
      autoAvanzar: false,
      mensaje: `**¡Perfecto!** Tienes todos los datos ingresados. 🎯\n\nAhora haz clic en **"CALCULAR"** en la barra superior.\n\nEl sistema calculará:\n• Áreas tributarias por tipo de pilar\n• Acumulación de carga piso a piso\n• Verificación del pilar más cargado\n• Presión sobre la fundación\n• Comparación con σ_adm del suelo\n\n¿Lo ves todo listo?`,
      botonTexto: '▶ Ya calculé → Ver resultados',
      tip: null,
    },
    {
      id: 'interpretar',
      siguiente: 'fin',
      autoAvanzar: false,
      mensaje: `**Paso 7 — Interpretar resultados** 📊\n\nRevisa el panel derecho:\n\n**Carga axial en pilar [kN]:**\n• N_int → Pilar interior (mayor carga)\n• N_bor → Pilar de borde\n• N_esq → Pilar de esquina (menor carga)\n\n**Verificación fundación:**\n• ✅ σ ≤ σ_adm → La zapata funciona\n• ❌ σ > σ_adm → Aumentar dimensiones de zapata\n\n**DCR del pilar:**\n• DCR < 1.0 ✅ → Pilar cumple\n• DCR > 1.0 ❌ → Aumentar sección o cuantía\n\n👆 Revisa los tres diagramas: corte, planta y acumulación por piso.`,
      botonTexto: '✅ Entendido → Finalizar',
      tip: null,
    },
    {
      id: 'fin',
      siguiente: null,
      autoAvanzar: false,
      mensaje: `**¡Excelente trabajo!** 🎉\n\nHas completado el análisis de Camino de Cargas. Si el DCR o la fundación salieron en rojo, aquí las soluciones:\n\n**Si la FUNDACIÓN falla (σ > σ_adm):**\n1. Aumentar dimensiones de zapata B × L\n2. Aumentar profundidad de desplante Df\n3. Cambiar a losa de fundación\n\n**Si el PILAR falla (DCR > 1):**\n1. Aumentar sección b × h del pilar\n2. Aumentar cuantía de acero ρ\n3. Aumentar f'c del hormigón\n\n**Para seguir practicando:**\nModifica el número de pisos o las luces y observa cómo cambia la acumulación de cargas.\n\n¿Tienes alguna duda? Escríbeme aquí abajo 👇`,
      botonTexto: '↺ Reiniciar guía desde el inicio',
    },
  ];

  /* ═══════════════════════════════════════════
     BASE DE PREGUNTAS FRECUENTES
  ═══════════════════════════════════════════ */
  const QA = [
    { k: ['camino de cargas','load path','flujo de cargas','cómo fluye'], r: `El **camino de cargas** es la ruta que siguen las cargas desde donde se aplican hasta el suelo:\n\n**LOSA → VIGA → PILAR → FUNDACIÓN → SUELO**\n\nCada elemento recibe las cargas del elemento superior y las transfiere al siguiente. El pilar de la base recibe la carga acumulada de TODOS los pisos.` },
    { k: ['área tributaria','tributaria','at','area trib'], r: `El **área tributaria** es la porción de losa que "descansa" sobre cada pilar:\n\n• **Pilar interior:** At = Lx × Ly\n• **Pilar de borde:** At = (Lx/2) × Ly ó Lx × (Ly/2)\n• **Pilar de esquina:** At = (Lx/2) × (Ly/2)\n\nEl pilar interior siempre tiene el área tributaria mayor y por lo tanto la carga mayor.` },
    { k: ['zapata','fundación','cimentación','footing'], r: `La **zapata aislada** es la fundación más común bajo pilares individuales.\n\n**Verificación:**\nσ_neta = N_total / A_zapata ≤ σ_adm\n\nDonde N_total incluye la carga del pilar + peso propio de la zapata + peso del relleno.\n\nSi σ_neta > σ_adm → aumentar dimensiones B × L de la zapata.` },
    { k: ['losa unidireccional','losa bidireccional','tipo de losa','uni','bid'], r: `**Losa unidireccional (uni):**\nTrabaja en una sola dirección. Se usa cuando Lx/Ly ≥ 2.\nLa carga va a las vigas cortas; las vigas largas no reciben carga de losa.\n\n**Losa bidireccional (bid):**\nTrabaja en ambas direcciones. Más eficiente cuando Lx ≈ Ly.\nDistribución trapezoidal en vigas largas y triangular en vigas cortas.` },
    { k: ['carga muerta','carga viva','d','l','q'], r: `**Cargas gravitacionales NCh 1537:**\n\n**Carga muerta D:**\n• Peso propio losa: γ_HA × e_losa\n• Carga adicional: piso terminado, tabiques, instalaciones\n\n**Carga viva L:**\n• Depende del uso: vivienda 2.0, oficinas 2.5, comercio 5.0 kN/m²\n\n**Combinación de diseño:**\n**q_u = 1.2D + 1.6L** (NCh 1537 / ASCE 7)` },
    { k: ['pilar interior','pilar borde','pilar esquina','tipo de pilar'], r: `**Tipos de pilar según posición:**\n\n• **Interior:** Recibe carga de 4 paños de losa → At = Lx × Ly → Carga MÁXIMA\n• **Borde:** Recibe carga de 2 paños → At ≈ Lx×Ly/2\n• **Esquina:** Recibe carga de 1 paño → At ≈ Lx×Ly/4 → Carga MÍNIMA\n\nSiempre verifica el **pilar interior** — es el más crítico.` },
    { k: ['acumulación','piso a piso','n pisos','axial'], r: `La **acumulación de cargas** en el pilar:\n\nN_piso_k = Σ (q_u × At + PP_pilar + PP_vigas) desde el techo hasta el piso k\n\nA nivel de fundación (piso 1), el pilar interior ha acumulado la carga de TODOS los pisos.\n\nEsta es la N que se usa para diseñar tanto el pilar como la fundación.` },
    { k: ['dcr','capacidad','pilar cumple','pilar falla'], r: `**DCR del pilar = N_actuante / φPn**\n\n• DCR < 1.0 ✅ → El pilar cumple\n• DCR > 1.0 ❌ → El pilar falla, rediseñar\n\n**Capacidad φPn (ACI 318):**\nφPn = 0.65 × 0.80 × (0.85×f'c×Ag_neto + fy×Ast)\n\nPara aumentar φPn: aumentar sección o cuantía de acero.` },
    { k: ['suelo','capacidad portante','sigma adm','kpa'], r: `**Capacidad portante del suelo σ_adm:**\n\n• Relleno suelto: 50–80 kPa\n• Arcilla blanda: 80–100 kPa\n• Arcilla media-densa: 100–200 kPa\n• Arena-grava: 200–400 kPa\n• Roca: > 500 kPa\n\nSiempre se obtiene de un **estudio de mecánica de suelos**. Para proyectos reales no usar valores supuestos.` },
    { k: ['normativa','nch','aci','norma','nch 1537','nch 2123'], r: `**Normativa aplicada en este módulo:**\n\n🇨🇱 **NCh 1537:2009** → Cargas de diseño (D, L, combinaciones)\n🇨🇱 **NCh 433:2009** → Diseño sísmico\n🇨🇱 **NCh 2123** → Cimentaciones superficiales\n🇺🇸 **ACI 318-19** → Diseño de pilar de hormigón armado\n\nNota: Herramienta educativa. Para proyectos reales consultar con Ingeniero Civil Estructural.` },
    { k: ['sigma','presion suelo','verificar zapata','excede'], r: `**Verificación de zapata:**\nσ_neta = (N_pilar + W_zapata + W_relleno) / A_zapata\n\n• Si σ_neta ≤ σ_adm → ✅ OK\n• Si σ_neta > σ_adm → ❌ Aumentar zapata\n\n**Opciones si falla:**\n1. Aumentar B y L de la zapata\n2. Aumentar Df (profundidad de desplante)\n3. Mejorar el suelo (soil improvement)\n4. Cambiar a losa de fundación corrida` },
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

  /* ═══════════════════════════════════════════
     ESTILOS
  ═══════════════════════════════════════════ */
  function injectStyles() {
    const s = document.createElement('style');
    s.textContent = `
      #cc-fab{position:fixed;bottom:24px;right:24px;z-index:9999;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#00ff9d,#00e5ff);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(0,255,157,.4);display:flex;align-items:center;justify-content:center;font-size:22px;transition:transform .2s,box-shadow .2s;}
      #cc-fab:hover{transform:scale(1.12);box-shadow:0 6px 28px rgba(0,255,157,.6);}
      #cc-fab.open{background:linear-gradient(135deg,#ff4757,#ff6b35);}
      #cc-panel{position:fixed;bottom:84px;right:24px;z-index:9998;width:360px;max-height:540px;background:#0d1117;border:1px solid rgba(0,255,157,.2);border-radius:14px;display:flex;flex-direction:column;box-shadow:0 12px 48px rgba(0,0,0,.6);transform:scale(.95) translateY(10px);opacity:0;pointer-events:none;transition:all .25s cubic-bezier(.4,0,.2,1);}
      #cc-panel.visible{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
      #cc-header{display:flex;align-items:center;gap:10px;padding:14px 16px 10px;border-bottom:1px solid rgba(255,255,255,.07);}
      #cc-header .cc-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#00ff9d,#00e5ff);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
      #cc-header .cc-title{flex:1;}
      #cc-header .cc-title strong{display:block;font-size:13px;color:#e8edf5;font-family:'Space Mono',monospace;}
      #cc-header .cc-title span{font-size:10px;color:#3d4758;font-family:'Space Mono',monospace;}
      #cc-prog{height:3px;background:rgba(255,255,255,.07);margin:0 16px 10px;}
      #cc-prog-bar{height:100%;background:linear-gradient(90deg,#00ff9d,#00e5ff);border-radius:2px;transition:width .4s ease;}
      #cc-msgs{flex:1;overflow-y:auto;padding:8px 12px;display:flex;flex-direction:column;gap:8px;scroll-behavior:smooth;}
      #cc-msgs::-webkit-scrollbar{width:3px;}
      #cc-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px;}
      .cc-msg-bot{background:rgba(0,255,157,.06);border:1px solid rgba(0,255,157,.12);border-radius:10px 10px 10px 3px;padding:10px 12px;font-size:12px;color:#c8d0de;line-height:1.55;font-family:'DM Sans',sans-serif;}
      .cc-msg-bot .cc-paso-label{font-size:9px;color:#3d4758;font-family:'Space Mono',monospace;margin-bottom:4px;display:block;}
      .cc-msg-bot strong{color:#00ff9d;}
      .cc-msg-bot em{color:#00e5ff;font-style:normal;}
      .cc-msg-bot ul,.cc-msg-bot ol{padding-left:14px;margin:4px 0;}
      .cc-msg-bot li{margin:2px 0;}
      .cc-action-btn{display:block;width:100%;margin-top:8px;padding:7px 12px;background:rgba(0,255,157,.08);border:1px solid rgba(0,255,157,.25);border-radius:6px;color:#00ff9d;font-family:'Space Mono',monospace;font-size:11px;cursor:pointer;text-align:center;transition:all .2s;}
      .cc-action-btn:hover{background:rgba(0,255,157,.16);border-color:#00ff9d;}
      .cc-tip{margin-top:6px;padding:6px 10px;background:rgba(0,229,255,.06);border-left:2px solid rgba(0,229,255,.3);border-radius:0 6px 6px 0;font-size:11px;color:#8b95a8;font-family:'DM Sans',sans-serif;}
      .cc-tip strong{color:#00e5ff;}
      .cc-msg-user{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px 10px 3px 10px;padding:8px 12px;font-size:12px;color:#8b95a8;align-self:flex-end;max-width:85%;font-family:'DM Sans',sans-serif;}
      .cc-typing{display:flex;gap:4px;padding:10px 12px;background:rgba(0,255,157,.04);border:1px solid rgba(0,255,157,.08);border-radius:10px 10px 10px 3px;width:fit-content;}
      .cc-typing span{width:6px;height:6px;background:#00ff9d;border-radius:50%;animation:ccBounce .9s infinite;}
      .cc-typing span:nth-child(2){animation-delay:.15s;}
      .cc-typing span:nth-child(3){animation-delay:.3s;}
      @keyframes ccBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
      #cc-input-area{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,.07);}
      #cc-input{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;color:#e8edf5;font-family:'DM Sans',sans-serif;font-size:12px;outline:none;transition:border-color .2s;}
      #cc-input:focus{border-color:rgba(0,255,157,.4);}
      #cc-send{background:rgba(0,255,157,.1);border:1px solid rgba(0,255,157,.25);border-radius:8px;padding:8px 12px;color:#00ff9d;cursor:pointer;font-size:14px;transition:all .2s;flex-shrink:0;}
      #cc-send:hover{background:rgba(0,255,157,.2);}
      .cc-highlight-pulse{outline:2px solid #00ff9d !important;outline-offset:3px;animation:ccPulseHL 1.5s ease-in-out 3;}
      @keyframes ccPulseHL{0%,100%{outline-color:rgba(0,255,157,.3)}50%{outline-color:#00ff9d}}
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════
     DOM
  ═══════════════════════════════════════════ */
  function buildDOM() {
    const fab = document.createElement('button');
    fab.id = 'cc-fab';
    fab.title = 'Asistente de Camino de Cargas';
    fab.textContent = '🏗️';
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'cc-panel';
    panel.innerHTML = `
      <div id="cc-header">
        <div class="cc-avatar">🏗️</div>
        <div class="cc-title">
          <strong>Asistente CC</strong>
          <span>Camino de Cargas · IngeLAB 3D</span>
        </div>
      </div>
      <div id="cc-prog"><div id="cc-prog-bar" style="width:0%"></div></div>
      <div id="cc-msgs"></div>
      <div id="cc-input-area">
        <input id="cc-input" type="text" placeholder="Escribe tu duda aquí..." autocomplete="off"/>
        <button id="cc-send">➤</button>
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

    document.getElementById('cc-send').addEventListener('click', () => {
      const inp = document.getElementById('cc-input');
      const q = inp.value.trim();
      if (!q) return;
      inp.value = '';
      handleInput(q);
    });
    document.getElementById('cc-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('cc-send').click();
    });
  }

  function highlight(id) {
    const prev = document.querySelector('.cc-highlight-pulse');
    if (prev) prev.classList.remove('cc-highlight-pulse');
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('cc-highlight-pulse');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => el.classList.remove('cc-highlight-pulse'), 5000);
  }

  function md(t) {
    return t
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/•/g, '&bull;');
  }

  function addBotMsg(paso, soloTexto) {
    const msgs = document.getElementById('cc-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'cc-msg-bot';

    if (!soloTexto) {
      const idx = PASOS.indexOf(paso);
      const label = idx === 0 ? 'Bienvenida' : idx === PASOS.length - 1 ? '¡Completado!' : `Paso ${idx} de ${PASOS.length - 2}`;
      wrap.innerHTML = `<span class="cc-paso-label">${label}</span>${md(paso.mensaje)}`;

      if (paso.tip) {
        const tip = document.createElement('div');
        tip.className = 'cc-tip';
        tip.innerHTML = md(paso.tip);
        wrap.appendChild(tip);
      }

      if (paso.botonTexto) {
        const btn = document.createElement('button');
        btn.className = 'cc-action-btn';
        btn.textContent = paso.botonTexto;
        btn.setAttribute('data-paso-id', paso.id);
        btn.addEventListener('click', function () {
          this.disabled = true;
          this.style.opacity = '0.5';
          const pasoId = this.getAttribute('data-paso-id');
          if (pasoId === 'fin') { reiniciarGuia(); return; }
          avanzarPaso();
        });
        wrap.appendChild(btn);
      }
    } else {
      wrap.innerHTML = md(soloTexto);
    }

    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    if (paso.highlight && !soloTexto) highlight(paso.highlight);
  }

  function addUserMsg(t) {
    const msgs = document.getElementById('cc-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'cc-msg-user';
    wrap.textContent = t;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing(cb) {
    const msgs = document.getElementById('cc-msgs');
    const el = document.createElement('div');
    el.className = 'cc-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { el.remove(); cb(); }, 700);
  }

  function updateProg() {
    const total = PASOS.length - 1;
    const pct = Math.round((estado.pasoActual / total) * 100);
    const bar = document.getElementById('cc-prog-bar');
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
    const msgs = document.getElementById('cc-msgs');
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
        addBotMsg(null, `No tengo una respuesta específica para eso, pero puedo ayudarte con:\n\n• Áreas tributarias y tipos de pilar\n• Acumulación de cargas por piso\n• Verificación de zapata y pilar\n• Tipos de losa y distribución de cargas\n• Normativa NCh 1537 y ACI 318\n\n¿Puedes reformular tu pregunta?`);
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
