// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos los conceptos' },
    { id: 'fundamentos', nombre: 'Fundamentos' },
    { id: 'electrofisiologia', nombre: 'Electrofisiología' },
    { id: 'conduccion', nombre: 'Conducción' },
    { id: 'mielinizacion', nombre: 'Mielinización' },
    { id: 'sinapsis', nombre: 'Sinapsis' },
    { id: 'neurotransmision', nombre: 'Neurotransmisión' }
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
