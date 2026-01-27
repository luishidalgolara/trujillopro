// ============================================================
// CUADRO DE CARGAS UI - Generación de HTML y estilos
// ============================================================

function generarCuadroCargasHTML() {
    return `
        <style>
            .cuadro-cargas-container {
                font-family: Arial, sans-serif;
                background: white;
            }
            
            .cuadro-cargas-container h1 {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #2c3e50;
                border-bottom: 3px solid #f39c12;
                padding-bottom: 10px;
            }
            
            .tabla-cargas {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
                font-size: 13px;
            }
            
            .tabla-cargas thead tr {
                background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
                color: white;
            }
            
            .tabla-cargas th {
                padding: 12px 8px;
                text-align: center;
                font-weight: bold;
                border: 2px solid #34495e;
                font-size: 12px;
            }
            
            .tabla-cargas td {
                padding: 10px 8px;
                border: 1px solid #bdc3c7;
                text-align: center;
                color: #2c3e50;
            }
            
            .tabla-cargas tbody tr:hover {
                background: #ecf0f1 !important;
            }
            
            .tabla-cargas tfoot {
                font-weight: bold;
                font-size: 14px;
            }
            
            .tabla-cargas tfoot td {
                padding: 12px 8px;
                border: 2px solid #34495e;
            }
        </style>
        
        <div class="cuadro-cargas-container">
            <h1>⚡ CUADRO DE CARGAS ELÉCTRICO</h1>
            
            <table class="tabla-cargas" id="tablaCargasModal">
                <thead>
                    <tr>
                        <th style="width: 8%;">Circuito</th>
                        <th style="width: 25%;">Tipo de Uso</th>
                        <th style="width: 12%;">Potencia (W)</th>
                        <th style="width: 12%;">Corriente (A)</th>
                        <th style="width: 10%;">Sección (mm²)</th>
                        <th style="width: 10%;">Tierra (mm²)</th>
                        <th style="width: 13%;">Automático</th>
                        <th style="width: 10%;">Diferencial</th>
                    </tr>
                </thead>
                <tbody id="tablaCargasBody">
                    <tr>
                        <td colspan="8" style="text-align: center; padding: 40px; color: #7f8c8d; font-style: italic; font-size: 15px;">
                            <div style="margin-bottom: 10px; font-size: 48px;">📋</div>
                            <div style="font-weight: 600; margin-bottom: 8px;">Sin elementos en el plano</div>
                            <div style="font-size: 13px;">Agrega símbolos eléctricos para generar el cuadro de cargas automáticamente</div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr style="background: #ecf0f1; font-weight: bold;">
                        <td colspan="2"><strong>TOTAL INSTALADO</strong></td>
                        <td><strong id="totalPotenciaModal">0 W</strong></td>
                        <td><strong id="totalCorrienteModal">0.0 A</strong></td>
                        <td colspan="4"></td>
                    </tr>
                    <tr style="background: #fff3cd; font-weight: bold; color: #856404;">
                        <td colspan="2"><strong>⚡ DEMANDA MÁXIMA (Factor 0.75)</strong></td>
                        <td><strong id="demandaPotenciaModal">0 W</strong></td>
                        <td><strong id="demandaCorrienteModal">0.0 A</strong></td>
                        <td colspan="4"></td>
                    </tr>
                    <tr style="background: #d1ecf1; font-weight: bold; color: #0c5460;">
                        <td colspan="2"><strong>🔌 INTERRUPTOR GENERAL (IGA)</strong></td>
                        <td colspan="6"><strong id="interruptorGeneralModal">-</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
}

console.log('✅ Cuadro de Cargas UI inicializado');
