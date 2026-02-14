// ═══════════════════════════════════════════════════════════
// MUSCULO DATA - Base de datos de tejido muscular
// ═══════════════════════════════════════════════════════════

const MUSCULO_DATA = [
  {
    id: 'musculo-esqueletico-estructura',
    nombre: 'Músculo Esquelético: Estructura',
    subtitulo: 'Estriado · Voluntario · Fibras multinucleadas',
    icono: '💪',
    categorias: ['esqueletico', 'estructura', 'estriado'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Organización Estructural',
        items: [
          'Fibra muscular: Célula multinucleada cilíndrica (10-100 μm diámetro, hasta 30 cm)',
          'Núcleos: Múltiples (100-200+), periféricos (subsarcolémicos)',
          'Sarcolema: Membrana plasmática de la fibra muscular',
          'Sarcoplasma: Citoplasma con abundante glucógeno y mioglobina',
          'Miofibrillas: Estructuras contráctiles paralelas (1-2 μm diámetro)',
          'Endomisio: Tejido conectivo que rodea cada fibra',
          'Perimisio: Rodea fascículos (grupos de 10-100 fibras)',
          'Epimisio: Envuelve todo el músculo'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Componentes del Sarcómero',
        items: [
          'Sarcómero: Unidad contráctil (2.5 μm en reposo, 1.5-3.5 μm)',
          'Línea Z: Límite del sarcómero (α-actinina)',
          'Banda I: Zona clara, solo filamentos delgados (actina)',
          'Banda A: Zona oscura, filamentos gruesos (miosina)',
          'Zona H: Centro de banda A, solo miosina',
          'Línea M: Centro del sarcómero (miomesina, creatina quinasa)',
          'Filamentos delgados: Actina, troponina, tropomiosina',
          'Filamentos gruesos: Miosina II (cabezas, colas)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Proteínas Estructurales',
        datos: [
          { label: 'Actina F', value: 'Filamento delgado, sitios de unión para miosina' },
          { label: 'Miosina II', value: 'Filamento grueso, motor molecular ATPasa' },
          { label: 'Tropomiosina', value: 'Bloquea sitios actina en reposo' },
          { label: 'Troponina (TnC, TnI, TnT)', value: 'Regulación Ca²⁺-dependiente' },
          { label: 'Titina', value: 'Proteína elástica (línea Z → línea M), mayor proteína humana' },
          { label: 'Nebulina', value: 'Regla molecular, define longitud actina' },
          { label: 'Distrofina', value: 'Une citoesqueleto a sarcolema (defecto en DMD)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Distrofia muscular de Duchenne (DMD): Mutación distrofina, degeneración progresiva',
          'Distrofia muscular de Becker: Distrofina parcialmente funcional, menos severa',
          'Miopatías congénitas: Nemalínica (bastones), core central',
          'Rabdomiólisis: Destrucción muscular, mioglobinuria, IRA',
          'Miositis: Inflamación muscular (polimiositis, dermatomiositis)',
          'Atrofia por denervación: Pérdida de inervación, fibras anguladas',
          'Miopatías mitocondriales: Fibras rojas rasgadas (ragged red fibers)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Sistema de Túbulos T y Retículo Sarcoplásmico',
        items: [
          'Túbulos T (transversos): Invaginaciones del sarcolema, nivel unión A-I',
          'Retículo sarcoplásmico (RS): REL especializado, almacena Ca²⁺',
          'Cisternas terminales: Dilataciones del RS adyacentes a túbulo T',
          'Tríada: 1 túbulo T + 2 cisternas terminales',
          'Bomba SERCA: Ca²⁺-ATPasa, recapta Ca²⁺ al RS',
          'Calsequestrina: Proteína de unión a Ca²⁺ en RS (alta capacidad)',
          'Receptor de dihidropiridina (DHPR): Sensor de voltaje en túbulo T',
          'Receptor de rianodina (RyR1): Canal de Ca²⁺ en RS, acoplado a DHPR'
        ]
      }
    ]
  },
  {
    id: 'musculo-esqueletico-contraccion',
    nombre: 'Músculo Esquelético: Mecanismo de Contracción',
    subtitulo: 'Teoría del filamento deslizante · Acoplamiento excitación-contracción',
    icono: '⚡',
    categorias: ['esqueletico', 'contraccion', 'mecanismo'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Acoplamiento Excitación-Contracción',
        items: [
          '1. Potencial de acción: Despolarización del sarcolema (neurona motora)',
          '2. Propagación: PA viaja por túbulos T hacia interior de fibra',
          '3. Sensor de voltaje: DHPR detecta despolarización',
          '4. Acoplamiento mecánico: DHPR abre RyR1 (sin flujo de Ca²⁺ externo)',
          '5. Liberación de Ca²⁺: RyR1 libera Ca²⁺ del RS al sarcoplasma',
          '6. [Ca²⁺] aumenta: De 10⁻⁷ M a 10⁻⁵ M (100x)',
          '7. Unión a troponina C: Ca²⁺ se une a TnC',
          '8. Cambio conformacional: Tropomiosina descubre sitios actina'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Ciclo de Puentes Cruzados',
        items: [
          '1. Unión: Cabeza miosina + ATP se une a actina',
          '2. Hidrólisis ATP: ATP → ADP + Pi (cabeza "armada")',
          '3. Golpe de fuerza: Liberación Pi, cabeza pivota 45°, actina se desliza',
          '4. Liberación ADP: ADP se libera, cabeza firmemente unida',
          '5. Unión ATP: Nuevo ATP se une, cabeza se separa de actina',
          '6. Relajación: Ca²⁺ recaptado por SERCA, tropomiosina bloquea',
          'Velocidad: ~5 ciclos/segundo por cabeza de miosina',
          'Acortamiento sarcómero: Líneas Z se acercan, banda I disminuye'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Regulación de la Contracción',
        datos: [
          { label: 'Ca²⁺ intracelular', value: 'Señal esencial, TnC (4 sitios unión)' },
          { label: 'Tropomiosina', value: 'Bloquea sitios en reposo, se desplaza con Ca²⁺' },
          { label: 'Troponina I', value: 'Inhibidora, une actina-tropomiosina' },
          { label: 'Troponina T', value: 'Une tropomiosina' },
          { label: 'Troponina C', value: 'Une Ca²⁺ (similar a calmodulina)' },
          { label: 'ATP', value: 'Necesario para separación y rearme' },
          { label: 'Fosfocreatina', value: 'Reserva energética, regenera ATP rápido' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Rigor mortis: Agotamiento ATP post-mortem, puentes cruzados permanentes',
          'Hipertermia maligna: Mutación RyR1, liberación Ca²⁺ descontrolada (anestésicos)',
          'Miastenia gravis: Autoanticuerpos anti-receptor ACh, debilidad muscular',
          'Síndrome de Lambert-Eaton: Autoanticuerpos anti-canales Ca²⁺ presinápticos',
          'Botulismo: Toxina botulínica bloquea liberación ACh, parálisis flácida',
          'Tétanos: Toxina tetánica bloquea inhibición (espasmos, trismo)',
          'Parálisis periódica hipocalémica: Canalopatía, debilidad episódica',
          'Síndrome de Brody: Deficiencia SERCA1, relajación lenta'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Metabolismo Energético',
        items: [
          'Fosfocreatina: Reserva inmediata (10-15 segundos esfuerzo máximo)',
          'Glucólisis anaeróbica: Rápida, produce lactato (1-2 minutos)',
          'Fosforilación oxidativa: Sostenida, requiere O₂ (ejercicio prolongado)',
          'Glucógeno muscular: 1-2% peso muscular, fuente de glucosa',
          'Ácidos grasos: Oxidación β, ejercicio aeróbico prolongado',
          'Creatina quinasa (CK): Reversible, fosfocreatina ⇌ creatina + ATP',
          'Mioglobina: Almacena O₂ (músculo rojo)',
          'Consumo ATP: Puentes cruzados (70%), bomba SERCA (30%)'
        ]
      }
    ]
  },
  {
    id: 'musculo-esqueletico-tipos-fibras',
    nombre: 'Músculo Esquelético: Tipos de Fibras',
    subtitulo: 'Tipo I (rojas) · Tipo IIa · Tipo IIx (blancas)',
    icono: '🎨',
    categorias: ['esqueletico', 'tipos', 'fisiologia'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Fibras Tipo I (Lentas, Oxidativas, Rojas)',
        items: [
          'Contracción: Lenta, sostenida (resistencia)',
          'Metabolismo: Oxidativo aeróbico (mitocondrias abundantes)',
          'Mioglobina: Alta concentración (color rojo)',
          'Capilarización: Densa red capilar',
          'Fatiga: Resistentes, recuperación rápida',
          'Miosina ATPasa: Baja actividad',
          'Diámetro: Menor que tipo II',
          'Ejemplo: Sóleo, músculos posturales, maratonistas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Fibras Tipo IIa (Rápidas, Oxidativo-Glucolíticas)',
        items: [
          'Contracción: Rápida, intermedias',
          'Metabolismo: Mixto (oxidativo + glucolítico)',
          'Mioglobina: Moderada (rojo-rosa)',
          'Capilarización: Alta',
          'Fatiga: Resistencia intermedia',
          'Miosina ATPasa: Alta actividad',
          'Características: Adaptables con entrenamiento',
          'Ejemplo: Vasto lateral, ciclistas, nadadores'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Fibras Tipo IIx (Rápidas, Glucolíticas, Blancas)',
        datos: [
          { label: 'Contracción', value: 'Muy rápida, explosiva, breve' },
          { label: 'Metabolismo', value: 'Glucolítico anaeróbico' },
          { label: 'Mioglobina', value: 'Baja (color blanco)' },
          { label: 'Mitocondrias', value: 'Escasas' },
          { label: 'Glucógeno', value: 'Alto contenido' },
          { label: 'Fatiga', value: 'Rápida, poco resistentes' },
          { label: 'Diámetro', value: 'Mayor (hipertrofia)' },
          { label: 'Ejemplo', value: 'Gastrocnemio, velocistas, levantadores' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Adaptación al ejercicio: Entrenamiento aeróbico aumenta tipo I, resistencia tipo IIa',
          'Hipertrofia: Levantamiento pesas (tipo IIx), aumento síntesis proteica',
          'Atrofia por desuso: Pérdida masa, predomina tipo I residual',
          'Denervación: Pérdida patrón, agrupación por reinervación colateral',
          'Envejecimiento (sarcopenia): Pérdida fibras tipo II, debilidad',
          'Miopatías mitocondriales: Afecta fibras tipo I (oxidativas)',
          'Deficiencia miofosforilasa (McArdle): Intolerancia ejercicio, calambres',
          'Biopsia muscular: Tinción ATPasa pH 4.3 y 9.4 (diferenciación tipos)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Características Moleculares',
        items: [
          'Cadenas pesadas de miosina: MHC I (lenta), MHC IIa, MHC IIx',
          'Troponina I: Isoformas lentas vs rápidas',
          'SERCA: SERCA2a (lenta), SERCA1 (rápida)',
          'Parvalbúmina: Alta en fibras rápidas (amortiguador Ca²⁺)',
          'Factor de transcripción: PGC-1α (biogénesis mitocondrial, tipo I)',
          'Plasticidad: Transformación IIx → IIa → I (entrenamiento)',
          'Unidad motora: Tipo I (10-100 fibras), Tipo II (300-800 fibras)',
          'Reclutamiento: Principio de Henneman (I → IIa → IIx)'
        ]
      }
    ]
  },
  {
    id: 'union-neuromuscular',
    nombre: 'Unión Neuromuscular',
    subtitulo: 'Sinapsis colinérgica · Placa motora · Transmisión neuromuscular',
    icono: '🔌',
    categorias: ['esqueletico', 'sinapsis', 'neuromuscular'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Estructura de la Unión Neuromuscular',
        items: [
          'Neurona motora alfa: Origina en médula espinal, inerva fibras',
          'Terminal presináptico: Botón terminal con vesículas de ACh',
          'Hendidura sináptica: Espacio 50-100 nm, lámina basal con AChE',
          'Placa motora: Región especializada del sarcolema',
          'Pliegues de unión: Invaginaciones con alta densidad de receptores',
          'Receptores nicotínicos (nAChR): Canales iónicos ligando-dependientes',
          'Densidad receptores: 10,000-20,000/μm² en crestas de pliegues',
          'Acetilcolinesterasa (AChE): En lámina basal, hidroliza ACh'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Transmisión Neuromuscular',
        items: [
          '1. PA llega al terminal: Despolarización del botón presináptico',
          '2. Apertura canales Ca²⁺: Voltaje-dependientes tipo P/Q',
          '3. Entrada Ca²⁺: Aumento [Ca²⁺]i en terminal',
          '4. Fusión vesicular: SNARE (sinaptotagmina, sintaxina, SNAP-25)',
          '5. Exocitosis ACh: ~10,000 moléculas/vesícula, 150-300 vesículas',
          '6. ACh atraviesa hendidura: Difusión (0.5 ms)',
          '7. Unión a nAChR: 2 moléculas ACh/receptor',
          '8. Apertura canal: Entrada Na⁺, salida K⁺',
          '9. Potencial de placa motora (PPM): ~70 mV (supraumbral)',
          '10. PA muscular: Propagación por sarcolema y túbulos T',
          '11. Hidrólisis ACh: AChE (0.5 ms), termina señal',
          '12. Recaptación colina: Transportador de alta afinidad'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Componentes Moleculares',
        datos: [
          { label: 'Receptor nicotínico', value: 'Pentámero α₂βγδ (fetal) o α₂βεδ (adulto)' },
          { label: 'Conductancia', value: '25-30 pS, inespecífico a cationes' },
          { label: 'Potencial reversión', value: '0 mV (Na⁺ y K⁺)' },
          { label: 'Acetilcolinesterasa', value: 'Velocidad 25,000 ACh/segundo' },
          { label: 'Agrina', value: 'Proteína neural, agrega receptores' },
          { label: 'MuSK', value: 'Quinasa, señalización agrina-receptor' },
          { label: 'Rapsina', value: 'Proteína andamio, ancla receptores' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Miastenia gravis: Autoanticuerpos anti-nAChR, fatiga muscular fluctuante',
          'Síndrome miasténico congénito: Mutaciones en nAChR, rapsina, AChE',
          'Síndrome de Lambert-Eaton: Anti-canales Ca²⁺ presinápticos, facilitación',
          'Botulismo: Toxina botulínica escinde SNAP-25, parálisis flácida',
          'Curare: Antagonista competitivo nAChR, parálisis (anestesia)',
          'Succinilcolina: Agonista despolarizante, bloqueo fase II',
          'Anticolinesterásicos: Neostigmina, piridostigmina (tratamiento MG)',
          'Organofosforados: Insecticidas, inhibición irreversible AChE, crisis colinérgica'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Margen de Seguridad',
        items: [
          'Factor de seguridad: PPM (70 mV) >> umbral (15-20 mV)',
          'Reserva funcional: 70-80% receptores pueden bloquearse sin debilidad',
          'Facilitación: Incremento transitorio de liberación ACh (Ca²⁺ residual)',
          'Depresión: Agotamiento vesículas con estimulación rápida',
          'Quantum: Vesícula individual (miniatura, ~0.5 mV)',
          'Quantal content: ~150-300 vesículas por PA (alto)',
          'Desarrollo postnatal: Cambio γ → ε en nAChR',
          'Denervación: Dispersión receptores, fibrilaciones espontáneas'
        ]
      }
    ]
  },
  {
    id: 'musculo-cardiaco',
    nombre: 'Músculo Cardíaco',
    subtitulo: 'Estriado · Involuntario · Automaticidad',
    icono: '❤️',
    categorias: ['cardiaco', 'estriado', 'involuntario'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Cardiomiocitos: Células mononucleadas (1-2 núcleos), cilíndricas ramificadas',
          'Dimensiones: 10-20 μm diámetro, 50-100 μm longitud',
          'Núcleo: Central, eucromático',
          'Estriaciones: Patrón A-I similar a esquelético',
          'Sarcómero: 2.0-2.2 μm (más corto que esquelético)',
          'Mitocondrias: 40% volumen celular (vs 2% esquelético)',
          'Túbulos T: Más amplios, nivel línea Z (díadas, no tríadas)',
          'RS: Menos desarrollado que esquelético'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Discos Intercalares',
        items: [
          'Unión célula-célula: Conexión extremo-extremo de cardiomiocitos',
          'Escalón característico: Porción transversal y longitudinal',
          'Fascia adherens: Similar a zonula adherens, ancla actina',
          'Desmosomas (macula adherens): Filamentos intermedios (desmina)',
          'Uniones gap (nexos): Conexinas 43, 40 (acoplamiento eléctrico)',
          'Sincitio funcional: Conducción rápida de PA',
          'Tinción: Líneas oscuras transversales (H&E)',
          'Función: Transmisión fuerza + señal eléctrica'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Acoplamiento Excitación-Contracción',
        datos: [
          { label: 'PA cardíaco', value: '200-400 ms (vs 2-5 ms esquelético), meseta' },
          { label: 'Ca²⁺ externo', value: 'ESENCIAL (entra por canales L-tipo)' },
          { label: 'CICR', value: 'Calcium-Induced Calcium Release (RyR2)' },
          { label: 'Díadas', value: 'Túbulo T + 1 cisterna (vs tríadas)' },
          { label: 'Troponina I cardíaca', value: 'Isoforma específica (marcador IAM)' },
          { label: 'Refractario absoluto', value: '200-300 ms (previene tétanos)' },
          { label: 'Fuerza-frecuencia', value: 'Escalera de Bowditch (efecto Treppe)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Infarto de miocardio: Necrosis cardiomiocitos, liberación troponina I/T',
          'Miocardiopatía hipertrófica: Sarcómero (β-miosina, troponina T), hipertrofia',
          'Miocardiopatía dilatada: Disfunción contráctil, dilatación ventricular',
          'Arritmias: Canalopatías (LQTS, Brugada, CPVT)',
          'Insuficiencia cardíaca: Remodelado, disfunción SERCA2a',
          'Digitálicos: Inhiben Na⁺/K⁺-ATPasa, aumentan Ca²⁺i, inotrópico positivo',
          'Beta-bloqueantes: Reducen frecuencia, consumo O₂',
          'Calcio-antagonistas: Bloquean canales L, reducen contractilidad'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Sistema de Conducción',
        items: [
          'Nodo sinoauricular (SA): Marcapasos (60-100 lpm), aurícula derecha',
          'Nodo auriculoventricular (AV): Retraso conducción (0.1 s)',
          'Haz de His: Penetra septo interventricular',
          'Ramas derecha e izquierda: Conducción ventricular',
          'Fibras de Purkinje: Cardiomiocitos especializados, conducción rápida',
          'Células marcapasos: Potencial diastólico inestable (canales If)',
          'Despolarización espontánea: Corrientes marcapasos (Na⁺, Ca²⁺)',
          'Control autónomo: Simpático (↑ FC), parasimpático (↓ FC, ACh)'
        ]
      }
    ]
  },
  {
    id: 'musculo-liso',
    nombre: 'Músculo Liso',
    subtitulo: 'No estriado · Involuntario · Contracción sostenida',
    icono: '🌀',
    categorias: ['liso', 'visceral', 'involuntario'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Estructurales',
        items: [
          'Células fusiformes: 20 μm diámetro, 50-400 μm longitud',
          'Núcleo: Único, central, elongado (forma de cigarro)',
          'Sin estriaciones: Ausencia de organización regular sarcómeros',
          'Filamentos delgados: Actina (sin troponina, con tropomiosina)',
          'Filamentos gruesos: Miosina II (menos organizada)',
          'Relación actina:miosina: 15:1 (vs 6:1 en esquelético)',
          'Cuerpos densos: Equivalentes líneas Z, α-actinina',
          'Caveolas: Abundantes, captación Ca²⁺'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Tipos de Músculo Liso',
        items: [
          'Liso visceral (unitario): Sincitio funcional, actividad espontánea',
          'Uniones gap abundantes: Acoplamiento eléctrico célula-célula',
          'Ondas lentas: Despolarizaciones espontáneas',
          'Células marcapasos: Células intersticiales de Cajal (GI)',
          'Localización visceral: Tracto GI, útero, uréteres',
          'Liso multiunitario: Células independientes, inervación individual',
          'Sin uniones gap: Control preciso',
          'Localización multiunitario: Iris, vasos grandes, vías aéreas, músculo piloerector'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismo de Contracción',
        datos: [
          { label: 'Regulación', value: 'Ca²⁺-calmodulina (no troponina)' },
          { label: 'MLCK', value: 'Quinasa cadenas ligeras de miosina, activada por Ca²⁺-CaM' },
          { label: 'Fosforilación MLC', value: 'Necesaria para actividad ATPasa miosina' },
          { label: 'MLCP', value: 'Fosfatasa MLC, relaja músculo' },
          { label: 'RhoA/Rho-quinasa', value: 'Inhibe MLCP, sensibilización Ca²⁺' },
          { label: 'Cerrojo (latch)', value: 'Contracción sostenida, bajo consumo ATP' },
          { label: 'Velocidad', value: '100x más lento que esquelético' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Correlación Clínica',
        items: [
          'Asma: Broncoconstricción, hiperreactividad músculo liso bronquial',
          'Hipertensión: Aumento tono vascular, resistencia periférica',
          'Espasmo esofágico: Disfagia, dolor torácico',
          'Cólico renal/biliar: Espasmo ureteral/biliar, dolor intenso',
          'Dismenorrea: Contracción uterina excesiva (prostaglandinas)',
          'Tocólisis: Inhibición contracción uterina (β₂-agonistas, nifedipina)',
          'Vasodilatadores: Nitratos (NO), bloqueadores canales Ca²⁺',
          'Leiomioma (fibroma uterino): Tumor benigno músculo liso'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Regulación de la Contracción',
        items: [
          'Ca²⁺ extracelular: Entrada por canales voltaje-dependientes (L, T)',
          'Ca²⁺ del RS: Receptores IP₃ y rianodina (RyR3)',
          'Neurotransmisores: ACh (M3, contracción), noradrenalina (α₁/β₂)',
          'Hormonas: Oxitocina (útero), angiotensina II (vasos)',
          'Paracrinas: NO (relajación), endotelina-1 (contracción)',
          'Estiramiento: Canales mecanosensibles, reflejo miogénico',
          'Óxido nítrico (NO): Activa guanilato ciclasa → cGMP → relajación',
          'AMPc: PKA fosforila MLCK (inactiva), β₂-agonistas (broncodilatación)'
        ]
      }
    ]
  },
  {
    id: 'comparacion-tipos-musculares',
    nombre: 'Comparación de los Tres Tipos de Músculo',
    subtitulo: 'Esquelético · Cardíaco · Liso',
    icono: '⚖️',
    categorias: ['comparacion', 'esqueletico', 'cardiaco', 'liso'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Diferencias Estructurales',
        items: [
          'Núcleos - Esquelético: múltiples, periféricos | Cardíaco: 1-2, centrales | Liso: 1, central',
          'Estriaciones - Esquelético: sí | Cardíaco: sí | Liso: no',
          'Forma célula - Esquelético: cilíndrica larga | Cardíaco: ramificada | Liso: fusiforme',
          'Discos intercalares - Esquelético: ausentes | Cardíaco: presentes | Liso: ausentes',
          'Uniones gap - Esquelético: raras | Cardíaco: abundantes | Liso: variable',
          'Túbulos T - Esquelético: tríadas A-I | Cardíaco: díadas, línea Z | Liso: ausentes',
          'RS - Esquelético: extenso | Cardíaco: menos | Liso: escaso',
          'Mitocondrias - Esquelético: moderadas | Cardíaco: abundantes (40%) | Liso: pocas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Diferencias Funcionales',
        items: [
          'Control - Esquelético: voluntario | Cardíaco: involuntario | Liso: involuntario',
          'Inervación - Esquelético: somática | Cardíaco: autónoma | Liso: autónoma',
          'Velocidad - Esquelético: rápida | Cardíaco: intermedia | Liso: lenta',
          'Duración PA - Esquelético: 2-5 ms | Cardíaco: 200-400 ms | Liso: variable',
          'Tétanos - Esquelético: sí | Cardíaco: no (refractario largo) | Liso: tónico',
          'Fatiga - Esquelético: sí (tipo II) | Cardíaco: resistente | Liso: resistente',
          'Regeneración - Esquelético: limitada (satélites) | Cardíaco: no | Liso: sí (división)',
          'Automaticidad - Esquelético: no | Cardíaco: sí (marcapasos) | Liso: visceral sí'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Mecanismos de Contracción',
        datos: [
          { label: 'Regulación Ca²⁺', value: 'Esq: troponina C | Card: troponina C | Liso: calmodulina' },
          { label: 'Fuente Ca²⁺', value: 'Esq: RS (100%) | Card: RS 80% + externo 20% | Liso: externo + RS' },
          { label: 'Acoplamiento E-C', value: 'Esq: mecánico (DHPR-RyR1) | Card: Ca²⁺ (CICR, RyR2) | Liso: IP₃, voltaje' },
          { label: 'Proteína clave', value: 'Esq: troponina | Card: troponina | Liso: MLCK' },
          { label: 'Fosforilación', value: 'Esq: no requerida | Card: no requerida | Liso: MLC (esencial)' },
          { label: 'Cerrojo', value: 'Esq: no | Card: no | Liso: sí' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas Comparativas',
        items: [
          'Bloqueadores Ca²⁺: Cardíaco y liso (nifedipina), no afecta esquelético',
          'Relajantes musculares: Esquelético (curare), no afecta cardíaco/liso',
          'Toxina botulínica: Solo esquelético (unión neuromuscular)',
          'Nitratos: Solo liso vascular (NO → relajación)',
          'Beta-bloqueantes: Cardíaco (↓ FC) y liso bronquial (β₂)',
          'Digitálicos: Solo cardíaco (inotrópico +)',
          'Estatinas: Miopatía preferente esquelética',
          'Corticosteroides: Atrofia músculo esquelético (tipo II)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Adaptación y Plasticidad',
        items: [
          'Ejercicio - Esquelético: hipertrofia, cambio tipo fibras | Cardíaco: hipertrofia moderada | Liso: hipertrofia/hiperplasia',
          'Denervación - Esquelético: atrofia rápida | Cardíaco: no aplica | Liso: menos afectado',
          'Envejecimiento - Esquelético: sarcopenia | Cardíaco: fibrosis | Liso: rigidez vascular',
          'Hipoxia - Esquelético: ↑ capilarización | Cardíaco: vulnerable (isquemia) | Liso: angiogénesis',
          'Hormonas - Esquelético: testosterona (hipertrofia) | Cardíaco: tiroxina (↑ FC) | Liso: estrógenos (útero)',
          'Células satélite - Esquelético: presentes (regeneración) | Cardíaco: ausentes | Liso: células mesenquimales',
          'Capacidad regenerativa - Esquelético: limitada | Cardíaco: no | Liso: buena',
          'Memoria muscular - Esquelético: sí (núcleos mionucleares) | Cardíaco: no | Liso: limitada'
        ]
      }
    ]
  },
  {
    id: 'teoria-filamento-deslizante',
    nombre: 'Teoría del Filamento Deslizante',
    subtitulo: 'Huxley & Huxley (1954) · Base molecular de la contracción',
    icono: '🔄',
    categorias: ['mecanismo', 'molecular', 'contraccion'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Principios Fundamentales',
        items: [
          'Filamentos no se acortan: Longitud actina y miosina constante',
          'Deslizamiento: Filamentos delgados se deslizan sobre gruesos',
          'Líneas Z se acercan: Acortamiento del sarcómero',
          'Banda I disminuye: Solo actina, se reduce con contracción',
          'Banda A constante: Longitud miosina no cambia',
          'Zona H disminuye/desaparece: Solapamiento actina-miosina aumenta',
          'Puentes cruzados: Cabezas de miosina generan fuerza',
          'Gasto ATP: Necesario para cada ciclo de puentes'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🔬 Relación Longitud-Tensión',
        items: [
          'Longitud óptima (Lo): 2.0-2.2 μm, máximo solapamiento',
          'Tensión máxima: Mayor número de puentes cruzados activos',
          'Estiramiento >3.6 μm: Sin solapamiento, tensión cero',
          'Acortamiento <1.5 μm: Interferencia filamentos, tensión ↓',
          'Zona meseta: 1.8-2.2 μm, tensión ~100%',
          'Longitud in vivo: Músculo trabaja cerca de Lo',
          'Precarga: Estiramiento inicial (Frank-Starling en corazón)',
          'Sumación espacial: Más sarcómeros = más fuerza total'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '⚙️ Relación Fuerza-Velocidad',
        datos: [
          { label: 'Velocidad contracción', value: 'Inversamente proporcional a carga' },
          { label: 'Contracción isotónica', value: 'Acortamiento con tensión constante' },
          { label: 'Contracción isométrica', value: 'Tensión sin cambio longitud' },
          { label: 'Velocidad máxima (Vmax)', value: 'Sin carga (extrapolada)' },
          { label: 'Fuerza máxima (Po)', value: 'Isométrica (velocidad cero)' },
          { label: 'Potencia máxima', value: '~30% Vmax y Po' },
          { label: 'Ecuación Hill', value: '(P + a)(V + b) = (Po + a)b' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Aplicaciones Clínicas',
        items: [
          'Insuficiencia cardíaca: Curva Frank-Starling desplazada (menor contractilidad)',
          'Entrenamiento excéntrico: Estiramiento activo, mayor daño muscular (DOMS)',
          'Sarcopenia: Pérdida sarcómeros, menor fuerza específica',
          'Espasticidad: Acortamiento crónico, contracturas',
          'Distrofias: Pérdida filamentos, debilidad progresiva',
          'Miopatías congénitas: Desorganización sarcómeros (cores, bastones)',
          'Evaluación funcional: Dinamometría isocinética',
          'Rehabilitación: Trabajo isométrico vs isotónico'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Evidencia Experimental',
        items: [
          'Microscopía electrónica: Deslizamiento filamentos visible',
          'Difracción rayos X: Espaciado filamentos constante',
          'Marcadores fluorescentes: Seguimiento filamentos en vivo',
          'Fibras aisladas: Medición tensión a diferentes longitudes',
          'Laser trap: Medición fuerza puente cruzado individual (~5 pN)',
          'Criomicroscopía: Estructura atómica actina-miosina',
          'Mutaciones dirigidas: Efecto proteínas específicas',
          'Modelos computacionales: Predicción dinámica contracción'
        ]
      }
    ]
  }
];
