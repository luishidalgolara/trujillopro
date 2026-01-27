/**
 * Estado global del sistema multi-plano
 */
const PlaneState = {
    planes: [], // Array de instancias de planos
    activePlaneIndex: 0, // Índice del plano activo
    maxPlanes: 10, // Máximo de planos permitidos
    
    // Obtener plano activo
    getActivePlane() {
        return this.planes[this.activePlaneIndex] || null;
    },
    
    // Obtener todos los planos
    getAllPlanes() {
        return this.planes;
    },
    
    // Cambiar plano activo
    setActivePlane(index) {
        if (index >= 0 && index < this.planes.length) {
            this.activePlaneIndex = index;
            return true;
        }
        return false;
    },
    
    // Agregar plano
    addPlane(planeInstance) {
        if (this.planes.length < this.maxPlanes) {
            this.planes.push(planeInstance);
            return true;
        }
        return false;
    },
    
    // Eliminar plano
    removePlane(index) {
        if (index >= 0 && index < this.planes.length && this.planes.length > 1) {
            this.planes.splice(index, 1);
            // Ajustar índice activo si es necesario
            if (this.activePlaneIndex >= this.planes.length) {
                this.activePlaneIndex = this.planes.length - 1;
            }
            return true;
        }
        return false;
    },
    
    // Obtener cantidad de planos
    getPlaneCount() {
        return this.planes.length;
    },
    
    // Verificar si se puede agregar más planos
    canAddPlane() {
        return this.planes.length < this.maxPlanes;
    }
};

// Exportar para uso global
window.PlaneState = PlaneState;