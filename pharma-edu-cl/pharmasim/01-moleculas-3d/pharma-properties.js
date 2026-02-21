/**
 * PHARMASIM — pharma-properties.js
 * Base de datos de fármacos con propiedades fisicoquímicas y farmacológicas reales
 */

window.PHARMA_DB = [
    {
        id: 'aspirin',
        name: 'Aspirina',
        iupac: 'Ácido 2-(acetiletoxi)benzoico',
        formula: 'C₉H₈O₄',
        category: 'analgesico',
        categoryLabel: 'Analgésico / AINE',
        mw: 180.16,
        logP: 1.19,
        pka: 3.5,
        solubility: 3.3,
        tpsa: 63.6,
        hbd: 1, hba: 4, rb: 3,
        atoms: 21,
        adme: { absorcion: 80, distribucion: 55, metabolismo: 70, excrecion: 60, biodisponibilidad: 68 },
        mechanism: 'Inhibe de forma <strong>irreversible</strong> las ciclooxigenasas COX-1 y COX-2, bloqueando la síntesis de prostaglandinas y tromboxanos. A dosis bajas inhibe preferentemente COX-1 plaquetaria.',
        modifications: [
            { label: 'Agregar -OH', icon: '🟠', effect: 'Aumenta solubilidad acuosa (+120%), pero reduce biodisponibilidad oral por mayor ionización a pH gástrico.', type: 'neutral', changes: { solubility: 4.2, logP: 0.8, mw: 196 } },
            { label: 'Agregar -NH₂', icon: '🔵', effect: 'Aumenta carácter básico (pKa → 9.2), mejora absorción intestinal, puede crear metabolitos activos en hígado.', type: 'positive', changes: { pka: 9.2, logP: 0.6, mw: 195 } },
            { label: 'Reemplazar -CH₃ → -CF₃', icon: '🟣', effect: 'Aumenta lipofilicidad (LogP +1.5), mejora penetración tisular pero dificulta metabolismo hepático y aumenta t½.', type: 'neutral', changes: { logP: 2.7, mw: 234, solubility: 0.8 } },
            { label: 'Eliminar -OCOCH₃', icon: '🔴', effect: 'Genera ácido salicílico puro. Pierde el grupo acetilo que confiere la inhibición irreversible de COX-1.', type: 'negative', changes: { mw: 138, logP: 1.0, hba: 3 } }
        ],
        color: 0x00d4ff,
        // Definición 3D simplificada: átomos y enlaces
        structure: {
            atoms: [
                // Anillo bencénico (0-5)
                {el:'C', x:0,     y:1.4,  z:0, r:0.77},
                {el:'C', x:1.21,  y:0.7,  z:0, r:0.77},
                {el:'C', x:1.21,  y:-0.7, z:0, r:0.77},
                {el:'C', x:0,     y:-1.4, z:0, r:0.77},
                {el:'C', x:-1.21, y:-0.7, z:0, r:0.77},
                {el:'C', x:-1.21, y:0.7,  z:0, r:0.77},
                // Carboxilo (6-8)
                {el:'C', x:0,     y:2.9,  z:0, r:0.77},
                {el:'O', x:1.1,   y:3.6,  z:0, r:0.66},
                {el:'O', x:-1.1,  y:3.6,  z:0, r:0.66},
                {el:'H', x:-1.8,  y:4.0,  z:0, r:0.31},
                // Acetoxi (10-13)
                {el:'O', x:2.4,   y:1.4,  z:0, r:0.66},
                {el:'C', x:3.5,   y:2.1,  z:0, r:0.77},
                {el:'O', x:4.6,   y:1.4,  z:0, r:0.66},
                {el:'C', x:3.5,   y:3.5,  z:0, r:0.77},
                // H en anillo (14-19)
                {el:'H', x:2.15,  y:-1.25,z:0, r:0.31},
                {el:'H', x:0,     y:-2.5, z:0, r:0.31},
                {el:'H', x:-2.15, y:-1.25,z:0, r:0.31},
                {el:'H', x:-2.15, y:1.25, z:0, r:0.31},
                // H del metilo (18-20)
                {el:'H', x:2.8,   y:4.1,  z:0.6,  r:0.31},
                {el:'H', x:4.2,   y:4.0,  z:0,    r:0.31},
                {el:'H', x:2.8,   y:4.1,  z:-0.6, r:0.31},
            ],
            bonds: [
                [0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1], // anillo aromatic
                [0,6,1],[6,7,2],[6,8,1],[8,9,1],                 // carboxilo
                [1,10,1],[10,11,1],[11,12,2],[11,13,1],          // acetoxi
                [13,18,1],[13,19,1],[13,20,1],                   // metilo H
                [2,14,1],[3,15,1],[4,16,1],[5,17,1]              // H aromatic
            ]
        }
    },
    {
        id: 'paracetamol',
        name: 'Paracetamol',
        iupac: 'N-(4-hidroxifenil)acetamida',
        formula: 'C₈H₉NO₂',
        category: 'analgesico',
        categoryLabel: 'Analgésico / Antipirético',
        mw: 151.16,
        logP: 0.46,
        pka: 9.38,
        solubility: 14.0,
        tpsa: 49.3,
        hbd: 2, hba: 2, rb: 2,
        atoms: 20,
        adme: { absorcion: 90, distribucion: 45, metabolismo: 85, excrecion: 55, biodisponibilidad: 88 },
        mechanism: 'Mecanismo no completamente elucidado. Se cree que actúa inhibiendo una variante de <strong>COX-3</strong> (central) y modulando el sistema endocannabinoide. No inhibe COX-1/COX-2 periféricas, por lo que no tiene efecto antiinflamatorio significativo.',
        modifications: [
            { label: 'Agregar -Cl', icon: '🟢', effect: 'Aumenta lipofilicidad (LogP +1.2), mejor penetración al SNC pero posible hepatotoxicidad incrementada.', type: 'negative', changes: { logP: 1.66, mw: 185.6, tpsa: 49.3 } },
            { label: 'Cambiar -OH → -OMe', icon: '🟠', effect: 'Pierde capacidad de glucuronidación en hígado, altera perfil metabólico significativamente.', type: 'negative', changes: { logP: 0.96, hbd: 1, mw: 165.2 } },
            { label: 'Agregar -F orto', icon: '🔵', effect: 'Efecto electrónico que aumenta acidez del -OH fenólico (pKa 8.1), mejora ionización a pH fisiológico.', type: 'positive', changes: { pka: 8.1, mw: 169.15, logP: 0.8 } }
        ],
        color: 0x10b981,
        structure: {
            atoms: [
                {el:'C', x:0,     y:1.4,  z:0, r:0.77},
                {el:'C', x:1.21,  y:0.7,  z:0, r:0.77},
                {el:'C', x:1.21,  y:-0.7, z:0, r:0.77},
                {el:'C', x:0,     y:-1.4, z:0, r:0.77},
                {el:'C', x:-1.21, y:-0.7, z:0, r:0.77},
                {el:'C', x:-1.21, y:0.7,  z:0, r:0.77},
                {el:'O', x:0,     y:2.8,  z:0, r:0.66},
                {el:'H', x:0,     y:3.7,  z:0, r:0.31},
                {el:'N', x:0,     y:-2.8, z:0, r:0.75},
                {el:'H', x:-0.9,  y:-3.3, z:0, r:0.31},
                {el:'C', x:0.9,   y:-3.7, z:0, r:0.77},
                {el:'O', x:0.9,   y:-5.0, z:0, r:0.66},
                {el:'C', x:2.2,   y:-3.2, z:0, r:0.77},
                {el:'H', x:2.15,  y:1.25, z:0, r:0.31},
                {el:'H', x:2.15,  y:-1.25,z:0, r:0.31},
                {el:'H', x:-2.15, y:-1.25,z:0, r:0.31},
                {el:'H', x:-2.15, y:1.25, z:0, r:0.31},
                {el:'H', x:2.8,   y:-3.8, z:0.5, r:0.31},
                {el:'H', x:2.8,   y:-3.8, z:-0.5,r:0.31},
                {el:'H', x:2.2,   y:-2.1, z:0,   r:0.31},
            ],
            bonds: [
                [0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],
                [0,6,1],[6,7,1],
                [3,8,1],[8,9,1],[8,10,1],[10,11,2],[10,12,1],
                [12,17,1],[12,18,1],[12,19,1],
                [1,13,1],[2,14,1],[4,15,1],[5,16,1]
            ]
        }
    },
    {
        id: 'ibuprofen',
        name: 'Ibuprofeno',
        iupac: 'Ácido (RS)-2-(4-(2-metilpropil)fenil)propanoico',
        formula: 'C₁₃H₁₈O₂',
        category: 'analgesico',
        categoryLabel: 'AINE / Analgésico',
        mw: 206.28,
        logP: 3.97,
        pka: 4.91,
        solubility: 0.021,
        tpsa: 37.3,
        hbd: 1, hba: 2, rb: 4,
        atoms: 33,
        adme: { absorcion: 80, distribucion: 70, metabolismo: 80, excrecion: 65, biodisponibilidad: 87 },
        mechanism: 'Inhibidor competitivo y reversible de <strong>COX-1 y COX-2</strong>. Bloquea la síntesis de prostaglandinas que sensibilizan nociceptores. También inhibe la síntesis de leucotrienos (efecto antiinflamatorio adicional).',
        modifications: [
            { label: 'Cambiar a S-isómero', icon: '🔵', effect: 'El S(+)-ibuprofeno es el enantiómero farmacológicamente activo. El R(-) se convierte lentamente al S(+) en el organismo.', type: 'positive', changes: { adme_absorcion: 90 } },
            { label: 'Esterificar -COOH', icon: '🟠', effect: 'Profármaco: mayor LogP (+2.1), mejor absorción pero requiere hidrólisis para activarse. Reduce irritación gástrica.', type: 'positive', changes: { logP: 6.07, hbd: 0, mw: 248 } },
            { label: 'Eliminar grupo isobutilo', icon: '🔴', effect: 'Pierde volumen lipofílico clave para unión a COX. Reduce actividad ~70% y aumenta solubilidad acuosa.', type: 'negative', changes: { mw: 150, logP: 1.5, solubility: 1.2 } }
        ],
        color: 0xf59e0b,
        structure: {
            atoms: [
                // Benceno
                {el:'C', x:0,    y:1.4,  z:0, r:0.77},
                {el:'C', x:1.21, y:0.7,  z:0, r:0.77},
                {el:'C', x:1.21, y:-0.7, z:0, r:0.77},
                {el:'C', x:0,    y:-1.4, z:0, r:0.77},
                {el:'C', x:-1.21,y:-0.7, z:0, r:0.77},
                {el:'C', x:-1.21,y:0.7,  z:0, r:0.77},
                // Cadena propanoica
                {el:'C', x:-1.21,y:2.8, z:0, r:0.77},
                {el:'C', x:-2.5, y:3.5, z:0, r:0.77},
                {el:'C', x:-3.7, y:2.8, z:0, r:0.77},
                {el:'O', x:-4.8, y:3.5, z:0, r:0.66},
                {el:'O', x:-3.7, y:1.5, z:0, r:0.66},
                // Isobutilo
                {el:'C', x:1.21, y:-2.8, z:0, r:0.77},
                {el:'C', x:2.5,  y:-3.5, z:0, r:0.77},
                {el:'C', x:3.7,  y:-2.8, z:0, r:0.77},
                {el:'C', x:2.5,  y:-5.0, z:0, r:0.77},
                // Hs representativos
                {el:'H', x:-1.1, y:4.6, z:0, r:0.31},
                {el:'H', x:-2.5, y:4.6, z:0, r:0.31},
                {el:'H', x:2.15, y:1.25,z:0, r:0.31},
                {el:'H', x:2.15, y:-1.25,z:0,r:0.31},
                {el:'H', x:-2.15,y:-1.25,z:0,r:0.31},
                {el:'H', x:-2.15,y:1.25,z:0, r:0.31},
                {el:'H', x:-4.8, y:4.6, z:0, r:0.31},
            ],
            bonds: [
                [0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],
                [0,6,1],[6,7,1],[7,8,1],[8,9,2],[8,10,1],
                [10,21,1],
                [3,11,1],[11,12,1],[12,13,1],[12,14,1],
                [6,15,1],[6,16,1],
                [1,17,1],[2,18,1],[4,19,1],[5,20,1]
            ]
        }
    },
    {
        id: 'amoxicillin',
        name: 'Amoxicilina',
        iupac: 'Ácido (2S,5R,6R)-6-[(R)-2-amino-2-(4-hidroxifenil)acetilamino]-3,3-dimetil-7-oxo-4-tia-1-azabiciclo[3.2.0]heptano-2-carboxílico',
        formula: 'C₁₆H₁₉N₃O₅S',
        category: 'antibiotico',
        categoryLabel: 'Antibiótico β-lactámico',
        mw: 365.40,
        logP: 0.87,
        pka: 2.68,
        solubility: 3.4,
        tpsa: 158.2,
        hbd: 4, hba: 7, rb: 5,
        atoms: 44,
        adme: { absorcion: 93, distribucion: 40, metabolismo: 30, excrecion: 75, biodisponibilidad: 93 },
        mechanism: 'Inhibe la síntesis de la <strong>pared celular bacteriana</strong> uniéndose covalentemente a las Proteínas de Unión a Penicilina (PBP). Bloquea la transpeptidación del peptidoglicano, causando lisis osmótica bacteriana.',
        modifications: [
            { label: 'Agregar -Cl orto', icon: '🟢', effect: 'Aumenta estabilidad frente a β-lactamasas penicilinasas. Mecanismo similar a cloxacilina (cadena lateral voluminosa).', type: 'positive', changes: { mw: 399.9, logP: 2.1 } },
            { label: 'Eliminar -OH fenólico', icon: '🔴', effect: 'Genera ampicilina. Pierde el grupo OH que confiere mejor actividad contra gram-negativos (H. influenzae, E. coli).', type: 'negative', changes: { mw: 349.4, tpsa: 141.0, hbd: 3 } },
            { label: 'Esterificar -COOH', icon: '🟣', effect: 'Profármaco tipo pivampicilina. Dobla la biodisponibilidad oral pero requiere esterasas intestinales para activarse.', type: 'positive', changes: { mw: 407.5, logP: 2.8, hbd: 3 } }
        ],
        color: 0x10b981,
        structure: {
            atoms: [
                // Anillo β-lactámico (0-3)
                {el:'C', x:0,   y:0,   z:0, r:0.77},
                {el:'N', x:-1.4,y:0,   z:0, r:0.75},
                {el:'C', x:-1.4,y:1.4, z:0, r:0.77},
                {el:'C', x:0,   y:1.4, z:0, r:0.77},
                {el:'O', x:0.9, y:2.2, z:0, r:0.66},
                // Anillo tiazolidínico (5-9)
                {el:'S', x:-2.8,y:-0.7,z:0, r:1.04},
                {el:'C', x:-2.8,y:1.4, z:0, r:0.77},
                {el:'C', x:-4.0,y:0.7, z:0, r:0.77},
                {el:'C', x:-4.0,y:-0.3,z:0.8, r:0.77},
                {el:'C', x:-4.0,y:-0.3,z:-0.8,r:0.77},
                // Carboxilo (10-11)
                {el:'C', x:-3.0,y:2.8, z:0, r:0.77},
                {el:'O', x:-2.0,y:3.5, z:0, r:0.66},
                {el:'O', x:-4.2,y:3.5, z:0, r:0.66},
                // Cadena lateral (13-20)
                {el:'N', x:0,   y:-1.4,z:0, r:0.75},
                {el:'C', x:1.2, y:-2.1,z:0, r:0.77},
                {el:'O', x:1.2, y:-3.5,z:0, r:0.66},
                {el:'C', x:2.5, y:-1.5,z:0, r:0.77},
                // Benceno OH
                {el:'C', x:3.7, y:-2.2,z:0, r:0.77},
                {el:'C', x:4.9, y:-1.5,z:0, r:0.77},
                {el:'C', x:4.9, y:-0.1,z:0, r:0.77},
                {el:'C', x:3.7, y:0.6, z:0, r:0.77},
                {el:'C', x:2.5, y:-0.1,z:0, r:0.77},
                {el:'O', x:6.1, y:0.6, z:0, r:0.66},
                {el:'H', x:6.9, y:0.0, z:0, r:0.31},
            ],
            bonds: [
                [0,1,1],[1,2,1],[2,3,1],[3,0,1],[3,4,2],  // β-lactam
                [1,5,1],[5,7,1],[6,7,1],[2,6,1],           // tiazolidine
                [7,8,1],[7,9,1],                            // dimetil
                [6,10,1],[10,11,2],[10,12,1],               // carboxilo
                [0,13,1],[13,14,1],[14,15,2],[14,16,1],     // cadena
                [16,17,1],[17,18,2],[18,19,1],[19,20,2],[20,21,1],[21,17,2], // benceno
                [19,22,1],[22,23,1]                         // OH
            ]
        }
    },
    {
        id: 'atorvastatin',
        name: 'Atorvastatina',
        iupac: 'Ácido (3R,5R)-7-[2-(4-fluorofenil)-3-fenil-4-(fenilcarbamoil)-5-(propan-2-il)-1H-pirrol-1-il]-3,5-dihidroxiheptanoico',
        formula: 'C₃₃H₃₅FN₂O₅',
        category: 'antihipertensivo',
        categoryLabel: 'Estatina / Hipolipemiante',
        mw: 558.64,
        logP: 4.46,
        pka: 4.46,
        solubility: 0.0038,
        tpsa: 111.8,
        hbd: 3, hba: 7, rb: 9,
        atoms: 76,
        adme: { absorcion: 30, distribucion: 95, metabolismo: 90, excrecion: 35, biodisponibilidad: 14 },
        mechanism: 'Inhibidor competitivo de la <strong>HMG-CoA reductasa</strong>, enzima limitante en la biosíntesis hepática de colesterol. Reduce LDL-C un 50-60% a dosis altas. También tiene efectos pleiotrópicos antiinflamatorios y de estabilización de placa.',
        modifications: [
            { label: 'Reemplazar F → H', icon: '🟠', effect: 'Sin flúor: reduce unión a HMG-CoA reductasa ~40%. El F electrónico aumenta planaridad del anillo pirrol y potencia farmacológica.', type: 'negative', changes: { logP: 4.1, mw: 540.6 } },
            { label: 'Agregar -OH adicional', icon: '🔵', effect: 'Mayor hidrofilicidad, posible actividad inhibitoria de transportadores OATP1B1 reducida. Puede bajar miotoxicidad.', type: 'positive', changes: { logP: 3.8, hbd: 4, tpsa: 128.0 } },
            { label: 'Sal cálcica (Lipitor®)', icon: '🟢', effect: 'Forma farmacéutica real (Lipitor®). Mejora estabilidad en polvo, compresibilidad y biodisponibilidad oral vs. forma ácida libre.', type: 'positive', changes: { mw: 1209.4 } }
        ],
        color: 0x7c3aed,
        structure: {
            atoms: [
                // Pirrol (0-4)
                {el:'N', x:0,   y:0,   z:0, r:0.75},
                {el:'C', x:1.4, y:0,   z:0, r:0.77},
                {el:'C', x:1.4, y:1.4, z:0, r:0.77},
                {el:'C', x:0,   y:2.0, z:0, r:0.77},
                {el:'C', x:-1.0,y:1.0, z:0, r:0.77},
                // Cadena heptanoica (5-11)
                {el:'C', x:-1.4,y:-1.4,z:0, r:0.77},
                {el:'C', x:-2.8,y:-1.4,z:0, r:0.77},
                {el:'C', x:-4.0,y:-0.7,z:0, r:0.77},
                {el:'O', x:-4.0,y:0.7, z:0, r:0.66},
                {el:'C', x:-5.4,y:-1.4,z:0, r:0.77},
                {el:'C', x:-6.8,y:-0.7,z:0, r:0.77},
                {el:'O', x:-6.8,y:0.7, z:0, r:0.66},
                {el:'C', x:-8.2,y:-1.4,z:0, r:0.77},
                {el:'O', x:-8.2,y:-2.8,z:0, r:0.66},
                {el:'O', x:-9.4,y:-0.7,z:0, r:0.66},
                // Benceno F (15-20)
                {el:'C', x:2.8, y:-0.7,z:0, r:0.77},
                {el:'C', x:4.0, y:-0.1,z:0, r:0.77},
                {el:'C', x:5.2, y:-0.7,z:0, r:0.77},
                {el:'C', x:5.2, y:-2.1,z:0, r:0.77},
                {el:'C', x:4.0, y:-2.8,z:0, r:0.77},
                {el:'C', x:2.8, y:-2.1,z:0, r:0.77},
                {el:'F', x:6.5, y:-0.0,z:0, r:0.64},
                // Isopropilo (22-24)
                {el:'C', x:-2.0,y:1.4, z:0, r:0.77},
                {el:'C', x:-3.0,y:0.7, z:0.7,r:0.77},
                {el:'C', x:-3.0,y:0.7, z:-0.7,r:0.77},
            ],
            bonds: [
                [0,1,1],[1,2,2],[2,3,1],[3,4,2],[4,0,1],   // pirrol
                [0,5,1],[5,6,1],[6,7,1],[7,8,1],[7,9,1],   // cadena
                [9,10,1],[10,11,1],[10,12,1],[12,13,2],[12,14,1], // cadena cont
                [1,15,1],[15,16,2],[16,17,1],[17,18,2],[18,19,1],[19,20,2],[20,15,1], // benceno F
                [17,21,1],                                  // fluor
                [4,22,1],[22,23,1],[22,24,1]               // isopropilo
            ]
        }
    },
    {
        id: 'metformin',
        name: 'Metformina',
        iupac: '1,1-dimetilbiguanida',
        formula: 'C₄H₁₁N₅',
        category: 'antidiabético',
        categoryLabel: 'Antidiabético / Biguanida',
        mw: 129.16,
        logP: -1.43,
        pka: 11.5,
        solubility: 300.0,
        tpsa: 91.8,
        hbd: 3, hba: 5, rb: 2,
        atoms: 20,
        adme: { absorcion: 55, distribucion: 35, metabolismo: 5, excrecion: 90, biodisponibilidad: 55 },
        mechanism: 'Activa <strong>AMPK</strong> (AMP-activated protein kinase) hepática, inhibiendo la gluconeogénesis. También inhibe la Cadena Transportadora de Electrones (Complejo I mitocondrial). No induce hipoglucemia (insulino-independiente).',
        modifications: [
            { label: 'Agregar cadena butil', icon: '🟠', effect: 'Genera buformina: mayor potencia hipoglucemiante pero prohibida por alta incidencia de acidosis láctica fatal.', type: 'negative', changes: { mw: 157.2, logP: 0.0 } },
            { label: 'Sustituir N-dimetil → N-dietil', icon: '🟣', effect: 'Feformina (retirada): actividad conservada pero mayor toxicidad mitocondrial y riesgo de acidosis láctica.', type: 'negative', changes: { mw: 157.2, logP: -0.5 } }
        ],
        color: 0x3b82f6,
        structure: {
            atoms: [
                {el:'N', x:0,   y:0,   z:0, r:0.75},
                {el:'C', x:1.4, y:0,   z:0, r:0.77},
                {el:'N', x:2.1, y:1.2, z:0, r:0.75},
                {el:'N', x:2.1, y:-1.2,z:0, r:0.75},
                {el:'C', x:3.5, y:0,   z:0, r:0.77},
                {el:'N', x:4.2, y:1.2, z:0, r:0.75},
                {el:'N', x:4.2, y:-1.2,z:0, r:0.75},
                {el:'C', x:-1.4,y:0.7, z:0, r:0.77},
                {el:'C', x:-1.4,y:-0.7,z:0, r:0.77},
                // H
                {el:'H', x:0,   y:1.0, z:0, r:0.31},
                {el:'H', x:2.0, y:2.1, z:0, r:0.31},
                {el:'H', x:2.0, y:-2.1,z:0, r:0.31},
                {el:'H', x:4.0, y:2.1, z:0, r:0.31},
                {el:'H', x:5.2, y:-1.2,z:0, r:0.31},
                {el:'H', x:4.0, y:-2.1,z:0, r:0.31},
                {el:'H', x:-2.0,y:1.4, z:0.5,r:0.31},
                {el:'H', x:-2.0,y:1.4, z:-0.5,r:0.31},
                {el:'H', x:-2.0,y:-0.0,z:0.9,r:0.31},
                {el:'H', x:-2.0,y:-1.4,z:0.5,r:0.31},
                {el:'H', x:-2.0,y:-1.4,z:-0.5,r:0.31},
            ],
            bonds: [
                [0,1,1],[1,2,1],[1,3,2],[2,4,2],[3,4,1],[4,5,1],[4,6,2],
                [0,7,1],[0,8,1],
                [0,9,1],[2,10,1],[3,11,1],[5,12,1],[6,13,1],[6,14,1],
                [7,15,1],[7,16,1],[7,17,1],[8,18,1],[8,19,1]
            ]
        }
    },
    {
        id: 'lisinopril',
        name: 'Lisinopril',
        iupac: 'Ácido (S)-1-[(S)-2-[[(S)-1-carboxi-3-fenilpropil]amino]propanoil]-4-(1H-imidazol-1-il)piperidina-2-carboxílico',
        formula: 'C₂₁H₃₁N₃O₅',
        category: 'antihipertensivo',
        categoryLabel: 'IECA / Antihipertensivo',
        mw: 405.49,
        logP: -1.79,
        pka: 2.5,
        solubility: 34.8,
        tpsa: 121.4,
        hbd: 5, hba: 8, rb: 10,
        atoms: 60,
        adme: { absorcion: 25, distribucion: 30, metabolismo: 10, excrecion: 90, biodisponibilidad: 25 },
        mechanism: 'Inhibe la <strong>Enzima Convertidora de Angiotensina (ECA)</strong>, bloqueando la conversión de Angiotensina I → II. Reduce vasoconstricción y secreción de aldosterona. También inhibe degradación de bradiquinina (causa tos seca característica).',
        modifications: [
            { label: 'Esterificar → Enalaprilo', icon: '🟣', effect: 'Profármaco etil éster = enalapril. Mejor absorción oral (60% vs 25%), hidrolizado a enalaprilat (forma activa) por esterasas hepáticas.', type: 'positive', changes: { logP: 0.09, mw: 376.4, hbd: 3 } },
            { label: 'Sustituir Lys → Pro', icon: '🔵', effect: 'Genera captopril (sin cadena lisina). Más pequeño (MW 217), primer IECA aprobado, pero requiere dosificación 3x/día por menor t½.', type: 'neutral', changes: { mw: 217.3, logP: 0.34, hbd: 2 } }
        ],
        color: 0x6366f1,
        structure: {
            atoms: [
                {el:'C', x:0,   y:0,  z:0,  r:0.77},
                {el:'N', x:1.4, y:0,  z:0,  r:0.75},
                {el:'C', x:2.1, y:1.3,z:0,  r:0.77},
                {el:'C', x:3.5, y:1.3,z:0,  r:0.77},
                {el:'O', x:4.2, y:2.5,z:0,  r:0.66},
                {el:'O', x:4.2, y:0.1,z:0,  r:0.66},
                {el:'C', x:2.1, y:-1.3,z:0, r:0.77},
                {el:'C', x:3.5, y:-1.3,z:0, r:0.77},
                {el:'C', x:4.2, y:-2.5,z:0, r:0.77},
                // Benceno
                {el:'C', x:5.6, y:-2.5,z:0, r:0.77},
                {el:'C', x:6.3, y:-3.7,z:0, r:0.77},
                {el:'C', x:7.7, y:-3.7,z:0, r:0.77},
                {el:'C', x:8.4, y:-2.5,z:0, r:0.77},
                {el:'C', x:7.7, y:-1.3,z:0, r:0.77},
                {el:'C', x:6.3, y:-1.3,z:0, r:0.77},
                // COOH N-terminal
                {el:'C', x:-1.4,y:0,  z:0,  r:0.77},
                {el:'O', x:-2.1,y:1.2,z:0,  r:0.66},
                {el:'O', x:-2.1,y:-1.2,z:0, r:0.66},
                {el:'H', x:-3.1,y:-1.2,z:0, r:0.31},
            ],
            bonds: [
                [0,1,1],[1,2,1],[2,3,1],[3,4,2],[3,5,1],
                [1,6,1],[6,7,1],[7,8,1],[8,9,1],
                [9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,2],[14,9,1],
                [0,15,1],[15,16,2],[15,17,1],[17,18,1]
            ]
        }
    },
    {
        id: 'omeprazol',
        name: 'Omeprazol',
        iupac: '5-metoxi-2-{[(4-metoxi-3,5-dimetilpiridin-2-il)metil]sulfinilm}-1H-bencimidazol',
        formula: 'C₁₇H₁₉N₃O₃S',
        category: 'antiinflamatorio',
        categoryLabel: 'Inhibidor de Bomba de Protones',
        mw: 345.42,
        logP: 2.23,
        pka: 4.77,
        solubility: 0.36,
        tpsa: 87.3,
        hbd: 1, hba: 6, rb: 5,
        atoms: 43,
        adme: { absorcion: 65, distribucion: 60, metabolismo: 95, excrecion: 25, biodisponibilidad: 35 },
        mechanism: 'Profármaco activado en canalículos secretores gástricos (pH < 4). Se convierte en sulfenamida que inhibe de forma <strong>irreversible</strong> la H⁺/K⁺-ATPasa (bomba de protones) en células parietales. Reduce secreción ácida >90%.',
        modifications: [
            { label: 'S-enantiómero → Esomeprazol', icon: '🟢', effect: 'Nexium® = S-omeprazol. Menor metabolismo CYP2C19, mayor AUC (+70%), mejor eficacia clínica en pacientes "metabolizadores rápidos".', type: 'positive', changes: { adme_biodisponibilidad: 64 } },
            { label: 'Cambiar -S(=O)- → -S-', icon: '🔴', effect: 'Pierde el sulfinilo: ya no es profármaco, no se activa en el medio ácido. Pierde totalmente la actividad farmacológica.', type: 'negative', changes: { logP: 2.8, mw: 329.4 } }
        ],
        color: 0xec4899,
        structure: {
            atoms: [
                // Bencimidazol (0-8)
                {el:'N', x:0,   y:0,   z:0, r:0.75},
                {el:'C', x:1.4, y:0,   z:0, r:0.77},
                {el:'N', x:1.7, y:1.4, z:0, r:0.75},
                {el:'C', x:0.5, y:2.2, z:0, r:0.77},
                {el:'C', x:-0.7,y:1.5, z:0, r:0.77},
                {el:'C', x:-2.0,y:2.0, z:0, r:0.77},
                {el:'C', x:-3.2,y:1.2, z:0, r:0.77},
                {el:'C', x:-3.2,y:-0.2,z:0, r:0.77},
                {el:'C', x:-2.0,y:-0.8,z:0, r:0.77},
                // Sulfinilo y metileno (9-11)
                {el:'C', x:3.0, y:1.7, z:0, r:0.77},
                {el:'S', x:4.2, y:0.8, z:0, r:1.04},
                {el:'O', x:4.2, y:-0.6,z:0, r:0.66},
                // Piridina (12-17)
                {el:'C', x:5.6, y:1.4, z:0, r:0.77},
                {el:'N', x:6.8, y:0.7, z:0, r:0.75},
                {el:'C', x:6.8, y:-0.7,z:0, r:0.77},
                {el:'C', x:5.6, y:-1.4,z:0, r:0.77},
                {el:'C', x:4.4, y:-0.7,z:-1.0,r:0.77},
                // OMe grupos
                {el:'O', x:-4.4,y:-1.5,z:0, r:0.66},
                {el:'C', x:-5.7,y:-1.0,z:0, r:0.77},
                {el:'O', x:7.0, y:-1.5,z:-0.5,r:0.66},
                {el:'C', x:8.3, y:-1.1,z:-0.5,r:0.77},
                // Metiles en piridina
                {el:'C', x:5.6, y:2.8, z:0, r:0.77},
                {el:'C', x:8.0, y:0.8, z:0, r:0.77},
            ],
            bonds: [
                [0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,0,1],
                [4,5,2],[5,6,1],[6,7,2],[7,8,1],[8,0,2],
                [2,9,1],[9,10,1],[10,11,2],[10,12,1],
                [12,13,2],[13,14,1],[14,15,2],[15,16,1],[16,12,2],
                [7,17,1],[17,18,1],
                [14,19,1],[19,20,1],
                [12,21,1],[13,22,1]
            ]
        }
    },
    {
        id: 'ciprofloxacin',
        name: 'Ciprofloxacino',
        iupac: 'Ácido 1-ciclopropil-6-fluoro-4-oxo-7-(piperazin-1-il)-1,4-dihidroquinolina-3-carboxílico',
        formula: 'C₁₇H₁₈FN₃O₃',
        category: 'antibiotico',
        categoryLabel: 'Antibiótico / Fluoroquinolona',
        mw: 331.34,
        logP: 0.28,
        pka: 6.09,
        solubility: 0.076,
        tpsa: 74.6,
        hbd: 2, hba: 6, rb: 3,
        atoms: 42,
        adme: { absorcion: 85, distribucion: 95, metabolismo: 15, excrecion: 70, biodisponibilidad: 70 },
        mechanism: 'Inhibe la <strong>ADN girasa</strong> (topoisomerasa II) y <strong>topoisomerasa IV</strong> bacterianas. Estabiliza el complejo enzima-ADN, causando roturas de doble hebra. Bactericida de amplio espectro, activo frente a gram-negativos y gram-positivos.',
        modifications: [
            { label: 'Cambiar piperazina → pirrolidina', icon: '🟣', effect: 'Genera análogos como moxifloxacino. Mayor actividad gram-positivos (S. pneumoniae), mejor penetración al SNC pero menor actividad P. aeruginosa.', type: 'neutral', changes: { mw: 316.3, logP: 0.5 } },
            { label: 'Eliminar F', icon: '🔴', effect: 'El flúor C-6 es esencial: aumenta penetración intracelular y potencia inhibición de girasa ×100. Sin flúor: actividad dramáticamente reducida.', type: 'negative', changes: { mw: 312.3, logP: 0.0 } },
            { label: 'Agregar -NH₂ en C-7', icon: '🟢', effect: 'Mayor actividad anaeróbica y contra micobacterias. Reduce afinidad a transportadores de eflujo bacterianos (resistencia).', type: 'positive', changes: { mw: 346.4, hbd: 3, tpsa: 93.8 } }
        ],
        color: 0xf97316,
        structure: {
            atoms: [
                // Quinolona base (0-9)
                {el:'C', x:0,   y:0,   z:0, r:0.77},
                {el:'C', x:1.4, y:0,   z:0, r:0.77},
                {el:'C', x:2.1, y:1.3, z:0, r:0.77},
                {el:'C', x:1.4, y:2.5, z:0, r:0.77},
                {el:'C', x:0,   y:2.5, z:0, r:0.77},
                {el:'C', x:-0.7,y:1.3, z:0, r:0.77},
                {el:'N', x:-0.7,y:-1.2,z:0, r:0.75},
                {el:'C', x:0.7, y:-2.0,z:0, r:0.77},
                {el:'C', x:0,   y:-3.3,z:0, r:0.77},
                {el:'O', x:-1.3,y:-3.3,z:0, r:0.66},
                // COOH
                {el:'C', x:1.3, y:-4.5,z:0, r:0.77},
                {el:'O', x:2.6, y:-4.5,z:0, r:0.66},
                {el:'O', x:0.7, y:-5.7,z:0, r:0.66},
                // F y N y piperazina
                {el:'F', x:3.5, y:1.3, z:0, r:0.64},
                {el:'N', x:1.4, y:-1.2,z:0, r:0.75},
                // Piperazina
                {el:'C', x:2.1, y:-0.1,z:0, r:0.77},
                {el:'N', x:3.5, y:-0.1,z:0, r:0.75},
                {el:'C', x:4.2, y:1.2, z:0, r:0.77},
                {el:'C', x:4.2, y:-1.4,z:0, r:0.77},
                {el:'N', x:5.6, y:1.2, z:0, r:0.75},
                {el:'C', x:5.6, y:-1.4,z:0, r:0.77},
                {el:'C', x:6.3, y:0,   z:0, r:0.77},
                // Ciclopropilo
                {el:'C', x:-2.1,y:-1.2,z:0, r:0.77},
                {el:'C', x:-3.0,y:-0.1,z:0.7,r:0.77},
                {el:'C', x:-3.0,y:-0.1,z:-0.7,r:0.77},
            ],
            bonds: [
                [0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],
                [0,6,1],[6,7,2],[7,8,1],[8,9,2],[7,14,1],
                [8,10,1],[10,11,2],[10,12,1],
                [2,13,1],
                [14,15,1],[15,16,1],[16,17,2],[17,18,1],[18,20,1],
                [16,19,1],[19,21,1],[20,21,2],
                [6,22,1],[22,23,1],[22,24,1],[23,24,1]
            ]
        }
    },
    {
        id: 'diazepam',
        name: 'Diazepam',
        iupac: '7-cloro-1-metil-5-fenil-3H-benzo[e][1,4]diazepin-2(1H)-ona',
        formula: 'C₁₆H₁₃ClN₂O',
        category: 'analgesico',
        categoryLabel: 'Benzodiacepina / Ansiolítico',
        mw: 284.74,
        logP: 2.82,
        pka: 3.4,
        solubility: 0.05,
        tpsa: 32.7,
        hbd: 0, hba: 2, rb: 1,
        atoms: 32,
        adme: { absorcion: 100, distribucion: 98, metabolismo: 99, excrecion: 5, biodisponibilidad: 100 },
        mechanism: 'Modulador alostérico positivo del receptor <strong>GABA-A</strong>. Se une al sitio benzodiacepínico (entre subunidades α y γ₂), aumentando la frecuencia de apertura del canal Cl⁻. Potencia la inhibición GABAérgica sin activar el receptor directamente.',
        modifications: [
            { label: 'N-desmetilación', icon: '🟠', effect: 'Genera nordiazepam (desmetildiazepam): metabolito activo con t½ 36-200h. Mayor duración acción pero riesgo de acumulación en ancianos.', type: 'neutral', changes: { mw: 270.7, logP: 2.5 } },
            { label: 'Agregar -OH C-3', icon: '🔵', effect: 'Genera temazepam: directamente glucuronoconjugable (sin CYP450), menor acumulación, t½ = 8-22h. Mejor para insomnia.', type: 'positive', changes: { mw: 300.7, logP: 2.19, hbd: 1 } }
        ],
        color: 0xa78bfa,
        structure: {
            atoms: [
                // Anillo diacepínico (0-7)
                {el:'C', x:0,   y:0,   z:0, r:0.77},
                {el:'N', x:1.4, y:0,   z:0, r:0.75},
                {el:'C', x:2.1, y:-1.3,z:0, r:0.77},
                {el:'O', x:3.4, y:-1.3,z:0, r:0.66},
                {el:'C', x:1.4, y:-2.5,z:0, r:0.77},
                {el:'N', x:0,   y:-2.5,z:0, r:0.75},
                {el:'C', x:-0.7,y:-1.3,z:0, r:0.77},
                // Benceno A fusionado (7-12)
                {el:'C', x:-2.1,y:-1.3,z:0, r:0.77},
                {el:'C', x:-2.8,y:-2.5,z:0, r:0.77},
                {el:'C', x:-4.2,y:-2.5,z:0, r:0.77},
                {el:'C', x:-4.9,y:-1.3,z:0, r:0.77},
                {el:'C', x:-4.2,y:-0.1,z:0, r:0.77},
                {el:'C', x:-2.8,y:-0.1,z:0, r:0.77},
                {el:'Cl',x:-5.0,y:-3.8,z:0, r:0.99},
                // Fenil C-5 (14-19)
                {el:'C', x:1.4, y:-3.9,z:0, r:0.77},
                {el:'C', x:2.7, y:-4.5,z:0, r:0.77},
                {el:'C', x:2.7, y:-5.9,z:0, r:0.77},
                {el:'C', x:1.4, y:-6.6,z:0, r:0.77},
                {el:'C', x:0.1, y:-5.9,z:0, r:0.77},
                {el:'C', x:0.1, y:-4.5,z:0, r:0.77},
                // N-metilo
                {el:'C', x:2.8, y:0,   z:0, r:0.77},
            ],
            bonds: [
                [0,1,2],[1,2,1],[2,3,2],[2,4,1],[4,5,1],[5,6,2],[6,0,1],
                [6,7,1],[7,8,2],[8,9,1],[9,10,2],[10,11,1],[11,12,2],[12,7,1],[12,0,1],
                [9,13,1],
                [4,14,1],[14,15,2],[15,16,1],[16,17,2],[17,18,1],[18,19,2],[19,14,1],
                [1,20,1]
            ]
        }
    },
    {
        id: 'salbutamol',
        name: 'Salbutamol',
        iupac: 'Ácido (RS)-2-(terc-butilamino)-1-(4-hidroxi-3-hidroximetilfenil)etanol',
        formula: 'C₁₃H₂₁NO₃',
        category: 'antihipertensivo',
        categoryLabel: 'Agonista β₂ / Broncodilatador',
        mw: 239.31,
        logP: 0.64,
        pka: 10.3,
        solubility: 250.0,
        tpsa: 72.7,
        hbd: 4, hba: 4, rb: 5,
        atoms: 38,
        adme: { absorcion: 50, distribucion: 65, metabolismo: 60, excrecion: 70, biodisponibilidad: 49 },
        mechanism: 'Agonista selectivo de receptores <strong>β₂-adrenérgicos</strong> en músculo liso bronquial. Activa adenilil ciclasa → ↑AMPc → activación PKA → desfosforilación cadena ligera miosina → relajación. Inicio acción 5 min, duración 4-6h.',
        modifications: [
            { label: 'R-enantiómero puro', icon: '🔵', effect: 'Levalbuterol (R-salbutamol): 2x más potente broncodilatador. El S-enantiómero puede causar broncoconstricción paradójica en altas dosis.', type: 'positive', changes: {} },
            { label: 'Agregar -PhCO (Salmeterol)', icon: '🟠', effect: 'Salmeterol: cadena larga lipofílica (cabeza/cola) ancla al receptor. LABA (Long-Acting β₂ Agonist), duración >12h vs 4-6h del salbutamol.', type: 'positive', changes: { mw: 415.6, logP: 3.4 } }
        ],
        color: 0x0ea5e9,
        structure: {
            atoms: [
                // Benceno (0-5)
                {el:'C', x:0,    y:1.4,  z:0, r:0.77},
                {el:'C', x:1.21, y:0.7,  z:0, r:0.77},
                {el:'C', x:1.21, y:-0.7, z:0, r:0.77},
                {el:'C', x:0,    y:-1.4, z:0, r:0.77},
                {el:'C', x:-1.21,y:-0.7, z:0, r:0.77},
                {el:'C', x:-1.21,y:0.7,  z:0, r:0.77},
                // OH y CH2OH
                {el:'O', x:0,    y:2.8,  z:0, r:0.66},
                {el:'C', x:-2.5, y:1.4,  z:0, r:0.77},
                {el:'O', x:-3.7, y:0.7,  z:0, r:0.66},
                // Etanolamina
                {el:'C', x:2.5,  y:-1.4, z:0, r:0.77},
                {el:'O', x:3.7,  y:-0.7, z:0, r:0.66},
                {el:'C', x:2.5,  y:-2.8, z:0, r:0.77},
                {el:'N', x:3.7,  y:-3.5, z:0, r:0.75},
                // t-Bu
                {el:'C', x:5.0,  y:-3.5, z:0, r:0.77},
                {el:'C', x:5.5,  y:-4.9, z:0, r:0.77},
                {el:'C', x:5.5,  y:-2.1, z:0.7,r:0.77},
                {el:'C', x:5.5,  y:-2.1, z:-0.7,r:0.77},
                // Hs
                {el:'H', x:0,    y:3.7,  z:0, r:0.31},
                {el:'H', x:-4.5, y:1.2,  z:0, r:0.31},
                {el:'H', x:3.0,  y:-0.4, z:0, r:0.31},
                {el:'H', x:2.15, y:1.25, z:0, r:0.31},
                {el:'H', x:-2.15,y:-1.25,z:0, r:0.31},
                {el:'H', x:0,    y:-2.5, z:0, r:0.31},
            ],
            bonds: [
                [0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],
                [0,6,1],[6,17,1],
                [5,7,1],[7,8,1],[8,18,1],
                [2,9,1],[9,10,1],[10,19,1],[9,11,1],[11,12,1],[12,13,1],
                [13,14,1],[14,15,1],[14,16,1],[14,17,1],
                [1,20,1],[4,21,1],[3,22,1]
            ]
        }
    },
    {
        id: 'losartan',
        name: 'Losartán',
        iupac: '2-butil-4-cloro-1-{[2\'-(1H-tetrazol-5-il)bifenil-4-il]metil}-1H-imidazol-5-metanol',
        formula: 'C₂₂H₂₃ClN₆O',
        category: 'antihipertensivo',
        categoryLabel: 'ARA-II / Antihipertensivo',
        mw: 422.91,
        logP: 4.01,
        pka: 5.0,
        solubility: 0.05,
        tpsa: 96.0,
        hbd: 1, hba: 8, rb: 9,
        atoms: 53,
        adme: { absorcion: 33, distribucion: 98, metabolismo: 85, excrecion: 35, biodisponibilidad: 33 },
        mechanism: 'Antagonista selectivo del receptor <strong>AT₁ de angiotensina II</strong>. Bloquea vasoconstricción y secreción de aldosterona mediadas por angiotensina II. No inhibe ECA → sin tos seca. Metabolito activo E-3174 (14x más potente) formado por CYP2C9.',
        modifications: [
            { label: 'Oxidar -CH₂OH → -COOH', icon: '🟠', effect: 'Genera E-3174, el metabolito activo del losartán. 14x mayor afinidad AT₁ y 10x mayor potencia vasodepresora. No disponible oral directo.', type: 'positive', changes: { mw: 436.9, hbd: 2, logP: 3.5 } },
            { label: 'Reemplazar Cl → CF₃', icon: '🟣', effect: 'Irbesartán-like: mayor lipofilicidad, mejor penetración tisular, mayor unión proteínas plasmáticas. Potencia similar pero mayor t½.', type: 'neutral', changes: { logP: 5.2, mw: 456.9 } }
        ],
        color: 0xe11d48,
        structure: {
            atoms: [
                // Imidazol (0-4)
                {el:'N', x:0,   y:0,   z:0, r:0.75},
                {el:'C', x:1.4, y:0,   z:0, r:0.77},
                {el:'N', x:1.7, y:1.4, z:0, r:0.75},
                {el:'C', x:0.4, y:2.2, z:0, r:0.77},
                {el:'C', x:-0.7,y:1.4, z:0, r:0.77},
                // Butil (5-8)
                {el:'C', x:-2.1,y:1.7, z:0, r:0.77},
                {el:'C', x:-3.2,y:0.8, z:0, r:0.77},
                {el:'C', x:-4.6,y:1.1, z:0, r:0.77},
                {el:'C', x:-5.7,y:0.2, z:0, r:0.77},
                // Cl
                {el:'Cl',x:3.2, y:0,   z:0, r:0.99},
                // CH2OH
                {el:'C', x:0.7, y:3.6, z:0, r:0.77},
                {el:'O', x:-0.3,y:4.5, z:0, r:0.66},
                // CH2-bifenil (12-13)
                {el:'C', x:0,   y:-1.4,z:0, r:0.77},
                // Bifenil A (13-18)
                {el:'C', x:0,   y:-2.8,z:0, r:0.77},
                {el:'C', x:1.2, y:-3.5,z:0, r:0.77},
                {el:'C', x:1.2, y:-4.9,z:0, r:0.77},
                {el:'C', x:0,   y:-5.6,z:0, r:0.77},
                {el:'C', x:-1.2,y:-4.9,z:0, r:0.77},
                {el:'C', x:-1.2,y:-3.5,z:0, r:0.77},
                // Bifenil B (19-24)
                {el:'C', x:2.5, y:-5.6,z:0, r:0.77},
                {el:'C', x:3.5, y:-4.8,z:0, r:0.77},
                {el:'C', x:4.8, y:-5.2,z:0, r:0.77},
                {el:'C', x:5.2, y:-6.5,z:0, r:0.77},
                {el:'C', x:4.2, y:-7.3,z:0, r:0.77},
                {el:'C', x:2.9, y:-7.0,z:0, r:0.77},
                // Tetrazol
                {el:'N', x:6.5, y:-6.7,z:0, r:0.75},
                {el:'N', x:7.2, y:-5.5,z:0, r:0.75},
                {el:'N', x:6.5, y:-4.5,z:0, r:0.75},
                {el:'N', x:5.5, y:-5.1,z:0, r:0.75},
                {el:'C', x:5.5, y:-6.4,z:0, r:0.77},
            ],
            bonds: [
                [0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,0,1],
                [4,5,1],[5,6,1],[6,7,1],[7,8,1],
                [1,9,1],
                [3,10,1],[10,11,1],
                [0,12,1],[12,13,1],
                [13,14,2],[14,15,1],[15,16,2],[16,17,1],[17,18,2],[18,13,1],
                [15,19,1],
                [19,20,2],[20,21,1],[21,22,2],[22,23,1],[23,24,2],[24,19,1],
                [22,25,1],[25,26,1],[26,27,1],[27,28,1],[28,29,1],[29,25,2],[29,22,1]
            ]
        }
    }
];

