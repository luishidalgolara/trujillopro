// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    AUTOINMUNIDAD_DATA.forEach(concepto => state.expandedCards.add(concepto.id));
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
      total: AUTOINMUNIDAD_DATA.length,
      tolerancia: AUTOINMUNIDAD_DATA.filter(c => c.categorias.includes('tolerancia')).length,
      mecanismos: AUTOINMUNIDAD_DATA.filter(c => c.categorias.includes('mecanismos')).length,
      organoespecificas: AUTOINMUNIDAD_DATA.filter(c => c.categorias.includes('organoespecificas')).length,
      sistemicas: AUTOINMUNIDAD_DATA.filter(c => c.categorias.includes('sistemicas')).length,
      tratamiento: AUTOINMUNIDAD_DATA.filter(c => c.categorias.includes('tratamiento')).length,
      genetica: AUTOINMUNIDAD_DATA.filter(c => c.categorias.includes('genetica')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredConceptos.length
    };
  }
};

function init() {
  console.log('🔬 Inicializando aplicación de Autoinmunidad...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #5cc8d4;');
  console.log('%c  AutoinmunidadApp.expandAll()', 'color: #8a94a8;');
  console.log('%c  AutoinmunidadApp.collapseAll()', 'color: #8a94a8;');
  console.log('%c  AutoinmunidadApp.goToConcepto("lupus")', 'color: #8a94a8;');
  console.log('%c  AutoinmunidadApp.searchConcepto("tolerancia")', 'color: #8a94a8;');
  console.log('%c  AutoinmunidadApp.getStats()', 'color: #8a94a8;');
}

window.AutoinmunidadApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
