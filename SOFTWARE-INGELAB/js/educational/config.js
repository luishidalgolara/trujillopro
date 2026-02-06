/**
 * CONFIGURACIÓN DE CONTENIDO EDUCATIVO
 * Textos informativos para cada componente estructural
 */

const EDUCATIONAL_CONTENT = {
    // FUNDACIONES Y CIMIENTOS
    'fundacion': {
        name: 'Fundación o Cimiento',
        icon: '🏗️',
        color: '#8B4513',
        what: `La fundación o cimiento es el elemento estructural que transmite las cargas del edificio al suelo. 
        Es la base sobre la cual se construye toda la estructura y debe ser diseñada para distribuir uniformemente 
        el peso del edificio sobre el terreno, evitando asentamientos diferenciales que podrían causar grietas o colapsos.`,
        
        how: `<strong>Proceso de construcción:</strong><br><br>
        1. <strong>Excavación:</strong> Se excava el terreno según el diseño estructural, alcanzando la profundidad necesaria 
        donde el suelo tiene la capacidad portante adecuada.<br><br>
        
        2. <strong>Nivelación y compactación:</strong> Se nivela el fondo de la excavación y se compacta el suelo para 
        aumentar su resistencia.<br><br>
        
        3. <strong>Cama de apoyo:</strong> Se coloca una capa de ripio o gravilla compactada (10-15 cm) que sirve como 
        base de trabajo y ayuda al drenaje.<br><br>
        
        4. <strong>Enfierradura:</strong> Se instala la armadura de acero (fierros) según el diseño estructural. 
        Generalmente incluye fierros longitudinales y estribos que forman una parrilla tridimensional.<br><br>
        
        5. <strong>Hormigonado:</strong> Se vierte hormigón de calidad especificada (H20, H25 o superior) y se vibra 
        para eliminar burbujas de aire y asegurar una buena compactación.<br><br>
        
        6. <strong>Curado:</strong> Se mantiene húmedo el hormigón durante al menos 7 días para lograr la resistencia 
        óptima del concreto.`,
        
        purpose: `<strong>Funciones principales:</strong><br><br>
        • <strong>Transmisión de cargas:</strong> Transfiere el peso del edificio (cargas muertas y vivas) al suelo 
        de manera uniforme y segura.<br><br>
        
        • <strong>Estabilidad:</strong> Proporciona una base estable que evita asentamientos, volcamientos o deslizamientos 
        del edificio.<br><br>
        
        • <strong>Distribución de esfuerzos:</strong> Distribuye las cargas concentradas de columnas sobre un área mayor 
        del suelo, reduciendo la presión sobre el terreno.<br><br>
        
        • <strong>Anclaje:</strong> Ancla la estructura al suelo, resistiendo fuerzas laterales como viento o sismo.<br><br>
        
        • <strong>Nivelación:</strong> Compensa irregularidades del terreno y proporciona una superficie nivelada para 
        iniciar la construcción de la superestructura.`
    },

    'columna': {
        name: 'Columna',
        icon: '🏛️',
        color: '#607D8B',
        what: `Las columnas son elementos estructurales verticales que reciben las cargas de las vigas y losas superiores 
        y las transmiten hacia la fundación. Son componentes fundamentales del sistema estructural de un edificio, 
        trabajando principalmente a compresión, aunque también pueden estar sometidas a flexión en caso de sismos o 
        cargas laterales.`,
        
        how: `<strong>Proceso de construcción:</strong><br><br>
        1. <strong>Replanteo:</strong> Se marca la ubicación exacta de la columna según los planos estructurales, 
        verificando ejes y dimensiones.<br><br>
        
        2. <strong>Armado de enfierradura:</strong> Se ensamblan los fierros longitudinales (barras verticales) con 
        los estribos (amarras horizontales). Los fierros longitudinales proporcionan resistencia a compresión y flexión, 
        mientras los estribos confinan el hormigón y resisten esfuerzos de corte.<br><br>
        
        3. <strong>Instalación de enfierradura:</strong> Se coloca la armadura en posición, conectándola a la fundación 
        mediante traslapos o anclajes. Se usan separadores para mantener el recubrimiento adecuado.<br><br>
        
        4. <strong>Construcción de moldaje:</strong> Se instalan los tableros de madera o metálicos que darán forma 
        a la columna. Deben estar bien aplomados, nivelados y arriostrados para resistir la presión del hormigón fresco.<br><br>
        
        5. <strong>Hormigonado:</strong> Se vierte el hormigón en capas, vibrando cada capa para eliminar vacíos. 
        Se debe evitar la segregación del hormigón durante el vaciado.<br><br>
        
        6. <strong>Curado y descimbre:</strong> Se mantiene húmedo el hormigón durante el curado. El moldaje se retira 
        después de que el hormigón alcance la resistencia suficiente (generalmente 7-14 días).`,
        
        purpose: `<strong>Funciones principales:</strong><br><br>
        • <strong>Transmisión vertical de cargas:</strong> Transfiere las cargas de losas y vigas hacia la fundación.<br><br>
        
        • <strong>Soporte estructural:</strong> Proporciona el soporte vertical principal del edificio, definiendo 
        los espacios y la distribución arquitectónica.<br><br>
        
        • <strong>Resistencia sísmica:</strong> Junto con las vigas, forma el sistema de marcos resistentes que absorbe 
        las fuerzas laterales durante un sismo.<br><br>
        
        • <strong>Rigidez lateral:</strong> Aporta rigidez al edificio para resistir fuerzas horizontales de viento o sismo.<br><br>
        
        • <strong>Definición espacial:</strong> Define la estructura del edificio y permite la configuración de espacios 
        según las necesidades arquitectónicas.`
    },

    'viga': {
        name: 'Viga',
        icon: '➡️',
        color: '#795548',
        what: `Las vigas son elementos estructurales horizontales que se apoyan sobre las columnas y reciben las cargas 
        de las losas. Trabajan principalmente a flexión, soportando momentos flectores y fuerzas cortantes. Son 
        fundamentales para transmitir las cargas de las losas hacia las columnas y formar los marcos resistentes del edificio.`,
        
        how: `<strong>Proceso de construcción:</strong><br><br>
        1. <strong>Construcción de moldaje:</strong> Se instalan tableros de fondo y laterales apoyados en puntales 
        que soportarán el peso del hormigón fresco y las cargas de construcción. El moldaje debe estar nivelado y 
        correctamente alineado.<br><br>
        
        2. <strong>Armado de enfierradura:</strong> Se prepara la armadura con fierros longitudinales inferiores 
        (que resisten la tracción en el centro de la luz), fierros superiores (sobre los apoyos) y estribos verticales 
        que resisten el corte.<br><br>
        
        3. <strong>Instalación de armadura:</strong> Se coloca la enfierradura en el moldaje, usando separadores 
        o "galletas" para mantener el recubrimiento especificado y asegurar la protección del acero.<br><br>
        
        4. <strong>Instalaciones:</strong> Si es necesario, se colocan ductos para instalaciones eléctricas o sanitarias 
        que atravesarán la viga, según lo indicado en planos.<br><br>
        
        5. <strong>Hormigonado:</strong> Se vierte el hormigón, generalmente al mismo tiempo que la losa superior 
        para lograr un trabajo monolítico. Se vibra adecuadamente para eliminar vacíos.<br><br>
        
        6. <strong>Curado y descimbre:</strong> El moldaje inferior se mantiene hasta que el hormigón alcance la 
        resistencia necesaria (generalmente 21-28 días para el retiro de puntales principales).`,
        
        purpose: `<strong>Funciones principales:</strong><br><br>
        • <strong>Transmisión de cargas:</strong> Recibe las cargas de las losas y las transmite hacia las columnas 
        a través de esfuerzos de flexión y corte.<br><br>
        
        • <strong>Formación de marcos:</strong> Junto con las columnas, forma el sistema de marcos o pórticos que 
        proporciona estabilidad lateral al edificio.<br><br>
        
        • <strong>Distribución de esfuerzos:</strong> Distribuye las cargas concentradas o uniformes de la losa 
        hacia múltiples puntos de apoyo (columnas).<br><br>
        
        • <strong>Rigidez del sistema:</strong> Aporta rigidez horizontal al edificio, conectando las columnas y 
        formando un sistema estructural integrado.<br><br>
        
        • <strong>Soporte de losas:</strong> Proporciona el apoyo necesario para las losas, definiendo las luces 
        estructurales y permitiendo espacios libres de columnas en el interior.`
    },

    'losa': {
        name: 'Losa',
        icon: '⬜',
        color: '#9E9E9E',
        what: `La losa es un elemento estructural horizontal plano que funciona como piso y techo de los espacios 
        interiores. Recibe directamente las cargas de uso (personas, muebles, equipos) y las transmite hacia las vigas 
        o muros que la soportan. Trabaja principalmente a flexión y puede ser maciza o nervada.`,
        
        how: `<strong>Proceso de construcción (losa maciza):</strong><br><br>
        1. <strong>Moldaje:</strong> Se instala una superficie horizontal continua de tableros de madera o metálicos, 
        apoyada en un sistema de viguetas y puntales que soportará el peso del hormigón fresco.<br><br>
        
        2. <strong>Enfierradura:</strong> Se coloca una malla de acero formada por fierros en dos direcciones (superior 
        e inferior). Los fierros inferiores resisten la tracción en el centro de los paños, mientras los superiores 
        trabajan sobre los apoyos.<br><br>
        
        3. <strong>Separadores:</strong> Se colocan "galletas" o separadores plásticos para mantener el recubrimiento 
        de hormigón sobre el acero, protegiéndolo de la corrosión.<br><br>
        
        4. <strong>Instalaciones:</strong> Se instalan ductos eléctricos, cajas de conexión y otros elementos que 
        quedarán embebidos en la losa.<br><br>
        
        5. <strong>Hormigonado:</strong> Se vierte el hormigón en franjas, distribuyéndolo uniformemente y vibrándolo 
        para eliminar burbujas. Es importante trabajar rápidamente para lograr un monolito.<br><br>
        
        6. <strong>Nivelación y acabado:</strong> Se nivela la superficie con reglas y se le da el acabado requerido 
        (fratachado, llana, etc.).<br><br>
        
        7. <strong>Curado:</strong> Se mantiene húmeda la superficie durante al menos 7 días. Se protege del sol 
        directo y del secado prematuro.`,
        
        purpose: `<strong>Funciones principales:</strong><br><br>
        • <strong>Superficie de uso:</strong> Proporciona la superficie de piso para el tránsito de personas y 
        colocación de mobiliario y equipos.<br><br>
        
        • <strong>Transmisión de cargas:</strong> Recibe las cargas de uso (sobrecarga) y peso propio, transmitiéndolas 
        hacia las vigas o muros de soporte.<br><br>
        
        • <strong>Diafragma rígido:</strong> Actúa como un diafragma rígido horizontal que distribuye las fuerzas 
        laterales (sismo, viento) hacia los elementos verticales resistentes.<br><br>
        
        • <strong>Separación de espacios:</strong> Define la separación entre pisos, proporcionando aislación acústica 
        y térmica entre niveles.<br><br>
        
        • <strong>Protección:</strong> Protege el interior del edificio de la intemperie y contribuye a la resistencia 
        al fuego de la estructura.<br><br>
        
        • <strong>Arriostres:</strong> Arriostra las cabezas de columnas y muros, evitando el pandeo lateral de estos 
        elementos.`
    },

    'muro': {
        name: 'Muro de Hormigón',
        icon: '🧱',
        color: '#A1887F',
        what: `Los muros de hormigón armado son elementos estructurales verticales que cumplen funciones de soporte 
        y/o contención. Pueden ser muros de carga (que soportan cargas verticales), muros de corte (que resisten 
        fuerzas laterales), o muros de contención (que retienen empujes de tierra). Son especialmente importantes 
        en la resistencia sísmica de edificaciones.`,
        
        how: `<strong>Proceso de construcción:</strong><br><br>
        1. <strong>Replanteo:</strong> Se marca la ubicación exacta del muro según planos, verificando alineamientos 
        y espesores.<br><br>
        
        2. <strong>Armadura:</strong> Se arma la enfierradura con mallas verticales y horizontales en ambas caras 
        del muro. Los fierros se distribuyen según el diseño estructural, con refuerzos en bordes y aberturas.<br><br>
        
        3. <strong>Moldaje:</strong> Se instalan tableros en ambas caras del muro, separados por el espesor requerido. 
        Se usan tensores o "corbatas" para mantener la separación y resistir la presión del hormigón.<br><br>
        
        4. <strong>Aberturas:</strong> Se colocan moldajes para puertas, ventanas y otros vanos según el diseño 
        arquitectónico.<br><br>
        
        5. <strong>Hormigonado:</strong> Se vierte el hormigón en capas horizontales de 30-50 cm, vibrando cada capa. 
        El vaciado debe ser continuo para evitar juntas frías.<br><br>
        
        6. <strong>Curado y descimbre:</strong> Se cura manteniendo húmedo el hormigón. El moldaje se retira cuando 
        el hormigón alcanza resistencia suficiente (generalmente 2-7 días).`,
        
        purpose: `<strong>Funciones principales:</strong><br><br>
        • <strong>Resistencia sísmica:</strong> Los muros de corte son fundamentales para resistir fuerzas laterales 
        durante sismos, proporcionando rigidez y resistencia al edificio.<br><br>
        
        • <strong>Soporte de cargas:</strong> Los muros de carga soportan cargas verticales de losas y cubiertas, 
        transmitiéndolas a la fundación.<br><br>
        
        • <strong>Contención:</strong> Los muros de contención retienen empujes de tierra en subterráneos o desniveles.<br><br>
        
        • <strong>Separación espacial:</strong> Define los límites de espacios interiores, proporcionando privacidad 
        y división funcional.<br><br>
        
        • <strong>Aislación:</strong> Proporciona aislación térmica, acústica y protección contra el fuego entre 
        diferentes espacios o hacia el exterior.`
    },

    'escalera': {
        name: 'Escalera de Hormigón',
        icon: '📶',
        color: '#78909C',
        what: `Las escaleras de hormigón armado son elementos estructurales inclinados que permiten la circulación 
        vertical entre diferentes niveles del edificio. Están compuestas por peldaños (huellas y contrahuellas) y 
        pueden incluir descansos. Trabajan principalmente a flexión, similar a una losa inclinada.`,
        
        how: `<strong>Proceso de construcción:</strong><br><br>
        1. <strong>Moldaje de fondo:</strong> Se construye el moldaje que dará forma a la losa inclinada de la escalera, 
        con la pendiente y dimensiones especificadas.<br><br>
        
        2. <strong>Moldaje de peldaños:</strong> Se instalan tablas perpendiculares al moldaje de fondo que formarán 
        las contrahuellas de cada peldaño.<br><br>
        
        3. <strong>Enfierradura:</strong> Se coloca armadura longitudinal (paralela a la pendiente) y transversal 
        (perpendicular). Se refuerza especialmente en los apoyos y cambios de dirección.<br><br>
        
        4. <strong>Hormigonado:</strong> Se vierte el hormigón comenzando desde abajo, llenando cada peldaño y vibrando 
        adecuadamente. Se debe lograr un vaciado monolítico.<br><br>
        
        5. <strong>Acabado:</strong> Se da acabado a las huellas de cada peldaño para obtener una superficie uniforme 
        y antideslizante.<br><br>
        
        6. <strong>Curado y descimbre:</strong> Se cura el hormigón y se retira el moldaje cuidadosamente una vez 
        alcanzada la resistencia necesaria.`,
        
        purpose: `<strong>Funciones principales:</strong><br><br>
        • <strong>Circulación vertical:</strong> Permite el tránsito de personas entre diferentes niveles del edificio 
        de forma segura y eficiente.<br><br>
        
        • <strong>Evacuación:</strong> Proporciona una vía de escape en caso de emergencia, siendo fundamental en 
        la seguridad del edificio.<br><br>
        
        • <strong>Elemento estructural:</strong> Transmite cargas verticales y horizontales hacia sus apoyos, 
        contribuyendo a la estabilidad general de la estructura.<br><br>
        
        • <strong>Accesibilidad:</strong> Facilita el acceso a todos los niveles del edificio cuando no se requiere 
        o complementa el uso de ascensores.<br><br>
        
        • <strong>Elemento arquitectónico:</strong> Puede ser un elemento estético importante en el diseño interior 
        del edificio.`
    },

    'fierro': {
        name: 'Enfierradura (Acero de Refuerzo)',
        icon: '🔩',
        color: '#B71C1C',
        what: `La enfierradura o acero de refuerzo son barras de acero que se colocan dentro del hormigón para formar 
        el hormigón armado. El hormigón tiene excelente resistencia a compresión pero débil a tracción, mientras el 
        acero resiste muy bien la tracción. Juntos forman un material compuesto óptimo donde cada uno aporta sus 
        mejores propiedades.`,
        
        how: `<strong>Proceso de trabajo con enfierradura:</strong><br><br>
        1. <strong>Corte:</strong> Las barras de acero se cortan a las medidas especificadas en los planos de 
        despiece estructural, usando cizalla o amoladora.<br><br>
        
        2. <strong>Doblado:</strong> Se doblan los fierros según las formas requeridas (ganchos, estribos, etc.) 
        usando máquinas dobladoras o herramientas manuales. Los radios de doblado deben cumplir normas para evitar 
        daño al acero.<br><br>
        
        3. <strong>Armado:</strong> Se ensamblan las barras formando las estructuras tridimensionales especificadas. 
        Los fierros longitudinales se unen con estribos o amarras usando alambre galvanizado.<br><br>
        
        4. <strong>Instalación:</strong> La enfierradura armada se coloca en posición dentro de los moldajes. Se usan 
        separadores para mantener el recubrimiento de hormigón especificado.<br><br>
        
        5. <strong>Traslapos y anclajes:</strong> Donde se requiere continuidad, se realizan traslapos (sobreposición 
        de barras) según las longitudes especificadas. Los anclajes aseguran la transmisión de esfuerzos.<br><br>
        
        6. <strong>Verificación:</strong> Se verifica que la enfierradura cumpla con planos antes del hormigonado: 
        diámetros, espaciamientos, recubrimientos y longitudes.`,
        
        purpose: `<strong>Funciones principales:</strong><br><br>
        • <strong>Resistencia a tracción:</strong> Proporciona la resistencia a tracción que el hormigón por sí solo 
        no tiene, permitiendo que los elementos resistan flexión.<br><br>
        
        • <strong>Control de fisuración:</strong> Distribuye y controla las fisuras que naturalmente se producen en 
        el hormigón, manteniéndolas dentro de límites aceptables.<br><br>
        
        • <strong>Resistencia al corte:</strong> Los estribos y fierros transversales resisten los esfuerzos de corte 
        en vigas y columnas.<br><br>
        
        • <strong>Confinamiento:</strong> Los estribos en columnas confinan el hormigón, aumentando su capacidad de 
        resistir compresión y su ductilidad.<br><br>
        
        • <strong>Ductilidad:</strong> Permite que la estructura tenga deformaciones controladas antes del colapso, 
        fundamental en zonas sísmicas para absorber energía.<br><br>
        
        • <strong>Resistencia a temperatura:</strong> Controla las fisuras por cambios de temperatura y retracción 
        del hormigón durante el fraguado.`
    },

    'tuberia': {
        name: 'Sistema de Alcantarillado',
        icon: '🚰',
        color: '#0277BD',
        what: `El sistema de alcantarillado es el conjunto de tuberías, cajas de inspección, sifones y otros elementos 
        que recolectan y evacuan las aguas servidas y aguas lluvias desde el edificio hacia la red pública de 
        alcantarillado. Es fundamental para la higiene, salud y confort de los ocupantes.`,
        
        how: `<strong>Instalación del sistema:</strong><br><br>
        1. <strong>Planificación:</strong> Se diseña el trazado de tuberías siguiendo pendientes adecuadas (mínimo 2% 
        para aguas servidas) y ubicando las bajadas y cajas de inspección según normativa.<br><br>
        
        2. <strong>Tuberías:</strong> Se utilizan tuberías de PVC sanitario en diferentes diámetros: 
        - 50mm para lavatorios y lavaplatos
        - 75mm para duchas y tinas
        - 100mm para inodoros y bajadas verticales
        - 110-160mm para colectores principales<br><br>
        
        3. <strong>Instalación en losas:</strong> Durante la construcción de la losa se colocan tuberías horizontales 
        embebidas que conectarán los artefactos. Se dejan chicotes (extremos) que sobresalen.<br><br>
        
        4. <strong>Cajas de inspección:</strong> Se construyen cajas en hormigón o prefabricadas en puntos estratégicos 
        que permiten acceso para mantención y limpieza.<br><br>
        
        5. <strong>Ventilaciones:</strong> Se instalan tuberías de ventilación que permiten la entrada de aire al 
        sistema, evitando sifonamiento y malos olores.<br><br>
        
        6. <strong>Pruebas:</strong> Se realizan pruebas de hermeticidad y pendiente antes de cubrir las tuberías, 
        verificando que no haya fugas ni contrapendientes.<br><br>
        
        7. <strong>Conexión a red:</strong> Finalmente se conecta el sistema interno a la red pública de alcantarillado 
        mediante el colector domiciliario.`,
        
        purpose: `<strong>Funciones principales:</strong><br><br>
        • <strong>Evacuación de aguas servidas:</strong> Conduce las aguas residuales desde artefactos sanitarios 
        (inodoros, lavatorios, duchas) hacia la red pública.<br><br>
        
        • <strong>Evacuación de aguas lluvias:</strong> En algunos casos también recolecta y evacua aguas lluvias 
        desde techos y terrazas (sistema separado o combinado).<br><br>
        
        • <strong>Prevención sanitaria:</strong> Evita la acumulación de aguas servidas que podrían causar 
        contaminación, malos olores y problemas de salud.<br><br>
        
        • <strong>Ventilación:</strong> Permite la entrada de aire al sistema para igualar presiones y evitar el 
        sifonamiento de los sellos hidráulicos.<br><br>
        
        • <strong>Mantención:</strong> Las cajas de inspección permiten acceso para limpieza, desobstrucción y 
        mantención del sistema.<br><br>
        
        • <strong>Protección ambiental:</strong> Conduce las aguas servidas de forma controlada hacia plantas de 
        tratamiento, evitando la contaminación ambiental.`
    },

    'cubierta': {
        name: 'Cubierta/Techo',
        icon: '🏠',
        color: '#D84315',
        what: `La cubierta o techo es el elemento constructivo superior que protege el edificio de las condiciones climáticas 
        (lluvia, sol, nieve, viento). Puede ser inclinada o plana, y además de su función protectora, completa el sistema 
        estructural del edificio actuando como cierre superior de la envolvente térmica.`,
        
        how: `<strong>Proceso de construcción:</strong><br><br>
        1. <strong>Estructura de soporte:</strong> Se construye la estructura que soportará la cubierta, que puede ser de 
        madera (cerchas), acero (tijerales metálicos) o hormigón armado (losa de techo) según el diseño arquitectónico 
        y estructural.<br><br>
        
        2. <strong>Aislación térmica:</strong> Se instala material aislante térmico (lana mineral, poliestireno expandido, 
        poliuretano, etc.) con el espesor especificado para mejorar el confort térmico interior y la eficiencia energética.<br><br>
        
        3. <strong>Barrera de vapor:</strong> Se coloca una membrana impermeabilizante que evita la condensación dentro 
        de la estructura de la cubierta.<br><br>
        
        4. <strong>Pendientes:</strong> Se crean las pendientes necesarias para evacuación de aguas lluvias, generalmente 
        mínimo 2% en cubiertas planas y según diseño en cubiertas inclinadas (típicamente 20-45%).<br><br>
        
        5. <strong>Impermeabilización:</strong> Se aplican membranas asfálticas, láminas impermeables (EPDM, TPO) o 
        sistemas de impermeabilización líquida para garantizar total estanqueidad al agua.<br><br>
        
        6. <strong>Revestimiento final:</strong> Se instala el material de terminación visible: tejas cerámicas o de 
        hormigón, planchas metálicas, pizarreño, membrana vista, baldosas o gravilla según especificación.<br><br>
        
        7. <strong>Sistema de evacuación:</strong> Se instalan canaletas, bajadas de agua lluvia, sumideros y elementos 
        de drenaje con sus respectivas pendientes hacia puntos de descarga.<br><br>
        
        8. <strong>Terminaciones:</strong> Se ejecutan encuentros con muros, pretiles, ductos, juntas de dilatación, 
        bordes y remates para asegurar la estanqueidad total del sistema.`,
        
        purpose: `<strong>Funciones principales:</strong><br><br>
        • <strong>Protección climática:</strong> Protege el interior del edificio contra lluvia, nieve, sol intenso, 
        viento y otras condiciones climáticas adversas, manteniendo el espacio habitable seco y seguro.<br><br>
        
        • <strong>Aislación térmica:</strong> Reduce significativamente la transferencia de calor entre el interior y 
        exterior, mejorando el confort térmico y reduciendo costos de calefacción y refrigeración.<br><br>
        
        • <strong>Impermeabilización:</strong> Evita completamente las filtraciones de agua que podrían dañar la estructura, 
        instalaciones eléctricas, acabados interiores y mobiliario.<br><br>
        
        • <strong>Evacuación de aguas:</strong> Conduce las aguas lluvias de forma controlada y eficiente hacia el sistema 
        de drenaje, evitando acumulaciones y sobrecargas.<br><br>
        
        • <strong>Elemento arquitectónico:</strong> Define la imagen exterior del edificio, su silueta urbana y puede 
        aportar gran valor estético y carácter arquitectónico.<br><br>
        
        • <strong>Protección estructural:</strong> Protege los elementos estructurales superiores (vigas, losas, columnas) 
        de la degradación por agentes climáticos, prolongando su vida útil.<br><br>
        
        • <strong>Habitabilidad:</strong> Contribuye al confort acústico reduciendo ruidos de lluvia y exteriores, y 
        completa la envolvente habitable del edificio.`
    }
};

