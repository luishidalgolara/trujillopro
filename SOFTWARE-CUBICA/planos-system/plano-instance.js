/**
 * Clase PlanoInstance - Cubicación
 */
class PlanoInstance {
    constructor(id, name = null) {
        this.id = id;
        this.name = name || `Plano ${id}`;
        this.format = 'A1';
        this.scale = '1:50';
        
        // Elementos del plano
        this.murosHormigon = [];
        this.murosAlbanileria = [];
        this.tabiques = [];
        this.murosEstructurales = [];
        this.radieres = [];
        this.cubiertas = [];
        
        // PDF/Imagen de fondo
        this.backgroundPDF = null;
        this.backgroundImage = null;
        
        // Canvas SVG
        this.svgInnerHTML = '';
        
        // Elementos integrados
        this.elementosIntegrados = {
            vineta: null,
            simbologias: [],
            cuadrosPiezas: [],
            cuadrosGastos: [],
            detallesAP: [],
            notasObligatorias: []
        };
        
        // Totales
        this.totales = {
            volumenHormigon: 0,
            areaAlbanileria: 0,
            areaTabiquesInteriores: 0,
            areaTabiquesExteriores: 0,
            cementoTotal: 0,
            fierroTotal: 0,
            areaRadier: 0
        };
        
        // Datos del proyecto
        this.projectName = '';
        this.projectCode = '';
        
        // Timestamps
        this.createdAt = new Date();
        this.lastModified = new Date();
    }
    
    setFormat(format) {
        if (format === 'A0' || format === 'A1') {
            this.format = format;
            this.updateLastModified();
            return true;
        }
        return false;
    }
    
    setScale(scale) {
        this.scale = scale;
        this.updateLastModified();
    }
    
    setBackgroundPDF(pdfData) {
        this.backgroundPDF = pdfData;
        this.updateLastModified();
    }
    
    setBackgroundImage(imageData) {
        this.backgroundImage = imageData;
        this.updateLastModified();
    }
    
    removeBackground() {
        this.backgroundPDF = null;
        this.backgroundImage = null;
        this.updateLastModified();
    }
    
    updateLastModified() {
        this.lastModified = new Date();
    }
    
    clone(newId) {
        const cloned = new PlanoInstance(newId, `${this.name} (Copia)`);
        cloned.format = this.format;
        cloned.scale = this.scale;
        cloned.murosHormigon = JSON.parse(JSON.stringify(this.murosHormigon));
        cloned.murosAlbanileria = JSON.parse(JSON.stringify(this.murosAlbanileria));
        cloned.tabiques = JSON.parse(JSON.stringify(this.tabiques));
        cloned.murosEstructurales = JSON.parse(JSON.stringify(this.murosEstructurales));
        cloned.radieres = JSON.parse(JSON.stringify(this.radieres));
        cloned.cubiertas = JSON.parse(JSON.stringify(this.cubiertas));
        cloned.svgInnerHTML = this.svgInnerHTML;
        cloned.elementosIntegrados = JSON.parse(JSON.stringify(this.elementosIntegrados));
        return cloned;
    }
    
    export() {
        return {
            id: this.id,
            name: this.name,
            format: this.format,
            scale: this.scale,
            murosHormigon: this.murosHormigon,
            murosAlbanileria: this.murosAlbanileria,
            tabiques: this.tabiques,
            murosEstructurales: this.murosEstructurales,
            radieres: this.radieres,
            cubiertas: this.cubiertas,
            totales: this.totales,
            projectName: this.projectName,
            projectCode: this.projectCode,
            createdAt: this.createdAt,
            lastModified: this.lastModified
        };
    }
    
    import(data) {
        this.name = data.name || this.name;
        this.format = data.format || this.format;
        this.scale = data.scale || this.scale;
        this.murosHormigon = data.murosHormigon || [];
        this.murosAlbanileria = data.murosAlbanileria || [];
        this.tabiques = data.tabiques || [];
        this.murosEstructurales = data.murosEstructurales || [];
        this.radieres = data.radieres || [];
        this.cubiertas = data.cubiertas || [];
        this.totales = data.totales || this.totales;
        this.projectName = data.projectName || '';
        this.projectCode = data.projectCode || '';
        this.updateLastModified();
    }
}

window.PlanoInstance = PlanoInstance;
