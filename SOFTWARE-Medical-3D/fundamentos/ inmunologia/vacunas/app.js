// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    VACUNAS_DATA.forEach(concepto => state.expandedCards.add(concepto.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToConcepto(id) {
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

  searchConcepto(term) {
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
      total: VACUNAS_DATA.length,
      activa: VACUNAS_DATA.filter(c => c.categorias.includes('activa')).length,
      pasiva: VACUNAS_DATA.filter(c => c.categorias.includes('pasiva')).length,
      vivas: VACUNAS_DATA.filter(c => c.categorias.includes('vivas')).length,
      inactivadas: VACUNAS_DATA.filter(c => c.categorias.includes('inactivadas')).length,
      subunidad: VACUNAS_DATA.filter(c => c.categorias.includes('subunidad')).length,
      nuevas: VACUNAS_DATA.filter(c => c.categorias.includes('nuevas')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredConceptos.length
    };
  }
};

function init() {
  console.log('💉 Inicializando aplicación de Vacunas...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #5cc8d4;');
  console.log('%c  VacunasApp.expandAll()', 'color: #8a94a8;');
  console.log('%c  VacunasApp.collapseAll()', 'color: #8a94a8;');
  console.log('%c  VacunasApp.goToConcepto("mrna")', 'color: #8a94a8;');
  console.log('%c  VacunasApp.searchConcepto("sarampion")', 'color: #8a94a8;');
  console.log('%c  VacunasApp.getStats()', 'color: #8a94a8;');
}

window.VacunasApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
