/**
 * ═══════════════════════════════════════════════════
 *  HEART MEDICAL INFO — Orquestador UI
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 *
 *  Consume datos de window.__HEART_DATA:
 *    - heart_patologias.js
 *    - heart_nutricion.js
 *    - heart_habitos.js
 *    - heart_anatomia.js
 *    - heart_fisiologia.js
 *    - heart_clinicos.js
 *
 *  Requiere: window.__HEART3D
 * ═══════════════════════════════════════════════════
 */

function waitForReady(maxWait = 12000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function check() {
            const engineOK = window.__HEART3D &&
                             window.__HEART3D.scene &&
                             window.__HEART3D.camera;
            const dataOK = window.__HEART_DATA &&
                           window.__HEART_DATA.patologias &&
                           window.__HEART_DATA.nutricion &&
                           window.__HEART_DATA.habitos &&
                           window.__HEART_DATA.anatomia &&
                           window.__HEART_DATA.fisiologia &&
                           window.__HEART_DATA.clinicos;
            if (engineOK && dataOK) return resolve();
            if (Date.now() - t0 > maxWait) return reject('⏱ Timeout: engine o datos no disponibles');
            requestAnimationFrame(check);
        })();
    });
}

const CATEGORIES = [
    { key: 'patologias',  icon: '🩺', label: 'Patologías' },
    { key: 'nutricion',   icon: '🥗', label: 'Nutrición' },
    { key: 'habitos',     icon: '💪', label: 'Hábitos' },
    { key: 'anatomia',    icon: '🔬', label: 'Anatomía' },
    { key: 'fisiologia',  icon: '⚡', label: 'Fisiología' },
    { key: 'clinicos',    icon: '📊', label: 'Datos Clínicos' }
];

const styleEl = document.createElement('style');
styleEl.textContent = `
.cb.med-active {
    background: rgba(168,85,247,0.18) !important;
    border-color: #a78bfa !important;
    color: #a78bfa !important;
}
.hmed-panel {
    position: fixed;
    top: 66px;
    left: 310px;
    width: 340px;
    max-height: calc(100vh - 100px);
    background: rgba(14,12,24,0.92);
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
.hmed-panel.vis {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
}
.hmed-header {
    padding: 14px 16px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
}
.hmed-header-title {
    font-size: 0.6rem;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #e05050;
    margin-bottom: 10px;
}
.hmed-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}
.hmed-tab {
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
.hmed-tab:hover {
    background: rgba(255,255,255,0.06);
    color: #e8ecf4;
}
.hmed-tab.active {
    border-color: var(--tab-color);
    background: var(--tab-bg);
    color: var(--tab-color);
}
.hmed-tab-icon { font-size: 0.7rem; }
.hmed-content {
    flex: 1;
    overflow-y: auto;
    padding: 10px 12px 14px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.hmed-content::-webkit-scrollbar { width: 4px; }
.hmed-content::-webkit-scrollbar-track { background: transparent; }
.hmed-content::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
}
.hmed-item {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    margin-bottom: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}
.hmed-item:hover {
    border-color: rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
}
.hmed-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    cursor: pointer;
    gap: 8px;
}
.hmed-item-name {
    font-size: 0.78rem;
    font-weight: 600;
    color: #e8ecf4;
    flex: 1;
}
.hmed-item-region {
    font-size: 0.6rem;
    font-family: 'Space Mono', monospace;
    color: #555f73;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 130px;
}
.hmed-item-arrow {
    font-size: 0.6rem;
    color: #555f73;
    transition: transform 0.3s ease;
    flex-shrink: 0;
}
.hmed-item.open .hmed-item-arrow {
    transform: rotate(180deg);
}
.hmed-item-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(.16,1,.3,1),
                padding 0.3s ease;
    padding: 0 12px;
}
.hmed-item.open .hmed-item-body {
    max-height: 350px;
    padding: 0 12px 12px;
}
.hmed-item-desc {
    font-size: 0.72rem;
    line-height: 1.55;
    color: #8a94a8;
    margin-bottom: 10px;
}
.hmed-item-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}
.hmed-stat {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 7px;
    padding: 6px 8px;
}
.hmed-stat-label {
    font-size: 0.55rem;
    color: #555f73;
    font-family: 'Space Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}
.hmed-stat-val {
    font-size: 0.75rem;
    font-weight: 600;
    color: #e8ecf4;
    margin-top: 1px;
}
.hmed-item-bar {
    width: 3px;
    border-radius: 3px;
    flex-shrink: 0;
    margin-right: 8px;
}
.hmed-counter {
    font-size: 0.58rem;
    font-family: 'Space Mono', monospace;
    color: #555f73;
    margin-top: 6px;
    padding: 6px 12px;
    border-top: 1px solid rgba(255,255,255,0.04);
    text-align: center;
    flex-shrink: 0;
}
@media (max-width: 1100px) {
    .hmed-panel {
        left: 14px;
        top: auto;
        bottom: 75px;
        width: calc(100vw - 28px);
        max-height: 55vh;
    }
}
`;
document.head.appendChild(styleEl);

