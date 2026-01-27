// ley-mono.js - LÓGICA INDEPENDIENTE BUSCADOR LEY DEL MONO

// ============================================================
// ESTADO DEL BUSCADOR
// ============================================================
let currentCategory = 'all';
let searchQuery = '';
let filteredResults = [];

// ============================================================
// ELEMENTOS DEL DOM
// ============================================================
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('resultsContainer');
const resultsCounter = document.getElementById('resultsCounter');
const counterText = document.getElementById('counterText');
const categoryButtons = document.querySelectorAll('.category-btn');

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Buscador Ley del Mono inicializado');
    
    // Mostrar todos los resultados al inicio
    filterAndDisplay();
    
    // Event Listeners
    searchInput.addEventListener('input', handleSearch);
    clearBtn.addEventListener('click', clearSearch);
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', handleCategoryClick);
    });
    
    // Permitir búsqueda con Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});

// ============================================================
// MANEJO DE BÚSQUEDA
// ============================================================
function handleSearch(e) {
    searchQuery = e.target.value.trim().toLowerCase();
    
    // Mostrar/ocultar botón de limpiar
    if (searchQuery.length > 0) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
    
    filterAndDisplay();
}

// ============================================================
// LIMPIAR BÚSQUEDA
// ============================================================
function clearSearch() {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
    filterAndDisplay();
}

// ============================================================
// MANEJO DE CATEGORÍAS
// ============================================================
function handleCategoryClick(e) {
    const category = e.target.dataset.category;
    
    // Actualizar botón activo
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Actualizar categoría actual
    currentCategory = category;
    
    // Filtrar y mostrar
    filterAndDisplay();
}

// ============================================================
// FILTRAR Y MOSTRAR RESULTADOS
// ============================================================
function filterAndDisplay() {
    // Filtrar por categoría
    let results = currentCategory === 'all' 
        ? [...LEY_MONO_DATA] 
        : LEY_MONO_DATA.filter(item => item.category === currentCategory);
    
    // Filtrar por búsqueda
    if (searchQuery.length > 0) {
        results = results.filter(item => {
            const searchableText = `
                ${item.title} 
                ${item.content} 
                ${item.tags.join(' ')}
            `.toLowerCase();
            
            return searchableText.includes(searchQuery);
        });
    }
    
    filteredResults = results;
    
    // Actualizar contador
    updateCounter();
    
    // Renderizar resultados
    renderResults();
}

// ============================================================
// ACTUALIZAR CONTADOR
// ============================================================
function updateCounter() {
    const total = filteredResults.length;
    
    if (searchQuery.length > 0) {
        counterText.textContent = `${total} resultado${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''} para "${searchQuery}"`;
    } else if (currentCategory !== 'all') {
        const categoryName = getCategoryName(currentCategory);
        counterText.textContent = `${total} resultado${total !== 1 ? 's' : ''} en categoría ${categoryName}`;
    } else {
        counterText.textContent = `Mostrando ${total} tema${total !== 1 ? 's' : ''} disponibles`;
    }
}

// ============================================================
// OBTENER NOMBRE DE CATEGORÍA
// ============================================================
function getCategoryName(category) {
    const names = {
        'requisitos': 'Requisitos',
        'plazos': 'Plazos',
        'documentos': 'Documentos',
        'beneficios': 'Beneficios',
        'proceso': 'Proceso'
    };
    return names[category] || 'Todas';
}

// ============================================================
// RENDERIZAR RESULTADOS
// ============================================================
function renderResults() {
    // Limpiar contenedor
    resultsContainer.innerHTML = '';
    
    // Sin resultados
    if (filteredResults.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">No se encontraron resultados</div>
                <div class="no-results-hint">Intenta con otros términos de búsqueda</div>
            </div>
        `;
        return;
    }
    
    // Renderizar cada resultado
    filteredResults.forEach(item => {
        const resultElement = createResultElement(item);
        resultsContainer.appendChild(resultElement);
    });
}

// ============================================================
// CREAR ELEMENTO DE RESULTADO
// ============================================================
function createResultElement(item) {
    const div = document.createElement('div');
    div.className = 'result-item';
    div.setAttribute('data-id', item.id);
    
    // Resaltar texto buscado
    const highlightedTitle = highlightText(item.title, searchQuery);
    const highlightedContent = highlightText(item.content, searchQuery);
    
    // Obtener emoji de categoría
    const categoryEmoji = getCategoryEmoji(item.category);
    
    div.innerHTML = `
        <div class="result-category">
            ${categoryEmoji} ${getCategoryName(item.category)}
        </div>
        <div class="result-title">${highlightedTitle}</div>
        <div class="result-content">${highlightedContent}</div>
        <div class="result-tags">
            ${item.tags.map(tag => `<span class="result-tag">#${tag}</span>`).join('')}
        </div>
    `;
    
    // Event listener para copiar al hacer clic
    div.addEventListener('click', function() {
        copyToClipboard(item);
        showCopyFeedback(div);
    });
    
    return div;
}

// ============================================================
// RESALTAR TEXTO
// ============================================================
function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// ============================================================
// ESCAPE REGEX
// ============================================================
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================================
// OBTENER EMOJI DE CATEGORÍA
// ============================================================
function getCategoryEmoji(category) {
    const emojis = {
        'requisitos': '✅',
        'plazos': '📅',
        'documentos': '📄',
        'beneficios': '💰',
        'proceso': '🔧'
    };
    return emojis[category] || '📋';
}

// ============================================================
// COPIAR AL PORTAPAPELES
// ============================================================
function copyToClipboard(item) {
    const text = `
${item.title}

${item.content}

Categoría: ${getCategoryName(item.category)}
Tags: ${item.tags.map(t => '#' + t).join(', ')}
    `.trim();
    
    // Intentar copiar
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('✅ Texto copiado al portapapeles');
        }).catch(err => {
            console.error('❌ Error al copiar:', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

// ============================================================
// COPIAR FALLBACK (NAVEGADORES ANTIGUOS)
// ============================================================
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        console.log('✅ Texto copiado (fallback)');
    } catch (err) {
        console.error('❌ Error al copiar (fallback):', err);
    }
    
    document.body.removeChild(textArea);
}

// ============================================================
// MOSTRAR FEEDBACK DE COPIA
// ============================================================
function showCopyFeedback(element) {
    const originalBg = element.style.background;
    const originalBorder = element.style.borderLeftColor;
    
    element.style.background = '#065f46';
    element.style.borderLeftColor = '#10b981';
    
    setTimeout(() => {
        element.style.background = originalBg;
        element.style.borderLeftColor = originalBorder;
    }, 500);
}

// ============================================================
// ATAJOS DE TECLADO
// ============================================================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K = Focus en búsqueda
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
    
    // Escape = Limpiar búsqueda
    if (e.key === 'Escape') {
        if (searchQuery.length > 0) {
            clearSearch();
        }
    }
});

// ============================================================
// EXPORTAR FUNCIONES (OPCIONAL)
// ============================================================
window.leyMonoSearch = {
    filter: filterAndDisplay,
    clear: clearSearch,
    getData: () => LEY_MONO_DATA,
    getFiltered: () => filteredResults
};

console.log('✅ Buscador Ley del Mono 20.898 cargado correctamente');