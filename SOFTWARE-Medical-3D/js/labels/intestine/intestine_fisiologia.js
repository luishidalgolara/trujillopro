/**
 * ═══════════════════════════════════════════════════
 *  INTESTINE — Fisiología Digestiva
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__INTESTINE_DATA = window.__INTESTINE_DATA || {};

window.__INTESTINE_DATA.fisiologia = {
    title: 'Fisiología Digestiva',
    icon: '⚡',
    color: '#f59e0b',
    items: [
        {
            name: 'Absorción de Agua y Electrolitos',
            region: 'Colon Proximal — Intercambio Iónico',
            desc: 'El colon recibe ~1.5 L/día de quimo líquido del íleon y absorbe ~90% del agua (1.3-1.4 L/día), dejando 100-200 mL en heces. Absorbe Na⁺ activamente (canales ENaC) junto con Cl⁻ y secreta K⁺ y HCO₃⁻. La aldosterona aumenta la absorción de Na⁺ y agua. La diarrea ocurre cuando supera la capacidad absortiva.',
            datos: [
                { l: 'Entrada/día', v: '~1.5 L' },
                { l: 'Absorción', v: '~90% (1.3 L)' },
                { l: 'Heces', v: '100-200 mL' },
                { l: 'Capacidad máx.', v: '~5 L/día' }
            ]
        },
        {
            name: 'Motilidad Colónica',
            region: 'Músculo Liso — Ondas Peristálticas',
            desc: 'Contracciones segmentarias (no propulsivas): mezclan contenido, duran 8-9 segundos, ocurren ~10 veces/h. Movimientos de masa (propulsivos): 3-4 veces/día, impulsan contenido 20 cm distalmente en pocos segundos, desencadenados por reflejo gastrocólico tras comer. El tránsito completo es 12-36 horas.',
            datos: [
                { l: 'Contr. segment.', v: '~10/hora' },
                { l: 'Movim. masa', v: '3-4/día' },
                { l: 'Distancia', v: '~20 cm' },
                { l: 'Tránsito total', v: '12-36 h' }
            ]
        },
        {
            name: 'Fermentación Bacteriana',
            region: 'Colon — Microbiota Anaerobia',
            desc: 'Fermentación anaeróbica de fibra dietética no digerible (celulosa, pectinas, inulina) por bacterias colónicas. Produce ácidos grasos de cadena corta (AGCC): acetato (60%), propionato (20%), butirato (20%). Los AGCC son fuente energética para colonocitos (butirato), regulan pH colónico, modulan inmunidad y metabolismo sistémico.',
            datos: [
                { l: 'Sustrato', v: 'Fibra no diger.' },
                { l: 'AGCC total', v: '~100-130 mM' },
                { l: 'Acetato', v: '~60%' },
                { l: 'Butirato', v: '~20% (energía)' }
            ]
        },
        {
            name: 'Síntesis de Vitaminas por Microbiota',
            region: 'Colon — Flora Bacteriana',
            desc: 'Bacterias colónicas (Bacteroides, E. coli, Enterococcus) sintetizan vitaminas que se absorben en el colon: vitamina K (esencial para coagulación), complejo B (B12, biotina, ácido fólico, tiamina). La producción cubre ~50% de necesidades de vitamina K. Los antibióticos orales pueden causar déficit de vitamina K.',
            datos: [
                { l: 'Vitamina K', v: '~50% necesidad' },
                { l: 'B12', v: 'Síntesis + absorc.' },
                { l: 'Biotina', v: 'Producción alta' },
                { l: 'Riesgo ATB', v: 'Déficit vit. K' }
            ]
        },
        {
            name: 'Reflejo Gastrocólico',
            region: 'Estómago → Colon — Vía Neurohormonal',
            desc: 'Reflejo que aumenta la motilidad colónica 15-30 minutos después de comer. Activación vagal y liberación de gastrina y colecistoquinina (CCK) desde el estómago estimulan contracciones masivas en colon. Es más intenso tras el desayuno. Contribuye al deseo de defecar matutino. La ausencia sugiere dismotilidad.',
            datos: [
                { l: 'Latencia', v: '15-30 min' },
                { l: 'Mediadores', v: 'Vago + gastrina' },
                { l: 'Más intenso', v: 'Desayuno' },
                { l: 'Efecto', v: '↑ Motilidad' }
            ]
        },
        {
            name: 'Defecación',
            region: 'Recto — Esfínteres Anales',
            desc: 'Cuando las heces entran al recto, se distiende y activa mecanorreceptores (reflejo rectoanal). El esfínter anal interno (involuntario, músculo liso) se relaja. El esfínter externo (voluntario, músculo estriado) puede contraerse para postergar. La maniobra de Valsalva aumenta presión intraabdominal. Requiere relajación voluntaria del puborrectal.',
            datos: [
                { l: 'Presión basal', v: '50-70 mmHg' },
                { l: 'Esfínter interno', v: 'Involuntario' },
                { l: 'Esfínter externo', v: 'Voluntario' },
                { l: 'Ángulo anorrect.', v: '80-90°' }
            ]
        },
        {
            name: 'Producción de Gases Intestinales',
            region: 'Colon — Fermentación',
            desc: 'Producción normal de 200-2000 mL/día de gases intestinales. Composición: N₂ (aire tragado, 20-90%), CO₂ (fermentación, 10-30%), H₂ (fermentación, 0-50%), CH₄ (30% población, metanógenos), H₂S (trazas, olor). Los carbohidratos mal absorbidos aumentan producción. La flatulencia excesiva (>25 veces/día) indica malabsorción.',
            datos: [
                { l: 'Volumen/día', v: '200-2000 mL' },
                { l: 'N₂', v: '20-90%' },
                { l: 'CO₂', v: '10-30%' },
                { l: 'Flatulencia norm.', v: '10-25/día' }
            ]
        },
        {
            name: 'Barrera Mucosa',
            region: 'Moco Colónico — Capa Protectora',
            desc: 'Capa de moco de ~700 μm de espesor que protege la mucosa. Compuesta por mucina MUC2 secretada por células caliciformes. Tiene dos capas: interna (firme, estéril) y externa (laxa, con bacterias). Contiene péptidos antimicrobianos (defensinas, lisozima), IgA secretora. Defectos en moco → colitis ulcerosa.',
            datos: [
                { l: 'Espesor', v: '~700 μm' },
                { l: 'Mucina', v: 'MUC2' },
                { l: 'Capas', v: '2 (interna + ext)' },
                { l: 'Defensinas', v: 'Antimicrobianas' }
            ]
        }
    ]
};

console.log('✅ Intestine Data: Fisiología cargada');
