/**
 * CONFIGURACIÓN THREE.JS
 * Configuración base para visualización 3D de elementos estructurales
 */

class ThreeConfig {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.objects = [];
        
        this.init();
    }
    
    init() {
        // Crear escena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        
        // Configurar cámara
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);
        
        // Configurar renderizador
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        // Agregar controles de órbita
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 50;
        
        // Agregar luces
        this.addLights();
        
        // Agregar grilla y ejes
        this.addGrid();
        this.addAxes();
        
        // Manejar redimensionamiento
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Iniciar animación
        this.animate();
    }
    
    addLights() {
        // Luz ambiental
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Luz direccional principal
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 10, 5);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 10;
        dirLight.shadow.camera.bottom = -10;
        dirLight.shadow.camera.left = -10;
        dirLight.shadow.camera.right = 10;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);
        
        // Luz de relleno
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 5, -5);
        this.scene.add(fillLight);
    }
    
    addGrid() {
        const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0xcccccc);
        gridHelper.position.y = 0;
        this.scene.add(gridHelper);
    }
    
    addAxes() {
        const axesHelper = new THREE.AxesHelper(3);
        this.scene.add(axesHelper);
        
        // Etiquetas de ejes
        this.addAxisLabel('X', new THREE.Vector3(3.2, 0, 0), 0xff0000);
        this.addAxisLabel('Y', new THREE.Vector3(0, 3.2, 0), 0x00ff00);
        this.addAxisLabel('Z', new THREE.Vector3(0, 0, 3.2), 0x0000ff);
    }
    
    addAxisLabel(text, position, color) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
        
        context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        context.font = 'Bold 48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 32, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.position.copy(position);
        sprite.scale.set(0.5, 0.5, 0.5);
        this.scene.add(sprite);
    }
    
    createBox(width, height, depth, color = 0x3498db, position = {x: 0, y: 0, z: 0}) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            roughness: 0.5,
            metalness: 0.1
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.objects.push(mesh);
        return mesh;
    }
    
    createCylinder(radiusTop, radiusBottom, height, color = 0xe74c3c, position = {x: 0, y: 0, z: 0}) {
        const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32);
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            roughness: 0.5,
            metalness: 0.1
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.objects.push(mesh);
        return mesh;
    }
    
    createPlane(width, depth, color = 0x95a5a6, position = {x: 0, y: 0, z: 0}) {
        const geometry = new THREE.PlaneGeometry(width, depth);
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            side: THREE.DoubleSide,
            roughness: 0.8,
            metalness: 0.0
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(position.x, position.y, position.z);
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.objects.push(mesh);
        return mesh;
    }
    
    createWireframe(width, height, depth, position = {x: 0, y: 0, z: 0}) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 });
        const wireframe = new THREE.LineSegments(edges, material);
        wireframe.position.set(position.x, position.y, position.z);
        this.scene.add(wireframe);
        this.objects.push(wireframe);
        return wireframe;
    }
    
    addDimension(from, to, text, offset = 0.3) {
        // Línea de cota
        const points = [];
        points.push(new THREE.Vector3(from.x, from.y, from.z));
        points.push(new THREE.Vector3(to.x, to.y, to.z));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        this.objects.push(line);
        
        // Texto de dimensión
        const midpoint = new THREE.Vector3(
            (from.x + to.x) / 2,
            (from.y + to.y) / 2 + offset,
            (from.z + to.z) / 2
        );
        
        this.addText(text, midpoint);
    }
    
    addText(text, position, color = 0x000000, size = 0.3) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;
        
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        context.font = 'Bold 36px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 128, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.position.copy(position);
        sprite.scale.set(size * 2, size, 1);
        this.scene.add(sprite);
        this.objects.push(sprite);
    }
    
    clearObjects() {
        // Eliminar todos los objetos creados (excepto luces, grilla, ejes)
        this.objects.forEach(obj => {
            this.scene.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(mat => mat.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        });
        this.objects = [];
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    
    resetCamera(position = {x: 5, y: 5, z: 5}) {
        this.camera.position.set(position.x, position.y, position.z);
        this.camera.lookAt(0, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThreeConfig;
}
