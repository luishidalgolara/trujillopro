/**
 * ============================================
 * PREGUNTAS Y RESPUESTAS - REGLAMENTO PARTE 7
 * Fuente: RIDAA - Construcción, Pruebas y Disposiciones Finales
 * ============================================
 */

const RIDAA_FAQ_PARTE7 = {
    categoria: "Construcción, Pruebas y Disposiciones Finales",
    fuente: "RIDAA - Título VIII-XII y Finales",
    preguntas: [
        {
            id: "p7_01",
            pregunta: "¿A qué profundidad mínima deben quedar enterradas las tuberías de agua potable?",
            respuesta: "Las claves de las tuberías de agua potable que se instalen en los patios, jardines, zona de espacios comunes, y en general al exterior de la vivienda, deben quedar enterradas como MÍNIMO a 50 CENTÍMETROS del nivel superior del terreno.\n\nSe deberá además respetar una distancia mínima de 0.60 metros en arranques y nichos guarda medidor respecto de otros servicios.",
            articulo: "Artículo 102º - a.a",
            tags: ["tuberías", "profundidad", "agua potable", "instalación"]
        },
        {
            id: "p7_02",
            pregunta: "¿Qué distancia mínima debe haber entre tuberías de agua potable y alcantarillado?",
            respuesta: "En la construcción deberá procurarse que la tubería de agua potable quede como MÍNIMO 30 CENTÍMETROS SOBRE la tubería de alcantarillado.\n\nDe no ser posible lo anterior deberán tomarse todos los resguardos pertinentes, consultando tuberías de alcantarillado en material impermeable.",
            articulo: "Artículo 102º - a.c",
            tags: ["separación", "tuberías", "agua potable", "alcantarillado"]
        },
        {
            id: "p7_03",
            pregunta: "¿Qué presión mínima se usa para la prueba hidráulica de agua potable?",
            respuesta: "Toda instalación domiciliaria de agua potable deberá someterse a una prueba de presión hidráulica con las siguientes características:\n\n• Presión mínima de 10 kg/cm² en el punto de mayor cota del tramo probado\n• Duración de la prueba: 10 MINUTOS\n• Durante este tiempo NO debe producirse variación en el manómetro\n\nLa bomba de prueba deberá instalarse siempre en el punto inicial de la alimentación del tramo a probarse.",
            articulo: "Artículo 103º - a y c",
            tags: ["prueba hidráulica", "agua potable", "presión"]
        },
        {
            id: "p7_04",
            pregunta: "¿Cuántas bombas mínimo debe tener una planta elevadora de aguas servidas?",
            respuesta: "La instalación de bombeo deberá contemplar un MÍNIMO DE DOS BOMBAS, provistas de dispositivos de control para funcionar alternadamente, siendo al menos una de ellas de reserva.",
            articulo: "Artículo 96º - b",
            tags: ["bombas", "aguas servidas", "elevación"]
        },
        {
            id: "p7_05",
            pregunta: "¿Cuál es el período de retención máximo para un estanque de aguas servidas?",
            respuesta: "El período de retención MÁXIMO para el estanque de acumulación será de DOCE (12) HORAS.\n\nLos equipos elevadores deberán estar capacitados para evacuar las aguas servidas del estanque en UNA (1) HORA.",
            articulo: "Artículo 96º - f",
            tags: ["estanque", "aguas servidas", "retención"]
        },
        {
            id: "p7_06",
            pregunta: "¿Qué tamaño mínimo debe tener la escotilla de un estanque de aguas servidas?",
            respuesta: "Todos los estanques de acumulación de aguas servidas deberán tener una escotilla de acceso que permita extraer con facilidad los equipos de bombeo.\n\nLa escotilla no podrá tener dimensiones menores que 0,80 METROS LIBRES POR LADO.\n\nSu tapa deberá ser estanca a los líquidos y a los gases.",
            articulo: "Artículo 96º - k",
            tags: ["escotilla", "estanque", "aguas servidas"]
        },
        {
            id: "p7_07",
            pregunta: "¿Qué diámetro mínimo debe tener la tubería de ventilación principal?",
            respuesta: "Se establecerá, a lo menos, una tubería de ventilación principal, de diámetro nominal NO INFERIOR a 75 mm por cada empalme con la red pública.\n\nEsta deberá quedar en el punto más alto de la red de alcantarillado domiciliario.",
            articulo: "Artículo 97º - a",
            tags: ["ventilación", "diámetro", "alcantarillado"]
        },
        {
            id: "p7_08",
            pregunta: "¿A qué distancia máxima puede estar un ramal de inodoro sin ventilación?",
            respuesta: "Se deberán ventilar los ramales de inodoros (WC) que recorran, en planta, MÁS DE 3 METROS antes de llegar a una cámara de inspección o empalme con ventilación.\n\nCualquier otro ramal que recorra más de 7 m debe ventilarse.\n\nExcepción: Los ramales de pileta pueden llegar hasta 15 metros sin ventilación.",
            articulo: "Artículo 97º - b",
            tags: ["ventilación", "ramales", "inodoro", "distancia"]
        },
        {
            id: "p7_09",
            pregunta: "¿A qué altura debe sobresalir la ventilación sobre la techumbre?",
            respuesta: "La ventilación deberá sobresalir:\n\n• 60 cm sobre la techumbre en el punto de salida\n\n• 2,5 m en terrazas ubicadas en el último piso del edificio\n\nLos tramos de avance horizontal en planta, deberán efectuarse siempre en forma ascendente.",
            articulo: "Artículo 97º - k",
            tags: ["ventilación", "altura", "techumbre"]
        },
        {
            id: "p7_10",
            pregunta: "¿Las aguas lluvias pueden ir al alcantarillado de aguas servidas?",
            respuesta: "NO. La disposición de las aguas lluvias del inmueble deberá ser asumida en forma INDEPENDIENTE de las instalaciones domiciliarias de alcantarillado.\n\nEl diseño correspondiente de estas instalaciones deberá resguardar esta disposición.",
            articulo: "Artículo 100º",
            tags: ["aguas lluvias", "independencia", "alcantarillado"]
        },
        {
            id: "p7_11",
            pregunta: "¿Qué pruebas debe pasar una instalación de alcantarillado?",
            respuesta: "Toda instalación domiciliaria de alcantarillado deberá ser sometida a las siguientes pruebas:\n\n1. Prueba hidráulica (1,60 m de presión durante 15 minutos)\n2. Prueba de bola (para tuberías hasta 150 mm)\n3. Prueba de luz (para tuberías sobre 150 mm)\n4. Verificación del asentamiento y pendientes\n5. Segunda prueba hidráulica y de bola/luz\n6. Prueba de humo (5 minutos)\n7. Pruebas de cámaras de inspección",
            articulo: "Artículo 105º",
            tags: ["pruebas", "alcantarillado", "verificación"]
        },
        {
            id: "p7_12",
            pregunta: "¿Qué presión se usa en la prueba hidráulica de alcantarillado?",
            respuesta: "Antes de ser cubiertas las tuberías, se efectuará una prueba de presión hidráulica de 1,60 m de presión sobre la boca de admisión más alta durante un periodo MÍNIMO DE QUINCE MINUTOS.\n\nLas descargas con alturas superiores a dos pisos, se fraccionarán por medio de piezas de registro, con el fin de ejecutar las pruebas con una presión no superior a la altura de estos dos pisos.",
            articulo: "Artículo 105º - a.a y a.b",
            tags: ["prueba hidráulica", "alcantarillado", "presión"]
        },
        {
            id: "p7_13",
            pregunta: "¿Qué es la prueba de bola y cuándo se usa?",
            respuesta: "Es una prueba para tuberías horizontales de hasta 150 mm, cuyo objeto es verificar la existencia de costras en las junturas u otro impedimento interior.\n\nLa bola con que deben efectuarse las pruebas tendrá una tolerancia MÁXIMA de 3 mm con respecto al diámetro de la tubería verificada.\n\nPara tuberías de diámetro superiores a 150 mm, la prueba de bola se sustituye por la prueba de luz.",
            articulo: "Artículo 105º - b",
            tags: ["prueba de bola", "alcantarillado", "verificación"]
        },
        {
            id: "p7_14",
            pregunta: "¿Qué es la prueba de humo y cuándo se realiza?",
            respuesta: "Esta prueba tiene por objeto garantizar la estanqueidad de las junturas y el funcionamiento satisfactorio de los cierres hidráulicos y ventilaciones.\n\nDebe ejecutarse cuando estén totalmente terminados zócalos y pisos, y estén colocados los artefactos en los ramales respectivos.\n\nLa prueba será satisfactoria si durante CINCO MINUTOS no se observa desprendimiento de humo por las junturas, manteniendo una presión suficiente para hacer subir el agua de los sifones en 3 cm.",
            articulo: "Artículo 105º - f",
            tags: ["prueba de humo", "alcantarillado", "estanqueidad"]
        },
        {
            id: "p7_15",
            pregunta: "¿Qué profundidad máxima se puede excavar a tajo abierto?",
            respuesta: "Las excavaciones se harán a tajo abierto hasta una profundidad de 1,5 METROS.\n\nPara profundidades mayores, podrán ejecutarse túneles a los que deberá darse la sección suficiente para permitir el trabajo en condiciones de seguridad adecuadas para el personal.",
            articulo: "Artículo 104º - a.c",
            tags: ["excavación", "profundidad", "seguridad"]
        },
        {
            id: "p7_16",
            pregunta: "¿Cómo se debe rellenar una zanja después de instalar las tuberías?",
            respuesta: "Una vez verificadas las pendientes y efectuadas las pruebas en forma satisfactoria:\n\n1. El relleno debe hacerse con tierra exenta de piedras\n2. Compactado debidamente a ambos costados de la tubería hasta una altura de 0,30 metros\n3. Luego se continuará el relleno por capas de 0,20 metros de espesor compactadas adecuadamente\n\nPara tuberías de PVC, se colocarán sobre una base de arena de 0,10 m de espesor.",
            articulo: "Artículo 104º - d.b y b.e",
            tags: ["relleno", "zanja", "compactación"]
        },
        {
            id: "p7_17",
            pregunta: "¿Qué diámetro mínimo debe tener la tubería de impulsión de aguas servidas con inodoros?",
            respuesta: "Toda planta elevadora a la que descarguen aguas servidas provenientes de inodoros deberán contar con equipos que puedan bombear sólidos mayores de 50 mm.\n\nSus tuberías de impulsión serán de un diámetro interior MÍNIMO de 50 mm.",
            articulo: "Artículo 96º - h",
            tags: ["impulsión", "aguas servidas", "diámetro", "inodoros"]
        },
        {
            id: "p7_18",
            pregunta: "¿Qué pendiente mínima debe tener el piso del estanque de aguas servidas?",
            respuesta: "La superficie interior de los estanques será lisa, impermeable y el piso tendrá una pendiente MÍNIMA de un 3% hacia el punto de succión de los equipos de elevación.\n\nEn estanques de hormigón armado el recubrimiento de las armaduras de las superficies en contacto con el agua no será inferior a 2 cm.",
            articulo: "Artículo 96º - i",
            tags: ["estanque", "pendiente", "aguas servidas"]
        },
        {
            id: "p7_19",
            pregunta: "¿Cuándo entró en vigencia este reglamento?",
            respuesta: "El Reglamento entró en vigencia a contar de 120 DÍAS después de su publicación en el Diario Oficial.\n\nFecha de publicación: 28.01.2003\nFecha de promulgación: 25.01.2002\n\nEste reglamento derogó los DS Minvu Nº 267 de 1980 y DS MOP Nº 70 de 1981.",
            articulo: "Artículo transitorio primero y Artículo 107º",
            tags: ["vigencia", "historia", "reglamento"]
        },
        {
            id: "p7_20",
            pregunta: "¿Todos los plazos de días en el reglamento son corridos o hábiles?",
            respuesta: "Todos los plazos de días que establece este Reglamento se entenderán de DÍAS HÁBILES, en los términos establecidos por el artículo 25 de la Ley 19.880.",
            articulo: "Artículo 108º",
            tags: ["plazos", "días hábiles", "procedimientos"]
        }
    ]
};

// Exportar globalmente
window.RIDAA_FAQ_PARTE7 = RIDAA_FAQ_PARTE7;
console.log('✅ FAQ RIDAA Parte 7 cargado - 20 preguntas disponibles');