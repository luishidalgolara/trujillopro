/**
 * EXPORT PDF - Exportación a formato PDF profesional
 * Listo para ploteo en impresoras profesionales
 */

const ExportPDF = {
    /**
     * Exporta el plano actual a PDF
     */
    async exportToPDF() {
        try {
            ExportUtils.showStatus('📄 Generando PDF profesional...', 'info');

            // Verificar si jsPDF está disponible
            if (typeof window.jspdf === 'undefined') {
                console.warn('⚠️ jsPDF no disponible, usando método alternativo');
                return await this.exportPDFAlternative();
            }

            const { jsPDF } = window.jspdf;
            const format = ExportUtils.getCurrentFormat();
            
            // Crear documento PDF con dimensiones reales en mm
            const pdf = new jsPDF({
                orientation: format.name === 'A0' ? 'landscape' : 'landscape',
                unit: 'mm',
                format: format.name.toLowerCase(),
                compress: true
            });

            // Clonar y preparar SVG
            const svgClone = ExportUtils.cloneSVG();
            if (!svgClone) {
                throw new Error('No se pudo clonar el SVG');
            }

            await ExportUtils.embedImages(svgClone);

            // Convertir SVG a string
            const svgString = ExportUtils.serializeSVG(svgClone);

            // Intentar usar svg2pdf si está disponible
            if (typeof window.svg2pdf !== 'undefined') {
                const svgElement = this.createSVGElement(svgString);
                await window.svg2pdf(svgElement, pdf, {
                    width: format.width,
                    height: format.height
                });
            } else {
                // Método alternativo: convertir SVG a imagen
                await this.addSVGAsImage(pdf, svgString, format);
            }

            // Agregar metadatos
            const info = ExportUtils.getProjectInfo();
            pdf.setProperties({
                title: `Plano Agua Potable ${info.format}`,
                subject: `Escala ${info.scale}`,
                author: 'TRUKILLO - Sistema Inteligente',
                creator: 'TRUKILLO AGUA POTABLE',
                keywords: `plano, agua potable, ${info.format}, ${info.scale}`
            });

            // Descargar
            const filename = ExportUtils.generateFilename('pdf');
            pdf.save(filename);

            ExportUtils.showStatus('✅ PDF descargado correctamente', 'success');
            return true;

        } catch (error) {
            console.error('❌ Error al exportar PDF:', error);
            ExportUtils.showStatus('❌ Error al exportar PDF', 'error');
            return false;
        }
    },

    /**
     * Método alternativo sin librerías externas
     */
    async exportPDFAlternative() {
        try {
            // Crear canvas de alta resolución
            const format = ExportUtils.getCurrentFormat();
            const canvas = document.createElement('canvas');
            const dpi = 300;
            canvas.width = (format.width / 25.4) * dpi;
            canvas.height = (format.height / 25.4) * dpi;
            
            const ctx = canvas.getContext('2d');
            
            // Fondo blanco
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Obtener SVG
            const svgClone = ExportUtils.cloneSVG();
            await ExportUtils.embedImages(svgClone);
            const svgString = ExportUtils.serializeSVG(svgClone);
            
            // Convertir SVG a imagen
            const img = await this.svgStringToImage(svgString, canvas.width, canvas.height);
            
            // Dibujar en canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Convertir canvas a blob
            const blob = await new Promise(resolve => {
                canvas.toBlob(resolve, 'image/png', 1.0);
            });

            // Descargar como PNG de alta resolución
            const filename = ExportUtils.generateFilename('png');
            ExportUtils.downloadFile(blob, filename);

            ExportUtils.showStatus('✅ Imagen de alta resolución descargada', 'success');
            return true;

        } catch (error) {
            console.error('❌ Error en método alternativo:', error);
            ExportUtils.showStatus('❌ Error al exportar', 'error');
            return false;
        }
    },

    /**
     * Convierte string SVG a imagen
     */
    svgStringToImage(svgString, width, height) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Error al cargar SVG como imagen'));
            };

            img.width = width;
            img.height = height;
            img.src = url;
        });
    },

    /**
     * Crea elemento SVG desde string
     */
    createSVGElement(svgString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        return doc.documentElement;
    },

    /**
     * Agrega SVG como imagen al PDF
     */
    async addSVGAsImage(pdf, svgString, format) {
        const img = await this.svgStringToImage(svgString, format.widthPx, format.heightPx);
        
        const canvas = document.createElement('canvas');
        canvas.width = format.widthPx;
        canvas.height = format.heightPx;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, format.width, format.height);
    }
};

// Exportar para uso global
window.ExportPDF = ExportPDF;
