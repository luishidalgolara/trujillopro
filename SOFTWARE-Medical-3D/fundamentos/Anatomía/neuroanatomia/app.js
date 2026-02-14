// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    NEURO_DATA.forEach(est => state.expandedCards.add(est.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToEstructura(id) {
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

  searchEstructura(term) {
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
      total: NEURO_DATA.length,
      encefalo: NEURO_DATA.filter(e => e.categorias.includes('encefalo')).length,
      medulaEspinal: NEURO_DATA.filter(e => e.categorias.includes('medula-espinal')).length,
      nerviosCraneales: NEURO_DATA.filter(e => e.categorias.includes('nervios-craneales')).length,
      nerviosPerifericos: NEURO_DATA.filter(e => e.categorias.includes('nervios-perifericos')).length,
      viasAscendentes: NEURO_DATA.filter(e => e.categorias.includes('vias-ascendentes')).length,
      viasDescendentes: NEURO_DATA.filter(e => e.categorias.includes('vias-descendentes')).length,
      sistemaAutonomo: NEURO_DATA.filter(e => e.categorias.includes('sistema-autonomo')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredEstructuras.length
    };
  }
};

function init() {
  console.log('🧠 Inicializando aplicación de Neuroanatomía...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  NeuroApp.expandAll()', 'color: #666;');
  console.log('%c  NeuroApp.collapseAll()', 'color: #666;');
  console.log('%c  NeuroApp.goToEstructura("corteza-motora")', 'color: #666;');
  console.log('%c  NeuroApp.searchEstructura("dopamina")', 'color: #666;');
  console.log('%c  NeuroApp.getStats()', 'color: #666;');
}

window.NeuroApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
