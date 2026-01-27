/**
 * EXPORT CORE - Sistema principal de exportación de planos
 * Coordina la exportación en múltiples formatos
 */

const ExportCore = {
    /**
     * Inicializa el sistema de exportación
     */
    init() {
        console.log('✅ Sistema de exportación inicializado');
        this.setupEventListeners();
    },

    /**
     * Configura listeners de eventos
     */
    setupEventListeners() {
        // El botón ya existe en el HTML, solo asignamos la función
        if (window.appActions) {
            window.appActions.exportResults = () => this.showExportDialog();
        }
    },

    /**
     * Muestra diálogo de selección de formato
     */
    showExportDialog() {
        const dialog = this.createExportDialog();
        document.body.appendChild(dialog);
        
        // Animación de entrada
        setTimeout(() => dialog.classList.add('visible'), 10);
    },

    /**
     * Crea el diálogo de exportación
     */
    createExportDialog() {
        const overlay = document.createElement('div');
        overlay.className = 'export-dialog-overlay';
        overlay.innerHTML = `
            <div class="export-dialog">
                <div class="export-dialog-header">
                    <h3>📥 Exportar Plano</h3>
                    <button class="export-close-btn" onclick="ExportCore.closeDialog()">✕</button>
                </div>
                
                <div class="export-dialog-body">
                    <div class="export-info">
                        <div class="export-info-item">
                            <span class="export-label">Formato:</span>
                            <span class="export-value">${ExportUtils.getCurrentFormat().name}</span>
                        </div>
                        <div class="export-info-item">
                            <span class="export-label">Escala:</span>
                            <span class="export-value">${ExportUtils.getCurrentScale()}</span>
                        </div>
                        <div class="export-info-item">
                            <span class="export-label">Dimensiones:</span>
                            <span class="export-value">${ExportUtils.getCurrentFormat().width} × ${ExportUtils.getCurrentFormat().height} mm</span>
                        </div>
                    </div>

                    <div class="export-options">
                        <h4>Selecciona el formato de descarga:</h4>
                        
                        <button class="export-option-btn" onclick="ExportCore.export('svg')">
                            <div class="export-option-icon">📊</div>
                            <div class="export-option-content">
                                <div class="export-option-title">SVG Vectorial</div>
                                <div class="export-option-desc">Calidad infinita, editable, ideal para ploteo</div>
                            </div>
                        </button>

                        <button class="export-option-btn" onclick="ExportCore.export('pdf')">
                            <div class="export-option-icon">📄</div>
                            <div class="export-option-content">
                                <div class="export-option-title">PDF Profesional</div>
                                <div class="export-option-desc">Listo para imprimir, alta resolución</div>
                            </div>
                        </button>

                        <button class="export-option-btn" onclick="ExportCore.export('png')">
                            <div class="export-option-icon">🖼️</div>
                            <div class="export-option-content">
                                <div class="export-option-title">PNG Alta Resolución</div>
                                <div class="export-option-desc">300 DPI, compatible con cualquier software</div>
                            </div>
                        </button>

                        <button class="export-option-btn export-all" onclick="ExportCore.export('all')">
                            <div class="export-option-icon">📦</div>
                            <div class="export-option-content">
                                <div class="export-option-title">Todos los Formatos</div>
                                <div class="export-option-desc">Descarga SVG, PDF y PNG simultáneamente</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Cerrar al hacer clic fuera
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeDialog();
            }
        });

        return overlay;
    },

    /**
     * Cierra el diálogo
     */
    closeDialog() {
        const dialog = document.querySelector('.export-dialog-overlay');
        if (dialog) {
            dialog.classList.remove('visible');
            setTimeout(() => dialog.remove(), 300);
        }
    },

    /**
     * Exporta en el formato seleccionado
     */
    async export(format) {
        this.closeDialog();

        switch (format) {
            case 'svg':
                await ExportSVG.exportToSVG();
                break;
            
            case 'pdf':
                await ExportPDF.exportToPDF();
                break;
            
            case 'png':
                await ExportPDF.exportPDFAlternative();
                break;
            
            case 'all':
                await this.exportAll();
                break;
            
            default:
                ExportUtils.showStatus('❌ Formato no válido', 'error');
        }
    },

    /**
     * Exporta en todos los formatos
     */
    async exportAll() {
        ExportUtils.showStatus('📦 Exportando en todos los formatos...', 'info');
        
        const results = [];
        
        // SVG
        const svgResult = await ExportSVG.exportToSVG();
        results.push(svgResult);
        await this.delay(500);
        
        // PDF
        const pdfResult = await ExportPDF.exportToPDF();
        results.push(pdfResult);
        await this.delay(500);
        
        // PNG
        const pngResult = await ExportPDF.exportPDFAlternative();
        results.push(pngResult);

        const allSuccess = results.every(r => r === true);
        
        if (allSuccess) {
            ExportUtils.showStatus('✅ Todos los formatos descargados', 'success');
        } else {
            ExportUtils.showStatus('⚠️ Algunos formatos fallaron', 'warning');
        }
    },

    /**
     * Delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Valida que el plano tenga contenido
     */
    validatePlano() {
        const svg = document.getElementById('plano');
        if (!svg) return false;
        
        const elements = svg.querySelectorAll('circle, rect, path, line, text, image, polyline, polygon');
        return elements.length > 0;
    }
};

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ExportCore.init());
} else {
    ExportCore.init();
}

// Exportar para uso global
window.ExportCore = ExportCore;
