/**
 * PHARMASIM — main.js (Módulo 04: Sé el Químico Farmacéutico)
 * Controlador principal del modo historia
 */

const PHASES = [
    { num: 1, label: 'Principio Activo', sub: 'Selección del fármaco' },
    { num: 2, label: 'Forma Farmacéutica', sub: 'Diseño para el paciente' },
    { num: 3, label: 'Cálculo de Dosis', sub: 'Estequiometría clínica' },
    { num: 4, label: 'Receta Médica', sub: 'Normativa chilena' },
    { num: 5, label: 'Dispensación', sub: 'Educación al paciente' }
];

let selectedDrug = null;
let selectedForm = null;
let selectedRxType = null;
let checkedCounsel = [];

// ═══════════════════════════════════════
//  INIT
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
    const ok = await window.PatientEngine.init();
    if (!ok) {
        showToast('Error cargando datos del juego', 'error');
        return;
    }
    renderCaseSelection();
});

// ═══════════════════════════════════════
//  CASE SELECTION
// ═══════════════════════════════════════
function renderCaseSelection() {
    const grid = document.getElementById('casesGrid');
    const cases = window.PatientEngine.getCaseList();

    grid.innerHTML = cases.map(c => `
        <div class="case-card" data-caseid="${c.id}">
            <div class="cc-icon">${c.icon}</div>
            <div class="cc-title">${c.title}</div>
            <div class="cc-patient">${c.patientName} · ${c.patientAge} años · ${c.patientSex === 'F' ? 'Femenino' : 'Masculino'}</div>
            <div class="cc-meta">
                <span class="cc-tag diff-${c.difficulty}">${c.difficulty.toUpperCase()}</span>
                <span class="cc-tag cat">${c.category}</span>
            </div>
        </div>
    `).join('');

    grid.querySelectorAll('.case-card').forEach(card => {
        card.addEventListener('click', () => {
            const caseData = window.PatientEngine.startCase(card.dataset.caseid);
            if (caseData) startGame(caseData);
        });
    });
}

// ═══════════════════════════════════════
//  GAME FLOW
// ═══════════════════════════════════════
function startGame(caseData) {
    document.getElementById('screenCases').classList.add('hidden');
    document.getElementById('screenGame').classList.remove('hidden');
    document.getElementById('stepper').classList.remove('hidden');
    document.getElementById('scoreBadge').style.display = 'flex';

    selectedDrug = null;
    selectedForm = null;
    selectedRxType = null;
    checkedCounsel = [];

    renderStepper(1);
    renderPhase1(caseData);
}

function renderStepper(activePhase) {
    const inner = document.getElementById('stepperInner');
    inner.innerHTML = PHASES.map(p => {
        let cls = '';
        if (p.num < activePhase) cls = 'done';
        else if (p.num === activePhase) cls = 'active';
        return `
            <div class="step ${cls}">
                <div class="step-num">${p.num < activePhase ? '✓' : p.num}</div>
                <div class="step-info">
                    <span class="step-label">${p.label}</span>
                    <span class="step-sub">${p.sub}</span>
                </div>
            </div>
        `;
    }).join('');
}

function updateScore() {
    const scores = window.PatientEngine.phaseScores;
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    document.getElementById('liveScore').textContent = total;
}

