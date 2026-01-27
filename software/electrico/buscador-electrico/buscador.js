/* ============================================
   BUSCADOR NORMATIVA ELÉCTRICA - LÓGICA
   ============================================ */

// ELEMENTOS DEL DOM
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const filtrosBtns = document.querySelectorAll('.filtro-btn');
const resultadosContainer = document.getElementById('resultadosContainer');
const resultadosList = document.getElementById('resultadosList');
const emptyMessage = document.getElementById('emptyMessage');
const loadingMessage = document.getElementById('loadingMessage');

// SECCIONES
const requisitosBasicos = document.getElementById('requisitosBasicos');
const circuitosTipicos = document.getElementById('circuitosTipicos');
const diametrosDucto = document.getElementById('diametrosDucto');

// ESTADO
let filtroActivo = 'all';
let datosNormativa = [];
let datosCompletos = false;

// RUTAS DE LOS ARCHIVOS JSON
const archivosJSON = [
    '../norma-electrica-4-2003/parte-1-seccion-1-4.json',
    '../norma-electrica-4-2003/parte-2-seccion-5-6.json',
    '../norma-electrica-4-2003/parte-3-seccion-6-7-8.json',
    '../norma-electrica-4-2003/parte-4-seccion-8_1-8_2_0.json',
    '../norma-electrica-4-2003/parte-5-seccion-8_2_1-8_2_11.json',
    '../norma-electrica-4-2003/parte-6-seccion-8_2_12-8_2_20.json',
    '../norma-electrica-4-2003/parte-7-seccion-8_2_21-11.json',
    '../norma-electrica-4-2003/parte-8-seccion-11_12.json',
    '../norma-electrica-4-2003/parte-9-seccion-12_13_14_15.json',
    '../norma-electrica-4-2003/parte-10-seccion-15_16_17_18_19.json',
    '../norma-electrica-4-2003/apendices-completos.json'
];

// ============================================
// CARGA DE DATOS
// ============================================

async function cargarDatosNormativa() {
    try {
        loadingMessage.style.display = 'block';
        console.log('📥 Cargando archivos de normativa...');
        
        const promesas = archivosJSON.map(archivo => 
            fetch(archivo)
                .then(res => res.json())
                .catch(err => {
                    console.warn(`⚠️ Error cargando ${archivo}:`, err);
                    return null;
                })
        );
        
        const resultados = await Promise.all(promesas);
        
        // Procesar cada archivo JSON
        resultados.forEach((datos, index) => {
            if (datos) {
                procesarJSON(datos, archivosJSON[index]);
            }
        });
        
        datosCompletos = true;
        loadingMessage.style.display = 'none';
        console.log(`✅ ${datosNormativa.length} elementos cargados`);
        
    } catch (error) {
        console.error('❌ Error cargando normativa:', error);
        loadingMessage.innerHTML = '<p style="color: #ff4444;">Error al cargar la normativa</p>';
    }
}

function procesarJSON(datos, archivo) {
    if (!datos) return;
    
    const nombreArchivo = archivo.split('/').pop();
    
    // Procesar según la estructura
    if (datos.subsecciones) {
        procesarSubsecciones(datos.subsecciones, datos.seccion || nombreArchivo);
    }
    
    if (datos.apendices) {
        procesarApendices(datos.apendices);
    }
}

function procesarSubsecciones(subsecciones, seccionPadre) {
    subsecciones.forEach(subseccion => {
        // Agregar la subsección completa
        if (subseccion.titulo) {
            datosNormativa.push({
                tipo: 'subseccion',
                numero: subseccion.numero,
                titulo: subseccion.titulo,
                seccion: seccionPadre,
                contenido: subseccion.contenido || ''
            });
        }
        
        // Procesar artículos
        if (subseccion.articulos) {
            subseccion.articulos.forEach(art => {
                datosNormativa.push({
                    tipo: 'articulo',
                    numero: art.numero,
                    contenido: art.contenido,
                    seccion: `${seccionPadre} - ${subseccion.numero}`
                });
            });
        }
        
        // Procesar tablas
        if (subseccion.tablas) {
            subseccion.tablas.forEach(tabla => {
                datosNormativa.push({
                    tipo: 'tabla',
                    numero: tabla.numero,
                    titulo: tabla.titulo,
                    seccion: `${seccionPadre} - ${subseccion.numero}`,
                    datos: tabla.datos
                });
            });
        }
        
        // Recursivo para subsecciones anidadas
        if (subseccion.subsecciones) {
            procesarSubsecciones(subseccion.subsecciones, `${seccionPadre} - ${subseccion.numero}`);
        }
    });
}

