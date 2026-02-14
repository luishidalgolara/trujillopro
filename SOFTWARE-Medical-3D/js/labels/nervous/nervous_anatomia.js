/**
 * ═══════════════════════════════════════════════════
 *  NERVOUS SYSTEM — Anatomía Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__NERVOUS_DATA = window.__NERVOUS_DATA || {};

window.__NERVOUS_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🔬',
    color: '#d4c45a',
    items: [
        {
            name: 'Neurona',
            region: 'Unidad Funcional — Célula Excitable',
            desc: 'Célula especializada en transmisión de impulsos eléctricos. Componentes: soma (cuerpo celular con núcleo), dendritas (reciben señales), axón (transmite impulsos), terminal axónica (libera neurotransmisores). Clasificación: multipolares (motoras, mayoría SNC), bipolares (retina, oído), unipolares/pseudounipolares (sensoriales). Vida: no se dividen en adultos.',
            datos: [
                { l: 'Total humano', v: '~86×10⁹' },
                { l: 'Soma', v: '4-100 μm' },
                { l: 'Axón', v: 'Hasta 1 m' },
                { l: 'Tipos', v: 'Multi/Bi/Unipolar' }
            ]
        },
        {
            name: 'Sinapsis',
            region: 'Unión Interneuronal — Comunicación',
            desc: 'Contacto especializado entre neuronas para transmitir información. Sinapsis química (mayoría): neurotransmisor atraviesa hendidura sináptica (~20-40 nm). Sinapsis eléctrica: uniones gap permiten paso directo de iones (sincronización rápida). Una neurona recibe miles de sinapsis. Plasticidad sináptica: base del aprendizaje y memoria.',
            datos: [
                { l: 'Total humano', v: '~150×10¹²' },
                { l: 'Hendidura', v: '20-40 nm' },
                { l: 'Por neurona', v: 'Miles' },
                { l: 'Tipos', v: 'Química/Eléctrica' }
            ]
        },
        {
            name: 'Mielina',
            region: 'Vaina Aislante — Velocidad de Conducción',
            desc: 'Capa aislante lipídica que rodea axones. SNC: oligodendrocitos (un oligodendrocito mieliniza varios axones). SNP: células de Schwann (una célula por segmento de axón). Nódulos de Ranvier: gaps sin mielina donde se regenera el potencial de acción (conducción saltatoria). Fibras mielinizadas conducen 10-100× más rápido que amielínicas.',
            datos: [
                { l: 'SNC', v: 'Oligodendrocitos' },
                { l: 'SNP', v: 'Células Schwann' },
                { l: 'Nódulos Ranvier', v: 'Gaps ~1 μm' },
                { l: '↑ Velocidad', v: '10-100×' }
            ]
        },
        {
            name: 'Encéfalo',
            region: 'Centro Integrativo — Cráneo',
            desc: 'Órgano dentro del cráneo, 3 partes: cerebro (hemisferios cerebrales), cerebelo (coordinación), tronco encefálico (bulbo, puente, mesencéfalo). Protegido por meninges (duramadre, aracnoides, piamadre), líquido cefalorraquídeo (LCR) y barrera hematoencefálica. Consumo: 20% oxígeno y glucosa corporal total con solo 2% del peso.',
            datos: [
                { l: 'Peso', v: '~1.4 kg' },
                { l: 'Consumo O₂', v: '~20%' },
                { l: 'Neuronas', v: '~86×10⁹' },
                { l: 'Protección', v: 'Meninges + LCR' }
            ]
        },
        {
            name: 'Médula Espinal',
            region: 'Conducción — Canal Vertebral',
            desc: 'Cordón nervioso de ~45 cm desde foramen magno hasta L1-L2 (cono medular). 31 segmentos espinales: 8 cervicales, 12 torácicos, 5 lumbares, 5 sacros, 1 coccígeo. Sustancia gris central (cuerpos neuronales, forma H), sustancia blanca periférica (tractos mielinizados). Cola de caballo: raíces nerviosas debajo de L2. Centro de reflejos espinales.',
            datos: [
                { l: 'Longitud', v: '~45 cm' },
                { l: 'Segmentos', v: '31' },
                { l: 'Termina', v: 'L1-L2' },
                { l: 'Reflejos', v: 'Centro integrador' }
            ]
        },
        {
            name: 'Nervios Espinales',
            region: '31 Pares — SNP',
            desc: 'Salen de médula espinal por forámenes intervertebrales. Cada nervio tiene raíz dorsal (sensitiva, ganglios dorsales) y raíz ventral (motora). 31 pares: C1-C8 (8 cervicales), T1-T12 (12 torácicos), L1-L5 (5 lumbares), S1-S5 (5 sacros), Co1 (1 coccígeo). Forman plexos: cervical, braquial, lumbar, sacro. Inervan dermatomas específicos.',
            datos: [
                { l: 'Total', v: '31 pares' },
                { l: 'Cervicales', v: '8' },
                { l: 'Raíz dorsal', v: 'Sensitiva' },
                { l: 'Raíz ventral', v: 'Motora' }
            ]
        },
        {
            name: 'Nervios Craneales',
            region: '12 Pares — Emergen del Encéfalo',
            desc: 'Emergen directamente del encéfalo. I (olfatorio), II (óptico): sensoriales especiales. III (oculomotor), IV (troclear), VI (abducens), XI (accesorio), XII (hipogloso): motores. V (trigémino), VII (facial), IX (glosofaríngeo), X (vago): mixtos. El vago (X) es único que desciende al abdomen. Controlan funciones de cabeza, cuello y vísceras toraco-abdominales.',
            datos: [
                { l: 'Total', v: '12 pares (I-XII)' },
                { l: 'Sensoriales', v: 'I, II, VIII' },
                { l: 'Motores', v: 'III,IV,VI,XI,XII' },
                { l: 'Mixtos', v: 'V,VII,IX,X' }
            ]
        },
        {
            name: 'Sistema Nervioso Autónomo',
            region: 'Control Involuntario — Homeostasis',
            desc: 'Regula funciones involuntarias. Simpático (toracolumbar T1-L2): "lucha o huida", dilata pupilas, aumenta FC, broncodilatación, inhibe digestión. Parasimpático (craneosacral): "descanso y digestión", vía nervios craneales (III,VII,IX,X) y S2-S4, estimula digestión, disminuye FC. Sistema entérico: 500 millones de neuronas en pared intestinal, funciona semi-independiente.',
            datos: [
                { l: 'Simpático', v: 'T1-L2' },
                { l: 'Parasimpático', v: 'Craneal + S2-S4' },
                { l: 'Entérico', v: '~500×10⁶ neur.' },
                { l: 'Función', v: 'Homeostasis' }
            ]
        }
    ]
};

console.log('✅ Nervous Data: Anatomía cargada');
