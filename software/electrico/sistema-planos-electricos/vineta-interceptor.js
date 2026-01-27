/**
 * INTERCEPTOR DE VIÑETA ELÉCTRICA
 * Aísla los datos de la viñeta por plano para que cada uno sea independiente
 */

const VinetaInterceptor = {
    
    // ========================================
    // GUARDAR DATOS DE VIÑETA EN PLANO ACTUAL
    // ========================================
    guardarDatosVinetaEnPlano() {
        const planoActual = window.PlanoElectricoManager?.getPlanoActivo();
        if (!planoActual) return;
        
        // Buscar el iframe de la viñeta
        const vinetaWindow = document.getElementById('vinetaWindow');
        if (!vinetaWindow) {
            // No hay viñeta abierta, marcar como no integrada
            planoActual.vineta.integrada = false;
            return;
        }
        
        const iframe = vinetaWindow.querySelector('iframe');
        if (!iframe || !iframe.contentWindow) return;
        
        try {
            const iframeDoc = iframe.contentWindow.document;
            
            // Lista de campos de la viñeta
            const campos = [
                'nombreProyecto', 'nombreProyectista', 'ubicacion1', 'rol',
                'contenido1', 'contenido2', 'contenido3', 'contenido4',
                'acotaciones', 'fecha', 'arquitecto', 'propietario', 'rutPropietario',
                'firmaArquitecto', 'numeroActual', 'numeroTotal', 'totalPlanos', 'totalFinal'
            ];
            
            // Extraer valores de todos los campos
            const datosVineta = {};
            campos.forEach(campo => {
                const elemento = iframeDoc.getElementById(campo);
                if (elemento) {
                    datosVineta[campo] = elemento.textContent || '';
                }
            });
            
            // Guardar en el plano actual
            planoActual.vineta = {
                integrada: true,
                datos: datosVineta,
                posicion: {
                    x: vinetaWindow.getAttribute('x'),
                    y: vinetaWindow.getAttribute('y')
                },
                zoom: window.zoomVinetaActual || 1
            };
            
            console.log('💾 Datos de viñeta guardados en plano:', planoActual.nombre);
            
        } catch (error) {
            console.warn('⚠️ Error al guardar datos de viñeta:', error);
        }
    },
    
    // ========================================
    // RESTAURAR DATOS DE VIÑETA DESDE PLANO
    // ========================================
    restaurarDatosVinetaDesde(plano) {
        if (!plano || !plano.vineta || !plano.vineta.integrada) {
            // Este plano no tiene viñeta, cerrarla si existe
            this.cerrarVinetaSiExiste();
            return;
        }
        
        // Verificar si ya existe una viñeta
        let vinetaWindow = document.getElementById('vinetaWindow');
        
        if (!vinetaWindow) {
            // No hay viñeta, crearla
            this.crearVinetaParaPlano(plano);
        } else {
            // Ya existe, solo actualizar datos
            this.actualizarDatosVinetaExistente(plano);
        }
    },
    
    // ========================================
    // CREAR VIÑETA PARA EL PLANO
    // ========================================
    crearVinetaParaPlano(plano) {
        // Usar la función global abrirVineta
        if (typeof window.abrirVineta === 'function') {
            window.abrirVineta();
            
            // Esperar a que se cree el iframe y luego cargar datos
            setTimeout(() => {
                this.actualizarDatosVinetaExistente(plano);
            }, 500);
        }
    },
    
    // ========================================
    // ACTUALIZAR DATOS EN VIÑETA EXISTENTE
    // ========================================
    actualizarDatosVinetaExistente(plano) {
        const vinetaWindow = document.getElementById('vinetaWindow');
        if (!vinetaWindow) return;
        
        const iframe = vinetaWindow.querySelector('iframe');
        if (!iframe || !iframe.contentWindow) return;
        
        try {
            const iframeDoc = iframe.contentWindow.document;
            const datosVineta = plano.vineta.datos || {};
            
            // Aplicar valores a todos los campos
            Object.keys(datosVineta).forEach(campo => {
                const elemento = iframeDoc.getElementById(campo);
                if (elemento) {
                    elemento.textContent = datosVineta[campo];
                }
            });
            
            // Restaurar zoom si existe
            if (plano.vineta.zoom && window.zoomVinetaActual !== undefined) {
                window.zoomVinetaActual = plano.vineta.zoom;
                const zoomLabel = document.getElementById('zoomVinetaLabel');
                if (zoomLabel) {
                    zoomLabel.textContent = Math.round(plano.vineta.zoom * 100) + '%';
                }
            }
            
            console.log('✅ Datos de viñeta restaurados para:', plano.nombre);
            
        } catch (error) {
            console.warn('⚠️ Error al restaurar datos de viñeta:', error);
        }
    },
    
    // ========================================
    // CERRAR VIÑETA SI EXISTE (SIN MOSTRAR EN CONSOLA)
    // ========================================
    cerrarVinetaSiExiste() {
        const vinetaWindow = document.getElementById('vinetaWindow');
        if (vinetaWindow) {
            // Cerrar directamente sin usar la función global
            vinetaWindow.remove();
            window.vinetaActiva = false;
            window.zoomVinetaActual = 1;
            window.vinetaPanActivo = false;
            
            if (window.formatObserver) {
                window.formatObserver.disconnect();
                window.formatObserver = null;
            }
        }
    },
    
    // ========================================
    // INTERCEPTAR CAMBIOS EN LA VIÑETA
    // ========================================
    interceptarCambiosVineta() {
        // Observar cuando se crea una viñeta
        const observador = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.id === 'vinetaWindow') {
                        console.log('👁️ Viñeta detectada, configurando auto-guardado...');
                        setTimeout(() => {
                            this.configurarAutoGuardadoVineta();
                        }, 600);
                    }
                });
            });
        });
        
        const svgPlano = document.getElementById('plano');
        if (svgPlano) {
            observador.observe(svgPlano, {
                childList: true,
                subtree: false
            });
        }
    },
    
    // ========================================
    // CONFIGURAR AUTO-GUARDADO DE VIÑETA
    // ========================================
    configurarAutoGuardadoVineta() {
        const vinetaWindow = document.getElementById('vinetaWindow');
        if (!vinetaWindow) return;
        
        const iframe = vinetaWindow.querySelector('iframe');
        if (!iframe || !iframe.contentWindow) return;
        
        try {
            const iframeDoc = iframe.contentWindow.document;
            const editables = iframeDoc.querySelectorAll('.editable-vineta');
            
            editables.forEach(elemento => {
                // Guardar en el plano en lugar de localStorage
                elemento.addEventListener('blur', () => {
                    this.guardarDatosVinetaEnPlano();
                });
                
                elemento.addEventListener('input', () => {
                    // Auto-guardado mientras escribe (debounced)
                    clearTimeout(this._saveTimeout);
                    this._saveTimeout = setTimeout(() => {
                        this.guardarDatosVinetaEnPlano();
                    }, 1000);
                });
            });
            
            // Marcar como integrada en el plano actual
            const planoActual = window.PlanoElectricoManager?.getPlanoActivo();
            if (planoActual) {
                planoActual.vineta.integrada = true;
            }
            
            console.log('✅ Auto-guardado de viñeta configurado');
            
        } catch (error) {
            console.warn('⚠️ Error al configurar auto-guardado:', error);
        }
    },
    
    // ========================================
    // INICIALIZAR INTERCEPTOR
    // ========================================
    init() {
        console.log('🚀 Inicializando interceptor de viñeta...');
        
        // Interceptar cambios en la viñeta
        this.interceptarCambiosVineta();
        
        // Interceptar función cerrarVineta original SOLAMENTE para guardar antes de cerrar
        if (window.cerrarVineta) {
            const originalCerrarVineta = window.cerrarVineta;
            window.cerrarVineta = () => {
                // Guardar antes de cerrar
                this.guardarDatosVinetaEnPlano();
                // Ejecutar cierre original
                originalCerrarVineta();
            };
        }
        
        console.log('✅ Interceptor de viñeta inicializado');
    }
};

// Exportar para uso global
window.VinetaInterceptor = VinetaInterceptor;

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            VinetaInterceptor.init();
        }, 2000);
    });
} else {
    setTimeout(() => {
        VinetaInterceptor.init();
    }, 2000);
}

console.log('✅ VinetaInterceptor cargado');
