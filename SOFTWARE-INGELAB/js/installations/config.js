/**
 * CONFIGURACIÓN DE CONTENIDO EDUCATIVO - INSTALACIONES
 * Información completa y profesional sobre instalaciones de edificios
 */

const INSTALLATIONS_CONTENT = {
    'electrica': {
        name: 'Instalaciones Eléctricas',
        icon: '⚡',
        color: '#FFC107',
        
        intro: `El sistema eléctrico de un edificio es el conjunto de elementos que permiten la distribución 
        de energía eléctrica desde la red pública hasta cada punto de consumo interior. Debe cumplir con 
        normativas de seguridad (NCh Elec 4/2003 en Chile) y ser diseñado por profesionales certificados.`,
        
        components: `<strong>Componentes principales:</strong><br><br>
        
        <strong>1. ACOMETIDA ELÉCTRICA:</strong><br>
        • Empalme desde la red pública de distribución<br>
        • Caja de medidor proporcionada por la empresa eléctrica<br>
        • Capacidad típica: Monofásica 220V o Trifásica 380V<br>
        • Protección con interruptores termomagnéticos en el arranque<br><br>
        
        <strong>2. TABLERO GENERAL:</strong><br>
        • Interruptor general de corte (IGA)<br>
        • Interruptor diferencial (protección de personas) 30mA<br>
        • Interruptores termomagnéticos por circuito (10A, 16A, 32A)<br>
        • Barra de tierra (puesta a tierra)<br>
        • Ubicación: Accesible, ventilada, señalizada<br><br>
        
        <strong>3. TABLEROS SECCIONALES:</strong><br>
        • Distribuidos por pisos o sectores<br>
        • Protecciones independientes por área<br>
        • Facilitan mantenimiento y localización de fallas<br><br>
        
        <strong>4. CIRCUITOS RAMALES:</strong><br>
        • <strong>Iluminación:</strong> Cable 1.5mm² - Protección 10A<br>
        • <strong>Enchufes generales:</strong> Cable 2.5mm² - Protección 16A<br>
        • <strong>Cocina/Horno:</strong> Cable 4-6mm² - Protección 25-32A<br>
        • <strong>Calefón/Termos:</strong> Cable 2.5-4mm² - Protección 16-25A<br>
        • <strong>Aires acondicionados:</strong> Cable 4mm² - Protección 25A<br>
        • <strong>Lavadora/Secadora:</strong> Cable 2.5mm² - Protección 16A<br><br>
        
        <strong>5. CONDUCTORES:</strong><br>
        • Cable tipo NYA o THHN (según instalación)<br>
        • Colores normalizados: Fase (negro/rojo/azul), Neutro (blanco), Tierra (verde-amarillo)<br>
        • Protección en cañerías de PVC o conduit metálico<br>
        • Cajas de paso cada 15-20 metros o en cambios de dirección<br><br>
        
        <strong>6. PUESTA A TIERRA:</strong><br>
        • Sistema que deriva corrientes de falla a tierra<br>
        • Protege personas y equipos<br>
        • Resistencia máxima: 5 Ohms (medición anual obligatoria)<br>
        • Malla de tierra enterrada o jabalinas de cobre`,
        
        process: `<strong>Proceso de instalación:</strong><br><br>
        
        <strong>FASE 1 - PROYECTO:</strong><br>
        1. Cálculo de demanda eléctrica total del edificio<br>
        2. Diseño de circuitos y selección de protecciones<br>
        3. Planos eléctricos con simbología normalizada<br>
        4. Especificaciones técnicas de materiales<br>
        5. Presentación a SEC (Superintendencia de Electricidad y Combustibles)<br><br>
        
        <strong>FASE 2 - OBRA GRUESA:</strong><br>
        1. Instalación de cañerías antes del hormigonado<br>
        2. Cañerías embebidas en losas y muros<br>
        3. Cajas de enchufes e interruptores en altura normalizada<br>
        4. Ductos para tableros eléctricos<br>
        5. Sistema de tierra durante excavación de fundaciones<br><br>
        
        <strong>FASE 3 - TERMINACIONES:</strong><br>
        1. Cableado (alambrado) de todos los circuitos<br>
        2. Instalación de tableros generales y seccionales<br>
        3. Conexión de luminarias y enchufes<br>
        4. Interruptores y elementos de control<br>
        5. Etiquetado de circuitos en tableros<br><br>
        
        <strong>FASE 4 - PRUEBAS Y CERTIFICACIÓN:</strong><br>
        1. Medición de resistencia de aislación (mínimo 1 MegaOhm)<br>
        2. Verificación de polaridad y continuidad<br>
        3. Prueba de funcionamiento de protecciones diferenciales<br>
        4. Medición de resistencia de puesta a tierra<br>
        5. Certificación por instalador autorizado SEC<br>
        6. Inspección de empresa eléctrica para conexión final`,
        
        safety: `<strong>Normas de seguridad:</strong><br><br>
        • Todos los circuitos con cable de tierra<br>
        • Protecciones diferenciales en circuitos de baños y exteriores<br>
        • Altura enchufes: 30cm sobre piso terminado<br>
        • Interruptores: 120cm de altura<br>
        • Distancia mínima a agua: 60cm (baños y cocinas)<br>
        • Espacios húmedos: Grado de protección IP44 mínimo<br>
        • Tableros con tapa y llave, señalizados<br>
        • Plano "Como Construido" actualizado archivado<br>
        • Mantención periódica anual recomendada`,
        
        costs: `<strong>Consideraciones de costos (referencial):</strong><br><br>
        • Proyecto eléctrico profesional: $500.000 - $1.500.000<br>
        • Materiales (vivienda 100m²): $1.200.000 - $2.500.000<br>
        • Mano de obra instalación: $800.000 - $1.800.000<br>
        • Certificación SEC: $50.000 - $150.000<br>
        • Empalme eléctrico: $300.000 - $800.000<br>
        • <em>Nota: Valores aproximados Chile 2024, varían según zona y complejidad</em>`
    },

    'agua': {
        name: 'Sistema de Agua Potable',
        icon: '💧',
        color: '#2196F3',
        
        intro: `El sistema de agua potable distribuye agua apta para consumo humano desde la red pública o 
        fuente propia hasta todos los artefactos sanitarios del edificio. Debe garantizar presión adecuada, 
        calidad del agua y cumplir con normativas sanitarias (NCh 409 - Agua Potable).`,
        
        components: `<strong>Componentes del sistema:</strong><br><br>
        
        <strong>1. ARRANQUE Y MEDIDOR:</strong><br>
        • Arranque desde red pública de agua potable<br>
        • Medidor de consumo (empresa sanitaria)<br>
        • Válvula de corte general antes del medidor<br>
        • Diámetro típico arranque: 20-25mm (3/4" - 1")<br>
        • Cámara de medidor: Accesible desde vía pública<br><br>
        
        <strong>2. ESTANQUE DE ACUMULACIÓN:</strong><br>
        • <strong>Capacidad de diseño:</strong> Consumo diario + reserva incendio<br>
        • Vivienda: 200-300 litros por persona/día<br>
        • Edificio habitacional: 1000 litros mínimo por vivienda<br>
        • <strong>Ubicación:</strong> Subterráneo, primer piso o azotea<br>
        • <strong>Materiales:</strong> Polietileno, fibra de vidrio o hormigón impermeabilizado<br>
        • <strong>Requisitos:</strong> Hermético, con tapa, ventilación filtrada, drenaje<br>
        • Sistema de nivel automático (boya o electrónico)<br>
        • Filtro de entrada y sedimentador<br><br>
        
        <strong>3. SISTEMA DE IMPULSIÓN:</strong><br>
        • <strong>Bomba de agua:</strong> Centrífuga, 0.5-1.5 HP según altura<br>
        • Sistema automatizado con presostato (3-5 bar)<br>
        • Estanque hidroneumático (20-50 litros)<br>
        • Válvula check (anti-retorno)<br>
        • Manómetro para control de presión<br>
        • Protección eléctrica independiente<br><br>
        
        <strong>4. RED DE DISTRIBUCIÓN:</strong><br>
        • <strong>Material de cañerías:</strong><br>
        &nbsp;&nbsp;- PPR (Polipropileno): Termofusión, duradero, higiénico<br>
        &nbsp;&nbsp;- PEX (Polietileno reticulado): Flexible, resistente<br>
        &nbsp;&nbsp;- Cobre: Tradicional, durable, más costoso<br>
        • <strong>Diámetros habituales:</strong><br>
        &nbsp;&nbsp;- Matriz: 25-32mm (1" - 1¼")<br>
        &nbsp;&nbsp;- Ramales baños/cocina: 20mm (¾")<br>
        &nbsp;&nbsp;- Conexiones artefactos: 13mm (½")<br>
        • Llaves de paso en cada piso y ambiente<br>
        • Pendiente mínima 0.5% hacia desagües<br><br>
        
        <strong>5. AGUA CALIENTE (ACS):</strong><br>
        • <strong>Calefón:</strong> Instantáneo, gas, 13-16 litros/min<br>
        • <strong>Termo eléctrico:</strong> Acumulación, 80-150 litros<br>
        • <strong>Termo solar:</strong> Sistema ecológico con apoyo eléctrico<br>
        • <strong>Caldera:</strong> Edificios, calefacción + ACS<br>
        • Aislación térmica de cañerías obligatoria<br>
        • Temperatura de trabajo: 55-60°C<br>
        • Válvula de seguridad y expansión<br><br>
        
        <strong>6. ACCESORIOS Y CONTROL:</strong><br>
        • Válvulas de corte individual por artefacto<br>
        • Llaves de paso en ramales<br>
        • Filtros de sedimentos en entrada<br>
        • Reguladores de presión (si presión > 60 PSI)<br>
        • Purgas de aire en puntos altos`,
        
        process: `<strong>Proceso de instalación:</strong><br><br>
        
        <strong>ETAPA 1 - OBRA GRUESA:</strong><br>
        1. Excavación y construcción de cámara de estanque<br>
        2. Instalación de estanque de acumulación<br>
        3. Cañerías embebidas en losas antes de hormigonar<br>
        4. Cañerías de alimentación vertical (montantes)<br>
        5. Puntos de salida señalizados<br><br>
        
        <strong>ETAPA 2 - EQUIPAMIENTO:</strong><br>
        1. Instalación de sistema de bombeo<br>
        2. Conexión eléctrica de equipos<br>
        3. Instalación de termo/calefón<br>
        4. Válvulas de control y seguridad<br><br>
        
        <strong>ETAPA 3 - TERMINACIONES:</strong><br>
        1. Instalación de grifería y artefactos<br>
        2. Aislación de cañerías de agua caliente<br>
        3. Llaves de paso finales<br>
        4. Etiquetado de válvulas<br><br>
        
        <strong>ETAPA 4 - PRUEBAS:</strong><br>
        1. Prueba hidráulica a 10 bar (24 horas)<br>
        2. Verificación de presión en puntos extremos<br>
        3. Limpieza y desinfección del sistema<br>
        4. Análisis de calidad de agua<br>
        5. Certificación de instalador sanitario`,
        
        maintenance: `<strong>Mantención del sistema:</strong><br><br>
        
        <strong>ESTANQUE DE AGUA:</strong><br>
        • Limpieza y desinfección: Cada 6 meses obligatorio<br>
        • Inspección de fugas y grietas: Trimestral<br>
        • Revisión de boya y válvulas: Trimestral<br>
        • Análisis bacteriológico: Anual<br><br>
        
        <strong>EQUIPOS DE BOMBEO:</strong><br>
        • Revisión de presostato: Cada 3 meses<br>
        • Lubricación de bomba: Según fabricante<br>
        • Limpieza de filtros: Mensual<br>
        • Verificación de carga hidroneumático: Semestral<br><br>
        
        <strong>RED DE DISTRIBUCIÓN:</strong><br>
        • Inspección de fugas: Permanente<br>
        • Purga de aire: Cuando sea necesario<br>
        • Revisión de válvulas: Anual<br>
        • Cambio de empaques: Según desgaste`,
        
        regulations: `<strong>Normativas aplicables:</strong><br><br>
        • NCh 409: Calidad de agua potable<br>
        • DS 735: Reglamento de servicios sanitarios<br>
        • NCh 2485: Sistemas de agua caliente<br>
        • Ordenanza General de Urbanismo y Construcción<br>
        • Normas de empresa sanitaria local<br>
        • Código sanitario (DFL 725)<br><br>
        
        <strong>Presiones de diseño:</strong><br>
        • Mínima en artefactos: 10 PSI (0.7 bar)<br>
        • Óptima de trabajo: 20-40 PSI (1.5-3 bar)<br>
        • Máxima permitida: 60 PSI (4 bar)<br>
        • Ducha confortable: 15-25 PSI`
    },

    'sanitaria': {
        name: 'Instalación Sanitaria (Alcantarillado)',
        icon: '🚿',
        color: '#795548',
        
        intro: `El sistema sanitario o de alcantarillado evacua las aguas residuales (aguas negras y grises) 
        y aguas lluvias desde el edificio hacia la red pública o sistema de tratamiento. Debe diseñarse con 
        pendientes adecuadas y ventilación para evitar obstrucciones, malos olores y sifonamiento.`,
        
        components: `<strong>Componentes del sistema:</strong><br><br>
        
        <strong>1. CLASIFICACIÓN DE AGUAS:</strong><br>
        • <strong>Aguas Negras:</strong> WC (inodoros) - Mayor contaminación<br>
        • <strong>Aguas Grises:</strong> Lavatorios, duchas, lavaplatos - Menor contaminación<br>
        • <strong>Aguas Lluvias:</strong> Techumbre y terrazas - Sistema separado<br>
        • Tendencia moderna: Sistemas separados para reutilización de aguas grises<br><br>
        
        <strong>2. ARTEFACTOS SANITARIOS:</strong><br>
        • <strong>WC/Inodoro:</strong> Descarga 100mm (4"), sello hidráulico integrado<br>
        • <strong>Lavatorio:</strong> Descarga 40mm (1½"), sifón individual<br>
        • <strong>Ducha/Tina:</strong> Descarga 50mm (2"), sifón de piso<br>
        • <strong>Lavaplatos:</strong> Descarga 50mm (2"), sifón doble (dos pozos)<br>
        • <strong>Lavadora:</strong> Descarga 50mm (2"), conexión con sifón<br>
        • Todos los artefactos requieren sello hidráulico (sifón) de 50mm mínimo<br><br>
        
        <strong>3. RED DE EVACUACIÓN HORIZONTAL:</strong><br>
        • <strong>Material:</strong> PVC sanitario (naranja) clase 4<br>
        • <strong>Diámetros:</strong><br>
        &nbsp;&nbsp;- WC individual: 100mm (4")<br>
        &nbsp;&nbsp;- Ramales baño: 75mm (3")<br>
        &nbsp;&nbsp;- Artefactos individuales: 40-50mm (1½" - 2")<br>
        • <strong>Pendientes mínimas:</strong><br>
        &nbsp;&nbsp;- 100mm: 2% (2cm por metro)<br>
        &nbsp;&nbsp;- 75mm: 2.5%<br>
        &nbsp;&nbsp;- 50mm y menores: 3-4%<br>
        • Uniones con pegamento PVC específico<br>
        • Cambios de dirección con codos 45° (no 90°)<br><br>
        
        <strong>4. RED VERTICAL (BAJADAS):</strong><br>
        • <strong>Diámetro mínimo:</strong> 100mm (4") para edificios<br>
        • Ubicación en ductos técnicos verticales<br>
        • Sin cambios de dirección bruscos<br>
        • Fijación cada 1.5 metros<br>
        • Separación de muros: 5cm mínimo<br>
        • Ventilación primaria extendida sobre cubierta<br><br>
        
        <strong>5. VENTILACIÓN:</strong><br>
        • <strong>Ventilación primaria:</strong> Extensión de bajada sobre techo (150mm)<br>
        • <strong>Ventilación secundaria:</strong> Circuitos independientes<br>
        • <strong>Función:</strong> Igualación de presiones, evita sifonamiento<br>
        • Diámetro: 50-75mm según distancias<br>
        • Terminación sobre techo: Mínimo 30cm, con sombrero<br>
        • Artefactos lejanos: Válvulas de admisión de aire<br><br>
        
        <strong>6. CÁMARAS DE INSPECCIÓN:</strong><br>
        • <strong>Ubicación:</strong> Cada 15m, en cambios de dirección, uniones<br>
        • <strong>Dimensiones mínimas:</strong> 60x60cm<br>
        • <strong>Profundidad:</strong> Según cañería (30cm bajo cañería)<br>
        • Tapa hermética, antideslizante<br>
        • Fondo con media caña para flujo<br>
        • Accesibles para limpieza<br><br>
        
        <strong>7. COLECTOR DOMICILIARIO:</strong><br>
        • Diámetro: 100-150mm según cantidad de artefactos<br>
        • Pendiente: 2% mínimo<br>
        • Profundidad: 80cm mínimo bajo tierra<br>
        • Conexión a cámara de alcantarillado público<br>
        • Separación de conexión agua potable: 3m mínimo`,
        
        process: `<strong>Instalación del sistema:</strong><br><br>
        
        <strong>FASE 1 - TRAZADO Y EXCAVACIÓN:</strong><br>
        1. Replanteo según planos sanitarios<br>
        2. Excavación de zanjas con pendiente<br>
        3. Camas de arena (10cm) para asentar cañerías<br>
        4. Construcción de cámaras de inspección<br><br>
        
        <strong>FASE 2 - OBRA GRUESA:</strong><br>
        1. Instalación de cañerías enterradas<br>
        2. Cañerías embebidas en losas (antes de hormigonar)<br>
        3. Bajadas verticales en ductos<br>
        4. Ventilaciones hasta sobre cubierta<br>
        5. Chicotes de salida para artefactos<br><br>
        
        <strong>FASE 3 - TERMINACIONES:</strong><br>
        1. Instalación de sifones y cierres hidráulicos<br>
        2. Conexión de artefactos sanitarios<br>
        3. Sellado de penetraciones<br>
        4. Instalación de tapas de inspección<br><br>
        
        <strong>FASE 4 - PRUEBAS:</strong><br>
        1. Prueba de hermeticidad (taponamiento con agua)<br>
        2. Verificación de pendientes<br>
        3. Prueba de funcionamiento con agua<br>
        4. Prueba de humo (ventilaciones)<br>
        5. Certificación de instalador autorizado`,
        
        maintenance: `<strong>Mantención preventiva:</strong><br><br>
        
        <strong>LIMPIEZA REGULAR:</strong><br>
        • Cámaras de inspección: Semestral<br>
        • Sifones y desagües: Mensual<br>
        • Evitar arrojar: Aceites, grasas, toallas, productos químicos<br>
        • Uso de rejillas atrapa-pelos en duchas<br><br>
        
        <strong>INSPECCIÓN:</strong><br>
        • Verificar pendientes y obstrucciones: Anual<br>
        • Revisión de sellos hidráulicos: Trimestral<br>
        • Estado de ventilaciones: Semestral<br><br>
        
        <strong>DESOBSTRUCCIÓN:</strong><br>
        • Métodos mecánicos (sonda flexible)<br>
        • Hidrojetting (agua a presión)<br>
        • Evitar productos químicos agresivos<br><br>
        
        <strong>SEÑALES DE PROBLEMAS:</strong><br>
        • Malos olores: Falla en sello hidráulico o ventilación<br>
        • Gorgoteos: Problemas de ventilación<br>
        • Descarga lenta: Obstrucción parcial<br>
        • Reflujo: Obstrucción total o contrapendiente`,
        
        regulations: `<strong>Normativas y diseño:</strong><br><br>
        
        <strong>UNIDADES DE DESCARGA (UD):</strong><br>
        • WC con estanque: 4 UD<br>
        • Lavatorio: 1 UD<br>
        • Ducha: 2 UD<br>
        • Tina: 3 UD<br>
        • Lavaplatos: 2 UD<br>
        • Lavadora: 3 UD<br><br>
        
        <strong>DIMENSIONAMIENTO:</strong><br>
        • Hasta 6 UD: Cañería 50mm<br>
        • 7-20 UD: Cañería 75mm<br>
        • 21-120 UD: Cañería 100mm<br>
        • Sobre 120 UD: Cálculo específico<br><br>
        
        <strong>NORMATIVA:</strong><br>
        • OGUC (Ordenanza General Urbanismo y Construcción)<br>
        • NCh 1105: Alcantarillado edificios<br>
        • DS 50: Instalaciones domiciliarias agua potable y alcantarillado<br>
        • Normas de empresa sanitaria local`
    },

    'climatizacion': {
        name: 'Climatización (Aire Acondicionado y Calefacción)',
        icon: '❄️',
        color: '#00BCD4',
        
        intro: `Los sistemas de climatización controlan la temperatura, humedad y calidad del aire interior 
        para proporcionar confort térmico. Incluyen aire acondicionado (frío), calefacción y ventilación 
        mecánica (HVAC). El diseño debe considerar eficiencia energética y cumplir normativas térmicas.`,
        
        components: `<strong>Sistemas de climatización:</strong><br><br>
        
        <strong>1. AIRE ACONDICIONADO SPLIT:</strong><br>
        • <strong>Unidad exterior:</strong> Compresor, condensador, ventilador<br>
        • <strong>Unidad interior:</strong> Evaporador, turbina, filtros<br>
        • <strong>Capacidades:</strong> 9.000 - 24.000 BTU (vivienda)<br>
        • <strong>Tecnología Inverter:</strong> Ahorro energético 30-50%<br>
        • <strong>Funciones:</strong> Frío, calor (bomba de calor), deshumidificación<br>
        • <strong>Cañerías frigoríficas:</strong> Cobre 1/4" y 3/8", aislación térmica<br>
        • <strong>Drenaje:</strong> Condensado 20mm, pendiente 2%<br>
        • <strong>Instalación:</strong><br>
        &nbsp;&nbsp;- Unidad exterior: Ventilada, accesible para mantención<br>
        &nbsp;&nbsp;- Unidad interior: 2.2-2.5m altura, sin obstrucciones<br>
        &nbsp;&nbsp;- Distancia máxima: 5-15m según potencia<br>
        &nbsp;&nbsp;- Desnivel máximo: 5-10m<br><br>
        
        <strong>2. AIRE ACONDICIONADO CENTRAL (VRV/VRF):</strong><br>
        • <strong>Sistema multi-split:</strong> 1 condensadora, múltiples evaporadoras<br>
        • <strong>Capacidad:</strong> 36.000 - 100.000+ BTU<br>
        • <strong>Ventajas:</strong> Control independiente por zona, eficiente<br>
        • <strong>Ideal para:</strong> Edificios, oficinas, comercios<br>
        • Requiere: Ductos técnicos, espacio de máquinas<br><br>
        
        <strong>3. CALEFACCIÓN POR LOSA RADIANTE:</strong><br>
        • <strong>Sistema:</strong> Tuberías PEX embebidas en losa<br>
        • <strong>Temperatura agua:</strong> 35-45°C<br>
        • <strong>Espaciamiento:</strong> 15-20cm entre tuberías<br>
        • <strong>Espesor losa:</strong> 8-10cm sobre tuberías<br>
        • <strong>Fuente de calor:</strong><br>
        &nbsp;&nbsp;- Caldera a gas<br>
        &nbsp;&nbsp;- Bomba de calor aerotérmica<br>
        &nbsp;&nbsp;- Sistema solar térmico + apoyo<br>
        • <strong>Control:</strong> Termostatos por zona, válvulas motorizadas<br>
        • <strong>Ventajas:</strong> Confort, eficiente, silencioso, no ocupa espacio<br>
        • <strong>Desventajas:</strong> Inercia térmica alta, costo inicial alto<br><br>
        
        <strong>4. RADIADORES DE AGUA CALIENTE:</strong><br>
        • <strong>Tipos:</strong> Fierro fundido, aluminio, acero<br>
        • <strong>Distribución:</strong> Bitubular (ida y retorno)<br>
        • <strong>Temperatura:</strong> 60-80°C<br>
        • <strong>Ubicación:</strong> Bajo ventanas, muros exteriores<br>
        • Válvulas termostáticas individuales<br>
        • Purgadores de aire en puntos altos<br><br>
        
        <strong>5. CALEFACCIÓN ELÉCTRICA:</strong><br>
        • <strong>Paneles murales:</strong> 500-2000W, bajo consumo<br>
        • <strong>Convectores:</strong> Circulación natural de aire<br>
        • <strong>Losa radiante eléctrica:</strong> Cables calefactores<br>
        • <strong>Bomba de calor aire-aire:</strong> Eficiencia 300-400%<br>
        • Control individual por ambiente<br>
        • Protección eléctrica independiente<br><br>
        
        <strong>6. VENTILACIÓN MECÁNICA:</strong><br>
        • <strong>Extractores baños:</strong> 80-150 m³/h<br>
        • <strong>Campana cocina:</strong> 400-900 m³/h<br>
        • <strong>Recuperador de calor (HRV):</strong> Eficiencia 85-95%<br>
        • <strong>Ventilación forzada:</strong> Inyección y extracción aire<br>
        • Filtros: HEPA para calidad de aire<br>
        • Conductos: Aluminio flexible o rígido`,
        
        design: `<strong>Diseño y cálculo:</strong><br><br>
        
        <strong>CARGA TÉRMICA (Cálculo frigorías/calorías):</strong><br>
        • <strong>Factores:</strong><br>
        &nbsp;&nbsp;- Superficie del espacio (m²)<br>
        &nbsp;&nbsp;- Altura de techo<br>
        &nbsp;&nbsp;- Aislación térmica (muros, techo, ventanas)<br>
        &nbsp;&nbsp;- Orientación solar<br>
        &nbsp;&nbsp;- Ocupación (personas)<br>
        &nbsp;&nbsp;- Equipos eléctricos (computadores, iluminación)<br>
        &nbsp;&nbsp;- Ventanas: Superficie, DVH o simple vidrio<br><br>
        
        <strong>ESTIMACIÓN RÁPIDA (por m²):</strong><br>
        • <strong>Refrigeración:</strong> 100-150 frigorías/m² (zonas cálidas)<br>
        • <strong>Calefacción:</strong> 80-120 watts/m² (zona centro-sur Chile)<br>
        • Multiplicar x 1.3 si: Mala aislación, muchas ventanas, orientación norte<br><br>
        
        <strong>EJEMPLO VIVIENDA 80m²:</strong><br>
        • Refrigeración: 80m² x 120 frig/m² = 9.600 frig (≈ 10.000 BTU)<br>
        • Calefacción: 80m² x 100 W/m² = 8.000 watts<br><br>
        
        <strong>ZONIFICACIÓN:</strong><br>
        • <strong>Zona día:</strong> Living-comedor-cocina (mayor capacidad)<br>
        • <strong>Zona noche:</strong> Dormitorios (control independiente)<br>
        • <strong>Baños:</strong> Extractores independientes<br><br>
        
        <strong>EFICIENCIA ENERGÉTICA:</strong><br>
        • <strong>Etiquetado energético:</strong> A+++ hasta G<br>
        • <strong>SEER (refrigeración):</strong> > 6.0 (A++)<br>
        • <strong>SCOP (calefacción):</strong> > 4.0 (A++)<br>
        • Inverter: Ahorro 30-50% vs on/off<br>
        • Programación horaria y por temperatura`,
        
        installation: `<strong>Instalación profesional:</strong><br><br>
        
        <strong>AIRE ACONDICIONADO SPLIT:</strong><br>
        1. Perforación muro (Ø 65-75mm) con pendiente exterior<br>
        2. Montaje unidad interior con soportes nivel<br>
        3. Instalación unidad exterior (base antivibrante)<br>
        4. Conexión cañerías frigoríficas (abocardado perfecto)<br>
        5. Aislación térmica de cañerías<br>
        6. Conexión eléctrica con protección independiente<br>
        7. Vacío del sistema (30 minutos mínimo)<br>
        8. Carga de gas refrigerante (R32, R410A)<br>
        9. Prueba de funcionamiento y ajustes<br>
        10. Drenaje de condensado a alcantarillado o exterior<br><br>
        
        <strong>CALEFACCIÓN LOSA RADIANTE:</strong><br>
        1. Aislación térmica base (EPS 20-30mm)<br>
        2. Barrera de vapor<br>
        3. Malla electrosoldada de refuerzo<br>
        4. Instalación de tuberías PEX fijadas a malla<br>
        5. Prueba hidráulica (6 bar, 24 horas)<br>
        6. Hormigonado de losa con aditivo plastificante<br>
        7. Curado controlado (sistema presurizado)<br>
        8. Conexión a colectores con válvulas<br>
        9. Instalación de caldera y controles<br>
        10. Puesta en marcha gradual<br><br>
        
        <strong>CERTIFICACIONES:</strong><br>
        • Instalador SEC clase B (eléctrico)<br>
        • Instalador de gas clase 3 (caldera gas)<br>
        • Certificado de instalación frigorista<br>
        • Proyecto térmico según OGUC Art. 4.1.10`,
        
        maintenance: `<strong>Mantención del sistema:</strong><br><br>
        
        <strong>AIRE ACONDICIONADO:</strong><br>
        • <strong>Mensual:</strong> Limpieza filtros de aire<br>
        • <strong>Trimestral:</strong> Limpieza superficial unidades<br>
        • <strong>Semestral:</strong> Limpieza profunda evaporador<br>
        • <strong>Anual:</strong> Mantención profesional completa<br>
        &nbsp;&nbsp;- Limpieza de turbinas<br>
        &nbsp;&nbsp;- Verificación de presiones gas<br>
        &nbsp;&nbsp;- Revisión conexiones eléctricas<br>
        &nbsp;&nbsp;- Limpieza drenaje condensado<br>
        &nbsp;&nbsp;- Chequeo compresor<br><br>
        
        <strong>LOSA RADIANTE:</strong><br>
        • <strong>Anual:</strong> Revisión presión sistema (1.5-2 bar)<br>
        • <strong>Cada 2 años:</strong> Purga de aire circuitos<br>
        • <strong>Cada 5 años:</strong> Limpieza colectores<br>
        • Mantención caldera según fabricante<br><br>
        
        <strong>VENTILACIÓN:</strong><br>
        • <strong>Mensual:</strong> Limpieza rejillas<br>
        • <strong>Trimestral:</strong> Cambio/limpieza filtros<br>
        • <strong>Anual:</strong> Limpieza ductos y ventiladores`,
        
        costs: `<strong>Costos referenciales (Chile 2024):</strong><br><br>
        
        <strong>AIRE ACONDICIONADO:</strong><br>
        • Split 12.000 BTU: $350.000 - $600.000<br>
        • Split 18.000 BTU Inverter: $550.000 - $900.000<br>
        • Instalación profesional: $80.000 - $150.000<br>
        • Multi-split 3 unidades: $1.800.000 - $2.800.000<br><br>
        
        <strong>CALEFACCIÓN:</strong><br>
        • Losa radiante (completa): $40.000 - $60.000/m²<br>
        • Caldera mural gas: $800.000 - $1.500.000<br>
        • Radiadores aluminio: $80.000 - $150.000/unidad<br>
        • Panel eléctrico: $45.000 - $120.000/unidad<br><br>
        
        <strong>CONSUMO ELÉCTRICO ESTIMADO:</strong><br>
        • AC 12.000 BTU: 1.0-1.5 kW/h<br>
        • Calefactor eléctrico 1500W: 1.5 kW/h<br>
        • Bomba de calor (COP 4): 0.4 kW/h por kW térmico<br>
        • <em>Valores referenciales, varían según uso y tarifa eléctrica</em>`
    },

    'gas': {
        name: 'Instalación de Gas',
        icon: '🔥',
        color: '#FF5722',
        
        intro: `El sistema de gas suministra combustible para calefacción, agua caliente sanitaria y cocción. 
        Puede ser gas natural (red) o gas licuado (cilindros/estanque). Requiere diseño profesional, 
        materiales certificados y cumplimiento estricto de normativas de seguridad (DS 66/2007).`,
        
        components: `<strong>Componentes del sistema:</strong><br><br>
        
        <strong>1. TIPOS DE GAS:</strong><br>
        • <strong>Gas Natural (GN):</strong><br>
        &nbsp;&nbsp;- Suministro por red de distribución<br>
        &nbsp;&nbsp;- Presión: 20-25 mbar (baja presión)<br>
        &nbsp;&nbsp;- Metano (CH₄) principalmente<br>
        &nbsp;&nbsp;- Más liviano que el aire<br>
        &nbsp;&nbsp;- Medidor individual o colectivo<br>
        &nbsp;&nbsp;- Pago mensual según consumo m³<br><br>
        
        • <strong>Gas Licuado de Petróleo (GLP):</strong><br>
        &nbsp;&nbsp;- Cilindros de 15 o 45 kg<br>
        &nbsp;&nbsp;- Estanques fijos de 120-1000 litros<br>
        &nbsp;&nbsp;- Propano o mezcla propano-butano<br>
        &nbsp;&nbsp;- Más pesado que el aire<br>
        &nbsp;&nbsp;- Presión: 28-37 mbar<br>
        &nbsp;&nbsp;- Regulador obligatorio<br><br>
        
        <strong>2. MEDIDOR Y REGULADOR:</strong><br>
        • <strong>Gas Natural:</strong><br>
        &nbsp;&nbsp;- Medidor de la empresa distribuidora<br>
        &nbsp;&nbsp;- Ubicación: Exterior accesible<br>
        &nbsp;&nbsp;- Válvula de corte general<br>
        &nbsp;&nbsp;- Gabinete ventilado y señalizado<br><br>
        
        • <strong>Gas Licuado:</strong><br>
        &nbsp;&nbsp;- Regulador de primera etapa (alta a media presión)<br>
        &nbsp;&nbsp;- Regulador de segunda etapa (media a baja presión)<br>
        &nbsp;&nbsp;- Manómetro de control<br>
        &nbsp;&nbsp;- Válvula de seguridad<br><br>
        
        <strong>3. RED DE DISTRIBUCIÓN INTERIOR:</strong><br>
        • <strong>Materiales permitidos:</strong><br>
        &nbsp;&nbsp;- Cañería de cobre tipo K o L<br>
        &nbsp;&nbsp;- Acero galvanizado Schedule 40<br>
        &nbsp;&nbsp;- Multicapa certificado para gas<br>
        &nbsp;&nbsp;- PROHIBIDO: PVC, mangueras no certificadas<br><br>
        
        • <strong>Diámetros típicos:</strong><br>
        &nbsp;&nbsp;- Matriz: ¾" - 1"<br>
        &nbsp;&nbsp;- Ramales: ½" - ¾"<br>
        &nbsp;&nbsp;- Conexión artefactos: ½"<br><br>
        
        • <strong>Instalación:</strong><br>
        &nbsp;&nbsp;- A la vista o empotrada (con protección)<br>
        &nbsp;&nbsp;- Pendiente 0.5% hacia bajadas<br>
        &nbsp;&nbsp;- Fijación cada 1.5-2.0 metros<br>
        &nbsp;&nbsp;- Distancia a cañerías eléctricas: 5cm mínimo<br>
        &nbsp;&nbsp;- Pintura amarilla identificatoria<br>
        &nbsp;&nbsp;- Válvulas de corte en cada ramal<br><br>
        
        <strong>4. ARTEFACTOS A GAS:</strong><br>
        • <strong>Calefón:</strong> 13-20 litros/min, tiro natural o forzado<br>
        • <strong>Cocina:</strong> 4 quemadores, encendido eléctrico<br>
        • <strong>Horno:</strong> Incorporado o independiente<br>
        • <strong>Caldera:</strong> Calefacción + ACS, mural o piso<br>
        • <strong>Estufa:</strong> Tiro balanceado obligatorio en dormitorios<br>
        • Todos deben tener certificación SEC<br><br>
        
        <strong>5. SISTEMA DE EVACUACIÓN (TIRO):</strong><br>
        • <strong>Tiro Natural:</strong><br>
        &nbsp;&nbsp;- Conducto vertical individual<br>
        &nbsp;&nbsp;- Diámetro según artefacto (100-150mm)<br>
        &nbsp;&nbsp;- Material: Acero inoxidable, galvanizado<br>
        &nbsp;&nbsp;- Altura mínima sobre techo: 60cm<br>
        &nbsp;&nbsp;- Sombrero anti-lluvia y anti-revoco<br><br>
        
        • <strong>Tiro Forzado:</strong><br>
        &nbsp;&nbsp;- Ventilador extractor incorporado<br>
        &nbsp;&nbsp;- Evacuación horizontal posible<br>
        &nbsp;&nbsp;- Tubería coaxial (entrada-salida)<br>
        &nbsp;&nbsp;- Ideal para departamentos<br><br>
        
        • <strong>Tiro Balanceado:</strong><br>
        &nbsp;&nbsp;- Cámara cerrada de combustión<br>
        &nbsp;&nbsp;- Toma de aire del exterior<br>
        &nbsp;&nbsp;- Mayor seguridad<br>
        &nbsp;&nbsp;- Obligatorio en dormitorios<br><br>
        
        <strong>6. VENTILACIÓN DE RECINTOS:</strong><br>
        • <strong>Rejilla inferior:</strong> Mínimo 150 cm² (toma de aire)<br>
        • <strong>Rejilla superior:</strong> Mínimo 150 cm² (evacuación)<br>
        • Ubicación: 20cm del piso y 20cm del cielo<br>
        • Comunicación con exterior obligatoria<br>
        • Cocina con ventana operable obligatorio`,
        
        safety: `<strong>Normas de seguridad:</strong><br><br>
        
        <strong>INSTALACIÓN:</strong><br>
        • Proyecto firmado por instalador clase 3 autorizado SEC<br>
        • Materiales con certificación y norma chilena<br>
        • Prueba de hermeticidad obligatoria (1 hora a 150 mbar)<br>
        • Certificado SEC antes de habilitar<br>
        • Inspección empresa distribuidora<br><br>
        
        <strong>UBICACIÓN ARTEFACTOS:</strong><br>
        • Distancia a materiales combustibles: 20cm mínimo<br>
        • No en baños ni dormitorios (excepto tiro balanceado)<br>
        • Ventilación permanente asegurada<br>
        • Acceso fácil para mantención<br><br>
        
        <strong>DETECTOR DE GAS:</strong><br>
        • <strong>Gas Natural:</strong> Detector en parte alta (más liviano)<br>
        • <strong>Gas Licuado:</strong> Detector en parte baja (más pesado)<br>
        • Alarma sonora y corte automático recomendado<br>
        • Mantención anual<br><br>
        
        <strong>EN CASO DE FUGA:</strong><br>
        1. NO accionar interruptores eléctricos<br>
        2. Abrir puertas y ventanas<br>
        3. Cerrar llave de paso general<br>
        4. Evacuar el lugar<br>
        5. Llamar a emergencias (133) o empresa distribuidora<br>
        6. NO reingresar hasta verificación profesional<br><br>
        
        <strong>MANTENCIÓN:</strong><br>
        • Revisión anual por instalador autorizado<br>
        • Verificación de hermeticidad<br>
        • Limpieza de quemadores<br>
        • Revisión de tiros y ventilaciones<br>
        • Cambio de mangueras cada 2 años<br>
        • Inspección termográfica recomendada`,
        
        regulations: `<strong>Normativa aplicable:</strong><br><br>
        • DS 66/2007: Reglamento de instalaciones interiores de gas<br>
        • NCh 930: Instalaciones interiores de gas<br>
        • NCh 1114: Artefactos de uso doméstico<br>
        • DS 10: Cilindros de gas licuado<br>
        • Superintendencia de Electricidad y Combustibles (SEC)<br>
        • Ordenanza General de Urbanismo y Construcción<br><br>
        
        <strong>CLASES DE INSTALADORES:</strong><br>
        • <strong>Clase 1:</strong> Hasta 6 artefactos o 60 m de cañería<br>
        • <strong>Clase 2:</strong> Hasta 15 artefactos o 150 m de cañería<br>
        • <strong>Clase 3:</strong> Sin límite, todo tipo de instalaciones<br><br>
        
        <strong>PRESIONES DE TRABAJO:</strong><br>
        • Gas Natural: 20-25 mbar<br>
        • Gas Licuado: 28-37 mbar<br>
        • Prueba de hermeticidad: 150 mbar (1 hora)<br>
        • Máxima caída de presión permitida: 5%`,
        
        costs: `<strong>Costos estimados (Chile 2024):</strong><br><br>
        
        <strong>INSTALACIÓN GAS NATURAL:</strong><br>
        • Proyecto e instalación (casa): $450.000 - $900.000<br>
        • Derechos de conexión: $300.000 - $600.000<br>
        • Certificación SEC: $60.000 - $120.000<br><br>
        
        <strong>INSTALACIÓN GAS LICUADO:</strong><br>
        • Proyecto e instalación: $350.000 - $700.000<br>
        • Estanque 120 litros: $380.000 - $550.000<br>
        • Reguladores y accesorios: $80.000 - $150.000<br><br>
        
        <strong>ARTEFACTOS:</strong><br>
        • Calefón 13 L/min: $180.000 - $350.000<br>
        • Cocina 4 quemadores: $150.000 - $400.000<br>
        • Caldera mural: $800.000 - $1.500.000<br>
        • Estufa tiro balanceado: $250.000 - $500.000<br><br>
        
        <strong>CONSUMO:</strong><br>
        • Gas Natural (m³): $350 - $450<br>
        • Gas Licuado (kg): $1.100 - $1.400<br>
        • <em>Precios variables según zona y proveedor</em>`
    },

    'seguridad': {
        name: 'Sistemas de Seguridad',
        icon: '🔔',
        color: '#F44336',
        
        intro: `Los sistemas de seguridad protegen vidas y bienes mediante detección temprana de incendios, 
        intrusión y emergencias. Incluyen sistemas de detección y alarma de incendios (DAI), control de 
        accesos, CCTV y alarmas de intrusión. Son obligatorios en edificios según OGUC y Ley 16.744.`,
        
        components: `<strong>Sistemas de protección:</strong><br><br>
        
        <strong>1. DETECCIÓN Y ALARMA DE INCENDIOS (DAI):</strong><br>
        • <strong>Obligatorio en:</strong><br>
        &nbsp;&nbsp;- Edificios altura > 3 pisos<br>
        &nbsp;&nbsp;- Superficie > 500 m²<br>
        &nbsp;&nbsp;- Lugares de reunión<br>
        &nbsp;&nbsp;- Estacionamientos subterráneos<br><br>
        
        • <strong>Detectores de humo:</strong><br>
        &nbsp;&nbsp;- Ópticos: Detectan partículas de humo<br>
        &nbsp;&nbsp;- Iónicos: Mayor sensibilidad<br>
        &nbsp;&nbsp;- Fotoeléctricos: Fuegos latentes<br>
        &nbsp;&nbsp;- Ubicación: Cielos, cada 60-80 m²<br>
        &nbsp;&nbsp;- Alimentación: 24V DC desde central<br><br>
        
        • <strong>Detectores de temperatura:</strong><br>
        &nbsp;&nbsp;- Termovelocimétricos: Velocidad de aumento<br>
        &nbsp;&nbsp;- Temperatura fija: 57°C, 68°C, 79°C<br>
        &nbsp;&nbsp;- Uso: Cocinas, salas de máquinas<br><br>
        
        • <strong>Pulsadores manuales:</strong><br>
        &nbsp;&nbsp;- Color rojo<br>
        &nbsp;&nbsp;- Altura: 120-140 cm<br>
        &nbsp;&nbsp;- Ubicación: Salidas, escaleras, cada 25m<br>
        &nbsp;&nbsp;- Vidrio rompible o membrana<br><br>
        
        • <strong>Central de alarma:</strong><br>
        &nbsp;&nbsp;- Monitorea todos los detectores<br>
        &nbsp;&nbsp;- Panel con direcciones individuales<br>
        &nbsp;&nbsp;- Batería respaldo 24 horas<br>
        &nbsp;&nbsp;- Registro de eventos<br>
        &nbsp;&nbsp;- Ubicación: Sala de control o portería<br><br>
        
        • <strong>Dispositivos de notificación:</strong><br>
        &nbsp;&nbsp;- Sirenas: 85 dB mínimo<br>
        &nbsp;&nbsp;- Balizas luminosas: En ambientes ruidosos<br>
        &nbsp;&nbsp;- Carteles de evacuación<br><br>
        
        <strong>2. RED HÚMEDA (SISTEMA CONTRA INCENDIOS):</strong><br>
        • <strong>Obligatorio en:</strong> Edificios > 5 pisos<br>
        • <strong>Componentes:</strong><br>
        &nbsp;&nbsp;- Estanque de reserva: 10 m³ mínimo<br>
        &nbsp;&nbsp;- Bomba incendio: Presión 70 PSI<br>
        &nbsp;&nbsp;- Cañería acero Schedule 40<br>
        &nbsp;&nbsp;- Gabinetes por piso (25mm + 45mm)<br>
        &nbsp;&nbsp;- Mangueras 30 metros<br>
        &nbsp;&nbsp;- Pitones de chorro regulable<br>
        • <strong>Prueba hidráulica:</strong> Anual obligatoria<br><br>
        
        <strong>3. EXTINTORES:</strong><br>
        • <strong>Clasificación:</strong><br>
        &nbsp;&nbsp;- Clase A: Combustibles sólidos (6 kg PQS)<br>
        &nbsp;&nbsp;- Clase B: Líquidos inflamables (6 kg PQS)<br>
        &nbsp;&nbsp;- Clase C: Eléctricos (CO₂ 6 kg)<br>
        &nbsp;&nbsp;- Clase K: Aceites y grasas (cocinas)<br><br>
        
        • <strong>Distribución:</strong><br>
        &nbsp;&nbsp;- Cada 200 m² o 25 metros de distancia<br>
        &nbsp;&nbsp;- Altura 120-150 cm<br>
        &nbsp;&nbsp;- Señalización luminosa<br>
        &nbsp;&nbsp;- Acceso libre de obstrucciones<br><br>
        
        • <strong>Mantención:</strong><br>
        &nbsp;&nbsp;- Inspección visual mensual<br>
        &nbsp;&nbsp;- Mantención anual por empresa certificada<br>
        &nbsp;&nbsp;- Recarga según indicador de presión<br><br>
        
        <strong>4. ILUMINACIÓN DE EMERGENCIA:</strong><br>
        • <strong>Ubicación obligatoria:</strong><br>
        &nbsp;&nbsp;- Vías de evacuación<br>
        &nbsp;&nbsp;- Escaleras<br>
        &nbsp;&nbsp;- Salidas<br>
        &nbsp;&nbsp;- Salas de reunión<br><br>
        
        • <strong>Características:</strong><br>
        &nbsp;&nbsp;- Autonomía: 60 minutos mínimo<br>
        &nbsp;&nbsp;- Iluminación: 10 lux en piso<br>
        &nbsp;&nbsp;- Batería interna recargable<br>
        &nbsp;&nbsp;- Activación automática al corte de luz<br>
        &nbsp;&nbsp;- Prueba mensual obligatoria<br><br>
        
        <strong>5. SEÑALÉTICA DE EVACUACIÓN:</strong><br>
        • Carteles fotoluminiscentes<br>
        • Flechas direccionales a salidas<br>
        • Planos de evacuación por piso<br>
        • Señalización de extintores y gabinetes<br>
        • Altura: 200-220 cm<br>
        • Norma chilena: NCh 2111<br><br>
        
        <strong>6. SISTEMA DE CONTROL DE ACCESO:</strong><br>
        • <strong>Lectores biométricos:</strong> Huella, facial, iris<br>
        • <strong>Tarjetas de proximidad:</strong> RFID, NFC<br>
        • <strong>Códigos numéricos:</strong> Teclados<br>
        • Electroimanes: 280-500 kg de retención<br>
        • Botones de liberación interior<br>
        • Software de administración<br>
        • Registro de accesos con fecha/hora<br>
        • Batería de respaldo UPS<br><br>
        
        <strong>7. CIRCUITO CERRADO TV (CCTV):</strong><br>
        • <strong>Cámaras:</strong><br>
        &nbsp;&nbsp;- Resolución: 2MP - 8MP<br>
        &nbsp;&nbsp;- Visión nocturna IR: 20-40 metros<br>
        &nbsp;&nbsp;- Interiores: Domo fijo<br>
        &nbsp;&nbsp;- Exteriores: Bullet IP66<br>
        &nbsp;&nbsp;- PTZ: Pan-Tilt-Zoom motorizado<br><br>
        
        • <strong>Grabador (NVR/DVR):</strong><br>
        &nbsp;&nbsp;- Almacenamiento: 1-4 TB<br>
        &nbsp;&nbsp;- Grabación: 7-30 días<br>
        &nbsp;&nbsp;- Acceso remoto vía internet<br>
        &nbsp;&nbsp;- Detección de movimiento<br>
        &nbsp;&nbsp;- Respaldo en nube opcional<br><br>
        
        • <strong>Cableado:</strong><br>
        &nbsp;&nbsp;- Cable UTP Cat6 (hasta 100m)<br>
        &nbsp;&nbsp;- PoE: Alimentación por cable de datos<br>
        &nbsp;&nbsp;- Fibra óptica para largas distancias<br><br>
        
        <strong>8. ALARMA DE INTRUSIÓN:</strong><br>
        • Sensores de movimiento PIR<br>
        • Contactos magnéticos puertas/ventanas<br>
        • Sensores de rotura de vidrio<br>
        • Teclados con código de acceso<br>
        • Sirena interior/exterior<br>
        • Aviso a central de monitoreo<br>
        • App móvil de control`,
        
        regulations: `<strong>Normativa aplicable:</strong><br><br>
        
        <strong>INCENDIOS:</strong><br>
        • OGUC Capítulo 3: Condiciones de seguridad contra incendio<br>
        • NCh 2111: Señales de seguridad<br>
        • NCh 1410: Prevención de riesgos<br>
        • NCh 1433: Extintores portátiles<br>
        • Ley 16.744: Seguridad laboral<br>
        • DS 594: Condiciones sanitarias en lugares de trabajo<br><br>
        
        <strong>EVACUACIÓN:</strong><br>
        • Plan de emergencia y evacuación obligatorio<br>
        • Simulacros semestrales<br>
        • Brigada de emergencia capacitada<br>
        • Zonas de seguridad señalizadas<br>
        • Punto de encuentro exterior<br><br>
        
        <strong>INSPECCIONES:</strong><br>
        • Bomberos: Anual para edificios con aglomeración<br>
        • Mutual de Seguridad: Empresas con trabajadores<br>
        • SEC: Sistemas eléctricos de seguridad<br>
        • Autocontrol: Inspecciones mensuales internas`,
        
        maintenance: `<strong>Mantención de sistemas:</strong><br><br>
        
        <strong>DETECCIÓN DE INCENDIOS:</strong><br>
        • <strong>Mensual:</strong> Prueba de pulsadores manuales<br>
        • <strong>Trimestral:</strong> Prueba de detectores con aerosol<br>
        • <strong>Semestral:</strong> Limpieza de detectores<br>
        • <strong>Anual:</strong> Mantención integral por empresa certificada<br>
        • Batería central: Cada 3-5 años<br><br>
        
        <strong>RED HÚMEDA:</strong><br>
        • <strong>Mensual:</strong> Inspección visual gabinetes<br>
        • <strong>Trimestral:</strong> Prueba de bomba<br>
        • <strong>Anual:</strong> Prueba hidráulica completa<br>
        • Verificación de presiones y caudales<br><br>
        
        <strong>EXTINTORES:</strong><br>
        • <strong>Mensual:</strong> Inspección visual (presión, seguros)<br>
        • <strong>Anual:</strong> Mantención por empresa certificada<br>
        • <strong>Cada 5 años:</strong> Prueba hidrostática<br><br>
        
        <strong>CCTV:</strong><br>
        • <strong>Mensual:</strong> Verificación de grabación<br>
        • <strong>Trimestral:</strong> Limpieza de lentes<br>
        • <strong>Semestral:</strong> Revisión de conexiones<br>
        • <strong>Anual:</strong> Mantención integral`,
        
        costs: `<strong>Inversión estimada (Chile 2024):</strong><br><br>
        
        <strong>DETECCIÓN INCENDIOS (edificio 10 dptos):</strong><br>
        • Central + detectores: $1.500.000 - $2.500.000<br>
        • Instalación: $800.000 - $1.200.000<br>
        • Certificación: $150.000 - $300.000<br><br>
        
        <strong>RED HÚMEDA:</strong><br>
        • Bomba + estanque: $3.000.000 - $5.000.000<br>
        • Cañerías + gabinetes: $2.500.000 - $4.000.000<br>
        • Instalación: $1.500.000 - $2.500.000<br><br>
        
        <strong>CCTV (8 cámaras):</strong><br>
        • Equipo completo: $800.000 - $1.500.000<br>
        • Instalación: $300.000 - $600.000<br><br>
        
        <strong>CONTROL DE ACCESO:</strong><br>
        • Por puerta: $350.000 - $800.000<br>
        • Sistema biométrico: $600.000 - $1.200.000<br><br>
        
        <strong>MANTENCIÓN ANUAL:</strong><br>
        • DAI: $250.000 - $500.000<br>
        • Red húmeda: $180.000 - $350.000<br>
        • Extintores: $15.000 - $25.000 c/u<br>
        • CCTV: $150.000 - $300.000`
    }
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { INSTALLATIONS_CONTENT };
}
