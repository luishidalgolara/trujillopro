/* CONTROLADOR PRINCIPAL */

const EarthquakeController = {
    activo: false,
    pausado: false,
    intensidad: 5.0,
    duracion: 20,
    tiempoInicio: 0,
    tiempoTranscurrido: 0,
    animationFrame: null,
    grupo: null,
    posicionesOriginales: new Map(),

    // Iniciar terremoto
    iniciar(intensidad = 5.0, duracion = 20) {
        if (this.activo) {
            console.warn('Ya hay un terremoto activo');
            return;
        }

        // Validar intensidad
        if (!EarthquakeConfig.intensidades[intensidad]) {
            const intensidadesDisponibles = Object.keys(EarthquakeConfig.intensidades);
            intensidad = parseFloat(intensidadesDisponibles[Math.floor(intensidadesDisponibles.length / 2)]);
        }

        this.intensidad = intensidad;
        this.duracion = duracion;
        this.activo = true;
        this.pausado = false;
        this.tiempoInicio = Date.now();
        this.tiempoTranscurrido = 0;

        // Obtener grupo de edificio
        this.grupo = vista3DState.scene.getObjectByName('edificio');
        if (!this.grupo) {
            console.error('No se encontró el grupo edificio');
            this.activo = false;
            return;
        }

        // Guardar posiciones originales
        this.guardarPosicionesOriginales();

        // Inicializar efectos
        EarthquakeEffects.init(vista3DState.camera);

        // Reset física
        EarthquakePhysics.reset();

        // Inicializar sistemas avanzados
        if (window.EarthquakeWavesAdvanced) {
            EarthquakeWavesAdvanced.reset();
        }
        
        if (window.EarthquakeVisualEffects) {
            EarthquakeVisualEffects.init(vista3DState.renderer);
            EarthquakeVisualEffects.limpiar();
        }

        console.log(`🌊 Terremoto iniciado: ${intensidad} Richter, ${duracion}s`);

        // Iniciar animación
        this.animar();

        // Auto-detener después de la duración
        setTimeout(() => {
            if (this.activo) {
                this.detener();
            }
        }, duracion * 1000);
    },

    // Animar terremoto
    animar() {
        if (!this.activo) return;

        if (!this.pausado) {
            const tiempoActual = (Date.now() - this.tiempoInicio) / 1000;
            this.tiempoTranscurrido = tiempoActual;

            // Usar sistema avanzado de ondas si está disponible
            let movimiento;
            if (window.EarthquakeWavesAdvanced) {
                movimiento = EarthquakeWavesAdvanced.calcularMovimientoTotal(tiempoActual, this.intensidad);
                
                // Generar ondas visuales periódicamente
                if (window.EarthquakeVisualEffects && Math.random() < 0.1) {
                    EarthquakeVisualEffects.agregarOndaSuelo(tiempoActual, this.intensidad);
                }
            } else {
                // Fallback al sistema básico
                const movX = EarthquakePhysics.calcularMovimientoX(tiempoActual, this.intensidad);
                const movY = EarthquakePhysics.calcularMovimientoY(tiempoActual, this.intensidad);
                const movZ = EarthquakePhysics.calcularMovimientoZ(tiempoActual, this.intensidad);
                const rotX = EarthquakePhysics.calcularRotacion(tiempoActual, this.intensidad, 'x');
                const rotY = EarthquakePhysics.calcularRotacion(tiempoActual, this.intensidad, 'y');
                const rotZ = EarthquakePhysics.calcularRotacion(tiempoActual, this.intensidad, 'z');
                
                movimiento = { x: movX, y: movY, z: movZ, rotX, rotY, rotZ };
            }

            // Aplicar a cada elemento del grupo
            this.grupo.children.forEach(mesh => {
                const posOriginal = this.posicionesOriginales.get(mesh.uuid);
                if (!posOriginal) return;

                // Calcular altura relativa (0 a 1)
                const alturaRelativa = posOriginal.y / 50; // Normalizar

                // Aplicar movimientos con amplificación por altura
                mesh.position.x = posOriginal.x + EarthquakePhysics.aplicarAmplificacion(movimiento.x, alturaRelativa);
                mesh.position.y = posOriginal.y + EarthquakePhysics.aplicarAmplificacion(movimiento.y, alturaRelativa);
                mesh.position.z = posOriginal.z + EarthquakePhysics.aplicarAmplificacion(movimiento.z, alturaRelativa);

                // Aplicar rotaciones base
                mesh.rotation.x = posOriginal.rx + movimiento.rotX * alturaRelativa;
                mesh.rotation.y = posOriginal.ry + movimiento.rotY * alturaRelativa;
                mesh.rotation.z = posOriginal.rz + movimiento.rotZ * alturaRelativa;

                // Aplicar efectos estructurales avanzados
                if (window.EarthquakeStructuralFX) {
                    EarthquakeStructuralFX.aplicarEfectosEstructurales(
                        mesh, 
                        posOriginal, 
                        tiempoActual, 
                        this.intensidad, 
                        this.duracion
                    );
                }

                // Generar grietas ocasionalmente
                if (window.EarthquakeVisualEffects && Math.random() < 0.001) {
                    EarthquakeVisualEffects.generarGrieta(mesh, this.intensidad);
                }
            });

            // Efectos de cámara
            EarthquakeEffects.aplicarSacudidaCamara(vista3DState.camera, this.intensidad, tiempoActual);

            // Actualizar efectos visuales
            if (window.EarthquakeVisualEffects) {
                EarthquakeVisualEffects.update(
                    0.016, // ~60fps
                    vista3DState.camera, 
                    this.grupo, 
                    this.intensidad
                );
            }

            // Actualizar UI
            if (window.EarthquakeUI && window.EarthquakeUI.actualizarProgreso) {
                const progreso = (this.tiempoTranscurrido / this.duracion) * 100;
                window.EarthquakeUI.actualizarProgreso(progreso);
            }
        }

        this.animationFrame = requestAnimationFrame(() => this.animar());
    },

    // Pausar
    pausar() {
        this.pausado = !this.pausado;
        console.log(this.pausado ? '⏸️ Pausado' : '▶️ Reanudado');
        return this.pausado;
    },

    // Detener
    detener() {
        if (!this.activo) return;

        this.activo = false;
        this.pausado = false;

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        // Restaurar posiciones
        this.restaurarPosiciones();

        // Restaurar cámara
        EarthquakeEffects.restaurarCamara(vista3DState.camera);

        // Limpiar efectos visuales
        if (window.EarthquakeVisualEffects) {
            EarthquakeVisualEffects.limpiar();
        }

        console.log('✅ Terremoto detenido');

        // Actualizar UI
        if (window.EarthquakeUI && window.EarthquakeUI.resetearUI) {
            window.EarthquakeUI.resetearUI();
        }
    },

    // Guardar posiciones originales
    guardarPosicionesOriginales() {
        this.posicionesOriginales.clear();
        this.grupo.children.forEach(mesh => {
            this.posicionesOriginales.set(mesh.uuid, {
                x: mesh.position.x,
                y: mesh.position.y,
                z: mesh.position.z,
                rx: mesh.rotation.x,
                ry: mesh.rotation.y,
                rz: mesh.rotation.z
            });
        });
    },

    // Restaurar posiciones
    restaurarPosiciones() {
        if (!this.grupo) return;
        this.grupo.children.forEach(mesh => {
            const posOriginal = this.posicionesOriginales.get(mesh.uuid);
            if (posOriginal) {
                mesh.position.set(posOriginal.x, posOriginal.y, posOriginal.z);
                mesh.rotation.set(posOriginal.rx, posOriginal.ry, posOriginal.rz);
            }
        });
    },

    // Cambiar intensidad en tiempo real
    cambiarIntensidad(nuevaIntensidad) {
        if (this.activo) {
            this.intensidad = nuevaIntensidad;
            console.log(`📊 Intensidad cambiada a ${nuevaIntensidad}`);
        }
    }
};

window.EarthquakeController = EarthquakeController;
