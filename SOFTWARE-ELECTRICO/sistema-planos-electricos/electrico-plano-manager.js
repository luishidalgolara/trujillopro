/**
 * Gestor principal del sistema de planos eléctricos
 * Maneja creación, eliminación, duplicación y cambio de planos
 */
const PlanoElectricoManager = {
    inicializado: false,
    
    // ========================================
    // INICIALIZAR SISTEMA
    // ========================================
    init() {
        if (this.inicializado) {
            console.warn('⚠️ PlanoElectricoManager ya fue inicializado');
            return;
        }
        
        console.log('🚀 Inicializando sistema de planos eléctricos...');
        
        // Crear primer plano por defecto
        this.crearPlano('Plano Eléctrico Principal');
        
        // Inicializar UI de miniaturas
        if (window.PlanoElectricoUI) {
            window.PlanoElectricoUI.init();
        }
        
        this.inicializado = true;
        console.log('✅ Sistema de planos eléctricos inicializado');
    },
    
    // ========================================
    // CREAR NUEVO PLANO
    // ========================================
    crearPlano(nombre = null) {
        if (!PlanoElectricoState.puedeAgregarPlano()) {
            console.warn('⚠️ Límite de planos alcanzado (máximo 10)');
            alert('Has alcanzado el límite máximo de 10 planos eléctricos');
            return null;
        }
        
        const nuevoId = PlanoElectricoState.getCantidadPlanos() + 1;
        const nombrePlano = nombre || `Plano Eléctrico ${nuevoId}`;
        const nuevoPlano = new PlanoElectricoInstance(nuevoId, nombrePlano);
        
        PlanoElectricoState.agregarPlano(nuevoPlano);
        
        console.log(`✅ Plano creado: ${nombrePlano} (ID: ${nuevoId})`);
        
        // Actualizar UI
        if (window.PlanoElectricoUI) {
            window.PlanoElectricoUI.actualizar();
        }
        
        // Si es el único plano, activarlo
        if (PlanoElectricoState.getCantidadPlanos() === 1) {
            this.cambiarAPlano(0);
        }
        
        return nuevoPlano;
    },
    
    // ========================================
    // ELIMINAR PLANO
    // ========================================
    eliminarPlano(index) {
        if (PlanoElectricoState.getCantidadPlanos() <= 1) {
            alert('No puedes eliminar el último plano eléctrico');
            return false;
        }
        
        const plano = PlanoElectricoState.getTodosLosPlanos()[index];
        if (!plano) {
            return false;
        }
        
        if (confirm(`¿Estás seguro de eliminar "${plano.nombre}"?\n\nEsta acción no se puede deshacer.`)) {
            PlanoElectricoState.eliminarPlano(index);
            
            console.log(`🗑️ Plano eliminado: ${plano.nombre}`);
            
            // Actualizar UI
            if (window.PlanoElectricoUI) {
                window.PlanoElectricoUI.actualizar();
            }
            
            // Cambiar al plano activo ajustado
            this.cambiarAPlano(PlanoElectricoState.planoActivoIndex);
            
            return true;
        }
        
        return false;
    },
    
    // ========================================
    // CAMBIAR A UN PLANO ESPECÍFICO
    // ========================================
    cambiarAPlano(index) {
        const plano = PlanoElectricoState.getTodosLosPlanos()[index];
        if (!plano) {
            console.error(`❌ Plano con índice ${index} no existe`);
            return false;
        }
        
        // Guardar estado del plano actual antes de cambiar
        this.guardarEstadoPlanoActual();
        
        // Cambiar plano activo
        PlanoElectricoState.setPlanoActivo(index);
        
        console.log(`🔄 Cambiando a: ${plano.nombre} (ID: ${plano.id})`);
        
        // Cargar estado del nuevo plano activo
        this.cargarEstadoPlano(plano);
        
        // Actualizar UI
        if (window.PlanoElectricoUI) {
            window.PlanoElectricoUI.actualizarIndicadorActivo(index);
        }
        
        return true;
    },
    
    // ========================================
    // DUPLICAR PLANO
    // ========================================
    duplicarPlano(index) {
        const planoOriginal = PlanoElectricoState.getTodosLosPlanos()[index];
        if (!planoOriginal) return null;
        
        if (!PlanoElectricoState.puedeAgregarPlano()) {
            alert('Has alcanzado el límite máximo de 10 planos eléctricos');
            return null;
        }
        
        const nuevoId = PlanoElectricoState.getCantidadPlanos() + 1;
        const planoDuplicado = planoOriginal.clonar(nuevoId);
        
        PlanoElectricoState.agregarPlano(planoDuplicado);
        
        console.log(`📋 Plano duplicado: ${planoDuplicado.nombre}`);
        
        // Actualizar UI
        if (window.PlanoElectricoUI) {
            window.PlanoElectricoUI.actualizar();
        }
        
        return planoDuplicado;
    },
    
    // ========================================
    // RENOMBRAR PLANO
    // ========================================
    renombrarPlano(index, nuevoNombre) {
        const plano = PlanoElectricoState.getTodosLosPlanos()[index];
        if (plano && nuevoNombre && nuevoNombre.trim()) {
            plano.nombre = nuevoNombre.trim();
            plano.actualizarModificacion();
            
            console.log(`✏️ Plano renombrado: ${nuevoNombre}`);
            
            // Actualizar UI
            if (window.PlanoElectricoUI) {
                window.PlanoElectricoUI.actualizar();
            }
            
            return true;
        }
        return false;
    },
    
    // ========================================
    // GUARDAR ESTADO DEL PLANO ACTUAL
    // ========================================
    guardarEstadoPlanoActual() {
        if (window.PlanoElectricoStateManager) {
            window.PlanoElectricoStateManager.guardarEstadoPlanoActual();
        }
    },
    
    // ========================================
    // CARGAR ESTADO DEL PLANO
    // ========================================
    cargarEstadoPlano(plano) {
        if (window.PlanoElectricoStateManager) {
            window.PlanoElectricoStateManager.cargarEstadoPlano(plano);
        }
    },
    
    // ========================================
    // EXPORTAR TODOS LOS PLANOS
    // ========================================
    exportarTodosLosPlanos() {
        const data = {
            version: '1.0',
            aplicacion: 'ELEKTRA - Editor de Planos Eléctricos',
            fechaExportacion: new Date().toISOString(),
            planos: PlanoElectricoState.getTodosLosPlanos().map(plano => plano.exportar())
        };
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `planos_electricos_${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        console.log('📥 Planos exportados');
    },
    
    // ========================================
    // IMPORTAR PLANOS
    // ========================================
    importarPlanos(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (!data.planos || !Array.isArray(data.planos)) {
                throw new Error('Formato inválido');
            }
            
            // Limpiar planos actuales
            PlanoElectricoState.limpiarTodosLosPlanos();
            
            // Importar cada plano
            data.planos.forEach((planoData, index) => {
                const plano = new PlanoElectricoInstance(index + 1, planoData.nombre);
                plano.importar(planoData);
                PlanoElectricoState.agregarPlano(plano);
            });
            
            // Activar primer plano
            this.cambiarAPlano(0);
            
            // Actualizar UI
            if (window.PlanoElectricoUI) {
                window.PlanoElectricoUI.actualizar();
            }
            
            console.log('📤 Planos importados exitosamente');
            return true;
            
        } catch (error) {
            console.error('❌ Error al importar planos:', error);
            alert('Error al importar planos. Verifica el archivo.');
            return false;
        }
    },
    
    // ========================================
    // OBTENER PLANO ACTIVO
    // ========================================
    getPlanoActivo() {
        return PlanoElectricoState.getPlanoActivo();
    },
    
    // ========================================
    // OBTENER TODOS LOS PLANOS
    // ========================================
    getTodosLosPlanos() {
        return PlanoElectricoState.getTodosLosPlanos();
    }
};

// Exportar para uso global
window.PlanoElectricoManager = PlanoElectricoManager;

console.log('✅ PlanoElectricoManager cargado');
