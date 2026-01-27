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
    
    // ========================================
    // FUNCIÓN ORIGINAL - SIN MODIFICAR
    // ========================================
    // Generar trazado completo INTELIGENTE
    generate() {
        console.log('⚡ GENERANDO TRAZADO AUTOMÁTICO INTELIGENTE...');
        updateStatus('⚡ Generando trazado eléctrico inteligente por niveles...');
        
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
        
        // PASO 2: Detectar conectores entre niveles
        const levelConnectors = HierarchyDetector.detectLevelConnectors(elements);
        
        // Determinar si hay elementos en nivel 2
        const hasLevel2Elements = elements.some(el => 
            el.level === 2 && 
            el.type !== 'subida-nivel' &&
            getElementCategory(el.type) !== 'infraestructura'
        );
        
        // Validar conectores solo si hay elementos en nivel 2
        if (hasLevel2Elements) {
            if (!levelConnectors.valid && levelConnectors.warnings.length > 0) {
                const warningMsg = levelConnectors.warnings.join('\n');
                console.warn('⚠️ Advertencias de niveles:', warningMsg);
                if (!confirm('⚠️ ADVERTENCIA:\n\n' + warningMsg + '\n\n¿Deseas continuar de todos modos?')) {
                    updateStatus('❌ Generación cancelada');
                    return false;
                }
            }
        }
        
        // Validar orden lógico
        HierarchyDetector.validateLogicalOrder(this.infrastructure);
        
        // PASO 3: Dibujar línea de alimentación principal
        updateStatus('🔴 Trazando alimentación principal...');
        LineRenderer.drawMainFeed(this.infrastructure);
        
        // PASO 4: Trazado inteligente por niveles
        setTimeout(() => {
            const tablero = this.infrastructure.tablero;
            
            // NIVEL 1: Agrupar solo elementos de nivel 1
            console.log('📍 Procesando NIVEL 1...');
            this.circuitsLevel1 = HierarchyDetector.groupByCircuit(elements, tablero, 1);
            
            // Dibujar circuitos de nivel 1
            this.drawAllCircuits(this.circuitsLevel1, 'NIVEL 1');
            
            let delay = this.calculateCircuitDelay(this.circuitsLevel1);
            
            // Si hay punto de subida en nivel 1, conectar tablero → punto de subida
            if (levelConnectors.level1.length > 0) {
                setTimeout(() => {
                    console.log('⬆️ Conectando TABLERO → PUNTO DE SUBIDA (Nivel 1)');
                    updateStatus('🟣 Conectando alimentación hacia Nivel 2...');
                    
                    levelConnectors.level1.forEach(subitPoint => {
                        LineRenderer.drawSingleLine(tablero, subitPoint, '#9c27b0', 4, 'solid');
                    });
                    
                    console.log('✅ Conexión a punto de subida completada');
                }, delay);
                
                delay += 800;
            }
            
            // NIVEL 2: Si hay elementos en nivel 2
            if (hasLevel2Elements && levelConnectors.level2.length > 0) {
                setTimeout(() => {
                    console.log('📍 Procesando NIVEL 2...');
                    
                    // Agrupar solo elementos de nivel 2
                    this.circuitsLevel2 = HierarchyDetector.groupByCircuit(elements, tablero, 2);
                    
                    // Usar el primer punto de llegada como "tablero virtual" del nivel 2
                    const virtualTablero = levelConnectors.level2[0];
                    
                    // Dibujar circuitos desde el punto de llegada (nivel 2)
                    this.drawAllCircuitsFromPoint(this.circuitsLevel2, virtualTablero, 'NIVEL 2');
                    
                }, delay);
            }
            
            // PASO 5: Finalizar
            setTimeout(() => {
                this.isGenerated = true;
                this.showSummary();
                updateStatus('✅ Trazado eléctrico generado correctamente');
            }, delay + 3000);
            
        }, 1000);
        
        return true;
    },
    
    // ========================================
    // ✨ NUEVA FUNCIÓN - SOLO ILUMINACIÓN ✨
    // ========================================
    generateIluminacion() {
        console.log('💡 GENERANDO TRAZADO AUTOMÁTICO - SOLO ILUMINACIÓN...');
        updateStatus('💡 Generando trazado de iluminación por niveles...');
        
        // Obtener elementos del plano
        const elements = AppState.elements;
        
        if (elements.length === 0) {
            updateStatus('⚠️ No hay elementos en el plano');
            alert('⚠️ Primero coloca elementos eléctricos en el plano');
            return false;
        }
        
        console.log(`📊 Analizando ${elements.length} elementos...`);
        
        // PASO 1: Detectar infraestructura
        this.infrastructure = HierarchyDetector.detectInfrastructure(elements);
        
        if (!this.infrastructure.valid) {
            const errorMsg = this.infrastructure.errors.join('\n');
            updateStatus('❌ Infraestructura incompleta');
            alert('❌ INFRAESTRUCTURA INCOMPLETA:\n\n' + errorMsg + '\n\nDebes colocar:\n• Empalme\n• Medidor\n• Tablero');
            return false;
        }
        
        // PASO 2: Detectar conectores entre niveles
        const levelConnectors = HierarchyDetector.detectLevelConnectors(elements);
        
        // Determinar si hay elementos de iluminación en nivel 2
        const hasLevel2Iluminacion = elements.some(el => {
            const category = getElementCategory(el.type);
            return el.level === 2 && 
                   (category === 'iluminacion' || category === 'interruptores');
        });
        
        // PASO 3: Dibujar línea de alimentación principal
        updateStatus('🔴 Trazando alimentación principal...');
        LineRenderer.drawMainFeed(this.infrastructure);
        
        // PASO 4: Trazado de iluminación por niveles
        setTimeout(() => {
            const tablero = this.infrastructure.tablero;
            
            // NIVEL 1: Solo iluminación
            console.log('💡 Procesando ILUMINACIÓN - NIVEL 1...');
            this.circuitsLevel1Iluminacion = HierarchyDetector.groupByCircuitIluminacion(elements, tablero, 1);
            
            // Dibujar solo circuito C1
            this.drawCircuitsIluminacion(this.circuitsLevel1Iluminacion, 'NIVEL 1');
            
            let delay = this.calculateCircuitDelay(this.circuitsLevel1Iluminacion);
            
            // Si hay punto de subida y hay iluminación en nivel 2
            if (levelConnectors.level1.length > 0 && hasLevel2Iluminacion) {
                setTimeout(() => {
                    console.log('⬆️ Conectando TABLERO → PUNTO DE SUBIDA (Nivel 1)');
                    updateStatus('🟣 Conectando alimentación hacia Nivel 2...');
                    
                    levelConnectors.level1.forEach(subitPoint => {
                        LineRenderer.drawSingleLine(tablero, subitPoint, '#9c27b0', 4, 'solid');
                    });
                    
                    console.log('✅ Conexión a punto de subida completada');
                }, delay);
                
                delay += 800;
            }
            
            // NIVEL 2: Si hay iluminación en nivel 2
            if (hasLevel2Iluminacion && levelConnectors.level2.length > 0) {
                setTimeout(() => {
                    console.log('💡 Procesando ILUMINACIÓN - NIVEL 2...');
                    
                    this.circuitsLevel2Iluminacion = HierarchyDetector.groupByCircuitIluminacion(elements, tablero, 2);
                    
                    const virtualTablero = levelConnectors.level2[0];
                    
                    this.drawCircuitsIluminacionFromPoint(this.circuitsLevel2Iluminacion, virtualTablero, 'NIVEL 2');
                    
                }, delay);
            }
            
            // PASO 5: Finalizar
            setTimeout(() => {
                this.isGenerated = true;
                this.showSummaryIluminacion();
                updateStatus('✅ Trazado de iluminación generado correctamente');
            }, delay + 2000);
            
        }, 1000);
        
        return true;
    },
    
    // ========================================
    // ✨ NUEVA FUNCIÓN - SOLO ENCHUFES ✨
    // ========================================
    generateEnchufes() {
        console.log('🔌 GENERANDO TRAZADO AUTOMÁTICO - SOLO ENCHUFES...');
        updateStatus('🔌 Generando trazado de enchufes y electrodomésticos por niveles...');
        
        // Obtener elementos del plano
        const elements = AppState.elements;
        
        if (elements.length === 0) {
            updateStatus('⚠️ No hay elementos en el plano');
            alert('⚠️ Primero coloca elementos eléctricos en el plano');
            return false;
        }
        
        console.log(`📊 Analizando ${elements.length} elementos...`);
        
        // PASO 1: Detectar infraestructura
        this.infrastructure = HierarchyDetector.detectInfrastructure(elements);
        
        if (!this.infrastructure.valid) {
            const errorMsg = this.infrastructure.errors.join('\n');
            updateStatus('❌ Infraestructura incompleta');
            alert('❌ INFRAESTRUCTURA INCOMPLETA:\n\n' + errorMsg + '\n\nDebes colocar:\n• Empalme\n• Medidor\n• Tablero');
            return false;
        }
        
        // PASO 2: Detectar conectores entre niveles
        const levelConnectors = HierarchyDetector.detectLevelConnectors(elements);
        
        // Determinar si hay enchufes/electrodomésticos en nivel 2
        const hasLevel2Enchufes = elements.some(el => {
            const category = getElementCategory(el.type);
            return el.level === 2 && 
                   (category === 'enchufes' || category === 'electrodomesticos');
        });
        
        // PASO 3: Dibujar línea de alimentación principal
        updateStatus('🔴 Trazando alimentación principal...');
        LineRenderer.drawMainFeed(this.infrastructure);
        
        // PASO 4: Trazado de enchufes por niveles
        setTimeout(() => {
            const tablero = this.infrastructure.tablero;
            
            // NIVEL 1: Solo enchufes
            console.log('🔌 Procesando ENCHUFES - NIVEL 1...');
            this.circuitsLevel1Enchufes = HierarchyDetector.groupByCircuitEnchufes(elements, tablero, 1);
            
            // Dibujar circuitos C2-C8
            this.drawCircuitsEnchufes(this.circuitsLevel1Enchufes, 'NIVEL 1');
            
            let delay = this.calculateCircuitDelay(this.circuitsLevel1Enchufes);
            
            // Si hay punto de subida y hay enchufes en nivel 2
            if (levelConnectors.level1.length > 0 && hasLevel2Enchufes) {
                setTimeout(() => {
                    console.log('⬆️ Conectando TABLERO → PUNTO DE SUBIDA (Nivel 1)');
                    updateStatus('🟣 Conectando alimentación hacia Nivel 2...');
                    
                    levelConnectors.level1.forEach(subitPoint => {
                        LineRenderer.drawSingleLine(tablero, subitPoint, '#9c27b0', 4, 'solid');
                    });
                    
                    console.log('✅ Conexión a punto de subida completada');
                }, delay);
                
                delay += 800;
            }
            
            // NIVEL 2: Si hay enchufes en nivel 2
            if (hasLevel2Enchufes && levelConnectors.level2.length > 0) {
                setTimeout(() => {
                    console.log('🔌 Procesando ENCHUFES - NIVEL 2...');
                    
                    this.circuitsLevel2Enchufes = HierarchyDetector.groupByCircuitEnchufes(elements, tablero, 2);
                    
                    const virtualTablero = levelConnectors.level2[0];
                    
                    this.drawCircuitsEnchufesFromPoint(this.circuitsLevel2Enchufes, virtualTablero, 'NIVEL 2');
                    
                }, delay);
            }
            
            // PASO 5: Finalizar
            setTimeout(() => {
                this.isGenerated = true;
                this.showSummaryEnchufes();
                updateStatus('✅ Trazado de enchufes generado correctamente');
            }, delay + 2000);
            
        }, 1000);
        
        return true;
    },
    
    // ========================================
    // FUNCIONES AUXILIARES - DIBUJO
    // ========================================
    
    // Dibujar todos los circuitos de un nivel (ORIGINAL)
    drawAllCircuits(circuits, levelName = '') {
        const tablero = this.infrastructure.tablero;
        let delay = 0;
        
        const circuitosConfig = [
            { id: 'C1', nombre: 'C1 - Iluminación', emoji: '🟠' },
            { id: 'C2', nombre: 'C2 - Enchufes', emoji: '🔵' },
            { id: 'C3', nombre: 'C3 - Cocina', emoji: '🟣' },
            { id: 'C4', nombre: 'C4 - Lavadora', emoji: '🟢' },
            { id: 'C5', nombre: 'C5 - Especiales', emoji: '🔴' },
            { id: 'C6', nombre: 'C6 - Secadora', emoji: '🟠' },
            { id: 'C7', nombre: 'C7 - Horno', emoji: '🔴' },
            { id: 'C8', nombre: 'C8 - Calefón', emoji: '🟠' },
            { id: 'PE', nombre: 'PE - Tierra', emoji: '🟢' }
        ];
        
        circuitosConfig.forEach(config => {
            if (circuits[config.id] && circuits[config.id].length > 0) {
                setTimeout(() => {
                    const msg = levelName ? `${config.emoji} ${levelName} - ${config.nombre}...` : `${config.emoji} Trazando ${config.nombre}...`;
                    updateStatus(msg);
                    LineRenderer.drawCircuit(tablero, circuits[config.id], config.id);
                }, delay);
                delay += circuits[config.id].length * 100 + 500;
            }
        });
        
        return delay;
    },
    
    // Dibujar solo circuito de iluminación (C1)
    drawCircuitsIluminacion(circuits, levelName = '') {
        const tablero = this.infrastructure.tablero;
        let delay = 0;
        
        if (circuits.C1 && circuits.C1.length > 0) {
            setTimeout(() => {
                const msg = `💡 ${levelName} - C1 - Iluminación...`;
                updateStatus(msg);
                LineRenderer.drawCircuit(tablero, circuits.C1, 'C1');
            }, delay);
            delay += circuits.C1.length * 100 + 500;
        }
        
        return delay;
    },
    
    // Dibujar circuitos de enchufes (C2-C8)
    drawCircuitsEnchufes(circuits, levelName = '') {
        const tablero = this.infrastructure.tablero;
        let delay = 0;
        
        const circuitosConfig = [
            { id: 'C2', nombre: 'C2 - Enchufes', emoji: '🔵' },
            { id: 'C3', nombre: 'C3 - Cocina', emoji: '🟣' },
            { id: 'C4', nombre: 'C4 - Lavadora', emoji: '🟢' },
            { id: 'C5', nombre: 'C5 - Especiales', emoji: '🔴' },
            { id: 'C6', nombre: 'C6 - Secadora', emoji: '🟠' },
            { id: 'C7', nombre: 'C7 - Horno', emoji: '🔴' },
            { id: 'C8', nombre: 'C8 - Calefón', emoji: '🟠' }
        ];
        
        circuitosConfig.forEach(config => {
            if (circuits[config.id] && circuits[config.id].length > 0) {
                setTimeout(() => {
                    const msg = `${config.emoji} ${levelName} - ${config.nombre}...`;
                    updateStatus(msg);
                    LineRenderer.drawCircuit(tablero, circuits[config.id], config.id);
                }, delay);
                delay += circuits[config.id].length * 100 + 500;
            }
        });
        
        return delay;
    },
    
    // Dibujar circuitos desde un punto específico (ORIGINAL - para nivel 2)
    drawAllCircuitsFromPoint(circuits, sourcePoint, levelName = '') {
        let delay = 0;
        
        const circuitosConfig = [
            { id: 'C1', nombre: 'C1 - Iluminación', emoji: '🟠' },
            { id: 'C2', nombre: 'C2 - Enchufes', emoji: '🔵' },
            { id: 'C3', nombre: 'C3 - Cocina', emoji: '🟣' },
            { id: 'C4', nombre: 'C4 - Lavadora', emoji: '🟢' },
            { id: 'C5', nombre: 'C5 - Especiales', emoji: '🔴' },
            { id: 'C6', nombre: 'C6 - Secadora', emoji: '🟠' },
            { id: 'C7', nombre: 'C7 - Horno', emoji: '🔴' },
            { id: 'C8', nombre: 'C8 - Calefón', emoji: '🟠' },
            { id: 'PE', nombre: 'PE - Tierra', emoji: '🟢' }
        ];
        
        circuitosConfig.forEach(config => {
            if (circuits[config.id] && circuits[config.id].length > 0) {
                setTimeout(() => {
                    const msg = `${config.emoji} ${levelName} - ${config.nombre}...`;
                    updateStatus(msg);
                    LineRenderer.drawCircuit(sourcePoint, circuits[config.id], config.id);
                }, delay);
                delay += circuits[config.id].length * 100 + 500;
            }
        });
        
        return delay;
    },
    
    // Dibujar solo iluminación desde punto (nivel 2)
    drawCircuitsIluminacionFromPoint(circuits, sourcePoint, levelName = '') {
        let delay = 0;
        
        if (circuits.C1 && circuits.C1.length > 0) {
            setTimeout(() => {
                const msg = `💡 ${levelName} - C1 - Iluminación...`;
                updateStatus(msg);
                LineRenderer.drawCircuit(sourcePoint, circuits.C1, 'C1');
            }, delay);
            delay += circuits.C1.length * 100 + 500;
        }
        
        return delay;
    },
    
    // Dibujar solo enchufes desde punto (nivel 2)
    drawCircuitsEnchufesFromPoint(circuits, sourcePoint, levelName = '') {
        let delay = 0;
        
        const circuitosConfig = [
            { id: 'C2', nombre: 'C2 - Enchufes', emoji: '🔵' },
            { id: 'C3', nombre: 'C3 - Cocina', emoji: '🟣' },
            { id: 'C4', nombre: 'C4 - Lavadora', emoji: '🟢' },
            { id: 'C5', nombre: 'C5 - Especiales', emoji: '🔴' },
            { id: 'C6', nombre: 'C6 - Secadora', emoji: '🟠' },
            { id: 'C7', nombre: 'C7 - Horno', emoji: '🔴' },
            { id: 'C8', nombre: 'C8 - Calefón', emoji: '🟠' }
        ];
        
        circuitosConfig.forEach(config => {
            if (circuits[config.id] && circuits[config.id].length > 0) {
                setTimeout(() => {
                    const msg = `${config.emoji} ${levelName} - ${config.nombre}...`;
                    updateStatus(msg);
                    LineRenderer.drawCircuit(sourcePoint, circuits[config.id], config.id);
                }, delay);
                delay += circuits[config.id].length * 100 + 500;
            }
        });
        
        return delay;
    },
    
    // Calcular delay total de circuitos
    calculateCircuitDelay(circuits) {
        let total = 0;
        Object.keys(circuits).forEach(key => {
            if (circuits[key] && circuits[key].length > 0) {
                total += circuits[key].length * 100 + 500;
            }
        });
        return total;
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
    
    // ========================================
    // RESÚMENES
    // ========================================
    
    // Mostrar resumen del trazado generado (ORIGINAL)
    showSummary() {
        const summary = this.generateSummary();
        console.log('📊 RESUMEN DEL TRAZADO:', summary);
        
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        console.log('%c    TRAZADO ELÉCTRICO GENERADO    ', 'color: #2ecc71; font-weight: bold; font-size: 14px');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        console.log('');
        console.log('%c🔴 ALIMENTACIÓN PRINCIPAL', 'color: #e74c3c; font-weight: bold');
        console.log('   Empalme → Medidor → Tablero');
        console.log('   Calibre: 6mm² | Ducto: Ø25mm');
        console.log('');
        
        const hasLevel1 = summary.level1.C1 + summary.level1.C2 + summary.level1.C3 + summary.level1.C4 + 
                         summary.level1.C5 + summary.level1.C6 + summary.level1.C7 + summary.level1.C8 + 
                         summary.level1.PE > 0;
        
        if (hasLevel1) {
            console.log('%c🏠 NIVEL 1 - PLANTA BAJA', 'color: #3498db; font-weight: bold; font-size: 12px');
            if (summary.level1.C1 > 0) console.log(`   🟠 C1 - Iluminación: ${summary.level1.C1} elementos`);
            if (summary.level1.C2 > 0) console.log(`   🔵 C2 - Enchufes: ${summary.level1.C2} elementos`);
            if (summary.level1.C3 > 0) console.log(`   🟣 C3 - Cocina: ${summary.level1.C3} elementos`);
            if (summary.level1.C4 > 0) console.log(`   🟢 C4 - Lavadora: ${summary.level1.C4} elementos`);
            if (summary.level1.C5 > 0) console.log(`   🔴 C5 - Especiales: ${summary.level1.C5} elementos`);
            if (summary.level1.C6 > 0) console.log(`   🟠 C6 - Secadora: ${summary.level1.C6} elementos`);
            if (summary.level1.C7 > 0) console.log(`   🔴 C7 - Horno: ${summary.level1.C7} elementos`);
            if (summary.level1.C8 > 0) console.log(`   🟠 C8 - Calefón: ${summary.level1.C8} elementos`);
            if (summary.level1.PE > 0) console.log(`   🟢 PE - Tierra: ${summary.level1.PE} elementos`);
            console.log('');
        }
        
        const hasLevel2 = summary.level2.C1 + summary.level2.C2 + summary.level2.C3 + summary.level2.C4 + 
                         summary.level2.C5 + summary.level2.C6 + summary.level2.C7 + summary.level2.C8 + 
                         summary.level2.PE > 0;
        
        if (hasLevel2) {
            console.log('%c🏠 NIVEL 2 - PLANTA ALTA', 'color: #9b59b6; font-weight: bold; font-size: 12px');
            if (summary.level2.C1 > 0) console.log(`   🟠 C1 - Iluminación: ${summary.level2.C1} elementos`);
            if (summary.level2.C2 > 0) console.log(`   🔵 C2 - Enchufes: ${summary.level2.C2} elementos`);
            if (summary.level2.C3 > 0) console.log(`   🟣 C3 - Cocina: ${summary.level2.C3} elementos`);
            if (summary.level2.C4 > 0) console.log(`   🟢 C4 - Lavadora: ${summary.level2.C4} elementos`);
            if (summary.level2.C5 > 0) console.log(`   🔴 C5 - Especiales: ${summary.level2.C5} elementos`);
            if (summary.level2.C6 > 0) console.log(`   🟠 C6 - Secadora: ${summary.level2.C6} elementos`);
            if (summary.level2.C7 > 0) console.log(`   🔴 C7 - Horno: ${summary.level2.C7} elementos`);
            if (summary.level2.C8 > 0) console.log(`   🟠 C8 - Calefón: ${summary.level2.C8} elementos`);
            if (summary.level2.PE > 0) console.log(`   🟢 PE - Tierra: ${summary.level2.PE} elementos`);
            console.log('');
        }
        
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        console.log(`%c   TOTAL: ${summary.total} elementos conectados`, 'color: #2ecc71; font-weight: bold');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
    },
    
    // Resumen solo iluminación
    showSummaryIluminacion() {
        const level1 = this.circuitsLevel1Iluminacion || {};
        const level2 = this.circuitsLevel2Iluminacion || {};
        
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #f39c12; font-weight: bold');
        console.log('%c  TRAZADO DE ILUMINACIÓN GENERADO  ', 'color: #f1c40f; font-weight: bold; font-size: 14px');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #f39c12; font-weight: bold');
        console.log('');
        console.log('%c🔴 ALIMENTACIÓN PRINCIPAL', 'color: #e74c3c; font-weight: bold');
        console.log('   Empalme → Medidor → Tablero');
        console.log('');
        
        if (level1.C1 && level1.C1.length > 0) {
            console.log('%c🏠 NIVEL 1 - PLANTA BAJA', 'color: #3498db; font-weight: bold');
            console.log(`   💡 C1 - Iluminación: ${level1.C1.length} elementos`);
            console.log('');
        }
        
        if (level2.C1 && level2.C1.length > 0) {
            console.log('%c🏠 NIVEL 2 - PLANTA ALTA', 'color: #9b59b6; font-weight: bold');
            console.log(`   💡 C1 - Iluminación: ${level2.C1.length} elementos`);
            console.log('');
        }
        
        const total = (level1.C1?.length || 0) + (level2.C1?.length || 0);
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #f39c12; font-weight: bold');
        console.log(`%c   TOTAL ILUMINACIÓN: ${total} elementos`, 'color: #f1c40f; font-weight: bold');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #f39c12; font-weight: bold');
    },
    
    // Resumen solo enchufes
    showSummaryEnchufes() {
        const level1 = this.circuitsLevel1Enchufes || {};
        const level2 = this.circuitsLevel2Enchufes || {};
        
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        console.log('%c  TRAZADO DE ENCHUFES GENERADO  ', 'color: #3498db; font-weight: bold; font-size: 14px');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        console.log('');
        console.log('%c🔴 ALIMENTACIÓN PRINCIPAL', 'color: #e74c3c; font-weight: bold');
        console.log('   Empalme → Medidor → Tablero');
        console.log('');
        
        if (level1.C2 || level1.C3 || level1.C4 || level1.C5 || level1.C6 || level1.C7 || level1.C8) {
            console.log('%c🏠 NIVEL 1 - PLANTA BAJA', 'color: #3498db; font-weight: bold');
            if (level1.C2?.length > 0) console.log(`   🔵 C2 - Enchufes: ${level1.C2.length} elementos`);
            if (level1.C3?.length > 0) console.log(`   🟣 C3 - Cocina: ${level1.C3.length} elementos`);
            if (level1.C4?.length > 0) console.log(`   🟢 C4 - Lavadora: ${level1.C4.length} elementos`);
            if (level1.C5?.length > 0) console.log(`   🔴 C5 - Especiales: ${level1.C5.length} elementos`);
            if (level1.C6?.length > 0) console.log(`   🟠 C6 - Secadora: ${level1.C6.length} elementos`);
            if (level1.C7?.length > 0) console.log(`   🔴 C7 - Horno: ${level1.C7.length} elementos`);
            if (level1.C8?.length > 0) console.log(`   🟠 C8 - Calefón: ${level1.C8.length} elementos`);
            console.log('');
        }
        
        if (level2.C2 || level2.C3 || level2.C4 || level2.C5 || level2.C6 || level2.C7 || level2.C8) {
            console.log('%c🏠 NIVEL 2 - PLANTA ALTA', 'color: #9b59b6; font-weight: bold');
            if (level2.C2?.length > 0) console.log(`   🔵 C2 - Enchufes: ${level2.C2.length} elementos`);
            if (level2.C3?.length > 0) console.log(`   🟣 C3 - Cocina: ${level2.C3.length} elementos`);
            if (level2.C4?.length > 0) console.log(`   🟢 C4 - Lavadora: ${level2.C4.length} elementos`);
            if (level2.C5?.length > 0) console.log(`   🔴 C5 - Especiales: ${level2.C5.length} elementos`);
            if (level2.C6?.length > 0) console.log(`   🟠 C6 - Secadora: ${level2.C6.length} elementos`);
            if (level2.C7?.length > 0) console.log(`   🔴 C7 - Horno: ${level2.C7.length} elementos`);
            if (level2.C8?.length > 0) console.log(`   🟠 C8 - Calefón: ${level2.C8.length} elementos`);
            console.log('');
        }
        
        const total = (level1.C2?.length || 0) + (level1.C3?.length || 0) + (level1.C4?.length || 0) + 
                     (level1.C5?.length || 0) + (level1.C6?.length || 0) + (level1.C7?.length || 0) + 
                     (level1.C8?.length || 0) + (level2.C2?.length || 0) + (level2.C3?.length || 0) + 
                     (level2.C4?.length || 0) + (level2.C5?.length || 0) + (level2.C6?.length || 0) + 
                     (level2.C7?.length || 0) + (level2.C8?.length || 0);
        
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
        console.log(`%c   TOTAL ENCHUFES: ${total} elementos`, 'color: #3498db; font-weight: bold');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3498db; font-weight: bold');
    },
    
    // Generar objeto de resumen (ORIGINAL)
    generateSummary() {
        const level1 = this.circuitsLevel1 || {};
        const level2 = this.circuitsLevel2 || {};
        
        return {
            level1: {
                C1: level1.C1?.length || 0,
                C2: level1.C2?.length || 0,
                C3: level1.C3?.length || 0,
                C4: level1.C4?.length || 0,
                C5: level1.C5?.length || 0,
                C6: level1.C6?.length || 0,
                C7: level1.C7?.length || 0,
                C8: level1.C8?.length || 0,
                PE: level1.PE?.length || 0
            },
            level2: {
                C1: level2.C1?.length || 0,
                C2: level2.C2?.length || 0,
                C3: level2.C3?.length || 0,
                C4: level2.C4?.length || 0,
                C5: level2.C5?.length || 0,
                C6: level2.C6?.length || 0,
                C7: level2.C7?.length || 0,
                C8: level2.C8?.length || 0,
                PE: level2.PE?.length || 0
            },
            total: (level1.C1?.length || 0) + (level1.C2?.length || 0) + 
                   (level1.C3?.length || 0) + (level1.C4?.length || 0) + 
                   (level1.C5?.length || 0) + (level1.C6?.length || 0) +
                   (level1.C7?.length || 0) + (level1.C8?.length || 0) +
                   (level1.PE?.length || 0) +
                   (level2.C1?.length || 0) + (level2.C2?.length || 0) + 
                   (level2.C3?.length || 0) + (level2.C4?.length || 0) + 
                   (level2.C5?.length || 0) + (level2.C6?.length || 0) +
                   (level2.C7?.length || 0) + (level2.C8?.length || 0) +
                   (level2.PE?.length || 0)
        };
    },
    
    // Calcular carga total estimada (ORIGINAL)
    calculateTotalLoad() {
        let totalWatts = 0;
        
        totalWatts += this.circuits.C1.length * 100;
        totalWatts += this.circuits.C2.length * 200;
        totalWatts += this.circuits.C3.length * 5000;
        totalWatts += this.circuits.C4.length * 2200;
        totalWatts += this.circuits.C5.length * 800;
        totalWatts += this.circuits.C6.length * 2400;
        totalWatts += this.circuits.C7.length * 3500;
        totalWatts += this.circuits.C8.length * 4500;
        
        const totalAmps = totalWatts / 220;
        
        return {
            watts: totalWatts,
            amps: totalAmps.toFixed(2)
        };
    },
    
    // Exportar datos del trazado (ORIGINAL)
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

// ========================================
// FUNCIONES GLOBALES PARA BOTONES
// ========================================

// Función global para botón ORIGINAL (mantener compatibilidad)
function generarTrazadoAutomatico() {
    console.log('🔘 Botón GENERAR TRAZADO presionado');
    
    if (!AutoTracer.isGenerated && !LineRenderer.linesGroup) {
        AutoTracer.initialize();
    }
    
    if (AutoTracer.isGenerated) {
        const confirmar = confirm('Ya existe un trazado generado.\n\n¿Deseas regenerarlo?');
        if (confirmar) {
            AutoTracer.generate();
        }
    } else {
        AutoTracer.generate();
    }
}

// ✨ NUEVA FUNCIÓN - Generar solo iluminación
function generarTrazadoIluminacion() {
    console.log('💡 Botón GENERAR TRAZADO ILUMINACIÓN presionado');
    
    if (!LineRenderer.linesGroup) {
        AutoTracer.initialize();
    }
    
    if (AutoTracer.isGenerated) {
        const confirmar = confirm('Ya existe un trazado generado.\n\n¿Deseas regenerarlo solo con ILUMINACIÓN?');
        if (confirmar) {
            AutoTracer.clear();
            setTimeout(() => AutoTracer.generateIluminacion(), 300);
        }
    } else {
        AutoTracer.generateIluminacion();
    }
}

// ✨ NUEVA FUNCIÓN - Generar solo enchufes
function generarTrazadoEnchufes() {
    console.log('🔌 Botón GENERAR TRAZADO ENCHUFES presionado');
    
    if (!LineRenderer.linesGroup) {
        AutoTracer.initialize();
    }
    
    if (AutoTracer.isGenerated) {
        const confirmar = confirm('Ya existe un trazado generado.\n\n¿Deseas regenerarlo solo con ENCHUFES?');
        if (confirmar) {
            AutoTracer.clear();
            setTimeout(() => AutoTracer.generateEnchufes(), 300);
        }
    } else {
        AutoTracer.generateEnchufes();
    }
}

// Función global para limpiar trazado (ORIGINAL - sin modificar)
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