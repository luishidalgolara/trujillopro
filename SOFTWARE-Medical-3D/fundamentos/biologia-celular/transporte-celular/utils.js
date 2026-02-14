// ═══════════════════════════════════════════════════════════
// UTILS - Funciones de utilidad
// ═══════════════════════════════════════════════════════════

const utils = {
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  highlightText(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  },

  scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

const filtering = {
  filterByCategory(transportes, category) {
    if (category === 'all') return transportes;
    return transportes.filter(transp => transp.categorias.includes(category));
  },

  filterBySearch(transportes, term) {
    if (!term) return transportes;
    
    const lowerTerm = term.toLowerCase();
    return transportes.filter(transp => {
      if (transp.nombre.toLowerCase().includes(lowerTerm)) return true;
      if (transp.subtitulo.toLowerCase().includes(lowerTerm)) return true;
      
      return transp.secciones.some(seccion => {
        if (seccion.items) {
          return seccion.items.some(item => 
            item.toLowerCase().includes(lowerTerm)
          );
        }
        if (seccion.datos) {
          return seccion.datos.some(dato => 
            dato.label.toLowerCase().includes(lowerTerm) ||
            dato.value.toLowerCase().includes(lowerTerm)
          );
        }
        return false;
      });
    });
  },

  applyFilters() {
    let filtered = [...TRANSPORTE_DATA];
    filtered = this.filterByCategory(filtered, state.selectedCategory);
    filtered = this.filterBySearch(filtered, state.searchTerm);
    state.filteredOrganelos = filtered;
  }
};
