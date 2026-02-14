// LabelManager.js - Gestión de etiquetas 3D para las capas de pavimento
class LabelManager {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.labels = [];
        this.labelRenderer = null;
        this.isVisible = false;
        this.svgContainer = null;
        this.lines = [];
        
        this.initLabelRenderer();
        this.initSVGContainer();
        console.log('✅ LabelManager inicializado');
    }

    initLabelRenderer() {
        // Verificar que CSS2DRenderer esté disponible
        if (typeof THREE.CSS2DRenderer === 'undefined') {
            console.error('❌ CSS2DRenderer no está cargado. Verifica que el script esté incluido.');
            return;
        }
        
        // Crear renderer CSS2D para las etiquetas
        this.labelRenderer = new THREE.CSS2DRenderer();
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        this.labelRenderer.domElement.style.left = '0px';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
        this.labelRenderer.domElement.style.zIndex = '1';
        
        // Agregar al contenedor del viewer
        const viewerContainer = document.getElementById('viewer3d');
        if (viewerContainer) {
            viewerContainer.appendChild(this.labelRenderer.domElement);
        }
        
        console.log('✅ CSS2DRenderer inicializado correctamente');
    }

    initSVGContainer() {
        // Crear contenedor SVG para las líneas conectoras
        this.svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svgContainer.style.position = 'absolute';
        this.svgContainer.style.top = '0';
        this.svgContainer.style.left = '0';
        this.svgContainer.style.width = '100%';
        this.svgContainer.style.height = '100%';
        this.svgContainer.style.pointerEvents = 'none';
        this.svgContainer.style.zIndex = '0';
        
        const viewerContainer = document.getElementById('viewer3d');
        if (viewerContainer) {
            viewerContainer.appendChild(this.svgContainer);
        }
        
        console.log('✅ Contenedor SVG para líneas creado');
    }

    crearEtiquetas(capas) {
        // Verificar que CSS2DObject esté disponible
        if (typeof THREE.CSS2DObject === 'undefined') {
            console.error('❌ CSS2DObject no está disponible');
            return;
        }
        
        // Limpiar etiquetas anteriores
        this.limpiarEtiquetas();
        
        capas.forEach((capa, index) => {
            const labelDiv = document.createElement('div');
            labelDiv.className = 'capa-label';
            labelDiv.style.cssText = `
                background: rgba(255, 255, 255, 0.95);
                padding: 10px 14px;
                border-radius: 8px;
                border-left: 4px solid ${capa.data.color};
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                font-family: 'Segoe UI', sans-serif;
                font-size: 12px;
                color: #2c3e50;
                min-width: 220px;
                max-width: 280px;
                backdrop-filter: blur(10px);
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            `;
            
            labelDiv.innerHTML = `
                <div style="font-weight: 700; margin-bottom: 5px; color: #1f2937; font-size: 13px;">
                    ${capa.data.nombre}
                </div>
                <div style="font-size: 11px; color: #6b7280; line-height: 1.5; margin-bottom: 4px;">
                    ${capa.data.descripcion}
                </div>
                <div style="font-size: 10px; color: #9ca3af; font-weight: 600;">
                    📏 Espesor: ${capa.data.espesor}
                </div>
            `;

            const label = new THREE.CSS2DObject(labelDiv);
            
            // Posicionar la etiqueta MÁS LEJOS a la derecha de la capa
            const offset = 5.0; // Aumentado de 3.0 a 5.0 para más separación
            label.position.set(offset, 0, 0);
            
            // Agregar la etiqueta como hijo del mesh de la capa
            capa.mesh.add(label);
            
            this.labels.push({
                label: label,
                div: labelDiv,
                capa: capa,
                line: null  // Se creará después
            });
        });
        
        // Crear líneas conectoras
        this.crearLineasConectoras();
        
        console.log(`🏷️ ${this.labels.length} etiquetas creadas`);
    }

    crearLineasConectoras() {
        // Limpiar líneas anteriores
        this.lines.forEach(line => {
            if (line.parentNode) {
                line.parentNode.removeChild(line);
            }
        });
        this.lines = [];
        
        this.labels.forEach((labelObj, index) => {
            // Crear línea SVG
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('stroke', labelObj.capa.data.color);
            line.setAttribute('stroke-width', '2');
            line.setAttribute('stroke-dasharray', '5,3');
            line.setAttribute('opacity', '0');
            line.style.transition = 'opacity 0.3s ease';
            
            // Crear punto en el origen de la línea
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('r', '4');
            circle.setAttribute('fill', labelObj.capa.data.color);
            circle.setAttribute('opacity', '0');
            circle.style.transition = 'opacity 0.3s ease';
            
            this.svgContainer.appendChild(line);
            this.svgContainer.appendChild(circle);
            
            labelObj.line = line;
            labelObj.circle = circle;
            this.lines.push(line, circle);
        });
        
        console.log(`📏 ${this.labels.length} líneas conectoras creadas`);
    }

    mostrarEtiquetas() {
        this.isVisible = true;
        
        // Animación de fade-in para cada etiqueta y línea
        this.labels.forEach((labelObj, index) => {
            setTimeout(() => {
                labelObj.div.style.opacity = '1';
                if (labelObj.line) {
                    labelObj.line.setAttribute('opacity', '0.7');
                }
                if (labelObj.circle) {
                    labelObj.circle.setAttribute('opacity', '0.9');
                }
            }, index * 100); // Delay escalonado para efecto cascada
        });
        
        console.log('👁️ Etiquetas y líneas mostradas');
    }

    ocultarEtiquetas() {
        this.isVisible = false;
        
        this.labels.forEach(labelObj => {
            labelObj.div.style.opacity = '0';
            if (labelObj.line) {
                labelObj.line.setAttribute('opacity', '0');
            }
            if (labelObj.circle) {
                labelObj.circle.setAttribute('opacity', '0');
            }
        });
        
        console.log('🙈 Etiquetas y líneas ocultadas');
    }

    limpiarEtiquetas() {
        this.labels.forEach(labelObj => {
            // Remover del mesh padre
            if (labelObj.label.parent) {
                labelObj.label.parent.remove(labelObj.label);
            }
            // Limpiar el DOM
            if (labelObj.div.parentNode) {
                labelObj.div.parentNode.removeChild(labelObj.div);
            }
            // Limpiar línea
            if (labelObj.line && labelObj.line.parentNode) {
                labelObj.line.parentNode.removeChild(labelObj.line);
            }
            // Limpiar círculo
            if (labelObj.circle && labelObj.circle.parentNode) {
                labelObj.circle.parentNode.removeChild(labelObj.circle);
            }
        });
        
        this.labels = [];
        this.lines = [];
    }

    actualizarPosiciones() {
        // Las etiquetas se actualizan automáticamente porque están como hijos de los meshes
        // Solo necesitamos renderizar el CSS2DRenderer y actualizar las líneas
        if (this.labelRenderer && this.isVisible) {
            this.labelRenderer.render(this.scene, this.camera);
            this.actualizarLineas();
        }
    }

    actualizarLineas() {
        if (!this.isVisible) return;
        
        const viewerContainer = document.getElementById('viewer3d');
        if (!viewerContainer) return;
        
        const width = viewerContainer.clientWidth;
        const height = viewerContainer.clientHeight;
        
        this.labels.forEach(labelObj => {
            try {
                const mesh = labelObj.capa.mesh;
                
                // Actualizar matriz del mesh para asegurar transformaciones correctas
                mesh.updateMatrixWorld(true);
                
                // Obtener el ancho de la capa
                const capaGeometry = mesh.geometry;
                const capaWidth = capaGeometry.parameters.width;
                
                // Calcular posición del borde DERECHO en coordenadas del mundo
                const bordeDerechoLocal = new THREE.Vector3(capaWidth / 2, 0, 0);
                const bordeDerechoWorld = bordeDerechoLocal.applyMatrix4(mesh.matrixWorld);
                
                // Convertir a coordenadas de pantalla
                const bordeScreen = bordeDerechoWorld.clone().project(this.camera);
                const bordeX = (bordeScreen.x * 0.5 + 0.5) * width;
                const bordeY = (-bordeScreen.y * 0.5 + 0.5) * height;
                
                // Obtener posición de la etiqueta
                labelObj.label.updateMatrixWorld(true);
                const labelWorldPos = new THREE.Vector3();
                labelObj.label.getWorldPosition(labelWorldPos);
                
                const labelScreen = labelWorldPos.clone().project(this.camera);
                const labelCenterX = (labelScreen.x * 0.5 + 0.5) * width;
                const labelCenterY = (-labelScreen.y * 0.5 + 0.5) * height;
                
                // Ajustar para el borde izquierdo de la etiqueta
                const labelBoxWidth = 220;
                const labelStartX = labelCenterX - (labelBoxWidth / 2) - 10;
                
                // Actualizar línea
                if (labelObj.line) {
                    labelObj.line.setAttribute('x1', Math.round(bordeX));
                    labelObj.line.setAttribute('y1', Math.round(bordeY));
                    labelObj.line.setAttribute('x2', Math.round(labelStartX));
                    labelObj.line.setAttribute('y2', Math.round(labelCenterY));
                }
                
                // Actualizar círculo
                if (labelObj.circle) {
                    labelObj.circle.setAttribute('cx', Math.round(bordeX));
                    labelObj.circle.setAttribute('cy', Math.round(bordeY));
                }
            } catch (error) {
                // Silenciar errores
            }
        });
    }

    render() {
        // Renderizar las etiquetas si están visibles
        if (this.labelRenderer && this.isVisible) {
            try {
                this.labelRenderer.render(this.scene, this.camera);
                this.actualizarLineas();
            } catch (error) {
                console.error('Error al renderizar etiquetas:', error);
            }
        }
    }

    onWindowResize(width, height) {
        if (this.labelRenderer) {
            this.labelRenderer.setSize(width, height);
        }
    }

    toggle(capas) {
        if (this.isVisible) {
            this.ocultarEtiquetas();
        } else {
            // Si no hay etiquetas creadas, crearlas primero
            if (this.labels.length === 0) {
                this.crearEtiquetas(capas);
            }
            this.mostrarEtiquetas();
        }
    }

    getIsVisible() {
        return this.isVisible;
    }

    // Método para actualizar etiquetas cuando cambia el tipo de pavimento
    actualizarParaNuevoPavimento(capas) {
        this.limpiarEtiquetas();
        this.isVisible = false;
    }
}