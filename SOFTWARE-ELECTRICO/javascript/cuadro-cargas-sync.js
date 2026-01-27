// ========================================
// SINCRONIZACIÓN AUTOMÁTICA CUADRO DE CARGAS
// Sistema de actualización en tiempo real - MEJORADO
// Cumple con normativa SEC Chile
// Integra con el modal de Cuadro de Cargas
// ========================================

// Estado del Cuadro de Cargas
const CuadroState = {
    isOpen: false,
    circuits: {
        level1: [],
        level2: []
    },
    // Configuración de potencia y amperaje por tipo de elemento
    elementConfig: {
        // ILUMINACIÓN
        'luminaria-cielo': { tipo: 'Iluminación', categoria: 'iluminacion', potencia: 100, agrupable: true, diferencial: false },
        'aplique': { tipo: 'Iluminación', categoria: 'iluminacion', potencia: 80, agrupable: true, diferencial: false },
        'luminaria-exterior': { tipo: 'Iluminación', categoria: 'iluminacion', potencia: 120, agrupable: true, diferencial: false },
        'luz-simple': { tipo: 'Iluminación', categoria: 'iluminacion', potencia: 100, agrupable: true, diferencial: false },
        'luz-doble': { tipo: 'Iluminación', categoria: 'iluminacion', potencia: 200, agrupable: true, diferencial: false },
        
        // ENCHUFES
        'enchufe-simple': { tipo: 'Tomas Generales', categoria: 'enchufes', potencia: 200, agrupable: true, diferencial: true },
        'enchufe-doble': { tipo: 'Tomas Generales', categoria: 'enchufes', potencia: 400, agrupable: true, diferencial: true },
        'enchufe-especial': { tipo: 'Toma Especial', categoria: 'enchufes', potencia: 800, agrupable: false, diferencial: true },
        'enchufe-exterior': { tipo: 'Toma Exterior', categoria: 'enchufes', potencia: 300, agrupable: true, diferencial: true },
        
        // INTERRUPTORES (no consumen potencia)
        'int-simple': { tipo: 'Iluminación', categoria: 'iluminacion', potencia: 0, agrupable: true, diferencial: false },
        'int-doble': { tipo: 'Iluminación', categoria: 'iluminacion', potencia: 0, agrupable: true, diferencial: false },
        'conmutador': { tipo: 'Iluminación', categoria: 'iluminacion', potencia: 0, agrupable: true, diferencial: false },
        'pulsador': { tipo: 'Iluminación', categoria: 'iluminacion', potencia: 0, agrupable: true, diferencial: false },
        
        // ELECTRODOMÉSTICOS
        'lavadora': { tipo: 'Lavadora', categoria: 'electrodomesticos', potencia: 2200, agrupable: false, diferencial: true },
        'secadora': { tipo: 'Secadora', categoria: 'electrodomesticos', potencia: 2400, agrupable: false, diferencial: true },
        'refrigerador': { tipo: 'Refrigerador', categoria: 'electrodomesticos', potencia: 800, agrupable: false, diferencial: false },
        'microondas': { tipo: 'Microondas', categoria: 'electrodomesticos', potencia: 1200, agrupable: false, diferencial: true },
        'horno': { tipo: 'Horno Eléctrico', categoria: 'electrodomesticos', potencia: 3500, agrupable: false, diferencial: true },
        'cocina': { tipo: 'Cocina Eléctrica', categoria: 'electrodomesticos', potencia: 5000, agrupable: false, diferencial: true },
        'calefon': { tipo: 'Calefón/Terma', categoria: 'electrodomesticos', potencia: 4500, agrupable: false, diferencial: true }
    },
    totalPotencia: 0,
    totalCorriente: 0,
    demandaPotencia: 0,
    demandaCorriente: 0,
    interruptorGeneral: '-',
    factorDemanda: 0.75 // Factor estándar para viviendas según SEC
};

function initCuadroCargas() {
    console.log('📋 Inicializando sistema de Cuadro de Cargas');
    interceptarAgregarElementos();
    interceptarEliminarElementos();
    console.log('✅ Sistema de Cuadro de Cargas listo');
}

function interceptarAgregarElementos() {
    const originalPlaceSymbolWithLevel = window.placeSymbolWithLevel;
    window.placeSymbolWithLevel = function(x, y, toolName, level) {
        if (originalPlaceSymbolWithLevel) {
            originalPlaceSymbolWithLevel(x, y, toolName, level);
        }
        agregarElementoACuadro(toolName, level);
    };
}

