// ═══════════════════════════════════════════════════════════
// ANATOMÍA DATA 6 - Intestinos y Sistema Urinario Completo
// Información 100% actualizada y verificada para estudiantes de medicina en Chile
// ═══════════════════════════════════════════════════════════

const ANATOMIA_DATA_6 = [
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
];
