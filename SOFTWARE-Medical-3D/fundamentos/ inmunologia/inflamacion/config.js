// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos los conceptos' },
    { id: 'aguda', nombre: 'Inflamación Aguda' },
    { id: 'cronica', nombre: 'Inflamación Crónica' },
    { id: 'mediadores', nombre: 'Mediadores Inflamatorios' },
    { id: 'celulas', nombre: 'Células' },
    { id: 'molecular', nombre: 'Mecanismos Moleculares' },
    { id: 'patologia', nombre: 'Patología' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredConceptos: []
};
