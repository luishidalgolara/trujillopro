// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    MUTACIONES_DATA.forEach(m => state.expandedCards.add(m.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToMutacion(id) {
    state.expandedCards.add(id);
    render.renderCards();
    
    setTimeout(() => {
      const card = document.querySelector(`.organelo-card[data-id="${id}"]`);
      if (card) {
        utils.scrollToElement(card);
        card.style.boxShadow = '0 0 40px rgba(44, 95, 126, 0.5)';
        setTimeout(() => {
          card.style.boxShadow = '';
        }, 2000);
      }
    }, 300);
  },

  searchMutacion(term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = term;
      searchInput.focus();
      state.searchTerm = term;
      filtering.applyFilters();
      render.renderCards();
    }
  },

  getStats() {
    return {
      total: MUTACIONES_DATA.length,
      puntuales: MUTACIONES_DATA.filter(m => m.categorias.includes('puntuales')).length,
      estructurales: MUTACIONES_DATA.filter(m => m.categorias.includes('estructurales')).length,
      genomicas: MUTACIONES_DATA.filter(m => m.categorias.includes('genomicas')).length,
      dinamicas: MUTACIONES_DATA.filter(m => m.categorias.includes('dinamicas')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredMutaciones.length
    };
  }
};

function init() {
  console.log('🧬 Inicializando aplicación de Mutaciones...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  MutacionesApp.expandAll()', 'color: #666;');
  console.log('%c  MutacionesApp.collapseAll()', 'color: #666;');
  console.log('%c  MutacionesApp.goToMutacion("missense")', 'color: #666;');
  console.log('%c  MutacionesApp.searchMutacion("frameshift")', 'color: #666;');
  console.log('%c  MutacionesApp.getStats()', 'color: #666;');
}

window.MutacionesApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
