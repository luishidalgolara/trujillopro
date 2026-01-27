// ========================================
// TRUJILLO - Modal Module
// ========================================

// ========================================
// PDF MODAL FUNCTIONALITY
// ========================================
function initPdfModal() {
    const pdfModal = document.getElementById('pdfModal');
    const openPricingBtn = document.getElementById('openPricingBtn');
    const pdfModalClose = document.querySelector('.pdf-modal-close');
    const pdfViewer = document.getElementById('pdfViewer');

    if (openPricingBtn) {
        openPricingBtn.addEventListener('click', () => {
            pdfModal.style.display = 'block';
            pdfViewer.src = 'PDF/Modelo_Licenciamiento.pdf';
            document.body.style.overflow = 'hidden';
        });
    }

    if (pdfModalClose) {
        pdfModalClose.addEventListener('click', closePdfModal);
    }

    if (pdfModal) {
        pdfModal.addEventListener('click', (e) => {
            if (e.target === pdfModal) {
                closePdfModal();
            }
        });
    }

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pdfModal && pdfModal.style.display === 'block') {
            closePdfModal();
        }
    });
}

function closePdfModal() {
    const pdfModal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    
    if (pdfModal) {
        pdfModal.style.display = 'none';
    }
    if (pdfViewer) {
        pdfViewer.src = '';
    }
    document.body.style.overflow = 'auto';
}
