// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    INMUNOLOGIA_DATA.forEach(concepto => state.expandedCards.add(concepto.id));
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
      total: INMUNOLOGIA_DATA.length,
      innata: INMUNOLOGIA_DATA.filter(c => c.categorias.includes('innata')).length,
      adaptativa: INMUNOLOGIA_DATA.filter(c => c.categorias.includes('adaptativa')).length,
      celulas: INMUNOLOGIA_DATA.filter(c => c.categorias.includes('celulas')).length,
      moleculas: INMUNOLOGIA_DATA.filter(c => c.categorias.includes('moleculas')).length,
      respuesta: INMUNOLOGIA_DATA.filter(c => c.categorias.includes('respuesta')).length,
      patologia: INMUNOLOGIA_DATA.filter(c => c.categorias.includes('patologia')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredConceptos.length
    };
  }
};

function init() {
  console.log('🦠 Inicializando aplicación de Inmunología...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #5cc8d4;');
  console.log('%c  InmunologiaApp.expandAll()', 'color: #8a94a8;');
  console.log('%c  InmunologiaApp.collapseAll()', 'color: #8a94a8;');
  console.log('%c  InmunologiaApp.goToConcepto("linfocito-t")', 'color: #8a94a8;');
  console.log('%c  InmunologiaApp.searchConcepto("anticuerpo")', 'color: #8a94a8;');
  console.log('%c  InmunologiaApp.getStats()', 'color: #8a94a8;');
}

window.InmunologiaApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
