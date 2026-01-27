// ============================================================
// PREGUNTAS Y RESPUESTAS - SISTEMA DE BÚSQUEDA INTELIGENTE
// 100% GRATIS - SIN APIs - BÚSQUEDA LOCAL MEJORADA
// ============================================================

/**
 * 🧠 MEJORAS IMPLEMENTADAS:
 * ✅ Búsqueda sin mayúsculas/minúsculas
 * ✅ Búsqueda sin acentos
 * ✅ Ignora palabras vacías (el, la, de, que, etc.)
 * ✅ Sinónimos técnicos automáticos
 * ✅ Orden de palabras flexible
 * ✅ Scoring por relevancia
 * ✅ 100% local, sin costos
 */

const baseDeDatos = {
    version: "2.0.0",
    norma: "NCh Elec 4/2003",
    ultima_actualizacion: "2025-12-29",
    total_archivos: 10,
    archivos_cargados: 0,
    
    todasLasPreguntas: [],
    categorias: {},
    keywordIndex: {},
    indiceNormalizado: []
};

// ============================================================
// PALABRAS VACÍAS (se ignoran en búsqueda)
// ============================================================
const palabrasVacias = new Set([
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
    'de', 'del', 'al', 'a', 'en', 'por', 'para', 'con', 'sin',
    'que', 'cual', 'cuales', 'como', 'donde', 'cuando',
    'es', 'son', 'esta', 'estan', 'sea', 'sean',
    'debe', 'deben', 'puede', 'pueden', 'tiene', 'tienen',
    'se', 'le', 'lo', 'les', 'si', 'no', 'o', 'y', 'e',
    'muy', 'mas', 'menos', 'tambien', 'sobre', 'entre'
]);

// ============================================================
// DICCIONARIO DE SINÓNIMOS ELÉCTRICOS
// ============================================================
const sinonimos = {
    // Componentes eléctricos
    'enchufe': ['tomacorriente', 'toma', 'salida', 'contacto'],
    'interruptor': ['switch', 'apagador', 'llave', 'conmutador'],
    'tablero': ['panel', 'caja', 'centro', 'gabinete'],
    'disyuntor': ['breaker', 'termomagnetico', 'automatico', 'protector'],
    'diferencial': ['id', 'protector diferencial', 'interruptor diferencial'],
    'conductor': ['cable', 'alambre', 'hilo'],
    'luminaria': ['lampara', 'luz', 'iluminacion', 'foco', 'aplique'],
    
    // Medidas
    'seccion': ['calibre', 'diametro', 'grosor', 'area', 'mm2'],
    'capacidad': ['amperaje', 'corriente', 'amperes', 'amp'],
    'tension': ['voltaje', 'volt', 'voltage'],
    'potencia': ['watts', 'watt', 'carga', 'consumo'],
    
    // Protecciones
    'tierra': ['masa', 'ground', 'pe', 'puesta tierra'],
    'proteccion': ['seguridad', 'resguardo', 'blindaje'],
    'sobrecarga': ['exceso', 'sobrecorriente', 'exceso corriente'],
    'cortocircuito': ['corto', 'falla', 'cc'],
    
    // Espacios
    'bano': ['sanitario', 'wc', 'servicio', 'higienico'],
    'cocina': ['area coccion', 'cocineta'],
    'vivienda': ['casa', 'departamento', 'hogar', 'residencia', 'habitacion'],
    'oficina': ['local', 'comercial', 'establecimiento'],
    
    // Tipos de instalación
    'embutido': ['empotrado', 'oculto', 'dentro muro'],
    'superficie': ['vista', 'aparente', 'sobre muro'],
    'subterraneo': ['enterrado', 'bajo tierra', 'soterrado'],
    
    // Valores
    'minimo': ['minima', 'menor', 'mas bajo', 'inferior'],
    'maximo': ['maxima', 'mayor', 'mas alto', 'superior'],
    'necesario': ['requerido', 'obligatorio', 'necesita', 'debe'],
    'permitido': ['autorizado', 'aceptado', 'valido', 'puede']
};

// ============================================================
// FUNCIONES DE NORMALIZACIÓN
// ============================================================

/**
 * Normalizar texto: minúsculas, sin acentos, sin ñ
 */
