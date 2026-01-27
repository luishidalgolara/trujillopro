const DrawingText = {
    fontSize: 16,
    fontSizes: [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48],
    fontFamily: 'Arial',
    fontFamilies: ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Comic Sans MS', 'Impact'],
    isBold: false,
    isItalic: false,
    currentInput: null,
    currentSvgPoint: null,
    draggedElement: null,
    dragOffset: { x: 0, y: 0 },
    
    setFontSize(size) {
        this.fontSize = size;
        this.updateUI();
    },
    
    setFontFamily(font) {
        this.fontFamily = font;
        this.updateUI();
    },
    
    toggleBold() {
        this.isBold = !this.isBold;
        this.updateUI();
    },
    
    toggleItalic() {
        this.isItalic = !this.isItalic;
        this.updateUI();
    },
    
    updateUI() {
        const sizeBtn = document.getElementById('currentFontSize');
        if (sizeBtn) {
            sizeBtn.textContent = `${this.fontSize}px`;
        }
        
        const fontBtn = document.getElementById('currentFontFamily');
        if (fontBtn) {
            fontBtn.textContent = this.fontFamily;
        }
        
        const boldBtn = document.getElementById('btnBold');
        if (boldBtn) {
            if (this.isBold) {
                boldBtn.classList.add('active');
            } else {
                boldBtn.classList.remove('active');
            }
        }
        
        const italicBtn = document.getElementById('btnItalic');
        if (italicBtn) {
            if (this.isItalic) {
                italicBtn.classList.add('active');
            } else {
                italicBtn.classList.remove('active');
            }
        }
    },
    
    getFontWeight() {
        return this.isBold ? 'bold' : 'normal';
    },
    
    getFontStyle() {
        return this.isItalic ? 'italic' : 'normal';
    },
    
    createTextInput(clickEvent, svgPoint) {
        console.log('🎯 Creando input de texto en:', svgPoint);
        
        if (this.currentInput) {
            this.currentInput.remove();
        }
        
        this.currentSvgPoint = svgPoint;
        
        const container = document.createElement('div');
        container.className = 'drawing-text-container';
        container.style.position = 'fixed';
        container.style.left = `${clickEvent.clientX}px`;
        container.style.top = `${clickEvent.clientY}px`;
        container.style.zIndex = '99999';
        container.style.transform = 'translate(-50%, -50%)';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'drawing-text-input-field';
        input.style.fontSize = `${this.fontSize}px`;
        input.style.fontFamily = this.fontFamily;
        input.style.fontWeight = this.getFontWeight();
        input.style.fontStyle = this.getFontStyle();
        input.style.color = DrawingState.currentColor;
        input.placeholder = 'Escribe y presiona ENTER...';
        input.autocomplete = 'off';
        
        container.appendChild(input);
        document.body.appendChild(container);
        
        this.currentInput = container;
        
        setTimeout(() => {
            input.focus();
            input.select();
        }, 50);
        
        input.addEventListener('keydown', (e) => {
            e.stopPropagation();
            
            if (e.key === 'Enter') {
                e.preventDefault();
                const text = input.value.trim();
                if (text) {
                    this.finalizeText(text);
                } else {
                    this.cancelText();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.cancelText();
            }
        });
        
        input.addEventListener('blur', () => {
            setTimeout(() => {
                const text = input.value.trim();
                if (text) {
                    this.finalizeText(text);
                } else {
                    this.cancelText();
                }
            }, 150);
        });
        
        console.log('✅ Input creado y enfocado');
    },
    
    finalizeText(text) {
        if (!text || !this.currentSvgPoint) {
            this.cancelText();
            return;
        }
        
        console.log('💾 Guardando texto:', text);
        
        const textData = {
            type: 'text',
            x: this.currentSvgPoint.x,
            y: this.currentSvgPoint.y,
            content: text,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            fontWeight: this.getFontWeight(),
            fontStyle: this.getFontStyle(),
            color: DrawingState.currentColor
        };
        
        const svgElement = DrawingRenderer.createElement(textData, false);
        DrawingRenderer.addToSVG(svgElement);
        DrawingState.drawnElements.push(textData);
        
        this.makeDraggable(svgElement);
        
        this.cancelText();
        console.log('✅ Texto agregado al plano');
    },
    
    cancelText() {
        if (this.currentInput) {
            this.currentInput.remove();
            this.currentInput = null;
        }
        this.currentSvgPoint = null;
        DrawingState.reset();
    },
    
    makeDraggable(textElement) {
        textElement.style.cursor = 'move';
        
        textElement.addEventListener('mousedown', (e) => {
            if (DrawingState.currentTool !== null && DrawingState.currentTool !== 'text') {
                return;
            }
            
            e.stopPropagation();
            this.draggedElement = textElement;
            
            const svg = document.getElementById('plano');
            const CTM = svg.getScreenCTM();
            const point = {
                x: (e.clientX - CTM.e) / CTM.a,
                y: (e.clientY - CTM.f) / CTM.d
            };
            
            const currentX = parseFloat(textElement.getAttribute('x'));
            const currentY = parseFloat(textElement.getAttribute('y'));
            
            this.dragOffset = {
                x: point.x - currentX,
                y: point.y - currentY
            };
            
            console.log('🖐️ Arrastrando texto');
        });
    },
    
    handleDragMove(e) {
        if (!this.draggedElement) return;
        
        const svg = document.getElementById('plano');
        const CTM = svg.getScreenCTM();
        const point = {
            x: (e.clientX - CTM.e) / CTM.a,
            y: (e.clientY - CTM.f) / CTM.d
        };
        
        const newX = point.x - this.dragOffset.x;
        const newY = point.y - this.dragOffset.y;
        
        this.draggedElement.setAttribute('x', newX);
        this.draggedElement.setAttribute('y', newY);
    },
    
    handleDragEnd() {
        if (this.draggedElement) {
            console.log('✅ Texto soltado');
            this.draggedElement = null;
        }
    }
};

window.DrawingText = DrawingText;