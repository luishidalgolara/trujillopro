// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    RESPUESTA_INFECCION_DATA.forEach(concepto => state.expandedCards.add(concepto.id));
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
      total: RESPUESTA_INFECCION_DATA.length,
      fiebre: RESPUESTA_INFECCION_DATA.filter(c => c.categorias.includes('fiebre')).length,
      patogenos: RESPUESTA_INFECCION_DATA.filter(c => c.categorias.includes('patogenos')).length,
      citocinas: RESPUESTA_INFECCION_DATA.filter(c => c.categorias.includes('citocinas')).length,
      inmunidadInnata: RESPUESTA_INFECCION_DATA.filter(c => c.categorias.includes('inmunidad-innata')).length,
      inmunidadAdaptativa: RESPUESTA_INFECCION_DATA.filter(c => c.categorias.includes('inmunidad-adaptativa')).length,
      respuestaSistemica: RESPUESTA_INFECCION_DATA.filter(c => c.categorias.includes('respuesta-sistemica')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredConceptos.length
    };
  }
};

function init() {
  console.log('🦠 Inicializando aplicación de Respuesta a Infección...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #5cc8d4;');
  console.log('%c  RespuestaInfeccionApp.expandAll()', 'color: #8a94a8;');
  console.log('%c  RespuestaInfeccionApp.collapseAll()', 'color: #8a94a8;');
  console.log('%c  RespuestaInfeccionApp.goToConcepto("piretogenos-exogenos")', 'color: #8a94a8;');
  console.log('%c  RespuestaInfeccionApp.searchConcepto("IL-6")', 'color: #8a94a8;');
  console.log('%c  RespuestaInfeccionApp.getStats()', 'color: #8a94a8;');
}

window.RespuestaInfeccionApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
