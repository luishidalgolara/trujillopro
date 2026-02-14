// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    MUSCULO_DATA.forEach(org => state.expandedCards.add(org.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToMusculo(id) {
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

  searchMusculo(term) {
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
      total: MUSCULO_DATA.length,
      esqueletico: MUSCULO_DATA.filter(o => o.categorias.includes('esqueletico')).length,
      cardiaco: MUSCULO_DATA.filter(o => o.categorias.includes('cardiaco')).length,
      liso: MUSCULO_DATA.filter(o => o.categorias.includes('liso')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('💪 Inicializando aplicación de Tejido Muscular...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  MusculoApp.expandAll()', 'color: #666;');
  console.log('%c  MusculoApp.collapseAll()', 'color: #666;');
  console.log('%c  MusculoApp.goToMusculo("musculo-esqueletico-estructura")', 'color: #666;');
  console.log('%c  MusculoApp.searchMusculo("sarcómero")', 'color: #666;');
  console.log('%c  MusculoApp.getStats()', 'color: #666;');
}

window.MusculoApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
