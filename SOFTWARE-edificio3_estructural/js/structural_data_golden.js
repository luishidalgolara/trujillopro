/* ═══════════════════════════════════════════════════════════════════════
   STRUCTURAL_DATA_GOLDEN.JS
   Datos estructurales para el Edificio Golden — Torre de 20+ niveles
   Hormigón Armado de Alta Resistencia + Sistema Mixto
═══════════════════════════════════════════════════════════════════════ */

function getGoldenCategory(nodeName) {
    if (!nodeName) return 'other';
    const n = nodeName.toLowerCase();

    if (n.includes('column') || n.includes('col') || n.includes('pilar')
        || n.includes('pillar') || n.includes('columna'))                 return 'column';

    if (n.includes('beam')   || n.includes('viga') || n.includes('joist')
        || n.includes('girder'))                                           return 'beam';

    if (n.includes('wall')   || n.includes('muro') || n.includes('pared')
        || n.includes('shear'))                                            return 'wall';

    if (n.includes('slab')   || n.includes('losa') || n.includes('floor')
        || n.includes('deck') || n.includes('laje'))                       return 'slab';

    if (n.includes('roof')   || n.includes('techo') || n.includes('top')
        || n.includes('cubierta') || n.includes('penthouse'))              return 'roof';

    if (n.includes('found')  || n.includes('base') || n.includes('ciment')
        || n.includes('pile') || n.includes('pilote') || n.includes('footing')) return 'foundation';

    if (n.includes('stair')  || n.includes('escal') || n.includes('ramp')
        || n.includes('elevator') || n.includes('lift'))                   return 'stair';

    if (n.includes('core')   || n.includes('nucleo') || n.includes('shaft')) return 'core';

    if (n.includes('facade') || n.includes('fachada') || n.includes('cladding')
        || n.includes('curtain') || n.includes('glass'))                   return 'facade';

    return 'other';
}

function getGoldenFloor(nodeName) {
    if (!nodeName) return -1;
    const n = nodeName.toLowerCase();

    if (n.includes('basement') || n.includes('sotano') || n.includes('subsuelo')) return -1;
    if (n.includes('ground')   || n.includes('terreo') || n.includes('pb')
        || n.includes('piso0') || n.includes('nivel0') || n.includes('_0_'))      return 0;

    for (let i = 1; i <= 25; i++) {
        if (n.includes(`piso${i}`) || n.includes(`nivel${i}`)
            || n.includes(`floor${i}`) || n.includes(`_${i}_`)
            || n.includes(`0${i}`) || n.includes(`p${i}_`))               return i;
    }
    if (n.includes('penthouse') || n.includes('top') || n.includes('roof')) return 22;
    return -1;
}

