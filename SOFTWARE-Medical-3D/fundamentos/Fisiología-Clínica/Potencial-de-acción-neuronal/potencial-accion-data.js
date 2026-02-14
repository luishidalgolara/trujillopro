// ═══════════════════════════════════════════════════════════
// POTENCIAL-ACCION-DATA.JS - Base de datos educativa
// ═══════════════════════════════════════════════════════════

const POTENCIAL_ACCION_DATA = [
  {
    id: "potencial-reposo",
    nombre: "Potencial de Membrana en Reposo",
    subtitulo: "Equilibrio electroquímico neuronal basal",
    icono: "⚖️",
    categorias: ["fundamentos", "electrofisiologia"],
    secciones: [
      {
        titulo: "📊 Características del Potencial de Reposo",
        tipo: "lista",
        items: [
          "Valor típico: -70 mV (interior negativo respecto al exterior) en neuronas mamíferas",
          "Rango fisiológico: -40 a -90 mV según tipo neuronal (ej: células Purkinje ~-75 mV, interneuronas ~-60 mV)",
          "Estado dinámico: requiere gasto energético continuo (bomba Na⁺/K⁺-ATPasa consume ~70% ATP neuronal)",
          "Conductancia selectiva: membrana en reposo es 25-30× más permeable a K⁺ que a Na⁺"
        ]
      },
      {
        titulo: "🔬 Distribución Iónica Intra y Extracelular",
        tipo: "tabla",
        datos: [
          { label: "K⁺ (potasio)", value: "Intracelular: ~140 mM; Extracelular: ~5 mM → gradiente salida favorable" },
          { label: "Na⁺ (sodio)", value: "Intracelular: ~12 mM; Extracelular: ~145 mM → gradiente entrada favorable" },
          { label: "Cl⁻ (cloruro)", value: "Intracelular: ~4-30 mM; Extracelular: ~110 mM → cerca del equilibrio en muchas neuronas" },
          { label: "Ca²⁺ (calcio)", value: "Intracelular: ~100 nM (libre); Extracelular: ~2 mM → gradiente masivo entrada" }
        ]
      },
      {
        titulo: "⚙️ Bomba Na⁺/K⁺-ATPasa",
        tipo: "lista",
        items: [
          "Estequiometría: 3 Na⁺ out / 2 K⁺ in por ATP hidrolizado (electrogénica, contribuye -5 a -10 mV directamente)",
          "Función dual: mantiene gradientes iónicos + contribución electrogénica al potencial",
          "Inhibición: ouabaína, digitálicos (bloquean bomba → despolarización → excitotoxicidad por acumulación Na⁺ intracelular)",
          "Expresión: isoformas α1 (ubicua), α2 (glía), α3 (neuronas, alta afinidad K⁺)"
        ]
      },
      {
        titulo: "🧮 Ecuación de Nernst y Potencial de Equilibrio",
        tipo: "tabla",
        datos: [
          { label: "Ecuación Nernst", value: "E_ion = (RT/zF) × ln([ion]_out/[ion]_in); a 37°C: E = 61.5/z × log([out]/[in])" },
          { label: "E_K (potasio)", value: "~-90 mV (fuerza impulsora salida K⁺ en reposo es pequeña)" },
          { label: "E_Na (sodio)", value: "~+60 mV (fuerza impulsora masiva entrada Na⁺)" },
          { label: "E_Cl (cloruro)", value: "~-65 mV (varía según transportadores Cl⁻, KCC2 madura neurona)" }
        ]
      },
      {
        titulo: "📐 Ecuación de Goldman-Hodgkin-Katz (GHK)",
        tipo: "lista",
        items: [
          "Considera permeabilidad de múltiples iones: V_m = (RT/F) × ln[(P_K[K⁺]_out + P_Na[Na⁺]_out + P_Cl[Cl⁻]_in) / (P_K[K⁺]_in + P_Na[Na⁺]_in + P_Cl[Cl⁻]_out)]",
          "En reposo: P_K >> P_Na (relación ~25:1), por lo que V_m ≈ E_K",
          "Predicción precisa: -70 mV considerando permeabilidades relativas K⁺:Na⁺:Cl⁻ = 1:0.04:0.45",
          "Durante PA: P_Na aumenta 500-5000× → V_m se acerca a E_Na (~+60 mV)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Hiperpotasemia (K⁺ >5.5 mM): despolarización membrana → arritmias cardíacas potencialmente letales (fibrilación ventricular), debilidad muscular",
          "Hipopotasemia (K⁺ <3.5 mM): hiperpolarización → parálisis periódica hipopotasémica, rabdomiólisis",
          "Intoxicación digitálicos: inhibición bomba Na⁺/K⁺ → arritmias, náuseas, confusión, visión amarilla (xantopsia)",
          "Esclerosis múltiple: desmielinización altera distribución canales, compromete potencial reposo y conducción"
        ]
      }
    ]
  },
  {
    id: "potencial-accion",
    nombre: "Potencial de Acción",
    subtitulo: "Señal eléctrica todo-o-nada en neuronas",
    icono: "⚡",
    categorias: ["fundamentos", "electrofisiologia"],
    secciones: [
      {
        titulo: "📊 Características Generales",
        tipo: "lista",
        items: [
          "Fenómeno todo-o-nada: umbral típico -55 mV; estímulos subumbrales no generan PA completo",
          "Duración: 1-2 ms en neuronas mamíferas (más corto que músculo cardíaco ~200-400 ms)",
          "Amplitud constante: ~100 mV (de -70 a +30/+40 mV), independiente de intensidad estímulo supra-umbral",
          "No decremental: se propaga sin pérdida de amplitud (regenerativo)"
        ]
      },
      {
        titulo: "⚙️ Fases del Potencial de Acción",
        tipo: "tabla",
        datos: [
          { label: "1. Despolarización umbral", value: "Estímulo alcanza -55 mV → apertura canales Nav1 voltaje-dependientes (activación ~0.5 ms)" },
          { label: "2. Fase ascendente (despolarización rápida)", value: "Entrada masiva Na⁺ (P_Na ↑↑↑) → +30/+40 mV; velocidad ~500 V/s" },
          { label: "3. Pico (overshoot)", value: "V_m se acerca a E_Na (+60 mV); inactivación rápida Nav1 (~1 ms)" },
          { label: "4. Repolarización", value: "Apertura canales Kv (K⁺ voltaje-dependientes) + cierre Nav1 → salida K⁺ → retorno a -70 mV" },
          { label: "5. Hiperpolarización transitoria (undershoot)", value: "Canales Kv cierran lentamente → V_m transitoriamente más negativo que reposo (-75 a -80 mV)" }
        ]
      },
      {
        titulo: "🔬 Canales de Sodio Voltaje-Dependientes (Nav)",
        tipo: "lista",
        items: [
          "Estructura: 4 dominios transmembrana (I-IV), cada uno con 6 segmentos (S1-S6); sensor voltaje en S4 (cargas +)",
          "Estados: cerrado (reposo) → abierto (activación, <1 ms) → inactivado (compuerta h, partícula 'bola y cadena')",
          "Subtipos neuronales: Nav1.1, Nav1.2, Nav1.3 (SNC); Nav1.6 (nódulos Ranvier); Nav1.7, Nav1.8, Nav1.9 (nociceptores)",
          "Farmacología: TTX (tetrodotoxina) bloquea Nav1.1-1.7 (nM); anestésicos locales (lidocaína, bupivacaína) bloquean estado inactivado"
        ]
      },
      {
        titulo: "🔋 Canales de Potasio Voltaje-Dependientes (Kv)",
        tipo: "tabla",
        datos: [
          { label: "Kv1 (Shaker)", value: "Activación rápida, inactivación lenta; axones, terminales sinápticas; bloqueado por 4-AP, dendrotoxina" },
          { label: "Kv2 (Shab)", value: "Activación lenta; somas neuronales; principal corriente repolarización (I_K delayed rectifier)" },
          { label: "Kv3 (Shaw)", value: "Activación/desactivación ultra-rápida; interneuronas GABAérgicas de alta frecuencia (>200 Hz)" },
          { label: "Kv4 (Shal)", value: "Inactivación rápida; corriente A transitoria (I_A); regula excitabilidad, intervalo interespiga" }
        ]
      },
      {
        titulo: "⏱️ Períodos Refractarios",
        tipo: "lista",
        items: [
          "PERÍODO REFRACTARIO ABSOLUTO (PRA): 1-2 ms, imposible generar nuevo PA (canales Nav inactivados, no pueden reabrirse)",
          "PERÍODO REFRACTARIO RELATIVO (PRR): 2-4 ms adicionales, PA posible solo con estímulo supra-umbral intenso",
          "Función PRA: asegura conducción unidireccional del PA, limita frecuencia máxima descarga (~500-1000 Hz teórica, típica <200 Hz)",
          "Modulación: temperatura ↑ → refractariedad ↓ (cinética canales más rápida); hipoxia → refractariedad ↑"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Epilepsia: mutaciones Nav1.1 (SCN1A) → convulsiones febriles, síndrome Dravet (pérdida función en interneuronas GABAérgicas)",
          "Eritromelalgia: mutación ganancia-función Nav1.7 (SCN9A) → dolor quemante extremidades, despolarización espontánea nociceptores",
          "Insensibilidad congénita al dolor: mutación pérdida-función Nav1.7 → incapacidad sentir dolor (casos raros, gen SCN9A)",
          "Intoxicación tetrodotoxina (pez globo): bloqueo Nav → parálisis flácida ascendente, muerte por insuficiencia respiratoria (sin antídoto específico)"
        ]
      }
    ]
  },
  {
    id: "propagacion-impulso",
    nombre: "Propagación del Impulso Nervioso",
    subtitulo: "Conducción del potencial de acción a lo largo del axón",
    icono: "🚀",
    categorias: ["conduccion", "mielinizacion"],
    secciones: [
      {
        titulo: "🔄 Conducción Continua (Axones Amielínicos)",
        tipo: "lista",
        items: [
          "Mecanismo: PA en un punto despolariza zona adyacente por corrientes locales → apertura Nav → nuevo PA",
          "Velocidad: 0.5-2 m/s en fibras C (dolor lento, temperatura) de diámetro pequeño (~0.2-1.5 μm)",
          "Unidireccionalidad: zona recién despolarizada está refractaria (canales Nav inactivados) → solo propagación anterógrada",
          "Eficiencia energética baja: se regenera PA en cada segmento membrana → alto costo ATP (bomba Na⁺/K⁺)"
        ]
      },
      {
        titulo: "⚡ Conducción Saltatoria (Axones Mielínicos)",
        tipo: "tabla",
        datos: [
          { label: "Mielinización", value: "Oligodendrocitos (SNC), células Schwann (SNP) envuelven axón en múltiples capas membrana (↓ capacitancia, ↑ resistencia)" },
          { label: "Nódulos de Ranvier", value: "Gaps sin mielina (~1 μm) cada 0.2-2 mm; alta densidad Nav1.6 (~1000-2000/μm²)" },
          { label: "Internodo", value: "Segmento mielinizado; canales iónicos escasos, corriente fluye pasivamente (como cable)" },
          { label: "Velocidad", value: "6-120 m/s según diámetro (fibras Aα motoras ~120 m/s, diámetro 13-20 μm)" }
        ]
      },
      {
        titulo: "📐 Factores que Afectan la Velocidad de Conducción",
        tipo: "lista",
        items: [
          "DIÁMETRO AXONAL: velocidad ∝ √diámetro (axones amielínicos), velocidad ∝ diámetro (mielínicos); ley cable λ = √(r_m/r_i)",
          "MIELINIZACIÓN: ↑ resistencia membrana, ↓ capacitancia → constante tiempo ↓, constante espacio ↑ → conducción saltatoria más rápida",
          "TEMPERATURA: ↑ temperatura → ↑ velocidad (Q10 ~1.8-2.0); hipotermia ralentiza conducción (anestesia local + frío potencia bloqueo)",
          "DISTANCIA INTERNODAL: óptima ~100× diámetro axón; muy corta o larga → ↓ velocidad (compromiso entre resistencia axoplasma y capacitancia)"
        ]
      },
      {
        titulo: "🧬 Composición Molecular del Nódulo de Ranvier",
        tipo: "tabla",
        datos: [
          { label: "Nav1.6 (canales Na⁺)", value: "Isoforma principal nódulo; genera PA; mutaciones → ataxia cerebelosa, epilepsia" },
          { label: "KCNQ2/KCNQ3 (Kv7)", value: "Corriente M (I_M); estabiliza potencial reposo, previene hiperexcitabilidad; mutaciones → epilepsia neonatal benigna familiar" },
          { label: "Neurofascina-186", value: "Molécula adhesión; ancla Nav a nódulo; autoanticuerpos → neuropatía desmielinizante" },
          { label: "Ankirin-G", value: "Proteína scaffold; organiza complejos canales; esencial clustering Nav en nódulo" }
        ]
      },
      {
        titulo: "🔬 Clasificación de Fibras Nerviosas",
        tipo: "tabla",
        datos: [
          { label: "Aα (13-20 μm)", value: "Motoneuronas, propioceptores; 80-120 m/s; mielinizadas" },
          { label: "Aβ (6-12 μm)", value: "Mecanorreceptores tacto; 35-75 m/s; mielinizadas" },
          { label: "Aδ (1-5 μm)", value: "Dolor rápido/agudo, temperatura; 5-30 m/s; mielinizadas finas" },
          { label: "C (0.2-1.5 μm)", value: "Dolor lento/sordo, temperatura, fibras autónomas; 0.5-2 m/s; amielínicas" }
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Esclerosis múltiple: desmielinización autoinmune SNC → conducción lenta/bloqueada → debilidad, alteraciones visuales (neuritis óptica), ataxia",
          "Síndrome Guillain-Barré: desmielinización autoinmune SNP (mimetismo molecular post-infección) → parálisis flácida ascendente, arreflexia",
          "Neuropatía diabética: desmielinización segmentaria + daño axonal → parestesias, dolor neuropático distal (mononeuropatía, polineuropatía)",
          "Leucodistrofias: defectos genéticos mielina (Pelizaeus-Merzbacher, adrenoleucodistrofia) → retraso desarrollo, espasticidad, ataxia progresiva"
        ]
      }
    ]
  },
  {
    id: "sinapsis-quimica",
    nombre: "Sinapsis Química",
    subtitulo: "Transmisión sináptica mediante neurotransmisores",
    icono: "🧪",
    categorias: ["sinapsis", "neurotransmision"],
    secciones: [
      {
        titulo: "🔬 Anatomía de la Sinapsis Química",
        tipo: "lista",
        items: [
          "Terminal presináptico: contiene vesículas sinápticas (40-50 nm) con neurotransmisor, zona activa con canales Cav2.1/2.2 (P/Q, N-type)",
          "Hendidura sináptica: espacio 20-40 nm; contiene matriz extracelular, enzimas degradación neurotransmisores",
          "Membrana postsináptica: receptores ionotrópicos (canales iónicos ligando-dependientes) y metabotrópicos (GPCRs)",
          "Elementos de soporte: astrocitos envuelven sinapsis (tripartita), recapturan glutamato, modulan transmisión"
        ]
      },
      {
        titulo: "⚙️ Proceso de Neurotransmisión (Secuencia Temporal)",
        tipo: "tabla",
        datos: [
          { label: "1. Llegada PA (t=0)", value: "PA alcanza terminal → despolarización membrana presináptica" },
          { label: "2. Apertura Cav (t=0.1-0.2 ms)", value: "Despolarización abre Cav2.1/2.2 → entrada Ca²⁺ (10-100 μM local en zona activa)" },
          { label: "3. Exocitosis (t=0.2-0.5 ms)", value: "Ca²⁺ se une a sinaptotagmina → fusión vesícula con membrana (complejo SNARE: sintaxina, SNAP-25, sinaptobrevina)" },
          { label: "4. Difusión (t=0.5-1 ms)", value: "Neurotransmisor cruza hendidura (~100 μs), se une a receptores postsinápticos" },
          { label: "5. Respuesta postsináptica (t=1-5 ms)", value: "Apertura canales iónicos (ionotrópicos) o activación segundos mensajeros (metabotrópicos)" }
        ]
      },
      {
        titulo: "🧬 Complejo SNARE y Maquinaria Exocitosis",
        tipo: "lista",
        items: [
          "v-SNARE (vesicular): sinaptobrevina/VAMP en vesícula sináptica",
          "t-SNAREs (target): sintaxina-1 + SNAP-25 en membrana plasmática presináptica",
          "Sinaptotagmina-1: sensor Ca²⁺ (dominios C2A, C2B); une 5 Ca²⁺ → cambio conformacional → fusión membrana en <1 ms",
          "Complexina: clamp molecular; previene fusión espontánea, relajado por Ca²⁺-sinaptotagmina"
        ]
      },
      {
        titulo: "🔄 Reciclaje de Vesículas Sinápticas",
        tipo: "tabla",
        datos: [
          { label: "Kiss-and-run", value: "Fusión transitoria, poro <1 nm, liberación parcial; rápido (~1 s), en sinapsis alta frecuencia" },
          { label: "Endocitosis mediada clatrina", value: "Recuperación vesícula completa, dinamina corta cuello; lento (~20 s), vía clásica" },
          { label: "Endocitosis masiva", value: "Actividad intensa → internalización grandes porciones membrana → formación vesículas" },
          { label: "Reacidificación y recarga", value: "V-ATPasa acidifica vesícula (pH ~5.5), transportadores específicos recargan neurotransmisor" }
        ]
      },
      {
        titulo: "📊 Tipos de Liberación de Neurotransmisor",
        tipo: "lista",
        items: [
          "CUANTAL: vesícula = quantum (~5000-10000 moléculas); PA libera 1-300 vesículas según sinapsis",
          "ESPONTÁNEA: fusión aleatoria vesículas (~1/min) sin PA → miniature EPSPs (mEPSPs, ~0.5 mV); mantiene tono basal",
          "ASÍNCRONA: liberación residual Ca²⁺ después de tren PAs → facilita transmisión sostenida",
          "POTENCIACIÓN: estimulación repetida → ↑ liberación (facilitación, aumento, potenciación post-tetánica)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Miastenia gravis: autoanticuerpos vs receptor nicotínico ACh (AChR) → bloqueo unión neuromuscular → debilidad muscular fatigable, ptosis, diplopía",
          "Síndrome Lambert-Eaton: autoanticuerpos vs canales Cav2.1 (P/Q) presinápticos → ↓ liberación ACh → debilidad proximal (mejora con ejercicio, paraneoplásico)",
          "Botulismo: toxina botulínica escinde SNAP-25/sinaptobrevina → bloqueo liberación ACh → parálisis flácida descendente, insuficiencia respiratoria",
          "Tetanos: toxina tetánica bloquea liberación GABA/glicina (interneuronas inhibitorias) → espasmos musculares, rigidez, trismus, opistótonos"
        ]
      }
    ]
  },
  {
    id: "neurotransmisores",
    nombre: "Neurotransmisores Principales",
    subtitulo: "Mensajeros químicos de la neurotransmisión",
    icono: "💊",
    categorias: ["neurotransmision"],
    secciones: [
      {
        titulo: "⚡ Glutamato (Excitatorio Principal SNC)",
        tipo: "tabla",
        datos: [
          { label: "Síntesis", value: "Glutamina (astrocitos) → glutamato (neurona, glutaminasa); o α-cetoglutarato + aminoácidos (transaminación)" },
          { label: "Receptores ionotrópicos", value: "AMPA (rápido, Na⁺/K⁺), NMDA (lento, Ca²⁺/Na⁺/K⁺, bloqueado Mg²⁺ voltaje-dependiente), Kainato" },
          { label: "Receptores metabotrópicos", value: "mGluR1-8 (GPCRs); Grupo I (Gq, excitatorio), Grupo II/III (Gi, inhibitorio)" },
          { label: "Terminación", value: "Recaptación por EAAT1-5 (neurona, astrocito); conversión glutamina (glutamina sintetasa astrocítica)" }
        ]
      },
      {
        titulo: "🔵 GABA (Inhibitorio Principal SNC)",
        tipo: "tabla",
        datos: [
          { label: "Síntesis", value: "Glutamato → GABA (ácido glutámico descarboxilasa, GAD65/67; cofactor piridoxal fosfato/B6)" },
          { label: "GABAA (ionotrópico)", value: "Canal Cl⁻ (pentámero 2α2βγ típico); hiperpolarización/shunt; modulado por benzodiacepinas (sitio α-γ), barbitúricos, etanol" },
          { label: "GABAB (metabotrópico)", value: "GPCR Gi/o; activa canales GIRK (K⁺ out), inhibe Cav; baclofen (agonista); espasticidad, adicción" },
          { label: "Terminación", value: "Recaptación GAT-1 a GAT-4 (neurona, glía); catabolismo por GABA transaminasa (GABA-T) → succinato semialdhído" }
        ]
      },
      {
        titulo: "🧠 Acetilcolina (ACh)",
        tipo: "lista",
        items: [
          "SÍNTESIS: Colina + Acetil-CoA → ACh (colina acetiltransferasa, ChAT); colina recaptada por CHT1 (alta afinidad)",
          "RECEPTORES NICOTÍNICOS: ionotrópicos, canales catiónicos no selectivos (Na⁺/K⁺/Ca²⁺); unión neuromuscular, ganglios autónomos, SNC (α4β2, α7)",
          "RECEPTORES MUSCARÍNICOS: M1-M5 GPCRs; M1/M3/M5 (Gq, excitatorio), M2/M4 (Gi, inhibitorio); corazón, músculo liso, glándulas",
          "TERMINACIÓN: acetilcolinesterasa (AChE) en hendidura → acetato + colina (<1 ms); inhibidores AChE (donepezilo, rivastigmina) en Alzheimer"
        ]
      },
      {
        titulo: "💙 Monoaminas (Dopamina, Noradrenalina, Serotonina)",
        tipo: "tabla",
        datos: [
          { label: "Dopamina (DA)", value: "Tirosina → L-DOPA (tirosina hidroxilasa) → DA (DOPA descarboxilasa); receptores D1-D5 (GPCRs); vías: nigroestriatal, mesolímbica, mesocortical, tuberoinfundibular" },
          { label: "Noradrenalina (NA)", value: "DA → NA (dopamina β-hidroxilasa); receptores α1, α2, β1, β2, β3 (GPCRs); locus coeruleus → arousal, atención" },
          { label: "Serotonina (5-HT)", value: "Triptófano → 5-HTP (triptófano hidroxilasa) → 5-HT (descarboxilasa); 5-HT1-7 (mayoría GPCRs, 5-HT3 ionotrópico); núcleos del rafe → estado ánimo, sueño" },
          { label: "Terminación", value: "Recaptación: DAT, NET, SERT (bloqueados por cocaína, antidepresivos); catabolismo: MAO-A/B (mitocondrias) → aldehídos, COMT → metabolitos metilados" }
        ]
      },
      {
        titulo: "🧩 Neuropéptidos y Otros",
        tipo: "lista",
        items: [
          "PÉPTIDOS OPIOIDES: endorfinas, encefalinas, dinorfinas; receptores μ, δ, κ (GPCRs Gi); analgesia, recompensa; antagonista naloxona",
          "SUSTANCIA P: neuropéptido 11 aminoácidos; receptor NK1 (Gq); transmisión dolor (neuronas C aferentes primarias); aprepitant (antagonista, antiemético)",
          "NEUROPÉPTIDO Y: co-liberado con NA; receptor Y1-Y5; regula ingesta, ansiedad, vasoconstricción",
          "ÓXIDO NÍTRICO (NO): gas, neurotransmisor retrógrado; sintetizado por nNOS (Ca²⁺-calmodulina dependiente); activa guanilato ciclasa → cGMP; difusión ~1 μm, vida media ~5 s"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Enfermedad Parkinson: degeneración neuronas dopaminérgicas sustancia nigra → rigidez, bradicinesia, temblor; tratamiento: L-DOPA, agonistas DA",
          "Esquizofrenia: hipótesis dopaminérgica (↑ DA mesolímbica → síntomas positivos); antipsicóticos bloquean D2",
          "Depresión: hipótesis monoaminérgica (↓ 5-HT, NA); ISRS (fluoxetina, sertralina) bloquean SERT; IRSN (venlafaxina) bloquean SERT + NET",
          "Excitotoxicidad glutamatérgica: isquemia/trauma → liberación masiva glutamato → activación NMDA → sobrecarga Ca²⁺ → muerte neuronal (ACV, TEC)"
        ]
      }
    ]
  },
  {
    id: "receptores-postsinapticos",
    nombre: "Receptores Postsinápticos",
    subtitulo: "Transducción de señal química a eléctrica/bioquímica",
    icono: "📡",
    categorias: ["sinapsis", "neurotransmision"],
    secciones: [
      {
        titulo: "⚡ Receptores Ionotrópicos (Canales Ligando-Dependientes)",
        tipo: "lista",
        items: [
          "Estructura: multi-subunidades (pentámeros típicos en Cys-loop: nAChR, GABAA, Gly; tetrámeros en iGluR)",
          "Cinética rápida: apertura en μs-ms, conducción iónica inmediata → potenciales postsinápticos rápidos (EPSPs, IPSPs)",
          "Familias principales: Cys-loop (nAChR, GABAA, 5-HT3, GlyR), iGluR (AMPA, NMDA, Kainato), P2X (ATP)",
          "Amplificación baja: 1 neurotransmisor → 1 canal abierto → ~10⁴-10⁵ iones/ms"
        ]
      },
      {
        titulo: "🔬 Receptor NMDA: Propiedades Especiales",
        tipo: "tabla",
        datos: [
          { label: "Doble dependencia", value: "Requiere glutamato + despolarización (quitar bloqueo Mg²⁺ voltaje-dependiente ~-40 mV)" },
          { label: "Permeabilidad Ca²⁺", value: "Alta permeabilidad Ca²⁺ (vs AMPA); Ca²⁺ intracelular → cascadas señalización, plasticidad sináptica" },
          { label: "Co-agonista glicina", value: "Sitio glicina (GluN1) debe ocuparse (glicina/D-serina) para activación completa" },
          { label: "Plasticidad", value: "Base molecular LTP/LTD (potenciación/depresión largo plazo); aprendizaje, memoria" }
        ]
      },
      {
        titulo: "🧬 Receptores Metabotrópicos (GPCRs)",
        tipo: "lista",
        items: [
          "Estructura: 7 dominios transmembrana, acoplados proteínas G (Gs, Gi/o, Gq)",
          "Cinética lenta: activación segundos mensajeros (cAMP, IP3/DAG, Ca²⁺) → respuestas de ms-min",
          "Amplificación alta: 1 neurotransmisor → 1 GPCR activado → 10-100 proteínas G → miles moléculas 2º mensajero",
          "Efectos: modulación canales iónicos (GIRK, Cav), modificación proteínas (PKA, PKC), transcripción génica (CREB)"
        ]
      },
      {
        titulo: "📊 Comparación Ionotrópicos vs Metabotrópicos",
        tipo: "tabla",
        datos: [
          { label: "Velocidad respuesta", value: "Ionotrópicos: μs-ms (rápida); Metabotrópicos: ms-min (lenta-sostenida)" },
          { label: "Amplificación", value: "Ionotrópicos: baja (directa); Metabotrópicos: alta (cascada 2º mensajeros)" },
          { label: "Función fisiológica", value: "Ionotrópicos: transmisión punto-a-punto rápida; Metabotrópicos: modulación, plasticidad" },
          { label: "Ejemplos", value: "Ionotrópicos: AMPA, GABAA, nAChR; Metabotrópicos: mGluR, GABAB, mAChR, todos monoaminas" }
        ]
      },
      {
        titulo: "🔄 Desensibilización y Regulación",
        tipo: "lista",
        items: [
          "DESENSIBILIZACIÓN: exposición prolongada agonista → receptor entra estado no-conductor (inactivación); protección vs sobreestimulación",
          "DOWN-REGULATION: estimulación crónica → endocitosis/degradación receptores → ↓ densidad superficial (tolerancia)",
          "UP-REGULATION: denervación/bloqueo crónico → ↑ expresión receptores (hipersensibilidad por denervación)",
          "FOSFORILACIÓN: PKA, PKC, CaMKII fosforilan receptores → modulan sensibilidad, tráfico (ej: fosforilación GluA1 en LTP)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Encefalitis anti-NMDAR: autoanticuerpos vs GluN1 → psicosis, convulsiones, discinesias, hipoventilación (paraneoplásico, teratoma ovárico)",
          "Hiperplexia (startle disease): mutaciones GlyR α1 → hiperexcitabilidad espinal → rigidez, respuesta exagerada sobresalto (startle)",
          "Epilepsia autoinmune: anticuerpos vs LGI1, CASPR2, AMPAR → convulsiones refractarias, amnesia, confusión",
          "Síndrome neuroléptico maligno: bloqueo excesivo D2 (antipsicóticos) → rigidez, hipertermia, rabdomiólisis, disautonomía (emergencia médica)"
        ]
      }
    ]
  },
  {
    id: "integracion-sinaptica",
    nombre: "Integración Sináptica",
    subtitulo: "Procesamiento de señales en la neurona postsináptica",
    icono: "🧮",
    categorias: ["sinapsis"],
    secciones: [
      {
        titulo: "📊 Potenciales Postsinápticos",
        tipo: "tabla",
        datos: [
          { label: "EPSP (excitatorio)", value: "Despolarización (~0.5-2 mV por sinapsis); apertura canales catiónicos (AMPA, nAChR); acerca V_m al umbral" },
          { label: "IPSP (inhibitorio)", value: "Hiperpolarización (~0.5-1 mV); apertura canales Cl⁻ (GABAA, GlyR) o K⁺ (GABAB vía GIRK); aleja V_m del umbral" },
          { label: "Shunting inhibition", value: "GABAA cerca soma → ↑ conductancia Cl⁻ sin hiperpolarización grande → cortocircuita EPSPs distales (↓ resistencia entrada)" },
          { label: "Decaimiento", value: "EPSPs/IPSPs decaen exponencialmente (~10-20 ms constante tiempo); propagación pasiva hacia soma con atenuación" }
        ]
      },
      {
        titulo: "🔄 Sumación Espacial",
        tipo: "lista",
        items: [
          "Múltiples sinapsis activas simultáneamente → EPSPs/IPSPs se suman algebraicamente en soma",
          "Sinapsis proximales (soma) tienen mayor peso que distales (dendritas lejanas, atenuación por constante espacio λ)",
          "Geometría dendrítica importa: dendritas pasivas (cable lineal) vs activas (espinas con canales voltaje-dependientes)",
          "Inhibición estratégica: IPSP en dendrita proximal puede vetar EPSPs distales múltiples (veto sináptico)"
        ]
      },
      {
        titulo: "⏱️ Sumación Temporal",
        tipo: "lista",
        items: [
          "Sinapsis única activada repetidamente en ventana <20 ms → EPSPs se superponen antes de decaer",
          "Frecuencia crítica: ~50 Hz mínimo para sumación efectiva en muchas neuronas",
          "Facilitación sináptica: segunda EPSP mayor que primera en tren (↑ [Ca²⁺] residual presináptico → ↑ probabilidad liberación)",
          "Depresión sináptica: depleción vesículas en actividad sostenida → EPSPs progresivamente menores"
        ]
      },
      {
        titulo: "🧠 Integración en el Cono Axónico (Zona de Disparo)",
        tipo: "tabla",
        datos: [
          { label: "Localización", value: "Segmento inicial axón (15-40 μm desde soma); densidad Nav ~50× mayor que soma" },
          { label: "Umbral más bajo", value: "Umbral -55 mV (vs -50 mV en soma) por alta densidad Nav → sitio integración final" },
          { label: "Decisión todo-o-nada", value: "Si V_m ≥ umbral → PA; si V_m < umbral → subumbral (no PA); frecuencia PA ∝ intensidad despolarización" },
          { label: "Propagación", value: "PA iniciado aquí se propaga anterógradamente (axón) y retrógradamente (soma, dendritas: backpropagating AP)" }
        ]
      },
      {
        titulo: "🌳 Computación Dendrítica",
        tipo: "lista",
        items: [
          "Dendritas NO son pasivas: contienen Nav, Cav, NMDA → pueden generar espículas dendríticas (dendritic spikes)",
          "Espículas Ca²⁺ (NMDA, Cav): amplificación local señales, aprendizaje Hebbiano (coincidence detection)",
          "Espículas Na⁺: dendritas apicales neuronas piramidales pueden generar PA dendríticos independientes",
          "Espinas dendríticas: protuberancias (0.5-2 μm) con 1-2 sinapsis; aíslan señales Ca²⁺ → plasticidad específica-sinapsis"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Epilepsia: hiperexcitabilidad por desbalance E/I (excitatorio/inhibitorio) → sincronización patológica → convulsiones; fármacos ↑ GABA o ↓ glutamato",
          "Enfermedad Huntington: degeneración espinas dendríticas neuronas espinosas medianas → déficit integración GABAérgica → corea",
          "Autismo: hipótesis E/I dysbalance → defectos integración sensorial, social; variantes GABAérgicas/glutamatérgicas implicadas",
          "Esquizofrenia: disfunción dendritas corticales (↓ espinas en capa III corteza prefrontal) → déficit integración, síntomas negativos"
        ]
      }
    ]
  },
  {
    id: "sinapsis-electrica",
    nombre: "Sinapsis Eléctrica (Uniones Gap)",
    subtitulo: "Acoplamiento eléctrico directo entre neuronas",
    icono: "🔌",
    categorias: ["sinapsis"],
    secciones: [
      {
        titulo: "🔬 Estructura de Uniones Gap",
        tipo: "lista",
        items: [
          "Canales intercelulares (connexones/hemicanales) alinean entre 2 células → poro continuo citoplasma-citoplasma",
          "Connexina: proteína 4 dominios transmembrana; 6 connexinas = 1 connexón (hexámero); 2 connexones = 1 canal gap",
          "Permeabilidad: iones (Na⁺, K⁺, Ca²⁺, Cl⁻), segundos mensajeros pequeños (IP3, cAMP, <1 kDa)",
          "Resistencia baja: ~100 MΩ por canal (vs GΩ membrana); bidireccional, simétrico"
        ]
      },
      {
        titulo: "⚡ Propiedades Funcionales",
        tipo: "tabla",
        datos: [
          { label: "Transmisión rápida", value: "Sin retraso sináptico (~0.1 ms vs 0.5-1 ms química); flujo iónico directo" },
          { label: "Bidireccional", value: "Corriente fluye en ambas direcciones (no como sinapsis química unidireccional)" },
          { label: "Sincronización", value: "Acopla neuronas → descarga sincrónica (oscilaciones gamma 30-80 Hz, ritmos cerebrales)" },
          { label: "Rectificación", value: "Algunas uniones rectifican (conducción asimétrica) por composición connexina diferencial" }
        ]
      },
      {
        titulo: "🧠 Distribución en el Sistema Nervioso",
        tipo: "lista",
        items: [
          "SNC: interneuronas GABAérgicas (corteza, hipocampo), neuronas retina, oliva inferior, núcleo trigeminal motor",
          "SNP: células ganglionares retina, células ciliadas auditivas (sincronización detección señal)",
          "Glía: astrocitos extensamente acoplados (sincicio funcional) → homeostasis K⁺, distribución glucosa, ondas Ca²⁺",
          "Desarrollo: abundantes en cerebro embrionario, disminuyen con maduración (↑ sinapsis químicas)"
        ]
      },
      {
        titulo: "📊 Ventajas vs Sinapsis Química",
        tipo: "tabla",
        datos: [
          { label: "Velocidad", value: "Eléctrica más rápida (sin retraso exocitosis/difusión/receptor)" },
          { label: "Gasto energético", value: "Eléctrica más eficiente (no requiere síntesis/empaquetado neurotransmisor)" },
          { label: "Sincronización", value: "Eléctrica superior para oscilaciones rápidas coherentes (gamma, ripples)" },
          { label: "Plasticidad", value: "Química permite modulación compleja (LTP/LTD, facilitación, depresión)" }
        ]
      },
      {
        titulo: "⚖️ Regulación de Uniones Gap",
        tipo: "lista",
        items: [
          "pH intracelular: acidificación (pH <6.5) → cierre reversible (protección isquemia, despolarización)",
          "Ca²⁺ intracelular: ↑ [Ca²⁺]i → cierre (calmodulina-dependiente en algunas connexinas)",
          "Fosforilación: PKA, PKC, MAPK fosforilan connexinas → modulan conductancia, tráfico",
          "Dopamina, serotonina: modulan acoplamiento gap en retina, estriado (vía GPCRs → 2º mensajeros)"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Mutaciones connexina-26 (GJB2): sordera neurosensorial hereditaria más común (células sustentáculo cóclea requieren reciclaje K⁺)",
          "Mutaciones connexina-32 (GJB1): enfermedad Charcot-Marie-Tooth ligada-X (neuropatía desmielinizante, células Schwann)",
          "Epilepsia: sincronización patológica vía uniones gap → propagación actividad ictal; carbenoxolona (bloqueador gap) experimental",
          "Isquemia cerebral: cierre uniones gap astrocitarias protege tejido adyacente (previene propagación edema, muerte)"
        ]
      }
    ]
  },
  {
    id: "plasticidad-sinaptica",
    nombre: "Plasticidad Sináptica",
    subtitulo: "Modificación actividad-dependiente de sinapsis",
    icono: "🧬",
    categorias: ["sinapsis", "neurotransmision"],
    secciones: [
      {
        titulo: "🔬 Potenciación a Largo Plazo (LTP)",
        tipo: "lista",
        items: [
          "Definición: aumento duradero (horas-días) en eficacia sináptica tras estimulación breve alta frecuencia (100 Hz, 1 s)",
          "LTP temprana (E-LTP): <1-3 h; fosforilación receptores (GluA1 por CaMKII/PKA), inserción AMPAR en membrana",
          "LTP tardía (L-LTP): >3 h; requiere síntesis proteica (CREB → genes plasticidad: Arc, BDNF, GluA1), crecimiento espinas",
          "Inducción: entrada Ca²⁺ por NMDAR → activación CaMKII (autofosforilación T286 → persistencia) → fosforilación GluA1 (S831, S845)"
        ]
      },
      {
        titulo: "📉 Depresión a Largo Plazo (LTD)",
        tipo: "tabla",
        datos: [
          { label: "Inducción", value: "Estimulación baja frecuencia prolongada (1-5 Hz, 10-15 min) o activación mGluR" },
          { label: "Mecanismo", value: "↑ Ca²⁺ moderado → calcineurina (fosfatasa) → desfosforilación GluA1/2 → endocitosis AMPAR" },
          { label: "Funciones", value: "Debilitamiento sináptico, refinamiento circuitos, olvido homeostático (previene saturación)" },
          { label: "Cerebelo", value: "LTD fibras paralelas-célula Purkinje (aprendizaje motor, adaptación vestíbulo-ocular)" }
        ]
      },
      {
        titulo: "🧠 Postulado de Hebb",
        tipo: "lista",
        items: [
          "\"Células que disparan juntas, se conectan juntas\" (cells that fire together, wire together)",
          "Actividad correlacionada pre-post → fortalecimiento sináptico (LTP); actividad no correlacionada → debilitamiento (LTD)",
          "Base celular aprendizaje asociativo (condicionamiento clásico, memoria declarativa)",
          "STDP (Spike-Timing Dependent Plasticity): timing preciso pre-post importa; pre antes post (+20 ms) → LTP; post antes pre → LTD"
        ]
      },
      {
        titulo: "⚖️ Plasticidad Homeostática",
        tipo: "tabla",
        datos: [
          { label: "Scaling sináptico", value: "Actividad crónica alta → downscaling (↓ todas sinapsis proporcionalmente); baja → upscaling (↑)" },
          { label: "Mecanismo", value: "TNF-α (astrocitos) regula tráfico AMPAR; Arc (activity-regulated cytoskeleton protein) endocita AMPAR" },
          { label: "Función", value: "Estabiliza rango dinámico neurona, previene saturación (LTP excesiva) o silenciamiento (LTD excesiva)" },
          { label: "Tiempo", value: "Horas-días (más lento que LTP/LTD Hebbiana)" }
        ]
      },
      {
        titulo: "🌱 Plasticidad Estructural",
        tipo: "lista",
        items: [
          "Espinas dendríticas: formación nuevas (spinogenesis), eliminación (spine pruning), cambio morfología (thin → mushroom)",
          "Reorganización circuitos: aprendizaje motor → expansión mapas corticales (plasticidad mapa somatosensorial)",
          "Neurogénesis adulta: hipocampo (giro dentado), zona subventricular → integración nuevas neuronas en circuitos",
          "Factores tróficos: BDNF (brain-derived neurotrophic factor) → sobrevivencia neuronal, crecimiento axón/dendrita, LTP"
        ]
      },
      {
        titulo: "🩺 Correlación Clínica",
        tipo: "clinica",
        items: [
          "Enfermedad Alzheimer: oligómeros Aβ bloquean LTP, facilitan LTD → pérdida sinapsis, déficit memoria (hipocampo, corteza)",
          "Adicción: ↑ LTP vía dopamina en núcleo accumbens → fortalecimiento asociaciones droga-contexto (memoria adictiva)",
          "PTSD (estrés postraumático): LTP exagerada amígdala → consolidación excesiva memorias traumáticas, miedo condicionado",
          "Autismo (síndrome X frágil): mutación FMRP → LTD mGluR excesiva → poda sináptica anormal, déficit social/cognitivo"
        ]
      }
    ]
  }
];
