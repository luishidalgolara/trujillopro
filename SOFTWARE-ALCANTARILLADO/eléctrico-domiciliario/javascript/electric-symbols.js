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
        color: '#f1c40f'
    },
    'aplique': {
        name: 'Aplique Mural',
        symbol: '🔆',
        category: 'iluminacion',
        color: '#f39c12'
    },
    'luminaria-exterior': {
        name: 'Luminaria Exterior',
        symbol: '🌟',
        category: 'iluminacion',
        color: '#f1c40f'
    },
    'luz-simple': {
        name: 'Luz con Interruptor Simple',
        symbol: '💡',
        category: 'iluminacion',
        color: '#f1c40f'
    },
    'luz-doble': {
        name: 'Luz con Interruptor Doble',
        symbol: '💡💡',
        category: 'iluminacion',
        color: '#f1c40f'
    },
    'conmutado': {
        name: 'Sistema Conmutado',
        symbol: '🔀',
        category: 'iluminacion',
        color: '#9b59b6'
    },
    
    // ENCHUFES
    'enchufe-simple': {
        name: 'Enchufe Simple 10A',
        symbol: '🔌',
        category: 'enchufes',
        color: '#3498db'
    },
    'enchufe-doble': {
        name: 'Enchufe Doble',
        symbol: '🔌🔌',
        category: 'enchufes',
        color: '#3498db'
    },
    'enchufe-especial': {
        name: 'Enchufe Especial',
        symbol: '⚡🔌',
        category: 'enchufes',
        color: '#e74c3c'
    },
    'enchufe-exterior': {
        name: 'Enchufe Exterior IP',
        symbol: '🔌💧',
        category: 'enchufes',
        color: '#16a085'
    },
    
    // INTERRUPTORES
    'int-simple': {
        name: 'Interruptor Simple',
        symbol: '🔘',
        category: 'interruptores',
        color: '#9b59b6'
    },
    'int-doble': {
        name: 'Interruptor Doble',
        symbol: '🔘🔘',
        category: 'interruptores',
        color: '#9b59b6'
    },
    'conmutador': {
        name: 'Conmutador',
        symbol: '🔀',
        category: 'interruptores',
        color: '#8e44ad'
    },
    'pulsador': {
        name: 'Pulsador',
        symbol: '⏺️',
        category: 'interruptores',
        color: '#9b59b6'
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
    }
};
