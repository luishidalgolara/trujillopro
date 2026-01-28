/**
 * CÁLCULO DE DIÁMETROS DE TUBERÍAS
 * Según NCh691 y práctica profesional chilena
 * Versión: 1.0
 */

const CalculoTuberias = {
    
    /**
     * Velocidades recomendadas según NCh691
     */
    velocidades: {
        alimentacion: {
            min: 0.6,    // m/s - velocidad mínima (evitar sedimentación)
            max: 2.0,    // m/s - velocidad máxima (evitar erosión)
            optima: 1.5  // m/s - velocidad óptima recomendada
        },
        impulsion: {
            min: 1.0,    // m/s
            max: 2.5,    // m/s
            optima: 1.8  // m/s
        },
        rebose: {
            min: 0.6,    // m/s
            max: 1.5,    // m/s
            optima: 1.0  // m/s
        },
        desague: {
            min: 0.8,    // m/s
            max: 2.0,    // m/s
            optima: 1.2  // m/s
        }
    },

    /**
     * Diámetros comerciales disponibles en Chile (mm)
     * PVC presión clase 10 (más común para agua potable)
     */
    diametrosComerciales: [
        20, 25, 32, 40, 50, 63, 75, 90, 110, 125, 140, 160, 200, 250, 315, 355, 400
    ],

    /**
     * Materiales de tuberías según NCh691
     */
    materiales: {
        'PVC-P-10': {
            nombre: 'PVC Presión Clase 10',
            presionMax: 100, // m.c.a
            rugosidad: 0.0015, // mm (muy lisa)
            uso: 'Alimentación y distribución',
            norma: 'NCh399/1'
        },
        'HDPE-PN10': {
            nombre: 'Polietileno Alta Densidad PN10',
            presionMax: 100, // m.c.a
            rugosidad: 0.007, // mm
            uso: 'Alimentación',
            norma: 'NCh1360'
        },
        'FºFº': {
            nombre: 'Fierro Fundido',
            presionMax: 150, // m.c.a
            rugosidad: 0.25, // mm
            uso: 'Impulsión industrial',
            norma: 'NCh1176'
        },
        'Acero': {
            nombre: 'Acero al Carbono',
            presionMax: 200, // m.c.a
            rugosidad: 0.046, // mm
            uso: 'Alta presión',
            norma: 'ASTM A53'
        }
    },

    /**
     * Calcular diámetro según caudal y velocidad
     * Fórmula: D = √(4Q / πv)
     * @param {number} caudal - Caudal en L/min
     * @param {number} velocidad - Velocidad deseada en m/s
     * @returns {number} - Diámetro en mm
     */
    calcularDiametroTeorico: function(caudal, velocidad) {
        // Convertir caudal de L/min a m³/s
        const caudalM3s = (caudal / 1000) / 60;
        
        // Fórmula: D = √(4Q / πv)
        const diametroM = Math.sqrt((4 * caudalM3s) / (Math.PI * velocidad));
        
        // Convertir a mm
        const diametroMm = diametroM * 1000;
        
        return diametroMm;
    },

    /**
     * Seleccionar diámetro comercial más cercano (por arriba)
     * @param {number} diametroTeorico - Diámetro teórico en mm
     * @returns {number} - Diámetro comercial en mm
     */
    seleccionarDiametroComercial: function(diametroTeorico) {
        for (let i = 0; i < this.diametrosComerciales.length; i++) {
            if (this.diametrosComerciales[i] >= diametroTeorico) {
                return this.diametrosComerciales[i];
            }
        }
        // Si es muy grande, retornar el mayor disponible
        return this.diametrosComerciales[this.diametrosComerciales.length - 1];
    },

    /**
     * Calcular velocidad real con diámetro comercial
     * @param {number} caudal - Caudal en L/min
     * @param {number} diametroMm - Diámetro en mm
     * @returns {number} - Velocidad en m/s
     */
    calcularVelocidadReal: function(caudal, diametroMm) {
        // Convertir caudal a m³/s
        const caudalM3s = (caudal / 1000) / 60;
        
        // Convertir diámetro a m
        const diametroM = diametroMm / 1000;
        
        // Área en m²
        const area = Math.PI * Math.pow(diametroM / 2, 2);
        
        // Velocidad = Q / A
        const velocidad = caudalM3s / area;
        
        return velocidad;
    },

    /**
     * TUBERÍA DE ALIMENTACIÓN (desde red pública al estanque)
     * @param {number} volumenEstanque - Volumen del estanque en m³
     * @param {number} tiempoLlenadoDeseado - Tiempo de llenado deseado en horas (default: 4)
     * @param {number} diametroDefinido - Diámetro definido por el ingeniero en mm (opcional)
     * @returns {object} - Información completa de la tubería
     */
    calcularTuberiaAlimentacion: function(volumenEstanque, tiempoLlenadoDeseado = 4, diametroDefinido = null) {
        // Calcular caudal necesario para llenar en el tiempo deseado
        const caudalM3h = volumenEstanque / tiempoLlenadoDeseado;
        const caudalLmin = (caudalM3h * 1000) / 60;
        
        let diametroComercial, velocidadReal, enRango, observacion;
        
        if (diametroDefinido) {
            // Usar diámetro definido por el ingeniero
            diametroComercial = diametroDefinido;
            velocidadReal = this.calcularVelocidadReal(caudalLmin, diametroComercial);
            enRango = velocidadReal >= this.velocidades.alimentacion.min && 
                      velocidadReal <= this.velocidades.alimentacion.max;
            observacion = enRango ? 
                'Diámetro definido - Velocidad en rango óptimo' : 
                `⚠️ Diámetro definido - Velocidad ${velocidadReal.toFixed(2)} m/s fuera de rango (${this.velocidades.alimentacion.min}-${this.velocidades.alimentacion.max} m/s)`;
        } else {
            // Calcular automáticamente
            const velocidadOptima = this.velocidades.alimentacion.optima;
            const diametroTeorico = this.calcularDiametroTeorico(caudalLmin, velocidadOptima);
            diametroComercial = this.seleccionarDiametroComercial(diametroTeorico);
            velocidadReal = this.calcularVelocidadReal(caudalLmin, diametroComercial);
            enRango = velocidadReal >= this.velocidades.alimentacion.min && 
                      velocidadReal <= this.velocidades.alimentacion.max;
            observacion = enRango ? 'Velocidad dentro del rango óptimo' : '⚠️ Verificar velocidad';
        }
        
        return {
            tipo: 'Alimentación desde Red Pública',
            caudal: caudalLmin,
            tiempoLlenado: tiempoLlenadoDeseado,
            diametroTeorico: diametroDefinido ? diametroDefinido : this.calcularDiametroTeorico(caudalLmin, this.velocidades.alimentacion.optima),
            diametroComercial: diametroComercial,
            diametroPulgadas: this.convertirAPulgadas(diametroComercial),
            velocidadReal: velocidadReal,
            velocidadOptima: this.velocidades.alimentacion.optima,
            enRango: enRango,
            materialRecomendado: 'PVC-P-10',
            norma: 'NCh399/1',
            observacion: observacion,
            definidoPorIngeniero: diametroDefinido ? true : false
        };
    },

    /**
     * TUBERÍA DE IMPULSIÓN (desde bomba al edificio)
     * @param {number} caudalBomba - Caudal de diseño en L/min
     * @param {number} presionBomba - Presión de la bomba en m.c.a
     * @param {number} diametroDefinido - Diámetro definido por el ingeniero en mm (opcional)
     * @returns {object} - Información completa de la tubería
     */
    calcularTuberiaImpulsion: function(caudalBomba, presionBomba, diametroDefinido = null) {
        let diametroComercial, velocidadReal, enRango, observacion;
        
        if (diametroDefinido) {
            // Usar diámetro definido por el ingeniero
            diametroComercial = diametroDefinido;
            velocidadReal = this.calcularVelocidadReal(caudalBomba, diametroComercial);
            enRango = velocidadReal >= this.velocidades.impulsion.min && 
                      velocidadReal <= this.velocidades.impulsion.max;
            observacion = enRango ? 
                'Diámetro definido - Velocidad en rango óptimo' : 
                `⚠️ Diámetro definido - Velocidad ${velocidadReal.toFixed(2)} m/s fuera de rango (${this.velocidades.impulsion.min}-${this.velocidades.impulsion.max} m/s)`;
        } else {
            // Calcular automáticamente
            const velocidadOptima = this.velocidades.impulsion.optima;
            const diametroTeorico = this.calcularDiametroTeorico(caudalBomba, velocidadOptima);
            diametroComercial = this.seleccionarDiametroComercial(diametroTeorico);
            velocidadReal = this.calcularVelocidadReal(caudalBomba, diametroComercial);
            enRango = velocidadReal >= this.velocidades.impulsion.min && 
                      velocidadReal <= this.velocidades.impulsion.max;
            observacion = enRango ? 'Velocidad óptima para impulsión' : '⚠️ Ajustar diámetro';
        }
        
        // Seleccionar material según presión
        let materialRecomendado = 'PVC-P-10';
        if (presionBomba > 100) {
            materialRecomendado = 'HDPE-PN10';
        }
        if (presionBomba > 150) {
            materialRecomendado = 'FºFº';
        }
        
        return {
            tipo: 'Impulsión desde Bomba',
            caudal: caudalBomba,
            presion: presionBomba,
            diametroTeorico: diametroDefinido ? diametroDefinido : this.calcularDiametroTeorico(caudalBomba, this.velocidades.impulsion.optima),
            diametroComercial: diametroComercial,
            diametroPulgadas: this.convertirAPulgadas(diametroComercial),
            velocidadReal: velocidadReal,
            velocidadOptima: this.velocidades.impulsion.optima,
            enRango: enRango,
            materialRecomendado: materialRecomendado,
            norma: this.materiales[materialRecomendado].norma,
            observacion: observacion,
            definidoPorIngeniero: diametroDefinido ? true : false
        };
    },

    /**
     * TUBERÍA DE REBOSE
     * Debe evacuar el caudal de alimentación cuando el estanque está lleno
     * @param {number} caudalAlimentacion - Caudal de alimentación en L/min
     * @returns {object} - Información completa de la tubería
     */
    calcularTuberiaRebose: function(caudalAlimentacion) {
        // Rebose debe evacuar 1.5 veces el caudal de alimentación (seguridad)
        const caudalRebose = caudalAlimentacion * 1.5;
        
        const velocidadOptima = this.velocidades.rebose.optima;
        const diametroTeorico = this.calcularDiametroTeorico(caudalRebose, velocidadOptima);
        const diametroComercial = this.seleccionarDiametroComercial(diametroTeorico);
        const velocidadReal = this.calcularVelocidadReal(caudalRebose, diametroComercial);
        
        const enRango = velocidadReal >= this.velocidades.rebose.min && 
                        velocidadReal <= this.velocidades.rebose.max;
        
        return {
            tipo: 'Rebose',
            caudal: caudalRebose,
            diametroTeorico: diametroTeorico,
            diametroComercial: diametroComercial,
            diametroPulgadas: this.convertirAPulgadas(diametroComercial),
            velocidadReal: velocidadReal,
            velocidadOptima: velocidadOptima,
            enRango: enRango,
            materialRecomendado: 'PVC-P-10',
            norma: 'NCh399/1',
            observacion: 'Descarga libre a punto visible según NCh691'
        };
    },

    /**
     * TUBERÍA DE LIMPIEZA/DESAGÜE
     * Debe vaciar el estanque en tiempo razonable (2-4 horas)
     * @param {number} volumenEstanque - Volumen del estanque en m³
     * @param {number} tiempoVaciadoDeseado - Tiempo de vaciado en horas (default: 3)
     * @returns {object} - Información completa de la tubería
     */
    calcularTuberiaDesague: function(volumenEstanque, tiempoVaciadoDeseado = 3) {
        // Caudal necesario para vaciar en el tiempo deseado
        const caudalM3h = volumenEstanque / tiempoVaciadoDeseado;
        const caudalLmin = (caudalM3h * 1000) / 60;
        
        const velocidadOptima = this.velocidades.desague.optima;
        const diametroTeorico = this.calcularDiametroTeorico(caudalLmin, velocidadOptima);
        const diametroComercial = this.seleccionarDiametroComercial(diametroTeorico);
        const velocidadReal = this.calcularVelocidadReal(caudalLmin, diametroComercial);
        
        const enRango = velocidadReal >= this.velocidades.desague.min && 
                        velocidadReal <= this.velocidades.desague.max;
        
        return {
            tipo: 'Limpieza/Desagüe',
            caudal: caudalLmin,
            tiempoVaciado: tiempoVaciadoDeseado,
            diametroTeorico: diametroTeorico,
            diametroComercial: diametroComercial,
            diametroPulgadas: this.convertirAPulgadas(diametroComercial),
            velocidadReal: velocidadReal,
            velocidadOptima: velocidadOptima,
            enRango: enRango,
            materialRecomendado: 'PVC-P-10',
            norma: 'NCh399/1',
            observacion: 'Válvula en punto más bajo del estanque'
        };
    },

    /**
     * Convertir diámetro en mm a pulgadas (aproximado)
     * @param {number} diametroMm - Diámetro en mm
     * @returns {string} - Diámetro en pulgadas
     */
    convertirAPulgadas: function(diametroMm) {
        const equivalencias = {
            20: '1/2"',
            25: '3/4"',
            32: '1"',
            40: '1 1/4"',
            50: '1 1/2"',
            63: '2"',
            75: '2 1/2"',
            90: '3"',
            110: '4"',
            125: '5"',
            140: '5 1/2"',
            160: '6"',
            200: '8"',
            250: '10"',
            315: '12"',
            355: '14"',
            400: '16"'
        };
        
        return equivalencias[diametroMm] || `DN ${diametroMm}`;
    },

    /**
     * CÁLCULO COMPLETO DE TODAS LAS TUBERÍAS
     * @param {object} datos - Datos del proyecto
     * @returns {object} - Todas las tuberías calculadas
     */
    calcularTodasLasTuberias: function(datos) {
        const {
            volumenEstanque,
            caudalBomba,
            presionBomba,
            tiempoLlenado = 4,
            tiempoVaciado = 3,
            diametroAlimentacion = null,  // Diámetro definido por ingeniero
            diametroImpulsion = null      // Diámetro definido por ingeniero
        } = datos;

        // Calcular cada tubería (con diámetros definidos si existen)
        const alimentacion = this.calcularTuberiaAlimentacion(
            volumenEstanque, 
            tiempoLlenado,
            diametroAlimentacion
        );
        const impulsion = this.calcularTuberiaImpulsion(
            caudalBomba, 
            presionBomba,
            diametroImpulsion
        );
        const rebose = this.calcularTuberiaRebose(alimentacion.caudal);
        const desague = this.calcularTuberiaDesague(volumenEstanque, tiempoVaciado);

        return {
            alimentacion,
            impulsion,
            rebose,
            desague,
            resumen: this.generarResumen([alimentacion, impulsion, rebose, desague])
        };
    },

    /**
     * Generar resumen de tuberías
     */
    generarResumen: function(tuberias) {
        return {
            totalTuberias: tuberias.length,
            diametroMaximo: Math.max(...tuberias.map(t => t.diametroComercial)),
            diametroMinimo: Math.min(...tuberias.map(t => t.diametroComercial)),
            todasEnRango: tuberias.every(t => t.enRango)
        };
    },

    /**
     * Generar HTML para mostrar resultados
     */
    generarHTMLResultados: function(tuberias) {
        let html = '<div class="tuberias-resultados">';
        html += '<h3>📏 Dimensionamiento de Tuberías según NCh691</h3>';
        
        const tuberiasArray = [
            tuberias.alimentacion,
            tuberias.impulsion,
            tuberias.rebose,
            tuberias.desague
        ];

        tuberiasArray.forEach(tuberia => {
            html += `
                <div class="tuberia-item ${tuberia.enRango ? 'valida' : 'advertencia'}">
                    <h4>${tuberia.tipo}${tuberia.definidoPorIngeniero ? ' <span style="color:#e67e22;">⚙️ Definido por Ingeniero</span>' : ''}</h4>
                    <div class="tuberia-specs">
                        <div class="spec-row">
                            <span class="label">Diámetro Comercial:</span>
                            <span class="value destacado">${tuberia.diametroComercial} mm (${tuberia.diametroPulgadas})</span>
                        </div>
                        <div class="spec-row">
                            <span class="label">Caudal:</span>
                            <span class="value">${tuberia.caudal.toFixed(1)} L/min</span>
                        </div>
                        <div class="spec-row">
                            <span class="label">Velocidad Real:</span>
                            <span class="value">${tuberia.velocidadReal.toFixed(2)} m/s</span>
                        </div>
                        <div class="spec-row">
                            <span class="label">Material:</span>
                            <span class="value">${tuberia.materialRecomendado}</span>
                        </div>
                        <div class="spec-row">
                            <span class="label">Norma:</span>
                            <span class="value">${tuberia.norma}</span>
                        </div>
                        ${tuberia.tiempoLlenado ? `
                        <div class="spec-row">
                            <span class="label">Tiempo de Llenado:</span>
                            <span class="value">${tuberia.tiempoLlenado} horas</span>
                        </div>
                        ` : ''}
                        ${tuberia.tiempoVaciado ? `
                        <div class="spec-row">
                            <span class="label">Tiempo de Vaciado:</span>
                            <span class="value">${tuberia.tiempoVaciado} horas</span>
                        </div>
                        ` : ''}
                        <div class="spec-row observacion">
                            <span class="value">${tuberia.enRango ? '✓' : '⚠'} ${tuberia.observacion}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalculoTuberias;
}