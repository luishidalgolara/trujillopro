// ═══════════════════════════════════════════════════════════
// ANATOMÍA DATA COMPLETO - TODAS LAS ESTRUCTURAS EN UN SOLO ARCHIVO
// 37 estructuras anatómicas - Información 100% real y actualizada
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
,
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
,
  {
    id: 'arterias',
    nombre: 'Sistema Arterial',
    subtitulo: 'Red de Distribución de Sangre Oxigenada',
    icono: '🔴',
    categorias: ['cardiovascular'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica General',
        items: [
          '<strong>Definición:</strong> Vasos que transportan sangre desde el corazón hacia los tejidos; pared gruesa con músculo liso',
          '<strong>Capas pared arterial:</strong> Túnica íntima (endotelio), túnica media (músculo liso + elastina), túnica adventicia (tejido conectivo)',
          '<strong>Tipos:</strong> Elásticas (aorta, tronco pulmonar), musculares (mayoría), arteriolas (control resistencia periférica)',
          '<strong>Presión arterial:</strong> Sistólica ~120 mmHg, diastólica ~80 mmHg en reposo; disminuye progresivamente hasta capilares (35-15 mmHg)',
          '<strong>Velocidad flujo:</strong> Aorta 40 cm/s, arterias 10-20 cm/s, arteriolas 1-5 cm/s, capilares 0.05-0.1 cm/s',
          '<strong>Distensibilidad:</strong> Arterias elásticas amortiguan pulsatilidad; arterias musculares distribuyen flujo'
        ]
      },
      {
        titulo: '⚙️ Aorta y Ramas Principales',
        items: [
          '<strong>Aorta ascendente (5 cm):</strong> Desde VI hasta arco aórtico; senos de Valsalva (origen arterias coronarias); diámetro ~3 cm',
          '<strong>Arco aórtico:</strong> 3 ramas principales: tronco braquiocefálico (→A. carótida común derecha + A. subclavia derecha), A. carótida común izquierda, A. subclavia izquierda',
          '<strong>Aorta torácica descendente:</strong> T4-T12; arterias intercostales posteriores, bronquiales, esofágicas',
          '<strong>Aorta abdominal:</strong> T12-L4; ramas: tronco celíaco (T12), mesentérica superior (L1), renales (L1-L2), mesentérica inferior (L3), ilíacas comunes (L4)',
          '<strong>Tronco celíaco:</strong> 3 ramas: gástrica izquierda, esplénica, hepática común; irriga estómago, hígado, bazo, páncreas',
          '<strong>Arterias ilíacas:</strong> Comunes (L4)→internas (pelvis, órganos pélvicos) + externas (→femorales, MMII)'
        ]
      },
      {
        titulo: '⚙️ Circulación Cerebral',
        items: [
          '<strong>Arterias carótidas internas:</strong> 80% flujo cerebral; ramas: oftálmica, comunicante posterior, coroidea anterior, cerebral anterior/media',
          '<strong>Arterias vertebrales:</strong> 20% flujo; suben por forámenes transversos C6-C1; entran cráneo por foramen magno; unen→arteria basilar',
          '<strong>Arteria basilar:</strong> Ramas: cerebelosas (AICA, SCA), cerebrales posteriores; irriga tronco encefálico, cerebelo, lóbulos occipitales',
          '<strong>Polígono de Willis:</strong> Anastomosis circular; comunicante anterior conecta ACAs, comunicantes posteriores conectan carótidas-vertebrales',
          '<strong>Arteria cerebral anterior:</strong> Cara medial hemisferios; área motora/sensitiva pierna',
          '<strong>Arteria cerebral media:</strong> Cara lateral hemisferios; áreas lenguaje (dominante), motora/sensitiva cara-brazo'
        ]
      },
      {
        titulo: '⚙️ Circulación Periférica',
        items: [
          '<strong>Arteria femoral:</strong> Continuación ilíaca externa bajo ligamento inguinal; palpable en triángulo femoral; ramas: femoral profunda (muslo), femoral superficial (→poplítea)',
          '<strong>Arteria poplítea:</strong> Detrás rodilla; división en tibial anterior (→dorsal del pie) + tronco tibioperóneo (→tibial posterior + peronea)',
          '<strong>Arteria subclavia:</strong> Ramas: vertebral, torácica interna, tirocervical, costocervical; continúa como axilar (borde 1° costilla)',
          '<strong>Arteria axilar:</strong> 3 partes (relación músculo pectoral menor); ramas: torácica superior, toracoacromial, subescapular; continúa como braquial',
          '<strong>Arteria braquial:</strong> Medial húmero; palpable fosa antecubital; división en radial (lateral, pulso muñeca) + cubital (medial)',
          '<strong>Arcos palmares:</strong> Superficial (cubital predomina) y profundo (radial predomina); irrigan mano/dedos'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Longitud aorta', value: '~30-40 cm adulto; diámetro raíz 3-3.7 cm, aorta ascendente 2.1-3.6 cm' },
          { label: 'Grosor pared', value: 'Aorta ~2 mm, arterias musculares ~1 mm, arteriolas 20-30 μm' },
          { label: 'Presión pulso', value: 'Diferencia sistólica-diastólica; normal ~40 mmHg; aumenta con rigidez arterial (edad)' },
          { label: 'Autorregulación', value: 'Cerebro y riñón mantienen flujo constante entre PAM 60-150 mmHg' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Aneurisma aórtico abdominal:</strong> Dilatación >3 cm (normal <2 cm); factores: HTA, tabaco, edad, sexo masculino; ruptura mortalidad 80-90%; screening ecografía >65 años',
          '<strong>Disección aórtica:</strong> Desgarro íntima→sangre en pared arterial; Stanford A (aorta ascendente, emergencia quirúrgica), B (descendente, manejo médico); dolor torácico desgarrante',
          '<strong>Aterosclerosis:</strong> Placas lipídicas en íntima; coronarias (IAM), carótidas (ACV), aorta (aneurisma), femorales (claudicación); factores: LDL, HTA, DM, tabaco',
          '<strong>Enfermedad arterial periférica:</strong> Aterosclerosis MMII; claudicación intermitente; índice tobillo-brazo <0.9; puede progresar a isquemia crítica',
          '<strong>Arteritis de células gigantes:</strong> Vasculitis arteria temporal; >50 años; cefalea temporal, claudicación mandibular; riesgo amaurosis; VSG elevada; biopsia temporal',
          '<strong>Coartación aórtica:</strong> Estenosis congénita aorta (post-ductal); HTA MMSS, hipotensión MMII; pulsos femorales disminuidos; murmur continuo interescapular',
          '<strong>ACV isquémico:</strong> ACM más común (hemiplejía faciobraquial, afasia); ACA (hemiplejía crural); ACP (hemianopsia homónima); tratamiento: trombólisis <4.5h, trombectomía <24h'
        ]
      }
    ]
  },
  {
    id: 'venas',
    nombre: 'Sistema Venoso',
    subtitulo: 'Red de Retorno de Sangre al Corazón',
    icono: '🔵',
    categorias: ['cardiovascular'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica General',
        items: [
          '<strong>Definición:</strong> Vasos que transportan sangre desde los tejidos hacia el corazón; pared delgada con válvulas unidireccionales',
          '<strong>Capas pared venosa:</strong> Túnica íntima (endotelio + válvulas), media (músculo liso escaso), adventicia (tejido conectivo grueso)',
          '<strong>Válvulas venosas:</strong> Pliegues endoteliales semilunares; previenen reflujo; más abundantes en MMII (contra gravedad)',
          '<strong>Presión venosa:</strong> Venas periféricas 10-15 mmHg, vena cava 2-8 mmHg, aurícula derecha 0-5 mmHg',
          '<strong>Capacitancia:</strong> Venas contienen 60-70% volumen sanguíneo total (~5L adulto); reservorio de sangre',
          '<strong>Tipos:</strong> Superficiales (subcutáneas), profundas (acompañan arterias), comunicantes (conectan superficiales-profundas)'
        ]
      },
      {
        titulo: '⚙️ Sistema Venoso Sistémico',
        items: [
          '<strong>Vena cava superior:</strong> 7 cm longitud; formada por unión venas braquiocefálicas (innominadas); drena cabeza, cuello, MMSS, tórax superior',
          '<strong>Vena cava inferior:</strong> 22 cm longitud; mayor vena del cuerpo; formada por unión venas ilíacas comunes (L5); drena abdomen, pelvis, MMII',
          '<strong>Venas yugulares:</strong> Interna (principal drenaje cerebral, senos durales), externa (superficial, cuello); PVC refleja PVC (distensión >3 cm sobre ángulo esternal)',
          '<strong>Venas ácigos:</strong> Hemiácigos, ácigos, hemiácigos accesoria; colaterales VCS-VCI; drenan pared torácica posterior',
          '<strong>Senos venosos durales:</strong> Espacios entre capas duramadre; sagital superior→confluente→transversos→sigmoideos→yugulares internas',
          '<strong>Sistema porta hepático:</strong> Vena porta (formada por V. mesentérica superior + V. esplénica)→hígado→venas hepáticas→VCI; 75% flujo hepático'
        ]
      },
      {
        titulo: '⚙️ Drenaje Venoso Extremidades',
        items: [
          '<strong>MMSS superficiales:</strong> Cefálica (lateral, drena en axilar), basílica (medial, drena en axilar/braquial), mediana (variable)',
          '<strong>MMSS profundas:</strong> Radiales, cubitales (venas compañeras arterias)→braquiales→axilar→subclavia→braquiocefálica→VCS',
          '<strong>MMII superficiales:</strong> Safena magna (medial, más larga del cuerpo ~1m, drena en femoral), safena parva (posterior, drena en poplítea)',
          '<strong>MMII profundas:</strong> Tibiales anteriores/posteriores, peroneas→poplítea→femoral→ilíaca externa→ilíaca común→VCI',
          '<strong>Venas perforantes:</strong> Conectan sistema superficial-profundo; válvulas dirigen flujo superficial→profundo; incompetencia causa várices',
          '<strong>Bomba muscular:</strong> Contracción músculos (especialmente gemelos) comprime venas profundas→impulsa sangre proximal; esencial retorno venoso MMII'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Capacitancia total', value: 'Sistema venoso contiene ~3.5 L sangre (70% volumen total); reservorio dinámico' },
          { label: 'Velocidad flujo', value: 'Vénulas 0.3 cm/s, venas 5-15 cm/s, vena cava 15-20 cm/s' },
          { label: 'Grosor pared', value: 'Vena cava ~1.5 mm, venas medianas ~0.5 mm, vénulas 10-20 μm' },
          { label: 'Presión venosa central', value: 'PVC normal 0-8 mmHg (0-11 cmH₂O); refleja precarga cardíaca derecha' },
          { label: 'Gradiente presión', value: 'Venas pie 90 mmHg (bipedestación)→aurícula 5 mmHg; válvulas + bomba muscular vencen gravedad' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Trombosis venosa profunda (TVP):</strong> Coágulo venas profundas (MMII 90%); tríada Virchow: estasis, lesión endotelial, hipercoagulabilidad; riesgo TEP; D-dímero + ecografía',
          '<strong>Tromboembolismo pulmonar:</strong> Émbolo TVP→arteria pulmonar; disnea súbita, taquicardia, hipoxemia; Wells score; tratamiento anticoagulación; mortalidad 15-30% sin tratamiento',
          '<strong>Insuficiencia venosa crónica:</strong> Incompetencia válvulas→reflujo→hipertensión venosa; várices, edema, cambios cutáneos (lipodermatoesclerosis), úlceras maleolares',
          '<strong>Várices:</strong> Venas superficiales dilatadas tortuosas; safena magna más afectada; factores: bipedestación prolongada, embarazo, genética; complicaciones: tromboflebitis, sangrado',
          '<strong>Síndrome vena cava superior:</strong> Obstrucción VCS (cáncer pulmonar 60%, linfoma, trombosis); edema facial/cuello/MMSS, circulación colateral, disnea',
          '<strong>Trombosis senos venosos cerebrales:</strong> Cefalea intensa, convulsiones, déficit focal; factores: anticonceptivos orales, embarazo, infección, trombofilias; RM venografía',
          '<strong>Hipertensión portal:</strong> Presión portal >10 mmHg; causas: cirrosis (90%), trombosis portal; complicaciones: várices esofágicas, ascitis, encefalopatía, esplenomegalia'
        ]
      }
    ]
  },
  {
    id: 'capilares',
    nombre: 'Red Capilar',
    subtitulo: 'Sitio de Intercambio Sangre-Tejidos',
    icono: '🔬',
    categorias: ['cardiovascular'],
    secciones: [
      {
        titulo: '📋 Estructura Microscópica',
        items: [
          '<strong>Definición:</strong> Vasos microscópicos de intercambio; una capa de células endoteliales + membrana basal',
          '<strong>Diámetro:</strong> 5-10 μm (permite paso único eritrocitos 7-8 μm); longitud 0.5-1 mm',
          '<strong>Densidad capilar:</strong> ~40,000 millones capilares en cuerpo; superficie intercambio ~300 m² (cancha de tenis)',
          '<strong>Pared capilar:</strong> Células endoteliales + membrana basal + pericitos ocasionales; grosor 0.5 μm',
          '<strong>Distancia difusión:</strong> Células distan <100 μm del capilar más cercano; O₂/CO₂ difunden fácilmente',
          '<strong>Flujo capilar:</strong> Velocidad 0.03-0.1 cm/s (lenta para permitir intercambio); tiempo tránsito ~1-2 segundos'
        ]
      },
      {
        titulo: '⚙️ Tipos de Capilares',
        items: [
          '<strong>Capilares continuos:</strong> Uniones estrechas entre células endoteliales; permeabilidad selectiva; músculo, cerebro (BHE), pulmón, piel',
          '<strong>Capilares fenestrados:</strong> Poros (fenestras) 60-80 nm con diafragma; alta permeabilidad agua/solutos pequeños; glomérulos renales, intestino, glándulas endocrinas',
          '<strong>Capilares sinusoides:</strong> Discontinuos, espacios grandes entre células, sin membrana basal continua; muy permeables; hígado, bazo, médula ósea',
          '<strong>Barrera hematoencefálica:</strong> Capilares continuos + astrocitos + uniones estrechas; permeabilidad muy restringida; protege cerebro',
          '<strong>Esfínteres precapilares:</strong> Anillos músculo liso en arteriolas terminales; regulan flujo capilar según demanda metabólica',
          '<strong>Metarteriolas:</strong> Vasos cortos entre arteriolas-vénulas; bypass capilares; termorrregulación cutánea'
        ]
      },
      {
        titulo: '⚙️ Intercambio Transcapilar',
        items: [
          '<strong>Difusión:</strong> Mecanismo principal gases (O₂, CO₂) y solutos lipofílicos; atraviesan membrana endotelial directamente',
          '<strong>Filtración-reabsorción:</strong> Fuerzas de Starling; presión hidrostática (filtración) vs presión oncótica (reabsorción)',
          '<strong>Presión hidrostática capilar:</strong> Extremo arterial 35 mmHg (filtración), extremo venoso 15 mmHg; disminuye a lo largo del capilar',
          '<strong>Presión oncótica plasmática:</strong> ~25 mmHg (por albúmina); retiene agua en capilar',
          '<strong>Filtración neta:</strong> Extremo arterial: 35-25=+10 mmHg (filtración); extremo venoso: 15-25=-10 mmHg (reabsorción)',
          '<strong>Sistema linfático:</strong> Recoge 10% líquido filtrado (2-4 L/día) no reabsorbido; retorna a circulación venosa'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Número total', value: '~40 mil millones capilares en cuerpo humano adulto' },
          { label: 'Superficie intercambio', value: '~300 m²; 100 veces superficie corporal' },
          { label: 'Volumen sanguíneo capilar', value: '~300 ml (5% volumen total); pero superficie masiva de intercambio' },
          { label: 'Coeficiente filtración', value: 'Glomérulo renal: 12.5 ml/min/mmHg (muy alto); músculo: 0.01 ml/min/mmHg' },
          { label: 'Densidad capilar variable', value: 'Miocardio: 3000-4000/mm²; músculo esquelético activo: 300-400/mm²; tejido adiposo: 50-100/mm²' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Edema:</strong> Acumulación líquido intersticial; causas: ↑presión hidrostática (ICC), ↓presión oncótica (hipoalbuminemia), ↑permeabilidad capilar (inflamación), obstrucción linfática',
          '<strong>Síndrome de fuga capilar:</strong> ↑Permeabilidad aguda; shock distributivo; sepsis, anafilaxia, quemaduras; hipotensión, edema generalizado, hemoconcentración',
          '<strong>Microangiopatía diabética:</strong> Engrosamiento membrana basal capilar; retinopatía (ceguera), nefropatía (IRC), neuropatía; control glicémico estricto previene',
          '<strong>Telangiectasias:</strong> Dilataciones capilares visibles; hereditaria hemorrágica (Osler-Weber-Rendu): epistaxis, malformaciones AV; adquiridas: rosácea, cirrosis',
          '<strong>Vasculitis leucocitoclástica:</strong> Inflamación capilares pequeños; púrpura palpable; piel MMII; depósito inmunocomplejos; vasculitis IgA (Henoch-Schönlein)',
          '<strong>SDRA (Síndrome distrés respiratorio agudo):</strong> Daño capilar alveolar→fuga proteínas/líquido→edema pulmonar no cardiogénico; hipoxemia refractaria',
          '<strong>Choque:</strong> Perfusión tisular inadecuada; hipovolémico (↓volumen), cardiogénico (↓bomba), distributivo (↓resistencia vascular); acidosis láctica, falla multiorgánica'
        ]
      }
    ]
  }
,
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
,
  {
    id: 'boca',
    nombre: 'Cavidad Oral',
    subtitulo: 'Inicio de la Digestión Mecánica y Química',
    icono: '👄',
    categorias: ['digestivo', 'organos-cefalicos'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Límites:</strong> Labios (anterior), paladar duro/blando (superior), suelo boca/lengua (inferior), fauces (posterior)',
          '<strong>Vestíbulo oral:</strong> Espacio entre labios/mejillas y dientes/encías; conductos parotídeos (Stensen) desembocan',
          '<strong>Cavidad oral propia:</strong> Dientes, lengua, paladar, glándulas salivales menores',
          '<strong>Paladar duro:</strong> Hueso (maxilar + palatino) cubierto mucosa; separa cavidad oral de nasal',
          '<strong>Paladar blando:</strong> Muscular (tensor/elevador velo palatino); úvula; cierra nasofaringe durante deglución',
          '<strong>Fauces:</strong> Arcos palatogloso (anterior) y palatofaríngeo (posterior); amígdalas palatinas entre arcos'
        ]
      },
      {
        titulo: '⚙️ Lengua y Glándulas Salivales',
        items: [
          '<strong>Lengua:</strong> Músculo esquelético; 2/3 anterior (cuerpo), 1/3 posterior (base); papilas gustativas (fungiformes, foliadas, caliciformes)',
          '<strong>Músculos intrínsecos:</strong> Cambian forma lengua; longitudinal superior/inferior, transverso, vertical',
          '<strong>Músculos extrínsecos:</strong> Mueven lengua; geniogloso (protrusión), hiogloso (retracción), estiogloso (elevación lateral)',
          '<strong>Inervación lengua:</strong> Gusto: 2/3 anterior (VII, cuerda tímpano), 1/3 posterior (IX); Motor: XII hipogloso; Sensitivo general: V3 (lingual)',
          '<strong>Glándula parótida:</strong> Mayor (25-30g); serosa pura; conducto Stensen→2° molar superior; secreta amilasa salival',
          '<strong>Glándula submandibular:</strong> Mixta (seromucosa); conducto Wharton→suelo boca (frenillo lingual); 70% saliva reposo',
          '<strong>Glándula sublingual:</strong> Mucosa principalmente; múltiples conductos menores→suelo boca'
        ]
      },
      {
        titulo: '⚙️ Dientes y Dentición',
        items: [
          '<strong>Dentición temporal:</strong> 20 dientes; erupción 6 meses-2 años; exfoliación 6-12 años',
          '<strong>Dentición permanente:</strong> 32 dientes; incisivos (8), caninos (4), premolares (8), molares (12)',
          '<strong>Estructura diente:</strong> Corona (esmalte, más dura del cuerpo), cuello (cemento), raíz (dentina); pulpa (vasos, nervios)',
          '<strong>Periodonto:</strong> Encía, ligamento periodontal, cemento, hueso alveolar; sostén diente',
          '<strong>Erupción permanente:</strong> 1° molar 6 años, incisivos 6-8 años, premolares 9-11 años, 2° molar 12 años, 3° molar (cordal) 17-25 años',
          '<strong>Inervación dental:</strong> Maxilar: N. alveolares superiores (V2); Mandíbula: N. alveolar inferior (V3)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Producción saliva', value: '0.5-1.5 L/día; pH 6.2-7.4; estimulada: parótida 50%, submandibular 35%' },
          { label: 'Composición saliva', value: '99.5% agua, 0.5% sólidos (amilasa, lisozima, IgA, mucinas, bicarbonato)' },
          { label: 'Fuerza masticatoria', value: 'Molares hasta 90 kg (890 N); incisivos 20-30 kg' },
          { label: 'Papilas gustativas', value: '~10,000 en lengua (50% caliciformes); 5 sabores: dulce, salado, ácido, amargo, umami' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Caries dental:</strong> Desmineralización esmalte por ácidos bacterianos (S. mutans); carbohidratos→placa bacteriana→ácido láctico; prevención: flúor, higiene',
          '<strong>Enfermedad periodontal:</strong> Gingivitis (reversible, inflamación encía) → periodontitis (irreversible, pérdida hueso alveolar); placa bacteriana/sarro; movilidad dental',
          '<strong>Xerostomía:</strong> Boca seca; fármacos (anticolinérgicos, antidepresivos), Sjögren, radioterapia cabeza-cuello; disfagia, caries, candidiasis',
          '<strong>Síndrome de Sjögren:</strong> Autoinmune; destrucción glándulas exocrinas; xerostomía + xeroftalmia (ojo seco); Anti-Ro/SSA, Anti-La/SSB positivos',
          '<strong>Sialoadenitis:</strong> Infección glándula salival; submandibular más frecuente; obstrucción ductal (cálculo)→estasis→infección (S. aureus); tumefacción dolorosa',
          '<strong>Carcinoma oral escamoso:</strong> Factores: tabaco, alcohol, VPH; lengua/suelo boca más frecuente; úlcera no cicatrizante; biopsia; cirugía + radioterapia',
          '<strong>Glositis:</strong> Inflamación lengua; deficiencias (B12, folato, hierro), infecciones (candidiasis), irritantes; lengua lisa brillante (atrofia papilas)'
        ]
      }
    ]
  },
  {
    id: 'esofago',
    nombre: 'Esófago',
    subtitulo: 'Conducto Muscular de Transporte Alimentario',
    icono: '🫁',
    categorias: ['digestivo'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> C6 (cartílago cricoides)→T11 (hiato esofágico diafragmático); posterior a tráquea/corazón',
          '<strong>Longitud:</strong> ~25 cm adulto; porciones: cervical (5 cm), torácica (16 cm), abdominal (3-4 cm)',
          '<strong>Diámetro:</strong> ~2 cm; estrechez fisiológicas: EES (15 cm incisivos), arco aórtico (22-23 cm), EEI (40 cm)',
          '<strong>Capas pared:</strong> Mucosa (epitelio escamoso estratificado), submucosa (glándulas mucosas), muscular (1/3 superior esquelética, 1/3 medio mixta, 1/3 inferior lisa), adventicia',
          '<strong>Esfínter esofágico superior (EES):</strong> Músculo cricofaríngeo; presión reposo 60-100 mmHg; previene aerofagia',
          '<strong>Esfínter esofágico inferior (EEI):</strong> Engrosamiento circular músculo liso; presión 10-30 mmHg; barrera antireflujo; ángulo His'
        ]
      },
      {
        titulo: '⚙️ Función y Peristalsis',
        items: [
          '<strong>Peristalsis primaria:</strong> Onda propulsiva inducida por deglución; velocidad 2-4 cm/s; tiempo tránsito 4-8 segundos',
          '<strong>Peristalsis secundaria:</strong> Respuesta a distensión local (residuos); limpia esófago; no requiere deglución',
          '<strong>Ondas terciarias:</strong> No propulsivas, simultáneas; aumentan con edad; esófago en sacacorchos (espasmo difuso)',
          '<strong>Fases deglución esofágica:</strong> Relajación EES→peristalsis→relajación EEI (receptiva); coordinación vagal',
          '<strong>Barreras antireflujo:</strong> EEI, ángulo His (agudo), pilar derecho diafragma, presión intraabdominal positiva',
          '<strong>Aclaramiento esofágico:</strong> Peristalsis + saliva (bicarbonato neutraliza ácido); normal <4.5% tiempo pH<4'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Presión EEI', value: '10-30 mmHg reposo; ↓por: chocolate, alcohol, tabaco, CCB, nitratos; ↑por: metoclopramida' },
          { label: 'Irrigación', value: 'Cervical: tiroidea inferior; Torácica: arterias bronquiales/esofágicas (aorta); Abdominal: gástrica izquierda, frénica inferior' },
          { label: 'Drenaje venoso', value: 'Zona hipertensión portal: venas gástricas (porta)↔esofágicas (ácigos)→VCS; várices esofágicas' },
          { label: 'Inervación', value: 'Parasimpático: vago (motor + sensitivo); Simpático: T1-T6 (dolor visceral)' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>ERGE (Enfermedad por reflujo gastroesofágico):</strong> Incompetencia EEI; pirosis, regurgitación; complicaciones: esofagitis, úlcera, estenosis, Barrett, adenocarcinoma',
          '<strong>Esófago de Barrett:</strong> Metaplasia columnar; reemplaza escamoso→glandular; riesgo adenocarcinoma 0.5%/año; vigilancia endoscópica; secuencia: displasia bajo→alto→carcinoma',
          '<strong>Acalasia:</strong> Degeneración neuronas plexo mientérico→EEI no relaja; disfagia sólidos+líquidos, regurgitación, pérdida peso; esófago dilatado (megaesófago); tratamiento: dilatación neumática, Heller miotomía',
          '<strong>Espasmo esofágico difuso:</strong> Contracciones simultáneas no propulsivas; dolor torácico, disfagia intermitente; manometría: ondas repetitivas >20% degluciones; CCB, nitratos',
          '<strong>Cuerpo extraño esofágico:</strong> Impactación comida (adultos, estenosis), objetos (niños, monedas); disfagia aguda, sialorrea; endoscopia <24h; hueso espina→perforación',
          '<strong>Carcinoma esofágico:</strong> Escamoso (1/3 medio, tabaco/alcohol) vs adenocarcinoma (1/3 inferior, Barrett, obesidad); disfagia progresiva, pérdida peso; mal pronóstico (diagnóstico tardío)',
          '<strong>Várices esofágicas:</strong> Hipertensión portal (cirrosis); anastomosis portocava en 1/3 inferior; sangrado digestivo alto masivo; ligadura endoscópica, β-bloqueantes, TIPS'
        ]
      }
    ]
  },
  {
    id: 'vesicula-biliar',
    nombre: 'Vesícula Biliar',
    subtitulo: 'Reservorio y Concentrador de Bilis',
    icono: '🫒',
    categorias: ['digestivo', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Cara inferior hígado (entre lóbulos derecho/cuadrado); fosa vesicular',
          '<strong>Forma:</strong> Piriforme; 3 porciones: fundus (proyecta borde inferior hígado), cuerpo, cuello (→conducto cístico)',
          '<strong>Dimensiones:</strong> 7-10 cm longitud, 3 cm diámetro; capacidad 30-50 ml (concentra hasta 10x)',
          '<strong>Pared:</strong> Mucosa (epitelio columnar simple, pliegues), muscular lisa (sin submucosa), serosa peritoneal',
          '<strong>Conducto cístico:</strong> 3-4 cm longitud; válvula espiral (Heister) previene colapso; une vesícula→conducto hepático común→colédoco',
          '<strong>Triángulo de Calot:</strong> Borde hígado (superior), conducto cístico (inferior), conducto hepático común (medial); arteria cística cruza'
        ]
      },
      {
        titulo: '⚙️ Función y Bilis',
        items: [
          '<strong>Almacenamiento bilis:</strong> Hígado produce 500-1000 ml/día; vesícula almacena 30-50 ml concentrados (10x)',
          '<strong>Concentración:</strong> Reabsorción activa Na+/Cl- y pasiva H₂O; mucosa puede reabsorber 90% agua',
          '<strong>Contracción vesicular:</strong> CCK (colecistoquinina) secretada por duodeno ante grasas→contracción vesícula + relajación esfínter Oddi',
          '<strong>Composición bilis:</strong> Agua 97%, sales biliares (ácidos biliares conjugados), colesterol, bilirrubina conjugada, fosfolípidos (lecitina)',
          '<strong>Sales biliares:</strong> Emulsifican grasas→micelas; circulación enterohepática (95% reabsorción íleon terminal)',
          '<strong>Regulación:</strong> CCK (contracción), motilina (vaciamiento), somatostatina (inhibición)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación', value: 'Arteria cística (rama A. hepática derecha, en triángulo Calot); variable anatomía 25% casos' },
          { label: 'Drenaje venoso', value: 'Vena cística→vena porta (o directamente hígado por lecho vesicular)' },
          { label: 'Inervación', value: 'Plexo celíaco (simpático), vago (parasimpático); dolor: referido hombro derecho (nervio frénico C3-C5)' },
          { label: 'Vaciamiento', value: '50-70% en 30 min post-comida grasa; ciclo interdigestivo: llenado/concentración' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Colelitiasis (cálculos biliares):</strong> Colesterol 80% (supersaturación), pigmento 20% (hemólisis); factores: 4F (Female, Forty, Fat, Fertile); mayoría asintomáticos',
          '<strong>Cólico biliar:</strong> Impactación transitoria cálculo en conducto cístico; dolor epigastrio/hipocondrio derecho 30min-6h post-comida grasa; náuseas; Murphy negativo',
          '<strong>Colecistitis aguda:</strong> Obstrucción persistente cístico→distensión→isquemia→infección; dolor >6h, fiebre, Murphy+, leucocitosis; ecografía (engrosamiento pared >4mm, líquido pericolicistéco); colecistectomía',
          '<strong>Coledocolitiasis:</strong> Cálculo en colédoco; ictericia obstructiva, coluria, acolia; elevación bilirrubina directa, FA, GGT; CPRE extracción',
          '<strong>Colangitis aguda:</strong> Infección vía biliar obstruida; Tríada Charcot: fiebre, ictericia, dolor; Pentada Reynolds: +hipotensión+alteración conciencia; emergencia; antibióticos + descompresión urgente (CPRE)',
          '<strong>Síndrome de Mirizzi:</strong> Cálculo impactado cístico/infundíbulo→comprime colédoco→ictericia obstructiva; raro; cirugía compleja',
          '<strong>Carcinoma vesícula biliar:</strong> Raro pero letal; mayoría adenocarcinoma; factor riesgo: colelitiasis crónica, vesícula porcelana; diagnóstico tardío (invasión hepática); mal pronóstico'
        ]
      }
    ]
  },
  {
    id: 'pancreas',
    nombre: 'Páncreas',
    subtitulo: 'Glándula Digestiva y Endocrina',
    icono: '🫁',
    categorias: ['digestivo', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Retroperitoneo; L1-L2; anterior columna lumbar, posterior estómago (transcavidad omentales)',
          '<strong>Dimensiones:</strong> 12-15 cm longitud, 3-4 cm ancho, 2 cm grosor; peso 80-100g',
          '<strong>Porciones:</strong> Cabeza (dentro curva duodenal), proceso uncinado, cuello (anterior vena porta), cuerpo, cola (hacia hilio esplénico)',
          '<strong>Conducto pancreático principal (Wirsung):</strong> Recorre todo páncreas; une conducto colédoco→ampolla Vater→duodeno (2° porción)',
          '<strong>Conducto accesorio (Santorini):</strong> Drena porción superior cabeza→papila menor duodenal; presente 60% casos',
          '<strong>Esfínter de Oddi:</strong> Controla flujo bilis+jugo pancreático; relajación mediada CCK'
        ]
      },
      {
        titulo: '⚙️ Funciones Exocrina y Endocrina',
        items: [
          '<strong>Función exocrina (98% masa):</strong> Acinos secretan 1-2 L/día jugo pancreático; pH alcalino 8.3 (bicarbonato neutraliza ácido gástrico)',
          '<strong>Enzimas digestivas:</strong> Amilasa (carbohidratos), lipasa (grasas), tripsina/quimotripsina (proteínas, proenzimas activadas por enterocinasa duodenal)',
          '<strong>Función endocrina (2% masa):</strong> Islotes Langerhans ~1 millón; células β (insulina 70%), α (glucagón 20%), δ (somatostatina 5%), PP (polipéptido pancreático)',
          '<strong>Insulina:</strong> ↓Glucemia; estimula captación glucosa, síntesis glucógeno/proteínas/lípidos; deficiencia→DM tipo 1',
          '<strong>Glucagón:</strong> ↑Glucemia; estimula glucogenólisis, gluconeogénesis, lipólisis; contra-regulador insulina',
          '<strong>Regulación secreción:</strong> Secretina (bicarbonato), CCK (enzimas), vago (ambos); fase cefálica→gástrica→intestinal'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación', value: 'Cabeza: arterias pancreaticoduodenales (gastroduodenal + mesentérica superior); Cuerpo/cola: esplénica' },
          { label: 'Drenaje venoso', value: 'Vena porta (esplénica + mesentérica superior)→hígado' },
          { label: 'Producción jugo pancreático', value: '1-2 L/día; pH 8.3; bicarbonato 120 mEq/L (neutraliza 2L ácido gástrico)' },
          { label: 'Amilasa sérica', value: 'Normal <100 U/L; pancreatitis aguda >3x límite superior' }
        ]
      },
      {
        titulo: '🔗 Relaciones Anatómicas',
        items: [
          '<strong>Anterior:</strong> Estómago (transcavidad omentales), colon transverso',
          '<strong>Posterior:</strong> Aorta, VCI, vena esplénica, arteria mesentérica superior, pilar izquierdo diafragma, riñón izquierdo',
          '<strong>Cabeza:</strong> Abraza 2° porción duodeno (C-loop); proceso uncinado posterior vasos mesentéricos superiores',
          '<strong>Cola:</strong> Alcanza hilio esplénico; ligamento esplenorrenal; contacta riñón izquierdo',
          '<strong>Cuello:</strong> Vena porta posterior (formada por unión esplénica + mesentérica superior)'
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Pancreatitis aguda:</strong> Autodigestión pancreática; causas: cálculos biliares (40%), alcohol (30%); dolor epigástrico irradiado espalda, amilasa/lipasa ↑↑↑; Ranson/APACHE II gravedad; complicaciones: necrosis, pseudoquiste',
          '<strong>Pancreatitis crónica:</strong> Inflamación crónica→fibrosis→insuficiencia exocrina/endocrina; alcohol causa principal; dolor crónico, esteatorrea, diabetes; calcificaciones pancreáticas (CT)',
          '<strong>Adenocarcinoma pancreático:</strong> 90% tumores pancreáticos; cabeza 70%; factores: tabaco, DM, pancreatitis crónica; síntomas tardíos: ictericia (obstrucción colédoco), pérdida peso; CA 19-9; mal pronóstico (sobrevida 5 años <10%)',
          '<strong>Diabetes mellitus tipo 1:</strong> Destrucción autoinmune células β; déficit insulina absoluto; cetoacidosis; inicio juvenil; requiere insulina exógena',
          '<strong>Diabetes mellitus tipo 2:</strong> Resistencia insulina + déficit relativo; obesidad factor principal; hiperglicemia sin cetosis; tratamiento: dieta, metformina, eventual insulina',
          '<strong>Insulinoma:</strong> Tumor células β (95% benignos); hipoglicemia de ayuno + Whipple tríada (síntomas hipoglicemia + glucosa <55 mg/dl + alivio con glucosa); cirugía curativa',
          '<strong>Pseudoquiste pancreático:</strong> Colección líquido encapsulada post-pancreatitis aguda; epigastrio palpable; amilasa elevada; >6 semanas considerar drenaje si sintomático'
        ]
      }
    ]
  }
