/**
 * PHARMASIM — isp-validator.js
 * Motor de validación regulatoria: 25+ reglas ISP Chile
 */

window.ISPValidator = {

    // ── FIELD-LEVEL VALIDATORS ──────────────────────────────────────────
    validators: {
        nonempty: (v) => v && v.trim().length > 0 ? null : 'Campo obligatorio',
        select: (v) => v && v !== '— Seleccionar —' ? null : 'Selecciona una opción',
        radio: (v) => v ? null : 'Selecciona una opción',
        upload: (v) => v ? null : 'Documento requerido',
        checkbox_min1: (v) => (Array.isArray(v) && v.length > 0) ? null : 'Selecciona al menos una opción',
        required_check: (v) => v === true ? null : 'Esta declaración es obligatoria',
        is_number: (v) => !isNaN(parseFloat(v)) ? null : 'Debe ser un número',
        min_length_50: (v) => (v && v.length >= 50) ? null : 'Mínimo 50 caracteres requeridos',
        min_length_30: (v) => (v && v.length >= 30) ? null : 'Mínimo 30 caracteres requeridos',
        has_unit: (v) => (v && /\d+\s*(mg|g|ml|mcg|UI|%)/i.test(v)) ? null : 'Incluye la unidad (mg, g, mL, etc.)',
        atc_format: (v) => (v && /^[A-Z]\d{2}[A-Z]{2}\d{2}$/i.test(v.trim())) ? null : 'Formato ATC incorrecto (ej: N02BE01)',
        rut_format: (v) => (v && /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(v.trim())) ? null : 'Formato RUT incorrecto (ej: 12.345.678-9)',
        phone_format: (v) => (v && /\+56|[0-9]{8,}/.test(v.replace(/\s/g, ''))) ? null : 'Formato de teléfono inválido',
        email_format: (v) => (v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) ? null : 'Correo electrónico inválido',
        date_future: (v) => {
            if (!v) return 'Fecha requerida';
            const parts = v.split('/');
            if (parts.length !== 3) return 'Formato DD/MM/AAAA';
            const d = new Date(parts[2], parts[1]-1, parts[0]);
            return d > new Date() ? null : 'La fecha debe ser futura (BPM vigente)';
        },
        cas_format: (v) => (v && /^\d{2,7}-\d{2}-\d{1}$/.test(v.trim())) ? null : 'Formato CAS incorrecto (ej: 103-90-2)',
        assay_range: (v) => {
            const n = parseFloat(v);
            return (!isNaN(n) && n >= 95.0 && n <= 105.0) ? null : 'El ensayo debe estar entre 95-105% para ser aceptable';
        },
        be_range: (v) => {
            const n = parseFloat(v);
            return (!isNaN(n) && n >= 80 && n <= 125) ? null : 'Relación T/R fuera del rango 80-125% requerido ISP';
        },
        be_ci_low: (v) => {
            const n = parseFloat(v);
            return (!isNaN(n) && n >= 80) ? null : '⛔ IC 90% inferior < 80%: Bioequivalencia NO demostrada';
        },
        be_ci_high: (v) => {
            const n = parseFloat(v);
            return (!isNaN(n) && n <= 125) ? null : '⛔ IC 90% superior > 125%: Bioequivalencia NO demostrada';
        },
        be_min_subjects: (v) => {
            const n = parseInt(v);
            return (!isNaN(n) && n >= 12) ? null : 'Mínimo 12 voluntarios según normativa ISP (Decreto 1876)';
        },
        no_api_name: (v, formData) => {
            if (!v || !formData) return null;
            const inn = formData['inn_name'] || '';
            return inn && v.toLowerCase().includes(inn.toLowerCase().split(' ')[0])
                ? '⚠ El nombre de fantasía no debe contener el DCI del principio activo'
                : null;
        },
    },

    // ── VALIDATE A SINGLE FIELD ────────────────────────────────────────
    validateField(fieldDef, value, formData) {
        if (!fieldDef.validate) return [];
        const errors = [];
        for (const rule of fieldDef.validate) {
            const fn = this.validators[rule];
            if (fn) {
                const err = fn(value, formData);
                if (err) errors.push(err);
            }
        }
        return errors;
    },

    // ── VALIDATE ENTIRE SECTION ────────────────────────────────────────
    validateSection(sectionId, formData) {
        const formDef = window.FORM_DEFINITIONS[sectionId];
        if (!formDef) return { errors: [], warnings: [], ok: [] };

        const errors = [], warnings = [], ok = [];

        for (const group of formDef.groups) {
            for (const field of group.fields) {
                const value = formData[field.id];
                const fieldErrors = this.validateField(field, value, formData);

                if (fieldErrors.length > 0) {
                    errors.push({
                        type: 'critical',
                        title: field.label,
                        messages: fieldErrors,
                        ref: formDef.ref,
                        fieldId: field.id
                    });
                } else if (field.required && value) {
                    ok.push({ title: field.label, ref: formDef.ref });
                }
            }
        }

        return { errors, warnings, ok };
    },

    // ── CROSS-SECTION REGULATORY CHECKS ──────────────────────────────
    crossCheck(allFormData) {
        const issues = [];

        // 1. BPM expiry check
        const bpmExpiry = allFormData['bpm_expiry'];
        if (bpmExpiry) {
            const parts = bpmExpiry.split('/');
            if (parts.length === 3) {
                const d = new Date(parts[2], parts[1]-1, parts[0]);
                const months = (d - new Date()) / (1000*60*60*24*30);
                if (months < 6 && months > 0) {
                    issues.push({
                        type: 'warning',
                        icon: '⚠️',
                        title: 'BPM próxima a vencer',
                        msg: `El certificado BPM vence en menos de 6 meses. El ISP puede requerir renovación antes de aprobar el registro.`,
                        ref: 'D.S. 03/2010 Art. 15'
                    });
                }
            }
        }

        // 2. Bioequivalence check for generics
        const drugType = allFormData['drug_type'];
        const beCiLow  = parseFloat(allFormData['be_ci_lower']);
        const beCiHigh = parseFloat(allFormData['be_ci_upper']);

        if (drugType === 'generico' || drugType === 'bioequivalente') {
            if (!isNaN(beCiLow) && !isNaN(beCiHigh)) {
                if (beCiLow < 80 || beCiHigh > 125) {
                    issues.push({
                        type: 'critical',
                        icon: '🔴',
                        title: 'BIOEQUIVALENCIA FALLIDA — Rechazo automático',
                        msg: `IC 90% AUC: ${beCiLow} - ${beCiHigh}%. El intervalo de confianza debe estar completamente dentro de 80-125%. Este expediente será RECHAZADO por el ISP.`,
                        ref: 'Decreto ISP 1876, Art. 8'
                    });
                } else if (beCiLow >= 80 && beCiHigh <= 125) {
                    issues.push({
                        type: 'ok',
                        icon: '✅',
                        title: 'Bioequivalencia demostrada',
                        msg: `IC 90% dentro de 80-125%. Cumple criterio ISP para aprobación de genérico.`,
                        ref: 'Decreto ISP 1876'
                    });
                }
            }
        }

        // 3. Assay degradation warning
        const degradation = parseFloat(allFormData['degradation']);
        if (!isNaN(degradation)) {
            if (degradation > 0.2) {
                issues.push({
                    type: 'critical',
                    icon: '🔴',
                    title: 'Productos de degradación exceden límite ICH',
                    msg: `${degradation}% de degradación supera el umbral ICH Q3B (0.2%). Se requiere identificación y calificación de impurezas.`,
                    ref: 'ICH Q3B(R2)'
                });
            } else if (degradation > 0.1) {
                issues.push({
                    type: 'warning',
                    icon: '⚠️',
                    title: 'Impurezas de degradación requieren identificación',
                    msg: `${degradation}% ≥ 0.1%: ICH Q3B requiere identificación de la impureza. Debe incluirse en especificaciones.`,
                    ref: 'ICH Q3B(R2) Tabla 1'
                });
            }
        }

        // 4. Assay out of spec
        const assayFinal = parseFloat(allFormData['assay_final']);
        if (!isNaN(assayFinal)) {
            if (assayFinal < 97 || assayFinal > 103) {
                issues.push({
                    type: 'critical',
                    icon: '🔴',
                    title: 'Ensayo fuera de especificación — Lote reprobado',
                    msg: `Ensayo final: ${assayFinal}%. Fuera del rango aceptado (98-102%). El ISP rechazará este lote de estabilidad.`,
                    ref: 'ICH Q1A(R2)'
                });
            }
        }

        // 5. Missing bioequivalence for generic
        if (drugType === 'generico' && !allFormData['be_report']) {
            issues.push({
                type: 'critical',
                icon: '🔴',
                title: 'Estudio BE faltante para medicamento genérico',
                msg: `Los medicamentos genéricos deben presentar informe completo de bioequivalencia para obtener registro ISP.`,
                ref: 'Decreto ISP 1876'
            });
        }

        // 6. Missing stability for innovator
        if (!allFormData['stability_file']) {
            issues.push({
                type: 'critical',
                icon: '🔴',
                title: 'Informe de estabilidad ausente',
                msg: `El expediente debe incluir datos de estabilidad acelerada y largo plazo según ICH Q1A.`,
                ref: 'CTD M3.2.P.8'
            });
        }

        // 7. Shelf life vs stability months
        const shelfLife = allFormData['shelf_life'];
        const stabMonths = allFormData['stability_months'];
        if (shelfLife && stabMonths) {
            const shelfNum   = parseInt(shelfLife);
            const stabNum    = parseInt(stabMonths);
            if (!isNaN(shelfNum) && !isNaN(stabNum) && stabNum < shelfNum * 0.3) {
                issues.push({
                    type: 'warning',
                    icon: '⚠️',
                    title: 'Datos de estabilidad insuficientes vs vida útil propuesta',
                    msg: `Vida útil propuesta: ${shelfLife}. Datos disponibles: solo ${stabMonths}. Se requieren al menos 6 meses de datos acelerados + datos tiempo real.`,
                    ref: 'ICH Q1A(R2) §2.1'
                });
            }
        }

        // 8. Label completeness
        const labelChecks = ['label_lot', 'label_expiry', 'label_keep_children', 'label_rx'];
        const missingLabels = labelChecks.filter(k => !allFormData[k]);
        if (missingLabels.length > 0) {
            issues.push({
                type: 'critical',
                icon: '🔴',
                title: `Etiqueta incompleta — ${missingLabels.length} elemento(s) faltante(s)`,
                msg: `La norma ISP NT-15 requiere incluir: N° de lote, fecha de vencimiento, advertencia para niños e indicación de venta.`,
                ref: 'ISP NT-15 §4.2'
            });
        }

        // 9. Positive completeness checks
        if (allFormData['brand_name'] && allFormData['inn_name'] && allFormData['drug_form']) {
            issues.push({
                type: 'ok', icon: '✅',
                title: 'Identificación del producto completa',
                msg: `Nombre, DCI y forma farmacéutica correctamente declarados.`,
                ref: 'CTD M1.1'
            });
        }
        if (allFormData['bpm_cert']) {
            issues.push({
                type: 'ok', icon: '✅',
                title: 'Certificado BPM presentado',
                msg: 'La documentación de planta de fabricación está completa.',
                ref: 'D.S. 03/2010'
            });
        }
        if (allFormData['api_cas'] && allFormData['api_spec']) {
            issues.push({
                type: 'ok', icon: '✅',
                title: 'Especificación del API cumple requisitos',
                msg: 'Número CAS y referencia farmacopeica declarados.',
                ref: 'CTD M3.2.S'
            });
        }
        if (drugType === 'innovador' && allFormData['indication'] && allFormData['dosage']) {
            issues.push({
                type: 'info', icon: 'ℹ️',
                title: 'Producto innovador: aplica vía abreviada',
                msg: 'Para medicamentos innovadores con estudios propios, no se requiere estudio BE por comparación. Se acepta la evidencia clínica propia.',
                ref: 'D.S. 03/2010 Art. 43'
            });
        }

        return issues;
    },

    // ── COMPUTE OVERALL DOSSIER COMPLETION ────────────────────────────
    computeCompletion(sectionStatuses) {
        const required = Object.values(sectionStatuses).filter(s => s.required);
        const completed = required.filter(s => s.status === 'done');
        return required.length > 0 ? Math.round((completed.length / required.length) * 100) : 0;
    },

    // ── DECIDE IF DOSSIER CAN BE SUBMITTED ────────────────────────────
    canSubmit(allIssues, sectionStatuses) {
        const criticals = allIssues.filter(i => i.type === 'critical').length;
        const pct = this.computeCompletion(sectionStatuses);
        return { canSubmit: criticals === 0 && pct >= 80, criticalCount: criticals, pct };
    }
};
