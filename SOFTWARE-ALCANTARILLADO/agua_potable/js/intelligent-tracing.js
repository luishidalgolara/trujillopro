// js/intelligent-tracing.js - COMPLETO CORREGIDO CON ACTUALIZACIÓN AUTOMÁTICA DE VERIFICACIÓN
import { elements, connections, svg } from './config.js';
import { clearConnections } from './config.js';
import { showStatus } from './utils.js';
import { updateCalculations } from './calculations.js';
import { kruskalMST, clusterElementsByProximity, createPerpendicularPath, findClosestPipeConnection } from './mst-algorithm.js';
import { calculateOptimalDiameter } from './hydraulic-engine.js';
import { createTuberia } from './elements-manager.js';
import { calcularGastosAcumulados, dibujarGastosEnTrazado } from './gastos-acumulados.js';
import { generarTrazadoNivel2AP } from '../nivel_2_ap/nivel-2-tracing.js';

export function generateIntelligentTracing() {
    if (elements.length < 2) {
        showStatus('⚠️ Necesitas al menos 2 elementos para generar trazado inteligente');
        return;
    }

    document.querySelectorAll('.pipe-line:not(.nivel-2)').forEach(el => el.remove());
    document.querySelectorAll('text[data-connection]:not([data-nivel="2"])').forEach(el => el.remove());
    document.querySelectorAll('line[data-connection-divider]:not([data-nivel="2"])').forEach(el => el.remove());
    document.querySelectorAll('g.flow-arrow:not(.nivel-2)').forEach(el => el.remove());
    document.querySelectorAll('line[data-leader]:not([data-nivel="2"])').forEach(el => el.remove());
    document.querySelectorAll('polygon[data-leader]:not([data-nivel="2"])').forEach(el => el.remove());
    document.querySelectorAll('g[data-connection-group]:not([data-nivel="2"])').forEach(el => el.remove());
    document.querySelectorAll('.gasto-acumulado.nivel-1').forEach(el => el.remove());
    
    const conexionesNivel1 = connections.filter(conn => 
        (!conn.from.nivel || conn.from.nivel === 1) && (!conn.to.nivel || conn.to.nivel === 1)
    );
    connections.length = 0;
    connections.push(...conexionesNivel1.filter(conn => conn.from.nivel === 2 || conn.to.nivel === 2));

    const elementosNivel1 = elements.filter(el => !el.nivel || el.nivel === 1);

    console.log(`📊 Generando SOLO Nivel 1: ${elementosNivel1.length} elementos`);

    if (elementosNivel1.length >= 2) {
        console.log('🔵 Generando trazado NIVEL 1...');
        generarTrazadoPorNivel(elementosNivel1, 1);
        
        // ✅ CALCULAR Y DIBUJAR GASTOS ACUMULADOS NIVEL 1
        console.log('💧 Calculando gastos acumulados nivel 1...');
        const gastosNivel1 = calcularGastosAcumulados(connections, elementosNivel1);
        dibujarGastosEnTrazado(gastosNivel1, 1);
    }

    updateCalculations();
    console.log('🔍 Ejecutando verificación hidráulica automática...');
    setTimeout(() => {
        if (window.abrirVerificacion) {
            window.abrirVerificacion(14);
        }
    }, 500);
    
    const totalElementos = elementosNivel1.length;
    const totalConexiones = connections.filter(conn => 
        (!conn.from.nivel || conn.from.nivel === 1) && (!conn.to.nivel || conn.to.nivel === 1)
    ).length;
    const eficienciaTeoria = totalElementos > 1 ? ((totalElementos - 1) / totalConexiones * 100) : 0;
    const efficiency = Math.min(100, Math.max(0, eficienciaTeoria));
    
    const efficiencyElement = document.getElementById('efficiency');
    if (efficiencyElement) {
        efficiencyElement.textContent = `${efficiency.toFixed(1)}%`;
    }
    
    console.log('✅ Trazado nivel 1 completado con gastos acumulados');
    showStatus(`🧠 Trazado generado - Nivel 1: ${elementosNivel1.length} elementos - Eficiencia: ${efficiency.toFixed(1)}%`, 6000);
    
    // ✅ NUEVO: AUTO-ACTUALIZAR VERIFICACIÓN SI ESTÁ ABIERTA
    setTimeout(() => {
        if (document.getElementById('modalVerificacion')?.classList.contains('active')) {
            console.log('🔄 Actualizando verificación después del trazado...');
            if (window.abrirVerificacion) {
                window.abrirVerificacion(14);
            }
        }
    }, 1000);
}

