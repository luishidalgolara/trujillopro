// ============================================================
// TABLERO INTEGRACIÓN UI - Diseño REALISTA de tablero físico
// ============================================================

/**
 * Generar HTML visual del tablero eléctrico REALISTA
 * Muestra breakers tipo físico con palancas ON/OFF
 */
function generarTableroVisualHTML() {
    // Obtener datos del CuadroState
    const todosCircuitos = [
        ...CuadroState.circuits.level1.map(c => ({...c, nivelLabel: 'N1'})),
        ...CuadroState.circuits.level2.map(c => ({...c, nivelLabel: 'N2'}))
    ];
    
    const totalPotencia = CuadroState.totalPotencia || 0;
    const totalCorriente = CuadroState.totalCorriente || 0;
    const iga = CuadroState.interruptorGeneral || '-';
    
    // Agrupar por nivel
    const nivel1 = todosCircuitos.filter(c => c.nivel === 1);
    const nivel2 = todosCircuitos.filter(c => c.nivel === 2);
    
    // Función para generar breaker realista
    function generarBreakerRealista(circuito, numeroCircuito) {
        const colorCategoria = circuito.categoria === 'iluminacion' ? '#f39c12' : 
                              circuito.categoria === 'enchufes' ? '#3498db' : '#9b59b6';
        
        const iconoCategoria = circuito.categoria === 'iluminacion' ? '💡' : 
                              circuito.categoria === 'enchufes' ? '🔌' : '⚡';
        
        // Color del breaker según amperaje
        const amperaje = parseInt(circuito.automatico);
        let colorBreaker = '#34495e';
        if (amperaje >= 32) colorBreaker = '#e74c3c';
        else if (amperaje >= 20) colorBreaker = '#e67e22';
        else if (amperaje >= 16) colorBreaker = '#f39c12';
        
        return `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 8px;
            ">
                <!-- Breaker físico -->
                <div style="
                    width: 70px;
                    height: 100px;
                    background: linear-gradient(145deg, ${colorBreaker}, ${colorBreaker}dd);
                    border-radius: 6px;
                    box-shadow: 
                        0 4px 8px rgba(0,0,0,0.3),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.3);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 8px 4px;
                ">
                    <!-- Número de circuito -->
                    <div style="
                        width: 100%;
                        text-align: center;
                        color: white;
                        font-weight: bold;
                        font-size: 10px;
                        margin-bottom: 4px;
                        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                    ">C${numeroCircuito}</div>
                    
                    <!-- Palanca ON/OFF (switch) -->
                    <div style="
                        width: 30px;
                        height: 50px;
                        background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%);
                        border-radius: 15px;
                        position: relative;
                        box-shadow: 
                            inset 0 2px 4px rgba(0,0,0,0.4),
                            0 1px 0 rgba(255,255,255,0.1);
                        margin: 8px 0;
                    ">
                        <!-- Palanca -->
                        <div style="
                            position: absolute;
                            top: 8px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 20px;
                            height: 30px;
                            background: linear-gradient(145deg, #ecf0f1, #bdc3c7);
                            border-radius: 10px;
                            box-shadow: 
                                0 3px 6px rgba(0,0,0,0.4),
                                inset 0 1px 0 rgba(255,255,255,0.8);
                            border: 1px solid #95a5a6;
                        ">
                            <!-- Marca ON en la palanca -->
                            <div style="
                                position: absolute;
                                top: 3px;
                                left: 50%;
                                transform: translateX(-50%);
                                width: 8px;
                                height: 2px;
                                background: #27ae60;
                                border-radius: 1px;
                            "></div>
                        </div>
                    </div>
                    
                    <!-- Indicador LED -->
                    <div style="
                        width: 8px;
                        height: 8px;
                        background: radial-gradient(circle, #27ae60, #229954);
                        border-radius: 50%;
                        box-shadow: 
                            0 0 6px #27ae60,
                            inset 0 1px 1px rgba(255,255,255,0.5);
                        margin-top: 2px;
                    "></div>
                </div>
                
                <!-- Etiquetas debajo del breaker -->
                <div style="
                    text-align: center;
                    margin-top: 6px;
                    min-width: 70px;
                ">
                    <!-- Amperaje -->
                    <div style="
                        font-weight: bold;
                        font-size: 13px;
                        color: #2c3e50;
                        margin-bottom: 2px;
                    ">${circuito.automatico}</div>
                    
                    <!-- Icono categoría -->
                    <div style="font-size: 16px; margin-bottom: 2px;">${iconoCategoria}</div>
                    
                    <!-- Tipo de circuito -->
                    <div style="
                        font-size: 9px;
                        color: #7f8c8d;
                        max-width: 70px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    ">${circuito.tipo.substring(0, 12)}</div>
                    
                    <!-- Badge de nivel -->
                    <div style="
                        display: inline-block;
                        background: ${circuito.nivel === 1 ? '#3498db' : '#9b59b6'};
                        color: white;
                        font-size: 8px;
                        padding: 2px 6px;
                        border-radius: 3px;
                        margin-top: 3px;
                        font-weight: bold;
                    ">${circuito.nivelLabel}</div>
                </div>
            </div>
        `;
    }
    
    // Generar breakers para nivel 1
    let breakersNivel1HTML = '';
    let numeroCircuito = 1;
    nivel1.forEach(circuito => {
        breakersNivel1HTML += generarBreakerRealista(circuito, numeroCircuito);
        numeroCircuito++;
    });
    
    // Generar breakers para nivel 2
    let breakersNivel2HTML = '';
    nivel2.forEach(circuito => {
        breakersNivel2HTML += generarBreakerRealista(circuito, numeroCircuito);
        numeroCircuito++;
    });
    
    return `
        <style>
            .tablero-integrado * {
                box-sizing: border-box;
            }
            .breakers-grid {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                padding: 10px;
                gap: 5px;
            }
        </style>
        
        <div style="
            background: linear-gradient(145deg, #d5d8dc, #ecf0f1);
            border: 3px solid #7f8c8d;
            border-radius: 8px;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
        ">
            <!-- Placa superior del tablero -->
            <div style="
                background: linear-gradient(145deg, #34495e, #2c3e50);
                padding: 12px;
                border-radius: 5px 5px 0 0;
                text-align: center;
                border-bottom: 2px solid #1a252f;
            ">
                <div style="
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                    letter-spacing: 1px;
                ">⚡ TABLERO ELÉCTRICO GENERAL</div>
            </div>
            
            <!-- INTERRUPTOR GENERAL PRINCIPAL (IGA) -->
            <div style="
                background: #ecf0f1;
                padding: 15px;
                border-bottom: 2px solid #bdc3c7;
            ">
                <div style="
                    text-align: center;
                    font-size: 11px;
                    color: #7f8c8d;
                    font-weight: bold;
                    margin-bottom: 10px;
                ">INTERRUPTOR GENERAL AUTOMÁTICO</div>
                
                <!-- IGA visual -->
                <div style="
                    margin: 0 auto;
                    width: 100px;
                    height: 140px;
                    background: linear-gradient(145deg, #e74c3c, #c0392b);
                    border-radius: 8px;
                    box-shadow: 
                        0 6px 12px rgba(0,0,0,0.4),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -2px 0 rgba(0,0,0,0.3);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 12px 8px;
                ">
                    <!-- Label IGA -->
                    <div style="
                        color: white;
                        font-weight: bold;
                        font-size: 11px;
                        margin-bottom: 8px;
                        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                    ">IGA</div>
                    
                    <!-- Palanca grande IGA -->
                    <div style="
                        width: 45px;
                        height: 70px;
                        background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%);
                        border-radius: 20px;
                        position: relative;
                        box-shadow: 
                            inset 0 3px 6px rgba(0,0,0,0.5),
                            0 2px 0 rgba(255,255,255,0.1);
                        margin: 10px 0;
                    ">
                        <!-- Palanca grande -->
                        <div style="
                            position: absolute;
                            top: 12px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 32px;
                            height: 45px;
                            background: linear-gradient(145deg, #ecf0f1, #bdc3c7);
                            border-radius: 16px;
                            box-shadow: 
                                0 4px 8px rgba(0,0,0,0.5),
                                inset 0 2px 0 rgba(255,255,255,0.9);
                            border: 2px solid #95a5a6;
                        ">
                            <!-- Marca ON grande -->
                            <div style="
                                position: absolute;
                                top: 6px;
                                left: 50%;
                                transform: translateX(-50%);
                                width: 12px;
                                height: 3px;
                                background: #27ae60;
                                border-radius: 2px;
                                box-shadow: 0 0 4px #27ae60;
                            "></div>
                        </div>
                    </div>
                    
                    <!-- Valor del IGA -->
                    <div style="
                        color: white;
                        font-weight: bold;
                        font-size: 16px;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                        margin-top: 4px;
                    ">${iga}</div>
                </div>
            </div>
            
            ${nivel1.length > 0 ? `
            <!-- NIVEL 1 - PLANTA BAJA -->
            <div style="
                background: #ecf0f1;
                padding: 12px 8px;
                border-bottom: 2px solid #bdc3c7;
            ">
                <div style="
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 12px;
                    margin-bottom: 10px;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <span style="
                        background: white;
                        color: #3498db;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 13px;
                    ">1</span>
                    PRIMER NIVEL - PLANTA BAJA
                </div>
                
                <div class="breakers-grid">
                    ${breakersNivel1HTML}
                </div>
            </div>
            ` : ''}
            
            ${nivel2.length > 0 ? `
            <!-- NIVEL 2 - PLANTA ALTA -->
            <div style="
                background: #ecf0f1;
                padding: 12px 8px;
            ">
                <div style="
                    background: linear-gradient(135deg, #9b59b6, #8e44ad);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 12px;
                    margin-bottom: 10px;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <span style="
                        background: white;
                        color: #9b59b6;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 13px;
                    ">2</span>
                    SEGUNDO NIVEL - PLANTA ALTA
                </div>
                
                <div class="breakers-grid">
                    ${breakersNivel2HTML}
                </div>
            </div>
            ` : ''}
            
            <!-- Resumen inferior -->
            <div style="
                background: linear-gradient(145deg, #34495e, #2c3e50);
                padding: 10px 15px;
                border-radius: 0 0 5px 5px;
                display: flex;
                justify-content: space-around;
                border-top: 2px solid #1a252f;
            ">
                <div style="text-align: center;">
                    <div style="color: #95a5a6; font-size: 9px; margin-bottom: 2px;">POTENCIA</div>
                    <div style="color: white; font-weight: bold; font-size: 12px;">${totalPotencia}W</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: #95a5a6; font-size: 9px; margin-bottom: 2px;">CORRIENTE</div>
                    <div style="color: #e74c3c; font-weight: bold; font-size: 12px;">${totalCorriente}A</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: #95a5a6; font-size: 9px; margin-bottom: 2px;">TENSIÓN</div>
                    <div style="color: #f39c12; font-weight: bold; font-size: 12px;">220V</div>
                </div>
            </div>
        </div>
    `;
}

console.log('✅ Tablero Integración UI REALISTA inicializado');