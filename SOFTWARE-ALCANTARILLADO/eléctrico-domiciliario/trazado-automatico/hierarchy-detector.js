// ========================================
// DETECTOR DE JERARQUÍA ELÉCTRICA
// ========================================
// Detecta y valida: Empalme → Medidor → Tablero

const HierarchyDetector = {
    
    // Detectar elementos de infraestructura
    detectInfrastructure(elements) {
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
                infrastructure.tablero = el;
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
            infrastructure.errors.push('⚠️ Falta TABLERO eléctrico interior');
        }
        
        // Validar si está completo
        infrastructure.valid = infrastructure.empalme && infrastructure.medidor && infrastructure.tablero;
        
        if (infrastructure.valid) {
            console.log('✅ Jerarquía eléctrica válida: Empalme → Medidor → Tablero');
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
    
    // Agrupar elementos por circuito desde el tablero
    groupByCircuit(elements, tablero) {
        const circuits = {
            'C1': [], // Iluminación
            'C2': [], // Enchufes generales
            'C3': [], // Cocina
            'C4': [], // Lavadora
            'C5': [], // Especiales (refrigerador)
            'PE': []  // Tierra
        };
        
        elements.forEach(el => {
            const category = getElementCategory(el.type);
            
            // Saltar infraestructura
            if (category === 'infraestructura') return;
            
            // Asignar a circuito
            if (category === 'iluminacion' || category === 'interruptores') {
                circuits.C1.push(el);
            } else if (category === 'enchufes') {
                circuits.C2.push(el);
            } else if (category === 'especiales') {
                circuits.C5.push(el);
            } else if (category === 'tierra') {
                circuits.PE.push(el);
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
        
        console.log('📊 Elementos agrupados por circuito:', {
            'C1 (Iluminación)': circuits.C1.length,
            'C2 (Enchufes)': circuits.C2.length,
            'C5 (Especiales)': circuits.C5.length,
            'PE (Tierra)': circuits.PE.length
        });
        
        return circuits;
    }
};

console.log('✅ Detector de jerarquía cargado');
