// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'todos', nombre: 'Todos' },
    { id: 'laxo-denso', nombre: 'Laxo/Denso' },
    { id: 'especializado', nombre: 'Especializado' },
    { id: 'liquido', nombre: 'Sangre' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'todos',
  expandedCards: new Set(),
  filteredTejidos: []
};
