// faq.js - LÓGICA FAQ LEY DEL MONO

// ============================================================
// DATOS Y ESTADO
// ============================================================
let todasLasPreguntas = [];
let preguntasFiltradas = [];
let categoriaActual = 'todas';
let ordenActual = 'alfabetico';

// ============================================================
// ELEMENTOS DEL DOM
// ============================================================
const searchInput = document.getElementById('searchInput');
const btnClearSearch = document.getElementById('btnClearSearch');
const categoriasButtons = document.getElementById('categoriasButtons');
const ordenSelect = document.getElementById('ordenSelect');
const contadorResultados = document.getElementById('contadorResultados');
const btnExpandirTodo = document.getElementById('btnExpandirTodo');
const btnColapsarTodo = document.getElementById('btnColapsarTodo');
const faqLista = document.getElementById('faqLista');
const noResults = document.getElementById('noResults');
const btnResetBusqueda = document.getElementById('btnResetBusqueda');

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('📚 FAQ Ley del Mono iniciando...');
    
    // Cargar datos
    await cargarDatos();
    
    // Generar categorías
    generarCategorias();
    
    // Mostrar todas las preguntas
    preguntasFiltradas = [...todasLasPreguntas];
    ordenarPreguntas();
    renderizarPreguntas();
    
    // Event Listeners
    searchInput.addEventListener('input', manejarBusqueda);
    btnClearSearch.addEventListener('click', limpiarBusqueda);
    ordenSelect.addEventListener('change', cambiarOrden);
    btnExpandirTodo.addEventListener('click', expandirTodo);
    btnColapsarTodo.addEventListener('click', colapsarTodo);
    btnResetBusqueda.addEventListener('click', resetearTodo);
    
    console.log('✅ FAQ listo con 85 preguntas');
});

// ============================================================
// CARGAR DATOS
// ============================================================
async function cargarDatos() {
    try {
        const response = await fetch('../asistente_virtual_LM/preguntas-respuestas-ACTUALIZADO.json');
        const data = await response.json();
        todasLasPreguntas = data.preguntas_respuestas;
        console.log(`📚 ${todasLasPreguntas.length} preguntas cargadas`);
    } catch (error) {
        console.error('❌ Error cargando datos:', error);
        todasLasPreguntas = [];
    }
}

// ============================================================
// GENERAR CATEGORÍAS
// ============================================================
function generarCategorias() {
    const categorias = ['todas', ...new Set(todasLasPreguntas.map(p => p.categoria))];
    
    const nombresCategoria = {
        'todas': '📚 Todas',
        'requisitos': '📋 Requisitos',
        'habitabilidad': '🏠 Habitabilidad',
        'incendios': '🔥 Incendios',
        'estabilidad': '🏗️ Estabilidad',
        'proceso': '⚙️ Proceso',
        'documentos': '📄 Documentos',
        'costos': '💰 Costos',
        'casos_especiales': '⭐ Especiales',
        'tecnico': '🔧 Técnico',
        'general': 'ℹ️ General',
        'plazos': '⏰ Plazos',
        'beneficios': '🎁 Beneficios'
    };
    
    categoriasButtons.innerHTML = '';
    
    categorias.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'categoria-btn';
        if (cat === 'todas') btn.classList.add('active');
        btn.textContent = nombresCategoria[cat] || cat;
        btn.addEventListener('click', () => filtrarPorCategoria(cat, btn));
        categoriasButtons.appendChild(btn);
    });
}

// ============================================================
// FILTRAR POR CATEGORÍA
// ============================================================
function filtrarPorCategoria(categoria, btnElement) {
    // Actualizar botones activos
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    btnElement.classList.add('active');
    
    categoriaActual = categoria;
    aplicarFiltros();
}

// ============================================================
// BÚSQUEDA
// ============================================================
function manejarBusqueda(e) {
    const termino = e.target.value.trim();
    
    if (termino) {
        btnClearSearch.style.display = 'flex';
    } else {
        btnClearSearch.style.display = 'none';
    }
    
    aplicarFiltros();
}

function limpiarBusqueda() {
    searchInput.value = '';
    btnClearSearch.style.display = 'none';
    aplicarFiltros();
}

function resetearTodo() {
    searchInput.value = '';
    btnClearSearch.style.display = 'none';
    categoriaActual = 'todas';
    
    // Resetear botón de categoría
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.categoria-btn').classList.add('active');
    
    aplicarFiltros();
}

