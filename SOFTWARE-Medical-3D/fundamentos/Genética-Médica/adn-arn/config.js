// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'estructura', nombre: 'Estructura' },
    { id: 'replicacion', nombre: 'Replicación' },
    { id: 'transcripcion', nombre: 'Transcripción' },
    { id: 'traduccion', nombre: 'Traducción' },
    { id: 'reparacion', nombre: 'Reparación' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredTemas: []
};
