// AnimationController.js - Gestión de animaciones y efectos visuales
class AnimationController {
    constructor(pavementBuilder) {
        this.pavementBuilder = pavementBuilder;
        this.isExplotado = false;
    }

    explotar() {
        this.isExplotado = !this.isExplotado;
        const capas = this.pavementBuilder.getCapas();
        const lineasAmarillas = this.pavementBuilder.getLineasAmarillas();
        
        if (this.isExplotado) {
            console.log('💥 Explotando capas...');
            const separacion = 1.2;
            
            // Separar capas hacia ARRIBA manteniendo el orden visual
            // Después del reverse(): índice 0 = Subrasante (abajo), índice 3 = Carpeta (arriba)
            // Por tanto: índice MAYOR debe subir MÁS
            capas.forEach((capa, index) => {
                const targetY = capa.originalY + (index * separacion);
                this.animateCapaPosition(capa.mesh, targetY, 1000);
            });
            
            // Mover líneas amarillas con la capa superior (índice más alto = capas.length - 1)
            if (lineasAmarillas.length > 0 && capas.length > 0) {
                const desplazamiento = ((capas.length - 1) * separacion);
                
                lineasAmarillas.forEach(linea => {
                    const currentY = linea.position.y;
                    const targetY = currentY + desplazamiento;
                    this.animateCapaPosition(linea, targetY, 1000);
                });
            }
        } else {
            console.log('🔄 Contrayendo capas...');
            
            // Volver capas a posición original
            capas.forEach((capa) => {
                this.animateCapaPosition(capa.mesh, capa.originalY, 1000);
            });
            
            // Volver líneas a posición original
            if (capas.length > 0) {
                // Buscar la capa más alta
                let topCapa = capas[0];
                let maxY = topCapa.originalY;
                
                capas.forEach(capa => {
                    if (capa.originalY > maxY) {
                        maxY = capa.originalY;
                        topCapa = capa;
                    }
                });
                
                const yPosition = topCapa.originalY + (topCapa.altura / 2) + 0.015;
                
                lineasAmarillas.forEach(linea => {
                    this.animateCapaPosition(linea, yPosition, 1000);
                });
            }
        }
        
        return this.isExplotado;
    }

    animateCapaPosition(mesh, targetY, duration) {
        const startY = mesh.position.y;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = this.easeInOutCubic(progress);
            
            mesh.position.y = startY + (targetY - startY) * easeProgress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    getIsExplotado() {
        return this.isExplotado;
    }

    reset() {
        if (this.isExplotado) {
            this.explotar(); // Contraer si está explotado
        }
    }
}