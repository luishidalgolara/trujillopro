/**
 * ═══════════════════════════════════════════════════
 *  SKELETON SYSTEM — Hábitos y Cuidado Óseo
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__SKELETON_DATA = window.__SKELETON_DATA || {};

window.__SKELETON_DATA.habitos = {
    title: 'Hábitos y Cuidado',
    icon: '🧿',
    color: '#5cc8d4',
    items: [
        {
            name: 'Ejercicio de Carga',
            region: 'Estímulo Mecánico — Ley de Wolff',
            desc: 'Ejercicio con soporte de peso estimula formación ósea según ley de Wolff. Osteocitos detectan deformación mecánica → señales anabólicas → osteoblastos forman hueso. Ejercicios efectivos: caminata rápida, correr, subir escaleras, baile, tenis. Resistencia: pesas, bandas aumentan DMO. Impacto moderado-alto más efectivo que bajo impacto (natación no mejora DMO). Recomendaciones: 30-60 min ejercicio carga 4-5 días/semana. Ancianos: ↓ fracturas 20-30%, mejora balance. Inicio actividad >50 años aún beneficia.',
            datos: [
                { l: 'Frecuencia', v: '4-5 días/semana' },
                { l: 'Duración', v: '30-60 min' },
                { l: '↓ Fracturas', v: '20-30%' },
                { l: 'Efectivos', v: 'Carga + resistencia' }
            ]
        },
        {
            name: 'Prevención de Caídas',
            region: 'Reducción Riesgo Fracturas',
            desc: '90% fracturas cadera en ancianos resultan de caídas. Factores riesgo: debilidad muscular, trastorno marcha/balance, déficit visual, polifarmacia (>4 fármacos), hipotensión ortostática, riesgos domésticos. Prevención: 1) Ejercicio balance (Tai Chi reduce caídas 43%), fortalecimiento piernas. 2) Revisión medicamentos (sedantes, antihipertensivos). 3) Corrección visual. 4) Modificación hogar: barras baño, antideslizantes, eliminar alfombras, iluminación adecuada. 5) Protectores cadera externos (↓ fractura 60% en residencias).',
            datos: [
                { l: 'Fracturas cadera', v: '90% por caídas' },
                { l: 'Tai Chi', v: '↓43% caídas' },
                { l: 'Protectores cadera', v: '↓60% fractura' },
                { l: 'Modificaciones', v: 'Hogar seguro' }
            ]
        },
        {
            name: 'Exposición Solar Moderada',
            region: 'Síntesis Vitamina D₃',
            desc: 'UVB (290-315 nm) convierte 7-dehidrocolesterol en vitamina D₃ en piel. Suficiente: exposición cara/brazos/piernas 15-30 min/día (depende: latitud, estación, tono piel, hora). Piel clara: 10-15 min. Piel oscura: 30-60 min (mayor melanina bloquea UVB). Sin protector solar (bloquea 95-99% síntesis). Mediodía (10am-3pm) UVB máximo pero también riesgo cáncer piel. Balance: beneficio vitamina D vs riesgo melanoma. Alternativa: suplementación 1000-2000 UI/día vitamina D₃ si exposición insuficiente.',
            datos: [
                { l: 'Piel clara', v: '10-15 min/día' },
                { l: 'Piel oscura', v: '30-60 min/día' },
                { l: 'Horario', v: '10am-3pm (máx UVB)' },
                { l: 'Alternativa', v: '1000-2000 UI/día' }
            ]
        },
        {
            name: 'Postura y Ergonomía',
            region: 'Alineación Esquelética — Prevención Dolor',
            desc: 'Postura correcta reduce estrés articular/vertebral. Sedestación: espalda recta apoyada, pies planos suelo, rodillas 90°, monitor altura ojos. Cambiar posición cada 30 min. Bipedestación: peso distribuido equitativamente, rodillas ligeramente flexionadas, abdomen contraído. Levantamiento: flexionar rodillas (no espalda), carga cerca cuerpo, no girar tronco. Dormir: colchón firme (no excesivo), almohada apoya cuello. Postura incorrecta crónica: cifosis torácica, lordosis lumbar, dolor cervical, artrosis prematura. Ejercicios core fortalecen musculatura postural.',
            datos: [
                { l: 'Sedestación', v: 'Cambiar cada 30 min' },
                { l: 'Levantamiento', v: 'Flexionar rodillas' },
                { l: 'Dormir', v: 'Colchón firme' },
                { l: 'Prevención', v: 'Ejercicios core' }
            ]
        },
        {
            name: 'Evitar Tabaquismo',
            region: 'Toxicidad Ósea — Fracturas',
            desc: 'Tabaquismo reduce densidad mineral ósea y aumenta riesgo fracturas. Mecanismos: ↓ absorción calcio intestinal, efecto antestrogénico, ↑ cortisol, toxicidad directa osteoblastos, ↓ vascularización. Fumadores: DMO 6-10% menor que no fumadores. Riesgo fractura cadera +30-40%, vertebral +13%, todas +25%. Retrasa consolidación fracturas (↑ no unión 37%). Efecto dosis-dependiente. Cesación: beneficio a largo plazo, DMO mejora pero no alcanza nivel nunca fumadores. Fumadores >20 cigarrillos/día: riesgo fractura doble.',
            datos: [
                { l: 'DMO fumadores', v: '6-10% menor' },
                { l: '↑ Fractura cadera', v: '30-40%' },
                { l: '↑ No unión', v: '37%' },
                { l: 'Cesación', v: 'Mejora DMO' }
            ]
        },
        {
            name: 'Moderación Alcohol',
            region: 'Toxicidad Osteoblástica',
            desc: 'Consumo excesivo alcohol afecta negativamente salud ósea. Mecanismos: toxicidad directa osteoblastos, ↓ absorción calcio/vitamina D, ↑ PTH, ↑ cortisol, malnutrición, ↑ riesgo caídas. >2-3 bebidas/día: ↓ DMO, ↑ fracturas. Alcohólicos crónicos: osteoporosis 50%. Consumo moderado (1-2 bebidas/día) puede no afectar o incluso ↑ DMO ligeramente (controversial). Consumo agudo excesivo (binge drinking): ↑ caídas, fracturas traumáticas. Recomendación: moderación, evitar exceso.',
            datos: [
                { l: 'Moderado', v: '≤2 bebidas/día' },
                { l: 'Exceso', v: '>2-3 bebidas/día' },
                { l: 'Alcohólicos', v: '50% osteoporosis' },
                { l: 'Riesgo', v: 'Caídas + fracturas' }
            ]
        },
        {
            name: 'Peso Corporal Saludable',
            region: 'Masa Ósea — IMC',
            desc: 'Peso corporal afecta salud ósea. Bajo peso (IMC <18.5): ↓ masa ósea, ↑ riesgo osteoporosis/fracturas (menor carga mecánica, menor estrógenos en grasa, malnutrición). Obesidad (IMC >30): inicialmente ↑ DMO por carga, pero ↑ riesgo fracturas tobillo/pierna (estrés mecánico), calidad ósea puede ser inferior. Pérdida peso rápida/severa: pérdida masa ósea. Menopausia: grasa es fuente estrógenos (aromatización), muy delgada ↑ riesgo. IMC óptimo para hueso: 20-25. Mantener peso estable, evitar fluctuaciones.',
            datos: [
                { l: 'Bajo peso', v: 'IMC <18.5 riesgo ↑' },
                { l: 'IMC óptimo', v: '20-25' },
                { l: 'Obesidad', v: 'Mayor DMO, peor calidad' },
                { l: 'Estabilidad', v: 'Evitar fluctuaciones' }
            ]
        },
        {
            name: 'Screening y Densitometría',
            region: 'Detección Temprana — DEXA',
            desc: 'Densitometría ósea (DEXA): método gold standard para medir densidad mineral ósea. T-score: DE respecto adulto joven. Normal: ≥-1.0. Osteopenia: -1.0 a -2.5. Osteoporosis: ≤-2.5. Z-score: comparación con edad/sexo. Indicaciones screening: mujeres ≥65 años, hombres ≥70 años, posmenopáusica <65 con factores riesgo, fracturas por fragilidad, corticoides >3 meses, hiperparatiroidismo. Frecuencia: cada 1-2 años si osteopenia/osteoporosis, cada 5-10 años si normal. Sitios: columna lumbar, cadera, antebrazo.',
            datos: [
                { l: 'Mujeres', v: '≥65 años screening' },
                { l: 'Hombres', v: '≥70 años screening' },
                { l: 'Osteoporosis', v: 'T-score ≤-2.5' },
                { l: 'Frecuencia', v: '1-2 años si patológico' }
            ]
        }
    ]
};

console.log('✅ Skeleton Data: Hábitos cargados');
