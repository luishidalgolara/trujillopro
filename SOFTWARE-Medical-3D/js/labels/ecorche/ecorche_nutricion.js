/**
 * ═══════════════════════════════════════════════════
 *  ÉCORCHÉ — Nutrición Muscular
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__ECORCHE_DATA = window.__ECORCHE_DATA || {};

window.__ECORCHE_DATA.nutricion = {
    title: 'Nutrición Muscular',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Proteína y Síntesis Muscular',
            region: 'Ribosomas — Miofibrillas',
            desc: 'La síntesis proteica muscular (MPS) requiere aminoácidos esenciales, especialmente leucina (~2.5 g) como activador clave de la vía mTOR. La ingesta óptima es 1.6-2.2 g/kg/día distribuida en 4-5 comidas con 20-40 g de proteína de alta calidad cada una. El umbral leucínico activa la señalización anabólica muscular.',
            datos: [
                { l: 'Dosis óptima', v: '1.6-2.2 g/kg/día' },
                { l: 'Por comida', v: '20-40 g' },
                { l: 'Leucina umbral', v: '~2.5 g/comida' },
                { l: 'Vía anabólica', v: 'mTOR/p70S6K' }
            ]
        },
        {
            name: 'Creatina Fosfato',
            region: 'Sarcoplasma — Sistema Fosfágeno',
            desc: 'La creatina fosforilada regenera ATP instantáneamente durante esfuerzos de alta intensidad (<10 seg) vía creatina quinasa. La suplementación con monohidrato de creatina (3-5 g/día) aumenta las reservas intramusculares un 20-40%, mejorando fuerza, potencia y recuperación. Es el suplemento deportivo con mayor evidencia científica.',
            datos: [
                { l: 'Dosis mantenim.', v: '3-5 g/día' },
                { l: '↑ Reservas', v: '20-40%' },
                { l: 'Vía energética', v: 'ATP-PCr (<10 seg)' },
                { l: 'Evidencia', v: 'Nivel A (máxima)' }
            ]
        },
        {
            name: 'Glucógeno Muscular',
            region: 'Sarcoplasma — Reserva Energética',
            desc: 'Principal combustible para ejercicio moderado-intenso. Cada músculo almacena ~80-120 mmol/kg de glucógeno (~400 g total corporal, ~1600 kcal). La supercompensación con dieta alta en carbohidratos (8-12 g/kg) aumenta reservas un 150%. Su depleción causa fatiga periférica y "hitting the wall" en deportes de resistencia.',
            datos: [
                { l: 'Reserva muscular', v: '~400 g total' },
                { l: 'Energía', v: '~1600 kcal' },
                { l: 'Recarga óptima', v: '8-12 g CHO/kg/día' },
                { l: 'Depleción', v: '"Hitting the wall"' }
            ]
        },
        {
            name: 'Vitamina D y Función Muscular',
            region: 'Receptor Nuclear VDR — Fibras Tipo II',
            desc: 'El receptor de vitamina D (VDR) se expresa en el músculo esquelético y regula la síntesis proteica, el metabolismo del calcio intracelular y la diferenciación de fibras tipo II (rápidas). Déficit de vitamina D (<20 ng/mL) se asocia a miopatía proximal, sarcopenia acelerada y mayor riesgo de caídas en ancianos.',
            datos: [
                { l: 'Nivel óptimo', v: '30-50 ng/mL' },
                { l: 'Déficit', v: '<20 ng/mL' },
                { l: 'Dosis sugerida', v: '1000-4000 UI/día' },
                { l: 'Efecto muscular', v: 'Fibras tipo II' }
            ]
        },
        {
            name: 'Magnesio',
            region: 'Sarcoplasma — ATPasa — Unión Neuromuscular',
            desc: 'Cofactor esencial en >300 reacciones enzimáticas incluyendo todas las reacciones dependientes de ATP. Crítico para la bomba Ca²⁺-ATPasa del retículo sarcoplásmico (relajación muscular) y la transmisión neuromuscular. El déficit causa calambres, fasciculaciones, debilidad y arritmias. El 60% del magnesio corporal está en el hueso.',
            datos: [
                { l: 'Requerimiento', v: '310-420 mg/día' },
                { l: 'Sérico normal', v: '1.7-2.2 mg/dL' },
                { l: 'En hueso', v: '60% corporal' },
                { l: 'Déficit', v: 'Calambres/fascicul.' }
            ]
        },
        {
            name: 'Omega-3 y Músculo',
            region: 'Membrana Sarcolémica — Inflamación',
            desc: 'Los ácidos grasos omega-3 (EPA y DHA) se incorporan a las membranas del sarcolema mejorando la señalización de insulina y la activación de mTOR. Reducen la inflamación post-ejercicio (↓ IL-6, TNF-α), atenúan el dolor muscular tardío (DOMS) y en ancianos pueden potenciar la respuesta anabólica al ejercicio y la nutrición.',
            datos: [
                { l: 'Dosis sugerida', v: '2-3 g EPA+DHA/día' },
                { l: 'Efecto membrana', v: '↑ Señalización insulina' },
                { l: '↓ Inflamación', v: 'IL-6, TNF-α' },
                { l: 'Fuentes', v: 'Salmón, sardinas' }
            ]
        },
        {
            name: 'Hierro y Mioglobina',
            region: 'Sarcoplasma — Transporte O₂',
            desc: 'El hierro es el átomo central de la mioglobina muscular (reserva de O₂ intramuscular) y de los citocromos de la cadena respiratoria mitocondrial. La anemia ferropénica reduce la capacidad aeróbica muscular independientemente de la hemoglobina. Los atletas pierden hierro por hemólisis mecánica, sudor y microhemorragias GI.',
            datos: [
                { l: 'Ferritina óptima', v: '>30 ng/mL' },
                { l: 'Función', v: 'Mioglobina + citocromos' },
                { l: 'Atletas necesitan', v: '70% más que sedent.' },
                { l: 'Pérdidas deportivas', v: 'Hemólisis + sudor + GI' }
            ]
        }
    ]
};

console.log('✅ Écorché Data: Nutrición cargada');
