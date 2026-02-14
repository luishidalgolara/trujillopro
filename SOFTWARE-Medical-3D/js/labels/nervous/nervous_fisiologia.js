/**
 * ═══════════════════════════════════════════════════
 *  NERVOUS SYSTEM — Fisiología Neuronal
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__NERVOUS_DATA = window.__NERVOUS_DATA || {};

window.__NERVOUS_DATA.fisiologia = {
    title: 'Fisiología Neuronal',
    icon: '⚡',
    color: '#f59e0b',
    items: [
        {
            name: 'Potencial de Reposo',
            region: 'Membrana Neuronal — Estado Basal',
            desc: 'Diferencia de voltaje a través de la membrana neuronal en reposo: -70 mV (interior negativo). Mantenido por bomba Na⁺/K⁺-ATPasa (3 Na⁺ fuera, 2 K⁺ dentro, consume ATP) y canales de fuga de K⁺. Interior neuronal: alto K⁺ (~140 mM), bajo Na⁺ (~12 mM). Exterior: alto Na⁺ (~145 mM), bajo K⁺ (~4 mM). Equilibrio de Nernst predice potenciales iónicos.',
            datos: [
                { l: 'Potencial', v: '~-70 mV' },
                { l: 'Bomba', v: 'Na⁺/K⁺-ATPasa' },
                { l: 'K⁺ intracel.', v: '~140 mM' },
                { l: 'Na⁺ extracel.', v: '~145 mM' }
            ]
        },
        {
            name: 'Potencial de Acción',
            region: 'Impulso Nervioso — Todo o Nada',
            desc: 'Inversión rápida del potencial de membrana cuando se supera umbral (~-55 mV). Fases: despolarización (apertura canales Na⁺ voltaje-dependientes, +30 mV), repolarización (cierre Na⁺, apertura K⁺), hiperpolarización (K⁺ excesivo). Ley del "todo o nada": si alcanza umbral, amplitud constante. Período refractario absoluto: imposible otro PA (~1 ms).',
            datos: [
                { l: 'Umbral', v: '~-55 mV' },
                { l: 'Amplitud', v: '~100 mV' },
                { l: 'Duración', v: '~1-2 ms' },
                { l: 'Tipo', v: 'Todo o nada' }
            ]
        },
        {
            name: 'Velocidad de Conducción',
            region: 'Propagación del Impulso',
            desc: 'Velocidad de propagación del potencial de acción varía según fibra. Fibras Aα (mielinizadas gruesas): 70-120 m/s (propiocepción, motoras). Fibras Aβ: 30-70 m/s (tacto). Fibras Aδ (poco mielinizadas): 5-30 m/s (dolor agudo, temperatura). Fibras C (amielínicas delgadas): 0.5-2 m/s (dolor crónico). Mielinización y diámetro aumentan velocidad.',
            datos: [
                { l: 'Aα', v: '70-120 m/s' },
                { l: 'Aβ', v: '30-70 m/s' },
                { l: 'Aδ', v: '5-30 m/s' },
                { l: 'C', v: '0.5-2 m/s' }
            ]
        },
        {
            name: 'Transmisión Sináptica',
            region: 'Liberación de Neurotransmisores',
            desc: 'Potencial de acción llega a terminal axónica → apertura canales Ca²⁺ → entrada Ca²⁺ → fusión vesículas con membrana → exocitosis neurotransmisor a hendidura sináptica. Neurotransmisor se une a receptores postsinápticos → apertura canales iónicos o cascada señalización. Recaptación o degradación enzimática termina señal. Retardo sináptico: ~0.5 ms.',
            datos: [
                { l: 'Entrada Ca²⁺', v: 'Despolarización' },
                { l: 'Exocitosis', v: 'Vesículas' },
                { l: 'Retardo', v: '~0.5 ms' },
                { l: 'Terminación', v: 'Recaptación/degr.' }
            ]
        },
        {
            name: 'Neurotransmisores Principales',
            region: 'Mensajeros Químicos',
            desc: 'Acetilcolina (ACh): unión neuromuscular, SNA parasimpático, memoria. Glutamato: principal excitatorio SNC. GABA: principal inhibitorio SNC. Dopamina: movimiento (estriado), recompensa, motivación. Serotonina: estado ánimo, sueño, apetito. Noradrenalina: atención, alerta, SNA simpático. Glicina: inhibitorio en médula espinal. Neuropéptidos: sustancia P (dolor), endorfinas (analgesia).',
            datos: [
                { l: 'ACh', v: 'Neuromusc./SNA' },
                { l: 'Glutamato', v: 'Principal excit.' },
                { l: 'GABA', v: 'Principal inhib.' },
                { l: 'Dopamina', v: 'Movimiento/recomp.' }
            ]
        },
        {
            name: 'Integración Neuronal',
            region: 'Sumación Espacial y Temporal',
            desc: 'Neurona integra miles de señales sinápticas excitatorias (PEPS) e inhibitorias (PIPS). Sumación espacial: múltiples sinapsis simultáneas. Sumación temporal: estímulos rápidos sucesivos. Si sumación alcanza umbral en cono axónico → disparo potencial de acción. Zona gatillo: segmento inicial del axón, mayor densidad canales Na⁺. Frecuencia de disparo codifica intensidad del estímulo.',
            datos: [
                { l: 'Sinapsis/neur.', v: 'Miles' },
                { l: 'PEPS', v: 'Excitatorios' },
                { l: 'PIPS', v: 'Inhibitorios' },
                { l: 'Zona gatillo', v: 'Cono axónico' }
            ]
        },
        {
            name: 'Plasticidad Sináptica',
            region: 'Aprendizaje y Memoria',
            desc: 'Capacidad de sinapsis de fortalecerse o debilitarse con uso. Potenciación a largo plazo (LTP): fortalecimiento sináptico duradero tras estimulación repetida de alta frecuencia, base del aprendizaje. Depresión a largo plazo (LTD): debilitamiento con baja frecuencia. Regla de Hebb: "neuronas que disparan juntas, se conectan". Cambios estructurales: nuevas espinas dendríticas, aumento receptores.',
            datos: [
                { l: 'LTP', v: 'Fortalecimiento' },
                { l: 'LTD', v: 'Debilitamiento' },
                { l: 'Base', v: 'Aprendizaje' },
                { l: 'Cambios', v: 'Estructurales' }
            ]
        },
        {
            name: 'Barrera Hematoencefálica',
            region: 'Protección del SNC',
            desc: 'Barrera selectiva entre sangre y cerebro formada por células endoteliales capilares unidas por uniones estrechas, pies terminales de astrocitos y membrana basal. Impide paso de la mayoría de sustancias grandes, hidrofílicas, patógenos. Permite: O₂, CO₂, glucosa (transportador GLUT-1), aminoácidos, algunos lípidos. Protege de toxinas pero dificulta paso de fármacos (desafío terapéutico).',
            datos: [
                { l: 'Células', v: 'Endoteliales' },
                { l: 'Astrocitos', v: 'Pies terminales' },
                { l: 'Permeabilidad', v: 'Selectiva' },
                { l: 'Limita', v: 'Fármacos 98%' }
            ]
        }
    ]
};

console.log('✅ Nervous Data: Fisiología cargada');
