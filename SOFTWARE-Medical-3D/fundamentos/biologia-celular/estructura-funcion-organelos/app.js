// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    ORGANELOS_DATA.forEach(org => state.expandedCards.add(org.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToOrganelo(id) {
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

  searchOrganelo(term) {
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
      total: ORGANELOS_DATA.length,
      membranosos: ORGANELOS_DATA.filter(o => o.categorias.includes('membranosos')).length,
      noMembranosos: ORGANELOS_DATA.filter(o => o.categorias.includes('no-membranosos')).length,
      energia: ORGANELOS_DATA.filter(o => o.categorias.includes('energia')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('🔬 Inicializando aplicación de Organelos Celulares...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  OrganelosApp.expandAll()', 'color: #666;');
  console.log('%c  OrganelosApp.collapseAll()', 'color: #666;');
  console.log('%c  OrganelosApp.goToOrganelo("nucleo")', 'color: #666;');
  console.log('%c  OrganelosApp.searchOrganelo("mitocondria")', 'color: #666;');
  console.log('%c  OrganelosApp.getStats()', 'color: #666;');
}

window.OrganelosApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
