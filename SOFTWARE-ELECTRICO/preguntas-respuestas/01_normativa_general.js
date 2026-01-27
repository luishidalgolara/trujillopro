// ============================================================
// PREGUNTAS Y RESPUESTAS - ARCHIVO 01
// NCh Elec 4/2003 - Normativa General y Conceptos Básicos
// ============================================================

const preguntasRespuestas_01 = {
    categoria: "NORMATIVA GENERAL Y TERMINOLOGÍA",
    
    preguntas: [
        {
            id: "01_001",
            pregunta: "¿Qué es la NCh Elec 4/2003?",
            respuesta: "Es la norma chilena que establece las condiciones mínimas de seguridad para instalaciones eléctricas de consumo en Baja Tensión. Fue emitida por la Superintendencia de Electricidad y Combustibles (SEC) en octubre de 2003 y su objetivo principal es salvaguardar a las personas que operan estas instalaciones y preservar el medio ambiente.",
            keywords: ["norma", "nch", "sec", "baja tensión", "seguridad"],
            seccion: "1 - Objetivo"
        },
        {
            id: "01_002",
            pregunta: "¿A qué instalaciones aplica la norma NCh Elec 4/2003?",
            respuesta: "Aplica al proyecto, ejecución y mantenimiento de instalaciones de consumo cuya tensión sea inferior a 1000V. Esto incluye instalaciones domiciliarias, comerciales e industriales, pero NO aplica a vehículos, faenas mineras subterráneas, tracción ferroviaria ni instalaciones de comunicaciones.",
            keywords: ["alcance", "aplicación", "instalaciones", "1000v"],
            seccion: "2 - Alcance"
        },
        {
            id: "01_003",
            pregunta: "¿Qué es un circuito eléctrico según la norma?",
            respuesta: "Es el conjunto de artefactos alimentados por una línea común de distribución, la cual es protegida por un único dispositivo de protección (disyuntor o fusible). Cada circuito debe estar dimensionado para la carga que alimenta.",
            keywords: ["circuito", "protección", "artefactos"],
            seccion: "4.1.14 - Terminología"
        },
        {
            id: "01_004",
            pregunta: "¿Qué es un conductor activo?",
            respuesta: "Es el conductor destinado al transporte de energía eléctrica. Se aplica a los conductores de fase y neutro en sistemas de corriente alterna, o a los conductores positivo, negativo y neutro en sistemas de corriente continua.",
            keywords: ["conductor", "activo", "fase", "neutro"],
            seccion: "4.1.15.1 - Terminología"
        },
        {
            id: "01_005",
            pregunta: "¿Qué diferencia hay entre conductor aislado y conductor desnudo?",
            respuesta: "Un conductor aislado tiene su superficie protegida mediante una cubierta de material aislante que evita contactos directos. Un conductor desnudo no tiene ninguna protección y su superficie está expuesta, solo se usa en aplicaciones muy específicas como puestas a tierra.",
            keywords: ["conductor", "aislado", "desnudo", "protección"],
            seccion: "4.1.15.2 y 4.1.15.3 - Terminología"
        },
        {
            id: "01_006",
            pregunta: "¿Qué es un tablero eléctrico?",
            respuesta: "Es un conjunto de dispositivos de protección, maniobra y distribución de energía eléctrica, montados en un gabinete o estructura. Contiene los disyuntores, diferenciales y barras de distribución que protegen y controlan los diferentes circuitos de la instalación.",
            keywords: ["tablero", "gabinete", "protección", "distribución"],
            seccion: "6.0 - Tableros"
        },
        {
            id: "01_007",
            pregunta: "¿Qué es la puesta a tierra?",
            respuesta: "Es el conjunto de electrodos y líneas de tierra cuya finalidad es establecer el contacto eléctrico con el suelo. Su función es proteger a las personas contra contactos indirectos y permitir el funcionamiento correcto de las protecciones diferenciales.",
            keywords: ["tierra", "puesta a tierra", "protección", "electrodo"],
            seccion: "4.1.32.5 - Terminología"
        },
        {
            id: "01_008",
            pregunta: "¿Qué es un disyuntor termomagnético?",
            respuesta: "Es un dispositivo de protección con comando manual que desconecta automáticamente una instalación cuando la corriente excede valores preestablecidos. Protege contra sobrecargas (térmico) y cortocircuitos (magnético). Es reutilizable a diferencia de los fusibles.",
            keywords: ["disyuntor", "termomagnético", "protección", "automático"],
            seccion: "4.1.27.1 - Terminología"
        },
        {
            id: "01_009",
            pregunta: "¿Qué es un protector diferencial?",
            respuesta: "Es un dispositivo que detecta fugas de corriente a tierra y desconecta automáticamente el circuito. Opera cuando la diferencia entre la corriente que entra y sale del circuito supera un valor preestablecido (generalmente 30mA en viviendas). Protege contra electrocución.",
            keywords: ["diferencial", "fuga", "30ma", "protección", "electrocución"],
            seccion: "4.1.27.4 - Terminología"
        },
        {
            id: "01_010",
            pregunta: "¿Qué es la demanda de una instalación?",
            respuesta: "Es la carga de consumo en un punto determinado, promediada sobre un intervalo de tiempo. La demanda máxima es el mayor consumo que ocurre en un período dado. No es igual a la suma de potencias instaladas, ya que no todos los equipos funcionan simultáneamente.",
            keywords: ["demanda", "consumo", "potencia", "carga"],
            seccion: "4.1.17 - Terminología"
        },
        {
            id: "01_011",
            pregunta: "¿Qué es el factor de demanda?",
            respuesta: "Es la relación entre la demanda máxima real de la instalación y la carga total conectada (suma de todas las potencias nominales). Generalmente es menor a 1 porque no todos los equipos funcionan al mismo tiempo. Por ejemplo, 0.75 significa que se usa el 75% de la carga instalada.",
            keywords: ["factor demanda", "simultaneidad", "carga"],
            seccion: "4.1.17.2 - Terminología"
        },
        {
            id: "01_012",
            pregunta: "¿Qué es una canalización eléctrica?",
            respuesta: "Es el conjunto formado por conductores eléctricos y los accesorios que aseguran su fijación y protección mecánica. Puede ser a la vista, embutida (en muros), oculta, preembutida o subterránea según su forma de instalación.",
            keywords: ["canalización", "ducto", "tubería", "conductores"],
            seccion: "4.1.11 - Terminología"
        },
        {
            id: "01_013",
            pregunta: "¿Qué diferencia hay entre canalización embutida y oculta?",
            respuesta: "Una canalización EMBUTIDA va dentro de perforaciones en muros, losas o tabiques y queda cubierta por el enlucido, NO es accesible. Una canalización OCULTA va en lugares donde no se ve directamente pero SÍ es accesible en toda su extensión (por ejemplo, sobre cielo falso).",
            keywords: ["embutida", "oculta", "accesible", "muro"],
            seccion: "4.1.11.2 y 4.1.11.3 - Terminología"
        },
        {
            id: "01_014",
            pregunta: "¿Qué es un cortocircuito?",
            respuesta: "Es una falla donde la impedancia es muy pequeña, causando una circulación de corriente muy alta (puede ser miles de amperes) con respecto a la capacidad normal del circuito. Es peligroso porque puede causar incendios, explosiones y daños a equipos. Por eso se requieren protecciones adecuadas.",
            keywords: ["cortocircuito", "falla", "corriente alta", "peligro"],
            seccion: "4.1.20.1 - Terminología"
        },
        {
            id: "01_015",
            pregunta: "¿Qué es una falla a masa?",
            respuesta: "Es la unión accidental entre un conductor activo y la cubierta o carcasa metálica de un equipo eléctrico. Si el equipo no está correctamente conectado a tierra, la carcasa puede quedar energizada y causar electrocución al tocarla.",
            keywords: ["falla masa", "carcasa", "electrocución", "tierra"],
            seccion: "4.1.20.2 - Terminología"
        },
        {
            id: "01_016",
            pregunta: "¿Qué tipos de equipos según protección contra agua existen?",
            respuesta: "Según la norma IEC 529: Equipo a prueba de GOTEO (IPX2), a prueba de LLUVIA (IPX3), a prueba de SALPICADURAS (IPX4), e IMPERMEABLE (IPX7/IPX8 para inmersión). Cada uno tiene un grado de protección específico según el ambiente donde se instale.",
            keywords: ["protección", "agua", "ip", "intemperie"],
            seccion: "4.1.19.2 a 4.1.19.5 - Terminología"
        },
        {
            id: "01_017",
            pregunta: "¿Qué es un equipo a prueba de polvo?",
            respuesta: "Es un equipo construido para que el polvo en suspensión no penetre en su interior. Se clasifica como IP5X (protección contra polvo) o IP6X (totalmente hermético al polvo). Es necesario en ambientes industriales, talleres, molinos, etc.",
            keywords: ["polvo", "ip5x", "ip6x", "protección"],
            seccion: "4.1.19.6 - Terminología"
        },
        {
            id: "01_018",
            pregunta: "¿Qué es el alumbrado de emergencia?",
            respuesta: "Es el sistema de iluminación que se activa cuando falla el alumbrado normal. Su objetivo es permitir la evacuación segura de personas. Se divide en: alumbrado de seguridad, antipánico, de zonas de trabajo riesgoso y de reemplazo.",
            keywords: ["emergencia", "evacuación", "seguridad", "antipánico"],
            seccion: "4.1.6 - Terminología"
        },
        {
            id: "01_019",
            pregunta: "¿Cuándo se considera un local de reunión de personas?",
            respuesta: "Cuando está presente un número superior a 25 personas por más de 15 minutos. Incluye: hospitales, escuelas, iglesias, cines, teatros, estadios, gimnasios, etc. Estos locales tienen exigencias especiales de seguridad e iluminación de emergencia.",
            keywords: ["reunión", "25 personas", "público", "emergencia"],
            seccion: "4.1.24 - Terminología"
        },
        {
            id: "01_020",
            pregunta: "¿Qué es un alimentador eléctrico?",
            respuesta: "Es la línea que conecta el tablero general con los tableros secundarios o con grandes cargas. Es dimensionado para soportar la demanda máxima de todos los circuitos que alimenta, considerando factores de simultaneidad.",
            keywords: ["alimentador", "tablero", "demanda", "dimensionamiento"],
            seccion: "7.0 - Alimentadores"
        }
    ]
};

// Exportar para uso en el asistente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = preguntasRespuestas_01;
}

console.log('✅ Archivo 01 - Normativa General cargado: ' + preguntasRespuestas_01.preguntas.length + ' preguntas');