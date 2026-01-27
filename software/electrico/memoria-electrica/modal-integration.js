// ============================================
// MODAL MEMORIA ELÉCTRICA - INTEGRACIÓN
// Sistema de apertura/cierre y control del modal
// ============================================

/**
 * Abre el modal de Memoria Técnica Eléctrica
 */
function abrirMemoriaCalculo() {
    console.log('📄 Abriendo Memoria Técnica Eléctrica...');
    
    // Verificar si el modal ya existe
    let modal = document.getElementById('modalMemoriaElectrica');
    
    if (!modal) {
        // Crear el modal dinámicamente
        modal = crearModalMemoria();
        document.body.appendChild(modal);
    }
    
    // Mostrar el modal
    modal.classList.add('active');
    
    // Cargar el contenido en el iframe
    const iframe = document.getElementById('iframeMemoria');
    const loading = document.getElementById('loadingMemoria');
    
    if (iframe && !iframe.src) {
        loading.classList.add('active');
        
        // Ruta relativa al index.html de la memoria
        iframe.src = 'memoria-electrica/index.html';
        
        // Event listener para cuando cargue
        iframe.onload = function() {
            loading.classList.remove('active');
            console.log('✅ Memoria Técnica cargada correctamente');
        };
        
        iframe.onerror = function() {
            loading.classList.remove('active');
            console.error('❌ Error al cargar la Memoria Técnica');
            alert('Error al cargar el documento. Verifica que la carpeta "memoria-electrica" esté en la ubicación correcta.');
        };
    }
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal de Memoria Técnica
 */
function cerrarMemoriaCalculo() {
    const modal = document.getElementById('modalMemoriaElectrica');
    
    if (modal) {
        // Animación de cierre
        modal.classList.add('closing');
        
        setTimeout(() => {
            modal.classList.remove('active', 'closing');
            // Restaurar scroll del body
            document.body.style.overflow = '';
        }, 300);
    }
}

/**
 * Imprime el contenido de la Memoria Técnica
 */
function imprimirMemoria() {
    const iframe = document.getElementById('iframeMemoria');
    
    if (iframe && iframe.contentWindow) {
        try {
            iframe.contentWindow.print();
            console.log('🖨️ Imprimiendo Memoria Técnica...');
        } catch (error) {
            console.error('Error al imprimir:', error);
            alert('No se pudo imprimir. Por favor, use Ctrl+P dentro del documento.');
        }
    }
}

/**
 * Descarga la Memoria Técnica como PDF
 */
function descargarMemoriaPDF() {
    const iframe = document.getElementById('iframeMemoria');
    
    if (iframe && iframe.contentWindow) {
        try {
            // Intentar usar la función de impresión para "Guardar como PDF"
            iframe.contentWindow.print();
            console.log('💾 Para descargar como PDF, seleccione "Guardar como PDF" en el diálogo de impresión');
            
            // Mostrar instrucción al usuario
            setTimeout(() => {
                alert('💡 En el diálogo de impresión, selecciona "Guardar como PDF" como destino.');
            }, 500);
        } catch (error) {
            console.error('Error:', error);
            alert('Use Ctrl+P y seleccione "Guardar como PDF"');
        }
    }
}

/**
 * Crea el HTML del modal dinámicamente
 */
function crearModalMemoria() {
    const modalHTML = `
        <div class="modal-memoria-electrica" id="modalMemoriaElectrica">
            <div class="modal-memoria-container">
                <!-- Header -->
                <div class="modal-memoria-header">
                    <div class="modal-memoria-title">
                        MEMORIA TÉCNICA DE INSTALACIÓN ELÉCTRICA DOMICILIARIA
                    </div>
                    <div class="modal-memoria-buttons">
                        <button class="btn-modal-memoria print" onclick="imprimirMemoria()" title="Imprimir documento">
                            🖨️ Imprimir
                        </button>
                        <button class="btn-modal-memoria download" onclick="descargarMemoriaPDF()" title="Descargar como PDF">
                            💾 Descargar PDF
                        </button>
                        <button class="btn-modal-memoria close" onclick="cerrarMemoriaCalculo()" title="Cerrar">
                            ✕ Cerrar
                        </button>
                    </div>
                </div>
                
                <!-- Contenido -->
                <div class="modal-memoria-content">
                    <!-- Loading -->
                    <div class="modal-memoria-loading" id="loadingMemoria">
                        <div class="modal-memoria-spinner"></div>
                        <div class="modal-memoria-loading-text">Cargando Memoria Técnica...</div>
                    </div>
                    
                    <!-- Iframe -->
                    <iframe 
                        id="iframeMemoria" 
                        class="modal-memoria-iframe"
                        title="Memoria Técnica Eléctrica"
                    ></iframe>
                </div>
                
                <!-- Footer -->
                <div class="modal-memoria-footer">
                    <div class="modal-memoria-info">
                        <div class="modal-memoria-info-item">
                            <span class="modal-memoria-info-icon">📄</span>
                            <span>Documento oficial según NCh Elec. 4/2003</span>
                        </div>
                        <div class="modal-memoria-info-item">
                            <span class="modal-memoria-info-icon">✅</span>
                            <span>Formato carta profesional</span>
                        </div>
                        <div class="modal-memoria-info-item">
                            <span class="modal-memoria-info-icon">🔒</span>
                            <span>Campos editables marcados en amarillo</span>
                        </div>
                    </div>
                    <div style="font-weight: 600; color: #1a237e;">
                        ELEKTRA - Diseño Eléctrico Profesional
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = modalHTML;
    return tempDiv.firstElementChild;
}

/**
 * Event listener para cerrar con tecla ESC
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalMemoriaElectrica');
        if (modal && modal.classList.contains('active')) {
            cerrarMemoriaCalculo();
        }
    }
});

/**
 * Event listener para cerrar al hacer clic fuera del modal
 */
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modalMemoriaElectrica');
    if (modal && e.target === modal) {
        cerrarMemoriaCalculo();
    }
});

// Log de inicialización
console.log('✅ Sistema de Modal Memoria Eléctrica cargado correctamente');
