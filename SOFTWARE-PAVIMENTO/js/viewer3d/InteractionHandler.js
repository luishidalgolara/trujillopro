// InteractionHandler.js - Gestión de interacciones del usuario
class InteractionHandler {
    constructor(camera, pavementBuilder) {
        this.camera = camera;
        this.pavementBuilder = pavementBuilder;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredCapa = null;
        this.isExplotado = false;
    }

    updateMousePosition(event, rect) {
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        this.detectHover();
    }

    detectHover() {
        const capas = this.pavementBuilder.getCapas();
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(capas.map(c => c.mesh));
        
        if (intersects.length > 0) {
            const objeto = intersects[0].object;
            const capa = capas.find(c => c.mesh === objeto);
            
            if (capa && this.hoveredCapa !== capa) {
                this.onCapaHover(capa);
            }
        } else if (this.hoveredCapa) {
            this.onCapaLeave();
        }
    }

    onCapaHover(capa) {
        this.hoveredCapa = capa;
        document.body.style.cursor = 'pointer';
        
        // Solo cambiar el color (iluminación), SIN mover la capa
        const originalColor = new THREE.Color(capa.data.color);
        const brightColor = originalColor.clone().multiplyScalar(1.3);
        capa.mesh.material.color.copy(brightColor);
    }

    onCapaLeave() {
        if (this.hoveredCapa) {
            // Solo restaurar el color original, SIN mover la capa
            const originalColor = new THREE.Color(this.hoveredCapa.data.color);
            this.hoveredCapa.mesh.material.color.copy(originalColor);
            
            this.hoveredCapa = null;
            document.body.style.cursor = 'default';
        }
    }

    clearHover() {
        this.hoveredCapa = null;
    }

    setupClickHandler(renderer) {
        renderer.domElement.addEventListener('click', (e) => {
            const capas = this.pavementBuilder.getCapas();
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(capas.map(c => c.mesh));
            
            if (intersects.length > 0) {
                const objeto = intersects[0].object;
                const capa = capas.find(c => c.mesh === objeto);
                if (capa) {
                    this.highlightCapa(capa);
                    this.showCapaInfo(capa);
                }
            }
        });
    }

    highlightCapa(capa) {
        const capas = this.pavementBuilder.getCapas();
        
        // Restaurar colores originales de todas las capas
        capas.forEach(c => {
            if (c.mesh.material.color) {
                c.mesh.material.color.setHex(parseInt(c.data.color.replace('#', '0x')));
            }
        });
        
        // Resaltar la capa seleccionada
        const colorOriginal = new THREE.Color(capa.data.color);
        const colorBrillante = colorOriginal.clone().multiplyScalar(1.5);
        capa.mesh.material.color.copy(colorBrillante);
        
        // Volver al color original después de 2 segundos
        setTimeout(() => {
            capa.mesh.material.color.copy(colorOriginal);
        }, 2000);
    }

    showCapaInfo(capa) {
        window.dispatchEvent(new CustomEvent('capaSelected', { 
            detail: capa.data 
        }));
    }

    animateCapaPosition(mesh, targetY, duration) {
        const startY = mesh.position.y;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = this.easeInOutCubic(progress);
            
            mesh.position.y = startY + (targetY - startY) * easeProgress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    setExplotado(value) {
        this.isExplotado = value;
    }
}