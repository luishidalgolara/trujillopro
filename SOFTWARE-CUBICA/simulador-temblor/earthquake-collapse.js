/* COLAPSO PROGRESIVO DE ESTRUCTURAS */

const EarthquakeCollapse = {
    enabled: true,
    dañoAcumulado: new Map(), // mesh.uuid → % de daño
    meshsColapsados: new Set(),
    umbralColapso: 80, // % de daño para colapsar
    
    // Calcular daño acumulado en un elemento
    calcularDaño(mesh, tiempo, intensidad, duracion) {
        if (!this.enabled) return 0;
        
        const uuid = mesh.uuid;
        let dañoActual = this.dañoAcumulado.get(uuid) || 0;
        
        // Factores que contribuyen al daño
        const config = EarthquakeConfig.intensidades[intensidad];
        
        // 1. Intensidad del terremoto (factor principal)
        const factorIntensidad = (intensidad - 3.0) / 5.0; // Normalizar 3-8 → 0-1
        
        // 2. Duración de exposición
        const factorDuracion = tiempo / duracion;
        
        // 3. Altura del elemento (elementos altos sufren más)
        const alturaRelativa = mesh.position.y / 50;
        const factorAltura = 0.5 + alturaRelativa * 0.5;
        
        // 4. Tipo de elemento (si está en userData)
        let factorTipo = 1.0;
        if (mesh.userData.tipo === 'cubierta') factorTipo = 1.5; // Techos más vulnerables
        if (mesh.userData.tipo === 'radier') factorTipo = 0.3;   // Radieres más resistentes
        
        // 5. Resonancia (si está disponible)
        let factorResonancia = 1.0;
        if (window.EarthquakeStructuralFX && EarthquakeStructuralFX.resonanciaEnabled) {
            factorResonancia = EarthquakeStructuralFX.calcularResonancia(mesh, tiempo, intensidad);
        }
        
        // CALCULAR INCREMENTO DE DAÑO
        const incrementoDaño = 
            factorIntensidad * 
            factorDuracion * 
            factorAltura * 
            factorTipo * 
            factorResonancia * 
            0.5; // Factor de escala
        
        // Acumular daño (con ruido aleatorio)
        dañoActual += incrementoDaño * (0.8 + Math.random() * 0.4);
        dañoActual = Math.min(dañoActual, 100); // Máximo 100%
        
        // Guardar
        this.dañoAcumulado.set(uuid, dañoActual);
        
        return dañoActual;
    },
    
    // Verificar si un elemento debe colapsar
    debeColapsar(mesh, daño) {
        if (this.meshsColapsados.has(mesh.uuid)) return false;
        return daño >= this.umbralColapso;
    },
    
    // Ejecutar colapso de un elemento
    colapsar(mesh, intensidad, grupo) {
        if (!this.enabled) return null;
        if (this.meshsColapsados.has(mesh.uuid)) return null;
        
        console.log(`💥 COLAPSO: Elemento con ${this.dañoAcumulado.get(mesh.uuid)}% de daño`);
        
        // Marcar como colapsado
        this.meshsColapsados.add(mesh.uuid);
        
        // 1. FRACTURAR el mesh
        const fragmentos = EarthquakeFracture.fracturarConGrietas(mesh, intensidad);
        
        if (!fragmentos || fragmentos.length === 0) return null;
        
        // 2. AGREGAR fragmentos a la escena
        fragmentos.forEach(fragmento => {
            grupo.add(fragmento);
        });
        
        // 3. ACTIVAR FÍSICA en los fragmentos
        if (window.EarthquakePhysicsEngine && EarthquakePhysicsEngine.enabled) {
            EarthquakePhysicsEngine.activarFisica(mesh, fragmentos);
        }
        
        // 4. OCULTAR mesh original
        mesh.visible = false;
        
        // 5. PROPAGAR a elementos vecinos
        this.propagarColapso(mesh, grupo);
        
        // 6. EFECTOS VISUALES
        if (window.EarthquakeVisualEffects) {
            // Generar polvo/partículas
            EarthquakeVisualEffects.generarPolvo(mesh.position);
        }
        
        return fragmentos;
    },
    
    // Propagar colapso a elementos cercanos (efecto dominó)
    propagarColapso(meshColapsado, grupo) {
        const posicion = meshColapsado.position;
        const radioInfluencia = 10; // unidades
        
        grupo.children.forEach(otroMesh => {
            if (otroMesh.uuid === meshColapsado.uuid) return;
            if (this.meshsColapsados.has(otroMesh.uuid)) return;
            if (!otroMesh.visible) return;
            
            const distancia = posicion.distanceTo(otroMesh.position);
            
            // Si está muy cerca, aumentar su daño
            if (distancia < radioInfluencia) {
                const dañoAdicional = (1 - distancia / radioInfluencia) * 20; // Hasta 20% de daño extra
                const dañoActual = this.dañoAcumulado.get(otroMesh.uuid) || 0;
                this.dañoAcumulado.set(otroMesh.uuid, dañoActual + dañoAdicional);
                
                console.log(`🔀 Propagando daño a elemento cercano (+${dañoAdicional.toFixed(1)}%)`);
            }
        });
    },
    
    // Aplicar deformación visual según nivel de daño
    aplicarDeformacionVisual(mesh, daño) {
        if (!mesh.material) return;
        
        // Cambiar color según daño
        let color;
        if (daño < 30) {
            color = new THREE.Color(0x4CAF50); // Verde
        } else if (daño < 60) {
            color = new THREE.Color(0xFFC107); // Amarillo
        } else if (daño < 80) {
            color = new THREE.Color(0xFF9800); // Naranja
        } else {
            color = new THREE.Color(0xF44336); // Rojo
        }
        
        mesh.material.color = color;
        
        // Deformación de escala según daño
        if (daño > 40) {
            const factorDeformacion = 1 - (daño - 40) * 0.002;
            if (mesh.scale) {
                mesh.scale.y = factorDeformacion;
            }
        }
        
        // Grietas visuales
        if (daño > 60) {
            EarthquakeFracture.aplicarTexturaGrieta(mesh, daño / 100);
        }
    },
    
    // Procesar todos los elementos
    procesarElementos(grupo, tiempo, intensidad, duracion) {
        if (!this.enabled) return;
        
        grupo.children.forEach(mesh => {
            if (!mesh.visible) return;
            if (this.meshsColapsados.has(mesh.uuid)) return;
            
            // Calcular daño
            const daño = this.calcularDaño(mesh, tiempo, intensidad, duracion);
            
            // Aplicar deformación visual
            this.aplicarDeformacionVisual(mesh, daño);
            
            // Verificar colapso
            if (this.debeColapsar(mesh, daño)) {
                this.colapsar(mesh, intensidad, grupo);
            }
        });
    },
    
    // Obtener estadísticas
    obtenerEstadisticas() {
        let total = this.dañoAcumulado.size;
        let colapsados = this.meshsColapsados.size;
        let dañoPromedio = 0;
        
        this.dañoAcumulado.forEach(daño => {
            dañoPromedio += daño;
        });
        dañoPromedio = total > 0 ? dañoPromedio / total : 0;
        
        return {
            total: total,
            colapsados: colapsados,
            dañoPromedio: dañoPromedio.toFixed(1),
            porcentajeColapso: total > 0 ? ((colapsados / total) * 100).toFixed(1) : 0
        };
    },
    
    // Reset
    reset() {
        this.dañoAcumulado.clear();
        this.meshsColapsados.clear();
    }
};

window.EarthquakeCollapse = EarthquakeCollapse;
