// verificacion/calculations.js - MOTOR DE CÁLCULO HIDRÁULICO CORREGIDO
/**
 * CALCULADORA DE PÉRDIDAS DE CARGA - SISTEMA AGUA POTABLE
 * Basado en fórmula de Hazen-Williams
 * Criterios: Velocidad máx 2.0 m/s | Presión mín 10 m.c.a.
 */

// Base de datos de diámetros internos (mm)
export const DIAMETROS_INTERNOS = {
    'PPR': {
        20: 16.6,
        25: 20.4,
        32: 26.0,
        40: 32.6
    },
    'PF': {
        20: 16.6,
        25: 21.6,
        32: 27.8,
        40: 34.8
    },
    'CU': {
        20: 19.94,
        25: 26.04,
        32: 32.12,
        40: 38.24
    }
};

// Longitudes equivalentes por accesorio (metros)
export const LONGITUD_EQUIVALENTE = {
    20: {
        codo90: 0.55,
        codo45: 0.26,
        teePD: 0.29,
        teePL: 0.76,
        valvComp: 0.09,
        valvRet: 1.04
    },
    25: {
        codo90: 0.73,
        codo45: 0.37,
        teePD: 0.40,
        teePL: 1.07,
        valvComp: 0.12,
        valvRet: 1.43
    },
    32: {
        codo90: 1.06,
        codo45: 0.52,
        teePD: 0.55,
        teePL: 1.52,
        valvComp: 0.17,
        valvRet: 2.04
    },
    40: {
        codo90: 1.28,
        codo45: 0.61,
        teePD: 0.67,
        teePL: 1.83,
        valvComp: 0.20,
        valvRet: 2.47
    }
};

// Caudales estimados por artefacto (L/min)
export const CAUDALES_ARTEFACTOS = {
    'wc': 12,
    'lavatorio': 9,
    'bano-tina': 18,
    'ducha': 12,
    'bidet': 6,
    'urinario': 9,
    'lavaplatos': 12,
    'lavacopas': 6,
    'lavadora': 15,
    'lavadero': 9,
    'llave-jardin': 12,
    'conexion-nivel-1': 15
};

// Coeficiente de Hazen-Williams por material
export const COEFICIENTE_C = {
    'PPR': 140,
    'PF': 140,
    'CU': 130
};

// Criterios de diseño
export const CRITERIOS = {
    velocidadMaxima: 2.0,      // m/s
    velocidadIdeal: 1.0,       // m/s
    velocidadMinima: 0.6,      // m/s
    presionMinima: 10,         // m.c.a.
    presionIdeal: 14           // m.c.a.
};

/**
 * Calcula la pérdida de carga usando Hazen-Williams
 */
export function calcularPerdidaCarga(caudal, diametroInterno, longitud, material = 'PPR') {
    const C = COEFICIENTE_C[material] || 140;
    const di_metros = diametroInterno / 1000;
    
    const J = 10.674 * Math.pow(caudal, 1.852) / (Math.pow(C, 1.852) * Math.pow(di_metros, 4.87));
    const perdidaCarga = J * longitud;
    
    const area = Math.PI * Math.pow(di_metros / 2, 2);
    const velocidad = caudal / area;
    
    return {
        J: J,
        perdidaCarga: perdidaCarga,
        velocidad: velocidad
    };
}

/**
 * Calcula longitud equivalente total por accesorios
 */
export function calcularLongitudEquivalente(diametro, accesorios = []) {
    const equivalencias = LONGITUD_EQUIVALENTE[diametro];
    if (!equivalencias) return 0;
    
    let longEquivTotal = 0;
    accesorios.forEach(acc => {
        if (equivalencias[acc.tipo]) {
            longEquivTotal += equivalencias[acc.tipo] * acc.cantidad;
        }
    });
    
    return longEquivTotal;
}

/**
 * Analiza un tramo completo del sistema
 */
