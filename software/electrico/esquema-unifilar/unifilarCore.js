// ============================================================
// ESQUEMA UNIFILAR CORE - Lógica principal
// ============================================================

let unifilarActivo = false;

/**
 * Abrir modal de esquema unifilar
 * Genera el diagrama automáticamente desde los datos del plano
 */
function abrirUnifilar() {
    console.log('📊 Abriendo Esquema Unifilar...');
    
    if (unifilarActivo) {
        console.log('⚠️ Esquema Unifilar ya está abierto');
        return;
    }
    
    // Sincronizar datos del plano
    if (typeof sincronizarCuadroDesdePlano === 'function') {
        sincronizarCuadroDesdePlano();
    }
    
    // Verificar que hay datos
    if (typeof CuadroState === 'undefined' || !CuadroState.circuits) {
        alert('⚠️ No hay elementos en el plano.\n\nAgrega circuitos eléctricos primero para generar el esquema unifilar.');
        return;
    }
    
    const todosCircuitos = [
        ...CuadroState.circuits.level1,
        ...CuadroState.circuits.level2
    ];
    
    if (todosCircuitos.length === 0) {
        alert('⚠️ No hay circuitos en el plano.\n\nAgrega elementos eléctricos para generar el esquema unifilar automáticamente.');
        return;
    }
    
    // Crear modal
    const modal = document.createElement('div');
    modal.id = 'unifilarWindow';
    modal.style.cssText = `
        position: fixed;
        width: 95%;
        max-width: 1600px;
        height: 92vh;
        max-height: none;
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
    
    modal.innerHTML = `
        <div id="unifilarHeader" style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 18px;
            background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
            color: white;
            min-height: 50px;
            cursor: grab;
            user-select: none;
        ">
            <div style="font-size: 18px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                <span>📊</span>
                <span>ESQUEMA UNIFILAR ELÉCTRICO</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <button onclick="integrarUnifilarAlPlano()" style="
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
                <button onclick="cerrarUnifilar()" style="
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
        <div id="unifilarContent" style="
            flex: 1;
            overflow: auto;
            position: relative;
            background: #f8f9fa;
            padding: 20px;
            min-height: 0;
        ">
            <div id="unifilarDiagrama" style="
                background: white;
                border: 2px solid #dee2e6;
                border-radius: 8px;
                min-height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="text-align: center; color: #6c757d;">
                    <div style="font-size: 48px; margin-bottom: 10px;">⚙️</div>
                    <div style="font-size: 16px; font-weight: bold;">Generando esquema unifilar...</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    unifilarActivo = true;
    
    // Generar el diagrama después de un breve delay
    setTimeout(() => {
        generarDiagramaUnifilar();
    }, 100);
    
    console.log('✅ Esquema Unifilar abierto');
}

/**
 * Cerrar modal de esquema unifilar
 */
function cerrarUnifilar() {
    const modal = document.getElementById('unifilarWindow');
    if (modal) {
        modal.remove();
        unifilarActivo = false;
        console.log('✅ Esquema Unifilar cerrado');
    }
}

// Exportar funciones
window.unifilarActivo = unifilarActivo;

console.log('✅ Esquema Unifilar Core inicializado');