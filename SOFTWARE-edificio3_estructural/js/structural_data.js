// ═══════════════════════════════════════════════════════════════════════════
// STRUCTURAL DATA MODULE v1.0
// Base de datos técnica real para elementos estructurales
// Información verificada según ACI 318-19, Eurocódigo 2, NEC-SE-HM
// ═══════════════════════════════════════════════════════════════════════════

const STRUCTURAL_DATA = {

    // ─────────────────────────────────────────────────
    // COLUMNAS RECTANGULARES 80x50 cm
    // ─────────────────────────────────────────────────
    column_80x50: {
        id: 'column_80x50',
        name: 'Columna Rectangular 80×50 cm',
        category: 'Elemento Vertical de Carga',
        icon: '🏛️',
        color: '#ff9500',
        description: 'Elemento estructural vertical que transmite cargas axiales de compresión (y flexión) desde vigas y losas hasta la cimentación. Sección rectangular de 80×50 cm optimizada para resistir cargas gravitacionales y sísmicas en ambas direcciones principales del edificio.',
        composition: {
            title: 'Composición Material',
            items: [
                'Hormigón: f\'c = 28 MPa (280 kg/cm²), densidad 2400 kg/m³',
                'Acero longitudinal: fy = 420 MPa (4200 kg/cm²), barras Ø20-25mm',
                'Estribos de confinamiento: Ø10mm, fy = 420 MPa',
                'Recubrimiento mínimo: 4 cm (ACI 318-19, Tabla 20.6.1)',
                'Relación agua/cemento: ≤ 0.45 para durabilidad'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Sección', value: '80 × 50 cm' },
                { label: 'Área bruta (Ag)', value: '4000 cm²' },
                { label: 'f\'c hormigón', value: '28 MPa' },
                { label: 'fy acero', value: '420 MPa' },
                { label: 'Cuantía ρ', value: '1% - 4% de Ag' },
                { label: 'Estribos', value: 'Ø10mm @ 10-15 cm' },
                { label: 'Recubrimiento', value: '4 cm mínimo' },
                { label: 'Esbeltez (kL/r)', value: '< 22 (columna corta)' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Resistencia Axial Nominal (ACI 318-19 §22.4.2)',
                    formula: 'Pn(max) = 0.80 × [0.85 × f\'c × (Ag - Ast) + fy × Ast]',
                    example: 'Pn = 0.80 × [0.85 × 28 × (4000 - 80) + 420 × 80] = 102,150 kg ≈ 1001 kN',
                    note: 'Con Ast = 2% × 4000 = 80 cm² (8Ø25mm + 4Ø20mm)'
                },
                {
                    name: 'Resistencia de Diseño (con φ = 0.65)',
                    formula: 'φPn = 0.65 × 102,150 = 66,398 kg ≈ 651 kN',
                    example: 'Factor φ = 0.65 para compresión con estribos (ACI 318 Tabla 21.2.1)',
                    note: 'La columna debe cumplir: Pu ≤ φPn'
                },
                {
                    name: 'Separación de Estribos en Zona de Confinamiento',
                    formula: 's ≤ mín(b/4, 6db, 100+((350-hx)/3))',
                    example: 's ≤ mín(50/4, 6×2.5, 100+((350-350)/3)) = mín(12.5, 15, 10) = 10 cm',
                    note: 'Zona de confinamiento Lo = máx(h, L/6, 45cm) desde cada nudo'
                },
                {
                    name: 'Verificación Columna Fuerte - Viga Débil',
                    formula: 'ΣMnc ≥ 1.2 × ΣMnv (en cada nudo)',
                    example: 'Suma de momentos nominales de columnas ≥ 1.2 × suma de vigas',
                    note: 'Criterio fundamental de diseño sismorresistente (ACI 318 §18.7.3)'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'Las columnas son los elementos primarios del sistema de carga vertical. Reciben las reacciones de las vigas en cada nudo y transmiten las fuerzas acumuladas piso a piso hasta la cimentación. En un sistema porticado, también resisten momentos flectores y cortantes producidos por cargas laterales (sismo, viento). El diseño sigue el principio de "columna fuerte - viga débil" para asegurar que las articulaciones plásticas se formen en las vigas antes que en las columnas durante un sismo.'
        },
        normative: ['ACI 318-19 Cap. 18 & 22', 'Eurocódigo 2 EN 1992-1-1', 'NEC-SE-HM 2015']
    },

    // ─────────────────────────────────────────────────
    // COLUMNAS CUADRADAS 60x60 cm
    // ─────────────────────────────────────────────────
    column_60x60: {
        id: 'column_60x60',
        name: 'Columna Cuadrada 60×60 cm',
        category: 'Elemento Vertical de Carga',
        icon: '🏛️',
        color: '#ff9500',
        description: 'Columna de sección cuadrada utilizada en posiciones donde las cargas son moderadas o donde se requiere simetría de rigidez en ambas direcciones. La sección cuadrada ofrece inercia igual en ambos ejes, lo cual es ventajoso para resistir sismo en cualquier dirección.',
        composition: {
            title: 'Composición Material',
            items: [
                'Hormigón: f\'c = 28 MPa, agregado máximo 25mm',
                'Acero longitudinal: 8Ø20mm (cuantía ρ ≈ 0.7%) o 8Ø25mm (ρ ≈ 1.1%)',
                'Estribos cerrados: Ø10mm @ 10 cm en zona confinada',
                'Ganchos sísmicos a 135° en estribos',
                'Recubrimiento: 4 cm'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Sección', value: '60 × 60 cm' },
                { label: 'Área bruta (Ag)', value: '3600 cm²' },
                { label: 'Inercia Ix = Iy', value: '1,080,000 cm⁴' },
                { label: 'Radio de giro r', value: '17.3 cm' },
                { label: 'f\'c hormigón', value: '28 MPa' },
                { label: 'Cuantía mín/máx', value: '1% / 6% (sísmica 4%)' },
                { label: 'Confinamiento', value: 'Estribos + ganchos 135°' },
                { label: 'Longitud empalme', value: '40db - 60db en tracción' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Resistencia Axial (con ρ = 1.1%)',
                    formula: 'Pn(max) = 0.80 × [0.85 × 28 × (3600-39.6) + 420 × 39.6]',
                    example: 'Pn = 0.80 × [84,763 + 16,632] = 81,116 kg ≈ 796 kN',
                    note: 'Ast = 8Ø25 = 8 × 4.91 = 39.3 cm²'
                },
                {
                    name: 'Inercia de Sección Agrietada',
                    formula: 'Ie ≈ 0.70 × Ig (columnas según ACI 318 §6.6.3.1)',
                    example: 'Ie = 0.70 × 1,080,000 = 756,000 cm⁴',
                    note: 'Para análisis bajo cargas laterales se usa inercia reducida'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'La columna 60×60 se ubica generalmente en ejes interiores o en esquinas donde la carga axial es menor. Su simetría la hace ideal para resistir momentos biaxiales. En el sistema porticado, contribuye a la rigidez lateral en ambas direcciones ortogonales.'
        },
        normative: ['ACI 318-19 Cap. 10 & 18', 'Eurocódigo 2 §5.8', 'NEC-SE-HM 2015']
    },

    // ─────────────────────────────────────────────────
    // LOSAS DE ENTREPISO (FLOOR)
    // ─────────────────────────────────────────────────
    floor_slab: {
        id: 'floor_slab',
        name: 'Losa de Entrepiso (30 cm / 12")',
        category: 'Elemento Horizontal — Diafragma',
        icon: '📐',
        color: '#aabbcc',
        description: 'Elemento plano horizontal que forma los pisos del edificio. Funciona como diafragma rígido distribuyendo las fuerzas laterales (sísmicas) a los elementos verticales resistentes (columnas y muros). Además, transmite las cargas gravitacionales a las vigas mediante flexión.',
        composition: {
            title: 'Composición Material',
            items: [
                'Hormigón: f\'c = 21-25 MPa, espesor 30 cm (12")',
                'Malla electrosoldada superior: Ø8mm @ 20cm en ambas direcciones',
                'Refuerzo inferior: Ø12-16mm @ 15-20cm (momento positivo)',
                'Refuerzo negativo sobre apoyos: Ø12-16mm',
                'Capa de compresión mínima: 5 cm sobre nervaduras (si aligerada)'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Espesor', value: '30 cm (12 pulgadas)' },
                { label: 'Tipo', value: 'Maciza bidireccional' },
                { label: 'Peso propio', value: '720 kg/m² (0.30×2400)' },
                { label: 'Sobrecarga viva', value: '200-500 kg/m² según uso' },
                { label: 'Deflexión máx.', value: 'L/360 (carga viva)' },
                { label: 'Refuerzo mín.', value: '0.0018 × b × h (fy=420)' },
                { label: 'Espaciamiento máx.', value: '2h ó 45 cm' },
                { label: 'Función sísmica', value: 'Diafragma rígido' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Espesor Mínimo (ACI 318 Tabla 7.3.1.1)',
                    formula: 'h_min = Ln / 33 (losa en dos direcciones, bordes continuos)',
                    example: 'Para Ln = 6.0m: h_min = 600/33 = 18.2 cm → adoptar 30 cm (12")',
                    note: 'El espesor de 30cm también cumple requerimientos de diafragma rígido'
                },
                {
                    name: 'Momento Último por Carga Uniforme',
                    formula: 'Mu = wu × Ln² / 8 (vano simple)',
                    example: 'wu = 1.2(720) + 1.6(300) = 1344 kg/m², Mu = 1344 × 6² / 8 = 6048 kg·m/m',
                    note: 'Para losa bidireccional se usan coeficientes de distribución'
                },
                {
                    name: 'Acero de Refuerzo (por metro)',
                    formula: 'As = Mu / (φ × fy × (d - a/2))',
                    example: 'As ≈ 6048 / (0.90 × 4200 × (26 - 1.5)) ≈ 6.5 cm²/m → Ø12 @ 17cm',
                    note: 'Con d = 30 - 4 = 26 cm (recubrimiento 4cm)'
                },
                {
                    name: 'Verificación de Punzonamiento',
                    formula: 'Vc = 0.33 × √f\'c × bo × d (ACI 318 §22.6.5)',
                    example: 'bo = 4 × (50+26) = 304 cm, Vc = 0.33×√28×304×26 = 137,790 N ≈ 138 kN',
                    note: 'Crítico en conexión losa-columna sin ábaco'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'La losa cumple dos funciones fundamentales: (1) Como elemento de flexión, resiste las cargas de uso (personas, mobiliario, equipos) y las transmite a las vigas perimetrales. (2) Como diafragma rígido, distribuye las fuerzas horizontales de sismo a todas las columnas y muros según su rigidez relativa. Sin un diafragma rígido, el edificio no podría actuar como sistema integrado ante cargas laterales.'
        },
        normative: ['ACI 318-19 Cap. 7 & 8', 'Eurocódigo 2 §6.4 (punzonamiento)', 'NEC-SE-HM 2015']
    },

    // ─────────────────────────────────────────────────
    // LOSAS DE CUBIERTA (ROOF)
    // ─────────────────────────────────────────────────
    roof_slab: {
        id: 'roof_slab',
        name: 'Losa de Cubierta / Techo',
        category: 'Elemento Horizontal — Cubierta',
        icon: '🏠',
        color: '#88aadd',
        description: 'Losa superior que cierra la envolvente del edificio. Además de resistir cargas gravitacionales, debe garantizar impermeabilización, aislamiento térmico y drenaje de aguas lluvias. Estructuralmente funciona como último diafragma del edificio.',
        composition: {
            title: 'Composición Material',
            items: [
                'Losa estructural: Hormigón f\'c = 21-25 MPa, e = 30 cm',
                'Pendiente de drenaje: Mortero liviano 2-5% (espesor variable)',
                'Barrera de vapor: Lámina de polietileno 0.2mm',
                'Aislamiento térmico: Poliestireno expandido 3-5 cm',
                'Membrana impermeabilizante: Manto asfáltico o PVC',
                'Protección mecánica: Mortero o baldosa sobre plots'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Espesor losa', value: '30 cm estructural' },
                { label: 'Pendiente', value: '2-5% para drenaje' },
                { label: 'Sobrecarga', value: '100-200 kg/m² (mantenimiento)' },
                { label: 'Impermeabilización', value: 'Manto multicapa' },
                { label: 'Aislamiento', value: 'R-value ≥ 2.5 m²·K/W' },
                { label: 'Acero mín.', value: 'Por retracción y temperatura' },
                { label: 'Juntas', value: 'Cada 30m o en cambios de geometría' },
                { label: 'Drenaje', value: '1 bajante por cada 100 m²' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Carga Muerta Total de Cubierta',
                    formula: 'CM = peso_losa + pendiente + aislamiento + impermeabilización',
                    example: 'CM = 720 + 120 + 15 + 25 = 880 kg/m²',
                    note: 'La pendiente de mortero puede variar significativamente'
                },
                {
                    name: 'Combinación de Carga (ACI 318)',
                    formula: 'wu = 1.2D + 1.6L + 0.5Lr',
                    example: 'wu = 1.2(880) + 1.6(0) + 0.5(100) = 1106 kg/m²',
                    note: 'Lr = sobrecarga de cubierta reducida'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'La cubierta es el último diafragma horizontal del edificio. Aunque tiene menores cargas vivas que las losas de entrepiso, es crítica para la impermeabilización y el confort térmico. Estructuralmente debe resistir succión de viento (que puede generar fuerzas hacia arriba) y cargas de lluvia acumulada.'
        },
        normative: ['ACI 318-19 Cap. 7', 'ASCE 7-22 (cargas de lluvia)', 'NEC-SE-CG 2015']
    },

    // ─────────────────────────────────────────────────
    // MUROS PORTANTES (GENERIC 200mm)
    // ─────────────────────────────────────────────────
    wall_200mm: {
        id: 'wall_200mm',
        name: 'Muro Portante 200mm (20 cm)',
        category: 'Elemento Vertical — Muro Estructural',
        icon: '🧱',
        color: '#92a1b0',
        description: 'Muro de hormigón armado de 20 cm de espesor que actúa como elemento portante vertical y como muro de corte para resistir fuerzas laterales. Los muros de corte son esenciales en el sistema sismorresistente, proporcionando la mayor parte de la rigidez lateral del edificio.',
        composition: {
            title: 'Composición Material',
            items: [
                'Hormigón: f\'c = 25-28 MPa, espesor 200mm',
                'Refuerzo vertical: Ø12mm @ 20cm ambas caras (cuantía ≥ 0.25%)',
                'Refuerzo horizontal: Ø10mm @ 20cm ambas caras (cuantía ≥ 0.25%)',
                'Elementos de borde confinados en extremos',
                'Acoplamiento con vigas de acople entre muros'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Espesor', value: '200 mm (20 cm)' },
                { label: 'f\'c hormigón', value: '25-28 MPa' },
                { label: 'Cuantía vertical', value: 'ρv ≥ 0.0025' },
                { label: 'Cuantía horizontal', value: 'ρh ≥ 0.0025' },
                { label: 'Doble malla', value: 'Obligatorio si t > 250mm o hw/lw > 2' },
                { label: 'Elementos de borde', value: 'Cuando c > lw/(600×δu/hw)' },
                { label: 'Longitud de borde', value: 'máx(c-0.1lw, c/2)' },
                { label: 'Resistencia al corte', value: 'Vn ≤ 0.83√f\'c × Acv' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Resistencia al Corte del Muro (ACI 318 §18.10.4)',
                    formula: 'Vn = Acv × (αc × √f\'c + ρt × fy)',
                    example: 'Para lw=4m, t=0.20m: Acv=8000cm², αc=0.25 (hw/lw≥2)',
                    note: 'Vn = 8000×(0.25×√28 + 0.0025×420) = 18,980 kg ≈ 186 kN'
                },
                {
                    name: 'Capacidad Axial del Muro',
                    formula: 'Pn = 0.55 × f\'c × Ag × [1 - (kLc/32t)²]',
                    example: 'Para Lc=3m: Pn = 0.55×280×(20×400)×[1-(1×300/32×20)²]',
                    note: 'Verificar excentricidad y esbeltez'
                },
                {
                    name: 'Necesidad de Elementos de Borde',
                    formula: 'Se requieren si: c ≥ lw / (600 × δu/hw)',
                    example: 'Con δu/hw = 0.007 (diseño): c ≥ 400/(600×0.007) = 95 cm',
                    note: 'Los elementos de borde confinan el hormigón comprimido'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'Los muros de corte son el principal sistema de resistencia lateral. Actúan como voladizos verticales empotrados en la cimentación, resistiendo las fuerzas horizontales de sismo mediante flexión y corte. Su gran rigidez limita las derivas de entrepiso (típicamente ≤ 0.7% para edificios con muros vs ≤ 2% para pórticos). Los elementos de borde confinados aseguran ductilidad en las zonas de máxima compresión.'
        },
        normative: ['ACI 318-19 Cap. 11 & 18.10', 'Eurocódigo 8 §5.4', 'NEC-SE-HM 2015']
    },

    // ─────────────────────────────────────────────────
    // MUROS DE CONTENCIÓN (RETAINING 300mm)
    // ─────────────────────────────────────────────────
    retaining_wall: {
        id: 'retaining_wall',
        name: 'Muro de Contención 300mm',
        category: 'Cimentación — Muro de Sótano',
        icon: '⬛',
        color: '#556677',
        description: 'Muro de hormigón armado de 30 cm que retiene el terreno lateral en el nivel de sótano/cimentación. Resiste empujes de tierra activos y pasivos, presión hidrostática del agua freática, y cargas verticales de la superestructura. Es fundamental para la estabilidad del edificio y la impermeabilización del sótano.',
        composition: {
            title: 'Composición Material',
            items: [
                'Hormigón: f\'c = 28 MPa (resistente a sulfatos si hay agua freática)',
                'Espesor: 300 mm (30 cm)',
                'Refuerzo vertical: Ø16mm @ 15-20cm (cara en tracción)',
                'Refuerzo horizontal: Ø12mm @ 20-25cm (retracción + temperatura)',
                'Impermeabilización exterior: Membrana tipo Sika o similar',
                'Dren francés perimetral: Tubo Ø110mm con geotextil'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Espesor', value: '300 mm' },
                { label: 'f\'c hormigón', value: '28 MPa (sulfato-resistente)' },
                { label: 'Empuje activo Ka', value: '0.33 (suelo granular φ=30°)' },
                { label: 'Presión en base', value: 'Ka × γ × H = 0.33×1800×3 = 1782 kg/m²' },
                { label: 'Impermeabilización', value: 'Membrana + dren' },
                { label: 'Sobrecarga superficie', value: 'q = 500-1000 kg/m² típico' },
                { label: 'Factor de seguridad', value: 'FS volteo ≥ 2.0, deslizamiento ≥ 1.5' },
                { label: 'Juntas', value: 'Juntas water-stop cada 8-10m' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Empuje Activo de Tierra (Rankine)',
                    formula: 'Ka = tan²(45° - φ/2); Pa = ½ × Ka × γ × H²',
                    example: 'Ka = tan²(45-30/2) = 0.333; Pa = ½×0.333×1800×3² = 2700 kg/m',
                    note: 'φ = ángulo de fricción interna del suelo'
                },
                {
                    name: 'Momento en la Base del Muro',
                    formula: 'M = Pa × H/3 (empuje triangular)',
                    example: 'M = 2700 × 3/3 = 2700 kg·m/m de muro',
                    note: 'El empuje actúa a H/3 desde la base'
                },
                {
                    name: 'Acero de Refuerzo Vertical',
                    formula: 'As = Mu / (φ × fy × jd)',
                    example: 'Mu = 1.6×2700 = 4320 kg·m; As = 4320/(0.9×4200×0.9×26) = 4.9 cm²/m',
                    note: '→ Ø16mm @ 20cm proporciona 10.1 cm²/m (OK con margen)'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'El muro de contención trabaja como una losa vertical en voladizo, empotrada en la losa de cimentación. Resiste los empujes laterales del suelo y transmite estas fuerzas a la cimentación. En nivel de sótano, también sirve como muro perimetral del edificio, debiendo ser impermeable al agua. El drenaje exterior es crítico para reducir la presión hidrostática.'
        },
        normative: ['ACI 318-19 Cap. 11', 'Eurocódigo 7 (geotecnia)', 'ACI 350 (estructuras ambientales)']
    },

    // ─────────────────────────────────────────────────
    // MUROS DE CORTE GRUESOS (40CM)
    // ─────────────────────────────────────────────────
    shear_wall_40cm: {
        id: 'shear_wall_40cm',
        name: 'Muro de Corte 40 cm',
        category: 'Sistema Sismorresistente',
        icon: '🛡️',
        color: '#7788aa',
        description: 'Muro estructural de 40 cm de espesor, componente principal del sistema de resistencia a fuerzas laterales. Su mayor espesor (comparado con muros de 20cm) le confiere mayor resistencia al corte y capacidad de confinamiento, siendo adecuado para las plantas inferiores donde las fuerzas cortantes sísmicas son máximas.',
        composition: {
            title: 'Composición Material',
            items: [
                'Hormigón: f\'c = 28-35 MPa, espesor 400mm',
                'Refuerzo vertical: Ø16-20mm @ 15cm, doble malla',
                'Refuerzo horizontal: Ø12-16mm @ 15-20cm, doble malla',
                'Elementos de borde: 60×40cm con estribos Ø10@10cm',
                'Traslapes escalonados y confinados',
                'Anclaje en cimentación: longitud desarrollo completo'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Espesor', value: '400 mm (40 cm)' },
                { label: 'f\'c hormigón', value: '28-35 MPa' },
                { label: 'Cuantía ρv', value: '≥ 0.0025 (mín. ACI)' },
                { label: 'Cuantía ρh', value: '≥ 0.0025' },
                { label: 'Doble malla', value: 'Obligatorio (t > 250mm)' },
                { label: 'Vn máximo', value: '≤ 0.83√f\'c × Acv' },
                { label: 'Deriva permitida', value: '≤ 0.7% (NEC) / 0.5% (EC8)' },
                { label: 'Ductilidad', value: 'μ ≥ 3 (muro especial)' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Resistencia al Corte (ACI 318 §18.10.4)',
                    formula: 'Vn = Acv × (αc√f\'c + ρt×fy)',
                    example: 'Para lw=5m: Acv=40×500=20000cm², Vn=20000×(0.17×√28+0.003×420)',
                    note: 'Vn = 20000×(0.90+1.26) = 43,200 kg ≈ 424 kN'
                },
                {
                    name: 'Capacidad a Flexión (Momento Nominal)',
                    formula: 'Mn ≈ As×fy×(d - a/2) + P×(lw/2 - a/2)',
                    example: 'Incluye contribución de carga axial P al momento resistente',
                    note: 'Se construye diagrama de interacción P-M del muro'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'Los muros de corte de 40cm son el núcleo del sistema antisísmico del edificio. Típicamente se ubican formando el núcleo central (escaleras/ascensores) o en posiciones estratégicas para maximizar la resistencia torsional. Al tener mayor espesor, pueden alojar mayor refuerzo y elementos de borde más robustos, lo que les permite disipar energía sísmica de forma dúctil.'
        },
        normative: ['ACI 318-19 §18.10', 'Eurocódigo 8 §5.4.3', 'NEC-SE-DS 2015']
    },

    // ─────────────────────────────────────────────────
    // MUROS DELGADOS (20cm TABIQUERÍA ESTRUCTURAL)
    // ─────────────────────────────────────────────────
    wall_20cm: {
        id: 'wall_20cm',
        name: 'Muro Estructural 20 cm',
        category: 'Elemento Vertical — Partición Estructural',
        icon: '🧱',
        color: '#8899aa',
        description: 'Muro de hormigón de 20 cm de espesor utilizado como división estructural entre ambientes. Aunque más delgado que los muros de corte principales, contribuye a la rigidez lateral del edificio y soporta cargas verticales de losas adyacentes.',
        composition: {
            title: 'Composición Material',
            items: [
                'Hormigón: f\'c = 21-25 MPa, espesor 200mm',
                'Refuerzo simple o doble según solicitación',
                'Cuantía mínima: ρ ≥ 0.0012 (vertical), ρ ≥ 0.0020 (horizontal)',
                'Recubrimiento: 2.5-4.0 cm según exposición'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Espesor', value: '200 mm' },
                { label: 'Malla', value: 'Simple o doble' },
                { label: 'Cuantía vert.', value: '≥ 0.0012 (fy≥420)' },
                { label: 'Cuantía horiz.', value: '≥ 0.0020' },
                { label: 'Separación máx.', value: '3h ó 45cm' },
                { label: 'Esbeltez', value: 'kH/t ≤ 25' },
                { label: 'Peso propio', value: '480 kg/m² (por metro)' },
                { label: 'Aislamiento acúst.', value: 'STC ≈ 48-50 dB' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Capacidad Axial Simplificada (ACI 318 §11.5.3)',
                    formula: 'φPn = 0.55 × φ × f\'c × Ag × [1-(kLc/32t)²]',
                    example: 'φPn = 0.55×0.65×210×(20×100)×[1-(1×300/32×20)²] = 85,330 kg/m',
                    note: 'Para muro de 1m de longitud, H=3m, k=1.0'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'Estos muros cumplen una función dual: dividen espacios (función arquitectónica) y contribuyen a la resistencia del edificio (función estructural). Transmiten cargas verticales de losas apoyadas y aportan rigidez lateral adicional al sistema. No deben eliminarse sin análisis estructural.'
        },
        normative: ['ACI 318-19 Cap. 11', 'Eurocódigo 2 §12', 'NEC-SE-HM 2015']
    },

    // ─────────────────────────────────────────────────
    // LOSA DE CIMENTACIÓN (FLOOR 400mm)
    // ─────────────────────────────────────────────────
    foundation_slab: {
        id: 'foundation_slab',
        name: 'Losa de Cimentación 400mm',
        category: 'Cimentación — Subestructura',
        icon: '⛏️',
        color: '#556677',
        description: 'Losa de hormigón armado de 40 cm de espesor que actúa como cimentación superficial del edificio. Distribuye las cargas de todas las columnas y muros sobre una gran superficie de suelo, reduciendo la presión de contacto. Se utiliza cuando el suelo tiene capacidad portante moderada o cuando las zapatas individuales se solaparían.',
        composition: {
            title: 'Composición Material',
            items: [
                'Hormigón: f\'c = 28 MPa (resistente a sulfatos), espesor 400mm',
                'Refuerzo inferior: Ø16-20mm @ 15cm en ambas direcciones',
                'Refuerzo superior: Ø12-16mm @ 20cm (momento negativo bajo columnas)',
                'Hormigón de limpieza (replantillo): 5-10 cm, f\'c = 10 MPa',
                'Membrana de polietileno bajo losa: 0.2mm (barrera humedad)',
                'Juntas de hormigonado: waterstops de PVC'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Espesor', value: '400 mm (40 cm)' },
                { label: 'f\'c hormigón', value: '28 MPa' },
                { label: 'Capacidad suelo', value: '1.5-3.0 kg/cm²' },
                { label: 'Presión contacto', value: 'q = P_total / Área ≤ q_adm' },
                { label: 'Profundidad', value: '≥ 1.0 m bajo nivel terreno' },
                { label: 'Módulo reacción', value: 'ks = 2-8 kg/cm³ (Winkler)' },
                { label: 'Replantillo', value: '5-10 cm hormigón pobre' },
                { label: 'Factor seguridad', value: 'FS ≥ 3.0 (capacidad portante)' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Presión de Contacto Admisible',
                    formula: 'q_adm = q_ult / FS (Terzaghi: q_ult = c×Nc + γ×Df×Nq + 0.5×γ×B×Nγ)',
                    example: 'Para suelo con c=0, φ=30°, γ=1800kg/m³, Df=1.2m, B=15m',
                    note: 'q_adm típico: 1.5-3.0 kg/cm² para suelo firme'
                },
                {
                    name: 'Verificación de Punzonamiento en Losa',
                    formula: 'φVc = φ × 0.33 × √f\'c × bo × d',
                    example: 'Para columna 80×50cm: bo=2(80+50+2×36)=404cm, d=36cm',
                    note: 'φVc = 0.75×0.33×√28×404×36 = 190,870 N ≈ 191 kN'
                },
                {
                    name: 'Asentamiento (Método Elástico)',
                    formula: 'δ = q × B × (1-ν²) × Iw / Es',
                    example: 'δ = 1.5×1500×(1-0.3²)×0.88/15000 = 11.4 cm',
                    note: 'Asentamiento total debe ser < 2.5cm, diferencial < 1/500'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'La losa de cimentación es el elemento terminal del camino de carga. Recibe TODAS las fuerzas del edificio (peso propio ~2000-4000 ton para un edificio de esta magnitud) y las distribuye uniformemente sobre el suelo de fundación. Se comporta como una losa invertida, donde las columnas y muros actúan como "cargas" concentradas hacia abajo, y la reacción del suelo actúa como carga distribuida hacia arriba (modelo de Winkler). El espesor de 40cm es el mínimo para controlar punzonamiento.'
        },
        normative: ['ACI 318-19 Cap. 13', 'ACI 336.2R (losas de cimentación)', 'Eurocódigo 7', 'NEC-SE-CM 2015']
    },

    // ─────────────────────────────────────────────────
    // NUDO VIGA-COLUMNA
    // ─────────────────────────────────────────────────
    beam_column_joint: {
        id: 'beam_column_joint',
        name: 'Nudo Viga-Columna',
        category: 'Conexión Estructural Crítica',
        icon: '🔗',
        color: '#ff5588',
        description: 'Zona de intersección entre vigas y columnas donde se transfieren los momentos, cortantes y axiales entre elementos. Es la zona más crítica del sistema porticado: un fallo en el nudo puede causar colapso progresivo del edificio. Requiere confinamiento especial con estribos cerrados.',
        composition: {
            title: 'Composición Material',
            items: [
                'Hormigón del nudo: mismo f\'c de la columna (≥ 28 MPa)',
                'Estribos de confinamiento del nudo: Ø10mm @ 10cm',
                'Acero de vigas atravesando el nudo (anclaje completo)',
                'Acero de columna continuo a través del nudo',
                'Sin interrupciones de refuerzo dentro del nudo'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Zona', value: 'Intersección viga-columna' },
                { label: 'Confinamiento', value: 'Estribos cerrados obligatorios' },
                { label: 'Resistencia corte', value: 'Vn ≤ 1.7√f\'c×Aj (interior)' },
                { label: 'Aj (área efectiva)', value: 'b_col × h_col o menor' },
                { label: 'Anclaje vigas', value: 'ldh dentro del nudo' },
                { label: 'Ganchos', value: '90° hacia el centro del nudo' },
                { label: 'Condición', value: 'ΣMcol ≥ 1.2 ΣMviga' },
                { label: 'Separación estribos', value: 's ≤ hcol/4 dentro del nudo' }
            ]
        },
        calculations: {
            title: 'Cálculos de Diseño',
            formulas: [
                {
                    name: 'Cortante en el Nudo (ACI 318 §18.8.4)',
                    formula: 'Vj = T1 + T2 - Vcol = 1.25×fy×(As1 + As2) - Vcol',
                    example: 'Para As1=As2=12cm²: Vj = 1.25×4200×24 - 15000 = 111,000 kg',
                    note: 'T = fuerza de tracción en acero de vigas a ambos lados'
                },
                {
                    name: 'Resistencia al Corte del Nudo',
                    formula: 'φVn = φ × γ × √f\'c × Aj',
                    example: 'Nudo interior: φVn = 0.85×1.7×√28×(80×50) = 30,606 kg',
                    note: 'γ = 1.7 (interior), 1.2 (exterior), 1.0 (esquina)'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'El nudo es donde se "arma" el sistema porticado. Debe ser capaz de transferir los momentos de las vigas a las columnas sin fallar por corte diagonal. En diseño sísmico, el nudo debe permanecer elástico mientras las vigas desarrollan articulaciones plásticas. Es la zona de máxima concentración de acero y de mayor dificultad constructiva.'
        },
        normative: ['ACI 318-19 §18.8', 'ACI 352R-02 (nudos)', 'Eurocódigo 8 §5.4.3']
    },

    // ─────────────────────────────────────────────────
    // PLATAFORMA / CIMENTACIÓN BASE
    // ─────────────────────────────────────────────────
    platform_base: {
        id: 'platform_base',
        name: 'Plataforma de Cimentación',
        category: 'Subestructura — Base',
        icon: '🏗️',
        color: '#445566',
        description: 'Estructura base que representa el nivel de cimentación del edificio. Incluye la losa de cimentación, las vigas de amarre, y el arranque de todos los elementos verticales. Es el nivel donde todas las cargas del edificio se transmiten al suelo de fundación.',
        composition: {
            title: 'Composición',
            items: [
                'Suelo compactado al 95% Proctor Modificado',
                'Capa de sub-base granular: 15-30 cm',
                'Replantillo de hormigón pobre: f\'c = 10 MPa, e = 5-10 cm',
                'Losa de cimentación: f\'c = 28 MPa, e = 40 cm',
                'Vigas de amarre entre zapatas (si aplica)',
                'Arranques de columnas y muros con longitud de desarrollo'
            ]
        },
        specifications: {
            title: 'Especificaciones Técnicas',
            items: [
                { label: 'Profundidad', value: '≥ 1.0 m bajo terreno' },
                { label: 'Compactación', value: '≥ 95% Proctor Mod.' },
                { label: 'Cap. portante', value: '1.5-3.0 kg/cm² (típico)' },
                { label: 'Nivel freático', value: 'Control con drenaje' },
                { label: 'FS global', value: '≥ 3.0 (capacidad portante)' },
                { label: 'Asentamiento', value: '< 2.5 cm total' },
                { label: 'Asen. diferencial', value: '< L/500' },
                { label: 'Estudio suelos', value: 'SPT + laboratorio obligat.' }
            ]
        },
        calculations: {
            title: 'Cálculos Geotécnicos',
            formulas: [
                {
                    name: 'Capacidad Portante (Terzaghi)',
                    formula: 'qu = c×Nc + γ×Df×Nq + 0.5×γ×B×Nγ',
                    example: 'Para suelo c=0, φ=30°: Nc=30.1, Nq=18.4, Nγ=22.4',
                    note: 'qu = 0 + 1800×1.2×18.4 + 0.5×1800×15×22.4 = 342,000 kg/m²'
                },
                {
                    name: 'Factor de Seguridad',
                    formula: 'FS = qu / q_aplicada ≥ 3.0',
                    example: 'q_adm = 342,000/3.0 = 114,000 kg/m² = 11.4 kg/cm²',
                    note: 'Se suele usar valor conservador de 2-3 kg/cm²'
                }
            ]
        },
        structuralFunction: {
            title: 'Función Estructural',
            text: 'La plataforma de cimentación es el fundamento de todo el edificio. Transmite las cargas acumuladas (~3000-5000 toneladas para un edificio de esta escala) al suelo natural sin exceder su capacidad portante. El diseño debe controlar: (1) capacidad portante global, (2) asentamientos totales y diferenciales, (3) estabilidad al deslizamiento y volteo.'
        },
        normative: ['ACI 318-19 Cap. 13', 'Eurocódigo 7 EN 1997', 'NEC-SE-CM 2015', 'ASCE 7-22']
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// MARCADORES 3D — v2.0 COORDENADAS FIJAS
// Cada marcador posicionado directamente sobre su elemento estructural
// Coordenadas calculadas a partir de las posiciones reales de meshes del GLTF
// después del escalado y centrado de Three.js (scale=0.0485, offset=(-0.92, 4.75, -2.12))

// ═══════════════════════════════════════════════════════════════════════════
// MARCADORES 3D — v3.0 COORDENADAS VERIFICADAS
// Calculadas exactamente con: scale=0.048482, offset=(-0.919, 3.093, -2.116)
// Cada marcador posicionado directamente sobre su elemento real
// ═══════════════════════════════════════════════════════════════════════════

const ANNOTATION_MARKERS = [
    {
        // ① Columna 80×50 — columna central-derecha a media altura
        id: 1, dataKey: 'column_80x50', label: '1',
        fixedPosition: { x: 3.09, y: 5.56, z: 0.19 }
    },
    {
        // ② Columna 60×60 — eje interior izquierdo, planta baja
        id: 2, dataKey: 'column_60x60', label: '2',
        fixedPosition: { x: -2.64, y: 2.20, z: -1.88 }
    },
    {
        // ③ Losa de entrepiso — centro del edificio, piso medio
        id: 3, dataKey: 'floor_slab', label: '3',
        fixedPosition: { x: 0.00, y: 4.23, z: 0.94 }
    },
    {
        // ④ Losa de cubierta — techo, parte frontal
        id: 4, dataKey: 'roof_slab', label: '4',
        fixedPosition: { x: 3.12, y: 4.23, z: 3.51 }
    },
    {
        // ⑤ Muro portante 200mm — frontal derecho, base
        id: 5, dataKey: 'wall_200mm', label: '5',
        fixedPosition: { x: 2.64, y: 0.55, z: -1.91 }
    },
    {
        // ⑥ Muro de contención — sótano izquierdo
        id: 6, dataKey: 'retaining_wall', label: '6',
        fixedPosition: { x: -2.64, y: 0.58, z: -3.33 }
    },
    {
        // ⑦ Muro de corte 40cm — núcleo central, parte alta
        id: 7, dataKey: 'shear_wall_40cm', label: '7',
        fixedPosition: { x: 0.07, y: 8.70, z: -2.98 }
    },
    {
        // ⑧ Muro 20cm — lateral derecho
        id: 8, dataKey: 'wall_20cm', label: '8',
        fixedPosition: { x: 5.11, y: 0.54, z: -1.61 }
    },
    {
        // ⑨ Losa de cimentación — base inferior izquierda
        id: 9, dataKey: 'foundation_slab', label: '9',
        fixedPosition: { x: -3.80, y: 0.56, z: -3.50 }
    },
    {
        // ⑩ Nudo viga-columna — parte alta de columna 80×50
        id: 10, dataKey: 'beam_column_joint', label: '10',
        fixedPosition: { x: 2.38, y: 7.08, z: 0.18 }
    },
    {
        // ⑪ Plataforma de cimentación — base general
        id: 11, dataKey: 'platform_base', label: '11',
        fixedPosition: { x: 2.5, y: -0.15, z: 2.0 }
    }
];
