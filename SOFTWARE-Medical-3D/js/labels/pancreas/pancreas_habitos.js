/**
 * ═══════════════════════════════════════════════════
 *  PÁNCREAS — Hábitos y Prevención
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__PANCREAS_DATA = window.__PANCREAS_DATA || {};

window.__PANCREAS_DATA.habitos = {
    title: 'Hábitos y Prevención',
    icon: '🛡️',
    color: '#5cc8d4',
    items: [
        {
            name: 'Evitar Consumo de Alcohol',
            region: 'Prevención Primaria Pancreatitis',
            desc: 'Abstinencia de alcohol es la medida preventiva más importante. Consumo crónico (>60 g/día, ~5 bebidas) por >5 años aumenta riesgo de pancreatitis crónica 20-30×. Incluso consumo moderado (2-3 bebidas/día) duplica riesgo. En pacientes con pancreatitis aguda previa, un solo episodio de consumo puede precipitar recurrencia. Asesoramiento y apoyo psicológico son clave.',
            datos: [
                { l: 'Riesgo alto', v: '>60 g/día >5 años' },
                { l: 'Aumento riesgo', v: '20-30×' },
                { l: 'Moderado', v: '2× riesgo' },
                { l: 'Prevención', v: 'Abstinencia total' }
            ]
        },
        {
            name: 'Cesación Tabáquica',
            region: 'Reducción de Riesgo Independiente',
            desc: 'Tabaquismo es factor de riesgo independiente para pancreatitis crónica (RR 2-3×) y adenocarcinoma pancreático (RR 1.7×). Mecanismo: estrés oxidativo, disfunción esfínter Oddi, alteración secreción bicarbonato. Efecto sinérgico con alcohol: fumadores que beben tienen riesgo 5-10× mayor. Dejar de fumar reduce riesgo gradualmente, normalización en 10-15 años.',
            datos: [
                { l: 'Riesgo PC', v: '2-3×' },
                { l: 'Riesgo cáncer', v: '1.7×' },
                { l: 'Sinergismo alcohol', v: '5-10×' },
                { l: 'Normalización', v: '10-15 años' }
            ]
        },
        {
            name: 'Control de Peso y Obesidad',
            region: 'Prevención Diabetes y Complicaciones',
            desc: 'Obesidad (IMC >30) aumenta riesgo de pancreatitis aguda severa (necrosis, falla orgánica) 2-3×. IMC >25 es factor de riesgo para diabetes tipo 2. Pérdida de peso 5-10% reduce resistencia insulínica y riesgo de progresión a diabetes en 58%. Grasa visceral (perímetro abdominal >102 cm hombres, >88 mujeres) es predictor más fuerte que IMC.',
            datos: [
                { l: 'Obesidad', v: 'IMC >30' },
                { l: 'Riesgo PA severa', v: '2-3×' },
                { l: 'Pérdida peso', v: '5-10% efectiva' },
                { l: 'Perímetro crítico', v: '>102/88 cm' }
            ]
        },
        {
            name: 'Actividad Física Regular',
            region: 'Mejora Sensibilidad Insulínica',
            desc: 'Ejercicio aeróbico moderado 150 min/semana + resistencia 2×/semana mejora captación glucosa muscular independiente de insulina (vía AMPK y translocación GLUT4). Reduce riesgo de diabetes tipo 2 en 30-40%. Pacientes con diabetes: mejora HbA1c 0.5-0.7%, reduce necesidad insulina. Ejercicio post-prandial (caminar 15 min) reduce picos glucémicos agudos.',
            datos: [
                { l: 'Aeróbico', v: '150 min/semana' },
                { l: 'Resistencia', v: '2×/semana' },
                { l: '↓ Riesgo DM2', v: '30-40%' },
                { l: 'Mejora HbA1c', v: '0.5-0.7%' }
            ]
        },
        {
            name: 'Prevención de Colelitiasis',
            region: 'Principal Causa Pancreatitis Aguda',
            desc: 'Cálculos biliares causan 40% de pancreatitis aguda. Factores de riesgo: 4 Fs (female, fat, forty, fertile), pérdida de peso rápida, ayuno prolongado, embarazo. Prevención: mantener peso estable, evitar dietas extremas (<800 cal/día), pérdida gradual (0.5-1 kg/semana). Pacientes con cálculos sintomáticos: colecistectomía laparoscópica reduce riesgo pancreatitis.',
            datos: [
                { l: 'Causa PA', v: '40%' },
                { l: 'Riesgo', v: '4 Fs' },
                { l: 'Pérdida peso', v: '0.5-1 kg/semana' },
                { l: 'Prevención', v: 'Colecistectomía' }
            ]
        },
        {
            name: 'Control de Triglicéridos',
            region: 'Prevención Pancreatitis Hipertrigliceridémica',
            desc: 'Hipertrigliceridemia severa (>1000 mg/dL, especialmente >1800) causa 1-10% de pancreatitis aguda. Mecanismo: lipólisis por lipasa pancreática genera ácidos grasos libres tóxicos. Factores precipitantes: dieta alta en grasas, alcohol, diabetes mal controlada, embarazo. Manejo: dieta muy baja en grasas (<30 g/día), fibratos, omega-3 (2-4 g/día), control glucémico.',
            datos: [
                { l: 'Riesgo', v: '>1000 mg/dL' },
                { l: 'Alto riesgo', v: '>1800 mg/dL' },
                { l: 'Causa PA', v: '1-10%' },
                { l: 'Tratamiento', v: 'Fibratos + omega-3' }
            ]
        },
        {
            name: 'Vacunación en Asplenia Funcional',
            region: 'Prevención Infecciones en Pancreatectomía',
            desc: 'Pancreatectomía distal puede incluir esplenectomía (30-50% casos por contigüidad anatómica cola-bazo). Asplenia: riesgo aumentado de sepsis por encapsulados (Streptococcus pneumoniae, Haemophilus influenzae, Neisseria meningitidis). Vacunas obligatorias 2 semanas pre-cirugía: neumococo (PCV13 + PPSV23), Hib, meningococo. Profilaxis antibiótica de por vida controversial.',
            datos: [
                { l: 'Pancreatect. distal', v: '30-50% con esplec.' },
                { l: 'Vacunas', v: 'Neumococo+Hib+Menin' },
                { l: 'Timing', v: '2 sem pre-cirugía' },
                { l: 'Riesgo', v: 'Sepsis encapsulados' }
            ]
        },
        {
            name: 'Automonitoreo Glucémico',
            region: 'Detección Precoz Diabetes',
            desc: 'Pacientes con pancreatitis crónica o cirugía pancreática tienen alto riesgo de desarrollar diabetes (30-80% según resección). Screening anual: glucemia ayuno y HbA1c. Síntomas de alarma: poliuria, polidipsia, pérdida de peso inexplicable, visión borrosa, infecciones recurrentes. Automonitoreo pre-prandial y 2h post-prandial identifica intolerancia glucosa temprana. Objetivo: intervención en prediabetes.',
            datos: [
                { l: 'Riesgo PC', v: '30-80% diabetes' },
                { l: 'Screening', v: 'Anual (GPA+HbA1c)' },
                { l: 'Automonitoreo', v: 'Pre y 2h post' },
                { l: 'Intervención', v: 'En prediabetes' }
            ]
        }
    ]
};

console.log('✅ Páncreas Data: Hábitos cargados');
