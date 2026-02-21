/**
 * PHARMASIM — main.js
 * Controlador principal del Simulador de Formulación
 */

// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
const STATE = {
    currentStep: 1,
    selectedAPI: null,
    addedExcipients: [],   // [{id, name, category, color, percentage}]
    granParams: { temp:50, speed:50, time:20, solvent:'water' },
    compParams: { force:12, punch:40, coating:'none', color:'#e8e8e8' },
    granResults: null,
    qcResults:   null,
    dissResults: null,
    finalScore:  null,
    sessionScore: 0,
    filterCat: 'all',
};

// Engines
let particleEngine   = null;
let tabletBuilder    = null;
let granVisualizer   = null;
let dissCalc         = null;

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    dissCalc = new DissolutionCurve();
    renderAPIGrid();
    renderExcipientList();
    setupEvents();
    updateStepperUI();
});

// ═══════════════════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════════════════
function goToStep(n) {
    document.querySelectorAll('.sim-step').forEach(s => s.classList.add('hidden'));
    document.getElementById('step' + n).classList.remove('hidden');
    STATE.currentStep = n;
    updateStepperUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (n === 2 && !particleEngine) {
        particleEngine = new ParticlePhysics('mixerCanvas');
        setupDragDrop();
    }
    if (n === 3 && !granVisualizer) {
        granVisualizer = new GranulationVisualizer('granCanvas');
    }
    if (n === 4 && !tabletBuilder) {
        tabletBuilder = new TabletBuilder('tabletCanvas');
        updateTabletDimensions();
    }
    if (n === 5) {
        computeFinalResults();
    }
}

function updateStepperUI() {
    document.querySelectorAll('.step').forEach(el => {
        const n = parseInt(el.dataset.step);
        el.classList.remove('active', 'done');
        if (n === STATE.currentStep) el.classList.add('active');
        else if (n < STATE.currentStep) el.classList.add('done');
    });
}

// ═══════════════════════════════════════════════════════════════
//  STEP 1: API SELECTION
// ═══════════════════════════════════════════════════════════════
function renderAPIGrid() {
    const grid = document.getElementById('apiGrid');
    grid.innerHTML = window.API_LIST.map(api => `
        <div class="api-card" data-apiid="${api.id}"
             style="--accent-col:${getCategoryColor(api.category)}">
            <div class="api-sel-check">✓</div>
            <div class="api-icon">${api.icon}</div>
            <div class="api-name">${api.name}</div>
            <div class="api-formula">${api.formula}</div>
            <span class="api-tag ${api.category}">${getCategoryLabel(api.category)}</span>
        </div>
    `).join('');

    grid.querySelectorAll('.api-card').forEach(card => {
        card.addEventListener('click', () => selectAPI(card.dataset.apiid));
    });
}

function selectAPI(id) {
    STATE.selectedAPI = window.API_LIST.find(a => a.id === id);
    document.querySelectorAll('.api-card').forEach(c => c.classList.remove('selected'));
    document.querySelector(`.api-card[data-apiid="${id}"]`).classList.add('selected');

    showAPIInfo(STATE.selectedAPI);
    document.getElementById('btn1Next').disabled = false;
    addScore(5);
    showToast('💊 ' + STATE.selectedAPI.name + ' seleccionada', 'success');
}

function showAPIInfo(api) {
    const card = document.getElementById('apiInfoCard');
    card.style.display = 'block';
    document.getElementById('aicName').textContent = api.name + ' — ' + api.formula;

    const badges = [
        { text: api.solubilityClass, cls: 'solubility' },
        ...api.challenges.slice(0,2).map(c => ({ text: c.length > 30 ? c.slice(0,28)+'…' : c, cls: 'challenge' }))
    ];
    document.getElementById('aicBadges').innerHTML = badges.map(b =>
        `<span class="aic-badge ${b.cls}">${b.text}</span>`
    ).join('');

    document.getElementById('aicProps').innerHTML = `
        <div class="aic-prop"><span class="aic-prop-label">Peso Mol.</span><span class="aic-prop-val">${api.mw} g/mol</span></div>
        <div class="aic-prop"><span class="aic-prop-label">LogP</span><span class="aic-prop-val">${api.logP}</span></div>
        <div class="aic-prop"><span class="aic-prop-label">pKa</span><span class="aic-prop-val">${api.pka}</span></div>
        <div class="aic-prop"><span class="aic-prop-label">Solubilidad</span><span class="aic-prop-val">${api.solubility} mg/mL</span></div>
    `;

    document.getElementById('aicChallenges').innerHTML =
        '<strong>Desafíos de formulación:</strong> ' + api.challenges.join('. ') + '.';
}

