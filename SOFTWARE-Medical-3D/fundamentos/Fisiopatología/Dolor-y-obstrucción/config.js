// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos los mecanismos' },
    { id: 'dolor', nombre: 'Dolor' },
    { id: 'nociocepcion', nombre: 'Nociocepción' },
    { id: 'visceras', nombre: 'Dolor Visceral' },
    { id: 'obstruccion', nombre: 'Obstrucción' },
    { id: 'isquemia', nombre: 'Isquemia' },
    { id: 'muerte-celular', nombre: 'Muerte Celular' }
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
