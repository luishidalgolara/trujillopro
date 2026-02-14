// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    RESPIRACION_CELULAR_DATA.forEach(via => state.expandedCards.add(via.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToVia(id) {
    state.expandedCards.add(id);
    render.renderCards();
    
    setTimeout(() => {
      const card = document.querySelector(`.organelo-card[data-id="${id}"]`);
      if (card) {
        utils.scrollToElement(card);
        card.style.boxShadow = '0 0 40px rgba(92, 200, 212, 0.5)';
        setTimeout(() => {
          card.style.boxShadow = '';
        }, 2000);
      }
    }, 300);
  },

  searchVia(term) {
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
      total: RESPIRACION_CELULAR_DATA.length,
      aerobico: RESPIRACION_CELULAR_DATA.filter(v => v.categorias.includes('aerobico')).length,
      anaerobico: RESPIRACION_CELULAR_DATA.filter(v => v.categorias.includes('anaerobico')).length,
      mitocondrial: RESPIRACION_CELULAR_DATA.filter(v => v.categorias.includes('mitocondrial')).length,
      citoplasmico: RESPIRACION_CELULAR_DATA.filter(v => v.categorias.includes('citoplasmico')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredVias.length
    };
  }
};

function init() {
  console.log('🔬 Inicializando aplicación de Respiración Celular...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #5cc8d4;');
  console.log('%c  RespiracionCelularApp.expandAll()', 'color: #8a94a8;');
  console.log('%c  RespiracionCelularApp.collapseAll()', 'color: #8a94a8;');
  console.log('%c  RespiracionCelularApp.goToVia("glucolisis")', 'color: #8a94a8;');
  console.log('%c  RespiracionCelularApp.searchVia("ATP")', 'color: #8a94a8;');
  console.log('%c  RespiracionCelularApp.getStats()', 'color: #8a94a8;');
}

window.RespiracionCelularApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
