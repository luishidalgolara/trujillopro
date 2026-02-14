// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    TRANSPORTE_DATA.forEach(transp => state.expandedCards.add(transp.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToTransporte(id) {
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

  searchTransporte(term) {
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
      total: TRANSPORTE_DATA.length,
      pasivo: TRANSPORTE_DATA.filter(t => t.categorias.includes('pasivo')).length,
      activo: TRANSPORTE_DATA.filter(t => t.categorias.includes('activo')).length,
      canales: TRANSPORTE_DATA.filter(t => t.categorias.includes('canales')).length,
      bombas: TRANSPORTE_DATA.filter(t => t.categorias.includes('bombas')).length,
      vesicular: TRANSPORTE_DATA.filter(t => t.categorias.includes('vesicular')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('⚡ Inicializando aplicación de Transporte Celular...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  TransporteApp.expandAll()', 'color: #666;');
  console.log('%c  TransporteApp.collapseAll()', 'color: #666;');
  console.log('%c  TransporteApp.goToTransporte("difusion-simple")', 'color: #666;');
  console.log('%c  TransporteApp.searchTransporte("bomba")', 'color: #666;');
  console.log('%c  TransporteApp.getStats()', 'color: #666;');
}

window.TransporteApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
