// trazado-inteligente/ridaa-main.js

function generateIntelligentHierarchicalTracing() {
    const currentPlan = plans[currentPlanIndex];
    
    if (currentPlan.tracingElements.length < 2) {
        showStatus('⚠️ Necesitas al menos 2 elementos para generar trazado jerárquico');
        return;
    }
    
    console.log('🎯 Iniciando trazado jerárquico PROFESIONAL RIDAA...');
    clearTracingConnections();
    currentPlan.tracingConnections = [];
    
    const elementos = clasificarElementosRIDAA(currentPlan.tracingElements);
    
    if (!elementos.colectorPublico) {
        showStatus('⚠️ Necesitas una Cámara Pública como colector final');
        return;
    }
    
    ejecutarSecuenciaJerarquica(elementos, currentPlan);
    
    showStatus(`⚡ Trazado PROFESIONAL generado - ${currentPlan.tracingConnections.length} conexiones`);
}

function ejecutarSecuenciaJerarquica(elementos, currentPlan) {
    console.log('🔗 Ejecutando secuencia jerárquica PROFESIONAL...');
    
    conectarColectoresPrincipalesConVentilacion(
        elementos.colectoresPrincipales, 
        elementos.camarasDomiciliarias, 
        elementos.colectorPublico, 
        currentPlan
    );
    
    conectarDerivacionesSecundarias(
        elementos.derivacionesSecundarias, 
        elementos.colectoresPrincipales, 
        elementos.camarasDomiciliarias, 
        elementos.colectorPublico, 
        currentPlan
    );
    
    conectarPuntosDescargaNivel1(
        elementos.puntosDescargaNivel1,
        elementos.camarasDomiciliarias,
        elementos.colectorPublico,
        currentPlan
    );
    
    conectarRedCamarasDomiciliarias(
        elementos.camarasDomiciliarias, 
        elementos.colectorPublico, 
        currentPlan
    );
    
    conectarElementosEspeciales(
        elementos.otrosElementos, 
        elementos.colectorPublico, 
        currentPlan
    );
    
    console.log('✅ Secuencia jerárquica PROFESIONAL completada');
}

function activateIntelligentTracing() {
    console.log('🚀 Activando sistema inteligente de trazado jerárquico PROFESIONAL...');
    
    if (typeof plans === 'undefined' || typeof currentPlanIndex === 'undefined') {
        console.error('❌ Sistema principal no encontrado. Asegúrate de cargar este archivo después de config.js');
        showStatus('❌ Error: Sistema principal no disponible');
        return false;
    }
    
    const currentPlan = plans[currentPlanIndex];
    if (!currentPlan || !currentPlan.tracingElements) {
        console.error('❌ Plan actual no válido o sin elementos de trazado');
        showStatus('❌ Error: Plan no válido');
        return false;
    }
    
    generateIntelligentHierarchicalTracing();
    return true;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateIntelligentHierarchicalTracing,
        activateIntelligentTracing,
        RIDAA_CONFIG
    };
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('📋 Sistema jerárquico PROFESIONAL RIDAA cargado y listo');
        setTimeout(() => {
            if (typeof showStatus === 'function') {
                showStatus('🎯 Sistema PROFESIONAL RIDAA disponible', 2000);
            }
        }, 1000);
    });
}

console.log('🎯 intelligent-tracing.js PROFESIONAL cargado - Sistema jerárquico RIDAA disponible');