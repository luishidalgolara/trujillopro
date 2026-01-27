// ============================================================
// CONFIGURACIÓN DE CALIDAD PARA EXPORTACIÓN PDF
// Sistema de exportación de planos eléctricos de alta calidad
// ============================================================

const configuracionPDF = {
    // ========== CALIDAD DE EXPORTACIÓN ==========
    calidad: {
        // Modo de exportación
        modo: 'maxima', // 'maxima', 'alta', 'media', 'rapida'
        
        // Resolución en DPI
        dpi: 300, // 600 (profesional), 300 (alta), 150 (media)
        
        // Escala de renderizado
        escala: 2, // Multiplicador de resolución (1, 2, 3, 4)
        
        // Compresión de imágenes
        compresion: 'ninguna', // 'ninguna', 'baja', 'media', 'alta'
        
        // Formato de color
        colorMode: 'RGB', // 'RGB' (pantalla), 'CMYK' (impresión)
        
        // Anti-aliasing
        antialiasing: true,
        
        // Suavizado de líneas
        smoothing: true
    },
    
    // ========== FORMATO DE PÁGINA ==========
    pagina: {
        formato: 'A1', // 'A0', 'A1', 'A2', 'A3', 'A4'
        orientacion: 'landscape', // 'landscape', 'portrait'
        
        // Dimensiones en mm (para referencia)
        dimensiones: {
            'A0': { ancho: 1189, alto: 841 },
            'A1': { ancho: 841, alto: 594 },
            'A2': { ancho: 594, alto: 420 },
            'A3': { ancho: 420, alto: 297 },
            'A4': { ancho: 297, alto: 210 }
        },
        
        // Márgenes en mm
        margenes: {
            superior: 10,
            inferior: 10,
            izquierdo: 10,
            derecho: 10
        }
    },
    
    // ========== ELEMENTOS A EXPORTAR ==========
    elementos: {
        // Elementos principales
        planoBase: true,           // SVG del plano
        simbolosElectricos: true,  // Símbolos (⚡💡🔌)
        conductores: true,         // Líneas de trazado
        etiquetas: true,          // Textos y anotaciones
        
        // Elementos adicionales
        cuadroCargas: true,       // Tabla de cuadro de cargas
        tableroElectrico: true,   // Diagrama del tablero
        vineta: true,             // Viñeta técnica
        simbologia: true,         // Tabla de simbología
        
        // Imagen de fondo
        imagenFondo: true,        // PDF/imagen cargada
        gridFondo: false          // Grilla de referencia
    },
    
    // ========== OPCIONES AVANZADAS ==========
    avanzado: {
        // Preservar vectores SVG
        preservarVectores: true,
        
        // Incluir metadatos
        metadatos: {
            titulo: 'Plano Eléctrico Domiciliario',
            autor: 'ELEKTRA - Sistema de Diseño Eléctrico',
            asunto: 'Diseño eléctrico según NCh Elec 4/2003',
            palabrasClave: 'plano eléctrico, instalación, diseño',
            creador: 'ELEKTRA v1.0'
        },
        
        // Incluir marcas de agua
        marcaAgua: false,
        textoMarcaAgua: 'BORRADOR',
        
        // Multipágina (si excede tamaño)
        multiPagina: false,
        
        // Optimizar para
        optimizarPara: 'impresion' // 'impresion', 'pantalla', 'web'
    },
    
    // ========== PRESETS DE CALIDAD ==========
    presets: {
        'maxima': {
            dpi: 600,
            escala: 4,
            compresion: 'ninguna',
            antialiasing: true,
            preservarVectores: true
        },
        'alta': {
            dpi: 300,
            escala: 2,
            compresion: 'baja',
            antialiasing: true,
            preservarVectores: true
        },
        'media': {
            dpi: 150,
            escala: 1.5,
            compresion: 'media',
            antialiasing: true,
            preservarVectores: false
        },
        'rapida': {
            dpi: 96,
            escala: 1,
            compresion: 'alta',
            antialiasing: false,
            preservarVectores: false
        }
    }
};

/**
 * Aplicar preset de calidad
 */
function aplicarPreset(preset) {
    const config = configuracionPDF.presets[preset];
    if (config) {
        Object.assign(configuracionPDF.calidad, config);
        console.log(`✅ Preset "${preset}" aplicado`);
    } else {
        console.error(`❌ Preset "${preset}" no encontrado`);
    }
}

/**
 * Obtener configuración actual
 */
function obtenerConfiguracion() {
    return JSON.parse(JSON.stringify(configuracionPDF));
}

/**
 * Actualizar configuración
 */
function actualizarConfiguracion(nuevaConfig) {
    Object.assign(configuracionPDF, nuevaConfig);
    console.log('✅ Configuración actualizada');
}

/**
 * Obtener dimensiones de página en pixels
 */
function obtenerDimensionesPixels() {
    const formato = configuracionPDF.pagina.formato;
    const dim = configuracionPDF.pagina.dimensiones[formato];
    const dpi = configuracionPDF.calidad.dpi;
    
    // Convertir mm a pixels (1 inch = 25.4 mm)
    const pxPorMM = dpi / 25.4;
    
    return {
        ancho: Math.round(dim.ancho * pxPorMM),
        alto: Math.round(dim.alto * pxPorMM),
        anchoMM: dim.ancho,
        altoMM: dim.alto
    };
}

// Exportar al navegador
window.configuracionPDF = configuracionPDF;
window.aplicarPresetPDF = aplicarPreset;
window.obtenerConfiguracionPDF = obtenerConfiguracion;
window.actualizarConfiguracionPDF = actualizarConfiguracion;
window.obtenerDimensionesPixelsPDF = obtenerDimensionesPixels;

console.log('⚙️ Configuración de exportación PDF cargada');
