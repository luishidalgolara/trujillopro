// Módulo de control del formulario
const Formulario = {
    // Obtener datos del formulario
    obtenerDatos: function() {
        return {
            // Datos del edificio
            numPisos: parseInt(document.getElementById('numPisos').value),
            deptosPorPiso: parseInt(document.getElementById('deptosPorPiso').value),
            habitantesPorDepto: parseInt(document.getElementById('habitantesPorDepto').value),
            tipoEdificio: document.getElementById('tipoEdificio').value,
            
            // Dimensiones del estanque
            largo: parseFloat(document.getElementById('largo').value),
            ancho: parseFloat(document.getElementById('ancho').value),
            altura: parseFloat(document.getElementById('altura').value),
            ajusteAutomatico: document.getElementById('ajusteAutomatico').checked,
            
            // Parámetros técnicos
            espesorMuros: parseFloat(document.getElementById('espesorMuros').value),
            espesorFondo: parseFloat(document.getElementById('espesorFondo').value),
            hormigon: document.getElementById('hormigon').value,
            acero: document.getElementById('acero').value,
            
            // ✅ NUEVO: Dimensiones de la sala de bombas
            salaAncho: parseFloat(document.getElementById('salaAncho').value),
            salaProfundidad: parseFloat(document.getElementById('salaProfundidad').value),
            salaAltura: parseFloat(document.getElementById('salaAltura').value),
            
            // ✅ NUEVO: Parámetros de tuberías
            diametroAlimentacion: parseInt(document.getElementById('diametroAlimentacion').value),
            diametroImpulsion: parseInt(document.getElementById('diametroImpulsion').value),
            tiempoLlenado: parseFloat(document.getElementById('tiempoLlenado').value),
            tiempoVaciado: parseFloat(document.getElementById('tiempoVaciado').value)
        };
    },

    // Actualizar resultados en la interfaz
    actualizarResultados: function(resultados) {
        // Dimensiones
        document.getElementById('dimResult').textContent = 
            `${resultados.largo.toFixed(1)} x ${resultados.ancho.toFixed(1)} x ${resultados.altura.toFixed(1)} m`;
        
        document.getElementById('volumenResult').textContent = 
            `${Validaciones.formatearNumero(resultados.volumenUtil)} m³`;
        
        document.getElementById('capacidadResult').textContent = 
            `${Validaciones.formatearNumero(resultados.capacidadLitros, 0)} litros`;
        
        document.getElementById('pesoResult').textContent = 
            `${Validaciones.formatearNumero(resultados.pesoAgua, 0)} kN`;

        // Cálculos estructurales
        document.getElementById('habitantesResult').textContent = 
            `${resultados.totalHabitantes} habitantes`;
        
        document.getElementById('dotacionResult').textContent = 
            `${Validaciones.formatearNumero(resultados.dotacionDiaria, 0)} L/día (${resultados.dotacionPorHabitante} L/hab/día)`;
        
        document.getElementById('volRequeridoResult').textContent = 
            `${Validaciones.formatearNumero(resultados.volumenRequerido)} m³`;
        
        // Estado del diseño con color
        const estadoElement = document.getElementById('estadoResult');
        estadoElement.textContent = resultados.mensajeCapacidad;
        estadoElement.className = `value ${resultados.estadoCapacidad}`;

        // Sistema de bombeo
        document.getElementById('numBombasResult').textContent = 
            `${resultados.numeroBombas} bombas (${resultados.descripcionBombas})`;
        
        document.getElementById('presionResult').textContent = 
            `${Validaciones.formatearNumero(resultados.presionRequerida)} m.c.a`;
        
        document.getElementById('caudalResult').textContent = 
            `${Validaciones.formatearNumero(resultados.caudalEstimado)} L/min`;
        
        document.getElementById('potenciaResult').textContent = 
            `${resultados.potenciaBomba} HP por bomba`;
    },

    // Actualizar recomendaciones
    actualizarRecomendaciones: function(recomendaciones) {
        const container = document.getElementById('recomendaciones');
        container.innerHTML = '';

        if (recomendaciones.length === 0) {
            container.innerHTML = '<p class="info-text">No hay recomendaciones adicionales.</p>';
            return;
        }

        recomendaciones.forEach(rec => {
            const div = document.createElement('div');
            div.className = `recomendacion-item ${rec.tipo}`;
            
            let icono = '•';
            if (rec.tipo === 'success') icono = '✓';
            if (rec.tipo === 'warning') icono = '⚠';
            if (rec.tipo === 'danger') icono = '✗';
            
            div.textContent = `${icono} ${rec.mensaje}`;
            container.appendChild(div);
        });
    },

    // Configurar eventos de inputs
    configurarEventos: function() {
        // Cambios en tiempo real de las dimensiones
        const dimensionInputs = ['largo', 'ancho', 'altura'];
        dimensionInputs.forEach(id => {
            const input = document.getElementById(id);
            input.addEventListener('input', () => {
                const datos = this.obtenerDatos();
                Render3D.crearEstanque(
                    datos.largo,
                    datos.ancho,
                    datos.altura,
                    datos.espesorMuros,
                    datos.espesorFondo
                );
            });
        });

        // ✅ NUEVO: Cambios en tiempo real de las dimensiones de la SALA DE BOMBAS
        const salaInputs = ['salaAncho', 'salaProfundidad', 'salaAltura'];
        salaInputs.forEach(id => {
            const input = document.getElementById(id);
            input.addEventListener('input', () => {
                // Solo actualizar si la sala de bombas está visible
                if (typeof SalaBombas !== 'undefined' && SalaBombas.activo) {
                    const datos = this.obtenerDatos();
                    const resultados = Calculos.calcularEstanque(datos);
                    
                    console.log('🔄 Actualizando dimensiones de sala de bombas...');
                    
                    // Eliminar y recrear sala con nuevas dimensiones
                    Render3D.eliminarSalaBombas();
                    Render3D.integrarSalaBombas({
                        numeroBombas: resultados.numeroBombas,
                        potencia: resultados.potenciaBomba,
                        caudal: resultados.caudalEstimado,
                        presion: resultados.presionRequerida,
                        posicionEstanque: {
                            largo: resultados.largo,
                            ancho: resultados.ancho,
                            altura: resultados.altura
                        },
                        dimensionesSala: {
                            ancho: datos.salaAncho,
                            profundidad: datos.salaProfundidad,
                            altura: datos.salaAltura
                        }
                    });
                }
            });
        });

        // Ajuste automático de dimensiones
        document.getElementById('ajusteAutomatico').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.ajustarDimensionesAutomaticas();
            }
        });

        // Cambios en datos del edificio - recalcular si se ha calculado antes
        const edificioInputs = ['numPisos', 'deptosPorPiso', 'habitantesPorDepto', 'tipoEdificio'];
        edificioInputs.forEach(id => {
            const input = document.getElementById(id);
            input.addEventListener('change', () => {
                // Si el ajuste automático está activado, recalcular dimensiones
                if (document.getElementById('ajusteAutomatico').checked) {
                    this.ajustarDimensionesAutomaticas();
                }
            });
        });
    },

    // Ajustar dimensiones automáticamente
    ajustarDimensionesAutomaticas: function() {
        const datos = this.obtenerDatos();
        
        // Calcular volumen requerido
        const totalHabitantes = datos.numPisos * datos.deptosPorPiso * datos.habitantesPorDepto;
        const dotacionDiaria = NormasChile.calcularDotacion(datos.tipoEdificio, totalHabitantes);
        const volumenRequerido = NormasChile.calcularVolumenRequerido(datos.tipoEdificio, dotacionDiaria);
        
        // Optimizar dimensiones
        const dimensionesOptimas = Calculos.ajustarDimensiones(volumenRequerido, datos.altura);
        
        // Actualizar inputs
        document.getElementById('largo').value = dimensionesOptimas.largo;
        document.getElementById('ancho').value = dimensionesOptimas.ancho;
        
        // Actualizar 3D
        Render3D.crearEstanque(
            dimensionesOptimas.largo,
            dimensionesOptimas.ancho,
            dimensionesOptimas.altura,
            datos.espesorMuros,
            datos.espesorFondo
        );
    },

    // Validar antes de calcular
    validarYCalcular: function() {
        const datos = this.obtenerDatos();
        
        // Validar datos
        const errores = Validaciones.validarFormulario(datos);
        
        if (errores.length > 0) {
            Validaciones.mostrarErrores(errores);
            return false;
        }
        
        // Calcular
        const resultados = Calculos.calcularEstanque(datos);
        
        // Actualizar interfaz
        this.actualizarResultados(resultados);
        this.actualizarRecomendaciones(resultados.recomendaciones);
        
        // ⭐⭐⭐ NUEVA LÍNEA - MOSTRAR OPCIONES DE BOMBAS ⭐⭐⭐
        if (typeof CatalogoBombas !== 'undefined') {
            CatalogoBombas.mostrarOpciones(
                resultados.presionRequerida,
                resultados.caudalEstimado,
                resultados.potenciaBomba
            );
            console.log('✅ Opciones de bombas generadas correctamente');
        } else {
            console.warn('⚠️ CatalogoBombas no está cargado');
        }
        
        // ⭐⭐⭐ NUEVA LÍNEA - CALCULAR Y MOSTRAR TUBERÍAS ⭐⭐⭐
        if (typeof CalculoTuberias !== 'undefined') {
            const datosTuberias = {
                volumenEstanque: resultados.volumenUtil,
                caudalBomba: resultados.caudalEstimado,
                presionBomba: resultados.presionRequerida,
                // Usar valores del formulario
                diametroAlimentacion: datos.diametroAlimentacion,
                diametroImpulsion: datos.diametroImpulsion,
                tiempoLlenado: datos.tiempoLlenado,
                tiempoVaciado: datos.tiempoVaciado
            };
            
            const tuberias = CalculoTuberias.calcularTodasLasTuberias(datosTuberias);
            const htmlTuberias = CalculoTuberias.generarHTMLResultados(tuberias);
            
            document.getElementById('resultadosTuberias').innerHTML = htmlTuberias;
            console.log('✅ Tuberías calculadas correctamente');
        } else {
            console.warn('⚠️ CalculoTuberias no está cargado');
        }
        
        // Actualizar 3D con las dimensiones finales
        Render3D.crearEstanque(
            resultados.largo,
            resultados.ancho,
            resultados.altura,
            datos.espesorMuros,
            datos.espesorFondo
        );
        
        // Scroll suave a resultados (en móviles)
        if (window.innerWidth <= 992) {
            document.querySelector('.panel-derecho').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        return true;
    },

    // Exportar reporte (placeholder)
    exportarReporte: function() {
        const datos = this.obtenerDatos();
        const resultados = Calculos.calcularEstanque(datos);
        const resumen = Calculos.generarResumen(resultados);
        
        // Crear contenido del reporte
        let reporte = '='.repeat(60) + '\n';
        reporte += 'REPORTE DE DISEÑO - ESTANQUE DE AGUA POTABLE\n';
        reporte += 'Según Normas Chilenas NCh691\n';
        reporte += '='.repeat(60) + '\n\n';
        
        reporte += 'DATOS DEL EDIFICIO:\n';
        reporte += '-'.repeat(60) + '\n';
        reporte += `Número de Pisos: ${datos.numPisos}\n`;
        reporte += `Departamentos por Piso: ${datos.deptosPorPiso}\n`;
        reporte += `Habitantes por Departamento: ${datos.habitantesPorDepto}\n`;
        reporte += `Total Departamentos: ${resultados.totalDepartamentos}\n`;
        reporte += `Total Habitantes: ${resultados.totalHabitantes}\n`;
        reporte += `Tipo de Edificio: ${datos.tipoEdificio}\n\n`;
        
        reporte += 'DISEÑO DEL ESTANQUE:\n';
        reporte += '-'.repeat(60) + '\n';
        reporte += `Dimensiones: ${resultados.largo.toFixed(2)} x ${resultados.ancho.toFixed(2)} x ${resultados.altura.toFixed(2)} m\n`;
        reporte += `Volumen Útil: ${resultados.volumenUtil.toFixed(2)} m³\n`;
        reporte += `Capacidad: ${Math.round(resultados.capacidadLitros)} litros\n`;
        reporte += `Peso del Agua: ${resultados.pesoAgua.toFixed(0)} kN\n`;
        reporte += `Días de Autonomía: ${resultados.diasAutonomia.toFixed(1)} días\n\n`;
        
        reporte += 'DOTACIÓN DE AGUA:\n';
        reporte += '-'.repeat(60) + '\n';
        reporte += `Dotación por Habitante: ${resultados.dotacionPorHabitante} L/hab/día\n`;
        reporte += `Dotación Diaria Total: ${Math.round(resultados.dotacionDiaria)} L/día\n`;
        reporte += `Volumen Requerido: ${resultados.volumenRequerido.toFixed(2)} m³\n`;
        reporte += `Estado: ${resultados.mensajeCapacidad}\n\n`;
        
        reporte += 'SISTEMA DE BOMBEO:\n';
        reporte += '-'.repeat(60) + '\n';
        reporte += `Número de Bombas: ${resultados.numeroBombas} (${resultados.descripcionBombas})\n`;
        reporte += `Presión Requerida: ${resultados.presionRequerida.toFixed(1)} m.c.a\n`;
        reporte += `Caudal Estimado: ${resultados.caudalEstimado.toFixed(1)} L/min\n`;
        reporte += `Potencia por Bomba: ${resultados.potenciaBomba} HP\n\n`;
        
        reporte += 'PARÁMETROS ESTRUCTURALES:\n';
        reporte += '-'.repeat(60) + '\n';
        reporte += `Espesor de Muros: ${datos.espesorMuros} m\n`;
        reporte += `Espesor de Fondo: ${datos.espesorFondo} m\n`;
        reporte += `Resistencia Hormigón: ${datos.hormigon}\n`;
        reporte += `Acero de Refuerzo: ${datos.acero}\n\n`;
        
        // ✅ NUEVO: Agregar dimensiones de sala de bombas al reporte
        reporte += 'SALA DE BOMBAS:\n';
        reporte += '-'.repeat(60) + '\n';
        reporte += `Dimensiones Sala: ${datos.salaAncho} x ${datos.salaProfundidad} x ${datos.salaAltura} m\n`;
        reporte += `Número de Bombas: ${resultados.numeroBombas}\n`;
        reporte += `Potencia por Bomba: ${resultados.potenciaBomba} HP\n\n`;
        
        reporte += 'RECOMENDACIONES:\n';
        reporte += '-'.repeat(60) + '\n';
        resultados.recomendaciones.forEach((rec, index) => {
            reporte += `${index + 1}. ${rec.mensaje}\n`;
        });
        
        reporte += '\n' + '='.repeat(60) + '\n';
        reporte += 'Fecha de emisión: ' + new Date().toLocaleDateString('es-CL') + '\n';
        reporte += '='.repeat(60) + '\n';
        
        // Descargar como archivo de texto
        const blob = new Blob([reporte], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Reporte_Estanque_${new Date().getTime()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        alert('Reporte exportado correctamente');
    },

    // Inicializar formulario
    init: function() {
        this.configurarEventos();
        
        // Crear estanque inicial
        const datos = this.obtenerDatos();
        Render3D.crearEstanque(
            datos.largo,
            datos.ancho,
            datos.altura,
            datos.espesorMuros,
            datos.espesorFondo
        );
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Formulario;
}