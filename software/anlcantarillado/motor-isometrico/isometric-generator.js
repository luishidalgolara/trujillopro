class IsometricSewerGenerator {
    
    constructor() {
        this.isWindowOpen = false;
        this.currentSVG = null;
        this.windowElement = null;
        this.isIntegrated = false;
        this.currentScale = 1.0;
        this.textScale = 1.0;
        this.minScale = 0.3;
        this.maxScale = 3.0;
        this.isDraggingLabel = false;
    }
    
    toIsometric(x, y, z = 0) {
        const angle = Math.PI / 6;
        const cos30 = Math.cos(angle);
        const sin30 = Math.sin(angle);
        return {
            x: (x - z) * cos30,
            y: (x + z) * sin30 + y
        };
    }
    
    convertTracingToIsometric(tracingElements, tracingConnections) {
        const fixtures = tracingElements.map(element => ({
            x: element.x,
            y: 0,
            z: element.y,
            type: this.mapElementTypeToFixtureType(element.type),
            label: this.generateElementLabel(element),
            diameter: element.tuberia_diametro || 110,
            cameraNumber: element.numeroCamera || null
        }));
        
        const pipes = tracingConnections.map((connection) => {
            const fromElement = tracingElements.find(el => el.id === connection.from.id);
            const toElement = tracingElements.find(el => el.id === connection.to.id);
            
            return {
                x1: fromElement.x,
                y1: 0,
                z1: fromElement.y,
                x2: toElement.x,
                y2: 0,
                z2: toElement.y,
                diameter: connection.diameter || 110,
                material: 'PVC',
                slope: 3.0,
                length: (connection.distance || 10).toFixed(1)
            };
        });
        
        return { fixtures, pipes };
    }
    
    mapElementTypeToFixtureType(elementType) {
        const mapping = {
            'wc': 'WC',
            'lavatorio': 'LAVATORIO',
            'bano-tina': 'LAVATORIO',
            'ducha': 'LAVATORIO',
            'bidet': 'LAVATORIO',
            'urinario': 'LAVATORIO',
            'lavaplatos': 'LAVATORIO',
            'lavacopas': 'LAVATORIO',
            'lavadora': 'LAVATORIO',
            'lavadero': 'LAVATORIO',
            'camara-inspeccion': 'CAMARA',
            'camara-publica': 'CAMARA',
            'caja-registro': 'CAMARA',
            'punto-descarga': 'DESCARGA'
        };
        return mapping[elementType] || 'LAVATORIO';
    }
    
    generateElementLabel(element) {
        if (element.type === 'wc') return 'WC';
        if (element.type === 'camara-inspeccion') return element.etiqueta || `C${element.numeroCamera || element.id}`;
        if (element.type === 'camara-publica') return 'CP';
        
        const labels = {
            'lavatorio': 'LAV',
            'bano-tina': 'TIN',
            'ducha': 'DUC',
            'bidet': 'BID',
            'urinario': 'URI',
            'lavaplatos': 'LPL',
            'lavacopas': 'LCP',
            'lavadora': 'LAV',
            'lavadero': 'LAD'
        };
        
        return labels[element.type] || 'ARF';
    }
}

window.isometricGenerator = new IsometricSewerGenerator();
console.log('Motor Isométrico - Generator cargado con soporte para números de cámara');