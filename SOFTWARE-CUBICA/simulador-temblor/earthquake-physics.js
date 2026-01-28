/* MOTOR DE FÍSICA SÍSMICA */

const EarthquakePhysics = {
    tiempo: 0,
    seed: Math.random() * 1000,

    // Ruido Perlin simplificado
    noise(x, y) {
        const n = Math.sin(x * 12.9898 + y * 78.233 + this.seed) * 43758.5453;
        return (n - Math.floor(n)) * 2 - 1;
    },

    // Calcular desplazamiento en X
    calcularMovimientoX(tiempo, intensidad) {
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento;
        const freq = config.frecuencia / 10;

        // Onda P + Onda S + Ruido
        const ondaP = Math.sin(tiempo * freq * 2) * amp * 0.3;
        const ondaS = Math.sin(tiempo * freq) * amp * 1.0;
        const ruido = this.noise(tiempo * 0.5, 0) * amp * 0.4;

        return ondaP + ondaS + ruido;
    },

    // Calcular desplazamiento en Y
    calcularMovimientoY(tiempo, intensidad) {
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento;
        const freq = config.frecuencia / 10;

        // Componente vertical (más suave)
        const ondaP = Math.sin(tiempo * freq * 1.5 + 0.5) * amp * 0.2;
        const ondaS = Math.sin(tiempo * freq * 0.8) * amp * 0.5;
        const ruido = this.noise(tiempo * 0.3, 1) * amp * 0.3;

        return ondaP + ondaS + ruido;
    },

    // Calcular desplazamiento en Z
    calcularMovimientoZ(tiempo, intensidad) {
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento;
        const freq = config.frecuencia / 10;

        // Similar a X pero desfasado
        const ondaP = Math.sin(tiempo * freq * 2 + 1) * amp * 0.3;
        const ondaS = Math.sin(tiempo * freq + 0.7) * amp * 1.0;
        const ruido = this.noise(tiempo * 0.5, 2) * amp * 0.4;

        return ondaP + ondaS + ruido;
    },

    // Calcular rotación (sutil)
    calcularRotacion(tiempo, intensidad, eje) {
        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento * 0.01; // Muy sutil
        const freq = config.frecuencia / 15;

        const offset = eje === 'x' ? 0 : (eje === 'y' ? 1 : 2);
        return Math.sin(tiempo * freq + offset) * amp;
    },

    // Aplicar amplificación por altura
    aplicarAmplificacion(movimiento, alturaRelativa) {
        const factor = 1 + (alturaRelativa * EarthquakeConfig.amplificacionAltura);
        return movimiento * factor;
    },

    // Resetear tiempo
    reset() {
        this.tiempo = 0;
        this.seed = Math.random() * 1000;
    }
};

window.EarthquakePhysics = EarthquakePhysics;
