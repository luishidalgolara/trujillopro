// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    POTENCIAL_ACCION_DATA.forEach(concepto => state.expandedCards.add(concepto.id));
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
      total: POTENCIAL_ACCION_DATA.length,
      fundamentos: POTENCIAL_ACCION_DATA.filter(c => c.categorias.includes('fundamentos')).length,
      electrofisiologia: POTENCIAL_ACCION_DATA.filter(c => c.categorias.includes('electrofisiologia')).length,
      conduccion: POTENCIAL_ACCION_DATA.filter(c => c.categorias.includes('conduccion')).length,
      sinapsis: POTENCIAL_ACCION_DATA.filter(c => c.categorias.includes('sinapsis')).length,
      neurotransmision: POTENCIAL_ACCION_DATA.filter(c => c.categorias.includes('neurotransmision')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredConceptos.length
    };
  }
};

function init() {
  console.log('⚡ Inicializando aplicación de Potencial de Acción Neuronal...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #5cc8d4;');
  console.log('%c  PotencialAccionApp.expandAll()', 'color: #8a94a8;');
  console.log('%c  PotencialAccionApp.collapseAll()', 'color: #8a94a8;');
  console.log('%c  PotencialAccionApp.goToConcepto("potencial-accion")', 'color: #8a94a8;');
  console.log('%c  PotencialAccionApp.searchConcepto("NMDA")', 'color: #8a94a8;');
  console.log('%c  PotencialAccionApp.getStats()', 'color: #8a94a8;');
}

window.PotencialAccionApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
