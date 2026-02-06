// ============================================================================
// CONFIGURACIÓN DE VARILLAS Y MATERIALES
// ============================================================================

const REBAR_CONFIG = {
    // Diámetros de varillas en metros (nomenclatura estándar)
    diameters: {
        '#3': 0.00953,   // 3/8" - 9.53mm
        '#4': 0.01270,   // 1/2" - 12.70mm
        '#5': 0.01588,   // 5/8" - 15.88mm
        '#6': 0.01905,   // 3/4" - 19.05mm
        '#8': 0.02540,   // 1" - 25.40mm
        '#10': 0.03175   // 1-1/4" - 31.75mm
    },
    
    // Colores por tipo de varilla (más realistas)
    colors: {
        '#3': 0xCC5555,   // Rojo oscuro - estribos pequeños
        '#4': 0xDD7744,   // Naranja oxidado - estribos medianos
        '#5': 0xDDAA44,   // Amarillo metálico - varillas medianas
        '#6': 0x4DB8B8,   // Turquesa metálico - varillas principales
        '#8': 0x5599CC,   // Azul acero - varillas gruesas
        '#10': 0x7755AA,  // Morado metálico - varillas muy gruesas
        'mesh': 0xA0A0A0  // Gris acero - malla electrosoldada
    },
    
    // Espaciamientos estándar en metros
    spacing: {
        stirrups: 0.10,        // Estribos cada 10cm en zonas críticas
        stirrupsNormal: 0.20,  // Estribos cada 20cm en zona normal
        mesh: 0.15,            // Malla cada 15cm
        columnBars: 0.05       // Separación entre varillas de columna
    },
    
    // Recubrimientos en metros
    cover: {
        foundation: 0.075,  // 7.5cm
        column: 0.04,       // 4cm
        beam: 0.04,         // 4cm
        slab: 0.025         // 2.5cm
    },
    
    // Configuración de corrugado
    corrugation: {
        segmentsPerRib: 8,     // Segmentos por nervadura
        ribHeight: 0.15,       // Altura de nervadura (15% del diámetro)
        ribSpacing: 0.8        // Espaciado entre nervaduras (80% del diámetro)
    }
};
