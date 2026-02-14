// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas' },
    { id: 'oxidorreductasas', nombre: 'Oxidorreductasas' },
    { id: 'transferasas', nombre: 'Transferasas' },
    { id: 'hidrolasas', nombre: 'Hidrolasas' },
    { id: 'liasas', nombre: 'Liasas' },
    { id: 'isomerasas', nombre: 'Isomerasas' },
    { id: 'ligasas', nombre: 'Ligasas' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredEnzimas: []
};
