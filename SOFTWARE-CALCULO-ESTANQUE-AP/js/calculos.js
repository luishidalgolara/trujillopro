// Módulo de cálculos según normas chilenas
const Calculos = {
    // Calcular todos los parámetros del estanque
    calcularEstanque: function(datos) {
        const resultados = {};
        
        // 1. Cálculos de población
        resultados.totalHabitantes = datos.numPisos * datos.deptosPorPiso * datos.habitantesPorDepto;
        resultados.totalDepartamentos = datos.numPisos * datos.deptosPorPiso;
        
        // 2. Dotación según NCh691
        resultados.dotacionDiaria = NormasChile.calcularDotacion(datos.tipoEdificio, resultados.totalHabitantes);
        resultados.dotacionPorHabitante = NormasChile.dotaciones[datos.tipoEdificio].base;
        
        // 3. Volumen requerido del estanque
        resultados.volumenRequerido = NormasChile.calcularVolumenRequerido(datos.tipoEdificio, resultados.dotacionDiaria);
        
        // 4. Dimensiones y volumen real del estanque
        resultados.largo = datos.largo;
        resultados.ancho = datos.ancho;
        resultados.altura = datos.altura;
        
        // Volumen útil (considerando borde libre)
        const alturaUtil = datos.altura - NormasChile.recomendaciones.bordoLibre;
        resultados.volumenUtil = datos.largo * datos.ancho * alturaUtil;
        resultados.volumenTotal = datos.largo * datos.ancho * datos.altura;
        
        // 5. Capacidad en litros
        resultados.capacidadLitros = resultados.volumenUtil * 1000;
        
        // 6. Peso del agua
        resultados.pesoAgua = resultados.volumenUtil * NormasChile.parametros.pesoAgua;
        
        // 7. Verificar si el volumen es suficiente
        resultados.esSuficiente = resultados.volumenUtil >= resultados.volumenRequerido;
        resultados.porcentajeLlenado = (resultados.volumenRequerido / resultados.volumenUtil) * 100;
        
        if (resultados.esSuficiente) {
            if (resultados.porcentajeLlenado > 90) {
                resultados.estadoCapacidad = 'warning';
                resultados.mensajeCapacidad = 'Capacidad suficiente pero ajustada (>90% llenado)';
            } else {
                resultados.estadoCapacidad = 'success';
                resultados.mensajeCapacidad = 'Capacidad suficiente';
            }
        } else {
            resultados.estadoCapacidad = 'danger';
            resultados.mensajeCapacidad = 'Capacidad insuficiente';
        }
        
        // 8. Sistema de bombeo
        resultados.presionRequerida = NormasChile.calcularPresion(datos.numPisos);
        resultados.caudalEstimado = NormasChile.calcularCaudal(resultados.totalDepartamentos);
        
        const infoBombas = NormasChile.determinarBombas(datos.numPisos);
        resultados.numeroBombas = infoBombas.bombas;
        resultados.descripcionBombas = infoBombas.descripcion;
        
        resultados.potenciaBomba = NormasChile.calcularPotenciaBomba(
            resultados.caudalEstimado,
            resultados.presionRequerida
        );
        
        // 9. Cálculos estructurales
        resultados.presionHidrostatica = datos.altura * NormasChile.parametros.pesoAgua;
        resultados.fuerzaLateral = resultados.presionHidrostatica * datos.altura * datos.largo / 2;
        
        // 10. Verificar espesores según altura
        resultados.espesorMurosRecomendado = this.calcularEspesorRecomendado(datos.altura);
        resultados.espesorAdecuado = datos.espesorMuros >= resultados.espesorMurosRecomendado;
        
        // 11. Validaciones dimensionales
        resultados.validaciones = NormasChile.validarDimensiones(datos.largo, datos.ancho, datos.altura);
        
        // 12. Generar recomendaciones
        resultados.recomendaciones = NormasChile.generarRecomendaciones({
            altura: datos.altura,
            numPisos: datos.numPisos,
            volumenUtil: resultados.volumenUtil,
            esSuficiente: resultados.esSuficiente
        });
        
        // Agregar recomendaciones específicas del cálculo
        if (!resultados.esSuficiente) {
            resultados.recomendaciones.unshift({
                tipo: 'danger',
                mensaje: `Se requieren ${Validaciones.formatearNumero(resultados.volumenRequerido - resultados.volumenUtil)} m³ adicionales`
            });
        }
        
        if (!resultados.espesorAdecuado) {
            resultados.recomendaciones.push({
                tipo: 'warning',
                mensaje: `Espesor de muros recomendado: ${resultados.espesorMurosRecomendado}m para altura de ${datos.altura}m`
            });
        }
        
        // 13. Días de autonomía
        resultados.diasAutonomia = (resultados.volumenUtil * 1000) / resultados.dotacionDiaria;
        
        // 14. Consumo por piso
        resultados.consumoPorPiso = resultados.dotacionDiaria / datos.numPisos;
        
        // 15. Información de tuberías
        resultados.diametroAlimentacion = TablasPres.recomendarDiametro(
            resultados.caudalEstimado, 
            'alimentacion'
        );
        resultados.diametroImpulsion = TablasPres.recomendarDiametro(
            resultados.caudalEstimado, 
            'impulsion'
        );
        
        return resultados;
    },

    // Calcular espesor recomendado según altura
    calcularEspesorRecomendado: function(altura) {
        if (altura <= 2.0) return 0.15;
        if (altura <= 3.0) return 0.20;
        if (altura <= 4.0) return 0.25;
        if (altura <= 5.0) return 0.30;
        return 0.35;
    },

    // Ajustar dimensiones automáticamente para cumplir volumen requerido
    ajustarDimensiones: function(volumenRequerido, altura) {
        // Calcular área base necesaria
        const alturaUtil = altura - NormasChile.recomendaciones.bordoLibre;
        const areaBase = volumenRequerido / alturaUtil;
        
        // Proponer dimensiones con relación aproximada 1.5:1 (largo:ancho)
        const ancho = Math.sqrt(areaBase / 1.5);
        const largo = areaBase / ancho;
        
        return {
            largo: Validaciones.redondear(largo, 1),
            ancho: Validaciones.redondear(ancho, 1),
            altura: altura
        };
    },

    // Optimizar dimensiones considerando restricciones
    optimizarDimensiones: function(datos, volumenRequerido) {
        let dimensiones = { ...datos };
        
        // Si el ajuste automático está activado
        if (datos.ajusteAutomatico) {
            const dimensionesOptimas = this.ajustarDimensiones(volumenRequerido, datos.altura);
            dimensiones = {
                ...datos,
                largo: dimensionesOptimas.largo,
                ancho: dimensionesOptimas.ancho
            };
        }
        
        // Verificar que las dimensiones sean razonables
        const relacionMaxima = NormasChile.recomendaciones.relacionLargoAncho;
        const relacion = dimensiones.largo / dimensiones.ancho;
        
        if (relacion > relacionMaxima) {
            // Ajustar para cumplir relación máxima
            const areaBase = volumenRequerido / (dimensiones.altura - NormasChile.recomendaciones.bordoLibre);
            dimensiones.ancho = Math.sqrt(areaBase / relacionMaxima);
            dimensiones.largo = relacionMaxima * dimensiones.ancho;
        }
        
        return dimensiones;
    },

    // Calcular volumen de hormigón necesario
    calcularVolumenHormigon: function(datos) {
        const volumenExterior = (datos.largo + 2 * datos.espesorMuros) * 
                               (datos.ancho + 2 * datos.espesorMuros) * 
                               (datos.altura + datos.espesorFondo);
        
        const volumenInterior = datos.largo * datos.ancho * datos.altura;
        
        return volumenExterior - volumenInterior;
    },

    // Calcular cantidad aproximada de acero
    calcularAcero: function(datos) {
        // Cuantía típica de acero para estanques: 0.3-0.5% del volumen de hormigón
        const volumenHormigon = this.calcularVolumenHormigon(datos);
        const cuantia = 0.004; // 0.4% (valor medio)
        const pesoAcero = volumenHormigon * cuantia * 7850; // kg (densidad acero = 7850 kg/m³)
        
        return Validaciones.redondear(pesoAcero, 0);
    },

    // Calcular presión en el fondo del estanque
    calcularPresionFondo: function(altura) {
        return altura * NormasChile.parametros.pesoAgua;
    },

    // Calcular tiempo de llenado estimado
    calcularTiempoLlenado: function(volumen, caudalLlenado) {
        // caudalLlenado en L/min
        const tiempoMinutos = (volumen * 1000) / caudalLlenado;
        const horas = Math.floor(tiempoMinutos / 60);
        const minutos = Math.round(tiempoMinutos % 60);
        
        return {
            minutos: tiempoMinutos,
            horas: horas,
            minutosRestantes: minutos,
            texto: `${horas}h ${minutos}min`
        };
    },

    // Verificar normativa aplicable
    verificarNormativa: function(resultados) {
        const cumplimientos = [];
        
        // NCh691 - Capacidad
        cumplimientos.push({
            norma: 'NCh691 - Capacidad de almacenamiento',
            cumple: resultados.esSuficiente,
            detalle: resultados.mensajeCapacidad
        });
        
        // NCh691 - Borde libre
        const tienebordeLibre = resultados.altura >= (resultados.volumenRequerido / (resultados.largo * resultados.ancho)) + NormasChile.recomendaciones.bordoLibre;
        cumplimientos.push({
            norma: 'NCh691 - Borde libre mínimo',
            cumple: tienebordeLibre,
            detalle: tienebordeLibre ? 'Cumple con borde libre mínimo' : 'No cumple con borde libre mínimo'
        });
        
        // Dimensiones estructurales
        cumplimientos.push({
            norma: 'Dimensionamiento estructural',
            cumple: resultados.espesorAdecuado,
            detalle: resultados.espesorAdecuado ? 'Espesores adecuados' : 'Verificar espesores'
        });
        
        return cumplimientos;
    },

    // Generar resumen ejecutivo
    generarResumen: function(resultados) {
        return {
            titulo: 'Resumen Ejecutivo - Estanque de Agua Potable',
            edificio: {
                pisos: resultados.totalHabitantes / (resultados.totalDepartamentos / resultados.numPisos) / resultados.habitantesPorDepto,
                departamentos: resultados.totalDepartamentos,
                habitantes: resultados.totalHabitantes
            },
            estanque: {
                dimensiones: `${resultados.largo} x ${resultados.ancho} x ${resultados.altura} m`,
                volumen: `${Validaciones.formatearNumero(resultados.volumenUtil)} m³`,
                capacidad: `${Validaciones.formatearNumero(resultados.capacidadLitros)} L`,
                autonomia: `${Validaciones.formatearNumero(resultados.diasAutonomia, 1)} días`
            },
            bombeo: {
                bombas: resultados.numeroBombas,
                presion: `${Validaciones.formatearNumero(resultados.presionRequerida)} m.c.a`,
                caudal: `${Validaciones.formatearNumero(resultados.caudalEstimado)} L/min`,
                potencia: `${resultados.potenciaBomba} HP`
            },
            estado: resultados.mensajeCapacidad
        };
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculos;
}
