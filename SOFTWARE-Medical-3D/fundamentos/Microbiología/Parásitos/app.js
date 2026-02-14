// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    PARASITOS_DATA.forEach(org => state.expandedCards.add(org.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToParasito(id) {
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

  searchParasito(term) {
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
      total: PARASITOS_DATA.length,
      protozoarios: PARASITOS_DATA.filter(o => o.categorias.includes('protozoarios')).length,
      helmintos: PARASITOS_DATA.filter(o => o.categorias.includes('helmintos')).length,
      nematodos: PARASITOS_DATA.filter(o => o.categorias.includes('nematodos')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('🦠 Inicializando aplicación de Parásitos...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  ParasitosApp.expandAll()', 'color: #666;');
  console.log('%c  ParasitosApp.collapseAll()', 'color: #666;');
  console.log('%c  ParasitosApp.goToParasito("plasmodium-falciparum")', 'color: #666;');
  console.log('%c  ParasitosApp.searchParasito("ciclo de vida")', 'color: #666;');
  console.log('%c  ParasitosApp.getStats()', 'color: #666;');
}

window.ParasitosApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