function interceptarEliminarElementos() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Delete' && AppState.selectedElement) {
            const elementData = AppState.elements.find(el => el.element === AppState.selectedElement);
            if (elementData) {
                eliminarElementoDeCuadro(elementData.type, elementData.level);
            }
        }
    });
}

function agregarElementoACuadro(toolName, level) {
    const config = CuadroState.elementConfig[toolName];
    if (!config) return;
    
    const nivelKey = `level${level || 1}`;
    
    if (config.agrupable) {
        const circuitoExistente = CuadroState.circuits[nivelKey].find(c => c.tipo === config.tipo);
        if (circuitoExistente) {
            circuitoExistente.cantidad++;
            circuitoExistente.potencia += config.potencia;
            circuitoExistente.corriente = (circuitoExistente.potencia / 220).toFixed(1);
            circuitoExistente.seccion = calcularSeccion(circuitoExistente.corriente);
            circuitoExistente.tierra = calcularTierra(circuitoExistente.seccion);
            circuitoExistente.automatico = calcularAutomatico(circuitoExistente.corriente);
            circuitoExistente.diferencial = config.diferencial ? calcularDiferencial(circuitoExistente.corriente) : '-';
        } else {
            const nuevoCircuito = {
                id: `${config.tipo}_${nivelKey}_${Date.now()}`,
                tipo: config.tipo,
                categoria: config.categoria,
                potencia: config.potencia,
                corriente: (config.potencia / 220).toFixed(1),
                seccion: calcularSeccion(config.potencia / 220),
                tierra: calcularTierra(calcularSeccion(config.potencia / 220)),
                automatico: calcularAutomatico(config.potencia / 220),
                diferencial: config.diferencial ? calcularDiferencial(config.potencia / 220) : '-',
                cantidad: 1,
                nivel: level || 1
            };
            CuadroState.circuits[nivelKey].push(nuevoCircuito);
        }
    } else {
        const nuevoCircuito = {
            id: `${toolName}_${Date.now()}`,
            tipo: config.tipo,
            categoria: config.categoria,
            potencia: config.potencia,
            corriente: (config.potencia / 220).toFixed(1),
            seccion: calcularSeccion(config.potencia / 220),
            tierra: calcularTierra(calcularSeccion(config.potencia / 220)),
            automatico: calcularAutomatico(config.potencia / 220),
            diferencial: config.diferencial ? calcularDiferencial(config.potencia / 220) : '-',
            cantidad: 1,
            nivel: level || 1
        };
        CuadroState.circuits[nivelKey].push(nuevoCircuito);
    }
    
    recalcularTotales();
    if (CuadroState.isOpen) actualizarTablaCuadroCargas();
}

function eliminarElementoDeCuadro(toolName, level) {
    const config = CuadroState.elementConfig[toolName];
    if (!config) return;
    
    const nivelKey = `level${level || 1}`;
    
    if (config.agrupable) {
        const circuitoIndex = CuadroState.circuits[nivelKey].findIndex(c => c.tipo === config.tipo);
        if (circuitoIndex !== -1) {
            const circuito = CuadroState.circuits[nivelKey][circuitoIndex];
            if (circuito.cantidad > 1) {
                circuito.cantidad--;
                circuito.potencia -= config.potencia;
                circuito.corriente = (circuito.potencia / 220).toFixed(1);
                circuito.seccion = calcularSeccion(circuito.corriente);
                circuito.tierra = calcularTierra(circuito.seccion);
                circuito.automatico = calcularAutomatico(circuito.corriente);
                circuito.diferencial = config.diferencial ? calcularDiferencial(circuito.corriente) : '-';
            } else {
                CuadroState.circuits[nivelKey].splice(circuitoIndex, 1);
            }
        }
    } else {
        const circuitoIndex = CuadroState.circuits[nivelKey].findIndex(c => c.tipo === config.tipo);
        if (circuitoIndex !== -1) {
            CuadroState.circuits[nivelKey].splice(circuitoIndex, 1);
        }
    }
    
    recalcularTotales();
    if (CuadroState.isOpen) actualizarTablaCuadroCargas();
}

