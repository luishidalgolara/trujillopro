function clasificarElementosNivel2(elementosNivel2) {
    console.log('📋 Clasificando elementos 2° NIVEL según normativa RIDAA...');
    
    const elementos = {
        colectoresPrincipales: elementosNivel2.filter(el => 
            el.categoria === 'sanitario' && el.tuberia_diametro === 110
        ),
        derivacionesSecundarias: elementosNivel2.filter(el => 
            el.categoria === 'sanitario' && 
            el.tuberia_diametro && 
            el.tuberia_diametro < 110
        ),
        puntosDescarga: elementosNivel2.filter(el => 
            el.type === 'punto-descarga-nivel-2' || 
            (el.typeBase === 'punto-descarga' && el.nivel === 2)
        )
    };
    
    console.log(`├─ Colectores principales WC (⌀110mm): ${elementos.colectoresPrincipales.length}`);
    console.log(`├─ Derivaciones secundarias (<110mm): ${elementos.derivacionesSecundarias.length}`);
    console.log(`└─ Puntos de descarga NIVEL 2: ${elementos.puntosDescarga.length}`);
    
    return elementos;
}

window.clasificarElementosNivel2 = clasificarElementosNivel2;
console.log('✅ nivel-2-classifier.js cargado con filtro nivel 2');