// ============================================================
// APLICAR FILTROS
// ============================================================
function aplicarFiltros() {
    const termino = searchInput.value.toLowerCase().trim();
    
    let resultados = [...todasLasPreguntas];
    
    // Filtrar por categoría
    if (categoriaActual !== 'todas') {
        resultados = resultados.filter(p => p.categoria === categoriaActual);
    }
    
    // Filtrar por búsqueda
    if (termino) {
        resultados = resultados.filter(p => {
            return p.pregunta.toLowerCase().includes(termino) ||
                   p.pregunta_corta.toLowerCase().includes(termino) ||
                   p.respuesta.toLowerCase().includes(termino) ||
                   p.keywords.some(k => k.toLowerCase().includes(termino));
        });
    }
    
    preguntasFiltradas = resultados;
    ordenarPreguntas();
    renderizarPreguntas();
    actualizarContador();
}

// ============================================================
// ORDENAR PREGUNTAS
// ============================================================
function cambiarOrden(e) {
    ordenActual = e.target.value;
    ordenarPreguntas();
    renderizarPreguntas();
}

function ordenarPreguntas() {
    switch (ordenActual) {
        case 'alfabetico':
            preguntasFiltradas.sort((a, b) => 
                a.pregunta.localeCompare(b.pregunta, 'es', { sensitivity: 'base' })
            );
            break;
        case 'categoria':
            preguntasFiltradas.sort((a, b) => {
                if (a.categoria === b.categoria) {
                    return a.pregunta.localeCompare(b.pregunta, 'es', { sensitivity: 'base' });
                }
                return a.categoria.localeCompare(b.categoria);
            });
            break;
        case 'id':
            preguntasFiltradas.sort((a, b) => a.id - b.id);
            break;
    }
}

// ============================================================
// RENDERIZAR PREGUNTAS
// ============================================================
function renderizarPreguntas() {
    faqLista.innerHTML = '';
    
    if (preguntasFiltradas.length === 0) {
        faqLista.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    faqLista.style.display = 'block';
    noResults.style.display = 'none';
    
    const nombresCategoria = {
        'requisitos': 'Requisitos',
        'habitabilidad': 'Habitabilidad',
        'incendios': 'Incendios',
        'estabilidad': 'Estabilidad',
        'proceso': 'Proceso',
        'documentos': 'Documentos',
        'costos': 'Costos',
        'casos_especiales': 'Especiales',
        'tecnico': 'Técnico',
        'general': 'General',
        'plazos': 'Plazos',
        'beneficios': 'Beneficios'
    };
    
    preguntasFiltradas.forEach((pregunta, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.dataset.id = pregunta.id;
        
        faqItem.innerHTML = `
            <div class="faq-pregunta">
                <div class="faq-pregunta-contenido">
                    <span class="faq-pregunta-numero">#${pregunta.id}</span>
                    <div class="faq-pregunta-categoria">${nombresCategoria[pregunta.categoria] || pregunta.categoria}</div>
                    <div class="faq-pregunta-texto">${pregunta.pregunta}</div>
                </div>
                <div class="faq-pregunta-icono">▼</div>
            </div>
            <div class="faq-respuesta">
                <div class="faq-respuesta-contenido">
                    <div class="faq-respuesta-texto">${pregunta.respuesta}</div>
                </div>
            </div>
        `;
        
        // Event listener para toggle
        const preguntaElement = faqItem.querySelector('.faq-pregunta');
        preguntaElement.addEventListener('click', () => {
            togglePregunta(faqItem);
        });
        
        faqLista.appendChild(faqItem);
    });
}

// ============================================================
// TOGGLE PREGUNTA
// ============================================================
function togglePregunta(item) {
    const wasActive = item.classList.contains('active');
    
    // Si se quiere comportamiento de acordeón (solo una abierta a la vez)
    // Descomentar las siguientes 3 líneas:
    // document.querySelectorAll('.faq-item').forEach(i => {
    //     i.classList.remove('active');
    // });
    
    if (wasActive) {
        item.classList.remove('active');
    } else {
        item.classList.add('active');
    }
}

// ============================================================
// EXPANDIR/COLAPSAR TODO
// ============================================================
function expandirTodo() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.add('active');
    });
}

function colapsarTodo() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
}

// ============================================================
// ACTUALIZAR CONTADOR
// ============================================================
function actualizarContador() {
    const total = todasLasPreguntas.length;
    const mostrando = preguntasFiltradas.length;
    
    if (mostrando === total) {
        contadorResultados.textContent = `Mostrando todas las ${total} preguntas`;
    } else {
        contadorResultados.textContent = `Mostrando ${mostrando} de ${total} preguntas`;
    }
}

// ============================================================
// EXPORTAR FUNCIONES (OPCIONAL)
// ============================================================
window.faqLeyDelMono = {
    expandirTodo,
    colapsarTodo,
    resetearTodo,
    buscar: (termino) => {
        searchInput.value = termino;
        aplicarFiltros();
    }
};

console.log('✅ FAQ Ley del Mono cargado correctamente');
console.log('📊 Total: 85 preguntas en 12 categorías');