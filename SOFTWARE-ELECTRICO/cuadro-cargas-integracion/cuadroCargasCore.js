// ============================================================
// CUADRO DE CARGAS CORE - Funciones principales y estado
// ============================================================

let cuadroCargasActivo = false;

function abrirCuadroCargas() {
    // Sincronizar datos desde el plano
    if (typeof sincronizarCuadroDesdePlano === 'function') {
        sincronizarCuadroDesdePlano();
    }
    
    if (cuadroCargasActivo) {
        console.log('⚠️ Cuadro de Cargas ya está abierto');
        return;
    }
    
    const drawingBoard = document.getElementById('drawingBoard');
    if (!drawingBoard) {
        console.error('❌ drawingBoard no encontrado');
        return;
    }
    
    const ventana = document.createElement('div');
    ventana.id = 'cuadroCargasWindow';
    ventana.className = 'cuadro-cargas-window';
    ventana.style.cssText = `
        position: fixed;
        width: 75%;
        max-width: 950px;
        height: 80vh;
        max-height: 700px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `;
    
    const cuadroHTML = generarCuadroCargasHTML();
    
    ventana.innerHTML = `
        <div id="cuadroCargasHeader" style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 18px;
            background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
            color: white;
            min-height: 50px;
            cursor: grab;
            user-select: none;
        ">
            <div style="font-size: 18px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                <span>📋</span>
                <span>CUADRO DE CARGAS ELÉCTRICO</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <button onclick="integrarCuadroCargasAlPlano()" style="
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#229954'" onmouseout="this.style.background='#27ae60'">
                    <span>📌</span>
                    <span>INTEGRAR EN PLANO</span>
                </button>
                <button onclick="exportarCuadroCargas()" style="
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#2980b9'" onmouseout="this.style.background='#3498db'">
                    <span>📥</span>
                    <span>EXPORTAR</span>
                </button>
                <button onclick="cerrarCuadroCargas()" style="
                    background: transparent;
                    border: none;
                    padding: 5px 10px;
                    font-size: 24px;
                    color: white;
                    cursor: pointer;
                    line-height: 1;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='transparent'">✕</button>
            </div>
        </div>
        <div style="
            flex: 1;
            overflow: auto;
            position: relative;
            padding: 20px;
            background: #f8f9fa;
        ">${cuadroHTML}</div>
    `;
    
    // Agregar al body directamente para evitar problemas de z-index
    document.body.appendChild(ventana);
    cuadroCargasActivo = true;
    
    // Actualizar tabla con datos sincronizados
    setTimeout(() => {
        if (typeof actualizarTablaCuadroCargasModal === 'function') {
            actualizarTablaCuadroCargasModal();
        }
        inicializarArrastreCuadroCargas();
    }, 100);
    
    console.log('✅ Cuadro de Cargas abierto');
}

function cerrarCuadroCargas() {
    const ventana = document.getElementById('cuadroCargasWindow');
    if (ventana) {
        ventana.remove();
        cuadroCargasActivo = false;
        console.log('✅ Cuadro de Cargas cerrado');
    }
}

// Exportar estado
window.cuadroCargasActivo = cuadroCargasActivo;

console.log('✅ Cuadro de Cargas Core inicializado');