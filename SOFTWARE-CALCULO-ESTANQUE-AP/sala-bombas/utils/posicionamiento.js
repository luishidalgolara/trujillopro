/**
 * POSICIONAMIENTO - Cálculo de posiciones de elementos
 * Determina ubicaciones óptimas para bombas, tuberías, etc.
 */

const PosicionamientoSala = {
    /**
     * Calcular todas las posiciones necesarias
     */
    calcularPosiciones: function(datos) {
        const posiciones = {};

        // ✅ MODIFICADO: Usar dimensiones del formulario si están disponibles, sino calcular automáticamente
        posiciones.sala = this.calcularDimensionesSala(datos.numeroBombas, datos.dimensionesSala);

        // ✅ NUEVO: Calcular offset para posicionar sala al costado del estanque
        const estanqueLargo = datos.posicionEstanque ? datos.posicionEstanque.largo : 5.6;
        posiciones.offsetSala = {
            x: -(estanqueLargo / 2) - posiciones.sala.ancho - 1.0, // Al lado izquierdo del estanque
            y: 0,
            z: 0
        };

        // 2. Posiciones de las bombas (relativas al offset de la sala)
        posiciones.bombas = this.calcularPosicionesBombas(
            datos.numeroBombas,
            posiciones.sala,
            posiciones.offsetSala
        );

        // 3. Punto de conexión con el estanque
        posiciones.puntoEstanque = this.calcularPuntoEstanque(
            datos.posicionEstanque,
            posiciones.sala
        );

        // 4. Punto de salida hacia el edificio
        posiciones.puntoSalida = this.calcularPuntoSalida(posiciones.sala, posiciones.offsetSala);

        // 5. Posición del tablero eléctrico
        posiciones.tablero = this.calcularPosicionTablero(posiciones.sala, posiciones.offsetSala);

        // 6. Posiciones de los manómetros
        posiciones.manometros = this.calcularPosicionesManometros(posiciones.bombas);

        return posiciones;
    },

    /**
     * ✅ MODIFICADO: Calcular dimensiones óptimas de la sala según bombas
     * Ahora puede recibir dimensiones personalizadas del formulario
     */
    calcularDimensionesSala: function(numeroBombas, dimensionesSala) {
        // Si se proporcionan dimensiones personalizadas, usarlas
        if (dimensionesSala && dimensionesSala.ancho && dimensionesSala.profundidad && dimensionesSala.altura) {
            return {
                ancho: dimensionesSala.ancho,
                profundidad: dimensionesSala.profundidad,
                altura: dimensionesSala.altura
            };
        }

        // Si no, calcular dimensiones automáticas según número de bombas
        let ancho = 4.0;  // metros
        let profundidad = 6.0;  // metros
        const altura = 3.5;  // metros (altura estándar)

        // Ajustar según número de bombas
        if (numeroBombas === 2) {
            ancho = 4.0;
            profundidad = 5.0;
        } else if (numeroBombas === 3) {
            ancho = 5.0;
            profundidad = 6.0;
        } else if (numeroBombas >= 4) {
            ancho = 6.0;
            profundidad = 7.0;
        }

        return { ancho, profundidad, altura };
    },

    /**
     * Calcular posiciones individuales de cada bomba
     */
    calcularPosicionesBombas: function(numeroBombas, dimensionesSala, offsetSala) {
        const posiciones = [];

        // Espacio mínimo entre bombas
        const espacioMinimo = 1.5;  // metros
        
        // Distancia desde la pared frontal (dentro de la sala)
        const distanciaFrente = -dimensionesSala.profundidad / 2 + 2.0;
        
        // Calcular espaciado horizontal
        const espacioDisponible = dimensionesSala.ancho - 2.0;  // Margen de 1m a cada lado
        const espaciado = Math.min(
            espacioDisponible / (numeroBombas + 1),
            espacioMinimo
        );

        // Determinar si van en una o dos filas
        if (numeroBombas <= 3) {
            // Una sola fila
            for (let i = 0; i < numeroBombas; i++) {
                posiciones.push({
                    x: offsetSala.x - dimensionesSala.ancho / 2 + 1.0 + espaciado * (i + 1),
                    y: 0.2,  // Sobre el piso
                    z: offsetSala.z + distanciaFrente
                });
            }
        } else {
            // Dos filas
            const bombasPorFila = Math.ceil(numeroBombas / 2);
            let contador = 0;

            for (let fila = 0; fila < 2; fila++) {
                const numEnFila = fila === 0 ? bombasPorFila : numeroBombas - bombasPorFila;
                const zFila = offsetSala.z + distanciaFrente + fila * 2.0;

                for (let i = 0; i < numEnFila && contador < numeroBombas; i++) {
                    posiciones.push({
                        x: offsetSala.x - dimensionesSala.ancho / 2 + 1.0 + espaciado * (i + 1),
                        y: 0.2,
                        z: zFila
                    });
                    contador++;
                }
            }
        }

        return posiciones;
    },

    /**
     * Calcular punto de entrada del agua (conexión con estanque)
     */
    calcularPuntoEstanque: function(posicionEstanque, dimensionesSala) {
        // ✅ CORREGIDO: El estanque está en el origen (0,0,0)
        // La sala de bombas debe estar AL COSTADO (eje X negativo)
        
        if (posicionEstanque) {
            // Posicionar conexión en el lado del estanque
            return {
                x: -(posicionEstanque.largo / 2) - 0.5, // Al lado izquierdo del estanque
                y: 0.5,
                z: 0 // Alineado con el centro del estanque
            };
        }

        // Posición por defecto
        return {
            x: -3.0,
            y: 0.5,
            z: 0
        };
    },

    /**
     * Calcular punto de salida hacia edificio
     */
    calcularPuntoSalida: function(dimensionesSala, offsetSala) {
        return {
            x: offsetSala.x + dimensionesSala.ancho / 2,
            y: 3.0,
            z: offsetSala.z
        };
    },

    /**
     * Calcular posición del tablero eléctrico
     */
    calcularPosicionTablero: function(dimensionesSala, offsetSala) {
        return {
            x: offsetSala.x + dimensionesSala.ancho / 2 - 0.5,
            y: 1.5,
            z: offsetSala.z - dimensionesSala.profundidad / 2 + 0.3
        };
    },

    /**
     * ✅ AGREGADO: Calcular posiciones de manómetros
     * Coloca un manómetro en la salida de cada bomba
     */
    calcularPosicionesManometros: function(posicionesBombas) {
        const posiciones = [];
        
        posicionesBombas.forEach((posBomba, index) => {
            // Manómetro en la línea de impulsión de cada bomba
            posiciones.push({
                x: posBomba.x + 0.3,
                y: 1.6,
                z: posBomba.z
            });
        });

        return posiciones;
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PosicionamientoSala;
}