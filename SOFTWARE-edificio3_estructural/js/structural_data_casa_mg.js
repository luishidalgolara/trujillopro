/* ═══════════════════════════════════════════════════════════════════════
   STRUCTURAL_DATA_CASA_MG.JS
   Datos estructurales y mapeo de nodos para la Vivienda Casa MG
   Basado en análisis del GLB: casa_mg.glb
   ═══════════════════════════════════════════════════════════════════════

   SISTEMA ESTRUCTURAL:
   ├── Muros de hormigón armado / albañilería confinada
   ├── Losa de entrepiso y cubierta
   ├── Cadenas y vigas de amarre
   ├── Pilares de confinamiento
   └── Cimentación: zapatas corridas + radier

   NORMAS DE DISEÑO:
   ├── NCh 433 (sísmica Chile)
   ├── NCh 430 (hormigón armado)
   └── ACI 318-19
═══════════════════════════════════════════════════════════════════════ */

// ── Clasificación de nodos por nombre del GLB ──
function getCasaMGCategory(nodeName) {
    if (!nodeName) return 'other';
    const n = nodeName.toLowerCase();

    if (n.includes('found') || n.includes('zapata') || n.includes('radier') ||
        n.includes('ciment') || n.includes('base')  || n.includes('pilote'))  return 'foundation';

    if (n.includes('wall')  || n.includes('muro')   || n.includes('parede') ||
        n.includes('tabiq') || n.includes('cerrami'))                          return 'wall';

    if (n.includes('column') || n.includes('pilar') || n.includes('col_') ||
        n.includes('cadena') || n.includes('confinamiento'))                   return 'column';

    if (n.includes('slab')  || n.includes('losa')   || n.includes('floor') ||
        n.includes('laje')  || n.includes('entrepiso'))                        return 'slab';

    if (n.includes('roof')  || n.includes('techo')  || n.includes('cubierta') ||
        n.includes('coberta')|| n.includes('azotea'))                          return 'roof';

    if (n.includes('beam')  || n.includes('viga')   || n.includes('amarre') ||
        n.includes('dintel') || n.includes('cadena'))                          return 'beam';

    if (n.includes('stair') || n.includes('escal')  || n.includes('step'))    return 'stair';

    if (n.includes('window')|| n.includes('door')   || n.includes('ventana') ||
        n.includes('puerta') || n.includes('fachada')|| n.includes('facade'))  return 'facade';

    return 'other';
}

// ── Nivel de la vivienda ──
function getCasaMGFloor(nodeName) {
    if (!nodeName) return 0;
    const n = nodeName.toLowerCase();
    if (n.includes('found') || n.includes('zapata') || n.includes('radier')) return -1;
    if (n.includes('piso_0') || n.includes('terreo') || n.includes('ground') ||
        n.includes('pb') || n.includes('planta_b'))                            return 0;
    if (n.includes('piso_1') || n.includes('1_piso') || n.includes('primer')) return 1;
    if (n.includes('roof')   || n.includes('techo')  || n.includes('cubierta'))return 2;
    return 0;
}