function recalcularTotales() {
    CuadroState.totalPotencia = 0;
    [...CuadroState.circuits.level1, ...CuadroState.circuits.level2].forEach(circuito => {
        CuadroState.totalPotencia += circuito.potencia;
    });
    CuadroState.totalCorriente = (CuadroState.totalPotencia / 220).toFixed(1);
    CuadroState.demandaPotencia = Math.round(CuadroState.totalPotencia * CuadroState.factorDemanda);
    CuadroState.demandaCorriente = (CuadroState.demandaPotencia / 220).toFixed(1);
    CuadroState.interruptorGeneral = calcularInterruptorGeneral(CuadroState.demandaCorriente);
}

function calcularSeccion(corriente) {
    corriente = parseFloat(corriente);
    if (corriente <= 10) return '1.5';
    if (corriente <= 16) return '2.5';
    if (corriente <= 25) return '4.0';
    if (corriente <= 32) return '6.0';
    if (corriente <= 40) return '10.0';
    return '16.0';
}

function calcularTierra(seccionFase) { return seccionFase; }

function calcularAutomatico(corriente) {
    corriente = parseFloat(corriente);
    if (corriente <= 10) return '10A - 1P';
    if (corriente <= 16) return '16A - 1P';
    if (corriente <= 20) return '20A - 1P';
    if (corriente <= 25) return '25A - 2P';
    if (corriente <= 32) return '32A - 2P';
    if (corriente <= 40) return '40A - 2P';
    return '50A - 2P';
}

function calcularDiferencial(corriente) {
    corriente = parseFloat(corriente);
    if (corriente <= 16) return '25A/30mA';
    if (corriente <= 25) return '40A/30mA';
    if (corriente <= 40) return '63A/30mA';
    return '80A/30mA';
}

function calcularInterruptorGeneral(corrienteDemanda) {
    const corriente = parseFloat(corrienteDemanda);
    if (corriente <= 16) return '20A - 2P';
    if (corriente <= 20) return '25A - 2P';
    if (corriente <= 25) return '32A - 2P';
    if (corriente <= 32) return '40A - 2P';
    if (corriente <= 40) return '50A - 2P';
    if (corriente <= 50) return '63A - 2P';
    return '80A - 2P';
}

