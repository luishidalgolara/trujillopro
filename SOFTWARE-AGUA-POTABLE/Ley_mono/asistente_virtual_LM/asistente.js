// asistente.js - LÓGICA COMPLETA CHAT + FAQ - CORREGIDO

// ============================================================
// DATOS Y ESTADO
// ============================================================
let preguntasRespuestas = [];
let chatHistory = [];
let preguntasFiltradas = [];
let categoriaActual = 'todas';
let ordenActual = 'alfabetico';

// ============================================================
// ELEMENTOS DEL DOM - CHAT
// ============================================================
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const btnSend = document.getElementById('btnSend');
const suggestionsScroll = document.getElementById('suggestionsScroll');
const typingIndicator = document.getElementById('typingIndicator');

// ============================================================
// ELEMENTOS DEL DOM - FAQ
// ============================================================
const searchFaq = document.getElementById('searchFaq');
const btnClearSearchFaq = document.getElementById('btnClearSearchFaq');
const categoriasButtonsFaq = document.getElementById('categoriasButtonsFaq');
const ordenSelectFaq = document.getElementById('ordenSelectFaq');
const contadorResultadosFaq = document.getElementById('contadorResultadosFaq');
const btnExpandirTodoFaq = document.getElementById('btnExpandirTodoFaq');
const btnColapsarTodoFaq = document.getElementById('btnColapsarTodoFaq');
const faqLista = document.getElementById('faqLista');
const noResultsFaq = document.getElementById('noResultsFaq');
const btnResetBusquedaFaq = document.getElementById('btnResetBusquedaFaq');

// ============================================================
// ELEMENTOS DEL DOM - MODAL
// ============================================================
const btnInfo = document.getElementById('btnInfo');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🤖 Asistente Virtual iniciando...');
    
    // Cargar datos primero
    await cargarDatos();
    
    // Verificar que se cargaron los datos
    if (preguntasRespuestas.length === 0) {
        console.error('❌ No se cargaron las preguntas');
        return;
    }
    
    console.log(`✅ ${preguntasRespuestas.length} preguntas cargadas correctamente`);
    
    // Inicializar Chat
    generarSugerencias();
    
    // Inicializar FAQ
    generarCategoriasFaq();
    preguntasFiltradas = [...preguntasRespuestas];
    ordenarPreguntasFaq();
    renderizarPreguntasFaq();
    actualizarContadorFaq();
    
    // Event Listeners - Chat
    if (btnSend) btnSend.addEventListener('click', enviarMensaje);
    if (userInput) {
        userInput.addEventListener('keydown', manejarTeclas);
        userInput.addEventListener('input', ajustarAlturaTextarea);
    }
    
    // Event Listeners - FAQ
    if (searchFaq) searchFaq.addEventListener('input', manejarBusquedaFaq);
    if (btnClearSearchFaq) btnClearSearchFaq.addEventListener('click', limpiarBusquedaFaq);
    if (ordenSelectFaq) ordenSelectFaq.addEventListener('change', cambiarOrdenFaq);
    if (btnExpandirTodoFaq) btnExpandirTodoFaq.addEventListener('click', expandirTodoFaq);
    if (btnColapsarTodoFaq) btnColapsarTodoFaq.addEventListener('click', colapsarTodoFaq);
    if (btnResetBusquedaFaq) btnResetBusquedaFaq.addEventListener('click', resetearTodoFaq);
    
    // Event Listeners - Modal
    if (btnInfo) btnInfo.addEventListener('click', () => modalOverlay.style.display = 'flex');
    if (modalClose) modalClose.addEventListener('click', () => modalOverlay.style.display = 'none');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.style.display = 'none';
        });
    }
    
    console.log('✅ Asistente Virtual completamente inicializado');
});

