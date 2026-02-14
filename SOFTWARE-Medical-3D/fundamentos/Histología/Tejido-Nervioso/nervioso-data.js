// ═══════════════════════════════════════════════════════════
// NERVIOSO DATA - Base de datos de tejido nervioso
// ═══════════════════════════════════════════════════════════

const NERVIOSO_DATA = [
  {
    id: 'neurona-estructura',
    nombre: 'Neurona: Estructura y Componentes',
    subtitulo: 'Célula excitable · Unidad funcional · SNC y SNP',
    icono: '🧠',
    categorias: ['neurona', 'estructura', 'morfologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Componentes Estructurales',
        items: [
          'Soma (pericarion): Cuerpo celular, 5-150 μm, núcleo eucromático central',
          'Nucléolo prominente: Alta síntesis proteica (RNA ribosomal)',
          'Sustancia de Nissl (cuerpos de Nissl): RER + ribosomas (basofilia)',
          'Aparato de Golgi: Yuxtanuclear, empaquetamiento',
          'Neurofibrillas: Neurofilamentos (NF-L, NF-M, NF-H) + microtúbulos',
          'Mitocondrias: Abundantes (alto metabolismo, solo aeróbico)',
          'Lipofuscina: Gránulos pigmento amarillo-marrón (envejecimiento)',
          'Dendritas: Prolongaciones receptoras, espinas dendríticas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Axón y Especializaciones',
        items: [
          'Axón: Prolongación única, conducción impulso nervioso',
          'Cono axónico (montículo): Origen axón, sin Nissl, zona gatillo',
          'Longitud: 1 mm - 1 metro (neurona motora)',
          'Diámetro: 0.2-20 μm (velocidad conducción proporcional)',
          'Axolema: Membrana plasmática del axón',
          'Axoplasma: Citoplasma axonal (microtúbulos, neurofilamentos)',
          'Colaterales: Ramificaciones en ángulo recto',
          'Telodendrón: Ramificaciones terminales, botones sinápticos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Clasificación Morfológica',
        datos: [
          { label: 'Multipolar', value: 'Múltiples dendritas, 1 axón - Neuronas motoras, interneuronas (99% SNC)' },
          { label: 'Bipolar', value: '2 prolongaciones opuestas - Retina, ganglio espiral, vestibular' },
          { label: 'Pseudounipolar', value: '1 prolongación que se bifurca - Ganglios sensitivos (dorsal)' },
          { label: 'Unipolar', value: '1 prolongación - Rara, desarrollo embrionario' },
          { label: 'Piramidal', value: 'Soma piramidal - Corteza cerebral (Betz)' },
          { label: 'Purkinje', value: 'Arborización dendrítica extensa - Cerebelo' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Enfermedad de Alzheimer: Ovillos neurofibrilares (tau hiperfosforilada), placas β-amiloide',
          'Enfermedad de Parkinson: Pérdida neuronas dopaminérgicas (sustancia nigra), cuerpos de Lewy',
          'ELA (esclerosis lateral amiotrófica): Degeneración neuronas motoras',
          'Cromatolisis: Pérdida Nissl post-lesión axonal (regeneración)',
          'Lipofuscinosis: Acumulación excesiva lipofuscina (envejecimiento, enfermedades)',
          'Neuropatías axonales: Daño axón (diabetes, tóxicos, isquemia)',
          'Tinción de plata: Visualización neurofibrillas (Bielschowsky)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Transporte Axonal',
        items: [
          'Anterógrado rápido: 200-400 mm/día, kinesina, vesículas (neurotransmisores)',
          'Anterógrado lento: 0.2-8 mm/día, proteínas citoesqueleto, enzimas',
          'Retrógrado rápido: 200-300 mm/día, dineína, reciclaje, factores tróficos',
          'Microtúbulos: Rieles (+) extremo distal, (-) extremo proximal',
          'Kinesina: Motor anterógrado (ATP-dependiente)',
          'Dineína citoplasmática: Motor retrógrado',
          'Transporte de virus: Herpes, rabia, polio (retrógrado)',
          'Toxinas: Tetánica (retrógrado), botulínica (anterógrado-retrógrado)'
        ]
      }
    ]
  },
  {
    id: 'potencial-reposo-accion',
    nombre: 'Potencial de Reposo y Potencial de Acción',
    subtitulo: 'Excitabilidad neuronal · Canales iónicos · Propagación',
    icono: '⚡',
    categorias: ['fisiologia', 'electrofisiologia', 'impulso'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Potencial de Reposo',
        items: [
          'Voltaje: -70 mV (interior negativo)',
          'Gradientes iónicos: [K⁺]i alto (140 mM), [Na⁺]i bajo (10 mM)',
          'Na⁺/K⁺-ATPasa: Bomba 3 Na⁺ out / 2 K⁺ in (electrogénica)',
          'Permeabilidad K⁺: 40x > Na⁺ en reposo',
          'Ecuación de Goldman-Hodgkin-Katz: Considera múltiples iones',
          'Canales de fuga K⁺: Abiertos en reposo (K2P, Kir)',
          'Equilibrio Nernst K⁺: -90 mV, Na⁺: +60 mV',
          'Distribución asimétrica: Proteínas aniónicas intracelulares'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Potencial de Acción',
        items: [
          'Fase 0 (despolarización): Apertura canales Na⁺ voltaje-dependientes',
          'Umbral: -55 mV (despolarización suficiente)',
          'Todo o nada: Amplitud constante (~100 mV)',
          'Overshoot: +30 a +40 mV (inversión polaridad)',
          'Fase de repolarización: Inactivación Na⁺, apertura K⁺ (Kv)',
          'Hiperpolarización (undershoot): Exceso salida K⁺',
          'Duración: 1-2 ms (neurona), 200-400 ms (cardíaco)',
          'Periodo refractario absoluto: 1 ms, canales Na⁺ inactivados'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Canales Iónicos',
        datos: [
          { label: 'Nav1.1-1.9', value: 'Canales Na⁺ voltaje-dependientes, 4 dominios, inactivación rápida' },
          { label: 'Kv (delayed rectifier)', value: 'Canales K⁺ voltaje-dependientes, repolarización' },
          { label: 'Cav (L, N, P/Q, R, T)', value: 'Canales Ca²⁺, liberación neurotransmisores' },
          { label: 'Leak channels', value: 'K2P (K⁺), potencial reposo' },
          { label: 'Velocidad Nav', value: 'Activación <1 ms, inactivación 1-2 ms' },
          { label: 'Tetrodotoxina (TTX)', value: 'Bloquea Nav (pez globo)' },
          { label: 'Saxitoxina (STX)', value: 'Bloquea Nav (marea roja)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Epilepsia: Mutaciones Nav (SCN1A), hiperexcitabilidad',
          'Canalopatías: Nav1.4 (parálisis periódica), Nav1.5 (síndrome QT largo)',
          'Anestésicos locales: Lidocaína, procaína (bloquean Nav)',
          'Esclerosis múltiple: Pérdida mielina, conducción lenta/bloqueada',
          'Síndrome Guillain-Barré: Desmielinización, parálisis ascendente',
          'Hipokalemia: Hiperpolarización, debilidad muscular',
          'Toxina escorpión: Prolonga apertura Nav, espasmos',
          'Fenitoína: Antiepiléptico, estabiliza Nav'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Propagación del Impulso',
        items: [
          'Conducción continua: Axones amielínicos, lenta (0.5-2 m/s)',
          'Conducción saltatoria: Axones mielínicos, rápida (50-120 m/s)',
          'Nodos de Ranvier: Gaps mielina (1 μm), alta densidad Nav',
          'Internodos: 0.2-2 mm, mielinizados, sin Nav',
          'Constante de longitud (λ): Distancia decremento 63%, ∝ √(diámetro)',
          'Constante de tiempo (τ): Velocidad cambio voltaje, ∝ capacitancia',
          'Velocidad ∝ diámetro: Fibras gruesas más rápidas',
          'Factor de seguridad: PA regenera completamente en cada nodo'
        ]
      }
    ]
  },
  {
    id: 'sinapsis-quimica',
    nombre: 'Sinapsis Química',
    subtitulo: 'Transmisión sináptica · Neurotransmisores · Receptores',
    icono: '🔗',
    categorias: ['sinapsis', 'neurotransmisores', 'quimica'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Estructura de la Sinapsis',
        items: [
          'Terminal presináptico: Botón, vesículas sinápticas',
          'Hendidura sináptica: 20-40 nm, matriz extracelular',
          'Membrana postsináptica: Densidad postsináptica (PSD)',
          'Vesículas sinápticas: 40-50 nm, almacenan neurotransmisores',
          'Zona activa: Proteínas SNARE, acoplamiento vesículas',
          'Mitocondrias: Abundantes (energía, reciclaje)',
          'Tipos: Axo-dendrítica, axo-somática, axo-axónica',
          'Espinas dendríticas: Protuberancias (plasticidad)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Transmisión Sináptica',
        items: [
          '1. PA llega al terminal: Despolarización',
          '2. Apertura canales Cav: Entrada Ca²⁺ (P/Q, N-type)',
          '3. Sensor Ca²⁺: Sinaptotagmina detecta ↑[Ca²⁺]i',
          '4. Fusión vesicular: SNARE (sintaxina, SNAP-25, sinaptobrevina)',
          '5. Exocitosis: Liberación neurotransmisor (quantal)',
          '6. Difusión: A través hendidura (0.3 ms)',
          '7. Unión receptores: Postsinápticos (iónicos/metabotrópicos)',
          '8. Respuesta postsináptica: PPSE (despolarización) o PPSI (hiperpolarización)',
          '9. Terminación: Recaptación, degradación enzimática, difusión',
          '10. Reciclaje vesicular: Endocitosis, rellenado'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Neurotransmisores Principales',
        datos: [
          { label: 'Acetilcolina (ACh)', value: 'Unión neuromuscular, SNA parasimpático, aprendizaje' },
          { label: 'Glutamato', value: 'Principal excitatorio SNC, AMPA, NMDA, mGluR' },
          { label: 'GABA', value: 'Principal inhibitorio SNC, GABA-A (Cl⁻), GABA-B (K⁺)' },
          { label: 'Glicina', value: 'Inhibitorio médula espinal, tronco encefálico' },
          { label: 'Dopamina', value: 'Recompensa, movimiento, sustancia nigra, VTA' },
          { label: 'Noradrenalina', value: 'Alerta, locus coeruleus, simpático' },
          { label: 'Serotonina (5-HT)', value: 'Humor, sueño, núcleos del rafe' },
          { label: 'Neuropéptidos', value: 'Sustancia P, encefalinas, endorfinas' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Miastenia gravis: Autoanticuerpos anti-nAChR, fatiga muscular',
          'Enfermedad de Alzheimer: Déficit colinérgico, inhibidores AChE (donepezilo)',
          'Enfermedad de Parkinson: Pérdida dopamina, L-DOPA, agonistas dopaminérgicos',
          'Depresión: Déficit serotonina/noradrenalina, ISRS, IRSN',
          'Esquizofrenia: Hipótesis dopaminérgica, antagonistas D2',
          'Epilepsia: Desbalance glutamato/GABA, anticonvulsivantes',
          'Botulismo: Toxina escinde SNAP-25, parálisis flácida',
          'Tetanos: Bloquea liberación GABA/glicina, espasmos'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Receptores Postsinápticos',
        items: [
          'Ionotrópicos: Canales ligando-dependientes, respuesta rápida (ms)',
          'nAChR: Nicotínico, cationes, excitatorio',
          'GABA-A: Cl⁻, inhibitorio, benzodiazepinas modulan',
          'NMDA: Glutamato + glicina, Ca²⁺, voltaje-dependiente (Mg²⁺)',
          'AMPA/Kainatο: Glutamato, Na⁺/K⁺, despolarización rápida',
          'Metabotrópicos: GPCR, respuesta lenta (segundos), segundos mensajeros',
          'mAChR: Muscarínico, M1-M5, Gq/Gi',
          'Dopamina D1-D5: Gs (D1, D5) o Gi (D2, D3, D4)',
          'Adrenérgicos α y β: Noradrenalina/adrenalina',
          'Serotonina 5-HT1-7: Múltiples subtipos, diversas funciones'
        ]
      }
    ]
  },
  {
    id: 'sinapsis-electrica',
    nombre: 'Sinapsis Eléctrica y Plasticidad Sináptica',
    subtitulo: 'Uniones gap · LTP y LTD · Aprendizaje y memoria',
    icono: '🔌',
    categorias: ['sinapsis', 'plasticidad', 'electrica'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Sinapsis Eléctrica',
        items: [
          'Uniones gap (nexos): Canales conexones (conexinas)',
          'Distancia: 3.5 nm (vs 20-40 nm química)',
          'Bidireccional: Flujo iónico en ambas direcciones',
          'Velocidad: Instantánea (<0.1 ms), sin retraso sináptico',
          'Sincronización: Neuronas oscilatorias, ritmos cerebrales',
          'Conexina 36 (Cx36): Principal en neuronas adultas',
          'Localización: Interneuronas, neuronas tronco, retina',
          'Acoplamiento eléctrico: Coordinación actividad neuronal'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Plasticidad Sináptica',
        items: [
          'LTP (potenciación largo plazo): ↑ eficacia sináptica (minutos-días)',
          'LTD (depresión largo plazo): ↓ eficacia sináptica',
          'Postulado de Hebb: "Cells that fire together, wire together"',
          'LTP dependiente NMDA: Ca²⁺ → CaMKII → fosforilación AMPA',
          'Inserción receptores AMPA: Aumento respuesta postsináptica',
          'LTD: ↓[Ca²⁺]i, fosfatasas, internalización AMPA',
          'Plasticidad estructural: Formación/eliminación espinas dendríticas',
          'Consolidación: Síntesis proteica, cambios genómicos (CREB)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismos Moleculares LTP',
        datos: [
          { label: 'Inducción', value: 'Despolarización + glutamato → NMDA (↑Ca²⁺)' },
          { label: 'CaMKII', value: 'Ca²⁺-calmodulina quinasa II, autofosforilación persistente' },
          { label: 'PKA y PKC', value: 'Fosforilan AMPA, aumentan conductancia' },
          { label: 'Inserción AMPA', value: 'Exocitosis GluA1, GluA2 a membrana' },
          { label: 'Expresión génica', value: 'CREB → genes tempranos (c-fos, arc)' },
          { label: 'Síntesis proteica', value: 'Nuevas proteínas estructurales, receptores' },
          { label: 'Mantenimiento', value: 'Cambios estructurales, moléculas adhesión' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Enfermedad de Alzheimer: Déficit LTP, pérdida sinapsis (oligómeros β-amiloide)',
          'Isquemia cerebral: Excitotoxicidad glutamato, activación excesiva NMDA',
          'Accidente cerebrovascular: Penumbra isquémica, LTD patológica',
          'Autismo: Mutaciones genes sinápticos (neuroligina, neurexina, Shank)',
          'Esquizofrenia: Poda sináptica excesiva (adolescencia)',
          'Adicción: LTP vía dopamina en núcleo accumbens (sensibilización)',
          'Epilepsia: LTP aberrante, circuitos hiperexcitables',
          'Memantina: Antagonista NMDA, Alzheimer (reduce excitotoxicidad)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Tipos de Plasticidad',
        items: [
          'Plasticidad sináptica corto plazo: Facilitación, depresión (segundos)',
          'Potenciación post-tetánica (PTP): Minutos, ↑Ca²⁺ residual',
          'Plasticidad dependiente tiempo (STDP): Orden temporal crítico',
          'Metaplasticidad: Plasticidad de la plasticidad (umbral LTP/LTD)',
          'Homeostasis sináptica: Escalamiento receptores (estabilidad red)',
          'Tagging sináptico: Marcaje sinapsis activas (consolidación)',
          'Plasticidad estructural: Formación nuevas sinapsis (sinaptogénesis)',
          'Reorganización cortical: Mapa sensorial/motor (amputación, entrenamiento)'
        ]
      }
    ]
  },
  {
    id: 'celulas-gliales-snc',
    nombre: 'Células Gliales del SNC',
    subtitulo: 'Astrocitos · Oligodendrocitos · Microglía · Ependimarias',
    icono: '⭐',
    categorias: ['glia', 'snc', 'soporte'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Astrocitos',
        items: [
          'Más abundantes del SNC (50% células gliales)',
          'Protoplasmáticos: Sustancia gris, procesos cortos y ramificados',
          'Fibrosos: Sustancia blanca, procesos largos y rectos',
          'Pies terminales (pies vasculares): Envuelven capilares (barrera hematoencefálica)',
          'Funciones: Soporte estructural, homeostasis iónica (K⁺), neurotransmisores',
          'Glutamato: Recaptación (EAAT1, EAAT2), conversión a glutamina',
          'Glucógeno: Reserva energética, lactato para neuronas',
          'GFAP (proteína glial fibrilar ácida): Filamentos intermedios, marcador'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Oligodendrocitos',
        items: [
          'Forman mielina en SNC',
          'Un oligodendrocito: Mieliniza múltiples axones (hasta 50)',
          'Mielina SNC: 70% lípidos (cerebrosidos, colesterol), 30% proteínas',
          'PLP (proteolípido): Proteína más abundante mielina SNC',
          'MBP (proteína básica mielina): Compacta lamelas',
          'MOG (glicoproteína mielina oligodendrocitos): Superficie externa',
          'Nodos de Ranvier: 1 μm gaps, conducción saltatoria',
          'Células satélite: Oligodendrocitos precursores en sustancia gris'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Microglía',
        datos: [
          { label: 'Origen', value: 'Mesodérmico (saco vitelino), macrófagos cerebrales' },
          { label: 'Morfología', value: 'Procesos ramificados (reposo), ameboide (activada)' },
          { label: 'Funciones', value: 'Fagocitosis, presentación antígeno, secreción citoquinas' },
          { label: 'Vigilancia', value: 'Escaneo continuo parénquima (procesos móviles)' },
          { label: 'Activación', value: 'Daño, infección, degeneración (M1 pro-inflamatoria, M2 reparadora)' },
          { label: 'Marcadores', value: 'Iba1, CD11b, CX3CR1' },
          { label: 'Neuroinflamación', value: 'Alzheimer, Parkinson, esclerosis múltiple' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Esclerosis múltiple: Destrucción autoinmune mielina (oligodendrocitos), placas desmielinizantes',
          'Leucodistrofias: Mutaciones genes mielina (PLP en Pelizaeus-Merzbacher)',
          'Astrocitoma: Neoplasia astrocitos (glioblastoma más maligna)',
          'Gliosis reactiva: Hipertrofia astrocitos post-daño (cicatriz glial)',
          'Enfermedad de Alexander: Mutación GFAP, acumulación fibras Rosenthal',
          'Edema cerebral: Disfunción astrocitos (acuaporina-4)',
          'Encefalitis: Activación microglía, respuesta inflamatoria',
          'Neuromielitis óptica: Autoanticuerpos anti-acuaporina-4 (astrocitos)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Células Ependimarias',
        items: [
          'Epitelio simple cilíndrico/cúbico ciliado',
          'Revisten ventrículos y canal central médula',
          'Cilios: Movimiento LCR (líquido cefalorraquídeo)',
          'Microvellosidades: Absorción/secreción',
          'Plexos coroideos: Epéndimo modificado, produce LCR',
          'Barrera sangre-LCR: Uniones estrechas en plexos',
          'Tanicitos: Epéndimo especializado (hipotálamo, circumventriculares)',
          'Células del epéndimo: No se regeneran en adulto'
        ]
      }
    ]
  },
  {
    id: 'celulas-gliales-snp',
    nombre: 'Células Gliales del SNP',
    subtitulo: 'Células de Schwann · Células satélite · Mielinización periférica',
    icono: '🛡️',
    categorias: ['glia', 'snp', 'mielina'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Células de Schwann',
        items: [
          'Forman mielina en SNP (nervios periféricos)',
          'Relación 1:1: Una célula Schwann mieliniza UN segmento de UN axón',
          'Neurilema (vaina de Schwann): Citoplasma y núcleo rodean mielina',
          'Mielinización: Envuelve axón en espiral (hasta 100 vueltas)',
          'Incisuras de Schmidt-Lanterman: Bolsas citoplasma en mielina',
          'Lámina basal: Envuelve célula de Schwann (regeneración)',
          'Axones amielínicos: Múltiples axones en surcos (fibras C dolor)',
          'Bandas de Büngner: Guían regeneración axonal post-lesión'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Mielina Periférica',
        items: [
          'Composición: 70-80% lípidos, 20-30% proteínas',
          'P0 (MPZ): Proteína más abundante (50% proteínas), adhesión lamelas',
          'PMP22: Proteína mielina periférica 22 kDa',
          'MBP: Proteína básica mielina (compactación)',
          'Internodos: 200-1500 μm (más largos que SNC)',
          'Grosor mielina: Proporcional diámetro axón (relación g 0.6-0.7)',
          'Nodos de Ranvier: Canales Nav concentrados (Nav1.6)',
          'Paranodos: Uniones axogliales (contactina, neurofascina)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Células Satélite',
        datos: [
          { label: 'Localización', value: 'Ganglios sensitivos (dorsal) y autónomos' },
          { label: 'Función', value: 'Soporte metabólico, regulación microambiente' },
          { label: 'Morfología', value: 'Aplanadas, rodean somas neuronales' },
          { label: 'Sin mielina', value: 'No mielinizan (función diferente)' },
          { label: 'Barrera', value: 'Separación entre neuronas adyacentes' },
          { label: 'Homeostasis K⁺', value: 'Similar a astrocitos' },
          { label: 'Dolor neuropático', value: 'Activación contribuye a hiperalgesia' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Síndrome Guillain-Barré: Desmielinización autoinmune SNP, parálisis ascendente',
          'Neuropatía diabética: Daño Schwann, desmielinización/axonopatía',
          'Enfermedad Charcot-Marie-Tooth (CMT): Mutaciones PMP22, P0, desmielinización hereditaria',
          'Schwannoma (neurilemoma): Tumor benigno células Schwann (nervio vestibular)',
          'Neurofibroma: Tumor Schwann + fibroblastos (neurofibromatosis tipo 1)',
          'Lepra: Mycobacterium leprae infecta células Schwann, neuropatía',
          'Regeneración nerviosa: Schwann guían rebrote axonal (bandas Büngner)',
          'Lesión sección completa: Difícil regeneración SNC vs SNP (mielinización)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Regeneración Nerviosa',
        items: [
          'SNP: Regeneración posible (1-2 mm/día)',
          'Degeneración Walleriana: Distal a lesión, fragmentación axón y mielina',
          'Schwann fagocitan: Restos mielina y axón',
          'Bandas de Büngner: Tubo Schwann + lámina basal',
          'Cono crecimiento: Rebrote axonal, guiado por neurotrofinas',
          'NGF (factor crecimiento nervioso): Neuronas sensitivas y simpáticas',
          'BDNF, NT-3, NT-4: Neurotrofinas adicionales',
          'Factores inhibidores SNC: Nogo, MAG, OMgp (oligodendrocitos), cicatriz glial',
          'Trasplante Schwann: Estrategia experimental SNC'
        ]
      }
    ]
  },
  {
    id: 'clasificacion-fibras-nerviosas',
    nombre: 'Clasificación de Fibras Nerviosas',
    subtitulo: 'Diámetro · Mielinización · Velocidad de conducción',
    icono: '📊',
    categorias: ['fibras', 'conduccion', 'clasificacion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Clasificación de Erlanger-Gasser (Somáticas)',
        items: [
          'Fibras A (mielínicas rápidas): 1-20 μm, 5-120 m/s',
          'A-α (alfa): 12-20 μm, 70-120 m/s - Motoras α, propioceptivas (Ia, Ib)',
          'A-β (beta): 5-12 μm, 30-70 m/s - Tacto, presión (II)',
          'A-γ (gamma): 3-6 μm, 15-30 m/s - Motoras γ (huso muscular)',
          'A-δ (delta): 2-5 μm, 12-30 m/s - Dolor agudo, frío, tacto',
          'Fibras B (mielínicas preganglionares): 1-3 μm, 3-15 m/s - Autonómicas',
          'Fibras C (amielínicas): 0.2-1.5 μm, 0.5-2 m/s - Dolor lento, calor, postganglionares',
          'Velocidad ∝ √diámetro (amielínicas), ∝ diámetro (mielínicas)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Clasificación Numérica (Sensitivas)',
        items: [
          'Grupo I (Ia, Ib): 12-20 μm, 70-120 m/s - Propioceptivas',
          'Ia: Huso muscular primario (estiramiento dinámico)',
          'Ib: Órgano tendinoso Golgi (tensión muscular)',
          'Grupo II: 5-12 μm, 30-70 m/s - Huso muscular secundario, mecanorreceptores',
          'Grupo III: 2-5 μm, 12-30 m/s - Dolor agudo, temperatura (≈ A-δ)',
          'Grupo IV: 0.2-1.5 μm, 0.5-2 m/s - Dolor lento, C polimodal (≈ C)',
          'Fibras C: Nociceptores, termorreceptores, quimiorreceptores',
          'Receptor capsaicina (TRPV1): Fibras C, dolor por calor'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Características Comparativas',
        datos: [
          { label: 'Velocidad conducción', value: 'Mielínicas > amielínicas (50-100x más rápidas)' },
          { label: 'Diámetro vs velocidad', value: 'Lineal (mielínicas), raíz cuadrada (amielínicas)' },
          { label: 'Consumo energético', value: 'Mielínicas eficientes (conducción saltatoria)' },
          { label: 'Densidad canales Nav', value: 'Nodos 1000x > internodo' },
          { label: 'Bloqueo selectivo', value: 'Anestésicos bloquean C primero (pequeñas)' },
          { label: 'Presión', value: 'Fibras A sensibles (pierna dormida)' },
          { label: 'Isquemia', value: 'Fibras grandes más vulnerables' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Anestesia espinal: Bloqueo diferencial (C → B → A-δ → A-γ → A-β → A-α)',
          'Neuropatía periférica: Pérdida función según diámetro (grandes primero: vibración, propiocepción)',
          'Síndrome túnel carpiano: Compresión nervio mediano, pérdida A-β (tacto)',
          'Tabes dorsal (neurosífilis): Degeneración columnas dorsales (Ia, Ib), ataxia',
          'Prueba diapasón: Evalúa fibras A-β (vibración 128 Hz)',
          'Dolor neuropático: Hiperactividad fibras C, alodinia',
          'Estudios conducción nerviosa: Velocidad, amplitud (diagnóstico neuropatías)',
          'Reflejo H (Hoffmann): Fibras Ia, evalúa integridad arco reflejo'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Funciones Específicas',
        items: [
          'Propiocepción: Fibras Ia, Ib, II (posición, movimiento articular)',
          'Tacto discriminativo: A-β (Meissner, Pacini, Merkel)',
          'Dolor rápido (primer dolor): A-δ, localizado, punzante',
          'Dolor lento (segundo dolor): C, difuso, quemante, persistente',
          'Temperatura: A-δ (frío), C (calor)',
          'Prurito: Fibras C específicas (histamina, mastocitos)',
          'Reflejo miotático: Fibras Ia → α-motoneuronas (monosináptico)',
          'Reflejo miotático inverso: Fibras Ib → interneuronas → inhibición α-MN'
        ]
      }
    ]
  },
  {
    id: 'barrera-hematoencefalica',
    nombre: 'Barrera Hematoencefálica y Líquido Cefalorraquídeo',
    subtitulo: 'Protección SNC · Astrocitos · Uniones estrechas · Plexos coroideos',
    icono: '🛡️',
    categorias: ['barrera', 'proteccion', 'lcr'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Barrera Hematoencefálica (BHE)',
        items: [
          'Capilares cerebrales: Células endoteliales especializadas',
          'Uniones estrechas: Ocludina, claudinas, JAMs (impermeables)',
          'Ausencia fenestraciones: Sin poros (vs capilares periféricos)',
          'Transportadores específicos: Glucosa (GLUT1), aminoácidos',
          'Pies astrocíticos: Rodean 99% superficie capilar',
          'Pericitos: Células contráctiles, regulación flujo',
          'Lámina basal: Envuelve endotelio, astrocitos, pericitos',
          'Unidad neurovascular: Neuronas, astrocitos, endotelio'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Permeabilidad y Transporte',
        items: [
          'Liposolubles: Cruzan libremente (O₂, CO₂, alcohol, anestésicos)',
          'Glucosa: GLUT1 (transporte facilitado), 5 mM',
          'Aminoácidos: LAT1 (leucina), transportadores específicos',
          'Iones: Muy baja permeabilidad (K⁺, Na⁺, Ca²⁺)',
          'Proteínas: Bloqueadas (albúmina, inmunoglobulinas)',
          'Péptidos grandes: No cruzan (insulina, leptina)',
          'Bombas eflujo: P-glicoproteína (fármacos, toxinas)',
          'Transcitosis: Limitada, receptores específicos (transferrina)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Líquido Cefalorraquídeo (LCR)',
        datos: [
          { label: 'Producción', value: '500 mL/día (plexos coroideos)' },
          { label: 'Volumen total', value: '150 mL (renovación 3-4x/día)' },
          { label: 'Composición', value: 'Similar plasma, menos proteínas (0.2-0.4 g/L vs 60-80)' },
          { label: 'Células', value: '<5 leucocitos/μL (normal)' },
          { label: 'Glucosa LCR', value: '50-80 mg/dL (2/3 plasma)' },
          { label: 'Presión', value: '5-15 mmHg (decúbito lateral)' },
          { label: 'Reabsorción', value: 'Granulaciones aracnoideas (seno sagital superior)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Meningitis: ↑ leucocitos LCR, ↓ glucosa (bacteriana), ↑ proteínas',
          'Hemorragia subaracnoidea: Eritrocitos, xantocromía LCR',
          'Esclerosis múltiple: Bandas oligoclonales IgG en LCR',
          'Hidrocefalia: Acumulación LCR, ↑ presión intracraneal',
          'Barrera hematoencefálica y fármacos: Dopamina no cruza (usar L-DOPA)',
          'Edema cerebral: Vasogénico (ruptura BHE) vs citotóxico',
          'Tumores cerebrales: Disrupciónn BHE, realce con contraste (gadolinio)',
          'Circunventriculares: Áreas sin BHE (hipófisis, área postrema)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Funciones de la BHE',
        items: [
          'Homeostasis iónica: Estabilidad composición extracelular cerebral',
          'Protección toxinas: Exclusión sustancias nocivas',
          'Exclusión neurotransmisores: Evita interferencia periférica',
          'Regulación pH: Estabilidad microambiente neuronal',
          'Suministro nutrientes: Glucosa, aminoácidos esenciales',
          'Eliminación desechos: Transporte activo',
          'Barrera inmune: Limita entrada leucocitos (privilegio inmune)',
          'Neuroprotección: Antioxidantes, enzimas degradativas'
        ]
      }
    ]
  },
  {
    id: 'neurotransmisores-detalle',
    nombre: 'Neurotransmisores: Síntesis, Liberación y Degradación',
    subtitulo: 'Colinérgicos · Monoaminas · Aminoácidos · Neuropéptidos',
    icono: '💊',
    categorias: ['neurotransmisores', 'sinapsis', 'farmacologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Sistema Colinérgico',
        items: [
          'Síntesis: Colina + Acetil-CoA → ACh (colina acetiltransferasa, ChAT)',
          'Almacenamiento: VAChT (transportador vesicular)',
          'Receptores nicotínicos: nAChR (N1 neuronal, N2 muscular)',
          'Receptores muscarínicos: M1-M5 (GPCR)',
          'Degradación: Acetilcolinesterasa (AChE) en hendidura',
          'Recaptación: Colina (transportador CHT1)',
          'Localización: Núcleo basal Meynert, tronco, motoneuronas',
          'Funciones: Aprendizaje, memoria, atención, contracción muscular'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Sistema Dopaminérgico',
        items: [
          'Síntesis: Tirosina → L-DOPA (tirosina hidroxilasa) → Dopamina (DOPA descarboxilasa)',
          'Vías: Nigroestriatal, mesolímbica, mesocortical, tuberoinfundibular',
          'Receptores D1-like: D1, D5 (Gs, ↑AMPc)',
          'Receptores D2-like: D2, D3, D4 (Gi, ↓AMPc)',
          'Recaptación: DAT (transportador dopamina)',
          'Degradación: MAO-A/B, COMT → HVA (ácido homovanílico)',
          'Sustancia nigra: Neuromelanina (oxidación dopamina)',
          'Funciones: Movimiento, recompensa, motivación, cognición'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Otros Neurotransmisores',
        datos: [
          { label: 'Noradrenalina', value: 'Dopamina → NA (dopamina β-hidroxilasa), locus coeruleus, alerta' },
          { label: 'Serotonina (5-HT)', value: 'Triptófano → 5-HT (triptófano hidroxilasa), núcleos rafe, humor' },
          { label: 'Glutamato', value: 'Glutamina → Glutamato (glutaminasa), principal excitatorio' },
          { label: 'GABA', value: 'Glutamato → GABA (GAD), principal inhibitorio' },
          { label: 'Glicina', value: 'Serina → Glicina, inhibitorio médula/tronco' },
          { label: 'Histamina', value: 'Histidina → Histamina, núcleo tuberomamilar, vigilia' },
          { label: 'Sustancia P', value: 'Neuropéptido, dolor, taquicinina' },
          { label: 'Endorfinas/Encefalinas', value: 'Opioides endógenos, analgesia' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Enfermedad de Parkinson: ↓ Dopamina sustancia nigra, L-DOPA, agonistas D2',
          'Esquizofrenia: Hipótesis dopaminérgica, antagonistas D2 (antipsicóticos)',
          'Depresión: Déficit 5-HT/NA, ISRS (fluoxetina), IRSN (venlafaxina)',
          'Alzheimer: Déficit ACh, inhibidores AChE (donepezilo, rivastigmina)',
          'TDAH: Déficit dopamina/NA corteza prefrontal, metilfenidato (bloquea DAT)',
          'Ansiedad: GABA-A, benzodiazepinas (alostéricos positivos)',
          'Epilepsia: Desbalance glutamato/GABA, anticonvulsivantes',
          'Adicción: Vía mesolímbica dopamina, núcleo accumbens (recompensa)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Cotransmisión y Modulación',
        items: [
          'Cotransmisión: Múltiples neurotransmisores por neurona',
          'Clásico + péptido: ACh + VIP (neuronas colinérgicas)',
          'Dale\'s principle modificado: Una neurona, múltiples transmisores',
          'Neuromodulación: Moduladores (NO, endocannabinoides, neurotrofinas)',
          'NO (óxido nítrico): Gas difusible, cGMP, vasodilatación, LTP',
          'Endocannabinoides: Retrógrados, CB1, suprimen liberación GABA/glutamato',
          'ATP: Cotransmisor, receptores P2X (ionotrópicos), P2Y (metabotrópicos)',
          'Autorecepción: Receptores presinápticos (retroalimentación negativa)'
        ]
      }
    ]
  }
];
