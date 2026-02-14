// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas' },
    { id: 'catabolismo', nombre: 'Catabolismo' },
    { id: 'anabolismo', nombre: 'Anabolismo' },
    { id: 'energia', nombre: 'Energía' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredRutas: []
};