// ═══════════════════════════════════════
//  PHASE 1: DRUG SELECTION
// ═══════════════════════════════════════
function renderPhase1(caseData) {
    const p = caseData.patient;
    const pr = caseData.presentation;
    const game = document.getElementById('screenGame');
    const drugs = window.PatientEngine.getDrugOptions();

    const vitalsHtml = Object.entries(pr.vital_signs).map(([k, v]) => {
        const labels = { pa_sistolica:'PA Sist.', pa_diastolica:'PA Diast.', fc:'FC', fr:'FR', temp:'Temp', sat_o2:'SpO₂' };
        const units = { pa_sistolica:'mmHg', pa_diastolica:'mmHg', fc:'lpm', fr:'rpm', temp:'°C', sat_o2:'%' };
        const abnormal = (k === 'pa_sistolica' && v > 140) || (k === 'pa_diastolica' && v > 90) ||
                         (k === 'fc' && (v > 100 || v < 60)) || (k === 'temp' && v > 37.5) || (k === 'sat_o2' && v < 95);
        return `<div class="vital-item"><div class="vital-label">${labels[k] || k}</div><div class="vital-val ${abnormal ? 'abnormal' : ''}">${v} <span class="vital-unit">${units[k] || ''}</span></div></div>`;
    }).join('');

    const labsHtml = Object.entries(pr.labs).map(([k, v]) => {
        if (typeof v !== 'object') return '';
        const numVal = parseFloat(v.value);
        const refParts = v.ref.match(/[\d.]+/g);
        let cls = '';
        if (refParts && refParts.length >= 2) {
            if (numVal > parseFloat(refParts[1])) cls = 'high';
            else if (numVal < parseFloat(refParts[0])) cls = 'low';
        } else if (v.ref.startsWith('>') && refParts) {
            if (numVal < parseFloat(refParts[0])) cls = 'low';
        } else if (v.ref.startsWith('<') && refParts) {
            if (numVal > parseFloat(refParts[0])) cls = 'high';
        }
        const displayName = k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        return `<div class="lab-row"><span class="lab-name">${displayName}</span><span class="lab-val ${cls}">${v.value} ${v.unit}</span><span class="lab-ref">Ref: ${v.ref}</span></div>`;
    }).filter(Boolean).join('');

    const comorb = pr.comorbidities.length > 0
        ? pr.comorbidities.map(c => `<span class="cc-tag cat">${c}</span>`).join(' ')
        : '<span style="color:var(--text3)">Sin comorbilidades relevantes</span>';

    const meds = pr.current_medications.length > 0
        ? pr.current_medications.map(m => `<div class="lab-row"><span class="lab-name">${m.name}</span><span class="lab-val">${m.dose}</span><span class="lab-ref">${m.since || ''}</span></div>`).join('')
        : '<span style="color:var(--text3);font-size:12px">Sin medicación actual</span>';

    game.innerHTML = `
        <div class="phase-header">
            <div class="phase-badge">FASE 1 / 5</div>
            <div class="phase-title">Selecciona el <span>Principio Activo</span></div>
            <div class="phase-desc">Analiza la historia clínica y los exámenes del paciente. Selecciona el fármaco de primera línea más adecuado.</div>
        </div>

        <div class="patient-card">
            <div class="pc-header">
                <div class="pc-avatar">${caseData.icon}</div>
                <div class="pc-info">
                    <h3>${p.name}</h3>
                    <div class="pc-subtitle">${p.age} años · ${p.sex === 'F' ? 'Femenino' : 'Masculino'} · ${p.weight_kg} kg · ${p.height_cm} cm · IMC ${p.imc}</div>
                </div>
            </div>
            <div class="pc-body">
                <div class="section-card">
                    <div class="sc-title">📋 Motivo de Consulta</div>
                    <p style="font-size:13px;color:var(--text2);line-height:1.6">${pr.chief_complaint}</p>
                </div>
                <div class="section-card">
                    <div class="sc-title">📝 Historia Clínica</div>
                    <p style="font-size:13px;color:var(--text2);line-height:1.6">${pr.history}</p>
                </div>
                <div class="section-card">
                    <div class="sc-title">🩺 Signos Vitales</div>
                    <div class="vitals-grid">${vitalsHtml}</div>
                </div>
                <div class="section-card">
                    <div class="sc-title">🔬 Exámenes de Laboratorio</div>
                    <div class="labs-grid">${labsHtml}</div>
                </div>
                <div class="section-card">
                    <div class="sc-title">⚠️ Comorbilidades</div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap">${comorb}</div>
                </div>
                <div class="section-card">
                    <div class="sc-title">💊 Medicación Actual</div>
                    <div class="labs-grid">${meds}</div>
                </div>
                <div class="section-card">
                    <div class="sc-title">🚫 Alergias</div>
                    <p style="font-size:13px;color:var(--text2)">${p.allergies.join(', ')}</p>
                </div>
            </div>
        </div>

        <div class="section-card">
            <div class="sc-title">💊 ¿Qué fármaco prescribes como primera línea?</div>
            <div class="drug-grid" id="drugGrid">
                ${drugs.map(d => `
                    <div class="drug-option" data-drugid="${d.id}">
                        <div class="do-icon">${d.icon}</div>
                        <div class="do-name">${d.inn}</div>
                        <div class="do-class">${d.class}</div>
                    </div>
                `).join('')}
            </div>
            <div id="drugInfo"></div>
            <div id="phase1Feedback"></div>
            <div class="btn-group">
                <button class="btn-primary" id="btnConfirmDrug" disabled>Confirmar Selección →</button>
            </div>
        </div>
    `;

    // Drug selection events
    game.querySelectorAll('.drug-option').forEach(opt => {
        opt.addEventListener('click', () => {
            game.querySelectorAll('.drug-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedDrug = opt.dataset.drugid;
            document.getElementById('btnConfirmDrug').disabled = false;
            showDrugInfo(selectedDrug);
        });
    });

    document.getElementById('btnConfirmDrug').addEventListener('click', () => {
        if (!selectedDrug) return;
        const result = window.PatientEngine.evaluatePhase1(selectedDrug);
        showPhaseFeedback('phase1Feedback', result);
        updateScore();
        document.getElementById('btnConfirmDrug').style.display = 'none';
        game.querySelectorAll('.drug-option').forEach(o => { o.style.pointerEvents = 'none'; });

        // Show next button
        const fb = document.getElementById('phase1Feedback');
        const nextBtn = document.createElement('div');
        nextBtn.className = 'btn-group';
        nextBtn.innerHTML = `<button class="btn-primary" id="btnToPhase2">Siguiente: Forma Farmacéutica →</button>`;
        fb.after(nextBtn);
        document.getElementById('btnToPhase2').addEventListener('click', () => {
            window.PatientEngine.nextPhase();
            renderStepper(2);
            renderPhase2();
        });
    });
}

function showDrugInfo(drugId) {
    const drug = window.PatientEngine.getDrugById(drugId);
    if (!drug) return;
    const container = document.getElementById('drugInfo');
    container.innerHTML = `
        <div class="drug-info">
            <div class="di-header">
                <div class="di-name">${drug.inn} — ${drug.molecular.formula}</div>
            </div>
            <div class="di-class">${drug.class}</div>
            <p style="font-size:12px;color:var(--text2);line-height:1.5;margin-top:8px">${drug.mechanism}</p>
            <div class="di-props">
                <div class="di-prop"><div class="di-prop-label">Peso Mol.</div><div class="di-prop-val">${drug.molecular.mw_base} <span class="vital-unit">g/mol</span></div></div>
                <div class="di-prop"><div class="di-prop-label">LogP</div><div class="di-prop-val">${drug.molecular.logP}</div></div>
                <div class="di-prop"><div class="di-prop-label">pKa</div><div class="di-prop-val">${drug.molecular.pka}</div></div>
                <div class="di-prop"><div class="di-prop-label">BCS</div><div class="di-prop-val">${drug.molecular.solubility_class.replace('BCS ','')}</div></div>
                <div class="di-prop"><div class="di-prop-label">t½</div><div class="di-prop-val">${drug.pharmacokinetics.half_life_h} <span class="vital-unit">h</span></div></div>
                <div class="di-prop"><div class="di-prop-label">Biodisponibilidad</div><div class="di-prop-val">${drug.pharmacokinetics.bioavailability || drug.pharmacokinetics.bioavailability_oral || '—'}%</div></div>
            </div>
        </div>
    `;
}

// ═══════════════════════════════════════
//  PHASE 2: PHARMACEUTICAL FORM
// ═══════════════════════════════════════
function renderPhase2() {
    const game = document.getElementById('screenGame');
    const caseData = window.PatientEngine.currentCase;
    const correctDrugId = caseData.correct_answers.phase1_drug;
    const drugToUse = window.PatientEngine.getDrugById(correctDrugId);
    const forms = drugToUse.forms;

    game.innerHTML = `
        <div class="phase-header">
            <div class="phase-badge">FASE 2 / 5</div>
            <div class="phase-title">Elige la <span>Forma Farmacéutica</span></div>
            <div class="phase-desc">Considerando la edad (${caseData.patient.age} años), peso (${caseData.patient.weight_kg} kg) y condición del paciente, ¿cuál es la forma farmacéutica más adecuada para <strong>${drugToUse.inn}</strong>?</div>
        </div>

        <div class="section-card">
            <div class="sc-title">📦 Formas disponibles de ${drugToUse.inn}</div>
            <div class="form-grid" id="formGrid">
                ${forms.map(f => `
                    <div class="form-option" data-form="${f.type}">
                        <div class="fo-icon">${window.PatientEngine._formIcon(f.type)}</div>
                        <div class="fo-name">${f.type}</div>
                        <div class="fo-strengths">${f.strengths.join(' · ')}</div>
                    </div>
                `).join('')}
            </div>
            <div id="phase2Feedback"></div>
            <div class="btn-group">
                <button class="btn-primary" id="btnConfirmForm" disabled>Confirmar Forma →</button>
            </div>
        </div>
    `;

    game.querySelectorAll('.form-option').forEach(opt => {
        opt.addEventListener('click', () => {
            game.querySelectorAll('.form-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedForm = opt.dataset.form;
            document.getElementById('btnConfirmForm').disabled = false;
        });
    });

    document.getElementById('btnConfirmForm').addEventListener('click', () => {
        if (!selectedForm) return;
        const result = window.PatientEngine.evaluatePhase2(selectedForm);
        showPhaseFeedback('phase2Feedback', result);
        updateScore();
        document.getElementById('btnConfirmForm').style.display = 'none';
        game.querySelectorAll('.form-option').forEach(o => { o.style.pointerEvents = 'none'; });

        const fb = document.getElementById('phase2Feedback');
        const nextBtn = document.createElement('div');
        nextBtn.className = 'btn-group';
        nextBtn.innerHTML = `<button class="btn-primary" id="btnToPhase3">Siguiente: Cálculo de Dosis →</button>`;
        fb.after(nextBtn);
        document.getElementById('btnToPhase3').addEventListener('click', () => {
            window.PatientEngine.nextPhase();
            renderStepper(3);
            renderPhase3();
        });
    });
}
// ═══════════════════════════════════════
//  PHASE 3: DOSE CALCULATION
// ═══════════════════════════════════════
function renderPhase3() {
    const game = document.getElementById('screenGame');
    const caseData = window.PatientEngine.currentCase;
    const correctDrugId = caseData.correct_answers.phase1_drug;
    const drug = window.PatientEngine.getDrugById(correctDrugId);
    const p = caseData.patient;
    const doseInfo = caseData.correct_answers.phase3_dose;

    game.innerHTML = `
        <div class="phase-header">
            <div class="phase-badge">FASE 3 / 5</div>
            <div class="phase-title">Calcula la <span>Dosis</span></div>
            <div class="phase-desc">Calcula la dosis diaria total de <strong>${drug.inn}</strong> para ${p.name} (${p.age} años, ${p.weight_kg} kg). Considera función renal, comorbilidades y guías clínicas.</div>
        </div>

        <div class="section-card">
            <div class="sc-title">📊 Datos del paciente relevantes para dosificación</div>
            <div class="vitals-grid">
                <div class="vital-item"><div class="vital-label">Peso</div><div class="vital-val">${p.weight_kg} <span class="vital-unit">kg</span></div></div>
                <div class="vital-item"><div class="vital-label">Edad</div><div class="vital-val">${p.age} <span class="vital-unit">años</span></div></div>
                ${caseData.presentation.labs.tfge ? `<div class="vital-item"><div class="vital-label">TFGe</div><div class="vital-val">${caseData.presentation.labs.tfge.value} <span class="vital-unit">mL/min</span></div></div>` : ''}
                ${caseData.presentation.labs.creatinina ? `<div class="vital-item"><div class="vital-label">Creatinina</div><div class="vital-val">${caseData.presentation.labs.creatinina.value} <span class="vital-unit">mg/dL</span></div></div>` : ''}
            </div>
        </div>

        <div class="section-card">
            <div class="sc-title">🧮 Tu cálculo de dosis</div>
            <div class="dose-form">
                <div class="df-field">
                    <label>Dosis diaria total (mg/día)</label>
                    <input type="number" id="inputDose" placeholder="Ej: ${doseInfo.daily_mg}" step="0.1">
                    <div class="df-hint">Ingresa la dosis diaria total en miligramos</div>
                </div>
                <div class="df-field">
                    <label>Frecuencia de administración</label>
                    <select id="inputFreq">
                        <option value="">— Seleccionar —</option>
                        <option value="1 vez al día">1 vez al día (c/24h)</option>
                        <option value="2 veces al día">2 veces al día (c/12h)</option>
                        <option value="3 veces al día">3 veces al día (c/8h)</option>
                        <option value="4 veces al día">4 veces al día (c/6h)</option>
                        <option value="según necesidad (SOS)">Según necesidad (SOS)</option>
                    </select>
                </div>
                <div class="df-field">
                    <label>Duración del tratamiento</label>
                    <input type="text" id="inputDuration" placeholder="Ej: 10 días, continuo, según control">
                </div>
            </div>
            <div id="phase3Feedback"></div>
            <div class="btn-group">
                <button class="btn-primary" id="btnConfirmDose">Confirmar Dosis →</button>
            </div>
        </div>
    `;

    document.getElementById('btnConfirmDose').addEventListener('click', () => {
        const dose = document.getElementById('inputDose').value;
        const freq = document.getElementById('inputFreq').value;
        const dur = document.getElementById('inputDuration').value;
        if (!dose) { showToast('Ingresa la dosis', 'error'); return; }
        const result = window.PatientEngine.evaluatePhase3(dose, freq, dur);
        showPhaseFeedback('phase3Feedback', result, true);
        updateScore();
        document.getElementById('btnConfirmDose').style.display = 'none';
        document.querySelectorAll('.dose-form input, .dose-form select').forEach(el => el.disabled = true);

        const fb = document.getElementById('phase3Feedback');
        const nextBtn = document.createElement('div');
        nextBtn.className = 'btn-group';
        nextBtn.innerHTML = `<button class="btn-primary" id="btnToPhase4">Siguiente: Receta Médica →</button>`;
        fb.after(nextBtn);
        document.getElementById('btnToPhase4').addEventListener('click', () => {
            window.PatientEngine.nextPhase();
            renderStepper(4);
            renderPhase4();
        });
    });
}

// ═══════════════════════════════════════
//  PHASE 4: PRESCRIPTION
// ═══════════════════════════════════════
function renderPhase4() {
    const game = document.getElementById('screenGame');
    const caseData = window.PatientEngine.currentCase;
    const correctDrugId = caseData.correct_answers.phase1_drug;
    const drug = window.PatientEngine.getDrugById(correctDrugId);
    const p = caseData.patient;
    const doseInfo = caseData.correct_answers.phase3_dose;
    const today = new Date().toLocaleDateString('es-CL');

    const rxTypes = window.PrescriptionSystem.rxTypes;

    game.innerHTML = `
        <div class="phase-header">
            <div class="phase-badge">FASE 4 / 5</div>
            <div class="phase-title">Emite la <span>Receta Médica</span></div>
            <div class="phase-desc">Selecciona el tipo de receta según normativa chilena (D.S. 466/84) y completa los campos obligatorios.</div>
        </div>

        <div class="section-card">
            <div class="sc-title">📋 Tipo de Receta</div>
            <div class="rx-types" id="rxTypesGrid">
                ${Object.entries(rxTypes).map(([key, info]) => `
                    <div class="rx-type-option" data-rxtype="${key}">
                        <div class="rto-name">${info.name}</div>
                        <div class="rto-ref">${info.ref} · Vigencia: ${info.validity} días</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section-card">
            <div class="sc-title">✍️ Completa la Receta</div>
            <div class="dose-form">
                <div class="df-field">
                    <label>Nombre del paciente</label>
                    <input type="text" id="rxPatient" value="${p.name}">
                </div>
                <div class="df-field">
                    <label>Fecha de emisión</label>
                    <input type="text" id="rxDate" value="${today}">
                </div>
                <div class="df-field">
                    <label>Medicamento (usar DCI — nombre genérico)</label>
                    <input type="text" id="rxDrugName" placeholder="Ej: ${drug.inn}">
                    <div class="df-hint">En Chile es OBLIGATORIO usar la Denominación Común Internacional (DCI). No marcas comerciales.</div>
                </div>
                <div class="df-field">
                    <label>Forma farmacéutica y concentración</label>
                    <input type="text" id="rxForm" placeholder="Ej: ${doseInfo.strength}">
                </div>
                <div class="df-field">
                    <label>Posología</label>
                    <input type="text" id="rxDose" placeholder="Ej: ${doseInfo.strength} ${doseInfo.frequency}">
                </div>
                <div class="df-field">
                    <label>Cantidad total a dispensar</label>
                    <input type="text" id="rxQuantity" placeholder="Ej: 30 comprimidos">
                </div>
                <div class="df-field">
                    <label>Nombre del prescriptor</label>
                    <input type="text" id="rxPrescriber" value="Dr. Estudiante PharmaSim">
                </div>
            </div>
            <div id="phase4Feedback"></div>
            <div class="btn-group">
                <button class="btn-primary" id="btnConfirmRx">Confirmar Receta →</button>
            </div>
        </div>
    `;

    // Rx type selection
    game.querySelectorAll('.rx-type-option').forEach(opt => {
        opt.addEventListener('click', () => {
            game.querySelectorAll('.rx-type-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedRxType = opt.dataset.rxtype;
        });
    });

    document.getElementById('btnConfirmRx').addEventListener('click', () => {
        if (!selectedRxType) { showToast('Selecciona el tipo de receta', 'error'); return; }
        const fields = {
            patient_name: document.getElementById('rxPatient').value,
            date: document.getElementById('rxDate').value,
            drug_name: document.getElementById('rxDrugName').value,
            form: document.getElementById('rxForm').value,
            dose: document.getElementById('rxDose').value,
            quantity: document.getElementById('rxQuantity').value,
            prescriber: document.getElementById('rxPrescriber').value
        };
        const result = window.PatientEngine.evaluatePhase4(selectedRxType, fields);
        showPhaseFeedback('phase4Feedback', result, true);
        updateScore();
        document.getElementById('btnConfirmRx').style.display = 'none';

        const fb = document.getElementById('phase4Feedback');
        const nextBtn = document.createElement('div');
        nextBtn.className = 'btn-group';
        nextBtn.innerHTML = `<button class="btn-primary" id="btnToPhase5">Siguiente: Dispensación →</button>`;
        fb.after(nextBtn);
        document.getElementById('btnToPhase5').addEventListener('click', () => {
            window.PatientEngine.nextPhase();
            renderStepper(5);
            renderPhase5();
        });
    });
}

// ═══════════════════════════════════════
//  PHASE 5: DISPENSATION & COUNSELING
// ═══════════════════════════════════════
function renderPhase5() {
    const game = document.getElementById('screenGame');
    const caseData = window.PatientEngine.currentCase;
    const counselItems = caseData.correct_answers.phase5_counseling;

    game.innerHTML = `
        <div class="phase-header">
            <div class="phase-badge">FASE 5 / 5</div>
            <div class="phase-title">Dispensa y <span>Educa al Paciente</span></div>
            <div class="phase-desc">El paciente está en la farmacia. Selecciona los puntos clave que le comunicarías para asegurar un uso seguro y efectivo del medicamento.</div>
        </div>

        <div class="section-card">
            <div class="sc-title">🗣️ ¿Qué le dirías al paciente?</div>
            <p style="font-size:12px;color:var(--text3);margin-bottom:12px">Selecciona todos los puntos que consideras importantes comunicar:</p>
            <div class="counsel-list" id="counselList">
                ${counselItems.map((item, i) => `
                    <div class="counsel-item" data-idx="${i}">
                        <div class="counsel-check"></div>
                        <div class="counsel-text">${item}</div>
                    </div>
                `).join('')}
            </div>
            <div id="phase5Feedback"></div>
            <div class="btn-group">
                <button class="btn-primary" id="btnConfirmCounsel">Finalizar Caso →</button>
            </div>
        </div>
    `;

    checkedCounsel = [];
    game.querySelectorAll('.counsel-item').forEach(item => {
        item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.idx);
            item.classList.toggle('checked');
            if (item.classList.contains('checked')) {
                item.querySelector('.counsel-check').textContent = '✓';
                if (!checkedCounsel.includes(idx)) checkedCounsel.push(idx);
            } else {
                item.querySelector('.counsel-check').textContent = '';
                checkedCounsel = checkedCounsel.filter(i => i !== idx);
            }
        });
    });

    document.getElementById('btnConfirmCounsel').addEventListener('click', () => {
        const result = window.PatientEngine.evaluatePhase5(checkedCounsel);
        showPhaseFeedback('phase5Feedback', result, true);
        updateScore();
        document.getElementById('btnConfirmCounsel').style.display = 'none';
        game.querySelectorAll('.counsel-item').forEach(el => el.style.pointerEvents = 'none');

        const fb = document.getElementById('phase5Feedback');
        const nextBtn = document.createElement('div');
        nextBtn.className = 'btn-group';
        nextBtn.innerHTML = `<button class="btn-primary" id="btnShowResults">Ver Resultados Finales ⭐</button>`;
        fb.after(nextBtn);
        document.getElementById('btnShowResults').addEventListener('click', showResults);
    });
}

// ═══════════════════════════════════════
//  RESULTS
// ═══════════════════════════════════════
function showResults() {
    const results = window.PatientEngine.getFinalResults();
    document.getElementById('screenGame').classList.add('hidden');
    document.getElementById('stepper').classList.add('hidden');
    const screen = document.getElementById('screenResults');
    screen.classList.remove('hidden');

    const phaseNames = ['Principio Activo', 'Forma Farmacéutica', 'Cálculo de Dosis', 'Receta Médica', 'Dispensación'];
    const phaseKeys = ['phase1', 'phase2', 'phase3', 'phase4', 'phase5'];
    const caseData = window.PatientEngine.currentCase;

    screen.innerHTML = `
        <div class="results-card">
            <div class="results-grade" style="color:${results.gradeColor}">${results.grade}</div>
            <div class="results-label">${results.gradeLabel}</div>
            <div class="results-desc">${results.gradeDesc}</div>
            <div class="results-score">${results.totalScore} <span>/ ${results.maxScore} puntos (${results.percentage}%)</span></div>

            <div class="phase-results">
                ${phaseKeys.map((k, i) => {
                    const pts = results.phaseScores[k] || 0;
                    const max = caseData.scoring[k];
                    const pct = max > 0 ? Math.round((pts / max) * 100) : 0;
                    const color = pct >= 75 ? 'var(--green)' : pct >= 50 ? 'var(--amber)' : 'var(--red)';
                    return `
                        <div class="pr-item">
                            <span class="pr-name">${phaseNames[i]}</span>
                            <div class="pr-bar"><div class="pr-fill" style="width:${pct}%;background:${color}"></div></div>
                            <span class="pr-score" style="color:${color}">${pts}/${max}</span>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="btn-group">
                <button class="btn-primary" id="btnNewCase">🔄 Nuevo Caso Clínico</button>
                <button class="btn-secondary" id="btnBackMenu">← Volver al Menú</button>
            </div>
        </div>
    `;

    document.getElementById('btnNewCase').addEventListener('click', () => {
        window.PatientEngine.reset();
        screen.classList.add('hidden');
        document.getElementById('screenCases').classList.remove('hidden');
        document.getElementById('scoreBadge').style.display = 'none';
        document.getElementById('liveScore').textContent = '0';
    });
    document.getElementById('btnBackMenu').addEventListener('click', () => {
        window.PatientEngine.reset();
        screen.classList.add('hidden');
        document.getElementById('screenCases').classList.remove('hidden');
        document.getElementById('scoreBadge').style.display = 'none';
        document.getElementById('liveScore').textContent = '0';
    });
}

// ═══════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════
function showPhaseFeedback(containerId, result, isMulti = false) {
    const el = document.getElementById(containerId);
    const isCorrect = result.isCorrect !== undefined ? result.isCorrect : (result.pts >= result.maxPts * 0.6);
    const cls = isCorrect ? 'correct' : (result.pts > 0 ? 'info' : 'wrong');

    let feedbackHtml = '';
    if (isMulti && Array.isArray(result.feedback)) {
        feedbackHtml = result.feedback.map(f => `<p>${f}</p>`).join('');
    } else if (typeof result.feedback === 'string') {
        feedbackHtml = `<p>${result.feedback}</p>`;
    } else if (Array.isArray(result.feedback)) {
        feedbackHtml = result.feedback.map(f => `<p>${f}</p>`).join('');
    }

    el.innerHTML = `
        <div class="feedback-box ${cls}">
            <div class="fb-text">
                <p><strong>${result.pts}/${result.maxPts} puntos</strong></p>
                ${feedbackHtml}
            </div>
        </div>
    `;
}

function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3200);
}
