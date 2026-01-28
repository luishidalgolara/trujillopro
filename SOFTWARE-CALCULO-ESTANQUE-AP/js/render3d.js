// Módulo de renderizado 3D con Three.js
const Render3D = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    estanque: null,
    grid: null,
    animationId: null,
    dimensionesActuales: {},
    // ✅ MEJORADO: Variable global para mantener la distancia de cámara
    cameraDistance: 15,
    cameraAngle: { theta: Math.PI / 4, phi: Math.PI / 6 },

    // Inicializar escena 3D
    init: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Contenedor no encontrado');
            return;
        }

        // Limpiar contenedor
        container.innerHTML = '';

        const width = container.clientWidth;
        const height = container.clientHeight;

        // Crear escena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);

        // Crear cámara
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        this.camera.position.set(8, 6, 8);
        this.camera.lookAt(0, 0, 0);

        // Crear renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);

        // Iluminación
        this.setupLights();

        // Grid del suelo
        this.setupGrid();

        // Ejes de referencia (opcional)
        // const axesHelper = new THREE.AxesHelper(5);
        // this.scene.add(axesHelper);

        // Controles de cámara simplificados (rotación con mouse)
        this.setupControls(container);

        // Manejar resize
        window.addEventListener('resize', () => this.onWindowResize(container));

        // Iniciar animación
        this.animate();
    },

    // Configurar luces
    setupLights: function() {
        // Luz ambiental
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Luz direccional (sol)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -20;
        directionalLight.shadow.camera.right = 20;
        directionalLight.shadow.camera.top = 20;
        directionalLight.shadow.camera.bottom = -20;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Luz de relleno
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 10, -5);
        this.scene.add(fillLight);
    },

    // Configurar grid del suelo
    setupGrid: function() {
        // Plano del suelo
        const planeGeometry = new THREE.PlaneGeometry(50, 50);
        const planeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x90EE90,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = 0;
        plane.receiveShadow = true;
        this.scene.add(plane);

        // Grid
        this.grid = new THREE.GridHelper(50, 50, 0x444444, 0x888888);
        this.grid.position.y = 0.01;
        this.scene.add(this.grid);
    },

    // ✅ MEJORADO: Configurar controles de cámara con mejor zoom
    setupControls: function(container) {
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            this.cameraAngle.theta -= deltaX * 0.01;
            this.cameraAngle.phi -= deltaY * 0.01;

            // Limitar ángulo vertical
            this.cameraAngle.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, this.cameraAngle.phi));

            this.updateCameraPosition(this.cameraAngle, this.cameraDistance);

            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        container.addEventListener('mouseup', () => {
            isDragging = false;
        });

        container.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        // ✅ MEJORADO: Zoom con rueda del mouse - MUCHO MÁS POTENTE
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            // Zoom más rápido y con rango mayor
            const zoomSpeed = e.deltaY > 0 ? 1.5 : -1.5; // Incremento por scroll
            this.cameraDistance += zoomSpeed;
            
            // ✅ LÍMITES AMPLIADOS: desde 1 metro (muy cerca) hasta 50 metros (muy lejos)
            this.cameraDistance = Math.max(1, Math.min(50, this.cameraDistance));
            
            this.updateCameraPosition(this.cameraAngle, this.cameraDistance);
            
            // Opcional: Mostrar distancia actual en consola
            // console.log('Distancia cámara:', this.cameraDistance.toFixed(1) + 'm');
        });
    },

    // Actualizar posición de cámara
    updateCameraPosition: function(angle, distance) {
        this.camera.position.x = distance * Math.sin(angle.phi) * Math.cos(angle.theta);
        this.camera.position.y = distance * Math.cos(angle.phi);
        this.camera.position.z = distance * Math.sin(angle.phi) * Math.sin(angle.theta);
        this.camera.lookAt(0, 1, 0);
    },

    // Crear o actualizar estanque 3D
    crearEstanque: function(largo, ancho, altura, espesorMuros = 0.2, espesorFondo = 0.25) {
        // Eliminar estanque anterior si existe
        if (this.estanque) {
            this.scene.remove(this.estanque);
            this.estanque.traverse((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
        }

        this.dimensionesActuales = { largo, ancho, altura, espesorMuros, espesorFondo };

        // Grupo para el estanque
        this.estanque = new THREE.Group();

        // Colores
        const colorHormigon = 0xA9A9A9;
        const colorAgua = 0x1E90FF;

        // Material del hormigón
        const materialHormigon = new THREE.MeshStandardMaterial({
            color: colorHormigon,
            roughness: 0.8,
            metalness: 0.2
        });

        // Material del agua
        const materialAgua = new THREE.MeshStandardMaterial({
            color: colorAgua,
            transparent: true,
            opacity: 0.6,
            roughness: 0.1,
            metalness: 0.1
        });

        // FONDO
        const fondoGeometry = new THREE.BoxGeometry(
            largo + 2 * espesorMuros,
            espesorFondo,
            ancho + 2 * espesorMuros
        );
        const fondo = new THREE.Mesh(fondoGeometry, materialHormigon);
        fondo.position.y = espesorFondo / 2;
        fondo.castShadow = true;
        fondo.receiveShadow = true;
        this.estanque.add(fondo);

        // MURO FRONTAL
        const muroFrontalGeometry = new THREE.BoxGeometry(largo, altura, espesorMuros);
        const muroFrontal = new THREE.Mesh(muroFrontalGeometry, materialHormigon);
        muroFrontal.position.set(0, espesorFondo + altura / 2, -(ancho / 2 + espesorMuros / 2));
        muroFrontal.castShadow = true;
        muroFrontal.receiveShadow = true;
        this.estanque.add(muroFrontal);

        // MURO TRASERO
        const muroTraseroGeometry = new THREE.BoxGeometry(largo, altura, espesorMuros);
        const muroTrasero = new THREE.Mesh(muroTraseroGeometry, materialHormigon);
        muroTrasero.position.set(0, espesorFondo + altura / 2, ancho / 2 + espesorMuros / 2);
        muroTrasero.castShadow = true;
        muroTrasero.receiveShadow = true;
        this.estanque.add(muroTrasero);

        // MURO IZQUIERDO
        const muroIzquierdoGeometry = new THREE.BoxGeometry(espesorMuros, altura, ancho + 2 * espesorMuros);
        const muroIzquierdo = new THREE.Mesh(muroIzquierdoGeometry, materialHormigon);
        muroIzquierdo.position.set(-(largo / 2 + espesorMuros / 2), espesorFondo + altura / 2, 0);
        muroIzquierdo.castShadow = true;
        muroIzquierdo.receiveShadow = true;
        this.estanque.add(muroIzquierdo);

        // MURO DERECHO
        const muroDerechoGeometry = new THREE.BoxGeometry(espesorMuros, altura, ancho + 2 * espesorMuros);
        const muroDerecho = new THREE.Mesh(muroDerechoGeometry, materialHormigon);
        muroDerecho.position.set(largo / 2 + espesorMuros / 2, espesorFondo + altura / 2, 0);
        muroDerecho.castShadow = true;
        muroDerecho.receiveShadow = true;
        this.estanque.add(muroDerecho);

        // AGUA (hasta 90% de la altura considerando borde libre)
        const alturaAgua = altura * 0.85;
        const aguaGeometry = new THREE.BoxGeometry(largo - 0.05, alturaAgua, ancho - 0.05);
        const agua = new THREE.Mesh(aguaGeometry, materialAgua);
        agua.position.y = espesorFondo + alturaAgua / 2;
        this.estanque.add(agua);

        // Agregar etiquetas de dimensiones
        this.agregarEtiquetas(largo, ancho, altura, espesorFondo);

        // Centrar el estanque
        this.estanque.position.y = 0;

        this.scene.add(this.estanque);
    },

    // Agregar etiquetas de dimensiones
    agregarEtiquetas: function(largo, ancho, altura, espesorFondo) {
        // Crear canvas para texto
        const crearTexto = (texto) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 64;
            
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = 'Bold 24px Arial';
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(texto, canvas.width / 2, canvas.height / 2);
            
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(2, 0.5, 1);
            
            return sprite;
        };

        // Etiqueta de largo
        const etiquetaLargo = crearTexto(`L: ${largo.toFixed(1)}m`);
        etiquetaLargo.position.set(0, espesorFondo - 0.5, -(ancho / 2 + 1));
        this.estanque.add(etiquetaLargo);

        // Etiqueta de ancho
        const etiquetaAncho = crearTexto(`A: ${ancho.toFixed(1)}m`);
        etiquetaAncho.position.set(largo / 2 + 1, espesorFondo - 0.5, 0);
        this.estanque.add(etiquetaAncho);

        // Etiqueta de altura
        const etiquetaAltura = crearTexto(`H: ${altura.toFixed(1)}m`);
        etiquetaAltura.position.set(-(largo / 2 + 1.5), espesorFondo + altura / 2, 0);
        this.estanque.add(etiquetaAltura);
    },

    // Animar escena
    animate: function() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    },

    // Manejar cambio de tamaño de ventana
    onWindowResize: function(container) {
        if (!container || !this.camera || !this.renderer) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    },

    // ✅ MEJORADO: Resetear vista de cámara con distancia guardada
    resetView: function() {
        this.cameraDistance = 15;
        this.cameraAngle = { theta: Math.PI / 4, phi: Math.PI / 6 };
        this.updateCameraPosition(this.cameraAngle, this.cameraDistance);
    },

    // Toggle grid
    toggleGrid: function() {
        if (this.grid) {
            this.grid.visible = !this.grid.visible;
        }
    },

    // Destruir escena (limpieza)
    destroy: function() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        if (this.scene) {
            this.scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        }
    },

    // Obtener dimensiones actuales
    getDimensiones: function() {
        return this.dimensionesActuales;
    },

    // ⭐ INTEGRACIÓN SALA DE BOMBAS ⭐
    
    /**
     * Integrar sala de bombas a la escena
     */
    integrarSalaBombas: function(datosBombas) {
        if (typeof SalaBombas !== 'undefined') {
            console.log('🔧 Integrando sala de bombas...');
            SalaBombas.crear(this.scene, datosBombas);
        } else {
            console.warn('⚠️ Módulo SalaBombas no está cargado');
        }
    },

    /**
     * Eliminar sala de bombas de la escena
     */
    eliminarSalaBombas: function() {
        if (typeof SalaBombas !== 'undefined') {
            console.log('🗑️ Eliminando sala de bombas...');
            SalaBombas.eliminar(this.scene);
        }
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Render3D;
}