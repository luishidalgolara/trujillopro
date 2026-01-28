/**
 * MATERIALES SALA - Definición de materiales Three.js
 * Materiales optimizados para diferentes componentes
 */

const MaterialesSala = {
    cache: {},

    obtenerMateriales: function() {
        if (Object.keys(this.cache).length > 0) {
            return this.cache;
        }

        this.cache = {
            metal: new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.7, roughness: 0.3 }),
            metalAzul: new THREE.MeshStandardMaterial({ color: 0x1E90FF, metalness: 0.7, roughness: 0.3 }),
            metalVerde: new THREE.MeshStandardMaterial({ color: 0x228B22, metalness: 0.7, roughness: 0.3 }),
            metalGris: new THREE.MeshStandardMaterial({ color: 0x696969, metalness: 0.7, roughness: 0.3 }),
            metalBronce: new THREE.MeshStandardMaterial({ color: 0xB8860B, metalness: 0.7, roughness: 0.3 }),
            acero: new THREE.MeshStandardMaterial({ color: 0xC0C0C0, metalness: 0.7, roughness: 0.3 }),
            tuberiaPVC: new THREE.MeshStandardMaterial({ color: 0xE0E0E0, metalness: 0.4, roughness: 0.6 }),
            tuberiaAcero: new THREE.MeshStandardMaterial({ color: 0x4682B4, metalness: 0.4, roughness: 0.6 }),
            pisoConcreto: new THREE.MeshStandardMaterial({ color: 0x9E9E9E, metalness: 0.0, roughness: 0.9 }),
            paredConcreto: new THREE.MeshStandardMaterial({ color: 0xBDBDBD, metalness: 0.0, roughness: 0.9 }),
            techo: new THREE.MeshStandardMaterial({ color: 0x8B8B8B, metalness: 0.1, roughness: 0.8 })
        };

        return this.cache;
    }
};

// ✅ AGREGADO: Alias para compatibilidad con accesorios.js
const SalaBombasMateriales = {
    tuberia: function() {
        return MaterialesSala.obtenerMateriales().tuberiaPVC;
    },
    manometro: function() {
        return MaterialesSala.obtenerMateriales().metalGris;
    },
    // Acceso directo a todos los materiales
    obtenerMateriales: function() {
        return MaterialesSala.obtenerMateriales();
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MaterialesSala;
}