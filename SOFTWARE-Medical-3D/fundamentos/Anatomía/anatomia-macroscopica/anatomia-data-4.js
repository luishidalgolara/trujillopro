// ═══════════════════════════════════════════════════════════
// ANATOMÍA DATA 4 - Sistema Respiratorio Completo
// Información 100% actualizada y verificada para estudiantes de medicina en Chile
// ═══════════════════════════════════════════════════════════

const ANATOMIA_DATA_4 = [
  {
    id: 'nariz',
    nombre: 'Nariz y Cavidad Nasal',
    subtitulo: 'Entrada del Sistema Respiratorio',
    icono: '👃',
    categorias: ['respiratorio', 'organos-cefalicos'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Nariz externa:</strong> Raíz (nasion), dorso, punta (ápex), alas, ventanas nasales (narinas)',
          '<strong>Esqueleto nasal:</strong> Huesos nasales (1/3 superior), cartílagos septales/alares (2/3 inferior); móvil y flexible',
          '<strong>Cavidad nasal:</strong> Dos fosas separadas por tabique nasal; comunican con nasofaringe posteriormente (coanas)',
          '<strong>Tabique nasal:</strong> Porción ósea (vómer, lámina perpendicular etmoides), porción cartilaginosa (cartílago septal)',
          '<strong>Cornetes nasales:</strong> 3 pliegues óseos (superior, medio, inferior) en pared lateral; aumentan superficie ~150 cm²',
          '<strong>Meatos:</strong> Espacios debajo cornetes; superior (drenaje etmoides posterior/esfenoidal), medio (etmoides anterior/frontal/maxilar), inferior (conducto nasolagrimal)'
        ]
      },
      {
        titulo: '⚙️ Funciones y Mucosa Nasal',
        items: [
          '<strong>Calentamiento:</strong> Temperatura aire ambiental→34-36°C antes de alcanzar faringe; plexos venosos cornetes (tejido eréctil)',
          '<strong>Humidificación:</strong> Aire inspirado alcanza 80-90% humedad relativa; mucosa secreta ~1 L líquido/día',
          '<strong>Filtración:</strong> Vibrisas (pelos) filtran partículas grandes; moco atrapa partículas <10 μm; barrido mucociliar',
          '<strong>Olfato:</strong> Epitelio olfatorio en techo cavidad nasal (~10 cm²); neuronas bipolares (I par craneal); 350 receptores diferentes',
          '<strong>Resonancia vocal:</strong> Senos paranasales actúan como cámaras de resonancia; timbre de voz',
          '<strong>Reflejo estornudo:</strong> Protección ante irritantes; nervio trigémino (V2)→centro bulbar→expiración forzada'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Flujo aéreo nasal', value: '~70% respiración reposo; 50% cada fosa (alterna cada 2-6h, ciclo nasal)' },
          { label: 'Irrigación', value: 'Arteria esfenopalatina (rama A. maxilar) + A. etmoidal anterior (A. oftálmica); área de Kiesselbach (epistaxis)' },
          { label: 'Inervación sensitiva', value: 'V1 (etmoidal anterior, punta nasal), V2 (mayoría cavidad, nervio nasopalatino)' },
          { label: 'Senos paranasales', value: 'Maxilares (más grandes 15 ml), frontales, etmoidales, esfenoidales; reducen peso cráneo, resonancia' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Epistaxis (hemorragia nasal):</strong> 90% área de Kiesselbach (plexo Kiesselbach, tabique anterior); causas: trauma digital, sequedad, HTA; posterior más grave',
          '<strong>Rinitis alérgica:</strong> IgE-mediada; estornudos, rinorrea, prurito, congestión; mediadores: histamina, leucotrienos; tratamiento: antihistamínicos, corticoides tópicos',
          '<strong>Sinusitis aguda:</strong> Infección bacteriana senos (S. pneumoniae, H. influenzae); obstrucción ostium→ estasis→infección; cefalea, rinorrea purulenta',
          '<strong>Desviación septal:</strong> Desviación tabique (congénita 20%, trauma); obstrucción nasal unilateral; puede requerir septoplastia',
          '<strong>Pólipos nasales:</strong> Masas mucosa hipertrófica; asociados asma, rinosinusitis crónica; tríada aspirina (Samter): asma + pólipos + intolerancia AAS',
          '<strong>Fractura nasal:</strong> Trauma facial más común; crepitación, deformidad, epistaxis; reducción <2 semanas; hematoma septal (emergencia→necrosis cartílago)'
        ]
      }
    ]
  },
  {
    id: 'faringe',
    nombre: 'Faringe',
    subtitulo: 'Vía Común Digestiva y Respiratoria',
    icono: '🫁',
    categorias: ['respiratorio', 'digestivo'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Definición:</strong> Tubo musculomembranoso 12-14 cm; desde base cráneo hasta C6 (esófago)',
          '<strong>Nasofaringe:</strong> C1-C2; posterior a cavidad nasal; coanas→torus tubario (trompa Eustaquio); adenoides (tejido linfoide niños)',
          '<strong>Orofaringe:</strong> C2-C3; posterior a cavidad oral; límite superior paladar blando, inferior epiglotis; amígdalas palatinas (fauces)',
          '<strong>Hipofaringe (laringofaringe):</strong> C3-C6; posterior a laringe; senos piriformes (laterales), receso retroaritenóideo; continúa con esófago',
          '<strong>Músculos constrictores:</strong> Superior, medio, inferior; superpuestos como tejas; constricción durante deglución',
          '<strong>Músculos elevadores:</strong> Estilofaríngeo, palatofaríngeo, salpingofaríngeo; elevan faringe durante deglución'
        ]
      },
      {
        titulo: '⚙️ Funciones y Deglución',
        items: [
          '<strong>Vía aérea:</strong> Conducción aire nariz/boca→laringe durante respiración',
          '<strong>Vía digestiva:</strong> Propulsión alimento boca→esófago durante deglución',
          '<strong>Fase oral deglución:</strong> Voluntaria; lengua impulsa bolo→orofaringe',
          '<strong>Fase faríngea:</strong> Involuntaria/refleja; paladar blando cierra nasofaringe, epiglotis cierra laringe, constrictores impulsan bolo, EES (cricofaríngeo) se relaja',
          '<strong>Anillo de Waldeyer:</strong> Tejido linfoide: adenoides (nasofaringe), amígdalas palatinas (orofaringe), amígdala lingual (base lengua); inmunidad primera línea',
          '<strong>Trompa de Eustaquio:</strong> Conecta oído medio-nasofaringe; iguala presiones; músculo tensor del velo palatino abre durante deglución/bostezo'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Longitud faringe', value: '12-14 cm desde base cráneo (C1) hasta esófago (C6)' },
          { label: 'Diámetro', value: 'Nasofaringe ~3 cm, orofaringe ~3.5 cm (colapsa en apnea sueño)' },
          { label: 'Irrigación', value: 'Arterias faríngeas ascendentes (carótida externa), palatinas, linguales' },
          { label: 'Inervación sensitiva', value: 'Nasofaringe: V2; Orofaringe: IX (glosofaríngeo); Hipofaringe: X (vago)' },
          { label: 'Inervación motora', value: 'Plexo faríngeo (IX + X); estilofaríngeo solo IX' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Faringitis aguda:</strong> Infección viral (70-80%, rinovirus, adenovirus) o bacteriana (Streptococcus pyogenes 15-30%); odinofagia, eritema faríngeo',
          '<strong>Absceso periamigdalino:</strong> Complicación faringitis bacteriana; colección pus detrás amígdala; trismus, uvula desviada, voz "en papa caliente"; drenaje urgente',
          '<strong>Apnea obstructiva del sueño:</strong> Colapso orofaringe durante sueño; obesidad, hipertrofia amígdalas; ronquidos, apneas, somnolencia diurna; CPAP, cirugía',
          '<strong>Carcinoma nasofaríngeo:</strong> Asociado VEB; mayor incidencia China/sudeste asiático; masa cervical, epistaxis, obstrucción nasal; radioterapia sensible',
          '<strong>Carcinoma escamoso orofaringe:</strong> VPH+ (mayoría jóvenes, mejor pronóstico) vs tabaco/alcohol (>60 años); masa cervical, odinofagia, disfagia',
          '<strong>Disfagia orofaríngea:</strong> Dificultad iniciar deglución; ACV, Parkinson, ELA, miastenia; atragantamiento, aspiración, neumonía; videofluoroscopia diagnóstico'
        ]
      }
    ]
  },
  {
    id: 'laringe',
    nombre: 'Laringe',
    subtitulo: 'Órgano de Fonación y Protección Vía Aérea',
    icono: '🗣️',
    categorias: ['respiratorio'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> C3-C6; anterior a hipofaringe; continúa con tráquea en C6',
          '<strong>Cartílagos:</strong> Tiroides (manzana Adán, ángulo 90° ♂, 120° ♀), cricoides (único anillo completo), epiglotis (elástico, protege vía aérea)',
          '<strong>Cartílagos aritenoides:</strong> Pares; móviles sobre cricoides; rotación/deslizamiento→abducción/aducción cuerdas vocales',
          '<strong>Cuerdas vocales:</strong> Verdaderas (fonación, ligamento vocal + músculo tiroaritenoideo), falsas (vestibulares, protección)',
          '<strong>Glotis:</strong> Espacio entre cuerdas vocales verdaderas; aducción→fonación, abducción→respiración',
          '<strong>Músculos intrínsecos:</strong> Cricoaritenoideo posterior (único abductor, abre glotis), cricoaritenoideo lateral (aductor), tiroaritenoideo (tensor), cricotiroideo (tensor)'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Protección vía aérea:</strong> Cierre glotis durante deglución; reflejo tusígeno (receptores irritantes); epiglotis bascula sobre entrada',
          '<strong>Fonación:</strong> Vibración cuerdas vocales por flujo aéreo espiratorio; tensión/longitud cuerda→tono (frecuencia fundamental ♂ 100-150 Hz, ♀ 180-250 Hz)',
          '<strong>Maniobra Valsalva:</strong> Cierre glotis + aumento presión intratorácica; defecación, parto, levantamiento peso',
          '<strong>Reflejo de la tos:</strong> Cierre glotis→↑presión subglótica→apertura súbita→expulsión 100-160 km/h',
          '<strong>Control respiratorio:</strong> Abducción glotis (inspiración), aducción parcial (espiración controlada)',
          '<strong>Articulación:</strong> Modificación sonido laríngeo por resonadores (faringe, cavidad oral, nasal); formantes vocálicos'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Dimensiones laringe', value: 'Longitud ~4-5 cm (♂), ~3.5 cm (♀); diámetro ~4 cm' },
          { label: 'Cuerdas vocales', value: 'Longitud ♂ 17-25 mm, ♀ 12-17 mm; vibran 100-1000 Hz (conversación-canto)' },
          { label: 'Irrigación', value: 'Arteria laríngea superior (tiroidea superior), A. laríngea inferior (tiroidea inferior)' },
          { label: 'Inervación', value: 'Nervio laríngeo superior (sensitivo + cricotiroideo), N. laríngeo recurrente (resto músculos)' },
          { label: 'Cartílago cricoides', value: 'Único anillo completo vía aérea; punto anatómico cricoideo (cricotiroidotomía emergencia)' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Parálisis cuerdas vocales:</strong> Lesión N. laríngeo recurrente (cirugía tiroidea, tumor pulmonar, aneurisma aórtico); unilateral→disfonía; bilateral→estridor, disnea',
          '<strong>Laringitis aguda:</strong> Infección viral; disfonía, tos seca; edema cuerdas vocales; reposo vocal, hidratación',
          '<strong>Crup (laringotraqueobronquitis):</strong> Niños 6m-3 años; virus parainfluenza; estridor inspiratorio, tos "perruna", disfonía; dexametasona, adrenalina nebulizada',
          '<strong>Epiglotitis aguda:</strong> Emergencia; H. influenzae tipo b (vacuna↓incidencia); fiebre alta, disfagia, estridor, posición trípode; no examinar orofaringe (espasmo laríngeo)',
          '<strong>Edema angioneurótico laríngeo:</strong> Alérgico o hereditario (déficit C1-INH); edema rápido epiglotis/aritenoides; obstrucción vía aérea; epinefrina, corticoides, intubar/cricotiroidotomía',
          '<strong>Carcinoma laríngeo:</strong> 95% escamoso; tabaco + alcohol; síntoma temprano: disfonía persistente (>2 semanas); glótico mejor pronóstico; laringoscopia + biopsia',
          '<strong>Intubación orotraqueal:</strong> Tubo 7-8 mm ♂, 6.5-7.5 mm ♀; pasa cuerdas vocales; complicación: lesión aritenoides, granulomas, estenosis subglótica'
        ]
      }
    ]
  },
  {
    id: 'traquea',
    nombre: 'Tráquea',
    subtitulo: 'Conducto Aéreo Principal',
    icono: '🫁',
    categorias: ['respiratorio'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> C6 (cartílago cricoides)→T4-T5 (carina); porción cervical (5-6 cm) + torácica (6-7 cm)',
          '<strong>Longitud:</strong> ~10-12 cm adulto; diámetro ~2 cm (♂), ~1.5 cm (♀)',
          '<strong>Anillos cartilaginosos:</strong> 16-20 anillos en forma C (abiertos posterior); hialinos; mantienen permeabilidad',
          '<strong>Pared posterior:</strong> Membranosa (músculo traqueal liso); contacta esófago; contracción→↓diámetro (tos)',
          '<strong>Carina:</strong> Bifurcación tráquea en bronquios principales derecho/izquierdo; nivel T4-T5; muy sensible (reflejo tusígeno)',
          '<strong>Mucosa:</strong> Epitelio cilíndrico pseudoestratificado ciliado + células caliciformes (moco); barrido mucociliar ascendente 1 cm/min'
        ]
      },
      {
        titulo: '⚙️ Funciones y Relaciones',
        items: [
          '<strong>Conducción aérea:</strong> Vía principal laringe→bronquios; resistencia ~50% total vía aérea',
          '<strong>Calentamiento y humidificación:</strong> Continúa acondicionamiento aire iniciado en cavidad nasal',
          '<strong>Limpieza mucociliar:</strong> Escalera mecánica; cilios baten hacia laringe; moco atrapa partículas→deglución/expectoración',
          '<strong>Reflejo tusígeno:</strong> Receptores irritantes en carina; aferencia vago→centro bulbar→tos (cierre glotis→↑presión→expulsión explosiva)',
          '<strong>Relaciones cervicales:</strong> Anterior: istmo tiroideo (2°-4° anillos), venas tiroideas; posterior: esófago; lateral: lóbulos tiroideos, paquetes vasculonerviosos',
          '<strong>Relaciones torácicas:</strong> Anterior: timo (niños), arco aórtico, tronco braquiocefálico; posterior: esófago; lateral: nervio laríngeo recurrente izquierdo, arco aórtico'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Capacidad vital', value: 'Volumen espacio muerto anatómico ~150 ml (30% volumen corriente)' },
          { label: 'Cilios', value: '~200 cilios por célula; baten 10-20 veces/segundo; velocidad barrido ~1 cm/min' },
          { label: 'Producción moco', value: '~100 ml/día; 95% agua, 3% glicoproteínas (mucinas), 1% sales' },
          { label: 'Irrigación', value: 'Arterias traqueales (tiroidea inferior, bronquiales); plexo submucoso' },
          { label: 'Bronquio derecho', value: 'Más vertical (25°), corto (2.5 cm), ancho→cuerpos extraños se alojan más frecuente' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Traqueostomía:</strong> Apertura tráquea (entre 2°-3° anillos); indicaciones: ventilación prolongada, obstrucción vía aérea superior, higiene bronquial; complicaciones: estenosis, sangrado',
          '<strong>Estenosis traqueal:</strong> Post-intubación (isquemia mucosa), post-traqueostomía, congénita; disnea, estridor; broncoscopia + dilatación/resección',
          '<strong>Traqueomalacia:</strong> Debilidad pared traqueal; colapso dinámico espiración; niños (congénita), adultos (post-intubación, EPOC); estridor espiratorio, sibilancias',
          '<strong>Cuerpo extraño traqueal:</strong> Niños; bronquio derecho más frecuente (más vertical); triada: tos súbita, asfixia, cianosis; broncoscopia rígida urgente',
          '<strong>Fístula traqueoesofágica:</strong> Congénita (atresia esofágica) o adquirida (intubación prolongada, tumor); neumonía aspirativa; reparación quirúrgica',
          '<strong>Carcinoma traqueal:</strong> Raro (<0.1% tumores respiratorios); escamoso o adenoide quístico; disfonía, hemoptisis, estridor; resección quirúrgica',
          '<strong>Traqueítis bacteriana:</strong> Niños; post-infección viral; fiebre alta, aspecto tóxico, estridor; S. aureus; antibióticos IV, posible intubación'
        ]
      }
    ]
  },
  {
    id: 'bronquios',
    nombre: 'Árbol Bronquial',
    subtitulo: 'Sistema de Distribución Aérea Pulmonar',
    icono: '🌳',
    categorias: ['respiratorio'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Bronquios principales:</strong> Derecho (más vertical 25°, corto 2.5 cm, ancho) e izquierdo (más horizontal 45°, largo 5 cm); entran pulmones por hilios',
          '<strong>Bronquios lobares:</strong> Derecho: 3 lobares (superior, medio, inferior); Izquierdo: 2 lobares (superior con língula, inferior)',
          '<strong>Bronquios segmentarios:</strong> 10 segmentos derecha, 8-10 izquierda; unidades funcionalmente independientes (resecables quirúrgicamente)',
          '<strong>Generaciones bronquiales:</strong> 23 generaciones desde tráquea→sacos alveolares; 0-16 conducción, 17-23 respiratorias',
          '<strong>Bronquiolos:</strong> <1 mm diámetro, sin cartílago; terminales (conducción pura) + respiratorios (algunos alvéolos en pared)',
          '<strong>Cambios estructurales:</strong> ↓cartílago, ↓altura epitelio, ↑músculo liso, ↓glándulas mucosas con cada generación'
        ]
      },
      {
        titulo: '⚙️ Anatomía Funcional',
        items: [
          '<strong>Zona conductora:</strong> Generaciones 0-16; conducción y acondicionamiento aire; espacio muerto anatómico ~150 ml',
          '<strong>Zona respiratoria:</strong> Generaciones 17-23; bronquiolos respiratorios, conductos alveolares, sacos alveolares; intercambio gaseoso',
          '<strong>Músculo liso bronquial:</strong> Inervación parasimpática (broncoconstricción, acetilcolina M3) y simpática (broncodilatación, β2-adrenérgicos)',
          '<strong>Control tono bronquial:</strong> Parasimpático (vago) predomina; β2-agonistas (salbutamol) relajan músculo→broncodilatación',
          '<strong>Células epiteliales:</strong> Ciliadas (barrido mucoso), caliciformes (moco), Clara (surfactante bronquiolar, detoxificación), neuroendocrinas',
          '<strong>BALT (tejido linfoide bronquial):</strong> Inmunidad local; macrófagos alveolares, linfocitos, IgA secretora'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Generaciones totales', value: '23 desde tráquea (gen 0) hasta sacos alveolares (gen 23)' },
          { label: 'Área sección transversal', value: 'Tráquea 2.5 cm²→bronquiolos terminales 1000 cm²→alvéolos 70-100 m²' },
          { label: 'Velocidad flujo aéreo', value: 'Tráquea 400 cm/s→bronquiolos 1 cm/s→alvéolos difusión (sin flujo bulk)' },
          { label: 'Resistencia vía aérea', value: '50% en nariz-faringe-laringe, 25% tráquea-bronquios, 25% bronquiolos' },
          { label: 'Producción surfactante', value: 'Células Clara (bronquiolos) + neumocitos II (alvéolos); ↓tensión superficial' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Asma bronquial:</strong> Inflamación crónica vía aérea; hiperreactividad bronquial; broncoespasmo, edema, hipersecreción mucosa; sibilancias, disnea; tratamiento escalonado: β2-agonistas + corticoides inhalados',
          '<strong>Bronquitis crónica:</strong> Componente EPOC; tos productiva ≥3 meses/año por ≥2 años; hipertrofia glándulas mucosas, metaplasia escamosa; tabaquismo; hipersecreción crónica',
          '<strong>Bronquiectasias:</strong> Dilatación irreversible bronquios; fibrosis quística, infecciones (tuberculosis, Pseudomonas), discinesia ciliar; hemoptisis, infecciones recurrentes',
          '<strong>Bronquiolitis:</strong> Infección viral (VRS) niños <2 años; inflamación bronquiolos; sibilancias, tiraje, hipoxemia; soporte (O₂, hidratación)',
          '<strong>Bronquiolitis obliterante:</strong> Fibrosis bronquiolos→obstrucción fija; post-trasplante (rechazo crónico), tóxicos, infecciones; disnea progresiva; mal pronóstico',
          '<strong>Cuerpo extraño bronquial:</strong> Niños; maní, semillas; bronquio derecho más frecuente; atelectasia distal, neumonía; broncoscopia rígida extracción',
          '<strong>Carcinoma broncogénico:</strong> Adenocarcinoma (periferia, no fumadores), escamoso (central, fumadores), células pequeñas (central, muy agresivo); tos, hemoptisis, disnea'
        ]
      }
    ]
  }
];
