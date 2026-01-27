/**
 * ============================================
 * PREGUNTAS Y RESPUESTAS - REGLAMENTO PARTE 5
 * Fuente: RIDAA - Red de Incendio y Estanques de Agua Potable
 * ============================================
 */

const RIDAA_FAQ_PARTE5 = {
    categoria: "Red de Incendio y Estanques",
    fuente: "RIDAA - Título IV y V (Segunda Parte)",
    preguntas: [
        {
            id: "p5_01",
            pregunta: "¿Qué edificaciones deben tener red húmeda de incendio?",
            respuesta: "Deben contar con red húmeda:\n\n• Inmuebles destinados a reunión de personas (hospitales, comercio, escuelas, industrias, edificios públicos, deportivos)\n\n• Edificios de TRES O MÁS PISOS\n\nDebe considerarse una boca de incendio de 25 mm como mínimo por piso, conectada al sistema de distribución de agua del edificio.",
            articulo: "Artículo 53º - a.a",
            tags: ["red húmeda", "incendio", "edificios"]
        },
        {
            id: "p5_02",
            pregunta: "¿A qué distancia máxima debe quedar un punto de la boca de incendio?",
            respuesta: "Las bocas de incendio se distribuirán de manera que ningún punto del inmueble quede a una distancia mayor de VEINTICINCO METROS (25 m) de ellas, con una manguera que cubra el punto más alejado.\n\nSu acceso será expedito y de fácil accionamiento de válvulas y mangueras.",
            articulo: "Artículo 53º - a.a",
            tags: ["boca de incendio", "distancia", "red húmeda"]
        },
        {
            id: "p5_03",
            pregunta: "¿Dónde deben ubicarse las bocas de incendio en edificios de departamentos?",
            respuesta: "En edificios de departamentos las bocas de incendio deberán ubicarse en ESPACIOS COMUNES.\n\nEn aquellos casos que no se pueda cumplir con la distancia de 25 metros, podrán aceptarse mangueras de longitud superior, siempre que permitan contar una presión de 8 m.c.a. a la salida de la manguera.",
            articulo: "Artículo 53º - a.b",
            tags: ["bocas de incendio", "edificios", "ubicación"]
        },
        {
            id: "p5_04",
            pregunta: "¿Cómo debe instalarse una boca de incendio?",
            respuesta: "Cada boca de incendio se ubicará en un nicho con puerta de vidrio debidamente señalizado, en lugares de fácil acceso y rápida ubicación, excepto las escalas presurizadas.\n\nEste nicho se ubicará a una altura entre 0,9 m y 1,5 m sobre el nivel del piso.\n\nContará una manguera resistente a una temperatura de 80°C, con certificado de calidad y especificada para estos efectos.",
            articulo: "Artículo 53º - a.c",
            tags: ["boca de incendio", "instalación", "nicho"]
        },
        {
            id: "p5_05",
            pregunta: "¿Qué edificios deben tener red seca de incendio?",
            respuesta: "Los edificios de CINCO O MÁS PISOS de altura deberán instalar una red seca para agua independiente de la red de distribución de agua para el consumo.\n\nSerá una tubería matriz para utilización exclusiva del Cuerpo de Bomberos, de acero galvanizado ASTM A-53 con unión roscada y tendrá un diámetro mínimo de 100 mm.",
            articulo: "Artículo 53º - b.a",
            tags: ["red seca", "incendio", "edificios", "bomberos"]
        },
        {
            id: "p5_06",
            pregunta: "¿Cuál es la capacidad mínima de la red seca?",
            respuesta: "La capacidad de la red seca deberá verificarse para un caudal total de 24 l/s, con una presión de 50 m.c.a. en la boca de salida más desfavorable.",
            articulo: "Artículo 53º - b.a",
            tags: ["red seca", "capacidad", "caudal"]
        },
        {
            id: "p5_07",
            pregunta: "¿Dónde rematan las bocas exteriores de la red seca?",
            respuesta: "La parte inferior de la tubería se prolongará hasta el exterior del edificio donde rematará en DOS BOCAS DE 75 mm, ubicadas a UN METRO de altura sobre el nivel de piso terminado adyacente y en un lugar de fácil acceso e inmediato a las vías principales de entrada al edificio.\n\nCada boca rematará en uniones Storz que permitan el acople según DIN 14.322.",
            articulo: "Artículo 53º - b.c",
            tags: ["red seca", "bocas exteriores", "bomberos"]
        },
        {
            id: "p5_08",
            pregunta: "¿A qué distancia máxima debe estar una boca de salida de red seca en cada piso?",
            respuesta: "La red seca tendrá bocas de salidas debidamente señalizadas en todos los pisos incluidos los subterráneos, que se ubicarán en espacios comunes y en lugares de fácil acceso.\n\nDeberá cuidarse que ningún punto de cada piso quede a una distancia mayor de CUARENTA METROS (40 m) de una boca de salida.",
            articulo: "Artículo 53º - b.d",
            tags: ["red seca", "bocas de salida", "distancia"]
        },
        {
            id: "p5_09",
            pregunta: "¿Qué capacidad mínima deben tener los estanques en edificios de 4 o más pisos?",
            respuesta: "En los edificios de cuatro o más pisos, deberán proyectarse estanques de regulación inferior, o inferior y superior, cuya capacidad total conjunta sea superior al 50% del consumo medio diario de los departamentos, oficinas y locales comerciales.\n\nLa capacidad útil total del estanque superior deberá ser mayor al 5% de dicho consumo.",
            articulo: "Artículo 55º",
            tags: ["estanques", "capacidad", "edificios"]
        },
        {
            id: "p5_10",
            pregunta: "¿Qué capacidad de estanque necesitan los establecimientos hospitalarios?",
            respuesta: "Los establecimientos hospitalarios deberán contar con estanque de una capacidad mínima de un 100% del consumo medio diario.",
            articulo: "Artículo 56º",
            tags: ["estanques", "hospitales", "capacidad"]
        },
        {
            id: "p5_11",
            pregunta: "¿Los estanques de 20 m³ o más necesitan compartimentos?",
            respuesta: "Sí. Los estanques de 20 m³ o más deberán estar divididos en DOS (2) o más compartimentos.",
            articulo: "Artículo 60º",
            tags: ["estanques", "compartimentos", "diseño"]
        },
        {
            id: "p5_12",
            pregunta: "¿Cómo se verifica la estanqueidad de un estanque?",
            respuesta: "Una vez estabilizado el nivel del agua y terminada la absorción de la misma, se procederá a medir la estanqueidad de la estructura.\n\nSu pérdida no deberá ser mayor que el 0,5% de la altura de aguas en 24 horas.",
            articulo: "Artículo 61º",
            tags: ["estanques", "estanqueidad", "pruebas"]
        },
        {
            id: "p5_13",
            pregunta: "¿Cómo debo desinfectar un estanque nuevo?",
            respuesta: "En forma previa al inicio de operación del servicio, se deberá limpiar y desinfectar los estanques, mediante la aplicación de:\n\n• Una solución de 50 mg de cloro por litro de agua, O\n• Hipoclorito de sodio al 10%\n\nDurante SEIS (6) HORAS.",
            articulo: "Artículo 62º",
            tags: ["estanques", "desinfección", "limpieza"]
        },
        {
            id: "p5_14",
            pregunta: "¿Qué es la tubería de rebase y a qué altura debe ir?",
            respuesta: "Cada estanque contará con una tubería de rebase ubicada a lo menos CINCO CENTÍMETROS sobre el nivel máximo del agua.\n\nDeberá tener un área mínima a lo menos igual al doble del área del tubo de entrada. En todo caso deberá poder desaguar el gasto de entrada.\n\nLas aguas del rebase deberán conducirse al sistema de desagüe del edificio, asegurándose que no exista posibilidad de contaminación.",
            articulo: "Artículo 64º y 65º",
            tags: ["estanques", "rebase", "tubería"]
        },
        {
            id: "p5_15",
            pregunta: "¿En cuánto tiempo debe vaciarse completamente un estanque?",
            respuesta: "El desagüe se deberá instalar en una depresión de a lo menos 0,20 m de profundidad, ubicada en la parte más baja de cada estanque.\n\nDeberá permitir un vaciado completo de cada unidad en un MÁXIMO DE CUATRO HORAS.",
            articulo: "Artículo 67º",
            tags: ["estanques", "desagüe", "vaciado"]
        },
        {
            id: "p5_16",
            pregunta: "¿Qué pendiente debe tener el radier del estanque?",
            respuesta: "Toda la superficie interna del estanque deberá ser lisa y su radier deberá tener una pendiente hacia el desagüe, con un valor MÍNIMO DEL 1%.\n\nEn estanques de hormigón armado el recubrimiento de las armaduras de las superficies en contacto con el agua no será inferior a 2 cm.",
            articulo: "Artículo 69º",
            tags: ["estanques", "pendiente", "radier"]
        },
        {
            id: "p5_17",
            pregunta: "¿Qué dimensiones mínimas debe tener la escotilla de acceso al estanque?",
            respuesta: "Todos los estanques deberán tener una escotilla de acceso y su dimensión no será inferior a 0,60 METROS LIBRE POR LADO, con tapa cerrada.\n\nEn el caso de accesos horizontales, éstos deberán contar con tapa estanca para evitar la entrada de agua exterior y su borde superior estará a una altura mínima de 0,15 metros respecto del piso.",
            articulo: "Artículo 75º",
            tags: ["estanques", "escotilla", "acceso"]
        },
        {
            id: "p5_18",
            pregunta: "¿Cómo debe ser la ventilación de cada compartimento del estanque?",
            respuesta: "Cada compartimento deberá tener una ventilación cuya área no sea inferior a la de la tubería de succión, con su acceso debidamente protegido contra agentes externos, contaminación y oxidación.\n\nNO PUEDE ventilar hacia la sala de bombas.\n\nEn el caso que se use una tubería vertical, ésta deberá terminar en una U invertida con acceso protegido.",
            articulo: "Artículo 74º",
            tags: ["estanques", "ventilación", "compartimentos"]
        },
        {
            id: "p5_19",
            pregunta: "¿Qué velocidad máxima puede tener la tubería de aspiración del estanque?",
            respuesta: "Cada compartimento tendrá una tubería de aspiración con un diámetro que garantice una velocidad INFERIOR A 2.5 m/s.\n\nEsta tubería contará con coladores de rejilla, cuya área de perforación será igual o superior al de la tubería y de material resistente a la corrosión.",
            articulo: "Artículo 73º",
            tags: ["estanques", "aspiración", "velocidad"]
        },
        {
            id: "p5_20",
            pregunta: "¿Las viviendas unifamiliares necesitan alguna conexión de incendio?",
            respuesta: "Sí. En cada vivienda unifamiliar, vivienda social o inmuebles similares destinados a otros fines y que enfrenten a la red pública, deberán contar a lo menos con UNA LLAVE DE SALIDA con hilo exterior, de un diámetro igual al del arranque de agua potable.",
            articulo: "Artículo 53º - a.f",
            tags: ["vivienda unifamiliar", "incendio", "llave de salida"]
        }
    ]
};

// Exportar globalmente
window.RIDAA_FAQ_PARTE5 = RIDAA_FAQ_PARTE5;
console.log('✅ FAQ RIDAA Parte 5 cargado - 20 preguntas disponibles');