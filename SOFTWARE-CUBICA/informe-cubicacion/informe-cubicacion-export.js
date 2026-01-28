/* ========================================
   EXPORTACIÓN - INFORME DE CUBICACIÓN
   ======================================== */

// Exportar informe a Excel
function exportarInformeExcel() {
    alert('📥 Función de exportación a Excel en desarrollo.\n\nPróximamente podrás descargar el informe en formato .xlsx');
    
    // TODO: Implementar exportación real con librería como SheetJS
    console.log('Exportando a Excel...');
}

// Exportar informe a PDF
function exportarInformePDF() {
    // Usar window.print() para generar PDF
    const contenidoOriginal = document.body.innerHTML;
    const contenidoInforme = document.getElementById('informeContainer').innerHTML;
    
    // Crear ventana de impresión
    const ventanaImpresion = window.open('', '', 'height=800,width=800');
    
    ventanaImpresion.document.write('<html><head><title>Informe de Cubicación</title>');
    ventanaImpresion.document.write('<style>');
    ventanaImpresion.document.write(`
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        
        .informe-hoja {
            width: 21cm;
            padding: 2cm;
            margin: 0 auto;
        }
        
        .informe-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #2c3e50;
        }
        
        .informe-header h1 {
            font-size: 20pt;
            color: #2c3e50;
            margin: 0 0 10px 0;
        }
        
        .proyecto-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 15px;
            font-size: 10pt;
        }
        
        .categoria-section {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }
        
        .categoria-titulo {
            background: #34495e;
            color: white;
            padding: 8px 12px;
            font-size: 12pt;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .tabla-cubicacion {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-size: 9pt;
        }
        
        .tabla-cubicacion thead {
            background: #ecf0f1;
        }
        
        .tabla-cubicacion th {
            padding: 8px;
            text-align: left;
            border: 1px solid #bdc3c7;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .tabla-cubicacion td {
            padding: 6px 8px;
            border: 1px solid #bdc3c7;
        }
        
        .tabla-cubicacion tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .subtotal-row {
            background: #d5dbdb !important;
            font-weight: bold;
        }
        
        .resumen-general {
            background: #e8f5e9;
            border: 2px solid #27ae60;
            padding: 15px;
            margin-top: 25px;
            page-break-inside: avoid;
        }
        
        .resumen-general h3 {
            color: #27ae60;
            margin: 0 0 15px 0;
        }
        
        .resumen-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .resumen-item {
            display: flex;
            justify-content: space-between;
            padding: 5px;
        }
        
        .informe-footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid #bdc3c7;
            font-size: 8pt;
            color: #7f8c8d;
            text-align: center;
        }
        
        @media print {
            body {
                margin: 0;
            }
            .informe-hoja {
                page-break-after: always;
            }
        }
    `);
    ventanaImpresion.document.write('</style></head><body>');
    ventanaImpresion.document.write(contenidoInforme);
    ventanaImpresion.document.write('</body></html>');
    
    ventanaImpresion.document.close();
    ventanaImpresion.focus();
    
    // Esperar un momento y abrir diálogo de impresión
    setTimeout(() => {
        ventanaImpresion.print();
        ventanaImpresion.close();
    }, 250);
}
