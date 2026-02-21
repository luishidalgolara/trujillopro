/**
 * PHARMASIM — timeline.js + dossier-builder.js (combined)
 * Renderizado de línea de tiempo regulatoria y generador de resolución
 */

// ── TIMELINE RENDERER ─────────────────────────────────────────────────────
window.TimelineRenderer = {

    render(containerId, completionPct) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const items = window.ISP_TIMELINE;
        let totalMin = 0, totalMax = 0;

        // Determine active step based on completion
        let activeStep = 0;
        if (completionPct >= 20)  activeStep = 1;
        if (completionPct >= 40)  activeStep = 2;
        if (completionPct >= 60)  activeStep = 3;
        if (completionPct >= 75)  activeStep = 4;
        if (completionPct >= 100) activeStep = 6;

        container.innerHTML = items.map((item, idx) => {
            const isDone    = idx < activeStep;
            const isActive  = idx === activeStep;
            const isBlocked = false;

            const cls = isDone ? 'done' : isActive ? 'active' : '';

            // Accumulate time
            const dParts = item.duration.match(/(\d+)/g) || ['30'];
            const dMin = parseInt(dParts[0]) || 15;
            const dMax = parseInt(dParts[1]) || dMin * 2;
            if (!item.optional) { totalMin += dMin; totalMax += dMax; }

            const badgesHtml = `
                <span class="tl-badge duration">⏱ ${item.duration}</span>
                ${item.fee !== 'Sin costo' && item.fee !== 'Incluido' ? `<span class="tl-badge fee">${item.fee}</span>` : ''}
                ${item.optional ? '<span class="tl-badge optional">Opcional</span>' : '<span class="tl-badge requirement">Obligatorio</span>'}
            `;

            return `
                <div class="tl-item ${cls}">
                    <div class="tl-marker">${item.num}</div>
                    <div class="tl-content">
                        <div class="tl-title">${item.title}</div>
                        <div class="tl-desc">${item.desc}</div>
                        <div class="tl-meta">${badgesHtml}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Total
        const totalEl = document.getElementById('timelineTotal');
        if (totalEl) {
            totalEl.innerHTML = `
                <span class="tt-label">Tiempo total estimado:</span>
                <span class="tt-val">${Math.round(totalMin/30)}-${Math.round(totalMax/30)} meses</span>
            `;
        }
    }
};

// ── DOSSIER BUILDER ───────────────────────────────────────────────────────
window.DossierBuilder = {

    /**
     * Generate the ISP approval resolution text
     */
    generateResolution(formData, regNumber) {
        const brandName  = formData['brand_name']     || 'MEDICAMENTO SIMULADO';
        const innName    = formData['inn_name']        || 'principio activo';
        const form       = formData['drug_form']       || 'comprimido';
        const potency    = formData['potency']         || '—';
        const labName    = formData['lab_name']        || 'Laboratorio Simulado S.A.';
        const labRut     = formData['lab_rut']         || '00.000.000-0';
        const indication = formData['indication']      || 'Según ficha técnica aprobada';
        const shelfLife  = formData['shelf_life']      || '24 meses';
        const storage    = formData['storage_cond']    || 'Temperatura ambiente';
        const rxClass    = formData['rx_class']        || 'Venta Bajo Receta';
        const today      = new Date().toLocaleDateString('es-CL');

        return {
            regNumber,
            brandName,
            innName,
            form,
            potency,
            labName,
            labRut,
            indication,
            shelfLife,
            storage,
            rxClass,
            date: today,
            approvedBy: 'Jefe Depto. Medicamentos de Síntesis Química',
            resolution: `RESOLUCIÓN EXENTA ISP N° ${regNumber}`,
            conditions: [
                'El registro tiene vigencia de 5 años desde la fecha de emisión.',
                'El laboratorio debe implementar un sistema de farmacovigilancia activa.',
                'Cualquier modificación a la formulación o proceso requiere autorización previa del ISP.',
                'Se debe notificar al ISP toda RAM grave dentro de 15 días calendario.',
                'El laboratorio debe mantener vigente el certificado BPM durante toda la vigencia del registro.',
            ]
        };
    },

    /**
     * Render approval modal content
     */
    renderApprovalModal(resolution) {
        const body = document.getElementById('amBody');
        if (!body) return;

        body.innerHTML = `
            <div class="am-field">
                <span class="amf-label">N° Registro ISP</span>
                <span class="amf-val reg">${resolution.regNumber}</span>
            </div>
            <div class="am-field">
                <span class="amf-label">Medicamento</span>
                <span class="amf-val">${resolution.brandName} (${resolution.innName})</span>
            </div>
            <div class="am-field">
                <span class="amf-label">Forma Farmacéutica</span>
                <span class="amf-val">${resolution.form} ${resolution.potency}</span>
            </div>
            <div class="am-field">
                <span class="amf-label">Laboratorio Titular</span>
                <span class="amf-val">${resolution.labName}</span>
            </div>
            <div class="am-field">
                <span class="amf-label">Condición de Venta</span>
                <span class="amf-val">${resolution.rxClass}</span>
            </div>
            <div class="am-field">
                <span class="amf-label">Vida Útil</span>
                <span class="amf-val">${resolution.shelfLife}</span>
            </div>
            <div class="am-field">
                <span class="amf-label">Fecha de Resolución</span>
                <span class="amf-val">${resolution.date}</span>
            </div>
            <div class="am-field">
                <span class="amf-label">Aprobado por</span>
                <span class="amf-val">${resolution.approvedBy}</span>
            </div>
        `;
    },

    /**
     * Generate downloadable resolution text
     */
    generatePrintableResolution(resolution) {
        const conditions = resolution.conditions.map((c,i) => `${i+1}. ${c}`).join('\n');
        return `
╔══════════════════════════════════════════════════════════════╗
║           INSTITUTO DE SALUD PÚBLICA DE CHILE               ║
║        DEPARTAMENTO DE MEDICAMENTOS — MINSAL                 ║
╚══════════════════════════════════════════════════════════════╝

${resolution.resolution}
Fecha: ${resolution.date}

REGISTRO SANITARIO DE MEDICAMENTO

I. IDENTIFICACIÓN DEL PRODUCTO
─────────────────────────────────
Nombre de Fantasía:     ${resolution.brandName}
Denominación Común:     ${resolution.innName}
Forma Farmacéutica:     ${resolution.form}
Concentración:          ${resolution.potency}
Laboratorio Titular:    ${resolution.labName} (RUT ${resolution.labRut})
Condición de Venta:     ${resolution.rxClass}
Vida Útil:              ${resolution.shelfLife}
Almacenamiento:         ${resolution.storage}

II. INDICACIONES APROBADAS
─────────────────────────────────
${resolution.indication}

III. CONDICIONES DEL REGISTRO
─────────────────────────────────
${conditions}

IV. FIRMA ELECTRÓNICA AVANZADA
─────────────────────────────────
${resolution.approvedBy}
Instituto de Salud Pública de Chile
Avenida Marathon 1000, Ñuñoa, Santiago

═══════════════════════════════════════════════════
N° DE REGISTRO ISP: ${resolution.regNumber}
═══════════════════════════════════════════════════
DOCUMENTO SIMULADO — PHARMASIM EDUCATIVO
        `.trim();
    }
};
