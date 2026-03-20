/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ASISTENTE DFC — Diagrama de Fuerza Cortante                   ║
 * ║   IngeLAB 3D · cortante.html                                    ║
 * ║   Guia paso a paso tipo profesor                                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en cortante.html:
 *   <script src="../js/asistente/asistente_cortante.js"></script>
 */

(function () {
  'use strict';

  const PASOS = [
    {
      id: 'bienvenida',
      siguiente: 'tipo_viga',
      mensaje: `Hola! Soy tu **Profesor Virtual de Fuerza Cortante**. ✂️\n\nEste modulo hace dos cosas a la vez:\n\n**1. Diagrama de Fuerza Cortante V(x):**\nMuestra como varia la fuerza de corte a lo largo de la viga.\n\n**2. Diseño a corte (ACI 318-19):**\nCalcula automaticamente Vc (aporte del hormigon), Vs (aporte de estribos) y la separacion s requerida.\n\nEs uno de los calculos mas importantes del diseño estructural — la falla por corte es fragil y repentina, a diferencia de la falla por flexion que es ductil.\n\nComenzamos?`,
      botonTexto: 'Si, empecemos! →',
      tip: null,
    },
    {
      id: 'tipo_viga',
      siguiente: 'longitud',
      autoAvanzar: true,
      mensaje: `**Paso 1 — Tipo de viga** 🏗️\n\nEste modulo maneja tres tipos de viga:\n\n**Simplemente apoyada:**\nEl cortante es maximo en los apoyos (igual a la reaccion) y puede ser cero en algun punto intermedio.\n\n**Voladizo:**\nEl cortante es maximo en el empotramiento y decrece hacia el extremo libre. No hay punto donde V=0 (excepto en el extremo libre).\n\n**Continua 2 tramos:**\nViga con apoyo intermedio. Genera un diagrama mas complejo con cambios de signo en el cortante. Se resuelve con el Teorema de Clapeyron (tres momentos).\n\n👆 Selecciona el tipo de viga en **"Geometria"**.`,
      highlight: 'inp_tipo',
      botonTexto: '✅ Ya seleccione el tipo → Siguiente',
      tip: '💡 Empieza con **Simplemente apoyada** para entender el concepto basico del cortante antes de pasar a la viga continua.',
    },
    {
      id: 'longitud',
      siguiente: 'seccion',
      autoAvanzar: true,
      mensaje: `**Paso 2 — Longitud L** 📏\n\nIngresa la longitud total de la viga en metros.\n\nLa longitud afecta directamente las reacciones y por tanto el cortante maximo:\n• Viga S.A. + q uniforme: V_max = qL/2 (en los apoyos)\n• Viga S.A. + P central: V_max = P/2\n• Voladizo + q: V_max = qL (en el empotramiento)\n\n**Para viga continua 2 tramos:**\nAparece el campo L1 y L2 para definir la longitud de cada tramo individualmente.\n\n👆 Ingresa la longitud en el campo **"Longitud L total"**.`,
      highlight: 'inp_L',
      botonTexto: '✅ Ya ingrese la longitud → Siguiente',
      tip: '💡 Para viga continua, L1 y L2 pueden ser diferentes. Una viga continua con tramos desiguales tiene un comportamiento asimetrico muy interesante.',
    },
    {
      id: 'seccion',
      siguiente: 'cargas',
      autoAvanzar: false,
      mensaje: `**Paso 3 — Seccion transversal H.A.** 🔲\n\nDefine las dimensiones de la seccion de hormigon armado. Estos datos se usan para el **diseño a corte**.\n\n**bw [m] — ancho del alma:**\nAncho de la seccion (o del alma en vigas T). Afecta directamente Vc y Vs.\n\n**h [m] — altura total:**\nAltura de la seccion. El peralte efectivo d = h - recubrimiento - Ø/2.\n\n**Recubrimiento [m]:**\nDistancia desde el borde hasta el CG de la barra de refuerzo longitudinal. Tipico: 0.04 m.\n\n**f'c [MPa]:**\nResistencia del hormigon. Afecta Vc = 0.17*sqrt(f'c)*bw*d.\n\n**fy estribos [MPa]:**\nResistencia del acero de los estribos. 420 MPa es el estandar en Chile.\n\n**Diametro estribo:**\nUsa el slider para seleccionar. Tipico: Ø8mm o Ø10mm.\n\n👆 Ingresa las dimensiones y presiona el boton.`,
      highlight: 'inp_bw',
      botonTexto: '✅ Seccion definida → Siguiente',
      tip: '💡 Regla practica: bw ≈ L/20 a L/25. Para L=6m → bw ≈ 0.25 a 0.30 m. La altura h ≈ L/12.',
    },
    {
      id: 'cargas',
      siguiente: 'calcular',
      autoAvanzar: false,
      mensaje: `**Paso 4 — Cargas aplicadas** ⬇️\n\nAgrega las cargas con **"+ Agregar carga"**.\n\n**Puntual P [kN]:**\nGenera un salto abrupto en el diagrama de cortante igual a P. El cortante cambia de signo instantaneamente en ese punto.\n\n**Distribuida q [kN/m]:**\nGenera una variacion lineal del cortante. El cortante disminuye linealmente a lo largo del tramo cargado.\n\n**Triangular [kN/m]:**\nCarga que varia linealmente. Genera una variacion parabolica del cortante.\n\n**Relacion fundamental:**\nV = dM/dx → el cortante es la derivada del momento\nq = -dV/dx → la carga es la derivada (negativa) del cortante\n\nDonde V = 0 → M es maximo.\n\n👆 Agrega tus cargas o usa los **Casos tipicos** del panel izquierdo.`,
      highlight: 'btnAddCarga',
      botonTexto: '✅ Cargas listas → Calcular',
      tip: '💡 Prueba el caso **"Continua 2T"** — genera el diagrama de cortante mas complejo con cambio de signo en el apoyo intermedio.',
    },
    {
      id: 'calcular',
      siguiente: 'interpretar_dfc',
      autoAvanzar: true,
      mensaje: `**Paso 5 — A calcular!** ⚡\n\nTodo esta listo. Presiona **⚡ CALCULAR** arriba a la derecha.\n\nEl programa calculara:\n✔ Reacciones RA y RB\n✔ Diagrama V(x) completo\n✔ V_max, V_min y puntos donde V=0\n✔ Peralte efectivo d\n✔ Vc (resistencia del hormigon a corte)\n✔ Vs requerido y separacion s de estribos\n✔ Verificacion de la seccion\n\n**3 diagramas en pantalla:**\n• Centro superior: diagrama V(x)\n• Centro inferior izquierdo: seccion transversal con estribo\n• Centro inferior derecho: separacion de estribos s(x)\n\n👆 Presiona **⚡ CALCULAR**.`,
      highlight: 'btnCalc',
      botonTexto: '✅ Ya calcule → Interpretar diagrama',
      tip: '💡 El diagrama de separacion de estribos s(x) es especialmente util — muestra como la separacion varia a lo largo de la viga (menor en los extremos donde el cortante es mayor).',
    },
    {
      id: 'interpretar_dfc',
      siguiente: 'interpretar_corte',
      autoAvanzar: false,
      mensaje: `**Paso 6 — Interpretando el diagrama V(x)** 📊\n\nMira el diagrama central superior:\n\n**Zona azul positiva:**\nCortante positivo — la cara izquierda de la seccion sube.\n\n**Zona roja negativa:**\nCortante negativo — la cara izquierda de la seccion baja.\n\n**V_max:** El cortante mas grande en valor absoluto. Ocurre en los apoyos para viga simplemente apoyada con carga uniforme.\n\n**V_min:** El cortante mas negativo.\n\n**Puntos donde V=0:** Ahi es exactamente donde M es maximo. Confirma la relacion V=dM/dx.\n\n**Saltos abruptos:** Indican cargas puntuales o reacciones en esos puntos.\n\n**Pendiente del diagrama:** Donde hay carga distribuida q, el cortante tiene pendiente = -q. Donde no hay carga, el cortante es constante (linea horizontal).`,
      botonTexto: '✅ Entiendo el diagrama → Ver diseño a corte',
      tip: '💡 En una viga simplemente apoyada con carga uniforme, el diagrama de cortante es una linea recta que va de +qL/2 en A a -qL/2 en B, cruzando cero en el centro.',
    },
    {
      id: 'interpretar_corte',
      siguiente: 'fin',
      autoAvanzar: false,
      mensaje: `**Paso 7 — Diseño a corte ACI 318-19** 🔩\n\nMira el panel derecho, seccion **"Diseño a corte"**:\n\n**d efectivo:**\nd = h - recubrimiento - Ø_long/2\nEs el brazo de palanca efectivo del refuerzo.\n\n**Vc (aporte del hormigon):**\nVc = 0.17 * lambda * sqrt(f'c) * bw * d\nEl hormigon por si solo resiste parte del cortante sin estribos.\n\n**Vs requerido:**\nVs = Vu/phi - Vc\nLo que los estribos deben aportar adicionalmente.\n\n**phi*Vn total:**\nphiVn = phi*(Vc+Vs) ≥ Vu  → debe ser mayor que el cortante ultimo.\n\n**Separacion s de estribos:**\ns = Av*fy*d / Vs\nDonde Av = area de 2 ramas del estribo.\n\n**Diagrama inferior derecho:**\nMuestra como la separacion s varia a lo largo de la viga — menor en los extremos (mayor cortante) y mayor en el centro.`,
      botonTexto: '✅ Entiendo el diseño a corte → Finalizar',
      tip: '💡 Si el cuadro dice "AUMENTAR SECCION" (rojo), significa que Vs excede el limite de 0.66*sqrt(f\'c)*bw*d. La solucion es aumentar bw o h.',
    },
    {
      id: 'fin',
      siguiente: null,
      mensaje: `**Excelente trabajo!** 🎉\n\nHas completado el analisis de Fuerza Cortante y Diseño a Corte.\n\n**Resumen de formulas clave:**\n• V_max = qL/2 (S.A. + q uniforme, en los apoyos)\n• Vc = 0.17*sqrt(f'c)*bw*d (ACI 318-19)\n• Vs = Av*fy*d/s\n• s ≤ d/2 si Vs ≤ 0.33*sqrt(f'c)*bw*d\n• s ≤ d/4 si Vs > 0.33*sqrt(f'c)*bw*d\n\n**Para reducir s (si es muy pequena):**\n1. Aumentar h → mayor d → menor Vs requerido\n2. Usar estribo de mayor diametro → mayor Av\n3. Usar fy mayor\n4. Aumentar bw → mayor Vc\n\n**Para explorar:**\n• Prueba la viga **Continua 2 tramos** — el diseño de estribos es diferente en cada tramo\n• Observa como cambia el diagrama s(x) al cambiar el diametro del estribo con el slider\n\nTienes dudas? Escribeme abajo 👇`,
      botonTexto: '↺ Reiniciar guia desde el inicio',
    },
  ];

  const QA = [
    { k: ['cortante','v(x)','vx','fuerza cortante','que es'], r: `La **fuerza cortante V(x)** es la resultante de todas las fuerzas perpendiculares al eje a un lado de la seccion.\n\nFormula: V(x) = RA - cargas a la izquierda de x\n\n• V cambia abruptamente en cargas puntuales\n• V varia linealmente en tramos con carga distribuida\n• Donde V=0 → M es maximo\n• V = dM/dx (cortante es derivada del momento)\n• q = -dV/dx (carga es derivada del cortante)` },
    { k: ['vc','hormigon','resistencia corte','aporte'], r: `**Vc = aporte del hormigon a la resistencia a corte (ACI 318-19):**\n\nVc = 0.17 * lambda * sqrt(f'c) * bw * d\n\n• lambda = 1.0 para hormigon normal\n• f'c en MPa, bw y d en metros\n• Resultado en kN\n\nEl hormigon por si solo resiste aproximadamente el 40-60% del cortante total sin necesidad de estribos. Si Vu <= phi*Vc/2, solo se necesitan estribos minimos.` },
    { k: ['vs','estribos','separacion','s diseño'], r: `**Vs = aporte de los estribos a la resistencia a corte:**\n\nVs = Av * fy * d / s\n\nDespejando s: **s = Av * fy * d / Vs**\n\nDonde:\n• Av = area de todas las ramas del estribo (2 ramas = 2*pi*Ø^2/4)\n• fy = limite de fluencia del acero del estribo\n• d = peralte efectivo\n• s = separacion entre estribos\n\nLimites ACI 318-19:\n• Vs ≤ 0.33*sqrt(f'c)*bw*d → s ≤ d/2 y s ≤ 600mm\n• Vs > 0.33*sqrt(f'c)*bw*d → s ≤ d/4 y s ≤ 300mm` },
    { k: ['phi','factor','reduccion','0.75'], r: `**Factor phi de reduccion para corte (ACI 318-19):**\n\nphi = 0.75 para corte y torsion\n\nEs menor que phi=0.90 para flexion porque la falla por corte es:\n• Mas fragil (sin aviso previo)\n• Menos predecible que la falla por flexion\n• Mas peligrosa estructuralmente\n\nCondicion de diseno: phi*Vn >= Vu\nDonde Vn = Vc + Vs` },
    { k: ['limite seccion','aumentar seccion','0.66','smax','vs max'], r: `**Limite de la seccion transversal (ACI 318-19):**\n\nVs ≤ 0.66 * sqrt(f'c) * bw * d\n\nSi Vs supera este limite, los estribos no pueden compensar — la seccion es insuficiente.\n\n**Solucion:** aumentar bw o h.\n\nEste limite existe porque mas alla de el, la falla ocurre por aplastamiento del hormigon entre las fisuras diagonales, independientemente de cuantos estribos pongas.` },
    { k: ['peralte','d efectivo','recubrimiento'], r: `**Peralte efectivo d:**\n\nd = h - recubrimiento - Ø_long/2\n\nEjemplo: h=0.55m, recub=0.04m, Ø_long=20mm\nd = 0.55 - 0.04 - 0.01 = 0.50 m\n\nEl peralte d es la distancia desde la fibra mas comprimida hasta el CG del refuerzo en traccion. Es el brazo de palanca efectivo para las formulas de corte y momento.` },
    { k: ['continua','clapeyron','tres momentos','tramos'], r: `**Viga continua de 2 tramos:**\nSe resuelve con el **Teorema de Tres Momentos (Clapeyron)**:\n\nM1*L1 + 2*M2*(L1+L2) + M3*L2 = -6*EI*(theta)\n\nEl apoyo intermedio genera un momento negativo que reduce M_max en los vanos, pero aumenta el cortante en ese apoyo.\n\nEl diagrama de cortante en una viga continua tiene cambios de signo en los vanos y un pico en el apoyo intermedio.` },
    { k: ['zona','zona corte','baja demanda','moderada','alta'], r: `**Zonas de demanda de corte:**\n\n**Baja demanda (verde):** Vu ≤ phi*Vc/2\nSolo se necesitan estribos minimos por ACI.\n\n**Demanda moderada (naranja):** phi*Vc/2 < Vu ≤ phi*Vc\nEl hormigon puede resistir, pero los estribos son necesarios.\n\n**Alta demanda (rojo):** Vu > phi*Vc\nLos estribos deben aportar Vs = Vu/phi - Vc. La separacion s se calcula estrictamente.` },
    { k: ['estribo','diametro','av','rama'], r: `**Estribos en vigas:**\nSon los refuerzos transversales (cercos) que resisten el cortante y confinan el hormigon.\n\n**Av = area total de ramas que cruzan el plano de corte:**\n• Estribo simple (2 ramas): Av = 2 * pi * Ø^2 / 4\n• Ø8mm: Av = 2 * 50.3 = 100.5 mm^2\n• Ø10mm: Av = 2 * 78.5 = 157.1 mm^2\n• Ø12mm: Av = 2 * 113.1 = 226.2 mm^2\n\nMayor diametro → mayor Av → mayor separacion permitida.` },
    { k: ['normativa','aci','nch','§22.5'], r: `**Normativa de referencia:**\n\n🇺🇸 **ACI 318-19, Seccion 22.5** → Resistencia a corte de vigas\n🇨🇱 **NCh 430:2008** → Adopta criterios ACI\n🇺🇸 **ACI 318-19, §9.6.3** → Refuerzo minimo a corte\n🇺🇸 **ACI 318-19, §9.7.6** → Separacion maxima de estribos` },
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

  const estado = { pasoActual: 0, iniciado: false, avanzando: false };

  /* ── ESTILOS — azul #0077ff del DFC ── */
  function injectStyles() {
    if (document.getElementById('dfc-asistente-styles')) return;
    const s = document.createElement('style');
    s.id = 'dfc-asistente-styles';
    s.textContent = `
      #dfc-fab{position:fixed;bottom:28px;right:28px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#0077ff 0%,#00e5ff 100%);border:none;cursor:pointer;z-index:9000;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(0,119,255,.55);transition:transform .2s,box-shadow .2s;font-size:24px;}
      #dfc-fab:hover{transform:scale(1.1) translateY(-2px);box-shadow:0 8px 32px rgba(0,119,255,.7);}
      #dfc-fab .dp{position:absolute;inset:-5px;border-radius:50%;border:2px solid rgba(0,119,255,.4);animation:dfcpulse 2s infinite;}
      #dfc-fab .db{position:absolute;top:-3px;right:-3px;background:#00e5ff;color:#080c10;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;width:18px;height:18px;border-radius:50%;display:none;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,229,255,.5);}
      #dfc-fab .db.show{display:flex;}
      @keyframes dfcpulse{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.35);opacity:0}100%{transform:scale(1.35);opacity:0}}
      #dfc-panel{position:fixed;bottom:96px;right:28px;width:370px;max-height:610px;background:#0a0e14;border:1px solid rgba(0,119,255,.2);border-radius:18px;display:flex;flex-direction:column;z-index:9001;box-shadow:0 32px 80px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04);overflow:hidden;transform:scale(.93) translateY(16px);opacity:0;pointer-events:none;transition:all .28s cubic-bezier(.34,1.56,.64,1);}
      #dfc-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
      .dfc-hd{padding:13px 15px 11px;background:linear-gradient(135deg,rgba(0,119,255,.1) 0%,rgba(0,229,255,.06) 100%);border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:10px;flex-shrink:0;}
      .dfc-av{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#0077ff,#00e5ff);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
      .dfc-hn{font-family:'Orbitron',sans-serif;font-size:11px;color:#0077ff;letter-spacing:.1em;text-transform:uppercase;}
      .dfc-hs{font-family:'Space Mono',monospace;font-size:9px;color:rgba(255,255,255,.3);margin-top:1px;}
      .dfc-hs span{color:#00ff9d;}
      .dfc-xbtn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:7px;width:28px;height:28px;cursor:pointer;color:rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;}
      .dfc-xbtn:hover{background:rgba(0,119,255,.2);color:#0077ff;border-color:rgba(0,119,255,.3);}
      .dfc-prog-wrap{height:3px;background:rgba(255,255,255,.05);flex-shrink:0;}
      .dfc-prog-fill{height:100%;background:linear-gradient(90deg,#0077ff,#00e5ff);transition:width .5s ease;}
      .dfc-msgs{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}
      .dfc-msgs::-webkit-scrollbar{width:3px;}
      .dfc-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px;}
      .dfc-msg{animation:dfcIn .22s ease both;}
      @keyframes dfcIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
      .dfc-plabel{font-family:'Orbitron',sans-serif;font-size:9px;color:#0077ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:5px;}
      .dfc-plabel::before{content:'';display:block;width:3px;height:10px;background:#0077ff;border-radius:2px;}
      .dfc-bubble{background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;padding:11px 13px;font-family:'DM Sans',sans-serif;font-size:12.5px;color:#c8d3e0;line-height:1.7;}
      .dfc-bubble strong{color:#e8edf5;}
      .dfc-bubble p{margin:0 0 7px;}
      .dfc-bubble p:last-child{margin-bottom:0;}
      .dfc-bubble code{background:rgba(0,119,255,.12);padding:1px 5px;border-radius:3px;font-family:'Space Mono',monospace;font-size:10.5px;color:#60a5fa;}
      .dfc-ububble{background:linear-gradient(135deg,rgba(0,119,255,.16),rgba(0,229,255,.08));border:1px solid rgba(0,119,255,.2);border-radius:14px 14px 4px 14px;padding:8px 12px;font-family:'Space Mono',monospace;font-size:11px;color:#e8edf5;align-self:flex-end;max-width:88%;}
      .dfc-tip{background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.14);border-radius:8px;padding:8px 10px;margin-top:6px;font-family:'Space Mono',monospace;font-size:10px;color:#5eead4;line-height:1.5;}
      .dfc-btn{background:linear-gradient(135deg,#0077ff,#00e5ff);border:none;border-radius:9px;padding:9px 16px;margin-top:8px;color:#fff;font-family:'Space Mono',monospace;font-size:11px;cursor:pointer;transition:all .2s;width:100%;text-align:center;font-weight:700;box-shadow:0 4px 14px rgba(0,119,255,.3);}
      .dfc-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,119,255,.45);}
      .dfc-btn:disabled{opacity:.4;cursor:default;transform:none;}
      .dfc-btn-ghost{background:rgba(0,119,255,.08);border:1px solid rgba(0,119,255,.2);border-radius:8px;padding:7px 12px;margin-top:6px;color:#60a5fa;font-family:'Space Mono',monospace;font-size:10px;cursor:pointer;transition:all .15s;width:100%;text-align:center;}
      .dfc-btn-ghost:hover{background:rgba(0,119,255,.16);color:#93c5fd;}
      .dfc-typing{display:flex;align-items:center;gap:4px;padding:9px 12px;background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;width:fit-content;}
      .dfc-dot{width:6px;height:6px;background:rgba(0,119,255,.6);border-radius:50%;animation:dfcbounce .9s infinite;}
      .dfc-dot:nth-child(2){animation-delay:.15s;}
      .dfc-dot:nth-child(3){animation-delay:.3s;}
      @keyframes dfcbounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
      .dfc-input-area{padding:10px 12px 13px;border-top:1px solid rgba(255,255,255,.05);display:flex;gap:8px;flex-shrink:0;background:#080c10;}
      #dfc-input{flex:1;background:#111820;border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:8px 11px;color:#e8edf5;font-family:'Space Mono',monospace;font-size:11px;outline:none;transition:border-color .2s;}
      #dfc-input:focus{border-color:rgba(0,119,255,.5);}
      #dfc-input::placeholder{color:rgba(255,255,255,.18);}
      #dfc-send{background:linear-gradient(135deg,#0077ff,#00e5ff);border:none;border-radius:9px;width:36px;height:36px;cursor:pointer;color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
      #dfc-send:hover{transform:scale(1.07);box-shadow:0 4px 14px rgba(0,119,255,.4);}
      .dfc-hl{outline:2px solid #0077ff !important;outline-offset:3px !important;animation:dfcglow 1.4s ease-in-out infinite alternate;}
      @keyframes dfcglow{from{box-shadow:0 0 6px rgba(0,119,255,.3)}to{box-shadow:0 0 18px rgba(0,119,255,.7)}}
      @media(max-width:480px){#dfc-panel{width:calc(100vw - 20px);right:10px;bottom:78px;}#dfc-fab{right:14px;bottom:14px;}}
    `;
    document.head.appendChild(s);
  }

  function buildDOM() {
    const fab = document.createElement('button');
    fab.id = 'dfc-fab';
    fab.title = 'Profesor Virtual — Fuerza Cortante';
    fab.innerHTML = `<span class="dp"></span><span class="db" id="dfc-db">!</span>✂️`;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'dfc-panel';
    panel.innerHTML = `
      <div class="dfc-hd">
        <div class="dfc-av">✂️</div>
        <div style="flex:1">
          <div class="dfc-hn">Profesor Virtual DFC</div>
          <div class="dfc-hs"><span>●</span> Diagrama de Fuerza Cortante · IngeLAB 3D</div>
        </div>
        <button class="dfc-xbtn" id="dfc-close">✕</button>
      </div>
      <div class="dfc-prog-wrap"><div class="dfc-prog-fill" id="dfc-prog" style="width:0%"></div></div>
      <div class="dfc-msgs" id="dfc-msgs"></div>
      <div class="dfc-input-area">
        <input type="text" id="dfc-input" placeholder="Escribe tu duda aqui...">
        <button id="dfc-send">➤</button>
      </div>
    `;
    document.body.appendChild(panel);
  }

  let hlTimer = null;
  function highlight(id) {
    document.querySelectorAll('.dfc-hl').forEach(el => el.classList.remove('dfc-hl'));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('dfc-hl');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearTimeout(hlTimer);
    hlTimer = setTimeout(() => el && el.classList.remove('dfc-hl'), 7000);
  }

  function md(t) {
    return t
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>').replace(/$/, '</p>');
  }

  function addBotMsg(paso, soloTexto) {
    const msgs = document.getElementById('dfc-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dfc-msg';
    if (soloTexto) {
      wrap.innerHTML = `<div class="dfc-bubble">${md(soloTexto)}</div>`;
    } else {
      const idx = PASOS.indexOf(paso);
      const label = idx === 0 ? 'Bienvenida' : idx === PASOS.length - 1 ? 'Completado!' : `Paso ${idx} de ${PASOS.length - 2}`;
      let html = `<div class="dfc-plabel">${label}</div>`;
      html += `<div class="dfc-bubble">${md(paso.mensaje)}</div>`;
      if (paso.tip) html += `<div class="dfc-tip">${md(paso.tip)}</div>`;
      if (paso.botonTexto) {
        html += `<button class="dfc-btn dfc-action-btn" data-paso-id="${paso.id}">${paso.botonTexto}</button>`;
      }
      wrap.innerHTML = html;
      const btn = wrap.querySelector('.dfc-action-btn');
      if (btn) {
        btn.addEventListener('click', function () {
          this.disabled = true;
          this.style.opacity = '0.45';
          this.textContent = 'Continuando...';
          const pid = this.getAttribute('data-paso-id');
          setTimeout(() => pid === 'fin' ? reiniciarGuia() : avanzarPaso(), 400);
        });
      }
    }
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addUserMsg(t) {
    const msgs = document.getElementById('dfc-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dfc-msg';
    wrap.style.display = 'flex';
    wrap.style.justifyContent = 'flex-end';
    wrap.innerHTML = `<div class="dfc-ububble">${t}</div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing(cb) {
    const msgs = document.getElementById('dfc-msgs');
    const el = document.createElement('div');
    el.id = 'dfc-typing-el';
    el.className = 'dfc-msg';
    el.innerHTML = `<div class="dfc-typing"><span class="dfc-dot"></span><span class="dfc-dot"></span><span class="dfc-dot"></span></div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { el.remove(); if (cb) cb(); }, 700);
  }

  function updateProg() {
    const pct = Math.round((estado.pasoActual / (PASOS.length - 1)) * 100);
    const bar = document.getElementById('dfc-prog');
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
    document.getElementById('dfc-msgs').innerHTML = '';
    updateProg();
    typing(() => addBotMsg(PASOS[0]));
  }

  function setupListeners() {
    const bind = (id, pasoId) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => {
        if (PASOS[estado.pasoActual].id === pasoId) setTimeout(avanzarPaso, 400);
      });
    };
    bind('inp_tipo', 'tipo_viga');
    bind('inp_L',    'longitud');

    const btnAdd = document.getElementById('btnAddCarga');
    if (btnAdd) btnAdd.addEventListener('click', () => {
      if (PASOS[estado.pasoActual].id === 'cargas') setTimeout(avanzarPaso, 600);
    });

    document.querySelectorAll('.caso-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (PASOS[estado.pasoActual].id === 'cargas') setTimeout(avanzarPaso, 800);
      });
    });

    const btnCalc = document.getElementById('btnCalc');
    if (btnCalc) btnCalc.addEventListener('click', () => {
      if (PASOS[estado.pasoActual].id === 'calcular') setTimeout(avanzarPaso, 1200);
    });
  }

  function handleInput(query) {
    if (!query.trim()) return;
    addUserMsg(query);
    document.getElementById('dfc-input').value = '';
    typing(() => {
      const resp = respuestaLibre(query);
      const msgs = document.getElementById('dfc-msgs');
      const wrap = document.createElement('div');
      wrap.className = 'dfc-msg';
      const texto = resp || `No encontre esa respuesta especifica, pero puedo explicarte:\n\n• Que es la fuerza cortante V(x)?\n• Que es Vc y como se calcula?\n• Como se calcula la separacion de estribos s?\n• Que es el factor phi?\n\nIntenta reformular tu pregunta.`;
      wrap.innerHTML = `
        <div class="dfc-bubble">${md(texto)}</div>
        <button class="dfc-btn-ghost dfc-return">↩ Volver a la guia</button>
      `;
      wrap.querySelector('.dfc-return').addEventListener('click', () => {
        typing(() => addBotMsg(PASOS[estado.pasoActual]));
      });
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
    });
  }

  function init() {
    injectStyles();
    buildDOM();
    setupListeners();

    const fab   = document.getElementById('dfc-fab');
    const panel = document.getElementById('dfc-panel');
    let open = false;

    setTimeout(() => {
      const db = document.getElementById('dfc-db');
      if (db) db.classList.add('show');
    }, 3000);

    fab.addEventListener('click', () => {
      open = !open;
      panel.classList.toggle('open', open);
      const db = document.getElementById('dfc-db');
      if (db) db.classList.remove('show');
      if (open && !estado.iniciado) {
        estado.iniciado = true;
        updateProg();
        setTimeout(() => typing(() => addBotMsg(PASOS[0])), 300);
      }
    });

    document.getElementById('dfc-close').addEventListener('click', () => {
      open = false;
      panel.classList.remove('open');
    });

    const inp = document.getElementById('dfc-input');
    document.getElementById('dfc-send').addEventListener('click', () => handleInput(inp.value));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(inp.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
