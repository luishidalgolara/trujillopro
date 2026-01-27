// buscador-ridda-final_v2/ridaa-buscador.js

// ============================================================
// ESTADO GLOBAL DEL BUSCADOR RIDAA
// ============================================================

window.RidaaState = {
    isCollapsed: false,
    currentFilter: 'all',
    searchResults: [],
    allData: [],
    isLoading: false,
    searchTimeout: null
};

const RidaaState = window.RidaaState; // Alias para compatibilidad

// ============================================================
// TOGGLE PANEL
// ============================================================

function toggleRidaaPanel() {
    const container = document.getElementById('ridaaContainer');
    const icon = document.getElementById('toggleIcon');
    const showBtn = document.getElementById('ridaaShowBtn');
    
    console.log('Toggle activado. Estado actual:', RidaaState.isCollapsed);
    
    RidaaState.isCollapsed = !RidaaState.isCollapsed;
    
    if (RidaaState.isCollapsed) {
        console.log('Colapsando panel...');
        container.classList.add('collapsed');
        icon.textContent = '▶';
        if (showBtn) {
            showBtn.style.display = 'block';
            console.log('Botón flotante mostrado');
        } else {
            console.error('Botón flotante NO encontrado');
        }
    } else {
        console.log('Expandiendo panel...');
        container.classList.remove('collapsed');
        icon.textContent = '◀';
        if (showBtn) {
            showBtn.style.display = 'none';
            console.log('Botón flotante ocultado');
        }
    }
}

// ============================================================
// FILTRAR POR TIPO
// ============================================================

