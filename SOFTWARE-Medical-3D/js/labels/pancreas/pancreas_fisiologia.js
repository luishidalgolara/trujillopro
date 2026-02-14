/**
 * ═══════════════════════════════════════════════════
 *  PÁNCREAS — Fisiología Pancreática
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__PANCREAS_DATA = window.__PANCREAS_DATA || {};

window.__PANCREAS_DATA.fisiologia = {
    title: 'Fisiología Pancreática',
    icon: '⚡',
    color: '#88cc88',
    items: [
        {
            name: 'Secreción de Jugo Pancreático',
            region: 'Función Exocrina — Acinos y Conductos',
            desc: 'El páncreas secreta 1.5-2.5 L/día de jugo pancreático alcalino (pH 8.0-8.3). Fase cefálica (20%): vía vagal por anticipación. Fase gástrica (10%): distensión gástrica. Fase intestinal (70%): secretina (estimula HCO₃⁻) y CCK (estimula enzimas) liberadas por células S y I duodenales.',
            datos: [
                { l: 'Volumen/día', v: '1.5-2.5 L' },
                { l: 'pH', v: '8.0-8.3' },
                { l: 'Fase intestinal', v: '70% secreción' },
                { l: 'Hormonas', v: 'Secretina + CCK' }
            ]
        },
        {
            name: 'Enzimas Proteolíticas',
            region: 'Digestión de Proteínas',
            desc: 'Secretadas como zimógenos inactivos. Tripsinógeno → tripsina (activado por enteropeptidasa duodenal). Tripsina activa quimotripsinógeno, proelastasa, procarboxipeptidasas A y B. Tripsina degrada proteínas en enlaces lisina/arginina. Quimotripsina en fenilalanina/tirosina/triptófano. Elastasa en enlaces no polares.',
            datos: [
                { l: 'Tripsinógeno', v: '→ Tripsina' },
                { l: 'Activador', v: 'Enteropeptidasa' },
                { l: 'Quimotripsina', v: 'Aromáticos' },
                { l: 'Elastasa', v: 'Enlaces no polar' }
            ]
        },
        {
            name: 'Lipasa Pancreática',
            region: 'Digestión de Lípidos',
            desc: 'Enzima clave para hidrólisis de triglicéridos en posiciones 1 y 3, liberando 2 ácidos grasos libres y 1 monoglicérido. Requiere colipasa (cofactor pancreático) para anclarse a gotículas lipídicas emulsionadas por sales biliares. Responsable del 50% de digestión lipídica (lipasa gástrica 30%, esterasa carboxílica 20%).',
            datos: [
                { l: 'Sustrato', v: 'Triglicéridos' },
                { l: 'Productos', v: '2 AG + monoglicérido' },
                { l: 'Cofactor', v: 'Colipasa' },
                { l: 'Contribución', v: '~50% digestión' }
            ]
        },
        {
            name: 'Amilasa Pancreática',
            region: 'Digestión de Carbohidratos',
            desc: 'α-amilasa (isoenzima pancreática) hidroliza enlaces α-1,4-glucosídicos del almidón y glucógeno, produciendo maltosa, maltotriosa y dextrinas límite (ramificaciones α-1,6). No digiere celulosa (β enlaces). Tiene pH óptimo 7.0. Amilasa sérica es marcador diagnóstico de pancreatitis aguda (>3× normal).',
            datos: [
                { l: 'Tipo', v: 'α-amilasa' },
                { l: 'Enlaces', v: 'α-1,4 glucosídicos' },
                { l: 'Productos', v: 'Maltosa, dextrinas' },
                { l: 'Diagnóstico', v: 'Pancreatitis (>3×)' }
            ]
        },
        {
            name: 'Secreción de Insulina',
            region: 'Función Endocrina — Células β',
            desc: 'Células β detectan glucosa vía GLUT2 (transportador) → metabolismo → ↑ATP → cierre canales K-ATP → despolarización → apertura canales Ca²⁺ → exocitosis de gránulos de insulina. Secreción bifásica: 1ª fase (1-5 min, liberación inmediata), 2ª fase (sostenida). Efecto: captación glucosa muscular/adiposa, glucogénesis hepática.',
            datos: [
                { l: 'Sensor', v: 'GLUT2' },
                { l: 'Señal', v: 'ATP → K-ATP' },
                { l: 'Secreción', v: 'Bifásica' },
                { l: 'Efecto', v: '↓ Glucemia' }
            ]
        },
        {
            name: 'Secreción de Glucagón',
            region: 'Función Endocrina — Células α',
            desc: 'Células α secretan glucagón en respuesta a hipoglucemia (<70 mg/dL), ejercicio intenso y estrés. Mecanismo opuesto a insulina: hipoglucemia → despolarización células α → liberación glucagón. Efectos: glucogenólisis y gluconeogénesis hepática, lipólisis, cetogénesis. Relación insulina/glucagón determina metabolismo.',
            datos: [
                { l: 'Estímulo', v: 'Hipoglucemia <70' },
                { l: 'Efecto hígado', v: 'Glucogenólisis' },
                { l: 'Efecto adiposo', v: 'Lipólisis' },
                { l: 'Balance', v: 'Ratio insulina/glucag' }
            ]
        },
        {
            name: 'Bicarbonato y pH Duodenal',
            region: 'Células Ductales — Neutralización',
            desc: 'Células ductales y centroacinares secretan HCO₃⁻ (concentración 120-140 mEq/L) en respuesta a secretina. Mecanismo: anhidrasa carbónica convierte CO₂+H₂O → H₂CO₃ → HCO₃⁻+H⁺. Intercambiador Cl⁻/HCO₃⁻ (CFTR dependiente) secreta HCO₃⁻ al lumen. Neutraliza HCl gástrico, llevando pH duodenal de 2 a 7-8.',
            datos: [
                { l: 'HCO₃⁻', v: '120-140 mEq/L' },
                { l: 'Hormona', v: 'Secretina' },
                { l: 'Canal', v: 'CFTR (Cl⁻/HCO₃⁻)' },
                { l: 'pH duodenal', v: '2 → 7-8' }
            ]
        },
        {
            name: 'Regulación por Somatostatina',
            region: 'Células δ — Inhibición Paracrina',
            desc: 'Somatostatina (SS-14 y SS-28) de células δ inhibe tanto secreción exocrina (enzimas) como endocrina (insulina, glucagón). Acción paracrina local sobre células vecinas. Liberada por hiperglucemia, aminoácidos y CCK. Efecto: prolonga absorción intestinal, previene hipoglucemia posprandial. Análogos (octreótide) tratan tumores neuroendocrinos.',
            datos: [
                { l: 'Formas', v: 'SS-14, SS-28' },
                { l: 'Acción', v: 'Inhibición paracrina' },
                { l: 'Inhibe', v: 'Insulina + glucagón' },
                { l: 'Terapéutico', v: 'Octreótide' }
            ]
        }
    ]
};

console.log('✅ Páncreas Data: Fisiología cargada');
