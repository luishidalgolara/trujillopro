/* ═══════════════════════════════════════════════════════════════════════
   STRUCTURAL_DATA_CAMPO.JS
   Datos estructurales y mapeo de nodos para el Edificio Campo Dourique
   Basado en análisis del GLB: estrutural_edificio_campo_dourique.glb
   ═══════════════════════════════════════════════════════════════════════

   SISTEMA ESTRUCTURAL:
   ├── Losas planas de concreto armado
   ├── Núcleo central rígido (caja de escaleras + ascensor)
   ├── Muros de rigidización perimetral
   ├── Pilares intermedios
   └── Cimentación: losa de cimentación + pilotes

   NORMAS DE DISEÑO:
   ├── NCh 433 (sísmica Chile)
   ├── ACI 318-19
   └── Eurocódigo 2 / EC8
═══════════════════════════════════════════════════════════════════════ */

// ── Clasificación de nodos por nombre real del GLB ──
function getCampoCategory(nodeName) {
    if (!nodeName) return 'other';
    const n = nodeName.toLowerCase();

    // Fundación / Pilotes / Losa de cimentación
    if (n.includes('pilote') || n.includes('fundac') || n.includes('sapata') ||
        n.includes('radier') || n.includes('losa_c') || n.includes('found'))  return 'foundation';

    // Núcleo rígido (caja de escaleras / ascensor)
    if (n.includes('nucleo') || n.includes('nucleo') || n.includes('core') ||
        n.includes('escal')  || n.includes('ascens') || n.includes('caja'))   return 'core';

    // Muros de corte / Muros de rigidización
    if (n.includes('muro')   || n.includes('shear')  || n.includes('wall') ||
        n.includes('parede') || n.includes('rigidiz'))                        return 'shear_wall';

    // Pilares / Columnas
    if (n.includes('pilar')  || n.includes('coluna') || n.includes('column') ||
        n.includes('col_')   || n.includes('pil_'))                           return 'column';

    // Losas de piso
    if (n.includes('laje')   || n.includes('losa')   || n.includes('slab') ||
        n.includes('piso')   || n.includes('floor')  || n.includes('pavto')) return 'slab';

    // Cobertura / Techo
    if (n.includes('coberta')|| n.includes('coberi') || n.includes('tecto') ||
        n.includes('roof')   || n.includes('cobert') || n.includes('cubert')) return 'roof';

    // Vigas
    if (n.includes('viga')   || n.includes('beam')   || n.includes('viga_'))  return 'beam';

    return 'other';
}

// ── Nivel del edificio por nombre de nodo ──
function getCampoFloor(nodeName) {
    if (!nodeName) return -1;
    const n = nodeName.toLowerCase();

    if (n.includes('fundac') || n.includes('radier') ||
        n.includes('pilote') || n.includes('sapata'))         return -1; // Subsuelo
    if (n.includes('terreo') || n.includes('t_rreo') ||
        n.includes('piso_0') || n.includes('r_c'))             return 0;  // Planta baja
    if (n.includes('piso_1') || n.includes('1_pav') ||
        n.includes('2_pav')  || n.startsWith('2'))             return 1;  // 1º / 2º piso
    if (n.includes('piso_2') || n.includes('3_pav') ||
        n.startsWith('3'))                                     return 2;  // 3º piso
    if (n.includes('piso_3') || n.includes('4_pav') ||
        n.startsWith('4'))                                     return 3;  // 4º piso
    if (n.includes('piso_4') || n.includes('5_pav') ||
        n.startsWith('5'))                                     return 4;  // 5º piso
    if (n.includes('atico')  || n.includes('atic') ||
        n.includes('_tico'))                                   return 5;  // Ático
    if (n.includes('coberta')|| n.includes('cobert') ||
        n.includes('tecto')  || n.includes('roof'))            return 6;  // Cubierta
    if (n.includes('cx_')    || n.includes('agua') ||
        n.includes('reserv'))                                  return 7;  // Caja de agua
    return -1;
}

