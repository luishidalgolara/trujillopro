// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'ejes-hormonales', nombre: 'Ejes Hormonales' },
    { id: 'glandulas', nombre: 'Glándulas' },
    { id: 'metabolismo', nombre: 'Metabolismo' },
    { id: 'patologia', nombre: 'Patología' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredTemas: []
};
