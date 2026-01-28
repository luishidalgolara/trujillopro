/* MOTOR DE FÍSICA - CANNON.JS INTEGRATION */

const EarthquakePhysicsEngine = {
    enabled: true,
    world: null,
    bodies: new Map(), // Mapeo mesh → body
    collapseThreshold: 70, // % de daño para colapsar
    
    // Inicializar mundo de física
    init() {
        if (!window.CANNON) {
            console.error('❌ Cannon.js no cargado');
            return false;
        }
        
        // Crear mundo de física
        this.world = new CANNON.World();
        this.world.gravity.set(0, -98, 0); // Gravedad real (9.8 m/s²)
        
        // Solver para mejor performance
        this.world.solver.iterations = 10;
        this.world.allowSleep = true;
        
        // Material de contacto
        const defaultMaterial = new CANNON.Material('default');
        const contactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
            friction: 0.4,
            restitution: 0.3 // Rebote moderado
        });
        this.world.addContactMaterial(contactMaterial);
        
        console.log('✅ Motor de física inicializado');
        return true;
    },
    
    // Crear cuerpo físico para un mesh
    crearCuerpoFisico(mesh, mass = 1000) {
        if (!this.world || !mesh.geometry) return null;
        
        // Calcular dimensiones del mesh
        mesh.geometry.computeBoundingBox();
        const bbox = mesh.geometry.boundingBox;
        const size = new CANNON.Vec3(
            (bbox.max.x - bbox.min.x) / 2,
            (bbox.max.y - bbox.min.y) / 2,
            (bbox.max.z - bbox.min.z) / 2
        );
        
        // Crear shape (caja)
        const shape = new CANNON.Box(size);
        
        // Crear body
        const body = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z),
            shape: shape,
            linearDamping: 0.3,
            angularDamping: 0.3
        });
        
        // Sincronizar rotación inicial
        body.quaternion.setFromEuler(mesh.rotation.x, mesh.rotation.y, mesh.rotation.z);
        
        return body;
    },
    
    // Activar física para un mesh (cuando colapsa)
    activarFisica(mesh, fragmentos = null) {
        if (!this.enabled || !this.world) return;
        
        // Si hay fragmentos, activar física en cada uno
        if (fragmentos && fragmentos.length > 0) {
            fragmentos.forEach(fragmento => {
                const body = this.crearCuerpoFisico(fragmento, 100); // Masa menor para fragmentos
                if (body) {
                    // Aplicar impulso aleatorio
                    const impulso = new CANNON.Vec3(
                        (Math.random() - 0.5) * 50,
                        Math.random() * 20,
                        (Math.random() - 0.5) * 50
                    );
                    body.applyImpulse(impulso, body.position);
                    
                    this.world.addBody(body);
                    this.bodies.set(fragmento.uuid, body);
                }
            });
        } else {
            // Activar física en el mesh completo
            const body = this.crearCuerpoFisico(mesh);
            if (body) {
                this.world.addBody(body);
                this.bodies.set(mesh.uuid, body);
            }
        }
    },
    
    // Actualizar mundo de física
    update(deltaTime) {
        if (!this.world || !this.enabled) return;
        
        // Step del mundo de física
        this.world.step(1/60, deltaTime, 3);
        
        // Sincronizar meshes con bodies
        this.bodies.forEach((body, meshUUID) => {
            const mesh = this.encontrarMeshPorUUID(meshUUID);
            if (mesh) {
                // Actualizar posición
                mesh.position.copy(body.position);
                
                // Actualizar rotación
                mesh.quaternion.copy(body.quaternion);
                
                // Remover si está muy abajo (cayó fuera)
                if (body.position.y < -50) {
                    this.removerCuerpo(meshUUID);
                }
            }
        });
    },
    
    // Encontrar mesh por UUID en la escena
    encontrarMeshPorUUID(uuid) {
        let resultado = null;
        vista3DState.scene.traverse(obj => {
            if (obj.uuid === uuid) resultado = obj;
        });
        return resultado;
    },
    
    // Remover cuerpo físico
    removerCuerpo(meshUUID) {
        const body = this.bodies.get(meshUUID);
        if (body) {
            this.world.removeBody(body);
            this.bodies.delete(meshUUID);
            
            // Remover mesh de la escena
            const mesh = this.encontrarMeshPorUUID(meshUUID);
            if (mesh && mesh.parent) {
                mesh.parent.remove(mesh);
            }
        }
    },
    
    // Limpiar todo
    limpiar() {
        if (!this.world) return;
        
        // Remover todos los cuerpos
        this.bodies.forEach((body, uuid) => {
            this.world.removeBody(body);
        });
        this.bodies.clear();
    },
    
    // Resetear
    reset() {
        this.limpiar();
        if (this.world) {
            this.world.time = 0;
        }
    },
    
    // Destruir
    destruir() {
        this.limpiar();
        this.world = null;
    }
};

window.EarthquakePhysicsEngine = EarthquakePhysicsEngine;
