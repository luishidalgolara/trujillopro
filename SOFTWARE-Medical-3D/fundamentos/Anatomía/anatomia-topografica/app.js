// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    ANATOMIA_DATA.forEach(reg => state.expandedCards.add(reg.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToRegion(id) {
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

  searchRegion(term) {
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
      total: ANATOMIA_DATA.length,
      cabezaCuello: ANATOMIA_DATA.filter(r => r.categorias.includes('cabeza-cuello')).length,
      torax: ANATOMIA_DATA.filter(r => r.categorias.includes('torax')).length,
      abdomenPelvis: ANATOMIA_DATA.filter(r => r.categorias.includes('abdomen-pelvis')).length,
      extremidadSuperior: ANATOMIA_DATA.filter(r => r.categorias.includes('extremidad-superior')).length,
      extremidadInferior: ANATOMIA_DATA.filter(r => r.categorias.includes('extremidad-inferior')).length,
      columna: ANATOMIA_DATA.filter(r => r.categorias.includes('columna')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredRegiones.length
    };
  }
};

function init() {
  console.log('🔬 Inicializando aplicación de Anatomía Topográfica...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  AnatomiaApp.expandAll()', 'color: #666;');
  console.log('%c  AnatomiaApp.collapseAll()', 'color: #666;');
  console.log('%c  AnatomiaApp.goToRegion("triangulo-carotideo")', 'color: #666;');
  console.log('%c  AnatomiaApp.searchRegion("carotida")', 'color: #666;');
  console.log('%c  AnatomiaApp.getStats()', 'color: #666;');
}

window.AnatomiaApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
