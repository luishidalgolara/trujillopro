/* ═══════════════════════════════════════════════════════════════════════
   STRUCTURAL_DATA_FAERAC.JS
   Datos estructurales y mapeo de nodos para la Estructura de Acero FAERAC
   Modelo GLB: faerac.glb — Estructura metálica, ~3 niveles
   ═══════════════════════════════════════════════════════════════════════

   FILOSOFÍA DE COLORES:
   ► Se respetan los materiales originales del GLB sin sobreescribir colores.
   ► Solo se ajustan roughness/metalness para realismo del acero.
   ► Los tipos se clasifican por nombre de nodo para highlight selectivo.
═══════════════════════════════════════════════════════════════════════ */

// ── Clasificar nodos por nombre del GLB ──
function getFaeracCategory(nodeName) {
    if (!nodeName) return 'other';
    const n = nodeName.toLowerCase();

    if (n.includes('column') || n.includes('pillar') || n.includes('col_')
        || n.includes('pilar') || n.includes('hss') || n.includes('ipe')
        || n.includes('chs')   || n.includes('rhs'))              return 'column';

    if (n.includes('beam')  || n.includes('viga') || n.includes('joist')
        || n.includes('w_')  || n.includes('ipe_') || n.includes('hea')
        || n.includes('heb') || n.includes('ipn'))                return 'beam';

    if (n.includes('brace') || n.includes('arriostr') || n.includes('diagonal')
        || n.includes('cross') || n.includes('lat_'))             return 'brace';

    if (n.includes('plate') || n.includes('gusset') || n.includes('chapa')
        || n.includes('conn') || n.includes('joint') || n.includes('nodo'))
                                                                   return 'connection';

    if (n.includes('slab')  || n.includes('deck')  || n.includes('losa')
        || n.includes('floor') || n.includes('forjado'))          return 'slab';

    if (n.includes('roof')  || n.includes('techo') || n.includes('cubierta')
        || n.includes('cover'))                                    return 'roof';

    if (n.includes('found') || n.includes('base') || n.includes('plinth')
        || n.includes('anchor') || n.includes('ciment'))          return 'foundation';

    if (n.includes('stair') || n.includes('escal') || n.includes('railing')
        || n.includes('handrail'))                                 return 'stair';

    return 'other';
}

// ── Obtener nivel por nombre de nodo ──
function getFaeracFloor(nodeName) {
    if (!nodeName) return -1;
    const n = nodeName.toLowerCase();

    if (n.includes('ground') || n.includes('piso0') || n.includes('nivel0')
        || n.includes('planta_baja') || n.includes('terreo') || n.includes('_0_')) return 0;

    if (n.includes('first')  || n.includes('piso1') || n.includes('nivel1')
        || n.includes('_1_') || n.includes('1st'))                                  return 1;

    if (n.includes('second') || n.includes('piso2') || n.includes('nivel2')
        || n.includes('_2_') || n.includes('2nd'))                                  return 2;

    if (n.includes('roof')   || n.includes('top')   || n.includes('techo')
        || n.includes('cubierta'))                                                   return 3;

    return -1;
}

