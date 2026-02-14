// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos los mecanismos' },
    { id: 'inflamacion', nombre: 'Inflamación' },
    { id: 'patologia-celular', nombre: 'Patología Celular' },
    { id: 'hemodinamica', nombre: 'Alteraciones Hemodinámicas' },
    { id: 'oncologia', nombre: 'Neoplasia' },
    { id: 'inmunologia', nombre: 'Trastornos Inmunológicos' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredMecanismos: []
};
