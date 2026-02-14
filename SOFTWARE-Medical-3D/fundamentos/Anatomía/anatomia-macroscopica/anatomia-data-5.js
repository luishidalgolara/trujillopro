// ═══════════════════════════════════════════════════════════
// ANATOMÍA DATA 5 - Sistema Digestivo Completo (Continuación)
// Información 100% actualizada y verificada para estudiantes de medicina en Chile
// ═══════════════════════════════════════════════════════════

const ANATOMIA_DATA_5 = [
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
];
