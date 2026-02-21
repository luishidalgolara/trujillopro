/**
 * PHARMASIM — main.js (Módulo 03: Regulatorio ISP)
 * Controlador principal del Simulador de Expediente Regulatorio
 */

// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
const STATE = {
    started: false,
    currentSection: null,     // e.g. 'm1s1'
    formData: {},             // all field values across all sections
    sectionStatuses: {},      // { 'm1s1': { status: 'done'|'partial'|'empty'|'error', required: true } }
    allIssues: [],            // cross-section regulatory issues
    completionPct: 0,
    inspectorMode: 'errors',  // errors | timeline | glossary
};

// Ordered list of sections to fill
const SECTION_ORDER = ['m1s1','m1s2','m1s3','m1s4','m2s1','m2s5','m4s2','m5s1'];
let currentSectionIndex = 0;

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    buildCTDTree();
    renderGlossary();
    renderTimeline();
    setupInspectorTabs();
    setupGlossarySearch();

    document.getElementById('btnStartDossier').addEventListener('click', startDossier);
    document.getElementById('btnFormBack').addEventListener('click', goBack);
    document.getElementById('btnFormNext').addEventListener('click', saveAndNext);
    document.getElementById('btnRestartISP').addEventListener('click', restartDossier);
    document.getElementById('btnFixErrors').addEventListener('click', () => {
        document.getElementById('rejectionOverlay').style.display = 'none';
    });
    document.getElementById('btnDownloadDossier').addEventListener('click', downloadResolution);

    // Initialize section statuses
    window.CTD_STRUCTURE.forEach(mod => {
        mod.sections.forEach(sec => {
            STATE.sectionStatuses[sec.id] = {
                status: 'empty',
                required: sec.required,
                name: sec.name
            };
        });
    });
});

// ═══════════════════════════════════════════════════════════════
//  CTD TREE
// ═══════════════════════════════════════════════════════════════
function buildCTDTree() {
    const tree = document.getElementById('ctdTree');
    tree.innerHTML = window.CTD_STRUCTURE.map(mod => {
        const sections = mod.sections.map(sec => {
            const hasForm = !!window.FORM_DEFINITIONS[sec.id];
            return `
                <div class="ctd-section ${hasForm ? 'clickable' : ''}" 
                     data-secid="${sec.id}" 
                     id="nav_${sec.id}"
                     ${hasForm ? '' : 'style="opacity:.5;cursor:default"'}>
                    <div class="ctd-sec-status" id="status_${sec.id}">
                        ${sec.required ? '' : ''}
                    </div>
                    <span class="ctd-sec-name">${sec.name}</span>
                    <span class="ctd-sec-req ${sec.required ? 'req' : 'opt'}">${sec.required ? 'REQ' : 'OPT'}</span>
                </div>
            `;
        }).join('');

        return `
            <div class="ctd-module" id="mod_${mod.id}">
                <div class="ctd-mod-header" data-modid="${mod.id}">
                    <div class="ctd-mod-num">M${mod.num}</div>
                    <span class="ctd-mod-name">${mod.name}</span>
                    <span class="ctd-mod-complete" id="modpct_${mod.id}">0/${mod.sections.length}</span>
                    <span class="ctd-expand-icon">▶</span>
                </div>
                <div class="ctd-sections" id="secs_${mod.id}">
                    ${sections}
                </div>
            </div>
        `;
    }).join('');

    // Expand/collapse modules
    tree.querySelectorAll('.ctd-mod-header').forEach(hdr => {
        hdr.addEventListener('click', () => {
            const id = hdr.dataset.modid;
            const secs = document.getElementById('secs_' + id);
            hdr.classList.toggle('open');
            secs.classList.toggle('open');
        });
    });

    // Navigate to sections
    tree.querySelectorAll('.ctd-section[data-secid]').forEach(sec => {
        sec.addEventListener('click', () => {
            const id = sec.dataset.secid;
            if (!window.FORM_DEFINITIONS[id]) return;
            if (!STATE.started) startDossier();
            setTimeout(() => goToSection(id), 100);
        });
    });
}

