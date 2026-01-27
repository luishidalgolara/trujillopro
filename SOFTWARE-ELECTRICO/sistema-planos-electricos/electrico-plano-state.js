/**
 * Estado global del sistema de planos eléctricos
 * Maneja el array de planos y el índice del plano activo
 */
const PlanoElectricoState = {
    planos: [], // Array de instancias de planos eléctricos
    planoActivoIndex: 0, // Índice del plano activo
    maxPlanos: 10, // Máximo de planos permitidos
    
    // ========================================
    // OBTENER PLANO ACTIVO
    // ========================================
    getPlanoActivo() {
        return this.planos[this.planoActivoIndex] || null;
    },
    
    // ========================================
    // OBTENER TODOS LOS PLANOS
    // ========================================
    getTodosLosPlanos() {
        return this.planos;
    },
    
    // ========================================
    // CAMBIAR PLANO ACTIVO
    // ========================================
    setPlanoActivo(index) {
        if (index >= 0 && index < this.planos.length) {
            this.planoActivoIndex = index;
            return true;
        }
        return false;
    },
    
    // ========================================
    // AGREGAR PLANO
    // ========================================
    agregarPlano(planoInstance) {
        if (this.planos.length < this.maxPlanos) {
            this.planos.push(planoInstance);
            return true;
        }
        return false;
    },
    
    // ========================================
    // ELIMINAR PLANO
    // ========================================
    eliminarPlano(index) {
        if (index >= 0 && index < this.planos.length && this.planos.length > 1) {
            this.planos.splice(index, 1);
            
            // Ajustar índice activo si es necesario
            if (this.planoActivoIndex >= this.planos.length) {
                this.planoActivoIndex = this.planos.length - 1;
            }
            
            return true;
        }
        return false;
    },
    
    // ========================================
    // OBTENER CANTIDAD DE PLANOS
    // ========================================
    getCantidadPlanos() {
        return this.planos.length;
    },
    
    // ========================================
    // VERIFICAR SI SE PUEDE AGREGAR MÁS PLANOS
    // ========================================
    puedeAgregarPlano() {
        return this.planos.length < this.maxPlanos;
    },
    
    // ========================================
    // OBTENER PLANO POR ID
    // ========================================
    getPlanoById(id) {
        return this.planos.find(plano => plano.id === id) || null;
    },
    
    // ========================================
    // LIMPIAR TODOS LOS PLANOS
    // ========================================
    limpiarTodosLosPlanos() {
        this.planos = [];
        this.planoActivoIndex = 0;
    }
};

// Exportar para uso global
window.PlanoElectricoState = PlanoElectricoState;

console.log('✅ PlanoElectricoState cargado');
