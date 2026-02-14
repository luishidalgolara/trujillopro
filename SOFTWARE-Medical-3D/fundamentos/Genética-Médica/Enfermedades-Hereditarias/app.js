// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    ENFERMEDADES_DATA.forEach(e => state.expandedCards.add(e.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToEnfermedad(id) {
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

  searchEnfermedad(term) {
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
      total: ENFERMEDADES_DATA.length,
      autosomicaDominante: ENFERMEDADES_DATA.filter(e => e.categorias.includes('autosomica-dominante')).length,
      autosomicaRecesiva: ENFERMEDADES_DATA.filter(e => e.categorias.includes('autosomica-recesiva')).length,
      ligadaX: ENFERMEDADES_DATA.filter(e => e.categorias.includes('ligada-x')).length,
      multifactorial: ENFERMEDADES_DATA.filter(e => e.categorias.includes('multifactorial')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredEnfermedades.length
    };
  }
};

function init() {
  console.log('🧬 Inicializando aplicación de Enfermedades Hereditarias...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  EnfermedadesApp.expandAll()', 'color: #666;');
  console.log('%c  EnfermedadesApp.collapseAll()', 'color: #666;');
  console.log('%c  EnfermedadesApp.goToEnfermedad("fibrosis-quistica")', 'color: #666;');
  console.log('%c  EnfermedadesApp.searchEnfermedad("hemofilia")', 'color: #666;');
  console.log('%c  EnfermedadesApp.getStats()', 'color: #666;');
}

window.EnfermedadesApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
