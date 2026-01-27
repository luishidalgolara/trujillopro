// ============================================================
// PREGUNTAS Y RESPUESTAS - ARCHIVO 05
// NCh Elec 4/2003 - Sistemas de Canalización
// ============================================================

const preguntasRespuestas_05 = {
    categoria: "SISTEMAS DE CANALIZACIÓN",
    
    preguntas: [
        {
            id: "05_001",
            pregunta: "¿Qué es un cable MI (mineral)?",
            respuesta: "Es un cable con conductores de aislación MINERAL REFRACTARIA altamente comprimida y cubierta de COBRE continua, estanca a líquidos, vapores y gases. Puede usarse en ambientes peligrosos, corrosivos, húmedos, con lubricantes o gasolina. MUY RESISTENTE.",
            keywords: ["mi", "mineral", "cobre", "refractario", "peligroso"],
            seccion: "8.2.1.1-8.2.1.2"
        },
        {
            id: "05_002",
            pregunta: "¿Dónde NO se pueden usar conductores desnudos?",
            respuesta: "NO se permiten en: 1) Locales PELIGROSOS, 2) Locales HÚMEDOS o mojados, 3) Donde haya VAPORES CORROSIVOS. Solo se usan en líneas aéreas exteriores, subestaciones con personal calificado y barras trole. EXCEPCIÓN: salas de baterías.",
            keywords: ["desnudo", "prohibido", "peligroso", "húmedo", "corrosivo"],
            seccion: "8.2.2.2-8.2.2.3"
        },
        {
            id: "05_003",
            pregunta: "¿Cuál es la altura mínima de líneas aéreas desnudas?",
            respuesta: "La altura mínima entre el conductor MÁS BAJO y el suelo es de 5 METROS (en el punto de máxima flecha). Esto es por seguridad para evitar contacto accidental con personas o vehículos.",
            keywords: ["altura", "5 metros", "aérea", "desnuda", "flecha"],
            seccion: "8.2.2.5"
        },
        {
            id: "05_004",
            pregunta: "¿Cuál es la distancia entre conductores en líneas aéreas desnudas?",
            respuesta: "La distancia MÍNIMA entre conductores medida en los apoyos es: 20 CM para vanos hasta 30m, y 30 CM para vanos superiores. Esto evita cortocircuitos por balanceo con viento.",
            keywords: ["distancia", "20cm", "30cm", "vanos", "separación"],
            seccion: "8.2.2.7"
        },
        {
            id: "05_005",
            pregunta: "¿Qué es un cable plano (TPS)?",
            respuesta: "Es un conjunto de 2, 3 o 4 conductores aislados PARALELOS envueltos por CHAQUETA, formando sección rectangular. Ejemplo: cable NYFY (TPS). Se usa SOBREPUESTO en interiores, NO necesita ducto. Ideal para instalaciones rápidas en viviendas.",
            keywords: ["tps", "plano", "nyfy", "sobrepuesto", "sin ducto"],
            seccion: "8.2.4.1-8.2.4.2"
        },
        {
            id: "05_006",
            pregunta: "¿Dónde NO se puede usar cable plano?",
            respuesta: "NO se puede usar: 1) En casas de MADERA o materiales combustibles, 2) Apoyado sobre material combustible, 3) En tabiques con estructura/relleno combustible. Solo en construcciones INCOMBUSTIBLES (cemento, ladrillo, etc.).",
            keywords: ["cable plano", "prohibido", "madera", "combustible"],
            seccion: "8.2.4.2-8.2.4.7"
        },
        {
            id: "05_007",
            pregunta: "¿Cómo se instala cable plano embutido?",
            respuesta: "Embutido solo se permite en tramos VERTICALES Y HORIZONTALES. Horizontales a 0,30m de los CIELOS y a 0,20m de los PISOS. No se permiten diagonales. Puede ir bajo revoque de cemento o yeso.",
            keywords: ["cable plano", "embutido", "0.30m", "0.20m", "vertical"],
            seccion: "8.2.4.5"
        },
        {
            id: "05_008",
            pregunta: "¿Qué tipos de cable se usan en instalación sobre soportes?",
            respuesta: "Solo se usan cables MULTICONDUCTORES con chaqueta: TTMU, NYY, USE, EVA o similares. Altura mínima 2 metros en horizontal. Bajadas verticales protegidas bajo 1,2m. Distancia máxima entre soportes: 1,5m.",
            keywords: ["soportes", "ttmu", "nyy", "2 metros", "1.5m"],
            seccion: "8.2.5.1-8.2.5.3"
        },
        {
            id: "05_009",
            pregunta: "¿Qué tipos de tubería metálica existen?",
            respuesta: "FERROSAS: pared gruesa (cañería), pared media, pared delgada (conduit). NO FERROSAS: cobre o bronce. Las ferrosas pueden ser BARNIZADAS (solo interior seco) o GALVANIZADAS (uso general, intemperie). NO mezclar metálicas de distintos materiales.",
            keywords: ["tubería", "metálica", "galvanizada", "barnizada", "conduit"],
            seccion: "8.2.6.1"
        },
        {
            id: "05_010",
            pregunta: "¿Por qué todos los conductores AC deben ir en la misma tubería metálica?",
            respuesta: "Para evitar CALENTAMIENTO por INDUCCIÓN ELECTROMAGNÉTICA. En corriente alterna, si van separados, la tubería se calienta por las corrientes inducidas. Por eso fases + neutro deben ir juntos en LA MISMA tubería.",
            keywords: ["inducción", "calentamiento", "ac", "misma tubería", "neutro"],
            seccion: "8.2.6.2"
        },
        {
            id: "05_011",
            pregunta: "¿Se puede usar tubería electrogalvanizada?",
            respuesta: "NO. Está PROHIBIDO usar tubería electrogalvanizada. Solo se acepta galvanizado EN CALIENTE porque el electrogalvanizado NO deposita cinc en el INTERIOR, dejándola sin protección interna contra corrosión.",
            keywords: ["electrogalvanizado", "prohibido", "caliente", "interior"],
            seccion: "8.2.6.3"
        },
        {
            id: "05_012",
            pregunta: "¿Dónde se puede usar tubería barnizada?",
            respuesta: "Tubería barnizada SOLO en: 1) Bajo techo, 2) Locales SECOS, 3) Ambientes NO corrosivos, 4) A la vista. NO se puede embeber en YESO (solo en cemento). Es la opción más económica pero limitada.",
            keywords: ["barnizada", "seco", "techo", "yeso", "cemento"],
            seccion: "8.2.6.4-8.2.6.5"
        },
        {
            id: "05_013",
            pregunta: "¿Cuál es el radio de curvatura mínimo para tuberías?",
            respuesta: "Depende del diámetro: Tubería ½\" y ¾\" → 10cm, 1\" → 10cm, 1¼\" → 12cm, 1½\" → 18cm, 2\" → 20cm, 3\" → 30cm, 4\" → 45cm. La curva NO debe dañar ni reducir el diámetro interno.",
            keywords: ["radio", "curvatura", "10cm", "tubería", "doblar"],
            seccion: "8.2.6.14 - Tabla 8.13"
        },
        {
            id: "05_014",
            pregunta: "¿Cuántas curvas se permiten entre cajas?",
            respuesta: "Máximo desviación de 180° (dos curvas de 90°) entre cajas. Si se necesita más desviación → COLOCAR CAJAS INTERMEDIAS. Excepción: distancias menores a 5m permiten hasta 270° sin caja intermedia.",
            keywords: ["curvas", "180 grados", "270 grados", "cajas", "desviación"],
            seccion: "8.2.6.15"
        },
        {
            id: "05_015",
            pregunta: "¿Cuál es la distancia entre soportes para tubería metálica?",
            respuesta: "Tubería metálica a la vista u oculta debe tener SOPORTES cada 1,50 METROS máximo. Esto asegura que no se pandee ni se mueva. Los soportes deben ser resistentes a la corrosión.",
            keywords: ["soportes", "1.50m", "fijación", "distancia"],
            seccion: "8.2.6.16"
        },
        {
            id: "05_016",
            pregunta: "¿Qué es tubería metálica flexible?",
            respuesta: "Es tubería de lámina de ACERO en forma helicoidal que se curva MANUALMENTE sin herramientas. Hay 2 tipos: LIVIANA (sin chaqueta, máx 1,5m) y USO PESADO (con chaqueta, máx 2m). Se usa para conexiones a equipos con vibración.",
            keywords: ["flexible", "helicoidal", "1.5m", "2m", "vibración"],
            seccion: "8.2.7.1-8.2.7.7"
        },
        {
            id: "05_017",
            pregunta: "¿Qué materiales se usan en tubería no metálica?",
            respuesta: "Materiales APROBADOS: PVC (uso general) y PE - Polietileno (solo embutido/subterráneo tránsito liviano). Deben ser INCOMBUSTIBLES o AUTOEXTINGUENTES, resistentes a impactos, humedad, químicos y deformación por calor.",
            keywords: ["pvc", "polietileno", "pe", "no metálica", "plástica"],
            seccion: "8.2.8.3"
        },
        {
            id: "05_018",
            pregunta: "¿Dónde NO se puede usar tubería no metálica?",
            respuesta: "NO se puede usar en: 1) Lugares con riesgo de INCENDIO o EXPLOSIÓN, 2) Como SOPORTE de equipos, 3) Expuesta a SOL directo (salvo aprobada), 4) Daños físicos severos, 5) Temperatura excesiva.",
            keywords: ["pvc prohibido", "explosión", "sol", "soporte"],
            seccion: "8.2.8.4"
        },
        {
            id: "05_019",
            pregunta: "¿Qué tipos de tubería PVC existen?",
            respuesta: "PVC RÍGIDA: Tipo I, II, III (livianos/semilivianos según NCh), Sch 40 (pesado), Sch 80 (alto impacto). Tipo III de 16mm es la MÁS LIVIANA. Para SUBTERRÁNEO solo Sch 40 o Sch 80. PE (polietileno) es SEMIRÍGIDA.",
            keywords: ["tipo", "sch 40", "sch 80", "liviana", "pesada"],
            seccion: "8.2.9.2-8.2.9.5 - Tabla 8.15"
        },
        {
            id: "05_020",
            pregunta: "¿Cuál es la distancia entre soportes para tubería PVC?",
            respuesta: "Según diámetro: ½\" a ¾\" → 1,20m, 1\" a 2\" → 1,50m, 2½\" a 3\" → 1,80m, 3½\" a 5\" → 2,00m, 6\" → 2,50m. Además, abrazadera a MÍNIMO 0,4m de cajas o extremos.",
            keywords: ["pvc soportes", "1.20m", "1.50m", "0.4m", "abrazadera"],
            seccion: "8.2.9.10 - Tabla 8.14"
        }
    ]
};

// Exportar para uso en el asistente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = preguntasRespuestas_05;
}

console.log('✅ Archivo 05 - Sistemas de Canalización cargado: ' + preguntasRespuestas_05.preguntas.length + ' preguntas');