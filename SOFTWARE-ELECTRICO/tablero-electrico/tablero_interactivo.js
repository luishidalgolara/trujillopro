// Estado del sistema
const state = {
    breakers: {
        main: false,
        differential: false
    },
    circuits: [],
    totalPower: 0,
    maxPower: 8800, // 40A * 220V
    energyConsumed: 0,
    lastUpdate: Date.now()
};

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Eventos para interruptores principales
    document.querySelectorAll('.breaker[data-type="main"], .breaker[data-type="differential"]').forEach(breaker => {
        breaker.addEventListener('click', () => toggleBreaker(breaker));
    });
    
    // Agregar algunos circuitos de ejemplo
    addInitialCircuits();
    updatePowerConsumption();
    
    // Simular consumo de energía
    setInterval(updateEnergy, 1000);
});

// Función para agregar circuitos iniciales
function addInitialCircuits() {
    const initialCircuits = [
        { level: 1, amp: 10, name: 'Alumbrado', power: 500, section: 1.5 },
        { level: 1, amp: 16, name: 'T. Uso General', power: 800, section: 2.5 },
        { level: 1, amp: 20, name: 'Lavadora', power: 2000, section: 4.0 },
        { level: 1, amp: 25, name: 'Cocina', power: 3500, section: 6.0 },
        { level: 2, amp: 10, name: 'Alumbrado 2N', power: 400, section: 1.5 },
        { level: 2, amp: 16, name: 'Tomas 2N', power: 600, section: 2.5 }
    ];
    
    initialCircuits.forEach(circuit => {
        createCircuit(circuit.level, circuit.amp, circuit.name, circuit.power, circuit.section);
    });
}

// Función para agregar un nuevo circuito desde el formulario
function addCircuit() {
    const level = document.getElementById('circuitLevel').value;
    const amp = document.getElementById('breakerAmp').value;
    const name = document.getElementById('circuitName').value.trim();
    const power = parseInt(document.getElementById('circuitPower').value) || 0;
    const section = document.getElementById('cableSection').value;
    
    if (!name) {
        showAlert('⚠ Por favor ingresa un nombre para el circuito');
        return;
    }
    
    if (power <= 0) {
        showAlert('⚠ Por favor ingresa una potencia válida');
        return;
    }
    
    createCircuit(level, amp, name, power, section);
    
    // Limpiar formulario
    document.getElementById('circuitName').value = '';
    document.getElementById('circuitPower').value = '';
    
    showAlert('✅ Circuito agregado exitosamente');
}

// Función para crear un circuito
function createCircuit(level, amp, name, power, section) {
    const circuitId = `c${amp}_${Date.now()}`;
    const maxPower = amp * 220; // V = 220V
    
    // Agregar al estado
    state.circuits.push({
        id: circuitId,
        level: parseInt(level),
        amp: amp,
        name: name,
        power: power,
        section: section,
        maxPower: maxPower,
        isOn: false
    });
    
    state.breakers[circuitId] = false;
    
    // Crear elemento HTML
    const breakerHTML = `
        <div class="breaker" data-breaker="${circuitId}" data-power="${power}" data-max="${maxPower}" data-type="circuit" data-level="${level}">
            <button class="delete-breaker" onclick="event.stopPropagation(); deleteCircuit('${circuitId}')" title="Eliminar circuito">×</button>
            <div class="din-rail-slot left"></div>
            <div class="din-rail-slot right"></div>
            
            <div class="breaker-terminal-top">
                <div class="terminal-screw"></div>
            </div>
            
            <div class="breaker-window">
                <div class="window-screw"></div>
            </div>
            
            <div class="breaker-label">C${amp}</div>
            <div class="breaker-circuit">${name}</div>
            
            <div class="breaker-switch">
                <div class="switch-top">OFF</div>
                <div class="switch-toggle"></div>
            </div>
            
            <div class="breaker-led">
                <div class="led-indicator">
                    <div class="led-text">OFF</div>
                </div>
            </div>
            
            <div class="breaker-terminal-bottom">
                <div class="terminal-screw"></div>
            </div>
            
            <div class="breaker-power">0W</div>
            <div class="breaker-cert">IEC 60898</div>
        </div>
    `;
    
    // Agregar al grid correspondiente según el nivel
    const gridId = level === '1' ? 'level1Grid' : 'level2Grid';
    const grid = document.getElementById(gridId);
    grid.insertAdjacentHTML('beforeend', breakerHTML);
    
    // Agregar evento click
    const newBreaker = grid.lastElementChild;
    newBreaker.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-breaker')) {
            toggleBreaker(newBreaker);
        }
    });
    
    // Actualizar lista de información
    updateCircuitList();
}

