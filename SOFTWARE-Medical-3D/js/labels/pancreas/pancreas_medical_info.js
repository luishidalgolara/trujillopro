/**
 * ═══════════════════════════════════════════════════
 *  PÁNCREAS MEDICAL INFO — Orquestador UI
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *
 *  Panel expandible con información médica extendida.
 *  Consume datos de window.__PANCREAS_DATA registrados
 *  por los módulos independientes:
 *    - pancreas_patologias.js
 *    - pancreas_nutricion.js
 *    - pancreas_habitos.js
 *    - pancreas_anatomia.js
 *    - pancreas_fisiologia.js
 *    - pancreas_clinicos.js
 *
 *  Requiere: window.__PANCREAS3D
 * ═══════════════════════════════════════════════════
 */

/* ──────────────────────────────────────────────────
   WAIT FOR ENGINE + DATA
   ────────────────────────────────────────────────── */
function waitForReady(maxWait = 12000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            const engineOK = window.__PANCREAS3D &&
                             window.__PANCREAS3D.scene &&
                             window.__PANCREAS3D.camera;
            const dataOK = window.__PANCREAS_DATA &&
                           window.__PANCREAS_DATA.patologias &&
                           window.__PANCREAS_DATA.nutricion &&
                           window.__PANCREAS_DATA.habitos &&
                           window.__PANCREAS_DATA.anatomia &&
                           window.__PANCREAS_DATA.fisiologia &&
                           window.__PANCREAS_DATA.clinicos;
            if (engineOK && dataOK) return resolve();
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: engine o datos no disponibles');
            requestAnimationFrame(check);
        })();
    });
}

/* ──────────────────────────────────────────────────
   CATEGORÍAS
   ────────────────────────────────────────────────── */
const CATEGORIES = [
    { key: 'patologias',  icon: '🩺', label: 'Patologías' },
    { key: 'nutricion',   icon: '🥗', label: 'Nutrición' },
    { key: 'habitos',     icon: '🛡️', label: 'Prevención' },
    { key: 'anatomia',    icon: '🔬', label: 'Anatomía' },
    { key: 'fisiologia',  icon: '⚡', label: 'Fisiología' },
    { key: 'clinicos',    icon: '📊', label: 'Datos Clínicos' }
];

/* ──────────────────────────────────────────────────
   ESTILOS
   ────────────────────────────────────────────────── */
const styleEl = document.createElement('style');
styleEl.textContent = `
.cb.med-active {
    background: rgba(196,164,85,0.18) !important;
    border-color: #c4a455 !important;
    color: #c4a455 !important;
}
.pmed-panel {
    position: fixed;
    top: 66px;
    right: 310px;
    width: 350px;
    max-height: calc(100vh - 100px);
    background: rgba(12,16,28,0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    z-index: 55;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateX(20px);
    opacity: 0;
    visibility: hidden;
    transition: transform 0.4s cubic-bezier(.16,1,.3,1),
                opacity 0.4s ease,
                visibility 0.4s;
}
.pmed-panel.vis {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
}
.pmed-header {
    padding: 14px 16px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
}
.pmed-header-title {
    font-size: 0.6rem;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #c4a455;
    margin-bottom: 10px;
}
.pmed-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}
.pmed-tab {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 9px;
    border-radius: 6px;
    border: 1px solid transparent;
    background: rgba(255,255,255,0.03);
    color: #8a94a8;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;
}
.pmed-tab:hover {
    background: rgba(255,255,255,0.06);
    color: #e8ecf4;
}
.pmed-tab.active {
    border-color: var(--tab-color);
    background: var(--tab-bg);
    color: var(--tab-color);
}
.pmed-tab-icon { font-size: 0.7rem; }
.pmed-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px 12px 14px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.pmed-content::-webkit-scrollbar { width: 4px; }
.pmed-content::-webkit-scrollbar-track { background: transparent; }
.pmed-content::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
}
.pmed-item {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    margin-bottom: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}
.pmed-item:hover {
    border-color: rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
}
.pmed-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    cursor: pointer;
    gap: 8px;
}
.pmed-item-name {
    font-size: 0.78rem;
    font-weight: 600;
    color: #e8ecf4;
    flex: 1;
}
.pmed-item-region {
    font-size: 0.6rem;
    font-family: 'Space Mono', monospace;
    color: #555f73;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 140px;
}
.pmed-item-arrow {
    font-size: 0.6rem;
    color: #555f73;
    transition: transform 0.3s ease;
    flex-shrink: 0;
}
.pmed-item.open .pmed-item-arrow {
    transform: rotate(180deg);
}
.pmed-item-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(.16,1,.3,1),
                padding 0.3s ease;
    padding: 0 12px;
}
.pmed-item.open .pmed-item-body {
    max-height: 380px;
    padding: 0 12px 12px;
}
.pmed-item-desc {
    font-size: 0.72rem;
    line-height: 1.55;
    color: #8a94a8;
    margin-bottom: 10px;
}
.pmed-item-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}
.pmed-stat {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 7px;
    padding: 6px 8px;
}
.pmed-stat-label {
    font-size: 0.55rem;
    color: #555f73;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}
.pmed-stat-val {
    font-size: 0.75rem;
    font-weight: 600;
    color: #e8ecf4;
    margin-top: 1px;
}
.pmed-item-bar {
    width: 3px;
    border-radius: 3px;
    flex-shrink: 0;
    margin-right: 8px;
}
.pmed-counter {
    font-size: 0.58rem;
    font-family: 'Space Mono', monospace;
    color: #555f73;
    margin-top: 6px;
    padding: 6px 12px;
    border-top: 1px solid rgba(255,255,255,0.04);
    text-align: center;
    flex-shrink: 0;
}
@media (max-width: 1200px) {
    .pmed-panel {
        right: 14px;
        top: auto;
        bottom: 75px;
        width: calc(100vw - 28px);
        max-height: 55vh;
    }
}
`;
document.head.appendChild(styleEl);

