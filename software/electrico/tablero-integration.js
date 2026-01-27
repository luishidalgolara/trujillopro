// ========================================
// INTEGRACIÓN AUTOMÁTICA TABLERO ELÉCTRICO
// Sistema de sincronización en tiempo real
// ========================================

// Estado del tablero sincronizado
const TableroState = {
    isOpen: false,
    circuits: {
        level1: [],
        level2: []
    },
    autoAssignments: {
        'luminaria-cielo': { circuit: 'iluminacion', amp: 10, power: 100 },
        'aplique': { circuit: 'iluminacion', amp: 10, power: 80 },
        'luminaria-exterior': { circuit: 'iluminacion', amp: 10, power: 120 },
        'luz-simple': { circuit: 'iluminacion', amp: 10, power: 100 },
        'luz-doble': { circuit: 'iluminacion', amp: 10, power: 200 },
        
        'enchufe-simple': { circuit: 'tomas', amp: 16, power: 200 },
        'enchufe-doble': { circuit: 'tomas', amp: 16, power: 400 },
        'enchufe-especial': { circuit: 'especial', amp: 20, power: 800, name: 'Especial' },
        'enchufe-exterior': { circuit: 'exterior', amp: 16, power: 300 },
        
        'int-simple': { circuit: 'iluminacion', amp: 10, power: 0 },
        'int-doble': { circuit: 'iluminacion', amp: 10, power: 0 },
        'conmutador': { circuit: 'iluminacion', amp: 10, power: 0 },
        'pulsador': { circuit: 'iluminacion', amp: 10, power: 0 },
        
        // ELECTRODOMÉSTICOS
        'lavadora': { circuit: 'lavadora', amp: 20, power: 2200, name: 'Lavadora' },
        'secadora': { circuit: 'secadora', amp: 20, power: 2400, name: 'Secadora' },
        'refrigerador': { circuit: 'refrigerador', amp: 10, power: 800, name: 'Refrigerador' },
        'microondas': { circuit: 'microondas', amp: 16, power: 1200, name: 'Microondas' },
        'horno': { circuit: 'horno', amp: 25, power: 3500, name: 'Horno Eléctrico' },
        'cocina': { circuit: 'cocina', amp: 32, power: 5000, name: 'Cocina Eléctrica' },
        'calefon': { circuit: 'calefon', amp: 32, power: 4500, name: 'Calefón/Terma' }
    },
    symbolCounts: {},
    totalPower: 0
};

// ========================================
// FUNCIONES DE SINCRONIZACIÓN
// ========================================

/**
 * Inicializar el sistema de integración
 */
function initTableroIntegration() {
    console.log('🔌 Inicializando integración de tablero');
    
    // Observar cambios en el estado de elementos
    setupElementObserver();
    
    // Inicializar contadores
    resetSymbolCounts();
}

/**
 * Configurar observador de elementos
 */
function setupElementObserver() {
    // Interceptar la función original de colocar símbolos
    const originalPlaceSymbol = window.placeSymbol;
    const originalPlaceSymbolWithLevel = window.placeSymbolWithLevel;
    
    // Interceptar placeSymbol (sin nivel)
    window.placeSymbol = function(x, y, toolName) {
        // Llamar a la función original
        originalPlaceSymbol(x, y, toolName);
        
        // Sincronizar con el tablero (nivel 1 por defecto)
        onSymbolAdded(toolName, 1);
    };
    
    // Interceptar placeSymbolWithLevel (con nivel)
    window.placeSymbolWithLevel = function(x, y, toolName, level) {
        // Llamar a la función original
        if (originalPlaceSymbolWithLevel) {
            originalPlaceSymbolWithLevel(x, y, toolName, level);
        }
        
        // Sincronizar con el tablero con el nivel correcto
        onSymbolAdded(toolName, level);
    };
    
    console.log('👁️ Observador de elementos configurado');
}

/**
 * Resetear contadores de símbolos
 */
function resetSymbolCounts() {
    TableroState.symbolCounts = {};
    TableroState.totalPower = 0;
}

/**
 * Cuando se agrega un símbolo al plano
 */
function onSymbolAdded(toolName, level) {
    // Incrementar contador
    if (!TableroState.symbolCounts[toolName]) {
        TableroState.symbolCounts[toolName] = 0;
    }
    TableroState.symbolCounts[toolName]++;
    
    // Obtener configuración automática
    const config = TableroState.autoAssignments[toolName];
    
    if (config) {
        // Agregar al tablero si está abierto
        if (TableroState.isOpen) {
            addCircuitToTablero(toolName, config, level || 1);
        }
        
        // Actualizar potencia total
        TableroState.totalPower += config.power;
        
        console.log(`⚡ Símbolo agregado: ${toolName}, Nivel: ${level || 1}, Potencia total: ${TableroState.totalPower}W`);
        
        // Actualizar display si el tablero está abierto
        if (TableroState.isOpen) {
            updateTableroDisplay();
        }
    }
}

/**
 * Agregar circuito al tablero automáticamente
 */
