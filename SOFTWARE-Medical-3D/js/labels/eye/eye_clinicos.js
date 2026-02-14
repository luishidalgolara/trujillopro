/**
 * ═══════════════════════════════════════════════════
 *  EYE — Datos Clínicos de Referencia
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__EYE_DATA = window.__EYE_DATA || {};

window.__EYE_DATA.clinicos = {
    title: 'Datos Clínicos',
    icon: '📊',
    color: '#38bdf8',
    items: [
        {
            name: 'Agudeza Visual (Escala Snellen)',
            region: 'Evaluación Clínica — Optotipos',
            desc: 'Medida de la capacidad de resolución del ojo. 20/20 (6/6 métrico) es visión normal: distinguir letras de 8.7 mm a 6 metros. 20/40 significa que ve a 20 pies lo que una persona normal ve a 40. Ceguera legal: ≤20/200 con mejor corrección. El LogMAR es la escala preferida en investigación.',
            datos: [
                { l: 'Normal', v: '20/20 (6/6)' },
                { l: 'Ceguera legal', v: '≤20/200' },
                { l: 'Escala investig.', v: 'LogMAR (0.0)' },
                { l: 'Máximo humano', v: '~20/8' }
            ]
        },
        {
            name: 'Presión Intraocular (PIO)',
            region: 'Tonometría — Humor Acuoso',
            desc: 'Presión dentro del globo ocular medida por tonometría (Goldmann es el gold standard). Normal: 10-21 mmHg, con media de ~16 mmHg. Valores >21 mmHg son sospechosos de glaucoma, aunque no diagnósticos solos. La PIO tiene variación diurna de 3-6 mmHg, mayor en la mañana.',
            datos: [
                { l: 'Normal', v: '10-21 mmHg' },
                { l: 'Media', v: '~16 mmHg' },
                { l: 'Gold standard', v: 'Goldmann' },
                { l: 'Variación diurna', v: '3-6 mmHg' }
            ]
        },
        {
            name: 'Campo Visual (Perimetría)',
            region: 'Retina → Vía Visual → Corteza',
            desc: 'Evaluación del campo visual completo mediante perimetría computarizada (Humphrey es la más usada). Detecta escotomas (áreas de pérdida). El punto ciego fisiológico está a 15° temporal. El glaucoma produce defectos arcuatos; las lesiones quiasmáticas causan hemianopsia bitemporal.',
            datos: [
                { l: 'Campo normal', v: '~200° binocular' },
                { l: 'Monocular', v: '~160°' },
                { l: 'Punto ciego', v: '15° temporal' },
                { l: 'Equipo estándar', v: 'Humphrey' }
            ]
        },
        {
            name: 'Fondo de Ojo (Oftalmoscopia)',
            region: 'Retina — Disco Óptico — Mácula',
            desc: 'Examen directo o indirecto de las estructuras del polo posterior. Evalúa disco óptico (relación copa/disco normal <0.5), vasos retinianos (cruces AV, calibre), mácula (reflejo foveal), y retina periférica. Esencial para detectar retinopatía diabética, glaucoma, DMAE e hipertensión.',
            datos: [
                { l: 'Copa/disco norm.', v: '<0.5' },
                { l: 'Relación A/V', v: '2:3' },
                { l: 'Reflejo foveal', v: 'Presente/brillante' },
                { l: 'Dilatación con', v: 'Tropicamida 1%' }
            ]
        },
        {
            name: 'Topografía Corneal',
            region: 'Córnea — Superficie Anterior',
            desc: 'Mapeo de la curvatura corneal que detecta astigmatismo irregular, queratocono y ectasias. El queratómetro mide las curvaturas centrales (K1 y K2). La córnea normal tiene ~43 D (7.8 mm de radio). El índice de asimetría superficial (SAI) y el índice de regularidad (SRI) cuantifican irregularidades.',
            datos: [
                { l: 'K promedio', v: '~43 D (7.8 mm)' },
                { l: 'Astigmatismo', v: 'K1 ≠ K2' },
                { l: 'Queratocono', v: 'K >47 D' },
                { l: 'Equipo', v: 'Pentacam/Orbscan' }
            ]
        },
        {
            name: 'OCT Retiniana',
            region: 'Retina — Corte Transversal In Vivo',
            desc: 'Tomografía de coherencia óptica: obtiene imágenes de corte transversal de la retina con resolución de 3-5 μm. Mide grosor macular central (normal ~250 μm), capa de fibras nerviosas (RNFL, normal ~100 μm) y detecta edema, membranas, agujeros maculares y daño glaucomatoso.',
            datos: [
                { l: 'Resolución', v: '3-5 μm' },
                { l: 'Grosor macular', v: '~250 μm' },
                { l: 'RNFL normal', v: '~100 μm' },
                { l: 'No invasivo', v: 'Sin contacto' }
            ]
        }
    ]
};

console.log('✅ Eye Data: Datos Clínicos cargados');
