/* ═══════════════════════════════════════════════════════════════════════
   STRUCTURAL_DATA_RIBEIRO.JS
   Datos estructurales y mapeo de nodos para el Edificio Ribeiro
   Basado en análisis real del GLB: 22 meshes, 6 niveles, 1 material
   ═══════════════════════════════════════════════════════════════════════

   ESTRUCTURA DEL MODELO:
   ├── t_rreo          → Planta baja (terreo)
   ├── 2º_pavto        → 2do piso
   ├── 3º_pavto        → 3er piso
   ├── _tico           → Ático
   ├── cobertura       → Cubierta/Techo
   └── cx_d_agua       → Caja de agua (remate)

   TIPOS DE ELEMENTOS (sufijo del nombre de nodo):
   ├── _adas / _ares   → Losas / Pilares
   ├── ajeS / igas     → Vigas principales / Vigas secundarias
   └── _i__es          → Pilotes / Cimentación
═══════════════════════════════════════════════════════════════════════ */

// ── Función para clasificar nodos por nombre real del GLB ──
function getRibeiroCategory(nodeName) {
    if (!nodeName) return 'other';
    const n = nodeName.toLowerCase();

    // Pilotes / Cimentación
    if (n.includes('_i__es') || n.includes('pilote') || n.includes('fundac')) return 'foundation';

    // Losas (_adas)
    if (n.includes('_adas') || n.includes('laje') || n.includes('slab'))  return 'slab';

    // Pilares / Columnas (_ares)
    if (n.includes('_ares') || n.includes('pilar') || n.includes('coluna')) return 'column';

    // Vigas principales (ajeS)
    if (n.includes('ajes') || n.includes('viga_p')) return 'beam';

    // Vigas secundarias (igas)
    if (n.includes('igas') || n.includes('viga')) return 'beam_secondary';

    return 'other';
}

// ── Función para obtener nivel del edificio por nombre de nodo ──
function getRibeiroFloor(nodeName) {
    if (!nodeName) return -1;
    const n = nodeName.toLowerCase();

    if (n.startsWith('t_rreo')       || n.includes('terreo'))     return 0; // Planta baja
    if (n.startsWith('2')            || n.includes('2_pavto'))    return 1; // 2º piso
    if (n.startsWith('3')            || n.includes('3_pavto'))    return 2; // 3er piso
    if (n.startsWith('_tico')        || n.includes('atico'))      return 3; // Ático
    if (n.startsWith('cobertura')    || n.includes('cobert'))     return 4; // Cubierta
    if (n.startsWith('cx__d__gua')   || n.includes('cx_d_agua'))  return 5; // Caja de agua
    return -1;
}

