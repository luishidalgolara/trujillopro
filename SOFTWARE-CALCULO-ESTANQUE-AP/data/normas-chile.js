// Normas Chilenas NCh691 - Dotaciones de agua potable
const NormasChile = {
    // Dotación según NCh691
    dotaciones: {
        residencial: {
            base: 200, // litros por habitante por día
            descripcion: "Viviendas residenciales"
        },
        oficinas: {
            base: 50, // litros por persona por día
            descripcion: "Edificios de oficinas"
        },
        mixto: {
            base: 150, // litros por persona por día (promedio)
            descripcion: "Uso mixto residencial-comercial"
        }
    },

    // Capacidad del estanque según NCh691
    capacidadEstanque: {
        // El estanque debe almacenar el consumo de:
        residencial: 1.0, // 1 día de consumo
        oficinas: 1.5,    // 1.5 días de consumo
        mixto: 1.2        // 1.2 días de consumo
    },

    // Presión mínima por piso (m.c.a - metros columna de agua)
    presion: {
        base: 15,           // Presión base mínima en m.c.a
        porPiso: 4.0,       // Incremento por piso en m.c.a (altura promedio 2.8m + pérdidas)
        perdidas: 1.15,     // Factor de pérdidas de carga (15%)
        descripcion: "Presión = Base + (Pisos * porPiso) * Factor_perdidas"
    },

    // ⭐ CAUDAL CORREGIDO - MÉTODO HUNTER ADAPTADO PARA CHILE ⭐
    // Según NCh691 y práctica profesional chilena
    caudal: {
        // Caudal base por unidad de gasto (UG)
        // 1 UG = 0.47 L/s según normas chilenas
        unidadGasto: 0.47,  // L/s por UG
        
        // Unidades de gasto por departamento tipo (NCh691)
        ugPorDepto: {
            pequeno: 6,     // Depto 1-2 dormitorios (6 UG)
            mediano: 8,     // Depto 3 dormitorios (8 UG)
            grande: 10      // Depto 4+ dormitorios (10 UG)
        },
        
        // Factor de simultaneidad de Hunter (raíz cuadrada de UG totales)
        // Fórmula chilena: Q = UG × √(UG_total) × factor
        factorHunter: 0.35, // Factor de ajuste para edificios residenciales
        
        descripcion: "Caudal según método de Hunter adaptado NCh691"
    },

    // Sistema de bombeo
    bombeo: {
        // Cantidad de bombas según tamaño del edificio
        pequeno: {          // Hasta 5 pisos
            bombas: 2,
            descripcion: "1 operativa + 1 reserva"
        },
        mediano: {          // 6 a 15 pisos
            bombas: 3,
            descripcion: "2 operativas + 1 reserva"
        },
        grande: {           // Más de 15 pisos
            bombas: 4,
            descripcion: "2 operativas + 2 reserva"
        }
    },

    // Eficiencia de bombas
    eficienciaBomba: 0.70,  // 70% eficiencia típica

    // Dimensionamiento estructural
    estructural: {
        // Espesor mínimo según altura del estanque
        espesorMurosMin: {
            bajo: { altura: 2.0, espesor: 0.15 },     // hasta 2m
            medio: { altura: 3.0, espesor: 0.20 },    // 2-3m
            alto: { altura: 5.0, espesor: 0.25 }      // más de 3m
        },
        espesorFondoMin: 0.20, // metros
        recubrimientoMin: 0.025, // 2.5 cm de recubrimiento
        
        // Resistencia del hormigón (MPa)
        hormigon: {
            H20: { fc: 20, descripcion: "Uso estándar" },
            H25: { fc: 25, descripcion: "Uso recomendado" },
            H30: { fc: 30, descripcion: "Alta resistencia" }
        },
        
        // Acero de refuerzo (MPa)
        acero: {
            'A63-42H': { fy: 420, descripcion: "Alta resistencia" },
            'A44-28H': { fy: 280, descripcion: "Resistencia media" }
        }
    },

    // Factores de seguridad
    seguridad: {
        estructural: 1.5,   // Factor de seguridad estructural
        hidraulico: 1.25,   // Factor de seguridad hidráulico
        sismico: 1.3        // Factor sísmico para Chile
    },

    // Parámetros adicionales
    parametros: {
        pesoAgua: 9.81,             // kN/m³ (peso específico del agua)
        coeficienteAlmacenamiento: 1.1, // 10% adicional por seguridad
        temperaturaDiseno: 20,      // °C temperatura de diseño
        vidaUtil: 50                // años de vida útil esperada
    },

    // Recomendaciones técnicas
    recomendaciones: {
        alturaMaxima: 5.0,          // metros - altura máxima recomendada
        alturaMinima: 1.5,          // metros - altura mínima recomendada
        relacionLargoAncho: 2.5,    // relación máxima L/A
        bordoLibre: 0.30,           // metros - borde libre mínimo
        ventilacion: true,          // requiere ventilación
        acceso: true,               // requiere acceso para mantención
        rebose: true,               // requiere sistema de rebose
        limpieza: true              // requiere válvula de limpieza
    },

    // Normativas aplicables
    normativas: [
        "NCh691 - Agua Potable - Conducción, Regulación y Distribución",
        "NCh1105 - Ingeniería Sanitaria - Alcantarillado de Aguas Residuales",
        "NCh430 - Agua Potable - Requisitos",
        "NCh409 - Agua Potable - Parte 1: Requisitos",
        "NCh2369 - Diseño sísmico de estructuras e instalaciones industriales",
        "NCh433 - Diseño sísmico de edificios"
    ],

    // Método para calcular dotación total
    calcularDotacion: function(tipoEdificio, habitantes) {
        const dotacion = this.dotaciones[tipoEdificio].base;
        return dotacion * habitantes;
    },

    // Método para calcular volumen requerido del estanque
    calcularVolumenRequerido: function(tipoEdificio, dotacionDiaria) {
        const dias = this.capacidadEstanque[tipoEdificio];
        const factor = this.parametros.coeficienteAlmacenamiento;
        return (dotacionDiaria * dias * factor) / 1000; // m³
    },

    // Método para calcular presión requerida
    calcularPresion: function(numPisos) {
        const presionBase = this.presion.base;
        const presionPorPiso = this.presion.porPiso;
        const factorPerdidas = this.presion.perdidas;
        return (presionBase + (numPisos * presionPorPiso)) * factorPerdidas;
    },

    // ⭐ MÉTODO CORREGIDO - CAUDAL REAL SEGÚN MÉTODO DE HUNTER NCh691 ⭐
    calcularCaudal: function(numDepartamentos, tipoDepartamento = 'mediano') {
        // Determinar unidades de gasto por departamento
        const ugPorDepto = this.caudal.ugPorDepto[tipoDepartamento];
        
        // Unidades de gasto totales
        const ugTotales = numDepartamentos * ugPorDepto;
        
        // Aplicar método de Hunter: Q = K × √(UG_total)
        // Donde K es el factor de simultaneidad
        const caudalLS = this.caudal.unidadGasto * Math.sqrt(ugTotales) * this.caudal.factorHunter;
        
        // Convertir de L/s a L/min
        const caudalLMin = caudalLS * 60;
        
        // Aplicar factor de seguridad según tamaño
        let factorSeguridad = 1.0;
        if (numDepartamentos <= 20) {
            factorSeguridad = 1.15;  // +15% para edificios pequeños
        } else if (numDepartamentos <= 60) {
            factorSeguridad = 1.10;  // +10% para edificios medianos
        } else {
            factorSeguridad = 1.05;  // +5% para edificios grandes
        }
        
        return caudalLMin * factorSeguridad;
    },

    // Método para determinar número de bombas
    determinarBombas: function(numPisos) {
        if (numPisos <= 5) {
            return this.bombeo.pequeno;
        } else if (numPisos <= 15) {
            return this.bombeo.mediano;
        } else {
            return this.bombeo.grande;
        }
    },

    // ⭐ MÉTODO CORREGIDO - POTENCIA REAL DE BOMBA ⭐
    calcularPotenciaBomba: function(caudal, presion) {
        // Fórmula correcta: P(HP) = (Q × H × γ) / (75 × η × 60)
        // Q: caudal en L/min
        // H: altura en m (presión)
        // γ: densidad del agua = 1 kg/L
        // η: eficiencia de la bomba (0.70)
        // 75: conversión a HP
        // 60: conversión de minutos a segundos
        
        const caudalLS = caudal / 60; // L/min a L/s
        const gamma = 1; // kg/L
        const eficiencia = this.eficienciaBomba;
        
        // Potencia en HP
        const potenciaHP = (caudalLS * presion * gamma) / (75 * eficiencia);
        
        // Agregar 15% de factor de seguridad (no 20% como antes)
        const potenciaConSeguridad = potenciaHP * 1.15;
        
        // Redondear a potencias comerciales estándar
        const potenciasComerciales = [0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 7.5, 10, 12.5, 15, 20, 25];
        
        for (let i = 0; i < potenciasComerciales.length; i++) {
            if (potenciaConSeguridad <= potenciasComerciales[i]) {
                return potenciasComerciales[i];
            }
        }
        
        return Math.ceil(potenciaConSeguridad);
    },

    // Método para validar dimensiones
    validarDimensiones: function(largo, ancho, altura) {
        const recomendaciones = [];
        
        if (altura > this.recomendaciones.alturaMaxima) {
            recomendaciones.push({
                tipo: 'warning',
                mensaje: `Altura superior a ${this.recomendaciones.alturaMaxima}m no es recomendada`
            });
        }
        
        if (altura < this.recomendaciones.alturaMinima) {
            recomendaciones.push({
                tipo: 'warning',
                mensaje: `Altura inferior a ${this.recomendaciones.alturaMinima}m puede ser insuficiente`
            });
        }
        
        const relacion = largo / ancho;
        if (relacion > this.recomendaciones.relacionLargoAncho) {
            recomendaciones.push({
                tipo: 'warning',
                mensaje: 'Relación largo/ancho muy alta, considere dimensiones más equilibradas'
            });
        }
        
        return recomendaciones;
    },

    // Método para generar recomendaciones técnicas
    generarRecomendaciones: function(datos) {
        const recs = [];
        
        recs.push({
            tipo: 'success',
            mensaje: 'Incluir sistema de ventilación adecuado según NCh691'
        });
        
        recs.push({
            tipo: 'success',
            mensaje: `Borde libre mínimo de ${this.recomendaciones.bordoLibre}m sobre nivel máximo de agua`
        });
        
        recs.push({
            tipo: 'success',
            mensaje: 'Instalar válvula de limpieza en punto más bajo del estanque'
        });
        
        recs.push({
            tipo: 'success',
            mensaje: 'Prever tubería de rebose con descarga visible'
        });
        
        recs.push({
            tipo: 'success',
            mensaje: 'Acceso para inspección y mantención (tapa sanitaria)'
        });
        
        if (datos.altura > 3.0) {
            recs.push({
                tipo: 'warning',
                mensaje: 'Altura considerable: verificar diseño estructural sísmico'
            });
        }
        
        if (datos.numPisos > 10) {
            recs.push({
                tipo: 'warning',
                mensaje: 'Edificio alto: considerar estanques intermedios o sistema de presión constante'
            });
        }
        
        return recs;
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NormasChile;
}