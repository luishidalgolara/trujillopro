// ========================================
// CONFIGURACIÓN ISOMÉTRICA
// ========================================

const IsometricConfig = {
    
    // Altura entre niveles (en unidades del mundo)
    levelHeight: 200,
    
    // Dimensiones de elementos
    elements: {
        cubeSize: 20,           // Tamaño base de cubos
        tubeWidth: 3,           // Grosor de tuberías
        symbolSize: 18,         // Tamaño de símbolos
        labelFontSize: 11,      // Tamaño de fuente de etiquetas
        margin: 50              // Margen alrededor del isométrico
    },
    
    // Colores por tipo de circuito (sincronizado con el sistema)
    colors: {
        'alimentacion': '#e74c3c',
        'C1': '#f39c12',    // Iluminación
        'C2': '#3498db',    // Enchufes
        'C3': '#9b59b6',    // Cocina
        'C4': '#1abc9c',    // Lavadora
        'C5': '#e91e63',    // Especiales
        'C6': '#e67e22',    // Secadora
        'C7': '#c0392b',    // Horno
        'C8': '#d35400',    // Calefón
        'PE': '#27ae60',    // Tierra
        'subida': '#9c27b0', // Conexión entre niveles
        
        // Colores de caras de cubos
        cubeFaces: {
            top: '#ecf0f1',
            left: '#bdc3c7',
            right: '#95a5a6'
        }
    },
    
    // Símbolos por tipo de elemento
    symbols: {
        'tablero': '⚡',
        'luminaria-cielo': '💡',
        'aplique': '🔆',
        'enchufe-simple': '🔌',
        'enchufe-doble': '🔌',
        'enchufe-especial': '⚡',
        'int-simple': '🔘',
        'int-doble': '🔘',
        'lavadora': '🧺',
        'secadora': '🌀',
        'refrigerador': '🧊',
        'microondas': '🍽️',
        'horno': '🔥',
        'cocina': '🍳',
        'calefon': '🚿',
        'subida-nivel': '⬆️',
        'default': '🔷'
    },
    
    // Configuración de grilla
    grid: {
        enabled: true,
        spacing: 100,       // Espaciado de grilla
        size: 1000,         // Tamaño total de grilla
        color: '#e0e0e0',
        opacity: 0.3
    },
    
    // Configuración de plataformas de nivel
    platforms: {
        enabled: true,
        level1Color: 'rgba(52, 152, 219, 0.08)',
        level2Color: 'rgba(155, 89, 182, 0.08)',
        borderColor: '#34495e',
        borderWidth: 2,
        borderDash: '10,5'
    },
    
    // Viewport y escalado
    viewport: {
        width: 1200,
        height: 900,
        padding: 100,
        defaultScale: 1.0
    },
    
    // Etiquetas
    labels: {
        show: true,
        fontSize: 10,
        fontFamily: 'Arial, sans-serif',
        color: '#2c3e50',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: 3,
        borderRadius: 3
    },
    
    // Título del isométrico
    title: {
        text: 'ISOMÉTRICO ELÉCTRICO 3D',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        y: 30
    }
};

console.log('✅ Configuración isométrica cargada');