function addCircuitToTablero(toolName, config, level) {
    const symbol = ElectricSymbols[toolName];
    const count = TableroState.symbolCounts[toolName];
    
    // Generar nombre único para el circuito
    const circuitName = config.name || `${symbol.name} #${count}`;
    
    // Usar el nivel proporcionado
    const circuitLevel = level || 1;
    
    // Verificar si ya existe un circuito agrupador para este tipo EN EL MISMO NIVEL
    const existingCircuit = TableroState.circuits[`level${circuitLevel}`].find(
        c => c.type === config.circuit
    );
    
    if (existingCircuit) {
        // Actualizar circuito existente
        existingCircuit.power += config.power;
        existingCircuit.count++;
        existingCircuit.items.push(circuitName);
    } else {
        // Crear nuevo circuito agrupador
        const newCircuit = {
            id: `${config.circuit}_l${circuitLevel}_${Date.now()}`,
            type: config.circuit,
            level: circuitLevel,
            amp: config.amp,
            name: getCircuitGroupName(config.circuit),
            power: config.power,
            section: calculateCableSection(config.amp),
            count: 1,
            items: [circuitName]
        };
        
        TableroState.circuits[`level${circuitLevel}`].push(newCircuit);
    }
    
    console.log(`📊 Circuito actualizado en tablero (Nivel ${circuitLevel}):`, config.circuit);
}

/**
 * Obtener nombre del grupo de circuitos
 */
function getCircuitGroupName(circuitType) {
    const names = {
        'iluminacion': 'Iluminación',
        'tomas': 'Tomas Generales',
        'especial': 'Circuito Especial',
        'exterior': 'Exterior',
        'lavadora': 'Lavadora',
        'secadora': 'Secadora',
        'refrigerador': 'Refrigerador',
        'microondas': 'Microondas',
        'horno': 'Horno Eléctrico',
        'cocina': 'Cocina Eléctrica',
        'calefon': 'Calefón/Terma'
    };
    return names[circuitType] || 'Circuito';
}

/**
 * Calcular sección de cable según amperaje
 */
function calculateCableSection(amp) {
    if (amp <= 10) return 1.5;
    if (amp <= 16) return 2.5;
    if (amp <= 20) return 4.0;
    if (amp <= 25) return 6.0;
    if (amp <= 32) return 10.0;
    return 16.0;
}

/**
 * Actualizar la visualización del tablero
 */
function updateTableroDisplay() {
    // Actualizar medidor de energía
    updateEnergyMeter();
    
    // Actualizar estadísticas
    updateTableroStats();
    
    // Renderizar circuitos en los grids
    renderTableroCircuits();
    
    // Actualizar información de circuitos
    updateCircuitInfo();
}

/**
 * Actualizar medidor de energía
 */
function updateEnergyMeter() {
    const totalPowerEl = document.getElementById('tableroPower');
    const totalCurrentEl = document.getElementById('tableroCurrent');
    
    if (totalPowerEl) {
        totalPowerEl.innerHTML = `${TableroState.totalPower}<span class="stat-unit">W</span>`;
    }
    
    if (totalCurrentEl) {
        const current = (TableroState.totalPower / 220).toFixed(1);
        totalCurrentEl.innerHTML = `${current}<span class="stat-unit">A</span>`;
    }
}

/**
 * Actualizar estadísticas del tablero
 */
function updateTableroStats() {
    const statusEl = document.getElementById('tableroStatus');
    const loadPercentage = (TableroState.totalPower / 8800) * 100;
    
    if (statusEl) {
        statusEl.classList.remove('status-ok', 'status-warning', 'status-danger');
        
        if (loadPercentage > 90) {
            statusEl.textContent = 'SOBRECARGA';
            statusEl.classList.add('status-danger');
        } else if (loadPercentage > 70) {
            statusEl.textContent = 'ALERTA';
            statusEl.classList.add('status-warning');
        } else {
            statusEl.textContent = 'NORMAL';
            statusEl.classList.add('status-ok');
        }
    }
}

/**
 * Renderizar circuitos en los grids del tablero
 */
function renderTableroCircuits() {
    // Renderizar nivel 1
    const level1Grid = document.getElementById('tableroLevel1Grid');
    if (level1Grid) {
        level1Grid.innerHTML = TableroState.circuits.level1.map(circuit => 
            createCircuitHTML(circuit)
        ).join('');
    }
    
    // Renderizar nivel 2
    const level2Grid = document.getElementById('tableroLevel2Grid');
    if (level2Grid) {
        level2Grid.innerHTML = TableroState.circuits.level2.map(circuit => 
            createCircuitHTML(circuit)
        ).join('');
    }
}

/**
 * Crear HTML para un circuito con diseño realista
 */
