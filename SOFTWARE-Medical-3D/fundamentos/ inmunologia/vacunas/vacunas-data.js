// ═══════════════════════════════════════════════════════════
// VACUNAS - Base de datos de conceptos
// ═══════════════════════════════════════════════════════════

const VACUNAS_DATA = [
  {
    id: 'inmunizacion-activa',
    nombre: 'Inmunización Activa',
    icono: '🛡️',
    subtitulo: 'Generación de memoria inmunológica protectora',
    categorias: ['activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Definición y principios',
        items: [
          'Administración de antígeno para inducir respuesta inmune adaptativa',
          'Genera memoria inmunológica de larga duración',
          'Protección específica contra patógeno objetivo',
          'Requiere tiempo para desarrollar inmunidad (días-semanas)',
          'Duración: años a décadas, a veces de por vida',
          'Base de los programas de vacunación preventiva'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Mecanismo de acción',
        items: [
          'Presentación antigénica por células dendríticas',
          'Activación de linfocitos T CD4+ helper',
          'Activación de linfocitos B específicos',
          'Diferenciación en células plasmáticas (producen anticuerpos)',
          'Generación de células T y B de memoria',
          'Respuesta secundaria: rápida y potente en reexposición'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Respuesta primaria vs secundaria',
        datos: [
          { label: 'Respuesta primaria', value: '1-2 semanas, IgM predomina, títulos bajos' },
          { label: 'Respuesta secundaria', value: '3-5 días, IgG predomina, títulos altos' },
          { label: 'Afinidad anticuerpos', value: 'Primaria: baja / Secundaria: alta (maduración afinidad)' },
          { label: 'Duración protección', value: 'Primaria: meses / Secundaria: años-décadas' },
          { label: 'Células memoria', value: 'Generadas en primaria, expandidas en secundaria' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Tipos de inmunidad activa',
        items: [
          'Natural: exposición a patógeno en infección',
          'Artificial: vacunación con antígeno',
          'Ambas generan memoria inmunológica',
          'Vacunación: sin riesgo de enfermedad severa',
          'Infección natural: puede causar complicaciones/muerte',
          'Algunas vacunas superan inmunidad natural (tétanos, HPV)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Esquemas de vacunación',
        items: [
          'Primovacunación: serie inicial de dosis',
          'Refuerzos (boosters): mantienen/amplifican inmunidad',
          'Intervalo entre dosis: optimiza respuesta inmune',
          'Dosis múltiples: mejoran seroconversión y durabilidad',
          'Esquemas acelerados: situaciones de emergencia',
          'Co-administración: múltiples vacunas simultáneamente posible'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Correlatos de protección',
        items: [
          'Título de anticuerpos: nivel que confiere protección',
          'Anticuerpos neutralizantes: bloquean entrada viral',
          'Inmunidad celular (CTL): crítica en algunas vacunas',
          'IgA secretora: protección en mucosas',
          'Ejemplos: sarampión >200 mUI/ml, hepatitis B >10 mUI/ml',
          'No todas las vacunas tienen correlato definido'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Ventajas y limitaciones',
        items: [
          'Ventajas: protección duradera, inmunidad de rebaño, costo-efectiva',
          'Limitaciones: tiempo para desarrollar inmunidad, refuerzos necesarios',
          'No protege durante periodo de ventana',
          'Inmunocomprometidos: respuesta subóptima',
          'Variación antigénica: escape inmune (influenza)',
          'Waning immunity: decaimiento de anticuerpos con el tiempo'
        ]
      }
    ]
  },

  {
    id: 'inmunizacion-pasiva',
    nombre: 'Inmunización Pasiva',
    icono: '🩹',
    subtitulo: 'Transferencia de anticuerpos preformados',
    categorias: ['pasiva'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Definición y principios',
        items: [
          'Administración de anticuerpos preformados',
          'Protección inmediata (horas)',
          'No genera memoria inmunológica',
          'Duración corta: semanas a meses',
          'Uso: prevención post-exposición, tratamiento, inmunodeficiencias',
          'Puede ser natural (materno-fetal) o artificial'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Tipos de inmunoglobulinas',
        datos: [
          { label: 'IVIG (intravenosa)', value: 'IgG purificada de miles de donantes, uso hospitalario' },
          { label: 'IMIG (intramuscular)', value: 'IgG para IM, profilaxis hepatitis A, sarampión' },
          { label: 'Hiperinmunes específicas', value: 'Títulos altos vs patógeno: rabia, tétanos, hepatitis B, varicela' },
          { label: 'Anticuerpos monoclonales', value: 'Sintéticos, alta especificidad: palivizumab (VSR)' },
          { label: 'Antitoxinas', value: 'Equinas, neutralizan toxinas: difteria, botulismo' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Inmunidad pasiva natural',
        items: [
          'Transferencia transplacentaria de IgG materno (2do-3er trimestre)',
          'Máxima transferencia semanas antes del parto',
          'Protege neonato primeros 6-12 meses de vida',
          'IgA secretora en leche materna',
          'Protección contra sarampión, rubéola, tétanos, difteria',
          'Puede interferir con vacunación infantil temprana'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Indicaciones clínicas',
        items: [
          'Profilaxis post-exposición: rabia, hepatitis B, varicela, tétanos',
          'Inmunodeficiencias: agammaglobulinemia, IDCV',
          'Enfermedades autoinmunes: PTI, Kawasaki, Guillain-Barré',
          'Prevención enfermedad hemolítica: Rho(D) inmunoglobulina',
          'VSR en prematuros: palivizumab mensual durante temporada',
          'Neutralización de toxinas: mordedura de serpiente, botulismo'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Inmunoglobulinas hiperinmunes específicas',
        datos: [
          { label: 'HBIG', value: 'Hepatitis B: post-exposición, recién nacidos de madres HBsAg+' },
          { label: 'VZIG', value: 'Varicela-zóster: inmunocomprometidos, embarazadas' },
          { label: 'RIG', value: 'Rabia: junto con vacuna post-exposición' },
          { label: 'TIG', value: 'Tétanos: heridas contaminadas, inmunización incompleta' },
          { label: 'CMV-IG', value: 'Citomegalovirus: trasplante renal, prevención' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Farmacocinética',
        items: [
          'Vida media IgG: 21-28 días',
          'Pico sérico: 48-72h post-IM, inmediato post-IV',
          'Distribución: principalmente intravascular (IgG)',
          'Catabolismo: sistema reticuloendotelial',
          'Protección: 3-4 meses típicamente',
          'Repetir dosis si exposición continua'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Ventajas y limitaciones',
        items: [
          'Ventajas: protección inmediata, útil en inmunocomprometidos',
          'Limitaciones: duración corta, costosa, riesgo de reacciones',
          'Enfermedad del suero: inmunocomplejos (productos equinos)',
          'Anafilaxia: rara, más con productos equinos',
          'Interferencia con vacunas vivas: esperar 3-11 meses',
          'No reemplaza vacunación activa (excepto contraindicación)'
        ]
      }
    ]
  },

  {
    id: 'vacunas-vivas-atenuadas',
    nombre: 'Vacunas Vivas Atenuadas',
    icono: '🦠',
    subtitulo: 'Patógenos debilitados que replican sin causar enfermedad',
    categorias: ['vivas', 'activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Microorganismo vivo con virulencia reducida',
          'Capaz de replicación limitada en huésped',
          'Mimetiza infección natural sin enfermedad',
          'Induce respuesta inmune humoral y celular robusta',
          'Generalmente 1-2 dosis suficientes',
          'Inmunidad duradera, a menudo de por vida'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Métodos de atenuación',
        items: [
          'Pases seriados en cultivo celular (sarampión, rubéola)',
          'Cultivo a temperatura subóptima (influenza intranasal)',
          'Selección de mutantes avirulentos',
          'Pases en huésped no natural (BCG en bilis de buey)',
          'Ingeniería genética: deleción de genes de virulencia',
          'Reasociación genética (rotavirus)'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Vacunas vivas atenuadas principales',
        datos: [
          { label: 'MMR (Triple viral)', value: 'Sarampión, parotiditis, rubéola; 2 dosis, eficacia >95%' },
          { label: 'Varicela (Varivax)', value: '2 dosis, eficacia 90% enfermedad, >95% severa' },
          { label: 'Rotavirus (oral)', value: 'RotaTeq (5 cepas), Rotarix (1 cepa); 2-3 dosis' },
          { label: 'BCG', value: 'Tuberculosis, eficacia variable (0-80%), usada en países endémicos' },
          { label: 'Fiebre amarilla', value: '1 dosis, protección de por vida, obligatoria para viajes' },
          { label: 'Polio oral (OPV)', value: 'Sabin, ya no usada en países desarrollados' },
          { label: 'Influenza intranasal', value: 'LAIV, 2-49 años, no en inmunocomprometidos' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Ventajas',
        items: [
          'Respuesta inmune amplia: humoral + celular',
          'Inmunidad mucosa: IgA secretora (oral, intranasal)',
          'Pocas dosis necesarias',
          'Inmunidad duradera',
          'Menos o ningún adjuvante requerido',
          'Inmunidad de rebaño (OPV): transmisión de virus vacunal'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Contraindicaciones y precauciones',
        items: [
          'Inmunodeficiencias severas (IDCV, SCID, VIH CD4 <200)',
          'Embarazo: riesgo teórico para feto',
          'Terapia inmunosupresora: corticosteroides altas dosis, biológicos',
          'Enfermedad febril moderada-severa: posponer',
          'Anafilaxia previa a componente vacunal',
          'Precaución: contacto cercano con inmunocomprometido severo'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Riesgos y eventos adversos',
        items: [
          'Reversión a virulencia: polio asociado a vacuna (VAPP) 1:2.4M dosis',
          'Enfermedad leve: fiebre, exantema (varicela), parotiditis leve',
          'Transmisión a contactos: varicela vacunal (raro), rotavirus (heces)',
          'Invaginación intestinal: rotavirus (1-5 casos/100,000)',
          'Recombinación: virus vacunales con virus salvajes (OPV)',
          'Beneficios superan ampliamente riesgos en población general'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Consideraciones especiales',
        items: [
          'Almacenamiento: cadena de frío estricta (-20°C a +8°C según vacuna)',
          'Termoestabilidad limitada: pérdida de potencia con calor',
          'No administrar con inmunoglobulinas (interferencia)',
          'Esperar 3-11 meses post-IVIG para MMR/varicela',
          'Screening: embarazo, inmunodeficiencias antes de aplicar',
          'OPV reemplazada por IPV en países desarrollados (sin VAPP)'
        ]
      }
    ]
  },

  {
    id: 'vacunas-inactivadas',
    nombre: 'Vacunas Inactivadas (Muertas)',
    icono: '⚗️',
    subtitulo: 'Patógenos completos inactivados química o físicamente',
    categorias: ['inactivadas', 'activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Características generales',
        items: [
          'Microorganismo completo pero muerto/inactivado',
          'No puede replicarse ni causar enfermedad',
          'Requiere múltiples dosis y refuerzos',
          'Respuesta inmune principalmente humoral (anticuerpos)',
          'Requiere adjuvantes para potenciar inmunogenicidad',
          'Seguras en inmunocomprometidos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Métodos de inactivación',
        datos: [
          { label: 'Química', value: 'Formaldehído, β-propiolactona, fenol, etanol' },
          { label: 'Física', value: 'Calor, radiación UV, radiación gamma' },
          { label: 'Verificación', value: 'Cultivos para confirmar ausencia de viables' },
          { label: 'Preservación antígenos', value: 'Mantener epitopos inmunogénicos intactos' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vacunas inactivadas principales',
        items: [
          'Polio inactivada (IPV - Salk): 4 dosis, eficacia >99%',
          'Hepatitis A: 2 dosis separadas 6-12 meses, eficacia >95%',
          'Rabia: pre-exposición 3 dosis, post-exposición 4-5 dosis',
          'Influenza inyectable: anual, eficacia 40-60% (variable)',
          'Cólera (oral): 2-3 dosis, eficacia 60-85%',
          'Encefalitis japonesa: 2 dosis, refuerzo 1-2 años',
          'Tos ferina (componente de DPT/DTaP): acelular es subunidad'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Ventajas',
        items: [
          'Seguridad: no puede causar enfermedad',
          'Uso seguro en inmunocomprometidos',
          'Uso seguro en embarazadas (mayoría)',
          'Estabilidad: menos sensibles a temperatura que vivas',
          'No interfieren con inmunoglobulinas',
          'No transmisión a contactos'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Desventajas',
        items: [
          'Inmunogenicidad menor que vacunas vivas',
          'Múltiples dosis necesarias',
          'Refuerzos periódicos requeridos',
          'Respuesta celular limitada',
          'Sin inmunidad mucosa (mayoría)',
          'Requieren adjuvantes',
          'Costo de producción mayor'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Adjuvantes comunes',
        items: [
          'Sales de aluminio (alum): hidróxido, fosfato de aluminio',
          'Mecanismo: depósito, activación inflamasoma, atracción APCs',
          'MF59: emulsión aceite-agua, influenza',
          'AS04: MPL + aluminio, hepatitis B (Fendrix), HPV (Cervarix)',
          'CpG ODN: agonista TLR9, hepatitis B (Heplisav-B)',
          'Adjuvantes nuevos: mejorar respuesta Th1, celular'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Eventos adversos',
        items: [
          'Reacciones locales: dolor, eritema, induración (comunes, leves)',
          'Fiebre leve: 10-30% según vacuna',
          'Reacciones sistémicas: malestar, cefalea (raras)',
          'Hipersensibilidad al aluminio: nódulos subcutáneos persistentes (raros)',
          'Síndrome de Guillain-Barré: asociación mínima (influenza 1976)',
          'Anafilaxia: muy rara (<1:1,000,000)'
        ]
      }
    ]
  },

  {
    id: 'vacunas-subunidad',
    nombre: 'Vacunas de Subunidad y Recombinantes',
    icono: '🧬',
    subtitulo: 'Componentes antigénicos purificados o producidos por ingeniería',
    categorias: ['subunidad', 'activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Vacunas de subunidad (proteicas)',
        items: [
          'Antígenos purificados del patógeno',
          'Solo proteínas inmunogénicas esenciales',
          'Altamente seguras, mínimos efectos adversos',
          'Requieren adjuvantes y múltiples dosis',
          'Producción: cultivo de patógeno → purificación',
          'Ejemplos: tos ferina acelular, influenza subunidad'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Vacunas de subunidad principales',
        datos: [
          { label: 'DTaP (tos ferina acelular)', value: 'Toxoide pertussis + FHA, pertactina, fimbrias; 5 dosis' },
          { label: 'Hepatitis B (recombinante)', value: 'HBsAg producido en levaduras; 3 dosis; eficacia >95%' },
          { label: 'HPV', value: 'VLPs L1 de 2, 4 o 9 serotipos; 2-3 dosis; previene cáncer cervical' },
          { label: 'Herpes zóster (Shingrix)', value: 'gE recombinante + AS01B; 2 dosis; eficacia >90%' },
          { label: 'Meningococo B', value: 'Proteínas superficie (fHbp, NHBA, NadA); 2 dosis' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vacunas de toxoides',
        items: [
          'Toxinas bacterianas inactivadas químicamente',
          'Mantienen inmunogenicidad, pierden toxicidad',
          'Inactivación: formaldehído',
          'Difteria: toxoide en DTaP/Td/Tdap, 5 dosis primaria + refuerzos',
          'Tétanos: toxoide en DTaP/Td/Tdap, refuerzos cada 10 años',
          'Anticuerpos neutralizan toxina circulante'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vacunas de polisacáridos',
        items: [
          'Polisacáridos capsulares de bacterias',
          'Antígenos T-independientes: no generan memoria en <2 años',
          'Neumococo 23-valente (PPSV23): adultos, 1-2 dosis',
          'Meningococo polisacárido (MPSV4): ya no usada',
          'Respuesta subóptima en niños pequeños e inmunocomprometidos',
          'Reemplazadas por conjugadas en pediatría'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vacunas conjugadas',
        items: [
          'Polisacárido unido covalentemente a proteína carrier',
          'Convierte antígeno T-independiente en T-dependiente',
          'Genera memoria inmunológica, efectiva en niños >2 meses',
          'Proteínas carrier: toxoide diftérico (CRM197), tétanico',
          'Haemophilus influenzae b (Hib): 3-4 dosis, casi erradicó enfermedad invasiva',
          'Neumococo conjugado (PCV): PCV13 (13 serotipos), PCV15, PCV20',
          'Meningococo conjugado (MenACWY): 2 dosis en adolescentes'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vacunas de partículas similares a virus (VLPs)',
        items: [
          'Autoensamblaje de proteínas virales sin material genético',
          'Morfología idéntica a virus nativo',
          'No pueden replicarse, completamente seguras',
          'Altamente inmunogénicas',
          'HPV (Gardasil 9, Cervarix): VLPs de proteína L1',
          'Hepatitis B: HBsAg forma VLPs espontáneamente',
          'Hepatitis E: VLPs, aprobada en China'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Ventajas y consideraciones',
        items: [
          'Ventajas: seguridad extrema, sin riesgo de reversión, específicas',
          'Producción: tecnología recombinante escalable',
          'Estabilidad: buena conservación',
          'Desventajas: costosas, requieren adjuvantes, múltiples dosis',
          'Shingrix: eficacia superior a Zostavax (viva atenuada)',
          'HPV: prevención primaria de cáncer (cervical, orofaríngeo, anal)',
          'Conjugadas: revolucionaron prevención de enfermedad invasiva bacteriana'
        ]
      }
    ]
  },

  {
    id: 'vacunas-mrna',
    nombre: 'Vacunas de mRNA',
    icono: '🧬',
    subtitulo: 'Plataforma genética de nueva generación',
    categorias: ['nuevas', 'activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Tecnología y mecanismo',
        items: [
          'mRNA codifica antígeno del patógeno',
          'Encapsulado en nanopartículas lipídicas (LNP)',
          'Administración IM, captación por células dendríticas y miocitos',
          'Traducción intracelular: células producen antígeno',
          'Presentación en MHC-I y MHC-II',
          'Respuesta humoral (anticuerpos) y celular (CTL)',
          'mRNA degradado en días, no integra en genoma'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Vacunas de mRNA aprobadas',
        datos: [
          { label: 'BNT162b2 (Pfizer-BioNTech)', value: 'COVID-19, spike proteína; 2 dosis; eficacia 95% enfermedad' },
          { label: 'mRNA-1273 (Moderna)', value: 'COVID-19, spike proteína; 2 dosis; eficacia 94%' },
          { label: 'Refuerzos bivalentes', value: 'Original + Omicron; mejoran protección vs variantes' },
          { label: 'Edad', value: 'Aprobadas desde 6 meses (formulaciones pediátricas)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Ventajas',
        items: [
          'Desarrollo rápido: diseño en días, producción en semanas',
          'No requiere cultivo de patógeno',
          'Seguridad: no puede causar infección',
          'Respuesta inmune robusta: humoral + celular',
          'Modificación rápida para variantes',
          'Producción escalable y estandarizada',
          'Plataforma versátil: múltiples patógenos'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Desafíos tecnológicos',
        items: [
          'Almacenamiento: ultra-frío (-70°C BNT162b2, -20°C mRNA-1273)',
          'Estabilidad limitada a temperatura ambiente',
          'Costo de producción: LNPs costosas',
          'Reactogenicidad: fiebre, dolor local frecuentes',
          'Miocarditis/pericarditis: rara, más en jóvenes varones post-2da dosis',
          'Aceptación pública: tecnología nueva, desinformación'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Composición de nanopartículas lipídicas',
        items: [
          'Lípidos ionizables catiónicos: ALC-0315, SM-102',
          'Fosfolípidos: DSPC',
          'Colesterol: estabilidad de membrana',
          'PEG-lípidos: polietilenglicol, previene agregación',
          'Carga positiva: compacta mRNA (carga negativa)',
          'Fusión con membrana celular: liberación de mRNA en citoplasma'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Modificaciones del mRNA',
        items: [
          'Pseudouridina (Ψ): reemplaza uridina, reduce inmunogenicidad del mRNA',
          '5\' cap: 7-metilguanosina, aumenta traducción',
          'Regiones no traducidas (UTRs): estabilizan mRNA',
          'Codón optimizado: mejora eficiencia de traducción',
          'Poly(A) tail: estabilidad del mRNA',
          'Modificaciones reducen activación innata (TLR3, TLR7/8)'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Aplicaciones futuras',
        items: [
          'Influenza: ensayos fase III, potencial vacuna universal',
          'VRS (virus sincitial respiratorio): ensayos avanzados',
          'CMV (citomegalovirus): desarrollo en curso',
          'VIH: vacunas terapéuticas y preventivas',
          'Cáncer: vacunas terapéuticas personalizadas (neoantígenos)',
          'Enfermedades raras: déficits enzimáticos (terapia reemplazo)',
          'Combinaciones multivalentes: múltiples patógenos en una vacuna'
        ]
      }
    ]
  },

  {
    id: 'vacunas-vectorizadas',
    nombre: 'Vacunas de Vectores Virales',
    icono: '🔬',
    subtitulo: 'Virus recombinantes que expresan antígenos heterólogos',
    categorias: ['nuevas', 'activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Tecnología y mecanismo',
        items: [
          'Vector viral (no replicante o replicante) modificado genéticamente',
          'Expresa gen de antígeno del patógeno objetivo',
          'Vector infecta células, expresa antígeno',
          'Presentación en MHC-I y MHC-II',
          'Respuesta humoral y celular robusta',
          'Vector puede ser homólogo o heterólogo al patógeno objetivo'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Vectores virales comunes',
        datos: [
          { label: 'Adenovirus', value: 'Ad5, Ad26; no replicantes; alta inmunogenicidad' },
          { label: 'Virus vaccinia', value: 'MVA (Ankara), NYVAC; replicantes atenuados' },
          { label: 'Virus vesicular estomatitis', value: 'VSV; replicante; ébola (Ervebo)' },
          { label: 'Adenovirus simios', value: 'ChAdOx1; sin inmunidad preexistente en humanos' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Vacunas de vectores aprobadas/en uso',
        items: [
          'COVID-19: Ad26.COV2.S (J&J/Janssen), ChAdOx1 (AstraZeneca)',
          'Ébola: rVSV-ZEBOV (Ervebo), eficacia >97%',
          'Dengue: TAK-003 (Takeda), virus dengue atenuado como vector',
          'Viruela del mono: MVA-BN (Jynneos), prevención viruela/mpox',
          'VIH: vacunas en ensayos (Ad26, MVA)',
          'Tuberculosis: MVA85A (refuerzo de BCG), ensayos clínicos'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Ventajas',
        items: [
          'Respuesta celular potente: CTL CD8+',
          'Una sola dosis puede ser suficiente',
          'Mimetiza infección natural',
          'Producción escalable en cultivo celular',
          'Expresión prolongada de antígeno',
          'Activación innata: vector actúa como adjuvante natural'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Desafíos',
        items: [
          'Inmunidad preexistente al vector (Ad5): reduce eficacia',
          'Respuesta anti-vector: limita uso repetido del mismo vector',
          'Prime-boost heterólogo: diferentes vectores en dosis sucesivas',
          'Vectores replicantes: riesgo en inmunocomprometidos',
          'Integración genómica: preocupación teórica (muy rara)',
          'Producción más compleja que subunidad'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Eventos adversos COVID-19 vectorizadas',
        items: [
          'Trombosis con trombocitopenia (TTS): rara (1:100,000)',
          'Asociada a ChAdOx1 y Ad26.COV2.S',
          'Mecanismo: anticuerpos anti-PF4',
          'Mayor riesgo: mujeres <50 años',
          'Síndrome similar a HIT (trombocitopenia inducida por heparina)',
          'Beneficio-riesgo: favorable en mayoría de poblaciones'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Estrategias de optimización',
        items: [
          'Prime-boost heterólogo: Ad26 prime, MVA boost (VIH)',
          'Vectores de diferente serotipo: evitar inmunidad anti-vector',
          'Vectores de especies diferentes: simio, aviar',
          'Deleción de genes inmunoevasores: aumenta inmunogenicidad',
          'Expresión de múltiples antígenos: polivalentes',
          'Combinación con otras plataformas: vector + proteína boost'
        ]
      }
    ]
  },

  {
    id: 'adjuvantes',
    nombre: 'Adjuvantes Vacunales',
    icono: '⚡',
    subtitulo: 'Potenciadores de respuesta inmune',
    categorias: ['activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Definición y función',
        items: [
          'Sustancias que potencian respuesta inmune a antígeno',
          'No inmunogénicos por sí mismos',
          'Aumentan magnitud y duración de respuesta',
          'Permiten reducir dosis de antígeno',
          'Modulan tipo de respuesta: Th1 vs Th2',
          'Especialmente necesarios en vacunas subunidad/inactivadas'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Sales de aluminio (Alum)',
        datos: [
          { label: 'Tipos', value: 'Hidróxido de aluminio, fosfato de aluminio, sulfato potásico' },
          { label: 'Uso', value: 'Adjuvante más usado (90 años), DTaP, hepatitis A/B, HPV, neumococo' },
          { label: 'Mecanismo', value: 'Depósito, activación NLRP3, reclutamiento APCs' },
          { label: 'Respuesta', value: 'Favorece Th2, anticuerpos IgG1' },
          { label: 'Seguridad', value: 'Excelente, reacciones locales leves' },
          { label: 'Limitaciones', value: 'Pobre respuesta celular Th1/CTL' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Adjuvantes de nueva generación',
        items: [
          'MF59: emulsión escualeno aceite-en-agua, influenza (Fluad)',
          'AS01: MPL + QS-21 (saponina), herpes zóster (Shingrix), malaria',
          'AS03: escualeno + α-tocoferol + polisorbato, pandemia influenza',
          'AS04: MPL + aluminio, HPV (Cervarix), hepatitis B (Fendrix)',
          'CpG 1018: oligonucleótido, agonista TLR9, hepatitis B (Heplisav-B)',
          'Matrix-M: saponina nanopartículas, COVID-19 (Novavax)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Mecanismos de acción',
        items: [
          'Efecto depósito: liberación sostenida de antígeno',
          'Reclutamiento de APCs: células dendríticas, macrófagos',
          'Activación innata: PAMPs, agonistas TLR',
          'Inflamasoma NLRP3: IL-1β, IL-18',
          'Activación de células dendríticas: maduración, migración',
          'Mejora presentación antigénica: cross-presentation'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Agonistas de TLRs',
        datos: [
          { label: 'MPL (TLR4)', value: 'Monofosforil lípido A, derivado LPS detoxificado' },
          { label: 'CpG ODN (TLR9)', value: 'Oligonucleótidos CpG no metilados, Th1' },
          { label: 'Imiquimod (TLR7)', value: 'Agonista TLR7, tópico (verrugas), inyectable (investigación)' },
          { label: 'Poli I:C (TLR3)', value: 'RNA doble cadena sintético, investigación' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Modulación de respuesta inmune',
        items: [
          'Th1: IFN-γ, CTL, inmunidad celular (CpG, MPL)',
          'Th2: IL-4, IL-5, anticuerpos, alergia (Alum)',
          'Th17: IL-17, inmunidad mucosa',
          'Balance Th1/Th2: crítico para eficacia y seguridad',
          'Vacunas virales: beneficio de respuesta Th1',
          'Vacunas bacterianas extracelulares: Th2 aceptable'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Consideraciones de seguridad',
        items: [
          'Reacciones locales: dolor, eritema, induración (alum)',
          'Fiebre transitoria: AS01, MF59',
          'Granulomas: aluminio, raros',
          'Preocupaciones teóricas autoinmunidad: no confirmadas',
          'Síndrome ASIA: hipótesis no respaldada por evidencia',
          'Estudios extensos: adjuvantes aprobados son seguros',
          'Beneficio de protección supera riesgos mínimos'
        ]
      }
    ]
  },

  {
    id: 'eficacia-efectividad',
    nombre: 'Eficacia y Efectividad Vacunal',
    icono: '📊',
    subtitulo: 'Medición del impacto de vacunas',
    categorias: ['activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Definiciones clave',
        items: [
          'Eficacia: protección en ensayo clínico controlado (condiciones ideales)',
          'Efectividad: protección en condiciones del mundo real',
          'Inmunogenicidad: capacidad de inducir respuesta inmune',
          'Seroconversión: desarrollo de anticuerpos detectables',
          'Seropositivo: título de anticuerpos por encima del umbral protector',
          'Correlato de protección: nivel de Ab asociado con protección'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Cálculo de eficacia vacunal',
        datos: [
          { label: 'Fórmula', value: 'VE = (1 - RR) × 100%' },
          { label: 'RR', value: 'Riesgo relativo = (casos vacunados / N vacunados) / (casos no vacunados / N no vacunados)' },
          { label: 'VE 95%', value: 'Reducción de 95% en riesgo de enfermedad en vacunados vs no vacunados' },
          { label: 'VE 50%', value: 'Umbral mínimo aprobación FDA (COVID-19, influenza)' },
          { label: 'Intervalos confianza', value: 'IC 95% para estimar precisión' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Tipos de eficacia',
        items: [
          'Eficacia contra infección: prevención de cualquier infección',
          'Eficacia contra enfermedad: prevención de síntomas',
          'Eficacia contra enfermedad severa: prevención hospitalización/muerte',
          'Eficacia contra transmisión: reducción de contagio a otros',
          'Eficacia duración-ajustada: considera waning immunity',
          'Jerarquía: usualmente severa > sintomática > infección'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Eficacia de vacunas comunes',
        datos: [
          { label: 'Sarampión (MMR)', value: '1 dosis: 93% / 2 dosis: 97%' },
          { label: 'Varicela', value: '1 dosis: 90% enfermedad / 2 dosis: 98%' },
          { label: 'HPV', value: '>90% prevención cáncer cervical por serotipos vacunales' },
          { label: 'Rotavirus', value: '85-98% enfermedad severa' },
          { label: 'Influenza', value: '40-60% (variable por temporada, concordancia)' },
          { label: 'Neumococo PCV13', value: '>90% enfermedad invasiva por serotipos vacunales' },
          { label: 'Herpes zóster (Shingrix)', value: '>90% prevención zóster' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Factores que afectan eficacia',
        items: [
          'Concordancia antigénica: variación cepas circulantes (influenza)',
          'Edad del receptor: menor en <1 año y >65 años',
          'Estado inmune: inmunocomprometidos tienen menor respuesta',
          'Comorbilidades: diabetes, obesidad, enfermedad renal',
          'Adherencia al esquema: dosis incompletas reducen protección',
          'Intervalo entre dosis: muy corto o muy largo puede afectar',
          'Tipo de vacuna: vivas generalmente más eficaces que inactivadas'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Waning immunity (decaimiento de inmunidad)',
        items: [
          'Disminución de anticuerpos con el tiempo',
          'Varía por vacuna: tos ferina (waning rápido), sarampión (duradero)',
          'Refuerzos: restauran niveles protectores',
          'Células B de memoria: pueden conferir protección sin Ab detectables',
          'Mediciones: estudios de cohorte longitudinales',
          'Impacto: resurgimiento de enfermedad en población vacunada',
          'Tos ferina: waning significativo 5-10 años post-vacunación'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Fallo vacunal',
        items: [
          'Primario: sin seroconversión tras vacunación completa (5-10% según vacuna)',
          'Secundario: pérdida de inmunidad con el tiempo (waning)',
          'Causas: inmunodeficiencia, interferencia maternal, almacenamiento inadecuado',
          'Impacto poblacional: menor si cobertura alta (inmunidad de rebaño)',
          'Investigación: identificar no respondedores, vacunas de segunda generación'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Efectividad en el mundo real',
        items: [
          'Estudios observacionales: cohortes, casos-controles',
          'Diseño test-negativo: ampliamente usado para influenza, COVID-19',
          'Efectividad usualmente menor que eficacia: condiciones reales, cumplimiento',
          'Vigilancia epidemiológica: monitoreo continuo post-comercialización',
          'Impacto poblacional: reducción de incidencia, hospitalizaciones, muertes',
          'Inmunidad de rebaño: protección indirecta de no vacunados',
          'Erradicación: viruela (única enfermedad); polio (casi lograda)'
        ]
      }
    ]
  },

  {
    id: 'inmunidad-rebaño',
    nombre: 'Inmunidad de Rebaño',
    icono: '👥',
    subtitulo: 'Protección colectiva por alta cobertura vacunal',
    categorias: ['activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Concepto y principios',
        items: [
          'Protección indirecta de individuos no inmunes',
          'Ocurre cuando suficientes personas están inmunes',
          'Interrumpe cadena de transmisión del patógeno',
          'Protege a quienes no pueden vacunarse',
          'Depende de: contagiosidad del patógeno (R0), eficacia vacunal',
          'Crítica para erradicación de enfermedades'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Umbral de inmunidad de rebaño',
        datos: [
          { label: 'Fórmula', value: 'HIT = 1 - (1/R0)' },
          { label: 'R0', value: 'Número reproductivo básico: contagios por caso índice' },
          { label: 'Sarampión (R0 12-18)', value: 'Requiere 92-95% inmunes' },
          { label: 'Tos ferina (R0 12-17)', value: 'Requiere 92-94% inmunes' },
          { label: 'Polio (R0 5-7)', value: 'Requiere 80-86% inmunes' },
          { label: 'Rubéola (R0 6-7)', value: 'Requiere 83-85% inmunes' },
          { label: 'COVID-19 (R0 2.5-8)', value: 'Requiere 60-90% (variable por variante)' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Beneficiarios de inmunidad de rebaño',
        items: [
          'Neonatos e infantes antes de edad de vacunación',
          'Inmunocomprometidos: IDCV, VIH, quimioterapia, trasplantes',
          'Contraindicaciones médicas: alergia severa, embarazo (vivas)',
          'No respondedores vacunales: fallo primario',
          'Personas no vacunadas por acceso limitado',
          'Ancianos con respuesta inmune disminuida'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Factores que afectan inmunidad de rebaño',
        items: [
          'Cobertura vacunal: debe superar umbral específico',
          'Distribución geográfica: bolsones de baja cobertura (clusters)',
          'Waning immunity: decaimiento reduce proporción inmune',
          'Eficacia vacunal: vacunas imperfectas requieren mayor cobertura',
          'Variantes virales: escape inmune reduce efectividad',
          'Comportamiento social: mezcla poblacional, movilidad'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Ejemplos de inmunidad de rebaño exitosa',
        items: [
          'Viruela: erradicada 1980, última caso 1977',
          'Polio: eliminada de Américas (1994), Europa, Pacífico Occidental',
          'Sarampión: eliminado en Américas 2016 (interrumpido 2018 por brotes)',
          'Haemophilus influenzae b: enfermedad invasiva casi eliminada en países con PCV',
          'Rubéola congénita: reducción >99% en países con alta cobertura MMR',
          'Difteria: casos raros en países desarrollados'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Amenazas a inmunidad de rebaño',
        items: [
          'Movimiento anti-vacunas: reducción de cobertura',
          'Bolsones de baja vacunación: comunidades religiosas, geográficas',
          'Brotes en poblaciones subvacunadas: sarampión Europa/USA 2019',
          'Fatiga de pandemia: reducción de aceptación vacunal',
          'Desinformación: redes sociales amplifican mitos',
          'Acceso inequitativo: países de bajos ingresos'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Importancia de salud pública',
        items: [
          'Protección de vulnerables: responsabilidad comunitaria',
          'Costo-efectividad: prevención más barata que tratamiento',
          'Reducción de carga de enfermedad: hospitalización, secuelas',
          'Productividad: menor ausentismo laboral/escolar',
          'Estrategias: mandatos escolares, campañas educativas',
          'Monitoreo: vigilancia epidemiológica de cobertura y enfermedad',
          'Objetivo: alcanzar y mantener coberturas >95% para enfermedades altamente contagiosas'
        ]
      }
    ]
  },

  {
    id: 'seguridad-vacunas',
    nombre: 'Seguridad y Farmacovigilancia Vacunal',
    icono: '🛡️',
    subtitulo: 'Monitoreo de eventos adversos y sistemas de seguridad',
    categorias: ['activa'],
    secciones: [
      {
        tipo: 'lista',
        titulo: 'Eventos adversos post-vacunación (EAPV)',
        items: [
          'Evento médico adverso tras vacunación',
          'No implica relación causal necesariamente',
          'Clasificación: relación causal, temporal, coincidente',
          'Mayoría son leves y transitorios',
          'Eventos serios: raros (<1:100,000-1,000,000)',
          'Beneficio de vacunación supera ampliamente riesgos'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Clasificación de EAPV por causalidad',
        datos: [
          { label: 'Reacción vacunal', value: 'Causada por propiedades intrínsecas de vacuna (fiebre, dolor local)' },
          { label: 'Error programático', value: 'Por manejo inadecuado: contaminación, vía incorrecta' },
          { label: 'Coincidente', value: 'Temporal pero no causalmente relacionado' },
          { label: 'Desconocido', value: 'Información insuficiente para clasificar' },
          { label: 'No concluyente', value: 'Evidencia insuficiente para confirmar o descartar' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Eventos adversos comunes (frecuentes)',
        items: [
          'Locales: dolor, eritema, induración en sitio inyección (20-80%)',
          'Sistémicos leves: fiebre <39°C, irritabilidad, malestar',
          'Cefalea, mialgias, fatiga',
          'Aparición: primeras 24-48h',
          'Duración: 1-3 días',
          'Manejo: analgésicos, antipiréticos (paracetamol, ibuprofeno)'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Eventos adversos graves (raros)',
        items: [
          'Anafilaxia: 1-2 por millón de dosis, minutos post-vacunación',
          'Síndrome de Guillain-Barré: asociación mínima (influenza 1976)',
          'Invaginación intestinal: rotavirus 1-5/100,000',
          'Miocarditis/pericarditis: mRNA COVID-19, jóvenes varones',
          'Trombosis con trombocitopenia: vectores virales COVID-19',
          'Convulsiones febriles: raras, buen pronóstico',
          'SIRVA (lesión hombro): técnica inyección inadecuada'
        ]
      },
      {
        tipo: 'tabla',
        titulo: 'Sistemas de farmacovigilancia',
        datos: [
          { label: 'VAERS (USA)', value: 'Vaccine Adverse Event Reporting System, notificación pasiva' },
          { label: 'VSD (USA)', value: 'Vaccine Safety Datalink, 10M personas, estudios activos' },
          { label: 'CISA (USA)', value: 'Clinical Immunization Safety Assessment, casos complejos' },
          { label: 'EudraVigilance (EU)', value: 'Base de datos europea de farmacovigilancia' },
          { label: 'VigiBase (OMS)', value: 'Base de datos global, >180 países' },
          { label: 'Sistemas nacionales', value: 'Cada país tiene sistema de notificación obligatoria' }
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Contraindicaciones absolutas',
        items: [
          'Anafilaxia previa a componente vacunal',
          'Inmunodeficiencias severas: SCID, IDCV (vacunas vivas)',
          'Embarazo: vacunas vivas atenuadas',
          'Terapia inmunosupresora alta dosis: corticosteroides, biológicos (vivas)',
          'Enfermedad febril severa aguda: posponer',
          'Encefalitis post-vacunal previa: tos ferina'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Mitos desmentidos por evidencia',
        items: [
          'MMR y autismo: múltiples estudios, NO asociación (Wakefield fraudulento)',
          'Timerosal y autismo: removido de vacunas pediátricas (2001), NO cambió prevalencia',
          'Sobrecarga del sistema inmune: puede manejar miles de antígenos simultáneamente',
          'Inmunidad natural vs vacunas: vacunas más seguras, sin riesgo de enfermedad',
          'Vacunas causan enfermedades que previenen: imposible con inactivadas/subunidad',
          'Ingredientes tóxicos: dosis en vacunas son ínfimas y seguras'
        ]
      },
      {
        tipo: 'clinica',
        titulo: 'Comunicación de riesgos',
        items: [
          'Transparencia: reconocer eventos adversos reales',
          'Contexto: comparar riesgo vacunación vs enfermedad',
          'Ejemplo sarampión: 1:1000 encefalitis vs 1:1,000,000 post-MMR',
          'Ejemplo COVID-19: miocarditis 10x más frecuente en infección que vacuna',
          'Abordaje empático: escuchar preocupaciones',
          'Evidencia científica: estudios robustos, peer-reviewed',
          'Confianza: comunicadores creíbles, médicos de cabecera'
        ]
      }
    ]
  }
];
