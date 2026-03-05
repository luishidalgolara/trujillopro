/* ============================================
   HEATMAP — Mapa de calor por propiedad
   Cambia colores de la tabla periódica
   ============================================ */

(function() {
  'use strict';

  let currentProperty = null;

  const PROPERTIES = [
    { key: 'en', label: 'Electronegatividad', unit: '', min: 0.7, max: 4.0, colors: ['#1a1a4e','#5b8dee','#00e5a0','#f0a030','#ff4444'] },
    { key: 'radius', label: 'Radio Atómico', unit: 'pm', min: 30, max: 350, colors: ['#00e5a0','#5b8dee','#8866cc','#e056a0','#ff4444'] },
    { key: 'melt', label: 'Punto de Fusión', unit: '°C', min: -275, max: 3500, colors: ['#4488ff','#44cc88','#f0a030','#ff6644','#ff2222'] },
    { key: 'boil', label: 'Punto de Ebullición', unit: '°C', min: -275, max: 5600, colors: ['#4488ff','#44cc88','#f0a030','#ff6644','#ff2222'] }
  ];

  function init() {
    const tableContainer = document.querySelector('.table-container');
    if (!tableContainer) return;
    const legend = tableContainer.querySelector('.table-legend');
    if (!legend) return;

    // Create heatmap control bar
    const heatBar = document.createElement('div');
    heatBar.className = 'table-legend';
    heatBar.style.marginBottom = '12px';
    heatBar.style.gap = '8px';
    heatBar.innerHTML = `
      <span style="font-size:.75rem;color:rgba(255,255,255,.35);font-weight:600;letter-spacing:1px;text-transform:uppercase">MAPA DE CALOR</span>
      ${PROPERTIES.map(p => `
        <button class="filter-btn heatmap-btn" data-prop="${p.key}" style="font-size:.75rem">${p.label}</button>
      `).join('')}
      <button class="filter-btn heatmap-btn" data-prop="reset" style="font-size:.75rem;border-color:rgba(255,80,80,.15);color:rgba(255,80,80,.5)">✕ Normal</button>
      <div class="heatmap-gradient" id="heatmapGradient" style="display:none;margin-left:auto;height:16px;width:180px;border-radius:4px;position:relative"></div>
      <span class="heatmap-range" id="heatmapRange" style="display:none;font-size:.65rem;color:rgba(255,255,255,.35)"></span>
    `;

    legend.parentNode.insertBefore(heatBar, legend);

    // Events
    heatBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.heatmap-btn');
      if (!btn) return;
      const prop = btn.dataset.prop;

      if (prop === 'reset') {
        resetHeatmap();
        heatBar.querySelectorAll('.heatmap-btn').forEach(b => b.classList.remove('active'));
        return;
      }

      heatBar.querySelectorAll('.heatmap-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyHeatmap(prop);
    });
  }

  function applyHeatmap(propKey) {
    const prop = PROPERTIES.find(p => p.key === propKey);
    if (!prop) return;

    currentProperty = propKey;

    // Show gradient
    const gradientEl = document.getElementById('heatmapGradient');
    const rangeEl = document.getElementById('heatmapRange');
    gradientEl.style.display = 'block';
    rangeEl.style.display = 'block';
    gradientEl.style.background = `linear-gradient(to right, ${prop.colors.join(',')})`;
    rangeEl.textContent = `${prop.min}${prop.unit} → ${prop.max}${prop.unit}`;

    // Apply to cells
    const cells = document.querySelectorAll('.periodic-grid .element-cell');
    cells.forEach(cell => {
      if (cell.classList.contains('empty') || cell.classList.contains('spacer')) return;

      const z = parseInt(cell.querySelector('.el-z')?.textContent);
      if (!z) return;
      const data = window.ELEMENT_DATA ? window.ELEMENT_DATA[z] : null;
      if (!data) return;

      const val = data[propKey];
      if (val === null || val === undefined) {
        cell.style.background = 'rgba(255,255,255,.03)';
        cell.style.color = 'rgba(255,255,255,.2)';
        cell.querySelector('.el-sym').style.color = 'rgba(255,255,255,.2)';
        return;
      }

      // Normalize value 0-1
      const t = Math.max(0, Math.min(1, (val - prop.min) / (prop.max - prop.min)));
      const color = interpolateColors(prop.colors, t);

      cell.style.background = color;
      cell.style.color = '#fff';
      cell.querySelector('.el-sym').style.color = '#fff';

      // Store original for reset
      if (!cell._origBg) {
        cell._origBg = getComputedStyle(cell).background;
        cell._origColor = getComputedStyle(cell).color;
      }
    });
  }

  function resetHeatmap() {
    currentProperty = null;

    document.getElementById('heatmapGradient').style.display = 'none';
    document.getElementById('heatmapRange').style.display = 'none';

    const cells = document.querySelectorAll('.periodic-grid .element-cell');
    cells.forEach(cell => {
      if (cell.classList.contains('empty') || cell.classList.contains('spacer')) return;
      cell.style.background = '';
      cell.style.color = '';
      const sym = cell.querySelector('.el-sym');
      if (sym) sym.style.color = '';
    });
  }

  /* Color interpolation for gradient */
  function interpolateColors(colors, t) {
    const n = colors.length - 1;
    const i = Math.min(Math.floor(t * n), n - 1);
    const localT = (t * n) - i;
    return lerpColor(colors[i], colors[i + 1], localT);
  }

  function lerpColor(a, b, t) {
    const ar = parseInt(a.slice(1,3),16), ag = parseInt(a.slice(3,5),16), ab = parseInt(a.slice(5,7),16);
    const br = parseInt(b.slice(1,3),16), bg = parseInt(b.slice(3,5),16), bb = parseInt(b.slice(5,7),16);
    const r = Math.round(ar + (br-ar)*t);
    const g = Math.round(ag + (bg-ag)*t);
    const bl = Math.round(ab + (bb-ab)*t);
    return `rgb(${r},${g},${bl})`;
  }

  /* Init */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