// ═══════════════════════════════════════════════════════════════
//  STEP 2: EXCIPIENTS
// ═══════════════════════════════════════════════════════════════
function renderExcipientList() {
    const list = document.getElementById('excipientList');
    const filtered = STATE.filterCat === 'all'
        ? window.EXCIPIENT_DB
        : window.EXCIPIENT_DB.filter(e => e.category === STATE.filterCat);

    list.innerHTML = filtered.map(exc => `
        <div class="exc-item" draggable="true" data-excid="${exc.id}">
            <div class="exc-name">${exc.name}</div>
            <div class="exc-meta">${exc.abbrev}</div>
            <span class="exc-cat ${exc.category}">${exc.catLabel}</span>
        </div>
    `).join('');

    list.querySelectorAll('.exc-item').forEach(el => {
        el.addEventListener('dragstart', e => {
            e.dataTransfer.setData('excipient-id', el.dataset.excid);
            el.classList.add('dragging');
        });
        el.addEventListener('dragend', () => el.classList.remove('dragging'));
    });
}

function setupDragDrop() {
    const wrap = document.getElementById('mixerWrap');
    wrap.addEventListener('dragover', e => {
        e.preventDefault();
        wrap.classList.add('drag-over');
    });
    wrap.addEventListener('dragleave', () => wrap.classList.remove('drag-over'));
    wrap.addEventListener('drop', e => {
        e.preventDefault();
        wrap.classList.remove('drag-over');
        const id = e.dataTransfer.getData('excipient-id');
        if (id) addExcipient(id);
    });
}

function addExcipient(id) {
    if (STATE.addedExcipients.find(e => e.id === id)) {
        showToast('Este excipiente ya está en la mezcla', 'warn');
        return;
    }

    const exc = window.EXCIPIENT_DB.find(e => e.id === id);
    if (!exc) return;

    // Default percentage
    let pct = exc.typical_pct;

    // Check total
    const currentTotal = STATE.addedExcipients.reduce((s,e) => s + e.percentage, 0);
    if (currentTotal + pct > 100) {
        pct = Math.max(0.5, 100 - currentTotal - (STATE.selectedAPI ? (STATE.selectedAPI.targetWeight/10) : 30));
        if (pct <= 0) { showToast('⚠️ Mezcla al 100% — elimina un excipiente primero', 'warn'); return; }
    }

    STATE.addedExcipients.push({ ...exc, percentage: pct });

    // Add to particle engine
    if (particleEngine) {
        particleEngine.addExcipient(exc, pct);
        document.getElementById('mixerDropHint').classList.add('hidden');
    }

    checkIncompatibilities();
    updateAddedExcipientsList();
    updateFormulationSummary();
    checkStep2Completion();
    addScore(3);

    showToast('✓ ' + exc.name + ' agregado', 'success');
}

function removeExcipient(id) {
    STATE.addedExcipients = STATE.addedExcipients.filter(e => e.id !== id);
    if (particleEngine) particleEngine.removeExcipient(id);
    if (STATE.addedExcipients.length === 0) {
        document.getElementById('mixerDropHint').classList.remove('hidden');
    }
    checkIncompatibilities();
    updateAddedExcipientsList();
    updateFormulationSummary();
    checkStep2Completion();
}

