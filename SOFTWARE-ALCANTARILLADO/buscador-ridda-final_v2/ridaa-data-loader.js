// buscador-ridda-final_v2/ridaa-data-loader.js

// ============================================================
// CARGADOR DE DATOS RIDAA - CONECTAR TUS 7 ARCHIVOS
// ============================================================

// INSTRUCCIONES:
// 1. Coloca tus 7 archivos JS/JSON en esta carpeta: buscador-ridda-final_v2/data/
// 2. Actualiza las rutas en RIDAA_DATA_SOURCES
// 3. El sistema cargará automáticamente todos los archivos

const RIDAA_DATA_SOURCES = {
    parte1: 'buscador-ridda-final_v2/data/reglamento_parte1.json',
    parte2: 'buscador-ridda-final_v2/data/reglamento_parte2.json',
    parte3: 'buscador-ridda-final_v2/data/reglamento_parte3.json',
    parte4: 'buscador-ridda-final_v2/data/reglamento_parte4.json',
    parte5: 'buscador-ridda-final_v2/data/reglamento_parte5.json',
    parte6: 'buscador-ridda-final_v2/data/reglamento_parte6.json',
    parte7: 'buscador-ridda-final_v2/data/reglamento_parte7.json'
};

// ============================================================
// CARGAR ARCHIVO JSON
// ============================================================

async function cargarArchivoJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn(`⚠️ No se pudo cargar: ${url}`, error);
        return null;
    }
}

// ============================================================
// CARGAR TODOS LOS ARCHIVOS
// ============================================================

async function cargarTodosDatos() {
    console.log('📂 Cargando datos RIDAA desde archivos externos...');
    
    const resultados = {};
    
    for (const [key, url] of Object.entries(RIDAA_DATA_SOURCES)) {
        console.log(`⏳ Cargando ${key}...`);
        resultados[key] = await cargarArchivoJSON(url);
        
        if (resultados[key]) {
            console.log(`✅ ${key} cargado:`, resultados[key].length || 'OK');
        }
    }
    
    return resultados;
}

// ============================================================
// PROCESAR Y UNIFICAR DATOS
// ============================================================

