/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ASISTENTE DD — Diagrama de Deformaciones                      ║
 * ║   IngeLAB 3D · deformacion.html                                 ║
 * ║   Guia paso a paso tipo profesor                                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en deformacion.html:
 *   <script src="../js/asistente/asistente_deformacion.js"></script>
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     PASOS DEL WIZARD
  ═══════════════════════════════════════════ */
  const PASOS = [
    {
      id: 'bienvenida',
      siguiente: 'tipo_viga',
      mensaje: `Hola! Soy tu **Profesor Virtual de Deformaciones**. 📐\n\nEste modulo calcula la **linea elastica y(x)** de una viga, es decir, como se deforma fisicamente bajo las cargas aplicadas.\n\nCalcularemos:\n• La flecha maxima delta_max y su posicion\n• Los giros en los apoyos (theta_A, theta_B)\n• La curvatura kappa(x) = M/EI\n• Verificacion segun normativa (NCh 430, AISC, EC2)\n\nSiempre puedes escribirme una duda abajo. Lista para comenzar?`,
      botonTexto: 'Si, empecemos! →',
      tip: null,
    },
    {
      id: 'tipo_viga',
      siguiente: 'longitud',
      autoAvanzar: true,
      mensaje: `**Paso 1 — Tipo de viga** 🏗️\n\nDefine como esta apoyada tu viga. Mira **"Geometria de viga"** en el panel izquierdo.\n\n**Simplemente apoyada:**\nApoyos en ambos extremos. La flecha maxima ocurre cerca del centro. El giro es maximo en los apoyos.\n\n**Voladizo:**\nUn extremo empotrado, el otro libre. La flecha maxima ocurre en el extremo libre. El giro es cero en el empotramiento.\n\n**Diferencia clave en flecha:**\n• S.A. + q uniforme: delta = 5qL^4 / 384EI\n• Voladizo + q uniforme: delta = qL^4 / 8EI\n\nEl voladizo tiene **48 veces mas flecha** que la viga simplemente apoyada con igual carga!\n\n👆 Selecciona el tipo de viga.`,
      highlight: 'inp_tipo',
      botonTexto: '✅ Ya seleccione el tipo → Siguiente',
      tip: '💡 Para el primer calculo usa **Simplemente apoyada** — es el caso mas comun en vigas de piso.',
    },
    {
      id: 'longitud',
      siguiente: 'seccion',
      autoAvanzar: true,
      mensaje: `**Paso 2 — Longitud L** 📏\n\nIngresa la longitud de la viga en metros.\n\nLa longitud afecta la flecha con potencia 4:\n**delta es proporcional a L^4**\n\nEsto significa que si duplicas L, la flecha se multiplica por 16. Por eso las vigas largas son criticas para el control de deformaciones.\n\n**Rangos tipicos:**\n• Vigas de losa residencial: 4 a 7 m\n• Vigas de edificio: 5 a 9 m\n• Voladizos: 1 a 4 m\n\n👆 Ingresa la longitud en el campo **"Longitud L [m]"**.`,
      highlight: 'inp_L',
      botonTexto: '✅ Ya ingrese la longitud → Siguiente',
      tip: '💡 Recuerda: duplicar L multiplica la flecha por 16. Es el parametro mas sensible de toda la formula.',
    },
    {
      id: 'seccion',
      siguiente: 'propiedades',
      autoAvanzar: true,
      mensaje: `**Paso 3 — Tipo de seccion** 🔲\n\nLa seccion define la rigidez EI de la viga, que es lo que resiste la deformacion.\n\n**Rectangular H.A.:** defines b y h. I = b*h^3/12\n**T-Beam H.A.:** viga T con losa. Mayor I que rectangular.\n**Perfil IPE:** acero laminado. E = 200,000 MPa (muy rigido).\n**Perfil HEA:** perfil H europeo, mas ancho que IPE, para columnas y vigas de mayor carga.\n\n**Efecto en la flecha:**\n• Mayor I → menor flecha (efecto cubico con h)\n• Mayor E → menor flecha (acero 8x mas rigido que hormigon)\n• EI es el producto que controla todo\n\n👆 Selecciona el tipo de seccion.`,
      highlight: 'inp_sec',
      botonTexto: '✅ Ya seleccione la seccion → Siguiente',
      tip: '💡 Aumentar h es mucho mas eficiente que aumentar b. Duplicar h divide la flecha por 8.',
    },
    {
      id: 'propiedades',
      siguiente: 'cargas',
      autoAvanzar: false,
      mensaje: `**Paso 4 — Dimensiones de la seccion** 📐\n\nDefine las medidas de tu viga.\n\n**Si es Rectangular H.A.:**\n• b (ancho): 0.20 a 0.40 m tipico\n• h (alto): regla practica h ≈ L/12\n• f'c: 25 MPa es el estandar en Chile\n\n**Si es T-Beam:**\n• bw = ancho del alma\n• bf = ancho del ala (losa)\n• hf = espesor del ala\n• h = altura total\n\n**Si es IPE o HEA:**\nSelecciona el perfil de la lista. Los datos I, E y A estan tabulados internamente.\n\n**Ejemplo tipico para L=6m:**\nb=0.30 m, h=0.55 m, f'c=25 MPa\n\n👆 Ingresa tus dimensiones y presiona el boton cuando estes listo.`,
      highlight: 'inp_b',
      botonTexto: '✅ Dimensiones listas → Siguiente',
      tip: '💡 Si la flecha sale muy grande, aumenta h primero. El efecto es cubico: h*2 → flecha/8.',
    },
    {
      id: 'cargas',
      siguiente: 'normativa',
      autoAvanzar: false,
      mensaje: `**Paso 5 — Cargas aplicadas** ⬇️\n\nAgrega las cargas sobre la viga con el boton **"+ Agregar carga"**.\n\n**Puntual P [kN]:** fuerza concentrada en un punto x=a.\n• La flecha maxima: delta = PL^3/48EI (carga central)\n\n**Distribuida q [kN/m]:** repartida en un tramo [a → b].\n• La flecha maxima: delta = 5qL^4/384EI (toda la viga)\n\n**Valores tipicos NCh 1537:**\n• Peso propio losa 15 cm: 3.75 kN/m\n• Sobrecarga habitacional: 2.0 kN/m\n• Sobrecarga oficinas: 2.5 kN/m\n• Tabiques: 1.0 kN/m\n\n**Ojo:** la flecha depende de la carga con potencia 1 (lineal). Duplicar la carga duplica la flecha.\n\n👆 Agrega al menos una carga y presiona el boton cuando estes listo.`,
      highlight: 'btnAddCarga',
      botonTexto: '✅ Cargas listas → Siguiente',
      tip: '💡 Puedes combinar varias cargas. El principio de superposicion aplica: las flechas se suman.',
    },
    {
      id: 'normativa',
      siguiente: 'calcular',
      autoAvanzar: true,
      mensaje: `**Paso 6 — Normativa y uso** 📋\n\nDefine segun que norma se verificara la flecha admisible.\n\n**NCh 430 (Chile):**\n• Solo cargas variables: L/360\n• Cargas totales D+L: L/240\n\n**AISC 360 (Acero USA):**\n• Solo cargas vivas: L/360\n• Cargas totales: L/240\n\n**Eurocódigo 2:**\n• Combinacion caracteristica: L/250\n\n**Tipo de uso:**\n• Vivienda: limite L/240\n• Oficina: limite L/360 (mas estricto)\n• Industrial: limite L/200\n• Sensible (acabados): limite L/480 (muy estricto)\n\nEl **DCR** de flecha = delta_real / delta_admisible. Si DCR > 1 la flecha excede el limite.\n\n👆 Selecciona la normativa y tipo de uso.`,
      highlight: 'inp_norma',
      botonTexto: '✅ Normativa definida → Siguiente',
      tip: '💡 Para edificios de uso mixto, usa el criterio mas restrictivo. Oficinas y sensible a acabados tienen los limites mas exigentes.',
    },
    {
      id: 'calcular',
      siguiente: 'interpretar',
      autoAvanzar: true,
      mensaje: `**Paso 7 — A calcular!** ⚡\n\nTodo esta configurado. Presiona **⚡ CALCULAR** arriba a la derecha.\n\nEl programa calculara:\n✔ Linea elastica y(x) punto a punto\n✔ Flecha maxima delta_max y posicion x\n✔ Giros theta_A y theta_B en los apoyos\n✔ Curvatura kappa(x) = M(x)/EI\n✔ Verificacion segun normativa elegida\n✔ Formula analitica equivalente\n\n**Los 3 diagramas centrales:**\n• Superior: deformada y(x) amplificada\n• Inferior izquierdo: curvatura kappa(x)\n• Inferior derecho: giro theta(x)\n\n👆 Presiona **⚡ CALCULAR** arriba a la derecha.`,
      highlight: 'btnCalc',
      botonTexto: '✅ Ya calcule → Ver resultados',
      tip: '💡 El slider **"Amplificacion deformada"** te permite exagerar visualmente la deformacion para verla mejor. No afecta los calculos.',
    },
    {
      id: 'interpretar',
      siguiente: 'fin',
      autoAvanzar: false,
      mensaje: `**Paso 8 — Interpretando los resultados** 📊\n\nMira el **panel derecho** y los diagramas centrales:\n\n**delta_max:** La flecha maxima en mm. Es el valor critico para verificacion.\n\n**L/delta ratio:** Cuantas veces la longitud es mayor que la flecha.\n• L/360 o mayor → cumple carga variable\n• L/240 o mayor → cumple carga total\n\n**theta_A y theta_B:** Giros en los apoyos en mrad. Utiles para diseño de conexiones.\n\n**DCR (L):** Verificacion solo cargas variables.\n**DCR (D+L):** Verificacion cargas totales.\n• DCR < 1 ✅ → flecha admisible\n• DCR > 1 ❌ → flecha excede el limite\n\n**Diagrama de curvatura:** Proporcional a M(x)/EI. Donde la curvatura es maxima, la viga se dobla mas.\n\n**Diagrama de giro:** La integral de la curvatura. Cero en el centro para viga simetrica.`,
      botonTexto: '✅ Entendido → Que hago si falla?',
      tip: '💡 El cuadro verde/rojo al final del panel derecho es la verificacion global. Verde = flecha admisible, Rojo = hay que redisenar.',
    },
    {
      id: 'fin',
      siguiente: null,
      mensaje: `**Excelente trabajo!** 🎉\n\nHas completado el analisis de deformaciones.\n\n**Si la flecha excede el limite (DCR > 1):**\n1. **Aumentar h** → efecto L^4 inverso, muy eficiente\n2. **Aumentar EI** → usar perfil mayor o mayor seccion\n3. **Reducir la luz L** → agregar apoyo intermedio\n4. **Reducir las cargas** → revisar sobrecarga de uso\n5. **Cambiar a perfil de acero** → E es 8x mayor que hormigon\n\n**Relaciones clave para recordar:**\n• delta ∝ L^4 → duplicar L multiplica flecha x16\n• delta ∝ 1/EI → duplicar h divide flecha por 8\n• delta ∝ q → duplicar carga duplica flecha\n\nPrueba cambiar el slider de amplificacion para visualizar mejor la deformada.\n\nTienes dudas? Escribeme abajo 👇`,
      botonTexto: '↺ Reiniciar guia desde el inicio',
    },
  ];

  /* ═══════════════════════════════════════════
     PREGUNTAS FRECUENTES
  ═══════════════════════════════════════════ */
  const QA = [
    { k: ['flecha','delta','deformacion','deformada','que es'], r: `La **flecha delta** es el desplazamiento vertical maximo de la viga bajo las cargas.\n\nFormulas tipicas:\n• S.A. + q uniforme: delta = 5qL^4 / 384EI\n• S.A. + P central: delta = PL^3 / 48EI\n• Voladizo + q: delta = qL^4 / 8EI\n• Voladizo + P: delta = PL^3 / 3EI\n\nLa flecha crece con la 4ta potencia de L y disminuye con EI.` },
    { k: ['limite','admisible','l/360','l/240','l/250','norma'], r: `**Limites de flecha por normativa:**\n\n**NCh 430 / ACI 318:**\n• Solo carga variable: L/360\n• Carga total D+L: L/240\n\n**AISC 360 (Acero):**\n• Carga viva: L/360\n• Total: L/240\n\n**Eurocódigo 2:**\n• Combinacion caracteristica: L/250\n\n**Sensible a acabados:** L/480\n\nEl DCR = delta_real / delta_adm. Si DCR > 1 hay que redisenar.` },
    { k: ['ei','rigidez','inercia','modulo'], r: `**EI = Rigidez a flexion [kN*m^2]**\n\nEs el producto del modulo de elasticidad E por el momento de inercia I. Controla toda la deformacion:\n\n• Mayor EI → menor flecha\n• Hormigon f'c=25: E ≈ 23,500 MPa\n• Acero: E = 200,000 MPa (8.5x mayor)\n• Rect: I = b*h^3/12\n\nDuplicar h multiplica I por 8 → flecha se divide por 8.` },
    { k: ['curvatura','kappa','m/ei'], r: `La **curvatura kappa(x) = M(x)/EI** mide cuanto se curva la viga en cada punto.\n\n• Donde M es mayor → mayor curvatura\n• La deformada y(x) es la doble integral de la curvatura\n• kappa maxima = M_max / EI\n\nEl diagrama de curvatura tiene la misma forma que el diagrama de momento dividido por EI.` },
    { k: ['giro','theta','rotacion','apoyo'], r: `El **giro theta(x)** es el angulo de inclinacion de la viga en cada punto (pendiente de la deformada).\n\n• theta = dy/dx = integral de kappa\n• theta_A y theta_B son los giros en los apoyos\n• En el centro de una viga simetrica: theta = 0\n• Se mide en radianes o miliradianes (mrad)\n\nImportante para disenar conexiones y verificar que los giros sean compatibles con los elementos adyacentes.` },
    { k: ['amplificacion','escala','slider'], r: `El **slider de amplificacion** multiplica visualmente la deformada en el diagrama.\n\n• El valor por defecto es x50\n• Puedes subir hasta x500 para vigas muy rigidas\n• **NO afecta los calculos** — solo es para visualizacion\n• Si la flecha real es 1mm, con x50 se ve como 50mm en pantalla\n\nUtil para vigas muy rigidas donde la deformacion real es casi imperceptible.` },
    { k: ['formula analitica','analitico','formula cerrada'], r: `La **formula analitica** muestra la expresion matematica cerrada para el caso mas representativo de carga.\n\nEjemplos:\n• S.A. + q total: delta = 5qL^4/384EI\n• S.A. + P central: delta = PL^3/48EI\n• Voladizo + q: delta = qL^4/8EI\n\nEs util para verificar rapidamente el calculo numerico y entender la sensibilidad de cada parametro.` },
    { k: ['dcr','cumple','excede','falla','rojo'], r: `**DCR = delta_real / delta_admisible**\n\n• DCR < 1.0 ✅ → Flecha dentro del limite\n• DCR > 1.0 ❌ → Flecha excede el limite\n\nHay dos DCR:\n• **DCR (L):** solo cargas variables\n• **DCR (D+L):** cargas totales (mas desfavorable)\n\nSi falla, las soluciones mas efectivas son aumentar h o reducir L.` },
    { k: ['superposicion','varias cargas','combinacion'], r: `El **principio de superposicion** aplica para deformaciones en regimen elastico lineal.\n\nPuedes agregar varias cargas y las flechas se suman algebraicamente.\n\nEjemplo: si tienes q=15 kN/m y P=50 kN central:\ndelta_total ≈ delta_q + delta_P\n\nEl programa calcula numericamente la solucion exacta considerando todas las cargas simultaneamente.` },
    { k: ['normativa','nch','aisc','ec2','eurocod'], r: `**Normativa de referencia:**\n\n🇨🇱 **NCh 430:2008** → Hormigon Armado Chile\n🇺🇸 **AISC 360-22** → Acero estructural USA\n🇪🇺 **Eurocódigo 2** → Norma europea\n🇺🇸 **ACI 318-19** → Hormigon armado USA\n\nTodas definen limites de flecha como fraccion de la luz L. La mas restrictiva es L/480 para elementos sensibles a acabados.` },
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
     ESTILOS — color accent morado (--accent:#c084fc)
  ═══════════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('dd-asistente-styles')) return;
    const s = document.createElement('style');
    s.id = 'dd-asistente-styles';
    s.textContent = `
      #dd-fab {
        position:fixed;bottom:28px;right:28px;width:56px;height:56px;border-radius:50%;
        background:linear-gradient(135deg,#c084fc 0%,#00e5ff 100%);
        border:none;cursor:pointer;z-index:9000;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 24px rgba(192,132,252,.55);
        transition:transform .2s,box-shadow .2s;font-size:24px;
      }
      #dd-fab:hover{transform:scale(1.1) translateY(-2px);box-shadow:0 8px 32px rgba(192,132,252,.7);}
      #dd-fab .dp{position:absolute;inset:-5px;border-radius:50%;border:2px solid rgba(192,132,252,.4);animation:ddpulse 2s infinite;}
      #dd-fab .db{position:absolute;top:-3px;right:-3px;background:#00e5ff;color:#080c10;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;width:18px;height:18px;border-radius:50%;display:none;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,229,255,.5);}
      #dd-fab .db.show{display:flex;}
      @keyframes ddpulse{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.35);opacity:0}100%{transform:scale(1.35);opacity:0}}

      #dd-panel{
        position:fixed;bottom:96px;right:28px;width:370px;max-height:610px;
        background:#0a0e14;border:1px solid rgba(192,132,252,.2);border-radius:18px;
        display:flex;flex-direction:column;z-index:9001;
        box-shadow:0 32px 80px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04);
        overflow:hidden;transform:scale(.93) translateY(16px);opacity:0;pointer-events:none;
        transition:all .28s cubic-bezier(.34,1.56,.64,1);
      }
      #dd-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}

      .dd-hd{padding:13px 15px 11px;background:linear-gradient(135deg,rgba(192,132,252,.1) 0%,rgba(0,229,255,.06) 100%);border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:10px;flex-shrink:0;}
      .dd-av{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#c084fc,#00e5ff);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
      .dd-hn{font-family:'Orbitron',sans-serif;font-size:11px;color:#c084fc;letter-spacing:.1em;text-transform:uppercase;}
      .dd-hs{font-family:'Space Mono',monospace;font-size:9px;color:rgba(255,255,255,.3);margin-top:1px;}
      .dd-hs span{color:#00ff9d;}
      .dd-xbtn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:7px;width:28px;height:28px;cursor:pointer;color:rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;}
      .dd-xbtn:hover{background:rgba(192,132,252,.2);color:#c084fc;border-color:rgba(192,132,252,.3);}

      .dd-prog-wrap{height:3px;background:rgba(255,255,255,.05);flex-shrink:0;}
      .dd-prog-fill{height:100%;background:linear-gradient(90deg,#c084fc,#00e5ff);transition:width .5s ease;}

      .dd-msgs{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}
      .dd-msgs::-webkit-scrollbar{width:3px;}
      .dd-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px;}

      .dd-msg{animation:ddIn .22s ease both;}
      @keyframes ddIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

      .dd-plabel{font-family:'Orbitron',sans-serif;font-size:9px;color:#c084fc;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:5px;}
      .dd-plabel::before{content:'';display:block;width:3px;height:10px;background:#c084fc;border-radius:2px;}

      .dd-bubble{background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;padding:11px 13px;font-family:'DM Sans',sans-serif;font-size:12.5px;color:#c8d3e0;line-height:1.7;}
      .dd-bubble strong{color:#e8edf5;}
      .dd-bubble p{margin:0 0 7px;}
      .dd-bubble p:last-child{margin-bottom:0;}
      .dd-bubble code{background:rgba(192,132,252,.12);padding:1px 5px;border-radius:3px;font-family:'Space Mono',monospace;font-size:10.5px;color:#d8b4fe;}

      .dd-ububble{background:linear-gradient(135deg,rgba(192,132,252,.16),rgba(0,229,255,.08));border:1px solid rgba(192,132,252,.22);border-radius:14px 14px 4px 14px;padding:8px 12px;font-family:'Space Mono',monospace;font-size:11px;color:#e8edf5;align-self:flex-end;max-width:88%;}

      .dd-tip{background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.14);border-radius:8px;padding:8px 10px;margin-top:6px;font-family:'Space Mono',monospace;font-size:10px;color:#5eead4;line-height:1.5;}

      .dd-btn{background:linear-gradient(135deg,#c084fc,#00e5ff);border:none;border-radius:9px;padding:9px 16px;margin-top:8px;color:#0a0e14;font-family:'Space Mono',monospace;font-size:11px;cursor:pointer;transition:all .2s;width:100%;text-align:center;font-weight:700;box-shadow:0 4px 14px rgba(192,132,252,.3);}
      .dd-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(192,132,252,.45);}
      .dd-btn:disabled{opacity:.4;cursor:default;transform:none;}

      .dd-btn-ghost{background:rgba(192,132,252,.1);border:1px solid rgba(192,132,252,.25);border-radius:8px;padding:7px 12px;margin-top:6px;color:#c084fc;font-family:'Space Mono',monospace;font-size:10px;cursor:pointer;transition:all .15s;width:100%;text-align:center;}
      .dd-btn-ghost:hover{background:rgba(192,132,252,.2);color:#d8b4fe;}

      .dd-typing{display:flex;align-items:center;gap:4px;padding:9px 12px;background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;width:fit-content;}
      .dd-dot{width:6px;height:6px;background:rgba(192,132,252,.6);border-radius:50%;animation:ddbounce .9s infinite;}
      .dd-dot:nth-child(2){animation-delay:.15s;}
      .dd-dot:nth-child(3){animation-delay:.3s;}
      @keyframes ddbounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}

      .dd-input-area{padding:10px 12px 13px;border-top:1px solid rgba(255,255,255,.05);display:flex;gap:8px;flex-shrink:0;background:#080c10;}
      #dd-input{flex:1;background:#111820;border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:8px 11px;color:#e8edf5;font-family:'Space Mono',monospace;font-size:11px;outline:none;transition:border-color .2s;}
      #dd-input:focus{border-color:rgba(192,132,252,.5);}
      #dd-input::placeholder{color:rgba(255,255,255,.18);}
      #dd-send{background:linear-gradient(135deg,#c084fc,#00e5ff);border:none;border-radius:9px;width:36px;height:36px;cursor:pointer;color:#0a0e14;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
      #dd-send:hover{transform:scale(1.07);box-shadow:0 4px 14px rgba(192,132,252,.4);}

      .dd-hl{outline:2px solid #c084fc !important;outline-offset:3px !important;animation:ddglow 1.4s ease-in-out infinite alternate;}
      @keyframes ddglow{from{box-shadow:0 0 6px rgba(192,132,252,.3)}to{box-shadow:0 0 18px rgba(192,132,252,.7)}}

      @media(max-width:480px){#dd-panel{width:calc(100vw - 20px);right:10px;bottom:78px;}#dd-fab{right:14px;bottom:14px;}}
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════
     DOM
  ═══════════════════════════════════════════ */
  function buildDOM() {
    const fab = document.createElement('button');
    fab.id = 'dd-fab';
    fab.title = 'Profesor Virtual — Deformaciones';
    fab.innerHTML = `<span class="dp"></span><span class="db" id="dd-db">!</span>🎓`;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'dd-panel';
    panel.innerHTML = `
      <div class="dd-hd">
        <div class="dd-av">📐</div>
        <div style="flex:1">
          <div class="dd-hn">Profesor Virtual DD</div>
          <div class="dd-hs"><span>●</span> Diagrama de Deformaciones · IngeLAB 3D</div>
        </div>
        <button class="dd-xbtn" id="dd-close">✕</button>
      </div>
      <div class="dd-prog-wrap"><div class="dd-prog-fill" id="dd-prog" style="width:0%"></div></div>
      <div class="dd-msgs" id="dd-msgs"></div>
      <div class="dd-input-area">
        <input type="text" id="dd-input" placeholder="Escribe tu duda aqui...">
        <button id="dd-send">➤</button>
      </div>
    `;
    document.body.appendChild(panel);
  }

  /* ═══════════════════════════════════════════
     HIGHLIGHT
  ═══════════════════════════════════════════ */
  let hlTimer = null;
  function highlight(id) {
    document.querySelectorAll('.dd-hl').forEach(el => el.classList.remove('dd-hl'));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('dd-hl');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearTimeout(hlTimer);
    hlTimer = setTimeout(() => el && el.classList.remove('dd-hl'), 7000);
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
    const msgs = document.getElementById('dd-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dd-msg';

    if (soloTexto) {
      wrap.innerHTML = `<div class="dd-bubble">${md(soloTexto)}</div>`;
    } else {
      const idx = PASOS.indexOf(paso);
      const label = idx === 0 ? 'Bienvenida' : idx === PASOS.length - 1 ? 'Completado!' : `Paso ${idx} de ${PASOS.length - 2}`;
      let html = `<div class="dd-plabel">${label}</div>`;
      html += `<div class="dd-bubble">${md(paso.mensaje)}</div>`;
      if (paso.tip) html += `<div class="dd-tip">${md(paso.tip)}</div>`;
      if (paso.botonTexto) {
        html += `<button class="dd-btn dd-action-btn" data-paso-id="${paso.id}">${paso.botonTexto}</button>`;
      }
      wrap.innerHTML = html;
      const btn = wrap.querySelector('.dd-action-btn');
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
    const msgs = document.getElementById('dd-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dd-msg';
    wrap.style.display = 'flex';
    wrap.style.justifyContent = 'flex-end';
    wrap.innerHTML = `<div class="dd-ububble">${t}</div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing(cb) {
    const msgs = document.getElementById('dd-msgs');
    const el = document.createElement('div');
    el.id = 'dd-typing-el';
    el.className = 'dd-msg';
    el.innerHTML = `<div class="dd-typing"><span class="dd-dot"></span><span class="dd-dot"></span><span class="dd-dot"></span></div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { el.remove(); if (cb) cb(); }, 700);
  }

  /* ═══════════════════════════════════════════
     PROGRESO Y AVANCE
  ═══════════════════════════════════════════ */
  function updateProg() {
    const pct = Math.round((estado.pasoActual / (PASOS.length - 1)) * 100);
    const bar = document.getElementById('dd-prog');
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
    document.getElementById('dd-msgs').innerHTML = '';
    updateProg();
    typing(() => addBotMsg(PASOS[0]));
  }

  /* ═══════════════════════════════════════════
     LISTENERS DEL FORMULARIO
  ═══════════════════════════════════════════ */
  function setupListeners() {
    const bind = (id, pasoId) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => {
        if (PASOS[estado.pasoActual].id === pasoId) setTimeout(avanzarPaso, 400);
      });
    };
    bind('inp_tipo',  'tipo_viga');
    bind('inp_L',     'longitud');
    bind('inp_sec',   'seccion');
    bind('inp_norma', 'normativa');
    bind('inp_uso',   'normativa');

    const btnAdd = document.getElementById('btnAddCarga');
    if (btnAdd) btnAdd.addEventListener('click', () => {
      if (PASOS[estado.pasoActual].id === 'cargas') setTimeout(avanzarPaso, 600);
    });

    const btnCalc = document.getElementById('btnCalc');
    if (btnCalc) btnCalc.addEventListener('click', () => {
      if (PASOS[estado.pasoActual].id === 'calcular') setTimeout(avanzarPaso, 1200);
    });
  }

  /* ═══════════════════════════════════════════
     PREGUNTAS LIBRES
  ═══════════════════════════════════════════ */
  function handleInput(query) {
    if (!query.trim()) return;
    addUserMsg(query);
    document.getElementById('dd-input').value = '';
    typing(() => {
      const resp = respuestaLibre(query);
      const msgs = document.getElementById('dd-msgs');
      const wrap = document.createElement('div');
      wrap.className = 'dd-msg';
      const texto = resp || `No encontre esa respuesta especifica, pero puedo explicarte:\n\n• Que es la flecha delta?\n• Cuales son los limites L/360?\n• Que es la rigidez EI?\n• Que es la curvatura kappa?\n\nIntenta reformular tu pregunta.`;
      wrap.innerHTML = `
        <div class="dd-bubble">${md(texto)}</div>
        <button class="dd-btn-ghost dd-return">↩ Volver a la guia</button>
      `;
      wrap.querySelector('.dd-return').addEventListener('click', () => {
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

    const fab   = document.getElementById('dd-fab');
    const panel = document.getElementById('dd-panel');
    let open = false;

    setTimeout(() => {
      const db = document.getElementById('dd-db');
      if (db) db.classList.add('show');
    }, 3000);

    fab.addEventListener('click', () => {
      open = !open;
      panel.classList.toggle('open', open);
      const db = document.getElementById('dd-db');
      if (db) db.classList.remove('show');
      if (open && !estado.iniciado) {
        estado.iniciado = true;
        updateProg();
        setTimeout(() => typing(() => addBotMsg(PASOS[0])), 300);
      }
    });

    document.getElementById('dd-close').addEventListener('click', () => {
      open = false;
      panel.classList.remove('open');
    });

    const inp = document.getElementById('dd-input');
    document.getElementById('dd-send').addEventListener('click', () => handleInput(inp.value));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(inp.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
