// ============================================================
// PREGUNTAS Y RESPUESTAS - ARCHIVO 02
// NCh Elec 4/2003 - Exigencias Generales y Tableros
// ============================================================

const preguntasRespuestas_02 = {
    categoria: "EXIGENCIAS GENERALES Y TABLEROS ELÉCTRICOS",
    
    preguntas: [
        {
            id: "02_001",
            pregunta: "¿Quién puede proyectar y ejecutar una instalación eléctrica?",
            respuesta: "Toda instalación de consumo debe ser proyectada y ejecutada bajo la supervisión directa de un Instalador Electricista autorizado con la categoría correspondiente según el D.S. Nº 92 de 1983. No puede ser realizada por cualquier persona.",
            keywords: ["instalador", "electricista", "autorizado", "categoría"],
            seccion: "5.0.3"
        },
        {
            id: "02_002",
            pregunta: "¿Dónde debe ubicarse el medidor de luz en una casa?",
            respuesta: "El medidor debe ubicarse dentro de un semicírculo de radio máximo 15 metros, con centro en la puerta de acceso desde la vía pública. Si la fachada está dentro de esta zona, se monta ahí; si no, se ubica cerca de la línea de cierre en una estructura especial.",
            keywords: ["medidor", "15 metros", "ubicación", "empalme"],
            seccion: "5.1.4"
        },
        {
            id: "02_003",
            pregunta: "¿A qué altura se instalan las cajas de empalme?",
            respuesta: "El borde inferior de ninguna caja debe estar a menos de 0.80m del piso terminado, y el borde superior de ninguna debe superar los 2.10m de altura. Esto facilita la lectura y el mantenimiento.",
            keywords: ["altura", "caja", "empalme", "0.80m", "2.10m"],
            seccion: "5.1.7"
        },
        {
            id: "02_004",
            pregunta: "¿Qué es un subsistema de distribución?",
            respuesta: "Es una red eléctrica privada construida dentro de un edificio o condominio, administrada por la comunidad, que permite comprar energía en bloque y distribuirla a cada departamento. Debe ser aprobada por la SEC y ofrece ventajas económicas.",
            keywords: ["subsistema", "distribución", "condominio", "comunidad"],
            seccion: "5.2.2"
        },
        {
            id: "02_005",
            pregunta: "¿Cuáles son las tensiones nominales en Chile para instalaciones domiciliarias?",
            respuesta: "Las tensiones nominales para instalaciones de consumo en baja tensión son: 380/220V (la más común), 500V y 660V, según la norma NSEC 8 En.75. La tensión 220V es monofásica y 380V es trifásica.",
            keywords: ["tensión", "220v", "380v", "nominal", "voltaje"],
            seccion: "5.3.1.3"
        },
        {
            id: "02_006",
            pregunta: "¿Qué frecuencia eléctrica se usa en Chile?",
            respuesta: "Todos los materiales y equipos deben ser aptos para funcionar a una frecuencia nominal de 50 Hz (50 ciclos por segundo). Esta es la frecuencia estándar en Chile para corriente alterna.",
            keywords: ["frecuencia", "50hz", "hertz", "ciclos"],
            seccion: "5.3.2.2"
        },
        {
            id: "02_007",
            pregunta: "¿Qué temperatura máxima ambiente considera la norma?",
            respuesta: "La norma considera temperaturas ambiente entre -10°C y 35°C, con una media diaria anual no superior a 25°C. Si se exceden estos límites, se deben aplicar factores de corrección especiales para dimensionar conductores y equipos.",
            keywords: ["temperatura", "35°c", "-10°c", "ambiente"],
            seccion: "5.4.1.1"
        },
        {
            id: "02_008",
            pregunta: "¿Qué es la zona de alta contaminación salina?",
            respuesta: "Es la franja costera de 10 km de ancho medidos desde el borde del mar. En esta zona se deben usar equipos y materiales con protección especial contra la corrosión por el aire salino, como gabinetes con pintura anticorrosiva o de acero inoxidable.",
            keywords: ["contaminación", "salina", "costa", "10km", "corrosión"],
            seccion: "5.4.1.4"
        },
        {
            id: "02_009",
            pregunta: "¿Todos los materiales eléctricos necesitan certificación?",
            respuesta: "SÍ. Todos los materiales y equipos usados en instalaciones eléctricas deben contar con certificación otorgada por una entidad autorizada según la Ley 18.410. Sin certificación, no se pueden usar ni aprobar las instalaciones.",
            keywords: ["certificación", "aprobado", "sec", "materiales"],
            seccion: "5.4.2.1"
        },
        {
            id: "02_010",
            pregunta: "¿Qué significa grado de protección IP?",
            respuesta: "IP (Ingress Protection) indica el nivel de protección de un equipo contra ingreso de sólidos y líquidos. Por ejemplo: IPX2 (goteo), IPX3 (lluvia), IPX4 (salpicaduras), IP5X (polvo), IPX7 (inmersión). Es según norma IEC 529.",
            keywords: ["ip", "protección", "agua", "polvo", "grado"],
            seccion: "5.4.2.4 y Apéndice 1"
        },
        {
            id: "02_011",
            pregunta: "¿Qué material de conductor se usa en Chile?",
            respuesta: "La norma establece que los conductores deben ser de COBRE. El uso de otro material (como aluminio) debe ser consultado y autorizado específicamente por la SEC, quien fijará las condiciones de uso.",
            keywords: ["cobre", "conductor", "material", "cable"],
            seccion: "5.4.3.1"
        },
        {
            id: "02_012",
            pregunta: "¿Cómo se unen los conductores entre sí?",
            respuesta: "Las uniones pueden hacerse mediante: soldadura estaño-plomo (bajo punto fusión), soldadura exotérmica (alto punto fusión), conectores empernados (baja compresión) o conectores hidráulicos (alta compresión). Deben quedar mecánicamente resistentes y bien aisladas.",
            keywords: ["unión", "derivación", "soldadura", "conector"],
            seccion: "5.4.3.2"
        },
        {
            id: "02_013",
            pregunta: "¿Qué es la zona alcanzable por una persona?",
            respuesta: "Es el área donde una persona puede tocar medida desde donde se sitúa: 2.50m hacia arriba, 1.0m lateralmente y 1.0m hacia abajo. Esta zona define las distancias de seguridad para partes energizadas.",
            keywords: ["zona alcanzable", "2.50m", "seguridad", "distancia"],
            seccion: "5.4.4.1"
        },
        {
            id: "02_014",
            pregunta: "¿Cuánto espacio libre se necesita frente a un tablero eléctrico?",
            respuesta: "Si hay partes energizadas descubiertas en la parte frontal de un tablero, se necesita un espacio de trabajo libre mínimo de 1.50m. Esto permite operar, inspeccionar y mantener el tablero de forma segura.",
            keywords: ["espacio", "tablero", "1.50m", "trabajo"],
            seccion: "5.4.4.3"
        },
        {
            id: "02_015",
            pregunta: "¿Qué es un tablero eléctrico?",
            respuesta: "Es un equipo que concentra dispositivos de protección y maniobra (disyuntores, diferenciales) desde donde se puede proteger y operar toda la instalación o parte de ella. Es el centro de control y seguridad de la instalación eléctrica.",
            keywords: ["tablero", "protección", "disyuntor", "comando"],
            seccion: "6.0.1"
        },
        {
            id: "02_016",
            pregunta: "¿Qué es un tablero general?",
            respuesta: "Es el tablero principal de la instalación donde están los dispositivos que protegen los alimentadores y permiten operar sobre toda la instalación en forma conjunta o fraccionada. Es el primer nivel de protección después del medidor.",
            keywords: ["tablero general", "principal", "alimentador"],
            seccion: "6.1.1.1"
        },
        {
            id: "02_017",
            pregunta: "¿Qué es un tablero de distribución?",
            respuesta: "Es el tablero que contiene las protecciones de los circuitos finales (iluminación, enchufes). Puede alimentarse desde el tablero general o directamente del empalme. Es el tablero más cercano a los usuarios.",
            keywords: ["tablero distribución", "circuitos", "enchufes"],
            seccion: "6.1.1.3"
        },
        {
            id: "02_018",
            pregunta: "¿Qué debe tener todo tablero eléctrico?",
            respuesta: "Debe tener: cubierta cubre-equipos (protege contra contacto con partes energizadas), puerta exterior con chapa, estar marcado con marca de fabricación, tensión de servicio, corriente nominal y número de fases. Todo visible, legible e indeleble.",
            keywords: ["tablero", "cubierta", "puerta", "marcado"],
            seccion: "6.2.1.3 y 6.0.4"
        },
        {
            id: "02_019",
            pregunta: "¿De qué material se construyen los tableros?",
            respuesta: "Los tableros pueden ser de acero (con tratamiento anticorrosivo) o materiales no metálicos. Los materiales deben ser resistentes al fuego, autoextinguentes, no higroscópicos y resistentes a la corrosión.",
            keywords: ["material", "tablero", "acero", "no metálico"],
            seccion: "6.2.1.2"
        },
        {
            id: "02_020",
            pregunta: "¿Qué espesor mínimo debe tener la plancha de un tablero metálico?",
            respuesta: "Según la tabla 6.2 de la norma, el espesor mínimo de las placas de acero depende del tamaño del tablero. Generalmente entre 1.5mm y 2.0mm para tableros domiciliarios estándar. Ver tabla específica para cada dimensión.",
            keywords: ["espesor", "plancha", "acero", "tablero"],
            seccion: "6.2.1.11 - Tabla 6.2"
        }
    ]
};

// Exportar para uso en el asistente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = preguntasRespuestas_02;
}

console.log('✅ Archivo 02 - Exigencias Generales y Tableros cargado: ' + preguntasRespuestas_02.preguntas.length + ' preguntas');