// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos los conceptos' },
    { id: 'innata', nombre: 'Inmunidad Innata' },
    { id: 'adaptativa', nombre: 'Inmunidad Adaptativa' },
    { id: 'celulas', nombre: 'Células Inmunes' },
    { id: 'moleculas', nombre: 'Moléculas' },
    { id: 'respuesta', nombre: 'Respuesta Inmune' },
    { id: 'patologia', nombre: 'Inmunopatología' }
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
