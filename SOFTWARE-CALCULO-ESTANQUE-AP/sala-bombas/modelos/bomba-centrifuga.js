/**
 * BOMBA CENTRÍFUGA - Modelo 3D
 * Crea geometría detallada de bomba centrífuga
 */

const BombaCentrifuga = {
    /**
     * Crear bomba centrífuga completa
     * @param {Object} config - Configuración de la bomba
     * @returns {THREE.Group} Grupo con la bomba completa
     */
    crear: function(config) {
        const grupo = new THREE.Group();
        grupo.name = `Bomba_${config.indice + 1}`;

        // Obtener materiales
        const materiales = MaterialesSala.obtenerMateriales();

        // COMPONENTE 1: Base de la bomba
        const base = this.crearBase(materiales.metal);
        grupo.add(base);

        // COMPONENTE 2: Cuerpo de la bomba (voluta)
        const cuerpo = this.crearCuerpo(materiales.metalAzul);
        cuerpo.position.y = 0.3;
        grupo.add(cuerpo);

        // COMPONENTE 3: Motor eléctrico
        const motor = this.crearMotor(materiales.metalVerde, config.potencia);
        motor.position.set(1.0, 0.5, 0);
        grupo.add(motor);

        // COMPONENTE 4: Eje de transmisión
        const eje = this.crearEje(materiales.acero);
        eje.position.y = 0.5;
        grupo.add(eje);

        // COMPONENTE 5: Bridas de conexión
        const bridaSuccion = this.crearBrida(materiales.metal, 0.15);
        bridaSuccion.position.set(-0.5, 0.3, 0);
        bridaSuccion.rotation.z = Math.PI / 2;
        grupo.add(bridaSuccion);

        const bridaImpulsion = this.crearBrida(materiales.metal, 0.12);
        bridaImpulsion.position.set(0, 0.8, 0);
        grupo.add(bridaImpulsion);

        // Posicionar el grupo completo
        grupo.position.set(
            config.posicion.x,
            config.posicion.y,
            config.posicion.z
        );

        // Agregar sombras
        grupo.traverse((objeto) => {
            if (objeto.isMesh) {
                objeto.castShadow = true;
                objeto.receiveShadow = true;
            }
        });

        return grupo;
    },

    /**
     * Crear base de concreto de la bomba
     */
    crearBase: function(material) {
        const geometry = new THREE.BoxGeometry(1.5, 0.3, 0.8);
        const base = new THREE.Mesh(geometry, material);
        base.position.y = 0.15;
        return base;
    },

    /**
     * Crear cuerpo de la bomba (voluta)
     */
    crearCuerpo: function(material) {
        const grupo = new THREE.Group();

        // Cuerpo principal (cilindro)
        const geometriaCuerpo = new THREE.CylinderGeometry(0.35, 0.35, 0.5, 32);
        const cuerpo = new THREE.Mesh(geometriaCuerpo, material);
        cuerpo.rotation.z = Math.PI / 2;
        grupo.add(cuerpo);

        // Voluta (torus parcial para simular la espiral)
        const geometriaVoluta = new THREE.TorusGeometry(0.25, 0.1, 16, 32, Math.PI * 1.5);
        const voluta = new THREE.Mesh(geometriaVoluta, material);
        voluta.rotation.y = Math.PI / 2;
        grupo.add(voluta);

        return grupo;
    },

    /**
     * Crear motor eléctrico
     */
    crearMotor: function(material, potencia) {
        const grupo = new THREE.Group();

        // Escala según potencia
        const escala = Math.min(1 + (potencia / 20), 1.8);

        // Cuerpo del motor
        const geometriaMotor = new THREE.CylinderGeometry(
            0.2 * escala,
            0.2 * escala,
            0.6 * escala,
            32
        );
        const motor = new THREE.Mesh(geometriaMotor, material);
        motor.rotation.z = Math.PI / 2;
        grupo.add(motor);

        // Caja de conexiones (encima del motor)
        const geometriaCaja = new THREE.BoxGeometry(
            0.15 * escala,
            0.12 * escala,
            0.1 * escala
        );
        const materialCaja = MaterialesSala.obtenerMateriales().metalGris;
        const caja = new THREE.Mesh(geometriaCaja, materialCaja);
        caja.position.y = 0.25 * escala;
        grupo.add(caja);

        return grupo;
    },

    /**
     * Crear eje de transmisión
     */
    crearEje: function(material) {
        const geometria = new THREE.CylinderGeometry(0.03, 0.03, 1.0, 16);
        const eje = new THREE.Mesh(geometria, material);
        eje.rotation.z = Math.PI / 2;
        return eje;
    },

    /**
     * Crear brida de conexión
     */
    crearBrida: function(material, radio) {
        const grupo = new THREE.Group();

        // Disco de la brida
        const geometriaDisc = new THREE.CylinderGeometry(radio, radio, 0.05, 32);
        const disco = new THREE.Mesh(geometriaDisc, material);
        grupo.add(disco);

        // Pernos (4 pernos alrededor)
        const geometriaPerno = new THREE.CylinderGeometry(0.01, 0.01, 0.08, 8);
        const materialPerno = MaterialesSala.obtenerMateriales().acero;

        for (let i = 0; i < 4; i++) {
            const angulo = (Math.PI * 2 * i) / 4;
            const perno = new THREE.Mesh(geometriaPerno, materialPerno);
            perno.position.x = Math.cos(angulo) * (radio * 0.7);
            perno.position.z = Math.sin(angulo) * (radio * 0.7);
            grupo.add(perno);
        }

        return grupo;
    },

    /**
     * Obtener dimensiones recomendadas según potencia
     */
    obtenerDimensiones: function(potencia) {
        if (potencia <= 2) {
            return { largo: 1.2, ancho: 0.6, alto: 0.8 };
        } else if (potencia <= 5) {
            return { largo: 1.5, ancho: 0.8, alto: 1.0 };
        } else if (potencia <= 10) {
            return { largo: 1.8, ancho: 1.0, alto: 1.2 };
        } else {
            return { largo: 2.2, ancho: 1.2, alto: 1.5 };
        }
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BombaCentrifuga;
}
