// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas las Regiones' },
    { id: 'cabeza-cuello', nombre: 'Cabeza y Cuello' },
    { id: 'torax', nombre: 'Tórax' },
    { id: 'abdomen-pelvis', nombre: 'Abdomen y Pelvis' },
    { id: 'extremidad-superior', nombre: 'Extremidad Superior' },
    { id: 'extremidad-inferior', nombre: 'Extremidad Inferior' },
    { id: 'columna', nombre: 'Columna Vertebral' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredRegiones: []
};
