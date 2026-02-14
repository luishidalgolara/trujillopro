/**
 * ═══════════════════════════════════════════════════
 *  SKELETON SYSTEM — Datos Clínicos y Pruebas
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__SKELETON_DATA = window.__SKELETON_DATA || {};

window.__SKELETON_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'Densitometría Ósea (DEXA)',
            region: 'Gold Standard — Densidad Mineral Ósea',
            desc: 'Método dual-energy X-ray absorptiometry mide DMO (g/cm²) en columna lumbar (L1-L4), cadera (cuello femoral, cadera total), antebrazo. Radiación mínima (1-10 μSv). T-score: DE respecto joven adulto (pico masa ósea). Z-score: DE respecto edad/sexo. Interpretación OMS: Normal T≥-1.0, Osteopenia -1.0 a -2.5, Osteoporosis ≤-2.5. Cada ↓1 DE: ↑ riesgo fractura 1.5-2.5×. Limitaciones: no mide calidad ósea, artefactos (artrosis, calcificaciones vasculares falsean resultado).',
            datos: [
                { l: 'Radiación', v: '1-10 μSv' },
                { l: 'Sitios', v: 'Columna, cadera, antebrazo' },
                { l: 'Osteoporosis', v: 'T-score ≤-2.5' },
                { l: 'Cada -1 DE', v: '↑1.5-2.5× fractura' }
            ]
        },
        {
            name: 'Radiografía Simple',
            region: 'Imagen Estructural Básica',
            desc: 'Método más accesible para evaluar hueso. Detecta fracturas, deformidades, lesiones líticas/blásticas. Osteoporosis visible: pérdida >30% masa ósea (radiolucidez, adelgazamiento cortical, acentuación trabéculas verticales). Fracturas vertebrales: pérdida altura >20% (grados semicuantitativos Genant). Artrosis: estrechamiento espacio articular, osteofitos, esclerosis subcondral, quistes. Tumores: líticos (mieloma, metástasis riñón), blásticos (próstata), mixtos (mama). Limitación: solo morfología, no DMO cuantitativa.',
            datos: [
                { l: 'Detecta osteopenia', v: '>30% pérdida masa' },
                { l: 'Fx vertebral', v: '>20% pérdida altura' },
                { l: 'Artrosis', v: 'Osteofitos + esclerosis' },
                { l: 'Tumores', v: 'Lítico/blástico' }
            ]
        },
        {
            name: 'Tomografía Computarizada (TC)',
            region: 'Imagen 3D — Densidad Volumétrica',
            desc: 'Reconstrucción tridimensional, superior a Rx para fracturas complejas (columna, pelvis, acetábulo). TC cuantitativa (QCT): mide DMO volumétrica (mg/cm³) separando hueso trabecular de cortical. Más sensible que DEXA para cambios columna. Radiación mayor (1-3 mSv). Usos: planificación quirúrgica fracturas, evaluación consolidación, tumores óseos (destrucción cortical, masa partes blandas), osteomielitis (secuestros, gas), displasias óseas.',
            datos: [
                { l: 'Radiación', v: '1-3 mSv' },
                { l: 'QCT', v: 'DMO volumétrica' },
                { l: 'Ventaja', v: 'Trabecular vs cortical' },
                { l: 'Uso', v: 'Fx complejas, tumores' }
            ]
        },
        {
            name: 'Resonancia Magnética (RMN)',
            region: 'Tejidos Blandos — Edema Óseo',
            desc: 'Superior para tejidos blandos, médula ósea, edema. No radiación. Secuencias: T1 (anatomía, médula grasa brillante, tumor oscuro), T2 (edema brillante), STIR (suprime grasa, edema muy brillante). Detecta: fracturas ocultas (edema antes línea fractura visible), osteomielitis (edema, abscesos), tumores (caracterización, extensión medular/partes blandas), necrosis avascular (pérdida señal cabeza femoral), edema óseo (contusión, estrés). Limitación: costosa, lenta, contraindicaciones (marcapasos, clips ferromagnéticos).',
            datos: [
                { l: 'Radiación', v: 'No' },
                { l: 'T2/STIR', v: 'Edema brillante' },
                { l: 'Detecta', v: 'Fx oculta, tumor, infección' },
                { l: 'Limitación', v: 'Costo, contraindicaciones' }
            ]
        },
        {
            name: 'Gammagrafía Ósea',
            region: 'Imagen Funcional — Tc-99m',
            desc: 'Inyección IV de Tc-99m metileno difosfonato (MDP) que se une a hidroxiapatita en zonas de alta actividad osteoblástica. Captación ↑: fracturas (incluye estrés, ocultas), tumores (primarios y metástasis), infección, Paget, artritis, necrosis avascular (fase tardía). Imágenes cuerpo completo (3 horas post-inyección). Sensible pero poco específica. Usos: screening metástasis óseas (múltiples focos), localizar fractura estrés, prosthesis loosening (aflojamiento protésico). Dosis radiación: 4-6 mSv. SPECT/CT mejora localización anatómica.',
            datos: [
                { l: 'Radiofármaco', v: 'Tc-99m MDP' },
                { l: 'Captación ↑', v: 'Actividad osteoblástica' },
                { l: 'Dosis', v: '4-6 mSv' },
                { l: 'Uso', v: 'Metástasis, fx estrés' }
            ]
        },
        {
            name: 'Fosfatasa Alcalina (FA)',
            region: 'Marcador Formación Ósea',
            desc: 'Enzima producida por osteoblastos durante formación ósea. FA total incluye isoformas hepática (mayoría), ósea, intestinal, placentaria. FA ósea específica (BAP) más específica. Elevación: Paget (muy alta, 10-25× normal), osteomalacia/raquitismo, hiperparatiroidismo, fracturas en consolidación, tumores óseos (osteosarcoma, metástasis blásticas), crecimiento adolescente. Disminución: hipofosfatasia (déficit FA, defecto mineralización). Valores normales adultos: 30-120 U/L (varía método). Pico adolescencia: hasta 500 U/L (crecimiento).',
            datos: [
                { l: 'Normal adultos', v: '30-120 U/L' },
                { l: 'Paget', v: 'Muy alta 10-25×' },
                { l: 'Elevación', v: 'Formación ósea ↑' },
                { l: 'BAP', v: 'Isoforma ósea específica' }
            ]
        },
        {
            name: 'Telopéptidos (CTX, NTX)',
            region: 'Marcadores Resorción Ósea',
            desc: 'Fragmentos de degradación colágeno tipo I liberados durante resorción osteoclástica. CTX (C-terminal telopeptide): suero, refleja resorción actual. NTX (N-terminal telopeptide): orina o suero. Elevación: osteoporosis acelerada, hiperparatiroidismo, Paget, metástasis osteolíticas, hipertiroidismo. Útil para: monitorizar respuesta a bifosfonatos (↓ 30-70% en 3-6 meses indica eficacia), predecir pérdida ósea rápida. Variabilidad circadiana (mínimo tarde), ayuno recomendado. Valores: CTX <0.3-0.5 ng/mL (posmenopáusica), mayor en premenopáusica.',
            datos: [
                { l: 'CTX', v: 'Suero, resorción actual' },
                { l: 'NTX', v: 'Orina o suero' },
                { l: 'Uso', v: 'Monitorizar bifosfonatos' },
                { l: '↓ Bifosfonatos', v: '30-70% en 3-6m' }
            ]
        },
        {
            name: 'Calcio y Fósforo Séricos',
            region: 'Homeostasis Mineral',
            desc: 'Calcio total: 8.5-10.5 mg/dL (2.1-2.6 mmol/L), 50% ionizado (activo), 40% unido albúmina, 10% aniones. Calcio ionizado: 4.5-5.5 mg/dL (1.1-1.4 mmol/L), más preciso. Fósforo: 2.5-4.5 mg/dL (0.8-1.5 mmol/L). Hipercalcemia: hiperparatiroidismo (PTH ↑, P ↓), malignidad (PTHrP, osteólisis), hipervitaminosis D. Hipocalcemia: hipoparatiroidismo, déficit vitamina D, IRC, hipomagnesemia. Hiperfosfatemia: IRC. Hipofosfatemia: raquitismo/osteomalacia hipofosfatémica, malabsorción. Calcio corregido por albúmina: Ca corr = Ca medido + 0.8×(4-albúmina).',
            datos: [
                { l: 'Ca total', v: '8.5-10.5 mg/dL' },
                { l: 'Ca ionizado', v: '4.5-5.5 mg/dL' },
                { l: 'Fósforo', v: '2.5-4.5 mg/dL' },
                { l: 'Corrección', v: 'Por albúmina' }
            ]
        },
        {
            name: 'Hormona Paratiroidea (PTH)',
            region: 'Regulación Calcio — Remodelación',
            desc: 'PTH secretada por paratiroides en respuesta a hipocalcemia. Eleva calcemia: ↑ resorción ósea (osteoclastos), ↑ reabsorción renal Ca²⁺, ↑ 1α-hidroxilasa (calcitriol). Valores normales: 10-65 pg/mL (varía ensayo). Hiperparatiroidismo primario: PTH ↑, Ca ↑, P ↓, FA ↑, osteítis fibrosa quística. Hiperparatiroidismo secundario (IRC): PTH muy ↑, Ca normal-bajo, P ↑. Hipoparatiroidismo: PTH ↓, Ca ↓, P ↑. PTH intacta (iPTH) mide molécula completa 1-84 aminoácidos.',
            datos: [
                { l: 'Normal', v: '10-65 pg/mL' },
                { l: 'Primario', v: 'PTH↑ Ca↑ P↓' },
                { l: 'Secundario IRC', v: 'PTH↑↑ Ca↓ P↑' },
                { l: 'Función', v: '↑ Calcemia' }
            ]
        },
        {
            name: '25-Hidroxivitamina D',
            region: 'Estado Vitamina D — Metabolito Circulante',
            desc: 'Mejor marcador de estado vitamina D corporal. Vida media 2-3 semanas. Valores óptimos controvertidos. Deficiencia: <20 ng/mL (<50 nmol/L). Insuficiencia: 20-30 ng/mL (50-75 nmol/L). Suficiencia: >30 ng/mL (>75 nmol/L). Objetivo terapéutico: 30-50 ng/mL. Toxicidad: >100-150 ng/mL (hipercalcemia, hipercalciuria). Déficit asociado a osteomalacia/raquitismo, osteoporosis, debilidad muscular (caídas). Suplementación: déficit severo 50,000 UI/semana × 8 semanas, luego mantenimiento 1000-2000 UI/día.',
            datos: [
                { l: 'Deficiencia', v: '<20 ng/mL' },
                { l: 'Suficiencia', v: '>30 ng/mL' },
                { l: 'Objetivo', v: '30-50 ng/mL' },
                { l: 'Toxicidad', v: '>100-150 ng/mL' }
            ]
        }
    ]
};

console.log('✅ Skeleton Data: Datos Clínicos cargados');
