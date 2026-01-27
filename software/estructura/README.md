# Software de Cálculos Estructurales - Chile

Software profesional para el diseño y cálculo de elementos estructurales de hormigón armado según normativa chilena (NCh430, NCh433).

## 🏗️ Características

### Elementos Estructurales Incluidos:
1. **Zapata Corrida** - Diseño de fundaciones corridas
2. **Zapata Aislada** - Diseño de fundaciones aisladas
3. **Viga** - Análisis y diseño de vigas de hormigón armado
4. **Columna** - Diseño de columnas
5. **Losa** - Cálculo de losas bidireccionales y unidireccionales

### Funcionalidades:
- ✅ Cálculos según normativa chilena (NCh430, NCh433, NCh1537)
- ✅ Visualización 3D interactiva de todos los elementos
- ✅ Cálculo de acero de refuerzo
- ✅ Verificaciones de seguridad (presión, cortante, flexión)
- ✅ Distribución automática de barras
- ✅ Interfaz moderna y responsiva
- ✅ Resultados detallados con alertas visuales

## 🚀 Instalación

### Opción 1: Uso Directo (Recomendado)
1. Descarga el archivo ZIP del proyecto
2. Extrae todos los archivos en una carpeta
3. Abre el archivo `index.html` en tu navegador web
4. ¡Listo! No requiere instalación adicional

### Opción 2: Servidor Local
Si prefieres usar un servidor web local:

```bash
# Si tienes Python instalado:
python -m http.server 8000

# Si tienes Node.js instalado:
npx http-server
```

Luego abre tu navegador en `http://localhost:8000`

## 📁 Estructura del Proyecto

```
calculos-estructurales/
│
├── index.html                 # Página principal con menú
│
├── css/
│   ├── global.css            # Estilos globales
│   ├── zapata-corrida.css    # Estilos zapata corrida
│   ├── zapata-aislada.css    # Estilos zapata aislada
│   ├── viga.css              # Estilos viga
│   ├── columna.css           # Estilos columna
│   └── losa.css              # Estilos losa
│
├── js/
│   ├── utils/
│   │   ├── normativa-chile.js    # Constantes NCh
│   │   ├── calculos-comunes.js   # Funciones matemáticas
│   │   └── three-config.js       # Configuración 3D
│   │
│   ├── zapata-corrida.js
│   ├── zapata-aislada.js
│   ├── viga.js
│   ├── columna.js
│   └── losa.js
│
├── pages/
│   ├── zapata-corrida.html
│   ├── zapata-aislada.html
│   ├── viga.html
│   ├── columna.html
│   └── losa.html
│
└── assets/
    ├── images/
    └── docs/
```

## 📖 Uso del Software

### 1. Zapata Corrida
- Ingresa las cargas (muerta y viva)
- Define las propiedades del hormigón y acero
- Especifica la capacidad portante del suelo
- El software calculará automáticamente:
  - Dimensiones óptimas de la zapata
  - Acero de refuerzo requerido
  - Verificaciones de seguridad

### 2. Zapata Aislada
- Similar a zapata corrida pero para cargas puntuales
- Incluye verificación por punzonamiento
- Diseño bidireccional del acero

### 3. Viga
- Ingresa la geometría (luz, ancho, altura)
- Define las cargas distribuidas
- Selecciona condición de apoyo
- Obtén:
  - Diseño de acero longitudinal
  - Diseño de estribos
  - Verificación de deflexiones

### 4. Columna
- Ingresa cargas axiales y momentos
- Define dimensiones y altura
- El software calculará:
  - Esbeltez de la columna
  - Acero longitudinal requerido
  - Distribución de estribos

### 5. Losa
- Ingresa dimensiones en planta
- Define espesor y cargas
- Selecciona condición de borde
- Obtén diseño bidireccional o unidireccional

## 🎨 Visualización 3D

Todos los elementos incluyen visualización 3D interactiva:
- **Rotar**: Click izquierdo + arrastrar
- **Zoom**: Scroll del mouse
- **Desplazar**: Click derecho + arrastrar

## 📋 Normativas Implementadas

### NCh430 - Hormigón Armado
- Resistencias características del hormigón (H20 a H50)
- Acero de refuerzo (A44-28H, A63-42H)
- Factores de reducción φ
- Cuantías mínimas y máximas
- Recubrimientos mínimos

### NCh433 - Diseño Sísmico
- Zonas sísmicas de Chile
- Coeficientes sísmicos
- Categorías de ocupación

### NCh1537 - Cargas Permanentes y Sobrecargas
- Combinaciones de carga
- Sobrecargas de uso

## ⚠️ Advertencias Importantes

1. **Uso Profesional**: Este software es una herramienta de apoyo. Los resultados deben ser verificados por un ingeniero estructural calificado.

2. **Responsabilidad**: El uso de este software es bajo responsabilidad del usuario. Se recomienda verificar todos los cálculos manualmente.

3. **Normativa**: Asegúrese de utilizar la versión vigente de las normas chilenas.

4. **Casos Especiales**: Algunos casos especiales pueden requerir análisis adicionales no contemplados en este software.

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura y contenido
- **CSS3**: Estilos y animaciones
- **JavaScript ES6**: Lógica de cálculos
- **Three.js**: Visualización 3D

## 📞 Soporte

Para reportar errores o sugerir mejoras, por favor documenta:
- Descripción del problema
- Datos de entrada utilizados
- Resultado esperado vs obtenido
- Capturas de pantalla si es posible

## 📄 Licencia

Este software es de uso educativo y profesional. Se permite su uso y modificación siempre que se mantenga la referencia a las normativas chilenas utilizadas.

## 🎓 Créditos

Desarrollado según:
- NCh430 - Hormigón Armado - Requisitos de diseño y cálculo
- NCh433 - Diseño sísmico de edificios
- NCh1537 - Diseño estructural - Cargas permanentes y sobrecargas de uso

---

**Versión**: 1.0  
**Fecha**: Enero 2025  
**Compatibilidad**: Navegadores modernos (Chrome, Firefox, Edge, Safari)
