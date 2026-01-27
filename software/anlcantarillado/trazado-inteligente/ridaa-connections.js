// trazado-inteligente/ridaa-connections.js

function conectarColectoresPrincipales(colectoresPrincipales, camarasDomiciliarias, colectorPublico, currentPlan) {
    console.log(`🚽 Conectando ${colectoresPrincipales.length} colectores principales (WC ⌀110mm)...`);
    
    if (colectoresPrincipales.length === 0) {
        console.log('└─ No hay colectores principales para conectar');
        return;
    }
    
    colectoresPrincipales.forEach((colector, index) => {
        let destino = null;
        
        if (camarasDomiciliarias.length > 0) {
            destino = encontrarCamaraMasCercana(colector, camarasDomiciliarias);
            console.log(`├─ WC ${index + 1} → Cámara MÁS CERCANA ${destino.numeroCamera || destino.id}`);
        } else {
            destino = colectorPublico;
            console.log(`├─ WC ${index + 1} → Colector Público (directo - sin cámaras)`);
        }
        
        if (destino) {
            crearConexionJerarquica(colector, destino, 'wc-a-cercana', currentPlan);
        }
    });
    
    console.log('└─ WC conectados a cámaras MÁS CERCANAS (criterio profesional)');
}

function conectarDerivacionesSecundarias(derivaciones, colectoresPrincipales, camarasDomiciliarias, colectorPublico, currentPlan) {
    console.log(`🚰 Conectando ${derivaciones.length} derivaciones secundarias (<110mm)...`);
    
    if (derivaciones.length === 0) {
        console.log('└─ No hay derivaciones secundarias para conectar');
        return;
    }
    
    const gruposDerivaciones = agruparDerivacionesPorProximidad(derivaciones, RIDAA_CONFIG.DISTANCIAS.AGRUPACION_ARTEFACTOS);
    
    gruposDerivaciones.forEach((grupo, grupoIndex) => {
        console.log(`├─ Procesando grupo ${grupoIndex + 1} (${grupo.length} artefactos):`);
        
        grupo.forEach((derivacion, index) => {
            let destino = null;
            let tipoConexion = 'secundaria';
            
            if (colectoresPrincipales.length > 0) {
                destino = encontrarElementoMasCercano(derivacion, colectoresPrincipales);
                const distancia = calcularDistancia(derivacion, destino);
                
                if (distancia <= RIDAA_CONFIG.DISTANCIAS.MAX_DERIVACION) {
                    console.log(`│  ├─ ${derivacion.type} (⌀${derivacion.tuberia_diametro}mm) → WC principal`);
                } else {
                    destino = null;
                }
            }
            
            if (!destino && camarasDomiciliarias.length > 0) {
                destino = encontrarCamaraMasCercana(derivacion, camarasDomiciliarias);
                tipoConexion = 'derivacion-directa';
                console.log(`│  ├─ ${derivacion.type} (⌀${derivacion.tuberia_diametro}mm) → Cámara Domiciliaria`);
            }
            
            if (!destino) {
                destino = colectorPublico;
                tipoConexion = 'derivacion-publica';
                console.log(`│  ├─ ${derivacion.type} (⌀${derivacion.tuberia_diametro}mm) → Colector Público`);
            }
            
            if (destino) {
                crearConexionJerarquica(derivacion, destino, tipoConexion, currentPlan);
            }
        });
    });
    
    console.log('└─ Derivaciones secundarias conectadas');
}

function conectarRedCamarasDomiciliarias(camarasDomiciliarias, colectorPublico, currentPlan) {
    console.log(`🏠 Conectando red de ${camarasDomiciliarias.length} cámaras domiciliarias...`);
    
    if (camarasDomiciliarias.length === 0) {
        console.log('└─ No hay cámaras domiciliarias para conectar');
        return;
    }
    
    if (camarasDomiciliarias.length === 1) {
        console.log(`├─ Cámara única → Colector Público`);
        crearConexionJerarquica(camarasDomiciliarias[0], colectorPublico, 'camara-unica', currentPlan);
    } else {
        const conexionesProfesionales = generarTrazadoProfesional(camarasDomiciliarias, colectorPublico);
        
        console.log(`├─ Trazado profesional generado:`);
        conexionesProfesionales.forEach(conexion => {
            console.log(`│  ├─ Cámara ${conexion.desde.numeroCamera || conexion.desde.id} → ${conexion.hacia.numeroCamera || conexion.hacia.id || 'Público'}`);
            crearConexionJerarquica(conexion.desde, conexion.hacia, conexion.tipo, currentPlan);
        });
    }
    
    console.log('└─ Red de cámaras conectada con criterio profesional');
}

function conectarPuntosDescargaNivel1(puntosDescarga, camarasDomiciliarias, colectorPublico, currentPlan) {
    console.log(`💧 Conectando ${puntosDescarga.length} puntos de descarga NIVEL 1...`);
    
    if (puntosDescarga.length === 0) {
        console.log('└─ No hay puntos de descarga nivel 1 para conectar');
        return;
    }
    
    puntosDescarga.forEach((punto, index) => {
        let destino = null;
        
        if (camarasDomiciliarias.length > 0) {
            destino = encontrarCamaraMasCercana(punto, camarasDomiciliarias);
            console.log(`├─ Punto Descarga ${index + 1} → Cámara Domiciliaria ${destino.numeroCamera || destino.id}`);
        } else {
            destino = colectorPublico;
            console.log(`├─ Punto Descarga ${index + 1} → Colector Público (directo - sin cámaras)`);
        }
        
        if (destino) {
            crearConexionJerarquica(punto, destino, 'descarga-nivel1', currentPlan);
        }
    });
    
    console.log('└─ Puntos descarga NIVEL 1 conectados a cámaras domiciliarias');
}

function conectarElementosEspeciales(otrosElementos, colectorPublico, currentPlan) {
    console.log(`⚙️ Conectando ${otrosElementos.length} elementos especiales...`);
    
    otrosElementos.forEach(elemento => {
        console.log(`├─ ${elemento.type} → Colector Público`);
        crearConexionJerarquica(elemento, colectorPublico, 'especial', currentPlan);
    });
    
    console.log('└─ Elementos especiales conectados');
}

function crearConexionJerarquica(desde, hacia, tipoConexion, currentPlan) {
    const tiposConexion = {
        'wc-a-cercana': '🚽→🏠',
        'camara-a-camara': '🏠→🏠',
        'final-a-publico': '🎯→🏛️',
        'camara-unica': '🏠→🏛️',
        'secundaria': '🚰→🏠',
        'derivacion-directa': '🚰→🏠',
        'derivacion-publica': '🚰→🏛️',
        'descarga-nivel1': '💧→🏠',
        'especial': '⚙️→🏛️'
    };
    
    const icono = tiposConexion[tipoConexion] || '🔗';
    const distancia = calcularDistancia(desde, hacia);
    console.log(`  ${icono} ${desde.type || desde.id} → ${hacia.type || hacia.id} (${Math.round(distancia)} unidades)`);
    
    if (typeof createTracingConnection === 'function') {
        createTracingConnection(desde, hacia);
    } else {
        console.log(`⚠️ createTracingConnection no disponible`);
    }
}