/**
 * CÁLCULOS COMUNES
 * Funciones matemáticas y estructurales compartidas
 */

const CalculosComunes = {
    
    /**
     * Calcula el área de acero requerida por flexión
     * @param {number} Mu - Momento último (kN·m)
     * @param {number} b - Ancho de la sección (m)
     * @param {number} d - Altura efectiva (m)
     * @param {number} fc - Resistencia del hormigón (MPa)
     * @param {number} fy - Tensión de fluencia del acero (MPa)
     * @returns {number} Área de acero requerida (cm²)
     */
    calcularAceroFlexion: function(Mu, b, d, fc, fy) {
        const phi = 0.9; // Factor de reducción flexión
        const b_cm = b * 100; // Convertir a cm
        const d_cm = d * 100; // Convertir a cm
        
        // Mu en kN·cm
        const Mu_kncm = Mu * 100;
        
        // Cuantía mecánica
        const omega = 0.85 * fc / fy * (1 - Math.sqrt(1 - 2 * Mu_kncm * 10000 / (phi * 0.85 * fc * b_cm * Math.pow(d_cm, 2))));
        
        // Cuantía de acero
        const rho = omega * fc / fy;
        
        // Área de acero
        const As = rho * b_cm * d_cm;
        
        return As;
    },
    
    /**
     * Calcula el acero mínimo según NCh430
     * @param {number} b - Ancho (cm)
     * @param {number} d - Altura efectiva (cm)
     * @param {number} fy - Tensión de fluencia (MPa)
     * @returns {number} Área de acero mínima (cm²)
     */
    calcularAceroMinimo: function(b, d, fy) {
        const rho_min = Math.max(0.0018, 14 / fy);
        return rho_min * b * d;
    },
    
    /**
     * Calcula el acero máximo según NCh430
     * @param {number} b - Ancho (cm)
     * @param {number} d - Altura efectiva (cm)
     * @param {number} fc - Resistencia del hormigón (MPa)
     * @param {number} fy - Tensión de fluencia (MPa)
     * @returns {number} Área de acero máxima (cm²)
     */
    calcularAceroMaximo: function(b, d, fc, fy) {
        const beta1 = fc <= 30 ? 0.85 : 0.85 - 0.05 * (fc - 30) / 7;
        const rho_max = 0.75 * 0.85 * beta1 * fc / fy * (600 / (600 + fy));
        return rho_max * b * d;
    },
    
    /**
     * Distribuye barras en un ancho dado
     * @param {number} As - Área de acero requerida (cm²)
     * @param {number} ancho - Ancho disponible (cm)
     * @param {Object} diametros - Diámetros a considerar (mm)
     * @returns {Object} Configuración de barras {diametro, cantidad, espaciamiento}
     */
    distribuirBarras: function(As, ancho, diametros = [12, 16, 18, 20, 22, 25]) {
        const soluciones = [];
        
        for (let diam of diametros) {
            const area = NormativaChile.acero.areas[diam] / 100; // cm²
            const cantidad = Math.ceil(As / area);
            
            // Espaciamiento aproximado
            const espaciamiento = cantidad > 1 ? ancho / (cantidad - 1) : ancho;
            
            // Verificar espaciamiento mínimo (3 veces el diámetro o 25mm)
            const espaciamientoMin = Math.max(3 * diam / 10, 2.5); // cm
            
            if (espaciamiento >= espaciamientoMin || cantidad === 1) {
                soluciones.push({
                    diametro: diam,
                    cantidad: cantidad,
                    espaciamiento: espaciamiento.toFixed(1),
                    areaTotal: (cantidad * area).toFixed(2),
                    areaNecesaria: As.toFixed(2)
                });
            }
        }
        
        // Retornar la solución más económica
        return soluciones.length > 0 ? soluciones[0] : null;
    },
    
    /**
     * Calcula cortante en vigas
     * @param {number} Vu - Cortante último (kN)
     * @param {number} b - Ancho (cm)
     * @param {number} d - Altura efectiva (cm)
     * @param {number} fc - Resistencia del hormigón (MPa)
     * @returns {Object} Resultado del análisis de cortante
     */
    calcularCortante: function(Vu, b, d, fc) {
        const phi = 0.85; // Factor de reducción cortante
        
        // Resistencia del hormigón al cortante (kN)
        const Vc = phi * 0.53 * Math.sqrt(fc) * b * d / 100;
        
        // Verificar si necesita estribos
        const necesitaEstribos = Vu > 0.5 * Vc;
        
        return {
            Vc: Vc.toFixed(2),
            phiVc: (phi * Vc).toFixed(2),
            necesitaEstribos: necesitaEstribos,
            porcentaje: ((Vu / Vc) * 100).toFixed(1)
        };
    },
    
    /**
     * Calcula presión en el suelo
     * @param {number} P - Carga vertical (kN)
     * @param {number} A - Área de contacto (m²)
     * @returns {number} Presión (kPa)
     */
    calcularPresionSuelo: function(P, A) {
        return P / A;
    },
    
    /**
     * Verifica volteo en zapatas
     * @param {number} Mv - Momento de volteo (kN·m)
     * @param {number} Mr - Momento resistente (kN·m)
     * @returns {Object} Resultado de verificación
     */
    verificarVolteo: function(Mv, Mr) {
        const FSv = Mr / Mv;
        const FSmin = NormativaChile.seguridadGlobal.volteo;
        
        return {
            factorSeguridad: FSv.toFixed(2),
            factorRequerido: FSmin,
            cumple: FSv >= FSmin,
            mensaje: FSv >= FSmin ? "Cumple con seguridad al volteo" : "NO cumple con seguridad al volteo"
        };
    },
    
    /**
     * Verifica deslizamiento en zapatas
     * @param {number} H - Fuerza horizontal (kN)
     * @param {number} Fr - Fuerza resistente (kN)
     * @returns {Object} Resultado de verificación
     */
    verificarDeslizamiento: function(H, Fr) {
        const FSd = Fr / H;
        const FSmin = NormativaChile.seguridadGlobal.deslizamiento;
        
        return {
            factorSeguridad: FSd.toFixed(2),
            factorRequerido: FSmin,
            cumple: FSd >= FSmin,
            mensaje: FSd >= FSmin ? "Cumple con seguridad al deslizamiento" : "NO cumple con seguridad al deslizamiento"
        };
    },
    
    /**
     * Calcula momento en losa según método elástico
     * @param {number} w - Carga distribuida (kN/m²)
     * @param {number} L - Luz (m)
     * @param {string} tipo - Tipo de apoyo ('simple', 'continuo', 'empotrado')
     * @returns {number} Momento máximo (kN·m/m)
     */
    calcularMomentoLosa: function(w, L, tipo = 'continuo') {
        const coeficientes = {
            'simple': 1/8,
            'continuo': 1/10,
            'empotrado': 1/12
        };
        
        const coef = coeficientes[tipo] || coeficientes['continuo'];
        return w * Math.pow(L, 2) * coef;
    },
    
    /**
     * Interpola valores en tablas
     * @param {number} x - Valor a interpolar
     * @param {Array} tabla - Array de objetos {x, y}
     * @returns {number} Valor interpolado
     */
    interpolar: function(x, tabla) {
        // Ordenar tabla por x
        tabla.sort((a, b) => a.x - b.x);
        
        // Si está fuera del rango
        if (x <= tabla[0].x) return tabla[0].y;
        if (x >= tabla[tabla.length - 1].x) return tabla[tabla.length - 1].y;
        
        // Interpolación lineal
        for (let i = 0; i < tabla.length - 1; i++) {
            if (x >= tabla[i].x && x <= tabla[i + 1].x) {
                const x1 = tabla[i].x;
                const y1 = tabla[i].y;
                const x2 = tabla[i + 1].x;
                const y2 = tabla[i + 1].y;
                
                return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
            }
        }
        
        return 0;
    },
    
    /**
     * Redondea hacia arriba a múltiplo
     * @param {number} valor - Valor a redondear
     * @param {number} multiplo - Múltiplo deseado
     * @returns {number} Valor redondeado
     */
    redondearArriba: function(valor, multiplo = 5) {
        return Math.ceil(valor / multiplo) * multiplo;
    },
    
    /**
     * Formatea número con unidades
     * @param {number} valor - Valor numérico
     * @param {number} decimales - Cantidad de decimales
     * @param {string} unidad - Unidad de medida
     * @returns {string} Valor formateado
     */
    formatear: function(valor, decimales = 2, unidad = '') {
        return `${valor.toFixed(decimales)} ${unidad}`;
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalculosComunes;
}
