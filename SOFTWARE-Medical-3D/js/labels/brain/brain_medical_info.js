/**
 * ═══════════════════════════════════════════════════
 *  BRAIN MEDICAL INFO — Información Médica Extendida
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *
 *  Panel expandible con información médica real:
 *  • Patologías neurológicas
 *  • Optimización cerebral (alimentación)
 *  • Optimización cerebral (oxigenación y hábitos)
 *  • Neuroanatomía profunda
 *  • Neurotransmisores clave
 *  • Datos clínicos de referencia
 *
 *  Requiere: window.__BRAIN3D (scene, camera, renderer)
 *  Estilo: coherente con variables CSS del proyecto
 * ═══════════════════════════════════════════════════
 */

/* ──────────────────────────────────────────────────
   WAIT FOR ENGINE
   ────────────────────────────────────────────────── */
function waitForEngine(maxWait = 10000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            if (window.__BRAIN3D && window.__BRAIN3D.scene && window.__BRAIN3D.camera) {
                return resolve(window.__BRAIN3D);
            }
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: engine no disponible');
            requestAnimationFrame(check);
        })();
    });
}

/* ──────────────────────────────────────────────────
   BASE DE DATOS MÉDICA
   ────────────────────────────────────────────────── */
const MEDICAL_DATA = {

    /* ═══ 1. PATOLOGÍAS NEUROLÓGICAS ═══ */
    patologias: {
        title: 'Patologías Neurológicas',
        icon: '🩺',
        color: '#e8675a',
        items: [
            {
                name: 'Enfermedad de Alzheimer',
                region: 'Corteza / Hipocampo',
                desc: 'Degeneración progresiva con acumulación de placas β-amiloides y ovillos neurofibrilares de proteína tau. Afecta primero al hipocampo (memoria) y se extiende a la corteza. Es la causa más frecuente de demencia.',
                datos: [
                    { l: 'Prevalencia', v: '>55 millones' },
                    { l: 'Inicio típico', v: '>65 años' },
                    { l: 'Zona inicial', v: 'Hipocampo' },
                    { l: 'Neurotrans.', v: '↓ Acetilcolina' }
                ]
            },
            {
                name: 'Enfermedad de Parkinson',
                region: 'Sustancia Nigra / Ganglios Basales',
                desc: 'Pérdida de neuronas dopaminérgicas en la sustancia nigra del mesencéfalo. Produce temblor en reposo, rigidez, bradicinesia e inestabilidad postural. Los cuerpos de Lewy (α-sinucleína) son el marcador patológico.',
                datos: [
                    { l: 'Prevalencia', v: '~10 millones' },
                    { l: 'Inicio típico', v: '~60 años' },
                    { l: 'Pérdida', v: '>60% dopam.' },
                    { l: 'Neurotrans.', v: '↓ Dopamina' }
                ]
            },
            {
                name: 'Accidente Cerebrovascular',
                region: 'Variable — Territorio Vascular',
                desc: 'Interrupción del flujo sanguíneo cerebral. Isquémico (80%): obstrucción por trombo o émbolo. Hemorrágico (20%): ruptura vascular. Cada minuto sin tratamiento se pierden ~1.9 millones de neuronas.',
                datos: [
                    { l: 'Tiempo crítico', v: '<4.5 h (tPA)' },
                    { l: 'Isquémico', v: '~80%' },
                    { l: 'Hemorrágico', v: '~20%' },
                    { l: 'Pérdida/min', v: '1.9M neuron.' }
                ]
            },
            {
                name: 'Epilepsia',
                region: 'Focos corticales variables',
                desc: 'Actividad eléctrica neuronal anormal, sincronizada y excesiva. Crisis parciales (un hemisferio) o generalizadas (ambos). El foco epileptogénico puede estar en lóbulo temporal (más frecuente), frontal u otras áreas.',
                datos: [
                    { l: 'Prevalencia', v: '~50 millones' },
                    { l: 'Foco común', v: 'L. Temporal' },
                    { l: 'EEG', v: 'Ondas punta' },
                    { l: 'Controlable', v: '~70% con Tx' }
                ]
            },
            {
                name: 'Esclerosis Múltiple',
                region: 'Sustancia Blanca — Difusa',
                desc: 'Enfermedad autoinmune que destruye la mielina de los axones del SNC. Produce placas de desmielinización en sustancia blanca cerebral y medular. Cursa con brotes y remisiones en la forma más común.',
                datos: [
                    { l: 'Prevalencia', v: '~2.8 millones' },
                    { l: 'Edad inicio', v: '20-40 años' },
                    { l: 'Ratio F:M', v: '3:1' },
                    { l: 'Lesión', v: 'Desmieliniz.' }
                ]
            },
            {
                name: 'Tumores Cerebrales',
                region: 'Variable — Cualquier región',
                desc: 'Gliomas (astrocitoma, glioblastoma) son los tumores primarios más frecuentes. Los meningiomas son los tumores benignos más comunes. Las metástasis cerebrales provienen principalmente de pulmón, mama y melanoma.',
                datos: [
                    { l: 'Más frecuente', v: 'Glioblastoma' },
                    { l: 'Benigno común', v: 'Meningioma' },
                    { l: 'Clasificación', v: 'Grados I-IV' },
                    { l: 'Síntoma', v: 'Cefalea + ↑PIC' }
                ]
            },
            {
                name: 'Meningitis',
                region: 'Meninges — Espacio Subaracnoideo',
                desc: 'Inflamación de las meninges por infección bacteriana, viral o fúngica. La bacteriana (Neisseria, Streptococcus) es la más grave. Triada clásica: cefalea, fiebre y rigidez de nuca. Diagnóstico por punción lumbar.',
                datos: [
                    { l: 'Mortalidad bact.', v: '10-30%' },
                    { l: 'Triada', v: 'Cefalea+Fi+Rig' },
                    { l: 'Diagnóstico', v: 'Punción lumbar' },
                    { l: 'Prevención', v: 'Vacunación' }
                ]
            },
            {
                name: 'Hidrocefalia',
                region: 'Sistema Ventricular',
                desc: 'Acumulación excesiva de líquido cefalorraquídeo (LCR) en los ventrículos cerebrales. Puede ser comunicante u obstructiva. Aumenta la presión intracraneal. En adultos mayores existe la hidrocefalia normotensiva.',
                datos: [
                    { l: 'LCR normal', v: '~150 ml' },
                    { l: 'Producción', v: '~500 ml/día' },
                    { l: 'Tratamiento', v: 'Derivación VP' },
                    { l: 'Triada (NPH)', v: 'Marcha+Dem+Inc' }
                ]
            },
            {
                name: 'Migraña',
                region: 'Corteza — Trigeminovascular',
                desc: 'Cefalea primaria neurovascular. La depresión cortical propagada genera el aura. Activación del sistema trigeminovascular libera CGRP, causando vasodilatación e inflamación neurógena. Afecta al 12% de la población.',
                datos: [
                    { l: 'Prevalencia', v: '~12% global' },
                    { l: 'Ratio F:M', v: '3:1' },
                    { l: 'Con aura', v: '~25-30%' },
                    { l: 'Mediador', v: 'CGRP' }
                ]
            },
            {
                name: 'ELA (Esclerosis Lateral Amiotrófica)',
                region: 'Corteza Motora / Médula',
                desc: 'Degeneración progresiva de neuronas motoras superiores (corteza) e inferiores (médula). Produce debilidad muscular progresiva, fasciculaciones, espasticidad y atrofia. Preserva funciones cognitivas en la mayoría.',
                datos: [
                    { l: 'Incidencia', v: '2-3/100.000' },
                    { l: 'Edad inicio', v: '55-75 años' },
                    { l: 'Supervivencia', v: '2-5 años' },
                    { l: 'Preserva', v: 'Oculomotores' }
                ]
            }
        ]
    },

    /* ═══ 2. OPTIMIZACIÓN — ALIMENTACIÓN ═══ */
    alimentacion: {
        title: 'Neuronutrición',
        icon: '🥗',
        color: '#4ade80',
        items: [
            {
                name: 'Ácidos Grasos Omega-3 (DHA)',
                region: 'Membranas neuronales — Mielina',
                desc: 'El DHA constituye ~40% de los ácidos grasos poliinsaturados del cerebro. Es esencial para la fluidez de membranas neuronales, mielinización y señalización sináptica. Fuentes: pescados grasos (salmón, sardina), nueces, semillas de chía.',
                datos: [
                    { l: 'Dosis recomen.', v: '250-500 mg/d' },
                    { l: '% cerebral', v: '~40% PUFA' },
                    { l: 'Fuente top', v: 'Salmón/Sardina' },
                    { l: 'Beneficio', v: 'Mielina + sinap.' }
                ]
            },
            {
                name: 'Antioxidantes Neuroprotectores',
                region: 'Todo el SNC — Estrés oxidativo',
                desc: 'El cerebro genera muchos radicales libres por su alto consumo de O₂. Los flavonoides (arándanos), polifenoles (cacao, té verde) y vitamina E cruzan la barrera hematoencefálica y protegen contra el daño oxidativo neuronal.',
                datos: [
                    { l: 'Fuente top', v: 'Arándanos' },
                    { l: 'Polifenol', v: 'Cacao >70%' },
                    { l: 'Mecanismo', v: '↓ Radicales lib.' },
                    { l: 'Efecto', v: 'Neuroprotección' }
                ]
            },
            {
                name: 'Vitaminas del Complejo B',
                region: 'Síntesis de Neurotransmisores',
                desc: 'B12 (cobalamina) es esencial para mielinización y síntesis de ADN neuronal. B9 (folato) participa en metilación y desarrollo neural. B6 (piridoxina) es cofactor en la síntesis de serotonina, dopamina y GABA.',
                datos: [
                    { l: 'B12 diaria', v: '2.4 μg' },
                    { l: 'B9 diaria', v: '400 μg' },
                    { l: 'Déficit B12', v: 'Desmieliniz.' },
                    { l: 'Fuentes B12', v: 'Carnes, huevos' }
                ]
            },
            {
                name: 'Magnesio',
                region: 'Sinapsis — Receptores NMDA',
                desc: 'Bloquea los receptores NMDA en reposo, regulando la excitabilidad neuronal. Esencial para plasticidad sináptica y potenciación a largo plazo (LTP). El L-treonato de magnesio tiene mayor penetración en barrera hematoencefálica.',
                datos: [
                    { l: 'Dosis diaria', v: '310-420 mg' },
                    { l: 'Receptor', v: 'NMDA (bloqueo)' },
                    { l: 'Forma óptima', v: 'L-Treonato' },
                    { l: 'Beneficio', v: 'LTP + plast.' }
                ]
            },
            {
                name: 'Colina y Fosfatidilcolina',
                region: 'Acetilcolina — Memoria',
                desc: 'Precursor de acetilcolina, neurotransmisor clave para memoria y aprendizaje. También forma fosfatidilcolina, componente estructural de membranas neuronales. Fuentes: huevos, hígado, soja, lecitina.',
                datos: [
                    { l: 'Ingesta adecu.', v: '425-550 mg/d' },
                    { l: 'Neurotrans.', v: 'Acetilcolina' },
                    { l: 'Fuente top', v: 'Yema de huevo' },
                    { l: 'Déficit', v: '↓ Memoria' }
                ]
            },
            {
                name: 'Hidratación Cerebral',
                region: 'Volumen cerebral — Concentración',
                desc: 'El cerebro es ~75% agua. Una deshidratación de solo 2% afecta atención, memoria de trabajo y función ejecutiva. El LCR requiere hidratación adecuada para producción y circulación normal.',
                datos: [
                    { l: '% agua cerebro', v: '~75%' },
                    { l: 'Efecto -2%', v: '↓ Cognición' },
                    { l: 'Recomendación', v: '2-2.5 L/día' },
                    { l: 'LCR producción', v: '~500 ml/día' }
                ]
            },
            {
                name: 'Alimentos Neuroinflamatorios',
                region: 'Microglía — Barrera HE',
                desc: 'Azúcares refinados, grasas trans y aceites ultraprocesados activan la microglía y aumentan citoquinas proinflamatorias en el SNC. La inflamación crónica está vinculada a depresión, deterioro cognitivo y neurodegeneración.',
                datos: [
                    { l: 'Evitar', v: 'Grasas trans' },
                    { l: 'Evitar', v: 'Azúcar refinada' },
                    { l: 'Mecanismo', v: '↑ Citoquinas' },
                    { l: 'Riesgo', v: 'Neuroinflam.' }
                ]
            }
        ]
    },

    /* ═══ 3. OPTIMIZACIÓN — OXIGENACIÓN Y HÁBITOS ═══ */
    oxigenacion: {
        title: 'Oxigenación y Hábitos',
        icon: '🫁',
        color: '#5cc8d4',
        items: [
            {
                name: 'Ejercicio Aeróbico',
                region: 'Hipocampo — BDNF',
                desc: 'El ejercicio cardiovascular aumenta el factor neurotrófico derivado del cerebro (BDNF), promoviendo neurogénesis en el giro dentado del hipocampo. Mejora flujo sanguíneo cerebral, plasticidad sináptica y volumen hipocampal.',
                datos: [
                    { l: 'Recomendado', v: '150 min/sem' },
                    { l: 'Factor clave', v: '↑ BDNF' },
                    { l: 'Zona benefic.', v: 'Hipocampo' },
                    { l: 'Efecto', v: 'Neurogénesis' }
                ]
            },
            {
                name: 'Respiración y Oxigenación',
                region: 'Flujo Sanguíneo Cerebral',
                desc: 'El cerebro consume ~20% del O₂ total con solo 2% de la masa corporal. La respiración diafragmática profunda optimiza la saturación de O₂. La hipoxia crónica (apnea del sueño, mala postura) daña progresivamente las neuronas.',
                datos: [
                    { l: 'Consumo O₂', v: '20% del total' },
                    { l: 'Flujo cerebral', v: '750 ml/min' },
                    { l: 'Técnica', v: 'Diafragmática' },
                    { l: 'Riesgo', v: 'Hipoxia crónica' }
                ]
            },
            {
                name: 'Sueño Profundo',
                region: 'Sistema Glinfático',
                desc: 'Durante el sueño profundo (ondas delta), el sistema glinfático limpia desechos metabólicos incluyendo β-amiloide. El espacio intersticial cerebral se expande ~60%. La privación crónica de sueño aumenta riesgo de Alzheimer.',
                datos: [
                    { l: 'Horas óptimas', v: '7-9 h/noche' },
                    { l: 'Expansión', v: '60% interst.' },
                    { l: 'Limpieza', v: 'β-amiloide' },
                    { l: 'Ondas', v: 'Delta (0.5-4 Hz)' }
                ]
            },
            {
                name: 'Meditación',
                region: 'Corteza Prefrontal — Ínsula',
                desc: 'La práctica regular de meditación aumenta el grosor cortical en corteza prefrontal e ínsula. Reduce volumen de la amígdala (menor reactividad al estrés). Mejora conectividad en la red de modo predeterminado (DMN).',
                datos: [
                    { l: 'Tiempo mínimo', v: '10-20 min/d' },
                    { l: 'Efecto corteza', v: '↑ Grosor PFC' },
                    { l: 'Amígdala', v: '↓ Volumen' },
                    { l: 'Red', v: 'DMN mejorada' }
                ]
            },
            {
                name: 'Luz Natural y Ritmo Circadiano',
                region: 'Núcleo Supraquiasmático — Pineal',
                desc: 'La exposición matutina a luz natural sincroniza el reloj maestro (núcleo supraquiasmático del hipotálamo). Regula producción de melatonina por la glándula pineal. La disrupción circadiana afecta consolidación de memoria y neuroplasticidad.',
                datos: [
                    { l: 'Exposición', v: '15-30 min AM' },
                    { l: 'Reloj maestro', v: 'N. Supraquiasm.' },
                    { l: 'Hormona', v: 'Melatonina' },
                    { l: 'Lux mínimos', v: '>2500 lux' }
                ]
            },
            {
                name: 'Estimulación Cognitiva',
                region: 'Reserva Cognitiva — Global',
                desc: 'Aprender idiomas, instrumentos musicales o habilidades nuevas fortalece la reserva cognitiva. Aumenta las conexiones sinápticas y la arborización dendrítica. Retrasa la aparición clínica de demencia hasta 5 años.',
                datos: [
                    { l: 'Actividades', v: 'Idiomas, música' },
                    { l: 'Efecto', v: '↑ Reserva cogn.' },
                    { l: 'Retraso dem.', v: 'Hasta 5 años' },
                    { l: 'Mecanismo', v: '↑ Sinapsis' }
                ]
            }
        ]
    },

    /* ═══ 4. NEUROANATOMÍA PROFUNDA ═══ */
    neuroanatomia: {
        title: 'Neuroanatomía Profunda',
        icon: '🔬',
        color: '#a78bfa',
        items: [
            {
                name: 'Hipocampo',
                region: 'Lóbulo Temporal Medial',
                desc: 'Estructura con forma de caballito de mar, esencial para la formación de nuevas memorias declarativas (episódicas y semánticas). Único sitio confirmado de neurogénesis adulta en el giro dentado. Primer área dañada en Alzheimer.',
                datos: [
                    { l: 'Función', v: 'Memoria nueva' },
                    { l: 'Forma', v: 'Hipocampal (CA)' },
                    { l: 'Neurogénesis', v: 'Giro dentado' },
                    { l: 'Volumen', v: '~3.5 cm³ c/u' }
                ]
            },
            {
                name: 'Amígdala',
                region: 'Lóbulo Temporal — Profunda',
                desc: 'Complejo nuclear con forma de almendra. Centro de procesamiento emocional, especialmente miedo y respuesta de lucha/huida. Modula la consolidación de memorias emocionales. Hiperactividad asociada a ansiedad y TEPT.',
                datos: [
                    { l: 'Función', v: 'Emociones/miedo' },
                    { l: 'Núcleos', v: '~13 subnúcleos' },
                    { l: 'Volumen', v: '~1.2 cm³ c/u' },
                    { l: 'Patología', v: 'Ansiedad/TEPT' }
                ]
            },
            {
                name: 'Tálamo',
                region: 'Diencéfalo — Central',
                desc: 'Estación de relevo sensorial principal. Toda información sensorial (excepto olfato) pasa por el tálamo antes de llegar a la corteza. Contiene ~60 núcleos diferentes. Regula consciencia, sueño y atención.',
                datos: [
                    { l: 'Función', v: 'Relé sensorial' },
                    { l: 'Núcleos', v: '~60' },
                    { l: 'Excepción', v: 'Olfato (directo)' },
                    { l: 'Peso', v: '~6 g c/u' }
                ]
            },
            {
                name: 'Hipotálamo',
                region: 'Diencéfalo — Inferior al Tálamo',
                desc: 'Director de la homeostasis corporal. Controla temperatura, hambre, sed, ritmo circadiano y sistema endocrino via hipófisis. Contiene el núcleo supraquiasmático (reloj biológico) y centros de saciedad/hambre.',
                datos: [
                    { l: 'Peso', v: '~4 g' },
                    { l: 'Función', v: 'Homeostasis' },
                    { l: 'Conexión', v: 'Hipófisis' },
                    { l: 'Núcleos', v: '>15' }
                ]
            },
            {
                name: 'Ganglios Basales',
                region: 'Subcortical — Bilateral',
                desc: 'Núcleos profundos (caudado, putamen, globo pálido) que forman circuitos con corteza y tálamo. Regulan inicio/inhibición de movimientos, aprendizaje de hábitos y toma de decisiones. Afectados en Parkinson y Huntington.',
                datos: [
                    { l: 'Componentes', v: 'Caud+Put+GP' },
                    { l: 'Función', v: 'Mov. + hábitos' },
                    { l: 'Vía directa', v: 'Facilita mov.' },
                    { l: 'Vía indirecta', v: 'Inhibe mov.' }
                ]
            },
            {
                name: 'Cuerpo Calloso',
                region: 'Comisura Interhemisférica',
                desc: 'La mayor estructura de sustancia blanca del cerebro (~200 millones de axones). Conecta regiones homólogas de ambos hemisferios, permitiendo transferencia de información y coordinación bilateral.',
                datos: [
                    { l: 'Axones', v: '~200 millones' },
                    { l: 'Longitud', v: '~10 cm' },
                    { l: 'Función', v: 'Comunic. hemisf.' },
                    { l: 'Secciones', v: '5 (rodilla→esp)' }
                ]
            },
            {
                name: 'Meninges',
                region: 'Envolturas del SNC',
                desc: 'Tres capas protectoras: duramadre (externa, resistente), aracnoides (media, trabéculas) y piamadre (interna, vascular). El espacio subaracnoideo contiene el LCR. Las meninges protegen mecánicamente y contienen vasos sanguíneos.',
                datos: [
                    { l: 'Capas', v: '3 (D + A + P)' },
                    { l: 'LCR en', v: 'Esp. subaracn.' },
                    { l: 'Duramadre', v: 'Más resistente' },
                    { l: 'Piamadre', v: 'Más interna' }
                ]
            },
            {
                name: 'Barrera Hematoencefálica',
                region: 'Endotelio Capilar Cerebral',
                desc: 'Barrera selectiva formada por células endoteliales con uniones estrechas (tight junctions). Permite paso de O₂, CO₂, glucosa y aminoácidos. Bloquea toxinas, patógenos y la mayoría de fármacos. Su disfunción se asocia a enfermedades neurológicas.',
                datos: [
                    { l: 'Uniones', v: 'Tight junctions' },
                    { l: 'Permite', v: 'O₂, glucosa' },
                    { l: 'Bloquea', v: '~98% fármacos' },
                    { l: 'Superficie', v: '~20 m²' }
                ]
            }
        ]
    },

    /* ═══ 5. NEUROTRANSMISORES CLAVE ═══ */
    neurotransmisores: {
        title: 'Neurotransmisores',
        icon: '⚡',
        color: '#f59e0b',
        items: [
            {
                name: 'Dopamina',
                region: 'Vía Mesolímbica / Mesocortical',
                desc: 'Neurotransmisor de la recompensa, motivación y aprendizaje por refuerzo. Se produce en el área tegmental ventral (VTA) y sustancia nigra. Regula movimiento, placer, toma de decisiones y función ejecutiva.',
                datos: [
                    { l: 'Tipo', v: 'Catecolamina' },
                    { l: 'Receptor', v: 'D1-D5' },
                    { l: '↓ Déficit', v: 'Parkinson' },
                    { l: '↑ Exceso', v: 'Psicosis' }
                ]
            },
            {
                name: 'Serotonina (5-HT)',
                region: 'Núcleos del Rafe — Difusa',
                desc: 'Regula estado de ánimo, sueño, apetito y dolor. Se produce en los núcleos del rafe del tronco encefálico. El 95% de la serotonina corporal está en el intestino. Los ISRS (antidepresivos) bloquean su recaptación.',
                datos: [
                    { l: 'Tipo', v: 'Indolamina' },
                    { l: 'Receptores', v: '7 familias (5HT)' },
                    { l: '% intestinal', v: '~95%' },
                    { l: '↓ Déficit', v: 'Depresión' }
                ]
            },
            {
                name: 'GABA (Ác. γ-aminobutírico)',
                region: 'Interneuronas — Todo el SNC',
                desc: 'Principal neurotransmisor inhibitorio del cerebro. Reduce la excitabilidad neuronal abriendo canales de cloro. Esencial para evitar excitotoxicidad. Las benzodiacepinas y barbitúricos potencian su acción.',
                datos: [
                    { l: 'Tipo', v: 'Inhibitorio' },
                    { l: 'Receptor', v: 'GABA-A / GABA-B' },
                    { l: '% sinapsis', v: '~40% inhib.' },
                    { l: '↓ Déficit', v: 'Epilepsia/ansd.' }
                ]
            },
            {
                name: 'Glutamato',
                region: 'Corteza — Todo el SNC',
                desc: 'Principal neurotransmisor excitatorio. Activa receptores AMPA (rápido) y NMDA (plasticidad/memoria). El exceso causa excitotoxicidad (muerte neuronal por sobre-estimulación), implicada en ACV e isquemia.',
                datos: [
                    { l: 'Tipo', v: 'Excitatorio' },
                    { l: 'Receptores', v: 'AMPA/NMDA/Kai' },
                    { l: '% sinapsis', v: '~90% excit.' },
                    { l: 'Riesgo ↑', v: 'Excitotoxicidad' }
                ]
            },
            {
                name: 'Acetilcolina (ACh)',
                region: 'N. Basal de Meynert / Unión NM',
                desc: 'Primer neurotransmisor descubierto. Esencial en memoria, atención y contracción muscular. Se produce en núcleo basal de Meynert (cortical) y en neuronas motoras. Su déficit marca la enfermedad de Alzheimer.',
                datos: [
                    { l: 'Tipo', v: 'Éster de colina' },
                    { l: 'Receptores', v: 'Nicotínico/Musc.' },
                    { l: 'Función', v: 'Memoria + motor' },
                    { l: '↓ Déficit', v: 'Alzheimer' }
                ]
            },
            {
                name: 'Norepinefrina (Noradrenalina)',
                region: 'Locus Coeruleus — Difusa',
                desc: 'Se produce en el locus coeruleus del tronco encefálico. Modula atención, vigilancia, respuesta al estrés y consolidación de memoria. Activa la respuesta de "lucha o huida" a nivel cerebral.',
                datos: [
                    { l: 'Tipo', v: 'Catecolamina' },
                    { l: 'Origen', v: 'Locus coeruleus' },
                    { l: 'Receptores', v: 'α1,α2,β1,β2,β3' },
                    { l: 'Función', v: 'Alerta + estrés' }
                ]
            }
        ]
    },

    /* ═══ 6. DATOS CLÍNICOS DE REFERENCIA ═══ */
    clinicos: {
        title: 'Datos Clínicos',
        icon: '📊',
        color: '#38bdf8',
        items: [
            {
                name: 'Flujo Sanguíneo Cerebral',
                region: 'Vascularización Cerebral',
                desc: 'El cerebro recibe ~15% del gasto cardíaco (~750 ml/min). Irrigado por carótidas internas (anterior) y arterias vertebrales (posterior) que forman el polígono de Willis. La autorregulación mantiene flujo constante entre 60-150 mmHg de PAM.',
                datos: [
                    { l: 'Flujo total', v: '~750 ml/min' },
                    { l: '% gasto card.', v: '~15%' },
                    { l: 'Autorregulación', v: '60-150 mmHg' },
                    { l: 'Polígono', v: 'Willis' }
                ]
            },
            {
                name: 'Metabolismo de Glucosa',
                region: 'Astrocitos — Neuronas',
                desc: 'El cerebro consume ~120 g de glucosa al día (~20% del total corporal). Es el principal combustible neuronal, transportado por GLUT-1 y GLUT-3. En ayuno prolongado, puede usar cuerpos cetónicos como fuente alternativa.',
                datos: [
                    { l: 'Consumo/día', v: '~120 g glucosa' },
                    { l: '% total', v: '~20%' },
                    { l: 'Transportador', v: 'GLUT-1 / GLUT-3' },
                    { l: 'Alternativa', v: 'C. cetónicos' }
                ]
            },
            {
                name: 'Conducción Nerviosa',
                region: 'Axones Mielinizados',
                desc: 'La conducción saltatoria en axones mielinizados alcanza hasta 120 m/s. Los nodos de Ranvier permiten saltos del impulso. Axones no mielinizados conducen a 0.5-2 m/s. La esclerosis múltiple altera esta velocidad.',
                datos: [
                    { l: 'Máxima', v: '120 m/s' },
                    { l: 'Sin mielina', v: '0.5-2 m/s' },
                    { l: 'Mecanismo', v: 'Saltatoria' },
                    { l: 'Nodos', v: 'De Ranvier' }
                ]
            },
            {
                name: 'Ondas Cerebrales (EEG)',
                region: 'Actividad Eléctrica Cortical',
                desc: 'Delta (0.5-4 Hz): sueño profundo. Theta (4-8 Hz): somnolencia, meditación. Alfa (8-13 Hz): vigilia relajada. Beta (13-30 Hz): concentración activa. Gamma (>30 Hz): procesamiento cognitivo superior y consciencia.',
                datos: [
                    { l: 'Delta', v: '0.5-4 Hz' },
                    { l: 'Alfa', v: '8-13 Hz' },
                    { l: 'Beta', v: '13-30 Hz' },
                    { l: 'Gamma', v: '>30 Hz' }
                ]
            },
            {
                name: 'Escala de Glasgow (GCS)',
                region: 'Evaluación Clínica de Consciencia',
                desc: 'Escala de 3-15 puntos que evalúa apertura ocular (1-4), respuesta verbal (1-5) y respuesta motora (1-6). GCS ≤8 indica coma y necesidad de intubación. Es el estándar en emergencias para evaluar traumatismo craneoencefálico.',
                datos: [
                    { l: 'Rango', v: '3-15 puntos' },
                    { l: 'Coma', v: '≤8' },
                    { l: 'Leve (TCE)', v: '13-15' },
                    { l: 'Componentes', v: 'O + V + M' }
                ]
            },
            {
                name: 'Presión Intracraneal (PIC)',
                region: 'Espacio Intracraneal',
                desc: 'Presión normal: 7-15 mmHg en adultos. La doctrina de Monro-Kellie establece que el volumen intracraneal (cerebro + sangre + LCR) es constante. Hipertensión intracraneal (>20 mmHg) puede causar herniación cerebral.',
                datos: [
                    { l: 'Normal', v: '7-15 mmHg' },
                    { l: 'Peligro', v: '>20 mmHg' },
                    { l: 'Doctrina', v: 'Monro-Kellie' },
                    { l: 'Triada Cushing', v: 'HTA+Bradi+resp' }
                ]
            }
        ]
    }
};

