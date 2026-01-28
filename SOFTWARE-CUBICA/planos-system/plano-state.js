/**
 * Estado global - Sistema de Planos
 */
const PlanoState = {
    planos: [],
    activePlanoIndex: 0,
    maxPlanos: 10,
    
    getActivePlano() {
        return this.planos[this.activePlanoIndex] || null;
    },
    
    getAllPlanos() {
        return this.planos;
    },
    
    setActivePlano(index) {
        if (index >= 0 && index < this.planos.length) {
            this.activePlanoIndex = index;
            return true;
        }
        return false;
    },
    
    addPlano(planoInstance) {
        if (this.planos.length < this.maxPlanos) {
            this.planos.push(planoInstance);
            return true;
        }
        return false;
    },
    
    removePlano(index) {
        if (index >= 0 && index < this.planos.length && this.planos.length > 1) {
            this.planos.splice(index, 1);
            if (this.activePlanoIndex >= this.planos.length) {
                this.activePlanoIndex = this.planos.length - 1;
            }
            return true;
        }
        return false;
    },
    
    getPlanoCount() {
        return this.planos.length;
    },
    
    canAddPlano() {
        return this.planos.length < this.maxPlanos;
    }
};

window.PlanoState = PlanoState;
