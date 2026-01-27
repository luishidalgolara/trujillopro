// memoria-alc-handler.js - Handler exclusivo para Memoria de Alcantarillado

function abrirMemoriaCalculoAlc() {
    const modal = document.getElementById('modalMemoriaAlc');
    const iframe = document.getElementById('iframeMemoriaAlc');
    
    if (!modal || !iframe) {
        console.error('❌ Modal o iframe de Memoria Alcantarillado no encontrado');
        crearModalMemoriaAlc();
        return;
    }
    
    iframe.src = 'memoria-alcantarillado/memoria-calculo-alc.html';
    
    iframe.onload = function() {
        console.log('✅ Memoria de Alcantarillado cargada');
        setTimeout(() => {
            sincronizarMemoriaAlcantarillado();
        }, 300);
    };
    
    modal.classList.add('active');
    modal.style.display = 'flex';
}

function sincronizarMemoriaAlcantarillado() {
    const iframe = document.getElementById('iframeMemoriaAlc');
    
    if (!iframe || !iframe.contentWindow) {
        console.warn('⚠️ iframe Memoria Alcantarillado no disponible');
        return;
    }
    
    const memoriaWindow = iframe.contentWindow;
    
    if (!memoriaWindow.sincronizarDesdeAlcantarillado) {
        console.warn('⚠️ Función sincronizar no disponible aún');
        return;
    }
    
    // Obtener elementos de ambos niveles
    let elementsArray = [];
    if (window.elements) {
        elementsArray = [...window.elements];
    } else if (window.plans && window.plans[window.currentPlanIndex]) {
        elementsArray = window.plans[window.currentPlanIndex].tracingElements || [];
    }
    
    // Agregar nivel 2 si existe
    if (window.ELEMENTOS_NIVEL_2) {
        elementsArray = [...elementsArray, ...window.ELEMENTOS_NIVEL_2];
    }
    
    console.log('📊 Sincronizando Memoria Alcantarillado con', elementsArray.length, 'elementos');
    
    memoriaWindow.sincronizarDesdeAlcantarillado(elementsArray);
}

function cerrarMemoriaAlc() {
    const modal = document.getElementById('modalMemoriaAlc');
    const iframe = document.getElementById('iframeMemoriaAlc');
    
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
    
    if (iframe) {
        iframe.src = '';
    }
}

function crearModalMemoriaAlc() {
    // Verificar si ya existe
    if (document.getElementById('modalMemoriaAlc')) {
        abrirMemoriaCalculoAlc();
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-memoria';
    modal.id = 'modalMemoriaAlc';
    modal.innerHTML = `
        <div class="ventana-memoria">
            <div class="modal-memoria-header">
                <div class="modal-memoria-title">📋 MEMORIA DE CÁLCULO - ALCANTARILLADO</div>
                <div class="modal-memoria-buttons">
                    <button class="btn-modal-memoria close" onclick="cerrarMemoriaAlc()">✕</button>
                </div>
            </div>
            <div class="modal-memoria-content">
                <iframe id="iframeMemoriaAlc" src=""></iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Intentar de nuevo
    setTimeout(() => {
        abrirMemoriaCalculoAlc();
    }, 100);
}

window.abrirMemoriaCalculoAlc = abrirMemoriaCalculoAlc;
window.cerrarMemoriaAlc = cerrarMemoriaAlc;
window.sincronizarMemoriaAlcantarillado = sincronizarMemoriaAlcantarillado;

console.log('✅ Memoria Alcantarillado Handler cargado');