function updateCTDTree() {
    window.CTD_STRUCTURE.forEach(mod => {
        let doneCount = 0;
        mod.sections.forEach(sec => {
            const st = STATE.sectionStatuses[sec.id];
            const el = document.getElementById('status_' + sec.id);
            if (el) {
                el.className = 'ctd-sec-status';
                if (st.status === 'done')    { el.classList.add('done');    el.textContent = '✓'; doneCount++; }
                else if (st.status === 'partial') { el.classList.add('partial'); el.textContent = '…'; }
                else if (st.status === 'error')   { el.classList.add('error');   el.textContent = '!'; }
                else { el.textContent = ''; }
            }
            const navEl = document.getElementById('nav_' + sec.id);
            if (navEl) {
                navEl.classList.toggle('active', sec.id === STATE.currentSection);
            }
        });
        const pctEl = document.getElementById('modpct_' + mod.id);
        if (pctEl) pctEl.textContent = `${doneCount}/${mod.sections.length}`;
    });
}

// ═══════════════════════════════════════════════════════════════
//  DOSSIER FLOW
// ═══════════════════════════════════════════════════════════════
function startDossier() {
    STATE.started = true;
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('formArea').classList.remove('hidden');

    // Open first CTD module
    document.querySelector('.ctd-mod-header').classList.add('open');
    document.querySelector('.ctd-sections').classList.add('open');

    goToSection(SECTION_ORDER[0]);
    showToast('📋 Expediente iniciado — Completa todos los módulos', 'info');
}

function goToSection(sectionId) {
    STATE.currentSection = sectionId;
    currentSectionIndex = SECTION_ORDER.indexOf(sectionId);
    const formDef = window.FORM_DEFINITIONS[sectionId];
    if (!formDef) return;

    // Update header
    document.getElementById('fhBreadcrumb').textContent = formDef.breadcrumb;
    document.getElementById('fhTitle').textContent      = formDef.title;
    document.getElementById('fhDesc').textContent       = formDef.desc;
    document.getElementById('fhRef').textContent        = formDef.ref;

    // Render form
    renderFormBody(formDef, sectionId);

    // Nav buttons
    const backBtn = document.getElementById('btnFormBack');
    backBtn.style.visibility = currentSectionIndex > 0 ? 'visible' : 'hidden';

    const isLast = currentSectionIndex >= SECTION_ORDER.length - 1;
    document.getElementById('btnFormNext').textContent = isLast
        ? 'Enviar Expediente ✓'
        : 'Guardar y Siguiente →';

    // Section dots
    renderSectionDots();
    updateCTDTree();

    // Restore saved values
    restoreFormValues(sectionId);

    // Run validation on already-saved data
    runValidation(sectionId);
}

function goBack() {
    if (currentSectionIndex > 0) {
        const prevId = SECTION_ORDER[currentSectionIndex - 1];
        saveCurrentSection(false);
        goToSection(prevId);
    }
}

function saveAndNext() {
    const valid = saveCurrentSection(true);
    const isLast = currentSectionIndex >= SECTION_ORDER.length - 1;

    if (isLast) {
        submitDossier();
    } else {
        const nextId = SECTION_ORDER[currentSectionIndex + 1];
        goToSection(nextId);
    }
}

