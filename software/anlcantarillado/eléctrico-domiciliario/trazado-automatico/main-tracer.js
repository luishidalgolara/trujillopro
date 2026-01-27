// ========================================
// CONTROLADOR PRINCIPAL - TRAZADO AUTOMÁTICO
// ========================================
// Orquesta todo el proceso de generación de trazado

const AutoTracer = {
    
    // Estado del trazado
    isGenerated: false,
    infrastructure: null,
    circuits: null,
    
    // Inicializar sistema
    initialize() {
        console.log('🚀 Inicializando sistema de trazado automático...');
        
        // Inicializar renderizador
        if (!LineRenderer.initialize()) {
            console.error('❌ Error al inicializar renderizador');
            return false;
        }
        
        console.log('✅ Sistema de trazado listo');
        return true;
    },
    
    // Generar trazado completo
    generate() {
        console.log('⚡ GENERANDO TRAZADO AUTOMÁTICO...');
        updateStatus('⚡ Generando trazado eléctrico inteligente...');
        
        // Limpiar trazado anterior si existe
        if (this.isGenerated) {
            this.clear();
        }
        
        // Obtener elementos del plano
        const elements = AppState.elements;
        
        if (elements.length === 0) {
            updateStatus('⚠️ No hay elementos en el plano');
            alert('⚠️ Primero coloca elementos eléctricos en el plano');
            return false;
        }
        
        console.log(`📊 Analizando ${elements.length} elementos...`);
        
        // PASO 1: Detectar infraestructura (Empalme → Medidor → Tablero)
        this.infrastructure = HierarchyDetector.detectInfrastructure(elements);
        
        if (!this.infrastructure.valid) {
            const errorMsg = this.infrastructure.errors.join('\n');
            updateStatus('❌ Infraestructura incompleta');
            alert('❌ INFRAESTRUCTURA INCOMPLETA:\n\n' + errorMsg + '\n\nDebes colocar:\n• Empalme\n• Medidor\n• Tablero');
            return false;
        }
        
        // Validar orden lógico
        const warnings = HierarchyDetector.validateLogicalOrder(this.infrastructure);
        
        // PASO 2: Dibujar línea de alimentación principal
        updateStatus('🔴 Trazando alimentación principal...');
        LineRenderer.drawMainFeed(this.infrastructure);
        
        // Esperar animación
        setTimeout(() => {
            // PASO 3: Agrupar elementos por circuito
            this.circuits = HierarchyDetector.groupByCircuit(elements, this.infrastructure.tablero);
            
            // PASO 4: Dibujar cada circuito
            this.drawAllCircuits();
            
            // PASO 5: Finalizar
            this.isGenerated = true;
            this.showSummary();
            
            updateStatus('✅ Trazado eléctrico generado correctamente');
            
        }, 1000);
        
        return true;
    },
    
    // Dibujar todos los circuitos
    drawAllCircuits() {
        const tablero = this.infrastructure.tablero;
        let delay = 0;
        
        // C1 - Iluminación
        if (this.circuits.C1.length > 0) {
            setTimeout(() => {
                updateStatus('🟠 Trazando C1 - Iluminación...');
                LineRenderer.drawCircuit(tablero, this.circuits.C1, 'C1');
            }, delay);
            delay += this.circuits.C1.length * 100 + 500;
        }
        
        // C2 - Enchufes
        if (this.circuits.C2.length > 0) {
            setTimeout(() => {
                updateStatus('🔵 Trazando C2 - Enchufes...');
                LineRenderer.drawCircuit(tablero, this.circuits.C2, 'C2');
            }, delay);
            delay += this.circuits.C2.length * 100 + 500;
        }
        
        // C5 - Especiales
        if (this.circuits.C5.length > 0) {
            setTimeout(() => {
                updateStatus('🟣 Trazando C5 - Especiales...');
                LineRenderer.drawCircuit(tablero, this.circuits.C5, 'C5');
            }, delay);
            delay += this.circuits.C5.length * 100 + 500;
        }
        
        // PE - Tierra
        if (this.circuits.PE.length > 0) {
            setTimeout(() => {
                updateStatus('🟢 Trazando PE - Tierra...');
                LineRenderer.drawCircuit(tablero, this.circuits.PE, 'PE');
            }, delay);
        }
    },
    
    // Limpiar trazado
    clear() {
        console.log('🧹 Limpiando trazado...');
        LineRenderer.clearAll();
        this.isGenerated = false;
        this.infrastructure = null;
        this.circuits = null;
        updateStatus('🧹 Trazado eliminado');
    },
    
    // Mostrar resumen del trazado generado
    showSummary() {
        const summary = this.generateSummary();
        console.log('📊 RESUMEN DEL TRAZADO:', summary);
        
        // Mostrar en consola con estilo
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        console.log('%c    TRAZADO ELÉCTRICO GENERADO    ', 'color: #2ecc71; font-weight: bold; font-size: 14px');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        console.log('');
        console.log('%c🔴 ALIMENTACIÓN PRINCIPAL', 'color: #e74c3c; font-weight: bold');
        console.log('   Empalme → Medidor → Tablero');
        console.log('   Calibre: 6mm² | Ducto: Ø25mm');
        console.log('');
        console.log('%c🟠 C1 - ILUMINACIÓN', 'color: #f39c12; font-weight: bold');
        console.log(`   ${summary.C1} elementos | 2.5mm² | Ø16mm`);
        console.log('');
        console.log('%c🔵 C2 - ENCHUFES', 'color: #3498db; font-weight: bold');
        console.log(`   ${summary.C2} elementos | 2.5mm² | Ø16mm`);
        console.log('');
        console.log('%c🟣 C5 - ESPECIALES', 'color: #9b59b6; font-weight: bold');
        console.log(`   ${summary.C5} elementos | 2.5mm² | Ø16mm`);
        console.log('');
        console.log('%c🟢 PE - TIERRA', 'color: #27ae60; font-weight: bold');
        console.log(`   ${summary.PE} elementos | 2.5mm²`);
        console.log('');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        console.log(`%c   TOTAL: ${summary.total} elementos conectados`, 'color: #2ecc71; font-weight: bold');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        
        // Opcional: Mostrar modal con resumen
        // this.showSummaryModal(summary);
    },
    
    // Generar objeto de resumen
    generateSummary() {
        return {
            C1: this.circuits.C1.length,
            C2: this.circuits.C2.length,
            C5: this.circuits.C5.length,
            PE: this.circuits.PE.length,
            total: this.circuits.C1.length + this.circuits.C2.length + 
                   this.circuits.C5.length + this.circuits.PE.length
        };
    },
    
    // Calcular carga total estimada
    calculateTotalLoad() {
        let totalWatts = 0;
        
        // C1 - Iluminación (100W por punto)
        totalWatts += this.circuits.C1.length * 100;
        
        // C2 - Enchufes (150W por enchufe)
        totalWatts += this.circuits.C2.length * 150;
        
        // C5 - Especiales (800W por equipo)
        totalWatts += this.circuits.C5.length * 800;
        
        const totalAmps = totalWatts / 220; // 220V
        
        return {
            watts: totalWatts,
            amps: totalAmps.toFixed(2)
        };
    },
    
    // Exportar datos del trazado
    exportData() {
        if (!this.isGenerated) {
            alert('⚠️ Primero genera el trazado');
            return null;
        }
        
        const data = {
            infrastructure: {
                empalme: { x: this.infrastructure.empalme.x, y: this.infrastructure.empalme.y },
                medidor: { x: this.infrastructure.medidor.x, y: this.infrastructure.medidor.y },
                tablero: { x: this.infrastructure.tablero.x, y: this.infrastructure.tablero.y }
            },
            circuits: this.circuits,
            summary: this.generateSummary(),
            load: this.calculateTotalLoad()
        };
        
        console.log('📤 Datos de trazado exportados:', data);
        return data;
    }
};

// Función global para botón
function generarTrazadoAutomatico() {
    console.log('🔘 Botón GENERAR TRAZADO presionado');
    
    // Inicializar si no está inicializado
    if (!AutoTracer.isGenerated && !LineRenderer.linesGroup) {
        AutoTracer.initialize();
    }
    
    // Generar o limpiar
    if (AutoTracer.isGenerated) {
        const confirmar = confirm('Ya existe un trazado generado.\n\n¿Deseas regenerarlo?');
        if (confirmar) {
            AutoTracer.generate();
        }
    } else {
        AutoTracer.generate();
    }
}

// Función global para limpiar trazado
function limpiarTrazado() {
    if (AutoTracer.isGenerated) {
        const confirmar = confirm('¿Deseas eliminar el trazado generado?');
        if (confirmar) {
            AutoTracer.clear();
        }
    } else {
        updateStatus('⚠️ No hay trazado para limpiar');
    }
}

console.log('✅ Controlador principal de trazado cargado');
