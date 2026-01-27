// ============================================================
// SIMBOLOGÍA ELÉCTRICA UI - Generación de HTML y estilos
// ============================================================

function generarSimbologiaElectricaHTML() {
    return `
        <style>
            .simbologia-electrica-container {
                font-family: Arial, sans-serif;
                background: white;
            }
            
            .simbologia-electrica-container h1 {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 15px;
                color: #000000;
                border-bottom: 3px solid #000000;
                padding-bottom: 8px;
            }
            
            .tabla-simbologia-electrica {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            
            .tabla-simbologia-electrica th {
                background: #000000;
                color: white;
                padding: 10px;
                text-align: left;
                font-weight: bold;
                border: 2px solid #000000;
                font-size: 14px;
            }
            
            .tabla-simbologia-electrica td {
                padding: 8px 10px;
                border: 2px solid #000000;
                font-size: 13px;
                color: #000000;
                font-weight: bold;
            }
            
            .tabla-simbologia-electrica input {
                width: 95%;
                padding: 4px;
                border: 1px solid #ccc;
                border-radius: 3px;
                font-size: 12px;
                font-weight: bold;
            }
            
            .tabla-simbologia-electrica tr:nth-child(even) {
                background: #f8f9fa;
            }
            
            .tabla-simbologia-electrica tbody tr:hover {
                background: #e3f2fd !important;
            }
            
            .simbolo-celda-electrica {
                text-align: center;
                font-weight: bold;
                font-size: 16px;
                color: #000000;
            }
        </style>
        
        <div class="simbologia-electrica-container">
            <h1>SIMBOLOGÍA ELÉCTRICA</h1>
            
            <table class="tabla-simbologia-electrica" id="tablaSimbologiaElectrica">
                <thead>
                    <tr>
                        <th style="width: 70%;">ELEMENTO</th>
                        <th style="width: 30%;">SÍMBOLO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Luminaria de Cielo</td>
                        <td class="simbolo-celda-electrica">💡</td>
                    </tr>
                    <tr>
                        <td>Aplique Mural</td>
                        <td class="simbolo-celda-electrica">🔆</td>
                    </tr>
                    <tr>
                        <td>Luminaria Exterior</td>
                        <td class="simbolo-celda-electrica">🌟</td>
                    </tr>
                    <tr>
                        <td>Enchufe Simple 10A</td>
                        <td class="simbolo-celda-electrica">🔌</td>
                    </tr>
                    <tr>
                        <td>Enchufe Doble</td>
                        <td class="simbolo-celda-electrica">🔌🔌</td>
                    </tr>
                    <tr>
                        <td>Interruptor Simple</td>
                        <td class="simbolo-celda-electrica">🔘</td>
                    </tr>
                    <tr>
                        <td>Interruptor Doble</td>
                        <td class="simbolo-celda-electrica">🔘🔘</td>
                    </tr>
                    <tr>
                        <td>Tablero Eléctrico</td>
                        <td class="simbolo-celda-electrica">⚡</td>
                    </tr>
                    <tr>
                        <td>Medidor kWh</td>
                        <td class="simbolo-celda-electrica">📊</td>
                    </tr>
                    <tr>
                        <td>Puesta a Tierra</td>
                        <td class="simbolo-celda-electrica">🌍</td>
                    </tr>
                    <tr>
                        <td>Caja de Derivación</td>
                        <td class="simbolo-celda-electrica">📦</td>
                    </tr>
                    <tr>
                        <td>Ducto PVC</td>
                        <td class="simbolo-celda-electrica">📏</td>
                    </tr>
                    <tr>
                        <td>Timbre</td>
                        <td class="simbolo-celda-electrica">🔔</td>
                    </tr>
                    <tr>
                        <td>Detector de Humo</td>
                        <td class="simbolo-celda-electrica">🔥</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

console.log('✅ Simbología Eléctrica UI inicializado');