function renderSectionDots() {
    const container = document.getElementById('ffProgress');
    container.innerHTML = SECTION_ORDER.map((id, i) => {
        const st = STATE.sectionStatuses[id];
        let cls = '';
        if (i === currentSectionIndex) cls = 'active';
        else if (st && st.status === 'done') cls = 'done';
        return `<div class="fp-dot ${cls}" title="${window.FORM_DEFINITIONS[id]?.title || id}"></div>`;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════
//  FORM RENDERING
// ═══════════════════════════════════════════════════════════════
function renderFormBody(formDef, sectionId) {
    const body = document.getElementById('formBody');
    body.innerHTML = formDef.groups.map(group => {
        const fieldsHtml = group.fields.map(field => renderField(field, sectionId)).join('');
        return `
            <div class="field-group">
                <div class="fg-header">
                    <div class="fg-num">${group.num}</div>
                    <span class="fg-title">${group.title}</span>
                    ${group.mandatory ? '<span class="fg-mandatory">OBLIGATORIO</span>' : ''}
                </div>
                <div class="fg-body">
                    ${fieldsHtml}
                </div>
            </div>
        `;
    }).join('');

    // Attach events
    attachFieldEvents(body, sectionId);
}

function renderField(field, sectionId) {
    const val = STATE.formData[field.id] || '';
    const reqMark = field.required ? '<span class="field-req">*</span>' : '';
    const tooltipHtml = field.tooltip ? `<span class="field-tooltip" title="${field.tooltip}">?</span>` : '';
    const labelHtml = `<label for="${field.id}">${field.label} ${reqMark} ${tooltipHtml}</label>`;
    const hintHtml = field.hint ? `<div class="field-hint">${field.hint}</div>` : '';

    let inputHtml = '';

    if (field.type === 'text' || field.type === 'email') {
        inputHtml = `<input type="text" id="${field.id}" name="${field.id}" 
                     placeholder="${field.placeholder || ''}" value="${escHtml(val)}"
                     autocomplete="off">`;

    } else if (field.type === 'textarea') {
        inputHtml = `<textarea id="${field.id}" name="${field.id}" 
                     placeholder="${field.placeholder || ''}">${escHtml(val)}</textarea>`;

    } else if (field.type === 'select') {
        const opts = field.options.map(o =>
            `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`
        ).join('');
        inputHtml = `<select id="${field.id}" name="${field.id}">${opts}</select>`;

    } else if (field.type === 'radio') {
        inputHtml = `<div class="radio-group">
            ${field.options.map(opt => `
                <label class="radio-option ${val === opt.val ? 'selected' : ''}">
                    <input type="radio" name="${field.id}" value="${opt.val}" ${val === opt.val ? 'checked' : ''}>
                    <div class="radio-dot"></div>
                    <span class="radio-label">${opt.label}</span>
                    <span class="radio-sublabel">${opt.sub}</span>
                </label>
            `).join('')}
        </div>`;

    } else if (field.type === 'checkbox') {
        const checked = Array.isArray(val) ? val : (val ? val.split('||') : []);
        inputHtml = `<div class="check-group">
            ${field.options.map(opt => `
                <label class="check-item ${checked.includes(opt) ? 'checked' : ''}">
                    <div class="check-box">${checked.includes(opt) ? '✓' : ''}</div>
                    <span class="check-label">${opt}</span>
                    <input type="checkbox" name="${field.id}" value="${opt}" 
                           ${checked.includes(opt) ? 'checked' : ''} style="display:none">
                </label>
            `).join('')}
        </div>`;

    } else if (field.type === 'checkbox_single') {
        const isChecked = val === true || val === 'true';
        inputHtml = `<label class="check-item ${isChecked ? 'checked' : ''}">
            <div class="check-box">${isChecked ? '✓' : ''}</div>
            <span class="check-label">${field.label}</span>
            <input type="checkbox" id="${field.id}" name="${field.id}" 
                   ${isChecked ? 'checked' : ''} style="display:none">
        </label>`;
        // For single checkboxes, don't repeat label outside
        return `
            <div class="field" id="field_wrap_${field.id}">
                ${inputHtml}
                ${hintHtml}
                <div class="field-error" id="err_${field.id}" style="display:none"></div>
            </div>
        `;

    } else if (field.type === 'upload') {
        const isUploaded = val && val !== '';
        const filename = isUploaded ? val : '';
        inputHtml = `
            <div class="upload-area ${isUploaded ? 'uploaded' : ''}" 
                 id="upload_${field.id}" data-fieldid="${field.id}">
                <div class="ua-icon">${isUploaded ? '📄' : '📂'}</div>
                <div class="ua-label">${isUploaded ? 'Documento cargado' : 'Haz clic para simular carga de documento'}</div>
                <div class="ua-hint">PDF, Word o ZIP · Máx. 50MB</div>
                ${isUploaded ? `<div class="ua-file">✓ ${filename}</div>` : ''}
            </div>`;
    }

    // For checkbox_single handled above
    return `
        <div class="field" id="field_wrap_${field.id}">
            ${field.type !== 'checkbox_single' ? labelHtml : ''}
            ${inputHtml}
            ${hintHtml}
            <div class="field-error" id="err_${field.id}" style="display:none"></div>
        </div>
    `;
}

function attachFieldEvents(body, sectionId) {
    // Text / textarea / select
    body.querySelectorAll('input[type=text], textarea, select').forEach(el => {
        el.addEventListener('input', () => {
            STATE.formData[el.name || el.id] = el.value;
            liveValidateField(el.name || el.id, el.value, sectionId);
            debouncedCrossValidate();
        });
        el.addEventListener('change', () => {
            STATE.formData[el.name || el.id] = el.value;
            debouncedCrossValidate();
        });
    });

    // Radio
    body.querySelectorAll('.radio-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const input = opt.querySelector('input[type=radio]');
            if (!input) return;
            const name = input.name;
            body.querySelectorAll(`.radio-option`).forEach(o => {
                if (o.querySelector(`input[name="${name}"]`)) o.classList.remove('selected');
            });
            opt.classList.add('selected');
            input.checked = true;
            STATE.formData[name] = input.value;
            debouncedCrossValidate();
        });
    });

    // Checkboxes (multi)
    body.querySelectorAll('.check-item').forEach(item => {
        item.addEventListener('click', () => {
            const input = item.querySelector('input[type=checkbox]');
            if (!input) return;

            if (input.name === input.id) {
                // Single checkbox
                input.checked = !input.checked;
                item.classList.toggle('checked', input.checked);
                item.querySelector('.check-box').textContent = input.checked ? '✓' : '';
                STATE.formData[input.id] = input.checked;
            } else {
                // Multi checkbox
                input.checked = !input.checked;
                item.classList.toggle('checked', input.checked);
                item.querySelector('.check-box').textContent = input.checked ? '✓' : '';

                const name = input.name;
                const checked = [];
                body.querySelectorAll(`input[name="${name}"]:checked`).forEach(cb => checked.push(cb.value));
                STATE.formData[name] = checked;
            }
            debouncedCrossValidate();
        });
    });

    // Upload areas
    body.querySelectorAll('.upload-area').forEach(area => {
        area.addEventListener('click', () => {
            const fieldId = area.dataset.fieldid;
            // Simulate file upload
            const fileName = `${fieldId.replace(/_/g,'-')}_documento.pdf`;
            STATE.formData[fieldId] = fileName;
            area.classList.add('uploaded');
            area.innerHTML = `
                <div class="ua-icon">📄</div>
                <div class="ua-label">Documento cargado</div>
                <div class="ua-hint">PDF, Word o ZIP · Máx. 50MB</div>
                <div class="ua-file">✓ ${fileName}</div>
            `;
            liveValidateField(fieldId, fileName, sectionId);
            debouncedCrossValidate();
            showToast('📄 Documento simulado adjunto', 'success');
        });
    });
}

