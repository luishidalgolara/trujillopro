/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ASISTENTE DMF — Guía Interactiva tipo Profesor                ║
 * ║   IngeLAB 3D · momento.html                                     ║
 * ║   Detecta acciones del usuario y guía paso a paso               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     PASOS DEL WIZARD — El "profesor"
  ═══════════════════════════════════════════ */
  const PASOS = [
    {
      id: 'bienvenida',
      siguiente: 'tipo_viga',
      autoAvanzar: false,
      mensaje: `¡Hola! Soy tu **Profesor Virtual de Momento Flector**. 📐\n\nTe voy a guiar paso a paso para que puedas calcular correctamente el **Diagrama de Momento Flector (DMF)**.\n\nEste módulo te permite:\n• Calcular reacciones en los apoyos\n• Obtener el diagrama M(x) completo\n• Verificar si tu sección resiste las cargas\n\nSiempre puedes escribirme una duda en el chat de abajo. ¿Listo para comenzar?`,
      botonTexto: 'Sí, ¡empecemos! →',
      tip: null,
    },
    {
      id: 'tipo_viga',
      siguiente: 'longitud',
      autoAvanzar: true,
      mensaje: `**Paso 1 — Tipo de viga** 🏗️\n\nLo primero es definir cómo está apoyada tu viga. Mira el panel izquierdo en la sección **"Geometría de viga"**.\n\nTienes dos opciones:\n\n**Simplemente apoyada:**\nApoyos en ambos extremos: un pin fijo y un rodillo. El momento en los extremos es siempre CERO. Es el caso más común en vigas de piso y edificios.\n\n**Voladizo (Cantilever):**\nUn extremo empotrado, el otro libre. El momento MÁXIMO ocurre en el empotramiento. Típico de balcones y marquesinas.\n\n👆 Selecciona el tipo de viga que necesitas.`,
      highlight: 'inp_tipo',
      tip: '💡 Si no sabes cuál elegir, usa **Simplemente apoyada** — es el caso más frecuente en la práctica estructural.',
      botonTexto: '✅ Ya seleccioné el tipo de viga → Siguiente',
    },
    {
      id: 'longitud',
      siguiente: 'seccion',
      autoAvanzar: true,
      mensaje: `**Paso 2 — Longitud de la viga** 📏\n\nPerfecto. Ahora ingresa la **longitud L** en metros.\n\nEs la distancia entre apoyos (simplemente apoyada) o desde el empotramiento hasta el extremo libre (voladizo).\n\n**Rangos típicos:**\n• Vigas de losa residencial: 4 a 7 m\n• Vigas de edificio: 5 a 9 m\n• Voladizos: 1 a 4 m\n• Puentes: 10 a 30 m\n\n👆 Ingresa la longitud en el campo **"Longitud L"** y presiona Enter o Tab.`,
      highlight: 'inp_L',
      tip: '💡 Regla práctica: la altura mínima de la viga debe ser h ≈ L/12. Para L=6m → h ≈ 0.50m.',
      botonTexto: '✅ Ya ingresé la longitud → Siguiente',
    },
    {
      id: 'seccion',
      siguiente: 'propiedades_seccion',
      autoAvanzar: true,
      mensaje: `**Paso 3 — Tipo de sección transversal** 🔲\n\nLa sección define la forma y material de la viga. Mira **"Sección transversal"** en el panel izquierdo:\n\n**Rectangular H.A. (Hormigón Armado):**\nLa más usada en Chile. Defines ancho b y alto h.\n\n**T-Beam H.A.:**\nViga T con losa colaborante. Más eficiente para momentos positivos grandes.\n\n**Perfil IPE (Acero):**\nPerfiles laminados europeos. Más livianos, módulo E = 200,000 MPa.\n\n👆 Selecciona el tipo de sección.`,
      highlight: 'inp_seccion',
      tip: '💡 Para empezar, usa **Rectangular H.A.** con f\'c = 25 MPa — es el estándar en la práctica chilena (NCh 430).',
      botonTexto: '✅ Ya seleccioné la sección → Siguiente',
    },
    {
      id: 'propiedades_seccion',
      siguiente: 'cargas',
      autoAvanzar: false,
      mensaje: `**Paso 4 — Dimensiones de la sección** 📐\n\nAhora defines las medidas concretas de tu viga.\n\n**Si es Rectangular H.A.:**\n• **b (ancho):** Entre 0.20 y 0.40 m es lo habitual\n• **h (alto):** El más importante para resistir el momento. Usa h ≈ L/12 como punto de partida\n• **f'c:** Resistencia del hormigón. **25 MPa** es el estándar en Chile\n\n**Si es Perfil IPE:**\nSelecciona el perfil de la lista. El **IPE 300** es un buen punto de partida para vigas de 5-7 m.\n\n**Ejemplo típico para L=6m:**\nb = 0.30 m · h = 0.55 m · f'c = 25 MPa\n\n👆 Ingresa tus dimensiones y cuando estés listo presiona el botón de abajo.`,
      highlight: 'inp_b',
      botonTexto: '✅ Listo, tengo mis dimensiones → Siguiente paso',
      tip: '💡 Si el resultado DCR sale en rojo (> 1.0), aumenta **h** primero. Duplicar h multiplica la inercia por 8 — es mucho más eficiente que aumentar b.',
    },
    {
      id: 'cargas',
      siguiente: 'verificar_carga',
      autoAvanzar: false,
      mensaje: `**Paso 5 — Cargas aplicadas** ⬇️\n\nAhora agregas las fuerzas que actúan sobre la viga. Haz clic en **"+ Agregar carga"** en el panel izquierdo.\n\n**Puntual P [kN]:**\nFuerza concentrada en un punto. Ej: columna sobre la viga.\n→ Define P (magnitud) y a (posición en metros)\n\n**Distribuida q [kN/m]:**\nCarga repartida en un tramo. Ej: peso de losa, tabiques, sobrecarga.\n→ Define q (intensidad), a (inicio) y b (fin)\n\n**Triangular [kN/m]:**\nCarga que varía linealmente. Ej: presión de tierra o agua.\n\n**Valores típicos NCh 1537:**\n• Peso propio losa 15cm: ~3.75 kN/m\n• Sobrecarga habitacional: 2.0 kN/m\n• Sobrecarga oficinas: 2.5 kN/m\n\n👆 Agrega al menos una carga.`,
      highlight: 'btnAddCarga',
      tip: '💡 También puedes usar los **Casos Típicos** del panel izquierdo para cargar una configuración de ejemplo completa y luego modificarla.',
      botonTexto: '✅ Ya agregué mis cargas → Siguiente',
    },
    {
      id: 'verificar_carga',
      siguiente: 'calcular',
      autoAvanzar: false,
      mensaje: `**Paso 6 — Revisa tus cargas** ✅\n\nAntes de calcular, verifica que los datos estén correctos:\n\n**Carga distribuida:**\n• q > 0 kN/m\n• a = inicio (0 si comienza desde el apoyo izquierdo)\n• b = fin (igual a L si cubre toda la viga)\n\n**Carga puntual:**\n• P > 0 kN\n• 0 ≤ a ≤ L (no puede estar fuera de la viga)\n\n**Combinaciones:**\nPuedes tener varias cargas al mismo tiempo. El programa las suma por el principio de superposición.\n\n¿Tus cargas se ven correctas? Cuando estés listo, avancemos a calcular.`,
      botonTexto: '✅ Sí, las cargas están correctas → Siguiente paso',
      tip: '💡 Si tienes dudas, el **Caso Típico "S.A. + q unif."** es el más sencillo para empezar a entender cómo funciona el diagrama.',
    },
    {
      id: 'calcular',
      siguiente: 'interpretar',
      autoAvanzar: true,
      mensaje: `**Paso 7 — ¡A calcular!** ⚡\n\nTodo está configurado. Ahora presiona el botón **⚡ CALCULAR** en la barra superior derecha.\n\nEl programa calculará en milisegundos:\n✔ Reacciones RA y RB en los apoyos\n✔ Diagrama de momento M(x) punto a punto\n✔ Momento máximo M_max y su posición x\n✔ Tensión máxima σ y verificación DCR\n✔ Flecha máxima δ y relación L/δ\n\n👆 Presiona el botón naranja **⚡ CALCULAR** arriba a la derecha.`,
      highlight: 'btnCalc',
      tip: '💡 El botón **⚡ CALCULAR** está en la esquina superior derecha de la pantalla, junto al botón Reset.',
      botonTexto: '✅ Ya presioné Calcular → Ver resultados',
    },
    {
      id: 'interpretar',
      siguiente: 'fin',
      autoAvanzar: false,
      mensaje: `**Paso 8 — Interpretando los resultados** 📊\n\n¡El diagrama ya está calculado! Mira el **panel derecho**:\n\n**Reacciones (RA, RB):**\nFuerzas en los apoyos. RA + RB debe igualar la carga total.\n\n**M_max:**\nEl momento más grande de la viga en kN·m. Es el valor crítico para el diseño.\n\n**DCR (Demand/Capacity Ratio):**\n• 🟢 DCR < 1.0 → Sección **CUMPLE** ✅ — hay reserva de capacidad\n• 🔴 DCR > 1.0 → Sección **NO CUMPLE** ❌ — aumenta h o b\n\n**L/δ (Flecha):**\n• L/360 o mayor → cumple deformación de servicio (NCh 430 / ACI 318)\n\n**El diagrama central:**\nLa curva muestra M(x) en cada punto de la viga. La zona roja es momento positivo, la zona azul es negativo.`,
      botonTexto: '✅ Entendido → ¿Qué hago si el DCR sale rojo?',
      tip: '💡 El cuadro verde ✅ o rojo ❌ en la parte inferior del panel derecho es tu verificación final.',
    },
    {
      id: 'fin',
      siguiente: null,
      autoAvanzar: false,
      mensaje: `**¡Excelente trabajo!** 🎉\n\nHas completado el análisis de Momento Flector. Si el DCR salió en rojo, estas son las correcciones:\n\n**Para reducir el DCR:**\n1. **Aumentar h** → efecto cúbico en I (lo más eficiente)\n2. **Aumentar b** → efecto lineal\n3. **Cambiar a sección T** → mayor inercia efectiva\n4. **Cambiar a perfil IPE mayor**\n5. **Reducir la luz L** → agregar un apoyo intermedio\n\n**Para seguir practicando:**\nPrueba cambiar el tipo de carga, la longitud o las dimensiones y observa cómo cambia el diagrama y el DCR en tiempo real.\n\n¿Tienes alguna duda? Escríbeme aquí abajo 👇`,
      botonTexto: '↺ Reiniciar guía desde el inicio',
    },
  ];

  /* ═══════════════════════════════════════════
     BASE DE PREGUNTAS FRECUENTES
  ═══════════════════════════════════════════ */
  const QA = [
    { k: ['qué es el momento','momento flector','qué es m','concepto'], r: `El **momento flector M(x)** es la resultante de todas las fuerzas que actúan a un lado de una sección, medida respecto al centroide.\n\n• Unidades: kN·m\n• M_max ocurre donde el cortante V = 0\n• M(+) comprime la fibra superior (ACI 318)\n\nFórmula clave: **σ = M / W**\nDonde W = I/y es el módulo resistente.` },
    { k: ['reacciones','ra','rb','equilibrio'], r: `Las **reacciones** son las fuerzas que ejercen los apoyos:\n\n**Simplemente apoyada:**\nRA + RB = carga total\nSe calculan con ΣM = 0 en cada apoyo.\n\n**Voladizo:**\nR = carga total\nM_empotrado = Σ(F × d)\n\nVerificación: RA + RB = suma de todas las cargas aplicadas.` },
    { k: ['dcr','cumple','no cumple','falla','rojo','verde'], r: `**DCR = σ_max / σ_admisible**\n\n• DCR < 1.0 ✅ → La sección cumple, tiene reserva\n• DCR = 1.0 → Sección exactamente al límite\n• DCR > 1.0 ❌ → La sección falla, hay que rediseñar\n\n**Soluciones si DCR > 1:**\n1. Aumentar h (efecto cúbico en I) ← más eficiente\n2. Aumentar b (efecto lineal)\n3. Cambiar a sección T\n4. Usar perfil IPE mayor` },
    { k: ['flecha','deformación','deflexión','delta','l/360','l/480'], r: `La **flecha δ_max** es el desplazamiento vertical máximo.\n\n**Límites NCh 430 / ACI 318:**\n• δ ≤ L/360 → cargas variables de uso\n• δ ≤ L/480 → elementos que podrían dañarse\n\n**Fórmulas:**\n• SA + q uniforme: δ = 5qL⁴/(384EI)\n• SA + P central: δ = PL³/(48EI)\n• Voladizo + P: δ = PL³/(3EI)\n\nEl resultado **L/δ** en el panel derecho indica directamente si cumple.` },
    { k: ['inercia','ei','rigidez','momento de inercia'], r: `**Momento de inercia I [m⁴ o cm⁴]:**\nMide la resistencia de la sección a doblarse.\n• Sección rect: I = b·h³/12\n• Duplicar h → I se multiplica por 8 ⚡\n\n**Rigidez EI [kN·m²]:**\nE × I controla la deformación.\n• Mayor EI = menor flecha\n• Hormigón (f'c=25): E ≈ 23,500 MPa\n• Acero: E = 200,000 MPa` },
    { k: ['sección','ancho','alto','b','h','dimensiones'], r: `**Dimensiones de sección rectangular:**\n\n• **b (ancho):** 0.20 a 0.40 m en edificios\n• **h (alto):** Regla práctica h ≈ L/12\n\n**Para L = 6m:** b=0.30m, h=0.55m es un buen punto de partida.\n\nSi DCR > 1 (rojo) → aumenta h primero, tiene efecto cúbico.` },
    { k: ['fc','f\'c','hormigon','resistencia','mpa','h-25'], r: `**f'c = resistencia característica del hormigón a compresión (28 días)**\n\nValores en Chile:\n• H-17 → rellenos simples\n• **H-25 (25 MPa) → estándar estructural** ✓\n• H-30 → edificios de altura\n• H-35+ → puentes y obras especiales\n\nE_c = 4700√f'c (ACI 318-19)\nPara f'c=25 MPa → E_c ≈ 23,500 MPa` },
    { k: ['voladizo','cantilever','empotre','balcon'], r: `**Voladizo (Cantilever):**\n\n• Momento MÁXIMO en el empotramiento (x=0)\n• Momento CERO en el extremo libre\n\nFórmulas:\n• Voladizo + q uniforme: M_max = qL²/2\n• Voladizo + P puntual: M_max = P·L\n\n⚠️ El momento en voladizo es el **DOBLE** que en viga simplemente apoyada con igual carga y longitud.` },
    { k: ['ipe','acero','perfil','laminado'], r: `**Perfiles IPE (acero laminado):**\nE = 200,000 MPa (constante para todo acero)\n\nSelección orientativa:\n• IPE 200-240 → vigas secundarias livianas\n• IPE 270-330 → vigas principales L=4-6m\n• IPE 360-400 → vigas L=6-9m\n• IPE 450-500 → grandes luces\n\nA mayor número → mayor inercia → menor DCR y menor flecha.` },
    { k: ['caso','típico','ejemplo','plantilla'], r: `Los **Casos Típicos** son configuraciones predefinidas para empezar rápido:\n\n• **S.A. + q unif.** → M_max = qL²/8 (en el centro)\n• **S.A. + P central** → M_max = PL/4 (en el centro)\n• **Voladizo + q** → M_max = qL²/2 (en empotramiento)\n• **Voladizo + P** → M_max = P·L (en empotramiento)\n\nHaz clic en cualquiera para cargar automáticamente los parámetros.` },
    { k: ['normativa','aci','nch','aisc','norma'], r: `**Normativa de referencia en este módulo:**\n\n🇨🇱 **NCh 430:2008** → Hormigón Armado Chile\n🇨🇱 **NCh 1537:2009** → Cargas en edificios\n🇺🇸 **ACI 318-19** → Código de hormigón armado\n🇺🇸 **AISC 360-22** → Estructuras de acero\n\n**Nota:** Este módulo es para pre-dimensionamiento educativo. Para proyectos reales, consultar con un Ingeniero Civil Estructural.` },
  ];

  function respuestaLibre(q) {
    const texto = q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let mejor = null, maxScore = 0;
    for (const item of QA) {
      let score = 0;
      for (const k of item.k) if (texto.includes(k)) score += k.length;
      if (score > maxScore) { maxScore = score; mejor = item; }
    }
    return maxScore > 0 ? mejor.r : null;
  }

  /* ═══════════════════════════════════════════
     ESTADO
  ═══════════════════════════════════════════ */
  const estado = { pasoActual: 0, iniciado: false, avanzando: false };

  /* ═══════════════════════════════════════════
     ESTILOS
  ═══════════════════════════════════════════ */
  function injectStyles() {
    const s = document.createElement('style');
    s.textContent = `
      #dmf-fab {
        position:fixed;bottom:28px;right:28px;width:56px;height:56px;border-radius:50%;
        background:linear-gradient(135deg,#ff4757 0%,#ff6b35 100%);
        border:none;cursor:pointer;z-index:9000;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 24px rgba(255,71,87,.55);
        transition:transform .2s,box-shadow .2s;font-size:24px;
      }
      #dmf-fab:hover{transform:scale(1.1) translateY(-2px);box-shadow:0 8px 32px rgba(255,71,87,.7);}
      #dmf-fab .dp{position:absolute;inset:-5px;border-radius:50%;border:2px solid rgba(255,71,87,.4);animation:dpulse 2s infinite;}
      #dmf-fab .db{
        position:absolute;top:-3px;right:-3px;
        background:#00e5ff;color:#080c10;
        font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;
        width:18px;height:18px;border-radius:50%;
        display:none;align-items:center;justify-content:center;
        box-shadow:0 2px 8px rgba(0,229,255,.5);
      }
      #dmf-fab .db.show{display:flex;}
      @keyframes dpulse{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.35);opacity:0}100%{transform:scale(1.35);opacity:0}}

      #dmf-panel{
        position:fixed;bottom:96px;right:28px;width:370px;max-height:610px;
        background:#0a0e14;border:1px solid rgba(255,71,87,.18);border-radius:18px;
        display:flex;flex-direction:column;z-index:9001;
        box-shadow:0 32px 80px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04);
        overflow:hidden;
        transform:scale(.93) translateY(16px);opacity:0;pointer-events:none;
        transition:all .28s cubic-bezier(.34,1.56,.64,1);
      }
      #dmf-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}

      .dmf-hd{
        padding:13px 15px 11px;
        background:linear-gradient(135deg,rgba(255,71,87,.1) 0%,rgba(255,107,53,.06) 100%);
        border-bottom:1px solid rgba(255,255,255,.05);
        display:flex;align-items:center;gap:10px;flex-shrink:0;
      }
      .dmf-av{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#ff4757,#ff6b35);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
      .dmf-hn{font-family:'Orbitron',sans-serif;font-size:11px;color:#ff4757;letter-spacing:.1em;text-transform:uppercase;}
      .dmf-hs{font-family:'Space Mono',monospace;font-size:9px;color:rgba(255,255,255,.3);margin-top:1px;}
      .dmf-hs span{color:#00ff9d;}
      .dmf-xbtn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:7px;width:28px;height:28px;cursor:pointer;color:rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;}
      .dmf-xbtn:hover{background:rgba(255,71,87,.2);color:#ff4757;border-color:rgba(255,71,87,.3);}

      .dmf-prog-wrap{height:3px;background:rgba(255,255,255,.05);flex-shrink:0;}
      .dmf-prog-fill{height:100%;background:linear-gradient(90deg,#ff4757,#ff6b35);transition:width .5s ease;}

      .dmf-msgs{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}
      .dmf-msgs::-webkit-scrollbar{width:3px;}
      .dmf-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px;}

      .dmf-msg{animation:dmfIn .22s ease both;}
      @keyframes dmfIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

      .dmf-plabel{font-family:'Orbitron',sans-serif;font-size:9px;color:#ff4757;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:5px;}
      .dmf-plabel::before{content:'';display:block;width:3px;height:10px;background:#ff4757;border-radius:2px;}

      .dmf-bubble{background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;padding:11px 13px;font-family:'DM Sans',sans-serif;font-size:12.5px;color:#c8d3e0;line-height:1.7;}
      .dmf-bubble strong{color:#e8edf5;}
      .dmf-bubble p{margin:0 0 7px;}
      .dmf-bubble p:last-child{margin-bottom:0;}
      .dmf-bubble code{background:rgba(255,71,87,.12);padding:1px 5px;border-radius:3px;font-family:'Space Mono',monospace;font-size:10.5px;color:#ff8c9e;}

      .dmf-ububble{background:linear-gradient(135deg,rgba(255,71,87,.16),rgba(255,107,53,.1));border:1px solid rgba(255,71,87,.22);border-radius:14px 14px 4px 14px;padding:8px 12px;font-family:'Space Mono',monospace;font-size:11px;color:#e8edf5;align-self:flex-end;max-width:88%;}

      .dmf-tip{background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.14);border-radius:8px;padding:8px 10px;margin-top:6px;font-family:'Space Mono',monospace;font-size:10px;color:#5eead4;line-height:1.5;}

      .dmf-btn{background:linear-gradient(135deg,#ff4757,#ff6b35);border:none;border-radius:9px;padding:9px 16px;margin-top:8px;color:#fff;font-family:'Space Mono',monospace;font-size:11px;cursor:pointer;transition:all .2s;letter-spacing:.03em;width:100%;text-align:center;box-shadow:0 4px 14px rgba(255,71,87,.3);}
      .dmf-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(255,71,87,.45);}
      .dmf-btn:disabled{opacity:.4;cursor:default;transform:none;}

      .dmf-btn-ghost{background:rgba(255,71,87,.1);border:1px solid rgba(255,71,87,.25);border-radius:8px;padding:7px 12px;margin-top:6px;color:#ff6b81;font-family:'Space Mono',monospace;font-size:10px;cursor:pointer;transition:all .15s;width:100%;text-align:center;}
      .dmf-btn-ghost:hover{background:rgba(255,71,87,.2);color:#ff4757;}

      .dmf-typing{display:flex;align-items:center;gap:4px;padding:9px 12px;background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;width:fit-content;}
      .dmf-dot{width:6px;height:6px;background:rgba(255,71,87,.6);border-radius:50%;animation:dbounce .9s infinite;}
      .dmf-dot:nth-child(2){animation-delay:.15s;}
      .dmf-dot:nth-child(3){animation-delay:.3s;}
      @keyframes dbounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}

      .dmf-input-area{padding:10px 12px 13px;border-top:1px solid rgba(255,255,255,.05);display:flex;gap:8px;flex-shrink:0;background:#080c10;}
      #dmf-input{flex:1;background:#111820;border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:8px 11px;color:#e8edf5;font-family:'Space Mono',monospace;font-size:11px;outline:none;transition:border-color .2s;}
      #dmf-input:focus{border-color:rgba(255,71,87,.5);}
      #dmf-input::placeholder{color:rgba(255,255,255,.18);}
      #dmf-send{background:linear-gradient(135deg,#ff4757,#ff6b35);border:none;border-radius:9px;width:36px;height:36px;cursor:pointer;color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
      #dmf-send:hover{transform:scale(1.07);box-shadow:0 4px 14px rgba(255,71,87,.4);}

      .dmf-hl{outline:2px solid #ff4757 !important;outline-offset:3px !important;animation:dmfglow 1.4s ease-in-out infinite alternate;}
      @keyframes dmfglow{from{box-shadow:0 0 6px rgba(255,71,87,.3)}to{box-shadow:0 0 18px rgba(255,71,87,.7)}}

      @media(max-width:480px){
        #dmf-panel{width:calc(100vw - 20px);right:10px;bottom:78px;}
        #dmf-fab{right:14px;bottom:14px;}
      }
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════
     DOM
  ═══════════════════════════════════════════ */
  function buildDOM() {
    const fab = document.createElement('button');
    fab.id = 'dmf-fab';
    fab.title = 'Profesor Virtual DMF';
    fab.innerHTML = `<span class="dp"></span><span class="db" id="dmf-db">!</span>🎓`;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'dmf-panel';
    panel.innerHTML = `
      <div class="dmf-hd">
        <div class="dmf-av">🎓</div>
        <div style="flex:1">
          <div class="dmf-hn">Profesor Virtual DMF</div>
          <div class="dmf-hs"><span>●</span> Guía paso a paso · IngeLAB 3D</div>
        </div>
        <button class="dmf-xbtn" id="dmf-close">✕</button>
      </div>
      <div class="dmf-prog-wrap"><div class="dmf-prog-fill" id="dmf-prog" style="width:0%"></div></div>
      <div class="dmf-msgs" id="dmf-msgs"></div>
      <div class="dmf-input-area">
        <input type="text" id="dmf-input" placeholder="Escribe tu duda aquí...">
        <button id="dmf-send">➤</button>
      </div>
    `;
    document.body.appendChild(panel);
  }

  /* ═══════════════════════════════════════════
     HIGHLIGHT
  ═══════════════════════════════════════════ */
  let hlTimer = null;
  function highlight(id) {
    document.querySelectorAll('.dmf-hl').forEach(el => el.classList.remove('dmf-hl'));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('dmf-hl');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearTimeout(hlTimer);
    hlTimer = setTimeout(() => el && el.classList.remove('dmf-hl'), 7000);
  }

  /* ═══════════════════════════════════════════
     MARKDOWN SIMPLE
  ═══════════════════════════════════════════ */
  function md(t) {
    return t
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>').replace(/$/, '</p>');
  }

  /* ═══════════════════════════════════════════
     MENSAJES
  ═══════════════════════════════════════════ */
  function addBotMsg(paso, soloTexto) {
    const msgs = document.getElementById('dmf-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dmf-msg';

    if (soloTexto) {
      wrap.innerHTML = `<div class="dmf-bubble">${md(soloTexto)}</div>`;
    } else {
      const idx = PASOS.indexOf(paso);
      const label = idx === 0 ? 'Bienvenida' : idx === PASOS.length - 1 ? '¡Completado!' : `Paso ${idx} de ${PASOS.length - 2}`;
      let html = `<div class="dmf-plabel">${label}</div>`;
      html += `<div class="dmf-bubble">${md(paso.mensaje)}</div>`;
      if (paso.tip) html += `<div class="dmf-tip">${md(paso.tip)}</div>`;
      if (paso.botonTexto) {
        html += `<button class="dmf-btn dmf-action-btn" data-paso-id="${paso.id}">${paso.botonTexto}</button>`;
      }
      wrap.innerHTML = html;

      // Bind directo sobre el elemento recién creado
      const btn = wrap.querySelector('.dmf-action-btn');
      if (btn) {
        btn.addEventListener('click', function () {
          this.disabled = true;
          this.style.opacity = '0.45';
          this.textContent = '✓ Continuando...';
          const pasoId = this.getAttribute('data-paso-id');
          if (pasoId === 'fin') {
            setTimeout(reiniciarGuia, 400);
          } else {
            setTimeout(avanzarPaso, 400);
          }
        });
      }
    }
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addUserMsg(t) {
    const msgs = document.getElementById('dmf-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dmf-msg';
    wrap.style.display = 'flex';
    wrap.style.justifyContent = 'flex-end';
    wrap.innerHTML = `<div class="dmf-ububble">${t}</div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing(cb) {
    const msgs = document.getElementById('dmf-msgs');
    const el = document.createElement('div');
    el.id = 'dmf-typing-el';
    el.className = 'dmf-msg';
    el.innerHTML = `<div class="dmf-typing"><span class="dmf-dot"></span><span class="dmf-dot"></span><span class="dmf-dot"></span></div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { el.remove(); if (cb) cb(); }, 700);
  }

  /* ═══════════════════════════════════════════
     PROGRESO
  ═══════════════════════════════════════════ */
  function updateProg() {
    const pct = Math.round((estado.pasoActual / (PASOS.length - 1)) * 100);
    const bar = document.getElementById('dmf-prog');
    if (bar) bar.style.width = pct + '%';
  }

  /* ═══════════════════════════════════════════
     AVANZAR PASO
  ═══════════════════════════════════════════ */
  function avanzarPaso() {
    if (estado.avanzando) return; // bloquea doble disparo
    const actual = PASOS[estado.pasoActual];
    if (!actual.siguiente) return;
    estado.avanzando = true;
    highlight(null);
    const idx = PASOS.findIndex(p => p.id === actual.siguiente);
    if (idx === -1) { estado.avanzando = false; return; }
    estado.pasoActual = idx;
    updateProg();
    const sig = PASOS[idx];
    typing(() => {
      addBotMsg(sig);
      if (sig.highlight) setTimeout(() => highlight(sig.highlight), 400);
      setTimeout(() => { estado.avanzando = false; }, 800); // libera después de que termina la animación
    });
  }

  function reiniciarGuia() {
    estado.pasoActual = 0;
    estado.avanzando = false;
    document.getElementById('dmf-msgs').innerHTML = '';
    updateProg();
    typing(() => addBotMsg(PASOS[0]));
  }

  /* ═══════════════════════════════════════════
     LISTENERS DEL FORMULARIO
  ═══════════════════════════════════════════ */
  function setupListeners() {
    // Tipo de viga
    const inpTipo = document.getElementById('inp_tipo');
    if (inpTipo) inpTipo.addEventListener('change', () => {
      if (PASOS[estado.pasoActual].id === 'tipo_viga') setTimeout(avanzarPaso, 400);
    });

    // Longitud
    const inpL = document.getElementById('inp_L');
    if (inpL) inpL.addEventListener('change', () => {
      if (PASOS[estado.pasoActual].id === 'longitud') setTimeout(avanzarPaso, 400);
    });

    // Tipo sección
    const inpSec = document.getElementById('inp_seccion');
    if (inpSec) inpSec.addEventListener('change', () => {
      if (PASOS[estado.pasoActual].id === 'seccion') setTimeout(avanzarPaso, 400);
    });

    // Agregar carga
    const btnAdd = document.getElementById('btnAddCarga');
    if (btnAdd) btnAdd.addEventListener('click', () => {
      if (PASOS[estado.pasoActual].id === 'cargas') setTimeout(avanzarPaso, 600);
    });

    // Casos típicos también cuentan
    document.querySelectorAll('.caso-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (PASOS[estado.pasoActual].id === 'cargas') setTimeout(avanzarPaso, 800);
      });
    });

    // Calcular
    const btnCalc = document.getElementById('btnCalc');
    if (btnCalc) btnCalc.addEventListener('click', () => {
      if (PASOS[estado.pasoActual].id === 'calcular') setTimeout(avanzarPaso, 1200);
    });
  }

  /* ═══════════════════════════════════════════
     MANEJAR PREGUNTAS LIBRES
  ═══════════════════════════════════════════ */
  function handleInput(query) {
    if (!query.trim()) return;
    addUserMsg(query);
    document.getElementById('dmf-input').value = '';

    typing(() => {
      const resp = respuestaLibre(query);
      const msgs = document.getElementById('dmf-msgs');
      const wrap = document.createElement('div');
      wrap.className = 'dmf-msg';

      const texto = resp || `No encontré esa respuesta específica, pero puedo explicarte:\n\n• ¿Qué es el momento flector?\n• ¿Qué es el DCR?\n• ¿Cómo elijo b y h?\n• ¿Qué es la flecha δ?\n\nIntenta reformular tu pregunta.`;

      wrap.innerHTML = `
        <div class="dmf-bubble">${md(texto)}</div>
        <button class="dmf-btn-ghost dmf-return">↩ Volver a la guía</button>
      `;
      wrap.querySelector('.dmf-return').addEventListener('click', () => {
        typing(() => addBotMsg(PASOS[estado.pasoActual]));
      });
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
    });
  }

  /* ═══════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════ */
  function init() {
    injectStyles();
    buildDOM();
    setupListeners();

    const fab = document.getElementById('dmf-fab');
    const panel = document.getElementById('dmf-panel');
    let open = false;

    // Badge de atención después de 3s
    setTimeout(() => {
      const db = document.getElementById('dmf-db');
      if (db) db.classList.add('show');
    }, 3000);

    fab.addEventListener('click', () => {
      open = !open;
      panel.classList.toggle('open', open);
      const db = document.getElementById('dmf-db');
      if (db) db.classList.remove('show');

      if (open && !estado.iniciado) {
        estado.iniciado = true;
        updateProg();
        setTimeout(() => typing(() => addBotMsg(PASOS[0])), 300);
      }
    });

    document.getElementById('dmf-close').addEventListener('click', () => {
      open = false;
      panel.classList.remove('open');
    });

    const inp = document.getElementById('dmf-input');
    document.getElementById('dmf-send').addEventListener('click', () => handleInput(inp.value));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(inp.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();