// ═══════════════════════════════════════════════════════════
// COMPONENTS - Generadores de HTML
// ═══════════════════════════════════════════════════════════

const components = {
  createHeader() {
    return `
      <header class="header">
        <div class="header-content">
          <div class="header-icon">🧬</div>
          <div class="header-title">
            <h1>Enfermedades Hereditarias</h1>
            <p class="header-subtitle">Genética Médica · Nivel Universitario</p>
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
            placeholder="Buscar enfermedad, gen, síntoma, herencia, tratamiento..."
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

  createCard(enfermedad, index) {
    const isExpanded = state.expandedCards.has(enfermedad.id);
    const shouldHighlight = state.searchTerm.length > 0;

    return `
      <article 
        class="organelo-card ${isExpanded ? 'expanded' : ''}" 
        data-id="${enfermedad.id}"
        style="animation-delay: ${index * CONFIG.animationDelay}ms"
      >
        <div class="card-header" data-id="${enfermedad.id}">
          <div class="card-icon">${enfermedad.icono}</div>
          <div class="card-title-area">
            <h2 class="card-title">${shouldHighlight ? utils.highlightText(enfermedad.nombre, state.searchTerm) : enfermedad.nombre}</h2>
            <p class="card-subtitle">${enfermedad.subtitulo}</p>
          </div>
          <button class="toggle-btn" aria-label="Expandir/contraer">+</button>
        </div>
        <div class="card-body">
          ${enfermedad.secciones.map(seccion => this.createSection(seccion, shouldHighlight)).join('')}
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
        <div class="no-results-icon">🧬</div>
        <p class="no-results-text">No se encontraron enfermedades con el criterio de búsqueda.</p>
      </div>
    `;
  },

  createFooter() {
    return `
      <footer class="footer">
        <div class="footer-content">
          <p><strong>Fuente:</strong> Contenido basado en <em>Nussbaum et al. (2023) Thompson & Thompson Genetics in Medicine, 9th ed.; OMIM (Online Mendelian Inheritance in Man).</em></p>
          <p><strong>Última actualización:</strong> Febrero 2026 · Nivel universitario</p>
        </div>
      </footer>
    `;
  }
};