function restoreFormValues(sectionId) {
    // Values already set via renderField from STATE.formData
    // Just re-run validation
    runValidation(sectionId);
}

// ═══════════════════════════════════════════════════════════════
//  VALIDATION
// ═══════════════════════════════════════════════════════════════
let crossValidateTimer = null;
function debouncedCrossValidate() {
    clearTimeout(crossValidateTimer);
    crossValidateTimer = setTimeout(() => {
        runCrossValidation();
        updateDossierProgress();
    }, 600);
}

function liveValidateField(fieldId, value, sectionId) {
    const formDef = window.FORM_DEFINITIONS[sectionId];
    if (!formDef) return;
    let fieldDef = null;
    for (const g of formDef.groups) {
        fieldDef = g.fields.find(f => f.id === fieldId);
        if (fieldDef) break;
    }
    if (!fieldDef) return;

    const errors = window.ISPValidator.validateField(fieldDef, value, STATE.formData);
    const errEl  = document.getElementById('err_' + fieldId);
    const input  = document.getElementById(fieldId);

    if (errEl) {
        if (errors.length > 0) {
            errEl.style.display = 'flex';
            errEl.textContent = '⚠ ' + errors[0];
            if (input) input.classList.add('error');
        } else {
            errEl.style.display = 'none';
            if (input) { input.classList.remove('error'); input.classList.add('valid'); }
        }
    }
}