function updateAddedExcipientsList() {
    const list = document.getElementById('aeList');
    const total = STATE.addedExcipients.reduce((s,e) => s + e.percentage, 0);
    document.getElementById('totalPct').textContent = Math.round(total) + '% / 100%';

    list.innerHTML = STATE.addedExcipients.map(e => `
        <div class="ae-item">
            <div class="ae-dot" style="background:${e.color}"></div>
            <span class="ae-name">${e.name}</span>
            <span class="ae-pct">${e.percentage}%</span>
            <button class="ae-remove" data-excid="${e.id}">✕</button>
        </div>
    `).join('');

    list.querySelectorAll('.ae-remove').forEach(btn => {
        btn.addEventListener('click', () => removeExcipient(btn.dataset.excid));
    });

    const mixStatus = document.getElementById('mixerStatus');
    mixStatus.textContent = STATE.addedExcipients.length === 0
        ? 'Arrastra excipientes aquí'
        : `${STATE.addedExcipients.length} excipiente(s) — ${Math.round(total)}% total`;
}

function checkIncompatibilities() {
    const log = document.getElementById('compatLog');
    const status = document.getElementById('cpStatus');
    const api = STATE.selectedAPI;
    const added = STATE.addedExcipients;

    const entries = [];
    let hasError = false, hasWarn = false;

    // Always show added excipient functions
    added.forEach(e => {
        entries.push({ type: 'info', msg: `<strong>${e.name}</strong> — ${e.function}` });
    });

    // Check against incompatibilities
    window.INCOMPATIBILITIES.forEach(rule => {
        const excPresent = added.find(e => e.id === rule.exc1);
        if (!excPresent) return;

        // API-specific
        if (rule.apiIds && api && rule.apiIds.includes(api.id)) {
            entries.push({ type: rule.type, msg: rule.message });
            if (rule.type === 'error') hasError = true;
            if (rule.type === 'warn')  hasWarn  = true;
            // Show alert banner for errors
            if (rule.type === 'error') showIncompatAlert(rule.message);
        }

        // Threshold-based
        if (rule.threshold_pct && excPresent.percentage >= rule.threshold_pct) {
            entries.push({ type: rule.type, msg: rule.message });
            if (rule.type === 'warn') hasWarn = true;
        }

        // Pairwise
        if (rule.exc2 && added.find(e => e.id === rule.exc2)) {
            entries.push({ type: rule.type, msg: rule.message });
        }
    });

    if (entries.length === 0 && added.length === 0) {
        log.innerHTML = `<div class="compat-idle"><div style="font-size:28px;margin-bottom:8px">🔬</div><span>Agrega excipientes para ver análisis</span></div>`;
        status.textContent = '—'; status.className = 'cp-status';
        return;
    }

    log.innerHTML = entries.map(e =>
        `<div class="compat-entry ${e.type}">${e.msg}</div>`
    ).join('');

    if (hasError) { status.textContent = '✗ Incompatibilidades críticas'; status.className = 'cp-status error'; }
    else if (hasWarn) { status.textContent = '⚠ Advertencias'; status.className = 'cp-status warn'; }
    else { status.textContent = '✓ Sin conflictos'; status.className = 'cp-status ok'; }
}

function updateFormulationSummary() {
    const summary = document.getElementById('formulationSummary');
    if (STATE.addedExcipients.length === 0) { summary.style.display='none'; return; }
    summary.style.display = 'block';

    const pieData = STATE.addedExcipients.map(e => ({ pct: e.percentage, color: e.color, name: e.name }));
    window.drawPieChart('pieChart', pieData);

    document.getElementById('fsLegend').innerHTML = STATE.addedExcipients.map(e =>
        `<div class="fsl-item"><div class="fsl-dot" style="background:${e.color}"></div><span>${e.name} (${e.percentage}%)</span></div>`
    ).join('');
}

function checkStep2Completion() {
    const hasDisintegrant = STATE.addedExcipients.some(e => e.category === 'disintegrant');
    const hasLubricant    = STATE.addedExcipients.some(e => e.category === 'lubricant');
    const btn = document.getElementById('btn2Next');
    btn.disabled = !(hasDisintegrant && hasLubricant && STATE.addedExcipients.length >= 2);
    if (hasDisintegrant && hasLubricant) {
        btn.title = '';
    } else {
        btn.title = 'Necesitas al menos un disgregante y un lubricante';
    }
}

