# Diseñador de Estanques de Agua Potable para Edificios
## Software según Normas Chilenas NCh691

### 📋 Descripción
Software web interactivo para el diseño y cálculo de estanques de agua potable para edificios residenciales, oficinas y uso mixto, cumpliendo con las normativas chilenas vigentes.

### ✨ Características Principales

- **Visualización 3D Interactiva**: Vista tridimensional del estanque con controles de rotación
- **Cálculos Automáticos**: Según normas NCh691 de Chile
- **Ajuste Automático de Dimensiones**: El software optimiza las dimensiones del estanque
- **Sistema de Bombeo**: Calcula cantidad de bombas, presión y potencia requerida
- **Recomendaciones Técnicas**: Genera sugerencias basadas en el diseño
- **Vista de Corte**: Visualización 2D del corte longitudinal del estanque
- **Exportación de Reportes**: Descarga reportes técnicos en formato texto

### 🚀 Instalación

1. **Descomprimir el archivo ZIP** en cualquier carpeta de tu computador
2. **Abrir el archivo `index.html`** con cualquier navegador web moderno:
   - Google Chrome (recomendado)
   - Mozilla Firefox
   - Microsoft Edge
   - Safari

**IMPORTANTE**: No requiere instalación de servidores ni dependencias adicionales. Todo funciona directamente desde el navegador.

### 📁 Estructura del Proyecto

```
estanques-agua-potable/
├── index.html              # Página principal
├── css/
│   ├── styles.css         # Estilos generales
│   ├── formulario.css     # Estilos del formulario
│   └── responsive.css     # Estilos responsive
├── js/
│   ├── main.js            # Inicialización
│   ├── calculos.js        # Cálculos según normas
│   ├── render3d.js        # Renderizado 3D
│   ├── formulario.js      # Lógica del formulario
│   └── validaciones.js    # Validaciones de datos
├── data/
│   ├── normas-chile.js    # Normas NCh691
│   └── tablas-presion.js  # Tablas técnicas
└── README.md              # Este archivo
```

### 🎯 Cómo Usar

1. **Datos del Edificio**:
   - Ingrese el número de pisos
   - Indique departamentos por piso
   - Especifique habitantes por departamento
   - Seleccione el tipo de edificio

2. **Dimensiones del Estanque**:
   - Defina largo, ancho y altura
   - Active "Ajustar automáticamente" para optimización
   - O ajuste manualmente las dimensiones

3. **Parámetros Técnicos**:
   - Configure espesores de muros y fondo
   - Seleccione resistencia del hormigón
   - Elija el tipo de acero de refuerzo

4. **Calcular**:
   - Presione el botón "Calcular Estanque"
   - Revise los resultados en el panel derecho
   - Explore la vista 3D y el corte A-A

5. **Exportar**:
   - Use el botón "Exportar Reporte PDF" para descargar el informe técnico

### 📊 Normas Aplicadas

El software calcula según las siguientes normativas chilenas:

- **NCh691**: Agua Potable - Conducción, Regulación y Distribución
- **NCh1105**: Ingeniería Sanitaria - Alcantarillado de Aguas Residuales
- **NCh430**: Agua Potable - Requisitos
- **NCh409**: Agua Potable - Parte 1: Requisitos
- **NCh2369**: Diseño sísmico de estructuras e instalaciones industriales
- **NCh433**: Diseño sísmico de edificios

### 🔧 Parámetros de Diseño

**Dotaciones de Agua (según NCh691)**:
- Residencial: 200 L/hab/día
- Oficinas: 50 L/persona/día
- Mixto: 150 L/persona/día

**Capacidad del Estanque**:
- Debe almacenar entre 1 a 1.5 días de consumo según tipo de edificio
- Incluye factor de seguridad de 10%

**Sistema de Bombeo**:
- Presión base: 15 m.c.a
- Incremento por piso: 3.5 m.c.a
- Factor de pérdidas de carga: 1.2

**Dimensionamiento Estructural**:
- Espesor mínimo de muros: 15-35 cm según altura
- Espesor mínimo de fondo: 20 cm
- Borde libre: 30 cm sobre nivel máximo de agua

### 💡 Recomendaciones de Uso

1. **Ajuste Automático**: Active esta opción para que el software calcule las dimensiones óptimas basadas en el volumen requerido

2. **Validaciones**: El software validará automáticamente que las dimensiones cumplan con las normas y relaciones geométricas adecuadas

3. **Vista 3D**: Use el mouse para rotar la vista 3D (click y arrastrar) y la rueda para hacer zoom

4. **Recomendaciones**: Revise siempre las recomendaciones técnicas generadas antes de proceder con el diseño definitivo

5. **Exportación**: El reporte exportado incluye todos los cálculos y puede ser usado como documento técnico de respaldo

### 🖥️ Requisitos del Sistema

- **Navegador Web Moderno** (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- **JavaScript Habilitado**
- **WebGL Habilitado** (para visualización 3D)
- **Resolución Mínima**: 1024x768 px (se adapta a móviles y tablets)

### 📱 Compatibilidad

✅ Computadores de escritorio (Windows, Mac, Linux)
✅ Tablets
✅ Teléfonos móviles (interfaz adaptativa)

### ⚠️ Consideraciones Importantes

- Este software es una herramienta de apoyo al diseño
- Los cálculos deben ser verificados por un ingeniero profesional
- Cumple con normas chilenas vigentes a enero 2025
- Para proyectos reales, consulte siempre con un especialista

### 🐛 Resolución de Problemas

**La vista 3D no se muestra**:
- Verifique que WebGL esté habilitado en su navegador
- Actualice su navegador a la última versión
- Pruebe con otro navegador

**Los cálculos no se muestran**:
- Asegúrese de presionar el botón "Calcular Estanque"
- Verifique que todos los campos tengan valores válidos
- Revise la consola del navegador (F12) para ver errores

**El diseño no se ajusta automáticamente**:
- Active la casilla "Ajustar dimensiones automáticamente"
- Presione el botón "Calcular Estanque"

### 📞 Soporte

Para consultas técnicas o reportar problemas, contacte al desarrollador o consulte la documentación técnica incluida en el código fuente.

### 📄 Licencia

Software desarrollado para fines educativos y profesionales.

### 🔄 Versión

**Versión 1.0** - Enero 2025
- Versión inicial con todas las funcionalidades básicas
- Cálculos según NCh691
- Visualización 3D y 2D
- Exportación de reportes

---

**Desarrollado con**: HTML5, CSS3, JavaScript, Three.js

**Última actualización**: Enero 2025
