/**
 * PHARMASIM — prescription.js
 * Sistema de recetas médicas según normativa chilena (D.S. 466/84)
 */

window.PrescriptionSystem = {

    rxTypes: {
        receta_simple: {
            name: 'Receta Simple',
            ref: 'D.S. 466/84 Art. 32',
            color: '#60a5fa',
            validity: 30,
            copies: 1,
            retained: false
        },
        receta_retenida: {
            name: 'Receta Cheque (Retenida)',
            ref: 'D.S. 466/84 Art. 35',
            color: '#fbbf24',
            validity: 30,
            copies: 2,
            retained: true
        },
        receta_estupefacientes: {
            name: 'Receta de Estupefacientes',
            ref: 'Ley 20.000, D.S. 404/83',
            color: '#f87171',
            validity: 10,
            copies: 3,
            retained: true
        },
        receta_magistral: {
            name: 'Receta Magistral',
            ref: 'D.S. 466/84 Art. 44',
            color: '#c084fc',
            validity: 30,
            copies: 1,
            retained: false
        }
    },

    requiredFields: [
        { id: 'patient_name', label: 'Nombre completo del paciente', required: true },
        { id: 'patient_rut', label: 'RUT del paciente', required: true },
        { id: 'patient_age', label: 'Edad del paciente', required: true, note: 'Obligatorio en menores de edad' },
        { id: 'date', label: 'Fecha de emisión', required: true },
        { id: 'drug_name', label: 'Nombre del medicamento (DCI)', required: true, note: 'En Chile es obligatorio usar la DCI (nombre genérico)' },
        { id: 'form', label: 'Forma farmacéutica', required: true },
        { id: 'strength', label: 'Concentración / potencia', required: true },
        { id: 'dose', label: 'Posología', required: true },
        { id: 'quantity', label: 'Cantidad total a dispensar', required: true },
        { id: 'duration', label: 'Duración del tratamiento', required: false },
        { id: 'diagnosis', label: 'Diagnóstico (opcional)', required: false },
        { id: 'prescriber', label: 'Nombre y firma del prescriptor', required: true },
        { id: 'prescriber_rut', label: 'RUT del prescriptor', required: true },
        { id: 'institution', label: 'Establecimiento de salud', required: true }
    ],

    generateRxPreview(rxType, fields, patientData) {
        const info = this.rxTypes[rxType] || this.rxTypes.receta_simple;
        const today = new Date().toLocaleDateString('es-CL');

        return {
            type: info.name,
            ref: info.ref,
            color: info.color,
            validity: info.validity,
            date: fields.date || today,
            patient: {
                name: fields.patient_name || patientData?.name || '',
                rut: fields.patient_rut || '—',
                age: fields.patient_age || patientData?.age || ''
            },
            medication: {
                name: fields.drug_name || '',
                form: fields.form || '',
                strength: fields.strength || '',
                dose: fields.dose || '',
                quantity: fields.quantity || '',
                duration: fields.duration || ''
            },
            prescriber: {
                name: fields.prescriber || 'Dr. Simulado — PharmaSim',
                rut: fields.prescriber_rut || '00.000.000-0',
                institution: fields.institution || 'CESFAM PharmaSim'
            }
        };
    },

    validateRx(rxType, fields) {
        const errors = [];
        const warnings = [];

        this.requiredFields.forEach(f => {
            if (f.required && (!fields[f.id] || fields[f.id].trim() === '')) {
                errors.push({ field: f.id, msg: `${f.label} es obligatorio` });
            }
        });

        // DCI check
        if (fields.drug_name) {
            const brandNames = ['aspirina', 'tylenol', 'advil', 'lipitor', 'glucophage', 'ventolin'];
            const lower = fields.drug_name.toLowerCase();
            if (brandNames.some(b => lower.includes(b))) {
                warnings.push({ field: 'drug_name', msg: 'En Chile es obligatorio usar la DCI (nombre genérico), no marcas comerciales.' });
            }
        }

        // Date validation
        if (fields.date) {
            const info = this.rxTypes[rxType];
            if (info) {
                warnings.push({ field: 'date', msg: `Esta receta tiene vigencia de ${info.validity} días desde la fecha de emisión.` });
            }
        }

        return { errors, warnings, isValid: errors.length === 0 };
    }
};
