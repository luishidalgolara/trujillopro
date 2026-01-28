// Módulo de validaciones
const Validaciones = {
    // Validar número de pisos
    validarPisos: function(pisos) {
        const errores = [];
        
        if (isNaN(pisos) || pisos === null || pisos === '') {
            errores.push('Debe ingresar un número de pisos válido');
        } else if (pisos < 1) {
            errores.push('El número de pisos debe ser al menos 1');
        } else if (pisos > 50) {
            errores.push('El número de pisos no puede exceder 50');
        }
        
        return errores;
    },

    // Validar departamentos por piso
    validarDepartamentos: function(deptos) {
        const errores = [];
        
        if (isNaN(deptos) || deptos === null || deptos === '') {
            errores.push('Debe ingresar un número de departamentos válido');
        } else if (deptos < 1) {
            errores.push('Debe haber al menos 1 departamento por piso');
        } else if (deptos > 20) {
            errores.push('Número de departamentos por piso excesivo (máx. 20)');
        }
        
        return errores;
    },

    // Validar habitantes por departamento
    validarHabitantes: function(habitantes) {
        const errores = [];
        
        if (isNaN(habitantes) || habitantes === null || habitantes === '') {
            errores.push('Debe ingresar un número de habitantes válido');
        } else if (habitantes < 1) {
            errores.push('Debe haber al menos 1 habitante por departamento');
        } else if (habitantes > 10) {
            errores.push('Número de habitantes por departamento muy alto (máx. 10)');
        }
        
        return errores;
    },

    // Validar dimensiones del estanque
    validarDimensiones: function(largo, ancho, altura) {
        const errores = [];
        
        // Validar largo
        if (isNaN(largo) || largo === null || largo === '') {
            errores.push('Debe ingresar un largo válido');
        } else if (largo < 1) {
            errores.push('El largo debe ser al menos 1 metro');
        } else if (largo > 20) {
            errores.push('El largo no puede exceder 20 metros');
        }
        
        // Validar ancho
        if (isNaN(ancho) || ancho === null || ancho === '') {
            errores.push('Debe ingresar un ancho válido');
        } else if (ancho < 1) {
            errores.push('El ancho debe ser al menos 1 metro');
        } else if (ancho > 20) {
            errores.push('El ancho no puede exceder 20 metros');
        }
        
        // Validar altura
        if (isNaN(altura) || altura === null || altura === '') {
            errores.push('Debe ingresar una altura válida');
        } else if (altura < 0.5) {
            errores.push('La altura debe ser al menos 0.5 metros');
        } else if (altura > 10) {
            errores.push('La altura no puede exceder 10 metros');
        }
        
        // Validar proporciones
        if (!isNaN(largo) && !isNaN(ancho) && !isNaN(altura)) {
            const relacion = Math.max(largo, ancho) / Math.min(largo, ancho);
            if (relacion > 4) {
                errores.push('La relación largo/ancho es muy desproporcionada (máx. 4:1)');
            }
            
            const volumen = largo * ancho * altura;
            if (volumen < 5) {
                errores.push('El volumen del estanque es muy pequeño (mín. 5 m³)');
            }
            if (volumen > 500) {
                errores.push('El volumen del estanque es muy grande (máx. 500 m³)');
            }
        }
        
        return errores;
    },

    // Validar espesores
    validarEspesores: function(espesorMuros, espesorFondo) {
        const errores = [];
        
        if (isNaN(espesorMuros) || espesorMuros === null || espesorMuros === '') {
            errores.push('Debe ingresar un espesor de muros válido');
        } else if (espesorMuros < 0.15) {
            errores.push('El espesor de muros debe ser al menos 0.15 m (15 cm)');
        } else if (espesorMuros > 0.5) {
            errores.push('El espesor de muros no puede exceder 0.5 m (50 cm)');
        }
        
        if (isNaN(espesorFondo) || espesorFondo === null || espesorFondo === '') {
            errores.push('Debe ingresar un espesor de fondo válido');
        } else if (espesorFondo < 0.15) {
            errores.push('El espesor de fondo debe ser al menos 0.15 m (15 cm)');
        } else if (espesorFondo > 0.5) {
            errores.push('El espesor de fondo no puede exceder 0.5 m (50 cm)');
        }
        
        return errores;
    },

    // Validar todos los datos del formulario
    validarFormulario: function(datos) {
        let errores = [];
        
        errores = errores.concat(this.validarPisos(datos.numPisos));
        errores = errores.concat(this.validarDepartamentos(datos.deptosPorPiso));
        errores = errores.concat(this.validarHabitantes(datos.habitantesPorDepto));
        errores = errores.concat(this.validarDimensiones(datos.largo, datos.ancho, datos.altura));
        errores = errores.concat(this.validarEspesores(datos.espesorMuros, datos.espesorFondo));
        
        return errores;
    },

    // Mostrar errores en la interfaz
    mostrarErrores: function(errores) {
        if (errores.length === 0) return true;
        
        let mensaje = 'Se encontraron los siguientes errores:\n\n';
        errores.forEach((error, index) => {
            mensaje += `${index + 1}. ${error}\n`;
        });
        
        alert(mensaje);
        return false;
    },

    // Sanitizar número (eliminar caracteres no numéricos excepto punto decimal)
    sanitizarNumero: function(valor) {
        if (typeof valor === 'string') {
            valor = valor.replace(',', '.');
            valor = valor.replace(/[^\d.]/g, '');
        }
        return parseFloat(valor);
    },

    // Formatear número para mostrar (con separadores de miles y decimales)
    formatearNumero: function(numero, decimales = 2) {
        if (isNaN(numero)) return '--';
        return numero.toLocaleString('es-CL', {
            minimumFractionDigits: decimales,
            maximumFractionDigits: decimales
        });
    },

    // Validar rango de valor
    validarRango: function(valor, min, max, nombre) {
        if (isNaN(valor) || valor === null || valor === '') {
            return `${nombre} debe ser un valor numérico válido`;
        }
        if (valor < min) {
            return `${nombre} debe ser al menos ${min}`;
        }
        if (valor > max) {
            return `${nombre} no puede exceder ${max}`;
        }
        return null;
    },

    // Verificar si un valor es número válido
    esNumeroValido: function(valor) {
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    },

    // Redondear a decimales específicos
    redondear: function(numero, decimales = 2) {
        const factor = Math.pow(10, decimales);
        return Math.round(numero * factor) / factor;
    },

    // Limitar valor entre mínimo y máximo
    limitar: function(valor, min, max) {
        return Math.max(min, Math.min(max, valor));
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validaciones;
}
