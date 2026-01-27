// ============================================================
// EXPORTADOR PDF - MOTOR PRINCIPAL (REPARADO)
// Sistema de exportación de planos eléctricos de máxima calidad
// ✅ VERSIÓN REPARADA - Captura elementos reales del plano
// ============================================================

/**
 * Motor principal de exportación
 * Maneja la captura, procesamiento y generación del PDF
 */

class ExportadorPDF {
    constructor() {
        this.config = null;
        this.elementosCapturados = {};
        this.pdfGenerado = null;
    }
    
    /**
     * Inicializar exportador
     */
    async inicializar() {
        console.log('🚀 Inicializando exportador PDF...');
        
        // Cargar configuración
        this.config = obtenerConfiguracionPDF();
        
        // Verificar librerías necesarias
        if (typeof jspdf === 'undefined') {
            console.error('❌ jsPDF no está cargado');
            return false;
        }
        
        console.log('✅ Exportador inicializado');
        return true;
    }
    
    /**
     * Exportar plano completo a PDF
     */
    async exportarPlano(opciones = {}) {
        try {
            console.log('📄 Iniciando exportación a PDF...');
            
            // 1. Preparar configuración
            const config = { ...this.config, ...opciones };
            
            // 2. Capturar elementos
            await this.capturarElementos(config);
            
            // 3. Crear PDF
            const pdf = await this.crearPDF(config);
            
            // 4. Descargar
            await this.descargarPDF(pdf, config);
            
            console.log('✅ Exportación completada');
            return true;
            
        } catch (error) {
            console.error('❌ Error en exportación:', error);
            this.mostrarError(error);
            return false;
        }
    }
    
    /**
     * ✅ FUNCIÓN REPARADA V4 - ESTRATEGIA SIMPLIFICADA
     * Captura TODO el SVG con foreignObjects incluidos
     */
    async capturarElementos(config) {
        console.log('📸 Capturando elementos del plano...');
        
        // ========================================
        // ESTRATEGIA SIMPLIFICADA:
        // Capturar el SVG completo con TODOS los elementos ya integrados
        // Esto incluye: plano, símbolos, trazado, viñeta, cuadro, unifilar, simbología
        // ========================================
        
        console.log('🎯 Usando estrategia de captura completa del SVG...');
        
        // Capturar SVG completo (incluye TODO)
        this.elementosCapturados.planoCompleto = await this.capturarSVGCompleto('plano');
        
        if (this.elementosCapturados.planoCompleto) {
            console.log('✅ Plano completo capturado con todos los elementos integrados');
            console.log('   - Incluye: símbolos, trazado, foreignObjects (viñeta, cuadro, etc)');
        } else {
            console.error('❌ Error capturando plano completo');
        }
        
        console.log('📦 Elementos capturados:', Object.keys(this.elementosCapturados));
    }
    
    /**
     * ✅ FUNCIÓN MEJORADA - Capturar SVG completo con todos sus elementos
     */
    async capturarSVGCompleto(idElemento) {
        const svg = document.getElementById(idElemento);
        if (!svg) {
            console.warn(`⚠️ SVG "${idElemento}" no encontrado`);
            return null;
        }
        
        // Clonar SVG para no modificar el original
        const svgClone = svg.cloneNode(true);
        
        // Remover elementos que no deben exportarse
        const elementosExcluir = svgClone.querySelectorAll('.no-export, [data-no-export]');
        elementosExcluir.forEach(el => el.remove());
        
        // Obtener dimensiones reales
        const viewBox = svg.getAttribute('viewBox');
        let bbox;
        
        if (viewBox) {
            const [x, y, width, height] = viewBox.split(' ').map(Number);
            bbox = { x, y, width, height };
        } else {
            bbox = svg.getBBox();
        }
        
        // Configurar para exportación
        svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgClone.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
        svgClone.setAttribute('width', bbox.width);
        svgClone.setAttribute('height', bbox.height);
        
        // Asegurar que todos los estilos estén inline
        this.aplicarEstilosInline(svgClone);
        
        // Convertir a string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgClone);
        
        // Convertir a data URL de alta calidad
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        return {
            tipo: 'svg',
            url: svgUrl,
            ancho: bbox.width,
            alto: bbox.height,
            viewBox: `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`,
            data: svgString
        };
    }
    
