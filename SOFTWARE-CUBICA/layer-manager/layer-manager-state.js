/* ========================================
   LAYER MANAGER - ESTADO GLOBAL
   ======================================== */

const layerManagerState = {
    // Panel colapsado o expandido
    collapsed: false,
    
    // Capa activa seleccionada
    activeLayer: null,
    
    // Lista de todas las capas (elementos)
    layers: [],
    
    // Orden Z (mayor = más arriba)
    zIndexCounter: 0,
    
    // Configuración de detección
    detectionMode: 'active', // 'active' | 'top' | 'all'
    
    // Callbacks
    callbacks: {
        onLayerSelect: null,
        onLayerUpdate: null,
        onLayerDelete: null
    }
};

// Tipos de elementos soportados
const LAYER_TYPES = {
    RADIER: {
        icon: '🔲',
        name: 'Radier',
        color: '#3498db',
        arrayName: 'radieres'
    },
    MURO_HORMIGON: {
        icon: '🧱',
        name: 'Muro Hormigón',
        color: '#e74c3c',
        arrayName: 'murosHormigon'
    },
    MURO_ALBANILERIA: {
        icon: '🧱',
        name: 'Muro Albañilería',
        color: '#e67e22',
        arrayName: 'murosAlbanileria'
    },
    TABIQUE: {
        icon: '📏',
        name: 'Tabique',
        color: '#1abc9c',
        arrayName: 'tabiques'
    },
    MURO_ESTRUCTURAL: {
        icon: '🏗️',
        name: 'Muro Estructural',
        color: '#16a085',
        arrayName: 'murosEstructurales'
    },
    CUBIERTA: {
        icon: '🏠',
        name: 'Cubierta',
        color: '#8b4513',
        arrayName: 'cubiertas'
    }
};

window.layerManagerState = layerManagerState;
window.LAYER_TYPES = LAYER_TYPES;
