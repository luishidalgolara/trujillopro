// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos los conceptos' },
    { id: 'tolerancia', nombre: 'Tolerancia Inmunológica' },
    { id: 'mecanismos', nombre: 'Mecanismos de Autoinmunidad' },
    { id: 'organoespecificas', nombre: 'Órgano-específicas' },
    { id: 'sistemicas', nombre: 'Sistémicas' },
    { id: 'tratamiento', nombre: 'Tratamiento' },
    { id: 'genetica', nombre: 'Genética y Factores' }
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
