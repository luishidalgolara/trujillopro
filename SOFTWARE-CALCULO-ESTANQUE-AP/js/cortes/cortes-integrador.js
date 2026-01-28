/**
 * MÓDULO INTEGRADOR DE CORTES Y VISTAS
 * Une todos los módulos de cortes en una API unificada
 * Versión: 1.0
 * 
 * DEPENDENCIAS:
 * - utilidades-svg.js
 * - cortes-estanque.js
 * - cortes-sala.js
 * - vista-planta.js
 */

const CortesVistas = {
    /**
     * CORTE A-A: Estanque Vista Longitudinal
     */
    generarCorteAA: function(canvas, dimensiones) {
        CortesEstanque.generarCorteAA(canvas, dimensiones);
    },

    /**
     * CORTE B-B: Estanque Vista Transversal
     */
    generarCorteBB: function(canvas, dimensiones) {
        CortesEstanque.generarCorteBB(canvas, dimensiones);
    },

    /**
     * CORTE C-C: Sala de Bombas Vista Longitudinal
     */
    generarCorteCC: function(canvas, dimensionesSala) {
        CortesSala.generarCorteCC(canvas, dimensionesSala);
    },

    /**
     * CORTE D-D: Sala de Bombas Vista Transversal
     */
    generarCorteDD: function(canvas, dimensionesSala) {
        CortesSala.generarCorteDD(canvas, dimensionesSala);
    },

    /**
     * VISTA EN PLANTA: Disposición General
     */
    generarVistaPlanta: function(canvas, dimensionesEstanque, dimensionesSala) {
        VistaPlanta.generar(canvas, dimensionesEstanque, dimensionesSala);
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CortesVistas;
}
