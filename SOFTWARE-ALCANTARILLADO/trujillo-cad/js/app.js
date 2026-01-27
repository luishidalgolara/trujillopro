/**
 * app.js - Inicialización principal de Trujillo CAD
 * Punto de entrada de la aplicación
 */

// Variables globales
let cadCanvas;
let toolbar;

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
window.addEventListener('DOMContentLoaded', () => {
    init();
});

/**
 * Función principal de inicialización
 */
function init() {
    console.log('🎨 Inicializando Trujillo CAD...');

    // Crear canvas principal
    cadCanvas = new CADCanvas('cad-canvas');
    console.log('✓ Canvas inicializado');

    // Crear barra de herramientas
    toolbar = new Toolbar(cadCanvas);
    console.log('✓ Toolbar inicializado');

    // Configurar eventos globales
    setupGlobalEvents();

    // Mensaje de bienvenida
    console.log('✓ Trujillo CAD listo para usar');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Atajos de teclado:');
    console.log('  L - Herramienta Línea');
    console.log('  ESC - Cancelar operación actual');
    console.log('  Ctrl/Cmd + - Zoom Out');
    console.log('  Ctrl/Cmd + - Zoom In');
    console.log('  Ctrl/Cmd 0 - Zoom Extents');
    console.log('  Shift + Click - Pan (desplazar vista)');
    console.log('  Rueda del mouse - Zoom');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

/**
 * Configura eventos globales de la aplicación
 */
function setupGlobalEvents() {
    // Prevenir menú contextual en el canvas
    const canvas = document.getElementById('cad-canvas');
    if (canvas) {
        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    }

    // Manejar redimensionamiento de ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cadCanvas.coordinateSystem.updateCenter();
            cadCanvas.redrawGrid();
            cadCanvas.refresh();
        }, 250);
    });

    // Prevenir pérdida de trabajo al cerrar
    window.addEventListener('beforeunload', (e) => {
        const tool = toolbar.getActiveTool();
        if (tool && tool.entities && tool.entities.length > 0) {
            e.preventDefault();
            e.returnValue = '¿Desea salir? Los cambios no guardados se perderán.';
            return e.returnValue;
        }
    });
}

/**
 * Exporta el dibujo actual como JSON
 */
function exportDrawing() {
    const tool = toolbar.getActiveTool();
    if (!tool || !tool.entities) {
        console.warn('No hay entidades para exportar');
        return null;
    }

    const data = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        entities: tool.entities.map(entity => entity.toJSON())
    };

    return JSON.stringify(data, null, 2);
}

/**
 * Importa un dibujo desde JSON
 */
function importDrawing(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        
        if (!data.entities) {
            throw new Error('Formato de archivo inválido');
        }

        // Limpiar canvas
        const tool = toolbar.getActiveTool();
        if (tool && tool.clear) {
            tool.clear();
        }

        // Crear entidades
        data.entities.forEach(entityData => {
            if (entityData.type === 'line') {
                const line = Line.fromJSON(entityData);
                if (tool && tool.entities) {
                    tool.entities.push(line);
                }
            }
        });

        console.log(`✓ Importadas ${data.entities.length} entidades`);
        cadCanvas.zoomExtents();
        
    } catch (error) {
        console.error('Error al importar:', error);
        alert('Error al importar el archivo: ' + error.message);
    }
}

/**
 * Limpia todo el dibujo
 */
function clearDrawing() {
    if (confirm('¿Está seguro de que desea limpiar todo el dibujo?')) {
        const tool = toolbar.getActiveTool();
        if (tool && tool.clear) {
            tool.clear();
        }
        cadCanvas.clear();
        console.log('✓ Dibujo limpiado');
    }
}

// Exponer funciones útiles globalmente
window.CAD = {
    export: exportDrawing,
    import: importDrawing,
    clear: clearDrawing,
    canvas: () => cadCanvas,
    toolbar: () => toolbar
};