function runValidation(sectionId) {
    const formDef = window.FORM_DEFINITIONS[sectionId];
    if (!formDef) return;

    const vbar = document.getElementById('validationBar');
    vbar.innerHTML = '';

    let hasError = false, hasValue = false;
    for (const group of formDef.groups) {
        for (const field of group.fields) {
            const val = STATE.formData[field.id];
            if (val !== undefined && val !== '' && val !== null) hasValue = true;
            if (field.required && (!val || val === '— Seleccionar —')) hasError = true;
        }
    }

    if (hasValue && !hasError) {
        vbar.innerHTML = `<div class="vb-entry ok">✓ Sección lista para guardar</div>`;
    } else if (hasError) {
        vbar.innerHTML = `<div class="vb-entry error">⚠ Completa todos los campos obligatorios (*)</div>`;
    }
}

function saveCurrentSection(showValidation) {
    if (!STATE.currentSection) return false;
    const formDef = window.FORM_DEFINITIONS[STATE.currentSection];
    if (!formDef) return true;

    // Count filled required fields
    let total = 0, filled = 0;
    for (const group of formDef.groups) {
        for (const field of group.fields) {
            if (!field.required) continue;
            total++;
            const val = STATE.formData[field.id];
            if (val && val !== '— Seleccionar —' && val !== '' && val !== false) filled++;
        }
    }

    const pct = total > 0 ? filled / total : 1;
    STATE.sectionStatuses[STATE.currentSection].status =
        pct >= 1 ? 'done' : pct > 0 ? 'partial' : 'empty';

    updateCTDTree();
    updateDossierProgress();
    runCrossValidation();

    if (filled > 0) {
        showToast(`✓ ${STATE.currentSection.toUpperCase()} guardado`, 'success');
    }
    return true;
}

function runCrossValidation() {
    STATE.allIssues = window.ISPValidator.crossCheck(STATE.formData);
    renderInspectorErrors();
}

function updateDossierProgress() {
    STATE.completionPct = window.ISPValidator.computeCompletion(STATE.sectionStatuses);
    document.getElementById('dossierPct').textContent = STATE.completionPct + '%';
    document.getElementById('dossierFill').style.width = STATE.completionPct + '%';

    // Update status badge
    const dot   = document.querySelector('.status-dot');
    const label = dot?.nextSibling;
    if (STATE.completionPct >= 80) {
        dot?.classList.remove('pending'); dot?.classList.add('approved');
        if (label) label.textContent = ' Listo para envío';
    }

    // Update exp status
    const expStatus = document.getElementById('expStatus');
    if (expStatus) {
        expStatus.querySelector('span:last-child').textContent =
            STATE.completionPct === 0 ? 'En construcción' :
            STATE.completionPct < 50  ? `${STATE.completionPct}% completado` :
            STATE.completionPct < 100 ? `${STATE.completionPct}% — Casi listo` :
            'Listo para envío';
    }

    // Update timeline
    renderTimeline();
}

// ═══════════════════════════════════════════════════════════════
//  INSPECTOR PANEL
// ═══════════════════════════════════════════════════════════════
function renderInspectorErrors() {
    const list = document.getElementById('errorsList');
    const issues = STATE.allIssues;

    let criticals = 0, warnings = 0, oks = 0;
    issues.forEach(i => {
        if (i.type === 'critical') criticals++;
        else if (i.type === 'warning') warnings++;
        else if (i.type === 'ok') oks++;
    });

    document.getElementById('numCritical').textContent = criticals;
    document.getElementById('numWarn').textContent      = warnings;
    document.getElementById('numOk').textContent        = oks;

    if (issues.length === 0) {
        list.innerHTML = `<div class="errors-idle"><div style="font-size:28px;margin-bottom:8px">🔍</div><span>Completa los formularios para ver el análisis regulatorio en tiempo real</span></div>`;
        return;
    }

    list.innerHTML = issues.map(issue => `
        <div class="err-item ${issue.type}">
            <div class="ei-header">
                <span class="ei-icon">${issue.icon}</span>
                <span class="ei-title">${issue.title}</span>
            </div>
            <div class="ei-msg">${issue.msg}</div>
            ${issue.ref ? `<div class="ei-ref">Ref: ${issue.ref}</div>` : ''}
        </div>
    `).join('');
}

