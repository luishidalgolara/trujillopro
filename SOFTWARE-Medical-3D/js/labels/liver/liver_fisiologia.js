/**
 * ═══════════════════════════════════════════════════
 *  LIVER — Fisiología Hepática
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LIVER_DATA = window.__LIVER_DATA || {};

window.__LIVER_DATA.fisiologia = {
    title: 'Fisiología Hepática',
    icon: '⚡',
    color: '#f59e0b',
    items: [
        {
            name: 'Metabolismo de Carbohidratos',
            region: 'Gluconeogénesis — Glucogenólisis',
            desc: 'El hígado es central en homeostasis de glucosa. Almacena glucógeno (100-120 g, reserva para 12-18 h). Estado postprandial: capta glucosa y sintetiza glucógeno (glucogénesis) estimulado por insulina. Ayuno: libera glucosa por glucogenólisis (primeras horas) y gluconeogénesis desde lactato, aminoácidos y glicerol (ayuno prolongado).',
            datos: [
                { l: 'Glucógeno hep.', v: '100-120 g' },
                { l: 'Autonomía', v: '12-18 h ayuno' },
                { l: 'Postprandial', v: 'Glucogénesis' },
                { l: 'Ayuno', v: 'Gluconeogénesis' }
            ]
        },
        {
            name: 'Metabolismo de Lípidos',
            region: 'β-oxidación — Síntesis Lipoproteínas',
            desc: 'El hígado realiza β-oxidación de ácidos grasos para obtener energía (zona 1), produciendo cuerpos cetónicos en ayuno prolongado. Sintetiza ácidos grasos de novo desde acetil-CoA. Produce VLDL para exportar triglicéridos. Sintetiza colesterol (50% del total) y sales biliares. Regula niveles plasmáticos de colesterol mediante receptores LDL.',
            datos: [
                { l: 'β-oxidación', v: 'Zona 1' },
                { l: 'Cuerpos cetón.', v: 'Ayuno prolong.' },
                { l: 'Síntesis colest.', v: '~50% total' },
                { l: 'Exporta TG', v: 'VLDL' }
            ]
        },
        {
            name: 'Metabolismo de Proteínas',
            region: 'Síntesis — Desaminación — Ciclo Urea',
            desc: 'Sintetiza la mayoría de proteínas plasmáticas: albúmina (35-50 g/L sérica, mantiene presión oncótica), factores de coagulación (I, II, V, VII, IX, X, XI), proteínas transportadoras. Desaminación de aminoácidos produce NH₃ tóxico, convertido en urea (ciclo de la urea) para excreción renal. Insuficiencia hepática → hiperamonemia.',
            datos: [
                { l: 'Albúmina sér.', v: '35-50 g/L' },
                { l: 'Fact. coagulac.', v: 'I, II, V, VII...' },
                { l: 'NH₃ → Urea', v: 'Ciclo urea' },
                { l: 'Falla hepát.', v: 'Hiperamonemia' }
            ]
        },
        {
            name: 'Síntesis y Secreción de Bilis',
            region: 'Hepatocitos — Vías Biliares',
            desc: 'Los hepatocitos producen 600-1000 mL/día de bilis. Componentes: sales biliares (ácidos cólico y quenodesoxicólico conjugados), colesterol, lecitina, bilirrubina, electrolitos. Sales biliares emulsionan grasas en duodeno facilitando digestión. Ciclo enterohepático: 95% se reabsorbe en íleon y recircula. Vesícula concentra la bilis 5-10 veces.',
            datos: [
                { l: 'Volumen/día', v: '600-1000 mL' },
                { l: 'Sales biliares', v: '95% reabsorción' },
                { l: 'Concentración', v: '5-10× vesícula' },
                { l: 'Función', v: 'Emulsión grasas' }
            ]
        },
        {
            name: 'Metabolismo de Bilirrubina',
            region: 'Conjugación — Excreción',
            desc: 'Degradación de hemoglobina genera bilirrubina no conjugada (indirecta, no soluble). El hígado la capta, la conjuga con ácido glucurónico (UDP-glucuronil transferasa) formando bilirrubina conjugada (directa, soluble), que se excreta en bilis. En intestino, bacterias la convierten en urobilinógeno. Ictericia si falla captación, conjugación o excreción.',
            datos: [
                { l: 'Bilirrubina tot.', v: '<1.2 mg/dL' },
                { l: 'Conjugada', v: '<0.3 mg/dL' },
                { l: 'Enzima', v: 'UGT1A1' },
                { l: 'Ictericia', v: '>2-3 mg/dL' }
            ]
        },
        {
            name: 'Biotransformación de Fármacos',
            region: 'Citocromo P450 — Fase I y II',
            desc: 'El hígado metaboliza la mayoría de fármacos y xenobióticos. Fase I (zona 3): oxidación, reducción, hidrólisis por CYP450 (más de 50 isoformas, destacan CYP3A4, CYP2D6, CYP2C9). Fase II: conjugación con ácido glucurónico, sulfato, glutatión para aumentar hidrosolubilidad y facilitar excreción renal/biliar.',
            datos: [
                { l: 'Isoformas CYP', v: '>50' },
                { l: 'Principal', v: 'CYP3A4 (~50%)' },
                { l: 'Fase I', v: 'Oxidación' },
                { l: 'Fase II', v: 'Conjugación' }
            ]
        },
        {
            name: 'Almacenamiento de Vitaminas',
            region: 'Vitaminas Liposolubles — Hierro',
            desc: 'El hígado almacena vitaminas liposolubles: A (reserva para 1-2 años en células estrelladas), D (25-hidroxilación, primer paso activación), E, K. Almacena vitaminas hidrosolubles: B12 (reserva 3-5 años), folato, otras vitaminas B. Almacena hierro como ferritina y hemosiderina. Libera hierro según necesidades eritropoyéticas.',
            datos: [
                { l: 'Vit. A reserva', v: '1-2 años' },
                { l: 'Vit. B12 reserva', v: '3-5 años' },
                { l: 'Hierro', v: 'Ferritina' },
                { l: '25-OH vit. D', v: 'Activación' }
            ]
        },
        {
            name: 'Regeneración Hepática',
            region: 'Hiperplasia Compensadora',
            desc: 'Capacidad única de regeneración. Tras hepatectomía del 70%, el remanente se regenera hasta restaurar masa original en 7-10 días (humanos) vía proliferación de hepatocitos maduros. No es regeneración verdadera sino hiperplasia compensadora. Factores: HGF (factor crecimiento hepatocitos), citoquinas (TNF-α, IL-6), EGF. La cirrosis impide regeneración normal.',
            datos: [
                { l: 'Hepatectomía', v: 'Hasta 70%' },
                { l: 'Recuperación', v: '7-10 días' },
                { l: 'Factor clave', v: 'HGF' },
                { l: 'Impedimento', v: 'Cirrosis' }
            ]
        }
    ]
};

console.log('✅ Liver Data: Fisiología cargada');
