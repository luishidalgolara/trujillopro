// ============================================================
// SIMBOLOGÍA UI - Generación de HTML y estilos
// ============================================================

function generarSimbologiaHTML() {
    const conteo = contarElementosPlano();
    
    return `
        <style>
            .simbologia-container {
                font-family: Arial, sans-serif;
                background: white;
            }
            
            .simbologia-container h1 {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 15px;
                color: #000000;
                border-bottom: 3px solid #000000;
                padding-bottom: 8px;
            }
            
            .tabla-simbologia {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            
            .tabla-simbologia th {
                background: #000000;
                color: white;
                padding: 10px;
                text-align: left;
                font-weight: bold;
                border: 2px solid #000000;
                font-size: 14px;
            }
            
            .tabla-simbologia td {
                padding: 8px 10px;
                border: 2px solid #000000;
                font-size: 13px;
                color: #000000;
                font-weight: bold;
            }
            
            .tabla-simbologia input {
                width: 95%;
                padding: 4px;
                border: 1px solid #ccc;
                border-radius: 3px;
                font-size: 12px;
                font-weight: bold;
            }
            
            .tabla-simbologia tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .tabla-simbologia tbody tr:hover {
                background: #e3f2fd !important;
            }
            
            .simbolo-celda {
                text-align: center;
                font-weight: bold;
                font-size: 16px;
                color: #000000;
            }
            
            .flecha-tuberia {
                color: #ff6600;
                font-size: 20px;
            }
            
            .circulo-camara {
                color: #ff6600;
                font-size: 20px;
            }
            
            .linea-punteada {
                border-top: 3px dashed #000;
                width: 60px;
                margin: 0 auto;
            }
        </style>
        
        <div class="simbologia-container">
            <h1>SIMBOLOGÍA</h1>
            
            <table class="tabla-simbologia" id="tablaSimbologia">
                <thead>
                    <tr>
                        <th style="width: 70%;">ELEMENTO</th>
                        <th style="width: 30%;">SÍMBOLO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LÍNEA OFICIAL</td>
                        <td class="simbolo-celda"><div class="linea-punteada"></div></td>
                    </tr>
                    <tr>
                        <td>TUBERÍA AGUA POTABLE FRÍA</td>
                        <td class="simbolo-celda"><span class="flecha-tuberia" style="color: #0066cc;">————⟶</span></td>
                    </tr>
                    <tr>
                        <td>MEDIDOR DE AGUA POTABLE</td>
                        <td class="simbolo-celda">
                        <object data="simbologia_AP/medidor_ap.html" type="text/html" class="icono-medidor"></object>
                    </td>                
                    <tr>
                        <td>LAVAMANO</td>
                        <td class="simbolo-celda">L</td>
                    </tr>
                    <tr>
                        <td>INODORO</td>
                        <td class="simbolo-celda">WC</td>
                    </tr>
                    <tr>
                        <td>BAÑO LLUVIA</td>
                        <td class="simbolo-celda">BLL</td>
                    </tr>
                    <tr>
                        <td>LAVAPLATOS</td>
                        <td class="simbolo-celda">Lp</td>
                    </tr>
                    <tr>
                        <td>CAJA REGISTRO</td>
                        <td class="simbolo-celda">CR</td>
                    </tr>
                    <tr>
                        <td>BIDET</td>
                        <td class="simbolo-celda">Bd</td>
                    </tr>
                    <tr>
                        <td>URINARIO</td>
                        <td class="simbolo-celda">U</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

console.log('✅ Simbología UI inicializado');