// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    PROTEINAS_DATA.forEach(p => state.expandedCards.add(p.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToProteina(id) {
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

  searchProteina(term) {
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
      total: PROTEINAS_DATA.length,
      estructurales: PROTEINAS_DATA.filter(p => p.categorias.includes('estructurales')).length,
      transporte: PROTEINAS_DATA.filter(p => p.categorias.includes('transporte')).length,
      defensa: PROTEINAS_DATA.filter(p => p.categorias.includes('defensa')).length,
      reguladoras: PROTEINAS_DATA.filter(p => p.categorias.includes('reguladoras')).length,
      motoras: PROTEINAS_DATA.filter(p => p.categorias.includes('motoras')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredProteinas.length
    };
  }
};

function init() {
  console.log('🧬 Inicializando aplicación de Proteínas...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  ProteinasApp.expandAll()', 'color: #666;');
  console.log('%c  ProteinasApp.collapseAll()', 'color: #666;');
  console.log('%c  ProteinasApp.goToProteina("hemoglobina")', 'color: #666;');
  console.log('%c  ProteinasApp.searchProteina("colageno")', 'color: #666;');
  console.log('%c  ProteinasApp.getStats()', 'color: #666;');
}

window.ProteinasApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
