// ═══════════════════════════════════════════════════════════
// APP.JS - Orquestador principal
// ═══════════════════════════════════════════════════════════

const api = {
  expandAll() {
    VIRUS_DATA.forEach(org => state.expandedCards.add(org.id));
    render.renderCards();
  },

  collapseAll() {
    state.expandedCards.clear();
    render.renderCards();
  },

  goToVirus(id) {
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

  searchVirus(term) {
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
      total: VIRUS_DATA.length,
      dna: VIRUS_DATA.filter(o => o.categorias.includes('dna')).length,
      rna: VIRUS_DATA.filter(o => o.categorias.includes('rna')).length,
      envueltos: VIRUS_DATA.filter(o => o.categorias.includes('envueltos')).length,
      expanded: state.expandedCards.size,
      filtered: state.filteredOrganelos.length
    };
  }
};

function init() {
  console.log('🦠 Inicializando aplicación de Virus...');
  
  filtering.applyFilters();
  render.renderAll();
  
  console.log('✅ Aplicación cargada correctamente');
  console.log(`📊 Estadísticas:`, api.getStats());
  console.log('%c💡 API disponible en consola:', 'font-weight: bold; color: #2c5f7e;');
  console.log('%c  VirusApp.expandAll()', 'color: #666;');
  console.log('%c  VirusApp.collapseAll()', 'color: #666;');
  console.log('%c  VirusApp.goToVirus("sars-cov-2")', 'color: #666;');
  console.log('%c  VirusApp.searchVirus("RNA")', 'color: #666;');
  console.log('%c  VirusApp.getStats()', 'color: #666;');
}

window.VirusApp = api;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
