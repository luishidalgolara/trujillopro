/**
 * CATÁLOGO DE BOMBAS - MERCADO CHILENO
 * Base de datos de bombas centrífugas disponibles en Chile
 * Filtrado automático según requisitos calculados
 * Versión: 1.0
 */

const CatalogoBombas = {
    
    /**
     * Base de datos de bombas del mercado chileno
     * Datos actualizados según catálogos 2024-2025
     */
    baseDatos: [
        // ========== PEDROLLO ==========
        {
            marca: 'Pedrollo',
            modelo: 'CPm 158',
            potencia: 1.5,
            presionMax: 50,
            caudalNominal: 150,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 450000,
            eficiencia: 'Alta',
            aplicacion: 'Residencial/Comercial'
        },
        {
            marca: 'Pedrollo',
            modelo: 'CPm 170',
            potencia: 2.0,
            presionMax: 65,
            caudalNominal: 180,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 580000,
            eficiencia: 'Alta',
            aplicacion: 'Residencial/Comercial'
        },
        {
            marca: 'Pedrollo',
            modelo: 'CPm 200',
            potencia: 3.0,
            presionMax: 75,
            caudalNominal: 220,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 720000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Comercial/Industrial'
        },
        {
            marca: 'Pedrollo',
            modelo: 'CP 150',
            potencia: 1.0,
            presionMax: 42,
            caudalNominal: 120,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 380000,
            eficiencia: 'Media',
            aplicacion: 'Residencial'
        },
        {
            marca: 'Pedrollo',
            modelo: 'CP 190',
            potencia: 2.5,
            presionMax: 68,
            caudalNominal: 200,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 650000,
            eficiencia: 'Alta',
            aplicacion: 'Comercial'
        },
        
        // ========== GRUNDFOS ==========
        {
            marca: 'Grundfos',
            modelo: 'CMB 3-46',
            potencia: 3.0,
            presionMax: 46,
            caudalNominal: 125,
            tipo: 'Centrífuga Vertical',
            precioAprox: 850000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Comercial/Industrial'
        },
        {
            marca: 'Grundfos',
            modelo: 'CMB 5-47',
            potencia: 5.0,
            presionMax: 47,
            caudalNominal: 180,
            tipo: 'Centrífuga Vertical',
            precioAprox: 1200000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial'
        },
        {
            marca: 'Grundfos',
            modelo: 'CR 3-8',
            potencia: 2.0,
            presionMax: 55,
            caudalNominal: 140,
            tipo: 'Centrífuga Vertical',
            precioAprox: 680000,
            eficiencia: 'Alta',
            aplicacion: 'Residencial/Comercial'
        },
        {
            marca: 'Grundfos',
            modelo: 'CR 5-10',
            potencia: 3.5,
            presionMax: 60,
            caudalNominal: 190,
            tipo: 'Centrífuga Vertical',
            precioAprox: 920000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Comercial/Industrial'
        },
        {
            marca: 'Grundfos',
            modelo: 'CH 2-30',
            potencia: 1.5,
            presionMax: 48,
            caudalNominal: 130,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 520000,
            eficiencia: 'Alta',
            aplicacion: 'Residencial/Comercial'
        },
        
        // ========== EBARA ==========
        {
            marca: 'Ebara',
            modelo: 'CDX 120/12',
            potencia: 3.0,
            presionMax: 48,
            caudalNominal: 140,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 690000,
            eficiencia: 'Alta',
            aplicacion: 'Residencial/Comercial'
        },
        {
            marca: 'Ebara',
            modelo: 'CDX 200/20',
            potencia: 5.0,
            presionMax: 65,
            caudalNominal: 200,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 980000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial'
        },
        {
            marca: 'Ebara',
            modelo: 'COMPACT AM/8',
            potencia: 2.0,
            presionMax: 52,
            caudalNominal: 150,
            tipo: 'Centrífuga Vertical',
            precioAprox: 620000,
            eficiencia: 'Alta',
            aplicacion: 'Residencial/Comercial'
        },
        {
            marca: 'Ebara',
            modelo: 'JESX 8',
            potencia: 1.5,
            presionMax: 45,
            caudalNominal: 135,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 480000,
            eficiencia: 'Media-Alta',
            aplicacion: 'Residencial'
        },
        {
            marca: 'Ebara',
            modelo: 'MD 32-200',
            potencia: 4.0,
            presionMax: 70,
            caudalNominal: 210,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 1100000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial'
        },
        
        // ========== LOWARA (XYLEM) ==========
        {
            marca: 'Lowara',
            modelo: 'CEA 120/3',
            potencia: 2.5,
            presionMax: 58,
            caudalNominal: 160,
            tipo: 'Centrífuga Vertical',
            precioAprox: 710000,
            eficiencia: 'Alta',
            aplicacion: 'Comercial'
        },
        {
            marca: 'Lowara',
            modelo: 'HM 32-160/22',
            potencia: 3.0,
            presionMax: 62,
            caudalNominal: 175,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 780000,
            eficiencia: 'Alta',
            aplicacion: 'Comercial/Industrial'
        },
        {
            marca: 'Lowara',
            modelo: 'SV 210',
            potencia: 1.5,
            presionMax: 50,
            caudalNominal: 145,
            tipo: 'Sumergible',
            precioAprox: 550000,
            eficiencia: 'Alta',
            aplicacion: 'Residencial/Comercial'
        },
        
        // ========== KSB ==========
        {
            marca: 'KSB',
            modelo: 'Movitec VF 04-8',
            potencia: 2.0,
            presionMax: 54,
            caudalNominal: 155,
            tipo: 'Centrífuga Vertical',
            precioAprox: 820000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Comercial'
        },
        {
            marca: 'KSB',
            modelo: 'Movitec VF 06-9',
            potencia: 3.5,
            presionMax: 68,
            caudalNominal: 195,
            tipo: 'Centrífuga Vertical',
            precioAprox: 1050000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial'
        },
        {
            marca: 'KSB',
            modelo: 'Etabloc GN 32-160',
            potencia: 2.5,
            presionMax: 56,
            caudalNominal: 165,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 890000,
            eficiencia: 'Alta',
            aplicacion: 'Comercial/Industrial'
        },
        
        // ========== FRANKLIN ELECTRIC ==========
        {
            marca: 'Franklin',
            modelo: 'Inline 1500',
            potencia: 1.5,
            presionMax: 47,
            caudalNominal: 138,
            tipo: 'Centrífuga Inline',
            precioAprox: 470000,
            eficiencia: 'Media-Alta',
            aplicacion: 'Residencial/Comercial'
        },
        {
            marca: 'Franklin',
            modelo: 'Inline 2200',
            potencia: 2.2,
            presionMax: 60,
            caudalNominal: 170,
            tipo: 'Centrífuga Inline',
            precioAprox: 590000,
            eficiencia: 'Alta',
            aplicacion: 'Comercial'
        },
        {
            marca: 'Franklin',
            modelo: 'Inline 3000',
            potencia: 3.0,
            presionMax: 64,
            caudalNominal: 185,
            tipo: 'Centrífuga Inline',
            precioAprox: 720000,
            eficiencia: 'Alta',
            aplicacion: 'Comercial/Industrial'
        },
        
        // ========== BOMBAS COMPACTAS / BOOSTER ==========
        {
            marca: 'Pedrollo',
            modelo: 'PKm 60',
            potencia: 0.5,
            presionMax: 35,
            caudalNominal: 80,
            tipo: 'Periférica',
            precioAprox: 250000,
            eficiencia: 'Media',
            aplicacion: 'Residencial Pequeño'
        },
        {
            marca: 'Grundfos',
            modelo: 'Scala2',
            potencia: 0.8,
            presionMax: 45,
            caudalNominal: 100,
            tipo: 'Booster Compacto',
            precioAprox: 380000,
            eficiencia: 'Alta',
            aplicacion: 'Residencial'
        },
        {
            marca: 'Ebara',
            modelo: 'ACIM 15',
            potencia: 1.0,
            presionMax: 40,
            caudalNominal: 110,
            tipo: 'Periférica',
            precioAprox: 320000,
            eficiencia: 'Media',
            aplicacion: 'Residencial'
        },
        
        // ========== BOMBAS INDUSTRIALES - ALTA POTENCIA (7.5-15 HP) ==========
        {
            marca: 'Grundfos',
            modelo: 'CR 10-12',
            potencia: 7.5,
            presionMax: 85,
            caudalNominal: 280,
            tipo: 'Centrífuga Vertical',
            precioAprox: 1450000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Altos'
        },
        {
            marca: 'Grundfos',
            modelo: 'CR 15-10',
            potencia: 10,
            presionMax: 90,
            caudalNominal: 350,
            tipo: 'Centrífuga Vertical',
            precioAprox: 1850000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Altos'
        },
        {
            marca: 'KSB',
            modelo: 'Movitec VF 10-12',
            potencia: 7.5,
            presionMax: 88,
            caudalNominal: 290,
            tipo: 'Centrífuga Vertical',
            precioAprox: 1520000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Altos'
        },
        {
            marca: 'KSB',
            modelo: 'Movitec VF 15-10',
            potencia: 10,
            presionMax: 95,
            caudalNominal: 360,
            tipo: 'Centrífuga Vertical',
            precioAprox: 1920000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Altos'
        },
        {
            marca: 'Ebara',
            modelo: 'MD 50-250',
            potencia: 7.5,
            presionMax: 82,
            caudalNominal: 300,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 1380000,
            eficiencia: 'Alta',
            aplicacion: 'Industrial/Edificios Altos'
        },
        {
            marca: 'Ebara',
            modelo: 'MD 65-250',
            potencia: 10,
            presionMax: 92,
            caudalNominal: 380,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 1780000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Altos'
        },
        {
            marca: 'Ebara',
            modelo: '3D 50-200/7.5',
            potencia: 12.5,
            presionMax: 100,
            caudalNominal: 420,
            tipo: 'Centrífuga Multietapa',
            precioAprox: 2150000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Muy Altos'
        },
        {
            marca: 'Pedrollo',
            modelo: 'NK 65-200',
            potencia: 7.5,
            presionMax: 80,
            caudalNominal: 270,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 1320000,
            eficiencia: 'Alta',
            aplicacion: 'Industrial/Edificios Altos'
        },
        {
            marca: 'Lowara',
            modelo: 'e-HM 50-200/40',
            potencia: 10,
            presionMax: 94,
            caudalNominal: 370,
            tipo: 'Centrífuga Horizontal',
            precioAprox: 1890000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Altos'
        },
        {
            marca: 'Grundfos',
            modelo: 'CR 20-8',
            potencia: 12.5,
            presionMax: 98,
            caudalNominal: 400,
            tipo: 'Centrífuga Vertical',
            precioAprox: 2050000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Muy Altos'
        },
        {
            marca: 'KSB',
            modelo: 'Movitec VF 20-8',
            potencia: 15,
            presionMax: 105,
            caudalNominal: 450,
            tipo: 'Centrífuga Vertical',
            precioAprox: 2480000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Muy Altos'
        },
        {
            marca: 'Ebara',
            modelo: '3D 65-200/9.2',
            potencia: 15,
            presionMax: 110,
            caudalNominal: 480,
            tipo: 'Centrífuga Multietapa',
            precioAprox: 2650000,
            eficiencia: 'Muy Alta',
            aplicacion: 'Industrial/Edificios Muy Altos'
        }
    ],

    /**
     * Filtrar bombas según requerimientos calculados
     * @param {number} presionRequerida - Presión en m.c.a
     * @param {number} caudalRequerido - Caudal en L/min
     * @param {number} potenciaCalculada - Potencia en HP
     * @param {number} numOpciones - Cantidad de opciones a retornar (default: 5)
     * @returns {Array} Array de bombas que cumplen los requisitos
     */
    filtrarPorRequerimientos: function(presionRequerida, caudalRequerido, potenciaCalculada, numOpciones = 5) {
        // Márgenes de seguridad
        const margenPresion = 1.10;  // +10% sobre presión requerida
        const margenCaudal = 1.15;   // +15% sobre caudal requerido
        const margenPotencia = potenciaCalculada > 5 ? 3 : 1;  // Mayor tolerancia para edificios grandes
        
        // Calcular valores objetivo con márgenes
        const presionObjetivo = presionRequerida * margenPresion;
        const caudalObjetivo = caudalRequerido * margenCaudal;
        
        // Filtrar bombas que cumplan los requisitos
        const bombasAdecuadas = this.baseDatos.filter(bomba => {
            const cumplePresion = bomba.presionMax >= presionObjetivo;
            const cumpleCaudal = bomba.caudalNominal >= caudalObjetivo;
            const cumplePotencia = Math.abs(bomba.potencia - potenciaCalculada) <= margenPotencia + 1;
            
            return cumplePresion && cumpleCaudal && cumplePotencia;
        });
        
        // Si no hay bombas exactas, ampliar búsqueda
        if (bombasAdecuadas.length === 0) {
            return this.baseDatos
                .filter(bomba => {
                    return bomba.presionMax >= presionRequerida * 0.95 && 
                           bomba.caudalNominal >= caudalRequerido * 0.90;
                })
                .sort((a, b) => {
                    // Ordenar por cercanía a requisitos
                    const scoreA = this.calcularScore(a, presionRequerida, caudalRequerido, potenciaCalculada);
                    const scoreB = this.calcularScore(b, presionRequerida, caudalRequerido, potenciaCalculada);
                    return scoreB - scoreA;
                })
                .slice(0, numOpciones);
        }
        
        // Ordenar por mejor relación calidad-precio y score
        bombasAdecuadas.sort((a, b) => {
            const scoreA = this.calcularScore(a, presionRequerida, caudalRequerido, potenciaCalculada);
            const scoreB = this.calcularScore(b, presionRequerida, caudalRequerido, potenciaCalculada);
            
            // Priorizar por score, luego por precio
            if (Math.abs(scoreA - scoreB) < 0.1) {
                return a.precioAprox - b.precioAprox;
            }
            return scoreB - scoreA;
        });
        
        return bombasAdecuadas.slice(0, numOpciones);
    },

    /**
     * Calcular score de adecuación de una bomba
     * Mientras más cercano a 1.0, mejor se ajusta a los requisitos
     */
    calcularScore: function(bomba, presionReq, caudalReq, potenciaReq) {
        // Penalizar sobredimensionamiento excesivo
        const ratioPresion = bomba.presionMax / (presionReq * 1.10);
        const ratioCaudal = bomba.caudalNominal / (caudalReq * 1.15);
        const ratioPotencia = bomba.potencia / potenciaReq;
        
        // Score ideal cuando ratios están cerca de 1.0
        const scorePresion = ratioPresion >= 1 ? (1 / Math.pow(ratioPresion, 0.5)) : 0;
        const scoreCaudal = ratioCaudal >= 1 ? (1 / Math.pow(ratioCaudal, 0.5)) : 0;
        const scorePotencia = 1 / (1 + Math.abs(ratioPotencia - 1));
        
        // Bonus por eficiencia
        const bonusEficiencia = bomba.eficiencia === 'Muy Alta' ? 1.15 : 
                               bomba.eficiencia === 'Alta' ? 1.05 : 1.0;
        
        return (scorePresion * 0.4 + scoreCaudal * 0.4 + scorePotencia * 0.2) * bonusEficiencia;
    },

    /**
     * Formatear precio en formato chileno
     */
    formatearPrecio: function(precio) {
        return '$' + precio.toLocaleString('es-CL');
    },

    /**
     * Generar HTML con las opciones de bombas
     */
    generarHTMLOpciones: function(bombas, presionReq, caudalReq, potenciaReq) {
        if (!bombas || bombas.length === 0) {
            return `
                <div class="sin-opciones">
                    <p>⚠️ No se encontraron bombas que cumplan exactamente los requisitos.</p>
                    <p>Se recomienda consultar con un especialista para una solución personalizada.</p>
                </div>
            `;
        }

        let html = '<div class="opciones-bombas">';
        
        // Requisitos calculados
        html += `
            <div class="requisitos-calculo">
                <h3>📋 Requisitos Calculados:</h3>
                <ul>
                    <li><strong>Presión:</strong> ${presionReq.toFixed(1)} m.c.a (mín. ${(presionReq * 1.10).toFixed(1)} m.c.a recomendado)</li>
                    <li><strong>Caudal:</strong> ${caudalReq.toFixed(0)} L/min (mín. ${(caudalReq * 1.15).toFixed(0)} L/min recomendado)</li>
                    <li><strong>Potencia:</strong> ${potenciaReq.toFixed(1)} HP</li>
                </ul>
            </div>
            <hr>
            <h3>✅ Opciones de Bombas Recomendadas:</h3>
        `;

        // Lista de bombas
        bombas.forEach((bomba, index) => {
            const score = this.calcularScore(bomba, presionReq, caudalReq, potenciaReq);
            const porcentajeMatch = Math.min(100, (score * 100)).toFixed(0);
            
            html += `
                <div class="bomba-opcion ${index === 0 ? 'mejor-opcion' : ''}">
                    ${index === 0 ? '<span class="badge-mejor">🏆 MEJOR OPCIÓN</span>' : ''}
                    <div class="bomba-header">
                        <h4>${bomba.marca} ${bomba.modelo}</h4>
                        <span class="match-score">${porcentajeMatch}% Match</span>
                    </div>
                    <div class="bomba-specs">
                        <div class="spec-item">
                            <span class="spec-label">Potencia:</span>
                            <span class="spec-value">${bomba.potencia} HP</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Presión Máx:</span>
                            <span class="spec-value">${bomba.presionMax} m.c.a</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Caudal Nominal:</span>
                            <span class="spec-value">${bomba.caudalNominal} L/min</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Tipo:</span>
                            <span class="spec-value">${bomba.tipo}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Eficiencia:</span>
                            <span class="spec-value">${bomba.eficiencia}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Aplicación:</span>
                            <span class="spec-value">${bomba.aplicacion}</span>
                        </div>
                        <div class="spec-item precio-item">
                            <span class="spec-label">Precio Aprox:</span>
                            <span class="spec-value precio">${this.formatearPrecio(bomba.precioAprox)}</span>
                        </div>
                    </div>
                    ${this.generarIndicadorAdecuacion(bomba, presionReq, caudalReq, potenciaReq)}
                </div>
            `;
        });

        html += '</div>';
        html += `
            <div class="nota-precios">
                <small>💡 <strong>Nota:</strong> Precios aproximados en pesos chilenos (CLP), pueden variar según proveedor y condiciones. 
                Se recomienda solicitar cotización formal. Considerar costos de instalación, accesorios y mantención.</small>
            </div>
        `;

        return html;
    },

    /**
     * Generar indicadores visuales de adecuación
     */
    generarIndicadorAdecuacion: function(bomba, presionReq, caudalReq, potenciaReq) {
        const cumplePresion = bomba.presionMax >= presionReq * 1.10;
        const cumpleCaudal = bomba.caudalNominal >= caudalReq * 1.15;
        const cumplePotencia = Math.abs(bomba.potencia - potenciaReq) <= 0.5;

        let html = '<div class="indicadores-adecuacion">';
        
        html += `<div class="indicador ${cumplePresion ? 'cumple' : 'no-cumple'}">`;
        html += cumplePresion ? '✓' : '✗';
        html += ' Presión</div>';
        
        html += `<div class="indicador ${cumpleCaudal ? 'cumple' : 'no-cumple'}">`;
        html += cumpleCaudal ? '✓' : '✗';
        html += ' Caudal</div>';
        
        html += `<div class="indicador ${cumplePotencia ? 'cumple' : 'ajustada'}">`;
        html += cumplePotencia ? '✓' : '~';
        html += ' Potencia</div>';
        
        html += '</div>';
        return html;
    },

    /**
     * Mostrar opciones en el DOM
     */
    mostrarOpciones: function(presionRequerida, caudalRequerido, potenciaCalculada, contenedorId = 'opcionesBombas') {
        const bombas = this.filtrarPorRequerimientos(presionRequerida, caudalRequerido, potenciaCalculada);
        const html = this.generarHTMLOpciones(bombas, presionRequerida, caudalRequerido, potenciaCalculada);
        
        const contenedor = document.getElementById(contenedorId);
        if (contenedor) {
            contenedor.innerHTML = html;
        } else {
            console.error(`No se encontró el contenedor con ID: ${contenedorId}`);
        }
    },

    /**
     * Obtener estadísticas del catálogo
     */
    obtenerEstadisticas: function() {
        const marcas = [...new Set(this.baseDatos.map(b => b.marca))];
        const potenciaMin = Math.min(...this.baseDatos.map(b => b.potencia));
        const potenciaMax = Math.max(...this.baseDatos.map(b => b.potencia));
        const precioMin = Math.min(...this.baseDatos.map(b => b.precioAprox));
        const precioMax = Math.max(...this.baseDatos.map(b => b.precioAprox));

        return {
            totalBombas: this.baseDatos.length,
            marcas: marcas,
            cantidadMarcas: marcas.length,
            rangosPotencia: `${potenciaMin} - ${potenciaMax} HP`,
            rangosPrecios: `${this.formatearPrecio(precioMin)} - ${this.formatearPrecio(precioMax)}`,
            tiposBombas: [...new Set(this.baseDatos.map(b => b.tipo))]
        };
    }
};

