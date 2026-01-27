// ========================================
// DETECTOR DE JERARQUÍA ELÉCTRICA
// ========================================
// Detecta y valida: Empalme → Medidor → Tablero

const HierarchyDetector = {
    
    // ✅ MODIFICADO - Detectar elementos de infraestructura CON FILTRO DE TIPO
    detectInfrastructure(elements, tableroTipoFiltro = null) {
        const infrastructure = {
            empalme: null,
            medidor: null,
            tablero: null,
            valid: false,
            errors: []
        };
        
        // Buscar cada elemento de infraestructura
        elements.forEach(el => {
            if (el.type === 'empalme') {
                infrastructure.empalme = el;
            } else if (el.type === 'medidor') {
                infrastructure.medidor = el;
            } else if (el.type === 'tablero') {
                // ✅ FILTRAR POR TIPO DE TABLERO SI SE ESPECIFICA
                if (tableroTipoFiltro) {
                    if (el.tableroTipo === tableroTipoFiltro) {
                        infrastructure.tablero = el;
                        console.log(`✅ Tablero tipo "${tableroTipoFiltro}" encontrado:`, el);
                    }
                } else {
                    // Sin filtro, tomar cualquier tablero (comportamiento original)
                    infrastructure.tablero = el;
                }
            }
        });
        
        // Validar que existan todos
        if (!infrastructure.empalme) {
            infrastructure.errors.push('⚠️ Falta punto de EMPALME (conexión red pública)');
        }
        if (!infrastructure.medidor) {
            infrastructure.errors.push('⚠️ Falta MEDIDOR eléctrico');
        }
        if (!infrastructure.tablero) {
            if (tableroTipoFiltro) {
                infrastructure.errors.push(`⚠️ Falta TABLERO tipo "${tableroTipoFiltro}"`);
            } else {
                infrastructure.errors.push('⚠️ Falta TABLERO eléctrico interior');
            }
        }
        
        // Validar si está completo
        infrastructure.valid = infrastructure.empalme && infrastructure.medidor && infrastructure.tablero;
        
        if (infrastructure.valid) {
            const tipoMsg = tableroTipoFiltro ? ` (tipo: ${tableroTipoFiltro})` : '';
            console.log(`✅ Jerarquía eléctrica válida${tipoMsg}: Empalme → Medidor → Tablero`);
        } else {
            console.warn('⚠️ Jerarquía incompleta:', infrastructure.errors);
        }
        
        return infrastructure;
    },
    
    // Obtener secuencia de conexión principal
    getMainSequence(infrastructure) {
        if (!infrastructure.valid) {
            return [];
        }
        
        return [
            infrastructure.empalme,
            infrastructure.medidor,
            infrastructure.tablero
        ];
    },
    
    // Calcular distancia entre dos puntos
    distance(p1, p2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    },
    
    // Validar orden lógico (empalme debería estar "antes" del tablero)
    validateLogicalOrder(infrastructure) {
        if (!infrastructure.valid) return false;
        
        const warnings = [];
        
        // Verificar que el empalme esté cerca del borde (conexión externa)
        const empalmeX = infrastructure.empalme.x;
        const svgWidth = 841; // A1
        
        if (empalmeX > 100 && empalmeX < svgWidth - 100) {
            warnings.push('💡 El empalme usualmente está cerca del borde del plano');
        }
        
        // Verificar que medidor esté entre empalme y tablero
        const dist_empalme_medidor = this.distance(infrastructure.empalme, infrastructure.medidor);
        const dist_medidor_tablero = this.distance(infrastructure.medidor, infrastructure.tablero);
        const dist_empalme_tablero = this.distance(infrastructure.empalme, infrastructure.tablero);
        
        // El medidor debe estar "en el camino"
        const totalDirect = dist_empalme_medidor + dist_medidor_tablero;
        if (totalDirect > dist_empalme_tablero * 1.5) {
            warnings.push('💡 El medidor parece estar fuera de ruta óptima');
        }
        
        if (warnings.length > 0) {
            console.log('💡 Sugerencias de ubicación:', warnings);
        }
        
        return warnings;
    },
    
    // ========================================
    // FUNCIÓN ORIGINAL - SIN MODIFICAR
    // ========================================
    // Agrupar elementos por circuito desde el tablero (SOLO NIVEL 1)
    groupByCircuit(elements, tablero, levelFilter = null) {
        const circuits = {
            'C1': [], // Iluminación
            'C2': [], // Enchufes generales
            'C3': [], // Cocina eléctrica
            'C4': [], // Lavadora
            'C5': [], // Especiales (refrigerador, microondas)
            'C6': [], // Secadora
            'C7': [], // Horno eléctrico
            'C8': [], // Calefón/Terma
            'PE': []  // Tierra
        };
        
        elements.forEach(el => {
            const category = getElementCategory(el.type);
            
            // Saltar infraestructura
            if (category === 'infraestructura') return;
            
            // Saltar conectores entre niveles (se manejan aparte)
            if (category === 'entre-niveles') return;
            
            // Filtrar por nivel si se especifica
            if (levelFilter !== null && el.level !== levelFilter) return;
            
            // Mapeo específico por tipo de electrodoméstico
            if (el.type === 'lavadora') {
                circuits.C4.push(el);
            } else if (el.type === 'secadora') {
                circuits.C6.push(el);
            } else if (el.type === 'refrigerador') {
                circuits.C5.push(el);
            } else if (el.type === 'microondas') {
                circuits.C5.push(el);
            } else if (el.type === 'horno') {
                circuits.C7.push(el);
            } else if (el.type === 'cocina') {
                circuits.C3.push(el);
            } else if (el.type === 'calefon') {
                circuits.C8.push(el);
            } else if (category === 'iluminacion' || category === 'interruptores') {
                circuits.C1.push(el);
            } else if (category === 'enchufes') {
                circuits.C2.push(el);
            } else if (category === 'especiales') {
                circuits.C5.push(el);
            } else if (category === 'tierra') {
                circuits.PE.push(el);
            } else if (category === 'electrodomesticos') {
                // Electrodomésticos sin tipo específico van a C5
                circuits.C5.push(el);
            }
        });
        
        // Ordenar cada circuito por cercanía al tablero
        Object.keys(circuits).forEach(circuitName => {
            circuits[circuitName].sort((a, b) => {
                const distA = this.distance(tablero, a);
                const distB = this.distance(tablero, b);
                return distA - distB;
            });
        });
        
        const levelText = levelFilter ? ` (Nivel ${levelFilter})` : '';
        console.log(`📊 Elementos agrupados por circuito${levelText}:`, {
            'C1 (Iluminación)': circuits.C1.length,
            'C2 (Enchufes)': circuits.C2.length,
            'C3 (Cocina)': circuits.C3.length,
            'C4 (Lavadora)': circuits.C4.length,
            'C5 (Especiales)': circuits.C5.length,
            'C6 (Secadora)': circuits.C6.length,
            'C7 (Horno)': circuits.C7.length,
            'C8 (Calefón)': circuits.C8.length,
            'PE (Tierra)': circuits.PE.length
        });
        
        return circuits;
    },
    
    // ========================================
    // ✨ NUEVA FUNCIÓN - SOLO ILUMINACIÓN ✨
    // ========================================
    groupByCircuitIluminacion(elements, tablero, levelFilter = null) {
        const circuits = {
            'C1': []  // Solo Iluminación + Interruptores
        };
        
        elements.forEach(el => {
            const category = getElementCategory(el.type);
            
            // Saltar infraestructura
            if (category === 'infraestructura') return;
            
            // Saltar conectores entre niveles
            if (category === 'entre-niveles') return;
            
            // Filtrar por nivel si se especifica
            if (levelFilter !== null && el.level !== levelFilter) return;
            
            // SOLO elementos de iluminación e interruptores
            if (category === 'iluminacion' || category === 'interruptores') {
                circuits.C1.push(el);
            }
        });
        
        // Ordenar por cercanía al tablero
        circuits.C1.sort((a, b) => {
            const distA = this.distance(tablero, a);
            const distB = this.distance(tablero, b);
            return distA - distB;
        });
        
        const levelText = levelFilter ? ` (Nivel ${levelFilter})` : '';
        console.log(`💡 Elementos de ILUMINACIÓN agrupados${levelText}:`, {
            'C1 (Iluminación)': circuits.C1.length
        });
        
        return circuits;
    },
    
    // ========================================
    // ✨ NUEVA FUNCIÓN - SOLO ENCHUFES ✨
    // ========================================
    groupByCircuitEnchufes(elements, tablero, levelFilter = null) {
        const circuits = {
            'C2': [], // Enchufes generales
            'C3': [], // Cocina eléctrica
            'C4': [], // Lavadora
            'C5': [], // Especiales (refrigerador, microondas)
            'C6': [], // Secadora
            'C7': [], // Horno eléctrico
            'C8': []  // Calefón/Terma
        };
        
        elements.forEach(el => {
            const category = getElementCategory(el.type);
            
            // Saltar infraestructura
            if (category === 'infraestructura') return;
            
            // Saltar conectores entre niveles
            if (category === 'entre-niveles') return;
            
            // Filtrar por nivel si se especifica
            if (levelFilter !== null && el.level !== levelFilter) return;
            
            // SOLO enchufes y electrodomésticos
            if (el.type === 'lavadora') {
                circuits.C4.push(el);
            } else if (el.type === 'secadora') {
                circuits.C6.push(el);
            } else if (el.type === 'refrigerador') {
                circuits.C5.push(el);
            } else if (el.type === 'microondas') {
                circuits.C5.push(el);
            } else if (el.type === 'horno') {
                circuits.C7.push(el);
            } else if (el.type === 'cocina') {
                circuits.C3.push(el);
            } else if (el.type === 'calefon') {
                circuits.C8.push(el);
            } else if (category === 'enchufes') {
                circuits.C2.push(el);
            } else if (category === 'especiales') {
                circuits.C5.push(el);
            } else if (category === 'electrodomesticos') {
                circuits.C5.push(el);
            }
        });
        
        // Ordenar cada circuito por cercanía al tablero
        Object.keys(circuits).forEach(circuitName => {
            circuits[circuitName].sort((a, b) => {
                const distA = this.distance(tablero, a);
                const distB = this.distance(tablero, b);
                return distA - distB;
            });
        });
        
        const levelText = levelFilter ? ` (Nivel ${levelFilter})` : '';
        console.log(`🔌 Elementos de ENCHUFES agrupados${levelText}:`, {
            'C2 (Enchufes)': circuits.C2.length,
            'C3 (Cocina)': circuits.C3.length,
            'C4 (Lavadora)': circuits.C4.length,
            'C5 (Especiales)': circuits.C5.length,
            'C6 (Secadora)': circuits.C6.length,
            'C7 (Horno)': circuits.C7.length,
            'C8 (Calefón)': circuits.C8.length
        });
        
        return circuits;
    },
    
    // Detectar y validar puntos de conexión entre niveles
    detectLevelConnectors(elements) {
        const connectors = {
            level1: [],  // Puntos de subida en nivel 1
            level2: [],  // Puntos de llegada en nivel 2
            valid: false,
            warnings: []
        };
        
        elements.forEach(el => {
            if (el.type === 'subida-nivel') {
                if (el.level === 1) {
                    connectors.level1.push(el);
                } else if (el.level === 2) {
                    connectors.level2.push(el);
                }
            }
        });
        
        // Validar que haya al menos un punto en cada nivel si hay elementos en nivel 2
        const hasLevel2Elements = elements.some(el => el.level === 2 && el.type !== 'subida-nivel');
        
        if (hasLevel2Elements) {
            if (connectors.level1.length === 0) {
                connectors.warnings.push('⚠️ Hay elementos en Nivel 2 pero falta punto de SUBIDA en Nivel 1');
            }
            if (connectors.level2.length === 0) {
                connectors.warnings.push('⚠️ Hay elementos en Nivel 2 pero falta punto de LLEGADA en Nivel 2');
            }
            
            connectors.valid = connectors.level1.length > 0 && connectors.level2.length > 0;
        } else {
            // No hay elementos en nivel 2, no se requieren conectores
            connectors.valid = true;
        }
        
        if (connectors.level1.length > 0 || connectors.level2.length > 0) {
            console.log('📍 Conectores entre niveles detectados:', {
                'Puntos Subida (N1)': connectors.level1.length,
                'Puntos Llegada (N2)': connectors.level2.length,
                'Válido': connectors.valid
            });
        }
        
        if (connectors.warnings.length > 0) {
            console.warn('⚠️ Advertencias de conectores:', connectors.warnings);
        }
        
        return connectors;
    }
};

console.log('✅ Detector de jerarquía cargado');