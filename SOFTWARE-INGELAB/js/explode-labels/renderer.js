// ============================================================================
// RENDERIZADOR DE ETIQUETAS EXPLOSIVAS - MEJORADO
// ============================================================================
// Archivo: js/explode-labels/renderer.js
// Descripción: Proyecta posiciones 3D a 2D y renderiza etiquetas + líneas SVG
// ============================================================================

class ExplodeLabelsRenderer {
    
    constructor() {
        this.container = null;
        this.svgLayer = null;
        this.labelsLayer = null;
        this.isVisible = false;
    }
    
    // ========================================================================
    // INICIALIZAR CAPAS DE RENDERIZADO
    // ========================================================================
    init() {
        const canvasContainer = document.getElementById('canvas-container');
        if (!canvasContainer) return;
        
        // Crear contenedor principal
        this.container = document.createElement('div');
        this.container.id = 'explode-labels-container';
        this.container.className = 'explode-labels-container';
        canvasContainer.appendChild(this.container);
        
        // Capa SVG para líneas conectoras
        this.svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgLayer.setAttribute('class', 'explode-labels-svg');
        this.svgLayer.setAttribute('width', '100%');
        this.svgLayer.setAttribute('height', '100%');
        this.container.appendChild(this.svgLayer);
        
        // Capa HTML para etiquetas de texto
        this.labelsLayer = document.createElement('div');
        this.labelsLayer.className = 'explode-labels-layer';
        this.container.appendChild(this.labelsLayer);
        
        console.log('✅ Renderer de etiquetas explosivas inicializado');
    }
    
    // ========================================================================
    // PROYECTAR POSICIÓN 3D A COORDENADAS 2D DE PANTALLA
    // ========================================================================
    projectTo2D(position3D) {
        const canvasContainer = document.getElementById('canvas-container');
        if (!canvasContainer || !camera) return null;
        
        const vector = new THREE.Vector3(position3D.x, position3D.y, position3D.z);
        vector.project(camera);
        
        // Verificar si está detrás de la cámara
        if (vector.z > 1) return null;
        
        const rect = canvasContainer.getBoundingClientRect();
        const x = (vector.x * 0.5 + 0.5) * rect.width;
        const y = (vector.y * -0.5 + 0.5) * rect.height;
        
        return { x, y };
    }
    
    // ========================================================================
    // RENDERIZAR TODAS LAS ETIQUETAS
    // ========================================================================
    render(activeComponents) {
        if (!this.container || !this.svgLayer || !this.labelsLayer) return;
        
        // Limpiar capas
        this.svgLayer.innerHTML = '';
        this.labelsLayer.innerHTML = '';
        
        const style = EXPLODE_LABELS_CONFIG.style;
        const labels = EXPLODE_LABELS_CONFIG.labels;
        const canvasContainer = document.getElementById('canvas-container');
        if (!canvasContainer) return;
        const rect = canvasContainer.getBoundingClientRect();
        
        let index = 0;
        
        Object.keys(labels).forEach(componentKey => {
            // Solo mostrar etiquetas de componentes que existen en el edificio actual
            if (!activeComponents.has(componentKey)) return;
            
            const labelData = labels[componentKey];
            const component = activeComponents.get(componentKey);
            
            if (!component || !component.visible) return;
            
            // Obtener posición real del componente (incluyendo offset de explosión)
            const worldPos = new THREE.Vector3();
            component.getWorldPosition(worldPos);
            
            // Ajustar anclaje relativo al componente
            const anchorWorld = {
                x: worldPos.x + labelData.anchor.x,
                y: worldPos.y + labelData.anchor.y,
                z: worldPos.z + labelData.anchor.z
            };
            
            // Proyectar a 2D
            const screenPos = this.projectTo2D(anchorWorld);
            if (!screenPos) return;
            
            // Calcular posición de la etiqueta
            const isLeft = labelData.labelSide === 'left';
            const labelX = isLeft 
                ? screenPos.x - style.labelOffsetX - 220
                : screenPos.x + style.labelOffsetX;
            const labelY = screenPos.y - 25;
            
            // Limitar dentro de la pantalla
            const clampedLabelX = Math.max(10, Math.min(labelX, rect.width - 280));
            const clampedLabelY = Math.max(10, Math.min(labelY, rect.height - 60));
            
            // Punto final de la línea (borde de la etiqueta)
            const lineEndX = isLeft 
                ? clampedLabelX + 260 
                : clampedLabelX;
            const lineEndY = clampedLabelY + 25;
            
            // --- DIBUJAR LÍNEA CONECTORA SVG ---
            this._drawConnectorLine(screenPos.x, screenPos.y, lineEndX, lineEndY, style, index);
            
            // --- DIBUJAR PUNTO DE ANCLAJE ---
            this._drawAnchorDot(screenPos.x, screenPos.y, style, index);
            
            // --- CREAR ETIQUETA HTML ---
            this._createLabel(labelData, clampedLabelX, clampedLabelY, isLeft, index);
            
            index++;
        });
    }
    
