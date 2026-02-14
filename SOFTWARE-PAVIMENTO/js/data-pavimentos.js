// Base de datos completa de pavimentos para Chile
const pavimentosData = {
    flexible: {
        nombre: "Pavimento Flexible (Asfáltico)",
        icono: "🛣️",
        descripcion: "Es el tipo más común en ciudades y carreteras de Chile. Se caracteriza por su flexibilidad y capacidad de adaptarse a pequeñas deformaciones del terreno.",
        material: "Mezcla asfáltica (asfalto + áridos)",
        estructura: "Distribuye las cargas de los vehículos en forma gradual hacia las capas inferiores. La carpeta asfáltica absorbe y distribuye las tensiones, transmitiéndolas a las capas granulares inferiores.",
        capas: [
            {
                nombre: "Carpeta Asfáltica",
                descripcion: "Capa de rodadura compuesta por mezcla asfáltica",
                espesor: "5-10 cm",
                color: "#2c2c2c",
                posicion: 0
            },
            {
                nombre: "Base Granular",
                descripcion: "Capa de áridos triturados compactados",
                espesor: "15-25 cm",
                color: "#5a5a5a",
                posicion: 1
            },
            {
                nombre: "Subbase",
                descripcion: "Capa de material granular seleccionado",
                espesor: "15-30 cm",
                color: "#808080",
                posicion: 2
            },
            {
                nombre: "Subrasante",
                descripcion: "Terreno natural preparado y compactado",
                espesor: "Variable",
                color: "#a0826d",
                posicion: 3
            }
        ],
        ventajas: [
            "Más económico en inversión inicial",
            "Construcción rápida (menor tiempo de ejecución)",
            "Reparaciones simples y localizadas",
            "Mejor adherencia para vehículos",
            "Menor ruido de rodadura",
            "Puesta en servicio inmediata"
        ],
        desventajas: [
            "Menor vida útil que el rígido (10-15 años)",
            "Sensible al calor, agua y combustibles",
            "Requiere mantenciones más frecuentes",
            "Mayor deformación bajo cargas pesadas",
            "Susceptible a ahuellamiento en climas cálidos",
            "Degradación acelerada por envejecimiento del asfalto"
        ],
        datosChile: {
            normas: [
                "Manual de Carreteras Vol. 5 (MOP)",
                "MC V5 - Especificaciones y Métodos de Muestreo, Ensayo y Control",
                "NCh 1852 - Asfaltos - Especificaciones"
            ],
            usoComun: "97% de las calles urbanas y 85% de carreteras rurales en Chile",
            ejemplos: [
                "Ruta 5 (Panamericana) - tramos del sur",
                "Calles urbanas de Santiago, Valparaíso, Concepción",
                "Avenida Costanera Norte, Santiago",
                "Carretera Austral"
            ],
            clima: "Especialmente adecuado para el clima del centro y sur de Chile, donde las temperaturas moderadas favorecen su desempeño",
            costoReferencial: "$8.000 - $15.000 CLP/m² (valores referenciales 2026)"
        }
    },
    
    rigido: {
        nombre: "Pavimento Rígido (Hormigón)",
        icono: "🧱",
        descripcion: "Se usa mucho en autopistas, aeropuertos y zonas de alto tránsito pesado en Chile. Su estructura de losas de hormigón proporciona alta resistencia y durabilidad.",
        material: "Hormigón de cemento Portland",
        estructura: "La losa de hormigón absorbe y distribuye gran parte de la carga por su alta rigidez. Trabaja como una placa que transmite las cargas a una superficie amplia, reduciendo significativamente las tensiones en las capas inferiores.",
        capas: [
            {
                nombre: "Losa de Hormigón",
                descripcion: "Losa de hormigón con juntas de dilatación",
                espesor: "20-30 cm",
                color: "#c0c0c0",
                posicion: 0
            },
            {
                nombre: "Base Estabilizada",
                descripcion: "Base granular estabilizada o tratada con cemento",
                espesor: "15-20 cm",
                color: "#909090",
                posicion: 1
            },
            {
                nombre: "Subrasante",
                descripcion: "Terreno natural mejorado y compactado",
                espesor: "Variable",
                color: "#a0826d",
                posicion: 2
            }
        ],
        ventajas: [
            "Larga vida útil (30-40 años o más)",
            "Soporta cargas pesadas de manera eficiente",
            "Menor deformación permanente",
            "Requiere menos mantenimiento a largo plazo",
            "Alta reflectancia (menor isla de calor urbano)",
            "Resistente a derrames de combustibles y aceites",
            "Mejor para climas extremos"
        ],
        desventajas: [
            "Mayor costo inicial (2-3 veces el flexible)",
            "Reparaciones más complejas y costosas",
            "Puede fisurarse si no tiene buenas juntas",
            "Tiempo de construcción mayor",
            "Período de curado antes de uso (7-28 días)",
            "Menor adherencia en superficies mojadas",
            "Ruido de rodadura mayor"
        ],
        datosChile: {
            normas: [
                "Manual de Carreteras Vol. 5 (MOP)",
                "NCh 170 - Hormigón - Requisitos generales",
                "NCh 1017 - Hormigón - Confección y curado de probetas",
                "ACI 325 - Pavimentos de hormigón (adaptado)"
            ],
            usoComun: "Principalmente en autopistas concesionadas, aeropuertos y puertos. Representa aproximadamente el 8% del total de pavimentos en Chile",
            ejemplos: [
                "Aeropuerto Arturo Merino Benítez (Santiago)",
                "Autopista Los Libertadores (túneles y zonas críticas)",
                "Puerto de San Antonio - zona de contenedores",
                "Costanera Norte - túneles",
                "Túnel El Melón",
                "Zonas industriales de alto tráfico pesado"
            ],
            clima: "Ideal para el norte de Chile donde las altas temperaturas afectarían el asfalto. También usado en túneles por razones de seguridad",
            costoReferencial: "$18.000 - $30.000 CLP/m² (valores referenciales 2026)"
        }
    },
    
    semirigido: {
        nombre: "Pavimento Semirrígido",
        icono: "⚙️",
        descripcion: "Es un intermedio entre flexible y rígido. Combina las ventajas de ambos sistemas mediante una base estabilizada y una carpeta flexible.",
        material: "Bases tratadas con cemento o cal + carpeta asfáltica superior",
        estructura: "Tiene una base con cierta rigidez (tratada con cemento o cal), pero superficie flexible. La base rígida proporciona capacidad estructural, mientras la carpeta asfáltica mantiene confort y facilidad de mantenimiento.",
        capas: [
            {
                nombre: "Carpeta Asfáltica",
                descripcion: "Capa de rodadura de mezcla asfáltica",
                espesor: "5-8 cm",
                color: "#2c2c2c",
                posicion: 0
            },
            {
                nombre: "Base Estabilizada",
                descripcion: "Base granular tratada con cemento o cal",
                espesor: "15-20 cm",
                color: "#7a7a7a",
                posicion: 1
            },
            {
                nombre: "Subbase Granular",
                descripcion: "Capa de material granular seleccionado",
                espesor: "15-25 cm",
                color: "#959595",
                posicion: 2
            },
            {
                nombre: "Subrasante",
                descripcion: "Terreno natural preparado",
                espesor: "Variable",
                color: "#a0826d",
                posicion: 3
            }
        ],
        ventajas: [
            "Mejor capacidad estructural que el flexible puro",
            "Menor espesor total requerido",
            "Buen desempeño ante cargas medias-altas",
            "Menor deformación que pavimento flexible",
            "Costo intermedio entre flexible y rígido",
            "Facilidad de reparación de la capa superficial",
            "Buena distribución de cargas"
        ],
        desventajas: [
            "Puede fisurarse si la base tratada se agrieta (reflexión de grietas)",
            "Diseño más delicado y específico",
            "Requiere control de calidad estricto en construcción",
            "Sensible a condiciones climáticas durante construcción",
            "La base tratada es sensible a la humedad durante el curado",
            "Menor flexibilidad que pavimento totalmente flexible"
        ],
        datosChile: {
            normas: [
                "Manual de Carreteras Vol. 5 (MOP)",
                "MC V5 8.302 - Bases estabilizadas con cemento",
                "MC V5 8.303 - Bases tratadas con cal",
                "NCh 158 - Cementos - Requisitos generales"
            ],
            usoComun: "Usado en carreteras de tráfico medio-alto y en proyectos de rehabilitación. Aproximadamente 5% de los pavimentos en Chile",
            ejemplos: [
                "Ruta 68 Santiago-Valparaíso (tramos rehabilitados)",
                "Carretera Rancagua-Doñihue",
                "Accesos a puertos con tráfico pesado moderado",
                "Algunas vías estructurantes en ciudades intermedias",
                "Proyectos de rehabilitación en Ruta 5"
            ],
            clima: "Adecuado para zonas donde se requiere mayor capacidad estructural que el flexible tradicional, especialmente útil en suelos de baja capacidad de soporte",
            costoReferencial: "$12.000 - $20.000 CLP/m² (valores referenciales 2026)"
        }
    }
};

// Información adicional sobre Chile
const infoGeneralChile = {
    red_vial_total: "82.000 km aproximadamente",
    porcentaje_pavimentado: "23% de la red vial total",
    distribucion: {
        flexible: "87%",
        rigido: "8%",
        semirigido: "5%"
    },
    principal_operador: "Ministerio de Obras Públicas (MOP) - Dirección de Vialidad",
    concesionarias_principales: [
        "Autopistas urbanas de Santiago",
        "Red de carreteras interurbanas concesionadas",
        "Rutas 5, 68, 78, entre otras"
    ]
};