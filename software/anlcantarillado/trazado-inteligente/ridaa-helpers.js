// trazado-inteligente/ridaa-helpers.js

function agruparDerivacionesPorProximidad(derivaciones, distanciaMaxima) {
    const grupos = [];
    const procesados = new Set();
    
    derivaciones.forEach(derivacion => {
        if (procesados.has(derivacion.id)) return;
        
        const grupo = [derivacion];
        procesados.add(derivacion.id);
        
        derivaciones.forEach(otra => {
            if (procesados.has(otra.id)) return;
            
            const distancia = calcularDistancia(derivacion, otra);
            if (distancia <= distanciaMaxima) {
                grupo.push(otra);
                procesados.add(otra.id);
            }
        });
        
        grupos.push(grupo);
    });
    
    return grupos;
}

function encontrarCamaraMasCercana(elemento, camaras) {
    if (camaras.length === 0) return null;
    
    let camaraMasCercana = camaras[0];
    let distanciaMinima = calcularDistancia(elemento, camaraMasCercana);
    
    for (let i = 1; i < camaras.length; i++) {
        const distancia = calcularDistancia(elemento, camaras[i]);
        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            camaraMasCercana = camaras[i];
        }
    }
    
    console.log(`  🎯 Elemento en (${Math.round(elemento.x)},${Math.round(elemento.y)}) → Cámara más cercana: ${camaraMasCercana.numeroCamera || camaraMasCercana.id} a ${Math.round(distanciaMinima)} unidades`);
    
    return camaraMasCercana;
}

function encontrarElementoMasCercano(elemento, elementos) {
    if (elementos.length === 0) return null;
    
    let elementoMasCercano = elementos[0];
    let distanciaMinima = calcularDistancia(elemento, elementoMasCercano);
    
    for (let i = 1; i < elementos.length; i++) {
        const distancia = calcularDistancia(elemento, elementos[i]);
        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            elementoMasCercano = elementos[i];
        }
    }
    
    return elementoMasCercano;
}