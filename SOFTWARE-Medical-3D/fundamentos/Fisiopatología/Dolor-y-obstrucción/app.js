// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    DOLOR_OBSTRUCCION_DATA.forEach(concepto => state.expandedCards.add(concepto.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToConcepto(id) {
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

  searchConcepto(term) {
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
      total: DOLOR_OBSTRUCCION_DATA.length,
      dolor: DOLOR_OBSTRUCCION_DATA.filter(c => c.categorias.includes('dolor')).length,
      nociocepcion: DOLOR_OBSTRUCCION_DATA.filter(c => c.categorias.includes('nociocepcion')).length,
      visceras: DOLOR_OBSTRUCCION_DATA.filter(c => c.categorias.includes('visceras')).length,
      obstruccion: DOLOR_OBSTRUCCION_DATA.filter(c => c.categorias.includes('obstruccion')).length,
      isquemia: DOLOR_OBSTRUCCION_DATA.filter(c => c.categorias.includes('isquemia')).length,
      muerteCelular: DOLOR_OBSTRUCCION_DATA.filter(c => c.categorias.includes('muerte-celular')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredConceptos.length
    };
  }
};

function init() {
  console.log('💥 Inicializando aplicación de Dolor y Obstrucción...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #5cc8d4;');
  console.log('%c  DolorObstruccionApp.expandAll()', 'color: #8a94a8;');
  console.log('%c  DolorObstruccionApp.collapseAll()', 'color: #8a94a8;');
  console.log('%c  DolorObstruccionApp.goToConcepto("dolor-isquemico")', 'color: #8a94a8;');
  console.log('%c  DolorObstruccionApp.searchConcepto("angina")', 'color: #8a94a8;');
  console.log('%c  DolorObstruccionApp.getStats()', 'color: #8a94a8;');
}

window.DolorObstruccionApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}