export function analizarTramo(tramo, presionEntrada) {
    const material = tramo.material || 'PPR';
    const diametroInterno = DIAMETROS_INTERNOS[material][tramo.diametro];
    
    if (!diametroInterno) {
        console.error(`Diámetro ${tramo.diametro}mm no encontrado para material ${material}`);
        return null;
    }
    
    const longEquiv = calcularLongitudEquivalente(tramo.diametro, tramo.accesorios || []);
    const longitudTotal = tramo.longitud + longEquiv;
    
    const caudalLs = tramo.caudal / 60;
    
    const resultado = calcularPerdidaCarga(caudalLs, diametroInterno, longitudTotal, material);
    
    const presionSalida = presionEntrada - resultado.perdidaCarga;
    
    const estadoVelocidad = resultado.velocidad <= CRITERIOS.velocidadMaxima ? 'OK' : 'REVISAR';
    const estadoPresion = presionSalida >= CRITERIOS.presionMinima ? 'OK' : 'REVISAR';
    const estadoGeneral = (estadoVelocidad === 'OK' && estadoPresion === 'OK') ? 'OK' : 'REVISAR';
    
    return {
        desde: tramo.desde,
        hasta: tramo.hasta,
        material: material,
        diametroNominal: tramo.diametro,
        diametroInterno: diametroInterno,
        longitudReal: tramo.longitud,
        longitudEquivalente: longEquiv,
        longitudTotal: longitudTotal,
        caudal: tramo.caudal,
        velocidad: resultado.velocidad,
        J: resultado.J,
        perdidaCarga: resultado.perdidaCarga,
        presionEntrada: presionEntrada,
        presionSalida: presionSalida,
        estadoVelocidad: estadoVelocidad,
        estadoPresion: estadoPresion,
        estadoGeneral: estadoGeneral
    };
}

/**
 * Analiza todo el sistema completo
 */
export function analizarSistemaCompleto(connections, presionInicial = 14) {
    const resultados = [];
    let presionActual = presionInicial;
    
    connections.forEach((conn, index) => {
        const caudal = CAUDALES_ARTEFACTOS[conn.to.type] || 12;
        
        const accesorios = [
            { tipo: 'codo90', cantidad: 2 }
        ];
        
        const tramo = {
            desde: conn.from.type,
            hasta: conn.to.type,
            longitud: conn.distance,
            diametro: conn.diameter,
            material: conn.material || 'PPR',
            accesorios: accesorios,
            caudal: caudal
        };
        
        const resultado = analizarTramo(tramo, presionActual);
        
        if (resultado) {
            resultados.push({
                numeroTramo: index + 1,
                ...resultado
            });
            presionActual = resultado.presionSalida;
        }
    });
    
    return resultados;
}

/**
 * Verifica si los diámetros son adecuados
 */
export function verificarDiametros(resultados) {
    const problemas = [];
    const recomendaciones = [];
    
    resultados.forEach(r => {
        if (r.velocidad > CRITERIOS.velocidadMaxima) {
            problemas.push({
                tramo: r.numeroTramo,
                tipo: 'VELOCIDAD_ALTA',
                mensaje: `Tramo ${r.numeroTramo}: Velocidad ${r.velocidad.toFixed(2)} m/s excede el máximo (${CRITERIOS.velocidadMaxima} m/s)`,
                valor: r.velocidad,
                limite: CRITERIOS.velocidadMaxima
            });
            recomendaciones.push(`Aumentar diámetro en tramo ${r.numeroTramo} de ${r.diametroNominal}mm a ${r.diametroNominal + 5}mm`);
        }
        
        if (r.velocidad < CRITERIOS.velocidadMinima) {
            problemas.push({
                tramo: r.numeroTramo,
                tipo: 'VELOCIDAD_BAJA',
                mensaje: `Tramo ${r.numeroTramo}: Velocidad ${r.velocidad.toFixed(2)} m/s muy baja (mín ${CRITERIOS.velocidadMinima} m/s)`,
                valor: r.velocidad,
                limite: CRITERIOS.velocidadMinima
            });
            recomendaciones.push(`Reducir diámetro en tramo ${r.numeroTramo} para optimizar costo`);
        }
        
        if (r.presionSalida < CRITERIOS.presionMinima) {
            problemas.push({
                tramo: r.numeroTramo,
                tipo: 'PRESION_BAJA',
                mensaje: `Tramo ${r.numeroTramo}: Presión salida ${r.presionSalida.toFixed(2)} m.c.a. bajo el mínimo (${CRITERIOS.presionMinima} m.c.a.)`,
                valor: r.presionSalida,
                limite: CRITERIOS.presionMinima
            });
            recomendaciones.push(`Aumentar diámetros anteriores o verificar presión de entrada`);
        }
    });
    
    return {
        valido: problemas.length === 0,
        problemas: problemas,
        recomendaciones: recomendaciones,
        resumen: {
            tramosAnalizados: resultados.length,
            tramosOK: resultados.filter(r => r.estadoGeneral === 'OK').length,
            tramosRevisar: resultados.filter(r => r.estadoGeneral === 'REVISAR').length,
            presionFinal: resultados[resultados.length - 1]?.presionSalida || 0
        }
    };
}

