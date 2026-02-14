// CameraControls.js - Gestión de cámara y controles de interacción
class CameraControls {
    constructor(container, scene) {
        this.container = container;
        this.scene = scene;
        this.camera = null;
        this.rotationAngle = Math.PI / 4;
        this.isRotating = false;
        
        this.initCamera();
    }

    initCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000);
        this.camera.position.set(9, 7, 9);
        this.camera.lookAt(0, 2, 0);
        
        console.log('✅ Cámara inicializada');
    }

    setupControls(renderer, interactionHandler) {
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        renderer.domElement.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
            this.isRotating = false;
        });

        renderer.domElement.addEventListener('mousemove', (e) => {
            // Actualizar mouse para raycasting (si hay interaction handler)
            if (interactionHandler) {
                const rect = renderer.domElement.getBoundingClientRect();
                interactionHandler.updateMousePosition(e, rect);
            }

            if (isDragging) {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;
                const rotationSpeed = 0.006;
                
                const radius = Math.sqrt(this.camera.position.x ** 2 + this.camera.position.z ** 2);
                const angle = Math.atan2(this.camera.position.z, this.camera.position.x);
                
                const newAngle = angle + deltaX * rotationSpeed;
                this.camera.position.x = radius * Math.cos(newAngle);
                this.camera.position.z = radius * Math.sin(newAngle);
                this.camera.position.y = Math.max(2, Math.min(15, this.camera.position.y - deltaY * 0.06));
                
                this.camera.lookAt(0, 2, 0);
                previousMousePosition = { x: e.clientX, y: e.clientY };
            }
        });

        renderer.domElement.addEventListener('mouseup', () => {
            isDragging = false;
        });

        renderer.domElement.addEventListener('mouseleave', () => {
            isDragging = false;
            if (interactionHandler) {
                interactionHandler.clearHover();
            }
        });

        renderer.domElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.handleZoom(e);
        }, { passive: false });
        
        console.log('✅ Controles de cámara configurados');
    }

    handleZoom(e) {
        const zoomSpeed = 0.4;
        const delta = e.deltaY > 0 ? 1 : -1;
        
        const direction = new THREE.Vector3();
        direction.subVectors(this.camera.position, new THREE.Vector3(0, 2, 0)).normalize();
        
        const newPosition = this.camera.position.clone().addScaledVector(direction, delta * zoomSpeed);
        const distance = newPosition.distanceTo(new THREE.Vector3(0, 2, 0));
        
        if (distance > 5 && distance < 18) {
            this.camera.position.copy(newPosition);
        }
    }

    toggleRotacion() {
        this.isRotating = !this.isRotating;
    }

    resetVista() {
        this.camera.position.set(9, 7, 9);
        this.camera.lookAt(0, 2, 0);
        this.isRotating = false;
    }

    updateRotation() {
        if (this.isRotating) {
            this.rotationAngle += 0.004;
            const radius = 11;
            this.camera.position.x = Math.sin(this.rotationAngle) * radius;
            this.camera.position.z = Math.cos(this.rotationAngle) * radius;
            this.camera.position.y = 7;
            this.camera.lookAt(0, 2, 0);
        }
    }

    iniciarRotacionInicial() {
        const startTime = Date.now();
        const duration = 5000;
        const startAngle = this.rotationAngle;
        const endAngle = startAngle + Math.PI / 2;
        
        const rotate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = this.easeInOutCubic(progress);
            
            this.rotationAngle = startAngle + (endAngle - startAngle) * easeProgress;
            const radius = 11;
            this.camera.position.x = Math.sin(this.rotationAngle) * radius;
            this.camera.position.z = Math.cos(this.rotationAngle) * radius;
            this.camera.lookAt(0, 2, 0);
            
            if (progress < 1) {
                requestAnimationFrame(rotate);
            }
        };
        
        rotate();
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    getCamera() {
        return this.camera;
    }
}