/* ──────────────────────────────────────────────────
   INICIALIZACIÓN
   ────────────────────────────────────────────────── */
waitForReady().then(() => {

    const DATA = window.__PANCREAS_DATA;

    /* ── Botón en ctrl-bar ── */
    const ctrlBar = document.querySelector('.ctrl-bar');
    if (!ctrlBar) return;

    const divider = document.createElement('div');
    divider.className = 'cd';
    ctrlBar.appendChild(divider);

    const btn = document.createElement('button');
    btn.className = 'cb';
    btn.id = 'bPMed';
    btn.title = 'Info Médica Extendida';
    btn.textContent = '📖';
    ctrlBar.appendChild(btn);

    /* ── Panel ── */
    const panel = document.createElement('div');
    panel.className = 'pmed-panel';
    panel.id = 'pmedPanel';
    document.body.appendChild(panel);

    /* ── Header ── */
    const header = document.createElement('div');
    header.className = 'pmed-header';

    const title = document.createElement('div');
    title.className = 'pmed-header-title';
    title.textContent = '🧬 Información Médica Extendida';
    header.appendChild(title);

    const tabs = document.createElement('div');
    tabs.className = 'pmed-tabs';

    CATEGORIES.forEach((cat, i) => {
        const tab = document.createElement('button');
        tab.className = 'pmed-tab' + (i === 0 ? ' active' : '');
        tab.dataset.key = cat.key;

        const catData = DATA[cat.key];
        tab.style.setProperty('--tab-color', catData.color);
        tab.style.setProperty('--tab-bg', catData.color + '18');

        tab.innerHTML = `<span class="pmed-tab-icon">${cat.icon}</span>${cat.label}`;
        tab.addEventListener('click', () => switchCategory(cat.key));
        tabs.appendChild(tab);
    });

    header.appendChild(tabs);
    panel.appendChild(header);

    /* ── Content ── */
    const content = document.createElement('div');
    content.className = 'pmed-content';
    content.id = 'pmedContent';
    panel.appendChild(content);

    /* ── Counter ── */
    const counter = document.createElement('div');
    counter.className = 'pmed-counter';
    counter.id = 'pmedCounter';
    panel.appendChild(counter);

    /* ── Switch Category ── */
    function switchCategory(key) {
        document.querySelectorAll('.pmed-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.key === key);
        });
        renderItems(key);
    }

    /* ── Render Items ── */
    function renderItems(key) {
        const cat = DATA[key];
        if (!cat) return;

        content.innerHTML = '';
        const total = cat.items.length;

        cat.items.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'pmed-item';

            card.innerHTML = `
                <div class="pmed-item-head">
                    <div class="pmed-item-bar" style="background:${cat.color};"></div>
                    <div style="flex:1;min-width:0;">
                        <div class="pmed-item-name">${item.name}</div>
                        <div class="pmed-item-region">${item.region}</div>
                    </div>
                    <div class="pmed-item-arrow">▼</div>
                </div>
                <div class="pmed-item-body">
                    <div class="pmed-item-desc">${item.desc}</div>
                    <div class="pmed-item-stats">
                        ${item.datos.map(d =>
                            `<div class="pmed-stat">
                                <div class="pmed-stat-label">${d.l}</div>
                                <div class="pmed-stat-val">${d.v}</div>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;

            const head = card.querySelector('.pmed-item-head');
            head.addEventListener('click', () => {
                const wasOpen = card.classList.contains('open');
                content.querySelectorAll('.pmed-item.open').forEach(c => {
                    if (c !== card) c.classList.remove('open');
                });
                card.classList.toggle('open', !wasOpen);
            });

            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            card.style.transition = `opacity 0.35s ease ${idx * 0.04}s, transform 0.35s ease ${idx * 0.04}s`;
            content.appendChild(card);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            });
        });

        counter.textContent = `${total} elementos — ${cat.title}`;
    }

    /* ── Toggle ── */
    let panelVisible = false;
    btn.addEventListener('click', () => {
        panelVisible = !panelVisible;
        panel.classList.toggle('vis', panelVisible);
        btn.classList.toggle('med-active', panelVisible);
        if (panelVisible && content.children.length === 0) {
            renderItems('patologias');
        }
    });

    /* Render inicial */
    renderItems('patologias');

    const totalItems = CATEGORIES.reduce((s, c) => s + (DATA[c.key] ? DATA[c.key].items.length : 0), 0);
    console.log(`✅ Páncreas Medical Info: 6 categorías, ${totalItems} elementos cargados`);

}).catch(err => {
    console.warn('⚠️ Páncreas Medical Info:', err);
});
