// js/gastos-acumulados.js - CON BOTÓN X PEQUEÑO
import { svg } from './config.js';

export const GASTOS_UNITARIOS = {
    'wc': 10,
    'lavatorio': 8,
    'ducha': 10,
    'bano-tina': 15,
    'lavaplatos': 12,
    'lavadora': 15,
    'lavadero': 15,
    'llave-jardin': 20,
    'bidet': 6,
    'urinario': 6,
    'lavacopas': 12,
    'calefon': 0,
    'termo-electrico': 0,
    'caldera': 0,
    'medidor-agua': 0,
    'conexion-nivel-1': 0,
    'conexion-nivel-2': 0,
    'valvula-corte': 0,
    'union-tee': 0,
    'punto-conexion': 0
};

export function calcularGastosAcumulados(conexiones, elementos) {
    if (!conexiones || conexiones.length === 0) return [];
    
    const gastosCalculados = [];
    
    conexiones.forEach(conn => {
        const artefactosAbajo = encontrarArtefactosConectados(conn.to.id, conn.from.id, conexiones, elementos);
        
        let gastoTotal = 0;
        artefactosAbajo.forEach(el => {
            gastoTotal += (GASTOS_UNITARIOS[el.type] || 0);
        });
        
        gastosCalculados.push({
            from: conn.from,
            to: conn.to,
            gasto: gastoTotal,
            diameter: conn.diameter,
            type: conn.type
        });
    });
    
    return gastosCalculados;
}

function encontrarArtefactosConectados(inicioId, prohibidoId, conexiones, elementos) {
    const resultado = [];
    const visitados = new Set();
    visitados.add(prohibidoId);
    
    function buscar(nodoId) {
        if (visitados.has(nodoId)) return;
        visitados.add(nodoId);
        
        const elem = elementos.find(e => e.id === nodoId);
        if (elem && GASTOS_UNITARIOS[elem.type] > 0) {
            resultado.push(elem);
        }
        
        conexiones.forEach(conn => {
            if (conn.from.id === nodoId && !visitados.has(conn.to.id)) {
                buscar(conn.to.id);
            }
            if (conn.to.id === nodoId && !visitados.has(conn.from.id)) {
                buscar(conn.from.id);
            }
        });
    }
    
    buscar(inicioId);
    return resultado;
}

export function dibujarGastosEnTrazado(gastosCalculados, nivel = 1) {
    const circulos = svg.querySelectorAll(`.gasto-acumulado.nivel-${nivel}`);
    circulos.forEach(c => c.remove());
    
    if (!gastosCalculados || gastosCalculados.length === 0) return;
    
    gastosCalculados.forEach((gasto, index) => {
        if (gasto.gasto <= 0) return;
        
        const xMedio = (gasto.from.x + gasto.to.x) / 2;
        const yMedio = (gasto.from.y + gasto.to.y) / 2;
        
        const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        grupo.setAttribute('class', `gasto-acumulado nivel-${nivel}`);
        grupo.style.cursor = 'move';
        
        // Círculo principal
        const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circulo.setAttribute('cx', xMedio);
        circulo.setAttribute('cy', yMedio);
        circulo.setAttribute('r', 14);
        circulo.setAttribute('fill', obtenerColor(gasto.gasto));
        circulo.setAttribute('stroke', '#fff');
        circulo.setAttribute('stroke-width', '2');
        
        // Texto del gasto
        const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        texto.setAttribute('x', xMedio);
        texto.setAttribute('y', yMedio + 4);
        texto.setAttribute('fill', '#fff');
        texto.setAttribute('font-size', '11');
        texto.setAttribute('font-weight', 'bold');
        texto.setAttribute('text-anchor', 'middle');
        texto.setAttribute('pointer-events', 'none');
        texto.textContent = Math.round(gasto.gasto);
        
        // ✅ BOTÓN X PEQUEÑO Y SUTIL
        const btnEliminar = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        btnEliminar.setAttribute('class', 'btn-eliminar-gasto');
        btnEliminar.style.cursor = 'pointer';
        btnEliminar.style.opacity = '0.7';
        
        const circuloX = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circuloX.setAttribute('cx', xMedio + 10);
        circuloX.setAttribute('cy', yMedio - 10);
        circuloX.setAttribute('r', 6);
        circuloX.setAttribute('fill', '#ef4444');
        circuloX.setAttribute('stroke', '#fff');
        circuloX.setAttribute('stroke-width', '1');
        
        const textoX = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textoX.setAttribute('x', xMedio + 10);
        textoX.setAttribute('y', yMedio - 8);
        textoX.setAttribute('fill', '#fff');
        textoX.setAttribute('font-size', '8');
        textoX.setAttribute('font-weight', 'bold');
        textoX.setAttribute('text-anchor', 'middle');
        textoX.setAttribute('pointer-events', 'none');
        textoX.textContent = '✕';
        
        btnEliminar.appendChild(circuloX);
        btnEliminar.appendChild(textoX);
        
        // Click en X para eliminar
        btnEliminar.addEventListener('click', (e) => {
            e.stopPropagation();
            grupo.remove();
        });
        
        // Hover effect en X
        btnEliminar.addEventListener('mouseenter', () => {
            btnEliminar.style.opacity = '1';
            circuloX.setAttribute('r', '7');
        });
        
        btnEliminar.addEventListener('mouseleave', () => {
            btnEliminar.style.opacity = '0.7';
            circuloX.setAttribute('r', '6');
        });
        
        grupo.appendChild(circulo);
        grupo.appendChild(texto);
        grupo.appendChild(btnEliminar);
        
        // Arrastrable
        hacerArrastrable(grupo, circulo, texto, btnEliminar, xMedio, yMedio);
        
        // Editable con doble click
        hacerEditable(grupo, texto, circulo);
        
        svg.appendChild(grupo);
    });
}

