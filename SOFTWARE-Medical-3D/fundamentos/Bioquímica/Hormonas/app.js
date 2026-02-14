// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    HORMONAS_DATA.forEach(h => state.expandedCards.add(h.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToHormona(id) {
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

  searchHormona(term) {
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
      total: HORMONAS_DATA.length,
      peptidicas: HORMONAS_DATA.filter(h => h.categorias.includes('peptidicas')).length,
      esteroideas: HORMONAS_DATA.filter(h => h.categorias.includes('esteroideas')).length,
      tiroideas: HORMONAS_DATA.filter(h => h.categorias.includes('tiroideas')).length,
      aminas: HORMONAS_DATA.filter(h => h.categorias.includes('aminas')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredHormonas.length
    };
  }
};

function init() {
  console.log('💉 Inicializando aplicación de Hormonas...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  HormonasApp.expandAll()', 'color: #666;');
  console.log('%c  HormonasApp.collapseAll()', 'color: #666;');
  console.log('%c  HormonasApp.goToHormona("insulina")', 'color: #666;');
  console.log('%c  HormonasApp.searchHormona("cortisol")', 'color: #666;');
  console.log('%c  HormonasApp.getStats()', 'color: #666;');
}

window.HormonasApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
