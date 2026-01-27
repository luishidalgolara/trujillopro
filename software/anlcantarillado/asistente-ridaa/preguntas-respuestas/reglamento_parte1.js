/**
 * ============================================
 * PREGUNTAS Y RESPUESTAS - REGLAMENTO PARTE 1
 * Fuente: RIDAA - Primera Parte (Títulos I y II)
 * ============================================
 */

const RIDAA_FAQ_PARTE1 = {
    categoria: "Reglamento de Instalaciones Domiciliarias - Parte 1",
    fuente: "RIDAA - Primera Parte",
    preguntas: [
        {
            id: "p1_01",
            pregunta: "¿Qué es una instalación domiciliaria de agua potable?",
            respuesta: "Las obras necesarias para dotar de este servicio a un inmueble desde la salida de la llave de paso colocada a continuación del medidor o de los sistemas propios de abastecimiento de agua potable, hasta los artefactos.",
            articulo: "Artículo 2º - Definición 1",
            tags: ["definiciones", "agua potable", "instalaciones"]
        },
        {
            id: "p1_02",
            pregunta: "¿Qué es una instalación domiciliaria de alcantarillado de aguas servidas?",
            respuesta: "Las obras necesarias para evacuar las aguas servidas domésticas del inmueble, desde los artefactos hasta la última cámara domiciliaria, inclusive, o hasta los sistemas propios de disposición.",
            articulo: "Artículo 2º - Definición 2",
            tags: ["definiciones", "alcantarillado", "instalaciones"]
        },
        {
            id: "p1_03",
            pregunta: "¿Cuál es la diferencia entre arranque de agua potable y conexión?",
            respuesta: "El ARRANQUE DE AGUA POTABLE es el tramo de la red pública de distribución, comprendido desde el punto de su conexión a la tubería de distribución hasta la llave de paso colocada después del medidor inclusive.\n\nLa CONEXIÓN es la unión física del arranque de agua potable y la tubería de la red pública de distribución.",
            articulo: "Artículo 2º - Definiciones 3 y 11",
            tags: ["definiciones", "agua potable", "arranque", "conexión"]
        },
        {
            id: "p1_04",
            pregunta: "¿Qué es una última cámara domiciliaria?",
            respuesta: "Es la cámara ubicada dentro de la propiedad del usuario, que está más próxima al colector público de aguas servidas, entendiéndose por ésta, la última cámara en el sentido del flujo de evacuación.",
            articulo: "Artículo 2º - Definición 13",
            tags: ["definiciones", "alcantarillado", "cámara"]
        },
        {
            id: "p1_05",
            pregunta: "¿Cuál es la diferencia entre unión domiciliaria y empalme?",
            respuesta: "La UNIÓN DOMICILIARIA DE ALCANTARILLADO es el tramo de la red pública de recolección comprendido desde su punto de empalme a la tubería de recolección, hasta la última cámara de inspección domiciliaria exclusive.\n\nEL EMPALME es la unión física entre la unión domiciliaria de alcantarillado y la tubería de la red pública de recolección.",
            articulo: "Artículo 2º - Definiciones 4 y 12",
            tags: ["definiciones", "alcantarillado", "unión", "empalme"]
        },
        {
            id: "p1_06",
            pregunta: "¿En qué plazo debo instalar agua potable en mi inmueble urbano?",
            respuesta: "Todo propietario de inmueble urbano edificado, con frente a una red pública de agua potable deberá instalar a su costa las instalaciones domiciliarias de agua potable y el arranque, incluida su conexión, dentro del plazo de SEIS MESES, contado desde la puesta en explotación de dichas redes, o desde la notificación respectiva al propietario, por parte de la concesionaria.",
            articulo: "Artículo 4º",
            tags: ["plazos", "obligaciones", "agua potable"]
        },
        {
            id: "p1_07",
            pregunta: "¿En qué plazo debo instalar alcantarillado en mi inmueble urbano?",
            respuesta: "Todo propietario de inmueble urbano edificado, con frente a una red pública de alcantarillado deberá instalar a su costa las instalaciones domiciliarias de alcantarillado y la unión domiciliaria, incluida su empalme, dentro del plazo de DOCE MESES, contado desde la puesta en explotación de dichas redes, o desde la notificación respectiva al propietario, por parte de la concesionaria.",
            articulo: "Artículo 4º",
            tags: ["plazos", "obligaciones", "alcantarillado"]
        },
        {
            id: "p1_08",
            pregunta: "¿Qué pasa si no cumplo con instalar agua potable o alcantarillado en los plazos establecidos?",
            respuesta: "Los predios en que no se cumpla con esta obligación, podrán ser clausurados por la autoridad de Salud correspondiente, de oficio o a petición del prestador.",
            articulo: "Artículo 4º",
            tags: ["obligaciones", "sanciones", "plazos"]
        },
        {
            id: "p1_09",
            pregunta: "¿De quién es la responsabilidad del mantenimiento de las instalaciones domiciliarias?",
            respuesta: "El mantenimiento de las instalaciones domiciliarias de agua potable y de alcantarillado es de exclusiva responsabilidad y cargo del propietario del inmueble.\n\nEl mantenimiento del arranque de agua potable y de la unión domiciliaria de alcantarillado será ejecutado por el prestador en los términos dispuestos en el DFL MOP Nº 70, de 1988.",
            articulo: "Artículo 7º",
            tags: ["mantenimiento", "responsabilidades", "obligaciones"]
        },
        {
            id: "p1_10",
            pregunta: "¿Qué normas deben cumplir las instalaciones domiciliarias?",
            respuesta: "El diseño y construcción de las instalaciones domiciliarias de agua potable y alcantarillado, y los materiales, componentes, artefactos, equipos y sistemas utilizados deberán cumplir con las Normas Chilenas Oficiales correspondientes. A falta de ellas se aplicará la normativa o especificación técnica extranjera, o bien, las especificaciones técnicas que fije la Superintendencia de Servicios Sanitarios.",
            articulo: "Artículo 6º",
            tags: ["normas", "requisitos técnicos", "materiales"]
        },
        {
            id: "p1_11",
            pregunta: "¿Quiénes pueden proyectar y construir instalaciones domiciliarias?",
            respuesta: "Los proyectos y construcción de instalaciones domiciliarias, incluyendo arranques, uniones domiciliarias, conexiones y empalmes podrán ser ejecutados por:\n\n• Ingenieros civiles\n• Arquitectos\n• Ingenieros de ejecución en obras sanitarias\n• Ingenieros constructores\n• Constructores civiles\n• Y en general, por cualquier profesional de la construcción habilitado para ello por disposiciones legales y reglamentarias vigentes.",
            articulo: "Artículo 9º",
            tags: ["profesionales", "requisitos", "proyectos"]
        },
        {
            id: "p1_12",
            pregunta: "¿Qué son las redes privadas de distribución de agua potable?",
            respuesta: "Aquella parte de la instalación domiciliaria de agua potable, ubicadas aguas abajo del arranque domiciliario y que sirve a más de un inmueble, vivienda o departamento, hasta los sistemas propios de elevación o hasta la llave de paso ubicada inmediatamente después del elemento de medición individual, según corresponda.\n\nEstas redes deben ser proyectadas y construidas en las vías de circulación o espacios de usos comunes al exterior de las edificaciones.",
            articulo: "Artículo 2º - Definición 7",
            tags: ["definiciones", "redes privadas", "agua potable"]
        },
        {
            id: "p1_13",
            pregunta: "¿Qué son las redes privadas de recolección de aguas servidas?",
            respuesta: "Aquella parte de la instalación domiciliaria de alcantarillado, ubicada aguas arriba de la unión domiciliaria y que sirve a más de un inmueble, vivienda o departamento, hasta los sistemas propios de elevación o hasta la última cámara de la instalación interior de cada edificación que conforma el conjunto, según corresponda.\n\nEstas redes deben ser proyectadas y construidas en las vías de circulación o espacios de usos comunes al exterior de las edificaciones.",
            articulo: "Artículo 2º - Definición 8",
            tags: ["definiciones", "redes privadas", "alcantarillado"]
        },
        {
            id: "p1_14",
            pregunta: "¿Qué normas deben cumplir las redes privadas?",
            respuesta: "Las redes privadas de distribución de agua potable o de recolección de aguas servidas, que se proyecten y construyan en vías privadas de circulación peatonal y/o vehicular o espacios de usos comunes al exterior de edificios y conjuntos habitacionales, deben cumplir con las condiciones técnicas de las redes públicas en conformidad a lo establecido en las normas chilenas NCh 691 y NCh 1105, respectivamente, y la NCh 1104.\n\nSin embargo, para todos los efectos legales, administrativos y operacionales mantienen su carácter de red privada y su mantención será de cargo del usuario.",
            articulo: "Artículo 5º",
            tags: ["redes privadas", "normas", "mantenimiento"]
        },
        {
            id: "p1_15",
            pregunta: "¿Qué es un certificado de instalaciones de agua potable y alcantarillado?",
            respuesta: "El documento que acredita que las instalaciones de agua potable y de alcantarillado de la propiedad están conectadas a las redes de los Prestadores e incorporada en los registros comerciales de estos últimos, o que cuentan con un sistema propio de abastecimiento de agua potable o disposición de aguas servidas debidamente autorizado por el Servicio de Salud correspondiente.\n\nDenominado también en la Ordenanza de Urbanismo y Construcciones 'Certificado de instalaciones de agua potable y desagües'.",
            articulo: "Artículo 2º - Definición 18",
            tags: ["definiciones", "certificados", "documentación"]
        }
    ]
};

// Exportar globalmente
window.RIDAA_FAQ_PARTE1 = RIDAA_FAQ_PARTE1;
console.log('✅ FAQ RIDAA Parte 1 cargado - 15 preguntas disponibles');