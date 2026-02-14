// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    METABOLISMO_DATA.forEach(ruta => state.expandedCards.add(ruta.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToRuta(id) {
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

  searchRuta(term) {
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
      total: METABOLISMO_DATA.length,
      catabolismo: METABOLISMO_DATA.filter(r => r.categorias.includes('catabolismo')).length,
      anabolismo: METABOLISMO_DATA.filter(r => r.categorias.includes('anabolismo')).length,
      energia: METABOLISMO_DATA.filter(r => r.categorias.includes('energia')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredRutas.length
    };
  }
};

function init() {
  console.log('⚡ Inicializando aplicación de Metabolismo Celular...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  MetabolismoApp.expandAll()', 'color: #666;');
  console.log('%c  MetabolismoApp.collapseAll()', 'color: #666;');
  console.log('%c  MetabolismoApp.goToRuta("glucolisis")', 'color: #666;');
  console.log('%c  MetabolismoApp.searchRuta("ATP")', 'color: #666;');
  console.log('%c  MetabolismoApp.getStats()', 'color: #666;');
}

window.MetabolismoApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
