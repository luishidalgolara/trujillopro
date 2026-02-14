// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'esqueletico', nombre: 'Esquelético' },
    { id: 'cardiaco', nombre: 'Cardíaco' },
    { id: 'liso', nombre: 'Liso' },
    { id: 'contraccion', nombre: 'Contracción' },
    { id: 'mecanismo', nombre: 'Mecanismos' }
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
