/**
 * PHARMASIM — patient-engine.js
 * Motor de casos clínicos: carga, selección y evaluación de casos
 */

window.PatientEngine = {
    cases: [],
    drugs: [],
    scoring: null,
    currentCase: null,
    currentPhase: 1,
    answers: {},
    score: 0,
    phaseScores: {},

    async init() {
        try {
            const [casesRes, drugsRes, scoringRes] = await Promise.all([
                fetch('data/patients.json').then(r => r.json()),
                fetch('data/drugs.json').then(r => r.json()),
                fetch('data/scoring.json').then(r => r.json())
            ]);
            this.cases = casesRes.cases;
            this.drugs = drugsRes.drugs;
            this.scoring = scoringRes;
            return true;
        } catch (e) {
            console.error('Error cargando datos:', e);
            return false;
        }
    },

    getCaseList() {
        return this.cases.map(c => ({
            id: c.id,
            title: c.title,
            difficulty: c.difficulty,
            category: c.category,
            icon: c.icon,
            patientName: c.patient.name,
            patientAge: c.patient.age,
            patientSex: c.patient.sex
        }));
    },

    startCase(caseId) {
        this.currentCase = this.cases.find(c => c.id === caseId);
        if (!this.currentCase) return null;
        this.currentPhase = 1;
        this.answers = {};
        this.score = 0;
        this.phaseScores = {};
        return this.currentCase;
    },

    getDrugOptions() {
        return this.drugs.map(d => ({
            id: d.id,
            inn: d.inn,
            class: d.class,
            atc: d.atc,
            icon: this._drugIcon(d.atc)
        }));
    },

    _drugIcon(atc) {
        if (atc.startsWith('C09')) return '💊';
        if (atc.startsWith('C10')) return '💛';
        if (atc.startsWith('A10')) return '🔵';
        if (atc.startsWith('J01')) return '💚';
        if (atc.startsWith('R03')) return '🫁';
        return '💊';
    },

    getDrugById(drugId) {
        return this.drugs.find(d => d.id === drugId);
    },

    getFormOptions(drugId) {
        const drug = this.getDrugById(drugId);
        if (!drug) return [];
        return drug.forms.map(f => ({
            type: f.type,
            strengths: f.strengths,
            icon: this._formIcon(f.type)
        }));
    },

    _formIcon(type) {
        const t = type.toLowerCase();
        if (t.includes('comprimido')) return '💊';
        if (t.includes('cápsula')) return '🔶';
        if (t.includes('suspensión') || t.includes('jarabe')) return '🧪';
        if (t.includes('inhalador')) return '🫁';
        if (t.includes('solución para neb')) return '💨';
        if (t.includes('solución iny')) return '💉';
        return '💊';
    },

    // ── PHASE EVALUATION ──────────────────────────────────────────

    evaluatePhase1(selectedDrugId) {
        const ca = this.currentCase.correct_answers;
        let pts = 0, feedback = '', isCorrect = false;

        if (selectedDrugId === ca.phase1_drug) {
            pts = 15;
            isCorrect = true;
            feedback = `✅ ¡Correcto! ${ca.phase1_reasoning}`;
        } else if (ca.phase1_alternatives && ca.phase1_alternatives.includes(selectedDrugId)) {
            pts = 10;
            isCorrect = true;
            feedback = `✅ Alternativa válida. ${ca.phase1_reasoning}`;
        } else {
            const wrongMsg = ca.phase1_wrong[selectedDrugId];
            feedback = `❌ Incorrecto. ${wrongMsg || 'Este fármaco no tiene indicación para esta condición.'}`;
        }

        this.answers.phase1 = selectedDrugId;
        this.phaseScores.phase1 = pts;
        return { pts, maxPts: this.currentCase.scoring.phase1, feedback, isCorrect, correctDrug: ca.phase1_drug };
    },

    evaluatePhase2(selectedForm) {
        const ca = this.currentCase.correct_answers;
        const maxPts = this.currentCase.scoring.phase2;
        let pts = 0, feedback = '', isCorrect = false;

        const normalizedSel = selectedForm.toLowerCase();
        const normalizedCorrect = ca.phase2_form.toLowerCase();

        if (normalizedSel.includes(normalizedCorrect) || normalizedCorrect.includes(normalizedSel)) {
            pts = maxPts;
            isCorrect = true;
            feedback = `✅ ¡Correcto! ${ca.phase2_reasoning}`;
        } else {
            pts = 0;
            feedback = `❌ Forma farmacéutica subóptima. ${ca.phase2_reasoning}`;
        }

        this.answers.phase2 = selectedForm;
        this.phaseScores.phase2 = pts;
        return { pts, maxPts, feedback, isCorrect, correctForm: ca.phase2_form };
    },

    evaluatePhase3(dose, frequency, duration) {
        const ca = this.currentCase.correct_answers.phase3_dose;
        const maxPts = this.currentCase.scoring.phase3;
        let pts = 0, feedback = [], isCorrect = true;

        // Evaluate dose
        const doseNum = parseFloat(dose);
        const correctDose = ca.daily_mg;
        const tolerance = correctDose * 0.2; // 20% tolerance

        if (Math.abs(doseNum - correctDose) <= tolerance) {
            pts += 15;
            feedback.push(`✅ Dosis correcta: ${ca.daily_mg} mg/día.`);
        } else if (doseNum > correctDose * 1.5) {
            pts += 0;
            isCorrect = false;
            feedback.push(`🔴 SOBREDOSIS: ${doseNum} mg/día es excesivo. La dosis correcta es ${ca.daily_mg} mg/día. Riesgo de toxicidad.`);
        } else if (doseNum < correctDose * 0.5) {
            pts += 3;
            isCorrect = false;
            feedback.push(`⚠️ SUBDOSIS: ${doseNum} mg/día es insuficiente. La dosis correcta es ${ca.daily_mg} mg/día. Riesgo de falla terapéutica.`);
        } else {
            pts += 8;
            feedback.push(`⚠️ Dosis cercana pero no óptima. La dosis recomendada es ${ca.daily_mg} mg/día.`);
        }

        // Evaluate frequency
        if (frequency && ca.frequency) {
            const freqNorm = frequency.toLowerCase();
            const correctFreq = ca.frequency.toLowerCase();
            if (freqNorm.includes(correctFreq) || correctFreq.includes(freqNorm) ||
                (freqNorm.includes('12') && correctFreq.includes('12')) ||
                (freqNorm.includes('8') && correctFreq.includes('8')) ||
                (freqNorm.includes('24') && correctFreq.includes('24')) ||
                (freqNorm.includes('1 vez') && correctFreq.includes('1 vez'))) {
                pts += 5;
                feedback.push(`✅ Frecuencia correcta.`);
            } else {
                pts += 2;
                feedback.push(`⚠️ Frecuencia: lo recomendado es ${ca.frequency}.`);
            }
        }

        // Duration (if applicable)
        if (duration) {
            pts += 5;
            feedback.push(`✅ Duración del tratamiento especificada.`);
        }

        feedback.push(`📋 ${ca.calculation}`);
        if (ca.notes) feedback.push(`💡 ${ca.notes}`);

        this.answers.phase3 = { dose, frequency, duration };
        this.phaseScores.phase3 = Math.min(pts, maxPts);
        return { pts: Math.min(pts, maxPts), maxPts, feedback, isCorrect };
    },

    evaluatePhase4(rxType, fields) {
        const ca = this.currentCase.correct_answers.phase4_prescription;
        const maxPts = this.currentCase.scoring.phase4;
        let pts = 0, feedback = [], isCorrect = false;

        // Correct prescription type
        const typeNorm = rxType.toLowerCase().replace(/_/g, ' ');
        const correctType = ca.type.toLowerCase().replace(/_/g, ' ');

        if (typeNorm.includes('simple') && correctType.includes('simple')) {
            pts += 8;
            isCorrect = true;
            feedback.push(`✅ Tipo de receta correcto: ${ca.justification}`);
        } else {
            feedback.push(`❌ Tipo incorrecto. ${ca.justification}`);
        }

        // Evaluate completeness of fields
        const requiredFields = ['patient_name', 'date', 'drug_name', 'form', 'dose', 'quantity', 'prescriber'];
        let filled = 0;
        requiredFields.forEach(f => {
            if (fields[f] && fields[f].trim().length > 0) filled++;
        });
        const fieldPct = filled / requiredFields.length;
        pts += Math.round(fieldPct * (maxPts - 8));

        if (fieldPct >= 0.85) {
            feedback.push(`✅ Receta completa (${filled}/${requiredFields.length} campos).`);
        } else {
            feedback.push(`⚠️ Receta incompleta (${filled}/${requiredFields.length} campos). Campos faltantes pueden causar rechazo en farmacia.`);
        }

        this.answers.phase4 = { rxType, fields };
        this.phaseScores.phase4 = Math.min(pts, maxPts);
        return { pts: Math.min(pts, maxPts), maxPts, feedback, isCorrect };
    },

    evaluatePhase5(selectedCounselingItems) {
        const ca = this.currentCase.correct_answers.phase5_counseling;
        const maxPts = this.currentCase.scoring.phase5;

        const coverage = selectedCounselingItems.length / Math.min(ca.length, 6);
        const pts = Math.min(Math.round(coverage * maxPts), maxPts);

        let feedback = [];
        if (coverage >= 0.8) {
            feedback.push('✅ Excelente educación al paciente. Cubriste los puntos más importantes.');
        } else if (coverage >= 0.5) {
            feedback.push('⚠️ Educación parcial. Algunos puntos importantes quedaron sin mencionar.');
        } else {
            feedback.push('❌ Educación insuficiente. El paciente no recibió información crítica.');
        }

        feedback.push('📋 Puntos clave que debiste cubrir:');
        ca.forEach((item, i) => {
            const covered = selectedCounselingItems.includes(i);
            feedback.push(`${covered ? '✅' : '⬜'} ${item}`);
        });

        this.answers.phase5 = selectedCounselingItems;
        this.phaseScores.phase5 = pts;
        return { pts, maxPts, feedback };
    },

    // ── FINAL RESULTS ─────────────────────────────────────────────

    getFinalResults() {
        const total = Object.values(this.phaseScores).reduce((a, b) => a + b, 0);
        const maxTotal = this.currentCase.scoring.max_points;
        const pct = Math.round((total / maxTotal) * 100);

        let grade = 'F';
        const scale = this.scoring.scoring_system.grade_scale;
        for (const [g, info] of Object.entries(scale)) {
            if (pct >= info.min && pct <= info.max) { grade = g; break; }
        }

        const gradeInfo = scale[grade];

        return {
            totalScore: total,
            maxScore: maxTotal,
            percentage: pct,
            grade,
            gradeLabel: gradeInfo.label,
            gradeColor: gradeInfo.color,
            gradeDesc: gradeInfo.desc,
            phaseScores: { ...this.phaseScores },
            caseTitle: this.currentCase.title,
            patientName: this.currentCase.patient.name
        };
    },

    nextPhase() {
        if (this.currentPhase < 5) {
            this.currentPhase++;
            return this.currentPhase;
        }
        return null;
    },

    reset() {
        this.currentCase = null;
        this.currentPhase = 1;
        this.answers = {};
        this.score = 0;
        this.phaseScores = {};
    }
};
