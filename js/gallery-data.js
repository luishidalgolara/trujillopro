// ========================================
// TRUJILLO - Gallery Content Data
// ========================================

// Gallery content for each module - TODAS las imágenes
const galleryContent = {
    electric: [
        { title: 'Interface Principal', image: 'ELECTRICO/ELE1.png' },
        { title: 'Trazado Automático', image: 'ELECTRICO/ELE2.png' },
        { title: 'Cuadro de Cargas', image: 'ELECTRICO/ELE3.png' },
        { title: 'Cálculos Automáticos', image: 'ELECTRICO/ELE4.png' },
        { title: 'Planos Generados', image: 'ELECTRICO/ELE5.png' },
        { title: 'Memoria Técnica', image: 'ELECTRICO/ELE6.png' },
        { title: 'Vista Adicional 1', image: 'ELECTRICO/ELE7.png' },
        { title: 'Vista Adicional 2', image: 'ELECTRICO/ELE8.png' }
    ],
    water: [
        { title: 'Interface Principal', image: 'AGUA%20POTABLE/AP1.png' },
        { title: 'Trazado Automático', image: 'AGUA%20POTABLE/AP2.png' },
        { title: 'Isométricos', image: 'AGUA%20POTABLE/AP3.png' },
        { title: 'Cuadros de Gastos', image: 'AGUA%20POTABLE/AP4.png' },
        { title: 'Detalles Constructivos', image: 'AGUA%20POTABLE/AP5.png' },
        { title: 'Memoria Técnica', image: 'AGUA%20POTABLE/AP6.png' },
        { title: 'Vista Adicional 1', image: 'AGUA%20POTABLE/AP7.png' },
        { title: 'Vista Adicional 2', image: 'AGUA%20POTABLE/AP8.png' }
    ],
    sewer: [
        { title: 'Interface Principal', image: 'ALCANTARILLADO/AC1.png' },
        { title: 'Trazado Automático', image: 'ALCANTARILLADO/AC2.png' },
        { title: 'Isométricos', image: 'ALCANTARILLADO/AC3.png' },
        { title: 'Cálculos UEH', image: 'ALCANTARILLADO/AC4.png' },
        { title: 'Detalles RIDAA', image: 'ALCANTARILLADO/AC5.png' },
        { title: 'EETT Automáticas', image: 'ALCANTARILLADO/AC6.png' },
        { title: 'Vista Adicional', image: 'ALCANTARILLADO/AC7.png' }
    ],
    structure: [
        { title: 'Formularios Inteligentes', image: 'ESTRUCTURAL/EST1.png' },
        { title: 'Visor 3D', image: 'ESTRUCTURAL/EST2.png' },
        { title: 'Enfierradura', image: 'ESTRUCTURAL/EST3.png' },
        { title: 'Cortes Transversales', image: 'ESTRUCTURAL/EST4.png' },
        { title: 'Cálculos Estructurales', image: 'ESTRUCTURAL/EST5.png' },
        { title: 'Exportación PDF', image: 'ESTRUCTURAL/EST6.png' },
        { title: 'Vista Adicional 1', image: 'ESTRUCTURAL/EST7.png' },
        { title: 'Vista Adicional 2', image: 'ESTRUCTURAL/EST8.png' },
        { title: 'Vista Adicional 3', image: 'ESTRUCTURAL/EST9.png' }
    ],
    videos: [
        { 
            title: 'Agua Potable - Automatización Completa', 
            video: 'VIDEOS/1-AP-AS.mp4',
            description: 'Demostración completa del módulo de Agua Potable',
            duration: 'Video demostrativo'
        },
        { 
            title: 'Estructural - Cálculo y Diseño', 
            video: 'VIDEOS/2-ESTRUCTURAL.mp4',
            description: 'Sistema de cálculo estructural en acción',
            duration: 'Video demostrativo'
        },
        { 
            title: 'Elétrico - Cálculo y Automatización eléctrico', 
            video: 'VIDEOS/3-ELECTRICO.mp4',
            description: 'Demostración completa del módulo eléctrico en acción',
            duration: 'Video demostrativo'
        }
    ]
};