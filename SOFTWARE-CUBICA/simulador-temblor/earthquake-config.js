/* CONFIGURACIÓN TERREMOTO */

const EarthquakeConfig = {
    // Intensidades (escala Richter simulada)
    intensidades: {
        3.0: { nombre: 'Leve', movimiento: 0.5, frecuencia: 8, color: '#4CAF50' },
        4.0: { nombre: 'Moderado Bajo', movimiento: 1.2, frecuencia: 10, color: '#8BC34A' },
        5.0: { nombre: 'Moderado', movimiento: 2.5, frecuencia: 12, color: '#FFC107' },
        6.0: { nombre: 'Fuerte', movimiento: 5.0, frecuencia: 15, color: '#FF9800' },
        7.0: { nombre: 'Muy Fuerte', movimiento: 10.0, frecuencia: 18, color: '#FF5722' },
        8.0: { nombre: 'Severo', movimiento: 20.0, frecuencia: 22, color: '#F44336' }
    },

    // Parámetros de ondas sísmicas
    ondas: {
        P: { velocidad: 1.0, amplitud: 0.3 },    // Ondas primarias (rápidas)
        S: { velocidad: 0.6, amplitud: 1.0 }     // Ondas secundarias (lentas, más fuertes)
    },

    // Amplificación por altura
    amplificacionAltura: 1.5,

    // Frecuencia de actualización (ms)
    updateRate: 16,

    // Valores por defecto
    defaults: {
        intensidad: 5.0,
        duracion: 20
    }
};

window.EarthquakeConfig = EarthquakeConfig;
