// PavementBuilder.js - Construcción y renderizado de capas de pavimento
class PavementBuilder {
    constructor(scene) {
        this.scene = scene;
        this.capas = [];
        this.lineasAmarillas = [];
    }

    cargarPavimento(tipo, pavimentosData) {
        this.limpiarCapas();
        
        const datos = pavimentosData[tipo];
        let capasData = [...datos.capas];
        
        // INVERTIR EL ORDEN
        capasData.reverse();
        
        let yOffset = 0;
        const baseWidth = 4.5;
        const baseDepth = 4.5;
        const separacionVisible = 0.20;
        
        console.log(`🛣️ Cargando ${capasData.length} capas (ORDEN INVERTIDO) para ${tipo}`);
        console.log('📋 Orden de capas después de invertir:');
        
        capasData.forEach((capaData, index) => {
            const espesorNum = this.parseEspesor(capaData.espesor);
            const altura = espesorNum / 50;
            
            console.log(`  ${index + 1}. ${capaData.nombre} - ${capaData.espesor} (altura 3D: ${altura.toFixed(2)})`);
            
            const reduccion = index * 0.15;
            const width = baseWidth - reduccion;
            const depth = baseDepth - reduccion;
            
            const geometry = new THREE.BoxGeometry(width, altura, depth);
            const material = this.crearMaterialCapa(capaData, index);
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, yOffset + altura / 2, 0);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.name = capaData.nombre;
            
            this.scene.add(mesh);
            
            this.capas.push({
                mesh: mesh,
                data: capaData,
                originalY: yOffset + altura / 2,
                index: index,
                altura: altura
            });
            
            yOffset += altura + separacionVisible;
        });
        
        this.agregarLineaAmarilla();
        this.agregarPisoCesped();
        this.agregarMuros();
        
        console.log(`✅ ${this.capas.length} capas cargadas correctamente`);
        
