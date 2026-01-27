// ============================================================
// SIMBOLOGÍA ELÉCTRICA CORE - Funciones principales y estado
// ============================================================

let simbologiaElectricaActiva = false;
let filaElectricaSeleccionada = null;

function abrirSimbologiaElectrica() {
    if (simbologiaElectricaActiva) {
        console.log('⚠️ Simbología eléctrica ya está abierta');
        return;
    }
    
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) {
        console.error('❌ drawingBoard no encontrado');
        return;
    }
    
    const ventana = document.createElement('div');
    ventana.id = 'simbologiaElectricaWindow';
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
    
    const simbologiaHTML = generarSimbologiaElectricaHTML();
    
    ventana.innerHTML = `
        <div id="simbologiaElectricaHeader" style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: #9b59b6;
            color: white;
            min-height: 35px;
            cursor: grab;
        ">
            <div style="font-size: 14px; font-weight: bold;">⚡ SIMBOLOGÍA ELÉCTRICA</div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <button onclick="agregarFilaElectrica()" style="
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 3px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 11px;
                ">➕ FILA</button>
                <button onclick="integrarSimbologiaElectricaAlPlano()" style="
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 11px;
                ">📌 INTEGRAR</button>
                <button onclick="cerrarSimbologiaElectrica()" style="
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
    simbologiaElectricaActiva = true;
    
    setTimeout(() => {
        inicializarArrastreElectrica();
        inicializarSeleccionFilasElectricas();
    }, 100);
    
    console.log('✅ Simbología eléctrica abierta');
}

function cerrarSimbologiaElectrica() {
    const ventana = document.getElementById('simbologiaElectricaWindow');
    if (ventana) {
        ventana.remove();
        simbologiaElectricaActiva = false;
        filaElectricaSeleccionada = null;
        console.log('✅ Simbología eléctrica cerrada');
    }
}

console.log('✅ Simbología Eléctrica Core inicializado');
