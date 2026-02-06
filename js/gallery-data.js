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
    ingelab: [
        { title: 'ingeLAB - Vista 1', image: 'INGELAB/1LAB.png' },
        { title: 'ingeLAB - Vista 2', image: 'INGELAB/2LAB.png' },
        { title: 'ingeLAB - Vista 3', image: 'INGELAB/3LAB.png' },
        { title: 'ingeLAB - Vista 4', image: 'INGELAB/4LAB.png' },
        { title: 'ingeLAB - Vista 5', image: 'INGELAB/5LAB.png' },
        { title: 'ingeLAB - Vista 6', image: 'INGELAB/6LAB.png' },
        { title: 'ingeLAB - Vista 7', image: 'INGELAB/7LAB.png' },
        { title: 'ingeLAB - Vista 8', image: 'INGELAB/8LAB.png' },
        { title: 'ingeLAB - Vista 9', image: 'INGELAB/9LAB.png' }
    ],
    tank: [
        { title: 'Estanque - Vista 1', image: 'ESTANQUE-AP/ESTANQUE-1.png' },
        { title: 'Estanque - Vista 2', image: 'ESTANQUE-AP/ESTANQUE-2.png' },
        { title: 'Estanque - Vista 3', image: 'ESTANQUE-AP/ESTANQUE-3.png' },
        { title: 'Estanque - Vista 4', image: 'ESTANQUE-AP/ESTANQUE-4.png' },
        { title: 'Estanque - Vista 5', image: 'ESTANQUE-AP/ESTANQUE-5.png' },
        { title: 'Estanque - Vista 6', image: 'ESTANQUE-AP/ESTANQUE-6.png' },
        { title: 'Estanque - Vista 7', image: 'ESTANQUE-AP/ESTANQUE-7.png' },
        { title: 'Estanque - Vista 8', image: 'ESTANQUE-AP/ESTANQUE-8.png' }
    ],
    cubicacion: [
        { title: 'Cubicación - Vista 1', image: 'CUBICACION-TR/CUBICA-1.png' },
        { title: 'Cubicación - Vista 2', image: 'CUBICACION-TR/CUBICA-2.png' },
        { title: 'Cubicación - Vista 3', image: 'CUBICACION-TR/CUBICA-3.png' },
        { title: 'Cubicación - Vista 4', image: 'CUBICACION-TR/CUBICA-4.png' },
        { title: 'Cubicación - Vista 5', image: 'CUBICACION-TR/CUBICA-5.png' },
        { title: 'Cubicación - Vista 6', image: 'CUBICACION-TR/CUBICA-6.png' },
        { title: 'Cubicación - Vista 7', image: 'CUBICACION-TR/CUBICA-7.png' }
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
        },
        { 
            title: 'ingeLAB - Sistema Educativo 3D', 
            video: 'VIDEOS/4-INGELAB.mp4',
            description: 'Sistema educativo interactivo de estructuras 3D en acción',
            duration: 'Video demostrativo'
        }
    ]
};