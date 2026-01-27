// ============================================================
// ASISTENTE VIRTUAL ELÉCTRICO - Base de Conocimiento
// ============================================================

/**
 * Base de conocimiento del asistente
 * ESTRUCTURA VACÍA - Lista para agregar información
 */
const knowledgeBase = {
    // Aquí se agregará la información del asistente
    categorias: {
        // Ejemplo de estructura:
        // normativa: { ... },
        // calculos: { ... },
        // recomendaciones: { ... }
    },
    
    // Palabras clave para detección de temas
    keywords: {
        // Ejemplo:
        // 'cable': 'calculos',
        // 'breaker': 'calculos',
        // 'norma': 'normativa'
    }
};

/**
 * Obtener respuesta basada en la consulta del usuario
 * @param {string} consulta - Pregunta del usuario
 * @returns {string} - Respuesta del asistente
 */
function obtenerRespuesta(consulta) {
    console.log('🔍 Buscando respuesta para:', consulta);
    
    // Convertir a minúsculas para comparación
    const consultaLower = consulta.toLowerCase();
    
    // 🔌 CONECTAR CON BASE DE DATOS DE PREGUNTAS
    if (typeof buscarPorTexto === 'function') {
        const resultados = buscarPorTexto(consultaLower);
        
        if (resultados && resultados.length > 0) {
            // Encontró resultados - devolver la mejor coincidencia
            const mejorRespuesta = resultados[0];
            
            console.log('✅ Respuesta encontrada:', mejorRespuesta.id);
            
            // Formatear respuesta con pregunta y respuesta
            return `<strong>${mejorRespuesta.pregunta}</strong><br><br>${mejorRespuesta.respuesta}`;
        }
    }
    
    // Detectar categoría
    const categoria = detectarCategoria(consultaLower);
    
    if (categoria) {
        return buscarEnCategoria(categoria, consultaLower);
    }
    
    // Respuesta por defecto si no encuentra nada
    return 'No encontré información específica sobre esa pregunta. ¿Podrías reformularla o preguntar sobre: normativa, tableros, protecciones, cables, o circuitos? 🔌';
}

/**
 * Detectar categoría de la consulta
 * @param {string} consulta - Consulta en minúsculas
 * @returns {string|null} - Categoría detectada
 */
function detectarCategoria(consulta) {
    // 🔌 USAR KEYWORDS DE LA BASE DE DATOS
    if (typeof baseDeDatosPreguntas !== 'undefined' && baseDeDatosPreguntas.keywordIndex) {
        // Buscar si alguna keyword está en la consulta
        for (const keyword in baseDeDatosPreguntas.keywordIndex) {
            if (consulta.includes(keyword)) {
                // Retornar la categoría de la primera pregunta que coincide
                const preguntas = baseDeDatosPreguntas.keywordIndex[keyword];
                if (preguntas && preguntas.length > 0) {
                    return preguntas[0].seccion || 'general';
                }
            }
        }
    }
    
    return null;
}

/**
 * Buscar respuesta en una categoría específica
 * @param {string} categoria - Categoría donde buscar
 * @param {string} consulta - Consulta del usuario
 * @returns {string} - Respuesta encontrada
 */
function buscarEnCategoria(categoria, consulta) {
    // AQUÍ SE AGREGARÁ LA LÓGICA DE BÚSQUEDA EN CATEGORÍAS
    
    // Por ahora retorna mensaje genérico
    return `Estoy buscando información sobre ${categoria}... 🔍`;
}

/**
 * Agregar nueva información a la base de conocimiento
 * @param {string} categoria - Categoría de la información
 * @param {string} clave - Clave identificadora
 * @param {object} datos - Datos a agregar
 */
function agregarConocimiento(categoria, clave, datos) {
    if (!knowledgeBase.categorias[categoria]) {
        knowledgeBase.categorias[categoria] = {};
    }
    
    knowledgeBase.categorias[categoria][clave] = datos;
    console.log(`✅ Conocimiento agregado: ${categoria} > ${clave}`);
}

/**
 * Agregar palabra clave
 * @param {string} palabra - Palabra clave
 * @param {string} categoria - Categoría asociada
 */
function agregarKeyword(palabra, categoria) {
    knowledgeBase.keywords[palabra.toLowerCase()] = categoria;
    console.log(`✅ Keyword agregada: ${palabra} → ${categoria}`);
}

/**
 * Listar toda la base de conocimiento (para debug)
 */
function listarConocimiento() {
    console.log('📚 Base de conocimiento actual:');
    console.log(knowledgeBase);
    return knowledgeBase;
}

// Exportar funciones
window.obtenerRespuesta = obtenerRespuesta;
window.agregarConocimiento = agregarConocimiento;
window.agregarKeyword = agregarKeyword;
window.listarConocimiento = listarConocimiento;

console.log('✅ Asistente Virtual Knowledge inicializado (VACÍO - Listo para agregar información)');