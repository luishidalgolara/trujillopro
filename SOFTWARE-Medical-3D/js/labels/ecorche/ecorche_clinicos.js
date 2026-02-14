/**
 * ═══════════════════════════════════════════════════
 *  ÉCORCHÉ — Datos Clínicos de Referencia
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__ECORCHE_DATA = window.__ECORCHE_DATA || {};

window.__ECORCHE_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'Electromiografía (EMG)',
            region: 'Evaluación Neuromuscular — Electrofisiología',
            desc: 'Registra la actividad eléctrica muscular mediante electrodos de aguja. Evalúa actividad de inserción, actividad espontánea (fibrilaciones = denervación), morfología de las unidades motoras (PUM) y patrón de reclutamiento. Diferencia miopatía (PUM pequeños/polifásicos) de neuropatía (PUM grandes/reducidos).',
            datos: [
                { l: 'PUM normal', v: '5-15 ms, 200-3000 μV' },
                { l: 'Fibrilación', v: 'Denervación activa' },
                { l: 'Miopatía', v: 'PUM pequeños/polifásicos' },
                { l: 'Neuropatía', v: 'PUM grandes/reducidos' }
            ]
        },
        {
            name: 'Creatina Fosfoquinasa (CPK/CK)',
            region: 'Marcador Sérico — Daño Muscular',
            desc: 'Enzima intracelular liberada al dañarse la membrana del miocito. CK-MM (muscular, 95% del total sérico), CK-MB (cardíaca), CK-BB (cerebral). Normal: 30-200 U/L. Elevaciones: ejercicio intenso (3-10×), miopatías (5-50×), rabdomiólisis (>50×, puede superar 100.000 U/L). Pico a las 24-72 h, vida media 36 h.',
            datos: [
                { l: 'Normal', v: '30-200 U/L' },
                { l: 'Post-ejercicio', v: '3-10× normal' },
                { l: 'Rabdomiólisis', v: '>50× (hasta 100.000+)' },
                { l: 'Pico sérico', v: '24-72 h post-lesión' }
            ]
        },
        {
            name: 'Escala MRC de Fuerza Muscular',
            region: 'Evaluación Clínica — Exploración Física',
            desc: 'Escala del Medical Research Council: 0/5 sin contracción, 1/5 contracción visible sin movimiento, 2/5 movimiento sin gravedad, 3/5 contra gravedad, 4/5 contra resistencia parcial, 5/5 fuerza normal. Estandarizada mundialmente para seguimiento de enfermedades neuromusculares.',
            datos: [
                { l: '0/5', v: 'Sin contracción' },
                { l: '3/5', v: 'Contra gravedad' },
                { l: '5/5', v: 'Fuerza normal' },
                { l: 'Uso', v: 'Seguimiento NM' }
            ]
        },
        {
            name: 'Biopsia Muscular',
            region: 'Diagnóstico Histopatológico',
            desc: 'Muestra quirúrgica (deltoides o cuádriceps) para análisis histológico, histoquímico e inmunohistoquímico. Detecta distrofias (ausencia de distrofina), miopatías inflamatorias (infiltrado linfocitario), miopatías metabólicas (depósitos glucógeno/lípidos) y mitocondriales (fibras rojo rasgadas con tinción de Gomori).',
            datos: [
                { l: 'Músc. biopsia', v: 'Deltoides / cuádriceps' },
                { l: 'Duchenne', v: 'Ausencia distrofina' },
                { l: 'Dermatomiositis', v: 'Atrofia perifascicular' },
                { l: 'Mitocondrial', v: 'Fibras rojo rasgadas' }
            ]
        },
        {
            name: 'Ecografía Musculoesquelética',
            region: 'Imagen Diagnóstica — Tiempo Real',
            desc: 'Evalúa morfología muscular, grosor, ecogenicidad y arquitectura fascicular en tiempo real. Detecta desgarros (solución de continuidad + hematoma), miositis (↑ ecogenicidad), atrofia (↓ grosor + infiltración grasa). La elastografía añade rigidez tisular. Ventajas: dinámico, sin radiación, bajo costo.',
            datos: [
                { l: 'Resolución', v: '0.1-0.5 mm' },
                { l: 'Dinámico', v: 'Evaluación en movimiento' },
                { l: 'Desgarro', v: 'Defecto + hematoma' },
                { l: 'Elastografía', v: 'Rigidez tisular' }
            ]
        },
        {
            name: 'RMN Muscular',
            region: 'Imagen por Resonancia Magnética',
            desc: 'Gold standard para tejidos blandos musculares. T1 muestra anatomía e infiltración grasa (atrofia crónica). T2/STIR detecta edema muscular agudo (inflamación, desgarro reciente, denervación). Permite cuantificar volumen muscular y porcentaje de grasa intramuscular con precisión submilimétrica.',
            datos: [
                { l: 'T1', v: 'Anatomía + grasa' },
                { l: 'T2/STIR', v: 'Edema muscular' },
                { l: 'Resolución', v: '<1 mm' },
                { l: 'Sin radiación', v: 'No ionizante' }
            ]
        },
        {
            name: 'Velocidad de Conducción Nerviosa',
            region: 'Nervio Periférico — Electrofisiología',
            desc: 'Mide la velocidad de propagación del impulso eléctrico por nervios motores o sensitivos. Normal motor: 40-70 m/s; sensitivo: 40-65 m/s. Velocidad <70-80% del límite inferior sugiere desmielinización (Guillain-Barré, CIDP). Amplitud reducida con velocidad normal sugiere axonopatía. Complementa la EMG.',
            datos: [
                { l: 'Motor normal', v: '40-70 m/s' },
                { l: 'Sensitivo normal', v: '40-65 m/s' },
                { l: 'Desmielinización', v: '↓↓ Velocidad' },
                { l: 'Axonopatía', v: '↓ Amplitud, vel. normal' }
            ]
        }
    ]
};

console.log('✅ Écorché Data: Datos Clínicos cargados');