function showIncompatAlert(msg) {
    const alert = document.getElementById('incompatAlert');
    const msgEl = document.getElementById('iaMsg');
    msgEl.textContent = msg.replace(/[🔴⚠️ℹ️]/g, '').trim();
    alert.style.display = 'flex';
    setTimeout(() => { if (alert.style.display === 'flex') alert.style.display = 'none'; }, 6000);
}

// ═══════════════════════════════════════════════════════════════
//  STEP 3: GRANULATION
// ═══════════════════════════════════════════════════════════════
function startGranulation() {
    const btn = document.getElementById('btnGranulate');
    btn.disabled = true;
    btn.textContent = '⏳ Granulando...';

    const progress = document.getElementById('granProgress');
    const gpBar    = document.getElementById('gpBar');
    const gpLabel  = document.getElementById('gpLabel');
    progress.style.display = 'block';

    if (granVisualizer) {
        granVisualizer.setParams(STATE.granParams.temp, STATE.granParams.speed, STATE.granParams.time);
        granVisualizer.startGranulation(
            (pct) => {
                gpBar.style.width = pct + '%';
                gpLabel.textContent = pct < 40 ? 'Mezclando polvo...' :
                                      pct < 70 ? 'Agregando solvente...' :
                                      pct < 90 ? 'Formando gránulos...' : 'Secando...';
            },
            (results) => {
                STATE.granResults = results;
                showGranResults(results);
                progress.style.display = 'none';
                btn.disabled = false;
                btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Regranular`;
                document.getElementById('btn3Next').disabled = false;
                addScore(15);
                showToast('✓ Granulación completada', 'success');
            }
        );
    }
}

function showGranResults(results) {
    const gr = document.getElementById('granResults');
    gr.style.display = 'grid';
    document.getElementById('grSize').textContent    = results.size;
    document.getElementById('grUniform').textContent = results.uniformity;
    document.getElementById('grMoist').textContent   = results.moisture;
    document.getElementById('grFlow').textContent    = results.flow;

    // Gauge
    const q = Math.round(results.quality * 100);
    const color = q >= 70 ? '#22c55e' : q >= 45 ? '#f59e0b' : '#ef4444';
    window.drawGauge('gaugeCanvas', q, 'Calidad', color);

    const verdict = document.getElementById('qualityVerdict');
    const tips    = document.getElementById('qualityTips');
    const { temp, speed, time } = STATE.granParams;

    if (q >= 75) {
        verdict.textContent = '✅ Gránulo excelente'; verdict.className = 'quality-verdict good';
    } else if (q >= 50) {
        verdict.textContent = '⚠️ Gránulo aceptable'; verdict.className = 'quality-verdict warn';
    } else {
        verdict.textContent = '❌ Gránulo deficiente'; verdict.className = 'quality-verdict bad';
    }

    const tipList = [];
    if (temp < 35)  tipList.push({ type:'bad',  msg:'Temperatura muy baja: granulación incompleta. Aumentar a 40-60°C.' });
    if (temp > 65)  tipList.push({ type:'warn', msg:'Temperatura alta: riesgo de degradación térmica del API.' });
    if (speed < 25) tipList.push({ type:'warn', msg:'Velocidad baja: gránulos irregulares, mala uniformidad.' });
    if (speed > 80) tipList.push({ type:'bad',  msg:'Velocidad excesiva: sobregranulación, gránulos muy densos.' });
    if (time < 10)  tipList.push({ type:'bad',  msg:'Tiempo insuficiente: granulación incompleta.' });
    if (q >= 75)    tipList.push({ type:'ok',   msg:'Parámetros óptimos. Proceder a compresión.' });

    tips.innerHTML = tipList.map(t =>
        `<div class="qt-item ${t.type !== 'ok' ? t.type : ''}">${t.msg}</div>`
    ).join('');
}

// ═══════════════════════════════════════════════════════════════
//  STEP 4: COMPRESSION
// ═══════════════════════════════════════════════════════════════
function updateTabletDimensions() {
    if (!tabletBuilder) return;
    tabletBuilder.setForce(STATE.compParams.force);
    tabletBuilder.setCoating(STATE.compParams.coating);
    tabletBuilder.setColor(STATE.compParams.color);

    const m = tabletBuilder.getMetrics();
    document.getElementById('tdDiam').textContent     = m.diameter.toFixed(1);
    document.getElementById('tdWeight').textContent   = m.weight;
    document.getElementById('tdHardness').textContent = m.hardness;
    document.getElementById('tdFriab').textContent    = m.friability;

    // Force alert
    const alert = document.getElementById('forceAlert');
    const force = STATE.compParams.force;
    if (force < 4) {
        alert.style.display = 'block'; alert.className = 'force-alert error';
        alert.textContent = '⚠ Fuerza insuficiente: tableta no cohesiva, alta friabilidad';
    } else if (force > 25) {
        alert.style.display = 'block'; alert.className = 'force-alert error';
        alert.textContent = '⚠ Fuerza excesiva: tableta agrietada, tiempo de desintegración alto';
    } else if (force > 18) {
        alert.style.display = 'block'; alert.className = 'force-alert warn';
        alert.textContent = '⚠ Fuerza alta: verificar desintegración y disolución';
    } else {
        alert.style.display = 'none';
    }
}

function runQCTests() {
    const btn = document.getElementById('btnCompress');
    btn.disabled = true; btn.textContent = '⏳ Comprimiendo...';

    setTimeout(() => {
        const m = tabletBuilder ? tabletBuilder.getMetrics() : { hardness:80, friability:0.5 };
        const force = STATE.compParams.force;
        const coating = STATE.compParams.coating;
        const hasDisint = STATE.addedExcipients.some(e => e.category === 'disintegrant');

        // Calculate disintegration time
        let desintTime = 8; // base min
        if (!hasDisint) desintTime += 25;
        if (force > 18) desintTime += (force - 18) * 2;
        if (force < 5)  desintTime = 60;
        if (coating === 'enteric') desintTime = 35; // in intestine
        if (coating === 'extended') desintTime = 90;

        const tests = [
            {
                id: 'qcDesintegration',
                name: 'Desintegración',
                value: desintTime + ' min',
                pass: coating === 'extended' ? desintTime <= 120 : desintTime <= 30,
                resultEl: 'qcDesResult', badgeEl: 'qcDesBadge'
            },
            {
                id: 'qcHardness',
                name: 'Dureza',
                value: m.hardness + ' N',
                pass: m.hardness >= 50 && m.hardness <= 200,
                resultEl: 'qcHardResult', badgeEl: 'qcHardBadge'
            },
            {
                id: 'qcFriability',
                name: 'Friabilidad',
                value: m.friability + '%',
                pass: parseFloat(m.friability) < 1.0,
                resultEl: 'qcFriabResult', badgeEl: 'qcFriabBadge'
            },
            {
                id: 'qcWeight',
                name: 'Peso uniforme',
                value: '±' + (2 + (Math.random() * 3).toFixed(1)) + '%',
                pass: force >= 5 && force <= 25,
                resultEl: 'qcWeightResult', badgeEl: 'qcWeightBadge'
            }
        ];

        STATE.qcResults = tests;
        const allPass = tests.every(t => t.pass);
        const passCount = tests.filter(t => t.pass).length;

        tests.forEach((t, i) => {
            setTimeout(() => {
                const el = document.getElementById(t.id);
                el.classList.remove('pending'); el.classList.add(t.pass ? 'pass' : 'fail');
                document.getElementById(t.resultEl).textContent = t.value;
                document.getElementById(t.badgeEl).textContent  = t.pass ? '✓' : '✗';
            }, i * 400);
        });

        setTimeout(() => {
            const overall = document.getElementById('qcOverall');
            overall.style.display = 'block';
            overall.className = 'qc-overall ' + (passCount >= 3 ? 'approved' : 'rejected');
            overall.textContent = passCount >= 3
                ? `✓ LOTE APROBADO — ${passCount}/4 tests superados`
                : `✗ LOTE RECHAZADO — Solo ${passCount}/4 tests superados`;

            btn.disabled = false;
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg> Recomprimir`;
            document.getElementById('btn4Next').disabled = false;
            addScore(passCount * 5);
            showToast(passCount >= 3 ? '✅ Tableta aprobada' : '❌ QC fallido', passCount >= 3 ? 'success' : 'warn');
        }, tests.length * 400 + 300);

    }, 1200);
}

