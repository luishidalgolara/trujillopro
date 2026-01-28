/**
 * MÓDULO SALA DE BOMBAS - Sistema 3D de visualización
 * Versión: 1.0
 * Fecha: Enero 2025
 * 
 * API Principal para integración con el sistema de estanques
 */

const SalaBombas = {
    // Referencias a objetos 3D creados
    grupoSala: null,
    grupoBombas: null,
    grupoTuberias: null,
    grupoAccesorios: null,
    
    // Estado del módulo
    activo: false,
    datosActuales: null,

    /**
     * Crear sala de bombas completa
     * @param {THREE.Scene} scene - Escena de Three.js donde agregar los objetos
     * @param {Object} datos - Datos de las bombas calculados
     */
    crear: function(scene, datos) {
        console.log('🔧 Creando sala de bombas...', datos);
        
        // Validar datos
        if (!this.validarDatos(datos)) {
            console.error('❌ Datos inválidos para crear sala de bombas');
            return false;
        }

        // Eliminar sala anterior si existe
        if (this.activo) {
            this.eliminar(scene);
        }

        // Guardar datos
        this.datosActuales = datos;

        // Calcular posiciones base
        const posiciones = PosicionamientoSala.calcularPosiciones(datos);

        // Crear grupos principales
        this.grupoSala = new THREE.Group();
        this.grupoSala.name = 'SalaBombas';

        this.grupoBombas = new THREE.Group();
        this.grupoBombas.name = 'Bombas';

        this.grupoTuberias = new THREE.Group();
        this.grupoTuberias.name = 'Tuberias';

        this.grupoAccesorios = new THREE.Group();
        this.grupoAccesorios.name = 'Accesorios';

        // 1. Crear estructura de la sala
        console.log('🏗️ Creando estructura de sala...');
        const estructuraSala = SalaEstructura.crear(posiciones);
        this.grupoSala.add(estructuraSala);

        // 2. Crear bombas
        console.log('⚙️ Creando bombas...');
        for (let i = 0; i < datos.numeroBombas; i++) {
            const bomba = BombaCentrifuga.crear({
                potencia: datos.potencia,
                caudal: datos.caudal,
                presion: datos.presion,
                indice: i,
                posicion: posiciones.bombas[i]
            });
            this.grupoBombas.add(bomba);

            // Crear etiqueta para cada bomba
            const etiqueta = EtiquetasSala.crearEtiquetaBomba({
                numero: i + 1,
                potencia: datos.potencia,
                posicion: {
                    x: posiciones.bombas[i].x,
                    y: posiciones.bombas[i].y + 1.5,
                    z: posiciones.bombas[i].z
                }
            });
            this.grupoAccesorios.add(etiqueta);
        }

        // 3. Crear tuberías de succión (del estanque a las bombas)
        console.log('🔧 Creando tuberías de succión...');
        const tuberiasSuccion = TuberiasSistema.crearTuberiasSuccion(
            posiciones.puntoEstanque,
            posiciones.bombas,
            datos
        );
        this.grupoTuberias.add(tuberiasSuccion);

        // 4. Crear tuberías de impulsión (de las bombas al edificio)
        console.log('🔧 Creando tuberías de impulsión...');
        const tuberiasImpulsion = TuberiasSistema.crearTuberiasImpulsion(
            posiciones.bombas,
            posiciones.puntoSalida,
            datos
        );
        this.grupoTuberias.add(tuberiasImpulsion);

        // 5. Crear válvulas
        console.log('🔩 Creando válvulas...');
        const valvulas = ValvulasSistema.crearValvulas(posiciones.bombas, datos);
        this.grupoAccesorios.add(valvulas);

        // 6. Crear accesorios (manómetros, tablero, etc)
        console.log('📊 Creando accesorios...');
        // ✅ CORRECCIÓN: Cambiar nombre de función y parámetros
        const accesorios = SalaBombasAccesorios.crear(datos, posiciones);
        this.grupoAccesorios.add(accesorios);

        // Agregar todos los grupos a la sala principal
        this.grupoSala.add(this.grupoBombas);
        this.grupoSala.add(this.grupoTuberias);
        this.grupoSala.add(this.grupoAccesorios);

        // Agregar sala a la escena
        scene.add(this.grupoSala);

        this.activo = true;
        console.log('✅ Sala de bombas creada exitosamente');
        return true;
    },

    /**
     * Eliminar sala de bombas de la escena
     * @param {THREE.Scene} scene - Escena de Three.js
     */
    eliminar: function(scene) {
        if (!this.activo || !this.grupoSala) {
            return false;
        }

        console.log('🗑️ Eliminando sala de bombas...');

        // Liberar geometrías y materiales
        this.grupoSala.traverse((objeto) => {
            if (objeto.geometry) {
                objeto.geometry.dispose();
            }
            if (objeto.material) {
                if (Array.isArray(objeto.material)) {
                    objeto.material.forEach(material => {
                        if (material.map) material.map.dispose();
                        material.dispose();
                    });
                } else {
                    if (objeto.material.map) objeto.material.map.dispose();
                    objeto.material.dispose();
                }
            }
        });

        // Remover de la escena
        scene.remove(this.grupoSala);

        // Limpiar referencias
        this.grupoSala = null;
        this.grupoBombas = null;
        this.grupoTuberias = null;
        this.grupoAccesorios = null;
        this.activo = false;
        this.datosActuales = null;

        console.log('✅ Sala de bombas eliminada');
        return true;
    },

    /**
     * Actualizar sala de bombas con nuevos datos
     * @param {THREE.Scene} scene - Escena de Three.js
     * @param {Object} datos - Nuevos datos de bombas
     */
    actualizar: function(scene, datos) {
        this.eliminar(scene);
        return this.crear(scene, datos);
    },

    /**
     * Mostrar/ocultar sala de bombas
     * @param {Boolean} visible - true para mostrar, false para ocultar
     */
    toggleVisibilidad: function(visible) {
        if (this.grupoSala) {
            this.grupoSala.visible = visible;
        }
    },

    /**
     * Validar datos de entrada
     * @param {Object} datos - Datos a validar
     * @returns {Boolean} true si son válidos
     */
    validarDatos: function(datos) {
        if (!datos) {
            console.error('Datos no proporcionados');
            return false;
        }

        if (!datos.numeroBombas || datos.numeroBombas < 1) {
            console.error('Número de bombas inválido');
            return false;
        }

        if (!datos.potencia || datos.potencia <= 0) {
            console.error('Potencia inválida');
            return false;
        }

        if (!datos.posicionEstanque) {
            console.error('Posición del estanque no proporcionada');
            return false;
        }

        return true;
    },

    /**
     * Obtener información del estado actual
     * @returns {Object} Estado de la sala
     */
    getEstado: function() {
        return {
            activo: this.activo,
            numeroBombas: this.datosActuales ? this.datosActuales.numeroBombas : 0,
            datos: this.datosActuales
        };
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SalaBombas;
}