// ============================================================
// ESQUEMA UNIFILAR DIBUJO - Generación del diagrama técnico
// VERSIÓN FINAL: Contenedores Arrastrables + Textos Independientes
// ============================================================

/**
 * Generar el diagrama unifilar completo
 */
function generarDiagramaUnifilar() {
    const container = document.getElementById('unifilarDiagrama');
    if (!container) return;
    
    // Analizar datos (mantiene conexión con CuadroState)
    const datos = analizarDatosUnifilar();
    
    // Generar HTML del diagrama con SVG técnico
    const diagramaHTML = generarHTMLDiagrama(datos);
    
    container.innerHTML = diagramaHTML;
    
    // Inicializar sistema de arrastre SOLO SI ESTÁ EN MODAL
    setTimeout(() => {
        const esIntegrado = container.closest('.unifilar-integrado');
        if (!esIntegrado) {
            inicializarArrastreCompleto();
        }
    }, 200);
    
    console.log('✅ Diagrama unifilar técnico profesional generado:', datos);
}

/**
 * Generar HTML completo del diagrama con SVG técnico
 */
function generarHTMLDiagrama(datos) {
    const circuitos = datos.todosCircuitos;
    const numCircuitos = circuitos.length || 3;
    
    // CÁLCULO CENTRALIZADO
    const anchoTotal = 1400;
    const centroX = anchoTotal / 2;
    const alturaTotal = 1100;
    
    // Distribución de circuitos centrada
    const espacioEntreCircuitos = 140;
    const anchoTotalCircuitos = (numCircuitos - 1) * espacioEntreCircuitos;
    const primerCircuitoX = centroX - (anchoTotalCircuitos / 2);
    
    // Posiciones de la barra colectora
    const margenBarra = 100;
    const inicioBarraX = primerCircuitoX - margenBarra;
    const finBarraX = primerCircuitoX + anchoTotalCircuitos + margenBarra;
    
    // Generar SVG de circuitos
    let circuitosSVG = '';
    circuitos.forEach((circuito, index) => {
        const x = primerCircuitoX + (index * espacioEntreCircuitos);
        circuitosSVG += generarCircuitoSVG(circuito, index + 1, x, 500);
    });
    
    // Generar líneas de ramificación desde la barra
    let lineasRamificacion = '';
    circuitos.forEach((circuito, index) => {
        const x = primerCircuitoX + (index * espacioEntreCircuitos);
        lineasRamificacion += `
            <line x1="${x}" y1="470" x2="${x}" y2="500" class="linea" />
        `;
    });
    
    return `
        <style>
            .unifilar-svg-container {
                width: 100%;
                height: 100%;
                min-height: 100%;
                overflow: auto;
                background: white;
                padding: 20px;
                box-sizing: border-box;
            }
            .linea {
                stroke: #000000;
                stroke-width: 2;
                fill: none;
            }
            .linea-gruesa {
                stroke: #000000;
                stroke-width: 5;
                fill: none;
            }
            .caja {
                fill: white;
                stroke: #000000;
                stroke-width: 2.5;
            }
            .caja-iga {
                fill: white;
                stroke: #000000;
                stroke-width: 3.5;
            }
            .caja-info {
                fill: white;
                stroke: #2c3e50;
                stroke-width: 2;
            }
            .texto-svg {
                font-family: 'Arial', 'Helvetica', sans-serif;
                font-size: 11px;
                fill: #000000;
                pointer-events: none;
            }
            .texto-movible {
                cursor: move;
                user-select: none;
                pointer-events: all;
            }
            .texto-movible:hover {
                fill: #2980b9;
                font-weight: bold;
            }
            .texto-movible.dragging {
                fill: #e74c3c;
                font-weight: bold;
            }
            .contenedor-arrastrable {
                cursor: move;
            }
            .contenedor-arrastrable:hover .caja-info {
                stroke: #3498db;
                stroke-width: 3;
            }
            .contenedor-arrastrable.dragging .caja-info {
                stroke: #e74c3c;
                stroke-width: 3;
                fill: #fff3cd;
            }
            .texto-grande {
                font-size: 16px;
                font-weight: bold;
            }
            .texto-titulo {
                font-size: 10px;
            }
            .circulo-numero {
                fill: white;
                stroke: #000000;
                stroke-width: 2.5;
            }
            .tierra {
                stroke: #000000;
                stroke-width: 2.5;
                fill: none;
            }
            .emoji-circuito {
                font-size: 28px;
                user-select: none;
            }
        </style>
        
        <div class="unifilar-svg-container">
            <svg width="${anchoTotal}" height="${alturaTotal}" xmlns="http://www.w3.org/2000/svg" id="diagramaSVG">
                
                <!-- TÍTULO -->
                <text x="${centroX}" y="30" text-anchor="middle" class="texto-svg" style="font-size: 26px; font-weight: bold; text-decoration: underline;">
                    Diagrama Unifilar
                </text>
                <text x="${centroX}" y="55" text-anchor="middle" class="texto-svg texto-titulo">
                    Sistema Eléctrico - 220V
                </text>
                <text x="${centroX}" y="70" text-anchor="middle" class="texto-svg texto-titulo texto-movible" data-tipo="label">
                    E.E. SAESA
                </text>
                
                <!-- RED ELÉCTRICA (E) -->
                <rect x="${centroX - 40}" y="85" width="80" height="50" class="caja"/>
                <text x="${centroX}" y="117" text-anchor="middle" class="texto-svg texto-grande">E</text>
                
                <!-- Línea vertical -->
                <line x1="${centroX}" y1="135" x2="${centroX}" y2="185" class="linea"/>
                
                <!-- ========== CONTENEDOR ARRASTRABLE: CABLE ACOMETIDA ========== -->
                <g class="contenedor-arrastrable" data-contenedor="acometida">
                    <rect x="50" y="140" width="230" height="75" class="caja-info" rx="5"/>
                    <text x="60" y="160" class="texto-svg" style="font-weight: bold;">📋 Cable Acometida:</text>
                    <text x="70" y="177" class="texto-svg">S: 2 x 4 mm² RZ1-K</text>
                    <text x="70" y="194" class="texto-svg">C: Aéreo</text>
                    <text x="70" y="210" class="texto-svg">L: 30 METROS</text>
                </g>
                
                <!-- MEDIDOR (M) -->
                <rect x="${centroX - 40}" y="185" width="80" height="60" class="caja"/>
                <text x="${centroX}" y="220" text-anchor="middle" class="texto-svg texto-grande">M</text>
                
                <!-- Protección IADA -->
                <text x="${centroX - 65}" y="210" text-anchor="end" class="texto-svg texto-titulo texto-movible" data-tipo="label" style="font-weight: bold;">IADA</text>
                <circle cx="${centroX - 80}" cy="220" r="16" fill="white" stroke="black" stroke-width="2.5"/>
                <line x1="${centroX - 90}" y1="230" x2="${centroX - 70}" y2="210" stroke="black" stroke-width="2.5"/>
                
                <!-- ========== CONTENEDOR ARRASTRABLE: INT. AUTOMÁTICO ========== -->
                <g class="contenedor-arrastrable" data-contenedor="intAutomatico">
                    <rect x="50" y="230" width="230" height="75" class="caja-info" rx="5"/>
                    <text x="60" y="250" class="texto-svg" style="font-weight: bold;">⚡ Int. Automático:</text>
                    <text x="70" y="267" class="texto-svg">Int. Aut. 1Ø 5A IIr</text>
                    <text x="70" y="284" class="texto-svg">Curva D</text>
                    <text x="70" y="300" class="texto-svg">Cap. Rup. 10 K.A.</text>
                </g>
                
                <!-- Línea vertical -->
                <line x1="${centroX}" y1="245" x2="${centroX}" y2="300" class="linea"/>
                
                <!-- Símbolo de tierra -->
                <g class="tierra">
                    <line x1="${centroX}" y1="300" x2="${centroX}" y2="325"/>
                    <line x1="${centroX - 20}" y1="325" x2="${centroX + 20}" y2="325"/>
                    <line x1="${centroX - 15}" y1="332" x2="${centroX + 15}" y2="332"/>
                    <line x1="${centroX - 10}" y1="339" x2="${centroX + 10}" y2="339"/>
                </g>
                
                <!-- ========== CONTENEDOR ARRASTRABLE: CABLE SUBIDA ========== -->
                <g class="contenedor-arrastrable" data-contenedor="cableSubida">
                    <rect x="50" y="320" width="230" height="75" class="caja-info" rx="5"/>
                    <text x="60" y="340" class="texto-svg" style="font-weight: bold;">📋 Cable Subida:</text>
                    <text x="70" y="357" class="texto-svg">S: 2 x 10 mm² RZ1-K</text>
                    <text x="70" y="374" class="texto-svg">C: Conduit PVC</text>
                    <text x="70" y="390" class="texto-svg">L: 40 METROS</text>
                </g>
                
                <!-- Línea vertical -->
                <line x1="${centroX}" y1="345" x2="${centroX}" y2="395" class="linea"/>
                
                <!-- Sección de cable sobre el IGA -->
                <rect x="${centroX + 15}" y="375" width="110" height="24" fill="white" stroke="black" stroke-width="2.2" rx="4"/>
                <text x="${centroX + 70}" y="391" text-anchor="middle" class="texto-svg texto-movible" data-tipo="spec" style="font-weight: bold; font-size: 12px;">${datos.alimentacion.seccion}</text>
                
                <!-- IGA -->
                <rect x="${centroX - 55}" y="395" width="110" height="65" class="caja-iga" rx="3"/>
                <text x="${centroX}" y="413" text-anchor="middle" class="texto-svg texto-titulo texto-movible" data-tipo="label" style="font-weight: bold;">IGA</text>
                <text x="${centroX}" y="433" text-anchor="middle" class="texto-svg" style="font-size: 20px; font-weight: bold;">${datos.iga}</text>
                <text x="${centroX}" y="452" text-anchor="middle" class="texto-svg texto-titulo texto-movible" data-tipo="spec" style="font-weight: bold;">${datos.alimentacion.ducto}</text>
                
                <!-- TABLERO GENERAL -->
                <text x="50" y="435" class="texto-svg texto-movible" data-tipo="label" style="font-size: 18px; font-weight: bold;">T.D.A. ⚡</text>
                
                <!-- ========== CONTENEDOR ARRASTRABLE: DATOS TABLERO ========== -->
                <g class="contenedor-arrastrable" data-contenedor="datosTablero">
                    <rect x="${anchoTotal - 350}" y="380" width="320" height="90" fill="#f8f9fa" stroke="#495057" stroke-width="2.5" rx="6" class="caja-info"/>
                    <text x="${anchoTotal - 340}" y="402" class="texto-svg" style="font-size: 13px; font-weight: bold;">📊 DATOS DEL TABLERO:</text>
                    <text x="${anchoTotal - 340}" y="422" class="texto-svg" style="font-size: 11px;">Potencia Instalada: ${datos.potenciaTotal} W</text>
                    <text x="${anchoTotal - 340}" y="441" class="texto-svg" style="font-size: 11px;">Demanda Máxima: ${datos.demandaPotencia} W</text>
                    <text x="${anchoTotal - 340}" y="460" class="texto-svg" style="font-size: 11px;">Corriente Total: ${datos.corrienteTotal} A</text>
                </g>
                
                <!-- Línea vertical corta -->
                <line x1="${centroX}" y1="460" x2="${centroX}" y2="470" class="linea"/>
                
                <!-- BARRA COLECTORA -->
                <line x1="${inicioBarraX}" y1="470" x2="${finBarraX}" y2="470" class="linea-gruesa"/>
                <text x="${centroX}" y="490" text-anchor="middle" class="texto-svg texto-titulo texto-movible" data-tipo="label" style="font-weight: bold; font-size: 11px;">Barra colectora</text>
                
                <!-- RAMIFICACIÓN A CIRCUITOS -->
                ${lineasRamificacion}
                
                <!-- CIRCUITOS INDIVIDUALES -->
                ${circuitosSVG}
                
                <!-- RESUMEN INFERIOR -->
                <rect x="${inicioBarraX}" y="${alturaTotal - 150}" width="${finBarraX - inicioBarraX}" height="105" fill="#ecf0f1" stroke="#7f8c8d" stroke-width="3" rx="8"/>
                <text x="${centroX}" y="${alturaTotal - 118}" text-anchor="middle" class="texto-svg" style="font-size: 16px; font-weight: bold;">
                    📊 RESUMEN DEL SISTEMA
                </text>
                <text x="${inicioBarraX + 25}" y="${alturaTotal - 90}" class="texto-svg texto-movible" data-tipo="label" style="font-weight: bold; font-size: 12px;">Total Circuitos: ${datos.totalCircuitos}</text>
                <text x="${inicioBarraX + 25}" y="${alturaTotal - 70}" class="texto-svg texto-movible" data-tipo="label" style="font-size: 11px;">💡 Iluminación: ${datos.iluminacionCount}</text>
                <text x="${inicioBarraX + 25}" y="${alturaTotal - 50}" class="texto-svg texto-movible" data-tipo="label" style="font-size: 11px;">🔌 Enchufes: ${datos.enchufesCount}</text>
                <text x="${centroX + 80}" y="${alturaTotal - 70}" class="texto-svg texto-movible" data-tipo="label" style="font-size: 11px;">⚡ Especiales: ${datos.especialesCount}</text>
                
                <!-- NOTA TÉCNICA -->
                <rect x="${inicioBarraX}" y="${alturaTotal - 35}" width="${finBarraX - inicioBarraX}" height="30" fill="#fff3cd" stroke="#ffc107" stroke-width="2.5" rx="5"/>
                <text x="${centroX}" y="${alturaTotal - 12}" text-anchor="middle" class="texto-svg texto-titulo" style="font-weight: bold; font-size: 10px;">
                    ⚠️ Esquema generado según normativa NCh Elec 4/2003 | SEC Chile | Factor de demanda: 0.75
                </text>
            </svg>
        </div>
    `;
}

