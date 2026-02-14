// ═══════════════════════════════════════════════════════════
// INFLAMACIÓN - Base de datos de conceptos
// ═══════════════════════════════════════════════════════════

const INFLAMACION_DATA = [
  {
    id: 'inflamacion-aguda',
    nombre: 'Inflamación Aguda',
    icono: '⚡',
    subtitulo: 'Respuesta vascular y celular rápida ante lesión',
    categorias: ['aguda', 'molecular'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Definición y características',
        items: [
          'Respuesta inmediata e inespecífica a lesión tisular',
          'Duración: minutos a días (típicamente <2 semanas)',
          'Objetivo: eliminar agente nocivo, remover tejido dañado, iniciar reparación',
          'Componentes: vascular, celular, molecular',
          'Resultado: resolución completa o progresión a crónica',
          'Proceso autolimitado en condiciones normales'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Signos cardinales (Celso y Galeno)',
        items: [
          'Rubor (enrojecimiento): vasodilatación, aumento flujo sanguíneo',
          'Tumor (tumefacción/edema): extravasación de líquido y células',
          'Calor: aumento flujo sanguíneo, metabolismo aumentado',
          'Dolor: estimulación de nociceptores por mediadores (bradicinina, PGE2)',
          'Pérdida de función (functio laesa): combinación de factores anteriores'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Respuesta vascular',
        items: [
          'Vasoconstricción transitoria inicial (segundos)',
          'Vasodilatación arteriolar: histamina, óxido nítrico, prostaglandinas',
          'Aumento de permeabilidad vascular: retracción células endoteliales',
          'Formación de espacios intercelulares en vénulas postcapilares',
          'Extravasación de proteínas plasmáticas (albúmina, fibrinógeno, Ig)',
          'Estasis sanguínea: concentración de eritrocitos, aumento viscosidad'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Mecanismos de aumento de permeabilidad',
        datos: [
          { label: 'Inmediato transitorio', value: 'Histamina, bradicinina; vénulas; 15-30 min' },
          { label: 'Inmediato sostenido', value: 'Lesión endotelial severa (quemaduras); todos los vasos' },
          { label: 'Retardado prolongado', value: 'Daño térmico/UV; 2-12h inicio, horas-días duración' },
          { label: 'Mediado por leucocitos', value: 'Adherencia leucocitaria, liberación enzimas/ROS' },
          { label: 'Angiogénesis', value: 'Nuevos vasos inmaduros y permeables' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Respuesta celular - reclutamiento leucocitario',
        items: [
          'Marginación: leucocitos se desplazan a periferia del vaso (estasis)',
          'Rodamiento (rolling): selectinas endoteliales (E, P) unen leucocitos',
          'Adhesión firme: integrinas (LFA-1, Mac-1) unen ICAM-1/VCAM-1',
          'Transmigración (diapédesis): migración entre células endoteliales',
          'PECAM-1 (CD31): facilita transmigración',
          'Quimiotaxis: migración dirigida hacia gradiente químico'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Quimioatrayentes principales',
        items: [
          'Productos bacterianos: fMLP (N-formil-metionil péptidos)',
          'Componentes del complemento: C5a, C3a',
          'Leucotrienos: LTB4 (potente quimioatrayente de neutrófilos)',
          'Quimiocinas: IL-8/CXCL8, MCP-1/CCL2, eotaxina/CCL11',
          'Productos de arachidónico: prostaglandinas, tromboxanos',
          'Citocinas: TNF-α, IL-1 (efectos indirectos)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Secuencia temporal celular',
        items: [
          '0-6 horas: predominio de neutrófilos (primera línea)',
          '6-24 horas: continúan neutrófilos',
          '24-48 horas: transición a monocitos/macrófagos',
          'Excepciones: infecciones virales (linfocitos), alergias (eosinófilos)',
          'Pseudomonas, E. coli: neutrófilos persistentes',
          'Tuberculosis: madurez temprana de macrófagos'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Defectos de adhesión leucocitaria (LAD): mutación integrinas, infecciones sin pus',
          'Síndrome de Chédiak-Higashi: defecto quimiotaxis y degranulación',
          'Deficiencia de C3: opsonización defectuosa, infecciones recurrentes',
          'AINEs: inhiben COX, reducen inflamación aguda (fiebre, dolor)',
          'Corticosteroides: múltiples efectos antiinflamatorios',
          'Edema cerebral post-trauma: inflamación aguda con consecuencias críticas'
        ]
      }
    ]
  },

  {
    id: 'inflamacion-cronica',
    nombre: 'Inflamación Crónica',
    icono: '🔄',
    subtitulo: 'Respuesta inflamatoria prolongada y destructiva',
    categorias: ['cronica', 'patologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Definición y características',
        items: [
          'Inflamación de duración prolongada (semanas a años)',
          'Coexistencia de destrucción tisular y reparación',
          'Infiltrado: macrófagos, linfocitos, células plasmáticas',
          'Proliferación de vasos sanguíneos (angiogénesis)',
          'Fibrosis: depósito de colágeno por fibroblastos',
          'Puede seguir a inflamación aguda o iniciarse insidiosamente'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Causas principales',
        items: [
          'Infecciones persistentes: Mycobacterium tuberculosis, Treponema pallidum, hongos',
          'Exposición prolongada a agentes tóxicos: sílice (silicosis), asbesto (asbestosis)',
          'Enfermedades autoinmunes: artritis reumatoide, lupus, esclerosis múltiple',
          'Cuerpos extraños: suturas, implantes, partículas no degradables',
          'Inflamación aguda no resuelta: absceso crónico',
          'Inflamación de bajo grado persistente: aterosclerosis, obesidad, envejecimiento'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Células características',
        items: [
          'Macrófagos: células efectoras principales, fagocitosis, secretan citocinas',
          'Células epitelioides: macrófagos activados, citoplasma abundante',
          'Células gigantes multinucleadas: fusión de macrófagos',
          'Linfocitos: T CD4+, T CD8+, células B, respuesta inmune adaptativa',
          'Células plasmáticas: producción de anticuerpos',
          'Eosinófilos: infecciones parasitarias, reacciones alérgicas',
          'Neutrófilos: menos prominentes excepto en inflamación activa continua'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Tipos de células gigantes',
        datos: [
          { label: 'Langhans', value: 'Núcleos en herradura periférica; tuberculosis, sarcoidosis' },
          { label: 'Cuerpo extraño', value: 'Núcleos dispersos al azar; reacción a material extraño' },
          { label: 'Touton', value: 'Núcleos en corona central; xantomas, lesiones lipídicas' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Inflamación granulomatosa',
        items: [
          'Patrón distintivo de inflamación crónica',
          'Granuloma: agregado de macrófagos activados (epitelioides)',
          'Granulomas inmunes: mediados por Th1, IFN-γ, IL-12',
          'Tuberculosis: granuloma con necrosis caseosa central',
          'Sarcoidosis: granulomas no caseificantes',
          'Enfermedad de Crohn: granulomas no caseificantes en intestino',
          'Lepra lepromatosa: macrófagos cargados de bacilos (células de Virchow)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Consecuencias de inflamación crónica',
        items: [
          'Fibrosis: cicatrización excesiva, pérdida de función',
          'Cirrosis hepática: fibrosis difusa, nódulos regenerativos',
          'Fibrosis pulmonar idiopática: restrictiva, intercambio gaseoso limitado',
          'Aterosclerosis: placa fibrosa, estenosis vascular',
          'Amiloidosis: depósito de amiloide sérico A (SAA)',
          'Anemia de enfermedad crónica: hepcidina aumentada, secuestro de hierro',
          'Caquexia: TNF-α, IL-1, IL-6 causan pérdida de peso'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Inflamación aguda vs crónica',
        datos: [
          { label: 'Inicio', value: 'Aguda: rápido / Crónica: insidioso' },
          { label: 'Duración', value: 'Aguda: días / Crónica: meses-años' },
          { label: 'Células', value: 'Aguda: neutrófilos / Crónica: macrófagos, linfocitos' },
          { label: 'Daño tisular', value: 'Aguda: leve / Crónica: severo, progresivo' },
          { label: 'Fibrosis', value: 'Aguda: mínima / Crónica: prominente' },
          { label: 'Signos sistémicos', value: 'Aguda: fiebre, leucocitosis / Crónica: anemia, caquexia' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Tuberculosis: granulomas caseificantes, diagnóstico por biopsia',
          'Enfermedad de Crohn: granulomas transmurales, complicaciones fibróticas',
          'Artritis reumatoide: sinovitis crónica, destrucción articular',
          'Cirrosis: causas múltiples (alcohol, hepatitis viral, NASH)',
          'Sarcoidosis: granulomas multisistémicos, causa desconocida',
          'Tratamiento: inmunosupresores, anti-TNF, corticosteroides, antifibróticos'
        ]
      }
    ]
  },

  {
    id: 'histamina',
    nombre: 'Histamina',
    icono: '💊',
    subtitulo: 'Amina vasoactiva almacenada en gránulos',
    categorias: ['mediadores', 'aguda'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Amina vasoactiva preformada en gránulos',
          'Sintetizada por descarboxilación de histidina',
          'Almacenada en: mastocitos, basófilos, plaquetas',
          'Liberación: degranulación de mastocitos/basófilos',
          'Mediador de fase inmediata (minutos)',
          'Inactivada por histaminasa'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Receptores de histamina',
        datos: [
          { label: 'H1', value: 'Células endoteliales, músculo liso; vasodilatación, permeabilidad, broncoconstricción' },
          { label: 'H2', value: 'Células parietales gástricas; secreción ácido gástrico' },
          { label: 'H3', value: 'SNC; neurotransmisor, regulación liberación histamina' },
          { label: 'H4', value: 'Células inmunes; quimiotaxis, modulación inmune' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Efectos biológicos (vía H1)',
        items: [
          'Vasodilatación arteriolar: enrojecimiento, calor',
          'Aumento permeabilidad venular: edema, formación de roncha',
          'Contracción músculo liso bronquial: broncoespasmo',
          'Estimulación de terminaciones nerviosas: prurito, dolor',
          'Activación endotelial: expresión de P-selectina',
          'Triple respuesta de Lewis: línea roja, eritema, roncha'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Estímulos de liberación',
        items: [
          'Inmunológicos: IgE + antígeno (reacciones alérgicas)',
          'Físicos: trauma, frío, calor, presión',
          'Anafilatoxinas: C3a, C5a del complemento',
          'Neuropéptidos: sustancia P',
          'Citocinas: IL-1, IL-8',
          'Fármacos: morfina, codeína, medios de contraste radiológicos'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Urticaria: liberación de histamina en dermis, ronchas pruriginosas',
          'Anafilaxia: liberación masiva sistémica, hipotensión, broncoespasmo',
          'Antihistamínicos H1: loratadina, cetirizina (alergias, urticaria)',
          'Antihistamínicos H2: ranitidina, famotidina (úlcera péptica)',
          'Mastocitosis: acumulación anormal de mastocitos, síntomas por histamina',
          'Angioedema: aumento permeabilidad en tejido profundo'
        ]
      }
    ]
  },

  {
    id: 'prostaglandinas',
    nombre: 'Prostaglandinas y Leucotrienos',
    icono: '🧪',
    subtitulo: 'Eicosanoides derivados del ácido araquidónico',
    categorias: ['mediadores', 'aguda', 'molecular'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Metabolismo del ácido araquidónico',
        items: [
          'Ácido araquidónico: ácido graso poliinsaturado 20 carbonos',
          'Derivado de fosfolípidos de membrana por fosfolipasa A2',
          'Vía COX: ciclooxigenasa → prostaglandinas, tromboxanos',
          'Vía LOX: lipooxigenasa → leucotrienos, lipoxinas',
          'Producción local, acción autocrina/paracrina',
          'Vida media corta (segundos a minutos)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Vía de la ciclooxigenasa (COX)',
        datos: [
          { label: 'COX-1', value: 'Constitutiva, "housekeeping"; protección gástrica, homeostasis' },
          { label: 'COX-2', value: 'Inducible por citocinas (IL-1, TNF); inflamación, dolor' },
          { label: 'PGE2', value: 'Vasodilatación, fiebre, dolor, permeabilidad vascular' },
          { label: 'PGI2 (prostaciclina)', value: 'Vasodilatación, inhibe agregación plaquetaria' },
          { label: 'PGD2', value: 'Vasodilatación, quimiotaxis neutrófilos' },
          { label: 'TXA2 (tromboxano)', value: 'Vasoconstricción, agregación plaquetaria' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Prostaglandina E2 (PGE2)',
        items: [
          'Prostaglandina más abundante en inflamación',
          'Vasodilatación arteriolar (eritema, calor)',
          'Potencia efecto de otros mediadores (bradicinina)',
          'Pirógeno endógeno: actúa en hipotálamo (fiebre)',
          'Hiperalgesia: sensibiliza nociceptores',
          'Producida por macrófagos, fibroblastos, células endoteliales'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vía de la lipooxigenasa (LOX)',
        items: [
          '5-LOX: predominante en leucocitos',
          'LTB4: potente quimioatrayente de neutrófilos',
          'LTC4, LTD4, LTE4: cisteinil-leucotrienos',
          'Cisteinil-LT: broncoconstricción, permeabilidad vascular',
          'Componentes de sustancia de reacción lenta de anafilaxia (SRS-A)',
          '12-LOX y 15-LOX: generan lipoxinas (antiinflamatorias)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Lipoxinas - mediadores pro-resolución',
        items: [
          'Lipoxina A4 (LXA4) y lipoxina B4 (LXB4)',
          'Generadas por interacción 15-LOX y 5-LOX',
          'Inhiben quimiotaxis de neutrófilos',
          'Estimulan fagocitosis de neutrófilos apoptóticos por macrófagos',
          'Inhiben adhesión leucocitaria',
          'Promueven resolución de inflamación'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Inhibidores farmacológicos',
        datos: [
          { label: 'AINEs no selectivos', value: 'Aspirina, ibuprofeno, naproxeno; inhiben COX-1 y COX-2' },
          { label: 'COX-2 selectivos', value: 'Celecoxib; menos gastrotoxicidad, riesgo CV' },
          { label: 'Corticosteroides', value: 'Inhiben fosfolipasa A2 (lipocortina-1/anexina-1)' },
          { label: 'Anti-leucotrienos', value: 'Montelukast, zafirlukast; antagonistas receptor LT, asma' },
          { label: 'Zileuton', value: 'Inhibidor 5-LOX, asma' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Aspirina: antiinflamatorio, antipirético, antiagregante (inhibe TXA2)',
          'Úlcera péptica: AINEs inhiben COX-1, reducen PGs protectoras gástricas',
          'Asma: leucotrienos causan broncoespasmo, anti-LT efectivos',
          'Síndrome de Reye: aspirina en niños con infección viral, evitar',
          'Conducto arterioso persistente: PGE2 mantiene abierto, indometacina cierra',
          'Misoprostol: análogo PGE1, protección gástrica en usuarios crónicos AINEs'
        ]
      }
    ]
  },

  {
    id: 'citocinas-inflamacion',
    nombre: 'Citocinas Inflamatorias',
    icono: '📢',
    subtitulo: 'Mensajeros proteicos de respuesta inflamatoria',
    categorias: ['mediadores', 'aguda', 'cronica'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Citocinas proinflamatorias principales',
        items: [
          'TNF-α (Factor de Necrosis Tumoral alfa)',
          'IL-1β (Interleucina-1 beta)',
          'IL-6 (Interleucina-6)',
          'Producidas por: macrófagos, células dendríticas, células endoteliales',
          'Desencadenantes: PAMPs, DAMPs, otras citocinas',
          'Acciones: locales (autocrina/paracrina) y sistémicas (endocrina)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'TNF-α (Factor de Necrosis Tumoral)',
        items: [
          'Producido principalmente por macrófagos activados',
          'Activación endotelial: expresión de E-selectina, ICAM-1, VCAM-1',
          'Induce producción de IL-1, IL-6, quimiocinas',
          'Estimula producción de PGI2, NO → vasodilatación',
          'Efectos sistémicos: fiebre, anorexia, caquexia',
          'Dosis altas: shock séptico (vasodilatación, coagulación)',
          'Induce apoptosis en células sensibles',
          'Activación de NF-κB: transcripción genes inflamatorios'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'IL-1β (Interleucina-1 beta)',
        items: [
          'Producida por macrófagos, células dendríticas, epiteliales',
          'Sintetizada como pro-IL-1β inactiva',
          'Activada por inflamasoma NLRP3 y caspasa-1',
          'Efectos similares a TNF-α: activación endotelial, fiebre',
          'Pirógeno endógeno: actúa en hipotálamo',
          'Induce proteínas de fase aguda en hígado',
          'Estimula producción de prostaglandinas',
          'Amplifica respuesta inflamatoria'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'IL-6 (Interleucina-6)',
        items: [
          'Producida por macrófagos, células T, fibroblastos, células endoteliales',
          'Principal inductor de respuesta de fase aguda hepática',
          'Estimula producción: PCR, SAA, fibrinógeno, haptoglobina',
          'Pirógeno',
          'Estimula producción de anticuerpos por células B',
          'Diferenciación de células T efectoras (Th17)',
          'Niveles elevados crónicos: inflamación sistémica, amiloidosis'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Quimiocinas inflamatorias',
        datos: [
          { label: 'IL-8 (CXCL8)', value: 'Quimiotaxis de neutrófilos, activación' },
          { label: 'MCP-1 (CCL2)', value: 'Reclutamiento de monocitos/macrófagos' },
          { label: 'Eotaxina (CCL11)', value: 'Reclutamiento de eosinófilos' },
          { label: 'MIP-1α (CCL3)', value: 'Reclutamiento monocitos, linfocitos T' },
          { label: 'RANTES (CCL5)', value: 'Reclutamiento células T memoria, eosinófilos' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Proteínas de fase aguda',
        items: [
          'Proteína C reactiva (PCR): opsonina, activa complemento',
          'Amiloide sérico A (SAA): recluta células inmunes, precursor de amiloide',
          'Fibrinógeno: coagulación, VSG aumentada',
          'Haptoglobina: une hemoglobina libre',
          'Ceruloplasmina: transporte de cobre, antioxidante',
          'Complemento (C3, Factor B): opsonización, lisis',
          'Reducción de albúmina, transferrina (fase aguda negativa)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Efectos sistémicos de citocinas',
        items: [
          'Fiebre: IL-1, IL-6, TNF-α actúan en hipotálamo → PGE2',
          'Leucocitosis: movilización de neutrófilos de médula (G-CSF)',
          'Respuesta de fase aguda: IL-6 → proteínas hepáticas',
          'Anorexia y caquexia: TNF-α, IL-1 (inflamación crónica)',
          'Anemia de enfermedad crónica: IL-6 → hepcidina → secuestro hierro',
          'Shock séptico: TNF-α, IL-1 excesivos → vasodilatación, CID'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Sepsis: liberación masiva TNF-α, IL-1 → shock, falla multiorgánica',
          'Anti-TNF: infliximab, etanercept, adalimumab (AR, Crohn, psoriasis)',
          'Anti-IL-1: anakinra (receptor antagonista), canakinumab (Ab anti-IL-1β)',
          'Anti-IL-6: tocilizumab (AR, arteritis células gigantes, COVID-19 severo)',
          'Síndromes autoinflamatorios: CAPS, FMF, TRAPS (exceso IL-1)',
          'Tormenta de citocinas: sepsis, CAR-T, COVID-19 severo',
          'PCR: marcador inflamación, riesgo CV, diagnóstico infección'
        ]
      }
    ]
  },

  {
    id: 'complemento-inflamacion',
    nombre: 'Sistema del Complemento en Inflamación',
    icono: '🔗',
    subtitulo: 'Cascada proteica amplificadora de inflamación',
    categorias: ['mediadores', 'aguda', 'molecular'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Productos del complemento en inflamación',
        items: [
          'C3a y C5a: anafilatoxinas, mediadores inflamatorios potentes',
          'C3b: opsonina, facilita fagocitosis',
          'C5b-9 (MAC): complejo de ataque a membrana',
          'Activación en inflamación: todas las vías (clásica, alternativa, lectinas)',
          'Amplificación en cascada: un evento inicial activa múltiples moléculas',
          'Regulación estricta: proteínas reguladoras previenen daño a células propias'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Anafilatoxinas C3a y C5a',
        datos: [
          { label: 'C5a', value: 'Más potente, quimiotaxis neutrófilos/monocitos' },
          { label: 'Activación leucocitaria', value: 'Aumenta adhesión, fagocitosis, estallido respiratorio' },
          { label: 'Degranulación mastocitos', value: 'Liberación histamina → vasodilatación, permeabilidad' },
          { label: 'Contracción músculo liso', value: 'Broncoconstricción (anafilaxia)' },
          { label: 'Receptor C5aR (CD88)', value: 'En neutrófilos, monocitos, mastocitos, células endoteliales' },
          { label: 'C3a', value: 'Similar a C5a pero menos potente' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Opsonización por C3b',
        items: [
          'C3b se deposita covalentemente en superficie microbiana',
          'Reconocido por receptores CR1 (CD35) en fagocitos',
          'Potencia fagocitosis 1000-10000 veces',
          'iC3b (C3b inactivado): reconocido por CR3 (Mac-1, CD11b/CD18)',
          'Sinergia con anticuerpos IgG (doble opsonización)',
          'Crítico para aclaramiento de bacterias encapsuladas'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Activación del complemento en inflamación',
        items: [
          'Vía alternativa: activación espontánea amplificada en superficies extrañas',
          'Vía clásica: inmunocomplejos, PCR, células apoptóticas',
          'Vía lectinas: MBL reconoce patrones de carbohidratos',
          'Lesión tisular: DAMPs activan complemento',
          'Isquemia-reperfusión: generación de C5a → daño tisular',
          'Inflamación estéril: cristales (gota), colesterol (aterosclerosis)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Regulación del complemento',
        items: [
          'Factor H: discrimina células propias vs extrañas',
          'DAF (CD55): acelera disociación de convertasas',
          'MCP (CD46): cofactor inactivación de C3b',
          'CD59: inhibe formación de MAC',
          'C1-INH: inhibe C1r, C1s de vía clásica',
          'Desregulación: daño a tejidos propios (HPN, SUHa)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Angioedema hereditario: deficiencia C1-INH, edema por bradicinina',
          'HPN: deficiencia CD55/CD59, hemólisis por MAC',
          'SUHa: mutaciones Factor H, activación descontrolada en endotelio',
          'Lesión por isquemia-reperfusión: C5a media daño, anti-C5 protege',
          'ARDS: C5a contribuye a daño pulmonar',
          'Eculizumab (anti-C5): HPN, SUHa, miastenia gravis refractaria',
          'Deficiencias C3: infecciones por bacterias encapsuladas (Streptococcus, Neisseria)'
        ]
      }
    ]
  },

  {
    id: 'oxido-nitrico',
    nombre: 'Óxido Nítrico (NO)',
    icono: '💨',
    subtitulo: 'Gas radical libre vasodilatador y antimicrobiano',
    categorias: ['mediadores', 'aguda', 'molecular'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Síntesis y características',
        items: [
          'Gas radical libre de vida corta (segundos)',
          'Sintetizado por óxido nítrico sintasas (NOS)',
          'Sustrato: L-arginina + O2 → L-citrulina + NO',
          'Difunde libremente a través de membranas',
          'Soluble en fase acuosa y lipídica',
          'Inactivado por hemoglobina y superóxido (O2⁻)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Isoformas de NOS',
        datos: [
          { label: 'eNOS (NOS3)', value: 'Endotelial, constitutiva, dependiente Ca²⁺/calmodulina' },
          { label: 'nNOS (NOS1)', value: 'Neuronal, constitutiva, neurotransmisor' },
          { label: 'iNOS (NOS2)', value: 'Inducible, macrófagos/neutrófilos, independiente Ca²⁺' },
          { label: 'Inducción iNOS', value: 'Citocinas (IFN-γ, TNF-α, IL-1), LPS bacteriano' },
          { label: 'Producción iNOS', value: 'Altas cantidades (μM vs nM de eNOS)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Efectos vasodilatadores (eNOS)',
        items: [
          'Activación de guanilato ciclasa soluble → cGMP',
          'cGMP activa PKG → relajación músculo liso vascular',
          'Vasodilatación: aumento flujo sanguíneo, reduce presión arterial',
          'Inhibe adhesión y agregación plaquetaria',
          'Reduce adhesión leucocitaria al endotelio',
          'Efecto protector vascular: antiateroesclerótico'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Efectos antimicrobianos (iNOS)',
        items: [
          'Producción masiva por macrófagos activados',
          'Daño a DNA, proteínas y lípidos microbianos',
          'Inhibe replicación y respiración mitocondrial',
          'Sinergiza con ROS (especies reactivas de oxígeno)',
          'NO + O2⁻ → peroxinitrito (ONOO⁻), altamente reactivo',
          'Crítico para control de Mycobacterium, Leishmania, Toxoplasma'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Roles en inflamación',
        items: [
          'Vasodilatación arteriolar (eritema, calor)',
          'Aumento de permeabilidad vascular (edema)',
          'Inhibición de adhesión leucocitaria (antiinflamatorio paradójico)',
          'Regulación de producción de citocinas',
          'Muerte de patógenos intracelulares',
          'Exceso: hipotensión en shock séptico'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Nitroglicerina: donador de NO, angina de pecho',
          'Sildenafil (Viagra): inhibe fosfodiesterasa-5, potencia cGMP',
          'Shock séptico: exceso de NO → vasodilatación, hipotensión refractaria',
          'Aterosclerosis: disfunción endotelial, reducción de NO',
          'Disfunción eréctil: déficit de NO en cuerpo cavernoso',
          'NO inhalado: hipertensión pulmonar del recién nacido',
          'Inhibidores iNOS: investigación en sepsis, artritis'
        ]
      }
    ]
  },

  {
    id: 'radicales-libres',
    nombre: 'Especies Reactivas de Oxígeno (ROS)',
    icono: '⚡',
    subtitulo: 'Radicales libres en defensa y daño tisular',
    categorias: ['mediadores', 'aguda', 'molecular'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Moléculas con electrones no apareados altamente reactivas',
          'Producidas en estallido respiratorio de fagocitos',
          'Función dual: microbicida y lesión tisular',
          'Vida media corta (microsegundos a segundos)',
          'Producidas por NADPH oxidasa (fagocitos)',
          'Detoxificadas por sistemas antioxidantes'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Principales especies reactivas',
        datos: [
          { label: 'Anión superóxido (O2⁻)', value: 'Producto primario de NADPH oxidasa' },
          { label: 'Peróxido de hidrógeno (H2O2)', value: 'O2⁻ + SOD → H2O2, más estable' },
          { label: 'Radical hidroxilo (•OH)', value: 'H2O2 + Fe²⁺ (Fenton) → •OH, muy reactivo' },
          { label: 'Ácido hipocloroso (HOCl)', value: 'H2O2 + mieloperoxidasa + Cl⁻ → HOCl (lejía)' },
          { label: 'Peroxinitrito (ONOO⁻)', value: 'NO + O2⁻, nitración de proteínas' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Estallido respiratorio (respiratory burst)',
        items: [
          'Activación de NADPH oxidasa en fagocitos',
          'Consumo masivo de O2 (aumento 10-20 veces)',
          'Ensamblaje de subunidades: p47phox, p67phox, p40phox, gp91phox, p22phox',
          'Generación de O2⁻ en fagosoma',
          'Cascada enzimática: O2⁻ → H2O2 → HOCl',
          'Pico de producción: 15-30 minutos post-fagocitosis'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Mecanismos de muerte microbiana',
        items: [
          'HOCl (mieloperoxidasa): halogenación de proteínas',
          'Daño a DNA: ruptura de cadenas, mutaciones',
          'Peroxidación lipídica: daño a membranas celulares',
          'Oxidación de proteínas: inactivación enzimática',
          'Daño mitocondrial: pérdida de potencial de membrana',
          'Sinergia con NO: formación de peroxinitrito'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Sistemas antioxidantes',
        items: [
          'Superóxido dismutasa (SOD): O2⁻ → H2O2',
          'Catalasa: H2O2 → H2O + O2',
          'Glutatión peroxidasa: H2O2 + glutatión → H2O',
          'Glutatión: tripéptido, antioxidante intracelular principal',
          'Vitamina E: antioxidante lipofílico en membranas',
          'Vitamina C: antioxidante hidrofílico',
          'Balance: producción vs detoxificación'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Daño tisular por ROS',
        items: [
          'Lesión por isquemia-reperfusión: producción masiva al restaurar flujo',
          'Inflamación crónica: ROS de neutrófilos/macrófagos',
          'Fibrosis: estimulación de fibroblastos',
          'Daño endotelial: disfunción vascular',
          'Carcinogénesis: mutaciones por daño a DNA',
          'Envejecimiento: teoría del daño oxidativo acumulativo'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Enfermedad granulomatosa crónica (CGD): defecto NADPH oxidasa, infecciones recurrentes',
          'Infecciones CGD: Staphylococcus, Aspergillus, Burkholderia, Serratia',
          'Prueba NBT (nitroblue tetrazolium): diagnóstico CGD',
          'Lesión por reperfusión: infarto miocárdico, ACV, trasplantes',
          'ARDS: daño pulmonar por neutrófilos activados',
          'N-acetilcisteína: precursor de glutatión, antioxidante',
          'Alopurinol: inhibe xantina oxidasa, reduce ROS'
        ]
      }
    ]
  },

  {
    id: 'resolucion-inflamacion',
    nombre: 'Resolución de la Inflamación',
    icono: '✅',
    subtitulo: 'Terminación activa del proceso inflamatorio',
    categorias: ['aguda', 'molecular'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Concepto de resolución',
        items: [
          'Proceso activo, no pasivo, de terminación de inflamación',
          'Cambio de mediadores pro- a anti-inflamatorios',
          'Aclaramiento de neutrófilos y mediadores',
          'Restauración de homeostasis tisular',
          'Prevención de progresión a inflamación crónica',
          'Defectos en resolución → enfermedad crónica'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Mediadores especializados pro-resolución (SPMs)',
        items: [
          'Lipoxinas (LXA4, LXB4): derivadas de ácido araquidónico',
          'Resolvinas (serie E y D): derivadas de EPA y DHA',
          'Protectinas: derivadas de DHA',
          'Maresinas: derivadas de DHA, producidas por macrófagos',
          'Inhiben reclutamiento de neutrófilos',
          'Estimulan fagocitosis de células apoptóticas (eferocitosis)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Lipoxinas',
        datos: [
          { label: 'Síntesis', value: 'Interacción leucocitos-plaquetas, neutrófilos-células endoteliales' },
          { label: 'LXA4', value: 'Inhibe quimiotaxis neutrófilos, estimula monocitos no-inflamatorios' },
          { label: 'Receptor ALX/FPR2', value: 'En neutrófilos, monocitos, macrófagos' },
          { label: 'Aspirina', value: 'COX-2 acetilada genera 15-epi-LXA4 (aspirin-triggered LX)' },
          { label: 'Efectos', value: 'Anti-inflamatorio, pro-resolución, sin inmunosupresión' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Cambio fenotípico de macrófagos',
        items: [
          'M1 (clásicos): pro-inflamatorios, fase temprana',
          'M2 (alternativos): pro-resolución, reparación',
          'Señales M2: IL-4, IL-13, células apoptóticas',
          'M2 producen: IL-10, TGF-β, factores de crecimiento',
          'Eferocitosis: fagocitosis de neutrófilos apoptóticos',
          'Eferocitosis → producción de SPMs y citocinas anti-inflamatorias'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Apoptosis de neutrófilos',
        items: [
          'Neutrófilos tienen vida corta en tejidos (24-48h)',
          'Apoptosis constitutiva: evita liberación contenido tóxico',
          'Señales de apoptosis: pérdida de factores supervivencia',
          'Reconocimiento: fosfatidilserina expuesta externamente',
          'Receptores eferocitosis: Tim-4, BAI1, MerTK en macrófagos',
          'Eferocitosis silenciosa: sin producción de citocinas pro-inflamatorias'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Citocinas anti-inflamatorias',
        items: [
          'IL-10: suprime macrófagos M1, inhibe TNF-α, IL-1, IL-12',
          'TGF-β: supresión inmune, induce fibrosis',
          'IL-1Ra (antagonista receptor IL-1): bloquea IL-1',
          'Receptores solubles: sTNFR, sIL-6R (secuestran citocinas)',
          'Glucocorticoides endógenos: cortisol, antiinflamatorio',
          'Anexina-1: inducida por glucocorticoides, pro-resolución'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Aclaramiento de mediadores',
        items: [
          'Degradación enzimática: histaminasa (histamina), enzimas (leucotrienos)',
          'Dilución por flujo sanguíneo linfático',
          'Fagocitosis de neutrófilos apoptóticos',
          'Inhibidores endógenos: antiproteasas (α1-antitripsina)',
          'Restauración de barrera endotelial',
          'Normalización de permeabilidad vascular'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Falla en resolución',
        items: [
          'Inflamación crónica: artritis reumatoide, aterosclerosis, asma',
          'Fibrosis: resolución incompleta con cicatrización excesiva',
          'Suplementos omega-3 (EPA/DHA): precursores de resolvinas',
          'Aspirina: genera lipoxinas (efecto pro-resolución adicional)',
          'Defectos eferocitosis: lupus (apoptosis defectuosa), aterosclerosis',
          'Terapias futuras: administración de SPMs, agonistas ALX',
          'CPAP en apnea del sueño: mejora resolución de inflamación'
        ]
      }
    ]
  },

  {
    id: 'neutrofilos-inflamacion',
    nombre: 'Neutrófilos en Inflamación Aguda',
    icono: '⚪',
    subtitulo: 'Fagocitos de primera respuesta',
    categorias: ['celulas', 'aguda'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Leucocitos más abundantes en sangre (40-70%)',
          'Granulocitos polimorfonucleares (PMN)',
          'Primera línea celular en inflamación aguda',
          'Vida corta: 6-10 horas en circulación, 1-2 días en tejidos',
          'Producción: 10¹¹ células/día en médula ósea',
          'Núcleo multilobulado (3-5 lóbulos)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Reclutamiento al sitio de inflamación',
        items: [
          'Marginación: leucocitos a periferia del vaso',
          'Rodamiento: selectinas (E, P, L) median adhesión débil',
          'Activación: quimiocinas activan integrinas',
          'Adhesión firme: LFA-1, Mac-1 unen ICAM-1, VCAM-1',
          'Transmigración: paso entre células endoteliales',
          'Migración: quimiotaxis hacia gradiente de C5a, LTB4, IL-8'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Funciones efectoras',
        items: [
          'Fagocitosis: ingestión de microorganismos opsonizados',
          'Degranulación: liberación de enzimas antimicrobianas',
          'Estallido respiratorio: producción de ROS',
          'NETs: trampas extracelulares de DNA',
          'Producción de citocinas: IL-1β, IL-8, TNF-α (menor que macrófagos)',
          'Presentación antigénica limitada (no son APCs profesionales)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Gránulos de neutrófilos',
        datos: [
          { label: 'Azurófilos (primarios)', value: 'Mieloperoxidasa, elastasa, catepsina G, defensinas' },
          { label: 'Específicos (secundarios)', value: 'Lactoferrina, colagenasa, NADPH oxidasa' },
          { label: 'Gelatinasa (terciarios)', value: 'Gelatinasa, catepsina' },
          { label: 'Vesículas secretoras', value: 'Plasmina, receptores (CR1, fMLP-R)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'NETs (Neutrophil Extracellular Traps)',
        items: [
          'Redes de cromatina extracelular descubiertas en 2004',
          'Composición: DNA, histonas, enzimas granulares (elastasa, MPO)',
          'Formación: NETosis (muerte celular) o vital (célula sobrevive)',
          'Función: atrapar y matar bacterias, hongos',
          'Efectos adversos: daño tisular, trombosis, autoinmunidad',
          'Implicados: sepsis, lupus, vasculitis, COVID-19'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Destino de neutrófilos',
        items: [
          'Apoptosis constitutiva tras 24-48h en tejidos',
          'Eferocitosis: fagocitosis por macrófagos',
          'NETosis: liberación de NETs y muerte',
          'Migración inversa: retorno a circulación (raro)',
          'Aclaramiento: evita necrosis secundaria y daño tisular'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Neutropenia (<1500/μL): riesgo de infecciones bacterianas/fúngicas',
          'Neutropenia febril: emergencia en pacientes con quimioterapia',
          'LAD (deficiencia adhesión leucocitaria): mutación CD18, infecciones sin pus',
          'CGD: defecto NADPH oxidasa, infecciones por catalasa-positivos',
          'G-CSF (filgrastim): estimula producción post-quimioterapia',
          'Absceso: acumulación de neutrófilos muertos (pus)',
          'Sepsis: neutrófilos activados causan daño endotelial'
        ]
      }
    ]
  },

  {
    id: 'macrofagos-inflamacion',
    nombre: 'Macrófagos en Inflamación',
    icono: '🔬',
    subtitulo: 'Orquestadores de inflamación y reparación',
    categorias: ['celulas', 'aguda', 'cronica'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Células mononucleares fagocíticas de vida larga',
          'Origen: monocitos circulantes o proliferación local',
          'Presentes en todos los tejidos',
          'Heterogeneidad tisular: Kupffer (hígado), microglía (cerebro), alveolares (pulmón)',
          'Plasticidad funcional: M1 vs M2',
          'Funciones: fagocitosis, presentación Ag, reparación tisular'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Polarización M1 vs M2',
        datos: [
          { label: 'M1 (clásicos)', value: 'IFN-γ, LPS, TNF-α → pro-inflamatorio, microbicida' },
          { label: 'M1 producen', value: 'IL-1, IL-6, IL-12, TNF-α, NO, ROS' },
          { label: 'M1 función', value: 'Muerte patógenos intracelulares, presentación Ag, Th1' },
          { label: 'M2 (alternativos)', value: 'IL-4, IL-13, IL-10 → reparación, anti-inflamatorio' },
          { label: 'M2 producen', value: 'IL-10, TGF-β, arginasa, factores crecimiento (VEGF, PDGF)' },
          { label: 'M2 función', value: 'Eferocitosis, angiogénesis, fibrosis, Th2' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Funciones en inflamación aguda',
        items: [
          'Fagocitosis de patógenos y células apoptóticas',
          'Producción de citocinas: TNF-α, IL-1, IL-6',
          'Quimiocinas: reclutan neutrófilos y monocitos adicionales',
          'Presentación antigénica a linfocitos T',
          'Producción de NO y ROS (mecanismos microbicidas)',
          'Regulan intensidad y duración de inflamación'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Funciones en inflamación crónica',
        items: [
          'Células dominantes en inflamación crónica',
          'Formación de granulomas (células epitelioides)',
          'Producción sostenida de citocinas',
          'Remodelación tisular: MMPs, factores de crecimiento',
          'Angiogénesis: VEGF',
          'Fibrosis: estimulan fibroblastos (TGF-β, PDGF)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Eferocitosis',
        items: [
          'Fagocitosis de células apoptóticas (neutrófilos, otros)',
          'Reconocimiento: fosfatidilserina en células apoptóticas',
          'Receptores: Tim-4, BAI1, MerTK, integrinas αvβ3/αvβ5',
          'Puentes: MFG-E8, Gas6, proteína S',
          'Respuesta anti-inflamatoria: IL-10, TGF-β',
          'Resolución de inflamación sin amplificación'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Transición M1 a M2',
        items: [
          'Fase temprana (0-48h): M1 predominan',
          'Fase tardía (>48h): transición a M2',
          'Señales: células apoptóticas, IL-4, IL-13, glucocorticoides',
          'Cambio metabólico: glicolisis (M1) → fosforilación oxidativa (M2)',
          'Arginasa (M2) vs iNOS (M1): competencia por arginina',
          'Balance M1/M2: determina resolución vs cronicidad'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Tuberculosis: macrófagos forman granulomas, bacterias sobreviven intracelularmente',
          'Aterosclerosis: macrófagos cargados de lípidos (células espumosas)',
          'TAMs (macrófagos asociados a tumor): fenotipo M2, pro-tumoral',
          'Artritis reumatoide: macrófagos sinoviales M1, destrucción articular',
          'Fibrosis pulmonar: macrófagos M2 excesivos',
          'Terapias: anti-CSF1R (depleta macrófagos), re-polarización M2→M1 en cáncer'
        ]
      }
    ]
  }
];
