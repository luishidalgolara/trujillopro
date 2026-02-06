// ============================================================================
// CONFIGURACIÓN DE ETIQUETAS EXPLOSIVAS
// ============================================================================
// Archivo: js/explode-labels/config.js
// Descripción: Textos, descripciones y posiciones de anclaje para cada componente
// ============================================================================

const EXPLODE_LABELS_CONFIG = {
    
    // Datos de cada componente para las etiquetas
    labels: {
        foundation: {
            name: 'Cimentación',
            description: 'Base que transmite las cargas al suelo. Concreto armado f\'c=210 kg/cm²',
            icon: '🏗️',
            // Punto de anclaje 3D (donde apunta la línea)
            anchor: { x: 0, y: 0.4, z: 0 },
            // Dirección de la etiqueta respecto al anclaje
            labelSide: 'left',
            color: '#8B4513'
        },
        columns: {
            name: 'Columnas',
            description: 'Soporte vertical principal. Sección 30x30 a 50x50 cm con refuerzo longitudinal',
            icon: '🏛️',
            anchor: { x: -3, y: 2.5, z: -3 },
            labelSide: 'left',
            color: '#708090'
        },
        beams: {
            name: 'Vigas de Concreto Armado',
            description: 'Elementos horizontales que conectan columnas. Sección típica 25x50 cm',
            icon: '📏',
            anchor: { x: 0, y: 4.0, z: 3 },
            labelSide: 'right',
            color: '#A0522D'
        },
        slabs: {
            name: 'Losa de Concreto Armado',
            description: 'Superficie horizontal que forma pisos y techos. Espesor 12-25 cm',
            icon: '📐',
            anchor: { x: 0, y: 4.3, z: 0 },
            labelSide: 'left',
            color: '#D3D3D3'
        },
        walls: {
            name: 'Muros de Albañilería',
            description: 'División de espacios con ladrillo. Aportan rigidez lateral y aislamiento',
            icon: '🧱',
            anchor: { x: 3, y: 2.5, z: 0 },
            labelSide: 'right',
            color: '#D2691E'
        },
        roof: {
            name: 'Cubierta / Techo',
            description: 'Protección contra elementos climáticos. Techo a 4 aguas con impermeabilizante',
            icon: '🏠',
            anchor: { x: 0, y: 5.5, z: 0 },
            labelSide: 'right',
            color: '#4A4A4A'
        },
        stairs: {
            name: 'Escaleras',
            description: 'Circulación vertical entre niveles. Huella 28-30 cm, contrahuella 17-18 cm',
            icon: '🪜',
            anchor: { x: 4.5, y: 2.0, z: 0 },
            labelSide: 'right',
            color: '#4682B4'
        },
        reinforcement_detailed: {
            name: 'Refuerzo Estructural (Enfierradura)',
            description: 'Varillas corrugadas de acero Fy=4200 kg/cm². Estribos, mallas y refuerzo longitudinal',
            icon: '⚙️',
            anchor: { x: -3, y: 1.5, z: 3 },
            labelSide: 'left',
            color: '#FF6347'
        }
    },
    
    // Configuración visual
    style: {
        lineColor: '#3498db',           // Azul del tema
        lineDash: [6, 4],               // Patrón de línea punteada
        lineWidth: 1.5,                 // Grosor de línea
        dotRadius: 4,                   // Radio del punto en el anclaje
        dotColor: '#3498db',            // Color del punto
        labelOffsetX: 180,              // Distancia horizontal de la etiqueta al punto
        animationDuration: 600,         // Duración de animación de entrada (ms)
        staggerDelay: 80                // Retraso escalonado entre etiquetas (ms)
    }
};

window.EXPLODE_LABELS_CONFIG = EXPLODE_LABELS_CONFIG;

console.log('✅ Configuración de etiquetas explosivas cargada');
