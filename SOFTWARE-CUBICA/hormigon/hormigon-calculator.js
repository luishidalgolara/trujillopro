// ========================================
// MÓDULO HORMIGÓN - CALCULADORA
// ========================================

// ========================================
// CALCULAR ÁREA DE POLÍGONO (Shoelace Formula)
// ========================================
function calcularAreaPoligono(points) {
    if (points.length < 3) return 0;
    
    let area = 0;
    
    for (let i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length;
        area += points[i].x * points[j].y;
        area -= points[j].x * points[i].y;
    }
    
    area = Math.abs(area) / 2;
    
    return area;
}

// ========================================
// CALCULAR PERÍMETRO
// ========================================
function calcularPerimetro(points) {
    if (points.length < 2) return 0;
    
    let perimetro = 0;
    
    for (let i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length;
        const dx = points[j].x - points[i].x;
        const dy = points[j].y - points[i].y;
        perimetro += Math.sqrt(dx * dx + dy * dy);
    }
    
    return perimetro;
}

// ========================================
// CONVERTIR PÍXELES A METROS
// ========================================
function pixelsToMeters(pixels, escala = '1:100') {
    // Extraer el valor numérico de la escala
    const scaleValue = parseInt(escala.split(':')[1]);
    
    // Asumiendo que 1 píxel = 1mm en la escala real
    // Esto se puede ajustar según la escala del plano
    const pixelsPerMeter = 1000 / scaleValue;
    
    return pixels / pixelsPerMeter;
}

// ========================================
// CALCULAR VOLUMEN DE HORMIGÓN
// ========================================
function calcularVolumenHormigon(areaPixels, altura = 0.15, escala = '1:100') {
    // Convertir área de píxeles a m²
    const areaMetros = pixelsToMeters(Math.sqrt(areaPixels), escala);
    const areaMetrosCuadrados = areaMetros * areaMetros;
    
    // Volumen = Área × Altura
    const volumen = areaMetrosCuadrados * altura;
    
    return volumen;
}

// ========================================
// CALCULAR CANTIDAD DE CEMENTO
// ========================================
function calcularCemento(volumen, dosificacion = 'H20') {
    // Dosificaciones estándar (kg cemento por m³)
    const dosificaciones = {
        'H15': 255,
        'H20': 300,
        'H25': 340,
        'H30': 380
    };
    
    const kgPorM3 = dosificaciones[dosificacion] || 300;
    const kgCemento = volumen * kgPorM3;
    const sacos = Math.ceil(kgCemento / 25); // Sacos de 25kg
    
    return {
        kg: kgCemento,
        sacos: sacos
    };
}

// ========================================
// CALCULAR ÁRIDOS
// ========================================
function calcularAridos(volumen) {
    // Proporciones aproximadas
    const arena = volumen * 0.5; // m³
    const ripio = volumen * 0.7; // m³
    
    return {
        arena: arena,
        ripio: ripio
    };
}

// ========================================
// FUNCIÓN PRINCIPAL DE CÁLCULO
// ========================================
function calcularHormigon(points, altura = 0.15, dosificacion = 'H20', escala = '1:100') {
    // Calcular área en píxeles
    const areaPixels = calcularAreaPoligono(points);
    const perimetroPixels = calcularPerimetro(points);
    
    // Convertir a metros
    const areaMetros = pixelsToMeters(Math.sqrt(areaPixels), escala);
    const areaM2 = areaMetros * areaMetros;
    const perimetroM = pixelsToMeters(perimetroPixels, escala);
    
    // Calcular volumen
    const volumen = areaM2 * altura;
    
    // Calcular materiales
    const cemento = calcularCemento(volumen, dosificacion);
    const aridos = calcularAridos(volumen);
    
    // Calcular enfierradura aproximada (kg/m³)
    const enfierraduraKgM3 = 80; // Promedio para losas
    const enfierradura = volumen * enfierraduraKgM3;
    
    return {
        area: areaM2,
        perimetro: perimetroM,
        volumen: volumen,
        altura: altura,
        dosificacion: dosificacion,
        cemento: cemento,
        aridos: aridos,
        enfierradura: enfierradura,
        polygons: hormigonModule.polygons
    };
}

// ========================================
// GENERAR REPORTE DETALLADO
// ========================================
function generarReporteHormigon(resultado) {
    const reporte = {
        titulo: 'CUBICACIÓN DE HORMIGÓN',
        fecha: new Date().toLocaleDateString('es-CL'),
        datos: {
            'Área': `${resultado.area.toFixed(2)} m²`,
            'Perímetro': `${resultado.perimetro.toFixed(2)} m`,
            'Altura': `${resultado.altura.toFixed(2)} m`,
            'Volumen Total': `${resultado.volumen.toFixed(2)} m³`,
            'Dosificación': resultado.dosificacion
        },
        materiales: {
            'Cemento': `${resultado.cemento.kg.toFixed(0)} kg (${resultado.cemento.sacos} sacos)`,
            'Arena': `${resultado.aridos.arena.toFixed(2)} m³`,
            'Ripio': `${resultado.aridos.ripio.toFixed(2)} m³`,
            'Enfierradura': `${resultado.enfierradura.toFixed(0)} kg`
        }
    };
    
    return reporte;
}

// ========================================
// EXPORTAR A FORMATO TABLA
// ========================================
function exportarTablaHormigon() {
    const polygons = hormigonModule.polygons;
    
    if (polygons.length === 0) {
        alert('No hay polígonos de hormigón para exportar');
        return;
    }
    
    let tabla = 'ÍTEM\tDESCRIPCIÓN\tUNIDAD\tCANTIDAD\n';
    
    polygons.forEach((poly, index) => {
        const resultado = calcularHormigon(poly.points);
        tabla += `${index + 1}\tHormigón ${resultado.dosificacion}\tm³\t${resultado.volumen.toFixed(2)}\n`;
    });
    
    console.log('Tabla de exportación:');
    console.log(tabla);
    
    return tabla;
}

console.log('✅ Módulo Hormigón Calculator cargado');
