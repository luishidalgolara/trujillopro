// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas' },
    { id: 'autosomica-dominante', nombre: 'Autosómica Dominante' },
    { id: 'autosomica-recesiva', nombre: 'Autosómica Recesiva' },
    { id: 'ligada-x', nombre: 'Ligada al X' },
    { id: 'multifactorial', nombre: 'Multifactorial' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredEnfermedades: []
};
