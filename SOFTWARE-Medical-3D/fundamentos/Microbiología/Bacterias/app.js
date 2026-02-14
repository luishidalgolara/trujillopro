// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    BACTERIAS_DATA.forEach(org => state.expandedCards.add(org.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToBacteria(id) {
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

  searchBacteria(term) {
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
      total: BACTERIAS_DATA.length,
      gramPositivas: BACTERIAS_DATA.filter(o => o.categorias.includes('gram-positivas')).length,
      gramNegativas: BACTERIAS_DATA.filter(o => o.categorias.includes('gram-negativas')).length,
      patogenas: BACTERIAS_DATA.filter(o => o.categorias.includes('patogenas')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('🦠 Inicializando aplicación de Bacterias...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  BacteriasApp.expandAll()', 'color: #666;');
  console.log('%c  BacteriasApp.collapseAll()', 'color: #666;');
  console.log('%c  BacteriasApp.goToBacteria("escherichia-coli")', 'color: #666;');
  console.log('%c  BacteriasApp.searchBacteria("gram positivo")', 'color: #666;');
  console.log('%c  BacteriasApp.getStats()', 'color: #666;');
}

window.BacteriasApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
