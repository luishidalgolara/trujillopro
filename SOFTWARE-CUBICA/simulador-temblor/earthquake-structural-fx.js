/* EFECTOS ESTRUCTURALES AVANZADOS */

const EarthquakeStructuralFX = {
    enabled: true,
    resonanciaEnabled: true,
    torsionEnabled: true,
    deformacionEnabled: true,
    
    // Frecuencias naturales por tipo de elemento (Hz)
    frecuenciasNaturales: {
        radier: 15.0,
        muro: 5.0,
        cubierta: 2.5
    },
    
    // RESONANCIA ESTRUCTURAL
    calcularResonancia(mesh, tiempo, intensidad) {
        if (!this.resonanciaEnabled) return 0;
        
        // Determinar frecuencia natural según tipo de elemento
        let frecuenciaNatural = 5.0; // Default
        
        if (mesh.geometry && mesh.geometry.type) {
            const tipo = mesh.geometry.type.toLowerCase();
            if (tipo.includes('box')) frecuenciaNatural = this.frecuenciasNaturales.muro;
            if (tipo.includes('extrude')) frecuenciaNatural = this.frecuenciasNaturales.radier;
            if (tipo.includes('buffer')) frecuenciaNatural = this.frecuenciasNaturales.cubierta;
        }
        
        // Calcular factor de resonancia
        const config = EarthquakeConfig.intensidades[intensidad];
        const frecuenciaExcitacion = config.frecuencia / 10;
        
        // Resonancia máxima cuando frecuencias coinciden
        const diferencia = Math.abs(frecuenciaNatural - frecuenciaExcitacion);
        const factorResonancia = 1.0 / (1.0 + diferencia * 0.5);
        
        // Amplificación por resonancia
        const amplificacion = 1.0 + factorResonancia * 0.5;
        
        return amplificacion;
    },
    
    // TORSIÓN DEL EDIFICIO
    calcularTorsion(mesh, tiempo, intensidad) {
        if (!this.torsionEnabled) return { x: 0, y: 0, z: 0 };
        
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento * 0.008;
        const freq = config.frecuencia / 25;
        
        // Torsión aumenta con la altura
        const alturaRelativa = mesh.position.y / 50;
        const factorAltura = 1.0 + alturaRelativa * 2.0;
        
        // Calcular centro de masa desplazado
        const excentricidad = 0.1; // 10% de excentricidad
        
        return {
            x: Math.sin(tiempo * freq * 1.2) * amp * factorAltura * excentricidad,
            y: Math.sin(tiempo * freq * 0.8) * amp * factorAltura * 0.5,
            z: Math.sin(tiempo * freq * 1.5) * amp * factorAltura * excentricidad
        };
    },
    
    // DERIVA LATERAL (desplazamiento entre pisos)
    calcularDeriva(mesh, tiempo, intensidad, posicionOriginalY) {
        if (!this.deformacionEnabled) return 0;
        
        const config = EarthquakeConfig.intensidades[intensidad];
        
        // Deriva aumenta linealmente con altura
        const altura = posicionOriginalY;
        const derivaMaxima = config.movimiento * 0.02; // 2% de la altura
        
        const freq = config.frecuencia / 15;
        const deriva = Math.sin(tiempo * freq) * derivaMaxima * (altura / 50);
        
        return deriva;
    },
    
    // DEFORMACIÓN NO LINEAL
    calcularDeformacion(mesh, tiempo, intensidad) {
        if (!this.deformacionEnabled) return { x: 1, y: 1, z: 1 };
        
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento * 0.0005;
        const freq = config.frecuencia / 8;
        
        // Deformación sutil (escala)
        return {
            x: 1.0 + Math.sin(tiempo * freq * 2) * amp,
            y: 1.0 + Math.sin(tiempo * freq * 1.5) * amp * 0.5,
            z: 1.0 + Math.sin(tiempo * freq * 2.2) * amp
        };
    },
    
    // AMORTIGUAMIENTO (reducción progresiva)
    calcularAmortiguamiento(tiempo, duracion) {
        // Amortiguamiento exponencial
        const ratio = tiempo / duracion;
        return Math.exp(-ratio * 2); // Factor de amortiguamiento
    },
    
    // APLICAR TODOS LOS EFECTOS A UN MESH
    aplicarEfectosEstructurales(mesh, posOriginal, tiempo, intensidad, duracion) {
        if (!this.enabled) return;
        
        // 1. RESONANCIA
        const factorResonancia = this.calcularResonancia(mesh, tiempo, intensidad);
        
        // 2. TORSIÓN
        const torsion = this.calcularTorsion(mesh, tiempo, intensidad);
        
        // 3. DERIVA LATERAL
        const deriva = this.calcularDeriva(mesh, tiempo, intensidad, posOriginal.y);
        
        // 4. DEFORMACIÓN
        const deformacion = this.calcularDeformacion(mesh, tiempo, intensidad);
        
        // 5. AMORTIGUAMIENTO
        const amortiguamiento = this.calcularAmortiguamiento(tiempo, duracion);
        
        // APLICAR EFECTOS
        
        // Torsión (rotaciones adicionales)
        if (mesh.rotation) {
            mesh.rotation.x += torsion.x * amortiguamiento * factorResonancia;
            mesh.rotation.y += torsion.y * amortiguamiento * factorResonancia;
            mesh.rotation.z += torsion.z * amortiguamiento * factorResonancia;
        }
        
        // Deriva lateral (desplazamiento X adicional)
        mesh.position.x += deriva * amortiguamiento;
        
        // Deformación (escala)
        if (mesh.scale) {
            mesh.scale.x = deformacion.x;
            mesh.scale.y = deformacion.y;
            mesh.scale.z = deformacion.z;
        }
        
        return {
            resonancia: factorResonancia,
            torsion: torsion,
            deriva: deriva,
            amortiguamiento: amortiguamiento
        };
    },
    
    // CALCULAR DAÑO ESTRUCTURAL (para futuro)
    calcularDanio(intensidad, duracion, factorResonancia) {
        // Índice de daño simplificado (0-100%)
        const config = EarthquakeConfig.intensidades[intensidad];
        
        let danio = 0;
        
        // Contribución de intensidad
        danio += (intensidad - 3.0) * 10;
        
        // Contribución de duración
        danio += (duracion / 60) * 20;
        
        // Contribución de resonancia
        danio += factorResonancia * 30;
        
        return Math.min(danio, 100);
    },
    
    // RESET
    reset() {
        // Resetear estados si es necesario
    },
    
    // TOGGLES
    toggleResonancia() {
        this.resonanciaEnabled = !this.resonanciaEnabled;
        return this.resonanciaEnabled;
    },
    
    toggleTorsion() {
        this.torsionEnabled = !this.torsionEnabled;
        return this.torsionEnabled;
    },
    
    toggleDeformacion() {
        this.deformacionEnabled = !this.deformacionEnabled;
        return this.deformacionEnabled;
    }
};

window.EarthquakeStructuralFX = EarthquakeStructuralFX;
