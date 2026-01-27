const DrawingState = {
    isActive: false,
    currentTool: null,
    currentColor: '#000000',
    strokeWidth: 2,
    isDrawing: false,
    startPoint: null,
    tempElement: null,
    polylinePoints: [],
    drawnElements: [],
    orthoEnabled: false,
    textInput: null,
    
    reset() {
        this.isDrawing = false;
        this.startPoint = null;
        this.tempElement = null;
        this.polylinePoints = [];
        if (this.textInput) {
            this.textInput.remove();
            this.textInput = null;
        }
    },
    
    setTool(tool) {
        this.currentTool = tool;
        this.reset();
    },
    
    setColor(color) {
        this.currentColor = color;
    },
    
    setStrokeWidth(width) {
        this.strokeWidth = width;
    },
    
    activate() {
        this.isActive = true;
    },
    
    deactivate() {
        this.isActive = false;
        this.reset();
    },
    
    toggleOrtho() {
        this.orthoEnabled = !this.orthoEnabled;
        return this.orthoEnabled;
    }
};

window.DrawingState = DrawingState;