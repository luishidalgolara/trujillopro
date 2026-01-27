const DrawingTools = {
    line: {
        name: 'line',
        icon: '📏',
        label: 'Línea',
        
        start(point) {
            DrawingState.startPoint = point;
            DrawingState.isDrawing = true;
        },
        
        move(point) {
            if (!DrawingState.isDrawing) return null;
            return {
                type: 'line',
                x1: DrawingState.startPoint.x,
                y1: DrawingState.startPoint.y,
                x2: point.x,
                y2: point.y
            };
        },
        
        end(point) {
            if (!DrawingState.isDrawing) return null;
            const element = {
                type: 'line',
                x1: DrawingState.startPoint.x,
                y1: DrawingState.startPoint.y,
                x2: point.x,
                y2: point.y,
                color: DrawingState.currentColor,
                strokeWidth: DrawingState.strokeWidth
            };
            DrawingState.reset();
            return element;
        }
    },
    
    polyline: {
        name: 'polyline',
        icon: '✏️',
        label: 'Polilínea',
        
        start(point) {
            if (DrawingState.polylinePoints.length === 0) {
                DrawingState.isDrawing = true;
            }
            DrawingState.polylinePoints.push(point);
        },
        
        move(point) {
            if (DrawingState.polylinePoints.length === 0) return null;
            const points = [...DrawingState.polylinePoints, point];
            return {
                type: 'polyline',
                points: points
            };
        },
        
        end(isDoubleClick = false) {
            if (!isDoubleClick || DrawingState.polylinePoints.length < 2) return null;
            const element = {
                type: 'polyline',
                points: [...DrawingState.polylinePoints],
                color: DrawingState.currentColor,
                strokeWidth: DrawingState.strokeWidth
            };
            DrawingState.reset();
            return element;
        }
    },
    
    rectangle: {
        name: 'rectangle',
        icon: '⬜',
        label: 'Rectángulo',
        
        start(point) {
            DrawingState.startPoint = point;
            DrawingState.isDrawing = true;
        },
        
        move(point) {
            if (!DrawingState.isDrawing) return null;
            const x = Math.min(DrawingState.startPoint.x, point.x);
            const y = Math.min(DrawingState.startPoint.y, point.y);
            const width = Math.abs(point.x - DrawingState.startPoint.x);
            const height = Math.abs(point.y - DrawingState.startPoint.y);
            return {
                type: 'rectangle',
                x, y, width, height
            };
        },
        
        end(point) {
            if (!DrawingState.isDrawing) return null;
            const x = Math.min(DrawingState.startPoint.x, point.x);
            const y = Math.min(DrawingState.startPoint.y, point.y);
            const width = Math.abs(point.x - DrawingState.startPoint.x);
            const height = Math.abs(point.y - DrawingState.startPoint.y);
            const element = {
                type: 'rectangle',
                x, y, width, height,
                color: DrawingState.currentColor,
                strokeWidth: DrawingState.strokeWidth
            };
            DrawingState.reset();
            return element;
        }
    },
    
    circle: {
        name: 'circle',
        icon: '⭕',
        label: 'Círculo',
        
        start(point) {
            DrawingState.startPoint = point;
            DrawingState.isDrawing = true;
        },
        
        move(point) {
            if (!DrawingState.isDrawing) return null;
            const dx = point.x - DrawingState.startPoint.x;
            const dy = point.y - DrawingState.startPoint.y;
            const radius = Math.sqrt(dx * dx + dy * dy);
            return {
                type: 'circle',
                cx: DrawingState.startPoint.x,
                cy: DrawingState.startPoint.y,
                r: radius
            };
        },
        
        end(point) {
            if (!DrawingState.isDrawing) return null;
            const dx = point.x - DrawingState.startPoint.x;
            const dy = point.y - DrawingState.startPoint.y;
            const radius = Math.sqrt(dx * dx + dy * dy);
            const element = {
                type: 'circle',
                cx: DrawingState.startPoint.x,
                cy: DrawingState.startPoint.y,
                r: radius,
                color: DrawingState.currentColor,
                strokeWidth: DrawingState.strokeWidth
            };
            DrawingState.reset();
            return element;
        }
    },
    
    text: {
        name: 'text',
        icon: '📝',
        label: 'Texto',
        
        start(point, clickEvent) {
            console.log('📝 Text tool start:', point);
            DrawingState.isDrawing = true;
            DrawingText.createTextInput(clickEvent, point);
        },
        
        move(point) {
            return null;
        },
        
        end(point) {
            return null;
        }
    }
};

window.DrawingTools = DrawingTools;