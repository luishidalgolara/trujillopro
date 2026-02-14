// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas' },
    { id: 'puntuales', nombre: 'Puntuales' },
    { id: 'estructurales', nombre: 'Estructurales' },
    { id: 'genomicas', nombre: 'Genómicas' },
    { id: 'dinamicas', nombre: 'Dinámicas' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredMutaciones: []
};
