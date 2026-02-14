// ═══════════════════════════════════════════════════════════
// BACTERIAS DATA - Base de datos de bacterias
// ═══════════════════════════════════════════════════════════

const BACTERIAS_DATA = [
  {
    id: 'escherichia-coli',
    nombre: 'Escherichia coli',
    subtitulo: 'Bacilo Gram negativo · Enterobacteria',
    icono: '🦠',
    categorias: ['gram-negativas', 'bacilos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilo (bastón) de 1-3 μm de longitud',
          'Pared celular: Gram negativa con LPS (lipopolisacárido)',
          'Movilidad: Flagelos peritricos (distribuidos por toda la superficie)',
          'Cápsula: Presente en cepas patógenas (antígeno K)',
          'Pili: Fimbrias tipo 1 y pili sexuales (F)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Aerobia facultativa (crece con o sin oxígeno)',
          'Fermentación de lactosa con producción de ácido y gas',
          'Temperatura óptima: 37°C (mesófila)',
          'Tiempo de generación: 20 minutos en condiciones óptimas',
          'Producción de indol a partir de triptófano'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '4.6 - 5.5 Mb' },
          { label: 'Número de genes', value: '~4,300 genes' },
          { label: 'Contenido GC', value: '50-51%' },
          { label: 'Plásmidos', value: 'Múltiples (resistencia, virulencia)' },
          { label: 'Fagos', value: 'λ, T4, T7 (modelos de estudio)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Infecciones del tracto urinario (ITU) - cepa uropatógena (UPEC)',
          'Gastroenteritis por E. coli enterotoxigénica (ETEC)',
          'Síndrome urémico hemolítico por E. coli O157:H7 (EHEC)',
          'Meningitis neonatal (E. coli K1)',
          'Sepsis y bacteriemia en pacientes inmunocomprometidos'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Toxina Shiga (Stx) en cepas EHEC',
          'Enterotoxinas termolábil (LT) y termoestable (ST) en ETEC',
          'Adhesinas: intimina (eae), fimbrias P y Dr',
          'Sistemas de secreción tipo III (T3SS)',
          'Sideróforos para captación de hierro'
        ]
      }
    ]
  },
  {
    id: 'staphylococcus-aureus',
    nombre: 'Staphylococcus aureus',
    subtitulo: 'Coco Gram positivo · Catalasa positiva',
    icono: '🔴',
    categorias: ['gram-positivas', 'cocos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Cocos esféricos de 0.5-1.5 μm, agrupados en racimos',
          'Pared celular: Gram positiva con peptidoglicano grueso (90%)',
          'Ácidos teicoicos: Abundantes, unidos a peptidoglicano',
          'Cápsula: Polisacárido (tipos 5 y 8 en cepas invasivas)',
          'Sin movilidad: Carece de flagelos'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Aerobia facultativa con metabolismo respiratorio y fermentativo',
          'Catalasa positiva (diferencia de Streptococcus)',
          'Coagulasa positiva (característica diagnóstica)',
          'Fermentación de manitol con producción de ácido',
          'Halotolerante: crece en NaCl al 7.5%',
          'Temperatura óptima: 30-37°C'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '2.8 - 2.9 Mb' },
          { label: 'Número de genes', value: '~2,600 genes' },
          { label: 'Contenido GC', value: '32-33%' },
          { label: 'Elementos móviles', value: 'SCCmec (resistencia meticilina)' },
          { label: 'Islas de patogenicidad', value: 'SaPI (toxinas y superantígenos)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Infecciones de piel y tejidos blandos (foliculitis, impétigo, abscesos)',
          'MRSA (S. aureus resistente a meticilina) - infecciones nosocomiales',
          'Endocarditis bacteriana en válvulas nativas y protésicas',
          'Neumonía necrotizante post-influenza',
          'Síndrome de shock tóxico (TSS) por TSST-1',
          'Intoxicación alimentaria por enterotoxinas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Proteína A: se une a región Fc de IgG (evasión inmune)',
          'Coagulasa y factor de aglutinación: formación de fibrina protectora',
          'Hemolisinas (α, β, γ, δ): lisis de eritrocitos y leucocitos',
          'Leucocidina Panton-Valentine (PVL): destrucción de leucocitos',
          'Toxinas exfoliativas (ETA, ETB): síndrome de piel escaldada',
          'TSST-1 y enterotoxinas: superantígenos',
          'Biofilm: formación en dispositivos médicos'
        ]
      }
    ]
  },
  {
    id: 'mycobacterium-tuberculosis',
    nombre: 'Mycobacterium tuberculosis',
    subtitulo: 'Bacilo ácido-alcohol resistente · Aerobio estricto',
    icono: '🫁',
    categorias: ['acido-alcohol-resistentes', 'bacilos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilo delgado y curvo de 1-4 μm de longitud',
          'Pared celular única: Rica en ácidos micólicos (60% lípidos)',
          'Tinción: Ácido-alcohol resistente (Ziehl-Neelsen, auramina)',
          'Cápsula: Glucanos y arabinogalactanos',
          'Sin flagelos: bacteria inmóvil',
          'Factor cordón: Trehalosa-6,6-dimicolato (virulencia)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Aerobio estricto obligado (requiere O₂)',
          'Crecimiento extremadamente lento: 15-20 horas de duplicación',
          'Metabolismo lipídico: oxidación de ácidos grasos',
          'Catalasa y peroxidasa positivas',
          'Temperatura óptima: 37°C',
          'Resistencia a desecación y desinfectantes por pared lipídica'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '4.4 Mb' },
          { label: 'Número de genes', value: '~4,000 genes' },
          { label: 'Contenido GC', value: '65.6%' },
          { label: 'Regiones de diferencia', value: 'RD1-RD16 (diferencia de BCG)' },
          { label: 'Genes de resistencia', value: 'rpoB, katG, inhA (mutaciones)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Tuberculosis pulmonar: forma más común (85% de casos)',
          'Tuberculosis extrapulmonar: meningitis, linfadenitis, renal, ósea',
          'TB latente: infección sin enfermedad activa (1/4 población mundial)',
          'TB-MDR: resistencia a isoniazida y rifampicina',
          'TB-XDR: resistencia adicional a fluoroquinolonas y aminoglucósidos',
          'Coinfección VIH-TB: principal causa de muerte en VIH+'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Sistema de secreción ESX-1 (ESAT-6, CFP-10): escape del fagosoma',
          'Lipoarabinomanano (LAM): modulación de respuesta inmune',
          'Factor cordón (TDM): formación de granulomas y necrosis',
          'Sulfolípidos (SL-1): inhibición de fusión fagosoma-lisosoma',
          'Catalasa-peroxidasa KatG: resistencia a peróxido de hidrógeno',
          'Dormancia: persistencia en granulomas durante décadas'
        ]
      }
    ]
  },
  {
    id: 'streptococcus-pyogenes',
    nombre: 'Streptococcus pyogenes',
    subtitulo: 'Coco Gram positivo · Estreptococo β-hemolítico Grupo A',
    icono: '⛓️',
    categorias: ['gram-positivas', 'cocos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Cocos esféricos de 0.6-1.0 μm en cadenas',
          'Pared celular: Gram positiva con proteína M (antifagocítica)',
          'Cápsula: Ácido hialurónico (idéntico al humano)',
          'Carbohidrato C: Define grupo Lancefield A',
          'Sin movilidad ni esporas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Anaerobio facultativo con preferencia anaerobia',
          'Catalasa negativa (diferencia de Staphylococcus)',
          'β-hemólisis: hemólisis completa en agar sangre',
          'Fermentación de glucosa con producción de ácido láctico',
          'Bacitracina sensible (prueba diagnóstica)',
          'Temperatura óptima: 37°C'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '1.8 - 1.9 Mb' },
          { label: 'Número de genes', value: '~1,700 genes' },
          { label: 'Contenido GC', value: '38.5%' },
          { label: 'Profagos', value: 'Portadores de toxinas (SPE)' },
          { label: 'Variación antigénica', value: '>220 tipos de proteína M' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Faringitis estreptocócica ("strep throat")',
          'Escarlatina: faringitis + exantema por toxina eritrogénica',
          'Erisipela e impétigo: infecciones cutáneas',
          'Celulitis y fascitis necrotizante ("bacteria come-carne")',
          'Síndrome de shock tóxico estreptocócico (STSS)',
          'Fiebre reumática aguda: complicación post-infección (mimetismo molecular)',
          'Glomerulonefritis post-estreptocócica'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Proteína M: antifagocítica, >220 serotipos',
          'Cápsula de ácido hialurónico: mimetismo molecular',
          'Estreptolisina O (SLO) y S (SLS): hemolisinas',
          'Exotoxinas pirogénicas (SPE A-C): superantígenos',
          'Estreptocinasa: fibrinolisis, diseminación',
          'DNasas A-D: degradación de DNA, licuefacción de pus',
          'Hialuronidasa: "factor de diseminación"'
        ]
      }
    ]
  },
  {
    id: 'pseudomonas-aeruginosa',
    nombre: 'Pseudomonas aeruginosa',
    subtitulo: 'Bacilo Gram negativo · Aerobio estricto · Patógeno oportunista',
    icono: '💚',
    categorias: ['gram-negativas', 'bacilos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilo recto o ligeramente curvo de 1.5-3.0 μm',
          'Pared celular: Gram negativa con LPS (endotoxina)',
          'Flagelo polar monotrico: movilidad característica',
          'Pili tipo IV: motilidad twitching y adherencia',
          'Producción de pigmentos: piocianina (azul-verde), pioverdina (amarillo-verde)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Aerobio estricto obligado (requiere O₂)',
          'Metabolismo versátil: utiliza >75 compuestos orgánicos',
          'Oxidasa positiva (diferencia de Enterobacterias)',
          'No fermenta glucosa: oxidación aerobia',
          'Temperatura: crece 4-42°C, óptimo 37°C',
          'Olor característico: "uvas" o "tortilla de maíz"',
          'Resistencia intrínseca a múltiples antibióticos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '6.3 - 6.8 Mb (uno de los más grandes)' },
          { label: 'Número de genes', value: '~5,500-6,000 genes' },
          { label: 'Contenido GC', value: '66.6%' },
          { label: 'Sistemas regulatorios', value: 'Quorum sensing (las, rhl)' },
          { label: 'Genes de resistencia', value: 'Bombas de eflujo, β-lactamasas' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Neumonía asociada a ventilación mecánica (VAP)',
          'Infección crónica en fibrosis quística (biofilm)',
          'Infecciones de quemaduras (colonizador principal)',
          'Otitis externa maligna en diabéticos',
          'Queratitis bacteriana (usuarios de lentes de contacto)',
          'Bacteriemia en neutropénicos y VIH+',
          'Infecciones nosocomiales multirresistentes'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Sistema de secreción tipo III (T3SS): ExoS, ExoT, ExoU, ExoY',
          'Exotoxina A: inhibe síntesis proteica (similar a toxina diftérica)',
          'Elastasa LasA y LasB: degradación de elastina y colágeno',
          'Piocianina: generación de especies reactivas de oxígeno',
          'Formación de biofilm: matriz de alginato (fibrosis quística)',
          'Quorum sensing: coordinación de virulencia poblacional',
          'Resistencia: bombas de eflujo MexAB-OprM, β-lactamasas AmpC'
        ]
      }
    ]
  },
  {
    id: 'clostridium-tetani',
    nombre: 'Clostridium tetani',
    subtitulo: 'Bacilo Gram positivo · Anaerobio estricto · Esporulado',
    icono: '🎾',
    categorias: ['gram-positivas', 'bacilos', 'patogenas', 'esporuladas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilo largo y delgado de 2-5 μm',
          'Espora terminal: forma de "palillo de tambor" o "raqueta"',
          'Pared celular: Gram positiva (puede perder tinción)',
          'Flagelos peritricos: movilidad moderada',
          'Sin cápsula'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Anaerobio estricto obligado (muere con O₂)',
          'Esporulación: resistencia extrema al calor, desecación y desinfectantes',
          'Esporas ubicuas en suelo, heces animales y polvo',
          'Germinación en tejidos necróticos con bajo potencial redox',
          'Temperatura óptima: 37°C',
          'Metabolismo fermentativo de aminoácidos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '2.8 Mb' },
          { label: 'Número de genes', value: '~2,400 genes' },
          { label: 'Contenido GC', value: '28.6%' },
          { label: 'Plásmidos', value: 'pE88 (74 kb) - gen de tetanospasmina' },
          { label: 'Gen de toxina', value: 'tetX (tetanospasmina) en plásmido' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Tétanos generalizado: espasmos musculares, trismo, opistótonos',
          'Tétanos neonatal: corte de cordón con instrumentos contaminados',
          'Tétanos localizado: espasmos en área de herida',
          'Tétanos cefálico: afecta nervios craneales',
          'Mortalidad 10-90% sin tratamiento (mayor en neonatos)',
          'Prevenible con vacuna toxoide tetánico (DPT, Td)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Tetanospasmina (TeNT): neurotoxina más potente conocida (DL50: 1 ng/kg)',
          'Mecanismo: bloquea liberación de GABA y glicina (neurotransmisores inhibitorios)',
          'Transporte retrógrado por nervios hasta SNC',
          'Resultado: contracción muscular sostenida (espasmos tetánicos)',
          'Tetanolisina: citolisina (menor importancia clínica)',
          'Esporas: persistencia ambiental indefinida'
        ]
      }
    ]
  },
  {
    id: 'neisseria-meningitidis',
    nombre: 'Neisseria meningitidis',
    subtitulo: 'Diplococo Gram negativo · Aerobio · Meningococo',
    icono: '🧠',
    categorias: ['gram-negativas', 'cocos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Diplococos en forma de "granos de café" (0.6-1.0 μm)',
          'Pared celular: Gram negativa con LOS (lipooligosacárido)',
          'Cápsula polisacárida: 13 serogrupos (A, B, C, W, Y, X)',
          'Pili tipo IV: adherencia a células epiteliales nasofaríngeas',
          'Proteínas de membrana externa (PorA, PorB): variación antigénica'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Aerobio estricto (requiere 5-10% CO₂)',
          'Oxidasa y catalasa positivas',
          'Fastidioso: requiere medios enriquecidos (agar chocolate)',
          'Fermentación de glucosa y maltosa',
          'Temperatura óptima: 35-37°C',
          'Sensible a desecación, frío y desinfectantes'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '2.1 - 2.3 Mb' },
          { label: 'Número de genes', value: '~2,000 genes' },
          { label: 'Contenido GC', value: '51.5%' },
          { label: 'Variación antigénica', value: 'Recombinación pilE (pili)' },
          { label: 'Transformación natural', value: 'Captación de DNA exógeno' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Meningitis meningocócica: inflamación de meninges (emergencia médica)',
          'Meningococcemia: sepsis fulminante con púrpura',
          'Síndrome de Waterhouse-Friderichsen: fallo adrenal agudo',
          'Portador asintomático: 10-25% población (nasofaringe)',
          'Brotes epidémicos: hacinamiento (cuarteles, dormitorios, "cinturón de meningitis")',
          'Prevención: vacunas conjugadas (A, C, W, Y) y vacuna proteica (B)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Cápsula polisacárida: antifagocítica (excepto serogrupo B)',
          'LOS (endotoxina): shock séptico y CID',
          'IgA proteasa: cliva IgA secretora',
          'Pili tipo IV: adherencia y motilidad twitching',
          'Proteínas de hierro (Tbp, Lbp): captación de transferrina y lactoferrina',
          'Variación de fase: expresión ON/OFF de pili y proteínas de superficie',
          'Resistencia al complemento: factor H de unión'
        ]
      }
    ]
  },
  {
    id: 'salmonella-typhi',
    nombre: 'Salmonella enterica serovar Typhi',
    subtitulo: 'Bacilo Gram negativo · Enterobacteria · Agente de fiebre tifoidea',
    icono: '🌡️',
    categorias: ['gram-negativas', 'bacilos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilo recto de 2-3 μm de longitud',
          'Pared celular: Gram negativa con LPS (antígeno O)',
          'Flagelos peritricos: movilidad activa (antígeno H)',
          'Antígeno capsular Vi (virulencia): polisacárido',
          'Sin producción de cápsula visible'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Aerobia facultativa con preferencia anaerobia',
          'No fermenta lactosa (diferencia de E. coli)',
          'Produce H₂S en medio TSI (ennegrecimiento)',
          'Ureasa negativa, indol negativo',
          'Temperatura óptima: 37°C',
          'Sobrevive en agua y alimentos refrigerados'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '4.8 Mb' },
          { label: 'Número de genes', value: '~4,600 genes' },
          { label: 'Contenido GC', value: '52%' },
          { label: 'Islas de patogenicidad', value: 'SPI-1 a SPI-17 (virulencia)' },
          { label: 'Plásmidos', value: 'pHCM1, pHCM2 (resistencia)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Fiebre tifoidea (entérica): fiebre sostenida, bacteriemia, hepatoesplenomegalia',
          'Transmisión fecal-oral: agua y alimentos contaminados',
          'Portadores crónicos: 2-5% (vesícula biliar)',
          'Complicaciones: perforación intestinal, hemorragia, miocarditis',
          'Endémica en países en desarrollo (saneamiento deficiente)',
          'Vacunas disponibles: Ty21a (oral atenuada), Vi capsular (inyectable)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Sistema de secreción tipo III (T3SS): SPI-1 (invasión) y SPI-2 (supervivencia)',
          'Antígeno Vi capsular: antifagocítico, marcador de virulencia',
          'Supervivencia intracelular: en macrófagos',
          'Toxina tifoidea (CdtB): genotoxina que causa arresto del ciclo celular',
          'Resistencia a péptidos antimicrobianos',
          'Formación de biofilm en vesícula biliar (portadores crónicos)'
        ]
      }
    ]
  },
  {
    id: 'helicobacter-pylori',
    nombre: 'Helicobacter pylori',
    subtitulo: 'Bacilo espiral Gram negativo · Microaerófilo · Carcinógeno tipo I',
    icono: '🌀',
    categorias: ['gram-negativas', 'bacilos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilo espiral curvo (helicoidal) de 2.5-4.0 μm',
          'Flagelos polares (4-8): movilidad en espiral característica',
          'Pared celular: Gram negativa con LPS modificado',
          'Forma cocoide: forma viable no cultivable (VBNC) bajo estrés',
          'Sin cápsula ni esporas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Microaerófilo: requiere 5-10% O₂, 5-10% CO₂',
          'Ureasa altamente activa: neutraliza ácido gástrico (NH₃)',
          'Oxidasa y catalasa positivas',
          'Fastidioso: crecimiento lento (3-5 días)',
          'Temperatura óptima: 37°C',
          'pH óptimo: 6.0-8.0 (sobrevive en pH 2-3 por ureasa)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '1.6 - 1.7 Mb' },
          { label: 'Número de genes', value: '~1,500 genes' },
          { label: 'Contenido GC', value: '38-39%' },
          { label: 'Isla cag PAI', value: '40 kb (cepa virulenta)' },
          { label: 'Diversidad genética', value: 'Alta (recombinación)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Gastritis crónica activa: inflamación persistente del estómago',
          'Úlcera péptica: duodenal (10-15%) y gástrica (1-2%)',
          'Adenocarcinoma gástrico: 1-3% de infectados (carcinógeno tipo I OMS)',
          'Linfoma MALT gástrico: linfoma de tejido linfoide asociado a mucosa',
          'Infección global: 50% población mundial',
          'Tratamiento: triple terapia (2 antibióticos + IBP)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Ureasa: neutraliza ácido gástrico, produce NH₃ tóxico',
          'Flagelos: movilidad a través de moco gástrico',
          'Adhesinas (BabA, SabA, OipA): unión a células epiteliales',
          'Sistema cag PAI y proteína CagA: inyección en células, carcinogénesis',
          'VacA (citotoxina vacuolizante): formación de vacuolas, apoptosis',
          'Catalasa y superóxido dismutasa: protección contra estrés oxidativo',
          'Variación antigénica: LPS y proteínas de superficie'
        ]
      }
    ]
  },
  {
    id: 'bacillus-anthracis',
    nombre: 'Bacillus anthracis',
    subtitulo: 'Bacilo Gram positivo · Aerobio · Esporulado · Agente del ántrax',
    icono: '☣️',
    categorias: ['gram-positivas', 'bacilos', 'patogenas', 'esporuladas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilo grande de 3-5 μm, en cadenas ("bambú")',
          'Espora central o subterminal: resistencia extrema',
          'Cápsula polipeptídica: poli-D-ácido glutámico (único)',
          'Pared celular: Gram positiva gruesa',
          'Sin movilidad: carece de flagelos'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Aerobio facultativo con preferencia aerobia',
          'Catalasa positiva',
          'Esporulación bajo condiciones adversas',
          'Esporas viables por décadas en suelo',
          'Germinación en tejidos ricos en aminoácidos y glucosa',
          'Temperatura óptima: 37°C',
          'No hemolítico (diferencia de B. cereus)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '5.2 Mb' },
          { label: 'Número de genes', value: '~5,300 genes' },
          { label: 'Contenido GC', value: '35.4%' },
          { label: 'Plásmidos', value: 'pXO1 (182 kb - toxinas), pXO2 (96 kb - cápsula)' },
          { label: 'Genes de virulencia', value: 'pagA, lef, cya (pXO1); capBCA (pXO2)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Ántrax cutáneo (95%): úlcera negra (escara), edema, linfadenopatía',
          'Ántrax por inhalación: mediastinitis hemorrágica, mortalidad >85% sin tratamiento',
          'Ántrax gastrointestinal: raro, por consumo de carne contaminada',
          'Ántrax por inyección: usuarios de heroína (UK)',
          'Bioterrorismo: esporas en polvo (ataques 2001 EE.UU.)',
          'Zoonosis: principalmente en herbívoros (ganado, ovejas)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Toxina tripartita: Factor protector (PA) + Factor edema (EF) + Factor letal (LF)',
          'PA: se une a receptores, forma poro, transporta EF y LF al citoplasma',
          'EF: adenilato ciclasa, aumenta AMPc, edema masivo',
          'LF: metaloproteasa, inactiva MAPKK, muerte celular y shock',
          'Cápsula poli-D-glutamato: antifagocítica, única en bacterias',
          'Esporas: resistencia a calor, radiación, desinfectantes',
          'Germinación rápida en macrófagos alveolares'
        ]
      }
    ]
  },
  {
    id: 'listeria-monocytogenes',
    nombre: 'Listeria monocytogenes',
    subtitulo: 'Bacilo Gram positivo · Aerobio facultativo · Intracelular',
    icono: '🤰',
    categorias: ['gram-positivas', 'bacilos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilo corto de 0.5-2.0 μm',
          'Flagelos peritricos: movilidad a 20-25°C (no a 37°C)',
          'Pared celular: Gram positiva con ácidos teicoicos',
          'Sin cápsula ni esporas',
          'Movilidad en voltereta ("tumbling motility")'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Aerobio facultativo con preferencia aerobia',
          'Catalasa positiva, oxidasa negativa',
          'β-hemólisis débil en agar sangre',
          'Psicrotrófica: crece a 4°C (refrigeración)',
          'Rango de temperatura: 0-45°C',
          'Tolerante a sal (10% NaCl) y pH bajo',
          'Test CAMP positivo con S. aureus'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '2.9 Mb' },
          { label: 'Número de genes', value: '~2,800 genes' },
          { label: 'Contenido GC', value: '38%' },
          { label: 'Isla de patogenicidad', value: 'LIPI-1 (prfA, hly, actA, plcA)' },
          { label: 'Regulador maestro', value: 'PrfA (virulencia)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Listeriosis invasiva: sepsis, meningitis (mortalidad 20-30%)',
          'Infección neonatal: granulomatosis infantiséptica (transplacentaria)',
          'Infección perinatal: aborto, parto prematuro, muerte fetal',
          'Grupos de riesgo: embarazadas, neonatos, ancianos, inmunocomprometidos',
          'Transmisión: alimentos contaminados (quesos blandos, carnes frías, vegetales)',
          'Única bacteria transmitida por alimentos que cruza placenta'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Internalinas (InlA, InlB): invasión de células epiteliales no fagocíticas',
          'Listeriolisina O (LLO): escape del fagosoma al citoplasma',
          'Fosfolipasas PlcA y PlcB: lisis de membranas',
          'ActA: polimerización de actina, motilidad intracelular y célula-célula',
          'Ciclo intracelular completo: invasión → escape → replicación → diseminación',
          'Evasión inmune: replica en citoplasma (evita autofagia)',
          'Tropismo por SNC y placenta'
        ]
      }
    ]
  },
  {
    id: 'vibrio-cholerae',
    nombre: 'Vibrio cholerae',
    subtitulo: 'Bacilo curvo Gram negativo · Aerobio facultativo · Agente del cólera',
    icono: '💧',
    categorias: ['gram-negativas', 'bacilos', 'patogenas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Forma: Bacilo curvo en forma de "coma" de 1.5-3.0 μm',
          'Flagelo polar monotrico: movilidad rápida en "dardo"',
          'Pared celular: Gram negativa con LPS (antígeno O)',
          'Pili TCP (toxina coregulado): colonización intestinal',
          'Más de 200 serogrupos (O1 y O139 causan cólera epidémico)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Metabolismo y Fisiología',
        items: [
          'Aerobio facultativo con preferencia aerobia',
          'Oxidasa positiva (diagnóstico rápido)',
          'Halofílico: requiere o tolera NaCl (0.5-3%)',
          'Fermentación de glucosa, sacarosa (diferencia de Shigella)',
          'Temperatura óptima: 37°C, crece 18-42°C',
          'Sobrevive en agua salobre y estuarios'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Tamaño del genoma', value: '4.0 Mb (2 cromosomas)' },
          { label: 'Número de genes', value: '~3,800 genes' },
          { label: 'Contenido GC', value: '47.5%' },
          { label: 'Profago CTXφ', value: 'Porta genes ctxAB (toxina colérica)' },
          { label: 'Isla VPI', value: 'Porta tcpA (pili TCP)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Cólera: diarrea acuosa profusa "agua de arroz" (hasta 20 L/día)',
          'Deshidratación severa: shock hipovolémico, muerte en horas',
          'Mortalidad sin tratamiento: 50-60%, con rehidratación <1%',
          'Transmisión fecal-oral: agua y alimentos contaminados',
          'Pandemias históricas: 7 pandemias, actual desde 1961',
          'Endémico en África, Asia, América Latina',
          'Tratamiento: rehidratación oral/IV, antibióticos acortan duración'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Factores de Virulencia',
        items: [
          'Toxina colérica (CT): AB₅, ADP-ribosilación de proteína Gs',
          'Subunidad A: activa adenilato ciclasa, aumenta AMPc',
          'Resultado: secreción masiva de Cl⁻ y agua al lumen intestinal',
          'Pili TCP: colonización y receptor para fago CTXφ',
          'Neuraminidasa: exposición de receptores GM1 para CT',
          'Regulador ToxR/ToxS: control coordinado de virulencia',
          'Capacidad de formar biofilm en ambientes acuáticos'
        ]
      }
    ]
  }
];