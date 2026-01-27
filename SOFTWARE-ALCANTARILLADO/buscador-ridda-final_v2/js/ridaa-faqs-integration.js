// buscador-ridda-final_v2/js/ridaa-faqs-integration.js
// ============================================================
// INTEGRACIÓN SIMPLIFICADA DE FAQs
// ============================================================

console.log('🔌 Cargando integración FAQs...');

// Esperar a que todo esté listo
setTimeout(function() {
    
    console.log('⏳ Iniciando integración FAQs...');
    
    // 1. Verificar que existan las FAQs
    if (typeof window.RidaaFAQsParte1 === 'undefined' || typeof window.RidaaFAQsParte2 === 'undefined') {
        console.error('❌ FAQs no encontradas');
        return;
    }
    
    console.log('✅ FAQs encontradas');
    
    // 2. Agregar FAQs a RidaaState
    if (typeof window.RidaaState !== 'undefined') {
        
        // Limpiar FAQs duplicadas
        window.RidaaState.allData = window.RidaaState.allData.filter(d => d.tipo !== 'faq');
        
        // Agregar FAQs
        window.RidaaState.allData = window.RidaaState.allData.concat(window.RidaaFAQsParte1);
        window.RidaaState.allData = window.RidaaState.allData.concat(window.RidaaFAQsParte2);
        
        console.log('✅ FAQs agregadas:', window.RidaaFAQsParte1.length + window.RidaaFAQsParte2.length);
    }
    
    // 3. Reemplazar función de búsqueda
    if (typeof window.realizarBusqueda === 'function') {
        
        const busquedaOriginal = window.realizarBusqueda;
        
        window.realizarBusqueda = function(query) {
            console.log('🔍 Búsqueda interceptada:', query);
            
            // Buscar en FAQs
            const faqResults = buscarFAQs(query);
            console.log('📋 FAQs encontradas:', faqResults.length);
            
            // Si hay FAQs, mostrarlas
            if (faqResults.length > 0) {
                
                // Llamar búsqueda original pero interceptar el mostrar
                let resultadosV2 = [];
                let bloqueado = true;
                
                // Guardar original si no existe
                if (!window.mostrarResultadosV2_original) {
                    window.mostrarResultadosV2_original = window.mostrarResultadosV2;
                }
                
                // Bloquear PERMANENTEMENTE mientras hay FAQs
                window.mostrarResultadosV2 = function(resultados) {
                    if (bloqueado) {
                        resultadosV2 = resultados || [];
                        console.log('🔒 Bloqueado mostrar V2, capturados:', resultadosV2.length);
                        return;
                    }
                    // Si no está bloqueado, usar original
                    if (window.mostrarResultadosV2_original) {
                        window.mostrarResultadosV2_original(resultados);
                    }
                };
                
                // Ejecutar búsqueda V2
                busquedaOriginal(query);
                
                // Esperar a que V2 termine (tiene setTimeout de 500ms)
                setTimeout(function() {
                    bloqueado = false;
                    
                    // Combinar y mostrar
                    const todosCombinados = [...faqResults, ...resultadosV2];
                    console.log('📊 Mostrando combinados:', todosCombinados.length);
                    mostrarResultadosCombinados(todosCombinados, query);
                }, 1000);
                
            } else {
                // Sin FAQs, dejar que V2 maneje
                busquedaOriginal(query);
            }
        };
        
        console.log('✅ Búsqueda interceptada correctamente');
    }
    
}, 2000); // Esperar 2 segundos

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

function buscarFAQs(query) {
    if (!window.RidaaState || !window.RidaaState.allData) {
        return [];
    }
    
    const queryNorm = normalizarTexto(query);
    
    return window.RidaaState.allData
        .filter(item => item.tipo === 'faq')
        .filter(item => {
            const titulo = normalizarTexto(item.titulo || '');
            const contenido = normalizarTexto(item.contenido || '');
            const tags = normalizarTexto((item.tags || []).join(' '));
            
            return titulo.includes(queryNorm) || 
                   contenido.includes(queryNorm) || 
                   tags.includes(queryNorm);
        })
        .map(item => ({
            ...item,
            esFAQ: true,
            score: 100
        }));
}

function normalizarTexto(texto) {
    if (!texto) return '';
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function mostrarResultadosCombinados(resultados, query) {
    const container = document.getElementById('ridaaResults');
    const count = document.getElementById('resultCount');
    
    if (!container || !count) return;
    
    count.textContent = resultados.length;
    
    if (resultados.length === 0) {
        container.innerHTML = `
            <div class="ridaa-empty-state">
                <div class="ridaa-empty-icon">🔍</div>
                <p>No se encontraron resultados</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = resultados
        .slice(0, 50)
        .map(item => {
            const badge = item.esFAQ ? '🟣 FAQ' : getBadge(item.tipo);
            const badgeClass = item.esFAQ ? 'badge-faq' : '';
            
            return `
                <div class="ridaa-result-item">
                    <div class="ridaa-result-header">
                        <div class="ridaa-result-title">${item.titulo}</div>
                        <div class="ridaa-result-badge ${badgeClass}">${badge}</div>
                    </div>
                    <div class="ridaa-result-content">
                        ${highlight(item.contenido, query)}
                    </div>
                    <div class="ridaa-result-meta">
                        <span>📍 ${item.seccion || 'General'}</span>
                        ${item.referencia ? `<span>📄 ${item.referencia}</span>` : ''}
                    </div>
                </div>
            `;
        })
        .join('');
}

function getBadge(tipo) {
    const badges = {
        'articulos': 'Artículo',
        'normas': 'Norma',
        'definiciones': 'Definición'
    };
    return badges[tipo] || 'General';
}

function highlight(texto, query) {
    if (!query || query.length < 3) return texto;
    const regex = new RegExp(`(${query})`, 'gi');
    return texto.replace(regex, '<mark>$1</mark>');
}

console.log('✅ Script FAQs integration cargado');