/**
 * Generar SVG de un circuito individual
 */
function generarCircuitoSVG(circuito, numero, x, y) {
    const iconoCategoria = circuito.categoria === 'iluminacion' ? '💡' : 
                          circuito.categoria === 'enchufes' ? '🔌' : 
                          circuito.categoria === 'electrodomesticos' ? '⚡' : '🔌';
    
    const partes = circuito.automatico.split('-');
    const amperaje = partes[0] || '10A';
    const curva = partes[1] || 'C';
    
    return `
        <g id="circuito-${numero}">
            <line x1="${x}" y1="${y}" x2="${x}" y2="${y + 35}" class="linea"/>
            <rect x="${x - 28}" y="${y + 35}" width="56" height="65" class="caja"/>
            <text x="${x}" y="${y + 51}" text-anchor="middle" class="texto-svg texto-titulo texto-movible" data-tipo="label" style="font-weight: bold;">C${numero}</text>
            <text x="${x}" y="${y + 68}" text-anchor="middle" class="texto-svg texto-movible" data-tipo="spec" style="font-size: 14px; font-weight: bold;">${amperaje}</text>
            <text x="${x}" y="${y + 84}" text-anchor="middle" class="texto-svg texto-titulo texto-movible" data-tipo="spec" style="font-weight: bold;">Curva ${curva}</text>
            <text x="${x}" y="${y + 96}" text-anchor="middle" class="texto-svg texto-titulo texto-movible" data-tipo="spec">6kA</text>
            <line x1="${x}" y1="${y + 100}" x2="${x}" y2="${y + 125}" class="linea"/>
            <rect x="${x - 38}" y="${y + 125}" width="76" height="24" fill="white" stroke="black" stroke-width="2.2" rx="4"/>
            <text x="${x}" y="${y + 141}" text-anchor="middle" class="texto-svg texto-movible" data-tipo="spec" style="font-weight: bold; font-size: 12px;">${circuito.seccion} mm²</text>
            <line x1="${x}" y1="${y + 149}" x2="${x}" y2="${y + 175}" class="linea"/>
            <circle cx="${x}" cy="${y + 210}" r="34" class="circulo-numero"/>
            <text x="${x}" y="${y + 195}" text-anchor="middle" class="emoji-circuito">${iconoCategoria}</text>
            <text x="${x}" y="${y + 223}" text-anchor="middle" class="texto-svg" style="font-size: 22px; font-weight: bold;">${numero}</text>
            <text x="${x}" y="${y + 258}" text-anchor="middle" class="texto-svg texto-movible" data-tipo="label" style="font-size: 11px; font-weight: bold;">${circuito.tipo}</text>
            ${circuito.cantidad > 1 ? `<text x="${x}" y="${y + 274}" text-anchor="middle" class="texto-svg texto-movible" data-tipo="label" style="fill: #c0392b; font-weight: bold; font-size: 11px;">(×${circuito.cantidad})</text>` : ''}
            <text x="${x}" y="${y + (circuito.cantidad > 1 ? 290 : 274)}" text-anchor="middle" class="texto-svg texto-movible" data-tipo="spec" style="font-size: 10px;">${circuito.potencia}W | ${circuito.corriente}A</text>
            <text x="${x}" y="${y + (circuito.cantidad > 1 ? 306 : 290)}" text-anchor="middle" class="texto-svg texto-movible" data-tipo="label" style="fill: ${circuito.nivel === 1 ? '#2980b9' : '#8e44ad'}; font-weight: bold; font-size: 10px;">${circuito.nivel === 1 ? 'NIVEL 1' : 'NIVEL 2'}</text>
        </g>
    `;
}

