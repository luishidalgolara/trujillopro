// Viewer3D.js - Clase principal que integra todos los módulos
class Viewer3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentTipo = 'flexible';
        
        // Inicializar módulos
        this.sceneManager = new SceneManager(this.container);
        this.cameraControls = new CameraControls(
            this.container, 
            this.sceneManager.getScene()
        );
        this.pavementBuilder = new PavementBuilder(this.sceneManager.getScene());
        this.interactionHandler = new InteractionHandler(
            this.cameraControls.getCamera(),
            this.pavementBuilder
        );
        this.animationController = new AnimationController(this.pavementBuilder);
        
        // Configurar controles
        this.cameraControls.setupControls(
            this.sceneManager.getRenderer(),
            this.interactionHandler
        );
        
        // Configurar click handler
        this.interactionHandler.setupClickHandler(this.sceneManager.getRenderer());
        
        // Configurar resize
        this.setupWindowResize();
        
        // Iniciar loop de animación
        this.animate();
        
        console.log('✅ Viewer3D completamente inicializado');
    }

    cargarPavimento(tipo) {
        this.currentTipo = tipo;
        this.pavementBuilder.cargarPavimento(tipo, pavimentosData);
    }

    explotar() {
        const explotado = this.animationController.explotar();
        this.interactionHandler.setExplotado(explotado);
    }

    toggleRotacion() {
        this.cameraControls.toggleRotacion();
    }

    resetVista() {
        this.cameraControls.resetVista();
        this.animationController.reset();
    }

    toggleCapaVisibility(index, visible) {
        this.pavementBuilder.toggleCapaVisibility(index, visible);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Actualizar rotación de cámara si está activa
        this.cameraControls.updateRotation();
        
        // Renderizar escena
        this.sceneManager.render(this.cameraControls.getCamera());
    }

    setupWindowResize() {
        window.addEventListener('resize', () => {
            this.sceneManager.onWindowResize(
                this.cameraControls.getCamera(),
                this.container
            );
        });
    }

    // Propiedades públicas para compatibilidad con código existente
    get scene() {
        return this.sceneManager.getScene();
    }

    get camera() {
        return this.cameraControls.getCamera();
    }

    get renderer() {
        return this.sceneManager.getRenderer();
    }

    get capas() {
        return this.pavementBuilder.getCapas();
    }

    get isExplotado() {
        return this.animationController.getIsExplotado();
    }

    get isRotating() {
        return this.cameraControls.isRotating;
    }
}

// Variable global del viewer
let viewer3D = null;