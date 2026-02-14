/**
 * ═══════════════════════════════════════════════════
 *  CIRCULATORY — Fisiología Cardíaca
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__CIRC_DATA = window.__CIRC_DATA || {};

window.__CIRC_DATA.fisiologia = {
    title: 'Fisiología Cardíaca',
    icon: '⚡',
    color: '#f59e0b',
    items: [
        {
            name: 'Ciclo Cardíaco',
            region: 'Cámaras Cardíacas — Válvulas',
            desc: 'Secuencia repetitiva de sístole (contracción) y diástole (relajación). Dura ~0.8 s a 75 bpm. Sístole auricular → sístole ventricular isovolumétrica → eyección → relajación isovolumétrica → llenado pasivo. Los ruidos S1 (cierre AV) y S2 (cierre semilunares) marcan los eventos.',
            datos: [
                { l: 'Duración', v: '~0.8 s (75 bpm)' },
                { l: 'Sístole', v: '~0.3 s' },
                { l: 'Diástole', v: '~0.5 s' },
                { l: 'Ruidos', v: 'S1 (AV) S2 (SL)' }
            ]
        },
        {
            name: 'Sistema de Conducción',
            region: 'Nodo SA → Nodo AV → His → Purkinje',
            desc: 'El nodo sinoauricular (marcapasos natural, 60-100 bpm) genera el impulso. Se propaga por las aurículas, llega al nodo AV (retraso ~0.1 s para permitir llenado ventricular), baja por el haz de His, ramas derecha e izquierda, y llega a las fibras de Purkinje para contraer los ventrículos.',
            datos: [
                { l: 'Nodo SA', v: '60-100 bpm' },
                { l: 'Nodo AV', v: '40-60 bpm' },
                { l: 'Retraso AV', v: '~0.1 s' },
                { l: 'Purkinje vel.', v: '~4 m/s' }
            ]
        },
        {
            name: 'Electrocardiograma (ECG)',
            region: 'Actividad Eléctrica — 12 Derivaciones',
            desc: 'Registro gráfico de la actividad eléctrica cardíaca. Onda P: despolarización auricular. Complejo QRS: despolarización ventricular (~0.06-0.10 s). Onda T: repolarización ventricular. El intervalo QT prolongado predispone a arritmias fatales.',
            datos: [
                { l: 'Onda P', v: 'Despolarz. aur.' },
                { l: 'QRS normal', v: '0.06-0.10 s' },
                { l: 'Onda T', v: 'Repolariz. vent.' },
                { l: 'QT normal', v: '<0.44 s' }
            ]
        },
        {
            name: 'Ley de Frank-Starling',
            region: 'Ventrículos — Sarcómeros',
            desc: 'A mayor volumen de llenado ventricular (precarga), mayor fuerza de contracción y volumen sistólico, hasta un límite fisiológico. Los sarcómeros se estiran optimizando el solapamiento actina-miosina. Es el mecanismo intrínseco de autorregulación del gasto cardíaco.',
            datos: [
                { l: 'Principio', v: 'Precarga → Fuerza' },
                { l: 'Límite', v: 'Sobreestiramiento' },
                { l: 'Mecanismo', v: 'Actina-miosina' },
                { l: 'Aplicación', v: 'Autorregulación' }
            ]
        },
        {
            name: 'Regulación Autonómica',
            region: 'SNA Simpático / Parasimpático',
            desc: 'El simpático (noradrenalina) aumenta frecuencia (cronotropismo+), fuerza (inotropismo+) y velocidad de conducción (dromotropismo+). El parasimpático (acetilcolina vía nervio vago) reduce la frecuencia cardíaca. Los barorreceptores del seno carotídeo y cayado aórtico modulan el reflejo.',
            datos: [
                { l: 'Simpático', v: '↑ FC, ↑ Fuerza' },
                { l: 'Parasimpático', v: '↓ FC (vago)' },
                { l: 'Barorreceptores', v: 'Seno carotídeo' },
                { l: 'Neurotransm.', v: 'NA / ACh' }
            ]
        },
        {
            name: 'Hemostasia y Coagulación',
            region: 'Endotelio — Plaquetas — Factores',
            desc: 'Proceso en 3 fases: hemostasia primaria (tapón plaquetario por adhesión y agregación), cascada de coagulación (vía intrínseca y extrínseca convergen en factor Xa → trombina → fibrina), y fibrinólisis (plasmina disuelve el coágulo). El equilibrio previene trombosis y hemorragia.',
            datos: [
                { l: 'Plaquetas norm.', v: '150-400×10³/μL' },
                { l: 'Vía extrínseca', v: 'Factor tisular' },
                { l: 'Producto final', v: 'Red de fibrina' },
                { l: 'Fibrinólisis', v: 'Plasmina' }
            ]
        }
    ]
};

console.log('✅ Circulatory Data: Fisiología cargada');
