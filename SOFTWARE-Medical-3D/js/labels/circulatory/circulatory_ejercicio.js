/**
 * ═══════════════════════════════════════════════════
 *  CIRCULATORY — Ejercicio y Salud Cardiovascular
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__CIRC_DATA = window.__CIRC_DATA || {};

window.__CIRC_DATA.ejercicio = {
    title: 'Ejercicio y Salud Vascular',
    icon: '🏃',
    color: '#5cc8d4',
    items: [
        {
            name: 'Remodelado Cardíaco por Ejercicio',
            region: 'Ventrículos — Miocardio',
            desc: 'El ejercicio aeróbico crónico produce hipertrofia cardíaca fisiológica (corazón de atleta): aumento del volumen telediastólico y grosor parietal proporcional. El volumen sistólico puede alcanzar 100-120 mL (vs ~70 mL sedentario). La frecuencia cardíaca en reposo baja a 40-60 bpm.',
            datos: [
                { l: 'Vol. sistólico', v: '100-120 mL' },
                { l: 'FC reposo atleta', v: '40-60 bpm' },
                { l: 'GC máximo', v: '30-40 L/min' },
                { l: 'Hipertrofia', v: 'Fisiológica' }
            ]
        },
        {
            name: 'Presión Arterial y Ejercicio',
            region: 'Arterias — Barorreceptores',
            desc: 'Durante el ejercicio la PAS sube fisiológicamente (hasta 200 mmHg en esfuerzo máximo) mientras la PAD se mantiene o baja ligeramente por vasodilatación muscular. El efecto crónico reduce la PA de reposo ~5-7 mmHg por menor resistencia vascular periférica.',
            datos: [
                { l: 'PAS en esfuerzo', v: 'Hasta 200 mmHg' },
                { l: 'PAD en esfuerzo', v: 'Estable/↓' },
                { l: '↓ PA crónico', v: '5-7 mmHg' },
                { l: 'Mecanismo', v: '↓ RVP' }
            ]
        },
        {
            name: 'Retorno Venoso',
            region: 'Venas — Músculos Esqueléticos',
            desc: 'La bomba muscular de las pantorrillas comprime las venas profundas durante la contracción, impulsando sangre hacia el corazón con ayuda de válvulas venosas unidireccionales. La bomba respiratoria (presión negativa intratorácica en inspiración) también facilita el retorno.',
            datos: [
                { l: 'Bomba muscular', v: 'Pantorrillas' },
                { l: 'Bomba respirat.', v: 'P. intratorácica' },
                { l: 'Válvulas', v: 'Unidireccionales' },
                { l: 'Fallo', v: 'Varices, edema' }
            ]
        },
        {
            name: 'Entrenamiento Interválico (HIIT)',
            region: 'Capacidad Aeróbica — VO₂max',
            desc: 'El HIIT (High-Intensity Interval Training) mejora el VO₂max un 5-8% más que el ejercicio continuo moderado. Aumenta la capacidad oxidativa mitocondrial del miocardio, mejora la sensibilidad a la insulina y reduce grasa visceral de forma más eficiente.',
            datos: [
                { l: '↑ VO₂max', v: '5-8% > continuo' },
                { l: 'Protocolo típico', v: '4×4 min al 90%' },
                { l: 'Recuperación', v: '3 min al 70%' },
                { l: 'Frecuencia', v: '3×/semana' }
            ]
        },
        {
            name: 'Riesgos del Sedentarismo',
            region: 'Vascular Sistémico — Metabólico',
            desc: 'La inactividad prolongada reduce el flujo sanguíneo en miembros inferiores, favorece estasis venosa y disfunción endotelial. Estar sentado >8 h/día sin actividad aumenta el riesgo cardiovascular similar al tabaquismo. El síndrome metabólico afecta al 25% de adultos sedentarios.',
            datos: [
                { l: 'Riesgo >8h sent.', v: '≈ Tabaquismo' },
                { l: 'Sínd. metabólico', v: '~25% sedent.' },
                { l: 'Disfunción', v: 'Endotelial' },
                { l: 'Solución mín.', v: '150 min/sem' }
            ]
        },
        {
            name: 'Rehabilitación Cardíaca',
            region: 'Post-Infarto — Programa Integral',
            desc: 'Programa supervisado en 3 fases: Fase I (hospitalaria, movilización precoz), Fase II (ambulatoria, 8-12 semanas de ejercicio supervisado), Fase III (mantenimiento de por vida). Reduce mortalidad post-infarto un 20-25% y mejora la calidad de vida.',
            datos: [
                { l: 'Fases', v: 'I, II, III' },
                { l: '↓ Mortalidad', v: '20-25%' },
                { l: 'Fase II duración', v: '8-12 semanas' },
                { l: 'Componentes', v: 'Ejerc+Educ+Psic' }
            ]
        }
    ]
};

console.log('✅ Circulatory Data: Ejercicio cargado');