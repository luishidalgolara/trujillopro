// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    MECANISMOS_ENFERMEDAD_DATA.forEach(mec => state.expandedCards.add(mec.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToMecanismo(id) {
    state.expandedCards.add(id);
    render.renderCards();
    
    setTimeout(() => {
      const card = document.querySelector(`.organelo-card[data-id="${id}"]`);
      if (card) {
        utils.scrollToElement(card);
        card.style.boxShadow = '0 0 40px rgba(92, 200, 212, 0.5)';
        setTimeout(() => {
          card.style.boxShadow = '';
        }, 2000);
      }
    }, 300);
  },

  searchMecanismo(term) {
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
      total: MECANISMOS_ENFERMEDAD_DATA.length,
      inflamacion: MECANISMOS_ENFERMEDAD_DATA.filter(m => m.categorias.includes('inflamacion')).length,
      patologiaCelular: MECANISMOS_ENFERMEDAD_DATA.filter(m => m.categorias.includes('patologia-celular')).length,
      hemodinamica: MECANISMOS_ENFERMEDAD_DATA.filter(m => m.categorias.includes('hemodinamica')).length,
      oncologia: MECANISMOS_ENFERMEDAD_DATA.filter(m => m.categorias.includes('oncologia')).length,
      inmunologia: MECANISMOS_ENFERMEDAD_DATA.filter(m => m.categorias.includes('inmunologia')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredMecanismos.length
    };
  }
};

function init() {
  console.log('🦠 Inicializando aplicación de Mecanismos de Enfermedad...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #5cc8d4;');
  console.log('%c  MecanismosEnfermedadApp.expandAll()', 'color: #8a94a8;');
  console.log('%c  MecanismosEnfermedadApp.collapseAll()', 'color: #8a94a8;');
  console.log('%c  MecanismosEnfermedadApp.goToMecanismo("inflamacion-aguda")', 'color: #8a94a8;');
  console.log('%c  MecanismosEnfermedadApp.searchMecanismo("necrosis")', 'color: #8a94a8;');
  console.log('%c  MecanismosEnfermedadApp.getStats()', 'color: #8a94a8;');
}

window.MecanismosEnfermedadApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
