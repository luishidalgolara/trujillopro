const DrawingOrtho = {
    enabled: false,
    
    toggle() {
        this.enabled = !this.enabled;
        this.updateUI();
        console.log(`🔲 Modo Ortho: ${this.enabled ? 'ACTIVADO' : 'DESACTIVADO'}`);
    },
    
    enable() {
        this.enabled = true;
        this.updateUI();
    },
    
    disable() {
        this.enabled = false;
        this.updateUI();
    },
    
    snapToOrtho(startPoint, currentPoint) {
        if (!this.enabled) {
            return currentPoint;
        }
        
        const dx = Math.abs(currentPoint.x - startPoint.x);
        const dy = Math.abs(currentPoint.y - startPoint.y);
        
        if (dx > dy) {
            return {
                x: currentPoint.x,
                y: startPoint.y
            };
        } else {
            return {
                x: startPoint.x,
                y: currentPoint.y
            };
        }
    },
    
    snapPolylineToOrtho(lastPoint, currentPoint) {
        if (!this.enabled || !lastPoint) {
            return currentPoint;
        }
        
        return this.snapToOrtho(lastPoint, currentPoint);
    },
    
    updateUI() {
        const btn = document.getElementById('btnOrtho');
        if (btn) {
            if (this.enabled) {
                btn.classList.add('active');
                btn.style.background = '#27ae60';
            } else {
                btn.classList.remove('active');
                btn.style.background = '#34495e';
            }
        }
    }
};

window.DrawingOrtho = DrawingOrtho;