// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    PRESION_ARTERIAL_DATA.forEach(mec => state.expandedCards.add(mec.id));
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
      total: PRESION_ARTERIAL_DATA.length,
      barorreceptor: PRESION_ARTERIAL_DATA.filter(m => m.categorias.includes('barorreceptor')).length,
      hormonal: PRESION_ARTERIAL_DATA.filter(m => m.categorias.includes('hormonal')).length,
      renal: PRESION_ARTERIAL_DATA.filter(m => m.categorias.includes('renal')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredMecanismos.length
    };
  }
};

function init() {
  console.log('🩺 Inicializando aplicación de Regulación de Presión Arterial...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  PresionArterialApp.expandAll()', 'color: #666;');
  console.log('%c  PresionArterialApp.collapseAll()', 'color: #666;');
  console.log('%c  PresionArterialApp.goToMecanismo("sraa")', 'color: #666;');
  console.log('%c  PresionArterialApp.searchMecanismo("barorreceptor")', 'color: #666;');
  console.log('%c  PresionArterialApp.getStats()', 'color: #666;');
}

window.PresionArterialApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
