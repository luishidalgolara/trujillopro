// buscador-ridda-final_v2/ridaa-result-renderer.js
// ============================================================
// RENDERIZADOR V2 - RESULTADOS CON BREADCRUMBS Y CONTEXTO
// ============================================================

(function() {
    'use strict';
    
    console.log('🔧 Cargando Renderizador V2...');
    
    // ============================================================
    // OBTENER BADGE COLOR
    // ============================================================
    
    function obtenerBadgeColor(tipo) {
        const colores = {
            'titulo': '#9b59b6',
            'parrafo': '#3498db',
            'seccion': '#e67e22',
            'articulos': '#27ae60',
            'definiciones': '#f39c12'
        };
        
        return colores[tipo] || '#95a5a6';
    }
    
    // ============================================================
    // OBTENER BADGE TEXTO
    // ============================================================
    
    function obtenerBadgeTexto(tipo) {
        const badges = {
            'titulo': 'TÍTULO',
            'parrafo': 'PÁRRAFO',
            'seccion': 'SECCIÓN',
            'articulos': 'ARTÍCULO',
            'definiciones': 'DEFINICIÓN'
        };
        
        return badges[tipo] || 'GENERAL';
    }
    
    // ============================================================
    // OBTENER ICONO POR TIPO
    // ============================================================
    
    function obtenerIcono(tipo) {
        const iconos = {
            'titulo': '📚',
            'parrafo': '📄',
            'seccion': '📌',
            'articulos': '📝',
            'definiciones': '📖'
        };
        
        return iconos[tipo] || '📋';
    }
    
    // ============================================================
    // RENDERIZAR BREADCRUMBS
    // ============================================================
    
    function renderizarBreadcrumbs(jerarquia) {
        if (!jerarquia || jerarquia.length === 0) {
            return '<span class="breadcrumb-item">Sin contexto</span>';
        }
        
        return jerarquia
            .map((nivel, index) => {
                const isLast = index === jerarquia.length - 1;
                const clase = isLast ? 'breadcrumb-item active' : 'breadcrumb-item';
                return `<span class="${clase}">${nivel}</span>`;
            })
            .join(' <span class="breadcrumb-separator">→</span> ');
    }
    
    // ============================================================
    // RENDERIZAR UN RESULTADO
    // ============================================================
    
    function renderizarResultado(item, query = '') {
        const badgeColor = obtenerBadgeColor(item.tipo);
        const badgeTexto = obtenerBadgeTexto(item.tipo);
        const icono = obtenerIcono(item.tipo);
        const breadcrumbs = renderizarBreadcrumbs(item.jerarquia);
        
        // Resaltar términos si existe la función
        let contenidoMostrar = item.extracto || item.contenido || '';
        if (typeof window.RidaaSearchV2 !== 'undefined' && query) {
            contenidoMostrar = window.RidaaSearchV2.resaltarTerminos(contenidoMostrar, query);
        }
        
        // Limitar longitud del contenido
        if (contenidoMostrar.length > 300) {
            contenidoMostrar = contenidoMostrar.substring(0, 300) + '...';
        }
        
        return `
            <div class="ridaa-result-item-v2" data-id="${item.id}" onclick="verDetalleCompleto(${item.id})">
                <div class="ridaa-result-header-v2">
                    <div class="ridaa-result-title-group">
                        <span class="ridaa-result-icon">${icono}</span>
                        <div class="ridaa-result-title-v2">${item.titulo}</div>
                    </div>
                    <div class="ridaa-result-badge-v2" style="background: ${badgeColor}20; color: ${badgeColor}; border: 1px solid ${badgeColor}">
                        ${badgeTexto}
                    </div>
                </div>
                
                <div class="ridaa-breadcrumbs-v2">
                    ${breadcrumbs}
                </div>
                
                <div class="ridaa-result-content-v2">
                    ${contenidoMostrar}
                </div>
                
                <div class="ridaa-result-meta-v2">
                    ${item.relevancia ? `<span>⭐ Relevancia: ${Math.round(item.relevancia)}%</span>` : ''}
                    <span>📍 ${item.parte || 'General'}</span>
                    ${item.numero ? `<span>🔢 ${item.numero}</span>` : ''}
                </div>
                
                <div class="ridaa-result-actions-v2">
                    <button class="btn-ver-seccion" onclick="verSeccionCompleta(event, ${item.id})">
                        📖 Ver sección completa
                    </button>
                    ${item.tituloParent ? `
                        <button class="btn-ver-titulo" onclick="verTitulo(event, '${item.tituloParent}')">
                            ⬆️ Ir a ${item.tituloParent.split(':')[0]}
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    // ============================================================
    // RENDERIZAR LISTA DE RESULTADOS
    // ============================================================
    
    function renderizarResultados(resultados, query = '') {
        if (!resultados || resultados.length === 0) {
            return `
                <div class="ridaa-empty-state-v2">
                    <div class="ridaa-empty-icon-v2">🔍</div>
                    <p>No se encontraron resultados</p>
                    <small>Intenta con otros términos de búsqueda</small>
                </div>
            `;
        }
        
        return resultados
            .map(item => renderizarResultado(item, query))
            .join('');
    }
    
    // ============================================================
    // RENDERIZAR GRUPOS DE RESULTADOS
    // ============================================================
    
    function renderizarGrupos(grupos, query = '') {
        let html = '';
        
        const orden = ['secciones', 'parrafos', 'titulos', 'articulos', 'definiciones'];
        const titulos = {
            'secciones': '📌 Secciones',
            'parrafos': '📄 Párrafos',
            'titulos': '📚 Títulos',
            'articulos': '📝 Artículos',
            'definiciones': '📖 Definiciones'
        };
        
        orden.forEach(tipo => {
            const items = grupos[tipo] || [];
            if (items.length === 0) return;
            
            html += `
                <div class="ridaa-group-v2">
                    <div class="ridaa-group-header-v2">
                        <span class="ridaa-group-title-v2">${titulos[tipo]}</span>
                        <span class="ridaa-group-count-v2">${items.length}</span>
                    </div>
                    <div class="ridaa-group-content-v2">
                        ${renderizarResultados(items, query)}
                    </div>
                </div>
            `;
        });
        
        return html;
    }
    
    // ============================================================
    // RENDERIZAR VISTA DETALLE
    // ============================================================
    
    function renderizarDetalle(item, contexto = null) {
        const badgeColor = obtenerBadgeColor(item.tipo);
        const badgeTexto = obtenerBadgeTexto(item.tipo);
        const icono = obtenerIcono(item.tipo);
        const breadcrumbs = renderizarBreadcrumbs(item.jerarquia);
        
        let html = `
            <div class="ridaa-detalle-v2">
                <div class="ridaa-detalle-header">
                    <div class="ridaa-detalle-title-group">
                        <span class="ridaa-detalle-icon">${icono}</span>
                        <h2>${item.titulo}</h2>
                    </div>
                    <div class="ridaa-result-badge-v2" style="background: ${badgeColor}20; color: ${badgeColor}; border: 1px solid ${badgeColor}">
                        ${badgeTexto}
                    </div>
                </div>
                
                <div class="ridaa-breadcrumbs-v2 detalle">
                    ${breadcrumbs}
                </div>
                
                <div class="ridaa-detalle-content">
                    ${item.contenido || 'Sin contenido disponible'}
                </div>
                
                ${item.tags && item.tags.length > 0 ? `
                    <div class="ridaa-detalle-tags">
                        <strong>🏷️ Tags:</strong>
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
        `;
        
        // Agregar contexto si está disponible
        if (contexto) {
            if (contexto.padre) {
                html += `
                    <div class="ridaa-contexto-padre">
                        <h3>📚 Contexto Superior</h3>
                        ${renderizarResultado(contexto.padre)}
                    </div>
                `;
            }
            
            if (contexto.hijos && contexto.hijos.length > 0) {
                html += `
                    <div class="ridaa-contexto-hijos">
                        <h3>📋 Elementos Relacionados (${contexto.hijos.length})</h3>
                        ${contexto.hijos.slice(0, 5).map(hijo => renderizarResultado(hijo)).join('')}
                    </div>
                `;
            }
        }
        
        html += '</div>';
        
        return html;
    }
    
    // ============================================================
    // RENDERIZAR ESTADÍSTICAS
    // ============================================================
    
    function renderizarEstadisticas(resultados) {
        const total = resultados.length;
        const grupos = {};
        
        resultados.forEach(item => {
            grupos[item.tipo] = (grupos[item.tipo] || 0) + 1;
        });
        
        return `
            <div class="ridaa-stats-v2">
                <div class="stat-item">
                    <span class="stat-label">Total:</span>
                    <span class="stat-value">${total}</span>
                </div>
                ${Object.entries(grupos).map(([tipo, cant]) => `
                    <div class="stat-item">
                        <span class="stat-label">${obtenerBadgeTexto(tipo)}:</span>
                        <span class="stat-value">${cant}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // ============================================================
    // AGREGAR ESTILOS CSS DINÁMICOS
    // ============================================================
    
    function agregarEstilosV2() {
        if (document.getElementById('ridaa-styles-v2')) return;
        
        const style = document.createElement('style');
        style.id = 'ridaa-styles-v2';
        style.textContent = `
            .ridaa-result-item-v2 {
                background: rgba(255, 255, 255, 0.05);
                border: 2px solid rgba(52, 73, 94, 0.5);
                border-radius: 10px;
                padding: 16px;
                margin-bottom: 14px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .ridaa-result-item-v2:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: #00d9ff;
                transform: translateX(-5px);
                box-shadow: 0 5px 20px rgba(0, 217, 255, 0.2);
            }
            
            .ridaa-result-header-v2 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }
            
            .ridaa-result-title-group {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            
            .ridaa-result-icon {
                font-size: 20px;
            }
            
            .ridaa-result-title-v2 {
                font-weight: bold;
                color: #00d9ff;
                font-size: 15px;
            }
            
            .ridaa-result-badge-v2 {
                padding: 5px 12px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .ridaa-breadcrumbs-v2 {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                margin-bottom: 12px;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.6);
            }
            
            .breadcrumb-item {
                padding: 3px 8px;
                background: rgba(255, 255, 255, 0.08);
                border-radius: 4px;
            }
            
            .breadcrumb-item.active {
                background: rgba(0, 217, 255, 0.2);
                color: #00d9ff;
                font-weight: 600;
            }
            
            .breadcrumb-separator {
                color: rgba(255, 255, 255, 0.3);
            }
            
            .ridaa-result-content-v2 {
                color: rgba(255, 255, 255, 0.85);
                font-size: 13px;
                line-height: 1.6;
                margin-bottom: 12px;
            }
            
            .ridaa-result-content-v2 mark,
            .ridaa-result-content-v2 .highlight {
                background: rgba(0, 217, 255, 0.3);
                color: #fff;
                padding: 2px 4px;
                border-radius: 3px;
                font-weight: bold;
            }
            
            .ridaa-result-meta-v2 {
                display: flex;
                gap: 15px;
                font-size: 11px;
                color: rgba(255, 255, 255, 0.5);
                padding-top: 10px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 10px;
            }
            
            .ridaa-result-actions-v2 {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .ridaa-result-actions-v2 button {
                padding: 6px 12px;
                background: rgba(0, 217, 255, 0.15);
                border: 1px solid rgba(0, 217, 255, 0.3);
                border-radius: 6px;
                color: #00d9ff;
                font-size: 11px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .ridaa-result-actions-v2 button:hover {
                background: rgba(0, 217, 255, 0.3);
                border-color: #00d9ff;
                transform: translateY(-2px);
            }
            
            .ridaa-empty-state-v2 {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 60px 20px;
                color: rgba(255, 255, 255, 0.5);
                text-align: center;
            }
            
            .ridaa-empty-icon-v2 {
                font-size: 72px;
                margin-bottom: 20px;
                opacity: 0.5;
            }
            
            .ridaa-group-v2 {
                margin-bottom: 24px;
            }
            
            .ridaa-group-header-v2 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: rgba(0, 217, 255, 0.1);
                border-left: 4px solid #00d9ff;
                border-radius: 6px;
                margin-bottom: 12px;
            }
            
            .ridaa-group-title-v2 {
                font-weight: bold;
                color: #00d9ff;
                font-size: 14px;
            }
            
            .ridaa-group-count-v2 {
                background: rgba(0, 217, 255, 0.3);
                padding: 4px 10px;
                border-radius: 12px;
                color: white;
                font-size: 12px;
                font-weight: bold;
            }
            
            .ridaa-stats-v2 {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
                padding: 12px 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                margin-bottom: 15px;
            }
            
            .stat-item {
                display: flex;
                gap: 6px;
                align-items: center;
            }
            
            .stat-label {
                color: rgba(255, 255, 255, 0.6);
                font-size: 12px;
            }
            
            .stat-value {
                color: #00d9ff;
                font-weight: bold;
                font-size: 14px;
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ Estilos V2 agregados');
    }
    
    // ============================================================
    // INIT
    // ============================================================
    
    agregarEstilosV2();
    
    // ============================================================
    // EXPORTAR
    // ============================================================
    
    window.RidaaRenderer = {
        renderizarResultado,
        renderizarResultados,
        renderizarGrupos,
        renderizarDetalle,
        renderizarEstadisticas,
        renderizarBreadcrumbs,
        obtenerBadgeColor,
        obtenerBadgeTexto,
        obtenerIcono
    };
    
    console.log('✅ Renderizador V2 cargado');
    
})();