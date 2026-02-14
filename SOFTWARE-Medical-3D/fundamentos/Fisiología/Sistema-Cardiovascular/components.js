// ═══════════════════════════════════════════════════════════
// COMPONENTS - Generadores de HTML
// ═══════════════════════════════════════════════════════════

const components = {
  createHeader() {
    return `
      <header class="header">
        <div class="header-content">
          <div class="header-icon">❤️</div>
          <div class="header-title">
            <h1>Sistema Cardiovascular - Fisiología</h1>
            <p class="header-subtitle">Fisiología Cardiovascular · Nivel Universitario</p>
          </div>
          <button class="close-btn" id="closeBtn" aria-label="Cerrar">✕</button>
        </div>
      </header>
    `;
  },

  createSearch() {
    return `
      <section class="search-section">
        <div class="search-container">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            class="search-input" 
            id="searchInput"
            placeholder="Buscar corazón, válvula, presión, arritmia, infarto..."
            value="${state.searchTerm}"
          >
        </div>
      </section>
    `;
  },

  createNav() {
    return `
      <nav class="nav-section">
        <div class="nav-container">
          ${CONFIG.categorias.map(cat => `
            <button 
              class="nav-btn ${state.selectedCategory === cat.id ? 'active' : ''}" 
              data-category="${cat.id}"
            >
              ${cat.nombre}
            </button>
          `).join('')}
        </div>
      </nav>
    `;
  },

  createCard(tema, index) {
    const isExpanded = state.expandedCards.has(tema.id);
    const shouldHighlight = state.searchTerm.length > 0;

    return `
      <article 
        class="organelo-card ${isExpanded ? 'expanded' : ''}" 
        data-id="${tema.id}"
        style="animation-delay: ${index * CONFIG.animationDelay}ms"
      >
        <div class="card-header" data-id="${tema.id}">
          <div class="card-icon">${tema.icono}</div>
          <div class="card-title-area">
            <h2 class="card-title">${shouldHighlight ? utils.highlightText(tema.nombre, state.searchTerm) : tema.nombre}</h2>
            <p class="card-subtitle">${tema.subtitulo}</p>
          </div>
          <button class="toggle-btn" aria-label="Expandir/contraer">+</button>
        </div>
        <div class="card-body">
          ${tema.secciones.map(seccion => this.createSection(seccion, shouldHighlight)).join('')}
        </div>
      </article>
    `;
  },

  createSection(seccion, shouldHighlight) {
    if (seccion.tipo === 'tabla') {
      return this.createTableSection(seccion, shouldHighlight);
    } else if (seccion.tipo === 'clinica') {
      return this.createClinicSection(seccion, shouldHighlight);
    } else {
      return this.createListSection(seccion, shouldHighlight);
    }
  },

  createListSection(seccion, shouldHighlight) {
    return `
      <section class="card-section">
        <h3 class="section-title">${seccion.titulo}</h3>
        <ul>
          ${seccion.items.map(item => `
            <li>${shouldHighlight ? utils.highlightText(item, state.searchTerm) : item}</li>
          `).join('')}
        </ul>
      </section>
    `;
  },

  createTableSection(seccion, shouldHighlight) {
    return `
      <section class="card-section">
        <h3 class="section-title">${seccion.titulo}</h3>
        <div class="molecular-table">
          ${seccion.datos.map(row => `
            <div class="mol-row">
              <div class="mol-label">${row.label}</div>
              <div class="mol-value">${shouldHighlight ? utils.highlightText(row.value, state.searchTerm) : row.value}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  createClinicSection(seccion, shouldHighlight) {
    return `
      <section class="card-section clinical-section">
        <h3 class="clinical-title">${seccion.titulo}</h3>
        <div class="clinical-content">
          <strong>🔴 Patologías y relevancia:</strong>
          <ul>
            ${seccion.items.map(item => `
              <li>${shouldHighlight ? utils.highlightText(item, state.searchTerm) : item}</li>
            `).join('')}
          </ul>
        </div>
      </section>
    `;
  },

  createNoResults() {
    return `
      <div class="no-results visible">
        <div class="no-results-icon">❤️</div>
        <p class="no-results-text">No se encontraron temas con el criterio de búsqueda.</p>
      </div>
    `;
  },

  createFooter() {
    return `
      <footer class="footer">
        <div class="footer-content">
          <p><strong>Fuente:</strong> Contenido basado en <em>Guyton & Hall (2021) Textbook of Medical Physiology, 14th ed.; Boron & Boulpaep (2022) Medical Physiology, 4th ed.; Opie & Hasenfuss (2019) Mechanisms of Cardiac Contraction and Relaxation</em></p>
          <p><strong>Última actualización:</strong> Febrero 2026 · Nivel universitario</p>
        </div>
      </footer>
    `;
  }
};
