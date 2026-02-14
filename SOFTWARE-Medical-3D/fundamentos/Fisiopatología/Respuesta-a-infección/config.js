// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos los mecanismos' },
    { id: 'fiebre', nombre: 'Fiebre y Piretógenos' },
    { id: 'patogenos', nombre: 'Patógenos' },
    { id: 'citocinas', nombre: 'Citocinas' },
    { id: 'inmunidad-innata', nombre: 'Inmunidad Innata' },
    { id: 'inmunidad-adaptativa', nombre: 'Inmunidad Adaptativa' },
    { id: 'respuesta-sistemica', nombre: 'Respuesta Sistémica' }
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
