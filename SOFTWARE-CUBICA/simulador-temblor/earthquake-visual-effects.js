/* EFECTOS VISUALES AVANZADOS */

const EarthquakeVisualEffects = {
    enabled: true,
    ondasSuelo: true,
    grietas: true,
    rastrosMovimiento: true,
    
    // Canvas para efectos overlay
    overlayCanvas: null,
    overlayCtx: null,
    
    // Grietas dinámicas
    grietasActivas: [],
    
    // Ondas en el suelo
    ondasCirculares: [],
    
    // Inicializar
    init(renderer) {
        if (!this.enabled) return;
        
        // Crear canvas overlay para efectos 2D sobre 3D
        this.overlayCanvas = document.createElement('canvas');
        this.overlayCanvas.id = 'earthquakeEffectsOverlay';
        this.overlayCanvas.style.position = 'absolute';
        this.overlayCanvas.style.top = '0';
        this.overlayCanvas.style.left = '0';
        this.overlayCanvas.style.pointerEvents = 'none';
        this.overlayCanvas.style.zIndex = '999';
        
        const container = renderer.domElement.parentElement;
        container.appendChild(this.overlayCanvas);
        
        this.overlayCanvas.width = renderer.domElement.width;
        this.overlayCanvas.height = renderer.domElement.height;
        this.overlayCtx = this.overlayCanvas.getContext('2d');
        
        console.log('✅ Efectos visuales inicializados');
    },
    
    // ONDAS CIRCULARES EN EL SUELO
    agregarOndaSuelo(tiempo, intensidad) {
        if (!this.ondasSuelo) return;
        
        const config = EarthquakeConfig.intensidades[intensidad];
        this.ondasCirculares.push({
            tiempo: tiempo,
            radio: 0,
            maxRadio: 100,
            velocidad: 30,
            color: config.color,
            opacidad: 1.0
        });
    },
    
    actualizarOndasSuelo(deltaTime) {
        if (!this.ondasSuelo) return;
        
        this.ondasCirculares = this.ondasCirculares.filter(onda => {
            onda.radio += onda.velocidad * deltaTime;
            onda.opacidad = 1.0 - (onda.radio / onda.maxRadio);
            return onda.radio < onda.maxRadio;
        });
    },
    
    // GRIETAS DINÁMICAS
    generarGrieta(mesh, intensidad) {
        if (!this.grietas) return;
        if (intensidad < 6.0) return; // Solo en terremotos fuertes
        
        // Probabilidad de grieta según intensidad
        const probabilidad = (intensidad - 6.0) * 0.05;
        if (Math.random() > probabilidad) return;
        
        this.grietasActivas.push({
            mesh: mesh,
            progreso: 0,
            duracion: 2.0, // segundos
            puntos: this.generarPuntosGrieta(mesh)
        });
    },
    
    generarPuntosGrieta(mesh) {
        // Generar puntos de una grieta aleatoria
        const puntos = [];
        const numPuntos = 5 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < numPuntos; i++) {
            puntos.push({
                x: (Math.random() - 0.5) * 2,
                y: Math.random(),
                z: (Math.random() - 0.5) * 0.5
            });
        }
        
        return puntos;
    },
    
    actualizarGrietas(deltaTime) {
        if (!this.grietas) return;
        
        this.grietasActivas = this.grietasActivas.filter(grieta => {
            grieta.progreso += deltaTime / grieta.duracion;
            return grieta.progreso < 1.0;
        });
    },
    
    // RASTROS DE MOVIMIENTO
    dibujarRastros(camera, grupo) {
        if (!this.rastrosMovimiento || !this.overlayCtx) return;
        
        const ctx = this.overlayCtx;
        ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        
        // Dibujar ondas circulares
        this.ondasCirculares.forEach(onda => {
            ctx.beginPath();
            ctx.arc(
                this.overlayCanvas.width / 2,
                this.overlayCanvas.height / 2,
                onda.radio * 5, // Escalar
                0,
                Math.PI * 2
            );
            ctx.strokeStyle = `rgba(255, 0, 0, ${onda.opacidad * 0.5})`;
            ctx.lineWidth = 3;
            ctx.stroke();
        });
        
        // Efecto de sacudida de pantalla
        if (EarthquakeController.activo) {
            const intensidadVisual = EarthquakeConfig.intensidades[EarthquakeController.intensidad].movimiento;
            ctx.fillStyle = `rgba(255, 0, 0, ${intensidadVisual * 0.01})`;
            ctx.fillRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        }
    },
    
    // DEFORMACIÓN VISUAL DE ELEMENTOS
    aplicarDeformacion(mesh, intensidad, tiempo) {
        // Deformación sutil de geometría (opcional, más avanzado)
        // Por ahora solo escala pulsante
        const config = EarthquakeConfig.intensidades[intensidad];
        const factor = 1.0 + Math.sin(tiempo * 10) * config.movimiento * 0.001;
        
        // Aplicar solo a altura (Y)
        if (mesh.scale) {
            mesh.scale.y = factor;
        }
    },
    
    // INDICADOR VISUAL DE INTENSIDAD
    mostrarIndicadorIntensidad(intensidad) {
        const config = EarthquakeConfig.intensidades[intensidad];
        
        // Cambiar color de fondo del canvas overlay
        if (this.overlayCtx) {
            this.overlayCtx.fillStyle = `rgba(${this.hexToRgb(config.color)}, 0.1)`;
            this.overlayCtx.fillRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        }
    },
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            '255, 0, 0';
    },
    
    // UPDATE PRINCIPAL
    update(deltaTime, camera, grupo, intensidad) {
        if (!this.enabled) return;
        
        this.actualizarOndasSuelo(deltaTime);
        this.actualizarGrietas(deltaTime);
        this.dibujarRastros(camera, grupo);
    },
    
    // LIMPIAR
    limpiar() {
        this.grietasActivas = [];
        this.ondasCirculares = [];
        
        if (this.overlayCtx) {
            this.overlayCtx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
        }
    },
    
    // DESTRUIR
    destruir() {
        if (this.overlayCanvas && this.overlayCanvas.parentElement) {
            this.overlayCanvas.parentElement.removeChild(this.overlayCanvas);
        }
        this.overlayCanvas = null;
        this.overlayCtx = null;
    },
    
    // TOGGLES
    toggleOndasSuelo() {
        this.ondasSuelo = !this.ondasSuelo;
        return this.ondasSuelo;
    },
    
    toggleGrietas() {
        this.grietas = !this.grietas;
        return this.grietas;
    },
    
    toggleRastros() {
        this.rastrosMovimiento = !this.rastrosMovimiento;
        return this.rastrosMovimiento;
    }
};

window.EarthquakeVisualEffects = EarthquakeVisualEffects;
