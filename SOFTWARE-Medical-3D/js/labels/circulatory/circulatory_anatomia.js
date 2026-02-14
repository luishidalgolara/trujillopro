/**
 * ═══════════════════════════════════════════════════
 *  CIRCULATORY — Anatomía Vascular Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__CIRC_DATA = window.__CIRC_DATA || {};

window.__CIRC_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🔬',
    color: '#a78bfa',
    items: [
        {
            name: 'Arterias Coronarias',
            region: 'Superficie del Miocardio',
            desc: 'Dos arterias principales nacen de la raíz aórtica: la coronaria izquierda (se divide en descendente anterior y circunfleja) y la coronaria derecha. La DA irriga la pared anterior del VI y septo; su oclusión causa el infarto más extenso y peligroso.',
            datos: [
                { l: 'Izquierda', v: 'DA + Circunfleja' },
                { l: 'Derecha', v: 'Pared inferior' },
                { l: 'Dominancia', v: 'Derecha ~85%' },
                { l: 'Flujo', v: '~250 mL/min' }
            ]
        },
        {
            name: 'Polígono de Willis',
            region: 'Base del Cerebro',
            desc: 'Anastomosis arterial en la base cerebral que conecta las circulaciones carotídea y vertebrobasilar. Formado por arterias comunicantes anteriores y posteriores. Proporciona circulación colateral si una arteria se ocluye, aunque solo es completo en ~50% de personas.',
            datos: [
                { l: 'Componentes', v: '7 arterias' },
                { l: 'Completo en', v: '~50% personas' },
                { l: 'Función', v: 'Colateral cereb.' },
                { l: 'Conecta', v: 'Carótida+Verteb.' }
            ]
        },
        {
            name: 'Sistema Porta Hepático',
            region: 'Vena Porta — Sinusoides Hepáticos',
            desc: 'Único sistema porta en el adulto: la vena porta lleva sangre venosa del intestino, bazo y páncreas al hígado antes de drenar a la cava inferior. Los sinusoides hepáticos permiten que los hepatocitos procesen nutrientes y toxinas absorbidos.',
            datos: [
                { l: 'Confluencia', v: 'V. mesentér.+espl.' },
                { l: 'Flujo', v: '~1 L/min' },
                { l: 'Presión normal', v: '5-10 mmHg' },
                { l: 'Hipertensión', v: '>10 mmHg (cirrosis)' }
            ]
        },
        {
            name: 'Circulación Fetal',
            region: 'Feto — Estructuras Transitorias',
            desc: 'El feto posee derivaciones únicas: el conducto arterioso (aorta↔pulmonar, evita pulmones), el foramen oval (AD→AI, bypasea pulmones) y el conducto venoso (umbilical→cava inferior). Todas se cierran tras el nacimiento al iniciar la respiración.',
            datos: [
                { l: 'Conducto arter.', v: 'Aorta↔Pulmonar' },
                { l: 'Foramen oval', v: 'AD → AI' },
                { l: 'Vena umbilical', v: 'O₂ desde placenta' },
                { l: 'Cierre', v: 'Horas-días postn.' }
            ]
        },
        {
            name: 'Sistema Linfático',
            region: 'Paralelo al Venoso — Difuso',
            desc: 'Red de vasos que drena líquido intersticial (linfa) de vuelta a la circulación venosa. Los ganglios linfáticos filtran patógenos. El conducto torácico drena ~75% de la linfa al ángulo venoso izquierdo. También transporta quilomicrones (grasas) desde el intestino.',
            datos: [
                { l: 'Volumen linfa', v: '~2-3 L/día' },
                { l: 'Ganglios', v: '~600-700' },
                { l: 'Conducto mayor', v: 'Torácico (izq.)' },
                { l: 'Transporte', v: 'Linfa + grasas' }
            ]
        },
        {
            name: 'Aorta y sus Ramas',
            region: 'Desde Ventrículo Izquierdo',
            desc: 'Mayor arteria del cuerpo. Nace del VI, asciende (aorta ascendente → coronarias), forma el cayado (tronco braquiocefálico, carótida izquierda, subclavia izquierda), desciende por tórax y abdomen dando ramas viscerales y parietales, y se bifurca en ilíacas.',
            datos: [
                { l: 'Diámetro raíz', v: '~3 cm' },
                { l: 'Cayado — ramas', v: '3 principales' },
                { l: 'Bifurcación', v: 'Ilíacas (L4)' },
                { l: 'Presión pico', v: '~120 mmHg' }
            ]
        },
        {
            name: 'Sistema Venoso Profundo vs Superficial',
            region: 'Miembros Inferiores',
            desc: 'El sistema profundo (femoral, poplítea, tibiales) transporta ~90% del retorno venoso. El superficial (safena magna y menor) drena al profundo por venas perforantes. Las válvulas incompetentes causan reflujo e insuficiencia venosa crónica (varices).',
            datos: [
                { l: 'Profundo', v: '~90% retorno' },
                { l: 'Safena magna', v: 'Más larga del cuerpo' },
                { l: 'Perforantes', v: 'Conectan sist.' },
                { l: 'Patología', v: 'Varices, TVP' }
            ]
        },
        {
            name: 'Microcirculación',
            region: 'Arteriolas — Capilares — Vénulas',
            desc: 'Red terminal donde ocurre el intercambio gaseoso y de nutrientes. Las arteriolas regulan la resistencia vascular. Los esfínteres precapilares controlan el flujo a lechos capilares individuales. La presión hidrostática capilar (~32 mmHg arteriolar, ~15 mmHg venular) rige la filtración.',
            datos: [
                { l: 'Capilares Ø', v: '5-10 μm' },
                { l: 'Superficie total', v: '~6000 m²' },
                { l: 'P. hidrostática', v: '15-32 mmHg' },
                { l: 'Intercambio', v: 'Difusión + filtr.' }
            ]
        }
    ]
};

console.log('✅ Circulatory Data: Anatomía cargada');