/**
 * BASE DE DATOS DE TOOLTIPS EDUCATIVOS
 * Contenido técnico para ZAPATAS (Corridas y Aisladas)
 */

window.TOOLTIPS_DATA = {
    
    // ==========================================
    // DIMENSIONES DE LA ZAPATA
    // ==========================================
    
    'ancho-zapata': {
        titulo: '📐 Ancho de Zapata (B)',
        descripcion: 'Dimensión horizontal de la zapata, calculada para distribuir la carga sobre el suelo sin exceder la capacidad portante admisible.',
        formula: 'B = P<sub>servicio</sub> / q<sub>neto</sub>',
        donde: [
            '<strong>P<sub>servicio</sub></strong> = D + L (Carga total de servicio en kN o kN/m)',
            '<strong>q<sub>neto</sub></strong> = q<sub>adm</sub> - γ<sub>suelo</sub> · D<sub>f</sub> (Presión neta disponible)',
            '<strong>D</strong> = Carga muerta (kN o kN/m)',
            '<strong>L</strong> = Carga viva (kN o kN/m)',
            '<strong>γ<sub>suelo</sub></strong> = 18 kN/m³ (peso específico del suelo)'
        ],
        norma: 'NCh433 Art. 5.6 - Diseño de Fundaciones',
        nota: 'Se redondea hacia arriba a múltiplos de 5 cm para facilitar la construcción.'
    },
    
    'altura-zapata': {
        titulo: '📏 Altura de Zapata (h)',
        descripcion: 'Espesor total de la zapata, determinado por requisitos de resistencia al cortante, punzonamiento y momento flector.',
        formula: 'h ≥ máx(30 cm, B/10, h<sub>cortante</sub>, h<sub>punzonamiento</sub>)',
        donde: [
            '<strong>30 cm</strong> = Altura mínima constructiva',
            '<strong>B/10</strong> = Criterio práctico de proporción',
            '<strong>h<sub>cortante</sub></strong> = Altura requerida por cortante en una dirección',
            '<strong>h<sub>punzonamiento</sub></strong> = Altura requerida por punzonamiento (zapatas aisladas)'
        ],
        norma: 'NCh430 Art. 11.11 - Requisitos de Espesor',
        nota: 'La altura debe permitir colocar el acero con el recubrimiento adecuado (70 mm en contacto con terreno).'
    },
    
    'altura-efectiva': {
        titulo: '📊 Altura Efectiva (d)',
        descripcion: 'Distancia desde la fibra extrema en compresión hasta el centroide del acero de refuerzo en tracción.',
        formula: 'd = h - recubrimiento - φ/2',
        donde: [
            '<strong>h</strong> = Altura total de la zapata (m)',
            '<strong>recubrimiento</strong> = 70 mm (contacto con terreno según NCh430)',
            '<strong>φ/2</strong> ≈ 10 mm (mitad del diámetro estimado de la barra)'
        ],
        norma: 'NCh430 Art. 7.7 - Recubrimientos de Hormigón',
        nota: 'La altura efectiva es el parámetro clave para el cálculo de momento resistente y cortante.'
    },
    
    // ==========================================
    // CARGAS Y MOMENTOS
    // ==========================================
    
    'carga-ultima': {
        titulo: '⚡ Carga Última (P<sub>u</sub>)',
        descripcion: 'Carga mayorada utilizada para el diseño estructural, combinando cargas muertas y vivas con factores de seguridad.',
        formula: 'P<sub>u</sub> = 1.2D + 1.6L',
        donde: [
            '<strong>1.2</strong> = Factor de mayoración para carga muerta',
            '<strong>D</strong> = Carga muerta (kN o kN/m)',
            '<strong>1.6</strong> = Factor de mayoración para carga viva',
            '<strong>L</strong> = Carga viva (kN o kN/m)'
        ],
        norma: 'NCh1537 Art. 9.2 - Combinación de Cargas U2',
        nota: 'Esta combinación representa el estado límite último más común para fundaciones.'
    },
    
    'momento-ultimo': {
        titulo: '🔧 Momento Último (M<sub>u</sub>)',
        descripcion: 'Momento flector mayorado en la sección crítica de la zapata, utilizado para diseñar el acero de refuerzo.',
        formula: 'M<sub>u</sub> = q<sub>u</sub> · ℓ² / 2',
        donde: [
            '<strong>q<sub>u</sub></strong> = P<sub>u</sub> / B (Presión última en kN/m² o kPa)',
            '<strong>ℓ</strong> = Voladizo de la zapata = (B - b<sub>muro</sub>)/2 para zapata corrida',
            '<strong>ℓ</strong> = Voladizo de la zapata = (B - c)/2 para zapata aislada',
            '<strong>b<sub>muro</sub></strong> = Ancho del muro (m)',
            '<strong>c</strong> = Dimensión de la columna (m)'
        ],
        norma: 'NCh430 Art. 15.4 - Diseño por Flexión en Zapatas',
        nota: 'La sección crítica para momento está en la cara del muro o columna.'
    },
    
    // ==========================================
    // DISEÑO DE ACERO
    // ==========================================
    
    'acero-requerido': {
        titulo: '🔩 Acero Requerido (A<sub>s</sub>)',
        descripcion: 'Área de acero de refuerzo necesaria para resistir el momento último, calculada mediante equilibrio de fuerzas internas.',
        formula: 'A<sub>s</sub> = M<sub>u</sub> / (φ · f<sub>y</sub> · j · d)',
        donde: [
            '<strong>M<sub>u</sub></strong> = Momento último (kN·m)',
            '<strong>φ</strong> = 0.90 (Factor de reducción por flexión)',
            '<strong>f<sub>y</sub></strong> = Tensión de fluencia del acero (MPa)',
            '<strong>j</strong> ≈ 0.90 (Brazo de palanca interno)',
            '<strong>d</strong> = Altura efectiva (m)'
        ],
        norma: 'NCh430 Art. 10.2 - Diseño por Flexión',
        nota: 'El área calculada debe ser mayor o igual al acero mínimo (ρ<sub>min</sub> = 0.0018 para zapatas).'
    },
    
    'configuracion-barras': {
        titulo: '📏 Configuración de Barras',
        descripcion: 'Distribución del acero de refuerzo en barras de diámetro específico con espaciamiento uniforme.',
        formula: 'n · A<sub>barra</sub> ≥ A<sub>s</sub>',
        donde: [
            '<strong>n</strong> = Número de barras',
            '<strong>A<sub>barra</sub></strong> = Área de una barra del diámetro seleccionado (cm²)',
            '<strong>A<sub>s</sub></strong> = Área de acero requerida (cm²)',
            '<strong>Espaciamiento (s)</strong> = Ancho total / (n-1)'
        ],
        norma: 'NCh430 Art. 7.6 - Espaciamiento del Refuerzo',
        nota: 'Espaciamiento máximo: 45 cm. Espaciamiento mínimo: 3φ o 25 mm.'
    },
    
    // ==========================================
    // VERIFICACIONES
    // ==========================================
    
    'presion-suelo': {
        titulo: '🌍 Verificación de Presión en el Suelo',
        descripcion: 'Comprobación de que la presión transmitida al suelo no exceda su capacidad portante admisible.',
        formula: 'q<sub>actual</sub> ≤ q<sub>adm</sub>',
        donde: [
            '<strong>q<sub>actual</sub></strong> = P<sub>total</sub> / B',
            '<strong>P<sub>total</sub></strong> = P<sub>servicio</sub> + Peso zapata + Peso suelo',
            '<strong>q<sub>adm</sub></strong> = Capacidad portante admisible del suelo (kPa)',
            '<strong>B</strong> = Ancho de la zapata (m)'
        ],
        norma: 'NCh433 Art. 5.6 - Presiones Admisibles',
        nota: 'Esta verificación se realiza con cargas de servicio (sin mayorar). Factor de seguridad mínimo: 3.0'
    },
    
    'cortante-zapata': {
        titulo: '✂️ Verificación por Cortante',
        descripcion: 'Comprobación de que el hormigón pueda resistir el esfuerzo de corte sin necesidad de refuerzo transversal.',
        formula: 'V<sub>u</sub> ≤ φV<sub>c</sub>',
        donde: [
            '<strong>V<sub>u</sub></strong> = Cortante último en sección crítica (kN)',
            '<strong>φ</strong> = 0.85 (Factor de reducción por cortante)',
            '<strong>V<sub>c</sub></strong> = 0.53√f\'<sub>c</sub> · b · d (Resistencia del hormigón)',
            '<strong>b</strong> = Ancho considerado = 100 cm para zapata corrida',
            '<strong>d</strong> = Altura efectiva (cm)'
        ],
        norma: 'NCh430 Art. 11.11.2 - Cortante en Zapatas',
        nota: 'Sección crítica ubicada a una distancia "d" desde la cara del muro o columna.'
    },
    
    'punzonamiento': {
        titulo: '🎯 Verificación por Punzonamiento',
        descripcion: 'Comprobación de la resistencia a la penetración de la columna a través de la zapata (solo zapatas aisladas).',
        formula: 'P<sub>u</sub> ≤ φV<sub>c</sub>',
        donde: [
            '<strong>P<sub>u</sub></strong> = Carga última de la columna (kN)',
            '<strong>φ</strong> = 0.85 (Factor de reducción)',
            '<strong>V<sub>c</sub></strong> = 1.06√f\'<sub>c</sub> · b<sub>o</sub> · d',
            '<strong>b<sub>o</sub></strong> = Perímetro crítico = 4(c + d)',
            '<strong>c</strong> = Dimensión de la columna (m)',
            '<strong>d</strong> = Altura efectiva (m)'
        ],
        norma: 'NCh430 Art. 11.11.1 - Resistencia al Punzonamiento',
        nota: 'El perímetro crítico se mide a d/2 desde la cara de la columna.'
    },
    
    // ==========================================
    // INFORMACIÓN GENERAL
    // ==========================================
    
    'recubrimiento': {
        titulo: '🛡️ Recubrimiento de Hormigón',
        descripcion: 'Espesor de hormigón desde la superficie exterior hasta el acero de refuerzo, que protege contra corrosión y proporciona resistencia al fuego.',
        formula: 'r = 70 mm (contacto con terreno)',
        donde: [
            '<strong>70 mm</strong> = Recubrimiento mínimo para elementos en contacto con el suelo',
            '<strong>50 mm</strong> = Recubrimiento para ambientes no agresivos (no aplicable)',
            '<strong>40 mm</strong> = Recubrimiento para losas interiores (no aplicable)'
        ],
        norma: 'NCh430 Art. 7.7 - Recubrimientos de Protección',
        nota: 'El recubrimiento aumenta con ambientes más agresivos (ambiente marino, industrial, etc.).'
    },
    
    'factor-seguridad': {
        titulo: '⚖️ Factor de Seguridad',
        descripcion: 'Relación entre la capacidad resistente y la solicitación actuante. Indica el margen de seguridad del diseño.',
        formula: 'FS = Capacidad / Solicitación',
        donde: [
            '<strong>FS ≥ 1.5</strong> = Factor mínimo para estado límite de servicio',
            '<strong>FS ≥ 3.0</strong> = Factor típico para capacidad portante del suelo',
            'FS < 1.0 = Diseño no cumple (aumentar dimensiones o resistencia)'
        ],
        norma: 'NCh433 Art. 5.3 - Factores de Seguridad Geotécnicos',
        nota: 'Un FS mayor indica mayor seguridad pero puede ser antieconómico. Un FS cercano a 1 indica diseño optimizado pero con menor margen.'
    }
};