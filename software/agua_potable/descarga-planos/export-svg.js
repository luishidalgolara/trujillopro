/**
 * EXPORT SVG - Exportación a formato SVG vectorial
 * Mantiene calidad profesional para ploteo
 */

const ExportSVG = {
    /**
     * Exporta el plano actual a SVG
     */
    async exportToSVG() {
        try {
            ExportUtils.showStatus('📊 Preparando exportación SVG...', 'info');

            // Clonar SVG
            const svgClone = ExportUtils.cloneSVG();
            if (!svgClone) {
                throw new Error('No se pudo clonar el SVG');
            }

            // Embedear imágenes
            await ExportUtils.embedImages(svgClone);

            // Agregar metadatos
            this.addMetadata(svgClone);

            // Serializar
            const svgString = ExportUtils.serializeSVG(svgClone);

            // Crear blob
            const blob = new Blob([svgString], { 
                type: 'image/svg+xml;charset=utf-8' 
            });

            // Descargar
            const filename = ExportUtils.generateFilename('svg');
            ExportUtils.downloadFile(blob, filename);

            ExportUtils.showStatus('✅ SVG descargado correctamente', 'success');
            
            return true;

        } catch (error) {
            console.error('❌ Error al exportar SVG:', error);
            ExportUtils.showStatus('❌ Error al exportar SVG', 'error');
            return false;
        }
    },

    /**
     * Agrega metadatos al SVG
     */
    addMetadata(svgElement) {
        const info = ExportUtils.getProjectInfo();
        
        // Crear elemento de metadatos
        const metadata = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
        metadata.innerHTML = `
            <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                     xmlns:dc="http://purl.org/dc/elements/1.1/">
                <rdf:Description>
                    <dc:title>Plano Agua Potable ${info.format}</dc:title>
                    <dc:creator>TRUKILLO - Sistema Inteligente de Diseño</dc:creator>
                    <dc:date>${info.date} ${info.time}</dc:date>
                    <dc:format>image/svg+xml</dc:format>
                    <dc:description>Escala ${info.scale} - Formato ${info.format}</dc:description>
                </rdf:Description>
            </rdf:RDF>
        `;

        // Insertar al inicio del SVG
        if (svgElement.firstChild) {
            svgElement.insertBefore(metadata, svgElement.firstChild);
        } else {
            svgElement.appendChild(metadata);
        }
    }
};

// Exportar para uso global
window.ExportSVG = ExportSVG;