// Estilos CSS para las opciones de bombas (agregar al CSS principal)
const estilosCatalogoBombas = `
<style>
.opciones-bombas {
    margin-top: 20px;
}

.requisitos-calculo {
    background: #E8F4F8;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.requisitos-calculo h3 {
    margin-top: 0;
    color: #0066CC;
}

.requisitos-calculo ul {
    margin: 10px 0;
    padding-left: 25px;
}

.bomba-opcion {
    background: white;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    position: relative;
    transition: all 0.3s ease;
}

.bomba-opcion:hover {
    border-color: #0066CC;
    box-shadow: 0 4px 12px rgba(0,102,204,0.15);
}

.bomba-opcion.mejor-opcion {
    border-color: #28a745;
    background: #f0fff4;
}

.badge-mejor {
    position: absolute;
    top: -10px;
    right: 15px;
    background: #28a745;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
}

.bomba-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
}

.bomba-header h4 {
    margin: 0;
    color: #333;
    font-size: 18px;
}

.match-score {
    background: #0066CC;
    color: white;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
}

.bomba-specs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    margin-bottom: 15px;
}

.spec-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background: #f8f9fa;
    border-radius: 4px;
}

.spec-label {
    font-weight: 600;
    color: #666;
}

.spec-value {
    color: #333;
    font-weight: 500;
}

.precio-item {
    background: #FFF9E6;
    border: 1px solid #FFD700;
}

.spec-value.precio {
    color: #CC8800;
    font-weight: bold;
    font-size: 16px;
}

.indicadores-adecuacion {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.indicador {
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
}

.indicador.cumple {
    background: #d4edda;
    color: #155724;
}

.indicador.no-cumple {
    background: #f8d7da;
    color: #721c24;
}

.indicador.ajustada {
    background: #fff3cd;
    color: #856404;
}

.sin-opciones {
    background: #fff3cd;
    border: 2px solid #ffc107;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
}

.nota-precios {
    background: #e7f3ff;
    border-left: 4px solid #0066CC;
    padding: 15px;
    margin-top: 20px;
    border-radius: 4px;
}

.nota-precios small {
    color: #0066CC;
    line-height: 1.6;
}
</style>
`;

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CatalogoBombas;
}