// ── Información de paneles para cada componente ──
const RIBEIRO_PART_INFO = {
    all: {
        n: 'Edificio Ribeiro — Proyecto Estrutural',
        s: 'Sistema Estrutural de Concreto Armado',
        d: 'Edificio residencial de concreto armado con sistema de losas planas, pilares y vigas. Estrutura de 5 pavimentos más cubierta y caja de agua. El sistema transmite cargas verticales mediante pilares desde cada losa hasta la cimentación. Los pilares se distribuyen regularmente en planta, optimizando los vanos de las losas. La cubierta incorpora elementos de cobertura y remate con caja de agua.',
        st: [
            { l: 'Sistema',    v: 'Losas + Pilares' },
            { l: 'Material',   v: 'Concreto Armado'  },
            { l: 'Niveles',    v: '5 pavimentos'     },
            { l: 'Resistencia',v: "f'c 28 MPa"       }
        ]
    },
    columns: {
        n: 'Pilares Estruturais',
        s: 'Elementos Verticais de Carga',
        d: 'Pilares de concreto armado que transmitem as cargas das losas e vigas até a fundação. Seção retangular típica 20x40 cm a 30x60 cm conforme carga acumulada. O reforço longitudinal resiste compressão/tração, enquanto os estribos confinam o concreto e evitam flambagem. Continuidade total desde a fundação até a cobertura.',
        st: [
            { l: 'Seção',      v: '20x40 - 30x60 cm' },
            { l: 'Concreto',   v: "f'c 28 MPa"        },
            { l: 'Aço',        v: 'CA-50 / CA-60'     },
            { l: 'Estribos',   v: 'Ø8mm @ 10-20cm'   }
        ]
    },
    walls: {
        n: 'Paredes Estructurales',
        s: 'Elementos de Rigidez Lateral',
        d: 'Paredes de concreto armado que aportan rigidez lateral al conjunto. Espesor típico 15-20 cm con mallas de refuerzo horizontal y vertical. Ubicadas en núcleos de circulación (escaleras/ascensores) y perímetro, contribuyen a resistir cargas de viento y sismo. Trabajan en conjunto con los pilares formando el sistema de resistencia lateral.',
        st: [
            { l: 'Espesor',    v: '15-20 cm'          },
            { l: 'Refuerzo',   v: 'Mallas bidirec.'   },
            { l: 'Función',    v: 'Rigidez lateral'   },
            { l: 'Ubicación',  v: 'Núcleos + Perim.'  }
        ]
    },
    shear_walls: {
        n: 'Muros de Corte',
        s: 'Sistema de Resistencia Sísmica',
        d: 'Elementos de concreto armado especialmente dimensionados para resistir fuerzas horizontales de sismo y viento. Actúan como ménsulas verticales empotradas en la cimentación. Su elevada rigidez lateral controla las derivas entre pisos, protegiendo elementos no estructurales. Elementos de borde confinados mejoran la ductilidad y capacidad de disipación de energía.',
        st: [
            { l: 'Rigidez',    v: '10-20x pórticos'  },
            { l: 'Elem. borde',v: 'Confinado dúctil'  },
            { l: 'Deriva',     v: '< 0.5% altura'     },
            { l: 'Norma',      v: 'NBR 6118 / EC8'   }
        ]
    },
    slabs: {
        n: 'Lajes de Piso (Losas)',
        s: 'Elementos Horizontais de Carga',
        d: 'Lajes de concreto armado que transmitem cargas verticais aos pilares e vigas. Espessura típica 12-18 cm para vãos de 4-6 m. Sobrecarga de uso: 150-300 kg/m² (residencial). Armadura principal resiste flexão nos dois sentidos; armadura secundária controla retração e temperatura. Flechas máximas L/250 imediata, L/400 longa duração.',
        st: [
            { l: 'Espessura',  v: '12-18 cm'          },
            { l: 'Sobrecarga', v: '150-300 kg/m²'     },
            { l: 'Armadura',   v: 'Ø8-12mm @ 15-20cm' },
            { l: 'Flecha',     v: 'L/250 - L/400'     }
        ]
    },
    roof: {
        n: 'Cobertura e Laje de Teto',
        s: 'Cubierta Estructural',
        d: 'Laje superior que fecha a estrutura e suporta a caixa d\'água e equipamentos de cobertura. Incorpora impermeabilização e isolamento térmico. O remate inclui platibanda perimetral e acesso pela escada de emergência. A caixa d\'água de concreto armado aporta carga concentrada que deve ser considerada no dimensionamento dos pilares superiores.',
        st: [
            { l: 'Caixa água', v: 'C.A. + reservatório' },
            { l: 'Impermeab.', v: 'Manta + proteção'    },
            { l: 'Cobertura',  v: 'Laje plana/inclinada' },
            { l: 'Platibanda', v: 'h ≥ 0.90 m'          }
        ]
    },
    beams: {
        n: 'Vigas Principais',
        s: 'Elementos Horizontais de Transmissão',
        d: 'Vigas de concreto armado que coletam as cargas das lajes e as transmitem aos pilares. Seção retangular 15x40 a 20x50 cm, embutidas na espessura da laje (vigas faixa) ou salientes (vigas invertidas). A armadura longitudinal inferior resiste tração por flexão positiva; a superior resiste flexão negativa nos apoios. Estribos resistem ao cisalhamento.',
        st: [
            { l: 'Seção',      v: '15x40 - 20x50 cm' },
            { l: 'Concreto',   v: "f'c 28 MPa"        },
            { l: 'Arm. long.', v: 'Ø12-20mm CA-50'   },
            { l: 'Estribos',   v: 'Ø6.3-8mm'         }
        ]
    },
    foundation: {
        n: 'Fundação — Pilotes',
        s: 'Cimentação Profunda',
        d: 'Sistema de fundação profunda com pilotes de concreto armado que transferem as cargas da superestrutura para camadas de solo resistente. Cada pilar apoia em um bloco de coroamento que distribui as cargas para os pilotes. Capacidade de carga: 50-200 ton por pilote segundo comprimento e diâmetro. Profundidade típica 8-15 m até estrato portante.',
        st: [
            { l: 'Tipo',       v: 'Pilotes C.A.'      },
            { l: 'Diâmetro',   v: '30-50 cm'          },
            { l: 'Capacidade', v: '50-200 ton/pilote'  },
            { l: 'Profund.',   v: '8-15 m'            }
        ]
    },
    core: {
        n: 'Núcleo Rígido',
        s: 'Centro de Rigidez do Edificio',
        d: 'Conjunto de paredes e pilares centrais que formam o núcleo rígido do edifício. Concentra as instalações verticais (escada, elevador, prumadas de instalações). Sua elevada rigidez torsional e lateral é essencial para o comportamento sísmico do edifício. O núcleo deve coincidir com o centro de rigidez da planta para evitar efeitos de torção.',
        st: [
            { l: 'Função',     v: 'Rigidez torsional'  },
            { l: 'Conteúdo',   v: 'Escada + Elevador'  },
            { l: 'Rigidez',    v: 'Máxima da estrutura' },
            { l: 'Localiz.',   v: 'Centro de planta'   }
        ]
    },
    frame: {
        n: 'Pórticos Resistentes',
        s: 'Sistema de Pórticos Pilar-Viga',
        d: 'Sistema de pórticos formado por pilares e vigas com ligações rígidas (nós monolíticos de concreto armado). Resiste cargas verticais e horizontais por flexão composta nos elementos. A ductilidade dos nós é fundamental para o comportamento sísmico: rotulas plásticas devem formar-se nas vigas, não nos pilares (principio forte-fraco). Coeficiente de ductilidade μ ≥ 3.',
        st: [
            { l: 'Ligações',   v: 'Rígidas monolíticas' },
            { l: 'Ductilidade',v: 'μ ≥ 3'              },
            { l: 'Mecanismo',  v: 'Rótulas em vigas'    },
            { l: 'Norma',      v: 'NBR 6118'            }
        ]
    },
    ground_floor: {
        n: 'Pavimento Térreo',
        s: 'Planta Baixa — Nível de Acesso',
        d: 'Primeiro pavimento ao nível do terreno, com laje sobre o solo ou elevada. Altura livre típica 2.70-3.00 m. Inclui os arranques dos pilares desde as sapatas ou blocos de coroamento. As cargas são maiores neste nível pela acumulação de todos os pavimentos superiores. Pilares têm seção máxima neste nível.',
        st: [
            { l: 'Altura livre', v: '2.70-3.00 m'      },
            { l: 'Pilares',      v: 'Seção máxima'      },
            { l: 'Carga',        v: 'Máx. acumulada'   },
            { l: 'Fundação',     v: 'Blocos + Pilotes'  }
        ]
    },
    typical_floor: {
        n: 'Pavimentos Tipo',
        s: 'Níveis Residenciais Repetitivos',
        d: 'Pavimentos intermediários com planta repetida (2º e 3º pavimento). Altura livre 2.60-2.80 m para uso residencial. A repetição de plantas permite reutilizar formas e armaduras, reduzindo custos. Instalações hidráulicas, elétricas e de gás embutidas nas lajes e paredes. Tabiques internos não estruturais permitem flexibilidade de layouts.',
        st: [
            { l: 'Altura livre', v: '2.60-2.80 m'      },
            { l: 'Uso',          v: 'Residencial'       },
            { l: 'Economia',     v: 'Forma reutilizada' },
            { l: 'Tabiques',     v: 'Não estruturais'   }
        ]
    },
    top_floor: {
        n: 'Ático e Cobertura',
        s: 'Pavimentos Superiores',
        d: 'Ático (último piso habitável) e cobertura com caixa d\'água. O ático pode ter pé-direito diferenciado e terraço privativo. A cobertura deve garantir estanqueidade com sistema de impermeabilização adequado. A caixa d\'água de concreto armado deve ser calculada considerando pressão hidrostática e sobrecarga de manutenção.',
        st: [
            { l: 'Ático',       v: 'Último habitável'  },
            { l: 'Cobertura',   v: 'Impermeabilizada'  },
            { l: 'Caixa água',  v: 'C.A. calculada'   },
            { l: 'Terraço',     v: 'Acesso + manutenção' }
        ]
    },
    load_path: {
        n: 'Caminho de Carga',
        s: 'Trajetória de Transmissão de Forças',
        d: 'Sequência de transmissão: Carga de uso → Laje → Viga → Pilar → Bloco de coroamento → Pilote → Solo resistente. Cada elemento deve ser dimensionado para resistir as cargas acumuladas. A continuidade estrutural é essencial: evitar descontinuidades bruscas de rigidez. Quanto mais abaixo, maior a carga axial nos pilares.',
        st: [
            { l: 'Sequência',  v: 'Laje→Viga→Pilar→Pilote' },
            { l: 'Acumulação', v: 'Crescente para baixo'   },
            { l: 'Continuidade',v: 'Sem descontinuidades'  },
            { l: 'Redundância', v: 'Caminhos alternativos' }
        ]
    },
    seismic: {
        n: 'Sistema Antissísmico',
        s: 'Projeto Sismorresistente',
        d: 'Conjunto de elementos e critérios para resistência a sismos conforme NBR 15421 e Eurocódigo 8. Filosofia: sismos leves sem dano, moderados com dano reparável, severos sem colapso. Elementos chave: pilares com alta ductilidade, vigas com rotulas plásticas, lajes como diafragmas rígidos. Regularidade em planta e elevação reduz efeitos de torção.',
        st: [
            { l: 'Norma',      v: 'NBR 15421 / EC8'   },
            { l: 'Filosofia',  v: 'Dano→Não colapso'  },
            { l: 'Diafragma',  v: 'Lajes rígidas'     },
            { l: 'Ductilidade',v: 'μ ≥ 3 (pilares)'  }
        ]
    }
};
