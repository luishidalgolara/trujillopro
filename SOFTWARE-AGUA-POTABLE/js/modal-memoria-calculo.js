// js/modal-memoria-calculo.js

function abrirMemoriaCalculo() {
    const modal = document.getElementById('modalMemoriaCalculo');
    const iframe = document.getElementById('iframeMemoriaCalculo');
    iframe.src = 'memoria/memoria-index.html';
    modal.style.display = 'flex';
    
    // Esperar a que el iframe cargue y sincronizar datos
    iframe.onload = function() {
        setTimeout(() => {
            if (iframe.contentWindow && iframe.contentWindow.sincronizarDesdeElementos) {
                // Sincronizar artefactos
                iframe.contentWindow.sincronizarDesdeElementos(window.elements);
                console.log('✅ Artefactos sincronizados con memoria');
            }
            
            if (iframe.contentWindow && iframe.contentWindow.sincronizarDatosTuberias) {
                // Sincronizar datos de tuberías
                iframe.contentWindow.sincronizarDatosTuberias();
                console.log('✅ Datos de tuberías sincronizados con memoria');
            }
        }, 500);
    };
    
    console.log('📋 Memoria de Cálculo abierta');
}

function cerrarMemoriaCalculo() {
    const modal = document.getElementById('modalMemoriaCalculo');
    const iframe = document.getElementById('iframeMemoriaCalculo');
    modal.style.display = 'none';
    iframe.src = '';
    console.log('📋 Memoria de Cálculo cerrada');
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalMemoriaCalculo');
        if (modal && modal.style.display === 'flex') {
            cerrarMemoriaCalculo();
        }
    }
});

window.abrirMemoriaCalculo = abrirMemoriaCalculo;
window.cerrarMemoriaCalculo = cerrarMemoriaCalculo;