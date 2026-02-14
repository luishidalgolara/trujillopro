// ═══════════════════════════════════════════════════════════
// ANATOMÍA DATA 2 - Sistema Nervioso Completo
// Información 100% actualizada y verificada para estudiantes de medicina en Chile
// ═══════════════════════════════════════════════════════════

const ANATOMIA_DATA_2 = [
  {
    id: 'cerebelo',
    nombre: 'Cerebelo',
    subtitulo: 'Centro de Coordinación Motora y Equilibrio',
    icono: '🧠',
    categorias: ['nervioso', 'organos-cefalicos'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Fosa craneal posterior, debajo del lóbulo occipital; separado por tienda del cerebelo (tentorio)',
          '<strong>Peso:</strong> ~150g adulto (10% peso cerebral total); 10% neuronas del SNC contiene 80% de todas las neuronas',
          '<strong>Dimensiones:</strong> 10 cm ancho transversal, 5 cm anteroposterior, 6 cm altura',
          '<strong>Divisiones:</strong> Vermis (línea media, control tronco), hemisferios cerebelosos (laterales, control extremidades)',
          '<strong>Lóbulos:</strong> Anterior (espinoso), posterior (pontino, más grande), floculonodular (vestibular)',
          '<strong>Sustancia gris:</strong> Corteza cerebelosa (3 capas: molecular, Purkinje, granular), núcleos profundos (dentado, interpuesto, fastigio)'
        ]
      },
      {
        titulo: '⚙️ Anatomía Funcional',
        items: [
          '<strong>Corteza cerebelosa:</strong> Células de Purkinje (única salida cortical, GABA inhibitoria), células granulares (excitatorias), células en cesta/estrelladas',
          '<strong>Núcleo dentado:</strong> Mayor núcleo cerebeloso; proyecta a tálamo (VL/VA)→corteza motora; control movimientos finos extremidades',
          '<strong>Pedúnculos cerebelosos:</strong> Superior (eferencias a mesencéfalo/tálamo), medio (aferencias desde puente), inferior (conexiones bulbo/médula)',
          '<strong>Vestibulocerebelo:</strong> Lóbulo floculonodular; control equilibrio, movimientos oculares (VOR)',
          '<strong>Espinocerebelo:</strong> Vermis + zonas paravermianas; coordinación marcha, postura tronco/proximal',
          '<strong>Cerebrocerebelo:</strong> Hemisferios laterales; planificación motora, sincronización temporal, funciones cognitivas'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Neuronas totales', value: '~69 mil millones (80% del total cerebral); principalmente células granulares' },
          { label: 'Células de Purkinje', value: '~15-26 millones; única salida corteza cerebelosa; 1 dendrita con 200,000 sinapsis' },
          { label: 'Superficie cortical', value: '~1800 cm² (muy plegada en folias); 50% superficie corteza cerebral' },
          { label: 'Capas corticales', value: '3 capas (vs 6 en corteza cerebral): molecular, Purkinje, granular' }
        ]
      },
      {
        titulo: '🔗 Conexiones Neurales',
        items: [
          '<strong>Aferencias:</strong> Tracto espinocerebeloso (propiocepción), núcleos pontinos (corteza cerebral), núcleo olivar inferior (información sensorial-error motor)',
          '<strong>Eferencias:</strong> A través de núcleos profundos→tálamo (VL/VA)→corteza motora primaria/premotora; control descendente motor',
          '<strong>Vías espinocerebelosas:</strong> Dorsal (miembros inferiores inconsciente), ventral (reflejos medulares), cuneocerebelosa (MMSS)',
          '<strong>Circuito cerebrocerebelo-tálamo-cortical:</strong> Planificación y ejecución movimientos voluntarios complejos'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Ataxia cerebelosa:</strong> Incoordinación motora; dismetría (sobrepasar objetivo), disdiadococinesia (movimientos alternantes alterados), marcha de base amplia',
          '<strong>Síndrome cerebeloso:</strong> Hemisférico (ipsilateral, extremidades), vermiano (tronco, marcha), floculonodular (equilibrio, nistagmo)',
          '<strong>ACV cerebeloso:</strong> Territorio PICA (posterior-inferior), AICA (anterior-inferior), SCA (superior); emergencia neuroquirúrgica si edema',
          '<strong>Degeneración cerebelosa alcohólica:</strong> Atrofia vermis; marcha atáxica, disartria; déficit tiamina (B1)',
          '<strong>Ataxias hereditarias:</strong> Friedreich (triple repetición GAA), ataxias espinocerebelosas (SCA), atrofia multisistémica',
          '<strong>Meduloblastoma:</strong> Tumor maligno pediátrico más común fosa posterior; células embrionarias; vermis cerebeloso'
        ]
      }
    ]
  },
  {
    id: 'tronco-encefalico',
    nombre: 'Tronco Encefálico',
    subtitulo: 'Centro Vital de Control Autonómico',
    icono: '🧠',
    categorias: ['nervioso', 'organos-cefalicos'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Componentes:</strong> Mesencéfalo (superior, 2 cm), puente/protuberancia (medio, 2.5 cm), bulbo raquídeo (inferior, 3 cm)',
          '<strong>Ubicación:</strong> Base del cráneo, anterior al cerebelo; continúa con médula espinal en foramen magno (C1)',
          '<strong>Mesencéfalo:</strong> Tectum (colículos superiores/inferiores), tegmento (sustancia nigra, núcleo rojo, PAG), pedúnculos cerebrales',
          '<strong>Puente:</strong> Núcleos pontinos (relevo a cerebelo), núcleos pares craneales V-VIII, formación reticular',
          '<strong>Bulbo raquídeo:</strong> Pirámides (tractos corticoespinales), olivas (núcleo olivar inferior), núcleos pares IX-XII',
          '<strong>Sustancia reticular:</strong> Red neuronal difusa; regula conciencia, ciclo sueño-vigilia, dolor'
        ]
      },
      {
        titulo: '⚙️ Centros Vitales y Pares Craneales',
        items: [
          '<strong>Centro respiratorio:</strong> Grupos neuronales bulboprotuberanciales; generador patrón respiratorio; quimiorreceptores CO₂/pH',
          '<strong>Centro cardiovascular:</strong> Bulbo raquídeo; control presión arterial, frecuencia cardíaca vía nervio vago (X)',
          '<strong>Pares craneales mesencefálicos:</strong> III oculomotor (elevación párpado, mayoría MOE), IV troclear (oblicuo superior)',
          '<strong>Pares craneales pontinos:</strong> V trigémino (sensibilidad facial), VI abducens (recto lateral), VII facial (expresión facial), VIII vestibulococlear (audición/equilibrio)',
          '<strong>Pares craneales bulbares:</strong> IX glosofaríngeo (gusto 1/3 post, deglución), X vago (parasimpático), XI accesorio (ECM/trapecio), XII hipogloso (lengua)',
          '<strong>Formación reticular:</strong> Sistema activador reticular ascendente (SARA); mantiene vigilia y conciencia'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Longitud total', value: '~7.5 cm (mesencéfalo 2 cm + puente 2.5 cm + bulbo 3 cm)' },
          { label: 'Flujo sanguíneo', value: '~15-20% gasto cardíaco total; arterias vertebrales + basilar' },
          { label: 'Sustancia nigra', value: 'Neuronas dopaminérgicas (A9); pigmento neuromelanina; conexión a estriado' },
          { label: 'Acueducto de Silvio', value: 'Conecta 3° y 4° ventrículos; ~1 mm diámetro; estenosis causa hidrocefalia' },
          { label: 'Decusación piramidal', value: '85-90% fibras corticoespinales cruzan en bulbo caudal (nivel C1)' }
        ]
      },
      {
        titulo: '🔗 Vías Neurales Principales',
        items: [
          '<strong>Vías motoras descendentes:</strong> Tracto corticoespinal (piramidal), corticobulbar (pares craneales), rubroespinal, reticuloespinal',
          '<strong>Vías sensitivas ascendentes:</strong> Lemnisco medial (tacto fino, propiocepción), espinotalámico (dolor, temperatura)',
          '<strong>Sistema límbico-PAG:</strong> Sustancia gris periacueductal; modulación dolor, conducta emocional, vocalización',
          '<strong>Conexiones cerebelosas:</strong> Pedúnculos cerebelosos superior/medio/inferior; coordinación motora bidireccional'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Síndrome de Wallenberg:</strong> ACV arteria cerebelosa posteroinferior (PICA); disfonía, disfagia, síndrome de Horner, ataxia ipsilateral',
          '<strong>Síndrome de Weber:</strong> Lesión mesencéfalo ventral; parálisis III par ipsilateral + hemiparesia contralateral',
          '<strong>Síndrome de Parinaud:</strong> Lesión tectum mesencefálico; parálisis mirada vertical, signo de Collier, pupilas arreactivas',
          '<strong>Síndrome de enclaustramiento (locked-in):</strong> Lesión ventral puente; tetraparesia, anartria; conciencia preservada; comunicación vertical mirada',
          '<strong>Apnea central del sueño:</strong> Disfunción centro respiratorio bulbar; pausas respiratorias sin esfuerzo',
          '<strong>Herniación transtentorial:</strong> Compresión mesencéfalo; pupilas midriáticas (III par), decerebración, coma',
          '<strong>Glioma difuso tronco:</strong> Tumor infiltrativo pontino (DIPG); pediátrico; pronóstico muy pobre; parálisis pares craneales'
        ]
      }
    ]
  },
  {
    id: 'medula-espinal',
    nombre: 'Médula Espinal',
    subtitulo: 'Vía de Conducción y Centro Reflejo',
    icono: '🦴',
    categorias: ['nervioso'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Conducto vertebral; desde foramen magno (continua con bulbo) hasta L1-L2 (cono medular adulto)',
          '<strong>Longitud:</strong> ~45 cm adulto (♂), ~42 cm (♀); termina más alto que columna (L1-L2 vs cóccix)',
          '<strong>Diámetro:</strong> ~1 cm promedio; engrosamientos: cervical (C5-T1, MMSS 13 mm) y lumbar (L1-S2, MMII 12 mm)',
          '<strong>Segmentos:</strong> 31 pares: 8 cervicales, 12 torácicos, 5 lumbares, 5 sacros, 1 coccígeo',
          '<strong>Estructura interna:</strong> Sustancia gris (forma H, cuerpos neuronales), sustancia blanca (tractos mielinizados)',
          '<strong>Cauda equina:</strong> Raíces nerviosas L2-Co1 dentro del saco dural (médula termina antes que canal vertebral)'
        ]
      },
      {
        titulo: '⚙️ Anatomía Funcional',
        items: [
          '<strong>Astas anteriores (motoras):</strong> Motoneuronas α (fibras extrafusales), motoneuronas γ (fibras intrafusales), neuronas simpáticas (T1-L2)',
          '<strong>Astas posteriores (sensitivas):</strong> Láminas I-VI Rexed; neuronas segundo orden dolor, tacto, temperatura',
          '<strong>Astas laterales:</strong> T1-L2 (simpático), S2-S4 (parasimpático); neuronas preganglionares autonómicas',
          '<strong>Sustancia blanca:</strong> Cordones anterior (motor), lateral (mixto), posterior (sensitivo)',
          '<strong>Tractos ascendentes:</strong> Fascículo grácil/cuneiforme (tacto discriminativo), espinotalámico lateral (dolor/temperatura), espinocerebelosos',
          '<strong>Tractos descendentes:</strong> Corticoespinal lateral (85-90%, cruzado), corticoespinal anterior (10-15%, directo), rubroespinal, vestibuloespinal'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Peso', value: '~35g adulto; ~26 millones neuronas' },
          { label: 'Meninges', value: 'Duramadre (externa), aracnoides (media), piamadre (adherida); espacio epidural con grasa/plexos venosos' },
          { label: 'LCR espinal', value: '~75 ml en espacio subaracnoideo espinal (total 150 ml SNC); presión 5-15 cmH₂O' },
          { label: 'Irrigación arterial', value: 'Arteria espinal anterior (2/3 anteriores) + arterias espinales posteriores (1/3 posterior); arterias radiculares (Adamkiewicz T9-T12)' },
          { label: 'Dermatomas', value: 'Áreas cutáneas inervadas por raíz espinal específica; C6 pulgar, T4 tetilla, T10 ombligo, L5 dorso pie' }
        ]
      },
      {
        titulo: '🔗 Reflejos Espinales',
        items: [
          '<strong>Reflejo miotático (estiramiento):</strong> Monosináptico; Ia→α-motoneurona; patelar (L3-L4), aquíleo (S1-S2), bicipital (C5-C6)',
          '<strong>Reflejo flexor (retira):</strong> Polisináptico; nociceptores→interneuronas→flexores (activación) + extensores (inhibición)',
          '<strong>Reflejo extensor cruzado:</strong> Extensión extremidad contralateral durante flexión ipsilateral',
          '<strong>Reflejo cremastérico:</strong> T12-L1; elevación testículo por estimulación muslo interno',
          '<strong>Reflejo bulbocavernoso:</strong> S2-S4; contracción esfínter anal por presión glande/clítoris'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Lesión medular completa:</strong> Nivel sensitivo-motor definido; tetraplejia (cervical), paraplejia (torácica-lumbar); vejiga neurogénica',
          '<strong>Síndrome medular central:</strong> Lesión sustancia gris central (siringomielia, trauma); disociación termoalgésica; MMSS > MMII',
          '<strong>Síndrome de Brown-Séquard:</strong> Hemisección medular; ipsilateral: debilidad motora, pérdida tacto fino; contralateral: pérdida dolor/temperatura',
          '<strong>Síndrome de cono medular:</strong> Lesión L1-L2; vejiga arrefléxica, anestesia en silla de montar, impotencia; LMN',
          '<strong>Síndrome cauda equina:</strong> Compresión raíces L2-S5; ciática bilateral, retención urinaria, incontinencia fecal; emergencia quirúrgica',
          '<strong>Esclerosis lateral amiotrófica (ELA):</strong> Degeneración motoneuronas superiores + inferiores; debilidad progresiva, fasciculaciones, espasticidad',
          '<strong>Siringomielia:</strong> Cavidad quística intramedular; compresión comisura gris anterior; disociación termoalgésica suspendida; Chiari malformación asociada'
        ]
      }
    ]
  },
  {
    id: 'nervios-perifericos',
    nombre: 'Nervios Periféricos',
    subtitulo: 'Sistema de Comunicación Entre SNC y Periferia',
    icono: '⚡',
    categorias: ['nervioso'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Definición:</strong> Nervios fuera del SNC; incluyen 12 pares craneales y 31 pares espinales',
          '<strong>Composición:</strong> Axones (fibras nerviosas) + tejido conectivo (endoneuro, perineuro, epineuro)',
          '<strong>Tipos de fibras:</strong> Sensitivas (aferentes), motoras (eferentes), autonómicas (simpáticas/parasimpáticas)',
          '<strong>Clasificación por velocidad:</strong> Fibras Aα (70-120 m/s, propiocepción), Aβ (30-70 m/s, tacto), Aδ (5-30 m/s, dolor agudo), C (0.5-2 m/s, dolor crónico)',
          '<strong>Nervios espinales:</strong> Formados por unión raíz dorsal (sensitiva, ganglio DRG) + raíz ventral (motora)',
          '<strong>Plexos nerviosos:</strong> Redes de nervios espinales entrelazados; cervical (C1-C4), braquial (C5-T1), lumbar (L1-L4), sacro (L4-S4)'
        ]
      },
      {
        titulo: '⚙️ Nervios Principales Miembro Superior',
        items: [
          '<strong>Nervio axilar (C5-C6):</strong> Deltoides, redondo menor; sensibilidad hombro lateral (insignia); lesión: luxación hombro',
          '<strong>Nervio musculocutáneo (C5-C7):</strong> Bíceps, braquial, coracobraquial; sensibilidad antebrazo lateral; lesión rara (fractura húmero proximal)',
          '<strong>Nervio mediano (C5-T1):</strong> Flexores antebrazo, tenar, lumbricales I-II; sensibilidad palma lateral/dedos I-III; lesión: síndrome túnel carpiano, signo OK',
          '<strong>Nervio cubital (C8-T1):</strong> Flexor cubital del carpo, interóseos, hipotenar, lumbricales III-IV; sensibilidad dedos IV-V; lesión: garra cubital, signo Froment',
          '<strong>Nervio radial (C5-T1):</strong> Tríceps, extensores antebrazo/muñeca/dedos; sensibilidad dorso mano; lesión: muñeca caída (parálisis del sábado), fractura húmero medio',
          '<strong>Plexo braquial:</strong> Troncos (superior/medio/inferior), divisiones (anterior/posterior), fascículos (lateral/posterior/medial); lesiones: Erb-Duchenne (C5-C6), Klumpke (C8-T1)'
        ]
      },
      {
        titulo: '⚙️ Nervios Principales Miembro Inferior',
        items: [
          '<strong>Nervio femoral (L2-L4):</strong> Cuádriceps (extensión rodilla), iliopsoas, sartorio; sensibilidad muslo anterior/pierna medial; lesión: abolición reflejo patelar',
          '<strong>Nervio obturador (L2-L4):</strong> Aductores muslo; sensibilidad muslo medial; lesión: dificultad aducción, marcha anserina',
          '<strong>Nervio ciático (L4-S3):</strong> Mayor nervio del cuerpo; isquiotibiales, todos músculos pierna/pie; división: peroneo común + tibial',
          '<strong>Nervio peroneo común (L4-S2):</strong> Peroneos (eversión), extensores pie/dedos; sensibilidad dorso pie; lesión: pie caído, marcha en steppage',
          '<strong>Nervio tibial (L4-S3):</strong> Tríceps sural, flexores pie/dedos; sensibilidad planta pie; lesión: pérdida flexión plantar, no camina en puntillas',
          '<strong>Nervio safeno (rama femoral):</strong> Sensitivo puro; pierna medial y pie medial; daño frecuente cirugía rodilla'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Longitud total nervios', value: '~75 km en cuerpo humano; axones hasta >1 metro (ciático L4 a dedo gordo)' },
          { label: 'Velocidad conducción', value: 'Mielinizadas: 50-120 m/s; Amielínicas: 0.5-2 m/s; Aα más rápidas (propiocepción)' },
          { label: 'Regeneración', value: '1-5 mm/día desde lesión; meses-años para recuperación funcional; Wallerian degeneration distal' },
          { label: 'Dermatomas claves', value: 'C6 pulgar, C7 dedo medio, C8 meñique, L5 dedo gordo, S1 borde lateral pie' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Síndrome túnel carpiano:</strong> Compresión nervio mediano en túnel carpiano; parestesias nocturnas I-III dedos; signo Tinel/Phalen positivo; tenosinovitis, embarazo, DM',
          '<strong>Parálisis radial ("parálisis del sábado"):</strong> Compresión nervio radial (húmero medio); muñeca caída, pérdida extensión dedos; borrachera con brazo sobre respaldo',
          '<strong>Lesión nervio peroneo común:</strong> Compresión cabeza peroné/cuello fíbula; pie caído, pérdida dorsiflexión; marcha en steppage; cruzar piernas, yeso apretado',
          '<strong>Neuropatía diabética:</strong> Más común: polineuropatía distal simétrica (guante-calcetín); fibras pequeñas (dolor/temperatura) primero; control glicémico crucial',
          '<strong>Síndrome Guillain-Barré:</strong> Polineuropatía aguda desmielinizante post-infección; debilidad ascendente, arreflexia; disociación albúmino-citológica LCR; puede requerir VM',
          '<strong>Neuropatía por atrapamiento:</strong> Túnel carpiano (mediano), túnel cubital (codo, cubital), túnel tarsiano (tibial posterior)',
          '<strong>Lesión plexo braquial obstétrica:</strong> Erb-Duchenne (C5-C6): waiter\'s tip; Klumpke (C8-T1): garra mano; tracción parto'
        ]
      }
    ]
  }
];
