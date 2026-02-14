// ═══════════════════════════════════════════════════════════
// CONFIG - Configuración y Estado de la aplicación
// ═══════════════════════════════════════════════════════════

const CONFIG = {
  categorias: [
    { id: 'all', nombre: 'Todas las Estructuras' },
    { id: 'encefalo', nombre: 'Encéfalo' },
    { id: 'medula-espinal', nombre: 'Médula Espinal' },
    { id: 'nervios-craneales', nombre: 'Nervios Craneales' },
    { id: 'nervios-perifericos', nombre: 'Nervios Periféricos' },
    { id: 'vias-ascendentes', nombre: 'Vías Ascendentes' },
    { id: 'vias-descendentes', nombre: 'Vías Descendentes' },
    { id: 'sistema-autonomo', nombre: 'Sistema Autónomo' }
  ],
  searchDebounce: 300,
  animationDelay: 50
};

let state = {
  searchTerm: '',
  selectedCategory: 'all',
  expandedCards: new Set(),
  filteredEstructuras: []
};
