// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'levaduras', nombre: 'Levaduras' },
    { id: 'filamentosos', nombre: 'Filamentosos' },
    { id: 'dimorficos', nombre: 'Dimórficos' },
    { id: 'oportunistas', nombre: 'Oportunistas' }
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
