// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    INFLAMACION_DATA.forEach(concepto => state.expandedCards.add(concepto.id));
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
      total: INFLAMACION_DATA.length,
      aguda: INFLAMACION_DATA.filter(c => c.categorias.includes('aguda')).length,
      cronica: INFLAMACION_DATA.filter(c => c.categorias.includes('cronica')).length,
      mediadores: INFLAMACION_DATA.filter(c => c.categorias.includes('mediadores')).length,
      celulas: INFLAMACION_DATA.filter(c => c.categorias.includes('celulas')).length,
      molecular: INFLAMACION_DATA.filter(c => c.categorias.includes('molecular')).length,
      patologia: INFLAMACION_DATA.filter(c => c.categorias.includes('patologia')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredConceptos.length
    };
  }
};

function init() {
  console.log('🔥 Inicializando aplicación de Inflamación...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #5cc8d4;');
  console.log('%c  InflamacionApp.expandAll()', 'color: #8a94a8;');
  console.log('%c  InflamacionApp.collapseAll()', 'color: #8a94a8;');
  console.log('%c  InflamacionApp.goToConcepto("neutrofilos")', 'color: #8a94a8;');
  console.log('%c  InflamacionApp.searchConcepto("histamina")', 'color: #8a94a8;');
  console.log('%c  InflamacionApp.getStats()', 'color: #8a94a8;');
}

window.InflamacionApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
