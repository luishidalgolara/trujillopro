/**
 * DIMENSIONES Y ESPECIFICACIONES TÉCNICAS
 * Configuración de bombas centrífugas comerciales
 */

const DimensionesBombas = {
    especificaciones: {
        '1-2HP': { largo: 1.2, ancho: 0.6, alto: 0.8, peso: 150, diametroSuccion: 50, diametroImpulsion: 40, tipo: 'Centrífuga horizontal' },
        '3-5HP': { largo: 1.5, ancho: 0.8, alto: 1.0, peso: 250, diametroSuccion: 63, diametroImpulsion: 50, tipo: 'Centrífuga horizontal' },
        '6-10HP': { largo: 1.8, ancho: 1.0, alto: 1.2, peso: 400, diametroSuccion: 75, diametroImpulsion: 63, tipo: 'Centrífuga vertical' },
        '10+HP': { largo: 2.2, ancho: 1.2, alto: 1.5, peso: 650, diametroSuccion: 100, diametroImpulsion: 75, tipo: 'Centrífuga vertical multietapa' }
    },

    obtenerEspecificacion: function(potencia) {
        if (potencia <= 2) return this.especificaciones['1-2HP'];
        if (potencia <= 5) return this.especificaciones['3-5HP'];
        if (potencia <= 10) return this.especificaciones['6-10HP'];
        return this.especificaciones['10+HP'];
    }
};

// ✅ AGREGADO: Alias para compatibilidad con accesorios.js
const SalaBombasDimensiones = {
    accesorios: {
        manometro: {
            largoBrazo: 0.15,
            diametroCaratula: 0.12,
            profundidad: 0.04
        },
        tablero: {
            ancho: 0.8,
            alto: 1.2,
            profundidad: 0.15
        }
    },
    // Mantener referencia a las especificaciones originales
    especificaciones: DimensionesBombas.especificaciones,
    obtenerEspecificacion: function(potencia) {
        return DimensionesBombas.obtenerEspecificacion(potencia);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DimensionesBombas;
}