    /**
     * ✅ NUEVA FUNCIÓN - Aplicar estilos inline al SVG
     */
    aplicarEstilosInline(svgElement) {
        // Obtener todos los elementos con estilo
        const elementos = svgElement.querySelectorAll('*');
        
        elementos.forEach(elemento => {
            // Copiar estilos computados
            if (elemento.style) {
                const estilosComputados = window.getComputedStyle(elemento);
                
                // Propiedades importantes para exportación
                const propiedades = [
                    'fill', 'stroke', 'stroke-width', 'stroke-dasharray',
                    'opacity', 'font-family', 'font-size', 'font-weight',
                    'text-anchor', 'dominant-baseline'
                ];
                
                propiedades.forEach(prop => {
                    const valor = estilosComputados.getPropertyValue(prop);
                    if (valor && valor !== 'none') {
                        elemento.style[prop] = valor;
                    }
                });
            }
        });
    }
    
    /**
     * ✅ FUNCIÓN MEJORADA - Capturar elemento HTML con html2canvas
     * Maneja elementos con position: absolute y escalas personalizadas
     */
    async capturarElementoHTML(elemento) {
        if (!elemento) return null;
        
        try {
            // Obtener escala personalizada si existe
            const escalaPersonalizada = parseFloat(elemento.getAttribute('data-escala')) || 1;
            
            // Configuración de alta calidad
            const opciones = {
                scale: this.config.calidad.escala * escalaPersonalizada,
                useCORS: true,
                allowTaint: false,
                backgroundColor: null, // Transparente para mantener fondo
                logging: false,
                width: elemento.offsetWidth,
                height: elemento.offsetHeight,
                windowWidth: elemento.offsetWidth,
                windowHeight: elemento.offsetHeight
            };
            
            console.log(`📸 Capturando elemento: ${elemento.className}`, {
                ancho: elemento.offsetWidth,
                alto: elemento.offsetHeight,
                escala: opciones.scale
            });
            
            const canvas = await html2canvas(elemento, opciones);
            
            return {
                tipo: 'html',
                canvas: canvas,
                ancho: canvas.width,
                alto: canvas.height,
                dataUrl: canvas.toDataURL('image/png', 1.0),
                escalaOriginal: escalaPersonalizada
            };
            
        } catch (error) {
            console.error('❌ Error capturando elemento HTML:', error);
            console.error('Elemento problemático:', elemento);
            return null;
        }
    }
    
    /**
     * Crear documento PDF
     */
    async crearPDF(config) {
        console.log('📝 Creando documento PDF...');
        
        const { jsPDF } = window.jspdf;
        
        // Obtener dimensiones de página
        const dim = obtenerDimensionesPixelsPDF();
        const formato = config.pagina.formato;
        const orientacion = config.pagina.orientacion;
        
        // Crear documento
        const pdf = new jsPDF({
            orientation: orientacion,
            unit: 'mm',
            format: formato.toLowerCase(),
            compress: config.calidad.compresion !== 'ninguna',
            precision: 16,
            userUnit: 1.0
        });
        
        // Agregar metadatos
        if (config.avanzado.metadatos) {
            const meta = config.avanzado.metadatos;
            pdf.setProperties({
                title: meta.titulo,
                subject: meta.asunto,
                author: meta.autor,
                keywords: meta.palabrasClave,
                creator: meta.creador
            });
        }
        
        // Agregar plano base (incluye símbolos y trazado)
        await this.agregarPlanoBase(pdf, config);
        
        // Agregar elementos adicionales (viñeta, cuadro, etc)
        await this.agregarElementosAdicionales(pdf, config);
        
        this.pdfGenerado = pdf;
        return pdf;
    }
    
