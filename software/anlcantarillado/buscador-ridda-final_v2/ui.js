// Mostrar resultados
function mostrarResultados(resultados, termino) {
    const initialView = document.getElementById('initialView');
    const searchResults = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const searchStats = document.getElementById('searchStats');

    initialView.style.display = 'none';
    noResults.style.display = 'none';

    if (resultados.length === 0) {
        searchResults.style.display = 'none';
        noResults.style.display = 'block';
        searchStats.textContent = 'No se encontraron resultados';
        return;
    }

    searchResults.style.display = 'block';
    searchStats.textContent = `${resultados.length} resultado${resultados.length !== 1 ? 's' : ''} encontrado${resultados.length !== 1 ? 's' : ''}`;

    let html = '';
    resultados.forEach(resultado => {
        if (resultado.tipo === 'definicion') {
            html += `
                <div class="result-item">
                    <div class="result-header">
                        <div>
                            <div class="result-title">${resultado.definicionNumero}. ${resultado.definicionTitulo}</div>
                            <div class="result-location">${resultado.articulo} - ${resultado.titulo}</div>
                        </div>
                        <span class="result-badge">Definición</span>
                    </div>
                    <div class="result-content">
                        ${resultado.contenido}
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="result-item">
                    <div class="result-header">
                        <div>
                            <div class="result-title">${resultado.articulo}</div>
                            <div class="result-location">${resultado.titulo}</div>
                        </div>
                        <span class="result-badge">Artículo</span>
                    </div>
                    <div class="result-content">
                        ${resultado.contenido}
                    </div>
                </div>
            `;
        }
    });

    searchResults.innerHTML = html;
}

// Mostrar vista inicial
function mostrarVistaInicial() {
    document.getElementById('initialView').style.display = 'block';
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('noResults').style.display = 'none';
    document.getElementById('searchStats').textContent = '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarReglamento();

    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearButton');

    // Búsqueda en tiempo real con debounce
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        const valor = e.target.value;
        
        // Mostrar/ocultar botón de limpiar
        clearButton.style.display = valor ? 'flex' : 'none';

        // Debounce para no buscar en cada tecla
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            buscar(valor);
        }, 300);
    });

    // Botón limpiar
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        clearButton.style.display = 'none';
        mostrarVistaInicial();
        searchInput.focus();
    });

    // Búsquedas rápidas
    document.querySelectorAll('.quick-search-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const termino = btn.getAttribute('data-search');
            searchInput.value = termino;
            clearButton.style.display = 'flex';
            buscar(termino);
            
            // Scroll suave hacia los resultados
            setTimeout(() => {
                window.scrollTo({
                    top: document.querySelector('.search-section').offsetTop - 20,
                    behavior: 'smooth'
                });
            }, 100);
        });
    });

    // Enter para buscar
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            buscar(searchInput.value);
        }
    });
});