// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'revestimiento', nombre: 'Revestimiento' },
    { id: 'glandular', nombre: 'Glandular' },
    { id: 'simple', nombre: 'Simple' },
    { id: 'estratificado', nombre: 'Estratificado' },
    { id: 'especializaciones', nombre: 'Especializaciones' }
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
