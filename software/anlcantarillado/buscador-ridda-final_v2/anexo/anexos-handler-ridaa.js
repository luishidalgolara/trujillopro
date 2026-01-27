// buscador-ridda-final_v2/anexo/anexos-handler.js
// ============================================================
// HANDLER DE ANEXOS RIDAA - INTEGRADO CON PANEL
// ============================================================

(function() {
    'use strict';
    
    console.log('📊 Cargando Anexos RIDAA Handler...');
    
    // ============================================================
    // ESTADO DEL MODAL
    // ============================================================
    
    let modalAnexoActual = null;
    let anexoMinimizado = false;
    
    // ============================================================
    // TOGGLE DROPDOWN ANEXOS
    // ============================================================
    
    window.toggleAnexosRidaa = function() {
        const dropdown = document.getElementById('ridaaAnexosDropdown');
        
        if (!dropdown) {
            console.error('❌ Dropdown de anexos RIDAA no encontrado');
            return;
        }
        
        dropdown.classList.toggle('show');
        
        // Cerrar si se hace clic fuera
        if (dropdown.classList.contains('show')) {
            setTimeout(() => {
                document.addEventListener('click', cerrarDropdownAnexosRidaa);
            }, 100);
        }
    };
    
    // ============================================================
    // CERRAR DROPDOWN AL HACER CLIC FUERA
    // ============================================================
    
    function cerrarDropdownAnexosRidaa(event) {
        const dropdown = document.getElementById('ridaaAnexosDropdown');
        const container = document.querySelector('.ridaa-anexos-container');
        
        if (!dropdown || !container) return;
        
        if (!container.contains(event.target)) {
            dropdown.classList.remove('show');
            document.removeEventListener('click', cerrarDropdownAnexosRidaa);
        }
    }
    
    // ============================================================
    // ABRIR ANEXO
    // ============================================================
    
    window.abrirAnexoRidaa = function(archivo, titulo) {
        console.log('📄 Abriendo anexo RIDAA:', archivo);
        
        // Cerrar dropdown
        const dropdown = document.getElementById('ridaaAnexosDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
        
        // Crear modal si no existe
        if (!modalAnexoActual) {
            crearModalAnexoRidaa();
        }
        
        // Actualizar contenido
        const modal = document.getElementById('anexoRidaaModal');
        const tituloElement = document.getElementById('anexoRidaaTitulo');
        const iframe = document.getElementById('anexoRidaaIframe');
        
        if (!modal || !tituloElement || !iframe) {
            console.error('❌ Elementos del modal no encontrados');
            return;
        }
        
        // Mostrar loading
        mostrarLoadingAnexoRidaa(true);
        
        // Actualizar título
        tituloElement.textContent = '📊 ' + titulo;
        
        // Cargar contenido
        const rutaCompleta = 'buscador-ridda-final_v2/anexo/' + archivo;
        iframe.src = rutaCompleta;
        
        // Mostrar modal
        modal.classList.add('show');
        modalAnexoActual = archivo;
        anexoMinimizado = false;
        
        // Event listener para cuando cargue el iframe
        iframe.onload = function() {
            mostrarLoadingAnexoRidaa(false);
            console.log('✅ Anexo RIDAA cargado:', archivo);
        };
        
        iframe.onerror = function() {
            mostrarLoadingAnexoRidaa(false);
            console.error('❌ Error cargando anexo RIDAA:', archivo);
            alert('Error al cargar el anexo. Verifica que el archivo exista en: buscador-ridda-final_v2/anexo/');
        };
    };
    
    // ============================================================
    // CREAR MODAL ANEXO RIDAA
    // ============================================================
    
    function crearModalAnexoRidaa() {
        const modalHTML = `
            <div class="anexo-modal" id="anexoRidaaModal">
                <div class="anexo-ventana" id="anexoRidaaVentana">
                    <div class="anexo-header">
                        <div class="anexo-title" id="anexoRidaaTitulo">📊 ANEXO RIDAA</div>
                        <div class="anexo-header-buttons">
                            <button class="btn-anexo-header minimize" onclick="minimizarAnexoRidaa()">━</button>
                            <button class="btn-anexo-header close" onclick="cerrarAnexoRidaa()">✕</button>
                        </div>
                    </div>
                    <div class="anexo-content">
                        <div class="anexo-loading" id="anexoRidaaLoading">
                            <div class="anexo-spinner"></div>
                            <div class="anexo-loading-text">Cargando...</div>
                        </div>
                        <iframe id="anexoRidaaIframe" src=""></iframe>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Event listener para cerrar al hacer clic fuera
        const modal = document.getElementById('anexoRidaaModal');
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarAnexoRidaa();
            }
        });
        
        console.log('✅ Modal de anexo RIDAA creado');
    }
    
    // ============================================================
    // MOSTRAR/OCULTAR LOADING
    // ============================================================
    
    function mostrarLoadingAnexoRidaa(mostrar) {
        const loading = document.getElementById('anexoRidaaLoading');
        if (loading) {
            loading.style.display = mostrar ? 'block' : 'none';
        }
    }
    
    // ============================================================
    // MINIMIZAR ANEXO
    // ============================================================
    
    window.minimizarAnexoRidaa = function() {
        const ventana = document.getElementById('anexoRidaaVentana');
        
        if (!ventana) return;
        
        anexoMinimizado = !anexoMinimizado;
        
        if (anexoMinimizado) {
            ventana.classList.add('minimized');
            console.log('➖ Anexo RIDAA minimizado');
        } else {
            ventana.classList.remove('minimized');
            console.log('➕ Anexo RIDAA restaurado');
        }
    };
    
    // ============================================================
    // CERRAR ANEXO
    // ============================================================
    
    window.cerrarAnexoRidaa = function() {
        const modal = document.getElementById('anexoRidaaModal');
        const iframe = document.getElementById('anexoRidaaIframe');
        
        if (modal) {
            modal.classList.remove('show');
        }
        
        // Limpiar iframe
        if (iframe) {
            iframe.src = '';
        }
        
        modalAnexoActual = null;
        anexoMinimizado = false;
        
        console.log('✅ Anexo RIDAA cerrado');
    };
    
    // ============================================================
    // CERRAR CON TECLA ESC
    // ============================================================
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('anexoRidaaModal');
            if (modal && modal.classList.contains('show')) {
                cerrarAnexoRidaa();
            }
            
            const dropdown = document.getElementById('ridaaAnexosDropdown');
            if (dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });
    
    // ============================================================
    // EXPORTAR FUNCIONES
    // ============================================================
    
    window.AnexosRidaaHandler = {
        toggleAnexosRidaa,
        abrirAnexoRidaa,
        minimizarAnexoRidaa,
        cerrarAnexoRidaa,
        getEstado: () => ({
            modalActual: modalAnexoActual,
            minimizado: anexoMinimizado
        })
    };
    
    console.log('✅ Anexos RIDAA Handler cargado correctamente');
    
})();