/* ──────────────────────────────────────────────────
   CATEGORÍAS PARA NAVEGACIÓN
   ────────────────────────────────────────────────── */
const CATEGORIES = [
    { key: 'patologias',       icon: '🩺', label: 'Patologías' },
    { key: 'alimentacion',     icon: '🥗', label: 'Neuronutrición' },
    { key: 'oxigenacion',      icon: '🫁', label: 'Oxigenación' },
    { key: 'neuroanatomia',    icon: '🔬', label: 'Neuroanatomía' },
    { key: 'neurotransmisores',icon: '⚡', label: 'Neurotransmisores' },
    { key: 'clinicos',         icon: '📊', label: 'Datos Clínicos' }
];


/* ──────────────────────────────────────────────────
   INYECTAR ESTILOS
   ────────────────────────────────────────────────── */
const styleEl = document.createElement('style');
styleEl.textContent = `
/* ═══ BOTÓN TOGGLE EN CTRL-BAR ═══ */
.cb.med-active {
    background: rgba(168,85,247,0.18) !important;
    border-color: #a78bfa !important;
    color: #a78bfa !important;
}

/* ═══ PANEL PRINCIPAL ═══ */
.med-panel {
    position: fixed;
    top: 66px;
    left: 310px;
    width: 340px;
    max-height: calc(100vh - 100px);
    background: rgba(12,16,28,0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    z-index: 55;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateX(-20px);
    opacity: 0;
    visibility: hidden;
    transition: transform 0.4s cubic-bezier(.16,1,.3,1),
                opacity 0.4s ease,
                visibility 0.4s;
}
.med-panel.vis {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
}

/* ═══ HEADER DEL PANEL ═══ */
.med-header {
    padding: 14px 16px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
}
.med-header-title {
    font-size: 0.6rem;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #a78bfa;
    margin-bottom: 10px;
}

/* ═══ TABS DE CATEGORÍAS ═══ */
.med-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}
.med-tab {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 9px;
    border-radius: 6px;
    border: 1px solid transparent;
    background: rgba(255,255,255,0.03);
    color: #8a94a8;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;
}
.med-tab:hover {
    background: rgba(255,255,255,0.06);
    color: #e8ecf4;
}
.med-tab.active {
    border-color: var(--tab-color);
    background: var(--tab-bg);
    color: var(--tab-color);
}
.med-tab-icon { font-size: 0.7rem; }

/* ═══ CONTENIDO SCROLLABLE ═══ */
.med-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px 12px 14px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.med-content::-webkit-scrollbar { width: 4px; }
.med-content::-webkit-scrollbar-track { background: transparent; }
.med-content::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
}

/* ═══ TARJETA DE ITEM ═══ */
.med-item {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    margin-bottom: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}
.med-item:hover {
    border-color: rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
}

/* Header de item (clickable) */
.med-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    cursor: pointer;
    gap: 8px;
}
.med-item-name {
    font-size: 0.78rem;
    font-weight: 600;
    color: #e8ecf4;
    flex: 1;
}
.med-item-region {
    font-size: 0.6rem;
    font-family: 'Space Mono', monospace;
    color: #555f73;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 130px;
}
.med-item-arrow {
    font-size: 0.6rem;
    color: #555f73;
    transition: transform 0.3s ease;
    flex-shrink: 0;
}
.med-item.open .med-item-arrow {
    transform: rotate(180deg);
}

/* Body de item (expandible) */
.med-item-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(.16,1,.3,1),
                padding 0.3s ease;
    padding: 0 12px;
}
.med-item.open .med-item-body {
    max-height: 350px;
    padding: 0 12px 12px;
}

.med-item-desc {
    font-size: 0.72rem;
    line-height: 1.55;
    color: #8a94a8;
    margin-bottom: 10px;
}

/* Mini-stats grid */
.med-item-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}
.med-stat {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 7px;
    padding: 6px 8px;
}
.med-stat-label {
    font-size: 0.55rem;
    color: #555f73;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}
.med-stat-val {
    font-size: 0.75rem;
    font-weight: 600;
    color: #e8ecf4;
    margin-top: 1px;
}

/* ═══ INDICADOR DE SECCIÓN (color-bar) ═══ */
.med-item-bar {
    width: 3px;
    border-radius: 3px;
    flex-shrink: 0;
    margin-right: 8px;
}

/* ═══ COUNTER ═══ */
.med-counter {
    font-size: 0.58rem;
    font-family: 'Space Mono', monospace;
    color: #555f73;
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px solid rgba(255,255,255,0.04);
    text-align: center;
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 1100px) {
    .med-panel {
        left: 14px;
        top: auto;
        bottom: 75px;
        width: calc(100vw - 28px);
        max-height: 55vh;
    }
}
`;
document.head.appendChild(styleEl);


