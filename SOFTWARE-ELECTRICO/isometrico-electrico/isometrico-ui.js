// ========================================
// INTERFAZ DE USUARIO ISOMÉTRICO
// ========================================

const IsometricUI = {
    
    windowElement: null,
    isWindowOpen: false,
    
    /**
     * Mostrar ventana con isométrico
     */
    showWindow() {
        console.log('🗂️ Abriendo ventana isométrica...');
        
        // Generar isométrico
        const svgContent = IsometricGenerator.generate();
        if (!svgContent) {
            console.error('❌ No se pudo generar el isométrico');
            return;
        }
        
        // Si ya existe ventana, actualizar contenido
        if (this.windowElement) {
            const content = this.windowElement.querySelector('#isometricContent');
            if (content) {
                content.innerHTML = svgContent;
                if (!this.windowElement.classList.contains('minimized')) {
                    this.windowElement.style.display = 'flex';
                }
                // Reinicializar zoom
                this.initializeZoom();
                return;
            }
        }
        
        // Crear ventana nueva
        const windowDiv = document.createElement('div');
        windowDiv.id = 'isometricWindow';
        windowDiv.className = 'isometric-window';
        windowDiv.innerHTML = `
            <div class="isometric-header">
                <div class="isometric-title">
                    <span>🗂️ Vista Isométrica 3D</span>
                </div>
                <div class="isometric-controls">
                    <button class="iso-btn integrate" onclick="integrarIsometricoAlPlano()">
                        📌 INTEGRAR
                    </button>
                    <button class="iso-btn" onclick="IsometricUI.exportSVG()">
                        💾 Exportar
                    </button>
                    <button class="iso-btn minimize" onclick="IsometricUI.minimize()">−</button>
                    <button class="iso-btn close" onclick="IsometricUI.close()">✕</button>
                </div>
            </div>
            <div class="isometric-content" id="isometricContent">
                ${svgContent}
            </div>
            <div class="isometric-status">
                💡 Arrastra desde el header para mover | Usa la rueda del mouse para zoom
            </div>
        `;
        
        document.body.appendChild(windowDiv);
        this.windowElement = windowDiv;
        this.isWindowOpen = true;
        
        // Hacer draggable
        this.makeWindowDraggable();
        
        // Inicializar zoom después de que el SVG esté en el DOM
        setTimeout(() => {
            this.initializeZoom();
        }, 100);
        
        if (typeof updateStatus === 'function') {
            updateStatus('✅ Isométrico 3D generado');
        }
        
        console.log('✅ Ventana isométrica abierta');
    },
    
    /**
     * Inicializar sistema de zoom
     */
    initializeZoom() {
        const svg = this.windowElement.querySelector('#isometricSVG');
        const container = this.windowElement.querySelector('#isometricContent');
        
        if (svg && container && typeof IsometricZoom !== 'undefined') {
            IsometricZoom.initialize(svg, container);
            console.log('✅ Sistema de zoom inicializado');
        } else {
            console.warn('⚠️ No se pudo inicializar el zoom');
        }
        
        // Inicializar etiquetas arrastrables
        this.initializeDraggableLabels();
    },
    
    /**
     * Hacer etiquetas arrastrables
     */
    initializeDraggableLabels() {
        const labels = this.windowElement.querySelectorAll('.draggable-label');
        const svg = this.windowElement.querySelector('#isometricSVG');
        
        if (!svg) {
            console.warn('⚠️ No se encontró el SVG');
            return;
        }
        
        labels.forEach(label => {
            let isDragging = false;
            let startX, startY;
            let currentTransform = { x: 0, y: 0 };
            
            // Aumentar el área clickeable
            label.style.pointerEvents = 'all';
            
            // Leer transform inicial
            const transform = label.getAttribute('transform');
            const match = transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);
            if (match) {
                currentTransform.x = parseFloat(match[1]);
                currentTransform.y = parseFloat(match[2]);
            }
            
            const onMouseDown = (e) => {
                // Solo arrastrar con botón izquierdo
                if (e.button !== 0) return;
                
                isDragging = true;
                
                // Obtener coordenadas SVG
                const pt = svg.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
                
                startX = svgP.x - currentTransform.x;
                startY = svgP.y - currentTransform.y;
                
                // Efectos visuales
                label.style.opacity = '0.8';
                label.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
                
                // Evitar que active el pan
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🏷️ Arrastrando etiqueta');
            };
            
            const onMouseMove = (e) => {
                if (!isDragging) return;
                
                const pt = svg.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
                
                currentTransform.x = svgP.x - startX;
                currentTransform.y = svgP.y - startY;
                
                label.setAttribute('transform', `translate(${currentTransform.x}, ${currentTransform.y})`);
                
                e.preventDefault();
                e.stopPropagation();
            };
            
            const onMouseUp = (e) => {
                if (isDragging) {
                    isDragging = false;
                    label.style.opacity = '1';
                    label.style.filter = 'none';
                    console.log('✅ Etiqueta posicionada en:', currentTransform);
                }
            };
            
            // Eventos en el label
            label.addEventListener('mousedown', onMouseDown);
            
            // Eventos globales para un arrastre más suave
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            
            // Efecto hover
            label.addEventListener('mouseenter', () => {
                if (!isDragging) {
                    label.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))';
                }
            });
            
            label.addEventListener('mouseleave', () => {
                if (!isDragging) {
                    label.style.filter = 'none';
                }
            });
        });
        
        console.log(`✅ ${labels.length} etiquetas ahora son arrastrables (mejorado)`);
    },
    
    /**
     * Hacer ventana draggable
     */
    makeWindowDraggable() {
        const header = this.windowElement.querySelector('.isometric-header');
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        
        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.isometric-controls')) return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = this.windowElement.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            
            header.style.cursor = 'grabbing';
            
            const onMouseMove = (e) => {
                if (!isDragging) return;
                this.windowElement.style.left = (startLeft + e.clientX - startX) + 'px';
                this.windowElement.style.top = (startTop + e.clientY - startY) + 'px';
                this.windowElement.style.transform = 'none';
            };
            
            const onMouseUp = () => {
                isDragging = false;
                header.style.cursor = 'grab';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    },
    
    /**
     * Exportar SVG
     */
    exportSVG() {
        if (!IsometricGenerator.currentSVG) {
            alert('⚠️ No hay isométrico para exportar');
            return;
        }
        
        const blob = new Blob([IsometricGenerator.currentSVG], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `isometrico_electrico_${new Date().toISOString().slice(0,10)}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (typeof updateStatus === 'function') {
            updateStatus('✅ Isométrico exportado');
        }
        
        console.log('📥 Isométrico exportado como SVG');
    },
    
    /**
     * Minimizar ventana
     */
    minimize() {
        if (this.windowElement) {
            this.windowElement.classList.toggle('minimized');
        }
    },
    
    /**
     * Cerrar ventana
     */
    close() {
        if (this.windowElement) {
            this.windowElement.remove();
            this.windowElement = null;
            this.isWindowOpen = false;
            console.log('❌ Ventana isométrica cerrada');
        }
    }
};

// Función global para abrir isométrico
function abrirIsometrico() {
    console.log('🗂️ Solicitando apertura de isométrico 3D...');
    IsometricUI.showWindow();
}

console.log('✅ Interfaz isométrica cargada');