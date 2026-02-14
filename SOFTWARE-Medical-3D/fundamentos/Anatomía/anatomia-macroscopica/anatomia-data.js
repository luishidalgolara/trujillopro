// ═══════════════════════════════════════════════════════════
// ANATOMÍA DATA - Información completa de anatomía macroscópica
// Información 100% actualizada y verificada para estudiantes de medicina en Chile
// ═══════════════════════════════════════════════════════════

const ORGANELOS_DATA = [
  {
    id: 'corazon',
    nombre: 'Corazón',
    subtitulo: 'Órgano Muscular Central del Sistema Cardiovascular',
    icono: '🫀',
    categorias: ['cardiovascular', 'organos-toracicos'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Mediastino medio, entre los pulmones; 2/3 a la izquierda de la línea media esternal',
          '<strong>Tamaño:</strong> ~12 cm longitud, ~9 cm ancho, ~6 cm grosor; peso adulto 250-350g (♂), 200-300g (♀)',
          '<strong>Forma:</strong> Cono invertido con base (posterior-superior) y vértice (anterior-inferior-izquierdo)',
          '<strong>Cavidades:</strong> 4 cámaras: 2 aurículas (AD/AI) de paredes delgadas, 2 ventrículos (VD/VI) de paredes gruesas',
          '<strong>Pericardio:</strong> Saco fibroso parietal + capa serosa visceral (epicardio); espacio pericárdico con 15-50 ml líquido seroso',
          '<strong>Miocardio:</strong> Músculo cardíaco; grosor VD ~3-5mm, VI ~10-15mm (mayor presión sistémica)'
        ]
      },
      {
        titulo: '⚙️ Anatomía de las Válvulas',
        items: [
          '<strong>Válvula tricúspide:</strong> 3 valvas (anterior, posterior, septal); comunica AD→VD; anillo 10-12 cm perímetro',
          '<strong>Válvula mitral (bicúspide):</strong> 2 valvas (anterior/aórtica, posterior/mural); comunica AI→VI; anillo 8-10 cm',
          '<strong>Válvula pulmonar:</strong> 3 valvas semilunares; VD→arteria pulmonar; anillo ~7-8 cm',
          '<strong>Válvula aórtica:</strong> 3 valvas semilunares (coronarias derecha/izquierda, no coronaria); VI→aorta; anillo ~7-8 cm',
          '<strong>Cuerdas tendinosas:</strong> Fijan valvas AV a músculos papilares (anterior, posterior, septal en VD; anterolateral, posteromedial en VI)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Gasto cardíaco', value: '~5 L/min en reposo (70 ml x 70 lpm); aumenta hasta 25-30 L/min en ejercicio' },
          { label: 'Presión sistólica VI', value: '120 mmHg (normal); VD ~25 mmHg' },
          { label: 'Arterias coronarias', value: 'Coronaria izquierda (DA + Cx) 85%; Coronaria derecha 15% del miocardio' },
          { label: 'Sistema de conducción', value: 'Nodo SA (60-100 lpm) → Nodo AV → Haz de His → Ramas → Fibras de Purkinje' }
        ]
      },
      {
        titulo: '🔗 Relaciones Anatómicas',
        items: [
          '<strong>Anterior:</strong> Esternón, cartílagos costales 3°-6°, espacio pericárdico',
          '<strong>Posterior:</strong> Esófago, aorta torácica descendente, venas ácigos, columna T5-T8',
          '<strong>Lateral:</strong> Pulmones y pleuras mediastínicas, nervios frénicos',
          '<strong>Superior:</strong> Grandes vasos (aorta, tronco pulmonar, VCS), timo (vestigial en adulto)',
          '<strong>Inferior:</strong> Diafragma (centro frénico)'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Infarto agudo de miocardio:</strong> Oclusión coronaria (DA 40-50%, CD 30-40%, Cx 15-20%); necrosis miocárdica',
          '<strong>Valvulopatías:</strong> Estenosis aórtica (calcificación senil), insuficiencia mitral (prolapso, ruptura cuerdas)',
          '<strong>Taponamiento cardíaco:</strong> Acumulación rápida líquido pericárdico (>150ml) → colapso hemodinámico',
          '<strong>Hipertrofia ventricular:</strong> VI en HTA (concéntrica); VD en hipertensión pulmonar',
          '<strong>Arritmias:</strong> Fibrilación auricular (desorganización eléctrica AI), bloqueos AV (nodo AV/Haz de His)'
        ]
      }
    ]
  },
  {
    id: 'pulmon',
    nombre: 'Pulmones',
    subtitulo: 'Órganos Respiratorios Primarios',
    icono: '🫁',
    categorias: ['respiratorio', 'organos-toracicos'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Pulmón derecho:</strong> 3 lóbulos (superior, medio, inferior); 2 cisuras (oblicua/mayor, horizontal/menor); ~600g',
          '<strong>Pulmón izquierdo:</strong> 2 lóbulos (superior con língula, inferior); 1 cisura oblicua; ~500g; escotadura cardíaca',
          '<strong>Dimensiones:</strong> ~25 cm altura, ~15 cm ancho base; capacidad total ~6 L (♂), ~4.5 L (♀)',
          '<strong>Bronquios principales:</strong> Derecho más vertical/corto (2.5 cm, 25°), izquierdo más horizontal/largo (5 cm, 45°)',
          '<strong>Hilios pulmonares:</strong> Entrada de bronquios, arteria pulmonar, salida venas pulmonares, linfáticos, nervios',
          '<strong>Pleuras:</strong> Visceral (adherida al pulmón), parietal (línea torácica); espacio pleural con ~15ml líquido seroso'
        ]
      },
      {
        titulo: '⚙️ Segmentación Broncopulmonar',
        items: [
          '<strong>Pulmón derecho (10 segmentos):</strong> Lóbulo superior: apical, posterior, anterior; Lóbulo medio: lateral, medial; Lóbulo inferior: superior, basal medial, basal anterior, basal lateral, basal posterior',
          '<strong>Pulmón izquierdo (8-10 segmentos):</strong> Lóbulo superior: apicoposterior, anterior, língula superior/inferior; Lóbulo inferior: superior, basal anteromedial, basal lateral, basal posterior',
          '<strong>Bronquios segmentarios:</strong> Generación 3-4; cartílago en pared; irrigación bronquial (aorta torácica)',
          '<strong>Árbol bronquial:</strong> 23 generaciones desde tráquea hasta sacos alveolares'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Capacidad vital', value: '~4.5-5 L (♂), ~3-4 L (♀); disminuye con edad' },
          { label: 'Volumen corriente', value: '~500 ml en reposo (7 ml/kg ideal)' },
          { label: 'Frecuencia respiratoria', value: '12-20 rpm en adulto; 30-60 rpm en neonato' },
          { label: 'Superficie alveolar', value: '~70-100 m² (50 veces superficie corporal); ~300 millones alvéolos' },
          { label: 'Arterias bronquiales', value: '1-2 derechas (aorta torácica), 2 izquierdas (aorta torácica); irrigan vías aéreas y pleura' }
        ]
      },
      {
        titulo: '🔗 Relaciones Anatómicas',
        items: [
          '<strong>Medial:</strong> Corazón (escotadura cardíaca izquierda), mediastino, esófago, aorta descendente',
          '<strong>Anterior:</strong> Pared torácica anterior, esternón, músculos intercostales',
          '<strong>Posterior:</strong> Columna vertebral, costillas posteriores, músculos paravertebrales',
          '<strong>Superior (ápices):</strong> Sobrepasan 1° costilla ~2.5 cm; arteria subclavia, plexo braquial',
          '<strong>Inferior (bases):</strong> Cúpulas diafragmáticas; receso costodiafragmático'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        items: [
          '<strong>Neumonía:</strong> Consolidación alveolar; lobar (S. pneumoniae), bronconeumonía (multifocal)',
          '<strong>Atelectasia:</strong> Colapso pulmonar por obstrucción bronquial o compresión externa',
          '<strong>Neumotórax:</strong> Aire en espacio pleural; espontáneo (ruptura bulla apical) o traumático',
          '<strong>Derrame pleural:</strong> Trasudado (<3g/dL proteínas, ICC), exudado (>3g/dL, infecciones)',
          '<strong>Cáncer pulmonar:</strong> Adenocarcinoma (periferia, 40%), carcinoma escamoso (central, fumadores, 25-30%)',
          '<strong>EPOC:</strong> Enfisema (destrucción septos alveolares), bronquitis crónica (hipersecreción moco)',
          '<strong>Tromboembolismo pulmonar:</strong> Émbolo desde EEII → arteria pulmonar; lóbulos inferiores más afectados'
        ]
      }
    ]
  },
  {
    id: 'higado',
    nombre: 'Hígado',
    subtitulo: 'Glándula Más Grande del Cuerpo',
    icono: '🫘',
    categorias: ['digestivo', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Hipocondrio derecho y epigastrio; protegido por costillas 5°-10° derecha',
          '<strong>Peso:</strong> ~1.5 kg adulto (2-2.5% peso corporal); 1800g ♂, 1400g ♀',
          '<strong>Lóbulos anatómicos:</strong> Derecho (60%), izquierdo (30%), caudado, cuadrado (separados por ligamentos)',
          '<strong>Segmentación funcional (Couinaud):</strong> 8 segmentos independientes con irrigación y drenaje propios (I-VIII)',
          '<strong>Cápsula de Glisson:</strong> Tejido conectivo que envuelve hígado; se extiende al parénquima como septos',
          '<strong>Ligamentos:</strong> Falciforme (divide lóbulos), coronario (fija a diafragma), triangulares, redondo (vestigio vena umbilical)'
        ]
      },
      {
        titulo: '⚙️ Anatomía Vascular y Biliar',
        items: [
          '<strong>Irrigación dual:</strong> Arteria hepática (25%, sangre oxigenada, ramas de tronco celíaco) + Vena porta (75%, sangre nutrientes)',
          '<strong>Vena porta:</strong> Formada por unión V. mesentérica superior + V. esplénica; 8 cm longitud; divide en ramas derecha/izquierda',
          '<strong>Arteria hepática:</strong> Arteria hepática común → A. hepática propia → Ramas derecha/izquierda',
          '<strong>Drenaje venoso:</strong> 3 venas hepáticas (derecha, media, izquierda) drenan a VCI en cara posterior',
          '<strong>Vías biliares:</strong> Canalículos → conductos biliares → conductos hepáticos derecho/izquierdo → conducto hepático común (4 cm) → conducto colédoco (8 cm)',
          '<strong>Vesícula biliar:</strong> Saco piriforme 7-10 cm longitud, 30-50 ml capacidad; unida por conducto cístico (3-4 cm)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Flujo sanguíneo total', value: '~1.5 L/min (25-30% gasto cardíaco); 300 ml/min arteria hepática, 1.1 L/min porta' },
          { label: 'Producción de bilis', value: '500-1000 ml/día; almacena 30-50 ml en vesícula (concentrada 5-20x)' },
          { label: 'Regeneración', value: 'Hasta 75% puede regenerarse en 8-15 días; hiperplasia compensatoria' },
          { label: 'Estructura microscópica', value: '~1 millón lobulillos hexagonales (~1mm diámetro); sinusoides + células de Kupffer' }
        ]
      },
      {
        titulo: '🔗 Relaciones Anatómicas',
        items: [
          '<strong>Superior:</strong> Diafragma (cúpulas derecha e izquierda); impresión cardíaca lóbulo izquierdo',
          '<strong>Posterior:</strong> VCI, aorta, columna vertebral (T11-L1), pilar derecho diafragma',
          '<strong>Anterior:</strong> Pared abdominal anterior, costillas, diafragma',
          '<strong>Inferior (cara visceral):</strong> Estómago, duodeno (1° y 2° porción), colon transverso, riñón derecho, glándula suprarrenal',
          '<strong>Hilio hepático (porta hepatis):</strong> Vena porta, arteria hepática, conducto hepático; entre lóbulo cuadrado y caudado'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Cirrosis:</strong> Fibrosis difusa y nódulos regenerativos; causas: alcohol (60-70%), hepatitis viral (10%), NASH',
          '<strong>Hepatitis viral:</strong> VHA (fecal-oral), VHB (sangre/sexual), VHC (sangre); VHB/C → cronicidad/cirrosis/hepatocarcinoma',
          '<strong>Carcinoma hepatocelular:</strong> Tumor primario más común; factor de riesgo principal: cirrosis (80-90% casos)',
          '<strong>Colelitiasis:</strong> Cálculos biliares (colesterol 80%, pigmento 20%); puede causar colecistitis aguda, coledocolitiasis',
          '<strong>Hipertensión portal:</strong> Presión portal >10 mmHg; causas: cirrosis (presinusoidal), trombosis portal; complicaciones: várices esofágicas, ascitis, esplenomegalia',
          '<strong>Insuficiencia hepática aguda:</strong> Hepatitis fulminante (viral, tóxica-paracetamol); puede requerir trasplante urgente'
        ]
      }
    ]
  },
  {
    id: 'riñon',
    nombre: 'Riñones',
    subtitulo: 'Órganos Excretores del Sistema Urinario',
    icono: '🫘',
    categorias: ['urinario', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Retroperitoneo, a ambos lados columna lumbar (T12-L3); derecho 1-2 cm más bajo (hígado)',
          '<strong>Dimensiones:</strong> 10-12 cm longitud, 5-6 cm ancho, 3 cm grosor; forma de habichuela',
          '<strong>Peso:</strong> 125-170g cada uno (♂ > ♀); ~0.4% peso corporal',
          '<strong>Cápsulas:</strong> Cápsula fibrosa (adherida), cápsula adiposa (grasa perirrenal), fascia renal (Gerota)',
          '<strong>Hilio renal:</strong> Borde medial cóncavo; entrada arteria renal, salida vena renal/uréter/linfáticos',
          '<strong>Estructura interna:</strong> Corteza externa (1 cm grosor, rojiza), médula interna (8-18 pirámides renales), seno renal (grasa + pelvis renal)'
        ]
      },
      {
        titulo: '⚙️ Anatomía Funcional',
        items: [
          '<strong>Nefrona:</strong> ~1 millón por riñón; unidad funcional (corpúsculo renal + túbulo)',
          '<strong>Corpúsculo renal:</strong> Glomérulo (capilares) + cápsula de Bowman; filtración 180 L/día',
          '<strong>Túbulo contorneado proximal:</strong> 65% reabsorción Na+, H2O, glucosa, aminoácidos',
          '<strong>Asa de Henle:</strong> Mecanismo contracorriente; concentración orina (descendente permeable H2O, ascendente imperme able)',
          '<strong>Túbulo contorneado distal:</strong> Reabsorción Na+/Cl- (tiazidas), secreción K+/H+',
          '<strong>Conducto colector:</strong> Reabsorción H2O (ADH), concentración final orina; 8-20 pirámides → cálices → pelvis renal → uréter'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Flujo sanguíneo renal', value: '~1.2 L/min (20-25% gasto cardíaco); 400 ml/min por riñón' },
          { label: 'Tasa filtración glomerular', value: '90-120 ml/min/1.73m² (adulto joven); disminuye ~1 ml/min/año después 40 años' },
          { label: 'Producción orina', value: '0.5-2 L/día (depende ingesta líquidos); 1-2 ml/kg/h normal' },
          { label: 'Irrigación', value: 'Arteria renal (aorta L1-L2) → segmentarias (5) → interlobulares → arcuatas → interlobulillares → aferentes' }
        ]
      },
      {
        titulo: '🔗 Relaciones Anatómicas',
        items: [
          '<strong>Riñón derecho:</strong> Anterior: hígado, duodeno (2° porción), colon ascendente; Posterior: diafragma, 12° costilla, músculos psoas/cuadrado lumbar',
          '<strong>Riñón izquierdo:</strong> Anterior: estómago, bazo, páncreas (cola), colon descendente, yeyuno; Posterior: diafragma, 11°-12° costillas, músculos',
          '<strong>Superior:</strong> Glándulas suprarrenales (piramidales 4-6g cada una)',
          '<strong>Medial:</strong> Columna vertebral, aorta (izquierda), VCI (derecha)',
          '<strong>Uréteres:</strong> 25-30 cm longitud; descienden sobre psoas → cruzan vasos ilíacos comunes → entran vejiga (trígono vesical)'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Enfermedad renal crónica:</strong> TFG <60 ml/min >3 meses; causas principales: DM2 (40%), HTA (30%), glomerulopatías',
          '<strong>Insuficiencia renal aguda:</strong> Aumento creatinina sérica >0.3 mg/dl en 48h; prerenal (hipovolemia 70%), renal (NTA), posrenal (obstrucción)',
          '<strong>Litiasis renal:</strong> Cálculos renales (oxalato calcio 70-80%, ácido úrico 5-10%, estruvita 10-15%); dolor cólico lumbar→ingle',
          '<strong>Pielonefritis aguda:</strong> Infección bacteriana vía ascendente; E. coli 80-90%; fiebre, dolor lumbar, piuria',
          '<strong>Glomerulonefritis:</strong> Daño glomerular; puede ser post-estreptocócica, membranosa, IgA, GESF',
          '<strong>Carcinoma células renales:</strong> 85% tumores renales malignos; tríada clásica: hematuria, masa palpable, dolor lumbar (10-15%)',
          '<strong>Poliquistosis renal:</strong> Autosómica dominante (PKD1/PKD2); quistes múltiples bilaterales → insuficiencia renal progresiva'
        ]
      }
    ]
  },
  {
    id: 'cerebro',
    nombre: 'Cerebro',
    subtitulo: 'Centro de Control del Sistema Nervioso',
    icono: '🧠',
    categorias: ['nervioso', 'organos-cefalicos'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Peso:</strong> ~1.3-1.4 kg adulto (2% peso corporal); consume 20% O₂ y glucosa',
          '<strong>Hemisferios cerebrales:</strong> Derecho e izquierdo separados por fisura longitudinal; unidos por cuerpo calloso (200 millones axones)',
          '<strong>Lóbulos cerebrales:</strong> Frontal (planificación, motor), parietal (sensorial), temporal (auditivo, memoria), occipital (visual)',
          '<strong>Sustancia gris:</strong> Corteza cerebral (2-4 mm grosor, 6 capas); núcleos basales profundos (estriado, globo pálido, núcleo accumbens)',
          '<strong>Sustancia blanca:</strong> Axones mielinizados; fibras de asociación (mismo hemisferio), comisurales (entre hemisferios), proyección (corteza↔médula)',
          '<strong>Ventrículos:</strong> 2 laterales (hemisferios), 3° (diencéfalo), 4° (tronco); ~150 ml LCR total circulante'
        ]
      },
      {
        titulo: '⚙️ Anatomía Funcional por Región',
        items: [
          '<strong>Lóbulo frontal:</strong> Corteza motora primaria (área 4, giro precentral), área premotora (6), área de Broca (44-45, lenguaje expresivo), corteza prefrontal (ejecutiva)',
          '<strong>Lóbulo parietal:</strong> Corteza somatosensorial primaria (áreas 1-2-3, giro postcentral), área asociativa (5-7), integración sensorial',
          '<strong>Lóbulo temporal:</strong> Corteza auditiva primaria (41-42, giro de Heschl), área de Wernicke (22, comprensión lenguaje), hipocampo (memoria)',
          '<strong>Lóbulo occipital:</strong> Corteza visual primaria (V1/área 17, cisura calcarina), áreas visuales secundarias (18-19)',
          '<strong>Diencéfalo:</strong> Tálamo (relevo sensorial), hipotálamo (homeostasis, 4g), epitálamo (glándula pineal, melatonina)',
          '<strong>Ganglios basales:</strong> Núcleo caudado + putamen (estriado), globo pálido, núcleo subtalámico, sustancia nigra; control motor fino'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Neuronas', value: '~86 mil millones; corteza ~16 mil millones; cerebelo ~69 mil millones' },
          { label: 'Células gliales', value: '~85 mil millones (astrocitos, oligodendrocitos, microglía); proporción 1:1 con neuronas' },
          { label: 'Flujo sanguíneo cerebral', value: '750 ml/min (15% gasto cardíaco); 50 ml/100g tejido/min' },
          { label: 'Superficie cortical', value: '~2500 cm² (plegada en circunvoluciones); grosor 1.5-4.5 mm' },
          { label: 'Longitud axonal total', value: '~150,000-180,000 km en cerebro adulto' }
        ]
      },
      {
        titulo: '🔗 Irrigación Arterial (Polígono de Willis)',
        items: [
          '<strong>Arterias carótidas internas:</strong> 80% irrigación cerebral; ramas: oftálmica, comunicante posterior, coroidea anterior, cerebral anterior/media',
          '<strong>Arterias vertebrales:</strong> 20% irrigación; unen→arteria basilar→cerebrales posteriores; irrigan tronco, cerebelo, lóbulos occipitales',
          '<strong>Arteria cerebral anterior:</strong> Cara medial hemisferios, lóbulo frontal medial, área motora pierna',
          '<strong>Arteria cerebral media:</strong> Cara lateral hemisferios; áreas motoras/sensitivas cara/brazo, áreas lenguaje',
          '<strong>Arteria cerebral posterior:</strong> Lóbulos occipitales, temporal inferior, tálamo, mesencéfalo',
          '<strong>Drenaje venoso:</strong> Venas cerebrales superficiales/profundas→senos durales (sagital superior, transverso, sigmoideo)→venas yugulares internas'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>ACV isquémico:</strong> 85% ACV; oclusión arterial→infarto; ACM más frecuente (hemiplejía faciobraquial, afasia); tratamiento: trombólisis <4.5h',
          '<strong>ACV hemorrágico:</strong> 15% ACV; hemorragia intracerebral (HTA, angiopatía amiloide) o subaracnoidea (ruptura aneurisma)',
          '<strong>Enfermedad de Alzheimer:</strong> Demencia neurodegenerativa; placas β-amiloide, ovillos tau; atrofia corteza temporal-parietal, hipocampo',
          '<strong>Enfermedad de Parkinson:</strong> Degeneración neuronas dopaminérgicas sustancia nigra; bradicinesia, rigidez, temblor en reposo',
          '<strong>Epilepsia:</strong> Descargas neuronales excesivas; focal (lóbulo temporal 60%) o generalizada',
          '<strong>Traumatismo craneoencefálico:</strong> Hematoma epidural (arteria meníngea media), subdural (venas puente), contusión cerebral',
          '<strong>Tumores cerebrales primarios:</strong> Glioblastoma (astrocitos malignos), meningioma (meninges, benigno 90%), meduloblastoma (cerebelo pediátrico)'
        ]
      }
    ]
  },
  {
    id: 'estomago',
    nombre: 'Estómago',
    subtitulo: 'Órgano Digestivo con Función de Reservorio y Digestión',
    icono: '🫃',
    categorias: ['digestivo', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Cuadrante superior izquierdo abdomen, epigastrio-hipocondrio izquierdo',
          '<strong>Capacidad:</strong> 50 ml vacío (colapsado), 1-1.5 L con comida, hasta 4 L máximo (distensión)',
          '<strong>Regiones anatómicas:</strong> Cardias (unión esofágica), fundus (cúpula superior), cuerpo (mayor parte), antro (porción distal), píloro (esfínter)',
          '<strong>Curvaturas:</strong> Menor (cóncava, 10 cm, orientación derecha) vs Mayor (convexa, 40 cm, orientación izquierda)',
          '<strong>Capas pared:</strong> Mucosa (pliegues/rugae), submucosa, muscular (longitudinal, circular, oblicua), serosa (peritoneo visceral)',
          '<strong>Esfínteres:</strong> Cardias (esfínter esofágico inferior, previene reflujo), píloro (controla vaciamiento, grosor 3-5 mm)'
        ]
      },
      {
        titulo: '⚙️ Anatomía Celular y Secretora',
        items: [
          '<strong>Glándulas fúndicas (cuerpo-fundus):</strong> Células parietales (HCl, factor intrínseco), células principales (pepsinógeno), células enteroendocrinas',
          '<strong>Glándulas pilóricas (antro):</strong> Secretan moco y gastrina (células G)',
          '<strong>Células parietales:</strong> 1 billón en estómago; secretan HCl (pH 1.5-3.5) y factor intrínseco (absorción B12)',
          '<strong>Células principales:</strong> Producen pepsinógeno I y II → pepsina (proteólisis)',
          '<strong>Células mucosas:</strong> Moco protector (previene autodigestión), bicarbonato (neutraliza HCl)',
          '<strong>Células enteroendocrinas:</strong> Histamina (ECL), somatostatina (D), gastrina (G), grelina (X1/A, hambre)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Secreción gástrica diaria', value: '1.5-3 L jugo gástrico; HCl ~0.16 M (pH 1.5-2)' },
          { label: 'Vaciamiento gástrico', value: 'Líquidos: 30-120 min; Sólidos: 2-6 horas; carbohidratos>proteínas>grasas' },
          { label: 'Irrigación arterial', value: 'Curvatura menor: gástrica izquierda+derecha (tronco celíaco); Curvatura mayor: gastroepiploica izq/der (esplénica/gastroduodenal)' },
          { label: 'Drenaje venoso', value: 'Vena porta hepática (gástrica izquierda/derecha, gastroepiploicas)' }
        ]
      },
      {
        titulo: '🔗 Relaciones Anatómicas',
        items: [
          '<strong>Anterior:</strong> Lóbulo izquierdo hígado, pared abdominal anterior, diafragma',
          '<strong>Posterior (lecho gástrico):</strong> Páncreas, riñón izquierdo/suprarrenal, bazo, diafragma (pilar izquierdo), aorta, tronco celíaco',
          '<strong>Superior (fundus):</strong> Diafragma (cúpula izquierda), base pulmón izquierdo',
          '<strong>Inferior:</strong> Colon transverso (a través de omento mayor)',
          '<strong>Izquierda:</strong> Bazo (ligamento gastroesplénico con vasos gástricos cortos)'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Úlcera péptica gástrica:</strong> Disrupción mucosa; causas: H. pylori (60-80%), AINEs (20%); antro/curvatura menor más frecuentes',
          '<strong>Gastritis:</strong> Inflamación mucosa; aguda (alcohol, AINEs, estrés) o crónica (H. pylori, autoinmune→anemia perniciosa)',
          '<strong>Adenocarcinoma gástrico:</strong> Cáncer más frecuente estómago (90%); intestinal (antro, H. pylori) vs difuso (células en anillo sello, linitis plástica)',
          '<strong>GERD (reflujo gastroesofágico):</strong> Incompetencia cardias; pirosis, esofagitis, Barrett (metaplasia→displasia→adenocarcinoma esofágico)',
          '<strong>Gastroparesia:</strong> Vaciamiento retardado; causa más frecuente: neuropatía diabética',
          '<strong>Síndrome de Zollinger-Ellison:</strong> Gastrinoma (páncreas 70%)→hipergastrinemia→úlceras múltiples refractarias',
          '<strong>Cirugía bariátrica:</strong> Bypass gástrico Roux-en-Y (reservorio 30 ml), manga gástrica (75% resección curvatura mayor)'
        ]
      }
    ]
  }
];