// ============================================================
// CARGAR DATOS
// ============================================================
async function cargarDatos() {
    try {
        console.log('📥 Cargando preguntas-respuestas-ACTUALIZADO.json...');
        const response = await fetch('preguntas-respuestas-ACTUALIZADO.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.preguntas_respuestas || !Array.isArray(data.preguntas_respuestas)) {
            throw new Error('Formato de datos incorrecto');
        }
        
        preguntasRespuestas = data.preguntas_respuestas;
        console.log(`✅ ${preguntasRespuestas.length} preguntas cargadas exitosamente`);
        
    } catch (error) {
        console.error('❌ Error cargando datos:', error);
        console.error('Por favor verifica que el archivo preguntas-respuestas-ACTUALIZADO.json existe en la carpeta correcta');
        
        // Mostrar error en el FAQ
        if (faqLista) {
            faqLista.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #ef4444;">
                    <h3>❌ Error al cargar las preguntas</h3>
                    <p style="color: #999; margin-top: 10px;">
                        No se pudo cargar el archivo preguntas-respuestas-ACTUALIZADO.json<br>
                        Por favor verifica que el archivo existe en la carpeta correcta.
                    </p>
                </div>
            `;
        }
        
        preguntasRespuestas = [];
    }
}

// ============================================================
// TABS
// ============================================================
function cambiarTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tab === 'chat') {
        document.getElementById('tabChat').classList.add('active');
        document.getElementById('chatTabContent').classList.add('active');
    } else if (tab === 'faq') {
        document.getElementById('tabFaq').classList.add('active');
        document.getElementById('faqTabContent').classList.add('active');
    } else if (tab === 'formularios') {
        document.getElementById('tabFormularios').classList.add('active');
        document.getElementById('formulariosTabContent').classList.add('active');
    }
}

// ============================================================
// CHAT - SUGERENCIAS
// ============================================================
function generarSugerencias() {
    if (!suggestionsScroll || preguntasRespuestas.length === 0) return;
    
    const preguntasSugeridas = preguntasRespuestas
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);
    
    suggestionsScroll.innerHTML = '';
    
    preguntasSugeridas.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.textContent = item.pregunta_corta;
        btn.addEventListener('click', () => {
            userInput.value = item.pregunta;
            enviarMensaje();
        });
        suggestionsScroll.appendChild(btn);
    });
}

// ============================================================
// CHAT - ENVIAR MENSAJE
// ============================================================
async function enviarMensaje() {
    if (!userInput) return;
    
    const mensaje = userInput.value.trim();
    if (!mensaje) return;
    
    agregarMensaje(mensaje, 'user');
    userInput.value = '';
    ajustarAlturaTextarea();
    chatHistory.push({ role: 'user', content: mensaje });
    
    mostrarTyping();
    await delay(800);
    
    const respuesta = buscarRespuesta(mensaje);
    ocultarTyping();
    agregarMensaje(respuesta, 'bot');
    chatHistory.push({ role: 'bot', content: respuesta });
    scrollToBottom();
}

// ============================================================
// CHAT - BUSCAR RESPUESTA
// ============================================================
function buscarRespuesta(pregunta) {
    if (preguntasRespuestas.length === 0) {
        return "❌ No se han cargado las preguntas. Por favor recarga la página.";
    }
    
    const preguntaLower = pregunta.toLowerCase();
    let mejorCoincidencia = null;
    let mejorPuntaje = 0;
    
    preguntasRespuestas.forEach(item => {
        let puntaje = 0;
        
        if (preguntaLower.includes(item.pregunta.toLowerCase()) || 
            item.pregunta.toLowerCase().includes(preguntaLower)) {
            puntaje += 10;
        }
        
        item.keywords.forEach(keyword => {
            if (preguntaLower.includes(keyword.toLowerCase())) {
                puntaje += 2;
            }
        });
        
        if (puntaje > mejorPuntaje) {
            mejorPuntaje = puntaje;
            mejorCoincidencia = item;
        }
    });
    
    if (mejorCoincidencia && mejorPuntaje >= 2) {
        return mejorCoincidencia.respuesta;
    }
    
    return "🤔 No encontré una respuesta exacta.\n\n💡 Te recomiendo:\n• Cambiar a la pestaña 'Todas las Preguntas' para explorar las 85 preguntas disponibles\n• Usar el buscador y filtros\n• Reformular tu pregunta";
}

// ============================================================
// CHAT - AGREGAR MENSAJE
// ============================================================
function agregarMensaje(texto, tipo) {
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${tipo}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${tipo === 'bot' ? '🤖' : '👤'}</div>
        <div class="message-content">
            <div class="message-bubble">${texto.replace(/\n/g, '<br>')}</div>
            <div class="message-time">${obtenerHora()}</div>
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}

// ============================================================
// FAQ - CATEGORÍAS
// ============================================================
function generarCategoriasFaq() {
    if (!categoriasButtonsFaq || preguntasRespuestas.length === 0) return;
    
    const categorias = ['todas', ...new Set(preguntasRespuestas.map(p => p.categoria))];
    
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
    
    categoriasButtonsFaq.innerHTML = '';
    
    categorias.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'categoria-btn';
        if (cat === 'todas') btn.classList.add('active');
        btn.textContent = nombresCategoria[cat] || cat;
        btn.addEventListener('click', () => filtrarPorCategoriaFaq(cat, btn));
        categoriasButtonsFaq.appendChild(btn);
    });
    
    console.log(`✅ ${categorias.length} categorías generadas`);
}

function filtrarPorCategoriaFaq(categoria, btnElement) {
    document.querySelectorAll('.categoria-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    categoriaActual = categoria;
    aplicarFiltrosFaq();
}

// ============================================================
// FAQ - BÚSQUEDA
// ============================================================
function manejarBusquedaFaq(e) {
    const termino = e.target.value.trim();
    if (btnClearSearchFaq) {
        btnClearSearchFaq.style.display = termino ? 'flex' : 'none';
    }
    aplicarFiltrosFaq();
}

function limpiarBusquedaFaq() {
    if (searchFaq) searchFaq.value = '';
    if (btnClearSearchFaq) btnClearSearchFaq.style.display = 'none';
    aplicarFiltrosFaq();
}

function resetearTodoFaq() {
    if (searchFaq) searchFaq.value = '';
    if (btnClearSearchFaq) btnClearSearchFaq.style.display = 'none';
    categoriaActual = 'todas';
    document.querySelectorAll('.categoria-btn').forEach(btn => btn.classList.remove('active'));
    const firstBtn = document.querySelector('.categoria-btn');
    if (firstBtn) firstBtn.classList.add('active');
    aplicarFiltrosFaq();
}

// ============================================================
// FAQ - APLICAR FILTROS
// ============================================================
function aplicarFiltrosFaq() {
    if (preguntasRespuestas.length === 0) {
        console.warn('⚠️ No hay preguntas para filtrar');
        return;
    }
    
    const termino = searchFaq ? searchFaq.value.toLowerCase().trim() : '';
    let resultados = [...preguntasRespuestas];
    
    console.log(`🔍 Aplicando filtros - Categoría: ${categoriaActual}, Término: "${termino}"`);
    
    if (categoriaActual !== 'todas') {
        resultados = resultados.filter(p => p.categoria === categoriaActual);
        console.log(`📂 Después de filtro categoría: ${resultados.length} preguntas`);
    }
    
    if (termino) {
        resultados = resultados.filter(p => {
            return p.pregunta.toLowerCase().includes(termino) ||
                   p.pregunta_corta.toLowerCase().includes(termino) ||
                   p.respuesta.toLowerCase().includes(termino) ||
                   p.keywords.some(k => k.toLowerCase().includes(termino));
        });
        console.log(`🔍 Después de búsqueda: ${resultados.length} preguntas`);
    }
    
    preguntasFiltradas = resultados;
    ordenarPreguntasFaq();
    renderizarPreguntasFaq();
    actualizarContadorFaq();
}

// ============================================================
// FAQ - ORDENAR
// ============================================================
function cambiarOrdenFaq(e) {
    ordenActual = e.target.value;
    console.log(`📊 Cambiando orden a: ${ordenActual}`);
    ordenarPreguntasFaq();
    renderizarPreguntasFaq();
}

function ordenarPreguntasFaq() {
    if (preguntasFiltradas.length === 0) return;
    
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
// FAQ - RENDERIZAR
// ============================================================
function renderizarPreguntasFaq() {
    if (!faqLista || !noResultsFaq) return;
    
    console.log(`📝 Renderizando ${preguntasFiltradas.length} preguntas`);
    
    faqLista.innerHTML = '';
    
    if (preguntasFiltradas.length === 0) {
        faqLista.style.display = 'none';
        noResultsFaq.style.display = 'block';
        console.log('ℹ️ No hay resultados para mostrar');
        return;
    }
    
    faqLista.style.display = 'block';
    noResultsFaq.style.display = 'none';
    
    const nombresCategoria = {
        'requisitos': 'Requisitos', 'habitabilidad': 'Habitabilidad',
        'incendios': 'Incendios', 'estabilidad': 'Estabilidad',
        'proceso': 'Proceso', 'documentos': 'Documentos',
        'costos': 'Costos', 'casos_especiales': 'Especiales',
        'tecnico': 'Técnico', 'general': 'General',
        'plazos': 'Plazos', 'beneficios': 'Beneficios'
    };
    
    preguntasFiltradas.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
            <div class="faq-pregunta">
                <div class="faq-pregunta-contenido">
                    <span class="faq-pregunta-numero">#${p.id}</span>
                    <div class="faq-pregunta-categoria">${nombresCategoria[p.categoria] || p.categoria}</div>
                    <div class="faq-pregunta-texto">${p.pregunta}</div>
                </div>
                <div class="faq-pregunta-icono">▼</div>
            </div>
            <div class="faq-respuesta">
                <div class="faq-respuesta-contenido">
                    <div class="faq-respuesta-texto">${p.respuesta}</div>
                </div>
            </div>
        `;
        
        item.querySelector('.faq-pregunta').addEventListener('click', () => {
            item.classList.toggle('active');
        });
        
        faqLista.appendChild(item);
    });
    
    console.log(`✅ ${preguntasFiltradas.length} preguntas renderizadas exitosamente`);
}

