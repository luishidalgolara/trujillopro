// Normalizar texto para búsqueda (quitar acentos y convertir a minúsculas)
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Resaltar coincidencias en el texto
function resaltarCoincidencias(texto, termino) {
    const textoNormalizado = normalizarTexto(texto);
    const terminoNormalizado = normalizarTexto(termino);
    
    // Encontrar todas las posiciones donde aparece el término
    const regex = new RegExp(terminoNormalizado.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    
    let resultado = texto;
    const coincidencias = [];
    let match;
    
    // Buscar coincidencias en el texto normalizado
    const textoNormalizadoCompleto = normalizarTexto(texto);
    let lastIndex = 0;
    
    while ((match = regex.exec(textoNormalizadoCompleto)) !== null) {
        coincidencias.push({
            inicio: match.index,
            fin: match.index + termino.length
        });
    }
    
    // Aplicar resaltado de atrás hacia adelante para no alterar índices
    for (let i = coincidencias.length - 1; i >= 0; i--) {
        const { inicio, fin } = coincidencias[i];
        const textoOriginal = texto.substring(inicio, fin);
        resultado = resultado.substring(0, inicio) + 
                   `<span class="highlight">${textoOriginal}</span>` + 
                   resultado.substring(fin);
    }
    
    return resultado;
}