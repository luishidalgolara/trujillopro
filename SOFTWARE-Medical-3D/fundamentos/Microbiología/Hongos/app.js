// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    HONGOS_DATA.forEach(org => state.expandedCards.add(org.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToHongo(id) {
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

  searchHongo(term) {
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
      total: HONGOS_DATA.length,
      levaduras: HONGOS_DATA.filter(o => o.categorias.includes('levaduras')).length,
      filamentosos: HONGOS_DATA.filter(o => o.categorias.includes('filamentosos')).length,
      dimorficos: HONGOS_DATA.filter(o => o.categorias.includes('dimorficos')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('🍄 Inicializando aplicación de Hongos...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  HongosApp.expandAll()', 'color: #666;');
  console.log('%c  HongosApp.collapseAll()', 'color: #666;');
  console.log('%c  HongosApp.goToHongo("candida-albicans")', 'color: #666;');
  console.log('%c  HongosApp.searchHongo("dimórfico")', 'color: #666;');
  console.log('%c  HongosApp.getStats()', 'color: #666;');
}

window.HongosApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