// ─── Utility: Lipinski Check ───────────────────────────────────────────
window.checkLipinski = function(mol) {
    return [
        { rule: 'MW ≤ 500', val: mol.mw.toFixed(1), pass: mol.mw <= 500, unit: 'g/mol' },
        { rule: 'LogP ≤ 5', val: mol.logP.toFixed(2), pass: mol.logP <= 5, unit: '' },
        { rule: 'HBD ≤ 5', val: mol.hbd, pass: mol.hbd <= 5, unit: '' },
        { rule: 'HBA ≤ 10', val: mol.hba, pass: mol.hba <= 10, unit: '' }
    ];
};

// ─── Utility: radar values ─────────────────────────────────────────────
window.getRadarValues = function(mol) {
    return {
        'Lipofil.': Math.min(mol.logP / 5 + 0.5, 1),
        'Solubil.': Math.min(Math.log10(mol.solubility + 1) / 3, 1),
        'Abs.Oral': mol.adme.absorcion / 100,
        'Metab.':   mol.adme.metabolismo / 100,
        'Permeab.': Math.min((100 - mol.tpsa) / 100, 1)
    };
};

// ─── Utility: element colors ───────────────────────────────────────────
window.ELEMENT_COLORS = {
    C:  { hex: 0x888888, name: 'Carbono',   num: 6,  mass: 12.011 },
    H:  { hex: 0xeeeeee, name: 'Hidrógeno', num: 1,  mass: 1.008  },
    O:  { hex: 0xff3030, name: 'Oxígeno',   num: 8,  mass: 15.999 },
    N:  { hex: 0x3050f8, name: 'Nitrógeno', num: 7,  mass: 14.007 },
    S:  { hex: 0xffff30, name: 'Azufre',    num: 16, mass: 32.06  },
    Cl: { hex: 0x1ff01f, name: 'Cloro',     num: 17, mass: 35.45  },
    F:  { hex: 0x90e050, name: 'Flúor',     num: 9,  mass: 18.998 },
    P:  { hex: 0xff8000, name: 'Fósforo',   num: 15, mass: 30.974 },
    Br: { hex: 0xa62929, name: 'Bromo',     num: 35, mass: 79.904 },
    I:  { hex: 0x940094, name: 'Yodo',      num: 53, mass: 126.90 },
    Na: { hex: 0xab5cf2, name: 'Sodio',     num: 11, mass: 22.990 },
    Ca: { hex: 0x3dff00, name: 'Calcio',    num: 20, mass: 40.078 },
};