// ── Información de paneles para cada componente ──
const CAMPO_PART_INFO = {
    all: {
        n: 'Edificio Campo Dourique — Projeto Estrutural',
        s: 'Sistema de Losas Planas con Núcleo Central',
        d: 'Edificio residencial de concreto armado con sistema de losas planas y núcleo central rígido. La estructura resiste cargas verticales mediante losas planas apoyadas en pilares y muros perimetrales, mientras que el núcleo central y los muros de rigidización garantizan la resistencia sísmica. Diseñado conforme NCh 433 y ACI 318-19. Cimentación profunda con pilotes y losa de cimentación sobre estrato competente.',
        st: [
            { l: 'Sistema',     v: 'Losas + Núcleo'  },
            { l: 'Material',    v: 'Concreto Armado'  },
            { l: 'Resistencia', v: "f'c 30 MPa"       },
            { l: 'Normas',      v: 'NCh 433 / ACI'   }
        ]
    },
    columns: {
        n: 'Pilares Estructurales',
        s: 'Elementos Verticales de Carga',
        d: 'Pilares de concreto armado que transmiten las cargas de las losas planas hasta la cimentación. En el sistema de losas planas los pilares trabajan principalmente a compresión con flexión biaxial, sin vigas intermedias. La conexión losa-pilar es crítica para resistir el punzonamiento. Sección variable en altura: mayor en niveles inferiores por acumulación de cargas.',
        st: [
            { l: 'Sección',     v: '25x50 - 40x70 cm' },
            { l: 'Concreto',    v: "f'c 30 MPa"        },
            { l: 'Acero',       v: 'CA-50 fy=420 MPa'  },
            { l: 'Estribos',    v: 'Ø8mm @ 10-15 cm'  }
        ]
    },
    walls: {
        n: 'Paredes Perimetrales',
        s: 'Elementos de Envolvente Estructural',
        d: 'Paredes de concreto armado perimetrales que aportan rigidez lateral complementaria al núcleo. Trabajan conjuntamente con los pilares y el núcleo para distribuir las fuerzas horizontales de sismo y viento. Espesor mínimo 15 cm con mallas de refuerzo bidireccional. Su disposición perimetral reduce los efectos de torsión en planta.',
        st: [
            { l: 'Espesor',     v: '15-20 cm'          },
            { l: 'Refuerzo',    v: 'Mallas Ø8-10mm'   },
            { l: 'Función',     v: 'Rigidez perimetral' },
            { l: 'Norma',       v: 'NCh 433 / EC8'    }
        ]
    },
    shear_walls: {
        n: 'Muros de Corte',
        s: 'Sistema de Resistencia Sísmica',
        d: 'Muros de concreto armado dimensionados específicamente para resistir fuerzas horizontales sísmicas conforme NCh 433. Actúan como ménsulas verticales empotradas en la cimentación. Su elevada rigidez lateral controla las derivas entre pisos, protegiendo los elementos no estructurales y las instalaciones. Los elementos de borde confinados mejoran la ductilidad.',
        st: [
            { l: 'Rigidez',     v: '15-25x pórticos'  },
            { l: 'Elem. borde', v: 'Confinado dúctil'  },
            { l: 'Deriva',      v: '< 0.5% NCh 433'   },
            { l: 'Concreto',    v: "f'c 30 MPa"        }
        ]
    },
    slabs: {
        n: 'Losas Planas',
        s: 'Sistema de Piso sin Vigas',
        d: 'Losas planas de concreto armado que transfieren cargas directamente a los pilares sin vigas intermedias, optimizando la altura libre de los pisos. Espesor típico 20-25 cm para los vanos del edificio. La zona de punzonamiento en el contorno del pilar debe reforzarse con capiteles o armadura especial. Diafragmas rígidos que distribuyen fuerzas horizontales a los elementos verticales.',
        st: [
            { l: 'Espesor',     v: '20-25 cm'          },
            { l: 'Vanos',       v: '5-7 m típicos'     },
            { l: 'Sobrecarga',  v: '200-300 kg/m²'     },
            { l: 'Punzon.',     v: 'Verificado ACI 421' }
        ]
    },
    roof: {
        n: 'Cubierta — Losa de Techo',
        s: 'Cierre Estructural Superior',
        d: 'Losa superior de concreto armado que cierra la estructura y sirve como base para impermeabilización, aislamiento térmico y equipos de cubierta. Incorpora pendiente mínima para evacuación de aguas. La carga de la caja de agua debe considerarse en el cálculo de los pilares superiores. Sistema de impermeabilización multicapa con membrana bituminosa o PVC.',
        st: [
            { l: 'Espesor',     v: '20-22 cm'          },
            { l: 'Impermeab.',  v: 'Membrana + protect.' },
            { l: 'Pendiente',   v: 'Mín. 1.5%'         },
            { l: 'Carga extra', v: 'Equipos + AACC'    }
        ]
    },
    beams: {
        n: 'Vigas de Borde y Banda',
        s: 'Elementos Horizontales Complementarios',
        d: 'En el sistema de losas planas, las vigas de borde y de banda refuerzan el perímetro y los ejes principales. Las vigas de borde confieren rigidez al contorno y reducen las deflexiones perimetrales. Las vigas banda (anchas y bajas, embutidas en la losa) permiten reducir el espesor de la losa en zonas de mayor carga y mejoran el comportamiento sísmico como diafragma.',
        st: [
            { l: 'Tipo',        v: 'Borde + Banda'     },
            { l: 'Sección',     v: '50x25 - 80x20 cm' },
            { l: 'Función',     v: 'Rigidez perimetral' },
            { l: 'Concreto',    v: "f'c 30 MPa"        }
        ]
    },
    foundation: {
        n: 'Fundación — Losa + Pilotes',
        s: 'Cimentación Profunda Mixta',
        d: 'Sistema de cimentación profunda compuesto por losa de cimentación continua apoyada sobre pilotes de concreto armado. La losa de cimentación distribuye uniformemente las cargas entre los pilotes, reduciendo los asentamientos diferenciales. Los pilotes transfieren las cargas hasta el estrato portante. Capacidad de carga diseñada para resistir tanto cargas gravitacionales como el efecto de sismo (levantamiento en pilotes de tracción).',
        st: [
            { l: 'Tipo',        v: 'Losa + Pilotes C.A.' },
            { l: 'Losa esp.',   v: '60-80 cm'            },
            { l: 'Pilotes',     v: 'Ø40-60 cm'           },
            { l: 'Profund.',    v: '10-18 m'             }
        ]
    },
    core: {
        n: 'Núcleo Central Rígido',
        s: 'Centro de Rigidez e Instalaciones',
        d: 'Núcleo de concreto armado que alberga la caja de escaleras y el hueco del ascensor. Constituye el principal elemento resistente a cargas horizontales del edificio, actuando como una viga en voladizo empotrada en la cimentación. Su ubicación central minimiza la excentricidad entre el centro de masas y el centro de rigidez, reduciendo los efectos de torsión sísmica.',
        st: [
            { l: 'Espesor',     v: '20-25 cm'           },
            { l: 'Función',     v: 'Rigidez torsional'  },
            { l: 'Contenido',   v: 'Escalera + Ascensor'},
            { l: 'Rigidez',     v: 'Principal del edif.' }
        ]
    },
    frame: {
        n: 'Sistema de Pórticos',
        s: 'Pórticos Pilar-Losa (Flat Plate)',
        d: 'El sistema de losas planas con pilares forma un sistema tipo "flat plate frame" donde la conexión losa-pilar actúa como un nudo semi-rígido. Este sistema es eficiente para cargas gravitacionales pero limitado en resistencia sísmica, por lo que se complementa con el núcleo y los muros de corte. La ductilidad del sistema depende del detalle de armadura en la zona de punzonamiento.',
        st: [
            { l: 'Sistema',     v: 'Flat Plate Frame'  },
            { l: 'Conexión',    v: 'Losa-Pilar directa' },
            { l: 'Ductilidad',  v: 'μ ≥ 2 (con muros)' },
            { l: 'Norma',       v: 'ACI 318 Cap. 8'   }
        ]
    },
    ground_floor: {
        n: 'Planta Baja — Nivel de Acceso',
        s: 'Planta Baja — Nivel de Acceso',
        d: 'Primer nivel al nivel del terreno. Los pilares tienen su sección máxima en este nivel por acumulación de todas las cargas superiores. La losa del piso puede ser losa sobre el terreno o losa elevada sobre viga de cimentación. Incluye los arranques de todos los elementos verticales desde la losa de cimentación. Altura libre típica 2.80-3.20 m para accesos y locales comunes.',
        st: [
            { l: 'Altura libre',v: '2.80-3.20 m'        },
            { l: 'Pilares',     v: 'Sección máxima'      },
            { l: 'Carga',       v: 'Acumulada máxima'   },
            { l: 'Losa',        v: 'Plana s/terreno'    }
        ]
    },
    typical_floor: {
        n: 'Pisos Tipo — Residenciales',
        s: 'Niveles Repetitivos',
        d: 'Pisos intermedios con planta repetida que optimizan el proceso constructivo. La repetición de la losa plana y los pilares permite reutilizar las cimbras, reduciendo costos y tiempo. Altura libre residencial de 2.60-2.80 m. Los tabiques interiores no son estructurales, proporcionando flexibilidad en la distribución de los apartamentos. Las instalaciones corren embutidas en la losa.',
        st: [
            { l: 'Altura libre',v: '2.60-2.80 m'        },
            { l: 'Uso',         v: 'Residencial'         },
            { l: 'Tabiques',    v: 'No estructurales'   },
            { l: 'Economía',    v: 'Cimbra reutilizada' }
        ]
    },
    top_floor: {
        n: 'Ático y Cubierta',
        s: 'Niveles Superiores',
        d: 'Último nivel habitable (ático) y cubierta plana con sistema de impermeabilización. El ático puede presentar retranqueo respecto a la fachada para favorecer el asoleamiento y reducir la presión de viento. La cubierta incorpora el depósito de agua, equipos de climatización y acceso de mantenimiento. Los pilares del ático tienen su menor sección al acumular menos carga.',
        st: [
            { l: 'Ático',       v: 'Retranqueado'        },
            { l: 'Cubierta',    v: 'Plana impermeab.'   },
            { l: 'Caja agua',   v: 'C.A. calculada'     },
            { l: 'Pilares',     v: 'Sección mínima'     }
        ]
    },
    load_path: {
        n: 'Camino de Carga',
        s: 'Trayectoria de Transmisión de Fuerzas',
        d: 'Secuencia de transmisión en sistema de losas planas: Carga de uso → Losa plana → Punzonamiento en pilar → Pilar → Losa de cimentación → Pilotes → Estrato portante. La losa actúa como diafragma rígido para cargas horizontales: Fuerza sísmica → Losa (diafragma) → Núcleo central + Muros de corte → Losa de cimentación → Pilotes (tracción/compresión).',
        st: [
            { l: 'Vertical',    v: 'Losa→Pilar→Pilote'  },
            { l: 'Horizontal',  v: 'Losa→Núcleo→Pilote'  },
            { l: 'Diafragma',   v: 'Losa plana rígida'  },
            { l: 'Punzón.',     v: 'Zona crítica losa'  }
        ]
    },
    seismic: {
        n: 'Sistema Antisísmico',
        s: 'Diseño Sismorresistente NCh 433',
        d: 'Sistema de resistencia sísmica basado en núcleo central rígido y muros de corte perimetrales, conforme NCh 433 Of. 1996 (sísmica Chile). Las losas planas actúan como diafragmas rígidos distribuyendo las fuerzas sísmicas. El núcleo absorbe la mayor parte de la energía sísmica. Filosofía de diseño: sismo frecuente sin daño, sismo de diseño con daño reparable, sismo máximo sin colapso.',
        st: [
            { l: 'Norma',       v: 'NCh 433 / ACI 318' },
            { l: 'Sistema',     v: 'Núcleo + Muros'    },
            { l: 'Diafragma',   v: 'Losas planas'      },
            { l: 'Deriva',      v: '< 0.5% h/piso'    }
        ]
    }
};