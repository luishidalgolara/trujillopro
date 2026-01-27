/**
 * Clase que representa una instancia de plano individual
 */
class PlaneInstanceAlc {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.createdAt = new Date();
        
        this.elements = [];
        this.connections = [];
        this.scale = '1:50';
        this.format = 'A1';
        this.mode = 'edit';
        this.projectAddress = '';
        this.svgInnerHTML = '';
        this.elementosIntegrados = {
            simbologia: [],
            cuadroPiezas: [],
            vineta: null,
            cuadroGastos: [],
            detalles: [],
            isometricoN1: null,
            isometricoN2: null,
            notasObligatorias: [],
            cuadroUEH: []
        };
    }
    
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            elements: this.elements,
            connections: this.connections,
            scale: this.scale,
            format: this.format,
            mode: this.mode,
            projectAddress: this.projectAddress,
            svgInnerHTML: this.svgInnerHTML,
            elementosIntegrados: this.elementosIntegrados
        };
    }
    
    static fromJSON(data) {
        const plane = new PlaneInstanceAlc(data.id, data.name);
        plane.createdAt = new Date(data.createdAt);
        plane.elements = data.elements || [];
        plane.connections = data.connections || [];
        plane.scale = data.scale || '1:50';
        plane.format = data.format || 'A1';
        plane.mode = data.mode || 'edit';
        plane.projectAddress = data.projectAddress || '';
        plane.svgInnerHTML = data.svgInnerHTML || '';
        plane.elementosIntegrados = data.elementosIntegrados || {
            simbologia: [],
            cuadroPiezas: [],
            vineta: null,
            cuadroGastos: [],
            detalles: [],
            isometricoN1: null,
            isometricoN2: null,
            notasObligatorias: [],
            cuadroUEH: []
        };
        return plane;
    }
}

window.PlaneInstanceAlc = PlaneInstanceAlc;

console.log('✅ PlaneInstanceAlc cargado');