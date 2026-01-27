/**
 * ============================================
 * PREGUNTAS Y RESPUESTAS - REGLAMENTO PARTE 3
 * Fuente: RIDAA - Título V y Segunda Parte (Normas Técnicas)
 * ============================================
 */

const RIDAA_FAQ_PARTE3 = {
    categoria: "Instaladores y Normas Técnicas",
    fuente: "RIDAA - Título V y Segunda Parte",
    preguntas: [
        {
            id: "p3_01",
            pregunta: "¿Quiénes pueden ejecutar instalaciones domiciliarias de agua potable y alcantarillado?",
            respuesta: "Las instalaciones domiciliarias serán proyectadas y ejecutadas por los profesionales de la construcción habilitados legalmente.\n\nTambién podrán intervenir en el ámbito de la construcción, los profesionales y técnicos especialistas dentro de su área específica de conocimientos, en las materias que legalmente no correspondan en forma exclusiva a determinados profesionales.\n\nEsta calidad de profesional o técnico especialista se acreditará mediante certificados expedidos por las entidades o Institutos profesionales reconocidos por el Estado.",
            articulo: "Artículo 33º",
            tags: ["instaladores", "profesionales", "habilitación"]
        },
        {
            id: "p3_02",
            pregunta: "¿Qué pasa con los especialistas que ya tienen carné de la Superintendencia?",
            respuesta: "Aquellos especialistas que a la fecha de entrada en vigencia de este Reglamento, estén en posesión de un carné otorgado por la Superintendencia, mantendrán las habilitaciones reconocidas en dicho carné.",
            articulo: "Artículo 34º",
            tags: ["carné", "habilitación", "especialistas"]
        },
        {
            id: "p3_03",
            pregunta: "¿Qué responsabilidades tiene el especialista que infrinja el reglamento?",
            respuesta: "El especialista que durante el desempeño de sus actividades infrinja las disposiciones de este Reglamento, incurrirá en las responsabilidades civiles y penales que correspondan.",
            articulo: "Artículo 35º",
            tags: ["responsabilidades", "infracciones", "sanciones"]
        },
        {
            id: "p3_04",
            pregunta: "¿Puedo ejecutar la conexión o empalme a las redes públicas por mi cuenta?",
            respuesta: "Para que el propietario del inmueble proceda a ejecutar la conexión o empalme a las redes públicas en uso, se requerirá la aprobación y verificación del prestador.\n\nTales obras se ejecutarán por los profesionales habilitados según el reglamento.",
            articulo: "Artículo 36º",
            tags: ["conexión", "empalme", "aprobación"]
        },
        {
            id: "p3_05",
            pregunta: "¿Qué se debe privilegiar en las instalaciones de alcantarillado?",
            respuesta: "En las instalaciones domiciliarias de alcantarillado se debe privilegiar aquellas soluciones técnicas que permitan el desagüe gravitacional de las aguas servidas domiciliarias.",
            articulo: "Artículo 37º",
            tags: ["alcantarillado", "desagüe gravitacional", "diseño"]
        },
        {
            id: "p3_06",
            pregunta: "¿Qué necesito si mis instalaciones deben pasar por propiedad ajena?",
            respuesta: "Cuando para los efectos de empalmar a la red pública las instalaciones domiciliarias de alcantarillado de una propiedad, sea ineludible el paso de las instalaciones por predios de otros propietarios, deberá estar constituida la servidumbre correspondiente, de acuerdo con la legislación vigente.",
            articulo: "Artículo 37º",
            tags: ["servidumbre", "alcantarillado", "predios"]
        },
        {
            id: "p3_07",
            pregunta: "¿Puedo usar un arranque de agua potable para varios inmuebles?",
            respuesta: "NO. Se prohíbe proyectar y construir arranques de agua potable para abastecer a más de un inmueble e igualmente uniones domiciliarias de alcantarillado que sirvan a dos o más inmuebles.\n\nSe exceptúan de esta regla los casos expresamente autorizados por la ley y los calificados por el prestador como comunidades de desagüe y servidumbres de acueducto.",
            articulo: "Artículo 38º",
            tags: ["arranque", "prohibiciones", "múltiples inmuebles"]
        },
        {
            id: "p3_08",
            pregunta: "¿Puedo combinar agua potable de red pública con fuente particular (pozo)?",
            respuesta: "Sí, pero con condiciones. En caso que un inmueble se abastezca simultáneamente de agua potable desde una red pública y desde una fuente particular, la instalación domiciliaria deberá asegurar la TOTAL INDEPENDENCIA de ambos sistemas de abastecimiento.\n\nEs admisible únicamente que las aguas puedan mezclarse posteriormente en un estanque de acumulación sin presión.",
            articulo: "Artículo 39º",
            tags: ["fuente particular", "agua potable", "sistemas mixtos"]
        },
        {
            id: "p3_09",
            pregunta: "¿Puedo instalar un sistema particular de agua potable o alcantarillado en zona urbana?",
            respuesta: "Dentro del territorio operacional de las concesionarias sanitarias NO serán admisibles sistemas particulares de abastecimiento de agua potable destinada al consumo humano ni sistemas particulares de alcantarillado o de disposición de aguas servidas domésticas, SALVO que no existan redes públicas enfrente de la respectiva propiedad.\n\nEn caso que en un sector no exista red de agua potable o de alcantarillado sólo se aceptarán soluciones particulares individuales y sólo para sitios preexistentes, que deben ser aprobadas por la autoridad de salud.\n\nNO se aceptarán soluciones particulares para dar solución a subdivisiones de terrenos dentro del área urbana.",
            articulo: "Artículo 39º",
            tags: ["sistemas particulares", "zona urbana", "restricciones"]
        },
        {
            id: "p3_10",
            pregunta: "¿Qué es una Unidad de Equivalencia Hidráulica (UEH)?",
            respuesta: "Es un concepto probabilístico, en términos del cual se cuantifica la contribución de gasto al sistema de tuberías de la instalación domiciliaria de alcantarillado, de cada uno de los artefactos instalados, expresado en una determinada escala.",
            articulo: "Artículo 40º - definición l",
            tags: ["definiciones", "UEH", "alcantarillado"]
        },
        {
            id: "p3_11",
            pregunta: "¿Qué es el Gasto Máximo Probable (QMP)?",
            respuesta: "Es un concepto probabilístico mediante el cual se cuantifica el máximo caudal con el que deben diseñarse las instalaciones de agua potable de inmuebles que tienen una determinada característica de consumo.",
            articulo: "Artículo 40º - definición c",
            tags: ["definiciones", "QMP", "agua potable", "diseño"]
        },
        {
            id: "p3_12",
            pregunta: "¿Qué es un cierre hidráulico?",
            respuesta: "Accesorio o aparato diseñado y construido de manera de proporcionar, cuando es adecuadamente ventilado, un sello líquido que previene el retroceso de los gases, sin afectar el flujo de las aguas servidas que escurren a través de él.",
            articulo: "Artículo 40º - definición d",
            tags: ["definiciones", "cierre hidráulico", "ventilación"]
        },
        {
            id: "p3_13",
            pregunta: "¿Qué es la tubería de descarga?",
            respuesta: "Es la canalización de bajada vertical a la que empalman los ramales, destinada a la conducción de las aguas servidas domésticas.",
            articulo: "Artículo 40º - definición h",
            tags: ["definiciones", "tubería", "alcantarillado"]
        },
        {
            id: "p3_14",
            pregunta: "¿Qué es la ventilación en alcantarillado?",
            respuesta: "Tubería o sistema de tuberías instaladas para proveer un flujo de aire hacia y desde el sistema de alcantarillado o para proporcionar una circulación de aire dentro del sistema a objeto de proteger los cierres hidráulicos de sifonaje.",
            articulo: "Artículo 40º - definición m",
            tags: ["definiciones", "ventilación", "alcantarillado"]
        },
        {
            id: "p3_15",
            pregunta: "¿Los materiales de instalaciones deben estar certificados?",
            respuesta: "SÍ. Los materiales, artefactos, componentes, equipos y sistemas utilizados en las instalaciones domiciliarias de agua potable y alcantarillado deberán ser autorizados por la Superintendencia.\n\nDeberán cumplir con los procedimientos de certificación de calidad dispuestos por la Superintendencia y realizados por organismos acreditados en el Sistema Nacional de Acreditación del Instituto Nacional de Normalización (INN).",
            articulo: "Artículo 42º",
            tags: ["certificación", "materiales", "calidad"]
        },
        {
            id: "p3_16",
            pregunta: "¿Qué pasa si no existe norma chilena para un producto?",
            respuesta: "Si no existe Norma Chilena, el fabricante o importador puede:\n\na) Solicitar el estudio y elaboración de una norma chilena oficial al INN.\n\nb) Certificar según norma extranjera aceptada por la Superintendencia (autorización provisoria).\n\nc) Presentar especificaciones técnicas para aprobación de la Superintendencia (autorización provisoria).\n\nEn caso de autorización provisoria, tendrá plazo de 12 meses para tramitar la Norma Chilena Oficial.",
            articulo: "Artículo 43º - b",
            tags: ["certificación", "normas", "productos"]
        },
        {
            id: "p3_17",
            pregunta: "¿Cuánto tiempo dura la autorización de un producto?",
            respuesta: "En todos los casos, la autorización del producto permanecerá vigente mientras no varíen las condiciones que justificaron su aprobación.",
            articulo: "Artículo 43º",
            tags: ["autorización", "productos", "vigencia"]
        },
        {
            id: "p3_18",
            pregunta: "¿Dónde puedo consultar la lista de productos autorizados?",
            respuesta: "La Superintendencia mantendrá una nómina actualizada de los fabricantes e importadores de materiales, artefactos, componentes, equipos y sistemas utilizados en instalaciones domiciliarias de agua potable y de alcantarillado, con indicación de los productos, las normas o especificaciones técnicas por las que se rige su fabricación y los procedimientos de certificación.",
            articulo: "Artículo 44º",
            tags: ["productos autorizados", "superintendencia", "consulta"]
        },
        {
            id: "p3_19",
            pregunta: "¿Cuándo debe certificarse un material o producto?",
            respuesta: "Los materiales y los productos que se emplean en las instalaciones domiciliarias serán certificados en su calidad por los organismos de certificación acreditados ante el INN.\n\nTal certificación deberá otorgarse previamente ANTES de la comercialización de dichos materiales y productos.",
            articulo: "Artículo 45º",
            tags: ["certificación", "comercialización", "materiales"]
        },
        {
            id: "p3_20",
            pregunta: "¿Se pueden aplicar las normas técnicas de forma gradual?",
            respuesta: "Sí. Por razones técnicas, económicas o geográficas, la Superintendencia podrá resolver fundadamente la aplicación gradual de las normas técnicas relativas a la prestación de los servicios y las instalaciones domiciliarias.",
            articulo: "Artículo 46º",
            tags: ["normas técnicas", "aplicación gradual", "superintendencia"]
        }
    ]
};

// Exportar globalmente
window.RIDAA_FAQ_PARTE3 = RIDAA_FAQ_PARTE3;
console.log('✅ FAQ RIDAA Parte 3 cargado - 20 preguntas disponibles');