/* ──────────────────────────────────────────────────
   INICIALIZACIÓN
   ────────────────────────────────────────────────── */
waitForEngine().then(() => {

    /* ── Crear botón en ctrl-bar ── */
    const ctrlBar = document.querySelector('.ctrl-bar');
    if (!ctrlBar) return;

    const divider = document.createElement('div');
    divider.className = 'cd';
    ctrlBar.appendChild(divider);

    const btn = document.createElement('button');
    btn.className = 'cb';
    btn.id = 'bMed';
    btn.title = 'Info Médica Extendida';
    btn.textContent = '📖';
    ctrlBar.appendChild(btn);

    /* ── Crear panel ── */
    const panel = document.createElement('div');
    panel.className = 'med-panel';
    panel.id = 'medPanel';
    document.body.appendChild(panel);

    /* ── Header con tabs ── */
    const header = document.createElement('div');
    header.className = 'med-header';

    const title = document.createElement('div');
    title.className = 'med-header-title';
    title.textContent = '🧠 Información Médica Extendida';
    header.appendChild(title);

    const tabs = document.createElement('div');
    tabs.className = 'med-tabs';

    CATEGORIES.forEach((cat, i) => {
        const tab = document.createElement('button');
        tab.className = 'med-tab' + (i === 0 ? ' active' : '');
        tab.dataset.key = cat.key;

        const catData = MEDICAL_DATA[cat.key];
        tab.style.setProperty('--tab-color', catData.color);
        tab.style.setProperty('--tab-bg', catData.color + '18');

        tab.innerHTML = `<span class="med-tab-icon">${cat.icon}</span>${cat.label}`;
        tab.addEventListener('click', () => switchCategory(cat.key));
        tabs.appendChild(tab);
    });

    header.appendChild(tabs);
    panel.appendChild(header);

    /* ── Content area ── */
    const content = document.createElement('div');
    content.className = 'med-content';
    content.id = 'medContent';
    panel.appendChild(content);

    /* ── Counter ── */
    const counter = document.createElement('div');
    counter.className = 'med-counter';
    counter.id = 'medCounter';
    panel.appendChild(counter);

    /* ── Render categoria ── */
    function switchCategory(key) {
        document.querySelectorAll('.med-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.key === key);
        });
        renderItems(key);
    }

    function renderItems(key) {
        const cat = MEDICAL_DATA[key];
        if (!cat) return;

        content.innerHTML = '';
        const total = cat.items.length;

        cat.items.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'med-item';

            card.innerHTML = `
                <div class="med-item-head">
                    <div class="med-item-bar" style="background:${cat.color};"></div>
                    <div style="flex:1;min-width:0;">
                        <div class="med-item-name">${item.name}</div>
                        <div class="med-item-region">${item.region}</div>
                    </div>
                    <div class="med-item-arrow">▼</div>
                </div>
                <div class="med-item-body">
                    <div class="med-item-desc">${item.desc}</div>
                    <div class="med-item-stats">
                        ${item.datos.map(d =>
                            `<div class="med-stat">
                                <div class="med-stat-label">${d.l}</div>
                                <div class="med-stat-val">${d.v}</div>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;

            const head = card.querySelector('.med-item-head');
            head.addEventListener('click', () => {
                const wasOpen = card.classList.contains('open');
                /* Cerrar todos los demás */
                content.querySelectorAll('.med-item.open').forEach(c => {
                    if (c !== card) c.classList.remove('open');
                });
                card.classList.toggle('open', !wasOpen);
            });

            /* Animación escalonada */
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            card.style.transition = `opacity 0.35s ease ${idx * 0.04}s, transform 0.35s ease ${idx * 0.04}s`;
            content.appendChild(card);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            });
        });

        counter.textContent = `${total} elementos — ${cat.title}`;
    }

    /* ── Toggle panel ── */
    let panelVisible = false;
    btn.addEventListener('click', () => {
        panelVisible = !panelVisible;
        panel.classList.toggle('vis', panelVisible);
        btn.classList.toggle('med-active', panelVisible);
        if (panelVisible && content.children.length === 0) {
            renderItems('patologias');
        }
    });

    /* Render inicial (precarga) */
    renderItems('patologias');

    console.log('✅ Brain Medical Info: 6 categorías, ' +
        Object.values(MEDICAL_DATA).reduce((s, c) => s + c.items.length, 0) +
        ' elementos cargados');

}).catch(err => {
    console.warn('⚠️ Brain Medical Info:', err);
});