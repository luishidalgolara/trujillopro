/**
 * ═══════════════════════════════════════════════════
 *  EYE — Nutrición Visual
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__EYE_DATA = window.__EYE_DATA || {};

window.__EYE_DATA.nutricion = {
    title: 'Nutrición Visual',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Luteína y Zeaxantina',
            region: 'Mácula — Pigmento Macular',
            desc: 'Carotenoides xantófilos que se concentran en la mácula formando el pigmento macular. Actúan como filtro de luz azul de alta energía y como antioxidantes locales. El estudio AREDS2 demostró que 10 mg de luteína + 2 mg de zeaxantina diarios reducen el riesgo de progresión de DMAE.',
            datos: [
                { l: 'Dosis AREDS2', v: '10+2 mg/día' },
                { l: 'Fuente top', v: 'Espinaca, col rizada' },
                { l: 'Función', v: 'Filtro luz azul' },
                { l: 'Reducción DMAE', v: '~25% progresión' }
            ]
        },
        {
            name: 'Vitamina A (Retinol)',
            region: 'Fotorreceptores — Rodopsina',
            desc: 'Precursor del retinal, cromóforo esencial de la rodopsina en los bastones. Su deficiencia causa ceguera nocturna (nictalopía) y, en casos severos, xeroftalmia con queratomalacia. La forma activa (11-cis-retinal) inicia la fototransducción al absorber un fotón.',
            datos: [
                { l: 'Dosis diaria', v: '700-900 μg RAE' },
                { l: 'Fuente animal', v: 'Hígado, huevo' },
                { l: 'Fuente vegetal', v: 'Zanahoria (β-car.)' },
                { l: 'Déficit', v: 'Nictalopía' }
            ]
        },
        {
            name: 'Omega-3 y Película Lagrimal',
            region: 'Glándulas Meibomianas — Superficie',
            desc: 'Los ácidos grasos omega-3 (EPA y DHA) mejoran la calidad de la capa lipídica de la película lagrimal secretada por las glándulas meibomianas. Reducen la inflamación de la superficie ocular y mejoran síntomas de ojo seco evaporativo. También presentes en las membranas de fotorreceptores.',
            datos: [
                { l: 'Dosis sugerida', v: '1-2 g EPA+DHA/d' },
                { l: 'Fuente', v: 'Pescado graso' },
                { l: 'Efecto', v: '↑ Capa lipídica' },
                { l: 'Beneficio', v: '↓ Ojo seco' }
            ]
        },
        {
            name: 'Zinc',
            region: 'Retina — EPR — Coroides',
            desc: 'Mineral esencial altamente concentrado en retina y epitelio pigmentario retiniano (EPR). Cofactor de la enzima retinol deshidrogenasa que convierte retinol en retinal. El estudio AREDS demostró que la suplementación con zinc reduce la progresión de DMAE avanzada en un 25%.',
            datos: [
                { l: 'Dosis AREDS', v: '80 mg/día' },
                { l: 'Concentración', v: 'Alta en retina/EPR' },
                { l: 'Enzima', v: 'Retinol deshidrog.' },
                { l: 'Fuentes', v: 'Ostras, carne, nuez' }
            ]
        },
        {
            name: 'Vitamina C (Ácido Ascórbico)',
            region: 'Humor Acuoso — Cristalino',
            desc: 'El humor acuoso contiene una concentración de vitamina C 20-30 veces mayor que la plasmática. Protege al cristalino del daño oxidativo por radiación UV, retrasando la formación de cataratas. También es esencial para la síntesis de colágeno del estroma corneal.',
            datos: [
                { l: 'En humor acuoso', v: '20-30× plasma' },
                { l: 'Dosis diaria', v: '75-90 mg' },
                { l: 'Protege', v: 'Cristalino (UV)' },
                { l: 'Fuentes', v: 'Cítricos, kiwi' }
            ]
        },
        {
            name: 'Vitamina E (α-Tocoferol)',
            region: 'Membranas Fotorreceptoras',
            desc: 'Antioxidante liposoluble que protege los ácidos grasos poliinsaturados (DHA) de las membranas de los discos de los fotorreceptores contra la peroxidación lipídica. Actúa sinérgicamente con vitamina C y carotenoides. Incluida en la fórmula AREDS para prevención de DMAE.',
            datos: [
                { l: 'Dosis AREDS', v: '400 UI/día' },
                { l: 'Función', v: '↓ Peroxidación' },
                { l: 'Sinergia', v: 'Vit C + Luteína' },
                { l: 'Fuentes', v: 'Almendras, girasol' }
            ]
        },
        {
            name: 'Antocianinas',
            region: 'Microcirculación Retiniana',
            desc: 'Pigmentos flavonoides presentes en arándanos, moras y uvas oscuras. Mejoran la microcirculación retiniana al fortalecer las paredes capilares y reducir la permeabilidad vascular. Aceleran la regeneración de rodopsina, mejorando la adaptación a la oscuridad.',
            datos: [
                { l: 'Fuente top', v: 'Arándano, mora' },
                { l: 'Efecto vascular', v: '↑ Microcirculac.' },
                { l: 'Rodopsina', v: '↑ Regeneración' },
                { l: 'Dosis sugerida', v: '~80-160 mg/día' }
            ]
        }
    ]
};

console.log('✅ Eye Data: Nutrición cargada');
