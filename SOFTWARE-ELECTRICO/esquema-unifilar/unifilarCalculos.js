// ============================================================
// ESQUEMA UNIFILAR CÁLCULOS - Análisis de circuitos
// ============================================================

/**
 * Analizar datos del plano y calcular parámetros del esquema
 */
function analizarDatosUnifilar() {
    const datos = {
        // Datos generales
        potenciaTotal: CuadroState.totalPotencia || 0,
        corrienteTotal: CuadroState.totalCorriente || 0,
        demandaPotencia: CuadroState.demandaPotencia || 0,
        demandaCorriente: CuadroState.demandaCorriente || 0,
        iga: CuadroState.interruptorGeneral || '-',
        
        // Circuitos por nivel
        circuitosN1: CuadroState.circuits.level1 || [],
        circuitosN2: CuadroState.circuits.level2 || [],
        
        // Todos los circuitos
        todosCircuitos: [
            ...CuadroState.circuits.level1,
            ...CuadroState.circuits.level2
        ],
        
        // Estadísticas
        totalCircuitos: 0,
        iluminacionCount: 0,
        enchufesCount: 0,
        especialesCount: 0
    };
    
    // Contar por categoría
    datos.todosCircuitos.forEach(c => {
        datos.totalCircuitos++;
        if (c.categoria === 'iluminacion') datos.iluminacionCount++;
        else if (c.categoria === 'enchufes') datos.enchufesCount++;
        else if (c.categoria === 'electrodomesticos') datos.especialesCount++;
    });
    
    // Calcular alimentación principal
    datos.alimentacion = calcularAlimentacionPrincipal(datos.demandaCorriente);
    
    return datos;
}

/**
 * Calcular sección de alimentación principal y ducto
 */
function calcularAlimentacionPrincipal(corrienteDemanda) {
    const corriente = parseFloat(corrienteDemanda);
    
    let seccion = '10.0';
    let ducto = 'Ø25mm';
    
    if (corriente <= 32) {
        seccion = '6.0';
        ducto = 'Ø20mm';
    } else if (corriente <= 40) {
        seccion = '10.0';
        ducto = 'Ø25mm';
    } else if (corriente <= 50) {
        seccion = '16.0';
        ducto = 'Ø32mm';
    } else if (corriente <= 63) {
        seccion = '25.0';
        ducto = 'Ø40mm';
    } else {
        seccion = '35.0';
        ducto = 'Ø50mm';
    }
    
    return {
        seccion: seccion + ' mm²',
        ducto: ducto
    };
}

/**
 * Agrupar circuitos por categoría para mejor visualización
 */
function agruparCircuitosPorCategoria(circuitos) {
    const grupos = {
        iluminacion: [],
        enchufes: [],
        especiales: []
    };
    
    circuitos.forEach(c => {
        if (c.categoria === 'iluminacion') {
            grupos.iluminacion.push(c);
        } else if (c.categoria === 'enchufes') {
            grupos.enchufes.push(c);
        } else if (c.categoria === 'electrodomesticos') {
            grupos.especiales.push(c);
        }
    });
    
    return grupos;
}

console.log('✅ Esquema Unifilar Cálculos inicializado');
