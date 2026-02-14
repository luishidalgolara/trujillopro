// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'dna', nombre: 'DNA' },
    { id: 'rna', nombre: 'RNA' },
    { id: 'envueltos', nombre: 'Envueltos' },
    { id: 'no-envueltos', nombre: 'No envueltos' }
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
