// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    ADN_ARN_DATA.forEach(t => state.expandedCards.add(t.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToTema(id) {
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

  searchTema(term) {
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
      total: ADN_ARN_DATA.length,
      estructura: ADN_ARN_DATA.filter(t => t.categorias.includes('estructura')).length,
      replicacion: ADN_ARN_DATA.filter(t => t.categorias.includes('replicacion')).length,
      transcripcion: ADN_ARN_DATA.filter(t => t.categorias.includes('transcripcion')).length,
      traduccion: ADN_ARN_DATA.filter(t => t.categorias.includes('traduccion')).length,
      reparacion: ADN_ARN_DATA.filter(t => t.categorias.includes('reparacion')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredTemas.length
    };
  }
};

function init() {
  console.log('🧬 Inicializando aplicación de ADN y ARN...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  ADNARNApp.expandAll()', 'color: #666;');
  console.log('%c  ADNARNApp.collapseAll()', 'color: #666;');
  console.log('%c  ADNARNApp.goToTema("estructura-adn")', 'color: #666;');
  console.log('%c  ADNARNApp.searchTema("replicacion")', 'color: #666;');
  console.log('%c  ADNARNApp.getStats()', 'color: #666;');
}

window.ADNARNApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
