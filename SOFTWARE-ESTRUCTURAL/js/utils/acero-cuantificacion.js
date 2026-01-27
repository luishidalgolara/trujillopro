/**
 * MÓDULO DE CUANTIFICACIÓN DE ACERO
 * Calcula cantidades exactas, longitudes, pesos y lista de compra
 */

const CuantificacionAcero = {
    
    // Propiedades del acero
    densidad: 7850, // kg/m³
    
    // Pesos por metro lineal según diámetro (kg/m)
    pesosPorMetro: {
        6: 0.222,
        8: 0.395,
        10: 0.617,
        12: 0.888,
        16: 1.578,
        18: 2.000,
        20: 2.466,
        22: 2.984,
        25: 3.853,
        28: 4.834,
        32: 6.313
    },
    
    // Longitudes comerciales disponibles (m)
    longitudesComerciales: [6, 9, 12],
    
    /**
     * Calcula longitud de anclaje según NCh430
     * @param {number} diametro - Diámetro de barra (mm)
     * @param {number} fy - Tensión de fluencia (MPa)
     * @param {number} fc - Resistencia del hormigón (MPa)
     * @returns {number} Longitud de anclaje (m)
     */
    calcularLongitudAnclaje: function(diametro, fy, fc) {
        const db = diametro / 1000; // Convertir a metros
        // Ld = 0.019 * db * fy / √fc (NCh430)
        const Ld = 0.019 * db * fy / Math.sqrt(fc);
        return Math.max(Ld, 0.30); // Mínimo 30cm
    },
    
    /**
     * Calcula longitud de traslape
     * @param {number} diametro - Diámetro de barra (mm)
     * @param {number} fy - Tensión de fluencia (MPa)
     * @param {number} fc - Resistencia del hormigón (MPa)
     * @returns {number} Longitud de traslape (m)
     */
    calcularLongitudTraslape: function(diametro, fy, fc) {
        const Ld = this.calcularLongitudAnclaje(diametro, fy, fc);
        // Traslape = 1.3 * Ld (típico Clase B)
        return 1.3 * Ld;
    },
    
    /**
     * Cuantifica barras longitudinales
     * @param {Object} params - {longitud, cantidad, diametro, fy, fc, conTraslape}
     * @returns {Object} Resultado de cuantificación
     */
    cuantificarBarrasLongitudinales: function(params) {
        const { longitud, cantidad, diametro, fy, fc, conTraslape = true } = params;
        
        let longitudPorBarra = longitud;
        
        // Agregar anclajes en extremos
        const Ld = this.calcularLongitudAnclaje(diametro, fy, fc);
        longitudPorBarra += 2 * Ld;
        
        // Si requiere traslape (barras muy largas)
        let numBarrasPorLinea = 1;
        if (longitudPorBarra > 12 && conTraslape) {
            const Lt = this.calcularLongitudTraslape(diametro, fy, fc);
            numBarrasPorLinea = Math.ceil(longitudPorBarra / 11); // Traslapes cada 11m
            longitudPorBarra = (longitudPorBarra + (numBarrasPorLinea - 1) * Lt) / numBarrasPorLinea;
        }
        
        // Ajustar a longitud comercial
        const longitudComercial = this.ajustarLongitudComercial(longitudPorBarra);
        
        const totalBarras = cantidad * numBarrasPorLinea;
        const metrosLineales = totalBarras * longitudComercial;
        const peso = metrosLineales * this.pesosPorMetro[diametro];
        
        return {
            diametro: diametro,
            longitudPorBarra: longitudComercial.toFixed(2),
            cantidadBarras: totalBarras,
            metrosLineales: metrosLineales.toFixed(2),
            peso: peso.toFixed(2),
            longitudAnclaje: Ld.toFixed(2),
            numTraslapes: (numBarrasPorLinea - 1) * cantidad,
            longitudTraslape: conTraslape ? this.calcularLongitudTraslape(diametro, fy, fc).toFixed(2) : 0
        };
    },
    
    /**
     * Cuantifica estribos/amarres
     * @param {Object} params - {altura, ancho, separacion, cantidad, diametro, longitud}
     * @returns {Object} Resultado de cuantificación
     */
    cuantificarEstribos: function(params) {
        const { altura, ancho, separacion, cantidad, diametro, longitudElemento } = params;
        
        // Perímetro de estribo + ganchos (10cm cada uno)
        const perimetroEstribo = 2 * (altura + ancho) + 0.20; // m
        
        // Cantidad de estribos por elemento
        const numEstribos = Math.ceil(longitudElemento / (separacion / 100)); // separacion en cm
        
        const totalEstribos = numEstribos * cantidad;
        const metrosLineales = totalEstribos * perimetroEstribo;
        const peso = metrosLineales * this.pesosPorMetro[diametro];
        
        return {
            diametro: diametro,
            separacion: separacion,
            numeroEstribos: totalEstribos,
            metrosLineales: metrosLineales.toFixed(2),
            peso: peso.toFixed(2)
        };
    },
    
    /**
     * Cuantifica malla de acero (losas, pisos)
     * @param {Object} params - {area, diametro, espaciamiento, dobleParrilla}
     * @returns {Object} Resultado de cuantificación
     */
    cuantificarMalla: function(params) {
        const { area, diametro, espaciamiento, dobleParrilla = true } = params;
        
        const lado = Math.sqrt(area);
        const numBarras = Math.ceil(lado / (espaciamiento / 100));
        const longitudPorBarra = lado;
        
        let totalBarras = numBarras * 2; // Ambas direcciones
        if (dobleParrilla) totalBarras *= 2; // Superior e inferior
        
        const metrosLineales = totalBarras * longitudPorBarra;
        const peso = metrosLineales * this.pesosPorMetro[diametro];
        
        return {
            diametro: diametro,
            espaciamiento: espaciamiento,
            barrasDireccionX: numBarras,
            barrasDireccionY: numBarras,
            dobleParrilla: dobleParrilla,
            totalBarras: totalBarras,
            metrosLineales: metrosLineales.toFixed(2),
            peso: peso.toFixed(2)
        };
    },
    
    /**
     * Ajusta longitud a comercial disponible
     */
    ajustarLongitudComercial: function(longitud) {
        for (let lc of this.longitudesComerciales) {
            if (longitud <= lc) return lc;
        }
        return 12; // Máxima longitud comercial
    },
    
    /**
     * Genera lista de compra optimizada
     * @param {Array} barras - Array de objetos con cuantificación
     * @returns {Object} Lista de compra
     */
    generarListaCompra: function(barras) {
        const compra = {};
        
        barras.forEach(barra => {
            const key = `φ${barra.diametro}`;
            if (!compra[key]) {
                compra[key] = {
                    diametro: barra.diametro,
                    cantidad: 0,
                    metrosLineales: 0,
                    peso: 0
                };
            }
            compra[key].cantidad += parseInt(barra.cantidadBarras || barra.totalBarras || 0);
            compra[key].metrosLineales += parseFloat(barra.metrosLineales);
            compra[key].peso += parseFloat(barra.peso);
        });
        
        return compra;
    },
    
    /**
     * Calcula alambre de amarre necesario
     * @param {number} numeroBarras - Total de barras
     * @returns {Object} Cantidad de alambre
     */
    calcularAlambreAmarre: function(numeroBarras) {
        // Regla práctica: 15 kg de alambre por tonelada de acero
        // O aproximadamente 3-4 amarres por barra
        const kgAlambre = Math.ceil(numeroBarras * 0.05); // 50g por barra aproximado
        
        return {
            peso: kgAlambre,
            rollos: Math.ceil(kgAlambre / 10) // Rollos de 10kg
        };
    },
    
    /**
     * Calcula separadores necesarios
     * @param {number} area - Área de elemento (m²)
     * @returns {Object} Cantidad de separadores
     */
    calcularSeparadores: function(area) {
        // Regla práctica: 4-5 separadores por m²
        const cantidad = Math.ceil(area * 4.5);
        
        return {
            cantidad: cantidad,
            tipo: 'Separadores tipo rueda o dado'
        };
    },
    
    /**
     * Genera reporte completo de cuantificación
     * @param {Object} datos - Datos del elemento
     * @returns {String} HTML del reporte
     */
    generarReporte: function(datos) {
        let html = '<div class="reporte-acero">';
        html += '<h3>📊 Cuantificación de Acero</h3>';
        
        // Resumen de barras principales
        if (datos.barrasPrincipales) {
            html += '<h4>Barras Principales:</h4>';
            datos.barrasPrincipales.forEach(barra => {
                html += `<div class="item-acero">
                    <strong>φ${barra.diametro}:</strong> 
                    ${barra.cantidadBarras} barras x ${barra.longitudPorBarra}m = 
                    ${barra.metrosLineales}m (${barra.peso} kg)
                </div>`;
            });
        }
        
        // Estribos
        if (datos.estribos) {
            html += '<h4>Estribos:</h4>';
            html += `<div class="item-acero">
                <strong>φ${datos.estribos.diametro} @ ${datos.estribos.separacion}cm:</strong> 
                ${datos.estribos.numeroEstribos} unidades = 
                ${datos.estribos.metrosLineales}m (${datos.estribos.peso} kg)
            </div>`;
        }
        
        // Totales
        html += '<h4>📦 Resumen Total:</h4>';
        const pesoTotal = this.calcularPesoTotal(datos);
        html += `<div class="total-acero">
            <strong>Peso Total de Acero:</strong> ${pesoTotal.toFixed(2)} kg<br>
            <strong>Alambre de Amarre:</strong> ${this.calcularAlambreAmarre(datos.totalBarras || 50).peso} kg<br>
        </div>`;
        
        html += '</div>';
        return html;
    },
    
    calcularPesoTotal: function(datos) {
        let total = 0;
        if (datos.barrasPrincipales) {
            datos.barrasPrincipales.forEach(b => total += parseFloat(b.peso));
        }
        if (datos.estribos) {
            total += parseFloat(datos.estribos.peso);
        }
        return total;
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CuantificacionAcero;
}