        return this.capas;
    }

    parseEspesor(espesorStr) {
        if (espesorStr === "Variable") return 10;
        
        const match = espesorStr.match(/(\d+)(?:-(\d+))?/);
        if (match) {
            const min = parseInt(match[1]);
            const max = match[2] ? parseInt(match[2]) : min;
            return (min + max) / 2;
        }
        return 10;
    }

    crearMaterialCapa(capaData, index) {
        const nombreCapa = capaData.nombre.toLowerCase();
        let material;
        
        // CARPETA ASFÁLTICA / RODADURA (capa superior)
        if (nombreCapa.includes('carpeta') || nombreCapa.includes('rodadura') || nombreCapa.includes('rodado')) {
            const texturaAsfalto = this.crearTexturaAsfalto();
            material = new THREE.MeshStandardMaterial({
                map: texturaAsfalto,
                color: 0x2a2a2a,
                roughness: 0.95,
                metalness: 0.05,
                emissive: 0x0a0a0a,
                emissiveIntensity: 0.1
            });
        } 
        // LOSA DE HORMIGÓN / CONCRETO
        else if (nombreCapa.includes('losa') || nombreCapa.includes('hormigón') || nombreCapa.includes('concreto')) {
            const texturaConcreto = this.crearTexturaConcreto();
            material = new THREE.MeshStandardMaterial({
                map: texturaConcreto,
                color: 0xc8c8c8,
                roughness: 0.85,
                metalness: 0.1,
                emissive: 0x404040,
                emissiveIntensity: 0.05
            });
        }
        // BASE ESTABILIZADA / BASE TRATADA
        else if (nombreCapa.includes('base estabilizada') || nombreCapa.includes('base tratada')) {
            const texturaBaseEstabilizada = this.crearTexturaGrava(0x6b5d52);
            material = new THREE.MeshStandardMaterial({
                map: texturaBaseEstabilizada,
                color: 0x6b5d52,
                roughness: 0.9,
                metalness: 0.02
            });
        }
        // BASE ASFÁLTICA
        else if (nombreCapa.includes('base') && nombreCapa.includes('asfáltica')) {
            const texturaBaseAsfaltica = this.crearTexturaAsfaltoOscuro();
            material = new THREE.MeshStandardMaterial({
                map: texturaBaseAsfaltica,
                color: 0x3d3d3d,
                roughness: 0.9,
                metalness: 0.05
            });
        }
        // BASE GRANULAR
        else if (nombreCapa.includes('base')) {
            const texturaBaseGranular = this.crearTexturaGrava(0x8b8b8b);
            material = new THREE.MeshStandardMaterial({
                map: texturaBaseGranular,
                color: 0x8b8b8b,
                roughness: 0.95,
                metalness: 0.0
            });
        }
        // SUBBASE
        else if (nombreCapa.includes('subbase')) {
            const texturaSubbase = this.crearTexturaGrava(0xa09080);
            material = new THREE.MeshStandardMaterial({
                map: texturaSubbase,
                color: 0xa09080,
                roughness: 0.95,
                metalness: 0.0
            });
        }
        // SUBRASANTE / SUELO
        else if (nombreCapa.includes('subrasante') || nombreCapa.includes('suelo')) {
            const texturaTierra = this.crearTexturaTierra();
            material = new THREE.MeshStandardMaterial({
                map: texturaTierra,
                color: 0x8b7355,
                roughness: 1.0,
                metalness: 0.0
            });
        }
        // IMPRIMACIÓN / MEMBRANA
        else if (nombreCapa.includes('imprimación') || nombreCapa.includes('membrana')) {
            material = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                roughness: 0.4,
                metalness: 0.2,
                emissive: 0x0f0f0f,
                emissiveIntensity: 0.15
            });
        }
        // DEFAULT
        else {
            const baseColor = new THREE.Color(capaData.color);
            material = new THREE.MeshStandardMaterial({
                color: baseColor,
                roughness: 0.8,
                metalness: 0.05
            });
        }
        
        return material;
    }

    // Crear textura de asfalto con granulado
    crearTexturaAsfalto() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Fondo base negro
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 512, 512);
        
        // Agregar granulado (piedritas pequeñas)
        for (let i = 0; i < 15000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 2 + 1;
            const brightness = Math.floor(Math.random() * 60);
            
            ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
            ctx.fillRect(x, y, size, size);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        return texture;
    }

    // Crear textura de asfalto oscuro para base
    crearTexturaAsfaltoOscuro() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, 512, 512);
        
        for (let i = 0; i < 12000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 2.5 + 1;
            const brightness = Math.floor(Math.random() * 50) + 20;
            
            ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
            ctx.fillRect(x, y, size, size);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        return texture;
    }

    // Crear textura de concreto
    crearTexturaConcreto() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Fondo gris concreto
        ctx.fillStyle = '#c0c0c0';
        ctx.fillRect(0, 0, 512, 512);
        
        // Agregar textura de concreto (puntos y manchas)
        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 2 + 0.5;
            const variation = Math.floor(Math.random() * 40) - 20;
            const gray = 180 + variation;
            
            ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
            ctx.fillRect(x, y, size, size);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        return texture;
    }

    // Crear textura de grava/piedra
    crearTexturaGrava(colorBase) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Convertir color hex a RGB
        const r = (colorBase >> 16) & 255;
        const g = (colorBase >> 8) & 255;
        const b = colorBase & 255;
        
        // Fondo base
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, 0, 512, 512);
        
        // Agregar piedras (círculos y puntos)
        for (let i = 0; i < 8000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 4 + 1;
            const variation = Math.floor(Math.random() * 60) - 30;
            
            const newR = Math.max(0, Math.min(255, r + variation));
            const newG = Math.max(0, Math.min(255, g + variation));
            const newB = Math.max(0, Math.min(255, b + variation));
            
            ctx.fillStyle = `rgb(${newR}, ${newG}, ${newB})`;
            ctx.beginPath();
            ctx.arc(x, y, size/2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        return texture;
    }

    // Crear textura de tierra
    crearTexturaTierra() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Fondo tierra marrón
        ctx.fillStyle = '#8b7355';
        ctx.fillRect(0, 0, 512, 512);
        
        // Agregar textura de tierra (granulado irregular)
        for (let i = 0; i < 12000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 3 + 0.5;
            
            // Variaciones de marrón
            const tipo = Math.random();
            let color;
            if (tipo < 0.3) color = '#7a6449';
            else if (tipo < 0.6) color = '#9b8365';
            else if (tipo < 0.8) color = '#a68d6f';
            else color = '#6b5d4f';
            
            ctx.fillStyle = color;
            ctx.fillRect(x, y, size, size);
        }
        
        // Agregar algunas piedras pequeñas
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 3 + 2;
            
            ctx.fillStyle = '#b0a090';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
        return texture;
    }

    agregarLineaAmarilla() {
        if (this.capas.length === 0) return;
        
        // Buscar la capa más alta
        let topCapa = this.capas[0];
        let maxY = topCapa.originalY;
        
        this.capas.forEach(capa => {
            if (capa.originalY > maxY) {
                maxY = capa.originalY;
                topCapa = capa;
            }
        });
        
        const yPosition = topCapa.originalY + (topCapa.altura / 2) + 0.015;
        const anchoLinea = 0.08;
        
        // Material para líneas amarillas
        const lineaMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            emissive: 0xFFD700,
            emissiveIntensity: 0.4,
            roughness: 0.6,
            metalness: 0.2
        });
        
        // LÍNEAS CONTINUAS EN LOS LADOS (BORDES)
        const longitudContinua = 4.0;
        const anchoCalzada = 1.8;
        
        // Línea continua IZQUIERDA
        const geometriaIzq = new THREE.BoxGeometry(anchoLinea, 0.015, longitudContinua);
        const lineaIzq = new THREE.Mesh(geometriaIzq, lineaMaterial.clone());
        lineaIzq.position.set(-anchoCalzada, yPosition, 0);
        lineaIzq.castShadow = false;
        lineaIzq.receiveShadow = false;
        this.scene.add(lineaIzq);
        this.lineasAmarillas.push(lineaIzq);
        
        // Línea continua DERECHA
        const geometriaDer = new THREE.BoxGeometry(anchoLinea, 0.015, longitudContinua);
        const lineaDer = new THREE.Mesh(geometriaDer, lineaMaterial.clone());
        lineaDer.position.set(anchoCalzada, yPosition, 0);
        lineaDer.castShadow = false;
        lineaDer.receiveShadow = false;
        this.scene.add(lineaDer);
        this.lineasAmarillas.push(lineaDer);
        
        // LÍNEAS SEGMENTADAS EN EL CENTRO
        const longitudSegmento = 0.4;
        const espacioEntreSegmentos = 0.25;
        const numSegmentos = 6;
        
        const longitudTotal = (numSegmentos * longitudSegmento) + ((numSegmentos - 1) * espacioEntreSegmentos);
        const startZ = -longitudTotal / 2;
        
        for (let i = 0; i < numSegmentos; i++) {
            const geometriaSegmento = new THREE.BoxGeometry(anchoLinea, 0.015, longitudSegmento);
            const segmento = new THREE.Mesh(geometriaSegmento, lineaMaterial.clone());
            
            const zPos = startZ + (i * (longitudSegmento + espacioEntreSegmentos)) + (longitudSegmento / 2);
            segmento.position.set(0, yPosition, zPos);
            segmento.castShadow = false;
            segmento.receiveShadow = false;
            
            this.scene.add(segmento);
            this.lineasAmarillas.push(segmento);
        }
        
        console.log(`🎨 Líneas agregadas: 2 continuas (bordes) + ${numSegmentos} segmentadas (centro)`);
    }

    agregarPisoCesped() {
        // PISO PRINCIPAL - CÉSPED VERDE
        const pisoGeometry = new THREE.PlaneGeometry(30, 30);
        
        // Crear textura procedural de césped
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Fondo verde base
        const gradiente = ctx.createLinearGradient(0, 0, 512, 512);
        gradiente.addColorStop(0, '#5a9e3a');
        gradiente.addColorStop(0.5, '#4a8e2a');
        gradiente.addColorStop(1, '#3a7e1a');
        ctx.fillStyle = gradiente;
        ctx.fillRect(0, 0, 512, 512);
        
        // Agregar "briznas" de pasto (puntos verdes aleatorios)
        for (let i = 0; i < 8000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const verde = Math.floor(Math.random() * 3);
            
            if (verde === 0) ctx.fillStyle = '#6ab84a';
            else if (verde === 1) ctx.fillStyle = '#4a9e2a';
            else ctx.fillStyle = '#3a8e1a';
            
            ctx.fillRect(x, y, 2, 2);
        }
        
        // Convertir canvas a textura
        const texturaCesped = new THREE.CanvasTexture(canvas);
        texturaCesped.wrapS = THREE.RepeatWrapping;
        texturaCesped.wrapT = THREE.RepeatWrapping;
        texturaCesped.repeat.set(4, 4);
        
        const pisoMaterial = new THREE.MeshStandardMaterial({ 
            map: texturaCesped,
            color: 0x5a9e3a, // Verde césped
            roughness: 0.95,
            metalness: 0.0
        });
        
        const piso = new THREE.Mesh(pisoGeometry, pisoMaterial);
        piso.rotation.x = -Math.PI / 2;
        piso.position.y = -0.1;
        piso.receiveShadow = true;
        this.scene.add(piso);
        
        console.log('🌱 Piso de césped agregado');
    }

    agregarMuros() {
        const muroGeometry = new THREE.BoxGeometry(0.4, 2, 5);
        const muroMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xb0b0b0,
            roughness: 0.7,
            metalness: 0.1
        });
        
        const muroIzq = new THREE.Mesh(muroGeometry, muroMaterial);
        muroIzq.position.set(-2.8, 1, 0);
        muroIzq.castShadow = true;
        muroIzq.receiveShadow = true;
        this.scene.add(muroIzq);
        
        const muroDer = new THREE.Mesh(muroGeometry, muroMaterial);
        muroDer.position.set(2.8, 1, 0);
        muroDer.castShadow = true;
        muroDer.receiveShadow = true;
        this.scene.add(muroDer);
    }

    limpiarCapas() {
        // Limpiar líneas amarillas
        this.lineasAmarillas.forEach(linea => {
            this.scene.remove(linea);
            if (linea.geometry) linea.geometry.dispose();
            if (linea.material) linea.material.dispose();
        });
        this.lineasAmarillas = [];
        
        // Limpiar capas
        this.capas.forEach(capa => {
            this.scene.remove(capa.mesh);
            if (capa.mesh.geometry) capa.mesh.geometry.dispose();
            if (capa.mesh.material) {
                if (capa.mesh.material.map) capa.mesh.material.map.dispose();
                capa.mesh.material.dispose();
            }
        });
        this.capas = [];
        
        // Limpiar otros objetos (piso, muros, etc.)
        const objetosARemover = [];
        this.scene.children.forEach(child => {
            if (child.type === 'Mesh' && child.geometry) {
                objetosARemover.push(child);
            }
        });
        objetosARemover.forEach(obj => {
            this.scene.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (obj.material.map) obj.material.map.dispose();
                obj.material.dispose();
            }
        });
    }

    getCapas() {
        return this.capas;
    }

    getLineasAmarillas() {
        return this.lineasAmarillas;
    }

    toggleCapaVisibility(index, visible) {
        if (this.capas[index]) {
            this.capas[index].mesh.visible = visible;
        }
    }
}