// Configuración de iconos 3D para marcadores
const MARKER_CONFIG = {
    size: 0.8,           // Tamaño del marcador en metros
    hoverSize: 1.0,      // Tamaño cuando el mouse está encima
    color: '#FFD700',    // Color dorado para el marcador
    emissive: '#FF8C00', // Color emisivo (brillo)
    opacity: 0.9,
    hoverOpacity: 1.0
};

// Posiciones relativas de los marcadores según tipo de componente
const MARKER_POSITIONS = {
    'fundacion': { x: 0, y: 0.3, z: 0 },      // Ligeramente arriba de la fundación
    'columna': { x: 0, y: 0.5, z: 0 },        // Mitad de la columna
    'viga': { x: 0, y: 0.3, z: 0 },           // Centro de la viga
    'losa': { x: 0, y: 0.2, z: 0 },           // Sobre la losa
    'muro': { x: 0, y: 0.5, z: 0 },           // Centro del muro
    'escalera': { x: 0, y: 0.5, z: 0 },       // Centro de escalera
    'fierro': { x: 0, y: 0, z: 0 },           // En el fierro mismo
    'tuberia': { x: 0, y: 0, z: 0 },          // En la tubería
    'cubierta': { x: 0, y: 0.5, z: 0 }        // Centro de la cubierta
};

// Exportar configuraciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EDUCATIONAL_CONTENT, MARKER_CONFIG, MARKER_POSITIONS };
}