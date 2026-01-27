// editor/editor-export.js

function cambiarFormato(formato) {
    currentFormat = formato;
    
    document.querySelectorAll('.format-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn${formato}`).classList.add('active');
    
    const board = document.getElementById('drawingBoard');
    const externalTitle = document.getElementById('planTitle');
    
    board.className = `drawing-board format-${formato.toLowerCase()}`;
    externalTitle.textContent = `PLANO PROFESIONAL - ${formato}`;
    
    const tracingSvg = document.getElementById('tracingSvg');
    const datosFormato = formats[formato];
    
    tracingSvg.setAttribute('viewBox', `0 0 ${datosFormato.width} ${datosFormato.height}`);
    
    currentViewBox = { 
        x: 0, 
        y: 0, 
        width: datosFormato.width, 
        height: datosFormato.height 
    };
    
    const viewBoxAplicado = tracingSvg.getAttribute('viewBox');
    if (viewBoxAplicado !== `0 0 ${datosFormato.width} ${datosFormato.height}`) {
        console.error('❌ ViewBox no se aplicó correctamente:', viewBoxAplicado);
        setTimeout(() => {
            tracingSvg.setAttribute('viewBox', `0 0 ${datosFormato.width} ${datosFormato.height}`);
        }, 50);
    }
    
    if (typeof forceCorrectViewBox === 'function') {
        forceCorrectViewBox();
    }
    
    if (typeof updateTracingViewBox === 'function') {
        updateTracingViewBox();
    }
    
    updatePlanInfo();
    showStatus(`✅ Formato ${formato} - ViewBox: ${datosFormato.width}×${datosFormato.height}px - ÁREA COMPLETA FORZADA`);
    
    console.log(`🔧 cambiarFormato DEFINITIVO: ${formato} → viewBox: "${viewBoxAplicado}" → currentViewBox: ${datosFormato.width}×${datosFormato.height}`);
    
    if (typeof reposicionarVinetaSegunFormato === 'function') {
        setTimeout(reposicionarVinetaSegunFormato, 150);
    }
}

async function descargarPDF() {
    try {
        showStatus('⏳ Generando PDF de alta calidad con medidas reales...');
        
        const { jsPDF } = window.jspdf;
        
        const formatoReal = currentFormat === 'A1' ? 
            { width: 841, height: 594, orientation: 'landscape' } : 
            { width: 1189, height: 841, orientation: 'landscape' };
        
        const pdf = new jsPDF({
            orientation: formatoReal.orientation,
            unit: 'mm',
            format: [formatoReal.width, formatoReal.height]
        });

        const anchoPdf = pdf.internal.pageSize.getWidth();
        const altoPdf = pdf.internal.pageSize.getHeight();

        console.log(`📐 PDF creado: ${anchoPdf}mm × ${altoPdf}mm (${currentFormat})`);

        const board = document.getElementById('zoomContainer');
        const integratedIsometric = document.getElementById('integratedIsometric');
        
        if (integratedIsometric) {
            const svg = integratedIsometric.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1)';
                svg.style.transformOrigin = 'top left';
            }
        }

        const canvasBoard = await html2canvas(board, {
            scale: 5,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            allowTaint: false,
            imageTimeout: 0,
            removeContainer: false
        });
        
        pdf.addImage(
            canvasBoard.toDataURL('image/jpeg', 1.0), 
            'JPEG', 
            0, 
            0, 
            anchoPdf, 
            altoPdf,
            undefined,
            'FAST'
        );

        // 2. Capturar viñeta ESSBIO si está visible
        const vinetaWindow = document.getElementById('vinetaWindow');
        if (vinetaWindow && window.getComputedStyle(vinetaWindow).display !== 'none') {
            const vinetaIframe = document.getElementById('vinetaIframe');
            
            if (vinetaIframe && vinetaIframe.contentDocument) {
                const iframeBody = vinetaIframe.contentDocument.body;
                
                const canvasVineta = await html2canvas(iframeBody, {
                    scale: 5,
                    useCORS: true,
                    backgroundColor: '#ffffff',
                    logging: false,
                    allowTaint: false
                });
                
                const rect = vinetaWindow.getBoundingClientRect();
                const boardRect = board.getBoundingClientRect();
                const x = (rect.left - boardRect.left) / boardRect.width * anchoPdf;
                const y = (rect.top - boardRect.top) / boardRect.height * altoPdf;
                const w = rect.width / boardRect.width * anchoPdf;
                const h = rect.height / boardRect.height * altoPdf;
                
                pdf.addImage(
                    canvasVineta.toDataURL('image/jpeg', 1.0), 
                    'JPEG', 
                    x, 
                    y, 
                    w, 
                    h,
                    undefined,
                    'FAST'
                );
            }
        }

        // 3. Capturar Cuadro U.E.H si está visible
        const cuadroUEH = document.querySelector('.cuadro-ueh-window');
        if (cuadroUEH && window.getComputedStyle(cuadroUEH).display !== 'none') {
            const canvasCuadro = await html2canvas(cuadroUEH, {
                scale: 5,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                allowTaint: false
            });
            
            const rect = cuadroUEH.getBoundingClientRect();
            const boardRect = board.getBoundingClientRect();
            const x = (rect.left - boardRect.left) / boardRect.width * anchoPdf;
            const y = (rect.top - boardRect.top) / boardRect.height * altoPdf;
            const w = rect.width / boardRect.width * anchoPdf;
            const h = rect.height / boardRect.height * altoPdf;
            
            pdf.addImage(
                canvasCuadro.toDataURL('image/jpeg', 1.0), 
                'JPEG', 
                x, 
                y, 
                w, 
                h,
                undefined,
                'FAST'
            );
        }

        // 4. Capturar Detalles si están visibles
        const detalleWindows = document.querySelectorAll('.detalle-window');
        for (const detalle of detalleWindows) {
            if (window.getComputedStyle(detalle).display !== 'none') {
                const canvasDetalle = await html2canvas(detalle, {
                    scale: 5,
                    useCORS: true,
                    backgroundColor: '#ffffff',
                    logging: false,
                    allowTaint: false
                });
                
                const rect = detalle.getBoundingClientRect();
                const boardRect = board.getBoundingClientRect();
                const x = (rect.left - boardRect.left) / boardRect.width * anchoPdf;
                const y = (rect.top - boardRect.top) / boardRect.height * altoPdf;
                const w = rect.width / boardRect.width * anchoPdf;
                const h = rect.height / boardRect.height * altoPdf;
                
                pdf.addImage(
                    canvasDetalle.toDataURL('image/jpeg', 1.0), 
                    'JPEG', 
                    x, 
                    y, 
                    w, 
                    h,
                    undefined,
                    'FAST'
                );
            }
        }

        // 5. Capturar Simbología si está visible
        const simbologia = document.querySelector('.simbologia-window');
        if (simbologia && window.getComputedStyle(simbologia).display !== 'none') {
            const canvasSimbologia = await html2canvas(simbologia, {
                scale: 5,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                allowTaint: false
            });
            
            const rect = simbologia.getBoundingClientRect();
            const boardRect = board.getBoundingClientRect();
            const x = (rect.left - boardRect.left) / boardRect.width * anchoPdf;
            const y = (rect.top - boardRect.top) / boardRect.height * altoPdf;
            const w = rect.width / boardRect.width * anchoPdf;
            const h = rect.height / boardRect.height * altoPdf;
            
            pdf.addImage(
                canvasSimbologia.toDataURL('image/jpeg', 1.0), 
                'JPEG', 
                x, 
                y, 
                w, 
                h,
                undefined,
                'FAST'
            );
        }

        const nombreArchivo = `Plano_${currentFormat}_${formatoReal.width}x${formatoReal.height}mm_${new Date().toISOString().slice(0,10)}.pdf`;
        pdf.save(nombreArchivo);
        
        showStatus(`✅ PDF descargado: ${nombreArchivo} (${formatoReal.width}×${formatoReal.height}mm)`);

    } catch (error) {
        console.error('Error generating PDF:', error);
        showStatus('❌ Error al generar PDF');
    }
}

function mostrarModalEmail() {
    document.getElementById('emailModal').style.display = 'block';
}

function ocultarModalEmail() {
    document.getElementById('emailModal').style.display = 'none';
}

function enviarEmail() {
    const email = document.getElementById('emailInput').value;
    const asunto = document.getElementById('subjectInput').value;
    
    if (!email) {
        alert('Por favor ingresa un email válido');
        return;
    }

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent('Adjunto encontrarás el plano profesional solicitado.')}`;
    window.location.href = mailtoLink;
    
    ocultarModalEmail();
    showStatus('✅ Cliente de email abierto');
}

window.changeFormat = cambiarFormato;
window.downloadPDF = descargarPDF;
window.showEmailModal = mostrarModalEmail;
window.hideEmailModal = ocultarModalEmail;
window.sendEmail = enviarEmail;

window.EditorExport = {
    cambiarFormato,
    descargarPDF,
    mostrarModalEmail,
    ocultarModalEmail,
    enviarEmail
};

console.log('✅ editor-export.js cargado');