function createCircuitHTML(circuit) {
    return `
        <div class="tablero-breaker" data-circuit="${circuit.id}" onclick="toggleBreakerState('${circuit.id}')">
            <div class="breaker-din-rail-slot left"></div>
            <div class="breaker-din-rail-slot right"></div>
            
            <div class="breaker-count" title="${circuit.count} elementos">${circuit.count}</div>
            
            <div class="breaker-terminal-top">
                <div class="breaker-terminal-screw"></div>
            </div>
            
            <div class="breaker-window">
                <div class="breaker-window-screw"></div>
            </div>
            
            <div class="breaker-label">C${circuit.amp}</div>
            <div class="breaker-circuit-name">${circuit.name}</div>
            
            <div class="breaker-switch">
                <div class="breaker-switch-top">OFF</div>
                <div class="breaker-switch-toggle"></div>
            </div>
            
            <div class="breaker-led">
                <div class="breaker-led-indicator">
                    <div class="breaker-led-text">OFF</div>
                </div>
            </div>
            
            <div class="breaker-terminal-bottom">
                <div class="breaker-terminal-screw"></div>
            </div>
            
            <div class="breaker-power">0W</div>
            <div class="breaker-cert">IEC 60898</div>
        </div>
    `;
}

/**
 * Actualizar información de circuitos
 */
function updateCircuitInfo() {
    // Actualizar lista nivel 1
    const level1List = document.getElementById('tableroLevel1List');
    if (level1List) {
        if (TableroState.circuits.level1.length === 0) {
            level1List.innerHTML = '<p class="empty-message">No hay circuitos en primer nivel</p>';
        } else {
            level1List.innerHTML = TableroState.circuits.level1.map(circuit => `
                <div class="circuit-info-item">
                    <span>• ${circuit.name} (C${circuit.amp})</span>
                    <span>Sección: ${circuit.section}mm² | ${circuit.power}W</span>
                </div>
            `).join('');
        }
    }
    
    // Actualizar lista nivel 2
    const level2List = document.getElementById('tableroLevel2List');
    if (level2List) {
        if (TableroState.circuits.level2.length === 0) {
            level2List.innerHTML = '<p class="empty-message">No hay circuitos en segundo nivel</p>';
        } else {
            level2List.innerHTML = TableroState.circuits.level2.map(circuit => `
                <div class="circuit-info-item">
                    <span>• ${circuit.name} (C${circuit.amp})</span>
                    <span>Sección: ${circuit.section}mm² | ${circuit.power}W</span>
                </div>
            `).join('');
        }
    }
}

/**
 * Sincronizar todo el tablero desde cero
 */
function syncTableroFromElements() {
    console.log('🔄 Sincronizando tablero desde elementos existentes');
    
    // Resetear estado
    TableroState.circuits.level1 = [];
    TableroState.circuits.level2 = [];
    resetSymbolCounts();
    
    // Procesar todos los elementos existentes
    AppState.elements.forEach(element => {
        const level = element.level || 1; // Usar nivel guardado o 1 por defecto
        onSymbolAdded(element.type, level);
    });
    
    // Actualizar display
    if (TableroState.isOpen) {
        updateTableroDisplay();
    }
    
    console.log('✅ Sincronización completa');
}

/**
 * Limpiar tablero
 */
function clearTablero() {
    TableroState.circuits.level1 = [];
    TableroState.circuits.level2 = [];
    resetSymbolCounts();
    
    if (TableroState.isOpen) {
        updateTableroDisplay();
    }
    
    console.log('🧹 Tablero limpiado');
}

/**
 * Activar/desactivar interruptor
 */
function toggleBreakerState(circuitId) {
    const breaker = document.querySelector(`[data-circuit="${circuitId}"]`);
    if (!breaker) return;
    
    const isOn = breaker.classList.contains('on');
    
    // Cambiar estado visual
    if (isOn) {
        breaker.classList.remove('on');
        const switchTop = breaker.querySelector('.breaker-switch-top');
        const ledText = breaker.querySelector('.breaker-led-text');
        const powerDisplay = breaker.querySelector('.breaker-power');
        
        if (switchTop) switchTop.textContent = 'OFF';
        if (ledText) ledText.textContent = 'OFF';
        if (powerDisplay) powerDisplay.textContent = '0W';
    } else {
        breaker.classList.add('on');
        const switchTop = breaker.querySelector('.breaker-switch-top');
        const ledText = breaker.querySelector('.breaker-led-text');
        const powerDisplay = breaker.querySelector('.breaker-power');
        
        // Buscar el circuito en el estado
        const circuit = [...TableroState.circuits.level1, ...TableroState.circuits.level2]
            .find(c => c.id === circuitId);
        
        if (switchTop) switchTop.textContent = 'ON';
        if (ledText) ledText.textContent = 'ON';
        if (powerDisplay && circuit) powerDisplay.textContent = `${circuit.power}W`;
    }
    
    console.log(`⚡ Interruptor ${circuitId} ${isOn ? 'apagado' : 'encendido'}`);
}

// ========================================
// EXPORTAR FUNCIONES GLOBALES
// ========================================
window.TableroState = TableroState;
window.initTableroIntegration = initTableroIntegration;
window.syncTableroFromElements = syncTableroFromElements;
window.clearTablero = clearTablero;
window.updateTableroDisplay = updateTableroDisplay;
window.toggleBreakerState = toggleBreakerState;

console.log('✅ Sistema de integración de tablero cargado');