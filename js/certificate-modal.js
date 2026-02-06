// Sistema de Modal para Certificados - MÉTODO DIRECTO
(function() {
    'use strict';
    
    let modal = null;
    let iframe = null;
    let titleElement = null;

    // Crear modal cuando el DOM esté listo
    function createModal() {
        const modalHTML = `
            <div id="certificateModal" class="certificate-modal">
                <div class="certificate-modal-content">
                    <div class="certificate-modal-header">
                        <h3 id="certificateTitle">Certificado Oficial</h3>
                        <span class="certificate-modal-close" id="closeCertificateModal">&times;</span>
                    </div>
                    <div class="certificate-modal-body">
                        <iframe id="certificateViewer" src=""></iframe>
                    </div>
                    <div class="certificate-modal-footer">
                        <div class="certificate-info">
                            <strong>🔒 Certificado Oficial del Gobierno de Chile</strong> - 
                            Departamento de Derechos Intelectuales
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        modal = document.getElementById('certificateModal');
        iframe = document.getElementById('certificateViewer');
        titleElement = document.getElementById('certificateTitle');
        
        // Botón cerrar
        document.getElementById('closeCertificateModal').addEventListener('click', closeModal);
        
        // Cerrar con click fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
        
        console.log('Modal creado correctamente');
    }

    // Abrir modal
    function openModal(pdfPath, title) {
        console.log('Abriendo modal:', pdfPath);
        
        if (!modal) {
            console.error('Modal no existe');
            return;
        }
        
        iframe.src = pdfPath + '#toolbar=0&navpanes=0&scrollbar=1';
        titleElement.textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    function closeModal() {
        if (!modal) return;
        
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = '';
    }

    // FUNCIONES GLOBALES para onclick
    window.openCertificate1 = function() {
        console.log('CLICK en Certificado 1');
        openModal('CERTIFICADOS/Certificado-2026-A-425.pdf', 'Certificado Nº 2026-A-425 - TRUJILLO AGUA POTABLE');
    };

    window.openCertificate2 = function() {
        console.log('CLICK en Certificado 2');
        openModal('CERTIFICADOS/Certificado-2026-A-256.pdf', 'Certificado Nº 2026-A-256 - TRUJILLO ELÉCTRICO');
    };

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createModal);
    } else {
        createModal();
    }
    
    console.log('Sistema de certificados inicializado');
})();