// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas' },
    { id: 'estructurales', nombre: 'Estructurales' },
    { id: 'transporte', nombre: 'Transporte' },
    { id: 'defensa', nombre: 'Defensa' },
    { id: 'reguladoras', nombre: 'Reguladoras' },
    { id: 'motoras', nombre: 'Motoras' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredProteinas: []
};
