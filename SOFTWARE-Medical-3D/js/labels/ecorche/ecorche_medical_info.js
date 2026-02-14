/**
 * ═══════════════════════════════════════════════════
 *  ÉCORCHÉ MEDICAL INFO — Orquestador UI
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *
 *  Panel expandible con información médica extendida.
 *  Consume datos de window.__ECORCHE_DATA registrados
 *  por los módulos independientes:
 *    - ecorche_patologias.js
 *    - ecorche_nutricion.js
 *    - ecorche_habitos.js
 *    - ecorche_anatomia.js
 *    - ecorche_fisiologia.js
 *    - ecorche_clinicos.js
 *
 *  Requiere: window.__ECORCHE3D
 * ═══════════════════════════════════════════════════
 */

/* ──────────────────────────────────────────────────
   WAIT FOR ENGINE + DATA
   ────────────────────────────────────────────────── */
function waitForReady(maxWait = 12000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            const engineOK = window.__ECORCHE3D &&
                             window.__ECORCHE3D.scene &&
                             window.__ECORCHE3D.camera;
            const dataOK = window.__ECORCHE_DATA &&
                           window.__ECORCHE_DATA.patologias &&
                           window.__ECORCHE_DATA.nutricion &&
                           window.__ECORCHE_DATA.habitos &&
                           window.__ECORCHE_DATA.anatomia &&
                           window.__ECORCHE_DATA.fisiologia &&
                           window.__ECORCHE_DATA.clinicos;
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
    { key: 'habitos',     icon: '🧿', label: 'Hábitos' },
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
    background: rgba(168,85,247,0.18) !important;
    border-color: #a78bfa !important;
    color: #a78bfa !important;
}
.emed-panel {
    position: fixed;
    top: 66px;
    left: 310px;
    width: 340px;
    max-height: calc(100vh - 100px);
    background: rgba(13,10,10,0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    z-index: 55;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateX(-20px);
    opacity: 0;
    visibility: hidden;
    transition: transform 0.4s cubic-bezier(.16,1,.3,1),
                opacity 0.4s ease,
                visibility 0.4s;
}
.emed-panel.vis {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
}
.emed-header {
    padding: 14px 16px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
}
.emed-header-title {
    font-size: 0.6rem;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #c45850;
    margin-bottom: 10px;
}
.emed-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}
.emed-tab {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 9px;
    border-radius: 6px;
    border: 1px solid transparent;
    background: rgba(255,255,255,0.03);
    color: #9a8e8a;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    white-space: nowrap;
}
.emed-tab:hover {
    background: rgba(255,255,255,0.06);
    color: #e8e0dc;
}
.emed-tab.active {
    border-color: var(--tab-color);
    background: var(--tab-bg);
    color: var(--tab-color);
}
.emed-tab-icon { font-size: 0.7rem; }
.emed-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px 12px 14px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.emed-content::-webkit-scrollbar { width: 4px; }
.emed-content::-webkit-scrollbar-track { background: transparent; }
.emed-content::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
}
.emed-item {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    margin-bottom: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}
.emed-item:hover {
    border-color: rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
}
.emed-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    cursor: pointer;
    gap: 8px;
}
.emed-item-name {
    font-size: 0.78rem;
    font-weight: 600;
    color: #e8e0dc;
    flex: 1;
}
.emed-item-region {
    font-size: 0.6rem;
    font-family: 'Space Mono', monospace;
    color: #685854;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 130px;
}
.emed-item-arrow {
    font-size: 0.6rem;
    color: #685854;
    transition: transform 0.3s ease;
    flex-shrink: 0;
}
.emed-item.open .emed-item-arrow {
    transform: rotate(180deg);
}
.emed-item-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(.16,1,.3,1),
                padding 0.3s ease;
    padding: 0 12px;
}
.emed-item.open .emed-item-body {
    max-height: 350px;
    padding: 0 12px 12px;
}
.emed-item-desc {
    font-size: 0.72rem;
    line-height: 1.55;
    color: #9a8e8a;
    margin-bottom: 10px;
}
.emed-item-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}
.emed-stat {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 7px;
    padding: 6px 8px;
}
.emed-stat-label {
    font-size: 0.55rem;
    color: #685854;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}
.emed-stat-val {
    font-size: 0.75rem;
    font-weight: 600;
    color: #e8e0dc;
    margin-top: 1px;
}
.emed-item-bar {
    width: 3px;
    border-radius: 3px;
    flex-shrink: 0;
    margin-right: 8px;
}
.emed-counter {
    font-size: 0.58rem;
    font-family: 'Space Mono', monospace;
    color: #685854;
    margin-top: 6px;
    padding: 6px 12px;
    border-top: 1px solid rgba(255,255,255,0.04);
    text-align: center;
    flex-shrink: 0;
}
@media (max-width: 1100px) {
    .emed-panel {
        left: 14px;
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

    const DATA = window.__ECORCHE_DATA;

    /* ── Botón en ctrl-bar ── */
    const ctrlBar = document.querySelector('.ctrl-bar');
    if (!ctrlBar) return;

    const divider = document.createElement('div');
    divider.className = 'cd';
    ctrlBar.appendChild(divider);

    const btn = document.createElement('button');
    btn.className = 'cb';
    btn.id = 'bEMed';
    btn.title = 'Info Médica Extendida';
    btn.textContent = '📖';
    ctrlBar.appendChild(btn);

    /* ── Panel ── */
    const panel = document.createElement('div');
    panel.className = 'emed-panel';
    panel.id = 'emedPanel';
    document.body.appendChild(panel);

    /* ── Header ── */
    const header = document.createElement('div');
    header.className = 'emed-header';

    const title = document.createElement('div');
    title.className = 'emed-header-title';
    title.textContent = '🫀 Información Médica Extendida — Écorché';
    header.appendChild(title);

    const tabs = document.createElement('div');
    tabs.className = 'emed-tabs';

    CATEGORIES.forEach((cat, i) => {
        const tab = document.createElement('button');
        tab.className = 'emed-tab' + (i === 0 ? ' active' : '');
        tab.dataset.key = cat.key;

        const catData = DATA[cat.key];
        tab.style.setProperty('--tab-color', catData.color);
        tab.style.setProperty('--tab-bg', catData.color + '18');

        tab.innerHTML = '<span class="emed-tab-icon">' + cat.icon + '</span>' + cat.label;
        tab.addEventListener('click', () => switchCategory(cat.key));
        tabs.appendChild(tab);
    });

    header.appendChild(tabs);
    panel.appendChild(header);

    /* ── Content ── */
    const content = document.createElement('div');
    content.className = 'emed-content';
    content.id = 'emedContent';
    panel.appendChild(content);

    /* ── Counter ── */
    const counter = document.createElement('div');
    counter.className = 'emed-counter';
    counter.id = 'emedCounter';
    panel.appendChild(counter);

    /* ── Switch Category ── */
    function switchCategory(key) {
        document.querySelectorAll('.emed-tab').forEach(t => {
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
            card.className = 'emed-item';

            card.innerHTML = '<div class="emed-item-head">'
                + '<div class="emed-item-bar" style="background:' + cat.color + ';"></div>'
                + '<div style="flex:1;min-width:0;">'
                + '<div class="emed-item-name">' + item.name + '</div>'
                + '<div class="emed-item-region">' + item.region + '</div>'
                + '</div>'
                + '<div class="emed-item-arrow">▼</div>'
                + '</div>'
                + '<div class="emed-item-body">'
                + '<div class="emed-item-desc">' + item.desc + '</div>'
                + '<div class="emed-item-stats">'
                + item.datos.map(function(d) {
                    return '<div class="emed-stat">'
                        + '<div class="emed-stat-label">' + d.l + '</div>'
                        + '<div class="emed-stat-val">' + d.v + '</div>'
                        + '</div>';
                }).join('')
                + '</div>'
                + '</div>';

            const head = card.querySelector('.emed-item-head');
            head.addEventListener('click', () => {
                const wasOpen = card.classList.contains('open');
                content.querySelectorAll('.emed-item.open').forEach(c => {
                    if (c !== card) c.classList.remove('open');
                });
                card.classList.toggle('open', !wasOpen);
            });

            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            card.style.transition = 'opacity 0.35s ease ' + (idx * 0.04) + 's, transform 0.35s ease ' + (idx * 0.04) + 's';
            content.appendChild(card);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            });
        });

        counter.textContent = total + ' elementos — ' + cat.title;
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
    console.log('✅ Écorché Medical Info: 6 categorías, ' + totalItems + ' elementos cargados');

}).catch(err => {
    console.warn('⚠️ Écorché Medical Info:', err);
});
