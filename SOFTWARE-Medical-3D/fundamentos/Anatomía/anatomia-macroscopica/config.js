// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'cardiovascular', nombre: 'Cardiovascular' },
    { id: 'respiratorio', nombre: 'Respiratorio' },
    { id: 'digestivo', nombre: 'Digestivo' },
    { id: 'urinario', nombre: 'Urinario' },
    { id: 'nervioso', nombre: 'Nervioso' },
    { id: 'reproductor-masculino', nombre: 'Reprod. ♂' },
    { id: 'reproductor-femenino', nombre: 'Reprod. ♀' },
    { id: 'oseo', nombre: 'Óseo' },
    { id: 'muscular', nombre: 'Muscular' },
    { id: 'tegumentario', nombre: 'Piel' },
    { id: 'organos-toracicos', nombre: 'Tórax' },
    { id: 'organos-abdominales', nombre: 'Abdomen' },
    { id: 'organos-cefalicos', nombre: 'Cabeza/Cuello' }
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