function renderTimeline() {
    window.TimelineRenderer.render('regTimeline', STATE.completionPct);
}

function renderGlossary(filter) {
    const list = document.getElementById('glossaryList');
    const terms = filter
        ? window.ISP_GLOSSARY.filter(g =>
            g.term.toLowerCase().includes(filter.toLowerCase()) ||
            g.def.toLowerCase().includes(filter.toLowerCase())
          )
        : window.ISP_GLOSSARY;

    list.innerHTML = terms.map(g => `
        <div class="gl-item">
            <div class="gl-term">${g.term}</div>
            <div class="gl-def">${g.def}</div>
            <div class="gl-ref">${g.ref}</div>
        </div>
    `).join('');
}

function setupInspectorTabs() {
    document.querySelectorAll('.ipm-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.ipm-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.ip-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.dataset.mode;
            document.getElementById('ip' + mode.charAt(0).toUpperCase() + mode.slice(1))?.classList.add('active');
        });
    });
}

function setupGlossarySearch() {
    const input = document.getElementById('glossSearch');
    if (input) {
        input.addEventListener('input', () => renderGlossary(input.value));
    }
}

// ═══════════════════════════════════════════════════════════════
//  SUBMISSION
// ═══════════════════════════════════════════════════════════════
function submitDossier() {
    saveCurrentSection(false);

    const criticals = STATE.allIssues.filter(i => i.type === 'critical');

    if (criticals.length > 0) {
        // Show rejection
        const rmBody = document.getElementById('rmBody');
        rmBody.innerHTML = `
            <p style="font-size:13px;color:#8899b4;margin-bottom:14px;line-height:1.6">
                El expediente fue rechazado por ${criticals.length} error(es) crítico(s). 
                Corrige los siguientes problemas antes de reenviar:
            </p>
            ${criticals.map(c => `<div class="rm-error"><strong>${c.icon} ${c.title}</strong><br>${c.msg}</div>`).join('')}
        `;
        document.getElementById('rejectionOverlay').style.display = 'flex';
        showToast('⛔ Expediente rechazado — ' + criticals.length + ' error(es) crítico(s)', 'error');
        return;
    }

    if (STATE.completionPct < 60) {
        showToast('⚠ Expediente incompleto — completa más secciones', 'warn');
        return;
    }

    // Generate registration number
    const regNumber = window.generateISPNumber(
        STATE.formData['brand_name'],
        STATE.formData['lab_name']
    );

    // Generate resolution
    const resolution = window.DossierBuilder.generateResolution(STATE.formData, regNumber);
    window.DossierBuilder.renderApprovalModal(resolution);
    window._lastResolution = resolution;

    // Show approval
    document.getElementById('approvalOverlay').style.display = 'flex';

    // Update status
    const dot = document.querySelector('.status-dot');
    dot?.classList.remove('pending'); dot?.classList.add('approved');

    showToast('🏆 ¡Medicamento registrado exitosamente!', 'success');
}

function downloadResolution() {
    if (!window._lastResolution) return;
    const text = window.DossierBuilder.generatePrintableResolution(window._lastResolution);
    const blob = new Blob([text], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `Resolucion_ISP_${window._lastResolution.regNumber.replace(/\./g,'-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Resolución descargada', 'success');
}

function restartDossier() {
    STATE.formData      = {};
    STATE.sectionStatuses = {};
    STATE.allIssues     = [];
    STATE.completionPct = 0;
    STATE.currentSection = null;
    STATE.started       = false;
    currentSectionIndex = 0;

    window.CTD_STRUCTURE.forEach(mod => {
        mod.sections.forEach(sec => {
            STATE.sectionStatuses[sec.id] = { status: 'empty', required: sec.required, name: sec.name };
        });
    });

    document.getElementById('approvalOverlay').style.display = 'none';
    document.getElementById('welcomeScreen').style.display   = 'flex';
    document.getElementById('formArea').classList.add('hidden');

    document.getElementById('dossierPct').textContent  = '0%';
    document.getElementById('dossierFill').style.width = '0%';

    buildCTDTree();
    renderInspectorErrors();
    renderTimeline();

    showToast('🔄 Nuevo expediente iniciado', 'info');
}

// ═══════════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════════
function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`; t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3200);
}
