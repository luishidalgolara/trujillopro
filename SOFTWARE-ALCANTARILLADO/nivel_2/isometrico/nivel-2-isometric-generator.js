class IsometricNivel2Generator {
    
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

    convertTracingToIsometric(elementosNivel2, conexionesNivel2) {
        const fixtures = elementosNivel2.map(element => ({
            x: element.x,
            y: 0,
            z: element.y,
            type: this.mapElementTypeToFixtureType(element.type),
            label: this.generateElementLabel(element),
            diameter: element.tuberia_diametro || 110,
            nivel: 2
        }));

        const puntosDescarga = obtenerPuntosDescarga();
        puntosDescarga.forEach(punto => {
            fixtures.push({
                x: punto.x,
                y: 0,
                z: punto.y,
                type: 'PUNTO_DESCARGA',
                label: 'P.DESC',
                diameter: 110,
                nivel: 2
            });
        });

        const pipes = conexionesNivel2.map((connection) => {
            const fromElement = elementosNivel2.find(el => el.id === connection.from.id) || 
                              puntosDescarga.find(el => el.id === connection.from.id);
            const toElement = elementosNivel2.find(el => el.id === connection.to.id) || 
                            puntosDescarga.find(el => el.id === connection.to.id);
            
            return {
                x1: fromElement.x,
                y1: 0,
                z1: fromElement.y,
                x2: toElement.x,
                y2: 0,
                z2: toElement.y,
                diameter: connection.diameter || 110,
                material: 'PVC',
                slope: 1.0,
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
            'punto-descarga': 'PUNTO_DESCARGA'
        };
        return mapping[elementType] || 'LAVATORIO';
    }

    generateElementLabel(element) {
        if (element.type === 'wc') return 'WC';
        if (element.type === 'punto-descarga') return 'P.DESC';
        
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

window.isometricNivel2Generator = new IsometricNivel2Generator();
console.log('✅ Isométrico Nivel 2 - Generator cargado');