/**
 * SUGERENCIAS INTELIGENTES
 * Sistema de recomendaciones para verificaciones que no cumplen
 */

class SugerenciasInteligentes {
    
    // ============================================
    // PRESIÓN EN SUELO (Zapatas, Losas Cimentación)
    // ============================================
    static sugerirPresionSuelo(datos) {
        const { qactual, qadm, B_actual, h_actual, Pservicio, Df } = datos;
        
        const pesoSuelo = 18 * Df;
        const qneto = qadm - pesoSuelo;
        const B_min = Pservicio / qneto;
        const B_sugerido = Math.ceil(B_min * 20) / 20;
        
        const Df_sugerido = Df + 0.30;
        const qadm_requerido = qactual * 1.05;
        
        return {
            tipo: 'PRESION_SUELO',
            exceso: (qactual - qadm).toFixed(2),
            porcentaje_exceso: (((qactual - qadm) / qadm) * 100).toFixed(1),
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Ancho de Zapata',
                    descripcion: `Ancho mínimo requerido: <strong>${B_min.toFixed(2)} m</strong><br>
                                 Sugerencia: <strong>B = ${B_sugerido} m</strong>`,
                    valor_sugerido: B_sugerido,
                    parametro: 'ancho',
                    factor_seguridad: (qadm / (Pservicio / B_sugerido)).toFixed(2)
                },
                {
                    orden: 2,
                    recomendado: false,
                    titulo: 'Aumentar Profundidad de Desplante',
                    descripcion: `Profundidad sugerida: <strong>${Df_sugerido.toFixed(2)} m</strong><br>
                                 Reduce peso del suelo sobre zapata`,
                    valor_sugerido: Df_sugerido,
                    parametro: 'profundidad'
                },
                {
                    orden: 3,
                    recomendado: false,
                    titulo: 'Mejorar Capacidad Portante del Suelo',
                    descripcion: `Capacidad requerida: <strong>≥ ${qadm_requerido.toFixed(0)} kPa</strong><br>
                                 Métodos: Compactación, Reemplazo de suelo, Mejoramiento con cemento`,
                    valor_sugerido: qadm_requerido,
                    parametro: 'capacidad'
                }
            ]
        };
    }
    
    // ============================================
    // VOLTEO (Muros de Contención)
    // ============================================
    static sugerirVolteo(datos) {
        const { FS_actual, FS_requerido, M_estab, M_volteo, B_actual, H, W_total } = datos;
        
        const M_faltante = M_volteo * FS_requerido - M_estab;
        const B_min = B_actual + (M_faltante / W_total * 2);
        const B_sugerido = Math.ceil(B_min * 20) / 20;
        
        const W_adicional = M_faltante / (B_actual * 0.5);
        
        return {
            tipo: 'VOLTEO',
            deficit: (FS_requerido - FS_actual).toFixed(2),
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Ancho de Zapata',
                    descripcion: `Ancho mínimo: <strong>${B_min.toFixed(2)} m</strong><br>
                                 Sugerencia: <strong>B = ${B_sugerido} m</strong>`,
                    valor_sugerido: B_sugerido,
                    parametro: 'ancho'
                },
                {
                    orden: 2,
                    recomendado: false,
                    titulo: 'Aumentar Peso del Muro',
                    descripcion: `Peso adicional requerido: <strong>${W_adicional.toFixed(0)} kN/m</strong><br>
                                 Aumentar espesor base o usar llave de cortante`,
                    valor_sugerido: W_adicional,
                    parametro: 'peso'
                }
            ]
        };
    }
    
    // ============================================
    // DESLIZAMIENTO (Muros de Contención)
    // ============================================
    static sugerirDeslizamiento(datos) {
        const { FS_actual, FS_requerido, Pa, W_total, mu } = datos;
        
        const Fr_requerido = Pa * FS_requerido;
        const W_min = Fr_requerido / mu;
        const W_adicional = W_min - W_total;
        
        return {
            tipo: 'DESLIZAMIENTO',
            deficit: (FS_requerido - FS_actual).toFixed(2),
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Peso Total',
                    descripcion: `Peso adicional: <strong>${W_adicional.toFixed(0)} kN/m</strong><br>
                                 Aumentar espesor de muro o zapata`,
                    valor_sugerido: W_adicional,
                    parametro: 'peso'
                },
                {
                    orden: 2,
                    recomendado: false,
                    titulo: 'Agregar Llave de Cortante',
                    descripcion: `Profundidad sugerida: <strong>0.50 m</strong><br>
                                 Ancho: <strong>0.30 m</strong>`,
                    valor_sugerido: 0.5,
                    parametro: 'llave'
                }
            ]
        };
    }
    
    // ============================================
    // ACERO MÁXIMO (Vigas, Losas, Columnas)
    // ============================================
    static sugerirAcero(datos) {
        const { As_actual, As_max, b, h, fc, tipo } = datos;
        
        const exceso_porcentaje = ((As_actual - As_max) / As_max * 100).toFixed(1);
        
        let factor_aumento = 1.15;
        const b_nuevo = Math.ceil(b * factor_aumento * 20) / 20;
        const h_nuevo = Math.ceil(h * factor_aumento * 20) / 20;
        
        const fc_sugerido = fc < 30 ? fc + 5 : fc;
        
        return {
            tipo: 'ACERO_MAXIMO',
            exceso: (As_actual - As_max).toFixed(2),
            exceso_porcentaje: exceso_porcentaje,
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Sección Transversal',
                    descripcion: `Dimensión sugerida: <strong>${(b_nuevo * 100).toFixed(0)} x ${(h_nuevo * 100).toFixed(0)} cm</strong><br>
                                 Aumento del 15%`,
                    valor_sugerido: { b: b_nuevo, h: h_nuevo },
                    parametro: 'seccion'
                },
                {
                    orden: 2,
                    recomendado: false,
                    titulo: 'Aumentar Resistencia del Hormigón',
                    descripcion: `f'c sugerido: <strong>H${fc_sugerido} (${fc_sugerido} MPa)</strong>`,
                    valor_sugerido: fc_sugerido,
                    parametro: 'fc'
                }
            ]
        };
    }
    
    // ============================================
    // CORTANTE (Vigas, Zapatas, Losas)
    // ============================================
    static sugerirCortante(datos) {
        const { Vu, phiVc, b, d, fc } = datos;
        
        const Vc_requerido = Vu / 0.85;
        const d_min = Vc_requerido / (0.85 * 0.53 * Math.sqrt(fc) * b * 100) * 100;
        const d_sugerido = Math.ceil(d_min / 5) * 5;
        const h_sugerido = (d_sugerido + 7 + 1) / 100;
        
        return {
            tipo: 'CORTANTE',
            deficit: (Vu - phiVc).toFixed(2),
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Altura de Zapata',
                    descripcion: `Altura mínima requerida: <strong>${(h_sugerido * 100).toFixed(0)} cm</strong><br>
                                 Cambiar parámetro <strong>"Altura de Zapata (h)"</strong> a <strong>${h_sugerido.toFixed(2)} m</strong>`,
                    valor_sugerido: h_sugerido,
                    parametro: 'altura'
                },
                {
                    orden: 2,
                    recomendado: false,
                    titulo: 'Agregar/Densificar Estribos',
                    descripcion: `Reducir espaciamiento a <strong>10 cm</strong> en zona crítica`,
                    valor_sugerido: 10,
                    parametro: 'estribos'
                }
            ]
        };
    }
    
    // ============================================
    // PUNZONAMIENTO (Zapatas Aisladas, Losas)
    // ============================================
    static sugerirPunzonamiento(datos) {
        const { Pu, phiVc, h_actual, c, fc } = datos;
        
        const bo_requerido = Pu / (0.85 * 1.06 * Math.sqrt(fc) * 1000);
        const d_min = bo_requerido / (4 * (c + 1));
        const h_min = d_min + 0.07 + 0.01;
        const h_sugerido = Math.ceil(h_min * 20) / 20;
        
        return {
            tipo: 'PUNZONAMIENTO',
            deficit: (Pu - phiVc).toFixed(2),
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Altura de Zapata',
                    descripcion: `Altura mínima: <strong>${(h_min * 100).toFixed(0)} cm</strong><br>
                                 Sugerencia: <strong>${(h_sugerido * 100).toFixed(0)} cm</strong>`,
                    valor_sugerido: h_sugerido,
                    parametro: 'altura'
                },
                {
                    orden: 2,
                    recomendado: false,
                    titulo: 'Agregar Capitel en Columna',
                    descripcion: `Aumentar perímetro crítico con ensanchamiento`,
                    valor_sugerido: c * 1.5,
                    parametro: 'capitel'
                }
            ]
        };
    }
    
    // ============================================
    // DEFLEXIÓN (Vigas, Losas)
    // ============================================
    static sugerirDeflexion(datos) {
        const { deflexion_actual, deflexion_adm, L, h_actual } = datos;
        
        const factor = Math.sqrt(deflexion_actual / deflexion_adm);
        const h_min = h_actual * factor;
        const h_sugerido = Math.ceil(h_min * 20) / 20;
        
        return {
            tipo: 'DEFLEXION',
            exceso: ((deflexion_actual - deflexion_adm) * 100).toFixed(2),
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Altura del Elemento',
                    descripcion: `Altura mínima: <strong>${(h_min * 100).toFixed(0)} cm</strong><br>
                                 Sugerencia: <strong>${(h_sugerido * 100).toFixed(0)} cm</strong>`,
                    valor_sugerido: h_sugerido,
                    parametro: 'altura'
                },
                {
                    orden: 2,
                    recomendado: false,
                    titulo: 'Reducir Luz del Elemento',
                    descripcion: `Agregar apoyo intermedio o aumentar número de apoyos`,
                    valor_sugerido: L * 0.7,
                    parametro: 'luz'
                }
            ]
        };
    }
    
    // ============================================
    // ESBELTEZ (Columnas, Cerchas)
    // ============================================
    static sugerirEsbeltez(datos) {
        const { esbeltez_actual, esbeltez_max, H, dim_actual } = datos;
        
        const dim_min = (H * 100) / esbeltez_max / Math.sqrt(12);
        const dim_sugerido = Math.ceil(dim_min / 5) * 5;
        
        const H_max = esbeltez_max * dim_actual * Math.sqrt(12) / 100;
        
        return {
            tipo: 'ESBELTEZ',
            exceso: (esbeltez_actual - esbeltez_max).toFixed(1),
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Dimensión Transversal',
                    descripcion: `Dimensión mínima: <strong>${dim_min.toFixed(1)} cm</strong><br>
                                 Sugerencia: <strong>${dim_sugerido} cm</strong>`,
                    valor_sugerido: dim_sugerido / 100,
                    parametro: 'dimension'
                },
                {
                    orden: 2,
                    recomendado: false,
                    titulo: 'Reducir Altura Libre',
                    descripcion: `Altura máxima permitida: <strong>${H_max.toFixed(2)} m</strong><br>
                                 Agregar arriostramientos intermedios`,
                    valor_sugerido: H_max,
                    parametro: 'altura'
                }
            ]
        };
    }
    
    // ============================================
    // ESPESOR MÍNIMO (Losas, Pisos)
    // ============================================
    static sugerirEspesor(datos) {
        const { e_actual, e_min, tipo } = datos;
        
        const e_sugerido = Math.ceil(e_min * 20) / 20;
        
        return {
            tipo: 'ESPESOR_MINIMO',
            deficit: ((e_min - e_actual) * 100).toFixed(1),
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Espesor',
                    descripcion: `Espesor mínimo: <strong>${(e_min * 100).toFixed(0)} cm</strong><br>
                                 Sugerencia: <strong>${(e_sugerido * 100).toFixed(0)} cm</strong>`,
                    valor_sugerido: e_sugerido,
                    parametro: 'espesor'
                }
            ]
        };
    }
    
    // ============================================
    // FACTOR DE SEGURIDAD (Pisos Industriales)
    // ============================================
    static sugerirFactorSeguridad(datos) {
        const { FS_actual, FS_requerido, h_actual, fc } = datos;
        
        const factor = Math.sqrt(FS_requerido / FS_actual);
        const h_min = h_actual * factor;
        const h_sugerido = Math.ceil(h_min / 0.01) * 0.01;
        
        const fc_sugerido = fc < 30 ? fc + 5 : fc;
        
        return {
            tipo: 'FACTOR_SEGURIDAD',
            deficit: (FS_requerido - FS_actual).toFixed(2),
            soluciones: [
                {
                    orden: 1,
                    recomendado: true,
                    titulo: 'Aumentar Espesor de Losa',
                    descripcion: `Espesor mínimo: <strong>${(h_min * 100).toFixed(0)} cm</strong><br>
                                 Sugerencia: <strong>${(h_sugerido * 100).toFixed(0)} cm</strong>`,
                    valor_sugerido: h_sugerido,
                    parametro: 'espesor'
                },
                {
                    orden: 2,
                    recomendado: false,
                    titulo: 'Mejorar Resistencia del Hormigón',
                    descripcion: `f'c sugerido: <strong>H${fc_sugerido} (${fc_sugerido} MPa)</strong>`,
                    valor_sugerido: fc_sugerido,
                    parametro: 'fc'
                }
            ]
        };
    }
    
    // ============================================
    // GENERAR HTML DE SUGERENCIAS
    // ============================================
    static generarHTML(sugerencias) {
        if (!sugerencias || !sugerencias.soluciones) return '';
        
        let html = `
        <div class="sugerencias-panel">
            <h4>💡 Soluciones Profesionales:</h4>
            <div class="diagnostico-info">
                ${sugerencias.exceso ? `<strong>Exceso:</strong> ${sugerencias.exceso} ${sugerencias.tipo === 'PRESION_SUELO' ? 'kPa' : ''} (${sugerencias.porcentaje_exceso || sugerencias.exceso_porcentaje || ''}%)<br>` : ''}
                ${sugerencias.deficit ? `<strong>Déficit:</strong> ${sugerencias.deficit}<br>` : ''}
            </div>
        `;
        
        sugerencias.soluciones.forEach(solucion => {
            const claseRecomendado = solucion.recomendado ? 'recomendada' : 'alternativa';
            const badgeRecomendado = solucion.recomendado ? '<span class="badge-recomendado">⭐ RECOMENDADO</span>' : '';
            
            html += `
            <div class="solucion ${claseRecomendado}">
                ${badgeRecomendado}
                <strong>${solucion.orden}. ${solucion.titulo}</strong>
                <p>${solucion.descripcion}</p>
            </div>
            `;
        });
        
        html += `</div>`;
        return html;
    }
}

// Hacer disponible globalmente
window.SugerenciasInteligentes = SugerenciasInteligentes;