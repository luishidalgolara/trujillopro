// ═══════════════════════════════════════════════════════════
// PRESION-ARTERIAL-DATA.JS - Base de datos educativa
// ═══════════════════════════════════════════════════════════

const PRESION_ARTERIAL_DATA = [
  {
    id: "barorreceptores",
    nombre: "Control Barorreceptor",
    subtitulo: "Regulación neurológica rápida a corto plazo",
    icono: "⚡",
    categorias: ["barorreceptor"],
    secciones: [
      {
        titulo: "📍 Localización de Barorreceptores",
        tipo: "lista",
        items: [
          "Seno carotídeo: bifurcación de arteria carótida común, inervado por nervio del seno carotídeo (rama del glosofaríngeo, NC IX)",
          "Arco aórtico: inervado por nervio vago (NC X)",
          "Responden a estiramiento de la pared arterial proporcional a la presión transmural"
        ]
      },
      {
        titulo: "⚙️ Mecanismo de Acción",
        tipo: "lista",
        items: [
          "Aumento de PA → mayor estiramiento → aumento de frecuencia de potenciales de acción al centro vasomotor",
          "Centro vasomotor (médula oblongada): integra señales y modula tono simpático y parasimpático",
          "Tiempo de respuesta: segundos (control más rápido de PA)",
          "Barorreceptores se adaptan en 1-2 días (no previenen hipertensión crónica, solo amortiguan cambios agudos)"
        ]
      },
      {
        titulo: "📊 Respuesta Fisiológica",
        tipo: "tabla",
        datos: [
          { label: "↑ PA detectada", value: "↑ descarga barorreceptora → ↑ actividad parasimpática, ↓ simpática" },
          { label: "Efecto cardíaco", value: "↓ frecuencia cardíaca (cronotropismo −), ↓ contractilidad" },
          { label: "Efecto vascular", value: "Vasodilatación arteriolar y venosa → ↓ resistencia periférica, ↓ retorno venoso" },
          { label: "Resultado neto", value: "↓ PA hacia valores basales" }
        ]
      },
      {
        titulo: "🔬 Curva de Funcionamiento",
        tipo: "lista",
        items: [
          "Rango operativo: 60-180 mmHg (máxima sensibilidad alrededor de PA normal ~100 mmHg)",
          "Respuesta sigmoide: poco sensible a PA muy bajas o muy altas",
          "Resetting: en hipertensión crónica, la curva se desplaza hacia presiones más altas"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Síncope vasovagal: hiperactividad barorreceptora → bradicardia severa y vasodilatación",
          "Hipotensión ortostática: fallo barorreceptor al cambiar de posición (común en neuropatía autonómica diabética)",
          "Síndrome del seno carotídeo: hipersensibilidad → síncope con manipulación cervical (ej. corbata ajustada)"
        ]
      }
    ]
  },
  {
    id: "sraa",
    nombre: "Sistema Renina-Angiotensina-Aldosterona (SRAA)",
    subtitulo: "Control hormonal a mediano y largo plazo",
    icono: "🧬",
    categorias: ["hormonal", "renal"],
    secciones: [
      {
        titulo: "🔄 Cascada Bioquímica",
        tipo: "lista",
        items: [
          "Riñón (células yuxtaglomerulares) libera RENINA en respuesta a: ↓ presión arteriolar aferente, ↓ Na+ en mácula densa, ↑ actividad simpática β1",
          "Renina convierte angiotensinógeno (hepático) → Angiotensina I (inactiva)",
          "ECA (enzima convertidora de angiotensina) en pulmón y endotelio vascular: Ang I → Angiotensina II (activa)",
          "Ang II estimula corteza suprarrenal → liberación de ALDOSTERONA"
        ]
      },
      {
        titulo: "💊 Acciones de Angiotensina II",
        tipo: "tabla",
        datos: [
          { label: "Vasoconstricción", value: "Potente vasoconstrictor arteriolar (receptor AT1) → ↑ resistencia periférica" },
          { label: "Efecto renal directo", value: "Vasoconstricción arteriola eferente → ↑ presión glomerular, ↑ reabsorción Na+ en túbulo proximal" },
          { label: "Liberación aldosterona", value: "Estimula zona glomerulosa suprarrenal" },
          { label: "Sed y liberación ADH", value: "Actúa en hipotálamo y neurohipófisis" },
          { label: "Efecto simpático", value: "Potencia liberación de noradrenalina" }
        ]
      },
      {
        titulo: "🧪 Acciones de Aldosterona",
        tipo: "lista",
        items: [
          "Aumenta reabsorción de Na+ y secreción de K+ en túbulo colector (receptor mineralocorticoide)",
          "Retención de agua secundaria a Na+ → ↑ volumen plasmático → ↑ PA",
          "Efecto tarda 1-2 horas (síntesis proteica), pero es sostenido (días)"
        ]
      },
      {
        titulo: "⚖️ Regulación del SRAA",
        tipo: "lista",
        items: [
          "Retroalimentación negativa: ↑ PA → ↓ liberación de renina",
          "Ang II inhibe directamente liberación de renina",
          "Péptidos natriuréticos (ANP, BNP) antagonizan SRAA"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Hipertensión renovascular: estenosis arteria renal → ↑ renina inapropiada → hipertensión secundaria",
          "Hiperaldosteronismo primario (Síndrome de Conn): adenoma suprarrenal → aldosterona elevada, renina suprimida",
          "Insuficiencia cardíaca: activación crónica SRAA contribuye a retención de líquidos y remodelado cardíaco",
          "Fármacos IECA y ARA-II: bloquean SRAA, primera línea en HTA, IC, nefropatía diabética"
        ]
      }
    ]
  },
  {
    id: "adh",
    nombre: "Hormona Antidiurética (ADH/Vasopresina)",
    subtitulo: "Control osmótico y de volumen",
    icono: "💧",
    categorias: ["hormonal"],
    secciones: [
      {
        titulo: "📍 Síntesis y Liberación",
        tipo: "lista",
        items: [
          "Sintetizada en núcleos supraóptico y paraventricular del hipotálamo",
          "Almacenada y liberada por neurohipófisis (lóbulo posterior de hipófisis)",
          "Estímulos principales: ↑ osmolalidad plasmática (>280 mOsm/kg detectada por osmorreceptores hipotalámicos), ↓ volumen sanguíneo (>10-15% detectado por barorreceptores)"
        ]
      },
      {
        titulo: "⚙️ Mecanismos de Acción",
        tipo: "tabla",
        datos: [
          { label: "Receptor V2 (riñón)", value: "Túbulo colector: inserta acuaporina-2 → ↑ reabsorción de agua libre → orina concentrada" },
          { label: "Receptor V1a (vascular)", value: "Vasoconstricción (efecto menor en concentraciones fisiológicas, importante en shock)" },
          { label: "Receptor V1b (hipófisis)", value: "Modulación liberación ACTH" }
        ]
      },
      {
        titulo: "📊 Efecto sobre Presión Arterial",
        tipo: "lista",
        items: [
          "Retención de agua → ↑ volemia → ↑ precarga → ↑ gasto cardíaco → ↑ PA",
          "En concentraciones altas (hemorragia, shock): vasoconstricción directa contribuye significativamente",
          "Interacción con SRAA: Ang II estimula liberación de ADH"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Diabetes insípida central: déficit ADH → poliuria (>3L/día), polidipsia, hipernatremia si no se compensa ingesta",
          "SIADH (secreción inapropiada ADH): ADH elevada sin estímulo osmótico → hiponatremia dilucional (causas: tumores, fármacos, infecciones SNC)",
          "Terlipresina/desmopresina: análogos ADH usados en sangrado variceal, shock séptico, hemofilia"
        ]
      }
    ]
  },
  {
    id: "peptidos-natriureticos",
    nombre: "Péptidos Natriuréticos (ANP, BNP, CNP)",
    subtitulo: "Hormonas contrarreguladoras de volumen",
    icono: "🫀",
    categorias: ["hormonal"],
    secciones: [
      {
        titulo: "🧬 Tipos y Origen",
        tipo: "tabla",
        datos: [
          { label: "ANP (Péptido Natriurético Atrial)", value: "Secretado por aurículas cardíacas en respuesta a distensión auricular (↑ volemia)" },
          { label: "BNP (Péptido Natriurético tipo B)", value: "Secretado por ventrículos cardíacos en respuesta a sobrecarga volumétrica/presión" },
          { label: "CNP (Péptido Natriurético tipo C)", value: "Origen endotelial y SNC, menor rol en regulación PA sistémica" }
        ]
      },
      {
        titulo: "⚙️ Mecanismos de Acción",
        tipo: "lista",
        items: [
          "Receptores NPR-A y NPR-B (guanilato ciclasa) → ↑ GMPc intracelular",
          "Natriuresis y diuresis: inhiben reabsorción Na+ en túbulo colector, aumentan filtrado glomerular",
          "Vasodilatación: relajación músculo liso vascular",
          "Antagonismo SRAA: inhiben secreción renina y aldosterona, bloquean efectos Ang II",
          "Efecto simpaticolítico: reducen tono simpático central"
        ]
      },
      {
        titulo: "📉 Efectos Netos sobre PA",
        tipo: "lista",
        items: [
          "↓ volemia (natriuresis/diuresis)",
          "↓ resistencia vascular periférica (vasodilatación)",
          "↓ gasto cardíaco (reducción precarga)",
          "Resultado: ↓ PA y protección contra sobrecarga de volumen"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "BNP como biomarcador: elevado en insuficiencia cardíaca (diagnóstico, pronóstico, guía terapéutica). Valores >100 pg/mL sugieren IC",
          "Nesiritida: análogo BNP recombinante usado en IC aguda descompensada (vasodilatador, diurético)",
          "Inhibidores neprilisina (sacubitrilo): previenen degradación péptidos natriuréticos, combinados con ARA-II (sacubitrilo/valsartán) en IC"
        ]
      }
    ]
  },
  {
    id: "control-renal",
    nombre: "Control Renal del Volumen y Sodio",
    subtitulo: "Regulación a largo plazo más potente",
    icono: "🩺",
    categorias: ["renal"],
    secciones: [
      {
        titulo: "💧 Principio de Presión-Natriuresis",
        tipo: "lista",
        items: [
          "Concepto Guyton: relación directa entre PA y excreción renal de Na+ y agua",
          "↑ PA → ↑ presión hidrostática capilar peritubular → ↓ reabsorción Na+ proximal → natriuresis",
          "↑ PA → ↑ flujo medular renal → ↓ gradiente osmótico → ↓ reabsorción agua → diuresis presión",
          "Mecanismo más potente a largo plazo: ajusta volemia hasta normalizar PA (días-semanas)"
        ]
      },
      {
        titulo: "⚖️ Balance de Sodio y Volumen",
        tipo: "tabla",
        datos: [
          { label: "Ingesta Na+ promedio", value: "150-200 mEq/día (9-12 g sal/día)" },
          { label: "Filtrado glomerular Na+", value: "~25,000 mEq/día (99% reabsorbido)" },
          { label: "Excreción normal", value: "Debe igualar ingesta para mantener balance" },
          { label: "Ganancia neta Na+", value: "Retiene agua → ↑ volumen ECF → ↑ PA hasta que natriuresis compense" }
        ]
      },
      {
        titulo: "🔬 Sitios de Reabsorción Tubular Na+",
        tipo: "lista",
        items: [
          "Túbulo proximal: 65-70% (modulado por Ang II, presión hidrostática peritubular)",
          "Asa de Henle (rama ascendente gruesa): 25% (cotransportador NKCC2, blanco de diuréticos de asa)",
          "Túbulo distal: 5% (cotransportador NCC, blanco de tiazidas)",
          "Túbulo colector: 2-3% (canal ENaC, regulado por aldosterona, blanco de ahorradores de K+)"
        ]
      },
      {
        titulo: "🧪 Autorregulación Renal",
        tipo: "lista",
        items: [
          "Retroalimentación tubuloglomerular: ↑ Cl- en mácula densa → constricción arteriola aferente → ↓ FG",
          "Miogénico: arteriolas aferentes contraen ante estiramiento → mantiene FG estable entre 80-180 mmHg PA",
          "Previene transmisión directa de cambios PA sistémica al glomérulo"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Hipertensión sal-sensible: incapacidad renal para excretar Na+ adecuadamente con dieta alta en sal (común en población afrodescendiente, ancianos)",
          "Insuficiencia renal crónica: pérdida nefronas → incapacidad excretar Na+ → expansión volumen → HTA (>80% pacientes ERC tienen HTA)",
          "Diuréticos: tiazidas (1ª línea HTA), asa (sobrecarga volumen, IC, ERC avanzada), ahorradores K+ (combinación, hiperaldosteronismo)",
          "Estenosis arteria renal bilateral o riñón único: IECA/ARA-II pueden precipitar insuficiencia renal aguda (disminuyen presión glomerular crítica para FG)"
        ]
      }
    ]
  },
  {
    id: "catecolaminas",
    nombre: "Sistema Simpático y Catecolaminas",
    subtitulo: "Control neurogénico adrenérgico",
    icono: "⚡",
    categorias: ["barorreceptor", "hormonal"],
    secciones: [
      {
        titulo: "🧠 Centros de Control Cardiovascular",
        tipo: "lista",
        items: [
          "Centro vasomotor (médula oblongada): integra aferencias barorreceptoras, quimiorreceptoras, córtex cerebral",
          "Área presora (rostral ventrolateral): aumenta tono simpático",
          "Área depresora (caudal ventrolateral): aumenta tono parasimpático",
          "Fibras simpáticas preganglionares: T1-L2 → ganglios paravertebrales → posganglionares a corazón y vasos"
        ]
      },
      {
        titulo: "💊 Receptores Adrenérgicos Cardiovasculares",
        tipo: "tabla",
        datos: [
          { label: "α1 (vasos)", value: "Vasoconstricción arteriolar y venosa → ↑ resistencia periférica, ↑ retorno venoso" },
          { label: "β1 (corazón)", value: "↑ frecuencia (cronotropismo +), ↑ contractilidad (inotropismo +), ↑ conducción AV" },
          { label: "β2 (vasos)", value: "Vasodilatación en músculo esquelético, hígado (menor relevancia hemodinámica)" },
          { label: "α2 (central/periférico)", value: "Retroalimentación negativa presináptica, efecto hipotensor central (clonidina)" }
        ]
      },
      {
        titulo: "🔬 Catecolaminas Circulantes",
        tipo: "lista",
        items: [
          "Médula suprarrenal: libera 80% adrenalina, 20% noradrenalina en respuesta a estrés, hipoglucemia, hipovolemia",
          "Noradrenalina neuronal: efecto local predominante (vasos, corazón), niveles plasmáticos bajos",
          "Adrenalina: β1=β2>α en concentraciones bajas; α1 predomina en altas dosis → inicialmente vasodilatación, luego vasoconstricción"
        ]
      },
      {
        titulo: "📊 Respuesta Simpática a Hipotensión",
        tipo: "lista",
        items: [
          "↓ PA → ↓ descarga barorreceptora → desinhibición centro vasomotor → ↑ simpático",
          "Efectos inmediatos (<1 min): taquicardia, vasoconstricción, ↑ contractilidad",
          "Redistribución flujo: prioriza cerebro y corazón, reduce flujo esplácnico y renal (α1 vasoconstrictor)",
          "Liberación renina (β1 renal) → activación SRAA"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Feocromocitoma: tumor médula suprarrenal → liberación paroxística catecolaminas → crisis hipertensivas, cefalea, diaforesis, palpitaciones",
          "Shock neurogénico (lesión medular): pérdida tono simpático → hipotensión con bradicardia paradójica",
          "β-bloqueadores: reducen FC, contractilidad, liberación renina (metoprolol, atenolol en HTA, IC, post-IAM)",
          "α-bloqueadores: doxazosina (HTA, hiperplasia prostática benigna), fenoxibenzamina (feocromocitoma preoperatorio)"
        ]
      }
    ]
  },
  {
    id: "endotelio",
    nombre: "Función Endotelial en Regulación Vascular",
    subtitulo: "Control local parácrino del tono vascular",
    icono: "🧫",
    categorias: ["hormonal"],
    secciones: [
      {
        titulo: "🔬 Factores Derivados del Endotelio",
        tipo: "tabla",
        datos: [
          { label: "Óxido Nítrico (NO)", value: "Vasodilatador potente, inhibe agregación plaquetaria, antiproliferativo" },
          { label: "Prostaciclina (PGI2)", value: "Vasodilatador, antiagregante plaquetario" },
          { label: "Endotelina-1", value: "Vasoconstrictor más potente conocido, mitogénico" },
          { label: "Factor Hiperpolarizante (EDHF)", value: "Vasodilatación mediante hiperpolarización músculo liso" }
        ]
      },
      {
        titulo: "⚙️ Óxido Nítrico (NO) - Mecanismo",
        tipo: "lista",
        items: [
          "Síntesis: eNOS (NO sintasa endotelial) convierte L-arginina → NO + L-citrulina",
          "Estímulos: flujo/shear stress, acetilcolina, bradicinina, actividad física",
          "Acción: difunde a célula muscular lisa → activa guanilato ciclasa → ↑ GMPc → relajación",
          "Vida media corta (~segundos), acción local predominante"
        ]
      },
      {
        titulo: "📉 Disfunción Endotelial",
        tipo: "lista",
        items: [
          "Factores de riesgo: HTA, diabetes, dislipidemia, tabaquismo, edad, obesidad",
          "Consecuencias: ↓ biodisponibilidad NO, ↑ endotelina-1, estado proinflamatorio y protrombótico",
          "Manifestaciones: vasoconstricción inapropiada, aterosclerosis acelerada, eventos cardiovasculares",
          "Evaluación: dilatación mediada por flujo (DMF) de arteria braquial (normal >10%)"
        ]
      },
      {
        titulo: "🧪 Endotelina-1",
        tipo: "lista",
        items: [
          "Sintetizada por células endoteliales en respuesta a hipoxia, trombina, Ang II, estrés oxidativo",
          "Receptores: ETA (vasoconstricción, proliferación), ETB (vasodilatación vía NO, clearance endotelina)",
          "Vida media larga (minutos-horas), efecto sostenido",
          "Elevada en: HTA pulmonar, insuficiencia cardíaca, enfermedad renal crónica"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Antagonistas endotelina (bosentán, ambrisentán): tratamiento hipertensión arterial pulmonar",
          "Nitratos orgánicos (nitroglicerina, mononitrato): donadores NO exógeno, tratamiento angina, IC aguda",
          "Inhibidores fosfodiesterasa-5 (sildenafilo): ↑ GMPc (potencian vía NO), HTA pulmonar, disfunción eréctil",
          "Estatinas: mejoran función endotelial independientemente de reducción LDL (efecto pleiotrópico)"
        ]
      }
    ]
  },
  {
    id: "integracion",
    nombre: "Integración de Mecanismos Reguladores",
    subtitulo: "Respuesta coordinada multiescala temporal",
    icono: "🔄",
    categorias: ["barorreceptor", "hormonal", "renal"],
    secciones: [
      {
        titulo: "⏱️ Escala Temporal de Respuestas",
        tipo: "tabla",
        datos: [
          { label: "Segundos", value: "Reflejo barorreceptor, simpático/parasimpático → ajuste inmediato FC, contractilidad, tono vascular" },
          { label: "Minutos-Horas", value: "Catecolaminas circulantes, renina-angiotensina, ADH → vasoconstricción, inicio retención Na+/agua" },
          { label: "Horas-Días", value: "Aldosterona, presión-natriuresis → ajuste volemia, estabilización PA" },
          { label: "Semanas-Meses", value: "Remodelado vascular y cardíaco, reseteo barorreceptores en HTA crónica" }
        ]
      },
      {
        titulo: "📊 Respuesta Integrada a Hemorragia Aguda",
        tipo: "lista",
        items: [
          "INMEDIATO (segundos): ↓ activación barorreceptores → ↑ simpático → taquicardia, vasoconstricción, ↑ contractilidad",
          "MINUTOS: ↑ ADH, ↑ adrenalina/noradrenalina → vasoconstricción sostenida, sed, inicio retención agua",
          "HORAS: ↑ renina → ↑ Ang II → vasoconstricción, ↑ aldosterona → retención Na+/agua, desplazamiento líquido intersticial → plasma (reposición volemia)",
          "DÍAS: sed y retención renal restauran volemia completamente, eritropoyetina → reposición masa eritrocitaria"
        ]
      },
      {
        titulo: "🔄 Interacciones entre Sistemas",
        tipo: "lista",
        items: [
          "Simpático ↔ SRAA: simpático estimula liberación renina (β1); Ang II potencia liberación noradrenalina",
          "SRAA ↔ ADH: Ang II estimula sed y liberación ADH; ADH potencia vasoconstricción Ang II",
          "Péptidos natriuréticos: antagonizan SRAA y simpático → contrarregulan expansión de volumen",
          "Endotelio: modula respuesta vascular a estímulos neurológicos y hormonales (disfunción → hiperreactividad)"
        ]
      },
      {
        titulo: "⚖️ Balance Normal vs. Patológico",
        tipo: "tabla",
        datos: [
          { label: "Estado normal", value: "Sistemas en equilibrio dinámico, PA regulada estrechamente (retroalimentación negativa)" },
          { label: "HTA esencial", value: "Múltiples alteraciones sutiles: ↑ simpático, SRAA activado, disfunción endotelial, ↓ natriuresis" },
          { label: "Insuficiencia cardíaca", value: "Activación neurohumoral compensatoria se vuelve deletérea: retención agua/sal, vasoconstricción, remodelado" },
          { label: "Shock", value: "Fallo coordinación: vasodilatación patológica, ↓ contractilidad, hipovolemia → hipoperfusión orgánica" }
        ]
      },
      {
        titulo: "🩺 Implicaciones Terapéuticas",
        tipo: "clinica",
        items: [
          "Terapia combinada HTA: bloquear múltiples ejes (ej. IECA + diurético tiazídico + calcioantagonista) más efectivo que monoterapia dosis altas",
          "Insuficiencia cardíaca: triple terapia neurohumoral (IECA/ARA-II + β-bloqueador + ARM) + sacubitrilo/valsartán reduce mortalidad",
          "Shock: soporte multimodal (volumen, vasopresores, inotrópicos) según tipo y fase",
          "Prevención cardiovascular: control factores riesgo preserva función endotelial y evita activación patológica sistemas reguladores"
        ]
      }
    ]
  }
];
