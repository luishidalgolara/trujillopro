// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    MEMBRANAS_DATA.forEach(mem => state.expandedCards.add(mem.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToMembrana(id) {
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

  searchMembrana(term) {
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
      total: MEMBRANAS_DATA.length,
      estructura: MEMBRANAS_DATA.filter(m => m.categorias.includes('estructura')).length,
      lipidos: MEMBRANAS_DATA.filter(m => m.categorias.includes('lipidos')).length,
      proteinas: MEMBRANAS_DATA.filter(m => m.categorias.includes('proteinas')).length,
      transporte: MEMBRANAS_DATA.filter(m => m.categorias.includes('transporte')).length,
      señalizacion: MEMBRANAS_DATA.filter(m => m.categorias.includes('señalizacion')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('🧬 Inicializando aplicación de Membranas Celulares...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  MembranasApp.expandAll()', 'color: #666;');
  console.log('%c  MembranasApp.collapseAll()', 'color: #666;');
  console.log('%c  MembranasApp.goToMembrana("modelo-mosaico-fluido")', 'color: #666;');
  console.log('%c  MembranasApp.searchMembrana("fosfolípidos")', 'color: #666;');
  console.log('%c  MembranasApp.getStats()', 'color: #666;');
}

window.MembranasApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
