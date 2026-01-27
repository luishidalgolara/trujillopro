// ========================================
// SÍMBOLOS ELÉCTRICOS
// ========================================
const ElectricSymbols = {
    // ALIMENTACIÓN
    'medidor': {
        name: 'Medidor Eléctrico',
        symbol: '📊',
        category: 'alimentacion',
        color: '#e67e22'
    },
    'empalme': {
        name: 'Punto de Empalme',
        symbol: '🔌',
        category: 'alimentacion',
        color: '#e67e22'
    },
    'tablero': {
        name: 'Tablero Eléctrico',
        symbol: '⚡',
        category: 'alimentacion',
        color: '#e74c3c'
    },
    
    // ILUMINACIÓN
    'luminaria-cielo': {
        name: 'Luminaria de Cielo',
        symbol: '💡',
        category: 'iluminacion',
        color: '#f1c40f',
        requiresLevel: true
    },
    'aplique': {
        name: 'Aplique Mural',
        symbol: '🔆',
        category: 'iluminacion',
        color: '#f39c12',
        requiresLevel: true
    },
    'luminaria-exterior': {
        name: 'Luminaria Exterior',
        symbol: '🌟',
        category: 'iluminacion',
        color: '#f1c40f',
        requiresLevel: true
    },
    'luz-simple': {
        name: 'Luz con Interruptor Simple',
        symbol: '💡',
        category: 'iluminacion',
        color: '#f1c40f',
        requiresLevel: true
    },
    'luz-doble': {
        name: 'Luz con Interruptor Doble',
        symbol: '💡💡',
        category: 'iluminacion',
        color: '#f1c40f',
        requiresLevel: true
    },
    'conmutado': {
        name: 'Sistema Conmutado',
        symbol: '🔀',
        category: 'iluminacion',
        color: '#9b59b6',
        requiresLevel: true
    },
    
    // ENCHUFES
    'enchufe-simple': {
        name: 'Enchufe Simple 10A',
        symbol: '🔌',
        category: 'enchufes',
        color: '#3498db',
        requiresLevel: true
    },
    'enchufe-doble': {
        name: 'Enchufe Doble',
        symbol: '🔌🔌',
        category: 'enchufes',
        color: '#3498db',
        requiresLevel: true
    },
    'enchufe-especial': {
        name: 'Enchufe Especial',
        symbol: '⚡🔌',
        category: 'enchufes',
        color: '#e74c3c',
        requiresLevel: true
    },
    'enchufe-exterior': {
        name: 'Enchufe Exterior IP',
        symbol: '🔌💧',
        category: 'enchufes',
        color: '#16a085',
        requiresLevel: true
    },
    
    // INTERRUPTORES
    'int-simple': {
        name: 'Interruptor Simple',
        symbol: '🔘',
        category: 'interruptores',
        color: '#9b59b6',
        requiresLevel: true
    },
    'int-doble': {
        name: 'Interruptor Doble',
        symbol: '🔘🔘',
        category: 'interruptores',
        color: '#9b59b6',
        requiresLevel: true
    },
    'conmutador': {
        name: 'Conmutador',
        symbol: '🔀',
        category: 'interruptores',
        color: '#8e44ad',
        requiresLevel: true
    },
    'pulsador': {
        name: 'Pulsador',
        symbol: '⏺️',
        category: 'interruptores',
        color: '#9b59b6',
        requiresLevel: true
    },
    
    // ELECTRODOMÉSTICOS
    'lavadora': {
        name: 'Lavadora',
        symbol: '🧺',
        category: 'electrodomesticos',
        color: '#3498db',
        requiresLevel: true
    },
    'secadora': {
        name: 'Secadora',
        symbol: '🌀',
        category: 'electrodomesticos',
        color: '#e67e22',
        requiresLevel: true
    },
    'refrigerador': {
        name: 'Refrigerador',
        symbol: '🧊',
        category: 'electrodomesticos',
        color: '#16a085',
        requiresLevel: true
    },
    'microondas': {
        name: 'Microondas',
        symbol: '🍽️',
        category: 'electrodomesticos',
        color: '#f39c12',
        requiresLevel: true
    },
    'horno': {
        name: 'Horno Eléctrico',
        symbol: '🔥',
        category: 'electrodomesticos',
        color: '#e74c3c',
        requiresLevel: true
    },
    'cocina': {
        name: 'Cocina Eléctrica',
        symbol: '🍳',
        category: 'electrodomesticos',
        color: '#d35400',
        requiresLevel: true
    },
    'calefon': {
        name: 'Calefón/Terma',
        symbol: '🚿',
        category: 'electrodomesticos',
        color: '#c0392b',
        requiresLevel: true
    },
    
    // CANALIZACIÓN
    'ducto-pvc': {
        name: 'Ducto PVC',
        symbol: '📏',
        category: 'canalizacion',
        color: '#1abc9c'
    },
    'ducto-emt': {
        name: 'Ducto EMT',
        symbol: '📏',
        category: 'canalizacion',
        color: '#16a085'
    },
    'conductor': {
        name: 'Línea Conductor',
        symbol: '➖',
        category: 'canalizacion',
        color: '#34495e'
    },
    'caja-derivacion': {
        name: 'Caja de Derivación',
        symbol: '📦',
        category: 'canalizacion',
        color: '#7f8c8d'
    },
    
    // PUESTA A TIERRA
    'jabalina': {
        name: 'Jabalina de Tierra',
        symbol: '🔩',
        category: 'tierra',
        color: '#16a085'
    },
    'conductor-tierra': {
        name: 'Conductor PE',
        symbol: '⚡',
        category: 'tierra',
        color: '#27ae60'
    },
    'tierra-enchufe': {
        name: 'Símbolo Tierra',
        symbol: '🌍',
        category: 'tierra',
        color: '#16a085'
    },
    
    // CONEXIÓN ENTRE NIVELES
    'subida-nivel': {
        name: 'Subida a Nivel 2',
        symbol: '⬆️',
        category: 'entre-niveles',
        color: '#9c27b0',
        requiresLevel: true,
        isLevelConnector: true
    }
};