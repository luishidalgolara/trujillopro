// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    TEJIDO_CONECTIVO_DATA.forEach(tejido => state.expandedCards.add(tejido.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToTejido(id) {
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

  searchTejido(term) {
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
      total: TEJIDO_CONECTIVO_DATA.length,
      laxoDenso: TEJIDO_CONECTIVO_DATA.filter(t => t.categorias.includes('laxo-denso')).length,
      especializado: TEJIDO_CONECTIVO_DATA.filter(t => t.categorias.includes('especializado')).length,
      liquido: TEJIDO_CONECTIVO_DATA.filter(t => t.categorias.includes('liquido')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredTejidos.length
    };
  }
};

function init() {
  console.log('🔬 Inicializando aplicación de Tejido Conectivo...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  TejidoConectivoApp.expandAll()', 'color: #666;');
  console.log('%c  TejidoConectivoApp.collapseAll()', 'color: #666;');
  console.log('%c  TejidoConectivoApp.goToTejido("adiposo-blanco")', 'color: #666;');
  console.log('%c  TejidoConectivoApp.searchTejido("colágeno")', 'color: #666;');
  console.log('%c  TejidoConectivoApp.getStats()', 'color: #666;');
}

window.TejidoConectivoApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
