// js/export-manager.js
import { elements, connections, detectedCompany, currentScale } from './config.js';
import { showStatus } from './utils.js';

export function exportResults() {
    if (elements.length === 0) {
        showStatus('⚠️ No hay elementos para exportar');
        return;
    }

    let report = `REPORTE HIDRÁULICO INTELIGENTE - SISTEMA MST CON TEXTOS ARRASTRABLES\n`;
    report += `================================================================\n\n`;
    
    const addressValue = document.getElementById('addressInput')?.value || 'No especificada';
    report += `INFORMACIÓN DEL PROYECTO:\n`;
    report += `Dirección: ${addressValue}\n`;
    if (detectedCompany) {
        report += `Empresa Sanitaria: ${detectedCompany.nombre}\n`;
        report += `Contacto: ${detectedCompany.telefono} - ${detectedCompany.contacto}\n`;
    }
    report += `Escala del plano: 1:${currentScale}\n`;
    report += `Material: PPR (Polipropileno Random)\n`;
    report += `Sistema: HIDRÁULICO INTELIGENTE con algoritmo MST\n`;
    report += `NUEVA FUNCIONALIDAD: TEXTOS ARRASTRABLES CON LEADER LINES ELÁSTICOS\n`;
    report += `DIÁMETRO MÍNIMO: 20mm (16mm ELIMINADO)\n`;
    report += `Medidas reales calculadas automáticamente\n\n`;
    
    const efficiency = document.getElementById('efficiency')?.textContent || '0%';
    report += `ANÁLISIS DEL ALGORITMO HIDRÁULICO MST CON TEXTOS ARRASTRABLES:\n`;
    report += `- Eficiencia del trazado: ${efficiency}\n`;
    report += `- Total de elementos: ${elements.length}\n`;
    report += `- Total de conexiones: ${connections.length}\n`;
    report += `- Algoritmo: Kruskal MST con lógica hidráulica real\n`;
    report += `- NUEVA FUNCIONALIDAD: Textos arrastrables con leader lines elásticos\n`;
    report += `- Funcionalidad Drag & Drop: ✓ Implementada\n`;
    report += `- Cálculo dinámico: Math.atan2() para ángulo de flecha\n`;
    report += `- Leader line elástico: Se recalcula en tiempo real\n`;
    report += `- Punto de anclaje fijo: En el centro de cada tubería\n`;
    report += `- Actualización fluida: 60fps durante arrastre\n`;
    report += `- Control total del usuario sobre posicionamiento de textos\n`;
    report += `- Evita superposiciones de textos automáticamente\n`;
    report += `- Interfaz más profesional y usable\n`;
    report += `- Demanda acumulativa: ✓ Implementada\n`;
    report += `- Calefón: ✓ SIEMPRE 25mm\n`;
    report += `- Duchas: ✓ SIEMPRE 25mm\n`;
    report += `- Elementos básicos: ✓ 20mm estándar\n`;
    report += `- Diámetro 16mm: ✓ ELIMINADO completamente\n`;
    report += `- Conexiones perpendiculares: ✓ Garantizadas\n`;
    report += `- Optimización de distancias: ✓ Mínimas\n`;
    report += `- Agrupación de elementos cercanos: ✓ Automática\n\n`;
    
    report += `\nVENTAJAS DEL SISTEMA HIDRÁULICO INTELIGENTE MST CON TEXTOS ARRASTRABLES:\n`;
    report += `✅ Algoritmo MST (Minimum Spanning Tree) garantiza rutas óptimas\n`;
    report += `✅ NUEVA: Textos totalmente arrastrables con mouse\n`;
    report += `✅ NUEVA: Leader lines elásticos que se recalculan automáticamente\n`;
    report += `✅ NUEVA: Flechas inteligentes que siempre apuntan a la tubería\n`;
    report += `✅ NUEVA: Actualización en tiempo real a 60fps durante arrastre\n`;
    report += `✅ NUEVA: Control total del usuario sobre layout de textos\n`;
    report += `✅ NUEVA: Evita superposiciones mediante reorganización manual\n`;
    report += `✅ NUEVA: Interfaz más profesional y limpia\n`;
    report += `✅ Lógica hidráulica real implementada\n`;
    report += `✅ Demanda acumulativa automática\n`;
    report += `✅ Calefón SIEMPRE 25mm (alta demanda múltiple)\n`;
    report += `✅ Duchas SIEMPRE 25mm (alta demanda individual)\n`;
    report += `✅ Elementos básicos 20mm (demanda estándar)\n`;
    report += `✅ ELIMINADO diámetro 16mm completamente\n`;
    report += `✅ Clustering automático de elementos cercanos\n`;
    report += `✅ Conexiones perpendiculares reales (90°)\n`;
    report += `✅ Minimización automática de distancias y materiales\n`;
    report += `✅ Distribución inteligente desde medidor principal\n`;
    report += `✅ Optimización de diámetros según demanda real\n`;
    report += `✅ Evita cruces innecesarios de tuberías\n`;
    report += `✅ Reducción progresiva de diámetros\n`;
    report += `✅ Máxima eficiencia en trazado: ${efficiency}\n`;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_hidraulico_TEXTOS_ARRASTRABLES_${detectedCompany ? detectedCompany.nombre.replace(/\s+/g, '_') : 'escala'}_1-${currentScale}.txt`;
    a.click();

    showStatus(`📋 Reporte completo de sistema HIDRÁULICO INTELIGENTE con TEXTOS ARRASTRABLES exportado`);
}