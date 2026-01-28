/**
 * ETIQUETAS SALA - Sprites y textos 3D
 * Crea etiquetas informativas para bombas y elementos
 */

const EtiquetasSala = {
    /**
     * Crear etiqueta para bomba
     */
    crearEtiquetaBomba: function(config) {
        const texto = `BOMBA #${config.numero}\n${config.potencia} HP`;
        return this.crearSprite(texto, config.posicion, 1.0, 0x0066CC);
    },

    /**
     * Crear sprite de texto
     */
    crearSprite: function(texto, posicion, escala, colorFondo) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 256;

        // Fondo
        context.fillStyle = `#${colorFondo.toString(16).padStart(6, '0')}`;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Borde
        context.strokeStyle = 'white';
        context.lineWidth = 8;
        context.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

        // Texto
        context.font = 'Bold 48px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Dividir texto por líneas
        const lineas = texto.split('\n');
        const alturaLinea = 60;
        const inicioY = (canvas.height - (lineas.length - 1) * alturaLinea) / 2;

        lineas.forEach((linea, index) => {
            context.fillText(linea, canvas.width / 2, inicioY + index * alturaLinea);
        });

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        
        sprite.scale.set(escala, escala / 2, 1);
        sprite.position.set(posicion.x, posicion.y, posicion.z);

        return sprite;
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EtiquetasSala;
}
