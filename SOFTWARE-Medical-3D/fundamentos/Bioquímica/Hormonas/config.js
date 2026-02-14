// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas' },
    { id: 'peptidicas', nombre: 'Peptídicas' },
    { id: 'esteroideas', nombre: 'Esteroideas' },
    { id: 'tiroideas', nombre: 'Tiroideas' },
    { id: 'aminas', nombre: 'Aminas' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredHormonas: []
};