waitForReady().then(() => {

    const DATA = window.__HEART_DATA;

    const ctrlBar = document.querySelector('.ctrl-bar');
    if (!ctrlBar) return;

    const divider = document.createElement('div');
    divider.className = 'cd';
    ctrlBar.appendChild(divider);

    const btn = document.createElement('button');
    btn.className = 'cb';
    btn.id = 'bHMed';
    btn.title = 'Info Médica Extendida';
    btn.textContent = '📖';
    ctrlBar.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = 'hmed-panel';
    panel.id = 'hmedPanel';
    document.body.appendChild(panel);

    const header = document.createElement('div');
    header.className = 'hmed-header';

    const title = document.createElement('div');
    title.className = 'hmed-header-title';
    title.textContent = '🫀 Información Médica Extendida';
    header.appendChild(title);

    const tabs = document.createElement('div');
    tabs.className = 'hmed-tabs';

    CATEGORIES.forEach((cat, i) => {
        const tab = document.createElement('button');
        tab.className = 'hmed-tab' + (i === 0 ? ' active' : '');
        tab.dataset.key = cat.key;
        const catData = DATA[cat.key];
        tab.style.setProperty('--tab-color', catData.color);
        tab.style.setProperty('--tab-bg', catData.color + '18');
        tab.innerHTML = `<span class="hmed-tab-icon">${cat.icon}</span>${cat.label}`;
        tab.addEventListener('click', () => switchCategory(cat.key));
        tabs.appendChild(tab);
    });

    header.appendChild(tabs);
    panel.appendChild(header);

    const content = document.createElement('div');
    content.className = 'hmed-content';
    content.id = 'hmedContent';
    panel.appendChild(content);

    const counter = document.createElement('div');
    counter.className = 'hmed-counter';
    counter.id = 'hmedCounter';
    panel.appendChild(counter);

    function switchCategory(key) {
        document.querySelectorAll('.hmed-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.key === key);
        });
        renderItems(key);
    }

    function renderItems(key) {
        const cat = DATA[key];
        if (!cat) return;
        content.innerHTML = '';
        const total = cat.items.length;

        cat.items.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'hmed-item';
            card.innerHTML = `
                <div class="hmed-item-head">
                    <div class="hmed-item-bar" style="background:${cat.color};"></div>
                    <div style="flex:1;min-width:0;">
                        <div class="hmed-item-name">${item.name}</div>
                        <div class="hmed-item-region">${item.region}</div>
                    </div>
                    <div class="hmed-item-arrow">▼</div>
                </div>
                <div class="hmed-item-body">
                    <div class="hmed-item-desc">${item.desc}</div>
                    <div class="hmed-item-stats">
                        ${item.datos.map(d =>
                            `<div class="hmed-stat">
                                <div class="hmed-stat-label">${d.l}</div>
                                <div class="hmed-stat-val">${d.v}</div>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;
            const head = card.querySelector('.hmed-item-head');
            head.addEventListener('click', () => {
                const wasOpen = card.classList.contains('open');
                content.querySelectorAll('.hmed-item.open').forEach(c => {
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

    let panelVisible = false;
    btn.addEventListener('click', () => {
        panelVisible = !panelVisible;
        panel.classList.toggle('vis', panelVisible);
        btn.classList.toggle('med-active', panelVisible);
        if (panelVisible && content.children.length === 0) {
            renderItems('patologias');
        }
    });

    renderItems('patologias');

    const totalItems = CATEGORIES.reduce((s, c) => s + (DATA[c.key] ? DATA[c.key].items.length : 0), 0);
    console.log(`✅ Heart Medical Info: 6 categorías, ${totalItems} elementos cargados`);

}).catch(err => {
    console.warn('⚠️ Heart Medical Info:', err);
});
