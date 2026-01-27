// buscador-ridda-final_v2/anexo/tabla-contenidos-ridaa.js
// ============================================================
// TABLA DE CONTENIDOS RIDAA - ÍNDICE NAVEGABLE
// ============================================================

(function() {
    'use strict';
    
    console.log('📑 Cargando Tabla de Contenidos RIDAA...');
    
    // ============================================================
    // ESTADO
    // ============================================================
    
    let indiceGenerado = null;
    let modalCreado = false;
    
    // ============================================================
    // ABRIR TABLA DE CONTENIDOS
    // ============================================================
    
    window.abrirTablaContenidos = function() {
        console.log('📖 Abriendo Tabla de Contenidos...');
        
        // Crear modal si no existe
        if (!modalCreado) {
            crearModalTablaContenidos();
            modalCreado = true;
        }
        
        // Mostrar modal
        const modal = document.getElementById('tablaContenidosModal');
        if (modal) {
            modal.classList.add('show');
            
            // Generar índice si no existe
            if (!indiceGenerado) {
                generarIndice();
            }
        }
    };
    
    // ============================================================
    // CREAR MODAL
    // ============================================================
    
    function crearModalTablaContenidos() {
        const modalHTML = `
            <div class="tabla-contenidos-modal" id="tablaContenidosModal">
                <div class="tabla-contenidos-ventana">
                    <div class="tabla-contenidos-header">
                        <div class="tabla-contenidos-title">
                            📑 TABLA DE CONTENIDOS - RIDAA
                        </div>
                        <div class="tabla-contenidos-header-buttons">
                            <button class="btn-tabla-contenidos-header close" onclick="cerrarTablaContenidos()">✕</button>
                        </div>
                    </div>
                    <div class="tabla-contenidos-content" id="tablaContenidosContent">
                        <div class="tc-loading">
                            <div class="tc-spinner"></div>
                            <div class="tc-loading-text">Generando índice...</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Cerrar al hacer clic fuera
        const modal = document.getElementById('tablaContenidosModal');
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarTablaContenidos();
            }
        });
        
        console.log('✅ Modal de Tabla de Contenidos creado');
    }
    
    // ============================================================
    // GENERAR ÍNDICE
    // ============================================================
    
    function generarIndice() {
        console.log('🔧 Generando índice desde datos V2...');
        
        // Esperar a que los datos estén disponibles
        setTimeout(() => {
            if (!window.RidaaDataV2 || !window.RidaaIndexer) {
                console.error('❌ Datos V2 o Indexer no disponibles');
                mostrarError();
                return;
            }
            
            try {
                // Crear índice jerárquico
                const indice = window.RidaaIndexer.crearIndice(window.RidaaDataV2);
                indiceGenerado = indice;
                
                // Renderizar
                renderizarIndice(indice);
                
                console.log('✅ Índice generado correctamente');
                
            } catch (error) {
                console.error('❌ Error generando índice:', error);
                mostrarError();
            }
        }, 500);
    }
    
    // ============================================================
    // RENDERIZAR ÍNDICE
    // ============================================================
    
    function renderizarIndice(indice) {
        const container = document.getElementById('tablaContenidosContent');
        
        if (!container) return;
        
        let html = '';
        
        // Recorrer cada parte
        Object.values(indice).forEach(parte => {
            html += `<div class="tc-parte">`;
            html += `<div class="tc-parte-titulo">${parte.nombre}</div>`;
            
            // Recorrer títulos
            if (parte.titulos) {
                Object.values(parte.titulos).forEach(titulo => {
                    html += `
                        <div class="tc-titulo">
                            <div class="tc-titulo-item" onclick="buscarEnRidaa('${escaparComillas(titulo.nombre)}', 'titulo')">
                                <span class="tc-icon">📚</span>
                                <span class="tc-numero">${titulo.nombre}</span>
                            </div>
                    `;
                    
                    // Recorrer párrafos
                    if (titulo.parrafos && Object.keys(titulo.parrafos).length > 0) {
                        html += `<div class="tc-parrafo">`;
                        
                        Object.values(titulo.parrafos).forEach(parrafo => {
                            html += `
                                <div class="tc-parrafo-item" onclick="buscarEnRidaa('${escaparComillas(parrafo.nombre)}', 'parrafo')">
                                    <span class="tc-icon">📄</span>
                                    <span>${parrafo.nombre}</span>
                                </div>
                            `;
                        });
                        
                        html += `</div>`;
                    }
                    
                    html += `</div>`;
                });
            }
            
            html += `</div>`;
        });
        
        container.innerHTML = html;
    }
    
    // ============================================================
    // ESCAPAR COMILLAS
    // ============================================================
    
    function escaparComillas(texto) {
        if (!texto) return '';
        return texto.replace(/'/g, "\\'").replace(/"/g, '\\"');
    }
    
    // ============================================================
    // BUSCAR EN RIDAA
    // ============================================================
    
    window.buscarEnRidaa = function(termino, tipo) {
        console.log('🔍 Buscando:', termino, 'Tipo:', tipo);
        
        // Cerrar modal
        cerrarTablaContenidos();
        
        // Expandir panel RIDAA si está colapsado
        const ridaaContainer = document.getElementById('ridaaContainer');
        if (ridaaContainer && ridaaContainer.classList.contains('collapsed')) {
            if (typeof toggleRidaaPanel === 'function') {
                toggleRidaaPanel();
            }
        }
        
        // Esperar un momento para que el panel se expanda
        setTimeout(() => {
            // Buscar con el sistema V2
            if (window.RidaaIntegrationV2 && window.RidaaIntegrationV2.busquedaV2) {
                // Extraer parte útil del término (después del número)
                let terminoBusqueda = termino;
                
                // Si es título o párrafo, extraer la parte descriptiva
                const match = termino.match(/[IVX]+[:]?\s*(.+)/i);
                if (match) {
                    terminoBusqueda = match[1];
                }
                
                // Si es párrafo, extraer después de "Párrafo"
                const matchParrafo = termino.match(/Párrafo\s+[IVX]+[:]?\s*(.+)/i);
                if (matchParrafo) {
                    terminoBusqueda = matchParrafo[1];
                }
                
                console.log('📝 Término de búsqueda:', terminoBusqueda);
                
                // Actualizar input de búsqueda
                const searchInput = document.getElementById('ridaaSearchInput');
                if (searchInput) {
                    searchInput.value = terminoBusqueda;
                }
                
                // Ejecutar búsqueda
                window.RidaaIntegrationV2.busquedaV2(terminoBusqueda);
                
            } else {
                console.warn('⚠️ Sistema V2 no disponible, usando búsqueda estándar');
                
                // Fallback: usar búsqueda estándar
                const searchInput = document.getElementById('ridaaSearchInput');
                if (searchInput) {
                    searchInput.value = termino;
                    
                    if (typeof ejecutarBusqueda === 'function') {
                        ejecutarBusqueda();
                    }
                }
            }
        }, 300);
    };
    
    // ============================================================
    // MOSTRAR ERROR
    // ============================================================
    
    function mostrarError() {
        const container = document.getElementById('tablaContenidosContent');
        
        if (!container) return;
        
        container.innerHTML = `
            <div class="tc-loading">
                <div class="tc-icon" style="font-size: 64px;">⚠️</div>
                <div class="tc-loading-text">Error cargando la tabla de contenidos</div>
                <p style="margin-top: 15px; color: rgba(255, 255, 255, 0.5); font-size: 13px;">
                    Asegúrate de que el sistema V2 esté cargado correctamente.
                </p>
            </div>
        `;
    }
    
    // ============================================================
    // CERRAR TABLA DE CONTENIDOS
    // ============================================================
    
    window.cerrarTablaContenidos = function() {
        const modal = document.getElementById('tablaContenidosModal');
        
        if (modal) {
            modal.classList.remove('show');
            console.log('✅ Tabla de Contenidos cerrada');
        }
    };
    
    // ============================================================
    // CERRAR CON ESC
    // ============================================================
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('tablaContenidosModal');
            if (modal && modal.classList.contains('show')) {
                cerrarTablaContenidos();
            }
        }
    });
    
    // ============================================================
    // EXPORTAR
    // ============================================================
    
    window.TablaContenidosRidaa = {
        abrirTablaContenidos,
        cerrarTablaContenidos,
        buscarEnRidaa,
        getEstado: () => ({
            indiceGenerado: indiceGenerado !== null,
            modalCreado
        })
    };
    
    console.log('✅ Tabla de Contenidos RIDAA cargada');
    
})();