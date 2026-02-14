// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    EPIGENETICA_DATA.forEach(t => state.expandedCards.add(t.id));
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
      total: EPIGENETICA_DATA.length,
      mecanismos: EPIGENETICA_DATA.filter(t => t.categorias.includes('mecanismos')).length,
      regulacion: EPIGENETICA_DATA.filter(t => t.categorias.includes('regulacion')).length,
      herencia: EPIGENETICA_DATA.filter(t => t.categorias.includes('herencia')).length,
      desarrollo: EPIGENETICA_DATA.filter(t => t.categorias.includes('desarrollo')).length,
      clinica: EPIGENETICA_DATA.filter(t => t.categorias.includes('clinica')).length,
      metodologia: EPIGENETICA_DATA.filter(t => t.categorias.includes('metodologia')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredTemas.length
    };
  }
};

function init() {
  console.log('🧬 Inicializando aplicación de Epigenética...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  EpigeneticaApp.expandAll()', 'color: #666;');
  console.log('%c  EpigeneticaApp.collapseAll()', 'color: #666;');
  console.log('%c  EpigeneticaApp.goToTema("metilacion-adn")', 'color: #666;');
  console.log('%c  EpigeneticaApp.searchTema("histonas")', 'color: #666;');
  console.log('%c  EpigeneticaApp.getStats()', 'color: #666;');
}

window.EpigeneticaApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
