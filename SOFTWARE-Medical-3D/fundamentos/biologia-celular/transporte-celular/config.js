// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'pasivo', nombre: 'Pasivo' },
    { id: 'activo', nombre: 'Activo' },
    { id: 'canales', nombre: 'Canales' },
    { id: 'bombas', nombre: 'Bombas' },
    { id: 'transportadores', nombre: 'Transportadores' },
    { id: 'vesicular', nombre: 'Vesicular' }
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
