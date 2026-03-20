/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ASISTENTE DI — Guía Interactiva tipo Profesor                 ║
 * ║   IngeLAB 3D · interaccion.html                                 ║
 * ║   Diagrama de Interacción M-N · ACI 318-19                      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     PASOS DEL WIZARD
  ═══════════════════════════════════════════ */
  const PASOS = [
    {
      id: 'bienvenida',
      siguiente: 'geometria',
      mensaje: `¡Hola! Soy tu **Profesor Virtual de Diagrama de Interacción**. 🏛️\n\nEste módulo calcula la curva φPn − φMn para **columnas de hormigón armado**, que define todos los pares de carga axial y momento que la sección puede resistir simultáneamente.\n\nTe guiaré paso a paso:\n• Definir la geometría de la columna\n• Ingresar la armadura longitudinal\n• Definir los materiales\n• Ingresar la demanda (Mu, Nu)\n• Interpretar el diagrama y verificar\n\n¿Listo para comenzar?`,
      botonTexto: 'Sí, ¡empecemos! →',
      tip: null,
    },
    {
      id: 'geometria',
      siguiente: 'armadura',
      autoAvanzar: false,
      mensaje: `**Paso 1 — Geometría de la sección** 📐\n\nDefine las dimensiones de la sección transversal de la columna en el panel izquierdo.\n\n**b [m] — ancho:**\nDimensión horizontal de la sección.\n\n**h [m] — alto:**\nDimensión en la dirección del momento M. Es la más relevante para la resistencia a flexión.\n\n**Recubrimiento a CG barra [m]:**\nDistancia desde el borde de la sección hasta el **centro de gravedad** de las barras de acero. Incluye estribo + mitad del diámetro de la barra.\nValor típico: **0.05 m** (= 5 cm)\n\n**Ejemplos típicos en edificios:**\n• Columna 35×35 cm → b=0.35, h=0.35\n• Columna 40×50 cm → b=0.40, h=0.50\n• Columna 50×50 cm → b=0.50, h=0.50\n\n👆 Ingresa b, h y recubrimiento en el panel izquierdo.`,
      highlight: 'inp_b',
      botonTexto: '✅ Ya ingresé la geometría → Siguiente',
      tip: '💡 Usa los **Casos predefinidos** del panel para cargar automáticamente una configuración típica y entender el formato.',
    },
    {
      id: 'armadura',
      siguiente: 'materiales',
      autoAvanzar: false,
      mensaje: `**Paso 2 — Armadura longitudinal** 🔩\n\nLa armadura longitudinal es el acero que recorre la columna de arriba a abajo y resiste la combinación de axial + momento.\n\n**N° de barras:**\nNúmero total de barras distribuidas en el perímetro de la sección.\n• Mínimo recomendado: 4 barras (una en cada esquina)\n• Lo más común: 8 a 12 barras\n\n**Diámetro de barra:**\nDiámetro nominal del acero. En Chile se usa:\n• Ø16 mm → columnas secundarias\n• Ø20 mm → columnas principales ✓\n• Ø22-25 mm → columnas muy solicitadas\n\n**As (área total de acero)** se calcula automáticamente y se muestra en la pantalla.\n\n**ρ (cuantía):** As / Ag\n• ACI 318-19 exige: **0.01 ≤ ρ ≤ 0.08**\n• Valor típico recomendado: 0.02 a 0.04\n\n👆 Selecciona el número de barras y el diámetro.`,
      highlight: 'inp_nbarras',
      botonTexto: '✅ Ya definí la armadura → Siguiente',
      tip: '💡 Si ρ aparece fuera del rango 1%-8%, ACI 318 no lo permite. Ajusta el número o diámetro de barras.',
    },
    {
      id: 'materiales',
      siguiente: 'demanda',
      autoAvanzar: false,
      mensaje: `**Paso 3 — Materiales** 🧱\n\nDefine las propiedades de los materiales en la sección **"Material"** del panel izquierdo.\n\n**f'c [MPa] — Resistencia del hormigón:**\n• H-25 (25 MPa) → estándar en Chile ✓\n• H-30 (30 MPa) → edificios de altura\n• H-35+ → columnas muy solicitadas\n\n**fy [MPa] — Límite de fluencia del acero:**\n• 420 MPa → A630-420H (el más usado en Chile) ✓\n• 280 MPa → acero antiguo\n• 500 MPa → alta resistencia\n\n**εcu — Deformación unitaria última del hormigón:**\n• 0.003 → ACI 318-19 (norma americana y chilena)\n• 0.0035 → Eurocódigo 2\n\n**Tipo de estribos:**\n• Estribos rectangulares → φ = 0.65\n• Espiral → φ = 0.75 (más dúctil, mejor confinamiento)\n\n👆 Verifica o ajusta los materiales.`,
      highlight: 'inp_fc',
      botonTexto: '✅ Materiales definidos → Siguiente',
      tip: '💡 El factor φ (phi) reduce la resistencia nominal para cubrir incertidumbres. Espiral tiene φ mayor porque confina mejor el hormigón.',
    },
    {
      id: 'demanda',
      siguiente: 'calcular',
      autoAvanzar: false,
      mensaje: `**Paso 4 — Demanda: Mu y Nu** ⬇️\n\nAhora ingresa los esfuerzos de diseño que actúan sobre la columna. Estos vienen del análisis estructural del edificio.\n\n**Mu [kN·m] — Momento último de diseño:**\nEl momento flector amplificado que debe resistir la columna.\n• Valores típicos: 50 a 300 kN·m\n\n**Nu [kN] — Carga axial última de diseño:**\n• **Positivo (+)** → Compresión (lo más común en columnas)\n• **Negativo (−)** → Tracción (poco frecuente, solo en elementos especiales)\n• Valores típicos: 500 a 3000 kN\n\n**¿De dónde salen Mu y Nu?**\nDel análisis estructural con cargas amplificadas:\n• Nu = 1.2·D + 1.6·L (NCh 1537 / ACI 318)\n• Mu = resultado del análisis de marcos\n\n👆 Ingresa Mu y Nu en los campos del panel izquierdo.`,
      highlight: 'inp_Mu',
      botonTexto: '✅ Ya ingresé Mu y Nu → Calcular',
      tip: '💡 Si no tienes el análisis estructural, empieza con Nu = 800 kN y Mu = 150 kN·m — valores típicos para una columna de edificio de 4-5 pisos.',
    },
    {
      id: 'calcular',
      siguiente: 'interpretar',
      autoAvanzar: true,
      mensaje: `**Paso 5 — ¡A calcular!** ⚡\n\nTodo está listo. Presiona el botón **⚡ CALCULAR** en la barra superior derecha.\n\nEl programa construirá la curva de interacción calculando:\n✔ Punto A: Compresión pura φP₀ (sin momento)\n✔ Punto B: Tensión pura φPt (solo tracción)\n✔ Punto balanceado: Máximo momento simultáneo\n✔ Cientos de puntos intermedios de la curva\n✔ Verificación: ¿El punto (Mu, Nu) está DENTRO de la curva?\n\n👆 Presiona **⚡ CALCULAR** arriba a la derecha.`,
      highlight: 'btnCalc',
      botonTexto: '✅ Ya presioné Calcular → Ver resultados',
      tip: '💡 La curva completa representa todos los pares (M, N) que la sección puede resistir. Todo punto DENTRO de la curva es seguro.',
    },
    {
      id: 'interpretar',
      siguiente: 'fin',
      autoAvanzar: false,
      mensaje: `**Paso 6 — Interpretando el diagrama** 📊\n\nMira el diagrama central y el panel derecho:\n\n**La curva φPn − φMn:**\nCada punto de la curva representa un estado límite de la sección. El área interior es la zona segura.\n\n**Punto rojo en el diagrama:**\nRepresenta tu demanda (Mu, Nu).\n• 🟢 **Dentro de la curva** → Sección CUMPLE ✅\n• 🔴 **Fuera de la curva** → Sección NO CUMPLE ❌\n\n**DCR (Demand/Capacity Ratio):**\n• DCR < 1.0 → cumple con reserva\n• DCR > 1.0 → hay que aumentar sección o armadura\n\n**Puntos clave del panel derecho:**\n• **φP₀** → Capacidad de compresión pura máxima\n• **φMn_bal** → Máximo momento posible (punto balanceado)\n• **c balanceada** → Posición del eje neutro en el punto balanceado\n\n**Zona de comportamiento:**\n• Controlada por compresión → Nu alto\n• Controlada por tracción → Nu bajo (acero fluye primero)`,
      botonTexto: '✅ Entendido → ¿Qué hago si no cumple?',
      tip: '💡 El punto balanceado es el de mayor capacidad a momento. Operar cerca de él es eficiente, pero requiere más ductilidad.',
    },
    {
      id: 'fin',
      siguiente: null,
      mensaje: `**¡Excelente!** 🎉\n\nHas completado el análisis del Diagrama de Interacción.\n\n**Si el punto quedó FUERA de la curva (DCR > 1):**\n1. **Aumentar As** → más barras o mayor diámetro\n2. **Aumentar b o h** → mayor sección\n3. **Aumentar f'c** → hormigón más resistente\n4. **Usar espiral** → mayor φ = 0.75\n5. **Redistribuir cargas** → revisar el análisis estructural\n\n**Para seguir aprendiendo:**\n• Prueba mover Nu hacia el punto balanceado y observa cómo crece φMn\n• Compara una sección 40×40 vs 40×60 para el mismo refuerzo\n• Prueba cambiar fy de 280 a 420 MPa y observa el efecto\n\n¿Tienes alguna duda? Escríbeme aquí abajo 👇`,
      botonTexto: '↺ Reiniciar guía desde el inicio',
    },
  ];

  /* ═══════════════════════════════════════════
     PREGUNTAS FRECUENTES
  ═══════════════════════════════════════════ */
  const QA = [
    { k: ['diagrama de interacción','curva','qué es','concepto','para qué'], r: `El **Diagrama de Interacción φPn−φMn** es la curva que define todos los pares de carga axial (N) y momento (M) que una sección de columna puede resistir simultáneamente.\n\n• Todo punto DENTRO de la curva → sección segura ✅\n• Todo punto FUERA de la curva → sección falla ❌\n\nEs el método de diseño de columnas según **ACI 318-19** (y NCh 430). A diferencia de una viga donde M actúa solo, en columnas M y N actúan juntos.` },
    { k: ['punto balanceado','balanceado','cbal','c bal'], r: `El **punto balanceado** es el par (Mn_bal, Pn_bal) donde ocurre simultáneamente:\n• El hormigón alcanza εcu = 0.003 (aplasta)\n• El acero de tracción alcanza εy = fy/Es (fluye)\n\nEs el punto de **máximo momento** de la curva. A partir de allí:\n• Nu > Pn_bal → zona controlada por compresión\n• Nu < Pn_bal → zona controlada por tracción (mayor ductilidad)` },
    { k: ['dcr','cumple','no cumple','fuera','dentro'], r: `**DCR = distancia al origen del punto demanda / distancia al origen del punto en la curva**\n\n• DCR < 1.0 ✅ → La columna cumple\n• DCR > 1.0 ❌ → La columna no cumple\n\n**Si DCR > 1, opciones:**\n1. Más barras o mayor diámetro (↑ As)\n2. Mayor sección (↑ b o h)\n3. Mayor f'c\n4. Cambiar a estribos en espiral (φ=0.75)` },
    { k: ['cuantía','rho','ρ','porcentaje acero','as/ag'], r: `**ρ = As / Ag** (cuantía de armadura)\n\n**Límites ACI 318-19:**\n• ρ_min = 1% = 0.01 → evita falla frágil por fluencia súbita\n• ρ_max = 8% = 0.08 → evita congestión del hormigón\n\n**Valores recomendados en práctica:**\n• ρ = 2% a 3% → económico y constructivo\n• ρ > 4% → congestión de armadura, difícil de hormigonar` },
    { k: ['recubrimiento','recub','d\'','d prima'], r: `El **recubrimiento a CG de barra** es la distancia desde el borde externo de la sección hasta el **centro geométrico** de la barra:\n\nd' = recubrimiento libre + diámetro estribo + Ø_barra/2\n\n**Valores típicos:**\n• Columnas interiores: d' = 0.05 m (50 mm)\n• Columnas expuestas: d' = 0.065 m (65 mm)\n\nAfepta directamente el brazo de palanca del acero y por tanto la capacidad a momento.` },
    { k: ['phi','φ','factor reducción','0.65','0.75'], r: `**Factor φ (phi) de reducción de resistencia — ACI 318-19:**\n\n• φ = 0.65 → Columnas con estribos rectangulares\n• φ = 0.75 → Columnas con estribos en espiral\n• φ varía de 0.65 a 0.90 en la zona de tracción controlada\n\n**¿Por qué φ < 1?**\nCubre incertidumbres en materiales, dimensiones y mano de obra. Las columnas tienen φ menor que las vigas porque su falla es más frágil y catastrófica.` },
    { k: ['fy','acero','420','280','fluencia'], r: `**fy = límite de fluencia del acero:**\n\n• **420 MPa** → A630-420H, el estándar en Chile ✓ (NCh 204)\n• 280 MPa → Acero antiguo, ya no se produce\n• 500 MPa → Alta resistencia, importado\n\n**Efecto en el diagrama:**\nMayor fy → mayor capacidad a momento en zona de tracción controlada → curva más ancha en la parte inferior.` },
    { k: ['fc','f\'c','hormigon','resistencia','mpa'], r: `**f'c = resistencia característica del hormigón (28 días):**\n\n• H-25 (25 MPa) → estándar estructural Chile ✓\n• H-30 (30 MPa) → edificios de mayor altura\n• H-35+ → columnas muy cargadas\n\n**Efecto en el diagrama:**\nMayor f'c → mayor φP₀ (compresión pura) → curva más alta. Pero el punto balanceado no cambia proporcionalmente.` },
    { k: ['ecu','deformación última','0.003','0.0035'], r: `**εcu = deformación unitaria última del hormigón:**\n\n• **0.003** → ACI 318-19 y NCh 430 (norma chilena)\n• 0.0035 → Eurocódigo 2 (norma europea)\n\nEs el valor en la fibra más comprimida cuando el hormigón "aplasta". Define el estado límite de la sección.\n\nEn Chile se usa 0.003 según NCh 430 que adopta los criterios ACI.` },
    { k: ['beta','β1','bloque','whitney'], r: `**β₁ (beta 1)** es el factor del bloque rectangular de compresiones de Whitney:\n\n• f'c ≤ 28 MPa → β₁ = 0.85\n• f'c > 28 MPa → β₁ = 0.85 − 0.05·(f'c−28)/7 ≥ 0.65\n\nPermite reemplazar la distribución parabólica de tensiones por un bloque rectangular equivalente de profundidad a = β₁·c.\n\nEs una simplificación de ACI que facilita enormemente el cálculo.` },
    { k: ['normativa','aci','nch','codigo'], r: `**Normativa de referencia:**\n\n🇨🇱 **NCh 430:2008** → Hormigón Armado Chile (adopta criterios ACI)\n🇨🇱 **NCh 1537:2009** → Cargas en edificios\n🇺🇸 **ACI 318-19** → Building Code, Cap. 22 — Resistencia de secciones\n🇺🇸 **ACI 318-19, Cap. 10** → Columnas\n\n**Nota:** Este módulo es una herramienta educativa. Para proyectos reales consultar con Ingeniero Civil Estructural.` },
  ];

  function respuestaLibre(q) {
    const t = q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let mejor = null, max = 0;
    for (const item of QA) {
      let score = 0;
      for (const k of item.k) if (t.includes(k)) score += k.length;
      if (score > max) { max = score; mejor = item; }
    }
    return max > 0 ? mejor.r : null;
  }

  /* ═══════════════════════════════════════════
     ESTADO
  ═══════════════════════════════════════════ */
  const estado = { pasoActual: 0, iniciado: false, avanzando: false };

  /* ═══════════════════════════════════════════
     ESTILOS — idéntico al asistente DMF
  ═══════════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('di-asistente-styles')) return;
    const s = document.createElement('style');
    s.id = 'di-asistente-styles';
    s.textContent = `
      #di-fab {
        position:fixed;bottom:28px;right:28px;width:56px;height:56px;border-radius:50%;
        background:linear-gradient(135deg,#ff4757 0%,#ff6b35 100%);
        border:none;cursor:pointer;z-index:9000;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 24px rgba(255,71,87,.55);
        transition:transform .2s,box-shadow .2s;font-size:24px;
      }
      #di-fab:hover{transform:scale(1.1) translateY(-2px);box-shadow:0 8px 32px rgba(255,71,87,.7);}
      #di-fab .dp{position:absolute;inset:-5px;border-radius:50%;border:2px solid rgba(255,71,87,.4);animation:dipulse 2s infinite;}
      #di-fab .db{position:absolute;top:-3px;right:-3px;background:#00e5ff;color:#080c10;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;width:18px;height:18px;border-radius:50%;display:none;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,229,255,.5);}
      #di-fab .db.show{display:flex;}
      @keyframes dipulse{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.35);opacity:0}100%{transform:scale(1.35);opacity:0}}

      #di-panel{
        position:fixed;bottom:96px;right:28px;width:370px;max-height:610px;
        background:#0a0e14;border:1px solid rgba(255,71,87,.18);border-radius:18px;
        display:flex;flex-direction:column;z-index:9001;
        box-shadow:0 32px 80px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04);
        overflow:hidden;transform:scale(.93) translateY(16px);opacity:0;pointer-events:none;
        transition:all .28s cubic-bezier(.34,1.56,.64,1);
      }
      #di-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}

      .di-hd{padding:13px 15px 11px;background:linear-gradient(135deg,rgba(255,71,87,.1) 0%,rgba(255,107,53,.06) 100%);border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:10px;flex-shrink:0;}
      .di-av{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#ff4757,#ff6b35);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
      .di-hn{font-family:'Orbitron',sans-serif;font-size:11px;color:#ff4757;letter-spacing:.1em;text-transform:uppercase;}
      .di-hs{font-family:'Space Mono',monospace;font-size:9px;color:rgba(255,255,255,.3);margin-top:1px;}
      .di-hs span{color:#00ff9d;}
      .di-xbtn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:7px;width:28px;height:28px;cursor:pointer;color:rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;}
      .di-xbtn:hover{background:rgba(255,71,87,.2);color:#ff4757;border-color:rgba(255,71,87,.3);}

      .di-prog-wrap{height:3px;background:rgba(255,255,255,.05);flex-shrink:0;}
      .di-prog-fill{height:100%;background:linear-gradient(90deg,#ff4757,#ff6b35);transition:width .5s ease;}

      .di-msgs{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}
      .di-msgs::-webkit-scrollbar{width:3px;}
      .di-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px;}

      .di-msg{animation:diIn .22s ease both;}
      @keyframes diIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

      .di-plabel{font-family:'Orbitron',sans-serif;font-size:9px;color:#ff4757;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:5px;}
      .di-plabel::before{content:'';display:block;width:3px;height:10px;background:#ff4757;border-radius:2px;}

      .di-bubble{background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;padding:11px 13px;font-family:'DM Sans',sans-serif;font-size:12.5px;color:#c8d3e0;line-height:1.7;}
      .di-bubble strong{color:#e8edf5;}
      .di-bubble p{margin:0 0 7px;}
      .di-bubble p:last-child{margin-bottom:0;}
      .di-bubble code{background:rgba(255,71,87,.12);padding:1px 5px;border-radius:3px;font-family:'Space Mono',monospace;font-size:10.5px;color:#ff8c9e;}

      .di-ububble{background:linear-gradient(135deg,rgba(255,71,87,.16),rgba(255,107,53,.1));border:1px solid rgba(255,71,87,.22);border-radius:14px 14px 4px 14px;padding:8px 12px;font-family:'Space Mono',monospace;font-size:11px;color:#e8edf5;align-self:flex-end;max-width:88%;}

      .di-tip{background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.14);border-radius:8px;padding:8px 10px;margin-top:6px;font-family:'Space Mono',monospace;font-size:10px;color:#5eead4;line-height:1.5;}

      .di-btn{background:linear-gradient(135deg,#ff4757,#ff6b35);border:none;border-radius:9px;padding:9px 16px;margin-top:8px;color:#fff;font-family:'Space Mono',monospace;font-size:11px;cursor:pointer;transition:all .2s;width:100%;text-align:center;box-shadow:0 4px 14px rgba(255,71,87,.3);}
      .di-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(255,71,87,.45);}
      .di-btn:disabled{opacity:.4;cursor:default;transform:none;}

      .di-btn-ghost{background:rgba(255,71,87,.1);border:1px solid rgba(255,71,87,.25);border-radius:8px;padding:7px 12px;margin-top:6px;color:#ff6b81;font-family:'Space Mono',monospace;font-size:10px;cursor:pointer;transition:all .15s;width:100%;text-align:center;}
      .di-btn-ghost:hover{background:rgba(255,71,87,.2);color:#ff4757;}

      .di-typing{display:flex;align-items:center;gap:4px;padding:9px 12px;background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;width:fit-content;}
      .di-dot{width:6px;height:6px;background:rgba(255,71,87,.6);border-radius:50%;animation:dibounce .9s infinite;}
      .di-dot:nth-child(2){animation-delay:.15s;}
      .di-dot:nth-child(3){animation-delay:.3s;}
      @keyframes dibounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}

      .di-input-area{padding:10px 12px 13px;border-top:1px solid rgba(255,255,255,.05);display:flex;gap:8px;flex-shrink:0;background:#080c10;}
      #di-input{flex:1;background:#111820;border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:8px 11px;color:#e8edf5;font-family:'Space Mono',monospace;font-size:11px;outline:none;transition:border-color .2s;}
      #di-input:focus{border-color:rgba(255,71,87,.5);}
      #di-input::placeholder{color:rgba(255,255,255,.18);}
      #di-send{background:linear-gradient(135deg,#ff4757,#ff6b35);border:none;border-radius:9px;width:36px;height:36px;cursor:pointer;color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
      #di-send:hover{transform:scale(1.07);box-shadow:0 4px 14px rgba(255,71,87,.4);}

      .di-hl{outline:2px solid #ff4757 !important;outline-offset:3px !important;animation:diglow 1.4s ease-in-out infinite alternate;}
      @keyframes diglow{from{box-shadow:0 0 6px rgba(255,71,87,.3)}to{box-shadow:0 0 18px rgba(255,71,87,.7)}}

      @media(max-width:480px){#di-panel{width:calc(100vw - 20px);right:10px;bottom:78px;}#di-fab{right:14px;bottom:14px;}}
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════
     DOM
  ═══════════════════════════════════════════ */
  function buildDOM() {
    const fab = document.createElement('button');
    fab.id = 'di-fab';
    fab.title = 'Profesor Virtual — Diagrama de Interacción';
    fab.innerHTML = `<span class="dp"></span><span class="db" id="di-db">!</span>🎓`;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'di-panel';
    panel.innerHTML = `
      <div class="di-hd">
        <div class="di-av">🏛️</div>
        <div style="flex:1">
          <div class="di-hn">Profesor Virtual DI</div>
          <div class="di-hs"><span>●</span> Diagrama de Interacción · IngeLAB 3D</div>
        </div>
        <button class="di-xbtn" id="di-close">✕</button>
      </div>
      <div class="di-prog-wrap"><div class="di-prog-fill" id="di-prog" style="width:0%"></div></div>
      <div class="di-msgs" id="di-msgs"></div>
      <div class="di-input-area">
        <input type="text" id="di-input" placeholder="Escribe tu duda aquí...">
        <button id="di-send">➤</button>
      </div>
    `;
    document.body.appendChild(panel);
  }

  /* ═══════════════════════════════════════════
     HIGHLIGHT
  ═══════════════════════════════════════════ */
  let hlTimer = null;
  function highlight(id) {
    document.querySelectorAll('.di-hl').forEach(el => el.classList.remove('di-hl'));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('di-hl');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearTimeout(hlTimer);
    hlTimer = setTimeout(() => el && el.classList.remove('di-hl'), 7000);
  }

  /* ═══════════════════════════════════════════
     MARKDOWN
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
    const msgs = document.getElementById('di-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'di-msg';

    if (soloTexto) {
      wrap.innerHTML = `<div class="di-bubble">${md(soloTexto)}</div>`;
    } else {
      const idx = PASOS.indexOf(paso);
      const label = idx === 0 ? 'Bienvenida' : idx === PASOS.length - 1 ? '¡Completado!' : `Paso ${idx} de ${PASOS.length - 2}`;
      let html = `<div class="di-plabel">${label}</div>`;
      html += `<div class="di-bubble">${md(paso.mensaje)}</div>`;
      if (paso.tip) html += `<div class="di-tip">${md(paso.tip)}</div>`;
      if (paso.botonTexto) {
        html += `<button class="di-btn di-action-btn" data-paso-id="${paso.id}">${paso.botonTexto}</button>`;
      }
      wrap.innerHTML = html;
      const btn = wrap.querySelector('.di-action-btn');
      if (btn) {
        btn.addEventListener('click', function () {
          this.disabled = true;
          this.style.opacity = '0.45';
          this.textContent = '✓ Continuando...';
          const pid = this.getAttribute('data-paso-id');
          setTimeout(() => pid === 'fin' ? reiniciarGuia() : avanzarPaso(), 400);
        });
      }
    }
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addUserMsg(t) {
    const msgs = document.getElementById('di-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'di-msg';
    wrap.style.display = 'flex';
    wrap.style.justifyContent = 'flex-end';
    wrap.innerHTML = `<div class="di-ububble">${t}</div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing(cb) {
    const msgs = document.getElementById('di-msgs');
    const el = document.createElement('div');
    el.id = 'di-typing-el';
    el.className = 'di-msg';
    el.innerHTML = `<div class="di-typing"><span class="di-dot"></span><span class="di-dot"></span><span class="di-dot"></span></div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { el.remove(); if (cb) cb(); }, 700);
  }

  /* ═══════════════════════════════════════════
     PROGRESO Y AVANCE
  ═══════════════════════════════════════════ */
  function updateProg() {
    const pct = Math.round((estado.pasoActual / (PASOS.length - 1)) * 100);
    const bar = document.getElementById('di-prog');
    if (bar) bar.style.width = pct + '%';
  }

  function avanzarPaso() {
    if (estado.avanzando) return;
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
      setTimeout(() => { estado.avanzando = false; }, 800);
    });
  }

  function reiniciarGuia() {
    estado.pasoActual = 0;
    estado.avanzando = false;
    document.getElementById('di-msgs').innerHTML = '';
    updateProg();
    typing(() => addBotMsg(PASOS[0]));
  }

  /* ═══════════════════════════════════════════
     LISTENERS DEL FORMULARIO
  ═══════════════════════════════════════════ */
  function setupListeners() {
    const btnCalc = document.getElementById('btnCalc');
    if (btnCalc) btnCalc.addEventListener('click', () => {
      if (PASOS[estado.pasoActual].id === 'calcular') setTimeout(avanzarPaso, 1200);
    });

    document.querySelectorAll('.caso-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (PASOS[estado.pasoActual].id === 'geometria') setTimeout(avanzarPaso, 800);
      });
    });
  }

  /* ═══════════════════════════════════════════
     PREGUNTAS LIBRES
  ═══════════════════════════════════════════ */
  function handleInput(query) {
    if (!query.trim()) return;
    addUserMsg(query);
    document.getElementById('di-input').value = '';
    typing(() => {
      const resp = respuestaLibre(query);
      const msgs = document.getElementById('di-msgs');
      const wrap = document.createElement('div');
      wrap.className = 'di-msg';
      const texto = resp || `No encontré esa respuesta específica, pero puedo explicarte:\n\n• ¿Qué es el Diagrama de Interacción?\n• ¿Qué es el punto balanceado?\n• ¿Qué es la cuantía ρ?\n• ¿Qué es β₁?\n\nIntenta reformular tu pregunta.`;
      wrap.innerHTML = `
        <div class="di-bubble">${md(texto)}</div>
        <button class="di-btn-ghost di-return">↩ Volver a la guía</button>
      `;
      wrap.querySelector('.di-return').addEventListener('click', () => {
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

    const fab = document.getElementById('di-fab');
    const panel = document.getElementById('di-panel');
    let open = false;

    setTimeout(() => {
      const db = document.getElementById('di-db');
      if (db) db.classList.add('show');
    }, 3000);

    fab.addEventListener('click', () => {
      open = !open;
      panel.classList.toggle('open', open);
      const db = document.getElementById('di-db');
      if (db) db.classList.remove('show');
      if (open && !estado.iniciado) {
        estado.iniciado = true;
        updateProg();
        setTimeout(() => typing(() => addBotMsg(PASOS[0])), 300);
      }
    });

    document.getElementById('di-close').addEventListener('click', () => {
      open = false;
      panel.classList.remove('open');
    });

    const inp = document.getElementById('di-input');
    document.getElementById('di-send').addEventListener('click', () => handleInput(inp.value));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(inp.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
