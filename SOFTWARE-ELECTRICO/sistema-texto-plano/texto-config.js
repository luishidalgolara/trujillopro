// ========================================
// CONFIGURACIÓN DEL SISTEMA DE TEXTO
// ========================================

const TextoConfig = {
    
    // Fuentes disponibles
    fuentes: [
        { value: 'Arial', label: 'Arial' },
        { value: 'Arial Black', label: 'Arial Black' },
        { value: 'Helvetica', label: 'Helvetica' },
        { value: 'Times New Roman', label: 'Times New Roman' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'Courier New', label: 'Courier New' },
        { value: 'Verdana', label: 'Verdana' },
        { value: 'Tahoma', label: 'Tahoma' },
        { value: 'Trebuchet MS', label: 'Trebuchet MS' },
        { value: 'Impact', label: 'Impact' },
        { value: 'Comic Sans MS', label: 'Comic Sans MS' },
        { value: 'Lucida Console', label: 'Lucida Console' },
        { value: 'Palatino', label: 'Palatino' },
        { value: 'Garamond', label: 'Garamond' },
        { value: 'Bookman', label: 'Bookman' },
        { value: 'Century Gothic', label: 'Century Gothic' },
        { value: 'Arial Narrow', label: 'Arial Narrow' }
    ],
    
    // Tamaños de fuente predefinidos
    tamañosPredefinidos: [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72, 84, 96],
    
    // Valores por defecto
    defaults: {
        fuente: 'Arial',
        tamaño: 16,
        negrita: false,
        cursiva: false,
        subrayado: false,
        color: '#000000',
        alineacion: 'left', // left, center, right
        opacidad: 1.0,
        rotacion: 0, // en grados
        interlineado: 1.2,
        espaciadoLetras: 0 // en px
    },
    
    // Estilos de texto predefinidos
    estilosPredefinidos: {
        'titulo-principal': {
            fuente: 'Arial Black',
            tamaño: 32,
            negrita: true,
            color: '#2c3e50',
            alineacion: 'center'
        },
        'titulo-seccion': {
            fuente: 'Arial',
            tamaño: 24,
            negrita: true,
            color: '#34495e',
            alineacion: 'left'
        },
        'subtitulo': {
            fuente: 'Arial',
            tamaño: 18,
            negrita: false,
            color: '#7f8c8d',
            alineacion: 'left'
        },
        'texto-normal': {
            fuente: 'Arial',
            tamaño: 14,
            negrita: false,
            color: '#2c3e50',
            alineacion: 'left'
        },
        'texto-pequeño': {
            fuente: 'Arial',
            tamaño: 10,
            negrita: false,
            color: '#95a5a6',
            alineacion: 'left'
        },
        'etiqueta-tecnica': {
            fuente: 'Courier New',
            tamaño: 12,
            negrita: false,
            color: '#16a085',
            alineacion: 'left'
        },
        'titulo-plano': {
            fuente: 'Arial Black',
            tamaño: 28,
            negrita: true,
            color: '#e74c3c',
            alineacion: 'center'
        },
        'notas': {
            fuente: 'Arial',
            tamaño: 11,
            negrita: false,
            cursiva: true,
            color: '#7f8c8d',
            alineacion: 'left'
        }
    },
    
    // Configuración de la interfaz
    ui: {
        modalWidth: '700px',
        modalHeight: '600px',
        previewHeight: '80px'
    }
};

console.log('✅ Configuración de texto cargada');
