// trazado-inteligente/ridaa-validation.js

function calculateAngleBetweenPoints(point1, point2, point3) {
    const vector1 = { x: point1.x - point2.x, y: point1.y - point2.y };
    const vector2 = { x: point3.x - point2.x, y: point3.y - point2.y };
    
    const dot = vector1.x * vector2.x + vector1.y * vector2.y;
    const mag1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
    const mag2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
    
    const angle = Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI);
    return Math.round(angle * 10) / 10;
}

function isAngleValidRIDAA(angle, tipoConexion = 'empalme') {
    switch (tipoConexion) {
        case 'empalme':
            return angle <= RIDAA_CONFIG.ANGULOS.MAXIMO_EMPALME;
        case 'wc':
            return angle <= RIDAA_CONFIG.ANGULOS.MAXIMO_WC;
        case 'colector':
            return angle < RIDAA_CONFIG.ANGULOS.PROHIBIDO_COLECTOR;
        default:
            return angle <= RIDAA_CONFIG.ANGULOS.MAXIMO_EMPALME;
    }
}

function findNearestPreferredAngle(actualAngle) {
    let closest = RIDAA_CONFIG.ANGULOS.PREFERIDOS[0];
    let minDiff = Math.abs(actualAngle - closest);
    
    RIDAA_CONFIG.ANGULOS.PREFERIDOS.forEach(preferredAngle => {
        const diff = Math.abs(actualAngle - preferredAngle);
        if (diff < minDiff) {
            minDiff = diff;
            closest = preferredAngle;
        }
    });
    
    return closest;
}

function validarCalidadTrazado(conexiones) {
    console.log('🔍 Validando calidad del trazado profesional...');
    
    let cruzamientos = 0;
    let conexionesOptimas = 0;
    
    for (let i = 0; i < conexiones.length; i++) {
        for (let j = i + 1; j < conexiones.length; j++) {
            if (dosLineasSeCruzan(conexiones[i], conexiones[j])) {
                cruzamientos++;
            }
        }
    }
    
    const eficiencia = conexiones.length > 0 ? (conexionesOptimas / conexiones.length) * 100 : 0;
    
    console.log(`├─ Cruzamientos detectados: ${cruzamientos}`);
    console.log(`├─ Eficiencia del trazado: ${Math.round(eficiencia)}%`);
    console.log(`└─ Calidad: ${cruzamientos < 2 && eficiencia > 70 ? 'PROFESIONAL' : 'MEJORABLE'}`);
    
    return {
        cruzamientos,
        eficiencia,
        calidad: cruzamientos < 2 && eficiencia > 70 ? 'PROFESIONAL' : 'MEJORABLE'
    };
}

function dosLineasSeCruzan(linea1, linea2) {
    return false;
}