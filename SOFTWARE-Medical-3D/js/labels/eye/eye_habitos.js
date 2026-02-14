/**
 * ═══════════════════════════════════════════════════
 *  EYE — Hábitos y Cuidado Visual
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__EYE_DATA = window.__EYE_DATA || {};

window.__EYE_DATA.habitos = {
    title: 'Hábitos y Cuidado Visual',
    icon: '🧿',
    color: '#5cc8d4',
    items: [
        {
            name: 'Regla 20-20-20',
            region: 'Músculo Ciliar — Acomodación',
            desc: 'Cada 20 minutos de trabajo en pantalla, mirar un objeto a 20 pies (~6 metros) durante 20 segundos. Relaja el músculo ciliar que mantiene la acomodación sostenida para visión cercana. Reduce la fatiga visual digital (Computer Vision Syndrome) que afecta al 50-90% de usuarios de pantallas.',
            datos: [
                { l: 'Frecuencia', v: 'Cada 20 min' },
                { l: 'Distancia', v: '~6 metros' },
                { l: 'Duración', v: '20 segundos' },
                { l: 'Afectados CVS', v: '50-90%' }
            ]
        },
        {
            name: 'Protección UV Solar',
            region: 'Córnea — Cristalino — Retina',
            desc: 'La radiación UV-B daña el epitelio corneal (fotoqueratitis) y acelera la opacificación del cristalino (cataratas). La UV-A penetra hasta la retina. Las gafas deben bloquear 99-100% de UV-A y UV-B. La exposición acumulativa sin protección duplica el riesgo de cataratas y pterigión.',
            datos: [
                { l: 'Protección', v: '99-100% UV' },
                { l: 'UV-B afecta', v: 'Córnea+Cristalino' },
                { l: 'UV-A penetra', v: 'Hasta retina' },
                { l: 'Riesgo ×2', v: 'Cataratas' }
            ]
        },
        {
            name: 'Iluminación Adecuada',
            region: 'Retina — Pupila — Ergonomía',
            desc: 'La iluminación insuficiente fuerza la dilatación pupilar y aumenta la fatiga visual. Para lectura se recomiendan 300-500 lux. Para pantallas, evitar reflejos y que la pantalla sea más brillante que el entorno. La luz azul de pantallas LED (400-490 nm) puede alterar el ritmo circadiano.',
            datos: [
                { l: 'Lectura', v: '300-500 lux' },
                { l: 'Pantalla', v: 'Sin reflejos' },
                { l: 'Luz azul', v: '400-490 nm' },
                { l: 'Distancia pant.', v: '50-70 cm' }
            ]
        },
        {
            name: 'Parpadeo y Pantallas',
            region: 'Película Lagrimal — Párpados',
            desc: 'La frecuencia normal de parpadeo es 15-20 veces/minuto, pero frente a pantallas se reduce a 4-7 veces/minuto. Cada parpadeo distribuye la película lagrimal. El parpadeo incompleto (no cierra completamente) empeora el ojo seco. Parpadear conscientemente y con fuerza cada 10 minutos ayuda.',
            datos: [
                { l: 'Normal', v: '15-20 parpad./min' },
                { l: 'En pantalla', v: '4-7 parpad./min' },
                { l: 'Reducción', v: '~60-66%' },
                { l: 'Consecuencia', v: 'Ojo seco' }
            ]
        },
        {
            name: 'Higiene Ocular y Contactología',
            region: 'Superficie Ocular — Párpados',
            desc: 'Limpieza diaria del borde palpebral previene blefaritis y disfunción meibomiana. Las lentes de contacto requieren higiene rigurosa: no dormir con ellas, no usar agua del grifo, respetar horas de uso. El uso nocturno de lentes aumenta 6-8 veces el riesgo de queratitis infecciosa.',
            datos: [
                { l: 'LC horas máx.', v: '8-12 h/día' },
                { l: 'Riesgo dormir LC', v: '×6-8 queratitis' },
                { l: 'Higiene parpados', v: 'Diaria' },
                { l: 'Recambio estuche', v: 'Cada 1-3 meses' }
            ]
        },
        {
            name: 'Actividad al Aire Libre y Miopía',
            region: 'Crecimiento Axial — Retina',
            desc: 'Estudios epidemiológicos demuestran que 2+ horas diarias al aire libre reducen el riesgo de miopía en niños un 30-50%. La luz solar intensa estimula la liberación de dopamina retiniana, que inhibe el crecimiento axial excesivo del globo ocular. La pandemia de miopía afecta al 50% de jóvenes globalmente.',
            datos: [
                { l: 'Tiempo exterior', v: '≥2 h/día' },
                { l: '↓ Riesgo miopía', v: '30-50%' },
                { l: 'Mecanismo', v: 'Dopamina retiniana' },
                { l: 'Miopía jóvenes', v: '~50% global' }
            ]
        }
    ]
};

console.log('✅ Eye Data: Hábitos cargados');
