/**
 * ═══════════════════════════════════════════════════
 *  LUNGS — Fisiología Respiratoria
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__LUNGS_DATA = window.__LUNGS_DATA || {};

window.__LUNGS_DATA.fisiologia = {
    title: 'Fisiología Respiratoria',
    icon: '⚡',
    color: '#f59e0b',
    items: [
        {
            name: 'Volúmenes y Capacidades Pulmonares',
            region: 'Espirometría — Mediciones',
            desc: 'Volumen corriente (VC): ~500 mL en reposo. Volumen reserva inspiratorio (VRI): ~3000 mL. Volumen reserva espiratorio (VRE): ~1100 mL. Volumen residual (VR): ~1200 mL (no medible por espirometría). Capacidad vital (CV): VC+VRI+VRE ~4600 mL. Capacidad pulmonar total (CPT): CV+VR ~5800 mL. Capacidad residual funcional (CRF): VRE+VR ~2300 mL.',
            datos: [
                { l: 'Vol. corriente', v: '~500 mL' },
                { l: 'Capacidad vital', v: '~4600 mL' },
                { l: 'CPT', v: '~5800 mL' },
                { l: 'Vol. residual', v: '~1200 mL' }
            ]
        },
        {
            name: 'Relación Ventilación/Perfusión (V/Q)',
            region: 'Distribución Alveolar',
            desc: 'Relación ideal V/Q = 1 (ventilación = perfusión). En bipedestación: ápices pulmonares tienen V/Q alto (~3, mucha ventilación, poca perfusión), bases tienen V/Q bajo (~0.6, más perfusión). Promedio global V/Q ~0.8. Alteraciones: V/Q = 0 (shunt, perfusión sin ventilación), V/Q = ∞ (espacio muerto, ventilación sin perfusión). Desajuste V/Q causa hipoxemia.',
            datos: [
                { l: 'V/Q ideal', v: '~1.0' },
                { l: 'V/Q global', v: '~0.8' },
                { l: 'Ápices', v: '~3 (↑V/Q)' },
                { l: 'Bases', v: '~0.6 (↓V/Q)' }
            ]
        },
        {
            name: 'Difusión Alveolo-Capilar (Ley de Fick)',
            region: 'Intercambio Gaseoso',
            desc: 'Difusión de gases según gradiente de presión parcial. O₂: presión alveolar ~100 mmHg, sangre venosa ~40 mmHg, gradiente 60 mmHg. CO₂: sangre venosa ~46 mmHg, alveolar ~40 mmHg, gradiente 6 mmHg. CO₂ difunde 20× más rápido que O₂ (mayor solubilidad). Tiempo de contacto sangre-alvéolo: ~0.75 s reposo, ~0.25 s ejercicio. Equilibrio O₂ en ~0.25 s.',
            datos: [
                { l: 'Gradiente O₂', v: '~60 mmHg' },
                { l: 'Gradiente CO₂', v: '~6 mmHg' },
                { l: 'CO₂ difunde', v: '20× más rápido' },
                { l: 'Tiempo equilib.', v: '~0.25 s' }
            ]
        },
        {
            name: 'Transporte de Oxígeno',
            region: 'Hemoglobina — Curva de Disociación',
            desc: 'O₂ transportado: 98.5% unido a hemoglobina (Hb), 1.5% disuelto en plasma. Cada Hb transporta 4 O₂ (1.34 mL O₂/g Hb). Con Hb 15 g/dL y SaO₂ 97%, contenido arterial O₂ ~20 mL/dL. Curva de disociación O₂-Hb sigmoide: PaO₂ 100 mmHg → SaO₂ 97%, PaO₂ 60 mmHg → SaO₂ 90%. Desviación derecha (fiebre, acidosis, 2,3-DPG) facilita liberación O₂.',
            datos: [
                { l: 'Unido a Hb', v: '~98.5%' },
                { l: 'Disuelto', v: '~1.5%' },
                { l: 'Capacidad Hb', v: '1.34 mL O₂/g' },
                { l: 'Contenido O₂', v: '~20 mL/dL' }
            ]
        },
        {
            name: 'Transporte de CO₂',
            region: 'Bicarbonato — Efecto Haldane',
            desc: 'CO₂ transportado: 70% como bicarbonato (HCO₃⁻), 23% unido a proteínas (carbamino), 7% disuelto. En tejidos: CO₂ + H₂O → H₂CO₃ → HCO₃⁻ + H⁺ (catalizado por anhidrasa carbónica). Efecto Haldane: desoxihemoglobina tiene mayor afinidad por CO₂ y H⁺, facilitando transporte de CO₂ desde tejidos. Efecto Bohr: CO₂ y acidez reducen afinidad Hb-O₂.',
            datos: [
                { l: 'Bicarbonato', v: '~70%' },
                { l: 'Carbamino', v: '~23%' },
                { l: 'Disuelto', v: '~7%' },
                { l: 'Enzima', v: 'Anhidrasa carbónica' }
            ]
        },
        {
            name: 'Control Nervioso de la Respiración',
            region: 'Centro Respiratorio Bulbar',
            desc: 'Control automático: centro respiratorio en bulbo raquídeo (grupo respiratorio dorsal y ventral). Quimiorreceptores centrales (bulbo): sensibles a pH LCR/PCO₂, respuesta principal. Quimiorreceptores periféricos (cuerpos carotídeos/aórticos): sensibles a PO₂ (<60 mmHg), PCO₂, pH. Receptores pulmonares: estiramiento (reflejo Hering-Breuer), irritación. Corteza cerebral: control voluntario.',
            datos: [
                { l: 'Centro principal', v: 'Bulbo raquídeo' },
                { l: 'Estímulo mayor', v: 'PCO₂/pH' },
                { l: 'Periféricos', v: 'Carotídeos/aórticos' },
                { l: 'PO₂ crítica', v: '<60 mmHg' }
            ]
        },
        {
            name: 'Mecánica Respiratoria',
            region: 'Compliance — Resistencia',
            desc: 'Compliance (distensibilidad): cambio de volumen por cambio de presión. Normal ~200 mL/cmH₂O. Disminuida en fibrosis (pulmón rígido), aumentada en enfisema (pérdida elasticidad). Resistencia de vías aéreas: normal <2 cmH₂O/L/s, aumentada en obstrucción (asma, EPOC). Trabajo respiratorio: inspiración es activa (diafragma, intercostales), espiración pasiva en reposo.',
            datos: [
                { l: 'Compliance norm.', v: '~200 mL/cmH₂O' },
                { l: 'Resistencia norm.', v: '<2 cmH₂O/L/s' },
                { l: 'Inspiración', v: 'Activa' },
                { l: 'Espiración', v: 'Pasiva (reposo)' }
            ]
        },
        {
            name: 'Espacio Muerto Anatómico',
            region: 'Vía Aérea sin Intercambio',
            desc: 'Volumen de vía aérea de conducción donde no ocurre intercambio gaseoso (~150 mL en adulto). Incluye nariz, faringe, laringe, tráquea, bronquios hasta bronquiolos terminales. Espacio muerto fisiológico incluye alvéolos no perfundidos. Con VC 500 mL y espacio muerto 150 mL, ventilación alveolar efectiva es 350 mL. En EPOC el espacio muerto fisiológico aumenta significativamente.',
            datos: [
                { l: 'Volumen', v: '~150 mL' },
                { l: 'VC típico', v: '500 mL' },
                { l: 'Vent. alveolar', v: '350 mL' },
                { l: 'Aumenta en', v: 'EPOC' }
            ]
        }
    ]
};

console.log('✅ Lungs Data: Fisiología cargada');
