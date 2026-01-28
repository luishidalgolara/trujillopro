/**
 * Gestor Principal - Sistema de Planos
 */
const PlanoManager = {
    initialized: false,
    
    init() {
        if (this.initialized) {
            console.warn('⚠️ PlanoManager ya inicializado');
            return;
        }
        
        console.log('🚀 Inicializando sistema multi-plano...');
        
        this.createPlano('Plano Principal');
        
        if (window.PlanoThumbnailsUI) {
            window.PlanoThumbnailsUI.init();
        }
        
        this.initialized = true;
        console.log('✅ Sistema multi-plano inicializado');
    },
    
    createPlano(name = null) {
        if (!PlanoState.canAddPlano()) {
            console.warn('⚠️ Límite de planos alcanzado (máximo 10)');
            alert('Has alcanzado el límite máximo de 10 planos');
            return null;
        }
        
        const newId = PlanoState.getPlanoCount() + 1;
        const planoName = name || `Plano ${newId}`;
        const newPlano = new PlanoInstance(newId, planoName);
        
        PlanoState.addPlano(newPlano);
        
        console.log(`✅ Plano creado: ${planoName} (ID: ${newId})`);
        
        if (window.PlanoThumbnailsUI) {
            window.PlanoThumbnailsUI.refresh();
        }
        
        if (PlanoState.getPlanoCount() === 1) {
            this.switchToPlano(0);
        }
        
        return newPlano;
    },
    
    deletePlano(index) {
        if (PlanoState.getPlanoCount() <= 1) {
            alert('No puedes eliminar el último plano');
            return false;
        }
        
        const plano = PlanoState.getAllPlanos()[index];
        if (!plano) return false;
        
        if (confirm(`¿Estás seguro de eliminar "${plano.name}"?`)) {
            PlanoState.removePlano(index);
            
            console.log(`🗑️ Plano eliminado: ${plano.name}`);
            
            if (window.PlanoThumbnailsUI) {
                window.PlanoThumbnailsUI.refresh();
            }
            
            this.switchToPlano(PlanoState.activePlanoIndex);
            
            return true;
        }
        
        return false;
    },
    
    switchToPlano(index) {
        const plano = PlanoState.getAllPlanos()[index];
        if (!plano) {
            console.error(`❌ Plano con índice ${index} no existe`);
            return false;
        }
        
        // IMPORTANTE: Guardar estado del plano ACTUAL antes de cambiar
        const planoActualIndex = PlanoState.activePlanoIndex;
        const planoActual = PlanoState.getAllPlanos()[planoActualIndex];
        
        if (planoActual && window.PlanoManagerState) {
            console.log(`💾 Guardando estado de: ${planoActual.name}`);
            window.PlanoManagerState.saveCurrentPlanoState(planoActual);
        }
        
        // Cambiar plano activo
        PlanoState.setActivePlano(index);
        
        console.log(`🔄 Cambiando a: ${plano.name} (ID: ${plano.id})`);
        
        // Cargar estado del nuevo plano activo
        this.loadPlanoState(plano);
        
        // Actualizar UI
        if (window.PlanoThumbnailsUI) {
            window.PlanoThumbnailsUI.updateActiveIndicator(index);
        }
        
        return true;
    },
    
    duplicatePlano(index) {
        const originalPlano = PlanoState.getAllPlanos()[index];
        if (!originalPlano) return null;
        
        if (!PlanoState.canAddPlano()) {
            alert('Has alcanzado el límite máximo de 10 planos');
            return null;
        }
        
        const newId = PlanoState.getPlanoCount() + 1;
        const duplicatedPlano = originalPlano.clone(newId);
        
        PlanoState.addPlano(duplicatedPlano);
        
        console.log(`📋 Plano duplicado: ${duplicatedPlano.name}`);
        
        if (window.PlanoThumbnailsUI) {
            window.PlanoThumbnailsUI.refresh();
        }
        
        return duplicatedPlano;
    },
    
    renamePlano(index, newName) {
        const plano = PlanoState.getAllPlanos()[index];
        if (plano && newName && newName.trim()) {
            plano.name = newName.trim();
            plano.updateLastModified();
            
            if (window.PlanoThumbnailsUI) {
                window.PlanoThumbnailsUI.refresh();
            }
            
            return true;
        }
        return false;
    },
    
    saveCurrentPlanoState() {
        if (window.PlanoManagerState) {
            window.PlanoManagerState.saveCurrentPlanoState();
        }
    },
    
    loadPlanoState(plano) {
        if (window.PlanoManagerState) {
            window.PlanoManagerState.loadPlanoState(plano);
        }
    },
    
    exportAllPlanos() {
        if (window.PlanoManagerExport) {
            window.PlanoManagerExport.exportAllPlanos();
        }
    },
    
    importPlanos(jsonData) {
        if (window.PlanoManagerExport) {
            return window.PlanoManagerExport.importPlanos(jsonData);
        }
        return false;
    },
    
    getActivePlano() {
        return PlanoState.getActivePlano();
    },
    
    getAllPlanos() {
        return PlanoState.getAllPlanos();
    }
};

window.PlanoManager = PlanoManager;