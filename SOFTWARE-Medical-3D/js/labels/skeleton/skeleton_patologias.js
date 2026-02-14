/**
 * ═══════════════════════════════════════════════════
 *  SKELETON SYSTEM — Patologías Óseas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__SKELETON_DATA = window.__SKELETON_DATA || {};

window.__SKELETON_DATA.patologias = {
    title: 'Patologías Óseas',
    icon: '🩺',
    color: '#e8675a',
    items: [
        {
            name: 'Osteoporosis',
            region: 'Enfermedad Metabólica Ósea',
            desc: 'Disminución de masa ósea y deterioro microarquitectura, aumenta fragilidad y riesgo fractura. Primaria (posmenopáusica tipo I, senil tipo II) o secundaria (corticoides, hipertiroidismo). Criterio OMS: T-score ≤-2.5 en densitometría. Fracturas típicas: vértebras (compresión), cadera (cuello femoral), Colles (radio distal). Prevención: calcio 1200 mg/día, vitamina D 800-1000 UI/día, ejercicio carga, bifosfonatos.',
            datos: [
                { l: 'Definición OMS', v: 'T-score ≤-2.5' },
                { l: 'Prevalencia >50a', v: '♀30%, ♂12%' },
                { l: 'Fractura típica', v: 'Cadera, vértebra, Colles' },
                { l: 'Tratamiento', v: 'Bifosfonatos' }
            ]
        },
        {
            name: 'Fracturas',
            region: 'Solución de Continuidad Ósea',
            desc: 'Rotura completa o incompleta del hueso. Tipos: transversa, oblicua, espiral, conminuta, compresión. Cerrada (piel íntegra) vs abierta (expuesta, riesgo infección). Consolidación: hematoma (día 0), callo fibrocartilaginoso (semana 2-3), callo óseo (semana 3-6), remodelación (meses-años). Complicaciones: no unión, unión viciosa, síndrome compartimental, embolia grasa, infección. Factores que retrasan: tabaquismo, DM, corticoides, movilidad, mala vascularización.',
            datos: [
                { l: 'Consolidación', v: '6-12 semanas' },
                { l: 'Complicación', v: 'No unión ~5-10%' },
                { l: 'Fémur proximal', v: 'Mortalidad 1a ~20%' },
                { l: 'Retrasan', v: 'Tabaco, DM, edad' }
            ]
        },
        {
            name: 'Artrosis (Osteoartritis)',
            region: 'Enfermedad Articular Degenerativa',
            desc: 'Degeneración progresiva cartílago articular con remodelación ósea subcondral. Primaria (idiopática, edad) o secundaria (trauma, displasia, metabólica). Fisiopatología: desgaste cartílago → pérdida proteoglicanos → fisuras → exposición hueso subcondral → osteofitos, esclerosis, quistes subcondrales. Síntomas: dolor mecánico (mejora reposo), rigidez matutina <30 min, crepitación. Afecta: rodilla, cadera, manos (IFD-nódulos Heberden, IFP-Bouchard), columna. Tratamiento: analgésicos, AINE, infiltración, prótesis articular.',
            datos: [
                { l: 'Prevalencia >65a', v: '~50-60%' },
                { l: 'Articulaciones', v: 'Rodilla, cadera, manos' },
                { l: 'Síntoma clave', v: 'Dolor mecánico' },
                { l: 'Rx', v: 'Osteofitos, esclerosis' }
            ]
        },
        {
            name: 'Artritis Reumatoide',
            region: 'Artropatía Inflamatoria Autoinmune',
            desc: 'Enfermedad autoinmune sistémica que afecta primariamente articulaciones sinoviales. Sinovitis crónica → pannus (tejido granulación) erosiona cartílago y hueso. Síntomas: dolor, rigidez matutina >1h, inflamación, deformidad. Distribución: simétrica, manos (MCF, IFP, no IFD), muñecas, pies (MTF). Deformidades: desviación cubital, cuello cisne, boutonnière. Extraarticular: nódulos reumatoideos, fibrosis pulmonar, vasculitis. Diagnóstico: factor reumatoide (70-80%), anti-CCP (>95% especificidad). Tratamiento: DMARDs (metotrexato), anti-TNF.',
            datos: [
                { l: 'Prevalencia', v: '~1%, ♀:♂ 3:1' },
                { l: 'Rigidez matutina', v: '>1 hora' },
                { l: 'Anti-CCP', v: '>95% específico' },
                { l: 'Tratamiento', v: 'Metotrexato, anti-TNF' }
            ]
        },
        {
            name: 'Osteomielitis',
            region: 'Infección Ósea',
            desc: 'Infección del hueso y médula ósea, bacteriana (95% S. aureus), fúngica, micobacteriana. Vías: hematógena (niños, ancianos), contigüidad (trauma, cirugía), inoculación directa. Aguda: fiebre, dolor, edema local. Crónica: fístulas, secuestros óseos (fragmentos necróticos avasculares), involucro (hueso nuevo perióstico). Diagnóstico: hemocultivos, biopsia/cultivo óseo, RMN (alta sensibilidad). Tratamiento: antibióticos IV 4-6 semanas, desbridamiento quirúrgico (crónica). Complicaciones: fractura patológica, sepsis, absceso.',
            datos: [
                { l: 'Agente', v: 'S. aureus ~90%' },
                { l: 'Vía común niños', v: 'Hematógena' },
                { l: 'Diagnóstico', v: 'RMN, biopsia' },
                { l: 'Antibióticos IV', v: '4-6 semanas' }
            ]
        },
        {
            name: 'Enfermedad de Paget',
            region: 'Osteítis Deformante',
            desc: 'Trastorno focal de remodelación ósea: resorción osteoclástica excesiva seguida de formación ósea desorganizada. Hueso: aumentado tamaño, vascular, desordenado, débil. Afecta: pelvis (70%), fémur, cráneo, tibia, columna. Fases: lítica (resorción), mixta, blástica (esclerótica). Síntomas: mayormente asintomático, dolor óseo, deformidad, fracturas, sordera (compresión VIII par), insuficiencia cardíaca (alto gasto por hipervascularización). Complicación rara: sarcoma osteogénico (<1%). Diagnóstico: fosfatasa alcalina ↑↑, Rx, gammagrafía. Tratamiento: bifosfonatos.',
            datos: [
                { l: 'Prevalencia >40a', v: '~1-3%' },
                { l: 'Marcador', v: 'FA ↑↑' },
                { l: 'Complicación rara', v: 'Sarcoma <1%' },
                { l: 'Tratamiento', v: 'Bifosfonatos' }
            ]
        },
        {
            name: 'Osteogénesis Imperfecta',
            region: 'Enfermedad Genética — Huesos Frágiles',
            desc: 'Grupo de trastornos genéticos del colágeno tipo I (genes COL1A1, COL1A2). Espectro clínico variable. Tipo I (leve): fracturas múltiples, escleróticas azules, hipoacusia, talla normal. Tipo II (letal): fracturas intraútero, deformidades severas, muerte perinatal. Tipo III (deformante progresiva): fracturas al nacer, deformidades severas, talla muy baja, dentinogénesis imperfecta. Tipo IV (moderada): fracturas, deformidad variable. Tratamiento: bifosfonatos (↑ DMO), cirugía correctiva (envaramiento intramedular), fisioterapia.',
            datos: [
                { l: 'Incidencia', v: '~1/10,000-20,000' },
                { l: 'Genes', v: 'COL1A1, COL1A2' },
                { l: 'Tipo I', v: 'Leve (más común)' },
                { l: 'Tratamiento', v: 'Bifosfonatos' }
            ]
        },
        {
            name: 'Raquitismo y Osteomalacia',
            region: 'Defecto de Mineralización',
            desc: 'Raquitismo (niños, placas crecimiento abiertas): déficit vitamina D, calcio o fósforo causa mineralización defectuosa. Deformidades: rosario raquítico (uniones costocondrales), piernas arqueadas, cráneo reblandecido. Osteomalacia (adultos): osteoide no mineralizado acumula. Dolor óseo, debilidad muscular proximal, fracturas (pseudofracturas de Looser-Milkman). Causas: déficit vitamina D (solar, dietético, malabsorción), IRC (déficit calcitriol), hipofosfatemia (hereditaria, pérdida renal). Tratamiento: vitamina D, calcio, corrección causa base.',
            datos: [
                { l: 'Raquitismo', v: 'Niños (placas abiertas)' },
                { l: 'Osteomalacia', v: 'Adultos' },
                { l: 'Causa común', v: 'Déficit vitamina D' },
                { l: 'Tratamiento', v: 'Vit D + Ca' }
            ]
        },
        {
            name: 'Gota',
            region: 'Artropatía por Cristales — Hiperuricemia',
            desc: 'Depósito de cristales de urato monosódico en articulaciones y tejidos por hiperuricemia crónica (>7 mg/dL). Ataque agudo: monoartritis severa (90% 1ª MTF-podagra), inicio súbito nocturno, eritema, dolor intenso. Gota tofácea crónica: tofos (agregados de cristales) en articulaciones, cartílago auricular, tendón Aquiles. Causas: sobreproducción (linfomas, psoriasis) o infraexcreción renal (90%, diuréticos, IRC). Diagnóstico: artrocentesis (cristales aciculares birrefringencia negativa). Tratamiento agudo: AINE, colchicina, corticoides. Prevención: alopurinol (↓ síntesis), febuxostat.',
            datos: [
                { l: 'Hiperuricemia', v: '>7 mg/dL' },
                { l: 'Articulación', v: '90% 1ª MTF (podagra)' },
                { l: 'Cristales', v: 'Birrefringencia (-)' },
                { l: 'Prevención', v: 'Alopurinol' }
            ]
        },
        {
            name: 'Tumores Óseos',
            region: 'Neoplasias Primarias y Metastásicas',
            desc: 'Benignos: osteocondroma (más común), osteoma osteoide (dolor nocturno mejora con AAS), quiste óseo simple. Malignos primarios: osteosarcoma (adolescentes, metáfisis fémur/tibia distal, "sol radiante" en Rx), condrosarcoma (adultos, pelvis), sarcoma Ewing (niños, diáfisis, "piel cebolla"). Metástasis óseas: más comunes que primarios, origen: próstata (blásticas), mama, pulmón, riñón, tiroides (líticas). Dolor, fracturas patológicas, hipercalcemia. Tratamiento primarios: cirugía + quimioterapia. Metástasis: bifosfonatos, radioterapia, tratamiento primario.',
            datos: [
                { l: 'Benigno común', v: 'Osteocondroma' },
                { l: 'Maligno joven', v: 'Osteosarcoma' },
                { l: 'Metástasis', v: 'Próstata, mama, pulmón' },
                { l: 'Próstata', v: 'Blásticas' }
            ]
        }
    ]
};

console.log('✅ Skeleton Data: Patologías cargadas');
