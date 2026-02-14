/**
 * ═══════════════════════════════════════════════════
 *  HEART — Patologías Cardíacas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__HEART_DATA = window.__HEART_DATA || {};

window.__HEART_DATA.patologias = {
    title: 'Patologías Cardíacas',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'Infarto Agudo de Miocardio',
            region: 'Miocardio — Arterias Coronarias',
            desc: 'Necrosis irreversible del miocardio por oclusión coronaria aguda. La rotura de una placa aterosclerótica activa la cascada de coagulación formando un trombo oclusivo. El infarto STEMI (con elevación del ST) requiere reperfusión urgente mediante angioplastia primaria (<90 min) o fibrinólisis (<30 min).',
            datos: [
                { l: 'Marcador clave', v: 'Troponina I/T' },
                { l: 'STEMI', v: 'PCI <90 min' },
                { l: 'Necrosis/min', v: '~1.9M células' },
                { l: 'Pared más afect.', v: 'Anterior (DA)' }
            ]
        },
        {
            name: 'Insuficiencia Cardíaca Congestiva',
            region: 'Ventrículos — Global',
            desc: 'Síndrome clínico donde el corazón no puede mantener un gasto cardíaco adecuado para las demandas metabólicas. IC izquierda: disnea, ortopnea, edema pulmonar. IC derecha: edema periférico, hepatomegalia, ingurgitación yugular. Clasificación por FEVI: reducida (<40%), intermedia (40-49%), preservada (≥50%).',
            datos: [
                { l: 'FEVI reducida', v: '<40%' },
                { l: 'FEVI preservada', v: '≥50%' },
                { l: 'Marcador', v: 'BNP >100 pg/mL' },
                { l: 'Mortalidad 5a', v: '~50%' }
            ]
        },
        {
            name: 'Valvulopatía Mitral',
            region: 'Válvula Mitral — AI/VI',
            desc: 'Estenosis mitral: fusión de comisuras (frecuente en fiebre reumática), reduce el área valvular (<1.5 cm² = severa). Insuficiencia mitral: reflujo de sangre del VI a la AI por prolapso, rotura de cuerdas o dilatación anular. Ambas causan dilatación auricular y riesgo de fibrilación auricular.',
            datos: [
                { l: 'Área normal', v: '4-6 cm²' },
                { l: 'Estenosis severa', v: '<1.0 cm²' },
                { l: 'Causa estenosis', v: 'Reumática' },
                { l: 'Causa insuf.', v: 'Prolapso/Isquem.' }
            ]
        },
        {
            name: 'Estenosis Aórtica',
            region: 'Válvula Aórtica — VI/Aorta',
            desc: 'Estrechamiento de la válvula aórtica que obstruye la eyección del ventrículo izquierdo. Causa más frecuente: calcificación degenerativa en >65 años y bicúspide congénita en <65 años. Triada clásica: angina, síncope de esfuerzo y disnea. Gradiente medio >40 mmHg indica estenosis severa.',
            datos: [
                { l: 'Área normal', v: '3-4 cm²' },
                { l: 'Severa', v: '<1.0 cm²' },
                { l: 'Gradiente sev.', v: '>40 mmHg' },
                { l: 'Triada', v: 'Angina+Sínc+Disn' }
            ]
        },
        {
            name: 'Miocardiopatía Dilatada',
            region: 'Ventrículos — Miocardio Difuso',
            desc: 'Dilatación y disfunción sistólica de uno o ambos ventrículos sin causa isquémica ni valvular. Etiología: idiopática (50%), genética (30-40%), alcohólica, viral (Coxsackie), periparto o tóxica (doxorrubicina). El ventrículo se dilata, adelgaza y pierde fuerza contráctil.',
            datos: [
                { l: 'FEVI', v: '<30-40%' },
                { l: 'Idiopática', v: '~50%' },
                { l: 'Genética', v: '~30-40%' },
                { l: 'Riesgo', v: 'IC + Arritmias' }
            ]
        },
        {
            name: 'Miocardiopatía Hipertrófica',
            region: 'Septo Interventricular — VI',
            desc: 'Hipertrofia asimétrica del miocardio, predominantemente del septo interventricular (≥15 mm), sin causa hemodinámica. Enfermedad genética autosómica dominante (mutaciones en proteínas sarcoméricas). Causa más frecuente de muerte súbita cardíaca en jóvenes atletas.',
            datos: [
                { l: 'Septo', v: '≥15 mm' },
                { l: 'Herencia', v: 'AD (sarcómero)' },
                { l: 'Muerte súbita', v: '#1 en jóvenes' },
                { l: 'Obstructiva', v: '~70% (HOCM)' }
            ]
        },
        {
            name: 'Pericarditis Aguda',
            region: 'Pericardio — Saco Pericárdico',
            desc: 'Inflamación del pericardio con dolor torácico pleurítico que mejora sentado e inclinado hacia adelante. Etiología más frecuente: viral (Coxsackie, Echovirus). ECG: elevación difusa del ST con depresión del PR. Puede producir derrame pericárdico y evolucionar a taponamiento.',
            datos: [
                { l: 'Causa común', v: 'Viral' },
                { l: 'Dolor mejora', v: 'Sentado/adelante' },
                { l: 'ECG', v: 'ST↑ difuso + PR↓' },
                { l: 'Tratamiento', v: 'AINEs+Colchicina' }
            ]
        },
        {
            name: 'Taponamiento Cardíaco',
            region: 'Saco Pericárdico — Derrame',
            desc: 'Acumulación de líquido en el saco pericárdico que comprime las cámaras cardíacas e impide el llenado diastólico. Triada de Beck: hipotensión, ingurgitación yugular y ruidos cardíacos apagados. Pulso paradójico (caída de PAS >10 mmHg en inspiración). Tratamiento: pericardiocentesis urgente.',
            datos: [
                { l: 'Triada Beck', v: 'HipoTA+IY+RAp' },
                { l: 'Pulso paradój.', v: 'PAS ↓>10 mmHg' },
                { l: 'Diagnóstico', v: 'Ecocardiograma' },
                { l: 'Tratamiento', v: 'Pericardiocent.' }
            ]
        },
        {
            name: 'Endocarditis Infecciosa',
            region: 'Válvulas Cardíacas — Endocardio',
            desc: 'Infección del endocardio valvular con formación de vegetaciones (plaquetas, fibrina, microorganismos). Aguda: S. aureus, válvula nativa, destrucción rápida. Subaguda: S. viridans, curso lento. Criterios de Duke (2 mayores o 1 mayor + 3 menores) para diagnóstico.',
            datos: [
                { l: 'Aguda', v: 'S. aureus' },
                { l: 'Subaguda', v: 'S. viridans' },
                { l: 'Válvula nativa', v: 'Mitral > Aórt.' },
                { l: 'Diagnóstico', v: 'Criterios Duke' }
            ]
        },
        {
            name: 'Síndrome de Brugada',
            region: 'Canales de Na⁺ — Sistema Conducción',
            desc: 'Canalopatía genética de canales de sodio (SCN5A) que predispone a arritmias ventriculares malignas y muerte súbita. ECG característico: elevación del ST en V1-V3 con patrón de bloqueo de rama derecha (tipo 1: coved). Más frecuente en hombres asiáticos. Tratamiento: desfibrilador implantable (DAI).',
            datos: [
                { l: 'Gen', v: 'SCN5A (Na⁺)' },
                { l: 'ECG', v: 'ST↑ V1-V3 coved' },
                { l: 'Prevalencia', v: '1-5/10.000' },
                { l: 'Tratamiento', v: 'DAI' }
            ]
        }
    ]
};

console.log('✅ Heart Data: Patologías cargadas');
