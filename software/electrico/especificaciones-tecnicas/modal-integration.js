// ============================================
// MODAL ESPECIFICACIONES TÉCNICAS - INTEGRACIÓN
// Sistema de apertura/cierre y control del modal EETT
// ============================================

/**
 * Abre el modal de Especificaciones Técnicas (EETT)
 */
function abrirEspecificaciones() {
    console.log('📋 Abriendo Especificaciones Técnicas (EETT)...');
    
    // Verificar si el modal ya existe
    let modal = document.getElementById('modalEETTElectrica');
    
    if (!modal) {
        // Crear el modal dinámicamente
        modal = crearModalEETT();
        document.body.appendChild(modal);
    }
    
    // Mostrar el modal
    modal.classList.add('active');
    
    // Cargar el contenido en el iframe
    const iframe = document.getElementById('iframeEETT');
    const loading = document.getElementById('loadingEETT');
    
    if (iframe && !iframe.src) {
        loading.classList.add('active');
        
        // Ruta relativa al index.html de las EETT
        iframe.src = 'especificaciones-tecnicas/index.html';
        
        // Event listener para cuando cargue
        iframe.onload = function() {
            loading.classList.remove('active');
            console.log('✅ Especificaciones Técnicas cargadas correctamente');
            
            // Notificar al iframe que puede usar sus funciones
            try {
                iframe.contentWindow.postMessage({
                    type: 'EETT_READY',
                    source: 'ELEKTRA'
                }, '*');
            } catch (e) {
                console.log('Info: No se pudo enviar mensaje al iframe');
            }
        };
        
        iframe.onerror = function() {
            loading.classList.remove('active');
            console.error('❌ Error al cargar las Especificaciones Técnicas');
            alert('Error al cargar el documento. Verifica que la carpeta "especificaciones-tecnicas" esté en la ubicación correcta.');
        };
    }
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal de Especificaciones Técnicas
 */
function cerrarEspecificaciones() {
    const modal = document.getElementById('modalEETTElectrica');
    
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
 * Ejecuta la calculadora de presupuesto dentro del iframe
 */
function calcularPresupuestoEETT() {
    const iframe = document.getElementById('iframeEETT');
    
    if (iframe && iframe.contentWindow) {
        try {
            // Intentar ejecutar la función calcularPresupuesto del iframe
            if (typeof iframe.contentWindow.calcularPresupuesto === 'function') {
                iframe.contentWindow.calcularPresupuesto();
                console.log('💰 Calculando presupuesto en EETT...');
                
                // Notificación visual
                mostrarNotificacionEETT('Presupuesto actualizado', 'success');
            } else {
                console.log('ℹ️ La función de cálculo se ejecutará dentro del documento EETT');
                // Enviar mensaje al iframe
                iframe.contentWindow.postMessage({
                    type: 'CALCULATE_BUDGET',
                    source: 'ELEKTRA'
                }, '*');
            }
        } catch (error) {
            console.error('Error al calcular presupuesto:', error);
            alert('Use el botón "💰 Calcular Presupuesto" dentro del documento EETT');
        }
    }
}

/**
 * Imprime el contenido de las EETT
 */
function imprimirEETT() {
    const iframe = document.getElementById('iframeEETT');
    
    if (iframe && iframe.contentWindow) {
        try {
            iframe.contentWindow.print();
            console.log('🖨️ Imprimiendo Especificaciones Técnicas...');
        } catch (error) {
            console.error('Error al imprimir:', error);
            alert('No se pudo imprimir. Por favor, use Ctrl+P dentro del documento.');
        }
    }
}

/**
 * Descarga las EETT como PDF
 */
function descargarEETTPDF() {
    const iframe = document.getElementById('iframeEETT');
    
    if (iframe && iframe.contentWindow) {
        try {
            iframe.contentWindow.print();
            console.log('💾 Para descargar como PDF, seleccione "Guardar como PDF" en el diálogo de impresión');
            
            setTimeout(() => {
                mostrarNotificacionEETT('En el diálogo, selecciona "Guardar como PDF"', 'info');
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
function crearModalEETT() {
    const modalHTML = `
        <div class="modal-eett-electrica" id="modalEETTElectrica">
            <div class="modal-eett-container">
                <!-- Header -->
                <div class="modal-eett-header">
                    <div class="modal-eett-title">
                        ESPECIFICACIONES TÉCNICAS - INSTALACIÓN ELÉCTRICA DOMICILIARIA
                    </div>
                    <div class="modal-eett-buttons">
                        <button class="btn-modal-eett calc" onclick="calcularPresupuestoEETT()" title="Calcular presupuesto automático">
                            💰 Calcular Presupuesto
                        </button>
                        <button class="btn-modal-eett print" onclick="imprimirEETT()" title="Imprimir documento">
                            🖨️ Imprimir
                        </button>
                        <button class="btn-modal-eett download" onclick="descargarEETTPDF()" title="Descargar como PDF">
                            💾 Descargar PDF
                        </button>
                        <button class="btn-modal-eett close" onclick="cerrarEspecificaciones()" title="Cerrar">
                            ✕ Cerrar
                        </button>
                    </div>
                </div>
                
                <!-- Contenido -->
                <div class="modal-eett-content">
                    <!-- Badge de funcionalidad especial -->
                    <div class="modal-eett-feature-badge" id="eettFeatureBadge" style="display: none;">
                        ⚡ Calculadora Activa
                    </div>
                    
                    <!-- Loading -->
                    <div class="modal-eett-loading" id="loadingEETT">
                        <div class="modal-eett-spinner"></div>
                        <div class="modal-eett-loading-text">Cargando Especificaciones Técnicas...</div>
                    </div>
                    
                    <!-- Iframe -->
                    <iframe 
                        id="iframeEETT" 
                        class="modal-eett-iframe"
                        title="Especificaciones Técnicas Eléctricas"
                    ></iframe>
                </div>
                
                <!-- Footer -->
                <div class="modal-eett-footer">
                    <div class="modal-eett-info">
                        <div class="modal-eett-info-item">
                            <span class="modal-eett-info-icon">📋</span>
                            <span>EETT según NCh Elec. 4/2003</span>
                        </div>
                        <div class="modal-eett-info-item">
                            <span class="modal-eett-info-icon">💰</span>
                            <span class="modal-eett-badge">CALCULADORA AUTOMÁTICA</span>
                        </div>
                        <div class="modal-eett-info-item">
                            <span class="modal-eett-info-icon">✅</span>
                            <span>Partidas completas con precios editables</span>
                        </div>
                        <div class="modal-eett-info-item">
                            <span class="modal-eett-info-icon">📊</span>
                            <span>Cronograma Gantt incluido</span>
                        </div>
                    </div>
                    <div style="font-weight: 600; color: #0d47a1;">
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
 * Muestra notificaciones dentro del modal EETT
 */
function mostrarNotificacionEETT(mensaje, tipo = 'info') {
    const colores = {
        'success': '#4caf50',
        'error': '#f44336',
        'warning': '#ff9800',
        'info': '#2196f3'
    };
    
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${colores[tipo]};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideInEETT 0.3s ease-out;
    `;
    notif.textContent = mensaje;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutEETT 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

/**
 * Event listener para cerrar con tecla ESC
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalEETTElectrica');
        if (modal && modal.classList.contains('active')) {
            cerrarEspecificaciones();
        }
    }
});

/**
 * Event listener para cerrar al hacer clic fuera del modal
 */
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modalEETTElectrica');
    if (modal && e.target === modal) {
        cerrarEspecificaciones();
    }
});

/**
 * Listener para mensajes desde el iframe
 */
window.addEventListener('message', function(event) {
    // Verificar origen si es necesario
    if (event.data.type === 'BUDGET_CALCULATED') {
        console.log('✅ Presupuesto calculado en EETT:', event.data.total);
        mostrarNotificacionEETT('Presupuesto actualizado correctamente', 'success');
        
        // Mostrar badge
        const badge = document.getElementById('eettFeatureBadge');
        if (badge) {
            badge.style.display = 'block';
            setTimeout(() => {
                badge.style.display = 'none';
            }, 3000);
        }
    }
});

// Log de inicialización
console.log('✅ Sistema de Modal Especificaciones Técnicas (EETT) cargado correctamente');