function procesarApendices(apendices) {
    apendices.forEach(apendice => {
        datosNormativa.push({
            tipo: 'apendice',
            numero: apendice.numero,
            titulo: apendice.titulo,
            seccion: 'APÉNDICES',
            contenido: JSON.stringify(apendice.contenido || apendice.tabla || '')
        });
    });
}

// ============================================
// EVENTOS
// ============================================

// Búsqueda en tiempo real
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    if (query.length > 0) {
        clearBtn.classList.add('visible');
    } else {
        clearBtn.classList.remove('visible');
    }
    
    if (query.length >= 2) {
        buscar(query);
    } else {
        mostrarTodasSecciones();
        ocultarResultados();
    }
});

// Limpiar búsqueda
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.remove('visible');
    mostrarTodasSecciones();
    ocultarResultados();
    searchInput.focus();
});

// Filtros rápidos
filtrosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filtrosBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtroActivo = btn.dataset.filter;
        aplicarFiltro(filtroActivo);
    });
});

// ============================================
// FUNCIONES DE BÚSQUEDA
// ============================================

function buscar(query) {
    if (!datosCompletos) {
        console.log('⏳ Esperando carga de datos...');
        return;
    }
    
    const resultados = [];
    const queryLower = query.toLowerCase();
    
    // Buscar en todos los datos cargados
    datosNormativa.forEach(item => {
        let coincide = false;
        
        // Buscar en título
        if (item.titulo && item.titulo.toLowerCase().includes(queryLower)) {
            coincide = true;
        }
        
        // Buscar en contenido
        if (item.contenido && item.contenido.toLowerCase().includes(queryLower)) {
            coincide = true;
        }
        
        // Buscar en número
        if (item.numero && item.numero.toLowerCase().includes(queryLower)) {
            coincide = true;
        }
        
        if (coincide) {
            resultados.push(item);
        }
    });
    
    // Limitar resultados a 50
    const resultadosLimitados = resultados.slice(0, 50);
    
    mostrarResultados(resultadosLimitados, query);
}

function mostrarResultados(resultados, query) {
    ocultarTodasSecciones();
    
    if (resultados.length === 0) {
        resultadosContainer.style.display = 'none';
        emptyMessage.style.display = 'block';
        return;
    }
    
    emptyMessage.style.display = 'none';
    resultadosContainer.style.display = 'block';
    
    resultadosList.innerHTML = '';
    
    resultados.forEach(resultado => {
        const item = document.createElement('div');
        item.className = 'resultado-item';
        
        // AGREGAR EVENTO CLICK
        item.onclick = () => abrirModalDetalle(resultado);
        
        const titulo = document.createElement('div');
        titulo.className = 'titulo';
        
        let tituloTexto = '';
        if (resultado.numero) {
            tituloTexto += `${resultado.numero}: `;
        }
        if (resultado.titulo) {
            tituloTexto += resultado.titulo;
        } else {
            tituloTexto += resultado.contenido ? resultado.contenido.substring(0, 100) + '...' : 'Sin título';
        }
        
        titulo.innerHTML = resaltarTexto(tituloTexto, query);
        
        const descripcion = document.createElement('div');
        descripcion.className = 'descripcion';
        if (resultado.contenido && resultado.contenido.length > 0) {
            const textoCorto = resultado.contenido.substring(0, 150) + '...';
            descripcion.innerHTML = resaltarTexto(textoCorto, query);
        }
        
        const tag = document.createElement('span');
        tag.className = 'seccion-tag';
        tag.textContent = `${resultado.tipo.toUpperCase()} - ${resultado.seccion}`;
        
        item.appendChild(titulo);
        if (descripcion.innerHTML) {
            item.appendChild(descripcion);
        }
        item.appendChild(tag);
        
        resultadosList.appendChild(item);
    });
}

// ============================================
// FUNCIONES DEL MODAL
// ============================================

