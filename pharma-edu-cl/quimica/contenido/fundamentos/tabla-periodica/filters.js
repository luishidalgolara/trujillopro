/* ============================================
   FILTERS & SEARCH — PharmaLab Chile
   Filtros por categoría, estado, bloque + búsqueda
   ============================================ */

(function() {
  'use strict';

  let activeFilters = { category: null, state: null, block: null, search: '' };

  const CATEGORIES = [
    { key:'nonmetal', label:'No metales' },
    { key:'alkali', label:'Alcalinos' },
    { key:'alkaline', label:'Alcalinotérreos' },
    { key:'transition', label:'Transición' },
    { key:'metalloid', label:'Metaloides' },
    { key:'halogen', label:'Halógenos' },
    { key:'noble', label:'Gases nobles' },
    { key:'postmetal', label:'Otros metales' },
    { key:'lanthanide', label:'Lantánidos' },
    { key:'actinide', label:'Actínidos' }
  ];

  const STATES = ['Sólido','Líquido','Gas'];
  const BLOCKS = ['s','p','d','f'];

  function init() {
    const tableSection = document.querySelector('.table-section');
    if (!tableSection) return;

    const filtersDiv = document.createElement('div');
    filtersDiv.className = 'table-filters';
    filtersDiv.innerHTML = `
      <div class="filters-bar">
        <div class="filter-search">
          <span class="filter-search-icon">🔍</span>
          <input type="text" id="elementSearch" placeholder="Buscar elemento..." autocomplete="off">
        </div>

        <div class="filter-divider"></div>

        <span class="filter-label">Categoría</span>
        <div class="filter-group" id="filterCategory">
          ${CATEGORIES.map(c => `<button class="filter-btn" data-cat="${c.key}">${c.label}</button>`).join('')}
        </div>

        <div class="filter-divider"></div>

        <span class="filter-label">Estado</span>
        <div class="filter-group" id="filterState">
          ${STATES.map(s => `<button class="filter-btn" data-state="${s}">${s}</button>`).join('')}
        </div>

        <div class="filter-divider"></div>

        <span class="filter-label">Bloque</span>
        <div class="filter-group" id="filterBlock">
          ${BLOCKS.map(b => `<button class="filter-btn" data-block="${b}">Bloque ${b}</button>`).join('')}
        </div>

        <button class="filter-clear" id="filterClear">✕ Limpiar</button>
      </div>
      <div class="filter-results" id="filterResults"></div>
    `;

    tableSection.parentNode.insertBefore(filtersDiv, tableSection);

    // Event listeners
    document.getElementById('elementSearch').addEventListener('input', (e) => {
      activeFilters.search = e.target.value.toLowerCase().trim();
      applyFilters();
    });

    document.getElementById('filterCategory').addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      const cat = btn.dataset.cat;
      if (activeFilters.category === cat) {
        activeFilters.category = null;
        btn.classList.remove('active');
      } else {
        document.querySelectorAll('#filterCategory .filter-btn').forEach(b => b.classList.remove('active'));
        activeFilters.category = cat;
        btn.classList.add('active');
      }
      applyFilters();
    });

    document.getElementById('filterState').addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      const st = btn.dataset.state;
      if (activeFilters.state === st) {
        activeFilters.state = null;
        btn.classList.remove('active');
      } else {
        document.querySelectorAll('#filterState .filter-btn').forEach(b => b.classList.remove('active'));
        activeFilters.state = st;
        btn.classList.add('active');
      }
      applyFilters();
    });

    document.getElementById('filterBlock').addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      const bl = btn.dataset.block;
      if (activeFilters.block === bl) {
        activeFilters.block = null;
        btn.classList.remove('active');
      } else {
        document.querySelectorAll('#filterBlock .filter-btn').forEach(b => b.classList.remove('active'));
        activeFilters.block = bl;
        btn.classList.add('active');
      }
      applyFilters();
    });

    document.getElementById('filterClear').addEventListener('click', clearFilters);

    // Connect legend items to category filter
    initLegendFilter();
  }

  /* ── Legend click → filter by category ── */
  function initLegendFilter() {
    const LEGEND_MAP = {
      'No metales': 'nonmetal',
      'Metales alcalinos': 'alkali',
      'Alcalinotérreos': 'alkaline',
      'Metales de transición': 'transition',
      'Metaloides': 'metalloid',
      'Halógenos': 'halogen',
      'Gases nobles': 'noble',
      'Otros metales': 'postmetal',
      'Lantánidos': 'lanthanide',
      'Actínidos': 'actinide'
    };

    const legendItems = document.querySelectorAll('.table-legend .legend-item');
    legendItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.style.transition = 'all .25s';
      item.style.padding = '4px 8px';
      item.style.borderRadius = '6px';

      item.addEventListener('click', () => {
        const label = item.textContent.trim();
        const catKey = LEGEND_MAP[label];
        if (!catKey) return;

        // Toggle: if same category clicked, deactivate
        if (activeFilters.category === catKey) {
          activeFilters.category = null;
          legendItems.forEach(li => { li.style.opacity = '1'; li.style.background = ''; });
          // Also sync filter bar buttons
          document.querySelectorAll('#filterCategory .filter-btn').forEach(b => b.classList.remove('active'));
        } else {
          activeFilters.category = catKey;
          // Dim other legend items, highlight active
          legendItems.forEach(li => {
            const liKey = LEGEND_MAP[li.textContent.trim()];
            if (liKey === catKey) {
              li.style.opacity = '1';
              li.style.background = 'rgba(255,255,255,.06)';
            } else {
              li.style.opacity = '0.3';
              li.style.background = '';
            }
          });
          // Sync filter bar buttons
          document.querySelectorAll('#filterCategory .filter-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.cat === catKey);
          });
        }
        applyFilters();
      });
    });
  }

  function clearFilters() {
    activeFilters = { category: null, state: null, block: null, search: '' };
    document.getElementById('elementSearch').value = '';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    // Reset legend items
    document.querySelectorAll('.table-legend .legend-item').forEach(li => {
      li.style.opacity = '1';
      li.style.background = '';
    });
    applyFilters();
  }

  function applyFilters() {
    const cells = document.querySelectorAll('.periodic-grid .element-cell');
    const hasFilter = activeFilters.category || activeFilters.state || activeFilters.block || activeFilters.search;
    let visibleCount = 0;
    let totalElements = 0;

    cells.forEach(cell => {
      if (cell.classList.contains('empty') || cell.classList.contains('spacer')) return;

      const z = parseInt(cell.querySelector('.el-z')?.textContent);
      if (!z) return;
      totalElements++;

      const el = window.E ? window.E.find(e => e[0] === z) : null;
      const data = window.ELEMENT_DATA ? window.ELEMENT_DATA[z] : null;
      if (!el) return;

      let match = true;

      // Category filter
      if (activeFilters.category && el[4] !== activeFilters.category) match = false;

      // State filter
      if (activeFilters.state && data && data.state !== activeFilters.state) match = false;

      // Block filter
      if (activeFilters.block && data && data.block !== activeFilters.block) match = false;

      // Search filter
      if (activeFilters.search) {
        const q = activeFilters.search;
        const matchSearch = 
          el[1].toLowerCase().includes(q) ||   // symbol
          el[2].toLowerCase().includes(q) ||   // name
          String(el[0]).includes(q);            // atomic number
        if (!matchSearch) match = false;
      }

      if (!hasFilter) {
        cell.classList.remove('dimmed', 'highlighted');
      } else if (match) {
        cell.classList.remove('dimmed');
        cell.classList.add('highlighted');
        visibleCount++;
      } else {
        cell.classList.add('dimmed');
        cell.classList.remove('highlighted');
      }
    });

    // Update results text
    const resultsEl = document.getElementById('filterResults');
    if (hasFilter) {
      resultsEl.textContent = `${visibleCount} de ${totalElements} elementos`;
    } else {
      resultsEl.textContent = '';
    }
  }

  /* Init */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();