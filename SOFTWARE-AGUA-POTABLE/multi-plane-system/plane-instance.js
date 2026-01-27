/**
 * Clase que representa un plano individual
 * Cada plano tiene su propia configuración, elementos, trazados, etc.
 */
class PlaneInstance {
    constructor(id, name = null) {
        this.id = id;
        this.name = name || `Plano ${id}`;
        this.format = 'A1'; // A1 o A0
        this.scale = '1:50';
        
        // SVG y canvas
        this.svgElement = null;
        this.canvasContainer = null;
        
        // Elementos del plano
        this.elements = [];
        this.connections = [];
        
        // PDF/Imagen de fondo
        this.backgroundPDF = null;
        this.backgroundImage = null;
        this.pdfPages = 1;
        this.currentPdfPage = 1;
        
        // Sistema de trazado
        this.tracing = {
            nivel1: {
                paths: [],
                points: [],
                enabled: false
            },
            nivel2: {
                paths: [],
                points: [],
                enabled: false
            }
        };
        
        // Isométricos
        this.isometrics = {
            nivel1: null,
            nivel2: null
        };
        
        // Sistema de dibujo
        this.drawings = {
            lines: [],
            shapes: [],
            texts: [],
            enabled: false
        };
        
        // Etiquetas
        this.labels = [];
        
        // Cálculos hidráulicos
        this.calculations = {
            totalPipe: 0,
            total20mm: 0,
            total25mm: 0,
            total32mm: 0,
            total40mm: 0,
            totalFria: 0,
            totalCaliente: 0,
            totalCost: 0,
            efficiency: 0
        };
        
        // Dirección del proyecto
        this.projectAddress = '';
        this.sanitaryCompany = '';
        
        // Modo de interacción
        this.mode = 'edit'; // 'edit' o 'navigation'
        
        // Herramienta seleccionada
        this.selectedTool = null;
        
        // Estado de zoom y pan
        this.viewState = {
            zoom: 1,
            panX: 0,
            panY: 0
        };
        
        // Timestamp de creación
        this.createdAt = new Date();
        this.lastModified = new Date();
    }
    
    // Métodos para gestionar elementos
    addElement(element) {
        this.elements.push(element);
        this.updateLastModified();
    }
    
    removeElement(elementId) {
        this.elements = this.elements.filter(el => el.id !== elementId);
        this.updateLastModified();
    }
    
    getElements() {
        return this.elements;
    }
    
    clearElements() {
        this.elements = [];
        this.updateLastModified();
    }
    
    // Métodos para formato
    setFormat(format) {
        if (format === 'A0' || format === 'A1') {
            this.format = format;
            this.updateLastModified();
            return true;
        }
        return false;
    }
    
    getFormat() {
        return this.format;
    }
    
    // Métodos para escala
    setScale(scale) {
        this.scale = scale;
        this.updateLastModified();
    }
    
    getScale() {
        return this.scale;
    }
    
    // Métodos para PDF/Imagen
    setBackgroundPDF(pdfData, totalPages = 1) {
        this.backgroundPDF = pdfData;
        this.pdfPages = totalPages;
        this.currentPdfPage = 1;
        this.updateLastModified();
    }
    
    setBackgroundImage(imageData) {
        this.backgroundImage = imageData;
        this.updateLastModified();
    }
    
    removeBackground() {
        this.backgroundPDF = null;
        this.backgroundImage = null;
        this.pdfPages = 1;
        this.currentPdfPage = 1;
        this.updateLastModified();
    }
    
    // Métodos para dirección
    setProjectAddress(address) {
        this.projectAddress = address;
        this.updateLastModified();
    }
    
    setSanitaryCompany(company) {
        this.sanitaryCompany = company;
        this.updateLastModified();
    }
    
    // Métodos para modo
    setMode(mode) {
        if (mode === 'edit' || mode === 'navigation') {
            this.mode = mode;
            return true;
        }
        return false;
    }
    
    getMode() {
        return this.mode;
    }
    
    // Métodos para herramienta
    setSelectedTool(tool) {
        this.selectedTool = tool;
    }
    
    getSelectedTool() {
        return this.selectedTool;
    }
    
    // Métodos para cálculos
    updateCalculations(calculations) {
        this.calculations = { ...this.calculations, ...calculations };
        this.updateLastModified();
    }
    
    getCalculations() {
        return this.calculations;
    }
    
    // Métodos para trazado
    setTracingData(level, data) {
        if (level === 1 || level === 2) {
            this.tracing[`nivel${level}`] = { ...this.tracing[`nivel${level}`], ...data };
            this.updateLastModified();
        }
    }
    
    getTracingData(level) {
        return this.tracing[`nivel${level}`] || null;
    }
    
    // Métodos para isométricos
    setIsometric(level, data) {
        if (level === 1 || level === 2) {
            this.isometrics[`nivel${level}`] = data;
            this.updateLastModified();
        }
    }
    
    getIsometric(level) {
        return this.isometrics[`nivel${level}`];
    }
    
    // Métodos para dibujos
    addDrawing(drawing) {
        if (drawing.type === 'line') {
            this.drawings.lines.push(drawing);
        } else if (drawing.type === 'shape') {
            this.drawings.shapes.push(drawing);
        } else if (drawing.type === 'text') {
            this.drawings.texts.push(drawing);
        }
        this.updateLastModified();
    }
    
    clearDrawings() {
        this.drawings.lines = [];
        this.drawings.shapes = [];
        this.drawings.texts = [];
        this.updateLastModified();
    }
    
    // Métodos para etiquetas
    addLabel(label) {
        this.labels.push(label);
        this.updateLastModified();
    }
    
    removeLabel(labelId) {
        this.labels = this.labels.filter(l => l.id !== labelId);
        this.updateLastModified();
    }
    
    // Método para actualizar última modificación
    updateLastModified() {
        this.lastModified = new Date();
    }
    
    // Método para obtener miniatura (snapshot del SVG)
    getThumbnail() {
        if (this.svgElement) {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(this.svgElement);
            return 'data:image/svg+xml;base64,' + btoa(svgString);
        }
        return null;
    }
    
    // Método para clonar plano
    clone(newId) {
        const cloned = new PlaneInstance(newId, `${this.name} (Copia)`);
        cloned.format = this.format;
        cloned.scale = this.scale;
        cloned.elements = JSON.parse(JSON.stringify(this.elements));
        cloned.projectAddress = this.projectAddress;
        cloned.sanitaryCompany = this.sanitaryCompany;
        // No clonamos el SVG ni el background, solo los datos
        return cloned;
    }
    
    // Método para exportar datos del plano
    export() {
        return {
            id: this.id,
            name: this.name,
            format: this.format,
            scale: this.scale,
            elements: this.elements,
            connections: this.connections,
            tracing: this.tracing,
            calculations: this.calculations,
            projectAddress: this.projectAddress,
            sanitaryCompany: this.sanitaryCompany,
            labels: this.labels,
            createdAt: this.createdAt,
            lastModified: this.lastModified
        };
    }
    
    // Método para importar datos
    import(data) {
        this.name = data.name || this.name;
        this.format = data.format || this.format;
        this.scale = data.scale || this.scale;
        this.elements = data.elements || [];
        this.connections = data.connections || [];
        this.tracing = data.tracing || this.tracing;
        this.calculations = data.calculations || this.calculations;
        this.projectAddress = data.projectAddress || '';
        this.sanitaryCompany = data.sanitaryCompany || '';
        this.labels = data.labels || [];
        this.updateLastModified();
    }
}

// Exportar para uso global
window.PlaneInstance = PlaneInstance;