function procesarDatos(datosRaw) {
    let todosLosDatos = [];
    
    console.log('🔍 INICIANDO PROCESAMIENTO DE DATOS');
    console.log('📦 Claves encontradas:', Object.keys(datosRaw));
    
    // Procesar cada parte del reglamento
    for (let i = 1; i <= 7; i++) {
        const parteClave = `parte${i}`;
        const parte = datosRaw[parteClave];
        
        if (!parte) {
            console.log(`⚠️ ${parteClave} no encontrada`);
            continue;
        }
        
        console.log(`\n📦 Procesando ${parteClave}:`, Object.keys(parte));
        
        // ESTRUCTURA TIPO 1: parte.partes[] → titulos[] / articulos[]
        if (parte.partes && Array.isArray(parte.partes)) {
            console.log(`  ✓ Estructura: partes[] detectada`);
            parte.partes.forEach(seccion => {
                const contexto = { parte: seccion.numero, titulo: seccion.nombre };
                
                // Artículos directos en partes
                if (seccion.articulos) {
                    procesarArticulos(seccion.articulos, contexto, todosLosDatos);
                }
                
                // Títulos dentro de partes
                if (seccion.titulos && Array.isArray(seccion.titulos)) {
                    seccion.titulos.forEach(titulo => {
                        procesarArticulos(titulo.articulos, {
                            ...contexto,
                            titulo: titulo.nombre,
                            numero: titulo.numero
                        }, todosLosDatos);
                    });
                }
            });
        }
        
        // ESTRUCTURA TIPO 2: parte.titulos[] → articulos[] / parrafos[]
        if (parte.titulos && Array.isArray(parte.titulos)) {
            console.log(`  ✓ Estructura: titulos[] detectada`);
            parte.titulos.forEach(titulo => {
                const contextoTitulo = {
                    parte: titulo.numero,
                    titulo: titulo.nombre,
                    numero: titulo.numero
                };
                
                // Artículos directos en títulos
                if (titulo.articulos && Array.isArray(titulo.articulos)) {
                    procesarArticulos(titulo.articulos, contextoTitulo, todosLosDatos);
                }
                
                // Párrafos dentro de títulos
                if (titulo.parrafos && Array.isArray(titulo.parrafos)) {
                    titulo.parrafos.forEach(parrafo => {
                        procesarArticulos(parrafo.articulos, {
                            ...contextoTitulo,
                            parrafo: parrafo.nombre,
                            numeroParrafo: parrafo.numero
                        }, todosLosDatos);
                    });
                }
            });
        }
        
        // ESTRUCTURA TIPO 3: parte.continuacion_articulo_48
        if (parte.continuacion_articulo_48) {
            console.log(`  ✓ Estructura: continuacion_articulo_48 detectada`);
            const cont = parte.continuacion_articulo_48;
            if (cont.modelos_adicionales && Array.isArray(cont.modelos_adicionales)) {
                cont.modelos_adicionales.forEach(modelo => {
                    todosLosDatos.push({
                        tipo: 'articulos',
                        titulo: `${cont.numero} - ${modelo.nombre}`,
                        contenido: modelo.contenido,
                        seccion: modelo.tipo || modelo.nombre,
                        parte: `Parte ${i}`,
                        tags: [cont.numero, modelo.nombre, modelo.tipo].filter(Boolean)
                    });
                });
            }
        }
        
        // ESTRUCTURA TIPO 4: parte.articulos_transitorios
        if (parte.articulos_transitorios && Array.isArray(parte.articulos_transitorios)) {
            console.log(`  ✓ Estructura: articulos_transitorios detectada`);
            parte.articulos_transitorios.forEach((art, idx) => {
                todosLosDatos.push({
                    tipo: 'articulos',
                    titulo: art.numero || `Artículo Transitorio ${idx + 1}`,
                    contenido: art.texto || '',
                    seccion: 'Disposiciones Transitorias',
                    parte: 'Artículos Transitorios',
                    tags: [art.numero, 'transitorio'].filter(Boolean)
                });
            });
        }
        
        // ESTRUCTURA TIPO 5: parte.parrafos[] (sin titulos)
        if (parte.parrafos && Array.isArray(parte.parrafos) && !parte.titulos) {
            console.log(`  ✓ Estructura: parrafos[] directos detectada`);
            parte.parrafos.forEach(parrafo => {
                procesarArticulos(parrafo.articulos, {
                    parte: parte.parte || `Parte ${i}`,
                    parrafo: parrafo.nombre,
                    numero: parrafo.numero
                }, todosLosDatos);
            });
        }
    }
    
    // Asignar IDs únicos
    todosLosDatos = todosLosDatos.map((item, index) => ({
        ...item,
        id: item.id || (index + 1)
    }));
    
    console.log(`\n✅ PROCESAMIENTO COMPLETADO`);
    console.log(`📊 Total items: ${todosLosDatos.length}`);
    console.log(`   - Artículos: ${todosLosDatos.filter(i => i.tipo === 'articulos').length}`);
    console.log(`   - Definiciones: ${todosLosDatos.filter(i => i.tipo === 'definiciones').length}`);
    
    // Debug detallado
    console.log('\n📋 MUESTRA DE ITEMS:');
    todosLosDatos.slice(0, 10).forEach((item, i) => {
        console.log(`   ${i+1}. [${item.tipo}] ${item.titulo.substring(0, 50)}...`);
    });
    
    return todosLosDatos;
}

