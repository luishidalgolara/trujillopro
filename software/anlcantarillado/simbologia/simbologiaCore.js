// ============================================================
// SIMBOLOGÍA CORE - Funciones principales y estado
// ============================================================

let simbologiaActiva = false;
let filaSeleccionada = null;

function abrirSimbologia() {
    if (simbologiaActiva) {
        console.log('⚠️ Simbología ya está abierta');
        return;
    }
    
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) {
        console.error('❌ drawingBoard no encontrado');
        return;
    }
    
    const ventana = document.createElement('div');
    ventana.id = 'simbologiaWindow';
    ventana.className = 'vineta-window';
    ventana.style.cssText = `
        position: absolute;
        width: 55%;
        max-width: 600px;
        height: 65vh;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 100;
        display: flex;
        flex-direction: column;
    `;
    
    const simbologiaHTML = generarSimbologiaHTML();
    
    ventana.innerHTML = `
        <div id="simbologiaHeader" style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: #9b59b6;
            color: white;
            min-height: 35px;
            cursor: grab;
        ">
            <div style="font-size: 14px; font-weight: bold;">📊 SIMBOLOGÍA</div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <button onclick="agregarFilaSimbologia()" style="
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 3px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 11px;
                ">➕ FILA</button>
                <button onclick="integrarSimbologiaAlPlano()" style="
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 11px;
                ">📌 INTEGRAR</button>
                <button onclick="cerrarSimbologia()" style="
                    background: transparent;
                    border: none;
                    padding: 2px 6px;
                    font-size: 18px;
                    color: white;
                    cursor: pointer;
                ">✕</button>
            </div>
        </div>
        <div style="flex: 1; overflow: auto; position: relative; padding: 15px;">
            ${simbologiaHTML}
        </div>
    `;
    
    drawingBoard.appendChild(ventana);
    simbologiaActiva = true;
    
    setTimeout(() => {
        inicializarArrastreSimbologia();
        inicializarSeleccionFilas();
    }, 100);
    
    console.log('✅ Simbología abierta');
}

function cerrarSimbologia() {
    const ventana = document.getElementById('simbologiaWindow');
    if (ventana) {
        ventana.remove();
        simbologiaActiva = false;
        filaSeleccionada = null;
        console.log('✅ Simbología cerrada');
    }
}

function contarElementosPlano() {
    const svg = document.getElementById('tracingSvg');
    if (!svg) return {};
    
    const conteo = {
        wc: 0,
        lavatorio: 0,
        ducha: 0,
        lavaplatos: 0,
        camaras: 0,
        cajaRegistro: 0,
        bidet: 0,
        urinario: 0,
        tuberias: 0,
        camaraInspeccion: 0,
        camaraPublica: 0
    };
    
    const elementos = svg.querySelectorAll('[data-artefacto]');
    elementos.forEach(elem => {
        const tipo = elem.getAttribute('data-artefacto');
        if (tipo === 'camara-inspeccion') {
            conteo.camaraInspeccion++;
        } else if (tipo === 'camara-publica') {
            conteo.camaraPublica++;
        } else if (tipo === 'caja-registro') {
            conteo.cajaRegistro++;
        } else if (conteo.hasOwnProperty(tipo)) {
            conteo[tipo]++;
        }
    });
    
    const tuberias = svg.querySelectorAll('line[stroke="#FF6B35"]');
    conteo.tuberias = tuberias.length;
    conteo.camaras = conteo.camaraInspeccion + conteo.camaraPublica;
    
    return conteo;
}

// Getters para el estado
function getSimbologliaActiva() {
    return simbologiaActiva;
}

function getFilaSeleccionada() {
    return filaSeleccionada;
}

function setFilaSeleccionada(fila) {
    filaSeleccionada = fila;
}

console.log('✅ Simbología Core inicializado');