function filtrarPorTipo(tipo) {
    RidaaState.currentFilter = tipo;
    
    document.querySelectorAll('.ridaa-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-filter="${tipo}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    aplicarFiltros();
}

// ============================================================
// EJECUTAR BÚSQUEDA
// ============================================================

function ejecutarBusqueda() {
    const searchInput = document.getElementById('ridaaSearchInput');
    const query = searchInput.value.trim();
    
    if (query.length === 0) {
        mostrarEstadoVacio();
        return;
    }
    
    if (query.length < 3) {
        return;
    }
    
    clearTimeout(RidaaState.searchTimeout);
    
    RidaaState.searchTimeout = setTimeout(() => {
        realizarBusqueda(query);
    }, 300);
}

// ============================================================
// REALIZAR BÚSQUEDA
// ============================================================

function realizarBusqueda(query) {
    mostrarCargando();
    
    setTimeout(() => {
        const resultados = buscarEnDatos(query);
        RidaaState.searchResults = resultados;
        aplicarFiltros();
    }, 500);
}

// ============================================================
// NORMALIZAR TEXTO (eliminar tildes y caracteres especiales)
// ============================================================

function normalizarTexto(texto) {
    if (!texto) return '';
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // Elimina tildes
}

// ============================================================
// BUSCAR EN DATOS
// ============================================================

function buscarEnDatos(query) {
    const queryNormalizada = normalizarTexto(query);
    
    return RidaaState.allData.filter(item => {
        const tituloNorm = normalizarTexto(item.titulo || '');
        const contenidoNorm = normalizarTexto(item.contenido || '');
        const tagsNorm = normalizarTexto((item.tags || []).join(' '));
        
        return tituloNorm.includes(queryNormalizada) || 
               contenidoNorm.includes(queryNormalizada) || 
               tagsNorm.includes(queryNormalizada);
    });
}

// ============================================================
// APLICAR FILTROS
// ============================================================

function aplicarFiltros() {
    let resultadosFiltrados = RidaaState.searchResults;
    
    if (RidaaState.currentFilter !== 'all') {
        resultadosFiltrados = resultadosFiltrados.filter(item => {
            return item.tipo === RidaaState.currentFilter;
        });
    }
    
    mostrarResultados(resultadosFiltrados);
}

// ============================================================
// MOSTRAR RESULTADOS
// ============================================================

function mostrarResultados(resultados) {
    const resultsContainer = document.getElementById('ridaaResults');
    const resultCount = document.getElementById('resultCount');
    
    resultCount.textContent = resultados.length;
    
    if (resultados.length === 0) {
        resultsContainer.innerHTML = `
            <div class="ridaa-empty-state">
                <div class="ridaa-empty-icon">🔍</div>
                <p>No se encontraron resultados</p>
                <small>Intenta con otros términos de búsqueda</small>
            </div>
        `;
        return;
    }
    
    const searchQuery = document.getElementById('ridaaSearchInput').value.toLowerCase();
    
    resultsContainer.innerHTML = resultados.map(item => {
        const contenidoHighlight = resaltarTexto(item.contenido, searchQuery);
        
        return `
            <div class="ridaa-result-item" onclick="abrirDetalleRidaa(${item.id})">
                <div class="ridaa-result-header">
                    <div class="ridaa-result-title">${item.titulo}</div>
                    <div class="ridaa-result-badge">${obtenerBadgeTexto(item.tipo)}</div>
                </div>
                <div class="ridaa-result-content">
                    ${contenidoHighlight}
                </div>
                <div class="ridaa-result-meta">
                    <span>📑 ${item.seccion || 'General'}</span>
                    <span>📅 ${item.fecha || 'N/A'}</span>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================
// RESALTAR TEXTO
// ============================================================

function resaltarTexto(texto, query) {
    if (!query || query.length < 3) return texto;
    
    const palabras = query.split(' ').filter(p => p.length >= 3);
    let resultado = texto;
    
    palabras.forEach(palabra => {
        // Crear regex que ignore tildes
        const palabraNorm = normalizarTexto(palabra);
        const regex = new RegExp(`([a-záéíóúñü]*${palabraNorm.split('').join('[a-záéíóúñü]*')}[a-záéíóúñü]*)`, 'gi');
        resultado = resultado.replace(regex, '<span class="ridaa-highlight">$1</span>');
    });
    
    return resultado;
}

// ============================================================
// OBTENER BADGE TEXTO
// ============================================================

function obtenerBadgeTexto(tipo) {
    const badges = {
        'articulos': 'Artículo',
        'normas': 'Norma',
        'definiciones': 'Definición',
        'tablas': 'Tabla',
        'figuras': 'Figura'
    };
    
    return badges[tipo] || 'General';
}

// ============================================================
// MOSTRAR ESTADO VACÍO
// ============================================================

function mostrarEstadoVacio() {
    const resultsContainer = document.getElementById('ridaaResults');
    const resultCount = document.getElementById('resultCount');
    
    resultCount.textContent = '0';
    
    resultsContainer.innerHTML = `
        <div class="ridaa-empty-state">
            <div class="ridaa-empty-icon">📖</div>
            <p>Busca información del RIDAA</p>
            <small>Escribe en el buscador para comenzar</small>
        </div>
    `;
}

// ============================================================
// MOSTRAR CARGANDO
// ============================================================

function mostrarCargando() {
    const resultsContainer = document.getElementById('ridaaResults');
    
    resultsContainer.innerHTML = `
        <div class="ridaa-loading">
            <div class="ridaa-spinner"></div>
            <p>Buscando...</p>
        </div>
    `;
}

// ============================================================
// ABRIR DETALLE
// ============================================================

function abrirDetalleRidaa(id) {
    const item = RidaaState.allData.find(d => d.id === id);
    
    if (!item) {
        console.error('Item no encontrado:', id);
        return;
    }
    
    console.log('Abriendo detalle:', item);
    
    // TODO: Implementar modal o panel de detalle
    alert(`Detalle: ${item.titulo}\n\n${item.contenido}`);
}

// ============================================================
// CARGAR DATOS
// ============================================================

function cargarDatosRidaa() {
    // Los datos se cargan automáticamente desde ridaa-data-loader.js
    // Esta función se mantiene por compatibilidad
    console.log('Esperando carga de datos desde ridaa-data-loader.js...');
}

// ============================================================
// INIT BÚSQUEDA EN TIEMPO REAL
// ============================================================

function initBusquedaTiempoReal() {
    const searchInput = document.getElementById('ridaaSearchInput');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        ejecutarBusqueda();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            ejecutarBusqueda();
        }
    });
}

// ============================================================
// INIT BUSCADOR RIDAA
// ============================================================

function initRidaaBuscador() {
    console.log('🔍 Inicializando Buscador RIDAA...');
    
    cargarDatosRidaa();
    initBusquedaTiempoReal();
    mostrarEstadoVacio();
    
    console.log('✅ Buscador RIDAA inicializado correctamente');
}

// ============================================================
// AUTO-INIT
// ============================================================

// Exportar funciones globales para uso en HTML
window.toggleRidaaPanel = toggleRidaaPanel;
window.filtrarPorTipo = filtrarPorTipo;
window.ejecutarBusqueda = ejecutarBusqueda;
window.abrirDetalleRidaa = abrirDetalleRidaa;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRidaaBuscador);
} else {
    initRidaaBuscador();
}