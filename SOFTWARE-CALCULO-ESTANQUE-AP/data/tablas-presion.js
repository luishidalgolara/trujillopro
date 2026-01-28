// Tablas de presión y datos técnicos complementarios
const TablasPres = {
    // Presión por número de pisos (m.c.a - metros columna de agua)
    presionPorPisos: [
        { pisos: 1, presionMin: 15, presionRec: 18 },
        { pisos: 2, presionMin: 18, presionRec: 22 },
        { pisos: 3, presionMin: 22, presionRec: 26 },
        { pisos: 4, presionMin: 25, presionRec: 30 },
        { pisos: 5, presionMin: 28, presionRec: 34 },
        { pisos: 6, presionMin: 32, presionRec: 38 },
        { pisos: 7, presionMin: 35, presionRec: 42 },
        { pisos: 8, presionMin: 38, presionRec: 46 },
        { pisos: 9, presionMin: 42, presionRec: 50 },
        { pisos: 10, presionMin: 45, presionRec: 54 },
        { pisos: 12, presionMin: 52, presionRec: 62 },
        { pisos: 15, presionMin: 62, presionRec: 72 },
        { pisos: 20, presionMin: 80, presionRec: 90 },
        { pisos: 25, presionMin: 95, presionRec: 105 }
    ],

    // Pérdidas de carga en tuberías (%)
    perdidasCarga: {
        tuberias: 10,       // 10% en tuberías
        accesorios: 15,     // 15% en accesorios y válvulas
        medidor: 5,         // 5% en medidor
        total: 30           // 30% total estimado
    },

    // Coeficientes de simultaneidad según número de departamentos
    simultaneidad: [
        { deptos: '1-5', coef: 1.0 },
        { deptos: '6-10', coef: 0.9 },
        { deptos: '11-20', coef: 0.8 },
        { deptos: '21-30', coef: 0.7 },
        { deptos: '31-50', coef: 0.6 },
        { deptos: '51-100', coef: 0.5 },
        { deptos: '100+', coef: 0.45 }
    ],

    // Consumo por artefacto (L/min)
    artefactos: {
        lavamanos: 6,
        lavaplatos: 10,
        ducha: 12,
        tina: 20,
        wc: 10,
        lavadora: 15,
        lavavajillas: 12
    },

    // Diámetros de tuberías recomendados
    diametrosTuberias: {
        alimentacion: [
            { caudal: '0-5', diametro: 25, pulgadas: '1"' },
            { caudal: '5-10', diametro: 32, pulgadas: '1 1/4"' },
            { caudal: '10-20', diametro: 40, pulgadas: '1 1/2"' },
            { caudal: '20-40', diametro: 50, pulgadas: '2"' },
            { caudal: '40-80', diametro: 63, pulgadas: '2 1/2"' },
            { caudal: '80-150', diametro: 75, pulgadas: '3"' }
        ],
        impulsion: [
            { caudal: '0-10', diametro: 32, pulgadas: '1 1/4"' },
            { caudal: '10-25', diametro: 40, pulgadas: '1 1/2"' },
            { caudal: '25-50', diametro: 50, pulgadas: '2"' },
            { caudal: '50-100', diametro: 63, pulgadas: '2 1/2"' },
            { caudal: '100-200', diametro: 75, pulgadas: '3"' }
        ]
    },

    // Velocidades recomendadas en tuberías (m/s)
    velocidades: {
        minima: 0.6,        // Velocidad mínima para evitar sedimentación
        maxima: 2.5,        // Velocidad máxima para evitar erosión y ruido
        recomendada: 1.5    // Velocidad recomendada
    },

    // Características de bombas típicas
    bombasTipicas: [
        { 
            caudal: 10, 
            altura: 20, 
            potencia: 1.5, 
            tipo: 'Centrífuga horizontal',
            aplicacion: 'Edificios pequeños (1-5 pisos)'
        },
        { 
            caudal: 20, 
            altura: 35, 
            potencia: 3.0, 
            tipo: 'Centrífuga horizontal',
            aplicacion: 'Edificios medianos (6-10 pisos)'
        },
        { 
            caudal: 30, 
            altura: 50, 
            potencia: 5.5, 
            tipo: 'Centrífuga vertical',
            aplicacion: 'Edificios altos (11-15 pisos)'
        },
        { 
            caudal: 40, 
            altura: 70, 
            potencia: 10.0, 
            tipo: 'Centrífuga vertical multietapa',
            aplicacion: 'Edificios muy altos (16-25 pisos)'
        }
    ],

    // Eficiencia de bombas según tipo
    eficienciaBombas: {
        centrifugaHorizontal: 0.70,
        centrifugaVertical: 0.75,
        multietapa: 0.78,
        sumergible: 0.65
    },

    // Métodos de cálculo

    // Obtener presión recomendada según pisos
    obtenerPresion: function(numPisos) {
        for (let i = 0; i < this.presionPorPisos.length; i++) {
            if (numPisos <= this.presionPorPisos[i].pisos) {
                return this.presionPorPisos[i];
            }
        }
        // Si es mayor al máximo, extrapolar
        const ultimo = this.presionPorPisos[this.presionPorPisos.length - 1];
        const incremento = (ultimo.presionRec - ultimo.presionMin) / ultimo.pisos;
        return {
            pisos: numPisos,
            presionMin: Math.round(ultimo.presionMin + (numPisos - ultimo.pisos) * incremento * 0.8),
            presionRec: Math.round(ultimo.presionRec + (numPisos - ultimo.pisos) * incremento)
        };
    },

    // Obtener coeficiente de simultaneidad
    obtenerSimultaneidad: function(numDeptos) {
        if (numDeptos <= 5) return 1.0;
        if (numDeptos <= 10) return 0.9;
        if (numDeptos <= 20) return 0.8;
        if (numDeptos <= 30) return 0.7;
        if (numDeptos <= 50) return 0.6;
        if (numDeptos <= 100) return 0.5;
        return 0.45;
    },

    // Calcular caudal total considerando simultaneidad
    calcularCaudalTotal: function(numDeptos, personasPorDepto) {
        // Estimación basada en artefactos por departamento
        const artefactosPorDepto = 5; // Promedio: lavamanos, ducha, WC, lavaplatos, lavadora
        const caudalPromedioPorArtefacto = 10; // L/min
        const simultaneidad = this.obtenerSimultaneidad(numDeptos);
        
        return numDeptos * artefactosPorDepto * caudalPromedioPorArtefacto * simultaneidad;
    },

    // Recomendar diámetro de tubería
    recomendarDiametro: function(caudal, tipo) {
        const tabla = tipo === 'alimentacion' ? this.diametrosTuberias.alimentacion : this.diametrosTuberias.impulsion;
        
        for (let i = 0; i < tabla.length; i++) {
            const rango = tabla[i].caudal.split('-');
            const min = parseFloat(rango[0]);
            const max = rango[1] === '+' ? Infinity : parseFloat(rango[1]);
            
            if (caudal >= min && caudal < max) {
                return tabla[i];
            }
        }
        
        return tabla[tabla.length - 1];
    },

    // Seleccionar bomba recomendada
    seleccionarBomba: function(caudal, altura) {
        for (let i = 0; i < this.bombasTipicas.length; i++) {
            const bomba = this.bombasTipicas[i];
            if (caudal <= bomba.caudal * 1.2 && altura <= bomba.altura * 1.1) {
                return bomba;
            }
        }
        
        // Si ninguna calza, devolver la más grande con advertencia
        return {
            ...this.bombasTipicas[this.bombasTipicas.length - 1],
            advertencia: 'Requerimientos exceden bombas típicas. Consulte con especialista.'
        };
    },

    // Verificar velocidad en tubería
    verificarVelocidad: function(caudal, diametro) {
        // V = Q / A, donde Q en m³/s y A en m²
        const caudalM3s = caudal / 60000; // L/min a m³/s
        const diametroM = diametro / 1000; // mm a m
        const area = Math.PI * Math.pow(diametroM / 2, 2);
        const velocidad = caudalM3s / area;
        
        let estado = 'ok';
        let mensaje = `Velocidad: ${velocidad.toFixed(2)} m/s`;
        
        if (velocidad < this.velocidades.minima) {
            estado = 'warning';
            mensaje += ' - Muy baja, riesgo de sedimentación';
        } else if (velocidad > this.velocidades.maxima) {
            estado = 'warning';
            mensaje += ' - Muy alta, riesgo de erosión y ruido';
        } else {
            estado = 'success';
            mensaje += ' - Velocidad adecuada';
        }
        
        return { velocidad, estado, mensaje };
    },

    // Calcular pérdidas de carga totales
    calcularPerdidasTotal: function(presionBomba) {
        const factorPerdida = (100 + this.perdidasCarga.total) / 100;
        return presionBomba * factorPerdida;
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TablasPres;
}