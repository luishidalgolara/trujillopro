// buscador-ridda-final_v2/ridaa-processor-v2.js
// ============================================================
// PROCESADOR V2 - INDEXA TODO: TÍTULOS, PÁRRAFOS, SECCIONES
// ============================================================

(function() {
    'use strict';
    
    console.log('🔧 Cargando Procesador V2...');
    
    // ============================================================
    // CONFIGURACIÓN
    // ============================================================
    
    const RIDAA_DATA_SOURCES = {
        parte1: 'buscador-ridda-final_v2/data/reglamento_parte1.json',
        parte2: 'buscador-ridda-final_v2/data/reglamento_parte2.json',
        parte3: 'buscador-ridda-final_v2/data/reglamento_parte3.json',
        parte4: 'buscador-ridda-final_v2/data/reglamento_parte4.json',
        parte5: 'buscador-ridda-final_v2/data/reglamento_parte5.json',
        parte6: 'buscador-ridda-final_v2/data/reglamento_parte6.json',
        parte7: 'buscador-ridda-final_v2/data/reglamento_parte7.json'
    };
    
    let idCounter = 1;
    
    // ============================================================
    // CARGAR ARCHIVO JSON
    // ============================================================
    
    async function cargarArchivoJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.warn(`⚠️ No se pudo cargar: ${url}`);
            return null;
        }
    }
    
    // ============================================================
    // CARGAR TODOS LOS ARCHIVOS
    // ============================================================
    
    async function cargarTodosDatos() {
        console.log('📂 Cargando datos RIDAA...');
        const resultados = {};
        
        for (const [key, url] of Object.entries(RIDAA_DATA_SOURCES)) {
            resultados[key] = await cargarArchivoJSON(url);
            if (resultados[key]) {
                console.log(`✅ ${key} cargado`);
            }
        }
        
        return resultados;
    }
    
    // ============================================================
    // GENERAR TAGS AUTOMÁTICOS
    // ============================================================
    
    function generarTags(texto, contexto = {}) {
        if (!texto) return [];
        
        const palabrasComunes = [
            'el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'en', 'con', 
            'por', 'para', 'que', 'se', 'su', 'a', 'y', 'o', 'e', 'u'
        ];
        
        const palabras = texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(p => p.length >= 4 && !palabrasComunes.includes(p));
        
        const tagsContexto = Object.values(contexto)
            .filter(v => v && typeof v === 'string')
            .flatMap(v => v.split(/\s+/))
            .filter(p => p.length >= 3);
        
        return [...new Set([...palabras, ...tagsContexto])].slice(0, 10);
    }
    
    // ============================================================
    // EXTRAER TEXTO DE OBJETOS COMPLEJOS
    // ============================================================
    
    function extraerTexto(obj, maxDepth = 3, currentDepth = 0) {
        if (currentDepth >= maxDepth) return '';
        if (typeof obj === 'string') return obj + '\n';
        if (Array.isArray(obj)) {
            return obj.map(item => extraerTexto(item, maxDepth, currentDepth + 1)).join('\n');
        }
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj)
                .map(val => extraerTexto(val, maxDepth, currentDepth + 1))
                .join('\n');
        }
        return '';
    }
    
    // ============================================================
    // PROCESAR SECCIONES (letras a, b, c, g, etc.)
    // ============================================================
    
    function procesarSecciones(array, jerarquia, articuloNum, todosLosDatos) {
        if (!array || !Array.isArray(array)) return;
        
        array.forEach(seccion => {
            const codigo = seccion.codigo || seccion.letra || '';
            const nombre = seccion.nombre || '';
            let contenido = seccion.texto || '';
            
            // Extraer items si existen
            if (seccion.items && Array.isArray(seccion.items)) {
                contenido += '\n' + extraerTexto(seccion.items);
            }
            
            const titulo = nombre ? `${codigo}. ${nombre}` : codigo;
            
            todosLosDatos.push({
                id: idCounter++,
                tipo: 'seccion',
                titulo: titulo,
                contenido: contenido.trim(),
                codigo: codigo,
                jerarquia: [...jerarquia, titulo],
                parte: jerarquia[0] || '',
                tituloParent: jerarquia[1] || '',
                parrafoParent: jerarquia[2] || '',
                articuloParent: articuloNum || '',
                tags: generarTags(titulo + ' ' + contenido, {
                    codigo,
                    nombre,
                    articulo: articuloNum
                })
            });
        });
    }
    
    // ============================================================
    // PROCESAR ARTÍCULOS
    // ============================================================
    
    function procesarArticulos(articulos, jerarquia, todosLosDatos) {
        if (!articulos || !Array.isArray(articulos)) return;
        
        articulos.forEach(articulo => {
            const numero = articulo.numero || '';
            let contenidoCompleto = articulo.texto || '';
            
            // Extraer definiciones
            if (articulo.definiciones && Array.isArray(articulo.definiciones)) {
                articulo.definiciones.forEach(def => {
                    const defTitulo = def.titulo || def.numero || def.letra || '';
                    
                    todosLosDatos.push({
                        id: idCounter++,
                        tipo: 'definiciones',
                        titulo: defTitulo,
                        contenido: def.contenido || '',
                        numero: def.numero || def.letra || '',
                        jerarquia: [...jerarquia, numero, defTitulo],
                        parte: jerarquia[0] || '',
                        tituloParent: jerarquia[1] || '',
                        articuloParent: numero,
                        tags: generarTags(defTitulo + ' ' + (def.contenido || ''), {
                            articulo: numero,
                            titulo: defTitulo
                        })
                    });
                });
            }
            
            // Procesar campos complejos
            const camposComplejos = [
                'requisitos', 'condiciones', 'caracteristicas', 'disposiciones',
                'pruebas', 'situaciones', 'modelos', 'especificaciones',
                'pautas', 'alternativas', 'subcondiciones', 'items',
                'etapas', 'informacion', 'antecedentes', 'contenido',
                'planos', 'especificaciones_tecnicas', 'nota'
            ];
            
            camposComplejos.forEach(campo => {
                if (articulo[campo]) {
                    const textoExtraido = extraerTexto(articulo[campo]);
                    contenidoCompleto += '\n' + textoExtraido;
                    
                    // Si es array de objetos con codigo/letra, procesar como secciones
                    if (Array.isArray(articulo[campo]) && 
                        articulo[campo].length > 0 && 
                        articulo[campo][0].codigo) {
                        procesarSecciones(
                            articulo[campo],
                            [...jerarquia, numero],
                            numero,
                            todosLosDatos
                        );
                    }
                }
            });
            
            // Agregar artículo
            todosLosDatos.push({
                id: idCounter++,
                tipo: 'articulos',
                titulo: numero,
                contenido: contenidoCompleto.trim(),
                numero: numero,
                jerarquia: [...jerarquia, numero],
                parte: jerarquia[0] || '',
                tituloParent: jerarquia[1] || '',
                parrafoParent: jerarquia[2] || '',
                tags: generarTags(numero + ' ' + contenidoCompleto, {
                    numero,
                    titulo: jerarquia[1] || '',
                    parrafo: jerarquia[2] || ''
                })
            });
        });
    }
    
    // ============================================================
    // PROCESAR PÁRRAFOS
    // ============================================================
    
    function procesarParrafos(parrafos, jerarquia, todosLosDatos) {
        if (!parrafos || !Array.isArray(parrafos)) return;
        
        parrafos.forEach(parrafo => {
            const numero = parrafo.numero || '';
            const nombre = parrafo.nombre || '';
            const tituloParrafo = `${numero}: ${nombre}`;
            
            // Agregar párrafo como elemento indexable
            todosLosDatos.push({
                id: idCounter++,
                tipo: 'parrafo',
                titulo: tituloParrafo,
                contenido: `${nombre}. ${extraerTexto(parrafo.articulos || [])}`.substring(0, 500),
                numero: numero,
                nombre: nombre,
                jerarquia: [...jerarquia, tituloParrafo],
                parte: jerarquia[0] || '',
                tituloParent: jerarquia[1] || '',
                tags: generarTags(tituloParrafo, {
                    numero,
                    nombre,
                    titulo: jerarquia[1] || ''
                })
            });
            
            // Procesar artículos del párrafo
            if (parrafo.articulos) {
                procesarArticulos(
                    parrafo.articulos,
                    [...jerarquia, tituloParrafo],
                    todosLosDatos
                );
            }
        });
    }
    
    // ============================================================
    // PROCESAR TÍTULOS
    // ============================================================
    
    function procesarTitulos(titulos, jerarquia, todosLosDatos) {
        if (!titulos || !Array.isArray(titulos)) return;
        
        titulos.forEach(titulo => {
            const numero = titulo.numero || '';
            const nombre = titulo.nombre || '';
            const tituloCompleto = `${numero}: ${nombre}`;
            
            // Agregar título como elemento indexable
            todosLosDatos.push({
                id: idCounter++,
                tipo: 'titulo',
                titulo: tituloCompleto,
                contenido: `${nombre}. ${extraerTexto(titulo.articulos || [])}`.substring(0, 500),
                numero: numero,
                nombre: nombre,
                jerarquia: [...jerarquia, tituloCompleto],
                parte: jerarquia[0] || '',
                tags: generarTags(tituloCompleto, {
                    numero,
                    nombre
                })
            });
            
            // Procesar artículos directos del título
            if (titulo.articulos) {
                procesarArticulos(
                    titulo.articulos,
                    [...jerarquia, tituloCompleto],
                    todosLosDatos
                );
            }
            
            // Procesar párrafos del título
            if (titulo.parrafos) {
                procesarParrafos(
                    titulo.parrafos,
                    [...jerarquia, tituloCompleto],
                    todosLosDatos
                );
            }
        });
    }
    
    // ============================================================
    // PROCESAR DATOS COMPLETOS
    // ============================================================
    
    function procesarDatosCompletos(datosRaw) {
        const todosLosDatos = [];
        idCounter = 1;
        
        console.log('🔍 Iniciando procesamiento V2...');
        
        for (let i = 1; i <= 7; i++) {
            const parteClave = `parte${i}`;
            const parte = datosRaw[parteClave];
            
            if (!parte) continue;
            
            const nombreParte = parte.metadata?.titulo || parte.parte || `Parte ${i}`;
            const jerarquiaBase = [nombreParte];
            
            console.log(`\n📦 Procesando ${parteClave}...`);
            
            // Estructura tipo 1: parte.partes[]
            if (parte.partes && Array.isArray(parte.partes)) {
                parte.partes.forEach(seccion => {
                    const tituloSeccion = `${seccion.numero}: ${seccion.nombre || ''}`;
                    
                    // Agregar sección como título
                    todosLosDatos.push({
                        id: idCounter++,
                        tipo: 'titulo',
                        titulo: tituloSeccion,
                        contenido: extraerTexto(seccion.articulos || []).substring(0, 500),
                        numero: seccion.numero,
                        nombre: seccion.nombre,
                        jerarquia: [...jerarquiaBase, tituloSeccion],
                        parte: nombreParte,
                        tags: generarTags(tituloSeccion, {
                            numero: seccion.numero,
                            nombre: seccion.nombre
                        })
                    });
                    
                    // Procesar artículos
                    if (seccion.articulos) {
                        procesarArticulos(
                            seccion.articulos,
                            [...jerarquiaBase, tituloSeccion],
                            todosLosDatos
                        );
                    }
                    
                    // Procesar títulos
                    if (seccion.titulos) {
                        procesarTitulos(
                            seccion.titulos,
                            [...jerarquiaBase, tituloSeccion],
                            todosLosDatos
                        );
                    }
                });
            }
            
            // Estructura tipo 2: parte.titulos[]
            if (parte.titulos && Array.isArray(parte.titulos)) {
                procesarTitulos(parte.titulos, jerarquiaBase, todosLosDatos);
            }
            
            // Estructura tipo 3: parte.parrafos[] (sin titulos)
            if (parte.parrafos && Array.isArray(parte.parrafos) && !parte.titulos) {
                procesarParrafos(parte.parrafos, jerarquiaBase, todosLosDatos);
            }
            
            // Estructura tipo 4: articulos_transitorios
            if (parte.articulos_transitorios && Array.isArray(parte.articulos_transitorios)) {
                const jerarquiaTransitoria = [...jerarquiaBase, 'Artículos Transitorios'];
                
                todosLosDatos.push({
                    id: idCounter++,
                    tipo: 'titulo',
                    titulo: 'Artículos Transitorios',
                    contenido: 'Disposiciones transitorias del reglamento',
                    jerarquia: jerarquiaTransitoria,
                    parte: nombreParte,
                    tags: ['articulos', 'transitorios', 'disposiciones']
                });
                
                procesarArticulos(
                    parte.articulos_transitorios,
                    jerarquiaTransitoria,
                    todosLosDatos
                );
            }
        }
        
        console.log(`\n✅ Procesamiento V2 completado`);
        console.log(`📊 Total: ${todosLosDatos.length} items`);
        console.log(`   - Títulos: ${todosLosDatos.filter(i => i.tipo === 'titulo').length}`);
        console.log(`   - Párrafos: ${todosLosDatos.filter(i => i.tipo === 'parrafo').length}`);
        console.log(`   - Secciones: ${todosLosDatos.filter(i => i.tipo === 'seccion').length}`);
        console.log(`   - Artículos: ${todosLosDatos.filter(i => i.tipo === 'articulos').length}`);
        console.log(`   - Definiciones: ${todosLosDatos.filter(i => i.tipo === 'definiciones').length}`);
        
        return todosLosDatos;
    }
    
    // ============================================================
    // INIT PROCESADOR V2
    // ============================================================
    
    async function initProcessorV2() {
        try {
            const datosRaw = await cargarTodosDatos();
            const datosProcesados = procesarDatosCompletos(datosRaw);
            
            // Guardar en variable global
            window.RidaaDataV2 = datosProcesados;
            
            console.log('✅ Datos V2 disponibles en window.RidaaDataV2');
            
            return datosProcesados;
            
        } catch (error) {
            console.error('❌ Error en Procesador V2:', error);
            return [];
        }
    }
    
    // ============================================================
    // EXPORTAR
    // ============================================================
    
    window.RidaaProcessorV2 = {
        cargarTodosDatos,
        procesarDatosCompletos,
        initProcessorV2,
        generarTags,
        extraerTexto
    };
    
    console.log('✅ Procesador V2 cargado');
    
})();