,
  {
    id: 'intestino-delgado',
    nombre: 'Intestino Delgado',
    subtitulo: 'Principal Sitio de Digestión y Absorción',
    icono: '🫁',
    categorias: ['digestivo', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Longitud:</strong> 5-7 metros adulto; diámetro 2.5-3 cm (disminuye distalmente)',
          '<strong>Porciones:</strong> Duodeno (25 cm), yeyuno (2.5 m, 40%), íleon (3.5 m, 60%)',
          '<strong>Duodeno:</strong> Forma de C; 4 porciones (D1 bulbo, D2 descendente, D3 horizontal, D4 ascendente); recibe bilis+jugo pancreático',
          '<strong>Yeyuno:</strong> Cuadrante superior izquierdo; pared gruesa, vascularización prominente, pliegues circulares numerosos',
          '<strong>Íleon:</strong> Cuadrante inferior derecho; pared delgada, menos vascularizado, placas de Peyer (tejido linfoide); termina en válvula ileocecal',
          '<strong>Mesenterio:</strong> Pliegue peritoneal; raíz 15 cm (L2→articulación sacroilíaca derecha); contiene vasos mesentéricos superiores, linfáticos, nervios'
        ]
      },
      {
        titulo: '⚙️ Anatomía Funcional y Absorción',
        items: [
          '<strong>Vellosidades intestinales:</strong> Proyecciones mucosa 0.5-1 mm; aumentan superficie 10x; epitelio columnar simple con borde en cepillo (microvellosidades)',
          '<strong>Microvellosidades:</strong> 3000/célula; aumentan superficie 20x adicional; contienen enzimas digestivas (disacaridasas, peptidasas)',
          '<strong>Células epiteliales:</strong> Enterocitos (absorción), caliciformes (moco), Paneth (defensinas), enteroendocrinas (CCK, secretina, GIP)',
          '<strong>Pliegues circulares (Kerckring):</strong> Permanentes; más prominentes yeyuno; aumentan superficie 3x',
          '<strong>Superficie total absorción:</strong> ~200 m² (cancha de tenis); pliegues + vellosidades + microvellosidades',
          '<strong>Absorción nutrientes:</strong> Carbohidratos (monosacáridos), proteínas (aminoácidos), lípidos (ácidos grasos+monoglicéridos→quilomicrones), vitaminas (B12 íleon terminal), minerales (Fe²⁺ duodeno)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Tránsito intestinal', value: 'Alimentos 3-5 horas en intestino delgado; peristalsis 1-2 cm/s' },
          { label: 'Secreción intestinal', value: '1-2 L/día jugo intestinal (pH 7.5-8); enzimas brush border (disacaridasas, peptidasas)' },
          { label: 'Irrigación', value: 'Arteria mesentérica superior (yeyuno-íleon), tronco celíaco (duodeno proximal); arcadas arteriales' },
          { label: 'Válvula ileocecal', value: 'Previene reflujo colon→íleon; presión 20-30 mmHg; tono aumenta con CCK' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Enfermedad celíaca:</strong> Autoinmune; gluten (gliadina)→atrofia vellositaria; diarrea, malabsorción, déficit nutricional; Anti-transglutaminasa IgA; dieta sin gluten',
          '<strong>Enfermedad de Crohn:</strong> Inflamación transmural; cualquier segmento (íleon terminal 80%); patrón salteado; fístulas, estenosis; dolor, diarrea, pérdida peso',
          '<strong>Obstrucción intestinal:</strong> Adherencias post-cirugía (60%), hernias (20%), tumores; dolor cólico, distensión, vómitos, ausencia evacuaciones; Rx: niveles hidroaéreos',
          '<strong>Síndrome intestino corto:</strong> Resección >100 cm con colon o >200 cm sin colon; malabsorción severa; nutrición parenteral',
          '<strong>Divertículo de Meckel:</strong> Remanente conducto onfalomesentérico; regla 2s: 2% población, 2 pies del íleon, 2 años edad síntomas; mucosa gástrica ectópica→sangrado indoloro',
          '<strong>Adenocarcinoma intestino delgado:</strong> Raro (<2% tumores GI); duodeno más frecuente; asociado enfermedad celíaca, Crohn, FAP'
        ]
      }
    ]
  },
  {
    id: 'intestino-grueso',
    nombre: 'Intestino Grueso (Colon)',
    subtitulo: 'Absorción de Agua y Formación de Heces',
    icono: '🫁',
    categorias: ['digestivo', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Longitud:</strong> 1.5 m adulto; diámetro 6-7 cm (ciego) a 2.5 cm (sigma)',
          '<strong>Porciones:</strong> Ciego (con apéndice), colon ascendente, colon transverso, colon descendente, colon sigmoide, recto',
          '<strong>Ciego:</strong> Fondo de saco 6 cm; válvula ileocecal; apéndice vermiforme (8 cm, base cecal)',
          '<strong>Características únicas:</strong> Tenias coli (3 bandas musculares longitudinales), haustras (saculaciones), apéndices epiploicos (grasa)',
          '<strong>Colon ascendente:</strong> Retroperitoneal; 15 cm; hasta flexura hepática (ángulo cólico derecho)',
          '<strong>Colon transverso:</strong> Intraperitoneal (mesocolon transverso); 45 cm; más móvil; cruza abdomen; flexura esplénica (ángulo cólico izquierdo)',
          '<strong>Colon descendente:</strong> Retroperitoneal; 25 cm; hasta pelvis',
          '<strong>Colon sigmoide:</strong> Intraperitoneal (mesocolon sigmoide); 40 cm; forma S; termina en recto (S3)'
        ]
      },
      {
        titulo: '⚙️ Funciones Principales',
        items: [
          '<strong>Absorción agua y electrolitos:</strong> 1.5 L quimo ileocecal→150-200 ml heces; Na⁺, Cl⁻, agua reabsorbidos; K⁺ secretado',
          '<strong>Fermentación bacteriana:</strong> >500 especies; 10¹⁴ bacterias; fermentan fibra→ácidos grasos cadena corta (acetato, propionato, butirato); producen vitamina K, B12',
          '<strong>Almacenamiento heces:</strong> Movimientos masa 1-3/día (después comidas); reflejo gastrocólico',
          '<strong>Formación heces:</strong> 75% agua, 25% sólidos (bacterias muertas 30%, fibra no digerida 30%, grasa 10-20%, proteínas)',
          '<strong>Motilidad:</strong> Contracciones haustración (mezcla), movimientos masa (propulsión), reflejos (gastrocólico, ortocólico)',
          '<strong>Microbiota:</strong> Bacteroides (40%), Firmicutes (30%); funciones: digestión, inmunidad, síntesis vitaminas, protección patógenos'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Tránsito colónico', value: '12-48 horas; más lento que intestino delgado; varía según dieta (fibra ↓tiempo)' },
          { label: 'Irrigación', value: 'Colon derecho: mesentérica superior; Colon izquierdo: mesentérica inferior; Punto Griffiths (flexura esplénica, zona watershed)' },
          { label: 'Apéndice', value: 'Órgano linfoide; base cecal constante (McBurney 1/3 espina ilíaca→ombligo); posición variable' },
          { label: 'Drenaje venoso', value: 'Vena mesentérica superior + inferior→vena porta→hígado (metabolismo primer paso)' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Apendicitis aguda:</strong> Obstrucción luz apendicular→isquemia→infección; dolor periumbilical→fosa ilíaca derecha (McBurney), náuseas, fiebre; Signo Blumberg+; cirugía urgente',
          '<strong>Colitis ulcerosa:</strong> Inflamación mucosa continua; recto→proximal; diarrea sanguinolenta, tenesmo; pancolitis riesgo megacolon tóxico; ↑riesgo cáncer colorrectal',
          '<strong>Enfermedad diverticular:</strong> Divertículos (herniaciones mucosa); colon sigmoide; dieta baja fibra; asintomática 80%; complicaciones: diverticulitis (inflamación), sangrado',
          '<strong>Cáncer colorrectal:</strong> 3° cáncer más común; 95% adenocarcinomas; secuencia adenoma→carcinoma (10-15 años); screening: sangre oculta, colonoscopia >50 años; recto-sigmoide 55%',
          '<strong>Síndrome intestino irritable:</strong> Funcional; dolor abdominal + alteración hábito intestinal; sin daño orgánico; criterios Roma IV; tratamiento: dieta FODMAP, fibra, antiespasmódicos',
          '<strong>Isquemia mesentérica:</strong> Obstrucción arterial (embolia, trombosis); dolor desproporcionado a examen; acidosis láctica; mortalidad 60-80%; zona watershed (flexura esplénica) vulnerable',
          '<strong>Megacolon tóxico:</strong> Dilatación colon >6 cm + toxicidad sistémica; complicación colitis ulcerosa, Crohn, C. difficile; perforación inminente; colectomía urgente'
        ]
      }
    ]
  },
  {
    id: 'recto',
    nombre: 'Recto y Ano',
    subtitulo: 'Almacenamiento y Evacuación de Heces',
    icono: '🫁',
    categorias: ['digestivo', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Recto:</strong> 12-15 cm longitud; S3→ano; porción superior ampular (ampolla rectal); sin tenias ni haustras',
          '<strong>Válvulas rectales (Houston):</strong> 3 pliegues transversos; superior izquierda, media derecha, inferior izquierda',
          '<strong>Conducto anal:</strong> 3-4 cm; línea pectínea (dentada) divide: zona columnar (arriba) y escamosa (abajo)',
          '<strong>Columnas anales (Morgagni):</strong> Pliegues longitudinales mucosa; entre ellas: senos anales y criptas',
          '<strong>Esfínter anal interno:</strong> Músculo liso (continuación circular recto); involuntario; tono constante 70%',
          '<strong>Esfínter anal externo:</strong> Músculo esquelético; voluntario; 3 partes (subcutáneo, superficial, profundo); nervio pudendo'
        ]
      },
      {
        titulo: '⚙️ Defecación y Control',
        items: [
          '<strong>Reflejo defecación:</strong> Distensión recto→relajación EAI (involuntario)→contracción EAE voluntaria (continencia) o relajación (defecación)',
          '<strong>Ángulo anorrectal:</strong> 90° reposo (músculo puborrectal); 120-140° defecación (relajación puborrectal)',
          '<strong>Continencia:</strong> EAI 70%, EAE 30%, ángulo anorrectal, sensibilidad rectal, consistencia heces, capacidad ampolla',
          '<strong>Presiones:</strong> EAI 50-70 mmHg reposo, EAE 100-150 mmHg contracción voluntaria',
          '<strong>Vascularización especial:</strong> Plexo hemorroidal interno (submucosa arriba línea pectínea), externo (debajo línea)',
          '<strong>Sensibilidad:</strong> Arriba línea pectínea: visceral (no dolor); Abajo: somática (dolor intenso)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación', value: 'Arteria rectal superior (mesentérica inferior), media (ilíaca interna), inferior (pudenda interna)' },
          { label: 'Drenaje venoso', value: 'Arriba línea: vena mesentérica inferior→porta; Abajo línea: vena ilíaca interna→cava (anastomosis portocava)' },
          { label: 'Drenaje linfático', value: 'Arriba línea: ganglios mesentéricos inferiores; Abajo línea: ganglios inguinales' },
          { label: 'Inervación', value: 'Parasimpático: S2-S4 (defecación); Somático: pudendo (EAE, sensibilidad periné)' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Hemorroides:</strong> Dilatación plexos hemorroidales; internas (arriba línea, indoloras, sangrado rojo rutilante), externas (abajo línea, dolorosas, trombosis); grados I-IV; ligadura, escleroterapia',
          '<strong>Fisura anal:</strong> Desgarro mucosa anal; dolor intenso defecación, sangrado rojo; 90% línea media posterior; isquemia relativa; tratamiento: nitroglicerina tópica, dilatadores, esfinterotomía lateral',
          '<strong>Absceso perianal:</strong> Infección glándula anal→colección pus; dolor intenso, fluctuación, fiebre; drenaje quirúrgico urgente; puede formar fístula',
          '<strong>Fístula anal:</strong> Trayecto anormal cripta anal→piel periné; secreción purulenta; clasificación Parks; fistulotomía/fistulectomía',
          '<strong>Cáncer anal:</strong> Escamoso 80%; VPH (16, 18) factor riesgo principal; hombres HSH, inmunodeprimidos; sangrado, masa, dolor; quimiorradioterapia (protocolo Nigro)',
          '<strong>Incontinencia fecal:</strong> Incapacidad controlar evacuación; lesión esfínter (parto, cirugía), neuropatía (DM, parto), diarrea crónica; evaluación: manometría, ecografía endoanal',
          '<strong>Prolapso rectal:</strong> Protrusión recto a través ano; prolapso mucoso (parcial) vs completo (todas capas); ancianos, multiparidad; reducción manual, cirugía (rectopexia)'
        ]
      }
    ]
  },
  {
    id: 'ureteres',
    nombre: 'Uréteres',
    subtitulo: 'Conductos de Transporte Urinario',
    icono: '🫘',
    categorias: ['urinario', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Longitud:</strong> 25-30 cm adulto; derecho ligeramente más corto que izquierdo',
          '<strong>Diámetro:</strong> 3-4 mm promedio; estrechamientos: unión ureteropélvica, cruce vasos ilíacos, unión ureterovesical',
          '<strong>Trayecto:</strong> Pelvis renal→desciende sobre psoas→cruza vasos ilíacos comunes→pelvis→vejiga (trígono)',
          '<strong>Porciones:</strong> Abdominal (retroperitoneal), pélvica (cruza vasos ilíacos), intramural (atraviesa pared vesical oblicuamente 1-2 cm)',
          '<strong>Capas pared:</strong> Mucosa (urotelio transicional), muscular (longitudinal interna + circular media + longitudinal externa), adventicia',
          '<strong>Peristaltis ureteral:</strong> Ondas 1-5/min; velocidad 2-6 cm/s; transporte activo orina riñón→vejiga'
        ]
      },
      {
        titulo: '⚙️ Función y Relaciones',
        items: [
          '<strong>Transporte urina:</strong> Peristaltis unidireccional; presión 10-25 mmHg; flujo aumenta con diuresis',
          '<strong>Mecanismo antirreflujo:</strong> Entrada oblicua vejiga; compresión ureteral al llenar vejiga; válvula funcional',
          '<strong>Relaciones anatómicas masculinas:</strong> Cruzan conducto deferente (bajo puente); relación conductos seminales',
          '<strong>Relaciones anatómicas femeninas:</strong> Cruzan por debajo arteria uterina ("water under bridge"); riesgo histerectomía',
          '<strong>Uréter derecho:</strong> Relación duodeno (2° porción), raíz mesenterio, vasos gonadales derechos',
          '<strong>Uréter izquierdo:</strong> Relación colon descendente, vasos gonadales izquierdos, mesocolon sigmoideo'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación', value: 'Segmentaria: arterias renales (proximal), gonadales, ilíacas, vesicales (distal); anastomosis longitudinales' },
          { label: 'Inervación', value: 'Plexo renal, hipogástrico; dolor referido: flanco, ingle, genitales (dermatomos T11-L2)' },
          { label: 'Capacidad peristaltis', value: 'Puede propulsar orina contra gradiente 60-80 mmHg (obstrucción parcial)' },
          { label: 'Puntos estrechamiento', value: 'Unión UPU (2mm), cruce ilíacos (4mm), unión UVU (1-5mm); sitios impactación cálculos' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Cólico renal (ureteral):</strong> Obstrucción aguda (cálculo); dolor severo cólico flanco→ingle→genitales; náuseas, hematuria; no posición antiálgica; AINEs + hidratación',
          '<strong>Litiasis ureteral:</strong> Cálculos impactados en estrechamientos; <5 mm pasan espontáneamente 90%; >10 mm requieren intervención; ureteroscopia, litotricia',
          '<strong>Estenosis ureteral:</strong> Congénita (unión UPU) o adquirida (cirugía, radioterapia, cálculos); hidronefrosis progresiva; pieloplastia',
          '<strong>Reflujo vesicoureteral (RVU):</strong> Reflujo orina vejiga→uréter; congénito (uréter corto intramural); grados I-V; pielonefritis recurrente; daño renal (cicatrices); profilaxis antibiótica',
          '<strong>Lesión iatrogénica uréter:</strong> Cirugía pélvica (histerectomía, colectomía); ligadura, sección, devascularización; ureterocutaneostomía urgente; dolor flanco, fuga urinaria',
          '<strong>Carcinoma urotelial:</strong> Células transicionales; pelvis renal/uréter 5-10% tumores uroteliales; hematuria indolora; ureteroscopia + biopsia; nefroureterectomía'
        ]
      }
    ]
  },
  {
    id: 'vejiga',
    nombre: 'Vejiga Urinaria',
    subtitulo: 'Reservorio de Orina',
    icono: '🫧',
    categorias: ['urinario', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Pelvis verdadera; posterior sínfisis púbica; anterior recto (♂) o útero/vagina (♀)',
          '<strong>Capacidad:</strong> 400-600 ml adulto; deseo miccional 150-250 ml; máxima 1000 ml',
          '<strong>Forma:</strong> Vacía: piramidal colapsada; Llena: ovoide; se expande hacia abdomen',
          '<strong>Porciones:</strong> Vértice (hacia ombligo, ligamento umbilical mediano), cuerpo, fondo (base posterior), cuello (continuación uretra)',
          '<strong>Trígono vesical:</strong> Triángulo mucosa lisa entre orificios ureterales (laterales) y orificio uretral (inferior); urotelio sin pliegues',
          '<strong>Capa muscular (detrusor):</strong> 3 capas músculo liso entrelazadas; inervación parasimpática (contracción)'
        ]
      },
      {
        titulo: '⚙️ Micción y Control',
        items: [
          '<strong>Llenado vesical:</strong> Relajación detrusor (simpático β3), contracción cuello vesical/esfínter uretral interno (simpático α1); continencia',
          '<strong>Reflejo micción:</strong> Distensión vejiga→aferencias pélvicas→centro pontino (PMC)→parasimpático S2-S4→contracción detrusor + relajación esfínter→micción',
          '<strong>Control voluntario:</strong> Corteza frontal puede inhibir/facilitar reflejo; esfínter externo (somático, pudendo) control voluntario',
          '<strong>Presión intravesical:</strong> Llenado: 5-15 cmH₂O; Miccional: 40-100 cmH₂O; Compliance: Δvolumen/Δpresión (normal >30 ml/cmH₂O)',
          '<strong>Urotelio:</strong> Epitelio transicional 3-7 capas; impermeabilidad (proteoglicanos, tight junctions); barrera orina→sangre',
          '<strong>Inervación:</strong> Parasimpático S2-S4 (contracción), simpático T10-L2 (relajación llenado), somático S2-S4 (esfínter externo)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación', value: 'Arterias vesicales superiores e inferiores (ilíaca interna); plexo venoso vesical→ilíaca interna' },
          { label: 'Frecuencia miccional', value: '6-8 veces/día normal; nocturia ≥2 veces anormal; poliuria >3 L/día' },
          { label: 'Relaciones anatómicas ♂', value: 'Anterior: espacio retropúbico (Retzius); Posterior: vesículas seminales, recto; Superior: peritoneo' },
          { label: 'Relaciones anatómicas ♀', value: 'Anterior: sínfisis púbica; Posterior: cérvix, vagina; Inferior: diafragma pélvico' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Cistitis aguda:</strong> ITU (E. coli 80%); mujeres jóvenes; disuria, urgencia, polaquiuria, dolor suprapúbico; piuria, bacteriuria; tratamiento: nitrofurantoína, fosfomicina 3g dosis única',
          '<strong>Vejiga neurógena:</strong> Disfunción neurológica; hiperrefléxica (LMS, ACV) vs arrefléxica (LMI, diabetes); residuo posmiccional; cateterismo intermitente, anticolinérgicos',
          '<strong>Incontinencia urinaria esfuerzo:</strong> Pérdida orina con ↑presión abdominal (tos, risa); mujeres multíparas; debilidad piso pélvico; Kegel, pesarios, cirugía (TVT)',
          '<strong>Incontinencia urgencia:</strong> Vejiga hiperactiva; contracciones involuntarias detrusor; urgencia, polaquiuria, nocturia; anticolinérgicos (oxibutinina), β3-agonistas (mirabegrón)',
          '<strong>Retención urinaria aguda:</strong> Imposibilidad miccionar con vejiga llena; ♂: HPB, estenosis uretral; dolor suprapúbico, globo vesical; cateterismo urgente',
          '<strong>Carcinoma vesical:</strong> 90% urotelial; tabaco factor riesgo principal; hematuria indolora macroscópica; cistoscopia + RTU; BCG intravesical (carcinoma in situ)',
          '<strong>Rotura vesical:</strong> Traumática (pélvica) o iatrogénica; extraperitoneal (pared anterior/lateral) vs intraperitoneal (cúpula llena); peritonitis química; reparación quirúrgica'
        ]
      }
    ]
  },
  {
    id: 'uretra',
    nombre: 'Uretra',
    subtitulo: 'Conducto de Excreción Urinaria',
    icono: '💧',
    categorias: ['urinario', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Uretra masculina (18-20 cm):</strong> Prostática (3-4 cm), membranosa (1-2 cm, esfínter externo), esponjosa/peneana (15 cm)',
          '<strong>Uretra femenina (3-4 cm):</strong> Recta, corta; desde cuello vesical→meato uretral externo; anterior a vagina',
          '<strong>Uretra prostática ♂:</strong> Más ancha; verumontanum (colículo seminal) con orificio utrículo prostático + conductos eyaculadores',
          '<strong>Uretra membranosa ♂:</strong> Más estrecha; atraviesa diafragma urogenital; esfínter uretral externo (control voluntario)',
          '<strong>Uretra esponjosa ♂:</strong> Rodeada por cuerpo esponjoso; glándulas bulbouretrales (Cowper) desembocan; fosa navicular (glande)',
          '<strong>Esfínteres:</strong> Interno (músculo liso, involuntario, cuello vesical), externo (músculo esquelético, voluntario, membranosa)'
        ]
      },
      {
        titulo: '⚙️ Funciones y Diferencias',
        items: [
          '<strong>Función masculina:</strong> Doble: micción + eyaculación; músculo liso + esquelético; curvaturas (subpúbica, prepúbica)',
          '<strong>Función femenina:</strong> Solo micción; relación íntima vagina (1/3 inferior); susceptible infecciones (corta)',
          '<strong>Mecanismo continencia:</strong> Esfínter interno (automático) + externo (voluntario); presión uretral >presión vesical',
          '<strong>Glándulas uretrales:</strong> Masculinas: Cowper (mucus pre-eyaculación), Littré (lubricación); Femeninas: Skene (parauretrales, homólogas próstata)',
          '<strong>Epitelio uretral:</strong> Transicional (prostática), pseudoestratificado (membranosa), estratificado (esponjosa/femenina)',
          '<strong>Irrigación:</strong> Arterias vesicales inferiores, pudendas internas, peneanas (♂), vaginales (♀)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Presión uretral ♂', value: 'Reposo 40-80 mmHg; Contracción voluntaria >100 mmHg' },
          { label: 'Presión uretral ♀', value: 'Reposo 20-40 mmHg; Menor longitud → menor resistencia' },
          { label: 'Calibre uretral', value: '♂: 8-9 mm (puede dilatar hasta 30 Fr); ♀: 6 mm (más distensible)' },
          { label: 'Relación vagina ♀', value: 'Pared anterior vagina comparte adventicia con uretra; ligamentos pubouretrales soporte' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Uretritis:</strong> Inflamación uretra; gonocócica (N. gonorrhoeae, secreción purulenta) vs no gonocócica (C. trachomatis, Ureaplasma); disuria, secreción; ceftriaxona + azitromicina',
          '<strong>Estenosis uretral:</strong> Cicatrización lumen; causas: trauma, infección, cateterismo, lichen escleroso; chorro débil, retención; uretrotomía, uretroplastia',
          '<strong>Hipospadias:</strong> Malformación congénita ♂; meato uretral ventral (glande, cuerpo, escroto); curvatura peneana (chordee); corrección quirúrgica 6-18 meses',
          '<strong>Epispadias:</strong> Malformación rara; meato uretral dorsal; asociada extrofia vesical; incontinencia; reconstrucción compleja',
          '<strong>Divertículo uretral ♀:</strong> Saculación pared uretral; infección recurrente, disuria, dispareunia, masa palpable vaginal; RM diagnóstico; excisión quirúrgica',
          '<strong>Carúncula uretral ♀:</strong> Pólipo benigno meato; mujeres postmenopáusicas; sangrado, dolor; resección si sintomática',
          '<strong>Prolapso uretral ♀:</strong> Eversión mucosa uretral; niñas prepuberales, ancianas; masa circunferencial; reducción manual, estrógenos tópicos'
        ]
      }
    ]
  }
