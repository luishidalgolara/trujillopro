/**
 * NORMATIVA CHILENA - NCh430, NCh433
 * Constantes y valores para cálculos estructurales en Chile
 */

const NormativaChile = {
    // NCh430 - Hormigón Armado
    hormigon: {
        // Resistencias características del hormigón (MPa)
        fc: {
            H20: 20,
            H25: 25,
            H30: 30,
            H35: 35,
            H40: 40,
            H45: 45,
            H50: 50
        },
        
        // Módulo de elasticidad del hormigón (MPa)
        // Ec = 4700 * √fc (NCh430)
        moduloElasticidad: function(fc) {
            return 4700 * Math.sqrt(fc);
        },
        
        // Peso específico del hormigón (kN/m³)
        pesoEspecifico: {
            normal: 25,
            armado: 25
        },
        
        // Recubrimientos mínimos (mm) según NCh430
        recubrimiento: {
            noExpuesto: 20,
            expuestoExterior: 30,
            contactoTerreno: 70,
            ambienteMarino: 50
        },
        
        // Coeficiente de reducción de resistencia φ
        phi: {
            flexion: 0.90,
            cortante: 0.85,
            compresion: 0.70,
            compresionEspiral: 0.75
        }
    },
    
    // Acero de refuerzo
    acero: {
        // Tensión de fluencia (MPa)
        fy: {
            A44_28H: 280,
            A63_42H: 420,
            A60_42H: 420
        },
        
        // Módulo de elasticidad del acero (MPa)
        Es: 200000,
        
        // Diámetros comerciales (mm)
        diametros: [6, 8, 10, 12, 16, 18, 20, 22, 25, 28, 32, 36],
        
        // Áreas de barras (mm²)
        areas: {
            6: 28.3,
            8: 50.3,
            10: 78.5,
            12: 113.1,
            16: 201.1,
            18: 254.5,
            20: 314.2,
            22: 380.1,
            25: 490.9,
            28: 615.8,
            32: 804.2,
            36: 1017.9
        }
    },
    
    // NCh433 - Diseño Sísmico
    sismico: {
        // Zonas sísmicas de Chile
        zonaSismica: {
            1: { Ao: 0.20, descripcion: "Zona sísmica baja" },
            2: { Ao: 0.30, descripcion: "Zona sísmica media" },
            3: { Ao: 0.40, descripcion: "Zona sísmica alta" }
        },
        
        // Categorías de ocupación
        categoriaEdificio: {
            I: { factor: 1.0, descripcion: "Edificios de importancia normal" },
            II: { factor: 1.2, descripcion: "Edificios de uso público" },
            III: { factor: 1.4, descripcion: "Edificios esenciales" },
            IV: { factor: 1.6, descripcion: "Edificios vitales" }
        },
        
        // Coeficiente sísmico básico
        calcularC: function(T, Ao, n, p) {
            // C = 2.75 * Ao * n / (g * T^(1+p))
            const g = 9.81;
            return (2.75 * Ao * n) / (g * Math.pow(T, 1 + p));
        }
    },
    
    // Suelos - Capacidad portante según NCh433
    suelos: {
        tipos: {
            I: { 
                descripcion: "Roca, suelo cementado",
                qadm: 400, // kPa
                vs: "> 900 m/s"
            },
            II: { 
                descripcion: "Grava densa, arena densa",
                qadm: 300,
                vs: "400-900 m/s"
            },
            III: { 
                descripcion: "Grava media, arena media",
                qadm: 200,
                vs: "200-400 m/s"
            },
            IV: { 
                descripcion: "Suelo fino, granular suelto",
                qadm: 100,
                vs: "< 200 m/s"
            }
        },
        
        // Ángulo de fricción interna típico (grados)
        anguloFriccion: {
            gravas: 35,
            arenaDensa: 35,
            arenaMedia: 30,
            arenaFina: 28,
            arcilla: 20
        }
    },
    
    // Cargas y combinaciones según NCh1537
    cargas: {
        // Cargas permanentes típicas (kN/m²)
        permanentes: {
            losaHormigon: function(espesor) {
                return espesor * 25; // kN/m³
            },
            tabiqueria: 1.0,
            piso: 1.5,
            cielo: 0.3,
            instalaciones: 0.5
        },
        
        // Sobrecargas de uso (kN/m²) según NCh1537
        sobrecargas: {
            vivienda: 2.0,
            oficina: 2.5,
            comercio: 4.0,
            aglomeracion: 5.0,
            deposito: 5.0,
            biblioteca: 6.0,
            escalera: 4.0,
            balcon: 3.0,
            techo: 1.0
        },
        
        // Combinaciones de carga
        combinaciones: {
            // Estado límite último
            U1: { D: 1.4, L: 0, E: 0 },
            U2: { D: 1.2, L: 1.6, E: 0 },
            U3: { D: 1.2, L: 1.0, E: 1.0 },
            U4: { D: 0.9, L: 0, E: 1.0 },
            // Estado de servicio
            S1: { D: 1.0, L: 1.0, E: 0 },
            S2: { D: 1.0, L: 0.3, E: 1.0 }
        }
    },
    
    // Factores de seguridad
    seguridadGlobal: {
        volteo: 1.5,
        deslizamiento: 1.5,
        capacidadPortante: 3.0
    },
    
    // Utilidades de conversión
    utils: {
        // Convertir toneladas a kN
        tonToKN: function(ton) {
            return ton * 9.81;
        },
        
        // Convertir kN a toneladas
        knToTon: function(kn) {
            return kn / 9.81;
        },
        
        // Convertir MPa a kgf/cm²
        mpaToKgfCm2: function(mpa) {
            return mpa * 10.197;
        },
        
        // Convertir kgf/cm² a MPa
        kgfCm2ToMpa: function(kgf) {
            return kgf / 10.197;
        }
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NormativaChile;
}