// ============================================================
// FAQ - EXPANDIR/COLAPSAR
// ============================================================
function expandirTodoFaq() {
    document.querySelectorAll('.faq-item').forEach(item => item.classList.add('active'));
}

function colapsarTodoFaq() {
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
}

// ============================================================
// FAQ - CONTADOR
// ============================================================
function actualizarContadorFaq() {
    if (!contadorResultadosFaq) return;
    
    const total = preguntasRespuestas.length;
    const mostrando = preguntasFiltradas.length;
    
    if (mostrando === total) {
        contadorResultadosFaq.textContent = `Mostrando todas las ${total} preguntas`;
    } else {
        contadorResultadosFaq.textContent = `Mostrando ${mostrando} de ${total} preguntas`;
    }
}

// ============================================================
// UTILIDADES
// ============================================================
function mostrarTyping() {
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
        scrollToBottom();
    }
}

function ocultarTyping() {
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
}

function scrollToBottom() {
    if (chatContainer) {
        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
    }
}

function obtenerHora() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function ajustarAlturaTextarea() {
    if (userInput) {
        userInput.style.height = 'auto';
        userInput.style.height = userInput.scrollHeight + 'px';
    }
}

function manejarTeclas(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarMensaje();
    }
}

// ============================================================
// ATAJOS DE TECLADO
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

console.log('📚 Módulo asistente.js cargado - esperando inicialización...');
