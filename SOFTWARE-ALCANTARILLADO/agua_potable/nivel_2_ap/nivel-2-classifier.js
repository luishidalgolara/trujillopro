// nivel_2_ap/nivel-2-classifier.js
export function clasificarElementosNivel2AP(elementosNivel2) {
    console.log('📋 Clasificando elementos 2° NIVEL Agua Potable...');
    
    const elementos = {
        // ✅ CORREGIDO: Buscar 'conexion-nivel-2' en lugar de 'medidor-agua'
        medidores: elementosNivel2.filter(el => el.type === 'conexion-nivel-2' && el.nivel === 2),
        
        fuentesCalor: elementosNivel2.filter(el => 
            ['calefon', 'termo-electrico', 'caldera'].includes(el.type) && el.nivel === 2
        ),
        
        consumo: elementosNivel2.filter(el => el.categoria === 'consumo' && el.nivel === 2)
    };
    
    console.log(`├─ Conexiones nivel 2: ${elementos.medidores.length}`);
    console.log(`├─ Fuentes calor nivel 2: ${elementos.fuentesCalor.length}`);
    console.log(`└─ Consumo nivel 2: ${elementos.consumo.length}`);
    
    // ✅ EXPONER PARA DEBUG
    window.CLASIFICACION_NIVEL_2 = elementos;
    
    return elementos;
}

export function obtenerElementosNivel2FromMain(todosElementos) {
    return todosElementos.filter(el => el.nivel === 2);
}

export function obtenerElementosNivel1FromMain(todosElementos) {
    return todosElementos.filter(el => !el.nivel || el.nivel === 1);
}

console.log('✅ nivel-2-classifier.js cargado');