/**
 * ═══════════════════════════════════════════════════
 *  NERVOUS SYSTEM — Patologías Neurológicas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__NERVOUS_DATA = window.__NERVOUS_DATA || {};

window.__NERVOUS_DATA.patologias = {
    title: 'Patologías Neurológicas',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'Enfermedad de Alzheimer',
            region: 'Demencia Neurodegenerativa',
            desc: 'Principal causa de demencia (60-70% casos). Degeneración progresiva con placas β-amiloide extracelulares y ovillos neurofibrilares de proteína tau intracelulares. Pérdida neuronal en hipocampo (memoria) y corteza. Síntomas: pérdida memoria, confusión, cambios personalidad, deterioro funcional. Factores riesgo: edad >65 años, APOE ε4, antecedentes familiares. No hay cura, tratamiento sintomático.',
            datos: [
                { l: 'Prevalencia >65a', v: '~10%' },
                { l: 'Prevalencia >85a', v: '~30-50%' },
                { l: 'Factor riesgo', v: 'APOE ε4' },
                { l: 'Tratamiento', v: 'Sintomático' }
            ]
        },
        {
            name: 'Enfermedad de Parkinson',
            region: 'Trastorno del Movimiento',
            desc: 'Degeneración de neuronas dopaminérgicas en sustancia negra. Déficit de dopamina en estriado causa síntomas motores. Tríada clásica: temblor en reposo (4-6 Hz), rigidez, bradicinesia. También: inestabilidad postural, marcha festinante, hipomimia. Síntomas no motores: depresión, trastornos sueño, constipación. Tratamiento: levodopa (precursor dopamina), agonistas dopaminérgicos, estimulación cerebral profunda.',
            datos: [
                { l: 'Prevalencia', v: '~1% >60 años' },
                { l: 'Tríada', v: 'Temblor, rigidez, bradicinesia' },
                { l: 'Déficit', v: 'Dopamina' },
                { l: 'Tratamiento', v: 'Levodopa' }
            ]
        },
        {
            name: 'Esclerosis Múltiple',
            region: 'Enfermedad Autoinmune Desmielinizante',
            desc: 'Destrucción autoinmune de mielina en SNC (cerebro, médula espinal). Placas desmielinizantes múltiples. Síntomas: debilidad, alteraciones visuales (neuritis óptica), parestesias, ataxia, fatiga. Curso: recaída-remisión (85%), progresiva secundaria, progresiva primaria. Diagnóstico: RMN (lesiones), punción lumbar (bandas oligoclonales LCR). Tratamiento: inmunomoduladores, corticoides en brotes.',
            datos: [
                { l: 'Edad inicio', v: '20-40 años' },
                { l: 'Mujeres:hombres', v: '~2-3:1' },
                { l: 'Tipo común', v: 'Recaída-remisión' },
                { l: 'Dx', v: 'RMN + LCR' }
            ]
        },
        {
            name: 'Accidente Cerebrovascular (ACV)',
            region: 'Isquemia o Hemorragia Cerebral',
            desc: 'Interrupción abrupta flujo sanguíneo cerebral. ACV isquémico (85%): obstrucción arterial (trombo/émbolo). ACV hemorrágico (15%): ruptura vascular. Síntomas súbitos: debilidad hemicorporal, afasia, pérdida visión, ataxia. Escala Cincinnati/NIHSS para evaluación. Ventana terapéutica isquémico: trombólisis IV <4.5h, trombectomía mecánica <24h. Secuelas: hemiplejia, afasia, dependencia funcional.',
            datos: [
                { l: 'Isquémico', v: '~85%' },
                { l: 'Hemorrágico', v: '~15%' },
                { l: 'Trombólisis', v: '<4.5 h' },
                { l: 'Mortalidad 30d', v: '~20-30%' }
            ]
        },
        {
            name: 'Epilepsia',
            region: 'Descargas Neuronales Sincrónicas',
            desc: 'Trastorno por actividad neuronal excesiva anormal. Crisis epilépticas: focales (inicio localizado, consciente/alteración conciencia) y generalizadas (ambos hemisferios, pérdida conciencia). Crisis tónico-clónica generalizada: fase tónica (rigidez), fase clónica (sacudidas), confusión postictal. Causas: idiopática, genética, estructural (tumor, ACV), infecciones. Diagnóstico: EEG. Tratamiento: antiepilépticos (valproato, carbamazepina, levetiracetam).',
            datos: [
                { l: 'Prevalencia', v: '~1%' },
                { l: 'Crisis focales', v: '60%' },
                { l: 'Crisis generaliz.', v: '40%' },
                { l: 'EEG', v: 'Diagnóstico' }
            ]
        },
        {
            name: 'Esclerosis Lateral Amiotrófica (ELA)',
            region: 'Enfermedad de Motoneurona',
            desc: 'Degeneración progresiva de motoneuronas superiores (corteza) e inferiores (tronco/médula). Causa debilidad muscular progresiva, atrofia, fasciculaciones, espasticidad. Inicia focal (extremidad/bulbar) y se extiende. Afecta músculos respiratorios → insuficiencia respiratoria (causa muerte). No afecta sensibilidad, esfínteres ni cognición (mayoría). Supervivencia media: 3-5 años tras diagnóstico. Tratamiento: riluzol (enlentece), cuidados paliativos.',
            datos: [
                { l: 'Edad inicio', v: '50-70 años' },
                { l: 'Supervivencia', v: '3-5 años' },
                { l: 'Muerte', v: 'Insfic. respiratoria' },
                { l: 'Tratamiento', v: 'Riluzol' }
            ]
        },
        {
            name: 'Meningitis',
            region: 'Inflamación Meninges',
            desc: 'Inflamación de meninges. Bacteriana (S. pneumoniae, N. meningitidis, H. influenzae): grave, mortalidad 10-20%. Viral (enterovirus): autolimitada, benigna. Tríada clásica: fiebre, cefalea intensa, rigidez nucal. Signos: Kernig, Brudzinski. Diagnóstico: punción lumbar (LCR turbio en bacteriana, pleocitosis). Tratamiento bacteriana: antibióticos IV urgente (ceftriaxona), dexametasona. Vacunas previenen (neumococo, meningococo, H. influenzae).',
            datos: [
                { l: 'Bacteriana', v: 'Mortalidad 10-20%' },
                { l: 'Viral', v: 'Autolimitada' },
                { l: 'Dx', v: 'Punción lumbar' },
                { l: 'Tx bacteriana', v: 'ATB IV urgente' }
            ]
        },
        {
            name: 'Síndrome de Guillain-Barré',
            region: 'Polirradiculoneuropatía Autoinmune',
            desc: 'Neuropatía periférica aguda autoinmune post-infecciosa (Campylobacter, virus). Desmielinización de raíces y nervios periféricos. Debilidad ascendente progresiva simétrica (días-semanas), arreflexia, parestesias. Variante: parálisis bilateral facial, ataxia, arreflexia (síndrome Miller-Fisher). Complicación: insuficiencia respiratoria (20-30% requieren ventilación). Diagnóstico: disociación albúmino-citológica LCR. Tratamiento: inmunoglobulina IV, plasmaféresis. Recuperación: meses.',
            datos: [
                { l: 'Debilidad', v: 'Ascendente' },
                { l: 'Vent. mecánica', v: '20-30%' },
                { l: 'LCR', v: 'Disoc. albúmino-citol.' },
                { l: 'Tx', v: 'Inmunoglobulina IV' }
            ]
        },
        {
            name: 'Migraña',
            region: 'Cefalea Primaria',
            desc: 'Cefalea pulsátil unilateral recurrente (4-72h). Características: intensidad moderada-severa, empeora con actividad física, náusea/vómito, fotofobia/fonofobia. Migraña con aura (25%): síntomas neurológicos reversibles previos (visual común: escotomas centelleantes). Fisiopatología: vasodilatación, inflamación neurogénica, sensibilización trigeminal. Factores desencadenantes: estrés, alimentos, hormonas, sueño. Tratamiento agudo: AINEs, triptanes. Preventivo: betabloqueadores, topiramato, anticuerpos anti-CGRP.',
            datos: [
                { l: 'Prevalencia', v: '~15%' },
                { l: 'Mujeres:hombres', v: '~3:1' },
                { l: 'Con aura', v: '~25%' },
                { l: 'Tx agudo', v: 'Triptanes' }
            ]
        },
        {
            name: 'Neuropatía Diabética',
            region: 'Complicación Microvascular',
            desc: 'Daño nervioso por hiperglucemia crónica. Polineuropatía distal simétrica (más común): parestesias, disestesias, dolor neuropático en "guante y calcetín", pérdida sensibilidad. Riesgo: úlceras pie, amputación. Neuropatía autonómica: gastroparesia, vejiga neurogénica, disfunción eréctil, hipotensión ortostática. Mononeuropatías: pares craneales (III, VI), nervios periféricos. Prevención: control glucémico estricto (HbA1c <7%). Tratamiento dolor: pregabalina, duloxetina.',
            datos: [
                { l: 'Prevalencia DM', v: '~50%' },
                { l: 'Tipo común', v: 'Polineurop. distal' },
                { l: 'Prevención', v: 'Control glucémico' },
                { l: 'Tx dolor', v: 'Pregabalina' }
            ]
        }
    ]
};

console.log('✅ Nervous Data: Patologías cargadas');
