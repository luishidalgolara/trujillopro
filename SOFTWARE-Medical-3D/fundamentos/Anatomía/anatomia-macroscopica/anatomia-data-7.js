// ═══════════════════════════════════════════════════════════
// ANATOMÍA DATA 7 - Sistemas Reproductores Masculino y Femenino
// Información 100% actualizada y verificada para estudiantes de medicina en Chile
// ═══════════════════════════════════════════════════════════

const ANATOMIA_DATA_7 = [
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
];