// ═══════════════════════════════════════════════════════════════
//  STEP 5: RESULTS
// ═══════════════════════════════════════════════════════════════
function computeFinalResults() {
    if (!STATE.selectedAPI || !STATE.addedExcipients.length) return;

    const diss = dissCalc.calculate(
        STATE.selectedAPI,
        STATE.addedExcipients,
        STATE.granParams,
        STATE.compParams
    );
    STATE.dissResults = diss;

    // Draw dissolution curve
    dissCalc.draw('dissolutionCanvas', diss, STATE.selectedAPI);
    drawFinalTablet();

    // Params
    document.getElementById('dpT50').textContent = diss.params.t50;
    document.getElementById('dpT85').textContent = diss.params.t85;
    document.getElementById('dpQ30').textContent = diss.params.q30 + '%';
    document.getElementById('dpF2').textContent  = diss.params.f2;

    // Scoring
    const qcArr = STATE.qcResults || [];
    const score = dissCalc.scoreFormulation(diss, qcArr, STATE.addedExcipients, STATE.selectedAPI);
    STATE.finalScore = score;

    document.getElementById('finalScore').textContent = score.score;
    window.drawScoreRing('scoreCanvas', score.score);

    const badge = document.getElementById('ftpBadge');
    if (score.score >= 85) { badge.className='ftp-badge excellent'; badge.textContent='🏆 FORMULACIÓN EXCELENTE'; }
    else if (score.score >= 65) { badge.className='ftp-badge good'; badge.textContent='✅ FORMULACIÓN BUENA'; }
    else if (score.score >= 45) { badge.className='ftp-badge average'; badge.textContent='⚠️ FORMULACIÓN REGULAR'; }
    else { badge.className='ftp-badge poor'; badge.textContent='❌ REQUIERE REVISIÓN'; }

    document.getElementById('rcAchievements').innerHTML =
        score.achievements.map(a => `<div class="rc-item">✅ ${a}</div>`).join('');
    document.getElementById('rcObservations').innerHTML =
        (score.issues.length ? score.issues : ['Sin observaciones críticas'])
        .map(i => `<div class="rc-item">→ ${i}</div>`).join('');
    document.getElementById('rcConcept').innerHTML = score.concept;

    // Add session score
    addScore(score.score - STATE.sessionScore + STATE.sessionScore);
}