    // ========================================================================
    // DIBUJAR LÍNEA CONECTORA SVG - MEJORADO PARA MÁXIMA VISIBILIDAD
    // ========================================================================
    _drawConnectorLine(x1, y1, x2, y2, style, index) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', '#00d4ff'); // Color cyan brillante
        line.setAttribute('stroke-width', '3'); // Línea más gruesa
        line.setAttribute('stroke-dasharray', style.lineDash.join(','));
        line.setAttribute('class', 'explode-connector-line');
        line.setAttribute('opacity', '1'); // Opacidad total
        line.style.animationDelay = `${index * style.staggerDelay}ms`;
        line.style.filter = 'drop-shadow(0 0 3px rgba(0, 212, 255, 0.8))'; // Brillo
        
        this.svgLayer.appendChild(line);
    }
    
    // ========================================================================
    // DIBUJAR PUNTO DE ANCLAJE - MEJORADO
    // ========================================================================
    _drawAnchorDot(x, y, style, index) {
        // Círculo exterior (halo) - MÁS VISIBLE
        const halo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        halo.setAttribute('cx', x);
        halo.setAttribute('cy', y);
        halo.setAttribute('r', style.dotRadius + 4);
        halo.setAttribute('fill', 'none');
        halo.setAttribute('stroke', '#00d4ff');
        halo.setAttribute('stroke-width', '2');
        halo.setAttribute('opacity', '1');
        halo.setAttribute('class', 'explode-anchor-halo');
        halo.style.animationDelay = `${index * style.staggerDelay}ms`;
        halo.style.filter = 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.8))';
        this.svgLayer.appendChild(halo);
        
        // Círculo interior (punto sólido) - MÁS VISIBLE
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);
        dot.setAttribute('r', style.dotRadius + 1);
        dot.setAttribute('fill', '#00d4ff');
        dot.setAttribute('class', 'explode-anchor-dot');
        dot.style.animationDelay = `${index * style.staggerDelay}ms`;
        dot.style.filter = 'drop-shadow(0 0 3px rgba(0, 212, 255, 1))';
        this.svgLayer.appendChild(dot);
    }
    
    // ========================================================================
    // CREAR ETIQUETA HTML - MEJORADO PARA MÁXIMA VISIBILIDAD
    // ========================================================================
    _createLabel(labelData, x, y, isLeft, index) {
        const style = EXPLODE_LABELS_CONFIG.style;
        
        const label = document.createElement('div');
        label.className = `explode-label ${isLeft ? 'label-left' : 'label-right'}`;
        label.style.left = `${x}px`;
        label.style.top = `${y}px`;
        label.style.animationDelay = `${index * style.staggerDelay}ms`;
        
        // ✨ ESTILOS INLINE FORZADOS PARA MÁXIMA VISIBILIDAD
        label.style.background = 'rgba(10, 20, 40, 0.98)';
        label.style.backdropFilter = 'blur(15px)';
        label.style.border = isLeft ? 'none' : 'none';
        label.style.borderLeft = isLeft ? 'none' : '5px solid #00d4ff';
        label.style.borderRight = isLeft ? '5px solid #00d4ff' : 'none';
        label.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 212, 255, 0.4), inset 0 0 2px rgba(255, 255, 255, 0.3)';
        label.style.padding = '14px 18px';
        label.style.borderRadius = '10px';
        label.style.minWidth = '260px';
        
        label.innerHTML = `
            <div class="explode-label-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; ${isLeft ? 'flex-direction: row-reverse;' : ''}">
                <span class="explode-label-icon" style="font-size: 18px; filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));">${labelData.icon}</span>
                <span class="explode-label-name" style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; color: #ffffff; letter-spacing: 0.8px; text-transform: uppercase; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 212, 255, 0.5);">${labelData.name}</span>
            </div>
            <div class="explode-label-desc" style="font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; color: rgba(240, 250, 255, 0.95); line-height: 1.6; letter-spacing: 0.3px; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);">${labelData.description}</div>
        `;
        
        this.labelsLayer.appendChild(label);
    }
    
    // ========================================================================
    // ✨ ACTUALIZAR SOLO POSICIONES (SIN RECREAR TODO - ELIMINA PARPADEO)
    // ========================================================================
    updatePositions(activeComponents) {
        if (!this.svgLayer || !this.labelsLayer) return;
        
        const labels = EXPLODE_LABELS_CONFIG.labels;
        const canvasContainer = document.getElementById('canvas-container');
        if (!canvasContainer) return;
        
        // Obtener todos los elementos actuales
        const labelElements = this.labelsLayer.querySelectorAll('.explode-label');
        const lineElements = this.svgLayer.querySelectorAll('.explode-connector-line');
        const dotElements = this.svgLayer.querySelectorAll('.explode-anchor-dot');
        const haloElements = this.svgLayer.querySelectorAll('.explode-anchor-halo');
        
        let index = 0;
        
        Object.keys(labels).forEach(componentKey => {
            if (!activeComponents.has(componentKey)) return;
            
            const labelData = labels[componentKey];
            const component = activeComponents.get(componentKey);
            
            if (!component || !component.visible) return;
            
            // Obtener posición actual del componente
            const worldPos = new THREE.Vector3();
            component.getWorldPosition(worldPos);
            
            const anchorWorld = {
                x: worldPos.x + labelData.anchor.x,
                y: worldPos.y + labelData.anchor.y,
                z: worldPos.z + labelData.anchor.z
            };
            
            // Proyectar a 2D
            const screenPos = this.projectTo2D(anchorWorld);
            if (!screenPos) {
                index++;
                return;
            }
            
            // Actualizar posición de la etiqueta
            if (labelElements[index]) {
                const isLeft = labelData.labelSide === 'left';
                const rect = canvasContainer.getBoundingClientRect();
                const labelX = isLeft 
                    ? screenPos.x - EXPLODE_LABELS_CONFIG.style.labelOffsetX - 220
                    : screenPos.x + EXPLODE_LABELS_CONFIG.style.labelOffsetX;
                const labelY = screenPos.y - 25;
                
                const clampedLabelX = Math.max(10, Math.min(labelX, rect.width - 280));
                const clampedLabelY = Math.max(10, Math.min(labelY, rect.height - 60));
                
                labelElements[index].style.left = `${clampedLabelX}px`;
                labelElements[index].style.top = `${clampedLabelY}px`;
                
                // Actualizar línea
                const lineEndX = isLeft ? clampedLabelX + 260 : clampedLabelX;
                const lineEndY = clampedLabelY + 25;
                
                if (lineElements[index]) {
                    lineElements[index].setAttribute('x1', screenPos.x);
                    lineElements[index].setAttribute('y1', screenPos.y);
                    lineElements[index].setAttribute('x2', lineEndX);
                    lineElements[index].setAttribute('y2', lineEndY);
                }
                
                // Actualizar punto
                if (dotElements[index]) {
                    dotElements[index].setAttribute('cx', screenPos.x);
                    dotElements[index].setAttribute('cy', screenPos.y);
                }
                
                // Actualizar halo
                if (haloElements[index]) {
                    haloElements[index].setAttribute('cx', screenPos.x);
                    haloElements[index].setAttribute('cy', screenPos.y);
                }
            }
            
            index++;
        });
    }
    
    // ========================================================================
    // MOSTRAR / OCULTAR
    // ========================================================================
    show() {
        if (this.container) {
            this.container.classList.add('visible');
            this.isVisible = true;
        }
    }
    
    hide() {
        if (this.container) {
            this.container.classList.remove('visible');
            this.isVisible = false;
        }
    }
    
    // ========================================================================
    // LIMPIAR
    // ========================================================================
    clear() {
        if (this.svgLayer) this.svgLayer.innerHTML = '';
        if (this.labelsLayer) this.labelsLayer.innerHTML = '';
    }
    
    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        this.svgLayer = null;
        this.labelsLayer = null;
    }
}

window.ExplodeLabelsRenderer = ExplodeLabelsRenderer;

console.log('✅ Renderer de etiquetas explosivas cargado (VERSIÓN MEJORADA - MÁXIMA VISIBILIDAD)');