// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    SISTEMA_NERVIOSO_DATA.forEach(t => state.expandedCards.add(t.id));
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
      total: SISTEMA_NERVIOSO_DATA.length,
      neurofisiologia: SISTEMA_NERVIOSO_DATA.filter(t => t.categorias.includes('neurofisiologia')).length,
      sinapsis: SISTEMA_NERVIOSO_DATA.filter(t => t.categorias.includes('sinapsis')).length,
      sensorial: SISTEMA_NERVIOSO_DATA.filter(t => t.categorias.includes('sensorial')).length,
      motora: SISTEMA_NERVIOSO_DATA.filter(t => t.categorias.includes('motora')).length,
      cognitiva: SISTEMA_NERVIOSO_DATA.filter(t => t.categorias.includes('cognitiva')).length,
      patologia: SISTEMA_NERVIOSO_DATA.filter(t => t.categorias.includes('patologia')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredTemas.length
    };
  }
};

function init() {
  console.log('🧠 Inicializando aplicación de Sistema Nervioso...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  SistemaNerviosoApp.expandAll()', 'color: #666;');
  console.log('%c  SistemaNerviosoApp.collapseAll()', 'color: #666;');
  console.log('%c  SistemaNerviosoApp.goToTema("neurona-estructura")', 'color: #666;');
  console.log('%c  SistemaNerviosoApp.searchTema("sinapsis")', 'color: #666;');
  console.log('%c  SistemaNerviosoApp.getStats()', 'color: #666;');
}

window.SistemaNerviosoApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
