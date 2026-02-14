// ═══════════════════════════════════════════════════════════
// HANDLERS - Manejadores de eventos
// ═══════════════════════════════════════════════════════════

const handlers = {
  handleClose() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '../../../fundamentos.html';
    }
  },

  handleSearch(e) {
    state.searchTerm = e.target.value.trim();
    filtering.applyFilters();
    render.renderCards();
  },

  handleCategoryClick(e) {
    const category = e.target.dataset.category;
    if (!category) return;
    
    state.selectedCategory = category;
    filtering.applyFilters();
    render.renderAll();
  },

  handleCardToggle(e) {
    const cardId = e.currentTarget.dataset.id;
    if (!cardId) return;

    const card = document.querySelector(`.organelo-card[data-id="${cardId}"]`);
    if (!card) return;

    if (state.expandedCards.has(cardId)) {
      state.expandedCards.delete(cardId);
      card.classList.remove('expanded');
    } else {
      state.expandedCards.add(cardId);
      card.classList.add('expanded');
      
      setTimeout(() => {
        utils.scrollToElement(card);
      }, 300);
    }
  },

  handleKeyboard(e) {
    if (e.key === 'Escape') {
      const searchInput = document.getElementById('searchInput');
      if (document.activeElement === searchInput && searchInput.value) {
        searchInput.value = '';
        state.searchTerm = '';
        filtering.applyFilters();
        render.renderCards();
      } else {
        handlers.handleClose();
      }
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('searchInput')?.focus();
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
      e.preventDefault();
      api.expandAll();
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
      e.preventDefault();
      api.collapseAll();
    }
  }
};

const render = {
  renderAll() {
    const root = document.getElementById('root');
    root.innerHTML = `
      ${components.createHeader()}
      ${components.createSearch()}
      ${components.createNav()}
      <main class="main-content">
        <div class="organelos-grid" id="organelosGrid">
          ${state.filteredProteinas.length > 0 
            ? state.filteredProteinas.map((p, idx) => components.createCard(p, idx)).join('')
            : components.createNoResults()
          }
        </div>
      </main>
      ${components.createFooter()}
    `;
    
    this.attachEventListeners();
  },

  renderCards() {
    const grid = document.getElementById('organelosGrid');
    if (!grid) return;

    if (state.filteredProteinas.length === 0) {
      grid.innerHTML = components.createNoResults();
    } else {
      grid.innerHTML = state.filteredProteinas
        .map((p, idx) => components.createCard(p, idx))
        .join('');
    }
    
    this.attachCardListeners();
  },

  attachEventListeners() {
    const closeBtn = document.getElementById('closeBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', handlers.handleClose);
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', utils.debounce(handlers.handleSearch, CONFIG.searchDebounce));
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', handlers.handleCategoryClick);
    });

    this.attachCardListeners();
    document.addEventListener('keydown', handlers.handleKeyboard);
  },

  attachCardListeners() {
    document.querySelectorAll('.card-header').forEach(header => {
      header.addEventListener('click', handlers.handleCardToggle);
    });
  }
};
