// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todos' },
    { id: 'fundamentos', nombre: 'Fundamentos' },
    { id: 'receptores', nombre: 'Receptores' },
    { id: 'gproteinas', nombre: 'Proteínas G' },
    { id: 'kinasas', nombre: 'Kinasas' },
    { id: 'segundos-mensajeros', nombre: '2dos Mensajeros' },
    { id: 'desarrollo', nombre: 'Desarrollo' }
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
