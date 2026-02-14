/**
 * ═══════════════════════════════════════════════════
 *  HEART — Fisiología Cardíaca
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__HEART_DATA = window.__HEART_DATA || {};

window.__HEART_DATA.fisiologia = {
    title: 'Fisiología Cardíaca',
    icon: '⚡',
    color: '#f59e0b',
    items: [
        {
            name: 'Potencial de Acción Cardíaco',
            region: 'Cardiomiocitos — Canales Iónicos',
            desc: 'Cinco fases: Fase 0 (despolarización rápida, entrada de Na⁺), Fase 1 (repolarización inicial, salida de K⁺), Fase 2 (meseta, entrada de Ca²⁺ por canales L, salida de K⁺), Fase 3 (repolarización rápida, salida de K⁺), Fase 4 (reposo, -90 mV). La meseta dura ~200 ms, previniendo tetania.',
            datos: [
                { l: 'Fase 0', v: 'Na⁺ entrada rápida' },
                { l: 'Fase 2 (meseta)', v: 'Ca²⁺ canales L' },
                { l: 'Duración PA', v: '~250-300 ms' },
                { l: 'Reposo', v: '-90 mV' }
            ]
        },
        {
            name: 'Acoplamiento Excitación-Contracción',
            region: 'Túbulos T — Retículo Sarcoplásmico',
            desc: 'El potencial de acción viaja por los túbulos T, abre canales de Ca²⁺ tipo L (entrada de Ca²⁺ extracelular). Este Ca²⁺ activa los receptores de rianodina (RyR2) en el retículo sarcoplásmico, liberando Ca²⁺ masivamente (CICR). El Ca²⁺ se une a troponina C, permitiendo la interacción actina-miosina.',
            datos: [
                { l: 'Señal', v: 'CICR (Ca²⁺-induc.)' },
                { l: 'Canal', v: 'RyR2 (RS)' },
                { l: 'Blanco', v: 'Troponina C' },
                { l: 'Relajación', v: 'SERCA2a (recapt.)' }
            ]
        },
        {
            name: 'Precarga y Postcarga',
            region: 'Ventrículos — Determinantes GC',
            desc: 'Precarga: volumen telediastólico del VI (estiramiento de sarcómeros antes de contraer). Aumenta con retorno venoso, volemia. Postcarga: resistencia que enfrenta el VI durante la eyección (≈resistencia vascular periférica). HTA aumenta postcarga. Ambas determinan el volumen sistólico según Frank-Starling.',
            datos: [
                { l: 'Precarga ≈', v: 'VTDVI (~120 mL)' },
                { l: 'Postcarga ≈', v: 'RVP / PA' },
                { l: '↑ Precarga', v: '↑ Vol. sistólico' },
                { l: '↑ Postcarga', v: '↓ Vol. sistólico' }
            ]
        },
        {
            name: 'Diagrama Presión-Volumen',
            region: 'Ventrículo Izquierdo — Ciclo Cardíaco',
            desc: 'El bucle PV del VI describe 4 fases: llenado (↑volumen, baja presión), contracción isovolumétrica (↑presión, volumen constante), eyección (↓volumen, alta presión) y relajación isovolumétrica (↓presión, volumen constante). El área del bucle = trabajo sistólico del VI.',
            datos: [
                { l: 'VTDVI', v: '~120 mL' },
                { l: 'VTSVI', v: '~50 mL' },
                { l: 'Vol. sistólico', v: '~70 mL' },
                { l: 'Área bucle', v: '= Trabajo VI' }
            ]
        },
        {
            name: 'Regulación Neurohumoral',
            region: 'SNA + SRAA + Péptidos Natriuréticos',
            desc: 'Simpático (noradrenalina): ↑FC, ↑contractilidad, ↑velocidad conducción. Parasimpático (acetilcolina vía vago): ↓FC. SRAA: angiotensina II causa vasoconstricción, aldosterona retiene Na⁺/H₂O. Péptidos natriuréticos (BNP, ANP): vasodilatación, natriuresis, contrarrestan SRAA.',
            datos: [
                { l: 'Simpático', v: '↑FC ↑Inotrop.' },
                { l: 'Parasimpático', v: '↓FC (vago)' },
                { l: 'SRAA', v: 'Vasoconstricción' },
                { l: 'BNP/ANP', v: 'Contra-regulación' }
            ]
        },
        {
            name: 'Flujo Coronario Fásico',
            region: 'Arterias Coronarias — Ciclo',
            desc: 'A diferencia del resto del cuerpo, el flujo coronario del VI ocurre principalmente en DIÁSTOLE (70-80%). Durante la sístole, la contracción miocárdica comprime los vasos intramiocárdicos. La arteria coronaria derecha tiene flujo más uniforme. La taquicardia reduce la diástole y puede provocar isquemia.',
            datos: [
                { l: 'Flujo diástole', v: '~70-80% (VI)' },
                { l: 'Flujo total', v: '~250 mL/min' },
                { l: 'Extracción O₂', v: '~75% (máxima)' },
                { l: 'Taquicardia →', v: '↓ Perfusión' }
            ]
        }
    ]
};

console.log('✅ Heart Data: Fisiología cargada');
