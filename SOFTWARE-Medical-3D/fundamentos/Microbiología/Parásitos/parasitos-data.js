// ═══════════════════════════════════════════════════════════
// PARASITOS DATA - Base de datos de parásitos
// ═══════════════════════════════════════════════════════════

const PARASITOS_DATA = [
  {
    id: 'plasmodium-falciparum',
    nombre: 'Plasmodium falciparum',
    subtitulo: 'Protozoario · Apicomplexa · Agente de malaria grave',
    icono: '🦟',
    categorias: ['protozoarios', 'sanguineos', 'transmision-vectorial'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Trofozoíto (anillo): Forma de sello, 1-2 μm, citoplasma fino',
          'Esquizonte: Múltiples merozoítos (8-32), no observado en sangre periférica',
          'Gametocitos: Forma de banana/media luna (patognomónico)',
          'Múltiples anillos: 2-3 por eritrocito (infección severa)',
          'Pigmento malárico (hemozoína): Acúmulo de hemoglobina digerida',
          'No agranda eritrocito: Sin punteado de Schüffner'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Vector: Mosquito Anopheles hembra (hospedador definitivo)',
          'Esporozoítos: Inoculados por picadura, infectan hepatocitos',
          'Esquizogonia hepática: 5-7 días, sin recaídas (no hipnozoítos)',
          'Merozoítos: Liberados, invaden eritrocitos',
          'Esquizogonia eritrocítica: 48 horas (fiebre terciana maligna)',
          'Gametocitos: Formas sexuales, maduras en 10-12 días',
          'Reproducción sexual: En mosquito (esporogonia)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '23 Mb (14 cromosomas)' },
          { label: 'Contenido AT', value: '~80% (extremadamente alto)' },
          { label: 'Genes', value: '~5,300 genes' },
          { label: 'Variación antigénica', value: 'var genes (PfEMP1, ~60 copias)' },
          { label: 'Resistencia farmacológica', value: 'pfcrt, pfmdr1, kelch13' },
          { label: 'Organelos', value: 'Apicoplasto (diana terapéutica)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Malaria grave (cerebral): Coma, convulsiones, muerte',
          'Anemia severa: Hemólisis masiva, parasitemia >5%',
          'Hipoglucemia: Consumo de glucosa por parásitos',
          'Insuficiencia renal aguda: Hemoglobinuria ("fiebre de aguas negras")',
          'Edema pulmonar, SDRA: Complicación fatal',
          'Malaria placentaria: Embarazadas, bajo peso al nacer',
          'Mortalidad: >600,000 muertes/año (90% África subsahariana)',
          'Tratamiento: Artemisinina combinada (ACT), quinina + doxiciclina'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis y Virulencia',
        items: [
          'Citoaderencia: PfEMP1 une eritrocitos infectados a endotelio',
          'Secuestro: Capilares cerebrales (malaria cerebral)',
          'Roseteo: Eritrocitos infectados rodean no infectados',
          'Hemólisis: Ruptura sincrónica cada 48h (picos febriles)',
          'Anemia: Destrucción eritrocitaria + supresión medular',
          'Tormenta de citoquinas: TNF-α, IL-1, IL-6 (fiebre, shock)',
          'Resistencia a cloroquina: Mutación pfcrt (bomba de eflujo)',
          'Resistencia a artemisinina: Mutación kelch13 (sudeste asiático)'
        ]
      }
    ]
  },
  {
    id: 'entamoeba-histolytica',
    nombre: 'Entamoeba histolytica',
    subtitulo: 'Protozoario · Amoebozoa · Agente de disentería amebiana',
    icono: '🔴',
    categorias: ['protozoarios', 'intestinales', 'transmision-fecal-oral'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Trofozoíto: 15-60 μm, móvil con pseudópodos',
          'Eritrofagocitosis: Ingiere eritrocitos (diagnóstico diferencial)',
          'Núcleo: Cromatina periférica fina, cariosoma central pequeño',
          'Quiste: 10-20 μm, 4 núcleos maduros, forma infectante',
          'Cuerpos cromatoidales: Forma de cigarro en quistes jóvenes',
          'Movimiento: Progresivo direccional (vs. E. dispar no invasiva)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Transmisión: Fecal-oral (agua/alimentos contaminados)',
          'Enquistamiento: Quiste resiste cloración, sobrevive semanas',
          'Desenquistamiento: Intestino delgado, libera 4 trofozoítos',
          'Colonización: Colon (ciego, sigmoides)',
          'Invasión: Penetra mucosa intestinal (disentería)',
          'Diseminación hematógena: Vena porta → absceso hepático',
          'Quistes en heces: Forma de resistencia y transmisión',
          'Sin hospedador intermediario: Ciclo directo'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~20 Mb haploide' },
          { label: 'Cromosomas', value: '14 pares' },
          { label: 'Genes', value: '~8,000 genes' },
          { label: 'Peculiaridad', value: 'Sin mitocondrias (mitosomas)' },
          { label: 'Lectina Gal/GalNAc', value: 'Principal factor virulencia' },
          { label: 'Especies hermanas', value: 'E. dispar (no patógena, 90% casos)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Colitis amebiana: Diarrea mucosanguinolenta, dolor abdominal',
          'Disentería amebiana: Evacuaciones con moco, sangre y pus',
          'Úlceras en "botón de camisa": Mucosa intestinal (sigmoidoscopia)',
          'Absceso hepático amebiano: Dolor HD, fiebre, hepatomegalia',
          'Absceso "en pasta de anchoas": Contenido necrótico marrón-rojizo',
          'Complicaciones: Perforación intestinal, peritonitis',
          'Prevalencia: 50 millones casos/año, 100,000 muertes',
          'Tratamiento: Metronidazol (invasivo) + paromomicina (luminal)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis y Virulencia',
        items: [
          'Lectina Gal/GalNAc: Adherencia a mucosa colónica',
          'Proteasas de cisteína: Degradación de mucina y matriz extracelular',
          'Amebaporos: Proteínas formadoras de poros (lisis celular)',
          'Resistencia al complemento: Evasión de lisis mediada por C9',
          'Fagocitosis: Neutrófilos, linfocitos (inmunosupresión local)',
          'Invasión por contigüidad: Submucosa → hígado (vía porta)',
          'Lisis contacto-dependiente: Destrucción tisular directa',
          'Necrosis licuefactiva: Formación de abscesos (sin bacterias)'
        ]
      }
    ]
  },
  {
    id: 'giardia-lamblia',
    nombre: 'Giardia lamblia (intestinalis)',
    subtitulo: 'Protozoario · Diplomonadida · Agente de giardiasis',
    icono: '😷',
    categorias: ['protozoarios', 'intestinales', 'transmision-fecal-oral'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Trofozoíto: 10-20 μm, forma de "pera" o "cometa"',
          'Cara triste: Dos núcleos, cuerpos medianos (aspecto de ojos y boca)',
          'Disco ventral: Ventosa adhesiva (adherencia a mucosa)',
          '4 pares de flagelos: Movimiento en "hoja cayendo"',
          'Quiste: 8-12 μm, ovoide, 4 núcleos, pared resistente',
          'Binucleado: Trofozoíto y quiste joven (2 núcleos)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Transmisión: Fecal-oral (agua contaminada, recreativa)',
          'Quiste: Forma infectante, resiste cloración',
          'Desenquistamiento: Estómago (pH ácido) y duodeno',
          'Cada quiste: Libera 2 trofozoítos (división)',
          'Colonización: Duodeno y yeyuno proximal (adherencia)',
          'Reproducción: Fisión binaria (asexual)',
          'Enquistamiento: Intestino delgado distal',
          'Excreción: Quistes en heces (millones/día)',
          'Sin fase sanguínea o tisular: Exclusivamente intestinal'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~12 Mb (compacto)' },
          { label: 'Cromosomas', value: '5 pares' },
          { label: 'Genes', value: '~6,500 genes' },
          { label: 'Diploidía', value: 'Dos núcleos diploides (tetraploide)' },
          { label: 'Variación antigénica', value: 'VSP (variant surface proteins, >200)' },
          { label: 'Genotipos', value: 'A y B infectan humanos (8 assemblages totales)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Giardiasis aguda: Diarrea acuosa, distensión, flatulencia',
          'Giardiasis crónica: Malabsorción, esteatorrea, pérdida de peso',
          'Síntomas: Diarrea explosiva fétida, náusea, anorexia',
          'Sin invasión: No sangre ni leucocitos en heces',
          'Intolerancia a lactosa: Daño a microvellosidades (disacaridasas)',
          'Deficiencia vitaminas: A, B12, folato (malabsorción)',
          'Prevalencia: 200 millones casos/año, común en niños',
          'Tratamiento: Metronidazol, tinidazol, nitazoxanida'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis y Virulencia',
        items: [
          'Disco ventral: Adherencia mecánica a enterocitos',
          '"Manta de trofozoítos": Cobertura de mucosa duodenal',
          'Barrera física: Bloquea absorción de nutrientes',
          'Daño microvellosidades: Atrofia, acortamiento',
          'Aumento apoptosis: Enterocitos del yeyuno',
          'Variación antigénica: VSP (evasión inmune)',
          'Arginina deiminasa: Consume arginina del hospedador',
          'Proteasas de cisteína: Degradación de inmunoglobulinas',
          'Sin mitocondrias: Mitosomas (metabolismo anaeróbico)'
        ]
      }
    ]
  },
  {
    id: 'toxoplasma-gondii',
    nombre: 'Toxoplasma gondii',
    subtitulo: 'Protozoario · Apicomplexa · Zoonosis felina',
    icono: '🐱',
    categorias: ['protozoarios', 'tisulares', 'transmision-zoonotica'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Taquizoíto: 4-8 μm, forma de arco/media luna',
          'Bradizoíto: Forma quística en tejidos (SNC, músculo)',
          'Quiste tisular: 10-200 μm, con cientos de bradizoítos',
          'Ooquiste: 10-12 μm, esférico, en heces de felinos',
          'Complejo apical: Conoide, roptrias, micronemas (invasión)',
          'Vacuola parasitófora: No fusiona con lisosomas'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Hospedador definitivo: Gatos (reproducción sexual)',
          'Hospedadores intermediarios: Mamíferos, aves (asexual)',
          'Gato infectado: Excreta ooquistes (1-2 semanas)',
          'Esporulación: Ooquistes maduran en ambiente (1-5 días)',
          'Transmisión humana: Ooquistes (agua, tierra), quistes (carne cruda), transplacentaria',
          'Fase aguda: Taquizoítos (replicación rápida)',
          'Fase crónica: Bradizoítos enquistados (latencia de por vida)',
          'Reactivación: En inmunosupresión (VIH, trasplante)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~65 Mb (14 cromosomas)' },
          { label: 'Contenido GC', value: '~52%' },
          { label: 'Genes', value: '~8,000 genes' },
          { label: 'Clonalidad', value: '3 linajes clonales (I, II, III)' },
          { label: 'Apicoplasto', value: 'Organelo remanente (diana farmacológica)' },
          { label: 'Variación', value: 'Bajo polimorfismo (propagación clonal)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Toxoplasmosis aguda inmunocompetente: 90% asintomático, linfadenopatía',
          'Toxoplasmosis cerebral: VIH+ (CD4 <100), lesiones multifocales',
          'Coriorretinitis: Infección congénita o reactivación (cicatrices maculares)',
          'Toxoplasmosis congénita: Tríada Sabin (coriorretinitis, hidrocefalia, calcificaciones)',
          'Aborto espontáneo: Infección en 1er trimestre',
          'Prevalencia: 30% población mundial seropositiva',
          'Grupos de riesgo: VIH+, trasplantados, embarazadas seronegativas',
          'Tratamiento: Pirimetamina + sulfadiazina + ácido folínico',
          'Profilaxis VIH: TMP-SMX cuando CD4 <100'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis y Virulencia',
        items: [
          'Invasión activa: Penetración de cualquier célula nucleada',
          'Vacuola parasitófora modificada: Evita fusión fagolisosoma',
          'Proteínas de roptrias (ROP): Modulan inmunidad del hospedador',
          'Proteínas de gránulos densos (GRA): Modifican vacuola',
          'Diseminación hematógena: Infecta cerebro, retina, músculo',
          'Conversión taquizoíto-bradizoíto: Presión inmune (IFN-γ)',
          'Latencia: Quistes intactos de por vida (inmunocompetentes)',
          'Neurotropismo: Predilección por SNC y retina',
          'Modulación conductual: Cambios en ratones (¿humanos?)'
        ]
      }
    ]
  },
  {
    id: 'trypanosoma-cruzi',
    nombre: 'Trypanosoma cruzi',
    subtitulo: 'Protozoario · Kinetoplastida · Agente de enfermedad de Chagas',
    icono: '💔',
    categorias: ['protozoarios', 'sanguineos', 'transmision-vectorial'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Tripomastigote metacíclico: 20 μm, forma infectante (heces de vector)',
          'Tripomastigote sanguíneo: Forma de "C" o "S", núcleo central',
          'Amastigote: 2-4 μm, redondeado, intracelular (músculo, SNC)',
          'Epimastigote: En intestino del vector (multiplicación)',
          'Kinetoplasto: DNA mitocondrial grande (característico)',
          'Flagelo: Emerge posterior, membrana ondulante'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Vector: Triatoma infestans, T. dimidiata ("chinche besucona")',
          'Transmisión: Heces del vector en sitio de picadura (rascado)',
          'Otras vías: Transfusional, trasplante, congénita, oral (jugos contaminados)',
          'Invasión: Macrófagos, células musculares cardíacas y lisas',
          'Transformación: Tripomastigote → amastigote intracelular',
          'Multiplicación: Amastigotes por fisión binaria',
          'Liberación: Lisis celular, tripomastigotes a sangre',
          'Vector se infecta: Ingiere tripomastigotes, se transforman en epimastigotes',
          'Metaciclogénesis: Epimastigote → tripomastigote metacíclico (intestino posterior)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~55 Mb (haploide)' },
          { label: 'Cromosomas', value: '41 pares' },
          { label: 'Genes', value: '~12,000 genes' },
          { label: 'Kinetoplasto DNA', value: 'Maxicírculos y minicírculos (15-20% DNA total)' },
          { label: 'Variación antigénica', value: 'Trans-sialidasa, mucinas' },
          { label: 'Unidades discretas', value: 'DTU I-VI, TcBat (diversidad genética)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Fase aguda: Chagoma de inoculación, signo de Romaña (edema periorbital)',
          'Fiebre, hepatoesplenomegalia, miocarditis aguda (rara, grave)',
          'Fase crónica indeterminada: Asintomática, serología positiva (60-70%)',
          'Cardiopatía chagásica crónica: Cardiomegalia, insuficiencia cardíaca, arritmias (30%)',
          'Megavísceras: Megaesófago, megacolon (disfagia, constipación)',
          'Reactivación: Inmunosupresión (trasplante, VIH) - meningoencefalitis',
          'Prevalencia: 6-7 millones infectados (Latinoamérica)',
          'Tratamiento: Benznidazol, nifurtimox (eficacia >90% fase aguda, <20% crónica)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis y Virulencia',
        items: [
          'Invasión: Trans-sialidasa transfiere ácido siálico (facilita entrada)',
          'Multiplicación intracelular: Destrucción de miocitos',
          'Persistencia: Amastigotes en músculo cardíaco, liso, SNC',
          'Autoinmunidad: Mimetismo molecular (miosina, receptores)',
          'Inflamación crónica: Fibrosis miocárdica, denervación',
          'Destrucción ganglios: Plexo de Auerbach (megavísceras)',
          'Variación antigénica: Familia de mucinas (evasión inmune)',
          'Evasión del complemento: Inhibición de lisis',
          'Cardiopatía: Daño directo + autoinmune + denervación'
        ]
      }
    ]
  },
  {
    id: 'leishmania-donovani',
    nombre: 'Leishmania donovani',
    subtitulo: 'Protozoario · Kinetoplastida · Agente de leishmaniasis visceral',
    icono: '🪰',
    categorias: ['protozoarios', 'sanguineos', 'transmision-vectorial'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Amastigote: 2-4 μm, intracelular en macrófagos',
          'Núcleo y kinetoplasto: Visibles con Giemsa',
          'Promastigote: 10-20 μm, flagelado, en vector',
          'Promastigote metacíclico: Forma infectante',
          'Sin membrana ondulante: Flagelo libre',
          'Forma de "Donovan bodies": Amastigotes en macrófagos (médula ósea, bazo)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Vector: Phlebotomus (Viejo Mundo), Lutzomyia (Nuevo Mundo)',
          'Inoculación: Promastigotes metacíclicos por picadura',
          'Fagocitosis: Neutrófilos, luego macrófagos',
          'Transformación: Promastigote → amastigote en fagolisosoma',
          'Multiplicación: Fisión binaria dentro de macrófagos',
          'Lisis celular: Liberación, infección de nuevos macrófagos',
          'Diseminación: Sistema reticuloendotelial (bazo, hígado, médula)',
          'Vector se infecta: Ingiere macrófagos infectados',
          'En mosquito: Amastigote → promastigote → metacíclico'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Genética',
        datos: [
          { label: 'Genoma', value: '~32 Mb (36 cromosomas)' },
          { label: 'Contenido GC', value: '~59%' },
          { label: 'Genes', value: '~8,300 genes' },
          { label: 'Especies clínicas', value: 'L. donovani, L. infantum (visceral)' },
          { label: 'Otras especies', value: 'L. major, L. tropica (cutánea), L. braziliensis (mucocutánea)' },
          { label: 'Kinetoplasto DNA', value: 'Maxicírculos y minicírculos' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Leishmaniasis visceral (Kala-azar): Fiebre, hepatoesplenomegalia masiva, pancitopenia',
          'Hiperpigmentación: Piel oscura ("fiebre negra")',
          'Caquexia: Pérdida de peso severa, desnutrición',
          'Inmunosupresión: Infecciones bacterianas secundarias',
          'Leishmaniasis dérmica post-kala-azar (PKDL): Nódulos, máculas faciales',
          'Coinfección VIH: Reactivación, enfermedad severa',
          'Prevalencia: 50,000-90,000 casos/año, 95% India, Bangladesh, Sudán, Brasil, Etiopía',
          'Mortalidad: >95% sin tratamiento',
          'Tratamiento: Anfotericina B liposomal (1ª línea), miltefosina, antimoniales'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis y Virulencia',
        items: [
          'Supervivencia en fagolisosoma: Adaptación a pH ácido, enzimas',
          'Lipofosfoglicano (LPG): Inhibe fusión fagolisosoma',
          'Inhibición de óxido nítrico: Bloquea mecanismo microbicida',
          'Viscerotropismo: L. donovani/infantum invade órganos profundos',
          'Esplenomegalia masiva: Hiperplasia del sistema reticuloendotelial',
          'Pancitopenia: Hiperesplenismo, supresión medular',
          'Hipergammaglobulinemia: Policlonal (no protectora)',
          'Inmunosupresión: Shift Th1 → Th2 (IL-10, TGF-β)',
          'PKDL: Reservorio humano (no visceral)'
        ]
      }
    ]
  },
  {
    id: 'ascaris-lumbricoides',
    nombre: 'Ascaris lumbricoides',
    subtitulo: 'Nematodo · Intestinal · Geohelmintos más común',
    icono: '🪱',
    categorias: ['helmintos', 'nematodos', 'transmision-fecal-oral'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Adulto hembra: 20-35 cm de longitud, 3-6 mm diámetro',
          'Adulto macho: 15-30 cm, extremo posterior curvado',
          'Color: Rosa-blanquecino, cilíndrico',
          'Huevo fértil: 45-75 μm, ovoide, capa externa mamelonar',
          'Huevo no fértil: Más elongado, sin larva',
          'Cutícula: Tres capas (externa, media, interna)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Transmisión: Fecal-oral (huevos en suelo contaminado)',
          'Maduración: 2-4 semanas en suelo (larva L2)',
          'Ingestión: Huevos embrionados',
          'Eclosión: Intestino delgado, penetran mucosa',
          'Migración larval: Circulación → pulmón (10-14 días)',
          'Ascenso pulmonar: Alvéolos → bronquiolos → tráquea',
          'Deglución: Larvas retornan a intestino delgado',
          'Maduración: Yeyuno, adultos en 2-3 meses',
          'Oviposición: 200,000 huevos/día por hembra',
          'Longevidad: 1-2 años'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Parasitaria',
        datos: [
          { label: 'Filo', value: 'Nematoda (gusanos redondos)' },
          { label: 'Hospedador definitivo', value: 'Humano (único)' },
          { label: 'Sitio de infección', value: 'Intestino delgado (yeyuno)' },
          { label: 'Huevos por día', value: '200,000 por hembra' },
          { label: 'Periodo prepatente', value: '60-75 días' },
          { label: 'Prevalencia', value: '800 millones - 1.2 billones infectados' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Síndrome de Löffler: Neumonía eosinofílica (migración larval)',
          'Desnutrición: Competencia por nutrientes, malabsorción',
          'Obstrucción intestinal: Bola de gusanos (niños)',
          'Obstrucción biliar: Colangitis, pancreatitis',
          'Apendicitis: Migración errática',
          'Vólvulo: Masa de gusanos',
          'Neumonía por aspiración: Vómito de gusanos',
          'Tratamiento: Albendazol, mebendazol, ivermectina'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis',
        items: [
          'Fase migratoria: Daño pulmonar (hemorragia, infiltrado)',
          'Hipersensibilidad: Eosinofilia marcada (respuesta Th2)',
          'Competencia nutricional: Consumo de proteínas, vitamina A',
          'Obstrucción mecánica: Alta carga parasitaria (>100 gusanos)',
          'Migración errática: Conductos biliares, pancreáticos',
          'Neurotoxinas: Ascaron (bloqueador neuromuscular)',
          'Respuesta antiinflamatoria: Modulación inmune (IgE, IL-10)',
          'Retardo crecimiento: Niños con infecciones crónicas'
        ]
      }
    ]
  },
  {
    id: 'trichuris-trichiura',
    nombre: 'Trichuris trichiura',
    subtitulo: 'Nematodo · Intestinal · Gusano látigo',
    icono: '〰️',
    categorias: ['helmintos', 'nematodos', 'transmision-fecal-oral'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Adulto: 30-50 mm, forma de látigo',
          'Extremo anterior: Delgado, 3/5 de longitud (esófago)',
          'Extremo posterior: Grueso (intestino, órganos reproductores)',
          'Huevo: 50-55 μm, forma de barril, tapones polares bipolares',
          'Hembra mayor que macho',
          'Color: Rosado-gris'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Transmisión: Fecal-oral (huevos en suelo)',
          'Embrionación: 2-4 semanas en suelo húmedo',
          'Ingestión: Huevos embrionados',
          'Eclosión: Intestino delgado',
          'Penetración: Mucosa del ciego',
          'Maduración: Migran a colon, insertan extremo anterior',
          'Residencia: Colon (principalmente ciego y recto)',
          'Oviposición: 3,000-20,000 huevos/día',
          'Periodo prepatente: 60-90 días',
          'Longevidad: 1-3 años'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Parasitaria',
        datos: [
          { label: 'Filo', value: 'Nematoda' },
          { label: 'Hospedador', value: 'Humano (único)' },
          { label: 'Sitio adultos', value: 'Ciego, colon ascendente' },
          { label: 'Huevos/día', value: '3,000-20,000 por hembra' },
          { label: 'Periodo prepatente', value: '60-90 días' },
          { label: 'Prevalencia', value: '600-800 millones infectados' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Tricuriasis leve: Asintomática (<100 gusanos)',
          'Tricuriasis severa: Dolor abdominal, diarrea disentérica',
          'Síndrome disentérico de Trichuris: Evacuaciones mucosanguinolentas',
          'Anemia ferropénica: Pérdida sanguínea crónica (5 ml/día por 100 gusanos)',
          'Prolapso rectal: Niños con infección masiva (>800 gusanos)',
          'Retardo crecimiento: Malnutrición, anemia crónica',
          'Dedos en palillo de tambor: Hipoxia crónica',
          'Tratamiento: Mebendazol (3 días), albendazol, ivermectina'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis',
        items: [
          'Inserción mucosa: Extremo anterior penetra epitelio colónico',
          'Pérdida sanguínea: Microhemorragias continuas',
          'Inflamación crónica: Respuesta Th2, eosinofilia',
          'Diarrea: Inflamación colónica, hipersecreción',
          'Anemia: Acumulativa en infecciones intensas',
          'Desnutrición proteico-calórica: Niños',
          'Tenesmo: Inflamación rectal, urgencia',
          'Microbiota alterada: Disbiosis intestinal'
        ]
      }
    ]
  },
  {
    id: 'enterobius-vermicularis',
    nombre: 'Enterobius vermicularis',
    subtitulo: 'Nematodo · Intestinal · Oxiuro',
    icono: '📌',
    categorias: ['helmintos', 'nematodos', 'transmision-fecal-oral'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Adulto hembra: 8-13 mm, extremo posterior puntiagudo',
          'Adulto macho: 2-5 mm, extremo posterior curvado',
          'Color: Blanco brillante ("gusano alfiler")',
          'Huevo: 50-60 x 20-30 μm, ovoide, asimétrico, aplanado un lado',
          'Huevo embrionado: Larva infectante dentro',
          'Aletas cefálicas: Expansiones cuticulares'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Transmisión: Fecal-oral, ano-mano-boca',
          'Autoinfección: Común (ciclo perpetuo)',
          'Ingestión: Huevos embrionados',
          'Eclosión: Duodeno',
          'Migración: Intestino delgado → ciego',
          'Maduración: Región ileocecal',
          'Migración nocturna: Hembras grávidas a región perianal',
          'Oviposición: Pliegues perianales (10,000-15,000 huevos)',
          'Embrionación rápida: 4-6 horas (infectantes)',
          'Ciclo corto: 2-6 semanas',
          'Longevidad: 1-2 meses'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Parasitaria',
        datos: [
          { label: 'Filo', value: 'Nematoda' },
          { label: 'Hospedador', value: 'Humano (principal)' },
          { label: 'Sitio adultos', value: 'Ciego, apéndice' },
          { label: 'Oviposición', value: 'Región perianal (nocturna)' },
          { label: 'Periodo prepatente', value: '2-6 semanas' },
          { label: 'Prevalencia', value: 'Helminto más común en países desarrollados' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Prurito perianal nocturno: Síntoma cardinal',
          'Insomnio: Irritabilidad, agitación nocturna (niños)',
          'Prurito vulvar: Migración errática a vagina',
          'Vulvovaginitis: Inflamación por gusanos',
          'Salpingitis: Migración al tracto genital femenino (rara)',
          'Granulomas: Reacción a huevos ectópicos',
          'Apendicitis: Obstrucción apendicular (controversial)',
          'Transmisión fácil: Familiar, escolar (hacinamiento)',
          'Diagnóstico: Prueba de Graham (cinta adhesiva)',
          'Tratamiento: Albendazol, mebendazol, pamoato de pirantel (dosis única, repetir 2 semanas)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis',
        items: [
          'Migración nocturna: Liberación sustancia gelatinosa (pruritógena)',
          'Rascado: Excoriación, infección bacteriana secundaria',
          'Autoinfección: Mano-boca (perpetuación)',
          'Retroinfección: Huevos eclosionan en ano, larvas migran a ciego',
          'Inflamación perianal: Dermatitis, eczema',
          'Alteraciones del sueño: Fatiga, déficit atención (niños)',
          'Granulomas ectópicos: Huevos en peritoneo, trompas',
          'Alta transmisibilidad: Huevos aerotransportados (ropa de cama)'
        ]
      }
    ]
  },
  {
    id: 'taenia-solium',
    nombre: 'Taenia solium',
    subtitulo: 'Cestodo · Intestinal y tisular · Solitaria del cerdo',
    icono: '🐷',
    categorias: ['helmintos', 'cestodos', 'transmision-carnica'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Adulto: 2-7 metros de longitud',
          'Escólex: 1 mm, 4 ventosas + róstelo con doble corona de ganchos (25-30)',
          'Proglótides: 800-1,000 segmentos',
          'Proglótide grávida: 7-12 ramas uterinas (vs. 15-20 en T. saginata)',
          'Huevo: 30-40 μm, embrión hexacanto (oncósfera)',
          'Cisticerco: Larva vesicular 5-10 mm, escólex invaginado'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Hospedador definitivo: Humano (teniasis)',
          'Hospedador intermediario: Cerdo (cisticercosis)',
          'Transmisión teniasis: Carne de cerdo con cisticercos',
          'Cisticerco ingerido: Evagina en intestino delgado',
          'Fijación: Escólex se adhiere a yeyuno',
          'Crecimiento: 5-12 cm/mes',
          'Proglótides grávidas: Eliminadas en heces',
          'Cerdo ingiere huevos: En heces humanas',
          'Cisticercosis humana: Ingesta de huevos (autoinfección, heteroinfección)',
          'Oncósfera penetra: Intestino → sangre → tejidos (músculo, SNC, ojo)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Parasitaria',
        datos: [
          { label: 'Filo', value: 'Platyhelminthes (Cestoda)' },
          { label: 'Hospedador definitivo', value: 'Humano' },
          { label: 'Hospedador intermediario', value: 'Cerdo (humano accidental)' },
          { label: 'Sitio adulto', value: 'Intestino delgado (yeyuno)' },
          { label: 'Cisticercos', value: 'Músculo, SNC, subcutáneo, ojo' },
          { label: 'Periodo prepatente', value: '2-3 meses' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Teniasis intestinal: Asintomática o molestias abdominales leves',
          'Neurocisticercosis: Convulsiones (principal causa en áreas endémicas)',
          'Lesiones parenquimatosas: Quistes cerebrales (convulsiones, cefalea)',
          'Cisticercosis subaracnoidea: Hipertensión intracraneal, meningitis',
          'Cisticercosis intraventricular: Hidrocefalia obstructiva',
          'Cisticercosis ocular: Pérdida visual, desprendimiento retina',
          'Cisticercosis muscular: Nódulos subcutáneos, pseudohipertrofia',
          'Endemia: Latinoamérica, África subsahariana, Asia',
          'Tratamiento teniasis: Praziquantel, niclosamida',
          'Tratamiento neurocisticercosis: Albendazol + corticoides, cirugía'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis',
        items: [
          'Teniasis: Competencia nutricional (asintomática generalmente)',
          'Neurocisticercosis: Efecto masa, inflamación, edema',
          'Degeneración cisticerco: Respuesta inflamatoria intensa',
          'Calcificación: Cisticercos muertos (secuela)',
          'Aracnoiditis: Cisticercos subaracnoideos (fibrosis)',
          'Vasculitis: Endarteritis, infartos cerebrales',
          'Hidrocefalia: Obstrucción por cisticerco o inflamación',
          'Epilepsia: Principal secuela neurológica',
          'Reacción antígeno-anticuerpo: Inflamación perilesional'
        ]
      }
    ]
  },
  {
    id: 'echinococcus-granulosus',
    nombre: 'Echinococcus granulosus',
    subtitulo: 'Cestodo · Tisular · Agente de hidatidosis',
    icono: '🐕',
    categorias: ['helmintos', 'cestodos', 'transmision-zoonotica'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Adulto: 2-7 mm (uno de los cestodos más pequeños)',
          'Escólex: 4 ventosas + róstelo con 25-50 ganchos',
          'Proglótides: Solo 3-4 (inmadura, madura, grávida)',
          'Quiste hidatídico: 1-15 cm (puede llegar a 20 cm)',
          'Capa germinativa: Produce vesículas hijas, protoescólices',
          'Arenilla hidatídica: Protoescólices libres en líquido',
          'Membrana laminar: Acelular, estratificada'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Hospedador definitivo: Perro, cánidos (adulto intestinal)',
          'Hospedadores intermediarios: Oveja, vaca, cabra, humano (quiste)',
          'Transmisión: Fecal-oral (huevos en heces de perro)',
          'Ingesta de huevos: Humano maneja perro infectado',
          'Oncósfera: Penetra intestino → circulación portal',
          'Localización: Hígado (65%), pulmón (25%), otros (10%)',
          'Quiste hidatídico: Crecimiento lento (1 cm/año)',
          'Perro se infecta: Come vísceras con quistes (ganado)',
          'Maduración: Protoescólices → adultos en intestino canino',
          'Longevidad quiste: Décadas en humano'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Parasitaria',
        datos: [
          { label: 'Filo', value: 'Platyhelminthes (Cestoda)' },
          { label: 'Hospedador definitivo', value: 'Perro, cánidos' },
          { label: 'Hospedador intermediario', value: 'Oveja, humano (accidental)' },
          { label: 'Sitio quiste', value: 'Hígado (65%), pulmón (25%)' },
          { label: 'Genotipos', value: 'G1-G10 (G1 ovino, G7 porcino)' },
          { label: 'Crecimiento quiste', value: '~1 cm/año' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Quiste hepático: Dolor hipocondrio derecho, hepatomegalia',
          'Quiste pulmonar: Tos, hemoptisis, disnea',
          'Ruptura quiste: Shock anafiláctico, diseminación secundaria',
          'Vómica hidatídica: Expectoración de membrana (pulmón)',
          'Compresión: Ictericia (vía biliar), hipertensión portal',
          'Quiste cerebral: Hipertensión intracraneal, convulsiones',
          'Quiste óseo: Fractura patológica',
          'Endemia: Región mediterránea, Sudamérica, Medio Oriente, Australia',
          'Diagnóstico: Serología (IgG anti-Echinococcus), imagen (TC, ecografía)',
          'Tratamiento: Cirugía (PAIR: punción-aspiración-inyección-reaspiración), albendazol'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis',
        items: [
          'Efecto masa: Compresión de estructuras adyacentes',
          'Crecimiento expansivo: Desplazamiento, atrofia órganos',
          'Ruptura espontánea: Reacción anafiláctica (IgE)',
          'Siembra secundaria: Diseminación de protoescólices',
          'Sobreinfección bacteriana: Absceso piógeno',
          'Comunicación biliar: Colangitis, ictericia obstructiva',
          'Calcificación: Quiste muerto (imagen)',
          'Inmunomodulación: Evasión de respuesta Th1',
          'Tolerancia inmune: Quiste viable puede persistir décadas'
        ]
      }
    ]
  },
  {
    id: 'schistosoma-mansoni',
    nombre: 'Schistosoma mansoni',
    subtitulo: 'Trematodo · Sanguíneo · Agente de esquistosomiasis intestinal',
    icono: '🐌',
    categorias: ['helmintos', 'trematodos', 'transmision-vectorial'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Adulto macho: 10 mm, robusto, canal ginecóforo',
          'Adulto hembra: 15 mm, delgada, reside en canal del macho',
          'Dioicos: Sexos separados (única entre trematodos)',
          'Huevo: 115-175 x 45-70 μm, espina lateral prominente',
          'Miracidio: Larva ciliada dentro del huevo',
          'Cercaria: Bifurcada, emerge de caracol'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Eliminación huevos: Heces humanas (S. mansoni, S. japonicum)',
          'Eclosión: Agua dulce → miracidio',
          'Hospedador intermediario: Caracol Biomphalaria (S. mansoni)',
          'Desarrollo en caracol: Esporocistos → cercarias (4-6 semanas)',
          'Liberación: Miles de cercarias/día por caracol',
          'Penetración cutánea: Cercaria atraviesa piel (nadadores, agricultores)',
          'Migración: Sangre → pulmón → hígado',
          'Maduración: Vena porta, pareja se forma',
          'Migración final: Venas mesentéricas inferiores (S. mansoni)',
          'Oviposición: 300 huevos/día, vida 5-10 años'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Parasitaria',
        datos: [
          { label: 'Filo', value: 'Platyhelminthes (Trematoda)' },
          { label: 'Especies principales', value: 'S. mansoni, S. haematobium, S. japonicum' },
          { label: 'Hospedador definitivo', value: 'Humano, mamíferos' },
          { label: 'Hospedador intermediario', value: 'Caracoles (género-específico)' },
          { label: 'Sitio adultos', value: 'Venas mesentéricas, vesicales' },
          { label: 'Prevalencia', value: '200+ millones infectados' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Dermatitis del nadador: Prurito (penetración de cercarias)',
          'Fiebre de Katayama: Síndrome agudo (2-8 semanas), fiebre, urticaria, eosinofilia',
          'Esquistosomiasis intestinal: Dolor abdominal, diarrea disentérica',
          'Hepatoesplenomegalia: Hipertensión portal, varices esofágicas',
          'Fibrosis hepática periportal: Pipe-stem fibrosis (Symmer)',
          'Esquistosomiasis urogenital (S. haematobium): Hematuria terminal',
          'Cáncer de vejiga: S. haematobium (carcinoma escamoso)',
          'Endemia: África subsahariana, Brasil, Egipto, China',
          'Tratamiento: Praziquantel (dosis única 40-60 mg/kg)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis',
        items: [
          'Penetración: Metaloproteasas, elastasas (cercaria)',
          'Migración pulmonar: Neumonitis eosinofílica',
          'Granulomas: Reacción a huevos (Th2, eosinófilos)',
          'Fibrosis: Granulomas → fibrosis periportal (S. mansoni)',
          'Hipertensión portal: Fibrosis, no cirrosis',
          'Embolización: Huevos en hígado, pulmón (cor pulmonale)',
          'Glomerulopatía: Inmunocomplejos (S. mansoni)',
          'Evasión inmune: Mimetismo molecular, adquisición de antígenos del hospedador',
          'Cáncer vesical: Inflamación crónica, mutaciones p53 (S. haematobium)'
        ]
      }
    ]
  },
  {
    id: 'fasciola-hepatica',
    nombre: 'Fasciola hepatica',
    subtitulo: 'Trematodo · Hepático · Duela del hígado',
    icono: '🍃',
    categorias: ['helmintos', 'trematodos', 'transmision-carnica'],
    secciones: [
      {
        tipo: 'lista',
        titulo: '🔬 Características Morfológicas',
        items: [
          'Adulto: 20-30 mm de longitud, forma de hoja',
          'Cono cefálico: Prominente, anterior a ventosa oral',
          'Hermafrodita: Ovario y testículos ramificados',
          'Huevo: 130-150 x 60-90 μm, operculado, amarillo-marrón',
          'Metacercaria: Enquistada en vegetación acuática',
          'Color: Gris-marrón'
        ]
      },
      {
        tipo: 'lista',
        titulo: '⚙️ Ciclo de Vida',
        items: [
          'Eliminación: Huevos no embrionados en heces',
          'Desarrollo: Agua dulce, 9-15 días → miracidio',
          'Hospedador intermediario: Caracol Lymnaea',
          'Multiplicación: Esporocisto → redia → cercaria',
          'Enquistamiento: Cercaria en vegetación acuática (berro)',
          'Transmisión: Ingestión de metacercarias en plantas',
          'Desenquistamiento: Duodeno',
          'Migración: Atraviesa pared intestinal → cavidad peritoneal',
          'Penetración hepática: Cápsula de Glisson → parénquima',
          'Maduración: Conductos biliares (3-4 meses)',
          'Oviposición: 20,000 huevos/día, longevidad 9-13 años'
        ]
      },
      {
        tipo: 'tabla',
        titulo: '🧬 Información Parasitaria',
        datos: [
          { label: 'Filo', value: 'Platyhelminthes (Trematoda)' },
          { label: 'Hospedador definitivo', value: 'Oveja, vaca, humano' },
          { label: 'Hospedador intermediario', value: 'Caracol Lymnaea' },
          { label: 'Sitio adultos', value: 'Conductos biliares' },
          { label: 'Periodo prepatente', value: '3-4 meses' },
          { label: 'Distribución', value: 'Mundial (áreas ganaderas)' }
        ]
      },
      {
        tipo: 'clinica',
        titulo: '🏥 Importancia Clínica',
        items: [
          'Fascioliasis aguda: Fiebre, dolor abdominal, hepatomegalia (migración)',
          'Fascioliasis crónica: Colangitis, colecistitis, colelitiasis',
          'Síndrome de Löffler: Eosinofilia pulmonar (migración)',
          'Urticaria: Hipersensibilidad (liberación de antígenos)',
          'Obstrucción biliar: Ictericia, colangitis',
          'Fibrosis biliar: Inflamación crónica',
          'Halzoun: Faringitis (ingestión de hígado crudo)',
          'Endemia: Andina (Perú, Bolivia), Europa, África',
          'Tratamiento: Triclabendazol (dosis única 10 mg/kg)'
        ]
      },
      {
        tipo: 'lista',
        titulo: '🎯 Patogénesis',
        items: [
          'Fase migratoria: Destrucción tisular hepática (juveniles)',
          'Enzimas proteolíticas: Catepsinas L y B (penetración)',
          'Necrosis hemorrágica: Túneles en parénquima',
          'Eosinofilia masiva: Respuesta Th2 (hasta 80%)',
          'Fase biliar: Inflamación, hiperplasia epitelial',
          'Obstrucción mecánica: Masa de gusanos en conductos',
          'Fibrosis: Colangitis crónica esclerosante',
          'Colangiocarcinoma: Complicación rara (inflamación crónica)',
          'Evasión inmune: Glicocalix grueso, catepsinas inactivan anticuerpos'
        ]
      }
    ]
  }
];