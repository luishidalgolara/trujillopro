// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    SISTEMA_ENDOCRINO_DATA.forEach(t => state.expandedCards.add(t.id));
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
      total: SISTEMA_ENDOCRINO_DATA.length,
      ejesHormonales: SISTEMA_ENDOCRINO_DATA.filter(t => t.categorias.includes('ejes-hormonales')).length,
      glandulas: SISTEMA_ENDOCRINO_DATA.filter(t => t.categorias.includes('glandulas')).length,
      metabolismo: SISTEMA_ENDOCRINO_DATA.filter(t => t.categorias.includes('metabolismo')).length,
      patologia: SISTEMA_ENDOCRINO_DATA.filter(t => t.categorias.includes('patologia')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredTemas.length
    };
  }
};

function init() {
  console.log('⚗️ Inicializando aplicación de Sistema Endocrino...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  SistemaEndocrinoApp.expandAll()', 'color: #666;');
  console.log('%c  SistemaEndocrinoApp.collapseAll()', 'color: #666;');
  console.log('%c  SistemaEndocrinoApp.goToTema("hipotalamo-hipofisis")', 'color: #666;');
  console.log('%c  SistemaEndocrinoApp.searchTema("diabetes")', 'color: #666;');
  console.log('%c  SistemaEndocrinoApp.getStats()', 'color: #666;');
}

window.SistemaEndocrinoApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
