/**
 * ============================================
 * PREGUNTAS Y RESPUESTAS - REGLAMENTO PARTE 6
 * Fuente: RIDAA - Elevación de Agua y Diseño de Alcantarillado
 * ============================================
 */

const RIDAA_FAQ_PARTE6 = {
    categoria: "Elevación de Agua y Alcantarillado",
    fuente: "RIDAA - Título VI y VII (Segunda Parte)",
    preguntas: [
        {
            id: "p6_01",
            pregunta: "¿Cuándo debo instalar un sistema de elevación de agua potable?",
            respuesta: "En las edificaciones en que, por su condición topográfica o de diseño, la presión informada por el prestador en el Certificado de Factibilidad no garantice un adecuado y permanente abastecimiento de agua potable desde la red pública a todos los pisos, deberá proyectarse y construirse un sistema de elevación de agua.\n\nCuando se proyecten sistemas de elevación, TODAS las instalaciones interiores deberán abastecerse desde estos sistemas, salvo aquellas que normalmente cuenten con presión suficiente sin requerir elevación.",
            articulo: "Artículo 80º",
            tags: ["elevación", "agua potable", "sistemas de bombeo"]
        },
        {
            id: "p6_02",
            pregunta: "¿Los equipos de bombeo pueden succionar directamente desde la red pública?",
            respuesta: "NO. Los equipos de bombeo se surtirán desde un depósito especial o estanque de acumulación sin presión, NO PUDIENDO hacerlo directamente desde la red pública.\n\nTampoco se permite el uso de una tubería de derivación (by pass).",
            articulo: "Artículo 81º",
            tags: ["bombeo", "estanque", "prohibiciones"]
        },
        {
            id: "p6_03",
            pregunta: "¿Dónde debe ubicarse la sala de bombas?",
            respuesta: "Toda sala de bombas deberá situarse en sitios construidos en forma AISLADA a la estructura del edificio, con el fin de evitar la transmisión de vibraciones o ruidos a los usuarios.\n\nEn especial NO deberá estar inmediata a:\n• Cajas de escalas\n• Ascensores\n• Ventanas\n• Shaft\n\nLa distancia debe ser tal que los ruidos y vibraciones generados no sean molestos.",
            articulo: "Artículo 82º",
            tags: ["sala de bombas", "ubicación", "ruidos"]
        },
        {
            id: "p6_04",
            pregunta: "¿Qué altura mínima debe tener la sala de bombas?",
            respuesta: "La altura de la sala de bombas deberá ser a lo menos de DOS METROS (2 m), medidos desde el nivel de piso terminado hasta el cielo.\n\nEl espacio libre alrededor de las bombas y equipos adyacentes garantizará una fácil remoción o reparación de ellos, con un mínimo de 0,25 metros.\n\nEl acceso a la sala debe tener un ancho mínimo de 1 m.",
            articulo: "Artículo 82º",
            tags: ["sala de bombas", "dimensiones", "altura"]
        },
        {
            id: "p6_05",
            pregunta: "¿Qué pendiente debe tener el piso de la sala de bombas?",
            respuesta: "El piso de la sala de bombas tendrá una pendiente MÍNIMA de un 1% hacia canaletas recolectoras de desagües o filtraciones.\n\nLas canaletas descargarán a:\n• Pozos absorbentes, O\n• Pozos acumuladores provistos con bomba sentina\n\nAmbos diseñados de acuerdo con las descargas máximas que recibirán.\n\nTodos los paramentos internos serán lisos e impermeables.",
            articulo: "Artículo 82º",
            tags: ["sala de bombas", "pendiente", "desagües"]
        },
        {
            id: "p6_06",
            pregunta: "¿Qué ventilación debe tener la sala de bombas?",
            respuesta: "Las salas deberán contar a lo menos con DOS VENTILACIONES ubicadas en los extremos superiores opuestos, con rejillas de protección.\n\nCada ventilación tendrá un área que dependerá de las características de la bomba, NO SIENDO INFERIOR A 300 cm² cada una, u otro diseño que mantenga los equipos libres de humedad.",
            articulo: "Artículo 83º",
            tags: ["sala de bombas", "ventilación", "área"]
        },
        {
            id: "p6_07",
            pregunta: "¿A qué altura sobre el piso deben instalarse los equipos de bombeo?",
            respuesta: "Los equipos deberán instalarse sobre fundaciones con elementos adecuados para absorber vibraciones, con una altura MÍNIMA de 0,10 METROS sobre el nivel del piso hasta la base de los equipos.",
            articulo: "Artículo 83º",
            tags: ["equipos de bombeo", "instalación", "altura"]
        },
        {
            id: "p6_08",
            pregunta: "¿Cuántos equipos de bombeo debo tener?",
            respuesta: "Toda instalación de equipos de bombeo deberá considerar a lo menos UN EQUIPO DE RESERVA de capacidad igual al mayor de los equipos básicos.\n\nTambién se deben considerar en los casos necesarios, la alternativa de conexión a una fuente eléctrica de respaldo.",
            articulo: "Artículo 84º - a",
            tags: ["equipos de bombeo", "reserva", "redundancia"]
        },
        {
            id: "p6_09",
            pregunta: "¿Qué válvulas debe tener cada motobomba?",
            respuesta: "Cada motobomba deberá contar con:\n\n• Válvulas de corte en la succión\n• Válvulas de corte en la impulsión\n• Una válvula de retención en la impulsión (obligatorio)\n\nEn la tubería de impulsión general, previo a la salida de la sala de bombas, deberá instalarse una válvula de corte y antes de ella, una válvula que permita el desagüe de la impulsión.",
            articulo: "Artículo 84º - d y e",
            tags: ["motobomba", "válvulas", "equipos"]
        },
        {
            id: "p6_10",
            pregunta: "¿Qué controles debe tener el sistema de bombeo?",
            respuesta: "Para la operación del sistema, se dispondrá de:\n\n• Controles AUTOMÁTICOS (interruptores y alternadores) para garantizar el funcionamiento alternativo de las unidades de bombeo, incluyendo el equipo de reserva\n\n• Controles MANUALES que permitan la operación de a lo menos un equipo, en caso de fallas de los sistemas automáticos\n\n• Controles que detengan las bombas al estar el nivel de agua a 0,10 metros sobre el nivel del chupador (protección de vacío)",
            articulo: "Artículo 84º - i y j",
            tags: ["controles", "bombeo", "automatización"]
        },
        {
            id: "p6_11",
            pregunta: "¿Cuál es la variación máxima de presión entre partida y detención del sistema?",
            respuesta: "Para que el suministro se realice a una presión estable, la presión de detención del sistema tendrá una variación MÁXIMA con relación a la presión de partida de 12 m.c.a.",
            articulo: "Artículo 84º - k",
            tags: ["presión", "bombeo", "variación"]
        },
        {
            id: "p6_12",
            pregunta: "¿Se pueden usar trituradores de desperdicios en las viviendas?",
            respuesta: "NO. En ningún caso podrá aceptarse el uso de trituradores de desperdicios en las viviendas.",
            articulo: "Artículo 86º",
            tags: ["trituradores", "prohibiciones", "alcantarillado"]
        },
        {
            id: "p6_13",
            pregunta: "¿Cuál es el diámetro mínimo de la unión domiciliaria de alcantarillado?",
            respuesta: "El diámetro mínimo nominal de la unión domiciliaria será de 100 mm.\n\nNo podrá haber disminución de diámetros, aguas abajo del sistema, aunque haya fuerte aumento de la pendiente.",
            articulo: "Artículo 87º",
            tags: ["diámetro", "unión domiciliaria", "alcantarillado"]
        },
        {
            id: "p6_14",
            pregunta: "¿Qué pendiente deben tener las tuberías de alcantarillado?",
            respuesta: "La pendiente de diseño de las tuberías que conduzcan materias fecales o grasosas, podrá fluctuar entre un 3% y un 15%.\n\nSin embargo, se podrá considerar una pendiente MÍNIMA de hasta un 1%, en aquellas tuberías ubicadas en losas o en otros casos especiales, debidamente justificados.\n\nLa pendiente de la unión domiciliaria podrá estar comprendida entre un 3% y un 33%, salvo casos especiales cuyo valor mínimo será de un 1%.",
            articulo: "Artículo 88º",
            tags: ["pendiente", "alcantarillado", "diseño"]
        },
        {
            id: "p6_15",
            pregunta: "¿Qué es un cierre hidráulico y cuál es su carga mínima?",
            respuesta: "Toda boca de admisión tendrá un cierre hidráulico o sifón con carga MÍNIMA de 50 mm que evite por completo la salida de gases, u otro dispositivo que cumpla con dicha función.\n\nLas tuberías deberán ser impermeables a los gases y líquidos.",
            articulo: "Artículo 89º",
            tags: ["cierre hidráulico", "sifón", "gases"]
        },
        {
            id: "p6_16",
            pregunta: "¿Dónde debe ubicarse la cámara domiciliaria?",
            respuesta: "Deberá proyectarse una cámara domiciliaria al interior del inmueble, conforme a la norma chilena NCh 2592, a una distancia NO MAYOR de 1 m de la línea oficial de cierre y en lugar accesible.\n\nExcepcionalmente, la autoridad competente puede autorizar distancias mayores a 1 m técnicamente justificadas.\n\nSi la distancia entre esta cámara y el colector público excede los 20 m, deberá proyectarse obligatoriamente una cámara adicional en la vía pública.",
            articulo: "Artículo 91º",
            tags: ["cámara domiciliaria", "ubicación", "alcantarillado"]
        },
        {
            id: "p6_17",
            pregunta: "¿Qué ángulo máximo pueden formar los ramales en las cámaras?",
            respuesta: "El ángulo suplementario que formen los ejes de los ramales será el más pequeño posible y en ningún caso mayor de 120°, salvo caída.\n\nToda excepción a esta disposición deberá ser adecuadamente justificada.\n\nLa confluencia de los ramales y cambios de dirección o pendiente se efectuará mediante cámaras de inspección.",
            articulo: "Artículo 92º",
            tags: ["ramales", "ángulo", "cámaras"]
        },
        {
            id: "p6_18",
            pregunta: "¿Cuál es la distancia máxima entre cámaras de inspección?",
            respuesta: "La distancia entre cámaras interiores podrá ser, como máximo:\n\n• 30 m para tuberías de 100 mm de diámetro\n• 50 m para diámetros de 150 mm o más\n\nLas cámaras de inspección domiciliarias se ubicarán en patios o sitios completamente ventilados.\n\nNo se aceptará instalar cámaras muebles o colgantes, las que se reemplazarán por registros.",
            articulo: "Artículo 92º",
            tags: ["cámaras", "distancia", "alcantarillado"]
        },
        {
            id: "p6_19",
            pregunta: "¿Cada cuántos pisos debo colocar registros en edificios de altura?",
            respuesta: "En instalaciones de edificios de TRES O MÁS PISOS en altura, se colocarán registros en todos aquellos puntos que sea necesario para la accesibilidad y prueba de los conductos.\n\nEn las tuberías de descarga, estos registros se establecerán, como MÍNIMO, CADA DOS PISOS.",
            articulo: "Artículo 93º",
            tags: ["registros", "edificios", "altura"]
        },
        {
            id: "p6_20",
            pregunta: "¿Qué manual debe entregar el contratista al propietario del sistema de elevación?",
            respuesta: "El contratista deberá entregar al propietario un manual con instrucciones de:\n\n• Operación\n• Control\n• Seguridad del sistema de elevación de aguas\n\nLas características, tipo, detalles y disposición total de la instalación y sus obras complementarias, deberán quedar claramente establecidos en los planos.",
            articulo: "Artículo 84º - ñ y n",
            tags: ["manual", "contratista", "elevación"]
        }
    ]
};

// Exportar globalmente
window.RIDAA_FAQ_PARTE6 = RIDAA_FAQ_PARTE6;
console.log('✅ FAQ RIDAA Parte 6 cargado - 20 preguntas disponibles');