// buscador-ridda-final_v2/ridaa-integration.js

// ============================================================
// INTEGRACIÓN RIDAA CON TRUKILLO
// ============================================================

(function() {
    'use strict';
    
    console.log('🔧 Cargando integración RIDAA...');
    
    // ============================================================
    // CARGAR HTML DEL BUSCADOR
    // ============================================================
    
    function cargarHTMLBuscador() {
        return fetch('buscador-ridda-final_v2/ridaa-buscador.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error cargando HTML del buscador');
                }
                return response.text();
            })
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Insertar todos los elementos
                while (tempDiv.firstChild) {
                    document.body.appendChild(tempDiv.firstChild);
                }
                
                console.log('✅ HTML del buscador cargado');
                console.log('✅ Botón flotante:', document.getElementById('ridaaShowBtn') ? 'ENCONTRADO' : 'NO ENCONTRADO');
            })
            .catch(error => {
                console.error('❌ Error cargando HTML:', error);
            });
    }
    
    // ============================================================
    // CARGAR CSS DEL BUSCADOR
    // ============================================================
    
    function cargarCSSBuscador() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'buscador-ridda-final_v2/ridaa-buscador.css';
        document.head.appendChild(link);
        console.log('✅ CSS del buscador cargado');
    }
    
    // ============================================================
    // CARGAR JS DEL BUSCADOR
    // ============================================================
    
    function cargarJSBuscador() {
        return new Promise((resolve, reject) => {
            const script1 = document.createElement('script');
            script1.src = 'buscador-ridda-final_v2/ridaa-buscador.js';
            
            script1.onload = () => {
                console.log('✅ JS del buscador cargado');
                
                // Cargar data-loader después del buscador
                const script2 = document.createElement('script');
                script2.src = 'buscador-ridda-final_v2/ridaa-data-loader.js';
                
                script2.onload = () => {
                    console.log('✅ Data-loader cargado');
                    resolve();
                };
                
                script2.onerror = () => {
                    console.warn('⚠️ Data-loader no disponible (opcional)');
                    resolve(); // No bloqueamos si falta
                };
                
                document.body.appendChild(script2);
            };
            
            script1.onerror = () => {
                console.error('❌ Error cargando JS del buscador');
                reject();
            };
            
            document.body.appendChild(script1);
        });
    }
    
    // ============================================================
    // AJUSTAR WORKSPACE PARA EL BUSCADOR
    // ============================================================
    
    function ajustarWorkspace() {
        const workspace = document.getElementById('workspace');
        
        if (workspace) {
            workspace.style.marginRight = '380px';
            workspace.style.transition = 'margin-right 0.3s ease';
            console.log('✅ Workspace ajustado para el buscador');
        }
    }
    
    // ============================================================
    // DETECTAR CAMBIOS EN COLAPSO
    // ============================================================
    
    function observarColapso() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    const target = mutation.target;
                    const workspace = document.getElementById('workspace');
                    
                    if (target.classList.contains('collapsed')) {
                        if (workspace) {
                            workspace.style.marginRight = '40px';
                        }
                    } else {
                        if (workspace) {
                            workspace.style.marginRight = '380px';
                        }
                    }
                }
            });
        });
        
        setTimeout(() => {
            const ridaaContainer = document.getElementById('ridaaContainer');
            if (ridaaContainer) {
                observer.observe(ridaaContainer, { attributes: true });
                console.log('✅ Observer de colapso activado');
            }
        }, 500);
    }
    
    // ============================================================
    // INIT INTEGRACIÓN
    // ============================================================
    
    function initIntegracion() {
        console.log('🚀 Iniciando integración RIDAA...');
        
        cargarCSSBuscador();
        
        cargarHTMLBuscador()
            .then(() => cargarJSBuscador())
            .then(() => {
                ajustarWorkspace();
                observarColapso();
                console.log('✅ Integración RIDAA completada');
            })
            .catch(error => {
                console.error('❌ Error en integración RIDAA:', error);
            });
    }
    
    // ============================================================
    // AUTO-INIT AL CARGAR EL DOM
    // ============================================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIntegracion);
    } else {
        initIntegracion();
    }
    
})();