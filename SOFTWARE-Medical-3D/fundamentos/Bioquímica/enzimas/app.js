// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    ENZIMAS_DATA.forEach(enz => state.expandedCards.add(enz.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToEnzima(id) {
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

  searchEnzima(term) {
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
      total: ENZIMAS_DATA.length,
      oxidorreductasas: ENZIMAS_DATA.filter(e => e.categorias.includes('oxidorreductasas')).length,
      transferasas: ENZIMAS_DATA.filter(e => e.categorias.includes('transferasas')).length,
      hidrolasas: ENZIMAS_DATA.filter(e => e.categorias.includes('hidrolasas')).length,
      liasas: ENZIMAS_DATA.filter(e => e.categorias.includes('liasas')).length,
      isomerasas: ENZIMAS_DATA.filter(e => e.categorias.includes('isomerasas')).length,
      ligasas: ENZIMAS_DATA.filter(e => e.categorias.includes('ligasas')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredEnzimas.length
    };
  }
};

function init() {
  console.log('🧬 Inicializando aplicación de Enzimas...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  EnzimasApp.expandAll()', 'color: #666;');
  console.log('%c  EnzimasApp.collapseAll()', 'color: #666;');
  console.log('%c  EnzimasApp.goToEnzima("hexoquinasa")', 'color: #666;');
  console.log('%c  EnzimasApp.searchEnzima("NAD")', 'color: #666;');
  console.log('%c  EnzimasApp.getStats()', 'color: #666;');
}

window.EnzimasApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
