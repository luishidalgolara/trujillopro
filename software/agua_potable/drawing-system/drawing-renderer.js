const DrawingRenderer = {
    svgNS: 'http://www.w3.org/2000/svg',
    
    createElement(data, isTemp = false) {
        let element = null;
        
        switch(data.type) {
            case 'line':
                element = this.createLine(data);
                break;
            case 'polyline':
                element = this.createPolyline(data);
                break;
            case 'rectangle':
                element = this.createRectangle(data);
                break;
            case 'circle':
                element = this.createCircle(data);
                break;
            case 'text':
                element = this.createText(data);
                break;
        }
        
        if (element) {
            if (isTemp) {
                element.setAttribute('class', 'drawing-temp');
                element.setAttribute('pointer-events', 'none');
            } else {
                element.setAttribute('class', 'drawing-element');
            }
        }
        
        return element;
    },
    
    createLine(data) {
        const line = document.createElementNS(this.svgNS, 'line');
        line.setAttribute('x1', data.x1);
        line.setAttribute('y1', data.y1);
        line.setAttribute('x2', data.x2);
        line.setAttribute('y2', data.y2);
        line.setAttribute('stroke', data.color || DrawingState.currentColor);
        line.setAttribute('stroke-width', data.strokeWidth || DrawingState.strokeWidth);
        line.setAttribute('fill', 'none');
        return line;
    },
    
    createPolyline(data) {
        const polyline = document.createElementNS(this.svgNS, 'polyline');
        const points = data.points.map(p => `${p.x},${p.y}`).join(' ');
        polyline.setAttribute('points', points);
        polyline.setAttribute('stroke', data.color || DrawingState.currentColor);
        polyline.setAttribute('stroke-width', data.strokeWidth || DrawingState.strokeWidth);
        polyline.setAttribute('fill', 'none');
        return polyline;
    },
    
    createRectangle(data) {
        const rect = document.createElementNS(this.svgNS, 'rect');
        rect.setAttribute('x', data.x);
        rect.setAttribute('y', data.y);
        rect.setAttribute('width', data.width);
        rect.setAttribute('height', data.height);
        rect.setAttribute('stroke', data.color || DrawingState.currentColor);
        rect.setAttribute('stroke-width', data.strokeWidth || DrawingState.strokeWidth);
        rect.setAttribute('fill', 'none');
        return rect;
    },
    
    createCircle(data) {
        const circle = document.createElementNS(this.svgNS, 'circle');
        circle.setAttribute('cx', data.cx);
        circle.setAttribute('cy', data.cy);
        circle.setAttribute('r', data.r);
        circle.setAttribute('stroke', data.color || DrawingState.currentColor);
        circle.setAttribute('stroke-width', data.strokeWidth || DrawingState.strokeWidth);
        circle.setAttribute('fill', 'none');
        return circle;
    },
    
    createText(data) {
        const text = document.createElementNS(this.svgNS, 'text');
        text.setAttribute('x', data.x);
        text.setAttribute('y', data.y);
        text.setAttribute('fill', data.color || DrawingState.currentColor);
        text.setAttribute('font-size', data.fontSize || DrawingText.fontSize);
        text.setAttribute('font-family', data.fontFamily || DrawingText.fontFamily);
        text.setAttribute('font-weight', data.fontWeight || DrawingText.getFontWeight());
        text.setAttribute('font-style', data.fontStyle || DrawingText.getFontStyle());
        text.setAttribute('dominant-baseline', 'hanging');
        text.textContent = data.content;
        return text;
    },
    
    removeTempElement() {
        const temp = document.querySelector('.drawing-temp');
        if (temp) {
            temp.remove();
        }
    },
    
    addToSVG(element) {
        const svg = document.getElementById('plano');
        if (svg && element) {
            svg.appendChild(element);
        }
    }
};

window.DrawingRenderer = DrawingRenderer;