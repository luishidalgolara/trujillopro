// Datos de componentes estructurales y su información educativa

const STRUCTURAL_DATA = {
    components: {
        foundation: {
            name: 'Cimentación',
            color: '#8B4513',
            description: 'La cimentación es la base del edificio que transmite las cargas de la estructura al suelo.',
            details: {
                function: 'Distribuir el peso total del edificio uniformemente sobre el terreno',
                materials: ['Concreto armado', 'Piedra', 'Grava compactada'],
                importance: 'Elemento crítico que determina la estabilidad de toda la estructura',
                types: ['Zapatas aisladas', 'Zapatas corridas', 'Losa de cimentación']
            },
            specifications: {
                profundidad: '1.5 - 3.0 metros',
                resistencia: 'f\'c = 210 kg/cm²',
                acero: 'Fy = 4200 kg/cm²'
            }
        },
        columns: {
            name: 'Columnas',
            color: '#708090',
            description: 'Las columnas son elementos verticales que soportan las cargas y las transmiten a la cimentación.',
            details: {
                function: 'Soporte vertical principal de la estructura',
                materials: ['Concreto armado', 'Acero estructural', 'Varillas de refuerzo'],
                importance: 'Elementos críticos que mantienen la estructura en pie',
                types: ['Columnas cuadradas', 'Columnas rectangulares', 'Columnas circulares']
            },
            specifications: {
                dimensiones: '30x30 cm a 50x50 cm',
                resistencia: 'f\'c = 280 kg/cm²',
                refuerzo: '4 a 8 varillas #6 o #8'
            }
        },
        beams: {
            name: 'Vigas',
            color: '#A0522D',
            description: 'Las vigas son elementos horizontales que conectan las columnas y soportan las losas.',
            details: {
                function: 'Transmitir cargas horizontales entre columnas y soportar losas',
                materials: ['Concreto armado', 'Acero de refuerzo', 'Estribos'],
                importance: 'Fundamentales para la rigidez y resistencia horizontal',
                types: ['Vigas principales', 'Vigas secundarias', 'Vigas de borde']
            },
            specifications: {
                dimensiones: '25x50 cm típica',
                resistencia: 'f\'c = 280 kg/cm²',
                refuerzo: 'Longitudinal y transversal'
            }
        },
        slabs: {
            name: 'Losas',
            color: '#D3D3D3',
            description: 'Las losas son elementos horizontales que forman los pisos y techos del edificio.',
            details: {
                function: 'Proporcionar superficies horizontales para uso y protección',
                materials: ['Concreto armado', 'Malla electrosoldada', 'Acero de refuerzo'],
                importance: 'Definen espacios habitables y distribuyen cargas vivas',
                types: ['Losa maciza', 'Losa nervada', 'Losa aligerada']
            },
            specifications: {
                espesor: '12 - 25 cm',
                resistencia: 'f\'c = 210 kg/cm²',
                recubrimiento: '2.5 cm'
            }
        },
        walls: {
            name: 'Muros',
            color: '#F5DEB3',
            description: 'Los muros son elementos verticales que dividen espacios y pueden contribuir a la resistencia estructural.',
            details: {
                function: 'División de espacios y resistencia lateral',
                materials: ['Ladrillo', 'Bloque de concreto', 'Concreto armado'],
                importance: 'Proporcionan privacidad, aislamiento y rigidez lateral',
                types: ['Muros de carga', 'Muros divisorios', 'Muros de contención']
            },
            specifications: {
                espesor: '15 - 25 cm',
                altura: 'Variable según diseño',
                mortero: 'Cemento-arena 1:4'
            }
        },
        reinforcement: {
            name: 'Refuerzo Estructural',
            color: '#FF6347',
            description: 'El refuerzo de acero proporciona resistencia a tensión al concreto.',
            details: {
                function: 'Incrementar resistencia a tensión y flexión',
                materials: ['Varillas corrugadas', 'Estribos', 'Malla electrosoldada'],
                importance: 'Esencial para el trabajo conjunto concreto-acero',
                types: ['Refuerzo longitudinal', 'Refuerzo transversal', 'Refuerzo por temperatura']
            },
            specifications: {
                grados: 'Grado 60 (Fy = 4200 kg/cm²)',
                diametros: '#3 a #10',
                recubrimiento: '4 - 7.5 cm según elemento'
            }
        },
        roof: {
            name: 'Cubierta/Techo',
            color: '#8B0000',
            description: 'La cubierta protege el edificio de elementos climáticos.',
            details: {
                function: 'Protección contra lluvia, sol y otros elementos',
                materials: ['Losa de concreto', 'Impermeabilizante', 'Aislante térmico'],
                importance: 'Protección principal de la estructura',
                types: ['Techo plano', 'Techo inclinado', 'Techo verde']
            },
            specifications: {
                pendiente: '1-2% para desagüe',
                impermeabilizacion: 'Membrana asfáltica',
                aislamiento: 'Poliestireno o fibra de vidrio'
            }
        },
        stairs: {
            name: 'Escaleras',
            color: '#4682B4',
            description: 'Las escaleras permiten la circulación vertical entre niveles.',
            details: {
                function: 'Comunicación vertical entre pisos',
                materials: ['Concreto armado', 'Acero estructural', 'Acabados'],
                importance: 'Elemento esencial de circulación y evacuación',
                types: ['Escalera de un tramo', 'Escalera en L', 'Escalera helicoidal']
            },
            specifications: {
                huella: '28 - 30 cm',
                contrahuella: '17 - 18 cm',
                ancho: 'Mínimo 1.20 m'
            }
        },
        
        // ====================================================================
        // ✨ NUEVO: VENTANAS
        // ====================================================================
        windows: {
            name: 'Ventanas',
            color: '#88CCEE',
            description: 'Las ventanas proporcionan iluminación natural, ventilación y conexión visual con el exterior.',
            details: {
                function: 'Iluminación natural, ventilación y vistas al exterior',
                materials: ['Vidrio templado', 'Marco de aluminio', 'Sellador de silicona', 'Herrajes'],
                importance: 'Esenciales para la habitabilidad, confort térmico y eficiencia energética',
                types: ['Ventana corrediza', 'Ventana abatible', 'Ventana fija', 'Ventana proyectante']
            },
            specifications: {
                dimensiones: '1.20 x 1.20 m (estándar)',
                vidrio: 'Templado de 6 mm',
                marco: 'Aluminio anodizado',
                alturaAntepecho: '0.90 - 1.00 m desde NPT'
            }
        },
        
        // ====================================================================
        // ✨ NUEVO: PUERTAS
        // ====================================================================
        doors: {
            name: 'Puertas',
            color: '#8B5E3C',
            description: 'Las puertas permiten el acceso, circulación y seguridad entre espacios interiores y exteriores.',
            details: {
                function: 'Acceso, circulación, privacidad y seguridad',
                materials: ['Madera sólida o MDF', 'Marco de madera', 'Herrajes y cerraduras', 'Bisagras'],
                importance: 'Fundamentales para la funcionalidad, seguridad y privacidad del hogar',
                types: ['Puerta abatible', 'Puerta corrediza', 'Puerta plegable', 'Puerta pivotante']
            },
            specifications: {
                dimensiones: '0.90 - 1.00 x 2.10 - 2.20 m',
                material: 'Madera sólida o MDF enchapado',
                marco: 'Madera de pino o similar',
                cerradura: 'Cerradura de embutir con llave'
            }
        }
    },
    
    buildingLevels: {
        1: {
            name: '1 Nivel - Casa Habitación',
            description: 'Estructura básica de un nivel con todos los componentes fundamentales',
            components: ['foundation', 'columns', 'beams', 'slabs', 'walls', 'reinforcement', 'roof', 'windows', 'doors'],
            height: 4.0,
            info: 'Edificación ideal para vivienda unifamiliar con altura típica de 4 metros'
        },
        2: {
            name: '2 Niveles - Casa o Edificio Pequeño',
            description: 'Estructura de dos niveles con escaleras y sistemas de piso',
            components: ['foundation', 'columns', 'beams', 'slabs', 'walls', 'reinforcement', 'roof', 'stairs', 'windows', 'doors'],
            height: 7.5,
            info: 'Estructura común para casas de dos pisos o pequeños edificios comerciales'
        },
        3: {
            name: '3 Niveles - Edificio Multifamiliar',
            description: 'Estructura completa de tres niveles con todos los sistemas estructurales',
            components: ['foundation', 'columns', 'beams', 'slabs', 'walls', 'reinforcement', 'roof', 'stairs', 'windows', 'doors'],
            height: 11.0,
            info: 'Edificación típica para departamentos o uso mixto residencial-comercial'
        }
    },
    
    materials: {
        concrete: {
            name: 'Concreto Armado',
            properties: {
                resistencia: '210 - 280 kg/cm²',
                densidad: '2400 kg/m³',
                moduloElastico: '15000√f\'c'
            },
            uses: ['Columnas', 'Vigas', 'Losas', 'Cimentación']
        },
        steel: {
            name: 'Acero de Refuerzo',
            properties: {
                resistenciaFluencia: '4200 kg/cm²',
                moduloElastico: '2,000,000 kg/cm²',
                densidad: '7850 kg/m³'
            },
            uses: ['Varillas corrugadas', 'Estribos', 'Malla']
        }
    },
    
    safetyFactors: {
        title: 'Factores de Seguridad',
        items: [
            'Factor de carga muerta: 1.4',
            'Factor de carga viva: 1.7',
            'Factor de reducción por flexión: 0.90',
            'Factor de reducción por cortante: 0.75',
            'Recubrimiento mínimo: 2.5 - 7.5 cm'
        ]
    },
    
    constructionProcess: {
        title: 'Proceso de Construcción',
        steps: [
            {
                step: 1,
                name: 'Excavación y Cimentación',
                description: 'Preparación del terreno y construcción de zapatas'
            },
            {
                step: 2,
                name: 'Estructura de Concreto',
                description: 'Construcción de columnas, vigas y losas'
            },
            {
                step: 3,
                name: 'Muros y Cerramientos',
                description: 'Levantamiento de muros divisorios'
            },
            {
                step: 4,
                name: 'Instalaciones',
                description: 'Sistemas eléctricos, hidráulicos y sanitarios'
            },
            {
                step: 5,
                name: 'Acabados',
                description: 'Pisos, pintura y detalles finales'
            }
        ]
    }
};

// Configuración de visualización 3D
const DISPLAY_CONFIG = {
    explodeDistance: {
        1: 3.0,
        2: 4.5,
        3: 6.0
    },
    componentSpacing: 2.5,
    animationDuration: 1000,
    labelOffset: 1.5
};