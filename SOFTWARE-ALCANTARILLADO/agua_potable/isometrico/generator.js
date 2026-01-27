class IsometricWaterGenerator {
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
            diameter: element.diameter || 20,
            waterType: element.waterType || 'fria'
        }));

        const pipes = tracingConnections.map((connection) => {
            const fromElement = connection.from;
            const toElement = connection.to;
            
            if (!fromElement || !toElement) {
                console.warn('Conexión inválida:', connection);
                return null;
            }
            
            return {
                x1: fromElement.x,
                y1: 0,
                z1: fromElement.y,
                x2: toElement.x,
                y2: 0,
                z2: toElement.y,
                diameter: connection.diameter || 20,
                material: connection.material || 'PPR',
                waterType: connection.type || 'fria',
                length: (connection.distance || 10).toFixed(1)
            };
        }).filter(pipe => pipe !== null);

        return { fixtures, pipes };
    }

    mapElementTypeToFixtureType(elementType) {
        const mapping = {
            'medidor-agua': 'MEDIDOR',
            'calefon': 'CALEFON',
            'termo-electrico': 'TERMO',
            'caldera': 'CALDERA',
            'wc': 'WC',
            'lavatorio': 'LAVATORIO',
            'bano-tina': 'TINA',
            'ducha': 'DUCHA',
            'bidet': 'BIDET',
            'urinario': 'URINARIO',
            'lavaplatos': 'LAVAPLATOS',
            'lavacopas': 'LAVACOPAS',
            'lavadora': 'LAVADORA',
            'lavadero': 'LAVADERO',
            'llave-jardin': 'JARDIN',
            'valvula-corte': 'VALVULA',
            'union-tee': 'TEE',
            'punto-conexion': 'MATRIZ'
        };
        return mapping[elementType] || 'ARTEFACTO';
    }

    generateElementLabel(element) {
        const labels = {
            'medidor-agua': 'MED',
            'calefon': 'CAL',
            'termo-electrico': 'TER',
            'caldera': 'CLD',
            'wc': 'WC',
            'lavatorio': 'LAV',
            'bano-tina': 'TIN',
            'ducha': 'DUC',
            'bidet': 'BID',
            'urinario': 'URI',
            'lavaplatos': 'LPL',
            'lavacopas': 'LCP',
            'lavadora': 'LAV',
            'lavadero': 'LAD',
            'llave-jardin': 'JAR',
            'valvula-corte': 'VLV',
            'union-tee': 'TEE',
            'punto-conexion': 'MAT'
        };
        return element.label || labels[element.type] || 'ARF';
    }
}

window.isometricGenerator = new IsometricWaterGenerator();
console.log('✅ Motor Isométrico - Generator cargado');