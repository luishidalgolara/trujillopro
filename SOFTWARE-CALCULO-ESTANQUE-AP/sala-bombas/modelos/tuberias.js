/**
 * TUBERÍAS DEL SISTEMA - Modelo 3D
 * Crea tuberías de succión e impulsión
 */

const TuberiasSistema = {
    /**
     * Crear tuberías de succión (del estanque a las bombas)
     */
    crearTuberiasSuccion: function(puntoEstanque, posicionesBombas, datos) {
        const grupo = new THREE.Group();
        grupo.name = 'TuberiasSuccion';

        const materiales = MaterialesSala.obtenerMateriales();
        const diametro = this.calcularDiametro(datos.caudal, 'succion');

        // Crear tubería principal desde el estanque
        const tuberiaPrincipal = this.crearTuberia(
            puntoEstanque,
            { x: puntoEstanque.x, y: 0.5, z: posicionesBombas[0].z - 2 },
            diametro,
            materiales.tuberiaPVC
        );
        grupo.add(tuberiaPrincipal);

        // Crear derivaciones a cada bomba
        posicionesBombas.forEach((posBomba, index) => {
            const derivacion = this.crearDerivacion(
                { x: puntoEstanque.x, y: 0.5, z: posicionesBombas[0].z - 2 },
                { x: posBomba.x - 0.5, y: 0.3, z: posBomba.z },
                diametro * 0.8,
                materiales.tuberiaPVC
            );
            grupo.add(derivacion);
        });

        return grupo;
    },

    /**
     * Crear tuberías de impulsión (de las bombas al edificio)
     */
    crearTuberiasImpulsion: function(posicionesBombas, puntoSalida, datos) {
        const grupo = new THREE.Group();
        grupo.name = 'TuberiasImpulsion';

        const materiales = MaterialesSala.obtenerMateriales();
        const diametro = this.calcularDiametro(datos.caudal, 'impulsion');

        // Salida de cada bomba hacia colector
        posicionesBombas.forEach((posBomba, index) => {
            const salidaBomba = this.crearTuberia(
                { x: posBomba.x, y: 0.8, z: posBomba.z },
                { x: posBomba.x, y: 2.0, z: posBomba.z },
                diametro * 0.8,
                materiales.tuberiaAcero
            );
            grupo.add(salidaBomba);

            // Conexión horizontal al colector
            const conexionColector = this.crearTuberia(
                { x: posBomba.x, y: 2.0, z: posBomba.z },
                { x: puntoSalida.x, y: 2.0, z: posBomba.z },
                diametro * 0.8,
                materiales.tuberiaAcero
            );
            grupo.add(conexionColector);
        });

        // Colector principal vertical
        const colectorPrincipal = this.crearTuberia(
            { x: puntoSalida.x, y: 2.0, z: posicionesBombas[0].z },
            { x: puntoSalida.x, y: 3.5, z: posicionesBombas[0].z },
            diametro,
            materiales.tuberiaAcero
        );
        grupo.add(colectorPrincipal);

        return grupo;
    },

    /**
     * Crear un segmento de tubería entre dos puntos
     */
    crearTuberia: function(punto1, punto2, diametro, material) {
        const grupo = new THREE.Group();

        // Calcular dirección y longitud
        const direccion = new THREE.Vector3(
            punto2.x - punto1.x,
            punto2.y - punto1.y,
            punto2.z - punto1.z
        );
        const longitud = direccion.length();

        // Crear geometría de cilindro
        const geometria = new THREE.CylinderGeometry(
            diametro / 2,
            diametro / 2,
            longitud,
            16
        );

        const tuberia = new THREE.Mesh(geometria, material);

        // Posicionar en el punto medio
        tuberia.position.set(
            (punto1.x + punto2.x) / 2,
            (punto1.y + punto2.y) / 2,
            (punto1.z + punto2.z) / 2
        );

        // Orientar hacia el punto destino
        const axis = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(axis, direccion.normalize());
        tuberia.setRotationFromQuaternion(quaternion);

        grupo.add(tuberia);

        // Agregar codos en las uniones si hay cambio de dirección
        return tuberia;
    },

    /**
     * Crear derivación con codo
     */
    crearDerivacion: function(inicio, fin, diametro, material) {
        const grupo = new THREE.Group();

        // Punto intermedio para el codo
        const puntoMedio = {
            x: inicio.x,
            y: inicio.y,
            z: fin.z
        };

        // Segmento horizontal
        const segmentoH = this.crearTuberia(inicio, puntoMedio, diametro, material);
        grupo.add(segmentoH);

        // Segmento a la bomba
        const segmentoB = this.crearTuberia(puntoMedio, fin, diametro, material);
        grupo.add(segmentoB);

        // Codo de 90°
        const codo = this.crearCodo(puntoMedio, diametro, material);
        grupo.add(codo);

        return grupo;
    },

    /**
     * Crear codo de 90 grados
     */
    crearCodo: function(posicion, diametro, material) {
        const geometria = new THREE.TorusGeometry(
            diametro,
            diametro / 2,
            8,
            16,
            Math.PI / 2
        );
        const codo = new THREE.Mesh(geometria, material);
        codo.position.set(posicion.x, posicion.y, posicion.z);
        codo.rotation.y = -Math.PI / 2;
        return codo;
    },

    /**
     * Crear soporte de tubería
     */
    crearSoporte: function(posicion, material) {
        const grupo = new THREE.Group();

        // Abrazadera
        const geometriaAbrazadera = new THREE.TorusGeometry(0.08, 0.015, 8, 16);
        const abrazadera = new THREE.Mesh(geometriaAbrazadera, material);
        abrazadera.rotation.z = Math.PI / 2;
        grupo.add(abrazadera);

        // Soporte vertical
        const geometriaSoporte = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
        const soporte = new THREE.Mesh(geometriaSoporte, material);
        soporte.position.y = -0.15;
        grupo.add(soporte);

        grupo.position.set(posicion.x, posicion.y, posicion.z);
        return grupo;
    },

    /**
     * Calcular diámetro de tubería según caudal
     */
    calcularDiametro: function(caudal, tipo) {
        // caudal en L/min
        // Velocidad recomendada: 1-2 m/s

        const velocidad = tipo === 'succion' ? 1.0 : 1.5; // m/s
        const caudalM3s = caudal / 60000; // Convertir a m³/s

        // Fórmula: D = sqrt((4 * Q) / (π * v))
        const diametro = Math.sqrt((4 * caudalM3s) / (Math.PI * velocidad));

        // Redondear a diámetros comerciales y escalar para visualización
        if (diametro < 0.05) return 0.06;
        if (diametro < 0.075) return 0.08;
        if (diametro < 0.1) return 0.10;
        if (diametro < 0.125) return 0.12;
        return 0.15;
    },

    /**
     * Obtener diámetros comerciales disponibles
     */
    diametrosComerciales: [
        { nominal: 1, mm: 25, metros: 0.025 },
        { nominal: 1.25, mm: 32, metros: 0.032 },
        { nominal: 1.5, mm: 40, metros: 0.040 },
        { nominal: 2, mm: 50, metros: 0.050 },
        { nominal: 2.5, mm: 63, metros: 0.063 },
        { nominal: 3, mm: 75, metros: 0.075 },
        { nominal: 4, mm: 100, metros: 0.100 }
    ]
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TuberiasSistema;
}
