const DrawingColors = {
    colors: [
        '#000000', // Negro
        '#FF0000', // Rojo
        '#0000FF', // Azul
        '#00FF00', // Verde
        '#FFFF00', // Amarillo
        '#FF00FF', // Magenta
        '#00FFFF', // Cyan
        '#FFA500', // Naranja
        '#800080', // Púrpura
        '#A52A2A', // Marrón
        '#808080', // Gris
        '#FFFFFF'  // Blanco
    ],
    
    strokeWidths: [1, 2, 3, 4, 5],
    
    createColorPicker() {
        const container = document.createElement('div');
        container.className = 'drawing-color-picker';
        
        const colorSection = document.createElement('div');
        colorSection.className = 'drawing-colors';
        
        this.colors.forEach(color => {
            const btn = document.createElement('button');
            btn.className = 'drawing-color-btn';
            btn.style.backgroundColor = color;
            btn.setAttribute('data-color', color);
            
            if (color === DrawingState.currentColor) {
                btn.classList.add('active');
            }
            
            btn.addEventListener('click', () => {
                this.selectColor(color);
            });
            
            colorSection.appendChild(btn);
        });
        
        const widthSection = document.createElement('div');
        widthSection.className = 'drawing-widths';
        
        const widthLabel = document.createElement('span');
        widthLabel.textContent = 'Grosor:';
        widthLabel.className = 'drawing-width-label';
        widthSection.appendChild(widthLabel);
        
        this.strokeWidths.forEach(width => {
            const btn = document.createElement('button');
            btn.className = 'drawing-width-btn';
            btn.textContent = width;
            btn.setAttribute('data-width', width);
            
            if (width === DrawingState.strokeWidth) {
                btn.classList.add('active');
            }
            
            btn.addEventListener('click', () => {
                this.selectWidth(width);
            });
            
            widthSection.appendChild(btn);
        });
        
        container.appendChild(colorSection);
        container.appendChild(widthSection);
        
        return container;
    },
    
    selectColor(color) {
        DrawingState.setColor(color);
        document.querySelectorAll('.drawing-color-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-color="${color}"]`)?.classList.add('active');
    },
    
    selectWidth(width) {
        DrawingState.setStrokeWidth(width);
        document.querySelectorAll('.drawing-width-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-width="${width}"]`)?.classList.add('active');
    }
};

window.DrawingColors = DrawingColors;