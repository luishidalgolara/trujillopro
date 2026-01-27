// ========================================
// FUNCIONES DE GENERACIÓN
// ========================================

function generarCircuitos() {
    if (AppState.elements.length === 0) {
        updateStatus('⚠️ No hay elementos en el plano para generar circuitos');
        return;
    }
    
    updateStatus('⚡ Generando circuitos eléctricos automáticos...');
    console.log('⚡ Iniciando generación de circuitos');
    
    // Simulación de generación de circuitos
    setTimeout(() => {
        const svg = document.getElementById('plano');
        
        // Conectar elementos con líneas
        for (let i = 0; i < AppState.elements.length - 1; i++) {
            const elem1 = AppState.elements[i];
            const elem2 = AppState.elements[i + 1];
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', elem1.x);
            line.setAttribute('y1', elem1.y);
            line.setAttribute('x2', elem2.x);
            line.setAttribute('y2', elem2.y);
            line.setAttribute('stroke', '#2c3e50');
            line.setAttribute('stroke-width', '2');
            line.setAttribute('stroke-dasharray', '5,5');
            
            svg.appendChild(line);
        }
        
        updateStatus('✅ Circuitos generados correctamente');
        console.log('✅ Circuitos generados');
    }, 1000);
}

function calcularCargas() {
    if (AppState.elements.length === 0) {
        updateStatus('⚠️ No hay elementos para calcular');
        return;
    }
    
    updateStatus('🔢 Calculando cargas eléctricas...');
    console.log('🔢 Calculando cargas');
    
    setTimeout(() => {
        updateStatus(`✅ Cálculo completo: ${AppState.elements.length} elementos - Carga total estimada`);
        abrirCuadroCargas();
    }, 1000);
}
