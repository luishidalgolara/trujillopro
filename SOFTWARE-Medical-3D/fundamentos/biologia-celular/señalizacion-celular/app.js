// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    SEÑALIZACION_DATA.forEach(señal => state.expandedCards.add(señal.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToSeñalizacion(id) {
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

  searchSeñalizacion(term) {
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
      total: SEÑALIZACION_DATA.length,
      receptores: SEÑALIZACION_DATA.filter(s => s.categorias.includes('receptores')).length,
      gproteinas: SEÑALIZACION_DATA.filter(s => s.categorias.includes('gproteinas')).length,
      kinasas: SEÑALIZACION_DATA.filter(s => s.categorias.includes('kinasas')).length,
      desarrollo: SEÑALIZACION_DATA.filter(s => s.categorias.includes('desarrollo')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('📡 Inicializando aplicación de Señalización Celular...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  SeñalizacionApp.expandAll()', 'color: #666;');
  console.log('%c  SeñalizacionApp.collapseAll()', 'color: #666;');
  console.log('%c  SeñalizacionApp.goToSeñalizacion("receptores-gpcr")', 'color: #666;');
  console.log('%c  SeñalizacionApp.searchSeñalizacion("MAPK")', 'color: #666;');
  console.log('%c  SeñalizacionApp.getStats()', 'color: #666;');
}

window.SeñalizacionApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