function normalizarTexto(texto) {
    if (!texto) return '';
    
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Extraer palabras clave (sin palabras vacías)
 */
function extraerPalabrasClave(texto) {
    const palabras = normalizarTexto(texto).split(' ');
    return palabras.filter(p => p.length > 2 && !palabrasVacias.has(p));
}

/**
 * Expandir palabras con sinónimos
 */
function expandirSinonimos(palabras) {
    const expandidas = new Set(palabras);
    
    palabras.forEach(palabra => {
        // Buscar si la palabra es sinónimo de algo
        Object.entries(sinonimos).forEach(([principal, sins]) => {
            const todosTerminos = [principal, ...sins];
            
            if (todosTerminos.some(t => t.includes(palabra) || palabra.includes(t))) {
                expandidas.add(principal);
                sins.forEach(s => {
                    const sNorm = normalizarTexto(s).replace(/\s+/g, '');
                    expandidas.add(sNorm);
                });
            }
        });
    });
    
    return Array.from(expandidas);
}

/**
 * Calcular score de coincidencia entre consulta y pregunta
 */
function calcularScore(palabrasConsulta, pregunta) {
    let score = 0;
    
    // Normalizar pregunta completa
    const preguntaNorm = normalizarTexto(pregunta.pregunta);
    const respuestaNorm = normalizarTexto(pregunta.respuesta);
    const keywordsNorm = pregunta.keywords.map(k => normalizarTexto(k));
    
    // Extraer palabras de la pregunta
    const palabrasPregunta = extraerPalabrasClave(pregunta.pregunta);
    
    palabrasConsulta.forEach(palabra => {
        // Coincidencia exacta en keywords (máxima prioridad)
        if (keywordsNorm.some(kw => kw === palabra || kw.includes(palabra))) {
            score += 50;
        }
        
        // Coincidencia en pregunta normalizada
        if (preguntaNorm.includes(palabra)) {
            score += 30;
        }
        
        // Coincidencia en palabras clave de pregunta
        if (palabrasPregunta.some(p => p === palabra || p.includes(palabra) || palabra.includes(p))) {
            score += 20;
        }
        
        // Coincidencia en respuesta
        if (respuestaNorm.includes(palabra)) {
            score += 10;
        }
    });
    
    // Bonus por múltiples coincidencias
    const coincidencias = palabrasConsulta.filter(pc => 
        preguntaNorm.includes(pc) || keywordsNorm.some(kw => kw.includes(pc))
    ).length;
    
    if (coincidencias > 1) {
        score += coincidencias * 15;
    }
    
    return score;
}

// ============================================================
// CARGAR ARCHIVOS
// ============================================================

function cargarArchivo(archivo) {
    if (!archivo || !archivo.preguntas) {
        console.error('❌ Archivo inválido');
        return;
    }
    
    baseDeDatos.todasLasPreguntas.push(...archivo.preguntas);
    baseDeDatos.categorias[archivo.categoria] = archivo.preguntas;
    
    archivo.preguntas.forEach(pregunta => {
        pregunta.keywords.forEach(keyword => {
            const kwNorm = normalizarTexto(keyword);
            if (!baseDeDatos.keywordIndex[kwNorm]) {
                baseDeDatos.keywordIndex[kwNorm] = [];
            }
            baseDeDatos.keywordIndex[kwNorm].push(pregunta);
        });
        
        baseDeDatos.indiceNormalizado.push({
            id: pregunta.id,
            preguntaNorm: normalizarTexto(pregunta.pregunta),
            respuestaNorm: normalizarTexto(pregunta.respuesta),
            keywordsNorm: pregunta.keywords.map(k => normalizarTexto(k)),
            palabrasClave: extraerPalabrasClave(pregunta.pregunta),
            original: pregunta
        });
    });
    
    baseDeDatos.archivos_cargados++;
    console.log(`✅ Archivo cargado: ${archivo.categoria}`);
}

// ============================================================
// BÚSQUEDA INTELIGENTE
// ============================================================

/**
 * Búsqueda inteligente principal
 */
function buscarInteligente(consulta, maxResultados = 5) {
    if (!consulta || consulta.trim().length < 2) {
        return {
            resultados: [],
            mensaje: "Escribe al menos 2 caracteres"
        };
    }
    
    // 1. Extraer palabras clave de la consulta
    const palabrasClave = extraerPalabrasClave(consulta);
    
    if (palabrasClave.length === 0) {
        return {
            resultados: [],
            mensaje: "No se encontraron palabras significativas en tu consulta"
        };
    }
    
    // 2. Expandir con sinónimos
    const palabrasExpandidas = expandirSinonimos(palabrasClave);
    
    // 3. Calcular score para cada pregunta
    const resultadosConScore = [];
    
    baseDeDatos.todasLasPreguntas.forEach(pregunta => {
        const score = calcularScore(palabrasExpandidas, pregunta);
        
        if (score > 0) {
            resultadosConScore.push({
                pregunta: pregunta,
                score: score,
                coincidencias: palabrasExpandidas.filter(p => 
                    normalizarTexto(pregunta.pregunta).includes(p) ||
                    pregunta.keywords.some(kw => normalizarTexto(kw).includes(p))
                )
            });
        }
    });
    
    // 4. Ordenar por score (mayor a menor)
    resultadosConScore.sort((a, b) => b.score - a.score);
    
    // 5. Retornar top resultados
    const topResultados = resultadosConScore.slice(0, maxResultados);
    
    return {
        resultados: topResultados.map(r => r.pregunta),
        total_encontrados: resultadosConScore.length,
        consulta_original: consulta,
        palabras_buscadas: palabrasClave,
        palabras_expandidas: palabrasExpandidas,
        scores: topResultados.map(r => ({
            id: r.pregunta.id,
            score: r.score,
            pregunta: r.pregunta.pregunta.substring(0, 60) + '...'
        })),
        mensaje: resultadosConScore.length === 0 
            ? "❌ No encontré resultados. Intenta con otras palabras."
            : `✅ ${resultadosConScore.length} resultado(s) encontrado(s)`
    };
}

/**
 * Búsqueda por texto (versión mejorada)
 */
function buscarPorTexto(texto) {
    const resultado = buscarInteligente(texto, 10);
    return resultado.resultados;
}

/**
 * Búsqueda por keywords
 */
function buscarPorKeywords(keywords) {
    const keywordsArray = Array.isArray(keywords) ? keywords : [keywords];
    const consulta = keywordsArray.join(' ');
    return buscarPorTexto(consulta);
}

// ============================================================
// OTRAS FUNCIONES
// ============================================================

function obtenerEstadisticas() {
    return {
        total_preguntas: baseDeDatos.todasLasPreguntas.length,
        categorias_cargadas: Object.keys(baseDeDatos.categorias).length,
        categorias_disponibles: Object.keys(baseDeDatos.categorias),
        keywords_indexadas: Object.keys(baseDeDatos.keywordIndex).length,
        archivos_cargados: baseDeDatos.archivos_cargados,
        total_archivos: baseDeDatos.total_archivos,
        progreso: `${Math.round((baseDeDatos.archivos_cargados / baseDeDatos.total_archivos) * 100)}%`
    };
}

function obtenerPreguntaPorId(id) {
    return baseDeDatos.todasLasPreguntas.find(p => p.id === id);
}

function obtenerPorCategoria(categoria) {
    const categoriaNorm = normalizarTexto(categoria);
    const categoriaEncontrada = Object.keys(baseDeDatos.categorias).find(
        cat => normalizarTexto(cat).includes(categoriaNorm) || categoriaNorm.includes(normalizarTexto(cat))
    );
    return categoriaEncontrada ? baseDeDatos.categorias[categoriaEncontrada] : [];
}

// ============================================================
// EXPORTAR AL NAVEGADOR
// ============================================================

window.baseDeDatosPreguntas = baseDeDatos;
window.cargarArchivoPR = cargarArchivo;
window.buscarInteligente = buscarInteligente;
window.buscarPorTexto = buscarPorTexto;
window.buscarPorKeywords = buscarPorKeywords;
window.obtenerEstadisticasPR = obtenerEstadisticas;
window.obtenerPreguntaPorId = obtenerPreguntaPorId;
window.obtenerPorCategoria = obtenerPorCategoria;
window.normalizarTexto = normalizarTexto;

console.log('🧠 Sistema de Búsqueda INTELIGENTE activado');
console.log('✅ 100% gratis, sin APIs, búsqueda local mejorada');
console.log('📚 Listo para cargar archivos de preguntas');