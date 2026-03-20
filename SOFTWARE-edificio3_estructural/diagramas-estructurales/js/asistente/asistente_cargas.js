/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ASISTENTE DC — Diagramas de Carga                             ║
 * ║   IngeLAB 3D · cargas.html                                      ║
 * ║   Guia paso a paso tipo profesor                                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en cargas.html:
 *   <script src="../js/asistente/asistente_cargas.js"></script>
 */

(function () {
  'use strict';

  const PASOS = [
    {
      id: 'bienvenida',
      siguiente: 'longitud',
      mensaje: `Hola! Soy tu **Profesor Virtual de Diagramas de Carga**. 📦\n\nEste modulo es el mas completo de IngeLAB 3D. Cubre tres grandes temas:\n\n**1. Cargas sobre la viga:**\nPuntuales, distribuidas, triangulares, trapeciales y momentos. Calcula resultantes y combinaciones NCh 1537.\n\n**2. Viento (NCh 432):**\nPerfil de presion p(z) segun velocidad de referencia, exposicion y geometria del edificio.\n\n**3. Sismico (NCh 433):**\nFuerzas sismicas por piso segun zona sismica, tipo de suelo y masa del edificio.\n\nEs el punto de partida de cualquier proyecto estructural — antes de calcular vigas o columnas, necesitas saber las cargas.\n\nComenzamos?`,
      botonTexto: 'Si, empecemos! →',
      tip: null,
    },
    {
      id: 'longitud',
      siguiente: 'tipo_carga',
      autoAvanzar: true,
      mensaje: `**Paso 1 — Longitud de la viga** 📏\n\nIngresa la longitud de la viga sobre la que actuan las cargas.\n\nLa longitud afecta:\n• La resultante de las cargas distribuidas: R = q*L\n• La posicion de la resultante: xR = L/2 para q uniforme\n• Los limites de posicion de las cargas puntuales (0 a L)\n\n**Importante:** Al cambiar L, los campos "b fin" de las cargas distribuidas se actualizan automaticamente si estaban al limite.\n\n👆 Ingresa la longitud en el campo **"L [m]"**.`,
      highlight: 'inp_L',
      botonTexto: '✅ Ya ingrese L → Siguiente',
      tip: '💡 Para una primera exploracion, deja L=6m que es la longitud predefinida.',
    },
    {
      id: 'tipo_carga',
      siguiente: 'agregar_carga',
      autoAvanzar: false,
      mensaje: `**Paso 2 — Tipo de carga** 📦\n\nEste modulo maneja **5 tipos de carga** — selecciona con las pestanas del panel izquierdo:\n\n**↓ Puntual P [kN]:**\nFuerza concentrada en un punto a. Resultante = P, xR = a.\n\n**▬ Distribuida q [kN/m]:**\nCarga uniforme en tramo [a, b]. Resultante = q*(b-a), xR = centro del tramo.\n\n**◭ Triangular [kN/m]:**\nCarga que varia de 0 a q_max. Resultante = q*L/2, xR = 2L/3 desde el inicio.\n\n**⌂ Trapecial [kN/m]:**\nCarga que varia de q1 a q2. Se descompone en rect + triangular internamente.\n\n**↻ Momento puntual [kN·m]:**\nPar de fuerzas aplicado en un punto. No genera resultante vertical pero si momento.\n\n**Categorias:**\n• D = Muerta (peso propio, permanente)\n• L = Viva (uso, ocupacion, mobiliario)\n• S = Nieve\n\n👆 Selecciona el tipo de carga que quieres agregar.`,
      highlight: null,
      botonTexto: '✅ Entendi los tipos → Siguiente',
      tip: '💡 La distincion D/L/S es fundamental para las combinaciones NCh 1537. Las cargas vivas tienen factor mayor (1.6) que las muertas (1.2).',
    },
    {
      id: 'agregar_carga',
      siguiente: 'combinaciones',
      autoAvanzar: false,
      mensaje: `**Paso 3 — Agregar cargas** ➕\n\nDefine los valores de la carga seleccionada y presiona **"+ Agregar carga"**.\n\n**Para carga puntual:**\n• P: magnitud en kN\n• a: posicion en metros desde el apoyo izquierdo\n• Categoria: L (viva) o D (muerta)\n\n**Para carga distribuida:**\n• q: intensidad en kN/m\n• a: inicio del tramo [m]\n• b fin: fin del tramo [m]\n• Categoria: D o L\n\n**Valores tipicos NCh 1537:**\n• Peso propio losa 15cm: 3.75 kN/m (D)\n• Sobrecarga habitacional: 2.0 kN/m (L)\n• Sobrecarga oficinas: 2.5 kN/m (L)\n• Tabiques: 1.0 kN/m (D)\n\nPuedes agregar multiples cargas. Aparecen en la lista **"Cargas activas"** y puedes eliminarlas con el boton X.\n\n👆 Define tus valores y presiona **"+ Agregar carga"**.`,
      highlight: 'btnAddCarga',
      botonTexto: '✅ Agregue mis cargas → Siguiente',
      tip: '💡 Agrega siempre al menos una carga D (muerta) y una L (viva) para ver como funciona la combinacion 1.2D + 1.6L.',
    },
    {
      id: 'combinaciones',
      siguiente: 'viento',
      autoAvanzar: false,
      mensaje: `**Paso 4 — Combinaciones de carga NCh 1537** 🔀\n\nDespues de agregar las cargas, es importante entender como se combinan para el diseno.\n\n**Combinaciones basicas NCh 1537 / ASCE 7:**\n• 1.4D\n• **1.2D + 1.6L** ← la mas comun, suele ser dominante\n• 1.2D + 1.6S + 0.5L\n• 1.2D + 1.0W + 0.5L (con viento)\n• 0.9D + 1.0W (vuelco)\n• 1.2D + E + 0.5L (sismico)\n\n**La combinacion dominante** se muestra en el cuadro naranja inferior del panel derecho — es la que tiene el mayor valor de resultante amplificada.\n\n**¿Por que amplificamos las cargas?**\nLos factores de carga (1.2, 1.6, etc.) cubren incertidumbres en:\n• Variaciones en la magnitud real de las cargas\n• Imprecisiones en el modelo estructural\n• Comportamiento real vs teorico\n\n👆 Presiona **⚡ CALCULAR** y mira el cuadro de combinaciones en el panel derecho.`,
      highlight: 'btnCalc',
      botonTexto: '✅ Entendi las combinaciones → Ver viento',
      tip: '💡 En la mayoria de edificios residenciales, la combinacion dominante es 1.2D + 1.6L. Solo en edificios altos el viento o el sismo pueden ser mas criticos.',
    },
    {
      id: 'viento',
      siguiente: 'sismico',
      autoAvanzar: false,
      mensaje: `**Paso 5 — Viento NCh 432** 💨\n\nHaz clic en la pestana **"💨 Viento NCh 432"** en el centro, y luego expande el panel **"VIENTO — NCh 432"** en el panel izquierdo.\n\n**Parametros:**\n\n**V_ref [m/s]:** Velocidad basica de referencia segun zona geografica.\n• Santiago: 28 m/s\n• Costa: 32-36 m/s\n• Sur de Chile: 36-45 m/s\n\n**Exposicion:**\n• A: terreno muy rugoso (bosques densos, ciudad)\n• **B: exposicion moderada (suburbios)** ← mas comun\n• C: campo abierto, costa\n\n**h total [m]:** Altura del edificio. La presion aumenta con la altura.\n\n**b fachada [m]:** Ancho de la fachada expuesta al viento.\n\n**Cp barlovento:** Coeficiente de presion. Tipico = 0.8 para barlovento.\n\n**Formula NCh 432:**\np(z) = q_ref * Kz * Cp\nDonde q_ref = 0.5 * rho * V_ref^2`,
      highlight: 'hdrV',
      botonTexto: '✅ Entendi el viento → Ver sismico',
      tip: '💡 El perfil de viento muestra como la presion aumenta con la altura — en la base es menor y en la cima es maxima.',
    },
    {
      id: 'sismico',
      siguiente: 'calcular',
      autoAvanzar: false,
      mensaje: `**Paso 6 — Sismico NCh 433** 🌊\n\nExpande el panel **"SISMICO — NCh 433"** en el panel izquierdo.\n\n**Parametros:**\n\n**Zona sismica:** Chile tiene 4 zonas (1=menor, 4=mayor).\n• Santiago: Zona 2\n• Norte Chile: Zona 3\n• Sur Chile: Zona 3-4\n\n**Tipo de suelo:**\n• A: Roca dura (mejores condiciones)\n• B: Roca blanda o suelo rigido\n• C: Suelo de mediana rigidez\n• D: Suelo blando (peores condiciones, mayor amplificacion)\n\n**Metodo usado (estatico equivalente):**\nV = Sa * W / g\n\nDonde:\n• Sa = aceleracion espectral (funcion de T, zona y suelo)\n• W = peso total del edificio = n_pisos * W_piso\n• T = periodo fundamental del edificio\n\n**Distribucion de fuerzas por piso:**\nFi = (Wi * hi / suma(Wj * hj)) * (V - Ft)\nDonde Ft es la fuerza adicional en el techo.\n\n👆 Expande el panel sismico y ajusta los parametros.`,
      highlight: 'hdrS',
      botonTexto: '✅ Entendi el sismico → Calcular todo',
      tip: '💡 El suelo tipo D puede amplificar las fuerzas sismicas hasta 2-3 veces comparado con suelo tipo A. Es uno de los parametros mas importantes.',
    },
    {
      id: 'calcular',
      siguiente: 'interpretar',
      autoAvanzar: true,
      mensaje: `**Paso 7 — A calcular!** ⚡\n\nTodo esta listo. Presiona **⚡ CALCULAR** arriba a la derecha.\n\nEl programa calculara simultaneamente:\n\n**Cargas sobre la viga:**\n✔ Resultante de cada carga (R y xR)\n✔ Resultante total\n✔ Todas las combinaciones NCh 1537\n✔ Combinacion dominante\n\n**Viento NCh 432:**\n✔ Presion de referencia q_ref\n✔ Perfil p(z) con variacion en altura\n✔ Resultante R_W y altura de aplicacion z_R\n\n**Sismico NCh 433:**\n✔ Periodo T del edificio\n✔ Aceleracion espectral Sa\n✔ Corte basal V\n✔ Fuerzas por piso Fi\n\n👆 Presiona **⚡ CALCULAR**.`,
      highlight: 'btnCalc',
      botonTexto: '✅ Ya calcule → Interpretar resultados',
      tip: '💡 Despues de calcular, navega entre las 3 pestanas del centro para ver los diagramas de cargas, viento y sismico.',
    },
    {
      id: 'interpretar',
      siguiente: 'fin',
      autoAvanzar: false,
      mensaje: `**Paso 8 — Interpretando los resultados** 📊\n\n**Panel central — 3 diagramas:**\n\n**📐 Cargas sobre viga:**\nMuestra todas las cargas aplicadas con sus resultantes. La flecha negra indica la resultante total y su punto de aplicacion xR.\n\n**💨 Viento:**\nMuestra el perfil de presion p(z) — crece con la altura. La flecha indica la resultante R_W y su altura de aplicacion.\n\n**🌊 Sismico:**\nMuestra las fuerzas por piso Fi como flechas horizontales. Mayor en los pisos superiores (distribucion triangular invertida).\n\n**Panel derecho:**\n• Tabla de resultantes por carga individual\n• Resultante total R y xR\n• Resultados de viento y sismico\n• Tabla de combinaciones con la dominante en naranja\n• **Cuadro naranja:** combinacion dominante con su valor\n\n**La combinacion dominante** es la que usaras para disenar la estructura.`,
      botonTexto: '✅ Todo claro → Finalizar',
      tip: '💡 El punto de aplicacion xR de la resultante total te dice donde la viga esta mas solicitada. Si xR coincide con el centro, la viga esta simetricamente cargada.',
    },
    {
      id: 'fin',
      siguiente: null,
      mensaje: `**Excelente!** 🎉\n\nHas completado el modulo de Diagramas de Carga.\n\n**Resumen de formulas clave:**\n• R_puntual = P  @  xR = a\n• R_dist = q*(b-a)  @  xR = (a+b)/2\n• R_triang = q*L/2  @  xR = 2L/3\n• q_ref = 0.5*rho*V_ref^2  (viento)\n• V = Sa*W/g  (sismico estatico)\n• 1.2D + 1.6L  (combinacion dominante habitual)\n\n**Siguiente paso en el flujo estructural:**\nCon las cargas definidas y la combinacion dominante, vas a:\n1. Modulo DMF → calcular el momento de diseno Mu\n2. Modulo DFC → calcular el cortante de diseno Vu\n3. Modulo DI → verificar la columna con Nu y Mu\n\nTienes dudas? Escribeme abajo 👇`,
      botonTexto: '↺ Reiniciar guia desde el inicio',
    },
  ];

  const QA = [
    { k: ['resultante','r total','xr','punto de aplicacion'], r: `La **resultante** de un sistema de cargas es la fuerza unica equivalente que produce el mismo efecto.\n\n**Por tipo:**\n• Puntual: R = P, xR = a\n• Distribuida uniforme: R = q*(b-a), xR = (a+b)/2\n• Triangular: R = q*L/2, xR = 2L/3 desde el inicio\n• Trapecial: R = (q1+q2)/2 * (b-a)\n\n**Resultante total:** R = suma de todas las R individuales\n**xR total:** suma ponderada / R total (punto de aplicacion)` },
    { k: ['combinaciones','1.2d','1.6l','nch 1537','asce'], r: `**Combinaciones de carga NCh 1537 / ASCE 7:**\n\n• 1.4D → solo cargas muertas\n• **1.2D + 1.6L** → la mas comun, suele dominar\n• 1.2D + 1.6S + 0.5L → con nieve\n• 1.2D + 1.0W + 0.5L → con viento\n• 0.9D + 1.0W → vuelco por viento\n• 1.2D + E + 0.5L → con sismo\n\n**La combinacion dominante** es la que tiene el mayor valor de resultante amplificada. En edificios bajos suele ser 1.2D + 1.6L.` },
    { k: ['viento','nch 432','presion','kz','qref'], r: `**Viento NCh 432 — Perfil de presion:**\n\np(z) = q_ref * Kz * Cp\n\n• q_ref = 0.5 * rho * V_ref^2 (presion dinamica)\n• rho = 1.225 kg/m^3 (densidad del aire)\n• Kz = factor de exposicion segun altura (crece con z)\n• Cp = coeficiente de presion (0.8 barlovento tipico)\n\n**La presion aumenta con la altura** — a mayor altura, mayor velocidad del viento y mayor presion.` },
    { k: ['exposicion','tipo a','tipo b','tipo c','rugosidad'], r: `**Categorias de exposicion (NCh 432):**\n\n• **Exposicion A:** Terreno muy rugoso, ciudad densa, bosques. Menor presion (mayor turbulencia, menor velocidad media).\n• **Exposicion B:** Suburbios, terreno con obstaculos moderados. La mas comun en Chile.\n• **Exposicion C:** Campo abierto, costa, aeropuertos. Mayor presion (viento sin obstaculos).\n\nLa exposicion C genera las mayores presiones de viento para igual V_ref.` },
    { k: ['sismico','nch 433','corte basal','periodo','sa'], r: `**Sismico NCh 433 — Metodo estatico equivalente:**\n\nV = Sa * W / g\n\n• Sa = aceleracion espectral [m/s^2]\n• W = peso total = n_pisos * W_piso [kN]\n• g = 9.81 m/s^2\n\n**Periodo fundamental:** T = Ct * h^0.75\n• Ct = 0.09 para hormigon armado\n• h = altura total del edificio\n\n**Distribucion por piso:**\nFi proporcional a Wi*hi — los pisos superiores reciben mayor fuerza (distribucion triangular invertida).` },
    { k: ['zona sismica','zona 1','zona 2','zona 3','zona 4'], r: `**Zonas sismicas Chile (NCh 433):**\n\n• Zona 1: Menor peligro (parte de la region de Los Rios y Los Lagos)\n• Zona 2: Peligro moderado (Santiago, Valparaiso, gran parte del pais)\n• Zona 3: Alta sismicidad (Atacama, Norte Chico, algunas zonas del sur)\n• Zona 4: Muy alta sismicidad (Tarapaca, Antofagasta, Arica)\n\nMayor zona → mayor Z → mayor Sa → mayor V basal.` },
    { k: ['tipo suelo','suelo a','suelo b','suelo c','suelo d','amplificacion'], r: `**Tipos de suelo NCh 433:**\n\n• Suelo A: Roca dura, Vs > 1500 m/s\n• Suelo B: Roca blanda o suelo rigido, 500-1500 m/s\n• Suelo C: Suelo de mediana rigidez, 180-500 m/s\n• Suelo D: Suelo blando, Vs < 180 m/s\n\nEl suelo D amplifica el espectro 2-3 veces respecto al suelo A. En Santiago predomina el suelo tipo B-C.` },
    { k: ['carga muerta','carga viva','carga d','carga l','categoria'], r: `**Categorias de carga:**\n\n**D (Muerta):** Pesos permanentes del edificio.\n• Peso propio de losa, vigas, muros\n• Revestimientos, instalaciones fijas\n• Factor de combinacion: 1.2 (amplificado)\n\n**L (Viva):** Cargas variables por uso.\n• Personas, mobiliario, equipos moviles\n• Valores segun NCh 1537: 2.0-5.0 kN/m^2\n• Factor de combinacion: 1.6 (mayor incertidumbre)\n\n**S (Nieve):** Solo en zonas altas o sur de Chile.` },
    { k: ['trapecial','trapezoidal','q1 q2'], r: `**Carga Trapecial:**\nVaria linealmente de q1 (en x=a) a q2 (en x=b).\n\nSe descompone internamente en:\n• Rectangulo de altura q1 en [a,b]\n• Triangulo de altura (q2-q1) en [a,b]\n\n**Resultante:**\nR = (q1 + q2)/2 * (b - a)\n\n**Punto de aplicacion:**\nxR = a + (b-a) * (2*q2 + q1) / (3*(q1+q2))` },
    { k: ['normativa','nch','asce','referencia'], r: `**Normativa de referencia en este modulo:**\n\n🇨🇱 **NCh 1537:2009** → Cargas en edificios (combinaciones)\n🇨🇱 **NCh 432:2010** → Accion del viento sobre construcciones\n🇨🇱 **NCh 433:1996** → Diseno sismico de edificios\n🇺🇸 **ASCE 7-22** → Minimum Design Loads (USA, referencia)\n\nLas normas chilenas adaptan criterios de ASCE 7 a las condiciones locales.` },
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

  function injectStyles() {
    if (document.getElementById('dc-asistente-styles')) return;
    const s = document.createElement('style');
    s.id = 'dc-asistente-styles';
    s.textContent = `
      #dc-fab{position:fixed;bottom:28px;right:28px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#ff8c00 0%,#ffa030 100%);border:none;cursor:pointer;z-index:9000;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(255,140,0,.55);transition:transform .2s,box-shadow .2s;font-size:24px;}
      #dc-fab:hover{transform:scale(1.1) translateY(-2px);box-shadow:0 8px 32px rgba(255,140,0,.7);}
      #dc-fab .dp{position:absolute;inset:-5px;border-radius:50%;border:2px solid rgba(255,140,0,.4);animation:dcpulse 2s infinite;}
      #dc-fab .db{position:absolute;top:-3px;right:-3px;background:#00e5ff;color:#080c10;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;width:18px;height:18px;border-radius:50%;display:none;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,229,255,.5);}
      #dc-fab .db.show{display:flex;}
      @keyframes dcpulse{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.35);opacity:0}100%{transform:scale(1.35);opacity:0}}
      #dc-panel{position:fixed;bottom:96px;right:28px;width:370px;max-height:610px;background:#0a0e14;border:1px solid rgba(255,140,0,.2);border-radius:18px;display:flex;flex-direction:column;z-index:9001;box-shadow:0 32px 80px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04);overflow:hidden;transform:scale(.93) translateY(16px);opacity:0;pointer-events:none;transition:all .28s cubic-bezier(.34,1.56,.64,1);}
      #dc-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
      .dc-hd{padding:13px 15px 11px;background:linear-gradient(135deg,rgba(255,140,0,.1) 0%,rgba(255,160,48,.06) 100%);border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:10px;flex-shrink:0;}
      .dc-av{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#ff8c00,#ffa030);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
      .dc-hn{font-family:'Orbitron',sans-serif;font-size:11px;color:#ff8c00;letter-spacing:.1em;text-transform:uppercase;}
      .dc-hs{font-family:'Space Mono',monospace;font-size:9px;color:rgba(255,255,255,.3);margin-top:1px;}
      .dc-hs span{color:#00ff9d;}
      .dc-xbtn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:7px;width:28px;height:28px;cursor:pointer;color:rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;}
      .dc-xbtn:hover{background:rgba(255,140,0,.2);color:#ff8c00;border-color:rgba(255,140,0,.3);}
      .dc-prog-wrap{height:3px;background:rgba(255,255,255,.05);flex-shrink:0;}
      .dc-prog-fill{height:100%;background:linear-gradient(90deg,#ff8c00,#ffa030);transition:width .5s ease;}
      .dc-msgs{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}
      .dc-msgs::-webkit-scrollbar{width:3px;}
      .dc-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px;}
      .dc-msg{animation:dcIn .22s ease both;}
      @keyframes dcIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
      .dc-plabel{font-family:'Orbitron',sans-serif;font-size:9px;color:#ff8c00;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:5px;}
      .dc-plabel::before{content:'';display:block;width:3px;height:10px;background:#ff8c00;border-radius:2px;}
      .dc-bubble{background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;padding:11px 13px;font-family:'DM Sans',sans-serif;font-size:12.5px;color:#c8d3e0;line-height:1.7;}
      .dc-bubble strong{color:#e8edf5;}
      .dc-bubble p{margin:0 0 7px;}
      .dc-bubble p:last-child{margin-bottom:0;}
      .dc-bubble code{background:rgba(255,140,0,.12);padding:1px 5px;border-radius:3px;font-family:'Space Mono',monospace;font-size:10.5px;color:#fdba74;}
      .dc-ububble{background:linear-gradient(135deg,rgba(255,140,0,.16),rgba(255,160,48,.08));border:1px solid rgba(255,140,0,.2);border-radius:14px 14px 4px 14px;padding:8px 12px;font-family:'Space Mono',monospace;font-size:11px;color:#e8edf5;align-self:flex-end;max-width:88%;}
      .dc-tip{background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.14);border-radius:8px;padding:8px 10px;margin-top:6px;font-family:'Space Mono',monospace;font-size:10px;color:#5eead4;line-height:1.5;}
      .dc-btn{background:linear-gradient(135deg,#ff8c00,#ffa030);border:none;border-radius:9px;padding:9px 16px;margin-top:8px;color:#080c10;font-family:'Space Mono',monospace;font-size:11px;cursor:pointer;transition:all .2s;width:100%;text-align:center;font-weight:700;box-shadow:0 4px 14px rgba(255,140,0,.3);}
      .dc-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(255,140,0,.45);}
      .dc-btn:disabled{opacity:.4;cursor:default;transform:none;}
      .dc-btn-ghost{background:rgba(255,140,0,.08);border:1px solid rgba(255,140,0,.2);border-radius:8px;padding:7px 12px;margin-top:6px;color:#fdba74;font-family:'Space Mono',monospace;font-size:10px;cursor:pointer;transition:all .15s;width:100%;text-align:center;}
      .dc-btn-ghost:hover{background:rgba(255,140,0,.16);color:#ff8c00;}
      .dc-typing{display:flex;align-items:center;gap:4px;padding:9px 12px;background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;width:fit-content;}
      .dc-dot{width:6px;height:6px;background:rgba(255,140,0,.6);border-radius:50%;animation:dcbounce .9s infinite;}
      .dc-dot:nth-child(2){animation-delay:.15s;}
      .dc-dot:nth-child(3){animation-delay:.3s;}
      @keyframes dcbounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
      .dc-input-area{padding:10px 12px 13px;border-top:1px solid rgba(255,255,255,.05);display:flex;gap:8px;flex-shrink:0;background:#080c10;}
      #dc-input{flex:1;background:#111820;border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:8px 11px;color:#e8edf5;font-family:'Space Mono',monospace;font-size:11px;outline:none;transition:border-color .2s;}
      #dc-input:focus{border-color:rgba(255,140,0,.5);}
      #dc-input::placeholder{color:rgba(255,255,255,.18);}
      #dc-send{background:linear-gradient(135deg,#ff8c00,#ffa030);border:none;border-radius:9px;width:36px;height:36px;cursor:pointer;color:#080c10;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
      #dc-send:hover{transform:scale(1.07);box-shadow:0 4px 14px rgba(255,140,0,.4);}
      .dc-hl{outline:2px solid #ff8c00 !important;outline-offset:3px !important;animation:dcglow 1.4s ease-in-out infinite alternate;}
      @keyframes dcglow{from{box-shadow:0 0 6px rgba(255,140,0,.3)}to{box-shadow:0 0 18px rgba(255,140,0,.7)}}
      @media(max-width:480px){#dc-panel{width:calc(100vw - 20px);right:10px;bottom:78px;}#dc-fab{right:14px;bottom:14px;}}
    `;
    document.head.appendChild(s);
  }

  function buildDOM() {
    const fab = document.createElement('button');
    fab.id = 'dc-fab';
    fab.title = 'Profesor Virtual — Diagramas de Carga';
    fab.innerHTML = `<span class="dp"></span><span class="db" id="dc-db">!</span>📦`;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'dc-panel';
    panel.innerHTML = `
      <div class="dc-hd">
        <div class="dc-av">📦</div>
        <div style="flex:1">
          <div class="dc-hn">Profesor Virtual DC</div>
          <div class="dc-hs"><span>●</span> Diagramas de Carga · IngeLAB 3D</div>
        </div>
        <button class="dc-xbtn" id="dc-close">✕</button>
      </div>
      <div class="dc-prog-wrap"><div class="dc-prog-fill" id="dc-prog" style="width:0%"></div></div>
      <div class="dc-msgs" id="dc-msgs"></div>
      <div class="dc-input-area">
        <input type="text" id="dc-input" placeholder="Escribe tu duda aqui...">
        <button id="dc-send">➤</button>
      </div>
    `;
    document.body.appendChild(panel);
  }

  let hlTimer = null;
  function highlight(id) {
    document.querySelectorAll('.dc-hl').forEach(el => el.classList.remove('dc-hl'));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('dc-hl');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearTimeout(hlTimer);
    hlTimer = setTimeout(() => el && el.classList.remove('dc-hl'), 7000);
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
    const msgs = document.getElementById('dc-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dc-msg';
    if (soloTexto) {
      wrap.innerHTML = `<div class="dc-bubble">${md(soloTexto)}</div>`;
    } else {
      const idx = PASOS.indexOf(paso);
      const label = idx === 0 ? 'Bienvenida' : idx === PASOS.length - 1 ? 'Completado!' : `Paso ${idx} de ${PASOS.length - 2}`;
      let html = `<div class="dc-plabel">${label}</div>`;
      html += `<div class="dc-bubble">${md(paso.mensaje)}</div>`;
      if (paso.tip) html += `<div class="dc-tip">${md(paso.tip)}</div>`;
      if (paso.botonTexto) {
        html += `<button class="dc-btn dc-action-btn" data-paso-id="${paso.id}">${paso.botonTexto}</button>`;
      }
      wrap.innerHTML = html;
      const btn = wrap.querySelector('.dc-action-btn');
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
    const msgs = document.getElementById('dc-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dc-msg';
    wrap.style.display = 'flex';
    wrap.style.justifyContent = 'flex-end';
    wrap.innerHTML = `<div class="dc-ububble">${t}</div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing(cb) {
    const msgs = document.getElementById('dc-msgs');
    const el = document.createElement('div');
    el.id = 'dc-typing-el';
    el.className = 'dc-msg';
    el.innerHTML = `<div class="dc-typing"><span class="dc-dot"></span><span class="dc-dot"></span><span class="dc-dot"></span></div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { el.remove(); if (cb) cb(); }, 700);
  }

  function updateProg() {
    const pct = Math.round((estado.pasoActual / (PASOS.length - 1)) * 100);
    const bar = document.getElementById('dc-prog');
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
    document.getElementById('dc-msgs').innerHTML = '';
    updateProg();
    typing(() => addBotMsg(PASOS[0]));
  }

  function setupListeners() {
    const inpL = document.getElementById('inp_L');
    if (inpL) inpL.addEventListener('change', () => {
      if (PASOS[estado.pasoActual].id === 'longitud') setTimeout(avanzarPaso, 400);
    });

    const btnAdd = document.getElementById('btnAddCarga');
    if (btnAdd) btnAdd.addEventListener('click', () => {
      if (PASOS[estado.pasoActual].id === 'agregar_carga') setTimeout(avanzarPaso, 600);
    });

    const btnCalc = document.getElementById('btnCalc');
    if (btnCalc) btnCalc.addEventListener('click', () => {
      if (PASOS[estado.pasoActual].id === 'calcular') setTimeout(avanzarPaso, 1200);
    });
  }

  function handleInput(query) {
    if (!query.trim()) return;
    addUserMsg(query);
    document.getElementById('dc-input').value = '';
    typing(() => {
      const resp = respuestaLibre(query);
      const msgs = document.getElementById('dc-msgs');
      const wrap = document.createElement('div');
      wrap.className = 'dc-msg';
      const texto = resp || `No encontre esa respuesta especifica, pero puedo explicarte:\n\n• Que son las combinaciones de carga?\n• Como se calcula el viento NCh 432?\n• Como funciona el sismico NCh 433?\n• Que es la carga muerta y viva?\n\nIntenta reformular tu pregunta.`;
      wrap.innerHTML = `
        <div class="dc-bubble">${md(texto)}</div>
        <button class="dc-btn-ghost dc-return">↩ Volver a la guia</button>
      `;
      wrap.querySelector('.dc-return').addEventListener('click', () => {
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

    const fab   = document.getElementById('dc-fab');
    const panel = document.getElementById('dc-panel');
    let open = false;

    setTimeout(() => {
      const db = document.getElementById('dc-db');
      if (db) db.classList.add('show');
    }, 3000);

    fab.addEventListener('click', () => {
      open = !open;
      panel.classList.toggle('open', open);
      const db = document.getElementById('dc-db');
      if (db) db.classList.remove('show');
      if (open && !estado.iniciado) {
        estado.iniciado = true;
        updateProg();
        setTimeout(() => typing(() => addBotMsg(PASOS[0])), 300);
      }
    });

    document.getElementById('dc-close').addEventListener('click', () => {
      open = false;
      panel.classList.remove('open');
    });

    const inp = document.getElementById('dc-input');
    document.getElementById('dc-send').addEventListener('click', () => handleInput(inp.value));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(inp.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
