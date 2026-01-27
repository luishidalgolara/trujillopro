/**
 * EXPORT UTILS - Utilidades para exportación de planos
 * Sistema de descarga de planos profesionales A0/A1
 */

const ExportUtils = {
    /**
     * Obtiene las dimensiones actuales del formato
     */
    getCurrentFormat() {
        const board = document.getElementById('drawingBoard');
        const isA0 = board.classList.contains('format-a0');
        
        return {
            name: isA0 ? 'A0' : 'A1',
            width: isA0 ? 1189 : 841,
            height: isA0 ? 841 : 594,
            widthPx: isA0 ? 4768 : 3370, // 300 DPI
            heightPx: isA0 ? 3370 : 2384
        };
    },

    /**
     * Obtiene la escala actual seleccionada
     */
    getCurrentScale() {
        const activeBtn = document.querySelector('.btn-scale.active');
        if (!activeBtn) return '1:50';
        return activeBtn.textContent.trim();
    },

    /**
     * Clona el SVG con todo su contenido
     */
    cloneSVG() {
        const originalSVG = document.getElementById('plano');
        if (!originalSVG) {
            console.error('❌ No se encontró el SVG del plano');
            return null;
        }

        const clonedSVG = originalSVG.cloneNode(true);
        
        // Asegurar que tenga el viewBox correcto
        const format = this.getCurrentFormat();
        clonedSVG.setAttribute('viewBox', `0 0 ${format.width} ${format.height}`);
        clonedSVG.setAttribute('width', format.width);
        clonedSVG.setAttribute('height', format.height);
        
        return clonedSVG;
    },

    /**
     * Serializa el SVG a string
     */
    serializeSVG(svgElement) {
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgElement);
        
        // Agregar declaración XML y namespaces
        svgString = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + svgString;
        
        return svgString;
    },

    /**
     * Convierte SVG a DataURL
     */
    svgToDataURL(svgElement) {
        const svgString = this.serializeSVG(svgElement);
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        return URL.createObjectURL(blob);
    },

    /**
     * Descarga un archivo
     */
    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    /**
     * Genera nombre de archivo con timestamp
     */
    generateFilename(extension) {
        const format = this.getCurrentFormat();
        const scale = this.getCurrentScale().replace(':', '-');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '').replace('T', '_');
        return `PLANO_AP_${format.name}_${scale}_${timestamp}.${extension}`;
    },

    /**
     * Muestra mensaje de estado
     */
    showStatus(message, type = 'info') {
        const statusDiv = document.getElementById('status');
        if (!statusDiv) return;

        const colors = {
            info: '#3498db',
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12'
        };

        statusDiv.textContent = message;
        statusDiv.style.display = 'block';
        statusDiv.style.background = colors[type] || colors.info;

        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    },

    /**
     * Captura imágenes embebidas en el SVG
     */
    async embedImages(svgElement) {
        const images = svgElement.querySelectorAll('image');
        
        for (let img of images) {
            const href = img.getAttribute('href') || img.getAttribute('xlink:href');
            if (href && !href.startsWith('data:')) {
                try {
                    const response = await fetch(href);
                    const blob = await response.blob();
                    const reader = new FileReader();
                    
                    await new Promise((resolve) => {
                        reader.onloadend = () => {
                            img.setAttribute('href', reader.result);
                            img.setAttribute('xlink:href', reader.result);
                            resolve();
                        };
                        reader.readAsDataURL(blob);
                    });
                } catch (error) {
                    console.warn('⚠️ No se pudo embedear imagen:', href, error);
                }
            }
        }
        
        return svgElement;
    },

    /**
     * Obtiene información del proyecto
     */
    getProjectInfo() {
        return {
            format: this.getCurrentFormat().name,
            scale: this.getCurrentScale(),
            date: new Date().toLocaleDateString('es-CL'),
            time: new Date().toLocaleTimeString('es-CL')
        };
    }
};

// Exportar para uso global
window.ExportUtils = ExportUtils;
