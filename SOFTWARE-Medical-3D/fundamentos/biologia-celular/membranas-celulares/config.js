// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'estructura', nombre: 'Estructura' },
    { id: 'lipidos', nombre: 'Lípidos' },
    { id: 'proteinas', nombre: 'Proteínas' },
    { id: 'transporte', nombre: 'Transporte' },
    { id: 'señalizacion', nombre: 'Señalización' },
    { id: 'adhesion', nombre: 'Adhesión' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredOrganelos: []
};
