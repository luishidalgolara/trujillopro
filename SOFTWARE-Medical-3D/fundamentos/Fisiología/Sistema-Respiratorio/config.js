// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'anatomia', nombre: 'Anatomía' },
    { id: 'fisiologia', nombre: 'Fisiología' },
    { id: 'regulacion', nombre: 'Regulación' },
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