function hacerArrastrable(grupo, circulo, texto, btnEliminar, xInicial, yInicial) {
    let arrastrando = false;
    let offsetX, offsetY;
    
    grupo.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        if (e.target.closest('.btn-eliminar-gasto')) return;
        
        arrastrando = true;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        
        offsetX = svgP.x - parseFloat(circulo.getAttribute('cx'));
        offsetY = svgP.y - parseFloat(circulo.getAttribute('cy'));
        
        e.preventDefault();
    });
    
    svg.addEventListener('mousemove', (e) => {
        if (!arrastrando) return;
        
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        
        const newX = svgP.x - offsetX;
        const newY = svgP.y - offsetY;
        
        circulo.setAttribute('cx', newX);
        circulo.setAttribute('cy', newY);
        texto.setAttribute('x', newX);
        texto.setAttribute('y', newY + 4);
        
        const circuloX = btnEliminar.querySelector('circle');
        const textoX = btnEliminar.querySelector('text');
        circuloX.setAttribute('cx', newX + 10);
        circuloX.setAttribute('cy', newY - 10);
        textoX.setAttribute('x', newX + 10);
        textoX.setAttribute('y', newY - 8);
    });
    
    svg.addEventListener('mouseup', () => {
        arrastrando = false;
    });
}

function hacerEditable(grupo, texto, circulo) {
    grupo.addEventListener('dblclick', (e) => {
        if (e.target.closest('.btn-eliminar-gasto')) return;
        e.stopPropagation();
        
        const valorActual = texto.textContent;
        const nuevoValor = prompt('Ingrese el nuevo valor de gasto (L/min):', valorActual);
        
        if (nuevoValor !== null && nuevoValor.trim() !== '') {
            const numero = parseFloat(nuevoValor);
            if (!isNaN(numero) && numero >= 0) {
                texto.textContent = Math.round(numero);
                circulo.setAttribute('fill', obtenerColor(numero));
            }
        }
    });
}

function obtenerColor(gasto) {
    if (gasto <= 10) return '#10b981';
    if (gasto <= 30) return '#f59e0b';
    if (gasto <= 60) return '#ef4444';
    return '#7c3aed';
}

export function limpiarTodosLosGastos() {
    svg.querySelectorAll('.gasto-acumulado').forEach(c => c.remove());
}

console.log('✅ gastos-acumulados.js - Con botón X sutil');