// trazado-inteligente/ridaa-classifier.js

function clasificarElementosRIDAA(tracingElements) {
    console.log('📋 Clasificando elementos según normativa RIDAA...');
    
    const elementos = {
        colectoresPrincipales: tracingElements.filter(el => 
            el.categoria === 'sanitario' && el.tuberia_diametro === RIDAA_CONFIG.DIAMETROS.WC
        ),
        derivacionesSecundarias: tracingElements.filter(el => 
            el.categoria === 'sanitario' && 
            el.tuberia_diametro && 
            el.tuberia_diametro < RIDAA_CONFIG.DIAMETROS.PRINCIPAL
        ),
        camarasDomiciliarias: tracingElements.filter(el => 
            el.type === 'camara-inspeccion'
        ),
        puntosDescargaNivel1: tracingElements.filter(el => 
            el.type === 'punto-descarga-nivel-1' || 
            (el.typeBase === 'punto-descarga' && el.nivel === 1)
        ),
        colectorPublico: tracingElements.find(el => 
            el.type === 'camara-publica'
        ),
        otrosElementos: tracingElements.filter(el => 
            el.categoria === 'infraestructura' && 
            el.type !== 'camara-inspeccion' && 
            el.type !== 'camara-publica' &&
            el.type !== 'punto-descarga-nivel-1' &&
            el.typeBase !== 'punto-descarga'
        )
    };
    
    console.log(`├─ Colectores principales (⌀110mm): ${elementos.colectoresPrincipales.length}`);
    console.log(`├─ Derivaciones secundarias (<110mm): ${elementos.derivacionesSecundarias.length}`);
    console.log(`├─ Cámaras domiciliarias: ${elementos.camarasDomiciliarias.length}`);
    console.log(`├─ Puntos descarga nivel 1: ${elementos.puntosDescargaNivel1.length}`);
    console.log(`├─ Colector público: ${elementos.colectorPublico ? 'SÍ' : 'NO'}`);
    console.log(`└─ Otros elementos: ${elementos.otrosElementos.length}`);
    
    return elementos;
}