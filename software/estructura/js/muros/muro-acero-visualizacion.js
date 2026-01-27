/**
 * MURO-ACERO-VISUALIZACION.JS
 * Visualización 3D completa y detallada del ACERO del muro de contención
 * Este archivo contiene TODO el código robusto de fierros
 */

const MuroAceroVisualizacion = {
    // Variables de escena
    sceneAcero: null,
    cameraAcero: null,
    rendererAcero: null,
    controlsAcero: null,
    initialized: false,

    /**
     * Inicializar escena 3D para Solo Acero
     */
    init() {
        const container = document.getElementById('canvasAcero');
        
        // Crear escena
        this.sceneAcero = new THREE.Scene();
        this.sceneAcero.background = new THREE.Color(0x1a1a1a);
        
        // Configurar cámara
        this.cameraAcero = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        this.cameraAcero.position.set(5, 3, 5);
        this.cameraAcero.lookAt(0, 2, 0);
        
        // Configurar renderer
        this.rendererAcero = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.rendererAcero.setSize(container.clientWidth, container.clientHeight);
        this.rendererAcero.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.rendererAcero.domElement);
        
        // Controles orbitales
        this.controlsAcero = new THREE.OrbitControls(this.cameraAcero, this.rendererAcero.domElement);
        this.controlsAcero.enableDamping = true;
        this.controlsAcero.dampingFactor = 0.05;
        
        // Luces potentes
        this.agregarLuces();
        
        // Iniciar animación
        this.animate();
        
        this.initialized = true;
        console.log('✅ Escena de acero inicializada');
    },

    /**
     * Agregar sistema de iluminación potente
     */
    agregarLuces() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        this.sceneAcero.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(10, 10, 10);
        this.sceneAcero.add(mainLight);
        
        const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
        fillLight1.position.set(-10, 10, -10);
        this.sceneAcero.add(fillLight1);
        
        const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        fillLight2.position.set(5, -5, 5);
        this.sceneAcero.add(fillLight2);
    },

    /**
     * Loop de animación
     */
    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.controlsAcero) {
            this.controlsAcero.update();
        }
        if (this.rendererAcero && this.sceneAcero && this.cameraAcero) {
            this.rendererAcero.render(this.sceneAcero, this.cameraAcero);
        }
    },

    /**
     * Actualizar visualización de solo acero
     */
    actualizar(datos) {
        if (!this.initialized) {
            console.error('Escena de acero no inicializada');
            return;
        }

        console.log('Iniciando visualización de solo acero del muro...');
        
        try {
            // Limpiar escena
            this.limpiarEscena();
            
            // Re-agregar luces
            this.agregarLuces();
            
            const H = datos.H;
            const B = datos.B;
            const t_base = datos.t_base;
            const t_corona = datos.t_corona;
            const h_zapata = datos.h_zapata;
            const diametroMuro = datos.dist_muro.diametro;
            const espaciamientoMuro = datos.dist_muro.espaciamiento / 100;
            const diametroZapata = datos.dist_talon.diametro;
            const espaciamientoZapata = datos.dist_talon.espaciamiento / 100;
            
            const puntera = 0.3;
            const talon = B - t_base - puntera;
            const recubrimiento = 0.05;
            
            // Crear estructuras semitransparentes
            this.crearEstructurasSemitransparentes(H, B, t_base, t_corona, h_zapata, puntera);
            
            // Crear acero del muro
            this.crearAceroMuro(H, t_base, t_corona, h_zapata, puntera, recubrimiento);
            
            // Crear acero de la zapata
            this.crearAceroZapata(B, h_zapata, t_base, talon, puntera, recubrimiento);
            
            // Crear acero del shear key
            this.crearAceroShearKey(t_base, puntera, recubrimiento);
            
            console.log('✅ Visualización profesional completada - Malla densa con doble cara');
            
            // Ajustar cámara
            this.cameraAcero.position.set(B * 1.5, H * 0.8, B * 1.8);
            this.cameraAcero.lookAt(-0.2, H/2, 0);
            this.controlsAcero.target.set(-0.2, H/2, 0);
            this.controlsAcero.update();
            
        } catch (error) {
            console.error('Error en actualizar acero:', error);
        }
    },

    /**
     * Limpiar escena
     */
    limpiarEscena() {
        while(this.sceneAcero.children.length > 0) { 
            const object = this.sceneAcero.children[0];
            if (object.geometry) object.geometry.dispose();
            if (object.material) object.material.dispose();
            this.sceneAcero.remove(object);
        }
    },

    /**
     * Crear muro y zapata semitransparentes
     */
    crearEstructurasSemitransparentes(H, B, t_base, t_corona, h_zapata, puntera) {
        const depth = 1.5;
        const x_base = -puntera - t_base/2;
        const x_top = -puntera - t_corona/2;
        
        // Material semitransparente
        const materialSemi = new THREE.MeshStandardMaterial({
            color: 0xdddddd,
            roughness: 0.8,
            metalness: 0.1,
            transparent: true,
            opacity: 0.12,
            side: THREE.DoubleSide
        });
        
        // Muro trapezoidal
        const muroGeometry = new THREE.BufferGeometry();
        const muroVertices = new Float32Array([
            x_base, h_zapata, depth/2,
            x_base + t_base, h_zapata, depth/2,
            x_top + t_corona, h_zapata + H, depth/2,
            x_top, h_zapata + H, depth/2,
            x_base, h_zapata, -depth/2,
            x_base + t_base, h_zapata, -depth/2,
            x_top + t_corona, h_zapata + H, -depth/2,
            x_top, h_zapata + H, -depth/2
        ]);
        
        const muroIndices = [
            0, 1, 2,  0, 2, 3,
            4, 6, 5,  4, 7, 6,
            0, 3, 7,  0, 7, 4,
            1, 5, 6,  1, 6, 2,
            3, 2, 6,  3, 6, 7,
            0, 4, 5,  0, 5, 1
        ];
        
        muroGeometry.setAttribute('position', new THREE.BufferAttribute(muroVertices, 3));
        muroGeometry.setIndex(muroIndices);
        muroGeometry.computeVertexNormals();
        
        const muro = new THREE.Mesh(muroGeometry, materialSemi);
        this.sceneAcero.add(muro);
        
        // Zapata
        const zapataGeometry = new THREE.BoxGeometry(B, h_zapata, depth);
        const zapata = new THREE.Mesh(zapataGeometry, materialSemi);
        zapata.position.set(0, h_zapata/2, 0);
        this.sceneAcero.add(zapata);
        
        // Shear key
        const shearKeyGeometry = new THREE.BoxGeometry(0.3, 0.3, depth);
        const shearKey = new THREE.Mesh(shearKeyGeometry, materialSemi);
        shearKey.position.set(x_base + t_base/2, -0.15, 0);
        this.sceneAcero.add(shearKey);
    },

    /**
     * Crear todo el acero del muro vertical
     */
    crearAceroMuro(H, t_base, t_corona, h_zapata, puntera, recubrimiento) {
        const depth = 1.5;
        const x_base = -puntera - t_base/2;
        const x_top = -puntera - t_corona/2;
        const barRadiusMain = 0.007;
        
        // Materiales
        const barMaterialMuro = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            roughness: 0.15,
            metalness: 1.0,
            emissive: 0xff0000,
            emissiveIntensity: 0.4
        });
        
        const barMaterialDistribucion = new THREE.MeshStandardMaterial({
            color: 0xff7700,
            roughness: 0.15,
            metalness: 1.0,
            emissive: 0xff6600,
            emissiveIntensity: 0.35
        });
        
        const barMaterialEstribo = new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            roughness: 0.15,
            metalness: 1.0,
            emissive: 0xff9900,
            emissiveIntensity: 0.3
        });
        
        // BARRAS VERTICALES - CARA FRONTAL
        const espaciadoVertical = 0.15;
        const numBarrasZ = Math.ceil(depth / espaciadoVertical);
        
        for (let i = 0; i < numBarrasZ; i++) {
            const z = -depth/2 + (i * depth / (numBarrasZ - 1));
            
            // Barra principal
            const barGeometry = new THREE.CylinderGeometry(barRadiusMain, barRadiusMain, H, 16);
            const barra = new THREE.Mesh(barGeometry, barMaterialMuro);
            barra.position.set(x_base + recubrimiento, h_zapata + H/2, z);
            this.sceneAcero.add(barra);
            
            // Gancho superior
            const ganchoLength = 0.15;
            const ganchoGeometry = new THREE.CylinderGeometry(barRadiusMain, barRadiusMain, ganchoLength, 16);
            const gancho1 = new THREE.Mesh(ganchoGeometry, barMaterialMuro);
            gancho1.rotation.z = Math.PI / 2;
            gancho1.position.set(x_base + recubrimiento + ganchoLength/2, h_zapata + H, z);
            this.sceneAcero.add(gancho1);
            
            // Anclaje en zapata
            const anclajeHeight = h_zapata - recubrimiento * 1.5;
            const anclajeGeometry = new THREE.CylinderGeometry(barRadiusMain, barRadiusMain, anclajeHeight, 16);
            const anclaje = new THREE.Mesh(anclajeGeometry, barMaterialMuro);
            anclaje.position.set(x_base + recubrimiento, anclajeHeight/2 + recubrimiento, z);
            this.sceneAcero.add(anclaje);
            
            // Gancho horizontal en zapata
            const ganchoZapataLength = 0.25;
            const ganchoZapata = new THREE.CylinderGeometry(barRadiusMain, barRadiusMain, ganchoZapataLength, 16);
            const gancho2 = new THREE.Mesh(ganchoZapata, barMaterialMuro);
            gancho2.rotation.z = Math.PI / 2;
            gancho2.position.set(x_base + recubrimiento + ganchoZapataLength/2, recubrimiento, z);
            this.sceneAcero.add(gancho2);
        }
        
        // BARRAS VERTICALES - CARA TRASERA
        for (let i = 0; i < numBarrasZ; i++) {
            const z = -depth/2 + (i * depth / (numBarrasZ - 1));
            
            const barGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.9, barRadiusMain * 0.9, H, 16);
            const barra = new THREE.Mesh(barGeometry, barMaterialMuro);
            barra.position.set(x_base + t_base - recubrimiento, h_zapata + H/2, z);
            this.sceneAcero.add(barra);
            
            // Gancho superior
            const ganchoLength = 0.15;
            const ganchoGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.9, barRadiusMain * 0.9, ganchoLength, 16);
            const gancho1 = new THREE.Mesh(ganchoGeometry, barMaterialMuro);
            gancho1.rotation.z = -Math.PI / 2;
            gancho1.position.set(x_base + t_base - recubrimiento - ganchoLength/2, h_zapata + H, z);
            this.sceneAcero.add(gancho1);
            
            // Anclaje en zapata
            const anclajeHeight = h_zapata - recubrimiento * 1.5;
            const anclajeGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.9, barRadiusMain * 0.9, anclajeHeight, 16);
            const anclaje = new THREE.Mesh(anclajeGeometry, barMaterialMuro);
            anclaje.position.set(x_base + t_base - recubrimiento, anclajeHeight/2 + recubrimiento, z);
            this.sceneAcero.add(anclaje);
        }
        
        // ESTRIBOS CERRADOS - MUY DENSOS
        const espaciadoEstribos = 0.15;
        const numEstribos = Math.ceil(H / espaciadoEstribos);
        const radiusEstribo = barRadiusMain * 0.65;
        
        for (let i = 0; i < numEstribos; i++) {
            const y = h_zapata + (i * espaciadoEstribos) + 0.075;
            const proporcionAltura = i / numEstribos;
            const anchoActual = t_base - (t_base - t_corona) * proporcionAltura - 2 * recubrimiento;
            const profundidadEstribo = depth - 2 * recubrimiento;
            
            const points = [];
            points.push(new THREE.Vector3(-anchoActual/2, -profundidadEstribo/2, 0));
            points.push(new THREE.Vector3(anchoActual/2, -profundidadEstribo/2, 0));
            points.push(new THREE.Vector3(anchoActual/2, profundidadEstribo/2, 0));
            points.push(new THREE.Vector3(-anchoActual/2, profundidadEstribo/2, 0));
            points.push(new THREE.Vector3(-anchoActual/2, -profundidadEstribo/2, 0));
            
            const curve = new THREE.CatmullRomCurve3(points);
            const tubeGeometry = new THREE.TubeGeometry(curve, 20, radiusEstribo, 8, false);
            const estribo = new THREE.Mesh(tubeGeometry, barMaterialEstribo);
            
            const xEstribo = x_base + anchoActual/2 + recubrimiento;
            estribo.position.set(xEstribo, y, 0);
            this.sceneAcero.add(estribo);
        }
        
        // ACERO DE DISTRIBUCIÓN HORIZONTAL
        const espaciadoHorizontal = 0.10;
        const numBarrasHorizontales = Math.ceil(H / espaciadoHorizontal);
        const radiusDistribucion = barRadiusMain * 0.55;
        
        for (let i = 0; i < numBarrasHorizontales; i++) {
            const y = h_zapata + (i * espaciadoHorizontal) + 0.05;
            
            const barGeometry = new THREE.CylinderGeometry(radiusDistribucion, radiusDistribucion, depth, 12);
            const barra = new THREE.Mesh(barGeometry, barMaterialDistribucion);
            barra.rotation.x = Math.PI / 2;
            barra.position.set(x_base + recubrimiento + 0.02, y, 0);
            this.sceneAcero.add(barra);
        }
    },

    /**
     * Crear malla densa de acero en zapata
     */
    crearAceroZapata(B, h_zapata, t_base, talon, puntera, recubrimiento) {
        const depth = 1.5;
        const barRadiusMain = 0.007;
        const x_base = -puntera - t_base/2;
        
        const barMaterialZapata = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            roughness: 0.15,
            metalness: 1.0,
            emissive: 0x00ff00,
            emissiveIntensity: 0.5
        });
        
        // CAPA INFERIOR - Barras longitudinales
        const espaciadoZapataLong = 0.12;
        const numBarrasLongZapata = Math.ceil(depth / espaciadoZapataLong);
        
        for (let i = 0; i < numBarrasLongZapata; i++) {
            const z = -depth/2 + (i * depth / (numBarrasLongZapata - 1));
            
            const longitudTotal = B - 2 * recubrimiento;
            const barGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.85, barRadiusMain * 0.85, longitudTotal, 12);
            const barra = new THREE.Mesh(barGeometry, barMaterialZapata);
            barra.rotation.z = Math.PI / 2;
            barra.position.set(-B/2 + recubrimiento + longitudTotal/2, recubrimiento + 0.015, z);
            this.sceneAcero.add(barra);
            
            // Ganchos
            const ganchoLength = 0.10;
            const ganchoGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.85, barRadiusMain * 0.85, ganchoLength, 12);
            
            const gancho1 = new THREE.Mesh(ganchoGeometry, barMaterialZapata);
            gancho1.position.set(-B/2 + recubrimiento, recubrimiento + 0.015 + ganchoLength/2, z);
            this.sceneAcero.add(gancho1);
            
            const gancho2 = new THREE.Mesh(ganchoGeometry, barMaterialZapata);
            gancho2.position.set(B/2 - recubrimiento, recubrimiento + 0.015 + ganchoLength/2, z);
            this.sceneAcero.add(gancho2);
        }
        
        // CAPA INFERIOR - Barras transversales
        const numBarrasTransv = Math.ceil(B / espaciadoZapataLong);
        
        for (let i = 0; i < numBarrasTransv; i++) {
            const x = -B/2 + (i * B / (numBarrasTransv - 1));
            
            const barGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.8, barRadiusMain * 0.8, depth - 2*recubrimiento, 12);
            const barra = new THREE.Mesh(barGeometry, barMaterialZapata);
            barra.rotation.x = Math.PI / 2;
            barra.position.set(x, recubrimiento + 0.01, 0);
            this.sceneAcero.add(barra);
        }
        
        // CAPA SUPERIOR - Barras longitudinales (talón)
        for (let i = 0; i < numBarrasLongZapata; i++) {
            const z = -depth/2 + (i * depth / (numBarrasLongZapata - 1));
            
            const longitudTalon = talon - recubrimiento;
            const barGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.8, barRadiusMain * 0.8, longitudTalon, 12);
            const barra = new THREE.Mesh(barGeometry, barMaterialZapata);
            barra.rotation.z = Math.PI / 2;
            const xTalon = x_base + t_base + recubrimiento/2 + longitudTalon/2;
            barra.position.set(xTalon, h_zapata - recubrimiento - 0.015, z);
            this.sceneAcero.add(barra);
            
            // Gancho
            const ganchoGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.8, barRadiusMain * 0.8, 0.08, 12);
            const gancho = new THREE.Mesh(ganchoGeometry, barMaterialZapata);
            gancho.position.set(B/2 - recubrimiento, h_zapata - recubrimiento - 0.015 - 0.04, z);
            this.sceneAcero.add(gancho);
        }
        
        // CAPA SUPERIOR - Barras transversales
        const numBarrasTransvSup = Math.ceil(talon / espaciadoZapataLong);
        for (let i = 0; i < numBarrasTransvSup; i++) {
            const x = x_base + t_base + (i * talon / (numBarrasTransvSup - 1));
            
            const barGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.75, barRadiusMain * 0.75, depth - 2*recubrimiento, 12);
            const barra = new THREE.Mesh(barGeometry, barMaterialZapata);
            barra.rotation.x = Math.PI / 2;
            barra.position.set(x, h_zapata - recubrimiento - 0.01, 0);
            this.sceneAcero.add(barra);
        }
    },

    /**
     * Crear acero del shear key
     */
    crearAceroShearKey(t_base, puntera, recubrimiento) {
        const depth = 1.5;
        const x_base = -puntera - t_base/2;
        const barRadiusMain = 0.007;
        const shear_key_height = 0.3;
        const shear_key_width = 0.3;
        
        const barMaterialMuro = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            roughness: 0.15,
            metalness: 1.0,
            emissive: 0xff0000,
            emissiveIntensity: 0.4
        });
        
        const barMaterialEstribo = new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            roughness: 0.15,
            metalness: 1.0,
            emissive: 0xff9900,
            emissiveIntensity: 0.3
        });
        
        // Barras verticales
        const numBarrasShear = 5;
        const espaciadoShear = (depth - 2*recubrimiento) / (numBarrasShear - 1);
        
        for (let i = 0; i < numBarrasShear; i++) {
            const z = -depth/2 + recubrimiento + (i * espaciadoShear);
            
            const barGeometry = new THREE.CylinderGeometry(barRadiusMain * 0.75, barRadiusMain * 0.75, shear_key_height - recubrimiento, 12);
            const barra = new THREE.Mesh(barGeometry, barMaterialMuro);
            barra.position.set(x_base + t_base/2, -shear_key_height/2, z);
            this.sceneAcero.add(barra);
        }
        
        // Estribos densos
        const numEstribosShear = 8;
        for (let i = 0; i < numEstribosShear; i++) {
            const y = -shear_key_height + recubrimiento + (i * (shear_key_height - 2*recubrimiento) / (numEstribosShear - 1));
            
            const points = [];
            const w = shear_key_width - 2*recubrimiento;
            const d = depth - 2*recubrimiento;
            
            points.push(new THREE.Vector3(-w/2, -d/2, 0));
            points.push(new THREE.Vector3(w/2, -d/2, 0));
            points.push(new THREE.Vector3(w/2, d/2, 0));
            points.push(new THREE.Vector3(-w/2, d/2, 0));
            points.push(new THREE.Vector3(-w/2, -d/2, 0));
            
            const curve = new THREE.CatmullRomCurve3(points);
            const tubeGeometry = new THREE.TubeGeometry(curve, 16, barRadiusMain * 0.5, 6, false);
            const estribo = new THREE.Mesh(tubeGeometry, barMaterialEstribo);
            estribo.position.set(x_base + t_base/2, y, 0);
            this.sceneAcero.add(estribo);
        }
    }
};
