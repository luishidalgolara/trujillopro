/**
 * MURO-CALCULOS.JS
 * Cálculos de empuje, volteo, deslizamiento y presiones según NCh430
 */

const MuroCalculos = {
    /**
     * Calcular empuje activo del suelo según Teoría de Rankine
     */
    calcularEmpujeActivo(H, phi, gamma_suelo, q) {
        const phi_rad = phi * Math.PI / 180;
        const Ka = Math.tan(Math.PI / 4 - phi_rad / 2) ** 2;
        
        // Empuje horizontal debido al suelo
        const Pa_suelo = 0.5 * Ka * gamma_suelo * H ** 2;
        
        // Empuje horizontal debido a sobrecarga
        const Pa_sobrecarga = Ka * q * H;
        
        // Empuje total
        const Pa = Pa_suelo + Pa_sobrecarga;
        
        // Punto de aplicación del empuje (H/3 para distribución triangular)
        const h_Pa = H / 3;
        
        return {
            Ka,
            Pa_suelo,
            Pa_sobrecarga,
            Pa,
            h_Pa
        };
    },

    /**
     * Calcular pesos propios del muro, zapata y suelo
     */
    calcularPesos(H, B, t_base, t_corona, h_zapata, gamma_suelo) {
        const gamma_concreto = 25; // kN/m³
        
        // Volumen del muro (por metro de longitud)
        const V_muro = ((t_base + t_corona) / 2) * H;
        const W_muro = V_muro * gamma_concreto;
        
        // Peso de la zapata
        const V_zapata = B * h_zapata;
        const W_zapata = V_zapata * gamma_concreto;
        
        // Peso del suelo sobre el talón
        const puntera = 0.3; // 30cm típico
        const ancho_talon = B - t_base - puntera;
        const V_suelo_talon = ancho_talon * H;
        const W_suelo = V_suelo_talon * gamma_suelo;
        
        // Peso total
        const W_total = W_muro + W_zapata + W_suelo;
        
        return {
            W_muro,
            W_zapata,
            W_suelo,
            W_total,
            puntera,
            ancho_talon
        };
    },

    /**
     * Verificar estabilidad al volteo
     */
    verificarVolteo(W_muro, W_zapata, W_suelo, t_base, B, H, Pa, h_Pa) {
        const puntera = 0.3;
        
        // Distancias al punto de giro (borde exterior de puntera)
        const x_muro = t_base / 2 + puntera;
        const x_zapata = B / 2;
        const ancho_talon = B - t_base - puntera;
        const x_suelo = t_base + puntera + ancho_talon / 2;
        
        // Momento estabilizador
        const M_estab = W_muro * x_muro + W_zapata * x_zapata + W_suelo * x_suelo;
        
        // Momento de volteo
        const M_volteo = Pa * h_Pa;
        
        // Factor de seguridad
        const FS_volteo = M_estab / M_volteo;
        const cumple_volteo = FS_volteo >= 1.5;
        
        return {
            M_estab,
            M_volteo,
            FS_volteo,
            cumple_volteo
        };
    },

    /**
     * Verificar estabilidad al deslizamiento
     */
    verificarDeslizamiento(W_total, Pa, phi) {
        const phi_rad = phi * Math.PI / 180;
        const mu = Math.tan(phi_rad * 0.67); // Coeficiente de fricción
        const Fr = mu * W_total;
        const FS_desl = Fr / Pa;
        const cumple_desl = FS_desl >= 1.5;
        
        return {
            mu,
            Fr,
            FS_desl,
            cumple_desl
        };
    },

    /**
     * Verificar presiones en el suelo
     */
    verificarPresiones(W_total, B, M_estab, M_volteo, qadm) {
        const M_neto = M_estab - M_volteo;
        const e = B / 2 - M_neto / W_total;
        
        let q_max, q_min;
        
        if (e <= B / 6) {
            // Distribución trapezoidal
            q_max = (W_total / B) * (1 + 6 * e / B);
            q_min = (W_total / B) * (1 - 6 * e / B);
        } else {
            // Distribución triangular (parte sin contacto)
            q_max = (2 * W_total) / (3 * (B / 2 - e));
            q_min = 0;
        }
        
        const cumple_presion = q_max <= qadm;
        
        return {
            e,
            q_max,
            q_min,
            cumple_presion
        };
    },

    /**
     * Diseñar acero del muro vertical
     */
    disenarAceroMuro(H, Ka, gamma_suelo, t_base, fc, fy) {
        const Mu_muro = 0.5 * Ka * gamma_suelo * H ** 3 / 3;
        const d_muro = t_base - 0.07 - 0.01; // Altura efectiva
        const As_muro = CalculosComunes.calcularAceroFlexion(Mu_muro, 1.0, d_muro, fc, fy);
        const As_min_muro = CalculosComunes.calcularAceroMinimo(100, d_muro * 100, fy);
        const As_muro_final = Math.max(As_muro, As_min_muro);
        const dist_muro = CalculosComunes.distribuirBarras(As_muro_final, 100, [12, 16, 18]);
        
        return {
            Mu_muro,
            As_muro: As_muro_final,
            dist_muro
        };
    },

    /**
     * Diseñar acero de la zapata (talón)
     */
    disenarAceroZapata(q_max, ancho_talon, h_zapata, fc, fy) {
        const Mu_talon = q_max * ancho_talon ** 2 / 2;
        const d_zapata = h_zapata - 0.07 - 0.01;
        const As_talon = CalculosComunes.calcularAceroFlexion(Mu_talon, 1.0, d_zapata, fc, fy);
        const As_min_zapata = CalculosComunes.calcularAceroMinimo(100, d_zapata * 100, fy);
        const As_talon_final = Math.max(As_talon, As_min_zapata);
        const dist_talon = CalculosComunes.distribuirBarras(As_talon_final, 100, [12, 16]);
        
        return {
            Mu_talon,
            As_talon: As_talon_final,
            dist_talon
        };
    }
};