/**
 * Inicializar sistema de arrastre completo: contenedores Y textos individuales
 */
function inicializarArrastreCompleto() {
    const svg = document.getElementById('diagramaSVG');
    if (!svg) {
        console.error('❌ No se encontró el SVG');
        return;
    }
    
    let elementoDragging = null;
    let offsetX = 0;
    let offsetY = 0;
    let initialTransform = { x: 0, y: 0 };
    
    // ========== ARRASTRE DE CONTENEDORES COMPLETOS ==========
    const contenedores = svg.querySelectorAll('.contenedor-arrastrable');
    console.log(`📦 Inicializando ${contenedores.length} contenedores arrastrables...`);
    
    contenedores.forEach(contenedor => {
        contenedor.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            elementoDragging = contenedor;
            contenedor.classList.add('dragging');
            
            // Obtener transformación actual
            const transform = contenedor.getAttribute('transform');
            if (transform) {
                const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
                if (match) {
                    initialTransform.x = parseFloat(match[1]);
                    initialTransform.y = parseFloat(match[2]);
                }
            } else {
                initialTransform = { x: 0, y: 0 };
            }
            
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            
            offsetX = svgP.x - initialTransform.x;
            offsetY = svgP.y - initialTransform.y;
        });
    });
    
    // ========== ARRASTRE DE TEXTOS INDIVIDUALES ==========
    const textos = svg.querySelectorAll('.texto-movible');
    console.log(`📝 Inicializando ${textos.length} textos arrastrables...`);
    
    textos.forEach(texto => {
        texto.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            elementoDragging = texto;
            texto.classList.add('dragging');
            
            const x = parseFloat(texto.getAttribute('x') || 0);
            const y = parseFloat(texto.getAttribute('y') || 0);
            
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            
            offsetX = svgP.x - x;
            offsetY = svgP.y - y;
        });
    });
    
    // ========== EVENTOS GLOBALES DE MOVIMIENTO ==========
    svg.addEventListener('mousemove', function(e) {
        if (!elementoDragging) return;
        
        e.preventDefault();
        
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        
        const newX = svgP.x - offsetX;
        const newY = svgP.y - offsetY;
        
        if (elementoDragging.classList.contains('contenedor-arrastrable')) {
            // Mover contenedor completo
            elementoDragging.setAttribute('transform', `translate(${newX}, ${newY})`);
        } else {
            // Mover texto individual
            elementoDragging.setAttribute('x', newX);
            elementoDragging.setAttribute('y', newY);
        }
    });
    
    document.addEventListener('mouseup', function(e) {
        if (elementoDragging) {
            elementoDragging.classList.remove('dragging');
            elementoDragging = null;
        }
    });
    
    console.log(`✅ Sistema de arrastre completo inicializado: ${contenedores.length} contenedores + ${textos.length} textos`);
}

console.log('✅ Esquema Unifilar Dibujo FINAL inicializado (Contenedores Arrastrables + Textos Independientes)');