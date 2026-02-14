// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    FARMACODINAMIA_DATA.forEach(org => state.expandedCards.add(org.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToMecanismo(id) {
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

  searchMecanismo(term) {
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
      total: FARMACODINAMIA_DATA.length,
      receptores: FARMACODINAMIA_DATA.filter(o => o.categorias.includes('receptores')).length,
      enzimas: FARMACODINAMIA_DATA.filter(o => o.categorias.includes('enzimas')).length,
      canales: FARMACODINAMIA_DATA.filter(o => o.categorias.includes('canales-ionicos')).length,
      transportadores: FARMACODINAMIA_DATA.filter(o => o.categorias.includes('transportadores')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('💊 Inicializando aplicación de Mecanismos de Acción...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  FarmacoApp.expandAll()', 'color: #666;');
  console.log('%c  FarmacoApp.collapseAll()', 'color: #666;');
  console.log('%c  FarmacoApp.goToMecanismo("beta-bloqueantes")', 'color: #666;');
  console.log('%c  FarmacoApp.searchMecanismo("estatinas")', 'color: #666;');
  console.log('%c  FarmacoApp.getStats()', 'color: #666;');
}

window.FarmacoApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