/**
 * Genera tabla HTML SIMPLIFICADA con resultados
 */
export function generarTablaHTML(resultados) {
    const filas = resultados.map(r => {
        let estadoVel = '✅';
        if (r.velocidad > 2.0) estadoVel = '⚠️';
        if (r.velocidad < 0.6) estadoVel = '🔵';
        
        let estadoPres = r.presionSalida >= 10 ? '✅' : '❌';
        
        return `
        <tr class="${r.estadoGeneral === 'REVISAR' ? 'fila-problema' : ''}">
            <td><strong>${r.numeroTramo}</strong></td>
            <td class="tramo-nombre">${r.desde} → ${r.hasta}</td>
            <td><strong style="font-size: 16px; color: #1e3a8a;">⌀${r.diametroNominal}mm</strong></td>
            <td><strong>${r.longitudTotal.toFixed(1)}m</strong></td>
            <td class="${r.velocidad > 2.0 ? 'valor-alto' : r.velocidad < 0.6 ? 'valor-bajo' : 'valor-ok'}">
                ${estadoVel} ${r.velocidad.toFixed(2)} m/s
            </td>
            <td>${r.caudal.toFixed(1)} L/min</td>
            <td class="perdida-carga">-${r.perdidaCarga.toFixed(2)}m</td>
            <td class="${r.presionSalida < 10 ? 'valor-critico' : r.presionSalida < 14 ? 'valor-medio' : 'valor-ok'}">
                ${estadoPres} <strong>${r.presionSalida.toFixed(1)} m</strong>
            </td>
        </tr>
    `}).join('');
    
    return `
        <div class="tabla-container">
            <table class="tabla-verificacion-simple">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tramo</th>
                        <th>Diámetro</th>
                        <th>Longitud</th>
                        <th>Velocidad</th>
                        <th>Caudal</th>
                        <th>Pérdida</th>
                        <th>Presión Final</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas}
                </tbody>
            </table>
            
            <div class="leyenda-simple">
                <div class="leyenda-item">
                    <strong>Velocidad:</strong>
                    <span class="valor-ok">✅ 0.6-2.0 m/s OK</span>
                    <span class="valor-alto">⚠️ >2.0 m/s Alto</span>
                    <span class="valor-bajo">🔵 <0.6 m/s Bajo</span>
                </div>
                <div class="leyenda-item">
                    <strong>Presión:</strong>
                    <span class="valor-ok">✅ ≥14m Óptimo</span>
                    <span class="valor-medio">⚠️ 10-14m Aceptable</span>
                    <span class="valor-critico">❌ <10m Crítico</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * ✅ FUNCIÓN PRINCIPAL DE VERIFICACIÓN - EXPORTADA
 */
export function verificarSistema(connections, presionInicial = 14) {
    console.log('🔍 Iniciando verificación hidráulica...');
    console.log(`📊 Conexiones a analizar: ${connections.length}`);
    console.log(`💧 Presión inicial: ${presionInicial} m.c.a.`);
    
    const resultados = analizarSistemaCompleto(connections, presionInicial);
    const verificacion = verificarDiametros(resultados);
    
    console.log('✅ Análisis completado');
    console.log(`   Tramos OK: ${verificacion.resumen.tramosOK}`);
    console.log(`   Tramos a revisar: ${verificacion.resumen.tramosRevisar}`);
    console.log(`   Presión final: ${verificacion.resumen.presionFinal.toFixed(2)} m.c.a.`);
    
    return {
        resultados: resultados,
        verificacion: verificacion,
        tablaHTML: generarTablaHTML(resultados)
    };
}