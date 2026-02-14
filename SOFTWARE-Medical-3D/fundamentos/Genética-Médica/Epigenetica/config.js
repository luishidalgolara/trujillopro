// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'mecanismos', nombre: 'Mecanismos' },
    { id: 'regulacion', nombre: 'Regulación' },
    { id: 'herencia', nombre: 'Herencia' },
    { id: 'desarrollo', nombre: 'Desarrollo' },
    { id: 'clinica', nombre: 'Clínica' },
    { id: 'metodologia', nombre: 'Metodología' }
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