// Función para eliminar un circuito
function deleteCircuit(circuitId) {
    if (!confirm('¿Estás seguro de eliminar este circuito?')) {
        return;
    }
    
    // Remover del estado
    state.circuits = state.circuits.filter(c => c.id !== circuitId);
    delete state.breakers[circuitId];
    
    // Remover del DOM
    const breaker = document.querySelector(`[data-breaker="${circuitId}"]`);
    if (breaker) {
        breaker.remove();
    }
    
    // Actualizar
    updateCircuitList();
    updatePowerConsumption();
    showAlert('🗑️ Circuito eliminado');
}

// Función para activar/desactivar un interruptor
function toggleBreaker(breakerEl) {
    const breakerId = breakerEl.dataset.breaker;
    const breakerType = breakerEl.dataset.type;
    const isOn = state.breakers[breakerId];
    
    // Verificar dependencias para circuitos
    if (breakerType === 'circuit') {
        if (!state.breakers.main || !state.breakers.differential) {
            showAlert('⚠ Activa primero el interruptor principal y el diferencial');
            return;
        }
    }
    
    // Cambiar estado
    state.breakers[breakerId] = !isOn;
    
    // Actualizar UI
    const switchTop = breakerEl.querySelector('.switch-top');
    const ledText = breakerEl.querySelector('.led-text');
    
    if (state.breakers[breakerId]) {
        breakerEl.classList.add('on');
        if (switchTop) switchTop.textContent = 'ON';
        if (ledText) ledText.textContent = 'ON';
    } else {
        breakerEl.classList.remove('on');
        if (switchTop) switchTop.textContent = 'OFF';
        if (ledText) ledText.textContent = 'OFF';
        
        // Si se apaga el principal o diferencial, apagar todos los circuitos
        if (breakerId === 'main' || breakerId === 'differential') {
            turnOffAllCircuits();
        }
    }
    
    // Actualizar circuito en estado
    const circuit = state.circuits.find(c => c.id === breakerId);
    if (circuit) {
        circuit.isOn = state.breakers[breakerId];
    }
    
    // Actualizar consumo
    updatePowerConsumption();
    updateCircuitList();
}

// Función para apagar todos los circuitos
function turnOffAllCircuits() {
    document.querySelectorAll('.breaker[data-type="circuit"]').forEach(breaker => {
        const breakerId = breaker.dataset.breaker;
        state.breakers[breakerId] = false;
        breaker.classList.remove('on');
        
        const switchTop = breaker.querySelector('.switch-top');
        const ledText = breaker.querySelector('.led-text');
        if (switchTop) switchTop.textContent = 'OFF';
        if (ledText) ledText.textContent = 'OFF';
        
        const circuit = state.circuits.find(c => c.id === breakerId);
        if (circuit) circuit.isOn = false;
    });
}

