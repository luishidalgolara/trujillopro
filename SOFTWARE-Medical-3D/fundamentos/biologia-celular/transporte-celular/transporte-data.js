// ═══════════════════════════════════════════════════════════
// TRANSPORTE-DATA.JS - Base de datos de transporte celular
// Fuente: Alberts et al. (2022), Lodish et al. (2021)
// ═══════════════════════════════════════════════════════════

const TRANSPORTE_DATA = [
  {
    id: "difusion-simple",
    nombre: "Difusión Simple",
    icono: "🌊",
    subtitulo: "Movimiento pasivo - sin gasto energético",
    categorias: ["pasivo", "membrana"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Principios fundamentales",
        items: [
          "Movimiento neto de moléculas desde alta a baja concentración (a favor de gradiente)",
          "No requiere proteínas transportadoras ni energía metabólica (ATP-independiente)",
          "Obedece Primera Ley de Fick: J = -D(dC/dx), donde J es flujo, D es coeficiente de difusión",
          "Velocidad proporcional al gradiente de concentración y área de superficie",
          "Continúa hasta alcanzar equilibrio termodinámico (∆G = 0)",
          "Proceso estocástico: resultado neto de movimientos aleatorios brownianos"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Permeabilidad de membrana lipídica",
        datos: [
          { label: "Gases no polares (O₂, CO₂, N₂)", value: "P ≈ 10⁻² cm/s (muy alta, atraviesan libremente)" },
          { label: "Moléculas hidrofóbicas (esteroides)", value: "P ≈ 10⁻³ cm/s (alta permeabilidad)" },
          { label: "Agua", value: "P ≈ 10⁻³ cm/s (moderada, mejorada 10-100× por acuaporinas)" },
          { label: "Urea, glicerol", value: "P ≈ 10⁻⁶ cm/s (baja, moléculas pequeñas sin carga)" },
          { label: "Glucosa, aminoácidos", value: "P < 10⁻⁸ cm/s (muy baja, requieren transportadores)" },
          { label: "Iones (Na⁺, K⁺, Ca²⁺, Cl⁻)", value: "P < 10⁻¹² cm/s (prácticamente impermeables)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Factores que determinan permeabilidad",
        items: [
          "Coeficiente de partición lípido/agua: moléculas hidrofóbicas cruzan más rápido (ley de Overton)",
          "Tamaño molecular: permeabilidad inversamente proporcional a radio (ley de Stokes-Einstein)",
          "Polaridad y carga: moléculas polares y cargadas tienen baja permeabilidad",
          "Temperatura: aumenta energía cinética (Q₁₀ ≈ 2-3 para difusión)",
          "Grosor de membrana: mayor distancia reduce tasa de difusión",
          "Composición lipídica: colesterol reduce permeabilidad a moléculas pequeñas"
        ]
      }
    ]
  },

  {
    id: "osmosis",
    nombre: "Ósmosis",
    icono: "💧",
    subtitulo: "Difusión de agua - equilibrio osmótico",
    categorias: ["pasivo", "agua"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Principios osmóticos",
        items: [
          "Difusión neta de agua a través de membrana semipermeable desde baja a alta concentración de solutos",
          "Impulsada por gradiente de potencial químico del agua (actividad del agua)",
          "Presión osmótica (π): presión hidrostática necesaria para detener flujo osmótico",
          "Ecuación de van't Hoff: π = iMRT, donde i=factor van't Hoff, M=molaridad, R=cte gases, T=temperatura",
          "Osmolaridad (mOsm/L): concentración total de partículas osmóticamente activas",
          "Tonicidad: efecto de solución sobre volumen celular (isotónica, hipotónica, hipertónica)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Respuesta celular a estrés osmótico",
        datos: [
          { label: "Solución isotónica", value: "πexterna = πinterna (~290 mOsm/L), volumen celular estable" },
          { label: "Solución hipotónica", value: "πexterna < πinterna, entrada agua → hinchamiento → lisis (sin pared celular)" },
          { label: "Solución hipertónica", value: "πexterna > πinterna, salida agua → encogimiento (crenación eritrocitos)" },
          { label: "Presión de turgencia", value: "Plantas: presión ejercida por citoplasma contra pared celular (hasta 20 atm)" },
          { label: "RVD (Regulatory Volume Decrease)", value: "Mecanismo: expulsión K⁺, Cl⁻, aminoácidos para restaurar volumen" },
          { label: "RVI (Regulatory Volume Increase)", value: "Mecanismo: captación Na⁺, Cl⁻ para recuperar volumen" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación osmótica",
        items: [
          "Acuaporinas (AQPs): canales específicos de agua aumentan permeabilidad 10-100 veces",
          "Osmolitos orgánicos: sorbitol, taurina, betaína acumulados en estrés hiperosmótico (no perturban proteínas)",
          "Transportadores activados por volumen: VRAC (Cl⁻), KCC (K⁺-Cl⁻) median RVD",
          "Señalización osmosensitiva: NFAT5/TonEBP induce genes de osmoprotección",
          "Vasopresina (ADH): regula inserción de AQP2 en túbulo colector renal",
          "Aldosterona: aumenta reabsorción Na⁺ para mantener volumen sanguíneo"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Diabetes insípida: deficiencia ADH o resistencia renal → poliuria hipotónica (hasta 20 L/día)",
          "SIADH (secreción inapropiada ADH): retención agua → hiponatremia dilucional",
          "Terapia de rehidratación oral: Na⁺-glucosa cotransporte aprovecha transporte activo secundario",
          "Edema cerebral: trauma o hiponatremia aguda causa entrada agua → presión intracraneal aumentada",
          "Insuficiencia renal: pérdida capacidad de concentración urinaria causa desequilibrio osmótico"
        ]
      }
    ]
  },

  {
    id: "acuaporinas",
    nombre: "Acuaporinas (AQPs)",
    icono: "🚰",
    subtitulo: "Canales de agua - 13 isoformas en humanos",
    categorias: ["pasivo", "agua", "canales"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura y mecanismo",
        items: [
          "Proteínas integrales con 6 dominios transmembrana formando estructura en reloj de arena",
          "Tetrámero funcional: cada monómero forma poro independiente (~3 Å de diámetro)",
          "Filtro de selectividad: región NPA (Asn-Pro-Ala) conservada en loops B y E",
          "Selectividad para agua: excluye protones (H⁺) y otros iones mediante campo eléctrico",
          "Tasa de transporte: ~3×10⁹ moléculas H₂O/segundo por canal (difusión de archivo único)",
          "Bidireccional: flujo determinado por gradiente osmótico, no requiere ATP"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Principales acuaporinas humanas",
        datos: [
          { label: "AQP0 (MIP)", value: "Cristalino (fibras del lente), mutaciones causan cataratas congénitas" },
          { label: "AQP1", value: "Eritrocitos, endotelio vascular, túbulo proximal renal (reabsorción agua)" },
          { label: "AQP2", value: "Túbulo colector renal, regulada por vasopresina (ADH), diabetes insípida" },
          { label: "AQP3, AQP4", value: "Basolateral en riñón, AQP4 en astrocitos (edema cerebral)" },
          { label: "AQP5", value: "Glándulas salivales, lagrimales, pulmón (secreción fluidos)" },
          { label: "Aquagliceroporinas (AQP3, 7, 9, 10)", value: "Permeables a agua, glicerol, urea" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación y tráfico",
        items: [
          "AQP2: vasopresina → receptor V2 → cAMP/PKA → fosforilación Ser256 → inserción en membrana apical",
          "Trafficking vesicular: exocitosis/endocitosis regulada controla número de canales en membrana",
          "Fosforilación: PKA, PKC modulan localización subcelular y actividad",
          "Degradación: ubiquitinación marca AQPs para degradación lisosomal",
          "Expresión génica: NFAT5/TonEBP, AQP2, factores de transcripción osmosensibles",
          "Inhibidores: mercuriales (HgCl₂), tetraetil amonio (TEA) bloquean poro (uso experimental)"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Diabetes insípida nefrogénica: mutaciones AQP2 causan resistencia a ADH",
          "Síndrome de Sjögren: autoanticuerpos contra AQP5 reducen secreción salival/lagrimal",
          "Neuromielitis óptica (NMO): autoanticuerpos anti-AQP4 causan desmielinización",
          "Edema cerebral: sobreexpresión AQP4 en astrocitos facilita entrada agua",
          "Cáncer: sobreexpresión AQPs (AQP1, 3, 5) asociada con angiogénesis y metástasis"
        ]
      }
    ]
  },

  {
    id: "canales-ionicos-overview",
    nombre: "Canales Iónicos - Visión General",
    icono: "⚡",
    subtitulo: "Difusión facilitada - transporte pasivo rápido",
    categorias: ["pasivo", "canales", "iones"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Características generales",
        items: [
          "Proteínas transmembrana que forman poros acuosos selectivos para iones",
          "Transporte pasivo: a favor de gradiente electroquímico (no consumen ATP directamente)",
          "Alta velocidad: 10⁶-10⁸ iones/segundo por canal (cerca del límite de difusión)",
          "Selectividad iónica: filtro de selectividad discrimina iones por tamaño, carga, energía de hidratación",
          "Gating (compuerta): regulados por voltaje, ligandos, tensión mecánica, temperatura, pH",
          "Estados conformacionales: cerrado (no conductivo), abierto (conductivo), inactivado"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Clasificación funcional",
        datos: [
          { label: "Canales voltaje-dependientes", value: "Nav, Kv, Cav - sensor de voltaje en segmento S4 (Arg/Lys cargadas)" },
          { label: "Canales ligando-dependientes", value: "nAChR, GABA-A, NMDA, P2X - neurotransmisores, ATP" },
          { label: "Canales mecanosensibles", value: "Piezo1/2, ENaC, TRP - tacto, audición, propiocepción" },
          { label: "Canales termosensibles", value: "TRPV (calor), TRPM8 (frío) - nocicepción térmica" },
          { label: "Canales activados por Ca²⁺", value: "BK (Kca), SK - hiperpolarización, feedback negativo" },
          { label: "Canales de fuga (leak)", value: "K2P, NALCN - establecen potencial de reposo" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Mecanismos de selectividad",
        items: [
          "Filtro de selectividad: secuencia de aminoácidos conservados forma sitios de unión específicos",
          "Canal K⁺ (KcsA): secuencia TVGYG crea 4 sitios de unión, coordina K⁺ (1.33 Å) vs Na⁺ (0.95 Å)",
          "Deshidratación selectiva: energía de interacción proteína-ion compensa pérdida de hidratación",
          "Canal Na⁺: residuos DEKA forman filtro más amplio y flexible que K⁺",
          "Canal Ca²�+: anillo de carboxilatos (Glu) en poro proporciona alta afinidad por Ca²⁺",
          "Efecto de exclusión: repulsión electrostática impide paso de iones de carga opuesta"
        ]
      }
    ]
  },

  {
    id: "potencial-membrana",
    nombre: "Potencial de Membrana",
    icono: "🔋",
    subtitulo: "Diferencia de voltaje - base de excitabilidad",
    categorias: ["potencial", "iones"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Origen del potencial de membrana",
        items: [
          "Distribución asimétrica de iones: [K⁺]i ~140 mM, [K⁺]e ~5 mM; [Na⁺]i ~12 mM, [Na⁺]e ~145 mM",
          "Permeabilidad selectiva: membrana en reposo más permeable a K⁺ que Na⁺ (PK:PNa ≈ 40:1)",
          "Potencial de equilibrio (Nernst): Ex = (RT/zF)ln([X]e/[X]i) para cada ion",
          "EK ≈ -90 mV, ENa ≈ +60 mV, ECa ≈ +120 mV, ECl ≈ -70 mV (varía por célula)",
          "Potencial de reposo (Vm): determinado por permeabilidades relativas (ecuación Goldman-Hodgkin-Katz)",
          "Bomba Na⁺/K⁺-ATPasa: contribuye -5 a -10 mV por ser electrogénica (3Na⁺ fuera, 2K⁺ dentro)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Ecuaciones fundamentales",
        datos: [
          { label: "Ecuación de Nernst", value: "Ex = (61.5/z) log([X]e/[X]i) mV a 37°C, z=valencia" },
          { label: "Ecuación GHK (Goldman)", value: "Vm = 61.5 log[(PK[K⁺]e + PNa[Na⁺]e + PCl[Cl⁻]i)/(PK[K⁺]i + PNa[Na⁺]i + PCl[Cl⁻]e)]" },
          { label: "Capacitancia membrana", value: "Cm ≈ 1 μF/cm² (bicapa lipídica actúa como capacitor)" },
          { label: "Constante tiempo", value: "τ = RmCm, tiempo para cambio 63% voltaje (neurona típica ~10-20 ms)" },
          { label: "Constante longitud", value: "λ = √(Rm/Ri), distancia decaimiento señal electrotónica (1-3 mm)" },
          { label: "Ley de Ohm", value: "I = g(Vm - Eion), corriente iónica depende de conductancia y fuerza impulsora" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Tipos de potenciales",
        items: [
          "Potencial de reposo: Vm estable sin estimulación (-70 mV neuronas, -90 mV músculo cardíaco)",
          "Potencial graduado: despolarización/hiperpolarización local, decremental, sumable",
          "Potencial de acción: despolarización todo-o-nada, propagado sin decremento (~100 mV amplitud)",
          "Potencial postsináptico excitatorio (EPSP): despolarización por apertura canales catiónicos",
          "Potencial postsináptico inhibitorio (IPSP): hiperpolarización por apertura canales Cl⁻ o K⁺",
          "Potencial marcapasos: despolarización espontánea en células autorítmicas (nodo SA)"
        ]
      }
    ]
  },

  {
    id: "potencial-accion",
    nombre: "Potencial de Acción",
    icono: "⚡",
    subtitulo: "Señal eléctrica todo-o-nada - base de comunicación nerviosa",
    categorias: ["potencial", "excitabilidad", "canales"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Fases del potencial de acción",
        items: [
          "1. Reposo: Vm ≈ -70 mV, canales Nav cerrados (pero activables), canales K⁺ de fuga abiertos",
          "2. Umbral: despolarización a ~-55 mV abre canales Nav (retroalimentación positiva)",
          "3. Fase ascendente: entrada masiva Na⁺ → despolarización rápida hasta +40 mV (~1 ms)",
          "4. Pico: Vm se aproxima a ENa (+60 mV), canales Nav comienzan inactivación",
          "5. Repolarización: inactivación Nav + apertura canales Kv → salida K⁺ → retorno a negativo",
          "6. Hiperpolarización tardía: canales Kv lentos de cerrar → Vm más negativo que reposo brevemente"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Propiedades y parámetros",
        datos: [
          { label: "Amplitud", value: "~100 mV (de -70 a +30/40 mV típicamente)" },
          { label: "Duración", value: "1-2 ms (neuronas), 200-400 ms (cardiomiocitos ventriculares)" },
          { label: "Umbral de activación", value: "-55 a -50 mV (depende del tipo neuronal)" },
          { label: "Velocidad conducción", value: "0.5-2 m/s (fibras C) a 80-120 m/s (fibras Aα mielinizadas)" },
          { label: "Período refractario absoluto", value: "1-2 ms, imposible nuevo PA (Nav inactivados)" },
          { label: "Período refractario relativo", value: "2-4 ms, requiere estímulo supraumbral (Kv aún abiertos)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Propagación del potencial de acción",
        items: [
          "Conducción continua: despolarización de región adyacente por corrientes locales (axones no mielinizados)",
          "Conducción saltatoria: PA salta entre nodos de Ranvier, 10-50× más rápida (axones mielinizados)",
          "Mielina: vaina de Schwann (SNP) u oligodendrocitos (SNC) reduce capacitancia, aumenta resistencia",
          "Nodos de Ranvier: regiones sin mielina (1 μm) con alta densidad Nav (~1000-2000/μm²)",
          "Velocidad proporcional a diámetro axonal: V ∝ √d (no mielinizado), V ∝ d (mielinizado)",
          "Dirección ortodrómica: período refractario absoluto impide conducción retrógrada"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Esclerosis múltiple: desmielinización causa bloqueo conducción saltatoria → parálisis, parestesias",
          "Síndrome de Guillain-Barré: desmielinización autoinmune periférica → parálisis ascendente",
          "Anestésicos locales (lidocaína, bupivacaína): bloquean canales Nav → pérdida conducción",
          "Epilepsia: hiperexcitabilidad neuronal, mutaciones en Nav, Kv, GABA-A causan síndromes específicos",
          "Toxinas: tetrodotoxina (TTX) bloquea Nav, batrachotoxina mantiene Nav abiertos permanentemente"
        ]
      }
    ]
  },

  {
    id: "transportadores-overview",
    nombre: "Transportadores - Visión General",
    icono: "🚛",
    subtitulo: "Carriers - cambio conformacional mediado",
    categorias: ["activo", "pasivo", "transportadores"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Características generales",
        items: [
          "Proteínas transmembrana que unen sustrato específicamente mediante sitio de unión",
          "Cambio conformacional expone sitio de unión alternativamente a cada lado de membrana",
          "Velocidad: 10²-10⁴ moléculas/segundo (1000× más lento que canales, limitado por cambio conformacional)",
          "Saturables: cinética Michaelis-Menten con Km (afinidad) y Vmax (velocidad máxima)",
          "Especificidad: reconocen estructura química precisa (estereoselectivos)",
          "Pueden ser pasivos (uniporte a favor) o activos (contra gradiente usando energía)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Clasificación funcional",
        datos: [
          { label: "Uniporte (facilitado)", value: "Un sustrato, una dirección. Ej: GLUTs (glucosa), sin gasto ATP" },
          { label: "Simporte (cotransporte)", value: "Dos sustratos, misma dirección. Ej: SGLT (Na⁺-glucosa), NKCC" },
          { label: "Antiporte (intercambio)", value: "Dos sustratos, direcciones opuestas. Ej: NCX (Na⁺-Ca²⁺), NHE" },
          { label: "Transporte activo primario", value: "ATP hidrólisis directa. Ej: Na⁺/K⁺-ATPasa, Ca²⁺-ATPasa, H⁺-ATPasa" },
          { label: "Transporte activo secundario", value: "Gradiente iónico (típicamente Na⁺) impulsa transporte contra gradiente" },
          { label: "Transporte activo terciario", value: "Acoplado a transporte secundario, múltiples pasos de intercambio" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Superfamilias principales",
        items: [
          "SLC (SoLute Carriers): >400 miembros, mayoría transporte secundario (SGLT, LAT, MCT, OAT)",
          "ABC (ATP-Binding Cassette): 48 en humanos, transporte activo primario (CFTR, MDR1, ABCA1)",
          "ATPasas tipo P: fosforilación transitoria, bombas iónicas (Na⁺/K⁺, Ca²⁺, H⁺/K⁺)",
          "ATPasas tipo V: bombas H⁺ vacuolares, acidificación compartimentos (lisosomas, endosomas)",
          "ATPasas tipo F: síntesis ATP (no transporte), complejo ATP sintasa mitocondrial",
          "Transportadores CPA (Cation Proton Antiporter): intercambiadores Na⁺/H⁺, Ca²⁺/H⁺"
        ]
      }
    ]
  },

  {
    id: "glut-transportadores",
    nombre: "Transportadores GLUT (SLC2A)",
    icono: "🍬",
    subtitulo: "Uniporte facilitado de glucosa - 14 isoformas",
    categorias: ["pasivo", "transportadores", "glucosa"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Mecanismo de transporte",
        items: [
          "Uniporte facilitado: transporte glucosa a favor de gradiente sin gasto ATP",
          "Modelo alternating access: sitio de unión alterna entre conformación externa e interna",
          "12 dominios transmembrana (TM) con sitio de unión para glucosa en centro",
          "Estereoselectivo: transporta D-glucosa, no L-glucosa (reconocimiento OH en C1, C3, C4)",
          "Km variable: GLUT1 (~1-2 mM), GLUT2 (~15-20 mM), GLUT4 (~5 mM)",
          "Inhibidores: citocalasina B (competitivo), florizina (no específico)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Principales isoformas y distribución",
        datos: [
          { label: "GLUT1 (SLC2A1)", value: "Ubicuo, eritrocitos, barrera hematoencefálica, Km bajo (~1-2 mM)" },
          { label: "GLUT2 (SLC2A2)", value: "Hígado, páncreas (células β), riñón, intestino, Km alto (~15-20 mM, sensor glucosa)" },
          { label: "GLUT3 (SLC2A3)", value: "Neuronas, placenta, testículos, Km muy bajo (~1 mM, alta afinidad)" },
          { label: "GLUT4 (SLC2A4)", value: "Músculo esquelético, cardíaco, adipocitos, regulado por insulina" },
          { label: "GLUT5 (SLC2A5)", value: "Intestino delgado, espermatozoides, transporta fructosa preferentemente" },
          { label: "GLUT9 (SLC2A9)", value: "Riñón, hígado, transporta ácido úrico (hiperuricemia)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación de GLUT4 (modelo clave)",
        items: [
          "Estado basal: 95% GLUT4 en vesículas intracelulares (GSVs = GLUT4 Storage Vesicles)",
          "Estímulo insulina: receptor tirosina quinasa → PI3K/Akt → AS160/TBC1D4 inactivo → Rab-GTP activo",
          "Translocación: GSVs se fusionan con membrana plasmática en 5-10 minutos",
          "Incremento captación: 10-40 veces sobre nivel basal en músculo y adipocitos",
          "Ejercicio: vía independiente de insulina (AMPK, Ca²⁺) también induce translocación GLUT4",
          "Remoción insulina: endocitosis GLUT4, reciclaje a GSVs en 30-60 minutos"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Diabetes tipo 2: resistencia a insulina reduce translocación GLUT4 → hiperglucemia",
          "Síndrome GLUT1 deficiency: mutaciones SLC2A1 causan encefalopatía, convulsiones, retraso desarrollo",
          "Síndrome de Fanconi-Bickel: mutaciones GLUT2 causan hepatomegalia, raquitismo",
          "Glucosuria renal: sobreexpresión GLUT2 renal causa pérdida urinaria glucosa",
          "Metformina: aumenta translocación GLUT4 vía AMPK (tratamiento diabetes tipo 2)"
        ]
      }
    ]
  },

  {
    id: "sglt-transportadores",
    nombre: "Transportadores SGLT (SLC5A)",
    icono: "⚡",
    subtitulo: "Simporte Na⁺-glucosa - transporte activo secundario",
    categorias: ["activo", "transportadores", "glucosa"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Mecanismo de cotransporte",
        items: [
          "Simporte: acopla entrada Na⁺ a favor de gradiente con captación glucosa contra gradiente",
          "Estequiometría SGLT1: 2 Na⁺ : 1 glucosa (puede concentrar glucosa 20,000×)",
          "Estequiometría SGLT2: 1 Na⁺ : 1 glucosa (menor capacidad concentradora)",
          "Energía del gradiente Na⁺ (creado por Na⁺/K⁺-ATPasa) impulsa transporte activo secundario",
          "Orden de unión: primero Na⁺, luego glucosa (secuencial, no simultáneo)",
          "14 dominios transmembrana, familia SLC5 (también transporta yodo, mioinositol, vitaminas)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "SGLT1 vs SGLT2",
        datos: [
          { label: "SGLT1 (SLC5A1)", value: "Intestino (95% absorción), riñón (S3), Km ~0.5 mM, alta afinidad" },
          { label: "SGLT2 (SLC5A2)", value: "Riñón (S1-S2), 90% reabsorción glucosa, Km ~2 mM, baja afinidad" },
          { label: "Capacidad SGLT1", value: "Vmax alta, satura con dieta alta en glucosa" },
          { label: "Capacidad SGLT2", value: "Vmax muy alta, reabsorbe ~180 g glucosa/día" },
          { label: "Transporte", value: "Ambos transportan glucosa y galactosa, no fructosa" },
          { label: "Inhibidores", value: "Florizina (ambos), Dapagliflozina/Empagliflozina (SGLT2 selectivos)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Fisiología renal de glucosa",
        items: [
          "Filtración glomerular: ~180 g glucosa/día filtrados (glucosa plasmática ~5 mM)",
          "Reabsorción túbulo proximal: SGLT2 (90% en S1-S2) + SGLT1 (10% en S3)",
          "GLUT2 basolateral: permite salida glucosa del epitelio renal a sangre",
          "Umbral renal: ~180-200 mg/dL (10-11 mM), glucosuria aparece por encima",
          "Tm (transporte máximo): ~375 mg/min, saturación de transportadores",
          "Diabetes: hiperglucemia excede Tm → glucosuria → poliuria osmótica"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Glucosuria renal familiar: mutaciones SLC5A2 causan excreción glucosa con glucemia normal",
          "Malabsorción glucosa-galactosa: mutaciones SLC5A1 causan diarrea osmótica severa neonatal",
          "Inhibidores SGLT2 (gliflozinas): empagliflozina, dapagliflozina reducen glucemia en diabetes tipo 2",
          "Efectos cardiovasculares SGLT2i: reducción mortalidad cardiovascular e insuficiencia cardíaca",
          "Cetoacidosis euglucémica: efecto adverso raro de SGLT2 inhibidores"
        ]
      }
    ]
  },

  {
    id: "bomba-sodio-potasio",
    nombre: "Na⁺/K⁺-ATPasa (Bomba de Sodio-Potasio)",
    icono: "⚡",
    subtitulo: "ATPasa tipo P - consume ~30% ATP celular total",
    categorias: ["activo", "bombas", "iones"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura y mecanismo",
        items: [
          "Heterotrímero: subunidad α (catalítica, 113 kDa, 10 TM), β (glicosilada, 55 kDa), γ (FXYD, reguladora)",
          "Estequiometría: 3 Na⁺ expulsados, 2 K⁺ internados por ATP hidrolizado (electrogénico)",
          "Ciclo de Albers-Post: dos conformaciones E1 (alta afinidad Na⁺ citosólico) y E2 (alta afinidad K⁺ externo)",
          "Fosforilación reversible: Asp369 forma fosfoenzima (E1-P → E2-P transición)",
          "Isoformas α: α1 (ubicua), α2 (músculo, glía), α3 (neuronas), α4 (testículo/esperma)",
          "Velocidad: ~100-200 ciclos/segundo, consume 1 ATP por ciclo"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Parámetros cinéticos y distribución",
        datos: [
          { label: "Km para Na⁺ intracelular", value: "~10-20 mM ([Na⁺]i típica ~12 mM, cerca de Km)" },
          { label: "Km para K⁺ extracelular", value: "~1-2 mM ([K⁺]e típica ~4 mM)" },
          { label: "Km para ATP", value: "~0.5-1 mM ([ATP]i típica 3-5 mM, saturación)" },
          { label: "Densidad en membrana", value: "800-30,000 bombas/μm² (varía por tipo celular)" },
          { label: "Consumo energético", value: "20-40% ATP basal, hasta 70% en neuronas activas" },
          { label: "Contribución directa a Vm", value: "-5 a -10 mV (por ser electrogénico 3:2)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Funciones fisiológicas",
        items: [
          "Mantenimiento gradientes: [Na⁺]e/[Na⁺]i ~12:1, [K⁺]i/[K⁺]e ~35:1",
          "Potencial de membrana: contribuye directamente y mantiene gradientes para canales",
          "Volumen celular: limita Na⁺ intracelular previene hinchamiento osmótico",
          "Transporte activo secundario: gradiente Na⁺ energiza 7 familias de cotransportadores",
          "Señalización celular: interactúa con Src, PI3K, MAPK, regula expresión génica",
          "Termogénesis: genera calor metabólico (tejido adiposo marrón, músculo tiritando)"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Glucósidos cardíacos: digoxina, ouabaína inhiben bomba → aumenta [Na⁺]i → aumenta [Ca²⁺]i vía NCX → inotrópico +",
          "Intoxicación digitálica: náuseas, arritmias ventriculares por inhibición excesiva",
          "Migraña hemipléjica familiar tipo 2: mutaciones ATP1A2 (α2) causan episodios neurológicos",
          "FHYD dysplasia: mutaciones subunidad γ (FXYD2) causan hipomagnesemia, convulsiones",
          "Hipopotasemia severa: reduce actividad bomba, predispone a arritmias cardíacas"
        ]
      }
    ]
  },

  {
    id: "bomba-calcio",
    nombre: "Ca²⁺-ATPasa (PMCA y SERCA)",
    icono: "💪",
    subtitulo: "Bombas de calcio - mantenimiento [Ca²⁺]i bajo",
    categorias: ["activo", "bombas", "calcio"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Dos sistemas principales",
        items: [
          "PMCA (Plasma Membrane Ca²⁺-ATPase): expulsa Ca²⁺ de célula, 4 isoformas (PMCA1-4)",
          "SERCA (Sarco/Endoplasmic Reticulum Ca²⁺-ATPase): secuestra Ca²⁺ en RE/RS, 3 genes (SERCA1-3)",
          "ATPasas tipo P: fosforilación transitoria de Asp, similar mecanismo a Na⁺/K⁺-ATPasa",
          "Estequiometría PMCA: 1 Ca²⁺ expulsado por ATP (también intercambia 2H⁺ entrantes)",
          "Estequiometría SERCA: 2 Ca²⁺ secuestrados por ATP",
          "Alta afinidad: Km ~0.1-1 μM (mantiene [Ca²⁺]i ~50-100 nM en reposo)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Características PMCA vs SERCA",
        datos: [
          { label: "PMCA localización", value: "Membrana plasmática todas las células, alta afinidad (Km ~0.5 μM)" },
          { label: "SERCA localización", value: "Membrana RE/RS, SERCA1 (músculo esquelético), SERCA2 (cardíaco, ubicuo)" },
          { label: "PMCA velocidad", value: "Baja Vmax (~1-10 nmol Ca²⁺/mg proteína/min), afinado fino" },
          { label: "SERCA velocidad", value: "Alta Vmax (100-200 nmol/mg/min), rápida relajación muscular" },
          { label: "PMCA regulación", value: "Calmodulina (aumenta Vmax 10-20×), fosforilación PKA/PKC" },
          { label: "SERCA regulación", value: "Fosfolamban (PLN) inhibe, fosforilación PKA libera inhibición" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación y función",
        items: [
          "Calmodulina: Ca²⁺-CaM se une a dominio C-terminal PMCA, desplaza autoinhibición",
          "Fosfolamban: pentámero que inhibe SERCA2 cardíaco en estado desfosforilado",
          "Estimulación β-adrenérgica: PKA fosforila PLN(Ser16) → libera inhibición SERCA → ↑relajación",
          "Sarcolipina: proteína muscular que inhibe SERCA1, importante en termogénesis sin tiriteo",
          "Compartimentalización: PMCA en caveolas y balsas lipídicas para señalización local",
          "Cooperación NCX: intercambiador Na⁺/Ca²⁺ complementa PMCA en expulsión Ca²⁺"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Enfermedad de Brody: mutaciones SERCA1 causan miopatía con contracturas, relajación lenta",
          "Enfermedad de Darier: mutaciones SERCA2 (ATP2A2) causan queratosis folicular",
          "Insuficiencia cardíaca: reducción expresión/actividad SERCA2 → disfunción diastólica",
          "Terapia génica: SERCA2a por vector viral mejora función cardíaca en IC (ensayos clínicos)",
          "Tapsigargina: inhibidor específico SERCA, herramienta experimental, base de profármacos antitumorales"
        ]
      }
    ]
  },

  {
    id: "intercambiador-sodio-calcio",
    nombre: "Intercambiador Na⁺/Ca²⁺ (NCX)",
    icono: "🔄",
    subtitulo: "Antiporte - transporte activo secundario de Ca²⁺",
    categorias: ["activo", "transportadores", "calcio"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Mecanismo de intercambio",
        items: [
          "Antiporte: intercambia 3 Na⁺ entrantes por 1 Ca²⁺ saliente (electrogénico, genera corriente)",
          "Transporte activo secundario: usa gradiente Na⁺ (creado por Na⁺/K⁺-ATPasa) para expulsar Ca²⁺",
          "Capacidad alta, afinidad baja: Km ~1-10 μM, Vmax >>PMCA (complementario)",
          "Reversible: dirección depende de Vm y gradientes iónicos ([Na⁺], [Ca²⁺])",
          "9 dominios transmembrana con loop intracelular grande (CBD = Ca²⁺-binding domain)",
          "Isoformas: NCX1 (ubicuo, cardíaco), NCX2 (cerebro), NCX3 (cerebro, músculo esquelético)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Modos de operación",
        datos: [
          { label: "Modo directo (forward)", value: "3 Na⁺ entran, 1 Ca²⁺ sale (típico en reposo y diástole)" },
          { label: "Modo reverso", value: "3 Na⁺ salen, 1 Ca²⁺ entra (despolarización, alta [Na⁺]i)" },
          { label: "Cardíaco (reposo)", value: "Modo directo: expulsa Ca²⁺ que entró en sístole vía canales Cav" },
          { label: "Cardíaco (isquemia)", value: "Modo reverso: alta [Na⁺]i causa entrada Ca²⁺ → sobrecarga → daño" },
          { label: "Neuronal", value: "Expulsa Ca²⁺ post-potencial acción, coopera con PMCA" },
          { label: "Regulación alostérica", value: "Ca²⁺ citosólico (50-300 nM) activa desde sitio CBD" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Acoplamiento excitación-contracción cardíaco",
        items: [
          "1. Despolarización abre canales Cav tipo L → entrada Ca²⁺ (Ca²⁺ trigger)",
          "2. Ca²⁺ induce liberación Ca²⁺ desde RS (RyR2) → ↑↑[Ca²⁺]i (10-100×)",
          "3. Ca²⁺ se une a troponina C → contracción (sístole)",
          "4. Repolarización: SERCA2 recapta Ca²⁺ al RS (70%), NCX expulsa (28%), PMCA (2%)",
          "5. Relajación completa cuando [Ca²⁺]i retorna a ~100 nM (diástole)",
          "Digitálicos: inhiben Na⁺/K⁺-ATPasa → ↑[Na⁺]i → NCX menos efectivo → ↑[Ca²⁺]i → ↑contractilidad"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Insuficiencia cardíaca: disfunción NCX contribuye a sobrecarga Ca²⁺ y arritmias",
          "Isquemia-reperfusión: modo reverso NCX causa entrada masiva Ca²⁺ → muerte celular",
          "Hipertrofia cardíaca: expresión aumentada NCX1 (compensación inicial, después maladaptativa)",
          "Taquiarritmias: sobrecarga Ca²⁺ causa post-despolarizaciones y extrasístoles",
          "Inhibidores NCX: KB-R7943, SEA0400 (experimentales, potencial cardioprotector)"
        ]
      }
    ]
  },

  {
    id: "transportadores-abc",
    nombre: "Transportadores ABC",
    icono: "🚪",
    subtitulo: "ATP-Binding Cassette - 48 en humanos",
    categorias: ["activo", "bombas", "multidroga"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Características generales",
        items: [
          "Superfamilia más grande de transportadores: 7 subfamilias (ABCA-ABCG), 48 miembros humanos",
          "Dominios ABC: dos dominios NBD (Nucleotide-Binding Domain) que unen e hidrolizan ATP",
          "Dominios TMD: dos dominios transmembrana (6 hélices cada uno) forman poro",
          "Transporte activo primario: hidrólisis ATP impulsa cambio conformacional",
          "Mayoría exportadores: transportan sustratos desde citoplasma a exterior o lumen organular",
          "Sustratos diversos: lípidos, esteroles, fármacos, péptidos, iones orgánicos"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Principales transportadores ABC",
        datos: [
          { label: "ABCB1 (MDR1/P-gp)", value: "Exporta fármacos hidrofóbicos, resistencia multidrogas en cáncer" },
          { label: "ABCC7 (CFTR)", value: "Canal Cl⁻ regulado por ATP, fibrosis quística si mutado" },
          { label: "ABCA1", value: "Exporta colesterol/fosfolípidos a ApoA-I, enfermedad de Tangier" },
          { label: "ABCG5/ABCG8", value: "Exportan esteroles vegetales en intestino/hígado, sitosterolemia" },
          { label: "ABCC1-6 (MRPs)", value: "Exportan conjugados glutatión, resistencia quimioterapia" },
          { label: "ABCB4 (MDR3)", value: "Transloca fosfatidilcolina en bilis, colestasis tipo 3" }
        ]
      },
      {
        tipo: "lista",
        titulo: "P-glicoproteína (ABCB1/MDR1)",
        items: [
          "Estructura: 12 TM, 2 NBD, reconoce >200 sustratos hidrofóbicos diversos",
          "Localización: intestino (apical), hígado (canalicular), barrera hematoencefálica, tumores",
          "Función fisiológica: protege contra xenobióticos, limita entrada fármacos al SNC",
          "Resistencia multidrogas: sobreexpresión en tumores expulsa agentes quimioterapéuticos",
          "Sustratos: vincristina, doxorrubicina, paclitaxel, digoxina, ciclosporina, inhibidores proteasa HIV",
          "Inhibidores: verapamilo, quinidina, ciclosporina (reversores de resistencia MDR)"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Fibrosis quística: mutación ΔF508 en CFTR (70% casos) causa plegamiento defectuoso → degradación",
          "Resistencia a quimioterapia: sobreexpresión MDR1, MRP1 en cáncer reduce eficacia tratamiento",
          "Enfermedad de Tangier: mutaciones ABCA1 causan HDL muy bajo, acumulación colesterol tisular",
          "Sitosterolemia: mutaciones ABCG5/G8 causan absorción/acumulación esteroles vegetales → aterosclerosis prematura",
          "Colestasis intrahepática progresiva familiar: mutaciones ABCB4, ABCB11 causan fallo excreción biliar"
        ]
      }
    ]
  },

  {
    id: "cftr",
    nombre: "CFTR (Cystic Fibrosis Transmembrane Conductance Regulator)",
    icono: "🫁",
    subtitulo: "Canal Cl⁻ regulado por ATP - único ABC que es canal",
    categorias: ["canales", "activo", "cloruro"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Estructura y función única",
        items: [
          "Único transportador ABC que funciona como canal iónico (Cl⁻), no como bomba",
          "Estructura: 2 TMD (6 TM cada uno), 2 NBD, dominio R (regulador) con sitios PKA",
          "Apertura del canal: requiere fosforilación PKA (dominio R) + unión ATP (NBD1/2)",
          "Conductancia: ~8-10 pS, selectivo para Cl⁻ sobre otros aniones",
          "Regulación: cAMP/PKA (agonistas β₂ aumentan), ATP (necesario para gating)",
          "Localización: epitelios secretorios (pulmón, páncreas, intestino, conductos sudoríparos)"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Función en epitelios",
        datos: [
          { label: "Pulmón", value: "Secreción Cl⁻ → agua sigue osmóticamente → hidratación mucus" },
          { label: "Páncreas", value: "Secreción Cl⁻/HCO₃⁻ alcaliniza jugo pancreático" },
          { label: "Intestino", value: "Secreción Cl⁻ luminal, absorción Na⁺ (regulado por toxina cólera)" },
          { label: "Conductos sudoríparos", value: "Reabsorción Cl⁻ (y Na⁺ vía ENaC), produce sudor hipotónico" },
          { label: "Vías biliares", value: "Secreción Cl⁻/HCO₃⁻ en conductos biliares" },
          { label: "Conductos deferentes", value: "Secreción fluido, agenesia bilateral en FQ severa" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Mutaciones en fibrosis quística",
        items: [
          "ΔF508 (70% alelos FQ): deleción Phe508 en NBD1 → plegamiento defectuoso → degradación ER",
          "Clase I (10%): mutaciones sin sentido → ausencia proteína (severo)",
          "Clase II (70%): plegamiento defectuoso (ΔF508) → degradación proteasomal",
          "Clase III (4%): CFTR alcanza membrana pero gating defectuoso (G551D)",
          "Clase IV (1%): conductancia reducida (R117H, R334W)",
          "Clase V (<1%): síntesis reducida → niveles bajos CFTR funcional (promotor, splicing)"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Fibrosis quística: enfermedad AR, 1:2500 nacidos (caucásicos), mucus espeso → infecciones respiratorias, insuficiencia pancreática",
          "Test sudor: [Cl⁻] >60 mEq/L diagnóstico FQ (sudor salado)",
          "Ivacaftor (Kalydeco): potenciador CFTR, mejora gating G551D y otras mutaciones clase III",
          "Lumacaftor/Tezacaftor: correctores CFTR, mejoran tráfico ΔF508 a membrana (combinado con ivacaftor)",
          "Elexacaftor/Tezacaftor/Ivacaftor (Trikafta): triple terapia, mejora FEV1 ~14%, estándar para ΔF508"
        ]
      }
    ]
  },

  {
    id: "cotransporte-nkcc-ncc",
    nombre: "Cotransportadores NKCC y NCC",
    icono: "⚡",
    subtitulo: "Simporte de iones - regulación volumen y presión",
    categorias: ["activo", "transportadores", "iones"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Familia SLC12 de cotransportadores",
        items: [
          "NKCC1 (SLC12A2): ubicuo, simporte Na⁺-K⁺-2Cl⁻, electroneutro (secreción fluidos)",
          "NKCC2 (SLC12A1): riñón (rama ascendente gruesa asa Henle), reabsorción NaCl",
          "NCC (SLC12A3): riñón (túbulo contorneado distal), simporte Na⁺-Cl⁻",
          "KCC1-4 (K⁺-Cl⁻ cotransporters): antiporte, regulan volumen celular (RVD)",
          "Mecanismo: transporte activo secundario usando gradiente Na⁺ creado por Na⁺/K⁺-ATPasa",
          "12 dominios transmembrana, fosforilación regula actividad"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Características NKCC vs NCC",
        datos: [
          { label: "NKCC1 distribución", value: "Ubicuo, epitelios secretorios, eritrocitos, neuronas inmaduras" },
          { label: "NKCC2 distribución", value: "Rama ascendente gruesa (TAL), reabsorbe 25-30% NaCl filtrado" },
          { label: "NCC distribución", value: "Túbulo contorneado distal (DCT), reabsorbe 5-7% NaCl filtrado" },
          { label: "NKCC estequiometría", value: "1 Na⁺ : 1 K⁺ : 2 Cl⁻ (electroneutro)" },
          { label: "NCC estequiometría", value: "1 Na⁺ : 1 Cl⁻ (electroneutro)" },
          { label: "Inhibidores", value: "Furosemida (NKCC2), Bumetanida (NKCC1/2), Tiazidas (NCC)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Función renal y mecanismo concentrador",
        items: [
          "NKCC2 en TAL: reabsorbe NaCl sin agua → diluye orina, concentra intersticio medular",
          "Gradiente corticomedular: NKCC2 genera hiperosmolaridad medular (hasta 1200 mOsm/kg)",
          "Multiplicación contracorriente: asa de Henle crea y mantiene gradiente osmótico",
          "NCC en DCT: ajuste fino de reabsorción Na⁺, regulado por aldosterona",
          "Regulación WNK kinases: WNK1, WNK4 fosforilan/activan SPAK/OSR1 → fosforilan/activan NKCC/NCC",
          "Hormonal: angiotensina II, aldosterona, vasopresina aumentan actividad"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Síndrome de Bartter: mutaciones NKCC2 o canales asociados → pérdida sal renal, hipopotasemia, alcalosis",
          "Síndrome de Gitelman: mutaciones NCC causan fenotipo similar Bartter pero más leve, hipomagnesemia",
          "Diuréticos de asa: furosemida inhibe NKCC2 → diuresis masiva, útil en edema pulmonar/ICC",
          "Tiazidas: hidrocloro tiazida inhibe NCC → diuresis moderada, antihipertensivo de 1ª línea",
          "Síndrome de Gordon (pseudohipoaldosteronismo tipo II): mutaciones WNK causan hipertensión, hiperpotasemia"
        ]
      }
    ]
  },

  {
    id: "transporte-transcitosis",
    nombre: "Transcitosis",
    icono: "🔄",
    subtitulo: "Transporte vesicular transepitelial",
    categorias: ["vesicular", "membrana"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Concepto y mecanismo",
        items: [
          "Transporte de macromoléculas a través de célula epitelial/endotelial mediante vesículas",
          "Secuencia: endocitosis (lado apical/basal) → transporte vesicular → exocitosis (lado opuesto)",
          "No degradación: vesículas evitan fusión con lisosomas (diferente de endocitosis degradativa)",
          "Tipos: mediada por receptor (específica) o fase fluida (no selectiva)",
          "Tiempo tránsito: minutos a horas dependiendo de distancia y célula",
          "Polaridad epitelial: diferenciación apical vs basolateral determina dirección"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Ejemplos fisiológicos importantes",
        datos: [
          { label: "Transferrina (hierro)", value: "Transcitosis en endotelio barrera hematoencefálica vía receptor TfR" },
          { label: "IgG (anticuerpos)", value: "Neonatos: FcRn media transcitosis IgG de leche materna en intestino" },
          { label: "Albúmina", value: "Transcitosis en endotelio vascular mediada por caveolas (gp60/albondina)" },
          { label: "LDL (colesterol)", value: "Transcitosis en endotelio arterial, relevante en aterogénesis" },
          { label: "Virus (HIV, influenza)", value: "Explotan transcitosis para cruzar barreras epiteliales" },
          { label: "Toxinas (ricina, Shiga)", value: "Transcitosis retrógrada: superficie → Golgi → RE" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Vías moleculares",
        items: [
          "Vía clásica (caveolae): caveolina-1, cavinas, participan en transcitosis endotelial",
          "Vía mediada por receptor: FcRn (IgG), TfR (transferrina), receptor megalina (cubierta)",
          "Señalización: Rab GTPasas (Rab5, Rab11) coordinan rutas endocíticas y exocíticas",
          "Sorting: señales de clasificación dirigen vesículas a destino apical vs basolateral",
          "SNARE proteins: median fusión específica de vesículas con membrana target",
          "Regulación: Ca²⁺, PKC, Src kinases modulan eficiencia transcitosis"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Administración de fármacos: conjugación con transferrina para cruzar barrera hematoencefálica",
          "Nanopartículas terapéuticas: diseñadas para explotar transcitosis endotelial",
          "HIV transcitosis: virus cruza barreras mucosas vía células dendríticas y epiteliales",
          "Enfermedad celíaca: gliadinas sufren transcitosis en epitelio intestinal",
          "Aterosclerosis: transcitosis LDL en endotelio arterial contribuye a formación placa"
        ]
      }
    ]
  },

  {
    id: "endocitosis-types",
    nombre: "Tipos de Endocitosis",
    icono: "📥",
    subtitulo: "Internalización de membrana - múltiples vías",
    categorias: ["vesicular", "membrana"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Vías principales de endocitosis",
        items: [
          "Endocitosis mediada por clatrina (CME): vesículas ~100 nm, receptores con señales YXXΦ, [DE]XXXL[LI]",
          "Endocitosis mediada por caveolas: invaginaciones 50-100 nm, caveolina-dependiente",
          "Endocitosis independiente clatrina/caveolina (CIE): múltiples rutas (CLIC/GEEC, flotilina, Arf6)",
          "Macropinocitosis: protrusiones membrana (>1 μm), captación fase fluida, Rac1-dependiente",
          "Fagocitosis: partículas >0.5 μm (bacterias, células muertas), células especializadas",
          "Endocitosis rápida (FEME): ultra-rápida (<1 s), receptores GPCR, Tyr kinases"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Características comparativas",
        datos: [
          { label: "CME constitutiva", value: "Continua, receptores housekeeping (transferrina, LDL), adaptadores AP-2" },
          { label: "CME regulada", value: "Desencadenada (EGFR activado, GPCR), ubiquitinación cargo" },
          { label: "Caveolae", value: "Lenta (~20 min), señalización, transcitosis, Src/Cav-1" },
          { label: "CLIC/GEEC", value: "Independiente dinamina, tubular, CD44, GPI-APs, Arf1/Cdc42" },
          { label: "Macropinocitosis", value: "Captación fluido ~1-5 μm³, nutrientes, antígenos (CPA)" },
          { label: "Fagocitosis", value: "Específica (FcR, CR), actina-dependiente, macrófagos/neutrófilos" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Maquinaria molecular (CME)",
        items: [
          "1. Nucleación: AP-2 se une a PI(4,5)P₂ y cola citoplásmica de receptores cargo",
          "2. Reclutamiento clatrina: trisqueliones forman jaula pentagonal/hexagonal",
          "3. Curvatura: proteínas BAR (epsin, amphiphysin) estabilizan membrana curvada",
          "4. Escisión: dinamina forma espiral, GTP hidrólisis constricción cuello (~1 s)",
          "5. Desensamblaje: auxilina/Hsc70 usan ATP para despolimerizar clatrina",
          "6. Fusión: endosomas tempranos (Rab5+, EEA1, PI3P, pH ~6.0)"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Hipercolesterolemia familiar: defecto receptor LDL impide endocitosis → colesterol plasmático alto",
          "Entrada viral: influenza (CME), HIV (fusión directa o CME), adenovirus (caveolae)",
          "Toxinas bacterianas: difteria, ántrax, ricina, Shiga explotan endocitosis para entrada",
          "Resistencia trastuzumab: endocitosis Her2 puede reducir eficacia anticuerpo anti-Her2",
          "Síndrome nefrótico: defectos endocitosis megalina en podocitos causan proteinuria"
        ]
      }
    ]
  },

  {
    id: "exocitosis-types",
    nombre: "Tipos de Exocitosis",
    icono: "📤",
    subtitulo: "Fusión vesicular - constitutiva y regulada",
    categorias: ["vesicular", "membrana"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Dos modos principales",
        items: [
          "Exocitosis constitutiva: continua, no regulada, secreción proteínas, renovación membrana (~1%/hora)",
          "Exocitosis regulada: desencadenada por señal (Ca²⁺, hormonas), vesículas especializadas",
          "Exocitosis neuronal: liberación neurotransmisores en sinapsis (submilisegundo)",
          "Exocitosis endocrina: hormonas peptídicas (insulina, GH, ACTH, TSH) en gránulos",
          "Exocitosis exocrina: enzimas digestivas (páncreas), mucinas (salivales, intestino)",
          "Kiss-and-run: fusión transitoria, recuperación rápida sin colapso total vesícula"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Características por tipo",
        datos: [
          { label: "Constitutiva", value: "Continua, todas células, renovación membrana, sin señal trigger" },
          { label: "Regulada (neuronas)", value: "Ultra-rápida (<1 ms), Ca²⁺ trigger, sincronía ~0.5-1 ms" },
          { label: "Regulada (endocrina)", value: "Lenta (segundos), Ca²⁺/cAMP, gránulos densos (100-300 nm)" },
          { label: "Regulada (exocrina)", value: "Gradual (minutos), cAMP/Ca²⁺, gránulos zimógeno (1-2 μm)" },
          { label: "Kiss-and-run", value: "Fusión parcial, poro transitorio, rápida recuperación (<1 s)" },
          { label: "Full collapse", value: "Fusión completa, colapso en membrana, reciclaje lento (10-30 s)" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Maquinaria molecular (SNAREs)",
        items: [
          "v-SNAREs (vesícula): sinaptobrevina/VAMP (VAMP1,2,3,7), especificidad tisular",
          "t-SNAREs (target): sintaxina-1 (Qa-SNARE), SNAP-25 (Qb,Qc-SNARE) en membrana plasmática",
          "Complejo trans-SNARE: 4-helix bundle (Qa-Qb-Qc-R), energía ensamblaje impulsa fusión",
          "Sinaptotagmina: sensor Ca²⁺ (dominios C2A, C2B), dispara fusión rápida (<200 μs)",
          "Complexina: clamp, estabiliza complejo SNARE pre-fusión hasta señal Ca²⁺",
          "NSF/α-SNAP: ATPasas desensamblan cis-SNAREs post-fusión (reciclaje, ATP-dependiente)"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Diabetes tipo 1: autoinmunidad destruye células β → pérdida exocitosis insulina",
          "Botulismo: toxina botulínica proteoliza SNAP-25/sintaxina/VAMP → parálisis flácida",
          "Tétanos: toxina tetánica escinde VAMP en neuronas inhibitorias GABAérgicas → espasmos",
          "Miastenia gravis: autoanticuerpos anti-receptor nicotínico reducen transmisión NMJ",
          "Síndrome de Lambert-Eaton: autoanticuerpos anti-canales Cav reducen liberación ACh"
        ]
      }
    ]
  },

  {
    id: "reciclaje-vesicular",
    nombre: "Reciclaje Vesicular Sináptico",
    icono: "♻️",
    subtitulo: "Ciclo de vesículas sinápticas - liberación sostenida",
    categorias: ["vesicular", "neuronas"],
    secciones: [
      {
        tipo: "lista",
        titulo: "Vías de reciclaje",
        items: [
          "Kiss-and-run: fusión transitoria, vesícula se cierra rápidamente, reciclaje local ultra-rápido (<1 s)",
          "Endocitosis mediada por clatrina (CME): recuperación clásica tras fusión completa (~10-30 s)",
          "Endocitosis ultra-rápida: nueva vía, <100 ms, endosomas grandes → fisión vesículas",
          "Endocitosis bulk: múltiples vesículas fusionadas, invaginación grande, regeneración endosomas",
          "Pool readily releasable (RRP): 5-20 vesículas docked, liberación inmediata",
          "Pool de reciclaje: 10-15% vesículas totales, movilizadas con estimulación moderada"
        ]
      },
      {
        tipo: "tabla",
        titulo: "Componentes moleculares clave",
        datos: [
          { label: "Dinamina", value: "GTPasa, escisión cuello vesicular, reclutada por endofilina" },
          { label: "AP-2/clatrina", value: "Adaptadores, cubiertas, CME clásica (~20-30 s)" },
          { label: "Sinaptofisina", value: "Proteína integral vesícula, interactúa con VAMP, marcador" },
          { label: "Sinaptojanina 1", value: "Fosfatasa PI(4,5)P₂, desensamblaje clatrina" },
          { label: "Endofilina", value: "Proteína BAR, curvatura membrana, recluta dinamina" },
          { label: "Auxilina/Hsc70", value: "Despolimerización clatrina usando ATP" }
        ]
      },
      {
        tipo: "lista",
        titulo: "Regulación y plasticidad",
        items: [
          "Dependencia Ca²⁺: Ca²⁺ residual acelera endocitosis (calcineurina, CaMKII)",
          "Facilitación sináptica: Ca²⁺ residual aumenta probabilidad liberación en estímulos sucesivos",
          "Depresión sináptica: agotamiento RRP con estimulación de alta frecuencia",
          "Potenciación post-tetánica: aumento transitorio liberación tras tren de alta frecuencia",
          "LTP/LTD: cambios plásticos duraderos en eficiencia sináptica (minutos-años)",
          "Homeostasis sináptica: ajuste compensatorio de número vesículas y receptores"
        ]
      },
      {
        tipo: "clinica",
        titulo: "Relevancia clínica",
        items: [
          "Síndrome de Down: trisomía 21, sobreexpresión sinaptojanina-1 → endocitosis acelerada → disfunción sináptica",
          "Enfermedad de Parkinson: α-sinucleína mutante interfiere con reciclaje vesicular",
          "Miastenia congénita: mutaciones en proteínas sinápticas (MUNC13, sinaptotagmina) causan fatiga",
          "Intoxicación α-latrotoxina (viuda negra): depleción masiva vesículas → parálisis",
          "Deficiencia endofilina-A: causa neuropatía sensitiva y autonómica"
        ]
      }
    ]
  }
];
