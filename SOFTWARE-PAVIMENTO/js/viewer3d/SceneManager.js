// SceneManager.js - Gestión de la escena 3D, luces y ambiente
class SceneManager {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.renderer = null;
        this.initScene();
        this.initRenderer();
        this.setupLights();
    }

    initScene() {
        this.scene = new THREE.Scene();
        // Fondo tipo cielo despejado
        this.scene.background = new THREE.Color(0xd4e4f7); // Azul cielo claro
        this.scene.fog = new THREE.Fog(0xd4e4f7, 15, 40);
        console.log('✅ Escena 3D creada');
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.container.appendChild(this.renderer.domElement);
        console.log('✅ Renderer WebGL inicializado');
    }

    setupLights() {
        // Luz ambiente suave
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Luz principal (key light) con sombras
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
        keyLight.position.set(12, 18, 10);
        keyLight.castShadow = true;
        keyLight.shadow.camera.left = -12;
        keyLight.shadow.camera.right = 12;
        keyLight.shadow.camera.top = 12;
        keyLight.shadow.camera.bottom = -12;
        keyLight.shadow.mapSize.width = 4096;
        keyLight.shadow.mapSize.height = 4096;
        keyLight.shadow.bias = -0.0002;
        this.scene.add(keyLight);

        // Luz de relleno (fill light)
        const fillLight = new THREE.DirectionalLight(0xd4e4ff, 0.5);
        fillLight.position.set(-10, 10, -8);
        this.scene.add(fillLight);

        // Luz de contorno (rim light)
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
        rimLight.position.set(-5, 5, -10);
        this.scene.add(rimLight);

        // Luz desde abajo (iluminación inferior)
        const bottomLight = new THREE.DirectionalLight(0xffffff, 0.2);
        bottomLight.position.set(0, -8, 0);
        this.scene.add(bottomLight);

        console.log('✅ Sistema de iluminación configurado');
    }

    getScene() {
        return this.scene;
    }

    getRenderer() {
        return this.renderer;
    }

    render(camera) {
        this.renderer.render(this.scene, camera);
    }

    onWindowResize(camera, container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }
}