// ── Información de componentes ──
const CASA_MG_PART_INFO = {
    all: {
        n: 'Casa MG — Vivienda Unifamiliar',
        s: 'Sistema Estructural de Muros y Losas',
        d: 'Vivienda unifamiliar de hormigón armado con sistema de muros portantes y losas de entrepiso. Los muros resisten tanto cargas verticales (gravitacionales) como horizontales (sísmicas y viento). La cimentación consiste en zapatas corridas bajo los muros principales y radier de hormigón. Diseñada conforme NCh 433 para zona sísmica alta, con alta rigidez lateral y comportamiento dúctil.',
        st: [
            { l: 'Sistema',     v: 'Muros portantes'   },
            { l: 'Material',    v: 'H.A. f\'c 25 MPa'  },
            { l: 'Cimentación', v: 'Zapatas + Radier'  },
            { l: 'Norma',       v: 'NCh 433 / ACI 318' }
        ]
    },
    columns: {
        n: 'Pilares y Cadenas de Confinamiento',
        s: 'Elementos Verticales de Confinamiento',
        d: 'Pilares de hormigón armado que confinan los muros de albañilería y actúan como elementos de borde en los muros estructurales. Trabajan principalmente a compresión y flexión, absorbiendo las cargas concentradas en los bordes de los vanos. Las cadenas horizontales y verticales forman una malla que da ductilidad al sistema y evita el colapso frágil durante sismos.',
        st: [
            { l: 'Sección',     v: '20x20 — 25x25 cm'  },
            { l: 'Concreto',    v: 'f\'c 25 MPa'        },
            { l: 'Acero',       v: 'A630-420H fy=420'  },
            { l: 'Estribos',    v: 'Ø8mm @ 10-20 cm'  }
        ]
    },
    walls: {
        n: 'Muros Portantes y Tabiques',
        s: 'Sistema de Muros Estructurales',
        d: 'Muros de hormigón armado que constituyen el principal sistema resistente de la vivienda. Actúan simultáneamente como elementos de gravedad (soportan losas y cubierta) y como muros de corte (resisten fuerzas sísmicas horizontales). El espesor mínimo estructural es de 15 cm con mallas de refuerzo bidireccional. Los muros perimetrales también cumplen función de aislamiento térmico y acústico.',
        st: [
            { l: 'Espesor',     v: '15-20 cm'           },
            { l: 'Refuerzo',    v: 'Mallas Ø8-10 mm'   },
            { l: 'Función',     v: 'Gravedad + Sísmica' },
            { l: 'Norma',       v: 'NCh 433 / NCh 430' }
        ]
    },
    shear_walls: {
        n: 'Muros de Corte',
        s: 'Resistencia Sísmica Lateral',
        d: 'Muros de hormigón armado específicamente dimensionados para resistir las fuerzas horizontales producidas por el sismo, conforme NCh 433. Su alta rigidez lateral controla las derivas entre pisos, protegiendo los tabiques y las instalaciones. Los elementos de borde confinados con estribos cerrados mejoran la ductilidad y evitan el pandeo del refuerzo bajo carga cíclica.',
        st: [
            { l: 'Espesor',     v: '15-20 cm'           },
            { l: 'Deriva',      v: '< 0.5% NCh 433'    },
            { l: 'Elem. borde', v: 'Confinado dúctil'  },
            { l: 'Concreto',    v: 'f\'c 25 MPa'        }
        ]
    },
    slabs: {
        n: 'Losas de Entrepiso',
        s: 'Sistema de Piso Horizontal',
        d: 'Losas macizas de hormigón armado que forman los entrepisos de la vivienda. Actúan como diafragmas rígidos que distribuyen las fuerzas sísmicas horizontales hacia los muros de corte. El espesor típico es de 12-15 cm. La armadura bidireccional garantiza la distribución de momentos en ambas direcciones. Las losas transmiten las cargas de uso a los muros portantes perimetrales.',
        st: [
            { l: 'Espesor',     v: '12-15 cm'           },
            { l: 'Refuerzo',    v: 'Ø10 @ 20 cm (2dir)' },
            { l: 'Sobrecarga',  v: '200 kg/m² habitable'},
            { l: 'Diafragma',   v: 'Rígido sísmico'    }
        ]
    },
    roof: {
        n: 'Cubierta y Techo',
        s: 'Cierre Estructural Superior',
        d: 'Losa de cubierta o estructura de techo que cierra la vivienda por la parte superior. Puede ser una losa plana de hormigón armado con impermeabilización multicapa, o una estructura liviana de madera o acero con cubierta de tejas o planchas metálicas. Incluye las pendientes necesarias para la evacuación de aguas lluvias. Las cargas de nieve y viento son consideradas en el diseño.',
        st: [
            { l: 'Tipo',        v: 'Losa plana / Teja'  },
            { l: 'Pendiente',   v: 'Mín. 2% (plana)'   },
            { l: 'Impermeab.',  v: 'Membrana EPDM/PVC'  },
            { l: 'Carga viento',v: 'NCh 432 considerada'}
        ]
    },
    beams: {
        n: 'Vigas y Cadenas de Amarre',
        s: 'Elementos Horizontales de Amarre',
        d: 'Vigas de amarre y cadenas horizontales que conectan los muros y pilares, formando un sistema continuo que evita el desplazamiento relativo entre elementos verticales durante el sismo. Los dinteles sobre vanos de puertas y ventanas son vigas de menor luz que deben resistir la redistribución de cargas. Las vigas de fundación conectan las zapatas y rigidizan el sistema de cimentación.',
        st: [
            { l: 'Tipo',        v: 'Cadena + Dintel'   },
            { l: 'Sección',     v: '20x20 — 30x20 cm' },
            { l: 'Función',     v: 'Amarre sísmico'    },
            { l: 'Concreto',    v: 'f\'c 25 MPa'        }
        ]
    },
    foundation: {
        n: 'Cimentación — Zapatas y Radier',
        s: 'Sistema de Cimentación Superficial',
        d: 'Sistema de cimentación superficial compuesto por zapatas corridas bajo los muros portantes y radier de hormigón simple o armado. Las zapatas corridas distribuyen las cargas de los muros sobre el terreno de fundación. El radier proporciona una superficie de trabajo y evita la humedad ascendente. La profundidad de fundación es de 60-80 cm bajo el nivel de terreno natural, garantizando apoyo en suelo competente.',
        st: [
            { l: 'Tipo',        v: 'Zapatas + Radier'  },
            { l: 'Profundidad', v: '60-80 cm'          },
            { l: 'Zapata ancho',v: '40-60 cm'          },
            { l: 'Radier',      v: 'H.S. e=10 cm'      }
        ]
    },
    core: {
        n: 'Núcleo de Circulación',
        s: 'Zona de Escalera y Servicios',
        d: 'Zona central de la vivienda que concentra la escalera (si es de dos pisos), los baños y las instalaciones de servicios. Los muros de este núcleo aportan rigidez torsional al conjunto al ser elementos de alta rigidez ubicados en posición central. Las instalaciones sanitarias, eléctricas y de climatización se coordinan en este sector para minimizar recorridos y facilitar el mantenimiento.',
        st: [
            { l: 'Función',     v: 'Circulación + IISS' },
            { l: 'Rigidez',     v: 'Torsional central'  },
            { l: 'Contenido',   v: 'Escalera + Baños'  },
            { l: 'Muros',       v: 'H.A. 15-20 cm'     }
        ]
    },
    frame: {
        n: 'Sistema de Pórticos',
        s: 'Pórticos de Hormigón Armado',
        d: 'En zonas donde los muros portantes no son continuos, se utilizan pórticos de pilares y vigas de hormigón armado para transmitir las cargas gravitacionales. Los pórticos también aportan ductilidad al sistema cuando están correctamente detallados con estribos cerrados en las zonas de rótulas plásticas. El sistema combinado muros-pórticos es típico de viviendas en Chile y ofrece buena redundancia estructural.',
        st: [
            { l: 'Sistema',     v: 'Pilares + Vigas HA' },
            { l: 'Ductilidad',  v: 'Rótulas plásticas' },
            { l: 'Conexión',    v: 'Nudo monolítico'   },
            { l: 'Norma',       v: 'NCh 433 / ACI 318' }
        ]
    },
    ground_floor: {
        n: 'Planta Baja',
        s: 'Nivel Principal de la Vivienda',
        d: 'Planta baja de la vivienda donde se ubican los espacios de uso común: living, comedor, cocina y dependencias de servicio. Los muros del primer nivel soportan la mayor acumulación de cargas. La losa de piso puede ser sobre el terreno (radier) o losa elevada. La altura libre típica es de 2.40-2.60 m. El sismo genera las mayores fuerzas en este nivel por la acumulación de masas superiores.',
        st: [
            { l: 'Altura libre',v: '2.40-2.60 m'       },
            { l: 'Uso',         v: 'Living / Cocina'   },
            { l: 'Losa piso',   v: 'Radier o elevada'  },
            { l: 'Muros',       v: 'Sección máxima'    }
        ]
    },
    typical_floor: {
        n: 'Segundo Nivel',
        s: 'Planta Alta de la Vivienda',
        d: 'Segundo nivel de la vivienda donde se ubican los dormitorios y baños. La losa de entrepiso separa ambos niveles y actúa como diafragma rígido para las cargas sísmicas. Los muros del segundo nivel tienen menor sección que los inferiores al acumular menos carga. La escalera debe diseñarse con cuidado para no crear irregularidades en la distribución de rigidez que puedan generar efectos torsionales.',
        st: [
            { l: 'Altura libre',v: '2.40-2.60 m'       },
            { l: 'Uso',         v: 'Dormitorios/Baños' },
            { l: 'Losa',        v: 'Entrepiso 12-15 cm'},
            { l: 'Muros',       v: 'Sección reducida'  }
        ]
    },
    top_floor: {
        n: 'Cubierta y Remate',
        s: 'Nivel Superior y Cierre',
        d: 'Cubierta de la vivienda que cierra el último nivel habitable. Puede incluir una terraza plana o una cubierta inclinada de tejas o planchas. La losa de cubierta debe ser estanca y contar con aislación térmica para reducir el consumo energético. Las cargas de nieve en zonas como la cordillera deben ser consideradas. Los muros de este nivel tienen la menor sección al acumular mínimas cargas.',
        st: [
            { l: 'Tipo',        v: 'Plana o inclinada' },
            { l: 'Aislación',   v: 'Térmica + acústica'},
            { l: 'Impermeab.',  v: 'Membrana + protect.'},
            { l: 'Muros',       v: 'Sección mínima'    }
        ]
    },
    load_path: {
        n: 'Camino de Carga',
        s: 'Trayectoria de Transmisión de Fuerzas',
        d: 'Secuencia de transmisión en sistema de muros portantes: Carga de uso → Losa de entrepiso → Muro portante → Zapata corrida → Terreno de fundación. Para cargas sísmicas: Fuerza sísmica → Losa (diafragma rígido) → Muros de corte → Zapatas (tracción/compresión) → Terreno. La continuidad de los muros desde la cubierta hasta la fundación es fundamental para la correcta transmisión de cargas.',
        st: [
            { l: 'Vertical',    v: 'Losa→Muro→Zapata'  },
            { l: 'Horizontal',  v: 'Losa→Muro corte'   },
            { l: 'Diafragma',   v: 'Losa rígida'       },
            { l: 'Fundación',   v: 'Zapata corrida'    }
        ]
    },
    seismic: {
        n: 'Sistema Antisísmico',
        s: 'Diseño Sismorresistente NCh 433',
        d: 'Sistema de resistencia sísmica basado en muros de hormigón armado distribuidos en planta, conforme NCh 433 Of. 1996. Los muros de corte en ambas direcciones ortogonales garantizan resistencia lateral equilibrada y minimizan la torsión en planta. Las losas actúan como diafragmas rígidos que distribuyen las fuerzas sísmicas. Filosofía de diseño: sismo frecuente sin daño estructural, sismo de diseño con daño reparable, sismo máximo sin colapso.',
        st: [
            { l: 'Norma',       v: 'NCh 433 Of. 1996'  },
            { l: 'Sistema',     v: 'Muros de corte HA' },
            { l: 'Diafragma',   v: 'Losas de entrepiso'},
            { l: 'Deriva',      v: '< 0.5% h/piso'    }
        ]
    },
    facade: {
        n: 'Fachada y Cerramientos',
        s: 'Sistema de Envolvente',
        d: 'Elementos de fachada que cierran la vivienda y la protegen del ambiente exterior. Pueden ser muros de albañilería no estructural, paneles de madera, revestimientos de zinc o planchas de fibrocemento. Las ventanas y puertas crean discontinuidades en los muros que deben ser reforzadas con dinteles y pilastras de confinamiento. El diseño de la fachada debe considerar el aislamiento térmico para cumplir con la normativa de eficiencia energética.',
        st: [
            { l: 'Tipo',        v: 'Muro + Revestimiento'},
            { l: 'Aislación',   v: 'Térmica NCh 853'   },
            { l: 'Vanos',       v: 'Con dintel HA'     },
            { l: 'Acabado',     v: 'Estuco / Planchas' }
        ]
    },
    stair: {
        n: 'Escalera Interior',
        s: 'Circulación Vertical',
        d: 'Escalera interior que conecta los niveles de la vivienda. Puede ser de hormigón armado, madera o acero. La escalera debe diseñarse considerando su interacción con la estructura principal, evitando que actúe como un elemento de arriostramiento involuntario que genere efectos de columna corta. Las zancas de hormigón armado son las más comunes en vivienda y deben estar apoyadas correctamente en los muros o losas de cada nivel.',
        st: [
            { l: 'Material',    v: 'H.A. / Madera'    },
            { l: 'Huella',      v: '28 cm mín.'       },
            { l: 'Contrahuella',v: '18 cm máx.'       },
            { l: 'Inclinación', v: '30°-35° típico'   }
        ]
    }
};
