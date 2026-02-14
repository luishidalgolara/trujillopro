// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'neurona', nombre: 'Neuronas' },
    { id: 'glia', nombre: 'Glía' },
    { id: 'sinapsis', nombre: 'Sinapsis' },
    { id: 'fisiologia', nombre: 'Fisiología' },
    { id: 'neurotransmisores', nombre: 'Neurotransmisores' }
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
