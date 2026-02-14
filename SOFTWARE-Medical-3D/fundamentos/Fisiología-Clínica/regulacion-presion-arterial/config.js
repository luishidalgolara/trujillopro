// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos los mecanismos' },
    { id: 'barorreceptor', nombre: 'Control Barorreceptor' },
    { id: 'hormonal', nombre: 'Control Hormonal' },
    { id: 'renal', nombre: 'Control Renal' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredMecanismos: []
};
