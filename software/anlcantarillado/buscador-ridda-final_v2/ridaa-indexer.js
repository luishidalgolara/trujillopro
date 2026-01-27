// buscador-ridda-final_v2/ridaa-indexer.js
// ============================================================
// INDEXADOR - CREA ESTRUCTURA JERÁRQUICA NAVEGABLE
// ============================================================

(function() {
    'use strict';
    
    console.log('🔧 Cargando Indexador...');
    
    // ============================================================
    // CREAR ÍNDICE JERÁRQUICO
    // ============================================================
    
    function crearIndice(datos) {
        if (!datos || !Array.isArray(datos)) {
            console.error('❌ Datos inválidos para crear índice');
            return [];
        }
        
        const indice = {};
        
        datos.forEach(item => {
            if (!item.jerarquia || item.jerarquia.length === 0) return;
            
            const [parte, titulo, parrafo, articulo, ...resto] = item.jerarquia;
            
            // Nivel 1: Parte
            if (!indice[parte]) {
                indice[parte] = {
                    nombre: parte,
                    tipo: 'parte',
                    titulos: {}
                };
            }
            
            // Nivel 2: Título
            if (titulo) {
                if (!indice[parte].titulos[titulo]) {
                    indice[parte].titulos[titulo] = {
                        nombre: titulo,
                        tipo: 'titulo',
                        parrafos: {},
                        articulos: {},
                        items: []
                    };
                }
                
                // Nivel 3: Párrafo
                if (parrafo) {
                    if (!indice[parte].titulos[titulo].parrafos[parrafo]) {
                        indice[parte].titulos[titulo].parrafos[parrafo] = {
                            nombre: parrafo,
                            tipo: 'parrafo',
                            articulos: {},
                            items: []
                        };
                    }
                    
                    // Nivel 4: Artículo
                    if (articulo) {
                        if (!indice[parte].titulos[titulo].parrafos[parrafo].articulos[articulo]) {
                            indice[parte].titulos[titulo].parrafos[parrafo].articulos[articulo] = {
                                nombre: articulo,
                                tipo: 'articulo',
                                secciones: [],
                                items: []
                            };
                        }
                        
                        indice[parte].titulos[titulo].parrafos[parrafo].articulos[articulo].items.push(item);
                    } else {
                        indice[parte].titulos[titulo].parrafos[parrafo].items.push(item);
                    }
                } else if (articulo) {
                    // Artículo directo bajo título (sin párrafo)
                    if (!indice[parte].titulos[titulo].articulos[articulo]) {
                        indice[parte].titulos[titulo].articulos[articulo] = {
                            nombre: articulo,
                            tipo: 'articulo',
                            secciones: [],
                            items: []
                        };
                    }
                    
                    indice[parte].titulos[titulo].articulos[articulo].items.push(item);
                } else {
                    indice[parte].titulos[titulo].items.push(item);
                }
            } else {
                // Item directo bajo parte (sin título)
                if (!indice[parte].items) {
                    indice[parte].items = [];
                }
                indice[parte].items.push(item);
            }
        });
        
        return indice;
    }
    
    // ============================================================
    // CONVERTIR ÍNDICE A ARRAY PLANO
    // ============================================================
    
    function indiceAArray(indice) {
        const resultado = [];
        
        Object.values(indice).forEach(parte => {
            resultado.push({
                id: 'parte_' + parte.nombre,
                nombre: parte.nombre,
                tipo: 'parte',
                nivel: 0,
                expandible: true,
                hijos: Object.keys(parte.titulos).length > 0
            });
            
            Object.values(parte.titulos).forEach(titulo => {
                resultado.push({
                    id: 'titulo_' + titulo.nombre,
                    nombre: titulo.nombre,
                    tipo: 'titulo',
                    nivel: 1,
                    expandible: true,
                    hijos: Object.keys(titulo.parrafos).length > 0 || Object.keys(titulo.articulos).length > 0
                });
                
                Object.values(titulo.parrafos).forEach(parrafo => {
                    resultado.push({
                        id: 'parrafo_' + parrafo.nombre,
                        nombre: parrafo.nombre,
                        tipo: 'parrafo',
                        nivel: 2,
                        expandible: true,
                        hijos: Object.keys(parrafo.articulos).length > 0
                    });
                    
                    Object.values(parrafo.articulos).forEach(articulo => {
                        resultado.push({
                            id: 'articulo_' + articulo.nombre,
                            nombre: articulo.nombre,
                            tipo: 'articulo',
                            nivel: 3,
                            expandible: false,
                            items: articulo.items
                        });
                    });
                });
                
                Object.values(titulo.articulos).forEach(articulo => {
                    resultado.push({
                        id: 'articulo_' + articulo.nombre,
                        nombre: articulo.nombre,
                        tipo: 'articulo',
                        nivel: 2,
                        expandible: false,
                        items: articulo.items
                    });
                });
            });
        });
        
        return resultado;
    }
    
    // ============================================================
    // BUSCAR EN ÍNDICE
    // ============================================================
    
    function buscarEnIndice(indice, query) {
        const queryLower = query.toLowerCase();
        const resultados = [];
        
        function buscarRecursivo(nodo, ruta = []) {
            if (!nodo) return;
            
            const nombre = nodo.nombre || '';
            if (nombre.toLowerCase().includes(queryLower)) {
                resultados.push({
                    ...nodo,
                    ruta: [...ruta, nombre]
                });
            }
            
            // Buscar en items
            if (nodo.items && Array.isArray(nodo.items)) {
                nodo.items.forEach(item => {
                    if ((item.titulo || '').toLowerCase().includes(queryLower) ||
                        (item.contenido || '').toLowerCase().includes(queryLower)) {
                        resultados.push({
                            ...item,
                            ruta: [...ruta, nombre, item.titulo]
                        });
                    }
                });
            }
            
            // Buscar en hijos
            ['titulos', 'parrafos', 'articulos', 'secciones'].forEach(tipo => {
                if (nodo[tipo]) {
                    Object.values(nodo[tipo]).forEach(hijo => {
                        buscarRecursivo(hijo, [...ruta, nombre]);
                    });
                }
            });
        }
        
        Object.values(indice).forEach(parte => {
            buscarRecursivo(parte);
        });
        
        return resultados;
    }
    
    // ============================================================
    // OBTENER CONTEXTO DE UN ITEM
    // ============================================================
    
    function obtenerContexto(item) {
        if (!item || !item.jerarquia) return null;
        
        return {
            breadcrumbs: item.jerarquia,
            parte: item.parte || '',
            titulo: item.tituloParent || '',
            parrafo: item.parrafoParent || '',
            articulo: item.articuloParent || ''
        };
    }
    
    // ============================================================
    // NAVEGAR ÍNDICE
    // ============================================================
    
    function navegarIndice(indice, rutaArray) {
        let nodoActual = indice;
        
        for (const paso of rutaArray) {
            if (!nodoActual) return null;
            
            // Buscar en diferentes niveles
            if (nodoActual[paso]) {
                nodoActual = nodoActual[paso];
            } else if (nodoActual.titulos && nodoActual.titulos[paso]) {
                nodoActual = nodoActual.titulos[paso];
            } else if (nodoActual.parrafos && nodoActual.parrafos[paso]) {
                nodoActual = nodoActual.parrafos[paso];
            } else if (nodoActual.articulos && nodoActual.articulos[paso]) {
                nodoActual = nodoActual.articulos[paso];
            } else {
                return null;
            }
        }
        
        return nodoActual;
    }
    
    // ============================================================
    // OBTENER TODOS LOS ITEMS DE UN NODO
    // ============================================================
    
    function obtenerTodosItems(nodo) {
        const items = [];
        
        function recolectarItems(n) {
            if (!n) return;
            
            if (n.items && Array.isArray(n.items)) {
                items.push(...n.items);
            }
            
            ['titulos', 'parrafos', 'articulos', 'secciones'].forEach(tipo => {
                if (n[tipo]) {
                    Object.values(n[tipo]).forEach(hijo => recolectarItems(hijo));
                }
            });
        }
        
        recolectarItems(nodo);
        return items;
    }
    
    // ============================================================
    // ESTADÍSTICAS DEL ÍNDICE
    // ============================================================
    
    function estadisticasIndice(indice) {
        let totalPartes = 0;
        let totalTitulos = 0;
        let totalParrafos = 0;
        let totalArticulos = 0;
        let totalItems = 0;
        
        function contarRecursivo(nodo) {
            if (!nodo) return;
            
            if (nodo.items) totalItems += nodo.items.length;
            
            if (nodo.titulos) {
                totalTitulos += Object.keys(nodo.titulos).length;
                Object.values(nodo.titulos).forEach(contarRecursivo);
            }
            
            if (nodo.parrafos) {
                totalParrafos += Object.keys(nodo.parrafos).length;
                Object.values(nodo.parrafos).forEach(contarRecursivo);
            }
            
            if (nodo.articulos) {
                totalArticulos += Object.keys(nodo.articulos).length;
                Object.values(nodo.articulos).forEach(contarRecursivo);
            }
        }
        
        totalPartes = Object.keys(indice).length;
        Object.values(indice).forEach(contarRecursivo);
        
        return {
            partes: totalPartes,
            titulos: totalTitulos,
            parrafos: totalParrafos,
            articulos: totalArticulos,
            items: totalItems
        };
    }
    
    // ============================================================
    // EXPORTAR
    // ============================================================
    
    window.RidaaIndexer = {
        crearIndice,
        indiceAArray,
        buscarEnIndice,
        obtenerContexto,
        navegarIndice,
        obtenerTodosItems,
        estadisticasIndice
    };
    
    console.log('✅ Indexador cargado');
    
})();