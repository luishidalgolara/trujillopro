/* DEFORMACIÓN AVANZADA DE ELEMENTOS */

const EarthquakeDeformation = {
    enabled: true,
    deformaciones: new Map(), // mesh.uuid → datos de deformación
    
    // Aplicar deformación realista a geometría
    aplicarDeformacionGeometrica(mesh, intensidad, tiempo) {
        if (!this.enabled || !mesh.geometry) return;
        
        // Solo aplicar a geometrías que no son fragmentos
        if (mesh.userData.esFragmento) return;
        
        const geometry = mesh.geometry;
        
        // Verificar si tiene vértices
        if (!geometry.attributes || !geometry.attributes.position) return;
        
        const positions = geometry.attributes.position;
        const uuid = mesh.uuid;
        
        // Guardar posiciones originales si no existen
        if (!this.deformaciones.has(uuid)) {
            const posicionesOriginales = [];
            for (let i = 0; i < positions.count; i++) {
                posicionesOriginales.push({
                    x: positions.getX(i),
                    y: positions.getY(i),
                    z: positions.getZ(i)
                });
            }
            this.deformaciones.set(uuid, {
                posicionesOriginales: posicionesOriginales,
                factorDeformacion: 0
            });
        }
        
        const datos = this.deformaciones.get(uuid);
        const config = EarthquakeConfig.intensidades[intensidad];
        
        // Calcular factor de deformación (aumenta con el tiempo)
        datos.factorDeformacion = Math.min(datos.factorDeformacion + 0.001 * config.movimiento, 1.0);
        
        // Aplicar deformación a cada vértice
        for (let i = 0; i < positions.count; i++) {
            const orig = datos.posicionesOriginales[i];
            
            // Deformación ondulante
            const offsetX = Math.sin(tiempo * 5 + orig.y * 0.1) * config.movimiento * 0.01 * datos.factorDeformacion;
            const offsetY = Math.sin(tiempo * 3 + orig.x * 0.1) * config.movimiento * 0.005 * datos.factorDeformacion;
            const offsetZ = Math.sin(tiempo * 4 + orig.y * 0.1) * config.movimiento * 0.01 * datos.factorDeformacion;
            
            positions.setXYZ(
                i,
                orig.x + offsetX,
                orig.y + offsetY,
                orig.z + offsetZ
            );
        }
        
        // Actualizar geometría
        positions.needsUpdate = true;
        geometry.computeVertexNormals();
    },
    
    // Aplicar pandeo (buckling) a elementos verticales
    aplicarPandeo(mesh, daño) {
        if (!this.enabled) return;
        if (daño < 50) return; // Solo con daño significativo
        
        // Detectar si es elemento vertical (muro, columna)
        const esVertical = mesh.scale && mesh.scale.y > mesh.scale.x;
        
        if (esVertical) {
            // Pandeo lateral
            const factorPandeo = (daño - 50) / 50; // 0 a 1
            
            if (mesh.rotation) {
                mesh.rotation.x += Math.sin(Date.now() * 0.001) * 0.05 * factorPandeo;
                mesh.rotation.z += Math.cos(Date.now() * 0.001) * 0.05 * factorPandeo;
            }
        }
    },
    
    // Simular aplastamiento de elementos
    aplicarAplastamiento(mesh, daño) {
        if (!this.enabled) return;
        if (daño < 70) return;
        
        const factorAplastamiento = (daño - 70) / 30; // 0 a 1
        
        if (mesh.scale) {
            // Reducir altura, aumentar ancho (conservar volumen aproximado)
            mesh.scale.y = 1 - factorAplastamiento * 0.3;
            mesh.scale.x = 1 + factorAplastamiento * 0.1;
            mesh.scale.z = 1 + factorAplastamiento * 0.1;
        }
    },
    
    // Aplicar inclinación progresiva
    aplicarInclinacion(mesh, tiempo, intensidad) {
        if (!this.enabled) return;
        
        const config = EarthquakeConfig.intensidades[intensidad];
        
        // Inclinación sutil acumulativa
        const inclinacion = Math.sin(tiempo * 2) * config.movimiento * 0.001;
        
        if (mesh.rotation) {
            mesh.rotation.x += inclinacion * 0.5;
            mesh.rotation.z += inclinacion;
        }
    },
    
    // Deformación plástica (permanente)
    aplicarDeformacionPlastica(mesh, daño) {
        if (!this.enabled) return;
        if (daño < 60) return;
        
        const uuid = mesh.uuid;
        const datos = this.deformaciones.get(uuid);
        
        if (!datos) return;
        
        // A partir de 60% de daño, la deformación se vuelve permanente
        const factorPlastico = (daño - 60) / 40; // 0 a 1
        
        // Las posiciones "originales" se van moviendo hacia las deformadas
        if (mesh.geometry && mesh.geometry.attributes.position) {
            const positions = mesh.geometry.attributes.position;
            
            for (let i = 0; i < Math.min(positions.count, datos.posicionesOriginales.length); i++) {
                const actual = {
                    x: positions.getX(i),
                    y: positions.getY(i),
                    z: positions.getZ(i)
                };
                
                const orig = datos.posicionesOriginales[i];
                
                // Interpolar hacia posición actual (deformación permanente)
                orig.x = orig.x * (1 - factorPlastico * 0.1) + actual.x * (factorPlastico * 0.1);
                orig.y = orig.y * (1 - factorPlastico * 0.1) + actual.y * (factorPlastico * 0.1);
                orig.z = orig.z * (1 - factorPlastico * 0.1) + actual.z * (factorPlastico * 0.1);
            }
        }
    },
    
    // Restaurar geometría original
    restaurarGeometria(mesh) {
        const uuid = mesh.uuid;
        const datos = this.deformaciones.get(uuid);
        
        if (!datos || !mesh.geometry || !mesh.geometry.attributes.position) return;
        
        const positions = mesh.geometry.attributes.position;
        const originales = datos.posicionesOriginales;
        
        for (let i = 0; i < Math.min(positions.count, originales.length); i++) {
            positions.setXYZ(i, originales[i].x, originales[i].y, originales[i].z);
        }
        
        positions.needsUpdate = true;
        mesh.geometry.computeVertexNormals();
        
        // Restaurar escala
        if (mesh.scale) {
            mesh.scale.set(1, 1, 1);
        }
    },
    
    // Aplicar todas las deformaciones
    aplicarTodasDeformaciones(mesh, tiempo, intensidad, daño) {
        if (!this.enabled) return;
        
        this.aplicarDeformacionGeometrica(mesh, intensidad, tiempo);
        this.aplicarPandeo(mesh, daño);
        this.aplicarAplastamiento(mesh, daño);
        this.aplicarInclinacion(mesh, tiempo, intensidad);
        this.aplicarDeformacionPlastica(mesh, daño);
    },
    
    // Reset
    reset() {
        // Restaurar todas las geometrías
        this.deformaciones.forEach((datos, uuid) => {
            const mesh = EarthquakePhysicsEngine.encontrarMeshPorUUID(uuid);
            if (mesh) {
                this.restaurarGeometria(mesh);
            }
        });
        
        this.deformaciones.clear();
    }
};

window.EarthquakeDeformation = EarthquakeDeformation;
