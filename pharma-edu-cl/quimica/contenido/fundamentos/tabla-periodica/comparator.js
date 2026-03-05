/* ============================================
   COMPARATOR — Comparador de Elementos
   Seleccionar 2-3 elementos y comparar
   ============================================ */

(function() {
  'use strict';

  let selectedElements = [];
  const MAX_COMPARE = 3;

  const CAT_NAMES = {
    nonmetal:'No metal', alkali:'Metal alcalino', alkaline:'Alcalinotérreo',
    transition:'Metal de transición', metalloid:'Metaloide', halogen:'Halógeno',
    noble:'Gas noble', postmetal:'Otro metal', lanthanide:'Lantánido', actinide:'Actínido'
  };

  function init() {
    // Create comparator panel (hidden initially)
    const panel = document.createElement('div');
    panel.id = 'comparatorPanel';
    panel.style.cssText = `
      position:fixed; bottom:-200px; left:50%; transform:translateX(-50%);
      width:auto; max-width:94vw;
      background:#0d1220; border:1px solid rgba(0,229,160,.2);
      border-radius:16px 16px 0 0; padding:14px 20px;
      z-index:900; transition:bottom .35s cubic-bezier(.4,0,.2,1);
      display:flex; align-items:center; gap:12px;
      box-shadow:0 -10px 40px rgba(0,0,0,.5);
      font-family:'Outfit',sans-serif;
    `;
    panel.innerHTML = `
      <span style="font-size:.78rem;color:rgba(255,255,255,.4)">Comparar:</span>
      <div id="compSlots" style="display:flex;gap:8px"></div>
      <button id="compGo" style="
        padding:7px 18px;background:rgba(0,229,160,.1);border:1px solid rgba(0,229,160,.3);
        border-radius:8px;color:#00e5a0;font-size:.82rem;font-weight:600;cursor:pointer;
        font-family:'Outfit',sans-serif;transition:all .25s;display:none;
      ">Comparar →</button>
      <button id="compClear" style="
        padding:7px 12px;background:rgba(255,80,80,.06);border:1px solid rgba(255,80,80,.12);
        border-radius:8px;color:rgba(255,80,80,.5);font-size:.78rem;cursor:pointer;
        font-family:'Outfit',sans-serif;transition:all .25s;
      ">✕</button>
    `;
    document.body.appendChild(panel);

    // Comparison modal
    const modal = document.createElement('div');
    modal.id = 'compModal';
    modal.style.cssText = `
      position:fixed; inset:0; z-index:2500; display:none;
      align-items:center; justify-content:center;
      background:rgba(0,0,0,.7);
    `;
    modal.innerHTML = `
      <div id="compModalContent" style="
        background:#0a0e1a; border:1px solid rgba(0,229,160,.15);
        border-radius:20px; padding:32px; max-width:800px; width:94vw;
        max-height:85vh; overflow-y:auto;
        box-shadow:0 30px 80px rgba(0,0,0,.6);
      ">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <h3 style="font-size:1.2rem;font-weight:700;color:#e0e0e0;margin:0">
            Comparación de Elementos
          </h3>
          <button id="compModalClose" style="
            background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);
            color:rgba(255,255,255,.5);width:32px;height:32px;border-radius:8px;
            cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;
          ">✕</button>
        </div>
        <div id="compTable"></div>
      </div>
    `;
    document.body.appendChild(modal);

    // Events
    document.getElementById('compClear').addEventListener('click', clearSelection);
    document.getElementById('compGo').addEventListener('click', showComparison);
    document.getElementById('compModalClose').addEventListener('click', () => {
      document.getElementById('compModal').style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });

    // Listen for double-click on element cells
    document.addEventListener('dblclick', (e) => {
      const cell = e.target.closest('.element-cell');
      if (!cell || cell.classList.contains('empty') || cell.classList.contains('spacer')) return;

      const z = parseInt(cell.querySelector('.el-z')?.textContent);
      if (!z) return;

      e.preventDefault();
      e.stopPropagation();
      toggleElement(z, cell);
    });
  }

  function toggleElement(z, cell) {
    const idx = selectedElements.findIndex(e => e.z === z);

    if (idx !== -1) {
      // Deselect
      selectedElements.splice(idx, 1);
      cell.style.outline = '';
    } else {
      if (selectedElements.length >= MAX_COMPARE) return; // max reached
      const el = window.E ? window.E.find(e => e[0] === z) : null;
      if (!el) return;
      selectedElements.push({ z, symbol: el[1], name: el[2], el });
      cell.style.outline = '2px solid #00e5a0';
    }

    updatePanel();
  }

  function updatePanel() {
    const panel = document.getElementById('comparatorPanel');
    const slots = document.getElementById('compSlots');
    const goBtn = document.getElementById('compGo');

    if (selectedElements.length === 0) {
      panel.style.bottom = '-200px';
      return;
    }

    panel.style.bottom = '0';
    slots.innerHTML = selectedElements.map(e => `
      <div style="
        padding:5px 12px;background:rgba(0,229,160,.08);
        border:1px solid rgba(0,229,160,.2);border-radius:8px;
        display:flex;align-items:center;gap:6px;
      ">
        <span style="font-weight:700;color:#00e5a0;font-size:.95rem">${e.symbol}</span>
        <span style="font-size:.75rem;color:rgba(255,255,255,.5)">${e.name}</span>
      </div>
    `).join('');

    goBtn.style.display = selectedElements.length >= 2 ? 'block' : 'none';
  }

  function clearSelection() {
    selectedElements = [];
    document.querySelectorAll('.element-cell').forEach(c => c.style.outline = '');
    updatePanel();
  }

  function showComparison() {
    const tableDiv = document.getElementById('compTable');
    const data = window.ELEMENT_DATA;

    const rows = [
      { label: 'Símbolo', get: (el,d) => `<span style="font-size:1.8rem;font-weight:800;color:#00e5a0">${el[1]}</span>` },
      { label: 'Nombre', get: (el,d) => el[2] },
      { label: 'N° Atómico', get: (el,d) => el[0] },
      { label: 'Masa Atómica', get: (el,d) => el[3] + ' u' },
      { label: 'Categoría', get: (el,d) => CAT_NAMES[el[4]] || el[4] },
      { label: 'Config. Electrónica', get: (el,d) => `<code style="font-family:'JetBrains Mono',monospace;font-size:.8rem">${el[7]}</code>` },
      { label: 'Electronegatividad', get: (el,d) => d && d.en !== null ? d.en.toFixed(2) : '—' },
      { label: 'Radio Atómico', get: (el,d) => d && d.radius ? d.radius + ' pm' : '—' },
      { label: 'Estado (T° amb.)', get: (el,d) => d ? d.state : '—' },
      { label: 'Punto de Fusión', get: (el,d) => d && d.melt !== null ? d.melt + ' °C' : '—' },
      { label: 'Punto de Ebullición', get: (el,d) => d && d.boil !== null ? d.boil + ' °C' : '—' },
      { label: 'Bloque', get: (el,d) => d ? d.block.toUpperCase() : '—' },
      { label: 'Capas Electrónicas', get: (el,d) => d ? d.shells.join(' · ') : '—' },
      { label: 'Uso Farmacéutico', get: (el,d) => `<span style="font-size:.8rem;line-height:1.5">${el[8]}</span>` }
    ];

    const cellStyle = `padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.04);font-size:.85rem;color:#ccc;vertical-align:top`;
    const headerStyle = `padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.04);font-size:.78rem;color:rgba(255,255,255,.3);white-space:nowrap;vertical-align:top`;

    let html = `<table style="width:100%;border-collapse:collapse">`;

    rows.forEach(row => {
      html += `<tr>`;
      html += `<td style="${headerStyle}">${row.label}</td>`;
      selectedElements.forEach(se => {
        const d = data ? data[se.z] : null;
        html += `<td style="${cellStyle}">${row.get(se.el, d)}</td>`;
      });
      html += `</tr>`;
    });

    html += `</table>`;
    tableDiv.innerHTML = html;

    document.getElementById('compModal').style.display = 'flex';
  }

  /* Init */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
