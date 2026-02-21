/**
 * PHARMASIM — dispensation.js
 * Simulador de dispensación y atención farmacéutica
 */

window.DispensationSim = {

    verificationChecklist: [
        { id: 'v_legibility', label: 'Receta legible y completa', critical: true },
        { id: 'v_prescriber', label: 'Prescriptor habilitado (médico, odontólogo, matrona)', critical: true },
        { id: 'v_date', label: 'Fecha vigente (no vencida)', critical: true },
        { id: 'v_dci', label: 'Nombre en DCI (genérico)', critical: false },
        { id: 'v_dose', label: 'Dosis coherente con indicación', critical: true },
        { id: 'v_interactions', label: 'Sin interacciones graves con medicación actual', critical: true },
        { id: 'v_allergies', label: 'Sin alergias conocidas al fármaco', critical: true },
        { id: 'v_duplicity', label: 'Sin duplicidad terapéutica', critical: false },
        { id: 'v_quantity', label: 'Cantidad coherente con duración del tratamiento', critical: false }
    ],

    counselingTopics: {
        general: [
            'Nombre del medicamento y para qué sirve',
            'Cómo y cuándo tomarlo',
            'Qué hacer si olvida una dosis',
            'Efectos adversos más comunes',
            'Signos de alarma (cuándo consultar)',
            'Interacciones importantes (alimentos, otros medicamentos)',
            'Almacenamiento correcto',
            'Duración del tratamiento'
        ],
        pediatric_extra: [
            'Usar jeringa dosificadora (no cucharita de cocina)',
            'Agitar suspensión antes de usar',
            'Conservar en refrigerador si aplica',
            'Completar el tratamiento completo'
        ],
        elderly_extra: [
            'Verificar capacidad de deglución',
            'Asociar toma con rutina diaria (desayuno, cena)',
            'Usar pastillero organizador si polifarmacia',
            'Monitorizar signos de hipotensión ortostática'
        ],
        chronic_extra: [
            'No suspender sin indicación médica',
            'Asistir a controles periódicos',
            'Solicitar renovación antes de que se acabe',
            'Reportar cualquier efecto nuevo'
        ]
    },

    getCounselingItems(caseData) {
        const items = [...this.counselingTopics.general];
        if (caseData.patient.age < 12) {
            items.push(...this.counselingTopics.pediatric_extra);
        }
        if (caseData.patient.age >= 65) {
            items.push(...this.counselingTopics.elderly_extra);
        }
        const isAcute = ['amoxicilina'].includes(caseData.correct_answers.phase1_drug);
        if (!isAcute) {
            items.push(...this.counselingTopics.chronic_extra);
        }
        return items;
    },

    getSpecificCounseling(caseData) {
        return caseData.correct_answers.phase5_counseling || [];
    },

    checkInteractions(selectedDrugId, currentMeds, drugsDb) {
        const drug = drugsDb.find(d => d.id === selectedDrugId);
        if (!drug || !drug.interactions) return [];

        const found = [];
        currentMeds.forEach(med => {
            drug.interactions.forEach(inter => {
                const medLower = med.name.toLowerCase();
                const interLower = inter.drug.toLowerCase();
                if (medLower.includes(interLower) || interLower.includes(medLower)) {
                    found.push({
                        drug1: drug.inn,
                        drug2: med.name,
                        severity: inter.severity,
                        effect: inter.effect
                    });
                }
            });
        });
        return found;
    },

    checkAllergies(selectedDrugId, allergies, drugsDb) {
        const drug = drugsDb.find(d => d.id === selectedDrugId);
        if (!drug) return [];

        const flags = [];
        allergies.forEach(allergy => {
            const allergyLower = allergy.toLowerCase();
            const drugClass = drug.class.toLowerCase();
            const drugName = drug.inn.toLowerCase();

            if (allergyLower.includes('penicilina') && drugClass.includes('penicilina')) {
                flags.push({
                    type: 'critical',
                    msg: `⛔ ALERGIA A PENICILINAS: ${drug.inn} es una penicilina. CONTRAINDICADO.`
                });
            }
            if (allergyLower.includes('sulfonamida') && drugName.includes('sulfametoxazol')) {
                flags.push({
                    type: 'critical',
                    msg: `⛔ ALERGIA A SULFONAMIDAS: ${drug.inn} contiene sulfonamida. CONTRAINDICADO.`
                });
            }
        });
        return flags;
    }
};
