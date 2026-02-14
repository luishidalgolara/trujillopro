// ═══════════════════════════════════════════════════════════
// ANATOMÍA DATA 8 - Sistemas Óseo, Muscular y Tegumentario
// Información 100% actualizada y verificada para estudiantes de medicina en Chile
// ═══════════════════════════════════════════════════════════

const ANATOMIA_DATA_8 = [
  {
    id: 'esqueleto-axial',
    nombre: 'Esqueleto Axial',
    subtitulo: 'Cráneo, Columna Vertebral y Tórax Óseo',
    icono: '💀',
    categorias: ['oseo'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Cráneo (22 huesos):</strong> Neurocráneo (8 huesos: frontal, 2 parietales, 2 temporales, occipital, etmoides, esfenoides), viscerocráneo (14 huesos faciales)',
          '<strong>Suturas craneales:</strong> Coronal (frontal-parietales), sagital (parietales), lambdoidea (parietales-occipital); fontanelas neonato (anterior cierra 18-24 meses)',
          '<strong>Columna vertebral:</strong> 33 vértebras: 7 cervicales, 12 torácicas, 5 lumbares, 5 sacras (fusionadas), 4 coccígeas (fusionadas)',
          '<strong>Curvaturas:</strong> Primarias (cifosis torácica, sacra), secundarias (lordosis cervical 3 meses, lumbar 12 meses); escoliosis lateral patológica',
          '<strong>Vértebra tipo:</strong> Cuerpo (anterior, soporte peso), arco vertebral (posterior), proceso espinoso, transversos, articulares; foramen vertebral→canal medular',
          '<strong>Tórax óseo:</strong> 12 pares costillas (verdaderas 1-7, falsas 8-10, flotantes 11-12), esternón (manubrio, cuerpo, xifoides); protege corazón/pulmones'
        ]
      },
      {
        titulo: '⚙️ Características Especiales por Región',
        items: [
          '<strong>Atlas (C1):</strong> Sin cuerpo vertebral; masas laterales con facetas articulares superiores (cóndilos occipitales); permite flexoextensión cabeza (sí)',
          '<strong>Axis (C2):</strong> Proceso odontoides (diente); articulación atlantoaxial; permite rotación cabeza (no)',
          '<strong>C7 (vértebra prominente):</strong> Proceso espinoso largo palpable; referencia anatómica',
          '<strong>Vértebras torácicas:</strong> Carillas costales (cuerpo + procesos transversos); articulación costillas; foramen vertebral circular pequeño',
          '<strong>Vértebras lumbares:</strong> Cuerpo masivo; proceso espinoso cuadrangular horizontal; foramen triangular; soportan mayor peso',
          '<strong>Sacro:</strong> 5 vértebras fusionadas; forma triangular; canal sacro; forámenes sacros (nervios espinales); articulación iliosacra; promontorio S1'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Longitud columna', value: '~70 cm adulto (♂), ~60 cm (♀); 25% discos intervertebrales' },
          { label: 'Discos intervertebrales', value: 'Anillo fibroso (colágeno tipo I) + núcleo pulposo (agua 80%, proteoglicanos); amortiguación' },
          { label: 'Canal vertebral', value: 'Cervical más ancho (médula + raíces); lumbar: solo cola de caballo (L1-L2)' },
          { label: 'Diámetro cráneo neonato', value: 'Biparietal ~9.5 cm; puede moldear en parto; craneosinostosis prematura→craneotomía' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Hernia núcleo pulposo:</strong> Protrusión disco (L4-L5, L5-S1 más frecuentes); compresión raíz nerviosa; ciática (L5 pie caído, S1 pérdida reflejo aquíleo); RM diagnóstico; conservador vs discectomía',
          '<strong>Estenosis canal lumbar:</strong> Degenerativa (edad); claudicación neurogénica (mejora flexión, peor extensión); resonancia; laminectomía descompresiva',
          '<strong>Fractura vertebral compresión:</strong> Osteoporosis; mínimo trauma; dolor, cifosis; vertebroplastia/cifoplastia; riesgo fracturas múltiples',
          '<strong>Fractura odontoides:</strong> Trauma cervical alto; tipo II (base) inestable; collarín rígido, eventual fusión C1-C2; riesgo lesión medular',
          '<strong>Escoliosis idiopática:</strong> Curvatura lateral >10°; adolescentes; curva torácica derecha típica; Cobb >40-50° considerar cirugía (instrumentación + fusión)',
          '<strong>Espondilolisis/espondilolistesis:</strong> Defecto pars interarticularis (L5 más común); desplazamiento anterior vértebra; deportistas (gimnasia); dolor lumbar; grados I-V (Meyerding)'
        ]
      }
    ]
  },
  {
    id: 'esqueleto-apendicular',
    nombre: 'Esqueleto Apendicular',
    subtitulo: 'Miembros Superiores e Inferiores',
    icono: '🦴',
    categorias: ['oseo'],
    secciones: [
      {
        titulo: '📋 Miembro Superior',
        items: [
          '<strong>Cint ura escapular:</strong> Clavícula (única unión ósea MMSS a esqueleto axial, articulación esternoclavicular), escápula (acromial, cuerpo, espina, cavidad glenoidea)',
          '<strong>Húmero:</strong> Hueso largo brazo; cabeza (articulación glenohumeral), cuello anatómico/quirúrgico, tubérculos mayor/menor (inserción manguito rotador), surco bicipital, troclea/cóndilo (articulación codo)',
          '<strong>Antebrazo:</strong> Radio (lateral, móvil, tuberosidad bicipital, apófisis estiloides), cúbito (medial, fijo, olécranon, apófisis coronoides); membrana interósea',
          '<strong>Mano:</strong> Carpo (8 huesos: escafoides, semilunar, piramidal, pisiforme / trapecio, trapezoide, grande, ganchoso), metacarpo (5), falanges (14: 3 por dedo excepto pulgar 2)',
          '<strong>Fracturas frecuentes:</strong> Clavícula 1/3 medio, Colles (radio distal, caída mano extendida), escafoides (fosa tabaquera, riesgo necrosis avascular)',
          '<strong>Articulación hombro:</strong> Glenohumeral (esférica, mayor movilidad); labrum (fibrocartílago estabiliza); luxaciones anteriores 95% (caída brazo abducido)'
        ]
      },
      {
        titulo: '📋 Miembro Inferior',
        items: [
          '<strong>Cintura pélvica:</strong> Huesos coxales (ilion, isquion, pubis fusionados); acetábulo (articulación cadera); pelvis verdadera (obstétrica) vs falsa',
          '<strong>Fémur:</strong> Hueso más largo/fuerte; cabeza (ligamento redondo), cuello (125° ángulo), trocánter mayor/menor, diáfisis, cóndilos medial/lateral (rodilla), rótula anterior',
          '<strong>Tibia:</strong> Medial, soporte peso 80%; meseta tibial (articulación rodilla), tuberosidad anterior (inserción tendón rotuliano), maléolo medial',
          '<strong>Peroné (fíbula):</strong> Lateral, soporte 20%; cabeza (articulación proximal), maléolo lateral (pinza tobillo); no articulación rodilla directa',
          '<strong>Pie:</strong> Tarso (7: calcáneo, astrágalo, navicular, cuboides, 3 cuneiformes), metatarso (5), falanges (14); arcos longitudinal medial/lateral, transverso',
          '<strong>Articulación rodilla:</strong> Tibiofemoral + patelofemoral; meniscos (medial C, lateral O); LCA/LCP (estabilidad anteroposterior), LCM/LCL (lateral); lesión triada O\'Donoghue (LCA+LCM+menisco medial)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Huesos cuerpo adulto', value: '206 huesos (80 axiales, 126 apendiculares); neonato ~270 (cartílago→osificación)' },
          { label: 'Longitud fémur', value: '♂ ~48 cm, ♀ ~44 cm; ~27% estatura; hueso largo mayor resistencia (carga 1000 kg vertical)' },
          { label: 'Ángulo cuello femoral', value: '125° adulto; coxa valga >135°, coxa vara <120°; patológico altera mecánica cadera' },
          { label: 'Osificación', value: 'Primaria (fetal), secundaria (posnatal); placas crecimiento cierran pubertad; último cierre: clavícula medial ~25 años' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Fractura cadera (cuello femoral):</strong> Ancianos osteoporosis; subcapital, transcervical, intertrocantérica; intracapsular riesgo necrosis avascular (irrigación circunfleja medial); artroplastia/fijación',
          '<strong>Fractura diáfisis femoral:</strong> Trauma alto impacto; hemorragia importante (1-2 L); clavo endomedular bloqueado; consolidación 3-6 meses',
          '<strong>Fractura meseta tibial:</strong> Trauma varo/valgo rodilla; afecta superficie articular; Schatzker clasificación (I-VI); RAFI si desplazada; artrosis postraumática frecuente',
          '<strong>Fractura tobillo:</strong> Weber A (infrasindesmosis), B (sindesmosis), C (suprasindesmosis); Lauge-Hansen clasifica mecanismo; inestables requieren RAFI',
          '<strong>Luxación hombro:</strong> Anterior 95% (caída abducción-rotación externa); lesión Bankart (labrum), Hill-Sachs (defecto posterolateral cabeza humeral); reducción cerrada, eventual Bankart arthroscopic',
          '<strong>Osteoporosis:</strong> Densidad ósea -2.5 SD (T-score); fracturas por fragilidad (columna, cadera, muñeca); bifosfonatos, denosumab, TRH; calcio 1200 mg/día + vitamina D'
        ]
      }
    ]
  },
  {
    id: 'sistema-muscular',
    nombre: 'Sistema Muscular Esquelético',
    subtitulo: 'Músculos del Movimiento y Postura',
    icono: '💪',
    categorias: ['muscular'],
    secciones: [
      {
        titulo: '📋 Tipos y Organización',
        items: [
          '<strong>Tipos músculo:</strong> Esquelético (estriado voluntario, 640 músculos), liso (involuntario, vísceras), cardíaco (estriado involuntario)',
          '<strong>Composición músculo esquelético:</strong> 75% agua, 20% proteínas (miosina, actina, tropomiosina), 5% lípidos/glucógeno/sales',
          '<strong>Fibras musculares:</strong> Tipo I (oxidativas lentas, rojo, resistencia, maratón), Tipo IIa (oxidativo-glucolíticas rápidas), Tipo IIb/IIx (glucolíticas rápidas, blanco, fuerza, sprint)',
          '<strong>Organización fascículos:</strong> Paralelo (sartorio), penniforme (vasto medial), bipenniforme (recto femoral), multipenniforme (deltoides)',
          '<strong>Unidad motora:</strong> 1 motoneurona α + fibras musculares inervadas (3-2000); pequeñas (ojo, mano) vs grandes (cuádriceps)',
          '<strong>Acción muscular:</strong> Agonista (principal), antagonista (opone), sinergista (ayuda), fijador (estabiliza origen)'
        ]
      },
      {
        titulo: '⚙️ Músculos Principales por Región',
        items: [
          '<strong>Cabeza-cuello:</strong> Masetero/temporal (masticación), esternocleidomastoideo (rotación cabeza), trapecio (elevación hombro)',
          '<strong>Tórax:</strong> Pectoral mayor (aducción brazo), intercostales (respiración), diafragma (principal músculo inspiratorio)',
          '<strong>Abdomen:</strong> Recto abdominal (flexión tronco), oblicuos externo/interno (rotación), transverso (prensa abdominal)',
          '<strong>Dorso:</strong> Dorsal ancho (aducción-extensión brazo), erector espinae (extensión columna), manguito rotador (supraespinoso, infraespinoso, redondo menor, subescapular)',
          '<strong>MMSS:</strong> Bíceps (flexión codo), tríceps (extensión), deltoides (abducción), flexores/extensores antebrazo',
          '<strong>MMII:</strong> Cuádriceps (extensión rodilla), isquiotibiales (flexión rodilla), glúteos (extensión cadera), gemelos (flexión plantar), tibial anterior (dorsiflexión)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Masa muscular', value: '♂ ~42% peso corporal, ♀ ~36%; disminuye con edad (sarcopenia 1-2%/año >50 años)' },
          { label: 'Fuerza músculo', value: '3-4 kg/cm² sección transversal; cuádriceps puede generar >500 kg fuerza' },
          { label: 'Contracción', value: 'Isotónica (cambia longitud, concéntrica/excéntrica), isométrica (sin cambio longitud, aumenta tensión)' },
          { label: 'ATP muscular', value: 'Reservas ~5 mM (2-3 segundos); fosfocreatina (10 seg); glucólisis (2 min); oxidación (horas)' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Distrofia muscular Duchenne:</strong> Ligada X; déficit distrofina; debilidad proximal progresiva (marcha pato, Gowers); pseudohipertrofia gemelar; CK muy ↑; corticoides, eventual silla ruedas ~12 años',
          '<strong>Miastenia gravis:</strong> Autoinmune anti-receptor acetilcolina; debilidad fluctuante (mejora reposo); ptosis, diplopía, disfagia; timoma 10%; piridostigmina, timectomía',
          '<strong>Rabdomiólisis:</strong> Destrucción músculo; CPK >5000; mioglobinuria (orina té); causas: trauma, estatinas, ejercicio extremo, hipertermia; hidratación IV, alcalinización; riesgo IRA',
          '<strong>Desgarro muscular:</strong> Grados I (microlesión), II (ruptura parcial), III (ruptura completa); isquiotibiales, gemelos frecuente; RICE, fisioterapia; grado III puede requerir cirugía',
          '<strong>Síndrome compartimental:</strong> ↑Presión compartimento→isquemia muscular/nerviosa; fractura tibial, crush injury; 5 Ps: Pain, Pressure, Pallor, Paresthesia, Pulselessness; fasciotomía urgente',
          '<strong>Polimialgia reumática:</strong> >50 años; dolor proximal bilateral (hombros, caderas), rigidez matutina; VSG muy ↑; asociada arteritis células gigantes; corticoides respuesta dramática'
        ]
      }
    ]
  },
  {
    id: 'piel',
    nombre: 'Piel (Sistema Tegumentario)',
    subtitulo: 'Órgano Más Grande del Cuerpo',
    icono: '🧴',
    categorias: ['tegumentario'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Dimensiones:</strong> ~2 m² superficie adulto; peso 4-5 kg (16% peso corporal); grosor 0.5 mm (párpados) a 4 mm (plantas)',
          '<strong>Capas:</strong> Epidermis (epitelio estratificado queratinizado), dermis (tejido conectivo), hipodermis (tejido adiposo subcutáneo)',
          '<strong>Epidermis (5 estratos):</strong> Basal (mitosis), espinoso, granuloso, lúcido (palmas/plantas), córneo (queratinocitos muertos); renovación 28 días',
          '<strong>Tipos celulares epidérmicos:</strong> Queratinocitos (95%, queratina), melanocitos (pigmento), Langerhans (inmunidad), Merkel (tacto)',
          '<strong>Dermis:</strong> Papilar (superficial, papilas dérmicas, capilares) + reticular (profundo, colágeno tipo I, elastina); glándulas, folículos, vasos, nervios',
          '<strong>Hipodermis:</strong> Tejido adiposo; aislamiento térmico, reserva energética, amortiguación; grosor variable (abdomen >extremidades)'
        ]
      },
      {
        titulo: '⚙️ Anexos y Funciones',
        items: [
          '<strong>Glándulas sudoríparas ecrinas:</strong> 3-4 millones; todo el cuerpo; conducto directo poro; sudor hipotónico (Na⁺, Cl⁻); termorregulación',
          '<strong>Glándulas sudoríparas apocrinas:</strong> Axilas, genitales, areolas; conducto a folículo; secreción lechosa (proteínas, lípidos); actividad pubertad; olor corporal (bacterias)',
          '<strong>Glándulas sebáceas:</strong> Anexas folículos (excepto palmas/plantas); sebo (lípidos); lubricación piel/pelo; andrógeno-dependientes; acné pubertad',
          '<strong>Folículo piloso:</strong> Invaginación epidérmica; pelo (queratina dura); músculo erector pili (piloereccion); ~5 millones (100,000 cuero cabelludo)',
          '<strong>Uñas:</strong> Queratina dura (α-queratina); lecho ungueal, matriz (crecimiento), lúnula, cutícula; crecimiento 3 mm/mes manos, 1 mm/mes pies',
          '<strong>Funciones piel:</strong> Barrera (infecciones, agua, UV), termorregulación (sudoración, vasodilatación/constricción), sensibilidad (Meissner, Pacini, Merkel, Ruffini), síntesis vitamina D (UVB), inmunidad (Langerhans)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Pérdida agua transepidérmica', value: '~300-400 ml/día (insensible); ↑↑↑ quemaduras (puede ser litros)' },
          { label: 'Melanina', value: 'Eumelanina (marrón-negra) + feomelanina (amarilla-roja); cantidad melanocitos igual todas razas (actividad diferente)' },
          { label: 'Líneas de Langer', value: 'Orientación fibras colágeno; incisiones paralelas→mejor cicatrización; perpendiculares→cicatriz ensanchada' },
          { label: 'Irrigación cutánea', value: '5-10% gasto cardíaco reposo; hasta 60% termorregulación (calor extremo); plexos dérmicos superficial/profundo' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Melanoma:</strong> Cáncer melanocitos; ABCDE (Asimetría, Bordes, Color, Diámetro >6mm, Evolución); Breslow grosor (pronóstico); ganglio centinela; metástasis frecuentes; ipilimumab, nivolumab, vemurafenib',
          '<strong>Carcinoma basocelular:</strong> Cáncer piel más común; zonas fotoexpuestas; pápula perlada, telangiectasias, ulceración central; crecimiento lento, raramente metastatiza; extirpación quirúrgica, Mohs',
          '<strong>Carcinoma escamoso cutáneo:</strong> Queratosis actínica precursor; nódulo/úlcera; puede metastatizar (5-10%); alto riesgo: labio, oreja, inmunosupresión; cirugía, radioterapia',
          '<strong>Psoriasis:</strong> Autoinmune; hiperproliferación queratinocitos (renovación 3-5 días vs 28); placas eritematosas descamativas plateadas; codos, rodillas, cuero cabelludo; fenómeno Koebner; corticoides tópicos, fototerapia, biológicos (anti-TNF)',
          '<strong>Dermatitis atópica (eczema):</strong> Predisposición genética (filagrina); barrera cutánea defectuosa; prurito, xerosis, lesiones eccematosas; flexuras; emolientes, corticoides tópicos, inhibidores calcineurina',
          '<strong>Quemaduras:</strong> Grado I (eritema, epidermis), II superficial (flictenas, dermis papilar), II profunda (dermis reticular), III (espesor completo, blanca/carbonizada); regla 9s; reanimación Parkland (4 ml Ringer/kg/%SCQ 24h)'
        ]
      }
    ]
  }
];
