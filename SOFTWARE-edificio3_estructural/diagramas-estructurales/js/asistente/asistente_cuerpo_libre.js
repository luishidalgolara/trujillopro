/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║   ASISTENTE DCL — Diagrama de Cuerpo Libre                      ║
 * ║   IngeLAB 3D · cuerpo_libre.html                                ║
 * ║   Guia paso a paso tipo profesor                                ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * INSTALACION: agregar antes de </body> en cuerpo_libre.html:
 *   <script src="../js/asistente/asistente_cuerpo_libre.js"></script>
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     PASOS DEL WIZARD
  ═══════════════════════════════════════════ */
  const PASOS = [
    {
      id: 'bienvenida',
      siguiente: 'elemento',
      mensaje: `Hola! Soy tu **Profesor Virtual de Cuerpo Libre**. 🔧\n\nEl **Diagrama de Cuerpo Libre (DCL)** es la herramienta fundamental de la Mecanica Estructural. Consiste en aislar un elemento y mostrar TODAS las fuerzas que actuan sobre el:\n\n• Reacciones en los apoyos (verde)\n• Cargas externas aplicadas (naranja)\n• Fuerzas internas V y M en la seccion de corte (rojo)\n\nEs el punto de partida para cualquier analisis estructural. Si el DCL no esta en equilibrio, todo lo demas esta mal.\n\nSiempre puedes escribirme una duda abajo. Comenzamos?`,
      botonTexto: 'Si, empecemos! →',
      tip: null,
    },
    {
      id: 'elemento',
      siguiente: 'apoyo',
      autoAvanzar: true,
      mensaje: `**Paso 1 — Tipo de elemento** 🏗️\n\nPrimero define que tipo de elemento vas a analizar.\n\n**Viga (horizontal):**\nResiste cargas transversales (perpendiculares al eje). Trabaja principalmente a flexion y cortante. Las reacciones son verticales.\n\n**Columna (vertical):**\nResiste cargas axiales (paralelas al eje) ademas de flexion. Las reacciones incluyen componente horizontal. En este modulo se analiza como elemento con carga lateral.\n\n👆 Selecciona el tipo de elemento en **"Elemento estructural"**.`,
      highlight: 'inp_elem',
      botonTexto: '✅ Ya seleccione el elemento → Siguiente',
      tip: '💡 Para aprender el DCL por primera vez, empieza con **Viga** — es el caso mas didactico y mas frecuente.',
    },
    {
      id: 'apoyo',
      siguiente: 'longitud',
      autoAvanzar: true,
      mensaje: `**Paso 2 — Condicion de apoyos** 🔩\n\nLa condicion de apoyo define cuantas reacciones tiene el elemento.\n\n**Articulado — Articulado (simplemente apoyado):**\n• Apoyo A: pin → restringe desplazamiento vertical y horizontal\n• Apoyo B: rodillo → solo restringe desplazamiento vertical\n• Reacciones: RA, RB (verticales) + HA (horizontal = 0 si no hay carga horizontal)\n• Total: 3 incognitas, 3 ecuaciones → **ISOSTÁTICO** ✅\n\n**Voladizo (empotrado en A):**\n• Apoyo A: empotramiento → restringe todo (vertical, horizontal, giro)\n• Extremo B: libre\n• Reacciones: RA, HA, MA\n• Total: 3 incognitas → **ISOSTÁTICO** ✅\n\n👆 Selecciona la condicion de apoyos.`,
      highlight: 'inp_apoyo',
      botonTexto: '✅ Ya seleccione los apoyos → Siguiente',
      tip: '💡 En el voladizo aparece un **momento de empotramiento MA** en el apoyo — eso es lo que lo diferencia visualmente del simplemente apoyado.',
    },
    {
      id: 'longitud',
      siguiente: 'cargas',
      autoAvanzar: true,
      mensaje: `**Paso 3 — Longitud L** 📏\n\nIngresa la longitud del elemento en metros.\n\nLa longitud afecta directamente las reacciones y los maximos de V y M:\n• Mayor L → mayor momento flector para igual carga\n• M_max = qL²/8 para viga simplemente apoyada con carga uniforme\n\n**Nota importante:** El slider de **"Seccion de corte"** se ajusta automaticamente al rango [0, L]. Si ya tienes una posicion de corte, se recalcula al cambiar L.\n\n👆 Ingresa la longitud en el campo **"Longitud L [m]"**.`,
      highlight: 'inp_L',
      botonTexto: '✅ Ya ingrese la longitud → Siguiente',
      tip: '💡 Para ver bien el DCL, empieza con L=6m — es una longitud tipica que muestra claramente todas las fuerzas.',
    },
    {
      id: 'cargas',
      siguiente: 'corte',
      autoAvanzar: false,
      mensaje: `**Paso 4 — Cargas aplicadas** ⬇️\n\nDefine las cargas que actuan sobre el elemento. Tienes dos tipos que puedes activar/desactivar con los toggles:\n\n**Carga puntual P [kN]:**\nFuerza concentrada en x = a.\n• P: magnitud en kN\n• a: posicion desde el apoyo izquierdo en metros\n• Genera un quiebre abrupto en el diagrama de cortante\n\n**Carga distribuida q [kN/m]:**\nCarga uniforme en toda la longitud L.\n• q: intensidad en kN/m\n• Genera una variacion lineal en el cortante\n\nPuedes tener solo P, solo q, o ambas al mismo tiempo.\n\n👆 Activa las cargas que necesites y define sus valores.`,
      highlight: 'inp_P',
      botonTexto: '✅ Cargas definidas → Siguiente',
      tip: '💡 Activa **ambas cargas** para ver como se combina el diagrama. Es el caso mas completo para aprender.',
    },
    {
      id: 'corte',
      siguiente: 'calcular',
      autoAvanzar: false,
      mensaje: `**Paso 5 — Seccion de corte** ✂️\n\nEsta es la caracteristica unica de este modulo. El **slider "Seccion de corte"** te permite mover una seccion imaginaria a lo largo del elemento.\n\n**¿Que es una seccion de corte?**\nEs un corte imaginario que divide el elemento en dos partes. En ese corte aparecen las **fuerzas internas:**\n• **V(x):** Cortante — fuerza que tiende a deslizar las dos partes\n• **M(x):** Momento flector — par que tiende a doblar el elemento\n• **N(x):** Axial — fuerza paralela al eje (= 0 en vigas puras)\n\n**Como usar el slider:**\nDesliza lentamente y observa como cambian V(x) y M(x) en tiempo real en el panel derecho y en los diagramas inferiores.\n\n👆 Mueve el slider para posicionar la seccion de corte.`,
      highlight: 'inp_xcorte',
      botonTexto: '✅ Entendi la seccion de corte → Calcular',
      tip: '💡 Busca el punto donde V(x) = 0 — ahi es donde M(x) es maximo. Eso confirma la relacion V = dM/dx.',
    },
    {
      id: 'calcular',
      siguiente: 'interpretar',
      autoAvanzar: true,
      mensaje: `**Paso 6 — A calcular!** ⚡\n\nTodo esta listo. Presiona **⚡ CALCULAR** arriba a la derecha.\n\nEl programa mostrara en el canvas central:\n✔ El elemento aislado con todas las fuerzas\n✔ Reacciones en verde (RA, RB o MA)\n✔ Cargas externas en naranja (P y/o q)\n✔ Fuerzas internas en rojo (V y M en el corte)\n✔ Cotas con dimensiones\n✔ Diagrama DFC — V(x) abajo a la izquierda\n✔ Diagrama DMF — M(x) abajo a la derecha\n\n👆 Presiona **⚡ CALCULAR** arriba a la derecha.`,
      highlight: 'btnCalc',
      botonTexto: '✅ Ya calcule → Ver resultados',
      tip: '💡 Despues de calcular, **mueve el slider** de seccion de corte — el diagrama se actualiza en tiempo real sin necesidad de volver a calcular.',
    },
    {
      id: 'interpretar',
      siguiente: 'visibilidad',
      autoAvanzar: false,
      mensaje: `**Paso 7 — Interpretando el DCL** 📊\n\nMira el diagrama central y el panel derecho:\n\n**Equilibrio estatico (panel derecho):**\n• SFx = 0 → siempre se cumple (no hay carga horizontal)\n• SFy = 0 → RA + RB = suma de cargas verticales\n• SMA = 0 → verificacion de momento en apoyo A\n• Todos deben ser ~0.00 para que el equilibrio sea correcto\n\n**Seccion de corte:**\n• V(x) y M(x) se actualizan al mover el slider\n• El punto rojo en los diagramas inferiores sigue el slider\n\n**Maximos:**\n• V_max: el cortante mas grande de toda la viga\n• M_max: el momento mas grande\n• x donde V=0: ahi es donde ocurre M_max\n\n**Cuadro verde/naranja:**\n• Verde → equilibrio verificado ✅\n• Naranja → revisar datos ⚠️`,
      botonTexto: '✅ Entendido → Explorar visibilidad',
      tip: '💡 Mueve el slider hasta el punto donde V=0. Verifica que M(x) en ese punto coincide con M_max del panel derecho.',
    },
    {
      id: 'visibilidad',
      siguiente: 'fin',
      autoAvanzar: false,
      mensaje: `**Paso 8 — Controles de visibilidad** 👁️\n\nEn el panel izquierdo, seccion **"Visibilidad"**, tienes 4 toggles que te permiten mostrar u ocultar partes del DCL:\n\n**Reacciones en apoyos:** Muestra/oculta las flechas verdes de RA, RB y MA.\n\n**Cargas externas:** Muestra/oculta las flechas naranjas de P y q.\n\n**Fuerzas internas V, M:** Muestra/oculta las flechas rojas en la seccion de corte.\n\n**Cotas y dimensiones:** Muestra/oculta las acotaciones de L, x y a.\n\n**Uso pedagogico:**\nPrueba ocultar las reacciones y las fuerzas internas — te quedas solo con las cargas externas. Luego activalas una por una para entender como se construye el DCL paso a paso.\n\n👆 Juega con los toggles para explorar.`,
      botonTexto: '✅ Explore todo → Finalizar',
      tip: '💡 Este orden es el que se usa en clase: primero defines cargas externas, luego calculas reacciones, y por ultimo calculas fuerzas internas.',
    },
    {
      id: 'fin',
      siguiente: null,
      mensaje: `**Excelente!** 🎉\n\nHas dominado el Diagrama de Cuerpo Libre. Resumiendo lo aprendido:\n\n**El DCL en 5 pasos:**\n1. Aislar el elemento y definir la longitud\n2. Identificar todos los apoyos y sus reacciones\n3. Aplicar las cargas externas\n4. Establecer ecuaciones de equilibrio (SFy=0, SMA=0)\n5. Calcular V(x) y M(x) en cualquier seccion\n\n**Relaciones fundamentales:**\n• SFy = 0 → RA + RB = carga total\n• SMA = 0 → RB*L = suma de momentos\n• V(x) = RA - cargas a la izquierda de x\n• M(x) = RA*x - momentos a la izquierda de x\n• Donde V=0 → M es maximo\n\nPrueba cambiar los apoyos de simplemente apoyado a voladizo y observa como cambia completamente el DCL.\n\nTienes dudas? Escribeme abajo 👇`,
      botonTexto: '↺ Reiniciar guia desde el inicio',
    },
  ];

  /* ═══════════════════════════════════════════
     PREGUNTAS FRECUENTES
  ═══════════════════════════════════════════ */
  const QA = [
    { k: ['cuerpo libre','dcl','que es','concepto','para que'], r: `El **Diagrama de Cuerpo Libre (DCL)** consiste en aislar un elemento estructural y dibujar TODAS las fuerzas que actuan sobre el:\n\n• Reacciones en los apoyos\n• Cargas externas aplicadas\n• Fuerzas internas en la seccion de corte\n\nEs la base de todo analisis estructural. Si el DCL no esta en equilibrio, el calculo esta mal.` },
    { k: ['equilibrio','sfx','sfy','suma','momento','sma'], r: `**Condiciones de equilibrio estatico:**\n\nSFx = 0 → suma de fuerzas horizontales\nSFy = 0 → suma de fuerzas verticales\nSMA = 0 → suma de momentos en el punto A\n\nSon 3 ecuaciones y 3 incognitas para un elemento isostático. Si alguna no se cumple (~0), hay un error en los datos o en el calculo.` },
    { k: ['reacciones','ra','rb','ma','apoyo','pin','rodillo'], r: `**Reacciones segun tipo de apoyo:**\n\n**Pin (articulacion):**\n• Restringe X e Y → 2 reacciones (RA vertical, HA horizontal)\n\n**Rodillo:**\n• Restringe solo Y → 1 reaccion (RB vertical)\n\n**Empotramiento:**\n• Restringe X, Y y giro → 3 reacciones (RA, HA, MA)\n\nPara una viga simplemente apoyada con cargas verticales: HA=0, RA+RB=carga total.` },
    { k: ['cortante','v(x)','vx','fuerza cortante'], r: `El **cortante V(x)** es la fuerza perpendicular al eje en una seccion.\n\nFormula: V(x) = RA - suma de cargas a la izquierda de x\n\n• V cambia abruptamente en las cargas puntuales\n• V varia linealmente en tramos con carga distribuida\n• Donde V=0 → M es maximo\n• V = dM/dx (el cortante es la derivada del momento)` },
    { k: ['momento','m(x)','mx','momento flector'], r: `El **momento flector M(x)** es el par de fuerzas en una seccion que tiende a doblar el elemento.\n\nFormula: M(x) = RA*x - P*(x-a) - q*x²/2\n\n• M es maximo donde V=0\n• M=0 en los apoyos articulados\n• M tiene su maximo valor en el empotramiento (voladizo)\n\nConvencion ACI: M(+) tracciona la fibra inferior.` },
    { k: ['seccion de corte','corte','slider','x_corte'], r: `La **seccion de corte** es un plano imaginario que divide el elemento en dos partes.\n\nEn ese plano aparecen las fuerzas internas:\n• V(x): cortante (fuerza que desliza las partes)\n• M(x): momento (par que dobla el elemento)\n• N(x): axial (=0 para vigas sin carga horizontal)\n\nEl slider te permite mover esta seccion a lo largo del elemento y ver como cambian V y M en tiempo real.` },
    { k: ['visibilidad','toggle','mostrar','ocultar'], r: `Los **toggles de visibilidad** permiten mostrar u ocultar partes del DCL:\n\n• Reacciones: flechas verdes (RA, RB, MA)\n• Cargas externas: flechas naranjas (P, q)\n• Fuerzas internas: flechas rojas (V, M en el corte)\n• Cotas: dimensiones L, x, a\n\nUso pedagogico: activalos uno a uno para construir el DCL paso a paso, como se hace en clase.` },
    { k: ['isostático','grado de hiperestat','incognitas'], r: `Un elemento es **isostático** cuando el numero de incognitas (reacciones) es igual al numero de ecuaciones de equilibrio (3).\n\n• Simplemente apoyado: RA + RB + HA = 3 incognitas → isostático ✅\n• Voladizo: RA + HA + MA = 3 incognitas → isostático ✅\n• Biempotrado: 6 incognitas → hiperestático (no se puede resolver con equilibrio solo)\n\nEste modulo trabaja solo con casos isostáticos.` },
    { k: ['convencion','signo','positivo','negativo'], r: `**Convencion de signos ACI 318:**\n\n• V(+): cara izquierda de la seccion apuntando hacia arriba\n• M(+): tracciona la fibra inferior (viga "sonriente")\n• N(+): traccion (alejando las dos partes)\n\nEs importante ser consistente con la convencion. Si cambias la convencion a mitad del problema, los resultados seran erroneos.` },
    { k: ['voladizo','empotrado','cantilever'], r: `En el **voladizo:**\n• El empotramiento en A genera 3 reacciones: RA, HA, MA\n• MA = momento de empotramiento = suma de todos los momentos externos respecto a A\n• V es maximo en el empotramiento y cero en el extremo libre\n• M es maximo en el empotramiento y cero en el extremo libre\n\nEl DCL del voladizo se resuelve facilmente desde el extremo libre hacia el empotramiento.` },
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
     ESTILOS — color cyan (#00e5ff) del DCL
  ═══════════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('dcl-asistente-styles')) return;
    const s = document.createElement('style');
    s.id = 'dcl-asistente-styles';
    s.textContent = `
      #dcl-fab {
        position:fixed;bottom:28px;right:28px;width:56px;height:56px;border-radius:50%;
        background:linear-gradient(135deg,#00e5ff 0%,#00ff9d 100%);
        border:none;cursor:pointer;z-index:9000;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 24px rgba(0,229,255,.55);
        transition:transform .2s,box-shadow .2s;font-size:24px;
      }
      #dcl-fab:hover{transform:scale(1.1) translateY(-2px);box-shadow:0 8px 32px rgba(0,229,255,.7);}
      #dcl-fab .dp{position:absolute;inset:-5px;border-radius:50%;border:2px solid rgba(0,229,255,.4);animation:dclpulse 2s infinite;}
      #dcl-fab .db{position:absolute;top:-3px;right:-3px;background:#ff4757;color:#fff;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;width:18px;height:18px;border-radius:50%;display:none;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(255,71,87,.5);}
      #dcl-fab .db.show{display:flex;}
      @keyframes dclpulse{0%{transform:scale(1);opacity:.6}70%{transform:scale(1.35);opacity:0}100%{transform:scale(1.35);opacity:0}}

      #dcl-panel{
        position:fixed;bottom:96px;right:28px;width:370px;max-height:610px;
        background:#0a0e14;border:1px solid rgba(0,229,255,.2);border-radius:18px;
        display:flex;flex-direction:column;z-index:9001;
        box-shadow:0 32px 80px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04);
        overflow:hidden;transform:scale(.93) translateY(16px);opacity:0;pointer-events:none;
        transition:all .28s cubic-bezier(.34,1.56,.64,1);
      }
      #dcl-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}

      .dcl-hd{padding:13px 15px 11px;background:linear-gradient(135deg,rgba(0,229,255,.1) 0%,rgba(0,255,157,.06) 100%);border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:10px;flex-shrink:0;}
      .dcl-av{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#00e5ff,#00ff9d);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
      .dcl-hn{font-family:'Orbitron',sans-serif;font-size:11px;color:#00e5ff;letter-spacing:.1em;text-transform:uppercase;}
      .dcl-hs{font-family:'Space Mono',monospace;font-size:9px;color:rgba(255,255,255,.3);margin-top:1px;}
      .dcl-hs span{color:#00ff9d;}
      .dcl-xbtn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:7px;width:28px;height:28px;cursor:pointer;color:rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;}
      .dcl-xbtn:hover{background:rgba(0,229,255,.2);color:#00e5ff;border-color:rgba(0,229,255,.3);}

      .dcl-prog-wrap{height:3px;background:rgba(255,255,255,.05);flex-shrink:0;}
      .dcl-prog-fill{height:100%;background:linear-gradient(90deg,#00e5ff,#00ff9d);transition:width .5s ease;}

      .dcl-msgs{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth;}
      .dcl-msgs::-webkit-scrollbar{width:3px;}
      .dcl-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px;}

      .dcl-msg{animation:dclIn .22s ease both;}
      @keyframes dclIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

      .dcl-plabel{font-family:'Orbitron',sans-serif;font-size:9px;color:#00e5ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px;display:flex;align-items:center;gap:5px;}
      .dcl-plabel::before{content:'';display:block;width:3px;height:10px;background:#00e5ff;border-radius:2px;}

      .dcl-bubble{background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;padding:11px 13px;font-family:'DM Sans',sans-serif;font-size:12.5px;color:#c8d3e0;line-height:1.7;}
      .dcl-bubble strong{color:#e8edf5;}
      .dcl-bubble p{margin:0 0 7px;}
      .dcl-bubble p:last-child{margin-bottom:0;}
      .dcl-bubble code{background:rgba(0,229,255,.1);padding:1px 5px;border-radius:3px;font-family:'Space Mono',monospace;font-size:10.5px;color:#67e8f9;}

      .dcl-ububble{background:linear-gradient(135deg,rgba(0,229,255,.14),rgba(0,255,157,.08));border:1px solid rgba(0,229,255,.2);border-radius:14px 14px 4px 14px;padding:8px 12px;font-family:'Space Mono',monospace;font-size:11px;color:#e8edf5;align-self:flex-end;max-width:88%;}

      .dcl-tip{background:rgba(0,255,157,.05);border:1px solid rgba(0,255,157,.14);border-radius:8px;padding:8px 10px;margin-top:6px;font-family:'Space Mono',monospace;font-size:10px;color:#86efac;line-height:1.5;}

      .dcl-btn{background:linear-gradient(135deg,#00e5ff,#00ff9d);border:none;border-radius:9px;padding:9px 16px;margin-top:8px;color:#080c10;font-family:'Space Mono',monospace;font-size:11px;cursor:pointer;transition:all .2s;width:100%;text-align:center;font-weight:700;box-shadow:0 4px 14px rgba(0,229,255,.3);}
      .dcl-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,229,255,.45);}
      .dcl-btn:disabled{opacity:.4;cursor:default;transform:none;}

      .dcl-btn-ghost{background:rgba(0,229,255,.08);border:1px solid rgba(0,229,255,.2);border-radius:8px;padding:7px 12px;margin-top:6px;color:#00e5ff;font-family:'Space Mono',monospace;font-size:10px;cursor:pointer;transition:all .15s;width:100%;text-align:center;}
      .dcl-btn-ghost:hover{background:rgba(0,229,255,.16);color:#67e8f9;}

      .dcl-typing{display:flex;align-items:center;gap:4px;padding:9px 12px;background:#0f1520;border:1px solid rgba(255,255,255,.07);border-radius:14px 14px 14px 4px;width:fit-content;}
      .dcl-dot{width:6px;height:6px;background:rgba(0,229,255,.6);border-radius:50%;animation:dclbounce .9s infinite;}
      .dcl-dot:nth-child(2){animation-delay:.15s;}
      .dcl-dot:nth-child(3){animation-delay:.3s;}
      @keyframes dclbounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}

      .dcl-input-area{padding:10px 12px 13px;border-top:1px solid rgba(255,255,255,.05);display:flex;gap:8px;flex-shrink:0;background:#080c10;}
      #dcl-input{flex:1;background:#111820;border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:8px 11px;color:#e8edf5;font-family:'Space Mono',monospace;font-size:11px;outline:none;transition:border-color .2s;}
      #dcl-input:focus{border-color:rgba(0,229,255,.5);}
      #dcl-input::placeholder{color:rgba(255,255,255,.18);}
      #dcl-send{background:linear-gradient(135deg,#00e5ff,#00ff9d);border:none;border-radius:9px;width:36px;height:36px;cursor:pointer;color:#080c10;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
      #dcl-send:hover{transform:scale(1.07);box-shadow:0 4px 14px rgba(0,229,255,.4);}

      .dcl-hl{outline:2px solid #00e5ff !important;outline-offset:3px !important;animation:dclglow 1.4s ease-in-out infinite alternate;}
      @keyframes dclglow{from{box-shadow:0 0 6px rgba(0,229,255,.3)}to{box-shadow:0 0 18px rgba(0,229,255,.7)}}

      @media(max-width:480px){#dcl-panel{width:calc(100vw - 20px);right:10px;bottom:78px;}#dcl-fab{right:14px;bottom:14px;}}
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════
     DOM
  ═══════════════════════════════════════════ */
  function buildDOM() {
    const fab = document.createElement('button');
    fab.id = 'dcl-fab';
    fab.title = 'Profesor Virtual — Cuerpo Libre';
    fab.innerHTML = `<span class="dp"></span><span class="db" id="dcl-db">!</span>🎓`;
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.id = 'dcl-panel';
    panel.innerHTML = `
      <div class="dcl-hd">
        <div class="dcl-av">🔧</div>
        <div style="flex:1">
          <div class="dcl-hn">Profesor Virtual DCL</div>
          <div class="dcl-hs"><span>●</span> Diagrama de Cuerpo Libre · IngeLAB 3D</div>
        </div>
        <button class="dcl-xbtn" id="dcl-close">✕</button>
      </div>
      <div class="dcl-prog-wrap"><div class="dcl-prog-fill" id="dcl-prog" style="width:0%"></div></div>
      <div class="dcl-msgs" id="dcl-msgs"></div>
      <div class="dcl-input-area">
        <input type="text" id="dcl-input" placeholder="Escribe tu duda aqui...">
        <button id="dcl-send">➤</button>
      </div>
    `;
    document.body.appendChild(panel);
  }

  /* ═══════════════════════════════════════════
     HIGHLIGHT
  ═══════════════════════════════════════════ */
  let hlTimer = null;
  function highlight(id) {
    document.querySelectorAll('.dcl-hl').forEach(el => el.classList.remove('dcl-hl'));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('dcl-hl');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearTimeout(hlTimer);
    hlTimer = setTimeout(() => el && el.classList.remove('dcl-hl'), 7000);
  }

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
    const msgs = document.getElementById('dcl-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dcl-msg';
    if (soloTexto) {
      wrap.innerHTML = `<div class="dcl-bubble">${md(soloTexto)}</div>`;
    } else {
      const idx = PASOS.indexOf(paso);
      const label = idx === 0 ? 'Bienvenida' : idx === PASOS.length - 1 ? 'Completado!' : `Paso ${idx} de ${PASOS.length - 2}`;
      let html = `<div class="dcl-plabel">${label}</div>`;
      html += `<div class="dcl-bubble">${md(paso.mensaje)}</div>`;
      if (paso.tip) html += `<div class="dcl-tip">${md(paso.tip)}</div>`;
      if (paso.botonTexto) {
        html += `<button class="dcl-btn dcl-action-btn" data-paso-id="${paso.id}">${paso.botonTexto}</button>`;
      }
      wrap.innerHTML = html;
      const btn = wrap.querySelector('.dcl-action-btn');
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
    const msgs = document.getElementById('dcl-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'dcl-msg';
    wrap.style.display = 'flex';
    wrap.style.justifyContent = 'flex-end';
    wrap.innerHTML = `<div class="dcl-ububble">${t}</div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing(cb) {
    const msgs = document.getElementById('dcl-msgs');
    const el = document.createElement('div');
    el.id = 'dcl-typing-el';
    el.className = 'dcl-msg';
    el.innerHTML = `<div class="dcl-typing"><span class="dcl-dot"></span><span class="dcl-dot"></span><span class="dcl-dot"></span></div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => { el.remove(); if (cb) cb(); }, 700);
  }

  function updateProg() {
    const pct = Math.round((estado.pasoActual / (PASOS.length - 1)) * 100);
    const bar = document.getElementById('dcl-prog');
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
    document.getElementById('dcl-msgs').innerHTML = '';
    updateProg();
    typing(() => addBotMsg(PASOS[0]));
  }

  /* ═══════════════════════════════════════════
     LISTENERS
  ═══════════════════════════════════════════ */
  function setupListeners() {
    const bind = (id, pasoId, ev = 'change') => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(ev, () => {
        if (PASOS[estado.pasoActual].id === pasoId) setTimeout(avanzarPaso, 400);
      });
    };
    bind('inp_elem',  'elemento');
    bind('inp_apoyo', 'apoyo');
    bind('inp_L',     'longitud', 'change');

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
    document.getElementById('dcl-input').value = '';
    typing(() => {
      const resp = respuestaLibre(query);
      const msgs = document.getElementById('dcl-msgs');
      const wrap = document.createElement('div');
      wrap.className = 'dcl-msg';
      const texto = resp || `No encontre esa respuesta especifica, pero puedo explicarte:\n\n• Que es el Diagrama de Cuerpo Libre?\n• Que son las reacciones en los apoyos?\n• Que es el cortante V(x)?\n• Como funciona la seccion de corte?\n\nIntenta reformular tu pregunta.`;
      wrap.innerHTML = `
        <div class="dcl-bubble">${md(texto)}</div>
        <button class="dcl-btn-ghost dcl-return">↩ Volver a la guia</button>
      `;
      wrap.querySelector('.dcl-return').addEventListener('click', () => {
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

    const fab   = document.getElementById('dcl-fab');
    const panel = document.getElementById('dcl-panel');
    let open = false;

    setTimeout(() => {
      const db = document.getElementById('dcl-db');
      if (db) db.classList.add('show');
    }, 3000);

    fab.addEventListener('click', () => {
      open = !open;
      panel.classList.toggle('open', open);
      const db = document.getElementById('dcl-db');
      if (db) db.classList.remove('show');
      if (open && !estado.iniciado) {
        estado.iniciado = true;
        updateProg();
        setTimeout(() => typing(() => addBotMsg(PASOS[0])), 300);
      }
    });

    document.getElementById('dcl-close').addEventListener('click', () => {
      open = false;
      panel.classList.remove('open');
    });

    const inp = document.getElementById('dcl-input');
    document.getElementById('dcl-send').addEventListener('click', () => handleInput(inp.value));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(inp.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