// FUNCIÓN AUXILIAR MEJORADA
function procesarArticulos(articulos, contexto, todosLosDatos) {
    if (!articulos || !Array.isArray(articulos)) return;
    
    articulos.forEach((articulo, idx) => {
        let contenidoCompleto = articulo.texto || '';
        
        // EXTRAER DEFINICIONES
        if (articulo.definiciones && Array.isArray(articulo.definiciones)) {
            articulo.definiciones.forEach(def => {
                todosLosDatos.push({
                    tipo: 'definiciones',
                    titulo: def.titulo || `Definición ${def.numero || def.letra}`,
                    contenido: def.contenido || '',
                    articulo: articulo.numero || '',
                    seccion: contexto.titulo || contexto.parrafo || '',
                    parte: contexto.parte || '',
                    tags: [def.titulo, articulo.numero, contexto.titulo].filter(Boolean)
                });
            });
        }
        
        // PROCESAR CAMPOS COMPLEJOS
        const camposComplejos = [
            'requisitos', 'condiciones', 'caracteristicas', 'disposiciones',
            'pruebas', 'situaciones', 'modelos', 'especificaciones',
            'pautas', 'alternativas', 'subcondiciones', 'items'
        ];
        
        camposComplejos.forEach(campo => {
            if (articulo[campo]) {
                contenidoCompleto += '\n' + extraerTexto(articulo[campo]);
            }
        });
        
        // CAMPOS ADICIONALES
        ['informacion', 'etapas', 'antecedentes', 'contenido', 'planos', 
         'especificaciones_tecnicas', 'nota'].forEach(campo => {
            if (articulo[campo]) {
                contenidoCompleto += '\n' + extraerTexto(articulo[campo]);
            }
        });
        
        // AGREGAR ARTÍCULO
        todosLosDatos.push({
            tipo: 'articulos',
            titulo: articulo.numero || `Artículo ${idx + 1}`,
            contenido: contenidoCompleto.trim(),
            seccion: `${contexto.numeroParrafo || contexto.numero || ''} ${contexto.parrafo || contexto.titulo || ''}`.trim(),
            parte: contexto.parte || '',
            tags: [
                articulo.numero,
                contexto.titulo,
                contexto.parrafo,
                contexto.numero,
                contexto.numeroParrafo
            ].filter(Boolean)
        });
    });
}

// FUNCIÓN PARA EXTRAER TEXTO DE OBJETOS COMPLEJOS
function extraerTexto(obj) {
    if (typeof obj === 'string') return obj;
    if (Array.isArray(obj)) {
        return obj.map(item => extraerTexto(item)).join('\n');
    }
    if (typeof obj === 'object' && obj !== null) {
        let texto = '';
        Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string') {
                texto += value + '\n';
            } else if (typeof value === 'object') {
                texto += extraerTexto(value) + '\n';
            }
        });
        return texto;
    }
    return '';
}

// ============================================================
// INIT CARGA DE DATOS
// ============================================================

async function initCargaDatos() {
    try {
        // Esperar a que RidaaState esté disponible
        let intentos = 0;
        while (!window.RidaaState && intentos < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            intentos++;
        }
        
        if (!window.RidaaState) {
            console.error('❌ RidaaState no está disponible después de 5 segundos');
            return [];
        }
        
        console.log('🚀 Iniciando carga de datos RIDAA...');
        
        const datosRaw = await cargarTodosDatos();
        const datosProcesados = procesarDatos(datosRaw);
        
        // Actualizar el estado global del buscador
        window.RidaaState.allData = datosProcesados;
        console.log('✅ Datos cargados en RidaaState:', window.RidaaState.allData.length, 'items');
        
        return datosProcesados;
        
    } catch (error) {
        console.error('❌ Error cargando datos RIDAA:', error);
        return [];
    }
}

// ============================================================
// RECARGAR DATOS MANUALMENTE
// ============================================================

window.recargarDatosRidaa = function() {
    console.log('🔄 Recargando datos RIDAA...');
    initCargaDatos();
};

// ============================================================
// EXPORTAR FUNCIONES
// ============================================================

window.RidaaDataLoader = {
    cargarArchivoJSON,
    cargarTodosDatos,
    procesarDatos,
    initCargaDatos,
    SOURCES: RIDAA_DATA_SOURCES
};

// ============================================================
// AUTO-INIT
// ============================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCargaDatos);
} else {
    initCargaDatos();
}