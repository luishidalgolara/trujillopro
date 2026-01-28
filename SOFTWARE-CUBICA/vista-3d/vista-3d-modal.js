/* ========================================
   MODAL VISTA 3D
   ======================================== */

function crearModalVista3D() {
    if (document.getElementById('modalVista3D')) return;

    const modalHTML = `
    <div class="modal-vista-3d" id="modalVista3D">
        <div class="vista-3d-container">
            <div class="vista-3d-header">
                <div class="vista-3d-title">🏗️ VISTA 3D - MODELO DE CONSTRUCCIÓN</div>
                <button class="btn-close-3d" onclick="cerrarVista3D()">✕</button>
            </div>
            
            <div class="vista-3d-canvas-wrapper">
                <div id="canvas3D"></div>
                
                <div class="vista-3d-controls">
                    <button class="btn-3d-control" onclick="resetearVista3D()">
                        🔄 Resetear Vista
                    </button>
                    <button class="btn-3d-control" onclick="construirModelo3D()">
                        🔨 Reconstruir
                    </button>
                </div>
                
                <div class="vista-3d-info">
                    <div><strong>🖱️ Controles:</strong></div>
                    <div>• Arrastrar: Rotar</div>
                    <div>• Scroll: Zoom</div>
                    <div>• Reset: Vista inicial</div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function abrirVista3D() {
    crearModalVista3D();

    const modal = document.getElementById('modalVista3D');
    if (!modal) return;

    modal.classList.add('active');
    vista3DState.active = true;

    setTimeout(() => {
        inicializarEscena3D();
        inicializarControles3D();
        
        const elementos = construirModelo3D();
        
        if (elementos === 0) {
            alert('⚠️ No hay elementos dibujados para mostrar en 3D.\n\nDibuja muros, radier o cubiertas primero.');
        } else {
            animate3D();
        }
    }, 100);
}

function cerrarVista3D() {
    const modal = document.getElementById('modalVista3D');
    if (modal) {
        modal.classList.remove('active');
    }
    vista3DState.active = false;
}

function toggleVista3D() {
    if (vista3DState.active) {
        cerrarVista3D();
    } else {
        abrirVista3D();
    }
}

window.crearModalVista3D = crearModalVista3D;
window.abrirVista3D = abrirVista3D;
window.cerrarVista3D = cerrarVista3D;
window.toggleVista3D = toggleVista3D;
