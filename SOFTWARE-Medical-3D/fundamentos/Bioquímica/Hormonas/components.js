// ═══════════════════════════════════════════════════════════
// COMPONENTS - Generadores de HTML
// ═══════════════════════════════════════════════════════════

const components = {
  createHeader() {
    return `
      <header class="header">
        <div class="header-content">
          <div class="header-icon">💉</div>
          <div class="header-title">
            <h1>Sistema Endocrino y Hormonas</h1>
            <p class="header-subtitle">Fisiología y Endocrinología · Nivel Universitario</p>
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
            placeholder="Buscar hormona, glándula, receptor, acción, enfermedad..."
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

  createCard(hormona, index) {
    const isExpanded = state.expandedCards.has(hormona.id);
    const shouldHighlight = state.searchTerm.length > 0;

    return `
      <article 
        class="organelo-card ${isExpanded ? 'expanded' : ''}" 
        data-id="${hormona.id}"
        style="animation-delay: ${index * CONFIG.animationDelay}ms"
      >
        <div class="card-header" data-id="${hormona.id}">
          <div class="card-icon">${hormona.icono}</div>
          <div class="card-title-area">
            <h2 class="card-title">${shouldHighlight ? utils.highlightText(hormona.nombre, state.searchTerm) : hormona.nombre}</h2>
            <p class="card-subtitle">${hormona.subtitulo}</p>
          </div>
          <button class="toggle-btn" aria-label="Expandir/contraer">+</button>
        </div>
        <div class="card-body">
          ${hormona.secciones.map(seccion => this.createSection(seccion, shouldHighlight)).join('')}
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
          <strong>🔴 Patologías asociadas:</strong>
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
        <div class="no-results-icon">💉</div>
        <p class="no-results-text">No se encontraron hormonas con el criterio de búsqueda.</p>
      </div>
    `;
  },

  createFooter() {
    return `
      <footer class="footer">
        <div class="footer-content">
          <p><strong>Fuente:</strong> Contenido basado en <em>Gardner & Shoback (2023) Greenspan's Basic & Clinical Endocrinology, 11th ed.; Melmed et al. (2020) Williams Textbook of Endocrinology, 14th ed.</em></p>
          <p><strong>Última actualización:</strong> Febrero 2026 · Nivel universitario</p>
        </div>
      </footer>
    `;
  }
};
