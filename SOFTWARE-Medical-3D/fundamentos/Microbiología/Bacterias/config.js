// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas' },
    { id: 'gram-positivas', nombre: 'Gram +' },
    { id: 'gram-negativas', nombre: 'Gram −' },
    { id: 'patogenas', nombre: 'Patógenas' },
    { id: 'esporuladas', nombre: 'Esporuladas' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredOrganelos: []
};
