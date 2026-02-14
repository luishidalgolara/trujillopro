// GLOSARIO TÉCNICO - DATOS COMPLETOS
const moduleData = {
    terminos: [
        {
            termino: "AASHTO",
            categoria: "Normativa",
            definicion: "American Association of State Highway and Transportation Officials - Asociación que desarrolla métodos de diseño de pavimentos usados mundialmente.",
            relacionados: ["ESAL", "Diseño estructural"]
        },
        {
            termino: "Ahuellamiento",
            categoria: "Deterioro",
            definicion: "Deformación permanente longitudinal en las huellas de las ruedas, causada por cargas repetidas y/o altas temperaturas que reblandecen el asfalto.",
            causas: ["Exceso de carga", "Alta temperatura", "Asfalto de baja calidad"],
            imagenejemplo: "ahuellamiento.jpg"
        },
        {
            termino: "Asfalto Modificado",
            categoria: "Material",
            definicion: "Ligante asfáltico al que se le añaden polímeros (SBS, EVA) para mejorar propiedades como elasticidad, resistencia al ahuellamiento y durabilidad.",
            tiposPolimeros: ["SBS (Estireno-Butadieno-Estireno)", "EVA (Etileno Vinil Acetato)", "Crumb Rubber (caucho molido)"],
            ventajas: ["Mayor rango de temperaturas", "Mayor vida útil", "Mejor adherencia"]
        },
        {
            termino: "Base Granular",
            categoria: "Capa Estructural",
            definicion: "Capa de material granular (piedra chancada, grava) ubicada bajo la carpeta de rodadura, que distribuye cargas hacia capas inferiores.",
            requisitos: ["CBR ≥ 80%", "Desgaste Los Ángeles < 40%", "Límite Líquido < 25%"],
            espesorTipico: "15-25 cm"
        },
        {
            termino: "CBR (California Bearing Ratio)",
            categoria: "Ensayo",
            definicion: "Ensayo que mide la capacidad de soporte del suelo, comparando la penetración de un pistón en la muestra vs. material patrón.",
            unidad: "Porcentaje (%)",
            interpretacion: {
                "< 5%": "Subrasante mala - requiere mejoramiento",
                "5-10%": "Subrasante regular",
                "10-20%": "Subrasante buena",
                "> 20%": "Subrasante muy buena",
                "> 80%": "Material de base granular"
            }
        },
        {
            termino: "Ciclo de Vida",
            categoria: "Gestión",
            definicion: "Análisis completo desde diseño, construcción, mantención, rehabilitación hasta fin de vida útil del pavimento, incluyendo costos asociados.",
            fases: ["Diseño", "Construcción", "Operación", "Mantención", "Rehabilitación", "Reconstrucción"]
        },
        {
            termino: "Compactación",
            categoria: "Proceso",
            definicion: "Proceso de densificar el material mediante energía mecánica (rodillos), expulsando aire y reduciendo vacíos.",
            objetivo: "Alcanzar 95-100% densidad Proctor Modificado",
            equipos: ["Rodillo liso vibratorio", "Rodillo neumático", "Rodillo pata de cabra"]
        },
        {
            termino: "Curado",
            categoria: "Proceso",
            definicion: "Proceso de mantener humedad y temperatura adecuadas en hormigón recién colocado para hidratación completa del cemento.",
            duracion: "Mínimo 7 días",
            metodos: ["Riego con agua", "Mantas húmedas", "Membranas curado químico"]
        },
        {
            termino: "Descascaramiento",
            categoria: "Deterioro",
            definicion: "Desintegración superficial del hormigón, con pérdida de mortero y exposición de agregados, causada por ciclos hielo-deshielo o mala calidad superficial.",
            prevencion: ["Curado adecuado", "Aditivos incorporador de aire", "Baja relación agua/cemento"]
        },
        {
            termino: "ESAL (Equivalent Single Axle Load)",
            categoria: "Diseño",
            definicion: "Eje Simple Equivalente de 8.2 toneladas (18.000 lb) usado como patrón para convertir todo el tráfico a un valor único de diseño.",
            formula: "ESAL = Σ(vehículos × factor equivalencia)",
            ejemplo: "1 camión de 45 ton = 5.2 ESAL | 1 auto = 0.0002 ESAL"
        },
        {
            termino: "Fatiga",
            categoria: "Fenómeno",
            definicion: "Daño acumulativo en el material por repetición de cargas inferiores a su resistencia máxima, eventualmente causando falla.",
            manifestacion: "Fisuras tipo piel de cocodrilo",
            leyFatiga: "N = k × (1/ε)^n donde N=ciclos hasta falla, ε=deformación"
        },
        {
            termino: "Geotextil",
            categoria: "Material",
            definicion: "Tela sintética permeable usada para separación, filtración, drenaje o refuerzo entre capas del pavimento.",
            funciones: ["Separar subrasante de base", "Filtrar agua", "Reforzar suelos débiles"],
            materiales: ["Polipropileno", "Poliéster"]
        },
        {
            termino: "Granulometría",
            categoria: "Ensayo",
            definicion: "Distribución por tamaños de las partículas de un agregado, determinada por análisis de tamices.",
            parametros: ["Tamaño máximo", "Módulo finura", "Curva granulométrica"],
            importancia: "Define trabajabilidad y resistencia de mezclas"
        },
        {
            termino: "Imprimación",
            categoria: "Proceso",
            definicion: "Riego de asfalto diluido (MC-30, MC-70) sobre base granular para impermeabilizar y facilitar adherencia con carpeta asfáltica.",
            dosis: "0.5-1.5 litros/m²",
            curado: "24-48 horas antes de carpeta"
        },
        {
            termino: "Junta de Dilatación",
            categoria: "Elemento Estructural",
            definicion: "Espacio dejado en pavimentos rígidos para permitir expansión y contracción térmica del hormigón sin generar tensiones excesivas.",
            separacion: "4-5 metros (transversales), según diseño (longitudinales)",
            tiposJuntas: ["Contracción", "Expansión", "Construcción"]
        },
        {
            termino: "Ligante Asfáltico",
            categoria: "Material",
            definicion: "Producto derivado del petróleo que actúa como cemento en mezclas asfálticas, ligando los agregados entre sí.",
            tipos: ["Cemento asfáltico (CA)", "Asfalto modificado", "Emulsión asfáltica"],
            propiedades: "Viscosidad, Penetración, Punto ablandamiento"
        },
        {
            termino: "MC-V3",
            categoria: "Normativa",
            definicion: "Manual de Carreteras Volumen 3 del MOP Chile - contiene criterios de diseño de pavimentos, catálogos y especificaciones geométricas.",
            contenido: ["Método AASHTO", "Catálogo estructuras", "Drenaje"],
            vigencia: "Actualización continua"
        },
        {
            termino: "Módulo Resiliente",
            categoria: "Propiedad Material",
            definicion: "Propiedad que relaciona esfuerzo y deformación elástica recuperable bajo carga repetida. Usado en diseño mecanístico de pavimentos.",
            unidad: "MPa (Megapascales)",
            dependencia: ["Tipo de suelo", "Humedad", "Densidad", "Temperatura"]
        },
        {
            termino: "Pavimento Articulado",
            categoria: "Tipo Pavimento",
            definicion: "Pavimento conformado por bloques de hormigón (adoquines) sobre cama de arena y base granular.",
            ventajas: ["Reparación fácil", "Flexible ante asentamientos", "Permeable con juntas abiertas"],
            aplicacion: "Tráfico liviano, áreas peatonales"
        },
        {
            termino: "PCI (Pavement Condition Index)",
            categoria: "Evaluación",
            definicion: "Índice que califica el estado funcional del pavimento en escala 0-100, basado en tipo, severidad y cantidad de fallas presentes.",
            rangos: {
                "85-100": "Excelente",
                "70-85": "Muy Bueno",
                "55-70": "Bueno",
                "40-55": "Regular",
                "25-40": "Malo",
                "10-25": "Muy Malo",
                "0-10": "Fallado"
            }
        },
        {
            termino: "Piel de Cocodrilo",
            categoria: "Deterioro",
            definicion: "Fisuras interconectadas formando polígonos similares a escamas de cocodrilo, indica fatiga estructural por repetición de cargas.",
            causa: "Insuficiencia estructural - base o subrasante débil",
            solucion: "Reconstrucción o refuerzo estructural",
            gravedad: "Alta - falla estructural"
        },
        {
            termino: "Proctor Modificado",
            categoria: "Ensayo",
            definicion: "Ensayo para determinar densidad seca máxima y humedad óptima de compactación de un suelo mediante energía de compactación estandarizada.",
            uso: "Especificar densidad mínima en obra (95-100% PM)",
            parametros: "Densidad máxima seca (g/cm³), Humedad óptima (%)"
        },
        {
            termino: "RAP (Reclaimed Asphalt Pavement)",
            categoria: "Material",
            definicion: "Pavimento asfáltico fresado y reciclado que se reutiliza en nuevas mezclas, reduciendo costos y huella ambiental.",
            aplicacion: "Hasta 20-30% en mezclas de alto tráfico",
            beneficios: ["Ahorro 30-50%", "Reduce emisiones", "Conserva recursos naturales"]
        },
        {
            termino: "Recarpeteo",
            categoria: "Mantención",
            definicion: "Colocación de nueva carpeta asfáltica sobre pavimento existente para restaurar características funcionales.",
            espesor: "4-6 cm típico",
            requisito: "Estructura base en buen estado"
        },
        {
            termino: "Sellado de Fisuras",
            categoria: "Mantención",
            definicion: "Rellenado de fisuras con material elastomérico para impedir infiltración de agua y prevenir deterioro acelerado.",
            materiales: ["Asfalto con polímeros", "Sellantes elastoméricos"],
            momento: "Preventivo - antes de invierno"
        },
        {
            termino: "SMA (Stone Mastic Asphalt)",
            categoria: "Tipo Mezcla",
            definicion: "Mezcla asfáltica discontinua con alto contenido de agregado grueso, que forma esqueleto mineral muy resistente a la deformación.",
            características: ["Muy durable", "Alta resistencia ahuellamiento", "Buena macrotextura"],
            aplicacion: "Tráfico pesado, climas extremos"
        },
        {
            termino: "Subrasante",
            categoria: "Capa Estructural",
            definicion: "Capa de terreno natural preparado y compactado que sirve de fundación a todo el paquete estructural del pavimento.",
            requisito: "CBR mínimo según tráfico (típico 5-10%)",
            preparacion: "Escarpe, conformación, compactación 95% PM"
        },
        {
            termino: "TMDA (Tránsito Medio Diario Anual)",
            categoria: "Tráfico",
            definicion: "Promedio aritmético de vehículos que pasan por un punto en 24 horas durante un año.",
            calculo: "TMDA = Σ(vehículos diarios año) / 365",
            uso: "Base para cálculo de ESAL en diseño"
        },
        {
            termino: "Viga Benkelman",
            categoria: "Ensayo",
            definicion: "Equipo que mide deflexión (deformación vertical) del pavimento bajo carga estándar, evaluando capacidad estructural.",
            unidad: "Centésimas de milímetro (0.01 mm)",
            interpretacion: "Mayor deflexión = menor capacidad estructural"
        },
        {
            termino: "WMA (Warm Mix Asphalt)",
            categoria: "Tecnología",
            definicion: "Mezcla asfáltica producida a temperatura reducida (120-140°C vs 160-180°C), mediante aditivos químicos o tecnologías especiales.",
            beneficios: ["20-40% menos energía", "Menores emisiones", "Mayor distancia transporte"],
            limitacion: "Requiere aditivos especiales"
        }
    ],
    categorias: ["Normativa", "Material", "Ensayo", "Deterioro", "Proceso", "Diseño", "Tipo Pavimento", "Evaluación", "Mantención", "Tecnología", "Capa Estructural", "Fenómeno", "Elemento Estructural", "Propiedad Material", "Tipo Mezcla", "Tráfico"]
};
