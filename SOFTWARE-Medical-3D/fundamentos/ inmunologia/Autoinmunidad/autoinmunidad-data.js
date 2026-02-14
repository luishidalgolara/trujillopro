// ═══════════════════════════════════════════════════════════
// AUTOINMUNIDAD - Base de datos de conceptos
// ═══════════════════════════════════════════════════════════

const AUTOINMUNIDAD_DATA = [
  {
    id: 'tolerancia-central',
    nombre: 'Tolerancia Central',
    icono: '🎓',
    subtitulo: 'Eliminación de linfocitos autorreactivos durante maduración',
    categorias: ['tolerancia', 'mecanismos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Concepto general',
        items: [
          'Proceso de eliminación de linfocitos autorreactivos en órganos linfoides primarios',
          'Ocurre durante el desarrollo de linfocitos T (timo) y B (médula ósea)',
          'Previene generación de células inmunes que reconocen antígenos propios',
          'Mecanismo principal de autotolerancia',
          'Falla en tolerancia central → predisposición a autoinmunidad',
          'No es 100% efectiva, requiere tolerancia periférica adicional'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Tolerancia central de linfocitos T (Timo)',
        items: [
          'Selección positiva (corteza tímica): linfocitos T reconocen MHC propio con afinidad moderada',
          'Solo 10-30% de timocitos pasan selección positiva',
          'Selección negativa (médula tímica): eliminan linfocitos con alta afinidad por MHC-autoantígeno',
          'Células epiteliales medulares tímicas (mTECs) expresan AIRE',
          'AIRE (Autoimmune Regulator): factor de transcripción que induce expresión de antígenos tisulares',
          '95-98% de timocitos mueren por apoptosis durante selección'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Proteína AIRE y antígenos tisulares',
        datos: [
          { label: 'AIRE', value: 'Expresado en mTECs, induce >5000 genes de antígenos tisulares' },
          { label: 'Función', value: 'Presenta antígenos de órganos periféricos en timo' },
          { label: 'Mecanismo', value: 'Promueve transcripción promiscua de genes tisulares' },
          { label: 'Ejemplos', value: 'Insulina (páncreas), tiroglobulina (tiroides), mielina (SNC)' },
          { label: 'Resultado', value: 'Linfocitos T que reconocen estos Ag son eliminados o anergizados' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Tolerancia central de linfocitos B (Médula ósea)',
        items: [
          'Células B inmaduras expresan IgM de superficie',
          'Encuentro con antígeno propio multivalente → muerte o edición de receptor',
          'Edición de receptor (receptor editing): reordenamiento adicional de genes de Ig',
          'Anergia: célula B vive pero no responde a antígeno',
          'Deleción clonal: apoptosis de células B autorreactivas',
          '55-75% de células B inmaduras son autorreactivas y deben ser controladas'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Escape de tolerancia central',
        items: [
          'Algunos linfocitos autorreactivos escapan (afinidad baja-intermedia)',
          'Antígenos secuestrados no se presentan en órganos primarios',
          'Antígenos crípticos: normalmente no procesados/presentados',
          'Modificaciones post-traduccionales crean nuevos epítopos',
          'Requiere mecanismos de tolerancia periférica para control',
          'Balance entre reconocimiento de patógenos y autotolerancia'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Síndrome APECED (APS-1): mutación en gen AIRE, poliendocrinopatía autoinmune',
          'Manifestaciones APECED: candidiasis mucocutánea, hipoparatiroidismo, insuficiencia suprarrenal',
          'Defectos en selección tímica: inmunodeficiencia + autoinmunidad',
          'Síndrome de DiGeorge: hipoplasia tímica, defectos de tolerancia',
          'Timomas: pueden generar células T autorreactivas, asociados a miastenia gravis'
        ]
      }
    ]
  },

  {
    id: 'tolerancia-periferica',
    nombre: 'Tolerancia Periférica',
    icono: '🛡️',
    subtitulo: 'Control de linfocitos autorreactivos en tejidos',
    categorias: ['tolerancia', 'mecanismos'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Concepto general',
        items: [
          'Mecanismos que controlan linfocitos autorreactivos que escaparon tolerancia central',
          'Ocurre en órganos linfoides secundarios y tejidos periféricos',
          'Múltiples mecanismos redundantes',
          'Crítica para prevenir autoinmunidad',
          'Requiere señalización activa y continua',
          'Puede ser sobrepasada por inflamación, infección o factores genéticos'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Anergia clonal',
        items: [
          'Estado de no-respuesta funcional del linfocito',
          'Causas: reconocimiento de antígeno sin coestimulación adecuada',
          'Señal 1 (TCR-MHC-péptido) sin señal 2 (CD28-B7) → anergia',
          'Linfocitos anérgicos: viven pero no proliferan ni producen citocinas',
          'Reversible en algunos casos con señales proinflamatorias',
          'Importante para antígenos propios presentados por células no-APCs'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Deleción clonal periférica',
        items: [
          'Apoptosis de linfocitos autorreactivos activados',
          'Vía Fas-FasL: activación repetida induce expresión de Fas',
          'FasL en células activadas induce apoptosis de células Fas+',
          'AICD (Activation-Induced Cell Death): muerte tras activación crónica',
          'Regula respuesta inmune, previene autoinmunidad',
          'Defectos en Fas/FasL: síndrome linfoproliferativo autoinmune (ALPS)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Linfocitos T reguladores (Treg)',
        items: [
          'CD4+ CD25+ FoxP3+: suprimen células autorreactivas',
          '5-10% de linfocitos T CD4+ periféricos',
          'Treg naturales (nTreg): generados en timo',
          'Treg inducibles (iTreg): generados en periferia (TGF-β)',
          'Mecanismos: IL-10, TGF-β, CTLA-4, consumo de IL-2',
          'Deficiencia de Treg: síndrome IPEX (mutación FoxP3)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Mecanismos de supresión por Treg',
        datos: [
          { label: 'IL-10', value: 'Citocina antiinflamatoria, inhibe APCs y células T efectoras' },
          { label: 'TGF-β', value: 'Suprime proliferación, induce diferenciación de iTreg' },
          { label: 'CTLA-4', value: 'Compite con CD28 por B7, señal inhibitoria' },
          { label: 'Consumo IL-2', value: 'CD25 alta afinidad, priva IL-2 a células efectoras' },
          { label: 'Granzimas/perforinas', value: 'Muerte directa de células diana' },
          { label: 'Modulación de APCs', value: 'Reduce expresión de MHC-II y coestimuladores' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Ignorancia inmunológica',
        items: [
          'Linfocitos autorreactivos y antígeno propio coexisten sin interacción',
          'Causas: antígenos en sitios inmunoprivilegiados (cerebro, ojo, testículo)',
          'Antígenos de baja concentración no activan umbral de activación',
          'Barrera hemato-encefálica, hemato-ocular, hemato-testicular',
          'Ruptura de barrera (trauma, infección) → exposición antigénica → autoinmunidad',
          'Ejemplos: oftalmía simpática, orquitis autoinmune post-vasectomía'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Inhibición por receptores checkpoint',
        items: [
          'CTLA-4 (CD152): se une a B7 con mayor afinidad que CD28',
          'Expresado tras activación de célula T, envía señal inhibitoria',
          'PD-1 (Programmed Death-1): receptor inhibitorio en células T',
          'PD-L1/PD-L2: ligandos de PD-1 en APCs y tejidos',
          'Previene activación excesiva y autoinmunidad',
          'Bloqueo terapéutico: inhibidores checkpoint en inmunoterapia cáncer'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Relevancia clínica',
        items: [
          'Síndrome IPEX: mutación FoxP3, ausencia de Treg funcionales, autoinmunidad severa neonatal',
          'Manifestaciones IPEX: diabetes tipo 1, tiroiditis, enteropatía, eccema',
          'ALPS: mutación Fas/FasL, linfoproliferación, autoinmunidad (citopenias)',
          'Inhibidores checkpoint (anti-PD-1, anti-CTLA-4): efectos adversos autoinmunes',
          'Enfermedad injerto-vs-huésped: pérdida de tolerancia de células T del donante',
          'Tratamiento: inmunosupresores restauran/mantienen tolerancia periférica'
        ]
      }
    ]
  },

  {
    id: 'ruptura-tolerancia',
    nombre: 'Ruptura de Tolerancia',
    icono: '⚠️',
    subtitulo: 'Mecanismos que conducen a autoinmunidad',
    categorias: ['mecanismos', 'genetica'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Factores genéticos',
        items: [
          'Genes HLA: mayor asociación con autoinmunidad',
          'HLA-B27: espondilitis anquilosante (>90% pacientes)',
          'HLA-DR3/DR4: diabetes tipo 1 (odds ratio 20-40)',
          'HLA-DQ2/DQ8: enfermedad celíaca',
          'Genes no-HLA: PTPN22, CTLA-4, FoxP3, AIRE, IL-2RA',
          'Herencia poligénica: múltiples genes de susceptibilidad'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Mimetismo molecular',
        items: [
          'Péptidos microbianos similares a autoantígenos',
          'Activación cruzada de linfocitos T y B',
          'Fiebre reumática: proteínas estreptocócicas mimetizan miosina cardíaca',
          'Síndrome de Guillain-Barré: Campylobacter jejuni mimetiza gangliósidos',
          'Esclerosis múltiple: virus EBV comparte epítopos con proteínas de mielina',
          'Respuesta inmune vs patógeno → reactividad cruzada vs antígeno propio'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Activación de linfocitos espectadores (bystander)',
        items: [
          'Infección/inflamación libera citocinas proinflamatorias',
          'Activación no-específica de linfocitos autorreactivos',
          'Daño tisular libera autoantígenos secuestrados',
          'APCs activadas aumentan coestimulación',
          'Ruptura de tolerancia por señales de peligro (DAMPs)',
          'Ejemplo: diabetes tipo 1 post-infección viral (Coxsackie B)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Dispersión de epítopos (epitope spreading)',
        items: [
          'Respuesta inmune inicial contra un epítopo',
          'Daño tisular expone epítopos adicionales (crípticos)',
          'Expansión de respuesta a múltiples autoantígenos',
          'Cronificación y amplificación de autoinmunidad',
          'Observado en lupus, esclerosis múltiple, diabetes tipo 1',
          'Explica progresión de enfermedad autoinmune'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Factores ambientales desencadenantes',
        datos: [
          { label: 'Infecciones', value: 'Virus (EBV, CMV), bacterias (Streptococcus, Campylobacter)' },
          { label: 'Exposición UV', value: 'Lupus: induce apoptosis, expone autoantígenos nucleares' },
          { label: 'Fármacos', value: 'Procainamida, hidralazina → lupus inducido' },
          { label: 'Tabaquismo', value: 'Artritis reumatoide: citrulinación de proteínas' },
          { label: 'Microbiota', value: 'Disbiosis asociada a enfermedad inflamatoria intestinal' },
          { label: 'Hormonas', value: 'Estrógenos: mayor incidencia en mujeres' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Defectos en apoptosis y aclaramiento',
        items: [
          'Apoptosis defectuosa: acumulación de células autorreactivas',
          'Defectos en eliminación de células apoptóticas',
          'Exposición prolongada a autoantígenos intracelulares',
          'Lupus: deficiencia de C1q, DNasa impide aclaramiento de células muertas',
          'Fragmentos nucleares → formación de autoanticuerpos anti-DNA',
          'NETs (neutrófilos): fuente de autoantígenos en lupus'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Modificaciones post-traduccionales',
        items: [
          'Citrulinación: conversión arginina → citrulina',
          'Anti-CCP (péptido cíclico citrulinado): artritis reumatoide',
          'Glicosilación aberrante: IgA en nefropatía por IgA',
          'Acetilación, fosforilación: nuevos epítopos',
          'Tabaquismo, inflamación inducen citrulinación',
          'Autoanticuerpos contra proteínas modificadas'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Implicaciones terapéuticas',
        items: [
          'Evitar desencadenantes: protección UV en lupus, cesación tabaco en AR',
          'Vacunación: puede prevenir infecciones desencadenantes',
          'Inmunomodulación temprana: prevenir dispersión de epítopos',
          'Terapia dirigida: bloqueo de citocinas (anti-TNF, anti-IL-6)',
          'Modulación microbiota: probióticos, antibióticos selectivos',
          'Terapia génica futura: corrección de genes de susceptibilidad'
        ]
      }
    ]
  },

  {
    id: 'lupus-eritematoso',
    nombre: 'Lupus Eritematoso Sistémico (LES)',
    icono: '🦋',
    subtitulo: 'Prototipo de enfermedad autoinmune sistémica',
    categorias: ['sistemicas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Enfermedad autoinmune multisistémica crónica',
          'Predominio femenino 9:1, edad fértil (15-45 años)',
          'Incidencia: 20-150 casos/100,000 personas',
          'Mayor en afroamericanos, hispanos, asiáticos',
          'Curso clínico: brotes y remisiones',
          'Mortalidad aumentada: infecciones, enfermedad cardiovascular, nefritis'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Autoanticuerpos característicos',
        items: [
          'ANA (anticuerpos antinucleares): sensibilidad 95-98%, baja especificidad',
          'Anti-dsDNA (DNA doble cadena): 60-70%, específico, correlaciona con actividad',
          'Anti-Sm (Smith): 20-30%, alta especificidad (>99%)',
          'Anti-Ro/SSA y Anti-La/SSB: 30-40%, asociados a lupus neonatal',
          'Anticardiolipinas: 30-40%, síndrome antifosfolípido',
          'Anti-histonas: lupus inducido por drogas'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fisiopatología',
        items: [
          'Pérdida de tolerancia a antígenos nucleares',
          'Defectos en aclaramiento de células apoptóticas',
          'Formación de inmunocomplejos (Ig + autoantígenos)',
          'Depósito de inmunocomplejos en tejidos (riñón, piel, articulaciones)',
          'Activación de complemento → inflamación tisular',
          'Interferones tipo I (IFN-α/β) elevados: "firma de interferón"'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Manifestaciones clínicas principales',
        datos: [
          { label: 'Cutáneas', value: 'Eritema malar (mariposa), fotosensibilidad, úlceras mucosas' },
          { label: 'Articulares', value: 'Artritis no erosiva (90%), artralgias' },
          { label: 'Renales', value: 'Nefritis lúpica (50%), puede progresar a insuficiencia renal' },
          { label: 'Hematológicas', value: 'Anemia hemolítica, leucopenia, trombocitopenia' },
          { label: 'SNC', value: 'Psicosis, convulsiones, neuropatía' },
          { label: 'Cardiovascular', value: 'Pericarditis, miocarditis, aterosclerosis acelerada' },
          { label: 'Pulmonar', value: 'Pleuritis, neumonitis intersticial' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Nefritis lúpica (clasificación ISN/RPS)',
        items: [
          'Clase I: nefritis lúpica mesangial mínima',
          'Clase II: nefritis lúpica mesangial proliferativa',
          'Clase III: nefritis lúpica focal (<50% glomérulos)',
          'Clase IV: nefritis lúpica difusa (>50% glomérulos), más severa',
          'Clase V: nefritis lúpica membranosa',
          'Clase VI: nefritis lúpica esclerosante avanzada'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Factores genéticos',
        datos: [
          { label: 'HLA', value: 'HLA-DR2, HLA-DR3, mayor riesgo' },
          { label: 'Deficiencia complemento', value: 'C1q, C2, C4: lupus temprano y severo' },
          { label: 'FcγR', value: 'Polimorfismos en receptores Fc, aclaramiento de IC' },
          { label: 'IRF5, STAT4', value: 'Genes de vía de interferón tipo I' },
          { label: 'PTPN22', value: 'Fosfatasa, regulación de señalización TCR' },
          { label: 'Concordancia gemelos', value: '25% monocigotos, 2% dicigotos' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Tratamiento',
        items: [
          'AINES y antipalúdicos (hidroxicloroquina): enfermedad leve-moderada',
          'Corticosteroides: pulsos IV (metilprednisolona) en brotes severos',
          'Inmunosupresores: micofenolato, azatioprina, ciclofosfamida (nefritis)',
          'Belimumab (anti-BLyS): primer biológico aprobado para LES (2011)',
          'Rituximab (anti-CD20): casos refractarios',
          'Voclosporina: inhibidor calcineurina, nefritis lúpica (aprobado 2021)',
          'Anifrolumab (anti-IFNAR): inhibe receptor de interferón tipo I (2021)',
          'Protección solar, evitar estrógenos, vacunación (excepto vivas)'
        ]
      }
    ]
  },

  {
    id: 'artritis-reumatoide',
    nombre: 'Artritis Reumatoide (AR)',
    icono: '🦴',
    subtitulo: 'Enfermedad autoinmune articular erosiva',
    categorias: ['sistemicas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Artritis inflamatoria crónica simétrica',
          'Prevalencia: 0.5-1% población mundial',
          'Predominio femenino 3:1',
          'Inicio típico: 40-60 años',
          'Articulaciones pequeñas de manos y pies inicialmente',
          'Progresión: destrucción cartílago y hueso, deformidades articulares'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Autoanticuerpos',
        items: [
          'Factor reumatoide (FR): IgM anti-IgG Fc, 70-80% pacientes',
          'Anti-CCP (péptido cíclico citrulinado): 60-80%, más específico (95-98%)',
          'Anti-CCP puede preceder síntomas clínicos por años',
          'AR seropositiva (FR+ o CCP+): peor pronóstico',
          'AR seronegativa (FR- y CCP-): 20-30% casos',
          'Otros: anti-PAD (peptidil arginina deiminasa), anti-CarP'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fisiopatología',
        items: [
          'Activación de células T CD4+ (Th1, Th17) en articulaciones',
          'Sinovitis: infiltración de linfocitos, macrófagos, células plasmáticas',
          'Producción de citocinas: TNF-α, IL-1, IL-6, IL-17',
          'Hiperplasia sinovial → formación de pannus',
          'Pannus: tejido sinovial invasivo, erosiona cartílago y hueso',
          'Osteoclastos activados (RANKL) → erosiones óseas',
          'Neovascularización: VEGF, endotelio activado'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Citocinas clave en AR',
        datos: [
          { label: 'TNF-α', value: 'Inflamación, activación endotelial, erosión ósea' },
          { label: 'IL-1β', value: 'Sinergiza con TNF-α, degradación cartílago' },
          { label: 'IL-6', value: 'Reactantes fase aguda, diferenciación Th17' },
          { label: 'IL-17', value: 'Recluta neutrófilos, induce metaloproteinasas' },
          { label: 'GM-CSF', value: 'Activa macrófagos, supervivencia neutrófilos' },
          { label: 'RANKL', value: 'Diferenciación osteoclastos, resorción ósea' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Manifestaciones clínicas',
        items: [
          'Artritis simétrica de pequeñas articulaciones (MCF, IFP, muñecas)',
          'Rigidez matutina >30-60 minutos',
          'Erosiones óseas en radiografías',
          'Deformidades: desviación cubital, dedos en cuello de cisne, boutonnière',
          'Manifestaciones extraarticulares: nódulos reumatoides (20-30%)',
          'Afectación pulmonar: enfermedad intersticial, nódulos, pleuritis',
          'Vasculitis reumatoide: casos severos',
          'Síndrome de Felty: AR + esplenomegalia + neutropenia'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Factores de riesgo genéticos y ambientales',
        datos: [
          { label: 'HLA-DRB1', value: 'Epítopo compartido (shared epitope), OR 2-3' },
          { label: 'PTPN22', value: 'Polimorfismo R620W, regulación TCR' },
          { label: 'Tabaquismo', value: 'Factor ambiental más fuerte, induce citrulinación' },
          { label: 'Periodontitis', value: 'P. gingivalis expresa PAD, citrulinación' },
          { label: 'Microbiota intestinal', value: 'Disbiosis, Prevotella copri asociada' },
          { label: 'Sexo femenino', value: 'Estrógenos modulan respuesta inmune' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Tratamiento',
        items: [
          'DMARDs convencionales: metotrexato (primera línea), leflunomida, sulfasalazina',
          'Anti-TNF: infliximab, etanercept, adalimumab, golimumab, certolizumab',
          'Anti-IL-6: tocilizumab, sarilumab',
          'Anti-CD20: rituximab (depleta células B)',
          'Inhibidor coestimulación: abatacept (CTLA-4-Ig)',
          'Inhibidores JAK: tofacitinib, baricitinib, upadacitinib',
          'Corticosteroides: dosis baja, puente hasta efecto de DMARDs',
          'Objetivo: remisión o baja actividad, prevenir erosiones'
        ]
      }
    ]
  },

  {
    id: 'diabetes-tipo1',
    nombre: 'Diabetes Mellitus Tipo 1',
    icono: '💉',
    subtitulo: 'Destrucción autoinmune de células β pancreáticas',
    categorias: ['organoespecificas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Destrucción autoinmune de células β en islotes de Langerhans',
          'Deficiencia absoluta de insulina',
          'Típicamente inicio en infancia/adolescencia (pico 10-14 años)',
          '5-10% de todos los casos de diabetes',
          'Incidencia: 15-20 casos/100,000 niños/año',
          'Mayor en poblaciones europeas (Finlandia, Cerdeña)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Autoanticuerpos',
        items: [
          'Anti-GAD65 (decarboxilasa del ácido glutámico): 70-80% al diagnóstico',
          'Anti-IA-2 (tirosina fosfatasa): 60-70%',
          'Anti-insulina (IAA): 40-70%, más común en niños',
          'Anti-ZnT8 (transportador de zinc): 60-80%',
          'Presencia múltiple de autoanticuerpos: riesgo >90% desarrollar DM1',
          'Detección preclínica: años antes de hiperglucemia'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fisiopatología',
        items: [
          'Insulitis: infiltración de islotes por linfocitos T CD8+, CD4+, macrófagos',
          'Linfocitos T CD8+ citotóxicos: destrucción directa de células β',
          'Linfocitos T CD4+ (Th1): producen IFN-γ, activan macrófagos',
          'Citocinas: IL-1β, TNF-α, IFN-γ → apoptosis de células β',
          'Estrés del retículo endoplásmico: células β susceptibles',
          'Destrucción progresiva: síntomas cuando >80-90% células β perdidas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Factores genéticos',
        datos: [
          { label: 'HLA-DR3', value: 'DRB1*0301, riesgo moderado' },
          { label: 'HLA-DR4', value: 'DRB1*0401, riesgo moderado' },
          { label: 'DR3/DR4', value: 'Heterocigoto, mayor riesgo (OR 20-40)' },
          { label: 'HLA-DQ', value: 'DQ2, DQ8 confieren riesgo; DQ6 protege' },
          { label: 'INS (insulina)', value: 'VNTR en promotor, expresión tímica' },
          { label: 'PTPN22', value: 'Polimorfismo asociado con múltiples autoinmunes' },
          { label: 'Concordancia gemelos', value: '30-50% monocigotos, 6-10% dicigotos' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Factores ambientales desencadenantes',
        items: [
          'Infecciones virales: enterovirus (Coxsackie B), rubéola congénita',
          'Mimetismo molecular: virus pueden mimetizar GAD65',
          'Dieta temprana: introducción temprana de leche de vaca, gluten',
          'Hipótesis de higiene: menor exposición a patógenos',
          'Vitamina D: deficiencia asociada con mayor riesgo',
          'Microbiota intestinal: menor diversidad en pacientes con DM1'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Manifestaciones clínicas',
        items: [
          'Hiperglucemia sintomática: poliuria, polidipsia, polifagia',
          'Pérdida de peso a pesar de ingesta aumentada',
          'Cetoacidosis diabética: presentación en 25-40% casos',
          'Luna de miel: remisión temporal parcial post-diagnóstico',
          'Complicaciones crónicas: retinopatía, nefropatía, neuropatía',
          'Otras autoinmunes asociadas: tiroiditis, celiaquía, Addison'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Prevención y tratamiento',
        items: [
          'Insulinoterapia: única opción actual, múltiples dosis o bomba',
          'Teplizumab (anti-CD3): retrasa progresión en estadios preclínicos (aprobado 2022)',
          'Ensayos prevención: anti-CD3, GAD-alum, insulina oral (resultados mixtos)',
          'Trasplante de islotes: casos seleccionados, requiere inmunosupresión',
          'Terapia génica: en investigación, regeneración de células β',
          'Screening familiar: detección de autoanticuerpos en familiares primer grado',
          'Manejo glucémico estricto: previene/retrasa complicaciones'
        ]
      }
    ]
  },

  {
    id: 'esclerosis-multiple',
    nombre: 'Esclerosis Múltiple (EM)',
    icono: '🧠',
    subtitulo: 'Enfermedad desmielinizante autoinmune del SNC',
    categorias: ['organoespecificas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Enfermedad inflamatoria desmielinizante del sistema nervioso central',
          'Prevalencia: 50-300 casos/100,000 (mayor en latitudes altas)',
          'Predominio femenino 2-3:1',
          'Edad de inicio típica: 20-40 años',
          'Gradiente latitudinal: mayor incidencia lejos del ecuador',
          'Curso clínico variable: remitente-recurrente (85%), progresiva'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fisiopatología',
        items: [
          'Linfocitos T autorreactivos contra proteínas de mielina',
          'Activación en periferia → migración al SNC',
          'Ruptura de barrera hemato-encefálica',
          'Th1 y Th17: producen IFN-γ, IL-17, GM-CSF',
          'Activación de microglía y macrófagos',
          'Desmielinización: pérdida de oligodendrocitos y mielina',
          'Placas: lesiones desmielinizantes en sustancia blanca',
          'Daño axonal: causa de discapacidad irreversible'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Autoantígenos diana',
        items: [
          'Proteína básica de mielina (MBP): componente mayoritario',
          'Glicoproteína de mielina de oligodendrocitos (MOG)',
          'Proteína proteolipídica (PLP)',
          'Glicoproteína asociada a mielina (MAG)',
          'Modelos animales: EAE (encefalomielitis autoinmune experimental)',
          'Anti-MOG: asociado a variante NMOSD (neuromielitis óptica)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Subtipos clínicos de EM',
        datos: [
          { label: 'Remitente-recurrente (EMRR)', value: '85% inicial, brotes con recuperación parcial/completa' },
          { label: 'Progresiva secundaria (EMPS)', value: '50% EMRR evoluciona a EMPS en 10 años' },
          { label: 'Progresiva primaria (EMPP)', value: '10-15%, progresión desde inicio sin brotes' },
          { label: 'Síndrome clínicamente aislado', value: 'Primer episodio desmielinizante, riesgo EM' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Manifestaciones clínicas',
        items: [
          'Neuritis óptica: pérdida visual unilateral, dolor con movimientos oculares',
          'Síntomas sensitivos: parestesias, hipoestesia',
          'Debilidad motora: monoparesia, hemiparesia',
          'Síntomas cerebelosos: ataxia, dismetría, temblor',
          'Signo de Lhermitte: sensación eléctrica con flexión del cuello',
          'Fatiga: síntoma más común (80%)',
          'Disfunción vesical e intestinal',
          'Deterioro cognitivo: atención, memoria, velocidad de procesamiento'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Factores de riesgo genéticos y ambientales',
        datos: [
          { label: 'HLA-DRB1*15:01', value: 'Mayor asociación genética, OR 3' },
          { label: 'Genes no-HLA', value: 'IL-2RA, IL-7RA, CD58, >200 variantes' },
          { label: 'Virus Epstein-Barr', value: 'Infección previa casi universal en EM' },
          { label: 'Vitamina D', value: 'Niveles bajos asociados con mayor riesgo' },
          { label: 'Tabaquismo', value: 'Duplica riesgo, acelera progresión' },
          { label: 'Latitud', value: 'Mayor prevalencia en regiones alejadas del ecuador' },
          { label: 'Concordancia gemelos', value: '25-30% monocigotos, 3-5% dicigotos' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Tratamiento',
        items: [
          'Brotes agudos: metilprednisolona IV (1g/día x 3-5 días)',
          'Terapias modificadoras (DMT): reducen brotes y progresión',
          'Inyectables: interferón-β (IFN-β1a, IFN-β1b), acetato de glatirámero',
          'Orales: fingolimod, dimetilfumarato, teriflunomida, cladribina',
          'Anticuerpos monoclonales: natalizumab (anti-α4-integrina), ocrelizumab (anti-CD20)',
          'Alemtuzumab (anti-CD52): depleción prolongada de linfocitos',
          'EMPP: ocrelizumab (único aprobado)',
          'Sintomático: espasticidad (baclofeno), fatiga (amantadina), vejiga (anticolinérgicos)'
        ]
      }
    ]
  },

  {
    id: 'enfermedad-celiaquia',
    nombre: 'Enfermedad Celíaca',
    icono: '🌾',
    subtitulo: 'Enteropatía autoinmune por gluten',
    categorias: ['organoespecificas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Enteropatía autoinmune inducida por gluten',
          'Prevalencia: 1% población mundial',
          'Subdiagnóstico: solo 10-20% casos diagnosticados',
          'Puede presentarse a cualquier edad',
          'Asociación con DM1, tiroiditis, síndrome de Down',
          'Única autoinmune con tratamiento definitivo: dieta sin gluten'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Patogénesis',
        items: [
          'Gluten (gliadina del trigo): péptidos resistentes a digestión',
          'Permeabilidad intestinal aumentada',
          'Transglutaminasa tisular 2 (TG2): deamida gliadina',
          'Gliadina deamidada: mayor afinidad por HLA-DQ2/DQ8',
          'Presentación a linfocitos T CD4+ en lámina propia',
          'Th1: IFN-γ, daño epitelial',
          'Linfocitos intraepiteliales citotóxicos',
          'Atrofia vellositaria, hiperplasia de criptas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Autoanticuerpos diagnósticos',
        datos: [
          { label: 'Anti-TG2 IgA', value: 'Sensibilidad 95%, especificidad 95%, test de elección' },
          { label: 'Anti-endomisio IgA', value: 'Sensibilidad 85-98%, especificidad >95%' },
          { label: 'Anti-gliadina deamidada', value: 'Útil en deficiencia de IgA, niños <2 años' },
          { label: 'Anti-TG2 IgG', value: 'Alternativa en deficiencia de IgA' },
          { label: 'IgA sérica total', value: 'Descartar deficiencia de IgA (2-3% celíacos)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Genética',
        items: [
          'HLA-DQ2.5: 90-95% pacientes',
          'HLA-DQ8: 5% pacientes (si DQ2 negativo)',
          'HLA-DQ2 o DQ8: 99.6% casos',
          'HLA negativo: prácticamente excluye celiaquía',
          'Concordancia gemelos: 75% monocigotos, 11% dicigotos',
          'Genes no-HLA: múltiples loci de susceptibilidad'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Manifestaciones clínicas',
        items: [
          'Clásica: diarrea crónica, esteatorrea, distensión abdominal',
          'No clásica (más común): anemia ferropénica, osteoporosis, fatiga',
          'Silente: serología y biopsia positivas, sin síntomas',
          'Dermatitis herpetiforme: manifestación cutánea (vesículas pruriginosas)',
          'Deficiencias nutricionales: hierro, calcio, vitamina D, B12',
          'Complicaciones: linfoma intestinal (EATL), adenocarcinoma de intestino delgado'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Histopatología (clasificación Marsh-Oberhuber)',
        items: [
          'Marsh 0: mucosa normal',
          'Marsh 1: aumento de linfocitos intraepiteliales (>25/100 enterocitos)',
          'Marsh 2: hiperplasia de criptas',
          'Marsh 3a: atrofia vellositaria parcial',
          'Marsh 3b: atrofia vellositaria subtotal',
          'Marsh 3c: atrofia vellositaria total',
          'Marsh 4: hipoplasia (raro)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Tratamiento',
        items: [
          'Dieta libre de gluten (DLG): de por vida',
          'Eliminar: trigo, cebada, centeno',
          'Avena: controvertida, puede ser tolerada si no contaminada',
          'Recuperación histológica: 6-24 meses con DLG estricta',
          'Serología: negativización en 6-12 meses',
          'Suplementación: hierro, calcio, vitamina D según deficiencias',
          'Celiaquía refractaria: no responde a DLG, considerar esteroides, inmunosupresores',
          'Terapias en investigación: enzimas digestivas de gluten, bloqueo de zonulina'
        ]
      }
    ]
  },

  {
    id: 'sindrome-antifosfolipido',
    nombre: 'Síndrome Antifosfolípido (SAF)',
    icono: '🩸',
    subtitulo: 'Trombosis autoinmune mediada por anticuerpos',
    categorias: ['sistemicas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Trombofilia autoinmune',
          'Trombosis arterial, venosa o ambas',
          'Morbilidad obstétrica: abortos recurrentes, preeclampsia',
          'Puede ser primaria (aislada) o secundaria (asociada a LES)',
          '40% pacientes con LES tienen anticuerpos antifosfolípidos',
          'Afecta ambos sexos, pero morbilidad obstétrica en mujeres'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Anticuerpos antifosfolípidos',
        datos: [
          { label: 'Anticardiolipinas IgG/IgM', value: 'Contra cardiolipina + β2-glicoproteína I' },
          { label: 'Anti-β2GPI IgG/IgM', value: 'Contra β2-glicoproteína I directamente' },
          { label: 'Anticoagulante lúpico', value: 'Prolonga PTTa in vitro, paradójicamente protrombótico' },
          { label: 'Criterios diagnósticos', value: 'Al menos 1 Ac positivo en 2 ocasiones separadas ≥12 semanas' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fisiopatología',
        items: [
          'Anticuerpos contra β2-glicoproteína I (principal antígeno)',
          'Activación de células endoteliales',
          'Expresión de moléculas de adhesión y factor tisular',
          'Activación plaquetaria',
          'Inhibición de proteínas anticoagulantes (proteína C, antitrombina)',
          'Activación de complemento (C5a)',
          'Estado protrombótico multifactorial'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Manifestaciones clínicas',
        items: [
          'Trombosis venosa: trombosis venosa profunda (TVP), embolia pulmonar',
          'Trombosis arterial: ACV, infarto miocárdico (pacientes jóvenes)',
          'Abortos recurrentes: ≥3 abortos <10 semanas o ≥1 aborto ≥10 semanas',
          'Preeclampsia, eclampsia, RCIU (restricción crecimiento intrauterino)',
          'Trombocitopenia: 30-50% casos',
          'Livedo reticularis: patrón reticular violáceo en piel',
          'SAF catastrófico: falla multiorgánica por trombosis difusa (1% casos, 50% mortalidad)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Criterios diagnósticos (Sydney 2006)',
        items: [
          'Criterio clínico + criterio de laboratorio',
          'Clínico: ≥1 trombosis vascular O morbilidad obstétrica',
          'Laboratorio: anticardiolipinas IgG/IgM (>40 U) O anti-β2GPI IgG/IgM (>40 U) O anticoagulante lúpico',
          'Laboratorio: positivo en ≥2 ocasiones separadas ≥12 semanas',
          'Triple positividad: 3 anticuerpos positivos, mayor riesgo trombótico'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Tratamiento',
        items: [
          'Anticoagulación: warfarina (INR 2-3) tras primer evento trombótico',
          'Anticoagulación de por vida tras trombosis',
          'Embarazo: AAS dosis baja + heparina (bajo peso molecular)',
          'DOACs (anticoagulantes directos): controvertidos, warfarina preferida',
          'SAF catastrófico: anticoagulación + corticosteroides + IVIG o plasmaféresis',
          'Rituximab, eculizumab: casos refractarios',
          'Manejo de factores de riesgo CV: HTA, dislipidemia, obesidad',
          'Evitar: estrógenos, tabaquismo'
        ]
      }
    ]
  },

  {
    id: 'miastenia-gravis',
    nombre: 'Miastenia Gravis',
    icono: '💪',
    subtitulo: 'Debilidad muscular por autoanticuerpos contra receptores',
    categorias: ['organoespecificas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Enfermedad autoinmune de unión neuromuscular',
          'Debilidad muscular fluctuante que empeora con actividad',
          'Prevalencia: 20 casos/100,000',
          'Distribución bimodal: mujeres jóvenes (20-40), hombres mayores (60-80)',
          'Asociación con timoma (10-15%) e hiperplasia tímica (65%)',
          'Puede asociarse con otras autoinmunes: tiroiditis, LES, AR'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Autoanticuerpos',
        datos: [
          { label: 'Anti-AChR', value: '85% casos generalizados, bloquean receptores acetilcolina' },
          { label: 'Anti-MuSK', value: '5-8% AChR-negativos, kinasa músculo-específica' },
          { label: 'Anti-LRP4', value: '2-3% doble-seronegativos, proteína relacionada a LDL' },
          { label: 'Seronegativa', value: '10-15%, posible anti-AChR agrupados, baja afinidad' },
          { label: 'Anti-titina, anti-RyR', value: 'Asociados a timoma, peor pronóstico' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fisiopatología',
        items: [
          'Autoanticuerpos IgG contra receptores de acetilcolina (AChR)',
          'Tipo II hipersensibilidad: mediada por anticuerpos',
          'Mecanismos: bloqueo directo, degradación acelerada (crosslinking), activación complemento',
          'Reducción de AChR en placa motora (>50%)',
          'Transmisión neuromuscular deficiente',
          'Anti-MuSK: interfiere con agrupamiento de AChR',
          'Timo: fuente de autoanticuerpos, hiperplasia o timoma'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Manifestaciones clínicas',
        items: [
          'Debilidad ocular: ptosis, diplopía (90% inicio, 50% permanece ocular)',
          'Debilidad bulbar: disartria, disfagia, dificultad masticación',
          'Debilidad de extremidades: proximal > distal',
          'Fatigabilidad: empeora con actividad repetida, mejora con reposo',
          'Debilidad respiratoria: crisis miasténica (emergencia)',
          'Sin afectación sensitiva ni reflejos',
          'Fluctuación diaria: peor al final del día'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Diagnóstico',
        items: [
          'Prueba de edrofonio (Tensilon): mejora transitoria (10 mg IV)',
          'Prueba del hielo: aplicar hielo en ojo con ptosis, mejora temporalmente',
          'Electromiografía (EMG): estimulación repetitiva → decremento >10%',
          'EMG de fibra única: jitter aumentado (más sensible)',
          'Serología: anti-AChR, anti-MuSK, anti-LRP4',
          'TC/RM tórax: evaluar timoma o hiperplasia tímica',
          'Espirometría: capacidad vital, evaluar función respiratoria'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Tratamiento',
        items: [
          'Anticolinesterásicos: piridostigmina (30-120 mg c/4-6h), tratamiento sintomático',
          'Corticosteroides: prednisona, primera línea inmunosupresión',
          'Inmunosupresores: azatioprina, micofenolato, ciclosporina, tacrolimus',
          'Timectomía: recomendada en timoma, beneficio en <60 años sin timoma',
          'IVIG o plasmaféresis: crisis miasténica o preparación quirúrgica',
          'Eculizumab (anti-C5): anti-AChR refractaria (aprobado 2017)',
          'Rituximab: casos refractarios, especialmente anti-MuSK',
          'Evitar: aminoglucósidos, quinolonas, β-bloqueadores, relajantes musculares'
        ]
      }
    ]
  },

  {
    id: 'tiroiditis-hashimoto',
    nombre: 'Tiroiditis de Hashimoto',
    icono: '🦋',
    subtitulo: 'Tiroiditis autoinmune linfocítica crónica',
    categorias: ['organoespecificas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Causa más común de hipotiroidismo en áreas con suficiente yodo',
          'Prevalencia: 1-2% población general',
          'Predominio femenino 10:1',
          'Edad pico: 40-60 años',
          'Predisposición genética + factores ambientales',
          'Asociada con otras autoinmunes: DM1, celiaquía, Addison, vitíligo'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Autoanticuerpos',
        datos: [
          { label: 'Anti-TPO', value: 'Anti-peroxidasa tiroidea, 90-95% pacientes' },
          { label: 'Anti-tiroglobulina', value: '60-80% pacientes' },
          { label: 'Anti-receptor TSH', value: 'Bloqueantes (raros), causan hipotiroidismo' },
          { label: 'Título alto', value: 'Correlaciona con mayor infiltración linfocítica' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fisiopatología',
        items: [
          'Infiltración linfocítica de glándula tiroides',
          'Linfocitos T CD4+ y CD8+, células B, células plasmáticas',
          'Formación de centros germinales',
          'Destrucción de células foliculares tiroideas',
          'Apoptosis mediada por Fas-FasL y perforinas/granzimas',
          'Hipotiroidismo progresivo por pérdida de parénquima funcional',
          'Fibrosis en estadios avanzados'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Factores de riesgo',
        items: [
          'Genéticos: HLA-DR3, HLA-DR5, CTLA-4, PTPN22',
          'Sexo femenino: influencia hormonal',
          'Ingesta excesiva de yodo: puede precipitar/exacerbar',
          'Infecciones virales: HCV, EBV (hipótesis)',
          'Radiación: exposición cervical',
          'Embarazo: tiroiditis post-parto (5-10% mujeres)',
          'Fármacos: interferón-α, litio, amiodarona'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Manifestaciones clínicas',
        items: [
          'Fase inicial: bocio indoloro, consistencia firme',
          'Tirotoxicosis transitoria: "hashitoxicosis" (liberación hormonal)',
          'Hipotiroidismo: fatiga, aumento peso, intolerancia frío, piel seca',
          'Bradicardia, constipación, depresión',
          'Mixedema: acumulación de GAGs en dermis',
          'TSH elevada, T4 libre baja',
          'Asociación con linfoma tiroideo (raro, 0.5%)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Tratamiento',
        items: [
          'Levotiroxina (T4): reemplazo hormonal de por vida',
          'Dosis: 1.6 μg/kg/día (ajustar según TSH)',
          'Objetivo TSH: 0.5-2.5 mU/L',
          'Monitoreo: TSH cada 6-8 semanas hasta estable, luego anual',
          'Embarazo: aumentar dosis 30-50%, TSH <2.5 primer trimestre',
          'Selenio: puede reducir anticuerpos, evidencia limitada',
          'No tratamiento para autoanticuerpos aislados sin hipotiroidismo',
          'Cirugía: raramente, si bocio compresivo o sospecha malignidad'
        ]
      }
    ]
  },

  {
    id: 'enfermedad-graves',
    nombre: 'Enfermedad de Graves',
    icono: '👁️',
    subtitulo: 'Hipertiroidismo autoinmune por anticuerpos estimulantes',
    categorias: ['organoespecificas'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Causa más común de hipertiroidismo (60-80% casos)',
          'Prevalencia: 0.5% población',
          'Predominio femenino 5-10:1',
          'Edad pico: 40-60 años',
          'Tríada: hipertiroidismo + oftalmopatía + dermopatía',
          'Puede remitir espontáneamente en algunos casos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Autoanticuerpos',
        datos: [
          { label: 'TRAb (estimulantes)', value: 'Anti-receptor TSH, estimulan producción hormonal' },
          { label: 'TSI', value: 'Inmunoglobulinas estimulantes de tiroides, 90% pacientes' },
          { label: 'Anti-TPO', value: 'Presentes en 75% (overlap con Hashimoto)' },
          { label: 'Anti-tiroglobulina', value: '50% pacientes' },
          { label: 'TRAb bloqueantes', value: 'Raros, pueden causar fluctuación hiper/hipotiroidismo' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fisiopatología',
        items: [
          'Autoanticuerpos IgG contra receptor de TSH',
          'Mimetiza acción de TSH, estimulación continua',
          'Hiperplasia folicular, aumento síntesis de T3/T4',
          'TSH suprimida por retroalimentación negativa',
          'Oftalmopatía: infiltración linfocítica de músculos extraoculares',
          'Fibroblastos orbitarios expresan receptor TSH',
          'GAGs, adipogénesis → proptosis',
          'Dermopatía (mixedema pretibial): acumulación GAGs en dermis'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Manifestaciones clínicas',
        items: [
          'Hipertiroidismo: taquicardia, palpitaciones, pérdida peso, temblor',
          'Intolerancia al calor, sudoración, ansiedad, irritabilidad',
          'Bocio difuso: aumento homogéneo de tiroides',
          'Soplo tiroideo: aumento vascularización',
          'Oftalmopatía (30-50%): proptosis, diplopía, dolor ocular',
          'Retracción palpebral (lid lag), mirada fija',
          'Dermopatía pretibial (1-5%): piel engrosada, no depresible',
          'Acropaquia tiroidea (rara): dedos en palillo de tambor'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Oftalmopatía de Graves (clasificación CAS)',
        items: [
          'Dolor espontáneo o al movimiento ocular',
          'Eritema palpebral',
          'Edema palpebral',
          'Hiperemia conjuntival',
          'Edema conjuntival (quemosis)',
          'Inflamación carúncula/pliegue semilunar',
          'Proptosis ≥2 mm en 1-3 meses',
          'CAS ≥3/7: oftalmopatía activa, considerar inmunosupresión'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Tratamiento',
        items: [
          'Antitiroideos: metimazol (primera línea), propiltiouracilo (embarazo 1er trimestre)',
          'Dosis metimazol: 10-40 mg/día, ajustar según T4 libre',
          'β-bloqueadores: propranolol, atenolol (síntomas adrenérgicos)',
          'Yodo radiactivo (I-131): tratamiento definitivo, hipotiroidismo resultante',
          'Tiroidectomía: bocio grande, oftalmopatía severa, falla médica',
          'Oftalmopatía activa: glucocorticoides IV (pulsos metilprednisolona)',
          'Terapia adicional oftalmopatía: radioterapia orbitaria, tocilizumab, teprotumumab',
          'Teprotumumab (anti-IGF-1R): aprobado 2020 para oftalmopatía activa',
          'Evitar: tabaquismo (empeora oftalmopatía)'
        ]
      }
    ]
  },

  {
    id: 'tratamiento-autoinmunidad',
    nombre: 'Tratamiento de Enfermedades Autoinmunes',
    icono: '💊',
    subtitulo: 'Estrategias terapéuticas en autoinmunidad',
    categorias: ['tratamiento'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Principios generales',
        items: [
          'Inmunosupresión: reducir actividad del sistema inmune',
          'Inmunomodulación: dirigir respuesta inmune sin supresión global',
          'Terapias dirigidas: bloqueo de moléculas específicas',
          'Control sintomático: manejo de manifestaciones clínicas',
          'Prevención de complicaciones: infecciones, malignidad',
          'Balance beneficio-riesgo: evitar inmunosupresión excesiva'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Corticosteroides',
        items: [
          'Mecanismo: múltiples efectos antiinflamatorios e inmunosupresores',
          'Prednisona/prednisolona: más usados vía oral',
          'Metilprednisolona IV: pulsos en crisis (1g/día x 3-5 días)',
          'Dexametasona: potencia alta, vida media larga',
          'Efectos: inhiben NF-κB, reducen citocinas, linfopenia',
          'Efectos adversos: Cushing, osteoporosis, diabetes, infecciones',
          'Minimizar dosis y duración: "esteroid-sparing"'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'DMARDs convencionales',
        datos: [
          { label: 'Metotrexato', value: 'Inhibidor dihidrofolato reductasa, AR, psoriasis' },
          { label: 'Azatioprina', value: 'Antimetabolito purina, LES, miastenia, vasculitis' },
          { label: 'Micofenolato', value: 'Inhibe síntesis purinas, LES, trasplantes' },
          { label: 'Ciclofosfamida', value: 'Agente alquilante, vasculitis severa, nefritis lúpica' },
          { label: 'Ciclosporina', value: 'Inhibidor calcineurina, psoriasis, uveítis' },
          { label: 'Tacrolimus', value: 'Inhibidor calcineurina, más potente que ciclosporina' },
          { label: 'Leflunomida', value: 'Inhibe síntesis pirimidinas, AR' },
          { label: 'Hidroxicloroquina', value: 'Antipalúdico, LES, AR (bajo riesgo)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Terapias biológicas anti-citocinas',
        items: [
          'Anti-TNF-α: infliximab, etanercept, adalimumab, golimumab, certolizumab',
          'Indicaciones: AR, espondilitis, Crohn, colitis ulcerosa, psoriasis',
          'Riesgos: infecciones (tuberculosis), linfoma (controversia)',
          'Anti-IL-6: tocilizumab (AR), sarilumab',
          'Anti-IL-17: secukinumab, ixekizumab (psoriasis, espondilitis)',
          'Anti-IL-12/23: ustekinumab (psoriasis, Crohn)',
          'Anti-IL-23: guselkumab, risankizumab (psoriasis)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Terapias dirigidas a células B',
        items: [
          'Rituximab (anti-CD20): depleta células B, AR, LES, vasculitis',
          'Belimumab (anti-BLyS/BAFF): reduce supervivencia células B, LES',
          'Ocrelizumab (anti-CD20): esclerosis múltiple',
          'Ofatumumab (anti-CD20): EM recurrente-remitente',
          'Inebilizumab (anti-CD19): neuromielitis óptica',
          'Reconstitución inmune: 6-12 meses post-tratamiento'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Moduladores de coestimulación y adhesión',
        items: [
          'Abatacept (CTLA-4-Ig): bloquea CD28-B7, AR, LES',
          'Belatacept: similar a abatacept, trasplantes',
          'Natalizumab (anti-α4-integrina): esclerosis múltiple',
          'Riesgo: leucoencefalopatía multifocal progresiva (LMP) con natalizumab',
          'Vedolizumab (anti-α4β7): enfermedad inflamatoria intestinal, selectivo intestino'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Inhibidores de JAK (Janus kinase)',
        items: [
          'Tofacitinib (JAK1/3): AR, colitis ulcerosa, psoriasis',
          'Baricitinib (JAK1/2): AR, dermatitis atópica, alopecia areata',
          'Upadacitinib (JAK1): AR, espondilitis, dermatitis atópica, Crohn',
          'Mecanismo: bloquean señalización de citocinas',
          'Ventaja: oral, no biológico',
          'Riesgos: infecciones, eventos tromboembólicos (controversia)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Inhibidores del complemento',
        items: [
          'Eculizumab (anti-C5): HPN, SUHa, miastenia gravis refractaria, NMOSD',
          'Ravulizumab (anti-C5): vida media más larga que eculizumab',
          'C1-INH concentrado: angioedema hereditario',
          'Riesgo: infecciones por Neisseria (vacunación meningococo obligatoria)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Terapias emergentes',
        items: [
          'CAR-T anti-CD19: depleción profunda células B, lupus severo (ensayos)',
          'Terapia celular adoptiva: Tregs expandidos ex vivo',
          'Vacunas terapéuticas: tolerización específica de antígeno',
          'Moduladores microbiota: FMT, probióticos específicos',
          'Terapias anti-BAFF/APRIL: bloqueo dual',
          'Inhibidores BTK (Bruton tyrosine kinase): enfermedad autoinmune'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Monitoreo y prevención de efectos adversos',
        items: [
          'Screening infecciones: tuberculosis (PPD/IGRA), hepatitis B/C, VIH',
          'Vacunación: neumococo, influenza, herpes zóster (pre-inmunosupresión)',
          'Profilaxis: PCP (trimetoprim-sulfametoxazol) si linfopenia severa',
          'Monitoreo: hemograma, función hepática/renal periódica',
          'Densitometría ósea: pacientes con corticosteroides crónicos',
          'Embarazo: planificación, evitar metotrexato, micofenolato, ciclofosfamida',
          'Malignidad: vigilancia en inmunosupresión prolongada'
        ]
      }
    ]
  }
];