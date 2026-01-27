/**
 * INTERCEPTOR DE CUADRO DE CARGAS
 * Aísla los datos del cuadro de cargas por plano para que cada uno sea independiente
 * FUNCIONA IGUAL QUE LA VIÑETA
 */

const CuadroCargasInterceptor = {
    
    // ========================================
    // GUARDAR DATOS DE CUADRO DE CARGAS EN PLANO ACTUAL
    // ========================================
    guardarDatosCuadroEnPlano() {
        const planoActual = window.PlanoElectricoManager?.getPlanoActivo();
        if (!planoActual) return;
        
        // Verificar si existe el CuadroState global
        if (typeof CuadroState === 'undefined') {
            planoActual.cuadroCargas.integrado = false;
            return;
        }
        
        // Verificar si hay circuitos
        const hayCircuitos = (CuadroState.circuits?.level1?.length > 0) || 
                            (CuadroState.circuits?.level2?.length > 0);
        
        if (!hayCircuitos) {
            planoActual.cuadroCargas.integrado = false;
            planoActual.cuadroCargas.datos = null;
            return;
        }
        
        // Guardar el estado completo del cuadro
        planoActual.cuadroCargas = {
            integrado: true,
            datos: {
                circuits: JSON.parse(JSON.stringify(CuadroState.circuits)),
                totalPotencia: CuadroState.totalPotencia,
                totalCorriente: CuadroState.totalCorriente,
                demandaPotencia: CuadroState.demandaPotencia,
                demandaCorriente: CuadroState.demandaCorriente,
                interruptorGeneral: CuadroState.interruptorGeneral,
                factorDemanda: CuadroState.factorDemanda || 0.75
            }
        };
        
        console.log('💾 Datos de cuadro de cargas guardados en plano:', planoActual.nombre);
    },
    
    // ========================================
    // RESTAURAR DATOS DE CUADRO DE CARGAS DESDE PLANO
    // ========================================
    restaurarDatosCuadroDesde(plano) {
        if (!plano || typeof CuadroState === 'undefined') {
            return;
        }
        
        // PRIMERO: Siempre limpiar el estado actual
        this.limpiarCuadroState();
        
        // SEGUNDO: Si el plano tiene datos, restaurarlos
        if (plano.cuadroCargas && plano.cuadroCargas.integrado && plano.cuadroCargas.datos) {
            const datos = plano.cuadroCargas.datos;
            
            CuadroState.circuits = JSON.parse(JSON.stringify(datos.circuits));
            CuadroState.totalPotencia = datos.totalPotencia || 0;
            CuadroState.totalCorriente = datos.totalCorriente || 0;
            CuadroState.demandaPotencia = datos.demandaPotencia || 0;
            CuadroState.demandaCorriente = datos.demandaCorriente || 0;
            CuadroState.interruptorGeneral = datos.interruptorGeneral || '-';
            CuadroState.factorDemanda = datos.factorDemanda || 0.75;
            
            console.log('✅ Datos de cuadro de cargas restaurados para:', plano.nombre);
        } else {
            console.log('🧹 Plano sin cuadro de cargas');
        }
        
        // TERCERO: Actualizar la UI si está abierta
        if (window.cuadroCargasActivo && typeof actualizarTablaCuadroCargasModal === 'function') {
            setTimeout(() => {
                actualizarTablaCuadroCargasModal();
            }, 100);
        }
    },
    
    // ========================================
    // LIMPIAR CUADRO STATE (SIN ACTUALIZAR UI)
    // ========================================
    limpiarCuadroState() {
        if (typeof CuadroState === 'undefined') return;
        
        CuadroState.circuits = {
            level1: [],
            level2: []
        };
        CuadroState.totalPotencia = 0;
        CuadroState.totalCorriente = 0;
        CuadroState.demandaPotencia = 0;
        CuadroState.demandaCorriente = 0;
        CuadroState.interruptorGeneral = '-';
        CuadroState.factorDemanda = 0.75;
    },
    
    // ========================================
    // OBSERVAR CAMBIOS EN EL SVG (DESACTIVADO TEMPORALMENTE)
    // ========================================
    observarCambiosEnPlano() {
        // DESACTIVADO: Esto causaba guardados automáticos no deseados
        // Se guardará manualmente al cerrar el cuadro o cambiar de plano
        
        /* 
        const svgPlano = document.getElementById('plano');
        if (!svgPlano) return;
        
        const observer = new MutationObserver(() => {
            clearTimeout(this._saveTimeout);
            this._saveTimeout = setTimeout(() => {
                this.guardarDatosCuadroEnPlano();
            }, 1000);
        });
        
        observer.observe(svgPlano, {
            childList: true,
            subtree: true,
            attributes: false
        });
        */
        
        console.log('⏸️ Observer de cambios desactivado (guardado manual)');
    },
    
    // ========================================
    // INICIALIZAR INTERCEPTOR
    // ========================================
    init() {
        console.log('🚀 Inicializando interceptor de cuadro de cargas...');
        
        // Observar cambios en el plano (auto-guardado)
        this.observarCambiosEnPlano();
        
        // Interceptar cerrarCuadroCargas SOLAMENTE para guardar antes de cerrar
        if (window.cerrarCuadroCargas) {
            const originalCerrar = window.cerrarCuadroCargas;
            window.cerrarCuadroCargas = () => {
                // Guardar antes de cerrar
                this.guardarDatosCuadroEnPlano();
                // Ejecutar cierre original
                originalCerrar();
            };
        }
        
        // NO interceptar abrirCuadroCargas, dejar que funcione normal
        // La restauración se hace automáticamente al cambiar de plano
        
        console.log('✅ Interceptor de cuadro de cargas inicializado');
    }
};

// Exportar para uso global
window.CuadroCargasInterceptor = CuadroCargasInterceptor;

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            CuadroCargasInterceptor.init();
        }, 2500);
    });
} else {
    setTimeout(() => {
        CuadroCargasInterceptor.init();
    }, 2500);
}

console.log('✅ CuadroCargasInterceptor cargado');