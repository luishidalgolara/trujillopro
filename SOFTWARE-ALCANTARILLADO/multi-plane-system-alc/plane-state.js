/**
 * Estado global del sistema multi-plano para Alcantarillado
 */
const PlaneStateAlc = {
    planes: [],
    activePlaneId: null,
    maxPlanes: 10,
    
    init() {
        const defaultPlane = new PlaneInstanceAlc(1, 'Plano 1');
        this.planes.push(defaultPlane);
        this.activePlaneId = defaultPlane.id;
    },
    
    getActivePlane() {
        return this.planes.find(p => p.id === this.activePlaneId);
    },
    
    getPlaneById(id) {
        return this.planes.find(p => p.id === id);
    },
    
    addPlane(plane) {
        if (this.planes.length >= this.maxPlanes) {
            alert(`Máximo ${this.maxPlanes} planos permitidos`);
            return false;
        }
        this.planes.push(plane);
        return true;
    },
    
    removePlane(id) {
        const index = this.planes.findIndex(p => p.id === id);
        if (index !== -1) {
            this.planes.splice(index, 1);
            return true;
        }
        return false;
    },
    
    setActivePlane(id) {
        this.activePlaneId = id;
    },
    
    getNextId() {
        if (this.planes.length === 0) return 1;
        return Math.max(...this.planes.map(p => p.id)) + 1;
    }
};

window.PlaneStateAlc = PlaneStateAlc;

console.log('✅ PlaneStateAlc cargado');