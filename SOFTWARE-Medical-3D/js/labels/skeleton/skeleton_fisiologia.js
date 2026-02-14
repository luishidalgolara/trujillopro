/**
 * ═══════════════════════════════════════════════════
 *  SKELETON SYSTEM — Fisiología Ósea
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__SKELETON_DATA = window.__SKELETON_DATA || {};

window.__SKELETON_DATA.fisiologia = {
    title: 'Fisiología Ósea',
    icon: '⚡',
    color: '#f59e0b',
    items: [
        {
            name: 'Osificación Intramembranosa',
            region: 'Formación Ósea Directa',
            desc: 'Formación de hueso directamente desde mesénquima sin cartílago previo. Ocurre en huesos planos del cráneo, mandíbula, clavícula. Etapas: 1) Células mesenquimales se condensan y diferencian a osteoblastos. 2) Osteoblastos secretan osteoide (matriz orgánica). 3) Mineralización de osteoide forma trabéculas. 4) Tejido conectivo periférico forma periostio. 5) Superficie externa compacta, interior esponjoso. Fontanelas craneales se osifican hacia 2 años.',
            datos: [
                { l: 'Huesos', v: 'Cráneo, clavícula' },
                { l: 'Origen', v: 'Mesénquima directa' },
                { l: 'Sin cartílago', v: 'Directa a hueso' },
                { l: 'Fontanelas', v: 'Cierran ~2 años' }
            ]
        },
        {
            name: 'Osificación Endocondral',
            region: 'Formación Ósea desde Cartílago',
            desc: 'Formación de hueso reemplazando molde cartilaginoso. Mayoría de huesos del esqueleto. Etapas: 1) Molde cartílago hialino. 2) Collar óseo perióstico en diáfisis. 3) Calcificación cartílago central, muerte condrocitos. 4) Centro primario de osificación en diáfisis (semana 8 fetal). 5) Centros secundarios en epífisis (postnatal). 6) Cartílago de crecimiento (placa epifisaria) entre diáfisis-epífisis: zona proliferación, hipertrofia, calcificación. Cierre epifisario: mujeres 18 años, hombres 21 años.',
            datos: [
                { l: 'Huesos', v: 'Mayoría (largos)' },
                { l: 'Origen', v: 'Molde cartilaginoso' },
                { l: 'Centro primario', v: 'Semana 8 fetal' },
                { l: 'Cierre epifisario', v: '♀18a, ♂21a' }
            ]
        },
        {
            name: 'Remodelación Ósea',
            region: 'Renovación Continua — Acoplamiento',
            desc: 'Proceso continuo de resorción (osteoclastos) y formación (osteoblastos). Equilibrio entre ambos mantiene masa ósea. Unidad de remodelación básica (BMU): osteoclastos crean cavidad de resorción (2-4 semanas), osteoblastos rellenan con osteoide (3-4 meses), mineralización completa (6-12 meses). 10% esqueleto se remodela/año. Funciones: reparación microfracturas, adaptación a estrés mecánico (ley de Wolff), homeostasis calcio. Regulación: PTH, vitamina D, calcitonina, estrógenos, factores locales (RANK/RANKL/OPG).',
            datos: [
                { l: 'Renovación/año', v: '~10% esqueleto' },
                { l: 'Ciclo completo', v: '3-6 meses' },
                { l: 'Resorción', v: 'Osteoclastos 2-4 sem' },
                { l: 'Formación', v: 'Osteoblastos 3-4 mes' }
            ]
        },
        {
            name: 'Homeostasis del Calcio',
            region: 'Regulación Mineral — Reservorio',
            desc: 'Hueso contiene 99% del calcio corporal (~1000 g). Calcemia normal: 8.5-10.5 mg/dL (2.1-2.6 mmol/L). Hormona paratiroidea (PTH): ↑ calcemia estimulando resorción ósea (osteoclastos), reabsorción renal Ca²⁺, síntesis 1,25-(OH)₂-D₃ (calcitriol). Calcitonina: ↓ calcemia inhibiendo osteoclastos (efecto menor que PTH). Vitamina D₃ (calcitriol): ↑ absorción intestinal Ca²⁺, permite mineralización ósea. Hipocalcemia: tetania, convulsiones. Hipercalcemia: cálculos renales, arritmias.',
            datos: [
                { l: 'Ca en hueso', v: '99% (~1000 g)' },
                { l: 'Calcemia normal', v: '8.5-10.5 mg/dL' },
                { l: 'PTH', v: '↑ Calcemia' },
                { l: 'Calcitonina', v: '↓ Calcemia' }
            ]
        },
        {
            name: 'Ley de Wolff',
            region: 'Adaptación Mecánica — Remodelación',
            desc: 'El hueso se adapta a las cargas mecánicas impuestas. Estrés mecánico estimula osteocitos (mecanosensores) que liberan señales para aumentar formación ósea en zonas de carga. Inactividad o microgravedad: resorción supera formación, osteopenia. Ejercicio de carga: aumenta densidad mineral ósea (DMO). Trabéculas se orientan según líneas de estrés principales (máxima resistencia con mínimo material). Aplicación clínica: ejercicio esencial para prevenir osteoporosis.',
            datos: [
                { l: 'Principio', v: 'Forma sigue función' },
                { l: 'Mecanosensores', v: 'Osteocitos' },
                { l: 'Carga', v: '↑ Densidad ósea' },
                { l: 'Inactividad', v: '↓ Masa ósea' }
            ]
        },
        {
            name: 'Hematopoyesis',
            region: 'Producción Células Sanguíneas',
            desc: 'Médula ósea roja produce todas las células sanguíneas a partir de células madre hematopoyéticas (HSC). Eritropoyesis: 2×10⁶ eritrocitos/segundo, regulada por eritropoyetina (EPO, riñón). Leucopoyesis: neutrófilos (~10¹¹/día), linfocitos, monocitos. Trombopoyesis: plaquetas (~10¹¹/día) por fragmentación megacariocitos, regulada por trombopoyetina (TPO, hígado). Vida: eritrocitos 120 días, plaquetas 7-10 días, neutrófilos <24 h en sangre.',
            datos: [
                { l: 'Eritrocitos', v: '~2×10⁶/segundo' },
                { l: 'Plaquetas', v: '~10¹¹/día' },
                { l: 'Neutrófilos', v: '~10¹¹/día' },
                { l: 'Regulación', v: 'EPO, TPO, G-CSF' }
            ]
        },
        {
            name: 'Función Mecánica',
            region: 'Soporte — Protección — Movimiento',
            desc: 'Soporte: armazón rígido que mantiene forma corporal, soporta peso (esqueleto apendicular transmite fuerzas al suelo). Protección: cráneo (encéfalo), vértebras (médula espinal), costillas (corazón, pulmones), pelvis (órganos pélvicos). Movimiento: sistema de palancas donde músculos generan fuerzas. Tipos palanca: 1ª clase (atlas-axis), 2ª clase (elevación talón), 3ª clase (mayoría, flexión codo). Ventaja mecánica varía según punto inserción muscular.',
            datos: [
                { l: 'Funciones', v: 'Soporte + protección + movimiento' },
                { l: 'Palancas', v: '3 clases' },
                { l: 'Más común', v: '3ª clase' },
                { l: 'Resistencia', v: 'Compresión > tensión' }
            ]
        },
        {
            name: 'Almacenamiento Mineral',
            region: 'Reservorio Metabólico',
            desc: 'Hueso almacena minerales esenciales. Calcio: 99% corporal (~1000 g), intercambio continuo con plasma (0.5-1 g/día) mantiene calcemia. Fósforo: 85% corporal (~600 g), como fosfato en hidroxiapatita. Magnesio: 50-60% corporal, en cristales hidroxiapatita. Reserva alcalina: libera carbonato y fosfato para buffer pH sanguíneo. Metales traza: plomo, estroncio se depositan en hueso (toxicidad crónica). Liberación mineral: resorción osteoclástica o disolución fisicoquímica.',
            datos: [
                { l: 'Ca corporal', v: '99% en hueso' },
                { l: 'P corporal', v: '85% en hueso' },
                { l: 'Mg corporal', v: '50-60% en hueso' },
                { l: 'Intercambio Ca', v: '0.5-1 g/día' }
            ]
        }
    ]
};

console.log('✅ Skeleton Data: Fisiología cargada');
