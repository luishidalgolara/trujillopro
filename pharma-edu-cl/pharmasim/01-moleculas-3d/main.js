/**
 * PHARMASIM — main.js
 * Controlador principal del Laboratorio Molecular 3D
 */

// ═══════════════════════════════════════════════════════════════
//  APP STATE
// ═══════════════════════════════════════════════════════════════
const STATE = {
    currentMol: null,
    compareMol: null,
    activeMod: null,
    activeCategory: 'all',
    currentPTab: 'properties',
};

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    // Show loading
    document.getElementById('viewerLoading').classList.remove('hidden');

    // Init 3D renderer
    window.renderer3D = new MoleculeRenderer('molCanvas');

    // Populate molecule list
    renderMoleculeList(window.PHARMA_DB);

    // Load first molecule
    setTimeout(() => {
        selectMolecule(window.PHARMA_DB[0]);
        document.getElementById('viewerLoading').classList.add('hidden');
    }, 800);

    // Event listeners
    setupEvents();

    // Show tutorial on first visit
    if (!localStorage.getItem('pharmasim_tutorial_done')) {
        setTimeout(() => startTutorial(), 1200);
    }
});

// ═══════════════════════════════════════════════════════════════
//  MOLECULE LIST
// ═══════════════════════════════════════════════════════════════
function renderMoleculeList(mols) {
    const list = document.getElementById('moleculeList');
    const query = document.getElementById('searchInput').value.toLowerCase();

    list.innerHTML = '';

    const filtered = mols.filter(m => {
        const matchCat = STATE.activeCategory === 'all' || m.category === STATE.activeCategory;
        const matchSearch = !query || m.name.toLowerCase().includes(query) ||
            m.formula.toLowerCase().includes(query) ||
            m.categoryLabel.toLowerCase().includes(query);
        return matchCat && matchSearch;
    });

    document.getElementById('molCount').textContent = filtered.length + ' moléculas';

    if (filtered.length === 0) {
        list.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">
            Sin resultados para "${query}"
        </div>`;
        return;
    }

    filtered.forEach(mol => {
        const card = document.createElement('div');
        card.className = 'mol-card' + (STATE.currentMol && STATE.currentMol.id === mol.id ? ' active' : '');
        card.innerHTML = `
            <div class="mol-card-name">${mol.name}</div>
            <div class="mol-card-formula">${mol.formula}</div>
            <div class="mol-card-tags">
                <span class="mol-tag ${mol.category}">${mol.categoryLabel}</span>
            </div>
        `;
        card.addEventListener('click', () => selectMolecule(mol));
        list.appendChild(card);
    });
}

// ═══════════════════════════════════════════════════════════════
//  SELECT MOLECULE
// ═══════════════════════════════════════════════════════════════
function selectMolecule(mol) {
    STATE.currentMol = mol;
    STATE.activeMod = null;

    // Loading
    document.getElementById('viewerLoading').classList.remove('hidden');

    // Update name display
    document.getElementById('molNameDisplay').textContent = `${mol.name} (${mol.formula})`;

    // Render 3D
    setTimeout(() => {
        window.renderer3D.loadMolecule(mol);
        document.getElementById('viewerLoading').classList.add('hidden');
    }, 300);

    // Update UI
    renderMoleculeList(window.PHARMA_DB);
    updatePropertiesPanel(mol);
    updatePharmacologyPanel(mol);
    updateModificationBar(mol);
    updateComparePanel();

    // Reset active mod buttons
    document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));

    showToast('🧬 ' + mol.name + ' cargada', 'info');
}

// ═══════════════════════════════════════════════════════════════
//  MODIFICATION
// ═══════════════════════════════════════════════════════════════
function applyModification(mod, btnEl) {
    if (STATE.activeMod === mod) {
        // Toggle off
        STATE.activeMod = null;
        document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
        window.renderer3D.resetHighlight();
        updatePropertiesPanel(STATE.currentMol);
        updatePharmacologyPanel(STATE.currentMol);
        return;
    }

    STATE.activeMod = mod;
    document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    // Highlight modified atoms in 3D
    window.renderer3D.highlightModification();

    // Create merged mol data for display
    const modMol = createModifiedMol(STATE.currentMol, mod);
    updatePropertiesPanel(modMol, STATE.currentMol);
    updatePharmacologyPanel(STATE.currentMol, mod);

    showToast('⚗️ Modificación aplicada: ' + mod.label, 'warn');
}

function createModifiedMol(original, mod) {
    const clone = JSON.parse(JSON.stringify(original));
    if (mod.changes) {
        Object.assign(clone, mod.changes);
    }
    return clone;
}

function resetModification() {
    STATE.activeMod = null;
    document.querySelectorAll('.mod-btn').forEach(b => b.classList.remove('active'));
    window.renderer3D.resetHighlight();
    updatePropertiesPanel(STATE.currentMol);
    updatePharmacologyPanel(STATE.currentMol);
    showToast('↺ Molécula restaurada', 'info');
}

// ═══════════════════════════════════════════════════════════════
//  PROPERTIES PANEL
// ═══════════════════════════════════════════════════════════════
function updatePropertiesPanel(mol, originalMol = null) {
    // Physical-chemical properties
    const props = [
        ['pMW',   mol.mw.toFixed(2),          originalMol ? originalMol.mw.toFixed(2) : null],
        ['pLogP', mol.logP.toFixed(2),         originalMol ? originalMol.logP.toFixed(2) : null],
        ['pPka',  mol.pka.toFixed(2),          originalMol ? originalMol.pka.toFixed(2) : null],
        ['pSol',  mol.solubility.toFixed(3),   originalMol ? originalMol.solubility.toFixed(3) : null],
        ['pTPSA', mol.tpsa.toFixed(1),         originalMol ? originalMol.tpsa.toFixed(1) : null],
        ['pHBD',  mol.hbd,                     originalMol ? originalMol.hbd : null],
        ['pHBA',  mol.hba,                     originalMol ? originalMol.hba : null],
        ['pRB',   mol.rb,                      originalMol ? originalMol.rb : null],
    ];

    props.forEach(([id, val, oldVal]) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = val;
        if (oldVal !== null && val !== oldVal) {
            el.classList.remove('updated');
            void el.offsetWidth;
            el.classList.add('updated');
        }
    });

    // LogP bar
    const logPBar = document.getElementById('barLogP');
    const logPLbl = document.getElementById('lblLogP');
    if (logPBar) {
        const pct = Math.max(0, Math.min(100, (mol.logP + 2) / 7 * 100));
        logPBar.style.width = pct + '%';
        logPBar.style.background =
            mol.logP < 0 ? 'var(--accent)' :
            mol.logP < 2 ? 'var(--accent3)' :
            mol.logP < 5 ? 'var(--accent-warn)' : 'var(--accent-danger)';
        if (logPLbl) logPLbl.textContent =
            mol.logP < 0 ? 'Hidrofílico' :
            mol.logP < 2 ? 'Moderado' :
            mol.logP < 5 ? 'Lipofílico' : 'Muy lipofílico';
    }

    // Lipinski
    const grid = document.getElementById('lipinskiGrid');
    const verdict = document.getElementById('lipinskiVerdict');
    if (grid) {
        const rules = window.checkLipinski(mol);
        const passes = rules.filter(r => r.pass).length;
        grid.innerHTML = rules.map(r => `
            <div class="lipinski-item ${r.pass ? 'pass' : 'fail'}">
                <span class="lip-icon">${r.pass ? '✓' : '✗'}</span>
                <div class="lip-text">
                    <div style="font-weight:600">${r.rule}</div>
                    <div style="opacity:.7">${r.val}${r.unit}</div>
                </div>
            </div>
        `).join('');
        if (verdict) {
            verdict.className = 'lipinski-verdict ' + (passes >= 3 ? 'ok' : 'fail');
            verdict.textContent = passes >= 3
                ? `✓ Cumple Ro5 (${passes}/4 reglas) — Buena absorción oral probable`
                : `✗ Viola Ro5 (${passes}/4 reglas) — Posibles problemas de absorción oral`;
        }
    }

    // Radar chart
    drawRadarChart(mol);
}

// ═══════════════════════════════════════════════════════════════
//  RADAR CHART
// ═══════════════════════════════════════════════════════════════
function drawRadarChart(mol) {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2 + 8;
    const R = Math.min(W, H) * 0.36;

    ctx.clearRect(0, 0, W, H);

    const vals = window.getRadarValues(mol);
    const labels = Object.keys(vals);
    const data   = Object.values(vals);
    const n      = labels.length;

    const pt = (i, r) => ({
        x: cx + r * Math.cos((i * 2 * Math.PI / n) - Math.PI / 2),
        y: cy + r * Math.sin((i * 2 * Math.PI / n) - Math.PI / 2)
    });

    // Grid rings
    [0.25, 0.5, 0.75, 1].forEach(f => {
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const p = pt(i % n, R * f);
            i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.strokeStyle = f === 1 ? 'rgba(99,179,237,0.2)' : 'rgba(99,179,237,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
    });

    // Spokes
    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        const p = pt(i, R);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = 'rgba(99,179,237,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Data fill
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
        const v = data[i % n];
        const p = pt(i % n, R * v);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(0,212,255,0.35)');
    grad.addColorStop(1, 'rgba(0,212,255,0.05)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,212,255,0.8)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Data points
    for (let i = 0; i < n; i++) {
        const p = pt(i, R * data[i]);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,255,0.95)';
        ctx.fill();
        ctx.strokeStyle = '#050810';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Labels
    ctx.font = '600 10px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < n; i++) {
        const p = pt(i, R * 1.22);
        ctx.fillStyle = 'rgba(138,180,212,0.9)';
        ctx.fillText(labels[i], p.x, p.y);
    }
}

// ═══════════════════════════════════════════════════════════════
//  PHARMACOLOGY PANEL
// ═══════════════════════════════════════════════════════════════
function updatePharmacologyPanel(mol, activeMod = null) {
    // Hero
    const hero = document.getElementById('pharmaHero');
    if (hero) {
        hero.innerHTML = `
            <div class="pharma-name">${mol.name}</div>
            <div class="pharma-iupac">${mol.iupac}</div>
            <span class="pharma-class">${mol.categoryLabel}</span>
        `;
    }

    // ADME bars
    const adme = document.getElementById('admeBars');
    if (adme) {
        const admeKeys = [
            { key: 'absorcion',       label: 'Absorción',       color: 'var(--accent)' },
            { key: 'distribucion',    label: 'Distribución',    color: 'var(--accent3)' },
            { key: 'metabolismo',     label: 'Metabolismo',     color: 'var(--accent-warn)' },
            { key: 'excrecion',       label: 'Excreción',       color: 'var(--accent2)' },
            { key: 'biodisponibilidad', label: 'Biodisponibilidad', color: '#f472b6' }
        ];
        adme.innerHTML = admeKeys.map(a => `
            <div class="adme-row">
                <span class="adme-label">${a.label}</span>
                <div class="adme-bar-wrap">
                    <div class="adme-bar-fill" style="width:${mol.adme[a.key]}%;background:${a.color}"></div>
                </div>
                <span class="adme-val">${mol.adme[a.key]}%</span>
            </div>
        `).join('');
    }

    // Mechanism
    const mech = document.getElementById('mechanismBox');
    if (mech) mech.innerHTML = mol.mechanism;

    // Modification effects
    const modEff = document.getElementById('modEffects');
    if (modEff) {
        if (activeMod) {
            modEff.innerHTML = `
                <div class="mod-effect-item ${activeMod.type}">
                    <span class="mef-icon">${activeMod.type === 'positive' ? '✦' : activeMod.type === 'negative' ? '⚠' : '◆'}</span>
                    <span><strong>${activeMod.label}:</strong> ${activeMod.effect}</span>
                </div>
            `;
        } else {
            modEff.innerHTML = mol.modifications.map(m => `
                <div class="mod-effect-item ${m.type}">
                    <span class="mef-icon">${m.icon}</span>
                    <span><strong>${m.label}:</strong> ${m.effect}</span>
                </div>
            `).join('');
        }
    }
}

// ═══════════════════════════════════════════════════════════════
//  MODIFICATION BAR
// ═══════════════════════════════════════════════════════════════
function updateModificationBar(mol) {
    const container = document.getElementById('modGroups');
    if (!container) return;
    container.innerHTML = mol.modifications.map((mod, i) => `
        <button class="mod-btn" data-modidx="${i}">
            <span class="mod-icon">${mod.icon}</span>
            ${mod.label}
        </button>
    `).join('');

    container.querySelectorAll('.mod-btn').forEach((btn, i) => {
        btn.addEventListener('click', () => applyModification(mol.modifications[i], btn));
    });
}

// ═══════════════════════════════════════════════════════════════
//  COMPARE PANEL
// ═══════════════════════════════════════════════════════════════
function updateComparePanel() {
    const sel = document.getElementById('compareSelector');
    if (!sel) return;

    const otherMols = window.PHARMA_DB.filter(m => m.id !== (STATE.currentMol && STATE.currentMol.id));
    sel.innerHTML = otherMols.map(m => `
        <button class="cmp-mol-btn ${STATE.compareMol && STATE.compareMol.id === m.id ? 'selected' : ''}"
                data-cmpid="${m.id}">
            ${m.name}<br>
            <span style="font-family:var(--font-mono);font-size:10px;opacity:.6">${m.formula}</span>
        </button>
    `).join('');

    sel.querySelectorAll('.cmp-mol-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mol = window.PHARMA_DB.find(m => m.id === btn.dataset.cmpid);
            STATE.compareMol = mol;
            renderCompareTable();
            sel.querySelectorAll('.cmp-mol-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    renderCompareTable();
}

function renderCompareTable() {
    const table = document.getElementById('compareTable');
    if (!table || !STATE.currentMol) return;
    if (!STATE.compareMol) {
        table.innerHTML = '<div style="font-size:12px;color:var(--text-muted);padding:8px 0">Selecciona una molécula para comparar</div>';
        return;
    }

    const m1 = STATE.currentMol;
    const m2 = STATE.compareMol;

    const rows = [
        { label: 'Peso Mol.', v1: m1.mw.toFixed(1), v2: m2.mw.toFixed(1) },
        { label: 'LogP',      v1: m1.logP.toFixed(2), v2: m2.logP.toFixed(2) },
        { label: 'pKa',       v1: m1.pka.toFixed(2), v2: m2.pka.toFixed(2) },
        { label: 'Solubil.',  v1: m1.solubility.toFixed(3), v2: m2.solubility.toFixed(3) },
        { label: 'TPSA',      v1: m1.tpsa.toFixed(1), v2: m2.tpsa.toFixed(1) },
        { label: 'HBD',       v1: m1.hbd, v2: m2.hbd },
        { label: 'HBA',       v1: m1.hba, v2: m2.hba },
        { label: 'Biodispon.',v1: m1.adme.biodisponibilidad + '%', v2: m2.adme.biodisponibilidad + '%' },
    ];

    const header = `
        <div class="cmp-row" style="font-size:11px;font-weight:700;padding-bottom:8px;border-bottom:1px solid var(--border)">
            <span class="cmp-prop">Propiedad</span>
            <span class="cmp-val1" style="font-family:var(--font-main)">${m1.name.split(' ')[0]}</span>
            <span class="cmp-val2" style="font-family:var(--font-main)">${m2.name.split(' ')[0]}</span>
        </div>
    `;

    table.innerHTML = header + rows.map(r => `
        <div class="cmp-row">
            <span class="cmp-prop">${r.label}</span>
            <span class="cmp-val1">${r.v1}</span>
            <span class="cmp-val2">${r.v2}</span>
        </div>
    `).join('');
}

// ═══════════════════════════════════════════════════════════════
//  ATOM INFO PANEL
// ═══════════════════════════════════════════════════════════════
window.showAtomInfoPanel = function(atomData) {
    const panel = document.getElementById('atomInfoPanel');
    if (!panel || !atomData) return;

    const el = atomData.el;
    const ec = window.ELEMENT_COLORS[el] || { name: el, num: '?', mass: '?' };

    document.getElementById('aipElement').textContent = el;
    document.getElementById('aipElement').style.borderColor = '#' + ec.hex.toString(16).padStart(6, '0');
    document.getElementById('aipName').textContent = ec.name || el;
    document.getElementById('aipType').textContent = 'Átomo #' + (atomData.idx + 1);
    document.getElementById('aipBody').innerHTML = `
        <div class="aip-stat">
            <span class="aip-stat-label">Número Atómico</span>
            <span class="aip-stat-val">${ec.num || '?'}</span>
        </div>
        <div class="aip-stat">
            <span class="aip-stat-label">Masa Atómica</span>
            <span class="aip-stat-val">${ec.mass || '?'}</span>
        </div>
        <div class="aip-stat">
            <span class="aip-stat-label">Radio (Å)</span>
            <span class="aip-stat-val">${atomData.r || '?'}</span>
        </div>
    `;
    panel.classList.add('open');
};

window.hideAtomInfoPanel = function() {
    document.getElementById('atomInfoPanel').classList.remove('open');
};

// ═══════════════════════════════════════════════════════════════
//  TOAST NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════
function showToast(msg, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

// ═══════════════════════════════════════════════════════════════
//  TUTORIAL
// ═══════════════════════════════════════════════════════════════
const TUTORIAL_STEPS = [
    {
        html: '<strong>¡Bienvenido al Laboratorio Molecular 3D!</strong><br><br>Aquí explorarás la estructura tridimensional de fármacos reales y aprenderás cómo sus propiedades moleculares afectan su comportamiento farmacológico.'
    },
    {
        html: '⚗️ <strong>Panel izquierdo — Biblioteca de Fármacos</strong><br><br>Selecciona cualquier fármaco de la lista para visualizarlo en 3D. Puedes filtrar por categoría (analgésicos, antibióticos, etc.) o buscar por nombre.'
    },
    {
        html: '🖱️ <strong>Controles 3D</strong><br><br><strong>Arrastra</strong> para rotar la molécula. Usa el <strong>scroll</strong> para hacer zoom. <strong>Haz clic en un átomo</strong> para ver su información detallada (elemento, masa atómica, radio).'
    },
    {
        html: '🔧 <strong>Barra de Modificaciones</strong><br><br>En la barra inferior puedes <strong>modificar grupos funcionales</strong> de la molécula. Observa cómo cambian en tiempo real las propiedades fisicoquímicas (LogP, solubilidad, pKa).'
    },
    {
        html: '📊 <strong>Panel derecho — Propiedades</strong><br><br>Explora 3 pestañas: <strong>Propiedades</strong> fisicoquímicas y Regla de Lipinski, <strong>Farmacología</strong> con ADME y mecanismo de acción, y <strong>Comparar</strong> dos fármacos lado a lado.'
    },
    {
        html: '🎓 <strong>¡Listo para explorar!</strong><br><br>Prueba cargando la <strong>Aspirina</strong> y aplica la modificación "Eliminar -OCOCH₃" para ver cómo la pérdida del grupo acetilo cambia sus propiedades. ¡Buena suerte!'
    }
];

let tutStep = 0;

function startTutorial() {
    tutStep = 0;
    const overlay = document.getElementById('tutorialOverlay');
    overlay.classList.add('open');
    renderTutStep();
}

function renderTutStep() {
    const ind = document.getElementById('tutStepInd');
    const content = document.getElementById('tutContent');
    const prev = document.getElementById('tutPrev');
    const next = document.getElementById('tutNext');

    // Dots
    ind.innerHTML = TUTORIAL_STEPS.map((_, i) =>
        `<div class="tut-dot ${i === tutStep ? 'active' : ''}"></div>`
    ).join('');

    content.innerHTML = TUTORIAL_STEPS[tutStep].html;
    prev.style.visibility = tutStep === 0 ? 'hidden' : 'visible';
    next.textContent = tutStep === TUTORIAL_STEPS.length - 1 ? '¡Empezar! →' : 'Siguiente →';
}

function closeTutorial() {
    document.getElementById('tutorialOverlay').classList.remove('open');
    localStorage.setItem('pharmasim_tutorial_done', '1');
}

// ═══════════════════════════════════════════════════════════════
//  PANEL TABS
// ═══════════════════════════════════════════════════════════════
function setupPanelTabs() {
    document.querySelectorAll('.ptab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.ptab;
            document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.ptab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab' + target.charAt(0).toUpperCase() + target.slice(1)).classList.add('active');
            STATE.currentPTab = target;
            if (target === 'compare') updateComparePanel();
        });
    });
}

// ═══════════════════════════════════════════════════════════════
//  EVENTS SETUP
// ═══════════════════════════════════════════════════════════════
function setupEvents() {
    // Toolbar: display modes
    document.getElementById('btnWireframe').addEventListener('click', () => {
        window.renderer3D.setDisplayMode('wireframe');
        document.querySelectorAll('.tool-btn[id^="btn"]').forEach(b => b.classList.remove('active'));
        document.getElementById('btnWireframe').classList.add('active');
    });
    document.getElementById('btnBallStick').addEventListener('click', () => {
        window.renderer3D.setDisplayMode('ballstick');
        document.querySelectorAll('.tool-btn[id^="btn"]').forEach(b => b.classList.remove('active'));
        document.getElementById('btnBallStick').classList.add('active');
    });
    document.getElementById('btnSphere').addEventListener('click', () => {
        window.renderer3D.setDisplayMode('sphere');
        document.querySelectorAll('.tool-btn[id^="btn"]').forEach(b => b.classList.remove('active'));
        document.getElementById('btnSphere').classList.add('active');
    });

    // Zoom
    document.getElementById('btnZoomIn').addEventListener('click', () => window.renderer3D.zoom(0.8));
    document.getElementById('btnZoomOut').addEventListener('click', () => window.renderer3D.zoom(1.25));

    // Auto rotate
    document.getElementById('btnAutoRotate').addEventListener('click', (e) => {
        window.renderer3D.toggleAutoRotate();
        e.currentTarget.classList.toggle('active');
    });

    // Reset view
    document.getElementById('btnReset').addEventListener('click', () => window.renderer3D.resetView());

    // Fullscreen
    document.getElementById('btnFullscreen').addEventListener('click', () => {
        const wrap = document.getElementById('viewerWrap');
        if (!document.fullscreenElement) {
            wrap.requestFullscreen && wrap.requestFullscreen();
        } else {
            document.exitFullscreen && document.exitFullscreen();
        }
    });

    // Reset modification
    document.getElementById('btnResetMod').addEventListener('click', resetModification);

    // Search
    document.getElementById('searchInput').addEventListener('input', () => renderMoleculeList(window.PHARMA_DB));

    // Category tabs
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            STATE.activeCategory = tab.dataset.cat;
            renderMoleculeList(window.PHARMA_DB);
        });
    });

    // Panel tabs
    setupPanelTabs();

    // Atom info panel close
    document.getElementById('aipClose').addEventListener('click', window.hideAtomInfoPanel);

    // Tutorial
    document.getElementById('btnTutorial').addEventListener('click', startTutorial);
    document.getElementById('tutNext').addEventListener('click', () => {
        if (tutStep < TUTORIAL_STEPS.length - 1) {
            tutStep++;
            renderTutStep();
        } else {
            closeTutorial();
        }
    });
    document.getElementById('tutPrev').addEventListener('click', () => {
        if (tutStep > 0) {
            tutStep--;
            renderTutStep();
        }
    });
    document.getElementById('tutSkip').addEventListener('click', closeTutorial);

    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modalOverlay')) closeModal();
    });

    // Rotate btn
    document.getElementById('btnRotate').addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
    });
}

// ═══════════════════════════════════════════════════════════════
//  MODAL
// ═══════════════════════════════════════════════════════════════
function openModal(html) {
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
}
