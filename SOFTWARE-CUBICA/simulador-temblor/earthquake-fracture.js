/* SISTEMA DE FRACTURAS Y FRAGMENTACIÓN */

const EarthquakeFracture = {
    enabled: true,
    fracturas: new Map(), // mesh.uuid → info de fractura
    
    // Fracturar un mesh en fragmentos
    fracturarMesh(mesh, numFragmentos = 6) {
        if (!this.enabled) return null;
        
        console.log(`💥 Fracturando mesh: ${mesh.uuid}`);
        
        const fragmentos = [];
        
        // Obtener geometría y posición
        const geometry = mesh.geometry;
        if (!geometry) return null;
        
        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;
        const center = mesh.position.clone();
        
        // Calcular tamaño
        const sizeX = bbox.max.x - bbox.min.x;
        const sizeY = bbox.max.y - bbox.min.y;
        const sizeZ = bbox.max.z - bbox.min.z;
        
        // Crear fragmentos (subdivisión simple)
        const fragmentsPorLado = Math.ceil(Math.sqrt(numFragmentos));
        
        for (let i = 0; i < fragmentsPorLado; i++) {
            for (let j = 0; j < fragmentsPorLado; j++) {
                if (fragmentos.length >= numFragmentos) break;
                
                // Tamaño de cada fragmento
                const fragSizeX = sizeX / fragmentsPorLado;
                const fragSizeY = sizeY;
                const fragSizeZ = sizeZ / fragmentsPorLado;
                
                // Crear geometría del fragmento
                const fragGeometry = new THREE.BoxGeometry(fragSizeX, fragSizeY, fragSizeZ);
                
                // Material del fragmento (heredar del original)
                const fragMaterial = mesh.material.clone();
                fragMaterial.transparent = true;
                fragMaterial.opacity = 0.9;
                
                // Crear mesh del fragmento
                const fragmento = new THREE.Mesh(fragGeometry, fragMaterial);
                
                // Posición del fragmento
                const offsetX = (i - fragmentsPorLado/2 + 0.5) * fragSizeX;
                const offsetZ = (j - fragmentsPorLado/2 + 0.5) * fragSizeZ;
                
                fragmento.position.set(
                    center.x + offsetX,
                    center.y,
                    center.z + offsetZ
                );
                
                // Copiar rotación del mesh original
                fragmento.rotation.copy(mesh.rotation);
                
                // Metadata
                fragmento.userData.esFragmento = true;
                fragmento.userData.meshOriginal = mesh.uuid;
                
                fragmentos.push(fragmento);
            }
        }
        
        // Registrar fractura
        this.fracturas.set(mesh.uuid, {
            meshOriginal: mesh,
            fragmentos: fragmentos,
            tiempo: Date.now()
        });
        
        console.log(`✅ Generados ${fragmentos.length} fragmentos`);
        return fragmentos;
    },
    
    // Fracturar con patrón de grietas
    fracturarConGrietas(mesh, intensidad) {
        // Determinar número de fragmentos según intensidad
        let numFragmentos = 4;
        if (intensidad >= 7.0) numFragmentos = 12;
        else if (intensidad >= 6.0) numFragmentos = 8;
        else if (intensidad >= 5.0) numFragmentos = 6;
        
        return this.fracturarMesh(mesh, numFragmentos);
    },
    
    // Aplicar textura de grieta a un mesh
    aplicarTexturaGrieta(mesh, severidad = 0.5) {
        if (!mesh.material) return;
        
        // Cambiar color según severidad
        const r = 1.0;
        const g = 1.0 - severidad;
        const b = 1.0 - severidad;
        
        if (mesh.material.color) {
            mesh.material.color.setRGB(r, g, b);
        }
        
        // Aumentar opacidad de wireframe para simular grietas
        mesh.material.wireframe = severidad > 0.7;
    },
    
    // Propagar grieta desde un punto
    propagarGrieta(meshOrigen, meshVecinos) {
        // Si el mesh origen tiene fractura, propagar a vecinos cercanos
        if (this.fracturas.has(meshOrigen.uuid)) {
            meshVecinos.forEach(vecino => {
                const distancia = meshOrigen.position.distanceTo(vecino.position);
                
                // Solo propagar a vecinos muy cercanos
                if (distancia < 5 && !this.fracturas.has(vecino.uuid)) {
                    // Probabilidad de propagación
                    if (Math.random() < 0.3) {
                        console.log(`🔀 Propagando grieta a mesh vecino`);
                        // Marcar para futura fractura
                        vecino.userData.grieta = true;
                        this.aplicarTexturaGrieta(vecino, 0.6);
                    }
                }
            });
        }
    },
    
    // Obtener fragmentos de un mesh
    obtenerFragmentos(meshUUID) {
        const info = this.fracturas.get(meshUUID);
        return info ? info.fragmentos : null;
    },
    
    // Limpiar fracturas antiguas
    limpiarFracturas() {
        const ahora = Date.now();
        const tiempoVida = 60000; // 60 segundos
        
        this.fracturas.forEach((info, uuid) => {
            if (ahora - info.tiempo > tiempoVida) {
                // Remover fragmentos de la escena
                info.fragmentos.forEach(frag => {
                    if (frag.parent) {
                        frag.parent.remove(frag);
                    }
                });
                this.fracturas.delete(uuid);
            }
        });
    },
    
    // Reset
    reset() {
        this.fracturas.forEach((info, uuid) => {
            info.fragmentos.forEach(frag => {
                if (frag.parent) {
                    frag.parent.remove(frag);
                }
            });
        });
        this.fracturas.clear();
    }
};

window.EarthquakeFracture = EarthquakeFracture;
