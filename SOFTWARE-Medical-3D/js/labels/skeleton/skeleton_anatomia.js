/**
 * ═══════════════════════════════════════════════════
 *  SKELETON SYSTEM — Anatomía Profunda
 *  Plataforma Médica In Silico
 * ═══════════════════════════════════════════════════
 */

window.__SKELETON_DATA = window.__SKELETON_DATA || {};

window.__SKELETON_DATA.anatomia = {
    title: 'Anatomía Profunda',
    icon: '🦴',
    color: '#d4c45a',
    items: [
        {
            name: 'Estructura Ósea',
            region: 'Composición Tisular — Matriz y Células',
            desc: 'Tejido conectivo especializado mineralizado. Matriz extracelular: 65% mineral (hidroxiapatita de calcio Ca₁₀(PO₄)₆(OH)₂), 25% orgánica (colágeno tipo I 90%, proteoglicanos, osteocalcina), 10% agua. Células: osteoblastos (formación), osteocitos (mantenimiento, mecanosensores), osteoclastos (resorción). Propiedades: resistencia compresión (170 MPa), tensión (130 MPa), dureza y elasticidad.',
            datos: [
                { l: 'Mineral', v: '~65% hidroxiapatita' },
                { l: 'Orgánico', v: '~25% colágeno I' },
                { l: 'Células', v: 'Blasto/cito/clasto' },
                { l: 'Resistencia', v: '170 MPa compresión' }
            ]
        },
        {
            name: 'Hueso Compacto vs Esponjoso',
            region: 'Organización Estructural',
            desc: 'Hueso compacto (cortical): denso, forma la diáfisis de huesos largos y superficie externa. Organizado en sistemas de Havers (osteonas): conducto central con vasos, rodeado de laminillas concéntricas. 80% de masa esquelética. Hueso esponjoso (trabecular): red tridimensional de trabéculas orientadas según líneas de estrés (ley de Wolff). En epífisis y huesos planos. 20% masa, pero mayor superficie metabólica.',
            datos: [
                { l: 'Compacto', v: '80% masa' },
                { l: 'Esponjoso', v: '20% masa' },
                { l: 'Osteona', v: 'Sistema de Havers' },
                { l: 'Trabéculas', v: 'Ley de Wolff' }
            ]
        },
        {
            name: 'Periostio y Endostio',
            region: 'Membranas Óseas — Renovación',
            desc: 'Periostio: membrana fibrosa externa que cubre superficies óseas (excepto articulares). Capa externa: colágeno denso, tendones/ligamentos. Capa interna (cambium): células osteoprogenitoras, osteoblastos. Vascularización e inervación (dolor óseo). Endostio: capa delgada que recubre cavidad medular y trabéculas. Células osteoprogenitoras y osteoblastos para remodelación. Esencial para reparación fracturas.',
            datos: [
                { l: 'Periostio', v: 'Membrana externa' },
                { l: 'Endostio', v: 'Recubre cavidad' },
                { l: 'Funciones', v: 'Remodelación + reparación' },
                { l: 'Dolor', v: 'Periostio inervado' }
            ]
        },
        {
            name: 'Médula Ósea',
            region: 'Hematopoyesis — Cavidad Medular',
            desc: 'Médula roja: tejido hematopoyético activo, produce células sanguíneas (eritrocitos, leucocitos, plaquetas). Presente en todos huesos al nacer, en adulto en vértebras, costillas, esternón, pelvis, epífisis proximales húmero/fémur. Médula amarilla: predominio adipocitos, en cavidad medular de huesos largos en adultos. Puede revertir a roja si aumenta demanda hematopoyética. Produce ~200 mil millones células/día.',
            datos: [
                { l: 'Médula roja', v: 'Hematopoyesis' },
                { l: 'Médula amarilla', v: 'Adiposa' },
                { l: 'Producción', v: '~200×10⁹ cél/día' },
                { l: 'Adulto', v: 'Vértebras, pelvis, costillas' }
            ]
        },
        {
            name: 'Clasificación de Huesos',
            region: 'Morfología — Tipos',
            desc: 'Largos: longitud > ancho, diáfisis + 2 epífisis (fémur, húmero, falanges). Cortos: dimensiones similares, esponjosos (carpo, tarso). Planos: delgados, protección y superficie muscular (cráneo, escápula, esternón). Irregulares: forma compleja (vértebras, coxal). Sesamoideos: en tendones, mejoran palanca (rótula, pisiforme). Neumáticos: cavidades aéreas (frontal, maxilar, esfenoides, etmoides).',
            datos: [
                { l: 'Largos', v: 'Fémur, húmero' },
                { l: 'Cortos', v: 'Carpo, tarso' },
                { l: 'Planos', v: 'Cráneo, escápula' },
                { l: 'Sesamoideos', v: 'Rótula' }
            ]
        },
        {
            name: 'Articulaciones Sinoviales',
            region: 'Diartrosis — Movimiento Libre',
            desc: 'Articulaciones móviles con cavidad sinovial. Componentes: cartílago articular hialino (lubricación, absorción impacto), cápsula articular fibrosa, membrana sinovial (produce líquido sinovial: lubricante y nutriente cartílago), ligamentos (estabilidad). Tipos: esferoidea (hombro, cadera), gínglimo (codo, rodilla), trocoide (atlas-axis), elipsoide (radiocarpiana), silla de montar (trapecio-metacarpiano I), plana (intervertebrales).',
            datos: [
                { l: 'Cartílago', v: 'Hialino articular' },
                { l: 'Líquido sinovial', v: 'Lubricación + nutrición' },
                { l: 'Tipos', v: '6 variedades' },
                { l: 'Más móvil', v: 'Esferoidea (hombro)' }
            ]
        },
        {
            name: 'Cartílago Articular',
            region: 'Superficie de Contacto — Amortiguación',
            desc: 'Cartílago hialino avascular que recubre superficies articulares. Composición: condrocitos en matriz de colágeno tipo II (10-20%), proteoglicanos (agrecano, condroitín sulfato, 3-10%), agua (65-80%). Zonas: superficial (tangencial, resistencia al cizallamiento), media (oblicua), profunda (perpendicular), calcificada (anclaje a hueso subcondral). Nutrición por difusión desde líquido sinovial. Grosor: 1-7 mm. Capacidad regeneración limitada.',
            datos: [
                { l: 'Composición', v: 'Colágeno II + agrecano' },
                { l: 'Agua', v: '65-80%' },
                { l: 'Grosor', v: '1-7 mm' },
                { l: 'Nutrición', v: 'Difusión sinovial' }
            ]
        },
        {
            name: 'Esqueleto Axial',
            region: 'Eje Central — 80 Huesos',
            desc: 'Esqueleto del eje longitudinal del cuerpo. Incluye: cráneo (22 huesos: 8 neurocráneo, 14 viscerocráneo), huesecillos del oído (6: martillo, yunque, estribo × 2), hioides (1, único hueso no articulado), columna vertebral (26: 24 vértebras móviles + sacro + cóccix), caja torácica (25: esternón + 24 costillas). Función: protección SNC, órganos vitales, soporte.',
            datos: [
                { l: 'Total', v: '80 huesos' },
                { l: 'Cráneo', v: '22 huesos' },
                { l: 'Columna', v: '26 huesos' },
                { l: 'Tórax', v: '25 huesos' }
            ]
        },
        {
            name: 'Esqueleto Apendicular',
            region: 'Extremidades — 126 Huesos',
            desc: 'Huesos de los miembros y sus cinturas. Cintura escapular (4: 2 clavículas, 2 escápulas), miembro superior (60: húmero, radio, cúbito, 8 carpo, 5 metacarpo, 14 falanges × 2), cintura pélvica (2 coxales fusionados: ilion + isquion + pubis), miembro inferior (60: fémur, rótula, tibia, peroné, 7 tarso, 5 metatarso, 14 falanges × 2). Función: locomoción, manipulación, soporte peso.',
            datos: [
                { l: 'Total', v: '126 huesos' },
                { l: 'Cintura escapular', v: '4 huesos' },
                { l: 'Miembro superior', v: '60 huesos (30×2)' },
                { l: 'Miembro inferior', v: '62 huesos (31×2)' }
            ]
        }
    ]
};

console.log('✅ Skeleton Data: Anatomía cargada');