function abrirModalDetalle(item) {
    const modal = document.getElementById('modalDetalle');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalContenido = document.getElementById('modalContenido');
    
    // Construir título
    let titulo = '';
    if (item.numero) {
        titulo += `${item.numero}: `;
    }
    if (item.titulo) {
        titulo += item.titulo;
    } else {
        titulo += item.tipo.toUpperCase();
    }
    
    modalTitulo.textContent = titulo;
    
    // Construir contenido
    let contenidoHTML = '';
    
    // Sección
    contenidoHTML += `
        <div class="detalle-seccion">
            <span class="detalle-label">📍 Sección:</span>
            <div class="detalle-texto">${item.seccion}</div>
        </div>
    `;
    
    // Tipo
    contenidoHTML += `
        <div class="detalle-seccion">
            <span class="detalle-label">📋 Tipo:</span>
            <div class="detalle-texto">${item.tipo.toUpperCase()}</div>
        </div>
    `;
    
    // Contenido
    if (item.contenido && item.contenido.length > 0) {
        // Si es JSON (tabla), intentar parsearlo
        let contenidoFormateado = item.contenido;
        
        try {
            const jsonData = JSON.parse(item.contenido);
            if (typeof jsonData === 'object') {
                contenidoFormateado = '<pre style="color: #00d4ff; font-size: 12px; overflow-x: auto;">' + 
                                     JSON.stringify(jsonData, null, 2) + '</pre>';
            }
        } catch (e) {
            // No es JSON, mostrar como texto
            contenidoFormateado = item.contenido.replace(/\n/g, '<br>');
        }
        
        contenidoHTML += `
            <div class="detalle-seccion">
                <span class="detalle-label">📄 Contenido:</span>
                <div class="detalle-texto">${contenidoFormateado}</div>
            </div>
        `;
    }
    
    // Si tiene datos de tabla
    if (item.datos && Array.isArray(item.datos)) {
        contenidoHTML += `
            <div class="detalle-seccion">
                <span class="detalle-label">📊 Datos de Tabla:</span>
                <div class="detalle-texto">
                    <table class="detalle-tabla">
                        ${generarTablaHTML(item.datos)}
                    </table>
                </div>
            </div>
        `;
    }
    
    modalContenido.innerHTML = contenidoHTML;
    modal.classList.add('active');
}

function cerrarModalDetalle() {
    const modal = document.getElementById('modalDetalle');
    modal.classList.remove('active');
}

function generarTablaHTML(datos) {
    if (!datos || datos.length === 0) return '';
    
    const primerElemento = datos[0];
    const columnas = Object.keys(primerElemento);
    
    let html = '<thead><tr>';
    columnas.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    datos.forEach(fila => {
        html += '<tr>';
        columnas.forEach(col => {
            html += `<td>${fila[col] || ''}</td>`;
        });
        html += '</tr>';
    });
    
    html += '</tbody>';
    return html;
}

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cerrarModalDetalle();
    }
});

function resaltarTexto(texto, query) {
    if (!texto) return '';
    const regex = new RegExp(`(${query})`, 'gi');
    return texto.replace(regex, '<span class="highlight">$1</span>');
}

// ============================================
// FUNCIONES DE FILTROS
// ============================================

function aplicarFiltro(filtro) {
    searchInput.value = '';
    clearBtn.classList.remove('visible');
    ocultarResultados();
    
    if (filtro === 'all') {
        mostrarTodasSecciones();
    } else {
        ocultarTodasSecciones();
        
        if (filtro === 'requisitos') {
            requisitosBasicos.classList.remove('hidden');
        } else if (filtro === 'circuitos') {
            circuitosTipicos.classList.remove('hidden');
        } else if (filtro === 'diametros') {
            diametrosDucto.classList.remove('hidden');
        }
    }
}

function mostrarTodasSecciones() {
    requisitosBasicos.classList.remove('hidden');
    circuitosTipicos.classList.remove('hidden');
    diametrosDucto.classList.remove('hidden');
}

function ocultarTodasSecciones() {
    requisitosBasicos.classList.add('hidden');
    circuitosTipicos.classList.add('hidden');
    diametrosDucto.classList.add('hidden');
}

function ocultarResultados() {
    resultadosContainer.style.display = 'none';
    emptyMessage.style.display = 'none';
}

// ============================================
// INICIALIZACIÓN
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Buscador Normativa Eléctrica inicializado');
    cargarDatosNormativa();
});

console.log('✅ Buscador Normativa Eléctrica cargado');