    /**
     * ✅ FUNCIÓN SIMPLIFICADA - Agregar plano completo al PDF
     */
    async agregarPlanoBase(pdf, config) {
        const planoCompleto = this.elementosCapturados.planoCompleto;
        if (!planoCompleto) {
            console.warn('⚠️ No hay plano completo para exportar');
            return;
        }
        
        const dim = config.pagina.dimensiones[config.pagina.formato];
        const margenes = config.pagina.margenes;
        
        // Área disponible
        const anchoDisponible = dim.ancho - margenes.izquierdo - margenes.derecho;
        const altoDisponible = dim.alto - margenes.superior - margenes.inferior;
        
        console.log('📐 Renderizando SVG completo a imagen de alta calidad...');
        
        // Si es SVG, convertir a imagen de alta calidad
        if (planoCompleto.tipo === 'svg') {
            const img = await this.svgAImagen(planoCompleto.data, {
                ancho: anchoDisponible,
                alto: altoDisponible,
                escala: config.calidad.escala
            });
            
            // Calcular dimensiones manteniendo proporción
            const ratioPlano = planoCompleto.ancho / planoCompleto.alto;
            const ratioPagina = anchoDisponible / altoDisponible;
            
            let anchoFinal, altoFinal;
            
            if (ratioPlano > ratioPagina) {
                // El plano es más ancho proporcionalmente
                anchoFinal = anchoDisponible;
                altoFinal = anchoDisponible / ratioPlano;
            } else {
                // El plano es más alto proporcionalmente
                altoFinal = altoDisponible;
                anchoFinal = altoDisponible * ratioPlano;
            }
            
            // Centrar en la página
            const x = margenes.izquierdo + (anchoDisponible - anchoFinal) / 2;
            const y = margenes.superior + (altoDisponible - altoFinal) / 2;
            
            pdf.addImage(
                img,
                'PNG',
                x,
                y,
                anchoFinal,
                altoFinal,
                undefined,
                'FAST'
            );
            
            console.log(`✅ Plano completo agregado al PDF (${anchoFinal.toFixed(1)}x${altoFinal.toFixed(1)}mm)`);
            console.log('   ✅ Incluye: símbolos, trazado, viñeta, cuadro de cargas, unifilar, simbología');
        }
    }
    
    /**
     * ✅ FUNCIÓN SIMPLIFICADA - Ya no necesita agregar elementos adicionales
     * porque ya están en el SVG completo
     */
    async agregarElementosAdicionales(pdf, config) {
        console.log('ℹ️ Todos los elementos ya están incluidos en el plano completo');
        // No hacer nada - todo ya está en el SVG completo
    }
    
    /**
     * Convertir SVG a imagen de alta calidad
     */
    async svgAImagen(svgData, opciones) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Configurar canvas con alta resolución
            canvas.width = opciones.ancho * opciones.escala;
            canvas.height = opciones.alto * opciones.escala;
            
            img.onload = () => {
                // Dibujar con suavizado
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // Convertir a data URL
                resolve(canvas.toDataURL('image/png', 1.0));
                URL.revokeObjectURL(img.src);
            };
            
            img.onerror = reject;
            
            // Crear blob y URL
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            img.src = URL.createObjectURL(svgBlob);
        });
    }
    
    /**
     * Descargar PDF generado
     */
    async descargarPDF(pdf, config) {
        const fecha = new Date().toISOString().split('T')[0];
        const nombreArchivo = `Plano_Electrico_${fecha}.pdf`;
        
        console.log(`💾 Descargando: ${nombreArchivo}`);
        pdf.save(nombreArchivo);
    }
    
    /**
     * Mostrar mensaje de error
     */
    mostrarError(error) {
        const mensaje = `
            Error al exportar PDF:
            ${error.message}
            
            Verifica que todos los elementos estén correctamente cargados.
        `;
        alert(mensaje);
    }
}

// Crear instancia global
window.exportadorPDF = new ExportadorPDF();

// Función simplificada para el botón
async function exportarPlanoAPDF() {
    const exportador = window.exportadorPDF;
    
    // Inicializar si es necesario
    if (!exportador.config) {
        await exportador.inicializar();
    }
    
    // Exportar
    await exportador.exportarPlano();
}

// Exportar funciones
window.exportarPlanoAPDF = exportarPlanoAPDF;

console.log('📄 Motor de exportación PDF cargado (VERSIÓN REPARADA ✅)');
console.log('💡 Usa: exportarPlanoAPDF() para exportar');
console.log('🎯 Ahora captura: Viñeta, Cuadro Cargas, Tablero, Simbología, Trazado, Símbolos');