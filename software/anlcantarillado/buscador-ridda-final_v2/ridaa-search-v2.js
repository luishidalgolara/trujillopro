// buscador-ridda-final_v2/ridaa-search-v2.js
// ============================================================
// MOTOR DE BÚSQUEDA V2 - BUSCA EN TODO + RANKING
// ============================================================

(function() {
    'use strict';
    
    console.log('🔧 Cargando Motor de Búsqueda V2...');
    
    // ============================================================
    // NORMALIZAR TEXTO
    // ============================================================
    
    function normalizarTexto(texto) {
        if (!texto) return '';
        return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }
    
    // ============================================================
    // CALCULAR RELEVANCIA
    // ============================================================
    
    function calcularRelevancia(item, queryNormalizada, palabrasQuery) {
        let puntos = 0;
        
        const tituloNorm = normalizarTexto(item.titulo || '');
        const contenidoNorm = normalizarTexto(item.contenido || '');
        const tagsNorm = (item.tags || []).map(t => normalizarTexto(t));
        
        // Coincidencia exacta en título = 100 puntos
        if (tituloNorm === queryNormalizada) {
            puntos += 100;
        } else if (tituloNorm.includes(queryNormalizada)) {
            puntos += 80;
        }
        
        // Coincidencia por palabras en título
        palabrasQuery.forEach(palabra => {
            if (tituloNorm.includes(palabra)) {
                puntos += 30;
            }
        });
        
        // Coincidencia en contenido
        if (contenidoNorm.includes(queryNormalizada)) {
            puntos += 40;
        }
        
        palabrasQuery.forEach(palabra => {
            if (contenidoNorm.includes(palabra)) {
                puntos += 10;
            }
        });
        
        // Coincidencia en tags
        tagsNorm.forEach(tag => {
            if (tag === queryNormalizada) {
                puntos += 50;
            } else if (tag.includes(queryNormalizada)) {
                puntos += 20;
            }
            
            palabrasQuery.forEach(palabra => {
                if (tag.includes(palabra)) {
                    puntos += 5;
                }
            });
        });
        
        // Bonus por tipo
        const bonusTipo = {
            'seccion': 20,      // Prioridad a secciones específicas
            'parrafo': 15,      // Luego párrafos
            'articulos': 10,    // Luego artículos
            'titulo': 8,        // Luego títulos
            'definiciones': 5   // Finalmente definiciones
        };
        
        puntos += bonusTipo[item.tipo] || 0;
        
        // Bonus por jerarquía clara
        if (item.jerarquia && item.jerarquia.length > 2) {
            puntos += 5;
        }
        
        return puntos;
    }
    
    // ============================================================
    // BUSCAR EN TODO
    // ============================================================
    
    function buscarEnTodo(datos, query) {
        if (!query || query.trim().length < 3) {
            return [];
        }
        
        const queryNormalizada = normalizarTexto(query);
        const palabrasQuery = queryNormalizada
            .split(/\s+/)
            .filter(p => p.length >= 3);
        
        if (palabrasQuery.length === 0) {
            return [];
        }
        
        // Filtrar y rankear
        const resultados = datos
            .map(item => {
                const relevancia = calcularRelevancia(item, queryNormalizada, palabrasQuery);
                
                if (relevancia === 0) return null;
                
                return {
                    ...item,
                    relevancia,
                    matchType: determinarTipoMatch(item, queryNormalizada, palabrasQuery)
                };
            })
            .filter(item => item !== null)
            .sort((a, b) => b.relevancia - a.relevancia);
        
        return resultados;
    }
    
    // ============================================================
    // DETERMINAR TIPO DE MATCH
    // ============================================================
    
    function determinarTipoMatch(item, queryNormalizada, palabrasQuery) {
        const tituloNorm = normalizarTexto(item.titulo || '');
        const contenidoNorm = normalizarTexto(item.contenido || '');
        
        if (tituloNorm === queryNormalizada) {
            return 'exact_title';
        }
        
        if (tituloNorm.includes(queryNormalizada)) {
            return 'partial_title';
        }
        
        const todasPalabrasEnTitulo = palabrasQuery.every(p => tituloNorm.includes(p));
        if (todasPalabrasEnTitulo) {
            return 'all_words_title';
        }
        
        if (contenidoNorm.includes(queryNormalizada)) {
            return 'full_content';
        }
        
        const todasPalabrasEnContenido = palabrasQuery.every(p => contenidoNorm.includes(p));
        if (todasPalabrasEnContenido) {
            return 'all_words_content';
        }
        
        return 'partial_match';
    }
    
    // ============================================================
    // FILTRAR POR TIPO
    // ============================================================
    
    function filtrarPorTipo(resultados, tipo) {
        if (tipo === 'all') {
            return resultados;
        }
        
        return resultados.filter(item => item.tipo === tipo);
    }
    
    // ============================================================
    // AGRUPAR RESULTADOS
    // ============================================================
    
    function agruparResultados(resultados) {
        const grupos = {
            'secciones': [],
            'parrafos': [],
            'titulos': [],
            'articulos': [],
            'definiciones': []
        };
        
        resultados.forEach(item => {
            const tipo = item.tipo === 'seccion' ? 'secciones' : 
                        item.tipo === 'parrafo' ? 'parrafos' :
                        item.tipo === 'titulo' ? 'titulos' :
                        item.tipo === 'articulos' ? 'articulos' :
                        'definiciones';
            
            grupos[tipo].push(item);
        });
        
        return grupos;
    }
    
    // ============================================================
    // OBTENER CONTEXTO AMPLIADO
    // ============================================================
    
    function obtenerContextoAmpliado(item, datos) {
        if (!item) return null;
        
        const contexto = {
            item: item,
            padre: null,
            hermanos: [],
            hijos: []
        };
        
        // Buscar padre
        if (item.articuloParent) {
            contexto.padre = datos.find(d => 
                d.tipo === 'articulos' && 
                d.titulo === item.articuloParent
            );
        } else if (item.parrafoParent) {
            contexto.padre = datos.find(d => 
                d.tipo === 'parrafo' && 
                d.titulo.includes(item.parrafoParent)
            );
        } else if (item.tituloParent) {
            contexto.padre = datos.find(d => 
                d.tipo === 'titulo' && 
                d.titulo.includes(item.tituloParent)
            );
        }
        
        // Buscar hermanos
        if (item.articuloParent) {
            contexto.hermanos = datos.filter(d => 
                d.articuloParent === item.articuloParent &&
                d.id !== item.id
            );
        }
        
        // Buscar hijos
        if (item.tipo === 'titulo') {
            contexto.hijos = datos.filter(d => 
                d.tituloParent === item.titulo
            );
        } else if (item.tipo === 'parrafo') {
            contexto.hijos = datos.filter(d => 
                d.parrafoParent === item.titulo
            );
        } else if (item.tipo === 'articulos') {
            contexto.hijos = datos.filter(d => 
                d.articuloParent === item.titulo
            );
        }
        
        return contexto;
    }
    
    // ============================================================
    // RESALTAR TÉRMINOS
    // ============================================================
    
    function resaltarTerminos(texto, query) {
        if (!texto || !query) return texto;
        
        const palabras = query.toLowerCase().split(/\s+/);
        let resultado = texto;
        
        palabras.forEach(palabra => {
            if (palabra.length < 3) return;
            
            const regex = new RegExp(`(${palabra})`, 'gi');
            resultado = resultado.replace(regex, '<mark class="highlight">$1</mark>');
        });
        
        return resultado;
    }
    
    // ============================================================
    // OBTENER EXTRACTO CON CONTEXTO
    // ============================================================
    
    function obtenerExtracto(contenido, query, maxLength = 200) {
        if (!contenido) return '';
        
        const queryLower = query.toLowerCase();
        const contenidoLower = contenido.toLowerCase();
        
        // Buscar posición de la query en el contenido
        const posicion = contenidoLower.indexOf(queryLower);
        
        if (posicion === -1) {
            // Si no encuentra, devolver inicio
            return contenido.substring(0, maxLength) + (contenido.length > maxLength ? '...' : '');
        }
        
        // Calcular inicio y fin del extracto
        const margen = Math.floor((maxLength - query.length) / 2);
        const inicio = Math.max(0, posicion - margen);
        const fin = Math.min(contenido.length, posicion + query.length + margen);
        
        let extracto = contenido.substring(inicio, fin);
        
        if (inicio > 0) extracto = '...' + extracto;
        if (fin < contenido.length) extracto = extracto + '...';
        
        return extracto;
    }
    
    // ============================================================
    // BÚSQUEDA INTELIGENTE (combina búsqueda y contexto)
    // ============================================================
    
    function busquedaInteligente(datos, query, opciones = {}) {
        const {
            tipo = 'all',
            maxResultados = 50,
            incluirContexto = true
        } = opciones;
        
        let resultados = buscarEnTodo(datos, query);
        
        if (tipo !== 'all') {
            resultados = filtrarPorTipo(resultados, tipo);
        }
        
        resultados = resultados.slice(0, maxResultados);
        
        if (incluirContexto) {
            resultados = resultados.map(item => ({
                ...item,
                contexto: obtenerContextoAmpliado(item, datos),
                extracto: obtenerExtracto(item.contenido, query)
            }));
        }
        
        return resultados;
    }
    
    // ============================================================
    // EXPORTAR
    // ============================================================
    
    window.RidaaSearchV2 = {
        buscarEnTodo,
        filtrarPorTipo,
        agruparResultados,
        obtenerContextoAmpliado,
        resaltarTerminos,
        obtenerExtracto,
        busquedaInteligente,
        normalizarTexto
    };
    
    console.log('✅ Motor de Búsqueda V2 cargado');
    
})();