function drawFinalTablet() {
    const canvas = document.getElementById('finalTabletCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = '#06090f'; ctx.fillRect(0,0,W,H);

    // Draw simplified final tablet
    const cx = W/2, cy = H/2 - 10;
    const color = STATE.compParams.color;
    const rx = 60, ry = 22;

    // Shadow
    const sh = ctx.createRadialGradient(cx, cy+ry+12, 5, cx, cy+ry+12, rx);
    sh.addColorStop(0,'rgba(0,0,0,0.5)'); sh.addColorStop(1,'rgba(0,0,0,0)');
    ctx.save(); ctx.scale(1, 0.3); ctx.translate(0, (cy+ry+12)*2.33);
    ctx.fillStyle=sh; ctx.beginPath(); ctx.ellipse(cx,0,rx*1.1,rx*1.1,0,0,Math.PI*2); ctx.fill(); ctx.restore();

    // Tablet
    const grad = ctx.createLinearGradient(cx-rx, cy-ry, cx+rx, cy+ry);
    grad.addColorStop(0, lightenHex(color, 50));
    grad.addColorStop(0.5, color);
    grad.addColorStop(1, darkenHex(color, 30));
    ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2);
    ctx.fillStyle = grad; ctx.fill();

    // Highlight
    const hl = ctx.createRadialGradient(cx-20, cy-10, 2, cx, cy, rx);
    hl.addColorStop(0,'rgba(255,255,255,0.5)'); hl.addColorStop(0.5,'rgba(255,255,255,0.05)'); hl.addColorStop(1,'rgba(255,255,255,0)');
    ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2); ctx.fillStyle=hl; ctx.fill();

    // Text
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.font='bold 11px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText(STATE.selectedAPI ? STATE.selectedAPI.name.slice(0,6).toUpperCase() : 'PS-02', cx, cy+4);

    // Coating label
    if (STATE.compParams.coating !== 'none') {
        const coatLabels = { film:'Film Coat', enteric:'Entérico', extended:'XR' };
        ctx.fillStyle='rgba(34,197,94,0.9)'; ctx.font='bold 10px DM Sans'; ctx.textAlign='center';
        ctx.fillText(coatLabels[STATE.compParams.coating]||'', cx, cy+ry+16);
    }
}

