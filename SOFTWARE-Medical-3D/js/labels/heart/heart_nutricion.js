/**
 * ═══════════════════════════════════════════════════
 *  HEART — Nutrición Cardioprotectora
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__HEART_DATA = window.__HEART_DATA || {};

window.__HEART_DATA.nutricion = {
    title: 'Nutrición Cardioprotectora',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Coenzima Q10 (Ubiquinona)',
            region: 'Mitocondrias — Cardiomiocitos',
            desc: 'El miocardio tiene la mayor concentración de CoQ10 del organismo por su alta demanda energética. Es cofactor esencial en la cadena de transporte de electrones (complejos I-III). Las estatinas inhiben su síntesis endógena. El estudio Q-SYMBIO mostró reducción del 43% en mortalidad cardiovascular con suplementación en IC.',
            datos: [
                { l: 'Dosis IC', v: '100-300 mg/d' },
                { l: 'Q-SYMBIO', v: '↓43% mortalidad' },
                { l: 'Depleción por', v: 'Estatinas' },
                { l: 'Función', v: 'Cadena electr.' }
            ]
        },
        {
            name: 'Magnesio Cardíaco',
            region: 'Cardiomiocitos — Canales Iónicos',
            desc: 'Cofactor de la Na⁺/K⁺-ATPasa y regulador de canales de calcio en cardiomiocitos. La hipomagnesemia prolonga el QT y predispone a arritmias (torsades de pointes). El magnesio IV es tratamiento de primera línea para torsades de pointes y eclampsia.',
            datos: [
                { l: 'Nivel sérico norm.', v: '1.7-2.2 mg/dL' },
                { l: 'Déficit → arritmia', v: 'Torsades' },
                { l: 'Tx torsades', v: 'MgSO₄ IV 2g' },
                { l: 'Ingesta diaria', v: '310-420 mg' }
            ]
        },
        {
            name: 'Potasio y Arritmias',
            region: 'Cardiomiocitos — Repolarización',
            desc: 'El potasio es determinante del potencial de reposo de membrana (-90 mV) en cardiomiocitos. La hipopotasemia (<3.5 mEq/L) aumenta automaticidad, prolonga repolarización y predispone a fibrilación ventricular. La hiperpotasemia (>5.5 mEq/L) deprime conducción y puede causar asistolia.',
            datos: [
                { l: 'Normal sérico', v: '3.5-5.0 mEq/L' },
                { l: 'Hipopotasemia', v: '<3.5 → Arritmias' },
                { l: 'Hiperpotasemia', v: '>5.5 → Bradiarritmia' },
                { l: 'Fuentes', v: 'Plátano, espinaca' }
            ]
        },
        {
            name: 'Omega-3 Antiarrítmico',
            region: 'Membrana Cardiomiocitos',
            desc: 'EPA y DHA se incorporan a las membranas de cardiomiocitos, estabilizando canales de sodio y calcio. Reducen la susceptibilidad a arritmias ventriculares post-infarto. A dosis farmacológicas (4 g/d) reducen triglicéridos 25-30%. El estudio REDUCE-IT mostró reducción del 25% en eventos CV con icosapent etilo.',
            datos: [
                { l: 'Dosis antiTG', v: '4 g/d EPA+DHA' },
                { l: 'REDUCE-IT', v: '↓25% eventos CV' },
                { l: '↓ Triglicéridos', v: '25-30%' },
                { l: 'Mecanismo', v: 'Estabiliz. canal' }
            ]
        },
        {
            name: 'Nitratos Naturales (Óxido Nítrico)',
            region: 'Endotelio Coronario — Músculo Liso',
            desc: 'Los nitratos dietéticos (remolacha, rúcula) se convierten en óxido nítrico (NO) que relaja el músculo liso de las arterias coronarias, mejorando el flujo coronario. El NO endotelial (vía eNOS) es antiaterosclerótico: inhibe adhesión plaquetaria, migración de monocitos y proliferación de músculo liso.',
            datos: [
                { l: 'Fuente top', v: 'Jugo remolacha' },
                { l: 'Enzima', v: 'eNOS endotelial' },
                { l: 'Efecto coron.', v: 'Vasodilatación' },
                { l: '↓ PAS', v: '~3-5 mmHg' }
            ]
        },
        {
            name: 'L-Carnitina',
            region: 'Mitocondrias — β-Oxidación',
            desc: 'Transporta ácidos grasos de cadena larga al interior mitocondrial para β-oxidación, la principal fuente de ATP del miocardio (60-70% del total). En IC y post-infarto, los niveles miocárdicos de carnitina están depletados. Meta-análisis muestran reducción del 27% de mortalidad total post-IAM.',
            datos: [
                { l: 'Dosis supl.', v: '2-3 g/d' },
                { l: '↓ Mortalidad IAM', v: '~27%' },
                { l: 'Función', v: 'Transporte AG' },
                { l: 'Fuentes', v: 'Carne roja, lácteos' }
            ]
        },
        {
            name: 'Sustancias Cardiotóxicas',
            region: 'Miocardio — Daño Directo',
            desc: 'El alcohol en exceso (>14 bebidas/semana) causa miocardiopatía alcohólica por daño directo a cardiomiocitos. La cocaína produce vasoespasmo coronario e infarto en jóvenes. El exceso de sodio (>2 g/d) aumenta volemia y postcarga. Las grasas trans promueven aterosclerosis e inflamación endotelial.',
            datos: [
                { l: 'Alcohol exceso', v: '>14 beb/semana' },
                { l: 'Cocaína', v: 'Vasoespasmo coron.' },
                { l: 'Sodio límite', v: '<2 g/día' },
                { l: 'Grasas trans', v: 'Proaterogénicas' }
            ]
        }
    ]
};

console.log('✅ Heart Data: Nutrición cargada');