// ── Info de paneles por componente — Estructura de Acero ──
const FAERAC_PART_INFO = {
    all: {
        n: 'Estructura de Acero FAERAC',
        s: 'Sistema Estructural Metálico',
        d: 'Estructura de acero con perfiles laminados en caliente (IPE, HEA/HEB, HSS/CHS). Sistema de pórticos resistentes a momento con arriostramientos concéntricos para resistencia lateral. Las uniones soldadas y empernadas garantizan continuidad estructural. Losas colaborantes de acero-hormigón completan el sistema horizontal. Diseño optimizado para relación resistencia/peso, con alta ductilidad sísmica.',
        st: [
            { l: 'Sistema',     v: 'Pórticos + Arriost.' },
            { l: 'Material',    v: 'Acero S275/S355'     },
            { l: 'Niveles',     v: '3 plantas'           },
            { l: 'Resistencia', v: 'fy 275–355 MPa'      }
        ]
    },
    columns: {
        n: 'Pilares Metálicos',
        s: 'Elementos Verticales de Acero',
        d: 'Pilares de acero con perfiles laminados HEA/HEB o tubulares HSS/CHS. Sección diseñada para resistir compresión axial y momento flector biaxial. La esbeltez está controlada para evitar pandeo global y local. Las placas base de anclaje transfieren esfuerzos a la cimentación mediante pernos de anclaje químico o mecánico. Continuidad mediante empalmes soldados o atornillados.',
        st: [
            { l: 'Perfil',      v: 'HEA/HEB 200-300'    },
            { l: 'Acero',       v: 'S355 (fy 355 MPa)'  },
            { l: 'Esbeltez',    v: 'λ < 150'            },
            { l: 'Unión base',  v: 'Placa + pernos M24' }
        ]
    },
    walls: {
        n: 'Cerramientos Metálicos',
        s: 'Paneles de Fachada y Particiones',
        d: 'Paneles de cerramiento metálico y particiones interiores de chapa conformada en frío. No estructurales — función de cerramiento y compartimentación. Anclados a la estructura principal mediante perfiles omega y tornillería de acero inoxidable. Acabado galvanizado o lacado para protección frente a corrosión.',
        st: [
            { l: 'Tipo',        v: 'Chapa conformada'   },
            { l: 'Espesor',     v: '0.6 – 1.5 mm'      },
            { l: 'Función',     v: 'Cerramiento'        },
            { l: 'Protección',  v: 'Galvanizado Z275'   }
        ]
    },
    shear_walls: {
        n: 'Arriostramientos — Sistema Sísmico',
        s: 'Resistencia Lateral por Diagonales',
        d: 'Arriostramientos concéntricos con diagonales de acero (perfiles angulares, tubulares o doble T) que forman el sistema primario de resistencia lateral. Trabajan a tracción y compresión alternada durante el sismo. Los nudos de arriostramiento (gusset plates) son elementos críticos: diseñados con la capacidad real de la diagonal para garantizar rotura dúctil.',
        st: [
            { l: 'Tipo',        v: 'Concéntrico en X'   },
            { l: 'Perfil',      v: 'CHS/SHS 100-150'    },
            { l: 'Gusset',      v: 'Placa con bisagra'  },
            { l: 'Ductilidad',  v: 'Clase 1 EC3/EC8'    }
        ]
    },
    slabs: {
        n: 'Losas Colaborantes (Deck)',
        s: 'Forjado Mixto Acero-Hormigón',
        d: 'Losas de chapa nervada colaborante con capa de compresión de hormigón (e=8-12cm). Los conectores de cortante (shear studs) soldados a las vigas garantizan la acción mixta. La chapa nervada actúa como encofrado perdido durante la puesta en obra y como armadura positiva en servicio. Sistema eficiente que reduce peso propio vs. losa maciza.',
        st: [
            { l: 'Chapa',       v: 'Nervada h=60mm'     },
            { l: 'Hormigón',    v: "f'c 25 MPa, e=8cm"  },
            { l: 'Conectores',  v: 'Shear studs Ø19mm'  },
            { l: 'Peso propio', v: '2.8 – 3.5 kN/m²'   }
        ]
    },
    roof: {
        n: 'Cubierta Metálica',
        s: 'Estructura de Cubierta y Remate',
        d: 'Cubierta con correas de acero (perfil Z o C conformado en frío) y panel sándwich o chapa trapezoidal. Las correas se apoyan en las vigas principales de la cubierta. Pendiente mínima 3% para drenaje. La impermeabilización se resuelve con membrana bituminosa o panel sándwich con núcleo de lana mineral para aislamiento térmico y acústico.',
        st: [
            { l: 'Correas',     v: 'Perfil Z-200'       },
            { l: 'Panel',       v: 'Sándwich 100mm'     },
            { l: 'Pendiente',   v: '≥ 3%'               },
            { l: 'Carga viento',v: 'qb = 0.52 kN/m²'   }
        ]
    },
    beams: {
        n: 'Vigas Metálicas',
        s: 'Elementos Horizontales de Transmisión',
        d: 'Vigas de acero laminado (IPE, HEA, HEB) o soldadas (vigas en cajón) que reciben las cargas de los forjados y las transmiten a los pilares. En sistema mixto, trabajan solidariamente con la losa mediante conectores de cortante. Las vigas principales de fachada también absorben cargas de viento transferidas por los paneles de cerramiento.',
        st: [
            { l: 'Perfil',      v: 'IPE 270-400'        },
            { l: 'Acero',       v: 'S275 (fy 275 MPa)'  },
            { l: 'Flecha',      v: 'L/300 – L/500'      },
            { l: 'Uniones',     v: 'Soldadas + Tornillos'}
        ]
    },
    foundation: {
        n: 'Cimentación y Placas Base',
        s: 'Anclaje Estructura-Cimentación',
        d: 'Sistema de zapatas de hormigón armado con placas base de acero soldadas a los pies de pilar. Los pernos de anclaje (M20-M30, acero 8.8) transmiten fuerzas de compresión, tracción y cortante a la cimentación. Las vigas de atado conectan las zapatas formando una cimentación arriostrada que controla asientos diferenciales.',
        st: [
            { l: 'Zapata',      v: 'HA 25 MPa'          },
            { l: 'Placa base',  v: 'Acero S355, e≥25mm' },
            { l: 'Pernos',      v: 'M24-M30, Cl. 8.8'  },
            { l: 'Mortero',     v: 'Sin retracción'      }
        ]
    },
    connection: {
        n: 'Uniones y Nudos Estructurales',
        s: 'Conexiones Soldadas y Atornilladas',
        d: 'Nudos de unión entre vigas y pilares: rígidos (soldados en taller, atornillados en obra), articulados (solo alma) o semi-rígidos. Las soldaduras de penetración completa garantizan transmisión de momentos. Los tornillos de alta resistencia (HR 10.9) se pretensan a torque controlado. Las placas gusset en arriostramientos absorben fuerzas de tracción/compresión de las diagonales.',
        st: [
            { l: 'Tornillos',   v: 'M20-M24, HR 10.9'  },
            { l: 'Soldadura',   v: 'Penetración compl.' },
            { l: 'Tipo nudo',   v: 'Rígido / Articulado'},
            { l: 'Control',     v: 'Ultrasonidos / END'  }
        ]
    },
    core: {
        n: 'Núcleo Rígido Metálico',
        s: 'Centro de Rigidez del Edificio',
        d: 'Núcleo formado por arriostramientos y pilares centrales que concentra la rigidez lateral. Alberga el núcleo de comunicaciones verticales (escalera, ascensor). Su posición debe coincidir con el centro de rigidez de la planta para minimizar efectos de torsión. En edificios de acero el núcleo puede ser metálico o de hormigón armado (núcleo híbrido).',
        st: [
            { l: 'Función',     v: 'Rigidez torsional'  },
            { l: 'Contenido',   v: 'Escalera + Ascensor' },
            { l: 'Rigidez',     v: 'Máxima estructura'  },
            { l: 'Tipo',        v: 'Metálico arriostrado'}
        ]
    },
    frame: {
        n: 'Pórticos Resistentes a Momento',
        s: 'MRF — Moment Resisting Frame',
        d: 'Pórticos con uniones rígidas pilar-viga que resisten cargas laterales por flexión. En zonas sísmicas, los pórticos MRF proporcionan ductilidad mediante rotulas plásticas en las vigas (panel zone). El criterio de diseño es "viga débil, pilar fuerte": la plastificación ocurre primero en las vigas para proteger los pilares. Factor de comportamiento q=4-6 (EC8).',
        st: [
            { l: 'Tipo',        v: 'MRF Especial (SMRF)' },
            { l: 'Ductilidad',  v: 'q = 4–6 (EC8)'      },
            { l: 'Plastific.',  v: 'Zona de vigas'       },
            { l: 'Norma',       v: 'EC3 / EC8 / AISC'   }
        ]
    },
    brace: {
        n: 'Arriostramientos Diagonales',
        s: 'Sistema de Arriostramiento Concéntrico',
        d: 'Diagonales de acero tubular o angular que forman el sistema de arriostramiento concéntrico (CBF). Resisten fuerzas sísmicas y de viento por acción axial (tracción/compresión). En sistema en X, solo las diagonales en tracción son efectivas bajo sismo. El diseño sigue el principio de capacidad: las placas gusset y las uniones se dimensionan para la resistencia real de la diagonal.',
        st: [
            { l: 'Tipo',        v: 'CBF concéntrico'    },
            { l: 'Perfil',      v: 'CHS/SHS 100-200'    },
            { l: 'Esbeltez',    v: 'λ = 50–150'         },
            { l: 'Disipación',  v: 'Tracción diagonal'  }
        ]
    },
    stair: {
        n: 'Escaleras Metálicas',
        s: 'Sistema de Comunicación Vertical',
        d: 'Escaleras de estructura metálica con zancas de perfil UPN o chapa plegada. Los peldaños pueden ser de rejilla de acero galvanizado, chapa lagrimada o con acabado en madera. Las barandillas se fijan a las zancas mediante tornillería. El arriostramiento horizontal de las mesetas garantiza la estabilidad del conjunto y transmite cargas horizontales al núcleo.',
        st: [
            { l: 'Zancas',      v: 'UPN 160-200'        },
            { l: 'Peldaños',    v: 'Rejilla / Chapa'    },
            { l: 'Barandilla',  v: 'Tubo SHS 40x40'     },
            { l: 'Acabado',     v: 'Galvanizado + Pintura'}
        ]
    },
    ground_floor: {
        n: 'Planta Baja',
        s: 'Nivel 0 — Acceso y Cimentación',
        d: 'Nivel inferior con mayor carga axial acumulada en pilares. Las placas base de anclaje transmiten esfuerzos a las zapatas de hormigón. El forjado sanitario o losa sobre terreno completa el nivel. Los pilares tienen la mayor sección en este nivel. Las uniones viga-pilar son rígidas para resistir el momento de empotramiento.',
        st: [
            { l: 'Pilares',     v: 'Sección máxima'     },
            { l: 'Placa base',  v: 'e ≥ 25mm + pernos'  },
            { l: 'Forjado',     v: 'Losa sobre terreno' },
            { l: 'Carga',       v: 'Máxima acumulada'   }
        ]
    },
    typical_floor: {
        n: 'Plantas Tipo',
        s: 'Niveles Intermedios Repetitivos',
        d: 'Plantas intermedias con forjado mixto acero-hormigón. La prefabricación y el montaje en seco permiten velocidades de construcción de 1 planta por semana. Los servicios mecánicos, eléctricos y de fontanería discurren por el interior de las vigas (vigas alveolares o con taladros) o por el espacio del falso techo. Altura libre típica 2.80-3.20m.',
        st: [
            { l: 'Altura libre', v: '2.80 – 3.20 m'     },
            { l: 'Forjado',      v: 'Deck colaborante'  },
            { l: 'Instalac.',    v: 'Integradas en viga' },
            { l: 'Montaje',      v: '~1 planta/semana'  }
        ]
    },
    top_floor: {
        n: 'Cubierta y Nivel Superior',
        s: 'Remate Estructural',
        d: 'Nivel de cubierta con correas y panel sándwich. Los pilares de cubierta tienen sección reducida respecto a los inferiores. La cubierta soporta cargas de nieve, viento (succión y presión), instalaciones (HVAC, placas solares) y mantenimiento. El zuncho perimetral (viga de coronación) arriosta los pilares en cabeza y soporta el cerramiento de fachada superior.',
        st: [
            { l: 'Correas',      v: 'Z-200 @ 2m'        },
            { l: 'Panel',        v: 'Sándwich e=100mm'   },
            { l: 'Nieve',        v: 'sk = 0.4 kN/m²'    },
            { l: 'Zuncho',       v: 'IPE 200 perimetral' }
        ]
    },
    load_path: {
        n: 'Camino de Carga — Acero',
        s: 'Trayectoria de Transmisión de Fuerzas',
        d: 'Secuencia de transmisión en estructura metálica: Carga de uso → Deck colaborante → Vigas secundarias → Vigas principales → Pilares → Placa base → Pernos anclaje → Zapata hormigón → Suelo. Las diagonales de arriostramiento añaden un camino alternativo para cargas laterales. La redundancia estructural es clave: ante el fallo de un elemento, las cargas se redistribuyen.',
        st: [
            { l: 'Vertical',    v: 'Deck→Viga→Pilar'    },
            { l: 'Lateral',     v: 'Losa→Arriostr.→Cim.' },
            { l: 'Redundancia', v: 'Doble camino'        },
            { l: 'Monitoreo',   v: 'Sensores en pilares' }
        ]
    },
    seismic: {
        n: 'Sistema Antisísmico — Acero',
        s: 'Diseño por Capacidad EC8/AISC 341',
        d: 'La estructura de acero aprovecha su alta ductilidad inherente para disipar energía sísmica mediante deformación plástica controlada. Filosofía: "daño controlado en elementos dúctiles, protección de elementos frágiles". Elementos dúctiles (vigas, diagonales en tracción) absorben energía; elementos frágiles (uniones, pilares) se protegen por diseño de capacidad. Factor q=4-6 según EC8.',
        st: [
            { l: 'Norma',       v: 'EC8 / AISC 341'     },
            { l: 'Factor q',    v: '4 – 6'              },
            { l: 'Disipación',  v: 'Rotulas plásticas'  },
            { l: 'Ductilidad',  v: 'Alta (Clase H)'     }
        ]
    }
};