export function generarTrazadoPorNivel(elementosNivel, nivel) {
    // ✅ SI ES NIVEL 2, USAR LA FUNCIÓN ESPECIALIZADA
    if (nivel === 2) {
        console.log('🔴 Detectado nivel 2, usando generarTrazadoNivel2AP()...');
        generarTrazadoNivel2AP(elementosNivel);
        return;
    }
    
    // RESTO DEL CÓDIGO PARA NIVEL 1
    let medidorPrincipal;
    
    if (nivel === 1) {
        medidorPrincipal = elementosNivel.find(el => el.type === 'medidor-agua');
        console.log('🔵 Buscando medidor nivel 1:', medidorPrincipal);
    }
    
    const elementosConsumo = elementosNivel.filter(el => 
        el.categoria === 'consumo' && el.type !== 'conexion-nivel-1'
    );
    const conexionesNivel1 = elementosNivel.filter(el => el.type === 'conexion-nivel-1');
    const fuentesCalor = elementosNivel.filter(el => ['calefon', 'termo-electrico', 'caldera'].includes(el.type));

    if (!medidorPrincipal) {
        const nombreFuente = 'Medidor de Agua';
        showStatus(`⚠️ Necesitas un ${nombreFuente} en nivel ${nivel}`);
        console.log(`❌ No se encontró fuente para nivel ${nivel}`);
        return;
    }

    console.log(`✅ Fuente encontrada para nivel ${nivel}:`, medidorPrincipal.type);

    if (fuentesCalor.length > 0) {
        console.log(`🔥 NIVEL ${nivel}: Conectando fuentes de calor...`);
        fuentesCalor.forEach(fuente => {
            const diameter = 25;
            console.log(`  → ${medidorPrincipal.type} → ${fuente.type} (⌀${diameter}mm)`);
            createPerpendicularPath(medidorPrincipal, fuente, 'fria', diameter, createTuberia, nivel);
        });
    }

    if (elementosConsumo.length > 0) {
        console.log(`❄️ NIVEL ${nivel}: Conectando ${elementosConsumo.length} elementos de consumo...`);
        
        const clusters = clusterElementsByProximity(elementosConsumo, 80);
        console.log(`📦 Creados ${clusters.length} clusters en nivel ${nivel}`);
        
        clusters.forEach((cluster, index) => {
            const puntosCluster = [medidorPrincipal, ...cluster];
            const mstCluster = kruskalMST(puntosCluster, medidorPrincipal);
            
            mstCluster.forEach(edge => {
                const diameter = calculateOptimalDiameter(edge.fromElement, edge.toElement, 'fria', elementosNivel, connections);
                console.log(`  → ${edge.fromElement.type} → ${edge.toElement.type} (⌀${diameter}mm)`);
                createPerpendicularPath(edge.fromElement, edge.toElement, 'fria', diameter, createTuberia, nivel);
            });
        });
    }

    if (conexionesNivel1.length > 0) {
        console.log(`🟢 NIVEL ${nivel}: Conectando ${conexionesNivel1.length} conexiones de derivación...`);
        
        conexionesNivel1.forEach(conexion => {
            const resultado = findClosestPipeConnection(conexion, connections);
            
            if (resultado.connection) {
                const diametroTuberia = resultado.connection.diameter;
                console.log(`  → Derivación desde tubería ⌀${diametroTuberia}mm → ${conexion.type}`);
                
                createPerpendicularPath(resultado.point, conexion, 'fria', diametroTuberia, createTuberia, nivel);
            } else {
                console.log(`  → No hay tuberías, conectando directo al medidor`);
                const diameter = 25;
                createPerpendicularPath(medidorPrincipal, conexion, 'fria', diameter, createTuberia, nivel);
            }
        });
    }
    
    console.log(`✅ Trazado nivel ${nivel} completado`);
}

export function tryCreateConnection(origen, destino) {
    const origenEsMedidor = origen.type === 'medidor-agua';
    const destinoEsMedidor = destino.type === 'medidor-agua';
    const origenEsFuenteCalor = ['calefon', 'termo-electrico', 'caldera'].includes(origen.type);
    const destinoEsFuenteCalor = ['calefon', 'termo-electrico', 'caldera'].includes(destino.type);
    const origenEsConsumo = origen.categoria === 'consumo';
    const destinoEsConsumo = destino.categoria === 'consumo';
    
    let puedeConectar = false;
    let mensaje = '';
    let tipoConexion = 'fria';
    
    if (origenEsMedidor && destinoEsFuenteCalor) {
        puedeConectar = true;
        tipoConexion = 'fria';
        mensaje = `🔗 Agua fría: Medidor → ${destino.type} (PUNTO FINAL)`;
    }
    else if (origenEsMedidor && destinoEsConsumo) {
        puedeConectar = true;
        tipoConexion = 'fria';
        mensaje = `🔗 Agua fría directa: Medidor → ${destino.type}`;
    }
    else if (origenEsFuenteCalor && destinoEsConsumo) {
        mensaje = `❌ ${origen.type} es punto final - No puede alimentar otros artefactos`;
    }
    else if (origenEsFuenteCalor && destinoEsFuenteCalor) {
        mensaje = `❌ ${origen.type} es punto final - No puede conectarse a otra fuente`;
    }
    else if (destinoEsMedidor) {
        mensaje = `❌ El medidor es fuente, no destino`;
    }
    else {
        mensaje = `❌ Conexión no válida: ${origen.type} → ${destino.type}`;
    }
    
    if (puedeConectar) {
        const conexionExiste = connections.some(conn => 
            (conn.from.id === origen.id && conn.to.id === destino.id) ||
            (conn.from.id === destino.id && conn.to.id === origen.id)
        );
        
        if (!conexionExiste) {
            const diameter = calculateOptimalDiameter(origen, destino, tipoConexion);
            createPerpendicularPath(origen, destino, tipoConexion, diameter, createTuberia);
            updateCalculations();
        } else {
            mensaje = '⚠️ Conexión ya existe';
        }
    }
    
    showStatus(mensaje);
    const { deselectElement } = require('./elements-manager.js');
    deselectElement();
}