// Función para actualizar el consumo de energía
function updatePowerConsumption() {
    let totalPower = 0;
    
    document.querySelectorAll('.breaker[data-type="circuit"]').forEach(breaker => {
        const breakerId = breaker.dataset.breaker;
        const power = parseInt(breaker.dataset.power) || 0;
        const powerDisplay = breaker.querySelector('.breaker-power');
        
        if (state.breakers[breakerId]) {
            totalPower += power;
            if (powerDisplay) {
                powerDisplay.textContent = `${power}W`;
            }
        } else {
            if (powerDisplay) {
                powerDisplay.textContent = '0W';
            }
        }
    });
    
    state.totalPower = totalPower;
    
    // Actualizar displays
    document.getElementById('totalPower').innerHTML = `${totalPower}<span class="stat-unit">W</span>`;
    const current = (totalPower / 220).toFixed(1);
    document.getElementById('totalCurrent').innerHTML = `${current}<span class="stat-unit">A</span>`;
    
    // Verificar sobrecarga
    const loadPercentage = (totalPower / state.maxPower) * 100;
    const systemStatusEl = document.getElementById('systemStatus');
    
    systemStatusEl.classList.remove('status-ok', 'status-warning', 'status-danger');
    
    if (loadPercentage > 90) {
        systemStatusEl.textContent = 'SOBRECARGA';
        systemStatusEl.classList.add('status-danger');
        showAlert('⚠ SOBRECARGA DETECTADA! Reduce el consumo');
        
        // Simular disparo del diferencial
        setTimeout(() => {
            if (loadPercentage > 100) {
                state.breakers.differential = false;
                const diffBreaker = document.querySelector('[data-breaker="differential"]');
                diffBreaker.classList.remove('on');
                const switchTop = diffBreaker.querySelector('.switch-top');
                const ledText = diffBreaker.querySelector('.led-text');
                if (switchTop) switchTop.textContent = 'OFF';
                if (ledText) ledText.textContent = 'OFF';
                turnOffAllCircuits();
                updatePowerConsumption();
                showAlert('🔴 Diferencial disparado por sobrecarga');
            }
        }, 1000);
    } else if (loadPercentage > 70) {
        systemStatusEl.textContent = 'ALERTA';
        systemStatusEl.classList.add('status-warning');
    } else {
        systemStatusEl.textContent = 'NORMAL';
        systemStatusEl.classList.add('status-ok');
    }
}

// Función para actualizar la lista de circuitos
function updateCircuitList() {
    // Actualizar lista nivel 1
    const level1List = document.getElementById('level1List');
    const level1Circuits = state.circuits.filter(c => c.level === 1);
    
    if (level1Circuits.length === 0) {
        level1List.innerHTML = '<p class="empty-message">No hay circuitos en primer nivel</p>';
    } else {
        level1List.innerHTML = level1Circuits.map(circuit => `
            <div class="circuit-item ${circuit.isOn ? 'active' : ''}" data-circuit="${circuit.id}">
                <span>• ${circuit.name} (C${circuit.amp})</span>
                <span>Sección: ${circuit.section}mm² | Max: ${circuit.maxPower}W</span>
            </div>
        `).join('');
    }
    
    // Actualizar lista nivel 2
    const level2List = document.getElementById('level2List');
    const level2Circuits = state.circuits.filter(c => c.level === 2);
    
    if (level2Circuits.length === 0) {
        level2List.innerHTML = '<p class="empty-message">No hay circuitos en segundo nivel</p>';
    } else {
        level2List.innerHTML = level2Circuits.map(circuit => `
            <div class="circuit-item ${circuit.isOn ? 'active' : ''}" data-circuit="${circuit.id}">
                <span>• ${circuit.name} (C${circuit.amp})</span>
                <span>Sección: ${circuit.section}mm² | Max: ${circuit.maxPower}W</span>
            </div>
        `).join('');
    }
}

// Función para actualizar el medidor de energía
function updateEnergy() {
    if (state.totalPower > 0) {
        const now = Date.now();
        const timeDiff = (now - state.lastUpdate) / 1000 / 3600; // Horas
        const energyDiff = (state.totalPower / 1000) * timeDiff; // kWh
        state.energyConsumed += energyDiff;
        state.lastUpdate = now;
        
        document.getElementById('energyReading').textContent = state.energyConsumed.toFixed(1).padStart(7, '0');
    }
}

// Función para mostrar alertas
function showAlert(message) {
    const alertEl = document.getElementById('alert');
    alertEl.textContent = message;
    alertEl.classList.add('show');
    
    setTimeout(() => {
        alertEl.classList.remove('show');
    }, 3000);
}