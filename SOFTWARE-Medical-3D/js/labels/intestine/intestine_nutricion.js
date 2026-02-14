/**
 * ═══════════════════════════════════════════════════
 *  INTESTINE — Nutrición y Microbiota
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__INTESTINE_DATA = window.__INTESTINE_DATA || {};

window.__INTESTINE_DATA.nutricion = {
    title: 'Nutrición y Microbiota',
    icon: '🥗',
    color: '#4ade80',
    items: [
        {
            name: 'Fibra Dietética',
            region: 'Sustrato de Fermentación — Colon',
            desc: 'Carbohidratos complejos no digeribles por enzimas humanas. Soluble (pectinas, inulina, β-glucanos): fermentable, forma gel, reduce colesterol. Insoluble (celulosa, lignina): aumenta volumen fecal, acelera tránsito. Recomendación: 25-35 g/día. Beneficios: previene estreñimiento, diverticulosis, reduce riesgo cáncer colorrectal 10% por cada 10 g/día.',
            datos: [
                { l: 'Dosis diaria', v: '25-35 g' },
                { l: 'Soluble', v: 'Fermentable' },
                { l: 'Insoluble', v: '↑ Volumen fecal' },
                { l: '↓ Cáncer CR', v: '10% / 10g' }
            ]
        },
        {
            name: 'Ácidos Grasos de Cadena Corta (AGCC)',
            region: 'Producto Fermentación — Energía Colonocitos',
            desc: 'Productos de fermentación bacteriana de fibra: acetato (C2), propionato (C3), butirato (C4). Concentración colónica: 50-150 mM. El butirato es la principal fuente energética de colonocitos (70-90% de su ATP), regula proliferación celular, tiene efectos antiinflamatorios y anticancerígenos. Déficit de butirato → colitis.',
            datos: [
                { l: 'Concentración', v: '50-150 mM' },
                { l: 'Butirato', v: '70-90% energía' },
                { l: 'Acetato', v: 'Más abundante' },
                { l: 'Efecto', v: 'Antiinflamatorio' }
            ]
        },
        {
            name: 'Probióticos',
            region: 'Microorganismos Vivos — Salud Intestinal',
            desc: 'Microorganismos vivos que confieren beneficio cuando se administran en cantidad adecuada. Cepas más estudiadas: Lactobacillus, Bifidobacterium, Saccharomyces boulardii. Dosis efectiva: ≥10⁹ UFC/día. Beneficios: restauran microbiota post-antibióticos, reducen diarrea asociada a antibióticos (30-50%), alivian SII, previenen colitis ulcerosa.',
            datos: [
                { l: 'Dosis mínima', v: '≥10⁹ UFC/día' },
                { l: 'Cepas comunes', v: 'Lactobacillus + Bifido' },
                { l: '↓ Diarrea ATB', v: '30-50%' },
                { l: 'Beneficio SII', v: 'Moderado' }
            ]
        },
        {
            name: 'Prebióticos',
            region: 'Sustrato Selectivo — Bacterias Beneficiosas',
            desc: 'Compuestos no digeribles (principalmente oligosacáridos) que estimulan crecimiento/actividad de bacterias beneficiosas (Bifidobacterium, Lactobacillus). Ejemplos: inulina, fructooligosacáridos (FOS), galactooligosacáridos (GOS). Fuentes: alcachofa, espárragos, plátano, ajo, cebolla. Dosis: 5-10 g/día. Efecto: aumentan producción de AGCC.',
            datos: [
                { l: 'Dosis efectiva', v: '5-10 g/día' },
                { l: 'Tipo común', v: 'Inulina, FOS' },
                { l: 'Estimula', v: 'Bifidobacterias' },
                { l: 'Fuente natural', v: 'Alcachofa' }
            ]
        },
        {
            name: 'Polifenoles',
            region: 'Antioxidantes — Moduladores Microbiota',
            desc: 'Compuestos fenólicos de plantas con propiedades antioxidantes y antiinflamatorias. Solo 5-10% se absorbe en intestino delgado, el resto es metabolizado por microbiota colónica generando metabolitos bioactivos. Ejemplos: resveratrol (uva), curcumina (cúrcuma), quercetina (cebolla). Efecto: modulan microbiota, reducen inflamación, protegen contra cáncer colorrectal.',
            datos: [
                { l: 'Absorción ID', v: '5-10%' },
                { l: 'Metabol. colónica', v: '90-95%' },
                { l: 'Resveratrol', v: 'Uva, vino tinto' },
                { l: 'Efecto', v: 'Antiinflamatorio' }
            ]
        },
        {
            name: 'Disbiosis Intestinal',
            region: 'Microbiota — Desequilibrio',
            desc: 'Alteración del equilibrio de la microbiota intestinal normal. Causas: antibióticos, dieta occidental (baja fibra, alta grasa/azúcar), estrés, infecciones. Consecuencias: reducción de diversidad bacteriana, aumento de patógenos oportunistas, disminución de AGCC, aumento permeabilidad intestinal ("leaky gut"). Asociado a SII, EII, obesidad, alergias.',
            datos: [
                { l: 'Diversidad normal', v: '>1000 especies' },
                { l: 'Causa #1', v: 'Antibióticos' },
                { l: 'Consecuencia', v: '↓ AGCC + inflam.' },
                { l: 'Asociado', v: 'SII, EII, obesidad' }
            ]
        },
        {
            name: 'Glutamina',
            region: 'Aminoácido — Enterocitos',
            desc: 'Aminoácido condicionalmente esencial, principal fuente energética de enterocitos (junto con butirato). Mantiene integridad de barrera intestinal, regula tight junctions, modula respuesta inmune. Necesidad aumenta en estrés, cirugía, enfermedad crítica. Suplementación (0.3-0.5 g/kg/día) en nutrición enteral reduce translocación bacteriana y previene atrofia mucosa.',
            datos: [
                { l: 'Energía enteroc.', v: 'Principal + butirato' },
                { l: 'Suplementación', v: '0.3-0.5 g/kg/día' },
                { l: 'Efecto', v: 'Integridad barrera' },
                { l: 'Indicación', v: 'Estrés, cirugía' }
            ]
        },
        {
            name: 'Microbiota Normal',
            region: 'Colon — Ecosistema Bacteriano',
            desc: 'El colon alberga ~10¹⁴ bacterias (10× más que células humanas), representando 1-2 kg de peso corporal. Filos dominantes: Firmicutes (60-80%) y Bacteroides (20-40%). Funciones: fermentación de fibra, síntesis de vitaminas (K, B), entrenamiento sistema inmune, efecto barrera contra patógenos. La diversidad bacteriana es marcador de salud intestinal.',
            datos: [
                { l: 'Bacterias totales', v: '~10¹⁴' },
                { l: 'Peso', v: '1-2 kg' },
                { l: 'Especies', v: '>1000' },
                { l: 'Ratio F/B', v: 'Marcador salud' }
            ]
        }
    ]
};

console.log('✅ Intestine Data: Nutrición cargada');
