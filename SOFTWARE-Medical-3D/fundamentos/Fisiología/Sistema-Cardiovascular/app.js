// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    SISTEMA_CARDIOVASCULAR_DATA.forEach(t => state.expandedCards.add(t.id));
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
      total: SISTEMA_CARDIOVASCULAR_DATA.length,
      anatomia: SISTEMA_CARDIOVASCULAR_DATA.filter(t => t.categorias.includes('anatomia')).length,
      fisiologia: SISTEMA_CARDIOVASCULAR_DATA.filter(t => t.categorias.includes('fisiologia')).length,
      electrofisiologia: SISTEMA_CARDIOVASCULAR_DATA.filter(t => t.categorias.includes('electrofisiologia')).length,
      regulacion: SISTEMA_CARDIOVASCULAR_DATA.filter(t => t.categorias.includes('regulacion')).length,
      patologia: SISTEMA_CARDIOVASCULAR_DATA.filter(t => t.categorias.includes('patologia')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredTemas.length
    };
  }
};

function init() {
  console.log('❤️ Inicializando aplicación de Sistema Cardiovascular...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  SistemaCardiovascularApp.expandAll()', 'color: #666;');
  console.log('%c  SistemaCardiovascularApp.collapseAll()', 'color: #666;');
  console.log('%c  SistemaCardiovascularApp.goToTema("corazon-estructura")', 'color: #666;');
  console.log('%c  SistemaCardiovascularApp.searchTema("infarto")', 'color: #666;');
  console.log('%c  SistemaCardiovascularApp.getStats()', 'color: #666;');
}

window.SistemaCardiovascularApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
