/**
 * ZAPATA CORRIDA - CÁLCULO PRINCIPAL
 * Función principal que realiza todos los cálculos estructurales
 */

function calcularZapataCorrida() {
    // Obtener valores de entrada
    const D = parseFloat(document.getElementById('cargaMuerta').value);
    const L = parseFloat(document.getElementById('cargaViva').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const fy = parseFloat(document.getElementById('fy').value);
    const qadm = parseFloat(document.getElementById('qadm').value);
    const Df = parseFloat(document.getElementById('profundidad').value);
    const bMuro = parseFloat(document.getElementById('anchoMuro').value);
    const largoMuro = parseFloat(document.getElementById('largoMuro').value);
    const h_input = parseFloat(document.getElementById('alturaZapata').value);
    
    // Validaciones
    if (D <= 0 || L <= 0 || qadm <= 0 || Df <= 0 || h_input <= 0 || largoMuro <= 0) {
        alert('Por favor ingrese valores válidos mayores a cero');
        return;
    }
    
    // CÁLCULO DE CARGAS ÚLTIMAS (NCh1537)
    const Pu = 1.2 * D + 1.6 * L; // kN/m (Combinación U2)
    const Pservicio = D + L; // kN/m
    
    // DIMENSIONAMIENTO DE LA ZAPATA
    // Ancho requerido por capacidad portante
    const pesoSueloEstimado = 18 * Df; // kN/m² (peso del suelo sobre zapata)
    const qneto = qadm - pesoSueloEstimado;
    const B_requerido = Pservicio / qneto; // m
    
    // Redondear hacia arriba a múltiplo de 0.05m
    const B = Math.ceil(B_requerido * 20) / 20;
    
    // Usar altura ingresada por el usuario
    const h_redondeado = h_input;
    
    // Recubrimiento
    const recubrimiento = NormativaChile.hormigon.recubrimiento.contactoTerreno / 1000; // m
    const d = h_redondeado - recubrimiento - 0.01; // m (altura efectiva)
    
    // VERIFICACIÓN DE PRESIÓN EN EL SUELO
    const pesoZapata = B * h_redondeado * NormativaChile.hormigon.pesoEspecifico.armado; // kN/m
    const pesoSuelo = B * Df * 18; // kN/m
    const Ptotal = Pservicio + pesoZapata + pesoSuelo;
    const qactual = Ptotal / B;
    
    // DISEÑO POR FLEXIÓN
    // Momento en el borde del muro
    const voladizo = (B - bMuro) / 2;
    const qu = Pu / B; // kN/m²
    const Mu = qu * Math.pow(voladizo, 2) / 2; // kN·m/m
    
    // Área de acero requerida
    const As_req = CalculosComunes.calcularAceroFlexion(Mu, 1.0, d, fc, fy); // cm²/m
    const As_min = CalculosComunes.calcularAceroMinimo(100, d * 100, fy); // cm²/m
    const As = Math.max(As_req, As_min);
    
    // Distribución de barras
    const distribucion = CalculosComunes.distribuirBarras(As, 100);
    
    // VERIFICACIÓN DE CORTANTE
    const d_cm = d * 100;
    const Vu = qu * (voladizo - d); // kN/m
    const cortante = CalculosComunes.calcularCortante(Vu, 100, d_cm, fc);
    
    // SUGERENCIAS CORTANTE
    if (cortante.necesitaEstribos && typeof SugerenciasInteligentes !== 'undefined') {
        cortante.sugerencias = SugerenciasInteligentes.sugerirCortante({
            Vu: Vu,
            phiVc: parseFloat(cortante.Vc),
            b: B,
            d: d,
            fc: fc
        });
    }
    
    // VERIFICACIÓN DE PRESIÓN
    const verificacionPresion = {
        cumple: qactual <= qadm,
        porcentaje: ((qactual / qadm) * 100).toFixed(1)
    };
    
    // SUGERENCIAS INTELIGENTES
    if (!verificacionPresion.cumple && typeof SugerenciasInteligentes !== 'undefined') {
        verificacionPresion.sugerencias = SugerenciasInteligentes.sugerirPresionSuelo({
            qactual: qactual,
            qadm: qadm,
            B_actual: B,
            h_actual: h_redondeado,
            Pservicio: Pservicio,
            Df: Df
        });
    }
    
    // Guardar datos para Solo Acero
    datosZapataActual = {
        B: B,
        h: h_redondeado,
        L: largoMuro, // USAR el largo ingresado por el usuario
        bMuro: bMuro,
        Df: Df,
        distribucion: distribucion
    };
    
    // MOSTRAR RESULTADOS
    mostrarResultados({
        B: B,
        h: h_redondeado,
        d: d,
        Pu: Pu,
        Mu: Mu,
        As: As,
        distribucion: distribucion,
        qactual: qactual,
        qadm: qadm,
        verificacionPresion: verificacionPresion,
        cortante: cortante,
        voladizo: voladizo,
        bMuro: bMuro
    });
    
    // ACTUALIZAR VISUALIZACIÓN 3D
    actualizarVisualizacion3D(datosZapataActual);
}