,
  {
    id: 'testiculos',
    nombre: 'Testículos',
    subtitulo: 'Gónadas Masculinas Productoras de Espermatozoides',
    icono: '🔬',
    categorias: ['reproductor-masculino', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Escroto (extracorporal); temperatura 2-3°C menor que corporal (óptimo espermatogénesis)',
          '<strong>Dimensiones:</strong> 4-5 cm longitud, 3 cm ancho, 2.5 cm grosor; volumen 15-25 ml adulto; peso 10-14g',
          '<strong>Cubiertas:</strong> Túnica albugínea (fibrosa blanca), túnica vaginalis (serosa, prolongación peritoneo)',
          '<strong>Estructura interna:</strong> 250-300 lóbulos; cada lóbulo contiene 1-4 túbulos seminíferos (30-70 cm c/u)',
          '<strong>Túbulos seminíferos:</strong> Enrollados; epitelio germinal (espermatogénesis) + células Sertoli (soporte, BHT)',
          '<strong>Intersticio:</strong> Células Leydig (testosterona), vasos, nervios; entre túbulos'
        ]
      },
      {
        titulo: '⚙️ Funciones y Espermatogénesis',
        items: [
          '<strong>Espermatogénesis:</strong> 64-74 días; espermatogonia→espermatocito I→espermatocito II→espermátide→espermatozoide',
          '<strong>Células Sertoli:</strong> Barrera hemato-testicular, nutrición espermatogénesis, fagocitosis, inhibina B, AMH',
          '<strong>Células Leydig:</strong> Testosterona (95% testicular); LH estimula; DHT (5α-reductasa) en periféricos',
          '<strong>Regulación hormonal:</strong> Eje HPG; GnRH→LH (Leydig, testosterona) + FSH (Sertoli, espermatogénesis)',
          '<strong>Descenso testicular:</strong> Retroperitoneal→escroto; gubernáculo; 28-35 semanas gestación; proceso vaginal',
          '<strong>Producción espermática:</strong> ~1500 espermatozoides/segundo; 200-500 millones/eyaculación'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación arterial', value: 'Arteria testicular (aorta L2); arteria cremastérica, arteria deferencial' },
          { label: 'Drenaje venoso', value: 'Plexo pampiniforme→vena testicular (derecha→VCI, izquierda→vena renal); termorregulación' },
          { label: 'Inervación', value: 'Simpática T10-L1 (dolor visceral testicular→umbilical); parasimpática S2-S4' },
          { label: 'Testosterona sérica', value: 'Normal 300-1000 ng/dl; pico matutino; disminuye 1-2%/año >30 años' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Criptorquidia:</strong> Testículo no descendido; unilateral 70%; inguinal 70%, abdominal 25%; riesgo infertilidad, cáncer testicular; orquidopexia <12 meses',
          '<strong>Varicocele:</strong> Dilatación plexo pampiniforme; izquierdo 90% (drenaje vena renal, válvulas incompetentes); "bolsa de gusanos"; infertilidad (↓calidad espermática); varicocelectomía',
          '<strong>Torsión testicular:</strong> Rotación cordón espermático→isquemia; dolor súbito intenso, náuseas; signo Prehn negativo; escroto elevado; emergencia <6h; orquidopexia bilateral',
          '<strong>Orquitis:</strong> Inflamación testicular; viral (parotiditis 20-30% adultos) o bacteriana (E. coli, ETS); dolor, edema; puede causar atrofia, infertilidad',
          '<strong>Cáncer testicular:</strong> Jóvenes 15-35 años; seminoma (40%) vs no seminoma (60%, células embrionarias, teratoma); masa indolora; marcadores: AFP, β-hCG; orquiectomía radical inguinal',
          '<strong>Hipogonadismo:</strong> Primario (testicular, ↑LH/FSH) vs secundario (hipofisario, ↓LH/FSH); Klinefelter (47,XXY) causa primaria común; testosterona reemplazo'
        ]
      }
    ]
  },
  {
    id: 'prostata',
    nombre: 'Próstata',
    subtitulo: 'Glándula Accesoria Masculina',
    icono: '🫘',
    categorias: ['reproductor-masculino', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Base vejiga, rodea uretra prostática; anterior al recto (palpable tacto rectal)',
          '<strong>Dimensiones:</strong> 3 cm transversal, 4 cm vertical, 2 cm anteroposterior; forma de castaña; peso 20g joven',
          '<strong>Zonas (McNeal):</strong> Periférica (70%, cáncer), central (25%), transicional (5%, HPB), estroma fibromuscular anterior',
          '<strong>Lóbulos clásicos:</strong> Lateral derecho/izquierdo, medio, anterior, posterior; surco medio posterior (palpable TR)',
          '<strong>Cápsula prostática:</strong> Fibrosa, incompleta anteriormente; fascia de Denonvilliers posterior (separa recto)',
          '<strong>Uretra prostática:</strong> Verumontanum (colículo seminal) con orificio utrículo + conductos eyaculadores'
        ]
      },
      {
        titulo: '⚙️ Función y Secreción',
        items: [
          '<strong>Secreción prostática:</strong> 20-30% volumen seminal; líquido lechoso alcalino (pH 6.5); neutraliza acidez vaginal',
          '<strong>Componentes:</strong> PSA (licúa semen), fosfatasa ácida prostática, zinc (bacteriostático), espermina (olor semen), citrato',
          '<strong>PSA (antígeno prostático específico):</strong> Calicreína; licúa coágulo seminal; normal sérico <4 ng/ml',
          '<strong>Músculo liso:</strong> Contracción eyaculación (α1-adrenérgicos); expulsa secreción prostática',
          '<strong>Regulación:</strong> Andrógenos (testosterona→DHT por 5α-reductasa); estrógenos (↑con edad contribuye HPB)',
          '<strong>Relación anatómica:</strong> Haz neurovascular posterolateral (erección); riesgo cirugía próstata'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación', value: 'Arteria vesical inferior (rama ilíaca interna); plexo venoso prostático (drenaje ilíaca interna)' },
          { label: 'Drenaje linfático', value: 'Ganglios ilíacos internos, obturadores; importante estadificación cáncer' },
          { label: 'Inervación', value: 'Plexo prostático (simpático hipogástrico); haces neurovasculares (parasimpático, erección)' },
          { label: 'PSA sérico', value: '<4 ng/ml normal; 4-10 ng/ml zona gris; >10 ng/ml sospecha cáncer; densidad PSA, velocidad PSA' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Hiperplasia prostática benigna (HPB):</strong> Zona transicional; >50% hombres >60 años; LUTS (síntomas tracto urinario inferior): nicturia, chorro débil, goteo; I-PSS score; α-bloqueantes, 5α-reductasa inhibidores, cirugía (TURP)',
          '<strong>Cáncer de próstata:</strong> Zona periférica 70%; adenocarcinoma >95%; tacto rectal (nódulo duro), PSA elevado; Gleason score (biopsia); localized vs metastásico (hueso); vigilancia activa, prostatectomía radical, radioterapia',
          '<strong>Prostatitis aguda bacteriana:</strong> E. coli; fiebre, disuria, dolor perineal; próstata dolorosa TR; PSA puede ↑↑; antibióticos IV (fluoroquinolonas, cefalosporinas 3G) 4-6 semanas',
          '<strong>Prostatitis crónica/síndrome dolor pelviano:</strong> Dolor pelviano crónico; difícil tratamiento; α-bloqueantes, antibióticos empíricos, fisioterapia piso pélvico',
          '<strong>Retención urinaria aguda:</strong> Complicación HPB; globo vesical, dolor suprapúbico, imposibilidad miccionar; catéter urgente; α-bloqueantes, eventual TURP',
          '<strong>Prostatectomía radical:</strong> Cáncer localizado; complicaciones: incontinencia urinaria (5-20%), disfunción eréctil (30-70% según técnica); preservación haces neurovasculares reduce DE'
        ]
      }
    ]
  },
  {
    id: 'ovarios',
    nombre: 'Ovarios',
    subtitulo: 'Gónadas Femeninas Productoras de Óvulos',
    icono: '🥚',
    categorias: ['reproductor-femenino', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Ubicación:</strong> Pelvis; fosa ovárica (pared lateral pelvis); relación uréter, vasos ilíacos',
          '<strong>Dimensiones:</strong> 3-5 cm longitud, 2-3 cm ancho, 1-2 cm grosor; forma almendra; peso 6-8g',
          '<strong>Ligamentos:</strong> Suspensorio (vasos ováricos), ovárico propio (útero), mesovario (hoja posterior ligamento ancho)',
          '<strong>Estructura interna:</strong> Corteza (folículos en estroma), médula (vasos, nervios, tejido conectivo)',
          '<strong>Superficie:</strong> Epitelio germinativo (cúbico simple); túnica albugínea (tejido conectivo); cicatrices ovulación',
          '<strong>Folículos:</strong> Primordiales (~1 millón nacimiento, 400,000 pubertad, 400 ovulan), primarios, secundarios, terciarios (De Graaf), atrésicos'
        ]
      },
      {
        titulo: '⚙️ Ciclo Ovárico y Hormonas',
        items: [
          '<strong>Fase folicular (días 1-14):</strong> FSH→desarrollo folicular; células granulosa (aromatasa, estrógenos); teca interna (andrógenos); estrógenos ↑↑→pico LH',
          '<strong>Ovulación (día 14):</strong> Pico LH→ruptura folículo De Graaf→liberación ovocito II (metafase II); fimbrias capturan',
          '<strong>Fase lútea (días 14-28):</strong> Cuerpo lúteo (granulosa + teca luteinizadas); progesterona (prepara endometrio); si no fecundación→corpus albicans',
          '<strong>Estrógenos:</strong> Estradiol (E2) principal; desarrollo caracteres sexuales secundarios, proliferación endometrial, feedback negativo/positivo eje HPO',
          '<strong>Progesterona:</strong> Secretada cuerpo lúteo; transformación secretora endometrio, mantiene embarazo, ↑temperatura basal 0.5°C',
          '<strong>Reserva ovárica:</strong> AMH (hormona antimülleriana) marcador; FSH basal día 3; recuento folículos antrales ecografía'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación', value: 'Arteria ovárica (aorta L1-L2); anastomosis rama ovárica A. uterina; plexo pampiniforme femenino' },
          { label: 'Drenaje venoso', value: 'Vena ovárica derecha→VCI, izquierda→vena renal; plexo pampiniforme (termorregulación)' },
          { label: 'Ciclo menstrual', value: 'Promedio 28 días (rango 21-35); fase folicular variable, lútea constante 14 días' },
          { label: 'Menopausia', value: 'Edad promedio 51 años Chile; agotamiento folicular; FSH >40 mUI/ml, E2 <20 pg/ml' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Síndrome ovario poliquístico (SOP):</strong> Criterios Rotterdam (2/3): oligoovulación, hiperandrogenismo, ovarios poliquísticos ecografía; resistencia insulina; anovulación, hirsutismo, acné; metformina, ACO',
          '<strong>Quiste ovárico funcional:</strong> Folicular (no ovula, <5cm) o lúteo (>3cm, puede sangrar); mayoría resuelven espontáneamente 2-3 meses; ecografía control',
          '<strong>Torsión ovárica:</strong> Rotación pedículo vascular; dolor pélvico súbito, náuseas; Doppler disminuido; emergencia quirúrgica; detorsión si viable',
          '<strong>Cáncer ovárico epitelial:</strong> Seroso alto grado más común; asintomático etapas tempranas; diagnóstico tardío; ascitis, masa anexial; CA-125 elevado; cirugía citorreductora + quimioterapia (carboplatino/paclitaxel)',
          '<strong>Endometrioma:</strong> "Quiste chocolate"; endometriosis ovárica; dolor pélvico, dismenorrea, dispareunia; CA-125 puede ↑; cirugía (cistectomía) afecta reserva ovárica',
          '<strong>Insuficiencia ovárica primaria:</strong> Falla ovárica <40 años; amenorrea, FSH >40; causas: genética (Turner, FMR1 premutación), autoinmune, quimioterapia; TRH'
        ]
      }
    ]
  },
  {
    id: 'utero',
    nombre: 'Útero',
    subtitulo: 'Órgano de Gestación',
    icono: '🫄',
    categorias: ['reproductor-femenino', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Dimensiones:</strong> Nulípara 7-8 cm longitud, 5 cm ancho, 3 cm grosor; peso 50-70g; multípara más grande',
          '<strong>Porciones:</strong> Fondo (superior, inserción trompas), cuerpo (2/3), istmo, cérvix (1/3, porción vaginal + supravaginal)',
          '<strong>Posición:</strong> Anteversoflexión normal; anteversión (ángulo útero-vagina 90°), anteflexión (ángulo fondo-cérvix 120°)',
          '<strong>Capas pared:</strong> Perimetrio (serosa), miometrio (3 capas músculo liso), endometrio (mucosa)',
          '<strong>Ligamentos soporte:</strong> Cardinal (Mackenrodt), uterosacro, ancho (mesosalpinx, mesovario, mesometrio), redondo',
          '<strong>Cérvix:</strong> Orificio cervical externo (nullípara puntiforme, multípara transverso), interno; canal endocervical; moco cervical'
        ]
      },
      {
        titulo: '⚙️ Endometrio y Ciclo Menstrual',
        items: [
          '<strong>Capas endometrio:</strong> Funcional (descama menstruación) y basal (regenera)',
          '<strong>Fase proliferativa (días 5-14):</strong> Estrógenos→proliferación glándulas/estroma; grosor 1→8-10 mm; arterias espirales crecen',
          '<strong>Fase secretora (días 15-28):</strong> Progesterona→glándulas tortuosas secretoras (glucógeno); decidualización estroma; ventana implantación días 20-24',
          '<strong>Menstruación (días 1-5):</strong> ↓Progesterona/estrógenos→vasoconstricción arterias espirales→isquemia→descamación capa funcional; 30-80 ml sangrado',
          '<strong>Moco cervical:</strong> Proliferativo: cristalización en helecho, filante (espinnbarkeit >10cm), facilita espermatozoides; Secretor: espeso, celular, bloquea paso',
          '<strong>Miometrio embarazo:</strong> Hipertrofia (fibras 50→500 μm) e hiperplasia; peso útero 1 kg término; contracciones Braxton-Hicks→trabajo parto (oxitocina)'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación', value: 'Arterias uterinas (rama anterior ilíaca interna); anastomosis ováricas; arcuatas (miometrio)→radiales→espirales (endometrio)' },
          { label: 'Inervación', value: 'Plexo hipogástrico inferior (simpático); parasimpático S2-S4; dolor uterino→dermatomos T10-L1' },
          { label: 'Cavidad uterina', value: 'Virtual; 6-8 cm longitud; triangular (vista frontal); hendidura (vista sagital)' },
          { label: 'Cérvix', value: 'Longitud 2.5-3 cm; dilatación parto 10 cm; zona transformación (unión escamoso-columnar) prone HPV' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Miomas uterinos (leiomiomas):</strong> Tumores benignos músculo liso; 70% mujeres >45 años; clasificación FIGO (subserosos, intramurales, submucosos); sangrado anormal, dolor, infertilidad; manejo: observación, ACO, DIU-levonorgestrel, embolización, miomectomía/histerectomía',
          '<strong>Adenomiosis:</strong> Endometrio en miometrio; dismenorrea secundaria, menorragia, útero globuloso blando; RM diagnóstico; tratamiento: ACO, DIU-LNG, histerectomía definitivo',
          '<strong>Cáncer endometrial:</strong> Cáncer ginecológico más común países desarrollados; tipo I (endometrioide, estrógeno-dependiente, >80%) vs tipo II (seroso, >65 años, agresivo); sangrado postmenopáusico; estadificación quirúrgica; histerectomía + salpingooforectomía bilateral',
          '<strong>Hiperplasia endometrial:</strong> Proliferación excesiva; simple vs compleja, con/sin atipia; anovulación crónica, obesidad, tamoxifeno; atipia→riesgo cáncer 30%; progestágenos, histerectomía si atipia',
          '<strong>Endometritis:</strong> Infección endometrio; postparto/postaborto; fiebre, dolor, loquios fétidos; E. coli, Bacteroides; clindamicina + gentamicina',
          '<strong>Prolapso uterino:</strong> Descenso útero por debilidad piso pélvico; grados I-IV; multíparas, edad; sensación masa, incontinencia; pesario, histerectomía vaginal + colporrafia'
        ]
      }
    ]
  },
  {
    id: 'vagina',
    nombre: 'Vagina',
    subtitulo: 'Canal de Copulación y Parto',
    icono: '🌺',
    categorias: ['reproductor-femenino', 'organos-abdominales'],
    secciones: [
      {
        titulo: '📋 Estructura Macroscópica',
        items: [
          '<strong>Longitud:</strong> 7-10 cm pared anterior, 9-12 cm pared posterior; distensible',
          '<strong>Forma:</strong> Tubo fibromuscular colapsado; forma H corte transversal; eje oblicuo (40° horizontal)',
          '<strong>Relaciones:</strong> Anterior: vejiga, uretra; Posterior: recto, fondo de saco Douglas; Lateral: elevador ano',
          '<strong>Fórnices:</strong> Recesos alrededor cérvix; anterior (poco profundo), posterior (más profundo, fondo saco Douglas), laterales',
          '<strong>Capas pared:</strong> Mucosa (epitelio escamoso estratificado no queratinizado, sin glándulas), muscular (circular interna, longitudinal externa), adventicia',
          '<strong>Himen:</strong> Pliegue mucosa; orificio variable; imperforate (atresia) patológico'
        ]
      },
      {
        titulo: '⚙️ Función y Fisiología',
        items: [
          '<strong>pH vaginal:</strong> Reproductivo 3.8-4.5 (ácido); lactobacilos (flora Döderlein) producen ácido láctico desde glucógeno; protección infecciones',
          '<strong>Flujo vaginal:</strong> Normal 1-4 ml/día; claro/blanco, sin olor; aumenta ovulación (estrógenos), excitación; células descamadas + transudado',
          '<strong>Cambios cíclicos:</strong> Proliferativos (estrógenos): epitelio grueso (30-40 capas), glucógeno; Secretor: adelgazamiento relativo',
          '<strong>Lubricación coital:</strong> Trasudado plasma (excitación); glándulas Bartholin (vestibular mayor) 2-3 ml muco; glándulas Skene (parauretrales)',
          '<strong>Distensión parto:</strong> Capacidad estiramiento 200-300%; corona radiata cabeza fetal 10 cm; episiotomía raramente necesaria',
          '<strong>Microbiota:</strong> Lactobacillus dominante (>95%); pH ácido; peróxido hidrógeno; alteración→vaginosis bacteriana'
        ]
      },
      {
        titulo: '🔬 Datos Anatómicos Clave',
        tipo: 'tabla',
        datos: [
          { label: 'Irrigación', value: 'Arteria vaginal (ilíaca interna), ramas uterina, pudenda interna, rectal media; plexo venoso vaginal' },
          { label: 'Inervación', value: '1/3 inferior: somática (pudendo, S2-S4); 2/3 superiores: autonómica (plexo hipogástrico); parto dolor visceral' },
          { label: 'Drenaje linfático', value: '1/3 inferior: inguinales superficiales; 2/3 superiores: ilíacos internos/externos' },
          { label: 'Soporte anatómico', value: 'Nivel I: cardinal/uterosacro; Nivel II: arcus tendineus fascia pelvis; Nivel III: cuerpo perineal' }
        ]
      },
      {
        titulo: '⚕️ Importancia Clínica',
        tipo: 'clinica',
        items: [
          '<strong>Vaginosis bacteriana:</strong> Disbiosis; ↓Lactobacillus, ↑anaerobios (Gardnerella); flujo gris homogéneo, olor pescado (aminas), pH >4.5; clue cells; metronidazol oral/tópico',
          '<strong>Candidiasis vulvovaginal:</strong> Candida albicans 90%; flujo blanco grumoso ("requesón"), prurito intenso, eritema; pH normal; hifas/pseudohifas KOH; fluconazol oral dosis única 150mg',
          '<strong>Tricomoniasis:</strong> Trichomonas vaginalis; ETS; flujo amarillo-verde espumoso, olor fétido, cérvix fresa; pH >5; protozoarios flagelados móviles; metronidazol 2g dosis única (tratar pareja)',
          '<strong>Atrofia vaginal (GSM):</strong> Posmenopausia; ↓estrógenos→adelgazamiento epitelio, ↓lubricación, pH ↑; sequedad, dispareunia, sangrado postcoital; estrógenos vaginales (crema, óvulos, anillo)',
          '<strong>Prolapso pared vaginal:</strong> Cistocele (anterior), rectocele (posterior), enterocele (fondo saco); sensación bulto, dificultad evacuación; pesario, colporrafia',
          '<strong>Cáncer vaginal:</strong> Raro (<2% cánceres ginecológicos); escamoso 85%; >60 años; HPV factor riesgo; sangrado, flujo, masa; radioterapia principalmente',
          '<strong>Fístula vesicovaginal:</strong> Comunicación vejiga-vagina; parto obstruido (países desarrollo), cirugía ginecológica, radioterapia; incontinencia continua; reparación quirúrgica'
        ]
      }
    ]
  }
,
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
