/* ONDAS SÍSMICAS AVANZADAS */

const EarthquakeWavesAdvanced = {
    tiempoInicio: 0,
    velocidades: {
        P: 8.0,      // km/s (más rápida)
        S: 4.5,      // km/s
        Love: 3.5,   // km/s
        Rayleigh: 3.0 // km/s (más lenta)
    },
    
    distanciaEpicentro: 50, // km simulados
    
    // Calcular si la onda ya llegó
    ondaLlego(tipo, tiempoActual) {
        const velocidad = this.velocidades[tipo];
        const tiempoLlegada = this.distanciaEpicentro / velocidad;
        return tiempoActual >= tiempoLlegada;
    },

    // Calcular factor de amplitud según tiempo transcurrido desde llegada
    factorAmplitud(tipo, tiempoActual) {
        const velocidad = this.velocidades[tipo];
        const tiempoLlegada = this.distanciaEpicentro / velocidad;
        
        if (tiempoActual < tiempoLlegada) return 0;
        
        const tiempoDesdellegada = tiempoActual - tiempoLlegada;
        
        // Envolvente: sube rápido, baja lento
        const ataque = 0.5; // segundos
        const decaimiento = 3.0; // segundos
        
        if (tiempoDesdeelegada < ataque) {
            return tiempoDesdeelegada / ataque;
        } else {
            const decay = Math.exp(-(tiempoDesdeelegada - ataque) / decaimiento);
            return decay;
        }
    },

    // ONDA P (Primaria - Compresión/Expansión)
    calcularOndaP(tiempo, intensidad) {
        if (!this.ondaLlego('P', tiempo)) return { x: 0, y: 0, z: 0 };
        
        const factor = this.factorAmplitud('P', tiempo);
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento * 0.3 * factor;
        const freq = config.frecuencia / 8;
        
        // Movimiento predominantemente longitudinal (Z)
        return {
            x: Math.sin(tiempo * freq * 3) * amp * 0.2,
            y: Math.sin(tiempo * freq * 2.5) * amp * 0.15,
            z: Math.sin(tiempo * freq * 4) * amp * 1.0 // Componente principal
        };
    },

    // ONDA S (Secundaria - Corte transversal)
    calcularOndaS(tiempo, intensidad) {
        if (!this.ondaLlego('S', tiempo)) return { x: 0, y: 0, z: 0 };
        
        const factor = this.factorAmplitud('S', tiempo);
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento * 0.8 * factor;
        const freq = config.frecuencia / 10;
        
        // Movimiento transversal (X, Y)
        return {
            x: Math.sin(tiempo * freq * 2) * amp * 1.0,
            y: Math.sin(tiempo * freq * 1.8) * amp * 0.5,
            z: Math.sin(tiempo * freq * 1.5) * amp * 0.3
        };
    },

    // ONDA LOVE (Horizontal intensa, sin componente vertical)
    calcularOndaLove(tiempo, intensidad) {
        if (!this.ondaLlego('Love', tiempo)) return { x: 0, y: 0, z: 0 };
        
        const factor = this.factorAmplitud('Love', tiempo);
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento * 1.2 * factor;
        const freq = config.frecuencia / 12;
        
        // Solo horizontal (X, Z), NO vertical
        return {
            x: Math.sin(tiempo * freq * 1.5) * amp * 1.0,
            y: 0, // Sin componente vertical
            z: Math.sin(tiempo * freq * 1.3 + Math.PI/4) * amp * 0.8
        };
    },

    // ONDA RAYLEIGH (Movimiento elíptico - como olas del mar)
    calcularOndaRayleigh(tiempo, intensidad) {
        if (!this.ondaLlego('Rayleigh', tiempo)) return { x: 0, y: 0, z: 0, rot: 0 };
        
        const factor = this.factorAmplitud('Rayleigh', tiempo);
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento * 1.0 * factor;
        const freq = config.frecuencia / 15;
        
        // Movimiento elíptico (vertical + horizontal coordinado)
        const fase = tiempo * freq;
        return {
            x: Math.sin(fase * 1.2) * amp * 0.6,
            y: Math.sin(fase * 2) * amp * 0.8, // Vertical dominante
            z: Math.cos(fase * 1.2) * amp * 0.6,
            rot: Math.sin(fase * 0.8) * 0.02 * factor // Rotación sutil
        };
    },

    // COMBINAR TODAS LAS ONDAS
    calcularMovimientoTotal(tiempo, intensidad) {
        const p = this.calcularOndaP(tiempo, intensidad);
        const s = this.calcularOndaS(tiempo, intensidad);
        const love = this.calcularOndaLove(tiempo, intensidad);
        const rayleigh = this.calcularOndaRayleigh(tiempo, intensidad);
        
        return {
            x: p.x + s.x + love.x + rayleigh.x,
            y: p.y + s.y + love.y + rayleigh.y,
            z: p.z + s.z + love.z + rayleigh.z,
            rotX: (rayleigh.rot || 0) * 0.5,
            rotY: (rayleigh.rot || 0) * 0.3,
            rotZ: (rayleigh.rot || 0) * 0.8
        };
    },

    // CALCULAR TORSIÓN (giro del edificio)
    calcularTorsion(tiempo, intensidad, posicionX, posicionZ) {
        if (!this.ondaLlego('Love', tiempo)) return 0;
        
        const factor = this.factorAmplitud('Love', tiempo);
        const config = EarthquakeConfig.intensidades[intensidad];
        
        // Torsión aumenta con la distancia al centro
        const distanciaCentro = Math.sqrt(posicionX * posicionX + posicionZ * posicionZ);
        const factorDistancia = distanciaCentro / 50; // Normalizar
        
        const amp = config.movimiento * 0.015 * factor * factorDistancia;
        const freq = config.frecuencia / 20;
        
        return Math.sin(tiempo * freq) * amp;
    },

    // Obtener info de ondas para UI
    getEstadoOndas(tiempo) {
        return {
            P: { activa: this.ondaLlego('P', tiempo), factor: this.factorAmplitud('P', tiempo) },
            S: { activa: this.ondaLlego('S', tiempo), factor: this.factorAmplitud('S', tiempo) },
            Love: { activa: this.ondaLlego('Love', tiempo), factor: this.factorAmplitud('Love', tiempo) },
            Rayleigh: { activa: this.ondaLlego('Rayleigh', tiempo), factor: this.factorAmplitud('Rayleigh', tiempo) }
        };
    },

    // Reset
    reset(distanciaEpicentro = 50) {
        this.distanciaEpicentro = distanciaEpicentro;
        this.tiempoInicio = Date.now();
    }
};

window.EarthquakeWavesAdvanced = EarthquakeWavesAdvanced;
