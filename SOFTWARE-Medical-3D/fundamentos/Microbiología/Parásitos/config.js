// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'protozoarios', nombre: 'Protozoarios' },
    { id: 'helmintos', nombre: 'Helmintos' },
    { id: 'nematodos', nombre: 'Nematodos' },
    { id: 'cestodos', nombre: 'Cestodos' },
    { id: 'trematodos', nombre: 'Trematodos' }
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
