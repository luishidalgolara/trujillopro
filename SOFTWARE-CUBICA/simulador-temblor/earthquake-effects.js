/* EFECTOS VISUALES */

const EarthquakeEffects = {
    originalCameraPos: null,
    sacudidaCamara: true,

    // Inicializar
    init(camera) {
        this.originalCameraPos = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };
    },

    // Sacudir cámara
    aplicarSacudidaCamara(camera, intensidad, tiempo) {
        if (!this.sacudidaCamara) return;

        const config = EarthquakeConfig.intensidades[intensidad];
        const amp = config.movimiento * 0.3;

        const offsetX = Math.sin(tiempo * 5) * amp * 0.5;
        const offsetY = Math.sin(tiempo * 6.5) * amp * 0.3;
        const offsetZ = Math.sin(tiempo * 4.8) * amp * 0.5;

        camera.position.x = this.originalCameraPos.x + offsetX;
        camera.position.y = this.originalCameraPos.y + offsetY;
        camera.position.z = this.originalCameraPos.z + offsetZ;
    },

    // Restaurar cámara
    restaurarCamara(camera) {
        if (this.originalCameraPos) {
            camera.position.x = this.originalCameraPos.x;
            camera.position.y = this.originalCameraPos.y;
            camera.position.z = this.originalCameraPos.z;
        }
    },

    // Toggle sacudida cámara
    toggleSacudidaCamara() {
        this.sacudidaCamara = !this.sacudidaCamara;
        return this.sacudidaCamara;
    }
};

window.EarthquakeEffects = EarthquakeEffects;
