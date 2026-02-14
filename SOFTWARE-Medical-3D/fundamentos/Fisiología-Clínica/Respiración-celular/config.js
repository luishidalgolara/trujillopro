// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas las vías' },
    { id: 'aerobico', nombre: 'Metabolismo Aeróbico' },
    { id: 'anaerobico', nombre: 'Metabolismo Anaeróbico' },
    { id: 'mitocondrial', nombre: 'Procesos Mitocondriales' },
    { id: 'citoplasmico', nombre: 'Procesos Citoplásmicos' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredVias: []
};
