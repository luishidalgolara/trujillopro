// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'receptores', nombre: 'Receptores' },
    { id: 'enzimas', nombre: 'Enzimas' },
    { id: 'canales-ionicos', nombre: 'Canales Iónicos' },
    { id: 'transportadores', nombre: 'Transportadores' }
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