function lightenHex(hex, a) {
    const r=parseInt(hex.slice(1,3),16)||200, g=parseInt(hex.slice(3,5),16)||200, b=parseInt(hex.slice(5,7),16)||200;
    return `rgb(${Math.min(255,r+a)},${Math.min(255,g+a)},${Math.min(255,b+a)})`;
}
function darkenHex(hex, a) {
    const r=parseInt(hex.slice(1,3),16)||200, g=parseInt(hex.slice(3,5),16)||200, b=parseInt(hex.slice(5,7),16)||200;
    return `rgb(${Math.max(0,r-a)},${Math.max(0,g-a)},${Math.max(0,b-a)})`;
}

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════
function addScore(pts) {
    STATE.sessionScore += pts;
    const el = document.getElementById('scoreVal');
    if (el) {
        el.textContent = STATE.sessionScore;
        el.parentElement.classList.add('score-bump');
        setTimeout(() => el.parentElement.classList.remove('score-bump'), 400);
    }
}

function showToast(msg, type='info') {
    const container = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`; t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3200);
}

function getCategoryColor(cat) {
    return { analgesico:'rgba(239,68,68,0.1)', antibiotico:'rgba(34,197,94,0.1)', antihipertensivo:'rgba(99,102,241,0.1)', antidiabético:'rgba(20,184,166,0.1)' }[cat] || 'rgba(255,255,255,0.05)';
}
function getCategoryLabel(cat) {
    return { analgesico:'Analgésico', antibiotico:'Antibiótico', antihipertensivo:'Antihipertensivo', antidiabético:'Antidiabético' }[cat] || cat;
}

// ═══════════════════════════════════════════════════════════════
//  EVENTS
// ═══════════════════════════════════════════════════════════════
function setupEvents() {
    // Step nav
    document.getElementById('btn1Next').addEventListener('click', () => goToStep(2));
    document.getElementById('btn2Back').addEventListener('click', () => goToStep(1));
    document.getElementById('btn2Next').addEventListener('click', () => goToStep(3));
    document.getElementById('btn3Back').addEventListener('click', () => goToStep(2));
    document.getElementById('btn3Next').addEventListener('click', () => goToStep(4));
    document.getElementById('btn4Back').addEventListener('click', () => goToStep(3));
    document.getElementById('btn4Next').addEventListener('click', () => goToStep(5));
    document.getElementById('btnRestart').addEventListener('click', () => restartSimulation());

    // Excipient filter
    document.querySelectorAll('.pf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            STATE.filterCat = btn.dataset.fcat;
            renderExcipientList();
        });
    });

    // Mixer controls
    document.getElementById('btnMixStart').addEventListener('click', () => {
        if (particleEngine) {
            if (particleEngine.isMixing) {
                particleEngine.stopMixing();
                showToast('⏸ Mezcla detenida', 'info');
            } else {
                particleEngine.startMixing(50);
                showToast('🔄 Mezcla iniciada', 'success');
            }
        }
    });
    document.getElementById('btnMixClear').addEventListener('click', () => {
        STATE.addedExcipients = [];
        if (particleEngine) { particleEngine.clear(); }
        document.getElementById('mixerDropHint').classList.remove('hidden');
        updateAddedExcipientsList();
        checkIncompatibilities();
        checkStep2Completion();
        updateFormulationSummary();
    });

    // Granulation sliders
    const sliders = [
        { id:'sldTemp',  valId:'tempVal',  hintId:'tempHint',  key:'temp',
          hints: { low:20, high:65, msg: { low:'Temperatura muy baja: granulación lenta', opt:'Rango óptimo: 40-60°C', high:'Temperatura alta: riesgo de degradación' } } },
        { id:'sldSpeed', valId:'speedVal', hintId:'speedHint', key:'speed',
          hints: { low:25, high:75, msg: { low:'Velocidad baja: mala distribución', opt:'Rango óptimo: 30-70 rpm', high:'Velocidad alta: sobregranulación' } } },
        { id:'sldTime',  valId:'timeVal',  hintId:'timeHint',  key:'time',
          hints: { low:10, high:40, msg: { low:'Tiempo insuficiente', opt:'Tiempo estándar: 15-30 min', high:'Tiempo excesivo: posible sobregranulación' } } },
    ];
    sliders.forEach(s => {
        const el = document.getElementById(s.id);
        if (!el) return;
        el.addEventListener('input', () => {
            const v = parseInt(el.value);
            document.getElementById(s.valId).textContent = v;
            STATE.granParams[s.key] = v;
            const h = document.getElementById(s.hintId);
            if (h) h.textContent = v < s.hints.low ? s.hints.msg.low : v > s.hints.high ? s.hints.msg.high : s.hints.msg.opt;
        });
    });

    // Solvent buttons
    document.querySelectorAll('.solvent-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.solvent-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            STATE.granParams.solvent = btn.dataset.solvent;
        });
    });

    // Granulate button
    document.getElementById('btnGranulate').addEventListener('click', startGranulation);

    // Compression
    document.getElementById('sldForce').addEventListener('input', e => {
        const v = parseInt(e.target.value);
        document.getElementById('forceVal').textContent = v;
        STATE.compParams.force = v;
        updateTabletDimensions();
    });
    document.getElementById('sldPunch').addEventListener('input', e => {
        document.getElementById('punchVal').textContent = e.target.value;
        STATE.compParams.punch = parseInt(e.target.value);
    });

    // Coating
    document.querySelectorAll('.coating-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.coating-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            STATE.compParams.coating = btn.dataset.coat;
            if (tabletBuilder) { tabletBuilder.setCoating(btn.dataset.coat); }
            showToast('🎨 Recubrimiento: ' + btn.querySelector('.coat-name').textContent, 'info');
        });
    });

    // Color picker
    document.querySelectorAll('.color-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
            sw.classList.add('selected');
            STATE.compParams.color = sw.dataset.col;
            if (tabletBuilder) tabletBuilder.setColor(sw.dataset.col);
        });
    });

    // Compress button
    document.getElementById('btnCompress').addEventListener('click', runQCTests);

    // Incompatibility alert close
    document.getElementById('iaClose').addEventListener('click', () => {
        document.getElementById('incompatAlert').style.display = 'none';
    });
}

function restartSimulation() {
    STATE.selectedAPI = null;
    STATE.addedExcipients = [];
    STATE.granResults = null;
    STATE.qcResults = null;
    STATE.dissResults = null;
    STATE.finalScore = null;
    STATE.compParams = { force:12, punch:40, coating:'none', color:'#e8e8e8' };
    STATE.granParams = { temp:50, speed:50, time:20, solvent:'water' };

    if (particleEngine) { particleEngine.clear(); particleEngine = null; }
    tabletBuilder = null; granVisualizer = null;

    document.querySelectorAll('.api-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('apiInfoCard').style.display = 'none';
    document.getElementById('btn1Next').disabled = true;
    document.getElementById('btn2Next').disabled = true;
    document.getElementById('btn3Next').disabled = true;
    document.getElementById('btn4Next').disabled = true;

    goToStep(1);
    showToast('🔄 Nueva formulación iniciada', 'info');
}