function actualizarTablaCuadroCargas() {
    const tbody = document.getElementById('tablaCargasBody');
    if (!tbody) return;
    
    const todosCircuitos = [
        ...CuadroState.circuits.level1.map(c => ({...c, nivelLabel: 'N1'})),
        ...CuadroState.circuits.level2.map(c => ({...c, nivelLabel: 'N2'}))
    ];
    
    if (todosCircuitos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #7f8c8d; font-style: italic; font-size: 15px;">
                    <div style="margin-bottom: 10px; font-size: 48px;">📋</div>
                    <div style="font-weight: 600; margin-bottom: 8px;">Sin elementos en el plano</div>
                    <div style="font-size: 13px;">Agrega símbolos eléctricos para generar el cuadro de cargas automáticamente</div>
                </td>
            </tr>
        `;
        actualizarElementosTotales(0, 0, 0, 0, '-');
        return;
    }
    
    const iluminacion = todosCircuitos.filter(c => c.categoria === 'iluminacion');
    const enchufes = todosCircuitos.filter(c => c.categoria === 'enchufes');
    const electrodomesticos = todosCircuitos.filter(c => c.categoria === 'electrodomesticos');
    
    let html = '';
    let numeroCircuito = 1;
    
    if (iluminacion.length > 0) {
        html += `<tr style="background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); color: #2d3436; font-weight: bold;">
            <td colspan="8" style="padding: 12px; font-size: 14px;">💡 CIRCUITOS DE ILUMINACIÓN</td></tr>`;
        iluminacion.forEach(c => { html += generarFilaCircuito(c, numeroCircuito++, '#fff9e6'); });
    }
    
    if (enchufes.length > 0) {
        html += `<tr style="background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); color: white; font-weight: bold;">
            <td colspan="8" style="padding: 12px; font-size: 14px;">🔌 CIRCUITOS DE TOMACORRIENTES</td></tr>`;
        enchufes.forEach(c => { html += generarFilaCircuito(c, numeroCircuito++, '#e8f4ff'); });
    }
    
    if (electrodomesticos.length > 0) {
        html += `<tr style="background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%); color: white; font-weight: bold;">
            <td colspan="8" style="padding: 12px; font-size: 14px;">⚡ CIRCUITOS ESPECIALES</td></tr>`;
        electrodomesticos.forEach(c => { html += generarFilaCircuito(c, numeroCircuito++, '#f3f2ff'); });
    }
    
    tbody.innerHTML = html;
    actualizarElementosTotales(
        CuadroState.totalPotencia,
        CuadroState.totalCorriente,
        CuadroState.demandaPotencia,
        CuadroState.demandaCorriente,
        CuadroState.interruptorGeneral
    );
    
    // Actualizar modal si está abierto
    if (typeof actualizarTablaCuadroCargasModal === 'function') {
        actualizarTablaCuadroCargasModal();
    }
}

function generarFilaCircuito(circuito, numero, colorFondo) {
    const nombre = circuito.cantidad > 1 ? `${circuito.tipo} <span style="color: #e74c3c; font-weight: bold;">(×${circuito.cantidad})</span>` : circuito.tipo;
    const colorNivel = circuito.nivel === 1 ? '#3498db' : '#9b59b6';
    
    return `
        <tr style="background: ${colorFondo};" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='${colorFondo}'">
            <td style="font-weight: bold;">C${numero} <span style="color: ${colorNivel}; font-size: 11px; padding: 2px 6px; background: ${colorNivel}22; border-radius: 3px;">${circuito.nivelLabel}</span></td>
            <td style="font-weight: 500;">${nombre}</td>
            <td style="text-align: center; font-weight: 600;">${circuito.potencia} W</td>
            <td style="text-align: center; font-weight: 600; color: #e74c3c;">${circuito.corriente} A</td>
            <td style="text-align: center; font-weight: 600; color: #16a085;">${circuito.seccion} mm²</td>
            <td style="text-align: center; font-weight: 600; color: #27ae60;">${circuito.tierra} mm²</td>
            <td style="text-align: center; font-size: 12px;">${circuito.automatico}</td>
            <td style="text-align: center; font-size: 12px; color: ${circuito.diferencial !== '-' ? '#e67e22' : '#95a5a6'};">${circuito.diferencial}</td>
        </tr>
    `;
}

function actualizarElementosTotales(totalPot, totalCorr, demandaPot, demandaCorr, iga) {
    const elementos = {
        totalPotencia: document.getElementById('totalPotencia'),
        totalCorriente: document.getElementById('totalCorriente'),
        demandaPotencia: document.getElementById('demandaPotencia'),
        demandaCorriente: document.getElementById('demandaCorriente'),
        interruptorGeneral: document.getElementById('interruptorGeneral')
    };
    
    if (elementos.totalPotencia) elementos.totalPotencia.textContent = `${totalPot} W`;
    if (elementos.totalCorriente) elementos.totalCorriente.textContent = `${totalCorr} A`;
    if (elementos.demandaPotencia) elementos.demandaPotencia.textContent = `${demandaPot} W`;
    if (elementos.demandaCorriente) elementos.demandaCorriente.textContent = `${demandaCorr} A`;
    if (elementos.interruptorGeneral) elementos.interruptorGeneral.textContent = iga;
}

function sincronizarCuadroDesdePlano() {
    CuadroState.circuits.level1 = [];
    CuadroState.circuits.level2 = [];
    CuadroState.totalPotencia = 0;
    CuadroState.totalCorriente = 0;
    CuadroState.demandaPotencia = 0;
    CuadroState.demandaCorriente = 0;
    CuadroState.interruptorGeneral = '-';
    
    if (typeof AppState !== 'undefined' && AppState.elements) {
        AppState.elements.forEach(element => {
            agregarElementoACuadro(element.type, element.level || 1);
        });
    }
    
    actualizarTablaCuadroCargas();
}

function limpiarCuadroCargas() {
    CuadroState.circuits.level1 = [];
    CuadroState.circuits.level2 = [];
    CuadroState.totalPotencia = 0;
    CuadroState.totalCorriente = 0;
    CuadroState.demandaPotencia = 0;
    CuadroState.demandaCorriente = 0;
    CuadroState.interruptorGeneral = '-';
    if (CuadroState.isOpen) actualizarTablaCuadroCargas();
}

window.CuadroState = CuadroState;
window.initCuadroCargas = initCuadroCargas;
window.sincronizarCuadroDesdePlano = sincronizarCuadroDesdePlano;
window.limpiarCuadroCargas = limpiarCuadroCargas;
window.actualizarTablaCuadroCargas = actualizarTablaCuadroCargas;

console.log('✅ Sistema de Cuadro de Cargas MEJORADO cargado - Integración con modal activa');