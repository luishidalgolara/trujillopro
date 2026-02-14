// ═══════════════════════════════════════════════════════════
// ANATOMÍA DATA 3 - Sistema Cardiovascular Completo
// Información 100% actualizada y verificada para estudiantes de medicina en Chile
// ═══════════════════════════════════════════════════════════

const ANATOMIA_DATA_3 = [
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
];
