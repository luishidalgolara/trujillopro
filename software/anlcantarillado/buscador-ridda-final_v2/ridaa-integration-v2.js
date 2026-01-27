// buscador-ridda-final_v2/ridaa-integration-v2.js
// ============================================================
// INTEGRACIÓN V2 - CONECTA TODOS LOS MÓDULOS
// ============================================================

(function() {
    'use strict';
    
    console.log('🚀 Iniciando Integración V2...');
    
    // ============================================================
    // VARIABLES GLOBALES
    // ============================================================
    
    let datosV2 = [];
    let indiceV2 = null;
    let estadoV2 = {
        inicializado: false,
        filtroActual: 'all',
        ultimaBusqueda: '',
        resultadosActuales: []
    };
    
    // ============================================================
    // ESPERAR MÓDULOS
    // ============================================================
    
    async function esperarModulos() {
        const modulos = [
            'RidaaProcessorV2',
            'RidaaIndexer',
            'RidaaSearchV2',
            'RidaaRenderer'
        ];
        
        let intentos = 0;
        const maxIntentos = 100;
        
        while (intentos < maxIntentos) {
            const todosDisponibles = modulos.every(m => window[m] !== undefined);
            
            if (todosDisponibles) {
                console.log('✅ Todos los módulos V2 disponibles');
                return true;
            }
            
            await new Promise(resolve => setTimeout(resolve, 100));
            intentos++;
        }
        
        console.error('❌ Timeout esperando módulos V2');
        return false;
    }
    
    // ============================================================
    // INIT SISTEMA V2
    // ============================================================
    
    async function initSistemaV2() {
        try {
            console.log('🔧 Inicializando Sistema V2...');
            
            // Esperar módulos
            const modulosListos = await esperarModulos();
            if (!modulosListos) {
                throw new Error('Módulos V2 no disponibles');
            }
            
            // Cargar y procesar datos
            console.log('📂 Cargando datos...');
            datosV2 = await window.RidaaProcessorV2.initProcessorV2();
            
            if (!datosV2 || datosV2.length === 0) {
                throw new Error('No se pudieron cargar los datos');
            }
            
            // Crear índice
            console.log('🗂️ Creando índice...');
            indiceV2 = window.RidaaIndexer.crearIndice(datosV2);
            
            const stats = window.RidaaIndexer.estadisticasIndice(indiceV2);
            console.log('📊 Estadísticas:', stats);
            
            // Actualizar estado
            estadoV2.inicializado = true;
            
            // Reemplazar búsqueda actual
            reemplazarBusqueda();
            
            console.log('✅ Sistema V2 inicializado correctamente');
            
            return true;
            
        } catch (error) {
            console.error('❌ Error inicializando Sistema V2:', error);
            return false;
        }
    }
    
    // ============================================================
    // REEMPLAZAR BÚSQUEDA ACTUAL
    // ============================================================
    
    function reemplazarBusqueda() {
        // Reemplazar función de búsqueda global
        if (typeof window.realizarBusqueda === 'function') {
            window.realizarBusqueda_original = window.realizarBusqueda;
        }
        
        window.realizarBusqueda = function(query) {
            return busquedaV2(query);
        };
        
        console.log('✅ Búsqueda V2 activada');
    }
    
    // ============================================================
    // BÚSQUEDA V2
    // ============================================================
    
    function busquedaV2(query) {
        if (!estadoV2.inicializado) {
            console.warn('⚠️ Sistema V2 no inicializado, usando búsqueda original');
            if (window.realizarBusqueda_original) {
                return window.realizarBusqueda_original(query);
            }
            return;
        }
        
        if (!query || query.trim().length < 3) {
            mostrarEstadoVacioV2();
            return;
        }
        
        console.log('🔍 Búsqueda V2:', query);
        
        // Mostrar loading
        mostrarCargandoV2();
        
        // Realizar búsqueda con pequeño delay para UX
        setTimeout(() => {
            const resultados = window.RidaaSearchV2.busquedaInteligente(datosV2, query, {
                tipo: estadoV2.filtroActual,
                maxResultados: 50,
                incluirContexto: true
            });
            
            estadoV2.ultimaBusqueda = query;
            estadoV2.resultadosActuales = resultados;
            
            mostrarResultadosV2(resultados, query);
        }, 300);
    }
    
    // ============================================================
    // FILTRAR POR TIPO V2
    // ============================================================
    
    window.filtrarPorTipoV2 = function(tipo) {
        estadoV2.filtroActual = tipo;
        
        // Actualizar botones
        document.querySelectorAll('.ridaa-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-filter="${tipo}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Re-buscar con nuevo filtro
        if (estadoV2.ultimaBusqueda) {
            busquedaV2(estadoV2.ultimaBusqueda);
        }
    };
    
    // ============================================================
    // MOSTRAR RESULTADOS V2
    // ============================================================
    
    function mostrarResultadosV2(resultados, query) {
        const resultsContainer = document.getElementById('ridaaResults');
        const resultCount = document.getElementById('resultCount');
        
        if (!resultsContainer) return;
        
        resultCount.textContent = resultados.length;
        
        if (resultados.length === 0) {
            resultsContainer.innerHTML = `
                <div class="ridaa-empty-state-v2">
                    <div class="ridaa-empty-icon-v2">🔍</div>
                    <p>No se encontraron resultados</p>
                    <small>Intenta con otros términos de búsqueda</small>
                </div>
            `;
            return;
        }
        
        // Renderizar estadísticas
        const statsHtml = window.RidaaRenderer.renderizarEstadisticas(resultados);
        
        // Renderizar resultados
        const resultadosHtml = window.RidaaRenderer.renderizarResultados(resultados, query);
        
        resultsContainer.innerHTML = statsHtml + resultadosHtml;
        
        console.log(`✅ ${resultados.length} resultados mostrados`);
    }
    
    // ============================================================
    // MOSTRAR CARGANDO V2
    // ============================================================
    
    function mostrarCargandoV2() {
        const resultsContainer = document.getElementById('ridaaResults');
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = `
            <div class="ridaa-loading">
                <div class="ridaa-spinner"></div>
                <p>Buscando...</p>
            </div>
        `;
    }
    
    // ============================================================
    // MOSTRAR ESTADO VACÍO V2
    // ============================================================
    
    function mostrarEstadoVacioV2() {
        const resultsContainer = document.getElementById('ridaaResults');
        const resultCount = document.getElementById('resultCount');
        
        if (!resultsContainer) return;
        
        resultCount.textContent = '0';
        
        resultsContainer.innerHTML = `
            <div class="ridaa-empty-state-v2">
                <div class="ridaa-empty-icon-v2">📖</div>
                <p>Busca información del RIDAA</p>
                <small>El buscador V2 encuentra títulos, párrafos, secciones y artículos</small>
            </div>
        `;
    }
    
    // ============================================================
    // VER DETALLE COMPLETO
    // ============================================================
    
    window.verDetalleCompleto = function(id) {
        const item = datosV2.find(d => d.id === id);
        
        if (!item) {
            console.error('❌ Item no encontrado:', id);
            return;
        }
        
        const contexto = window.RidaaSearchV2.obtenerContextoAmpliado(item, datosV2);
        const detalleHtml = window.RidaaRenderer.renderizarDetalle(item, contexto);
        
        // Mostrar en modal o panel
        mostrarModal(detalleHtml);
    };
    
    // ============================================================
    // VER SECCIÓN COMPLETA
    // ============================================================
    
    window.verSeccionCompleta = function(event, id) {
        event.stopPropagation();
        
        const item = datosV2.find(d => d.id === id);
        if (!item) return;
        
        // Buscar todos los items de la misma sección
        let itemsSeccion = [];
        
        if (item.tipo === 'titulo') {
            itemsSeccion = datosV2.filter(d => d.tituloParent === item.titulo);
        } else if (item.tipo === 'parrafo') {
            itemsSeccion = datosV2.filter(d => d.parrafoParent === item.titulo);
        } else if (item.articuloParent) {
            itemsSeccion = datosV2.filter(d => d.articuloParent === item.articuloParent);
        }
        
        const html = `
            <div class="seccion-completa">
                <h2>${item.tituloParent || item.titulo}</h2>
                ${window.RidaaRenderer.renderizarResultados(itemsSeccion)}
            </div>
        `;
        
        mostrarModal(html);
    };
    
    // ============================================================
    // VER TÍTULO
    // ============================================================
    
    window.verTitulo = function(event, tituloNombre) {
        event.stopPropagation();
        
        const titulo = datosV2.find(d => d.tipo === 'titulo' && d.titulo.includes(tituloNombre));
        
        if (titulo) {
            verDetalleCompleto(titulo.id);
        }
    };
    
    // ============================================================
    // MOSTRAR MODAL
    // ============================================================
    
    function mostrarModal(contenidoHtml) {
        // Crear modal si no existe
        let modal = document.getElementById('ridaaModalV2');
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'ridaaModalV2';
            modal.className = 'ridaa-modal-v2';
            modal.innerHTML = `
                <div class="ridaa-modal-overlay-v2" onclick="cerrarModalV2()"></div>
                <div class="ridaa-modal-content-v2">
                    <button class="ridaa-modal-close-v2" onclick="cerrarModalV2()">✕</button>
                    <div class="ridaa-modal-body-v2"></div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Agregar estilos del modal
            agregarEstilosModal();
        }
        
        // Actualizar contenido
        const modalBody = modal.querySelector('.ridaa-modal-body-v2');
        modalBody.innerHTML = contenidoHtml;
        
        // Mostrar modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // ============================================================
    // CERRAR MODAL
    // ============================================================
    
    window.cerrarModalV2 = function() {
        const modal = document.getElementById('ridaaModalV2');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // ============================================================
    // AGREGAR ESTILOS MODAL
    // ============================================================
    
    function agregarEstilosModal() {
        if (document.getElementById('ridaa-modal-styles-v2')) return;
        
        const style = document.createElement('style');
        style.id = 'ridaa-modal-styles-v2';
        style.textContent = `
            .ridaa-modal-v2 {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                align-items: center;
                justify-content: center;
            }
            
            .ridaa-modal-overlay-v2 {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .ridaa-modal-content-v2 {
                position: relative;
                background: linear-gradient(135deg, #1a1a2e 0%, #0f1419 100%);
                border: 2px solid #00d9ff;
                border-radius: 12px;
                max-width: 90%;
                max-height: 90%;
                width: 800px;
                overflow: hidden;
                box-shadow: 0 10px 50px rgba(0, 217, 255, 0.3);
                z-index: 10001;
            }
            
            .ridaa-modal-close-v2 {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(231, 76, 60, 0.9);
                color: white;
                border: none;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                font-size: 18px;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10002;
            }
            
            .ridaa-modal-close-v2:hover {
                background: rgba(231, 76, 60, 1);
                transform: scale(1.1);
            }
            
            .ridaa-modal-body-v2 {
                padding: 30px;
                max-height: calc(90vh - 60px);
                overflow-y: auto;
                color: white;
            }
            
            .ridaa-modal-body-v2::-webkit-scrollbar {
                width: 8px;
            }
            
            .ridaa-modal-body-v2::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
            }
            
            .ridaa-modal-body-v2::-webkit-scrollbar-thumb {
                background: #00d9ff;
                border-radius: 4px;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // ============================================================
    // OBTENER ESTADÍSTICAS
    // ============================================================
    
    window.obtenerEstadisticasV2 = function() {
        if (!estadoV2.inicializado) {
            console.warn('⚠️ Sistema V2 no inicializado');
            return null;
        }
        
        return {
            totalItems: datosV2.length,
            indice: window.RidaaIndexer.estadisticasIndice(indiceV2),
            estado: estadoV2
        };
    };
    
    // ============================================================
    // DEBUG V2
    // ============================================================
    
    window.debugV2 = function() {
        console.log('🐛 DEBUG V2:');
        console.log('- Datos:', datosV2.length, 'items');
        console.log('- Índice:', indiceV2);
        console.log('- Estado:', estadoV2);
        console.log('- Ejemplo título:', datosV2.find(d => d.tipo === 'titulo'));
        console.log('- Ejemplo párrafo:', datosV2.find(d => d.tipo === 'parrafo'));
        console.log('- Ejemplo sección:', datosV2.find(d => d.tipo === 'seccion'));
        
        return {
            datos: datosV2,
            indice: indiceV2,
            estado: estadoV2
        };
    };
    
    // ============================================================
    // EXPORTAR
    // ============================================================
    
    window.RidaaIntegrationV2 = {
        initSistemaV2,
        busquedaV2,
        obtenerEstadisticasV2,
        debugV2,
        getDatos: () => datosV2,
        getIndice: () => indiceV2,
        getEstado: () => estadoV2
    };
    
    // ============================================================
    // AUTO-INIT
    // ============================================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSistemaV2);
    } else {
        initSistemaV2();
    }
    
    console.log('✅ Integración V2 cargada');
    
})();