const GOLDEN_PART_INFO = {
    all: {
        n: 'Edificio Golden — Torre Residencial',
        s: 'Sistema Estructural de Alta Altura',
        d: 'Torre residencial de hormigón armado de alta resistencia con más de 20 niveles. Sistema mixto de núcleo rígido central con muros de corte y pórticos perimetrales resistentes a momento. El núcleo provee resistencia lateral ante sismo y viento; los pórticos perimetrales resisten cargas gravitacionales. Losas macizas y planas optimizan altura libre por piso. Cimentación profunda con pilotes de gran diámetro.',
        st: [
            { l: 'Sistema',     v: 'Núcleo + Pórticos' },
            { l: 'Material',    v: "H.A. f'c 35-50 MPa" },
            { l: 'Niveles',     v: '20+ plantas'        },
            { l: 'Altura',      v: '~70-80 m'           }
        ]
    },
    columns: {
        n: 'Columnas de Alta Resistencia',
        s: 'Pilares Perimetrales y Centrales',
        d: 'Columnas de hormigón armado de alta resistencia (f\'c 35-50 MPa) con sección variable según altura. En plantas bajas, secciones de hasta 80x80 cm con cuantías de acero del 3-4%. A medida que se asciende, la sección se reduce progresivamente. Las esquinas llevan columnas de mayor rigidez para resistir cargas de viento y sismo en dos direcciones.',
        st: [
            { l: 'Sección PB',  v: '60x80 - 80x80 cm'  },
            { l: "f'c",         v: '35-50 MPa'          },
            { l: 'Acero',       v: 'fy 500 MPa'         },
            { l: 'Cuantía',     v: '2-4%'               }
        ]
    },
    walls: {
        n: 'Muros Estructurales',
        s: 'Sistema de Muros de Hormigón Armado',
        d: 'Muros de hormigón armado de 20-35 cm de espesor que conforman el sistema de resistencia gravitacional y lateral. Distribuidos en planta para minimizar excentricidades. Mallas de refuerzo horizontal y vertical con ganchos sísmicos en zonas de confinamiento. En los primeros pisos, los muros tienen mayor espesor y cuantía de acero por ser la zona de mayor demanda.',
        st: [
            { l: 'Espesor',     v: '20 - 35 cm'         },
            { l: 'Refuerzo',    v: 'Doble malla #4-#6'  },
            { l: "f'c",         v: '35 MPa'             },
            { l: 'Confinamiento',v: 'Zonas de borde'    }
        ]
    },
    shear_walls: {
        n: 'Muros de Corte — Sistema Sísmico',
        s: 'Resistencia Lateral Principal',
        d: 'Muros de corte de hormigón armado de alta ductilidad que forman el sistema primario de resistencia sísmica. Dimensionados para resistir el 100% de las fuerzas sísmicas en edificios de gran altura. Elementos de borde confinados con estribos cerrados de alta densidad para garantizar ductilidad en zonas de rótula plástica. Deriva máxima de entrepiso controlada a 0.5% de la altura.',
        st: [
            { l: 'Deriva máx.', v: '< 0.5% h entrepiso' },
            { l: 'Ductilidad',  v: 'μ ≥ 4 (alta)'      },
            { l: 'Elem. borde', v: 'Estribos Ø10@5cm'  },
            { l: 'Norma',       v: 'ACI 318 / NCh 433'  }
        ]
    },
    slabs: {
        n: 'Losas de Entrepiso',
        s: 'Diafragmas Rígidos Horizontales',
        d: 'Losas planas macizas de hormigón armado de 20-25 cm de espesor que actúan como diafragmas rígidos, distribuyendo las fuerzas sísmicas horizontales a los muros de corte y columnas. La armadura bidireccional controla la fisuración y las flechas diferidas. Sobrecargas de uso residencial: 2.0 kN/m². Las losas de los pisos de transferencia (si existen) tienen mayor espesor.',
        st: [
            { l: 'Espesor',     v: '20 - 25 cm'         },
            { l: 'Armadura',    v: 'Ø12@15cm bidirec.'  },
            { l: 'Sobrecarga',  v: '2.0 kN/m²'          },
            { l: 'Función',     v: 'Diafragma rígido'   }
        ]
    },
    roof: {
        n: 'Losa de Techo y Penthouse',
        s: 'Nivel Superior y Remate',
        d: 'Losa de cubierta con pendiente mínima para drenaje e impermeabilización. El nivel penthouse puede incluir equipos de HVAC, sala de máquinas del ascensor y depósitos de agua. La losa de techo debe resistir cargas de nieve (en zonas aplicables), presión de viento y cargas de mantenimiento. Barrera de vapor y aislamiento térmico reducen puentes térmicos.',
        st: [
            { l: 'Espesor',     v: '25 cm + impermeab.' },
            { l: 'Cargas',      v: 'HVAC + mantenimiento'},
            { l: 'Aislamiento', v: 'Poliestireno 5cm'   },
            { l: 'Pendiente',   v: '≥ 1.5% drenaje'    }
        ]
    },
    beams: {
        n: 'Vigas Principales y Secundarias',
        s: 'Sistema de Vigas de Hormigón Armado',
        d: 'Vigas de hormigón armado que transfieren cargas de las losas a las columnas. En sistema de losa plana, las "vigas banda" integradas en la losa capturan las cargas en las franjas de columnas. Vigas perimetrales de fachada absorben cargas del sistema de cerramiento. Las vigas de transferencia en pisos de cambio estructural tienen sección notablemente mayor (hasta 1.5m de canto).',
        st: [
            { l: 'Sección',     v: '30x60 - 40x80 cm'  },
            { l: "f'c",         v: '35 MPa'             },
            { l: 'Arm. princ.', v: 'Ø16-25mm fy500'    },
            { l: 'Estribos',    v: 'Ø8-10mm @ 10-15cm' }
        ]
    },
    foundation: {
        n: 'Cimentación Profunda',
        s: 'Pilotes y Losa de Cimentación',
        d: 'Sistema de cimentación profunda con pilotes perforados de gran diámetro (Ø80-120cm) y losa de cimentación gruesa (2.0-3.0m). Los pilotes penetran hasta 20-30m de profundidad en estratos resistentes. La losa de cimentación (mat foundation) distribuye cargas uniformemente, controlando asientos diferenciales. Encamisado metálico provisional en pilotes en suelos blandos.',
        st: [
            { l: 'Pilotes',     v: 'Ø80-120cm, L=25m'  },
            { l: 'Losa',        v: 'e=2.0-3.0m HA'     },
            { l: 'Capacidad',   v: '500-2000 t/pilote'  },
            { l: 'Asentamiento',v: '< 25mm diferencial' }
        ]
    },
    core: {
        n: 'Núcleo Rígido Central',
        s: 'Sistema de Tubos y Núcleo (Tube-in-Tube)',
        d: 'Núcleo central de hormigón armado que alberga circulaciones verticales (ascensores, escaleras de emergencia, prumadas de instalaciones). En edificios de gran altura, el núcleo actúa como una viga vertical en ménsula empotrada en la cimentación. Su rigidez torsional y lateral es esencial para el comportamiento dinámico de la torre. El acoplamiento con los muros perimetrales forma el sistema tubo-en-tubo.',
        st: [
            { l: 'Tipo',        v: 'Muro núcleo HA'     },
            { l: 'Espesor',     v: '30-50 cm'           },
            { l: 'Función',     v: 'Cántilever vertical' },
            { l: 'Sistema',     v: 'Tube-in-Tube'       }
        ]
    },
    frame: {
        n: 'Pórticos Perimetrales',
        s: 'Sistema de Pórticos de Fachada',
        d: 'Pórticos de hormigón armado en el perímetro de la torre que trabajan en conjunto con el núcleo central. Las columnas perimetrales y las vigas de fachada forman un "tubo" exterior que resiste cargas de viento y sismo por acción de marco. La interacción tubo exterior - núcleo interior optimiza el comportamiento ante cargas laterales, reduciendo derivas y esfuerzos en el núcleo.',
        st: [
            { l: 'Función',     v: 'Tubo exterior'      },
            { l: 'Módulo',      v: 'Columna-viga-losa'  },
            { l: 'Deriva',      v: 'H/500 (viento)'     },
            { l: 'Período',     v: 'T₁ ≈ 0.1·N segundos'}
        ]
    },
    ground_floor: {
        n: 'Planta Baja y Acceso',
        s: 'Nivel 0 — Zona de Máxima Carga',
        d: 'Nivel de acceso principal con lobby, recepción y locales comerciales. Las columnas y muros de este nivel soportan la carga acumulada de todos los pisos superiores: cargas muertas + sobrecargas + sismo. Las secciones son máximas y el hormigón es de mayor resistencia. Las uniones con la losa de cimentación deben transferir momentos de volcamiento de toda la torre.',
        st: [
            { l: 'Uso',         v: 'Lobby / Comercial'  },
            { l: 'Carga axial', v: 'Máxima de la torre' },
            { l: 'Sección col.',v: '80x80 cm (máx.)'   },
            { l: "f'c",         v: '50 MPa (máximo)'   }
        ]
    },
    typical_floor: {
        n: 'Plantas Tipo Residenciales',
        s: 'Niveles 2 al 19 — Uso Residencial',
        d: 'Plantas tipo con apartamentos residenciales de diseño repetido. La repetición de la planta estructural permite reutilizar encofrados (sistema trepante o deslizante), reduciendo costos y tiempo de construcción. Instalaciones de plomería, electricidad y HVAC se concentran en ductos verticales del núcleo. La tabiquería interior no es estructural, permitiendo flexibilidad de distribución.',
        st: [
            { l: 'Uso',         v: 'Residencial'        },
            { l: 'Altura libre',v: '2.60 - 2.80 m'      },
            { l: 'Encofrado',   v: 'Sistema trepante'   },
            { l: 'Ciclo',       v: '5-7 días/piso'      }
        ]
    },
    top_floor: {
        n: 'Planta Ático y Penthouse',
        s: 'Niveles Superiores — Remate de Torre',
        d: 'Último piso habitable y cubierta técnica. El ático puede incluir amenidades (terraza, piscina, gimnasio) con cargas adicionales que deben considerarse en el diseño de los pilares superiores. La sala de máquinas de ascensores y el depósito de agua generan cargas concentradas. El remate arquitectónico (coronamiento) puede incluir estructura metálica ligera.',
        st: [
            { l: 'Amenidades',  v: 'Terraza / Piscina'  },
            { l: 'Sala máq.',   v: 'Ascensores + HVAC'  },
            { l: 'Remate',      v: 'Estructura ligera'  },
            { l: 'Depósito',    v: 'Agua: 2-5 m³/piso' }
        ]
    },
    load_path: {
        n: 'Camino de Carga — Torre Alta',
        s: 'Trayectoria Vertical y Lateral',
        d: 'Cargas verticales: Uso → Losa → Viga → Columna/Muro → Losa cimentación → Pilotes → Suelo. Cargas laterales (sismo/viento): Fachada → Losa (diafragma) → Muros corte/Núcleo → Losa cimentación → Pilotes. En torres altas el momento de volcamiento es crítico: los pilotes de esquina trabajan a tracción bajo sismo severo, requiriendo verificación cuidadosa.',
        st: [
            { l: 'Vertical',    v: 'Losa→Viga→Col→Pilote'},
            { l: 'Lateral',     v: 'Diafragma→Núcleo'   },
            { l: 'Volcamiento', v: 'Pilotes a tracción'  },
            { l: 'Redundancia', v: 'Doble sistema'       }
        ]
    },
    seismic: {
        n: 'Sistema Antisísmico — Torre Alta',
        s: 'Diseño Sísmico para Estructuras de Gran Altura',
        d: 'Torres de más de 20 pisos requieren análisis dinámico modal espectral o tiempo-historia no lineal. El período fundamental es T₁ ≈ 0.1·N segundos (N=número de pisos). Los modos superiores contribuyen significativamente a las fuerzas sísmicas. Sistema dual (núcleo + pórticos) garantiza redundancia: si el núcleo plastifica, los pórticos actúan como segunda línea de defensa.',
        st: [
            { l: 'Análisis',    v: 'Modal espectral'    },
            { l: 'Período T₁',  v: '≈ 2.0-2.5 seg'     },
            { l: 'Sistema',     v: 'Dual (núcleo+pórt.)' },
            { l: 'Norma',       v: 'ACI 318 / ASCE 7'   }
        ]
    },
    facade: {
        n: 'Sistema de Fachada',
        s: 'Cerramiento y Muro Cortina',
        d: 'Sistema de fachada con muro cortina de vidrio y aluminio anclado a la estructura principal. Los anclajes deben absorber las deformaciones inter-piso (drift) sin dañar el cerramiento. La fachada transmite cargas de viento a los forjados. El diseño térmico controla el coeficiente de transmitancia (U < 1.0 W/m²K) para eficiencia energética. Vidrio laminado de seguridad con protección solar.',
        st: [
            { l: 'Tipo',        v: 'Muro cortina'       },
            { l: 'Deriva adm.', v: 'H/200 sin daño'     },
            { l: 'Viento',      v: 'Presión/succión'    },
            { l: 'Vidrio',      v: 'Laminado 6+6 mm'    }
        ]
    },
    stair: {
        n: 'Núcleo de Circulación Vertical',
        s: 'Escaleras, Ascensores y Ductos',
        d: 'Escaleras de emergencia y ascensores integrados en el núcleo rígido central. Las escaleras deben cumplir normativa de evacuación (ancho mínimo 1.20m, huella 28cm, contrahuella 18cm). Los huecos de ascensor forman parte del núcleo estructural, contribuyendo a la rigidez lateral. Presurizacion de escaleras en emergencia para edificios de más de 10 plantas.',
        st: [
            { l: 'Escaleras',   v: '2 vías emergencia'  },
            { l: 'Ascensores',  v: '3-6 cabinas'        },
            { l: 'Presurización',v: 'NBE-CPI / NFPA'   },
            { l: 'Evacuación',  v: '< 3 min/piso'       }
        ]
    }
};
