// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos los conceptos' },
    { id: 'activa', nombre: 'Inmunización Activa' },
    { id: 'pasiva', nombre: 'Inmunización Pasiva' },
    { id: 'vivas', nombre: 'Vacunas Vivas' },
    { id: 'inactivadas', nombre: 'Vacunas Inactivadas' },
    { id: 'subunidad', nombre: 'Subunidad/Recombinante' },
    { id: 'nuevas', nombre: 'Nuevas Tecnologías' }
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
