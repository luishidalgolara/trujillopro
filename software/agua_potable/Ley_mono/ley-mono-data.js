// ley-mono-data.js - BASE DE DATOS LEY DEL MONO 20.898

const LEY_MONO_DATA = [
    // ========== REQUISITOS ==========
    {
        id: 1,
        category: 'requisitos',
        title: 'Superficie y Avalúo Fiscal - Opción 1',
        content: 'Vivienda menor a 90 m² con avalúo fiscal menor a 1.000 UF (vivienda y terreno en conjunto).',
        tags: ['90m2', '1000 UF', 'superficie', 'avalúo']
    },
    {
        id: 2,
        category: 'requisitos',
        title: 'Superficie y Avalúo Fiscal - Opción 2',
        content: 'Vivienda menor a 140 m² con avalúo fiscal menor a 2.000 UF (vivienda y terreno en conjunto).',
        tags: ['140m2', '2000 UF', 'superficie', 'avalúo']
    },
    {
        id: 3,
        category: 'requisitos',
        title: 'Fecha de Construcción',
        content: 'La vivienda debe haber sido construida ANTES del 4 de febrero de 2016 (fecha de publicación de la ley).',
        tags: ['2016', 'fecha', 'construcción']
    },
    {
        id: 4,
        category: 'requisitos',
        title: 'Ubicación Permitida',
        content: 'Válido para viviendas en áreas urbanas y rurales. NO debe estar en áreas de riesgo, protección, terrenos de utilidad pública o bienes nacionales de uso público.',
        tags: ['urbana', 'rural', 'ubicación', 'restricciones']
    },
    {
        id: 5,
        category: 'requisitos',
        title: 'Sin Reclamaciones Pendientes',
        content: 'No debe tener reclamaciones escritas pendientes por incumplimiento de normas urbanísticas en la DOM o Juzgado de Policía Local.',
        tags: ['reclamaciones', 'DOM', 'multas']
    },
    {
        id: 6,
        category: 'requisitos',
        title: 'Normas de Habitabilidad',
        content: 'Debe cumplir con normas de habitabilidad, terminaciones, ventilación, alturas mínimas (2 metros en techos), seguridad contra incendio y estabilidad estructural.',
        tags: ['habitabilidad', 'seguridad', 'ventilación', '2m']
    },
    {
        id: 7,
        category: 'requisitos',
        title: 'Instalaciones Básicas',
        content: 'Debe contar con instalaciones de agua potable, electricidad, alcantarillado y gas (cuando corresponda) según normativa vigente.',
        tags: ['agua', 'luz', 'alcantarillado', 'gas', 'servicios']
    },

    // ========== PLAZOS ==========
    {
        id: 8,
        category: 'plazos',
        title: 'Vigencia Actual Extendida',
        content: 'La Ley 20.898 está vigente hasta el 31 de diciembre de 2027 según la última prórroga (Ley 21.725 del 1 de marzo de 2025).',
        tags: ['2027', 'diciembre', 'vigencia', 'prórroga']
    },
    {
        id: 9,
        category: 'plazos',
        title: 'Plazo de Ingreso de Solicitud',
        content: 'Los propietarios tienen hasta el 31 de diciembre de 2027 para INGRESAR la solicitud de regularización ante la Dirección de Obras Municipales.',
        tags: ['solicitud', 'ingreso', '31 diciembre', 'DOM']
    },
    {
        id: 10,
        category: 'plazos',
        title: 'Plazo de Revisión Municipal',
        content: 'La DOM tiene 90 días hábiles desde la presentación de la solicitud para revisar y otorgar el certificado de regularización.',
        tags: ['90 días', 'revisión', 'municipalidad', 'certificado']
    },
    {
        id: 11,
        category: 'plazos',
        title: 'Tiempo Estimado Total',
        content: 'La tramitación completa suele demorar aproximadamente 30 días si la vivienda cumple todos los requisitos y no hay observaciones.',
        tags: ['30 días', 'tiempo', 'tramitación']
    },

    // ========== DOCUMENTOS ==========
    {
        id: 12,
        category: 'documentos',
        title: 'Declaración Simple del Propietario',
        content: 'Documento que confirma la titularidad del inmueble y la ausencia de reclamaciones pendientes.',
        tags: ['declaración', 'propietario', 'titularidad']
    },
    {
        id: 13,
        category: 'documentos',
        title: 'Planos de Arquitectura',
        content: 'Croquis, plano de emplazamiento a escala 1:500 y planos a escala 1:50 que grafiquen las plantas y medidas de la vivienda, firmados por arquitecto.',
        tags: ['planos', '1:50', '1:500', 'arquitecto']
    },
    {
        id: 14,
        category: 'documentos',
        title: 'Informe de Profesional Competente',
        content: 'Informe de arquitecto o profesional competente que certifica que la vivienda cumple normas de habitabilidad, seguridad y estabilidad (Art. 17 LGUC).',
        tags: ['informe', 'certificación', 'profesional', 'LGUC']
    },
    {
        id: 15,
        category: 'documentos',
        title: 'Certificado de Avalúo Fiscal',
        content: 'Certificado otorgado por el Servicio de Impuestos Internos (SII) que indica el avalúo fiscal de la propiedad.',
        tags: ['avalúo', 'SII', 'certificado', 'impuestos']
    },
    {
        id: 16,
        category: 'documentos',
        title: 'Certificado TE1 (SEC)',
        content: 'Certificado emitido por la Superintendencia de Electricidad y Combustibles que aprueba la instalación eléctrica interior.',
        tags: ['TE1', 'SEC', 'electricidad', 'certificado']
    },
    {
        id: 17,
        category: 'documentos',
        title: 'Proyecto de Cálculo Estructural (si aplica)',
        content: 'En algunos casos se requiere proyecto de cálculo estructural dependiendo de las características de la construcción.',
        tags: ['estructural', 'cálculo', 'ingeniería']
    },

    // ========== BENEFICIOS ==========
    {
        id: 18,
        category: 'beneficios',
        title: 'Trámite Simplificado',
        content: 'Proceso más rápido con menos exigencias que regularizaciones normales. Solo requiere planos de arquitectura.',
        tags: ['simplificado', 'rápido', 'fácil']
    },
    {
        id: 19,
        category: 'beneficios',
        title: 'Permiso y Recepción Simultáneos',
        content: 'NO es necesario hacer trámite de recepción final por separado, ya que el permiso y la recepción se otorgan juntos.',
        tags: ['permiso', 'recepción', 'simultáneo']
    },
    {
        id: 20,
        category: 'beneficios',
        title: 'Descuento 75% en Derechos',
        content: 'Si el avalúo de la construcción NO supera las 400 UF, hay un descuento del 75% en derechos municipales.',
        tags: ['75%', '400 UF', 'descuento', 'derechos']
    },
    {
        id: 21,
        category: 'beneficios',
        title: 'Descuento 50% en Derechos',
        content: 'Si el avalúo de la construcción supera las 400 UF, hay un descuento del 50% en derechos municipales.',
        tags: ['50%', 'descuento', 'derechos']
    },
    {
        id: 22,
        category: 'beneficios',
        title: 'Exención 100% - Adultos Mayores',
        content: 'Si el propietario tiene 65 años o más, está EXENTO al 100% del pago de derechos municipales.',
        tags: ['100%', '65 años', 'adulto mayor', 'exención']
    },
    {
        id: 23,
        category: 'beneficios',
        title: 'Exención 100% - Discapacidad',
        content: 'Si uno de los residentes está inscrito en el Registro Nacional de la Discapacidad, hay exención total (100%) de derechos.',
        tags: ['100%', 'discapacidad', 'exención', 'registro']
    },
    {
        id: 24,
        category: 'beneficios',
        title: 'Aumento de Plusvalía',
        content: 'La regularización aumenta el valor comercial de la propiedad al tener documentación legal en orden.',
        tags: ['plusvalía', 'valor', 'comercial']
    },
    {
        id: 25,
        category: 'beneficios',
        title: 'Acceso a Subsidios Estatales',
        content: 'Una vez regularizada, la vivienda puede optar a subsidios y programas del Estado que requieren documentación en regla.',
        tags: ['subsidios', 'estado', 'programas']
    },
    {
        id: 26,
        category: 'beneficios',
        title: 'Excepciones Normativas',
        content: 'Se exceptúan requisitos como: antejardines, exigencia de estacionamientos y altura de cierros (máx 2.2m permitido).',
        tags: ['excepciones', 'antejardín', 'estacionamiento', '2.2m']
    },

    // ========== PROCESO ==========
    {
        id: 27,
        category: 'proceso',
        title: 'Paso 1: Verificar Requisitos',
        content: 'Confirmar que la vivienda cumple con superficie, avalúo, fecha de construcción y ubicación permitida.',
        tags: ['verificar', 'requisitos', 'cumplimiento']
    },
    {
        id: 28,
        category: 'proceso',
        title: 'Paso 2: Contratar Profesional',
        content: 'Contratar a un arquitecto o profesional competente para elaborar planos y certificar cumplimiento normativo.',
        tags: ['arquitecto', 'profesional', 'contratar']
    },
    {
        id: 29,
        category: 'proceso',
        title: 'Paso 3: Obtener Certificado SII',
        content: 'Solicitar certificado de avalúo fiscal en el Servicio de Impuestos Internos.',
        tags: ['SII', 'avalúo', 'certificado']
    },
    {
        id: 30,
        category: 'proceso',
        title: 'Paso 4: Obtener Certificado TE1',
        content: 'Tramitar certificado eléctrico TE1 ante la Superintendencia de Electricidad y Combustibles (SEC).',
        tags: ['TE1', 'SEC', 'electricidad']
    },
    {
        id: 31,
        category: 'proceso',
        title: 'Paso 5: Preparar Documentación',
        content: 'Reunir declaración simple, planos, informes técnicos y certificados requeridos.',
        tags: ['documentos', 'preparar', 'reunir']
    },
    {
        id: 32,
        category: 'proceso',
        title: 'Paso 6: Ingresar Solicitud en DOM',
        content: 'Presentar toda la documentación en la Dirección de Obras Municipales de la comuna donde está la propiedad.',
        tags: ['DOM', 'solicitud', 'municipalidad', 'ingresar']
    },
    {
        id: 33,
        category: 'proceso',
        title: 'Paso 7: Esperar Revisión (90 días)',
        content: 'La DOM revisará exclusivamente el cumplimiento de normas urbanísticas. Plazo máximo: 90 días hábiles.',
        tags: ['revisión', '90 días', 'espera']
    },
    {
        id: 34,
        category: 'proceso',
        title: 'Paso 8: Pago de Derechos',
        content: 'Realizar el pago de derechos municipales con los descuentos o exenciones que correspondan.',
        tags: ['pago', 'derechos', 'municipales']
    },
    {
        id: 35,
        category: 'proceso',
        title: 'Paso 9: Obtener Certificado',
        content: 'Si todo está correcto, la DOM otorgará el Certificado de Regularización que incluye permiso y recepción.',
        tags: ['certificado', 'regularización', 'final']
    },

    // ========== INFORMACIÓN GENERAL ==========
    {
        id: 36,
        category: 'requisitos',
        title: '¿Qué es la Ley del Mono?',
        content: 'Procedimiento simplificado para regularizar viviendas de autoconstrucción, es decir, construidas sin permiso municipal previo.',
        tags: ['definición', 'autoconstrucción', 'regularización']
    },
    {
        id: 37,
        category: 'beneficios',
        title: 'Origen del Nombre',
        content: 'En Chile "hacer un mono" significa hacer un dibujo o croquis. Se refiere al croquis/plano de la vivienda a regularizar.',
        tags: ['nombre', 'mono', 'croquis', 'origen']
    },
    {
        id: 38,
        category: 'proceso',
        title: 'Formularios Oficiales',
        content: 'Existen formularios únicos según superficie: uno para viviendas hasta 90m² (1000 UF) y otro para hasta 140m² (2000 UF).',
        tags: ['formularios', 'DOM', 'oficial']
    },
    {
        id: 39,
        category: 'requisitos',
        title: 'Microempresas y Equipamiento',
        content: 'La ley también aplica para regularización de microempresas inofensivas y equipamiento social (Título II de la ley).',
        tags: ['microempresas', 'comercio', 'equipamiento']
    },
    {
        id: 40,
        category: 'plazos',
        title: 'Historia de Prórrogas',
        content: 'Ley original 2016 (3 años) → Ley 21.141/2019 (6 años) → Ley 21.415/2022 (7 años) → Ley 21.558/2023 → Ley 21.725/2025 (hasta 2027).',
        tags: ['historia', 'prórrogas', 'extensiones']
    }
];

// Exportar datos
window.LEY_MONO_DATA = LEY_MONO_DATA;