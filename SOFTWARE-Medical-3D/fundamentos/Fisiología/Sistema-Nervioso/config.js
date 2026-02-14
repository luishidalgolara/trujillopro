// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'neurofisiologia', nombre: 'Neurofisiología' },
    { id: 'sinapsis', nombre: 'Sinapsis' },
    { id: 'sensorial', nombre: 'Función Sensorial' },
    { id: 'motora', nombre: 'Función Motora' },
    { id: 'cognitiva', nombre: 'Funciones Superiores' },
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
