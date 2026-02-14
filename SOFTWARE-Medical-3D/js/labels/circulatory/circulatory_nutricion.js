/**
 * ═══════════════════════════════════════════════════
 *  CIRCULATORY — Nutrición Cardiovascular
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__CIRC_DATA = window.__CIRC_DATA || {};

window.__CIRC_DATA.nutricion = {
    title: 'Nutrición Cardiovascular',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Omega-3 (EPA / DHA)',
            region: 'Triglicéridos — Endotelio Vascular',
            desc: 'Los ácidos grasos EPA y DHA reducen triglicéridos plasmáticos hasta un 30%, disminuyen la agregación plaquetaria y tienen efecto antiinflamatorio endotelial. Mejoran la variabilidad de la frecuencia cardíaca. Fuentes: pescados grasos, aceite de krill.',
            datos: [
                { l: 'Dosis cardio', v: '1-4 g/día' },
                { l: '↓ Triglicéridos', v: 'Hasta 30%' },
                { l: 'Fuente top', v: 'Salmón/Caballa' },
                { l: 'Efecto', v: 'Antiinflamat.' }
            ]
        },
        {
            name: 'Potasio y Presión Arterial',
            region: 'Músculo Liso Vascular — Riñón',
            desc: 'El potasio promueve vasodilatación al hiperpolarizar el músculo liso vascular. Contrarresta el efecto hipertensivo del sodio aumentando su excreción renal (natriuresis). Una ingesta adecuada reduce el riesgo de ACV en ~20%.',
            datos: [
                { l: 'Ingesta recom.', v: '3500-4700 mg/d' },
                { l: '↓ Riesgo ACV', v: '~20%' },
                { l: 'Fuentes', v: 'Plátano, espinaca' },
                { l: 'Mecanismo', v: 'Natriuresis' }
            ]
        },
        {
            name: 'Nitratos Naturales y Óxido Nítrico',
            region: 'Endotelio Vascular — Músculo Liso',
            desc: 'Los nitratos de remolacha, rúcula y espinacas se convierten en óxido nítrico (NO) vía bacterias orales y nitrito reductasas. El NO relaja el músculo liso vascular, reduce la presión arterial ~3-5 mmHg y mejora la eficiencia del ejercicio.',
            datos: [
                { l: 'Fuente top', v: 'Jugo remolacha' },
                { l: '↓ PAS', v: '~3-5 mmHg' },
                { l: 'Molécula', v: 'Óxido nítrico' },
                { l: 'Vía', v: 'Nitrato→Nitrito→NO' }
            ]
        },
        {
            name: 'Fibra Soluble y Colesterol',
            region: 'Intestino — Circulación Enterohepática',
            desc: 'La fibra soluble (β-glucano de avena, psyllium) atrapa ácidos biliares en el intestino, forzando al hígado a usar colesterol plasmático para sintetizar más. Reduce LDL-c entre 5-10%. La FDA reconoce 3g/día de β-glucano como cardiosaludable.',
            datos: [
                { l: 'Dosis efectiva', v: '≥3 g/día β-gluc.' },
                { l: '↓ LDL', v: '5-10%' },
                { l: 'Fuente top', v: 'Avena, psyllium' },
                { l: 'Mecanismo', v: 'Secuestro biliar' }
            ]
        },
        {
            name: 'Sodio y Retención Hídrica',
            region: 'Riñón — SRAA — Volemia',
            desc: 'El exceso de sodio activa el sistema renina-angiotensina-aldosterona (SRAA), reteniendo agua y expandiendo el volumen plasmático. Aumenta la presión arterial y la postcarga cardíaca. La reducción a <2 g/día de sodio disminuye PAS ~5 mmHg.',
            datos: [
                { l: 'Recomendado', v: '<2 g Na/día' },
                { l: 'Consumo promedio', v: '~3.4 g Na/día' },
                { l: '↓ PAS', v: '~5 mmHg' },
                { l: 'Sistema', v: 'SRAA activado' }
            ]
        },
        {
            name: 'Polifenoles Cardiovasculares',
            region: 'Endotelio — Función Vascular',
            desc: 'Los flavonoides (cacao, uva, té verde) y el resveratrol mejoran la función endotelial aumentando la biodisponibilidad de óxido nítrico. Reducen la oxidación de LDL y la adhesión de monocitos al endotelio. El cacao >70% mejora la vasodilatación mediada por flujo.',
            datos: [
                { l: 'Fuentes', v: 'Cacao, uva, té' },
                { l: 'Efecto', v: '↑ NO endotelial' },
                { l: 'LDL', v: '↓ Oxidación' },
                { l: 'Dosis cacao', v: '≥30 g/día >70%' }
            ]
        },
        {
            name: 'Coenzima Q10 (Ubiquinona)',
            region: 'Mitocondrias Cardiomiocitos',
            desc: 'Cofactor esencial en la cadena de transporte de electrones mitocondrial. El músculo cardíaco tiene la mayor concentración de CoQ10. Sus niveles bajan con la edad y con estatinas. Suplementación mejora síntomas en IC y reduce estrés oxidativo miocárdico.',
            datos: [
                { l: 'Dosis supl.', v: '100-300 mg/d' },
                { l: 'Órgano máximo', v: 'Corazón' },
                { l: 'Déficit por', v: 'Estatinas, edad' },
                { l: 'Función', v: 'Cadena electr.' }
            ]
        }
    ]
};

console.log('✅ Circulatory Data: Nutrición cargada');